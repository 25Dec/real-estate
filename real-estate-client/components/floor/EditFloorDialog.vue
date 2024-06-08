<script setup>
	const { visible } = defineProps(['visible']);

	const { blocks } = storeToRefs(useBlocksStore());
	const { editFloor } = useFloorsStore();
	const { currentFloor } = storeToRefs(useFloorsStore());
	const toast = useToast();

	const myVisible = ref(visible);
	const blockID = ref(
		blocks.value.find((block) => block['id'] == currentFloor.value['block_id'])
	);

	const numberOfHighArea = ref(currentFloor.value['number_of_high_area']);
	const publicArea = ref(currentFloor.value['public_area']);
	const totalArea = ref(currentFloor.value['total_area']);
	const progress = ref(currentFloor.value['progress']);
	const desc = ref(currentFloor.value['desc']);
	const createdAt = ref(currentFloor.value['created_at']);
	const updatedAt = ref(currentFloor.value['updated_at']);

	const onSave = async () => {
		const newFloorData = {
			...currentFloor.value,
			block_id: parseInt(blockID.value),
			number_of_high_area: parseInt(numberOfHighArea.value),
			public_area: parseInt(publicArea.value),
			total_area: parseInt(totalArea.value),
			progress: parseInt(progress.value),
			desc: desc.value,
			updated_at: new Date().toLocaleString(),
		};

		const response = await editFloor(newFloorData);
		myVisible.value = false;

		if (response != null && response['result'] == 'ok') {
			toast.add({
				severity: 'success',
				summary: 'Success',
				detail: 'Edit Floor Successfully!',
				group: 'bl',
				life: 3000,
			});
		} else {
			toast.add({
				severity: 'warning',
				summary: 'Error',
				detail: 'Failed to Edit Floor',
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
				<span class="font-bold text-xl">Floor Details</span>
			</div>
		</template>

		<template class="flex flex-col gap-3">
			<div class="flex flex-1 flex-col gap-2">
				<label for="blockID">Block</label>
				<Dropdown
					id="blockID"
					placeholder="Select Block"
					v-model="blockID.value"
					:options="blocks"
					optionLabel="name"
					optionValue="value"
				/>
			</div>

			<div class="flex flex-1 flex-col gap-2">
				<label for="desc">Name</label>
				<InputText
					id="desc"
					v-model="desc"
				/>
			</div>

			<div class="flex gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="numberOfHighArea">Number of High Area</label>
					<InputNumber
						id="numberOfHighArea"
						v-model="numberOfHighArea"
						mode="decimal"
						:min="0"
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="publicArea">Public Area</label>
					<InputNumber
						id="publicArea"
						v-model="publicArea"
						mode="decimal"
						:min="0"
					/>
				</div>
			</div>

			<div class="flex gap-3">
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
					<label for="progress">Progress</label>
					<InputNumber
						id="progress"
						v-model="progress"
						prefix="%"
						mode="decimal"
						:min="0"
						:max="100"
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
