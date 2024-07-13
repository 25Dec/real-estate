<script setup>
	import { FilterMatchMode } from 'primevue/api';

	const { paymentMethods, paymentMethodsDropdown } = storeToRefs(
		usePaymentMethodsStore()
	);
	const { getPaymentMethods } = usePaymentMethodsStore();
	const { paymentMethodsProcess, currentPaymentMethodProcess } = storeToRefs(
		usePaymentMethodsProcessStore()
	);
	const { getPaymentMethodsProcess } = usePaymentMethodsProcessStore();

	await getPaymentMethods();
	await getPaymentMethodsProcess();

	const currentPaymentMethod = ref({
		name: paymentMethods.value[0]?.['method_name'] ?? '',
		value: `${paymentMethods.value[0]?.['id']}` ?? '',
	});
	const myPaymentMethodsProcessBaseOnPMId = computed(() => {
		return paymentMethodsProcess.value.filter((process) => {
			return process['payment_method_id'] == currentPaymentMethod.value.value;
		});
	});
	const filters = ref({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	});
	const viewDetailsPaymentMethodProcessDialogVisible = ref(false);
	const createPaymentMethodProcessDialogVisible = ref(false);
	const editPaymentMethodProcessDialogVisible = ref(false);
	const deletePaymentMethodProcessDialogVisible = ref(false);

	const handleDropdown = (event) => {
		myPaymentMethodsProcessBaseOnPMId.value =
			paymentMethodsProcess.value.filter((process) => {
				return process['payment_method_id'] == event.value;
			});
	};
	const toggleViewDetailsPaymentMethodProcess = (data) => {
		currentPaymentMethodProcess.value = data;
		viewDetailsPaymentMethodProcessDialogVisible.value =
			!viewDetailsPaymentMethodProcessDialogVisible.value;
	};
	const toggleEditPaymentMethodProcess = (data) => {
		currentPaymentMethodProcess.value = data;
		editPaymentMethodProcessDialogVisible.value =
			!editPaymentMethodProcessDialogVisible.value;
	};
	const toggleDeletePaymentMethodProcess = async (data) => {
		currentPaymentMethodProcess.value = data;
		deletePaymentMethodProcessDialogVisible.value =
			!deletePaymentMethodProcessDialogVisible.value;
	};
</script>

<template>
	<div class="w-full h-full flex flex-col">
		<div
			class="fixed right-0 top-0 z-50 backdrop-blur-xl w-5/6 h-[8%] px-4 border-b flex justify-between items-center"
		>
			<div class="flex items-center gap-2">
				<span class="font-semibold text-lg">Payment Process</span>
				<Tag :value="myPaymentMethodsProcessBaseOnPMId.length"></Tag>
			</div>

			<div class="flex items-center gap-2">
				<IconField iconPosition="left">
					<InputIcon class="flex items-center">
						<Icon name="mdi:filter-outline" />
					</InputIcon>
					<InputText
						v-model="filters['global'].value"
						placeholder="Filter Payment Method Process..."
					/>
				</IconField>
				<Button
					size="small"
					label="New"
					@click="
						createPaymentMethodProcessDialogVisible =
							!createPaymentMethodProcessDialogVisible
					"
				/>
			</div>
		</div>

		<div
			class="fixed right-0 top-[8%] z-50 backdrop-blur-xl w-5/6 h-[8%] px-4 border-b flex justify-between items-center"
		>
			<div class="flex items-center gap-2">
				<label
					for="currentPaymentMethod"
					class="font-semibold text-lg"
					>Current Payment Method:
				</label>
				<Dropdown
					id="currentPaymentMethod"
					placeholder="Select Payment Method"
					v-model="currentPaymentMethod.value"
					:options="paymentMethodsDropdown"
					optionLabel="name"
					optionValue="value"
					@change="(event) => handleDropdown(event)"
				/>
			</div>
		</div>

		<div class="absolute top-[16%] w-full h-[92%]">
			<DataTable
				:value="myPaymentMethodsProcessBaseOnPMId"
				v-model:filters="filters"
				:paginator="true"
				:rows="50"
				:rowsPerPageOptions="[5, 10, 20, 50]"
				scrollable
				scrollHeight="flex"
				removableSort
				v-auto-animate
				sortField="payment_time_example"
				:sortOrder="1"
			>
				<template #empty>
					<div class="flex justify-center items-center">
						<span>No Payment Process Found.</span>
					</div>
				</template>

				<Column
					field="payment_time_example"
					header="Payment Time Example"
					sortable
				>
					<template #body="{ data }">
						{{ data['payment_time_example'] }}
					</template>
				</Column>

				<Column
					field="include_vat"
					header="Include VAT"
				>
					<template #body="{ data }">
						{{ data['include_vat'] == true ? 'Yes' : 'No' }}
					</template>
				</Column>

				<Column
					field="total_percent_payment"
					header="Total payment"
					sortable
				>
					<template #body="{ data }">
						<Knob
							v-model="data['total_percent_payment']"
							readonly
							:size="50"
						/>
					</template>
				</Column>

				<Column header="Actions">
					<template #body="{ data }">
						<Button
							text
							severity="secondary"
							@click="toggleViewDetailsPaymentMethodProcess(data)"
						>
							<Icon name="mdi:eye-outline" />
						</Button>
						<Button
							text
							severity="secondary"
							@click="toggleEditPaymentMethodProcess(data)"
						>
							<Icon name="mdi:edit-outline" />
						</Button>
						<Button
							text
							severity="danger"
							@click="toggleDeletePaymentMethodProcess(data)"
						>
							<Icon name="mdi:delete-outline" />
						</Button>
					</template>
				</Column>
			</DataTable>
		</div>
	</div>
	<ViewDetailsPaymentMethodProcessDialog
		v-if="viewDetailsPaymentMethodProcessDialogVisible"
		:visible="viewDetailsPaymentMethodProcessDialogVisible"
	/>
	<CreatePaymentMethodProcessDialog
		v-if="createPaymentMethodProcessDialogVisible"
		:visible="createPaymentMethodProcessDialogVisible"
	/>
	<EditPaymentMethodProcessDialog
		v-if="editPaymentMethodProcessDialogVisible"
		:visible="editPaymentMethodProcessDialogVisible"
	/>
	<DeletePaymentMethodProcessDialog
		v-if="deletePaymentMethodProcessDialogVisible"
		:visible="deletePaymentMethodProcessDialogVisible"
	/>
</template>
