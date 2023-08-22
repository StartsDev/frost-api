"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controllers_1 = require("../controllers/auth.controllers");
const authjwt_1 = require("../middleware/authjwt");
const router = (0, express_1.Router)();
//Auth
// Register new user
router.post("/register", auth_controllers_1.createUser);
// Login user
router.post("/login", auth_controllers_1.loginUser);
// Get user info (Home page)
router.get("/get-user-info", authjwt_1.verifyToken, auth_controllers_1.getUserInfo);
// Reset password
// Update password
exports.default = router;
