<script setup>
	const { data } = defineProps(['data']);

	const external = data['action']['goto']['external'];
	const path =
		external == true
			? { hash: data['action']['goto']['path'] }
			: data['action']['goto']['path'];
</script>

<template>
	<NuxtLink
		:to="path"
		:external="external"
		class="transition hover:scale-105"
	>
		<Card
			v-motion-pop-visible
			class="w-[350px]"
		>
			<template #title>
				<div class="flex flex-col justify-center items-center gap-6">
					<NuxtImg :src="data?.['image']" />
					<span class="font-bold text-xl text-center">{{
						data?.['title']
					}}</span>
				</div>
			</template>
			<template #content>
				<p class="text-center">{{ data?.['content'] }}</p>
			</template>
		</Card>
	</NuxtLink>
</template>
