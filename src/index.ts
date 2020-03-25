import App from './app';
import BoardsController from './api/boards/boardsController';
import ColumnsController from './api/columns/columnsController';
import CellsController from './api/cells/cellsController';

const app = new App([new BoardsController(), new ColumnsController(), new CellsController()], 9000);

app.listen();
