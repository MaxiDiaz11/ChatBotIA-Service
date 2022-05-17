const Evaluacion = require("../models/Evaluacion");

exports.obtenerNota = async (legajo) => {
  try {
    const evaluaciones = await Evaluacion.find({legajo:legajo});
    return evaluaciones;
  } catch (error) {
    console.log(error);
  }
};
