import script from './tag.esm-Bkya-FxV.mjs';
import script$1 from './iconfield.esm-CMjnwUAR.mjs';
import script$2 from './inputicon.esm-DsrGfACI.mjs';
import __nuxt_component_1 from './Icon-B04GAuZ4.mjs';
import script$3 from './inputtext.esm-Blvd_dSV.mjs';
import script$4 from './button.esm-D8sVcJb8.mjs';
import script$5 from './dropdown.esm-BZz-eegH.mjs';
import script$6 from './datatable.esm-BAh19VmC.mjs';
import script$7 from './column.esm-KktM_xTo.mjs';
import script$8 from './knob.esm-CiupXrSq.mjs';
import script$9 from './menu.esm-C_RMEhtK.mjs';
import { _ as _sfc_main$3, a as _sfc_main$2, b as _sfc_main$1, c as _sfc_main$4 } from './DeleteHighAreaDialog-CmmgKHsn.mjs';
import { withAsyncContext, ref, computed, resolveDirective, unref, withCtx, createVNode, mergeProps, isRef, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { s as storeToRefs, c as useRouter, F as FilterMatchMode } from './server.mjs';
import { u as useZonesStore } from './zones-store-DDylndqA.mjs';
import { u as useBlocksStore } from './blocks-store-CY-29APJ.mjs';
import { u as useFloorsStore } from './floor-store-Cy61MA60.mjs';
import { u as useHighAreasStore } from './high-area-store-B-d20OaI.mjs';
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
import './dialog.esm-Wemb0g_v.mjs';
import './payment-method-store-B-s5UmN8.mjs';
import './fetch-DXSGE_KZ.mjs';
import './projects-store-50IgnX7b.mjs';
import './core_utils-WJ_cJnbk.mjs';
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
    var _a2, _b2, _c2, _d2, _e2, _f2;
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
    let __temp, __restore;
    const { zones } = storeToRefs(useZonesStore());
    const { getZones } = useZonesStore();
    const { blocks } = storeToRefs(useBlocksStore());
    const { getBlocks } = useBlocksStore();
    const { floors } = storeToRefs(useFloorsStore());
    const { getFloors } = useFloorsStore();
    const { highAreas } = storeToRefs(useHighAreasStore());
    const { getHighAreas, setCurrentHighArea } = useHighAreasStore();
    const router = useRouter();
    [__temp, __restore] = withAsyncContext(() => getZones()), await __temp, __restore();
    [__temp, __restore] = withAsyncContext(() => getBlocks()), await __temp, __restore();
    [__temp, __restore] = withAsyncContext(() => getFloors()), await __temp, __restore();
    [__temp, __restore] = withAsyncContext(() => getHighAreas()), await __temp, __restore();
    zones.value = zones.value.map((zone) => {
      return { id: zone.id, name: `${zone.name}`, value: `${zone.id}` };
    });
    const myZones = ref(zones.value);
    const currentZone = ref({
      name: (_a2 = (_a = myZones.value[0]) == null ? void 0 : _a.name) != null ? _a2 : "",
      value: (_b2 = (_b = myZones.value[0]) == null ? void 0 : _b.value) != null ? _b2 : ""
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
      name: (_c2 = (_d = (_c = myBlocks.value.filter(
        (block) => block["zone_id"] == currentZone.value.value
      )) == null ? void 0 : _c[0]) == null ? void 0 : _d.name) != null ? _c2 : "",
      value: (_d2 = (_f = (_e = myBlocks.value.filter(
        (block) => block["zone_id"] == currentZone.value.value
      )) == null ? void 0 : _e[0]) == null ? void 0 : _f.value) != null ? _d2 : ""
    });
    floors.value = floors.value.map((floor) => {
      return {
        id: floor.id,
        name: `${floor.desc}`,
        value: `${floor.id}`,
        block_id: `${floor["block_id"]}`
      };
    });
    const myFloors = ref(
      floors.value.filter(
        (floor) => floor["block_id"] == currentBlock.value.value
      )
    );
    const currentFloor = ref({
      name: (_e2 = (_h = (_g = myFloors.value.filter(
        (floor) => floor["block_id"] == currentBlock.value.value
      )) == null ? void 0 : _g[0]) == null ? void 0 : _h.name) != null ? _e2 : "",
      value: (_f2 = (_j = (_i = myFloors.value.filter(
        (floor) => floor["block_id"] == currentBlock.value.value
      )) == null ? void 0 : _i[0]) == null ? void 0 : _j.value) != null ? _f2 : ""
    });
    const myHighAreasBaseOnZoneAndBlockAndFloorID = computed(() => {
      return highAreas.value.filter((highArea) => {
        return highArea["floor_id"] == currentFloor.value.value;
      });
    });
    const statuses = ref([
      { name: "Booked", value: "booked" },
      { name: "Not Booked", value: "not booked" }
    ]);
    const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    const menu = ref();
    const menuItems = ref([
      {
        label: "Payment",
        command: () => {
          router.push("high_area/payment");
        }
      }
    ]);
    const viewDetailsHighAreaDialogVisible = ref(false);
    const createHighAreaDialogVisible = ref(false);
    const editHighAreaDialogVisible = ref(false);
    const deleteHighAreaDialogVisible = ref(false);
    const handleDropdown = (event, type) => {
      var _a3, _b3, _c3, _d3, _e3, _f3;
      var _a22, _b22, _c22, _d22, _e22, _f22, _g2, _h2, _i2, _j2, _k, _l;
      if (type == "zone") {
        myBlocks.value = blocks.value.filter(
          (block) => block["zone_id"] == event.value
        );
        currentBlock.value = {
          name: (_a3 = (_b22 = (_a22 = myBlocks.value.filter(
            (block) => block["zone_id"] == currentZone.value.value
          )) == null ? void 0 : _a22[0]) == null ? void 0 : _b22.name) != null ? _a3 : "",
          value: (_b3 = (_d22 = (_c22 = myBlocks.value.filter(
            (block) => block["zone_id"] == currentZone.value.value
          )) == null ? void 0 : _c22[0]) == null ? void 0 : _d22.value) != null ? _b3 : ""
        };
        myFloors.value = floors.value.filter(
          (floor) => floor["block_id"] == currentBlock.value.value
        );
        currentFloor.value = {
          name: (_c3 = (_f22 = (_e22 = myFloors.value.filter(
            (floor) => floor["block_id"] == currentBlock.value.value
          )) == null ? void 0 : _e22[0]) == null ? void 0 : _f22.name) != null ? _c3 : "",
          value: (_d3 = `${(_h2 = (_g2 = myFloors.value.filter(
            (floor) => floor["block_id"] == currentBlock.value.value
          )) == null ? void 0 : _g2[0]) == null ? void 0 : _h2.value}`) != null ? _d3 : ""
        };
      }
      if (type == "block") {
        myFloors.value = floors.value.filter(
          (floor) => floor["block_id"] == event.value
        );
        currentFloor.value = {
          name: (_e3 = (_j2 = (_i2 = myFloors.value.filter(
            (floor) => floor["block_id"] == currentBlock.value.value
          )) == null ? void 0 : _i2[0]) == null ? void 0 : _j2.name) != null ? _e3 : "",
          value: (_f3 = (_l = (_k = myFloors.value.filter(
            (floor) => floor["block_id"] == currentBlock.value.value
          )) == null ? void 0 : _k[0]) == null ? void 0 : _l.value) != null ? _f3 : ""
        };
      }
    };
    const toggleMenu = (event, data) => {
      setCurrentHighArea(data);
      menu.value.toggle(event);
    };
    const toggleViewDetailsHighArea = (data) => {
      setCurrentHighArea(data);
      viewDetailsHighAreaDialogVisible.value = !viewDetailsHighAreaDialogVisible.value;
    };
    const toggleEditHighArea = (data) => {
      setCurrentHighArea(data);
      editHighAreaDialogVisible.value = !editHighAreaDialogVisible.value;
    };
    const toggleDeleteHighArea = (data) => {
      setCurrentHighArea(data);
      deleteHighAreaDialogVisible.value = !deleteHighAreaDialogVisible.value;
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
      const _component_ViewDetailsHighAreaDialog = _sfc_main$3;
      const _component_CreateHighAreaDialog = _sfc_main$2;
      const _component_EditHighAreaDialog = _sfc_main$1;
      const _component_DeleteHighAreaDialog = _sfc_main$4;
      const _directive_auto_animate = resolveDirective("auto-animate");
      _push(`<!--[--><div class="w-full h-full flex flex-col"><div class="fixed right-0 top-0 z-50 backdrop-blur-xl w-5/6 h-[8%] px-4 border-b flex justify-between items-center"><div class="flex items-center gap-2"><span class="font-semibold text-lg">High Area</span>`);
      _push(ssrRenderComponent(_component_Tag, {
        value: unref(myHighAreasBaseOnZoneAndBlockAndFloorID).length
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
              placeholder: "Filter high area..."
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
                placeholder: "Filter high area..."
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Button, {
        size: "small",
        label: "New",
        onClick: ($event) => createHighAreaDialogVisible.value = !unref(createHighAreaDialogVisible)
      }, null, _parent));
      _push(`</div></div><div class="fixed right-0 top-[8%] z-50 backdrop-blur-xl w-5/6 h-[8%] px-4 border-b flex items-center gap-3"><div class="flex items-center gap-2"><label for="currentZone" class="font-semibold text-lg">Current Zone: </label>`);
      _push(ssrRenderComponent(_component_Dropdown, {
        id: "currentZone",
        placeholder: "Select Zone",
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
        placeholder: "Select Block",
        modelValue: unref(currentBlock).value,
        "onUpdate:modelValue": ($event) => unref(currentBlock).value = $event,
        options: unref(myBlocks),
        optionLabel: "name",
        optionValue: "value",
        onChange: (event) => handleDropdown(event, "block")
      }, null, _parent));
      _push(`</div><div class="flex items-center gap-2"><label for="currentFloor" class="font-semibold text-lg">Current Floor: </label>`);
      _push(ssrRenderComponent(_component_Dropdown, {
        id: "currentFloor",
        placeholder: "Select Floor",
        modelValue: unref(currentFloor).value,
        "onUpdate:modelValue": ($event) => unref(currentFloor).value = $event,
        options: unref(myFloors),
        optionLabel: "name",
        optionValue: "value",
        onChange: (event) => handleDropdown(event, "floor")
      }, null, _parent));
      _push(`</div></div><div class="absolute top-[16%] w-full h-[92%]">`);
      _push(ssrRenderComponent(_component_DataTable, mergeProps({
        value: unref(myHighAreasBaseOnZoneAndBlockAndFloorID),
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
            _push2(`<div class="flex justify-center items-center"${_scopeId}><span${_scopeId}>No High Area Found.</span></div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-center items-center" }, [
                createVNode("span", null, "No High Area Found.")
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
              field: "buy_status",
              header: "Buy Status"
            }, {
              body: withCtx(({ data }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Tag, {
                    severity: data["buy_status"] == "booked" ? "danger" : "success",
                    value: data["buy_status"].toUpperCase()
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Tag, {
                      severity: data["buy_status"] == "booked" ? "danger" : "success",
                      value: data["buy_status"].toUpperCase()
                    }, null, 8, ["severity", "value"])
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
                    onClick: ($event) => toggleViewDetailsHighArea(data)
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
                    onClick: ($event) => toggleEditHighArea(data)
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
                    onClick: ($event) => toggleDeleteHighArea(data)
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
                    onClick: (event) => toggleMenu(event, data)
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
                      onClick: ($event) => toggleViewDetailsHighArea(data)
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, { name: "mdi:eye-outline" })
                      ]),
                      _: 2
                    }, 1032, ["onClick"]),
                    createVNode(_component_Button, {
                      text: "",
                      severity: "secondary",
                      onClick: ($event) => toggleEditHighArea(data)
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, { name: "mdi:edit-outline" })
                      ]),
                      _: 2
                    }, 1032, ["onClick"]),
                    createVNode(_component_Button, {
                      text: "",
                      severity: "danger",
                      onClick: ($event) => toggleDeleteHighArea(data)
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, { name: "mdi:delete-outline" })
                      ]),
                      _: 2
                    }, 1032, ["onClick"]),
                    createVNode(_component_Button, {
                      text: "",
                      severity: "secondary",
                      onClick: (event) => toggleMenu(event, data)
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, { name: "mdi:more-vert" })
                      ]),
                      _: 2
                    }, 1032, ["onClick"]),
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
                field: "buy_status",
                header: "Buy Status"
              }, {
                body: withCtx(({ data }) => [
                  createVNode(_component_Tag, {
                    severity: data["buy_status"] == "booked" ? "danger" : "success",
                    value: data["buy_status"].toUpperCase()
                  }, null, 8, ["severity", "value"])
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
                    onClick: ($event) => toggleViewDetailsHighArea(data)
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, { name: "mdi:eye-outline" })
                    ]),
                    _: 2
                  }, 1032, ["onClick"]),
                  createVNode(_component_Button, {
                    text: "",
                    severity: "secondary",
                    onClick: ($event) => toggleEditHighArea(data)
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, { name: "mdi:edit-outline" })
                    ]),
                    _: 2
                  }, 1032, ["onClick"]),
                  createVNode(_component_Button, {
                    text: "",
                    severity: "danger",
                    onClick: ($event) => toggleDeleteHighArea(data)
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, { name: "mdi:delete-outline" })
                    ]),
                    _: 2
                  }, 1032, ["onClick"]),
                  createVNode(_component_Button, {
                    text: "",
                    severity: "secondary",
                    onClick: (event) => toggleMenu(event, data)
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, { name: "mdi:more-vert" })
                    ]),
                    _: 2
                  }, 1032, ["onClick"]),
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
      if (unref(viewDetailsHighAreaDialogVisible)) {
        _push(ssrRenderComponent(_component_ViewDetailsHighAreaDialog, {
          visible: unref(viewDetailsHighAreaDialogVisible),
          statuses: unref(statuses)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(createHighAreaDialogVisible)) {
        _push(ssrRenderComponent(_component_CreateHighAreaDialog, {
          visible: unref(createHighAreaDialogVisible),
          statuses: unref(statuses)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(editHighAreaDialogVisible)) {
        _push(ssrRenderComponent(_component_EditHighAreaDialog, {
          visible: unref(editHighAreaDialogVisible),
          statuses: unref(statuses)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(deleteHighAreaDialogVisible)) {
        _push(ssrRenderComponent(_component_DeleteHighAreaDialog, { visible: unref(deleteHighAreaDialogVisible) }, null, _parent));
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/project_details/high_area/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BUWO9AXk.mjs.map
