import { baseUrl } from '~/constants';

export const useHighListOwnerStore = defineStore('HighListOwner', () => {
	const highListOwners = ref([]);
	const currentHighListOwner = ref({});

	const getHighListOwners = async () => {
		const accessToken = useCookie('token');
		const { data } = await useFetch(baseUrl + '/auth/highListOwner', {
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken.value,
			},
		});

		highListOwners.value = data.value.data;
	};

	const addNewHighListOwner = async (data) => {
		const accessToken = useCookie('token');
		const response = await $fetch(baseUrl + `/auth/highListOwner`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken.value,
			},
			body: data,
		});

		await getHighListOwners();
		return response;
	};

	const editHighListOwner = async (data) => {
		const accessToken = useCookie('token');
		const response = await $fetch(
			baseUrl + `/auth/highListOwner/${data['id']}`,
			{
				method: 'put',
				headers: {
					'Content-Type': 'application/json',
					access_token: accessToken.value,
				},
				body: data,
			}
		);

		await getHighListOwners();
		return response;
	};

	const deleteHighListOwner = async (data) => {
		const accessToken = useCookie('token');
		const response = await $fetch(
			baseUrl + `/auth/highListOwner/${data['id']}`,
			{
				method: 'delete',
				headers: {
					'Content-Type': 'application/json',
					access_token: accessToken.value,
				},
			}
		);

		await getHighListOwners();
		return response;
	};

	return {
		highListOwners,
		currentHighListOwner,
		getHighListOwners,
		addNewHighListOwner,
		editHighListOwner,
		deleteHighListOwner,
	};
});
