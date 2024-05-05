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
		class="w-full h-16 px-2 flex items-center rounded-lg font-semibold gap-2"
	>
		<span class="w-px h-full mx-[8px] bg-gray-200 relative"
			><span
				class="w-1 h-1 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-400"
			></span
		></span>
		<span class="text-gray-500">{{ data['name'] }}</span>

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
	a:hover:not(.router-link-exact-active) {
		color: var(--black);
		background-color: var(--onHover);
	}

	a:hover:not(.router-link-exact-active) span span {
		background-color: var(--black);
	}

	.router-link-exact-active span span {
		background-color: var(--black);
	}

	.router-link-exact-active span:nth-child(2) {
		color: var(--black);
	}

	.router-link-exact-active {
		color: var(--black);
		background-color: var(--onActive);
	}
</style>
