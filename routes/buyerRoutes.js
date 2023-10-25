const { Router } = require('express');
const {
  getAllSellers,
  getAllCatalogs,
  createOrder,
} = require('../controllers/buyer');
const { protect, restrictTo } = require('../controllers/auth');

const router = Router();

router.use(protect);
router.use(restrictTo('Buyer'));

router.route('/list-of-sellers').get(getAllSellers);
router.route('/seller-catalog/:seller_id').get(getAllCatalogs);
router.route('/create-order/:seller_id').post(createOrder);

module.exports = router;
