import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/stores/auth-store';

// ENUM('anonymous', 'admin', 'super_admin', 'sale_manager', 'sale');

export default defineNuxtRouteMiddleware((to) => {
	const { authenticated, user } = storeToRefs(useAuthStore());
	const token = useCookie('token');

	// Chưa login, muốn đến pj_details (admin) --> quay về login
	if (
		!token.value &&
		(to?.name.includes('project_details') || to?.name.includes('admin'))
	) {
		abortNavigation();
		return navigateTo('/login');
	}

	if (token.value) {
		authenticated.value = true;
	}

	// Đã login, muốn đến login --> quay về landing page
	if (token.value && to?.name === 'login') {
		return navigateTo('/');
	}

	// Đã login, muốn đến pj_details, nhưng ko phải sale (sale_manager) --> quay về landing page
	// if (
	// 	token.value &&
	// 	to?.name.includes('project_details') &&
	// 	user.value['type'] != 'sale' &&
	// 	user.value['type'] != 'sale_manager'
	// ) {
	// 	abortNavigation();
	// 	return navigateTo('/');
	// }

	// Đã login, muốn đến dashboard, nhưng ko phải admin (super_admin, sale_manager) --> quay về landing page
	if (
		token.value &&
		to?.name.includes('admin') &&
		user.value['type'] != 'admin' &&
		user.value['type'] == 'super_admin' &&
		user.value['type'] == 'sale_manager'
	) {
		abortNavigation();
		return navigateTo('/');
	}
});
