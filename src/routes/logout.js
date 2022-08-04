import express from "express";

const { Router } = express;

let router = new Router();

router.get("/", (req, res) => {
    const user = req.user.username;
    if (user) {
      req.session.destroy((err) => {
        if (!err) {
          res.render("logout", { user: user });
        } else res.send({ status: "Logout ERROR", body: err });
      });
    } else {
      res.redirect("/");
    }
  });

  export default router