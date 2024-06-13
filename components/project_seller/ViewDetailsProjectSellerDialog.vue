<script setup>
	const { visible, statuses, types } = defineProps([
		'visible',
		'statuses',
		'types',
	]);

	const { currentProjectSeller } = storeToRefs(useProjectSellerStore());
	const { projectsDropdown } = storeToRefs(useProjectsStore());
	const { getProjects } = useProjectsStore();

	await getProjects();

	const myVisible = ref(visible);
	const pjName = ref(currentProjectSeller.value['pjName']);
	const pjAddress = ref(currentProjectSeller.value['pjAddress']);
	const pjPhone = ref(currentProjectSeller.value['pjPhone']);
	const pjEmail = ref(currentProjectSeller.value['pjEmail']);
	const pjOpenAt = ref(getYearMonthDay(currentProjectSeller.value['pjOpenAt']));
	const pjActivated = ref(currentProjectSeller.value['pjActivated']);
	const pjProgress = ref(currentProjectSeller.value['pjProgress']);
	const pjDesc = ref(currentProjectSeller.value['pjDesc']);
	const pjStartedDay = ref(
		getYearMonthDay(currentProjectSeller.value['pjStartedDay'])
	);
	const pjBudget = ref(currentProjectSeller.value['pjBudget']);
	const pjStatus = ref(currentProjectSeller.value['pjStatus']);
	const pjType = ref(currentProjectSeller.value['pjType']);
	const slPhone = ref(currentProjectSeller.value['slPhone']);
	const slFirstName = ref(currentProjectSeller.value['slFirstName']);
	const slLastName = ref(currentProjectSeller.value['slLastName']);
	const slEmail = ref(currentProjectSeller.value['slEmail']);
	const projectID = ref({
		name: projectsDropdown.value.filter(
			(pj) => pj['value'] == currentProjectSeller.value['project_id']
		)?.[0]?.['name'],
		value: projectsDropdown.value.filter(
			(pj) => pj['value'] == currentProjectSeller.value['project_id']
		)?.[0]?.['value'],
	});
	const createdAt = ref(currentProjectSeller.value['created_at']);
	const updatedAt = ref(currentProjectSeller.value['updated_at']);
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
			<Panel
				toggleable
				collapsed
				class="flex flex-col gap-3"
			>
				<template #header>
					<span class="font-bold">Project</span>
				</template>

				<div class="flex flex-1 flex-col gap-2">
					<label for="pjName">Name</label>
					<InputText
						id="pjName"
						placeholder="Project Name"
						v-model="pjName"
						disabled
					/>
				</div>

				<div class="flex flex-1 flex-col gap-2">
					<label for="pjAddress">Address</label>
					<Textarea
						id="pjAddress"
						placeholder="Address"
						v-model="pjAddress"
						disabled
					/>
				</div>

				<div class="flex flex-row gap-3">
					<div class="flex flex-1 flex-col gap-2">
						<label for="pjPhone">Phone Number</label>
						<InputText
							id="pjPhone"
							placeholder="+84 9698 886 660"
							v-model="pjPhone"
							disabled
						/>
					</div>
					<div class="flex flex-1 flex-col gap-2">
						<label for="pjEmail">Email</label>
						<InputText
							id="pjEmail"
							placeholder="example@gmail.com"
							v-model="pjEmail"
							disabled
						/>
					</div>
				</div>

				<div class="flex flex-row gap-3">
					<div class="flex flex-1 flex-col gap-2">
						<label for="pjProgress">Progress</label>
						<InputNumber
							id="pjProgress"
							v-model="pjProgress"
							inputId="percent"
							prefix="%"
							disabled
						/>
					</div>
					<div class="flex flex-1 flex-col gap-2">
						<label for="pjBudget">Budget</label>
						<InputNumber
							id="pjBudget"
							v-model="pjBudget"
							inputId="currency-us"
							mode="currency"
							currency="USD"
							locale="en-US"
							disabled
						/>
					</div>
				</div>

				<div class="flex flex-row gap-3">
					<div class="flex flex-1 flex-col gap-2">
						<label for="status">Status</label>
						<Dropdown
							id="status"
							class="flex-1"
							v-model="pjStatus"
							placeholder="Select Status"
							:options="statuses"
							optionLabel="name"
							optionValue="value"
							disabled
						/>
					</div>
					<div class="flex flex-1 flex-col gap-2">
						<label for="pjType">Type</label>
						<Dropdown
							id="type"
							class="flex-1"
							v-model="pjType"
							placeholder="Select Type"
							:options="types"
							optionLabel="name"
							optionValue="value"
							disabled
						/>
					</div>
				</div>

				<div class="flex flex-row gap-3">
					<div class="flex flex-1 flex-col gap-2">
						<label for="pjOpenAt">Open At</label>
						<Calendar
							id="pjOpenAt"
							v-model="pjOpenAt"
							showIcon
							iconDisplay="input"
							showButtonBar
							disabled
						/>
					</div>
					<div class="flex flex-1 flex-col gap-2">
						<label for="pjStartedDay">Started Day</label>
						<Calendar
							id="pjStartedDay"
							v-model="pjStartedDay"
							showIcon
							iconDisplay="input"
							showButtonBar
							disabled
						/>
					</div>
				</div>

				<div class="flex flex-1 flex-col gap-2 items-end">
					<label for="pjActivated">Activated</label>
					<InputSwitch
						id="pjActivated"
						v-model="pjActivated"
						disabled
					/>
				</div>
			</Panel>

			<Panel
				toggleable
				collapsed
				class="flex flex-col gap-3"
			>
				<template #header>
					<span class="font-bold">Seller</span>
				</template>

				<div class="flex flex-row gap-3">
					<div class="flex flex-1 flex-col gap-2">
						<label for="slFirstName">First Name</label>
						<InputText
							id="slFirstName"
							placeholder="First Name"
							v-model.trim="slFirstName"
							disabled
						/>
					</div>
					<div class="flex flex-1 flex-col gap-2">
						<label for="slLastName">Last Name</label>
						<InputText
							id="slLastName"
							placeholder="Last Name"
							v-model.trim="slLastName"
							disabled
						/>
					</div>
				</div>

				<div class="flex flex-row gap-3">
					<div class="flex flex-1 flex-col gap-2">
						<label for="slPhone">Phone Number</label>
						<InputText
							id="slPhone"
							placeholder="+84 9698 886 660"
							v-model.trim="slPhone"
							integeronly
							disabled
						/>
					</div>
					<div class="flex flex-1 flex-col gap-2">
						<label for="slEmail">Email</label>
						<InputText
							id="slEmail"
							placeholder="example@gmail.com"
							v-model.trim="slEmail"
							disabled
						/>
					</div>
				</div>
			</Panel>

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
