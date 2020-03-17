import { IncomingMessage, ServerResponse } from 'http';
import { Pool } from 'pg';

export const deleteBoard = (req: IncomingMessage, res: ServerResponse, pool: Pool): void => {
	req.on('data', (data: string) => {
		const boardId = data.toString();

		pool.query(`DELETE FROM board WHERE id=${boardId}`);
	});

	res.statusCode = 200;
	res.end('true');
};
