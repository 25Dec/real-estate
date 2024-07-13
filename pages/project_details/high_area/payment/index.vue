<script setup>
	definePageMeta({
		layout: 'empty',
	});

	import { ref, markRaw, defineAsyncComponent } from 'vue';
	import { FilterMatchMode } from 'primevue/api';
	import { useDialog } from 'primevue/usedialog';

	const router = useRouter();
	const dialog = useDialog();

	const CheckProgressExampleDialogData = defineAsyncComponent(() =>
		import(
			'/components/high_payment_process/CheckProgressExampleDialogData.vue'
		)
	);
	const CheckProgressExampleDialogFooter = defineAsyncComponent(() =>
		import(
			'/components/high_payment_process/CheckProgressExampleDialogFooter.vue'
		)
	);

	const { currentHighAreaIDFromLocalStore } = storeToRefs(useHighAreasStore());
	const { highPaymentProcesses, currentHighPaymentProcess } = storeToRefs(
		useHighPaymentProcessStore()
	);
	const { getHighPaymentProcesses } = useHighPaymentProcessStore();
	const { getCustomers } = useCustomersStore();
	const { currentHighArea } = storeToRefs(useHighAreasStore());
	const { usersDropdown } = storeToRefs(useUsersStore());
	const { getUsers } = useUsersStore();

	await getHighPaymentProcesses();
	await getCustomers();
	await getUsers();

	const myPaymentBaseOnHighID = computed(() => {
		return highPaymentProcesses.value.filter((payment) => {
			return payment['high_area_id'] == currentHighAreaIDFromLocalStore.value;
		});
	});
	const statuses = ref([{ name: 'Done', value: 'Done' }]);
	const buyStatuses = ref([
		{ name: 'Not Booked', value: 'not booked' },
		{ name: 'Deal', value: 'deal' },
		{ name: 'Booked', value: 'booked' },
	]);
	const filters = ref({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	});
	const createHighPaymentProcessDialogVisible = ref(false);
	const editHighPaymentProcessDialogVisible = ref(false);
	const deleteHighPaymentProcessDialogVisible = ref(false);

	const toggleEditPayment = (data) => {
		currentHighPaymentProcess.value = data;
		editHighPaymentProcessDialogVisible.value =
			!editHighPaymentProcessDialogVisible.value;
	};
	const toggleDeletePayment = (data) => {
		currentHighPaymentProcess.value = data;
		deleteHighPaymentProcessDialogVisible.value =
			!deleteHighPaymentProcessDialogVisible.value;
	};
	const viewProgressExample = () => {
		const dialogRef = dialog.open(CheckProgressExampleDialogData, {
			props: {
				header: 'Check Progress Example',
				style: { width: '50rem' },
				breakpoints: { '1199px': '75vw', '575px': '90vw' },
				modal: true,
				maximizable: true,
			},
			templates: {
				footer: markRaw(CheckProgressExampleDialogFooter),
			},
		});
	};

	const highAreaDirection = ref(currentHighArea.value['high_area_direction']);
	const lat = ref(currentHighArea.value['lat']);
	const long = ref(currentHighArea.value['long']);
	const totalArea = ref(currentHighArea.value['total_area']);
	const progress = ref(currentHighArea.value['progress']);
	const numberOfWC = ref(currentHighArea.value['number_of_wc']);
	const numberOfRoom = ref(currentHighArea.value['number_of_room']);
	const price = ref(currentHighArea.value['price']);
	const owner = ref({
		name: usersDropdown.value.filter(
			(user) => user['value'] == currentHighArea.value['owner']
		)?.[0]?.['fullname'],
		value: usersDropdown.value.filter(
			(user) => user['value'] == currentHighArea.value['owner']
		)?.[0]?.['value'],
	});
	const buyStatus = ref({
		name: buyStatuses.value.filter(
			(status) => status['value'] == currentHighArea.value['buy_status']
		)?.[0]?.['name'],
		value: buyStatuses.value.filter(
			(status) => status['value'] == currentHighArea.value['buy_status']
		)?.[0]?.['value'],
	});
	const desc = ref(currentHighArea.value['desc']);
</script>

