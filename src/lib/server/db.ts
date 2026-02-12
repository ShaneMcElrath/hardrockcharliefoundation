import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
	connectionString: process.env.DATABASE_URL || 'postgresql://charlie:charlie@localhost:5432/hardrockcharlie',
	max: 10,
	idleTimeoutMillis: 30000,
	connectionTimeoutMillis: 5000
});

/**
 * Execute a parameterized SQL query.
 *
 * Always use parameterized queries ($1, $2, etc.) to prevent SQL injection.
 *
 * @example
 * // Select
 * const result = await query('SELECT * FROM "user" WHERE id = $1', [userId]);
 *
 * // Insert
 * const result = await query(
 *   'INSERT INTO event (title, description, added_by_user_id) VALUES ($1, $2, $3) RETURNING *',
 *   [title, description, userId]
 * );
 */
export async function query(text: string, params?: unknown[]) {
	const result = await pool.query(text, params);
	return result;
}

/**
 * Get a client from the pool for transactions.
 *
 * @example
 * const client = await getClient();
 * try {
 *   await client.query('BEGIN');
 *   await client.query('UPDATE "user" SET name = $1 WHERE id = $2', [name, id]);
 *   await client.query('COMMIT');
 * } catch (e) {
 *   await client.query('ROLLBACK');
 *   throw e;
 * } finally {
 *   client.release();
 * }
 */
export async function getClient() {
	return await pool.connect();
}

/**
 * Ping the database to check connectivity.
 * Returns true if the database is reachable, false otherwise.
 */
export async function ping(): Promise<boolean> {
	try {
		await pool.query('SELECT 1');
		return true;
	} catch {
		return false;
	}
}
