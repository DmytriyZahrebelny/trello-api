import { Request, Response, NextFunction } from 'express';
import HttpException from '../exceptions/HttpException';

export const errorMiddleware = (
	error: HttpException,
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	const status = error.status || 500;
	const message = error.message || 'Something went wrong';

	res.contentType('json');
	res.status(status).send({ error, message });
};
