import { baseUrl } from '~/constants';

export const useCustomersStore = defineStore('customers', () => {
	const customers = ref([]);
	const currentCustomer = ref({});

	const getCustomers = async () => {
		const accessToken = useCookie('token');
		const { data } = await useFetch(baseUrl + '/auth/account', {
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken.value,
			},
		});

		customers.value = data.value.data;
	};

	const addNewCustomer = async (data) => {
		const accessToken = useCookie('token');
		const response = await $fetch(baseUrl + `/auth/account`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken.value,
			},
			body: data,
		});

		await getCustomers();
		return response;
	};

	const editCustomer = async (data) => {
		const accessToken = useCookie('token');
		const response = await $fetch(baseUrl + `/auth/account/${data['id']}`, {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken.value,
			},
			body: data,
		});

		await getCustomers();
		return response;
	};

	const deleteCustomer = async (data) => {
		const accessToken = useCookie('token');
		const response = await $fetch(baseUrl + `/auth/account/${data['id']}`, {
			method: 'delete',
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken.value,
			},
		});

		await getCustomers();
		return response;
	};

	return {
		customers,
		currentCustomer,
		getCustomers,
		addNewCustomer,
		editCustomer,
		deleteCustomer,
	};
});
