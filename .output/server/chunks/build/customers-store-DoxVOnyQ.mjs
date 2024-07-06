import { ref } from 'vue';
import { u as useFetch } from './fetch-DXSGE_KZ.mjs';
import { d as defineStore, a as useCookie, b as baseUrl } from './server.mjs';

const useCustomersStore = defineStore("Customers", () => {
  const customers = ref([]);
  const customersDropdown = ref([]);
  const currentCustomer = ref({});
  const getCustomers = async () => {
    const accessToken = useCookie("token");
    const { data } = await useFetch(baseUrl + "/auth/customer", {
      headers: {
        "Content-Type": "application/json",
        access_token: accessToken.value
      }
    }, "$gLgo53aGxo");
    customers.value = data.value.data;
    if (data.value.data.length)
      customersDropdown.value = customers.value.map((acc) => {
        return {
          name: `${acc["display_name"]}`,
          value: `${acc["id"]}`
        };
      });
    else
      customersDropdown.value = [];
  };
  const addNewCustomer = async (data) => {
    const accessToken = useCookie("token");
    const response = await $fetch(baseUrl + `/auth/customer`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        access_token: accessToken.value
      },
      body: data
    });
    await getCustomers();
    return response;
  };
  const editCustomer = async (data) => {
    const accessToken = useCookie("token");
    const response = await $fetch(baseUrl + `/auth/customer/${data["id"]}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        access_token: accessToken.value
      },
      body: data
    });
    await getCustomers();
    return response;
  };
  const deleteCustomer = async (data) => {
    const accessToken = useCookie("token");
    const response = await $fetch(baseUrl + `/auth/customer/${data["id"]}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        access_token: accessToken.value
      }
    });
    await getCustomers();
    return response;
  };
  return {
    customers,
    customersDropdown,
    currentCustomer,
    getCustomers,
    addNewCustomer,
    editCustomer,
    deleteCustomer
  };
});

export { useCustomersStore as u };
//# sourceMappingURL=customers-store-DoxVOnyQ.mjs.map
