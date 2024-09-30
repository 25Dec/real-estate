import { baseUrl } from '~/constants';

export const useLandContractStore = defineStore('LandContract', () => {
	const landContracts = ref([]);
	const currentLandContract = ref({});

	const getLandContracts = async () => {
		const accessToken = useCookie('token');
		const { data } = await useFetch(baseUrl + '/auth/landBooking', {
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken.value,
			},
		});

		landContracts.value = data.value.data;
	};

	const addNewLandContract = async (data) => {
		const accessToken = useCookie('token');
		const response = await $fetch(baseUrl + `/auth/landBooking`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken.value,
			},
			body: data,
		});

		await getLandContracts();
		return response;
	};

	const editLandContract = async (data) => {
		const accessToken = useCookie('token');
		const response = await $fetch(baseUrl + `/auth/landBooking/${data['id']}`, {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken.value,
			},
			body: data,
		});

		await getLandContracts();
		return response;
	};

	const deleteLandContract = async (data) => {
		const accessToken = useCookie('token');
		const response = await $fetch(baseUrl + `/auth/landBooking/${data['id']}`, {
			method: 'delete',
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken.value,
			},
		});

		await getLandContracts();
		return response;
	};

	return {
		landContracts,
		currentLandContract,
		getLandContracts,
		addNewLandContract,
		editLandContract,
		deleteLandContract,
	};
});
