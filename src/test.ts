export interface Boards {
	id: number;
	userId: number;
	boardName: string;
}

export interface Columns {
	id: number;
	boardId: number;
	columnName: string;
}

export interface Cell {
	id: number;
	cellId: number;
	title: string;
	body: string;
}
import { Pool } from 'pg';

const sql = 'SELECT * FROM board';

export const test = async (pool: Pool) => {
	const { rows } = await pool.query(sql);
	return rows;
};
