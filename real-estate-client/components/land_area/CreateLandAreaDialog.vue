<script setup>
	const { visible } = defineProps(['visible']);

	const { zones } = storeToRefs(useZonesStore());
	const { addNewLandArea } = useLandAreasStore();
	const toast = useToast();

	const myVisible = ref(visible);
	const zoneID = ref(0);
	const landDirection = ref('');
	const isFront = ref(false);
	const lat = ref(0);
	const long = ref(0);
	const buildingArea = ref(0);
	const totalArea = ref(0);
	const progress = ref(0);
	const numberOfFloor = ref(0);
	const numberOfRoom = ref(0);
	const numberOfWC = ref(0);
	const price = ref(0);
	const owner = ref(0);
	const buyStatus = ref(0);
	const desc = ref('');

	const onSave = async () => {
		const newLandAreaData = {
			id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1,
			zone_id: zoneID.value,
			land_direction: landDirection.value,
			is_front: isFront.value,
			lat: lat.value,
			long: long.value,
			building_area: buildingArea.value,
			total_area: totalArea.value,
			progress: progress.value,
			number_of_floor: numberOfFloor.value,
			number_of_room: numberOfRoom.value,
			number_of_wc: numberOfWC.value,
			price: price.value,
			owner: owner.value,
			buy_status: buyStatus.value,
			desc: desc.value,
			deleted: 'true',
			created_by: 13,
			updated_by: 13,
			created_at: new Date().toLocaleString(),
			updated_at: null,
		};

		const response = await addNewLandArea(newLandAreaData);
		myVisible.value = false;

		if (response != null && response['result'] == 'ok') {
			toast.add({
				severity: 'success',
				summary: 'Success',
				detail: 'Create New Land Area Successfully!',
				group: 'bl',
				life: 3000,
			});
		} else {
			toast.add({
				severity: 'warning',
				summary: 'Error',
				detail: 'Failed to Create New Land Area',
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
				<span class="font-bold text-xl">Create New Land Area</span>
			</div>
		</template>

		<template class="flex flex-col gap-3">
			<div class="flex flex-1 flex-col gap-2">
				<label for="zone_id">Zone</label>
				<Dropdown
					id="zone_id"
					placeholder="Select zone"
					v-model="currentZone"
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
						placeholder="Latitude"
						mode="decimal"
						showButtons
						v-model="lat"
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="long">Longitude</label>
					<InputNumber
						id="long"
						placeholder="Longitude"
						mode="decimal"
						showButtons
						v-model="long"
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
						showButtons
						v-model="buildingArea"
						:min="0"
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="totalArea">Total Area</label>
					<InputNumber
						id="totalArea"
						placeholder="Total Area"
						mode="decimal"
						showButtons
						v-model="totalArea"
						:min="0"
					/>
				</div>
			</div>

			<div class="flex gap-3">
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
				<div class="flex flex-1 flex-col gap-2">
					<label for="numberOfRoom">Number of room</label>
					<InputNumber
						id="numberOfRoom"
						mode="decimal"
						showButtons
						v-model="numberOfRoom"
						:min="0"
					/>
				</div>
			</div>

			<div class="flex gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="numberOfWC">Number of WC</label>
					<InputNumber
						id="numberOfWC"
						mode="decimal"
						showButtons
						v-model="numberOfWC"
						:min="0"
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="landDirection">Land Direction</label>
					<InputText
						id="landDirection"
						placeholder="Land Direction"
						v-model="landDirection"
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
						:min="0"
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
			</div>

			<div class="flex flex-1 flex-col gap-2 items-end">
				<label for="isFront">Is Front</label>
				<InputSwitch
					id="isFront"
					v-model="isFront"
				/>
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
