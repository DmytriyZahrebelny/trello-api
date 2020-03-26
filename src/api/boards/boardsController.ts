import express, { Request, Response, NextFunction } from 'express';
import { Pool } from 'pg';
import { BoardId, BoardName } from './boardsController.interface';
import BoardException from '../../exceptions/BoardException';

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

			if (rows.length === 0) {
				throw 'Error';
			}

			res.status(200);
			res.send(rows);
		} catch (error) {
			next(new BoardException(boardId));
		}
	}

	async createBoard(req: Request, res: Response): Promise<void> {
		const { boardName }: BoardName = await req.body;
		await pool.query(`INSERT INTO board (name) VALUES ('${boardName}')`);

		res.status(200);
		res.send('true');
	}

	async updateBoard(req: Request, res: Response): Promise<void> {
		const { boardName, boardId }: BoardName & BoardId = await req.body;

		await pool.query(`UPDATE board SET name='${boardName}' WHERE id=${boardId}`);

		res.status(200);
		res.send('true');
	}

	async deleteBoard(req: Request, res: Response): Promise<void> {
		const { boardId }: BoardId = await req.body;

		await pool.query(`DELETE FROM board WHERE id=${boardId}`);

		res.status(200);
		res.send('true');
	}
}

export default BoardsController;
