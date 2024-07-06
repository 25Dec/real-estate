import script from './datatable.esm-BAh19VmC.mjs';
import script$1 from './column.esm-KktM_xTo.mjs';
import script$2 from './knob.esm-CiupXrSq.mjs';
import { withAsyncContext, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { s as storeToRefs } from './server.mjs';
import { u as useLandAreasStore } from './land-area-store-DoyN9VgD.mjs';
import { u as usePaymentMethodsStore } from './payment-method-store-B-s5UmN8.mjs';
import { u as usePaymentMethodsProcessStore } from './payment-method-process-store-Dt8EidVY.mjs';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import './baseicon.esm-DbzTeshI.mjs';
import './basecomponent.esm-DXWDIfdj.mjs';
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
import './inputnumber.esm-CMvh_h4P.mjs';
import './button.esm-D8sVcJb8.mjs';
import './badge.esm-CGMv5799.mjs';
import './index.esm-Dpdcp6OZ.mjs';
import './index.esm-CE-esNCM.mjs';
import './inputtext.esm-Blvd_dSV.mjs';
import './index.esm-ByqdG2PS.mjs';
import './index.esm-C03T_CK6.mjs';
import './index.esm-Cs4cT7wr.mjs';
import './checkbox.esm-Duuim8Iu.mjs';
import './radiobutton.esm-CQ1mq00b.mjs';
import './index.esm-BvZNBu0f.mjs';
import './index.esm-DTIot6dj.mjs';
import './fetch-DXSGE_KZ.mjs';
import './projects-store-50IgnX7b.mjs';

const _sfc_main = {
  __name: "CheckProgressExampleDialogData",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { currentLandArea } = storeToRefs(useLandAreasStore());
    const { getPaymentMethods } = usePaymentMethodsStore();
    const { paymentMethodsProcess } = storeToRefs(
      usePaymentMethodsProcessStore()
    );
    const { getPaymentMethodsProcess } = usePaymentMethodsProcessStore();
    [__temp, __restore] = withAsyncContext(() => getPaymentMethods()), await __temp, __restore();
    [__temp, __restore] = withAsyncContext(() => getPaymentMethodsProcess()), await __temp, __restore();
    const myPaymentMethodsProcessBaseOnPMId = computed(() => {
      return paymentMethodsProcess.value.filter((process) => {
        return process["payment_method_id"] == currentLandArea.value["payment_method_id"];
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_DataTable = script;
      const _component_Column = script$1;
      const _component_Knob = script$2;
      _push(ssrRenderComponent(_component_DataTable, mergeProps({ value: unref(myPaymentMethodsProcessBaseOnPMId) }, _attrs), {
        empty: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-center items-center"${_scopeId}><span${_scopeId}>No payment method process found.</span></div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-center items-center" }, [
                createVNode("span", null, "No payment method process found.")
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
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/land_payment_process/CheckProgressExampleDialogData.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=CheckProgressExampleDialogData-dZTH2Qo_.mjs.map
