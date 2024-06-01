<script setup>
	const { visible } = defineProps(['visible']);

	const { currentLandPaymentProcess } = storeToRefs(
		useLandPaymentProcessStore()
	);
	const { deleteLandPaymentProcess } = useLandPaymentProcessStore();
	const toast = useToast();

	const myVisible = ref(visible);

	const onDelete = async () => {
		const response = await deleteLandPaymentProcess(
			currentLandPaymentProcess.value
		);
		myVisible.value = false;

		if (response != null && response['result'] == 'ok') {
			toast.add({
				severity: 'success',
				summary: 'Success',
				detail: 'Delete Payment Successfully!',
				group: 'bl',
				life: 3000,
			});
		} else {
			toast.add({
				severity: 'warning',
				summary: 'Error',
				detail: 'Failed to Delete Payment',
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
				<span class="font-bold text-xl">Delete Payment?</span>
			</div>
		</template>
		<div>
			<span> This will delete this payment permanently! </span>
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
