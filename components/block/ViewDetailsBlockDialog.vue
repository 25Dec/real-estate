<script setup>
	const { visible, types } = defineProps(['visible', 'types']);

	const { zones } = storeToRefs(useZonesStore());
	const { blocks, currentBlock } = storeToRefs(useBlocksStore());

	const myVisible = ref(visible);
	const currentZone = ref({
		name: zones.value.filter(
			(zone) => zone['id'] == currentBlock.value['zone_id']
		)?.[0]?.['name'],
		value: zones.value.filter(
			(zone) => zone['id'] == currentBlock.value['zone_id']
		)?.[0]?.['value'],
	});
	const numberOfFloor = ref(currentBlock.value['number_of_floor']);
	const lat = ref(currentBlock.value['lat']);
	const long = ref(currentBlock.value['long']);
	const isService = ref(
		currentBlock.value['is_service'] == 'true' ? true : false
	);
	const desc = ref(currentBlock.value['desc']);
	const type = ref({
		name: types.filter(
			(type) => type['value'] == currentBlock.value['type']
		)?.[0]?.['name'],
		value: types.filter(
			(type) => type['value'] == currentBlock.value['type']
		)?.[0]?.['value'],
	});
	const progress = ref(currentBlock.value['progress']);
	const startedDay = ref(getYearMonthDay(currentBlock.value['started_day']));
	const createdAt = ref(currentBlock.value['created_at']);
	const updatedAt = ref(currentBlock.value['updated_at']);
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
				<label for="zone">Zone</label>
				<Dropdown
					id="zone"
					placeholder="Select Zone"
					v-model="currentZone.value"
					:options="zones"
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
					<label for="lat">Latitude</label>
					<InputNumber
						id="lat"
						v-model="lat"
						disabled
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="long">Longitude</label>
					<InputNumber
						id="long"
						v-model="long"
						disabled
					/>
				</div>
			</div>

			<div class="flex flex-1 flex-col gap-2">
				<label for="type">Type</label>
				<Dropdown
					id="type"
					placeholder="Select Type"
					v-model="type.value"
					:options="types"
					optionLabel="name"
					optionValue="value"
					disabled
				/>
			</div>

			<div class="flex flex-1 flex-col gap-2">
				<label for="numberOfFloor">Number of floor</label>
				<InputNumber
					id="numberOfFloor"
					v-model="numberOfFloor"
					disabled
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
						disabled
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="startedDay">Started Day</label>
					<Calendar
						v-model="startedDay"
						showIcon
						iconDisplay="input"
						disabled
					/>
				</div>
			</div>

			<div class="flex flex-1 flex-col gap-2 items-end">
				<label for="isService">Is Service</label>
				<InputSwitch
					id="isService"
					v-model="isService"
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
