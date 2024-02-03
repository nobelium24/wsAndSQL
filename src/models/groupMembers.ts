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