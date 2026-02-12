<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Admin — Hard Rock Charlie Foundation</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 px-4 py-8">
	<div class="mx-auto max-w-4xl">
		<h1 class="mb-2 text-3xl font-bold text-gray-900">Admin Dashboard</h1>
		<p class="mb-8 text-gray-600">
			Welcome, {data.user.name || data.user.email}. Manage the foundation from here.
		</p>

		<div class="grid gap-6 sm:grid-cols-3">
			<a
				href="/admin/events"
				class="rounded-lg bg-white p-6 shadow-md transition hover:shadow-lg"
			>
				<h2 class="mb-2 text-lg font-semibold text-gray-900">Events</h2>
				<p class="text-sm text-gray-600">Create and manage events.</p>
			</a>

			<a
				href="/admin/donations"
				class="rounded-lg bg-white p-6 shadow-md transition hover:shadow-lg"
			>
				<h2 class="mb-2 text-lg font-semibold text-gray-900">Donations</h2>
				<p class="text-sm text-gray-600">View all donation records.</p>
			</a>

			<a
				href="/admin/users"
				class="rounded-lg bg-white p-6 shadow-md transition hover:shadow-lg"
			>
				<h2 class="mb-2 text-lg font-semibold text-gray-900">Users</h2>
				<p class="text-sm text-gray-600">Manage user accounts.</p>
			</a>
		</div>
	</div>
</div>
