<script setup>
	const { visible } = defineProps(['visible']);

	const { currentCustomer } = storeToRefs(useCustomersStore());
	const { projectsDropdown } = storeToRefs(useProjectsStore());
	const { getProjects } = useProjectsStore();

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
						disabled
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="lastName">Last Name</label>
					<InputText
						id="lastName"
						placeholder="Last Name"
						v-model.trim="lastName"
						disabled
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
						disabled
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="email">Email</label>
					<InputText
						id="email"
						placeholder="example@gmail.com"
						v-model.trim="email"
						disabled
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
					disabled
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
						disabled
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
						disabled
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
				label="Close"
				@click="myVisible = false"
			/>
		</template>
	</Dialog>
</template>
