<script setup>
	import TheManhattanGloryVinhomesGrandPark from '~/public/svgs/the_manhattan_glory_vinhomes_grand_park_original_3.svg?raw';
	import GloryHeights from '~/public/svgs/glory_heights.svg?raw';

	const { currentProjectFromLocalStore } = storeToRefs(useProjectsStore());
	const { zones } = storeToRefs(useZonesStore());
	const { getZones } = useZonesStore();
	const { blocks, currentBlock } = storeToRefs(useBlocksStore());
	const { getBlocks } = useBlocksStore();
	const { landAreas, currentLandArea } = storeToRefs(useLandAreasStore());
	const { getLandAreas, setCurrentLandArea } = useLandAreasStore();
	const router = useRouter();
	const toast = useToast();

	await getZones();

	const projectType = ref(currentProjectFromLocalStore.value['type']);

	if (projectType.value == 'land' || projectType.value == 'hybrid') {
		await getLandAreas();
	}

	if (projectType.value == 'high' || projectType.value == 'hybrid') {
		await getBlocks();
	}

	const statuses = ref([
		{ name: 'Booked', value: 'booked' },
		{ name: 'Not Booked', value: 'not booked' },
	]);
	const types = ref([
		{ name: 'Normal', value: 'normal' },
		{ name: 'Luxury', value: 'luxury' },
	]);
	const menu = ref();
	const menuItems = ref(
		projectType.value == 'land'
			? [
					{
						label: 'Create',
						command: () => toggleCreateLandArea(),
					},
					{
						label: 'View',
						command: () => toggleViewDetailsLandArea(),
					},
					{
						label: 'Edit',
						command: () => toggleEditLandArea(),
					},
					{
						label: 'Delete',
						command: () => toggleDeleteLandArea(),
					},
					{
						label: 'Payment',
						command: () => {
							router.push('svg_animation_viewer/land_area_payment');
						},
					},
					{
						label: '3D Model Viewer',
						command: () => {
							router.push('svg_animation_viewer/3d_model_viewer');
						},
					},
			  ]
			: [
					{
						label: 'Create',
						command: () => toggleCreateBlock(),
					},
					{
						label: 'View',
						command: () => toggleViewDetailsBlock(),
					},
					{
						label: 'Edit',
						command: () => toggleEditBlock(),
					},
					{
						label: 'Delete',
						command: () => toggleDeleteBlock(),
					},
					{
						label: 'Move to Floor',
						command: () => router.push('svg_animation_viewer/floor'),
					},
			  ]
	);
	const viewDetailsBlockDialogVisible = ref(false);
	const createBlockDialogVisible = ref(false);
	const editBlockDialogVisible = ref(false);
	const deleteBlockDialogVisible = ref(false);
	const viewDetailsLandAreaDialogVisible = ref(false);
	const createLandAreaDialogVisible = ref(false);
	const editLandAreaDialogVisible = ref(false);
	const deleteLandAreaDialogVisible = ref(false);

	const toggleMenu = (event) => {
		const hadSelectedArea =
			projectType.value == 'land'
				? Object.keys(currentLandArea.value).length
				: true;

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
	const toggleCreateBlock = () => {
		createBlockDialogVisible.value = !createBlockDialogVisible.value;
	};
	const toggleViewDetailsBlock = () => {
		viewDetailsBlockDialogVisible.value = !viewDetailsBlockDialogVisible.value;
	};
	const toggleEditBlock = () => {
		editBlockDialogVisible.value = !editBlockDialogVisible.value;
	};
	const toggleDeleteBlock = () => {
		deleteBlockDialogVisible.value = !deleteBlockDialogVisible.value;
	};
	const toggleCreateLandArea = () => {
		createLandAreaDialogVisible.value = !createLandAreaDialogVisible.value;
	};
	const toggleViewDetailsLandArea = () => {
		viewDetailsLandAreaDialogVisible.value =
			!viewDetailsLandAreaDialogVisible.value;
	};
	const toggleEditLandArea = () => {
		editLandAreaDialogVisible.value = !editLandAreaDialogVisible.value;
	};
	const toggleDeleteLandArea = () => {
		deleteLandAreaDialogVisible.value = !deleteLandAreaDialogVisible.value;
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

					if (projectType.value == 'land') {
						const data = landAreas.value.filter(
							(land) => land['desc'] == e['id']
						);
						setCurrentLandArea(data?.[0]);
					} else if (projectType.value == 'high') {
						const data = blocks.value.filter(
							(block) => block['desc'] == e['id'].substring(0, 3).toLowerCase()
						);
						currentBlock.value = data?.[0];
					}

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
			<span class="font-semibold text-lg">SVG Animation Viewer</span>

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
				id="area-name"
				class="absolute w-fit px-2 py-2 rounded-lg text-xl z-50 backdrop-blur-xl shadow-md"
			>
				<p id="area-name-2">Name</p>
			</div>

			<div class="imp-scale">
				<div class="imp-objects flex justify-center items-center">
					<div
						v-if="projectType == 'land'"
						v-html="TheManhattanGloryVinhomesGrandPark"
						id="interactive-map"
						class="imp-object"
					/>
					<div
						v-else
						v-html="GloryHeights"
						id="interactive-map"
						class="imp-object"
					/>
				</div>
			</div>
		</div>
	</div>
	<ViewDetailsBlockDialog
		v-if="viewDetailsBlockDialogVisible"
		:visible="viewDetailsBlockDialogVisible"
		:types="types"
	/>
	<CreateBlockDialog
		v-if="createBlockDialogVisible"
		:visible="createBlockDialogVisible"
		:types="types"
	/>
	<EditBlockDialog
		v-if="editBlockDialogVisible"
		:visible="editBlockDialogVisible"
		:types="types"
	/>
	<DeleteBlockDialog
		v-if="deleteBlockDialogVisible"
		:visible="deleteBlockDialogVisible"
	/>
	<ViewDetailsLandAreaDialog
		v-if="viewDetailsLandAreaDialogVisible"
		:visible="viewDetailsLandAreaDialogVisible"
		:statuses="statuses"
	/>
	<CreateLandAreaDialog
		v-if="createLandAreaDialogVisible"
		:visible="createLandAreaDialogVisible"
		:statuses="statuses"
	/>
	<EditLandAreaDialog
		v-if="editLandAreaDialogVisible"
		:visible="editLandAreaDialogVisible"
		:statuses="statuses"
	/>
	<DeleteLandAreaDialog
		v-if="deleteLandAreaDialogVisible"
		:visible="deleteLandAreaDialogVisible"
	/>
</template>

<style scoped>
	#interactive-map :deep svg path {
		cursor: pointer;
	}

	.imp-scale {
		transform: scale(0.95, 0.95) translate(0, 0);
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
