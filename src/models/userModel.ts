import {Model, DataTypes, Sequelize} from 'sequelize';
import { PostModel } from './postModel';

const dbName = "wsAndSQL";
const userName = "postgres";
const password = "oluwatobi";
const host = "localhost";
const dialect = "postgres";

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
    id:{
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    firstName:{
        type: DataTypes.STRING(128),
        allowNull: false
    },
    lastName:{
        type: DataTypes.STRING(128),
        allowNull: false
    },
    userName:{
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true
    },
    email:{
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true
    },
    password:{
        type: DataTypes.STRING(128),
        allowNull: false
    },
    createdAt:{
        type: DataTypes.DATE,
        allowNull: false
    },
    updatedAt:{
        type: DataTypes.DATE,
        allowNull: false
    }
},{
    tableName: 'users',
    sequelize: sequelize
})

UserModel.hasMany(PostModel,{
    foreignKey: 'userId',
    sourceKey: 'id',
    as: 'posts'
})