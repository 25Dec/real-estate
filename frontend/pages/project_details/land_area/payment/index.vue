<script setup>
	definePageMeta({
		layout: 'empty',
	});

	import { ref, markRaw } from 'vue';
	import { FilterMatchMode } from 'primevue/api';
	import { useDialog } from 'primevue/usedialog';

	const router = useRouter();
	const dialog = useDialog();
	const toast = useToast();

	const { zones, currentZoneIDFromLocalStore } = storeToRefs(useZonesStore());
	const { getZones } = useZonesStore();
	const { landAreas, currentLandArea, currentLandAreaIDFromLocalStore } =
		storeToRefs(useLandAreasStore());
	const { getLandAreas } = useLandAreasStore();
	const { landPaymentProcesses, currentLandPaymentProcess } = storeToRefs(
		useLandPaymentProcessStore()
	);
	const { getLandPaymentProcesses } = useLandPaymentProcessStore();
	const { customersDropdown } = storeToRefs(useCustomersStore());
	const { getCustomers } = useCustomersStore();
	const { users, usersDropdown } = storeToRefs(useUsersStore());
	const { getUsers } = useUsersStore();
	const { addNewLandContract } = useLandContractStore();
	const { paymentMethodsDropdown } = storeToRefs(usePaymentMethodsStore());
	const { getPaymentMethods } = usePaymentMethodsStore();

	await getLandPaymentProcesses();
	await getCustomers();
	await getUsers();
	await getZones();
	await getLandAreas();
	await getPaymentMethods();

	const user = ref({});
	const land = ref(
		landAreas.value.filter(
			(land) => land['id'] == currentLandAreaIDFromLocalStore.value
		)?.[0]?.['desc']
	);
	const zone = ref(
		zones.value.filter(
			(zone) => zone['id'] == currentZoneIDFromLocalStore.value
		)?.[0]?.['name']
	);

	if (process.client) {
		user.value = JSON.parse(localStorage.getItem('user')) ?? {};
	}

	const myPaymentBaseOnLandID = computed(() => {
		return landPaymentProcesses.value.filter((payment) => {
			return payment['land_area_id'] == currentLandAreaIDFromLocalStore.value;
		});
	});
	const statuses = ref([{ name: 'Done', value: 'Done' }]);
	const buyStatuses = ref([
		{ name: 'Not Booked', value: 'not booked' },
		{ name: 'Deal', value: 'deal' },
		{ name: 'Booked', value: 'booked' },
	]);
	const contractStatuses = ref([
		{ name: 'Enabled', value: 'enable' },
		{ name: 'Disabled', value: 'disabled' },
		{ name: 'Cancelled', value: 'cancelled' },
	]);
	const seller = ref({
		id: users.value.filter((seller) => seller['id'] == user.value['id'])?.[0]?.[
			'id'
		],
		fullname: `${
			users.value.filter((seller) => seller['id'] == user.value['id'])?.[0]?.[
				'first_name'
			]
		} ${
			users.value.filter((seller) => seller['id'] == user.value['id'])?.[0]?.[
				'last_name'
			]
		}`,
	});
	const buyer = ref({});
	const beginPayment = ref(convertDateTime(new Date().toLocaleString()));
	const bookingFee = ref({});
	const paymentMethod = ref({});
	const bookingFeeStatuses = ref([
		{ name: '10.000.000', value: 10000000 },
		{ name: '50.000.000', value: 50000000 },
	]);
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

	const landAreaDirection = ref(currentLandArea.value['land_direction']);
	const isFront = ref(currentLandArea.value['is_front']);
	const lat = ref(currentLandArea.value['lat']);
	const long = ref(currentLandArea.value['long']);
	const buildingArea = ref(currentLandArea.value['building_area']);
	const totalArea = ref(currentLandArea.value['total_area']);
	const progress = ref(currentLandArea.value['progress']);
	const numberOfFloor = ref(currentLandArea.value['number_of_floor']);
	const numberOfWC = ref(currentLandArea.value['number_of_wc']);
	const numberOfRoom = ref(currentLandArea.value['number_of_room']);
	const price = ref(currentLandArea.value['price']);
	const owner = ref({
		name: usersDropdown.value.filter(
			(user) => user['value'] == currentLandArea.value['owner']
		)?.[0]?.['fullname'],
		value: usersDropdown.value.filter(
			(user) => user['value'] == currentLandArea.value['owner']
		)?.[0]?.['value'],
	});
	const buyStatus = ref({
		name: buyStatuses.value.filter(
			(status) => status['value'] == currentLandArea.value['buy_status']
		)?.[0]?.['name'],
		value: buyStatuses.value.filter(
			(status) => status['value'] == currentLandArea.value['buy_status']
		)?.[0]?.['value'],
	});

	const contractStatus = ref({});
	const paymentMethodDesc = ref('');
	const desc = ref(currentLandArea.value['desc']);
	const isLoading = ref(false);

	const onChangePaymentMethod = (event) => {
		paymentMethodDesc.value = paymentMethodsDropdown.value.filter(
			(payment) => payment['value'] == event.value
		)?.[0]?.['desc'];
	};

	const submitDepositForm = async () => {
		isLoading.value = true;

		const newLandContract = {
			id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1,
			land_area_id: parseInt(currentLandArea.value['id']),
			zone_id: parseInt(currentZoneIDFromLocalStore.value),
			booking_fee: parseInt(bookingFee.value.value),
			sale_id: parseInt(seller.value['id']),
			buyer_id: parseInt(buyer.value['value']),
			payment_method_id: parseInt(paymentMethod.value.value),
			status: contractStatus.value.value,
			begin_payment: new Date().toLocaleString(),
			created_by: 46,
			updated_by: 46,
			created_at: new Date().toLocaleString(),
			updated_at: null,
		};

		const response = await addNewLandContract(newLandContract);

		if (response != null && response['result'] == 'ok') {
			isLoading.value = false;
			toast.add({
				severity: 'success',
				summary: 'Success',
				detail: 'Create New Contract Successfully!',
				group: 'bl',
				life: 3000,
			});
		} else {
			isLoading.value = false;
			toast.add({
				severity: 'danger',
				summary: 'Error',
				detail: 'Failed to Create New Contract!',
				group: 'bl',
				life: 3000,
			});
		}
	};
