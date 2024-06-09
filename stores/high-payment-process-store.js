import { baseUrl } from '~/constants';

export const useHighPaymentProcessStore = defineStore(
	'highPaymentProcess',
	() => {
		const highPaymentProcesses = ref([]);
		const currentHighPaymentProcess = ref({});

		const getHighPaymentProcesses = async () => {
			const accessToken = useCookie('token');
			const { data } = await useFetch(baseUrl + '/auth/highPaymentProcess', {
				headers: {
					'Content-Type': 'application/json',
					access_token: accessToken.value,
				},
			});

			highPaymentProcesses.value = data.value.data;
		};

		const addNewHighPaymentProcess = async (data) => {
			const accessToken = useCookie('token');
			const response = await $fetch(baseUrl + '/auth/highPaymentProcess', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
					access_token: accessToken.value,
				},
				body: data,
			});

			await getHighPaymentProcesses();
			return response;
		};

		const editHighPaymentProcess = async (data) => {
			const accessToken = useCookie('token');
			const response = await $fetch(
				baseUrl + `/auth/highPaymentProcess/${data['id']}`,
				{
					method: 'put',
					headers: {
						'Content-Type': 'application/json',
						access_token: accessToken.value,
					},
					body: data,
				}
			);

			await getHighPaymentProcesses();
			return response;
		};

		const deleteHighPaymentProcess = async (data) => {
			const accessToken = useCookie('token');
			let response = '';
			try {
				response = await $fetch(
					baseUrl + `/auth/highPaymentProcess/${data['id']}`,
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

			await getHighPaymentProcesses();
			return response;
		};

		return {
			highPaymentProcesses,
			currentHighPaymentProcess,
			getHighPaymentProcesses,
			addNewHighPaymentProcess,
			editHighPaymentProcess,
			deleteHighPaymentProcess,
		};
	}
);
