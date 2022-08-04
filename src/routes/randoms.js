import express from 'express'
import {fork} from 'child_process'
const forked = fork('./src/calculo.js')

const { Router } = express;

let router = new Router();

router.get("/randoms", (req, res) => {
  if (req.query.cant) {
    forked.send(req.query.cant);
  } else {
    forked.send(100000000);
  }
  forked.on("message", (msj) => {
    res.render('random' ,{data: msj})
  });
  forked.on("exit", (code) => {
    console.log("Se ha cerrado el proceso", code);
  });
});

export default router