<script setup>
	const { visible, allProjectIDs } = defineProps(['visible', 'allProjectIDs']);

	const { currentPaymentMethod } = storeToRefs(usePaymentMethodsStore());

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
	const desc = ref(currentPaymentMethod.value['desc']);
	const createdAt = ref(currentPaymentMethod.value['created_at']);
	const updatedAt = ref(currentPaymentMethod.value['updated_at']);
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
					<label for="methodName">Method Name</label>
					<InputText
						id="methodName"
						v-model="methodName"
						disabled
					/>
				</div>
			</div>

			<div class="flex flex-row gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="totalOfPaymentTime">Total Of Payment Time</label>
					<InputNumber
						id="totalOfPaymentTime"
						v-model="totalOfPaymentTime"
						disabled
					/>
				</div>

				<div class="flex flex-1 flex-col gap-2">
					<label for="percentDiscount">Discount</label>
					<InputNumber
						id="percentDiscount"
						v-model="percentDiscount"
						prefix="%"
						disabled
					/>
				</div>
			</div>

			<div class="flex flex-row gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="maintenanceFee">Maintenance Fee</label>
					<InputNumber
						id="maintenanceFee"
						v-model="maintenanceFee"
						prefix="%"
						disabled
					/>
				</div>

				<div class="flex flex-1 flex-col gap-2">
					<label for="vat">VAT</label>
					<InputNumber
						id="vat"
						v-model="vat"
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
