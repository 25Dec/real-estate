<script setup>
	const { visible, statuses } = defineProps(['visible', 'statuses']);

	const { zones, zonesDropdown } = storeToRefs(useZonesStore());
	const { currentLandArea } = storeToRefs(useLandAreasStore());
	const { editLandArea } = useLandAreasStore();
	const { paymentMethodsDropdown } = storeToRefs(usePaymentMethodsStore());
	const { getPaymentMethods } = usePaymentMethodsStore();
	const toast = useToast();

	await getPaymentMethods();

	const myVisible = ref(visible);
	const zone = ref(
		zonesDropdown.value.filter(
			(zone) => zone['value'] == currentLandArea.value['zone_id']
		)?.[0]?.['value']
	);
	const landAreaDirection = ref(currentLandArea.value['land_direction']);
	const isFront = ref(currentLandArea.value['is_front']);
	const lat = ref(currentLandArea.value['lat']);
	const long = ref(currentLandArea.value['long']);
	const buildingArea = ref(0);
	const totalArea = ref(currentLandArea.value['total_area']);
	const progress = ref(currentLandArea.value['progress']);
	const numberOfFloor = ref(currentLandArea.value['number_of_floor']);
	const numberOfRoom = ref(currentLandArea.value['number_of_room']);
	const numberOfWC = ref(currentLandArea.value['number_of_wc']);
	const price = ref(currentLandArea.value['price']);
	const owner = ref(currentLandArea.value['owner']);
	const buyStatus = ref({
		name: statuses.filter(
			(status) => status['value'] == currentLandArea.value['buy_status']
		)[0]['name'],
		value: statuses.filter(
			(status) => status['value'] == currentLandArea.value['buy_status']
		)[0]['value'],
	});
	const desc = ref(currentLandArea.value['desc']);
	const paymentMethod = ref({
		name: paymentMethodsDropdown.value.filter(
			(payment) =>
				payment['value'] == currentLandArea.value['payment_method_id']
		)?.[0]?.['name'],
		value: paymentMethodsDropdown.value.filter(
			(payment) =>
				payment['value'] == currentLandArea.value['payment_method_id']
		)?.[0]?.['value'],
	});
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
			<div class="flex gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="desc">Name</label>
					<InputText
						id="desc"
						v-model="desc"
						placeholder="Name"
						disabled
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="zone">Zone</label>
					<Dropdown
						id="zone"
						placeholder="Select Zone"
						v-model="zone"
						:options="zonesDropdown"
						optionLabel="name"
						optionValue="value"
						disabled
					/>
				</div>
			</div>

			<div class="flex gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="lat">Latitude</label>
					<InputNumber
						id="lat"
						mode="decimal"
						v-model="lat"
						disabled
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="long">Longitude</label>
					<InputNumber
						id="long"
						mode="decimal"
						v-model="long"
						disabled
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
						disabled
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="landAreaDirection">Land Area Direction</label>
					<InputText
						id="landAreaDirection"
						placeholder="Land Area Direction"
						v-model="landAreaDirection"
						disabled
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
						disabled
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="numberOfFloor">Number Of Floor</label>
					<InputNumber
						id="numberOfFloor"
						mode="decimal"
						v-model="numberOfFloor"
						:min="0"
						disabled
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
						disabled
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="numberOfWC">Number Of WC</label>
					<InputNumber
						id="numberOfWC"
						mode="decimal"
						v-model="numberOfWC"
						:min="0"
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
						:min="0"
						disabled
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
						disabled
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
						disabled
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="buyStatus">Buy Status</label>
					<Dropdown
						id="buyStatus"
						placeholder="Select Status"
						v-model="buyStatus.value"
						:options="statuses"
						optionLabel="name"
						optionValue="value"
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
