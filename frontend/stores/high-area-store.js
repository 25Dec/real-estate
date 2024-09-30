import { baseUrl } from '~/constants';

export const useHighAreasStore = defineStore('HighAreas', () => {
	const highAreas = ref([]);
	const currentHighArea = ref({});
	const currentHighAreaID = ref(0);

	const setCurrentHighArea = (data) => {
		currentHighArea.value = data;
		currentHighAreaID.value = data.id;
		if (process.client) {
			localStorage.setItem('currentHighAreaID', data.id);
			localStorage.setItem('currentHighArea', JSON.stringify(data));
		}
	};

	const currentHighAreaFromLocalStore = computed(() => {
		if (process.client && localStorage.getItem('currentHighArea')) {
			currentHighArea.value = JSON.parse(
				localStorage.getItem('currentHighArea')
			);
			return currentHighArea.value;
		}
		return {};
	});

	const currentHighAreaIDFromLocalStore = computed(() => {
		if (process.client && localStorage.getItem('currentHighAreaID')) {
			currentHighAreaID.value = localStorage.getItem('currentHighAreaID');
			return currentHighAreaID.value;
		}
		return 0;
	});

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
		setCurrentHighArea,
		currentHighAreaIDFromLocalStore,
		currentHighAreaFromLocalStore,
		getHighAreas,
		addNewHighArea,
		editHighArea,
		deleteHighArea,
	};
});
