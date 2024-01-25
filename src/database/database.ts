import { Sequelize } from 'sequelize';
import { Client } from "pg";

export const database = async () => {
    const dbName = "wsAndSQL";
    const userName = "postgres";
    const password = "password";
    const host = "host.docker.internal";
    const port = 5432;
    const dialect = "postgres";

    const client = new Client({ host: host, user: userName, password: password });

    try {
        await client.connect();

        const dbExists = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${dbName}'`);
        if (dbExists.rowCount === 0) {
            await client.query(`CREATE DATABASE ${dbName}`);
        }
    } catch (error) {
        if (error instanceof Error && 'code' in error && error.code !== "42P04") {
            throw error;
        }
    } finally {
        await client.end();
    }

    const sequelize = new Sequelize(dbName, userName, password, {
        host: host,
        port: port,
        dialect: dialect
    });
    return sequelize;
}