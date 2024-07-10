<script setup>
	import { FilterMatchMode } from 'primevue/api';

	const { currentProjectFromLocalStore } = storeToRefs(useProjectsStore());
	const { highListOwners, currentHighListOwner } = storeToRefs(
		useHighListOwnerStore()
	);
	const { getHighListOwners } = useHighListOwnerStore();
	const { landListOwners, currentLandListOwner } = storeToRefs(
		useLandListOwnerStore()
	);
	const { getLandListOwners } = useLandListOwnerStore();

	const projectType = ref(currentProjectFromLocalStore.value['type']);

	if (projectType.value == 'high' || projectType.value == 'hybrid') {
		await getHighListOwners();
	}

	if (projectType.value == 'land' || projectType.value == 'hybrid') {
		await getLandListOwners();
	}

	const filters = ref({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	});
	const viewDetailsHighListOwnerDialogVisible = ref(false);
	const createHighListOwnerDialogVisible = ref(false);
	const editHighListOwnerDialogVisible = ref(false);
	const deleteHighListOwnerDialogVisible = ref(false);
	const viewDetailsLandListOwnerDialogVisible = ref(false);
	const createLandListOwnerDialogVisible = ref(false);
	const editLandListOwnerDialogVisible = ref(false);
	const deleteLandListOwnerDialogVisible = ref(false);

	const viewDetailsHighListOwner = (data) => {
		currentHighListOwner.value = data;
		viewDetailsHighListOwnerDialogVisible.value =
			!viewDetailsHighListOwnerDialogVisible.value;
	};
	const editHighListOwner = (data) => {
		currentHighListOwner.value = data;
		editHighListOwnerDialogVisible.value =
			!editHighListOwnerDialogVisible.value;
	};
	const deleteHighListOwner = async (data) => {
		currentHighListOwner.value = data;
		deleteHighListOwnerDialogVisible.value =
			!deleteHighListOwnerDialogVisible.value;
	};
	const viewDetailsLandListOwner = (data) => {
		currentLandListOwner.value = data;
		viewDetailsLandListOwnerDialogVisible.value =
			!viewDetailsLandListOwnerDialogVisible.value;
	};
	const editLandListOwner = (data) => {
		currentLandListOwner.value = data;
		editLandListOwnerDialogVisible.value =
			!editLandListOwnerDialogVisible.value;
	};
	const deleteLandListOwner = async (data) => {
		currentLandListOwner.value = data;
		deleteLandListOwnerDialogVisible.value =
			!deleteLandListOwnerDialogVisible.value;
	};
</script>

<template>
	<div class="w-full h-full flex flex-col">
		<div
			class="fixed right-0 top-0 z-50 backdrop-blur-xl w-5/6 h-[8%] px-4 border-b flex justify-between items-center"
		>
			<div class="flex items-center gap-2">
				<span class="font-semibold text-lg">List Owner</span>
				<Tag
					v-if="projectType == 'high'"
					:value="highListOwners.length"
				/>
				<Tag
					v-else
					:value="landListOwners.length"
				/>
			</div>

			<div class="flex items-center gap-2">
				<IconField iconPosition="left">
					<InputIcon class="flex items-center">
						<Icon name="mdi:filter-outline" />
					</InputIcon>
					<InputText
						v-model="filters['global'].value"
						placeholder="Filter owner..."
					/>
				</IconField>
				<Button
					v-if="projectType == 'high'"
					size="small"
					label="New"
					@click="
						createHighListOwnerDialogVisible = !createHighListOwnerDialogVisible
					"
				/>
				<Button
					v-else
					size="small"
					label="New"
					@click="
						createLandListOwnerDialogVisible = !createLandListOwnerDialogVisible
					"
				/>
			</div>
		</div>

		<div class="absolute top-[8%] w-full h-[92%]">
			<DataTable
				:value="projectType == 'high' ? highListOwners : landListOwners"
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

				<Column header="Actions">
					<template #body="{ data }">
						<div v-if="projectType == 'high'">
							<Button
								text
								severity="secondary"
								@click="viewDetailsHighListOwner(data)"
							>
								<Icon name="mdi:eye-outline" />
							</Button>
							<Button
								text
								severity="secondary"
								@click="editHighListOwner(data)"
							>
								<Icon name="mdi:edit-outline" />
							</Button>
							<Button
								text
								severity="danger"
								@click="deleteHighListOwner(data)"
							>
								<Icon name="mdi:delete-outline" />
							</Button>
						</div>
						<div v-else>
							<Button
								text
								severity="secondary"
								@click="viewDetailsLandListOwner(data)"
							>
								<Icon name="mdi:eye-outline" />
							</Button>
							<Button
								text
								severity="secondary"
								@click="editLandListOwner(data)"
							>
								<Icon name="mdi:edit-outline" />
							</Button>
							<Button
								text
								severity="danger"
								@click="deleteLandListOwner(data)"
							>
								<Icon name="mdi:delete-outline" />
							</Button>
						</div>
					</template>
				</Column>
			</DataTable>
		</div>
	</div>
	<ViewDetailsHighListOwnerDialog
		v-if="viewDetailsHighListOwnerDialogVisible"
		:visible="viewDetailsHighListOwnerDialogVisible"
	/>
	<CreateHighListOwnerDialog
		v-if="createHighListOwnerDialogVisible"
		:visible="createHighListOwnerDialogVisible"
	/>
	<EditHighListOwnerDialog
		v-if="editHighListOwnerDialogVisible"
		:visible="editHighListOwnerDialogVisible"
	/>
	<DeleteHighListOwnerDialog
		v-if="deleteHighListOwnerDialogVisible"
		:visible="deleteHighListOwnerDialogVisible"
	/>
	<ViewDetailsLandListOwnerDialog
		v-if="viewDetailsLandListOwnerDialogVisible"
		:visible="viewDetailsLandListOwnerDialogVisible"
	/>
	<CreateLandListOwnerDialog
		v-if="createLandListOwnerDialogVisible"
		:visible="createLandListOwnerDialogVisible"
	/>
	<EditLandListOwnerDialog
		v-if="editLandListOwnerDialogVisible"
		:visible="editLandListOwnerDialogVisible"
	/>
	<DeleteLandListOwnerDialog
		v-if="deleteLandListOwnerDialogVisible"
		:visible="deleteLandListOwnerDialogVisible"
	/>
</template>
