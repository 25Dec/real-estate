<script setup>
	const { visible } = defineProps(['visible']);

	const { currentNotification } = storeToRefs(useNotificationsStore());
	const { deleteNotification } = useNotificationsStore();
	const toast = useToast();

	const myVisible = ref(visible);

	const onDelete = async () => {
		const response = await deleteNotification(currentNotification.value);
		myVisible.value = false;

		if (response != null && response['result'] == 'ok') {
			toast.add({
				severity: 'success',
				summary: 'Success',
				detail: 'Delete Notification Successfully!',
				group: 'bl',
				life: 3000,
			});
		} else {
			toast.add({
				severity: 'danger',
				summary: 'Error',
				detail: 'Failed to Delete Notification',
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
				<span class="font-bold text-xl">Delete Notification?</span>
			</div>
		</template>
		<div>
			<span>
				This will delete notification
				<b>{{ currentNotification['title'] }}</b>
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
