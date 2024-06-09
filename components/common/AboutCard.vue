<script setup>
	const { data } = defineProps(['data']);
</script>

<template>
	<div class="flex items-center gap-3">
		<Avatar
			size="large"
			shape="circle"
		>
			<Icon
				:name="data['icon']"
				class="text-[#10b981]"
			/>
		</Avatar>
		<span>{{ data['title'] }}</span>
	</div>
</template>
