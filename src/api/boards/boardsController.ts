import express, { Request, Response, NextFunction } from 'express';
import { Pool } from 'pg';
import { BoardId, BoardName } from './boardsController.interface';
import HttpException from '../../exceptions/HttpException';

const pool = new Pool({
	host: '127.0.0.1',
	port: 5432,
	database: 'test',
	user: 'postgres',
	password: '1',
});

class BoardsController {
	public router = express.Router();

	constructor() {
		this.intializeRoutes();
	}

	public intializeRoutes(): void {
		this.router.get('/boards', this.getBoards);
		this.router.get('/board-data', this.getBoardData);
		this.router.post('/create-board', this.createBoard);
		this.router.put('/update-board', this.updateBoard);
		this.router.delete('/delete-board', this.deleteBoard);
	}

	async getBoards(req: Request, res: Response): Promise<void> {
		const { rows } = await pool.query('SELECT * FROM board');
		res.status(200);
		res.send(rows);
	}

	async getBoardData(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { boardId }: BoardId = await req.body;

		try {
			const sql = `SELECT b.id, b.name, c.columnname, c.boardid, cl.columnid, cl.title, cl.body FROM board b LEFT JOIN columns c ON b.id=c.boardid LEFT JOIN cells cl ON c.id=cl.columnid WHERE b.id=${boardId}`;
			const { rows } = await pool.query(sql);

			if (rows.length) {
				res.status(200);
				res.send(rows);
			} else {
				throw new HttpException(404, `Board with id ${boardId} not found`);
			}
		} catch (error) {
			next(error);
		}
	}

	async createBoard(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { boardName }: BoardName = await req.body;

		try {
			if (boardName.length) {
				await pool.query(`INSERT INTO board (name) VALUES ('${boardName}')`);
			} else {
				throw new HttpException(400, 'min length board name 1');
			}

			res.status(200);
			res.send('true');
		} catch (error) {
			next(error);
		}
	}

	async updateBoard(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { boardName, boardId }: BoardName & BoardId = await req.body;

		try {
			if (boardName.length) {
				const { rowCount } = await pool.query(
					`UPDATE board SET name='${boardName}' WHERE id=${boardId}`
				);

				if (rowCount) {
					res.status(200);
					res.send('true');
				} else {
					throw new HttpException(404, `Board with id ${boardId} not found`);
				}
			} else {
				throw new HttpException(400, 'min length board name 1');
			}
		} catch (error) {
			next(error);
		}
	}

	async deleteBoard(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { boardId }: BoardId = await req.body;

		try {
			const { rowCount } = await pool.query(`DELETE FROM board WHERE id=${boardId}`);
			if (rowCount) {
				res.status(200);
				res.send('true');
			} else {
				throw new HttpException(404, `Board with id ${boardId} not found`);
			}
		} catch (error) {
			next(error);
		}
	}
}

export default BoardsController;
