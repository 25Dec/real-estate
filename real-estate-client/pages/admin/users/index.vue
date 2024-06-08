<script setup>
	import { ref } from 'vue';
	import { FilterMatchMode } from 'primevue/api';

	const { accounts, currentAccount } = storeToRefs(useAccountsStore());
	const { getAccounts } = useAccountsStore();

	await getAccounts();

	const roles = ref([
		{ name: 'Super Admin', value: 'super_admin' },
		{ name: 'Admin', value: 'admin' },
		{ name: 'Normal User', value: 'normal_user' },
	]);
	const filters = ref({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	});
	const viewDetailsAccountDialogVisible = ref(false);
	const createAccountDialogVisible = ref(false);
	const editAccountDialogVisible = ref(false);
	const deleteAccountDialogVisible = ref(false);

	const viewDetailsAccount = (data) => {
		currentAccount.value = data;
		viewDetailsAccountDialogVisible.value =
			!viewDetailsAccountDialogVisible.value;
	};

	const editAccount = (data) => {
		currentAccount.value = data;
		editAccountDialogVisible.value = !editAccountDialogVisible.value;
	};

	const deleteAccount = async (data) => {
		currentAccount.value = data;
		deleteAccountDialogVisible.value = !deleteAccountDialogVisible.value;
	};
</script>

<template>
	<div class="w-full h-full flex flex-col">
		<div
			class="fixed right-0 top-0 z-50 backdrop-blur-xl w-5/6 h-[8%] px-4 border-b flex justify-between items-center"
		>
			<div class="flex items-center gap-2">
				<span class="font-semibold text-lg">Users</span>
				<Tag :value="accounts.length" />
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
					size="small"
					label="New"
					@click="createAccountDialogVisible = !createAccountDialogVisible"
				/>
			</div>
		</div>

		<div class="absolute top-[8%] w-full h-[92%]">
			<DataTable
				:value="accounts"
				v-model:filters="filters"
				:paginator="true"
				:rows="50"
				:rowsPerPageOptions="[5, 10, 20, 50]"
				scrollable
				scrollHeight="flex"
				sortField="id"
				:sortOrder="-1"
				removableSort
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
						{{
							data['type'] == 'super_admin'
								? 'Super Admin'
								: data['type'] == 'admin'
								? 'Admin'
								: 'Normal User'
						}}
					</template>
				</Column>
				<Column header="Actions">
					<template #body="{ data }">
						<Button
							text
							severity="secondary"
							@click="viewDetailsAccount(data)"
						>
							<Icon name="mdi:eye-outline" />
						</Button>
						<Button
							text
							severity="secondary"
							@click="editAccount(data)"
						>
							<Icon name="mdi:edit-outline" />
						</Button>
						<Button
							text
							severity="danger"
							@click="deleteAccount(data)"
						>
							<Icon name="mdi:delete-outline" />
						</Button>
					</template>
				</Column>
			</DataTable>
		</div>
	</div>
	<ViewDetailsAccountDialog
		v-if="viewDetailsAccountDialogVisible"
		:visible="viewDetailsAccountDialogVisible"
		:roles="roles"
	/>
	<CreateAccountDialog
		v-if="createAccountDialogVisible"
		:visible="createAccountDialogVisible"
		:roles="roles"
	/>
	<EditAccountDialog
		v-if="editAccountDialogVisible"
		:visible="editAccountDialogVisible"
		:roles="roles"
	/>
	<DeleteAccountDialog
		v-if="deleteAccountDialogVisible"
		:visible="deleteAccountDialogVisible"
	/>
</template>
