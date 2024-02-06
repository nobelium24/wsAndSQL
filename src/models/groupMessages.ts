import {Model, DataTypes, Sequelize} from 'sequelize';
import { UserModel } from './userModel';
import { GroupModel } from './groupModel';
import dotenv from 'dotenv';
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
})

export class GroupMessageModel extends Model {
    public id!: number;
    public senderId!: number;
    public groupId!: number;
    public message!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

GroupMessageModel.init({
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
    groupId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: GroupModel,
            key: 'id'
        }
    },
    message: {
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
    tableName: "groupMessages",
    sequelize
})