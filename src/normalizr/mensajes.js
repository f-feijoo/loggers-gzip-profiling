import { schema} from 'normalizr'

const autorSchema = new schema.Entity("autores");

const mensajeSchema = new schema.Entity("mensajes", {
  id: { type: String },
  autor: autorSchema,
  texto: "",
  timestamp: { type: String },
});

const chatSchema = new schema.Entity("chats", {
  id: { type: String },
  nombre: "",
  mensajes: [mensajeSchema],
});

export default chatSchema