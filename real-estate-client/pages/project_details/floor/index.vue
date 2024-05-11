<script setup>
	import { ref } from 'vue';
	import { FilterMatchMode } from 'primevue/api';

	const { zones } = storeToRefs(useZonesStore());
	const { getZones } = useZonesStore();
	const { blocks } = storeToRefs(useBlocksStore());
	const { getBlocks } = useBlocksStore();
	const { floors, currentFloor } = storeToRefs(useFloorsStore());
	const { getFloors } = useFloorsStore();

	await getZones();
	await getBlocks();
	await getFloors();

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

	const myFloorsBaseOnZoneAndBlockID = computed(() => {
		return floors.value.filter(
			(floor) => floor['block_id'] == currentBlock.value.value
		);
	});

	const filters = ref({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	});
	const menu = ref();
	const menuItems = ref([
		{
			label: 'Move to High Area',
			command: () => {},
		},
	]);
	const viewDetailsFloorDialogVisible = ref(false);
	const createFloorDialogVisible = ref(false);
	const editFloorDialogVisible = ref(false);
	const deleteFloorDialogVisible = ref(false);

	const handleDropdown = (event) => {
		myFloorsBaseOnZoneAndBlockID.value = blocks.value.filter((block) => {
			return block['zone_id'] == event.value;
		});
	};

	const toggleViewDetailsFloor = (data) => {
		currentFloor.value = data;
		viewDetailsFloorDialogVisible.value = !viewDetailsFloorDialogVisible.value;
	};

	const toggleEditFloor = (data) => {
		currentFloor.value = data;
		editFloorDialogVisible.value = !editFloorDialogVisible.value;
	};

	const toggleDeleteFloor = async (data) => {
		currentFloor.value = data;
		deleteFloorDialogVisible.value = !deleteFloorDialogVisible.value;
	};
</script>

<template>
	<div class="w-full h-full flex flex-col">
		<div
			class="fixed right-0 top-0 z-50 backdrop-blur-xl w-5/6 h-[8%] px-4 border-b flex justify-between items-center"
		>
			<div class="flex items-center gap-2">
				<span class="font-semibold text-lg">Floor</span>
				<Tag :value="myFloorsBaseOnZoneAndBlockID.length"></Tag>
			</div>

			<div class="flex items-center gap-2">
				<IconField iconPosition="left">
					<InputIcon class="flex items-center">
						<Icon name="mdi:filter-outline" />
					</InputIcon>
					<InputText
						v-model="filters['global'].value"
						placeholder="Filter floor..."
					/>
				</IconField>
				<Button
					size="small"
					label="New"
					@click="createFloorDialogVisible = !createFloorDialogVisible"
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
					@change="(event) => handleDropdown(event)"
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
					@change="(event) => handleDropdown(event)"
				/>
			</div>
		</div>

		<div class="absolute top-[16%] w-full h-[92%]">
			<DataTable
				:value="myFloorsBaseOnZoneAndBlockID"
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
						<span>No floor found.</span>
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

				<Column
					field="total_area"
					header="Total Area"
					:sortable="true"
				>
					<template #body="{ data }">
						{{ data['total_area'] }}
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
							@click="toggleViewDetailsFloor(data)"
						>
							<Icon name="mdi:eye-outline" />
						</Button>
						<Button
							text
							severity="secondary"
							@click="toggleEditFloor(data)"
						>
							<Icon name="mdi:edit-outline" />
						</Button>
						<Button
							text
							severity="danger"
							@click="toggleDeleteFloor(data)"
						>
							<Icon name="mdi:delete-outline" />
						</Button>
						<Button
							text
							severity="secondary"
							@click="(event) => menu.toggle(event)"
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
	<ViewDetailsFloorDialog
		v-if="viewDetailsFloorDialogVisible"
		:visible="viewDetailsFloorDialogVisible"
	/>
	<CreateFloorDialog
		v-if="createFloorDialogVisible"
		:visible="createFloorDialogVisible"
	/>
	<EditFloorDialog
		v-if="editFloorDialogVisible"
		:visible="editFloorDialogVisible"
	/>
	<DeleteFloorDialog
		v-if="deleteFloorDialogVisible"
		:visible="deleteFloorDialogVisible"
	/>
</template>
