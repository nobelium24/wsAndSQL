import {Model, DataTypes, Sequelize} from 'sequelize';
import { UserModel } from './userModel';
import { GroupModel } from './groupModel';

const dbName = "wsAndSQL";
const userName = "postgres";
const password = "password";
const host = "host.docker.internal";
const dialect = "postgres";

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