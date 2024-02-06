import { Model, DataTypes, Sequelize } from 'sequelize';
import { PostModel } from './postModel';
import { PrivateMessageModel } from './privateMessageModel';
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
});

export class UserModel extends Model {
    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public userName!: string;
    public email!: string;
    public password!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

UserModel.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING(128),
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING(128),
        allowNull: false
    },
    userName: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true
    },
    password: {
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
    tableName: 'users',
    sequelize: sequelize
})

