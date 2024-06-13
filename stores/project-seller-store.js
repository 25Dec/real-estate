import { baseUrl } from '~/constants';

export const useProjectSellerStore = defineStore('ProjectSeller', () => {
	const projectSeller = ref([]);
	const currentProjectSeller = ref({});

	const getProjectSeller = async () => {
		const accessToken = useCookie('token');
		const { data } = await useFetch(baseUrl + '/auth/projectAccount', {
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken.value,
			},
		});

		projectSeller.value = data.value.data.data;
	};

	const coordinateProjectSeller = async (data) => {
		const accessToken = useCookie('token');
		const response = await $fetch(baseUrl + '/auth/projectAccount', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken.value,
			},
			body: data,
		});

		await getProjectSeller();
		return response;
	};

	const editProjectSeller = async (data) => {
		const accessToken = useCookie('token');
		const response = await $fetch(
			baseUrl + `/auth/projectAccount/${data['id']}`,
			{
				method: 'put',
				headers: {
					'Content-Type': 'application/json',
					access_token: accessToken.value,
				},
				body: data,
			}
		);

		await getProjectSeller();
		return response;
	};

	const deleteProjectSeller = async (data) => {
		const accessToken = useCookie('token');
		const response = await $fetch(
			baseUrl + `/auth/projectAccount/${data['id']}`,
			{
				method: 'delete',
				headers: {
					'Content-Type': 'application/json',
					access_token: accessToken.value,
				},
			}
		);

		await getProjectSeller();
		return response;
	};

	return {
		projectSeller,
		currentProjectSeller,
		getProjectSeller,
		coordinateProjectSeller,
		editProjectSeller,
		deleteProjectSeller,
	};
});
