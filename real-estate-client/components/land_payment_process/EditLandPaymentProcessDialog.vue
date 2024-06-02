<script setup>
	const { visible, statuses } = defineProps(['visible', 'statuses']);

	const toast = useToast();
	const { currentLandPaymentProcess } = storeToRefs(
		useLandPaymentProcessStore()
	);
	const { editLandPaymentProcess } = useLandPaymentProcessStore();

	const myVisible = ref(visible);
	const paymentTime = ref(currentLandPaymentProcess.value['payment_time']);
	const amountOfMoney = ref(currentLandPaymentProcess.value['amount_of_money']);
	const amountOfDebt = ref(currentLandPaymentProcess.value['amount_of_debt']);
	const submitter = ref(currentLandPaymentProcess.value['submitter']);
	const status = ref(currentLandPaymentProcess.value['status']);

	const onSave = async () => {
		const newPaymentData = {
			...currentLandPaymentProcess.value,
			payment_time: parseInt(paymentTime.value),
			amount_of_money: parseInt(amountOfMoney.value),
			amount_of_debt: parseInt(amountOfDebt.value),
			submitter: parseInt(46),
			status: '',
			updated_at: new Date().toLocaleString(),
		};

		const response = await editLandPaymentProcess(newPaymentData);
		myVisible.value = false;

		if (response != null && response['result'] == 'ok') {
			toast.add({
				severity: 'success',
				summary: 'Success',
				detail: 'Edit Payment Successfully!',
				group: 'bl',
				life: 3000,
			});
		} else {
			toast.add({
				severity: 'warning',
				summary: 'Error',
				detail: 'Failed to Edit Payment',
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
				<span class="font-bold text-xl">Payment Details</span>
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
						mode="decimal"
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
						mode="decimal"
						v-model="amountOfDebt"
						:min="0"
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="submitter">Submitter</label>
					<InputNumber
						id="submitter"
						placeholder="Submitter"
						mode="decimal"
						v-model="submitter"
						:min="0"
					/>
				</div>
			</div>

			<div class="flex flex-1 flex-col gap-2">
				<label for="status">Status</label>
				<Dropdown
					id="status"
					placeholder="Select Status"
					v-model="status"
					:options="statuses"
					optionLabel="name"
					optionValue="value"
				/>
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
