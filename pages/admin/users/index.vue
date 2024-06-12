<script setup>
	import { ref } from 'vue';
	import { FilterMatchMode } from 'primevue/api';

	const { users, currentUser } = storeToRefs(useUsersStore());
	const { getUsers } = useUsersStore();

	await getUsers();

	const user = ref({});

	if (process.client) {
		user.value = JSON.parse(localStorage.getItem('user')) ?? {};
	}

	const userPermissionForActions =
		user.value['type'] == 'admin' ||
		user.value['type'] == 'super_admin' ||
		user.value['type'] == 'sale_manager'
			? true
			: false;

	const roles = ref([
		{ name: 'Anonymous', value: 'anonymous' },
		{ name: 'Sale', value: 'sale' },
		{ name: 'Sale Manager', value: 'sale_manager' },
		{ name: 'Admin', value: 'admin' },
		{ name: 'Super Admin', value: 'super_admin' },
	]);
	const filters = ref({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	});
	const viewDetailsUserDialogVisible = ref(false);
	const createUserDialogVisible = ref(false);
	const editUserDialogVisible = ref(false);
	const deleteUserDialogVisible = ref(false);

	const viewDetailsUser = (data) => {
		currentUser.value = data;
		viewDetailsUserDialogVisible.value = !viewDetailsUserDialogVisible.value;
	};

	const editUser = (data) => {
		currentUser.value = data;
		editUserDialogVisible.value = !editUserDialogVisible.value;
	};

	const deleteUser = async (data) => {
		currentUser.value = data;
		deleteUserDialogVisible.value = !deleteUserDialogVisible.value;
	};
</script>

<template>
	<div class="w-full h-full flex flex-col">
		<div
			class="fixed right-0 top-0 z-50 backdrop-blur-xl w-5/6 h-[8%] px-4 border-b flex justify-between items-center"
		>
			<div class="flex items-center gap-2">
				<span class="font-semibold text-lg">Users</span>
				<Tag :value="users.length" />
			</div>

			<div class="flex items-center gap-2">
				<IconField iconPosition="left">
					<InputIcon class="flex items-center">
						<Icon name="mdi:filter-outline" />
					</InputIcon>
					<InputText
						v-model="filters['global'].value"
						placeholder="Filter user..."
					/>
				</IconField>
				<Button
					v-if="userPermissionForActions"
					size="small"
					label="New"
					@click="createUserDialogVisible = !createUserDialogVisible"
				/>
			</div>
		</div>

		<div class="absolute top-[8%] w-full h-[92%]">
			<DataTable
				:value="users"
				v-model:filters="filters"
				:paginator="true"
				:rows="50"
				:rowsPerPageOptions="[5, 10, 20, 50]"
				scrollable
				scrollHeight="flex"
				removableSort
				v-auto-animate
			>
				<template #empty>
					<div class="flex justify-center items-center">
						<span>No Users Found.</span>
					</div>
				</template>

				<Column
					field="fullname"
					header="Full Name"
				>
					<template #body="{ data }">
						<div class="flex items-center gap-3">
							<Avatar
								:label="data['first_name'].substring(0, 3)"
								shape="square"
							/>
							<div class="flex flex-col">
								<span class="font-semibold">{{
									`${data['first_name']} ${data['last_name']}`
								}}</span>
								<span>{{ data['email'] }}</span>
							</div>
						</div>
					</template>
				</Column>

				<Column
					field="login_name"
					header="Login Name"
					sortable
				>
					<template #body="{ data }">
						{{ data['login_name'] }}
					</template>
				</Column>

				<Column
					field="phone"
					header="Phone"
					sortable
				>
					<template #body="{ data }">
						{{ data['phone'] }}
					</template>
				</Column>

				<Column
					field="type"
					header="Role"
					sortable
					sortField="type"
					filterField="type"
					:showFilterMatchModes="false"
				>
					<template #body="{ data }">
						{{ capitalize(data['type']) }}
					</template>
				</Column>
				<Column header="Actions">
					<template #body="{ data }">
						<Button
							text
							severity="secondary"
							@click="viewDetailsUser(data)"
						>
							<Icon name="mdi:eye-outline" />
						</Button>
						<Button
							v-if="userPermissionForActions"
							text
							severity="secondary"
							@click="editUser(data)"
						>
							<Icon name="mdi:edit-outline" />
						</Button>
						<Button
							v-if="userPermissionForActions"
							text
							severity="danger"
							@click="deleteUser(data)"
						>
							<Icon name="mdi:delete-outline" />
						</Button>
					</template>
				</Column>
			</DataTable>
		</div>
	</div>
	<ViewDetailsUserDialog
		v-if="viewDetailsUserDialogVisible"
		:visible="viewDetailsUserDialogVisible"
		:roles="roles"
	/>
	<CreateUserDialog
		v-if="createUserDialogVisible"
		:visible="createUserDialogVisible"
		:roles="roles"
	/>
	<EditUserDialog
		v-if="editUserDialogVisible"
		:visible="editUserDialogVisible"
		:roles="roles"
	/>
	<DeleteUserDialog
		v-if="deleteUserDialogVisible"
		:visible="deleteUserDialogVisible"
	/>
</template>
