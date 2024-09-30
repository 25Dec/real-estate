import { baseUrl } from '~/constants';

export const useNotificationsStore = defineStore('Notifications', () => {
	const notifications = ref([]);
	const currentNotification = ref({});

	const getNotifications = async () => {
		const accessToken = useCookie('token');
		const { currentProjectID } = storeToRefs(useProjectsStore());

		const { data } = await useFetch(baseUrl + '/auth/message', {
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken.value,
			},
		});

		notifications.value = data.value.data.data;
	};

	const addNewNotification = async (data) => {
		const accessToken = useCookie('token');
		const response = await $fetch(baseUrl + `/auth/message`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken.value,
			},
			body: data,
		});

		await getNotifications();
		return response;
	};

	const editNotification = async (data) => {
		const accessToken = useCookie('token');
		const response = await $fetch(baseUrl + `/auth/message/${data['id']}`, {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken.value,
			},
			body: data,
		});

		await getNotifications();
		return response;
	};

	const deleteNotification = async (data) => {
		const accessToken = useCookie('token');
		const response = await $fetch(baseUrl + `/auth/message/${data['id']}`, {
			method: 'delete',
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken.value,
			},
		});

		await getNotifications();
		return response;
	};

	return {
		notifications,
		currentNotification,
		getNotifications,
		addNewNotification,
		editNotification,
		deleteNotification,
	};
});
