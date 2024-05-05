<script setup>
	const emit = defineEmits(['reload']);
	import { baseUrl } from '~/constants';

	const { visible, allProjectIDs, statuses } = defineProps([
		'visible',
		'allProjectIDs',
		'statuses',
	]);
	const accessToken = useCookie('token');
	const toast = useToast();

	const myVisible = ref(visible);
	const title = ref('');
	const content = ref('');
	const status = ref('');
	const projectID = ref('');

	const onSave = async () => {
		const newNotiData = {
			id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1,
			title: title.value,
			content: content.value,
			status: status.value.value,
			deleted: 'false',
			project_id: projectID.value.value,
			created_by: 13,
			updated_by: 13,
			created_at: new Date().toLocaleString(),
			updated_at: null,
		};

		const response = await $fetch(baseUrl + `/auth/landArea`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken.value,
			},
			body: newNotiData,
		});

		emit('reload');

		myVisible.value = false;

		if (response != null && response['result'] == 'ok') {
			toast.add({
				severity: 'success',
				summary: 'Success',
				detail: 'Create New Land Area Successfully!',
				group: 'bl',
				life: 3000,
			});
		} else {
			toast.add({
				severity: 'warning',
				summary: 'Error',
				detail: 'Failed to Create New Land Area',
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
		header="Header"
		:style="{ width: '50rem' }"
		:breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
	>
		<template #header>
			<div class="inline-flex items-center justify-center gap-2">
				<span class="font-bold text-xl">Create New Land Area</span>
			</div>
		</template>
		<template class="flex flex-col gap-3">
			<div class="flex">
				<div class="flex flex-1 flex-col gap-2">
					<label for="title">Title</label>
					<InputText
						id="title"
						placeholder="Title"
						v-model="title"
					/>
				</div>
			</div>

			<div class="flex flex-row gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="projectID">Project ID</label>
					<Dropdown
						id="projectID"
						class="flex-1"
						placeholder="Select project ID"
						v-model="projectID"
						:options="allProjectIDs"
						optionLabel="name"
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="status">Status</label>
					<Dropdown
						id="status"
						class="flex-1"
						placeholder="Select status"
						v-model="status"
						:options="statuses"
						optionLabel="name"
					/>
				</div>
			</div>

			<div class="flex flex-1 flex-col gap-2">
				<label for="content">Content</label>
				<Textarea
					id="content"
					v-model="content"
					placeholder="Content"
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
