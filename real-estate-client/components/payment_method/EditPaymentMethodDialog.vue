<script setup>
	const { visible } = defineProps(['visible']);

	const { currentPaymentMethod } = storeToRefs(usePaymentMethodsStore());
	const { addNewPaymentMethod } = usePaymentMethodsStore();
	const toast = useToast();

	const myVisible = ref(visible);
	const totalOfPaymentTime = ref(
		currentPaymentMethod.value['total_of_payment_time']
	);
	const methodName = ref(currentPaymentMethod.value['method_name']);
	const percentDiscount = ref(
		currentPaymentMethod.value['percent_discount'] * 10
	);
	const vat = ref(currentPaymentMethod.value['vat'] * 10);
	const maintenanceFee = ref(
		currentPaymentMethod.value['maintenance_fee'] * 10
	);
	const createdAt = ref(currentPaymentMethod.value['created_at']);
	const updatedAt = ref(currentPaymentMethod.value['updated_at']);

	const onSave = async () => {
		const newPaymentMethodData = {
			...currentPaymentMethod.value,
			total_of_payment_time: totalOfPaymentTime.value,
			method_name: methodName.value,
			percent_discount: percentDiscount.value,
			vat: vat.value,
			maintenance_fee: maintenanceFee.value,
			updated_at: new Date().toLocaleString(),
		};

		const response = await addNewPaymentMethod(newPaymentMethodData);
		myVisible.value = false;

		if (response != null && response['result'] == 'ok') {
			toast.add({
				severity: 'success',
				summary: 'Success',
				detail: 'Edit New Payment Method Successfully!',
				group: 'bl',
				life: 3000,
			});
		} else {
			toast.add({
				severity: 'warning',
				summary: 'Error',
				detail: 'Failed to Edit New Payment Method',
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
				<span class="font-bold text-xl">Payment Method Details</span>
			</div>
		</template>

		<template class="flex flex-col gap-3">
			<div class="flex flex-col gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="methodName">Method name</label>
					<InputText
						id="methodName"
						placeholder="Method name"
						v-model="methodName"
					/>
				</div>
			</div>

			<div class="flex flex-row gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="totalOfPaymentTime">Total of payment time</label>
					<InputNumber
						id="totalOfPaymentTime"
						v-model="totalOfPaymentTime"
						mode="decimal"
						showButtons
						:min="0"
					/>
				</div>

				<div class="flex flex-1 flex-col gap-2">
					<label for="percentDiscount">Discount</label>
					<InputNumber
						id="percentDiscount"
						v-model="percentDiscount"
						mode="decimal"
						showButtons
						:min="0"
						prefix="%"
					/>
				</div>
			</div>

			<div class="flex flex-row gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="maintenanceFee">Maintenance Fee</label>
					<InputNumber
						id="maintenanceFee"
						v-model="maintenanceFee"
						mode="decimal"
						showButtons
						:min="0"
						prefix="%"
					/>
				</div>

				<div class="flex flex-1 flex-col gap-2">
					<label for="vat">VAT</label>
					<InputNumber
						id="vat"
						v-model="vat"
						mode="decimal"
						showButtons
						:min="0"
						prefix="%"
					/>
				</div>
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
