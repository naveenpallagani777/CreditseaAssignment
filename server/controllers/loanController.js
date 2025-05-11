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
