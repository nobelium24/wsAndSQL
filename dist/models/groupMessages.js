"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupMessageModel = void 0;
const sequelize_1 = require("sequelize");
const userModel_1 = require("./userModel");
const groupModel_1 = require("./groupModel");
const dbName = "wsAndSQL";
const userName = "postgres";
const password = "password";
const host = "host.docker.internal";
const dialect = "postgres";
const sequelize = new sequelize_1.Sequelize(dbName, userName, password, {
    host: host,
    dialect: dialect
});
class GroupMessageModel extends sequelize_1.Model {
}
exports.GroupMessageModel = GroupMessageModel;
GroupMessageModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    senderId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: userModel_1.UserModel,
            key: 'id'
        }
    },
    groupId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: groupModel_1.GroupModel,
            key: 'id'
        }
    },
    message: {
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
    tableName: "groupMessages",
    sequelize
});
