const mongoose = require("mongoose");

const docenteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    trim: true,
  },
  apellido: {
    type: String,
    trim: true,
  },
  legajo: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("Docente", docenteSchema);
