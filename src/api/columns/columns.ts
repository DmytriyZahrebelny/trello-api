import { IncomingMessage, ServerResponse } from 'http';
import { Pool } from 'pg';

export const createColumn = (req: IncomingMessage, res: ServerResponse, pool: Pool): void => {
	req.on('data', data => {
		const { name, boardId } = JSON.parse(data);

		pool.query(`INSERT INTO columns (columnname, boardid) values ('${name}', '${boardId}')`);
	});

	res.statusCode = 200;
	res.end('true');
};

export const deleteColumn = (req: IncomingMessage, res: ServerResponse, pool: Pool): void => {
	req.on('data', data => {
		const columnId = data.toString();

		pool.query(`DELETE FROM columns WHERE id=${columnId}`);
	});

	res.statusCode = 200;
	res.end('true');
};

export const updateColumn = (req: IncomingMessage, res: ServerResponse, pool: Pool): void => {
	req.on('data', async data => {
		const { name, id } = await JSON.parse(data);

		pool.query(`update columns set columnname='${name}' where id=${id}`);
	});

	res.statusCode = 200;
	res.end('true');
};
