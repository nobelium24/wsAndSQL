import { Model, DataTypes, Sequelize } from 'sequelize';
import { UserModel } from './userModel';
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

export class LikesModel extends Model {
    public id!: number;
    public userId!: number;
    public postId!: number;
}

LikesModel.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    postId:{
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull:false
    }
}, {
    tableName: "likes",
    sequelize
})