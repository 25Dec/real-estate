import { defineStore } from 'pinia';
import { baseUrl } from '~/constants';

export const useAuthStore = defineStore('Auth', () => {
	const authenticated = ref(false);
	const user = ref({});

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
		token.value = null;
		user.value = null;
		localStorage.removeItem('user');
		authenticated.value = false;
	};

	return { authenticated, user, authenticateUser, logUserOut };
});
