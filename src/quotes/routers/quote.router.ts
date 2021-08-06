import { Router, Request, Response } from 'express';
import { inject, singleton } from "tsyringe";
import { StatusCodes } from 'http-status-codes';
import { QuoteService, QuoteStorageService } from '../services';
import { LoggerService } from '../../core/services';

@singleton()
export class QuoteRouter {
    quoteRouter = Router();
    constructor(
        @inject('QuoteService') private quoteService: QuoteService | QuoteStorageService,
        private logger: LoggerService,
    ) {
        this.logger.setContext(QuoteRouter.name);
    }
    
    defineRouter(): Router {
        this.quoteRouter.get('/', async (req: Request, res: Response) => {
            try {
                const quotes = await this.quoteService.find();
                res.json(quotes);
            } catch(e) {
                this.logger.error(e);
                res.status(StatusCodes.NOT_FOUND).json(e);
            }
        });

        this.quoteRouter.get('/random', async (req: Request, res: Response) => {
            try {
                const quote = await this.quoteService.findRandom(req.query.tag as string);
                res.json(quote);
            } catch(e) {
                this.logger.error(e);
                res.status(StatusCodes.NOT_FOUND).json(e);
            }
        });

        this.quoteRouter.post('/', async (req: Request, res: Response) => {
            try {
                const quote = await this.quoteService.create(req.body);
                res.status(StatusCodes.CREATED).json(quote);
            } catch(e) {
                this.logger.error(e);
                res.status(StatusCodes.BAD_REQUEST).json(e);
            }
        });

        this.quoteRouter.get('/:id', async (req: Request, res: Response) => {
            try {
                const quote = await this.quoteService.findOne(req.params.id);
                res.json(quote);
            } catch(e) {
                this.logger.error(e);
                res.status(StatusCodes.NOT_FOUND).json(e);
            }
        });

        this.quoteRouter.put('/:id', async (req: Request, res: Response) => {
            try {
                const quote = await this.quoteService.update(req.params.id, req.body);
                res.json(quote);
            } catch(e) {
                this.logger.error(e);
                res.status(StatusCodes.NOT_FOUND).json(e);
            }
        });

        this.quoteRouter.delete('/:id', async (req: Request, res: Response) => {
            try {
                await this.quoteService.delete(req.params.id);
                res.send();
            } catch(e) {
                this.logger.error(e);
                res.status(StatusCodes.NOT_FOUND).json(e);
            }
        });

        return this.quoteRouter;
    }
}
