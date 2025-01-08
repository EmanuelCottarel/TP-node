const express = require("express");
const { validationResult } = require('express-validator');
const validator = require('../validator/barValidator');
const router = express.Router();
const controller = require('../controller/barController')

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// CRUD
router.get('/', controller.findAll);
router.get('/:id', validator.findById, handleValidationErrors, controller.findById);
router.post('/', validator.create, handleValidationErrors, controller.create);
router.put('/:id',validator.update, handleValidationErrors, controller.update);
router.delete('/:id',validator.delete, handleValidationErrors, controller.delete);

// Beer
router.get('/:id/findBeers', controller.findBeers);
router.post('/:idBar/addBeer/:idBeer', controller.addBeer);
router.post('/:idBar/removeBeer/:idBeer', controller.removeBeer);

//Order
router.get('/:id/findOrders', controller.findOrders);

module.exports = router;