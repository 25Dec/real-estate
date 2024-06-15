<script setup>
	const { visible } = defineProps(['visible']);

	const { users: sellers } = storeToRefs(useUsersStore());
	const { getUsers } = useUsersStore();
	const { projectsDropdown } = storeToRefs(useProjectsStore());
	const { getProjects } = useProjectsStore();
	const { currentProjectSeller } = storeToRefs(useProjectSellerStore());
	const { editProjectSeller } = useProjectSellerStore();
	const toast = useToast();

	await getUsers();
	await getProjects();

	sellers.value = sellers.value
		.filter(
			(seller) => seller['type'] == 'sale' || seller['type'] == 'sale_manager'
		)
		.map((seller) => {
			return {
				name: `${seller['first_name']} ${seller['last_name']}`,
				value: seller['id'],
			};
		});

	const myVisible = ref(visible);
	const projectID = ref({
		name: projectsDropdown.value.filter(
			(pj) => pj['value'] == currentProjectSeller.value['project_id']
		)?.[0]?.['name'],
		value: projectsDropdown.value.filter(
			(pj) => pj['value'] == currentProjectSeller.value['project_id']
		)?.[0]?.['value'],
	});
	const accountID = ref({
		name: sellers.value.filter(
			(seller) => seller['value'] == currentProjectSeller.value['account_id']
		)?.[0]?.['name'],
		value: sellers.value.filter(
			(seller) => seller['value'] == currentProjectSeller.value['account_id']
		)?.[0]?.['value'],
	});
	const createdAt = ref(currentProjectSeller.value['created_at']);
	const updatedAt = ref(currentProjectSeller.value['updated_at']);

	const onSave = async () => {
		const newProjectSeller = {
			...currentProjectSeller,
			project_id: parseInt(projectID.value.value),
			account_id: parseInt(accountID.value.value),
			updated_at: new Date().toLocaleString(),
		};

		const response = await editProjectSeller(newProjectSeller);
		myVisible.value = false;

		if (response != null && response['result'] == 'ok') {
			toast.add({
				severity: 'success',
				summary: 'Success',
				detail: 'Coordinate Seller into Project Successfully!',
				group: 'bl',
				life: 3000,
			});
		} else {
			toast.add({
				severity: 'danger',
				summary: 'Error',
				detail: 'Failed to Coordinate Seller into Project',
				group: 'bl',
				life: 3000,
			});
		}
	};

	const handleDropdown = (event, type) => {
		if (type == 'project') {
		}
	};
</script>

<template>
	<Dialog
		v-model:visible="myVisible"
		modal
		maximizable
		header="Header"
		:style="{ width: '50rem' }"
		:breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
	>
		<template #header>
			<div class="inline-flex items-center justify-center gap-2">
				<span class="font-bold text-xl">Project-Seller Details</span>
			</div>
		</template>

		<template class="flex flex-col gap-3">
			<div class="flex flex-row gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="accountID">Seller</label>
					<Dropdown
						id="accountID"
						v-model="accountID.value"
						placeholder="Select Seller"
						:options="sellers"
						optionLabel="name"
						optionValue="value"
						disabled
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="projectID">Project</label>
					<Dropdown
						id="type"
						v-model="projectID.value"
						placeholder="Select Project"
						:options="projectsDropdown"
						optionLabel="name"
						optionValue="value"
						@change="(event) => handleDropdown(event, 'project')"
					/>
				</div>
			</div>

			<div class="flex flex-row gap-3 justify-between">
				<span class="text-xs text-gray-400">
					Created at: {{ convertDateTime(createdAt) }}
				</span>
				<span class="text-xs text-gray-400">
					Updated at: {{ convertDateTime(updatedAt) }}
				</span>
			</div>
		</template>

		<template #footer>
			<Button
				type="button"
				label="Cancel"
				text
				severity="secondary"
				@click="myVisible = false"
			/>
			<Button
				type="submit"
				label="Save"
				@click="onSave"
			/>
		</template>
	</Dialog>
</template>
