import { baseUrl } from '~/constants';

export const usePaymentMethodsStore = defineStore('PaymentMethods', () => {
	const paymentMethods = ref([]);
	const paymentMethodsDropdown = ref([]);
	const currentPaymentMethod = ref({});

	const getPaymentMethods = async () => {
		const accessToken = useCookie('token');
		const { currentProjectID } = storeToRefs(useProjectsStore());

		const { data } = await useFetch(baseUrl + '/auth/paymentMethod', {
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken.value,
			},
		});

		paymentMethods.value = data.value.data.filter(
			(payment) => payment['project_id'] == currentProjectID.value
		);

		if (data.value.data.length)
			paymentMethodsDropdown.value = paymentMethods.value.map((payment) => {
				return {
					name: `${payment['method_name']}`,
					value: `${payment['id']}`,
				};
			});
		else paymentMethodsDropdown.value = [];
	};

	const addNewPaymentMethod = async (data) => {
		const accessToken = useCookie('token');
		const response = await $fetch(baseUrl + `/auth/paymentMethod`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken.value,
			},
			body: data,
		});

		await getPaymentMethods();
		return response;
	};

	const editPaymentMethod = async (data) => {
		const accessToken = useCookie('token');
		const response = await $fetch(
			baseUrl + `/auth/paymentMethod/${data['id']}`,
			{
				method: 'put',
				headers: {
					'Content-Type': 'application/json',
					access_token: accessToken.value,
				},
				body: data,
			}
		);

		await getPaymentMethods();
		return response;
	};

	const deletePaymentMethod = async (data) => {
		const accessToken = useCookie('token');
		const response = await $fetch(
			baseUrl + `/auth/paymentMethod/${data['id']}`,
			{
				method: 'delete',
				headers: {
					'Content-Type': 'application/json',
					access_token: accessToken.value,
				},
			}
		);

		await getPaymentMethods();
		return response;
	};

	return {
		paymentMethods,
		paymentMethodsDropdown,
		currentPaymentMethod,
		getPaymentMethods,
		addNewPaymentMethod,
		editPaymentMethod,
		deletePaymentMethod,
	};
});
