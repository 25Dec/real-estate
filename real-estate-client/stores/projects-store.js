import { baseUrl } from '~/constants';

export const useProjectsStore = defineStore('projects', () => {
	const projects = ref([]);
	const currentProjectID = ref(0);

	const allProjectIDs = computed(async () => {
		await getProjects();
		return projects.value.map((project) => {
			return { name: `${project.id}`, value: project.id };
		});
	});

	const getProjects = async () => {
		const { data } = await useFetch(baseUrl + '/project', {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		projects.value = data.value.data.data;
	};

	const addNewProject = async (data) => {
		const accessToken = useCookie('token');
		const response = await $fetch(baseUrl + `/auth/project`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken,
			},
			body: data,
		});

		await getProjects();
		return response;
	};

	const editProject = async (data) => {
		const accessToken = useCookie('token');
		const response = await $fetch(baseUrl + `/auth/project/${data['id']}`, {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken.value,
			},
			body: data,
		});

		await getProjects();
		return response;
	};

	const deleteProject = async (data) => {
		const accessToken = useCookie('token');
		const response = await $fetch(baseUrl + `/auth/project/${data['id']}`, {
			method: 'delete',
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken.value,
			},
		});

		await getProjects();
		return response;
	};

	const setCurrentProjectID = (id) => {
		currentProjectID.value = id;
		if (process.client) {
			localStorage.setItem('currentProjectID', id);
		}
	};

	const currentProjectIDFromLocalStore = computed(() => {
		if (process.client && localStorage.getItem('currentProjectID')) {
			currentProjectID.value = localStorage.getItem('currentProjectID');
			return currentProjectID.value;
		}
		return 0;
	});

	return {
		projects,
		allProjectIDs,
		currentProjectID,
		currentProjectIDFromLocalStore,
		getProjects,
		addNewProject,
		editProject,
		deleteProject,
		setCurrentProjectID,
	};
});
