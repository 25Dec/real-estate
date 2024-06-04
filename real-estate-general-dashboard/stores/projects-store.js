import { baseUrl } from '~/constants';

export const useProjectsStore = defineStore('projects', () => {
	const projects = ref([]);
	const currentProject = ref({});
	const currentProjectID = ref(0);

	const setCurrentProject = (data) => {
		currentProject.value = data;
		if (process.client) {
			localStorage.setItem('currentProject', JSON.stringify(data));
		}
	};

	const setCurrentProjectID = (id) => {
		currentProjectID.value = id;
		if (process.client) {
			localStorage.setItem('currentProjectID', id);
		}
	};

	const currentProjectFromLocalStore = computed(() => {
		if (process.client && localStorage.getItem('currentProject')) {
			currentProject.value = JSON.parse(localStorage.getItem('currentProject'));
			return currentProject.value;
		}
		return {};
	});

	const currentProjectIDFromLocalStore = computed(() => {
		if (process.client && localStorage.getItem('currentProjectID')) {
			currentProjectID.value = JSON.parse(
				localStorage.getItem('currentProjectID')
			);
			return currentProjectID.value;
		}
		return 0;
	});

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

		projects.value = data.value.data.data.filter(
			(project) => project['deleted'] == 'false'
		);
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

	return {
		allProjectIDs,
		projects,
		currentProject,
		currentProjectID,
		currentProjectFromLocalStore,
		currentProjectIDFromLocalStore,
		getProjects,
		addNewProject,
		editProject,
		deleteProject,
		setCurrentProjectID,
		setCurrentProject,
	};
});
