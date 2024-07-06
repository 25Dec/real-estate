import script$9 from "./tag.esm-Bkya-FxV.js";
import script$a from "./iconfield.esm-CMjnwUAR.js";
import script$b from "./inputicon.esm-DsrGfACI.js";
import __nuxt_component_1 from "./Icon-B04GAuZ4.js";
import script$2 from "./inputtext.esm-Blvd_dSV.js";
import script$8 from "./button.esm-D8sVcJb8.js";
import script$5 from "./dropdown.esm-BZz-eegH.js";
import script$c from "./datatable.esm-BAh19VmC.js";
import script$d from "./column.esm-KktM_xTo.js";
import script$e from "./avatar.esm-G-uX_ALX.js";
import script from "./dialog.esm-Wemb0g_v.js";
import script$1 from "./panel.esm-9ejhEDQD.js";
import script$3 from "./textarea.esm-r2lUF_RZ.js";
import script$4 from "./inputnumber.esm-CMvh_h4P.js";
import script$6 from "./calendar.esm-iTjSyI1e.js";
import script$7 from "./inputswitch.esm-QEGDpbo-.js";
import { ref, withAsyncContext, mergeProps, unref, isRef, withCtx, createVNode, toDisplayString, useSSRContext, createTextVNode, computed, resolveDirective } from "vue";
import "hookable";
import "destr";
import "klona";
import "devalue";
import "#internal/nuxt/paths";
import { d as defineStore, a as useCookie, b as baseUrl, s as storeToRefs, u as useToast, F as FilterMatchMode } from "../server.mjs";
import { u as useFetch } from "./fetch-DXSGE_KZ.js";
import { u as useProjectsStore } from "./projects-store-50IgnX7b.js";
import { g as getYearMonthDay, a as convertDateTime, h as hideLongText } from "./core_utils-WJ_cJnbk.js";
import { ssrRenderComponent, ssrInterpolate, ssrGetDirectiveProps } from "vue/server-renderer";
import { u as useUsersStore } from "./users-store-OjMRM6-M.js";
import "./basecomponent.esm-DXWDIfdj.js";
import "./index-DE5HZNjr.js";
import "@iconify/vue/dist/offline";
import "@iconify/vue";
import "./badge.esm-CGMv5799.js";
import "./index.esm-C7T4V9vj.js";
import "./baseicon.esm-DbzTeshI.js";
import "./index.esm-BIjuQzNw.js";
import "./index.esm-Clcms31c.js";
import "./index.esm-CBLFGZyH.js";
import "./index.esm-CbKY_bSB.js";
import "./overlayeventbus.esm-Cq2NCN3a.js";
import "./portal.esm-CdWWxjdD.js";
import "./virtualscroller.esm-QhUci9XU.js";
import "./paginator.esm-BvYTZ1KY.js";
import "./index.esm-7xcJfJVp.js";
import "./index.esm-ByqdG2PS.js";
import "./index.esm-C03T_CK6.js";
import "./index.esm-Cs4cT7wr.js";
import "./checkbox.esm-Duuim8Iu.js";
import "./radiobutton.esm-CQ1mq00b.js";
import "./index.esm-BvZNBu0f.js";
import "./index.esm-DTIot6dj.js";
import "./index.esm-vASB2Y3K.js";
import "./index.esm-Dpdcp6OZ.js";
import "./index.esm-CE-esNCM.js";
import "./index.esm-BdmOvYft.js";
import "./index.esm-5BOVva4X.js";
import "ofetch";
import "unctx";
import "h3";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "radix3";
import "ufo";
import "cookie-es";
import "ohash";
import "@vue/devtools-api";
import "@formkit/auto-animate/vue";
import "framesync";
import "popmotion";
import "style-value-types";
const useProjectSellerStore = defineStore("ProjectSeller", () => {
  const projectSeller = ref([]);
  const currentProjectSeller = ref({});
  const getProjectSeller = async () => {
    const accessToken = useCookie("token");
    const { data: data2 } = await useFetch(baseUrl + "/auth/projectAccount", {
      headers: {
        "Content-Type": "application/json",
        access_token: accessToken.value
      }
    }, "$npRYsZb6xI");
    projectSeller.value = data2.value.data.data;
  };
  const coordinateProjectSeller = async (data2) => {
    const accessToken = useCookie("token");
    const response = await $fetch(baseUrl + "/auth/projectAccount", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        access_token: accessToken.value
      },
      body: data2
    });
    await getProjectSeller();
    return response;
  };
  const editProjectSeller = async (data2) => {
    const accessToken = useCookie("token");
    const response = await $fetch(
      baseUrl + `/auth/projectAccount/${data2["id"]}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          access_token: accessToken.value
        },
        body: data2
      }
    );
    await getProjectSeller();
    return response;
  };
  const deleteProjectSeller = async (data2) => {
    const accessToken = useCookie("token");
    const response = await $fetch(
      baseUrl + `/auth/projectAccount/${data2["id"]}`,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          access_token: accessToken.value
        }
      }
    );
    await getProjectSeller();
    return response;
  };
  return {
    projectSeller,
    currentProjectSeller,
    getProjectSeller,
    coordinateProjectSeller,
    editProjectSeller,
    deleteProjectSeller
  };
});
const _sfc_main$4 = {
  __name: "ViewDetailsProjectSellerDialog",
  __ssrInlineRender: true,
  props: [
    "visible",
    "statuses",
    "types"
  ],
  async setup(__props) {
    var _a, _b, _c, _d;
    let __temp, __restore;
    const { visible, statuses, types } = __props;
    const { currentProjectSeller } = storeToRefs(useProjectSellerStore());
    const { projectsDropdown } = storeToRefs(useProjectsStore());
    const { getProjects } = useProjectsStore();
    [__temp, __restore] = withAsyncContext(() => getProjects()), await __temp, __restore();
    const myVisible = ref(visible);
    const pjName = ref(currentProjectSeller.value["pjName"]);
    const pjAddress = ref(currentProjectSeller.value["pjAddress"]);
    const pjPhone = ref(currentProjectSeller.value["pjPhone"]);
    const pjEmail = ref(currentProjectSeller.value["pjEmail"]);
    const pjOpenAt = ref(getYearMonthDay(currentProjectSeller.value["pjOpenAt"]));
    const pjActivated = ref(currentProjectSeller.value["pjActivated"]);
    const pjProgress = ref(currentProjectSeller.value["pjProgress"]);
    ref(currentProjectSeller.value["pjDesc"]);
    const pjStartedDay = ref(
      getYearMonthDay(currentProjectSeller.value["pjStartedDay"])
    );
    const pjBudget = ref(currentProjectSeller.value["pjBudget"]);
    const pjStatus = ref(currentProjectSeller.value["pjStatus"]);
    const pjType = ref(currentProjectSeller.value["pjType"]);
    const slPhone = ref(currentProjectSeller.value["slPhone"]);
    const slFirstName = ref(currentProjectSeller.value["slFirstName"]);
    const slLastName = ref(currentProjectSeller.value["slLastName"]);
    const slEmail = ref(currentProjectSeller.value["slEmail"]);
    ref({
      name: (_b = (_a = projectsDropdown.value.filter(
        (pj) => pj["value"] == currentProjectSeller.value["project_id"]
      )) == null ? void 0 : _a[0]) == null ? void 0 : _b["name"],
      value: (_d = (_c = projectsDropdown.value.filter(
        (pj) => pj["value"] == currentProjectSeller.value["project_id"]
      )) == null ? void 0 : _c[0]) == null ? void 0 : _d["value"]
    });
    const createdAt = ref(currentProjectSeller.value["created_at"]);
    const updatedAt = ref(currentProjectSeller.value["updated_at"]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script;
      const _component_Panel = script$1;
      const _component_InputText = script$2;
      const _component_Textarea = script$3;
      const _component_InputNumber = script$4;
      const _component_Dropdown = script$5;
      const _component_Calendar = script$6;
      const _component_InputSwitch = script$7;
      const _component_Button = script$8;
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
            _push2(`<div class="inline-flex items-center justify-center gap-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>Project-Seller Details</span></div>`);
          } else {
            return [
              createVNode("div", { class: "inline-flex items-center justify-center gap-2" }, [
                createVNode("span", { class: "font-bold text-xl" }, "Project-Seller Details")
              ])
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Button, {
              type: "button",
              label: "Close",
              onClick: ($event) => myVisible.value = false
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Button, {
                type: "button",
                label: "Close",
                onClick: ($event) => myVisible.value = false
              }, null, 8, ["onClick"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<template class="flex flex-col gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Panel, {
              toggleable: "",
              collapsed: "",
              class: "flex flex-col gap-3"
            }, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="font-bold"${_scopeId2}>Project</span>`);
                } else {
                  return [
                    createVNode("span", { class: "font-bold" }, "Project")
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex flex-1 flex-col gap-2"${_scopeId2}><label for="pjName"${_scopeId2}>Name</label>`);
                  _push3(ssrRenderComponent(_component_InputText, {
                    id: "pjName",
                    placeholder: "Project Name",
                    modelValue: unref(pjName),
                    "onUpdate:modelValue": ($event) => isRef(pjName) ? pjName.value = $event : null,
                    disabled: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId2}><label for="pjAddress"${_scopeId2}>Address</label>`);
                  _push3(ssrRenderComponent(_component_Textarea, {
                    id: "pjAddress",
                    placeholder: "Address",
                    modelValue: unref(pjAddress),
                    "onUpdate:modelValue": ($event) => isRef(pjAddress) ? pjAddress.value = $event : null,
                    disabled: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="flex flex-row gap-3"${_scopeId2}><div class="flex flex-1 flex-col gap-2"${_scopeId2}><label for="pjPhone"${_scopeId2}>Phone Number</label>`);
                  _push3(ssrRenderComponent(_component_InputText, {
                    id: "pjPhone",
                    placeholder: "+84 9698 886 660",
                    modelValue: unref(pjPhone),
                    "onUpdate:modelValue": ($event) => isRef(pjPhone) ? pjPhone.value = $event : null,
                    disabled: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId2}><label for="pjEmail"${_scopeId2}>Email</label>`);
                  _push3(ssrRenderComponent(_component_InputText, {
                    id: "pjEmail",
                    placeholder: "example@gmail.com",
                    modelValue: unref(pjEmail),
                    "onUpdate:modelValue": ($event) => isRef(pjEmail) ? pjEmail.value = $event : null,
                    disabled: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div><div class="flex flex-row gap-3"${_scopeId2}><div class="flex flex-1 flex-col gap-2"${_scopeId2}><label for="pjProgress"${_scopeId2}>Progress</label>`);
                  _push3(ssrRenderComponent(_component_InputNumber, {
                    id: "pjProgress",
                    modelValue: unref(pjProgress),
                    "onUpdate:modelValue": ($event) => isRef(pjProgress) ? pjProgress.value = $event : null,
                    inputId: "percent",
                    prefix: "%",
                    disabled: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId2}><label for="pjBudget"${_scopeId2}>Budget</label>`);
                  _push3(ssrRenderComponent(_component_InputNumber, {
                    id: "pjBudget",
                    modelValue: unref(pjBudget),
                    "onUpdate:modelValue": ($event) => isRef(pjBudget) ? pjBudget.value = $event : null,
                    inputId: "currency-us",
                    mode: "currency",
                    currency: "USD",
                    locale: "en-US",
                    disabled: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div><div class="flex flex-row gap-3"${_scopeId2}><div class="flex flex-1 flex-col gap-2"${_scopeId2}><label for="status"${_scopeId2}>Status</label>`);
                  _push3(ssrRenderComponent(_component_Dropdown, {
                    id: "status",
                    class: "flex-1",
                    modelValue: unref(pjStatus),
                    "onUpdate:modelValue": ($event) => isRef(pjStatus) ? pjStatus.value = $event : null,
                    placeholder: "Select Status",
                    options: __props.statuses,
                    optionLabel: "name",
                    optionValue: "value",
                    disabled: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId2}><label for="pjType"${_scopeId2}>Type</label>`);
                  _push3(ssrRenderComponent(_component_Dropdown, {
                    id: "type",
                    class: "flex-1",
                    modelValue: unref(pjType),
                    "onUpdate:modelValue": ($event) => isRef(pjType) ? pjType.value = $event : null,
                    placeholder: "Select Type",
                    options: __props.types,
                    optionLabel: "name",
                    optionValue: "value",
                    disabled: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div><div class="flex flex-row gap-3"${_scopeId2}><div class="flex flex-1 flex-col gap-2"${_scopeId2}><label for="pjOpenAt"${_scopeId2}>Open At</label>`);
                  _push3(ssrRenderComponent(_component_Calendar, {
                    id: "pjOpenAt",
                    modelValue: unref(pjOpenAt),
                    "onUpdate:modelValue": ($event) => isRef(pjOpenAt) ? pjOpenAt.value = $event : null,
                    showIcon: "",
                    iconDisplay: "input",
                    showButtonBar: "",
                    disabled: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId2}><label for="pjStartedDay"${_scopeId2}>Started Day</label>`);
                  _push3(ssrRenderComponent(_component_Calendar, {
                    id: "pjStartedDay",
                    modelValue: unref(pjStartedDay),
                    "onUpdate:modelValue": ($event) => isRef(pjStartedDay) ? pjStartedDay.value = $event : null,
                    showIcon: "",
                    iconDisplay: "input",
                    showButtonBar: "",
                    disabled: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div><div class="flex flex-1 flex-col gap-2 items-end"${_scopeId2}><label for="pjActivated"${_scopeId2}>Activated</label>`);
                  _push3(ssrRenderComponent(_component_InputSwitch, {
                    id: "pjActivated",
                    modelValue: unref(pjActivated),
                    "onUpdate:modelValue": ($event) => isRef(pjActivated) ? pjActivated.value = $event : null,
                    disabled: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                      createVNode("label", { for: "pjName" }, "Name"),
                      createVNode(_component_InputText, {
                        id: "pjName",
                        placeholder: "Project Name",
                        modelValue: unref(pjName),
                        "onUpdate:modelValue": ($event) => isRef(pjName) ? pjName.value = $event : null,
                        disabled: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                      createVNode("label", { for: "pjAddress" }, "Address"),
                      createVNode(_component_Textarea, {
                        id: "pjAddress",
                        placeholder: "Address",
                        modelValue: unref(pjAddress),
                        "onUpdate:modelValue": ($event) => isRef(pjAddress) ? pjAddress.value = $event : null,
                        disabled: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "flex flex-row gap-3" }, [
                      createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                        createVNode("label", { for: "pjPhone" }, "Phone Number"),
                        createVNode(_component_InputText, {
                          id: "pjPhone",
                          placeholder: "+84 9698 886 660",
                          modelValue: unref(pjPhone),
                          "onUpdate:modelValue": ($event) => isRef(pjPhone) ? pjPhone.value = $event : null,
                          disabled: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                        createVNode("label", { for: "pjEmail" }, "Email"),
                        createVNode(_component_InputText, {
                          id: "pjEmail",
                          placeholder: "example@gmail.com",
                          modelValue: unref(pjEmail),
                          "onUpdate:modelValue": ($event) => isRef(pjEmail) ? pjEmail.value = $event : null,
                          disabled: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ]),
                    createVNode("div", { class: "flex flex-row gap-3" }, [
                      createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                        createVNode("label", { for: "pjProgress" }, "Progress"),
                        createVNode(_component_InputNumber, {
                          id: "pjProgress",
                          modelValue: unref(pjProgress),
                          "onUpdate:modelValue": ($event) => isRef(pjProgress) ? pjProgress.value = $event : null,
                          inputId: "percent",
                          prefix: "%",
                          disabled: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                        createVNode("label", { for: "pjBudget" }, "Budget"),
                        createVNode(_component_InputNumber, {
                          id: "pjBudget",
                          modelValue: unref(pjBudget),
                          "onUpdate:modelValue": ($event) => isRef(pjBudget) ? pjBudget.value = $event : null,
                          inputId: "currency-us",
                          mode: "currency",
                          currency: "USD",
                          locale: "en-US",
                          disabled: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ]),
                    createVNode("div", { class: "flex flex-row gap-3" }, [
                      createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                        createVNode("label", { for: "status" }, "Status"),
                        createVNode(_component_Dropdown, {
                          id: "status",
                          class: "flex-1",
                          modelValue: unref(pjStatus),
                          "onUpdate:modelValue": ($event) => isRef(pjStatus) ? pjStatus.value = $event : null,
                          placeholder: "Select Status",
                          options: __props.statuses,
                          optionLabel: "name",
                          optionValue: "value",
                          disabled: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                      ]),
                      createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                        createVNode("label", { for: "pjType" }, "Type"),
                        createVNode(_component_Dropdown, {
                          id: "type",
                          class: "flex-1",
                          modelValue: unref(pjType),
                          "onUpdate:modelValue": ($event) => isRef(pjType) ? pjType.value = $event : null,
                          placeholder: "Select Type",
                          options: __props.types,
                          optionLabel: "name",
                          optionValue: "value",
                          disabled: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                      ])
                    ]),
                    createVNode("div", { class: "flex flex-row gap-3" }, [
                      createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                        createVNode("label", { for: "pjOpenAt" }, "Open At"),
                        createVNode(_component_Calendar, {
                          id: "pjOpenAt",
                          modelValue: unref(pjOpenAt),
                          "onUpdate:modelValue": ($event) => isRef(pjOpenAt) ? pjOpenAt.value = $event : null,
                          showIcon: "",
                          iconDisplay: "input",
                          showButtonBar: "",
                          disabled: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                        createVNode("label", { for: "pjStartedDay" }, "Started Day"),
                        createVNode(_component_Calendar, {
                          id: "pjStartedDay",
                          modelValue: unref(pjStartedDay),
                          "onUpdate:modelValue": ($event) => isRef(pjStartedDay) ? pjStartedDay.value = $event : null,
                          showIcon: "",
                          iconDisplay: "input",
                          showButtonBar: "",
                          disabled: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ]),
                    createVNode("div", { class: "flex flex-1 flex-col gap-2 items-end" }, [
                      createVNode("label", { for: "pjActivated" }, "Activated"),
                      createVNode(_component_InputSwitch, {
                        id: "pjActivated",
                        modelValue: unref(pjActivated),
                        "onUpdate:modelValue": ($event) => isRef(pjActivated) ? pjActivated.value = $event : null,
                        disabled: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Panel, {
              toggleable: "",
              collapsed: "",
              class: "flex flex-col gap-3"
            }, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="font-bold"${_scopeId2}>Seller</span>`);
                } else {
                  return [
                    createVNode("span", { class: "font-bold" }, "Seller")
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex flex-row gap-3"${_scopeId2}><div class="flex flex-1 flex-col gap-2"${_scopeId2}><label for="slFirstName"${_scopeId2}>First Name</label>`);
                  _push3(ssrRenderComponent(_component_InputText, {
                    id: "slFirstName",
                    placeholder: "First Name",
                    modelValue: unref(slFirstName),
                    "onUpdate:modelValue": ($event) => isRef(slFirstName) ? slFirstName.value = $event : null,
                    modelModifiers: { trim: true },
                    disabled: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId2}><label for="slLastName"${_scopeId2}>Last Name</label>`);
                  _push3(ssrRenderComponent(_component_InputText, {
                    id: "slLastName",
                    placeholder: "Last Name",
                    modelValue: unref(slLastName),
                    "onUpdate:modelValue": ($event) => isRef(slLastName) ? slLastName.value = $event : null,
                    modelModifiers: { trim: true },
                    disabled: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div><div class="flex flex-row gap-3"${_scopeId2}><div class="flex flex-1 flex-col gap-2"${_scopeId2}><label for="slPhone"${_scopeId2}>Phone Number</label>`);
                  _push3(ssrRenderComponent(_component_InputText, {
                    id: "slPhone",
                    placeholder: "+84 9698 886 660",
                    modelValue: unref(slPhone),
                    "onUpdate:modelValue": ($event) => isRef(slPhone) ? slPhone.value = $event : null,
                    modelModifiers: { trim: true },
                    integeronly: "",
                    disabled: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId2}><label for="slEmail"${_scopeId2}>Email</label>`);
                  _push3(ssrRenderComponent(_component_InputText, {
                    id: "slEmail",
                    placeholder: "example@gmail.com",
                    modelValue: unref(slEmail),
                    "onUpdate:modelValue": ($event) => isRef(slEmail) ? slEmail.value = $event : null,
                    modelModifiers: { trim: true },
                    disabled: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex flex-row gap-3" }, [
                      createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                        createVNode("label", { for: "slFirstName" }, "First Name"),
                        createVNode(_component_InputText, {
                          id: "slFirstName",
                          placeholder: "First Name",
                          modelValue: unref(slFirstName),
                          "onUpdate:modelValue": ($event) => isRef(slFirstName) ? slFirstName.value = $event : null,
                          modelModifiers: { trim: true },
                          disabled: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                        createVNode("label", { for: "slLastName" }, "Last Name"),
                        createVNode(_component_InputText, {
                          id: "slLastName",
                          placeholder: "Last Name",
                          modelValue: unref(slLastName),
                          "onUpdate:modelValue": ($event) => isRef(slLastName) ? slLastName.value = $event : null,
                          modelModifiers: { trim: true },
                          disabled: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ]),
                    createVNode("div", { class: "flex flex-row gap-3" }, [
                      createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                        createVNode("label", { for: "slPhone" }, "Phone Number"),
                        createVNode(_component_InputText, {
                          id: "slPhone",
                          placeholder: "+84 9698 886 660",
                          modelValue: unref(slPhone),
                          "onUpdate:modelValue": ($event) => isRef(slPhone) ? slPhone.value = $event : null,
                          modelModifiers: { trim: true },
                          integeronly: "",
                          disabled: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                        createVNode("label", { for: "slEmail" }, "Email"),
                        createVNode(_component_InputText, {
                          id: "slEmail",
                          placeholder: "example@gmail.com",
                          modelValue: unref(slEmail),
                          "onUpdate:modelValue": ($event) => isRef(slEmail) ? slEmail.value = $event : null,
                          modelModifiers: { trim: true },
                          disabled: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="flex flex-row gap-3 justify-between"${_scopeId}><span class="text-xs text-gray-400"${_scopeId}> Created at: ${ssrInterpolate(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(createdAt)))}</span><span class="text-xs text-gray-400"${_scopeId}> Updated at: ${ssrInterpolate(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(updatedAt)))}</span></div></template>`);
          } else {
            return [
              createVNode("template", { class: "flex flex-col gap-3" }, [
                createVNode(_component_Panel, {
                  toggleable: "",
                  collapsed: "",
                  class: "flex flex-col gap-3"
                }, {
                  header: withCtx(() => [
                    createVNode("span", { class: "font-bold" }, "Project")
                  ]),
                  default: withCtx(() => [
                    createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                      createVNode("label", { for: "pjName" }, "Name"),
                      createVNode(_component_InputText, {
                        id: "pjName",
                        placeholder: "Project Name",
                        modelValue: unref(pjName),
                        "onUpdate:modelValue": ($event) => isRef(pjName) ? pjName.value = $event : null,
                        disabled: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                      createVNode("label", { for: "pjAddress" }, "Address"),
                      createVNode(_component_Textarea, {
                        id: "pjAddress",
                        placeholder: "Address",
                        modelValue: unref(pjAddress),
                        "onUpdate:modelValue": ($event) => isRef(pjAddress) ? pjAddress.value = $event : null,
                        disabled: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "flex flex-row gap-3" }, [
                      createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                        createVNode("label", { for: "pjPhone" }, "Phone Number"),
                        createVNode(_component_InputText, {
                          id: "pjPhone",
                          placeholder: "+84 9698 886 660",
                          modelValue: unref(pjPhone),
                          "onUpdate:modelValue": ($event) => isRef(pjPhone) ? pjPhone.value = $event : null,
                          disabled: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                        createVNode("label", { for: "pjEmail" }, "Email"),
                        createVNode(_component_InputText, {
                          id: "pjEmail",
                          placeholder: "example@gmail.com",
                          modelValue: unref(pjEmail),
                          "onUpdate:modelValue": ($event) => isRef(pjEmail) ? pjEmail.value = $event : null,
                          disabled: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ]),
                    createVNode("div", { class: "flex flex-row gap-3" }, [
                      createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                        createVNode("label", { for: "pjProgress" }, "Progress"),
                        createVNode(_component_InputNumber, {
                          id: "pjProgress",
                          modelValue: unref(pjProgress),
                          "onUpdate:modelValue": ($event) => isRef(pjProgress) ? pjProgress.value = $event : null,
                          inputId: "percent",
                          prefix: "%",
                          disabled: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                        createVNode("label", { for: "pjBudget" }, "Budget"),
                        createVNode(_component_InputNumber, {
                          id: "pjBudget",
                          modelValue: unref(pjBudget),
                          "onUpdate:modelValue": ($event) => isRef(pjBudget) ? pjBudget.value = $event : null,
                          inputId: "currency-us",
                          mode: "currency",
                          currency: "USD",
                          locale: "en-US",
                          disabled: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ]),
                    createVNode("div", { class: "flex flex-row gap-3" }, [
                      createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                        createVNode("label", { for: "status" }, "Status"),
                        createVNode(_component_Dropdown, {
                          id: "status",
                          class: "flex-1",
                          modelValue: unref(pjStatus),
                          "onUpdate:modelValue": ($event) => isRef(pjStatus) ? pjStatus.value = $event : null,
                          placeholder: "Select Status",
                          options: __props.statuses,
                          optionLabel: "name",
                          optionValue: "value",
                          disabled: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                      ]),
                      createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                        createVNode("label", { for: "pjType" }, "Type"),
                        createVNode(_component_Dropdown, {
                          id: "type",
                          class: "flex-1",
                          modelValue: unref(pjType),
                          "onUpdate:modelValue": ($event) => isRef(pjType) ? pjType.value = $event : null,
                          placeholder: "Select Type",
                          options: __props.types,
                          optionLabel: "name",
                          optionValue: "value",
                          disabled: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                      ])
                    ]),
                    createVNode("div", { class: "flex flex-row gap-3" }, [
                      createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                        createVNode("label", { for: "pjOpenAt" }, "Open At"),
                        createVNode(_component_Calendar, {
                          id: "pjOpenAt",
                          modelValue: unref(pjOpenAt),
                          "onUpdate:modelValue": ($event) => isRef(pjOpenAt) ? pjOpenAt.value = $event : null,
                          showIcon: "",
                          iconDisplay: "input",
                          showButtonBar: "",
                          disabled: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                        createVNode("label", { for: "pjStartedDay" }, "Started Day"),
                        createVNode(_component_Calendar, {
                          id: "pjStartedDay",
                          modelValue: unref(pjStartedDay),
                          "onUpdate:modelValue": ($event) => isRef(pjStartedDay) ? pjStartedDay.value = $event : null,
                          showIcon: "",
                          iconDisplay: "input",
                          showButtonBar: "",
                          disabled: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ]),
                    createVNode("div", { class: "flex flex-1 flex-col gap-2 items-end" }, [
                      createVNode("label", { for: "pjActivated" }, "Activated"),
                      createVNode(_component_InputSwitch, {
                        id: "pjActivated",
                        modelValue: unref(pjActivated),
                        "onUpdate:modelValue": ($event) => isRef(pjActivated) ? pjActivated.value = $event : null,
                        disabled: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ]),
                  _: 1
                }),
                createVNode(_component_Panel, {
                  toggleable: "",
                  collapsed: "",
                  class: "flex flex-col gap-3"
                }, {
                  header: withCtx(() => [
                    createVNode("span", { class: "font-bold" }, "Seller")
                  ]),
                  default: withCtx(() => [
                    createVNode("div", { class: "flex flex-row gap-3" }, [
                      createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                        createVNode("label", { for: "slFirstName" }, "First Name"),
                        createVNode(_component_InputText, {
                          id: "slFirstName",
                          placeholder: "First Name",
                          modelValue: unref(slFirstName),
                          "onUpdate:modelValue": ($event) => isRef(slFirstName) ? slFirstName.value = $event : null,
                          modelModifiers: { trim: true },
                          disabled: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                        createVNode("label", { for: "slLastName" }, "Last Name"),
                        createVNode(_component_InputText, {
                          id: "slLastName",
                          placeholder: "Last Name",
                          modelValue: unref(slLastName),
                          "onUpdate:modelValue": ($event) => isRef(slLastName) ? slLastName.value = $event : null,
                          modelModifiers: { trim: true },
                          disabled: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ]),
                    createVNode("div", { class: "flex flex-row gap-3" }, [
                      createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                        createVNode("label", { for: "slPhone" }, "Phone Number"),
                        createVNode(_component_InputText, {
                          id: "slPhone",
                          placeholder: "+84 9698 886 660",
                          modelValue: unref(slPhone),
                          "onUpdate:modelValue": ($event) => isRef(slPhone) ? slPhone.value = $event : null,
                          modelModifiers: { trim: true },
                          integeronly: "",
                          disabled: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                        createVNode("label", { for: "slEmail" }, "Email"),
                        createVNode(_component_InputText, {
                          id: "slEmail",
                          placeholder: "example@gmail.com",
                          modelValue: unref(slEmail),
                          "onUpdate:modelValue": ($event) => isRef(slEmail) ? slEmail.value = $event : null,
                          modelModifiers: { trim: true },
                          disabled: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ])
                  ]),
                  _: 1
                }),
                createVNode("div", { class: "flex flex-row gap-3 justify-between" }, [
                  createVNode("span", { class: "text-xs text-gray-400" }, " Created at: " + toDisplayString(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(createdAt))), 1),
                  createVNode("span", { class: "text-xs text-gray-400" }, " Updated at: " + toDisplayString(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(updatedAt))), 1)
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
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/project_seller/ViewDetailsProjectSellerDialog.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
  __name: "CoordinateProjectSellerDialog",
  __ssrInlineRender: true,
  props: ["visible"],
  async setup(__props) {
    let __temp, __restore;
    const { visible } = __props;
    const { users: sellers } = storeToRefs(useUsersStore());
    const { getUsers } = useUsersStore();
    const { projectsDropdown } = storeToRefs(useProjectsStore());
    const { getProjects } = useProjectsStore();
    const { coordinateProjectSeller } = useProjectSellerStore();
    const toast = useToast();
    [__temp, __restore] = withAsyncContext(() => getUsers()), await __temp, __restore();
    [__temp, __restore] = withAsyncContext(() => getProjects()), await __temp, __restore();
    sellers.value = sellers.value.filter(
      (seller) => seller["type"] == "sale" || seller["type"] == "sale_manager"
    ).map((seller) => {
      return {
        name: `${seller["first_name"]} ${seller["last_name"]}`,
        value: seller["id"]
      };
    });
    const myVisible = ref(visible);
    const projectID = ref({});
    const accountID = ref({});
    const onSave = async () => {
      const newProjectSeller = {
        project_id: parseInt(projectID.value),
        account_id: parseInt(accountID.value),
        deleted: "false",
        created_by: 46,
        updated_by: 46,
        created_at: (/* @__PURE__ */ new Date()).toLocaleString(),
        updated_at: null
      };
      const response = await coordinateProjectSeller(newProjectSeller);
      myVisible.value = false;
      if (response != null && response["result"] == "ok") {
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Coordinate Seller into Project Successfully!",
          group: "bl",
          life: 3e3
        });
      } else {
        toast.add({
          severity: "danger",
          summary: "Error",
          detail: "Failed to Coordinate Seller into Project",
          group: "bl",
          life: 3e3
        });
      }
    };
    const handleDropdown = (event, type) => {
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script;
      const _component_Dropdown = script$5;
      const _component_Button = script$8;
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
            _push2(`<div class="inline-flex items-center justify-center gap-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>Coordinate Seller Into Project</span></div>`);
          } else {
            return [
              createVNode("div", { class: "inline-flex items-center justify-center gap-2" }, [
                createVNode("span", { class: "font-bold text-xl" }, "Coordinate Seller Into Project")
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
            _push2(`<template class="flex flex-col gap-3"${_scopeId}><div class="flex flex-row gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="accountID"${_scopeId}>Seller</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "accountID",
              modelValue: unref(accountID),
              "onUpdate:modelValue": ($event) => isRef(accountID) ? accountID.value = $event : null,
              placeholder: "Select Seller",
              options: unref(sellers),
              optionLabel: "name",
              optionValue: "value",
              onChange: (event) => handleDropdown()
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="projectID"${_scopeId}>Project</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "type",
              modelValue: unref(projectID),
              "onUpdate:modelValue": ($event) => isRef(projectID) ? projectID.value = $event : null,
              placeholder: "Select Project",
              options: unref(projectsDropdown),
              optionLabel: "name",
              optionValue: "value",
              onChange: (event) => handleDropdown()
            }, null, _parent2, _scopeId));
            _push2(`</div></div></template>`);
          } else {
            return [
              createVNode("template", { class: "flex flex-col gap-3" }, [
                createVNode("div", { class: "flex flex-row gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "accountID" }, "Seller"),
                    createVNode(_component_Dropdown, {
                      id: "accountID",
                      modelValue: unref(accountID),
                      "onUpdate:modelValue": ($event) => isRef(accountID) ? accountID.value = $event : null,
                      placeholder: "Select Seller",
                      options: unref(sellers),
                      optionLabel: "name",
                      optionValue: "value",
                      onChange: (event) => handleDropdown()
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "onChange"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "projectID" }, "Project"),
                    createVNode(_component_Dropdown, {
                      id: "type",
                      modelValue: unref(projectID),
                      "onUpdate:modelValue": ($event) => isRef(projectID) ? projectID.value = $event : null,
                      placeholder: "Select Project",
                      options: unref(projectsDropdown),
                      optionLabel: "name",
                      optionValue: "value",
                      onChange: (event) => handleDropdown()
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "onChange"])
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/project_seller/CoordinateProjectSellerDialog.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "EditProjectSellerDialog",
  __ssrInlineRender: true,
  props: ["visible"],
  async setup(__props) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    let __temp, __restore;
    const { visible } = __props;
    const { users: sellers } = storeToRefs(useUsersStore());
    const { getUsers } = useUsersStore();
    const { projectsDropdown } = storeToRefs(useProjectsStore());
    const { getProjects } = useProjectsStore();
    const { currentProjectSeller } = storeToRefs(useProjectSellerStore());
    const { editProjectSeller } = useProjectSellerStore();
    const toast = useToast();
    [__temp, __restore] = withAsyncContext(() => getUsers()), await __temp, __restore();
    [__temp, __restore] = withAsyncContext(() => getProjects()), await __temp, __restore();
    sellers.value = sellers.value.filter(
      (seller) => seller["type"] == "sale" || seller["type"] == "sale_manager"
    ).map((seller) => {
      return {
        name: `${seller["first_name"]} ${seller["last_name"]}`,
        value: seller["id"]
      };
    });
    const myVisible = ref(visible);
    const projectID = ref({
      name: (_b = (_a = projectsDropdown.value.filter(
        (pj) => pj["value"] == currentProjectSeller.value["project_id"]
      )) == null ? void 0 : _a[0]) == null ? void 0 : _b["name"],
      value: (_d = (_c = projectsDropdown.value.filter(
        (pj) => pj["value"] == currentProjectSeller.value["project_id"]
      )) == null ? void 0 : _c[0]) == null ? void 0 : _d["value"]
    });
    const accountID = ref({
      name: (_f = (_e = sellers.value.filter(
        (seller) => seller["value"] == currentProjectSeller.value["account_id"]
      )) == null ? void 0 : _e[0]) == null ? void 0 : _f["name"],
      value: (_h = (_g = sellers.value.filter(
        (seller) => seller["value"] == currentProjectSeller.value["account_id"]
      )) == null ? void 0 : _g[0]) == null ? void 0 : _h["value"]
    });
    const createdAt = ref(currentProjectSeller.value["created_at"]);
    const updatedAt = ref(currentProjectSeller.value["updated_at"]);
    const onSave = async () => {
      const newProjectSeller = {
        ...currentProjectSeller,
        project_id: parseInt(projectID.value.value),
        account_id: parseInt(accountID.value.value),
        updated_at: (/* @__PURE__ */ new Date()).toLocaleString()
      };
      const response = await editProjectSeller(newProjectSeller);
      myVisible.value = false;
      if (response != null && response["result"] == "ok") {
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Coordinate Seller into Project Successfully!",
          group: "bl",
          life: 3e3
        });
      } else {
        toast.add({
          severity: "danger",
          summary: "Error",
          detail: "Failed to Coordinate Seller into Project",
          group: "bl",
          life: 3e3
        });
      }
    };
    const handleDropdown = (event, type) => {
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script;
      const _component_Dropdown = script$5;
      const _component_Button = script$8;
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
            _push2(`<div class="inline-flex items-center justify-center gap-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>Project-Seller Details</span></div>`);
          } else {
            return [
              createVNode("div", { class: "inline-flex items-center justify-center gap-2" }, [
                createVNode("span", { class: "font-bold text-xl" }, "Project-Seller Details")
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
            _push2(`<template class="flex flex-col gap-3"${_scopeId}><div class="flex flex-row gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="accountID"${_scopeId}>Seller</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "accountID",
              modelValue: unref(accountID).value,
              "onUpdate:modelValue": ($event) => unref(accountID).value = $event,
              placeholder: "Select Seller",
              options: unref(sellers),
              optionLabel: "name",
              optionValue: "value",
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="projectID"${_scopeId}>Project</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "type",
              modelValue: unref(projectID).value,
              "onUpdate:modelValue": ($event) => unref(projectID).value = $event,
              placeholder: "Select Project",
              options: unref(projectsDropdown),
              optionLabel: "name",
              optionValue: "value",
              onChange: (event) => handleDropdown()
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-row gap-3 justify-between"${_scopeId}><span class="text-xs text-gray-400"${_scopeId}> Created at: ${ssrInterpolate(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(createdAt)))}</span><span class="text-xs text-gray-400"${_scopeId}> Updated at: ${ssrInterpolate(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(updatedAt)))}</span></div></template>`);
          } else {
            return [
              createVNode("template", { class: "flex flex-col gap-3" }, [
                createVNode("div", { class: "flex flex-row gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "accountID" }, "Seller"),
                    createVNode(_component_Dropdown, {
                      id: "accountID",
                      modelValue: unref(accountID).value,
                      "onUpdate:modelValue": ($event) => unref(accountID).value = $event,
                      placeholder: "Select Seller",
                      options: unref(sellers),
                      optionLabel: "name",
                      optionValue: "value",
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "projectID" }, "Project"),
                    createVNode(_component_Dropdown, {
                      id: "type",
                      modelValue: unref(projectID).value,
                      "onUpdate:modelValue": ($event) => unref(projectID).value = $event,
                      placeholder: "Select Project",
                      options: unref(projectsDropdown),
                      optionLabel: "name",
                      optionValue: "value",
                      onChange: (event) => handleDropdown()
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "onChange"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-row gap-3 justify-between" }, [
                  createVNode("span", { class: "text-xs text-gray-400" }, " Created at: " + toDisplayString(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(createdAt))), 1),
                  createVNode("span", { class: "text-xs text-gray-400" }, " Updated at: " + toDisplayString(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(updatedAt))), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/project_seller/EditProjectSellerDialog.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "DeleteProjectSellerDialog",
  __ssrInlineRender: true,
  props: ["visible"],
  setup(__props) {
    const { visible } = __props;
    const { currentProjectSeller } = storeToRefs(useProjectSellerStore());
    const { deleteProjectSeller } = useProjectSellerStore();
    const toast = useToast();
    const myVisible = ref(visible);
    const onDelete = async () => {
      const response = await deleteProjectSeller(data);
      myVisible.value = false;
      if (response != null && response["result"] == "ok") {
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Delete Seller from Project Successfully!",
          group: "bl",
          life: 3e3
        });
      } else {
        toast.add({
          severity: "danger",
          summary: "Error",
          detail: "Failed to Delete Seller from Project",
          group: "bl",
          life: 3e3
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script;
      const _component_Button = script$8;
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
            _push2(`<div class="inline-flex items-center justify-center gap-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>Delete Seller From Project?</span></div>`);
          } else {
            return [
              createVNode("div", { class: "inline-flex items-center justify-center gap-2" }, [
                createVNode("span", { class: "font-bold text-xl" }, "Delete Seller From Project?")
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
            _push2(`<div${_scopeId}><span${_scopeId}> This will delete seller <b${_scopeId}>${ssrInterpolate(`${unref(currentProjectSeller)["slFirstName"]} ${unref(currentProjectSeller)["slLastName"]}`)}</b> from project <b${_scopeId}>${ssrInterpolate(unref(currentProjectSeller)["pjName"])}</b> permanently! </span><span${_scopeId}>You cannot undo this action!</span></div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode("span", null, [
                  createTextVNode(" This will delete seller "),
                  createVNode("b", null, toDisplayString(`${unref(currentProjectSeller)["slFirstName"]} ${unref(currentProjectSeller)["slLastName"]}`), 1),
                  createTextVNode(" from project "),
                  createVNode("b", null, toDisplayString(unref(currentProjectSeller)["pjName"]), 1),
                  createTextVNode(" permanently! ")
                ]),
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/project_seller/DeleteProjectSellerDialog.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a, _b;
    let __temp, __restore;
    const { projectSeller, currentProjectSeller } = storeToRefs(
      useProjectSellerStore()
    );
    const { getProjectSeller } = useProjectSellerStore();
    const { users } = storeToRefs(useUsersStore());
    const { getUsers } = useUsersStore();
    const { projects, projectsDropdown } = storeToRefs(useProjectsStore());
    const { getProjects } = useProjectsStore();
    [__temp, __restore] = withAsyncContext(() => getUsers()), await __temp, __restore();
    [__temp, __restore] = withAsyncContext(() => getProjects()), await __temp, __restore();
    [__temp, __restore] = withAsyncContext(() => getProjectSeller()), await __temp, __restore();
    const currentProject = ref({
      name: ((_a = projectsDropdown.value[0]) == null ? void 0 : _a.name) ?? "",
      value: ((_b = projectsDropdown.value[0]) == null ? void 0 : _b.value) ?? ""
    });
    projectSeller.value = projectSeller.value.map((sl) => {
      const {
        name: pjName,
        address: pjAddress,
        phone: pjPhone,
        email: pjEmail,
        open_at: pjOpenAt,
        activated: pjActivated,
        project_progress: pjProgress,
        desc: pjDesc,
        started_day: pjStartedDay,
        budget: pjBudget,
        status: pjStatus,
        type: pjType
      } = projects.value.filter((pj) => pj["id"] == sl["project_id"])[0];
      const {
        phone: slPhone,
        first_name: slFirstName,
        last_name: slLastName,
        email: slEmail
      } = users.value.filter((usr) => usr["id"] == sl["account_id"])[0];
      return {
        ...sl,
        pjName,
        pjAddress,
        pjPhone,
        pjEmail,
        pjOpenAt,
        pjActivated,
        pjProgress,
        pjDesc,
        pjStartedDay,
        pjBudget,
        pjStatus,
        pjType,
        slPhone,
        slFirstName,
        slLastName,
        slEmail
      };
    });
    const myProjectSellerBaseOnProjectID = computed(() => {
      return projectSeller.value.filter((pjSeller) => {
        return pjSeller["project_id"] == currentProject.value.value;
      });
    });
    const statuses = ref([{ name: "Working", value: "working" }]);
    const types = ref([
      { name: "High", value: "high" },
      { name: "Land", value: "land" },
      { name: "Hybrid", value: "hybrid" }
    ]);
    const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    const viewDetailsProjectSellerDialogVisible = ref(false);
    const coordinateProjectSellerDialogVisible = ref(false);
    const editProjectSellerDialogVisible = ref(false);
    const deleteProjectSellerDialogVisible = ref(false);
    const handleDropdown = (event) => {
      myProjectSellerBaseOnProjectID.value = projectSeller.value.filter(
        (pjSeller) => {
          return pjSeller["project_id"] == event.value;
        }
      );
    };
    const toggleViewProjectSellerDetails = async (data2) => {
      currentProjectSeller.value = data2;
      viewDetailsProjectSellerDialogVisible.value = !viewDetailsProjectSellerDialogVisible.value;
    };
    const toggleEditProjectSeller = async (data2) => {
      currentProjectSeller.value = data2;
      editProjectSellerDialogVisible.value = !editProjectSellerDialogVisible.value;
    };
    const toggleDeleteProjectSeller = async (data2) => {
      currentProjectSeller.value = data2;
      deleteProjectSellerDialogVisible.value = !deleteProjectSellerDialogVisible.value;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Tag = script$9;
      const _component_IconField = script$a;
      const _component_InputIcon = script$b;
      const _component_Icon = __nuxt_component_1;
      const _component_InputText = script$2;
      const _component_Button = script$8;
      const _component_Dropdown = script$5;
      const _component_DataTable = script$c;
      const _component_Column = script$d;
      const _component_Avatar = script$e;
      const _component_ViewDetailsProjectSellerDialog = _sfc_main$4;
      const _component_CoordinateProjectSellerDialog = _sfc_main$3;
      const _component_EditProjectSellerDialog = _sfc_main$2;
      const _component_DeleteProjectSellerDialog = _sfc_main$1;
      const _directive_auto_animate = resolveDirective("auto-animate");
      _push(`<!--[--><div class="w-full h-full flex flex-col"><div class="fixed right-0 top-0 z-50 backdrop-blur-xl w-5/6 h-[8%] px-4 border-b flex justify-between items-center"><div class="flex items-center gap-2"><span class="font-semibold text-lg">Sellers</span>`);
      _push(ssrRenderComponent(_component_Tag, {
        value: unref(myProjectSellerBaseOnProjectID).length
      }, null, _parent));
      _push(`</div><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_IconField, { iconPosition: "left" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_InputIcon, { class: "flex items-center" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, { name: "mdi:filter-outline" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Icon, { name: "mdi:filter-outline" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_InputText, {
              modelValue: unref(filters)["global"].value,
              "onUpdate:modelValue": ($event) => unref(filters)["global"].value = $event,
              placeholder: "Filter Project or Seller..."
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_InputIcon, { class: "flex items-center" }, {
                default: withCtx(() => [
                  createVNode(_component_Icon, { name: "mdi:filter-outline" })
                ]),
                _: 1
              }),
              createVNode(_component_InputText, {
                modelValue: unref(filters)["global"].value,
                "onUpdate:modelValue": ($event) => unref(filters)["global"].value = $event,
                placeholder: "Filter Project or Seller..."
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Button, {
        size: "small",
        label: "Coordinate",
        onClick: ($event) => coordinateProjectSellerDialogVisible.value = !unref(coordinateProjectSellerDialogVisible)
      }, null, _parent));
      _push(`</div></div><div class="fixed right-0 top-[8%] z-50 backdrop-blur-xl w-5/6 h-[8%] px-4 border-b flex justify-between items-center"><div class="flex items-center gap-2"><label for="currentProject" class="font-semibold text-lg">Current Project: </label>`);
      _push(ssrRenderComponent(_component_Dropdown, {
        id: "currentProject",
        placeholder: "Select Project",
        modelValue: unref(currentProject).value,
        "onUpdate:modelValue": ($event) => unref(currentProject).value = $event,
        options: unref(projectsDropdown),
        optionLabel: "name",
        optionValue: "value",
        onChange: (event) => handleDropdown(event)
      }, null, _parent));
      _push(`</div></div><div class="absolute top-[16%] w-full h-[92%]">`);
      _push(ssrRenderComponent(_component_DataTable, mergeProps({
        value: unref(myProjectSellerBaseOnProjectID),
        filters: unref(filters),
        "onUpdate:filters": ($event) => isRef(filters) ? filters.value = $event : null,
        paginator: true,
        rows: 50,
        rowsPerPageOptions: [5, 10, 20, 50],
        scrollable: "",
        scrollHeight: "flex",
        removableSort: ""
      }, ssrGetDirectiveProps(_ctx, _directive_auto_animate)), {
        empty: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-center items-center"${_scopeId}><span${_scopeId}>No Project or Seller Found.</span></div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-center items-center" }, [
                createVNode("span", null, "No Project or Seller Found.")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Column, {
              field: "slName",
              header: "Seller"
            }, {
              body: withCtx(({ data: data2 }, _push3, _parent3, _scopeId2) => {
                var _a2, _b2;
                if (_push3) {
                  _push3(`<div class="flex items-center gap-3"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Avatar, {
                    label: (_a2 = data2["slFirstName"]) == null ? void 0 : _a2.substring(0, 3),
                    shape: "square"
                  }, null, _parent3, _scopeId2));
                  _push3(`<div class="flex flex-col"${_scopeId2}><span class="font-semibold"${_scopeId2}>${ssrInterpolate(`${data2["slFirstName"]} ${data2["slLastName"]}`)}</span><span${_scopeId2}>${ssrInterpolate(data2["slEmail"])}</span></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center gap-3" }, [
                      createVNode(_component_Avatar, {
                        label: (_b2 = data2["slFirstName"]) == null ? void 0 : _b2.substring(0, 3),
                        shape: "square"
                      }, null, 8, ["label"]),
                      createVNode("div", { class: "flex flex-col" }, [
                        createVNode("span", { class: "font-semibold" }, toDisplayString(`${data2["slFirstName"]} ${data2["slLastName"]}`), 1),
                        createVNode("span", null, toDisplayString(data2["slEmail"]), 1)
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Column, {
              field: "pjName",
              header: "Project"
            }, {
              body: withCtx(({ data: data2 }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex flex-col"${_scopeId2}><span class="font-semibold"${_scopeId2}>${ssrInterpolate(data2["pjName"])}</span><span${_scopeId2}>${ssrInterpolate(("hideLongText" in _ctx ? _ctx.hideLongText : unref(hideLongText))(data2["pjAddress"]))}</span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex flex-col" }, [
                      createVNode("span", { class: "font-semibold" }, toDisplayString(data2["pjName"]), 1),
                      createVNode("span", null, toDisplayString(("hideLongText" in _ctx ? _ctx.hideLongText : unref(hideLongText))(data2["pjAddress"])), 1)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Column, { header: "Actions" }, {
              body: withCtx(({ data: data2 }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Button, {
                    text: "",
                    severity: "secondary",
                    onClick: ($event) => toggleViewProjectSellerDetails(data2)
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Icon, { name: "mdi:eye-outline" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_Icon, { name: "mdi:eye-outline" })
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    text: "",
                    severity: "secondary",
                    onClick: ($event) => toggleEditProjectSeller(data2)
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Icon, { name: "mdi:edit-outline" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_Icon, { name: "mdi:edit-outline" })
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    text: "",
                    severity: "danger",
                    onClick: ($event) => toggleDeleteProjectSeller(data2)
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Icon, { name: "mdi:delete-outline" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_Icon, { name: "mdi:delete-outline" })
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Button, {
                      text: "",
                      severity: "secondary",
                      onClick: ($event) => toggleViewProjectSellerDetails(data2)
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, { name: "mdi:eye-outline" })
                      ]),
                      _: 2
                    }, 1032, ["onClick"]),
                    createVNode(_component_Button, {
                      text: "",
                      severity: "secondary",
                      onClick: ($event) => toggleEditProjectSeller(data2)
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, { name: "mdi:edit-outline" })
                      ]),
                      _: 2
                    }, 1032, ["onClick"]),
                    createVNode(_component_Button, {
                      text: "",
                      severity: "danger",
                      onClick: ($event) => toggleDeleteProjectSeller(data2)
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, { name: "mdi:delete-outline" })
                      ]),
                      _: 2
                    }, 1032, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Column, {
                field: "slName",
                header: "Seller"
              }, {
                body: withCtx(({ data: data2 }) => {
                  var _a2;
                  return [
                    createVNode("div", { class: "flex items-center gap-3" }, [
                      createVNode(_component_Avatar, {
                        label: (_a2 = data2["slFirstName"]) == null ? void 0 : _a2.substring(0, 3),
                        shape: "square"
                      }, null, 8, ["label"]),
                      createVNode("div", { class: "flex flex-col" }, [
                        createVNode("span", { class: "font-semibold" }, toDisplayString(`${data2["slFirstName"]} ${data2["slLastName"]}`), 1),
                        createVNode("span", null, toDisplayString(data2["slEmail"]), 1)
                      ])
                    ])
                  ];
                }),
                _: 1
              }),
              createVNode(_component_Column, {
                field: "pjName",
                header: "Project"
              }, {
                body: withCtx(({ data: data2 }) => [
                  createVNode("div", { class: "flex flex-col" }, [
                    createVNode("span", { class: "font-semibold" }, toDisplayString(data2["pjName"]), 1),
                    createVNode("span", null, toDisplayString(("hideLongText" in _ctx ? _ctx.hideLongText : unref(hideLongText))(data2["pjAddress"])), 1)
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_Column, { header: "Actions" }, {
                body: withCtx(({ data: data2 }) => [
                  createVNode(_component_Button, {
                    text: "",
                    severity: "secondary",
                    onClick: ($event) => toggleViewProjectSellerDetails(data2)
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, { name: "mdi:eye-outline" })
                    ]),
                    _: 2
                  }, 1032, ["onClick"]),
                  createVNode(_component_Button, {
                    text: "",
                    severity: "secondary",
                    onClick: ($event) => toggleEditProjectSeller(data2)
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, { name: "mdi:edit-outline" })
                    ]),
                    _: 2
                  }, 1032, ["onClick"]),
                  createVNode(_component_Button, {
                    text: "",
                    severity: "danger",
                    onClick: ($event) => toggleDeleteProjectSeller(data2)
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, { name: "mdi:delete-outline" })
                    ]),
                    _: 2
                  }, 1032, ["onClick"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      if (unref(viewDetailsProjectSellerDialogVisible)) {
        _push(ssrRenderComponent(_component_ViewDetailsProjectSellerDialog, {
          visible: unref(viewDetailsProjectSellerDialogVisible),
          statuses: unref(statuses),
          types: unref(types)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(coordinateProjectSellerDialogVisible)) {
        _push(ssrRenderComponent(_component_CoordinateProjectSellerDialog, { visible: unref(coordinateProjectSellerDialogVisible) }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(editProjectSellerDialogVisible)) {
        _push(ssrRenderComponent(_component_EditProjectSellerDialog, { visible: unref(editProjectSellerDialogVisible) }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(deleteProjectSellerDialogVisible)) {
        _push(ssrRenderComponent(_component_DeleteProjectSellerDialog, { visible: unref(deleteProjectSellerDialogVisible) }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/project_seller/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-BY56XuRD.js.map
