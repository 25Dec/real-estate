<script setup>
	import { FilterMatchMode } from 'primevue/api';

	const { zones } = storeToRefs(useZonesStore());
	const { getZones, setCurrentZoneID } = useZonesStore();
	const { blocks } = storeToRefs(useBlocksStore());
	const { getBlocks } = useBlocksStore();
	const { floors } = storeToRefs(useFloorsStore());
	const { getFloors } = useFloorsStore();
	const { highAreas, currentHighArea } = storeToRefs(useHighAreasStore());
	const { getHighAreas, setCurrentHighArea, editHighArea } =
		useHighAreasStore();
	const router = useRouter();
	const toast = useToast();

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

	const myHighAreasBaseOnZoneAndBlockAndFloorID = computed(() => {
		return highAreas.value.filter((highArea) => {
			return highArea['floor_id'] == currentFloor.value.value;
		});
	});
	const statuses = ref([
		{ name: 'Not Booked', value: 'not booked' },
		{ name: 'Deal', value: 'deal' },
		{ name: 'Booked', value: 'booked' },
	]);
	const filters = ref({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	});
	const options = ref();
	const menuItems = ref([
		{
			label: 'Payment',
			command: () => {
				router.push('high_area/payment');
			},
		},
		{
			label: 'History Owner',
			command: () => {
				router.push('high_area/history_owner');
			},
		},
		{
			label: 'History Booking',
			command: () => {
				router.push('high_area/history_booking');
			},
		},
	]);
	const buyStatus = ref();
	const buyStatusItems = ref([
		{
			label: 'Not Booked',
			command: () => changeBuyStatus('not booked'),
		},
		{
			label: 'Deal',
			command: () => changeBuyStatus('deal'),
		},
		{
			label: 'Booked',
			command: () => changeBuyStatus('booked'),
		},
	]);

	const viewDetailsHighAreaDialogVisible = ref(false);
	const createHighAreaDialogVisible = ref(false);
	const editHighAreaDialogVisible = ref(false);
	const deleteHighAreaDialogVisible = ref(false);

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

	const toggleOptions = (event, data) => {
		setCurrentHighArea(data);
		options.value.toggle(event);
	};
	const toggleChangeBuyStatus = (event, data) => {
		setCurrentHighArea(data);
		buyStatus.value.toggle(event);
	};
	const changeBuyStatus = async (buyStatus) => {
		const response = await editHighArea({
			...currentHighArea.value,
			buy_status: buyStatus,
		});

		if (response != null && response['result'] == 'ok') {
			toast.add({
				severity: 'success',
				summary: 'Success',
				detail: 'Change Buy Status Successfully!',
				group: 'bl',
				life: 3000,
			});
		} else {
			toast.add({
				severity: 'danger',
				summary: 'Error',
				detail: 'Failed to Change Buy Status',
				group: 'bl',
				life: 3000,
			});
		}
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

				<Column
					field="buy_status"
					header="Buy Status"
				>
					<template #body="{ data }">
						<Tag
							:severity="
								data['buy_status'] == 'booked'
									? 'danger'
									: data['buy_status'] == 'not booked'
									? 'success'
									: 'warning'
							"
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
							severity="secondary"
							@click="(event) => toggleChangeBuyStatus(event, data)"
						>
							<Icon name="tabler:status-change" />
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
							@click="(event) => toggleOptions(event, data)"
						>
							<Icon name="mdi:more-vert" />
						</Button>
						<Menu
							ref="options"
							:model="menuItems"
							:popup="true"
						/>
						<Menu
							ref="buyStatus"
							:model="buyStatusItems"
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
