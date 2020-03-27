import { Request, Response, NextFunction } from 'express';
import HttpException from '../exceptions/HttpException';

export const errorMiddleware = (
	error: HttpException,
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	const { status, message } = error;

	res.status(status).send({ error, message });
};
