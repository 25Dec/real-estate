<script setup>
	import { ref } from 'vue';
	import { FilterMatchMode } from 'primevue/api';

	const { projects } = storeToRefs(useProjectsStore());
	const { getProjects } = useProjectsStore();

	await getProjects();

	const filters = ref({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	});
	const menu = ref();

	const viewDetailsProjectDialogVisible = ref(false);
	const createProjectDialogVisible = ref(false);
	const editProjectDialogVisible = ref(false);
	const deleteProjectDialogVisible = ref(false);

	const toggleViewProjectDetails = async (data) => {
		currentProject.value = data;
		viewDetailsProjectDialogVisible.value =
			!viewDetailsProjectDialogVisible.value;
	};
	const toggleEditProject = async (data) => {
		currentProject.value = data;
		editProjectDialogVisible.value = !editProjectDialogVisible.value;
	};
	const toggleDeleteProject = async (data) => {
		currentProject.value = data;
		deleteProjectDialogVisible.value = !deleteProjectDialogVisible.value;
	};
</script>

<template>
	<div class="w-full h-full flex flex-col">
		<div
			class="fixed right-0 top-0 z-50 backdrop-blur-xl w-5/6 h-[8%] px-4 border-b flex justify-between items-center"
		>
			<div class="flex items-center gap-2">
				<span class="font-semibold text-lg">Project</span>
				<Tag :value="projects.length"></Tag>
			</div>

			<div class="flex items-center gap-2">
				<IconField iconPosition="left">
					<InputIcon class="flex items-center">
						<Icon name="mdi:filter-outline" />
					</InputIcon>
					<InputText
						v-model="filters['global'].value"
						placeholder="Filter project..."
					/>
				</IconField>
				<Button
					size="small"
					label="New"
					@click="createProjectDialogVisible = !createProjectDialogVisible"
				/>
			</div>
		</div>

		<div class="absolute top-[8%] w-full h-[92%]">
			<DataTable
				:value="projects"
				v-model:filters="filters"
				:paginator="true"
				:rows="50"
				:rowsPerPageOptions="[5, 10, 20, 50]"
				scrollable
				scrollHeight="flex"
				removableSort
			>
				<template #empty>
					<div class="flex justify-center items-center">
						<span>No project found.</span>
					</div>
				</template>

				<Column
					field="name"
					header="Name"
				>
					<template #body="{ data }">
						{{ data['name'] }}
					</template>
				</Column>

				<Column
					field="desc"
					header="Description"
				>
					<template #body="{ data }">
						{{ data['desc'] }}
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
							@click="toggleViewProjectDetails(data)"
						>
							<Icon name="mdi:eye-outline" />
						</Button>
						<Button
							text
							severity="secondary"
							@click="toggleEditProject(data)"
						>
							<Icon name="mdi:edit-outline" />
						</Button>
						<Button
							text
							severity="danger"
							@click="toggleDeleteProject(data)"
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
	<ViewDetailsProjectDialog
		v-if="viewDetailsProjectDialogVisible"
		:visible="viewDetailsProjectDialogVisible"
	/>
	<CreateProjectDialog
		v-if="createProjectDialogVisible"
		:visible="createProjectDialogVisible"
		:allProjectIDs="allProjectIDs"
	/>
	<EditProjectDialog
		v-if="editProjectDialogVisible"
		:visible="editProjectDialogVisible"
	/>
	<DeleteProjectDialog
		v-if="deleteProjectDialogVisible"
		:visible="deleteProjectDialogVisible"
	/>
</template>
