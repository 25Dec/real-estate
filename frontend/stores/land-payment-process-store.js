import { baseUrl } from '~/constants';

export const useLandPaymentProcessStore = defineStore(
	'LandPaymentProcess',
	() => {
		const landPaymentProcesses = ref([]);
		const currentLandPaymentProcess = ref({});

		const getLandPaymentProcesses = async () => {
			const accessToken = useCookie('token');
			const { data } = await useFetch(baseUrl + '/auth/landPaymentProcess', {
				headers: {
					'Content-Type': 'application/json',
					access_token: accessToken.value,
				},
			});

			landPaymentProcesses.value = data.value.data;
		};

		const addNewLandPaymentProcess = async (data) => {
			const accessToken = useCookie('token');
			const response = await $fetch(baseUrl + '/auth/landPaymentProcess', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
					access_token: accessToken.value,
				},
				body: data,
			});

			await getLandPaymentProcesses();
			return response;
		};

		const editLandPaymentProcess = async (data) => {
			const accessToken = useCookie('token');
			const response = await $fetch(
				baseUrl + `/auth/landPaymentProcess/${data['id']}`,
				{
					method: 'put',
					headers: {
						'Content-Type': 'application/json',
						access_token: accessToken.value,
					},
					body: data,
				}
			);

			await getLandPaymentProcesses();
			return response;
		};

		const deleteLandPaymentProcess = async (data) => {
			const accessToken = useCookie('token');
			let response = '';
			try {
				response = await $fetch(
					baseUrl + `/auth/landPaymentProcess/${data['id']}`,
					{
						method: 'delete',
						headers: {
							'Content-Type': 'application/json',
							access_token: accessToken.value,
						},
					}
				);
			} catch (error) {
				response = { ...error };
			}

			await getLandPaymentProcesses();
			return response;
		};

		return {
			landPaymentProcesses,
			currentLandPaymentProcess,
			getLandPaymentProcesses,
			addNewLandPaymentProcess,
			editLandPaymentProcess,
			deleteLandPaymentProcess,
		};
	}
);
