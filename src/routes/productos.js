import express from "express";
import { faker } from "@faker-js/faker";
import ProductosDao from "../daos/ProductosDao.js";

const { Router } = express;

let router = new Router();

router.get("/productos", async (req, res) => {
  res.render("productos", { data: await ProductosDao.mostrarTodos() });
});

router.get("/productos-test", (req, res) => {
  const random = [];
  for (i = 0; i < 5; i++) {
    random.push({
      id: faker.random.numeric(2),
      title: faker.commerce.product(),
      price: faker.commerce.price(),
      thumbnail: faker.image.imageUrl(),
    });
  }
  res.render("productos", { data: random });
});

router.get("/productos/:id", async (req, res) => {
  let oid = {_id: req.params.id};
  res.render("uploaded", { data: await ProductosDao.mostrar(oid) });
});

router.post("/productos", async (req, res) => {
  let objNew = {
    title: req.body.title,
    price: req.body.price,
    thumbnail: req.body.thumbnail,
  };
  let doc = await ProductosDao.guardar(objNew);
  if (doc) {
    res.send({ message: "Registro ok!" });
  } else {
    res.send({ message: "error" });
  }
});

router.put("/productos/:id", async (req, res) => {
  let objUpdated = {
    title: req.body.title,
    price: req.body.price,
    thumbnail: req.body.thumbnail,
    _id: req.params.id,
  };
  let doc = await ProductosDao.actualizar(objUpdated);
  if (doc) {
    res.send({ data: "User updated" });
  } else {
    res.send({ message: "error" });
  }
});

router.delete("/productos/:id", async (req, res) => {
  let id = req.params.id;
  await ProductosDao.borrar(id);
  res.send({ data: "User deleted" });
});

export default router;
