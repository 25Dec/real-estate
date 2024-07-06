import script from "./dialog.esm-Wemb0g_v.js";
import script$1 from "./inputtext.esm-Blvd_dSV.js";
import script$2 from "./dropdown.esm-BZz-eegH.js";
import script$3 from "./button.esm-D8sVcJb8.js";
import { withAsyncContext, ref, mergeProps, unref, isRef, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import "hookable";
import "destr";
import "klona";
import "devalue";
import "#internal/nuxt/paths";
import { s as storeToRefs, c as useRouter, u as useToast } from "../server.mjs";
import { u as useCustomersStore } from "./customers-store-DoxVOnyQ.js";
import { u as useProjectsStore } from "./projects-store-50IgnX7b.js";
import { c as capitalize, a as convertDateTime } from "./core_utils-WJ_cJnbk.js";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
const _sfc_main$1 = {
  __name: "ViewDetailsCustomerDialog",
  __ssrInlineRender: true,
  props: ["visible"],
  async setup(__props) {
    var _a, _b, _c, _d;
    let __temp, __restore;
    const { visible } = __props;
    const { currentCustomer } = storeToRefs(useCustomersStore());
    const { projectsDropdown } = storeToRefs(useProjectsStore());
    const { getProjects } = useProjectsStore();
    [__temp, __restore] = withAsyncContext(() => getProjects()), await __temp, __restore();
    const myVisible = ref(visible);
    ref(currentCustomer.value["social_id"]);
    const phone = ref(currentCustomer.value["phone"]);
    const firstName = ref(currentCustomer.value["first_name"]);
    const lastName = ref(currentCustomer.value["last_name"]);
    const email = ref(currentCustomer.value["email"]);
    const contacted = ref({
      name: capitalize(currentCustomer.value["contacted"]),
      value: currentCustomer.value["contacted"]
    });
    const potential = ref({
      name: capitalize(currentCustomer.value["potential"]),
      value: currentCustomer.value["potential"]
    });
    const projectID = ref({
      name: (_b = (_a = projectsDropdown.value.filter(
        (pj) => pj["value"] == currentCustomer.value["project_id"]
      )) == null ? void 0 : _a[0]) == null ? void 0 : _b["name"],
      value: (_d = (_c = projectsDropdown.value.filter(
        (pj) => pj["value"] == currentCustomer.value["project_id"]
      )) == null ? void 0 : _c[0]) == null ? void 0 : _d["value"]
    });
    const createdAt = ref(currentCustomer.value["created_at"]);
    const updatedAt = ref(currentCustomer.value["updated_at"]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script;
      const _component_InputText = script$1;
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
            _push2(`<div class="inline-flex items-center justify-center gap-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>Customer Details</span></div>`);
          } else {
            return [
              createVNode("div", { class: "inline-flex items-center justify-center gap-2" }, [
                createVNode("span", { class: "font-bold text-xl" }, "Customer Details")
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
            _push2(`<template class="flex flex-col gap-3"${_scopeId}><div class="flex flex-row gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="firstName"${_scopeId}>First Name</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "firstName",
              placeholder: "First Name",
              modelValue: unref(firstName),
              "onUpdate:modelValue": ($event) => isRef(firstName) ? firstName.value = $event : null,
              modelModifiers: { trim: true },
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="lastName"${_scopeId}>Last Name</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "lastName",
              placeholder: "Last Name",
              modelValue: unref(lastName),
              "onUpdate:modelValue": ($event) => isRef(lastName) ? lastName.value = $event : null,
              modelModifiers: { trim: true },
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-row gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="phone"${_scopeId}>Phone Number</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "phone",
              placeholder: "+84 9698 886 660",
              modelValue: unref(phone),
              "onUpdate:modelValue": ($event) => isRef(phone) ? phone.value = $event : null,
              modelModifiers: { trim: true },
              integeronly: "",
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="email"${_scopeId}>Email</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "email",
              placeholder: "example@gmail.com",
              modelValue: unref(email),
              "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
              modelModifiers: { trim: true },
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="projectID"${_scopeId}>Project</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "projectID",
              placeholder: "Select Project",
              modelValue: unref(projectID).value,
              "onUpdate:modelValue": ($event) => unref(projectID).value = $event,
              options: unref(projectsDropdown),
              optionLabel: "name",
              optionValue: "value",
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-row gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="contacted"${_scopeId}>Contacted</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "contacted",
              placeholder: "True or False",
              modelValue: unref(contacted).value,
              "onUpdate:modelValue": ($event) => unref(contacted).value = $event,
              options: [
                { name: "True", value: "true" },
                { name: "False", value: "false" }
              ],
              optionLabel: "name",
              optionValue: "value",
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="Potential"${_scopeId}>Potential</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "Potential",
              placeholder: "True or False",
              modelValue: unref(potential).value,
              "onUpdate:modelValue": ($event) => unref(potential).value = $event,
              options: [
                { name: "True", value: "true" },
                { name: "False", value: "false" }
              ],
              optionLabel: "name",
              optionValue: "value",
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-row gap-3 justify-between"${_scopeId}><span class="text-xs text-gray-400"${_scopeId}> Created at: ${ssrInterpolate(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(createdAt)))}</span><span class="text-xs text-gray-400"${_scopeId}> Updated at: ${ssrInterpolate(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(updatedAt)))}</span></div></template>`);
          } else {
            return [
              createVNode("template", { class: "flex flex-col gap-3" }, [
                createVNode("div", { class: "flex flex-row gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "firstName" }, "First Name"),
                    createVNode(_component_InputText, {
                      id: "firstName",
                      placeholder: "First Name",
                      modelValue: unref(firstName),
                      "onUpdate:modelValue": ($event) => isRef(firstName) ? firstName.value = $event : null,
                      modelModifiers: { trim: true },
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "lastName" }, "Last Name"),
                    createVNode(_component_InputText, {
                      id: "lastName",
                      placeholder: "Last Name",
                      modelValue: unref(lastName),
                      "onUpdate:modelValue": ($event) => isRef(lastName) ? lastName.value = $event : null,
                      modelModifiers: { trim: true },
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-row gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "phone" }, "Phone Number"),
                    createVNode(_component_InputText, {
                      id: "phone",
                      placeholder: "+84 9698 886 660",
                      modelValue: unref(phone),
                      "onUpdate:modelValue": ($event) => isRef(phone) ? phone.value = $event : null,
                      modelModifiers: { trim: true },
                      integeronly: "",
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
                      modelModifiers: { trim: true },
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                  createVNode("label", { for: "projectID" }, "Project"),
                  createVNode(_component_Dropdown, {
                    id: "projectID",
                    placeholder: "Select Project",
                    modelValue: unref(projectID).value,
                    "onUpdate:modelValue": ($event) => unref(projectID).value = $event,
                    options: unref(projectsDropdown),
                    optionLabel: "name",
                    optionValue: "value",
                    disabled: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                ]),
                createVNode("div", { class: "flex flex-row gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "contacted" }, "Contacted"),
                    createVNode(_component_Dropdown, {
                      id: "contacted",
                      placeholder: "True or False",
                      modelValue: unref(contacted).value,
                      "onUpdate:modelValue": ($event) => unref(contacted).value = $event,
                      options: [
                        { name: "True", value: "true" },
                        { name: "False", value: "false" }
                      ],
                      optionLabel: "name",
                      optionValue: "value",
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "Potential" }, "Potential"),
                    createVNode(_component_Dropdown, {
                      id: "Potential",
                      placeholder: "True or False",
                      modelValue: unref(potential).value,
                      "onUpdate:modelValue": ($event) => unref(potential).value = $event,
                      options: [
                        { name: "True", value: "true" },
                        { name: "False", value: "false" }
                      ],
                      optionLabel: "name",
                      optionValue: "value",
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/customers/ViewDetailsCustomerDialog.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "EditCustomerDialog",
  __ssrInlineRender: true,
  props: ["visible"],
  async setup(__props) {
    var _a, _b, _c, _d;
    let __temp, __restore;
    const { visible } = __props;
    const { currentCustomer } = storeToRefs(useCustomersStore());
    const { editCustomer } = useCustomersStore();
    const { projectsDropdown } = storeToRefs(useProjectsStore());
    const { getProjects } = useProjectsStore();
    const router = useRouter();
    const currentRoute = router["currentRoute"].value;
    const toast = useToast();
    [__temp, __restore] = withAsyncContext(() => getProjects()), await __temp, __restore();
    const myVisible = ref(visible);
    const socialID = ref(currentCustomer.value["social_id"]);
    const phone = ref(currentCustomer.value["phone"]);
    const firstName = ref(currentCustomer.value["first_name"]);
    const lastName = ref(currentCustomer.value["last_name"]);
    const email = ref(currentCustomer.value["email"]);
    const contacted = ref({
      name: capitalize(currentCustomer.value["contacted"]),
      value: currentCustomer.value["contacted"]
    });
    const potential = ref({
      name: capitalize(currentCustomer.value["potential"]),
      value: currentCustomer.value["potential"]
    });
    const projectID = ref({
      name: (_b = (_a = projectsDropdown.value.filter(
        (pj) => pj["value"] == currentCustomer.value["project_id"]
      )) == null ? void 0 : _a[0]) == null ? void 0 : _b["name"],
      value: (_d = (_c = projectsDropdown.value.filter(
        (pj) => pj["value"] == currentCustomer.value["project_id"]
      )) == null ? void 0 : _c[0]) == null ? void 0 : _d["value"]
    });
    const createdAt = ref(currentCustomer.value["created_at"]);
    const updatedAt = ref(currentCustomer.value["updated_at"]);
    const onSave = async () => {
      const newCustomerData = {
        ...currentCustomer.value,
        social_id: socialID.value,
        phone: phone.value,
        first_name: firstName.value,
        last_name: lastName.value,
        display_name: `${firstName.value} ${lastName.value}`,
        email: email.value,
        contacted: contacted.value.value,
        potential: potential.value.value,
        project_id: projectID.value.value,
        updated_at: (/* @__PURE__ */ new Date()).toLocaleString()
      };
      const response = await editCustomer(newCustomerData);
      myVisible.value = false;
      if (response != null && response["result"] == "ok") {
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Edit Customer Successfully!",
          group: "bl",
          life: 3e3
        });
      } else {
        toast.add({
          severity: "danger",
          summary: "Error",
          detail: "Failed to Edit Customer",
          group: "bl",
          life: 3e3
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script;
      const _component_InputText = script$1;
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
            _push2(`<div class="inline-flex items-center justify-center gap-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>Customer Details</span></div>`);
          } else {
            return [
              createVNode("div", { class: "inline-flex items-center justify-center gap-2" }, [
                createVNode("span", { class: "font-bold text-xl" }, "Customer Details")
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
            _push2(`<template class="flex flex-col gap-3"${_scopeId}><div class="flex flex-row gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="firstName"${_scopeId}>First Name</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "firstName",
              placeholder: "First Name",
              modelValue: unref(firstName),
              "onUpdate:modelValue": ($event) => isRef(firstName) ? firstName.value = $event : null,
              modelModifiers: { trim: true },
              disabled: unref(currentRoute)["path"].includes("project_details") ? true : false
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="lastName"${_scopeId}>Last Name</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "lastName",
              placeholder: "Last Name",
              modelValue: unref(lastName),
              "onUpdate:modelValue": ($event) => isRef(lastName) ? lastName.value = $event : null,
              modelModifiers: { trim: true },
              disabled: unref(currentRoute)["path"].includes("project_details") ? true : false
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-row gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="phone"${_scopeId}>Phone Number</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "phone",
              placeholder: "+84 9698 886 660",
              modelValue: unref(phone),
              "onUpdate:modelValue": ($event) => isRef(phone) ? phone.value = $event : null,
              modelModifiers: { trim: true },
              integeronly: "",
              disabled: unref(currentRoute)["path"].includes("project_details") ? true : false
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="email"${_scopeId}>Email</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "email",
              placeholder: "example@gmail.com",
              modelValue: unref(email),
              "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
              modelModifiers: { trim: true },
              disabled: unref(currentRoute)["path"].includes("project_details") ? true : false
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="projectID"${_scopeId}>Project</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "projectID",
              placeholder: "Select Project",
              modelValue: unref(projectID).value,
              "onUpdate:modelValue": ($event) => unref(projectID).value = $event,
              options: unref(projectsDropdown),
              optionLabel: "name",
              optionValue: "value",
              disabled: unref(currentRoute)["path"].includes("project_details") ? true : false
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-row gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="contacted"${_scopeId}>Contacted</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "contacted",
              placeholder: "True or False",
              modelValue: unref(contacted).value,
              "onUpdate:modelValue": ($event) => unref(contacted).value = $event,
              options: [
                { name: "True", value: "true" },
                { name: "False", value: "false" }
              ],
              optionLabel: "name",
              optionValue: "value",
              disabled: unref(currentRoute)["path"].includes("admin") ? true : false
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="Potential"${_scopeId}>Potential</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "Potential",
              placeholder: "True or False",
              modelValue: unref(potential).value,
              "onUpdate:modelValue": ($event) => unref(potential).value = $event,
              options: [
                { name: "True", value: "true" },
                { name: "False", value: "false" }
              ],
              optionLabel: "name",
              optionValue: "value",
              disabled: unref(currentRoute)["path"].includes("admin") ? true : false
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-row gap-3 justify-between"${_scopeId}><span class="text-xs text-gray-400"${_scopeId}> Created at: ${ssrInterpolate(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(createdAt)))}</span><span class="text-xs text-gray-400"${_scopeId}> Updated at: ${ssrInterpolate(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(updatedAt)))}</span></div></template>`);
          } else {
            return [
              createVNode("template", { class: "flex flex-col gap-3" }, [
                createVNode("div", { class: "flex flex-row gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "firstName" }, "First Name"),
                    createVNode(_component_InputText, {
                      id: "firstName",
                      placeholder: "First Name",
                      modelValue: unref(firstName),
                      "onUpdate:modelValue": ($event) => isRef(firstName) ? firstName.value = $event : null,
                      modelModifiers: { trim: true },
                      disabled: unref(currentRoute)["path"].includes("project_details") ? true : false
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "lastName" }, "Last Name"),
                    createVNode(_component_InputText, {
                      id: "lastName",
                      placeholder: "Last Name",
                      modelValue: unref(lastName),
                      "onUpdate:modelValue": ($event) => isRef(lastName) ? lastName.value = $event : null,
                      modelModifiers: { trim: true },
                      disabled: unref(currentRoute)["path"].includes("project_details") ? true : false
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-row gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "phone" }, "Phone Number"),
                    createVNode(_component_InputText, {
                      id: "phone",
                      placeholder: "+84 9698 886 660",
                      modelValue: unref(phone),
                      "onUpdate:modelValue": ($event) => isRef(phone) ? phone.value = $event : null,
                      modelModifiers: { trim: true },
                      integeronly: "",
                      disabled: unref(currentRoute)["path"].includes("project_details") ? true : false
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "email" }, "Email"),
                    createVNode(_component_InputText, {
                      id: "email",
                      placeholder: "example@gmail.com",
                      modelValue: unref(email),
                      "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                      modelModifiers: { trim: true },
                      disabled: unref(currentRoute)["path"].includes("project_details") ? true : false
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                  createVNode("label", { for: "projectID" }, "Project"),
                  createVNode(_component_Dropdown, {
                    id: "projectID",
                    placeholder: "Select Project",
                    modelValue: unref(projectID).value,
                    "onUpdate:modelValue": ($event) => unref(projectID).value = $event,
                    options: unref(projectsDropdown),
                    optionLabel: "name",
                    optionValue: "value",
                    disabled: unref(currentRoute)["path"].includes("project_details") ? true : false
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "disabled"])
                ]),
                createVNode("div", { class: "flex flex-row gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "contacted" }, "Contacted"),
                    createVNode(_component_Dropdown, {
                      id: "contacted",
                      placeholder: "True or False",
                      modelValue: unref(contacted).value,
                      "onUpdate:modelValue": ($event) => unref(contacted).value = $event,
                      options: [
                        { name: "True", value: "true" },
                        { name: "False", value: "false" }
                      ],
                      optionLabel: "name",
                      optionValue: "value",
                      disabled: unref(currentRoute)["path"].includes("admin") ? true : false
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "Potential" }, "Potential"),
                    createVNode(_component_Dropdown, {
                      id: "Potential",
                      placeholder: "True or False",
                      modelValue: unref(potential).value,
                      "onUpdate:modelValue": ($event) => unref(potential).value = $event,
                      options: [
                        { name: "True", value: "true" },
                        { name: "False", value: "false" }
                      ],
                      optionLabel: "name",
                      optionValue: "value",
                      disabled: unref(currentRoute)["path"].includes("admin") ? true : false
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/customers/EditCustomerDialog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main$1 as _,
  _sfc_main as a
};
//# sourceMappingURL=EditCustomerDialog-BDEjiSHU.js.map
