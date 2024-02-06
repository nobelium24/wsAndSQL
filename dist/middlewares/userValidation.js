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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginValidationSchema = exports.userValidationSchema = void 0;
const yup = __importStar(require("yup"));
exports.userValidationSchema = yup.object().shape({
    firstName: yup
        .string()
        .min(2, 'First name is too Short!')
        .max(50, 'First name is too Long!')
        .required('First name is required')
        .matches(/^[a-zA-Z0-9]+$/, "First name must contain only alphabets and numbers allowed"),
    lastName: yup
        .string()
        .min(2, 'First name is too Short!')
        .max(50, 'First name is too Long!')
        .required('First name is required')
        .matches(/^[a-zA-Z0-9]+$/, "First name must contain only alphabets and numbers allowed"),
    userName: yup
        .string()
        .min(2, 'Username is too Short!')
        .max(50, 'Username is too Long!')
        .required('Username is required')
        .matches(/^[a-zA-Z0-9]+$/, "User name must contain only alphabets and numbers allowed"),
    email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required email")
        .matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, "Invalid email address"),
    password: yup
        .string()
        .matches(/^.{8,}$/, 'Password must be at least 8 characters long.')
        .required('Password is required.'),
});
exports.userLoginValidationSchema = yup.lazy((values) => yup.object().shape({
    userName: !values.email
        ? yup
            .string()
            .min(2, "Username is too Short!")
            .max(50, "Username is too Long!")
            .required("Username is required")
            .matches(/^[a-zA-Z0-9]+$/, "User name must contain only alphabets and numbers allowed")
        : yup.string().notRequired(),
    email: !values.userName
        ? yup
            .string()
            .email("Invalid email address")
            .required("Email is required")
            .matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, "Invalid email format")
        : yup.string().notRequired(),
    password: yup
        .string()
        .matches(/^.{8,}$/, "Password must be at least 8 characters long.")
        .required("Password is required."),
}));
