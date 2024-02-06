import { Sequelize } from 'sequelize';
import { Client } from "pg";
import { config } from "dotenv";

export const database = async () => {
    config();

    // console.log(process.env, 59);

    const enVar = process.env;

    const dbName = enVar.DB_NAME;
    const userName = enVar.DB_USERNAME;
    const password = enVar.DB_PASSWORD;
    const host = enVar.DB_HOST;
    const dialect = "postgres";
    const port = enVar.DB_PORT ? parseInt(enVar.DB_PORT) : 5432;

    // const dbName = "wsAndSQL";
    // const userName = "postgres";
    // const password = "password";
    // const host = "host.docker.internal";
    // const port = 5432;
    // const dialect = "postgres";
    
    if (!dbName || !userName || !password || !host || !dialect) {
        throw new Error("One or more environment variables are not defined")
    }

    // console.log(dbName, userName, password, host, dialect, port)

    const client = new Client({ host: host, user: userName, password: password });

    try {
        await client.connect();

        const dbExists = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${dbName}'`);
        if (dbExists.rowCount === 0) {
            await client.query(`CREATE DATABASE ${dbName}`);
        }
    } catch (error) {
        if (error instanceof Error && 'code' in error && error.code !== "42P04") {
            console.log(error, 45)
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