"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const password_controller_1 = require("../controllers/password.controller");
const authjwt_1 = require("../middleware/authjwt");
const router = (0, express_1.Router)();
// Register new password
router.post("/create", authjwt_1.verifyToken, password_controller_1.createPassword);
// Update password
//(Ingresa la vieja clave e ingresa la nueva?)
exports.default = router;
