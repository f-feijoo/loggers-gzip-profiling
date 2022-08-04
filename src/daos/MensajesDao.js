import ContenedorMongoDb from "../contenedores/ContenedorMongo.js";

class MensajesDao extends ContenedorMongoDb {
  constructor() {
    super("mensajes", {
      id: {
        type: Number,
      },
      autor: {
        id: {
          type: String,
        },
        nombre: {
          type: String,
        },
        apellido: {
          type: String,
        },
        edad: {
          type: Number,
        },
        alias: {
          type: String,
        },
        avatar: {
          type: String,
        },
      },
      texto: {
        type: String,
      },
      timestamp: {
        type: String,
      },
    });
  }
}

let Mensajes = new MensajesDao();

export default Mensajes;
