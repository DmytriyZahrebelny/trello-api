import { IncomingMessage, ServerResponse } from 'http';
import { Pool } from 'pg';

export const updateBoard = (req: IncomingMessage, res: ServerResponse, pool: Pool): void => {
	req.on('data', async data => {
		const { name, id } = await JSON.parse(data);

		pool.query(`update board set name='${name}' where id=${id}`);
	});

	res.statusCode = 200;
	res.end('true');
};
