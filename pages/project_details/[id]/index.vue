<script setup>
	const { statistics } = storeToRefs(useDashboardStore());
	const { getDashboardStatistics } = useDashboardStore();

	await getDashboardStatistics();
</script>

<template>
	<div class="w-full h-full flex flex-col items-center">
		<div
			class="fixed right-0 top-0 z-50 backdrop-blur-2xl w-5/6 h-[8%] px-4 border-b flex justify-between items-center"
		>
			<div class="flex items-center gap-2">
				<span class="font-semibold text-lg">Dashboard</span>
			</div>
		</div>

		<div class="absolute top-[8%] w-full h-[92%]">
			<div class="w-full px-4 pt-5 flex justify-between items-center gap-4">
				<StatisticCard
					title="Bookings"
					:count="statistics['resultBooking']"
					icon="twemoji:couch-and-lamp"
					bgColor="bg-gradient-to-t"
				/>
				<StatisticCard
					title="Rooms"
					:count="statistics['resultRoom']"
					icon="twemoji:door"
					bgColor="bg-gradient-to-t"
				/>
				<StatisticCard
					title="Money"
					:count="statistics['resultMoney']"
					icon="twemoji:money-bag"
					bgColor="bg-gradient-to-t"
				/>
				<StatisticCard
					title="Accounts"
					:count="statistics['resultAccount']"
					icon="twemoji:person-raising-hand-medium-light-skin-tone"
					bgColor="bg-gradient-to-t"
				/>
			</div>
		</div>
	</div>
</template>
