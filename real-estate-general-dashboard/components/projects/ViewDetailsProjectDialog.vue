<script setup>
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
						disabled
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
						disabled
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
					<label for="openAt">Open at</label>
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
					<label for="startedDay">Started day</label>
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
						disabled
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
						disabled
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
				label="Close"
				@click="myVisible = false"
			/>
		</template>
	</Dialog>
</template>
