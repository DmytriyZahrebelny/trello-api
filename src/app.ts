// import { Server, IncomingMessage, ServerResponse } from 'http';
// import { Pool } from 'pg';
// import {
// 	createBoard,
// 	sendBoards,
// 	deleteBoard,
// 	updateBoard,
// 	sendBoardData,
// } from './api/boards/board';
// import { createColumn, deleteColumn, updateColumn } from './api/columns/columns';
// import { createCell, deleteCell, updateCellTitle } from './api/cells/cells';

// export const app: Server = new Server();
// const pool = new Pool({
// 	host: '127.0.0.1',
// 	port: 5432,
// 	database: 'test',
// 	user: 'postgres',
// 	password: '1',
// });

// // SELECT b.id, b.name, c.columnname, c.boardid, cl.columnid, cl.title, cl.body FROM board b LEFT JOIN columns c on b.id=c.boardid LEFT JOIN cells cl on c.id=cl.columnid;

// // 'SELECT b.id, b.name, c.columnname, c.boardid FROM board b LEFT JOIN columns c ON b.id=c.boardid where b.id=1';
// // 'SELECT b.id, b.name, c.columnname, c.boardid, cl.columnid, cl.title, cl.body FROM board b LEFT JOIN columns c on b.id=c.boardid LEFT JOIN cells cl on c.id=cl.columnid';

// const server = (req: IncomingMessage, res: ServerResponse): void => {
// 	switch (req.method) {
// 		case 'GET':
// 			if (req.url === '/boards') {
// 				sendBoards(res, pool);
// 			} else if (req.url === '/board-data') {
// 				sendBoardData(req, res, pool);
// 			}
// 			break;
// 		case 'POST':
// 			if (req.url === '/create-board') {
// 				createBoard(req, res, pool);
// 			} else if (req.url === '/create-column') {
// 				createColumn(req, res, pool);
// 			} else if (req.url === '/create-cell') {
// 				createCell(req, res, pool);
// 			}
// 			break;
// 		case 'PUT':
// 			if (req.url === '/update-board') {
// 				updateBoard(req, res, pool);
// 			} else if (req.url === '/update-column') {
// 				updateColumn(req, res, pool);
// 			} else if (req.url === '/update-cell') {
// 				updateCellTitle(req, res, pool);
// 			}
// 			break;
// 		case 'DELETE':
// 			if (req.url === '/delete-board') {
// 				deleteBoard(req, res, pool);
// 			} else if (req.url === '/delete-column') {
// 				deleteColumn(req, res, pool);
// 			} else if (req.url === '/delete-cell') {
// 				deleteCell(req, res, pool);
// 			}
// 			break;
// 		default:
// 			res.statusCode = 501;
// 			res.end('Not implemented');
// 	}
// };

// app.on('request', server);

import express, { Application } from 'express';
import * as bodyParser from 'body-parser';

class App {
	public app: Application;
	public port: number;

	constructor(controllers: any, port: number) {
		this.app = express();
		this.port = port;

		this.initializeMiddlewares();
		this.initializeControllers(controllers);
	}

	private initializeMiddlewares(): void {
		this.app.use(bodyParser.json());
	}

	private initializeControllers(controllers: any): void {
		controllers.forEach((controller: any) => {
			this.app.use('/', controller.router);
		});
	}

	public listen(): void {
		this.app.listen(this.port, () => {
			console.log(`App listening on the port ${this.port}`);
		});
	}
}

export default App;
