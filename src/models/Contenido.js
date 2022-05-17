const mongoose = require("mongoose");

const contenidoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    trim: true,
  },
  imagen: {
    type: String,
    trim: true,
  },
  paperUrl: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("Contenido", contenidoSchema);
