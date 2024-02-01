"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = void 0;
const sequelize_1 = require("sequelize");
const userModel_1 = require("./userModel");
const dbName = "wsAndSQL";
const userName = "postgres";
const password = "password";
const host = "host.docker.internal";
const dialect = "postgres";
const sequelize = new sequelize_1.Sequelize(dbName, userName, password, {
    host: host,
    dialect: dialect
});
class PostModel extends sequelize_1.Model {
}
exports.PostModel = PostModel;
PostModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false
    },
    content: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: userModel_1.UserModel,
            key: 'id'
        }
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: "posts",
    sequelize
});
