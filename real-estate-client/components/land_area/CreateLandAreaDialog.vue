<script setup>
	const { visible, statuses } = defineProps(['visible', 'statuses']);

	const { zones, zonesDropdown } = storeToRefs(useZonesStore());
	const { addNewLandArea } = useLandAreasStore();
	const { paymentMethodsDropdown } = storeToRefs(usePaymentMethodsStore());
	const { getPaymentMethods } = usePaymentMethodsStore();
	const toast = useToast();

	await getPaymentMethods();

	const myVisible = ref(visible);
	const zone = ref(0);
	const landAreaDirection = ref('');
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
	const buyStatus = ref({});
	const desc = ref('');
	const paymentMethod = ref(0);

	const onSave = async () => {
		const newLandAreaData = {
			id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1,
			zone_id: parseInt(zone.value),
			land_direction: landAreaDirection.value,
			is_front: isFront.value,
			lat: parseInt(lat.value),
			long: parseInt(long.value),
			building_area: parseInt(buildingArea.value),
			total_area: parseInt(totalArea.value),
			progress: parseInt(progress.value),
			number_of_floor: parseInt(numberOfFloor.value),
			number_of_room: parseInt(numberOfRoom.value),
			number_of_wc: parseInt(numberOfWC.value),
			price: parseInt(price.value),
			owner: parseInt(owner.value),
			buy_status: buyStatus.value,
			desc: desc.value,
			payment_method_id: parseInt(paymentMethod.value),
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
				<label for="zone">Zone</label>
				<Dropdown
					id="zone"
					placeholder="Select Zone"
					v-model="zone"
					:options="zonesDropdown"
					optionLabel="name"
					optionValue="value"
				/>
			</div>

			<div class="flex flex-1 flex-col gap-2">
				<label for="desc">Name</label>
				<InputText
					id="desc"
					v-model="desc"
					placeholder="Name"
				/>
			</div>

			<div class="flex gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="lat">Latitude</label>
					<InputNumber
						id="lat"
						mode="decimal"
						v-model="lat"
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="long">Longitude</label>
					<InputNumber
						id="long"
						mode="decimal"
						v-model="long"
					/>
				</div>
			</div>

			<div class="flex gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="totalArea">Total Area</label>
					<InputNumber
						id="totalArea"
						mode="decimal"
						v-model="totalArea"
						:min="0"
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="landAreaDirection">Land Area Direction</label>
					<InputText
						id="landAreaDirection"
						placeholder="Land Area Direction"
						v-model="landAreaDirection"
					/>
				</div>
			</div>

			<div class="flex gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="buildingArea">Building Area</label>
					<InputNumber
						id="buildingArea"
						mode="decimal"
						v-model="buildingArea"
						:min="0"
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="numberOfFloor">Number Of Floor</label>
					<InputNumber
						id="numberOfFloor"
						mode="decimal"
						v-model="numberOfFloor"
						:min="0"
					/>
				</div>
			</div>

			<div class="flex gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="numberOfRoom">Number Of Room</label>
					<InputNumber
						id="numberOfRoom"
						mode="decimal"
						v-model="numberOfRoom"
						:min="0"
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="numberOfWC">Number Of WC</label>
					<InputNumber
						id="numberOfWC"
						mode="decimal"
						v-model="numberOfWC"
						:min="0"
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
					<label for="paymentMethod">Payment Method</label>
					<Dropdown
						id="paymentMethod"
						v-model="paymentMethod"
						placeholder="Select Payment Method"
						:options="paymentMethodsDropdown"
						optionLabel="name"
						optionValue="value"
					/>
				</div>
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
						:max="100"
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="buyStatus">Buy Status</label>
					<Dropdown
						id="buyStatus"
						placeholder="Select Status"
						v-model="buyStatus"
						:options="statuses"
						optionLabel="name"
						optionValue="value"
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
