<script setup>
	import { ref } from 'vue';
	import { FilterMatchMode } from 'primevue/api';
	import { baseUrl } from '../../constants/index';

	const accessToken = useCookie('token');
	const { currentProjectIDFromLocalStore } = storeToRefs(useProjectsStore());

	const { data } = await useFetch(baseUrl + '/auth/paymentMethodProcess', {
		headers: {
			'Content-Type': 'application/json',
			access_token: accessToken.value,
		},
	});

	const paymentMethodProcesses = ref(
		data.value.data.filter((paymentMethod) => {
			return paymentMethod['project_id'] == 27;
		})
	);
	const paymentMethodProcess = ref({});

	const filters = ref({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	});
	const viewDetailsPaymentMethodProcessDialogVisible = ref(false);
	const createPaymentMethodProcessDialogVisible = ref(false);
	const editPaymentMethodProcessDialogVisible = ref(false);
	const deletePaymentMethodProcessDialogVisible = ref(false);

	const viewPaymentMethodProcessDetails = async (data) => {
		paymentMethodProcess.value = data;
		viewDetailsPaymentMethodProcessDialogVisible.value =
			!viewDetailsPaymentMethodProcessDialogVisible.value;
	};

	const editPaymentMethodProcess = async (data) => {
		paymentMethodProcess.value = data;
		editPaymentMethodProcessDialogVisible.value =
			!editPaymentMethodProcessDialogVisible.value;
	};

	const deletePaymentMethodProcess = async (data) => {
		paymentMethodProcess.value = data;
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
				<span class="font-semibold text-lg">Payment Method Process</span>
				<Tag :value="paymentMethodProcesses.length"></Tag>
			</div>

			<div class="flex items-center gap-2">
				<IconField iconPosition="left">
					<InputIcon class="flex items-center">
						<Icon name="mdi:filter-outline" />
					</InputIcon>
					<InputText
						v-model="filters['global'].value"
						placeholder="Filter payment method..."
					/>
				</IconField>
				<Button
					size="small"
					label="New Payment Method Process"
					@click="
						createPaymentMethodProcessDialogVisible =
							!createPaymentMethodProcessDialogVisible
					"
				/>
			</div>
		</div>

		<div class="absolute top-[8%] w-full h-[92%]">
			<DataTable
				:value="paymentMethodProcesses"
				v-model:filters="filters"
				:paginator="true"
				:rows="50"
				:rowsPerPageOptions="[5, 10, 20, 50]"
				scrollable
				scrollHeight="flex"
			>
				<template #empty>
					<div class="flex justify-center items-center">
						<span>No payment method process found.</span>
					</div>
				</template>

				<Column
					field="payment_method_id"
					header="Payment Method ID"
					sortable
				>
					<template #body="{ data }">
						{{ data['payment_method_id'] }}
					</template>
				</Column>

				<Column
					field="total_percent_payment"
					header="Total Percent Payment"
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
							@click="viewPaymentMethodProcessDetails(data)"
						>
							<Icon name="mdi:eye-outline" />
						</Button>
						<Button
							text
							severity="secondary"
							@click="editPaymentMethodProcess(data)"
						>
							<Icon name="mdi:edit-outline" />
						</Button>
						<Button
							text
							severity="danger"
							@click="deletePaymentMethodProcess(data)"
						>
							<Icon name="mdi:delete-outline" />
						</Button>
					</template>
				</Column>
			</DataTable>
		</div>
	</div>
	<ViewDetailsPaymentMethodDialog
		v-if="viewDetailsPaymentMethodDialogVisible"
		:visible="viewDetailsPaymentMethodDialogVisible"
		:data="paymentMethod"
	/>
	<CreatePaymentMethodDialog
		v-if="createPaymentMethodDialogVisible"
		:visible="createPaymentMethodDialogVisible"
		:allProjectIDs="allProjectIDs"
	/>
	<EditPaymentMethodDialog
		v-if="editPaymentMethodDialogVisible"
		:visible="editPaymentMethodDialogVisible"
		:allProjectIDs="allProjectIDs"
		:data="paymentMethod"
	/>
	<DeletePaymentMethodDialog
		v-if="deletePaymentMethodDialogVisible"
		:visible="deletePaymentMethodDialogVisible"
		:data="paymentMethod"
	/>
</template>
