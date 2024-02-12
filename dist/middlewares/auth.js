"use strict";
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
exports.authenticateUser = void 0;
const userModel_1 = require("../models/userModel");
const sessionService_1 = require("../services/sessionService");
const authenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token)
        return res.status(401).send({ message: "Unauthorized" });
    try {
        const userEmail = (0, sessionService_1.verifyUserToken)(token);
        const user = yield userModel_1.UserModel.findOne({
            where: {
                email: userEmail
            }
        });
        if (!user)
            return res.status(404).send({ message: "User not found" });
        // Store the authenticated user in the request object so it can be used in the controller
        req.user = user;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.authenticateUser = authenticateUser;
