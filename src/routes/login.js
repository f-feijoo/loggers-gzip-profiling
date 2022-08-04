import express from "express";
import passport from "passport";

const { Router } = express;

let router = new Router();

router.get("/", (req, res) => {
  res.render("login");
});

router.post(
  "/",
  passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/login/errorLogin",
  })
);

router.get("/errorLogin", (req, res) => {
  res.render("error-login");
});

export default router