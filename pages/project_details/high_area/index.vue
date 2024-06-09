<script setup>
	import { ref } from 'vue';
	import { FilterMatchMode } from 'primevue/api';

	const { zones } = storeToRefs(useZonesStore());
	const { getZones } = useZonesStore();
	const { blocks } = storeToRefs(useBlocksStore());
	const { getBlocks } = useBlocksStore();
	const { floors } = storeToRefs(useFloorsStore());
	const { getFloors } = useFloorsStore();
	const { highAreas } = storeToRefs(useHighAreasStore());
	const { getHighAreas, setCurrentHighArea } = useHighAreasStore();
	const router = useRouter();

	await getZones();
	await getBlocks();
	await getFloors();
	await getHighAreas();

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

	const myHighAreasBaseOnZoneAndBlockAndFloorID = computed(() => {
		return highAreas.value.filter((highArea) => {
			return highArea['floor_id'] == currentFloor.value.value;
		});
	});
	const statuses = ref([
		{ name: 'Booked', value: 'booked' },
		{ name: 'Not Booked', value: 'not booked' },
	]);
	const filters = ref({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	});
	const menu = ref();
	const menuItems = ref([
		{
			label: 'Payment',
			command: () => {
				router.push('high_area/payment');
			},
		},
	]);
	const viewDetailsHighAreaDialogVisible = ref(false);
	const createHighAreaDialogVisible = ref(false);
	const editHighAreaDialogVisible = ref(false);
	const deleteHighAreaDialogVisible = ref(false);

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

	const toggleMenu = (event, data) => {
		setCurrentHighArea(data);
		menu.value.toggle(event);
	};
	const toggleViewDetailsHighArea = (data) => {
		setCurrentHighArea(data);
		viewDetailsHighAreaDialogVisible.value =
			!viewDetailsHighAreaDialogVisible.value;
	};
	const toggleEditHighArea = (data) => {
		setCurrentHighArea(data);
		editHighAreaDialogVisible.value = !editHighAreaDialogVisible.value;
	};
	const toggleDeleteHighArea = (data) => {
		setCurrentHighArea(data);
		deleteHighAreaDialogVisible.value = !deleteHighAreaDialogVisible.value;
	};
</script>

<template>
	<div class="w-full h-full flex flex-col">
		<div
			class="fixed right-0 top-0 z-50 backdrop-blur-xl w-5/6 h-[8%] px-4 border-b flex justify-between items-center"
		>
			<div class="flex items-center gap-2">
				<span class="font-semibold text-lg">High Area</span>
				<Tag :value="myHighAreasBaseOnZoneAndBlockAndFloorID.length"></Tag>
			</div>

			<div class="flex items-center gap-2">
				<IconField iconPosition="left">
					<InputIcon class="flex items-center">
						<Icon name="mdi:filter-outline" />
					</InputIcon>
					<InputText
						v-model="filters['global'].value"
						placeholder="Filter high area..."
					/>
				</IconField>
				<Button
					size="small"
					label="New"
					@click="createHighAreaDialogVisible = !createHighAreaDialogVisible"
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
		</div>

		<div class="absolute top-[16%] w-full h-[92%]">
			<DataTable
				:value="myHighAreasBaseOnZoneAndBlockAndFloorID"
				v-model:filters="filters"
				:paginator="true"
				:rows="50"
				:rowsPerPageOptions="[5, 10, 20, 50]"
				scrollable
				scrollHeight="flex"
				removableSort
				v-auto-animate
			>
				<template #empty>
					<div class="flex justify-center items-center">
						<span>No High Area Found.</span>
					</div>
				</template>

				<Column
					field="desc"
					header="Name"
				>
					<template #body="{ data }">
						{{ data['desc'] }}
					</template>
				</Column>

				<!-- <Column
					field="floor"
					header="Floor"
				>
					<template #body="{ data }">
						{{ floors.find((floor) => floor.id == data['floor_id'])?.['name'] }}
					</template>
				</Column> -->

				<Column
					field="buy_status"
					header="Buy Status"
				>
					<template #body="{ data }">
						<Tag
							:severity="data['buy_status'] == 'booked' ? 'danger' : 'success'"
							:value="data['buy_status'].toUpperCase()"
						/>
					</template>
				</Column>

				<Column
					field="progress"
					header="Progress"
					sortable
				>
					<template #body="{ data }">
						<Knob
							v-model="data['progress']"
							readonly
							:size="50"
						/>
					</template>
				</Column>

				<Column header="Actions">
					<template #body="{ data }">
						<Button
							text
							severity="secondary"
							@click="toggleViewDetailsHighArea(data)"
						>
							<Icon name="mdi:eye-outline" />
						</Button>
						<Button
							text
							severity="secondary"
							@click="toggleEditHighArea(data)"
						>
							<Icon name="mdi:edit-outline" />
						</Button>
						<Button
							text
							severity="danger"
							@click="toggleDeleteHighArea(data)"
						>
							<Icon name="mdi:delete-outline" />
						</Button>
						<Button
							text
							severity="secondary"
							@click="(event) => toggleMenu(event, data)"
						>
							<Icon name="mdi:more-vert" />
						</Button>
						<Menu
							ref="menu"
							:model="menuItems"
							:popup="true"
						/>
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
