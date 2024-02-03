import {Model, DataTypes, Sequelize} from 'sequelize';
import { UserModel } from './userModel';

const dbName = "wsAndSQL";
const userName = "postgres";
const password = "password";
const host = "host.docker.internal";
const dialect = "postgres";

const sequelize = new Sequelize(dbName, userName, password, {
    host: host,
    dialect: dialect
})

export class GroupModel extends Model {
    public id!: number;
    public groupName!: string;
    public groupDescription!: string;
    public groupPhoto!: string;
    public groupOwner!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

GroupModel.init({
    id:{
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    groupName:{
        type: DataTypes.STRING(128),
        allowNull: false
    },
    groupDescription:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    groupPhoto:{
        type: DataTypes.STRING(128),
        allowNull: false
    },
    groupOwner:{
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: UserModel,
            key: 'id'
        }
    },
    createdAt:{
        type: DataTypes.DATE,
        allowNull: false
    },
    updatedAt:{
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: "groups",
    sequelize
})