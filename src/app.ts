import "reflect-metadata";
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { container } from 'tsyringe';
import passport from 'passport';
import morgan from 'morgan';

import { StorageType } from './core/enums';
import { DBConfig } from './core/config/db.config';
import { QuotesModule } from './quotes/quotes.module';
import { AuthModule } from './auth/auth.module';
import { healthCheckRouter } from './core/routers';
import { LoggerService } from './core/services';

const startApp = async (port: number) => {
    container.register<any>('env', { useValue: process.env });
    const dbConfig = container.resolve(DBConfig);
    const quotesModule = container.resolve(QuotesModule);
    const authModule = container.resolve(AuthModule);
    const logger = container.resolve(LoggerService);
    const origin = process.env.CORS_ORIGIN;

    const app = express();
    app.use(express.json());
    app.use(cors(origin ? { origin } : {}));
    app.use(helmet());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(morgan('combined'));

    app.use(
        '/api/quotes',
        passport.authenticate('jwt', { session: false }),
        quotesModule.getRouter(),
    );
    app.use('/api/auth', authModule.getRouter());
    app.use('/', healthCheckRouter);
    const useMongo = process.env.STORAGE_TYPE === StorageType.Mongo.toString();

    try {
        if (useMongo) {
            await dbConfig.connect();
        }

        const server = app.listen(port, () => logger.log(`App starts on port: ${port}`));
        const sigs = ['SIGINT', 'SIGTERM', 'SIGQUIT'];

        sigs.forEach(signal => process.on(signal, () => {
            server.close(async () => {
                logger.log('Server stops.');
                if (useMongo) {
                    console.log('Waiting to close DB connection ...');
                    await dbConfig.close();
                }
                process.exit(0);
            });
        }));

        process.on('uncaughtExceptionMonitor', (error) => {
            logger.error('UncaughtExceptionMonitor -', error);
        });
    
        process.on('unhandledRejection', (error) => {
            logger.error('UnhandledPromiseRejection -', error);
        });
    } catch (e) {
        logger.error(e);
        process.exit(1);
    }
};

startApp(parseInt(process.env.PORT || '3000'));
