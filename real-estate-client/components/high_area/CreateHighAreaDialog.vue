<script setup>
	const { visible, statuses } = defineProps(['visible', 'statuses']);

	const { floors, floorsDropdown } = storeToRefs(useFloorsStore());
	const { currentHighArea } = storeToRefs(useHighAreasStore());
	const { paymentMethodsDropdown } = storeToRefs(usePaymentMethodsStore());
	const { getPaymentMethods } = usePaymentMethodsStore();

	await getPaymentMethods();

	const myVisible = ref(visible);
	const floor = ref(
		floorsDropdown.value.filter(
			(floor) => floor['value'] == currentHighArea.value['floor_id']
		)?.[0]?.['value']
	);
	const highAreaDirection = ref(currentHighArea.value['high_area_direction']);
	const lat = ref(currentHighArea.value['lat']);
	const long = ref(currentHighArea.value['long']);
	const totalArea = ref(currentHighArea.value['total_area']);
	const progress = ref(currentHighArea.value['progress']);
	const numberOfWC = ref(currentHighArea.value['number_of_wc']);
	const numberOfRoom = ref(currentHighArea.value['number_of_room']);
	const price = ref(currentHighArea.value['price']);
	const owner = ref(currentHighArea.value['owner']);
	const buyStatus = ref(currentHighArea.value['buy_status']);
	const desc = ref(currentHighArea.value['desc']);
	const paymentMethod = ref(
		paymentMethodsDropdown.value.filter(
			(payment) => payment['value'] == 11
			// currentHighArea.value['payment_method_id']
		)?.[0]?.['value']
	);
	console.log(paymentMethodsDropdown.value);
	const createdAt = ref(currentHighArea.value['created_at']);
	const updatedAt = ref(currentHighArea.value['updated_at']);
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
						disabled
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="floor">Floor</label>
					<Dropdown
						id="floor"
						v-model="floor"
						:options="floorsDropdown"
						optionLabel="name"
						optionValue="value"
						disabled
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
						disabled
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="long">Longitude</label>
					<InputNumber
						id="long"
						mode="decimal"
						v-model="long"
						disabled
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
						disabled
					/>
				</div>

				<div class="flex flex-1 flex-col gap-2">
					<label for="highAreaDirection">High Area Direction</label>
					<InputText
						id="highAreaDirection"
						v-model="highAreaDirection"
						disabled
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
						disabled
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="numberOfWC">Number of WC</label>
					<InputNumber
						id="numberOfWC"
						mode="decimal"
						v-model="numberOfWC"
						disabled
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
						disabled
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="paymentMethod">Payment Method</label>
					<Dropdown
						id="paymentMethod"
						v-model="paymentMethod"
						:options="paymentMethodsDropdown"
						optionLabel="name"
						optionValue="value"
						disabled
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
						disabled
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="buyStatus">Buy Status</label>
					<Dropdown
						id="buyStatus"
						v-model="buyStatus"
						:options="statuses"
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
