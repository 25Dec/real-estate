import { baseUrl } from '~/constants';

export const useAccountsStore = defineStore('Accounts', () => {
	const accounts = ref([]);
	const accountsDropdown = ref([]);
	const currentAccount = ref({});

	const getAccounts = async () => {
		const accessToken = useCookie('token');
		const { data } = await useFetch(baseUrl + '/auth/account', {
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken.value,
			},
		});

		accounts.value = data.value.data;

		if (data.value.data.length)
			accountsDropdown.value = accounts.value.map((acc) => {
				return {
					name: `${acc['display_name']}`,
					value: `${acc['id']}`,
				};
			});
		else accountsDropdown.value = [];
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
			body: data,
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
		accountsDropdown,
		currentAccount,
		getAccounts,
		addNewAccount,
		editAccount,
		deleteAccount,
	};
});
