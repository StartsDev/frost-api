"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const uuid_1 = require("uuid");
exports.users = [
    {
        id: (0, uuid_1.v4)(),
        firstName: 'Juan',
        lastName: 'Perez',
        email: 'jPerezm@mail.com',
        phone: '1234567222'
    },
    {
        id: (0, uuid_1.v4)(),
        firstName: 'Carro',
        lastName: 'Loco',
        email: 'carroLoco@mail.com',
        phone: '123400212'
    }
];
