"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postModel_1 = require("./postModel");
const privateMessageModel_1 = require("./privateMessageModel");
const userModel_1 = require("./userModel");
userModel_1.UserModel.hasMany(postModel_1.PostModel, {
    foreignKey: 'userId',
    sourceKey: 'id',
    as: 'posts'
});
userModel_1.UserModel.hasMany(privateMessageModel_1.PrivateMessageModel, {
    foreignKey: 'senderId',
    as: 'sentMessages'
});
userModel_1.UserModel.hasMany(privateMessageModel_1.PrivateMessageModel, {
    foreignKey: 'receiverId',
    as: 'receivedMessages'
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
