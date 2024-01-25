"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const sequelize_1 = require("sequelize");
const pg_1 = require("pg");
const database = () => __awaiter(void 0, void 0, void 0, function* () {
    const dbName = "wsAndSQL";
    const userName = "postgres";
    const password = "password";
    const host = "host.docker.internal";
    const port = 5432;
    const dialect = "postgres";
    const client = new pg_1.Client({ host: host, user: userName, password: password });
    try {
        yield client.connect();
        const dbExists = yield client.query(`SELECT 1 FROM pg_database WHERE datname = '${dbName}'`);
        if (dbExists.rowCount === 0) {
            yield client.query(`CREATE DATABASE ${dbName}`);
        }
    }
    catch (error) {
        if (error instanceof Error && 'code' in error && error.code !== "42P04") {
            throw error;
        }
    }
    finally {
        yield client.end();
    }
    const sequelize = new sequelize_1.Sequelize(dbName, userName, password, {
        host: host,
        port: port,
        dialect: dialect
    });
    return sequelize;
});
exports.database = database;
