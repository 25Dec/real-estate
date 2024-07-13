<script setup>
	definePageMeta({
		layout: 'empty',
	});

	import { FilterMatchMode } from 'primevue/api';

	const { highContracts, currentHighContract } = storeToRefs(
		useHighContractStore()
	);
	const { getHighContracts } = useHighContractStore();
	const { highAreas, currentHighArea } = storeToRefs(useHighAreasStore());
	const { getHighAreas } = useHighAreasStore();
	const { customers } = storeToRefs(useCustomersStore());
	const { getCustomers } = useCustomersStore();

	await getCustomers();
	await getHighContracts();
	await getHighAreas();

	const highBookings = ref(
		highContracts.value.filter(
			(booking) => booking['high_area_id'] == currentHighArea.value['id']
		)
	);

	const filters = ref({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	});
	const viewDetailsHighContractDialogVisible = ref(false);
	const createHighContractDialogVisible = ref(false);
	const editHighContractDialogVisible = ref(false);
	const deleteHighContractDialogVisible = ref(false);

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
</script>

<template>
	<div class="w-full h-full flex flex-col">
		<div
			class="fixed right-0 top-0 z-50 backdrop-blur-xl w-full h-[10%] px-4 border-b flex justify-between items-center"
		>
			<div class="flex flex-col justify-center gap-2">
				<div class="flex items-center gap-2">
					<span class="font-semibold text-lg">History Booking</span>
					<Tag :value="highBookings.length"></Tag>
				</div>
			</div>

			<div class="flex items-center gap-2">
				<IconField iconPosition="left">
					<InputIcon class="flex items-center">
						<Icon name="mdi:filter-outline" />
					</InputIcon>
					<InputText
						v-model="filters['global'].value"
						placeholder="Filter booking..."
					/>
				</IconField>
				<Button
					size="small"
					label="New"
					@click="
						createHighContractDialogVisible = !createHighContractDialogVisible
					"
				/>
			</div>
		</div>

		<div class="absolute top-[10%] w-full h-[90%]">
			<DataTable
				:value="highBookings"
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
						<span>No Booking Found.</span>
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
</template>
