import express, { Request, Response, NextFunction } from 'express';
import { Pool } from 'pg';
import { ColumnId, CellTitle, CellBody, CellId } from './cellsController.interface';
import HttpException from '../../exceptions/HttpException';

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

	async createCell(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { cellTitle, cellBody, columnId }: CellTitle & CellBody & ColumnId = await req.body;

		try {
			if (cellTitle.length) {
				const { rowCount } = await pool.query(
					`INSERT INTO cells (columnid, title, body) VALUES ('${columnId}', '${cellTitle}', '${cellBody}')`
				);

				if (rowCount === 0) {
					throw new HttpException(404, `Column with id ${columnId} not found`);
				}
			} else {
				throw new HttpException(404, 'min length title 1');
			}
		} catch (error) {
			next(error);
		}

		res.status(200);
		res.send('true');
	}

	async deleteCell(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { cellId }: CellId = await req.body;

		try {
			const { rowCount } = await pool.query(`DELETE FROM cells WHERE id=${cellId}`);

			if (rowCount) {
				res.status(200);
				res.send('true');
			} else {
				throw new HttpException(404, `Cell with id ${cellId} not found`);
			}
		} catch (error) {
			next(error);
		}
	}

	async updateCellTitle(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { cellTitle, cellId }: CellTitle & CellId = await req.body;
		try {
			if (cellTitle.length) {
				const { rowCount } = await pool.query(
					`UPDATE cells SEt title='${cellTitle}' WHERE id=${cellId}`
				);

				if (rowCount) {
					res.status(200);
					res.send('true');
				} else {
					throw new HttpException(404, `Cell with id ${cellId} not found`);
				}
			} else {
				throw new HttpException(404, 'min length title 1');
			}
		} catch (error) {
			next(error);
		}
	}
}

export default CellsController;
