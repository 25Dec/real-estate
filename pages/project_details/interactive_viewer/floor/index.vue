<script setup>
	import FirstFloor from '~/public/svgs/first_floor.svg?raw';
	import SecondFloor from '~/public/svgs/second_floor.svg?raw';
	import ThirdFloor from '~/public/svgs/third_floor.svg?raw';
	import FourthFloor from '~/public/svgs/fourth_floor.svg?raw';
	import FifthFloor from '~/public/svgs/fifth_floor.svg?raw';
	import SixthFloor from '~/public/svgs/sixth_floor.svg?raw';
	import SeventhFloor from '~/public/svgs/seventh_floor.svg?raw';
	import EighthFloor from '~/public/svgs/eighth_floor.svg?raw';
	import NinthFloor from '~/public/svgs/ninth_floor.svg?raw';

	const { floors, currentFloor } = storeToRefs(useFloorsStore());
	const { getFloors } = useFloorsStore();
	const router = useRouter();
	const toast = useToast();

	await getFloors();

	const menu = ref();
	const menuItems = ref([
		{
			label: 'Create',
			command: () => toggleCreateFloor(),
		},
		{
			label: 'View',
			command: () => toggleViewDetailsFloor(),
		},
		{
			label: 'Edit',
			command: () => toggleEditFloor(),
		},
		{
			label: 'Delete',
			command: () => toggleDeleteFloor(),
		},
		{
			label: 'Move to High Area',
			command: () => router.push('floor/high_area'),
		},
	]);
	const viewDetailsFloorDialogVisible = ref(false);
	const createFloorDialogVisible = ref(false);
	const editFloorDialogVisible = ref(false);
	const deleteFloorDialogVisible = ref(false);

	const toggleMenu = (event) => {
		const hadSelectedArea = Object.keys(currentFloor.value).length;

		if (hadSelectedArea) {
			menu.value.toggle(event);
		} else {
			toast.add({
				severity: 'warning',
				summary: 'Error',
				detail: 'Please Select an Area',
				group: 'bl',
				life: 3000,
			});
		}
	};
	const toggleViewDetailsFloor = () => {
		viewDetailsFloorDialogVisible.value = !viewDetailsFloorDialogVisible.value;
	};
	const toggleCreateFloor = () => {
		createFloorDialogVisible.value = !createFloorDialogVisible.value;
	};
	const toggleEditFloor = () => {
		editFloorDialogVisible.value = !editFloorDialogVisible.value;
	};
	const toggleDeleteFloor = () => {
		deleteFloorDialogVisible.value = !deleteFloorDialogVisible.value;
	};

	onMounted(() => {
		if (process.client) {
			document.querySelectorAll('.allPaths').forEach((e) => {
				let originalBgColor = '';

				e.setAttribute('class', `allPaths ${e['id']}`);

				e.addEventListener('mouseover', () => {
					window.onmousemove = (j) => {
						let x = j['clientX'];
						let y = j['clientY'];

						document.getElementById('area-name')['style']['top'] =
							y - 120 + 'px';
						document.getElementById('area-name')['style']['left'] =
							x - 300 + 'px';
					};
					const classes = e.className.baseVal.replace(/ /g, '.');
					document.querySelectorAll(`.${classes}`).forEach((area) => {
						originalBgColor = area.style.backgroundColor;
						area.style.fill = 'rgba(16,185,129,0.5)';
					});
					document.getElementById('area-name')['style']['opacity'] = 1;
					document.getElementById('area-name-2')['innerText'] = e['id'];
				});

				e.addEventListener('mouseleave', () => {
					const classes = e.className.baseVal.replace(/ /g, '.');
					document.querySelectorAll(`.${classes}`).forEach((area) => {
						area.style.fill = originalBgColor;
					});
					document.getElementById('area-name')['style']['opacity'] = 0;
				});

				e.addEventListener('click', () => {
					document.getElementById('area-name-1')['innerText'] = e['id'];
					const data = floors.value.filter(
						(floor) => floor['desc'].toLowerCase() == e['id'].toLowerCase()
					);
					currentFloor.value = data?.[0];

					toast.add({
						severity: 'success',
						summary: 'Success',
						detail: 'Successfully Selected the Area',
						group: 'bl',
						life: 3000,
					});
				});
			});
		}
	});
