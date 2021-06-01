import { singleton, inject } from "tsyringe";
import mongoose from 'mongoose';
import { config } from 'dotenv';
import { IDBConfig, IEnv } from '../interfaces';

config();

@singleton()
export class DBConfig {
    configuration: IDBConfig;

    constructor(@inject('env') env: IEnv) {
        this.configuration = {
            host: env.DB_HOST,
            port: env.DB_PORT,
            database: env.DB_DATABASE,
            user: env.DB_USER,
            password: env.DB_PASSWORD,
        }
    }

    connect(): Promise<typeof import("mongoose")> {
        const { host, database, user, password } = this.configuration;
        return mongoose.connect(
            `mongodb+srv://${user}:${password}@${host}/${database}?retryWrites=true&w=majority`,
            { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false },
        );
    }

    close(): Promise<void> {
        return mongoose.connection.close(false);
    }
}
