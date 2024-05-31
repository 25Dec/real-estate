<script setup>
	const router = useRouter();

	const { logUserOut } = useAuthStore();
	const { currentProject, currentProjectIDFromLocalStore } = storeToRefs(
		useProjectsStore()
	);

	const baseLink = '/project_details';
	const links = [
		{
			name: 'Dashboard',
			link: baseLink + `/${currentProjectIDFromLocalStore.value}`,
			icon: 'mdi:view-dashboard-outline',
			items: [
				{
					name: 'Zone',
					link: baseLink + '/zone',
				},
				currentProject.value['type'] == 'high' ||
				currentProject.value['type'] == 'hybrid'
					? {
							name: 'Block',
							link: baseLink + '/block',
					  }
					: null,
				currentProject.value['type'] == 'high' ||
				currentProject.value['type'] == 'hybrid'
					? {
							name: 'Floor',
							link: baseLink + '/floor',
					  }
					: null,
				currentProject.value['type'] == 'land'
					? {
							name: 'Land Area',
							link: baseLink + '/land_area',
					  }
					: null,
				currentProject.value['type'] == 'high' ||
				currentProject.value['type'] == 'hybrid'
					? {
							name: 'High Area',
							link: baseLink + '/high_area',
					  }
					: null,
			],
		},
		{
			name: 'Customers',
			link: baseLink + '/customers',
			icon: 'mdi:account-supervisor-outline',
		},
		{
			name: 'Payment Method',
			link: baseLink + '/payment_method',
			icon: 'mdi:payment',
		},
		{
			name: 'Payment Process',
			link: baseLink + '/payment_method_process',
			icon: 'mdi:progress-helper',
		},
		{
			name: 'Notifications',
			link: baseLink + '/notifications',
			icon: 'mdi:bell-outline',
		},
	];
	let user = {};

	if (process.client) {
		user = JSON.parse(localStorage.getItem('user'));
	}

	const onLogout = () => {
		logUserOut();
		router.push('/');
	};
</script>

<template>
	<div class="w-1/6 h-screen">
		<div
			class="fixed top-0 left-0 w-1/6 h-[8%] px-4 py-[17.5px] flex justify-center items-center z-50 bg-white border-b border-r"
		>
			<NuxtLink
				to="/"
				class="flex justify-center items-center gap-1"
			>
				<Icon
					name="line-md:home-simple"
					class="text-2xl text-[#10b981]"
				/>
				<span class="font-bold text-xl text-[#10b981]"> Propertier </span>
			</NuxtLink>
		</div>

		<div
			class="absolute top-[8%] left-0 w-1/6 h-[84%] px-4 border-r overflow-auto"
		>
			<div class="w-full h-fit flex flex-col gap-1">
				<SidebarItem
					v-for="link in links"
					:key="link.name"
					:data="link"
				/>
			</div>
		</div>

		<div
			class="fixed bottom-0 left-0 w-1/6 h-[8%] px-4 flex justify-between items-center z-50 bg-white border-t border-r"
		>
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