<template>
	<div class="w-full h-full flex flex-col">
		<div
			class="fixed right-0 top-0 z-50 backdrop-blur-xl w-full h-[10%] px-4 border-b flex justify-between items-center"
		>
			<div class="flex flex-col justify-center gap-2">
				<p
					class="text-[#10b98e] cursor-pointer text-sm hover:underline"
					@click="() => router.go(-1)"
				>
					Back to High Area
				</p>
				<div class="flex items-center gap-2">
					<span class="font-semibold text-lg">Payment</span>
					<Tag :value="myPaymentBaseOnHighID.length"></Tag>
				</div>
			</div>

			<div class="flex items-center gap-2">
				<IconField iconPosition="left">
					<InputIcon class="flex items-center">
						<Icon name="mdi:filter-outline" />
					</InputIcon>
					<InputText
						v-model="filters['global'].value"
						placeholder="Filter payment..."
					/>
				</IconField>
				<Button
					size="small"
					label="New"
					@click="
						createHighPaymentProcessDialogVisible =
							!createHighPaymentProcessDialogVisible
					"
				/>
				<Button
					size="small"
					label="Check Progress Example"
					@click="viewProgressExample"
				/>
			</div>
		</div>

		<div class="absolute top-[10%] w-full h-[90%]">
			<Panel
				toggleable
				collapsed
				class="w-full shadow-none"
			>
				<template #header>
					<span class="font-bold">High Area Info</span>
				</template>

				<div class="flex flex-1 flex-col gap-2">
					<label for="desc">Name</label>
					<InputText
						id="desc"
						v-model="desc"
						disabled
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="owner">Owner</label>
					<Dropdown
						id="owner"
						v-model="owner.value"
						placeholder="Select Owner"
						:options="usersDropdown"
						optionLabel="name"
						optionValue="value"
						disabled
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="buyStatus">Buy Status</label>
					<Dropdown
						id="buyStatus"
						v-model="buyStatus.value"
						placeholder="Select Status"
						:options="buyStatuses"
						optionLabel="name"
						optionValue="value"
						disabled
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="lat">Latitude</label>
					<InputNumber
						id="lat"
						mode="decimal"
						v-model="lat"
						disabled
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="long">Longitude</label>
					<InputNumber
						id="long"
						mode="decimal"
						v-model="long"
						disabled
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="totalArea">Total Area</label>
					<InputNumber
						id="totalArea"
						mode="decimal"
						v-model="totalArea"
						:min="0"
						disabled
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="highAreaDirection">High Area Direction</label>
					<InputText
						id="highAreaDirection"
						v-model="highAreaDirection"
						disabled
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="numberOfRoom">Number Of Room</label>
					<InputNumber
						id="numberOfRoom"
						mode="decimal"
						v-model="numberOfRoom"
						:min="0"
						disabled
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="numberOfWC">Number Of WC</label>
					<InputNumber
						id="numberOfWC"
						mode="decimal"
						v-model="numberOfWC"
						:min="0"
						disabled
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="price">Price</label>
					<InputNumber
						id="price"
						v-model="price"
						mode="decimal"
						prefix="$"
						:min="0"
						disabled
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="progress">Progress</label>
					<InputNumber
						id="progress"
						v-model="progress"
						mode="decimal"
						prefix="%"
						:min="0"
						:max="100"
						disabled
					/>
				</div>
			</Panel>

			<Panel
				toggleable
				collapsed
				class="w-full shadow-none"
			>
				<template #header>
					<span class="font-bold">Deposit Form</span>
				</template>
			</Panel>

			<div class="flex justify-center items-center my-4">
				<span class="text-[#10b98e] text-xl font-bold">HISTORY PAYMENT</span>
			</div>

			<DataTable
				:value="myPaymentBaseOnHighID"
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
						<span>No payment found.</span>
					</div>
				</template>

				<Column
					field="payment_time"
					header="Payment Time"
					sortable
				>
					<template #body="{ data }">
						{{ data['payment_time'] }}
					</template>
				</Column>

				<Column
					field="amount_of_money"
					header="Amount Of Money"
					sortable
				>
					<template #body="{ data }">
						{{ data['amount_of_money'] }}
					</template>
				</Column>

				<Column
					field="amount_of_debt"
					header="Amount Of Debt"
					sortable
				>
					<template #body="{ data }">
						{{ data['amount_of_debt'] }}
					</template>
				</Column>

				<Column
					field="submitter"
					header="Submitter"
					sortable
				>
					<template #body="{ data }">
						{{ data['submitter'] }}
					</template>
				</Column>

				<Column
					field="created_at"
					header="Created At"
					sortable
				>
					<template #body="{ data }">
						{{ convertDateTime(data['created_at']) }}
					</template>
				</Column>

				<!-- <Column
					field="status"
					header="Status"
				>
					<template #body="{ data }">
						<Tag
							:severity="data['status'] == 'done' ? 'success' : 'danger'"
							:value="data['status'].toUpperCase()"
						/>
					</template>
				</Column> -->

				<Column header="Actions">
					<template #body="{ data }">
						<Button
							text
							severity="secondary"
							@click="toggleEditPayment(data)"
						>
							<Icon name="mdi:edit-outline" />
						</Button>
						<Button
							text
							severity="danger"
							@click="toggleDeletePayment(data)"
						>
							<Icon name="mdi:delete-outline" />
						</Button>
					</template>
				</Column>
			</DataTable>
		</div>
	</div>
	<CreateHighPaymentProcessDialog
		v-if="createHighPaymentProcessDialogVisible"
		:visible="createHighPaymentProcessDialogVisible"
		:statuses="statuses"
	/>
	<EditHighPaymentProcessDialog
		v-if="editHighPaymentProcessDialogVisible"
		:visible="editHighPaymentProcessDialogVisible"
		:statuses="statuses"
	/>
	<DeleteHighPaymentProcessDialog
		v-if="deleteHighPaymentProcessDialogVisible"
		:visible="deleteHighPaymentProcessDialogVisible"
	/>
	<ViewDetailsHighAreaDialog
		v-if="viewDetailsHighAreaDialogVisible"
		:visible="viewDetailsHighAreaDialogVisible"
		:statuses="[
			{ name: 'Not Booked', value: 'not booked' },
			{ name: 'Deal', value: 'deal' },
			{ name: 'Booked', value: 'booked' },
		]"
	/>
	<DynamicDialog />
</template>
