import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ parent }) => {
	const { user } = await parent();

	if (!user) {
		throw redirect(302, '/auth/login');
	}

	if (user.role !== 'admin') {
		// Non-admin users get sent to their regular dashboard
		throw redirect(302, '/dashboard');
	}

	return { user };
};
