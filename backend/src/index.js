const app = require("express")();
const ip = require("ip");

const PORT = 3000 || process.env.PORT;

app.get('/', (req, res) => {
    res.status(200).json({message: "Hello world 🖖"});
});

<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
app.listen(PORT, () => {
    console.log('🖥️  Server listening... ');
    console.log(`\t 🏠 : http://localhost:${PORT}`);
    console.log(`\t 🌍 : http://${ip.address()}:${PORT}`);
})


