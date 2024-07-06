import script from './tag.esm-Bkya-FxV.mjs';
import script$1 from './iconfield.esm-CMjnwUAR.mjs';
import script$2 from './inputicon.esm-DsrGfACI.mjs';
import __nuxt_component_1 from './Icon-B04GAuZ4.mjs';
import script$3 from './inputtext.esm-Blvd_dSV.mjs';
import script$4 from './button.esm-D8sVcJb8.mjs';
import script$5 from './dropdown.esm-BZz-eegH.mjs';
import script$6 from './datatable.esm-BAh19VmC.mjs';
import script$7 from './column.esm-KktM_xTo.mjs';
import script$8 from './avatar.esm-G-uX_ALX.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$3 } from './EditCustomerDialog-BDEjiSHU.mjs';
import script$9 from './dialog.esm-Wemb0g_v.mjs';
import { u as useCustomersStore } from './customers-store-DoxVOnyQ.mjs';
import { withAsyncContext, ref, computed, resolveDirective, unref, withCtx, createVNode, mergeProps, isRef, toDisplayString, createTextVNode, useSSRContext } from 'vue';
import { s as storeToRefs, F as FilterMatchMode, u as useToast } from './server.mjs';
import { u as useProjectsStore } from './projects-store-50IgnX7b.mjs';
import { ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate } from 'vue/server-renderer';
import './basecomponent.esm-DXWDIfdj.mjs';
import './index-DE5HZNjr.mjs';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'ipx';
import '@iconify/vue/dist/offline';
import '@iconify/vue';
import './badge.esm-CGMv5799.mjs';
import './index.esm-C7T4V9vj.mjs';
import './baseicon.esm-DbzTeshI.mjs';
import './index.esm-BIjuQzNw.mjs';
import './index.esm-Clcms31c.mjs';
import './index.esm-CBLFGZyH.mjs';
import './index.esm-CbKY_bSB.mjs';
import './overlayeventbus.esm-Cq2NCN3a.mjs';
import './portal.esm-CdWWxjdD.mjs';
import './virtualscroller.esm-QhUci9XU.mjs';
import './paginator.esm-BvYTZ1KY.mjs';
import './index.esm-7xcJfJVp.mjs';
import './inputnumber.esm-CMvh_h4P.mjs';
import './index.esm-Dpdcp6OZ.mjs';
import './index.esm-CE-esNCM.mjs';
import './index.esm-ByqdG2PS.mjs';
import './index.esm-C03T_CK6.mjs';
import './index.esm-Cs4cT7wr.mjs';
import './checkbox.esm-Duuim8Iu.mjs';
import './radiobutton.esm-CQ1mq00b.mjs';
import './index.esm-BvZNBu0f.mjs';
import './index.esm-DTIot6dj.mjs';
import './core_utils-WJ_cJnbk.mjs';
import './fetch-DXSGE_KZ.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@formkit/auto-animate/vue';
import 'framesync';
import 'popmotion';
import 'style-value-types';

