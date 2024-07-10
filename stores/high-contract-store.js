import { baseUrl } from '~/constants';

export const useHighContractStore = defineStore('HighContract', () => {
	const highContracts = ref([]);
	const currentHighContract = ref({});

	const getHighContracts = async () => {
		const accessToken = useCookie('token');
		const { data } = await useFetch(baseUrl + '/auth/highBooking', {
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken.value,
			},
		});

		highContracts.value = data.value.data;
	};

	const addNewHighContract = async (data) => {
		const accessToken = useCookie('token');
		const response = await $fetch(baseUrl + `/auth/highBooking`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken.value,
			},
			body: data,
		});

		await getHighContracts();
		return response;
	};

	const editHighContract = async (data) => {
		const accessToken = useCookie('token');
		const response = await $fetch(baseUrl + `/auth/highBooking/${data['id']}`, {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken.value,
			},
			body: data,
		});

		await getHighContracts();
		return response;
	};

	const deleteHighContract = async (data) => {
		const accessToken = useCookie('token');
		const response = await $fetch(baseUrl + `/auth/highBooking/${data['id']}`, {
			method: 'delete',
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken.value,
			},
		});

		await getHighContracts();
		return response;
	};

	return {
		highContracts,
		currentHighContract,
		getHighContracts,
		addNewHighContract,
		editHighContract,
		deleteHighContract,
	};
});
