<script setup>
	const { data } = defineProps(['data']);

	const router = useRouter();
	const { currentProject } = storeToRefs(useProjectsStore());
	const { setCurrentProjectID } = useProjectsStore();

	const viewMore = () => {
		currentProject.value = data;
		setCurrentProjectID(data['id']);
		router.push(`/project_details/${data['id']}`);
	};
</script>

<template>
	<Card
		v-motion-slide-visible-left
		class="w-[250px]"
	>
		<template #header>
			<Skeleton
				width="100%"
				height="150px"
			/>
		</template>
		<template #title>
			<span class="capitalize">
				{{ data['name'] }}
			</span>
		</template>
		<template #subtitle>
			<Tag
				:severity="data['activated'] == 'Activated' ? 'success' : 'danger'"
				:value="data['activated'] == true ? 'Activated' : 'Not Activated'"
			/>
		</template>
		<template #content>
			<div class="flex justify-between items-center">
				<span>Progress:</span>
				<span>{{ data['project_progress'] }}%</span>
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
