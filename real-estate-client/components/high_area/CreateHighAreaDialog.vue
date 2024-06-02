<script setup>
	const { visible, statuses } = defineProps(['visible', 'statuses']);

	const { floors, floorsDropdown } = storeToRefs(useFloorsStore());
	const { addNewHighArea } = useHighAreasStore();
	const { paymentMethodsDropdown } = storeToRefs(usePaymentMethodsStore());
	const { getPaymentMethods } = usePaymentMethodsStore();

	await getPaymentMethods();

	const toast = useToast();
	const myVisible = ref(visible);
	const floor = ref(0);
	const highAreaDirection = ref('');
	const lat = ref(0);
	const long = ref(0);
	const totalArea = ref(0);
	const progress = ref(0);
	const numberOfWC = ref(0);
	const numberOfRoom = ref(0);
	const price = ref(0);
	const owner = ref(0);
	const buyStatus = ref('');
	const desc = ref('');
	const paymentMethod = ref(0);

	const onSave = async () => {
		const newHighAreaData = {
			id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1,
			floor_id: parseInt(floor.value),
			high_area_direction: highAreaDirection.value,
			lat: parseInt(lat.value),
			long: parseInt(long.value),
			total_area: parseInt(totalArea.value),
			progress: parseInt(progress.value),
			number_of_wc: parseInt(numberOfWC.value),
			number_of_room: parseInt(numberOfRoom.value),
			price: parseInt(price.value),
			owner: parseInt(owner.value),
			buy_status: buyStatus.value,
			desc: desc.value,
			payment_method_id: parseInt(paymentMethod.value),
			deleted: 'false',
			created_by: 46,
			updated_by: 46,
			created_at: new Date().toLocaleString(),
			updated_at: null,
		};

		const response = await addNewHighArea(newHighAreaData);
		myVisible.value = false;

		if (response != null && response['result'] == 'ok') {
			toast.add({
				severity: 'success',
				summary: 'Success',
				detail: 'Create New High Area Successfully!',
				group: 'bl',
				life: 3000,
			});
		} else {
			toast.add({
				severity: 'warning',
				summary: 'Error',
				detail: 'Failed to Create New High Area',
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
				<span class="font-bold text-xl">High Area Details</span>
			</div>
		</template>

		<template class="flex flex-col gap-3">
			<div class="flex gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="desc">Name</label>
					<InputText
						id="desc"
						v-model="desc"
						placeholder="Name"
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="floor">Floor</label>
					<Dropdown
						id="floor"
						v-model="floor"
						:options="floorsDropdown"
						placeholder="Select Floor"
						optionLabel="name"
						optionValue="value"
					/>
				</div>
			</div>

			<div class="flex gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="lat">Latitude</label>
					<InputNumber
						id="lat"
						mode="decimal"
						v-model="lat"
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="long">Longitude</label>
					<InputNumber
						id="long"
						mode="decimal"
						v-model="long"
					/>
				</div>
			</div>

			<div class="flex gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="totalArea">Total Area</label>
					<InputNumber
						id="totalArea"
						mode="decimal"
						v-model="totalArea"
						:min="0"
					/>
				</div>

				<div class="flex flex-1 flex-col gap-2">
					<label for="highAreaDirection">High Area Direction</label>
					<InputText
						id="highAreaDirection"
						v-model="highAreaDirection"
						placeholder="High Area Direction"
					/>
				</div>
			</div>

			<div class="flex gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="numberOfRoom">Number of room</label>
					<InputNumber
						id="numberOfRoom"
						mode="decimal"
						v-model="numberOfRoom"
						:min="0"
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="numberOfWC">Number of WC</label>
					<InputNumber
						id="numberOfWC"
						mode="decimal"
						v-model="numberOfWC"
						:min="0"
					/>
				</div>
			</div>

			<div class="flex gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="price">Price</label>
					<InputNumber
						id="price"
						v-model="price"
						mode="decimal"
						prefix="$"
						:min="0"
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="paymentMethod">Payment Method</label>
					<Dropdown
						id="paymentMethod"
						v-model="paymentMethod"
						placeholder="Select Payment Method"
						:options="paymentMethodsDropdown"
						optionLabel="name"
						optionValue="value"
					/>
				</div>
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
					<label for="buyStatus">Buy Status</label>
					<Dropdown
						id="buyStatus"
						placeholder="Select Status"
						v-model="buyStatus"
						:options="statuses"
						optionLabel="name"
						optionValue="value"
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
