"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupMemberModel = void 0;
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
class GroupMemberModel extends sequelize_1.Model {
}
exports.GroupMemberModel = GroupMemberModel;
GroupMemberModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    groupId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: groupModel_1.GroupModel,
            key: 'id'
        }
    },
    memberId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: userModel_1.UserModel,
            key: 'id'
        }
    },
    isAdmin: {
        type: sequelize_1.DataTypes.BOOLEAN,
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
    tableName: "groupMembers",
    sequelize
});
