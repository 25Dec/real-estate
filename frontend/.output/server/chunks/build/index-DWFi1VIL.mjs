import { mergeProps, useSSRContext } from 'vue';
import { c as useRouter } from './server.mjs';
import { ssrRenderAttrs } from 'vue/server-renderer';
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

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full h-full flex flex-col" }, _attrs))}><div class="fixed right-0 top-0 z-50 backdrop-blur-xl w-full h-[10%] px-4 border-b flex justify-between items-center"><div class="flex flex-col justify-center gap-2"><p class="text-[#10b98e] cursor-pointer text-sm hover:underline"> Back to Land Area </p><div class="flex items-center gap-2"><span class="font-semibold text-lg">3D Model Viewer</span></div></div></div><div class="absolute top-[10%] w-full h-[90%]"><iframe id="vt_demo" class="w-full h-full" referrerpolicy="origin" allow="accelerometer; camera; display-capture; fullscreen; geolocation; gyroscope; magnetometer; microphone; midi; xr-spatial-tracking;" allowfullscreen="yes" allowvr="yes" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://no1on.me/viewer/index.php?code=c20ad4d76fe97759aa27a0c99bff6710"></iframe></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/project_details/svg_animation_viewer/3d_model_viewer/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DWFi1VIL.mjs.map
