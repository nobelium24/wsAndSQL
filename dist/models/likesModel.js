"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikesModel = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const enVar = process.env;
const dbName = enVar.DB_NAME;
const userName = enVar.DB_USERNAME;
const password = enVar.DB_PASSWORD;
const host = enVar.DB_HOST;
const dialect = "postgres";
const port = enVar.DB_PORT ? parseInt(enVar.DB_PORT) : 5432;
if (!dbName || !userName || !password || !host || !dialect) {
    throw new Error("One or more environment variables are not defined");
}
const sequelize = new sequelize_1.Sequelize(dbName, userName, password, {
    host: host,
    dialect: dialect
});
class LikesModel extends sequelize_1.Model {
}
exports.LikesModel = LikesModel;
LikesModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    postId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    }
}, {
    tableName: "likes",
    sequelize
});
