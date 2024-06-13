<script setup>
	import { ref } from 'vue';
	import { FilterMatchMode } from 'primevue/api';

	const { projectSeller, currentProjectSeller } = storeToRefs(
		useProjectSellerStore()
	);
	const { getProjectSeller } = useProjectSellerStore();
	const { users } = storeToRefs(useUsersStore());
	const { getUsers } = useUsersStore();
	const { projects, projectsDropdown } = storeToRefs(useProjectsStore());
	const { getProjects } = useProjectsStore();

	await getUsers();
	await getProjects();
	await getProjectSeller();

	const currentProject = ref({
		name: projectsDropdown.value[0]?.name ?? '',
		value: projectsDropdown.value[0]?.value ?? '',
	});

	projectSeller.value = projectSeller.value.map((sl) => {
		const {
			name: pjName,
			address: pjAddress,
			phone: pjPhone,
			email: pjEmail,
			open_at: pjOpenAt,
			activated: pjActivated,
			project_progress: pjProgress,
			desc: pjDesc,
			started_day: pjStartedDay,
			budget: pjBudget,
			status: pjStatus,
			type: pjType,
		} = projects.value.filter((pj) => pj['id'] == sl['project_id'])[0];

		const {
			phone: slPhone,
			first_name: slFirstName,
			last_name: slLastName,
			email: slEmail,
		} = users.value.filter((usr) => usr['id'] == sl['account_id'])[0];

		return {
			...sl,
			pjName,
			pjAddress,
			pjPhone,
			pjEmail,
			pjOpenAt,
			pjActivated,
			pjProgress,
			pjDesc,
			pjStartedDay,
			pjBudget,
			pjStatus,
			pjType,
			slPhone,
			slFirstName,
			slLastName,
			slEmail,
		};
	});
	const myProjectSellerBaseOnProjectID = computed(() => {
		return projectSeller.value.filter((pjSeller) => {
			return pjSeller['project_id'] == currentProject.value.value;
		});
	});

	const statuses = ref([{ name: 'Working', value: 'working' }]);
	const types = ref([
		{ name: 'High', value: 'high' },
		{ name: 'Land', value: 'land' },
		{ name: 'Hybrid', value: 'hybrid' },
	]);
	const filters = ref({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	});
	const viewDetailsProjectSellerDialogVisible = ref(false);
	const coordinateProjectSellerDialogVisible = ref(false);
	const editProjectSellerDialogVisible = ref(false);
	const deleteProjectSellerDialogVisible = ref(false);

	const handleDropdown = (event) => {
		myProjectSellerBaseOnProjectID.value = projectSeller.value.filter(
			(pjSeller) => {
				return pjSeller['project_id'] == event.value;
			}
		);
	};
	const toggleViewProjectSellerDetails = async (data) => {
		currentProjectSeller.value = data;
		viewDetailsProjectSellerDialogVisible.value =
			!viewDetailsProjectSellerDialogVisible.value;
	};
	const toggleEditProjectSeller = async (data) => {
		currentProjectSeller.value = data;
		editProjectSellerDialogVisible.value =
			!editProjectSellerDialogVisible.value;
	};
	const toggleDeleteProjectSeller = async (data) => {
		currentProjectSeller.value = data;
		deleteProjectSellerDialogVisible.value =
			!deleteProjectSellerDialogVisible.value;
	};
</script>

<template>
	<div class="w-full h-full flex flex-col">
		<div
			class="fixed right-0 top-0 z-50 backdrop-blur-xl w-5/6 h-[8%] px-4 border-b flex justify-between items-center"
		>
			<div class="flex items-center gap-2">
				<span class="font-semibold text-lg">Sellers</span>
				<Tag :value="myProjectSellerBaseOnProjectID.length"></Tag>
			</div>

			<div class="flex items-center gap-2">
				<IconField iconPosition="left">
					<InputIcon class="flex items-center">
						<Icon name="mdi:filter-outline" />
					</InputIcon>
					<InputText
						v-model="filters['global'].value"
						placeholder="Filter Project or Seller..."
					/>
				</IconField>
				<Button
					size="small"
					label="Coordinate"
					@click="
						coordinateProjectSellerDialogVisible =
							!coordinateProjectSellerDialogVisible
					"
				/>
			</div>
		</div>

		<div
			class="fixed right-0 top-[8%] z-50 backdrop-blur-xl w-5/6 h-[8%] px-4 border-b flex justify-between items-center"
		>
			<div class="flex items-center gap-2">
				<label
					for="currentProject"
					class="font-semibold text-lg"
					>Current Project:
				</label>
				<Dropdown
					id="currentProject"
					placeholder="Select Project"
					v-model="currentProject.value"
					:options="projectsDropdown"
					optionLabel="name"
					optionValue="value"
					@change="(event) => handleDropdown(event)"
				/>
			</div>
		</div>

		<div class="absolute top-[16%] w-full h-[92%]">
			<DataTable
				:value="myProjectSellerBaseOnProjectID"
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
						<span>No Project or Seller Found.</span>
					</div>
				</template>

				<Column
					field="slName"
					header="Seller"
				>
					<template #body="{ data }">
						<div class="flex items-center gap-3">
							<Avatar
								:label="data['slFirstName']?.substring(0, 3)"
								shape="square"
							/>
							<div class="flex flex-col">
								<span class="font-semibold">{{
									`${data['slFirstName']} ${data['slLastName']}`
								}}</span>
								<span>{{ data['slEmail'] }}</span>
							</div>
						</div>
					</template>
				</Column>

				<Column
					field="pjName"
					header="Project"
				>
					<template #body="{ data }">
						<div class="flex flex-col">
							<span class="font-semibold">{{ data['pjName'] }}</span>
							<span>{{ hideLongText(data['pjAddress']) }}</span>
						</div>
					</template>
				</Column>

				<Column header="Actions">
					<template #body="{ data }">
						<Button
							text
							severity="secondary"
							@click="toggleViewProjectSellerDetails(data)"
						>
							<Icon name="mdi:eye-outline" />
						</Button>
						<Button
							text
							severity="secondary"
							@click="toggleEditProjectSeller(data)"
						>
							<Icon name="mdi:edit-outline" />
						</Button>
						<Button
							text
							severity="danger"
							@click="toggleDeleteProjectSeller(data)"
						>
							<Icon name="mdi:delete-outline" />
						</Button>
					</template>
				</Column>
			</DataTable>
		</div>
	</div>
	<ViewDetailsProjectSellerDialog
		v-if="viewDetailsProjectSellerDialogVisible"
		:visible="viewDetailsProjectSellerDialogVisible"
		:statuses="statuses"
		:types="types"
	/>
	<CoordinateProjectSellerDialog
		v-if="coordinateProjectSellerDialogVisible"
		:visible="coordinateProjectSellerDialogVisible"
	/>
	<EditProjectSellerDialog
		v-if="editProjectSellerDialogVisible"
		:visible="editProjectSellerDialogVisible"
	/>
	<DeleteProjectSellerDialog
		v-if="deleteProjectSellerDialogVisible"
		:visible="deleteProjectSellerDialogVisible"
	/>
</template>
