<script setup>
	const { visible } = defineProps(['visible']);

	const { zones } = storeToRefs(useZonesStore());
	const { getZones } = useZonesStore();
	const { blocks } = storeToRefs(useBlocksStore());
	const { getBlocks } = useBlocksStore();
	const { currentFloor } = storeToRefs(useFloorsStore());
	const myVisible = ref(visible);

	await getZones();
	await getBlocks();

	const numberOfHighArea = ref(currentFloor.value['number_of_high_area']);
	const publicArea = ref(currentFloor.value['public_area']);
	const totalArea = ref(currentFloor.value['total_area']);
	const progress = ref(currentFloor.value['progress']);
	const desc = ref(currentFloor.value['desc']);
	const createdAt = ref(currentFloor.value['created_at']);
	const updatedAt = ref(currentFloor.value['updated_at']);

	zones.value = zones.value.map((zone) => {
		return { id: zone.id, name: `${zone.name}`, value: `${zone.id}` };
	});
	const myZones = ref(zones.value);
	const currentZone = ref({
		name: myZones.value[0]?.name ?? '',
		value: myZones.value[0]?.value ?? '',
	});

	blocks.value = blocks.value.map((block) => {
		return {
			id: block['id'],
			name: `${block['desc']}`,
			value: `${block['id']}`,
			zone_id: `${block['zone_id']}`,
		};
	});
	const myBlocks = ref(
		blocks.value.filter((block) => block['zone_id'] == currentZone.value.value)
	);
	const currentBlock = ref({
		name:
			myBlocks.value.filter(
				(block) => block['zone_id'] == currentZone.value.value
			)?.[0]?.name ?? '',
		value:
			myBlocks.value.filter(
				(block) => block['zone_id'] == currentZone.value.value
			)?.[0]?.value ?? '',
	});
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
			<div class="flex flex-col gap-2">
				<label for="currentBlock">Block</label>
				<Dropdown
					id="currentBlock"
					placeholder="Select block"
					v-model="currentBlock.value"
					:options="myBlocks"
					optionLabel="name"
					optionValue="value"
					disabled
				/>
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
