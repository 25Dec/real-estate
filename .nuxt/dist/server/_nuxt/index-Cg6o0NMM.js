import { _ as __nuxt_component_0 } from "./nuxt-link-CXbm9kH4.js";
import __nuxt_component_1 from "./Icon-B04GAuZ4.js";
import script$3 from "./button.esm-D8sVcJb8.js";
import script from "./avatar.esm-G-uX_ALX.js";
import script$4 from "./menu.esm-C_RMEhtK.js";
import { _ as __nuxt_component_4 } from "./nuxt-img-B1CeyAfr.js";
import { mergeProps, withCtx, createVNode, useSSRContext, resolveDirective, unref, toDisplayString, withDirectives, openBlock, createBlock, withAsyncContext, ref, createTextVNode } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrGetDirectiveProps, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
import script$1 from "./card.esm-Dl-1afH1.js";
import script$2 from "./tag.esm-Bkya-FxV.js";
import { u as useProjectsStore } from "./projects-store-50IgnX7b.js";
import { c as useRouter, _ as _export_sfc, s as storeToRefs, e as useAuthStore, l as landingPageAboutUsContents, f as landingPageServicesContent } from "../server.mjs";
import { c as capitalize } from "./core_utils-WJ_cJnbk.js";
import script$5 from "./inputtext.esm-Blvd_dSV.js";
import script$6 from "./textarea.esm-r2lUF_RZ.js";
import "hookable";
import "destr";
import "klona";
import "devalue";
import "#internal/nuxt/paths";
import { enablePageScroll, disablePageScroll } from "scroll-lock";
import "ufo";
import "./index-DE5HZNjr.js";
import "@iconify/vue/dist/offline";
import "@iconify/vue";
import "./badge.esm-CGMv5799.js";
import "./basecomponent.esm-DXWDIfdj.js";
import "./index.esm-C7T4V9vj.js";
import "./baseicon.esm-DbzTeshI.js";
import "./overlayeventbus.esm-Cq2NCN3a.js";
import "./portal.esm-CdWWxjdD.js";
import "./index-BabADJUJ.js";
import "@unhead/shared";
import "h3";
import "./fetch-DXSGE_KZ.js";
import "ohash";
import "ofetch";
import "unctx";
import "unhead";
import "vue-router";
import "radix3";
import "cookie-es";
import "@vue/devtools-api";
import "@formkit/auto-animate/vue";
import "framesync";
import "popmotion";
import "style-value-types";
const _sfc_main$3 = {
  __name: "AboutCard",
  __ssrInlineRender: true,
  props: ["data"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Avatar = script;
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center gap-3" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Avatar, {
        size: "large",
        shape: "circle"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: __props.data["icon"],
              class: "text-[#10b981]"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Icon, {
                name: __props.data["icon"],
                class: "text-[#10b981]"
              }, null, 8, ["name"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span>${ssrInterpolate(__props.data["title"])}</span></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/AboutCard.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "ServiceCard",
  __ssrInlineRender: true,
  props: ["data"],
  setup(__props) {
    const { data } = __props;
    const external = data["action"]["goto"]["external"];
    const path = external == true ? { hash: data["action"]["goto"]["path"] } : data["action"]["goto"]["path"];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Card = script$1;
      const _component_NuxtImg = __nuxt_component_4;
      const _directive_motion_pop_visible = resolveDirective("motion-pop-visible");
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        to: unref(path),
        external: unref(external),
        class: "transition hover:scale-105"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Card, mergeProps({ class: "w-[350px]" }, ssrGetDirectiveProps(_ctx, _directive_motion_pop_visible)), {
              title: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a, _b, _c, _d;
                if (_push3) {
                  _push3(`<div class="flex flex-col justify-center items-center gap-6"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_NuxtImg, {
                    src: (_a = __props.data) == null ? void 0 : _a["image"]
                  }, null, _parent3, _scopeId2));
                  _push3(`<span class="font-bold text-xl text-center"${_scopeId2}>${ssrInterpolate((_b = __props.data) == null ? void 0 : _b["title"])}</span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex flex-col justify-center items-center gap-6" }, [
                      createVNode(_component_NuxtImg, {
                        src: (_c = __props.data) == null ? void 0 : _c["image"]
                      }, null, 8, ["src"]),
                      createVNode("span", { class: "font-bold text-xl text-center" }, toDisplayString((_d = __props.data) == null ? void 0 : _d["title"]), 1)
                    ])
                  ];
                }
              }),
              content: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a, _b;
                if (_push3) {
                  _push3(`<p class="text-center"${_scopeId2}>${ssrInterpolate((_a = __props.data) == null ? void 0 : _a["content"])}</p>`);
                } else {
                  return [
                    createVNode("p", { class: "text-center" }, toDisplayString((_b = __props.data) == null ? void 0 : _b["content"]), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              withDirectives((openBlock(), createBlock(_component_Card, { class: "w-[350px]" }, {
                title: withCtx(() => {
                  var _a, _b;
                  return [
                    createVNode("div", { class: "flex flex-col justify-center items-center gap-6" }, [
                      createVNode(_component_NuxtImg, {
                        src: (_a = __props.data) == null ? void 0 : _a["image"]
                      }, null, 8, ["src"]),
                      createVNode("span", { class: "font-bold text-xl text-center" }, toDisplayString((_b = __props.data) == null ? void 0 : _b["title"]), 1)
                    ])
                  ];
                }),
                content: withCtx(() => {
                  var _a;
                  return [
                    createVNode("p", { class: "text-center" }, toDisplayString((_a = __props.data) == null ? void 0 : _a["content"]), 1)
                  ];
                }),
                _: 1
              })), [
                [_directive_motion_pop_visible]
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/ServiceCard.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "ProjectCard",
  __ssrInlineRender: true,
  props: ["data"],
  setup(__props) {
    const { data } = __props;
    const { setCurrentProject, setCurrentProjectID } = useProjectsStore();
    const router = useRouter();
    const viewMore = () => {
      setCurrentProject({ ...data });
      setCurrentProjectID(data["id"]);
      router.push(`/project_details/${data["id"]}`);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Card = script$1;
      const _component_NuxtImg = __nuxt_component_4;
      const _component_Tag = script$2;
      const _component_Button = script$3;
      const _directive_motion_slide_visible_left = resolveDirective("motion-slide-visible-left");
      _push(ssrRenderComponent(_component_Card, mergeProps({ class: "w-[350px] lg:w-[250px] overflow-hidden" }, _attrs, ssrGetDirectiveProps(_ctx, _directive_motion_slide_visible_left)), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            if (((_a = __props.data) == null ? void 0 : _a["type"]) == "land") {
              _push2(ssrRenderComponent(_component_NuxtImg, {
                class: "w-full h-[150px]",
                src: "/images/the_manhattan_glory.jpg"
              }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(_component_NuxtImg, {
                class: "w-full h-[150px]",
                src: "/images/glory_heights.jpg"
              }, null, _parent2, _scopeId));
            }
          } else {
            return [
              ((_b = __props.data) == null ? void 0 : _b["type"]) == "land" ? (openBlock(), createBlock(_component_NuxtImg, {
                key: 0,
                class: "w-full h-[150px]",
                src: "/images/the_manhattan_glory.jpg"
              })) : (openBlock(), createBlock(_component_NuxtImg, {
                key: 1,
                class: "w-full h-[150px]",
                src: "/images/glory_heights.jpg"
              }))
            ];
          }
        }),
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<span class="capitalize font-semibold"${_scopeId}>${ssrInterpolate((_a = __props.data) == null ? void 0 : _a["name"])}</span>`);
          } else {
            return [
              createVNode("span", { class: "capitalize font-semibold" }, toDisplayString((_b = __props.data) == null ? void 0 : _b["name"]), 1)
            ];
          }
        }),
        subtitle: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d;
          if (_push2) {
            _push2(ssrRenderComponent(_component_Tag, {
              severity: ((_a = __props.data) == null ? void 0 : _a["activated"]) == "true" ? "success" : "danger",
              value: ((_b = __props.data) == null ? void 0 : _b["activated"]) == "true" ? "Activated" : "Not Activated"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Tag, {
                severity: ((_c = __props.data) == null ? void 0 : _c["activated"]) == "true" ? "success" : "danger",
                value: ((_d = __props.data) == null ? void 0 : _d["activated"]) == "true" ? "Activated" : "Not Activated"
              }, null, 8, ["severity", "value"])
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d;
          if (_push2) {
            _push2(`<div class="flex flex-col gap-1"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><span${_scopeId}>Type:</span><span${_scopeId}>${ssrInterpolate(("capitalize" in _ctx ? _ctx.capitalize : unref(capitalize))((_a = __props.data) == null ? void 0 : _a["type"]))}</span></div><div class="flex justify-between items-center"${_scopeId}><span${_scopeId}>Progress:</span><span${_scopeId}>${ssrInterpolate((_b = __props.data) == null ? void 0 : _b["project_progress"])}%</span></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col gap-1" }, [
                createVNode("div", { class: "flex justify-between items-center" }, [
                  createVNode("span", null, "Type:"),
                  createVNode("span", null, toDisplayString(("capitalize" in _ctx ? _ctx.capitalize : unref(capitalize))((_c = __props.data) == null ? void 0 : _c["type"])), 1)
                ]),
                createVNode("div", { class: "flex justify-between items-center" }, [
                  createVNode("span", null, "Progress:"),
                  createVNode("span", null, toDisplayString((_d = __props.data) == null ? void 0 : _d["project_progress"]) + "%", 1)
                ])
              ])
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Button, {
              link: "",
              size: "small",
              label: "View More",
              onClick: viewMore
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Button, {
                link: "",
                size: "small",
                label: "View More",
                onClick: viewMore
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/ProjectCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { projects } = storeToRefs(useProjectsStore());
    const { getProjects } = useProjectsStore();
    const { authenticated } = storeToRefs(useAuthStore());
    const { logUserOut } = useAuthStore();
    [__temp, __restore] = withAsyncContext(() => getProjects()), await __temp, __restore();
    const showBackground = ref(false);
    const openNavigation = ref(false);
    const navigations = ref([
      { title: "Home", to: "/", external: false },
      { title: "About", to: "about", external: true },
      { title: "Services", to: "services", external: true },
      { title: "Projects", to: "projects", external: true },
      { title: "Contact", to: "contact", external: true },
      {
        title: "Login",
        to: "/login",
        external: false,
        onlyMobile: true
      }
    ]);
    const option = ref();
    const options = ref([
      {
        label: "Logout",
        command: () => logUserOut()
      }
    ]);
    const user = ref({});
    const toggleNavigation = () => {
      if (openNavigation.value) {
        openNavigation.value = false;
        enablePageScroll();
      } else {
        openNavigation.value = true;
        disablePageScroll();
      }
    };
    const handleClick = () => {
      if (!openNavigation.value) return;
      enablePageScroll();
      openNavigation.value = false;
    };
    const toggleOption = (event) => {
      option.value.toggle(event);
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_1;
      const _component_Button = script$3;
      const _component_Avatar = script;
      const _component_Menu = script$4;
      const _component_NuxtImg = __nuxt_component_4;
      const _component_AboutCard = _sfc_main$3;
      const _component_ServiceCard = _sfc_main$2;
      const _component_ProjectCard = _sfc_main$1;
      const _component_InputText = script$5;
      const _component_Textarea = script$6;
      const _directive_motion_slide_visible_left = resolveDirective("motion-slide-visible-left");
      const _directive_motion_slide_visible_right = resolveDirective("motion-slide-visible-right");
      const _directive_motion_pop_visible = resolveDirective("motion-pop-visible");
      _push(`<!--[--><div class="${ssrRenderClass(`fixed top-0 left-0 w-full z-50 ${unref(showBackground) ? "backdrop-blur-xl border-b" : ""} ${unref(openNavigation) ? "backdrop-blur-xl" : ""}`)}" data-v-cb030e77><div class="flex justify-center items-center px-4 lg:px-7 xl:px-10 max-lg:py-4" data-v-cb030e77>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "flex justify-center items-center gap-1"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "line-md:home-simple",
              class: "text-2xl text-[#10b981]"
            }, null, _parent2, _scopeId));
            _push2(`<span class="font-bold text-xl text-[#10b981]" data-v-cb030e77${_scopeId}> Propertier </span>`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "line-md:home-simple",
                class: "text-2xl text-[#10b981]"
              }),
              createVNode("span", { class: "font-bold text-xl text-[#10b981]" }, " Propertier ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="${ssrRenderClass(`${unref(openNavigation) ? "flex" : "hidden"} fixed w-full top-[4rem] left-0 right-0 bottom-0 lg:static lg:flex lg:mx-auto`)}" data-v-cb030e77><div class="${ssrRenderClass(`relative w-full z-50 flex flex-col items-center justify-center m-auto lg:flex-row text-white ${unref(openNavigation) ? "backdrop-blur-xl" : ""}`)}" data-v-cb030e77><!--[-->`);
      ssrRenderList(unref(navigations), (item) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: item["title"],
          to: item["external"] ? { hash: item["to"] } : item["to"],
          external: item["external"],
          onClick: handleClick,
          class: `font-semibold hover:scale-150 hover:-translate-x-6 transition duration-500 ease-in-out block relative uppercase px-6 py-6 md:py-8 lg:-mr-0.25 lg:leading-5 xl:px-12 ${item["onlyMobile"] ? "lg:hidden" : ""}  ${unref(showBackground) ? "text-black" : "text-white"}`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(item["title"])}`);
            } else {
              return [
                createTextVNode(toDisplayString(item["title"]), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div>`);
      if (!unref(authenticated)) {
        _push(ssrRenderComponent(_component_Button, {
          outlined: "",
          severity: "secondary",
          class: `hidden lg:flex font-semibold ${unref(showBackground) ? "text-black" : "text-white"}`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_NuxtLink, { to: "/login" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Login `);
                  } else {
                    return [
                      createTextVNode(" Login ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_NuxtLink, { to: "/login" }, {
                  default: withCtx(() => [
                    createTextVNode(" Login ")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="ml-auto flex gap-6" data-v-cb030e77>`);
      if (unref(authenticated)) {
        _push(ssrRenderComponent(_component_Avatar, {
          shape: "square",
          label: (_a = unref(user)["display_name"]) == null ? void 0 : _a.substring(0, 3),
          onClick: (event) => toggleOption(event)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_Menu, {
        ref_key: "option",
        ref: option,
        model: unref(options),
        popup: true,
        class: "hidden lg:block"
      }, null, _parent));
      _push(`<div class="lg:hidden" data-v-cb030e77>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "line-md:menu",
        class: `cursor-pointer text-2xl ${unref(showBackground) ? "text-black" : "text-white"}`,
        onClick: toggleNavigation
      }, null, _parent));
      _push(`</div></div></div></div><section id="home" class="relative lg:pt-[100px] w-full px-4 h-fit flex flex-col items-center gap-12 brightness-50" data-v-cb030e77></section><section id="about" class="relative pt-[100px] px-4 h-fit grid grid-cols-1 lg:grid-cols-2 gap-12 overflow-hidden" data-v-cb030e77><div${ssrRenderAttrs(mergeProps({ class: "flex justify-end items-center" }, ssrGetDirectiveProps(_ctx, _directive_motion_slide_visible_left)))} data-v-cb030e77>`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: "/images/about_banner.png",
        class: "shadow-md rounded-lg"
      }, null, _parent));
      _push(`</div><div${ssrRenderAttrs(mergeProps({ class: "flex flex-col justify-center lg:justify-start items-center lg:items-start gap-6 w-full lg:w-4/5" }, ssrGetDirectiveProps(_ctx, _directive_motion_slide_visible_right)))} data-v-cb030e77><span class="text-4xl font-bold p-2 border-b" data-v-cb030e77>About Us</span><span class="text-2xl font-semibold" data-v-cb030e77>Provide service to manage real estate</span><div class="grid grid-cols-2 gap-6" data-v-cb030e77><!--[-->`);
      ssrRenderList(unref(landingPageAboutUsContents), (about) => {
        _push(ssrRenderComponent(_component_AboutCard, {
          key: about.title,
          data: about
        }, null, _parent));
      });
      _push(`<!--]--></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: { hash: "services" },
        external: true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Button, { size: "large" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="text-bold" data-v-cb030e77${_scopeId2}> Our Services </span>`);
                } else {
                  return [
                    createVNode("span", { class: "text-bold" }, " Our Services ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Button, { size: "large" }, {
                default: withCtx(() => [
                  createVNode("span", { class: "text-bold" }, " Our Services ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section><section id="services" class="relative pt-[100px] px-4 h-fit flex flex-col items-center gap-12" data-v-cb030e77><span class="text-4xl font-bold p-2 border-b" data-v-cb030e77>Our Services</span><div class="flex justify-center items-center gap-6 flex-wrap" data-v-cb030e77><!--[-->`);
      ssrRenderList(unref(landingPageServicesContent), (service) => {
        _push(ssrRenderComponent(_component_ServiceCard, {
          key: service.title,
          data: service
        }, null, _parent));
      });
      _push(`<!--]--></div></section><section id="projects" class="relative pt-[100px] px-4 h-fit flex flex-col items-center gap-12" data-v-cb030e77><span class="text-4xl font-bold p-2 border-b" data-v-cb030e77>Available Projects</span><div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" data-v-cb030e77><!--[-->`);
      ssrRenderList(unref(projects), (project) => {
        _push(ssrRenderComponent(_component_ProjectCard, {
          key: project.id,
          data: project
        }, null, _parent));
      });
      _push(`<!--]--></div></section><section id="contact" class="relative py-[100px] px-4 h-screen flex flex-col items-center gap-12" data-v-cb030e77><span class="text-4xl font-bold p-2 border-b" data-v-cb030e77>Send Us Message</span><div${ssrRenderAttrs(mergeProps({ class: "flex flex-col w-full lg:w-1/2 gap-4" }, ssrGetDirectiveProps(_ctx, _directive_motion_pop_visible)))} data-v-cb030e77><div class="flex flex-1 flex-col gap-2" data-v-cb030e77><label for="fullName" data-v-cb030e77>Full Name</label>`);
      _push(ssrRenderComponent(_component_InputText, {
        id: "fullName",
        size: "large"
      }, null, _parent));
      _push(`</div><div class="flex flex-1 flex-col gap-2" data-v-cb030e77><label for="email" data-v-cb030e77>Email</label>`);
      _push(ssrRenderComponent(_component_InputText, {
        id: "email",
        size: "large"
      }, null, _parent));
      _push(`</div><div class="flex flex-1 flex-col gap-2" data-v-cb030e77><label for="email" data-v-cb030e77>Phone Number</label>`);
      _push(ssrRenderComponent(_component_InputText, {
        id: "phoneNumber",
        size: "large"
      }, null, _parent));
      _push(`</div><div class="flex flex-1 flex-col gap-2" data-v-cb030e77><label for="message" data-v-cb030e77>Message</label>`);
      _push(ssrRenderComponent(_component_Textarea, {
        rows: "5",
        cols: "30"
      }, null, _parent));
      _push(`</div><div class="flex flex-1" data-v-cb030e77>`);
      _push(ssrRenderComponent(_component_Button, {
        class: "flex-1",
        label: "Submit"
      }, null, _parent));
      _push(`</div></div></section><footer class="w-full bg-[#131313] h-[120px] p-4 flex justify-center items-center" data-v-cb030e77><span class="text-white" data-v-cb030e77>© Copyrights. All Rights Reserved</span></footer><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cb030e77"]]);
export {
  index as default
};
//# sourceMappingURL=index-Cg6o0NMM.js.map
