
const express = require("express");
const axios = require("axios");

const router = express.Router();

// Obtener todos los clientes
router.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.NESSIE_URL}/customers`,
      {
        params: {
          key: process.env.NESSIE_API_KEY
        }
      }
    );

    res.status(200).json(response.data);

  } catch (error) {
    res.status(500).json({
      error: "Error al consultar clientes de Nessie"
    });
  }
});

// Obtener un cliente específico
router.get("/:customerId", async (req, res) => {
  try {
    const { customerId } = req.params;

    const response = await axios.get(
      `${process.env.NESSIE_URL}/customers/${customerId}`,
      {
        params: {
          key: process.env.NESSIE_API_KEY
        }
      }
    );

    res.status(200).json(response.data);

  } catch (error) {
    res.status(500).json({
      error: "Error al consultar el cliente de Nessie"
    });
  }
});

// Obtener las cuentas de un cliente
router.get("/:customerId/accounts", async (req, res) => {
  try {
    const { customerId } = req.params;

    const response = await axios.get(
      `${process.env.NESSIE_URL}/customers/${customerId}/accounts`,
      {
        params: {
          key: process.env.NESSIE_API_KEY
        }
      }
    );

    res.status(200).json(response.data);

  } catch (error) {
    res.status(500).json({
      error: "Error al consultar las cuentas del cliente"
    });
  }
});

module.exports = router;

