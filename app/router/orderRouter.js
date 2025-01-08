const express = require("express");
const router = express.Router();

const controller = require('../controller/orderController')
const {validationResult} = require("express-validator");
const validator = require("../validator/orderValidator");

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

router.get('/', controller.findAll);
router.get('/:id', validator.findById, handleValidationErrors, controller.findById);
router.post('/', validator.create, handleValidationErrors, controller.create);
router.put('/:id',validator.update, handleValidationErrors, controller.update);
router.delete('/:id',validator.delete, handleValidationErrors, controller.delete);

router.get('/:id/findBeers', controller.findBeers);
router.post('/:idOrder/addBeer/:idBeer', controller.addBeer);
router.post('/:idOrder/removeBeer/:idBeer', controller.removeBeer);

module.exports = router;