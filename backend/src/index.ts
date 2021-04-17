import express from 'express';
import ip from "ip";
import { connect } from 'mongoose';
import AuthController from './controller/AuthController';
import UserRepository from './repository/UserRepository';
const PORT = 3000 || process.env.PORT;

const authController = new AuthController(new UserRepository());

 (async () => {
    await connect("mongodb://mongodb:27017/test", {useNewUrlParser: true, useUnifiedTopology: true});
    const repo = new UserRepository();
    // repo.createUser("akqjdsmfl", "kjdqmsldf", "sdjkflqsd", `${ip.address()}`, new Date(), new Date());

     const app = express();
     console.log("Hello world")
     app.get('/', (req, res) => {
         res.status(200).json({ message: "Hello world 🖖" });
     });

    app.post("/signup", (req, res) => {
        const payload = req.body;
        const userIp = req.headers['x-forwarded-for'][0];
        authController.signup(payload,userIp);
    });

     app.post("/login", (req, res) => {
        const payload = req.body;
        authController.login(payload);

     });

     app.listen(PORT, () => {
         console.log('🖥️  Server listening... ');
         console.log(`\t 🏠 : http://localhost:${PORT}`);
         console.log(`\t 🌍 : http://${ip.address()}:${PORT}`);
     });


})();





