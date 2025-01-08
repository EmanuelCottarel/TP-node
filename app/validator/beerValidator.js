const { body, param } = require('express-validator');

const beerValidator = {
    create: [
        body('name')
            .notEmpty().withMessage('Name is required')
            .isString().withMessage('Name must be a string'),
        body('degree')
            .notEmpty().withMessage('Degree is required')
            .isFloat({ min: 0 }).withMessage('Degree must be a positive number'),
        body('price')
            .notEmpty().withMessage('Price is required')
            .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
        body('description')
            .notEmpty().withMessage('Description is required')
            .isString().withMessage('Description must be a string'),
    ],
    update: [
        param('id').isInt({ min: 1 }).withMessage('Id must be a positive integer'),
        body('name').optional().isString().withMessage('Name must be a string'),
        body('degree').optional().isFloat({ min: 0 }).withMessage('Degree must be a positive number'),
        body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
        body('description').optional().isString().withMessage('Description must be a string'),
    ],
    findById: [
        param('id').isInt({ min: 1 }).withMessage('Id must be a positive integer'),
    ],
    delete: [
        param('id').isInt({ min: 1 }).withMessage('Id must be a positive integer'),
    ],
};

module.exports = beerValidator;
