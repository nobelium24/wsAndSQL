import {Model, DataTypes, Sequelize} from 'sequelize';
import { UserModel } from './userModel';
import dotenv from 'dotenv';
import { PostModel } from './postModel';
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

export class PhotoModel extends Model{
    public id!: number;
    public postId!: number;
    public url!: string;
    public userId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

PhotoModel.init({
    id:{
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    postId:{
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: PostModel,
            key: 'id'
        }
    },
    url:{
        type: DataTypes.STRING,
        allowNull: false
    },
    userId:{
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: UserModel,
            key: 'id'
        }
    }
},{
    sequelize,
    tableName: 'photos'
});