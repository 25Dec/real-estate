<script setup>
	import TheManhattanGloryVinhomesGrandPark from '~/public/images/the_manhattan_glory_vinhomes_grand_park_original_3.svg?raw';

	if (process.client) {
		document.querySelectorAll('.allPaths').forEach((e) => {
			e.setAttribute('class', `allPaths ${e.id}`);
			e.addEventListener('mouseover', () => {
				window.onmousemove = (j) => {
					y = j.clientY;
					x = j.clientX;
					document.getElementById('name').style.top = y - 60 + 'px';
					document.getElementById('name').style.left = x + 10 + 'px';
				};
				const classes = e.className.baseVal.replace(/ /g, '.');
				document.querySelectorAll(`.${classes}`).forEach((country) => {
					country.style.fill = 'pink';
				});
				document.getElementById('namep').innerText = e.id;
			});

			e.addEventListener('mouseleave', () => {
				const classes = e.className.baseVal.replace(/ /g, '.');
				document.querySelectorAll(`.${classes}`).forEach((country) => {
					country.style.fill = '#ececec';
				});
			});

			e.addEventListener('click', () => {
				console.log(e.id);
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
			class="absolute top-[8%] w-full h-[92%] flex flex-col justify-center items-center"
		>
			<div id="name">
				<p id="namep">Name</p>
			</div>

			<div
				id="interactive-map"
				v-html="TheManhattanGloryVinhomesGrandPark"
			/>
		</div>
	</div>
</template>

<style scoped>
	#interactive-map :deep svg path {
		cursor: pointer;
	}

	#name {
		position: absolute;
		background-color: rgb(255, 255, 255);
		width: fit-content;
		opacity: 0;
		border-radius: 5px;
		border: 3px solid rgb(245, 128, 128);
		padding: 0px 5px;
		font-size: 1.5rem;
	}
</style>
