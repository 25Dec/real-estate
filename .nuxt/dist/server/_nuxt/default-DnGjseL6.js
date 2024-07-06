import { _ as __nuxt_component_0$1 } from "./VitePwaManifest-DOFbgYE0.js";
import { _ as __nuxt_component_0 } from "./nuxt-link-CXbm9kH4.js";
import __nuxt_component_1$1 from "./Icon-B04GAuZ4.js";
import { ref, withCtx, unref, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext, mergeProps } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttrs, ssrRenderSlot } from "vue/server-renderer";
import { _ as _export_sfc, e as useAuthStore, s as storeToRefs, c as useRouter } from "../server.mjs";
import script from "./avatar.esm-G-uX_ALX.js";
import script$1 from "./button.esm-D8sVcJb8.js";
import "hookable";
import "destr";
import "klona";
import "devalue";
import "#internal/nuxt/paths";
import { u as useProjectsStore } from "./projects-store-50IgnX7b.js";
import script$2 from "./toast.esm-DkLq1MgA.js";
import "./index-BabADJUJ.js";
import "@unhead/shared";
import "ufo";
import "./index-DE5HZNjr.js";
import "@iconify/vue/dist/offline";
import "@iconify/vue";
import "ofetch";
import "unctx";
import "h3";
import "unhead";
import "vue-router";
import "radix3";
import "cookie-es";
import "ohash";
import "@vue/devtools-api";
import "@formkit/auto-animate/vue";
import "framesync";
import "popmotion";
import "style-value-types";
import "./basecomponent.esm-DXWDIfdj.js";
import "./badge.esm-CGMv5799.js";
import "./index.esm-C7T4V9vj.js";
import "./baseicon.esm-DbzTeshI.js";
import "./fetch-DXSGE_KZ.js";
import "./portal.esm-CdWWxjdD.js";
import "./index.esm-BIjuQzNw.js";
import "./index.esm-BxozaLeM.js";
import "./index.esm-CbKY_bSB.js";
import "./index.esm-DilncAGe.js";
const _sfc_main$3 = {
  __name: "SubMenuItem",
  __ssrInlineRender: true,
  props: ["data"],
  setup(__props) {
    const { data } = __props;
    const expanded = ref(false);
    const onClick = () => {
      if (data.items && data.items.length > 0) {
        expanded.value = !expanded.value;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_1$1;
      const _component_SubMenuItem = __nuxt_component_2$1;
      _push(`<!--[-->`);
      if (__props.data) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: __props.data["link"],
          onClick,
          class: "w-full h-16 px-2 flex items-center rounded-lg font-semibold gap-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="w-px h-full mx-[8px] bg-gray-200 relative" data-v-aa43e26a${_scopeId}><span class="w-1 h-1 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-400" data-v-aa43e26a${_scopeId}></span></span><span class="text-gray-500" data-v-aa43e26a${_scopeId}>${ssrInterpolate(__props.data["name"])}</span>`);
              if (unref(expanded) && __props.data.items && __props.data.items.length > 0) {
                _push2(ssrRenderComponent(_component_Icon, { name: "mdi:chevron-down" }, null, _parent2, _scopeId));
              } else if (!unref(expanded) && __props.data.items && __props.data.items.length > 0) {
                _push2(ssrRenderComponent(_component_Icon, { name: "mdi:chevron-right" }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode("span", { class: "w-px h-full mx-[8px] bg-gray-200 relative" }, [
                  createVNode("span", { class: "w-1 h-1 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-400" })
                ]),
                createVNode("span", { class: "text-gray-500" }, toDisplayString(__props.data["name"]), 1),
                unref(expanded) && __props.data.items && __props.data.items.length > 0 ? (openBlock(), createBlock(_component_Icon, {
                  key: 0,
                  name: "mdi:chevron-down"
                })) : !unref(expanded) && __props.data.items && __props.data.items.length > 0 ? (openBlock(), createBlock(_component_Icon, {
                  key: 1,
                  name: "mdi:chevron-right"
                })) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(expanded) && __props.data && __props.data.items.length > 0) {
        _push(`<div className="w-full flex flex-col" data-v-aa43e26a><!--[-->`);
        ssrRenderList(__props.data["items"], (item) => {
          _push(ssrRenderComponent(_component_SubMenuItem, {
            key: item,
            data: item
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/SubMenuItem.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-aa43e26a"]]);
const _sfc_main$2 = {
  __name: "SidebarItem",
  __ssrInlineRender: true,
  props: ["data"],
  setup(__props) {
    const { data } = __props;
    const expanded = ref(false);
    const onClick = () => {
      if (data.items && data.items.length > 0) {
        expanded.value = !expanded.value;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_1$1;
      const _component_SubMenuItem = __nuxt_component_2$1;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: __props.data["link"],
        onClick,
        class: "w-full h-16 px-2 flex justify-between items-center rounded-lg font-semibold text-gray-500"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-2" data-v-ef50d4a3${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: __props.data.icon
            }, null, _parent2, _scopeId));
            _push2(`<span data-v-ef50d4a3${_scopeId}>${ssrInterpolate(__props.data["name"])}</span></div>`);
            if (unref(expanded) && __props.data.items && __props.data.items.length > 0) {
              _push2(ssrRenderComponent(_component_Icon, { name: "mdi:chevron-down" }, null, _parent2, _scopeId));
            } else if (!unref(expanded) && __props.data.items && __props.data.items.length > 0) {
              _push2(ssrRenderComponent(_component_Icon, { name: "mdi:chevron-right" }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-2" }, [
                createVNode(_component_Icon, {
                  name: __props.data.icon
                }, null, 8, ["name"]),
                createVNode("span", null, toDisplayString(__props.data["name"]), 1)
              ]),
              unref(expanded) && __props.data.items && __props.data.items.length > 0 ? (openBlock(), createBlock(_component_Icon, {
                key: 0,
                name: "mdi:chevron-down"
              })) : !unref(expanded) && __props.data.items && __props.data.items.length > 0 ? (openBlock(), createBlock(_component_Icon, {
                key: 1,
                name: "mdi:chevron-right"
              })) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(expanded) && __props.data.items && __props.data.items.length > 0) {
        _push(`<div className="w-full flex flex-col" data-v-ef50d4a3><!--[-->`);
        ssrRenderList(__props.data["items"], (item) => {
          _push(ssrRenderComponent(_component_SubMenuItem, {
            key: item,
            data: item
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/SidebarItem.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-ef50d4a3"]]);
const projectDetailsBaseLink = "/project_details";
const adminDashBoardBaseLink = "/admin";
const _sfc_main$1 = {
  __name: "Sidebar",
  __ssrInlineRender: true,
  setup(__props) {
    const { logUserOut } = useAuthStore();
    const { currentProjectFromLocalStore, currentProjectIDFromLocalStore } = storeToRefs(useProjectsStore());
    const router = useRouter();
    const currentRoute = router["currentRoute"].value;
    ref(true);
    const user = ref({});
    const links = currentRoute["path"].includes("project_details") ? [
      {
        name: "Dashboard",
        link: projectDetailsBaseLink + `/${currentProjectIDFromLocalStore.value}`,
        icon: "mdi:view-dashboard-outline",
        items: [
          {
            name: "Zone",
            link: projectDetailsBaseLink + "/zone"
          },
          currentProjectFromLocalStore.value["type"] == "high" || currentProjectFromLocalStore.value["type"] == "hybrid" ? {
            name: "Block",
            link: projectDetailsBaseLink + "/block"
          } : null,
          currentProjectFromLocalStore.value["type"] == "high" || currentProjectFromLocalStore.value["type"] == "hybrid" ? {
            name: "Floor",
            link: projectDetailsBaseLink + "/floor"
          } : null,
          currentProjectFromLocalStore.value["type"] == "land" ? {
            name: "Land Area",
            link: projectDetailsBaseLink + "/land_area"
          } : null,
          currentProjectFromLocalStore.value["type"] == "high" || currentProjectFromLocalStore.value["type"] == "hybrid" ? {
            name: "High Area",
            link: projectDetailsBaseLink + "/high_area"
          } : null
        ]
      },
      {
        name: "SVG Animation Viewer",
        link: projectDetailsBaseLink + "/svg_animation_viewer",
        icon: "material-symbols:interactive-space-outline"
      },
      {
        name: "Customers",
        link: projectDetailsBaseLink + "/customers",
        icon: "mdi:account-supervisor-outline"
      },
      {
        name: "Payment Method",
        link: projectDetailsBaseLink + "/payment_method",
        icon: "mdi:payment"
      },
      {
        name: "Payment Process",
        link: projectDetailsBaseLink + "/payment_method_process",
        icon: "mdi:progress-helper"
      },
      {
        name: "Notifications",
        link: projectDetailsBaseLink + "/notifications",
        icon: "mdi:bell-outline"
      }
    ] : currentRoute["path"].includes("admin") ? [
      {
        name: "Dashboard",
        link: adminDashBoardBaseLink,
        icon: "mdi:view-dashboard-outline"
      },
      {
        name: "Projects",
        link: adminDashBoardBaseLink + "/projects",
        icon: "mdi:home-city-outline"
      },
      {
        name: "Users",
        link: adminDashBoardBaseLink + "/users",
        icon: "heroicons:user-group"
      },
      {
        name: "Customers",
        link: adminDashBoardBaseLink + "/customers",
        icon: "mdi:account-supervisor-outline"
      },
      {
        name: "Sellers",
        link: adminDashBoardBaseLink + "/project_seller",
        icon: "streamline:office-worker"
      },
      {
        name: "Notifications",
        link: adminDashBoardBaseLink + "/notifications",
        icon: "mdi:bell-outline"
      }
    ] : [];
    const onLogout = () => {
      logUserOut();
      router.push("/");
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_1$1;
      const _component_SidebarItem = __nuxt_component_2;
      const _component_Avatar = script;
      const _component_Button = script$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-1/6 h-screen" }, _attrs))} data-v-b5091f55><div class="fixed top-0 left-0 w-1/6 h-[8%] px-4 py-[17.5px] flex justify-center items-center z-50 bg-white border-b border-r" data-v-b5091f55>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "flex justify-center items-center gap-1"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(currentRoute)["path"].includes("project_details")) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "line-md:home-simple",
                class: "text-2xl text-[#10b981]"
              }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "mdi:view-dashboard-outline",
                class: "text-2xl text-[#10b981]"
              }, null, _parent2, _scopeId));
            }
            if (unref(currentRoute)["path"].includes("project_details")) {
              _push2(`<span class="font-bold text-xl text-[#10b981]" data-v-b5091f55${_scopeId}> Propertier </span>`);
            } else {
              _push2(`<span class="font-bold text-xl text-[#10b981]" data-v-b5091f55${_scopeId}> Overall Dashboard </span>`);
            }
          } else {
            return [
              unref(currentRoute)["path"].includes("project_details") ? (openBlock(), createBlock(_component_Icon, {
                key: 0,
                name: "line-md:home-simple",
                class: "text-2xl text-[#10b981]"
              })) : (openBlock(), createBlock(_component_Icon, {
                key: 1,
                name: "mdi:view-dashboard-outline",
                class: "text-2xl text-[#10b981]"
              })),
              unref(currentRoute)["path"].includes("project_details") ? (openBlock(), createBlock("span", {
                key: 2,
                class: "font-bold text-xl text-[#10b981]"
              }, " Propertier ")) : (openBlock(), createBlock("span", {
                key: 3,
                class: "font-bold text-xl text-[#10b981]"
              }, " Overall Dashboard "))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="absolute top-[8%] left-0 w-1/6 h-[84%] px-4 border-r overflow-auto" data-v-b5091f55><div class="w-full h-fit flex flex-col gap-1" data-v-b5091f55><!--[-->`);
      ssrRenderList(unref(links), (link) => {
        _push(ssrRenderComponent(_component_SidebarItem, {
          key: link.name,
          data: link
        }, null, _parent));
      });
      _push(`<!--]--></div></div><div class="fixed bottom-0 left-0 w-1/6 h-[8%] px-4 flex justify-between items-center z-50 bg-white border-t border-r" data-v-b5091f55>`);
      if (Object.keys(unref(user)).length) {
        _push(`<div class="flex items-center gap-2" data-v-b5091f55>`);
        _push(ssrRenderComponent(_component_Avatar, {
          label: (_a = unref(user)["display_name"]) == null ? void 0 : _a.substring(0, 3),
          shape: "square"
        }, null, _parent));
        _push(`<span class="font-semibold" data-v-b5091f55>${ssrInterpolate(unref(user)["display_name"])}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_Button, {
        onClick: onLogout,
        text: "",
        plain: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, { name: "mdi:logout" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Icon, { name: "mdi:logout" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/Sidebar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-b5091f55"]]);
const _sfc_main = {
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const { authenticated } = storeToRefs(useAuthStore());
    const router = useRouter();
    if (!authenticated) {
      router.push("/login");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_VitePwaManifest = __nuxt_component_0$1;
      const _component_Sidebar = __nuxt_component_1;
      const _component_Toast = script$2;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_VitePwaManifest, null, null, _parent));
      _push(ssrRenderComponent(_component_Sidebar, null, null, _parent));
      _push(`<div class="absolute top-0 right-0 w-5/6 h-full">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
      _push(ssrRenderComponent(_component_Toast, {
        position: "bottom-left",
        group: "bl"
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=default-DnGjseL6.js.map
