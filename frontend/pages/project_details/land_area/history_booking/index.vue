<script setup>
	definePageMeta({
		layout: 'empty',
	});

	import { FilterMatchMode } from 'primevue/api';

	const { landContracts, currentLandContract } = storeToRefs(
		useLandContractStore()
	);
	const { getLandContracts } = useLandContractStore();
	const { landAreas, currentLandArea } = storeToRefs(useLandAreasStore());
	const { getLandAreas } = useLandAreasStore();
	const { customers } = storeToRefs(useCustomersStore());
	const { getCustomers } = useCustomersStore();

	await getCustomers();
	await getLandContracts();
	await getLandAreas();

	const landBookings = ref(
		landContracts.value.filter(
			(booking) => booking['land_area_id'] == currentLandArea.value['id']
		)
	);

	const filters = ref({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	});
	const viewDetailsLandContractDialogVisible = ref(false);
	const createLandContractDialogVisible = ref(false);
	const editLandContractDialogVisible = ref(false);
	const deleteLandContractDialogVisible = ref(false);

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
			class="fixed right-0 top-0 z-50 backdrop-blur-xl w-full h-[10%] px-4 border-b flex justify-between items-center"
		>
			<div class="flex flex-col justify-center gap-2">
				<div class="flex items-center gap-2">
					<span class="font-semibold text-lg">History Booking</span>
					<Tag :value="landBookings.length"></Tag>
				</div>
			</div>

			<div class="flex items-center gap-2">
				<IconField iconPosition="left">
					<InputIcon class="flex items-center">
						<Icon name="mdi:filter-outline" />
					</InputIcon>
					<InputText
						v-model="filters['global'].value"
						placeholder="Filter Booking..."
					/>
				</IconField>
				<Button
					size="small"
					label="New"
					@click="
						createLandContractDialogVisible = !createLandContractDialogVisible
					"
				/>
			</div>
		</div>

		<div class="absolute top-[10%] w-full h-[90%]">
			<DataTable
				:value="landBookings"
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
					field="Land_area_id"
					header="Land Area"
				>
					<template #body="{ data }">
						<Tag
							:severity="
								landAreas.filter(
									(Land) => Land['id'] == data['land_area_id']
								)?.[0]?.['desc'] != null
									? 'success'
									: 'danger'
							"
							:value="
								landAreas.filter(
									(Land) => Land['id'] == data['land_area_id']
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
					</template>
				</Column>
			</DataTable>
		</div>
	</div>
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
