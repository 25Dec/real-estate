import script from './dialog.esm-Wemb0g_v.mjs';
import script$1 from './dropdown.esm-BZz-eegH.mjs';
import script$2 from './inputtext.esm-Blvd_dSV.mjs';
import script$3 from './inputnumber.esm-CMvh_h4P.mjs';
import script$4 from './button.esm-D8sVcJb8.mjs';
import { withAsyncContext, ref, mergeProps, unref, isRef, withCtx, createVNode, toDisplayString, useSSRContext, createTextVNode } from 'vue';
import { s as storeToRefs, u as useToast } from './server.mjs';
import { u as useZonesStore } from './zones-store-DDylndqA.mjs';
import { u as useBlocksStore } from './blocks-store-CY-29APJ.mjs';
import { u as useFloorsStore } from './floor-store-Cy61MA60.mjs';
import { u as useHighAreasStore } from './high-area-store-B-d20OaI.mjs';
import { u as usePaymentMethodsStore } from './payment-method-store-B-s5UmN8.mjs';
import { a as convertDateTime } from './core_utils-WJ_cJnbk.mjs';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main$3 = {
  __name: "ViewDetailsHighAreaDialog",
  __ssrInlineRender: true,
  props: ["visible", "statuses"],
  async setup(__props) {
    var _a2, _b2, _c2, _d2, _e2, _f2;
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
    let __temp, __restore;
    const { visible, statuses } = __props;
    const { zones } = storeToRefs(useZonesStore());
    const { getZones } = useZonesStore();
    const { blocks } = storeToRefs(useBlocksStore());
    const { getBlocks } = useBlocksStore();
    const { floors } = storeToRefs(useFloorsStore());
    const { getFloors } = useFloorsStore();
    const { currentHighArea } = storeToRefs(useHighAreasStore());
    useHighAreasStore();
    const { paymentMethodsDropdown } = storeToRefs(usePaymentMethodsStore());
    const { getPaymentMethods } = usePaymentMethodsStore();
    useToast();
    [__temp, __restore] = withAsyncContext(() => getZones()), await __temp, __restore();
    [__temp, __restore] = withAsyncContext(() => getBlocks()), await __temp, __restore();
    [__temp, __restore] = withAsyncContext(() => getFloors()), await __temp, __restore();
    [__temp, __restore] = withAsyncContext(() => getPaymentMethods()), await __temp, __restore();
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
    const myVisible = ref(visible);
    const highAreaDirection = ref(currentHighArea.value["high_area_direction"]);
    const lat = ref(currentHighArea.value["lat"]);
    const long = ref(currentHighArea.value["long"]);
    const totalArea = ref(currentHighArea.value["total_area"]);
    const progress = ref(currentHighArea.value["progress"]);
    const numberOfWC = ref(currentHighArea.value["number_of_wc"]);
    const numberOfRoom = ref(currentHighArea.value["number_of_room"]);
    const price = ref(currentHighArea.value["price"]);
    ref(currentHighArea.value["owner"]);
    const buyStatus = ref({
      name: (_l = (_k = statuses.filter(
        (status) => status["value"] == currentHighArea.value["buy_status"]
      )) == null ? void 0 : _k[0]) == null ? void 0 : _l["name"],
      value: (_n = (_m = statuses.filter(
        (status) => status["value"] == currentHighArea.value["buy_status"]
      )) == null ? void 0 : _m[0]) == null ? void 0 : _n["value"]
    });
    const desc = ref(currentHighArea.value["desc"]);
    const paymentMethod = ref({
      name: (_p = (_o = paymentMethodsDropdown.value.filter(
        (payment) => payment["value"] == currentHighArea.value["payment_method_id"]
      )) == null ? void 0 : _o[0]) == null ? void 0 : _p["name"],
      value: (_r = (_q = paymentMethodsDropdown.value.filter(
        (payment) => payment["value"] == currentHighArea.value["payment_method_id"]
      )) == null ? void 0 : _q[0]) == null ? void 0 : _r["value"]
    });
    const createdAt = ref(currentHighArea.value["created_at"]);
    const updatedAt = ref(currentHighArea.value["updated_at"]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script;
      const _component_Dropdown = script$1;
      const _component_InputText = script$2;
      const _component_InputNumber = script$3;
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
            _push2(`<div class="inline-flex items-center justify-center gap-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>High Area Details</span></div>`);
          } else {
            return [
              createVNode("div", { class: "inline-flex items-center justify-center gap-2" }, [
                createVNode("span", { class: "font-bold text-xl" }, "High Area Details")
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
            _push2(`<template class="flex flex-col gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="currentZone"${_scopeId}>Zone</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "currentZone",
              placeholder: "Select Zone",
              modelValue: unref(currentZone).value,
              "onUpdate:modelValue": ($event) => unref(currentZone).value = $event,
              options: unref(myZones),
              optionLabel: "name",
              optionValue: "value",
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="currentZone"${_scopeId}>Block</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "currentBlock",
              placeholder: "Select Block",
              modelValue: unref(currentBlock).value,
              "onUpdate:modelValue": ($event) => unref(currentBlock).value = $event,
              options: unref(myBlocks),
              optionLabel: "name",
              optionValue: "value",
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="currentFloor"${_scopeId}>Floor</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "currentFloor",
              placeholder: "Select Floor",
              modelValue: unref(currentFloor).value,
              "onUpdate:modelValue": ($event) => unref(currentFloor).value = $event,
              options: unref(myFloors),
              optionLabel: "name",
              optionValue: "value",
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="desc"${_scopeId}>Name</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "desc",
              modelValue: unref(desc),
              "onUpdate:modelValue": ($event) => isRef(desc) ? desc.value = $event : null,
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="lat"${_scopeId}>Latitude</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "lat",
              mode: "decimal",
              modelValue: unref(lat),
              "onUpdate:modelValue": ($event) => isRef(lat) ? lat.value = $event : null,
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="long"${_scopeId}>Longitude</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "long",
              mode: "decimal",
              modelValue: unref(long),
              "onUpdate:modelValue": ($event) => isRef(long) ? long.value = $event : null,
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="totalArea"${_scopeId}>Total Area</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "totalArea",
              mode: "decimal",
              modelValue: unref(totalArea),
              "onUpdate:modelValue": ($event) => isRef(totalArea) ? totalArea.value = $event : null,
              min: 0,
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="highAreaDirection"${_scopeId}>High Area Direction</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "highAreaDirection",
              modelValue: unref(highAreaDirection),
              "onUpdate:modelValue": ($event) => isRef(highAreaDirection) ? highAreaDirection.value = $event : null,
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="numberOfRoom"${_scopeId}>Number of room</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "numberOfRoom",
              mode: "decimal",
              modelValue: unref(numberOfRoom),
              "onUpdate:modelValue": ($event) => isRef(numberOfRoom) ? numberOfRoom.value = $event : null,
              min: 0,
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="numberOfWC"${_scopeId}>Number of WC</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "numberOfWC",
              mode: "decimal",
              modelValue: unref(numberOfWC),
              "onUpdate:modelValue": ($event) => isRef(numberOfWC) ? numberOfWC.value = $event : null,
              min: 0,
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="price"${_scopeId}>Price</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "price",
              modelValue: unref(price),
              "onUpdate:modelValue": ($event) => isRef(price) ? price.value = $event : null,
              mode: "decimal",
              prefix: "$",
              min: 0,
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="paymentMethod"${_scopeId}>Payment Method</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "paymentMethod",
              modelValue: unref(paymentMethod).value,
              "onUpdate:modelValue": ($event) => unref(paymentMethod).value = $event,
              placeholder: "Select Payment Method",
              options: unref(paymentMethodsDropdown),
              optionLabel: "name",
              optionValue: "value",
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="progress"${_scopeId}>Progress</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "progress",
              modelValue: unref(progress),
              "onUpdate:modelValue": ($event) => isRef(progress) ? progress.value = $event : null,
              mode: "decimal",
              prefix: "%",
              min: 0,
              max: 100,
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="buyStatus"${_scopeId}>Buy Status</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "buyStatus",
              modelValue: unref(buyStatus).value,
              "onUpdate:modelValue": ($event) => unref(buyStatus).value = $event,
              placeholder: "Select Status",
              options: __props.statuses,
              optionLabel: "name",
              optionValue: "value",
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-row gap-3 justify-between"${_scopeId}><span class="text-xs text-gray-400"${_scopeId}> Created at: ${ssrInterpolate(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(createdAt)))}</span><span class="text-xs text-gray-400"${_scopeId}> Updated at: ${ssrInterpolate(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(updatedAt)))}</span></div></template>`);
          } else {
            return [
              createVNode("template", { class: "flex flex-col gap-3" }, [
                createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                  createVNode("label", { for: "currentZone" }, "Zone"),
                  createVNode(_component_Dropdown, {
                    id: "currentZone",
                    placeholder: "Select Zone",
                    modelValue: unref(currentZone).value,
                    "onUpdate:modelValue": ($event) => unref(currentZone).value = $event,
                    options: unref(myZones),
                    optionLabel: "name",
                    optionValue: "value",
                    disabled: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                ]),
                createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                  createVNode("label", { for: "currentZone" }, "Block"),
                  createVNode(_component_Dropdown, {
                    id: "currentBlock",
                    placeholder: "Select Block",
                    modelValue: unref(currentBlock).value,
                    "onUpdate:modelValue": ($event) => unref(currentBlock).value = $event,
                    options: unref(myBlocks),
                    optionLabel: "name",
                    optionValue: "value",
                    disabled: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                ]),
                createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                  createVNode("label", { for: "currentFloor" }, "Floor"),
                  createVNode(_component_Dropdown, {
                    id: "currentFloor",
                    placeholder: "Select Floor",
                    modelValue: unref(currentFloor).value,
                    "onUpdate:modelValue": ($event) => unref(currentFloor).value = $event,
                    options: unref(myFloors),
                    optionLabel: "name",
                    optionValue: "value",
                    disabled: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                ]),
                createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                  createVNode("label", { for: "desc" }, "Name"),
                  createVNode(_component_InputText, {
                    id: "desc",
                    modelValue: unref(desc),
                    "onUpdate:modelValue": ($event) => isRef(desc) ? desc.value = $event : null,
                    disabled: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "flex gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "lat" }, "Latitude"),
                    createVNode(_component_InputNumber, {
                      id: "lat",
                      mode: "decimal",
                      modelValue: unref(lat),
                      "onUpdate:modelValue": ($event) => isRef(lat) ? lat.value = $event : null,
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "long" }, "Longitude"),
                    createVNode(_component_InputNumber, {
                      id: "long",
                      mode: "decimal",
                      modelValue: unref(long),
                      "onUpdate:modelValue": ($event) => isRef(long) ? long.value = $event : null,
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "totalArea" }, "Total Area"),
                    createVNode(_component_InputNumber, {
                      id: "totalArea",
                      mode: "decimal",
                      modelValue: unref(totalArea),
                      "onUpdate:modelValue": ($event) => isRef(totalArea) ? totalArea.value = $event : null,
                      min: 0,
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "highAreaDirection" }, "High Area Direction"),
                    createVNode(_component_InputText, {
                      id: "highAreaDirection",
                      modelValue: unref(highAreaDirection),
                      "onUpdate:modelValue": ($event) => isRef(highAreaDirection) ? highAreaDirection.value = $event : null,
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "numberOfRoom" }, "Number of room"),
                    createVNode(_component_InputNumber, {
                      id: "numberOfRoom",
                      mode: "decimal",
                      modelValue: unref(numberOfRoom),
                      "onUpdate:modelValue": ($event) => isRef(numberOfRoom) ? numberOfRoom.value = $event : null,
                      min: 0,
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "numberOfWC" }, "Number of WC"),
                    createVNode(_component_InputNumber, {
                      id: "numberOfWC",
                      mode: "decimal",
                      modelValue: unref(numberOfWC),
                      "onUpdate:modelValue": ($event) => isRef(numberOfWC) ? numberOfWC.value = $event : null,
                      min: 0,
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "price" }, "Price"),
                    createVNode(_component_InputNumber, {
                      id: "price",
                      modelValue: unref(price),
                      "onUpdate:modelValue": ($event) => isRef(price) ? price.value = $event : null,
                      mode: "decimal",
                      prefix: "$",
                      min: 0,
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "paymentMethod" }, "Payment Method"),
                    createVNode(_component_Dropdown, {
                      id: "paymentMethod",
                      modelValue: unref(paymentMethod).value,
                      "onUpdate:modelValue": ($event) => unref(paymentMethod).value = $event,
                      placeholder: "Select Payment Method",
                      options: unref(paymentMethodsDropdown),
                      optionLabel: "name",
                      optionValue: "value",
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                  ])
                ]),
                createVNode("div", { class: "flex gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "progress" }, "Progress"),
                    createVNode(_component_InputNumber, {
                      id: "progress",
                      modelValue: unref(progress),
                      "onUpdate:modelValue": ($event) => isRef(progress) ? progress.value = $event : null,
                      mode: "decimal",
                      prefix: "%",
                      min: 0,
                      max: 100,
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "buyStatus" }, "Buy Status"),
                    createVNode(_component_Dropdown, {
                      id: "buyStatus",
                      modelValue: unref(buyStatus).value,
                      "onUpdate:modelValue": ($event) => unref(buyStatus).value = $event,
                      placeholder: "Select Status",
                      options: __props.statuses,
                      optionLabel: "name",
                      optionValue: "value",
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/high_area/ViewDetailsHighAreaDialog.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "CreateHighAreaDialog",
  __ssrInlineRender: true,
  props: ["visible", "statuses"],
  async setup(__props) {
    var _a2, _b2, _c2, _d2, _e2, _f2;
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
    let __temp, __restore;
    const { visible, statuses } = __props;
    const { zones } = storeToRefs(useZonesStore());
    const { getZones } = useZonesStore();
    const { blocks } = storeToRefs(useBlocksStore());
    const { getBlocks } = useBlocksStore();
    const { floors } = storeToRefs(useFloorsStore());
    const { getFloors } = useFloorsStore();
    const { addNewHighArea } = useHighAreasStore();
    const { paymentMethodsDropdown } = storeToRefs(usePaymentMethodsStore());
    const { getPaymentMethods } = usePaymentMethodsStore();
    const toast = useToast();
    [__temp, __restore] = withAsyncContext(() => getZones()), await __temp, __restore();
    [__temp, __restore] = withAsyncContext(() => getBlocks()), await __temp, __restore();
    [__temp, __restore] = withAsyncContext(() => getFloors()), await __temp, __restore();
    [__temp, __restore] = withAsyncContext(() => getPaymentMethods()), await __temp, __restore();
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
    const myVisible = ref(visible);
    const highAreaDirection = ref("");
    const lat = ref(0);
    const long = ref(0);
    const totalArea = ref(0);
    const progress = ref(0);
    const numberOfWC = ref(0);
    const numberOfRoom = ref(0);
    const price = ref(0);
    const owner = ref(0);
    const buyStatus = ref({});
    const desc = ref("");
    const paymentMethod = ref({});
    const onSave = async () => {
      const newHighAreaData = {
        id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1,
        floor_id: parseInt(currentFloor.value.value),
        high_area_direction: highAreaDirection.value,
        lat: parseInt(lat.value),
        long: parseInt(long.value),
        total_area: parseInt(totalArea.value),
        progress: parseInt(progress.value),
        number_of_wc: parseInt(numberOfWC.value),
        number_of_room: parseInt(numberOfRoom.value),
        price: parseInt(price.value),
        owner: parseInt(owner.value),
        buy_status: buyStatus.value.value,
        desc: desc.value,
        payment_method_id: parseInt(paymentMethod.value),
        deleted: "false",
        created_by: 13,
        updated_by: 13,
        created_at: (/* @__PURE__ */ new Date()).toLocaleString(),
        updated_at: null
      };
      const response = await addNewHighArea(newHighAreaData);
      myVisible.value = false;
      if (response != null && response["result"] == "ok") {
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Create New High Area Successfully!",
          group: "bl",
          life: 3e3
        });
      } else {
        toast.add({
          severity: "danger",
          summary: "Error",
          detail: "Failed to Create New High Area",
          group: "bl",
          life: 3e3
        });
      }
    };
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
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script;
      const _component_Dropdown = script$1;
      const _component_InputText = script$2;
      const _component_InputNumber = script$3;
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
            _push2(`<div class="inline-flex items-center justify-center gap-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>Create New High Area</span></div>`);
          } else {
            return [
              createVNode("div", { class: "inline-flex items-center justify-center gap-2" }, [
                createVNode("span", { class: "font-bold text-xl" }, "Create New High Area")
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
            _push2(`<template class="flex flex-col gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="currentZone"${_scopeId}>Zone</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "currentZone",
              placeholder: "Select Zone",
              modelValue: unref(currentZone).value,
              "onUpdate:modelValue": ($event) => unref(currentZone).value = $event,
              options: unref(myZones),
              optionLabel: "name",
              optionValue: "value",
              onChange: (event) => handleDropdown(event, "zone")
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="currentZone"${_scopeId}>Block</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "currentBlock",
              placeholder: "Select Block",
              modelValue: unref(currentBlock).value,
              "onUpdate:modelValue": ($event) => unref(currentBlock).value = $event,
              options: unref(myBlocks),
              optionLabel: "name",
              optionValue: "value",
              onChange: (event) => handleDropdown(event, "block")
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="currentFloor"${_scopeId}>Floor</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "currentFloor",
              placeholder: "Select Floor",
              modelValue: unref(currentFloor).value,
              "onUpdate:modelValue": ($event) => unref(currentFloor).value = $event,
              options: unref(myFloors),
              optionLabel: "name",
              optionValue: "value",
              onChange: (event) => handleDropdown(event, "floor")
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="desc"${_scopeId}>Name</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "desc",
              modelValue: unref(desc),
              "onUpdate:modelValue": ($event) => isRef(desc) ? desc.value = $event : null,
              placeHolder: "Name"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="lat"${_scopeId}>Latitude</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "lat",
              mode: "decimal",
              modelValue: unref(lat),
              "onUpdate:modelValue": ($event) => isRef(lat) ? lat.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="long"${_scopeId}>Longitude</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "long",
              mode: "decimal",
              modelValue: unref(long),
              "onUpdate:modelValue": ($event) => isRef(long) ? long.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="totalArea"${_scopeId}>Total Area</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "totalArea",
              mode: "decimal",
              modelValue: unref(totalArea),
              "onUpdate:modelValue": ($event) => isRef(totalArea) ? totalArea.value = $event : null,
              min: 0
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="highAreaDirection"${_scopeId}>High Area Direction</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "highAreaDirection",
              placeholder: "High Area Direction",
              modelValue: unref(highAreaDirection),
              "onUpdate:modelValue": ($event) => isRef(highAreaDirection) ? highAreaDirection.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="numberOfRoom"${_scopeId}>Number of room</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "numberOfRoom",
              mode: "decimal",
              modelValue: unref(numberOfRoom),
              "onUpdate:modelValue": ($event) => isRef(numberOfRoom) ? numberOfRoom.value = $event : null,
              min: 0
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="numberOfWC"${_scopeId}>Number of WC</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "numberOfWC",
              mode: "decimal",
              modelValue: unref(numberOfWC),
              "onUpdate:modelValue": ($event) => isRef(numberOfWC) ? numberOfWC.value = $event : null,
              min: 0
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="price"${_scopeId}>Price</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "price",
              modelValue: unref(price),
              "onUpdate:modelValue": ($event) => isRef(price) ? price.value = $event : null,
              mode: "decimal",
              prefix: "$",
              min: 0
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="paymentMethod"${_scopeId}>Payment Method</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "paymentMethod",
              modelValue: unref(paymentMethod),
              "onUpdate:modelValue": ($event) => isRef(paymentMethod) ? paymentMethod.value = $event : null,
              placeholder: "Select Payment Method",
              options: unref(paymentMethodsDropdown),
              optionLabel: "name",
              optionValue: "value"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="progress"${_scopeId}>Progress</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "progress",
              modelValue: unref(progress),
              "onUpdate:modelValue": ($event) => isRef(progress) ? progress.value = $event : null,
              mode: "decimal",
              prefix: "%",
              min: 0,
              max: 100
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="buyStatus"${_scopeId}>Buy Status</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "buyStatus",
              modelValue: unref(buyStatus).value,
              "onUpdate:modelValue": ($event) => unref(buyStatus).value = $event,
              placeholder: "Select Status",
              options: __props.statuses,
              optionLabel: "name",
              optionValue: "value"
            }, null, _parent2, _scopeId));
            _push2(`</div></div></template>`);
          } else {
            return [
              createVNode("template", { class: "flex flex-col gap-3" }, [
                createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                  createVNode("label", { for: "currentZone" }, "Zone"),
                  createVNode(_component_Dropdown, {
                    id: "currentZone",
                    placeholder: "Select Zone",
                    modelValue: unref(currentZone).value,
                    "onUpdate:modelValue": ($event) => unref(currentZone).value = $event,
                    options: unref(myZones),
                    optionLabel: "name",
                    optionValue: "value",
                    onChange: (event) => handleDropdown(event, "zone")
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "onChange"])
                ]),
                createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                  createVNode("label", { for: "currentZone" }, "Block"),
                  createVNode(_component_Dropdown, {
                    id: "currentBlock",
                    placeholder: "Select Block",
                    modelValue: unref(currentBlock).value,
                    "onUpdate:modelValue": ($event) => unref(currentBlock).value = $event,
                    options: unref(myBlocks),
                    optionLabel: "name",
                    optionValue: "value",
                    onChange: (event) => handleDropdown(event, "block")
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "onChange"])
                ]),
                createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                  createVNode("label", { for: "currentFloor" }, "Floor"),
                  createVNode(_component_Dropdown, {
                    id: "currentFloor",
                    placeholder: "Select Floor",
                    modelValue: unref(currentFloor).value,
                    "onUpdate:modelValue": ($event) => unref(currentFloor).value = $event,
                    options: unref(myFloors),
                    optionLabel: "name",
                    optionValue: "value",
                    onChange: (event) => handleDropdown(event, "floor")
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "onChange"])
                ]),
                createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                  createVNode("label", { for: "desc" }, "Name"),
                  createVNode(_component_InputText, {
                    id: "desc",
                    modelValue: unref(desc),
                    "onUpdate:modelValue": ($event) => isRef(desc) ? desc.value = $event : null,
                    placeHolder: "Name"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "flex gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "lat" }, "Latitude"),
                    createVNode(_component_InputNumber, {
                      id: "lat",
                      mode: "decimal",
                      modelValue: unref(lat),
                      "onUpdate:modelValue": ($event) => isRef(lat) ? lat.value = $event : null
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "long" }, "Longitude"),
                    createVNode(_component_InputNumber, {
                      id: "long",
                      mode: "decimal",
                      modelValue: unref(long),
                      "onUpdate:modelValue": ($event) => isRef(long) ? long.value = $event : null
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "totalArea" }, "Total Area"),
                    createVNode(_component_InputNumber, {
                      id: "totalArea",
                      mode: "decimal",
                      modelValue: unref(totalArea),
                      "onUpdate:modelValue": ($event) => isRef(totalArea) ? totalArea.value = $event : null,
                      min: 0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "highAreaDirection" }, "High Area Direction"),
                    createVNode(_component_InputText, {
                      id: "highAreaDirection",
                      placeholder: "High Area Direction",
                      modelValue: unref(highAreaDirection),
                      "onUpdate:modelValue": ($event) => isRef(highAreaDirection) ? highAreaDirection.value = $event : null
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "numberOfRoom" }, "Number of room"),
                    createVNode(_component_InputNumber, {
                      id: "numberOfRoom",
                      mode: "decimal",
                      modelValue: unref(numberOfRoom),
                      "onUpdate:modelValue": ($event) => isRef(numberOfRoom) ? numberOfRoom.value = $event : null,
                      min: 0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "numberOfWC" }, "Number of WC"),
                    createVNode(_component_InputNumber, {
                      id: "numberOfWC",
                      mode: "decimal",
                      modelValue: unref(numberOfWC),
                      "onUpdate:modelValue": ($event) => isRef(numberOfWC) ? numberOfWC.value = $event : null,
                      min: 0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "price" }, "Price"),
                    createVNode(_component_InputNumber, {
                      id: "price",
                      modelValue: unref(price),
                      "onUpdate:modelValue": ($event) => isRef(price) ? price.value = $event : null,
                      mode: "decimal",
                      prefix: "$",
                      min: 0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "paymentMethod" }, "Payment Method"),
                    createVNode(_component_Dropdown, {
                      id: "paymentMethod",
                      modelValue: unref(paymentMethod),
                      "onUpdate:modelValue": ($event) => isRef(paymentMethod) ? paymentMethod.value = $event : null,
                      placeholder: "Select Payment Method",
                      options: unref(paymentMethodsDropdown),
                      optionLabel: "name",
                      optionValue: "value"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                  ])
                ]),
                createVNode("div", { class: "flex gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "progress" }, "Progress"),
                    createVNode(_component_InputNumber, {
                      id: "progress",
                      modelValue: unref(progress),
                      "onUpdate:modelValue": ($event) => isRef(progress) ? progress.value = $event : null,
                      mode: "decimal",
                      prefix: "%",
                      min: 0,
                      max: 100
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "buyStatus" }, "Buy Status"),
                    createVNode(_component_Dropdown, {
                      id: "buyStatus",
                      modelValue: unref(buyStatus).value,
                      "onUpdate:modelValue": ($event) => unref(buyStatus).value = $event,
                      placeholder: "Select Status",
                      options: __props.statuses,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/high_area/CreateHighAreaDialog.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "EditHighAreaDialog",
  __ssrInlineRender: true,
  props: ["visible", "statuses"],
  async setup(__props) {
    var _a2, _b2, _c2, _d2, _e2, _f2;
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
    let __temp, __restore;
    const { visible, statuses } = __props;
    const { zones } = storeToRefs(useZonesStore());
    const { getZones } = useZonesStore();
    const { blocks } = storeToRefs(useBlocksStore());
    const { getBlocks } = useBlocksStore();
    const { floors } = storeToRefs(useFloorsStore());
    const { getFloors } = useFloorsStore();
    const { currentHighArea } = storeToRefs(useHighAreasStore());
    const { editHighArea } = useHighAreasStore();
    const { paymentMethodsDropdown } = storeToRefs(usePaymentMethodsStore());
    const { getPaymentMethods } = usePaymentMethodsStore();
    const toast = useToast();
    [__temp, __restore] = withAsyncContext(() => getZones()), await __temp, __restore();
    [__temp, __restore] = withAsyncContext(() => getBlocks()), await __temp, __restore();
    [__temp, __restore] = withAsyncContext(() => getFloors()), await __temp, __restore();
    [__temp, __restore] = withAsyncContext(() => getPaymentMethods()), await __temp, __restore();
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
    const myVisible = ref(visible);
    const highAreaDirection = ref(currentHighArea.value["high_area_direction"]);
    const lat = ref(currentHighArea.value["lat"]);
    const long = ref(currentHighArea.value["long"]);
    const totalArea = ref(currentHighArea.value["total_area"]);
    const progress = ref(currentHighArea.value["progress"]);
    const numberOfWC = ref(currentHighArea.value["number_of_wc"]);
    const numberOfRoom = ref(currentHighArea.value["number_of_room"]);
    const price = ref(currentHighArea.value["price"]);
    const owner = ref(currentHighArea.value["owner"]);
    const buyStatus = ref({
      name: (_l = (_k = statuses.filter(
        (status) => status["value"] == currentHighArea.value["buy_status"]
      )) == null ? void 0 : _k[0]) == null ? void 0 : _l["name"],
      value: (_n = (_m = statuses.filter(
        (status) => status["value"] == currentHighArea.value["buy_status"]
      )) == null ? void 0 : _m[0]) == null ? void 0 : _n["value"]
    });
    const desc = ref(currentHighArea.value["desc"]);
    const paymentMethod = ref({
      name: (_p = (_o = paymentMethodsDropdown.value.filter(
        (payment) => payment["value"] == currentHighArea.value["payment_method_id"]
      )) == null ? void 0 : _o[0]) == null ? void 0 : _p["name"],
      value: (_r = (_q = paymentMethodsDropdown.value.filter(
        (payment) => payment["value"] == currentHighArea.value["payment_method_id"]
      )) == null ? void 0 : _q[0]) == null ? void 0 : _r["value"]
    });
    const createdAt = ref(currentHighArea.value["created_at"]);
    const updatedAt = ref(currentHighArea.value["updated_at"]);
    const onSave = async () => {
      const newHighAreaData = {
        ...currentHighArea.value,
        floor_id: parseInt(currentFloor.value.value),
        high_area_direction: highAreaDirection.value,
        lat: parseInt(lat.value),
        long: parseInt(long.value),
        total_area: parseInt(totalArea.value),
        progress: parseInt(progress.value),
        number_of_wc: parseInt(numberOfWC.value),
        number_of_room: parseInt(numberOfRoom.value),
        price: parseInt(price.value),
        owner: parseInt(owner.value),
        buy_status: buyStatus.value.value,
        desc: desc.value,
        payment_method_id: parseInt(paymentMethod.value),
        updated_at: (/* @__PURE__ */ new Date()).toLocaleString()
      };
      const response = await editHighArea(newHighAreaData);
      myVisible.value = false;
      if (response != null && response["result"] == "ok") {
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Edit High Area Successfully!",
          group: "bl",
          life: 3e3
        });
      } else {
        toast.add({
          severity: "danger",
          summary: "Error",
          detail: "Failed to Edit High Area",
          group: "bl",
          life: 3e3
        });
      }
    };
    const handleDropdown = (event, type) => {
      var _a3, _b3, _c3, _d3, _e3, _f3;
      var _a22, _b22, _c22, _d22, _e22, _f22, _g2, _h2, _i2, _j2, _k2, _l2;
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
          value: (_f3 = (_l2 = (_k2 = myFloors.value.filter(
            (floor) => floor["block_id"] == currentBlock.value.value
          )) == null ? void 0 : _k2[0]) == null ? void 0 : _l2.value) != null ? _f3 : ""
        };
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script;
      const _component_Dropdown = script$1;
      const _component_InputText = script$2;
      const _component_InputNumber = script$3;
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
            _push2(`<div class="inline-flex items-center justify-center gap-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>High Area Details</span></div>`);
          } else {
            return [
              createVNode("div", { class: "inline-flex items-center justify-center gap-2" }, [
                createVNode("span", { class: "font-bold text-xl" }, "High Area Details")
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
            _push2(`<template class="flex flex-col gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="currentZone"${_scopeId}>Zone</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "currentZone",
              placeholder: "Select Zone",
              modelValue: unref(currentZone).value,
              "onUpdate:modelValue": ($event) => unref(currentZone).value = $event,
              options: unref(myZones),
              optionLabel: "name",
              optionValue: "value",
              onChange: (event) => handleDropdown(event, "zone")
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="currentZone"${_scopeId}>Block</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "currentBlock",
              placeholder: "Select Block",
              modelValue: unref(currentBlock).value,
              "onUpdate:modelValue": ($event) => unref(currentBlock).value = $event,
              options: unref(myBlocks),
              optionLabel: "name",
              optionValue: "value",
              onChange: (event) => handleDropdown(event, "block")
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="currentFloor"${_scopeId}>Floor</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "currentFloor",
              placeholder: "Select Floor",
              modelValue: unref(currentFloor).value,
              "onUpdate:modelValue": ($event) => unref(currentFloor).value = $event,
              options: unref(myFloors),
              optionLabel: "name",
              optionValue: "value",
              onChange: (event) => handleDropdown(event, "floor")
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="desc"${_scopeId}>Name</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "desc",
              modelValue: unref(desc),
              "onUpdate:modelValue": ($event) => isRef(desc) ? desc.value = $event : null,
              placeHolder: "Name"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="lat"${_scopeId}>Latitude</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "lat",
              mode: "decimal",
              modelValue: unref(lat),
              "onUpdate:modelValue": ($event) => isRef(lat) ? lat.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="long"${_scopeId}>Longitude</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "long",
              mode: "decimal",
              modelValue: unref(long),
              "onUpdate:modelValue": ($event) => isRef(long) ? long.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="totalArea"${_scopeId}>Total Area</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "totalArea",
              mode: "decimal",
              modelValue: unref(totalArea),
              "onUpdate:modelValue": ($event) => isRef(totalArea) ? totalArea.value = $event : null,
              min: 0
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="highAreaDirection"${_scopeId}>High Area Direction</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "highAreaDirection",
              placeholder: "High Area Direction",
              modelValue: unref(highAreaDirection),
              "onUpdate:modelValue": ($event) => isRef(highAreaDirection) ? highAreaDirection.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="numberOfRoom"${_scopeId}>Number of room</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "numberOfRoom",
              mode: "decimal",
              modelValue: unref(numberOfRoom),
              "onUpdate:modelValue": ($event) => isRef(numberOfRoom) ? numberOfRoom.value = $event : null,
              min: 0
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="numberOfWC"${_scopeId}>Number of WC</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "numberOfWC",
              mode: "decimal",
              modelValue: unref(numberOfWC),
              "onUpdate:modelValue": ($event) => isRef(numberOfWC) ? numberOfWC.value = $event : null,
              min: 0
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="price"${_scopeId}>Price</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "price",
              modelValue: unref(price),
              "onUpdate:modelValue": ($event) => isRef(price) ? price.value = $event : null,
              mode: "decimal",
              prefix: "$",
              min: 0
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="paymentMethod"${_scopeId}>Payment Method</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "paymentMethod",
              modelValue: unref(paymentMethod).value,
              "onUpdate:modelValue": ($event) => unref(paymentMethod).value = $event,
              placeholder: "Select Payment Method",
              options: unref(paymentMethodsDropdown),
              optionLabel: "name",
              optionValue: "value"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="progress"${_scopeId}>Progress</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "progress",
              modelValue: unref(progress),
              "onUpdate:modelValue": ($event) => isRef(progress) ? progress.value = $event : null,
              mode: "decimal",
              prefix: "%",
              min: 0,
              max: 100
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="buyStatus"${_scopeId}>Buy Status</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "buyStatus",
              modelValue: unref(buyStatus).value,
              "onUpdate:modelValue": ($event) => unref(buyStatus).value = $event,
              placeholder: "Select Status",
              options: __props.statuses,
              optionLabel: "name",
              optionValue: "value"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-row gap-3 justify-between"${_scopeId}><span class="text-xs text-gray-400"${_scopeId}> Created at: ${ssrInterpolate(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(createdAt)))}</span><span class="text-xs text-gray-400"${_scopeId}> Updated at: ${ssrInterpolate(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(updatedAt)))}</span></div></template>`);
          } else {
            return [
              createVNode("template", { class: "flex flex-col gap-3" }, [
                createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                  createVNode("label", { for: "currentZone" }, "Zone"),
                  createVNode(_component_Dropdown, {
                    id: "currentZone",
                    placeholder: "Select Zone",
                    modelValue: unref(currentZone).value,
                    "onUpdate:modelValue": ($event) => unref(currentZone).value = $event,
                    options: unref(myZones),
                    optionLabel: "name",
                    optionValue: "value",
                    onChange: (event) => handleDropdown(event, "zone")
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "onChange"])
                ]),
                createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                  createVNode("label", { for: "currentZone" }, "Block"),
                  createVNode(_component_Dropdown, {
                    id: "currentBlock",
                    placeholder: "Select Block",
                    modelValue: unref(currentBlock).value,
                    "onUpdate:modelValue": ($event) => unref(currentBlock).value = $event,
                    options: unref(myBlocks),
                    optionLabel: "name",
                    optionValue: "value",
                    onChange: (event) => handleDropdown(event, "block")
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "onChange"])
                ]),
                createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                  createVNode("label", { for: "currentFloor" }, "Floor"),
                  createVNode(_component_Dropdown, {
                    id: "currentFloor",
                    placeholder: "Select Floor",
                    modelValue: unref(currentFloor).value,
                    "onUpdate:modelValue": ($event) => unref(currentFloor).value = $event,
                    options: unref(myFloors),
                    optionLabel: "name",
                    optionValue: "value",
                    onChange: (event) => handleDropdown(event, "floor")
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "onChange"])
                ]),
                createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                  createVNode("label", { for: "desc" }, "Name"),
                  createVNode(_component_InputText, {
                    id: "desc",
                    modelValue: unref(desc),
                    "onUpdate:modelValue": ($event) => isRef(desc) ? desc.value = $event : null,
                    placeHolder: "Name"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "flex gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "lat" }, "Latitude"),
                    createVNode(_component_InputNumber, {
                      id: "lat",
                      mode: "decimal",
                      modelValue: unref(lat),
                      "onUpdate:modelValue": ($event) => isRef(lat) ? lat.value = $event : null
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "long" }, "Longitude"),
                    createVNode(_component_InputNumber, {
                      id: "long",
                      mode: "decimal",
                      modelValue: unref(long),
                      "onUpdate:modelValue": ($event) => isRef(long) ? long.value = $event : null
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "totalArea" }, "Total Area"),
                    createVNode(_component_InputNumber, {
                      id: "totalArea",
                      mode: "decimal",
                      modelValue: unref(totalArea),
                      "onUpdate:modelValue": ($event) => isRef(totalArea) ? totalArea.value = $event : null,
                      min: 0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "highAreaDirection" }, "High Area Direction"),
                    createVNode(_component_InputText, {
                      id: "highAreaDirection",
                      placeholder: "High Area Direction",
                      modelValue: unref(highAreaDirection),
                      "onUpdate:modelValue": ($event) => isRef(highAreaDirection) ? highAreaDirection.value = $event : null
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "numberOfRoom" }, "Number of room"),
                    createVNode(_component_InputNumber, {
                      id: "numberOfRoom",
                      mode: "decimal",
                      modelValue: unref(numberOfRoom),
                      "onUpdate:modelValue": ($event) => isRef(numberOfRoom) ? numberOfRoom.value = $event : null,
                      min: 0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "numberOfWC" }, "Number of WC"),
                    createVNode(_component_InputNumber, {
                      id: "numberOfWC",
                      mode: "decimal",
                      modelValue: unref(numberOfWC),
                      "onUpdate:modelValue": ($event) => isRef(numberOfWC) ? numberOfWC.value = $event : null,
                      min: 0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "price" }, "Price"),
                    createVNode(_component_InputNumber, {
                      id: "price",
                      modelValue: unref(price),
                      "onUpdate:modelValue": ($event) => isRef(price) ? price.value = $event : null,
                      mode: "decimal",
                      prefix: "$",
                      min: 0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "paymentMethod" }, "Payment Method"),
                    createVNode(_component_Dropdown, {
                      id: "paymentMethod",
                      modelValue: unref(paymentMethod).value,
                      "onUpdate:modelValue": ($event) => unref(paymentMethod).value = $event,
                      placeholder: "Select Payment Method",
                      options: unref(paymentMethodsDropdown),
                      optionLabel: "name",
                      optionValue: "value"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                  ])
                ]),
                createVNode("div", { class: "flex gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "progress" }, "Progress"),
                    createVNode(_component_InputNumber, {
                      id: "progress",
                      modelValue: unref(progress),
                      "onUpdate:modelValue": ($event) => isRef(progress) ? progress.value = $event : null,
                      mode: "decimal",
                      prefix: "%",
                      min: 0,
                      max: 100
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "buyStatus" }, "Buy Status"),
                    createVNode(_component_Dropdown, {
                      id: "buyStatus",
                      modelValue: unref(buyStatus).value,
                      "onUpdate:modelValue": ($event) => unref(buyStatus).value = $event,
                      placeholder: "Select Status",
                      options: __props.statuses,
                      optionLabel: "name",
                      optionValue: "value"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/high_area/EditHighAreaDialog.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "DeleteHighAreaDialog",
  __ssrInlineRender: true,
  props: ["visible"],
  setup(__props) {
    const { visible } = __props;
    const { currentHighArea } = storeToRefs(useHighAreasStore());
    const { deleteHighArea } = useHighAreasStore();
    const toast = useToast();
    const myVisible = ref(visible);
    const onDelete = async () => {
      const response = await deleteHighArea(currentHighArea.value);
      myVisible.value = false;
      if (response != null && response["result"] == "ok") {
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Delete High Area Successfully!",
          group: "bl",
          life: 3e3
        });
      } else {
        toast.add({
          severity: "danger",
          summary: "Error",
          detail: "Failed to Delete High Area",
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
            _push2(`<div class="inline-flex items-center justify-center gap-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>Delete High Area?</span></div>`);
          } else {
            return [
              createVNode("div", { class: "inline-flex items-center justify-center gap-2" }, [
                createVNode("span", { class: "font-bold text-xl" }, "Delete High Area?")
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
            _push2(`<div${_scopeId}><span${_scopeId}> This will delete high area <b${_scopeId}>${ssrInterpolate(unref(currentHighArea)["desc"])}</b> permanently! </span><span${_scopeId}>You cannot undo this action!</span></div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode("span", null, [
                  createTextVNode(" This will delete high area "),
                  createVNode("b", null, toDisplayString(unref(currentHighArea)["desc"]), 1),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/high_area/DeleteHighAreaDialog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main$3 as _, _sfc_main$2 as a, _sfc_main$1 as b, _sfc_main as c };
//# sourceMappingURL=DeleteHighAreaDialog-CmmgKHsn.mjs.map
