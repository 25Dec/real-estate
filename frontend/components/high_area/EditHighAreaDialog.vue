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

	const { users, usersDropdown } = storeToRefs(useUsersStore());
	const { getUsers } = useUsersStore();
	const toast = useToast();

	await getZones();
	await getBlocks();
	await getFloors();
	await getUsers();

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
	const owner = ref({
		name: usersDropdown.value.filter(
			(user) => user['value'] == currentHighArea.value['owner']
		)?.[0]?.['fullname'],
		value: usersDropdown.value.filter(
			(user) => user['value'] == currentHighArea.value['owner']
		)?.[0]?.['value'],
	});
	const buyStatus = ref({
		name: statuses.filter(
			(status) => status['value'] == currentHighArea.value['buy_status']
		)?.[0]?.['name'],
		value: statuses.filter(
			(status) => status['value'] == currentHighArea.value['buy_status']
		)?.[0]?.['value'],
	});
	const desc = ref(currentHighArea.value['desc']);
	// const paymentMethod = ref({
	// 	name: paymentMethodsDropdown.value.filter(
	// 		(payment) =>
	// 			payment['value'] == currentHighArea.value['payment_method_id']
	// 	)?.[0]?.['name'],
	// 	value: paymentMethodsDropdown.value.filter(
	// 		(payment) =>
	// 			payment['value'] == currentHighArea.value['payment_method_id']
	// 	)?.[0]?.['value'],
	// });
	const createdAt = ref(currentHighArea.value['created_at']);
	const updatedAt = ref(currentHighArea.value['updated_at']);

	const onSave = async () => {
		const newHighAreaData = {
			...currentHighArea.value,
			floor_id: parseInt(currentFloor.value.value),
			high_area_direction: highAreaDirection.value,
			lat: parseInt(lat.value),
			long: parseInt(long.value),
			total_area: parseInt(totalArea.value),
			progress: parseInt(progress.value),
			number_of_wc: parseInt(numberOfWC.value),
			number_of_room: parseInt(numberOfRoom.value),
			price: parseInt(price.value),
			owner: parseInt(owner.value.value),
			buy_status: buyStatus.value.value,
			desc: desc.value,
			// payment_method_id: parseInt(paymentMethod.value),
			updated_at: new Date().toLocaleString(),
		};

		const response = await editHighArea(newHighAreaData);
		myVisible.value = false;

		if (response != null && response['result'] == 'ok') {
			toast.add({
				severity: 'success',
				summary: 'Success',
				detail: 'Edit High Area Successfully!',
				group: 'bl',
				life: 3000,
			});
		} else {
			toast.add({
				severity: 'danger',
				summary: 'Error',
				detail: 'Failed to Edit High Area',
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
			myFloors.value = floors.value.filter(
				(floor) => floor['block_id'] == currentBlock.value.value
			);
			currentFloor.value = {
				name:
					myFloors.value.filter(
						(floor) => floor['block_id'] == currentBlock.value.value
					)?.[0]?.name ?? '',
				value:
					`${
						myFloors.value.filter(
							(floor) => floor['block_id'] == currentBlock.value.value
						)?.[0]?.value
					}` ?? '',
			};
		}

		if (type == 'block') {
			myFloors.value = floors.value.filter(
				(floor) => floor['block_id'] == event.value
			);
			currentFloor.value = {
				name:
					myFloors.value.filter(
						(floor) => floor['block_id'] == currentBlock.value.value
					)?.[0]?.name ?? '',
				value:
					myFloors.value.filter(
						(floor) => floor['block_id'] == currentBlock.value.value
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
					@change="(event) => handleDropdown(event, 'zone')"
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
					@change="(event) => handleDropdown(event, 'block')"
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
					@change="(event) => handleDropdown(event, 'floor')"
				/>
			</div>

			<div class="flex gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="desc">Name</label>
					<InputText
						id="desc"
						v-model="desc"
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="owner">Owner</label>
					<Dropdown
						id="owner"
						v-model="owner"
						placeholder="Select Owner"
						:options="usersDropdown"
						optionLabel="name"
						optionValue="value"
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
					<label for="highAreaDirection">High Area Direction</label>
					<InputText
						id="highAreaDirection"
						placeholder="High Area Direction"
						v-model="highAreaDirection"
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
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="numberOfWC">Number of WC</label>
					<InputNumber
						id="numberOfWC"
						mode="decimal"
						v-model="numberOfWC"
						:min="0"
					/>
				</div>
			</div>

			<!-- <div class="flex gap-3"> -->
			<div class="flex flex-1 flex-col gap-2">
				<label for="price">Price</label>
				<InputNumber
					id="price"
					v-model="price"
					mode="currency"
					currency="USD"
					locale="en-US"
					fluid
					prefix="$"
					:min="0"
				/>
			</div>
			<!-- <div class="flex flex-1 flex-col gap-2">
					<label for="paymentMethod">Payment Method</label>
					<Dropdown
						id="paymentMethod"
						v-model="paymentMethod.value"
						placeholder="Select Payment Method"
						:options="paymentMethodsDropdown"
						optionLabel="name"
						optionValue="value"
					/>
				</div> -->
			<!-- </div> -->

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
						v-model="buyStatus.value"
						placeholder="Select Status"
						:options="statuses"
						optionLabel="name"
						optionValue="value"
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
