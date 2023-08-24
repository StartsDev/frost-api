"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const role_controllers_1 = require("../controllers/role.controllers");
const authjwt_1 = require("../middleware/authjwt");
const router = (0, express_1.Router)();
// Register role
router.post("/create", authjwt_1.verifyToken, authjwt_1.isSuperUser, role_controllers_1.createRole);
// Get roles
router.get("/get-roles", role_controllers_1.getRoles);
// Update role
router.put("/update-role/:id", authjwt_1.verifyToken, authjwt_1.isSuperUser, role_controllers_1.updateRole);
//Delete role
router.delete("/delete-role/:id", authjwt_1.verifyToken, authjwt_1.isSuperUser, role_controllers_1.deleteRole);
exports.default = router;
