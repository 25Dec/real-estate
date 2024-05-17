<script setup>
	const { visible, types } = defineProps(['visible', 'types']);

	const { zones } = storeToRefs(useZonesStore());
	const { currentBlock } = storeToRefs(useBlocksStore());
	const { editBlock } = useBlocksStore();

	const myVisible = ref(visible);
	const zone = ref({
		name: zones.value.filter(
			(zone) => zone['id'] == currentBlock.value['zone_id']
		)[0]['name'],
		value: `${currentBlock.value['zone_id']}`,
	});
	const numberOfFloor = ref(currentBlock.value['number_of_floor']);
	const lat = ref(currentBlock.value['lat']);
	const long = ref(currentBlock.value['long']);
	const isService = ref(currentBlock.value['is_service']);
	const desc = ref(currentBlock.value['desc']);
	console.log(types);
	const type = ref({
		name: types.filter(
			(type) => type['value'] == currentBlock.value['type']
		)[0]['name'],
		value: currentBlock.value['type'],
	});
	const progress = ref(currentBlock.value['progress']);
	const startedDay = ref(getYearMonthDay(currentBlock.value['started_day']));
	const createdAt = ref(currentBlock.value['created_at']);
	const updatedAt = ref(currentBlock.value['updated_at']);

	const onSave = async () => {
		const newBlockData = {
			...currentBlock.value,
			zone_id: parseInt(zone.value.value),
			number_of_floor: parseInt(numberOfFloor.value),
			lat: parseInt(lat.value),
			long: parseInt(long.value),
			is_service: isService.value == 1 ? true : false,
			desc: desc.value,
			type: type.value.value,
			progress: parseInt(progress.value),
			started_day: startedDay.value,
			updated_at: new Date().toLocaleString(),
		};

		const response = await editBlock(newBlockData);
		myVisible.value = false;

		if (response != null && response['result'] == 'ok') {
			toast.add({
				severity: 'success',
				summary: 'Success',
				detail: 'Edit New Block Successfully!',
				group: 'bl',
				life: 3000,
			});
		} else {
			toast.add({
				severity: 'warning',
				summary: 'Error',
				detail: 'Failed to Edit New Block',
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
				<span class="font-bold text-xl">Block Details</span>
			</div>
		</template>

		<template class="flex flex-col gap-3">
			<div class="flex flex-1 flex-col gap-2">
				<label for="desc">Name</label>
				<InputText
					id="desc"
					placeholder="Name"
					v-model="desc"
				/>
			</div>

			<div class="flex flex-1 flex-col gap-2">
				<label for="zone_id">Zone</label>
				<Dropdown
					id="zone"
					placeholder="Select zone"
					v-model="zone.value"
					:options="zones"
					optionLabel="name"
					optionValue="value"
				/>
			</div>

			<div class="flex gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="lat">Latitude</label>
					<InputNumber
						id="lat"
						mode="decimal"
						showButtons
						v-model="lat"
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="long">Longitude</label>
					<InputNumber
						id="long"
						mode="decimal"
						showButtons
						v-model="long"
					/>
				</div>
			</div>

			<div class="flex flex-1 flex-col gap-2">
				<label for="type">Type</label>
				<Dropdown
					id="type"
					placeholder="Select type"
					v-model="type.value"
					:options="types"
					optionLabel="name"
					optionValue="value"
				/>
			</div>

			<div class="flex flex-1 flex-col gap-2">
				<label for="numberOfFloor">Number of floor</label>
				<InputNumber
					id="numberOfFloor"
					mode="decimal"
					showButtons
					v-model="numberOfFloor"
					:min="0"
				/>
			</div>

			<div class="flex gap-3">
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
					<label for="startedDay">Started Day</label>
					<Calendar
						v-model="startedDay"
						showIcon
						iconDisplay="input"
					/>
				</div>
			</div>

			<div class="flex flex-1 flex-col gap-2 items-end">
				<label for="isService">Is Service</label>
				<InputSwitch
					id="isService"
					v-model="isService"
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
