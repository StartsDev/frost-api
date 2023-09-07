"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const avatarUser_controllers_1 = require("../controllers/avatarUser.controllers");
const user_controllers_1 = require("../controllers/user.controllers");
const authjwt_1 = require("../middleware/authjwt");
const router = (0, express_1.Router)();
//User
//Get all users
router.get('/get-users', user_controllers_1.getUsers);
//Get a single user
router.get('/get-user/:id', user_controllers_1.getUser);
// Get all users by rol
router.get('/get-users-rol/:rolId', user_controllers_1.getUsersRol);
//Update user
router.patch('/update-user/:id', authjwt_1.verifyToken, user_controllers_1.editUser);
//Delete user
router.patch('/delete-user/:id', authjwt_1.verifyToken, user_controllers_1.deleteUser);
//Update avatar user
router.post("/upload-avatar-user/:id", authjwt_1.verifyToken, avatarUser_controllers_1.upImgEquip);
exports.default = router;
