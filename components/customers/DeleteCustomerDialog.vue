<script setup>
	const { visible } = defineProps(['visible']);

	const { currentCustomer } = storeToRefs(useCustomersStore());
	const { deleteCustomer } = useCustomersStore();
	const toast = useToast();

	const myVisible = ref(visible);

	const onDelete = async () => {
		const response = await deleteCustomer(currentCustomer.value);
		myVisible.value = false;

		if (response != null && response['result'] == 'ok') {
			toast.add({
				severity: 'success',
				summary: 'Success',
				detail: 'Delete Customer Successfully!',
				group: 'bl',
				life: 3000,
			});
		} else {
			toast.add({
				severity: 'danger',
				summary: 'Error',
				detail: 'Failed to Delete Customer',
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
				<span class="font-bold text-xl">Delete Customer?</span>
			</div>
		</template>
		<div>
			<span>
				This will delete customer
				<b>{{
					`${currentCustomer['first_name']} ${currentCustomer['last_name']}`
				}}</b>
				permanently!
			</span>
			<span>You cannot undo this action!</span>
		</div>
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
				label="Yes, delete"
				severity="danger"
				@click="onDelete"
			/>
		</template>
	</Dialog>
</template>
