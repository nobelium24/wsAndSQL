import { GroupModel } from "./groupModel";
import { PostModel } from "./postModel";
import { PrivateMessageModel } from "./privateMessageModel";
import { UserModel } from "./userModel";
import { GroupMessageModel } from "./groupMessages";
import { GroupMemberModel } from "./groupMembers";

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

GroupModel.hasMany(GroupMessageModel,{
    foreignKey: 'groupId',
    as: 'messages',
    sourceKey: 'id'
});

GroupModel.hasMany(GroupMemberModel, {
    foreignKey: 'groupId',
    as: 'members',
    sourceKey: 'id'
});

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

GroupMessageModel.belongsTo(GroupMessageModel,{
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
