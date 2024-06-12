<script setup>
	const { visible, statuses } = defineProps(['visible', 'statuses']);

	const { currentNotification } = storeToRefs(useNotificationsStore());
	const { editNotification } = useNotificationsStore();
	const { projectsDropdown } = storeToRefs(useProjectsStore());
	const toast = useToast();

	const myVisible = ref(visible);
	const title = ref(currentNotification.value['title']);
	const content = ref(currentNotification.value['content']);
	const status = ref({
		name: statuses.filter(
			(stt) => stt['value'] == currentNotification.value['status']
		)?.[0]?.['name'],
		value: statuses.filter(
			(stt) => stt['value'] == currentNotification.value['status']
		)?.[0]?.['value'],
	});
	console.log(status.value);
	const projectID = ref({
		name: projectsDropdown.value.filter(
			(project) => project['value'] == currentNotification.value['project_id']
		)?.[0]?.['name'],
		value: projectsDropdown.value.filter(
			(project) => project['value'] == currentNotification.value['project_id']
		)?.[0]?.['value'],
	});
	const createdAt = ref(currentNotification.value['created_at']);
	const updatedAt = ref(currentNotification.value['updated_at']);

	const onSave = async () => {
		const newNotiData = {
			...currentNotification.value,
			title: title.value,
			content: content.value,
			status: status.value.value,
			project_id: projectID.value.value,
			updated_at: new Date().toLocaleString(),
		};

		const response = await editNotification(newNotiData);
		myVisible.value = false;

		if (response != null && response['result'] == 'ok') {
			toast.add({
				severity: 'success',
				summary: 'Success',
				detail: 'Edit Notification Successfully!',
				group: 'bl',
				life: 3000,
			});
		} else {
			toast.add({
				severity: 'warning',
				summary: 'Error',
				detail: 'Failed to Edit Notification',
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
				<span class="font-bold text-xl">Notification Details</span>
			</div>
		</template>

		<template class="flex flex-col gap-3">
			<div class="flex flex-1 flex-col gap-2">
				<label for="projectID">Project</label>
				<Dropdown
					id="projectID"
					placeholder="Select Project"
					v-model="projectID.value"
					:options="projectsDropdown"
					optionLabel="name"
					optionValue="value"
				/>
			</div>

			<div class="flex flex-1 flex-col gap-2">
				<label for="title">Title</label>
				<InputText
					id="title"
					placeholder="Title"
					v-model="title"
				/>
			</div>

			<div class="flex flex-row gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="status">Status</label>
					<Dropdown
						id="status"
						class="flex-1"
						placeholder="Select Status"
						v-model="status.value"
						:options="statuses"
						optionLabel="name"
						optionValue="value"
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
