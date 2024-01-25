import { Model, DataTypes, Sequelize } from 'sequelize';
import { UserModel } from './userModel'; 

const dbName = "wsAndSQL";
const userName = "postgres";
const password = "password";
const host = "host.docker.internal";
const dialect = "postgres";

const sequelize = new Sequelize(dbName, userName, password, {
    host: host,
    dialect: dialect
});

export class PrivateMessageModel extends Model {
    public id!: number;
    public senderId!: number;
    public receiverId!: number;
    public message!: string;
    public roomId!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

PrivateMessageModel.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    senderId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: UserModel,
            key: 'id'
        }
    },
    receiverId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: UserModel,
            key: 'id'
        }
    },
    message: {
        type: DataTypes.STRING(128),
        allowNull: false
    },
    roomId: {
        type: DataTypes.STRING(128),
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'privateMessages'
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