"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const validator_1 = require("../middlewares/validator");
const userValidation_1 = require("../middlewares/userValidation");
const router = express_1.default.Router();
exports.router = router;
router.post("/register", (0, validator_1.validate)(userValidation_1.userValidationSchema), userController_1.register);
router.post("/login", (0, validator_1.validate)(userValidation_1.userLoginValidationSchema), userController_1.login);
