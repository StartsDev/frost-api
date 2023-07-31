"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const password_controller_1 = require("../controllers/password.controller");
const router = (0, express_1.Router)();
// Register new password
router.post("/create", password_controller_1.createPassword);
exports.default = router;
