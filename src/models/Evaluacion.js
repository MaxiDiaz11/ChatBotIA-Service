const mongoose = require("mongoose");

const evaluacionSchema = new mongoose.Schema({
  tema: {
    type: String,
    trim: true,
  },
  nota: {
    type: Number,
  },
  id_alumno: {
    type: Number,
  },
  legajo: {
    type: String
  }
});

module.exports = mongoose.model("Evaluacion", evaluacionSchema);
