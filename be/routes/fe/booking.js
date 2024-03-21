var express = require('express');
var router = express.Router();

const bookingBuilder = require('../../app/controllers/fe/Booking.controller');

// const authMiddleware = require('./../../app/middleware/AuthJwt');
// const isAuth = authMiddleware.isAuth;

router.route('/booking/callback').get(bookingBuilder.webhook);
router.route('/booking/cancel/:id').post(bookingBuilder.cancel);
router.get('/booking',bookingBuilder.index);
router.route('/booking/').post(bookingBuilder.add);
router.get('/booking/:id',bookingBuilder.show);
const paymentController = require('../../app/controllers/fe/createPayment.js');
router.post('/booking/create_payment', paymentController.createPayment);
router.get('/payment/vnpay_return', paymentController.vnpay_return);

module.exports = router;
