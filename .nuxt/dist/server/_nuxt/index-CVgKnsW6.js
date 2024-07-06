import script from "./tag.esm-Bkya-FxV.js";
import script$1 from "./iconfield.esm-CMjnwUAR.js";
import script$2 from "./inputicon.esm-DsrGfACI.js";
import __nuxt_component_1 from "./Icon-B04GAuZ4.js";
import script$3 from "./inputtext.esm-Blvd_dSV.js";
import script$4 from "./button.esm-D8sVcJb8.js";
import script$5 from "./dropdown.esm-BZz-eegH.js";
import script$6 from "./datatable.esm-BAh19VmC.js";
import script$7 from "./column.esm-KktM_xTo.js";
import script$8 from "./knob.esm-CiupXrSq.js";
import script$9 from "./menu.esm-C_RMEhtK.js";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, c as _sfc_main$4 } from "./DeleteFloorDialog-CWwVRNx2.js";
import { withAsyncContext, ref, computed, resolveDirective, unref, withCtx, createVNode, mergeProps, isRef, createTextVNode, toDisplayString, useSSRContext } from "vue";
import "hookable";
import "destr";
import "klona";
import "devalue";
import "#internal/nuxt/paths";
import { s as storeToRefs, F as FilterMatchMode } from "../server.mjs";
import { u as useZonesStore } from "./zones-store-DDylndqA.js";
import { u as useBlocksStore } from "./blocks-store-CY-29APJ.js";
import { u as useFloorsStore } from "./floor-store-Cy61MA60.js";
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
import "./core_utils-WJ_cJnbk.js";
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
import "./projects-store-50IgnX7b.js";
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a, _b, _c, _d, _e, _f;
    let __temp, __restore;
    const { zones } = storeToRefs(useZonesStore());
    const { getZones } = useZonesStore();
    const { blocks } = storeToRefs(useBlocksStore());
    const { getBlocks } = useBlocksStore();
    const { floors, currentFloor } = storeToRefs(useFloorsStore());
    const { getFloors } = useFloorsStore();
    [__temp, __restore] = withAsyncContext(() => getZones()), await __temp, __restore();
    [__temp, __restore] = withAsyncContext(() => getBlocks()), await __temp, __restore();
    [__temp, __restore] = withAsyncContext(() => getFloors()), await __temp, __restore();
    zones.value = zones.value.map((zone) => {
      return { id: zone.id, name: `${zone.name}`, value: `${zone.id}` };
    });
    const myZones = ref(zones.value);
    const currentZone = ref({
      name: ((_a = myZones.value[0]) == null ? void 0 : _a.name) ?? "",
      value: ((_b = myZones.value[0]) == null ? void 0 : _b.value) ?? ""
    });
    blocks.value = blocks.value.map((block) => {
      return {
        id: block["id"],
        name: `${block["desc"]}`,
        value: `${block["id"]}`,
        zone_id: `${block["zone_id"]}`
      };
    });
    const myBlocks = ref(
      blocks.value.filter((block) => block["zone_id"] == currentZone.value.value)
    );
    const currentBlock = ref({
      name: ((_d = (_c = myBlocks.value.filter(
        (block) => block["zone_id"] == currentZone.value.value
      )) == null ? void 0 : _c[0]) == null ? void 0 : _d.name) ?? "",
      value: ((_f = (_e = myBlocks.value.filter(
        (block) => block["zone_id"] == currentZone.value.value
      )) == null ? void 0 : _e[0]) == null ? void 0 : _f.value) ?? ""
    });
    const myFloorsBaseOnZoneAndBlockID = computed(() => {
      return floors.value.filter(
        (floor) => floor["block_id"] == currentBlock.value.value
      );
    });
    const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    const menu = ref();
    const menuItems = ref([
      {
        label: "Move to High Area",
        command: () => {
        }
      }
    ]);
    const viewDetailsFloorDialogVisible = ref(false);
    const createFloorDialogVisible = ref(false);
    const editFloorDialogVisible = ref(false);
    const deleteFloorDialogVisible = ref(false);
    const handleDropdown = (event, type) => {
      var _a2, _b2, _c2, _d2;
      if (type == "zone") {
        myBlocks.value = blocks.value.filter(
          (block) => block["zone_id"] == event.value
        );
        currentBlock.value = {
          name: ((_b2 = (_a2 = myBlocks.value.filter(
            (block) => block["zone_id"] == currentZone.value.value
          )) == null ? void 0 : _a2[0]) == null ? void 0 : _b2.name) ?? "",
          value: ((_d2 = (_c2 = myBlocks.value.filter(
            (block) => block["zone_id"] == currentZone.value.value
          )) == null ? void 0 : _c2[0]) == null ? void 0 : _d2.value) ?? ""
        };
      }
    };
    const toggleViewDetailsFloor = (data) => {
      currentFloor.value = data;
      viewDetailsFloorDialogVisible.value = !viewDetailsFloorDialogVisible.value;
    };
    const toggleEditFloor = (data) => {
      currentFloor.value = data;
      editFloorDialogVisible.value = !editFloorDialogVisible.value;
    };
    const toggleDeleteFloor = async (data) => {
      currentFloor.value = data;
      deleteFloorDialogVisible.value = !deleteFloorDialogVisible.value;
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
      const _component_Knob = script$8;
      const _component_Menu = script$9;
      const _component_ViewDetailsFloorDialog = _sfc_main$1;
      const _component_CreateFloorDialog = _sfc_main$2;
      const _component_EditFloorDialog = _sfc_main$3;
      const _component_DeleteFloorDialog = _sfc_main$4;
      const _directive_auto_animate = resolveDirective("auto-animate");
      _push(`<!--[--><div class="w-full h-full flex flex-col"><div class="fixed right-0 top-0 z-50 backdrop-blur-xl w-5/6 h-[8%] px-4 border-b flex justify-between items-center"><div class="flex items-center gap-2"><span class="font-semibold text-lg">Floor</span>`);
      _push(ssrRenderComponent(_component_Tag, {
        value: unref(myFloorsBaseOnZoneAndBlockID).length
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
              placeholder: "Filter floor..."
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
                placeholder: "Filter floor..."
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Button, {
        size: "small",
        label: "New",
        onClick: ($event) => createFloorDialogVisible.value = !unref(createFloorDialogVisible)
      }, null, _parent));
      _push(`</div></div><div class="fixed right-0 top-[8%] z-50 backdrop-blur-xl w-5/6 h-[8%] px-4 border-b flex items-center gap-3"><div class="flex items-center gap-2"><label for="currentZone" class="font-semibold text-lg">Current Zone: </label>`);
      _push(ssrRenderComponent(_component_Dropdown, {
        id: "currentZone",
        placeholder: "Select zone",
        modelValue: unref(currentZone).value,
        "onUpdate:modelValue": ($event) => unref(currentZone).value = $event,
        options: unref(myZones),
        optionLabel: "name",
        optionValue: "value",
        onChange: (event) => handleDropdown(event, "zone")
      }, null, _parent));
      _push(`</div><div class="flex items-center gap-2"><label for="currentZone" class="font-semibold text-lg">Current Block: </label>`);
      _push(ssrRenderComponent(_component_Dropdown, {
        id: "currentBlock",
        placeholder: "Select block",
        modelValue: unref(currentBlock).value,
        "onUpdate:modelValue": ($event) => unref(currentBlock).value = $event,
        options: unref(myBlocks),
        optionLabel: "name",
        optionValue: "value",
        onChange: (event) => handleDropdown(event, "block")
      }, null, _parent));
      _push(`</div></div><div class="absolute top-[16%] w-full h-[92%]">`);
      _push(ssrRenderComponent(_component_DataTable, mergeProps({
        value: unref(myFloorsBaseOnZoneAndBlockID),
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
            _push2(`<div class="flex justify-center items-center"${_scopeId}><span${_scopeId}>No floor found.</span></div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-center items-center" }, [
                createVNode("span", null, "No floor found.")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Column, {
              field: "desc",
              header: "Name"
            }, {
              body: withCtx(({ data }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(data["desc"])}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(data["desc"]), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Column, {
              field: "total_area",
              header: "Total Area",
              sortable: true
            }, {
              body: withCtx(({ data }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(data["total_area"])}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(data["total_area"]), 1)
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
                    modelValue: data["progress"],
                    "onUpdate:modelValue": ($event) => data["progress"] = $event,
                    readonly: "",
                    size: 50
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Knob, {
                      modelValue: data["progress"],
                      "onUpdate:modelValue": ($event) => data["progress"] = $event,
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
                    onClick: ($event) => toggleViewDetailsFloor(data)
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
                    onClick: ($event) => toggleEditFloor(data)
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
                    onClick: ($event) => toggleDeleteFloor(data)
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
                  _push3(ssrRenderComponent(_component_Button, {
                    text: "",
                    severity: "secondary",
                    onClick: (event) => unref(menu).toggle(event)
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Icon, { name: "mdi:more-vert" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_Icon, { name: "mdi:more-vert" })
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Menu, {
                    ref_key: "menu",
                    ref: menu,
                    model: unref(menuItems),
                    popup: true
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Button, {
                      text: "",
                      severity: "secondary",
                      onClick: ($event) => toggleViewDetailsFloor(data)
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, { name: "mdi:eye-outline" })
                      ]),
                      _: 2
                    }, 1032, ["onClick"]),
                    createVNode(_component_Button, {
                      text: "",
                      severity: "secondary",
                      onClick: ($event) => toggleEditFloor(data)
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, { name: "mdi:edit-outline" })
                      ]),
                      _: 2
                    }, 1032, ["onClick"]),
                    createVNode(_component_Button, {
                      text: "",
                      severity: "danger",
                      onClick: ($event) => toggleDeleteFloor(data)
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, { name: "mdi:delete-outline" })
                      ]),
                      _: 2
                    }, 1032, ["onClick"]),
                    createVNode(_component_Button, {
                      text: "",
                      severity: "secondary",
                      onClick: (event) => unref(menu).toggle(event)
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, { name: "mdi:more-vert" })
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_Menu, {
                      ref_key: "menu",
                      ref: menu,
                      model: unref(menuItems),
                      popup: true
                    }, null, 8, ["model"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Column, {
                field: "desc",
                header: "Name"
              }, {
                body: withCtx(({ data }) => [
                  createTextVNode(toDisplayString(data["desc"]), 1)
                ]),
                _: 1
              }),
              createVNode(_component_Column, {
                field: "total_area",
                header: "Total Area",
                sortable: true
              }, {
                body: withCtx(({ data }) => [
                  createTextVNode(toDisplayString(data["total_area"]), 1)
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
                    modelValue: data["progress"],
                    "onUpdate:modelValue": ($event) => data["progress"] = $event,
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
                    onClick: ($event) => toggleViewDetailsFloor(data)
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, { name: "mdi:eye-outline" })
                    ]),
                    _: 2
                  }, 1032, ["onClick"]),
                  createVNode(_component_Button, {
                    text: "",
                    severity: "secondary",
                    onClick: ($event) => toggleEditFloor(data)
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, { name: "mdi:edit-outline" })
                    ]),
                    _: 2
                  }, 1032, ["onClick"]),
                  createVNode(_component_Button, {
                    text: "",
                    severity: "danger",
                    onClick: ($event) => toggleDeleteFloor(data)
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, { name: "mdi:delete-outline" })
                    ]),
                    _: 2
                  }, 1032, ["onClick"]),
                  createVNode(_component_Button, {
                    text: "",
                    severity: "secondary",
                    onClick: (event) => unref(menu).toggle(event)
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, { name: "mdi:more-vert" })
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_Menu, {
                    ref_key: "menu",
                    ref: menu,
                    model: unref(menuItems),
                    popup: true
                  }, null, 8, ["model"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      if (unref(viewDetailsFloorDialogVisible)) {
        _push(ssrRenderComponent(_component_ViewDetailsFloorDialog, { visible: unref(viewDetailsFloorDialogVisible) }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(createFloorDialogVisible)) {
        _push(ssrRenderComponent(_component_CreateFloorDialog, { visible: unref(createFloorDialogVisible) }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(editFloorDialogVisible)) {
        _push(ssrRenderComponent(_component_EditFloorDialog, { visible: unref(editFloorDialogVisible) }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(deleteFloorDialogVisible)) {
        _push(ssrRenderComponent(_component_DeleteFloorDialog, { visible: unref(deleteFloorDialogVisible) }, null, _parent));
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/project_details/floor/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-CVgKnsW6.js.map
