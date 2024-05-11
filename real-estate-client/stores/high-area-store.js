import { baseUrl } from '~/constants';

export const useHighAreasStore = defineStore('highAreas', () => {
	const highAreas = ref([]);
	const currentHighArea = ref({});

	const getHighAreas = async () => {
		const accessToken = useCookie('token');
		const { data } = await useFetch(baseUrl + '/auth/highArea', {
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken.value,
			},
		});

		highAreas.value = data.value.data.data;
	};

	const addNewHighArea = async (data) => {
		const accessToken = useCookie('token');
		const response = await $fetch(baseUrl + `/auth/highArea`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken.value,
			},
			body: data,
		});

		await getHighAreas();
		return response;
	};

	const editHighArea = async (data) => {
		const accessToken = useCookie('token');
		const response = await $fetch(baseUrl + `/auth/highArea/${data['id']}`, {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken.value,
			},
			body: data,
		});

		await getHighAreas();
		return response;
	};

	const deleteHighArea = async (data) => {
		const accessToken = useCookie('token');
		let response = '';
		try {
			response = await $fetch(baseUrl + `/auth/highArea/${data['id']}`, {
				method: 'delete',
				headers: {
					'Content-Type': 'application/json',
					access_token: accessToken.value,
				},
			});
		} catch (error) {
			response = { ...error };
		}

		await getHighAreas();
		return response;
	};

	return {
		highAreas,
		currentHighArea,
		getHighAreas,
		addNewHighArea,
		editHighArea,
		deleteHighArea,
	};
});
