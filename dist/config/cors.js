"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Lista de orígenes permitidos
const whiteList = [
    "http://localhost:4000", // Frontend local
    "http://127.0.0.1:4000", // Variante en localhost
];
// Permitir llamadas desde Postman / CLI
whiteList.push(undefined);
exports.corsConfig = {
    origin: function (origin, callback) {
        if (whiteList.includes(origin)) {
            callback(null, true);
        }
        else {
            console.error("Bloqueado por CORS:", origin); // debug
            callback(new Error("Error de CORS"));
        }
    },
    credentials: true, // permite cookies y auth headers
};
//# sourceMappingURL=cors.js.map