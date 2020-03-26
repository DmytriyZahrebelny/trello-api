import HttpException from './HttpException';

class BoardException extends HttpException {
	constructor(id: number) {
		super(404, `Board data with id ${id} not found`);
	}
}

export default BoardException;
