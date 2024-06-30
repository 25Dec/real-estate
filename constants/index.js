export const baseUrl = 'http://localhost:3003/v1';

export const ROLES = Object.freeze({
	anonymous: 'anonymous',
	admin: 'admin',
	super_admin: 'super_admin',
	sale_manager: 'sale_manager',
	sale: 'sale',
});

export const landingPageAboutUsContents = [
	{ title: 'Real Estate Management', icon: 'ion:home-outline' },
	{
		title: 'Interactive Viewer',
		icon: 'material-symbols:interactive-space-outline',
	},
	{ title: 'Payment Management', icon: 'streamline:payment-10' },
	{ title: 'CRM Service', icon: 'streamline:information-desk-customer' },
];

export const landingPageServicesContent = [
	{
		image: '/images/dashboard.png',
		title: 'Dashboard System',
		content:
			'Provide methods for project, user, and notification management. Manage all projects, users, and notifications in each project within the system.',
		action: {
			goto: {
				path: 'admin',
				external: false,
			},
		},
	},
	{
		image: '/images/detail_project_support.png',
		title: 'Detailed Project Support For Sales',
		content:
			'Provide project, CRM, and sales processes in a project. Support the sales department to enhance performance.',
		action: {
			goto: {
				path: '#projects',
				external: true,
			},
		},
	},
];
