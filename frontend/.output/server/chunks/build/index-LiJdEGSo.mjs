import { u as useDashboardStore, _ as _sfc_main$1 } from './dashboard-store-YkMxloWe.mjs';
import { withAsyncContext, mergeProps, unref, useSSRContext } from 'vue';
import { s as storeToRefs } from './server.mjs';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import './Icon-B04GAuZ4.mjs';
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
import './fetch-DXSGE_KZ.mjs';
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
  async setup(__props) {
    let __temp, __restore;
    const { statistics } = storeToRefs(useDashboardStore());
    const { getDashboardStatistics } = useDashboardStore();
    [__temp, __restore] = withAsyncContext(() => getDashboardStatistics()), await __temp, __restore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_StatisticCard = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full h-full flex flex-col items-center" }, _attrs))}><div class="fixed right-0 top-0 z-50 backdrop-blur-xl w-5/6 h-[8%] px-4 border-b flex justify-between items-center"><div class="flex items-center gap-2"><span class="font-semibold text-lg">Dashboard</span></div></div><div class="absolute top-[8%] w-full h-[92%]"><div class="w-full px-4 pt-5 flex justify-between items-center gap-4">`);
      _push(ssrRenderComponent(_component_StatisticCard, {
        title: "Bookings",
        count: unref(statistics)["resultBooking"],
        icon: "twemoji:couch-and-lamp",
        bgColor: "bg-gradient-to-t"
      }, null, _parent));
      _push(ssrRenderComponent(_component_StatisticCard, {
        title: "Rooms",
        count: unref(statistics)["resultRoom"],
        icon: "twemoji:door",
        bgColor: "bg-gradient-to-t"
      }, null, _parent));
      _push(ssrRenderComponent(_component_StatisticCard, {
        title: "Money",
        count: unref(statistics)["resultMoney"],
        icon: "twemoji:money-bag",
        bgColor: "bg-gradient-to-t"
      }, null, _parent));
      _push(ssrRenderComponent(_component_StatisticCard, {
        title: "Accounts",
        count: unref(statistics)["resultAccount"],
        icon: "twemoji:person-raising-hand-medium-light-skin-tone",
        bgColor: "bg-gradient-to-t"
      }, null, _parent));
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-LiJdEGSo.mjs.map
