<script setup>
const { data } = defineProps(["data"]);
</script>

<template>
	<NuxtLink
		:to="data['link']"
		class="w-full h-16 px-2 flex items-center rounded-lg font-semibold gap-2">
		<span class="w-px h-full mx-[8px] bg-gray-200 dark:bg-gray-700 relative"
			><span
				class="w-1 h-1 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-400 dark:bg-gray-500"></span
		></span>
		{{ data["name"] }}
	</NuxtLink>
</template>

<style scoped>
a:hover:not(.router-link-exact-active) span span {
	background-color: var(--black);
}

.router-link-exact-active span span {
	background-color: var(--black);
}
</style>
