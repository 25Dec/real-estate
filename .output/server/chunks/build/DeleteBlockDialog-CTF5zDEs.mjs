import script from './dialog.esm-Wemb0g_v.mjs';
import script$1 from './dropdown.esm-BZz-eegH.mjs';
import script$2 from './inputtext.esm-Blvd_dSV.mjs';
import script$3 from './inputnumber.esm-CMvh_h4P.mjs';
import script$4 from './calendar.esm-iTjSyI1e.mjs';
import script$5 from './inputswitch.esm-QEGDpbo-.mjs';
import script$6 from './button.esm-D8sVcJb8.mjs';
import { ref, mergeProps, unref, isRef, withCtx, createVNode, toDisplayString, useSSRContext, createTextVNode } from 'vue';
import { s as storeToRefs, u as useToast } from './server.mjs';
import { u as useZonesStore } from './zones-store-DDylndqA.mjs';
import { u as useBlocksStore } from './blocks-store-CY-29APJ.mjs';
import { g as getYearMonthDay, a as convertDateTime } from './core_utils-WJ_cJnbk.mjs';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main$3 = {
  __name: "ViewDetailsBlockDialog",
  __ssrInlineRender: true,
  props: ["visible", "types"],
  setup(__props) {
    var _a2;
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
    const { visible, types } = __props;
    const { zones } = storeToRefs(useZonesStore());
    const { blocks, currentBlock } = storeToRefs(useBlocksStore());
    zones.value = zones.value.map((zone2) => {
      return { id: zone2.id, name: `${zone2.name}`, value: `${zone2.id}` };
    });
    const myVisible = ref(visible);
    const currentZone = ref({
      name: (_b = (_a = zones.value.filter(
        (zone2) => zone2["id"] == currentBlock.value["zone_id"]
      )) == null ? void 0 : _a[0]) == null ? void 0 : _b["name"],
      value: (_a2 = (_d = (_c = zones.value.filter(
        (zone2) => zone2["id"] == currentBlock.value["zone_id"]
      )) == null ? void 0 : _c[0]) == null ? void 0 : _d["value"]) != null ? _a2 : (_f = (_e = zones.value.filter(
        (zone2) => zone2["id"] == currentBlock.value["zone_id"]
      )) == null ? void 0 : _e[0]) == null ? void 0 : _f["id"]
    });
    const numberOfFloor = ref(currentBlock.value["number_of_floor"]);
    const lat = ref(currentBlock.value["lat"]);
    const long = ref(currentBlock.value["long"]);
    const isService = ref(
      currentBlock.value["is_service"] == "true" ? true : false
    );
    const desc = ref(currentBlock.value["desc"]);
    const type = ref({
      name: (_h = (_g = types.filter(
        (type2) => type2["value"] == currentBlock.value["type"]
      )) == null ? void 0 : _g[0]) == null ? void 0 : _h["name"],
      value: (_j = (_i = types.filter(
        (type2) => type2["value"] == currentBlock.value["type"]
      )) == null ? void 0 : _i[0]) == null ? void 0 : _j["value"]
    });
    const progress = ref(currentBlock.value["progress"]);
    const startedDay = ref(getYearMonthDay(currentBlock.value["started_day"]));
    const createdAt = ref(currentBlock.value["created_at"]);
    const updatedAt = ref(currentBlock.value["updated_at"]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script;
      const _component_Dropdown = script$1;
      const _component_InputText = script$2;
      const _component_InputNumber = script$3;
      const _component_Calendar = script$4;
      const _component_InputSwitch = script$5;
      const _component_Button = script$6;
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
            _push2(`<div class="inline-flex items-center justify-center gap-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>Block Details</span></div>`);
          } else {
            return [
              createVNode("div", { class: "inline-flex items-center justify-center gap-2" }, [
                createVNode("span", { class: "font-bold text-xl" }, "Block Details")
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
              modelValue: unref(currentZone).value,
              "onUpdate:modelValue": ($event) => unref(currentZone).value = $event,
              options: unref(zones),
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
              modelValue: unref(lat),
              "onUpdate:modelValue": ($event) => isRef(lat) ? lat.value = $event : null,
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="long"${_scopeId}>Longitude</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "long",
              modelValue: unref(long),
              "onUpdate:modelValue": ($event) => isRef(long) ? long.value = $event : null,
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="type"${_scopeId}>Type</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "type",
              placeholder: "Select Type",
              modelValue: unref(type).value,
              "onUpdate:modelValue": ($event) => unref(type).value = $event,
              options: __props.types,
              optionLabel: "name",
              optionValue: "value",
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="numberOfFloor"${_scopeId}>Number of floor</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "numberOfFloor",
              modelValue: unref(numberOfFloor),
              "onUpdate:modelValue": ($event) => isRef(numberOfFloor) ? numberOfFloor.value = $event : null,
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="progress"${_scopeId}>Progress</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "progress",
              modelValue: unref(progress),
              "onUpdate:modelValue": ($event) => isRef(progress) ? progress.value = $event : null,
              mode: "decimal",
              prefix: "%",
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="startedDay"${_scopeId}>Started Day</label>`);
            _push2(ssrRenderComponent(_component_Calendar, {
              modelValue: unref(startedDay),
              "onUpdate:modelValue": ($event) => isRef(startedDay) ? startedDay.value = $event : null,
              showIcon: "",
              iconDisplay: "input",
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-1 flex-col gap-2 items-end"${_scopeId}><label for="isService"${_scopeId}>Is Service</label>`);
            _push2(ssrRenderComponent(_component_InputSwitch, {
              id: "isService",
              modelValue: unref(isService),
              "onUpdate:modelValue": ($event) => isRef(isService) ? isService.value = $event : null,
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-row gap-3 justify-between"${_scopeId}><span class="text-xs text-gray-400"${_scopeId}> Created at: ${ssrInterpolate(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(createdAt)))}</span><span class="text-xs text-gray-400"${_scopeId}> Updated at: ${ssrInterpolate(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(updatedAt)))}</span></div></template>`);
          } else {
            return [
              createVNode("template", { class: "flex flex-col gap-3" }, [
                createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                  createVNode("label", { for: "zone" }, "Zone"),
                  createVNode(_component_Dropdown, {
                    id: "zone",
                    placeholder: "Select Zone",
                    modelValue: unref(currentZone).value,
                    "onUpdate:modelValue": ($event) => unref(currentZone).value = $event,
                    options: unref(zones),
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
                      modelValue: unref(lat),
                      "onUpdate:modelValue": ($event) => isRef(lat) ? lat.value = $event : null,
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "long" }, "Longitude"),
                    createVNode(_component_InputNumber, {
                      id: "long",
                      modelValue: unref(long),
                      "onUpdate:modelValue": ($event) => isRef(long) ? long.value = $event : null,
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                  createVNode("label", { for: "type" }, "Type"),
                  createVNode(_component_Dropdown, {
                    id: "type",
                    placeholder: "Select Type",
                    modelValue: unref(type).value,
                    "onUpdate:modelValue": ($event) => unref(type).value = $event,
                    options: __props.types,
                    optionLabel: "name",
                    optionValue: "value",
                    disabled: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                ]),
                createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                  createVNode("label", { for: "numberOfFloor" }, "Number of floor"),
                  createVNode(_component_InputNumber, {
                    id: "numberOfFloor",
                    modelValue: unref(numberOfFloor),
                    "onUpdate:modelValue": ($event) => isRef(numberOfFloor) ? numberOfFloor.value = $event : null,
                    disabled: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "startedDay" }, "Started Day"),
                    createVNode(_component_Calendar, {
                      modelValue: unref(startedDay),
                      "onUpdate:modelValue": ($event) => isRef(startedDay) ? startedDay.value = $event : null,
                      showIcon: "",
                      iconDisplay: "input",
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-1 flex-col gap-2 items-end" }, [
                  createVNode("label", { for: "isService" }, "Is Service"),
                  createVNode(_component_InputSwitch, {
                    id: "isService",
                    modelValue: unref(isService),
                    "onUpdate:modelValue": ($event) => isRef(isService) ? isService.value = $event : null,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/block/ViewDetailsBlockDialog.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "CreateBlockDialog",
  __ssrInlineRender: true,
  props: ["visible", "types"],
  setup(__props) {
    var _a2, _b2, _c2, _d2;
    var _a, _b, _c, _d, _e, _f;
    const { visible, types } = __props;
    const { zones } = storeToRefs(useZonesStore());
    const { addNewBlock } = useBlocksStore();
    const myVisible = ref(visible);
    const toast = useToast();
    const zone2 = ref({
      name: (_a2 = (_a = zones.value[0]) == null ? void 0 : _a.name) != null ? _a2 : "",
      value: (_b2 = (_b = zones.value[0]) == null ? void 0 : _b.value) != null ? _b2 : ""
    });
    const numberOfFloor = ref(0);
    const lat = ref(0);
    const long = ref(0);
    const isService = ref(false);
    const desc = ref("");
    const type = ref({
      name: (_c2 = (_d = (_c = types.value) == null ? void 0 : _c[0]) == null ? void 0 : _d.name) != null ? _c2 : "",
      value: (_d2 = (_f = (_e = types.value) == null ? void 0 : _e[0]) == null ? void 0 : _f.value) != null ? _d2 : ""
    });
    const progress = ref(0);
    const startedDay = ref("");
    const onSave = async () => {
      const newBlockData = {
        id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1,
        zone_id: parseInt(zone2.value.value),
        number_of_floor: parseInt(numberOfFloor.value),
        lat: parseInt(lat.value),
        long: parseInt(long.value),
        is_service: isService.value == 1 ? "true" : "false",
        desc: desc.value,
        type: type.value.value,
        progress: parseInt(progress.value),
        started_day: startedDay.value,
        deleted: "false",
        created_by: 46,
        updated_by: 46,
        created_at: (/* @__PURE__ */ new Date()).toLocaleString(),
        updated_at: null
      };
      const response = await addNewBlock(newBlockData);
      myVisible.value = false;
      if (response != null && response["result"] == "ok") {
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Create New Block Successfully!",
          group: "bl",
          life: 3e3
        });
      } else {
        toast.add({
          severity: "danger",
          summary: "Error",
          detail: "Failed to Create New Block",
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
      const _component_Calendar = script$4;
      const _component_InputSwitch = script$5;
      const _component_Button = script$6;
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
            _push2(`<div class="inline-flex items-center justify-center gap-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>Create New Block</span></div>`);
          } else {
            return [
              createVNode("div", { class: "inline-flex items-center justify-center gap-2" }, [
                createVNode("span", { class: "font-bold text-xl" }, "Create New Block")
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
              modelValue: unref(zone2).value,
              "onUpdate:modelValue": ($event) => unref(zone2).value = $event,
              options: unref(zones),
              optionLabel: "name",
              optionValue: "value"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="desc"${_scopeId}>Name</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "desc",
              placeholder: "Name",
              modelValue: unref(desc),
              "onUpdate:modelValue": ($event) => isRef(desc) ? desc.value = $event : null,
              modelModifiers: { trim: true }
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
            _push2(`</div></div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="type"${_scopeId}>Type</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "type",
              placeholder: "Select Type",
              modelValue: unref(type).value,
              "onUpdate:modelValue": ($event) => unref(type).value = $event,
              options: __props.types,
              optionLabel: "name",
              optionValue: "value"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="numberOfFloor"${_scopeId}>Number Of Floor</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "numberOfFloor",
              mode: "decimal",
              modelValue: unref(numberOfFloor),
              "onUpdate:modelValue": ($event) => isRef(numberOfFloor) ? numberOfFloor.value = $event : null,
              min: 0
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="progress"${_scopeId}>Progress</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "progress",
              modelValue: unref(progress),
              "onUpdate:modelValue": ($event) => isRef(progress) ? progress.value = $event : null,
              mode: "decimal",
              prefix: "%",
              min: 0,
              max: 100
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="startedDay"${_scopeId}>Started Day</label>`);
            _push2(ssrRenderComponent(_component_Calendar, {
              modelValue: unref(startedDay),
              "onUpdate:modelValue": ($event) => isRef(startedDay) ? startedDay.value = $event : null,
              showIcon: "",
              iconDisplay: "input"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-1 flex-col gap-2 items-end"${_scopeId}><label for="isService"${_scopeId}>Is Service</label>`);
            _push2(ssrRenderComponent(_component_InputSwitch, {
              id: "isService",
              modelValue: unref(isService),
              "onUpdate:modelValue": ($event) => isRef(isService) ? isService.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(`</div></template>`);
          } else {
            return [
              createVNode("template", { class: "flex flex-col gap-3" }, [
                createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                  createVNode("label", { for: "zone" }, "Zone"),
                  createVNode(_component_Dropdown, {
                    id: "zone",
                    placeholder: "Select Zone",
                    modelValue: unref(zone2).value,
                    "onUpdate:modelValue": ($event) => unref(zone2).value = $event,
                    options: unref(zones),
                    optionLabel: "name",
                    optionValue: "value"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                ]),
                createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                  createVNode("label", { for: "desc" }, "Name"),
                  createVNode(_component_InputText, {
                    id: "desc",
                    placeholder: "Name",
                    modelValue: unref(desc),
                    "onUpdate:modelValue": ($event) => isRef(desc) ? desc.value = $event : null,
                    modelModifiers: { trim: true }
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
                createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                  createVNode("label", { for: "type" }, "Type"),
                  createVNode(_component_Dropdown, {
                    id: "type",
                    placeholder: "Select Type",
                    modelValue: unref(type).value,
                    "onUpdate:modelValue": ($event) => unref(type).value = $event,
                    options: __props.types,
                    optionLabel: "name",
                    optionValue: "value"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
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
                    createVNode("label", { for: "startedDay" }, "Started Day"),
                    createVNode(_component_Calendar, {
                      modelValue: unref(startedDay),
                      "onUpdate:modelValue": ($event) => isRef(startedDay) ? startedDay.value = $event : null,
                      showIcon: "",
                      iconDisplay: "input"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-1 flex-col gap-2 items-end" }, [
                  createVNode("label", { for: "isService" }, "Is Service"),
                  createVNode(_component_InputSwitch, {
                    id: "isService",
                    modelValue: unref(isService),
                    "onUpdate:modelValue": ($event) => isRef(isService) ? isService.value = $event : null
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/block/CreateBlockDialog.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "EditBlockDialog",
  __ssrInlineRender: true,
  props: ["visible", "types"],
  setup(__props) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const { visible, types } = __props;
    const { zones } = storeToRefs(useZonesStore());
    const { currentBlock } = storeToRefs(useBlocksStore());
    const { editBlock } = useBlocksStore();
    const toast = useToast();
    const myVisible = ref(visible);
    const currentZone = ref({
      name: (_b = (_a = zones.value.filter(
        (zone2) => zone2["id"] == currentBlock.value["zone_id"]
      )) == null ? void 0 : _a[0]) == null ? void 0 : _b["name"],
      value: (_d = (_c = zones.value.filter(
        (zone2) => zone2["id"] == currentBlock.value["zone_id"]
      )) == null ? void 0 : _c[0]) == null ? void 0 : _d["value"]
    });
    const numberOfFloor = ref(currentBlock.value["number_of_floor"]);
    const lat = ref(currentBlock.value["lat"]);
    const long = ref(currentBlock.value["long"]);
    const isService = ref(
      currentBlock.value["is_service"] == "true" ? true : false
    );
    const desc = ref(currentBlock.value["desc"]);
    const type = ref({
      name: (_f = (_e = types.filter(
        (type2) => type2["value"] == currentBlock.value["type"]
      )) == null ? void 0 : _e[0]) == null ? void 0 : _f["name"],
      value: (_h = (_g = types.filter(
        (type2) => type2["value"] == currentBlock.value["type"]
      )) == null ? void 0 : _g[0]) == null ? void 0 : _h["value"]
    });
    const progress = ref(currentBlock.value["progress"]);
    const startedDay = ref(getYearMonthDay(currentBlock.value["started_day"]));
    const createdAt = ref(currentBlock.value["created_at"]);
    const updatedAt = ref(currentBlock.value["updated_at"]);
    const onSave = async () => {
      const newBlockData = {
        ...currentBlock.value,
        zone_id: parseInt(zone.value.value),
        number_of_floor: parseInt(numberOfFloor.value),
        lat: parseInt(lat.value),
        long: parseInt(long.value),
        is_service: isService.value == 1 ? true : false,
        desc: desc.value,
        type: type.value.value,
        progress: parseInt(progress.value),
        started_day: startedDay.value,
        updated_at: (/* @__PURE__ */ new Date()).toLocaleString()
      };
      const response = await editBlock(newBlockData);
      myVisible.value = false;
      if (response != null && response["result"] == "ok") {
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Edit New Block Successfully!",
          group: "bl",
          life: 3e3
        });
      } else {
        toast.add({
          severity: "danger",
          summary: "Error",
          detail: "Failed to Edit New Block",
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
      const _component_Calendar = script$4;
      const _component_InputSwitch = script$5;
      const _component_Button = script$6;
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
            _push2(`<div class="inline-flex items-center justify-center gap-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>Block Details</span></div>`);
          } else {
            return [
              createVNode("div", { class: "inline-flex items-center justify-center gap-2" }, [
                createVNode("span", { class: "font-bold text-xl" }, "Block Details")
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
              modelValue: unref(currentZone).value,
              "onUpdate:modelValue": ($event) => unref(currentZone).value = $event,
              options: unref(zones),
              optionLabel: "name",
              optionValue: "value"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="desc"${_scopeId}>Name</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "desc",
              placeholder: "Name",
              modelValue: unref(desc),
              "onUpdate:modelValue": ($event) => isRef(desc) ? desc.value = $event : null
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
            _push2(`</div></div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="type"${_scopeId}>Type</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "type",
              placeholder: "Select Type",
              modelValue: unref(type).value,
              "onUpdate:modelValue": ($event) => unref(type).value = $event,
              options: __props.types,
              optionLabel: "name",
              optionValue: "value"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="numberOfFloor"${_scopeId}>Number of Floor</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "numberOfFloor",
              mode: "decimal",
              modelValue: unref(numberOfFloor),
              "onUpdate:modelValue": ($event) => isRef(numberOfFloor) ? numberOfFloor.value = $event : null,
              min: 0
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="progress"${_scopeId}>Progress</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "progress",
              modelValue: unref(progress),
              "onUpdate:modelValue": ($event) => isRef(progress) ? progress.value = $event : null,
              mode: "decimal",
              prefix: "%",
              min: 0,
              max: 100
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="startedDay"${_scopeId}>Started Day</label>`);
            _push2(ssrRenderComponent(_component_Calendar, {
              modelValue: unref(startedDay),
              "onUpdate:modelValue": ($event) => isRef(startedDay) ? startedDay.value = $event : null,
              showIcon: "",
              iconDisplay: "input"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-1 flex-col gap-2 items-end"${_scopeId}><label for="isService"${_scopeId}>Is Service</label>`);
            _push2(ssrRenderComponent(_component_InputSwitch, {
              id: "isService",
              modelValue: unref(isService),
              "onUpdate:modelValue": ($event) => isRef(isService) ? isService.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-row gap-3 justify-between"${_scopeId}><span class="text-xs text-gray-400"${_scopeId}> Created at: ${ssrInterpolate(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(createdAt)))}</span><span class="text-xs text-gray-400"${_scopeId}> Updated at: ${ssrInterpolate(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(updatedAt)))}</span></div></template>`);
          } else {
            return [
              createVNode("template", { class: "flex flex-col gap-3" }, [
                createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                  createVNode("label", { for: "zone" }, "Zone"),
                  createVNode(_component_Dropdown, {
                    id: "zone",
                    placeholder: "Select Zone",
                    modelValue: unref(currentZone).value,
                    "onUpdate:modelValue": ($event) => unref(currentZone).value = $event,
                    options: unref(zones),
                    optionLabel: "name",
                    optionValue: "value"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                ]),
                createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                  createVNode("label", { for: "desc" }, "Name"),
                  createVNode(_component_InputText, {
                    id: "desc",
                    placeholder: "Name",
                    modelValue: unref(desc),
                    "onUpdate:modelValue": ($event) => isRef(desc) ? desc.value = $event : null
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
                createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                  createVNode("label", { for: "type" }, "Type"),
                  createVNode(_component_Dropdown, {
                    id: "type",
                    placeholder: "Select Type",
                    modelValue: unref(type).value,
                    "onUpdate:modelValue": ($event) => unref(type).value = $event,
                    options: __props.types,
                    optionLabel: "name",
                    optionValue: "value"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                ]),
                createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                  createVNode("label", { for: "numberOfFloor" }, "Number of Floor"),
                  createVNode(_component_InputNumber, {
                    id: "numberOfFloor",
                    mode: "decimal",
                    modelValue: unref(numberOfFloor),
                    "onUpdate:modelValue": ($event) => isRef(numberOfFloor) ? numberOfFloor.value = $event : null,
                    min: 0
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                    createVNode("label", { for: "startedDay" }, "Started Day"),
                    createVNode(_component_Calendar, {
                      modelValue: unref(startedDay),
                      "onUpdate:modelValue": ($event) => isRef(startedDay) ? startedDay.value = $event : null,
                      showIcon: "",
                      iconDisplay: "input"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-1 flex-col gap-2 items-end" }, [
                  createVNode("label", { for: "isService" }, "Is Service"),
                  createVNode(_component_InputSwitch, {
                    id: "isService",
                    modelValue: unref(isService),
                    "onUpdate:modelValue": ($event) => isRef(isService) ? isService.value = $event : null
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/block/EditBlockDialog.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "DeleteBlockDialog",
  __ssrInlineRender: true,
  props: ["visible"],
  setup(__props) {
    const { visible } = __props;
    const { currentBlock } = storeToRefs(useBlocksStore());
    const { deleteBlock } = useBlocksStore();
    const toast = useToast();
    const myVisible = ref(visible);
    const onDelete = async () => {
      const response = await deleteBlock(currentBlock.value);
      myVisible.value = false;
      if (response != null && response["result"] == "ok") {
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Delete Block Successfully!",
          group: "bl",
          life: 3e3
        });
      } else {
        toast.add({
          severity: "danger",
          summary: "Error",
          detail: "Failed to Delete Block",
          group: "bl",
          life: 3e3
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script;
      const _component_Button = script$6;
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
            _push2(`<div class="inline-flex items-center justify-center gap-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>Delete Block?</span></div>`);
          } else {
            return [
              createVNode("div", { class: "inline-flex items-center justify-center gap-2" }, [
                createVNode("span", { class: "font-bold text-xl" }, "Delete Block?")
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
            _push2(`<div${_scopeId}><span${_scopeId}> This will delete block <b${_scopeId}>${ssrInterpolate(unref(currentBlock)["desc"])}</b> permanently! </span><span${_scopeId}>You cannot undo this action!</span></div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode("span", null, [
                  createTextVNode(" This will delete block "),
                  createVNode("b", null, toDisplayString(unref(currentBlock)["desc"]), 1),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/block/DeleteBlockDialog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main$3 as _, _sfc_main$2 as a, _sfc_main$1 as b, _sfc_main as c };
//# sourceMappingURL=DeleteBlockDialog-CTF5zDEs.mjs.map
