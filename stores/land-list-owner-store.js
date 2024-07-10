import { baseUrl } from '~/constants';

export const useLandListOwnerStore = defineStore('LandListOwner', () => {
	const landListOwners = ref([]);
	const currentLandListOwner = ref({});

	const getLandListOwners = async () => {
		const accessToken = useCookie('token');
		const { data } = await useFetch(baseUrl + '/auth/landListOwner', {
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken.value,
			},
		});

		landListOwners.value = data.value.data;
	};

	const addNewLandListOwner = async (data) => {
		const accessToken = useCookie('token');
		const response = await $fetch(baseUrl + `/auth/landListOwner`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken.value,
			},
			body: data,
		});

		await getLandListOwners();
		return response;
	};

	const editLandListOwner = async (data) => {
		const accessToken = useCookie('token');
		const response = await $fetch(
			baseUrl + `/auth/landListOwner/${data['id']}`,
			{
				method: 'put',
				headers: {
					'Content-Type': 'application/json',
					access_token: accessToken.value,
				},
				body: data,
			}
		);

		await getLandListOwners();
		return response;
	};

	const deleteLandListOwner = async (data) => {
		const accessToken = useCookie('token');
		const response = await $fetch(
			baseUrl + `/auth/landListOwner/${data['id']}`,
			{
				method: 'delete',
				headers: {
					'Content-Type': 'application/json',
					access_token: accessToken.value,
				},
			}
		);

		await getLandListOwners();
		return response;
	};

	return {
		landListOwners,
		currentLandListOwner,
		getLandListOwners,
		addNewLandListOwner,
		editLandListOwner,
		deleteLandListOwner,
	};
});
