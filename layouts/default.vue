<script setup>
	const { authenticated } = storeToRefs(useAuthStore());
	const router = useRouter();

	if (!authenticated) {
		router.push('/login');
	}
</script>

<template>
	<SidebarMenu />
	<div class="absolute top-0 right-0 w-5/6 h-full">
		<slot />
	</div>
	<Toast
		position="bottom-left"
		group="bl"
	/>
</template>

<style>
	@import url('~/assets/css/main.css');
	@import 'primeicons/primeicons.css';
</style>
