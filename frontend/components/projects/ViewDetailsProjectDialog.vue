<script setup>
	const { visible, statuses, types } = defineProps([
		'visible',
		'statuses',
		'types',
	]);

	const { currentProject } = storeToRefs(useProjectsStore());

	const myVisible = ref(visible);
	const projectName = ref(currentProject.value['name']);
	const address = ref(currentProject.value['address']);
	const phone = ref(currentProject.value['phone']);
	const email = ref(currentProject.value['email']);
	const openAt = ref(getYearMonthDay(currentProject.value['open_at']));
	const activated = ref(
		currentProject.value['activated'] == 'true' ? true : false
	);
	const projectProgress = ref(currentProject.value['project_progress']);
	const desc = ref(currentProject.value['desc']);
	const startedDay = ref(getYearMonthDay(currentProject.value['started_day']));
	const createdAt = ref(currentProject.value['created_at']);
	const updatedAt = ref(currentProject.value['updated_at']);
	const budget = ref(currentProject.value['budget']);
	const status = ref(currentProject.value['status']);
	const type = ref(currentProject.value['type']);
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
				<span class="font-bold text-xl">Project Details</span>
			</div>
		</template>

		<template class="flex flex-col gap-3">
			<div class="flex">
				<div class="flex flex-1 flex-col gap-2">
					<label for="projectName">Name</label>
					<InputText
						id="projectName"
						placeholder="Project Name"
						v-model="projectName"
						disabled
					/>
				</div>
			</div>

			<div class="flex flex-1 flex-col gap-2">
				<label for="address">Address</label>
				<Textarea
					id="address"
					placeholder="Address"
					v-model="address"
					disabled
				/>
			</div>

			<div class="flex flex-row gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="phone">Phone Number</label>
					<InputText
						id="phone"
						placeholder="+84 9698 886 660"
						v-model="phone"
						disabled
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="email">Email</label>
					<InputText
						id="email"
						placeholder="example@gmail.com"
						v-model="email"
						disabled
					/>
				</div>
			</div>

			<div class="flex flex-row gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="progress">Progress</label>
					<InputNumber
						id="progress"
						v-model="projectProgress"
						inputId="percent"
						prefix="%"
						disabled
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="budget">Budget</label>
					<InputNumber
						id="budget"
						v-model="budget"
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
						v-model="status"
						placeholder="Select Status"
						:options="statuses"
						optionLabel="name"
						optionValue="value"
						disabled
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="type">Type</label>
					<Dropdown
						id="type"
						class="flex-1"
						v-model="type"
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
					<label for="openAt">Open At</label>
					<Calendar
						id="openAt"
						v-model="openAt"
						showIcon
						iconDisplay="input"
						showButtonBar
						disabled
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
						disabled
					/>
				</div>
			</div>

			<div class="flex flex-1 flex-col gap-2 items-end">
				<label for="activated">Activated</label>
				<InputSwitch
					id="activated"
					v-model="activated"
					disabled
				/>
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
