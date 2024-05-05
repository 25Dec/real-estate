import { baseUrl } from "~/constants";

export const useZonesStore = defineStore("zones", () => {
  const zones = ref([]);
  const currentZone = ref({});

  const getZones = async () => {
    const accessToken = useCookie("token");
    const { currentProjectIDFromLocalStore } = storeToRefs(useProjectsStore());
    const { data } = await useFetch(baseUrl + "/auth/zone", {
      headers: {
        "Content-Type": "application/json",
        access_token: accessToken.value,
      },
    });

    zones.value = data.value.data.data.filter((zone) => {
      return zone["project_id"] == currentProjectIDFromLocalStore.value;
    });
  };

  const addNewZone = async (data) => {
    const accessToken = useCookie("token");
    const response = await $fetch(baseUrl + `/auth/zone`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        access_token: accessToken.value,
      },
      body: data,
    });

    await getZones();
    return response;
  };

  const editZone = async (data) => {
    const accessToken = useCookie("token");
    const response = await $fetch(baseUrl + `/auth/zone/${data["id"]}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        access_token: accessToken.value,
      },
      body: data,
    });

    await getZones();
    return response;
  };

  const deleteZone = async (data) => {
    const accessToken = useCookie("token");
    const response = await $fetch(baseUrl + `/auth/zone/${data["id"]}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        access_token: accessToken.value,
      },
    });

    await getZones();
    return response;
  };

  return {
    zones,
    currentZone,
    getZones,
    addNewZone,
    editZone,
    deleteZone,
  };
});
