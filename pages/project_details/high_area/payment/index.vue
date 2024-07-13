<script setup>
	definePageMeta({
		layout: 'empty',
	});

	import { ref } from 'vue';
	import { FilterMatchMode } from 'primevue/api';

	const router = useRouter();
	const toast = useToast();

	const { zones, currentZoneIDFromLocalStore } = storeToRefs(useZonesStore());
	const { getZones } = useZonesStore();
	const { highAreas, currentHighArea, currentHighAreaIDFromLocalStore } =
		storeToRefs(useHighAreasStore());
	const { getHighAreas } = useHighAreasStore();
	const { highPaymentProcesses, currentHighPaymentProcess } = storeToRefs(
		useHighPaymentProcessStore()
	);
	const { getHighPaymentProcesses } = useHighPaymentProcessStore();
	const { customersDropdown } = storeToRefs(useCustomersStore());
	const { getCustomers } = useCustomersStore();
	const { users, usersDropdown } = storeToRefs(useUsersStore());
	const { getUsers } = useUsersStore();
	const { addNewHighContract } = useHighContractStore();
	const { paymentMethodsDropdown } = storeToRefs(usePaymentMethodsStore());
	const { getPaymentMethods } = usePaymentMethodsStore();
	const { paymentMethodsProcess } = storeToRefs(
		usePaymentMethodsProcessStore()
	);
	const { getPaymentMethodsProcess } = usePaymentMethodsProcessStore();

	await getHighPaymentProcesses();
	await getCustomers();
	await getUsers();
	await getZones();
	await getHighAreas();
	await getPaymentMethods();
	await getPaymentMethodsProcess();

	const user = ref({});
	const high = ref(
		highAreas.value.filter(
			(high) => high['id'] == currentHighAreaIDFromLocalStore.value
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
	const createHighPaymentProcessDialogVisible = ref(false);

	const toggleCreateHighPaymentProcess = (data) => {
		currentHighPaymentProcess.value = data;
		createHighPaymentProcessDialogVisible.value =
			!createHighPaymentProcessDialogVisible.value;
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
	const contractStatus = ref({});
	const paymentMethodDesc = ref('');
	const desc = ref(currentHighArea.value['desc']);
	const isLoading = ref(false);
	const showProgressExamplePanel = ref(false);
	const showCheckProgressExampleButton = ref(false);
	const myPaymentMethodsProcessBaseOnPMId = ref(0);
	const currentPaymentMethod = ref({});

	const onChangePaymentMethod = (event) => {
		showCheckProgressExampleButton.value = true;

		paymentMethodDesc.value = paymentMethodsDropdown.value.filter(
			(payment) => payment['value'] == event.value
		)?.[0]?.['desc'];

		currentPaymentMethod.value = paymentMethodsDropdown.value.filter(
			(payment) => payment['value'] == event.value
		)?.[0];
	};

	const checkProgressExample = () => {
		toast.add({
			severity: 'success',
			summary: 'Success',
			detail: 'Check Progress Example Successfully!',
			group: 'bl',
			life: 3000,
		});

		showProgressExamplePanel.value = true;

		myPaymentMethodsProcessBaseOnPMId.value =
			paymentMethodsProcess.value.filter((process) => {
				return process['payment_method_id'] == currentPaymentMethod.value.value;
			});
	};

	const submitDepositForm = async () => {
		isLoading.value = true;

		const newHighContract = {
			id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1,
			high_area_id: parseInt(currentHighArea.value['id']),
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

		const response = await addNewHighContract(newHighContract);

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
				<div class="flex items-center gap-2">
					<span class="font-semibold text-lg">Payment</span>
					<Tag :value="myPaymentBaseOnHighID.length"></Tag>
				</div>
			</div>
		</div>

		<div class="absolute top-[10%] w-full h-[90%]">
			<Panel
				toggleable
				collapsed
				class="w-full shadow-none"
			>
				<template #header>
					<span class="w-full flex justify-center font-bold text-[#10b98e]"
						>High Area Info</span
					>
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
					<span class="w-full flex justify-center font-bold text-[#10b98e]"
						>Deposit Form</span
					>
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
						<label for="high_area_id">High Area</label>
						<InputText
							id="high_area_id"
							v-model="high"
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
					<div class="flex justify-end items-center gap-3">
						<NuxtLink
							v-if="showCheckProgressExampleButton"
							:to="'#cpe'"
							@click="checkProgressExample"
						>
							<Button
								:loading="isLoading"
								type="submit"
								outlined
								label="Check Progress Example"
							/>
						</NuxtLink>

						<Button
							:loading="isLoading"
							type="submit"
							label="Save"
							@click="submitDepositForm"
						/>
					</div>
				</template>
			</Panel>

			<Panel
				id="cpe"
				toggleable
				class="w-full shadow-none"
				v-if="showProgressExamplePanel"
			>
				<template #header>
					<span class="w-full flex justify-center font-bold text-[#10b98e]"
						>Progress Example</span
					>
				</template>

				<DataTable
					:value="myPaymentMethodsProcessBaseOnPMId"
					v-model:filters="filters"
					:paginator="true"
					:rows="5"
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
							<span>No progress example found.</span>
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

					<Column header="Payment Due Time">
						<template #body="{ data }">
							<span
								:class="
									isPaymentDueTodayOrTomorrow(
										addDaysToDate(beginPayment, data['flag_time'])
									)
										? 'text-red-500'
										: ''
								"
							>
								{{ addDaysToDate(beginPayment, data['flag_time']) }}
							</span>
						</template>
					</Column>

					<Column header="Actions">
						<template #body="{ data }">
							<Button
								text
								severity="secondary"
								@click="toggleCreateHighPaymentProcess(data)"
							>
								<Icon name="mdi:payment" />
							</Button>
							<Button
								v-if="
									isPaymentDueTodayOrTomorrow(
										addDaysToDate(beginPayment, data['flag_time'])
									)
								"
								text
								severity="danger"
							>
								<Icon name="streamline:mail-send-email-message" />
							</Button>
						</template>
					</Column>
				</DataTable>
			</Panel>
		</div>
	</div>
	<CreateHighPaymentProcessDialog
		v-if="createHighPaymentProcessDialogVisible"
		:visible="createHighPaymentProcessDialogVisible"
		:statuses="statuses"
	/>
</template>
