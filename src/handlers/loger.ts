import express from 'express';

export const loggerMiddleware = (
	request: express.Request,
	response: express.Response,
	next: any
): void => {
	console.log(`${request.method} ${request.path}`);
	next();
};
