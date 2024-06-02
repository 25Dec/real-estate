<script setup>
	const { visible, allProjectIDs } = defineProps(['visible', 'allProjectIDs']);

	const { currentZone } = storeToRefs(useZonesStore());
	const { editZone } = useZonesStore();
	const toast = useToast();

	const myVisible = ref(visible);
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

	const onSave = async () => {
		const newZoneData = {
			...currentZone.value,
			name: name.value,
			desc: desc.value,
			construction_area: parseInt(constructionArea.value),
			total_area: totalArea.value,
			number_of_block: numberOfBlock.value,
			number_of_unit_land: numberOfUnitLand.value,
			progress: progress.value,
			started_day: startedDay.value,
			updated_at: new Date().toLocaleString(),
		};

		const response = await editZone(newZoneData);
		myVisible.value = false;

		if (response != null && response['result'] == 'ok') {
			toast.add({
				severity: 'success',
				summary: 'Success',
				detail: 'Edit New Zone Successfully!',
				group: 'bl',
				life: 3000,
			});
		} else {
			toast.add({
				severity: 'warning',
				summary: 'Error',
				detail: 'Failed to Edit New Zone',
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
				<span class="font-bold text-xl">Zone Details</span>
			</div>
		</template>

		<template class="flex flex-col gap-3">
			<div class="flex flex-1 flex-col gap-2">
				<label for="zoneName">Zone name</label>
				<InputText
					id="zoneName"
					placeholder="Zone name"
					v-model="name"
				/>
			</div>

			<div class="flex flex-row gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="totalArea">Total Area</label>
					<InputNumber
						id="totalArea"
						v-model="totalArea"
						mode="decimal"
						:min="0"
					/>
				</div>

				<div class="flex flex-1 flex-col gap-2">
					<label for="constructionArea">Construction Area</label>
					<InputNumber
						id="constructionArea"
						v-model="constructionArea"
						mode="decimal"
						:min="0"
					/>
				</div>
			</div>

			<div class="flex flex-row gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="numberOfBlock">Number Of Block</label>
					<InputNumber
						id="numberOfBlock"
						v-model="numberOfBlock"
						mode="decimal"
						:min="0"
					/>
				</div>

				<div class="flex flex-1 flex-col gap-2">
					<label for="numberOfUnitLand">Number Of Unit Land</label>
					<InputNumber
						id="numberOfUnitLand"
						v-model="numberOfUnitLand"
						mode="decimal"
						:min="0"
					/>
				</div>
			</div>

			<div class="flex flex-col gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="startedDay">Started Day</label>
					<Calendar
						v-model="startedDay"
						showIcon
						iconDisplay="input"
					/>
				</div>

				<div class="flex flex-1 flex-col gap-2">
					<label for="progress">Progress</label>
					<InputNumber
						id="progress"
						v-model="progress"
						mode="decimal"
						prefix="%"
						:min="0"
					/>
				</div>

				<div class="flex flex-1 flex-col gap-2">
					<label for="desc">Description</label>
					<Textarea
						id="description"
						v-model="desc"
						placeholder="Description"
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
