import { a as buildAssetsURL } from '../routes/renderer.mjs';
import script from './inputtext.esm-Blvd_dSV.mjs';
import script$1 from './password.esm-WFEp3LGb.mjs';
import script$2 from './button.esm-D8sVcJb8.mjs';
import { ref, mergeProps, unref, isRef, useSSRContext } from 'vue';
import { e as useAuthStore, s as storeToRefs, c as useRouter, u as useToast } from './server.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';
import 'vue-bundle-renderer/runtime';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'ipx';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import './basecomponent.esm-DXWDIfdj.mjs';
import './index.esm-BBjfxSHW.mjs';
import './baseicon.esm-DbzTeshI.mjs';
import './overlayeventbus.esm-Cq2NCN3a.mjs';
import './portal.esm-CdWWxjdD.mjs';
import './badge.esm-CGMv5799.mjs';
import './index.esm-C7T4V9vj.mjs';
import 'vue-router';
import '@formkit/auto-animate/vue';
import 'framesync';
import 'popmotion';
import 'style-value-types';

const _imports_0 = "" + buildAssetsURL("login_bg.DMge0j3-.jpg");
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useAuthStore();
    storeToRefs(useAuthStore());
    useRouter();
    useToast();
    const loginName = ref("");
    const password = ref("");
    const isLoading = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_InputText = script;
      const _component_Password = script$1;
      const _component_Button = script$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-screen h-screen flex items-center justify-center" }, _attrs))}><img class="w-full h-full"${ssrRenderAttr("src", _imports_0)} alt="Login Background"><form class="fixed w-[90%] lg:w-1/2 lg:h-[95%] flex flex-col items-center justify-center gap-10 m-4 p-8 md:p-14 space-y-8 shadow-2xl rounded-3xl md:space-y-0 bg-[rgba(255,255,255,0.8)] backdrop-blur-sm"><div class="flex flex-col justify-center items-center gap-4"><span class="font-bold text-3xl">Login</span><span class="font-semibold text-xl">Hi, Welcome to Propertier\u{1F44B}\u{1F3FB}</span></div><div class="flex flex-col gap-2 w-full lg:w-1/2"><div class="flex flex-col gap-2"><label for="loginName">Login Name</label>`);
      _push(ssrRenderComponent(_component_InputText, {
        id: "loginName",
        modelValue: unref(loginName),
        "onUpdate:modelValue": ($event) => isRef(loginName) ? loginName.value = $event : null,
        required: ""
      }, null, _parent));
      _push(`</div><div class="flex flex-col gap-2"><label for="password">Password</label>`);
      _push(ssrRenderComponent(_component_Password, {
        id: "password",
        modelValue: unref(password),
        "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
        toggleMask: "",
        feedback: false,
        required: ""
      }, null, _parent));
      _push(`</div></div><div class="w-full lg:w-1/2">`);
      _push(ssrRenderComponent(_component_Button, {
        loading: unref(isLoading),
        type: "submit",
        class: "w-full",
        label: "LOGIN"
      }, null, _parent));
      _push(`</div></form></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CboqKveH.mjs.map
