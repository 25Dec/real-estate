<script setup>
	const { data } = defineProps(['data']);

	const { setCurrentProject, setCurrentProjectID } = useProjectsStore();
	const router = useRouter();

	const viewMore = () => {
		setCurrentProject({ ...data });
		setCurrentProjectID(data['id']);
		router.push(`/project_details/${data['id']}`);
	};
</script>

<template>
	<Card
		v-motion-slide-visible-left
		class="w-[350px] lg:w-[250px] overflow-hidden"
	>
		<template #header>
			<NuxtImg
				v-if="data?.['type'] == 'land'"
				class="w-full h-[150px]"
				src="/images/the_manhattan_glory.jpg"
			/>
			<NuxtImg
				v-else
				class="w-full h-[150px]"
				src="/images/glory_heights.jpg"
			/>
		</template>
		<template #title>
			<span class="capitalize font-semibold">
				{{ data?.['name'] }}
			</span>
		</template>
		<template #subtitle>
			<Tag
				:severity="data?.['activated'] == 'true' ? 'success' : 'danger'"
				:value="data?.['activated'] == 'true' ? 'Activated' : 'Not Activated'"
			/>
		</template>
		<template #content>
			<div class="flex flex-col gap-1">
				<div class="flex justify-between items-center">
					<span>Type:</span>
					<span>{{ capitalize(data?.['type']) }}</span>
				</div>
				<div class="flex justify-between items-center">
					<span>Progress:</span>
					<span>{{ data?.['project_progress'] }}%</span>
				</div>
			</div>
		</template>
		<template #footer>
			<Button
				link
				size="small"
				label="View More"
				@click="viewMore"
			/>
		</template>
	</Card>
</template>
