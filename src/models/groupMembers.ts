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
});

export class GroupMemberModel extends Model {
    public id!: number;
    public groupId!: number;
    public memberId!: number;
    public isAdmin!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

GroupMemberModel.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    groupId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: GroupModel,
            key: 'id'
        }
    },
    memberId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: UserModel,
            key: 'id'
        }
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
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
    tableName: "groupMembers",
    sequelize
})