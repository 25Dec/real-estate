<script setup>
	import { FilterMatchMode } from 'primevue/api';

	const { currentProjectFromLocalStore } = storeToRefs(useProjectsStore());
	const { highContracts, currentHighContract } = storeToRefs(
		useHighContractStore()
	);
	const { getHighContracts } = useHighContractStore();
	const { landContracts, currentLandContract } = storeToRefs(
		useLandContractStore()
	);
	const { getLandContracts } = useLandContractStore();
	const { highAreas } = storeToRefs(useHighAreasStore());
	const { getHighAreas } = useHighAreasStore();
	const { landAreas } = storeToRefs(useLandAreasStore());
	const { getLandAreas } = useLandAreasStore();
	const { customers } = storeToRefs(useCustomersStore());
	const { getCustomers } = useCustomersStore();

	await getCustomers();

	const projectType = ref(currentProjectFromLocalStore.value['type']);

	if (projectType.value == 'high' || projectType.value == 'hybrid') {
		await getHighContracts();
		await getHighAreas();
	}

	if (projectType.value == 'land' || projectType.value == 'hybrid') {
		await getLandContracts();
		await getLandAreas();
	}

	const filters = ref({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	});
	const viewDetailsHighContractDialogVisible = ref(false);
	const createHighContractDialogVisible = ref(false);
	const editHighContractDialogVisible = ref(false);
	const deleteHighContractDialogVisible = ref(false);
	const viewDetailsLandContractDialogVisible = ref(false);
	const createLandContractDialogVisible = ref(false);
	const editLandContractDialogVisible = ref(false);
	const deleteLandContractDialogVisible = ref(false);

	const viewDetailsHighContract = (data) => {
		currentHighContract.value = data;
		viewDetailsHighContractDialogVisible.value =
			!viewDetailsHighContractDialogVisible.value;
	};
	const editHighContract = (data) => {
		currentHighContract.value = data;
		editHighContractDialogVisible.value = !editHighContractDialogVisible.value;
	};
	const deleteHighContract = async (data) => {
		currentHighContract.value = data;
		deleteHighContractDialogVisible.value =
			!deleteHighContractDialogVisible.value;
	};
	const viewDetailsLandContract = (data) => {
		currentLandContract.value = data;
		viewDetailsLandContractDialogVisible.value =
			!viewDetailsLandContractDialogVisible.value;
	};
	const editLandContract = (data) => {
		currentLandContract.value = data;
		editLandContractDialogVisible.value = !editLandContractDialogVisible.value;
	};
	const deleteLandContract = async (data) => {
		currentLandContract.value = data;
		deleteLandContractDialogVisible.value =
			!deleteLandContractDialogVisible.value;
	};
</script>

