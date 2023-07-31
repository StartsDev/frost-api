"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const role_controllers_1 = require("../controllers/role.controllers");
const router = (0, express_1.Router)();
// Register new role
router.post("/create", role_controllers_1.createRole);
// Get roles
router.get("/get-roles", role_controllers_1.getRoles);
exports.default = router;
