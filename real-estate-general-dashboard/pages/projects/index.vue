<script setup>
	import { ref } from 'vue';
	import { FilterMatchMode } from 'primevue/api';
	import { baseUrl, accessToken } from '../../constants/index';

	const { data } = await useFetch(baseUrl + '/auth/project', {
		headers: {
			'Content-Type': 'application/json',
			access_token: accessToken,
		},
	});

	const projects = ref(data.value.data.data);
	const project = ref({});
	const filters = ref({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	});
	const viewDetailsProjectDialogVisible = ref(false);
	const createProjectDialogVisible = ref(false);
	const editProjectDialogVisible = ref(false);
	const deleteProjectDialogVisible = ref(false);

	const viewDetailsProject = (data) => {
		project.value = data;
		viewDetailsProjectDialogVisible.value =
			!viewDetailsProjectDialogVisible.value;
	};

	const editProject = async (data) => {
		project.value = data;
		editProjectDialogVisible.value = !editProjectDialogVisible.value;
	};

	const deleteProject = async (data) => {
		await $fetch(baseUrl + `/auth/project/${data['id']}`, {
			method: 'delete',
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken,
			},
		});
		project.value = data;
		deleteProjectDialogVisible.value = !deleteProjectDialogVisible.value;
	};
</script>

<template>
	<div class="w-full h-full flex flex-col">
		<div
			class="fixed right-0 top-0 z-50 backdrop-blur-xl w-5/6 h-[8%] px-4 border-b flex justify-between items-center"
		>
			<div class="flex items-center gap-2">
				<span class="font-semibold text-lg">Projects</span>
				<Tag :value="projects.length"></Tag>
			</div>

			<div class="flex items-center gap-2">
				<IconField iconPosition="left">
					<InputIcon class="flex items-center">
						<Icon name="mdi:filter-outline" />
					</InputIcon>
					<InputText
						v-model="filters['global'].value"
						placeholder="Filter projects..."
					/>
				</IconField>
				<Button
					size="small"
					label="New Project"
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
				sortField="id"
				:sortOrder="-1"
			>
				<template #empty>
					<div class="flex justify-center items-center">
						<span>No projects found.</span>
					</div>
				</template>

				<Column
					field="id"
					header="ID"
					sortable
					class="backdrop-blur-lg"
				>
					<template #body="{ data }">
						{{ data['id'] }}
					</template>
				</Column>

				<Column
					field="name"
					header="Name"
					sortable
					class="backdrop-blur-lg"
				>
					<template #body="{ data }">
						<div class="flex items-center gap-3">
							<span class="font-semibold">{{ data['name'] }}</span>
						</div>
					</template>
				</Column>

				<Column
					field="activated"
					header="Activated"
					sortable
					class="backdrop-blur-lg"
				>
					<template #body="{ data }">
						{{ data['activated'] }}
					</template>
				</Column>

				<Column
					field="project_progress"
					header="Progress"
					sortable
					class="backdrop-blur-lg"
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
							@click="viewDetailsProject(data)"
						>
							<Icon name="mdi:eye-outline" />
						</Button>
						<Button
							text
							severity="secondary"
							@click="editProject(data)"
						>
							<Icon name="mdi:edit-outline" />
						</Button>
						<Button
							text
							severity="danger"
							@click="deleteProject(data)"
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
		:data="project"
	/>
	<CreateProjectDialog
		v-if="createProjectDialogVisible"
		:visible="createProjectDialogVisible"
	/>
	<EditProjectDialog
		v-if="editProjectDialogVisible"
		:visible="editProjectDialogVisible"
		:data="project"
	/>
	<DeleteProjectDialog
		v-if="deleteProjectDialogVisible"
		:visible="deleteProjectDialogVisible"
		:data="project"
	/>
</template>
