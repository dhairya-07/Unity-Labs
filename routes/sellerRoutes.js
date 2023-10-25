const { Router } = require('express');
const { protect, restrictTo } = require('../controllers/auth');
const { createCatalog, getAllOrders } = require('../controllers/seller');

const router = Router();

router.use(protect);
router.use(restrictTo('Seller'));

router.route('/create-catalog').post(createCatalog);
router.route('/orders').get(getAllOrders);

module.exports = router;
