import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { query } from './db';

const SALT_ROUNDS = 12;
const SESSION_EXPIRY_DAYS = 30;

/**
 * Hash a plaintext password with bcrypt (12 salt rounds).
 */
export async function hashPassword(password: string): Promise<string> {
	return await bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Compare a plaintext password against a bcrypt hash.
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
	return await bcrypt.compare(password, hash);
}

/**
 * Create a new session for a user.
 * Generates a random token, inserts it into the session table, and returns the token.
 */
export async function createSession(userId: number): Promise<string> {
	const token = crypto.randomBytes(32).toString('hex');
	const expiresAt = new Date(Date.now() + SESSION_EXPIRY_DAYS * 24 * 60 * 60 * 1000);

	await query(
		`INSERT INTO session (id, user_id, expires_at, added_by_user_id)
		 VALUES ($1, $2, $3, $4)`,
		[token, userId, expiresAt, userId]
	);

	return token;
}

/**
 * Delete a session by its token ID.
 * Uses soft delete (is_active = FALSE) per database-standards.md.
 */
export async function deleteSession(sessionId: string): Promise<void> {
	await query(
		`UPDATE session SET is_active = FALSE, modified_at = NOW() WHERE id = $1`,
		[sessionId]
	);
}

/**
 * Look up a session by token and return the associated user.
 * Returns null if the session is expired, inactive, or doesn't exist.
 */
export async function getUserFromSession(
	sessionId: string
): Promise<{ id: number; email: string; name: string | null; role: string } | null> {
	const result = await query(
		`SELECT u.id, u.email, u.name, u.role
		 FROM session s
		 JOIN "user" u ON u.id = s.user_id
		 WHERE s.id = $1
		   AND s.is_active = TRUE
		   AND u.is_active = TRUE
		   AND s.expires_at > NOW()`,
		[sessionId]
	);

	if (result.rows.length === 0) {
		return null;
	}

	return result.rows[0];
}
