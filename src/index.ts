import App from './app';
import BoardController from './api/boards/boardController';

const app = new App([new BoardController()], 9000);

app.listen();
