<script setup>
	const { visible, statuses } = defineProps(['visible', 'statuses']);

	const { customersDropdown: submitters } = storeToRefs(useCustomersStore());
	const { currentLandAreaIDFromLocalStore } = storeToRefs(useLandAreasStore());
	const { addNewLandPaymentProcess } = useLandPaymentProcessStore();
	const toast = useToast();

	const myVisible = ref(visible);
	const paymentTime = ref(0);
	const amountOfMoney = ref(0);
	const amountOfDebt = ref(0);
	const submitter = ref({});
	const status = ref('');

	const onSave = async () => {
		const newPaymentData = {
			id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1,
			land_area_id: parseInt(currentLandAreaIDFromLocalStore.value),
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

		const response = await addNewLandPaymentProcess(newPaymentData);
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
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="amountOfMoney">Amount Of Money</label>
					<InputNumber
						id="amountOfMoney"
						placeholder="Amount Of Money"
						mode="currency"
						currency="USD"
						locale="en-US"
						fluid
						v-model="amountOfMoney"
						:min="0"
					/>
				</div>
			</div>

			<div class="flex gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="amountOfDebt">Amount Of Debt</label>
					<InputNumber
						id="amountOfDebt"
						placeholder="Amount Of Debt"
						mode="currency"
						currency="USD"
						locale="en-US"
						fluid
						v-model="amountOfDebt"
						:min="0"
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

			<!-- <div class="flex flex-1 flex-col gap-2">
				<label for="status">Status</label>
				<Dropdown
					id="status"
					placeholder="Select status"
					v-model="status"
					:options="statuses"
					optionLabel="name"
					optionValue="value"
				/>
			</div> -->
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
