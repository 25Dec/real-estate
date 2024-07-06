import { ref } from "vue";
import "hookable";
import { u as useFetch } from "./fetch-DXSGE_KZ.js";
import { d as defineStore, a as useCookie, b as baseUrl } from "../server.mjs";
import "devalue";
import "#internal/nuxt/paths";
import "destr";
import "klona";
const usePaymentMethodsProcessStore = defineStore(
  "PaymentMethodsProcess",
  () => {
    const paymentMethodsProcess = ref([]);
    const currentPaymentMethodProcess = ref({});
    const getPaymentMethodsProcess = async () => {
      const accessToken = useCookie("token");
      const { data } = await useFetch(baseUrl + "/auth/paymentMethodProcess", {
        headers: {
          "Content-Type": "application/json",
          access_token: accessToken.value
        }
      }, "$O3PekYtdTV");
      paymentMethodsProcess.value = data.value.data;
    };
    const addNewPaymentMethodProcess = async (data) => {
      const accessToken = useCookie("token");
      const response = await $fetch(baseUrl + `/auth/paymentMethodProcess`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          access_token: accessToken.value
        },
        body: data
      });
      await getPaymentMethods();
      return response;
    };
    const editPaymentMethodProcess = async (data) => {
      const accessToken = useCookie("token");
      const response = await $fetch(
        baseUrl + `/auth/paymentMethodProcess/${data["id"]}`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            access_token: accessToken.value
          },
          body: data
        }
      );
      await getPaymentMethodsProcess();
      return response;
    };
    const deletePaymentMethodProcess = async (data) => {
      const accessToken = useCookie("token");
      const response = await $fetch(
        baseUrl + `/auth/paymentMethodProcess/${data["id"]}`,
        {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            access_token: accessToken.value
          }
        }
      );
      await getPaymentMethodsProcess();
      return response;
    };
    return {
      paymentMethodsProcess,
      currentPaymentMethodProcess,
      getPaymentMethodsProcess,
      addNewPaymentMethodProcess,
      editPaymentMethodProcess,
      deletePaymentMethodProcess
    };
  }
);
export {
  usePaymentMethodsProcessStore as u
};
//# sourceMappingURL=payment-method-process-store-Dt8EidVY.js.map
