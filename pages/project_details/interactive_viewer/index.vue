<script setup>
	import TheManhattanGloryVinhomesGrandPark from '~/public/images/the_manhattan_glory_vinhomes_grand_park_original_3.svg?raw';

	const { landAreas } = storeToRefs(useLandAreasStore());
	const { getLandAreas, setCurrentLandArea } = useLandAreasStore();

	await getLandAreas();

	const viewDetailsLandAreaDialogVisible = ref(false);
	const statuses = ref([
		{ name: 'Booked', value: 'booked' },
		{ name: 'Not Booked', value: 'not booked' },
	]);

	const toggleViewDetailsLandArea = async (landAreaName) => {
		const data = landAreas.value.filter((land) => land['desc'] == landAreaName);
		await setCurrentLandArea(data?.[0]);
		viewDetailsLandAreaDialogVisible.value =
			!viewDetailsLandAreaDialogVisible.value;
	};

	if (process.client) {
		document.querySelectorAll('.allPaths').forEach((e) => {
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
				document.getElementById('land-area-name')['style']['opacity'] = 1;
				document.getElementById('land-area-name-p')['innerText'] = e['id'];
			});

			e.addEventListener('mouseleave', () => {
				document.getElementById('land-area-name')['style']['opacity'] = 0;
			});

			e.addEventListener('click', () => {
				toggleViewDetailsLandArea(e['id']);
			});
		});
	}
</script>

<template>
	<div class="w-full h-full flex flex-col">
		<div
			class="fixed right-0 top-0 z-50 backdrop-blur-xl w-5/6 h-[8%] px-4 border-b flex justify-between items-center"
		>
			<div class="flex items-center gap-2">
				<span class="font-semibold text-lg">Interactive Viewer</span>
			</div>
		</div>

		<div
			class="absolute top-[8%] w-full h-[92%] overflow-hidden flex flex-col justify-center items-center"
		>
			<div
				id="land-area-name"
				class="absolute w-fit px-2 py-2 rounded-lg text-xl z-50 backdrop-blur-xl shadow-md"
			>
				<p id="land-area-name-p">Land Area Name</p>
			</div>

			<div
				id="interactive-map"
				v-html="TheManhattanGloryVinhomesGrandPark"
			/>
		</div>
	</div>
	<ViewDetailsLandAreaDialog
		:visible="viewDetailsLandAreaDialogVisible"
		:statuses="statuses"
	/>
</template>

<style scoped>
	#interactive-map :deep svg path {
		cursor: pointer;
	}
</style>
