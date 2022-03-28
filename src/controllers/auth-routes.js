const express = require('express');
const router = express.Router();
const auth = require('../models/authentification');

router.post('/login', (req, res) => {
    auth(req.body, res)
});

exports.initializeRoutes = () => {
    return router;
}