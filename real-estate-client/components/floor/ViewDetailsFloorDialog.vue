<script setup>
	const { visible } = defineProps(['visible']);

	const { blocks } = storeToRefs(useBlocksStore());
	const { currentFloor } = storeToRefs(useFloorsStore());

	const myVisible = ref(visible);
	const id = ref(currentFloor.value['id']);
	const blockName = ref(
		blocks.value.find((block) => block['id'] == currentFloor.value['block_id'])[
			'name'
		]
	);
	const numberOfHighArea = ref(currentFloor.value['number_of_high_area']);
	const publicArea = ref(currentFloor.value['public_area']);
	const totalArea = ref(currentFloor.value['total_area']);
	const progress = ref(currentFloor.value['progress']);
	const desc = ref(currentFloor.value['desc']);
	const createdAt = ref(currentFloor.value['created_at']);
	const updatedAt = ref(currentFloor.value['updated_at']);
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
					<label for="blockName"> Block Name</label>
					<InputText
						id="blockName"
						v-model="blockName"
						disabled
					/>
				</div>
			</div>

			<div class="flex flex-1 flex-col gap-2">
				<label for="desc">Name</label>
				<InputText
					id="desc"
					v-model="desc"
					disabled
				/>
			</div>

			<div class="flex gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="numberOfHighArea">Number of High Area</label>
					<InputNumber
						id="numberOfHighArea"
						v-model="numberOfHighArea"
						disabled
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="publicArea">Public Area</label>
					<InputNumber
						id="publicArea"
						v-model="publicArea"
						disabled
					/>
				</div>
			</div>

			<div class="flex gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="totalArea">Total Area</label>
					<InputNumber
						id="totalArea"
						v-model="totalArea"
						disabled
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="progress">Progress</label>
					<InputNumber
						id="progress"
						v-model="progress"
						prefix="%"
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
