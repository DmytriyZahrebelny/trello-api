import { IncomingMessage, ServerResponse } from 'http';
import { Pool } from 'pg';

export const createCell = (req: IncomingMessage, res: ServerResponse, pool: Pool): void => {
	req.on('data', async data => {
		const { title, body, columnId } = await JSON.parse(data);
		await pool.query(
			`INSERT INTO cells (columnid, title, body) VALUES ('${columnId}', '${title}', '${body}')`
		);
	});

	res.statusCode = 200;
	res.end('true');
};

export const deleteCell = (req: IncomingMessage, res: ServerResponse, pool: Pool): void => {
	req.on('data', async data => {
		const cellId = await data.toString();

		await pool.query(`DELETE FROM cells WHERE id=${cellId}`);
	});

	res.statusCode = 200;
	res.end('true');
};

export const updateCellTitle = (req: IncomingMessage, res: ServerResponse, pool: Pool): void => {
	req.on('data', async data => {
		const { title, id } = await JSON.parse(data);

		pool.query(`UPDATE cells SEt title='${title}' WHERE id=${id}`);
	});

	res.statusCode = 200;
	res.end('true');
};
