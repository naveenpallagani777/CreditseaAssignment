const { UserModel } = require('../models/User');

// POST /api/loans - Submit a loan (only by 'user' role)
exports.submitLoan = async (req, res) => {
  const userId = req.user.id;
  const { fullName, email, loanAmount, purpose, loanTenure, employmentStatus } = req.body;

  try {
    const user = await UserModel.findById(userId);
    if (!user || user.role !== 'user') {
      return res.status(403).json({ error: 'Only users can submit loans' });
    }

    const newLoan = {
      fullName,
      email,
      loanAmount,
      purpose,
      loanTenure,
      employmentStatus
    };

    user.loanApplications.push(newLoan);
    await user.save();

    res.status(201).json({ message: 'Loan application submitted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET /api/loans - Get all loans (only by 'admin' or 'verifier')
exports.getAllLoans = async (req, res) => {
  const userRole = req.user.role;

  if (userRole !== 'admin' && userRole !== 'verifier') {
    return res.status(403).json({ error: 'Access denied' });
  }

  try {
    const usersWithLoans = await UserModel.find({ loanApplications: { $exists: true, $ne: [] } });

    const allLoans = usersWithLoans.flatMap(user =>
      user.loanApplications.map(loan => ({
        userId: user._id,
        username: user.username,
        ...loan.toObject()
      }))
    );

    res.json(allLoans);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getUserLoans = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await UserModel.findById(userId).select('loanApplications');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ loans: user.loanApplications });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// PUT /api/loans/:userId/:loanId - Update loan status (only by 'verifier' or 'admin')
exports.updateLoanStatus = async (req, res) => {
  const currentUserId = req.user.id;
  const currentUserRole = req.user.role;

  const { userId, loanId } = req.params;
  const { status } = req.body;

  const validStatuses = ['pending', 'verified', 'approved', 'rejected'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid loan status' });
  }

  // Restrict verifiers from setting status to 'approved'
  if (currentUserRole === 'verifier' && status === 'approved') {
    return res.status(403).json({ error: 'Verifiers are not allowed to approve loans' });
  }

  if (!['admin', 'verifier'].includes(currentUserRole)) {
    return res.status(403).json({ error: 'Access denied' });
  }

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const loan = user.loanApplications.id(loanId);
    if (!loan) {
      return res.status(404).json({ error: 'Loan application not found' });
    }

    loan.status = status;
    loan.updatedAt = new Date();

    await user.save();

    return res.status(200).json({ message: 'Loan status updated successfully', loan });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};