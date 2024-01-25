"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivateMessageModel = void 0;
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
class PrivateMessageModel extends sequelize_1.Model {
}
exports.PrivateMessageModel = PrivateMessageModel;
PrivateMessageModel.init({
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
    receiverId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: userModel_1.UserModel,
            key: 'id'
        }
    },
    message: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false
    },
    roomId: {
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
    sequelize,
    tableName: 'privateMessages'
});
PrivateMessageModel.belongsTo(userModel_1.UserModel, {
    foreignKey: "senderId",
    as: "sender",
    targetKey: "id"
});
PrivateMessageModel.belongsTo(userModel_1.UserModel, {
    foreignKey: "receiverId",
    as: "receiver",
    targetKey: "id"
});
