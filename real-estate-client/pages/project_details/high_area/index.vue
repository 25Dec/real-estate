<script setup>
	import { ref } from 'vue';
	import { FilterMatchMode } from 'primevue/api';

	const router = useRouter();
	const { zones } = storeToRefs(useZonesStore());
	const { getZones } = useZonesStore();
	const { blocks } = storeToRefs(useBlocksStore());
	const { getBlocks } = useBlocksStore();
	const { floors } = storeToRefs(useFloorsStore());
	const { getFloors } = useFloorsStore();
	const { highAreas } = storeToRefs(useHighAreasStore());
	const { getHighAreas, setCurrentHighArea } = useHighAreasStore();

	await getZones();
	await getBlocks();
	await getFloors();
	await getHighAreas();

	zones.value = zones.value.map((zone) => {
		return { id: zone.id, name: `${zone.name}`, value: `${zone.id}` };
	});
	const currentZone = ref({
		name: zones.value[0]?.name ?? '',
		value: zones.value[0]?.value ?? '',
	});

	blocks.value = blocks.value
		.map((block) => {
			return {
				id: block.id,
				name: `${block.desc}`,
				value: `${block.id}`,
				zone_id: `${block['zone_id']}`,
			};
		})
		.filter((block) => block['zone_id'] == currentZone.value.value);
	const currentBlock = ref({
		name: blocks.value[0]?.name ?? '',
		value: blocks.value[0]?.value ?? '',
	});

	floors.value = floors.value
		.map((floor) => {
			return {
				id: floor.id,
				name: `${floor.desc}`,
				value: `${floor.id}`,
				block_id: `${floor['block_id']}`,
			};
		})
		.filter((floor) => floor['block_id'] == currentBlock.value.value);
	const currentFloor = ref({
		name: blocks.value[0]?.name ?? '',
		value: blocks.value[0]?.value ?? '',
	});

	const myHighAreasBaseOnZoneAndBlockAndFloorID = computed(() => {
		return highAreas.value;

		// return highAreas.value.filter((highArea) => {
		// 	return highArea['floor_id'] == currentFloor.value.value;
		// });
	});

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
		{
			label: 'Method Process Example',
			command: () => {},
		},
	]);
	const viewDetailsHighAreaDialogVisible = ref(false);
	const createHighAreaDialogVisible = ref(false);
	const editHighAreaDialogVisible = ref(false);
	const deleteHighAreaDialogVisible = ref(false);

	const handleDropdown = (event, type) => {
		myHighAreasBaseOnZoneAndBlockAndFloorID.value = highAreas.value.filter(
			(highArea) => {
				return highArea['floor_id'] == event.value;
			}
		);
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
	const toggleDeleteHighArea = async (data) => {
		setCurrentHighArea(data);
		deleteHighAreaDialogVisible.value = !deleteHighAreaDialogVisible.value;
	};
	// floors.find((floor) => floor.id == data['floor_id'])
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
					placeholder="Select zone"
					v-model="currentZone.value"
					:options="zones"
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
					placeholder="Select block"
					v-model="currentBlock.value"
					:options="blocks"
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
					placeholder="Select floor"
					v-model="currentFloor.value"
					:options="floors"
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
				sortField="id"
				:sortOrder="-1"
			>
				<template #empty>
					<div class="flex justify-center items-center">
						<span>No high area found.</span>
					</div>
				</template>

				<Column
					field="id"
					header="ID"
					sortable
				>
					<template #body="{ data }">
						{{ data['id'] }}
					</template>
				</Column>

				<Column
					field="desc"
					header="Name"
				>
					<template #body="{ data }">
						{{ data['desc'] }}
					</template>
				</Column>

				<Column
					field="floor"
					header="Floor"
				>
					<template #body="{ data }">
						{{ floors.find((floor) => floor.id == data['floor_id'])?.['name'] }}
					</template>
				</Column>

				<Column
					field="buy_status"
					header="Buy Status"
				>
					<template #body="{ data }">
						<Tag
							:severity="data['buy_status'] == 'booked' ? 'danger' : 'success'"
							:value="data['buy_status'].toUpperCase()"
						></Tag>
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
	/>
	<CreateHighAreaDialog
		v-if="createHighAreaDialogVisible"
		:visible="createHighAreaDialogVisible"
	/>
	<EditHighAreaDialog
		v-if="editHighAreaDialogVisible"
		:visible="editHighAreaDialogVisible"
	/>
	<DeleteHighAreaDialog
		v-if="deleteHighAreaDialogVisible"
		:visible="deleteHighAreaDialogVisible"
	/>
</template>
