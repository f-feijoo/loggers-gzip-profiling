import passport from "passport";
import { Strategy } from "passport-local";
// import Usuarios from '../models/Usuarios.js'
import Usuarios from "../daos/UsuariosDao.js";

const LocalStrategy = Strategy;

passport.use(
  "registro",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      let user = {username: username}
      const usuarioBD = await Usuarios.mostrar(user);
      if (usuarioBD) {
        return done(null, false);
      }
      const usuarioNuevo = await Usuarios.guardar({
        username: username,
        password: Usuarios.encriptar(password),
      });
      done(null, usuarioNuevo);
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      let user = { username: username}
      const usuarioBD = await Usuarios.mostrar(user);
      if (!usuarioBD) {
        return done(null, false);
      }
      if (!Usuarios.comparar(usuarioBD.password, password)) {
        return done(null, false);
      }
      return done(null, usuarioBD);
    }
  )
);

passport.serializeUser((usuario, done) => {
  done(null, usuario.id);
});

passport.deserializeUser(async (id, done) => {
  const usuario = await Usuarios.mostrar({id: id});
  done(null, usuario);
});
