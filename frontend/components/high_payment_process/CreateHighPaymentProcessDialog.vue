<script setup>
	const { visible, statuses, data, alreadyHaveBooking } = defineProps([
		'visible',
		'statuses',
		'data',
		'alreadyHaveBooking',
	]);

	console.log(data);

	const { currentHighPaymentProcess } = storeToRefs(
		useHighPaymentProcessStore()
	);
	const { addNewHighPaymentProcess } = useHighPaymentProcessStore();
	const { customersDropdown: submitters } = storeToRefs(useCustomersStore());
	const { currentHighAreaFromLocalStore } = storeToRefs(useHighAreasStore());
	const toast = useToast();

	const myVisible = ref(visible);
	const paymentTime = ref(
		currentHighPaymentProcess.value['payment_time_example']
	);
	const amountOfMoney = ref(
		currentHighAreaFromLocalStore.value['price'] -
			currentHighAreaFromLocalStore.value['price'] *
				currentHighPaymentProcess.value['total_percent_payment'] *
				0.01
	);
	const amountWantToPay = ref(0);
	const amountOfDebt = computed(() => {
		return amountOfMoney.value - amountWantToPay.value;
	});
	const submitter = ref(
		alreadyHaveBooking
			? {
					name: submitters.value.filter(
						(customer) => customer['value'] == data?.['buyer_id']
					)?.[0]?.['display_name'],
					value: submitters.value.filter(
						(customer) => customer['value'] == data?.['buyer_id']
					)?.[0]?.['value'],
			  }
			: {}
	);

	const status = ref('');

	const onSave = async () => {
		const newPaymentData = {
			id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1,
			high_area_id: parseInt(currentHighAreaFromLocalStore.value['id']),
			payment_time: parseInt(paymentTime.value),
			amount_of_money: parseInt(amountOfMoney.value),
			amount_of_debt: parseInt(amountOfDebt.value),
			submitter: parseInt(submitter.value.value),
			status: '',
			created_by: 13,
			updated_by: 13,
			created_at: new Date().toLocaleString(),
			updated_at: null,
		};

		const response = await addNewHighPaymentProcess(newPaymentData);
		myVisible.value = false;

		if (response != null && response['result'] == 'ok') {
			toast.add({
				severity: 'success',
				summary: 'Success',
				detail: 'Create New Payment Successfully!',
				group: 'bl',
				life: 3000,
			});
		} else {
			toast.add({
				severity: 'danger',
				summary: 'Error',
				detail: 'Failed to Create New Payment',
				group: 'bl',
				life: 3000,
			});
		}
	};
</script>

<template>
	<Dialog
		v-model:visible="myVisible"
		modal
		maximizable
		header="Header"
		:style="{ width: '50rem' }"
		:breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
	>
		<template #header>
			<div class="inline-flex items-center justify-center gap-2">
				<span class="font-bold text-xl">Create New Payment</span>
			</div>
		</template>

		<template class="flex flex-col gap-3">
			<div class="flex gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="paymentTime">Payment Time</label>
					<InputNumber
						id="paymentTime"
						placeholder="Payment Time"
						mode="decimal"
						v-model="paymentTime"
						:min="0"
						disabled
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="submitter">Submitter</label>
					<Dropdown
						id="submitter"
						placeholder="Select Submitter"
						v-model="submitter.value"
						:options="submitters"
						optionLabel="name"
						optionValue="value"
					/>
				</div>
			</div>

			<div class="flex flex-1 flex-col gap-2">
				<label for="highAreaPrice">High Area Price</label>
				<InputNumber
					id="highAreaPrice"
					mode="currency"
					currency="USD"
					locale="en-US"
					fluid
					v-model="currentHighAreaFromLocalStore['price']"
					disabled
				/>
			</div>

			<div class="flex flex-1 flex-col gap-2">
				<label for="totalPercentPayment">Total Percent Payment</label>
				<InputNumber
					id="totalPercentPayment"
					mode="decimal"
					prefix="%"
					v-model="currentHighPaymentProcess['total_percent_payment']"
					disabled
				/>
			</div>

			<div class="flex flex-1 flex-col gap-2">
				<label for="amountOfMoney">Total Amount To Be Paid</label>
				<InputNumber
					id="amountOfMoney"
					placeholder="Amount Of Money"
					mode="currency"
					currency="USD"
					locale="en-US"
					fluid
					v-model="amountOfMoney"
					disabled
				/>
			</div>

			<div class="flex flex-1 flex-col gap-2">
				<label for="amountWantToPay">Amount Want To Pay</label>
				<InputNumber
					id="amountWantToPay"
					placeholder=""
					mode="currency"
					currency="USD"
					locale="en-US"
					fluid
					:max="amountOfMoney"
					:min="0"
					v-model="amountWantToPay"
				/>
			</div>

			<div class="flex flex-row gap-3 justify-between">
				<span class="text-xs text-gray-400">
					Amount Of Debt: ${{ amountOfDebt }}
				</span>
			</div>
		</template>

		<template #footer>
			<Button
				type="button"
				label="Cancel"
				text
				severity="secondary"
				@click="myVisible = false"
			/>
			<Button
				type="submit"
				label="Save"
				@click="onSave"
			/>
		</template>
	</Dialog>
</template>
