import script from './tag.esm-Bkya-FxV.mjs';
import script$1 from './iconfield.esm-CMjnwUAR.mjs';
import script$2 from './inputicon.esm-DsrGfACI.mjs';
import __nuxt_component_1 from './Icon-B04GAuZ4.mjs';
import script$3 from './inputtext.esm-Blvd_dSV.mjs';
import script$4 from './button.esm-D8sVcJb8.mjs';
import script$5 from './datatable.esm-BAh19VmC.mjs';
import script$6 from './column.esm-KktM_xTo.mjs';
import script$7 from './knob.esm-CiupXrSq.mjs';
import script$8 from './menu.esm-C_RMEhtK.mjs';
import script$9 from './dialog.esm-Wemb0g_v.mjs';
import script$a from './inputnumber.esm-CMvh_h4P.mjs';
import script$b from './calendar.esm-iTjSyI1e.mjs';
import script$c from './textarea.esm-r2lUF_RZ.mjs';
import { withAsyncContext, ref, resolveDirective, unref, withCtx, createVNode, mergeProps, isRef, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { s as storeToRefs, F as FilterMatchMode, u as useToast } from './server.mjs';
import { u as useZonesStore } from './zones-store-DDylndqA.mjs';
import { a as convertDateTime } from './core_utils-WJ_cJnbk.mjs';
import { ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate } from 'vue/server-renderer';
import { u as useProjectsStore } from './projects-store-50IgnX7b.mjs';
import './basecomponent.esm-DXWDIfdj.mjs';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'ipx';
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
import './index-DE5HZNjr.mjs';
import '@iconify/vue/dist/offline';
import '@iconify/vue';
import './badge.esm-CGMv5799.mjs';
import './index.esm-C7T4V9vj.mjs';
import './baseicon.esm-DbzTeshI.mjs';
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
import './index.esm-ByqdG2PS.mjs';
import './index.esm-Dpdcp6OZ.mjs';
import './index.esm-CE-esNCM.mjs';
import './index.esm-C03T_CK6.mjs';
import './index.esm-Cs4cT7wr.mjs';
import './checkbox.esm-Duuim8Iu.mjs';
import './radiobutton.esm-CQ1mq00b.mjs';
import './index.esm-BvZNBu0f.mjs';
import './index.esm-DTIot6dj.mjs';
import './index.esm-BdmOvYft.mjs';
import './index.esm-5BOVva4X.mjs';
import './fetch-DXSGE_KZ.mjs';

const _sfc_main$4 = {
  __name: "ViewDetailsZoneDialog",
  __ssrInlineRender: true,
  props: ["visible"],
  setup(__props) {
    const { visible } = __props;
    const { currentZone } = storeToRefs(useZonesStore());
    const myVisible = ref(visible);
    const id = ref(currentZone.value["id"]);
    const projectID = ref(currentZone.value["project_id"]);
    const name = ref(currentZone.value["name"]);
    const desc = ref(currentZone.value["desc"]);
    const constructionArea = ref(currentZone.value["construction_area"]);
    const totalArea = ref(currentZone.value["total_area"]);
    const numberOfBlock = ref(currentZone.value["number_of_block"]);
    const numberOfUnitLand = ref(currentZone.value["number_of_unit_land"]);
    const progress = ref(currentZone.value["progress"]);
    const startedDay = ref(currentZone.value["started_day"]);
    const createdAt = ref(currentZone.value["created_at"]);
    const updatedAt = ref(currentZone.value["updated_at"]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script$9;
      const _component_InputText = script$3;
      const _component_InputNumber = script$a;
      const _component_Calendar = script$b;
      const _component_Textarea = script$c;
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
            _push2(`<div class="inline-flex items-center justify-center gap-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>Zone Details</span></div>`);
          } else {
            return [
              createVNode("div", { class: "inline-flex items-center justify-center gap-2" }, [
                createVNode("span", { class: "font-bold text-xl" }, "Zone Details")
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
            _push2(`<template class="flex flex-col gap-3"${_scopeId}><div class="flex gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="id"${_scopeId}>ID</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "id",
              modelValue: unref(id),
              "onUpdate:modelValue": ($event) => isRef(id) ? id.value = $event : null,
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="project_id"${_scopeId}>Project ID</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "project_id",
              modelValue: unref(projectID),
              "onUpdate:modelValue": ($event) => isRef(projectID) ? projectID.value = $event : null,
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="name"${_scopeId}>Name</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "name",
              modelValue: unref(name),
              "onUpdate:modelValue": ($event) => isRef(name) ? name.value = $event : null,
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="constructionArea"${_scopeId}>Construction Area</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "constructionArea",
              modelValue: unref(constructionArea),
              "onUpdate:modelValue": ($event) => isRef(constructionArea) ? constructionArea.value = $event : null,
              mode: "decimal",
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="totalArea"${_scopeId}>Total Area</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "totalArea",
              modelValue: unref(totalArea),
              "onUpdate:modelValue": ($event) => isRef(totalArea) ? totalArea.value = $event : null,
              mode: "decimal",
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="numberOfBlock"${_scopeId}>Number Of Block</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "numberOfBlock",
              modelValue: unref(numberOfBlock),
              "onUpdate:modelValue": ($event) => isRef(numberOfBlock) ? numberOfBlock.value = $event : null,
              mode: "decimal",
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="numberOfUnitLand"${_scopeId}>Number Of Unit Land</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "numberOfUnitLand",
              modelValue: unref(numberOfUnitLand),
              "onUpdate:modelValue": ($event) => isRef(numberOfUnitLand) ? numberOfUnitLand.value = $event : null,
              mode: "decimal",
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="progress"${_scopeId}>Progress</label>`);
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
              "v-model": ("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(startedDay)),
              showIcon: "",
              iconDisplay: "input",
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="desc"${_scopeId}>Description</label>`);
            _push2(ssrRenderComponent(_component_Textarea, {
              id: "desc",
              modelValue: unref(desc),
              "onUpdate:modelValue": ($event) => isRef(desc) ? desc.value = $event : null,
              autoResize: "",
              rows: "5",
              cols: "30",
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-row gap-3 justify-between"${_scopeId}><span class="text-xs text-gray-400"${_scopeId}> Created at: ${ssrInterpolate(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(createdAt)))}</span><span class="text-xs text-gray-400"${_scopeId}> Updated at: ${ssrInterpolate(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(updatedAt)))}</span></div></template>`);
          } else {
            return [
              createVNode("template", { class: "flex flex-col gap-3" }, [
                createVNode("div", { class: "flex gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "id" }, "ID"),
                    createVNode(_component_InputText, {
                      id: "id",
                      modelValue: unref(id),
                      "onUpdate:modelValue": ($event) => isRef(id) ? id.value = $event : null,
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "project_id" }, "Project ID"),
                    createVNode(_component_InputText, {
                      id: "project_id",
                      modelValue: unref(projectID),
                      "onUpdate:modelValue": ($event) => isRef(projectID) ? projectID.value = $event : null,
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "name" }, "Name"),
                    createVNode(_component_InputText, {
                      id: "name",
                      modelValue: unref(name),
                      "onUpdate:modelValue": ($event) => isRef(name) ? name.value = $event : null,
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "constructionArea" }, "Construction Area"),
                    createVNode(_component_InputNumber, {
                      id: "constructionArea",
                      modelValue: unref(constructionArea),
                      "onUpdate:modelValue": ($event) => isRef(constructionArea) ? constructionArea.value = $event : null,
                      mode: "decimal",
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "totalArea" }, "Total Area"),
                    createVNode(_component_InputNumber, {
                      id: "totalArea",
                      modelValue: unref(totalArea),
                      "onUpdate:modelValue": ($event) => isRef(totalArea) ? totalArea.value = $event : null,
                      mode: "decimal",
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "numberOfBlock" }, "Number Of Block"),
                    createVNode(_component_InputNumber, {
                      id: "numberOfBlock",
                      modelValue: unref(numberOfBlock),
                      "onUpdate:modelValue": ($event) => isRef(numberOfBlock) ? numberOfBlock.value = $event : null,
                      mode: "decimal",
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "numberOfUnitLand" }, "Number Of Unit Land"),
                    createVNode(_component_InputNumber, {
                      id: "numberOfUnitLand",
                      modelValue: unref(numberOfUnitLand),
                      "onUpdate:modelValue": ($event) => isRef(numberOfUnitLand) ? numberOfUnitLand.value = $event : null,
                      mode: "decimal",
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "startedDay" }, "Started Day"),
                    createVNode(_component_Calendar, {
                      "v-model": ("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(startedDay)),
                      showIcon: "",
                      iconDisplay: "input",
                      disabled: ""
                    }, null, 8, ["v-model"])
                  ])
                ]),
                createVNode("div", { class: "flex gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "desc" }, "Description"),
                    createVNode(_component_Textarea, {
                      id: "desc",
                      modelValue: unref(desc),
                      "onUpdate:modelValue": ($event) => isRef(desc) ? desc.value = $event : null,
                      autoResize: "",
                      rows: "5",
                      cols: "30",
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
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/zone/ViewDetailsZoneDialog.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
  __name: "CreateZoneDialog",
  __ssrInlineRender: true,
  props: ["visible", "allProjectIDs"],
  setup(__props) {
    const { visible, allProjectIDs } = __props;
    const { currentProjectID } = storeToRefs(useProjectsStore());
    const { addNewZone } = useZonesStore();
    const toast = useToast();
    const myVisible = ref(visible);
    const zoneName = ref("");
    const desc = ref("");
    const constructionArea = ref(0);
    const totalArea = ref(0);
    const numberOfBlock = ref(0);
    const numberOfUnitLand = ref(0);
    const progress = ref(0);
    const startedDay = ref();
    const onSave = async () => {
      const newZoneData = {
        id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1,
        project_id: parseInt(currentProjectID.value),
        name: zoneName.value,
        desc: desc.value,
        construction_area: parseInt(constructionArea.value),
        total_area: parseInt(totalArea.value),
        number_of_block: parseInt(numberOfBlock.value),
        number_of_unit_land: parseInt(numberOfUnitLand.value),
        progress: parseInt(progress.value),
        started_day: startedDay.value,
        deleted: "false",
        created_by: 1,
        updated_by: null,
        created_at: (/* @__PURE__ */ new Date()).toLocaleString(),
        updated_at: null
      };
      const response = await addNewZone(newZoneData);
      myVisible.value = false;
      if (response != null && response["result"] == "ok") {
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Create New Zone Successfully!",
          group: "bl",
          life: 3e3
        });
      } else {
        toast.add({
          severity: "danger",
          summary: "Error",
          detail: "Failed to Create New Zone",
          group: "bl",
          life: 3e3
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script$9;
      const _component_InputText = script$3;
      const _component_InputNumber = script$a;
      const _component_Calendar = script$b;
      const _component_Textarea = script$c;
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
            _push2(`<div class="inline-flex items-center justify-center gap-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>Create New Zone</span></div>`);
          } else {
            return [
              createVNode("div", { class: "inline-flex items-center justify-center gap-2" }, [
                createVNode("span", { class: "font-bold text-xl" }, "Create New Zone")
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
            _push2(`<template class="flex flex-col gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="zoneName"${_scopeId}>Zone Name</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "zoneName",
              placeholder: "Zone name",
              modelValue: unref(zoneName),
              "onUpdate:modelValue": ($event) => isRef(zoneName) ? zoneName.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-row gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="totalArea"${_scopeId}>Total Area</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "totalArea",
              modelValue: unref(totalArea),
              "onUpdate:modelValue": ($event) => isRef(totalArea) ? totalArea.value = $event : null,
              mode: "decimal",
              min: 0
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="constructionArea"${_scopeId}>Construction Area</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "constructionArea",
              modelValue: unref(constructionArea),
              "onUpdate:modelValue": ($event) => isRef(constructionArea) ? constructionArea.value = $event : null,
              mode: "decimal",
              min: 0
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-row gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="numberOfBlock"${_scopeId}>Number Of Block</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "numberOfBlock",
              modelValue: unref(numberOfBlock),
              "onUpdate:modelValue": ($event) => isRef(numberOfBlock) ? numberOfBlock.value = $event : null,
              mode: "decimal",
              min: 0
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="numberOfUnitLand"${_scopeId}>Number Of Unit Land</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "numberOfUnitLand",
              modelValue: unref(numberOfUnitLand),
              "onUpdate:modelValue": ($event) => isRef(numberOfUnitLand) ? numberOfUnitLand.value = $event : null,
              mode: "decimal",
              min: 0
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-col gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="startedDay"${_scopeId}>Started Day</label>`);
            _push2(ssrRenderComponent(_component_Calendar, {
              modelValue: unref(startedDay),
              "onUpdate:modelValue": ($event) => isRef(startedDay) ? startedDay.value = $event : null,
              showIcon: "",
              iconDisplay: "input"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="progress"${_scopeId}>Progress</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "progress",
              modelValue: unref(progress),
              "onUpdate:modelValue": ($event) => isRef(progress) ? progress.value = $event : null,
              mode: "decimal",
              prefix: "%",
              min: 0,
              max: 100
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="desc"${_scopeId}>Description</label>`);
            _push2(ssrRenderComponent(_component_Textarea, {
              id: "description",
              modelValue: unref(desc),
              "onUpdate:modelValue": ($event) => isRef(desc) ? desc.value = $event : null,
              placeholder: "Description",
              autoResize: "",
              rows: "5",
              cols: "30"
            }, null, _parent2, _scopeId));
            _push2(`</div></div></template>`);
          } else {
            return [
              createVNode("template", { class: "flex flex-col gap-3" }, [
                createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                  createVNode("label", { for: "zoneName" }, "Zone Name"),
                  createVNode(_component_InputText, {
                    id: "zoneName",
                    placeholder: "Zone name",
                    modelValue: unref(zoneName),
                    "onUpdate:modelValue": ($event) => isRef(zoneName) ? zoneName.value = $event : null
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "flex flex-row gap-3" }, [
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
                    createVNode("label", { for: "constructionArea" }, "Construction Area"),
                    createVNode(_component_InputNumber, {
                      id: "constructionArea",
                      modelValue: unref(constructionArea),
                      "onUpdate:modelValue": ($event) => isRef(constructionArea) ? constructionArea.value = $event : null,
                      mode: "decimal",
                      min: 0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-row gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "numberOfBlock" }, "Number Of Block"),
                    createVNode(_component_InputNumber, {
                      id: "numberOfBlock",
                      modelValue: unref(numberOfBlock),
                      "onUpdate:modelValue": ($event) => isRef(numberOfBlock) ? numberOfBlock.value = $event : null,
                      mode: "decimal",
                      min: 0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "numberOfUnitLand" }, "Number Of Unit Land"),
                    createVNode(_component_InputNumber, {
                      id: "numberOfUnitLand",
                      modelValue: unref(numberOfUnitLand),
                      "onUpdate:modelValue": ($event) => isRef(numberOfUnitLand) ? numberOfUnitLand.value = $event : null,
                      mode: "decimal",
                      min: 0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-col gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "startedDay" }, "Started Day"),
                    createVNode(_component_Calendar, {
                      modelValue: unref(startedDay),
                      "onUpdate:modelValue": ($event) => isRef(startedDay) ? startedDay.value = $event : null,
                      showIcon: "",
                      iconDisplay: "input"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
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
                    createVNode("label", { for: "desc" }, "Description"),
                    createVNode(_component_Textarea, {
                      id: "description",
                      modelValue: unref(desc),
                      "onUpdate:modelValue": ($event) => isRef(desc) ? desc.value = $event : null,
                      placeholder: "Description",
                      autoResize: "",
                      rows: "5",
                      cols: "30"
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/zone/CreateZoneDialog.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "EditZoneDialog",
  __ssrInlineRender: true,
  props: ["visible", "allProjectIDs"],
  setup(__props) {
    const { visible, allProjectIDs } = __props;
    const { currentZone } = storeToRefs(useZonesStore());
    const { editZone } = useZonesStore();
    const toast = useToast();
    const myVisible = ref(visible);
    const name = ref(currentZone.value["name"]);
    const desc = ref(currentZone.value["desc"]);
    const constructionArea = ref(currentZone.value["construction_area"]);
    const totalArea = ref(currentZone.value["total_area"]);
    const numberOfBlock = ref(currentZone.value["number_of_block"]);
    const numberOfUnitLand = ref(currentZone.value["number_of_unit_land"]);
    const progress = ref(currentZone.value["progress"]);
    const startedDay = ref(currentZone.value["started_day"]);
    const createdAt = ref(currentZone.value["created_at"]);
    const updatedAt = ref(currentZone.value["updated_at"]);
    const onSave = async () => {
      const newZoneData = {
        ...currentZone.value,
        name: name.value,
        desc: desc.value,
        construction_area: parseInt(constructionArea.value),
        total_area: totalArea.value,
        number_of_block: numberOfBlock.value,
        number_of_unit_land: numberOfUnitLand.value,
        progress: progress.value,
        started_day: startedDay.value,
        updated_at: (/* @__PURE__ */ new Date()).toLocaleString()
      };
      const response = await editZone(newZoneData);
      myVisible.value = false;
      if (response != null && response["result"] == "ok") {
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Edit New Zone Successfully!",
          group: "bl",
          life: 3e3
        });
      } else {
        toast.add({
          severity: "danger",
          summary: "Error",
          detail: "Failed to Edit New Zone",
          group: "bl",
          life: 3e3
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script$9;
      const _component_InputText = script$3;
      const _component_InputNumber = script$a;
      const _component_Calendar = script$b;
      const _component_Textarea = script$c;
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
            _push2(`<div class="inline-flex items-center justify-center gap-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>Zone Details</span></div>`);
          } else {
            return [
              createVNode("div", { class: "inline-flex items-center justify-center gap-2" }, [
                createVNode("span", { class: "font-bold text-xl" }, "Zone Details")
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
            _push2(`<template class="flex flex-col gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="zoneName"${_scopeId}>Zone name</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "zoneName",
              placeholder: "Zone name",
              modelValue: unref(name),
              "onUpdate:modelValue": ($event) => isRef(name) ? name.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-row gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="totalArea"${_scopeId}>Total Area</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "totalArea",
              modelValue: unref(totalArea),
              "onUpdate:modelValue": ($event) => isRef(totalArea) ? totalArea.value = $event : null,
              mode: "decimal",
              min: 0
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="constructionArea"${_scopeId}>Construction Area</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "constructionArea",
              modelValue: unref(constructionArea),
              "onUpdate:modelValue": ($event) => isRef(constructionArea) ? constructionArea.value = $event : null,
              mode: "decimal",
              min: 0
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-row gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="numberOfBlock"${_scopeId}>Number Of Block</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "numberOfBlock",
              modelValue: unref(numberOfBlock),
              "onUpdate:modelValue": ($event) => isRef(numberOfBlock) ? numberOfBlock.value = $event : null,
              mode: "decimal",
              min: 0
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="numberOfUnitLand"${_scopeId}>Number Of Unit Land</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "numberOfUnitLand",
              modelValue: unref(numberOfUnitLand),
              "onUpdate:modelValue": ($event) => isRef(numberOfUnitLand) ? numberOfUnitLand.value = $event : null,
              mode: "decimal",
              min: 0
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-col gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="startedDay"${_scopeId}>Started Day</label>`);
            _push2(ssrRenderComponent(_component_Calendar, {
              modelValue: unref(startedDay),
              "onUpdate:modelValue": ($event) => isRef(startedDay) ? startedDay.value = $event : null,
              showIcon: "",
              iconDisplay: "input"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="progress"${_scopeId}>Progress</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "progress",
              modelValue: unref(progress),
              "onUpdate:modelValue": ($event) => isRef(progress) ? progress.value = $event : null,
              mode: "decimal",
              prefix: "%",
              min: 0,
              max: 100
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="desc"${_scopeId}>Description</label>`);
            _push2(ssrRenderComponent(_component_Textarea, {
              id: "description",
              modelValue: unref(desc),
              "onUpdate:modelValue": ($event) => isRef(desc) ? desc.value = $event : null,
              placeholder: "Description",
              autoResize: "",
              rows: "5",
              cols: "30"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-row gap-3 justify-between"${_scopeId}><span class="text-xs text-gray-400"${_scopeId}> Created at: ${ssrInterpolate(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(createdAt)))}</span><span class="text-xs text-gray-400"${_scopeId}> Updated at: ${ssrInterpolate(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(updatedAt)))}</span></div></div></template>`);
          } else {
            return [
              createVNode("template", { class: "flex flex-col gap-3" }, [
                createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                  createVNode("label", { for: "zoneName" }, "Zone name"),
                  createVNode(_component_InputText, {
                    id: "zoneName",
                    placeholder: "Zone name",
                    modelValue: unref(name),
                    "onUpdate:modelValue": ($event) => isRef(name) ? name.value = $event : null
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "flex flex-row gap-3" }, [
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
                    createVNode("label", { for: "constructionArea" }, "Construction Area"),
                    createVNode(_component_InputNumber, {
                      id: "constructionArea",
                      modelValue: unref(constructionArea),
                      "onUpdate:modelValue": ($event) => isRef(constructionArea) ? constructionArea.value = $event : null,
                      mode: "decimal",
                      min: 0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-row gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "numberOfBlock" }, "Number Of Block"),
                    createVNode(_component_InputNumber, {
                      id: "numberOfBlock",
                      modelValue: unref(numberOfBlock),
                      "onUpdate:modelValue": ($event) => isRef(numberOfBlock) ? numberOfBlock.value = $event : null,
                      mode: "decimal",
                      min: 0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "numberOfUnitLand" }, "Number Of Unit Land"),
                    createVNode(_component_InputNumber, {
                      id: "numberOfUnitLand",
                      modelValue: unref(numberOfUnitLand),
                      "onUpdate:modelValue": ($event) => isRef(numberOfUnitLand) ? numberOfUnitLand.value = $event : null,
                      mode: "decimal",
                      min: 0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-col gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "startedDay" }, "Started Day"),
                    createVNode(_component_Calendar, {
                      modelValue: unref(startedDay),
                      "onUpdate:modelValue": ($event) => isRef(startedDay) ? startedDay.value = $event : null,
                      showIcon: "",
                      iconDisplay: "input"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
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
                    createVNode("label", { for: "desc" }, "Description"),
                    createVNode(_component_Textarea, {
                      id: "description",
                      modelValue: unref(desc),
                      "onUpdate:modelValue": ($event) => isRef(desc) ? desc.value = $event : null,
                      placeholder: "Description",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/zone/EditZoneDialog.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "DeleteZoneDialog",
  __ssrInlineRender: true,
  props: ["visible"],
  setup(__props) {
    const { visible } = __props;
    const { currentZone } = storeToRefs(useZonesStore());
    const { deleteZone } = useZonesStore();
    const toast = useToast();
    const myVisible = ref(visible);
    const onDelete = async () => {
      const response = await deleteZone(currentZone.value);
      myVisible.value = false;
      if (response != null && response["result"] == "ok") {
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Delete Zone Successfully!",
          group: "bl",
          life: 3e3
        });
      } else {
        toast.add({
          severity: "danger",
          summary: "Error",
          detail: "Failed to Delete Zone",
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
            _push2(`<div class="inline-flex items-center justify-center gap-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>Delete Zone?</span></div>`);
          } else {
            return [
              createVNode("div", { class: "inline-flex items-center justify-center gap-2" }, [
                createVNode("span", { class: "font-bold text-xl" }, "Delete Zone?")
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
            _push2(`<div${_scopeId}><span${_scopeId}> This will delete zone <b${_scopeId}>${ssrInterpolate(unref(currentZone)["name"])}</b> permanently! </span><span${_scopeId}>You cannot undo this action!</span></div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode("span", null, [
                  createTextVNode(" This will delete zone "),
                  createVNode("b", null, toDisplayString(unref(currentZone)["name"]), 1),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/zone/DeleteZoneDialog.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { zones, currentZone } = storeToRefs(useZonesStore());
    const { getZones } = useZonesStore();
    const { allProjectIDs } = storeToRefs(useProjectsStore());
    const { getProjects } = useProjectsStore();
    [__temp, __restore] = withAsyncContext(() => getZones()), await __temp, __restore();
    [__temp, __restore] = withAsyncContext(() => getProjects()), await __temp, __restore();
    const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    const menu = ref();
    const menuItems = ref([
      {
        label: "Move to Block",
        command: () => {
        }
      },
      {
        label: "Move to Land Area",
        command: () => {
        }
      }
    ]);
    const viewDetailsZoneDialogVisible = ref(false);
    const createZoneDialogVisible = ref(false);
    const editZoneDialogVisible = ref(false);
    const deleteZoneDialogVisible = ref(false);
    const toggleViewZoneDetails = async (data) => {
      currentZone.value = data;
      viewDetailsZoneDialogVisible.value = !viewDetailsZoneDialogVisible.value;
    };
    const toggleEditZone = async (data) => {
      currentZone.value = data;
      editZoneDialogVisible.value = !editZoneDialogVisible.value;
    };
    const toggleDeleteZone = async (data) => {
      currentZone.value = data;
      deleteZoneDialogVisible.value = !deleteZoneDialogVisible.value;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Tag = script;
      const _component_IconField = script$1;
      const _component_InputIcon = script$2;
      const _component_Icon = __nuxt_component_1;
      const _component_InputText = script$3;
      const _component_Button = script$4;
      const _component_DataTable = script$5;
      const _component_Column = script$6;
      const _component_Knob = script$7;
      const _component_Menu = script$8;
      const _component_ViewDetailsZoneDialog = _sfc_main$4;
      const _component_CreateZoneDialog = _sfc_main$3;
      const _component_EditZoneDialog = _sfc_main$2;
      const _component_DeleteZoneDialog = _sfc_main$1;
      const _directive_auto_animate = resolveDirective("auto-animate");
      _push(`<!--[--><div class="w-full h-full flex flex-col"><div class="fixed right-0 top-0 z-50 backdrop-blur-xl w-5/6 h-[8%] px-4 border-b flex justify-between items-center"><div class="flex items-center gap-2"><span class="font-semibold text-lg">Zone</span>`);
      _push(ssrRenderComponent(_component_Tag, {
        value: unref(zones).length
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
              placeholder: "Filter zone..."
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
                placeholder: "Filter zone..."
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Button, {
        size: "small",
        label: "New",
        onClick: ($event) => createZoneDialogVisible.value = !unref(createZoneDialogVisible)
      }, null, _parent));
      _push(`</div></div><div class="absolute top-[8%] w-full h-[92%]">`);
      _push(ssrRenderComponent(_component_DataTable, mergeProps({
        value: unref(zones),
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
            _push2(`<div class="flex justify-center items-center"${_scopeId}><span${_scopeId}>No zone found.</span></div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-center items-center" }, [
                createVNode("span", null, "No zone found.")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Column, {
              field: "name",
              header: "Name"
            }, {
              body: withCtx(({ data }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(data["name"])}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(data["name"]), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Column, {
              field: "desc",
              header: "Description"
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
                    onClick: ($event) => toggleViewZoneDetails(data)
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
                    onClick: ($event) => toggleEditZone(data)
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
                    onClick: ($event) => toggleDeleteZone(data)
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
                      onClick: ($event) => toggleViewZoneDetails(data)
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, { name: "mdi:eye-outline" })
                      ]),
                      _: 2
                    }, 1032, ["onClick"]),
                    createVNode(_component_Button, {
                      text: "",
                      severity: "secondary",
                      onClick: ($event) => toggleEditZone(data)
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, { name: "mdi:edit-outline" })
                      ]),
                      _: 2
                    }, 1032, ["onClick"]),
                    createVNode(_component_Button, {
                      text: "",
                      severity: "danger",
                      onClick: ($event) => toggleDeleteZone(data)
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
                field: "name",
                header: "Name"
              }, {
                body: withCtx(({ data }) => [
                  createTextVNode(toDisplayString(data["name"]), 1)
                ]),
                _: 1
              }),
              createVNode(_component_Column, {
                field: "desc",
                header: "Description"
              }, {
                body: withCtx(({ data }) => [
                  createTextVNode(toDisplayString(data["desc"]), 1)
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
                    onClick: ($event) => toggleViewZoneDetails(data)
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, { name: "mdi:eye-outline" })
                    ]),
                    _: 2
                  }, 1032, ["onClick"]),
                  createVNode(_component_Button, {
                    text: "",
                    severity: "secondary",
                    onClick: ($event) => toggleEditZone(data)
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, { name: "mdi:edit-outline" })
                    ]),
                    _: 2
                  }, 1032, ["onClick"]),
                  createVNode(_component_Button, {
                    text: "",
                    severity: "danger",
                    onClick: ($event) => toggleDeleteZone(data)
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
      if (unref(viewDetailsZoneDialogVisible)) {
        _push(ssrRenderComponent(_component_ViewDetailsZoneDialog, { visible: unref(viewDetailsZoneDialogVisible) }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(createZoneDialogVisible)) {
        _push(ssrRenderComponent(_component_CreateZoneDialog, {
          visible: unref(createZoneDialogVisible),
          allProjectIDs: unref(allProjectIDs)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(editZoneDialogVisible)) {
        _push(ssrRenderComponent(_component_EditZoneDialog, { visible: unref(editZoneDialogVisible) }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(deleteZoneDialogVisible)) {
        _push(ssrRenderComponent(_component_DeleteZoneDialog, { visible: unref(deleteZoneDialogVisible) }, null, _parent));
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/project_details/zone/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BQv108XI.mjs.map
