"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controllers_1 = require("../controllers/user.controllers");
const router = (0, express_1.Router)();
//User
//Get all users
router.get('/get-users', user_controllers_1.getUsers);
//Get a single user
router.get('/get-user/:id', user_controllers_1.getUser);
// Get all users by rol
router.get('/get-users-rol/:rolId', user_controllers_1.getUsersRol);
//Update user
router.patch('/update-user/:id', user_controllers_1.editUser);
//Delete user
router.patch('/delete-user/:id', user_controllers_1.deleteUser);
exports.default = router;
