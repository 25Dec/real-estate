import { ref, computed } from "vue";
import "hookable";
import { u as useFetch } from "./fetch-DXSGE_KZ.js";
import { d as defineStore, b as baseUrl, a as useCookie } from "../server.mjs";
import "devalue";
import "#internal/nuxt/paths";
import "destr";
import "klona";
const useProjectsStore = defineStore("Projects", () => {
  const projects = ref([]);
  const currentProject = ref({});
  const currentProjectID = ref(0);
  const projectsDropdown = ref([]);
  const setCurrentProject = (data) => {
    currentProject.value = data;
  };
  const setCurrentProjectID = (id) => {
    currentProjectID.value = id;
  };
  const currentProjectFromLocalStore = computed(() => {
    return {};
  });
  const currentProjectIDFromLocalStore = computed(() => {
    return 0;
  });
  const allProjectIDs = computed(async () => {
    await getProjects();
    return projects.value.map((project) => {
      return { name: `${project.id}`, value: project.id };
    });
  });
  const getProjects = async () => {
    const { data } = await useFetch(baseUrl + "/project", {
      headers: {
        "Content-Type": "application/json"
      }
    }, "$oDigmpGLJS");
    projects.value = data.value.data.data.filter(
      (project) => project["deleted"] == "false"
    );
    if (projects.value.length)
      projectsDropdown.value = projects.value.map((project) => {
        return {
          name: `${project["name"]}`,
          value: `${project["id"]}`
        };
      });
    else projectsDropdown.value = [];
  };
  const addNewProject = async (data) => {
    const accessToken = useCookie("token");
    const response = await $fetch(baseUrl + `/auth/project`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        access_token: accessToken
      },
      body: data
    });
    await getProjects();
    return response;
  };
  const editProject = async (data) => {
    const accessToken = useCookie("token");
    const response = await $fetch(baseUrl + `/auth/project/${data["id"]}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        access_token: accessToken.value
      },
      body: data
    });
    await getProjects();
    return response;
  };
  const deleteProject = async (data) => {
    const accessToken = useCookie("token");
    const response = await $fetch(baseUrl + `/auth/project/${data["id"]}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        access_token: accessToken.value
      }
    });
    await getProjects();
    return response;
  };
  return {
    allProjectIDs,
    projects,
    currentProject,
    currentProjectID,
    projectsDropdown,
    currentProjectFromLocalStore,
    currentProjectIDFromLocalStore,
    getProjects,
    addNewProject,
    editProject,
    deleteProject,
    setCurrentProjectID,
    setCurrentProject
  };
});
export {
  useProjectsStore as u
};
//# sourceMappingURL=projects-store-50IgnX7b.js.map
