const express = require("express");
const mainRouter = express.Router();
const barRouter = require('./barRouter');
const orderRouter = require('./orderRouter');
const beerRouter = require('./beerRouter');

mainRouter.use('/bar', barRouter);
mainRouter.use('/beer', beerRouter);
mainRouter.use('/order', orderRouter);

module.exports = mainRouter;