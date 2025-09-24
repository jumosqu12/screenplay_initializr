"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = require("./config/cors");
const cors_2 = __importDefault(require("cors"));
const comandRoutes_1 = __importDefault(require("./routes/comandRoutes"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
// Middlewares
app.use((0, cors_2.default)(cors_1.corsConfig));
app.use(express_1.default.json());
// Rutas API
app.use('/api/v1/screenplay/architecture', comandRoutes_1.default);
// Redirigir cualquier ruta al index.html de React
app.get(/.*/, (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../public', 'index.html'));
});
exports.default = app;
//# sourceMappingURL=server.js.map