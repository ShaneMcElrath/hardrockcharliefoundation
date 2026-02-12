import { fail, redirect } from '@sveltejs/kit';
import { verifyPassword, createSession } from '$lib/server/auth';
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

		// Validate inputs
		if (!email || !password) {
			return fail(400, {
				error: 'Email and password are required.',
				email: email || ''
			});
		}

		// Look up the user
		const result = await query(
			`SELECT id, email, password_hash, name, role
			 FROM "user"
			 WHERE email = $1 AND is_active = TRUE`,
			[email]
		);

		if (result.rows.length === 0) {
			return fail(400, {
				error: 'Invalid email or password.',
				email
			});
		}

		const user = result.rows[0];

		// Verify password
		const valid = await verifyPassword(password, user.password_hash);

		if (!valid) {
			return fail(400, {
				error: 'Invalid email or password.',
				email
			});
		}

		// Create session and set cookie
		const sessionToken = await createSession(user.id);

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
