import mongoose from 'mongoose';
import { config } from 'dotenv';

config();
export class DBConfig {
    constructor(env) {
        this.configuration = {
            host: env.DB_HOST,
            port: env.DB_PORT,
            database: env.DB_DATABASE,
            user: env.DB_USER,
            password: env.DB_PASSWORD,
        }
    }

    connect() {
        const { host, database, user, password } = this.configuration;
        return mongoose.connect(
            `mongodb+srv://${user}:${password}@${host}/${database}?retryWrites=true&w=majority`,
            { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false },
        );
    }

    close() {
        return mongoose.connection.close(false);
    }
}

export const dbConfig = new DBConfig(process.env);
