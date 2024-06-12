<script setup>
	import TheManhattanGloryVinhomesGrandPark from '~/public/images/the_manhattan_glory_vinhomes_grand_park.svg';
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
			<TheManhattanGloryVinhomesGrandPark></TheManhattanGloryVinhomesGrandPark>
		</div>
	</div>
</template>