const _sfc_main$2 = {
  __name: "CreateCustomerDialog",
  __ssrInlineRender: true,
  props: ["visible"],
  async setup(__props) {
    let __temp, __restore;
    const { visible } = __props;
    const { addNewCustomer } = useCustomersStore();
    const { projectsDropdown } = storeToRefs(useProjectsStore());
    const { getProjects } = useProjectsStore();
    const toast = useToast();
    [__temp, __restore] = withAsyncContext(() => getProjects()), await __temp, __restore();
    const myVisible = ref(visible);
    const socialID = ref("");
    const phone = ref("");
    const firstName = ref("");
    const lastName = ref("");
    const email = ref("");
    const projectID = ref({});
    const onSave = async () => {
      const newCustomerData = {
        id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1,
        social_id: socialID.value,
        phone: phone.value,
        first_name: firstName.value,
        last_name: lastName.value,
        display_name: `${firstName.value} ${lastName.value}`,
        email: email.value,
        project_id: parseInt(projectID.value.value),
        activated: "true",
        deleted: "false",
        created_by: 1,
        updated_by: 1,
        created_at: (/* @__PURE__ */ new Date()).toLocaleString(),
        updated_at: null
      };
      const response = await addNewCustomer(newCustomerData);
      myVisible.value = false;
      if (response != null && response["result"] == "ok") {
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Create New Customer Successfully!",
          group: "bl",
          life: 3e3
        });
      } else {
        toast.add({
          severity: "danger",
          summary: "Error",
          detail: "Failed to Create New Customer",
          group: "bl",
          life: 3e3
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script$9;
      const _component_InputText = script$3;
      const _component_Dropdown = script$5;
      const _component_Button = script$4;
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
            _push2(`<div class="inline-flex items-center justify-center gap-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>Create New Customer</span></div>`);
          } else {
            return [
              createVNode("div", { class: "inline-flex items-center justify-center gap-2" }, [
                createVNode("span", { class: "font-bold text-xl" }, "Create New Customer")
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
              modelModifiers: { trim: true }
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="lastName"${_scopeId}>Last Name</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "lastName",
              placeholder: "Last Name",
              modelValue: unref(lastName),
              "onUpdate:modelValue": ($event) => isRef(lastName) ? lastName.value = $event : null,
              modelModifiers: { trim: true }
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-row gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="phone"${_scopeId}>Phone Number</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "phone",
              placeholder: "+84 9698 886 660",
              modelValue: unref(phone),
              "onUpdate:modelValue": ($event) => isRef(phone) ? phone.value = $event : null,
              modelModifiers: { trim: true },
              integeronly: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="email"${_scopeId}>Email</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "email",
              placeholder: "example@gmail.com",
              modelValue: unref(email),
              "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
              modelModifiers: { trim: true }
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="projectID"${_scopeId}>Project</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "projectID",
              placeholder: "Select Project",
              modelValue: unref(projectID).value,
              "onUpdate:modelValue": ($event) => unref(projectID).value = $event,
              options: unref(projectsDropdown),
              optionLabel: "name",
              optionValue: "value"
            }, null, _parent2, _scopeId));
            _push2(`</div></template>`);
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
                      modelModifiers: { trim: true }
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "lastName" }, "Last Name"),
                    createVNode(_component_InputText, {
                      id: "lastName",
                      placeholder: "Last Name",
                      modelValue: unref(lastName),
                      "onUpdate:modelValue": ($event) => isRef(lastName) ? lastName.value = $event : null,
                      modelModifiers: { trim: true }
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
                      integeronly: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "email" }, "Email"),
                    createVNode(_component_InputText, {
                      id: "email",
                      placeholder: "example@gmail.com",
                      modelValue: unref(email),
                      "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                      modelModifiers: { trim: true }
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
                    optionValue: "value"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/customers/CreateCustomerDialog.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "DeleteCustomerDialog",
  __ssrInlineRender: true,
  props: ["visible"],
  setup(__props) {
    const { visible } = __props;
    const { currentCustomer } = storeToRefs(useCustomersStore());
    const { deleteCustomer } = useCustomersStore();
    const toast = useToast();
    const myVisible = ref(visible);
    const onDelete = async () => {
      const response = await deleteCustomer(currentCustomer.value);
      myVisible.value = false;
      if (response != null && response["result"] == "ok") {
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Delete Customer Successfully!",
          group: "bl",
          life: 3e3
        });
      } else {
        toast.add({
          severity: "danger",
          summary: "Error",
          detail: "Failed to Delete Customer",
          group: "bl",
          life: 3e3
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script$9;
      const _component_Button = script$4;
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
            _push2(`<div class="inline-flex items-center justify-center gap-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>Delete Customer?</span></div>`);
          } else {
            return [
              createVNode("div", { class: "inline-flex items-center justify-center gap-2" }, [
                createVNode("span", { class: "font-bold text-xl" }, "Delete Customer?")
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
            _push2(`<div${_scopeId}><span${_scopeId}> This will delete customer <b${_scopeId}>${ssrInterpolate(`${unref(currentCustomer)["first_name"]} ${unref(currentCustomer)["last_name"]}`)}</b> permanently! </span><span${_scopeId}>You cannot undo this action!</span></div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode("span", null, [
                  createTextVNode(" This will delete customer "),
                  createVNode("b", null, toDisplayString(`${unref(currentCustomer)["first_name"]} ${unref(currentCustomer)["last_name"]}`), 1),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/customers/DeleteCustomerDialog.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a2, _b2;
    var _a, _b;
    let __temp, __restore;
    const { customers, currentCustomer } = storeToRefs(useCustomersStore());
    const { getCustomers } = useCustomersStore();
    const { projects, projectsDropdown } = storeToRefs(useProjectsStore());
    const { getProjects } = useProjectsStore();
    [__temp, __restore] = withAsyncContext(() => getCustomers()), await __temp, __restore();
    [__temp, __restore] = withAsyncContext(() => getProjects()), await __temp, __restore();
    const currentProject = ref({
      name: (_a2 = (_a = projectsDropdown.value[0]) == null ? void 0 : _a.name) != null ? _a2 : "",
      value: (_b2 = (_b = projectsDropdown.value[0]) == null ? void 0 : _b.value) != null ? _b2 : ""
    });
    const myCustomersBaseOnProjectID = computed(() => {
      return customers.value.filter((customer) => {
        return customer["project_id"] == currentProject.value.value;
      });
    });
    ref([
      { name: "Anonymous", value: "anonymous" },
      { name: "Sale", value: "sale" },
      { name: "Sale Manager", value: "sale_manager" },
      { name: "Admin", value: "admin" },
      { name: "Super Admin", value: "super_admin" }
    ]);
    const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    const viewDetailsCustomerDialogVisible = ref(false);
    const createCustomerDialogVisible = ref(false);
    const editCustomerDialogVisible = ref(false);
    const deleteCustomerDialogVisible = ref(false);
    const handleDropdown = (event) => {
      myCustomersBaseOnProjectID.value = customers.value.filter((customer) => {
        return customer["project_id"] == event.value;
      });
    };
    const viewDetailsCustomer = (data) => {
      currentCustomer.value = data;
      viewDetailsCustomerDialogVisible.value = !viewDetailsCustomerDialogVisible.value;
    };
    const editCustomer = (data) => {
      currentCustomer.value = data;
      editCustomerDialogVisible.value = !editCustomerDialogVisible.value;
    };
    const deleteCustomer = async (data) => {
      currentCustomer.value = data;
      deleteCustomerDialogVisible.value = !deleteCustomerDialogVisible.value;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Tag = script;
      const _component_IconField = script$1;
      const _component_InputIcon = script$2;
      const _component_Icon = __nuxt_component_1;
      const _component_InputText = script$3;
      const _component_Button = script$4;
      const _component_Dropdown = script$5;
      const _component_DataTable = script$6;
      const _component_Column = script$7;
      const _component_Avatar = script$8;
      const _component_ViewDetailsCustomerDialog = _sfc_main$1$1;
      const _component_CreateCustomerDialog = _sfc_main$2;
      const _component_EditCustomerDialog = _sfc_main$3;
      const _component_DeleteCustomerDialog = _sfc_main$1;
      const _directive_auto_animate = resolveDirective("auto-animate");
      _push(`<!--[--><div class="w-full h-full flex flex-col"><div class="fixed right-0 top-0 z-50 backdrop-blur-xl w-5/6 h-[8%] px-4 border-b flex justify-between items-center"><div class="flex items-center gap-2"><span class="font-semibold text-lg">Customers</span>`);
      _push(ssrRenderComponent(_component_Tag, {
        value: unref(myCustomersBaseOnProjectID).length
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
              placeholder: "Filter Customer..."
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
                placeholder: "Filter Customer..."
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Button, {
        size: "small",
        label: "New",
        onClick: ($event) => createCustomerDialogVisible.value = !unref(createCustomerDialogVisible)
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
        value: unref(myCustomersBaseOnProjectID),
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
            _push2(`<div class="flex justify-center items-center"${_scopeId}><span${_scopeId}>No Customers Found.</span></div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-center items-center" }, [
                createVNode("span", null, "No Customers Found.")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Column, {
              field: "fullname",
              header: "Full Name"
            }, {
              body: withCtx(({ data }, _push3, _parent3, _scopeId2) => {
                var _a22, _b22;
                if (_push3) {
                  _push3(`<div class="flex items-center gap-3"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Avatar, {
                    label: (_a22 = data["first_name"]) == null ? void 0 : _a22.substring(0, 3),
                    shape: "square"
                  }, null, _parent3, _scopeId2));
                  _push3(`<div class="flex flex-col"${_scopeId2}><span class="font-semibold"${_scopeId2}>${ssrInterpolate(`${data["first_name"]} ${data["last_name"]}`)}</span><span${_scopeId2}>${ssrInterpolate(data["email"])}</span></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center gap-3" }, [
                      createVNode(_component_Avatar, {
                        label: (_b22 = data["first_name"]) == null ? void 0 : _b22.substring(0, 3),
                        shape: "square"
                      }, null, 8, ["label"]),
                      createVNode("div", { class: "flex flex-col" }, [
                        createVNode("span", { class: "font-semibold" }, toDisplayString(`${data["first_name"]} ${data["last_name"]}`), 1),
                        createVNode("span", null, toDisplayString(data["email"]), 1)
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Column, {
              field: "phone",
              header: "Phone",
              sortable: ""
            }, {
              body: withCtx(({ data }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(data["phone"])}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(data["phone"]), 1)
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
                    onClick: ($event) => viewDetailsCustomer(data)
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
                    onClick: ($event) => editCustomer(data)
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
                    onClick: ($event) => deleteCustomer(data)
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
                      onClick: ($event) => viewDetailsCustomer(data)
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, { name: "mdi:eye-outline" })
                      ]),
                      _: 2
                    }, 1032, ["onClick"]),
                    createVNode(_component_Button, {
                      text: "",
                      severity: "secondary",
                      onClick: ($event) => editCustomer(data)
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, { name: "mdi:edit-outline" })
                      ]),
                      _: 2
                    }, 1032, ["onClick"]),
                    createVNode(_component_Button, {
                      text: "",
                      severity: "danger",
                      onClick: ($event) => deleteCustomer(data)
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
                field: "fullname",
                header: "Full Name"
              }, {
                body: withCtx(({ data }) => {
                  var _a22;
                  return [
                    createVNode("div", { class: "flex items-center gap-3" }, [
                      createVNode(_component_Avatar, {
                        label: (_a22 = data["first_name"]) == null ? void 0 : _a22.substring(0, 3),
                        shape: "square"
                      }, null, 8, ["label"]),
                      createVNode("div", { class: "flex flex-col" }, [
                        createVNode("span", { class: "font-semibold" }, toDisplayString(`${data["first_name"]} ${data["last_name"]}`), 1),
                        createVNode("span", null, toDisplayString(data["email"]), 1)
                      ])
                    ])
                  ];
                }),
                _: 1
              }),
              createVNode(_component_Column, {
                field: "phone",
                header: "Phone",
                sortable: ""
              }, {
                body: withCtx(({ data }) => [
                  createTextVNode(toDisplayString(data["phone"]), 1)
                ]),
                _: 1
              }),
              createVNode(_component_Column, { header: "Actions" }, {
                body: withCtx(({ data }) => [
                  createVNode(_component_Button, {
                    text: "",
                    severity: "secondary",
                    onClick: ($event) => viewDetailsCustomer(data)
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, { name: "mdi:eye-outline" })
                    ]),
                    _: 2
                  }, 1032, ["onClick"]),
                  createVNode(_component_Button, {
                    text: "",
                    severity: "secondary",
                    onClick: ($event) => editCustomer(data)
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, { name: "mdi:edit-outline" })
                    ]),
                    _: 2
                  }, 1032, ["onClick"]),
                  createVNode(_component_Button, {
                    text: "",
                    severity: "danger",
                    onClick: ($event) => deleteCustomer(data)
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
      if (unref(viewDetailsCustomerDialogVisible)) {
        _push(ssrRenderComponent(_component_ViewDetailsCustomerDialog, { visible: unref(viewDetailsCustomerDialogVisible) }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(createCustomerDialogVisible)) {
        _push(ssrRenderComponent(_component_CreateCustomerDialog, { visible: unref(createCustomerDialogVisible) }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(editCustomerDialogVisible)) {
        _push(ssrRenderComponent(_component_EditCustomerDialog, { visible: unref(editCustomerDialogVisible) }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(deleteCustomerDialogVisible)) {
        _push(ssrRenderComponent(_component_DeleteCustomerDialog, { visible: unref(deleteCustomerDialogVisible) }, null, _parent));
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/customers/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CkxwJyjB.mjs.map