</script>

<template>
	<div class="w-full h-full flex flex-col">
		<div
			class="fixed right-0 top-0 z-50 backdrop-blur-xl w-full h-[10%] px-4 border-b flex justify-between items-center"
		>
			<div class="flex flex-col justify-center gap-2">
				<!-- <p
					class="text-[#10b98e] cursor-pointer text-sm hover:underline"
					@click="() => router.go(-1)"
				>
					Back to Land Area
				</p> -->
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
			<Panel
				toggleable
				collapsed
				class="w-full shadow-none"
			>
				<template #header>
					<span class="font-bold text-[#10b98e]">Land Area Info</span>
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
						placeholder="Select Status"
						v-model="buyStatus.value"
						:options="buyStatuses"
						optionLabel="name"
						optionValue="value"
						disabled
					/>
				</div>

				<div class="flex flex-1 flex-col gap-2">
					<label for="isFront">Front</label>
					<InputText
						id="isFront"
						v-model="isFront"
						placeholder="0m"
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
					<label for="landAreaDirection">Land Area Direction</label>
					<InputText
						id="landAreaDirection"
						v-model="landAreaDirection"
						disabled
					/>
				</div>

				<div class="flex flex-1 flex-col gap-2">
					<label for="buildingArea">Building Area</label>
					<InputNumber
						id="buildingArea"
						mode="decimal"
						v-model="buildingArea"
						:min="0"
						disabled
					/>
				</div>

				<div class="flex flex-1 flex-col gap-2">
					<label for="numberOfFloor">Number Of Floor</label>
					<InputNumber
						id="numberOfFloor"
						mode="decimal"
						v-model="numberOfFloor"
						:min="0"
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
						mode="currency"
						currency="USD"
						locale="en-US"
						fluid
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
					<span class="font-bold text-[#10b98e]">Deposit Form</span>
				</template>

				<div class="flex gap-3">
					<div class="flex flex-1 flex-col gap-2">
						<label for="zone_id">Zone</label>
						<InputText
							id="zone_id"
							v-model="zone"
							disabled
						/>
					</div>
					<div class="flex flex-1 flex-col gap-2">
						<label for="land_area_id">Land Area</label>
						<InputText
							id="land_area_id"
							v-model="land"
							disabled
						/>
					</div>
				</div>

				<!-- <div class="flex flex-1 flex-col gap-2">
						<label for="sale_id">Seller</label>
						<InputText
							id="sale_id"
							v-model="seller['fullname']"
							disabled
						/>
					</div> -->
				<div class="flex flex-1 flex-col gap-2">
					<label for="buyer_id">Buyer</label>
					<Dropdown
						id="buyer_id"
						v-model="buyer.value"
						placeholder="Select Buyer"
						:options="customersDropdown"
						optionLabel="name"
						optionValue="value"
					/>
				</div>

				<div class="flex flex-1 flex-col gap-2">
					<label for="bookingFee">Booking Fee</label>
					<Dropdown
						id="bookingFee"
						v-model="bookingFee.value"
						placeholder="Select Booking Fee"
						:options="bookingFeeStatuses"
						optionLabel="name"
						optionValue="value"
					/>
				</div>

				<div class="flex flex-1 flex-col gap-2">
					<label for="contractStatus">Contract Status</label>
					<Dropdown
						id="contractStatus"
						v-model="contractStatus.value"
						placeholder="Select Status"
						:options="contractStatuses"
						optionLabel="name"
						optionValue="value"
					/>
				</div>

				<div class="flex flex-1 flex-col gap-2">
					<label for="beginPayment">Begin Payment</label>
					<InputText
						id="beginPayment"
						v-model="beginPayment"
						disabled
					/>
				</div>

				<div class="flex flex-1 flex-col gap-2">
					<label for="paymentMethod">Payment Method</label>
					<Dropdown
						id="paymentMethod"
						v-model="paymentMethod.value"
						placeholder="Select Payment Method"
						:options="paymentMethodsDropdown"
						optionLabel="name"
						optionValue="value"
						@change="onChangePaymentMethod"
					/>
				</div>

				<div
					v-if="paymentMethod.value"
					class="my-3"
				>
					<Textarea
						class="w-full"
						disabled
						v-model="paymentMethodDesc"
					/>
				</div>

				<template #footer>
					<div class="flex justify-center items-center">
						<Button
							:loading="isLoading"
							type="submit"
							label="Save"
							@click="submitDepositForm"
						/>
					</div>
				</template>
			</Panel>

			<div class="flex justify-center items-center my-4">
				<span class="text-[#10b98e] text-xl font-bold">HISTORY PAYMENT</span>
			</div>

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
