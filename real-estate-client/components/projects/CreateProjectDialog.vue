<script setup>
	const { visible, roles } = defineProps(['visible', 'roles']);

	const { addNewProject } = useProjectsStore();
	const toast = useToast();

	const myVisible = ref(visible);
	const projectName = ref('');
	const address = ref('');
	const phone = ref('');
	const email = ref('');
	const openAt = ref();
	const startedDay = ref();
	const budget = ref(0);

	const onSave = async () => {
		const newProjectData = {
			id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1,
			name: projectName.value,
			address: address.value,
			phone: phone.value,
			email: email.value,
			open_at: openAt.value,
			activated: 'true',
			project_progress: 0,
			desc: null,
			deleted: 'false',
			started_day: startedDay.value,
			created_by: 13,
			updated_by: 13,
			created_at: new Date().toLocaleString(),
			updated_at: null,
			budget: budget.value,
			status: 'working',
		};

		const response = await addNewProject(newProjectData);
		myVisible.value = false;

		if (response != null && response['result'] == 'ok') {
			toast.add({
				severity: 'success',
				summary: 'Success',
				detail: 'Create New Project Successfully!',
				group: 'bl',
				life: 3000,
			});
		} else {
			toast.add({
				severity: 'warning',
				summary: 'Error',
				detail: 'Failed to Create New Project!',
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
		header="Header"
		:style="{ width: '50rem' }"
		:breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
	>
		<template #header>
			<div class="inline-flex items-center justify-center gap-2">
				<span class="font-bold text-xl">Create New Project</span>
			</div>
		</template>
		<template class="flex flex-col gap-3">
			<div class="flex">
				<div class="flex flex-1 flex-col gap-2">
					<label for="projectName">Project Name</label>
					<InputText
						id="projectName"
						placeholder="Project Name"
						v-model="projectName"
						required
					/>
				</div>
			</div>

			<div class="flex">
				<div class="flex flex-1 flex-col gap-2">
					<label for="address">Address</label>
					<InputText
						id="address"
						placeholder="Address"
						v-model="address"
						required
					/>
				</div>
			</div>

			<div class="flex flex-row gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="phone">Phone Number</label>
					<InputText
						id="phone"
						placeholder="+84 9698 886 660"
						v-model="phone"
						required
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="email">Email</label>
					<InputText
						id="email"
						placeholder="example@gmail.com"
						v-model="email"
						required
					/>
				</div>
			</div>

			<div class="flex flex-row gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="openAt">Open At</label>
					<Calendar
						id="openAt"
						v-model="openAt"
						showIcon
						iconDisplay="input"
						showButtonBar
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="startedDay">Started Day</label>
					<Calendar
						id="startedDay"
						v-model="startedDay"
						showIcon
						iconDisplay="input"
						showButtonBar
					/>
				</div>
			</div>

			<div class="flex">
				<div class="flex flex-1 flex-col gap-2">
					<label for="budget">Budget</label>
					<InputNumber
						id="budget"
						v-model="budget"
						inputId="currency-us"
						mode="currency"
						currency="USD"
						locale="en-US"
					/>
				</div>
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
