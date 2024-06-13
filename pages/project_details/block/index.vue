<script setup>
	import { ref } from 'vue';
	import { FilterMatchMode } from 'primevue/api';

	const { zones } = storeToRefs(useZonesStore());
	const { getZones } = useZonesStore();
	const { blocks, currentBlock } = storeToRefs(useBlocksStore());
	const { getBlocks } = useBlocksStore();

	await getZones();
	await getBlocks();

	zones.value = zones.value.map((zone) => {
		return { id: zone.id, name: `${zone.name}`, value: `${zone.id}` };
	});
	const currentZone = ref({
		name: zones.value[0]?.name ?? '',
		value: zones.value[0]?.value ?? '',
	});
	const myBlocksBaseOnZoneID = computed(() => {
		return blocks.value.filter((block) => {
			return block['zone_id'] == currentZone.value.value;
		});
	});
	const types = ref([
		{ name: 'Normal', value: 'normal' },
		{ name: 'Luxury', value: 'luxury' },
	]);
	const filters = ref({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	});
	const menu = ref();
	const menuItems = ref([
		{
			label: 'Move to Floor',
			command: () => {},
		},
	]);

	const viewDetailsBlockDialogVisible = ref(false);
	const createBlockDialogVisible = ref(false);
	const editBlockDialogVisible = ref(false);
	const deleteBlockDialogVisible = ref(false);

	const handleDropdown = (event) => {
		myBlocksBaseOnZoneID.value = blocks.value.filter((block) => {
			return block['zone_id'] == event.value;
		});
	};
	const toggleViewDetailsBlock = (data) => {
		currentBlock.value = data;
		viewDetailsBlockDialogVisible.value = !viewDetailsBlockDialogVisible.value;
	};
	const toggleEditBlock = (data) => {
		currentBlock.value = data;
		editBlockDialogVisible.value = !editBlockDialogVisible.value;
	};
	const toggleDeleteBlock = async (data) => {
		currentBlock.value = data;
		deleteBlockDialogVisible.value = !deleteBlockDialogVisible.value;
	};
</script>

<template>
	<div class="w-full h-full flex flex-col">
		<div
			class="fixed right-0 top-0 z-50 backdrop-blur-xl w-5/6 h-[8%] px-4 border-b flex justify-between items-center"
		>
			<div class="flex items-center gap-2">
				<span class="font-semibold text-lg">Block</span>
				<Tag :value="myBlocksBaseOnZoneID.length"></Tag>
			</div>

			<div class="flex items-center gap-2">
				<IconField iconPosition="left">
					<InputIcon class="flex items-center">
						<Icon name="mdi:filter-outline" />
					</InputIcon>
					<InputText
						v-model="filters['global'].value"
						placeholder="Filter Block..."
					/>
				</IconField>
				<Button
					size="small"
					label="New"
					@click="createBlockDialogVisible = !createBlockDialogVisible"
				/>
			</div>
		</div>

		<div
			class="fixed right-0 top-[8%] z-50 backdrop-blur-xl w-5/6 h-[8%] px-4 border-b flex justify-between items-center"
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
					:options="zones"
					optionLabel="name"
					optionValue="value"
					@change="(event) => handleDropdown(event)"
				/>
			</div>
		</div>

		<div class="absolute top-[16%] w-full h-[92%]">
			<DataTable
				:value="myBlocksBaseOnZoneID"
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
						<span>No block found.</span>
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
					field="type"
					header="Type"
				>
					<template #body="{ data }">
						{{ data['type'] }}
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
							@click="toggleViewDetailsBlock(data)"
						>
							<Icon name="mdi:eye-outline" />
						</Button>
						<Button
							text
							severity="secondary"
							@click="toggleEditBlock(data)"
						>
							<Icon name="mdi:edit-outline" />
						</Button>
						<Button
							text
							severity="danger"
							@click="toggleDeleteBlock(data)"
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
	<ViewDetailsBlockDialog
		v-if="viewDetailsBlockDialogVisible"
		:visible="viewDetailsBlockDialogVisible"
		:types="types"
	/>
	<CreateBlockDialog
		v-if="createBlockDialogVisible"
		:visible="createBlockDialogVisible"
		:types="types"
	/>
	<EditBlockDialog
		v-if="editBlockDialogVisible"
		:visible="editBlockDialogVisible"
		:types="types"
	/>
	<DeleteBlockDialog
		v-if="deleteBlockDialogVisible"
		:visible="deleteBlockDialogVisible"
	/>
</template>
