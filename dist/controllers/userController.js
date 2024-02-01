"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const userModel_1 = require("../models/userModel");
const argon2 = __importStar(require("argon2"));
const sessionService_1 = require("../services/sessionService");
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, userName, email, password } = req.body;
        const verifyUser = yield userModel_1.UserModel.findOne({ where: { email: email } });
        if (verifyUser) {
            return res.status(409).send({ message: "User already exists" });
        }
        const hashedPassword = yield argon2.hash(password);
        const user = yield userModel_1.UserModel.create({ firstName, lastName, userName, email, password: hashedPassword });
        return res.status(201).send({ message: "User created successfully", user });
    }
    catch (error) {
        next(error);
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userModel_1.UserModel.findOne({ where: { email: email } });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        const verifyPassword = yield argon2.verify(user.password, password);
        if (!verifyPassword) {
            return res.status(401).send({ message: "Invalid credentials" });
        }
        const token = (0, sessionService_1.generateUserToken)(user.email);
        return res.status(200).send({ message: "Login successful", user, token });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
