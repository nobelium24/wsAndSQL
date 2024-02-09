import {Model, DataTypes, Sequelize} from 'sequelize';

import dotenv from 'dotenv';
import { UserModel } from './userModel';
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

export class FriendModel extends Model {
    public id!: number;
    public userId!: number;
    public friendId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

FriendModel.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: UserModel,
            key: 'id'
        }
    },
    friendId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: UserModel,
            key: 'id'
        }
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
    tableName: "friends"
});