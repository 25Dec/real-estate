<script setup>
	import { inject } from 'vue';

	const dialogRef = inject('dialogRef');

	const closeDialog = (event) => {
		dialogRef.value.close(event);
	};
</script>

<template>
	<Button
		type="button"
		label="Close"
		@click="closeDialog({ buttonType: 'Cancel' })"
		autofocus
	/>
</template>
