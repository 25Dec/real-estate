<script setup>
	const { visible } = defineProps(['visible']);

	const { currentZone } = storeToRefs(useZonesStore());

	const myVisible = ref(visible);
	const id = ref(currentZone.value['id']);
	const projectID = ref(currentZone.value['project_id']);
	const name = ref(currentZone.value['name']);
	const desc = ref(currentZone.value['desc']);
	const constructionArea = ref(currentZone.value['construction_area']);
	const totalArea = ref(currentZone.value['total_area']);
	const numberOfBlock = ref(currentZone.value['number_of_block']);
	const numberOfUnitLand = ref(currentZone.value['number_of_unit_land']);
	const progress = ref(currentZone.value['progress']);
	const startedDay = ref(currentZone.value['started_day']);
	const createdAt = ref(currentZone.value['created_at']);
	const updatedAt = ref(currentZone.value['updated_at']);
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
				<span class="font-bold text-xl">Zone Details</span>
			</div>
		</template>

		<template class="flex flex-col gap-3">
			<div class="flex gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="id">ID</label>
					<InputText
						id="id"
						v-model="id"
						disabled
					/>
				</div>

				<div class="flex flex-1 flex-col gap-2">
					<label for="project_id">Project ID</label>
					<InputText
						id="project_id"
						v-model="projectID"
						disabled
					/>
				</div>
			</div>

			<div class="flex">
				<div class="flex flex-1 flex-col gap-2">
					<label for="name">Name</label>
					<InputText
						id="name"
						v-model="name"
						disabled
					/>
				</div>
			</div>

			<div class="flex gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="constructionArea">Construction Area</label>
					<InputNumber
						id="constructionArea"
						v-model="constructionArea"
						mode="decimal"
						disabled
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="totalArea">Total Area</label>
					<InputNumber
						id="totalArea"
						v-model="totalArea"
						mode="decimal"
						disabled
					/>
				</div>
			</div>

			<div class="flex gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="numberOfBlock">Number Of Block</label>
					<InputNumber
						id="numberOfBlock"
						v-model="numberOfBlock"
						mode="decimal"
						disabled
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="numberOfUnitLand">Number Of Unit Land</label>
					<InputNumber
						id="numberOfUnitLand"
						v-model="numberOfUnitLand"
						mode="decimal"
						disabled
					/>
				</div>
			</div>

			<div class="flex gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="progress">Progress</label>
					<InputNumber
						id="progress"
						v-model="progress"
						mode="decimal"
						prefix="%"
						disabled
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="startedDay">Started Day</label>
					<Calendar
						:v-model="convertDateTime(startedDay)"
						showIcon
						iconDisplay="input"
						disabled
					/>
				</div>
			</div>

			<div class="flex gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="desc">Description</label>
					<Textarea
						id="desc"
						v-model="desc"
						autoResize
						rows="5"
						cols="30"
						disabled
					/>
				</div>
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
