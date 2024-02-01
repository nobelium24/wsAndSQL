"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const sequelize_1 = require("sequelize");
const dbName = "wsAndSQL";
const userName = "postgres";
const password = "password";
const host = "host.docker.internal";
const dialect = "postgres";
const sequelize = new sequelize_1.Sequelize(dbName, userName, password, {
    host: host,
    dialect: dialect
});
class UserModel extends sequelize_1.Model {
}
exports.UserModel = UserModel;
UserModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false
    },
    userName: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false,
        unique: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false
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
    tableName: 'users',
    sequelize: sequelize
});
