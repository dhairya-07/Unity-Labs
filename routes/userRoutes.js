const { Router } = require('express');
const { signup, login } = require('../controllers/auth');

const router = Router();

router.route('/register').post(signup);
router.route('/login').post(login);

module.exports = router;
