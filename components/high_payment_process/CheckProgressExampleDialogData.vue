<script setup>
	const { currentHighArea } = storeToRefs(useHighAreasStore());
	const { getPaymentMethods } = usePaymentMethodsStore();
	const { paymentMethodsProcess } = storeToRefs(
		usePaymentMethodsProcessStore()
	);
	const { getPaymentMethodsProcess } = usePaymentMethodsProcessStore();

	// await getPaymentMethods();
	await getPaymentMethodsProcess();

	const myPaymentMethodsProcessBaseOnPMId = computed(() => {
		return paymentMethodsProcess.value.filter((process) => {
			return (
				process['payment_method_id'] ==
				currentHighArea.value['payment_method_id']
			);
		});
	});
</script>

<template>
	<DataTable :value="myPaymentMethodsProcessBaseOnPMId">
		<template #empty>
			<div class="flex justify-center items-center">
				<span>No payment method process found.</span>
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
	</DataTable>
</template>
