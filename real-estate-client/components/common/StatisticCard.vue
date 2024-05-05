<script setup>
	const { title, count, icon, bgColor } = defineProps([
		'title',
		'count',
		'icon',
		'bgColor',
	]);
</script>

<template>
	<div
		class="w-1/4 h-16 px-4 py-2 shadow-md rounded-lg flex justify-between items-center"
	>
		<div class="flex flex-col gap-1">
			<span>{{ title }}</span>
			<span class="text-lg font-bold">{{ count }}</span>
		</div>
		<div :class="`icon h-full ${bgColor} flex items-center rounded-lg`">
			<Icon
				:name="icon"
				class="text-myWhite text-4xl"
			/>
		</div>
	</div>
</template>
