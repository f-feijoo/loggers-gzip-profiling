import express from "express";
import yargs from "yargs";
const args = yargs(process.argv.slice(2));
import os from 'os'

const { Router } = express;

let router = new Router();

router.get("/", (req, res) => {
  res.send({
    ArgumentosDeEntrada: args,
    NombrePlataforma: process.platform,
    VersionNode: process.version,
    MemoriaTotalReservada: process.memoryUsage(),
    PathEjecucion: process.execPath,
    ProcessID: process.pid,
    CarpetaProyecto: process.cwd(),
    NumeroProcesadores: os.cpus().length
  });
});

export default router;
