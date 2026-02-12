<script lang="ts">
	import { enhance } from '$app/forms';

	let { form } = $props();
	let loading = $state(false);
</script>

<svelte:head>
	<title>Sign Up — Hard Rock Charlie Foundation</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-gray-50 px-4">
	<div class="w-full max-w-md">
		<div class="rounded-lg bg-white p-8 shadow-md">
			<h1 class="mb-6 text-center text-2xl font-bold text-gray-900">Create an Account</h1>

			{#if form?.error}
				<div class="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">
					{form.error}
				</div>
			{/if}

			<form
				method="POST"
				use:enhance={() => {
					loading = true;
					return async ({ update }) => {
						loading = false;
						await update();
					};
				}}
			>
				<div class="mb-4">
					<label for="name" class="mb-1 block text-sm font-medium text-gray-700">
						Name
					</label>
					<input
						type="text"
						id="name"
						name="name"
						value={form?.name ?? ''}
						class="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
						placeholder="Your name"
					/>
				</div>

				<div class="mb-4">
					<label for="email" class="mb-1 block text-sm font-medium text-gray-700">
						Email
					</label>
					<input
						type="email"
						id="email"
						name="email"
						value={form?.email ?? ''}
						required
						class="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
						placeholder="you@example.com"
					/>
				</div>

				<div class="mb-6">
					<label for="password" class="mb-1 block text-sm font-medium text-gray-700">
						Password
					</label>
					<input
						type="password"
						id="password"
						name="password"
						required
						minlength="8"
						class="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
						placeholder="At least 8 characters"
					/>
				</div>

				<button
					type="submit"
					disabled={loading}
					class="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
				>
					{loading ? 'Creating account...' : 'Sign Up'}
				</button>
			</form>

			<p class="mt-4 text-center text-sm text-gray-600">
				Already have an account?
				<a href="/auth/login" class="font-medium text-blue-600 hover:text-blue-500">
					Log in
				</a>
			</p>
		</div>
	</div>
</div>
