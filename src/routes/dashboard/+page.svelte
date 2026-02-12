<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Dashboard — Hard Rock Charlie Foundation</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 px-4 py-8">
	<div class="mx-auto max-w-4xl">
		<h1 class="mb-2 text-3xl font-bold text-gray-900">Dashboard</h1>
		<p class="mb-8 text-gray-600">
			Welcome back, {data.user.name || data.user.email}!
		</p>

		<div class="grid gap-6 sm:grid-cols-2">
			<a
				href="/dashboard/events"
				class="rounded-lg bg-white p-6 shadow-md transition hover:shadow-lg"
			>
				<h2 class="mb-2 text-lg font-semibold text-gray-900">My Events</h2>
				<p class="text-sm text-gray-600">View events you've signed up for.</p>
			</a>

			<a
				href="/dashboard/donations"
				class="rounded-lg bg-white p-6 shadow-md transition hover:shadow-lg"
			>
				<h2 class="mb-2 text-lg font-semibold text-gray-900">My Donations</h2>
				<p class="text-sm text-gray-600">View your donation history.</p>
			</a>
		</div>
	</div>
</div>
