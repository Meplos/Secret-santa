import express from 'express';
import ip from "ip";
const PORT = 3000 || process.env.PORT;

const app = express();
console.log("Hello world")
app.get('/', (req , res) => {
    res.status(200).json({message: "Hello world 🖖"});
});

app.listen(PORT, () => {
    console.log('🖥️  Server listening... ');
    console.log(`\t 🏠 : http://localhost:${PORT}`);
    console.log(`\t 🌍 : http://${ip.address()}:${PORT}`);
})


