"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const password_controller_1 = require("../controllers/password.controller");
const authjwt_1 = require("../middleware/authjwt");
const router = (0, express_1.Router)();
// Register new password
router.post("/create", password_controller_1.createPassword);
// Reset password
router.post('/reset-password', authjwt_1.verifyToken, password_controller_1.forgotPassword);
// Verify reset-token
router.post('/verify-reset-token/:token', authjwt_1.verifyToken, password_controller_1.VerifyRToken);
// New password
router.patch('/update-password', authjwt_1.verifyToken, password_controller_1.newPassword);
exports.default = router;
