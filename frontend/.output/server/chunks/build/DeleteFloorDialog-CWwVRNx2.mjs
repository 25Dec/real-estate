import script from './dialog.esm-Wemb0g_v.mjs';
import script$1 from './dropdown.esm-BZz-eegH.mjs';
import script$2 from './inputtext.esm-Blvd_dSV.mjs';
import script$3 from './inputnumber.esm-CMvh_h4P.mjs';
import script$4 from './button.esm-D8sVcJb8.mjs';
import { ref, withAsyncContext, mergeProps, unref, isRef, withCtx, createVNode, toDisplayString, useSSRContext, createTextVNode } from 'vue';
import { s as storeToRefs, u as useToast } from './server.mjs';
import { u as useZonesStore } from './zones-store-DDylndqA.mjs';
import { u as useBlocksStore } from './blocks-store-CY-29APJ.mjs';
import { u as useFloorsStore } from './floor-store-Cy61MA60.mjs';
import { a as convertDateTime } from './core_utils-WJ_cJnbk.mjs';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main$3 = {
  __name: "ViewDetailsFloorDialog",
  __ssrInlineRender: true,
  props: ["visible"],
  async setup(__props) {
    var _a2, _b2, _c2, _d2;
    var _a, _b, _c, _d, _e, _f;
    let __temp, __restore;
    const { visible } = __props;
    const { zones } = storeToRefs(useZonesStore());
    const { getZones } = useZonesStore();
    const { blocks } = storeToRefs(useBlocksStore());
    const { getBlocks } = useBlocksStore();
    const { currentFloor } = storeToRefs(useFloorsStore());
    const myVisible = ref(visible);
    [__temp, __restore] = withAsyncContext(() => getZones()), await __temp, __restore();
    [__temp, __restore] = withAsyncContext(() => getBlocks()), await __temp, __restore();
    const numberOfHighArea = ref(currentFloor.value["number_of_high_area"]);
    const publicArea = ref(currentFloor.value["public_area"]);
    const totalArea = ref(currentFloor.value["total_area"]);
    const progress = ref(currentFloor.value["progress"]);
    const desc = ref(currentFloor.value["desc"]);
    const createdAt = ref(currentFloor.value["created_at"]);
    const updatedAt = ref(currentFloor.value["updated_at"]);
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
            _push2(`<div class="inline-flex items-center justify-center gap-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>Floor Details</span></div>`);
          } else {
            return [
              createVNode("div", { class: "inline-flex items-center justify-center gap-2" }, [
                createVNode("span", { class: "font-bold text-xl" }, "Floor Details")
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
            _push2(`<template class="flex flex-col gap-3"${_scopeId}><div class="flex flex-col gap-2"${_scopeId}><label for="currentBlock"${_scopeId}>Block</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "currentBlock",
              placeholder: "Select block",
              modelValue: unref(currentBlock).value,
              "onUpdate:modelValue": ($event) => unref(currentBlock).value = $event,
              options: unref(myBlocks),
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
            _push2(`</div><div class="flex gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="numberOfHighArea"${_scopeId}>Number of High Area</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "numberOfHighArea",
              modelValue: unref(numberOfHighArea),
              "onUpdate:modelValue": ($event) => isRef(numberOfHighArea) ? numberOfHighArea.value = $event : null,
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="publicArea"${_scopeId}>Public Area</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "publicArea",
              modelValue: unref(publicArea),
              "onUpdate:modelValue": ($event) => isRef(publicArea) ? publicArea.value = $event : null,
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="totalArea"${_scopeId}>Total Area</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "totalArea",
              modelValue: unref(totalArea),
              "onUpdate:modelValue": ($event) => isRef(totalArea) ? totalArea.value = $event : null,
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="progress"${_scopeId}>Progress</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "progress",
              modelValue: unref(progress),
              "onUpdate:modelValue": ($event) => isRef(progress) ? progress.value = $event : null,
              prefix: "%",
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-row gap-3 justify-between"${_scopeId}><span class="text-xs text-gray-400"${_scopeId}> Created at: ${ssrInterpolate(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(createdAt)))}</span><span class="text-xs text-gray-400"${_scopeId}> Updated at: ${ssrInterpolate(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(updatedAt)))}</span></div></template>`);
          } else {
            return [
              createVNode("template", { class: "flex flex-col gap-3" }, [
                createVNode("div", { class: "flex flex-col gap-2" }, [
                  createVNode("label", { for: "currentBlock" }, "Block"),
                  createVNode(_component_Dropdown, {
                    id: "currentBlock",
                    placeholder: "Select block",
                    modelValue: unref(currentBlock).value,
                    "onUpdate:modelValue": ($event) => unref(currentBlock).value = $event,
                    options: unref(myBlocks),
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
                    createVNode("label", { for: "numberOfHighArea" }, "Number of High Area"),
                    createVNode(_component_InputNumber, {
                      id: "numberOfHighArea",
                      modelValue: unref(numberOfHighArea),
                      "onUpdate:modelValue": ($event) => isRef(numberOfHighArea) ? numberOfHighArea.value = $event : null,
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "publicArea" }, "Public Area"),
                    createVNode(_component_InputNumber, {
                      id: "publicArea",
                      modelValue: unref(publicArea),
                      "onUpdate:modelValue": ($event) => isRef(publicArea) ? publicArea.value = $event : null,
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "totalArea" }, "Total Area"),
                    createVNode(_component_InputNumber, {
                      id: "totalArea",
                      modelValue: unref(totalArea),
                      "onUpdate:modelValue": ($event) => isRef(totalArea) ? totalArea.value = $event : null,
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "progress" }, "Progress"),
                    createVNode(_component_InputNumber, {
                      id: "progress",
                      modelValue: unref(progress),
                      "onUpdate:modelValue": ($event) => isRef(progress) ? progress.value = $event : null,
                      prefix: "%",
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/floor/ViewDetailsFloorDialog.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "CreateFloorDialog",
  __ssrInlineRender: true,
  props: ["visible"],
  async setup(__props) {
    var _a2, _b2, _c2, _d2;
    var _a, _b, _c, _d, _e, _f;
    let __temp, __restore;
    const { visible } = __props;
    const { zones } = storeToRefs(useZonesStore());
    const { getZones } = useZonesStore();
    const { blocks } = storeToRefs(useBlocksStore());
    const { getBlocks } = useBlocksStore();
    const { addNewFloor } = useFloorsStore();
    const toast = useToast();
    [__temp, __restore] = withAsyncContext(() => getZones()), await __temp, __restore();
    [__temp, __restore] = withAsyncContext(() => getBlocks()), await __temp, __restore();
    const myVisible = ref(visible);
    const numberOfHighArea = ref(0);
    const publicArea = ref(0);
    const totalArea = ref(0);
    const progress = ref(0);
    const desc = ref("");
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
    const onSave = async () => {
      const newFloorData = {
        id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1,
        block_id: parseInt(currentBlock.value.value),
        number_of_high_area: parseInt(numberOfHighArea.value),
        public_area: parseInt(publicArea.value),
        total_area: parseInt(totalArea.value),
        progress: parseInt(progress.value),
        desc: desc.value,
        deleted: "false",
        created_by: 13,
        updated_by: 13,
        created_at: (/* @__PURE__ */ new Date()).toLocaleString(),
        updated_at: null
      };
      const response = await addNewFloor(newFloorData);
      myVisible.value = false;
      if (response != null && response["result"] == "ok") {
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Create New Floor Successfully!",
          group: "bl",
          life: 3e3
        });
      } else {
        toast.add({
          severity: "danger",
          summary: "Error",
          detail: "Failed to Create New Floor",
          group: "bl",
          life: 3e3
        });
      }
    };
    const handleDropdown = (event, type) => {
      var _a3, _b3;
      var _a22, _b22, _c22, _d22;
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
            _push2(`<div class="inline-flex items-center justify-center gap-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>Create New Floor</span></div>`);
          } else {
            return [
              createVNode("div", { class: "inline-flex items-center justify-center gap-2" }, [
                createVNode("span", { class: "font-bold text-xl" }, "Create New Floor")
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
            _push2(`<template class="flex flex-col gap-3"${_scopeId}><div class="flex flex-col gap-2"${_scopeId}><label for="currentZone"${_scopeId}>Zone</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "currentZone",
              placeholder: "Select zone",
              modelValue: unref(currentZone).value,
              "onUpdate:modelValue": ($event) => unref(currentZone).value = $event,
              options: unref(myZones),
              optionLabel: "name",
              optionValue: "value",
              onChange: (event) => handleDropdown(event, "zone")
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-col gap-2"${_scopeId}><label for="currentBlock"${_scopeId}>Block</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "currentBlock",
              placeholder: "Select block",
              modelValue: unref(currentBlock).value,
              "onUpdate:modelValue": ($event) => unref(currentBlock).value = $event,
              options: unref(myBlocks),
              optionLabel: "name",
              optionValue: "value",
              onChange: (event) => handleDropdown(event, "block")
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="desc"${_scopeId}>Name</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "desc",
              modelValue: unref(desc),
              "onUpdate:modelValue": ($event) => isRef(desc) ? desc.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="numberOfHighArea"${_scopeId}>Number of High Area</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "numberOfHighArea",
              modelValue: unref(numberOfHighArea),
              "onUpdate:modelValue": ($event) => isRef(numberOfHighArea) ? numberOfHighArea.value = $event : null,
              mode: "decimal",
              min: 0
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="publicArea"${_scopeId}>Public Area</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "publicArea",
              modelValue: unref(publicArea),
              "onUpdate:modelValue": ($event) => isRef(publicArea) ? publicArea.value = $event : null,
              mode: "decimal",
              min: 0
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="totalArea"${_scopeId}>Total Area</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "totalArea",
              modelValue: unref(totalArea),
              "onUpdate:modelValue": ($event) => isRef(totalArea) ? totalArea.value = $event : null,
              mode: "decimal",
              min: 0
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="progress"${_scopeId}>Progress</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "progress",
              modelValue: unref(progress),
              "onUpdate:modelValue": ($event) => isRef(progress) ? progress.value = $event : null,
              prefix: "%",
              mode: "decimal",
              min: 0,
              max: 100
            }, null, _parent2, _scopeId));
            _push2(`</div></div></template>`);
          } else {
            return [
              createVNode("template", { class: "flex flex-col gap-3" }, [
                createVNode("div", { class: "flex flex-col gap-2" }, [
                  createVNode("label", { for: "currentZone" }, "Zone"),
                  createVNode(_component_Dropdown, {
                    id: "currentZone",
                    placeholder: "Select zone",
                    modelValue: unref(currentZone).value,
                    "onUpdate:modelValue": ($event) => unref(currentZone).value = $event,
                    options: unref(myZones),
                    optionLabel: "name",
                    optionValue: "value",
                    onChange: (event) => handleDropdown(event, "zone")
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "onChange"])
                ]),
                createVNode("div", { class: "flex flex-col gap-2" }, [
                  createVNode("label", { for: "currentBlock" }, "Block"),
                  createVNode(_component_Dropdown, {
                    id: "currentBlock",
                    placeholder: "Select block",
                    modelValue: unref(currentBlock).value,
                    "onUpdate:modelValue": ($event) => unref(currentBlock).value = $event,
                    options: unref(myBlocks),
                    optionLabel: "name",
                    optionValue: "value",
                    onChange: (event) => handleDropdown(event, "block")
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "onChange"])
                ]),
                createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                  createVNode("label", { for: "desc" }, "Name"),
                  createVNode(_component_InputText, {
                    id: "desc",
                    modelValue: unref(desc),
                    "onUpdate:modelValue": ($event) => isRef(desc) ? desc.value = $event : null
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "flex gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "numberOfHighArea" }, "Number of High Area"),
                    createVNode(_component_InputNumber, {
                      id: "numberOfHighArea",
                      modelValue: unref(numberOfHighArea),
                      "onUpdate:modelValue": ($event) => isRef(numberOfHighArea) ? numberOfHighArea.value = $event : null,
                      mode: "decimal",
                      min: 0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "publicArea" }, "Public Area"),
                    createVNode(_component_InputNumber, {
                      id: "publicArea",
                      modelValue: unref(publicArea),
                      "onUpdate:modelValue": ($event) => isRef(publicArea) ? publicArea.value = $event : null,
                      mode: "decimal",
                      min: 0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "totalArea" }, "Total Area"),
                    createVNode(_component_InputNumber, {
                      id: "totalArea",
                      modelValue: unref(totalArea),
                      "onUpdate:modelValue": ($event) => isRef(totalArea) ? totalArea.value = $event : null,
                      mode: "decimal",
                      min: 0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "progress" }, "Progress"),
                    createVNode(_component_InputNumber, {
                      id: "progress",
                      modelValue: unref(progress),
                      "onUpdate:modelValue": ($event) => isRef(progress) ? progress.value = $event : null,
                      prefix: "%",
                      mode: "decimal",
                      min: 0,
                      max: 100
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/floor/CreateFloorDialog.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "EditFloorDialog",
  __ssrInlineRender: true,
  props: ["visible"],
  async setup(__props) {
    var _a2, _b2, _c2, _d2;
    var _a, _b, _c, _d, _e, _f;
    let __temp, __restore;
    const { visible } = __props;
    const { zones } = storeToRefs(useZonesStore());
    const { getZones } = useZonesStore();
    const { blocks } = storeToRefs(useBlocksStore());
    const { getBlocks } = useBlocksStore();
    const { currentFloor } = storeToRefs(useFloorsStore());
    const { editFloor } = useFloorsStore();
    const toast = useToast();
    [__temp, __restore] = withAsyncContext(() => getZones()), await __temp, __restore();
    [__temp, __restore] = withAsyncContext(() => getBlocks()), await __temp, __restore();
    const myVisible = ref(visible);
    const numberOfHighArea = ref(currentFloor.value["number_of_high_area"]);
    const publicArea = ref(currentFloor.value["public_area"]);
    const totalArea = ref(currentFloor.value["total_area"]);
    const progress = ref(currentFloor.value["progress"]);
    const desc = ref(currentFloor.value["desc"]);
    const createdAt = ref(currentFloor.value["created_at"]);
    const updatedAt = ref(currentFloor.value["updated_at"]);
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
    const onSave = async () => {
      const newFloorData = {
        ...currentFloor.value,
        block_id: parseInt(currentBlock.value.value),
        number_of_high_area: parseInt(numberOfHighArea.value),
        public_area: parseInt(publicArea.value),
        total_area: parseInt(totalArea.value),
        progress: parseInt(progress.value),
        desc: desc.value,
        updated_at: (/* @__PURE__ */ new Date()).toLocaleString()
      };
      const response = await editFloor(newFloorData);
      myVisible.value = false;
      if (response != null && response["result"] == "ok") {
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Edit Floor Successfully!",
          group: "bl",
          life: 3e3
        });
      } else {
        toast.add({
          severity: "danger",
          summary: "Error",
          detail: "Failed to Edit Floor",
          group: "bl",
          life: 3e3
        });
      }
    };
    const handleDropdown = (event, type) => {
      var _a3, _b3;
      var _a22, _b22, _c22, _d22;
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
            _push2(`<div class="inline-flex items-center justify-center gap-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>Floor Details</span></div>`);
          } else {
            return [
              createVNode("div", { class: "inline-flex items-center justify-center gap-2" }, [
                createVNode("span", { class: "font-bold text-xl" }, "Floor Details")
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
            _push2(`<template class="flex flex-col gap-3"${_scopeId}><div class="flex flex-col gap-2"${_scopeId}><label for="currentZone"${_scopeId}>Zone</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "currentZone",
              placeholder: "Select zone",
              modelValue: unref(currentZone).value,
              "onUpdate:modelValue": ($event) => unref(currentZone).value = $event,
              options: unref(myZones),
              optionLabel: "name",
              optionValue: "value",
              onChange: (event) => handleDropdown(event, "zone")
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-col gap-2"${_scopeId}><label for="currentBlock"${_scopeId}>Block</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "currentBlock",
              placeholder: "Select block",
              modelValue: unref(currentBlock).value,
              "onUpdate:modelValue": ($event) => unref(currentBlock).value = $event,
              options: unref(myBlocks),
              optionLabel: "name",
              optionValue: "value",
              onChange: (event) => handleDropdown(event, "block")
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="desc"${_scopeId}>Name</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "desc",
              modelValue: unref(desc),
              "onUpdate:modelValue": ($event) => isRef(desc) ? desc.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="numberOfHighArea"${_scopeId}>Number of High Area</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "numberOfHighArea",
              modelValue: unref(numberOfHighArea),
              "onUpdate:modelValue": ($event) => isRef(numberOfHighArea) ? numberOfHighArea.value = $event : null,
              mode: "decimal",
              min: 0
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="publicArea"${_scopeId}>Public Area</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "publicArea",
              modelValue: unref(publicArea),
              "onUpdate:modelValue": ($event) => isRef(publicArea) ? publicArea.value = $event : null,
              mode: "decimal",
              min: 0
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="totalArea"${_scopeId}>Total Area</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "totalArea",
              modelValue: unref(totalArea),
              "onUpdate:modelValue": ($event) => isRef(totalArea) ? totalArea.value = $event : null,
              mode: "decimal",
              min: 0
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="progress"${_scopeId}>Progress</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "progress",
              modelValue: unref(progress),
              "onUpdate:modelValue": ($event) => isRef(progress) ? progress.value = $event : null,
              prefix: "%",
              mode: "decimal",
              min: 0,
              max: 100
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-row gap-3 justify-between"${_scopeId}><span class="text-xs text-gray-400"${_scopeId}> Created at: ${ssrInterpolate(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(createdAt)))}</span><span class="text-xs text-gray-400"${_scopeId}> Updated at: ${ssrInterpolate(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(updatedAt)))}</span></div></template>`);
          } else {
            return [
              createVNode("template", { class: "flex flex-col gap-3" }, [
                createVNode("div", { class: "flex flex-col gap-2" }, [
                  createVNode("label", { for: "currentZone" }, "Zone"),
                  createVNode(_component_Dropdown, {
                    id: "currentZone",
                    placeholder: "Select zone",
                    modelValue: unref(currentZone).value,
                    "onUpdate:modelValue": ($event) => unref(currentZone).value = $event,
                    options: unref(myZones),
                    optionLabel: "name",
                    optionValue: "value",
                    onChange: (event) => handleDropdown(event, "zone")
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "onChange"])
                ]),
                createVNode("div", { class: "flex flex-col gap-2" }, [
                  createVNode("label", { for: "currentBlock" }, "Block"),
                  createVNode(_component_Dropdown, {
                    id: "currentBlock",
                    placeholder: "Select block",
                    modelValue: unref(currentBlock).value,
                    "onUpdate:modelValue": ($event) => unref(currentBlock).value = $event,
                    options: unref(myBlocks),
                    optionLabel: "name",
                    optionValue: "value",
                    onChange: (event) => handleDropdown(event, "block")
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "onChange"])
                ]),
                createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                  createVNode("label", { for: "desc" }, "Name"),
                  createVNode(_component_InputText, {
                    id: "desc",
                    modelValue: unref(desc),
                    "onUpdate:modelValue": ($event) => isRef(desc) ? desc.value = $event : null
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "flex gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "numberOfHighArea" }, "Number of High Area"),
                    createVNode(_component_InputNumber, {
                      id: "numberOfHighArea",
                      modelValue: unref(numberOfHighArea),
                      "onUpdate:modelValue": ($event) => isRef(numberOfHighArea) ? numberOfHighArea.value = $event : null,
                      mode: "decimal",
                      min: 0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "publicArea" }, "Public Area"),
                    createVNode(_component_InputNumber, {
                      id: "publicArea",
                      modelValue: unref(publicArea),
                      "onUpdate:modelValue": ($event) => isRef(publicArea) ? publicArea.value = $event : null,
                      mode: "decimal",
                      min: 0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "totalArea" }, "Total Area"),
                    createVNode(_component_InputNumber, {
                      id: "totalArea",
                      modelValue: unref(totalArea),
                      "onUpdate:modelValue": ($event) => isRef(totalArea) ? totalArea.value = $event : null,
                      mode: "decimal",
                      min: 0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "progress" }, "Progress"),
                    createVNode(_component_InputNumber, {
                      id: "progress",
                      modelValue: unref(progress),
                      "onUpdate:modelValue": ($event) => isRef(progress) ? progress.value = $event : null,
                      prefix: "%",
                      mode: "decimal",
                      min: 0,
                      max: 100
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/floor/EditFloorDialog.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "DeleteFloorDialog",
  __ssrInlineRender: true,
  props: ["visible"],
  setup(__props) {
    const { visible } = __props;
    const { currentFloor } = storeToRefs(useFloorsStore());
    const { deleteFloor } = useFloorsStore();
    const toast = useToast();
    const myVisible = ref(visible);
    const onDelete = async () => {
      const response = await deleteFloor(currentFloor.value);
      myVisible.value = false;
      if (response != null && response["result"] == "ok") {
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Delete Floor Successfully!",
          group: "bl",
          life: 3e3
        });
      } else {
        toast.add({
          severity: "danger",
          summary: "Error",
          detail: "Failed to Delete Floor",
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
            _push2(`<div class="inline-flex items-center justify-center gap-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>Delete Floor?</span></div>`);
          } else {
            return [
              createVNode("div", { class: "inline-flex items-center justify-center gap-2" }, [
                createVNode("span", { class: "font-bold text-xl" }, "Delete Floor?")
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
            _push2(`<div${_scopeId}><span${_scopeId}> This will delete floor <b${_scopeId}>${ssrInterpolate(unref(currentFloor)["desc"])}</b> permanently! </span><span${_scopeId}>You cannot undo this action!</span></div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode("span", null, [
                  createTextVNode(" This will delete floor "),
                  createVNode("b", null, toDisplayString(unref(currentFloor)["desc"]), 1),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/floor/DeleteFloorDialog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main$3 as _, _sfc_main$2 as a, _sfc_main$1 as b, _sfc_main as c };
//# sourceMappingURL=DeleteFloorDialog-CWwVRNx2.mjs.map
