import { IncomingMessage, ServerResponse } from 'http';
import { Pool } from 'pg';

export const createBoard = (req: IncomingMessage, res: ServerResponse, pool: Pool): void => {
	req.on('data', (data: string) => {
		const userResponse = data.toString();
		pool.query(`INSERT INTO board (name) values (${userResponse})`);
	});

	res.statusCode = 200;
	res.end('true');
};
