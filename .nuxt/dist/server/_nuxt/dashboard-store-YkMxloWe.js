import __nuxt_component_1 from "./Icon-B04GAuZ4.js";
import { mergeProps, useSSRContext, ref } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderComponent } from "vue/server-renderer";
import "hookable";
import { u as useFetch } from "./fetch-DXSGE_KZ.js";
import { d as defineStore, a as useCookie, b as baseUrl } from "../server.mjs";
import "devalue";
import "#internal/nuxt/paths";
import "destr";
import "klona";
const _sfc_main = {
  __name: "StatisticCard",
  __ssrInlineRender: true,
  props: [
    "title",
    "count",
    "icon",
    "bgColor"
  ],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-1/4 h-16 px-4 py-2 shadow-md rounded-lg flex justify-between items-center" }, _attrs))}><div class="flex flex-col gap-1"><span>${ssrInterpolate(__props.title)}</span><span class="text-lg font-bold">${ssrInterpolate(__props.count)}</span></div><div class="${ssrRenderClass(`icon h-full ${__props.bgColor} flex items-center rounded-lg`)}">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: __props.icon,
        class: "text-myWhite text-4xl"
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/StatisticCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const useDashboardStore = defineStore("Dashboard", () => {
  const statistics = ref({});
  const getDashboardStatistics = async () => {
    const accessToken = useCookie("token");
    const { data } = await useFetch(baseUrl + "/auth/dashboard/getStatistic", {
      headers: {
        "Content-Type": "application/json",
        access_token: accessToken.value
      }
    }, "$kPS1EiCRoX");
    statistics.value = data.value.data;
  };
  return { statistics, getDashboardStatistics };
});
export {
  _sfc_main as _,
  useDashboardStore as u
};
//# sourceMappingURL=dashboard-store-YkMxloWe.js.map
