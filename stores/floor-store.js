import { baseUrl } from '~/constants';

export const useFloorsStore = defineStore('floors', () => {
	const floors = ref([]);
	const floorsDropdown = ref([]);
	const currentFloor = ref({});

	const getFloors = async () => {
		const accessToken = useCookie('token');
		const { data } = await useFetch(baseUrl + '/auth/floor', {
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken.value,
			},
		});

		floors.value = data.value.data.data;

		if (data.value.data.data.length)
			floorsDropdown.value = floors.value.map((payment) => {
				return {
					name: `${payment['desc']}`,
					value: `${payment['id']}`,
				};
			});
		else floorsDropdown.value = [];
	};

	const addNewFloor = async (data) => {
		const accessToken = useCookie('token');
		const response = await $fetch(baseUrl + `/auth/floor`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken.value,
			},
			body: data,
		});

		await getFloors();
		return response;
	};

	const editFloor = async (data) => {
		const accessToken = useCookie('token');
		const response = await $fetch(baseUrl + `/auth/floor/${data['id']}`, {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken.value,
			},
			body: data,
		});

		await getFloors();
		return response;
	};

	const deleteFloor = async (data) => {
		const accessToken = useCookie('token');
		let response = '';
		try {
			response = await $fetch(baseUrl + `/auth/floor/${data['id']}`, {
				method: 'delete',
				headers: {
					'Content-Type': 'application/json',
					access_token: accessToken.value,
				},
			});
		} catch (error) {
			response = { ...error };
		}

		await getFloors();
		return response;
	};

	return {
		floors,
		floorsDropdown,
		currentFloor,
		getFloors,
		addNewFloor,
		editFloor,
		deleteFloor,
	};
});
