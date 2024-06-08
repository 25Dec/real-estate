<script setup>
	const { visible, statuses } = defineProps(['visible', 'statuses']);

	const { zones } = storeToRefs(useZonesStore());
	const { getZones } = useZonesStore();
	const { blocks } = storeToRefs(useBlocksStore());
	const { getBlocks } = useBlocksStore();
	const { floors } = storeToRefs(useFloorsStore());
	const { getFloors } = useFloorsStore();
	const { currentHighArea } = storeToRefs(useHighAreasStore());
	const { editHighArea } = useHighAreasStore();
	const { paymentMethodsDropdown } = storeToRefs(usePaymentMethodsStore());
	const { getPaymentMethods } = usePaymentMethodsStore();
	const toast = useToast();

	await getZones();
	await getBlocks();
	await getFloors();
	await getPaymentMethods();

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

	floors.value = floors.value.map((floor) => {
		return {
			id: floor.id,
			name: `${floor.desc}`,
			value: `${floor.id}`,
			block_id: `${floor['block_id']}`,
		};
	});
	const myFloors = ref(
		floors.value.filter(
			(floor) => floor['block_id'] == currentBlock.value.value
		)
	);
	const currentFloor = ref({
		name:
			myFloors.value.filter(
				(floor) => floor['block_id'] == currentBlock.value.value
			)?.[0]?.name ?? '',
		value:
			myFloors.value.filter(
				(floor) => floor['block_id'] == currentBlock.value.value
			)?.[0]?.value ?? '',
	});

	const myVisible = ref(visible);
	const highAreaDirection = ref(currentHighArea.value['high_area_direction']);
	const lat = ref(currentHighArea.value['lat']);
	const long = ref(currentHighArea.value['long']);
	const totalArea = ref(currentHighArea.value['total_area']);
	const progress = ref(currentHighArea.value['progress']);
	const numberOfWC = ref(currentHighArea.value['number_of_wc']);
	const numberOfRoom = ref(currentHighArea.value['number_of_room']);
	const price = ref(currentHighArea.value['price']);
	const owner = ref(currentHighArea.value['owner']);
	const buyStatus = ref({
		name: statuses.filter(
			(status) => status['value'] == currentHighArea.value['buy_status']
		)?.[0]?.['name'],
		value: statuses.filter(
			(status) => status['value'] == currentHighArea.value['buy_status']
		)?.[0]?.['value'],
	});
	const desc = ref(currentHighArea.value['desc']);
	const paymentMethod = ref({
		name: paymentMethodsDropdown.value.filter(
			(payment) =>
				payment['value'] == currentHighArea.value['payment_method_id']
		)?.[0]?.['name'],
		value: paymentMethodsDropdown.value.filter(
			(payment) =>
				payment['value'] == currentHighArea.value['payment_method_id']
		)?.[0]?.['value'],
	});
	const createdAt = ref(currentHighArea.value['created_at']);
	const updatedAt = ref(currentHighArea.value['updated_at']);
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
				<span class="font-bold text-xl">High Area Details</span>
			</div>
		</template>

		<template class="flex flex-col gap-3"
			><div class="flex flex-1 flex-col gap-2">
				<label for="currentZone">Zone</label>
				<Dropdown
					id="currentZone"
					placeholder="Select Zone"
					v-model="currentZone.value"
					:options="myZones"
					optionLabel="name"
					optionValue="value"
					disabled
				/>
			</div>

			<div class="flex flex-1 flex-col gap-2">
				<label for="currentZone">Block</label>
				<Dropdown
					id="currentBlock"
					placeholder="Select Block"
					v-model="currentBlock.value"
					:options="myBlocks"
					optionLabel="name"
					optionValue="value"
					disabled
				/>
			</div>

			<div class="flex flex-1 flex-col gap-2">
				<label for="currentFloor">Floor</label>
				<Dropdown
					id="currentFloor"
					placeholder="Select Floor"
					v-model="currentFloor.value"
					:options="myFloors"
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
					<label for="highAreaDirection">High Area Direction</label>
					<InputText
						id="highAreaDirection"
						v-model="highAreaDirection"
						disabled
					/>
				</div>
			</div>

			<div class="flex gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="numberOfRoom">Number of room</label>
					<InputNumber
						id="numberOfRoom"
						mode="decimal"
						v-model="numberOfRoom"
						:min="0"
						disabled
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="numberOfWC">Number of WC</label>
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
						v-model="paymentMethod.value"
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
						:max="100"
						disabled
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="buyStatus">Buy Status</label>
					<Dropdown
						id="buyStatus"
						v-model="buyStatus.value"
						placeholder="Select Status"
						:options="statuses"
						optionLabel="name"
						optionValue="value"
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
