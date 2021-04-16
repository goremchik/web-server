import { Router, Request, Response } from 'express';
import { container } from "tsyringe";
import { StatusCodes } from 'http-status-codes';
import { QuoteService } from '../services/quote.service';
import { QuoteModel } from '../models/quote.model';

const quoteRouter = Router();
container.register("QuoteModel", { useValue: QuoteModel });
const quoteService = container.resolve(QuoteService);

quoteRouter.get('/', async (req: Request, res: Response) => {
    try {
        const quotes = await quoteService.find();
        res.json(quotes);
    } catch(e) {
        res.status(StatusCodes.NOT_FOUND).json(e);
    }
});

quoteRouter.get('/random', async (req: Request, res: Response) => {
    try {
        const quote = await quoteService.findRandom(req.query.tag as string);
        res.json(quote);
    } catch(e) {
        res.status(StatusCodes.NOT_FOUND).json(e);
    }
});

quoteRouter.post('/', async (req: Request, res: Response) => {
    try {
        const quote = await quoteService.create(req.body);
        res.status(StatusCodes.CREATED).json(quote);
    } catch(e) {
        res.status(StatusCodes.BAD_REQUEST).json(e);
    }
});

quoteRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const quote = await quoteService.findOne(req.params.id);
        res.json(quote);
    } catch(e) {
        res.status(StatusCodes.NOT_FOUND).json(e);
    }
});

quoteRouter.put('/:id', async (req: Request, res: Response) => {
    try {
        const quote = await quoteService.update(req.params.id, req.body);
        res.json(quote);
    } catch(e) {
        res.status(StatusCodes.NOT_FOUND).json(e);
    }
});

quoteRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        await quoteService.delete(req.params.id);
        res.send();
    } catch(e) {
        res.status(StatusCodes.NOT_FOUND).json(e);
    }
});

export { quoteRouter };
