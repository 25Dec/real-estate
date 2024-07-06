import script from "./dialog.esm-Wemb0g_v.js";
import script$1 from "./dropdown.esm-BZz-eegH.js";
import script$2 from "./inputtext.esm-Blvd_dSV.js";
import script$3 from "./inputnumber.esm-CMvh_h4P.js";
import script$4 from "./button.esm-D8sVcJb8.js";
import { withAsyncContext, ref, mergeProps, unref, isRef, withCtx, createVNode, toDisplayString, useSSRContext, createTextVNode } from "vue";
import "hookable";
import "destr";
import "klona";
import "devalue";
import "#internal/nuxt/paths";
import { s as storeToRefs, u as useToast } from "../server.mjs";
import { u as useZonesStore } from "./zones-store-DDylndqA.js";
import { u as useLandAreasStore } from "./land-area-store-DoyN9VgD.js";
import { u as usePaymentMethodsStore } from "./payment-method-store-B-s5UmN8.js";
import { a as convertDateTime } from "./core_utils-WJ_cJnbk.js";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
const _sfc_main$3 = {
  __name: "ViewDetailsLandAreaDialog",
  __ssrInlineRender: true,
  props: ["visible", "statuses"],
  async setup(__props) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    let __temp, __restore;
    const { visible, statuses } = __props;
    const { zonesDropdown } = storeToRefs(useZonesStore());
    const { currentLandArea } = storeToRefs(useLandAreasStore());
    const { paymentMethodsDropdown } = storeToRefs(usePaymentMethodsStore());
    const { getPaymentMethods } = usePaymentMethodsStore();
    [__temp, __restore] = withAsyncContext(() => getPaymentMethods()), await __temp, __restore();
    const myVisible = ref(visible);
    const zone = ref({
      name: (_b = (_a = zonesDropdown.value.filter(
        (zone2) => zone2["value"] == currentLandArea.value["zone_id"]
      )) == null ? void 0 : _a[0]) == null ? void 0 : _b["name"],
      value: (_d = (_c = zonesDropdown.value.filter(
        (zone2) => zone2["value"] == currentLandArea.value["zone_id"]
      )) == null ? void 0 : _c[0]) == null ? void 0 : _d["value"]
    });
    const landAreaDirection = ref(currentLandArea.value["land_direction"]);
    const isFront = ref(currentLandArea.value["is_front"]);
    const lat = ref(currentLandArea.value["lat"]);
    const long = ref(currentLandArea.value["long"]);
    const buildingArea = ref(0);
    const totalArea = ref(currentLandArea.value["total_area"]);
    const progress = ref(currentLandArea.value["progress"]);
    const numberOfFloor = ref(currentLandArea.value["number_of_floor"]);
    const numberOfRoom = ref(currentLandArea.value["number_of_room"]);
    const numberOfWC = ref(currentLandArea.value["number_of_wc"]);
    const price = ref(currentLandArea.value["price"]);
    ref(currentLandArea.value["owner"]);
    const buyStatus = ref({
      name: statuses.filter(
        (status) => status["value"] == currentLandArea.value["buy_status"]
      )[0]["name"],
      value: statuses.filter(
        (status) => status["value"] == currentLandArea.value["buy_status"]
      )[0]["value"]
    });
    const desc = ref(currentLandArea.value["desc"]);
    const paymentMethod = ref({
      name: (_f = (_e = paymentMethodsDropdown.value.filter(
        (payment) => payment["value"] == currentLandArea.value["payment_method_id"]
      )) == null ? void 0 : _e[0]) == null ? void 0 : _f["name"],
      value: (_h = (_g = paymentMethodsDropdown.value.filter(
        (payment) => payment["value"] == currentLandArea.value["payment_method_id"]
      )) == null ? void 0 : _g[0]) == null ? void 0 : _h["value"]
    });
    const createdAt = ref(currentLandArea.value["created_at"]);
    const updatedAt = ref(currentLandArea.value["updated_at"]);
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
            _push2(`<div class="inline-flex items-center justify-center gap-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>Land Area Details</span></div>`);
          } else {
            return [
              createVNode("div", { class: "inline-flex items-center justify-center gap-2" }, [
                createVNode("span", { class: "font-bold text-xl" }, "Land Area Details")
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
            _push2(`<template class="flex flex-col gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="zone"${_scopeId}>Zone</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "zone",
              placeholder: "Select Zone",
              modelValue: unref(zone).value,
              "onUpdate:modelValue": ($event) => unref(zone).value = $event,
              options: unref(zonesDropdown),
              optionLabel: "name",
              optionValue: "value",
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="desc"${_scopeId}>Name</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "desc",
              modelValue: unref(desc),
              "onUpdate:modelValue": ($event) => isRef(desc) ? desc.value = $event : null,
              placeholder: "Name",
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="isFront"${_scopeId}>Front</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "isFront",
              modelValue: unref(isFront),
              "onUpdate:modelValue": ($event) => isRef(isFront) ? isFront.value = $event : null,
              placeholder: "0m",
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="lat"${_scopeId}>Latitude</label>`);
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
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="landAreaDirection"${_scopeId}>Land Area Direction</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "landAreaDirection",
              placeholder: "Land Area Direction",
              modelValue: unref(landAreaDirection),
              "onUpdate:modelValue": ($event) => isRef(landAreaDirection) ? landAreaDirection.value = $event : null,
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="buildingArea"${_scopeId}>Building Area</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "buildingArea",
              mode: "decimal",
              modelValue: unref(buildingArea),
              "onUpdate:modelValue": ($event) => isRef(buildingArea) ? buildingArea.value = $event : null,
              min: 0,
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="numberOfFloor"${_scopeId}>Number Of Floor</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "numberOfFloor",
              mode: "decimal",
              modelValue: unref(numberOfFloor),
              "onUpdate:modelValue": ($event) => isRef(numberOfFloor) ? numberOfFloor.value = $event : null,
              min: 0,
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="numberOfRoom"${_scopeId}>Number Of Room</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "numberOfRoom",
              mode: "decimal",
              modelValue: unref(numberOfRoom),
              "onUpdate:modelValue": ($event) => isRef(numberOfRoom) ? numberOfRoom.value = $event : null,
              min: 0,
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="numberOfWC"${_scopeId}>Number Of WC</label>`);
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
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="buyStatus"${_scopeId}>Buy Status</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "buyStatus",
              placeholder: "Select Status",
              modelValue: unref(buyStatus).value,
              "onUpdate:modelValue": ($event) => unref(buyStatus).value = $event,
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
                  createVNode("label", { for: "zone" }, "Zone"),
                  createVNode(_component_Dropdown, {
                    id: "zone",
                    placeholder: "Select Zone",
                    modelValue: unref(zone).value,
                    "onUpdate:modelValue": ($event) => unref(zone).value = $event,
                    options: unref(zonesDropdown),
                    optionLabel: "name",
                    optionValue: "value",
                    disabled: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                ]),
                createVNode("div", { class: "flex gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "desc" }, "Name"),
                    createVNode(_component_InputText, {
                      id: "desc",
                      modelValue: unref(desc),
                      "onUpdate:modelValue": ($event) => isRef(desc) ? desc.value = $event : null,
                      placeholder: "Name",
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "isFront" }, "Front"),
                    createVNode(_component_InputText, {
                      id: "isFront",
                      modelValue: unref(isFront),
                      "onUpdate:modelValue": ($event) => isRef(isFront) ? isFront.value = $event : null,
                      placeholder: "0m",
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
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
                    createVNode("label", { for: "landAreaDirection" }, "Land Area Direction"),
                    createVNode(_component_InputText, {
                      id: "landAreaDirection",
                      placeholder: "Land Area Direction",
                      modelValue: unref(landAreaDirection),
                      "onUpdate:modelValue": ($event) => isRef(landAreaDirection) ? landAreaDirection.value = $event : null,
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "buildingArea" }, "Building Area"),
                    createVNode(_component_InputNumber, {
                      id: "buildingArea",
                      mode: "decimal",
                      modelValue: unref(buildingArea),
                      "onUpdate:modelValue": ($event) => isRef(buildingArea) ? buildingArea.value = $event : null,
                      min: 0,
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "numberOfFloor" }, "Number Of Floor"),
                    createVNode(_component_InputNumber, {
                      id: "numberOfFloor",
                      mode: "decimal",
                      modelValue: unref(numberOfFloor),
                      "onUpdate:modelValue": ($event) => isRef(numberOfFloor) ? numberOfFloor.value = $event : null,
                      min: 0,
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "numberOfRoom" }, "Number Of Room"),
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
                    createVNode("label", { for: "numberOfWC" }, "Number Of WC"),
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
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "buyStatus" }, "Buy Status"),
                    createVNode(_component_Dropdown, {
                      id: "buyStatus",
                      placeholder: "Select Status",
                      modelValue: unref(buyStatus).value,
                      "onUpdate:modelValue": ($event) => unref(buyStatus).value = $event,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/land_area/ViewDetailsLandAreaDialog.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "CreateLandAreaDialog",
  __ssrInlineRender: true,
  props: ["visible", "statuses"],
  async setup(__props) {
    let __temp, __restore;
    const { visible, statuses } = __props;
    const { zones, zonesDropdown } = storeToRefs(useZonesStore());
    const { addNewLandArea } = useLandAreasStore();
    const { paymentMethodsDropdown } = storeToRefs(usePaymentMethodsStore());
    const { getPaymentMethods } = usePaymentMethodsStore();
    const toast = useToast();
    [__temp, __restore] = withAsyncContext(() => getPaymentMethods()), await __temp, __restore();
    const myVisible = ref(visible);
    const zone = ref(0);
    const landAreaDirection = ref("");
    const isFront = ref("");
    const lat = ref(0);
    const long = ref(0);
    const buildingArea = ref(0);
    const totalArea = ref(0);
    const progress = ref(0);
    const numberOfFloor = ref(0);
    const numberOfRoom = ref(0);
    const numberOfWC = ref(0);
    const price = ref(0);
    const owner = ref(0);
    const buyStatus = ref({});
    const desc = ref("");
    const paymentMethod = ref(0);
    const onSave = async () => {
      const newLandAreaData = {
        id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1,
        zone_id: parseInt(zone.value),
        land_direction: landAreaDirection.value,
        is_front: isFront.value,
        lat: parseInt(lat.value),
        long: parseInt(long.value),
        building_area: parseInt(buildingArea.value),
        total_area: parseInt(totalArea.value),
        progress: parseInt(progress.value),
        number_of_floor: parseInt(numberOfFloor.value),
        number_of_room: parseInt(numberOfRoom.value),
        number_of_wc: parseInt(numberOfWC.value),
        price: parseInt(price.value),
        owner: parseInt(owner.value),
        buy_status: buyStatus.value,
        desc: desc.value,
        payment_method_id: parseInt(paymentMethod.value),
        deleted: "true",
        created_by: 13,
        updated_by: 13,
        created_at: (/* @__PURE__ */ new Date()).toLocaleString(),
        updated_at: null
      };
      const response = await addNewLandArea(newLandAreaData);
      myVisible.value = false;
      if (response != null && response["result"] == "ok") {
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Create New Land Area Successfully!",
          group: "bl",
          life: 3e3
        });
      } else {
        toast.add({
          severity: "danger",
          summary: "Error",
          detail: "Failed to Create New Land Area",
          group: "bl",
          life: 3e3
        });
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
            _push2(`<div class="inline-flex items-center justify-center gap-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>Create New Land Area</span></div>`);
          } else {
            return [
              createVNode("div", { class: "inline-flex items-center justify-center gap-2" }, [
                createVNode("span", { class: "font-bold text-xl" }, "Create New Land Area")
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
            _push2(`<template class="flex flex-col gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="zone"${_scopeId}>Zone</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "zone",
              placeholder: "Select Zone",
              modelValue: unref(zone),
              "onUpdate:modelValue": ($event) => isRef(zone) ? zone.value = $event : null,
              options: unref(zonesDropdown),
              optionLabel: "name",
              optionValue: "value"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="desc"${_scopeId}>Name</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "desc",
              modelValue: unref(desc),
              "onUpdate:modelValue": ($event) => isRef(desc) ? desc.value = $event : null,
              placeholder: "Name"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="isFront"${_scopeId}>Front</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "isFront",
              modelValue: unref(isFront),
              "onUpdate:modelValue": ($event) => isRef(isFront) ? isFront.value = $event : null,
              placeholder: "0m"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="lat"${_scopeId}>Latitude</label>`);
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
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="landAreaDirection"${_scopeId}>Land Area Direction</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "landAreaDirection",
              placeholder: "Land Area Direction",
              modelValue: unref(landAreaDirection),
              "onUpdate:modelValue": ($event) => isRef(landAreaDirection) ? landAreaDirection.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="buildingArea"${_scopeId}>Building Area</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "buildingArea",
              mode: "decimal",
              modelValue: unref(buildingArea),
              "onUpdate:modelValue": ($event) => isRef(buildingArea) ? buildingArea.value = $event : null,
              min: 0
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="numberOfFloor"${_scopeId}>Number Of Floor</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "numberOfFloor",
              mode: "decimal",
              modelValue: unref(numberOfFloor),
              "onUpdate:modelValue": ($event) => isRef(numberOfFloor) ? numberOfFloor.value = $event : null,
              min: 0
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="numberOfRoom"${_scopeId}>Number Of Room</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "numberOfRoom",
              mode: "decimal",
              modelValue: unref(numberOfRoom),
              "onUpdate:modelValue": ($event) => isRef(numberOfRoom) ? numberOfRoom.value = $event : null,
              min: 0
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="numberOfWC"${_scopeId}>Number Of WC</label>`);
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
              placeholder: "Select Status",
              modelValue: unref(buyStatus),
              "onUpdate:modelValue": ($event) => isRef(buyStatus) ? buyStatus.value = $event : null,
              options: __props.statuses,
              optionLabel: "name",
              optionValue: "value"
            }, null, _parent2, _scopeId));
            _push2(`</div></div></template>`);
          } else {
            return [
              createVNode("template", { class: "flex flex-col gap-3" }, [
                createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                  createVNode("label", { for: "zone" }, "Zone"),
                  createVNode(_component_Dropdown, {
                    id: "zone",
                    placeholder: "Select Zone",
                    modelValue: unref(zone),
                    "onUpdate:modelValue": ($event) => isRef(zone) ? zone.value = $event : null,
                    options: unref(zonesDropdown),
                    optionLabel: "name",
                    optionValue: "value"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                ]),
                createVNode("div", { class: "flex gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "desc" }, "Name"),
                    createVNode(_component_InputText, {
                      id: "desc",
                      modelValue: unref(desc),
                      "onUpdate:modelValue": ($event) => isRef(desc) ? desc.value = $event : null,
                      placeholder: "Name"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "isFront" }, "Front"),
                    createVNode(_component_InputText, {
                      id: "isFront",
                      modelValue: unref(isFront),
                      "onUpdate:modelValue": ($event) => isRef(isFront) ? isFront.value = $event : null,
                      placeholder: "0m"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
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
                    createVNode("label", { for: "landAreaDirection" }, "Land Area Direction"),
                    createVNode(_component_InputText, {
                      id: "landAreaDirection",
                      placeholder: "Land Area Direction",
                      modelValue: unref(landAreaDirection),
                      "onUpdate:modelValue": ($event) => isRef(landAreaDirection) ? landAreaDirection.value = $event : null
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "buildingArea" }, "Building Area"),
                    createVNode(_component_InputNumber, {
                      id: "buildingArea",
                      mode: "decimal",
                      modelValue: unref(buildingArea),
                      "onUpdate:modelValue": ($event) => isRef(buildingArea) ? buildingArea.value = $event : null,
                      min: 0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "numberOfFloor" }, "Number Of Floor"),
                    createVNode(_component_InputNumber, {
                      id: "numberOfFloor",
                      mode: "decimal",
                      modelValue: unref(numberOfFloor),
                      "onUpdate:modelValue": ($event) => isRef(numberOfFloor) ? numberOfFloor.value = $event : null,
                      min: 0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "numberOfRoom" }, "Number Of Room"),
                    createVNode(_component_InputNumber, {
                      id: "numberOfRoom",
                      mode: "decimal",
                      modelValue: unref(numberOfRoom),
                      "onUpdate:modelValue": ($event) => isRef(numberOfRoom) ? numberOfRoom.value = $event : null,
                      min: 0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "numberOfWC" }, "Number Of WC"),
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
                      placeholder: "Select Status",
                      modelValue: unref(buyStatus),
                      "onUpdate:modelValue": ($event) => isRef(buyStatus) ? buyStatus.value = $event : null,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/land_area/CreateLandAreaDialog.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "EditLandAreaDialog",
  __ssrInlineRender: true,
  props: ["visible", "statuses"],
  async setup(__props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
    let __temp, __restore;
    const { visible, statuses } = __props;
    const { zones, zonesDropdown } = storeToRefs(useZonesStore());
    const { currentLandArea } = storeToRefs(useLandAreasStore());
    const { editLandArea } = useLandAreasStore();
    const { paymentMethodsDropdown } = storeToRefs(usePaymentMethodsStore());
    const { getPaymentMethods } = usePaymentMethodsStore();
    const toast = useToast();
    [__temp, __restore] = withAsyncContext(() => getPaymentMethods()), await __temp, __restore();
    const myVisible = ref(visible);
    const zone = ref(
      (_b = (_a = zonesDropdown.value.filter(
        (zone2) => zone2["value"] == currentLandArea.value["zone_id"]
      )) == null ? void 0 : _a[0]) == null ? void 0 : _b["value"]
    );
    const landAreaDirection = ref(currentLandArea.value["land_direction"]);
    const isFront = ref(currentLandArea.value["is_front"]);
    const lat = ref(currentLandArea.value["lat"]);
    const long = ref(currentLandArea.value["long"]);
    const buildingArea = ref(0);
    const totalArea = ref(currentLandArea.value["total_area"]);
    const progress = ref(currentLandArea.value["progress"]);
    const numberOfFloor = ref(currentLandArea.value["number_of_floor"]);
    const numberOfRoom = ref(currentLandArea.value["number_of_room"]);
    const numberOfWC = ref(currentLandArea.value["number_of_wc"]);
    const price = ref(currentLandArea.value["price"]);
    const owner = ref(currentLandArea.value["owner"]);
    const buyStatus = ref({
      name: (_d = (_c = statuses.filter(
        (status) => status["value"] == currentLandArea.value["buy_status"]
      )) == null ? void 0 : _c[0]) == null ? void 0 : _d["name"],
      value: (_f = (_e = statuses.filter(
        (status) => status["value"] == currentLandArea.value["buy_status"]
      )) == null ? void 0 : _e[0]) == null ? void 0 : _f["value"]
    });
    const desc = ref(currentLandArea.value["desc"]);
    const paymentMethod = ref({
      name: (_h = (_g = paymentMethodsDropdown.value.filter(
        (payment) => payment["value"] == currentLandArea.value["payment_method_id"]
      )) == null ? void 0 : _g[0]) == null ? void 0 : _h["name"],
      value: (_j = (_i = paymentMethodsDropdown.value.filter(
        (payment) => payment["value"] == currentLandArea.value["payment_method_id"]
      )) == null ? void 0 : _i[0]) == null ? void 0 : _j["value"]
    });
    const createdAt = ref(currentLandArea.value["created_at"]);
    const updatedAt = ref(currentLandArea.value["updated_at"]);
    const onSave = async () => {
      const newLandAreaData = {
        ...currentLandArea.value,
        zone_id: parseInt(zone.value),
        land_direction: landAreaDirection.value,
        is_front: isFront.value,
        lat: parseInt(lat.value),
        long: parseInt(long.value),
        building_area: parseInt(buildingArea.value),
        total_area: parseInt(totalArea.value),
        progress: parseInt(progress.value),
        number_of_floor: parseInt(numberOfFloor.value),
        number_of_room: parseInt(numberOfRoom.value),
        number_of_wc: parseInt(numberOfWC.value),
        price: parseInt(price.value),
        owner: parseInt(owner.value),
        buy_status: buyStatus.value.value,
        desc: desc.value,
        payment_method_id: parseInt(paymentMethod.value),
        updated_at: (/* @__PURE__ */ new Date()).toLocaleString()
      };
      const response = await editLandArea(newLandAreaData);
      myVisible.value = false;
      if (response != null && response["result"] == "ok") {
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Edit Land Area Successfully!",
          group: "bl",
          life: 3e3
        });
      } else {
        toast.add({
          severity: "danger",
          summary: "Error",
          detail: "Failed to Edit Land Area",
          group: "bl",
          life: 3e3
        });
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
            _push2(`<div class="inline-flex items-center justify-center gap-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>Land Area Details</span></div>`);
          } else {
            return [
              createVNode("div", { class: "inline-flex items-center justify-center gap-2" }, [
                createVNode("span", { class: "font-bold text-xl" }, "Land Area Details")
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
            _push2(`<template class="flex flex-col gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="zone"${_scopeId}>Zone</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "zone",
              placeholder: "Select Zone",
              modelValue: unref(zone),
              "onUpdate:modelValue": ($event) => isRef(zone) ? zone.value = $event : null,
              options: unref(zonesDropdown),
              optionLabel: "name",
              optionValue: "value"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="desc"${_scopeId}>Name</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "desc",
              modelValue: unref(desc),
              "onUpdate:modelValue": ($event) => isRef(desc) ? desc.value = $event : null,
              placeholder: "Name"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="isFront"${_scopeId}>Front</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "isFront",
              modelValue: unref(isFront),
              "onUpdate:modelValue": ($event) => isRef(isFront) ? isFront.value = $event : null,
              placeholder: "0m"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="lat"${_scopeId}>Latitude</label>`);
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
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="landAreaDirection"${_scopeId}>Land Area Direction</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "landAreaDirection",
              placeholder: "Land Area Direction",
              modelValue: unref(landAreaDirection),
              "onUpdate:modelValue": ($event) => isRef(landAreaDirection) ? landAreaDirection.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="buildingArea"${_scopeId}>Building Area</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "buildingArea",
              mode: "decimal",
              modelValue: unref(buildingArea),
              "onUpdate:modelValue": ($event) => isRef(buildingArea) ? buildingArea.value = $event : null,
              min: 0
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="numberOfFloor"${_scopeId}>Number Of Floor</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "numberOfFloor",
              mode: "decimal",
              modelValue: unref(numberOfFloor),
              "onUpdate:modelValue": ($event) => isRef(numberOfFloor) ? numberOfFloor.value = $event : null,
              min: 0
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="numberOfRoom"${_scopeId}>Number Of Room</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "numberOfRoom",
              mode: "decimal",
              modelValue: unref(numberOfRoom),
              "onUpdate:modelValue": ($event) => isRef(numberOfRoom) ? numberOfRoom.value = $event : null,
              min: 0
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="numberOfWC"${_scopeId}>Number Of WC</label>`);
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
              placeholder: "Select Status",
              modelValue: unref(buyStatus).value,
              "onUpdate:modelValue": ($event) => unref(buyStatus).value = $event,
              options: __props.statuses,
              optionLabel: "name",
              optionValue: "value"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-row gap-3 justify-between"${_scopeId}><span class="text-xs text-gray-400"${_scopeId}> Created at: ${ssrInterpolate(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(createdAt)))}</span><span class="text-xs text-gray-400"${_scopeId}> Updated at: ${ssrInterpolate(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(updatedAt)))}</span></div></template>`);
          } else {
            return [
              createVNode("template", { class: "flex flex-col gap-3" }, [
                createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                  createVNode("label", { for: "zone" }, "Zone"),
                  createVNode(_component_Dropdown, {
                    id: "zone",
                    placeholder: "Select Zone",
                    modelValue: unref(zone),
                    "onUpdate:modelValue": ($event) => isRef(zone) ? zone.value = $event : null,
                    options: unref(zonesDropdown),
                    optionLabel: "name",
                    optionValue: "value"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                ]),
                createVNode("div", { class: "flex gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "desc" }, "Name"),
                    createVNode(_component_InputText, {
                      id: "desc",
                      modelValue: unref(desc),
                      "onUpdate:modelValue": ($event) => isRef(desc) ? desc.value = $event : null,
                      placeholder: "Name"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "isFront" }, "Front"),
                    createVNode(_component_InputText, {
                      id: "isFront",
                      modelValue: unref(isFront),
                      "onUpdate:modelValue": ($event) => isRef(isFront) ? isFront.value = $event : null,
                      placeholder: "0m"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
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
                    createVNode("label", { for: "landAreaDirection" }, "Land Area Direction"),
                    createVNode(_component_InputText, {
                      id: "landAreaDirection",
                      placeholder: "Land Area Direction",
                      modelValue: unref(landAreaDirection),
                      "onUpdate:modelValue": ($event) => isRef(landAreaDirection) ? landAreaDirection.value = $event : null
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "buildingArea" }, "Building Area"),
                    createVNode(_component_InputNumber, {
                      id: "buildingArea",
                      mode: "decimal",
                      modelValue: unref(buildingArea),
                      "onUpdate:modelValue": ($event) => isRef(buildingArea) ? buildingArea.value = $event : null,
                      min: 0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "numberOfFloor" }, "Number Of Floor"),
                    createVNode(_component_InputNumber, {
                      id: "numberOfFloor",
                      mode: "decimal",
                      modelValue: unref(numberOfFloor),
                      "onUpdate:modelValue": ($event) => isRef(numberOfFloor) ? numberOfFloor.value = $event : null,
                      min: 0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "numberOfRoom" }, "Number Of Room"),
                    createVNode(_component_InputNumber, {
                      id: "numberOfRoom",
                      mode: "decimal",
                      modelValue: unref(numberOfRoom),
                      "onUpdate:modelValue": ($event) => isRef(numberOfRoom) ? numberOfRoom.value = $event : null,
                      min: 0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "numberOfWC" }, "Number Of WC"),
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
                      placeholder: "Select Status",
                      modelValue: unref(buyStatus).value,
                      "onUpdate:modelValue": ($event) => unref(buyStatus).value = $event,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/land_area/EditLandAreaDialog.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "DeleteLandAreaDialog",
  __ssrInlineRender: true,
  props: ["visible"],
  setup(__props) {
    const { visible } = __props;
    const { currentLandArea } = storeToRefs(useLandAreasStore());
    const { deleteLandArea } = useLandAreasStore();
    const toast = useToast();
    const myVisible = ref(visible);
    const onDelete = async () => {
      const response = await deleteLandArea(currentLandArea.value);
      myVisible.value = false;
      if (response != null && response["result"] == "ok") {
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Delete Land Area Successfully!",
          group: "bl",
          life: 3e3
        });
      } else {
        toast.add({
          severity: "danger",
          summary: "Error",
          detail: "Failed to Delete Land Area",
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
            _push2(`<div class="inline-flex items-center justify-center gap-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>Delete Land Area?</span></div>`);
          } else {
            return [
              createVNode("div", { class: "inline-flex items-center justify-center gap-2" }, [
                createVNode("span", { class: "font-bold text-xl" }, "Delete Land Area?")
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
            _push2(`<div${_scopeId}><span${_scopeId}> This will delete land area <b${_scopeId}>${ssrInterpolate(unref(currentLandArea)["desc"])}</b> permanently! </span><span${_scopeId}>You cannot undo this action!</span></div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode("span", null, [
                  createTextVNode(" This will delete land area "),
                  createVNode("b", null, toDisplayString(unref(currentLandArea)["desc"]), 1),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/land_area/DeleteLandAreaDialog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main$3 as _,
  _sfc_main$2 as a,
  _sfc_main$1 as b,
  _sfc_main as c
};
//# sourceMappingURL=DeleteLandAreaDialog-BIhb7oe3.js.map
