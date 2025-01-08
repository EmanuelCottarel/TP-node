const { body, param } = require('express-validator');
const {query} = require("express");

const barValidator = {
    create: [
        body('name').notEmpty().withMessage('Name is required').isString().withMessage('Name must be a string'),
        body('address').notEmpty().withMessage('Address is required').isString().withMessage('Address must be a string'),
        body('phone').notEmpty().withMessage('Phone is required').isString().withMessage('Phone must be a string'),
        body('email')
            .notEmpty().withMessage('Email is required')
            .isEmail().withMessage('Email must be valid'),
        body('description')
            .notEmpty().withMessage('Description is required')
            .isString().withMessage('Description must be a string'),
    ],
    update: [
        param('id').isInt().withMessage('Id must be an integer'),
        body('name').optional().isString().withMessage('Name must be a string'),
        body('address').optional().isString().withMessage('Address must be a string'),
        body('phone').optional().isString().withMessage('Phone must be a string'),
        body('email').optional().isEmail().withMessage('Email must be valid'),
        body('description').optional().isString().withMessage('Description must be a string'),
    ],
    findById: [
        param('id').isInt().withMessage('Id must be an integer'),
    ],
    delete: [
        param('id').isInt().withMessage('Id must be an integer'),
    ],
    findOrdersByDate: [
    ]
};

module.exports = barValidator;
