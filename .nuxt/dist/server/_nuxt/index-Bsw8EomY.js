import script$6 from "./tag.esm-Bkya-FxV.js";
import script$7 from "./iconfield.esm-CMjnwUAR.js";
import script$8 from "./inputicon.esm-DsrGfACI.js";
import __nuxt_component_1 from "./Icon-B04GAuZ4.js";
import script$9 from "./inputtext.esm-Blvd_dSV.js";
import script$5 from "./button.esm-D8sVcJb8.js";
import script$1 from "./dropdown.esm-BZz-eegH.js";
import script$a from "./datatable.esm-BAh19VmC.js";
import script$b from "./column.esm-KktM_xTo.js";
import script$c from "./knob.esm-CiupXrSq.js";
import script from "./dialog.esm-Wemb0g_v.js";
import script$2 from "./inputnumber.esm-CMvh_h4P.js";
import script$3 from "./textarea.esm-r2lUF_RZ.js";
import script$4 from "./inputswitch.esm-QEGDpbo-.js";
import { ref, mergeProps, unref, isRef, withCtx, createVNode, toDisplayString, useSSRContext, withAsyncContext, computed, resolveDirective, createTextVNode } from "vue";
import "hookable";
import "destr";
import "klona";
import "devalue";
import "#internal/nuxt/paths";
import { s as storeToRefs, u as useToast, F as FilterMatchMode } from "../server.mjs";
import { u as usePaymentMethodsStore } from "./payment-method-store-B-s5UmN8.js";
import { u as usePaymentMethodsProcessStore } from "./payment-method-process-store-Dt8EidVY.js";
import { a as convertDateTime } from "./core_utils-WJ_cJnbk.js";
import { ssrRenderComponent, ssrInterpolate, ssrGetDirectiveProps } from "vue/server-renderer";
import "./basecomponent.esm-DXWDIfdj.js";
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
import "./index.esm-ByqdG2PS.js";
import "./index.esm-Dpdcp6OZ.js";
import "./index.esm-CE-esNCM.js";
import "./index.esm-C03T_CK6.js";
import "./index.esm-Cs4cT7wr.js";
import "./checkbox.esm-Duuim8Iu.js";
import "./radiobutton.esm-CQ1mq00b.js";
import "./index.esm-BvZNBu0f.js";
import "./index.esm-DTIot6dj.js";
import "./fetch-DXSGE_KZ.js";
import "./projects-store-50IgnX7b.js";
const _sfc_main$4 = {
  __name: "ViewDetailsPaymentMethodProcessDialog",
  __ssrInlineRender: true,
  props: ["visible"],
  setup(__props) {
    var _a, _b, _c, _d;
    const { visible } = __props;
    const { paymentMethodsDropdown } = storeToRefs(usePaymentMethodsStore());
    usePaymentMethodsStore();
    const { currentPaymentMethodProcess } = storeToRefs(
      usePaymentMethodsProcessStore()
    );
    const myVisible = ref(visible);
    const paymentMethod = ref({
      name: (_b = (_a = paymentMethodsDropdown.value.filter(
        (payment) => payment["value"] == currentPaymentMethodProcess.value["payment_method_id"]
      )) == null ? void 0 : _a[0]) == null ? void 0 : _b["name"],
      value: (_d = (_c = paymentMethodsDropdown.value.filter(
        (payment) => payment["value"] == currentPaymentMethodProcess.value["payment_method_id"]
      )) == null ? void 0 : _c[0]) == null ? void 0 : _d["value"]
    });
    const paymentTimeExample = ref(
      currentPaymentMethodProcess.value["payment_time_example"]
    );
    const flagTime = ref(currentPaymentMethodProcess.value["flag_time"]);
    const includeVAT = ref(currentPaymentMethodProcess.value["include_vat"]);
    const totalPercentPayment = ref(
      currentPaymentMethodProcess.value["total_percent_payment"]
    );
    const desc = ref(currentPaymentMethodProcess.value["desc"]);
    const createdAt = ref(currentPaymentMethodProcess.value["created_at"]);
    const updatedAt = ref(currentPaymentMethodProcess.value["updated_at"]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script;
      const _component_Dropdown = script$1;
      const _component_InputNumber = script$2;
      const _component_Textarea = script$3;
      const _component_InputSwitch = script$4;
      const _component_Button = script$5;
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
            _push2(`<div class="inline-flex items-center justify-center gap-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>Payment Process Details</span></div>`);
          } else {
            return [
              createVNode("div", { class: "inline-flex items-center justify-center gap-2" }, [
                createVNode("span", { class: "font-bold text-xl" }, "Payment Process Details")
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
            _push2(`<template class="flex flex-col gap-3"${_scopeId}><div class="flex gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="paymentMethod"${_scopeId}>Payment Method</label>`);
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
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="paymentTimeExample"${_scopeId}>Payment Time Example</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "paymentTimeExample",
              modelValue: unref(paymentTimeExample),
              "onUpdate:modelValue": ($event) => isRef(paymentTimeExample) ? paymentTimeExample.value = $event : null,
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="flagTime"${_scopeId}>Flag Time</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "flagTime",
              modelValue: unref(flagTime),
              "onUpdate:modelValue": ($event) => isRef(flagTime) ? flagTime.value = $event : null,
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="totalPercentPayment"${_scopeId}>Total Percent Payment</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "totalPercentPayment",
              modelValue: unref(totalPercentPayment),
              "onUpdate:modelValue": ($event) => isRef(totalPercentPayment) ? totalPercentPayment.value = $event : null,
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
            _push2(`</div><div class="flex flex-1 flex-col gap-2 items-end"${_scopeId}><label for="includeVAT"${_scopeId}>Include VAT</label>`);
            _push2(ssrRenderComponent(_component_InputSwitch, {
              id: "includeVAT",
              modelValue: unref(includeVAT),
              "onUpdate:modelValue": ($event) => isRef(includeVAT) ? includeVAT.value = $event : null,
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-row gap-3 justify-between"${_scopeId}><span class="text-xs text-gray-400"${_scopeId}> Created at: ${ssrInterpolate(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(createdAt)))}</span><span class="text-xs text-gray-400"${_scopeId}> Updated at: ${ssrInterpolate(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(updatedAt)))}</span></div></template>`);
          } else {
            return [
              createVNode("template", { class: "flex flex-col gap-3" }, [
                createVNode("div", { class: "flex gap-3" }, [
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
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "paymentTimeExample" }, "Payment Time Example"),
                    createVNode(_component_InputNumber, {
                      id: "paymentTimeExample",
                      modelValue: unref(paymentTimeExample),
                      "onUpdate:modelValue": ($event) => isRef(paymentTimeExample) ? paymentTimeExample.value = $event : null,
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "flagTime" }, "Flag Time"),
                    createVNode(_component_InputNumber, {
                      id: "flagTime",
                      modelValue: unref(flagTime),
                      "onUpdate:modelValue": ($event) => isRef(flagTime) ? flagTime.value = $event : null,
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "totalPercentPayment" }, "Total Percent Payment"),
                    createVNode(_component_InputNumber, {
                      id: "totalPercentPayment",
                      modelValue: unref(totalPercentPayment),
                      "onUpdate:modelValue": ($event) => isRef(totalPercentPayment) ? totalPercentPayment.value = $event : null,
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
                createVNode("div", { class: "flex flex-1 flex-col gap-2 items-end" }, [
                  createVNode("label", { for: "includeVAT" }, "Include VAT"),
                  createVNode(_component_InputSwitch, {
                    id: "includeVAT",
                    modelValue: unref(includeVAT),
                    "onUpdate:modelValue": ($event) => isRef(includeVAT) ? includeVAT.value = $event : null,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/payment_method_process/ViewDetailsPaymentMethodProcessDialog.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
  __name: "CreatePaymentMethodProcessDialog",
  __ssrInlineRender: true,
  props: ["visible"],
  setup(__props) {
    const { visible } = __props;
    const { paymentMethodsDropdown } = storeToRefs(usePaymentMethodsStore());
    usePaymentMethodsStore();
    const { addNewPaymentMethodProcess } = usePaymentMethodsProcessStore();
    const toast = useToast();
    const myVisible = ref(visible);
    const paymentMethod = ref({});
    const paymentTimeExample = ref(0);
    const flagTime = ref(0);
    const includeVAT = ref(false);
    const totalPercentPayment = ref(0);
    const desc = ref("");
    const onSave = async () => {
      const newPaymentMethodProcessData = {
        id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1,
        payment_method_id: paymentMethod.value.value,
        payment_time_example: parseInt(paymentTimeExample.value),
        flag_time: parseInt(flagTime.value),
        include_vat: includeVAT.value,
        total_percent_payment: parseInt(totalPercentPayment.value),
        desc: desc.value,
        created_by: 46,
        updated_by: 46,
        created_at: (/* @__PURE__ */ new Date()).toLocaleString(),
        updated_at: null
      };
      const response = await addNewPaymentMethodProcess(
        newPaymentMethodProcessData
      );
      myVisible.value = false;
      if (response != null && response["result"] == "ok") {
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Create New Payment Process Successfully!",
          group: "bl",
          life: 3e3
        });
      } else {
        toast.add({
          severity: "danger",
          summary: "Error",
          detail: "Failed to Create New Payment Process",
          group: "bl",
          life: 3e3
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script;
      const _component_Dropdown = script$1;
      const _component_InputNumber = script$2;
      const _component_Textarea = script$3;
      const _component_InputSwitch = script$4;
      const _component_Button = script$5;
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
            _push2(`<div class="inline-flex items-center justify-center gap-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>Create New Payment Process</span></div>`);
          } else {
            return [
              createVNode("div", { class: "inline-flex items-center justify-center gap-2" }, [
                createVNode("span", { class: "font-bold text-xl" }, "Create New Payment Process")
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
            _push2(`<template class="flex flex-col gap-3"${_scopeId}><div class="flex gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="paymentMethod"${_scopeId}>Payment Method</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "paymentMethod",
              modelValue: unref(paymentMethod),
              "onUpdate:modelValue": ($event) => isRef(paymentMethod) ? paymentMethod.value = $event : null,
              placeholder: "Select Payment Method",
              options: unref(paymentMethodsDropdown),
              optionLabel: "name",
              optionValue: "value"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="paymentTimeExample"${_scopeId}>Payment Time Example</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "paymentTimeExample",
              modelValue: unref(paymentTimeExample),
              "onUpdate:modelValue": ($event) => isRef(paymentTimeExample) ? paymentTimeExample.value = $event : null,
              min: 0
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="flagTime"${_scopeId}>Flag Time</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "flagTime",
              modelValue: unref(flagTime),
              "onUpdate:modelValue": ($event) => isRef(flagTime) ? flagTime.value = $event : null,
              min: 0
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="totalPercentPayment"${_scopeId}>Total Percent Payment</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "totalPercentPayment",
              modelValue: unref(totalPercentPayment),
              "onUpdate:modelValue": ($event) => isRef(totalPercentPayment) ? totalPercentPayment.value = $event : null,
              prefix: "%",
              min: 0
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="desc"${_scopeId}>Description</label>`);
            _push2(ssrRenderComponent(_component_Textarea, {
              id: "desc",
              modelValue: unref(desc),
              "onUpdate:modelValue": ($event) => isRef(desc) ? desc.value = $event : null,
              autoResize: "",
              rows: "5",
              cols: "30"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2 items-end"${_scopeId}><label for="includeVAT"${_scopeId}>Include VAT</label>`);
            _push2(ssrRenderComponent(_component_InputSwitch, {
              id: "includeVAT",
              modelValue: unref(includeVAT),
              "onUpdate:modelValue": ($event) => isRef(includeVAT) ? includeVAT.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(`</div></template>`);
          } else {
            return [
              createVNode("template", { class: "flex flex-col gap-3" }, [
                createVNode("div", { class: "flex gap-3" }, [
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
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "paymentTimeExample" }, "Payment Time Example"),
                    createVNode(_component_InputNumber, {
                      id: "paymentTimeExample",
                      modelValue: unref(paymentTimeExample),
                      "onUpdate:modelValue": ($event) => isRef(paymentTimeExample) ? paymentTimeExample.value = $event : null,
                      min: 0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "flagTime" }, "Flag Time"),
                    createVNode(_component_InputNumber, {
                      id: "flagTime",
                      modelValue: unref(flagTime),
                      "onUpdate:modelValue": ($event) => isRef(flagTime) ? flagTime.value = $event : null,
                      min: 0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "totalPercentPayment" }, "Total Percent Payment"),
                    createVNode(_component_InputNumber, {
                      id: "totalPercentPayment",
                      modelValue: unref(totalPercentPayment),
                      "onUpdate:modelValue": ($event) => isRef(totalPercentPayment) ? totalPercentPayment.value = $event : null,
                      prefix: "%",
                      min: 0
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
                    cols: "30"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "flex flex-1 flex-col gap-2 items-end" }, [
                  createVNode("label", { for: "includeVAT" }, "Include VAT"),
                  createVNode(_component_InputSwitch, {
                    id: "includeVAT",
                    modelValue: unref(includeVAT),
                    "onUpdate:modelValue": ($event) => isRef(includeVAT) ? includeVAT.value = $event : null
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/payment_method_process/CreatePaymentMethodProcessDialog.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "EditPaymentMethodProcessDialog",
  __ssrInlineRender: true,
  props: ["visible"],
  setup(__props) {
    var _a, _b, _c, _d;
    const { visible } = __props;
    const { paymentMethodsDropdown } = storeToRefs(usePaymentMethodsStore());
    usePaymentMethodsStore();
    const { currentPaymentMethodProcess } = storeToRefs(
      usePaymentMethodsProcessStore()
    );
    const { editPaymentMethodProcess } = usePaymentMethodsProcessStore();
    const toast = useToast();
    const myVisible = ref(visible);
    const paymentMethod = ref({
      name: (_b = (_a = paymentMethodsDropdown.value.filter(
        (payment) => payment["value"] == currentPaymentMethodProcess.value["payment_method_id"]
      )) == null ? void 0 : _a[0]) == null ? void 0 : _b["name"],
      value: (_d = (_c = paymentMethodsDropdown.value.filter(
        (payment) => payment["value"] == currentPaymentMethodProcess.value["payment_method_id"]
      )) == null ? void 0 : _c[0]) == null ? void 0 : _d["value"]
    });
    const paymentTimeExample = ref(
      currentPaymentMethodProcess.value["payment_time_example"]
    );
    const flagTime = ref(currentPaymentMethodProcess.value["flag_time"]);
    const includeVAT = ref(currentPaymentMethodProcess.value["include_vat"]);
    const totalPercentPayment = ref(
      currentPaymentMethodProcess.value["total_percent_payment"]
    );
    const desc = ref(currentPaymentMethodProcess.value["desc"]);
    const createdAt = ref(currentPaymentMethodProcess.value["created_at"]);
    const updatedAt = ref(currentPaymentMethodProcess.value["updated_at"]);
    const onSave = async () => {
      const newPaymentMethodProcessData = {
        ...currentPaymentMethodProcess.value,
        payment_method_id: paymentMethod.value.value,
        payment_time_example: parseInt(paymentTimeExample.value),
        flag_time: parseInt(flagTime.value),
        include_vat: includeVAT.value,
        total_percent_payment: parseInt(totalPercentPayment.value),
        desc: desc.value,
        updated_at: (/* @__PURE__ */ new Date()).toLocaleString()
      };
      const response = await editPaymentMethodProcess(
        newPaymentMethodProcessData
      );
      myVisible.value = false;
      if (response != null && response["result"] == "ok") {
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Edit Payment Process Successfully!",
          group: "bl",
          life: 3e3
        });
      } else {
        toast.add({
          severity: "danger",
          summary: "Error",
          detail: "Failed to Edit Payment Process",
          group: "bl",
          life: 3e3
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script;
      const _component_Dropdown = script$1;
      const _component_InputNumber = script$2;
      const _component_Textarea = script$3;
      const _component_InputSwitch = script$4;
      const _component_Button = script$5;
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
            _push2(`<div class="inline-flex items-center justify-center gap-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>Payment Process Details</span></div>`);
          } else {
            return [
              createVNode("div", { class: "inline-flex items-center justify-center gap-2" }, [
                createVNode("span", { class: "font-bold text-xl" }, "Payment Process Details")
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
            _push2(`<template class="flex flex-col gap-3"${_scopeId}><div class="flex gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="paymentMethod"${_scopeId}>Payment Method</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "paymentMethod",
              modelValue: unref(paymentMethod).value,
              "onUpdate:modelValue": ($event) => unref(paymentMethod).value = $event,
              placeholder: "Select Payment Method",
              options: unref(paymentMethodsDropdown),
              optionLabel: "name",
              optionValue: "value"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="paymentTimeExample"${_scopeId}>Payment Time Example</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "paymentTimeExample",
              modelValue: unref(paymentTimeExample),
              "onUpdate:modelValue": ($event) => isRef(paymentTimeExample) ? paymentTimeExample.value = $event : null,
              min: 0
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="flagTime"${_scopeId}>Flag Time</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "flagTime",
              modelValue: unref(flagTime),
              "onUpdate:modelValue": ($event) => isRef(flagTime) ? flagTime.value = $event : null,
              min: 0
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="totalPercentPayment"${_scopeId}>Total Percent Payment</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              id: "totalPercentPayment",
              modelValue: unref(totalPercentPayment),
              "onUpdate:modelValue": ($event) => isRef(totalPercentPayment) ? totalPercentPayment.value = $event : null,
              prefix: "%",
              min: 0
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="desc"${_scopeId}>Description</label>`);
            _push2(ssrRenderComponent(_component_Textarea, {
              id: "desc",
              modelValue: unref(desc),
              "onUpdate:modelValue": ($event) => isRef(desc) ? desc.value = $event : null,
              autoResize: "",
              rows: "5",
              cols: "30"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2 items-end"${_scopeId}><label for="includeVAT"${_scopeId}>Include VAT</label>`);
            _push2(ssrRenderComponent(_component_InputSwitch, {
              id: "includeVAT",
              modelValue: unref(includeVAT),
              "onUpdate:modelValue": ($event) => isRef(includeVAT) ? includeVAT.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-row gap-3 justify-between"${_scopeId}><span class="text-xs text-gray-400"${_scopeId}> Created at: ${ssrInterpolate(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(createdAt)))}</span><span class="text-xs text-gray-400"${_scopeId}> Updated at: ${ssrInterpolate(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(updatedAt)))}</span></div></template>`);
          } else {
            return [
              createVNode("template", { class: "flex flex-col gap-3" }, [
                createVNode("div", { class: "flex gap-3" }, [
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
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "paymentTimeExample" }, "Payment Time Example"),
                    createVNode(_component_InputNumber, {
                      id: "paymentTimeExample",
                      modelValue: unref(paymentTimeExample),
                      "onUpdate:modelValue": ($event) => isRef(paymentTimeExample) ? paymentTimeExample.value = $event : null,
                      min: 0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "flagTime" }, "Flag Time"),
                    createVNode(_component_InputNumber, {
                      id: "flagTime",
                      modelValue: unref(flagTime),
                      "onUpdate:modelValue": ($event) => isRef(flagTime) ? flagTime.value = $event : null,
                      min: 0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "totalPercentPayment" }, "Total Percent Payment"),
                    createVNode(_component_InputNumber, {
                      id: "totalPercentPayment",
                      modelValue: unref(totalPercentPayment),
                      "onUpdate:modelValue": ($event) => isRef(totalPercentPayment) ? totalPercentPayment.value = $event : null,
                      prefix: "%",
                      min: 0
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
                    cols: "30"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "flex flex-1 flex-col gap-2 items-end" }, [
                  createVNode("label", { for: "includeVAT" }, "Include VAT"),
                  createVNode(_component_InputSwitch, {
                    id: "includeVAT",
                    modelValue: unref(includeVAT),
                    "onUpdate:modelValue": ($event) => isRef(includeVAT) ? includeVAT.value = $event : null
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/payment_method_process/EditPaymentMethodProcessDialog.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "DeletePaymentMethodProcessDialog",
  __ssrInlineRender: true,
  props: ["visible"],
  setup(__props) {
    const { visible } = __props;
    const { currentPaymentMethodProcess } = storeToRefs(
      usePaymentMethodsProcessStore()
    );
    const { deletePaymentMethodProcess } = usePaymentMethodsProcessStore();
    const toast = useToast();
    const myVisible = ref(visible);
    const onDelete = async () => {
      const response = await deletePaymentMethodProcess(
        currentPaymentMethodProcess
      );
      myVisible.value = false;
      if (response != null && response["result"] == "ok") {
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Delete Payment Process Successfully!",
          group: "bl",
          life: 3e3
        });
      } else {
        toast.add({
          severity: "danger",
          summary: "Error",
          detail: "Failed to Delete Payment Process",
          group: "bl",
          life: 3e3
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script;
      const _component_Button = script$5;
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
            _push2(`<div class="inline-flex items-center justify-center gap-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>Delete Payment Process?</span></div>`);
          } else {
            return [
              createVNode("div", { class: "inline-flex items-center justify-center gap-2" }, [
                createVNode("span", { class: "font-bold text-xl" }, "Delete Payment Process?")
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
            _push2(`<div${_scopeId}><span${_scopeId}> This will delete this payment process permanently! </span><span${_scopeId}>You cannot undo this action!</span></div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode("span", null, " This will delete this payment process permanently! "),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/payment_method_process/DeletePaymentMethodProcessDialog.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a, _b;
    let __temp, __restore;
    const { paymentMethods, paymentMethodsDropdown } = storeToRefs(
      usePaymentMethodsStore()
    );
    const { getPaymentMethods } = usePaymentMethodsStore();
    const { paymentMethodsProcess, currentPaymentMethodProcess } = storeToRefs(
      usePaymentMethodsProcessStore()
    );
    const { getPaymentMethodsProcess } = usePaymentMethodsProcessStore();
    [__temp, __restore] = withAsyncContext(() => getPaymentMethods()), await __temp, __restore();
    [__temp, __restore] = withAsyncContext(() => getPaymentMethodsProcess()), await __temp, __restore();
    const currentPaymentMethod = ref({
      name: ((_a = paymentMethods.value[0]) == null ? void 0 : _a["method_name"]) ?? "",
      value: `${(_b = paymentMethods.value[0]) == null ? void 0 : _b["id"]}` ?? ""
    });
    const myPaymentMethodsProcessBaseOnPMId = computed(() => {
      return paymentMethodsProcess.value.filter((process) => {
        return process["payment_method_id"] == currentPaymentMethod.value.value;
      });
    });
    const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    const viewDetailsPaymentMethodProcessDialogVisible = ref(false);
    const createPaymentMethodProcessDialogVisible = ref(false);
    const editPaymentMethodProcessDialogVisible = ref(false);
    const deletePaymentMethodProcessDialogVisible = ref(false);
    const handleDropdown = (event) => {
      myPaymentMethodsProcessBaseOnPMId.value = paymentMethodsProcess.value.filter((process) => {
        return process["payment_method_id"] == event.value;
      });
    };
    const toggleViewDetailsPaymentMethodProcess = (data) => {
      currentPaymentMethodProcess.value = data;
      viewDetailsPaymentMethodProcessDialogVisible.value = !viewDetailsPaymentMethodProcessDialogVisible.value;
    };
    const toggleEditPaymentMethodProcess = (data) => {
      currentPaymentMethodProcess.value = data;
      editPaymentMethodProcessDialogVisible.value = !editPaymentMethodProcessDialogVisible.value;
    };
    const toggleDeletePaymentMethodProcess = async (data) => {
      currentPaymentMethodProcess.value = data;
      deletePaymentMethodProcessDialogVisible.value = !deletePaymentMethodProcessDialogVisible.value;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Tag = script$6;
      const _component_IconField = script$7;
      const _component_InputIcon = script$8;
      const _component_Icon = __nuxt_component_1;
      const _component_InputText = script$9;
      const _component_Button = script$5;
      const _component_Dropdown = script$1;
      const _component_DataTable = script$a;
      const _component_Column = script$b;
      const _component_Knob = script$c;
      const _component_ViewDetailsPaymentMethodProcessDialog = _sfc_main$4;
      const _component_CreatePaymentMethodProcessDialog = _sfc_main$3;
      const _component_EditPaymentMethodProcessDialog = _sfc_main$2;
      const _component_DeletePaymentMethodProcessDialog = _sfc_main$1;
      const _directive_auto_animate = resolveDirective("auto-animate");
      _push(`<!--[--><div class="w-full h-full flex flex-col"><div class="fixed right-0 top-0 z-50 backdrop-blur-xl w-5/6 h-[8%] px-4 border-b flex justify-between items-center"><div class="flex items-center gap-2"><span class="font-semibold text-lg">Payment Process</span>`);
      _push(ssrRenderComponent(_component_Tag, {
        value: unref(myPaymentMethodsProcessBaseOnPMId).length
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
              placeholder: "Filter Payment Method Process..."
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
                placeholder: "Filter Payment Method Process..."
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Button, {
        size: "small",
        label: "New",
        onClick: ($event) => createPaymentMethodProcessDialogVisible.value = !unref(createPaymentMethodProcessDialogVisible)
      }, null, _parent));
      _push(`</div></div><div class="fixed right-0 top-[8%] z-50 backdrop-blur-xl w-5/6 h-[8%] px-4 border-b flex justify-between items-center"><div class="flex items-center gap-2"><label for="currentPaymentMethod" class="font-semibold text-lg">Current Payment Method: </label>`);
      _push(ssrRenderComponent(_component_Dropdown, {
        id: "currentPaymentMethod",
        placeholder: "Select Payment Method",
        modelValue: unref(currentPaymentMethod).value,
        "onUpdate:modelValue": ($event) => unref(currentPaymentMethod).value = $event,
        options: unref(paymentMethodsDropdown),
        optionLabel: "name",
        optionValue: "value",
        onChange: (event) => handleDropdown(event)
      }, null, _parent));
      _push(`</div></div><div class="absolute top-[16%] w-full h-[92%]">`);
      _push(ssrRenderComponent(_component_DataTable, mergeProps({
        value: unref(myPaymentMethodsProcessBaseOnPMId),
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
            _push2(`<div class="flex justify-center items-center"${_scopeId}><span${_scopeId}>No Payment Process Found.</span></div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-center items-center" }, [
                createVNode("span", null, "No Payment Process Found.")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Column, {
              field: "payment_time_example",
              header: "Payment Time Example",
              sortable: ""
            }, {
              body: withCtx(({ data }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(data["payment_time_example"])}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(data["payment_time_example"]), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Column, {
              field: "include_vat",
              header: "Include VAT"
            }, {
              body: withCtx(({ data }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(data["include_vat"] == true ? "Yes" : "No")}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(data["include_vat"] == true ? "Yes" : "No"), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Column, {
              field: "total_percent_payment",
              header: "Total payment",
              sortable: ""
            }, {
              body: withCtx(({ data }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Knob, {
                    modelValue: data["total_percent_payment"],
                    "onUpdate:modelValue": ($event) => data["total_percent_payment"] = $event,
                    readonly: "",
                    size: 50
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Knob, {
                      modelValue: data["total_percent_payment"],
                      "onUpdate:modelValue": ($event) => data["total_percent_payment"] = $event,
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
                    onClick: ($event) => toggleViewDetailsPaymentMethodProcess(data)
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
                    onClick: ($event) => toggleEditPaymentMethodProcess(data)
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
                    onClick: ($event) => toggleDeletePaymentMethodProcess(data)
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
                      onClick: ($event) => toggleViewDetailsPaymentMethodProcess(data)
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, { name: "mdi:eye-outline" })
                      ]),
                      _: 2
                    }, 1032, ["onClick"]),
                    createVNode(_component_Button, {
                      text: "",
                      severity: "secondary",
                      onClick: ($event) => toggleEditPaymentMethodProcess(data)
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, { name: "mdi:edit-outline" })
                      ]),
                      _: 2
                    }, 1032, ["onClick"]),
                    createVNode(_component_Button, {
                      text: "",
                      severity: "danger",
                      onClick: ($event) => toggleDeletePaymentMethodProcess(data)
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
                field: "payment_time_example",
                header: "Payment Time Example",
                sortable: ""
              }, {
                body: withCtx(({ data }) => [
                  createTextVNode(toDisplayString(data["payment_time_example"]), 1)
                ]),
                _: 1
              }),
              createVNode(_component_Column, {
                field: "include_vat",
                header: "Include VAT"
              }, {
                body: withCtx(({ data }) => [
                  createTextVNode(toDisplayString(data["include_vat"] == true ? "Yes" : "No"), 1)
                ]),
                _: 1
              }),
              createVNode(_component_Column, {
                field: "total_percent_payment",
                header: "Total payment",
                sortable: ""
              }, {
                body: withCtx(({ data }) => [
                  createVNode(_component_Knob, {
                    modelValue: data["total_percent_payment"],
                    "onUpdate:modelValue": ($event) => data["total_percent_payment"] = $event,
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
                    onClick: ($event) => toggleViewDetailsPaymentMethodProcess(data)
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, { name: "mdi:eye-outline" })
                    ]),
                    _: 2
                  }, 1032, ["onClick"]),
                  createVNode(_component_Button, {
                    text: "",
                    severity: "secondary",
                    onClick: ($event) => toggleEditPaymentMethodProcess(data)
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, { name: "mdi:edit-outline" })
                    ]),
                    _: 2
                  }, 1032, ["onClick"]),
                  createVNode(_component_Button, {
                    text: "",
                    severity: "danger",
                    onClick: ($event) => toggleDeletePaymentMethodProcess(data)
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
      if (unref(viewDetailsPaymentMethodProcessDialogVisible)) {
        _push(ssrRenderComponent(_component_ViewDetailsPaymentMethodProcessDialog, { visible: unref(viewDetailsPaymentMethodProcessDialogVisible) }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(createPaymentMethodProcessDialogVisible)) {
        _push(ssrRenderComponent(_component_CreatePaymentMethodProcessDialog, { visible: unref(createPaymentMethodProcessDialogVisible) }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(editPaymentMethodProcessDialogVisible)) {
        _push(ssrRenderComponent(_component_EditPaymentMethodProcessDialog, { visible: unref(editPaymentMethodProcessDialogVisible) }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(deletePaymentMethodProcessDialogVisible)) {
        _push(ssrRenderComponent(_component_DeletePaymentMethodProcessDialog, { visible: unref(deletePaymentMethodProcessDialogVisible) }, null, _parent));
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/project_details/payment_method_process/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-Bsw8EomY.js.map
