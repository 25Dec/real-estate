<script setup>
	const { visible, types } = defineProps(['visible', 'types']);

	const { zones } = storeToRefs(useZonesStore());
	const { addNewBlock } = useBlocksStore();

	const myVisible = ref(visible);
	const toast = useToast();
	const zone = ref({
		name: zones.value[0]?.name ?? '',
		value: zones.value[0]?.value ?? '',
	});
	const numberOfFloor = ref(0);
	const lat = ref(0);
	const long = ref(0);
	const isService = ref(false);
	const desc = ref('');
	const type = ref({
		name: types.value?.[0]?.name ?? '',
		value: types.value?.[0]?.value ?? '',
	});
	const progress = ref(0);
	const startedDay = ref('');

	const onSave = async () => {
		const newBlockData = {
			id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1,
			zone_id: parseInt(zone.value.value),
			number_of_floor: parseInt(numberOfFloor.value),
			lat: parseInt(lat.value),
			long: parseInt(long.value),
			is_service: isService.value == 1 ? true : false,
			desc: desc.value,
			type: type.value.value,
			progress: parseInt(progress.value),
			started_day: startedDay.value,
			deleted: 'false',
			created_by: 46,
			updated_by: 46,
			created_at: new Date().toLocaleString(),
			updated_at: null,
		};

		const response = await addNewBlock(newBlockData);
		myVisible.value = false;

		if (response != null && response['result'] == 'ok') {
			toast.add({
				severity: 'success',
				summary: 'Success',
				detail: 'Create New Block Successfully!',
				group: 'bl',
				life: 3000,
			});
		} else {
			toast.add({
				severity: 'warning',
				summary: 'Error',
				detail: 'Failed to Create New Block',
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
				<span class="font-bold text-xl">Create New Block</span>
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
				<label for="zone">Zone</label>
				<Dropdown
					id="zone"
					placeholder="Select zone"
					v-model="zone.value"
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
						mode="decimal"
						showButtons
						v-model="lat"
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="long">Longitude</label>
					<InputNumber
						id="long"
						mode="decimal"
						showButtons
						v-model="long"
					/>
				</div>
			</div>

			<div class="flex flex-1 flex-col gap-2">
				<label for="type">Type</label>
				<Dropdown
					id="type"
					placeholder="Select type"
					v-model="type.value"
					:options="types"
					optionLabel="name"
					optionValue="value"
				/>
			</div>

			<div class="flex flex-1 flex-col gap-2">
				<label for="numberOfFloor">Number Of Floor</label>
				<InputNumber
					id="numberOfFloor"
					mode="decimal"
					showButtons
					v-model="numberOfFloor"
					:min="0"
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
						:min="0"
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
