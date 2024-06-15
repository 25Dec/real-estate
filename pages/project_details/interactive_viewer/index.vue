<script setup>
	import TheManhattanGloryVinhomesGrandPark from '~/public/images/the_manhattan_glory_vinhomes_grand_park_original_3.svg?raw';

	const { zones } = storeToRefs(useZonesStore());
	const { getZones } = useZonesStore();
	const { landAreas, currentLandArea } = storeToRefs(useLandAreasStore());
	const { getLandAreas, setCurrentLandArea } = useLandAreasStore();
	const router = useRouter();
	const toast = useToast();

	await getZones();
	await getLandAreas();

	const statuses = ref([
		{ name: 'Booked', value: 'booked' },
		{ name: 'Not Booked', value: 'not booked' },
	]);
	const menu = ref();
	const menuItems = ref([
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
				router.push('interactive_viewer/payment');
			},
		},
	]);
	const viewDetailsLandAreaDialogVisible = ref(false);
	const createLandAreaDialogVisible = ref(false);
	const editLandAreaDialogVisible = ref(false);
	const deleteLandAreaDialogVisible = ref(false);

	const toggleMenu = (event) => {
		const hadSelectedLand = Object.keys(currentLandArea.value).length;

		if (hadSelectedLand) {
			menu.value.toggle(event);
		} else {
			toast.add({
				severity: 'warning',
				summary: 'Error',
				detail: 'Please Select a Land Area',
				group: 'bl',
				life: 3000,
			});
		}
	};
	const toggleViewDetailsLandArea = () => {
		viewDetailsLandAreaDialogVisible.value =
			!viewDetailsLandAreaDialogVisible.value;
	};
	const toggleEditLandArea = () => {
		editLandAreaDialogVisible.value = !editLandAreaDialogVisible.value;
	};
	const toggleDeleteLandArea = async () => {
		deleteLandAreaDialogVisible.value = !deleteLandAreaDialogVisible.value;
	};

	onMounted(() => {
		if (process.client) {
			document.querySelectorAll('.allPaths').forEach((e) => {
				let originalLandBgColor = '';

				e.setAttribute('class', `allPaths ${e['id']}`);

				e.addEventListener('mouseover', () => {
					window.onmousemove = (j) => {
						let x = j['clientX'];
						let y = j['clientY'];

						document.getElementById('land-area-name')['style']['top'] =
							y - 120 + 'px';
						document.getElementById('land-area-name')['style']['left'] =
							x - 300 + 'px';
					};
					const classes = e.className.baseVal.replace(/ /g, '.');
					document.querySelectorAll(`.${classes}`).forEach((land) => {
						originalLandBgColor = land.style.backgroundColor;
						land.style.fill = 'rgb(210,210,210)';
					});
					document.getElementById('land-area-name')['style']['opacity'] = 1;
					document.getElementById('land-area-name-2')['innerText'] = e['id'];
				});

				e.addEventListener('mouseleave', () => {
					const classes = e.className.baseVal.replace(/ /g, '.');
					document.querySelectorAll(`.${classes}`).forEach((land) => {
						land.style.fill = originalLandBgColor;
					});
					document.getElementById('land-area-name')['style']['opacity'] = 0;
				});

				e.addEventListener('click', () => {
					const data = landAreas.value.filter(
						(land) => land['desc'] == e['id']
					);
					document.getElementById('land-area-name-1')['innerText'] = e['id'];
					setCurrentLandArea(data?.[0]);
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
				<Chip id="land-area-name-1">Land Area Name</Chip>
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
				id="land-area-name"
				class="absolute w-fit px-2 py-2 rounded-lg text-xl z-50 backdrop-blur-xl shadow-md"
			>
				<p id="land-area-name-2">Land Area Name</p>
			</div>

			<div
				id="interactive-map"
				v-html="TheManhattanGloryVinhomesGrandPark"
			/>
		</div>
	</div>

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
</style>
