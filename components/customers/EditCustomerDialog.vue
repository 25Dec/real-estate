<script setup>
	const { visible } = defineProps(['visible']);

	const router = useRouter();
	const currentRoute = router['currentRoute'].value;

	const { currentCustomer } = storeToRefs(useCustomersStore());
	const { editCustomer } = useCustomersStore();
	const { projectsDropdown } = storeToRefs(useProjectsStore());
	const { getProjects } = useProjectsStore();
	const toast = useToast();

	await getProjects();

	const myVisible = ref(visible);
	const socialID = ref(currentCustomer.value['social_id']);
	const phone = ref(currentCustomer.value['phone']);
	const firstName = ref(currentCustomer.value['first_name']);
	const lastName = ref(currentCustomer.value['last_name']);
	const email = ref(currentCustomer.value['email']);
	const contacted = ref({
		name: capitalize(currentCustomer.value['contacted']),
		value: currentCustomer.value['contacted'],
	});
	const potential = ref({
		name: capitalize(currentCustomer.value['potential']),
		value: currentCustomer.value['potential'],
	});
	const projectID = ref({
		name: projectsDropdown.value.filter(
			(pj) => pj['value'] == currentCustomer.value['project_id']
		)?.[0]?.['name'],
		value: projectsDropdown.value.filter(
			(pj) => pj['value'] == currentCustomer.value['project_id']
		)?.[0]?.['value'],
	});
	const createdAt = ref(currentCustomer.value['created_at']);
	const updatedAt = ref(currentCustomer.value['updated_at']);

	const onSave = async () => {
		const newCustomerData = {
			...currentCustomer.value,
			social_id: socialID.value,
			phone: phone.value,
			first_name: firstName.value,
			last_name: lastName.value,
			display_name: `${firstName.value} ${lastName.value}`,
			email: email.value,
			project_id: projectID.value.value,
			updated_at: new Date().toLocaleString(),
		};

		const response = await editCustomer(newCustomerData);
		myVisible.value = false;

		if (response != null && response['result'] == 'ok') {
			toast.add({
				severity: 'success',
				summary: 'Success',
				detail: 'Edit Customer Successfully!',
				group: 'bl',
				life: 3000,
			});
		} else {
			toast.add({
				severity: 'warning',
				summary: 'Error',
				detail: 'Failed to Edit Customer',
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
				<span class="font-bold text-xl">Customer Details</span>
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
						:disabled="
							currentRoute['path'].includes('project_details') ? true : false
						"
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="lastName">Last Name</label>
					<InputText
						id="lastName"
						placeholder="Last Name"
						v-model.trim="lastName"
						:disabled="
							currentRoute['path'].includes('project_details') ? true : false
						"
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
						:disabled="
							currentRoute['path'].includes('project_details') ? true : false
						"
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="email">Email</label>
					<InputText
						id="email"
						placeholder="example@gmail.com"
						v-model.trim="email"
						:disabled="
							currentRoute['path'].includes('project_details') ? true : false
						"
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
					:disabled="
						currentRoute['path'].includes('project_details') ? true : false
					"
				/>
			</div>

			<div class="flex flex-row gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="contacted">Contacted</label>
					<Dropdown
						id="contacted"
						placeholder="True or False"
						v-model="contacted.value"
						:options="[
							{ name: 'True', value: 'true' },
							{ name: 'False', value: 'false' },
						]"
						optionLabel="name"
						optionValue="value"
						:disabled="currentRoute['path'].includes('admin') ? true : false"
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="Potential">Potential</label>
					<Dropdown
						id="Potential"
						placeholder="True or False"
						v-model="potential.value"
						:options="[
							{ name: 'True', value: 'true' },
							{ name: 'False', value: 'false' },
						]"
						optionLabel="name"
						optionValue="value"
						:disabled="currentRoute['path'].includes('admin') ? true : false"
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
