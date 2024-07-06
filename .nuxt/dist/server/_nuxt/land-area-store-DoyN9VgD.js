import { ref, computed } from "vue";
import "hookable";
import { u as useFetch } from "./fetch-DXSGE_KZ.js";
import { d as defineStore, a as useCookie, b as baseUrl } from "../server.mjs";
import "devalue";
import "#internal/nuxt/paths";
import "destr";
import "klona";
const useLandAreasStore = defineStore("LandAreas", () => {
  const landAreas = ref([]);
  const currentLandArea = ref({});
  const currentLandAreaID = ref(0);
  const setCurrentLandArea = (data) => {
    currentLandArea.value = data;
    currentLandAreaID.value = data.id;
  };
  const currentLandAreaIDFromLocalStore = computed(() => {
    return 0;
  });
  const getLandAreas = async () => {
    const accessToken = useCookie("token");
    const { data } = await useFetch(baseUrl + "/auth/landArea", {
      headers: {
        "Content-Type": "application/json",
        access_token: accessToken.value
      }
    }, "$U3uLO8Nwip");
    landAreas.value = data.value.data.data;
  };
  const addNewLandArea = async (data) => {
    const accessToken = useCookie("token");
    const response = await $fetch(baseUrl + `/auth/landArea`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        access_token: accessToken.value
      },
      body: data
    });
    await getLandAreas();
    return response;
  };
  const editLandArea = async (data) => {
    const accessToken = useCookie("token");
    const response = await $fetch(baseUrl + `/auth/landArea/${data["id"]}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        access_token: accessToken.value
      },
      body: data
    });
    await getLandAreas();
    return response;
  };
  const deleteLandArea = async (data) => {
    const accessToken = useCookie("token");
    let response = "";
    try {
      response = await $fetch(baseUrl + `/auth/landArea/${data["id"]}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          access_token: accessToken.value
        }
      });
    } catch (error) {
      response = { ...error };
    }
    await getLandAreas();
    return response;
  };
  return {
    landAreas,
    currentLandArea,
    setCurrentLandArea,
    currentLandAreaIDFromLocalStore,
    getLandAreas,
    addNewLandArea,
    editLandArea,
    deleteLandArea
  };
});
export {
  useLandAreasStore as u
};
//# sourceMappingURL=land-area-store-DoyN9VgD.js.map
