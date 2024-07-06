import script$8 from "./tag.esm-Bkya-FxV.js";
import script$9 from "./iconfield.esm-CMjnwUAR.js";
import script$a from "./inputicon.esm-DsrGfACI.js";
import __nuxt_component_1 from "./Icon-B04GAuZ4.js";
import script$1 from "./inputtext.esm-Blvd_dSV.js";
import script$7 from "./button.esm-D8sVcJb8.js";
import script$b from "./datatable.esm-BAh19VmC.js";
import script$c from "./column.esm-KktM_xTo.js";
import script$d from "./knob.esm-CiupXrSq.js";
import script from "./dialog.esm-Wemb0g_v.js";
import script$2 from "./textarea.esm-r2lUF_RZ.js";
import script$3 from "./inputnumber.esm-CMvh_h4P.js";
import script$4 from "./dropdown.esm-BZz-eegH.js";
import script$5 from "./calendar.esm-iTjSyI1e.js";
import script$6 from "./inputswitch.esm-QEGDpbo-.js";
import { ref, mergeProps, unref, isRef, withCtx, createVNode, toDisplayString, useSSRContext, createTextVNode, withAsyncContext, resolveDirective, openBlock, createBlock, createCommentVNode } from "vue";
import "hookable";
import "destr";
import "klona";
import "devalue";
import "#internal/nuxt/paths";
import { s as storeToRefs, u as useToast, F as FilterMatchMode } from "../server.mjs";
import { u as useProjectsStore } from "./projects-store-50IgnX7b.js";
import { g as getYearMonthDay, a as convertDateTime, h as hideLongText, c as capitalize } from "./core_utils-WJ_cJnbk.js";
import { ssrRenderComponent, ssrInterpolate, ssrGetDirectiveProps } from "vue/server-renderer";
import "./basecomponent.esm-DXWDIfdj.js";
import "./index-DE5HZNjr.js";
import "@iconify/vue/dist/offline";
import "@iconify/vue";
import "./badge.esm-CGMv5799.js";
import "./index.esm-C7T4V9vj.js";
import "./baseicon.esm-DbzTeshI.js";
import "./paginator.esm-BvYTZ1KY.js";
import "./index.esm-7xcJfJVp.js";
import "./index.esm-ByqdG2PS.js";
import "./virtualscroller.esm-QhUci9XU.js";
import "./index.esm-Clcms31c.js";
import "./index.esm-C03T_CK6.js";
import "./index.esm-Cs4cT7wr.js";
import "./index.esm-BIjuQzNw.js";
import "./index.esm-CbKY_bSB.js";
import "./overlayeventbus.esm-Cq2NCN3a.js";
import "./checkbox.esm-Duuim8Iu.js";
import "./radiobutton.esm-CQ1mq00b.js";
import "./index.esm-BvZNBu0f.js";
import "./portal.esm-CdWWxjdD.js";
import "./index.esm-DTIot6dj.js";
import "./index.esm-Dpdcp6OZ.js";
import "./index.esm-CE-esNCM.js";
import "./index.esm-CBLFGZyH.js";
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
import "./fetch-DXSGE_KZ.js";
const _sfc_main$4 = {
  __name: "ViewDetailsProjectDialog",
  __ssrInlineRender: true,
  props: [
    "visible",
    "statuses",
    "types"
  ],
  setup(__props) {
    const { visible, statuses, types } = __props;
    const { currentProject } = storeToRefs(useProjectsStore());
    const myVisible = ref(visible);
    const projectName = ref(currentProject.value["name"]);
    const address = ref(currentProject.value["address"]);
    const phone = ref(currentProject.value["phone"]);
    const email = ref(currentProject.value["email"]);
    const openAt = ref(getYearMonthDay(currentProject.value["open_at"]));
    const activated = ref(
      currentProject.value["activated"] == "true" ? true : false
    );
    const projectProgress = ref(currentProject.value["project_progress"]);
    ref(currentProject.value["desc"]);
    const startedDay = ref(getYearMonthDay(currentProject.value["started_day"]));
    const createdAt = ref(currentProject.value["created_at"]);
    const updatedAt = ref(currentProject.value["updated_at"]);
    const budget = ref(currentProject.value["budget"]);
    const status = ref(currentProject.value["status"]);
    const type = ref(currentProject.value["type"]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script;
      const _component_InputText = script$1;
      const _component_Textarea = script$2;
      const _component_InputNumber = script$3;
      const _component_Dropdown = script$4;
      const _component_Calendar = script$5;
      const _component_InputSwitch = script$6;
      const _component_Button = script$7;
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
            _push2(`<div class="inline-flex items-center justify-center gap-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>Project Details</span></div>`);
          } else {
            return [
              createVNode("div", { class: "inline-flex items-center justify-center gap-2" }, [
                createVNode("span", { class: "font-bold text-xl" }, "Project Details")
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
            _push2(`<template class="flex flex-col gap-3"${_scopeId}><div class="flex"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="projectName"${_scopeId}>Name</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "projectName",
              placeholder: "Project Name",
              modelValue: unref(projectName),
              "onUpdate:modelValue": ($event) => isRef(projectName) ? projectName.value = $event : null,
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="address"${_scopeId}>Address</label>`);
            _push2(ssrRenderComponent(_component_Textarea, {
              id: "address",
              placeholder: "Address",
              modelValue: unref(address),
              "onUpdate:modelValue": ($event) => isRef(address) ? address.value = $event : null,
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-row gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="phone"${_scopeId}>Phone Number</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "phone",
              placeholder: "+84 9698 886 660",
              modelValue: unref(phone),
              "onUpdate:modelValue": ($event) => isRef(phone) ? phone.value = $event : null,
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="email"${_scopeId}>Email</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "email",
              placeholder: "example@gmail.com",
              modelValue: unref(email),
              "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-row gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="progress"${_scopeId}>Progress</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "progress",
              modelValue: unref(projectProgress),
              "onUpdate:modelValue": ($event) => isRef(projectProgress) ? projectProgress.value = $event : null,
              inputId: "percent",
              prefix: "%",
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="budget"${_scopeId}>Budget</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "budget",
              modelValue: unref(budget),
              "onUpdate:modelValue": ($event) => isRef(budget) ? budget.value = $event : null,
              inputId: "currency-us",
              mode: "currency",
              currency: "USD",
              locale: "en-US",
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-row gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="status"${_scopeId}>Status</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "status",
              class: "flex-1",
              modelValue: unref(status),
              "onUpdate:modelValue": ($event) => isRef(status) ? status.value = $event : null,
              placeholder: "Select Status",
              options: __props.statuses,
              optionLabel: "name",
              optionValue: "value",
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="type"${_scopeId}>Type</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "type",
              class: "flex-1",
              modelValue: unref(type),
              "onUpdate:modelValue": ($event) => isRef(type) ? type.value = $event : null,
              placeholder: "Select Type",
              options: __props.types,
              optionLabel: "name",
              optionValue: "value",
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-row gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="openAt"${_scopeId}>Open At</label>`);
            _push2(ssrRenderComponent(_component_Calendar, {
              id: "openAt",
              modelValue: unref(openAt),
              "onUpdate:modelValue": ($event) => isRef(openAt) ? openAt.value = $event : null,
              showIcon: "",
              iconDisplay: "input",
              showButtonBar: "",
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="startedDay"${_scopeId}>Started Day</label>`);
            _push2(ssrRenderComponent(_component_Calendar, {
              id: "startedDay",
              modelValue: unref(startedDay),
              "onUpdate:modelValue": ($event) => isRef(startedDay) ? startedDay.value = $event : null,
              showIcon: "",
              iconDisplay: "input",
              showButtonBar: "",
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-1 flex-col gap-2 items-end"${_scopeId}><label for="activated"${_scopeId}>Activated</label>`);
            _push2(ssrRenderComponent(_component_InputSwitch, {
              id: "activated",
              modelValue: unref(activated),
              "onUpdate:modelValue": ($event) => isRef(activated) ? activated.value = $event : null,
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-row gap-3 justify-between"${_scopeId}><span class="text-xs text-gray-400"${_scopeId}> Created at: ${ssrInterpolate(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(createdAt)))}</span><span class="text-xs text-gray-400"${_scopeId}> Updated at: ${ssrInterpolate(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(updatedAt)))}</span></div></template>`);
          } else {
            return [
              createVNode("template", { class: "flex flex-col gap-3" }, [
                createVNode("div", { class: "flex" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "projectName" }, "Name"),
                    createVNode(_component_InputText, {
                      id: "projectName",
                      placeholder: "Project Name",
                      modelValue: unref(projectName),
                      "onUpdate:modelValue": ($event) => isRef(projectName) ? projectName.value = $event : null,
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                  createVNode("label", { for: "address" }, "Address"),
                  createVNode(_component_Textarea, {
                    id: "address",
                    placeholder: "Address",
                    modelValue: unref(address),
                    "onUpdate:modelValue": ($event) => isRef(address) ? address.value = $event : null,
                    disabled: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "flex flex-row gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "phone" }, "Phone Number"),
                    createVNode(_component_InputText, {
                      id: "phone",
                      placeholder: "+84 9698 886 660",
                      modelValue: unref(phone),
                      "onUpdate:modelValue": ($event) => isRef(phone) ? phone.value = $event : null,
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "email" }, "Email"),
                    createVNode(_component_InputText, {
                      id: "email",
                      placeholder: "example@gmail.com",
                      modelValue: unref(email),
                      "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-row gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "progress" }, "Progress"),
                    createVNode(_component_InputNumber, {
                      id: "progress",
                      modelValue: unref(projectProgress),
                      "onUpdate:modelValue": ($event) => isRef(projectProgress) ? projectProgress.value = $event : null,
                      inputId: "percent",
                      prefix: "%",
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "budget" }, "Budget"),
                    createVNode(_component_InputNumber, {
                      id: "budget",
                      modelValue: unref(budget),
                      "onUpdate:modelValue": ($event) => isRef(budget) ? budget.value = $event : null,
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
                      modelValue: unref(status),
                      "onUpdate:modelValue": ($event) => isRef(status) ? status.value = $event : null,
                      placeholder: "Select Status",
                      options: __props.statuses,
                      optionLabel: "name",
                      optionValue: "value",
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "type" }, "Type"),
                    createVNode(_component_Dropdown, {
                      id: "type",
                      class: "flex-1",
                      modelValue: unref(type),
                      "onUpdate:modelValue": ($event) => isRef(type) ? type.value = $event : null,
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
                    createVNode("label", { for: "openAt" }, "Open At"),
                    createVNode(_component_Calendar, {
                      id: "openAt",
                      modelValue: unref(openAt),
                      "onUpdate:modelValue": ($event) => isRef(openAt) ? openAt.value = $event : null,
                      showIcon: "",
                      iconDisplay: "input",
                      showButtonBar: "",
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "startedDay" }, "Started Day"),
                    createVNode(_component_Calendar, {
                      id: "startedDay",
                      modelValue: unref(startedDay),
                      "onUpdate:modelValue": ($event) => isRef(startedDay) ? startedDay.value = $event : null,
                      showIcon: "",
                      iconDisplay: "input",
                      showButtonBar: "",
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-1 flex-col gap-2 items-end" }, [
                  createVNode("label", { for: "activated" }, "Activated"),
                  createVNode(_component_InputSwitch, {
                    id: "activated",
                    modelValue: unref(activated),
                    "onUpdate:modelValue": ($event) => isRef(activated) ? activated.value = $event : null,
                    disabled: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/projects/ViewDetailsProjectDialog.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
  __name: "CreateProjectDialog",
  __ssrInlineRender: true,
  props: [
    "visible",
    "statuses",
    "types"
  ],
  setup(__props) {
    const { visible, statuses, types } = __props;
    const { addNewProject } = useProjectsStore();
    const toast = useToast();
    const myVisible = ref(visible);
    const projectName = ref("");
    const address = ref("");
    const phone = ref("");
    const email = ref("");
    const openAt = ref("");
    const activated = ref(false);
    const projectProgress = ref(0);
    const desc = ref("");
    const startedDay = ref("");
    const budget = ref(0);
    const status = ref({});
    const type = ref({});
    const onSave = async () => {
      const newProjectData = {
        id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1,
        name: projectName.value,
        address: address.value,
        phone: phone.value,
        email: email.value,
        open_at: openAt.value,
        activated: activated.value,
        project_progress: parseInt(projectProgress.value),
        desc: desc.value,
        deleted: false,
        started_day: startedDay.value,
        created_by: 46,
        updated_by: 46,
        created_at: (/* @__PURE__ */ new Date()).toLocaleString(),
        updated_at: null,
        budget: parseInt(budget.value),
        status: status.value,
        type: type.value
      };
      const response = await addNewProject(newProjectData);
      myVisible.value = false;
      if (response != null && response["result"] == "ok") {
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Create New Project Successfully!",
          group: "bl",
          life: 3e3
        });
      } else {
        toast.add({
          severity: "danger",
          summary: "Error",
          detail: "Failed to Create New Project",
          group: "bl",
          life: 3e3
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script;
      const _component_InputText = script$1;
      const _component_Textarea = script$2;
      const _component_InputNumber = script$3;
      const _component_Dropdown = script$4;
      const _component_Calendar = script$5;
      const _component_InputSwitch = script$6;
      const _component_Button = script$7;
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
            _push2(`<div class="inline-flex items-center justify-center gap-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>Create New Project</span></div>`);
          } else {
            return [
              createVNode("div", { class: "inline-flex items-center justify-center gap-2" }, [
                createVNode("span", { class: "font-bold text-xl" }, "Create New Project")
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
            _push2(`<template class="flex flex-col gap-3"${_scopeId}><div class="flex"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="projectName"${_scopeId}>Name</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "projectName",
              placeholder: "Project Name",
              modelValue: unref(projectName),
              "onUpdate:modelValue": ($event) => isRef(projectName) ? projectName.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="address"${_scopeId}>Address</label>`);
            _push2(ssrRenderComponent(_component_Textarea, {
              id: "address",
              placeholder: "Address",
              modelValue: unref(address),
              "onUpdate:modelValue": ($event) => isRef(address) ? address.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-row gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="phone"${_scopeId}>Phone Number</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "phone",
              placeholder: "+84 9698 886 660",
              modelValue: unref(phone),
              "onUpdate:modelValue": ($event) => isRef(phone) ? phone.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="email"${_scopeId}>Email</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "email",
              placeholder: "example@gmail.com",
              modelValue: unref(email),
              "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-row gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="progress"${_scopeId}>Progress</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "progress",
              modelValue: unref(projectProgress),
              "onUpdate:modelValue": ($event) => isRef(projectProgress) ? projectProgress.value = $event : null,
              inputId: "percent",
              prefix: "%",
              mode: "decimal",
              min: 0,
              max: 100
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="budget"${_scopeId}>Budget</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "budget",
              modelValue: unref(budget),
              "onUpdate:modelValue": ($event) => isRef(budget) ? budget.value = $event : null,
              inputId: "currency-us",
              mode: "currency",
              currency: "USD",
              locale: "en-US",
              min: 0
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-row gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="status"${_scopeId}>Status</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "status",
              class: "flex-1",
              modelValue: unref(status),
              "onUpdate:modelValue": ($event) => isRef(status) ? status.value = $event : null,
              placeholder: "Select Status",
              options: __props.statuses,
              optionLabel: "name",
              optionValue: "value"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="type"${_scopeId}>Type</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "type",
              class: "flex-1",
              modelValue: unref(type),
              "onUpdate:modelValue": ($event) => isRef(type) ? type.value = $event : null,
              placeholder: "Select Type",
              options: __props.types,
              optionLabel: "name",
              optionValue: "value"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-row gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="openAt"${_scopeId}>Open At</label>`);
            _push2(ssrRenderComponent(_component_Calendar, {
              id: "openAt",
              modelValue: unref(openAt),
              "onUpdate:modelValue": ($event) => isRef(openAt) ? openAt.value = $event : null,
              showIcon: "",
              iconDisplay: "input",
              showButtonBar: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="startedDay"${_scopeId}>Started Day</label>`);
            _push2(ssrRenderComponent(_component_Calendar, {
              id: "startedDay",
              modelValue: unref(startedDay),
              "onUpdate:modelValue": ($event) => isRef(startedDay) ? startedDay.value = $event : null,
              showIcon: "",
              iconDisplay: "input",
              showButtonBar: ""
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-1 flex-col gap-2 items-end"${_scopeId}><label for="activated"${_scopeId}>Activated</label>`);
            _push2(ssrRenderComponent(_component_InputSwitch, {
              id: "activated",
              modelValue: unref(activated),
              "onUpdate:modelValue": ($event) => isRef(activated) ? activated.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(`</div></template>`);
          } else {
            return [
              createVNode("template", { class: "flex flex-col gap-3" }, [
                createVNode("div", { class: "flex" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "projectName" }, "Name"),
                    createVNode(_component_InputText, {
                      id: "projectName",
                      placeholder: "Project Name",
                      modelValue: unref(projectName),
                      "onUpdate:modelValue": ($event) => isRef(projectName) ? projectName.value = $event : null
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                  createVNode("label", { for: "address" }, "Address"),
                  createVNode(_component_Textarea, {
                    id: "address",
                    placeholder: "Address",
                    modelValue: unref(address),
                    "onUpdate:modelValue": ($event) => isRef(address) ? address.value = $event : null
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "flex flex-row gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "phone" }, "Phone Number"),
                    createVNode(_component_InputText, {
                      id: "phone",
                      placeholder: "+84 9698 886 660",
                      modelValue: unref(phone),
                      "onUpdate:modelValue": ($event) => isRef(phone) ? phone.value = $event : null
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "email" }, "Email"),
                    createVNode(_component_InputText, {
                      id: "email",
                      placeholder: "example@gmail.com",
                      modelValue: unref(email),
                      "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-row gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "progress" }, "Progress"),
                    createVNode(_component_InputNumber, {
                      id: "progress",
                      modelValue: unref(projectProgress),
                      "onUpdate:modelValue": ($event) => isRef(projectProgress) ? projectProgress.value = $event : null,
                      inputId: "percent",
                      prefix: "%",
                      mode: "decimal",
                      min: 0,
                      max: 100
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "budget" }, "Budget"),
                    createVNode(_component_InputNumber, {
                      id: "budget",
                      modelValue: unref(budget),
                      "onUpdate:modelValue": ($event) => isRef(budget) ? budget.value = $event : null,
                      inputId: "currency-us",
                      mode: "currency",
                      currency: "USD",
                      locale: "en-US",
                      min: 0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-row gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "status" }, "Status"),
                    createVNode(_component_Dropdown, {
                      id: "status",
                      class: "flex-1",
                      modelValue: unref(status),
                      "onUpdate:modelValue": ($event) => isRef(status) ? status.value = $event : null,
                      placeholder: "Select Status",
                      options: __props.statuses,
                      optionLabel: "name",
                      optionValue: "value"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "type" }, "Type"),
                    createVNode(_component_Dropdown, {
                      id: "type",
                      class: "flex-1",
                      modelValue: unref(type),
                      "onUpdate:modelValue": ($event) => isRef(type) ? type.value = $event : null,
                      placeholder: "Select Type",
                      options: __props.types,
                      optionLabel: "name",
                      optionValue: "value"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-row gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "openAt" }, "Open At"),
                    createVNode(_component_Calendar, {
                      id: "openAt",
                      modelValue: unref(openAt),
                      "onUpdate:modelValue": ($event) => isRef(openAt) ? openAt.value = $event : null,
                      showIcon: "",
                      iconDisplay: "input",
                      showButtonBar: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "startedDay" }, "Started Day"),
                    createVNode(_component_Calendar, {
                      id: "startedDay",
                      modelValue: unref(startedDay),
                      "onUpdate:modelValue": ($event) => isRef(startedDay) ? startedDay.value = $event : null,
                      showIcon: "",
                      iconDisplay: "input",
                      showButtonBar: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-1 flex-col gap-2 items-end" }, [
                  createVNode("label", { for: "activated" }, "Activated"),
                  createVNode(_component_InputSwitch, {
                    id: "activated",
                    modelValue: unref(activated),
                    "onUpdate:modelValue": ($event) => isRef(activated) ? activated.value = $event : null
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/projects/CreateProjectDialog.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "EditProjectDialog",
  __ssrInlineRender: true,
  props: [
    "visible",
    "statuses",
    "types"
  ],
  setup(__props) {
    const { visible, statuses, types } = __props;
    const { currentProject } = storeToRefs(useProjectsStore());
    const { editProject } = useProjectsStore();
    const toast = useToast();
    const myVisible = ref(visible);
    const projectName = ref(currentProject.value["name"]);
    const address = ref(currentProject.value["address"]);
    const phone = ref(currentProject.value["phone"]);
    const email = ref(currentProject.value["email"]);
    const openAt = ref(getYearMonthDay(currentProject.value["open_at"]));
    const activated = ref(
      currentProject.value["activated"] == "true" ? true : false
    );
    const projectProgress = ref(currentProject.value["project_progress"]);
    const desc = ref(currentProject.value["desc"]);
    const startedDay = ref(getYearMonthDay(currentProject.value["started_day"]));
    const createdAt = ref(currentProject.value["created_at"]);
    const updatedAt = ref(currentProject.value["updated_at"]);
    const budget = ref(currentProject.value["budget"]);
    const status = ref(currentProject.value["status"]);
    const type = ref(currentProject.value["type"]);
    const onSave = async () => {
      const newProjectData = {
        ...currentProject.value,
        name: projectName.value,
        address: address.value,
        phone: phone.value,
        email: email.value,
        open_at: openAt.value,
        activated: activated.value,
        project_progress: projectProgress.value,
        desc: desc.value,
        started_day: startedDay.value,
        updated_at: (/* @__PURE__ */ new Date()).toLocaleString(),
        budget: budget.value,
        status: status.value,
        type: type.value
      };
      const response = await editProject(newProjectData);
      myVisible.value = false;
      if (response != null && response["result"] == "ok") {
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Edit Project Successfully!",
          group: "bl",
          life: 3e3
        });
      } else {
        toast.add({
          severity: "danger",
          summary: "Error",
          detail: "Failed to Edit Project",
          group: "bl",
          life: 3e3
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script;
      const _component_InputText = script$1;
      const _component_Textarea = script$2;
      const _component_InputNumber = script$3;
      const _component_Dropdown = script$4;
      const _component_Calendar = script$5;
      const _component_InputSwitch = script$6;
      const _component_Button = script$7;
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
            _push2(`<div class="inline-flex items-center justify-center gap-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>Project Details</span></div>`);
          } else {
            return [
              createVNode("div", { class: "inline-flex items-center justify-center gap-2" }, [
                createVNode("span", { class: "font-bold text-xl" }, "Project Details")
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
            _push2(`<template class="flex flex-col gap-3"${_scopeId}><div class="flex"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="projectName"${_scopeId}>Name</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "projectName",
              placeholder: "Project Name",
              modelValue: unref(projectName),
              "onUpdate:modelValue": ($event) => isRef(projectName) ? projectName.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="address"${_scopeId}>Address</label>`);
            _push2(ssrRenderComponent(_component_Textarea, {
              id: "address",
              placeholder: "Address",
              modelValue: unref(address),
              "onUpdate:modelValue": ($event) => isRef(address) ? address.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-row gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="phone"${_scopeId}>Phone Number</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "phone",
              placeholder: "+84 9698 886 660",
              modelValue: unref(phone),
              "onUpdate:modelValue": ($event) => isRef(phone) ? phone.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="email"${_scopeId}>Email</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "email",
              placeholder: "example@gmail.com",
              modelValue: unref(email),
              "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-row gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="progress"${_scopeId}>Progress</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "progress",
              modelValue: unref(projectProgress),
              "onUpdate:modelValue": ($event) => isRef(projectProgress) ? projectProgress.value = $event : null,
              inputId: "percent",
              prefix: "%",
              mode: "decimal",
              min: 0,
              max: 100
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="budget"${_scopeId}>Budget</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "budget",
              modelValue: unref(budget),
              "onUpdate:modelValue": ($event) => isRef(budget) ? budget.value = $event : null,
              inputId: "currency-us",
              mode: "currency",
              currency: "USD",
              locale: "en-US"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-row gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="status"${_scopeId}>Status</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "status",
              class: "flex-1",
              modelValue: unref(status),
              "onUpdate:modelValue": ($event) => isRef(status) ? status.value = $event : null,
              placeholder: "Select Status",
              options: __props.statuses,
              optionLabel: "name",
              optionValue: "value"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="type"${_scopeId}>Type</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "type",
              class: "flex-1",
              modelValue: unref(type),
              "onUpdate:modelValue": ($event) => isRef(type) ? type.value = $event : null,
              placeholder: "Select Type",
              options: __props.types,
              optionLabel: "name",
              optionValue: "value"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-row gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="openAt"${_scopeId}>Open At</label>`);
            _push2(ssrRenderComponent(_component_Calendar, {
              id: "openAt",
              modelValue: unref(openAt),
              "onUpdate:modelValue": ($event) => isRef(openAt) ? openAt.value = $event : null,
              showIcon: "",
              iconDisplay: "input",
              showButtonBar: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="startedDay"${_scopeId}>Started Day</label>`);
            _push2(ssrRenderComponent(_component_Calendar, {
              id: "startedDay",
              modelValue: unref(startedDay),
              "onUpdate:modelValue": ($event) => isRef(startedDay) ? startedDay.value = $event : null,
              showIcon: "",
              iconDisplay: "input",
              showButtonBar: ""
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-1 flex-col gap-2 items-end"${_scopeId}><label for="activated"${_scopeId}>Activated</label>`);
            _push2(ssrRenderComponent(_component_InputSwitch, {
              id: "activated",
              modelValue: unref(activated),
              "onUpdate:modelValue": ($event) => isRef(activated) ? activated.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-row gap-3 justify-between"${_scopeId}><span class="text-xs text-gray-400"${_scopeId}> Created at: ${ssrInterpolate(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(createdAt)))}</span><span class="text-xs text-gray-400"${_scopeId}> Updated at: ${ssrInterpolate(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(updatedAt)))}</span></div></template>`);
          } else {
            return [
              createVNode("template", { class: "flex flex-col gap-3" }, [
                createVNode("div", { class: "flex" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "projectName" }, "Name"),
                    createVNode(_component_InputText, {
                      id: "projectName",
                      placeholder: "Project Name",
                      modelValue: unref(projectName),
                      "onUpdate:modelValue": ($event) => isRef(projectName) ? projectName.value = $event : null
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                  createVNode("label", { for: "address" }, "Address"),
                  createVNode(_component_Textarea, {
                    id: "address",
                    placeholder: "Address",
                    modelValue: unref(address),
                    "onUpdate:modelValue": ($event) => isRef(address) ? address.value = $event : null
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "flex flex-row gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "phone" }, "Phone Number"),
                    createVNode(_component_InputText, {
                      id: "phone",
                      placeholder: "+84 9698 886 660",
                      modelValue: unref(phone),
                      "onUpdate:modelValue": ($event) => isRef(phone) ? phone.value = $event : null
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "email" }, "Email"),
                    createVNode(_component_InputText, {
                      id: "email",
                      placeholder: "example@gmail.com",
                      modelValue: unref(email),
                      "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-row gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "progress" }, "Progress"),
                    createVNode(_component_InputNumber, {
                      id: "progress",
                      modelValue: unref(projectProgress),
                      "onUpdate:modelValue": ($event) => isRef(projectProgress) ? projectProgress.value = $event : null,
                      inputId: "percent",
                      prefix: "%",
                      mode: "decimal",
                      min: 0,
                      max: 100
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "budget" }, "Budget"),
                    createVNode(_component_InputNumber, {
                      id: "budget",
                      modelValue: unref(budget),
                      "onUpdate:modelValue": ($event) => isRef(budget) ? budget.value = $event : null,
                      inputId: "currency-us",
                      mode: "currency",
                      currency: "USD",
                      locale: "en-US"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-row gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "status" }, "Status"),
                    createVNode(_component_Dropdown, {
                      id: "status",
                      class: "flex-1",
                      modelValue: unref(status),
                      "onUpdate:modelValue": ($event) => isRef(status) ? status.value = $event : null,
                      placeholder: "Select Status",
                      options: __props.statuses,
                      optionLabel: "name",
                      optionValue: "value"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "type" }, "Type"),
                    createVNode(_component_Dropdown, {
                      id: "type",
                      class: "flex-1",
                      modelValue: unref(type),
                      "onUpdate:modelValue": ($event) => isRef(type) ? type.value = $event : null,
                      placeholder: "Select Type",
                      options: __props.types,
                      optionLabel: "name",
                      optionValue: "value"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-row gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "openAt" }, "Open At"),
                    createVNode(_component_Calendar, {
                      id: "openAt",
                      modelValue: unref(openAt),
                      "onUpdate:modelValue": ($event) => isRef(openAt) ? openAt.value = $event : null,
                      showIcon: "",
                      iconDisplay: "input",
                      showButtonBar: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "startedDay" }, "Started Day"),
                    createVNode(_component_Calendar, {
                      id: "startedDay",
                      modelValue: unref(startedDay),
                      "onUpdate:modelValue": ($event) => isRef(startedDay) ? startedDay.value = $event : null,
                      showIcon: "",
                      iconDisplay: "input",
                      showButtonBar: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-1 flex-col gap-2 items-end" }, [
                  createVNode("label", { for: "activated" }, "Activated"),
                  createVNode(_component_InputSwitch, {
                    id: "activated",
                    modelValue: unref(activated),
                    "onUpdate:modelValue": ($event) => isRef(activated) ? activated.value = $event : null
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/projects/EditProjectDialog.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "DeleteProjectDialog",
  __ssrInlineRender: true,
  props: ["visible"],
  setup(__props) {
    const { visible } = __props;
    const toast = useToast();
    const { currentProject } = storeToRefs(useProjectsStore());
    const { deleteProject } = useProjectsStore();
    const myVisible = ref(visible);
    const onDelete = async () => {
      const response = await deleteProject(currentProject.value);
      myVisible.value = false;
      if (response != null && response["result"] == "ok") {
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Delete Project Successfully!",
          group: "bl",
          life: 3e3
        });
      } else {
        toast.add({
          severity: "danger",
          summary: "Error",
          detail: "Failed to Delete Project",
          group: "bl",
          life: 3e3
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script;
      const _component_Button = script$7;
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
            _push2(`<div class="inline-flex items-center justify-center gap-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>Delete Project?</span></div>`);
          } else {
            return [
              createVNode("div", { class: "inline-flex items-center justify-center gap-2" }, [
                createVNode("span", { class: "font-bold text-xl" }, "Delete Project?")
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
            _push2(`<div${_scopeId}><span${_scopeId}> This will delete project <b${_scopeId}>${ssrInterpolate(unref(currentProject)["name"])}</b> permanently! </span><span${_scopeId}>You cannot undo this action!</span></div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode("span", null, [
                  createTextVNode(" This will delete project "),
                  createVNode("b", null, toDisplayString(unref(currentProject)["name"]), 1),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/projects/DeleteProjectDialog.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { projects, currentProject } = storeToRefs(useProjectsStore());
    const { getProjects } = useProjectsStore();
    [__temp, __restore] = withAsyncContext(() => getProjects()), await __temp, __restore();
    const user = ref({});
    const userPermissionForActions = user.value["type"] != "admin" || user.value["type"] != "super_admin" || user.value["type"] != "sale_manager" ? true : false;
    const statuses = ref([{ name: "Working", value: "working" }]);
    const types = ref([
      { name: "High", value: "high" },
      { name: "Land", value: "land" },
      { name: "Hybrid", value: "hybrid" }
    ]);
    const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    const viewDetailsProjectDialogVisible = ref(false);
    const createProjectDialogVisible = ref(false);
    const editProjectDialogVisible = ref(false);
    const deleteProjectDialogVisible = ref(false);
    const toggleViewProjectDetails = async (data) => {
      currentProject.value = data;
      viewDetailsProjectDialogVisible.value = !viewDetailsProjectDialogVisible.value;
    };
    const toggleEditProject = async (data) => {
      currentProject.value = data;
      editProjectDialogVisible.value = !editProjectDialogVisible.value;
    };
    const toggleDeleteProject = async (data) => {
      currentProject.value = data;
      deleteProjectDialogVisible.value = !deleteProjectDialogVisible.value;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Tag = script$8;
      const _component_IconField = script$9;
      const _component_InputIcon = script$a;
      const _component_Icon = __nuxt_component_1;
      const _component_InputText = script$1;
      const _component_Button = script$7;
      const _component_DataTable = script$b;
      const _component_Column = script$c;
      const _component_Knob = script$d;
      const _component_ViewDetailsProjectDialog = _sfc_main$4;
      const _component_CreateProjectDialog = _sfc_main$3;
      const _component_EditProjectDialog = _sfc_main$2;
      const _component_DeleteProjectDialog = _sfc_main$1;
      const _directive_auto_animate = resolveDirective("auto-animate");
      _push(`<!--[--><div class="w-full h-full flex flex-col"><div class="fixed right-0 top-0 z-50 backdrop-blur-xl w-5/6 h-[8%] px-4 border-b flex justify-between items-center"><div class="flex items-center gap-2"><span class="font-semibold text-lg">Project</span>`);
      _push(ssrRenderComponent(_component_Tag, {
        value: unref(projects).length
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
              placeholder: "Filter Project..."
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
                placeholder: "Filter Project..."
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(userPermissionForActions)) {
        _push(ssrRenderComponent(_component_Button, {
          size: "small",
          label: "New",
          onClick: ($event) => createProjectDialogVisible.value = !unref(createProjectDialogVisible)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="absolute top-[8%] w-full h-[92%]">`);
      _push(ssrRenderComponent(_component_DataTable, mergeProps({
        value: unref(projects),
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
            _push2(`<div class="flex justify-center items-center"${_scopeId}><span${_scopeId}>No Project Found.</span></div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-center items-center" }, [
                createVNode("span", null, "No Project Found.")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Column, {
              field: "name",
              header: "Name"
            }, {
              body: withCtx(({ data }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(data["name"])}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(data["name"]), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Column, {
              field: "address",
              header: "Address"
            }, {
              body: withCtx(({ data }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(("hideLongText" in _ctx ? _ctx.hideLongText : unref(hideLongText))(data["address"]))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(("hideLongText" in _ctx ? _ctx.hideLongText : unref(hideLongText))(data["address"])), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Column, {
              field: "type",
              header: "Type"
            }, {
              body: withCtx(({ data }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(("capitalize" in _ctx ? _ctx.capitalize : unref(capitalize))(data["type"]))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(("capitalize" in _ctx ? _ctx.capitalize : unref(capitalize))(data["type"])), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Column, {
              field: "progress",
              header: "Progress",
              sortable: ""
            }, {
              body: withCtx(({ data }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Knob, {
                    modelValue: data["project_progress"],
                    "onUpdate:modelValue": ($event) => data["project_progress"] = $event,
                    readonly: "",
                    size: 50
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Knob, {
                      modelValue: data["project_progress"],
                      "onUpdate:modelValue": ($event) => data["project_progress"] = $event,
                      readonly: "",
                      size: 50
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Column, { header: "Actions" }, {
              body: withCtx(({ data }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Button, {
                    text: "",
                    severity: "secondary",
                    onClick: ($event) => toggleViewProjectDetails(data)
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
                  if (unref(userPermissionForActions)) {
                    _push3(ssrRenderComponent(_component_Button, {
                      text: "",
                      severity: "secondary",
                      onClick: ($event) => toggleEditProject(data)
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
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(userPermissionForActions)) {
                    _push3(ssrRenderComponent(_component_Button, {
                      text: "",
                      severity: "danger",
                      onClick: ($event) => toggleDeleteProject(data)
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
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(_component_Button, {
                      text: "",
                      severity: "secondary",
                      onClick: ($event) => toggleViewProjectDetails(data)
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, { name: "mdi:eye-outline" })
                      ]),
                      _: 2
                    }, 1032, ["onClick"]),
                    unref(userPermissionForActions) ? (openBlock(), createBlock(_component_Button, {
                      key: 0,
                      text: "",
                      severity: "secondary",
                      onClick: ($event) => toggleEditProject(data)
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, { name: "mdi:edit-outline" })
                      ]),
                      _: 2
                    }, 1032, ["onClick"])) : createCommentVNode("", true),
                    unref(userPermissionForActions) ? (openBlock(), createBlock(_component_Button, {
                      key: 1,
                      text: "",
                      severity: "danger",
                      onClick: ($event) => toggleDeleteProject(data)
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, { name: "mdi:delete-outline" })
                      ]),
                      _: 2
                    }, 1032, ["onClick"])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Column, {
                field: "name",
                header: "Name"
              }, {
                body: withCtx(({ data }) => [
                  createTextVNode(toDisplayString(data["name"]), 1)
                ]),
                _: 1
              }),
              createVNode(_component_Column, {
                field: "address",
                header: "Address"
              }, {
                body: withCtx(({ data }) => [
                  createTextVNode(toDisplayString(("hideLongText" in _ctx ? _ctx.hideLongText : unref(hideLongText))(data["address"])), 1)
                ]),
                _: 1
              }),
              createVNode(_component_Column, {
                field: "type",
                header: "Type"
              }, {
                body: withCtx(({ data }) => [
                  createTextVNode(toDisplayString(("capitalize" in _ctx ? _ctx.capitalize : unref(capitalize))(data["type"])), 1)
                ]),
                _: 1
              }),
              createVNode(_component_Column, {
                field: "progress",
                header: "Progress",
                sortable: ""
              }, {
                body: withCtx(({ data }) => [
                  createVNode(_component_Knob, {
                    modelValue: data["project_progress"],
                    "onUpdate:modelValue": ($event) => data["project_progress"] = $event,
                    readonly: "",
                    size: 50
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_Column, { header: "Actions" }, {
                body: withCtx(({ data }) => [
                  createVNode(_component_Button, {
                    text: "",
                    severity: "secondary",
                    onClick: ($event) => toggleViewProjectDetails(data)
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, { name: "mdi:eye-outline" })
                    ]),
                    _: 2
                  }, 1032, ["onClick"]),
                  unref(userPermissionForActions) ? (openBlock(), createBlock(_component_Button, {
                    key: 0,
                    text: "",
                    severity: "secondary",
                    onClick: ($event) => toggleEditProject(data)
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, { name: "mdi:edit-outline" })
                    ]),
                    _: 2
                  }, 1032, ["onClick"])) : createCommentVNode("", true),
                  unref(userPermissionForActions) ? (openBlock(), createBlock(_component_Button, {
                    key: 1,
                    text: "",
                    severity: "danger",
                    onClick: ($event) => toggleDeleteProject(data)
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, { name: "mdi:delete-outline" })
                    ]),
                    _: 2
                  }, 1032, ["onClick"])) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      if (unref(viewDetailsProjectDialogVisible)) {
        _push(ssrRenderComponent(_component_ViewDetailsProjectDialog, {
          visible: unref(viewDetailsProjectDialogVisible),
          statuses: unref(statuses),
          types: unref(types)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(createProjectDialogVisible)) {
        _push(ssrRenderComponent(_component_CreateProjectDialog, {
          visible: unref(createProjectDialogVisible),
          statuses: unref(statuses),
          types: unref(types)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(editProjectDialogVisible)) {
        _push(ssrRenderComponent(_component_EditProjectDialog, {
          visible: unref(editProjectDialogVisible),
          statuses: unref(statuses),
          types: unref(types)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(deleteProjectDialogVisible)) {
        _push(ssrRenderComponent(_component_DeleteProjectDialog, { visible: unref(deleteProjectDialogVisible) }, null, _parent));
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/projects/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-BtPiG4t9.js.map