<template>
	<div class="w-full h-full flex flex-col">
		<div
			class="fixed right-0 top-0 z-50 backdrop-blur-xl w-5/6 h-[8%] px-4 border-b flex justify-between items-center"
		>
			<div class="flex items-center gap-2">
				<span class="font-semibold text-lg">Contract</span>
				<Tag
					v-if="projectType == 'high'"
					:value="highContracts.length"
				/>
				<Tag
					v-else
					:value="landContracts.length"
				/>
			</div>

			<div class="flex items-center gap-2">
				<IconField iconPosition="left">
					<InputIcon class="flex items-center">
						<Icon name="mdi:filter-outline" />
					</InputIcon>
					<InputText
						v-model="filters['global'].value"
						placeholder="Filter contract..."
					/>
				</IconField>
				<Button
					v-if="projectType == 'high'"
					size="small"
					label="New"
					@click="
						createHighContractDialogVisible = !createHighContractDialogVisible
					"
				/>
				<Button
					v-else
					size="small"
					label="New"
					@click="
						createLandContractDialogVisible = !createLandContractDialogVisible
					"
				/>
			</div>
		</div>

		<div class="absolute top-[8%] w-full h-[92%]">
			<DataTable
				:value="projectType == 'high' ? highContracts : landContracts"
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
						<span>No Contract Found.</span>
					</div>
				</template>

				<Column
					field="buyer_id"
					header="Customer"
				>
					<template #body="{ data }">
						{{
							`${
								customers.filter(
									(customer) => customer['id'] == data['buyer_id']
								)?.[0]?.['first_name']
							} ${
								customers.filter(
									(customer) => customer['id'] == data['buyer_id']
								)?.[0]?.['last_name']
							}`
						}}
					</template>
				</Column>

				<Column
					v-if="projectType == 'high'"
					field="high_area_id"
					header="High Area"
				>
					<template #body="{ data }">
						<Tag
							:severity="
								highAreas.filter(
									(high) => high['id'] == data['high_area_id']
								)?.[0]?.['desc'] != null
									? 'success'
									: 'danger'
							"
							:value="
								highAreas.filter(
									(high) => high['id'] == data['high_area_id']
								)?.[0]?.['desc'] ?? 'null'.toUpperCase()
							"
						/>
					</template>
				</Column>

				<Column
					v-else
					field="land_area_id"
					header="Land Area"
				>
					<template #body="{ data }"
						>{{
							landAreas.filter(
								(land) => land['id'] == data['land_area_id']
							)?.[0]?.['desc']
						}}
						<Tag
							:severity="
								landAreas.filter(
									(land) => land['id'] == data['land_area_id']
								)?.[0]?.['desc'] != null
									? 'success'
									: 'danger'
							"
							:value="
								landAreas.filter(
									(land) => land['id'] == data['land_area_id']
								)?.[0]?.['desc'] ?? 'null'.toUpperCase()
							"
						/>
					</template>
				</Column>

				<Column
					field="booking_fee"
					header="Booking Fee"
				>
					<template #body="{ data }">
						{{
							`${data['booking_fee'].toLocaleString('en-US', {
								style: 'currency',
								currency: 'USD',
							})}`
						}}</template
					>
				</Column>

				<Column
					field="begin_payment"
					header="Begin Payment"
				>
					<template #body="{ data }">
						{{ convertDateTime(data['begin_payment']) }}
					</template>
				</Column>

				<Column
					field="status"
					header="Status"
				>
					<template #body="{ data }">
						<Tag
							:severity="
								data['status'] == 'enable'
									? 'success'
									: data['status'] == 'disable'
									? 'danger'
									: 'warning'
							"
							:value="data['status'].toUpperCase()"
						/>
					</template>
				</Column>

				<Column header="Actions">
					<template #body="{ data }">
						<div v-if="projectType == 'high'">
							<Button
								text
								severity="secondary"
								@click="viewDetailsHighContract(data)"
							>
								<Icon name="mdi:eye-outline" />
							</Button>
							<Button
								text
								severity="secondary"
								@click="editHighContract(data)"
							>
								<Icon name="mdi:edit-outline" />
							</Button>
							<Button
								text
								severity="danger"
								@click="deleteHighContract(data)"
							>
								<Icon name="mdi:delete-outline" />
							</Button>
						</div>
						<div v-else>
							<Button
								text
								severity="secondary"
								@click="viewDetailsLandContract(data)"
							>
								<Icon name="mdi:eye-outline" />
							</Button>
							<Button
								text
								severity="secondary"
								@click="editLandContract(data)"
							>
								<Icon name="mdi:edit-outline" />
							</Button>
							<Button
								text
								severity="danger"
								@click="deleteLandContract(data)"
							>
								<Icon name="mdi:delete-outline" />
							</Button>
						</div>
					</template>
				</Column>
			</DataTable>
		</div>
	</div>
	<ViewDetailsHighContractDialog
		v-if="viewDetailsHighContractDialogVisible"
		:visible="viewDetailsHighContractDialogVisible"
	/>
	<CreateHighContractDialog
		v-if="createHighContractDialogVisible"
		:visible="createHighContractDialogVisible"
	/>
	<EditHighContractDialog
		v-if="editHighContractDialogVisible"
		:visible="editHighContractDialogVisible"
	/>
	<DeleteHighContractDialog
		v-if="deleteHighContractDialogVisible"
		:visible="deleteHighContractDialogVisible"
	/>
	<ViewDetailsLandContractDialog
		v-if="viewDetailsLandContractDialogVisible"
		:visible="viewDetailsLandContractDialogVisible"
	/>
	<CreateLandContractDialog
		v-if="createLandContractDialogVisible"
		:visible="createLandContractDialogVisible"
	/>
	<EditLandContractDialog
		v-if="editLandContractDialogVisible"
		:visible="editLandContractDialogVisible"
	/>
	<DeleteLandContractDialog
		v-if="deleteLandContractDialogVisible"
		:visible="deleteLandContractDialogVisible"
	/>
</template>
