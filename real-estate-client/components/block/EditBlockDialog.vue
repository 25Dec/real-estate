<script setup>
	import { baseUrl } from '~/constants';

	const { visible, data, allProjectIDs, zones, currentZone } = defineProps([
		'visible',
		'data',
		'allProjectIDs',
		'zones',
		'currentZone',
	]);
	const accessToken = useCookie('token');

	const myVisible = ref(visible);

	const zoneID = ref(data['zone_id']);
	const numberOfFloor = ref(data['number_of_floor']);
	const lat = ref(data['lat']);
	const long = ref(data['long']);
	const isService = ref(data['is_service']);
	const desc = ref(data['desc']);
	const type = ref(data['type']);
	const progress = ref(data['progress']);
	const startedDay = ref(getYearMonthDay(data['started_day']));

	const onSave = async () => {
		const newBlockData = {
			...data,
			zone_id: zoneID.value,
			number_of_floor: numberOfFloor.value,
			lat: lat.value,
			long: long.value,
			is_service: isService.value,
			desc: desc.value,
			type: type.value,
			progress: progress.value,
			started_day: startedDay.value,
			updated_at: new Date().toLocaleString(),
		};
		console.log(startedDay);
		// const response = await $fetch(baseUrl + `/auth/block`, {
		// 	method: 'post',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 		access_token: accessToken.value,
		// 	},
		// 	body: newBlockData,
		// });

		// myVisible.value = false;

		// if (response != null && response['result'] == 'ok') {
		// 	toast.add({
		// 		severity: 'success',
		// 		summary: 'Success',
		// 		detail: 'Create New Block Successfully!',
		// 		group: 'bl',
		// 		life: 3000,
		// 	});
		// } else {
		// 	toast.add({
		// 		severity: 'warning',
		// 		summary: 'Error',
		// 		detail: 'Failed to Create New Block',
		// 		group: 'bl',
		// 		life: 3000,
		// 	});
		// }
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
				<span class="font-bold text-xl">Block Details</span>
			</div>
		</template>

		<template class="flex flex-col gap-3">
			<div class="flex flex-1 flex-col gap-2">
				<label for="desc">Name</label>
				<InputText
					id="desc"
					placeholder="Name"
					v-model="desc"
				/>
			</div>

			<div class="flex flex-1 flex-col gap-2">
				<label for="zone_id">Zone</label>
				<Dropdown
					id="zone_id"
					placeholder="Select zone"
					v-model="currentZone.value"
					:options="zones"
					optionLabel="name"
					optionValue="value"
				/>
			</div>

			<div class="flex gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="lat">Latitude</label>
					<InputNumber
						id="lat"
						placeholder="Latitude"
						mode="decimal"
						showButtons
						v-model="lat"
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="long">Longitude</label>
					<InputNumber
						id="long"
						placeholder="Longitude"
						mode="decimal"
						showButtons
						v-model="long"
					/>
				</div>
			</div>

			<div class="flex flex-1 flex-col gap-2">
				<label for="type">Type</label>
				<InputText
					id="type"
					v-model="type"
				/>
			</div>

			<div class="flex flex-1 flex-col gap-2">
				<label for="numberOfFloor">Number of floor</label>
				<InputNumber
					id="numberOfFloor"
					mode="decimal"
					showButtons
					v-model="numberOfFloor"
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
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="startedDay">Started Day</label>
					<Calendar
						v-model="startedDay"
						showIcon
						iconDisplay="input"
					/>
				</div>
			</div>

			<div class="flex flex-1 flex-col gap-2 items-end">
				<label for="isService">Is Service</label>
				<InputSwitch
					id="isService"
					v-model="isService"
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
