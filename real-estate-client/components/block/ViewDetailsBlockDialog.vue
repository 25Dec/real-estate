<script setup>
	const { visible, data } = defineProps(['visible', 'data']);

	const myVisible = ref(visible);
	const id = ref(data['id']);
	const zoneID = ref(data['zone_id']);
	const numberOfFloor = ref(data['number_of_floor']);
	const lat = ref(data['lat']);
	const long = ref(data['long']);
	const isService = ref(data['is_service'] == 1 ? true : false);
	const desc = ref(data['desc']);
	const type = ref(data['type']);
	const progress = ref(data['progress']);
	const startedDay = ref(getYearMonthDay(data['started_day']));
	const createdAt = ref(data['created_at']);
	const updatedAt = ref(data['updated_at']);
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
				<span class="font-bold text-xl">Block Details</span>
			</div>
		</template>

		<template class="flex flex-col gap-3">
			<div class="flex flex-1 flex-col gap-2">
				<label for="desc">Name</label>
				<InputText
					id="desc"
					v-model="desc"
					disabled
				/>
			</div>

			<div class="flex gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="id">ID</label>
					<InputText
						id="id"
						v-model="id"
						disabled
					/>
				</div>

				<div class="flex flex-1 flex-col gap-2">
					<label for="zone_id">Zone ID</label>
					<InputText
						id="zone_id"
						v-model="zoneID"
						disabled
					/>
				</div>
			</div>

			<div class="flex gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="lat">Latitude</label>
					<InputNumber
						id="lat"
						v-model="lat"
						disabled
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="long">Longitude</label>
					<InputNumber
						id="long"
						v-model="long"
						disabled
					/>
				</div>
			</div>

			<div class="flex flex-1 flex-col gap-2">
				<label for="type">Type</label>
				<InputText
					id="type"
					v-model="type"
					disabled
				/>
			</div>

			<div class="flex flex-1 flex-col gap-2">
				<label for="numberOfFloor">Number of floor</label>
				<InputNumber
					id="numberOfFloor"
					v-model="numberOfFloor"
					disabled
				/>
			</div>

			<div class="flex gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="progress">Progress</label>
					<InputNumber
						id="progress"
						v-model="progress"
						mode="decimal"
						prefix="%"
						disabled
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="startedDay">Started Day</label>
					<Calendar
						v-model="startedDay"
						showIcon
						iconDisplay="input"
						disabled
					/>
				</div>
			</div>

			<div class="flex flex-1 flex-col gap-2 items-end">
				<label for="isService">Is Service</label>
				<InputSwitch
					id="isService"
					v-model="isService"
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
