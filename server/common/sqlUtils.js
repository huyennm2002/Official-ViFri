import sql from "../config/sql.js";

export async function runQuery(query, params) {
    const connection = await sql.getConnection();
    try {
        //array destructing => take the element at index 0 and assign it to variable rows
        const [rows] = await connection.query(query, params);
        return rows;
    } catch(err) {
        throw err;
    } finally {
        connection.release();
    }
}