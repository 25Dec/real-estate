import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/stores/auth-store';

export default defineNuxtRouteMiddleware((to) => {
	const { authenticated } = storeToRefs(useAuthStore());
	const token = useCookie('token');

	if (token.value) {
		authenticated.value = true;
	}

	if (token.value && to?.name === 'login') {
		return navigateTo('/');
	}

	if (!token.value && to?.name.includes('project_details')) {
		abortNavigation();
		return navigateTo('/login');
	}
});
