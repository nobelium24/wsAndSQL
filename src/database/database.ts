import { Sequelize } from 'sequelize';
import { Client } from "pg";

export const database = async () => {
    const dbName = "wsAndSQL";
    const userName = "postgres";
    const password = "oluwatobi";
    const host = "localhost";
    const dialect = "postgres";

    const client = new Client({ host: host, user: userName, password: password });

    try {
        await client.connect();
        await client.query(`CREATE DATABASE ${dbName}`);
    } catch (error) {
        if (error instanceof Error && 'code' in error && error.code !== "42P04") {
            throw error;
        }
    } finally {
        await client.end();
    }

    const sequelize = new Sequelize(dbName, userName, password, {
        host: host,
        dialect: dialect 
    });
    return sequelize;
}