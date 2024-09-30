<script setup>
	import { FilterMatchMode } from 'primevue/api';

	const { highListOwners } = storeToRefs(useHighListOwnerStore());
	const { getHighListOwners } = useHighListOwnerStore();
	const { customers } = storeToRefs(useCustomersStore());
	const { getCustomers } = useCustomersStore();

	const router = useRouter();

	await getHighListOwners();
	await getCustomers();

	highListOwners.value = customers.value.filter((customer) => {
		return highListOwners.value.filter(
			(owner) => owner['owner_id'] == customer['id']
		);
	});

	const filters = ref({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	});
	const viewDetailsOwnerDialogVisible = ref(false);
	const createOwnerDialogVisible = ref(false);
	const editOwnerDialogVisible = ref(false);
	const deleteOwnerDialogVisible = ref(false);

	const toggleViewDetailsOwner = (data) => {
		viewDetailsOwnerDialogVisible.value = !viewDetailsOwnerDialogVisible.value;
	};
	const toggleEditOwner = (data) => {
		setCurrentOwner(data);
		editOwnerDialogVisible.value = !editOwnerDialogVisible.value;
	};
	const toggleDeleteOwner = (data) => {
		setCurrentOwner(data);
		deleteOwnerDialogVisible.value = !deleteOwnerDialogVisible.value;
	};
</script>

<template>
	<div class="w-full h-full flex flex-col">
		<div
			class="fixed right-0 top-0 z-50 backdrop-blur-xl w-5/6 h-[8%] px-4 border-b flex justify-between items-center"
		>
			<div class="flex items-center gap-2">
				<span class="font-semibold text-lg">Owner</span>
				<Tag :value="highListOwners.length"></Tag>
			</div>

			<div class="flex items-center gap-2">
				<IconField iconPosition="left">
					<InputIcon class="flex items-center">
						<Icon name="mdi:filter-outline" />
					</InputIcon>
					<InputText
						v-model="filters['global'].value"
						placeholder="Filter Owner..."
					/>
				</IconField>
				<Button
					size="small"
					label="New"
					@click="createOwnerDialogVisible = !createOwnerDialogVisible"
				/>
			</div>
		</div>

		<div class="absolute top-[8%] w-full h-[92%]">
			<DataTable
				:value="highListOwners"
				v-model:filters="filters"
				:paginator="true"
				:rows="50"
				:rowsPerPageOptions="[5, 10, 20, 50]"
				scrollable
				scrollHeight="flex"
				sortField="id"
				:sortOrder="-1"
				removableSort
				v-auto-animate
			>
				<template #empty>
					<div class="flex justify-center items-center">
						<span>No Owner Found.</span>
					</div>
				</template>

				<Column
					field="fullname"
					header="Full Name"
				>
					<template #body="{ data }">
						<div class="flex items-center gap-3">
							<Avatar
								:label="data['first_name']?.substring(0, 3)"
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
					field="phone"
					header="Phone"
				>
					<template #body="{ data }">
						{{ data['phone'] }}
					</template>
				</Column>

				<Column header="Actions">
					<template #body="{ data }">
						<Button
							text
							severity="secondary"
							@click="viewDetailsCustomer(data)"
						>
							<Icon name="mdi:eye-outline" />
						</Button>
						<Button
							text
							severity="secondary"
							@click="editCustomer(data)"
						>
							<Icon name="mdi:edit-outline" />
						</Button>
						<Button
							text
							severity="danger"
							@click="deleteCustomer(data)"
						>
							<Icon name="mdi:delete-outline" />
						</Button>
					</template>
				</Column>
			</DataTable>
		</div>
	</div>
	<ViewDetailsHighAreaDialog
		v-if="viewDetailsHighAreaDialogVisible"
		:visible="viewDetailsHighAreaDialogVisible"
		:statuses="statuses"
	/>
	<CreateHighAreaDialog
		v-if="createHighAreaDialogVisible"
		:visible="createHighAreaDialogVisible"
		:statuses="statuses"
	/>
	<EditHighAreaDialog
		v-if="editHighAreaDialogVisible"
		:visible="editHighAreaDialogVisible"
		:statuses="statuses"
	/>
	<DeleteHighAreaDialog
		v-if="deleteHighAreaDialogVisible"
		:visible="deleteHighAreaDialogVisible"
	/>
</template>
