<script setup>
	const { visible } = defineProps(['visible']);

	const { zones } = storeToRefs(useZonesStore());
	const { getZones } = useZonesStore();
	const { currentLandArea } = storeToRefs(useLandAreasStore());

	const myVisible = ref(visible);
	const zoneID = ref(currentLandArea.value['zone_id']);
	const landDirection = ref(currentLandArea.value['land_direction']);
	const isFront = ref(currentLandArea.value['is_front']);
	const lat = ref(currentLandArea.value['lat']);
	const long = ref(currentLandArea.value['long']);
	const buildingArea = ref(currentLandArea.value['building_area']);
	const totalArea = ref(currentLandArea.value['total_area']);
	const progress = ref(currentLandArea.value['progress']);
	const numberOfFloor = ref(currentLandArea.value['number_of_floor']);
	const numberOfRoom = ref(currentLandArea.value['number_of_room']);
	const numberOfWC = ref(currentLandArea.value['number_of_wc']);
	const price = ref(currentLandArea.value['price']);
	const owner = ref(currentLandArea.value['owner']);
	const buyStatus = ref(currentLandArea.value['buy_status']);
	const desc = ref(currentLandArea.value['desc']);
	const createdAt = ref(currentLandArea.value['created_at']);
	const updatedAt = ref(currentLandArea.value['updated_at']);
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
				<span class="font-bold text-xl">Land Area Details</span>
			</div>
		</template>

		<template class="flex flex-col gap-3">
			<div class="flex flex-1 flex-col gap-2">
				<label for="zone_id">Zone</label>
				<InputNumber
					id="zone_id"
					placeholder="Zone ID"
					mode="decimal"
					v-model="zoneID"
					disabled
				/>
			</div>

			<div class="flex gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="lat">Latitude</label>
					<InputNumber
						id="lat"
						placeholder="Latitude"
						mode="decimal"
						v-model="lat"
						disabled
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="long">Longitude</label>
					<InputNumber
						id="long"
						placeholder="Longitude"
						mode="decimal"
						v-model="long"
						disabled
					/>
				</div>
			</div>

			<div class="flex gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="buildingArea">Building Area</label>
					<InputNumber
						id="buildingArea"
						placeholder="Building Area"
						mode="decimal"
						v-model="buildingArea"
						disabled
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="totalArea">Total Area</label>
					<InputNumber
						id="totalArea"
						placeholder="Total Area"
						mode="decimal"
						v-model="totalArea"
						disabled
					/>
				</div>
			</div>

			<div class="flex gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="numberOfFloor">Number of floor</label>
					<InputNumber
						id="numberOfFloor"
						mode="decimal"
						v-model="numberOfFloor"
						disabled
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="numberOfRoom">Number of room</label>
					<InputNumber
						id="numberOfRoom"
						mode="decimal"
						v-model="numberOfRoom"
						disabled
					/>
				</div>
			</div>

			<div class="flex gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="numberOfWC">Number of WC</label>
					<InputNumber
						id="numberOfWC"
						mode="decimal"
						v-model="numberOfWC"
						disabled
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="landDirection">Land Direction</label>
					<InputText
						id="landDirection"
						placeholder="Land Direction"
						v-model="landDirection"
						disabled
					/>
				</div>
			</div>

			<div class="flex gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="price">Price</label>
					<InputNumber
						id="price"
						v-model="price"
						mode="decimal"
						prefix="$"
						disabled
					/>
				</div>
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
			</div>

			<div class="flex flex-1 flex-col gap-2 items-end">
				<label for="isFront">Is Front</label>
				<InputSwitch
					id="isFront"
					v-model="isFront"
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
