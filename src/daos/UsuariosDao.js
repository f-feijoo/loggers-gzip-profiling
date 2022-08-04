import ContenedorMongoDb from "../contenedores/ContenedorMongo.js";
import bcrypt from "bcrypt";

class UsuariosDao extends ContenedorMongoDb {
  constructor() {
    super("usuarios", {
      username: {
        type: String,
      },
      password: {
        type: String,
      },
    });
  }
  encriptar = (contraseña) => {
    return bcrypt.hashSync(contraseña, bcrypt.genSaltSync(5));
  };

  comparar = (encriptada, contraseña) => {
    return bcrypt.compareSync(contraseña, encriptada);
  };
}

let Usuarios = new UsuariosDao();

export default Usuarios;
