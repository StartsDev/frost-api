"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const identification_controllers_1 = require("../controllers/identification.controllers");
const authjwt_1 = require("../middleware/authjwt");
const router = (0, express_1.Router)();
// Register identification
router.post("/create", authjwt_1.verifyToken, authjwt_1.isSuperUser, identification_controllers_1.createIdentification);
// Get identification
router.get("/get-identifications", identification_controllers_1.getIdentifications);
// Update identification
router.put("/update-identification/:id", authjwt_1.verifyToken, authjwt_1.isSuperUser, identification_controllers_1.updateIdentification);
//Delete identification
router.delete("/delete-identification/:id", authjwt_1.verifyToken, authjwt_1.isSuperUser, identification_controllers_1.deleteIdentification);
exports.default = router;
