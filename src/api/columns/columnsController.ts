import express, { Request, Response, NextFunction } from 'express';
import { Pool } from 'pg';
import { ColumnId, ColumnName, BoardId } from './columnsController.interface';
import HttpException from '../../exceptions/HttpException';

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

	async createColumn(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { columnName, boardId }: ColumnName & BoardId = await req.body;

		try {
			if (columnName.length) {
				const { rowCount } = await pool.query(
					`INSERT INTO columns (columnname, boardid) VALUES ('${columnName}', '${boardId}')`
				);

				if (rowCount) {
					res.status(200);
					res.send('true');
				} else {
					throw new HttpException(404, `Board with id ${boardId} not found`);
				}
			} else {
				throw new HttpException(400, 'min length column name 1');
			}
		} catch (error) {
			next(error);
		}
	}

	async deleteColumn(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { columnId }: ColumnId = await req.body;

		try {
			const { rowCount } = await pool.query(`DELETE FROM columns WHERE id=${columnId}`);

			if (rowCount) {
				res.status(200);
				res.send('true');
			} else {
				throw new HttpException(404, `Column with id ${columnId} not found`);
			}
		} catch (error) {
			next(error);
		}
	}

	async updateColumn(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { columnName, columnId }: ColumnName & ColumnId = await req.body;

		try {
			if (columnName.length) {
				const { rowCount } = await pool.query(
					`UPDATE columns SET columnname='${columnName}' WHERE id=${columnId}`
				);

				if (rowCount) {
					res.status(200);
					res.send('true');
				}
			} else {
				throw new HttpException(400, 'min length column name 1');
			}
		} catch (error) {
			next(error);
		}
	}
}

export default ColumnsController;
