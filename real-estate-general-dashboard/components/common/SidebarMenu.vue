<script setup>
	const router = useRouter();
	const { logUserOut } = useAuthStore();

	const links = [
		{ name: 'Dashboard', link: '/', icon: 'mdi:view-dashboard-outline' },
		{ name: 'Users', link: '/users', icon: 'mdi:account-supervisor-outline' },
		{ name: 'Projects', link: '/projects', icon: 'mdi:home-city-outline' },
		{ name: 'Notifications', link: '/notifications', icon: 'mdi:bell-outline' },
	];
	let user = {};

	if (process.client) {
		user = JSON.parse(localStorage.getItem('user'));
	}

	const onLogout = () => {
		logUserOut();
		router.push('/login');
	};
</script>

<template>
	<div
		id="sidebar-menu"
		class="fixed top-0 left-0 w-1/6 h-screen border-r flex flex-col gap-5 z-50"
	>
		<div
			class="w-full h-[8%] px-4 py-[17.5px] border-b flex justify-center items-center"
		>
			<span class="font-bold text-xl">🏢 Real Estate</span>
		</div>
		<div class="w-full h-full px-4 flex flex-col gap-1">
			<SidebarItem
				v-for="link in links"
				:key="link.name"
				:data="link"
			/>
		</div>
		<div class="w-full h-[8%] px-4 border-t flex justify-between items-center">
			<div
				v-if="Object.keys(user).length"
				class="flex items-center gap-2"
			>
				<Avatar
					:label="user['display_name'].substring(0, 3)"
					shape="square"
				/>
				<span class="font-semibold">{{ user['display_name'] }}</span>
			</div>
			<Button
				@click="onLogout"
				text
				plain
			>
				<Icon name="mdi:logout" />
			</Button>
		</div>
	</div>
</template>

<style scoped>
	a:hover:not(.router-link-exact-active) {
		color: var(--black);
		background-color: var(--onHover);
	}
</style>
