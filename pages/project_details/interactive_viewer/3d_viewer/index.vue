<script setup>
	definePageMeta({
		layout: 'empty',
	});

	const router = useRouter();
</script>

<template>
	<div class="w-full h-full flex flex-col">
		<div
			class="fixed right-0 top-0 z-50 backdrop-blur-xl w-full h-[10%] px-4 border-b flex justify-between items-center"
		>
			<div class="flex flex-col justify-center gap-2">
				<p
					class="text-[#10b98e] cursor-pointer text-sm hover:underline"
					@click="() => router.go(-1)"
				>
					Back to Land Area
				</p>
				<div class="flex items-center gap-2">
					<span class="font-semibold text-lg">3D Viewer</span>
				</div>
			</div>
		</div>

		<div class="absolute top-[10%] w-full h-[90%]">
			<iframe
				id="vt_demo"
				class="w-full h-full"
				referrerpolicy="origin"
				allow="accelerometer; camera; display-capture; fullscreen; geolocation; gyroscope; magnetometer; microphone; midi; xr-spatial-tracking;"
				allowfullscreen="yes"
				allowvr="yes"
				frameborder="0"
				scrolling="no"
				marginheight="0"
				marginwidth="0"
				src="https://no1on.me/viewer/index.php?code=c20ad4d76fe97759aa27a0c99bff6710"
			></iframe>
		</div>
	</div>
</template>
