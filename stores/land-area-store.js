import { baseUrl } from '~/constants';

export const useLandAreasStore = defineStore('LandAreas', () => {
	const landAreas = ref([]);
	const currentLandArea = ref({});
	const currentLandAreaID = ref(0);

	const setCurrentLandArea = (data) => {
		currentLandArea.value = data;
		currentLandAreaID.value = data.id;
		if (process.client) {
			localStorage.setItem('currentLandAreaID', data.id);
		}
	};

	const currentLandAreaIDFromLocalStore = computed(() => {
		if (process.client && localStorage.getItem('currentLandAreaID')) {
			currentLandAreaID.value = localStorage.getItem('currentLandAreaID');
			return currentLandAreaID.value;
		}
		return 0;
	});

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
		setCurrentLandArea,
		currentLandAreaIDFromLocalStore,
		getLandAreas,
		addNewLandArea,
		editLandArea,
		deleteLandArea,
	};
});
