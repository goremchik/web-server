import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { QuoteService } from '../services/quote.service';
import { QuoteMapper } from '../mappers/quote.mapper';
import { quoteModel } from '../models/quote.model';

const quoteRouter = new Router();
const quoteMapper = new QuoteMapper();
const quoteService = new QuoteService(quoteModel, quoteMapper);

quoteRouter.get('/', async (req, res) => {
    try {
        const quotes = await quoteService.find();
        res.json(quotes);
    } catch(e) {
        res.status(StatusCodes.NOT_FOUND).json(e);
    }
});

quoteRouter.get('/random', async (req, res) => {
    try {
        const quote = await quoteService.findRandom(req.query.tag);
        res.json(quote);
    } catch(e) {
        res.status(StatusCodes.NOT_FOUND).json(e);
    }
});

quoteRouter.post('/', async (req, res) => {
    try {
        const quote = await quoteService.create(req.body);
        res.status(StatusCodes.CREATED).json(quote);
    } catch(e) {
        res.status(StatusCodes.BAD_REQUEST).json(e);
    }
});

quoteRouter.get('/:id', async (req, res) => {
    try {
        const quote = await quoteService.findOne(req.params.id);
        res.json(quote);
    } catch(e) {
        res.status(StatusCodes.NOT_FOUND).json(e);
    }
});

quoteRouter.put('/:id', async (req, res) => {
    try {
        const quote = await quoteService.update(req.params.id, req.body);
        res.json(quote);
    } catch(e) {
        res.status(StatusCodes.NOT_FOUND).json(e);
    }
});

quoteRouter.delete('/:id', async (req, res) => {
    try {
        await quoteService.delete(req.params.id);
        res.send();
    } catch(e) {
        res.status(StatusCodes.NOT_FOUND).json(e);
    }
});

export { quoteRouter };
