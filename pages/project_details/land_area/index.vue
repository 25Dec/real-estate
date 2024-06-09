<script setup>
	import { ref } from 'vue';
	import { FilterMatchMode } from 'primevue/api';

	const router = useRouter();
	const { zones } = storeToRefs(useZonesStore());
	const { getZones } = useZonesStore();
	const { landAreas } = storeToRefs(useLandAreasStore());
	const { getLandAreas, setCurrentLandArea } = useLandAreasStore();

	await getZones();
	await getLandAreas();

	zones.value = zones.value.map((zone) => {
		return { id: zone.id, name: `${zone.name}`, value: `${zone.id}` };
	});
	const myZones = ref(zones.value);
	const currentZone = ref({
		name: myZones.value[0]?.name ?? '',
		value: myZones.value[0]?.value ?? '',
	});

	const myLandAreasBaseOnZoneID = computed(() => {
		return landAreas.value.filter((landArea) => {
			return landArea['zone_id'] == currentZone.value.value;
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
				router.push('land_area/payment');
			},
		},
	]);
	const viewDetailsLandAreaDialogVisible = ref(false);
	const createLandAreaDialogVisible = ref(false);
	const editLandAreaDialogVisible = ref(false);
	const deleteLandAreaDialogVisible = ref(false);

	const handleDropdown = (event) => {
		myLandAreasBaseOnZoneID.value = landAreas.value.filter((landAreas) => {
			return landAreas['zone_id'] == event.value;
		});
	};
	const toggleMenu = (event, data) => {
		setCurrentLandArea(data);
		menu.value.toggle(event);
	};
	const toggleViewDetailsLandArea = (data) => {
		setCurrentLandArea(data);
		viewDetailsLandAreaDialogVisible.value =
			!viewDetailsLandAreaDialogVisible.value;
	};
	const toggleEditLandArea = (data) => {
		setCurrentLandArea(data);
		editLandAreaDialogVisible.value = !editLandAreaDialogVisible.value;
	};
	const toggleDeleteLandArea = async (data) => {
		setCurrentLandArea(data);
		deleteLandAreaDialogVisible.value = !deleteLandAreaDialogVisible.value;
	};
</script>

<template>
	<div class="w-full h-full flex flex-col">
		<div
			class="fixed right-0 top-0 z-50 backdrop-blur-xl w-5/6 h-[8%] px-4 border-b flex justify-between items-center"
		>
			<div class="flex items-center gap-2">
				<span class="font-semibold text-lg">Land Area</span>
				<Tag :value="myLandAreasBaseOnZoneID.length"></Tag>
			</div>

			<div class="flex items-center gap-2">
				<IconField iconPosition="left">
					<InputIcon class="flex items-center">
						<Icon name="mdi:filter-outline" />
					</InputIcon>
					<InputText
						v-model="filters['global'].value"
						placeholder="Filter land area..."
					/>
				</IconField>
				<Button
					size="small"
					label="New"
					@click="createLandAreaDialogVisible = !createLandAreaDialogVisible"
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
				:value="myLandAreasBaseOnZoneID"
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
						<span>No land area found.</span>
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
							@click="toggleViewDetailsLandArea(data)"
						>
							<Icon name="mdi:eye-outline" />
						</Button>
						<Button
							text
							severity="secondary"
							@click="toggleEditLandArea(data)"
						>
							<Icon name="mdi:edit-outline" />
						</Button>
						<Button
							text
							severity="danger"
							@click="toggleDeleteLandArea(data)"
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
	<ViewDetailsLandAreaDialog
		v-if="viewDetailsLandAreaDialogVisible"
		:visible="viewDetailsLandAreaDialogVisible"
		:statuses="statuses"
	/>
	<CreateLandAreaDialog
		v-if="createLandAreaDialogVisible"
		:visible="createLandAreaDialogVisible"
		:statuses="statuses"
	/>
	<EditLandAreaDialog
		v-if="editLandAreaDialogVisible"
		:visible="editLandAreaDialogVisible"
		:statuses="statuses"
	/>
	<DeleteLandAreaDialog
		v-if="deleteLandAreaDialogVisible"
		:visible="deleteLandAreaDialogVisible"
	/>
</template>
