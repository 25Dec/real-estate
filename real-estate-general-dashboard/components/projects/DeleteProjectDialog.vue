<script setup>
	import { accessToken, baseUrl } from '~/constants';

	const { visible, data } = defineProps(['visible', 'data']);
	const myVisible = ref(visible);

	const onDelete = async () => {
		await $fetch(baseUrl + `/auth/project/${data['id']}`, {
			method: 'delete',
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken,
			},
		});

		myVisible.value = false;
	};
</script>

<template>
	<Dialog
		v-model:visible="myVisible"
		modal
		header="Header"
		:style="{ width: '50rem' }"
		:breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
	>
		<template #header>
			<div class="inline-flex items-center justify-center gap-2">
				<span class="font-bold text-xl">Delete Project?</span>
			</div>
		</template>
		<div>
			<span>
				This will delete project
				<b>{{ data['name'] }}</b>
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