</script>

<template>
	<div class="w-full h-full flex flex-col">
		<div
			class="fixed right-0 top-0 z-50 backdrop-blur-xl w-5/6 h-[8%] px-4 border-b flex justify-between items-center"
		>
			<span class="font-semibold text-lg">Interactive Viewer</span>

			<div class="flex items-center">
				<Chip id="area-name-1"> Name </Chip>
				<Button
					text
					severity="secondary"
					@click="(event) => toggleMenu(event)"
				>
					<Icon name="mdi:more-vert" />
				</Button>
				<Menu
					ref="menu"
					:model="menuItems"
					:popup="true"
				/>
			</div>
		</div>

		<div
			class="absolute top-[8%] w-full h-[92%] overflow-hidden flex flex-col justify-center items-center"
		>
			<div
				class="absolute left-0 top-[2%] z-50 px-4"
				@click="() => router.go(-1)"
			>
				<span class="text-[#10b98e] cursor-pointer text-sm hover:underline"
					>Back to Block</span
				>
			</div>
			<div
				id="area-name"
				class="absolute w-fit px-2 py-2 rounded-lg text-xl z-50 backdrop-blur-xl shadow-md"
			>
				<p id="area-name-2">Name</p>
			</div>

			<div class="imp-scale">
				<NuxtImg
					src="images/building_floors.jpg"
					class="imp-image"
				/>
				<div class="imp-objects">
					<div
						v-html="FirstFloor"
						class="imp-object left-[20%] top-[71%] w-[60%] h-[10%]"
					/>
					<div
						v-html="SecondFloor"
						class="imp-object left-[20%] top-[63%] w-[60%] h-[10%]"
					/>
					<div
						v-html="ThirdFloor"
						class="imp-object left-[20%] top-[52%] w-[60%] h-[10%]"
					/>
					<div
						v-html="FourthFloor"
						class="imp-object left-[20%] top-[48%] w-[44%] h-[10%]"
					/>
					<div
						v-html="FifthFloor"
						class="imp-object left-[20%] top-[40%] w-[44%] h-[10%]"
					/>
					<div
						v-html="SixthFloor"
						class="imp-object left-[20%] top-[32%] w-[44%] h-[10%]"
					/>
					<div
						v-html="SeventhFloor"
						class="imp-object left-[20%] top-[24%] w-[44%] h-[10%]"
					/>
					<div
						v-html="EighthFloor"
						class="imp-object left-[20%] top-[16%] w-[44%] h-[10%]"
					/>
					<div
						v-html="NinthFloor"
						class="imp-object left-[20%] top-[6%] w-[44%] h-[20%]"
					/>
				</div>
			</div>
		</div>
	</div>
	<ViewDetailsFloorDialog
		v-if="viewDetailsFloorDialogVisible"
		:visible="viewDetailsFloorDialogVisible"
	/>
	<CreateFloorDialog
		v-if="createFloorDialogVisible"
		:visible="createFloorDialogVisible"
	/>
	<EditFloorDialog
		v-if="editFloorDialogVisible"
		:visible="editFloorDialogVisible"
	/>
	<DeleteFloorDialog
		v-if="deleteFloorDialogVisible"
		:visible="deleteFloorDialogVisible"
	/>
</template>

<style scoped>
	#interactive-map :deep svg path {
		cursor: pointer;
	}

	.imp-scale {
		transform: scale(1, 1) translate(0, 0);
		transform-origin: 0% 0%;
		width: 100%;
		height: 100%;
	}

	.imp-image {
		z-index: 0;
		position: relative !important;
		width: 100% !important;
		height: 100% !important;
		margin: 0 !important;
		max-width: none !important;
		max-height: none !important;
		display: block !important;
		user-select: none;
	}

	.imp-objects {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 2;
	}

	.imp-object {
		position: absolute;
		cursor: pointer;
		pointer-events: all;
		transition: all 0.15s cubic-bezier(0.55, 0, 0.1, 1);
		fill: rgba(28, 100, 242, 0);
		opacity: 1;
		stroke: rgba(255, 255, 255, 0.75);
		stroke-width: 0px;
		stroke-dasharray: 0;
		stroke-linecap: round;
	}
</style>
