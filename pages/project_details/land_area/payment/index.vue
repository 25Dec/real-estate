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
			'/components/land_payment_process/CheckProgressExampleDialogData.vue'
		)
	);
	const CheckProgressExampleDialogFooter = defineAsyncComponent(() =>
		import(
			'/components/land_payment_process/CheckProgressExampleDialogFooter.vue'
		)
	);

	const { currentLandArea, currentLandAreaIDFromLocalStore } = storeToRefs(
		useLandAreasStore()
	);
	const { LandPaymentProcesses, currentLandPaymentProcess } = storeToRefs(
		useLandPaymentProcessStore()
	);
	const { getLandPaymentProcesses } = useLandPaymentProcessStore();
	const { getAccounts } = useAccountsStore();

	await getLandPaymentProcesses();
	await getAccounts();

	const myPaymentBaseOnLandID = computed(() => {
		return landPaymentProcesses.value.filter((payment) => {
			return payment['land_area_id'] == currentLandAreaIDFromLocalStore.value;
		});
	});
	const statuses = ref([{ name: 'Done', value: 'Done' }]);
	const filters = ref({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	});
	const createLandPaymentProcessDialogVisible = ref(false);
	const editLandPaymentProcessDialogVisible = ref(false);
	const deleteLandPaymentProcessDialogVisible = ref(false);

	const toggleEditPayment = (data) => {
		currentLandPaymentProcess.value = data;
		editLandPaymentProcessDialogVisible.value =
			!editLandPaymentProcessDialogVisible.value;
	};
	const toggleDeletePayment = (data) => {
		currentLandPaymentProcess.value = data;
		deleteLandPaymentProcessDialogVisible.value =
			!deleteLandPaymentProcessDialogVisible.value;
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
					Back to Land Area
				</p>
				<div class="flex items-center gap-2">
					<span class="font-semibold text-lg">Payment</span>
					<Tag :value="myPaymentBaseOnLandID.length"></Tag>
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
						createLandPaymentProcessDialogVisible =
							!createLandPaymentProcessDialogVisible
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
			<DataTable
				:value="myPaymentBaseOnLandID"
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

				<Column
					field="status"
					header="Status"
				>
					<template #body="{ data }">
						<Tag
							:severity="data['status'] == 'done' ? 'success' : 'danger'"
							:value="data['status'].toUpperCase()"
						/>
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
	<CreateLandPaymentProcessDialog
		v-if="createLandPaymentProcessDialogVisible"
		:visible="createLandPaymentProcessDialogVisible"
		:statuses="statuses"
	/>
	<EditLandPaymentProcessDialog
		v-if="editLandPaymentProcessDialogVisible"
		:visible="editLandPaymentProcessDialogVisible"
		:statuses="statuses"
	/>
	<DeleteLandPaymentProcessDialog
		v-if="deleteLandPaymentProcessDialogVisible"
		:visible="deleteLandPaymentProcessDialogVisible"
	/>
	<DynamicDialog />
</template>
