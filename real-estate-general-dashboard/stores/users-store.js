import { baseUrl } from '~/constants';

export const useUsersStore = defineStore('users', () => {
	const users = ref([]);
	const currentUser = ref({});

	const getUsers = async () => {
		const accessToken = useCookie('token');
		const { data } = await useFetch(baseUrl + '/auth/account', {
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken.value,
			},
		});

		users.value = data.value.data;
	};

	const addNewUser = async (data) => {
		const accessToken = useCookie('token');
		const response = await $fetch(baseUrl + `/auth/account`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken.value,
			},
			body: data,
		});

		await getUsers();
		return response;
	};

	const editUser = async (data) => {
		const accessToken = useCookie('token');
		const response = await $fetch(baseUrl + `/auth/account/${data['id']}`, {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken.value,
			},
			body: data,
		});

		await getUsers();
		return response;
	};

	const deleteUser = async (data) => {
		const accessToken = useCookie('token');
		const response = await $fetch(baseUrl + `/auth/account/${data['id']}`, {
			method: 'delete',
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken.value,
			},
		});

		await getUsers();
		return response;
	};

	return {
		users,
		currentUser,
		getUsers,
		addNewUser,
		editUser,
		deleteUser,
	};
});
