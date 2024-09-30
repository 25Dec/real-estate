<script setup>
	const { visible, statuses } = defineProps(['visible', 'statuses']);

	const { currentNotification } = storeToRefs(useNotificationsStore());
	const { projectsDropdown } = storeToRefs(useProjectsStore());

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
					disabled
				/>
			</div>

			<div class="flex flex-1 flex-col gap-2">
				<label for="title">Title</label>
				<InputText
					id="title"
					v-model="title"
					disabled
				/>
			</div>

			<div class="flex flex-1 flex-col gap-2">
				<label for="status">Status</label>
				<Dropdown
					id="status"
					class="flex-1"
					v-model="status.value"
					placeholder="Select Status"
					:options="statuses"
					optionLabel="name"
					optionValue="value"
					disabled
				/>
			</div>

			<div class="flex flex-1 flex-col gap-2">
				<label for="content">Content</label>
				<Textarea
					id="content"
					v-model="content"
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
