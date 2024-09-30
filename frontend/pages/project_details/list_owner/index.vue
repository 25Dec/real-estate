<script setup>
	import { FilterMatchMode } from 'primevue/api';

	const { zones } = storeToRefs(useZonesStore());
	const { getZones, setCurrentZoneID } = useZonesStore();
	const { blocks } = storeToRefs(useBlocksStore());
	const { getBlocks } = useBlocksStore();
	const { floors } = storeToRefs(useFloorsStore());
	const { getFloors } = useFloorsStore();
	const { highAreas, currentHighArea } = storeToRefs(useHighAreasStore());
	const { getHighAreas, setCurrentHighArea } = useHighAreasStore();
	const { highListOwners } = storeToRefs(useHighListOwnerStore());
	const { getHighListOwners } = useHighListOwnerStore();
	const { customers } = storeToRefs(useCustomersStore());
	const { getCustomers } = useCustomersStore();

	const router = useRouter();

	await getZones();
	await getBlocks();
	await getFloors();
	await getHighAreas();
	await getHighListOwners();
	await getCustomers();

	highListOwners.value = customers.value.filter((customer) => {
		return highListOwners.value.filter(
			(owner) => owner['owner_id'] == customer['id']
		);
	});

	zones.value = zones.value.map((zone) => {
		return { id: zone.id, name: `${zone.name}`, value: `${zone.id}` };
	});
	const myZones = ref(zones.value);
	const currentZone = ref({
		name: myZones.value[0]?.name ?? '',
		value: myZones.value[0]?.value ?? '',
	});
	setCurrentZoneID(currentZone.value.value);

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
	highAreas.value = highAreas.value.map((high) => {
		return {
			id: high.id,
			name: `${high.desc}`,
			value: `${high.id}`,
			floor_id: `${high['floor_id']}`,
		};
	});
	const myHighAreas = ref(
		highAreas.value.filter(
			(high) => high['floor_id'] == currentFloor.value.value
		)
	);
	const currentHigh = ref({
		name:
			myFloors.value.filter(
				(floor) => floor['block_id'] == currentBlock.value.value
			)?.[0]?.name ?? '',
		value:
			myFloors.value.filter(
				(floor) => floor['block_id'] == currentBlock.value.value
			)?.[0]?.value ?? '',
	});
	const myOwnersBaseOnZoneAndBlockAndFloorAndHighID = computed(() => {
		return highListOwners.value.filter((owner) => {
			return owner['high_area_id'] == currentFloor.value.value;
		});
	});
	const filters = ref({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	});
	const viewDetailsOwnerDialogVisible = ref(false);
	const createOwnerDialogVisible = ref(false);
	const editOwnerDialogVisible = ref(false);
	const deleteOwnerDialogVisible = ref(false);

	const toggleViewDetailsOwner = (data) => {
		viewDetailsOwnerDialogVisible.value = !viewDetailsOwnerDialogVisible.value;
	};
	const toggleEditOwner = (data) => {
		setCurrentOwner(data);
		editOwnerDialogVisible.value = !editOwnerDialogVisible.value;
	};
	const toggleDeleteOwner = (data) => {
		setCurrentOwner(data);
		deleteOwnerDialogVisible.value = !deleteOwnerDialogVisible.value;
	};

	const handleDropdown = (event, type) => {
		if (type == 'zone') {
			setCurrentZoneID(event.value);

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
			myHighAreas.value = highAreas.value.filter(
				(high) => high['floor_id'] == currentFloor.value.value
			);
			currentHighArea.value = {
				name:
					myHighAreas.value.filter(
						(high) => high['floor_id'] == currentFloor.value.value
					)?.[0]?.name ?? '',
				value:
					`${
						myHighAreas.value.filter(
							(high) => high['floor_id'] == currentFloor.value.value
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

		if (type == 'floor') {
			myHighAreas.value = highAreas.value.filter(
				(high) => high['floor_id'] == event.value
			);
			currentHigh.value = {
				name:
					myHighAreas.value.filter(
						(high) => high['floor_id'] == currentFloor.value.value
					)?.[0]?.name ?? '',
				value:
					myHighAreas.value.filter(
						(high) => high['floor_id'] == currentFloor.value.value
					)?.[0]?.value ?? '',
			};
		}
	};
</script>

<template>
	<div class="w-full h-full flex flex-col">
		<div
			class="fixed right-0 top-0 z-50 backdrop-blur-xl w-5/6 h-[8%] px-4 border-b flex justify-between items-center"
		>
			<div class="flex items-center gap-2">
				<span class="font-semibold text-lg">Owner</span>
				<Tag :value="myOwnersBaseOnZoneAndBlockAndFloorAndHighID.length"></Tag>
			</div>

			<div class="flex items-center gap-2">
				<IconField iconPosition="left">
					<InputIcon class="flex items-center">
						<Icon name="mdi:filter-outline" />
					</InputIcon>
					<InputText
						v-model="filters['global'].value"
						placeholder="Filter Owner..."
					/>
				</IconField>
				<Button
					size="small"
					label="New"
					@click="createOwnerDialogVisible = !createOwnerDialogVisible"
				/>
			</div>
		</div>

		<div
			class="fixed right-0 top-[8%] z-50 backdrop-blur-xl w-5/6 h-[8%] px-4 border-b flex items-center gap-3"
		>
			<div class="flex items-center gap-2">
				<label
					for="currentZone"
					class="font-semibold text-lg"
					>Current Zone:
				</label>
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
			<div class="flex items-center gap-2">
				<label
					for="currentZone"
					class="font-semibold text-lg"
					>Current Block:
				</label>
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
			<div class="flex items-center gap-2">
				<label
					for="currentFloor"
					class="font-semibold text-lg"
					>Current Floor:
				</label>
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
			<div class="flex items-center gap-2">
				<label
					for="currentHigh"
					class="font-semibold text-lg"
					>Current High:
				</label>
				<Dropdown
					id="currentHigh"
					placeholder="Select High"
					v-model="currentHigh.value"
					:options="myHighAreas"
					optionLabel="name"
					optionValue="value"
					@change="(event) => handleDropdown(event, 'high')"
				/>
			</div>
		</div>

		<div class="absolute top-[16%] w-full h-[92%]">
			<DataTable
				:value="myOwnersBaseOnZoneAndBlockAndFloorAndHighID"
				v-model:filters="filters"
				:paginator="true"
				:rows="50"
				:rowsPerPageOptions="[5, 10, 20, 50]"
				scrollable
				scrollHeight="flex"
				sortField="id"
				:sortOrder="-1"
				removableSort
				v-auto-animate
			>
				<template #empty>
					<div class="flex justify-center items-center">
						<span>No Owner Found.</span>
					</div>
				</template>

				<Column
					field="fullname"
					header="Full Name"
				>
					<template #body="{ data }">
						<div class="flex items-center gap-3">
							<Avatar
								:label="data['first_name']?.substring(0, 3)"
								shape="square"
							/>
							<div class="flex flex-col">
								<span class="font-semibold">{{
									`${data['first_name']} ${data['last_name']}`
								}}</span>
								<span>{{ data['email'] }}</span>
							</div>
						</div>
					</template>
				</Column>

				<Column
					field="phone"
					header="Phone"
				>
					<template #body="{ data }">
						{{ data['phone'] }}
					</template>
				</Column>

				<Column header="Actions">
					<template #body="{ data }">
						<Button
							text
							severity="secondary"
							@click="viewDetailsCustomer(data)"
						>
							<Icon name="mdi:eye-outline" />
						</Button>
						<Button
							text
							severity="secondary"
							@click="editCustomer(data)"
						>
							<Icon name="mdi:edit-outline" />
						</Button>
						<Button
							text
							severity="danger"
							@click="deleteCustomer(data)"
						>
							<Icon name="mdi:delete-outline" />
						</Button>
					</template>
				</Column>
			</DataTable>
		</div>
	</div>
	<ViewDetailsHighAreaDialog
		v-if="viewDetailsHighAreaDialogVisible"
		:visible="viewDetailsHighAreaDialogVisible"
		:statuses="statuses"
	/>
	<CreateHighAreaDialog
		v-if="createHighAreaDialogVisible"
		:visible="createHighAreaDialogVisible"
		:statuses="statuses"
	/>
	<EditHighAreaDialog
		v-if="editHighAreaDialogVisible"
		:visible="editHighAreaDialogVisible"
		:statuses="statuses"
	/>
	<DeleteHighAreaDialog
		v-if="deleteHighAreaDialogVisible"
		:visible="deleteHighAreaDialogVisible"
	/>
</template>
