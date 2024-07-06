import { ref, computed } from "vue";
import "hookable";
import { u as useFetch } from "./fetch-DXSGE_KZ.js";
import { d as defineStore, a as useCookie, b as baseUrl } from "../server.mjs";
import "devalue";
import "#internal/nuxt/paths";
import "destr";
import "klona";
const useHighAreasStore = defineStore("HighAreas", () => {
  const highAreas = ref([]);
  const currentHighArea = ref({});
  const currentHighAreaID = ref(0);
  const setCurrentHighArea = (data) => {
    currentHighArea.value = data;
    currentHighAreaID.value = data.id;
  };
  const currentHighAreaIDFromLocalStore = computed(() => {
    return 0;
  });
  const getHighAreas = async () => {
    const accessToken = useCookie("token");
    const { data } = await useFetch(baseUrl + "/auth/highArea", {
      headers: {
        "Content-Type": "application/json",
        access_token: accessToken.value
      }
    }, "$TSITQciXem");
    highAreas.value = data.value.data.data;
  };
  const addNewHighArea = async (data) => {
    const accessToken = useCookie("token");
    const response = await $fetch(baseUrl + `/auth/highArea`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        access_token: accessToken.value
      },
      body: data
    });
    await getHighAreas();
    return response;
  };
  const editHighArea = async (data) => {
    const accessToken = useCookie("token");
    const response = await $fetch(baseUrl + `/auth/highArea/${data["id"]}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        access_token: accessToken.value
      },
      body: data
    });
    await getHighAreas();
    return response;
  };
  const deleteHighArea = async (data) => {
    const accessToken = useCookie("token");
    let response = "";
    try {
      response = await $fetch(baseUrl + `/auth/highArea/${data["id"]}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          access_token: accessToken.value
        }
      });
    } catch (error) {
      response = { ...error };
    }
    await getHighAreas();
    return response;
  };
  return {
    highAreas,
    currentHighArea,
    setCurrentHighArea,
    currentHighAreaIDFromLocalStore,
    getHighAreas,
    addNewHighArea,
    editHighArea,
    deleteHighArea
  };
});
export {
  useHighAreasStore as u
};
//# sourceMappingURL=high-area-store-B-d20OaI.js.map
