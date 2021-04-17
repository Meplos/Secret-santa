"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ip_1 = __importDefault(require("ip"));
const PORT = 3000 || process.env.PORT;
const app = express_1.default();
console.log("Hello world");
app.get('/', (req, res) => {
    res.status(200).json({ message: "Hello world 🖖" });
});
app.listen(PORT, () => {
    console.log('🖥️  Server listening... ');
    console.log(`\t 🏠 : http://localhost:${PORT}`);
    console.log(`\t 🌍 : http://${ip_1.default.address()}:${PORT}`);
});
//# sourceMappingURL=index.js.map