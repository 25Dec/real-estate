import { baseUrl } from '~/constants';

export const useLandAreasStore = defineStore('landAreas', () => {
	const landAreas = ref([]);
	const currentLandArea = ref({});

	const getLandAreas = async () => {
		const accessToken = useCookie('token');
		const { data } = await useFetch(baseUrl + '/auth/landArea', {
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken.value,
			},
		});

		landAreas.value = data.value.data.data;
	};

	const addNewLandArea = async (data) => {
		const accessToken = useCookie('token');
		const response = await $fetch(baseUrl + `/auth/landArea`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken.value,
			},
			body: data,
		});

		await getLandAreas();
		return response;
	};

	const editLandArea = async (data) => {
		const accessToken = useCookie('token');
		const response = await $fetch(baseUrl + `/auth/landArea/${data['id']}`, {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken.value,
			},
			body: data,
		});

		await getLandAreas();
		return response;
	};

	const deleteLandArea = async (data) => {
		const accessToken = useCookie('token');
		let response = '';
		try {
			response = await $fetch(baseUrl + `/auth/landArea/${data['id']}`, {
				method: 'delete',
				headers: {
					'Content-Type': 'application/json',
					access_token: accessToken.value,
				},
			});
		} catch (error) {
			response = { ...error };
		}

		await getLandAreas();
		return response;
	};

	return {
		landAreas,
		currentLandArea,
		getLandAreas,
		addNewLandArea,
		editLandArea,
		deleteLandArea,
	};
});
