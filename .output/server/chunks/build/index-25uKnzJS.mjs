import script from './tag.esm-Bkya-FxV.mjs';
import script$1 from './iconfield.esm-CMjnwUAR.mjs';
import script$2 from './inputicon.esm-DsrGfACI.mjs';
import __nuxt_component_1 from './Icon-B04GAuZ4.mjs';
import script$3 from './inputtext.esm-Blvd_dSV.mjs';
import script$4 from './datatable.esm-BAh19VmC.mjs';
import script$5 from './column.esm-KktM_xTo.mjs';
import script$6 from './button.esm-D8sVcJb8.mjs';
import { u as useNotificationsStore, _ as _sfc_main$3, a as _sfc_main$2, b as _sfc_main$1, c as _sfc_main$4 } from './DeleteNotificationDialog-x8QVwrQ8.mjs';
import { withAsyncContext, ref, resolveDirective, unref, withCtx, createVNode, mergeProps, isRef, toDisplayString, createTextVNode, useSSRContext } from 'vue';
import { s as storeToRefs, F as FilterMatchMode } from './server.mjs';
import { u as useProjectsStore } from './projects-store-50IgnX7b.mjs';
import { c as capitalize } from './core_utils-WJ_cJnbk.mjs';
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
import './baseicon.esm-DbzTeshI.mjs';
import './index.esm-C7T4V9vj.mjs';
import './paginator.esm-BvYTZ1KY.mjs';
import './index.esm-7xcJfJVp.mjs';
import './dropdown.esm-BZz-eegH.mjs';
import './index.esm-BIjuQzNw.mjs';
import './index.esm-Clcms31c.mjs';
import './index.esm-CBLFGZyH.mjs';
import './index.esm-CbKY_bSB.mjs';
import './overlayeventbus.esm-Cq2NCN3a.mjs';
import './portal.esm-CdWWxjdD.mjs';
import './virtualscroller.esm-QhUci9XU.mjs';
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
import './badge.esm-CGMv5799.mjs';
import './dialog.esm-Wemb0g_v.mjs';
import './textarea.esm-r2lUF_RZ.mjs';
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

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { notifications, currentNotification } = storeToRefs(
      useNotificationsStore()
    );
    const { getNotifications } = useNotificationsStore();
    const { currentProjectIDFromLocalStore } = useProjectsStore();
    const { getProjects } = useProjectsStore();
    [__temp, __restore] = withAsyncContext(() => getNotifications()), await __temp, __restore();
    [__temp, __restore] = withAsyncContext(() => getProjects()), await __temp, __restore();
    notifications.value = notifications.value.filter(
      (noti) => noti["project_id"] == currentProjectIDFromLocalStore
    );
    const statuses = ref([{ name: "Info", value: "info" }]);
    const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    const viewDetailsNotificationDialogVisible = ref(false);
    const toggleViewDetailsNotification = async (data) => {
      currentNotification.value = data;
      viewDetailsNotificationDialogVisible.value = !viewDetailsNotificationDialogVisible.value;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Tag = script;
      const _component_IconField = script$1;
      const _component_InputIcon = script$2;
      const _component_Icon = __nuxt_component_1;
      const _component_InputText = script$3;
      const _component_DataTable = script$4;
      const _component_Column = script$5;
      const _component_Button = script$6;
      const _component_ViewDetailsNotificationDialog = _sfc_main$3;
      const _component_CreateNotificationDialog = _sfc_main$2;
      const _component_EditNotificationDialog = _sfc_main$1;
      const _component_DeleteNotificationDialog = _sfc_main$4;
      const _directive_auto_animate = resolveDirective("auto-animate");
      _push(`<!--[--><div class="w-full h-full flex flex-col"><div class="fixed right-0 top-0 z-50 backdrop-blur-xl w-5/6 h-[8%] px-4 border-b flex justify-between items-center"><div class="flex items-center gap-2"><span class="font-semibold text-lg">Notifications</span>`);
      _push(ssrRenderComponent(_component_Tag, {
        value: unref(notifications).length
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
              placeholder: "Filter notifications..."
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
                placeholder: "Filter notifications..."
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="absolute top-[8%] w-full h-[92%]">`);
      _push(ssrRenderComponent(_component_DataTable, mergeProps({
        value: unref(notifications),
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
                  _push3(`<div class="flex items-center gap-3"${_scopeId2}><span class="font-semibold"${_scopeId2}>${ssrInterpolate(data["title"])}</span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center gap-3" }, [
                      createVNode("span", { class: "font-semibold" }, toDisplayString(data["title"]), 1)
                    ])
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
                    }, 1032, ["onClick"])
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
                  createVNode("div", { class: "flex items-center gap-3" }, [
                    createVNode("span", { class: "font-semibold" }, toDisplayString(data["title"]), 1)
                  ])
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
      if (unref(viewDetailsNotificationDialogVisible)) {
        _push(ssrRenderComponent(_component_ViewDetailsNotificationDialog, {
          visible: unref(viewDetailsNotificationDialogVisible),
          statuses: unref(statuses)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (_ctx.createNotificationDialogVisible) {
        _push(ssrRenderComponent(_component_CreateNotificationDialog, {
          visible: _ctx.createNotificationDialogVisible,
          statuses: unref(statuses)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (_ctx.editNotificationDialogVisible) {
        _push(ssrRenderComponent(_component_EditNotificationDialog, {
          visible: _ctx.editNotificationDialogVisible,
          statuses: unref(statuses)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (_ctx.deleteNotificationDialogVisible) {
        _push(ssrRenderComponent(_component_DeleteNotificationDialog, { visible: _ctx.deleteNotificationDialogVisible }, null, _parent));
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/project_details/notifications/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-25uKnzJS.mjs.map
