import { PostModel } from "./postModel";
import { PrivateMessageModel } from "./privateMessageModel";
import { UserModel } from "./userModel";

UserModel.hasMany(PostModel, {
    foreignKey: 'userId',
    sourceKey: 'id',
    as: 'posts'
})

UserModel.hasMany(PrivateMessageModel, {
    foreignKey: 'senderId',
    as: 'sentMessages'
});

UserModel.hasMany(PrivateMessageModel, {
    foreignKey: 'receiverId',
    as: 'receivedMessages'
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