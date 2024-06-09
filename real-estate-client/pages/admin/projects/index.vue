<script setup>
	import { ref } from 'vue';
	import { FilterMatchMode } from 'primevue/api';

	const { projects, currentProject } = storeToRefs(useProjectsStore());
	const { getProjects } = useProjectsStore();

	await getProjects();

	const user = ref({});

	if (process.client) {
		user.value = JSON.parse(localStorage.getItem('user'));
	}

	const userPermissionForActions =
		user.value['type'] != 'admin' ||
		user.value['type'] != 'super_admin' ||
		user.value['type'] != 'sale_manager'
			? true
			: false;

	const statuses = ref([{ name: 'Working', value: 'working' }]);
	const types = ref([
		{ name: 'High', value: 'high' },
		{ name: 'Land', value: 'land' },
		{ name: 'Hybrid', value: 'hybrid' },
	]);
	const filters = ref({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	});

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
					v-if="userPermissionForActions"
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
						<span>No Project Found.</span>
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
					field="address"
					header="Address"
				>
					<template #body="{ data }">
						{{ hideLongText(data['address']) }}
					</template>
				</Column>

				<Column
					field="type"
					header="Type"
				>
					<template #body="{ data }">
						{{ capitalize(data['type']) }}
					</template>
				</Column>

				<Column
					field="progress"
					header="Progress"
					sortable
				>
					<template #body="{ data }">
						<Knob
							v-model="data['project_progress']"
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
							v-if="userPermissionForActions"
							text
							severity="secondary"
							@click="toggleEditProject(data)"
						>
							<Icon name="mdi:edit-outline" />
						</Button>
						<Button
							v-if="userPermissionForActions"
							text
							severity="danger"
							@click="toggleDeleteProject(data)"
						>
							<Icon name="mdi:delete-outline" />
						</Button>
					</template>
				</Column>
			</DataTable>
		</div>
	</div>
	<ViewDetailsProjectDialog
		v-if="viewDetailsProjectDialogVisible"
		:visible="viewDetailsProjectDialogVisible"
		:statuses="statuses"
		:types="types"
	/>
	<CreateProjectDialog
		v-if="createProjectDialogVisible"
		:visible="createProjectDialogVisible"
		:statuses="statuses"
		:types="types"
	/>
	<EditProjectDialog
		v-if="editProjectDialogVisible"
		:visible="editProjectDialogVisible"
		:statuses="statuses"
		:types="types"
	/>
	<DeleteProjectDialog
		v-if="deleteProjectDialogVisible"
		:visible="deleteProjectDialogVisible"
	/>
</template>
