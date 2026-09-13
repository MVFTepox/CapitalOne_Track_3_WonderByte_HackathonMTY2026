const express = require('express');

const router = express.Router();

router.post('/confirm', (req, res) => {
    const { transactionId, recognized } = req.body;

    if (!transactionId || typeof recognized !== 'boolean') {
        return res.status(400).json({
            error: 'transactionId y recognized son requeridos'
        });
    }

    const status = recognized
        ? 'recognized'
        : 'not_recognized';

    res.status(200).json({
        transactionId,
        recognized,
        status
    });
});

module.exports = router;