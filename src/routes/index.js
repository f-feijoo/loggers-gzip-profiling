import express from "express";
import ProductosDao from "../daos/ProductosDao.js";

const { Router } = express;

let router = new Router();

function auth(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/login");
    }
  }
  
  router.get("/", auth, async (req, res) => {
      res.render("index", {
        data: await ProductosDao.mostrarTodos(),
        user: req.user.username,
      });
    
  });
  
  router.post("/", async (req, res) => {
    let objNew = {
      title: req.body.title,
      price: req.body.price,
      thumbnail: req.body.thumbnail,
    };
    await ProductosDao.guardar(objNew)
    res.redirect('/')
  });

  export default router