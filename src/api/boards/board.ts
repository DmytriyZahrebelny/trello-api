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

export const sendBoards = async (res: ServerResponse, pool: Pool): Promise<void> => {
	const { rows } = await pool.query('SELECT * FROM board');

	res.statusCode = 200;
	res.end(JSON.stringify(rows));
};

export const updateBoard = (req: IncomingMessage, res: ServerResponse, pool: Pool): void => {
	req.on('data', async data => {
		const { name, id } = await JSON.parse(data);

		pool.query(`update board set name='${name}' where id=${id}`);
	});

	res.statusCode = 200;
	res.end('true');
};

export const deleteBoard = (req: IncomingMessage, res: ServerResponse, pool: Pool): void => {
	req.on('data', (data: string) => {
		const boardId = data.toString();

		pool.query(`DELETE FROM board WHERE id=${boardId}`);
	});

	res.statusCode = 200;
	res.end('true');
};
