import script from "./dialog.esm-Wemb0g_v.js";
import script$1 from "./inputnumber.esm-CMvh_h4P.js";
import script$2 from "./dropdown.esm-BZz-eegH.js";
import script$3 from "./button.esm-D8sVcJb8.js";
import { ref, mergeProps, unref, isRef, withCtx, createVNode, useSSRContext } from "vue";
import "hookable";
import "destr";
import "klona";
import "devalue";
import "#internal/nuxt/paths";
import { d as defineStore, a as useCookie, b as baseUrl, s as storeToRefs, u as useToast } from "../server.mjs";
import { u as useCustomersStore } from "./customers-store-DoxVOnyQ.js";
import { u as useLandAreasStore } from "./land-area-store-DoyN9VgD.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { u as useFetch } from "./fetch-DXSGE_KZ.js";
const useLandPaymentProcessStore = defineStore(
  "LandPaymentProcess",
  () => {
    const landPaymentProcesses = ref([]);
    const currentLandPaymentProcess = ref({});
    const getLandPaymentProcesses = async () => {
      const accessToken = useCookie("token");
      const { data } = await useFetch(baseUrl + "/auth/landPaymentProcess", {
        headers: {
          "Content-Type": "application/json",
          access_token: accessToken.value
        }
      }, "$Vkvx2xlAzg");
      landPaymentProcesses.value = data.value.data;
    };
    const addNewLandPaymentProcess = async (data) => {
      const accessToken = useCookie("token");
      const response = await $fetch(baseUrl + "/auth/landPaymentProcess", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          access_token: accessToken.value
        },
        body: data
      });
      await getLandPaymentProcesses();
      return response;
    };
    const editLandPaymentProcess = async (data) => {
      const accessToken = useCookie("token");
      const response = await $fetch(
        baseUrl + `/auth/landPaymentProcess/${data["id"]}`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            access_token: accessToken.value
          },
          body: data
        }
      );
      await getLandPaymentProcesses();
      return response;
    };
    const deleteLandPaymentProcess = async (data) => {
      const accessToken = useCookie("token");
      let response = "";
      try {
        response = await $fetch(
          baseUrl + `/auth/landPaymentProcess/${data["id"]}`,
          {
            method: "delete",
            headers: {
              "Content-Type": "application/json",
              access_token: accessToken.value
            }
          }
        );
      } catch (error) {
        response = { ...error };
      }
      await getLandPaymentProcesses();
      return response;
    };
    return {
      landPaymentProcesses,
      currentLandPaymentProcess,
      getLandPaymentProcesses,
      addNewLandPaymentProcess,
      editLandPaymentProcess,
      deleteLandPaymentProcess
    };
  }
);
const _sfc_main$2 = {
  __name: "CreateLandPaymentProcessDialog",
  __ssrInlineRender: true,
  props: ["visible", "statuses"],
  setup(__props) {
    const { visible, statuses } = __props;
    const { customersDropdown: submitters } = storeToRefs(useCustomersStore());
    const { currentLandAreaIDFromLocalStore } = storeToRefs(useLandAreasStore());
    const { addNewLandPaymentProcess } = useLandPaymentProcessStore();
    const toast = useToast();
    const myVisible = ref(visible);
    const paymentTime = ref(0);
    const amountOfMoney = ref(0);
    const amountOfDebt = ref(0);
    const submitter = ref({});
    ref("");
    const onSave = async () => {
      const newPaymentData = {
        id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1,
        land_area_id: parseInt(currentLandAreaIDFromLocalStore.value),
        payment_time: parseInt(paymentTime.value),
        amount_of_money: parseInt(amountOfMoney.value),
        amount_of_debt: parseInt(amountOfDebt.value),
        submitter: parseInt(submitter.value.value),
        status: "",
        created_by: 13,
        updated_by: 13,
        created_at: (/* @__PURE__ */ new Date()).toLocaleString(),
        updated_at: null
      };
      const response = await addNewLandPaymentProcess(newPaymentData);
      myVisible.value = false;
      if (response != null && response["result"] == "ok") {
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Create New Payment Successfully!",
          group: "bl",
          life: 3e3
        });
      } else {
        toast.add({
          severity: "danger",
          summary: "Error",
          detail: "Failed to Create New Payment",
          group: "bl",
          life: 3e3
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script;
      const _component_InputNumber = script$1;
      const _component_Dropdown = script$2;
      const _component_Button = script$3;
      _push(ssrRenderComponent(_component_Dialog, mergeProps({
        visible: unref(myVisible),
        "onUpdate:visible": ($event) => isRef(myVisible) ? myVisible.value = $event : null,
        modal: "",
        maximizable: "",
        header: "Header",
        style: { width: "50rem" },
        breakpoints: { "1199px": "75vw", "575px": "90vw" }
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="inline-flex items-center justify-center gap-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>Create New Payment</span></div>`);
          } else {
            return [
              createVNode("div", { class: "inline-flex items-center justify-center gap-2" }, [
                createVNode("span", { class: "font-bold text-xl" }, "Create New Payment")
              ])
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Button, {
              type: "button",
              label: "Cancel",
              text: "",
              severity: "secondary",
              onClick: ($event) => myVisible.value = false
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Button, {
              type: "submit",
              label: "Save",
              onClick: onSave
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Button, {
                type: "button",
                label: "Cancel",
                text: "",
                severity: "secondary",
                onClick: ($event) => myVisible.value = false
              }, null, 8, ["onClick"]),
              createVNode(_component_Button, {
                type: "submit",
                label: "Save",
                onClick: onSave
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<template class="flex flex-col gap-3"${_scopeId}><div class="flex gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="paymentTime"${_scopeId}>Payment Time</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "paymentTime",
              placeholder: "Payment Time",
              mode: "decimal",
              modelValue: unref(paymentTime),
              "onUpdate:modelValue": ($event) => isRef(paymentTime) ? paymentTime.value = $event : null,
              min: 0
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="amountOfMoney"${_scopeId}>Amount Of Money</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "amountOfMoney",
              placeholder: "Amount Of Money",
              mode: "decimal",
              modelValue: unref(amountOfMoney),
              "onUpdate:modelValue": ($event) => isRef(amountOfMoney) ? amountOfMoney.value = $event : null,
              min: 0
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="amountOfDebt"${_scopeId}>Amount Of Debt</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "amountOfDebt",
              placeholder: "Amount Of Debt",
              mode: "decimal",
              modelValue: unref(amountOfDebt),
              "onUpdate:modelValue": ($event) => isRef(amountOfDebt) ? amountOfDebt.value = $event : null,
              min: 0
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="submitter"${_scopeId}>Submitter</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "submitter",
              placeholder: "Select Submitter",
              modelValue: unref(submitter).value,
              "onUpdate:modelValue": ($event) => unref(submitter).value = $event,
              options: unref(submitters),
              optionLabel: "name",
              optionValue: "value"
            }, null, _parent2, _scopeId));
            _push2(`</div></div></template>`);
          } else {
            return [
              createVNode("template", { class: "flex flex-col gap-3" }, [
                createVNode("div", { class: "flex gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "paymentTime" }, "Payment Time"),
                    createVNode(_component_InputNumber, {
                      id: "paymentTime",
                      placeholder: "Payment Time",
                      mode: "decimal",
                      modelValue: unref(paymentTime),
                      "onUpdate:modelValue": ($event) => isRef(paymentTime) ? paymentTime.value = $event : null,
                      min: 0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "amountOfMoney" }, "Amount Of Money"),
                    createVNode(_component_InputNumber, {
                      id: "amountOfMoney",
                      placeholder: "Amount Of Money",
                      mode: "decimal",
                      modelValue: unref(amountOfMoney),
                      "onUpdate:modelValue": ($event) => isRef(amountOfMoney) ? amountOfMoney.value = $event : null,
                      min: 0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "amountOfDebt" }, "Amount Of Debt"),
                    createVNode(_component_InputNumber, {
                      id: "amountOfDebt",
                      placeholder: "Amount Of Debt",
                      mode: "decimal",
                      modelValue: unref(amountOfDebt),
                      "onUpdate:modelValue": ($event) => isRef(amountOfDebt) ? amountOfDebt.value = $event : null,
                      min: 0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "submitter" }, "Submitter"),
                    createVNode(_component_Dropdown, {
                      id: "submitter",
                      placeholder: "Select Submitter",
                      modelValue: unref(submitter).value,
                      "onUpdate:modelValue": ($event) => unref(submitter).value = $event,
                      options: unref(submitters),
                      optionLabel: "name",
                      optionValue: "value"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/land_payment_process/CreateLandPaymentProcessDialog.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "EditLandPaymentProcessDialog",
  __ssrInlineRender: true,
  props: ["visible", "statuses"],
  setup(__props) {
    const { visible, statuses } = __props;
    const { customers, customersDropdown: submitters } = storeToRefs(
      useCustomersStore()
    );
    const { currentLandPaymentProcess } = storeToRefs(
      useLandPaymentProcessStore()
    );
    const { editLandPaymentProcess } = useLandPaymentProcessStore();
    const toast = useToast();
    const myVisible = ref(visible);
    const paymentTime = ref(currentLandPaymentProcess.value["payment_time"]);
    const amountOfMoney = ref(currentLandPaymentProcess.value["amount_of_money"]);
    const amountOfDebt = ref(currentLandPaymentProcess.value["amount_of_debt"]);
    const submitter = ref({
      name: customers.value.filter(
        (acc) => acc["id"] == currentLandPaymentProcess.value["submitter"]
      )[0]["display_name"],
      value: `${customers.value.filter(
        (acc) => acc["id"] == currentLandPaymentProcess.value["submitter"]
      )[0]["id"]}`
    });
    ref(currentLandPaymentProcess.value["status"]);
    const onSave = async () => {
      const newPaymentData = {
        ...currentLandPaymentProcess.value,
        payment_time: parseInt(paymentTime.value),
        amount_of_money: parseInt(amountOfMoney.value),
        amount_of_debt: parseInt(amountOfDebt.value),
        submitter: parseInt(submitter.value.value),
        status: "",
        updated_at: (/* @__PURE__ */ new Date()).toLocaleString()
      };
      const response = await editLandPaymentProcess(newPaymentData);
      myVisible.value = false;
      if (response != null && response["result"] == "ok") {
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Edit Payment Successfully!",
          group: "bl",
          life: 3e3
        });
      } else {
        toast.add({
          severity: "danger",
          summary: "Error",
          detail: "Failed to Edit Payment",
          group: "bl",
          life: 3e3
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script;
      const _component_InputNumber = script$1;
      const _component_Dropdown = script$2;
      const _component_Button = script$3;
      _push(ssrRenderComponent(_component_Dialog, mergeProps({
        visible: unref(myVisible),
        "onUpdate:visible": ($event) => isRef(myVisible) ? myVisible.value = $event : null,
        modal: "",
        maximizable: "",
        header: "Header",
        style: { width: "50rem" },
        breakpoints: { "1199px": "75vw", "575px": "90vw" }
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="inline-flex items-center justify-center gap-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>Payment Details</span></div>`);
          } else {
            return [
              createVNode("div", { class: "inline-flex items-center justify-center gap-2" }, [
                createVNode("span", { class: "font-bold text-xl" }, "Payment Details")
              ])
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Button, {
              type: "button",
              label: "Cancel",
              text: "",
              severity: "secondary",
              onClick: ($event) => myVisible.value = false
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Button, {
              type: "submit",
              label: "Save",
              onClick: onSave
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Button, {
                type: "button",
                label: "Cancel",
                text: "",
                severity: "secondary",
                onClick: ($event) => myVisible.value = false
              }, null, 8, ["onClick"]),
              createVNode(_component_Button, {
                type: "submit",
                label: "Save",
                onClick: onSave
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<template class="flex flex-col gap-3"${_scopeId}><div class="flex gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="paymentTime"${_scopeId}>Payment Time</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "paymentTime",
              placeholder: "Payment Time",
              mode: "decimal",
              modelValue: unref(paymentTime),
              "onUpdate:modelValue": ($event) => isRef(paymentTime) ? paymentTime.value = $event : null,
              min: 0
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="amountOfMoney"${_scopeId}>Amount Of Money</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "amountOfMoney",
              placeholder: "Amount Of Money",
              mode: "decimal",
              modelValue: unref(amountOfMoney),
              "onUpdate:modelValue": ($event) => isRef(amountOfMoney) ? amountOfMoney.value = $event : null,
              min: 0
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="amountOfDebt"${_scopeId}>Amount Of Debt</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "amountOfDebt",
              placeholder: "Amount Of Debt",
              mode: "decimal",
              modelValue: unref(amountOfDebt),
              "onUpdate:modelValue": ($event) => isRef(amountOfDebt) ? amountOfDebt.value = $event : null,
              min: 0
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="submitter"${_scopeId}>Submitter</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "submitter",
              placeholder: "Select Submitter",
              modelValue: unref(submitter).value,
              "onUpdate:modelValue": ($event) => unref(submitter).value = $event,
              options: unref(submitters),
              optionLabel: "name",
              optionValue: "value"
            }, null, _parent2, _scopeId));
            _push2(`</div></div></template>`);
          } else {
            return [
              createVNode("template", { class: "flex flex-col gap-3" }, [
                createVNode("div", { class: "flex gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "paymentTime" }, "Payment Time"),
                    createVNode(_component_InputNumber, {
                      id: "paymentTime",
                      placeholder: "Payment Time",
                      mode: "decimal",
                      modelValue: unref(paymentTime),
                      "onUpdate:modelValue": ($event) => isRef(paymentTime) ? paymentTime.value = $event : null,
                      min: 0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "amountOfMoney" }, "Amount Of Money"),
                    createVNode(_component_InputNumber, {
                      id: "amountOfMoney",
                      placeholder: "Amount Of Money",
                      mode: "decimal",
                      modelValue: unref(amountOfMoney),
                      "onUpdate:modelValue": ($event) => isRef(amountOfMoney) ? amountOfMoney.value = $event : null,
                      min: 0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "amountOfDebt" }, "Amount Of Debt"),
                    createVNode(_component_InputNumber, {
                      id: "amountOfDebt",
                      placeholder: "Amount Of Debt",
                      mode: "decimal",
                      modelValue: unref(amountOfDebt),
                      "onUpdate:modelValue": ($event) => isRef(amountOfDebt) ? amountOfDebt.value = $event : null,
                      min: 0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "submitter" }, "Submitter"),
                    createVNode(_component_Dropdown, {
                      id: "submitter",
                      placeholder: "Select Submitter",
                      modelValue: unref(submitter).value,
                      "onUpdate:modelValue": ($event) => unref(submitter).value = $event,
                      options: unref(submitters),
                      optionLabel: "name",
                      optionValue: "value"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/land_payment_process/EditLandPaymentProcessDialog.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "DeleteLandPaymentProcessDialog",
  __ssrInlineRender: true,
  props: ["visible"],
  setup(__props) {
    const { visible } = __props;
    const { currentLandPaymentProcess } = storeToRefs(
      useLandPaymentProcessStore()
    );
    const { deleteLandPaymentProcess } = useLandPaymentProcessStore();
    const toast = useToast();
    const myVisible = ref(visible);
    const onDelete = async () => {
      const response = await deleteLandPaymentProcess(
        currentLandPaymentProcess.value
      );
      myVisible.value = false;
      if (response != null && response["result"] == "ok") {
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Delete Payment Successfully!",
          group: "bl",
          life: 3e3
        });
      } else {
        toast.add({
          severity: "danger",
          summary: "Error",
          detail: "Failed to Delete Payment",
          group: "bl",
          life: 3e3
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script;
      const _component_Button = script$3;
      _push(ssrRenderComponent(_component_Dialog, mergeProps({
        visible: unref(myVisible),
        "onUpdate:visible": ($event) => isRef(myVisible) ? myVisible.value = $event : null,
        modal: "",
        maximizable: "",
        header: "Header",
        style: { width: "50rem" },
        breakpoints: { "1199px": "75vw", "575px": "90vw" }
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="inline-flex items-center justify-center gap-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>Delete Payment?</span></div>`);
          } else {
            return [
              createVNode("div", { class: "inline-flex items-center justify-center gap-2" }, [
                createVNode("span", { class: "font-bold text-xl" }, "Delete Payment?")
              ])
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Button, {
              type: "button",
              label: "Cancel",
              text: "",
              severity: "secondary",
              onClick: ($event) => myVisible.value = false
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Button, {
              type: "submit",
              label: "Yes, delete",
              severity: "danger",
              onClick: onDelete
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Button, {
                type: "button",
                label: "Cancel",
                text: "",
                severity: "secondary",
                onClick: ($event) => myVisible.value = false
              }, null, 8, ["onClick"]),
              createVNode(_component_Button, {
                type: "submit",
                label: "Yes, delete",
                severity: "danger",
                onClick: onDelete
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}><span${_scopeId}> This will delete this payment permanently! </span><span${_scopeId}>You cannot undo this action!</span></div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode("span", null, " This will delete this payment permanently! "),
                createVNode("span", null, "You cannot undo this action!")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/land_payment_process/DeleteLandPaymentProcessDialog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main$2 as _,
  _sfc_main$1 as a,
  _sfc_main as b,
  useLandPaymentProcessStore as u
};
//# sourceMappingURL=DeleteLandPaymentProcessDialog-2qkRAQ50.js.map
