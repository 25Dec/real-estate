import script from "./button.esm-D8sVcJb8.js";
import { inject, mergeProps, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import "./badge.esm-CGMv5799.js";
import "../server.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "hookable";
import "unctx";
import "h3";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "radix3";
import "ufo";
import "cookie-es";
import "destr";
import "ohash";
import "klona";
import "@vue/devtools-api";
import "devalue";
import "@formkit/auto-animate/vue";
import "framesync";
import "popmotion";
import "style-value-types";
import "./basecomponent.esm-DXWDIfdj.js";
import "./index.esm-C7T4V9vj.js";
import "./baseicon.esm-DbzTeshI.js";
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/land_payment_process/CheckProgressExampleDialogFooter.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=CheckProgressExampleDialogFooter-B-_DNa2e.js.map
