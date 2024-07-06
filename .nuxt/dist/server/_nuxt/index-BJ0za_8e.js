import script from "./tag.esm-Bkya-FxV.js";
import script$1 from "./iconfield.esm-CMjnwUAR.js";
import script$2 from "./inputicon.esm-DsrGfACI.js";
import __nuxt_component_1 from "./Icon-B04GAuZ4.js";
import script$3 from "./inputtext.esm-Blvd_dSV.js";
import script$4 from "./button.esm-D8sVcJb8.js";
import script$5 from "./dropdown.esm-BZz-eegH.js";
import script$6 from "./datatable.esm-BAh19VmC.js";
import script$7 from "./column.esm-KktM_xTo.js";
import { u as useNotificationsStore, _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, c as _sfc_main$4 } from "./DeleteNotificationDialog-x8QVwrQ8.js";
import { withAsyncContext, ref, computed, resolveDirective, unref, withCtx, createVNode, mergeProps, isRef, toDisplayString, createTextVNode, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import "hookable";
import "destr";
import "klona";
import "devalue";
import "#internal/nuxt/paths";
import { s as storeToRefs, F as FilterMatchMode } from "../server.mjs";
import { u as useProjectsStore } from "./projects-store-50IgnX7b.js";
import { c as capitalize } from "./core_utils-WJ_cJnbk.js";
import { ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate } from "vue/server-renderer";
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
import "./inputnumber.esm-CMvh_h4P.js";
import "./index.esm-Dpdcp6OZ.js";
import "./index.esm-CE-esNCM.js";
import "./index.esm-ByqdG2PS.js";
import "./index.esm-C03T_CK6.js";
import "./index.esm-Cs4cT7wr.js";
import "./checkbox.esm-Duuim8Iu.js";
import "./radiobutton.esm-CQ1mq00b.js";
import "./index.esm-BvZNBu0f.js";
import "./index.esm-DTIot6dj.js";
import "./dialog.esm-Wemb0g_v.js";
import "./textarea.esm-r2lUF_RZ.js";
import "./fetch-DXSGE_KZ.js";
import "ohash";
import "ofetch";
import "unctx";
import "h3";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "radix3";
import "ufo";
import "cookie-es";
import "@vue/devtools-api";
import "@formkit/auto-animate/vue";
import "framesync";
import "popmotion";
import "style-value-types";
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a, _b;
    let __temp, __restore;
    const { notifications, currentNotification } = storeToRefs(
      useNotificationsStore()
    );
    const { getNotifications } = useNotificationsStore();
    const { projects, projectsDropdown } = storeToRefs(useProjectsStore());
    const { getProjects } = useProjectsStore();
    [__temp, __restore] = withAsyncContext(() => getNotifications()), await __temp, __restore();
    [__temp, __restore] = withAsyncContext(() => getProjects()), await __temp, __restore();
    const user = ref({});
    const userPermissionForActions = user.value["type"] == "admin" || user.value["type"] == "super_admin" || user.value["type"] == "sale_manager" ? true : false;
    const currentProject = ref({
      name: ((_a = projectsDropdown.value[0]) == null ? void 0 : _a.name) ?? "",
      value: ((_b = projectsDropdown.value[0]) == null ? void 0 : _b.value) ?? ""
    });
    const myNotificationsBaseOnProjectID = computed(() => {
      return notifications.value.filter((noti) => {
        return noti["project_id"] == currentProject.value.value;
      });
    });
    const statuses = ref([{ name: "Info", value: "info" }]);
    const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    const viewDetailsNotificationDialogVisible = ref(false);
    const createNotificationDialogVisible = ref(false);
    const editNotificationDialogVisible = ref(false);
    const deleteNotificationDialogVisible = ref(false);
    const handleDropdown = (event) => {
      myNotificationsBaseOnProjectID.value = notifications.value.filter(
        (noti) => {
          return noti["project_id"] == event.value;
        }
      );
    };
    const toggleViewDetailsNotification = async (data) => {
      currentNotification.value = data;
      viewDetailsNotificationDialogVisible.value = !viewDetailsNotificationDialogVisible.value;
    };
    const toggleEditNotification = async (data) => {
      currentNotification.value = data;
      editNotificationDialogVisible.value = !editNotificationDialogVisible.value;
    };
    const toggleDeleteNotification = async (data) => {
      currentNotification.value = data;
      deleteNotificationDialogVisible.value = !deleteNotificationDialogVisible.value;
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
      const _component_ViewDetailsNotificationDialog = _sfc_main$1;
      const _component_CreateNotificationDialog = _sfc_main$2;
      const _component_EditNotificationDialog = _sfc_main$3;
      const _component_DeleteNotificationDialog = _sfc_main$4;
      const _directive_auto_animate = resolveDirective("auto-animate");
      _push(`<!--[--><div class="w-full h-full flex flex-col"><div class="fixed right-0 top-0 z-50 backdrop-blur-xl w-5/6 h-[8%] px-4 border-b flex justify-between items-center"><div class="flex items-center gap-2"><span class="font-semibold text-lg">Notifications</span>`);
      _push(ssrRenderComponent(_component_Tag, {
        value: unref(myNotificationsBaseOnProjectID).length
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
              placeholder: "Filter Notification..."
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
                placeholder: "Filter Notification..."
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
          onClick: ($event) => createNotificationDialogVisible.value = !unref(createNotificationDialogVisible)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
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
        value: unref(myNotificationsBaseOnProjectID),
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
            _push2(`<div class="flex justify-center items-center"${_scopeId}><span${_scopeId}>No Notifications Found.</span></div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-center items-center" }, [
                createVNode("span", null, "No Notifications Found.")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Column, {
              field: "title",
              header: "Title"
            }, {
              body: withCtx(({ data }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center gap-3"${_scopeId2}>${ssrInterpolate(data["title"])}</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center gap-3" }, toDisplayString(data["title"]), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Column, {
              field: "status",
              header: "Status"
            }, {
              body: withCtx(({ data }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(("capitalize" in _ctx ? _ctx.capitalize : unref(capitalize))(data["status"]))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(("capitalize" in _ctx ? _ctx.capitalize : unref(capitalize))(data["status"])), 1)
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
                    onClick: ($event) => toggleViewDetailsNotification(data)
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
                      onClick: ($event) => toggleEditNotification(data)
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
                      onClick: ($event) => toggleDeleteNotification(data)
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
                      onClick: ($event) => toggleViewDetailsNotification(data)
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
                      onClick: ($event) => toggleEditNotification(data)
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
                      onClick: ($event) => toggleDeleteNotification(data)
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
                field: "title",
                header: "Title"
              }, {
                body: withCtx(({ data }) => [
                  createVNode("div", { class: "flex items-center gap-3" }, toDisplayString(data["title"]), 1)
                ]),
                _: 1
              }),
              createVNode(_component_Column, {
                field: "status",
                header: "Status"
              }, {
                body: withCtx(({ data }) => [
                  createTextVNode(toDisplayString(("capitalize" in _ctx ? _ctx.capitalize : unref(capitalize))(data["status"])), 1)
                ]),
                _: 1
              }),
              createVNode(_component_Column, { header: "Actions" }, {
                body: withCtx(({ data }) => [
                  createVNode(_component_Button, {
                    text: "",
                    severity: "secondary",
                    onClick: ($event) => toggleViewDetailsNotification(data)
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
                    onClick: ($event) => toggleEditNotification(data)
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
                    onClick: ($event) => toggleDeleteNotification(data)
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
      if (unref(viewDetailsNotificationDialogVisible)) {
        _push(ssrRenderComponent(_component_ViewDetailsNotificationDialog, {
          visible: unref(viewDetailsNotificationDialogVisible),
          statuses: unref(statuses)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(createNotificationDialogVisible)) {
        _push(ssrRenderComponent(_component_CreateNotificationDialog, {
          visible: unref(createNotificationDialogVisible),
          statuses: unref(statuses)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(editNotificationDialogVisible)) {
        _push(ssrRenderComponent(_component_EditNotificationDialog, {
          visible: unref(editNotificationDialogVisible),
          statuses: unref(statuses)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(deleteNotificationDialogVisible)) {
        _push(ssrRenderComponent(_component_DeleteNotificationDialog, { visible: unref(deleteNotificationDialogVisible) }, null, _parent));
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/notifications/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-BJ0za_8e.js.map
