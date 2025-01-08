const { body, param } = require('express-validator');

const orderValidator= {
    create: [
        body('name')
            .notEmpty().withMessage('Name is required')
            .isString().withMessage('Name must be a string'),
        body('bar_id')
            .notEmpty().withMessage('bar_id is required')
            .isInt({ min: 1 }).withMessage('bar_id must be a positive integer'),
        body('price')
            .notEmpty().withMessage('Price is required')
            .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
        body('date')
            .notEmpty().withMessage('Date is required')
            .isISO8601().withMessage('Date must be in ISO 8601 format'),
    ],

    update: [
        param('id')
            .notEmpty().withMessage('ID is required')
            .isInt({ min: 1 }).withMessage('ID must be a positive integer'),
        body('name')
            .optional()
            .isString().withMessage('Name must be a string'),
        body('price')
            .optional()
            .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
        body('date')
            .optional()
            .isISO8601().withMessage('Date must be in ISO 8601 format'),
        body('status')
            .optional()
            .isString().withMessage('Status must be a string')
            .isIn(['pending', 'completed', 'cancelled']).withMessage('Status must be one of: pending, completed, cancelled'),
    ],

    findById: [
        param('id').isInt({ min: 1 }).withMessage('Id must be a positive integer'),
    ],

    delete: [
        param('id')
            .notEmpty().withMessage('ID is required')
            .isInt({ min: 1 }).withMessage('ID must be a positive integer'),
    ],
};

module.exports = orderValidator;