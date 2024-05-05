import { defineStore } from 'pinia';
import { baseUrl } from '~/constants';

export const useAuthStore = defineStore('auth', () => {
	const authenticated = ref(false);
	const user = ref({});
	const userToken = ref('');

	const authenticateUser = async (loginName, password) => {
		try {
			const { data } = await $fetch(baseUrl + '/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: {
					login_name: loginName,
					password,
				},
			});

			if (data != null) {
				const token = useCookie('token');
				token.value = data.token;
				user.value = data;
				localStorage.setItem('user', JSON.stringify(data));
				authenticated.value = true;
			}
		} catch (error) {
			authenticated.value = false;
		}
	};

	const logUserOut = () => {
		const token = useCookie('token');
		authenticated.value = false;
		token.value = null;
		localStorage.removeItem('user');
	};

	return { authenticated, user, authenticateUser, logUserOut };
});
