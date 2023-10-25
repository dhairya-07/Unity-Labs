const { Router } = require('express');
const { signup, login, logout, protect } = require('../controllers/auth');

const router = Router();

router.route('/register').post(signup);
router.route('/login').post(login);

module.exports = router;
