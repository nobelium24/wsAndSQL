"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const groupModel_1 = require("./groupModel");
const postModel_1 = require("./postModel");
const privateMessageModel_1 = require("./privateMessageModel");
const userModel_1 = require("./userModel");
const groupMessages_1 = require("./groupMessages");
const groupMembers_1 = require("./groupMembers");
const dotenv_1 = __importDefault(require("dotenv"));
const sequelize_1 = require("sequelize");
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
userModel_1.UserModel.hasMany(postModel_1.PostModel, {
    foreignKey: 'userId',
    sourceKey: 'id',
    as: 'posts'
});
userModel_1.UserModel.hasMany(privateMessageModel_1.PrivateMessageModel, {
    foreignKey: 'senderId',
    as: 'sentMessages',
    sourceKey: 'id'
});
userModel_1.UserModel.hasMany(privateMessageModel_1.PrivateMessageModel, {
    foreignKey: 'receiverId',
    as: 'receivedMessages',
    sourceKey: 'id'
});
userModel_1.UserModel.hasMany(groupModel_1.GroupModel, {
    foreignKey: 'groupOwner',
    as: 'groups',
    sourceKey: 'id'
});
userModel_1.UserModel.hasMany(groupMessages_1.GroupMessageModel, {
    foreignKey: 'senderId',
    as: 'groupMessages',
    sourceKey: 'id'
});
userModel_1.UserModel.hasMany(groupMembers_1.GroupMemberModel, {
    foreignKey: 'memberId',
    as: 'groupMembers',
    sourceKey: 'id'
});
groupModel_1.GroupModel.hasMany(groupMessages_1.GroupMessageModel, {
    foreignKey: 'groupId',
    as: 'messages',
    sourceKey: 'id'
});
groupModel_1.GroupModel.hasMany(groupMembers_1.GroupMemberModel, {
    foreignKey: 'groupId',
    as: 'members',
    sourceKey: 'id'
});
privateMessageModel_1.PrivateMessageModel.belongsTo(userModel_1.UserModel, {
    foreignKey: "senderId",
    as: "sender",
    targetKey: "id"
});
privateMessageModel_1.PrivateMessageModel.belongsTo(userModel_1.UserModel, {
    foreignKey: "receiverId",
    as: "receiver",
    targetKey: "id"
});
postModel_1.PostModel.belongsTo(userModel_1.UserModel, {
    foreignKey: "userId",
    as: "user",
    targetKey: "id"
});
groupModel_1.GroupModel.belongsTo(userModel_1.UserModel, {
    foreignKey: "groupOwner",
    as: "owner",
    targetKey: "id"
});
groupMessages_1.GroupMessageModel.belongsTo(userModel_1.UserModel, {
    foreignKey: "senderId",
    as: "sender",
    targetKey: "id"
});
groupMessages_1.GroupMessageModel.belongsTo(groupMessages_1.GroupMessageModel, {
    foreignKey: 'groupId',
    as: 'group',
    targetKey: 'id'
});
groupMembers_1.GroupMemberModel.belongsTo(userModel_1.UserModel, {
    foreignKey: 'memberId',
    as: 'member',
    targetKey: 'id'
});
groupMembers_1.GroupMemberModel.belongsTo(groupModel_1.GroupModel, {
    foreignKey: 'groupId',
    as: 'group',
    targetKey: 'id'
});
