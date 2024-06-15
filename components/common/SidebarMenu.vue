<script setup>
	const { logUserOut } = useAuthStore();
	const { currentProjectFromLocalStore, currentProjectIDFromLocalStore } =
		storeToRefs(useProjectsStore());
	const router = useRouter();
	const currentRoute = router['currentRoute'].value;

	const user = ref({});

	if (process.client) {
		user.value = JSON.parse(localStorage.getItem('user')) ?? {};
	}

	const projectDetailsBaseLink = '/project_details';
	const adminDashBoardBaseLink = '/admin';
	const links = currentRoute['path'].includes('project_details')
		? [
				{
					name: 'Dashboard',
					link:
						projectDetailsBaseLink + `/${currentProjectIDFromLocalStore.value}`,
					icon: 'mdi:view-dashboard-outline',
					items: [
						{
							name: 'Zone',
							link: projectDetailsBaseLink + '/zone',
						},
						currentProjectFromLocalStore.value['type'] == 'high' ||
						currentProjectFromLocalStore.value['type'] == 'hybrid'
							? {
									name: 'Block',
									link: projectDetailsBaseLink + '/block',
							  }
							: null,
						currentProjectFromLocalStore.value['type'] == 'high' ||
						currentProjectFromLocalStore.value['type'] == 'hybrid'
							? {
									name: 'Floor',
									link: projectDetailsBaseLink + '/floor',
							  }
							: null,
						currentProjectFromLocalStore.value['type'] == 'land'
							? {
									name: 'Land Area',
									link: projectDetailsBaseLink + '/land_area',
							  }
							: null,
						currentProjectFromLocalStore.value['type'] == 'high' ||
						currentProjectFromLocalStore.value['type'] == 'hybrid'
							? {
									name: 'High Area',
									link: projectDetailsBaseLink + '/high_area',
							  }
							: null,
					],
				},
				{
					name: 'Interactive Viewer',
					link: projectDetailsBaseLink + '/interactive_viewer',
					icon: 'material-symbols:interactive-space-outline',
				},
				{
					name: 'Customers',
					link: projectDetailsBaseLink + '/customers',
					icon: 'mdi:account-supervisor-outline',
				},
				{
					name: 'Payment Method',
					link: projectDetailsBaseLink + '/payment_method',
					icon: 'mdi:payment',
				},
				{
					name: 'Payment Process',
					link: projectDetailsBaseLink + '/payment_method_process',
					icon: 'mdi:progress-helper',
				},
				{
					name: 'Notifications',
					link: projectDetailsBaseLink + '/notifications',
					icon: 'mdi:bell-outline',
				},
		  ]
		: currentRoute['path'].includes('admin')
		? [
				{
					name: 'Dashboard',
					link: adminDashBoardBaseLink,
					icon: 'mdi:view-dashboard-outline',
				},
				{
					name: 'Projects',
					link: adminDashBoardBaseLink + '/projects',
					icon: 'mdi:home-city-outline',
				},
				{
					name: 'Users',
					link: adminDashBoardBaseLink + '/users',
					icon: 'heroicons:user-group',
				},
				{
					name: 'Customers',
					link: adminDashBoardBaseLink + '/customers',
					icon: 'mdi:account-supervisor-outline',
				},
				{
					name: 'Sellers',
					link: adminDashBoardBaseLink + '/project_seller',
					icon: 'streamline:office-worker',
				},
				{
					name: 'Notifications',
					link: adminDashBoardBaseLink + '/notifications',
					icon: 'mdi:bell-outline',
				},
		  ]
		: [];

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
					v-if="currentRoute['path'].includes('project_details')"
					name="line-md:home-simple"
					class="text-2xl text-[#10b981]"
				/>
				<Icon
					v-else
					name="mdi:view-dashboard-outline"
					class="text-2xl text-[#10b981]"
				/>
				<span
					v-if="currentRoute['path'].includes('project_details')"
					class="font-bold text-xl text-[#10b981]"
				>
					Propertier
				</span>
				<span
					v-else
					class="font-bold text-xl text-[#10b981]"
				>
					Overrall Dashboard
				</span>
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
					:label="user['display_name']?.substring(0, 3)"
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
