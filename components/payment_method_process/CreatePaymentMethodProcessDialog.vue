<script setup>
	const { visible } = defineProps(['visible']);

	const { paymentMethodsDropdown } = storeToRefs(usePaymentMethodsStore());
	const { getPaymentMethods } = usePaymentMethodsStore();
	const { addNewPaymentMethodProcess } = usePaymentMethodsProcessStore();
	const toast = useToast();

	const myVisible = ref(visible);
	const paymentMethod = ref({});
	const paymentTimeExample = ref(0);
	const flagTime = ref(0);
	const includeVAT = ref(false);
	const totalPercentPayment = ref(0);
	const desc = ref('');

	const onSave = async () => {
		const newPaymentMethodProcessData = {
			id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1,
			payment_method_id: paymentMethod.value.value,
			payment_time_example: parseInt(paymentTimeExample.value),
			flag_time: parseInt(flagTime.value),
			include_vat: includeVAT.value,
			total_percent_payment: parseInt(totalPercentPayment.value),
			desc: desc.value,
			created_by: 46,
			updated_by: 46,
			created_at: new Date().toLocaleString(),
			updated_at: null,
		};

		const response = await addNewPaymentMethodProcess(
			newPaymentMethodProcessData
		);
		myVisible.value = false;

		if (response != null && response['result'] == 'ok') {
			toast.add({
				severity: 'success',
				summary: 'Success',
				detail: 'Create New Payment Process Successfully!',
				group: 'bl',
				life: 3000,
			});
		} else {
			toast.add({
				severity: 'danger',
				summary: 'Error',
				detail: 'Failed to Create New Payment Process',
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
				<span class="font-bold text-xl">Create New Payment Process</span>
			</div>
		</template>

		<template class="flex flex-col gap-3">
			<div class="flex gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="paymentMethod">Payment Method</label>
					<Dropdown
						id="paymentMethod"
						v-model="paymentMethod"
						placeholder="Select Payment Method"
						:options="paymentMethodsDropdown"
						optionLabel="name"
						optionValue="value"
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="paymentTimeExample">Payment Time Example</label>
					<InputNumber
						id="paymentTimeExample"
						v-model="paymentTimeExample"
						:min="0"
					/>
				</div>
			</div>

			<div class="flex gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="flagTime">Flag Time</label>
					<InputNumber
						id="flagTime"
						v-model="flagTime"
						:min="0"
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="totalPercentPayment">Total Percent Payment</label>
					<InputNumber
						id="totalPercentPayment"
						v-model="totalPercentPayment"
						prefix="%"
						:min="0"
					/>
				</div>
			</div>

			<div class="flex flex-1 flex-col gap-2">
				<label for="desc">Description</label>
				<Textarea
					id="desc"
					v-model="desc"
					autoResize
					rows="5"
					cols="30"
				/>
			</div>

			<div class="flex flex-1 flex-col gap-2 items-end">
				<label for="includeVAT">Include VAT</label>
				<InputSwitch
					id="includeVAT"
					v-model="includeVAT"
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
