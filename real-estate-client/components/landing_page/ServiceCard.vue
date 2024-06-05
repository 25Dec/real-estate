<script setup>
	const { data } = defineProps(['data']);
</script>

<template>
	<NuxtLink
		:to="{ hash: data['action']['goto']['path'] }"
		:external="data['action']['goto']['external']"
	>
		<Card
			v-motion-pop-visible
			class="w-[350px]"
		>
			<template #title>
				<div class="flex flex-col justify-center items-center gap-6">
					<NuxtImg :src="data['image']" />
					<span class="font-bold text-xl text-center">{{ data['title'] }}</span>
				</div>
			</template>
			<template #content>
				<p class="text-center">{{ data['content'] }}</p>
			</template>
		</Card>
	</NuxtLink>
</template>
