import { IncomingMessage, ServerResponse } from 'http';
import { Pool } from 'pg';

export const createBoard = (req: IncomingMessage, res: ServerResponse, pool: Pool): void => {
	req.on('data', data => {
		const boardName = data.toString();
		pool.query(`INSERT INTO board (name) VALUES (${boardName})`);
	});

	res.statusCode = 200;
	res.end('true');
};

export const sendBoards = async (res: ServerResponse, pool: Pool): Promise<void> => {
	const { rows } = await pool.query('SELECT * FROM board');

	res.statusCode = 200;
	res.end(JSON.stringify(rows));
};

export const sendBoardData = (req: IncomingMessage, res: ServerResponse, pool: Pool): void => {
	req.on('data', async data => {
		const boardId = await data.toString();
		const sql = `SELECT b.id, b.name, c.columnname, c.boardid, cl.columnid, cl.title, cl.body FROM board b LEFT JOIN columns c ON b.id=c.boardid LEFT JOIN cells cl ON c.id=cl.columnid WHERE b.id=${boardId}`;
		const { rows } = await pool.query(sql);

		res.statusCode = 200;
		res.end(JSON.stringify(rows));
	});
};

export const updateBoard = (req: IncomingMessage, res: ServerResponse, pool: Pool): void => {
	req.on('data', async data => {
		const { name, id } = await JSON.parse(data);

		pool.query(`UPDATE board SET name='${name}' WHERE id=${id}`);
	});

	res.statusCode = 200;
	res.end('true');
};

export const deleteBoard = (req: IncomingMessage, res: ServerResponse, pool: Pool): void => {
	req.on('data', data => {
		const boardId = data.toString();

		pool.query(`DELETE FROM board WHERE id=${boardId}`);
	});

	res.statusCode = 200;
	res.end('true');
};
