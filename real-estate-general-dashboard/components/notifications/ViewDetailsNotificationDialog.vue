<script setup>
	const { visible, data, allProjectIDs, statuses } = defineProps([
		'visible',
		'allProjectIDs',
		'data',
		'statuses',
	]);

	const myVisible = ref(visible);
	const title = ref(data['title']);
	const content = ref(data['content']);
	const status = ref(data['status']);
	const projectID = ref(data['project_id']);
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
			<div class="flex">
				<div class="flex flex-1 flex-col gap-2">
					<label for="title">Title</label>
					<InputText
						id="title"
						placeholder="Title"
						v-model="title"
						disabled
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
						v-model="
							allProjectIDs[
								allProjectIDs.findIndex((id) => id.value == projectID)
							].value
						"
						:options="allProjectIDs"
						optionLabel="name"
						optionValue="value"
						disabled
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
						optionValue="value"
						disabled
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
					disabled
				/>
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
