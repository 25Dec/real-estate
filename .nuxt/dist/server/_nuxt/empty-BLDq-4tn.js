import { _ as __nuxt_component_0 } from "./VitePwaManifest-DOFbgYE0.js";
import { _ as _export_sfc, K as __nuxt_component_1 } from "../server.mjs";
import script from "./toast.esm-DkLq1MgA.js";
import { useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import "./index-BabADJUJ.js";
import "@unhead/shared";
import "ofetch";
import "#internal/nuxt/paths";
import "hookable";
import "unctx";
import "h3";
import "unhead";
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
import "./portal.esm-CdWWxjdD.js";
import "./basecomponent.esm-DXWDIfdj.js";
import "./index.esm-BIjuQzNw.js";
import "./baseicon.esm-DbzTeshI.js";
import "./index.esm-BxozaLeM.js";
import "./index.esm-CbKY_bSB.js";
import "./index.esm-DilncAGe.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_VitePwaManifest = __nuxt_component_0;
  const _component_NuxtPage = __nuxt_component_1;
  const _component_Toast = script;
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_VitePwaManifest, null, null, _parent));
  _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent));
  _push(ssrRenderComponent(_component_Toast, {
    position: "bottom-left",
    group: "bl"
  }, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/empty.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const empty = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  empty as default
};
//# sourceMappingURL=empty-BLDq-4tn.js.map
