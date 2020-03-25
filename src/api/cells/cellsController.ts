import express, { Request, Response } from 'express';
import { Pool } from 'pg';
import { ColumnId, CellTitle, CellBody, CellId } from './cellsController.interface';

const pool = new Pool({
	host: '127.0.0.1',
	port: 5432,
	database: 'test',
	user: 'postgres',
	password: '1',
});

class CellsController {
	public router = express.Router();

	constructor() {
		this.intializeRoutes();
	}

	public intializeRoutes(): void {
		this.router.post('/create-cell', this.createCell);
		this.router.put('/update-cell', this.updateCellTitle);
		this.router.delete('/delete-cell', this.deleteCell);
	}

	async createCell(req: Request, res: Response): Promise<void> {
		const { cellTitle, cellBody, columnId }: CellTitle & CellBody & ColumnId = await req.body;
		await pool.query(
			`INSERT INTO cells (columnid, title, body) VALUES ('${columnId}', '${cellTitle}', '${cellBody}')`
		);

		res.status(200);
		res.send('true');
	}

	async deleteCell(req: Request, res: Response): Promise<void> {
		const { cellId }: CellId = await req.body;
		await pool.query(`DELETE FROM cells WHERE id=${cellId}`);

		res.status(200);
		res.send('true');
	}

	async updateCellTitle(req: Request, res: Response): Promise<void> {
		const { cellTitle, cellId }: CellTitle & CellId = await req.body;
		await pool.query(`UPDATE cells SEt title='${cellTitle}' WHERE id=${cellId}`);

		res.status(200);
		res.send('true');
	}
}

export default CellsController;
