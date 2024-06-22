<script setup>
	import CH01 from '~/public/svgs/ch01.svg?raw';
	import CH02 from '~/public/svgs/ch02.svg?raw';
	import CH03 from '~/public/svgs/ch03.svg?raw';
	import CH04 from '~/public/svgs/ch04.svg?raw';
	import CH05 from '~/public/svgs/ch05.svg?raw';
	import CH06 from '~/public/svgs/ch06.svg?raw';
	import CH07 from '~/public/svgs/ch07.svg?raw';
	import CH08 from '~/public/svgs/ch08.svg?raw';
	import CH09 from '~/public/svgs/ch09.svg?raw';
	import CH10 from '~/public/svgs/ch10.svg?raw';
	import CH11 from '~/public/svgs/ch11.svg?raw';
	import CH12 from '~/public/svgs/ch12.svg?raw';
	import CH13 from '~/public/svgs/ch13.svg?raw';
	import CH14 from '~/public/svgs/ch14.svg?raw';
	import CH15 from '~/public/svgs/ch15.svg?raw';
	import CH16 from '~/public/svgs/ch16.svg?raw';
	import CH17 from '~/public/svgs/ch17.svg?raw';
	import CH18 from '~/public/svgs/ch18.svg?raw';
	import CH19 from '~/public/svgs/ch19.svg?raw';

	const { highAreas, currentHighArea } = storeToRefs(useHighAreasStore());
	const { getHighAreas, setCurrentHighArea } = useHighAreasStore();
	const router = useRouter();
	const toast = useToast();

	await getHighAreas();

	const statuses = ref([
		{ name: 'Booked', value: 'booked' },
		{ name: 'Not Booked', value: 'not booked' },
	]);
	const menu = ref();
	const menuItems = ref([
		{
			label: 'View',
			command: () => toggleViewDetailsHighArea(),
		},
		{
			label: 'Edit',
			command: () => toggleEditHighArea(),
		},
		{
			label: 'Payment',
			command: () => {
				router.push('high_area/high_area_payment');
			},
		},
	]);
	const viewDetailsHighAreaDialogVisible = ref(false);
	const editHighAreaDialogVisible = ref(false);

	const toggleMenu = (event) => {
		const hadSelectedArea = Object.keys(currentHighArea.value).length;

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
	const toggleViewDetailsHighArea = () => {
		viewDetailsHighAreaDialogVisible.value =
			!viewDetailsHighAreaDialogVisible.value;
	};
	const toggleEditHighArea = () => {
		editHighAreaDialogVisible.value = !editHighAreaDialogVisible.value;
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
					const data = highAreas.value.filter(
						(highArea) => highArea['desc'] == e['id']
					);
					setCurrentHighArea(data?.[0]);
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
					>Back to Floor</span
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
					src="images/high_area_second_floor.png"
					class="imp-image"
				/>
				<div class="imp-objects">
					<div
						v-html="CH01"
						class="imp-object left-[37.5%] top-[15.5%]"
					/>
					<div
						v-html="CH02"
						class="imp-object left-[50%] top-[15.5%]"
					/>
					<div
						v-html="CH03"
						class="imp-object left-[58.5%] top-[13.5%]"
					/>
					<div
						v-html="CH04"
						class="imp-object left-[64%] top-[13.5%]"
					/>
					<div
						v-html="CH05"
						class="imp-object left-[74.3%] top-[13.5%]"
					/>
					<div
						v-html="CH06"
						class="imp-object right-[2.3%] top-[13.5%]"
					/>
					<div
						v-html="CH07"
						class="imp-object right-[3%] top-[40%]"
					/>
					<div
						v-html="CH08"
						class="imp-object right-[15.5%] top-[40%]"
					/>
					<div
						v-html="CH09"
						class="imp-object right-[26%] top-[40%]"
					/>
					<div
						v-html="CH10"
						class="imp-object right-[36%] top-[40%]"
					/>
					<div
						v-html="CH11"
						class="imp-object left-[43.5%] bottom-[15.5%]"
					/>
					<div
						v-html="CH12"
						class="imp-object left-[33.5%] bottom-[13.5%]"
					/>
					<div
						v-html="CH13"
						class="imp-object left-[23.3%] bottom-[13.5%]"
					/>
					<div
						v-html="CH14"
						class="imp-object left-[14.8%] bottom-[13.5%]"
					/>
					<div
						v-html="CH15"
						class="imp-object left-[2.1%] bottom-[15.5%]"
					/>
					<div
						v-html="CH16"
						class="imp-object left-[2.1%] top-[40.5%]"
					/>
					<div
						v-html="CH17"
						class="imp-object left-[14.8%] top-[40.5%]"
					/>
					<div
						v-html="CH18"
						class="imp-object left-[23.3%] top-[40.5%]"
					/>
					<div
						v-html="CH19"
						class="imp-object left-[31.5%] top-[40.5%]"
					/>
				</div>
			</div>
		</div>
	</div>
	<ViewDetailsHighAreaDialog
		v-if="viewDetailsHighAreaDialogVisible"
		:visible="viewDetailsHighAreaDialogVisible"
		:statuses="statuses"
	/>
	<EditHighAreaDialog
		v-if="editHighAreaDialogVisible"
		:visible="editHighAreaDialogVisible"
		:statuses="statuses"
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
