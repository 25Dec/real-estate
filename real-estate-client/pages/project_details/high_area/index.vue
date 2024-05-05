<script setup>
	import { ref } from 'vue';
	import { FilterMatchMode } from 'primevue/api';

	const accessToken = useCookie('token');
	const { currentProjectIDFromLocalStore } = storeToRefs(useProjectsStore());

	let zones = await useZonesFetching(accessToken.value);
	let blocks = await useBlocksFetching(accessToken.value);
	let floors = await useFloorsFetching(accessToken.value);

	zones = ref(
		zones
			.filter((zone) => {
				return zone['project_id'] == currentProjectIDFromLocalStore.value;
			})
			.map((zone) => {
				return { id: zone.id, name: `${zone.name}`, value: `${zone.id}` };
			})
	);
	const currentZone = ref({
		name: zones.value[0]?.name ?? '',
		value: zones.value[0]?.value ?? '',
	});

	const currentBlock = computed(() => {
		return {};
	});
	floors = ref(
		floors.filter((floor) => {
			return floor['zone_id'] == 3;
		})
	);
	const currentFloor = computed(() => {
		return {};
	});
	const highAreas = ref([]);
	const highArea = ref({});
	const filters = ref({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	});
	const viewDetailsHighAreaDialogVisible = ref(false);
	const createHighAreaDialogVisible = ref(false);
	const editHighAreaDialogVisible = ref(false);
	const deleteHighAreaDialogVisible = ref(false);

	const viewDetailsHighArea = (data) => {
		highArea.value = data;
		viewDetailsHighAreaDialogVisible.value =
			!viewDetailsHighAreaDialogVisible.value;
	};

	const editHighArea = (data) => {
		highArea.value = data;
		editHighAreaDialogVisible.value = !editHighAreaDialogVisible.value;
	};

	const deleteHighArea = async (data) => {
		highArea.value = data;
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
				<Tag :value="highAreas.length"></Tag>
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
					label="New Floor"
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
				/>
			</div>

			<div class="flex items-center gap-2">
				<label
					for="currentBlock"
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
					:options="floors"
					optionLabel="name"
					optionValue="value"
				/>
			</div>
		</div>

		<div class="absolute top-[16%] w-full h-[92%]">
			<DataTable
				:value="floors"
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
							@click="viewDetailsFloor(data)"
						>
							<Icon name="mdi:eye-outline" />
						</Button>
						<Button
							text
							severity="secondary"
							@click="editFloor(data)"
						>
							<Icon name="mdi:edit-outline" />
						</Button>
						<Button
							text
							severity="danger"
							@click="deleteFloor(data)"
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
		:data="highArea"
	/>
	<CreateHighAreaDialog
		v-if="createHighAreaDialogVisible"
		:visible="createHighAreaDialogVisible"
		:allProjectIDs="allProjectIDs"
	/>
	<EditHighAreaDialog
		v-if="editHighAreaDialogVisible"
		:visible="editHighAreaDialogVisible"
		:allProjectIDs="allProjectIDs"
		:data="highArea"
	/>
	<DeleteHighAreaDialog
		v-if="deleteHighAreaDialogVisible"
		:visible="deleteHighAreaDialogVisible"
		:data="highArea"
	/>
</template>
