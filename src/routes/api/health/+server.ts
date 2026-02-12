import { json } from '@sveltejs/kit';
import { ping } from '$lib/server/db';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const dbHealthy = await ping();

	if (dbHealthy) {
		return json({ status: 'ok', database: 'connected' });
	}

	return json({ status: 'error', database: 'disconnected' }, { status: 503 });
};
