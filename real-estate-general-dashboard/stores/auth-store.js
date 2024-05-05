import { defineStore } from 'pinia';
import { baseUrl } from '~/constants';

export const useAuthStore = defineStore('auth', {
	state: () => ({
		authenticated: false,
		user: {},
	}),
	actions: {
		async authenticateUser(loginName, password) {
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
					this.user = data;
					localStorage.setItem('user', JSON.stringify(data));
					this.authenticated = true;
				}
			} catch (error) {
				this.authenticated = false;
			}
		},
		logUserOut() {
			const token = useCookie('token');
			this.authenticated = false;
			token.value = null;
			localStorage.removeItem('user');
		},
	},
});
