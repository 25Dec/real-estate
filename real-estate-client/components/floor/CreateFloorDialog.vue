<script setup>
	const { visible } = defineProps(['visible']);

	const { zones } = storeToRefs(useZonesStore());
	const { getZones } = useZonesStore();
	const { blocks } = storeToRefs(useBlocksStore());
	const { getBlocks } = useBlocksStore();
	const { addNewFloor } = useFloorsStore();
	const toast = useToast();

	await getZones();
	await getBlocks();

	const myVisible = ref(visible);
	const blockID = ref(0);
	const numberOfHighArea = ref(0);
	const publicArea = ref(0);
	const totalArea = ref(0);
	const progress = ref(0);
	const desc = ref('');

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

	const onSave = async () => {
		const newFloorData = {
			id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1,
			block_id: parseInt(blockID.value),
			number_of_high_area: parseInt(numberOfHighArea.value),
			public_area: parseInt(publicArea.value),
			total_area: parseInt(totalArea.value),
			progress: parseInt(progress.value),
			desc: desc.value,
			deleted: 'false',
			created_by: 13,
			updated_by: 13,
			created_at: new Date().toLocaleString(),
			updated_at: null,
		};

		const response = await addNewFloor(newFloorData);
		myVisible.value = false;

		if (response != null && response['result'] == 'ok') {
			toast.add({
				severity: 'success',
				summary: 'Success',
				detail: 'Create New Floor Successfully!',
				group: 'bl',
				life: 3000,
			});
		} else {
			toast.add({
				severity: 'warning',
				summary: 'Error',
				detail: 'Failed to Create New Floor',
				group: 'bl',
				life: 3000,
			});
		}
	};

	const handleDropdown = (event, type) => {
		if (type == 'zone') {
			myBlocks.value = blocks.value.filter(
				(block) => block['zone_id'] == event.value
			);
			currentBlock.value = {
				name:
					myBlocks.value.filter(
						(block) => block['zone_id'] == currentZone.value.value
					)?.[0]?.name ?? '',
				value:
					myBlocks.value.filter(
						(block) => block['zone_id'] == currentZone.value.value
					)?.[0]?.value ?? '',
			};
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
				<span class="font-bold text-xl">Create New Floor</span>
			</div>
		</template>

		<template class="flex flex-col gap-3">
			<div class="flex flex-col gap-2">
				<label for="currentZone">Zone</label>
				<Dropdown
					id="currentZone"
					placeholder="Select zone"
					v-model="currentZone.value"
					:options="myZones"
					optionLabel="name"
					optionValue="value"
					@change="(event) => handleDropdown(event, 'zone')"
				/>
			</div>
			<div class="flex flex-col gap-2">
				<label for="currentZone">Block</label>
				<Dropdown
					id="currentBlock"
					placeholder="Select block"
					v-model="currentBlock.value"
					:options="myBlocks"
					optionLabel="name"
					optionValue="value"
					@change="(event) => handleDropdown(event, 'block')"
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
