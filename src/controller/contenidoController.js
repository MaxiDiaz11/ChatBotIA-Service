const Contenido = require("../models/Contenido");

exports.obtenerContenido = async (req, res) => {
  try {
    const contenidos = await Contenido.find();
    return contenidos;
  } catch (error) {
    console.log(error);
  }
};
