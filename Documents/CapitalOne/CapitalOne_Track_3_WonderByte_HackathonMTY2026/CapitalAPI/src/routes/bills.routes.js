const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/:accountId', async (req, res) => {
    try {
        const { accountId } = req.params;

        const response = await axios.get(
            `${process.env.NESSIE_URL}/accounts/${accountId}/bills`,
            {
                params: {
                    key: process.env.NESSIE_API_KEY
                }
            }
        );

        res.status(200).json(response.data);

    } catch (error) {
        res.status(500).json({
            error: 'Error al consultar bills de Nessie'
        });
    }
});

module.exports = router;