import { getUserFromSession } from '$lib/server/auth';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const sessionId = cookies.get('session');

	if (!sessionId) {
		return { user: null };
	}

	const user = await getUserFromSession(sessionId);

	if (!user) {
		// Session is invalid or expired — clear the cookie
		cookies.delete('session', { path: '/' });
		return { user: null };
	}

	return {
		user: {
			id: user.id,
			email: user.email,
			name: user.name,
			role: user.role
		}
	};
};
