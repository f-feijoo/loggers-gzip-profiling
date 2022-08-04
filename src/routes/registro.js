import express from "express";
import passport from "passport";

const { Router } = express;

let router = new Router();

router.get("/", (req, res) => {
  res.render("register");
});

router.post(
  "/",
  passport.authenticate("registro", {
    successRedirect: "/login",
    failureRedirect: "/registro/errorRegistro",
  })
);

router.get("/errorRegistro", (req, res) => {
  res.render("error-register");
});

export default router;
