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
});

export class PostModel extends Model {
    public id!: number;
    public title!: string;
    public content!: string;
    public userId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

PostModel.init({
    id:{
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    title:{
        type: DataTypes.STRING(128),
        allowNull: false
    },
    content:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    userId:{
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
    tableName: "posts",
    sequelize
})

PostModel.belongsTo(UserModel, {
    foreignKey: "userId",
    as: "user",
    targetKey: "id"
})