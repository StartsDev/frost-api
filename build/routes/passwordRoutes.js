"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const password_controller_1 = require("../controllers/password.controller");
const router = (0, express_1.Router)();
// Register new password
// router.post("/create", verifyToken, createPassword);
router.post("/create", password_controller_1.createPassword);
// Update password
//(Ingresa la vieja clave e ingresa la nueva?)
exports.default = router;
