
require("dotenv").config();

const express = require("express");
const cors = require("cors");

require("./src/db");

const customersRoutes = require("./src/routes/customers.routes");
const purchasesRoutes = require("./src/routes/purchases.routes");
const withdrawalsRoutes = require("./src/routes/withdrawals.routes");
const depositsRoutes = require("./src/routes/deposits.routes");
const billsRoutes = require("./src/routes/bills.routes");
const loansRoutes = require("./src/routes/loans.routes");
const alertsRoutes = require("./src/routes/alerts.routes");

const Reports = require("./src/models/Reports");
const Customer = require("./src/models/Customer");

const bcrypt = require("bcrypt");

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Banco API funcionando"
  });
});

// Rutas de la API
app.use("/api/customers", customersRoutes);
app.use("/api/purchases", purchasesRoutes);
app.use("/api/withdrawals", withdrawalsRoutes);
app.use("/api/deposits", depositsRoutes);
app.use("/api/bills", billsRoutes);
app.use("/api/loans", loansRoutes);
app.use("/api/alerts", alertsRoutes);

// Obtener reportes
app.get("/api/reportes", async (req, res) => {
  try {
    const reportes = await Reports.find();

    res.json(reportes);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// Registro
app.post("/api/auth/register", async (req, res) => {
  try {
    const {
      email,
      password,
      first_name,
      last_name
    } = req.body;

    // Verificar si el correo ya existe
    const existe = await Customer.findOne({ email });

    if (existe) {
      return res.status(400).json({
        error: "El correo ya está registrado"
      });
    }

    // Crear Customer en Nessie
    const nessieResponse = await fetch(
      `${process.env.NESSIE_URL}/customers?key=${process.env.NESSIE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          first_name,
          last_name
        })
      }
    );

    const nessieCustomer = await nessieResponse.json();

    // Verificar respuesta de Nessie
    if (!nessieResponse.ok) {
      return res.status(nessieResponse.status).json({
        error: "No se pudo crear el Customer en Nessie",
        details: nessieCustomer
      });
    }

    // Obtener ID generado por Nessie
    const nessieCustomerId =
      nessieCustomer.objectCreated?._id ||
      nessieCustomer._id;

    if (!nessieCustomerId) {
      return res.status(500).json({
        error: "Nessie no devolvió el ID del Customer"
      });
    }

    // Encriptar contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    // Guardar usuario en MongoDB
    const customer = await Customer.create({
      email,
      passwordHash,
      nessieCustomerId
    });

    res.status(201).json({
      message: "Customer registrado correctamente",
      customerId: customer._id,
      nessieCustomerId
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// Login
app.post("/api/auth/login", async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

    // Buscar usuario en MongoDB
    const customer = await Customer.findOne({ email });

    if (!customer) {
      return res.status(401).json({
        error: "Correo o contraseña incorrectos"
      });
    }

    // Comparar contraseña
    const passwordCorrecta = await bcrypt.compare(
      password,
      customer.passwordHash
    );

    if (!passwordCorrecta) {
      return res.status(401).json({
        error: "Correo o contraseña incorrectos"
      });
    }

    // Login exitoso
    res.json({
      message: "Login correcto",
      customerId: customer._id,
      nessieCustomerId: customer.nessieCustomerId
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// Iniciar servidor
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
  });
}

module.exports = app;

