const Alumno = require("../models/Alumno");

exports.obtenerAlumnos = async () => {
  try {
    const alumnos = await Alumno.find();
    return alumnos;
  } catch (error) {
    console.log(error);
  }
};
