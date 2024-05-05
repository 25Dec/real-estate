<script setup>
	import { ref } from 'vue';
	import { FilterMatchMode } from 'primevue/api';

	const accessToken = useCookie('token');
	const { currentProjectIDFromLocalStore } = storeToRefs(useProjectsStore());

	let paymentMethods = await usePaymentMethodFetching(accessToken.value);
	const { projects } = storeToRefs(useProjectsStore());
	const { getProjects } = useProjectsStore();
	await getProjects();

	paymentMethods = paymentMethods.filter((paymentMethod) => {
		return paymentMethod['project_id'] == currentProjectIDFromLocalStore.value;
	});

	const allProjectIDs = ref(
		projects.map((project) => {
			return { name: `${project.id}`, value: project.id };
		})
	);
	const paymentMethod = ref({});
	const filters = ref({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	});
	const viewDetailsPaymentMethodDialogVisible = ref(false);
	const createPaymentMethodDialogVisible = ref(false);
	const editPaymentMethodDialogVisible = ref(false);
	const deletePaymentMethodDialogVisible = ref(false);

	const viewPaymentMethodDetails = async (data) => {
		paymentMethod.value = data;
		viewDetailsPaymentMethodDialogVisible.value =
			!viewDetailsPaymentMethodDialogVisible.value;
	};

	const editPaymentMethod = async (data) => {
		paymentMethod.value = data;
		editPaymentMethodDialogVisible.value =
			!editPaymentMethodDialogVisible.value;
	};

	const deletePaymentMethod = async (data) => {
		paymentMethod.value = data;
		deletePaymentMethodDialogVisible.value =
			!deletePaymentMethodDialogVisible.value;
	};
</script>

<template>
	<div class="w-full h-full flex flex-col">
		<div
			class="fixed right-0 top-0 z-50 backdrop-blur-xl w-5/6 h-[8%] px-4 border-b flex justify-between items-center"
		>
			<div class="flex items-center gap-2">
				<span class="font-semibold text-lg">Payment Method</span>
				<Tag :value="paymentMethods.length" />
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
					label="New Payment Method"
					@click="
						createPaymentMethodDialogVisible = !createPaymentMethodDialogVisible
					"
				/>
			</div>
		</div>

		<div class="absolute top-[8%] w-full h-[92%]">
			<DataTable
				:value="paymentMethods"
				v-model:filters="filters"
				:paginator="true"
				:rows="50"
				:rowsPerPageOptions="[5, 10, 20, 50]"
				scrollable
				scrollHeight="flex"
			>
				<template #empty>
					<div class="flex justify-center items-center">
						<span>No payment method found.</span>
					</div>
				</template>

				<Column
					field="method_name"
					header="Name"
					sortable
				>
					<template #body="{ data }">
						{{ data['method_name'] }}
					</template>
				</Column>

				<Column header="Actions">
					<template #body="{ data }">
						<Button
							text
							severity="secondary"
							@click="viewPaymentMethodDetails(data)"
						>
							<Icon name="mdi:eye-outline" />
						</Button>
						<Button
							text
							severity="secondary"
							@click="editPaymentMethod(data)"
						>
							<Icon name="mdi:edit-outline" />
						</Button>
						<Button
							text
							severity="danger"
							@click="deletePaymentMethod(data)"
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
		:allProjectIDs="allProjectIDs"
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
