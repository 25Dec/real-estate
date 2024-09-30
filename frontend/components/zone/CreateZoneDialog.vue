<script setup>
	const { visible, allProjectIDs } = defineProps(['visible', 'allProjectIDs']);

	const { currentProjectID } = storeToRefs(useProjectsStore());
	const { addNewZone } = useZonesStore();
	const toast = useToast();

	const myVisible = ref(visible);
	const zoneName = ref('');
	const desc = ref('');
	const constructionArea = ref(0);
	const totalArea = ref(0);
	const numberOfBlock = ref(0);
	const numberOfUnitLand = ref(0);
	const progress = ref(0);
	const startedDay = ref();

	const onSave = async () => {
		const newZoneData = {
			id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1,
			project_id: parseInt(currentProjectID.value),
			name: zoneName.value,
			desc: desc.value,
			construction_area: parseInt(constructionArea.value),
			total_area: parseInt(totalArea.value),
			number_of_block: parseInt(numberOfBlock.value),
			number_of_unit_land: parseInt(numberOfUnitLand.value),
			progress: parseInt(progress.value),
			started_day: startedDay.value,
			deleted: 'false',
			created_by: 1,
			updated_by: null,
			created_at: new Date().toLocaleString(),
			updated_at: null,
		};

		const response = await addNewZone(newZoneData);
		myVisible.value = false;

		if (response != null && response['result'] == 'ok') {
			toast.add({
				severity: 'success',
				summary: 'Success',
				detail: 'Create New Zone Successfully!',
				group: 'bl',
				life: 3000,
			});
		} else {
			toast.add({
				severity: 'danger',
				summary: 'Error',
				detail: 'Failed to Create New Zone',
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
				<span class="font-bold text-xl">Create New Zone</span>
			</div>
		</template>

		<template class="flex flex-col gap-3">
			<div class="flex flex-1 flex-col gap-2">
				<label for="zoneName">Zone Name</label>
				<InputText
					id="zoneName"
					placeholder="Zone name"
					v-model="zoneName"
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
						:max="100"
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
