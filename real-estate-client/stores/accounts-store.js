import { baseUrl } from '~/constants';

export const useAccountsStore = defineStore('accounts', () => {
	const accounts = ref([]);

	const getAccounts = async () => {
		const accessToken = useCookie('token');
		const { data } = await useFetch(baseUrl + '/auth/account', {
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken.value,
			},
		});

		accounts.value = data.value.data;
	};

	const addNewAccount = async (data) => {
		const accessToken = useCookie('token');
		const response = await $fetch(baseUrl + `/auth/account`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken.value,
			},
			body: data,
		});

		await getAccounts();
		return response;
	};

	const editAccount = async (data) => {
		const accessToken = useCookie('token');
		const response = await $fetch(baseUrl + `/auth/account/${data['id']}`, {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken.value,
			},
			body: newCustomerData,
		});

		await getAccounts();
		return response;
	};

	const deleteAccount = async (data) => {
		const accessToken = useCookie('token');
		const response = await $fetch(baseUrl + `/auth/account/${data['id']}`, {
			method: 'delete',
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken.value,
			},
		});

		await getAccounts();
		return response;
	};

	return {
		accounts,
		getAccounts,
		addNewAccount,
		editAccount,
		deleteAccount,
	};
});
