import { registry, singleton, inject } from "tsyringe";
import { Router } from 'express';
import { StorageType } from '../core/enums';
import { QuoteModel } from './models';
import { QuoteRouter } from './routers/quote.router';
import { QuoteService, QuoteStorageService } from './services';

@registry([
    { token: 'QuoteModel', useValue:  QuoteModel },
    { 
        token: 'QuoteService',
        useClass: process.env.STORAGE_TYPE === StorageType.S3 ? QuoteStorageService : QuoteService
    },
])
@singleton()
export class QuotesModule {
    constructor(@inject(QuoteRouter) private quoteRouter: QuoteRouter) {}

    getRouter(): Router {
        return this.quoteRouter.defineRouter();
    }
}