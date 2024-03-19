var express = require('express');
var router = express.Router();
const Booking = require('../../app/models/Booking.model');
const bookingBuilder = require('../../app/controllers/cms/Booking.controller');
const authMiddleware = require('./../../app/middleware/AuthJwt');
const isAuth = authMiddleware.isAuth;

router.get('/booking/',isAuth,bookingBuilder.index);
router.get('/booking/:id',isAuth,bookingBuilder.show);
router.put('/booking/updatePayment/:id',isAuth,bookingBuilder.updatePayment);
router.put('/booking/update/:id',isAuth,bookingBuilder.update);
router.delete('/booking/:id',isAuth,bookingBuilder.delete);
router.get('/statistics', async (req, res) => {
    try {
        const bookingsByMonth = await Booking.aggregate([
            {
                $group: {
                    _id: { $month: "$check_in" },
                    count: { $sum: 1 }
                }
            }
        ]);
        res.json(bookingsByMonth);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
module.exports = router;
