<script setup>
	const { visible } = defineProps(['visible']);

	const { currentProjectID } = storeToRefs(useProjectsStore());
	const { addNewPaymentMethod } = usePaymentMethodsStore();
	const toast = useToast();

	const myVisible = ref(visible);
	const totalOfPaymentTime = ref(0);
	const methodName = ref('');
	const percentDiscount = ref(0);
	const vat = ref(0);
	const maintenanceFee = ref(0);
	const desc = ref('');

	const onSave = async () => {
		const newPaymentMethodData = {
			id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1,
			project_id: currentProjectID.value,
			total_of_payment_time: totalOfPaymentTime.value,
			method_name: methodName.value,
			percent_discount: percentDiscount.value,
			vat: vat.value,
			maintenance_fee: maintenanceFee.value,
			desc: desc.value,
			created_by: 46,
			updated_by: 46,
			created_at: new Date().toLocaleString(),
			updated_at: null,
		};

		const response = await addNewPaymentMethod(newPaymentMethodData);
		myVisible.value = false;

		if (response != null && response['result'] == 'ok') {
			toast.add({
				severity: 'success',
				summary: 'Success',
				detail: 'Create New Payment Method Successfully!',
				group: 'bl',
				life: 3000,
			});
		} else {
			toast.add({
				severity: 'danger',
				summary: 'Error',
				detail: 'Failed to Create New Payment Method',
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
				<span class="font-bold text-xl">Create New Payment Method</span>
			</div>
		</template>

		<template class="flex flex-col gap-3">
			<div class="flex flex-col gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="methodName">Method Name</label>
					<InputText
						id="methodName"
						placeholder="Method name"
						v-model="methodName"
					/>
				</div>
			</div>

			<div class="flex flex-row gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="totalOfPaymentTime">Total Of Payment Time</label>
					<InputNumber
						id="totalOfPaymentTime"
						v-model="totalOfPaymentTime"
						mode="decimal"
						:min="0"
					/>
				</div>

				<div class="flex flex-1 flex-col gap-2">
					<label for="percentDiscount">Discount</label>
					<InputNumber
						id="percentDiscount"
						v-model="percentDiscount"
						mode="decimal"
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
						:min="0"
						prefix="%"
					/>
				</div>
			</div>

			<div class="flex flex-1 flex-col gap-2">
				<label for="desc">Description</label>
				<Textarea
					id="desc"
					v-model="desc"
					placeholder="Description"
					autoResize
					rows="5"
					cols="30"
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
