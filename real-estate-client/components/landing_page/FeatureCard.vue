<script setup>
	const { data } = defineProps(['data']);
</script>

<template>
	<Card
		v-motion-slide-visible-right
		class="w-[250px] transition duration-150 hover:bg-[#10b981]"
	>
		<template #content>
			<div class="flex flex-col justify-center items-center gap-3">
				<Avatar
					size="xlarge"
					shape="circle"
				>
					<Icon
						:name="data['icon']"
						class="text-4xl text-[#10b981]"
					/>
				</Avatar>
				<span class="font-bold text-xl">{{ data['title'] }}</span>
			</div>
		</template>
	</Card>
</template>
