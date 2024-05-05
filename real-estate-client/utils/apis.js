import { baseUrl } from '~/constants';

export const usePaymentMethodFetching = async (accessToken) => {
	const { data } = await useFetch(baseUrl + '/auth/paymentMethod', {
		headers: {
			'Content-Type': 'application/json',
			access_token: accessToken,
		},
	});

	return data.value.data;
};

export const usePaymentMethodProcessFetching = async (accessToken) => {
	const { data } = await useFetch(baseUrl + '/auth/paymentMethodProcess', {
		headers: {
			'Content-Type': 'application/json',
			access_token: accessToken,
		},
	});

	return data.value.data;
};

export const useZonesFetching = async (accessToken) => {
	const { data } = await useFetch(baseUrl + '/auth/zone', {
		headers: {
			'Content-Type': 'application/json',
			access_token: accessToken,
		},
	});

	return data.value.data.data;
};

export const useBlocksFetching = async (accessToken) => {
	const { data } = await useFetch(baseUrl + '/auth/block', {
		headers: {
			'Content-Type': 'application/json',
			access_token: accessToken,
		},
	});

	return data.value.data.data;
};

export const useFloorsFetching = async (accessToken) => {
	const { data } = await useFetch(baseUrl + '/auth/floor', {
		headers: {
			'Content-Type': 'application/json',
			access_token: accessToken,
		},
	});

	return data.value.data.data;
};

export const useLandAreasFetching = async (accessToken) => {
	const { data } = await useFetch(baseUrl + '/auth/landArea', {
		headers: {
			'Content-Type': 'application/json',
			access_token: accessToken,
		},
	});

	return data.value.data.data;
};
