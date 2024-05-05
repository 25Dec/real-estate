<script setup>
	const { data } = defineProps(['data']);

	const expanded = ref(false);

	const onClick = () => {
		if (data.items && data.items.length > 0) {
			expanded.value = !expanded.value;
		}
	};
</script>

<template>
	<NuxtLink
		:to="data['link']"
		@click="onClick"
		class="w-full h-16 px-2 flex justify-between items-center rounded-lg font-semibold text-gray-500"
	>
		<div class="flex items-center gap-2">
			<Icon :name="data.icon" />
			<span>{{ data['name'] }}</span>
		</div>
		<Icon
			v-if="expanded && data.items && data.items.length > 0"
			name="mdi:chevron-down"
		/>
		<Icon
			v-else-if="!expanded && data.items && data.items.length > 0"
			name="mdi:chevron-right"
		/>
	</NuxtLink>
	<div
		v-if="expanded && data.items && data.items.length > 0"
		className="w-full flex flex-col"
	>
		<SubMenuItem
			v-for="item in data['items']"
			:key="item"
			:data="item"
		/>
	</div>
</template>

<style scoped>
	.router-link-exact-active {
		color: var(--black);
		background-color: var(--onActive);
	}

	a:hover:not(.router-link-exact-active) {
		color: var(--black);
		background-color: var(--onHover);
	}
</style>
