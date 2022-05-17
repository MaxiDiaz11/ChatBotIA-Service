const Docente = require("../models/Docente");

exports.obtenerDocentes = async () => {
  try {
    const docentes = await Docente.find();
    return docentes;
  } catch (error) {
    console.log(error);
  }
};
