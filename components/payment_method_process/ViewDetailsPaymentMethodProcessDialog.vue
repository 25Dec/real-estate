<script setup>
	const { visible } = defineProps(['visible']);

	const { paymentMethodsDropdown } = storeToRefs(usePaymentMethodsStore());
	const { getPaymentMethods } = usePaymentMethodsStore();
	const { currentPaymentMethodProcess } = storeToRefs(
		usePaymentMethodsProcessStore()
	);

	const myVisible = ref(visible);
	const paymentMethod = ref({
		name: paymentMethodsDropdown.value.filter(
			(payment) =>
				payment['value'] ==
				currentPaymentMethodProcess.value['payment_method_id']
		)?.[0]?.['name'],
		value: paymentMethodsDropdown.value.filter(
			(payment) =>
				payment['value'] ==
				currentPaymentMethodProcess.value['payment_method_id']
		)?.[0]?.['value'],
	});
	const paymentTimeExample = ref(
		currentPaymentMethodProcess.value['payment_time_example']
	);
	const flagTime = ref(currentPaymentMethodProcess.value['flag_time']);
	const includeVAT = ref(currentPaymentMethodProcess.value['include_vat']);
	const totalPercentPayment = ref(
		currentPaymentMethodProcess.value['total_percent_payment']
	);
	const desc = ref(currentPaymentMethodProcess.value['desc']);
	const createdAt = ref(currentPaymentMethodProcess.value['created_at']);
	const updatedAt = ref(currentPaymentMethodProcess.value['updated_at']);
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
				<span class="font-bold text-xl">Payment Process Details</span>
			</div>
		</template>

		<template class="flex flex-col gap-3">
			<div class="flex gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="paymentMethod">Payment Method</label>
					<Dropdown
						id="paymentMethod"
						v-model="paymentMethod.value"
						placeholder="Select Payment Method"
						:options="paymentMethodsDropdown"
						optionLabel="name"
						optionValue="value"
						disabled
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="paymentTimeExample">Payment Time Example</label>
					<InputNumber
						id="paymentTimeExample"
						v-model="paymentTimeExample"
						disabled
					/>
				</div>
			</div>

			<div class="flex gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="flagTime">Flag Time</label>
					<InputNumber
						id="flagTime"
						v-model="flagTime"
						disabled
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="totalPercentPayment">Total Percent Payment</label>
					<InputNumber
						id="totalPercentPayment"
						v-model="totalPercentPayment"
						prefix="%"
						disabled
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
					disabled
				/>
			</div>

			<div class="flex flex-1 flex-col gap-2 items-end">
				<label for="includeVAT">Include VAT</label>
				<InputSwitch
					id="includeVAT"
					v-model="includeVAT"
					disabled
				/>
			</div>

			<div class="flex flex-row gap-3 justify-between">
				<span class="text-xs text-gray-400">
					Created at: {{ convertDateTime(createdAt) }}
				</span>
				<span class="text-xs text-gray-400">
					Updated at: {{ convertDateTime(updatedAt) }}
				</span>
			</div>
		</template>
		<template #footer>
			<Button
				type="button"
				label="Close"
				@click="myVisible = false"
			/>
		</template>
	</Dialog>
</template>
