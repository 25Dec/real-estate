<script setup>
	definePageMeta({
		layout: 'empty',
	});

	import { ref, markRaw, defineAsyncComponent } from 'vue';
	import { FilterMatchMode } from 'primevue/api';
	import { useDialog } from 'primevue/usedialog';

	const router = useRouter();
	const dialog = useDialog();

	const { highAreas, currentHighArea, currentHighAreaIDFromLocalStore } =
		storeToRefs(useHighAreasStore());
	const { getHighAreas } = useHighAreasStore();
	const { highPaymentProcesses, currentHighPaymentProcess } = storeToRefs(
		useHighPaymentProcessStore()
	);
	const { getHighPaymentProcesses } = useHighPaymentProcessStore();
	const { paymentMethodsDropdown } = storeToRefs(usePaymentMethodsStore());
	const { getPaymentMethods } = usePaymentMethodsStore();

	await getHighPaymentProcesses();
	await getHighAreas();
	await getPaymentMethods();

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
</script>

<template>
	<div class="w-full h-full flex flex-col">
		<div
			class="fixed right-0 top-0 z-50 backdrop-blur-xl w-full h-[10%] px-4 border-b flex justify-between items-center"
		>
			<div class="flex flex-col justify-center gap-2">
				<div class="flex items-center gap-2">
					<span class="font-semibold text-lg">History Payment</span>
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
						placeholder="Filter Payment..."
					/>
				</IconField>
				<!-- <Button
					size="small"
					label="New"
					@click="
						createHighPaymentProcessDialogVisible =!createHighPaymentProcessDialogVisible
					"
				/> -->
			</div>
		</div>

		<div class="absolute top-[10%] w-full h-[90%]">
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
</template>
