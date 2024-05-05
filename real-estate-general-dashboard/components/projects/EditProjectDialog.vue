<script setup>
	import { accessToken, baseUrl } from '~/constants';

	const { visible, data } = defineProps(['visible', 'data']);
	const myVisible = ref(visible);

	const projectName = ref(data['name']);
	const address = ref(data['address']);
	const phone = ref(data['phone']);
	const email = ref(data['email']);
	const openAt = ref();
	const startedDay = ref();
	const budget = ref(data['budget']);
	const projectProgress = ref(data['project_progress']);

	const onSave = async () => {
		const newProjectData = {
			id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1,
			name: projectName.value,
			address: address.value,
			phone: phone.value,
			email: email.value,
			open_at: openAt.value,
			activated: 'true',
			project_progress: projectProgress.value,
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

		await $fetch(baseUrl + `/auth/project/${data['id']}`, {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken,
			},
			body: newProjectData,
		});

		myVisible.value = false;
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
				<span class="font-bold text-xl">Project Details</span>
			</div>
		</template>
		<template class="flex flex-col gap-3">
			<div class="flex">
				<div class="flex flex-1 flex-col gap-2">
					<label for="projectName">Project name</label>
					<InputText
						id="projectName"
						placeholder="Project name"
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
					<label for="phone">Phone number</label>
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
					<label for="openAt">Open at</label>
					<Calendar
						id="openAt"
						v-model="openAt"
						showIcon
						iconDisplay="input"
						showButtonBar
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="startedDay">Started day</label>
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

			<div class="flex">
				<div class="flex flex-1 flex-col gap-2">
					<label for="progress">Progress</label>
					<InputNumber
						id="progress"
						v-model="projectProgress"
						inputId="percent"
						prefix="%"
					/>
				</div>
			</div>

			<div class="flex flex-row gap-3 justify-between">
				<span class="text-xs text-gray-400">
					Created at: {{ convertDateTime(data['created_at']) }}
				</span>
				<span class="text-xs text-gray-400">
					Updated at: {{ convertDateTime(data['updated_at']) }}
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
