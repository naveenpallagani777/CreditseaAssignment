const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const loanController = require('../controllers/loanController');
const authenticate = require('../middleware/authMiddleware');
const authenticateUser = require('../middleware/authenticateUser');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/api/loans', authenticate, loanController.submitLoan);
router.get('/api/loans', authenticate, loanController.getAllLoans);
router.get('/user/loans', authenticateUser, loanController.getUserLoans);

module.exports = router;