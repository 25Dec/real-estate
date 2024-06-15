<script setup>
	const { visible } = defineProps(['visible']);

	const { addNewCustomer } = useCustomersStore();
	const { projectsDropdown } = storeToRefs(useProjectsStore());
	const { getProjects } = useProjectsStore();
	const toast = useToast();

	await getProjects();

	const myVisible = ref(visible);
	const socialID = ref('');
	const phone = ref('');
	const firstName = ref('');
	const lastName = ref('');
	const email = ref('');
	const projectID = ref({});

	const onSave = async () => {
		const newCustomerData = {
			id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1,
			social_id: socialID.value,
			phone: phone.value,
			first_name: firstName.value,
			last_name: lastName.value,
			display_name: `${firstName.value} ${lastName.value}`,
			email: email.value,
			project_id: parseInt(projectID.value.value),
			activated: 'true',
			deleted: 'false',
			created_by: 1,
			updated_by: 1,
			created_at: new Date().toLocaleString(),
			updated_at: null,
		};

		const response = await addNewCustomer(newCustomerData);
		myVisible.value = false;

		if (response != null && response['result'] == 'ok') {
			toast.add({
				severity: 'success',
				summary: 'Success',
				detail: 'Create New Customer Successfully!',
				group: 'bl',
				life: 3000,
			});
		} else {
			toast.add({
				severity: 'danger',
				summary: 'Error',
				detail: 'Failed to Create New Customer',
				group: 'bl',
				life: 3000,
			});
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
				<span class="font-bold text-xl">Create New Customer</span>
			</div>
		</template>
		<template class="flex flex-col gap-3">
			<div class="flex flex-row gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="firstName">First Name</label>
					<InputText
						id="firstName"
						placeholder="First Name"
						v-model.trim="firstName"
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="lastName">Last Name</label>
					<InputText
						id="lastName"
						placeholder="Last Name"
						v-model.trim="lastName"
					/>
				</div>
			</div>

			<div class="flex flex-row gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="phone">Phone Number</label>
					<InputText
						id="phone"
						placeholder="+84 9698 886 660"
						v-model.trim="phone"
						integeronly
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="email">Email</label>
					<InputText
						id="email"
						placeholder="example@gmail.com"
						v-model.trim="email"
					/>
				</div>
			</div>

			<div class="flex flex-1 flex-col gap-2">
				<label for="projectID">Project</label>
				<Dropdown
					id="projectID"
					placeholder="Select Project"
					v-model="projectID.value"
					:options="projectsDropdown"
					optionLabel="name"
					optionValue="value"
				/>
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
