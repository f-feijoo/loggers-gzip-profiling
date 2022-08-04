import ContenedorMongoDb from "../contenedores/ContenedorMongo.js";

class ProductosDao extends ContenedorMongoDb {
  constructor() {
    super("productos", {
      title: {
        type: String,
      },
      price: {
        type: Number,
      },
      thumbnail: {
        type: String,
      },
    });
  }
}

let Productos = new ProductosDao();

export default Productos;
