import express, { Request, Response } from 'express';
import { Pool } from 'pg';
import { ColumnId, ColumnName, BoardId } from './columnsController.interface';

const pool = new Pool({
	host: '127.0.0.1',
	port: 5432,
	database: 'test',
	user: 'postgres',
	password: '1',
});

class ColumnsController {
	public router = express.Router();

	constructor() {
		this.intializeRoutes();
	}

	public intializeRoutes(): void {
		this.router.post('/create-column', this.createColumn);
		this.router.delete('/delete-column', this.deleteColumn);
		this.router.put('/update-column', this.updateColumn);
	}

	async createColumn(req: Request, res: Response): Promise<void> {
		const { columnName, boardId }: ColumnName & BoardId = await req.body;
		await pool.query(
			`INSERT INTO columns (columnname, boardid) VALUES ('${columnName}', '${boardId}')`
		);

		res.status(200);
		res.send('true');
	}

	async deleteColumn(req: Request, res: Response): Promise<void> {
		const { columnId }: ColumnId = await req.body;

		await pool.query(`DELETE FROM columns WHERE id=${columnId}`);

		res.status(200);
		res.send('true');
	}

	async updateColumn(req: Request, res: Response): Promise<void> {
		const { columnName, columnId }: ColumnName & ColumnId = await req.body;

		await pool.query(`UPDATE columns SET columnname='${columnName}' WHERE id=${columnId}`);

		res.status(200);
		res.send('true');
	}
}

export default ColumnsController;
