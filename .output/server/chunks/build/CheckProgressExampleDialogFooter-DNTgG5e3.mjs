import script from './button.esm-D8sVcJb8.mjs';
import { inject, mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import './badge.esm-CGMv5799.mjs';
import './server.mjs';
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
import './basecomponent.esm-DXWDIfdj.mjs';
import './index.esm-C7T4V9vj.mjs';
import './baseicon.esm-DbzTeshI.mjs';

const _sfc_main = {
  __name: "CheckProgressExampleDialogFooter",
  __ssrInlineRender: true,
  setup(__props) {
    const dialogRef = inject("dialogRef");
    const closeDialog = (event) => {
      dialogRef.value.close(event);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = script;
      _push(ssrRenderComponent(_component_Button, mergeProps({
        type: "button",
        label: "Close",
        onClick: ($event) => closeDialog({ buttonType: "Cancel" }),
        autofocus: ""
      }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/high_payment_process/CheckProgressExampleDialogFooter.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=CheckProgressExampleDialogFooter-DNTgG5e3.mjs.map
