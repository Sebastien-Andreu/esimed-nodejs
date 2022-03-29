const express = require('express');
const router = express.Router();
const auth = require('../models/authentification');
const { body, validationResult } = require('express-validator');

router.post('/login',
    body('firstName').exists().withMessage('firstName is require'),
    body('password').exists().withMessage('password is require'),
    (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    auth(req.body, res)
});

exports.initializeRoutes = () => {
    return router;
}