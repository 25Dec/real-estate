import script from './dialog.esm-Wemb0g_v.mjs';
import script$1 from './dropdown.esm-BZz-eegH.mjs';
import script$2 from './inputtext.esm-Blvd_dSV.mjs';
import script$3 from './textarea.esm-r2lUF_RZ.mjs';
import script$4 from './button.esm-D8sVcJb8.mjs';
import { ref, useSSRContext, mergeProps, unref, isRef, withCtx, createVNode, toDisplayString, createTextVNode } from 'vue';
import { d as defineStore, a as useCookie, s as storeToRefs, b as baseUrl, u as useToast } from './server.mjs';
import { u as useProjectsStore } from './projects-store-50IgnX7b.mjs';
import { a as convertDateTime } from './core_utils-WJ_cJnbk.mjs';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { u as useFetch } from './fetch-DXSGE_KZ.mjs';

const useNotificationsStore = defineStore("Notifications", () => {
  const notifications = ref([]);
  const currentNotification = ref({});
  const getNotifications = async () => {
    const accessToken = useCookie("token");
    storeToRefs(useProjectsStore());
    const { data } = await useFetch(baseUrl + "/auth/message", {
      headers: {
        "Content-Type": "application/json",
        access_token: accessToken.value
      }
    }, "$QC0cVA3CX7");
    notifications.value = data.value.data.data;
  };
  const addNewNotification = async (data) => {
    const accessToken = useCookie("token");
    const response = await $fetch(baseUrl + `/auth/message`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        access_token: accessToken.value
      },
      body: data
    });
    await getNotifications();
    return response;
  };
  const editNotification = async (data) => {
    const accessToken = useCookie("token");
    const response = await $fetch(baseUrl + `/auth/message/${data["id"]}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        access_token: accessToken.value
      },
      body: data
    });
    await getNotifications();
    return response;
  };
  const deleteNotification = async (data) => {
    const accessToken = useCookie("token");
    const response = await $fetch(baseUrl + `/auth/message/${data["id"]}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        access_token: accessToken.value
      }
    });
    await getNotifications();
    return response;
  };
  return {
    notifications,
    currentNotification,
    getNotifications,
    addNewNotification,
    editNotification,
    deleteNotification
  };
});
const _sfc_main$3 = {
  __name: "ViewDetailsNotificationDialog",
  __ssrInlineRender: true,
  props: ["visible", "statuses"],
  setup(__props) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const { visible, statuses } = __props;
    const { currentNotification } = storeToRefs(useNotificationsStore());
    const { projectsDropdown } = storeToRefs(useProjectsStore());
    const myVisible = ref(visible);
    const title = ref(currentNotification.value["title"]);
    const content = ref(currentNotification.value["content"]);
    const status = ref({
      name: (_b = (_a = statuses.filter(
        (stt) => stt["value"] == currentNotification.value["status"]
      )) == null ? void 0 : _a[0]) == null ? void 0 : _b["name"],
      value: (_d = (_c = statuses.filter(
        (stt) => stt["value"] == currentNotification.value["status"]
      )) == null ? void 0 : _c[0]) == null ? void 0 : _d["value"]
    });
    const projectID = ref({
      name: (_f = (_e = projectsDropdown.value.filter(
        (project) => project["value"] == currentNotification.value["project_id"]
      )) == null ? void 0 : _e[0]) == null ? void 0 : _f["name"],
      value: (_h = (_g = projectsDropdown.value.filter(
        (project) => project["value"] == currentNotification.value["project_id"]
      )) == null ? void 0 : _g[0]) == null ? void 0 : _h["value"]
    });
    const createdAt = ref(currentNotification.value["created_at"]);
    const updatedAt = ref(currentNotification.value["updated_at"]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script;
      const _component_Dropdown = script$1;
      const _component_InputText = script$2;
      const _component_Textarea = script$3;
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
            _push2(`<div class="inline-flex items-center justify-center gap-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>Notification Details</span></div>`);
          } else {
            return [
              createVNode("div", { class: "inline-flex items-center justify-center gap-2" }, [
                createVNode("span", { class: "font-bold text-xl" }, "Notification Details")
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
            _push2(`<template class="flex flex-col gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="projectID"${_scopeId}>Project</label>`);
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
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="title"${_scopeId}>Title</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "title",
              modelValue: unref(title),
              "onUpdate:modelValue": ($event) => isRef(title) ? title.value = $event : null,
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="status"${_scopeId}>Status</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "status",
              class: "flex-1",
              modelValue: unref(status).value,
              "onUpdate:modelValue": ($event) => unref(status).value = $event,
              placeholder: "Select Status",
              options: __props.statuses,
              optionLabel: "name",
              optionValue: "value",
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="content"${_scopeId}>Content</label>`);
            _push2(ssrRenderComponent(_component_Textarea, {
              id: "content",
              modelValue: unref(content),
              "onUpdate:modelValue": ($event) => isRef(content) ? content.value = $event : null,
              autoResize: "",
              rows: "5",
              cols: "30",
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-row gap-3 justify-between"${_scopeId}><span class="text-xs text-gray-400"${_scopeId}> Created at: ${ssrInterpolate(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(createdAt)))}</span><span class="text-xs text-gray-400"${_scopeId}> Updated at: ${ssrInterpolate(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(updatedAt)))}</span></div></template>`);
          } else {
            return [
              createVNode("template", { class: "flex flex-col gap-3" }, [
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
                createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                  createVNode("label", { for: "title" }, "Title"),
                  createVNode(_component_InputText, {
                    id: "title",
                    modelValue: unref(title),
                    "onUpdate:modelValue": ($event) => isRef(title) ? title.value = $event : null,
                    disabled: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                  createVNode("label", { for: "status" }, "Status"),
                  createVNode(_component_Dropdown, {
                    id: "status",
                    class: "flex-1",
                    modelValue: unref(status).value,
                    "onUpdate:modelValue": ($event) => unref(status).value = $event,
                    placeholder: "Select Status",
                    options: __props.statuses,
                    optionLabel: "name",
                    optionValue: "value",
                    disabled: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                ]),
                createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                  createVNode("label", { for: "content" }, "Content"),
                  createVNode(_component_Textarea, {
                    id: "content",
                    modelValue: unref(content),
                    "onUpdate:modelValue": ($event) => isRef(content) ? content.value = $event : null,
                    autoResize: "",
                    rows: "5",
                    cols: "30",
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/notifications/ViewDetailsNotificationDialog.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "CreateNotificationDialog",
  __ssrInlineRender: true,
  props: ["visible", "statuses"],
  setup(__props) {
    const { visible, statuses } = __props;
    const { projectsDropdown } = storeToRefs(useProjectsStore());
    const { addNewNotification } = useNotificationsStore();
    const toast = useToast();
    const myVisible = ref(visible);
    const title = ref("");
    const content = ref("");
    const status = ref({});
    const projectID = ref({});
    const onSave = async () => {
      const newNotiData = {
        id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1,
        title: title.value,
        content: content.value,
        status: status.value.value,
        deleted: "false",
        project_id: projectID.value.value,
        created_by: 13,
        updated_by: 13,
        created_at: (/* @__PURE__ */ new Date()).toLocaleString(),
        updated_at: null
      };
      const response = await addNewNotification(newNotiData);
      myVisible.value = false;
      if (response != null && response["result"] == "ok") {
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Create New Notification Successfully!",
          group: "bl",
          life: 3e3
        });
      } else {
        toast.add({
          severity: "danger",
          summary: "Error",
          detail: "Failed to Create New Notification",
          group: "bl",
          life: 3e3
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script;
      const _component_Dropdown = script$1;
      const _component_InputText = script$2;
      const _component_Textarea = script$3;
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
            _push2(`<div class="inline-flex items-center justify-center gap-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>Create New Notification</span></div>`);
          } else {
            return [
              createVNode("div", { class: "inline-flex items-center justify-center gap-2" }, [
                createVNode("span", { class: "font-bold text-xl" }, "Create New Notification")
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
            _push2(`<template class="flex flex-col gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="projectID"${_scopeId}>Project</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "projectID",
              placeholder: "Select Project",
              modelValue: unref(projectID).value,
              "onUpdate:modelValue": ($event) => unref(projectID).value = $event,
              options: unref(projectsDropdown),
              optionLabel: "name",
              optionValue: "value"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="title"${_scopeId}>Title</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "title",
              placeholder: "Title",
              modelValue: unref(title),
              "onUpdate:modelValue": ($event) => isRef(title) ? title.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="status"${_scopeId}>Status</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "status",
              class: "flex-1",
              placeholder: "Select Status",
              modelValue: unref(status).value,
              "onUpdate:modelValue": ($event) => unref(status).value = $event,
              options: __props.statuses,
              optionLabel: "name",
              optionValue: "value"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="content"${_scopeId}>Content</label>`);
            _push2(ssrRenderComponent(_component_Textarea, {
              id: "content",
              modelValue: unref(content),
              "onUpdate:modelValue": ($event) => isRef(content) ? content.value = $event : null,
              placeholder: "Content",
              autoResize: "",
              rows: "5",
              cols: "30"
            }, null, _parent2, _scopeId));
            _push2(`</div></template>`);
          } else {
            return [
              createVNode("template", { class: "flex flex-col gap-3" }, [
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
                ]),
                createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                  createVNode("label", { for: "title" }, "Title"),
                  createVNode(_component_InputText, {
                    id: "title",
                    placeholder: "Title",
                    modelValue: unref(title),
                    "onUpdate:modelValue": ($event) => isRef(title) ? title.value = $event : null
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                  createVNode("label", { for: "status" }, "Status"),
                  createVNode(_component_Dropdown, {
                    id: "status",
                    class: "flex-1",
                    placeholder: "Select Status",
                    modelValue: unref(status).value,
                    "onUpdate:modelValue": ($event) => unref(status).value = $event,
                    options: __props.statuses,
                    optionLabel: "name",
                    optionValue: "value"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                ]),
                createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                  createVNode("label", { for: "content" }, "Content"),
                  createVNode(_component_Textarea, {
                    id: "content",
                    modelValue: unref(content),
                    "onUpdate:modelValue": ($event) => isRef(content) ? content.value = $event : null,
                    placeholder: "Content",
                    autoResize: "",
                    rows: "5",
                    cols: "30"
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/notifications/CreateNotificationDialog.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "EditNotificationDialog",
  __ssrInlineRender: true,
  props: ["visible", "statuses"],
  setup(__props) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const { visible, statuses } = __props;
    const { currentNotification } = storeToRefs(useNotificationsStore());
    const { editNotification } = useNotificationsStore();
    const { projectsDropdown } = storeToRefs(useProjectsStore());
    const toast = useToast();
    const myVisible = ref(visible);
    const title = ref(currentNotification.value["title"]);
    const content = ref(currentNotification.value["content"]);
    const status = ref({
      name: (_b = (_a = statuses.filter(
        (stt) => stt["value"] == currentNotification.value["status"]
      )) == null ? void 0 : _a[0]) == null ? void 0 : _b["name"],
      value: (_d = (_c = statuses.filter(
        (stt) => stt["value"] == currentNotification.value["status"]
      )) == null ? void 0 : _c[0]) == null ? void 0 : _d["value"]
    });
    const projectID = ref({
      name: (_f = (_e = projectsDropdown.value.filter(
        (project) => project["value"] == currentNotification.value["project_id"]
      )) == null ? void 0 : _e[0]) == null ? void 0 : _f["name"],
      value: (_h = (_g = projectsDropdown.value.filter(
        (project) => project["value"] == currentNotification.value["project_id"]
      )) == null ? void 0 : _g[0]) == null ? void 0 : _h["value"]
    });
    const createdAt = ref(currentNotification.value["created_at"]);
    const updatedAt = ref(currentNotification.value["updated_at"]);
    const onSave = async () => {
      const newNotiData = {
        ...currentNotification.value,
        title: title.value,
        content: content.value,
        status: status.value.value,
        project_id: projectID.value.value,
        updated_at: (/* @__PURE__ */ new Date()).toLocaleString()
      };
      const response = await editNotification(newNotiData);
      myVisible.value = false;
      if (response != null && response["result"] == "ok") {
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Edit Notification Successfully!",
          group: "bl",
          life: 3e3
        });
      } else {
        toast.add({
          severity: "danger",
          summary: "Error",
          detail: "Failed to Edit Notification",
          group: "bl",
          life: 3e3
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script;
      const _component_Dropdown = script$1;
      const _component_InputText = script$2;
      const _component_Textarea = script$3;
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
            _push2(`<div class="inline-flex items-center justify-center gap-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>Notification Details</span></div>`);
          } else {
            return [
              createVNode("div", { class: "inline-flex items-center justify-center gap-2" }, [
                createVNode("span", { class: "font-bold text-xl" }, "Notification Details")
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
            _push2(`<template class="flex flex-col gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="projectID"${_scopeId}>Project</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "projectID",
              placeholder: "Select Project",
              modelValue: unref(projectID).value,
              "onUpdate:modelValue": ($event) => unref(projectID).value = $event,
              options: unref(projectsDropdown),
              optionLabel: "name",
              optionValue: "value"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="title"${_scopeId}>Title</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "title",
              placeholder: "Title",
              modelValue: unref(title),
              "onUpdate:modelValue": ($event) => isRef(title) ? title.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-row gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="status"${_scopeId}>Status</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "status",
              class: "flex-1",
              placeholder: "Select Status",
              modelValue: unref(status).value,
              "onUpdate:modelValue": ($event) => unref(status).value = $event,
              options: __props.statuses,
              optionLabel: "name",
              optionValue: "value"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="content"${_scopeId}>Content</label>`);
            _push2(ssrRenderComponent(_component_Textarea, {
              id: "content",
              modelValue: unref(content),
              "onUpdate:modelValue": ($event) => isRef(content) ? content.value = $event : null,
              placeholder: "Content",
              autoResize: "",
              rows: "5",
              cols: "30"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-row gap-3 justify-between"${_scopeId}><span class="text-xs text-gray-400"${_scopeId}> Created at: ${ssrInterpolate(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(createdAt)))}</span><span class="text-xs text-gray-400"${_scopeId}> Updated at: ${ssrInterpolate(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(updatedAt)))}</span></div></template>`);
          } else {
            return [
              createVNode("template", { class: "flex flex-col gap-3" }, [
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
                ]),
                createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                  createVNode("label", { for: "title" }, "Title"),
                  createVNode(_component_InputText, {
                    id: "title",
                    placeholder: "Title",
                    modelValue: unref(title),
                    "onUpdate:modelValue": ($event) => isRef(title) ? title.value = $event : null
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "flex flex-row gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "status" }, "Status"),
                    createVNode(_component_Dropdown, {
                      id: "status",
                      class: "flex-1",
                      placeholder: "Select Status",
                      modelValue: unref(status).value,
                      "onUpdate:modelValue": ($event) => unref(status).value = $event,
                      options: __props.statuses,
                      optionLabel: "name",
                      optionValue: "value"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                  createVNode("label", { for: "content" }, "Content"),
                  createVNode(_component_Textarea, {
                    id: "content",
                    modelValue: unref(content),
                    "onUpdate:modelValue": ($event) => isRef(content) ? content.value = $event : null,
                    placeholder: "Content",
                    autoResize: "",
                    rows: "5",
                    cols: "30"
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/notifications/EditNotificationDialog.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "DeleteNotificationDialog",
  __ssrInlineRender: true,
  props: ["visible"],
  setup(__props) {
    const { visible } = __props;
    const { currentNotification } = storeToRefs(useNotificationsStore());
    const { deleteNotification } = useNotificationsStore();
    const toast = useToast();
    const myVisible = ref(visible);
    const onDelete = async () => {
      const response = await deleteNotification(currentNotification.value);
      myVisible.value = false;
      if (response != null && response["result"] == "ok") {
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Delete Notification Successfully!",
          group: "bl",
          life: 3e3
        });
      } else {
        toast.add({
          severity: "danger",
          summary: "Error",
          detail: "Failed to Delete Notification",
          group: "bl",
          life: 3e3
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script;
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
            _push2(`<div class="inline-flex items-center justify-center gap-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>Delete Notification?</span></div>`);
          } else {
            return [
              createVNode("div", { class: "inline-flex items-center justify-center gap-2" }, [
                createVNode("span", { class: "font-bold text-xl" }, "Delete Notification?")
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
            _push2(`<div${_scopeId}><span${_scopeId}> This will delete notification <b${_scopeId}>${ssrInterpolate(unref(currentNotification)["title"])}</b> permanently! </span><span${_scopeId}>You cannot undo this action!</span></div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode("span", null, [
                  createTextVNode(" This will delete notification "),
                  createVNode("b", null, toDisplayString(unref(currentNotification)["title"]), 1),
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/notifications/DeleteNotificationDialog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main$3 as _, _sfc_main$2 as a, _sfc_main$1 as b, _sfc_main as c, useNotificationsStore as u };
//# sourceMappingURL=DeleteNotificationDialog-x8QVwrQ8.mjs.map
