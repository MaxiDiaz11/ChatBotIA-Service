const { Router } = require("express");
const router = Router();
const docController = require("../controller/docenteController");
const alumController = require("../controller/alumnoController");
const contController = require("../controller/contenidoController");
const evalController = require("../controller/evaluacionController");

router.post("/webHook", async (req, res) => {
  
  const tag = req.body.fulfillmentInfo.tag
  switch (tag) {
    case 'docente_pertenece':
      let param = req.body.sessionInfo.parameters['given-name'];
      let pertenece = await docentePertenece(param)
      res.status(200).send({
        fulfillment_response: {
          messages: [
            {
              text: {
                text: [pertenece],
              },
            },
          ],
        }   
      });
      break;
    case 'lista_docentes':
      var msg = await listarDocentes();
      res.status(200).send({
        fulfillment_response: {
          messages: [
            {
              text: {
                text: [msg,],
              },
            },
          ],
        }    
      })
      break;
    case 'contenidos_lista':
      var msg = await listarContenidos()
      res.status(200).send({
        fulfillment_response: {
          messages: [
            {
              text: {
                text: [msg],
              },
            },
          ],
        }   
      })
      break
    case 'contenidos_info':
      var nro = req.body.sessionInfo.parameters['nro_contenido']
      var contenido = await infoContenido(nro);
      res.status(200).send({
        fulfillment_response: {
          messages: [
            {
              text: {
                text: [contenido],
              },
            },
          ],
        }   
      })
      break;
    case 'alumno_pertenece':
      let nombre = new String(req.body.sessionInfo.parameters['given-name']);
      let legajo = new String(req.body.sessionInfo.parameters['number-sequence']);
      let msgPer = "";
      if(legajo != 'undefined' ){
        msgPer = await alumnoPertenece(legajo)
      } else if(nombre != 'undefined'){
        msgPer = await alumnoPertenece(nombre)
      }
      res.status(200).send({
        fulfillment_response: {
          messages: [
            {
              text: {
                text: [msgPer],
              },
            },
          ],
        }   
      })
      break;
    case 'alumno_nota':
      var leg = req.body.sessionInfo.parameters['legajo']
      var msgNota = await obtenerNota(leg)
      res.status(200).send({
        fulfillment_response: {
          messages: [
            {
              text: {
                text: [msgNota],
              },
            },
          ],
        }   
      })
      break;
    default:
      break;

  }
});

const docentePertenece = async (param) => {
  var docentes = await docController.obtenerDocentes()
  var pertenece = docentes.some(doc => doc.nombre.toUpperCase() == param.toUpperCase() || doc.apellido.toUpperCase() == param.toUpperCase())
  if(pertenece)
    return "El docente pertenece";
  else 
    return "El docente no pertenece";
}

const listarDocentes = async () => {
  var docentes =  (await docController.obtenerDocentes()).map(doc => doc.nombre +" "+doc.apellido);
  var response = formatearLista(docentes,"docentes");
  return response;
}

const alumnoPertenece = async (param) => {
  console.log("Parametro de busqueda ",param)
  var alumnos = await alumController.obtenerAlumnos()
  console.log(alumnos)
  var pertenece = alumnos.some(alu => alu.nombre.toUpperCase() == param.toUpperCase() || alu.apellido.toUpperCase() == param.toUpperCase() || alu.legajo.toUpperCase() == param.toUpperCase())
  if(pertenece)
    return "El alumno pertenece a la catedra \n Desea conocer la nota?";
  else 
    return "El alumno no pertenece a la catedra";
}

const infoContenido = async (param) => {
  var contenidos = await contController.obtenerContenido()
  var contenidoFiltrado = contenidos[param-1];
  var text = "**"+contenidoFiltrado.titulo+"**\n";
  text+= "Imagen: "+contenidoFiltrado.imagen+ "\n";
  text+= "Paper URL: "+contenidoFiltrado.paperUrl;
  return text;
}

const listarContenidos = async () => {
  var contenidos =  (await contController.obtenerContenido()).map(cont => cont.titulo);
  var response = formatearLista(contenidos,"contenidos");
  return response;
}

const obtenerNota = async (legajo) => {
  console.log("Legajo ",legajo)
  var notas = (await evalController.obtenerNota(legajo)).map(eval => eval.nota)
  console.log("Notas ",notas)
  var notaFinal = notas.reduce((ant,prox) => ant + prox) / notas.length;
  return "Su nota final es: "+ notaFinal;
}

const formatearLista = (lista, entidad) => {
  var msg = "Los "+entidad+" que pertenecen a la catedra son: \n";
  lista.forEach((element,i) => {
    msg+= (i+1)+")"+ element + "\n"
  });
  return msg;
}

module.exports = router;
