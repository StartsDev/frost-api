"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controllers_1 = require("../controllers/auth.controllers");
//Implement midleware to access / authorization / validations
const router = (0, express_1.Router)();
//Auth
// Register new user
router.post("/register", auth_controllers_1.createUser);
// Login user
//router.post("/login", createUser);
exports.default = router;
