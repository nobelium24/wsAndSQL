"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupModel = void 0;
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
class GroupModel extends sequelize_1.Model {
}
exports.GroupModel = GroupModel;
GroupModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    groupName: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false
    },
    groupDescription: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    groupPhoto: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false
    },
    groupOwner: {
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
    tableName: "groups",
    sequelize
});
