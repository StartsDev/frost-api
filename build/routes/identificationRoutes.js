"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const identification_controllers_1 = require("../controllers/identification.controllers");
const router = (0, express_1.Router)();
// Register new role
router.post("/create", identification_controllers_1.createIdentification);
// Get roles
router.get("/get-identifications", identification_controllers_1.getIdentifications);
exports.default = router;
