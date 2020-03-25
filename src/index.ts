import App from './app';
import BoardsController from './api/boards/boardsController';
import ColumnsController from './api/columns/ColumnsController';

const app = new App([new BoardsController(), new ColumnsController()], 9000);

app.listen();
