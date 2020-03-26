import express, { Application } from 'express';
import * as bodyParser from 'body-parser';
import { loggerMiddleware } from './middleware/loger';
import { errorMiddleware } from './middleware/error';

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
		this.app.use(loggerMiddleware);
		this.app.use(bodyParser.json());
		this.app.use(errorMiddleware);
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
