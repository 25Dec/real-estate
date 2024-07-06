import script from './tag.esm-Bkya-FxV.mjs';
import script$1 from './iconfield.esm-CMjnwUAR.mjs';
import script$2 from './inputicon.esm-DsrGfACI.mjs';
import __nuxt_component_1 from './Icon-B04GAuZ4.mjs';
import script$3 from './inputtext.esm-Blvd_dSV.mjs';
import script$4 from './button.esm-D8sVcJb8.mjs';
import script$5 from './datatable.esm-BAh19VmC.mjs';
import script$6 from './column.esm-KktM_xTo.mjs';
import script$7 from './dialog.esm-Wemb0g_v.mjs';
import script$8 from './inputnumber.esm-CMvh_h4P.mjs';
import script$9 from './textarea.esm-r2lUF_RZ.mjs';
import { withAsyncContext, ref, resolveDirective, unref, withCtx, createVNode, mergeProps, isRef, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { s as storeToRefs, F as FilterMatchMode, u as useToast } from './server.mjs';
import { u as usePaymentMethodsStore } from './payment-method-store-B-s5UmN8.mjs';
import { h as hideLongText, a as convertDateTime } from './core_utils-WJ_cJnbk.mjs';
import { ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate } from 'vue/server-renderer';
import { u as useProjectsStore } from './projects-store-50IgnX7b.mjs';
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
import './index.esm-C03T_CK6.mjs';
import './index.esm-Cs4cT7wr.mjs';
import './checkbox.esm-Duuim8Iu.mjs';
import './radiobutton.esm-CQ1mq00b.mjs';
import './index.esm-BvZNBu0f.mjs';
import './index.esm-DTIot6dj.mjs';
import './index.esm-Dpdcp6OZ.mjs';
import './index.esm-CE-esNCM.mjs';
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
import './fetch-DXSGE_KZ.mjs';

const _sfc_main$4 = {
  __name: "ViewDetailsPaymentMethodDialog",
  __ssrInlineRender: true,
  props: ["visible", "allProjectIDs"],
  setup(__props) {
    const { visible, allProjectIDs } = __props;
    const { currentPaymentMethod } = storeToRefs(usePaymentMethodsStore());
    const myVisible = ref(visible);
    const totalOfPaymentTime = ref(
      currentPaymentMethod.value["total_of_payment_time"]
    );
    const methodName = ref(currentPaymentMethod.value["method_name"]);
    const percentDiscount = ref(
      currentPaymentMethod.value["percent_discount"] * 10
    );
    const vat = ref(currentPaymentMethod.value["vat"] * 10);
    const maintenanceFee = ref(
      currentPaymentMethod.value["maintenance_fee"] * 10
    );
    const desc = ref(currentPaymentMethod.value["desc"]);
    const createdAt = ref(currentPaymentMethod.value["created_at"]);
    const updatedAt = ref(currentPaymentMethod.value["updated_at"]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script$7;
      const _component_InputText = script$3;
      const _component_InputNumber = script$8;
      const _component_Textarea = script$9;
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
            _push2(`<div class="inline-flex items-center justify-center gap-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>Payment Method Details</span></div>`);
          } else {
            return [
              createVNode("div", { class: "inline-flex items-center justify-center gap-2" }, [
                createVNode("span", { class: "font-bold text-xl" }, "Payment Method Details")
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
            _push2(`<template class="flex flex-col gap-3"${_scopeId}><div class="flex flex-col gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="methodName"${_scopeId}>Method Name</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "methodName",
              modelValue: unref(methodName),
              "onUpdate:modelValue": ($event) => isRef(methodName) ? methodName.value = $event : null,
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-row gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="totalOfPaymentTime"${_scopeId}>Total Of Payment Time</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "totalOfPaymentTime",
              modelValue: unref(totalOfPaymentTime),
              "onUpdate:modelValue": ($event) => isRef(totalOfPaymentTime) ? totalOfPaymentTime.value = $event : null,
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="percentDiscount"${_scopeId}>Discount</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "percentDiscount",
              modelValue: unref(percentDiscount),
              "onUpdate:modelValue": ($event) => isRef(percentDiscount) ? percentDiscount.value = $event : null,
              prefix: "%",
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-row gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="maintenanceFee"${_scopeId}>Maintenance Fee</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "maintenanceFee",
              modelValue: unref(maintenanceFee),
              "onUpdate:modelValue": ($event) => isRef(maintenanceFee) ? maintenanceFee.value = $event : null,
              prefix: "%",
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="vat"${_scopeId}>VAT</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "vat",
              modelValue: unref(vat),
              "onUpdate:modelValue": ($event) => isRef(vat) ? vat.value = $event : null,
              prefix: "%",
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="desc"${_scopeId}>Description</label>`);
            _push2(ssrRenderComponent(_component_Textarea, {
              id: "desc",
              modelValue: unref(desc),
              "onUpdate:modelValue": ($event) => isRef(desc) ? desc.value = $event : null,
              autoResize: "",
              rows: "5",
              cols: "30",
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-row gap-3 justify-between"${_scopeId}><span class="text-xs text-gray-400"${_scopeId}> Created at: ${ssrInterpolate(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(createdAt)))}</span><span class="text-xs text-gray-400"${_scopeId}> Updated at: ${ssrInterpolate(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(updatedAt)))}</span></div></template>`);
          } else {
            return [
              createVNode("template", { class: "flex flex-col gap-3" }, [
                createVNode("div", { class: "flex flex-col gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "methodName" }, "Method Name"),
                    createVNode(_component_InputText, {
                      id: "methodName",
                      modelValue: unref(methodName),
                      "onUpdate:modelValue": ($event) => isRef(methodName) ? methodName.value = $event : null,
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-row gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "totalOfPaymentTime" }, "Total Of Payment Time"),
                    createVNode(_component_InputNumber, {
                      id: "totalOfPaymentTime",
                      modelValue: unref(totalOfPaymentTime),
                      "onUpdate:modelValue": ($event) => isRef(totalOfPaymentTime) ? totalOfPaymentTime.value = $event : null,
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "percentDiscount" }, "Discount"),
                    createVNode(_component_InputNumber, {
                      id: "percentDiscount",
                      modelValue: unref(percentDiscount),
                      "onUpdate:modelValue": ($event) => isRef(percentDiscount) ? percentDiscount.value = $event : null,
                      prefix: "%",
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-row gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "maintenanceFee" }, "Maintenance Fee"),
                    createVNode(_component_InputNumber, {
                      id: "maintenanceFee",
                      modelValue: unref(maintenanceFee),
                      "onUpdate:modelValue": ($event) => isRef(maintenanceFee) ? maintenanceFee.value = $event : null,
                      prefix: "%",
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "vat" }, "VAT"),
                    createVNode(_component_InputNumber, {
                      id: "vat",
                      modelValue: unref(vat),
                      "onUpdate:modelValue": ($event) => isRef(vat) ? vat.value = $event : null,
                      prefix: "%",
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/payment_method/ViewDetailsPaymentMethodDialog.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
  __name: "CreatePaymentMethodDialog",
  __ssrInlineRender: true,
  props: ["visible"],
  setup(__props) {
    const { visible } = __props;
    const { currentProjectID } = storeToRefs(useProjectsStore());
    const { addNewPaymentMethod: addNewPaymentMethod2 } = usePaymentMethodsStore();
    const toast2 = useToast();
    const myVisible = ref(visible);
    const totalOfPaymentTime = ref(0);
    const methodName = ref("");
    const percentDiscount = ref(0);
    const vat = ref(0);
    const maintenanceFee = ref(0);
    const desc = ref("");
    const onSave = async () => {
      const newPaymentMethodData = {
        id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1,
        project_id: currentProjectID.value,
        total_of_payment_time: totalOfPaymentTime.value,
        method_name: methodName.value,
        percent_discount: percentDiscount.value,
        vat: vat.value,
        maintenance_fee: maintenanceFee.value,
        desc: desc.value,
        created_by: 46,
        updated_by: 46,
        created_at: (/* @__PURE__ */ new Date()).toLocaleString(),
        updated_at: null
      };
      const response = await addNewPaymentMethod2(newPaymentMethodData);
      myVisible.value = false;
      if (response != null && response["result"] == "ok") {
        toast2.add({
          severity: "success",
          summary: "Success",
          detail: "Create New Payment Method Successfully!",
          group: "bl",
          life: 3e3
        });
      } else {
        toast2.add({
          severity: "danger",
          summary: "Error",
          detail: "Failed to Create New Payment Method",
          group: "bl",
          life: 3e3
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script$7;
      const _component_InputText = script$3;
      const _component_InputNumber = script$8;
      const _component_Textarea = script$9;
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
            _push2(`<div class="inline-flex items-center justify-center gap-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>Create New Payment Method</span></div>`);
          } else {
            return [
              createVNode("div", { class: "inline-flex items-center justify-center gap-2" }, [
                createVNode("span", { class: "font-bold text-xl" }, "Create New Payment Method")
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
            _push2(`<template class="flex flex-col gap-3"${_scopeId}><div class="flex flex-col gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="methodName"${_scopeId}>Method Name</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "methodName",
              placeholder: "Method name",
              modelValue: unref(methodName),
              "onUpdate:modelValue": ($event) => isRef(methodName) ? methodName.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-row gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="totalOfPaymentTime"${_scopeId}>Total Of Payment Time</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "totalOfPaymentTime",
              modelValue: unref(totalOfPaymentTime),
              "onUpdate:modelValue": ($event) => isRef(totalOfPaymentTime) ? totalOfPaymentTime.value = $event : null,
              mode: "decimal",
              min: 0
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="percentDiscount"${_scopeId}>Discount</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "percentDiscount",
              modelValue: unref(percentDiscount),
              "onUpdate:modelValue": ($event) => isRef(percentDiscount) ? percentDiscount.value = $event : null,
              mode: "decimal",
              min: 0,
              prefix: "%"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-row gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="maintenanceFee"${_scopeId}>Maintenance Fee</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "maintenanceFee",
              modelValue: unref(maintenanceFee),
              "onUpdate:modelValue": ($event) => isRef(maintenanceFee) ? maintenanceFee.value = $event : null,
              mode: "decimal",
              min: 0,
              prefix: "%"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="vat"${_scopeId}>VAT</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "vat",
              modelValue: unref(vat),
              "onUpdate:modelValue": ($event) => isRef(vat) ? vat.value = $event : null,
              mode: "decimal",
              min: 0,
              prefix: "%"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="desc"${_scopeId}>Description</label>`);
            _push2(ssrRenderComponent(_component_Textarea, {
              id: "desc",
              modelValue: unref(desc),
              "onUpdate:modelValue": ($event) => isRef(desc) ? desc.value = $event : null,
              placeholder: "Description",
              autoResize: "",
              rows: "5",
              cols: "30"
            }, null, _parent2, _scopeId));
            _push2(`</div></template>`);
          } else {
            return [
              createVNode("template", { class: "flex flex-col gap-3" }, [
                createVNode("div", { class: "flex flex-col gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "methodName" }, "Method Name"),
                    createVNode(_component_InputText, {
                      id: "methodName",
                      placeholder: "Method name",
                      modelValue: unref(methodName),
                      "onUpdate:modelValue": ($event) => isRef(methodName) ? methodName.value = $event : null
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-row gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "totalOfPaymentTime" }, "Total Of Payment Time"),
                    createVNode(_component_InputNumber, {
                      id: "totalOfPaymentTime",
                      modelValue: unref(totalOfPaymentTime),
                      "onUpdate:modelValue": ($event) => isRef(totalOfPaymentTime) ? totalOfPaymentTime.value = $event : null,
                      mode: "decimal",
                      min: 0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "percentDiscount" }, "Discount"),
                    createVNode(_component_InputNumber, {
                      id: "percentDiscount",
                      modelValue: unref(percentDiscount),
                      "onUpdate:modelValue": ($event) => isRef(percentDiscount) ? percentDiscount.value = $event : null,
                      mode: "decimal",
                      min: 0,
                      prefix: "%"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-row gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "maintenanceFee" }, "Maintenance Fee"),
                    createVNode(_component_InputNumber, {
                      id: "maintenanceFee",
                      modelValue: unref(maintenanceFee),
                      "onUpdate:modelValue": ($event) => isRef(maintenanceFee) ? maintenanceFee.value = $event : null,
                      mode: "decimal",
                      min: 0,
                      prefix: "%"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "vat" }, "VAT"),
                    createVNode(_component_InputNumber, {
                      id: "vat",
                      modelValue: unref(vat),
                      "onUpdate:modelValue": ($event) => isRef(vat) ? vat.value = $event : null,
                      mode: "decimal",
                      min: 0,
                      prefix: "%"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                  createVNode("label", { for: "desc" }, "Description"),
                  createVNode(_component_Textarea, {
                    id: "desc",
                    modelValue: unref(desc),
                    "onUpdate:modelValue": ($event) => isRef(desc) ? desc.value = $event : null,
                    placeholder: "Description",
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/payment_method/CreatePaymentMethodDialog.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "EditPaymentMethodDialog",
  __ssrInlineRender: true,
  props: ["visible"],
  setup(__props) {
    const { visible } = __props;
    const { currentPaymentMethod } = storeToRefs(usePaymentMethodsStore());
    usePaymentMethodsStore();
    const toast2 = useToast();
    const myVisible = ref(visible);
    const totalOfPaymentTime = ref(
      currentPaymentMethod.value["total_of_payment_time"]
    );
    const methodName = ref(currentPaymentMethod.value["method_name"]);
    const percentDiscount = ref(
      currentPaymentMethod.value["percent_discount"] * 10
    );
    const vat = ref(currentPaymentMethod.value["vat"] * 10);
    const maintenanceFee = ref(
      currentPaymentMethod.value["maintenance_fee"] * 10
    );
    const desc = ref(currentPaymentMethod.value["desc"]);
    const createdAt = ref(currentPaymentMethod.value["created_at"]);
    const updatedAt = ref(currentPaymentMethod.value["updated_at"]);
    const onSave = async () => {
      const newPaymentMethodData = {
        ...currentPaymentMethod.value,
        total_of_payment_time: totalOfPaymentTime.value,
        method_name: methodName.value,
        percent_discount: percentDiscount.value,
        vat: vat.value,
        maintenance_fee: maintenanceFee.value,
        updated_at: (/* @__PURE__ */ new Date()).toLocaleString()
      };
      const response = await addNewPaymentMethod(newPaymentMethodData);
      myVisible.value = false;
      if (response != null && response["result"] == "ok") {
        toast2.add({
          severity: "success",
          summary: "Success",
          detail: "Edit Payment Method Successfully!",
          group: "bl",
          life: 3e3
        });
      } else {
        toast2.add({
          severity: "danger",
          summary: "Error",
          detail: "Failed to Edit Payment Method",
          group: "bl",
          life: 3e3
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script$7;
      const _component_InputText = script$3;
      const _component_InputNumber = script$8;
      const _component_Textarea = script$9;
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
            _push2(`<div class="inline-flex items-center justify-center gap-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>Payment Method Details</span></div>`);
          } else {
            return [
              createVNode("div", { class: "inline-flex items-center justify-center gap-2" }, [
                createVNode("span", { class: "font-bold text-xl" }, "Payment Method Details")
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
            _push2(`<template class="flex flex-col gap-3"${_scopeId}><div class="flex flex-col gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="methodName"${_scopeId}>Method Name</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "methodName",
              placeholder: "Method name",
              modelValue: unref(methodName),
              "onUpdate:modelValue": ($event) => isRef(methodName) ? methodName.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-row gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="totalOfPaymentTime"${_scopeId}>Total Of Payment Time</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "totalOfPaymentTime",
              modelValue: unref(totalOfPaymentTime),
              "onUpdate:modelValue": ($event) => isRef(totalOfPaymentTime) ? totalOfPaymentTime.value = $event : null,
              mode: "decimal",
              min: 0
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="percentDiscount"${_scopeId}>Discount</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "percentDiscount",
              modelValue: unref(percentDiscount),
              "onUpdate:modelValue": ($event) => isRef(percentDiscount) ? percentDiscount.value = $event : null,
              mode: "decimal",
              min: 0,
              prefix: "%"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-row gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="maintenanceFee"${_scopeId}>Maintenance Fee</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "maintenanceFee",
              modelValue: unref(maintenanceFee),
              "onUpdate:modelValue": ($event) => isRef(maintenanceFee) ? maintenanceFee.value = $event : null,
              mode: "decimal",
              min: 0,
              prefix: "%"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="vat"${_scopeId}>VAT</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "vat",
              modelValue: unref(vat),
              "onUpdate:modelValue": ($event) => isRef(vat) ? vat.value = $event : null,
              mode: "decimal",
              min: 0,
              prefix: "%"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="desc"${_scopeId}>Description</label>`);
            _push2(ssrRenderComponent(_component_Textarea, {
              id: "desc",
              modelValue: unref(desc),
              "onUpdate:modelValue": ($event) => isRef(desc) ? desc.value = $event : null,
              placeholder: "Description",
              autoResize: "",
              rows: "5",
              cols: "30"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-row gap-3 justify-between"${_scopeId}><span class="text-xs text-gray-400"${_scopeId}> Created at: ${ssrInterpolate(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(createdAt)))}</span><span class="text-xs text-gray-400"${_scopeId}> Updated at: ${ssrInterpolate(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(updatedAt)))}</span></div></template>`);
          } else {
            return [
              createVNode("template", { class: "flex flex-col gap-3" }, [
                createVNode("div", { class: "flex flex-col gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "methodName" }, "Method Name"),
                    createVNode(_component_InputText, {
                      id: "methodName",
                      placeholder: "Method name",
                      modelValue: unref(methodName),
                      "onUpdate:modelValue": ($event) => isRef(methodName) ? methodName.value = $event : null
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-row gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "totalOfPaymentTime" }, "Total Of Payment Time"),
                    createVNode(_component_InputNumber, {
                      id: "totalOfPaymentTime",
                      modelValue: unref(totalOfPaymentTime),
                      "onUpdate:modelValue": ($event) => isRef(totalOfPaymentTime) ? totalOfPaymentTime.value = $event : null,
                      mode: "decimal",
                      min: 0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "percentDiscount" }, "Discount"),
                    createVNode(_component_InputNumber, {
                      id: "percentDiscount",
                      modelValue: unref(percentDiscount),
                      "onUpdate:modelValue": ($event) => isRef(percentDiscount) ? percentDiscount.value = $event : null,
                      mode: "decimal",
                      min: 0,
                      prefix: "%"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-row gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "maintenanceFee" }, "Maintenance Fee"),
                    createVNode(_component_InputNumber, {
                      id: "maintenanceFee",
                      modelValue: unref(maintenanceFee),
                      "onUpdate:modelValue": ($event) => isRef(maintenanceFee) ? maintenanceFee.value = $event : null,
                      mode: "decimal",
                      min: 0,
                      prefix: "%"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "vat" }, "VAT"),
                    createVNode(_component_InputNumber, {
                      id: "vat",
                      modelValue: unref(vat),
                      "onUpdate:modelValue": ($event) => isRef(vat) ? vat.value = $event : null,
                      mode: "decimal",
                      min: 0,
                      prefix: "%"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                  createVNode("label", { for: "desc" }, "Description"),
                  createVNode(_component_Textarea, {
                    id: "desc",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/payment_method/EditPaymentMethodDialog.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "DeletePaymentMethodDialog",
  __ssrInlineRender: true,
  props: ["visible"],
  setup(__props) {
    const { visible } = __props;
    const { currentPaymentMethod } = storeToRefs(usePaymentMethodsStore());
    const { deletePaymentMethod } = usePaymentMethodsStore();
    const myVisible = ref(visible);
    const onDelete = async () => {
      const response = await deletePaymentMethod(currentPaymentMethod);
      myVisible.value = false;
      if (response != null && response["result"] == "ok") {
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Delete Payment Method Successfully!",
          group: "bl",
          life: 3e3
        });
      } else {
        toast.add({
          severity: "danger",
          summary: "Error",
          detail: "Failed to Delete Payment Method",
          group: "bl",
          life: 3e3
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script$7;
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
            _push2(`<div class="inline-flex items-center justify-center gap-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>Delete Payment Method?</span></div>`);
          } else {
            return [
              createVNode("div", { class: "inline-flex items-center justify-center gap-2" }, [
                createVNode("span", { class: "font-bold text-xl" }, "Delete Payment Method?")
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
            _push2(`<div${_scopeId}><span${_scopeId}> This will delete payment method <b${_scopeId}>${ssrInterpolate(unref(currentPaymentMethod)["method_name"])}</b> permanently! </span><span${_scopeId}>You cannot undo this action!</span></div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode("span", null, [
                  createTextVNode(" This will delete payment method "),
                  createVNode("b", null, toDisplayString(unref(currentPaymentMethod)["method_name"]), 1),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/payment_method/DeletePaymentMethodDialog.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { paymentMethods, currentPaymentMethod } = storeToRefs(
      usePaymentMethodsStore()
    );
    const { getPaymentMethods } = usePaymentMethodsStore();
    const { allProjectIDs } = storeToRefs(useProjectsStore());
    [__temp, __restore] = withAsyncContext(() => getPaymentMethods()), await __temp, __restore();
    const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    const viewDetailsPaymentMethodDialogVisible = ref(false);
    const createPaymentMethodDialogVisible = ref(false);
    const editPaymentMethodDialogVisible = ref(false);
    const deletePaymentMethodDialogVisible = ref(false);
    const toggleViewPaymentMethodDetails = async (data) => {
      currentPaymentMethod.value = data;
      viewDetailsPaymentMethodDialogVisible.value = !viewDetailsPaymentMethodDialogVisible.value;
    };
    const toggleEditPaymentMethod = async (data) => {
      currentPaymentMethod.value = data;
      editPaymentMethodDialogVisible.value = !editPaymentMethodDialogVisible.value;
    };
    const toggleDeletePaymentMethod = async (data) => {
      currentPaymentMethod.value = data;
      deletePaymentMethodDialogVisible.value = !deletePaymentMethodDialogVisible.value;
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
      const _component_ViewDetailsPaymentMethodDialog = _sfc_main$4;
      const _component_CreatePaymentMethodDialog = _sfc_main$3;
      const _component_EditPaymentMethodDialog = _sfc_main$2;
      const _component_DeletePaymentMethodDialog = _sfc_main$1;
      const _directive_auto_animate = resolveDirective("auto-animate");
      _push(`<!--[--><div class="w-full h-full flex flex-col"><div class="fixed right-0 top-0 z-50 backdrop-blur-xl w-5/6 h-[8%] px-4 border-b flex justify-between items-center"><div class="flex items-center gap-2"><span class="font-semibold text-lg">Payment Method</span>`);
      _push(ssrRenderComponent(_component_Tag, {
        value: unref(paymentMethods).length
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
              placeholder: "Filter payment method..."
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
                placeholder: "Filter payment method..."
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Button, {
        size: "small",
        label: "New",
        onClick: ($event) => createPaymentMethodDialogVisible.value = !unref(createPaymentMethodDialogVisible)
      }, null, _parent));
      _push(`</div></div><div class="absolute top-[8%] w-full h-[92%]">`);
      _push(ssrRenderComponent(_component_DataTable, mergeProps({
        value: unref(paymentMethods),
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
            _push2(`<div class="flex justify-center items-center"${_scopeId}><span${_scopeId}>No payment method found.</span></div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-center items-center" }, [
                createVNode("span", null, "No payment method found.")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Column, {
              field: "method_name",
              header: "Name"
            }, {
              body: withCtx(({ data }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(data["method_name"])}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(data["method_name"]), 1)
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
                  _push3(`${ssrInterpolate(("hideLongText" in _ctx ? _ctx.hideLongText : unref(hideLongText))(data["desc"]))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(("hideLongText" in _ctx ? _ctx.hideLongText : unref(hideLongText))(data["desc"])), 1)
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
                    onClick: ($event) => toggleViewPaymentMethodDetails(data)
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
                    onClick: ($event) => toggleEditPaymentMethod(data)
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
                    onClick: ($event) => toggleDeletePaymentMethod(data)
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
                  return [
                    createVNode(_component_Button, {
                      text: "",
                      severity: "secondary",
                      onClick: ($event) => toggleViewPaymentMethodDetails(data)
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, { name: "mdi:eye-outline" })
                      ]),
                      _: 2
                    }, 1032, ["onClick"]),
                    createVNode(_component_Button, {
                      text: "",
                      severity: "secondary",
                      onClick: ($event) => toggleEditPaymentMethod(data)
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, { name: "mdi:edit-outline" })
                      ]),
                      _: 2
                    }, 1032, ["onClick"]),
                    createVNode(_component_Button, {
                      text: "",
                      severity: "danger",
                      onClick: ($event) => toggleDeletePaymentMethod(data)
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, { name: "mdi:delete-outline" })
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
                field: "method_name",
                header: "Name"
              }, {
                body: withCtx(({ data }) => [
                  createTextVNode(toDisplayString(data["method_name"]), 1)
                ]),
                _: 1
              }),
              createVNode(_component_Column, {
                field: "desc",
                header: "Description"
              }, {
                body: withCtx(({ data }) => [
                  createTextVNode(toDisplayString(("hideLongText" in _ctx ? _ctx.hideLongText : unref(hideLongText))(data["desc"])), 1)
                ]),
                _: 1
              }),
              createVNode(_component_Column, { header: "Actions" }, {
                body: withCtx(({ data }) => [
                  createVNode(_component_Button, {
                    text: "",
                    severity: "secondary",
                    onClick: ($event) => toggleViewPaymentMethodDetails(data)
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, { name: "mdi:eye-outline" })
                    ]),
                    _: 2
                  }, 1032, ["onClick"]),
                  createVNode(_component_Button, {
                    text: "",
                    severity: "secondary",
                    onClick: ($event) => toggleEditPaymentMethod(data)
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, { name: "mdi:edit-outline" })
                    ]),
                    _: 2
                  }, 1032, ["onClick"]),
                  createVNode(_component_Button, {
                    text: "",
                    severity: "danger",
                    onClick: ($event) => toggleDeletePaymentMethod(data)
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, { name: "mdi:delete-outline" })
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
      if (unref(viewDetailsPaymentMethodDialogVisible)) {
        _push(ssrRenderComponent(_component_ViewDetailsPaymentMethodDialog, {
          visible: unref(viewDetailsPaymentMethodDialogVisible),
          allProjectIDs: unref(allProjectIDs)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(createPaymentMethodDialogVisible)) {
        _push(ssrRenderComponent(_component_CreatePaymentMethodDialog, {
          visible: unref(createPaymentMethodDialogVisible),
          allProjectIDs: unref(allProjectIDs)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(editPaymentMethodDialogVisible)) {
        _push(ssrRenderComponent(_component_EditPaymentMethodDialog, {
          visible: unref(editPaymentMethodDialogVisible),
          allProjectIDs: unref(allProjectIDs)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(deletePaymentMethodDialogVisible)) {
        _push(ssrRenderComponent(_component_DeletePaymentMethodDialog, { visible: unref(deletePaymentMethodDialogVisible) }, null, _parent));
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/project_details/payment_method/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DzooPbtt.mjs.map
