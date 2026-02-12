import { redirect } from '@sveltejs/kit';
import { deleteSession } from '$lib/server/auth';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const sessionId = cookies.get('session');

	if (sessionId) {
		// Soft-delete the session from the database
		await deleteSession(sessionId);

		// Clear the cookie
		cookies.delete('session', { path: '/' });
	}

	throw redirect(302, '/');
};
