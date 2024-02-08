import { Sequelize } from 'sequelize';
import { Pool } from 'pg';
import { config } from 'dotenv';

export const database = async () => {
    config();

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

    const pool = new Pool({ host: host, user: userName, password: password, database: 'postgres' });

    try {
        const client = await pool.connect();

        const dbExists = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${dbName}'`);
        if (dbExists.rowCount === 0) {
            await client.query(`CREATE DATABASE ${dbName}`);
        }

        client.release();
    } catch (error) {
        if (error instanceof Error && 'code' in error && error.code !== "42P04") {
            throw error;
        }
    } finally {
        await pool.end();
    }

    const sequelize = new Sequelize(dbName, userName, password, {
        host: host,
        port: port,
        dialect: dialect
    });
    return sequelize;
}