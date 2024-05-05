<script setup>
	import { ref } from 'vue';
	import { FilterMatchMode } from 'primevue/api';
	import { baseUrl } from '../../constants/index';

	const accessToken = useCookie('token');
	const { currentProjectIDFromLocalStore } = storeToRefs(useProjectsStore());

	const zonesData = await useFetch(baseUrl + '/auth/zone', {
		headers: {
			'Content-Type': 'application/json',
			access_token: accessToken.value,
		},
	});

	const landAreasData = await useFetch(baseUrl + '/auth/landArea', {
		headers: {
			'Content-Type': 'application/json',
			access_token: accessToken.value,
		},
	});

	const zones = ref(
		zonesData.data.value.data.data
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
	console.log(currentZone.value);
	const landAreas = computed(() => {
		return landAreasData.data.value.data.data.filter((landArea) => {
			return landArea['zone_id'] == currentZone.value.value;
		});
	});
	const landArea = ref({});
	const filters = ref({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	});
	const viewDetailsLandAreaDialogVisible = ref(false);
	const createLandAreaDialogVisible = ref(false);
	const editLandAreaDialogVisible = ref(false);
	const deleteLandAreaDialogVisible = ref(false);

	const viewDetailsLandArea = (data) => {
		landArea.value = data;
		viewDetailsLandAreaDialogVisible.value =
			!viewDetailsLandAreaDialogVisible.value;
	};

	const editLandArea = (data) => {
		landArea.value = data;
		editLandAreaDialogVisible.value = !editLandAreaDialogVisible.value;
	};

	const deleteLandArea = async (data) => {
		landArea.value = data;
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
				<Tag :value="landAreas.length"></Tag>
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
					label="New Land Area"
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
					placeholder="Select zone"
					v-model="currentZone.value"
					:options="zones"
					optionLabel="name"
					optionValue="value"
				/>
			</div>
		</div>

		<div class="absolute top-[16%] w-full h-[92%]">
			<DataTable
				:value="landAreas"
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
						<span>No land area found.</span>
					</div>
				</template>

				<Column
					field="desc"
					header="Description"
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
						{{ data['buy_status'] }}
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
							@click="viewDetailsLandArea(data)"
						>
							<Icon name="mdi:eye-outline" />
						</Button>
						<Button
							text
							severity="secondary"
							@click="editLandArea(data)"
						>
							<Icon name="mdi:edit-outline" />
						</Button>
						<Button
							text
							severity="danger"
							@click="deleteLandArea(data)"
						>
							<Icon name="mdi:delete-outline" />
						</Button>
					</template>
				</Column>
			</DataTable>
		</div>
	</div>
	<CreateLandAreaDialog
		v-if="createLandAreaDialogVisible"
		:visible="createLandAreaDialogVisible"
		:allProjectIDs="allProjectIDs"
	/>
	<EditLandAreaDialog
		v-if="editLandAreaDialogVisible"
		:visible="editLandAreaDialogVisible"
		:allProjectIDs="allProjectIDs"
		:data="landArea"
	/>
	<DeleteLandAreaDialog
		v-if="deleteLandAreaDialogVisible"
		:visible="deleteLandAreaDialogVisible"
		:data="landArea"
	/>
</template>
