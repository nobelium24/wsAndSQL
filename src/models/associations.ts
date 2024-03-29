import { GroupModel } from "./groupModel";
import { PostModel } from "./postModel";
import { PrivateMessageModel } from "./privateMessageModel";
import { UserModel } from "./userModel";
import { GroupMessageModel } from "./groupMessages";
import { GroupMemberModel } from "./groupMembers";
import dotenv from 'dotenv';
import { Sequelize } from "sequelize";
import { FriendModel } from "./friendModel";
import { LikesModel } from "./likesModel";
import { PhotoModel } from "./photos";
dotenv.config();

const enVar = process.env;

const dbName = enVar.DB_NAME;
const userName = enVar.DB_USERNAME;
const password = enVar.DB_PASSWORD;
const host = enVar.DB_HOST;
const dialect = "postgres";
const port = enVar.DB_PORT ? parseInt(enVar.DB_PORT) : 5432;

if (!dbName || !userName || !password || !host || !dialect) {
    throw new Error("One or more environment variables are not defined")
}

const sequelize = new Sequelize(dbName, userName, password, {
    host: host,
    dialect: dialect
});

UserModel.hasMany(PostModel, {
    foreignKey: 'userId',
    sourceKey: 'id',
    as: 'posts'
})

UserModel.hasMany(PrivateMessageModel, {
    foreignKey: 'senderId',
    as: 'sentMessages',
    sourceKey: 'id'
});

UserModel.hasMany(PrivateMessageModel, {
    foreignKey: 'receiverId',
    as: 'receivedMessages',
    sourceKey: 'id'
});

UserModel.hasMany(GroupModel, {
    foreignKey: 'groupOwner',
    as: 'groups',
    sourceKey: 'id'
});

UserModel.hasMany(GroupMessageModel, {
    foreignKey: 'senderId',
    as: 'groupMessages',
    sourceKey: 'id'
});

UserModel.hasMany(GroupMemberModel, {
    foreignKey: 'memberId',
    as: 'groupMembers',
    sourceKey: 'id'
});

UserModel.hasMany(FriendModel, {
    foreignKey: 'userId',
    as: 'friends',
    sourceKey: 'id'
});

UserModel.hasMany(LikesModel, {
    foreignKey: 'userId',
    as: 'likes',
    sourceKey: 'id'
})

UserModel.hasMany(PhotoModel, {
    foreignKey: 'userId',
    as: 'photos',
    sourceKey: 'id'
})

GroupModel.hasMany(GroupMessageModel, {
    foreignKey: 'groupId',
    as: 'messages',
    sourceKey: 'id'
});

GroupModel.hasMany(GroupMemberModel, {
    foreignKey: 'groupId',
    as: 'members',
    sourceKey: 'id'
});

PostModel.hasMany(LikesModel, {
    foreignKey: 'postId',
    as: 'likes',
    sourceKey: 'id'
})

PostModel.hasMany(PhotoModel, {
    foreignKey: 'postId',
    as: 'photos',
    sourceKey: 'id'
})

PrivateMessageModel.belongsTo(UserModel, {
    foreignKey: "senderId",
    as: "sender",
    targetKey: "id"
});

PrivateMessageModel.belongsTo(UserModel, {
    foreignKey: "receiverId",
    as: "receiver",
    targetKey: "id"
});

PostModel.belongsTo(UserModel, {
    foreignKey: "userId",
    as: "user",
    targetKey: "id"
})

GroupModel.belongsTo(UserModel, {
    foreignKey: "groupOwner",
    as: "owner",
    targetKey: "id"
})

GroupMessageModel.belongsTo(UserModel, {
    foreignKey: "senderId",
    as: "sender",
    targetKey: "id"
})

GroupMessageModel.belongsTo(GroupMessageModel, {
    foreignKey: 'groupId',
    as: 'group',
    targetKey: 'id'
})

GroupMemberModel.belongsTo(UserModel, {
    foreignKey: 'memberId',
    as: 'member',
    targetKey: 'id'
})

GroupMemberModel.belongsTo(GroupModel, {
    foreignKey: 'groupId',
    as: 'group',
    targetKey: 'id'
})

FriendModel.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'user',
    targetKey: 'id'
})

LikesModel.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'user',
    targetKey: 'id'
})

LikesModel.belongsTo(PostModel, {
    foreignKey:'postId',
    as: 'post',
    targetKey:'id'
})

PhotoModel.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'user',
    targetKey: 'id'
})

PhotoModel.belongsTo(PostModel, {
    foreignKey: 'postId',
    as: 'post',
    targetKey: 'id'
})