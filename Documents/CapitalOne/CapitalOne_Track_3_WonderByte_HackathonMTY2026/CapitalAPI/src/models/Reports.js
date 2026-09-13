const mongoose = require("mongoose");

const reporteSchema = new mongoose.Schema({
  tipo: String,
  movimiento: {
    descripcion: String,
    monto: Number,
    fecha: String
  },
  motivos: [String],
  recomendacion: String
}, {
  collection: "Reportes"
});

module.exports = mongoose.model("Reports", reporteSchema);