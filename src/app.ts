import { Server, IncomingMessage, ServerResponse } from 'http';
import { Pool } from 'pg';
import { createBoard, sendBoards, deleteBoard, updateBoard } from './api/boards/board';

export const app: Server = new Server();
const pool = new Pool({
	host: '127.0.0.1',
	port: 5432,
	database: 'test',
	user: 'postgres',
	password: '1',
});

// const fields = ['schemaname', 'tablename', 'tableowner'].join(', ');
// const sql = 'SELECT * FROM columns ORDER BY id ASC';
// SELECT b.id, b.name, c.columnname, c.boardid, cl.columnid, cl.title, cl.body FROM board b LEFT JOIN columns c on b.id=c.boardid LEFT JOIN cells cl on c.id=cl.columnid;

// const sql =
// 	'SELECT b.id, b.name, c.columnname, c.boardid FROM board b LEFT JOIN columns c ON b.id=c.boardid where b.id=1';
// 'SELECT b.id, b.name, c.columnname, c.boardid, cl.columnid, cl.title, cl.body FROM board b LEFT JOIN columns c on b.id=c.boardid LEFT JOIN cells cl on c.id=cl.columnid';

// 'SELECT b.id, b.name, c.columnname, c.boardid FROM board b LEFT JOIN columns c on b.id=c.boardid';

const server = (req: IncomingMessage, res: ServerResponse): void => {
	switch (req.method) {
		case 'GET':
			if (req.url === '/boards') {
				sendBoards(res, pool);
			}
			break;
		case 'POST':
			if (req.url === '/create-board') {
				createBoard(req, res, pool);
			}
			break;
		case 'PUT':
			if (req.url === '/update-board') {
				updateBoard(req, res, pool);
			}
			break;
		case 'DELETE':
			if (req.url === '/delete-board') {
				deleteBoard(req, res, pool);
			}
			break;
		default:
			res.statusCode = 501;
			res.end('Not implemented');
	}
};

app.on('request', server);