import express from "express";
import ip from "ip";
import { connect } from "mongoose";

import cors from "cors";
import passport from "passport";
import { Strategy } from "passport-http-bearer";
import jwt from "jwt-simple";
import moment from "moment";

import AuthController from "./controller/AuthController";
import UserRepository from "./repository/UserRepository";

const PORT = 3000 || process.env.PORT;

const userRepo = new UserRepository();
const authController = new AuthController(userRepo);
const SECRET = "SecretSanta";

passport.use(
  new Strategy((token, done) => {
    const decoded = jwt.decode(token, SECRET, false, "HS256");
    if (moment().unix() > moment(decoded.exp).unix()) {
      return done(null, false);
    }

    userRepo
      .findOneBy({ _id: decoded._id })
      .then((user) => {
        if (!user) return done(null, false);
        return done(null, user);
      })
      .catch((err) => done(null, false));
  })
);
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
(async () => {
  await connect("mongodb://mongodb:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const repo = new UserRepository();
  // repo.createUser("akqjdsmfl", "kjdqmsldf", "sdjkflqsd", `${ip.address()}`, new Date(), new Date());

  console.log("Hello world");
  app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello world 🖖" });
  });

  app.post("/signup", (req, res) => {
    const payload = req.body;
    payload.lastip = ip.address();

    authController.signup(payload).then(({ status, message }) => {
      res.status(status).send({ message });
    });
  });

  app.post("/login", (req, res) => {
    const payload = req.body;
    authController.login(payload).then(({ status, message }) => {
      res.status(status).send({ message });
    });
  });

  app.get(
    "/secure",
    passport.authenticate("bearer", { session: false }),
    (req, res) => {
      res.sendStatus(200);
    }
  );

  app.listen(PORT, () => {
    console.log("🖥️  Server listening... ");
    console.log(`\t 🏠 : http://localhost:${PORT}`);
    console.log(`\t 🌍 : http://${ip.address()}:${PORT}`);
  });
})();
