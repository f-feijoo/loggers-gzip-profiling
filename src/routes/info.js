import express from "express";
import yargs from "yargs";
const args = yargs(process.argv.slice(2));
import os from 'os'

const { Router } = express;

let router = new Router();

router.get("/sin-console", (req, res) => {
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

router.get("/con-console", (req, res) => {3
  console.log('profiling')
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
