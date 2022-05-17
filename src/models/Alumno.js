const mongoose = require("mongoose");

const alumnoSchema = new mongoose.Schema({
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
  id_alumno: {
    type: Number,
  },
});

module.exports = mongoose.model("Alumno", alumnoSchema);
