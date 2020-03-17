import { ServerResponse } from 'http';
import { Pool } from 'pg';

export const sendBoards = async (res: ServerResponse, pool: Pool): Promise<void> => {
	const { rows } = await pool.query('SELECT * FROM board');

	res.statusCode = 200;
	res.end(JSON.stringify(rows));
};
