import { fail, redirect } from '@sveltejs/kit';
import { hashPassword, createSession } from '$lib/server/auth';
import { query } from '$lib/server/db';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { user } = await parent();

	// Already logged in — redirect to dashboard
	if (user) {
		throw redirect(302, '/dashboard');
	}
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = formData.get('email')?.toString().trim().toLowerCase();
		const password = formData.get('password')?.toString();
		const name = formData.get('name')?.toString().trim();

		// Validate inputs
		if (!email || !password) {
			return fail(400, {
				error: 'Email and password are required.',
				email: email || '',
				name: name || ''
			});
		}

		if (password.length < 8) {
			return fail(400, {
				error: 'Password must be at least 8 characters.',
				email,
				name: name || ''
			});
		}

		// Check if email is already taken
		const existing = await query(
			`SELECT id FROM "user" WHERE email = $1 AND is_active = TRUE`,
			[email]
		);

		if (existing.rows.length > 0) {
			return fail(400, {
				error: 'An account with this email already exists.',
				email,
				name: name || ''
			});
		}

		// Create the user
		const passwordHash = await hashPassword(password);
		const result = await query(
			`INSERT INTO "user" (email, password_hash, name)
			 VALUES ($1, $2, $3)
			 RETURNING id`,
			[email, passwordHash, name || null]
		);

		const userId = result.rows[0].id;

		// Update added_by_user_id to self (user created their own account)
		await query(
			`UPDATE "user" SET added_by_user_id = $1 WHERE id = $1`,
			[userId]
		);

		// Create session and set cookie
		const sessionToken = await createSession(userId);

		cookies.set('session', sessionToken, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 30 * 24 * 60 * 60 // 30 days in seconds
		});

		throw redirect(303, '/dashboard');
	}
};
