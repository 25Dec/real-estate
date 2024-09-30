import { baseUrl } from '~/constants';

export const useZonesStore = defineStore('Zones', () => {
	const zones = ref([]);
	const zonesDropdown = ref([]);
	const currentZoneID = ref(0);
	const currentZone = ref({});

	const setCurrentZone = (data) => {
		currentZone.value = data;
		if (process.client) {
			localStorage.setItem('currentZone', JSON.stringify(data));
		}
	};

	const setCurrentZoneID = (id) => {
		currentZoneID.value = id;
		if (process.client) {
			localStorage.setItem('currentZoneID', id);
		}
	};

	const currentZoneFromLocalStore = computed(() => {
		if (process.client && localStorage.getItem('currentZone')) {
			currentZone.value = JSON.parse(localStorage.getItem('currentZone'));
			return currentZone.value;
		}
		return {};
	});

	const currentZoneIDFromLocalStore = computed(() => {
		if (process.client && localStorage.getItem('currentZoneID')) {
			currentZoneID.value = JSON.parse(localStorage.getItem('currentZoneID'));
			return currentZoneID.value;
		}
		return 0;
	});

	const getZones = async () => {
		const accessToken = useCookie('token');
		const { currentProjectIDFromLocalStore } = storeToRefs(useProjectsStore());
		const { data } = await useFetch(baseUrl + '/auth/zone', {
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken.value,
			},
		});

		zones.value = data.value.data.data.filter((zone) => {
			return zone['project_id'] == currentProjectIDFromLocalStore.value;
		});

		if (data.value.data.data.length)
			zonesDropdown.value = zones.value.map((payment) => {
				return {
					name: `${payment['name']}`,
					value: `${payment['id']}`,
				};
			});
		else zonesDropdown.value = [];
	};

	const addNewZone = async (data) => {
		const accessToken = useCookie('token');
		const response = await $fetch(baseUrl + `/auth/zone`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken.value,
			},
			body: data,
		});

		await getZones();
		return response;
	};

	const editZone = async (data) => {
		const accessToken = useCookie('token');
		const response = await $fetch(baseUrl + `/auth/zone/${data['id']}`, {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken.value,
			},
			body: data,
		});

		await getZones();
		return response;
	};

	const deleteZone = async (data) => {
		const accessToken = useCookie('token');
		const response = await $fetch(baseUrl + `/auth/zone/${data['id']}`, {
			method: 'delete',
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken.value,
			},
		});

		await getZones();
		return response;
	};

	return {
		zones,
		zonesDropdown,
		currentZone,
		currentZoneID,
		currentZoneFromLocalStore,
		currentZoneIDFromLocalStore,
		setCurrentZone,
		setCurrentZoneID,
		getZones,
		addNewZone,
		editZone,
		deleteZone,
	};
});
