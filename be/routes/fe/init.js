var express = require('express');
var router = express.Router();


const roomRouter = require("./room");
const articleRouter = require("./article");
const authRouter = require("./auth");
const bookingRouter = require("./booking");
const contractRouter = require("./contact");
const voteRouter = require("./vote");
const CategoryRouter = require("./category");
const menuRouter = require("./menu");

router.use(roomRouter);
router.use(articleRouter);
router.use(menuRouter);
router.use(authRouter);
router.use(bookingRouter);
router.use(contractRouter);
router.use(voteRouter);
router.use(CategoryRouter);

module.exports = router;
