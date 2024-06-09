import { baseUrl } from '~/constants';

export const useDashboardStore = defineStore('dashboard', () => {
	const statistics = ref({});

	const getDashboardStatistics = async () => {
		const accessToken = useCookie('token');
		const { data } = await useFetch(baseUrl + '/auth/dashboard/getStatistic', {
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken.value,
			},
		});

		statistics.value = data.value.data;
	};

	return { statistics, getDashboardStatistics };
});
