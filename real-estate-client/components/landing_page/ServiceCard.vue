<script setup>
	const { data } = defineProps(['data']);
</script>

<template>
	<Card
		v-motion-pop-visible
		class="w-[350px]"
	>
		<template #title>
			<div class="flex flex-col justify-center items-center gap-6">
				<NuxtImg :src="data['image']" />
				<span class="font-bold text-xl">{{ data['title'] }}</span>
			</div>
		</template>
		<template #content>
			<p class="text-center">{{ data['content'] }}</p>
		</template>
	</Card>
</template>
