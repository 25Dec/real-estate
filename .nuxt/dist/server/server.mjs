import { effectScope, shallowReactive, reactive, getCurrentScope, hasInjectionContext, getCurrentInstance, inject, toRef, version, unref, h, ref, markRaw, toRaw, isRef, isReactive, watch, nextTick, computed, onScopeDispose, toRefs, shallowRef, isReadonly, defineComponent, provide, createElementBlock, isShallow, defineAsyncComponent, useSlots, readonly, onMounted, mergeProps, Suspense, Transition, Fragment, withCtx, createVNode, useSSRContext, onErrorCaptured, onServerPrefetch, resolveDynamicComponent, createApp } from "vue";
import { $fetch as $fetch$1 } from "ofetch";
import { baseURL } from "#internal/nuxt/paths";
import { createHooks } from "hookable";
import { getContext } from "unctx";
import { sanitizeStatusCode, createError as createError$1, getRequestHeader, setCookie, getCookie, deleteCookie } from "h3";
import { getActiveHead, CapoPlugin } from "unhead";
import { defineHeadPlugin } from "@unhead/shared";
import { START_LOCATION, createMemoryHistory, createRouter as createRouter$1, useRoute as useRoute$1, RouterView } from "vue-router";
import { toRouteMatcher, createRouter } from "radix3";
import { withQuery, hasProtocol, isScriptProtocol, joinURL } from "ufo";
import { parse } from "cookie-es";
import destr from "destr";
import { isEqual } from "ohash";
import { klona } from "klona";
import { setupDevtoolsPlugin } from "@vue/devtools-api";
import "devalue";
import { vAutoAnimate } from "@formkit/auto-animate/vue";
import sync, { getFrameData } from "framesync";
import { inertia, animate, velocityPerSecond, cubicBezier, linear, easeIn, easeInOut, easeOut, circIn, circInOut, circOut, backIn, backInOut, backOut, anticipate, bounceIn, bounceInOut, bounceOut } from "popmotion";
import { number, px, color, degrees, scale, alpha, progressPercentage, filter, complex } from "style-value-types";
import { ssrRenderComponent, ssrRenderSuspense, ssrRenderVNode } from "vue/server-renderer";
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch$1.create({
    baseURL: baseURL()
  });
}
const appLayoutTransition = false;
const appPageTransition = false;
const appKeepalive = false;
const nuxtLinkDefaults = { "componentName": "NuxtLink" };
const asyncDataDefaults = { "value": null, "errorValue": null, "deep": true };
const fetchDefaults = {};
const appId = "nuxt-app";
function getNuxtAppCtx(appName = appId) {
  return getContext(appName, {
    asyncContext: false
  });
}
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    _name: appId,
    _scope: effectScope(),
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.12.2";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: shallowReactive({
      data: shallowReactive({}),
      state: reactive({}),
      once: /* @__PURE__ */ new Set(),
      _errors: shallowReactive({})
    }),
    static: {
      data: {}
    },
    runWithContext(fn) {
      if (nuxtApp._scope.active && !getCurrentScope()) {
        return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
      }
      return callWithNuxt(nuxtApp, fn);
    },
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: shallowReactive({}),
    _payloadRevivers: {},
    ...options
  };
  {
    nuxtApp.payload.serverRendered = true;
  }
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    const contextCaller = async function(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    };
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  {
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext.nuxt = nuxtApp;
      nuxtApp.ssrContext._payloadReducers = {};
      nuxtApp.payload.path = nuxtApp.ssrContext.url;
    }
    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    if (nuxtApp.ssrContext.payload) {
      Object.assign(nuxtApp.payload, nuxtApp.ssrContext.payload);
    }
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: options.ssrContext.runtimeConfig.public,
      app: options.ssrContext.runtimeConfig.app
    };
  }
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
function registerPluginHooks(nuxtApp, plugin2) {
  if (plugin2.hooks) {
    nuxtApp.hooks.addHooks(plugin2.hooks);
  }
}
async function applyPlugin(nuxtApp, plugin2) {
  if (typeof plugin2 === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin2(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  var _a, _b, _c, _d;
  const resolvedPlugins = [];
  const unresolvedPlugins = [];
  const parallels = [];
  const errors = [];
  let promiseDepth = 0;
  async function executePlugin(plugin2) {
    var _a2;
    const unresolvedPluginsForThisPlugin = ((_a2 = plugin2.dependsOn) == null ? void 0 : _a2.filter((name) => plugins2.some((p) => p._name === name) && !resolvedPlugins.includes(name))) ?? [];
    if (unresolvedPluginsForThisPlugin.length > 0) {
      unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin2]);
    } else {
      const promise = applyPlugin(nuxtApp, plugin2).then(async () => {
        if (plugin2._name) {
          resolvedPlugins.push(plugin2._name);
          await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
            if (dependsOn.has(plugin2._name)) {
              dependsOn.delete(plugin2._name);
              if (dependsOn.size === 0) {
                promiseDepth++;
                await executePlugin(unexecutedPlugin);
              }
            }
          }));
        }
      });
      if (plugin2.parallel) {
        parallels.push(promise.catch((e) => errors.push(e)));
      } else {
        await promise;
      }
    }
  }
  for (const plugin2 of plugins2) {
    if (((_a = nuxtApp.ssrContext) == null ? void 0 : _a.islandContext) && ((_b = plugin2.env) == null ? void 0 : _b.islands) === false) {
      continue;
    }
    registerPluginHooks(nuxtApp, plugin2);
  }
  for (const plugin2 of plugins2) {
    if (((_c = nuxtApp.ssrContext) == null ? void 0 : _c.islandContext) && ((_d = plugin2.env) == null ? void 0 : _d.islands) === false) {
      continue;
    }
    await executePlugin(plugin2);
  }
  await Promise.all(parallels);
  if (promiseDepth) {
    for (let i = 0; i < promiseDepth; i++) {
      await Promise.all(parallels);
    }
  }
  if (errors.length) {
    throw errors[0];
  }
}
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin2) {
  if (typeof plugin2 === "function") {
    return plugin2;
  }
  const _name = plugin2._name || plugin2.name;
  delete plugin2.name;
  return Object.assign(plugin2.setup || (() => {
  }), plugin2, { [NuxtPluginIndicator]: true, _name });
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => setup();
  const nuxtAppCtx = getNuxtAppCtx(nuxt._name);
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
function tryUseNuxtApp(appName) {
  var _a;
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = (_a = getCurrentInstance()) == null ? void 0 : _a.appContext.app.$nuxt;
  }
  nuxtAppInstance = nuxtAppInstance || getNuxtAppCtx(appName).tryUse();
  return nuxtAppInstance || null;
}
function useNuxtApp(appName) {
  const nuxtAppInstance = tryUseNuxtApp(appName);
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig(_event) {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const LayoutMetaSymbol = Symbol("layout-meta");
const PageRouteSymbol = Symbol("route");
const useRouter = () => {
  var _a;
  return (_a = useNuxtApp()) == null ? void 0 : _a.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};
const navigateTo = (to, options) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : withQuery(to.path || "/", to.query || {}) + (to.hash || "");
  const isExternal = (options == null ? void 0 : options.external) || hasProtocol(toPath, { acceptRelative: true });
  if (isExternal) {
    if (!(options == null ? void 0 : options.external)) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const { protocol } = new URL(toPath, "http://localhost");
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      const redirect = async function(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(/"/g, "%22");
        nuxtApp.ssrContext._renderResponse = {
          statusCode: sanitizeStatusCode((options == null ? void 0 : options.redirectCode) || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: encodeURI(location2) }
        };
        return response;
      };
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    nuxtApp._scope.stop();
    if (options == null ? void 0 : options.replace) {
      (void 0).replace(toPath);
    } else {
      (void 0).href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
const NUXT_ERROR_SIGNATURE = "__nuxt_error";
const useError = () => toRef(useNuxtApp().payload, "error");
const showError = (error) => {
  const nuxtError = createError(error);
  try {
    const nuxtApp = useNuxtApp();
    const error2 = useError();
    if (false) ;
    error2.value = error2.value || nuxtError;
  } catch {
    throw nuxtError;
  }
  return nuxtError;
};
const isNuxtError = (error) => !!error && typeof error === "object" && NUXT_ERROR_SIGNATURE in error;
const createError = (error) => {
  const nuxtError = createError$1(error);
  Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
    value: true,
    configurable: false,
    writable: false
  });
  return nuxtError;
};
version.startsWith("3");
function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput(ref2, lastKey = "") {
  if (ref2 instanceof Promise)
    return ref2;
  const root = resolveUnref(ref2);
  if (!ref2 || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput(r, lastKey));
  if (typeof root === "object") {
    return Object.fromEntries(
      Object.entries(root).map(([k, v]) => {
        if (k === "titleTemplate" || k.startsWith("on"))
          return [k, unref(v)];
        return [k, resolveUnrefHeadInput(v, k)];
      })
    );
  }
  return root;
}
defineHeadPlugin({
  hooks: {
    "entries:resolve": function(ctx) {
      for (const entry2 of ctx.entries)
        entry2.resolvedInput = resolveUnrefHeadInput(entry2.input);
    }
  }
});
const headSymbol = "usehead";
const _global = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey$1 = "__unhead_injection_handler__";
function setHeadInjectionHandler(handler2) {
  _global[globalKey$1] = handler2;
}
function injectHead() {
  if (globalKey$1 in _global) {
    return _global[globalKey$1]();
  }
  const head = inject(headSymbol);
  if (!head && process.env.NODE_ENV !== "production")
    console.warn("Unhead is missing Vue context, falling back to shared context. This may have unexpected results.");
  return head || getActiveHead();
}
[CapoPlugin({ track: true })];
const unhead_KgADcZ0jPj = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    setHeadInjectionHandler(
      // need a fresh instance of the nuxt app to avoid parallel requests interfering with each other
      () => useNuxtApp().vueApp._context.provides.usehead
    );
    nuxtApp.vueApp.use(head);
  }
});
function createContext(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als && currentInstance === void 0) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext({ ...defaultOpts, ...opts });
      }
      contexts[key];
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
_globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());
function executeAsync(function_) {
  const restores = [];
  for (const leaveHandler of asyncHandlers) {
    const restore2 = leaveHandler();
    if (restore2) {
      restores.push(restore2);
    }
  }
  const restore = () => {
    for (const restore2 of restores) {
      restore2();
    }
  };
  let awaitable = function_();
  if (awaitable && typeof awaitable === "object" && "catch" in awaitable) {
    awaitable = awaitable.catch((error) => {
      restore();
      throw error;
    });
  }
  return [awaitable, restore];
}
const interpolatePath = (route, match) => {
  return match.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
};
const generateRouteKey$1 = (routeProps, override) => {
  const matchedRoute = routeProps.route.matched.find((m) => {
    var _a;
    return ((_a = m.components) == null ? void 0 : _a.default) === routeProps.Component.type;
  });
  const source = override ?? (matchedRoute == null ? void 0 : matchedRoute.meta.key) ?? (matchedRoute && interpolatePath(routeProps.route, matchedRoute));
  return typeof source === "function" ? source(routeProps.route) : source;
};
const wrapInKeepAlive = (props, children) => {
  return { default: () => children };
};
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
function isPlainObject$1(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}
function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject$1(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject$1(value) && isPlainObject$1(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defu = createDefu();
const defuFn = createDefu((object, key, currentValue) => {
  if (object[key] !== void 0 && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});
async function getRouteRules(url) {
  {
    const _routeRulesMatcher = toRouteMatcher(
      createRouter({ routes: (/* @__PURE__ */ useRuntimeConfig()).nitro.routeRules })
    );
    return defu({}, ..._routeRulesMatcher.matchAll(url).reverse());
  }
}
const __nuxt_page_meta$7 = {
  layout: "empty"
};
const __nuxt_page_meta$6 = { layout: "empty" };
const __nuxt_page_meta$5 = {
  layout: "empty"
};
const __nuxt_page_meta$4 = {
  layout: "empty"
};
const __nuxt_page_meta$3 = {
  layout: "empty"
};
const __nuxt_page_meta$2 = {
  layout: "empty"
};
const __nuxt_page_meta$1 = {
  layout: "empty"
};
const __nuxt_page_meta = {
  layout: "empty"
};
const _routes = [
  {
    name: "admin-customers",
    path: "/admin/customers",
    component: () => import("./_nuxt/index-CkxwJyjB.js").then((m) => m.default || m)
  },
  {
    name: "admin",
    path: "/admin",
    component: () => import("./_nuxt/index-LiJdEGSo.js").then((m) => m.default || m)
  },
  {
    name: "admin-notifications",
    path: "/admin/notifications",
    component: () => import("./_nuxt/index-BJ0za_8e.js").then((m) => m.default || m)
  },
  {
    name: "admin-project_seller",
    path: "/admin/project_seller",
    component: () => import("./_nuxt/index-BY56XuRD.js").then((m) => m.default || m)
  },
  {
    name: "admin-projects",
    path: "/admin/projects",
    component: () => import("./_nuxt/index-BtPiG4t9.js").then((m) => m.default || m)
  },
  {
    name: "admin-users",
    path: "/admin/users",
    component: () => import("./_nuxt/index-DrrFC80d.js").then((m) => m.default || m)
  },
  {
    name: "index",
    path: "/",
    meta: __nuxt_page_meta$7 || {},
    component: () => import("./_nuxt/index-Cg6o0NMM.js").then((m) => m.default || m)
  },
  {
    name: "login",
    path: "/login",
    meta: __nuxt_page_meta$6 || {},
    component: () => import("./_nuxt/index-CboqKveH.js").then((m) => m.default || m)
  },
  {
    name: "project_details-id",
    path: "/project_details/:id()",
    component: () => import("./_nuxt/index-D07rIne9.js").then((m) => m.default || m)
  },
  {
    name: "project_details-block",
    path: "/project_details/block",
    component: () => import("./_nuxt/index-BIpCty6i.js").then((m) => m.default || m)
  },
  {
    name: "project_details-customers",
    path: "/project_details/customers",
    component: () => import("./_nuxt/index-YVXGWl6b.js").then((m) => m.default || m)
  },
  {
    name: "project_details-floor",
    path: "/project_details/floor",
    component: () => import("./_nuxt/index-CVgKnsW6.js").then((m) => m.default || m)
  },
  {
    name: "project_details-high_area",
    path: "/project_details/high_area",
    component: () => import("./_nuxt/index-BUWO9AXk.js").then((m) => m.default || m)
  },
  {
    name: "project_details-high_area-payment",
    path: "/project_details/high_area/payment",
    meta: __nuxt_page_meta$5 || {},
    component: () => import("./_nuxt/index-DXLY76G6.js").then((m) => m.default || m)
  },
  {
    name: "project_details-land_area",
    path: "/project_details/land_area",
    component: () => import("./_nuxt/index-MZEemHF4.js").then((m) => m.default || m)
  },
  {
    name: "project_details-land_area-payment",
    path: "/project_details/land_area/payment",
    meta: __nuxt_page_meta$4 || {},
    component: () => import("./_nuxt/index-IYHSIILw.js").then((m) => m.default || m)
  },
  {
    name: "project_details-notifications",
    path: "/project_details/notifications",
    component: () => import("./_nuxt/index-25uKnzJS.js").then((m) => m.default || m)
  },
  {
    name: "project_details-payment_method_process",
    path: "/project_details/payment_method_process",
    component: () => import("./_nuxt/index-Bsw8EomY.js").then((m) => m.default || m)
  },
  {
    name: "project_details-payment_method",
    path: "/project_details/payment_method",
    component: () => import("./_nuxt/index-DzooPbtt.js").then((m) => m.default || m)
  },
  {
    name: "project_details-svg_animation_viewer-3d_model_viewer",
    path: "/project_details/svg_animation_viewer/3d_model_viewer",
    meta: __nuxt_page_meta$3 || {},
    component: () => import("./_nuxt/index-DWFi1VIL.js").then((m) => m.default || m)
  },
  {
    name: "project_details-svg_animation_viewer-floor-high_area-3d_model_viewer",
    path: "/project_details/svg_animation_viewer/floor/high_area/3d_model_viewer",
    meta: __nuxt_page_meta$2 || {},
    component: () => import("./_nuxt/index-Cv--D_pb.js").then((m) => m.default || m)
  },
  {
    name: "project_details-svg_animation_viewer-floor-high_area-high_area_payment",
    path: "/project_details/svg_animation_viewer/floor/high_area/high_area_payment",
    meta: __nuxt_page_meta$1 || {},
    component: () => import("./_nuxt/index-SbA_kXn0.js").then((m) => m.default || m)
  },
  {
    name: "project_details-svg_animation_viewer-floor-high_area",
    path: "/project_details/svg_animation_viewer/floor/high_area",
    component: () => import("./_nuxt/index-DELwD3Tx.js").then((m) => m.default || m)
  },
  {
    name: "project_details-svg_animation_viewer-floor",
    path: "/project_details/svg_animation_viewer/floor",
    component: () => import("./_nuxt/index-D0MmFkdP.js").then((m) => m.default || m)
  },
  {
    name: "project_details-svg_animation_viewer",
    path: "/project_details/svg_animation_viewer",
    component: () => import("./_nuxt/index-gHGXCi2Y.js").then((m) => m.default || m)
  },
  {
    name: "project_details-svg_animation_viewer-land_area_payment",
    path: "/project_details/svg_animation_viewer/land_area_payment",
    meta: __nuxt_page_meta || {},
    component: () => import("./_nuxt/index-BVycT523.js").then((m) => m.default || m)
  },
  {
    name: "project_details-zone",
    path: "/project_details/zone",
    component: () => import("./_nuxt/index-BQv108XI.js").then((m) => m.default || m)
  }
];
const _wrapIf = (component, props, slots) => {
  props = props === true ? {} : props;
  return { default: () => {
    var _a;
    return props ? h(component, props, slots) : (_a = slots.default) == null ? void 0 : _a.call(slots);
  } };
};
function generateRouteKey(route) {
  const source = (route == null ? void 0 : route.meta.key) ?? route.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
  return typeof source === "function" ? source(route) : source;
}
function isChangingPage(to, from) {
  if (to === from || from === START_LOCATION) {
    return false;
  }
  if (generateRouteKey(to) !== generateRouteKey(from)) {
    return true;
  }
  const areComponentsSame = to.matched.every(
    (comp, index2) => {
      var _a, _b;
      return comp.components && comp.components.default === ((_b = (_a = from.matched[index2]) == null ? void 0 : _a.components) == null ? void 0 : _b.default);
    }
  );
  if (areComponentsSame) {
    return false;
  }
  return true;
}
const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    var _a;
    const nuxtApp = useNuxtApp();
    const behavior = ((_a = useRouter().options) == null ? void 0 : _a.scrollBehaviorType) ?? "auto";
    let position = savedPosition || void 0;
    const routeAllowsScrollToTop = typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop;
    if (!position && from && to && routeAllowsScrollToTop !== false && isChangingPage(to, from)) {
      position = { left: 0, top: 0 };
    }
    if (to.path === from.path) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior };
      }
      return false;
    }
    const hasTransition = (route) => !!(route.meta.pageTransition ?? appPageTransition);
    const hookToWait = hasTransition(from) && hasTransition(to) ? "page:transition:finish" : "page:finish";
    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce(hookToWait, async () => {
        await new Promise((resolve2) => setTimeout(resolve2, 0));
        if (to.hash) {
          position = { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior };
        }
        resolve(position);
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = (void 0).querySelector(selector);
    if (elem) {
      return Number.parseFloat(getComputedStyle(elem).scrollMarginTop);
    }
  } catch {
  }
  return 0;
}
const configRouterOptions = {
  hashMode: false,
  scrollBehaviorType: "auto"
};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const validate = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  var _a;
  let __temp, __restore;
  if (!((_a = to.meta) == null ? void 0 : _a.validate)) {
    return;
  }
  useNuxtApp();
  useRouter();
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  {
    return result;
  }
});
function useRequestEvent(nuxtApp = useNuxtApp()) {
  var _a;
  return (_a = nuxtApp.ssrContext) == null ? void 0 : _a.event;
}
function useRequestFetch() {
  var _a;
  return ((_a = useRequestEvent()) == null ? void 0 : _a.$fetch) || globalThis.$fetch;
}
const CookieDefaults = {
  path: "/",
  watch: true,
  decode: (val) => destr(decodeURIComponent(val)),
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name, _opts) {
  var _a;
  const opts = { ...CookieDefaults, ..._opts };
  const cookies = readRawCookies(opts) || {};
  let delay;
  if (opts.maxAge !== void 0) {
    delay = opts.maxAge * 1e3;
  } else if (opts.expires) {
    delay = opts.expires.getTime() - Date.now();
  }
  const hasExpired = delay !== void 0 && delay <= 0;
  const cookieValue = klona(hasExpired ? void 0 : cookies[name] ?? ((_a = opts.default) == null ? void 0 : _a.call(opts)));
  const cookie = ref(cookieValue);
  {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      if (opts.readonly || isEqual(cookie.value, cookies[name])) {
        return;
      }
      writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:error", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie;
}
function readRawCookies(opts = {}) {
  {
    return parse(getRequestHeader(useRequestEvent(), "cookie") || "", opts);
  }
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    if (value !== null && value !== void 0) {
      return setCookie(event, name, value, opts);
    }
    if (getCookie(event, name) !== void 0) {
      return deleteCookie(event, name, opts);
    }
  }
}
function set(target, key, val) {
  if (Array.isArray(target)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }
  target[key] = val;
  return val;
}
function del(target, key) {
  if (Array.isArray(target)) {
    target.splice(key, 1);
    return;
  }
  delete target[key];
}
const isVue2 = false;
/*!
 * pinia v2.1.7
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */
let activePinia;
const setActivePinia = (pinia) => activePinia = pinia;
const piniaSymbol = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function isPlainObject(o) {
  return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
}
var MutationType;
(function(MutationType2) {
  MutationType2["direct"] = "direct";
  MutationType2["patchObject"] = "patch object";
  MutationType2["patchFunction"] = "patch function";
})(MutationType || (MutationType = {}));
const IS_CLIENT = false;
const USE_DEVTOOLS = (process.env.NODE_ENV !== "production" || false) && !(process.env.NODE_ENV === "test") && IS_CLIENT;
const saveAs = () => {
};
function toastMessage(message2, type) {
  const piniaMessage = "🍍 " + message2;
  if (typeof __VUE_DEVTOOLS_TOAST__ === "function") {
    __VUE_DEVTOOLS_TOAST__(piniaMessage, type);
  } else if (type === "error") {
    console.error(piniaMessage);
  } else if (type === "warn") {
    console.warn(piniaMessage);
  } else {
    console.log(piniaMessage);
  }
}
function isPinia(o) {
  return "_a" in o && "install" in o;
}
function checkClipboardAccess() {
  if (!("clipboard" in void 0)) {
    toastMessage(`Your browser doesn't support the Clipboard API`, "error");
    return true;
  }
}
function checkNotFocusedError(error) {
  if (error instanceof Error && error.message.toLowerCase().includes("document is not focused")) {
    toastMessage('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn");
    return true;
  }
  return false;
}
async function actionGlobalCopyState(pinia) {
  if (checkClipboardAccess())
    return;
  try {
    await (void 0).clipboard.writeText(JSON.stringify(pinia.state.value));
    toastMessage("Global state copied to clipboard.");
  } catch (error) {
    if (checkNotFocusedError(error))
      return;
    toastMessage(`Failed to serialize the state. Check the console for more details.`, "error");
    console.error(error);
  }
}
async function actionGlobalPasteState(pinia) {
  if (checkClipboardAccess())
    return;
  try {
    loadStoresState(pinia, JSON.parse(await (void 0).clipboard.readText()));
    toastMessage("Global state pasted from clipboard.");
  } catch (error) {
    if (checkNotFocusedError(error))
      return;
    toastMessage(`Failed to deserialize the state from clipboard. Check the console for more details.`, "error");
    console.error(error);
  }
}
async function actionGlobalSaveState(pinia) {
  try {
    saveAs(new Blob([JSON.stringify(pinia.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (error) {
    toastMessage(`Failed to export the state as JSON. Check the console for more details.`, "error");
    console.error(error);
  }
}
let fileInput;
function getFileOpener() {
  if (!fileInput) {
    fileInput = (void 0).createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".json";
  }
  function openFile() {
    return new Promise((resolve, reject) => {
      fileInput.onchange = async () => {
        const files = fileInput.files;
        if (!files)
          return resolve(null);
        const file = files.item(0);
        if (!file)
          return resolve(null);
        return resolve({ text: await file.text(), file });
      };
      fileInput.oncancel = () => resolve(null);
      fileInput.onerror = reject;
      fileInput.click();
    });
  }
  return openFile;
}
async function actionGlobalOpenStateFile(pinia) {
  try {
    const open2 = getFileOpener();
    const result = await open2();
    if (!result)
      return;
    const { text, file } = result;
    loadStoresState(pinia, JSON.parse(text));
    toastMessage(`Global state imported from "${file.name}".`);
  } catch (error) {
    toastMessage(`Failed to import the state from JSON. Check the console for more details.`, "error");
    console.error(error);
  }
}
function loadStoresState(pinia, state) {
  for (const key in state) {
    const storeState = pinia.state.value[key];
    if (storeState) {
      Object.assign(storeState, state[key]);
    } else {
      pinia.state.value[key] = state[key];
    }
  }
}
function formatDisplay(display) {
  return {
    _custom: {
      display
    }
  };
}
const PINIA_ROOT_LABEL = "🍍 Pinia (root)";
const PINIA_ROOT_ID = "_root";
function formatStoreForInspectorTree(store) {
  return isPinia(store) ? {
    id: PINIA_ROOT_ID,
    label: PINIA_ROOT_LABEL
  } : {
    id: store.$id,
    label: store.$id
  };
}
function formatStoreForInspectorState(store) {
  if (isPinia(store)) {
    const storeNames = Array.from(store._s.keys());
    const storeMap = store._s;
    const state2 = {
      state: storeNames.map((storeId) => ({
        editable: true,
        key: storeId,
        value: store.state.value[storeId]
      })),
      getters: storeNames.filter((id) => storeMap.get(id)._getters).map((id) => {
        const store2 = storeMap.get(id);
        return {
          editable: false,
          key: id,
          value: store2._getters.reduce((getters, key) => {
            getters[key] = store2[key];
            return getters;
          }, {})
        };
      })
    };
    return state2;
  }
  const state = {
    state: Object.keys(store.$state).map((key) => ({
      editable: true,
      key,
      value: store.$state[key]
    }))
  };
  if (store._getters && store._getters.length) {
    state.getters = store._getters.map((getterName) => ({
      editable: false,
      key: getterName,
      value: store[getterName]
    }));
  }
  if (store._customProperties.size) {
    state.customProperties = Array.from(store._customProperties).map((key) => ({
      editable: true,
      key,
      value: store[key]
    }));
  }
  return state;
}
function formatEventData(events) {
  if (!events)
    return {};
  if (Array.isArray(events)) {
    return events.reduce((data, event) => {
      data.keys.push(event.key);
      data.operations.push(event.type);
      data.oldValue[event.key] = event.oldValue;
      data.newValue[event.key] = event.newValue;
      return data;
    }, {
      oldValue: {},
      keys: [],
      operations: [],
      newValue: {}
    });
  } else {
    return {
      operation: formatDisplay(events.type),
      key: formatDisplay(events.key),
      oldValue: events.oldValue,
      newValue: events.newValue
    };
  }
}
function formatMutationType(type) {
  switch (type) {
    case MutationType.direct:
      return "mutation";
    case MutationType.patchFunction:
      return "$patch";
    case MutationType.patchObject:
      return "$patch";
    default:
      return "unknown";
  }
}
let isTimelineActive = true;
const componentStateTypes = [];
const MUTATIONS_LAYER_ID = "pinia:mutations";
const INSPECTOR_ID = "pinia";
const { assign: assign$1 } = Object;
const getStoreType = (id) => "🍍 " + id;
function registerPiniaDevtools(app, pinia) {
  setupDevtoolsPlugin({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes,
    app
  }, (api) => {
    if (typeof api.now !== "function") {
      toastMessage("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html.");
    }
    api.addTimelineLayer({
      id: MUTATIONS_LAYER_ID,
      label: `Pinia 🍍`,
      color: 15064968
    });
    api.addInspector({
      id: INSPECTOR_ID,
      label: "Pinia 🍍",
      icon: "storage",
      treeFilterPlaceholder: "Search stores",
      actions: [
        {
          icon: "content_copy",
          action: () => {
            actionGlobalCopyState(pinia);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await actionGlobalPasteState(pinia);
            api.sendInspectorTree(INSPECTOR_ID);
            api.sendInspectorState(INSPECTOR_ID);
          },
          tooltip: "Replace the state with the content of your clipboard"
        },
        {
          icon: "save",
          action: () => {
            actionGlobalSaveState(pinia);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await actionGlobalOpenStateFile(pinia);
            api.sendInspectorTree(INSPECTOR_ID);
            api.sendInspectorState(INSPECTOR_ID);
          },
          tooltip: "Import the state from a JSON file"
        }
      ],
      nodeActions: [
        {
          icon: "restore",
          tooltip: 'Reset the state (with "$reset")',
          action: (nodeId) => {
            const store = pinia._s.get(nodeId);
            if (!store) {
              toastMessage(`Cannot reset "${nodeId}" store because it wasn't found.`, "warn");
            } else if (typeof store.$reset !== "function") {
              toastMessage(`Cannot reset "${nodeId}" store because it doesn't have a "$reset" method implemented.`, "warn");
            } else {
              store.$reset();
              toastMessage(`Store "${nodeId}" reset.`);
            }
          }
        }
      ]
    });
    api.on.inspectComponent((payload, ctx) => {
      const proxy = payload.componentInstance && payload.componentInstance.proxy;
      if (proxy && proxy._pStores) {
        const piniaStores = payload.componentInstance.proxy._pStores;
        Object.values(piniaStores).forEach((store) => {
          payload.instanceData.state.push({
            type: getStoreType(store.$id),
            key: "state",
            editable: true,
            value: store._isOptionsAPI ? {
              _custom: {
                value: toRaw(store.$state),
                actions: [
                  {
                    icon: "restore",
                    tooltip: "Reset the state of this store",
                    action: () => store.$reset()
                  }
                ]
              }
            } : (
              // NOTE: workaround to unwrap transferred refs
              Object.keys(store.$state).reduce((state, key) => {
                state[key] = store.$state[key];
                return state;
              }, {})
            )
          });
          if (store._getters && store._getters.length) {
            payload.instanceData.state.push({
              type: getStoreType(store.$id),
              key: "getters",
              editable: false,
              value: store._getters.reduce((getters, key) => {
                try {
                  getters[key] = store[key];
                } catch (error) {
                  getters[key] = error;
                }
                return getters;
              }, {})
            });
          }
        });
      }
    });
    api.on.getInspectorTree((payload) => {
      if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
        let stores = [pinia];
        stores = stores.concat(Array.from(pinia._s.values()));
        payload.rootNodes = (payload.filter ? stores.filter((store) => "$id" in store ? store.$id.toLowerCase().includes(payload.filter.toLowerCase()) : PINIA_ROOT_LABEL.toLowerCase().includes(payload.filter.toLowerCase())) : stores).map(formatStoreForInspectorTree);
      }
    });
    api.on.getInspectorState((payload) => {
      if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
        const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
        if (!inspectedStore) {
          return;
        }
        if (inspectedStore) {
          payload.state = formatStoreForInspectorState(inspectedStore);
        }
      }
    });
    api.on.editInspectorState((payload, ctx) => {
      if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
        const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
        if (!inspectedStore) {
          return toastMessage(`store "${payload.nodeId}" not found`, "error");
        }
        const { path } = payload;
        if (!isPinia(inspectedStore)) {
          if (path.length !== 1 || !inspectedStore._customProperties.has(path[0]) || path[0] in inspectedStore.$state) {
            path.unshift("$state");
          }
        } else {
          path.unshift("state");
        }
        isTimelineActive = false;
        payload.set(inspectedStore, path, payload.state.value);
        isTimelineActive = true;
      }
    });
    api.on.editComponentState((payload) => {
      if (payload.type.startsWith("🍍")) {
        const storeId = payload.type.replace(/^🍍\s*/, "");
        const store = pinia._s.get(storeId);
        if (!store) {
          return toastMessage(`store "${storeId}" not found`, "error");
        }
        const { path } = payload;
        if (path[0] !== "state") {
          return toastMessage(`Invalid path for store "${storeId}":
${path}
Only state can be modified.`);
        }
        path[0] = "$state";
        isTimelineActive = false;
        payload.set(store, path, payload.state.value);
        isTimelineActive = true;
      }
    });
  });
}
function addStoreToDevtools(app, store) {
  if (!componentStateTypes.includes(getStoreType(store.$id))) {
    componentStateTypes.push(getStoreType(store.$id));
  }
  setupDevtoolsPlugin({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes,
    app,
    settings: {
      logStoreChanges: {
        label: "Notify about new/deleted stores",
        type: "boolean",
        defaultValue: true
      }
      // useEmojis: {
      //   label: 'Use emojis in messages ⚡️',
      //   type: 'boolean',
      //   defaultValue: true,
      // },
    }
  }, (api) => {
    const now = typeof api.now === "function" ? api.now.bind(api) : Date.now;
    store.$onAction(({ after, onError, name, args }) => {
      const groupId = runningActionId++;
      api.addTimelineEvent({
        layerId: MUTATIONS_LAYER_ID,
        event: {
          time: now(),
          title: "🛫 " + name,
          subtitle: "start",
          data: {
            store: formatDisplay(store.$id),
            action: formatDisplay(name),
            args
          },
          groupId
        }
      });
      after((result) => {
        activeAction = void 0;
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now(),
            title: "🛬 " + name,
            subtitle: "end",
            data: {
              store: formatDisplay(store.$id),
              action: formatDisplay(name),
              args,
              result
            },
            groupId
          }
        });
      });
      onError((error) => {
        activeAction = void 0;
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now(),
            logType: "error",
            title: "💥 " + name,
            subtitle: "end",
            data: {
              store: formatDisplay(store.$id),
              action: formatDisplay(name),
              args,
              error
            },
            groupId
          }
        });
      });
    }, true);
    store._customProperties.forEach((name) => {
      watch(() => unref(store[name]), (newValue, oldValue) => {
        api.notifyComponentUpdate();
        api.sendInspectorState(INSPECTOR_ID);
        if (isTimelineActive) {
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now(),
              title: "Change",
              subtitle: name,
              data: {
                newValue,
                oldValue
              },
              groupId: activeAction
            }
          });
        }
      }, { deep: true });
    });
    store.$subscribe(({ events, type }, state) => {
      api.notifyComponentUpdate();
      api.sendInspectorState(INSPECTOR_ID);
      if (!isTimelineActive)
        return;
      const eventData = {
        time: now(),
        title: formatMutationType(type),
        data: assign$1({ store: formatDisplay(store.$id) }, formatEventData(events)),
        groupId: activeAction
      };
      if (type === MutationType.patchFunction) {
        eventData.subtitle = "⤵️";
      } else if (type === MutationType.patchObject) {
        eventData.subtitle = "🧩";
      } else if (events && !Array.isArray(events)) {
        eventData.subtitle = events.type;
      }
      if (events) {
        eventData.data["rawEvent(s)"] = {
          _custom: {
            display: "DebuggerEvent",
            type: "object",
            tooltip: "raw DebuggerEvent[]",
            value: events
          }
        };
      }
      api.addTimelineEvent({
        layerId: MUTATIONS_LAYER_ID,
        event: eventData
      });
    }, { detached: true, flush: "sync" });
    const hotUpdate = store._hotUpdate;
    store._hotUpdate = markRaw((newStore) => {
      hotUpdate(newStore);
      api.addTimelineEvent({
        layerId: MUTATIONS_LAYER_ID,
        event: {
          time: now(),
          title: "🔥 " + store.$id,
          subtitle: "HMR update",
          data: {
            store: formatDisplay(store.$id),
            info: formatDisplay(`HMR update`)
          }
        }
      });
      api.notifyComponentUpdate();
      api.sendInspectorTree(INSPECTOR_ID);
      api.sendInspectorState(INSPECTOR_ID);
    });
    const { $dispose } = store;
    store.$dispose = () => {
      $dispose();
      api.notifyComponentUpdate();
      api.sendInspectorTree(INSPECTOR_ID);
      api.sendInspectorState(INSPECTOR_ID);
      api.getSettings().logStoreChanges && toastMessage(`Disposed "${store.$id}" store 🗑`);
    };
    api.notifyComponentUpdate();
    api.sendInspectorTree(INSPECTOR_ID);
    api.sendInspectorState(INSPECTOR_ID);
    api.getSettings().logStoreChanges && toastMessage(`"${store.$id}" store installed 🆕`);
  });
}
let runningActionId = 0;
let activeAction;
function patchActionForGrouping(store, actionNames, wrapWithProxy) {
  const actions = actionNames.reduce((storeActions, actionName) => {
    storeActions[actionName] = toRaw(store)[actionName];
    return storeActions;
  }, {});
  for (const actionName in actions) {
    store[actionName] = function() {
      const _actionId = runningActionId;
      const trackedStore = wrapWithProxy ? new Proxy(store, {
        get(...args) {
          activeAction = _actionId;
          return Reflect.get(...args);
        },
        set(...args) {
          activeAction = _actionId;
          return Reflect.set(...args);
        }
      }) : store;
      activeAction = _actionId;
      const retValue = actions[actionName].apply(trackedStore, arguments);
      activeAction = void 0;
      return retValue;
    };
  }
}
function devtoolsPlugin({ app, store, options }) {
  if (store.$id.startsWith("__hot:")) {
    return;
  }
  store._isOptionsAPI = !!options.state;
  patchActionForGrouping(store, Object.keys(options.actions), store._isOptionsAPI);
  const originalHotUpdate = store._hotUpdate;
  toRaw(store)._hotUpdate = function(newStore) {
    originalHotUpdate.apply(this, arguments);
    patchActionForGrouping(store, Object.keys(newStore._hmrPayload.actions), !!store._isOptionsAPI);
  };
  addStoreToDevtools(
    app,
    // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
    store
  );
}
function createPinia() {
  const scope = effectScope(true);
  const state = scope.run(() => ref({}));
  let _p = [];
  let toBeInstalled = [];
  const pinia = markRaw({
    install(app) {
      setActivePinia(pinia);
      {
        pinia._a = app;
        app.provide(piniaSymbol, pinia);
        app.config.globalProperties.$pinia = pinia;
        if (USE_DEVTOOLS) {
          registerPiniaDevtools(app, pinia);
        }
        toBeInstalled.forEach((plugin2) => _p.push(plugin2));
        toBeInstalled = [];
      }
    },
    use(plugin2) {
      if (!this._a && !isVue2) {
        toBeInstalled.push(plugin2);
      } else {
        _p.push(plugin2);
      }
      return this;
    },
    _p,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: scope,
    _s: /* @__PURE__ */ new Map(),
    state
  });
  if (USE_DEVTOOLS && typeof Proxy !== "undefined") {
    pinia.use(devtoolsPlugin);
  }
  return pinia;
}
function patchObject(newState, oldState) {
  for (const key in oldState) {
    const subPatch = oldState[key];
    if (!(key in newState)) {
      continue;
    }
    const targetValue = newState[key];
    if (isPlainObject(targetValue) && isPlainObject(subPatch) && !isRef(subPatch) && !isReactive(subPatch)) {
      newState[key] = patchObject(targetValue, subPatch);
    } else {
      {
        newState[key] = subPatch;
      }
    }
  }
  return newState;
}
const noop$1 = () => {
};
function addSubscription(subscriptions, callback, detached, onCleanup = noop$1) {
  subscriptions.push(callback);
  const removeSubscription = () => {
    const idx = subscriptions.indexOf(callback);
    if (idx > -1) {
      subscriptions.splice(idx, 1);
      onCleanup();
    }
  };
  if (!detached && getCurrentScope()) {
    onScopeDispose(removeSubscription);
  }
  return removeSubscription;
}
function triggerSubscriptions(subscriptions, ...args) {
  subscriptions.slice().forEach((callback) => {
    callback(...args);
  });
}
const fallbackRunWithContext = (fn) => fn();
function mergeReactiveObjects(target, patchToApply) {
  if (target instanceof Map && patchToApply instanceof Map) {
    patchToApply.forEach((value, key) => target.set(key, value));
  }
  if (target instanceof Set && patchToApply instanceof Set) {
    patchToApply.forEach(target.add, target);
  }
  for (const key in patchToApply) {
    if (!patchToApply.hasOwnProperty(key))
      continue;
    const subPatch = patchToApply[key];
    const targetValue = target[key];
    if (isPlainObject(targetValue) && isPlainObject(subPatch) && target.hasOwnProperty(key) && !isRef(subPatch) && !isReactive(subPatch)) {
      target[key] = mergeReactiveObjects(targetValue, subPatch);
    } else {
      target[key] = subPatch;
    }
  }
  return target;
}
const skipHydrateSymbol = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function shouldHydrate(obj) {
  return !isPlainObject(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
}
const { assign } = Object;
function isComputed(o) {
  return !!(isRef(o) && o.effect);
}
function createOptionsStore(id, options, pinia, hot) {
  const { state, actions, getters } = options;
  const initialState = pinia.state.value[id];
  let store;
  function setup() {
    if (!initialState && (!(process.env.NODE_ENV !== "production") || !hot)) {
      {
        pinia.state.value[id] = state ? state() : {};
      }
    }
    const localState = process.env.NODE_ENV !== "production" && hot ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      toRefs(ref(state ? state() : {}).value)
    ) : toRefs(pinia.state.value[id]);
    return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
      if (process.env.NODE_ENV !== "production" && name in localState) {
        console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${name}" in store "${id}".`);
      }
      computedGetters[name] = markRaw(computed(() => {
        setActivePinia(pinia);
        const store2 = pinia._s.get(id);
        return getters[name].call(store2, store2);
      }));
      return computedGetters;
    }, {}));
  }
  store = createSetupStore(id, setup, options, pinia, hot, true);
  return store;
}
function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
  let scope;
  const optionsForPlugin = assign({ actions: {} }, options);
  if (process.env.NODE_ENV !== "production" && !pinia._e.active) {
    throw new Error("Pinia destroyed");
  }
  const $subscribeOptions = {
    deep: true
    // flush: 'post',
  };
  if (process.env.NODE_ENV !== "production" && !isVue2) {
    $subscribeOptions.onTrigger = (event) => {
      if (isListening) {
        debuggerEvents = event;
      } else if (isListening == false && !store._hotUpdating) {
        if (Array.isArray(debuggerEvents)) {
          debuggerEvents.push(event);
        } else {
          console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug.");
        }
      }
    };
  }
  let isListening;
  let isSyncListening;
  let subscriptions = [];
  let actionSubscriptions = [];
  let debuggerEvents;
  const initialState = pinia.state.value[$id];
  if (!isOptionsStore && !initialState && (!(process.env.NODE_ENV !== "production") || !hot)) {
    {
      pinia.state.value[$id] = {};
    }
  }
  const hotState = ref({});
  let activeListener;
  function $patch(partialStateOrMutator) {
    let subscriptionMutation;
    isListening = isSyncListening = false;
    if (process.env.NODE_ENV !== "production") {
      debuggerEvents = [];
    }
    if (typeof partialStateOrMutator === "function") {
      partialStateOrMutator(pinia.state.value[$id]);
      subscriptionMutation = {
        type: MutationType.patchFunction,
        storeId: $id,
        events: debuggerEvents
      };
    } else {
      mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
      subscriptionMutation = {
        type: MutationType.patchObject,
        payload: partialStateOrMutator,
        storeId: $id,
        events: debuggerEvents
      };
    }
    const myListenerId = activeListener = Symbol();
    nextTick().then(() => {
      if (activeListener === myListenerId) {
        isListening = true;
      }
    });
    isSyncListening = true;
    triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
  }
  const $reset = isOptionsStore ? function $reset2() {
    const { state } = options;
    const newState = state ? state() : {};
    this.$patch(($state) => {
      assign($state, newState);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${$id}" is built using the setup syntax and does not implement $reset().`);
    } : noop$1
  );
  function $dispose() {
    scope.stop();
    subscriptions = [];
    actionSubscriptions = [];
    pinia._s.delete($id);
  }
  function wrapAction(name, action) {
    return function() {
      setActivePinia(pinia);
      const args = Array.from(arguments);
      const afterCallbackList = [];
      const onErrorCallbackList = [];
      function after(callback) {
        afterCallbackList.push(callback);
      }
      function onError(callback) {
        onErrorCallbackList.push(callback);
      }
      triggerSubscriptions(actionSubscriptions, {
        args,
        name,
        store,
        after,
        onError
      });
      let ret;
      try {
        ret = action.apply(this && this.$id === $id ? this : store, args);
      } catch (error) {
        triggerSubscriptions(onErrorCallbackList, error);
        throw error;
      }
      if (ret instanceof Promise) {
        return ret.then((value) => {
          triggerSubscriptions(afterCallbackList, value);
          return value;
        }).catch((error) => {
          triggerSubscriptions(onErrorCallbackList, error);
          return Promise.reject(error);
        });
      }
      triggerSubscriptions(afterCallbackList, ret);
      return ret;
    };
  }
  const _hmrPayload = /* @__PURE__ */ markRaw({
    actions: {},
    getters: {},
    state: [],
    hotState
  });
  const partialStore = {
    _p: pinia,
    // _s: scope,
    $id,
    $onAction: addSubscription.bind(null, actionSubscriptions),
    $patch,
    $reset,
    $subscribe(callback, options2 = {}) {
      const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
      const stopWatcher = scope.run(() => watch(() => pinia.state.value[$id], (state) => {
        if (options2.flush === "sync" ? isSyncListening : isListening) {
          callback({
            storeId: $id,
            type: MutationType.direct,
            events: debuggerEvents
          }, state);
        }
      }, assign({}, $subscribeOptions, options2)));
      return removeSubscription;
    },
    $dispose
  };
  const store = reactive(process.env.NODE_ENV !== "production" || USE_DEVTOOLS ? assign(
    {
      _hmrPayload,
      _customProperties: markRaw(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    partialStore
    // must be added later
    // setupStore
  ) : partialStore);
  pinia._s.set($id, store);
  const runWithContext = pinia._a && pinia._a.runWithContext || fallbackRunWithContext;
  const setupStore = runWithContext(() => pinia._e.run(() => (scope = effectScope()).run(setup)));
  for (const key in setupStore) {
    const prop = setupStore[key];
    if (isRef(prop) && !isComputed(prop) || isReactive(prop)) {
      if (process.env.NODE_ENV !== "production" && hot) {
        set(hotState.value, key, toRef(setupStore, key));
      } else if (!isOptionsStore) {
        if (initialState && shouldHydrate(prop)) {
          if (isRef(prop)) {
            prop.value = initialState[key];
          } else {
            mergeReactiveObjects(prop, initialState[key]);
          }
        }
        {
          pinia.state.value[$id][key] = prop;
        }
      }
      if (process.env.NODE_ENV !== "production") {
        _hmrPayload.state.push(key);
      }
    } else if (typeof prop === "function") {
      const actionValue = process.env.NODE_ENV !== "production" && hot ? prop : wrapAction(key, prop);
      {
        setupStore[key] = actionValue;
      }
      if (process.env.NODE_ENV !== "production") {
        _hmrPayload.actions[key] = prop;
      }
      optionsForPlugin.actions[key] = prop;
    } else if (process.env.NODE_ENV !== "production") {
      if (isComputed(prop)) {
        _hmrPayload.getters[key] = isOptionsStore ? (
          // @ts-expect-error
          options.getters[key]
        ) : prop;
      }
    }
  }
  {
    assign(store, setupStore);
    assign(toRaw(store), setupStore);
  }
  Object.defineProperty(store, "$state", {
    get: () => process.env.NODE_ENV !== "production" && hot ? hotState.value : pinia.state.value[$id],
    set: (state) => {
      if (process.env.NODE_ENV !== "production" && hot) {
        throw new Error("cannot set hotState");
      }
      $patch(($state) => {
        assign($state, state);
      });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    store._hotUpdate = markRaw((newStore) => {
      store._hotUpdating = true;
      newStore._hmrPayload.state.forEach((stateKey) => {
        if (stateKey in store.$state) {
          const newStateTarget = newStore.$state[stateKey];
          const oldStateSource = store.$state[stateKey];
          if (typeof newStateTarget === "object" && isPlainObject(newStateTarget) && isPlainObject(oldStateSource)) {
            patchObject(newStateTarget, oldStateSource);
          } else {
            newStore.$state[stateKey] = oldStateSource;
          }
        }
        set(store, stateKey, toRef(newStore.$state, stateKey));
      });
      Object.keys(store.$state).forEach((stateKey) => {
        if (!(stateKey in newStore.$state)) {
          del(store, stateKey);
        }
      });
      isListening = false;
      isSyncListening = false;
      pinia.state.value[$id] = toRef(newStore._hmrPayload, "hotState");
      isSyncListening = true;
      nextTick().then(() => {
        isListening = true;
      });
      for (const actionName in newStore._hmrPayload.actions) {
        const action = newStore[actionName];
        set(store, actionName, wrapAction(actionName, action));
      }
      for (const getterName in newStore._hmrPayload.getters) {
        const getter = newStore._hmrPayload.getters[getterName];
        const getterValue = isOptionsStore ? (
          // special handling of options api
          computed(() => {
            setActivePinia(pinia);
            return getter.call(store, store);
          })
        ) : getter;
        set(store, getterName, getterValue);
      }
      Object.keys(store._hmrPayload.getters).forEach((key) => {
        if (!(key in newStore._hmrPayload.getters)) {
          del(store, key);
        }
      });
      Object.keys(store._hmrPayload.actions).forEach((key) => {
        if (!(key in newStore._hmrPayload.actions)) {
          del(store, key);
        }
      });
      store._hmrPayload = newStore._hmrPayload;
      store._getters = newStore._getters;
      store._hotUpdating = false;
    });
  }
  if (USE_DEVTOOLS) {
    const nonEnumerable = {
      writable: true,
      configurable: true,
      // avoid warning on devtools trying to display this property
      enumerable: false
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((p) => {
      Object.defineProperty(store, p, assign({ value: store[p] }, nonEnumerable));
    });
  }
  pinia._p.forEach((extender) => {
    if (USE_DEVTOOLS) {
      const extensions = scope.run(() => extender({
        store,
        app: pinia._a,
        pinia,
        options: optionsForPlugin
      }));
      Object.keys(extensions || {}).forEach((key) => store._customProperties.add(key));
      assign(store, extensions);
    } else {
      assign(store, scope.run(() => extender({
        store,
        app: pinia._a,
        pinia,
        options: optionsForPlugin
      })));
    }
  });
  if (process.env.NODE_ENV !== "production" && store.$state && typeof store.$state === "object" && typeof store.$state.constructor === "function" && !store.$state.constructor.toString().includes("[native code]")) {
    console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${store.$id}".`);
  }
  if (initialState && isOptionsStore && options.hydrate) {
    options.hydrate(store.$state, initialState);
  }
  isListening = true;
  isSyncListening = true;
  return store;
}
function defineStore(idOrOptions, setup, setupOptions) {
  let id;
  let options;
  const isSetupStore = typeof setup === "function";
  if (typeof idOrOptions === "string") {
    id = idOrOptions;
    options = isSetupStore ? setupOptions : setup;
  } else {
    options = idOrOptions;
    id = idOrOptions.id;
    if (process.env.NODE_ENV !== "production" && typeof id !== "string") {
      throw new Error(`[🍍]: "defineStore()" must be passed a store id as its first argument.`);
    }
  }
  function useStore(pinia, hot) {
    const hasContext = hasInjectionContext();
    pinia = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && activePinia && activePinia._testing ? null : pinia) || (hasContext ? inject(piniaSymbol, null) : null);
    if (pinia)
      setActivePinia(pinia);
    if (process.env.NODE_ENV !== "production" && !activePinia) {
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    }
    pinia = activePinia;
    if (!pinia._s.has(id)) {
      if (isSetupStore) {
        createSetupStore(id, setup, options, pinia);
      } else {
        createOptionsStore(id, options, pinia);
      }
      if (process.env.NODE_ENV !== "production") {
        useStore._pinia = pinia;
      }
    }
    const store = pinia._s.get(id);
    if (process.env.NODE_ENV !== "production" && hot) {
      const hotId = "__hot:" + id;
      const newStore = isSetupStore ? createSetupStore(hotId, setup, options, pinia, true) : createOptionsStore(hotId, assign({}, options), pinia, true);
      hot._hotUpdate(newStore);
      delete pinia.state.value[hotId];
      pinia._s.delete(hotId);
    }
    if (process.env.NODE_ENV !== "production" && IS_CLIENT) {
      const currentInstance = getCurrentInstance();
      if (currentInstance && currentInstance.proxy && // avoid adding stores that are just built for hot module replacement
      !hot) {
        const vm = currentInstance.proxy;
        const cache = "_pStores" in vm ? vm._pStores : vm._pStores = {};
        cache[id] = store;
      }
    }
    return store;
  }
  useStore.$id = id;
  return useStore;
}
function storeToRefs(store) {
  {
    store = toRaw(store);
    const refs = {};
    for (const key in store) {
      const value = store[key];
      if (isRef(value) || isReactive(value)) {
        refs[key] = // ---
        toRef(store, key);
      }
    }
    return refs;
  }
}
const baseUrl = "http://localhost:3003/v1";
const landingPageAboutUsContents = [
  { title: "Real Estate Management", icon: "ion:home-outline" },
  {
    title: "SVG Animation Viewer",
    icon: "material-symbols:interactive-space-outline"
  },
  { title: "Payment Management", icon: "streamline:payment-10" },
  { title: "CRM Service", icon: "streamline:information-desk-customer" }
];
const landingPageServicesContent = [
  {
    image: "/images/dashboard.png",
    title: "Dashboard System",
    content: "Provide methods for project, user, and notification management. Manage all projects, users, and notifications in each project within the system.",
    action: {
      goto: {
        path: "admin",
        external: false
      }
    }
  },
  {
    image: "/images/detail_project_support.png",
    title: "Detailed Project Support For Sales",
    content: "Provide project, CRM, and sales processes in a project. Support the sales department to enhance performance.",
    action: {
      goto: {
        path: "#projects",
        external: true
      }
    }
  }
];
const useAuthStore = defineStore("Auth", () => {
  const authenticated = ref(false);
  const user = ref({});
  const authenticateUser = async (loginName, password2) => {
    try {
      const { data } = await $fetch(baseUrl + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {
          login_name: loginName,
          password: password2
        }
      });
      if (data != null) {
        const token = useCookie("token");
        token.value = data.token;
        user.value = data;
        localStorage.setItem("user", JSON.stringify(data));
        authenticated.value = true;
      }
    } catch (error) {
      authenticated.value = false;
    }
  };
  const logUserOut = () => {
    const token = useCookie("token");
    token.value = null;
    user.value = null;
    localStorage.removeItem("user");
    authenticated.value = false;
  };
  return { authenticated, user, authenticateUser, logUserOut };
});
const auth_45global = /* @__PURE__ */ defineNuxtRouteMiddleware((to) => {
  const { authenticated, user } = storeToRefs(useAuthStore());
  const token = useCookie("token");
  if (!token.value && ((to == null ? void 0 : to.name.includes("project_details")) || (to == null ? void 0 : to.name.includes("admin")))) {
    return navigateTo("/login");
  }
  if (token.value) {
    authenticated.value = true;
  }
  if (token.value && (to == null ? void 0 : to.name) === "login") {
    return navigateTo("/");
  }
  if (token.value && (to == null ? void 0 : to.name.includes("admin")) && user.value["type"] != "admin" && user.value["type"] == "super_admin" && user.value["type"] == "sale_manager") {
    return navigateTo("/");
  }
});
const manifest_45route_45rule = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  {
    return;
  }
});
const globalMiddleware = [
  validate,
  auth_45global,
  manifest_45route_45rule
];
const namedMiddleware = {};
const plugin$1 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    var _a, _b, _c, _d;
    let __temp, __restore;
    let routerBase = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    if (routerOptions.hashMode && !routerBase.includes("#")) {
      routerBase += "#";
    }
    const history = ((_a = routerOptions.history) == null ? void 0 : _a.call(routerOptions, routerBase)) ?? createMemoryHistory(routerBase);
    const routes = ((_b = routerOptions.routes) == null ? void 0 : _b.call(routerOptions, _routes)) ?? _routes;
    let startPosition;
    const router = createRouter$1({
      ...routerOptions,
      scrollBehavior: (to, from, savedPosition) => {
        if (from === START_LOCATION) {
          startPosition = savedPosition;
          return;
        }
        if (routerOptions.scrollBehavior) {
          router.options.scrollBehavior = routerOptions.scrollBehavior;
          if ("scrollRestoration" in (void 0).history) {
            const unsub = router.beforeEach(() => {
              unsub();
              (void 0).history.scrollRestoration = "manual";
            });
          }
          return routerOptions.scrollBehavior(to, START_LOCATION, startPosition || savedPosition);
        }
      },
      history,
      routes
    });
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from) => {
      previousRoute.value = from;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const initialURL = nuxtApp.ssrContext.url;
    const _route = shallowRef(router.currentRoute.value);
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    nuxtApp.hook("page:finish", syncCurrentRoute);
    router.afterEach((to, from) => {
      var _a2, _b2, _c2, _d2;
      if (((_b2 = (_a2 = to.matched[0]) == null ? void 0 : _a2.components) == null ? void 0 : _b2.default) === ((_d2 = (_c2 = from.matched[0]) == null ? void 0 : _c2.components) == null ? void 0 : _d2.default)) {
        syncCurrentRoute();
      }
    });
    const route = {};
    for (const key in _route.value) {
      Object.defineProperty(route, key, {
        get: () => _route.value[key]
      });
    }
    nuxtApp._route = shallowReactive(route);
    nuxtApp._middleware = nuxtApp._middleware || {
      global: [],
      named: {}
    };
    useError();
    if (!((_c = nuxtApp.ssrContext) == null ? void 0 : _c.islandContext)) {
      router.afterEach(async (to, _from, failure) => {
        delete nuxtApp._processingMiddleware;
        if (failure) {
          await nuxtApp.callHook("page:loading:end");
        }
        if ((failure == null ? void 0 : failure.type) === 4) {
          return;
        }
        if (to.matched.length === 0) {
          await nuxtApp.runWithContext(() => showError(createError$1({
            statusCode: 404,
            fatal: false,
            statusMessage: `Page not found: ${to.fullPath}`,
            data: {
              path: to.fullPath
            }
          })));
        } else if (to.redirectedFrom && to.fullPath !== initialURL) {
          await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
        }
      });
    }
    try {
      if (true) {
        ;
        [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
        ;
      }
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error2) {
      [__temp, __restore] = executeAsync(() => nuxtApp.runWithContext(() => showError(error2))), await __temp, __restore();
    }
    const resolvedInitialRoute = router.currentRoute.value;
    syncCurrentRoute();
    if ((_d = nuxtApp.ssrContext) == null ? void 0 : _d.islandContext) {
      return { provide: { router } };
    }
    const initialLayout = nuxtApp.payload.state._layout;
    router.beforeEach(async (to, from) => {
      var _a2, _b2;
      await nuxtApp.callHook("page:loading:start");
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout;
      }
      nuxtApp._processingMiddleware = true;
      if (!((_a2 = nuxtApp.ssrContext) == null ? void 0 : _a2.islandContext)) {
        const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
        for (const component of to.matched) {
          const componentMiddleware = component.meta.middleware;
          if (!componentMiddleware) {
            continue;
          }
          for (const entry2 of toArray(componentMiddleware)) {
            middlewareEntries.add(entry2);
          }
        }
        {
          const routeRules = await nuxtApp.runWithContext(() => getRouteRules(to.path));
          if (routeRules.appMiddleware) {
            for (const key in routeRules.appMiddleware) {
              if (routeRules.appMiddleware[key]) {
                middlewareEntries.add(key);
              } else {
                middlewareEntries.delete(key);
              }
            }
          }
        }
        for (const entry2 of middlewareEntries) {
          const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_b2 = namedMiddleware[entry2]) == null ? void 0 : _b2.call(namedMiddleware).then((r) => r.default || r)) : entry2;
          if (!middleware) {
            throw new Error(`Unknown route middleware: '${entry2}'.`);
          }
          const result = await nuxtApp.runWithContext(() => middleware(to, from));
          {
            if (result === false || result instanceof Error) {
              const error2 = result || createError$1({
                statusCode: 404,
                statusMessage: `Page Not Found: ${initialURL}`
              });
              await nuxtApp.runWithContext(() => showError(error2));
              return false;
            }
          }
          if (result === true) {
            continue;
          }
          if (result || result === false) {
            return result;
          }
        }
      }
    });
    router.onError(async () => {
      delete nuxtApp._processingMiddleware;
      await nuxtApp.callHook("page:loading:end");
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        if ("name" in resolvedInitialRoute) {
          resolvedInitialRoute.name = void 0;
        }
        await router.replace({
          ...resolvedInitialRoute,
          force: true
        });
        router.options.scrollBehavior = routerOptions.scrollBehavior;
      } catch (error2) {
        await nuxtApp.runWithContext(() => showError(error2));
      }
    });
    return { provide: { router } };
  }
});
function definePayloadReducer(name, reduce) {
  {
    useNuxtApp().ssrContext._payloadReducers[name] = reduce;
  }
}
const clientOnlySymbol = Symbol.for("nuxt:client-only");
defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  setup(_, { slots, attrs }) {
    const mounted6 = ref(false);
    provide(clientOnlySymbol, true);
    return (props) => {
      var _a;
      if (mounted6.value) {
        return (_a = slots.default) == null ? void 0 : _a.call(slots);
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return slot();
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
const plugin = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  const pinia = createPinia();
  nuxtApp.vueApp.use(pinia);
  setActivePinia(pinia);
  {
    nuxtApp.payload.pinia = pinia.state.value;
  }
  return {
    provide: {
      pinia
    }
  };
});
const reducers = {
  NuxtError: (data) => isNuxtError(data) && data.toJSON(),
  EmptyShallowRef: (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_"),
  EmptyRef: (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_"),
  ShallowRef: (data) => isRef(data) && isShallow(data) && data.value,
  ShallowReactive: (data) => isReactive(data) && isShallow(data) && toRaw(data),
  Ref: (data) => isRef(data) && data.value,
  Reactive: (data) => isReactive(data) && toRaw(data)
};
const revive_payload_server_eJ33V7gbc6 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const reducer in reducers) {
      definePayloadReducer(reducer, reducers[reducer]);
    }
  }
});
const LazyAutoComplete = defineAsyncComponent(() => import("./_nuxt/autocomplete.esm-CPzdnOE7.js").then((r) => r["default"] || r.default || r));
const LazyCalendar = defineAsyncComponent(() => import("./_nuxt/calendar.esm-iTjSyI1e.js").then((r) => r["default"] || r.default || r));
const LazyCascadeSelect = defineAsyncComponent(() => import("./_nuxt/cascadeselect.esm-DYmEmPBQ.js").then((r) => r["default"] || r.default || r));
const LazyCheckbox = defineAsyncComponent(() => import("./_nuxt/checkbox.esm-Duuim8Iu.js").then((r) => r["default"] || r.default || r));
const LazyChips = defineAsyncComponent(() => import("./_nuxt/chips.esm-CZu7K-Kl.js").then((r) => r["default"] || r.default || r));
const LazyColorPicker = defineAsyncComponent(() => import("./_nuxt/colorpicker.esm-CxtmhXVr.js").then((r) => r["default"] || r.default || r));
const LazyDropdown = defineAsyncComponent(() => import("./_nuxt/dropdown.esm-BZz-eegH.js").then((r) => r["default"] || r.default || r));
const LazyFloatLabel = defineAsyncComponent(() => import("./_nuxt/floatlabel.esm-BfvNaCfl.js").then((r) => r["default"] || r.default || r));
const LazyIconField = defineAsyncComponent(() => import("./_nuxt/iconfield.esm-CMjnwUAR.js").then((r) => r["default"] || r.default || r));
const LazyInputGroup = defineAsyncComponent(() => import("./_nuxt/inputgroup.esm-DXPO8CKw.js").then((r) => r["default"] || r.default || r));
const LazyInputGroupAddon = defineAsyncComponent(() => import("./_nuxt/inputgroupaddon.esm-DVfwZWMx.js").then((r) => r["default"] || r.default || r));
const LazyInputIcon = defineAsyncComponent(() => import("./_nuxt/inputicon.esm-DsrGfACI.js").then((r) => r["default"] || r.default || r));
const LazyInputMask = defineAsyncComponent(() => import("./_nuxt/inputmask.esm-BAjP5-Xh.js").then((r) => r["default"] || r.default || r));
const LazyInputNumber = defineAsyncComponent(() => import("./_nuxt/inputnumber.esm-CMvh_h4P.js").then((r) => r["default"] || r.default || r));
const LazyInputOtp = defineAsyncComponent(() => import("./_nuxt/inputotp.esm-Dho9KcJq.js").then((r) => r["default"] || r.default || r));
const LazyInputSwitch = defineAsyncComponent(() => import("./_nuxt/inputswitch.esm-QEGDpbo-.js").then((r) => r["default"] || r.default || r));
const LazyInputText = defineAsyncComponent(() => import("./_nuxt/inputtext.esm-Blvd_dSV.js").then((r) => r["default"] || r.default || r));
const LazyKnob = defineAsyncComponent(() => import("./_nuxt/knob.esm-CiupXrSq.js").then((r) => r["default"] || r.default || r));
const LazyListbox = defineAsyncComponent(() => import("./_nuxt/listbox.esm-C-5A8eFJ.js").then((r) => r["default"] || r.default || r));
const LazyMultiSelect = defineAsyncComponent(() => import("./_nuxt/multiselect.esm-ubUB4auL.js").then((r) => r["default"] || r.default || r));
const LazyPassword = defineAsyncComponent(() => import("./_nuxt/password.esm-WFEp3LGb.js").then((r) => r["default"] || r.default || r));
const LazyRadioButton = defineAsyncComponent(() => import("./_nuxt/radiobutton.esm-CQ1mq00b.js").then((r) => r["default"] || r.default || r));
const LazyRating = defineAsyncComponent(() => import("./_nuxt/rating.esm-B_1vtzMc.js").then((r) => r["default"] || r.default || r));
const LazySelectButton = defineAsyncComponent(() => import("./_nuxt/selectbutton.esm-_AnwVIam.js").then((r) => r["default"] || r.default || r));
const LazySlider = defineAsyncComponent(() => import("./_nuxt/slider.esm-DCeclj2a.js").then((r) => r["default"] || r.default || r));
const LazyTextarea = defineAsyncComponent(() => import("./_nuxt/textarea.esm-r2lUF_RZ.js").then((r) => r["default"] || r.default || r));
const LazyToggleButton = defineAsyncComponent(() => import("./_nuxt/togglebutton.esm-cXJCJLny.js").then((r) => r["default"] || r.default || r));
const LazyTreeSelect = defineAsyncComponent(() => import("./_nuxt/treeselect.esm-DU-uurza.js").then((r) => r["default"] || r.default || r));
const LazyTriStateCheckbox = defineAsyncComponent(() => import("./_nuxt/tristatecheckbox.esm-W0YXo3Tj.js").then((r) => r["default"] || r.default || r));
const LazyButton = defineAsyncComponent(() => import("./_nuxt/button.esm-D8sVcJb8.js").then((r) => r["default"] || r.default || r));
const LazyButtonGroup = defineAsyncComponent(() => import("./_nuxt/buttongroup.esm-hNfJiueb.js").then((r) => r["default"] || r.default || r));
const LazySpeedDial = defineAsyncComponent(() => import("./_nuxt/speeddial.esm-MMITvy3k.js").then((r) => r["default"] || r.default || r));
const LazySplitButton = defineAsyncComponent(() => import("./_nuxt/splitbutton.esm-CI2Vw8Kx.js").then((r) => r["default"] || r.default || r));
const LazyColumn = defineAsyncComponent(() => import("./_nuxt/column.esm-KktM_xTo.js").then((r) => r["default"] || r.default || r));
const LazyRow = defineAsyncComponent(() => import("./_nuxt/row.esm-DBXDoqwL.js").then((r) => r["default"] || r.default || r));
const LazyColumnGroup = defineAsyncComponent(() => import("./_nuxt/columngroup.esm-Cm5kvygA.js").then((r) => r["default"] || r.default || r));
const LazyDataTable = defineAsyncComponent(() => import("./_nuxt/datatable.esm-BAh19VmC.js").then((r) => r["default"] || r.default || r));
const LazyDataView = defineAsyncComponent(() => import("./_nuxt/dataview.esm-DW3xV2Dc.js").then((r) => r["default"] || r.default || r));
const LazyDataViewLayoutOptions = defineAsyncComponent(() => import("./_nuxt/dataviewlayoutoptions.esm-Br8OdhJG.js").then((r) => r["default"] || r.default || r));
const LazyOrderList = defineAsyncComponent(() => import("./_nuxt/orderlist.esm-t-F-Asa3.js").then((r) => r["default"] || r.default || r));
const LazyOrganizationChart = defineAsyncComponent(() => import("./_nuxt/organizationchart.esm-Gw48OSwB.js").then((r) => r["default"] || r.default || r));
const LazyPaginator = defineAsyncComponent(() => import("./_nuxt/paginator.esm-BvYTZ1KY.js").then((r) => r["default"] || r.default || r));
const LazyPickList = defineAsyncComponent(() => import("./_nuxt/picklist.esm-DQbQ1p-n.js").then((r) => r["default"] || r.default || r));
const LazyTree = defineAsyncComponent(() => import("./_nuxt/tree.esm-P3ONTSjx.js").then((r) => r["default"] || r.default || r));
const LazyTreeTable = defineAsyncComponent(() => import("./_nuxt/treetable.esm-D5V9BfFZ.js").then((r) => r["default"] || r.default || r));
const LazyTimeline = defineAsyncComponent(() => import("./_nuxt/timeline.esm-CKrNvUDJ.js").then((r) => r["default"] || r.default || r));
const LazyVirtualScroller = defineAsyncComponent(() => import("./_nuxt/virtualscroller.esm-QhUci9XU.js").then((r) => r["default"] || r.default || r));
const LazyAccordion = defineAsyncComponent(() => import("./_nuxt/accordion.esm-BegkvJre.js").then((r) => r["default"] || r.default || r));
const LazyAccordionTab = defineAsyncComponent(() => import("./_nuxt/accordiontab.esm-CaHIdGto.js").then((r) => r["default"] || r.default || r));
const LazyCard = defineAsyncComponent(() => import("./_nuxt/card.esm-Dl-1afH1.js").then((r) => r["default"] || r.default || r));
const LazyDeferredContent = defineAsyncComponent(() => import("./_nuxt/deferredcontent.esm-WbmgrihI.js").then((r) => r["default"] || r.default || r));
const LazyDivider = defineAsyncComponent(() => import("./_nuxt/divider.esm-rf0Z1qfa.js").then((r) => r["default"] || r.default || r));
const LazyFieldset = defineAsyncComponent(() => import("./_nuxt/fieldset.esm-BoLbl0me.js").then((r) => r["default"] || r.default || r));
const LazyPanel = defineAsyncComponent(() => import("./_nuxt/panel.esm-9ejhEDQD.js").then((r) => r["default"] || r.default || r));
const LazyScrollPanel = defineAsyncComponent(() => import("./_nuxt/scrollpanel.esm-DD0DwAL-.js").then((r) => r["default"] || r.default || r));
const LazySplitter = defineAsyncComponent(() => import("./_nuxt/splitter.esm-Dbr4wVzt.js").then((r) => r["default"] || r.default || r));
const LazySplitterPanel = defineAsyncComponent(() => import("./_nuxt/splitterpanel.esm-C7sP56Q4.js").then((r) => r["default"] || r.default || r));
const LazyStepper = defineAsyncComponent(() => import("./_nuxt/stepper.esm-Cal247UU.js").then((r) => r["default"] || r.default || r));
const LazyStepperPanel = defineAsyncComponent(() => import("./_nuxt/stepperpanel.esm-DaJ__N4J.js").then((r) => r["default"] || r.default || r));
const LazyTabView = defineAsyncComponent(() => import("./_nuxt/tabview.esm-CxCbmDx8.js").then((r) => r["default"] || r.default || r));
const LazyTabPanel = defineAsyncComponent(() => import("./_nuxt/tabpanel.esm-ehmymffV.js").then((r) => r["default"] || r.default || r));
const LazyToolbar = defineAsyncComponent(() => import("./_nuxt/toolbar.esm-CNkRso1d.js").then((r) => r["default"] || r.default || r));
const LazyConfirmDialog = defineAsyncComponent(() => import("./_nuxt/confirmdialog.esm-ctRq3AFW.js").then((r) => r["default"] || r.default || r));
const LazyConfirmPopup = defineAsyncComponent(() => import("./_nuxt/confirmpopup.esm-CQiQSI0N.js").then((r) => r["default"] || r.default || r));
const LazyDialog = defineAsyncComponent(() => import("./_nuxt/dialog.esm-Wemb0g_v.js").then((r) => r["default"] || r.default || r));
const LazyDynamicDialog = defineAsyncComponent(() => import("./_nuxt/dynamicdialog.esm-D3Qnqlk-.js").then((r) => r["default"] || r.default || r));
const LazyOverlayPanel = defineAsyncComponent(() => import("./_nuxt/overlaypanel.esm-CLWbKoaK.js").then((r) => r["default"] || r.default || r));
const LazyFileUpload = defineAsyncComponent(() => import("./_nuxt/fileupload.esm-DZkkCCPr.js").then((r) => r["default"] || r.default || r));
const LazyBreadcrumb = defineAsyncComponent(() => import("./_nuxt/breadcrumb.esm-BpYJW_4w.js").then((r) => r["default"] || r.default || r));
const LazyContextMenu = defineAsyncComponent(() => import("./_nuxt/contextmenu.esm-DVEMY9eu.js").then((r) => r["default"] || r.default || r));
const LazyDock = defineAsyncComponent(() => import("./_nuxt/dock.esm-Aum8l-n3.js").then((r) => r["default"] || r.default || r));
const LazyMenu = defineAsyncComponent(() => import("./_nuxt/menu.esm-C_RMEhtK.js").then((r) => r["default"] || r.default || r));
const LazyMenubar = defineAsyncComponent(() => import("./_nuxt/menubar.esm-Cg7BuW0D.js").then((r) => r["default"] || r.default || r));
const LazyMegaMenu = defineAsyncComponent(() => import("./_nuxt/megamenu.esm-CbyqYeqm.js").then((r) => r["default"] || r.default || r));
const LazyPanelMenu = defineAsyncComponent(() => import("./_nuxt/panelmenu.esm-CpgKI8YL.js").then((r) => r["default"] || r.default || r));
const LazySteps = defineAsyncComponent(() => import("./_nuxt/steps.esm-CEvUoHJi.js").then((r) => r["default"] || r.default || r));
const LazyTabMenu = defineAsyncComponent(() => import("./_nuxt/tabmenu.esm-CQKFSw01.js").then((r) => r["default"] || r.default || r));
const LazyTieredMenu = defineAsyncComponent(() => import("./_nuxt/tieredmenu.esm-Bg37RyLn.js").then((r) => r["default"] || r.default || r));
const LazyMessage = defineAsyncComponent(() => import("./_nuxt/message.esm-Civzrs0G.js").then((r) => r["default"] || r.default || r));
const LazyInlineMessage = defineAsyncComponent(() => import("./_nuxt/inlinemessage.esm-BzGJlRUc.js").then((r) => r["default"] || r.default || r));
const LazyToast = defineAsyncComponent(() => import("./_nuxt/toast.esm-DkLq1MgA.js").then((r) => r["default"] || r.default || r));
const LazyCarousel = defineAsyncComponent(() => import("./_nuxt/carousel.esm-1sxEW2zP.js").then((r) => r["default"] || r.default || r));
const LazyGalleria = defineAsyncComponent(() => import("./_nuxt/galleria.esm-C0pZ4_Y4.js").then((r) => r["default"] || r.default || r));
const LazyImage = defineAsyncComponent(() => import("./_nuxt/image.esm-xugJNfEY.js").then((r) => r["default"] || r.default || r));
const LazyAvatar = defineAsyncComponent(() => import("./_nuxt/avatar.esm-G-uX_ALX.js").then((r) => r["default"] || r.default || r));
const LazyAvatarGroup = defineAsyncComponent(() => import("./_nuxt/avatargroup.esm-Cw12GY2i.js").then((r) => r["default"] || r.default || r));
const LazyBadge = defineAsyncComponent(() => import("./_nuxt/badge.esm-CGMv5799.js").then((r) => r["default"] || r.default || r));
const LazyBlockUI = defineAsyncComponent(() => import("./_nuxt/blockui.esm-BdAlGpwC.js").then((r) => r["default"] || r.default || r));
const LazyChip = defineAsyncComponent(() => import("./_nuxt/chip.esm-CNGvXf47.js").then((r) => r["default"] || r.default || r));
const LazyInplace = defineAsyncComponent(() => import("./_nuxt/inplace.esm-CbPO4wj1.js").then((r) => r["default"] || r.default || r));
const LazyMeterGroup = defineAsyncComponent(() => import("./_nuxt/metergroup.esm-DDLPlvYL.js").then((r) => r["default"] || r.default || r));
const LazyScrollTop = defineAsyncComponent(() => import("./_nuxt/scrolltop.esm-BnM4Zm17.js").then((r) => r["default"] || r.default || r));
const LazySkeleton = defineAsyncComponent(() => import("./_nuxt/skeleton.esm-CANle-ik.js").then((r) => r["default"] || r.default || r));
const LazyProgressBar = defineAsyncComponent(() => import("./_nuxt/progressbar.esm-B9eXve76.js").then((r) => r["default"] || r.default || r));
const LazyProgressSpinner = defineAsyncComponent(() => import("./_nuxt/progressspinner.esm-CdvMGnaA.js").then((r) => r["default"] || r.default || r));
const LazyTag = defineAsyncComponent(() => import("./_nuxt/tag.esm-Bkya-FxV.js").then((r) => r["default"] || r.default || r));
const LazyTerminal = defineAsyncComponent(() => import("./_nuxt/terminal.esm-521hwqS2.js").then((r) => r["default"] || r.default || r));
const LazyIcon = defineAsyncComponent(() => import("./_nuxt/Icon-B04GAuZ4.js").then((r) => r["default"] || r.default || r));
const LazyIconCSS = defineAsyncComponent(() => import("./_nuxt/IconCSS-CPchKoh5.js").then((r) => r["default"] || r.default || r));
const lazyGlobalComponents = [
  ["AutoComplete", LazyAutoComplete],
  ["Calendar", LazyCalendar],
  ["CascadeSelect", LazyCascadeSelect],
  ["Checkbox", LazyCheckbox],
  ["Chips", LazyChips],
  ["ColorPicker", LazyColorPicker],
  ["Dropdown", LazyDropdown],
  ["FloatLabel", LazyFloatLabel],
  ["IconField", LazyIconField],
  ["InputGroup", LazyInputGroup],
  ["InputGroupAddon", LazyInputGroupAddon],
  ["InputIcon", LazyInputIcon],
  ["InputMask", LazyInputMask],
  ["InputNumber", LazyInputNumber],
  ["InputOtp", LazyInputOtp],
  ["InputSwitch", LazyInputSwitch],
  ["InputText", LazyInputText],
  ["Knob", LazyKnob],
  ["Listbox", LazyListbox],
  ["MultiSelect", LazyMultiSelect],
  ["Password", LazyPassword],
  ["RadioButton", LazyRadioButton],
  ["Rating", LazyRating],
  ["SelectButton", LazySelectButton],
  ["Slider", LazySlider],
  ["Textarea", LazyTextarea],
  ["ToggleButton", LazyToggleButton],
  ["TreeSelect", LazyTreeSelect],
  ["TriStateCheckbox", LazyTriStateCheckbox],
  ["Button", LazyButton],
  ["ButtonGroup", LazyButtonGroup],
  ["SpeedDial", LazySpeedDial],
  ["SplitButton", LazySplitButton],
  ["Column", LazyColumn],
  ["Row", LazyRow],
  ["ColumnGroup", LazyColumnGroup],
  ["DataTable", LazyDataTable],
  ["DataView", LazyDataView],
  ["DataViewLayoutOptions", LazyDataViewLayoutOptions],
  ["OrderList", LazyOrderList],
  ["OrganizationChart", LazyOrganizationChart],
  ["Paginator", LazyPaginator],
  ["PickList", LazyPickList],
  ["Tree", LazyTree],
  ["TreeTable", LazyTreeTable],
  ["Timeline", LazyTimeline],
  ["VirtualScroller", LazyVirtualScroller],
  ["Accordion", LazyAccordion],
  ["AccordionTab", LazyAccordionTab],
  ["Card", LazyCard],
  ["DeferredContent", LazyDeferredContent],
  ["Divider", LazyDivider],
  ["Fieldset", LazyFieldset],
  ["Panel", LazyPanel],
  ["ScrollPanel", LazyScrollPanel],
  ["Splitter", LazySplitter],
  ["SplitterPanel", LazySplitterPanel],
  ["Stepper", LazyStepper],
  ["StepperPanel", LazyStepperPanel],
  ["TabView", LazyTabView],
  ["TabPanel", LazyTabPanel],
  ["Toolbar", LazyToolbar],
  ["ConfirmDialog", LazyConfirmDialog],
  ["ConfirmPopup", LazyConfirmPopup],
  ["Dialog", LazyDialog],
  ["DynamicDialog", LazyDynamicDialog],
  ["OverlayPanel", LazyOverlayPanel],
  ["FileUpload", LazyFileUpload],
  ["Breadcrumb", LazyBreadcrumb],
  ["ContextMenu", LazyContextMenu],
  ["Dock", LazyDock],
  ["Menu", LazyMenu],
  ["Menubar", LazyMenubar],
  ["MegaMenu", LazyMegaMenu],
  ["PanelMenu", LazyPanelMenu],
  ["Steps", LazySteps],
  ["TabMenu", LazyTabMenu],
  ["TieredMenu", LazyTieredMenu],
  ["Message", LazyMessage],
  ["InlineMessage", LazyInlineMessage],
  ["Toast", LazyToast],
  ["Carousel", LazyCarousel],
  ["Galleria", LazyGalleria],
  ["Image", LazyImage],
  ["Avatar", LazyAvatar],
  ["AvatarGroup", LazyAvatarGroup],
  ["Badge", LazyBadge],
  ["BlockUI", LazyBlockUI],
  ["Chip", LazyChip],
  ["Inplace", LazyInplace],
  ["MeterGroup", LazyMeterGroup],
  ["ScrollTop", LazyScrollTop],
  ["Skeleton", LazySkeleton],
  ["ProgressBar", LazyProgressBar],
  ["ProgressSpinner", LazyProgressSpinner],
  ["Tag", LazyTag],
  ["Terminal", LazyTerminal],
  ["Icon", LazyIcon],
  ["IconCSS", LazyIconCSS]
];
const components_plugin_KR1HBZs4kY = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components",
  setup(nuxtApp) {
    for (const [name, component] of lazyGlobalComponents) {
      nuxtApp.vueApp.component(name, component);
      nuxtApp.vueApp.component("Lazy" + name, component);
    }
  }
});
const pwaAssetsIcons = { "favicon": {}, "transparent": {}, "maskable": {}, "apple": {}, "appleSplashScreen": {} };
const pwa_icons_Y6agwlnXZq = /* @__PURE__ */ defineNuxtPlugin(() => {
  const pwaIcons = {};
  configureEntries(pwaIcons, "transparent");
  configureEntries(pwaIcons, "maskable");
  configureEntries(pwaIcons, "favicon");
  configureEntries(pwaIcons, "apple");
  configureEntries(pwaIcons, "appleSplashScreen");
  return {
    provide: {
      pwaIcons
    }
  };
});
function configureEntries(pwaIcons, key) {
  pwaIcons[key] = Object.values(pwaAssetsIcons[key] ?? {}).reduce((acc, icon) => {
    const entry2 = {
      ...icon,
      asImage: {
        src: icon.url,
        key: `${key}-${icon.name}`
      }
    };
    if (icon.width && icon.height) {
      entry2.asImage.width = icon.width;
      entry2.asImage.height = icon.height;
    }
    acc[icon.name] = entry2;
    return acc;
  }, {});
}
const plugin_tMGwffvjBc = /* @__PURE__ */ defineNuxtPlugin((app) => {
  app.vueApp.directive("auto-animate", vAutoAnimate);
});
function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
function toValue(r) {
  return typeof r === "function" ? r() : unref(r);
}
typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
const notNullish = (val) => val != null;
const toString = Object.prototype.toString;
const isObject = (val) => toString.call(val) === "[object Object]";
const noop = () => {
};
function getLifeCycleTarget(target) {
  return getCurrentInstance();
}
function tryOnUnmounted(fn, target) {
  getLifeCycleTarget();
}
function unrefElement(elRef) {
  var _a;
  const plain = toValue(elRef);
  return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain;
}
const defaultWindow = void 0;
function useEventListener(...args) {
  let target;
  let events2;
  let listeners;
  let options;
  if (typeof args[0] === "string" || Array.isArray(args[0])) {
    [events2, listeners, options] = args;
    target = defaultWindow;
  } else {
    [target, events2, listeners, options] = args;
  }
  if (!target)
    return noop;
  if (!Array.isArray(events2))
    events2 = [events2];
  if (!Array.isArray(listeners))
    listeners = [listeners];
  const cleanups = [];
  const cleanup = () => {
    cleanups.forEach((fn) => fn());
    cleanups.length = 0;
  };
  const register2 = (el, event, listener, options2) => {
    el.addEventListener(event, listener, options2);
    return () => el.removeEventListener(event, listener, options2);
  };
  const stopWatch = watch(
    () => [unrefElement(target), toValue(options)],
    ([el, options2]) => {
      cleanup();
      if (!el)
        return;
      const optionsClone = isObject(options2) ? { ...options2 } : options2;
      cleanups.push(
        ...events2.flatMap((event) => {
          return listeners.map((listener) => register2(el, event, listener, optionsClone));
        })
      );
    },
    { immediate: true, flush: "post" }
  );
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(stop);
  return stop;
}
function useMounted() {
  const isMounted = ref(false);
  getCurrentInstance();
  return isMounted;
}
function useSupported(callback) {
  const isMounted = useMounted();
  return computed(() => {
    isMounted.value;
    return Boolean(callback());
  });
}
function useIntersectionObserver(target, callback, options = {}) {
  const {
    root,
    rootMargin = "0px",
    threshold = 0.1,
    window: window2 = defaultWindow,
    immediate = true
  } = options;
  const isSupported = useSupported(() => window2 && "IntersectionObserver" in window2);
  const targets = computed(() => {
    const _target = toValue(target);
    return (Array.isArray(_target) ? _target : [_target]).map(unrefElement).filter(notNullish);
  });
  let cleanup = noop;
  const isActive = ref(immediate);
  const stopWatch = isSupported.value ? watch(
    () => [targets.value, unrefElement(root), isActive.value],
    ([targets2, root2]) => {
      cleanup();
      if (!isActive.value)
        return;
      if (!targets2.length)
        return;
      const observer = new IntersectionObserver(
        callback,
        {
          root: unrefElement(root2),
          rootMargin,
          threshold
        }
      );
      targets2.forEach((el) => el && observer.observe(el));
      cleanup = () => {
        observer.disconnect();
        cleanup = noop;
      };
    },
    { immediate, flush: "post" }
  ) : noop;
  const stop = () => {
    cleanup();
    stopWatch();
    isActive.value = false;
  };
  tryOnScopeDispose(stop);
  return {
    isSupported,
    isActive,
    pause() {
      cleanup();
      isActive.value = false;
    },
    resume() {
      isActive.value = true;
    },
    stop
  };
}
const motionState = {};
var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => {
  __defNormalProp$1(obj, key + "", value);
  return value;
};
class SubscriptionManager {
  constructor() {
    __publicField$1(this, "subscriptions", /* @__PURE__ */ new Set());
  }
  add(handler2) {
    this.subscriptions.add(handler2);
    return () => this.subscriptions.delete(handler2);
  }
  notify(a, b, c) {
    if (!this.subscriptions.size)
      return;
    for (const handler2 of this.subscriptions)
      handler2(a, b, c);
  }
  clear() {
    this.subscriptions.clear();
  }
}
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
function isFloat(value) {
  return !Number.isNaN(Number.parseFloat(value));
}
class MotionValue {
  /**
   * init - The initiating value
   * config - Optional configuration options
   */
  constructor(init) {
    __publicField(this, "current");
    __publicField(this, "prev");
    __publicField(this, "timeDelta", 0);
    __publicField(this, "lastUpdated", 0);
    __publicField(this, "updateSubscribers", new SubscriptionManager());
    __publicField(this, "stopAnimation");
    __publicField(this, "canTrackVelocity", false);
    __publicField(this, "updateAndNotify", (v) => {
      this.prev = this.current;
      this.current = v;
      const { delta, timestamp } = getFrameData();
      if (this.lastUpdated !== timestamp) {
        this.timeDelta = delta;
        this.lastUpdated = timestamp;
      }
      sync.postRender(this.scheduleVelocityCheck);
      this.updateSubscribers.notify(this.current);
    });
    __publicField(this, "scheduleVelocityCheck", () => sync.postRender(this.velocityCheck));
    __publicField(this, "velocityCheck", ({ timestamp }) => {
      if (!this.canTrackVelocity)
        this.canTrackVelocity = isFloat(this.current);
      if (timestamp !== this.lastUpdated)
        this.prev = this.current;
    });
    this.prev = this.current = init;
    this.canTrackVelocity = isFloat(this.current);
  }
  /**
   * Adds a function that will be notified when the `MotionValue` is updated.
   *
   * It returns a function that, when called, will cancel the subscription.
   */
  onChange(subscription) {
    return this.updateSubscribers.add(subscription);
  }
  clearListeners() {
    this.updateSubscribers.clear();
  }
  /**
   * Sets the state of the `MotionValue`.
   *
   * @param v
   * @param render
   */
  set(v) {
    this.updateAndNotify(v);
  }
  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   */
  get() {
    return this.current;
  }
  /**
   * Get previous value.
   *
   * @returns - The previous latest state of `MotionValue`
   */
  getPrevious() {
    return this.prev;
  }
  /**
   * Returns the latest velocity of `MotionValue`
   *
   * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
   */
  getVelocity() {
    return this.canTrackVelocity ? velocityPerSecond(Number.parseFloat(this.current) - Number.parseFloat(this.prev), this.timeDelta) : 0;
  }
  /**
   * Registers a new animation to control this `MotionValue`. Only one
   * animation can drive a `MotionValue` at one time.
   */
  start(animation) {
    this.stop();
    return new Promise((resolve) => {
      const { stop } = animation(resolve);
      this.stopAnimation = stop;
    }).then(() => this.clearAnimation());
  }
  /**
   * Stop the currently active animation.
   */
  stop() {
    if (this.stopAnimation)
      this.stopAnimation();
    this.clearAnimation();
  }
  /**
   * Returns `true` if this value is currently animating.
   */
  isAnimating() {
    return !!this.stopAnimation;
  }
  /**
   * Clear the current animation reference.
   */
  clearAnimation() {
    this.stopAnimation = null;
  }
  /**
   * Destroy and clean up subscribers to this `MotionValue`.
   */
  destroy() {
    this.updateSubscribers.clear();
    this.stop();
  }
}
function getMotionValue(init) {
  return new MotionValue(init);
}
const { isArray } = Array;
function useMotionValues() {
  const motionValues = ref({});
  const stop = (keys) => {
    const destroyKey = (key) => {
      if (!motionValues.value[key])
        return;
      motionValues.value[key].stop();
      motionValues.value[key].destroy();
      delete motionValues.value[key];
    };
    if (keys) {
      if (isArray(keys)) {
        keys.forEach(destroyKey);
      } else {
        destroyKey(keys);
      }
    } else {
      Object.keys(motionValues.value).forEach(destroyKey);
    }
  };
  const get = (key, from, target) => {
    if (motionValues.value[key])
      return motionValues.value[key];
    const motionValue = getMotionValue(from);
    motionValue.onChange((v) => target[key] = v);
    motionValues.value[key] = motionValue;
    return motionValue;
  };
  tryOnUnmounted();
  return {
    motionValues,
    get,
    stop
  };
}
function isKeyframesTarget(v) {
  return Array.isArray(v);
}
function underDampedSpring() {
  return {
    type: "spring",
    stiffness: 500,
    damping: 25,
    restDelta: 0.5,
    restSpeed: 10
  };
}
function criticallyDampedSpring(to) {
  return {
    type: "spring",
    stiffness: 550,
    damping: to === 0 ? 2 * Math.sqrt(550) : 30,
    restDelta: 0.01,
    restSpeed: 10
  };
}
function overDampedSpring(to) {
  return {
    type: "spring",
    stiffness: 550,
    damping: to === 0 ? 100 : 30,
    restDelta: 0.01,
    restSpeed: 10
  };
}
function linearTween() {
  return {
    type: "keyframes",
    ease: "linear",
    duration: 300
  };
}
function keyframes(values) {
  return {
    type: "keyframes",
    duration: 800,
    values
  };
}
const defaultTransitions = {
  default: overDampedSpring,
  x: underDampedSpring,
  y: underDampedSpring,
  z: underDampedSpring,
  rotate: underDampedSpring,
  rotateX: underDampedSpring,
  rotateY: underDampedSpring,
  rotateZ: underDampedSpring,
  scaleX: criticallyDampedSpring,
  scaleY: criticallyDampedSpring,
  scale: criticallyDampedSpring,
  backgroundColor: linearTween,
  color: linearTween,
  opacity: linearTween
};
function getDefaultTransition(valueKey, to) {
  let transitionFactory;
  if (isKeyframesTarget(to)) {
    transitionFactory = keyframes;
  } else {
    transitionFactory = defaultTransitions[valueKey] || defaultTransitions.default;
  }
  return { to, ...transitionFactory(to) };
}
const int = {
  ...number,
  transform: Math.round
};
const valueTypes = {
  // Color props
  color,
  backgroundColor: color,
  outlineColor: color,
  fill: color,
  stroke: color,
  // Border props
  borderColor: color,
  borderTopColor: color,
  borderRightColor: color,
  borderBottomColor: color,
  borderLeftColor: color,
  borderWidth: px,
  borderTopWidth: px,
  borderRightWidth: px,
  borderBottomWidth: px,
  borderLeftWidth: px,
  borderRadius: px,
  radius: px,
  borderTopLeftRadius: px,
  borderTopRightRadius: px,
  borderBottomRightRadius: px,
  borderBottomLeftRadius: px,
  // Positioning props
  width: px,
  maxWidth: px,
  height: px,
  maxHeight: px,
  size: px,
  top: px,
  right: px,
  bottom: px,
  left: px,
  // Spacing props
  padding: px,
  paddingTop: px,
  paddingRight: px,
  paddingBottom: px,
  paddingLeft: px,
  margin: px,
  marginTop: px,
  marginRight: px,
  marginBottom: px,
  marginLeft: px,
  // Transform props
  rotate: degrees,
  rotateX: degrees,
  rotateY: degrees,
  rotateZ: degrees,
  scale,
  scaleX: scale,
  scaleY: scale,
  scaleZ: scale,
  skew: degrees,
  skewX: degrees,
  skewY: degrees,
  distance: px,
  translateX: px,
  translateY: px,
  translateZ: px,
  x: px,
  y: px,
  z: px,
  perspective: px,
  transformPerspective: px,
  opacity: alpha,
  originX: progressPercentage,
  originY: progressPercentage,
  originZ: px,
  // Misc
  zIndex: int,
  filter,
  WebkitFilter: filter,
  // SVG
  fillOpacity: alpha,
  strokeOpacity: alpha,
  numOctaves: int
};
const getValueType = (key) => valueTypes[key];
function getValueAsType(value, type) {
  return type && typeof value === "number" && type.transform ? type.transform(value) : value;
}
function getAnimatableNone(key, value) {
  let defaultValueType = getValueType(key);
  if (defaultValueType !== filter)
    defaultValueType = complex;
  return defaultValueType.getAnimatableNone ? defaultValueType.getAnimatableNone(value) : void 0;
}
const easingLookup = {
  linear,
  easeIn,
  easeInOut,
  easeOut,
  circIn,
  circInOut,
  circOut,
  backIn,
  backInOut,
  backOut,
  anticipate,
  bounceIn,
  bounceInOut,
  bounceOut
};
function easingDefinitionToFunction(definition) {
  if (Array.isArray(definition)) {
    const [x1, y1, x2, y2] = definition;
    return cubicBezier(x1, y1, x2, y2);
  } else if (typeof definition === "string") {
    return easingLookup[definition];
  }
  return definition;
}
function isEasingArray(ease) {
  return Array.isArray(ease) && typeof ease[0] !== "number";
}
function isAnimatable(key, value) {
  if (key === "zIndex")
    return false;
  if (typeof value === "number" || Array.isArray(value))
    return true;
  if (typeof value === "string" && complex.test(value) && !value.startsWith("url(")) {
    return true;
  }
  return false;
}
function hydrateKeyframes(options) {
  if (Array.isArray(options.to) && options.to[0] === null) {
    options.to = [...options.to];
    options.to[0] = options.from;
  }
  return options;
}
function convertTransitionToAnimationOptions({ ease, times, delay, ...transition }) {
  const options = { ...transition };
  if (times)
    options.offset = times;
  if (ease) {
    options.ease = isEasingArray(ease) ? ease.map(easingDefinitionToFunction) : easingDefinitionToFunction(ease);
  }
  if (delay)
    options.elapsed = -delay;
  return options;
}
function getPopmotionAnimationOptions(transition, options, key) {
  if (Array.isArray(options.to)) {
    if (!transition.duration)
      transition.duration = 800;
  }
  hydrateKeyframes(options);
  if (!isTransitionDefined(transition)) {
    transition = {
      ...transition,
      ...getDefaultTransition(key, options.to)
    };
  }
  return {
    ...options,
    ...convertTransitionToAnimationOptions(transition)
  };
}
function isTransitionDefined({ delay, repeat, repeatType, repeatDelay, from, ...transition }) {
  return !!Object.keys(transition).length;
}
function getValueTransition(transition, key) {
  return transition[key] || transition.default || transition;
}
function getAnimation(key, value, target, transition, onComplete) {
  const valueTransition = getValueTransition(transition, key);
  let origin = valueTransition.from === null || valueTransition.from === void 0 ? value.get() : valueTransition.from;
  const isTargetAnimatable = isAnimatable(key, target);
  if (origin === "none" && isTargetAnimatable && typeof target === "string")
    origin = getAnimatableNone(key, target);
  const isOriginAnimatable = isAnimatable(key, origin);
  function start(complete) {
    const options = {
      from: origin,
      to: target,
      velocity: transition.velocity ? transition.velocity : value.getVelocity(),
      onUpdate: (v) => value.set(v)
    };
    return valueTransition.type === "inertia" || valueTransition.type === "decay" ? inertia({ ...options, ...valueTransition }) : animate({
      ...getPopmotionAnimationOptions(valueTransition, options, key),
      onUpdate: (v) => {
        options.onUpdate(v);
        if (valueTransition.onUpdate)
          valueTransition.onUpdate(v);
      },
      onComplete: () => {
        if (onComplete)
          onComplete();
        if (complete)
          complete();
      }
    });
  }
  function set2(complete) {
    value.set(target);
    if (onComplete)
      onComplete();
    if (complete)
      complete();
    return { stop: () => {
    } };
  }
  return !isOriginAnimatable || !isTargetAnimatable || valueTransition.type === false ? set2 : start;
}
function useMotionTransitions() {
  const { motionValues, stop, get } = useMotionValues();
  const push = (key, value, target, transition = {}, onComplete) => {
    const from = target[key];
    const motionValue = get(key, from, target);
    if (transition && transition.immediate) {
      motionValue.set(value);
      return;
    }
    const animation = getAnimation(key, motionValue, value, transition, onComplete);
    motionValue.start(animation);
  };
  return { motionValues, stop, push };
}
function useMotionControls(motionProperties, variants = {}, { motionValues, push, stop } = useMotionTransitions()) {
  const _variants = unref(variants);
  const isAnimating = ref(false);
  watch(
    motionValues,
    (newVal) => {
      isAnimating.value = Object.values(newVal).filter((value) => value.isAnimating()).length > 0;
    },
    {
      immediate: true,
      deep: true
    }
  );
  const getVariantFromKey = (variant) => {
    if (!_variants || !_variants[variant])
      throw new Error(`The variant ${variant} does not exist.`);
    return _variants[variant];
  };
  const apply = (variant) => {
    if (typeof variant === "string")
      variant = getVariantFromKey(variant);
    const animations = Object.entries(variant).map(([key, value]) => {
      if (key === "transition")
        return void 0;
      return new Promise(
        (resolve) => (
          // @ts-expect-error - Fix errors later for typescript 5
          push(key, value, motionProperties, variant.transition || getDefaultTransition(key, variant[key]), resolve)
        )
      );
    }).filter(Boolean);
    async function waitForComplete() {
      var _a, _b;
      await Promise.all(animations);
      (_b = (_a = variant.transition) == null ? void 0 : _a.onComplete) == null ? void 0 : _b.call(_a);
    }
    return Promise.all([waitForComplete()]);
  };
  const set2 = (variant) => {
    const variantData = isObject(variant) ? variant : getVariantFromKey(variant);
    Object.entries(variantData).forEach(([key, value]) => {
      if (key === "transition")
        return;
      push(key, value, motionProperties, {
        immediate: true
      });
    });
  };
  const leave3 = async (done) => {
    let leaveVariant;
    if (_variants) {
      if (_variants.leave)
        leaveVariant = _variants.leave;
      if (!_variants.leave && _variants.initial)
        leaveVariant = _variants.initial;
    }
    if (!leaveVariant) {
      done();
      return;
    }
    await apply(leaveVariant);
    done();
  };
  return {
    isAnimating,
    apply,
    set: set2,
    leave: leave3,
    stop
  };
}
function registerEventListeners({ target, state, variants, apply }) {
  const _variants = unref(variants);
  const hovered = ref(false);
  const tapped = ref(false);
  const focused = ref(false);
  const mutableKeys = computed(() => {
    let result = [...Object.keys(state.value || {})];
    if (!_variants)
      return result;
    if (_variants.hovered)
      result = [...result, ...Object.keys(_variants.hovered)];
    if (_variants.tapped)
      result = [...result, ...Object.keys(_variants.tapped)];
    if (_variants.focused)
      result = [...result, ...Object.keys(_variants.focused)];
    return result;
  });
  const computedProperties = computed(() => {
    const result = {};
    Object.assign(result, state.value);
    if (hovered.value && _variants.hovered)
      Object.assign(result, _variants.hovered);
    if (tapped.value && _variants.tapped)
      Object.assign(result, _variants.tapped);
    if (focused.value && _variants.focused)
      Object.assign(result, _variants.focused);
    for (const key in result) {
      if (!mutableKeys.value.includes(key))
        delete result[key];
    }
    return result;
  });
  if (_variants.hovered) {
    useEventListener(target, "mouseenter", () => hovered.value = true);
    useEventListener(target, "mouseleave", () => {
      hovered.value = false;
      tapped.value = false;
    });
  }
  if (_variants.tapped) ;
  if (_variants.focused) {
    useEventListener(target, "focus", () => focused.value = true);
    useEventListener(target, "blur", () => focused.value = false);
  }
  watch([hovered, tapped, focused], () => {
    apply(computedProperties.value);
  });
}
function registerLifeCycleHooks({ set: set2, target, variants, variant }) {
  const _variants = unref(variants);
  watch(
    () => target,
    () => {
      if (!_variants)
        return;
      if (_variants.initial) {
        set2("initial");
        variant.value = "initial";
      }
      if (_variants.enter)
        variant.value = "enter";
    },
    {
      immediate: true,
      flush: "pre"
    }
  );
}
function registerVariantsSync({ state, apply }) {
  watch(
    state,
    (newVal) => {
      if (newVal)
        apply(newVal);
    },
    {
      immediate: true
    }
  );
}
function registerVisibilityHooks({ target, variants, variant }) {
  const _variants = unref(variants);
  if (_variants && (_variants.visible || _variants.visibleOnce)) {
    useIntersectionObserver(target, ([{ isIntersecting }]) => {
      if (_variants.visible) {
        if (isIntersecting)
          variant.value = "visible";
        else
          variant.value = "initial";
      } else if (_variants.visibleOnce) {
        if (isIntersecting && variant.value !== "visibleOnce")
          variant.value = "visibleOnce";
        else if (!variant.value)
          variant.value = "initial";
      }
    });
  }
}
function useMotionFeatures(instance, options = {
  syncVariants: true,
  lifeCycleHooks: true,
  visibilityHooks: true,
  eventListeners: true
}) {
  if (options.lifeCycleHooks)
    registerLifeCycleHooks(instance);
  if (options.syncVariants)
    registerVariantsSync(instance);
  if (options.visibilityHooks)
    registerVisibilityHooks(instance);
  if (options.eventListeners)
    registerEventListeners(instance);
}
function reactiveStyle(props = {}) {
  const state = reactive({
    ...props
  });
  const style = ref({});
  watch(
    state,
    () => {
      const result = {};
      for (const [key, value] of Object.entries(state)) {
        const valueType = getValueType(key);
        const valueAsType = getValueAsType(value, valueType);
        result[key] = valueAsType;
      }
      style.value = result;
    },
    {
      immediate: true,
      deep: true
    }
  );
  return {
    state,
    style
  };
}
function usePermissiveTarget(target, onTarget) {
  watch(
    () => unrefElement(target),
    (el) => {
      if (!el)
        return;
      onTarget(el);
    },
    {
      immediate: true
    }
  );
}
const translateAlias = {
  x: "translateX",
  y: "translateY",
  z: "translateZ"
};
function reactiveTransform(props = {}, enableHardwareAcceleration = true) {
  const state = reactive({ ...props });
  const transform = ref("");
  watch(
    state,
    (newVal) => {
      let result = "";
      let hasHardwareAcceleration = false;
      if (enableHardwareAcceleration && (newVal.x || newVal.y || newVal.z)) {
        const str = [newVal.x || 0, newVal.y || 0, newVal.z || 0].map((val) => getValueAsType(val, px)).join(",");
        result += `translate3d(${str}) `;
        hasHardwareAcceleration = true;
      }
      for (const [key, value] of Object.entries(newVal)) {
        if (enableHardwareAcceleration && (key === "x" || key === "y" || key === "z"))
          continue;
        const valueType = getValueType(key);
        const valueAsType = getValueAsType(value, valueType);
        result += `${translateAlias[key] || key}(${valueAsType}) `;
      }
      if (enableHardwareAcceleration && !hasHardwareAcceleration)
        result += "translateZ(0px) ";
      transform.value = result.trim();
    },
    {
      immediate: true,
      deep: true
    }
  );
  return {
    state,
    transform
  };
}
const transformAxes = ["", "X", "Y", "Z"];
const order = ["perspective", "translate", "scale", "rotate", "skew"];
const transformProps = ["transformPerspective", "x", "y", "z"];
order.forEach((operationKey) => {
  transformAxes.forEach((axesKey) => {
    const key = operationKey + axesKey;
    transformProps.push(key);
  });
});
const transformPropSet = new Set(transformProps);
function isTransformProp(key) {
  return transformPropSet.has(key);
}
const transformOriginProps = /* @__PURE__ */ new Set(["originX", "originY", "originZ"]);
function isTransformOriginProp(key) {
  return transformOriginProps.has(key);
}
function splitValues(variant) {
  const transform = {};
  const style = {};
  Object.entries(variant).forEach(([key, value]) => {
    if (isTransformProp(key) || isTransformOriginProp(key))
      transform[key] = value;
    else
      style[key] = value;
  });
  return { transform, style };
}
function variantToStyle(variant) {
  const { transform: _transform, style: _style } = splitValues(variant);
  const { transform } = reactiveTransform(_transform);
  const { style } = reactiveStyle(_style);
  if (transform.value)
    style.value.transform = transform.value;
  return style.value;
}
function useElementStyle(target, onInit) {
  let _cache;
  let _target;
  const { state, style } = reactiveStyle();
  usePermissiveTarget(target, (el) => {
    _target = el;
    for (const key of Object.keys(valueTypes)) {
      if (el.style[key] === null || el.style[key] === "" || isTransformProp(key) || isTransformOriginProp(key))
        continue;
      state[key] = el.style[key];
    }
    if (_cache) {
      Object.entries(_cache).forEach(([key, value]) => el.style[key] = value);
    }
    if (onInit)
      onInit(state);
  });
  watch(
    style,
    (newVal) => {
      if (!_target) {
        _cache = newVal;
        return;
      }
      for (const key in newVal)
        _target.style[key] = newVal[key];
    },
    {
      immediate: true
    }
  );
  return {
    style: state
  };
}
function parseTransform(transform) {
  const transforms = transform.trim().split(/\) |\)/);
  if (transforms.length === 1)
    return {};
  const parseValues = (value) => {
    if (value.endsWith("px") || value.endsWith("deg"))
      return Number.parseFloat(value);
    if (Number.isNaN(Number(value)))
      return Number(value);
    return value;
  };
  return transforms.reduce((acc, transform2) => {
    if (!transform2)
      return acc;
    const [name, transformValue] = transform2.split("(");
    const valueArray = transformValue.split(",");
    const values = valueArray.map((val) => {
      return parseValues(val.endsWith(")") ? val.replace(")", "") : val.trim());
    });
    const value = values.length === 1 ? values[0] : values;
    return {
      ...acc,
      [name]: value
    };
  }, {});
}
function stateFromTransform(state, transform) {
  Object.entries(parseTransform(transform)).forEach(([key, value]) => {
    const axes = ["x", "y", "z"];
    if (key === "translate3d") {
      if (value === 0) {
        axes.forEach((axis) => state[axis] = 0);
        return;
      }
      value.forEach((axisValue, index2) => state[axes[index2]] = axisValue);
      return;
    }
    value = Number.parseFloat(`${value}`);
    if (key === "translateX") {
      state.x = value;
      return;
    }
    if (key === "translateY") {
      state.y = value;
      return;
    }
    if (key === "translateZ") {
      state.z = value;
      return;
    }
    state[key] = value;
  });
}
function useElementTransform(target, onInit) {
  let _cache;
  let _target;
  const { state, transform } = reactiveTransform();
  usePermissiveTarget(target, (el) => {
    _target = el;
    if (el.style.transform)
      stateFromTransform(state, el.style.transform);
    if (_cache)
      el.style.transform = _cache;
    if (onInit)
      onInit(state);
  });
  watch(
    transform,
    (newValue) => {
      if (!_target) {
        _cache = newValue;
        return;
      }
      _target.style.transform = newValue;
    },
    {
      immediate: true
    }
  );
  return {
    transform: state
  };
}
function useMotionProperties(target, defaultValues) {
  const motionProperties = reactive({});
  const apply = (values) => Object.entries(values).forEach(([key, value]) => motionProperties[key] = value);
  const { style } = useElementStyle(target, apply);
  const { transform } = useElementTransform(target, apply);
  watch(
    motionProperties,
    (newVal) => {
      Object.entries(newVal).forEach(([key, value]) => {
        const target2 = isTransformProp(key) ? transform : style;
        if (target2[key] && target2[key] === value)
          return;
        target2[key] = value;
      });
    },
    {
      immediate: true,
      deep: true
    }
  );
  usePermissiveTarget(target, () => defaultValues);
  return {
    motionProperties,
    style,
    transform
  };
}
function useMotionVariants(variants = {}) {
  const _variants = unref(variants);
  const variant = ref();
  const state = computed(() => {
    if (!variant.value)
      return;
    return _variants[variant.value];
  });
  return {
    state,
    variant
  };
}
function useMotion(target, variants = {}, options) {
  const { motionProperties } = useMotionProperties(target);
  const { variant, state } = useMotionVariants(variants);
  const controls = useMotionControls(motionProperties, variants);
  const instance = {
    target,
    variant,
    variants,
    state,
    motionProperties,
    ...controls
  };
  useMotionFeatures(instance, options);
  return instance;
}
const transitionKeys = ["delay", "duration"];
const directivePropsKeys = ["initial", "enter", "leave", "visible", "visible-once", "visibleOnce", "hovered", "tapped", "focused", ...transitionKeys];
function isTransitionKey(val) {
  return transitionKeys.includes(val);
}
function resolveVariants(node, variantsRef) {
  const target = node.props ? node.props : node.data && node.data.attrs ? node.data.attrs : {};
  if (target) {
    if (target.variants && isObject(target.variants)) {
      variantsRef.value = {
        ...variantsRef.value,
        ...target.variants
      };
    }
    for (let key of directivePropsKeys) {
      if (!target || !target[key])
        continue;
      if (isTransitionKey(key) && typeof target[key] === "number") {
        for (const variantKey of ["enter", "visible", "visibleOnce"]) {
          const variantConfig = variantsRef.value[variantKey];
          if (variantConfig == null)
            continue;
          variantConfig.transition ?? (variantConfig.transition = {});
          variantConfig.transition[key] = target[key];
        }
        continue;
      }
      if (isObject(target[key])) {
        const prop = target[key];
        if (key === "visible-once")
          key = "visibleOnce";
        variantsRef.value[key] = prop;
      }
    }
  }
}
function directive(variants, isPreset = false) {
  const register2 = (el, binding, node) => {
    const key = binding.value && typeof binding.value === "string" ? binding.value : node.key;
    if (key && motionState[key])
      motionState[key].stop();
    const variantsObject = isPreset ? structuredClone(variants || {}) : variants || {};
    const variantsRef = ref(variantsObject);
    if (typeof binding.value === "object")
      variantsRef.value = binding.value;
    resolveVariants(node, variantsRef);
    const motionOptions = { eventListeners: true, lifeCycleHooks: true, syncVariants: true, visibilityHooks: false };
    const motionInstance = useMotion(el, variantsRef, motionOptions);
    el.motionInstance = motionInstance;
    if (key)
      motionState[key] = motionInstance;
  };
  const mounted6 = (el, _binding, _node) => {
    el.motionInstance && registerVisibilityHooks(el.motionInstance);
  };
  return {
    created: register2,
    mounted: mounted6,
    getSSRProps(binding, node) {
      let { initial: bindingInitial } = binding.value || node && (node == null ? void 0 : node.props) || {};
      bindingInitial = unref(bindingInitial);
      const initial = defu({}, (variants == null ? void 0 : variants.initial) || {}, bindingInitial || {});
      if (!initial || Object.keys(initial).length === 0)
        return;
      const style = variantToStyle(initial);
      return {
        style
      };
    }
  };
}
const fade = {
  initial: {
    opacity: 0
  },
  enter: {
    opacity: 1
  }
};
const fadeVisible = {
  initial: {
    opacity: 0
  },
  visible: {
    opacity: 1
  }
};
const fadeVisibleOnce = {
  initial: {
    opacity: 0
  },
  visibleOnce: {
    opacity: 1
  }
};
const pop = {
  initial: {
    scale: 0,
    opacity: 0
  },
  enter: {
    scale: 1,
    opacity: 1
  }
};
const popVisible = {
  initial: {
    scale: 0,
    opacity: 0
  },
  visible: {
    scale: 1,
    opacity: 1
  }
};
const popVisibleOnce = {
  initial: {
    scale: 0,
    opacity: 0
  },
  visibleOnce: {
    scale: 1,
    opacity: 1
  }
};
const rollLeft = {
  initial: {
    x: -100,
    rotate: 90,
    opacity: 0
  },
  enter: {
    x: 0,
    rotate: 0,
    opacity: 1
  }
};
const rollVisibleLeft = {
  initial: {
    x: -100,
    rotate: 90,
    opacity: 0
  },
  visible: {
    x: 0,
    rotate: 0,
    opacity: 1
  }
};
const rollVisibleOnceLeft = {
  initial: {
    x: -100,
    rotate: 90,
    opacity: 0
  },
  visibleOnce: {
    x: 0,
    rotate: 0,
    opacity: 1
  }
};
const rollRight = {
  initial: {
    x: 100,
    rotate: -90,
    opacity: 0
  },
  enter: {
    x: 0,
    rotate: 0,
    opacity: 1
  }
};
const rollVisibleRight = {
  initial: {
    x: 100,
    rotate: -90,
    opacity: 0
  },
  visible: {
    x: 0,
    rotate: 0,
    opacity: 1
  }
};
const rollVisibleOnceRight = {
  initial: {
    x: 100,
    rotate: -90,
    opacity: 0
  },
  visibleOnce: {
    x: 0,
    rotate: 0,
    opacity: 1
  }
};
const rollTop = {
  initial: {
    y: -100,
    rotate: -90,
    opacity: 0
  },
  enter: {
    y: 0,
    rotate: 0,
    opacity: 1
  }
};
const rollVisibleTop = {
  initial: {
    y: -100,
    rotate: -90,
    opacity: 0
  },
  visible: {
    y: 0,
    rotate: 0,
    opacity: 1
  }
};
const rollVisibleOnceTop = {
  initial: {
    y: -100,
    rotate: -90,
    opacity: 0
  },
  visibleOnce: {
    y: 0,
    rotate: 0,
    opacity: 1
  }
};
const rollBottom = {
  initial: {
    y: 100,
    rotate: 90,
    opacity: 0
  },
  enter: {
    y: 0,
    rotate: 0,
    opacity: 1
  }
};
const rollVisibleBottom = {
  initial: {
    y: 100,
    rotate: 90,
    opacity: 0
  },
  visible: {
    y: 0,
    rotate: 0,
    opacity: 1
  }
};
const rollVisibleOnceBottom = {
  initial: {
    y: 100,
    rotate: 90,
    opacity: 0
  },
  visibleOnce: {
    y: 0,
    rotate: 0,
    opacity: 1
  }
};
const slideLeft = {
  initial: {
    x: -100,
    opacity: 0
  },
  enter: {
    x: 0,
    opacity: 1
  }
};
const slideVisibleLeft = {
  initial: {
    x: -100,
    opacity: 0
  },
  visible: {
    x: 0,
    opacity: 1
  }
};
const slideVisibleOnceLeft = {
  initial: {
    x: -100,
    opacity: 0
  },
  visibleOnce: {
    x: 0,
    opacity: 1
  }
};
const slideRight = {
  initial: {
    x: 100,
    opacity: 0
  },
  enter: {
    x: 0,
    opacity: 1
  }
};
const slideVisibleRight = {
  initial: {
    x: 100,
    opacity: 0
  },
  visible: {
    x: 0,
    opacity: 1
  }
};
const slideVisibleOnceRight = {
  initial: {
    x: 100,
    opacity: 0
  },
  visibleOnce: {
    x: 0,
    opacity: 1
  }
};
const slideTop = {
  initial: {
    y: -100,
    opacity: 0
  },
  enter: {
    y: 0,
    opacity: 1
  }
};
const slideVisibleTop = {
  initial: {
    y: -100,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1
  }
};
const slideVisibleOnceTop = {
  initial: {
    y: -100,
    opacity: 0
  },
  visibleOnce: {
    y: 0,
    opacity: 1
  }
};
const slideBottom = {
  initial: {
    y: 100,
    opacity: 0
  },
  enter: {
    y: 0,
    opacity: 1
  }
};
const slideVisibleBottom = {
  initial: {
    y: 100,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1
  }
};
const slideVisibleOnceBottom = {
  initial: {
    y: 100,
    opacity: 0
  },
  visibleOnce: {
    y: 0,
    opacity: 1
  }
};
const presets = {
  __proto__: null,
  fade,
  fadeVisible,
  fadeVisibleOnce,
  pop,
  popVisible,
  popVisibleOnce,
  rollBottom,
  rollLeft,
  rollRight,
  rollTop,
  rollVisibleBottom,
  rollVisibleLeft,
  rollVisibleOnceBottom,
  rollVisibleOnceLeft,
  rollVisibleOnceRight,
  rollVisibleOnceTop,
  rollVisibleRight,
  rollVisibleTop,
  slideBottom,
  slideLeft,
  slideRight,
  slideTop,
  slideVisibleBottom,
  slideVisibleLeft,
  slideVisibleOnceBottom,
  slideVisibleOnceLeft,
  slideVisibleOnceRight,
  slideVisibleOnceTop,
  slideVisibleRight,
  slideVisibleTop
};
function slugify(str) {
  const a = "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
  const b = "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
  const p = new RegExp(a.split("").join("|"), "g");
  return str.toString().replace(/[A-Z]/g, (s) => `-${s}`).toLowerCase().replace(/\s+/g, "-").replace(p, (c) => b.charAt(a.indexOf(c))).replace(/&/g, "-and-").replace(/[^\w\-]+/g, "").replace(/-{2,}/g, "-").replace(/^-+/, "").replace(/-+$/, "");
}
const isPresetKey = (val) => val in presets;
const MotionComponentProps = {
  // Preset to be loaded
  preset: {
    type: String,
    validator: (val) => isPresetKey(val),
    required: false
  },
  // Instance
  instance: {
    type: Object,
    required: false
  },
  // Variants
  variants: {
    type: Object,
    required: false
  },
  // Initial variant
  initial: {
    type: Object,
    required: false
  },
  // Lifecycle hooks variants
  enter: {
    type: Object,
    required: false
  },
  leave: {
    type: Object,
    required: false
  },
  // Intersection observer variants
  visible: {
    type: Object,
    required: false
  },
  visibleOnce: {
    type: Object,
    required: false
  },
  // Event listeners variants
  hovered: {
    type: Object,
    required: false
  },
  tapped: {
    type: Object,
    required: false
  },
  focused: {
    type: Object,
    required: false
  },
  // Helpers
  delay: {
    type: [Number, String],
    required: false
  },
  duration: {
    type: [Number, String],
    required: false
  }
};
function setupMotionComponent(props) {
  const instances = reactive({});
  const preset = computed(() => props.preset ? structuredClone(presets[props.preset]) : {});
  const propsConfig = computed(() => ({
    initial: props.initial,
    enter: props.enter,
    leave: props.leave,
    visible: props.visible,
    visibleOnce: props.visibleOnce,
    hovered: props.hovered,
    tapped: props.tapped,
    focused: props.focused
  }));
  const motionConfig = computed(() => {
    const config = defu({}, propsConfig.value, preset.value, props.variants || {});
    for (const transitionKey of ["delay", "duration"]) {
      if (!props[transitionKey])
        continue;
      const transitionValueParsed = Number.parseInt(props[transitionKey]);
      for (const variantKey of ["enter", "visible", "visibleOnce"]) {
        const variantConfig = config[variantKey];
        if (variantConfig == null)
          continue;
        variantConfig.transition ?? (variantConfig.transition = {});
        variantConfig.transition[transitionKey] = transitionValueParsed;
      }
    }
    return config;
  });
  function setNodeInstance(node, index2, style) {
    var _a;
    node.props ?? (node.props = {});
    (_a = node.props).style ?? (_a.style = {});
    node.props.style = { ...node.props.style, ...style };
    node.props.onVnodeMounted = ({ el }) => {
      instances[index2] = useMotion(el, motionConfig.value);
    };
    return node;
  }
  return {
    motionConfig,
    setNodeInstance
  };
}
const MotionComponent = defineComponent({
  props: {
    ...MotionComponentProps,
    is: {
      type: [String, Object],
      default: "div"
    }
  },
  setup(props) {
    const slots = useSlots();
    const { motionConfig, setNodeInstance } = setupMotionComponent(props);
    return () => {
      const style = variantToStyle(motionConfig.value.initial || {});
      const node = h(props.is, void 0, slots);
      setNodeInstance(node, 0, style);
      return node;
    };
  }
});
const MotionGroupComponent = defineComponent({
  props: {
    ...MotionComponentProps,
    is: {
      type: [String, Object],
      required: false
    }
  },
  setup(props) {
    const slots = useSlots();
    const { motionConfig, setNodeInstance } = setupMotionComponent(props);
    return () => {
      var _a;
      const style = variantToStyle(motionConfig.value.initial || {});
      const nodes = ((_a = slots.default) == null ? void 0 : _a.call(slots)) || [];
      for (let i = 0; i < nodes.length; i++) {
        setNodeInstance(nodes[i], i, style);
      }
      if (props.is) {
        return h(props.is, void 0, nodes);
      }
      return nodes;
    };
  }
});
const MotionPlugin = {
  install(app, options) {
    app.directive("motion", directive());
    app.component("Motion", MotionComponent);
    app.component("MotionGroup", MotionGroupComponent);
    if (!options || options && !options.excludePresets) {
      for (const key in presets) {
        const preset = presets[key];
        app.directive(`motion-${slugify(key)}`, directive(preset, true));
      }
    }
    if (options && options.directives) {
      for (const key in options.directives) {
        const variants = options.directives[key];
        if (!variants.initial && __DEV__) {
          console.warn(`Your directive v-motion-${key} is missing initial variant!`);
        }
        app.directive(`motion-${key}`, directive(variants, true));
      }
    }
  }
};
const motion_fmZWau4t0U = /* @__PURE__ */ defineNuxtPlugin(
  (nuxtApp) => {
    const config = /* @__PURE__ */ useRuntimeConfig();
    nuxtApp.vueApp.use(MotionPlugin, config.public.motion);
  }
);
function _createForOfIteratorHelper$1(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray$3$1(o)) || allowArrayLike) {
      if (it) o = it;
      var i = 0;
      var F = function F2() {
      };
      return { s: F, n: function n() {
        if (i >= o.length) return { done: true };
        return { done: false, value: o[i++] };
      }, e: function e(_e) {
        throw _e;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return { s: function s() {
    it = it.call(o);
  }, n: function n() {
    var step = it.next();
    normalCompletion = step.done;
    return step;
  }, e: function e(_e2) {
    didErr = true;
    err = _e2;
  }, f: function f() {
    try {
      if (!normalCompletion && it["return"] != null) it["return"]();
    } finally {
      if (didErr) throw err;
    }
  } };
}
function _toConsumableArray$3(arr) {
  return _arrayWithoutHoles$3(arr) || _iterableToArray$3(arr) || _unsupportedIterableToArray$3$1(arr) || _nonIterableSpread$3();
}
function _nonIterableSpread$3() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray$3(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles$3(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray$3$1(arr);
}
function _typeof$3$1(o) {
  "@babel/helpers - typeof";
  return _typeof$3$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$3$1(o);
}
function _slicedToArray$1$1(arr, i) {
  return _arrayWithHoles$1$1(arr) || _iterableToArrayLimit$1$1(arr, i) || _unsupportedIterableToArray$3$1(arr, i) || _nonIterableRest$1$1();
}
function _nonIterableRest$1$1() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$3$1(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$3$1(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3$1(o, minLen);
}
function _arrayLikeToArray$3$1(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit$1$1(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$1$1(arr) {
  if (Array.isArray(arr)) return arr;
}
var DomHandler = {
  innerWidth: function innerWidth(el) {
    if (el) {
      var width2 = el.offsetWidth;
      var style = getComputedStyle(el);
      width2 += parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
      return width2;
    }
    return 0;
  },
  width: function width(el) {
    if (el) {
      var width2 = el.offsetWidth;
      var style = getComputedStyle(el);
      width2 -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
      return width2;
    }
    return 0;
  },
  getWindowScrollTop: function getWindowScrollTop() {
    var doc = (void 0).documentElement;
    return ((void 0).pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
  },
  getWindowScrollLeft: function getWindowScrollLeft() {
    var doc = (void 0).documentElement;
    return ((void 0).pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
  },
  getOuterWidth: function getOuterWidth(el, margin) {
    if (el) {
      var width2 = el.offsetWidth;
      if (margin) {
        var style = getComputedStyle(el);
        width2 += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
      }
      return width2;
    }
    return 0;
  },
  getOuterHeight: function getOuterHeight(el, margin) {
    if (el) {
      var height = el.offsetHeight;
      if (margin) {
        var style = getComputedStyle(el);
        height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
      }
      return height;
    }
    return 0;
  },
  getClientHeight: function getClientHeight(el, margin) {
    if (el) {
      var height = el.clientHeight;
      if (margin) {
        var style = getComputedStyle(el);
        height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
      }
      return height;
    }
    return 0;
  },
  getViewport: function getViewport() {
    var win = void 0, d = void 0, e = d.documentElement, g = d.getElementsByTagName("body")[0], w = win.innerWidth || e.clientWidth || g.clientWidth, h2 = win.innerHeight || e.clientHeight || g.clientHeight;
    return {
      width: w,
      height: h2
    };
  },
  getOffset: function getOffset(el) {
    if (el) {
      var rect = el.getBoundingClientRect();
      return {
        top: rect.top + ((void 0).pageYOffset || (void 0).documentElement.scrollTop || (void 0).body.scrollTop || 0),
        left: rect.left + ((void 0).pageXOffset || (void 0).documentElement.scrollLeft || (void 0).body.scrollLeft || 0)
      };
    }
    return {
      top: "auto",
      left: "auto"
    };
  },
  index: function index(element) {
    if (element) {
      var _this$getParentNode;
      var children = (_this$getParentNode = this.getParentNode(element)) === null || _this$getParentNode === void 0 ? void 0 : _this$getParentNode.childNodes;
      var num = 0;
      for (var i = 0; i < children.length; i++) {
        if (children[i] === element) return num;
        if (children[i].nodeType === 1) num++;
      }
    }
    return -1;
  },
  addMultipleClasses: function addMultipleClasses(element, classNames) {
    var _this = this;
    if (element && classNames) {
      [classNames].flat().filter(Boolean).forEach(function(cNames) {
        return cNames.split(" ").forEach(function(className) {
          return _this.addClass(element, className);
        });
      });
    }
  },
  removeMultipleClasses: function removeMultipleClasses(element, classNames) {
    var _this2 = this;
    if (element && classNames) {
      [classNames].flat().filter(Boolean).forEach(function(cNames) {
        return cNames.split(" ").forEach(function(className) {
          return _this2.removeClass(element, className);
        });
      });
    }
  },
  addClass: function addClass(element, className) {
    if (element && className && !this.hasClass(element, className)) {
      if (element.classList) element.classList.add(className);
      else element.className += " " + className;
    }
  },
  removeClass: function removeClass(element, className) {
    if (element && className) {
      if (element.classList) element.classList.remove(className);
      else element.className = element.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    }
  },
  hasClass: function hasClass(element, className) {
    if (element) {
      if (element.classList) return element.classList.contains(className);
      else return new RegExp("(^| )" + className + "( |$)", "gi").test(element.className);
    }
    return false;
  },
  addStyles: function addStyles(element) {
    var styles = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (element) {
      Object.entries(styles).forEach(function(_ref) {
        var _ref2 = _slicedToArray$1$1(_ref, 2), key = _ref2[0], value = _ref2[1];
        return element.style[key] = value;
      });
    }
  },
  find: function find(element, selector) {
    return this.isElement(element) ? element.querySelectorAll(selector) : [];
  },
  findSingle: function findSingle(element, selector) {
    return this.isElement(element) ? element.querySelector(selector) : null;
  },
  createElement: function createElement(type) {
    var attributes = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (type) {
      var element = (void 0).createElement(type);
      this.setAttributes(element, attributes);
      for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        children[_key - 2] = arguments[_key];
      }
      element.append.apply(element, children);
      return element;
    }
    return void 0;
  },
  setAttribute: function setAttribute(element) {
    var attribute = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    var value = arguments.length > 2 ? arguments[2] : void 0;
    if (this.isElement(element) && value !== null && value !== void 0) {
      element.setAttribute(attribute, value);
    }
  },
  setAttributes: function setAttributes(element) {
    var _this3 = this;
    var attributes = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.isElement(element)) {
      var computedStyles = function computedStyles2(rule, value) {
        var _element$$attrs, _element$$attrs2;
        var styles = element !== null && element !== void 0 && (_element$$attrs = element.$attrs) !== null && _element$$attrs !== void 0 && _element$$attrs[rule] ? [element === null || element === void 0 || (_element$$attrs2 = element.$attrs) === null || _element$$attrs2 === void 0 ? void 0 : _element$$attrs2[rule]] : [];
        return [value].flat().reduce(function(cv, v) {
          if (v !== null && v !== void 0) {
            var type = _typeof$3$1(v);
            if (type === "string" || type === "number") {
              cv.push(v);
            } else if (type === "object") {
              var _cv = Array.isArray(v) ? computedStyles2(rule, v) : Object.entries(v).map(function(_ref3) {
                var _ref4 = _slicedToArray$1$1(_ref3, 2), _k = _ref4[0], _v = _ref4[1];
                return rule === "style" && (!!_v || _v === 0) ? "".concat(_k.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(), ":").concat(_v) : !!_v ? _k : void 0;
              });
              cv = _cv.length ? cv.concat(_cv.filter(function(c) {
                return !!c;
              })) : cv;
            }
          }
          return cv;
        }, styles);
      };
      Object.entries(attributes).forEach(function(_ref5) {
        var _ref6 = _slicedToArray$1$1(_ref5, 2), key = _ref6[0], value = _ref6[1];
        if (value !== void 0 && value !== null) {
          var matchedEvent = key.match(/^on(.+)/);
          if (matchedEvent) {
            element.addEventListener(matchedEvent[1].toLowerCase(), value);
          } else if (key === "p-bind") {
            _this3.setAttributes(element, value);
          } else {
            value = key === "class" ? _toConsumableArray$3(new Set(computedStyles("class", value))).join(" ").trim() : key === "style" ? computedStyles("style", value).join(";").trim() : value;
            (element.$attrs = element.$attrs || {}) && (element.$attrs[key] = value);
            element.setAttribute(key, value);
          }
        }
      });
    }
  },
  getAttribute: function getAttribute(element, name) {
    if (this.isElement(element)) {
      var value = element.getAttribute(name);
      if (!isNaN(value)) {
        return +value;
      }
      if (value === "true" || value === "false") {
        return value === "true";
      }
      return value;
    }
    return void 0;
  },
  isAttributeEquals: function isAttributeEquals(element, name, value) {
    return this.isElement(element) ? this.getAttribute(element, name) === value : false;
  },
  isAttributeNotEquals: function isAttributeNotEquals(element, name, value) {
    return !this.isAttributeEquals(element, name, value);
  },
  getHeight: function getHeight(el) {
    if (el) {
      var height = el.offsetHeight;
      var style = getComputedStyle(el);
      height -= parseFloat(style.paddingTop) + parseFloat(style.paddingBottom) + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
      return height;
    }
    return 0;
  },
  getWidth: function getWidth(el) {
    if (el) {
      var width2 = el.offsetWidth;
      var style = getComputedStyle(el);
      width2 -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight) + parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
      return width2;
    }
    return 0;
  },
  absolutePosition: function absolutePosition(element, target) {
    var gutter = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
    if (element) {
      var elementDimensions = element.offsetParent ? {
        width: element.offsetWidth,
        height: element.offsetHeight
      } : this.getHiddenElementDimensions(element);
      var elementOuterHeight = elementDimensions.height;
      var elementOuterWidth = elementDimensions.width;
      var targetOuterHeight = target.offsetHeight;
      var targetOuterWidth = target.offsetWidth;
      var targetOffset = target.getBoundingClientRect();
      var windowScrollTop = this.getWindowScrollTop();
      var windowScrollLeft = this.getWindowScrollLeft();
      var viewport = this.getViewport();
      var top, left, origin = "top";
      if (targetOffset.top + targetOuterHeight + elementOuterHeight > viewport.height) {
        top = targetOffset.top + windowScrollTop - elementOuterHeight;
        origin = "bottom";
        if (top < 0) {
          top = windowScrollTop;
        }
      } else {
        top = targetOuterHeight + targetOffset.top + windowScrollTop;
      }
      if (targetOffset.left + elementOuterWidth > viewport.width) left = Math.max(0, targetOffset.left + windowScrollLeft + targetOuterWidth - elementOuterWidth);
      else left = targetOffset.left + windowScrollLeft;
      element.style.top = top + "px";
      element.style.left = left + "px";
      element.style.transformOrigin = origin;
      gutter && (element.style.marginTop = origin === "bottom" ? "calc(var(--p-anchor-gutter) * -1)" : "calc(var(--p-anchor-gutter))");
    }
  },
  relativePosition: function relativePosition(element, target) {
    var gutter = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
    if (element) {
      var elementDimensions = element.offsetParent ? {
        width: element.offsetWidth,
        height: element.offsetHeight
      } : this.getHiddenElementDimensions(element);
      var targetHeight = target.offsetHeight;
      var targetOffset = target.getBoundingClientRect();
      var viewport = this.getViewport();
      var top, left, origin = "top";
      if (targetOffset.top + targetHeight + elementDimensions.height > viewport.height) {
        top = -1 * elementDimensions.height;
        origin = "bottom";
        if (targetOffset.top + top < 0) {
          top = -1 * targetOffset.top;
        }
      } else {
        top = targetHeight;
      }
      if (elementDimensions.width > viewport.width) {
        left = targetOffset.left * -1;
      } else if (targetOffset.left + elementDimensions.width > viewport.width) {
        left = (targetOffset.left + elementDimensions.width - viewport.width) * -1;
      } else {
        left = 0;
      }
      element.style.top = top + "px";
      element.style.left = left + "px";
      element.style.transformOrigin = origin;
      gutter && (element.style.marginTop = origin === "bottom" ? "calc(var(--p-anchor-gutter) * -1)" : "calc(var(--p-anchor-gutter))");
    }
  },
  nestedPosition: function nestedPosition(element, level) {
    if (element) {
      var parentItem = element.parentElement;
      var elementOffset = this.getOffset(parentItem);
      var viewport = this.getViewport();
      var sublistWidth = element.offsetParent ? element.offsetWidth : this.getHiddenElementOuterWidth(element);
      var itemOuterWidth = this.getOuterWidth(parentItem.children[0]);
      var left;
      if (parseInt(elementOffset.left, 10) + itemOuterWidth + sublistWidth > viewport.width - this.calculateScrollbarWidth()) {
        if (parseInt(elementOffset.left, 10) < sublistWidth) {
          if (level % 2 === 1) {
            left = parseInt(elementOffset.left, 10) ? "-" + parseInt(elementOffset.left, 10) + "px" : "100%";
          } else if (level % 2 === 0) {
            left = viewport.width - sublistWidth - this.calculateScrollbarWidth() + "px";
          }
        } else {
          left = "-100%";
        }
      } else {
        left = "100%";
      }
      element.style.top = "0px";
      element.style.left = left;
    }
  },
  getParentNode: function getParentNode(element) {
    var parent = element === null || element === void 0 ? void 0 : element.parentNode;
    if (parent && parent instanceof ShadowRoot && parent.host) {
      parent = parent.host;
    }
    return parent;
  },
  getParents: function getParents(element) {
    var parents = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
    var parent = this.getParentNode(element);
    return parent === null ? parents : this.getParents(parent, parents.concat([parent]));
  },
  getScrollableParents: function getScrollableParents(element) {
    var scrollableParents = [];
    if (element) {
      var parents = this.getParents(element);
      var overflowRegex = /(auto|scroll)/;
      var overflowCheck = function overflowCheck2(node) {
        try {
          var styleDeclaration = (void 0)["getComputedStyle"](node, null);
          return overflowRegex.test(styleDeclaration.getPropertyValue("overflow")) || overflowRegex.test(styleDeclaration.getPropertyValue("overflowX")) || overflowRegex.test(styleDeclaration.getPropertyValue("overflowY"));
        } catch (err) {
          return false;
        }
      };
      var _iterator = _createForOfIteratorHelper$1(parents), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var parent = _step.value;
          var scrollSelectors = parent.nodeType === 1 && parent.dataset["scrollselectors"];
          if (scrollSelectors) {
            var selectors = scrollSelectors.split(",");
            var _iterator2 = _createForOfIteratorHelper$1(selectors), _step2;
            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
                var selector = _step2.value;
                var el = this.findSingle(parent, selector);
                if (el && overflowCheck(el)) {
                  scrollableParents.push(el);
                }
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
          }
          if (parent.nodeType !== 9 && overflowCheck(parent)) {
            scrollableParents.push(parent);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    return scrollableParents;
  },
  getHiddenElementOuterHeight: function getHiddenElementOuterHeight(element) {
    if (element) {
      element.style.visibility = "hidden";
      element.style.display = "block";
      var elementHeight = element.offsetHeight;
      element.style.display = "none";
      element.style.visibility = "visible";
      return elementHeight;
    }
    return 0;
  },
  getHiddenElementOuterWidth: function getHiddenElementOuterWidth(element) {
    if (element) {
      element.style.visibility = "hidden";
      element.style.display = "block";
      var elementWidth = element.offsetWidth;
      element.style.display = "none";
      element.style.visibility = "visible";
      return elementWidth;
    }
    return 0;
  },
  getHiddenElementDimensions: function getHiddenElementDimensions(element) {
    if (element) {
      var dimensions = {};
      element.style.visibility = "hidden";
      element.style.display = "block";
      dimensions.width = element.offsetWidth;
      dimensions.height = element.offsetHeight;
      element.style.display = "none";
      element.style.visibility = "visible";
      return dimensions;
    }
    return 0;
  },
  fadeIn: function fadeIn(element, duration) {
    if (element) {
      element.style.opacity = 0;
      var last = +/* @__PURE__ */ new Date();
      var opacity = 0;
      var tick = function tick2() {
        opacity = +element.style.opacity + ((/* @__PURE__ */ new Date()).getTime() - last) / duration;
        element.style.opacity = opacity;
        last = +/* @__PURE__ */ new Date();
        if (+opacity < 1) {
          (void 0).requestAnimationFrame && requestAnimationFrame(tick2) || setTimeout(tick2, 16);
        }
      };
      tick();
    }
  },
  fadeOut: function fadeOut(element, ms) {
    if (element) {
      var opacity = 1, interval = 50, duration = ms, gap = interval / duration;
      var fading = setInterval(function() {
        opacity -= gap;
        if (opacity <= 0) {
          opacity = 0;
          clearInterval(fading);
        }
        element.style.opacity = opacity;
      }, interval);
    }
  },
  getUserAgent: function getUserAgent() {
    return (void 0).userAgent;
  },
  appendChild: function appendChild(element, target) {
    if (this.isElement(target)) target.appendChild(element);
    else if (target.el && target.elElement) target.elElement.appendChild(element);
    else throw new Error("Cannot append " + target + " to " + element);
  },
  isElement: function isElement(obj) {
    return (typeof HTMLElement === "undefined" ? "undefined" : _typeof$3$1(HTMLElement)) === "object" ? obj instanceof HTMLElement : obj && _typeof$3$1(obj) === "object" && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === "string";
  },
  scrollInView: function scrollInView(container, item) {
    var borderTopValue = getComputedStyle(container).getPropertyValue("borderTopWidth");
    var borderTop = borderTopValue ? parseFloat(borderTopValue) : 0;
    var paddingTopValue = getComputedStyle(container).getPropertyValue("paddingTop");
    var paddingTop = paddingTopValue ? parseFloat(paddingTopValue) : 0;
    var containerRect = container.getBoundingClientRect();
    var itemRect = item.getBoundingClientRect();
    var offset = itemRect.top + (void 0).body.scrollTop - (containerRect.top + (void 0).body.scrollTop) - borderTop - paddingTop;
    var scroll = container.scrollTop;
    var elementHeight = container.clientHeight;
    var itemHeight = this.getOuterHeight(item);
    if (offset < 0) {
      container.scrollTop = scroll + offset;
    } else if (offset + itemHeight > elementHeight) {
      container.scrollTop = scroll + offset - elementHeight + itemHeight;
    }
  },
  clearSelection: function clearSelection() {
    if ((void 0).getSelection) {
      if ((void 0).getSelection().empty) {
        (void 0).getSelection().empty();
      } else if ((void 0).getSelection().removeAllRanges && (void 0).getSelection().rangeCount > 0 && (void 0).getSelection().getRangeAt(0).getClientRects().length > 0) {
        (void 0).getSelection().removeAllRanges();
      }
    } else if ((void 0)["selection"] && (void 0)["selection"].empty) {
      try {
        (void 0)["selection"].empty();
      } catch (error) {
      }
    }
  },
  getSelection: function getSelection() {
    if ((void 0).getSelection) return (void 0).getSelection().toString();
    else if ((void 0).getSelection) return (void 0).getSelection().toString();
    else if ((void 0)["selection"]) return (void 0)["selection"].createRange().text;
    return null;
  },
  calculateScrollbarWidth: function calculateScrollbarWidth() {
    if (this.calculatedScrollbarWidth != null) return this.calculatedScrollbarWidth;
    var scrollDiv = (void 0).createElement("div");
    this.addStyles(scrollDiv, {
      width: "100px",
      height: "100px",
      overflow: "scroll",
      position: "absolute",
      top: "-9999px"
    });
    (void 0).body.appendChild(scrollDiv);
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    (void 0).body.removeChild(scrollDiv);
    this.calculatedScrollbarWidth = scrollbarWidth;
    return scrollbarWidth;
  },
  calculateBodyScrollbarWidth: function calculateBodyScrollbarWidth() {
    return (void 0).innerWidth - (void 0).documentElement.offsetWidth;
  },
  getBrowser: function getBrowser() {
    if (!this.browser) {
      var matched = this.resolveUserAgent();
      this.browser = {};
      if (matched.browser) {
        this.browser[matched.browser] = true;
        this.browser["version"] = matched.version;
      }
      if (this.browser["chrome"]) {
        this.browser["webkit"] = true;
      } else if (this.browser["webkit"]) {
        this.browser["safari"] = true;
      }
    }
    return this.browser;
  },
  resolveUserAgent: function resolveUserAgent() {
    var ua = (void 0).userAgent.toLowerCase();
    var match = /(chrome)[ ]([\w.]+)/.exec(ua) || /(webkit)[ ]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ ]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
    return {
      browser: match[1] || "",
      version: match[2] || "0"
    };
  },
  isVisible: function isVisible(element) {
    return element && element.offsetParent != null;
  },
  invokeElementMethod: function invokeElementMethod(element, methodName, args) {
    element[methodName].apply(element, args);
  },
  isExist: function isExist(element) {
    return !!(element !== null && typeof element !== "undefined" && element.nodeName && this.getParentNode(element));
  },
  isClient: function isClient() {
    return false;
  },
  focus: function focus(el, options) {
    el && (void 0).activeElement !== el && el.focus(options);
  },
  isFocusableElement: function isFocusableElement(element) {
    var selector = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    return this.isElement(element) ? element.matches('button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])'.concat(selector, ',\n                [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector, ',\n                input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector, ',\n                select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector, ',\n                textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector, ',\n                [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector, ',\n                [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector)) : false;
  },
  getFocusableElements: function getFocusableElements(element) {
    var selector = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    var focusableElements = this.find(element, 'button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])'.concat(selector, ',\n                [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector, ',\n                input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector, ',\n                select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector, ',\n                textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector, ',\n                [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector, ',\n                [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector));
    var visibleFocusableElements = [];
    var _iterator3 = _createForOfIteratorHelper$1(focusableElements), _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
        var focusableElement = _step3.value;
        if (getComputedStyle(focusableElement).display != "none" && getComputedStyle(focusableElement).visibility != "hidden") visibleFocusableElements.push(focusableElement);
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    return visibleFocusableElements;
  },
  getFirstFocusableElement: function getFirstFocusableElement(element, selector) {
    var focusableElements = this.getFocusableElements(element, selector);
    return focusableElements.length > 0 ? focusableElements[0] : null;
  },
  getLastFocusableElement: function getLastFocusableElement(element, selector) {
    var focusableElements = this.getFocusableElements(element, selector);
    return focusableElements.length > 0 ? focusableElements[focusableElements.length - 1] : null;
  },
  getNextFocusableElement: function getNextFocusableElement(container, element, selector) {
    var focusableElements = this.getFocusableElements(container, selector);
    var index2 = focusableElements.length > 0 ? focusableElements.findIndex(function(el) {
      return el === element;
    }) : -1;
    var nextIndex = index2 > -1 && focusableElements.length >= index2 + 1 ? index2 + 1 : -1;
    return nextIndex > -1 ? focusableElements[nextIndex] : null;
  },
  getPreviousElementSibling: function getPreviousElementSibling(element, selector) {
    var previousElement = element.previousElementSibling;
    while (previousElement) {
      if (previousElement.matches(selector)) {
        return previousElement;
      } else {
        previousElement = previousElement.previousElementSibling;
      }
    }
    return null;
  },
  getNextElementSibling: function getNextElementSibling(element, selector) {
    var nextElement = element.nextElementSibling;
    while (nextElement) {
      if (nextElement.matches(selector)) {
        return nextElement;
      } else {
        nextElement = nextElement.nextElementSibling;
      }
    }
    return null;
  },
  isClickable: function isClickable(element) {
    if (element) {
      var targetNode = element.nodeName;
      var parentNode = element.parentElement && element.parentElement.nodeName;
      return targetNode === "INPUT" || targetNode === "TEXTAREA" || targetNode === "BUTTON" || targetNode === "A" || parentNode === "INPUT" || parentNode === "TEXTAREA" || parentNode === "BUTTON" || parentNode === "A" || !!element.closest(".p-button, .p-checkbox, .p-radiobutton");
    }
    return false;
  },
  applyStyle: function applyStyle(element, style) {
    if (typeof style === "string") {
      element.style.cssText = style;
    } else {
      for (var prop in style) {
        element.style[prop] = style[prop];
      }
    }
  },
  isIOS: function isIOS() {
    return /iPad|iPhone|iPod/.test((void 0).userAgent) && !(void 0)["MSStream"];
  },
  isAndroid: function isAndroid() {
    return /(android)/i.test((void 0).userAgent);
  },
  isTouchDevice: function isTouchDevice() {
    return "ontouchstart" in void 0 || (void 0).maxTouchPoints > 0 || (void 0).msMaxTouchPoints > 0;
  },
  hasCSSAnimation: function hasCSSAnimation(element) {
    if (element) {
      var style = getComputedStyle(element);
      var animationDuration = parseFloat(style.getPropertyValue("animation-duration") || "0");
      return animationDuration > 0;
    }
    return false;
  },
  hasCSSTransition: function hasCSSTransition(element) {
    if (element) {
      var style = getComputedStyle(element);
      var transitionDuration = parseFloat(style.getPropertyValue("transition-duration") || "0");
      return transitionDuration > 0;
    }
    return false;
  },
  exportCSV: function exportCSV(csv, filename) {
    var blob = new Blob([csv], {
      type: "application/csv;charset=utf-8;"
    });
    if ((void 0).navigator.msSaveOrOpenBlob) {
      (void 0).msSaveOrOpenBlob(blob, filename + ".csv");
    } else {
      var link = (void 0).createElement("a");
      if (link.download !== void 0) {
        link.setAttribute("href", URL.createObjectURL(blob));
        link.setAttribute("download", filename + ".csv");
        link.style.display = "none";
        (void 0).body.appendChild(link);
        link.click();
        (void 0).body.removeChild(link);
      } else {
        csv = "data:text/csv;charset=utf-8," + csv;
        (void 0).open(encodeURI(csv));
      }
    }
  },
  blockBodyScroll: function blockBodyScroll() {
    var className = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "p-overflow-hidden";
    (void 0).body.style.setProperty("--scrollbar-width", this.calculateBodyScrollbarWidth() + "px");
    this.addClass((void 0).body, className);
  },
  unblockBodyScroll: function unblockBodyScroll() {
    var className = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "p-overflow-hidden";
    (void 0).body.style.removeProperty("--scrollbar-width");
    this.removeClass((void 0).body, className);
  }
};
function _typeof$2$1(o) {
  "@babel/helpers - typeof";
  return _typeof$2$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$2$1(o);
}
function _classCallCheck$1(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$1(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey$1$1(descriptor.key), descriptor);
  }
}
function _createClass$1(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _toPropertyKey$1$1(t) {
  var i = _toPrimitive$1$1(t, "string");
  return "symbol" == _typeof$2$1(i) ? i : String(i);
}
function _toPrimitive$1$1(t, r) {
  if ("object" != _typeof$2$1(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof$2$1(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(t);
}
var ConnectedOverlayScrollHandler = /* @__PURE__ */ function() {
  function ConnectedOverlayScrollHandler2(element) {
    var listener = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : function() {
    };
    _classCallCheck$1(this, ConnectedOverlayScrollHandler2);
    this.element = element;
    this.listener = listener;
  }
  _createClass$1(ConnectedOverlayScrollHandler2, [{
    key: "bindScrollListener",
    value: function bindScrollListener2() {
      this.scrollableParents = DomHandler.getScrollableParents(this.element);
      for (var i = 0; i < this.scrollableParents.length; i++) {
        this.scrollableParents[i].addEventListener("scroll", this.listener);
      }
    }
  }, {
    key: "unbindScrollListener",
    value: function unbindScrollListener2() {
      if (this.scrollableParents) {
        for (var i = 0; i < this.scrollableParents.length; i++) {
          this.scrollableParents[i].removeEventListener("scroll", this.listener);
        }
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.unbindScrollListener();
      this.element = null;
      this.listener = null;
      this.scrollableParents = null;
    }
  }]);
  return ConnectedOverlayScrollHandler2;
}();
function primebus() {
  var allHandlers = /* @__PURE__ */ new Map();
  return {
    on: function on(type, handler2) {
      var handlers = allHandlers.get(type);
      if (!handlers) handlers = [handler2];
      else handlers.push(handler2);
      allHandlers.set(type, handlers);
    },
    off: function off(type, handler2) {
      var handlers = allHandlers.get(type);
      if (handlers) {
        handlers.splice(handlers.indexOf(handler2) >>> 0, 1);
      }
    },
    emit: function emit(type, evt) {
      var handlers = allHandlers.get(type);
      if (handlers) {
        handlers.slice().map(function(handler2) {
          handler2(evt);
        });
      }
    }
  };
}
function _slicedToArray$4(arr, i) {
  return _arrayWithHoles$4(arr) || _iterableToArrayLimit$4(arr, i) || _unsupportedIterableToArray$2$1(arr, i) || _nonIterableRest$4();
}
function _nonIterableRest$4() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit$4(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$4(arr) {
  if (Array.isArray(arr)) return arr;
}
function _toConsumableArray$2(arr) {
  return _arrayWithoutHoles$2(arr) || _iterableToArray$2(arr) || _unsupportedIterableToArray$2$1(arr) || _nonIterableSpread$2();
}
function _nonIterableSpread$2() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray$2(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles$2(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray$2$1(arr);
}
function _createForOfIteratorHelper$2(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray$2$1(o)) || allowArrayLike) {
      if (it) o = it;
      var i = 0;
      var F = function F2() {
      };
      return { s: F, n: function n() {
        if (i >= o.length) return { done: true };
        return { done: false, value: o[i++] };
      }, e: function e(_e) {
        throw _e;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return { s: function s() {
    it = it.call(o);
  }, n: function n() {
    var step = it.next();
    normalCompletion = step.done;
    return step;
  }, e: function e(_e2) {
    didErr = true;
    err = _e2;
  }, f: function f() {
    try {
      if (!normalCompletion && it["return"] != null) it["return"]();
    } finally {
      if (didErr) throw err;
    }
  } };
}
function _unsupportedIterableToArray$2$1(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$2$1(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2$1(o, minLen);
}
function _arrayLikeToArray$2$1(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _typeof$1$1(o) {
  "@babel/helpers - typeof";
  return _typeof$1$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$1$1(o);
}
var ObjectUtils = {
  equals: function equals(obj1, obj2, field) {
    if (field) return this.resolveFieldData(obj1, field) === this.resolveFieldData(obj2, field);
    else return this.deepEquals(obj1, obj2);
  },
  deepEquals: function deepEquals(a, b) {
    if (a === b) return true;
    if (a && b && _typeof$1$1(a) == "object" && _typeof$1$1(b) == "object") {
      var arrA = Array.isArray(a), arrB = Array.isArray(b), i, length, key;
      if (arrA && arrB) {
        length = a.length;
        if (length != b.length) return false;
        for (i = length; i-- !== 0; ) if (!this.deepEquals(a[i], b[i])) return false;
        return true;
      }
      if (arrA != arrB) return false;
      var dateA = a instanceof Date, dateB = b instanceof Date;
      if (dateA != dateB) return false;
      if (dateA && dateB) return a.getTime() == b.getTime();
      var regexpA = a instanceof RegExp, regexpB = b instanceof RegExp;
      if (regexpA != regexpB) return false;
      if (regexpA && regexpB) return a.toString() == b.toString();
      var keys = Object.keys(a);
      length = keys.length;
      if (length !== Object.keys(b).length) return false;
      for (i = length; i-- !== 0; ) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
      for (i = length; i-- !== 0; ) {
        key = keys[i];
        if (!this.deepEquals(a[key], b[key])) return false;
      }
      return true;
    }
    return a !== a && b !== b;
  },
  resolveFieldData: function resolveFieldData(data, field) {
    if (!data || !field) {
      return null;
    }
    try {
      var value = data[field];
      if (this.isNotEmpty(value)) return value;
    } catch (_unused) {
    }
    if (Object.keys(data).length) {
      if (this.isFunction(field)) {
        return field(data);
      } else if (field.indexOf(".") === -1) {
        return data[field];
      } else {
        var fields = field.split(".");
        var _value = data;
        for (var i = 0, len = fields.length; i < len; ++i) {
          if (_value == null) {
            return null;
          }
          _value = _value[fields[i]];
        }
        return _value;
      }
    }
    return null;
  },
  getItemValue: function getItemValue(obj) {
    for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      params[_key - 1] = arguments[_key];
    }
    return this.isFunction(obj) ? obj.apply(void 0, params) : obj;
  },
  filter: function filter2(value, fields, filterValue) {
    var filteredItems = [];
    if (value) {
      var _iterator = _createForOfIteratorHelper$2(value), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var item = _step.value;
          var _iterator2 = _createForOfIteratorHelper$2(fields), _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
              var field = _step2.value;
              if (String(this.resolveFieldData(item, field)).toLowerCase().indexOf(filterValue.toLowerCase()) > -1) {
                filteredItems.push(item);
                break;
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    return filteredItems;
  },
  reorderArray: function reorderArray(value, from, to) {
    if (value && from !== to) {
      if (to >= value.length) {
        to %= value.length;
        from %= value.length;
      }
      value.splice(to, 0, value.splice(from, 1)[0]);
    }
  },
  findIndexInList: function findIndexInList(value, list) {
    var index2 = -1;
    if (list) {
      for (var i = 0; i < list.length; i++) {
        if (list[i] === value) {
          index2 = i;
          break;
        }
      }
    }
    return index2;
  },
  contains: function contains(value, list) {
    if (value != null && list && list.length) {
      var _iterator3 = _createForOfIteratorHelper$2(list), _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
          var val = _step3.value;
          if (this.equals(value, val)) return true;
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
    return false;
  },
  insertIntoOrderedArray: function insertIntoOrderedArray(item, index2, arr, sourceArr) {
    if (arr.length > 0) {
      var injected = false;
      for (var i = 0; i < arr.length; i++) {
        var currentItemIndex = this.findIndexInList(arr[i], sourceArr);
        if (currentItemIndex > index2) {
          arr.splice(i, 0, item);
          injected = true;
          break;
        }
      }
      if (!injected) {
        arr.push(item);
      }
    } else {
      arr.push(item);
    }
  },
  removeAccents: function removeAccents(str) {
    if (str && str.search(/[\xC0-\xFF]/g) > -1) {
      str = str.replace(/[\xC0-\xC5]/g, "A").replace(/[\xC6]/g, "AE").replace(/[\xC7]/g, "C").replace(/[\xC8-\xCB]/g, "E").replace(/[\xCC-\xCF]/g, "I").replace(/[\xD0]/g, "D").replace(/[\xD1]/g, "N").replace(/[\xD2-\xD6\xD8]/g, "O").replace(/[\xD9-\xDC]/g, "U").replace(/[\xDD]/g, "Y").replace(/[\xDE]/g, "P").replace(/[\xE0-\xE5]/g, "a").replace(/[\xE6]/g, "ae").replace(/[\xE7]/g, "c").replace(/[\xE8-\xEB]/g, "e").replace(/[\xEC-\xEF]/g, "i").replace(/[\xF1]/g, "n").replace(/[\xF2-\xF6\xF8]/g, "o").replace(/[\xF9-\xFC]/g, "u").replace(/[\xFE]/g, "p").replace(/[\xFD\xFF]/g, "y");
    }
    return str;
  },
  getVNodeProp: function getVNodeProp(vnode, prop) {
    if (vnode) {
      var props = vnode.props;
      if (props) {
        var kebabProp = prop.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
        var propName = Object.prototype.hasOwnProperty.call(props, kebabProp) ? kebabProp : prop;
        return vnode.type["extends"].props[prop].type === Boolean && props[propName] === "" ? true : props[propName];
      }
    }
    return null;
  },
  toFlatCase: function toFlatCase(str) {
    return this.isString(str) ? str.replace(/(-|_)/g, "").toLowerCase() : str;
  },
  toKebabCase: function toKebabCase(str) {
    return this.isString(str) ? str.replace(/(_)/g, "-").replace(/[A-Z]/g, function(c, i) {
      return i === 0 ? c : "-" + c.toLowerCase();
    }).toLowerCase() : str;
  },
  toCapitalCase: function toCapitalCase(str) {
    return this.isString(str, {
      empty: false
    }) ? str[0].toUpperCase() + str.slice(1) : str;
  },
  isEmpty: function isEmpty(value) {
    return value === null || value === void 0 || value === "" || Array.isArray(value) && value.length === 0 || !(value instanceof Date) && _typeof$1$1(value) === "object" && Object.keys(value).length === 0;
  },
  isNotEmpty: function isNotEmpty(value) {
    return !this.isEmpty(value);
  },
  isFunction: function isFunction(value) {
    return !!(value && value.constructor && value.call && value.apply);
  },
  isObject: function isObject2(value) {
    var empty = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    return value instanceof Object && value.constructor === Object && (empty || Object.keys(value).length !== 0);
  },
  isDate: function isDate(value) {
    return value instanceof Date && value.constructor === Date;
  },
  isArray: function isArray2(value) {
    var empty = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    return Array.isArray(value) && (empty || value.length !== 0);
  },
  isString: function isString(value) {
    var empty = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    return typeof value === "string" && (empty || value !== "");
  },
  isPrintableCharacter: function isPrintableCharacter() {
    var _char = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    return this.isNotEmpty(_char) && _char.length === 1 && _char.match(/\S| /);
  },
  /**
   * Firefox-v103 does not currently support the "findLast" method. It is stated that this method will be supported with Firefox-v104.
   * https://caniuse.com/mdn-javascript_builtins_array_findlast
   */
  findLast: function findLast(arr, callback) {
    var item;
    if (this.isNotEmpty(arr)) {
      try {
        item = arr.findLast(callback);
      } catch (_unused2) {
        item = _toConsumableArray$2(arr).reverse().find(callback);
      }
    }
    return item;
  },
  /**
   * Firefox-v103 does not currently support the "findLastIndex" method. It is stated that this method will be supported with Firefox-v104.
   * https://caniuse.com/mdn-javascript_builtins_array_findlastindex
   */
  findLastIndex: function findLastIndex(arr, callback) {
    var index2 = -1;
    if (this.isNotEmpty(arr)) {
      try {
        index2 = arr.findLastIndex(callback);
      } catch (_unused3) {
        index2 = arr.lastIndexOf(_toConsumableArray$2(arr).reverse().find(callback));
      }
    }
    return index2;
  },
  sort: function sort(value1, value2) {
    var order2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
    var comparator = arguments.length > 3 ? arguments[3] : void 0;
    var nullSortOrder = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1;
    var result = this.compare(value1, value2, comparator, order2);
    var finalSortOrder = order2;
    if (this.isEmpty(value1) || this.isEmpty(value2)) {
      finalSortOrder = nullSortOrder === 1 ? order2 : nullSortOrder;
    }
    return finalSortOrder * result;
  },
  compare: function compare(value1, value2, comparator) {
    var order2 = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 1;
    var result = -1;
    var emptyValue1 = this.isEmpty(value1);
    var emptyValue2 = this.isEmpty(value2);
    if (emptyValue1 && emptyValue2) result = 0;
    else if (emptyValue1) result = order2;
    else if (emptyValue2) result = -order2;
    else if (typeof value1 === "string" && typeof value2 === "string") result = comparator(value1, value2);
    else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
    return result;
  },
  localeComparator: function localeComparator() {
    return new Intl.Collator(void 0, {
      numeric: true
    }).compare;
  },
  nestedKeys: function nestedKeys() {
    var _this = this;
    var obj = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var parentKey = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    return Object.entries(obj).reduce(function(o, _ref) {
      var _ref2 = _slicedToArray$4(_ref, 2), key = _ref2[0], value = _ref2[1];
      var currentKey = parentKey ? "".concat(parentKey, ".").concat(key) : key;
      _this.isObject(value) ? o = o.concat(_this.nestedKeys(value, currentKey)) : o.push(currentKey);
      return o;
    }, []);
  },
  stringify: function stringify(value) {
    var _this2 = this;
    var indent = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 2;
    var currentIndent = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
    var currentIndentStr = " ".repeat(currentIndent);
    var nextIndentStr = " ".repeat(currentIndent + indent);
    if (this.isArray(value)) {
      return "[" + value.map(function(v) {
        return _this2.stringify(v, indent, currentIndent + indent);
      }).join(", ") + "]";
    } else if (this.isDate(value)) {
      return value.toISOString();
    } else if (this.isFunction(value)) {
      return value.toString();
    } else if (this.isObject(value)) {
      return "{\n" + Object.entries(value).map(function(_ref3) {
        var _ref4 = _slicedToArray$4(_ref3, 2), k = _ref4[0], v = _ref4[1];
        return "".concat(nextIndentStr).concat(k, ": ").concat(_this2.stringify(v, indent, currentIndent + indent));
      }).join(",\n") + "\n".concat(currentIndentStr) + "}";
    } else {
      return JSON.stringify(value);
    }
  }
};
function _typeof$8(o) {
  "@babel/helpers - typeof";
  return _typeof$8 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$8(o);
}
function _toConsumableArray$1(arr) {
  return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _unsupportedIterableToArray$1$1(arr) || _nonIterableSpread$1();
}
function _nonIterableSpread$1() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$1$1(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$1$1(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1$1(o, minLen);
}
function _iterableToArray$1(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles$1(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray$1$1(arr);
}
function _arrayLikeToArray$1$1(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey$7(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _defineProperty$7(obj, key, value) {
  key = _toPropertyKey$7(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$7(t) {
  var i = _toPrimitive$7(t, "string");
  return "symbol" == _typeof$8(i) ? i : String(i);
}
function _toPrimitive$7(t, r) {
  if ("object" != _typeof$8(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof$8(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var _default = /* @__PURE__ */ function() {
  function _default2(_ref) {
    var init = _ref.init, type = _ref.type;
    _classCallCheck(this, _default2);
    _defineProperty$7(this, "helpers", void 0);
    _defineProperty$7(this, "type", void 0);
    this.helpers = new Set(init);
    this.type = type;
  }
  _createClass(_default2, [{
    key: "add",
    value: function add(instance) {
      this.helpers.add(instance);
    }
  }, {
    key: "update",
    value: function update() {
    }
  }, {
    key: "delete",
    value: function _delete(instance) {
      this.helpers["delete"](instance);
    }
  }, {
    key: "clear",
    value: function clear() {
      this.helpers.clear();
    }
  }, {
    key: "get",
    value: function get(parentInstance, slots) {
      var children = this._get(parentInstance, slots);
      var computed2 = children ? this._recursive(_toConsumableArray$1(this.helpers), children) : null;
      return ObjectUtils.isNotEmpty(computed2) ? computed2 : null;
    }
  }, {
    key: "_isMatched",
    value: function _isMatched(instance, key) {
      var _parent$vnode;
      var parent = instance === null || instance === void 0 ? void 0 : instance.parent;
      return (parent === null || parent === void 0 || (_parent$vnode = parent.vnode) === null || _parent$vnode === void 0 ? void 0 : _parent$vnode.key) === key || parent && this._isMatched(parent, key) || false;
    }
  }, {
    key: "_get",
    value: function _get(parentInstance, slots) {
      var _ref2, _ref2$default;
      return ((_ref2 = slots || (parentInstance === null || parentInstance === void 0 ? void 0 : parentInstance.$slots)) === null || _ref2 === void 0 || (_ref2$default = _ref2["default"]) === null || _ref2$default === void 0 ? void 0 : _ref2$default.call(_ref2)) || null;
    }
  }, {
    key: "_recursive",
    value: function _recursive() {
      var _this = this;
      var helpers = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
      var children = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
      var components = [];
      children.forEach(function(child) {
        if (child.children instanceof Array) {
          components = components.concat(_this._recursive(components, child.children));
        } else if (child.type.name === _this.type) {
          components.push(child);
        } else if (ObjectUtils.isNotEmpty(child.key)) {
          components = components.concat(helpers.filter(function(c) {
            return _this._isMatched(c, child.key);
          }).map(function(c) {
            return c.vnode;
          }));
        }
      });
      return components;
    }
  }]);
  return _default2;
}();
var lastId = 0;
function UniqueComponentId() {
  var prefix = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "pv_id_";
  lastId++;
  return "".concat(prefix).concat(lastId);
}
function _toConsumableArray$4(arr) {
  return _arrayWithoutHoles$4(arr) || _iterableToArray$4(arr) || _unsupportedIterableToArray$6(arr) || _nonIterableSpread$4();
}
function _nonIterableSpread$4() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$6(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$6(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$6(o, minLen);
}
function _iterableToArray$4(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles$4(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray$6(arr);
}
function _arrayLikeToArray$6(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function handler() {
  var zIndexes = [];
  var generateZIndex = function generateZIndex2(key, autoZIndex) {
    var baseZIndex = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 999;
    var lastZIndex = getLastZIndex(key, autoZIndex, baseZIndex);
    var newZIndex = lastZIndex.value + (lastZIndex.key === key ? 0 : baseZIndex) + 1;
    zIndexes.push({
      key,
      value: newZIndex
    });
    return newZIndex;
  };
  var revertZIndex = function revertZIndex2(zIndex) {
    zIndexes = zIndexes.filter(function(obj) {
      return obj.value !== zIndex;
    });
  };
  var getCurrentZIndex = function getCurrentZIndex2(key, autoZIndex) {
    return getLastZIndex(key, autoZIndex).value;
  };
  var getLastZIndex = function getLastZIndex2(key, autoZIndex) {
    var baseZIndex = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
    return _toConsumableArray$4(zIndexes).reverse().find(function(obj) {
      return true;
    }) || {
      key,
      value: baseZIndex
    };
  };
  var getZIndex = function getZIndex2(el) {
    return el ? parseInt(el.style.zIndex, 10) || 0 : 0;
  };
  return {
    get: getZIndex,
    set: function set2(key, el, baseZIndex) {
      if (el) {
        el.style.zIndex = String(generateZIndex(key, true, baseZIndex));
      }
    },
    clear: function clear(el) {
      if (el) {
        revertZIndex(getZIndex(el));
        el.style.zIndex = "";
      }
    },
    getCurrent: function getCurrent(key) {
      return getCurrentZIndex(key, true);
    }
  };
}
var ZIndexUtils = handler();
var FilterMatchMode = {
  STARTS_WITH: "startsWith",
  CONTAINS: "contains",
  NOT_CONTAINS: "notContains",
  ENDS_WITH: "endsWith",
  EQUALS: "equals",
  NOT_EQUALS: "notEquals",
  IN: "in",
  LESS_THAN: "lt",
  LESS_THAN_OR_EQUAL_TO: "lte",
  GREATER_THAN: "gt",
  GREATER_THAN_OR_EQUAL_TO: "gte",
  BETWEEN: "between",
  DATE_IS: "dateIs",
  DATE_IS_NOT: "dateIsNot",
  DATE_BEFORE: "dateBefore",
  DATE_AFTER: "dateAfter"
};
var FilterOperator = {
  AND: "and",
  OR: "or"
};
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray$5(o)) || allowArrayLike) {
      if (it) o = it;
      var i = 0;
      var F = function F2() {
      };
      return { s: F, n: function n() {
        if (i >= o.length) return { done: true };
        return { done: false, value: o[i++] };
      }, e: function e(_e) {
        throw _e;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return { s: function s() {
    it = it.call(o);
  }, n: function n() {
    var step = it.next();
    normalCompletion = step.done;
    return step;
  }, e: function e(_e2) {
    didErr = true;
    err = _e2;
  }, f: function f() {
    try {
      if (!normalCompletion && it["return"] != null) it["return"]();
    } finally {
      if (didErr) throw err;
    }
  } };
}
function _unsupportedIterableToArray$5(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$5(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$5(o, minLen);
}
function _arrayLikeToArray$5(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
var FilterService = {
  filter: function filter3(value, fields, filterValue, filterMatchMode, filterLocale) {
    var filteredItems = [];
    if (!value) {
      return filteredItems;
    }
    var _iterator = _createForOfIteratorHelper(value), _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var item = _step.value;
        if (typeof item === "string") {
          if (this.filters[filterMatchMode](item, filterValue, filterLocale)) {
            filteredItems.push(item);
            continue;
          }
        } else {
          var _iterator2 = _createForOfIteratorHelper(fields), _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
              var field = _step2.value;
              var fieldValue = ObjectUtils.resolveFieldData(item, field);
              if (this.filters[filterMatchMode](fieldValue, filterValue, filterLocale)) {
                filteredItems.push(item);
                break;
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return filteredItems;
  },
  filters: {
    startsWith: function startsWith(value, filter22, filterLocale) {
      if (filter22 === void 0 || filter22 === null || filter22 === "") {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      var filterValue = ObjectUtils.removeAccents(filter22.toString()).toLocaleLowerCase(filterLocale);
      var stringValue = ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
      return stringValue.slice(0, filterValue.length) === filterValue;
    },
    contains: function contains2(value, filter22, filterLocale) {
      if (filter22 === void 0 || filter22 === null || filter22 === "") {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      var filterValue = ObjectUtils.removeAccents(filter22.toString()).toLocaleLowerCase(filterLocale);
      var stringValue = ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
      return stringValue.indexOf(filterValue) !== -1;
    },
    notContains: function notContains(value, filter22, filterLocale) {
      if (filter22 === void 0 || filter22 === null || filter22 === "") {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      var filterValue = ObjectUtils.removeAccents(filter22.toString()).toLocaleLowerCase(filterLocale);
      var stringValue = ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
      return stringValue.indexOf(filterValue) === -1;
    },
    endsWith: function endsWith(value, filter22, filterLocale) {
      if (filter22 === void 0 || filter22 === null || filter22 === "") {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      var filterValue = ObjectUtils.removeAccents(filter22.toString()).toLocaleLowerCase(filterLocale);
      var stringValue = ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
      return stringValue.indexOf(filterValue, stringValue.length - filterValue.length) !== -1;
    },
    equals: function equals2(value, filter22, filterLocale) {
      if (filter22 === void 0 || filter22 === null || filter22 === "") {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime && filter22.getTime) return value.getTime() === filter22.getTime();
      else return ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale) == ObjectUtils.removeAccents(filter22.toString()).toLocaleLowerCase(filterLocale);
    },
    notEquals: function notEquals(value, filter22, filterLocale) {
      if (filter22 === void 0 || filter22 === null || filter22 === "") {
        return false;
      }
      if (value === void 0 || value === null) {
        return true;
      }
      if (value.getTime && filter22.getTime) return value.getTime() !== filter22.getTime();
      else return ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale) != ObjectUtils.removeAccents(filter22.toString()).toLocaleLowerCase(filterLocale);
    },
    "in": function _in(value, filter22) {
      if (filter22 === void 0 || filter22 === null || filter22.length === 0) {
        return true;
      }
      for (var i = 0; i < filter22.length; i++) {
        if (ObjectUtils.equals(value, filter22[i])) {
          return true;
        }
      }
      return false;
    },
    between: function between(value, filter22) {
      if (filter22 == null || filter22[0] == null || filter22[1] == null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime) return filter22[0].getTime() <= value.getTime() && value.getTime() <= filter22[1].getTime();
      else return filter22[0] <= value && value <= filter22[1];
    },
    lt: function lt(value, filter22) {
      if (filter22 === void 0 || filter22 === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime && filter22.getTime) return value.getTime() < filter22.getTime();
      else return value < filter22;
    },
    lte: function lte(value, filter22) {
      if (filter22 === void 0 || filter22 === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime && filter22.getTime) return value.getTime() <= filter22.getTime();
      else return value <= filter22;
    },
    gt: function gt(value, filter22) {
      if (filter22 === void 0 || filter22 === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime && filter22.getTime) return value.getTime() > filter22.getTime();
      else return value > filter22;
    },
    gte: function gte(value, filter22) {
      if (filter22 === void 0 || filter22 === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime && filter22.getTime) return value.getTime() >= filter22.getTime();
      else return value >= filter22;
    },
    dateIs: function dateIs(value, filter22) {
      if (filter22 === void 0 || filter22 === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      return value.toDateString() === filter22.toDateString();
    },
    dateIsNot: function dateIsNot(value, filter22) {
      if (filter22 === void 0 || filter22 === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      return value.toDateString() !== filter22.toDateString();
    },
    dateBefore: function dateBefore(value, filter22) {
      if (filter22 === void 0 || filter22 === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      return value.getTime() < filter22.getTime();
    },
    dateAfter: function dateAfter(value, filter22) {
      if (filter22 === void 0 || filter22 === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      return value.getTime() > filter22.getTime();
    }
  },
  register: function register(rule, fn) {
    this.filters[rule] = fn;
  }
};
function _typeof$7(o) {
  "@babel/helpers - typeof";
  return _typeof$7 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$7(o);
}
function ownKeys$6(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$6(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$6(Object(t), true).forEach(function(r2) {
      _defineProperty$6(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$6(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$6(obj, key, value) {
  key = _toPropertyKey$6(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$6(t) {
  var i = _toPrimitive$6(t, "string");
  return "symbol" == _typeof$7(i) ? i : String(i);
}
function _toPrimitive$6(t, r) {
  if ("object" != _typeof$7(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof$7(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var defaultOptions = {
  ripple: false,
  inputStyle: null,
  locale: {
    startsWith: "Starts with",
    contains: "Contains",
    notContains: "Not contains",
    endsWith: "Ends with",
    equals: "Equals",
    notEquals: "Not equals",
    noFilter: "No Filter",
    lt: "Less than",
    lte: "Less than or equal to",
    gt: "Greater than",
    gte: "Greater than or equal to",
    dateIs: "Date is",
    dateIsNot: "Date is not",
    dateBefore: "Date is before",
    dateAfter: "Date is after",
    clear: "Clear",
    apply: "Apply",
    matchAll: "Match All",
    matchAny: "Match Any",
    addRule: "Add Rule",
    removeRule: "Remove Rule",
    accept: "Yes",
    reject: "No",
    choose: "Choose",
    upload: "Upload",
    cancel: "Cancel",
    completed: "Completed",
    pending: "Pending",
    fileSizeTypes: ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    chooseYear: "Choose Year",
    chooseMonth: "Choose Month",
    chooseDate: "Choose Date",
    prevDecade: "Previous Decade",
    nextDecade: "Next Decade",
    prevYear: "Previous Year",
    nextYear: "Next Year",
    prevMonth: "Previous Month",
    nextMonth: "Next Month",
    prevHour: "Previous Hour",
    nextHour: "Next Hour",
    prevMinute: "Previous Minute",
    nextMinute: "Next Minute",
    prevSecond: "Previous Second",
    nextSecond: "Next Second",
    am: "am",
    pm: "pm",
    today: "Today",
    weekHeader: "Wk",
    firstDayOfWeek: 0,
    showMonthAfterYear: false,
    dateFormat: "mm/dd/yy",
    weak: "Weak",
    medium: "Medium",
    strong: "Strong",
    passwordPrompt: "Enter a password",
    emptyFilterMessage: "No results found",
    // @deprecated Use 'emptySearchMessage' option instead.
    searchMessage: "{0} results are available",
    selectionMessage: "{0} items selected",
    emptySelectionMessage: "No selected item",
    emptySearchMessage: "No results found",
    emptyMessage: "No available options",
    aria: {
      trueLabel: "True",
      falseLabel: "False",
      nullLabel: "Not Selected",
      star: "1 star",
      stars: "{star} stars",
      selectAll: "All items selected",
      unselectAll: "All items unselected",
      close: "Close",
      previous: "Previous",
      next: "Next",
      navigation: "Navigation",
      scrollTop: "Scroll Top",
      moveTop: "Move Top",
      moveUp: "Move Up",
      moveDown: "Move Down",
      moveBottom: "Move Bottom",
      moveToTarget: "Move to Target",
      moveToSource: "Move to Source",
      moveAllToTarget: "Move All to Target",
      moveAllToSource: "Move All to Source",
      pageLabel: "Page {page}",
      firstPageLabel: "First Page",
      lastPageLabel: "Last Page",
      nextPageLabel: "Next Page",
      prevPageLabel: "Previous Page",
      rowsPerPageLabel: "Rows per page",
      jumpToPageDropdownLabel: "Jump to Page Dropdown",
      jumpToPageInputLabel: "Jump to Page Input",
      selectRow: "Row Selected",
      unselectRow: "Row Unselected",
      expandRow: "Row Expanded",
      collapseRow: "Row Collapsed",
      showFilterMenu: "Show Filter Menu",
      hideFilterMenu: "Hide Filter Menu",
      filterOperator: "Filter Operator",
      filterConstraint: "Filter Constraint",
      editRow: "Row Edit",
      saveEdit: "Save Edit",
      cancelEdit: "Cancel Edit",
      listView: "List View",
      gridView: "Grid View",
      slide: "Slide",
      slideNumber: "{slideNumber}",
      zoomImage: "Zoom Image",
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      rotateRight: "Rotate Right",
      rotateLeft: "Rotate Left",
      listLabel: "Option List"
    }
  },
  filterMatchModeOptions: {
    text: [FilterMatchMode.STARTS_WITH, FilterMatchMode.CONTAINS, FilterMatchMode.NOT_CONTAINS, FilterMatchMode.ENDS_WITH, FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS],
    numeric: [FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS, FilterMatchMode.LESS_THAN, FilterMatchMode.LESS_THAN_OR_EQUAL_TO, FilterMatchMode.GREATER_THAN, FilterMatchMode.GREATER_THAN_OR_EQUAL_TO],
    date: [FilterMatchMode.DATE_IS, FilterMatchMode.DATE_IS_NOT, FilterMatchMode.DATE_BEFORE, FilterMatchMode.DATE_AFTER]
  },
  zIndex: {
    modal: 1100,
    overlay: 1e3,
    menu: 1e3,
    tooltip: 1100
  },
  pt: void 0,
  ptOptions: {
    mergeSections: true,
    mergeProps: false
  },
  unstyled: false,
  csp: {
    nonce: void 0
  }
};
var PrimeVueSymbol = Symbol();
function switchTheme(currentTheme, newTheme, linkElementId, callback) {
  if (currentTheme !== newTheme) {
    var linkElement = (void 0).getElementById(linkElementId);
    var cloneLinkElement = linkElement.cloneNode(true);
    var newThemeUrl = linkElement.getAttribute("href").replace(currentTheme, newTheme);
    cloneLinkElement.setAttribute("id", linkElementId + "-clone");
    cloneLinkElement.setAttribute("href", newThemeUrl);
    cloneLinkElement.addEventListener("load", function() {
      linkElement.remove();
      cloneLinkElement.setAttribute("id", linkElementId);
      if (callback) {
        callback();
      }
    });
    linkElement.parentNode && linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);
  }
}
var PrimeVue = {
  install: function install(app, options) {
    var configOptions = options ? _objectSpread$6(_objectSpread$6({}, defaultOptions), options) : _objectSpread$6({}, defaultOptions);
    var PrimeVue2 = {
      config: reactive(configOptions),
      changeTheme: switchTheme
    };
    app.config.globalProperties.$primevue = PrimeVue2;
    app.provide(PrimeVueSymbol, PrimeVue2);
  }
};
var ConfirmationEventBus = primebus();
var PrimeVueConfirmSymbol = Symbol();
var ConfirmationService = {
  install: function install2(app) {
    var ConfirmationService2 = {
      require: function require2(options) {
        ConfirmationEventBus.emit("confirm", options);
      },
      close: function close() {
        ConfirmationEventBus.emit("close");
      }
    };
    app.config.globalProperties.$confirm = ConfirmationService2;
    app.provide(PrimeVueConfirmSymbol, ConfirmationService2);
  }
};
var DynamicDialogEventBus = primebus();
var PrimeVueDialogSymbol = Symbol();
function useDialog() {
  var PrimeVueDialog = inject(PrimeVueDialogSymbol);
  if (!PrimeVueDialog) {
    throw new Error("No PrimeVue Dialog provided!");
  }
  return PrimeVueDialog;
}
var DialogService = {
  install: function install3(app) {
    var DialogService2 = {
      open: function open(content, options) {
        var instance = {
          content: content && markRaw(content),
          options: options || {},
          data: options && options.data,
          close: function close(params) {
            DynamicDialogEventBus.emit("close", {
              instance,
              params
            });
          }
        };
        DynamicDialogEventBus.emit("open", {
          instance
        });
        return instance;
      }
    };
    app.config.globalProperties.$dialog = DialogService2;
    app.provide(PrimeVueDialogSymbol, DialogService2);
  }
};
var ToastEventBus = primebus();
var PrimeVueToastSymbol = Symbol();
function useToast() {
  var PrimeVueToast = inject(PrimeVueToastSymbol);
  if (!PrimeVueToast) {
    throw new Error("No PrimeVue Toast provided!");
  }
  return PrimeVueToast;
}
var ToastService = {
  install: function install4(app) {
    var ToastService2 = {
      add: function add(message2) {
        ToastEventBus.emit("add", message2);
      },
      remove: function remove3(message2) {
        ToastEventBus.emit("remove", message2);
      },
      removeGroup: function removeGroup(group) {
        ToastEventBus.emit("remove-group", group);
      },
      removeAllGroups: function removeAllGroups() {
        ToastEventBus.emit("remove-all-groups");
      }
    };
    app.config.globalProperties.$toast = ToastService2;
    app.provide(PrimeVueToastSymbol, ToastService2);
  }
};
function _typeof$6(o) {
  "@babel/helpers - typeof";
  return _typeof$6 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$6(o);
}
function ownKeys$5(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$5(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$5(Object(t), true).forEach(function(r2) {
      _defineProperty$5(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$5(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$5(obj, key, value) {
  key = _toPropertyKey$5(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$5(t) {
  var i = _toPrimitive$5(t, "string");
  return "symbol" == _typeof$6(i) ? i : String(i);
}
function _toPrimitive$5(t, r) {
  if ("object" != _typeof$6(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof$6(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function tryOnMounted(fn) {
  var sync2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
  if (getCurrentInstance()) onMounted(fn);
  else if (sync2) fn();
  else nextTick(fn);
}
var _id = 0;
function useStyle(css2) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var isLoaded = ref(false);
  var cssRef = ref(css2);
  var styleRef = ref(null);
  var defaultDocument = DomHandler.isClient() ? (void 0).document : void 0;
  var _options$document = options.document, document = _options$document === void 0 ? defaultDocument : _options$document, _options$immediate = options.immediate, immediate = _options$immediate === void 0 ? true : _options$immediate, _options$manual = options.manual, manual = _options$manual === void 0 ? false : _options$manual, _options$name = options.name, name = _options$name === void 0 ? "style_".concat(++_id) : _options$name, _options$id = options.id, id = _options$id === void 0 ? void 0 : _options$id, _options$media = options.media, media = _options$media === void 0 ? void 0 : _options$media, _options$nonce = options.nonce, nonce = _options$nonce === void 0 ? void 0 : _options$nonce, _options$props = options.props, props = _options$props === void 0 ? {} : _options$props;
  var stop = function stop2() {
  };
  var load = function load2(_css) {
    var _props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (!document) return;
    var _styleProps = _objectSpread$5(_objectSpread$5({}, props), _props);
    var _name = _styleProps.name || name, _id2 = _styleProps.id || id, _nonce = _styleProps.nonce || nonce;
    styleRef.value = document.querySelector('style[data-primevue-style-id="'.concat(_name, '"]')) || document.getElementById(_id2) || document.createElement("style");
    if (!styleRef.value.isConnected) {
      cssRef.value = _css || css2;
      DomHandler.setAttributes(styleRef.value, {
        type: "text/css",
        id: _id2,
        media,
        nonce: _nonce
      });
      document.head.appendChild(styleRef.value);
      DomHandler.setAttribute(styleRef.value, "data-primevue-style-id", name);
      DomHandler.setAttributes(styleRef.value, _styleProps);
    }
    if (isLoaded.value) return;
    stop = watch(cssRef, function(value) {
      styleRef.value.textContent = value;
    }, {
      immediate: true
    });
    isLoaded.value = true;
  };
  var unload = function unload2() {
    if (!document || !isLoaded.value) return;
    stop();
    DomHandler.isExist(styleRef.value) && document.head.removeChild(styleRef.value);
    isLoaded.value = false;
  };
  if (immediate && !manual) tryOnMounted(load);
  return {
    id,
    name,
    css: cssRef,
    unload,
    load,
    isLoaded: readonly(isLoaded)
  };
}
function _typeof$5(o) {
  "@babel/helpers - typeof";
  return _typeof$5 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$5(o);
}
function _slicedToArray$3(arr, i) {
  return _arrayWithHoles$3(arr) || _iterableToArrayLimit$3(arr, i) || _unsupportedIterableToArray$4(arr, i) || _nonIterableRest$3();
}
function _nonIterableRest$3() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$4(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$4(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$4(o, minLen);
}
function _arrayLikeToArray$4(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit$3(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$3(arr) {
  if (Array.isArray(arr)) return arr;
}
function ownKeys$4(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$4(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$4(Object(t), true).forEach(function(r2) {
      _defineProperty$4(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$4(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$4(obj, key, value) {
  key = _toPropertyKey$4(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$4(t) {
  var i = _toPrimitive$4(t, "string");
  return "symbol" == _typeof$5(i) ? i : String(i);
}
function _toPrimitive$4(t, r) {
  if ("object" != _typeof$5(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof$5(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var css = "\n.p-hidden-accessible {\n    border: 0;\n    clip: rect(0 0 0 0);\n    height: 1px;\n    margin: -1px;\n    overflow: hidden;\n    padding: 0;\n    position: absolute;\n    width: 1px;\n}\n\n.p-hidden-accessible input,\n.p-hidden-accessible select {\n    transform: scale(0);\n}\n\n.p-overflow-hidden {\n    overflow: hidden;\n    padding-right: var(--scrollbar-width);\n}\n";
var classes$3 = {};
var inlineStyles = {};
var BaseStyle = {
  name: "base",
  css,
  classes: classes$3,
  inlineStyles,
  loadStyle: function loadStyle() {
    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return this.css ? useStyle(this.css, _objectSpread$4({
      name: this.name
    }, options)) : {};
  },
  getStyleSheet: function getStyleSheet() {
    var extendedCSS = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    var props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.css) {
      var _props = Object.entries(props).reduce(function(acc, _ref) {
        var _ref2 = _slicedToArray$3(_ref, 2), k = _ref2[0], v = _ref2[1];
        return acc.push("".concat(k, '="').concat(v, '"')) && acc;
      }, []).join(" ");
      return '<style type="text/css" data-primevue-style-id="'.concat(this.name, '" ').concat(_props, ">").concat(this.css).concat(extendedCSS, "</style>");
    }
    return "";
  },
  extend: function extend(style) {
    return _objectSpread$4(_objectSpread$4({}, this), {}, {
      css: void 0
    }, style);
  }
};
var classes$2 = {
  root: "p-badge p-component"
};
var BadgeDirectiveStyle = BaseStyle.extend({
  name: "badge",
  classes: classes$2
});
function _typeof$4(o) {
  "@babel/helpers - typeof";
  return _typeof$4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$4(o);
}
function _slicedToArray$2(arr, i) {
  return _arrayWithHoles$2(arr) || _iterableToArrayLimit$2(arr, i) || _unsupportedIterableToArray$3(arr, i) || _nonIterableRest$2();
}
function _nonIterableRest$2() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$3(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$3(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen);
}
function _arrayLikeToArray$3(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit$2(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$2(arr) {
  if (Array.isArray(arr)) return arr;
}
function ownKeys$3(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$3(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$3(Object(t), true).forEach(function(r2) {
      _defineProperty$3(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$3(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$3(obj, key, value) {
  key = _toPropertyKey$3(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$3(t) {
  var i = _toPrimitive$3(t, "string");
  return "symbol" == _typeof$4(i) ? i : String(i);
}
function _toPrimitive$3(t, r) {
  if ("object" != _typeof$4(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof$4(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var BaseDirective = {
  _getMeta: function _getMeta() {
    return [ObjectUtils.isObject(arguments.length <= 0 ? void 0 : arguments[0]) ? void 0 : arguments.length <= 0 ? void 0 : arguments[0], ObjectUtils.getItemValue(ObjectUtils.isObject(arguments.length <= 0 ? void 0 : arguments[0]) ? arguments.length <= 0 ? void 0 : arguments[0] : arguments.length <= 1 ? void 0 : arguments[1])];
  },
  _getConfig: function _getConfig(binding, vnode) {
    var _ref, _binding$instance, _vnode$ctx;
    return (_ref = (binding === null || binding === void 0 || (_binding$instance = binding.instance) === null || _binding$instance === void 0 ? void 0 : _binding$instance.$primevue) || (vnode === null || vnode === void 0 || (_vnode$ctx = vnode.ctx) === null || _vnode$ctx === void 0 || (_vnode$ctx = _vnode$ctx.appContext) === null || _vnode$ctx === void 0 || (_vnode$ctx = _vnode$ctx.config) === null || _vnode$ctx === void 0 || (_vnode$ctx = _vnode$ctx.globalProperties) === null || _vnode$ctx === void 0 ? void 0 : _vnode$ctx.$primevue)) === null || _ref === void 0 ? void 0 : _ref.config;
  },
  _getOptionValue: function _getOptionValue(options) {
    var key = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    var params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    var fKeys = ObjectUtils.toFlatCase(key).split(".");
    var fKey = fKeys.shift();
    return fKey ? ObjectUtils.isObject(options) ? BaseDirective._getOptionValue(ObjectUtils.getItemValue(options[Object.keys(options).find(function(k) {
      return ObjectUtils.toFlatCase(k) === fKey;
    }) || ""], params), fKeys.join("."), params) : void 0 : ObjectUtils.getItemValue(options, params);
  },
  _getPTValue: function _getPTValue() {
    var _instance$binding, _instance$$config;
    var instance = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var obj = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var key = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "";
    var params = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    var searchInDefaultPT = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : true;
    var getValue = function getValue2() {
      var value = BaseDirective._getOptionValue.apply(BaseDirective, arguments);
      return ObjectUtils.isString(value) || ObjectUtils.isArray(value) ? {
        "class": value
      } : value;
    };
    var _ref2 = ((_instance$binding = instance.binding) === null || _instance$binding === void 0 || (_instance$binding = _instance$binding.value) === null || _instance$binding === void 0 ? void 0 : _instance$binding.ptOptions) || ((_instance$$config = instance.$config) === null || _instance$$config === void 0 ? void 0 : _instance$$config.ptOptions) || {}, _ref2$mergeSections = _ref2.mergeSections, mergeSections = _ref2$mergeSections === void 0 ? true : _ref2$mergeSections, _ref2$mergeProps = _ref2.mergeProps, useMergeProps = _ref2$mergeProps === void 0 ? false : _ref2$mergeProps;
    var global2 = searchInDefaultPT ? BaseDirective._useDefaultPT(instance, instance.defaultPT(), getValue, key, params) : void 0;
    var self2 = BaseDirective._usePT(instance, BaseDirective._getPT(obj, instance.$name), getValue, key, _objectSpread$3(_objectSpread$3({}, params), {}, {
      global: global2 || {}
    }));
    var datasets = BaseDirective._getPTDatasets(instance, key);
    return mergeSections || !mergeSections && self2 ? useMergeProps ? BaseDirective._mergeProps(instance, useMergeProps, global2, self2, datasets) : _objectSpread$3(_objectSpread$3(_objectSpread$3({}, global2), self2), datasets) : _objectSpread$3(_objectSpread$3({}, self2), datasets);
  },
  _getPTDatasets: function _getPTDatasets() {
    var instance = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var key = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    var datasetPrefix = "data-pc-";
    return _objectSpread$3(_objectSpread$3({}, key === "root" && _defineProperty$3({}, "".concat(datasetPrefix, "name"), ObjectUtils.toFlatCase(instance.$name))), {}, _defineProperty$3({}, "".concat(datasetPrefix, "section"), ObjectUtils.toFlatCase(key)));
  },
  _getPT: function _getPT(pt) {
    var key = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    var callback = arguments.length > 2 ? arguments[2] : void 0;
    var getValue = function getValue2(value) {
      var _computedValue$_key;
      var computedValue = callback ? callback(value) : value;
      var _key = ObjectUtils.toFlatCase(key);
      return (_computedValue$_key = computedValue === null || computedValue === void 0 ? void 0 : computedValue[_key]) !== null && _computedValue$_key !== void 0 ? _computedValue$_key : computedValue;
    };
    return pt !== null && pt !== void 0 && pt.hasOwnProperty("_usept") ? {
      _usept: pt["_usept"],
      originalValue: getValue(pt.originalValue),
      value: getValue(pt.value)
    } : getValue(pt);
  },
  _usePT: function _usePT() {
    var instance = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var pt = arguments.length > 1 ? arguments[1] : void 0;
    var callback = arguments.length > 2 ? arguments[2] : void 0;
    var key = arguments.length > 3 ? arguments[3] : void 0;
    var params = arguments.length > 4 ? arguments[4] : void 0;
    var fn = function fn2(value2) {
      return callback(value2, key, params);
    };
    if (pt !== null && pt !== void 0 && pt.hasOwnProperty("_usept")) {
      var _instance$$config2;
      var _ref4 = pt["_usept"] || ((_instance$$config2 = instance.$config) === null || _instance$$config2 === void 0 ? void 0 : _instance$$config2.ptOptions) || {}, _ref4$mergeSections = _ref4.mergeSections, mergeSections = _ref4$mergeSections === void 0 ? true : _ref4$mergeSections, _ref4$mergeProps = _ref4.mergeProps, useMergeProps = _ref4$mergeProps === void 0 ? false : _ref4$mergeProps;
      var originalValue = fn(pt.originalValue);
      var value = fn(pt.value);
      if (originalValue === void 0 && value === void 0) return void 0;
      else if (ObjectUtils.isString(value)) return value;
      else if (ObjectUtils.isString(originalValue)) return originalValue;
      return mergeSections || !mergeSections && value ? useMergeProps ? BaseDirective._mergeProps(instance, useMergeProps, originalValue, value) : _objectSpread$3(_objectSpread$3({}, originalValue), value) : value;
    }
    return fn(pt);
  },
  _useDefaultPT: function _useDefaultPT() {
    var instance = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var defaultPT = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var callback = arguments.length > 2 ? arguments[2] : void 0;
    var key = arguments.length > 3 ? arguments[3] : void 0;
    var params = arguments.length > 4 ? arguments[4] : void 0;
    return BaseDirective._usePT(instance, defaultPT, callback, key, params);
  },
  _hook: function _hook(directiveName, hookName, el, binding, vnode, prevVnode) {
    var _binding$value, _config$pt;
    var name = "on".concat(ObjectUtils.toCapitalCase(hookName));
    var config = BaseDirective._getConfig(binding, vnode);
    var instance = el === null || el === void 0 ? void 0 : el.$instance;
    var selfHook = BaseDirective._usePT(instance, BaseDirective._getPT(binding === null || binding === void 0 || (_binding$value = binding.value) === null || _binding$value === void 0 ? void 0 : _binding$value.pt, directiveName), BaseDirective._getOptionValue, "hooks.".concat(name));
    var defaultHook = BaseDirective._useDefaultPT(instance, config === null || config === void 0 || (_config$pt = config.pt) === null || _config$pt === void 0 || (_config$pt = _config$pt.directives) === null || _config$pt === void 0 ? void 0 : _config$pt[directiveName], BaseDirective._getOptionValue, "hooks.".concat(name));
    var options = {
      el,
      binding,
      vnode,
      prevVnode
    };
    selfHook === null || selfHook === void 0 || selfHook(instance, options);
    defaultHook === null || defaultHook === void 0 || defaultHook(instance, options);
  },
  _mergeProps: function _mergeProps() {
    var fn = arguments.length > 1 ? arguments[1] : void 0;
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key2 = 2; _key2 < _len; _key2++) {
      args[_key2 - 2] = arguments[_key2];
    }
    return ObjectUtils.isFunction(fn) ? fn.apply(void 0, args) : mergeProps.apply(void 0, args);
  },
  _extend: function _extend(name) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var handleHook = function handleHook2(hook, el, binding, vnode, prevVnode) {
      var _el$$instance$hook, _el$$instance7;
      el._$instances = el._$instances || {};
      var config = BaseDirective._getConfig(binding, vnode);
      var $prevInstance = el._$instances[name] || {};
      var $options = ObjectUtils.isEmpty($prevInstance) ? _objectSpread$3(_objectSpread$3({}, options), options === null || options === void 0 ? void 0 : options.methods) : {};
      el._$instances[name] = _objectSpread$3(_objectSpread$3({}, $prevInstance), {}, {
        /* new instance variables to pass in directive methods */
        $name: name,
        $host: el,
        $binding: binding,
        $modifiers: binding === null || binding === void 0 ? void 0 : binding.modifiers,
        $value: binding === null || binding === void 0 ? void 0 : binding.value,
        $el: $prevInstance["$el"] || el || void 0,
        $style: _objectSpread$3({
          classes: void 0,
          inlineStyles: void 0,
          loadStyle: function loadStyle2() {
          }
        }, options === null || options === void 0 ? void 0 : options.style),
        $config: config,
        /* computed instance variables */
        defaultPT: function defaultPT() {
          return BaseDirective._getPT(config === null || config === void 0 ? void 0 : config.pt, void 0, function(value) {
            var _value$directives;
            return value === null || value === void 0 || (_value$directives = value.directives) === null || _value$directives === void 0 ? void 0 : _value$directives[name];
          });
        },
        isUnstyled: function isUnstyled() {
          var _el$$instance, _el$$instance2;
          return ((_el$$instance = el.$instance) === null || _el$$instance === void 0 || (_el$$instance = _el$$instance.$binding) === null || _el$$instance === void 0 || (_el$$instance = _el$$instance.value) === null || _el$$instance === void 0 ? void 0 : _el$$instance.unstyled) !== void 0 ? (_el$$instance2 = el.$instance) === null || _el$$instance2 === void 0 || (_el$$instance2 = _el$$instance2.$binding) === null || _el$$instance2 === void 0 || (_el$$instance2 = _el$$instance2.value) === null || _el$$instance2 === void 0 ? void 0 : _el$$instance2.unstyled : config === null || config === void 0 ? void 0 : config.unstyled;
        },
        /* instance's methods */
        ptm: function ptm() {
          var _el$$instance3;
          var key = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
          var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          return BaseDirective._getPTValue(el.$instance, (_el$$instance3 = el.$instance) === null || _el$$instance3 === void 0 || (_el$$instance3 = _el$$instance3.$binding) === null || _el$$instance3 === void 0 || (_el$$instance3 = _el$$instance3.value) === null || _el$$instance3 === void 0 ? void 0 : _el$$instance3.pt, key, _objectSpread$3({}, params));
        },
        ptmo: function ptmo() {
          var obj = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
          var key = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
          var params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
          return BaseDirective._getPTValue(el.$instance, obj, key, params, false);
        },
        cx: function cx() {
          var _el$$instance4, _el$$instance5;
          var key = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
          var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          return !((_el$$instance4 = el.$instance) !== null && _el$$instance4 !== void 0 && _el$$instance4.isUnstyled()) ? BaseDirective._getOptionValue((_el$$instance5 = el.$instance) === null || _el$$instance5 === void 0 || (_el$$instance5 = _el$$instance5.$style) === null || _el$$instance5 === void 0 ? void 0 : _el$$instance5.classes, key, _objectSpread$3({}, params)) : void 0;
        },
        sx: function sx() {
          var _el$$instance6;
          var key = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
          var when = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
          var params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
          return when ? BaseDirective._getOptionValue((_el$$instance6 = el.$instance) === null || _el$$instance6 === void 0 || (_el$$instance6 = _el$$instance6.$style) === null || _el$$instance6 === void 0 ? void 0 : _el$$instance6.inlineStyles, key, _objectSpread$3({}, params)) : void 0;
        }
      }, $options);
      el.$instance = el._$instances[name];
      (_el$$instance$hook = (_el$$instance7 = el.$instance)[hook]) === null || _el$$instance$hook === void 0 || _el$$instance$hook.call(_el$$instance7, el, binding, vnode, prevVnode);
      el["$".concat(name)] = el.$instance;
      BaseDirective._hook(name, hook, el, binding, vnode, prevVnode);
    };
    return {
      created: function created2(el, binding, vnode, prevVnode) {
        handleHook("created", el, binding, vnode, prevVnode);
      },
      beforeMount: function beforeMount2(el, binding, vnode, prevVnode) {
        var _config$csp, _el$$instance8, _el$$instance9, _config$csp2;
        var config = BaseDirective._getConfig(binding, vnode);
        BaseStyle.loadStyle({
          nonce: config === null || config === void 0 || (_config$csp = config.csp) === null || _config$csp === void 0 ? void 0 : _config$csp.nonce
        });
        !((_el$$instance8 = el.$instance) !== null && _el$$instance8 !== void 0 && _el$$instance8.isUnstyled()) && ((_el$$instance9 = el.$instance) === null || _el$$instance9 === void 0 || (_el$$instance9 = _el$$instance9.$style) === null || _el$$instance9 === void 0 ? void 0 : _el$$instance9.loadStyle({
          nonce: config === null || config === void 0 || (_config$csp2 = config.csp) === null || _config$csp2 === void 0 ? void 0 : _config$csp2.nonce
        }));
        handleHook("beforeMount", el, binding, vnode, prevVnode);
      },
      mounted: function mounted6(el, binding, vnode, prevVnode) {
        var _config$csp3, _el$$instance10, _el$$instance11, _config$csp4;
        var config = BaseDirective._getConfig(binding, vnode);
        BaseStyle.loadStyle({
          nonce: config === null || config === void 0 || (_config$csp3 = config.csp) === null || _config$csp3 === void 0 ? void 0 : _config$csp3.nonce
        });
        !((_el$$instance10 = el.$instance) !== null && _el$$instance10 !== void 0 && _el$$instance10.isUnstyled()) && ((_el$$instance11 = el.$instance) === null || _el$$instance11 === void 0 || (_el$$instance11 = _el$$instance11.$style) === null || _el$$instance11 === void 0 ? void 0 : _el$$instance11.loadStyle({
          nonce: config === null || config === void 0 || (_config$csp4 = config.csp) === null || _config$csp4 === void 0 ? void 0 : _config$csp4.nonce
        }));
        handleHook("mounted", el, binding, vnode, prevVnode);
      },
      beforeUpdate: function beforeUpdate(el, binding, vnode, prevVnode) {
        handleHook("beforeUpdate", el, binding, vnode, prevVnode);
      },
      updated: function updated4(el, binding, vnode, prevVnode) {
        handleHook("updated", el, binding, vnode, prevVnode);
      },
      beforeUnmount: function beforeUnmount(el, binding, vnode, prevVnode) {
        handleHook("beforeUnmount", el, binding, vnode, prevVnode);
      },
      unmounted: function unmounted6(el, binding, vnode, prevVnode) {
        handleHook("unmounted", el, binding, vnode, prevVnode);
      }
    };
  },
  extend: function extend2() {
    var _BaseDirective$_getMe = BaseDirective._getMeta.apply(BaseDirective, arguments), _BaseDirective$_getMe2 = _slicedToArray$2(_BaseDirective$_getMe, 2), name = _BaseDirective$_getMe2[0], options = _BaseDirective$_getMe2[1];
    return _objectSpread$3({
      extend: function extend3() {
        var _BaseDirective$_getMe3 = BaseDirective._getMeta.apply(BaseDirective, arguments), _BaseDirective$_getMe4 = _slicedToArray$2(_BaseDirective$_getMe3, 2), _name = _BaseDirective$_getMe4[0], _options = _BaseDirective$_getMe4[1];
        return BaseDirective.extend(_name, _objectSpread$3(_objectSpread$3(_objectSpread$3({}, options), options === null || options === void 0 ? void 0 : options.methods), _options));
      }
    }, BaseDirective._extend(name, options));
  }
};
var BaseBadgeDirective = BaseDirective.extend({
  style: BadgeDirectiveStyle
});
function _typeof$3(o) {
  "@babel/helpers - typeof";
  return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$3(o);
}
function ownKeys$2(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$2(Object(t), true).forEach(function(r2) {
      _defineProperty$2(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$2(obj, key, value) {
  key = _toPropertyKey$2(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$2(t) {
  var i = _toPrimitive$2(t, "string");
  return "symbol" == _typeof$3(i) ? i : String(i);
}
function _toPrimitive$2(t, r) {
  if ("object" != _typeof$3(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof$3(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var BadgeDirective = BaseBadgeDirective.extend("badge", {
  mounted: function mounted(el, binding) {
    var id = UniqueComponentId() + "_badge";
    var badge2 = DomHandler.createElement("span", {
      id,
      "class": !this.isUnstyled() && this.cx("root"),
      "p-bind": this.ptm("root", {
        context: _objectSpread$2(_objectSpread$2({}, binding.modifiers), {}, {
          nogutter: String(binding.value).length === 1,
          dot: binding.value == null
        })
      })
    });
    el.$_pbadgeId = badge2.getAttribute("id");
    for (var modifier in binding.modifiers) {
      !this.isUnstyled() && DomHandler.addClass(badge2, "p-badge-" + modifier);
    }
    if (binding.value != null) {
      if (_typeof$3(binding.value) === "object") el.$_badgeValue = binding.value.value;
      else el.$_badgeValue = binding.value;
      badge2.appendChild((void 0).createTextNode(el.$_badgeValue));
      if (String(el.$_badgeValue).length === 1 && !this.isUnstyled()) {
        !this.isUnstyled() && DomHandler.addClass(badge2, "p-badge-no-gutter");
      }
    } else {
      !this.isUnstyled() && DomHandler.addClass(badge2, "p-badge-dot");
    }
    el.setAttribute("data-pd-badge", true);
    !this.isUnstyled() && DomHandler.addClass(el, "p-overlay-badge");
    el.setAttribute("data-p-overlay-badge", "true");
    el.appendChild(badge2);
    this.$el = badge2;
  },
  updated: function updated(el, binding) {
    !this.isUnstyled() && DomHandler.addClass(el, "p-overlay-badge");
    el.setAttribute("data-p-overlay-badge", "true");
    if (binding.oldValue !== binding.value) {
      var badge2 = (void 0).getElementById(el.$_pbadgeId);
      if (_typeof$3(binding.value) === "object") el.$_badgeValue = binding.value.value;
      else el.$_badgeValue = binding.value;
      if (!this.isUnstyled()) {
        if (el.$_badgeValue) {
          if (DomHandler.hasClass(badge2, "p-badge-dot")) DomHandler.removeClass(badge2, "p-badge-dot");
          if (el.$_badgeValue.length === 1) DomHandler.addClass(badge2, "p-badge-no-gutter");
          else DomHandler.removeClass(badge2, "p-badge-no-gutter");
        } else if (!el.$_badgeValue && !DomHandler.hasClass(badge2, "p-badge-dot")) {
          DomHandler.addClass(badge2, "p-badge-dot");
        }
      }
      badge2.innerHTML = "";
      badge2.appendChild((void 0).createTextNode(el.$_badgeValue));
    }
  }
});
var classes$1 = {
  root: "p-tooltip p-component",
  arrow: "p-tooltip-arrow",
  text: "p-tooltip-text"
};
var TooltipStyle = BaseStyle.extend({
  name: "tooltip",
  classes: classes$1
});
var BaseTooltip = BaseDirective.extend({
  style: TooltipStyle
});
function _slicedToArray$1(arr, i) {
  return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest$1();
}
function _nonIterableRest$1() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$2(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$2(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen);
}
function _arrayLikeToArray$2(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit$1(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$1(arr) {
  if (Array.isArray(arr)) return arr;
}
function _typeof$2(o) {
  "@babel/helpers - typeof";
  return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$2(o);
}
var Tooltip = BaseTooltip.extend("tooltip", {
  beforeMount: function beforeMount(el, options) {
    var _options$instance$$pr;
    var target = this.getTarget(el);
    target.$_ptooltipModifiers = this.getModifiers(options);
    if (!options.value) return;
    else if (typeof options.value === "string") {
      target.$_ptooltipValue = options.value;
      target.$_ptooltipDisabled = false;
      target.$_ptooltipEscape = true;
      target.$_ptooltipClass = null;
      target.$_ptooltipFitContent = true;
      target.$_ptooltipIdAttr = UniqueComponentId() + "_tooltip";
      target.$_ptooltipShowDelay = 0;
      target.$_ptooltipHideDelay = 0;
      target.$_ptooltipAutoHide = true;
    } else if (_typeof$2(options.value) === "object" && options.value) {
      if (ObjectUtils.isEmpty(options.value.value) || options.value.value.trim() === "") return;
      else {
        target.$_ptooltipValue = options.value.value;
        target.$_ptooltipDisabled = !!options.value.disabled === options.value.disabled ? options.value.disabled : false;
        target.$_ptooltipEscape = !!options.value.escape === options.value.escape ? options.value.escape : true;
        target.$_ptooltipClass = options.value["class"] || "";
        target.$_ptooltipFitContent = !!options.value.fitContent === options.value.fitContent ? options.value.fitContent : true;
        target.$_ptooltipIdAttr = options.value.id || UniqueComponentId() + "_tooltip";
        target.$_ptooltipShowDelay = options.value.showDelay || 0;
        target.$_ptooltipHideDelay = options.value.hideDelay || 0;
        target.$_ptooltipAutoHide = !!options.value.autoHide === options.value.autoHide ? options.value.autoHide : true;
      }
    }
    target.$_ptooltipZIndex = (_options$instance$$pr = options.instance.$primevue) === null || _options$instance$$pr === void 0 || (_options$instance$$pr = _options$instance$$pr.config) === null || _options$instance$$pr === void 0 || (_options$instance$$pr = _options$instance$$pr.zIndex) === null || _options$instance$$pr === void 0 ? void 0 : _options$instance$$pr.tooltip;
    this.bindEvents(target, options);
    el.setAttribute("data-pd-tooltip", true);
  },
  updated: function updated2(el, options) {
    var target = this.getTarget(el);
    target.$_ptooltipModifiers = this.getModifiers(options);
    this.unbindEvents(target);
    if (!options.value) {
      return;
    }
    if (typeof options.value === "string") {
      target.$_ptooltipValue = options.value;
      target.$_ptooltipDisabled = false;
      target.$_ptooltipEscape = true;
      target.$_ptooltipClass = null;
      target.$_ptooltipIdAttr = target.$_ptooltipIdAttr || UniqueComponentId() + "_tooltip";
      target.$_ptooltipShowDelay = 0;
      target.$_ptooltipHideDelay = 0;
      target.$_ptooltipAutoHide = true;
      this.bindEvents(target, options);
    } else if (_typeof$2(options.value) === "object" && options.value) {
      if (ObjectUtils.isEmpty(options.value.value) || options.value.value.trim() === "") {
        this.unbindEvents(target, options);
        return;
      } else {
        target.$_ptooltipValue = options.value.value;
        target.$_ptooltipDisabled = !!options.value.disabled === options.value.disabled ? options.value.disabled : false;
        target.$_ptooltipEscape = !!options.value.escape === options.value.escape ? options.value.escape : true;
        target.$_ptooltipClass = options.value["class"] || "";
        target.$_ptooltipFitContent = !!options.value.fitContent === options.value.fitContent ? options.value.fitContent : true;
        target.$_ptooltipIdAttr = options.value.id || target.$_ptooltipIdAttr || UniqueComponentId() + "_tooltip";
        target.$_ptooltipShowDelay = options.value.showDelay || 0;
        target.$_ptooltipHideDelay = options.value.hideDelay || 0;
        target.$_ptooltipAutoHide = !!options.value.autoHide === options.value.autoHide ? options.value.autoHide : true;
        this.bindEvents(target, options);
      }
    }
  },
  unmounted: function unmounted(el, options) {
    var target = this.getTarget(el);
    this.remove(target);
    this.unbindEvents(target, options);
    if (target.$_ptooltipScrollHandler) {
      target.$_ptooltipScrollHandler.destroy();
      target.$_ptooltipScrollHandler = null;
    }
  },
  timer: void 0,
  methods: {
    bindEvents: function bindEvents(el, options) {
      var _this = this;
      var modifiers = el.$_ptooltipModifiers;
      if (modifiers.focus) {
        el.$_focusevent = function(event) {
          return _this.onFocus(event, options);
        };
        el.addEventListener("focus", el.$_focusevent);
        el.addEventListener("blur", this.onBlur.bind(this));
      } else {
        el.$_mouseenterevent = function(event) {
          return _this.onMouseEnter(event, options);
        };
        el.addEventListener("mouseenter", el.$_mouseenterevent);
        el.addEventListener("mouseleave", this.onMouseLeave.bind(this));
        el.addEventListener("click", this.onClick.bind(this));
      }
      el.addEventListener("keydown", this.onKeydown.bind(this));
    },
    unbindEvents: function unbindEvents(el) {
      var modifiers = el.$_ptooltipModifiers;
      if (modifiers.focus) {
        el.removeEventListener("focus", el.$_focusevent);
        el.$_focusevent = null;
        el.removeEventListener("blur", this.onBlur.bind(this));
      } else {
        el.removeEventListener("mouseenter", el.$_mouseenterevent);
        el.$_mouseenterevent = null;
        el.removeEventListener("mouseleave", this.onMouseLeave.bind(this));
        el.removeEventListener("click", this.onClick.bind(this));
      }
      el.removeEventListener("keydown", this.onKeydown.bind(this));
    },
    bindScrollListener: function bindScrollListener(el) {
      var _this2 = this;
      if (!el.$_ptooltipScrollHandler) {
        el.$_ptooltipScrollHandler = new ConnectedOverlayScrollHandler(el, function() {
          _this2.hide(el);
        });
      }
      el.$_ptooltipScrollHandler.bindScrollListener();
    },
    unbindScrollListener: function unbindScrollListener(el) {
      if (el.$_ptooltipScrollHandler) {
        el.$_ptooltipScrollHandler.unbindScrollListener();
      }
    },
    onMouseEnter: function onMouseEnter(event, options) {
      var el = event.currentTarget;
      var showDelay = el.$_ptooltipShowDelay;
      this.show(el, options, showDelay);
    },
    onMouseLeave: function onMouseLeave(event) {
      var el = event.currentTarget;
      var hideDelay = el.$_ptooltipHideDelay;
      var autoHide = el.$_ptooltipAutoHide;
      if (!autoHide) {
        var valid = DomHandler.getAttribute(event.target, "data-pc-name") === "tooltip" || DomHandler.getAttribute(event.target, "data-pc-section") === "arrow" || DomHandler.getAttribute(event.target, "data-pc-section") === "text" || DomHandler.getAttribute(event.relatedTarget, "data-pc-name") === "tooltip" || DomHandler.getAttribute(event.relatedTarget, "data-pc-section") === "arrow" || DomHandler.getAttribute(event.relatedTarget, "data-pc-section") === "text";
        !valid && this.hide(el, hideDelay);
      } else {
        this.hide(el, hideDelay);
      }
    },
    onFocus: function onFocus(event, options) {
      var el = event.currentTarget;
      var showDelay = el.$_ptooltipShowDelay;
      this.show(el, options, showDelay);
    },
    onBlur: function onBlur(event) {
      var el = event.currentTarget;
      var hideDelay = el.$_ptooltipHideDelay;
      this.hide(el, hideDelay);
    },
    onClick: function onClick(event) {
      var el = event.currentTarget;
      var hideDelay = el.$_ptooltipHideDelay;
      this.hide(el, hideDelay);
    },
    onKeydown: function onKeydown(event) {
      var el = event.currentTarget;
      var hideDelay = el.$_ptooltipHideDelay;
      event.code === "Escape" && this.hide(event.currentTarget, hideDelay);
    },
    tooltipActions: function tooltipActions(el, options) {
      if (el.$_ptooltipDisabled || !DomHandler.isExist(el)) {
        return;
      }
      var tooltipElement = this.create(el, options);
      this.align(el);
      !this.isUnstyled() && DomHandler.fadeIn(tooltipElement, 250);
      var $this = this;
      (void 0).addEventListener("resize", function onWindowResize() {
        if (!DomHandler.isTouchDevice()) {
          $this.hide(el);
        }
        (void 0).removeEventListener("resize", onWindowResize);
      });
      tooltipElement.addEventListener("mouseleave", function onTooltipLeave() {
        $this.hide(el);
        tooltipElement.removeEventListener("mouseleave", onTooltipLeave);
      });
      this.bindScrollListener(el);
      ZIndexUtils.set("tooltip", tooltipElement, el.$_ptooltipZIndex);
    },
    show: function show(el, options, showDelay) {
      var _this3 = this;
      if (showDelay !== void 0) {
        this.timer = setTimeout(function() {
          return _this3.tooltipActions(el, options);
        }, showDelay);
      } else {
        this.tooltipActions(el, options);
      }
    },
    tooltipRemoval: function tooltipRemoval(el) {
      this.remove(el);
      this.unbindScrollListener(el);
    },
    hide: function hide(el, hideDelay) {
      var _this4 = this;
      clearTimeout(this.timer);
      if (hideDelay !== void 0) {
        setTimeout(function() {
          return _this4.tooltipRemoval(el);
        }, hideDelay);
      } else {
        this.tooltipRemoval(el);
      }
    },
    getTooltipElement: function getTooltipElement(el) {
      return (void 0).getElementById(el.$_ptooltipId);
    },
    create: function create(el) {
      var modifiers = el.$_ptooltipModifiers;
      var tooltipArrow = DomHandler.createElement("div", {
        "class": !this.isUnstyled() && this.cx("arrow"),
        "p-bind": this.ptm("arrow", {
          context: modifiers
        })
      });
      var tooltipText = DomHandler.createElement("div", {
        "class": !this.isUnstyled() && this.cx("text"),
        "p-bind": this.ptm("text", {
          context: modifiers
        })
      });
      if (!el.$_ptooltipEscape) {
        tooltipText.innerHTML = el.$_ptooltipValue;
      } else {
        tooltipText.innerHTML = "";
        tooltipText.appendChild((void 0).createTextNode(el.$_ptooltipValue));
      }
      var container = DomHandler.createElement("div", {
        id: el.$_ptooltipIdAttr,
        role: "tooltip",
        style: {
          display: "inline-block",
          width: el.$_ptooltipFitContent ? "fit-content" : void 0,
          pointerEvents: !this.isUnstyled() && el.$_ptooltipAutoHide && "none"
        },
        "class": [!this.isUnstyled() && this.cx("root"), el.$_ptooltipClass],
        "p-bind": this.ptm("root", {
          context: modifiers
        })
      }, tooltipArrow, tooltipText);
      (void 0).body.appendChild(container);
      el.$_ptooltipId = container.id;
      this.$el = container;
      return container;
    },
    remove: function remove(el) {
      if (el) {
        var tooltipElement = this.getTooltipElement(el);
        if (tooltipElement && tooltipElement.parentElement) {
          ZIndexUtils.clear(tooltipElement);
          (void 0).body.removeChild(tooltipElement);
        }
        el.$_ptooltipId = null;
      }
    },
    align: function align(el) {
      var modifiers = el.$_ptooltipModifiers;
      if (modifiers.top) {
        this.alignTop(el);
        if (this.isOutOfBounds(el)) {
          this.alignBottom(el);
          if (this.isOutOfBounds(el)) {
            this.alignTop(el);
          }
        }
      } else if (modifiers.left) {
        this.alignLeft(el);
        if (this.isOutOfBounds(el)) {
          this.alignRight(el);
          if (this.isOutOfBounds(el)) {
            this.alignTop(el);
            if (this.isOutOfBounds(el)) {
              this.alignBottom(el);
              if (this.isOutOfBounds(el)) {
                this.alignLeft(el);
              }
            }
          }
        }
      } else if (modifiers.bottom) {
        this.alignBottom(el);
        if (this.isOutOfBounds(el)) {
          this.alignTop(el);
          if (this.isOutOfBounds(el)) {
            this.alignBottom(el);
          }
        }
      } else {
        this.alignRight(el);
        if (this.isOutOfBounds(el)) {
          this.alignLeft(el);
          if (this.isOutOfBounds(el)) {
            this.alignTop(el);
            if (this.isOutOfBounds(el)) {
              this.alignBottom(el);
              if (this.isOutOfBounds(el)) {
                this.alignRight(el);
              }
            }
          }
        }
      }
    },
    getHostOffset: function getHostOffset(el) {
      var offset = el.getBoundingClientRect();
      var targetLeft = offset.left + DomHandler.getWindowScrollLeft();
      var targetTop = offset.top + DomHandler.getWindowScrollTop();
      return {
        left: targetLeft,
        top: targetTop
      };
    },
    alignRight: function alignRight(el) {
      this.preAlign(el, "right");
      var tooltipElement = this.getTooltipElement(el);
      var hostOffset = this.getHostOffset(el);
      var left = hostOffset.left + DomHandler.getOuterWidth(el);
      var top = hostOffset.top + (DomHandler.getOuterHeight(el) - DomHandler.getOuterHeight(tooltipElement)) / 2;
      tooltipElement.style.left = left + "px";
      tooltipElement.style.top = top + "px";
    },
    alignLeft: function alignLeft(el) {
      this.preAlign(el, "left");
      var tooltipElement = this.getTooltipElement(el);
      var hostOffset = this.getHostOffset(el);
      var left = hostOffset.left - DomHandler.getOuterWidth(tooltipElement);
      var top = hostOffset.top + (DomHandler.getOuterHeight(el) - DomHandler.getOuterHeight(tooltipElement)) / 2;
      tooltipElement.style.left = left + "px";
      tooltipElement.style.top = top + "px";
    },
    alignTop: function alignTop(el) {
      this.preAlign(el, "top");
      var tooltipElement = this.getTooltipElement(el);
      var hostOffset = this.getHostOffset(el);
      var left = hostOffset.left + (DomHandler.getOuterWidth(el) - DomHandler.getOuterWidth(tooltipElement)) / 2;
      var top = hostOffset.top - DomHandler.getOuterHeight(tooltipElement);
      tooltipElement.style.left = left + "px";
      tooltipElement.style.top = top + "px";
    },
    alignBottom: function alignBottom(el) {
      this.preAlign(el, "bottom");
      var tooltipElement = this.getTooltipElement(el);
      var hostOffset = this.getHostOffset(el);
      var left = hostOffset.left + (DomHandler.getOuterWidth(el) - DomHandler.getOuterWidth(tooltipElement)) / 2;
      var top = hostOffset.top + DomHandler.getOuterHeight(el);
      tooltipElement.style.left = left + "px";
      tooltipElement.style.top = top + "px";
    },
    preAlign: function preAlign(el, position) {
      var tooltipElement = this.getTooltipElement(el);
      tooltipElement.style.left = "-999px";
      tooltipElement.style.top = "-999px";
      DomHandler.removeClass(tooltipElement, "p-tooltip-".concat(tooltipElement.$_ptooltipPosition));
      !this.isUnstyled() && DomHandler.addClass(tooltipElement, "p-tooltip-".concat(position));
      tooltipElement.$_ptooltipPosition = position;
      tooltipElement.setAttribute("data-p-position", position);
      var arrowElement = DomHandler.findSingle(tooltipElement, '[data-pc-section="arrow"]');
      arrowElement.style.top = position === "bottom" ? "0" : position === "right" || position === "left" || position !== "right" && position !== "left" && position !== "top" && position !== "bottom" ? "50%" : null;
      arrowElement.style.bottom = position === "top" ? "0" : null;
      arrowElement.style.left = position === "right" || position !== "right" && position !== "left" && position !== "top" && position !== "bottom" ? "0" : position === "top" || position === "bottom" ? "50%" : null;
      arrowElement.style.right = position === "left" ? "0" : null;
    },
    isOutOfBounds: function isOutOfBounds(el) {
      var tooltipElement = this.getTooltipElement(el);
      var offset = tooltipElement.getBoundingClientRect();
      var targetTop = offset.top;
      var targetLeft = offset.left;
      var width2 = DomHandler.getOuterWidth(tooltipElement);
      var height = DomHandler.getOuterHeight(tooltipElement);
      var viewport = DomHandler.getViewport();
      return targetLeft + width2 > viewport.width || targetLeft < 0 || targetTop < 0 || targetTop + height > viewport.height;
    },
    getTarget: function getTarget(el) {
      return DomHandler.hasClass(el, "p-inputwrapper") ? DomHandler.findSingle(el, "input") : el;
    },
    getModifiers: function getModifiers(options) {
      if (options.modifiers && Object.keys(options.modifiers).length) {
        return options.modifiers;
      }
      if (options.arg && _typeof$2(options.arg) === "object") {
        return Object.entries(options.arg).reduce(function(acc, _ref) {
          var _ref2 = _slicedToArray$1(_ref, 2), key = _ref2[0], val = _ref2[1];
          if (key === "event" || key === "position") acc[val] = true;
          return acc;
        }, {});
      }
      return {};
    }
  }
});
var classes = {
  root: "p-ink"
};
var RippleStyle = BaseStyle.extend({
  name: "ripple",
  classes
});
var BaseRipple = BaseDirective.extend({
  style: RippleStyle
});
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$1(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray$1(arr);
}
function _arrayLikeToArray$1(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
var Ripple = BaseRipple.extend("ripple", {
  mounted: function mounted2(el) {
    var _el$$instance;
    var config = el === null || el === void 0 || (_el$$instance = el.$instance) === null || _el$$instance === void 0 ? void 0 : _el$$instance.$config;
    if (config && config.ripple) {
      this.create(el);
      this.bindEvents(el);
      el.setAttribute("data-pd-ripple", true);
    }
  },
  unmounted: function unmounted2(el) {
    this.remove(el);
  },
  timeout: void 0,
  methods: {
    bindEvents: function bindEvents2(el) {
      el.addEventListener("mousedown", this.onMouseDown.bind(this));
    },
    unbindEvents: function unbindEvents2(el) {
      el.removeEventListener("mousedown", this.onMouseDown.bind(this));
    },
    create: function create2(el) {
      var ink = DomHandler.createElement("span", {
        role: "presentation",
        "aria-hidden": true,
        "data-p-ink": true,
        "data-p-ink-active": false,
        "class": !this.isUnstyled() && this.cx("root"),
        onAnimationEnd: this.onAnimationEnd.bind(this),
        "p-bind": this.ptm("root")
      });
      el.appendChild(ink);
      this.$el = ink;
    },
    remove: function remove2(el) {
      var ink = this.getInk(el);
      if (ink) {
        this.unbindEvents(el);
        ink.removeEventListener("animationend", this.onAnimationEnd);
        ink.remove();
      }
    },
    onMouseDown: function onMouseDown(event) {
      var _this = this;
      var target = event.currentTarget;
      var ink = this.getInk(target);
      if (!ink || getComputedStyle(ink, null).display === "none") {
        return;
      }
      !this.isUnstyled() && DomHandler.removeClass(ink, "p-ink-active");
      ink.setAttribute("data-p-ink-active", "false");
      if (!DomHandler.getHeight(ink) && !DomHandler.getWidth(ink)) {
        var d = Math.max(DomHandler.getOuterWidth(target), DomHandler.getOuterHeight(target));
        ink.style.height = d + "px";
        ink.style.width = d + "px";
      }
      var offset = DomHandler.getOffset(target);
      var x = event.pageX - offset.left + (void 0).body.scrollTop - DomHandler.getWidth(ink) / 2;
      var y = event.pageY - offset.top + (void 0).body.scrollLeft - DomHandler.getHeight(ink) / 2;
      ink.style.top = y + "px";
      ink.style.left = x + "px";
      !this.isUnstyled() && DomHandler.addClass(ink, "p-ink-active");
      ink.setAttribute("data-p-ink-active", "true");
      this.timeout = setTimeout(function() {
        if (ink) {
          !_this.isUnstyled() && DomHandler.removeClass(ink, "p-ink-active");
          ink.setAttribute("data-p-ink-active", "false");
        }
      }, 401);
    },
    onAnimationEnd: function onAnimationEnd(event) {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      !this.isUnstyled() && DomHandler.removeClass(event.currentTarget, "p-ink-active");
      event.currentTarget.setAttribute("data-p-ink-active", "false");
    },
    getInk: function getInk(el) {
      return el && el.children ? _toConsumableArray(el.children).find(function(child) {
        return DomHandler.getAttribute(child, "data-pc-name") === "ripple";
      }) : void 0;
    }
  }
});
var BaseStyleClass = BaseDirective.extend({});
var StyleClass = BaseStyleClass.extend("styleclass", {
  mounted: function mounted3(el, binding) {
    el.setAttribute("data-pd-styleclass", true);
    this.bind(el, binding);
  },
  unmounted: function unmounted3(el) {
    this.unbind(el);
  },
  methods: {
    bind: function bind(el, binding) {
      var _this = this;
      var target = this.resolveTarget(el, binding);
      this.$el = target;
      el.$_pstyleclass_clicklistener = function() {
        if (binding.value.toggleClass) {
          if (DomHandler.hasClass(target, binding.value.toggleClass)) DomHandler.removeClass(target, binding.value.toggleClass);
          else DomHandler.addClass(target, binding.value.toggleClass);
        } else {
          if (target.offsetParent === null) _this.enter(target, el, binding);
          else _this.leave(target, binding);
        }
      };
      el.addEventListener("click", el.$_pstyleclass_clicklistener);
    },
    unbind: function unbind(el) {
      if (el.$_pstyleclass_clicklistener) {
        el.removeEventListener("click", el.$_pstyleclass_clicklistener);
        el.$_pstyleclass_clicklistener = null;
      }
      this.unbindDocumentListener(el);
    },
    enter: function enter(target, el, binding) {
      if (binding.value.enterActiveClass) {
        if (!target.$_pstyleclass_animating) {
          target.$_pstyleclass_animating = true;
          if (binding.value.enterActiveClass === "slidedown") {
            target.style.height = "0px";
            DomHandler.removeClass(target, "hidden");
            target.style.maxHeight = target.scrollHeight + "px";
            DomHandler.addClass(target, "hidden");
            target.style.height = "";
          }
          DomHandler.addClass(target, binding.value.enterActiveClass);
          if (binding.value.enterClass) {
            DomHandler.removeClass(target, binding.value.enterClass);
          }
          if (binding.value.enterFromClass) {
            DomHandler.removeClass(target, binding.value.enterFromClass);
          }
          target.$p_styleclass_enterlistener = function() {
            DomHandler.removeClass(target, binding.value.enterActiveClass);
            if (binding.value.enterToClass) {
              DomHandler.addClass(target, binding.value.enterToClass);
            }
            target.removeEventListener("animationend", target.$p_styleclass_enterlistener);
            if (binding.value.enterActiveClass === "slidedown") {
              target.style.maxHeight = "";
            }
            target.$_pstyleclass_animating = false;
          };
          target.addEventListener("animationend", target.$p_styleclass_enterlistener);
        }
      } else {
        if (binding.value.enterClass) {
          DomHandler.removeClass(target, binding.value.enterClass);
        }
        if (binding.value.enterFromClass) {
          DomHandler.removeClass(target, binding.value.enterFromClass);
        }
        if (binding.value.enterToClass) {
          DomHandler.addClass(target, binding.value.enterToClass);
        }
      }
      if (binding.value.hideOnOutsideClick) {
        this.bindDocumentListener(target, el, binding);
      }
    },
    leave: function leave(target, binding) {
      if (binding.value.leaveActiveClass) {
        if (!target.$_pstyleclass_animating) {
          target.$_pstyleclass_animating = true;
          DomHandler.addClass(target, binding.value.leaveActiveClass);
          if (binding.value.leaveClass) {
            DomHandler.removeClass(target, binding.value.leaveClass);
          }
          if (binding.value.leaveFromClass) {
            DomHandler.removeClass(target, binding.value.leaveFromClass);
          }
          target.$p_styleclass_leavelistener = function() {
            DomHandler.removeClass(target, binding.value.leaveActiveClass);
            if (binding.value.leaveToClass) {
              DomHandler.addClass(target, binding.value.leaveToClass);
            }
            target.removeEventListener("animationend", target.$p_styleclass_leavelistener);
            target.$_pstyleclass_animating = false;
          };
          target.addEventListener("animationend", target.$p_styleclass_leavelistener);
        }
      } else {
        if (binding.value.leaveClass) {
          DomHandler.removeClass(target, binding.value.leaveClass);
        }
        if (binding.value.leaveFromClass) {
          DomHandler.removeClass(target, binding.value.leaveFromClass);
        }
        if (binding.value.leaveToClass) {
          DomHandler.addClass(target, binding.value.leaveToClass);
        }
      }
      if (binding.value.hideOnOutsideClick) {
        this.unbindDocumentListener(target);
      }
    },
    resolveTarget: function resolveTarget(el, binding) {
      switch (binding.value.selector) {
        case "@next":
          return el.nextElementSibling;
        case "@prev":
          return el.previousElementSibling;
        case "@parent":
          return el.parentElement;
        case "@grandparent":
          return el.parentElement.parentElement;
        default:
          return (void 0).querySelector(binding.value.selector);
      }
    },
    bindDocumentListener: function bindDocumentListener(target, el, binding) {
      var _this2 = this;
      if (!target.$p_styleclass_documentlistener) {
        target.$p_styleclass_documentlistener = function(event) {
          if (!_this2.isVisible(target) || getComputedStyle(target).getPropertyValue("position") === "static") {
            _this2.unbindDocumentListener(target);
          } else if (_this2.isOutsideClick(event, target, el)) {
            _this2.leave(target, binding);
          }
        };
        target.ownerDocument.addEventListener("click", target.$p_styleclass_documentlistener);
      }
    },
    unbindDocumentListener: function unbindDocumentListener(target) {
      if (target.$p_styleclass_documentlistener) {
        target.ownerDocument.removeEventListener("click", target.$p_styleclass_documentlistener);
        target.$p_styleclass_documentlistener = null;
      }
    },
    isVisible: function isVisible2(target) {
      return target.offsetParent !== null;
    },
    isOutsideClick: function isOutsideClick(event, target, el) {
      return !el.isSameNode(event.target) && !el.contains(event.target) && !target.contains(event.target);
    }
  }
});
var FocusTrapStyle = {};
var BaseFocusTrap = BaseDirective.extend({
  style: FocusTrapStyle
});
function _typeof$1(o) {
  "@babel/helpers - typeof";
  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$1(o);
}
function ownKeys$1(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$1(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$1(Object(t), true).forEach(function(r2) {
      _defineProperty$1(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$1(obj, key, value) {
  key = _toPropertyKey$1(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$1(t) {
  var i = _toPrimitive$1(t, "string");
  return "symbol" == _typeof$1(i) ? i : String(i);
}
function _toPrimitive$1(t, r) {
  if ("object" != _typeof$1(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof$1(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var FocusTrap = BaseFocusTrap.extend("focustrap", {
  mounted: function mounted4(el, binding) {
    var _ref = binding.value || {}, disabled = _ref.disabled;
    if (!disabled) {
      this.createHiddenFocusableElements(el, binding);
      this.bind(el, binding);
      this.autoElementFocus(el, binding);
    }
    el.setAttribute("data-pd-focustrap", true);
    this.$el = el;
  },
  updated: function updated3(el, binding) {
    var _ref2 = binding.value || {}, disabled = _ref2.disabled;
    disabled && this.unbind(el);
  },
  unmounted: function unmounted4(el) {
    this.unbind(el);
  },
  methods: {
    getComputedSelector: function getComputedSelector(selector) {
      return ':not(.p-hidden-focusable):not([data-p-hidden-focusable="true"])'.concat(selector !== null && selector !== void 0 ? selector : "");
    },
    bind: function bind2(el, binding) {
      var _this = this;
      var _ref3 = binding.value || {}, onFocusIn = _ref3.onFocusIn, onFocusOut = _ref3.onFocusOut;
      el.$_pfocustrap_mutationobserver = new MutationObserver(function(mutationList) {
        mutationList.forEach(function(mutation) {
          if (mutation.type === "childList" && !el.contains((void 0).activeElement)) {
            var findNextFocusableElement = function findNextFocusableElement2(_el) {
              var focusableElement = DomHandler.isFocusableElement(_el) ? DomHandler.isFocusableElement(_el, _this.getComputedSelector(el.$_pfocustrap_focusableselector)) ? _el : DomHandler.getFirstFocusableElement(el, _this.getComputedSelector(el.$_pfocustrap_focusableselector)) : DomHandler.getFirstFocusableElement(_el);
              return ObjectUtils.isNotEmpty(focusableElement) ? focusableElement : _el.nextSibling && findNextFocusableElement2(_el.nextSibling);
            };
            DomHandler.focus(findNextFocusableElement(mutation.nextSibling));
          }
        });
      });
      el.$_pfocustrap_mutationobserver.disconnect();
      el.$_pfocustrap_mutationobserver.observe(el, {
        childList: true
      });
      el.$_pfocustrap_focusinlistener = function(event) {
        return onFocusIn && onFocusIn(event);
      };
      el.$_pfocustrap_focusoutlistener = function(event) {
        return onFocusOut && onFocusOut(event);
      };
      el.addEventListener("focusin", el.$_pfocustrap_focusinlistener);
      el.addEventListener("focusout", el.$_pfocustrap_focusoutlistener);
    },
    unbind: function unbind2(el) {
      el.$_pfocustrap_mutationobserver && el.$_pfocustrap_mutationobserver.disconnect();
      el.$_pfocustrap_focusinlistener && el.removeEventListener("focusin", el.$_pfocustrap_focusinlistener) && (el.$_pfocustrap_focusinlistener = null);
      el.$_pfocustrap_focusoutlistener && el.removeEventListener("focusout", el.$_pfocustrap_focusoutlistener) && (el.$_pfocustrap_focusoutlistener = null);
    },
    autoFocus: function autoFocus(options) {
      this.autoElementFocus(this.$el, {
        value: _objectSpread$1(_objectSpread$1({}, options), {}, {
          autoFocus: true
        })
      });
    },
    autoElementFocus: function autoElementFocus(el, binding) {
      var _ref4 = binding.value || {}, _ref4$autoFocusSelect = _ref4.autoFocusSelector, autoFocusSelector = _ref4$autoFocusSelect === void 0 ? "" : _ref4$autoFocusSelect, _ref4$firstFocusableS = _ref4.firstFocusableSelector, firstFocusableSelector = _ref4$firstFocusableS === void 0 ? "" : _ref4$firstFocusableS, _ref4$autoFocus = _ref4.autoFocus, autoFocus2 = _ref4$autoFocus === void 0 ? false : _ref4$autoFocus;
      var focusableElement = DomHandler.getFirstFocusableElement(el, "[autofocus]".concat(this.getComputedSelector(autoFocusSelector)));
      autoFocus2 && !focusableElement && (focusableElement = DomHandler.getFirstFocusableElement(el, this.getComputedSelector(firstFocusableSelector)));
      DomHandler.focus(focusableElement);
    },
    onFirstHiddenElementFocus: function onFirstHiddenElementFocus(event) {
      var _this$$el;
      var currentTarget = event.currentTarget, relatedTarget = event.relatedTarget;
      var focusableElement = relatedTarget === currentTarget.$_pfocustrap_lasthiddenfocusableelement || !((_this$$el = this.$el) !== null && _this$$el !== void 0 && _this$$el.contains(relatedTarget)) ? DomHandler.getFirstFocusableElement(currentTarget.parentElement, this.getComputedSelector(currentTarget.$_pfocustrap_focusableselector)) : currentTarget.$_pfocustrap_lasthiddenfocusableelement;
      DomHandler.focus(focusableElement);
    },
    onLastHiddenElementFocus: function onLastHiddenElementFocus(event) {
      var _this$$el2;
      var currentTarget = event.currentTarget, relatedTarget = event.relatedTarget;
      var focusableElement = relatedTarget === currentTarget.$_pfocustrap_firsthiddenfocusableelement || !((_this$$el2 = this.$el) !== null && _this$$el2 !== void 0 && _this$$el2.contains(relatedTarget)) ? DomHandler.getLastFocusableElement(currentTarget.parentElement, this.getComputedSelector(currentTarget.$_pfocustrap_focusableselector)) : currentTarget.$_pfocustrap_firsthiddenfocusableelement;
      DomHandler.focus(focusableElement);
    },
    createHiddenFocusableElements: function createHiddenFocusableElements(el, binding) {
      var _this2 = this;
      var _ref5 = binding.value || {}, _ref5$tabIndex = _ref5.tabIndex, tabIndex = _ref5$tabIndex === void 0 ? 0 : _ref5$tabIndex, _ref5$firstFocusableS = _ref5.firstFocusableSelector, firstFocusableSelector = _ref5$firstFocusableS === void 0 ? "" : _ref5$firstFocusableS, _ref5$lastFocusableSe = _ref5.lastFocusableSelector, lastFocusableSelector = _ref5$lastFocusableSe === void 0 ? "" : _ref5$lastFocusableSe;
      var createFocusableElement = function createFocusableElement2(onFocus2) {
        return DomHandler.createElement("span", {
          "class": "p-hidden-accessible p-hidden-focusable",
          tabIndex,
          role: "presentation",
          "aria-hidden": true,
          "data-p-hidden-accessible": true,
          "data-p-hidden-focusable": true,
          onFocus: onFocus2 === null || onFocus2 === void 0 ? void 0 : onFocus2.bind(_this2)
        });
      };
      var firstFocusableElement = createFocusableElement(this.onFirstHiddenElementFocus);
      var lastFocusableElement = createFocusableElement(this.onLastHiddenElementFocus);
      firstFocusableElement.$_pfocustrap_lasthiddenfocusableelement = lastFocusableElement;
      firstFocusableElement.$_pfocustrap_focusableselector = firstFocusableSelector;
      firstFocusableElement.setAttribute("data-pc-section", "firstfocusableelement");
      lastFocusableElement.$_pfocustrap_firsthiddenfocusableelement = firstFocusableElement;
      lastFocusableElement.$_pfocustrap_focusableselector = lastFocusableSelector;
      lastFocusableElement.setAttribute("data-pc-section", "lastfocusableelement");
      el.prepend(firstFocusableElement);
      el.append(lastFocusableElement);
    }
  }
});
var BaseAnimateOnScroll = BaseDirective.extend({});
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : String(i);
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
var AnimateOnScroll = BaseAnimateOnScroll.extend("animateonscroll", {
  created: function created() {
    this.$value = this.$value || {};
    this.$el.style.opacity = this.$value.enterClass ? "0" : "";
  },
  mounted: function mounted5() {
    this.$el.setAttribute("data-pd-animateonscroll", true);
    this.bindIntersectionObserver();
  },
  unmounted: function unmounted5() {
    this.unbindAnimationEvents();
    this.unbindIntersectionObserver();
  },
  observer: void 0,
  resetObserver: void 0,
  isObserverActive: false,
  animationState: void 0,
  animationEndListener: void 0,
  methods: {
    bindAnimationEvents: function bindAnimationEvents() {
      var _this = this;
      if (!this.animationEndListener) {
        this.animationEndListener = function() {
          DomHandler.removeMultipleClasses(_this.$el, [_this.$value.enterClass, _this.$value.leaveClass]);
          !_this.$modifiers.once && _this.resetObserver.observe(_this.$el);
          _this.unbindAnimationEvents();
        };
        this.$el.addEventListener("animationend", this.animationEndListener);
      }
    },
    bindIntersectionObserver: function bindIntersectionObserver() {
      var _this2 = this;
      var _this$$value = this.$value, root = _this$$value.root, rootMargin = _this$$value.rootMargin, _this$$value$threshol = _this$$value.threshold, threshold = _this$$value$threshol === void 0 ? 0.5 : _this$$value$threshol;
      var options = {
        root,
        rootMargin,
        threshold
      };
      this.observer = new IntersectionObserver(function(_ref) {
        var _ref2 = _slicedToArray(_ref, 1), entry2 = _ref2[0];
        if (_this2.isObserverActive) {
          if (entry2.boundingClientRect.top > 0) {
            entry2.isIntersecting ? _this2.enter() : _this2.leave();
          }
        } else if (entry2.isIntersecting) {
          _this2.enter();
        }
        _this2.isObserverActive = true;
      }, options);
      setTimeout(function() {
        return _this2.observer.observe(_this2.$el);
      }, 0);
      this.resetObserver = new IntersectionObserver(function(_ref3) {
        var _ref4 = _slicedToArray(_ref3, 1), entry2 = _ref4[0];
        if (entry2.boundingClientRect.top > 0 && !entry2.isIntersecting) {
          _this2.$el.style.opacity = _this2.$value.enterClass ? "0" : "";
          DomHandler.removeMultipleClasses(_this2.$el, [_this2.$value.enterClass, _this2.$value.leaveClass]);
          _this2.resetObserver.unobserve(_this2.$el);
        }
        _this2.animationState = void 0;
      }, _objectSpread(_objectSpread({}, options), {}, {
        threshold: 0
      }));
    },
    enter: function enter2() {
      if (this.animationState !== "enter" && this.$value.enterClass) {
        this.$el.style.opacity = "";
        DomHandler.removeMultipleClasses(this.$el, this.$value.leaveClass);
        DomHandler.addMultipleClasses(this.$el, this.$value.enterClass);
        this.$modifiers.once && this.unbindIntersectionObserver(this.$el);
        this.bindAnimationEvents();
        this.animationState = "enter";
      }
    },
    leave: function leave2() {
      if (this.animationState !== "leave" && this.$value.leaveClass) {
        this.$el.style.opacity = this.$value.enterClass ? "0" : "";
        DomHandler.removeMultipleClasses(this.$el, this.$value.enterClass);
        DomHandler.addMultipleClasses(this.$el, this.$value.leaveClass);
        this.bindAnimationEvents();
        this.animationState = "leave";
      }
    },
    unbindAnimationEvents: function unbindAnimationEvents() {
      if (this.animationEndListener) {
        this.$el.removeEventListener("animationend", this.animationEndListener);
        this.animationEndListener = void 0;
      }
    },
    unbindIntersectionObserver: function unbindIntersectionObserver() {
      var _this$observer, _this$resetObserver;
      (_this$observer = this.observer) === null || _this$observer === void 0 || _this$observer.unobserve(this.$el);
      (_this$resetObserver = this.resetObserver) === null || _this$resetObserver === void 0 || _this$resetObserver.unobserve(this.$el);
      this.isObserverActive = false;
    }
  }
});
const accordion = {
  accordiontab: {
    header: ({ props }) => ({
      class: [
        // Sizing
        "pt-6 pb-0",
        "mt-6",
        // Shape
        "border-x-0 border-b-0",
        // Color
        "border border-surface-200",
        // State
        {
          "select-none pointer-events-none cursor-default opacity-60": props == null ? void 0 : props.disabled
        }
      ]
    }),
    headerAction: ({ context }) => ({
      class: [
        //Font
        "font-semibold",
        "leading-7",
        // Alignments
        "flex items-center justify-between flex-row-reverse",
        "relative",
        // Shape
        "rounded-md",
        // Color
        "bg-transparent",
        "text-surface-900",
        // States
        "focus:outline-none focus:outline-offset-0 focus-visible:ring-2 focus-visible:ring-primary-600 ring-inset",
        // Focus
        // Misc
        "cursor-pointer no-underline select-none"
      ]
    }),
    headerIcon: {
      class: "inline-block ml-2"
    },
    headerTitle: {
      class: "leading-7"
    },
    content: {
      class: [
        // Font
        "leading-7",
        // Spacing
        "pr-12 pt-2",
        // Color
        "text-surface-600"
      ]
    },
    transition: {
      enterFromClass: "max-h-0",
      enterActiveClass: "overflow-hidden transition-[max-height] duration-1000 ease-[cubic-bezier(0.42,0,0.58,1)]",
      enterToClass: "max-h-[1000px]",
      leaveFromClass: "max-h-[1000px]",
      leaveActiveClass: "overflow-hidden transition-[max-height] duration-[450ms] ease-[cubic-bezier(0,1,0,1)]",
      leaveToClass: "max-h-0"
    }
  }
};
const autocomplete = {
  root: ({ props }) => ({
    class: [
      "relative",
      // Flex
      "inline-flex",
      // Size
      { "w-full": props.multiple },
      // Color
      "text-surface-900 dark:text-surface-0",
      //States
      {
        "opacity-60 select-none pointer-events-none cursor-default": props.disabled
      }
    ]
  }),
  container: ({ props, state }) => ({
    class: [
      // Font
      "font-sans sm:text-sm leading-none",
      // Flex
      "flex items-center flex-wrap",
      "gap-1",
      // Spacing
      "m-0 list-none",
      "px-3 py-1",
      { "px-3 py-1.5": !props.multiple, "px-3 py-1": props.multiple },
      // Size
      "w-full",
      // Shape
      "appearance-none rounded-md",
      // Color
      "text-surface-900 dark:text-surface-0",
      "bg-surface-0 dark:bg-surface-900",
      "placeholder:text-surface-400 dark:placeholder:text-surface-500",
      "shadow-sm",
      // States
      "focus:outline-none focus:outline-offset-0",
      // States
      { "ring-1 ring-inset": !state.focused, "ring-2 ring-inset ring-primary-500 dark:ring-primary-400": state.focused },
      { "ring-surface-300 dark:ring-surface-600": !props.invalid && !state.focused },
      // Invalid State
      { "ring-red-500 dark:ring-red-400": props.invalid && !state.focused },
      // Transition
      "transition duration-200 ease-in-out",
      // Misc
      "cursor-text overflow-hidden"
    ]
  }),
  inputtoken: ({ props }) => ({
    class: [{ "py-1.5 px-0": !props.multiple, "p-0.5": props.multiple }, , "inline-flex flex-auto"]
  }),
  input: ({ props }) => ({
    class: [
      // Font
      "font-sans sm:text-sm leading-none",
      // Shape
      "appearance-none rounded-md",
      { "rounded-tr-none rounded-br-none": props.dropdown },
      { "outline-none shadow-none rounded-none": props.multiple },
      // Size
      { "w-full": props.multiple },
      // Spacing
      "m-0",
      { "py-1.5 px-3": !props.multiple, "p-0": props.multiple },
      // Colors
      "text-surface-700 dark:text-white/80",
      "border",
      {
        "bg-surface-0 dark:bg-surface-900": !props.multiple,
        "border-surface-300 dark:border-surface-700": !props.multiple && !props.invalid,
        "border-0 bg-transparent": props.multiple
      },
      // Invalid State
      { "border-red-500 dark:border-red-400": props.invalid },
      // States
      { "focus:outline-none focus:outline-offset-0 focus:ring-inset focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400": !props.multiple },
      // Transition
      "transition-colors duration-200"
    ]
  }),
  token: {
    class: [
      // Flexbox
      "inline-flex items-center",
      // Spacing
      "py-0.5 px-3",
      // Shape
      "rounded-[1.14rem]",
      // Colors
      "text-surface-700 dark:text-white/70",
      "bg-surface-200 dark:bg-surface-700"
    ]
  },
  label: {
    class: "leading-5"
  },
  removeTokenIcon: {
    class: [
      // Shape
      "rounded-md leading-6",
      // Spacing
      "ml-2",
      // Size
      "w-4 h-4",
      // Transition
      "transition duration-200 ease-in-out",
      // Misc
      "cursor-pointer"
    ]
  },
  dropdownbutton: {
    root: {
      class: [
        "relative text-sm leading-none",
        // Alignments
        "items-center inline-flex text-center align-bottom",
        // Shape
        "rounded-r-md",
        // Size
        "px-2.5 py-1.5",
        "-ml-px",
        // Colors
        "text-surface-600 dark:text-surface-100",
        "bg-surface-100 dark:bg-surface-800",
        "ring-1 ring-inset ring-surface-300 dark:ring-surface-700",
        // States
        "hover:bg-surface-200 dark:hover:bg-surface-700",
        "focus:outline-none focus:outline-offset-0 focus:ring-1",
        "focus:ring-primary-500 dark:focus:ring-primary-400"
      ]
    }
  },
  loadingicon: {
    class: ["text-sm leading-none text-surface-500 dark:text-surface-0/70", "absolute top-[50%] right-[0.5rem] -mt-2 animate-spin"]
  },
  panel: {
    class: [
      // Position
      "absolute top-0 left-0",
      "mt-2",
      // Shape
      "border-0",
      "rounded-md",
      "shadow-md",
      "max-h-[15rem]",
      "overflow-auto",
      // Color
      "bg-surface-0 dark:bg-surface-800",
      "text-surface-800 dark:text-white/80",
      "ring-1 ring-inset ring-surface-300 dark:ring-surface-700"
    ]
  },
  list: {
    class: "py-1 list-none m-0"
  },
  item: ({ context }) => ({
    class: [
      // Font
      "sm:text-sm",
      "leading-none",
      { "font-normal": !context.selected, "font-bold": context.selected },
      // Position
      "relative",
      // Shape
      "border-0",
      "rounded-none",
      // Spacing
      "m-0",
      "py-2 px-4",
      // Color
      { "text-surface-700 dark:text-white/80": !context.focused && !context.selected },
      { "bg-surface-200 dark:bg-surface-600/60 text-surface-700 dark:text-white/80": context.focused && !context.selected },
      { "bg-primary-500 dark:bg-primary-400 text-white dark:text-surface-700": context.focused && context.selected },
      { "bg-transparent text-surface-700 dark:text-white/80": !context.focused && context.selected },
      //States
      "hover:bg-primary-500 dark:hover:bg-primary-400 hover:text-white dark:hover:text-surface-700",
      // Misc
      "cursor-pointer",
      "overflow-hidden",
      "whitespace-nowrap"
    ]
  }),
  itemgroup: {
    class: [
      //Font
      "font-bold",
      "sm:text-sm",
      // Spacing
      "m-0",
      "py-2 px-4",
      // Color
      "text-surface-800 dark:text-white/80",
      "bg-surface-0 dark:bg-surface-600/80",
      // Misc
      "cursor-auto"
    ]
  },
  emptymessage: {
    class: [
      // Font
      "leading-none",
      "sm:text-sm",
      // Spacing
      "py-2 px-4",
      // Color
      "text-surface-800 dark:text-white/80",
      "bg-transparent"
    ]
  },
  transition: {
    enterFromClass: "opacity-0 scale-y-[0.8]",
    enterActiveClass: "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
    leaveActiveClass: "transition-opacity duration-100 ease-linear",
    leaveToClass: "opacity-0"
  }
};
const avatar = {
  root: ({ props, parent }) => {
    var _a, _b, _c;
    return {
      class: [
        // Font
        {
          "text-sm": props.size == null || props.size == "normal",
          "text-lg": props.size == "large",
          "text-xl": props.size == "xlarge"
        },
        // Alignments
        "inline-flex items-center justify-center",
        "shrink-0",
        "relative",
        // Sizes
        {
          "h-8 w-8": props.size == null || props.size == "normal",
          "w-12 h-12": props.size == "large",
          "w-16 h-16": props.size == "xlarge"
        },
        { "-ml-4": ((_a = parent.instance.$style) == null ? void 0 : _a.name) == "avatargroup" },
        // Shapes
        {
          "rounded-lg": props.shape == "square",
          "rounded-full": props.shape == "circle"
        },
        { "border-2": ((_b = parent.instance.$style) == null ? void 0 : _b.name) == "avatargroup" },
        // Colors
        "bg-surface-100",
        {
          "border-white": ((_c = parent.instance.$style) == null ? void 0 : _c.name) == "avatargroup"
        }
      ]
    };
  },
  image: ({ props }) => ({
    class: [
      "h-full w-full",
      {
        "rounded-lg": props.shape == "square",
        "rounded-full": props.shape == "circle"
      }
    ]
  })
};
const avatargroup = {
  root: {
    class: "flex items-center"
  }
};
const badge = {
  root: ({ props, context }) => ({
    class: [
      // Font
      "font-medium",
      {
        "text-xs leading-[1.5rem]": props.size == null,
        "text-lg leading-[2.25rem]": props.size == "large",
        "text-2xl leading-[3rem]": props.size == "xlarge"
      },
      // Alignment
      "text-center inline-block",
      // Size
      "p-0 px-1",
      {
        "min-w-[1.5rem] h-[1.5rem]": props.size == null,
        "min-w-[2.25rem] h-[2.25rem]": props.size == "large",
        "min-w-[3rem] h-[3rem]": props.size == "xlarge"
      },
      // Shape
      {
        "rounded-full": props.value.length == 1,
        "rounded-[0.71rem]": props.value.length !== 1
      },
      // Color
      "text-white",
      {
        "bg-primary-500": props.severity == null || props.severity == "primary",
        "bg-surface-500": props.severity == "secondary",
        "bg-green-500": props.severity == "success",
        "bg-blue-500": props.severity == "info",
        "bg-orange-500": props.severity == "warning",
        "bg-purple-500": props.severity == "help",
        "bg-red-500": props.severity == "danger"
      }
    ]
  })
};
const badgedirective = {
  root: ({ context }) => ({
    class: [
      // Font
      "font-medium",
      "text-xs leading-6 font-sans",
      // Alignment
      "flex items-center justify-center",
      "text-center",
      // Position
      "absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 origin-top-right",
      // Size
      "m-0",
      {
        "p-0": context.nogutter || context.dot,
        "p-1": !context.nogutter && !context.dot,
        "min-w-[0.5rem] h-2": context.dot,
        "min-w-[1rem] h-4": !context.dot
      },
      // Shape
      {
        "rounded-full": context.nogutter || context.dot,
        "rounded-[10px]": !context.nogutter && !context.dot
      },
      // Color
      "text-white",
      "ring-1 ring-white",
      {
        "bg-primary-500": !context.info && !context.success && !context.warning && !context.danger && !context.help && !context.secondary,
        "bg-surface-500": context.secondary,
        "bg-green-500": context.success,
        "bg-blue-500": context.info,
        "bg-orange-500": context.warning,
        "bg-purple-500": context.help,
        "bg-red-500": context.danger
      }
    ]
  })
};
const blockui = {
  root: {
    class: "relative"
  },
  mask: {
    class: "bg-surface-900/60 backdrop-blur-sm"
  }
};
const breadcrumb = {
  menu: {
    class: [
      // Flex & Alignment
      "flex items-center flex-nowrap gap-x-1.5",
      // Spacing
      "m-0 p-0 list-none leading-none"
    ]
  },
  action: {
    class: [
      // Font
      "font-semibold text-decoration-none text-sm",
      // Flex & Alignment
      "flex items-center gap-x-1.5 ",
      // Shape
      "rounded-md",
      // Color
      "text-surface-500",
      // States
      "focus-visible:outline-none focus-visible:outline-offset-0",
      "focus-visible:ring-2 focus-visible:ring-primary-500",
      // Transitions
      "transition-shadow duration-200"
    ]
  },
  icon: {
    class: "text-surface-500"
  },
  separator: {
    class: [
      // Flex & Alignment
      "flex items-center shrink-0",
      // Color
      "text-surface-500"
    ]
  }
};
const button = {
  root: ({ props, context, parent }) => ({
    class: [
      "relative",
      // Alignments
      "items-center justify-center inline-flex text-center align-bottom",
      // Sizes & Spacing
      "text-sm",
      {
        "px-2.5 py-1.5 min-w-[2rem]": props.size === null,
        "px-2 py-1": props.size === "small",
        "px-3 py-2": props.size === "large"
      },
      {
        "h-8 w-8 p-0": props.label == null && props.icon !== null
      },
      // Shapes
      {
        "shadow-sm": !props.raised && !props.link && !props.text,
        "shadow-lg": props.raised
      },
      { "rounded-md": !props.rounded, "rounded-full": props.rounded },
      {
        "rounded-none first:rounded-l-md last:rounded-r-md self-center": parent.instance.$name == "InputGroup"
      },
      // Link Button
      { "text-primary-600 bg-transparent ring-transparent": props.link },
      // Plain Button
      {
        "text-white bg-gray-500 ring-1 ring-gray-500": props.plain && !props.outlined && !props.text
      },
      // Plain Text Button
      { "text-surface-500": props.plain && props.text },
      // Plain Outlined Button
      {
        "text-surface-500 ring-1 ring-gray-500": props.plain && props.outlined
      },
      // Text Button
      { "bg-transparent ring-transparent": props.text && !props.plain },
      // Outlined Button
      { "bg-transparent": props.outlined && !props.plain },
      // --- Severity Buttons ---
      // Primary Button
      {
        "text-white": !props.link && props.severity === null && !props.text && !props.outlined && !props.plain,
        "bg-primary-500": !props.link && props.severity === null && !props.text && !props.outlined && !props.plain,
        "ring-1 ring-primary-500": !props.link && props.severity === null && !props.text && !props.outlined && !props.plain
      },
      // Primary Text Button
      {
        "text-primary-500": props.text && props.severity === null && !props.plain
      },
      // Primary Outlined Button
      {
        "text-primary-500 ring-1 ring-primary-500 hover:bg-primary-300/20": props.outlined && props.severity === null && !props.plain
      },
      // Secondary Button
      {
        "text-white": props.severity === "secondary" && !props.text && !props.outlined && !props.plain,
        "bg-surface-500": props.severity === "secondary" && !props.text && !props.outlined && !props.plain,
        "ring-1 ring-surface-500": props.severity === "secondary" && !props.text && !props.outlined && !props.plain
      },
      // Secondary Text Button
      {
        "text-surface-500": props.text && props.severity === "secondary" && !props.plain
      },
      // Secondary Outlined Button
      {
        "text-surface-500 ring-1 ring-surface-500 hover:bg-surface-300/20": props.outlined && props.severity === "secondary" && !props.plain
      },
      // Success Button
      {
        "text-white": props.severity === "success" && !props.text && !props.outlined && !props.plain,
        "bg-green-500": props.severity === "success" && !props.text && !props.outlined && !props.plain,
        "ring-1 ring-green-500": props.severity === "success" && !props.text && !props.outlined && !props.plain
      },
      // Success Text Button
      {
        "text-green-500": props.text && props.severity === "success" && !props.plain
      },
      // Success Outlined Button
      {
        "text-green-500 ring-1 ring-green-500 hover:bg-green-300/20": props.outlined && props.severity === "success" && !props.plain
      },
      // Info Button
      {
        "text-white": props.severity === "info" && !props.text && !props.outlined && !props.plain,
        "bg-blue-500": props.severity === "info" && !props.text && !props.outlined && !props.plain,
        "ring-1 ring-blue-500": props.severity === "info" && !props.text && !props.outlined && !props.plain
      },
      // Info Text Button
      {
        "text-blue-500": props.text && props.severity === "info" && !props.plain
      },
      // Info Outlined Button
      {
        "text-blue-500 ring-1 ring-blue-500 hover:bg-blue-300/20 ": props.outlined && props.severity === "info" && !props.plain
      },
      // Warning Button
      {
        "text-white": props.severity === "warning" && !props.text && !props.outlined && !props.plain,
        "bg-orange-500": props.severity === "warning" && !props.text && !props.outlined && !props.plain,
        "ring-1 ring-orange-500": props.severity === "warning" && !props.text && !props.outlined && !props.plain
      },
      // Warning Text Button
      {
        "text-orange-500": props.text && props.severity === "warning" && !props.plain
      },
      // Warning Outlined Button
      {
        "text-orange-500 ring-1 ring-orange-500 hover:bg-orange-300/20": props.outlined && props.severity === "warning" && !props.plain
      },
      // Help Button
      {
        "text-white": props.severity === "help" && !props.text && !props.outlined && !props.plain,
        "bg-purple-500": props.severity === "help" && !props.text && !props.outlined && !props.plain,
        "ring-1 ring-purple-500": props.severity === "help" && !props.text && !props.outlined && !props.plain
      },
      // Help Text Button
      {
        "text-purple-500": props.text && props.severity === "help" && !props.plain
      },
      // Help Outlined Button
      {
        "text-purple-500 ring-1 ring-purple-500 hover:bg-purple-300/20": props.outlined && props.severity === "help" && !props.plain
      },
      // Danger Button
      {
        "text-white": props.severity === "danger" && !props.text && !props.outlined && !props.plain,
        "bg-red-500": props.severity === "danger" && !props.text && !props.outlined && !props.plain,
        "ring-1 ring-red-500": props.severity === "danger" && !props.text && !props.outlined && !props.plain
      },
      // Danger Text Button
      {
        "text-red-500": props.text && props.severity === "danger" && !props.plain
      },
      // Danger Outlined Button
      {
        "text-red-500 ring-1 ring-red-500 hover:bg-red-300/20": props.outlined && props.severity === "danger" && !props.plain
      },
      // --- Severity Button States ---
      "focus:outline-none focus:outline-offset-0 focus:ring-2 focus:ring-offset-current",
      {
        "focus:ring-offset-2": !props.link && !props.plain && !props.outlined && !props.text
      },
      // Link
      { "focus:ring-primary-500": props.link },
      // Plain
      {
        "hover:bg-gray-600 hover:ring-gray-600": props.plain && !props.outlined && !props.text
      },
      // Text & Outlined Button
      {
        "hover:bg-surface-300/20": props.plain && (props.text || props.outlined)
      },
      // Primary
      {
        "hover:bg-primary-600 hover:ring-primary-600": !props.link && props.severity === null && !props.text && !props.outlined && !props.plain
      },
      {
        "focus:ring-primary-500": props.severity === null
      },
      // Text & Outlined Button
      {
        "hover:bg-primary-300/20": (props.text || props.outlined) && props.severity === null && !props.plain
      },
      // Secondary
      {
        "hover:bg-surface-600 hover:ring-surface-600": props.severity === "secondary" && !props.text && !props.outlined && !props.plain
      },
      {
        "focus:ring-surface-500": props.severity === "secondary"
      },
      // Text & Outlined Button
      {
        "hover:bg-surface-300/20": (props.text || props.outlined) && props.severity === "secondary" && !props.plain
      },
      // Success
      {
        "hover:bg-green-600 hover:ring-green-600": props.severity === "success" && !props.text && !props.outlined && !props.plain
      },
      {
        "focus:ring-green-500": props.severity === "success"
      },
      // Text & Outlined Button
      {
        "hover:bg-green-300/20": (props.text || props.outlined) && props.severity === "success" && !props.plain
      },
      // Info
      {
        "hover:bg-blue-600 hover:ring-blue-600": props.severity === "info" && !props.text && !props.outlined && !props.plain
      },
      {
        "focus:ring-blue-500": props.severity === "info"
      },
      // Text & Outlined Button
      {
        "hover:bg-blue-300/20": (props.text || props.outlined) && props.severity === "info" && !props.plain
      },
      // Warning
      {
        "hover:bg-orange-600 hover:ring-orange-600": props.severity === "warning" && !props.text && !props.outlined && !props.plain
      },
      {
        "focus:ring-orange-500": props.severity === "warning"
      },
      // Text & Outlined Button
      {
        "hover:bg-orange-300/20": (props.text || props.outlined) && props.severity === "warning" && !props.plain
      },
      // Help
      {
        "hover:bg-purple-600 hover:ring-purple-600": props.severity === "help" && !props.text && !props.outlined && !props.plain
      },
      {
        "focus:ring-purple-500": props.severity === "help"
      },
      // Text & Outlined Button
      {
        "hover:bg-purple-300/20": (props.text || props.outlined) && props.severity === "help" && !props.plain
      },
      // Danger
      {
        "hover:bg-red-600 hover:ring-red-600": props.severity === "danger" && !props.text && !props.outlined && !props.plain
      },
      {
        "focus:ring-red-500": props.severity === "danger"
      },
      // Text & Outlined Button
      {
        "hover:bg-red-300/20": (props.text || props.outlined) && props.severity === "danger" && !props.plain
      },
      // Disabled
      { "opacity-60 pointer-events-none cursor-default": context.disabled },
      // Transitions
      "transition duration-200 ease-in-out",
      // Misc
      "cursor-pointer overflow-hidden select-none"
    ]
  }),
  label: ({ props }) => ({
    class: [
      "duration-200",
      "font-semibold",
      {
        "hover:underline": props.link
      },
      { "flex-1": props.label !== null, "invisible w-0": props.label == null }
    ]
  }),
  icon: ({ props }) => ({
    class: [
      "mx-0",
      {
        "mr-2": props.iconPos == "left" && props.label != null,
        "ml-2 order-1": props.iconPos == "right" && props.label != null,
        "mb-2": props.iconPos == "top" && props.label != null,
        "mt-2": props.iconPos == "bottom" && props.label != null
      }
    ]
  }),
  loadingicon: ({ props }) => ({
    class: [
      "h-3 w-3",
      "mx-0",
      {
        "mr-2": props.iconPos == "left" && props.label != null,
        "ml-2 order-1": props.iconPos == "right" && props.label != null,
        "mb-2": props.iconPos == "top" && props.label != null,
        "mt-2": props.iconPos == "bottom" && props.label != null
      },
      "animate-spin"
    ]
  }),
  badge: ({ props }) => ({
    class: [
      {
        "ml-2 w-4 h-4 leading-none flex items-center justify-center": props.badge
      }
    ]
  })
};
const calendar = {
  root: ({ props }) => ({
    class: [
      // Display and Position
      "inline-flex",
      "max-w-full",
      "relative",
      "shadow-sm",
      "rounded-md",
      // Misc
      {
        "opacity-40 select-none pointer-events-none cursor-default": props.disabled
      }
    ]
  }),
  input: ({ props }) => ({
    class: [
      // Display
      "flex flex-auto",
      // Font
      "font-sans leading-none  sm:text-sm",
      // Colors
      "text-surface-900",
      "placeholder:text-surface-400",
      "bg-surface-0",
      "ring-1 ring-inset ring-offset-0",
      { "ring-surface-300": !props.invalid },
      // Invalid State
      { "ring-red-500": props.invalid },
      // Spacing
      "m-0 py-1.5 px-3",
      "-ml-px",
      // Shape
      "appearance-none",
      { "rounded-md": !props.showIcon || props.iconDisplay == "input" },
      {
        "rounded-l-md  flex-1 pr-9 ": props.showIcon && props.iconDisplay !== "input"
      },
      {
        "rounded-md flex-1 pr-9": props.showIcon && props.iconDisplay === "input"
      },
      // Transitions
      "transition-colors",
      "duration-200",
      // States
      "outline-none focus:ring-primary-500"
    ]
  }),
  inputicon: {
    class: [
      "sm:text-sm",
      "absolute top-[50%] -mt-2",
      "text-surface-600",
      "right-[.75rem]"
    ]
  },
  dropdownbutton: {
    root: {
      class: [
        "relative text-sm",
        // Alignments
        "items-center inline-flex text-center align-bottom",
        // Shape
        "rounded-r-md",
        // Size
        "px-2.5 py-1.5 leading-none",
        // Colors
        "text-surface-600",
        "bg-surface-100",
        "ring-1 ring-inset ring-surface-300",
        // States
        "hover:bg-surface-200",
        "focus:outline-none focus:outline-offset-0 focus:ring-1",
        "focus:ring-primary-500"
      ]
    }
  },
  panel: ({ props }) => ({
    class: [
      // Display & Position
      {
        absolute: !props.inline,
        "inline-block": props.inline
      },
      // Size
      { "w-auto p-2 ": !props.inline },
      { "min-w-[80vw] w-auto p-2 ": props.touchUI },
      { "p-2 min-w-full": props.inline },
      // Shape
      "rounded-lg",
      {
        "shadow-md ring-1": !props.inline
      },
      // Colors
      "bg-surface-0",
      "ring-surface-200",
      //misc
      { "overflow-x-auto": props.inline }
    ]
  }),
  datepickerMask: {
    class: [
      "fixed top-0 left-0 w-full h-full",
      "flex items-center justify-center",
      "bg-black bg-opacity-90"
    ]
  },
  header: ({ props }) => ({
    class: [
      //Font
      "font-semibold text-md",
      // Flexbox and Alignment
      "flex items-center justify-between",
      // Spacing
      "m-0",
      {
        "py-2 pl-2 pb-4": !(props.numberOfMonths > 1),
        "py-2 pb-4": props.numberOfMonths > 1
      },
      // Shape
      "rounded-t-md",
      // Colors
      "text-surface-700",
      "bg-surface-0"
    ]
  }),
  previousbutton: ({ props }) => ({
    class: [
      "relative",
      // Flexbox and Alignment
      "inline-flex items-center justify-center",
      {
        " order-2": !(props.numberOfMonths > 1),
        "order-1": props.numberOfMonths > 1
      },
      // Size
      "p-1.5 m-0",
      // Colors
      "text-surface-500",
      "border-0",
      "bg-transparent",
      // States
      "hover:text-surface-700",
      // Misc
      "cursor-pointer overflow-hidden"
    ]
  }),
  title: ({ props }) => ({
    class: [
      // Text
      "leading-6",
      "my-0",
      "order-1",
      {
        "mr-auto": !(props.numberOfMonths > 1),
        " mx-auto": props.numberOfMonths > 1
      }
    ]
  }),
  monthTitle: {
    class: [
      // Font
      "text-base leading-6",
      "font-semibold",
      // Colors
      "text-surface-700",
      // Transitions
      "transition duration-200",
      // Spacing
      "m-0 mr-2",
      // States
      "hover:text-primary-500",
      // Misc
      "cursor-pointer"
    ]
  },
  yearTitle: {
    class: [
      // Font
      "text-base leading-6",
      "font-semibold",
      // Colors
      "text-surface-700",
      // Transitions
      "transition duration-200",
      // Spacing
      "m-0",
      // States
      "hover:text-primary-500",
      // Misc
      "cursor-pointer"
    ]
  },
  nextbutton: ({ props }) => ({
    class: [
      "relative",
      // Flexbox and Alignment
      "inline-flex items-center justify-center order-3",
      {
        " order-3": !(props.numberOfMonths > 1),
        "order-1": props.numberOfMonths > 1
      },
      // Size
      "p-1.5 m-0",
      // Colors
      "text-surface-500",
      "border-0",
      "bg-transparent",
      // States
      "hover:text-surface-700",
      // Misc
      "cursor-pointer overflow-hidden"
    ]
  }),
  table: {
    class: [
      // Size & Shape
      "w-full",
      // Spacing
      "m-0 my-2"
    ]
  },
  tableheadercell: {
    class: [
      // Spacing
      "p-0 md:p-2"
    ]
  },
  tablebodyrow: {
    class: ["border-b border-surface-200 last:border-b-0"]
  },
  weekheader: {
    class: [
      "leading-6 text-sm font-normal",
      "text-surface-600",
      "opacity-40 cursor-default",
      "mb-2"
    ]
  },
  weeknumber: {
    class: ["text-surface-600 font-normal", "opacity-40 cursor-default"]
  },
  weekday: {
    class: [
      // Colors
      "text-surface-500 font-normal"
    ]
  },
  day: {
    class: [
      // Spacing
      "p-0 md:p-2"
    ]
  },
  weeklabelcontainer: ({ context }) => ({
    class: [
      // Flexbox and Alignment
      "flex items-center justify-center",
      "mx-auto",
      // Shape & Size
      "w-10 h-10",
      "rounded-full",
      "border-transparent border",
      // Colors
      {
        "text-surface-600 bg-transparent": !context.selected && !context.disabled,
        "text-primary-500": context.selected && !context.disabled
      },
      // States
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50",
      {
        "hover:bg-surface-100": !context.disabled
      },
      {
        "opacity-40 cursor-default": context.disabled,
        "cursor-pointer": !context.disabled
      }
    ]
  }),
  daylabel: ({ context }) => ({
    class: [
      // Flexbox and Alignment
      "flex items-center justify-center",
      "mx-auto",
      // Shape & Size
      "w-8 h-8",
      "rounded-full",
      // Colors
      {
        "text-surface-0 bg-surface-900": context.date.today && !context.selected && !context.disabled,
        "text-surface-600 bg-transparent": !context.selected && !context.disabled && !context.date.today,
        "text-primary-500": context.selected && !context.disabled && !context.date.today,
        "text-primary-200 bg-surface-900": context.selected && !context.disabled && context.date.today
      },
      // States
      "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500 ",
      {
        "hover:bg-surface-100": !context.disabled,
        "hover:bg-surface-700": !context.disabled && context.date.today
      },
      {
        "opacity-40 cursor-default": context.disabled,
        "cursor-pointer": !context.disabled
      }
    ]
  }),
  monthpicker: {
    class: [
      // Spacing
      "my-2"
    ]
  },
  month: ({ context }) => ({
    class: [
      // Flexbox and Alignment
      "inline-flex items-center justify-center",
      // Size
      "w-1/3",
      "px-2.5 py-1.5",
      "mt-1",
      "text-md leading-none",
      // Shape
      "rounded-md",
      // Colors
      {
        "text-surface-600 bg-transparent": !context.selected && !context.disabled,
        "text-primary-500": context.selected && !context.disabled
      },
      // States
      "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500 ",
      "hover:bg-surface-100",
      // Misc
      "cursor-pointer"
    ]
  }),
  yearpicker: {
    class: [
      // Spacing
      "my-2"
    ]
  },
  year: ({ context }) => ({
    class: [
      // Flexbox and Alignment
      "inline-flex items-center justify-center",
      // Size
      "w-1/3",
      "px-2.5 py-1.5",
      "mt-1",
      "text-md leading-none",
      // Shape
      "rounded-md",
      // Colors
      {
        "text-surface-600 bg-transparent": !context.selected && !context.disabled,
        "text-primary-500": context.selected && !context.disabled
      },
      // States
      "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500",
      "hover:bg-surface-100",
      // Misc
      "cursor-pointer"
    ]
  }),
  timepicker: {
    class: [
      // Flexbox
      "flex",
      "justify-center items-center",
      // Spacing
      "p-1.5"
    ]
  },
  separatorcontainer: {
    class: [
      // Flexbox and Alignment
      "flex",
      "items-center",
      "flex-col",
      // Spacing
      "px-2"
    ]
  },
  separator: {
    class: [
      // Text
      "text-xl"
    ]
  },
  hourpicker: {
    class: [
      // Flexbox and Alignment
      "flex",
      "items-center",
      "flex-col",
      // Spacing
      "px-2"
    ]
  },
  minutepicker: {
    class: [
      // Flexbox and Alignment
      "flex",
      "items-center",
      "flex-col",
      // Spacing
      "px-2"
    ]
  },
  secondPicker: {
    class: [
      // Flexbox and Alignment
      "flex",
      "items-center",
      "flex-col",
      // Spacing
      "px-2"
    ]
  },
  ampmpicker: {
    class: [
      // Flexbox and Alignment
      "flex",
      "items-center",
      "flex-col",
      // Spacing
      "px-2"
    ]
  },
  incrementbutton: {
    class: [
      "relative",
      // Flexbox and Alignment
      "inline-flex items-center justify-center",
      // Size
      "p-1.5 m-0",
      // Colors
      "text-surface-500",
      "border-0",
      "bg-transparent",
      // States
      "hover:text-surface-700",
      // Misc
      "cursor-pointer overflow-hidden"
    ]
  },
  decrementbutton: {
    class: [
      "relative",
      // Flexbox and Alignment
      "inline-flex items-center justify-center",
      // Size
      "p-1.5 m-0",
      // Colors
      "text-surface-500",
      "border-0",
      "bg-transparent",
      // States
      "hover:text-surface-700",
      // Misc
      "cursor-pointer overflow-hidden"
    ]
  },
  groupcontainer: {
    class: [
      // Flexbox
      "flex"
    ]
  },
  group: {
    class: [
      // Flexbox and Sizing
      "flex-1",
      // Borders
      "border-l",
      "border-surface-200",
      // Spacing
      "pr-0.5",
      "pl-0.5",
      "pt-0",
      "pb-0",
      // Pseudo-Classes
      "first:pl-0",
      "first:border-l-0"
    ]
  },
  buttonbar: {
    class: [
      // Flexbox
      "flex justify-between items-center",
      // Spacing
      "pt-2.5 pb-1.5 px-0",
      // Shape
      "border-t border-surface-200"
    ]
  },
  todaybutton: {
    root: {
      class: [
        // Flexbox and Alignment
        "inline-flex items-center justify-center",
        // Spacing
        "px-2.5 py-1.5 text-sm leading-none",
        // Shape
        "rounded-md",
        // Colors
        "bg-transparent border-transparent",
        "text-primary-500",
        // Transitions
        "transition-colors duration-200 ease-in-out",
        // States
        "focus:outline-none focus:outline-offset-0 focus:ring-2 ring-inset",
        "focus:ring-primary-500",
        "hover:bg-primary-300/20",
        // Misc
        "cursor-pointer"
      ]
    }
  },
  clearbutton: {
    root: {
      class: [
        // Flexbox and Alignment
        "inline-flex items-center justify-center",
        // Spacing
        "px-2.5 py-1.5 text-sm leading-none",
        // Shape
        "rounded-md",
        // Colors
        "bg-transparent border-transparent",
        "text-primary-500",
        // Transitions
        "transition-colors duration-200 ease-in-out",
        // States
        "focus:outline-none focus:outline-offset-0 focus:ring-2 ring-inset",
        "focus:ring-primary-500",
        "hover:bg-primary-300/20",
        // Misc
        "cursor-pointer"
      ]
    }
  },
  transition: {
    enterFromClass: "opacity-0 scale-y-[0.8]",
    enterActiveClass: "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
    leaveActiveClass: "transition-opacity duration-100 ease-linear",
    leaveToClass: "opacity-0"
  }
};
const card = {
  root: {
    class: [
      //Shape
      "rounded-lg",
      "shadow-md",
      //Color
      "bg-surface-0",
      "text-surface-700"
    ]
  },
  header: {
    class: ["border-b border-surface-200"]
  },
  body: {
    class: "py-5"
  },
  title: {
    class: "text-lg font-medium mb-2 px-5 md:px-6"
  },
  subtitle: {
    class: [
      //Spacing
      "mb-1 px-5 md:px-6",
      //Color
      "text-surface-600"
    ]
  },
  content: {
    class: "py-6 px-5 md:px-6"
  },
  footer: {
    class: ["px-5 md:px-6 pt-5 pb-0", "border-t border-surface-200"]
  }
};
const carousel = {
  root: {
    class: [
      // Flexbox
      "flex flex-col"
    ]
  },
  content: {
    class: [
      // Flexbox & Overflow
      "flex flex-col overflow-auto"
    ]
  },
  container: ({ props }) => ({
    class: [
      // Flexbox
      "flex",
      // Orientation
      {
        "flex-row": props.orientation !== "vertical",
        "flex-col": props.orientation == "vertical"
      }
    ]
  }),
  previousbutton: {
    class: [
      // Flexbox & Alignment
      "flex justify-center items-center self-center",
      // Sizing & Overflow
      "overflow-hidden w-8 h-8",
      // Spacing
      "mx-2",
      // Shape
      "rounded-full",
      // Border & Background
      "border-0 bg-transparent",
      // Color
      "text-surface-600",
      // Transitions
      "transition duration-200 ease-in-out"
    ]
  },
  nextbutton: {
    class: [
      // Flexbox & Alignment
      "flex justify-center items-center self-center",
      // Sizing & Overflow
      "overflow-hidden w-8 h-8",
      // Spacing
      "mx-2",
      // Shape
      "rounded-full",
      // Border & Background
      "border-0 bg-transparent",
      // Color
      "text-surface-600",
      // Transitions
      "transition duration-200 ease-in-out"
    ]
  },
  itemscontent: {
    class: [
      // Overflow & Width
      "overflow-hidden w-full"
    ]
  },
  itemscontainer: ({ props }) => ({
    class: [
      // Flexbox
      "flex",
      // Orientation & Sizing
      {
        "flex-row": props.orientation !== "vertical",
        "flex-col h-full": props.orientation == "vertical"
      }
    ]
  }),
  item: ({ props }) => ({
    class: [
      // Flexbox
      "flex shrink-0 grow ",
      // Size
      {
        "w-full sm:w-[50%] md:w-[33.333333333333336%]": props.orientation !== "vertical",
        "w-full h-full": props.orientation == "vertical"
      }
    ]
  }),
  itemcloned: ({ props }) => ({
    class: [
      // Flexbox
      "flex shrink-0 grow",
      "unvisible",
      // Size
      {
        "w-full sm:w-[50%] md:w-[33.333333333333336%]": props.orientation !== "vertical",
        "w-full h-full": props.orientation == "vertical"
      }
    ]
  }),
  indicators: {
    class: [
      // Flexbox & Alignment
      "flex flex-row justify-center flex-wrap"
    ]
  },
  indicator: {
    class: [
      // Spacing
      "mr-2 mb-2"
    ]
  },
  indicatorbutton: ({ context }) => ({
    class: [
      // Sizing & Shape
      "w-6 h-1.5 rounded-md",
      // Transitions
      "transition duration-200",
      // Focus Styles
      "focus:outline-none focus:outline-offset-0 focus:ring-2 focus:ring-primary-500",
      // Color & Background
      {
        "bg-surface-200 hover:bg-surface-300": !context.highlighted,
        "bg-primary-500 hover:bg-primary-600": context.highlighted
      }
    ]
  })
};
const cascadeselect = {
  root: ({ props, state }) => ({
    class: [
      // Display and Position
      "inline-flex",
      "relative",
      // Shape
      "rounded-md",
      "shadow-sm",
      // Color and Background
      "bg-surface-0 dark:bg-surface-900",
      // States
      { "ring-1 ring-inset": !state.focused, "ring-2 ring-inset ring-primary-500 dark:ring-primary-400": state.focused },
      { "ring-surface-300 dark:ring-surface-600": !props.invalid && !state.focused },
      // Invalid State
      { "ring-red-500 dark:ring-red-400": props.invalid && !state.focused },
      // Misc
      "cursor-default",
      "select-none",
      { "opacity-60": props.disabled, "pointer-events-none": props.disabled }
    ]
  }),
  label: ({ props }) => ({
    class: [
      //Font
      "font-sans",
      "leading-6",
      "sm:text-sm",
      // Flex & Alignment
      " flex flex-auto",
      // Sizing and Spacing
      "w-[1%]",
      "py-1.5 px-3",
      //Shape
      "rounded-none",
      // Color and Background
      "bg-transparent",
      "border-0",
      { "text-surface-800 dark:text-white/80": props.modelValue, "text-surface-400 dark:text-surface-500": !props.modelValue },
      "placeholder:text-surface-400 dark:placeholder:text-surface-500",
      // Transitions
      "transition",
      "duration-200",
      // States
      "focus:outline-none focus:shadow-none",
      // Misc
      "relative",
      "cursor-pointer",
      "overflow-hidden overflow-ellipsis",
      "whitespace-nowrap",
      "appearance-none"
    ]
  }),
  dropdownbutton: {
    class: [
      //Font
      "sm:text-sm",
      // Flexbox
      "flex items-center justify-center",
      "shrink-0",
      // Color and Background
      "bg-transparent",
      "text-surface-500",
      // Size
      "w-12",
      // Shape
      "rounded-tr-md",
      "rounded-br-md"
    ]
  },
  panel: {
    class: [
      // Position
      "absolute top-0 left-0",
      "mt-2",
      // Shape
      "border-0",
      "rounded-md",
      "shadow-md",
      // Color
      "bg-surface-0 dark:bg-surface-700",
      "text-surface-800 dark:text-white/80",
      "ring-1 ring-inset ring-surface-300 dark:ring-surface-700"
    ]
  },
  wrapper: {
    class: [
      // Sizing
      "max-h-[200px]",
      // Misc
      "overflow-auto"
    ]
  },
  list: {
    class: "py-1 list-none mx-1.5"
  },
  item: ({ context }) => ({
    class: [
      // Font
      "sm:text-sm",
      "leading-none",
      // Shape
      "border-0",
      "rounded-md",
      // Spacing
      "m-0",
      //  Colors
      {
        "text-surface-500 dark:text-white/70": !context.focused && !context.active,
        "text-surface-500 dark:text-white/70 bg-surface-200 dark:bg-black/70": context.focused && !context.active,
        "text-surface-900 dark:text-surface-0/80 bg-surface-50 dark:bg-black/70": context.focused && context.active,
        "text-surface-900 dark:text-surface-0/80 bg-surface-50 dark:bg-black/70": !context.focused && context.active
      },
      // Hover States
      {
        "hover:bg-surface-50 dark:hover:bg-surface-800": !context.active,
        "hover:bg-surface-100 dark:hover:bg-black/40 text-surface-900 dark:text-surface-0/80": context.active
      },
      // Transitions
      "transition-shadow",
      "duration-200",
      // Misc
      "cursor-pointer",
      "overflow-hidden",
      "whitespace-nowrap"
    ]
  }),
  content: {
    class: [
      "relative",
      // Flexbox
      "flex",
      "items-center",
      // Spacing
      "py-2 px-4",
      // Misc
      "no-underline",
      "overflow-hidden",
      "cursor-pointer",
      "select-none"
    ]
  },
  groupicon: {
    class: [
      // Alignment
      "ml-auto"
    ]
  },
  sublist: {
    class: [
      // Size
      "w-full sm:w-48",
      // Spacing
      "p-1.5",
      "m-0",
      "list-none",
      // Shape
      "shadow-none sm:shadow-md",
      "border-0",
      // Position
      "static sm:absolute",
      "z-10",
      // Color
      "bg-surface-0 dark:bg-surface-700"
    ]
  },
  separator: {
    class: "border-t border-surface-200 dark:border-surface-600 my-1"
  },
  transition: {
    enterFromClass: "opacity-0 scale-y-[0.8]",
    enterActiveClass: "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
    leaveActiveClass: "transition-opacity duration-100 ease-linear",
    leaveToClass: "opacity-0"
  }
};
const checkbox = {
  root: {
    class: [
      "relative",
      // Alignment
      "inline-flex",
      "align-bottom",
      // Size
      "w-4",
      "h-4",
      // Misc
      "cursor-default",
      "select-none"
    ]
  },
  box: ({ props, context }) => ({
    class: [
      // Alignment
      "flex",
      "items-center",
      "justify-center",
      // Size
      "w-4",
      "h-4",
      // Shape
      "rounded",
      "border",
      // Colors
      "text-surface-600",
      {
        "border-surface-300 bg-surface-0": !context.checked && !props.invalid,
        "border-primary-500 bg-primary-500": context.checked
      },
      // Invalid State
      { "border-red-500": props.invalid },
      {
        "ring-2 ring-primary-500": !props.disabled && context.focused,
        "cursor-default opacity-60": props.disabled
      },
      // States
      {
        "peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500": !props.disabled,
        "cursor-default opacity-60": props.disabled
      },
      // Transitions
      "transition-colors",
      "duration-200"
    ]
  }),
  input: {
    class: [
      "peer",
      // Size
      "w-full ",
      "h-full",
      // Position
      "absolute",
      "top-0 left-0",
      "z-10",
      // Spacing
      "p-0",
      "m-0",
      // Shape
      "rounded",
      "border",
      // Shape
      "opacity-0",
      "rounded-md",
      "outline-none",
      "border-2 border-surface-300",
      // Misc
      "appearance-none"
    ]
  },
  icon: {
    class: [
      // Font
      "text-normal",
      // Size
      "w-3",
      "h-3",
      // Colors
      "text-white",
      // Transitions
      "transition-all",
      "duration-200"
    ]
  }
};
const chip = {
  root: {
    class: [
      // Flexbox
      "inline-flex items-center",
      // Spacing
      "px-2 py-0.5",
      // Shape
      "rounded-[1.14rem]",
      // Colors
      "text-surface-700",
      "bg-surface-200"
    ]
  },
  label: {
    class: "text-xs leading-6 mx-0"
  },
  icon: {
    class: "leading-6 mr-2"
  },
  image: {
    class: ["w-6 h-6 mr-2", "rounded-full"]
  },
  removeIcon: {
    class: [
      // Shape
      "rounded-md leading-6",
      // Spacing
      "ml-2",
      // Size
      "w-4 h-4",
      // Transition
      "transition duration-200 ease-in-out",
      // Misc
      "cursor-pointer"
    ]
  }
};
const chips = {
  root: ({ props }) => ({
    class: [
      "flex",
      {
        "opacity-60 select-none pointer-events-none cursor-default": props.disabled
      }
    ]
  }),
  container: ({ state, props }) => ({
    class: [
      // Font
      "font-sans sm:text-sm leading-none",
      // Flex
      "flex items-center flex-wrap gap-1",
      // Spacing
      "m-0 py-1 px-3",
      // Size
      "w-full",
      // Shape
      "list-none",
      "rounded-md",
      // Color
      "text-surface-900",
      "bg-surface-0",
      "placeholder:text-surface-400",
      "shadow-sm",
      // States
      {
        "ring-1 ring-inset": !state.focused,
        "ring-2 ring-inset ring-primary-500": state.focused
      },
      {
        "ring-surface-300": !props.invalid && !state.focused
      },
      // Invalid State
      { "ring-red-500": props.invalid && !state.focused },
      // Transition
      "transition-colors duration-200",
      // Misc
      "cursor-text overflow-hidden",
      "appearance-none"
    ]
  }),
  inputtoken: {
    class: ["py-0.5 px-0", "inline-flex flex-auto"]
  },
  input: {
    class: [
      // Font
      "font-sans sm:text-sm leading-none",
      // Size
      "w-full",
      // Spacing
      "p-0 m-0",
      // Shape
      "appearance-none rounded-none",
      "border-0 outline-none",
      // Color
      "text-surface-700",
      "bg-transparent",
      "placeholder:text-surface-400"
    ]
  },
  token: {
    class: [
      // Flexbox
      "inline-flex items-center",
      // Spacing
      "py-0.5 px-3",
      // Shape
      "rounded-[1.14rem]",
      // Colors
      "text-surface-700",
      "bg-surface-200"
    ]
  },
  label: {
    class: "leading-5"
  },
  removeTokenIcon: {
    class: [
      // Shape
      "rounded-md leading-6",
      // Spacing
      "ml-2",
      // Size
      "w-4 h-4",
      // Transition
      "transition duration-200 ease-in-out",
      // Misc
      "cursor-pointer"
    ]
  }
};
const colorpicker = {
  root: ({ props }) => ({
    class: [
      // Display
      "inline-block",
      // Misc
      {
        "opacity-60 select-none pointer-events-none cursor-default": props.disabled
      }
    ]
  }),
  input: {
    class: [
      // Font
      "font-sans text-base ",
      // Spacing
      "m-0",
      "p-3",
      // Size & Shape
      "rounded-lg w-8 h-8",
      // Colors
      "bg-surface-0",
      "border border-surface-300",
      // States
      "hover:border-primary-500",
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50",
      // Transition
      "transition-colors duration-200",
      // Misc
      "cursor-pointer"
    ]
  },
  panel: ({ props }) => ({
    class: [
      // Position & Size
      {
        "relative h-[166px] w-[193px]": props.inline,
        "absolute h-[166px] w-[193px]": !props.inline
      },
      // Shape
      "shadow-md border rounded-md",
      // Colors
      "bg-surface-800 border-surface-900"
    ]
  }),
  selector: {
    class: [
      // Position
      "absolute top-[8px] left-[8px]",
      // Size
      "h-[150px] w-[150px]"
    ]
  },
  color: {
    class: [
      // Size
      "h-[150px] w-[150px]"
    ],
    style: "background: linear-gradient(to top, #000 0%, rgb(0 0 0 / 0) 100%), linear-gradient(to right, #fff 0%, rgb(255 255 255 / 0) 100%)"
  },
  colorhandle: {
    class: [
      "absolute",
      // Shape
      "rounded-full border border-solid",
      // Size
      "h-[10px] w-[10px]",
      // Spacing
      "-ml-[5px] -mt-[5px]",
      // Colors
      "border-white",
      // Misc
      "cursor-pointer opacity-85"
    ]
  },
  hue: {
    class: [
      // Position
      "absolute top-[8px] left-[167px]",
      // Size
      "h-[150px] w-[17px]",
      // Opacity
      "opacity-85"
    ],
    style: "background: linear-gradient(0deg, red 0, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, red)"
  },
  huehandle: {
    class: [
      // Position
      "absolute left-0 -ml-[2px] -mt-[5px]",
      // Size
      "h-[10px] w-[21px]",
      // Shape
      "border-solid border-2",
      // Misc
      "cursor-pointer opacity-85"
    ]
  },
  transition: {
    enterFromClass: "opacity-0 scale-y-[0.8]",
    enterActiveClass: "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
    leaveActiveClass: "transition-opacity duration-100 ease-linear",
    leaveToClass: "opacity-0"
  }
};
const confirmpopup = {
  root: {
    class: [
      // Shape
      "rounded-lg",
      "shadow-xl",
      "border-0",
      // Positioning
      "z-40 transform origin-center",
      "mt-3 absolute left-0 top-0",
      // Color
      "bg-surface-0",
      "text-surface-700",
      // Before: Arrow
      "before:absolute before:w-0 before:-top-3 before:h-0 before:border-transparent before:border-solid before:ml-6 before:border-x-[0.75rem] before:border-b-[0.75rem] before:border-t-0 before:border-b-surface-0"
    ]
  },
  content: {
    class: [
      // Font
      "text-sm",
      // Spacing
      "px-6",
      "py-3",
      // Colors
      "bg-surface-0",
      "text-surface-600",
      // Misc
      "overflow-y-auto"
    ]
  },
  icon: {
    class: "text-xl mr-2"
  },
  footer: {
    class: [
      // Flexbox and Alignment
      "flex items-center justify-end",
      "shrink-0",
      "text-right",
      "gap-3",
      // Spacing
      "px-6",
      "py-3",
      // Shape
      "border-t-0",
      "rounded-b-lg",
      // Colors
      "bg-surface-50",
      "text-surface-700"
    ]
  },
  rejectbutton: {
    root: {
      class: [
        "relative",
        // Alignments
        "items-center inline-flex text-center align-bottom justify-center",
        // Sizes & Spacing
        "px-2.5 py-1.5 min-w-[2rem]",
        "text-sm",
        // Shape
        "rounded-md",
        // Color
        "text-primary-500",
        // States
        "hover:bg-primary-300/20",
        "focus:outline-none focus:outline-offset-0 focus:ring-2 focus:ring-inset",
        "focus:ring-primary-500"
      ]
    }
  },
  acceptbutton: {
    root: {
      class: [
        "relative",
        // Alignments
        "items-center inline-flex text-center align-bottom justify-center",
        // Sizes & Spacing
        "px-2.5 py-1.5 min-w-[2rem]",
        "text-sm",
        // Shape
        "rounded-md",
        // Color
        "text-white",
        "bg-primary-500",
        "ring-1 ring-primary-500",
        // States
        "hover:bg-primary-600 hover:border-primary-600",
        "focus:outline-none focus:outline-offset-0 focus:ring-2 focus:ring-offset-current",
        "focus:ring-primary-500"
      ]
    }
  },
  transition: {
    enterFromClass: "opacity-0 scale-y-[0.8]",
    enterActiveClass: "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
    leaveActiveClass: "transition-opacity duration-100 ease-linear",
    leaveToClass: "opacity-0"
  }
};
const contextmenu = {
  root: {
    class: [
      // Sizing and Shape
      "min-w-[12rem]",
      "rounded-md",
      "shadow-md",
      // Spacing
      "p-1.5",
      // Colors
      "bg-surface-0",
      "text-surface-700"
    ]
  },
  menu: {
    class: [
      // Spacings and Shape
      "list-none",
      "m-0",
      "p-0",
      "outline-none"
    ]
  },
  menuitem: {
    class: "relative"
  },
  content: ({ context }) => ({
    class: [
      //Shape
      "rounded-md",
      //  Colors
      {
        "text-surface-500": !context.focused && !context.active,
        "text-surface-500 bg-surface-200": context.focused && !context.active,
        "text-surface-900 bg-surface-50": context.focused && context.active,
        "text-surface-900 bg-surface-50": !context.focused && context.active
      },
      // Hover States
      {
        "hover:bg-surface-50": !context.active,
        "hover:bg-surface-100 text-surface-900": context.active
      },
      // Transitions
      "transition-shadow",
      "duration-200",
      // Disabled
      { "opacity-60 pointer-events-none cursor-default": context.disabled }
    ]
  }),
  action: {
    class: [
      "relative",
      // Font
      "font-semibold",
      // Flexbox
      "flex",
      "items-center",
      // Spacing
      "py-2",
      "px-3",
      // Misc
      "no-underline",
      "overflow-hidden",
      "cursor-pointer",
      "select-none"
    ]
  },
  icon: {
    class: [
      // Spacing
      "mr-2",
      "leading-6",
      "text-sm"
    ]
  },
  label: {
    class: ["leading-6", "text-sm"]
  },
  submenu: ({ props }) => ({
    class: [
      // Size
      "w-full sm:w-48",
      // Spacing
      "p-1.5",
      "m-0",
      "list-none",
      // Shape
      "shadow-md",
      "rounded-md",
      // Position
      "static sm:absolute",
      "z-10",
      { "sm:absolute sm:left-full sm:top-0": props.level > 1 },
      // Color
      "bg-surface-0"
    ]
  }),
  submenuicon: {
    class: ["ml-auto"]
  },
  separator: {
    class: "border-t border-surface-200 my-1"
  },
  transition: {
    enterFromClass: "opacity-0",
    enterActiveClass: "transition-opacity duration-250"
  }
};
const datatable = {
  root: ({ props }) => ({
    class: [
      "relative",
      // Flex & Alignment
      { "flex flex-col": props.scrollable && props.scrollHeight === "flex" },
      // Size
      { "h-full": props.scrollable && props.scrollHeight === "flex" },
      // Shape
      "border-spacing-0 border-separate"
    ]
  }),
  loadingoverlay: {
    class: [
      // Position
      "absolute",
      "top-0 left-0",
      "z-20",
      // Flex & Alignment
      "flex items-center justify-center",
      // Size
      "w-full h-full",
      // Color
      "bg-surface-100/40",
      // Transition
      "transition duration-200"
    ]
  },
  loadingicon: {
    class: "w-8 h-8 animate-spin"
  },
  wrapper: ({ props }) => ({
    class: [
      {
        relative: props.scrollable,
        "flex flex-col grow": props.scrollable && props.scrollHeight === "flex"
      },
      // Size
      { "h-full": props.scrollable && props.scrollHeight === "flex" }
    ]
  }),
  header: ({ props }) => ({
    class: [
      "font-semibold",
      // Shape
      props.showGridlines ? "border-b" : "border-b border-x-0",
      // Spacing
      "py-3.5 px-3",
      // Color
      "bg-surface-0",
      "border-surface-300",
      "text-surface-700"
    ]
  }),
  table: {
    class: "w-full border-spacing-0 border-separate"
  },
  thead: ({ context }) => ({
    class: [
      {
        "top-0 z-40 sticky": context.scrollable
      }
    ]
  }),
  tbody: ({ instance, context }) => ({
    class: [
      "border-t border-surface-300",
      {
        "sticky z-20 font-semibold": instance.frozenRow && context.scrollable
      }
    ]
  }),
  tfoot: ({ context }) => ({
    class: [
      {
        "bottom-0 z-0": context.scrollable
      }
    ]
  }),
  footer: {
    class: [
      "font-semibold",
      // Shape
      "border-t-0 border-t border-x-0",
      // Spacing
      "p-4",
      // Color
      "bg-surface-0",
      "border-surface-200",
      "text-surface-700"
    ]
  },
  column: {
    headercell: ({ context, props }) => ({
      class: [
        "font-semibold",
        "text-sm",
        // Position
        { "sticky z-20 border-b": props.frozen || props.frozen === "" },
        { relative: context.resizable },
        // Alignment
        "text-left",
        // Shape
        { "border-r last:border-r-0": context == null ? void 0 : context.showGridlines },
        "border-0 border-b border-solid",
        // Spacing
        (context == null ? void 0 : context.size) === "small" ? "py-2.5 px-2" : (context == null ? void 0 : context.size) === "large" ? "py-5 px-4" : "py-3.5 px-3",
        // Color
        (props.sortable === "" || props.sortable) && context.sorted ? "text-primary-500" : "bg-surface-0 text-surface-700",
        "border-surface-200",
        // States
        "focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500",
        // Transition
        { "transition duration-200": props.sortable === "" || props.sortable },
        // Misc
        { "cursor-pointer": props.sortable === "" || props.sortable },
        {
          "overflow-hidden space-nowrap bg-clip-padding": context.resizable
        }
      ]
    }),
    headercontent: {
      class: "flex items-center"
    },
    sort: ({ context }) => ({
      class: [context.sorted ? "text-primary-500" : "text-surface-700"]
    }),
    bodycell: ({ props, context, state, parent }) => ({
      class: [
        //Position
        { "sticky box-border border-b": parent.instance.frozenRow },
        { "sticky box-border border-b": props.frozen || props.frozen === "" },
        "text-sm",
        // Alignment
        "text-left",
        "border-0 border-b border-solid",
        { "last:border-r-0 border-r border-b": context == null ? void 0 : context.showGridlines },
        {
          "bg-surface-0": parent.instance.frozenRow || props.frozen || props.frozen === ""
        },
        // Spacing
        { "py-2.5 px-2": (context == null ? void 0 : context.size) === "small" && !state["d_editing"] },
        { "py-5 px-4": (context == null ? void 0 : context.size) === "large" && !state["d_editing"] },
        {
          "py-3.5 px-3": (context == null ? void 0 : context.size) !== "large" && (context == null ? void 0 : context.size) !== "small" && !state["d_editing"]
        },
        { "py-[0.6rem] px-2": state["d_editing"] },
        // Color
        "border-surface-200",
        // Misc
        "space-nowrap"
      ]
    }),
    footercell: ({ context }) => ({
      class: [
        // Font
        "font-bold",
        // Alignment
        "text-left",
        // Shape
        { "border-r last:border-r-0": context == null ? void 0 : context.showGridlines },
        "border-0 border-t border-solid",
        // Spacing
        (context == null ? void 0 : context.size) === "small" ? "p-2" : (context == null ? void 0 : context.size) === "large" ? "p-5" : "p-4",
        // Color
        "border-surface-200",
        "text-surface-700",
        "bg-surface-0"
      ]
    }),
    sorticon: {
      class: "ml-2"
    },
    sortbadge: {
      class: [
        // Flex & Alignment
        "flex items-center justify-center align-middle",
        // Shape
        "rounded-full",
        // Size
        "w-[1.143rem] leading-[1.143rem]",
        // Spacing
        "ml-2",
        // Color
        "text-primary-700",
        "bg-primary-50"
      ]
    },
    columnfilter: {
      class: "inline-flex items-center ml-auto"
    },
    filteroverlay: {
      class: [
        // Position
        "absolute top-0 left-0",
        "mt-2",
        // Shape
        "border-0",
        "rounded-md",
        "shadow-md",
        // Size
        "min-w-[12.5rem]",
        // Color
        "bg-surface-0",
        "text-surface-800",
        "ring-1 ring-inset ring-surface-300"
      ]
    },
    filtermatchmodedropdown: {
      root: ({ state }) => ({
        class: [
          // Display and Position
          "flex",
          "relative",
          // Spacing
          "mb-2",
          // Shape
          "w-full",
          "rounded-md",
          "shadow-sm",
          // Color and Background
          "bg-surface-0",
          {
            "ring-1 ring-inset ring-surface-300": !state.focused
          },
          // Transitions
          "transition-all",
          "duration-200",
          // States
          {
            "outline-none outline-offset-0 ring-2 ring-primary-500": state.focused
          },
          // Misc
          "cursor-default",
          "select-none"
        ]
      }),
      input: ({ props }) => ({
        class: [
          //Font
          "font-sans",
          "leading-6",
          "sm:text-sm",
          // Display
          "block",
          "flex-auto",
          // Color and Background
          "bg-transparent",
          "border-0",
          {
            "text-surface-800": props.modelValue,
            "text-surface-400": !props.modelValue
          },
          "placeholder:text-surface-400",
          "py-1.5 px-3",
          //Shape
          "rounded-none",
          // Transitions
          "transition",
          "duration-200",
          // States
          "focus:outline-none focus:shadow-none",
          // Misc
          "relative",
          "cursor-pointer",
          "overflow-hidden overflow-ellipsis",
          "whitespace-nowrap",
          "appearance-none"
        ]
      })
    },
    filterrowitems: {
      class: "py-1 list-none m-0"
    },
    filterrowitem: ({ context }) => ({
      class: [
        // Font
        "sm:text-sm",
        "leading-none",
        {
          "font-normal": !(context == null ? void 0 : context.highlighted),
          "font-bold": context == null ? void 0 : context.highlighted
        },
        // Position
        "relative",
        // Shape
        "border-0",
        "rounded-none",
        // Spacing
        "m-0",
        "py-2 px-4",
        // Color
        { "text-surface-700": !(context == null ? void 0 : context.highlighted) },
        {
          "bg-surface-0 text-surface-700": !(context == null ? void 0 : context.highlighted)
        },
        {
          "bg-primary-500 text-white": context == null ? void 0 : context.highlighted
        },
        //States
        "hover:bg-primary-500 hover:text-white",
        "focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500",
        // Transitions
        "transition-shadow",
        "duration-200",
        // Misc
        "cursor-pointer",
        "overflow-hidden",
        "whitespace-nowrap"
      ]
    }),
    filteroperator: {
      class: [
        // Spacing
        "p-4",
        // Shape
        "border-b border-solid",
        "rounded-t-md",
        // Color
        "text-surface-700",
        "border-surface-200"
      ]
    },
    filteroperatordropdown: {
      root: ({ state }) => ({
        class: [
          // Display and Position
          "flex",
          "relative",
          // Shape
          "w-full",
          "rounded-md",
          "shadow-sm",
          // Color and Background
          "text-surface-800",
          "placeholder:text-surface-400",
          "bg-surface-0",
          {
            "ring-1 ring-inset ring-surface-300": !state.focused
          },
          // Transitions
          "transition-all",
          "duration-200",
          // States
          {
            "outline-none outline-offset-0 ring-2 ring-primary-500": state.focused
          },
          // Misc
          "cursor-default",
          "select-none"
        ]
      }),
      input: {
        class: [
          //Font
          "font-sans",
          "leading-6",
          "sm:text-sm",
          // Display
          "block",
          "flex-auto",
          // Color and Background
          "bg-transparent",
          "border-0",
          "text-surface-800",
          "placeholder:text-surface-400",
          "py-1.5 px-3",
          //Shape
          "rounded-none",
          // Transitions
          "transition",
          "duration-200",
          // States
          "focus:outline-none focus:shadow-none",
          // Misc
          "relative",
          "cursor-pointer",
          "overflow-hidden overflow-ellipsis",
          "whitespace-nowrap",
          "appearance-none"
        ]
      },
      trigger: {
        class: [
          // Flexbox
          "flex items-center justify-center",
          "shrink-0",
          // Color and Background
          "bg-transparent",
          "text-surface-500",
          // Size
          "w-12",
          // Shape
          "rounded-tr-md",
          "rounded-br-md"
        ]
      },
      panel: {
        class: [
          // Position
          "absolute top-0 left-0",
          "mt-2",
          // Shape
          "border-0",
          "rounded-md",
          "shadow-md",
          // Size
          "min-w-[12.5rem]",
          // Color
          "bg-surface-0",
          "text-surface-800",
          "ring-1 ring-inset ring-surface-300"
        ]
      },
      list: {
        class: "py-1 list-none m-0"
      },
      item: ({ context }) => ({
        class: [
          // Font
          "sm:text-sm",
          "leading-none",
          {
            "font-normal": !(context == null ? void 0 : context.highlighted),
            "font-bold": context == null ? void 0 : context.highlighted
          },
          // Position
          "relative",
          // Shape
          "border-0",
          "rounded-none",
          // Spacing
          "m-0",
          "py-2 px-4",
          // Color
          { "text-surface-700": !(context == null ? void 0 : context.highlighted) },
          {
            "bg-surface-0 text-surface-700": !(context == null ? void 0 : context.highlighted)
          },
          {
            "bg-primary-500 text-white": context == null ? void 0 : context.highlighted
          },
          //States
          "hover:bg-primary-500 hover:text-white",
          // Transitions
          "transition-shadow",
          "duration-200",
          // Misc
          "cursor-pointer",
          "overflow-hidden",
          "whitespace-nowrap"
        ]
      })
    },
    filterconstraint: {
      class: [
        // Spacing
        "p-4",
        // Shape
        "border-b border-solid",
        // Color
        "border-surface-200"
      ]
    },
    filteraddrule: {
      class: "pt-4 pb-2 px-4"
    },
    filteraddrulebutton: {
      root: {
        class: [
          "relative",
          // Alignments
          "items-center inline-flex text-center align-bottom justify-center",
          // Sizes & Spacing
          "text-sm px-2.5 py-1.5 min-w-[2rem] w-full",
          // Shape
          "rounded-md",
          "bg-transparent border-transparent",
          "text-primary-500",
          "hover:bg-primary-300/20",
          "focus:outline-none focus:outline-offset-0 focus:ring-2 focus:ring-offset-current",
          "focus:ring-primary-500",
          // Transitions
          "transition duration-200 ease-in-out",
          // Misc
          "cursor-pointer overflow-hidden select-none"
        ]
      },
      label: {
        class: "flex-auto grow-0"
      },
      icon: {
        class: "mr-2"
      }
    },
    filterremovebutton: {
      root: {
        class: [
          "relative",
          // Alignments
          "items-center inline-flex text-center align-bottom justify-center",
          // Sizes & Spacing
          "text-sm px-2.5 py-1.5 min-w-[2rem] w-full mt-2",
          // Shape
          "rounded-md",
          "bg-transparent border-transparent",
          "text-red-500",
          "hover:bg-red-300/20",
          "focus:outline-none focus:outline-offset-0 focus:ring-2 focus:ring-offset-current",
          "focus:ring-red-500",
          // Transitions
          "transition duration-200 ease-in-out",
          // Misc
          "cursor-pointer overflow-hidden select-none"
        ]
      },
      label: {
        class: "flex-auto grow-0"
      },
      icon: {
        class: "mr-2"
      }
    },
    filterbuttonbar: {
      class: [
        // Flex & Alignment
        "flex items-center justify-between",
        // Space
        "py-4 px-4"
      ]
    },
    filterclearbutton: {
      root: {
        class: [
          "relative",
          // Alignments
          "items-center inline-flex text-center align-bottom justify-center",
          // Sizes & Spacing
          "text-sm px-2.5 py-1.5 min-w-[2rem]",
          // Shape
          "rounded-md shadow-sm border-0",
          "text-primary-500 ring-1 ring-primary-500 hover:bg-primary-300/20",
          "hover:bg-primary-300/20",
          "focus:ring-primary-500",
          // Transitions
          "transition duration-200 ease-in-out",
          // Misc
          "cursor-pointer overflow-hidden select-none"
        ]
      }
    },
    filterapplybutton: {
      root: {
        class: [
          "relative",
          // Alignments
          "items-center inline-flex text-center align-bottom justify-center",
          // Sizes & Spacing
          "text-sm px-2.5 py-1.5 min-w-[2rem]",
          // Shape
          "rounded-md border-0",
          "text-white",
          "bg-primary-500",
          "ring-1 ring-primary-500",
          "hover:bg-primary-600 hover:ring-primary-600",
          "focus:ring-primary-500",
          // Transitions
          "transition duration-200 ease-in-out",
          // Misc
          "cursor-pointer overflow-hidden select-none"
        ]
      }
    },
    filtermenubutton: ({ context }) => ({
      class: [
        "relative",
        // Flex & Alignment
        "inline-flex items-center justify-center",
        // Size
        "w-8 h-8",
        // Spacing
        "ml-2",
        // Shape
        "rounded-full",
        // Color
        { "bg-primary-50 text-primary-700": context.active },
        // States
        "hover:text-surface-700 hover:bg-surface-300/20",
        "focus:outline-none focus:outline-offset-0 focus:ring-2 focus:ring-inset focus:ring-primary-500",
        // Transition
        "transition duration-200",
        // Misc
        "cursor-pointer no-underline overflow-hidden"
      ]
    }),
    headerfilterclearbutton: ({ context }) => ({
      class: [
        "relative",
        // Flex & Alignment
        "inline-flex items-center justify-center",
        "text-left",
        // Shape
        "border-none",
        // Spacing
        "m-0 p-0 ml-2",
        // Color
        "bg-transparent",
        // Misc
        "cursor-pointer no-underline overflow-hidden select-none",
        {
          invisible: !context.hidden
        }
      ]
    }),
    rowtoggler: {
      class: [
        "relative",
        // Flex & Alignment
        "inline-flex items-center justify-center",
        "text-left",
        // Spacing
        "m-0 p-0",
        // Size
        "w-8 h-8",
        // Shape
        "border-0 rounded-full",
        // Color
        "text-surface-500",
        "bg-transparent",
        "focus-visible:outline-none focus-visible:outline-offset-0",
        "focus-visible:ring-2 focus-visible:ring-primary-500",
        // Transition
        "transition duration-200",
        // Misc
        "overflow-hidden",
        "cursor-pointer select-none"
      ]
    },
    columnresizer: {
      class: [
        "block",
        // Position
        "absolute top-0 right-0",
        // Sizing
        "w-2 h-full",
        // Spacing
        "m-0 p-0",
        // Color
        "border border-transparent",
        // Misc
        "cursor-col-resize"
      ]
    },
    rowreordericon: {
      class: "cursor-move"
    },
    roweditorinitbutton: {
      class: [
        "relative",
        // Flex & Alignment
        "inline-flex items-center justify-center",
        "text-left",
        // Size
        "w-8 h-8",
        // Shape
        "border-0 rounded-full",
        // Color
        "text-surface-700",
        "border-transparent",
        // States
        "focus:outline-none focus:outline-offset-0 focus:ring-2 focus:ring-inset focus:ring-primary-500",
        "hover:text-surface-700 hover:bg-surface-300/20",
        // Transition
        "transition duration-200",
        // Misc
        "overflow-hidden",
        "cursor-pointer select-none"
      ]
    },
    roweditorsavebutton: {
      class: [
        "relative",
        // Flex & Alignment
        "inline-flex items-center justify-center",
        "text-left",
        // Size
        "w-8 h-8",
        // Shape
        "border-0 rounded-full",
        // Color
        "text-surface-700",
        "border-transparent",
        // States
        "focus:outline-none focus:outline-offset-0 focus:ring-2 focus:ring-inset focus:ring-primary-500",
        "hover:text-surface-700 hover:bg-surface-300/20",
        // Transition
        "transition duration-200",
        // Misc
        "overflow-hidden",
        "cursor-pointer select-none"
      ]
    },
    roweditorcancelbutton: {
      class: [
        "relative",
        // Flex & Alignment
        "inline-flex items-center justify-center",
        "text-left",
        // Size
        "w-8 h-8",
        // Shape
        "border-0 rounded-full",
        // Color
        "text-surface-700",
        "border-transparent",
        // States
        "focus:outline-none focus:outline-offset-0 focus:ring-2 focus:ring-inset focus:ring-primary-500",
        "hover:text-surface-700 hover:bg-surface-300/20",
        // Transition
        "transition duration-200",
        // Misc
        "overflow-hidden",
        "cursor-pointer select-none"
      ]
    },
    radiobuttonwrapper: {
      class: [
        "relative",
        // Flex & Alignment
        "inline-flex align-bottom",
        // Size
        "w-4 h-4",
        // Misc
        "cursor-pointer select-none"
      ]
    },
    rowRadioButton: {
      root: {
        class: [
          "relative",
          // Flexbox & Alignment
          "inline-flex",
          "align-bottom",
          // Size
          "w-4 h-4",
          // Misc
          "cursor-default",
          "select-none"
        ]
      },
      box: ({ props }) => ({
        class: [
          // Flexbox
          "flex justify-center items-center",
          // Size
          "w-4 h-4",
          "text-sm",
          "font-medium",
          // Shape
          "border-2",
          "rounded-full",
          // Transition
          "transition duration-200 ease-in-out",
          // Colors
          {
            "text-surface-700": !props.modelValue,
            "bg-surface-0": !props.modelValue,
            "border-surface-300": !props.modelValue,
            "border-primary-500": props.modelValue
          },
          // States
          {
            "outline-none outline-offset-0": !props.disabled,
            "peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-surface-0 peer-focus-visible:ring-primary-500": !props.disabled,
            "opacity-60 cursor-default": props.disabled
          }
        ]
      }),
      input: {
        class: [
          "peer",
          // Size
          "w-full ",
          "h-full",
          // Position
          "absolute",
          "top-0 left-0",
          "z-10",
          // Spacing
          "p-0",
          "m-0",
          // Shape
          "opacity-0",
          "rounded-md",
          "outline-none",
          "border-2 border-surface-300",
          // Misc
          "appearance-none",
          "cursor-default"
        ]
      },
      icon: {
        class: "hidden"
      }
    },
    headerCheckbox: {
      root: {
        class: [
          "relative",
          // Alignment
          "inline-flex",
          "align-bottom",
          // Size
          "w-4",
          "h-4",
          // Misc
          "cursor-default",
          "select-none"
        ]
      },
      box: ({ props, context }) => ({
        class: [
          // Alignment
          "flex",
          "items-center",
          "justify-center",
          // Size
          "w-4",
          "h-4",
          // Shape
          "rounded",
          "border",
          // Colors
          "text-surface-600",
          {
            "border-surface-300 bg-surface-0": !context.checked,
            "border-primary-500 bg-primary-500": context.checked
          },
          {
            "ring-2 ring-primary-500": !props.disabled && context.focused,
            "cursor-default opacity-60": props.disabled
          },
          // States
          {
            "peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500": !props.disabled,
            "cursor-default opacity-60": props.disabled
          },
          // Transitions
          "transition-colors",
          "duration-200"
        ]
      }),
      input: {
        class: [
          "peer",
          // Size
          "w-full ",
          "h-full",
          // Position
          "absolute",
          "top-0 left-0",
          "z-10",
          // Spacing
          "p-0",
          "m-0",
          // Shape
          "rounded",
          "border",
          // Shape
          "opacity-0",
          "rounded-md",
          "outline-none",
          "border-2 border-surface-300",
          // Misc
          "appearance-none"
        ]
      },
      icon: {
        class: [
          // Font
          "text-normal",
          // Size
          "w-3",
          "h-3",
          // Colors
          "text-white",
          // Transitions
          "transition-all",
          "duration-200"
        ]
      }
    },
    rowCheckbox: {
      root: {
        class: [
          "relative",
          // Alignment
          "inline-flex",
          "align-bottom",
          // Size
          "w-4",
          "h-4",
          // Misc
          "cursor-default",
          "select-none"
        ]
      },
      box: ({ props, context }) => ({
        class: [
          // Alignment
          "flex",
          "items-center",
          "justify-center",
          // Size
          "w-4",
          "h-4",
          // Shape
          "rounded",
          "border",
          // Colors
          "text-surface-600",
          {
            "border-surface-300 bg-surface-0": !context.checked,
            "border-primary-500 bg-primary-500": context.checked
          },
          {
            "ring-2 ring-primary-500": !props.disabled && context.focused,
            "cursor-default opacity-60": props.disabled
          },
          // States
          {
            "peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500": !props.disabled,
            "cursor-default opacity-60": props.disabled
          },
          // Transitions
          "transition-colors",
          "duration-200"
        ]
      }),
      input: {
        class: [
          "peer",
          // Size
          "w-full ",
          "h-full",
          // Position
          "absolute",
          "top-0 left-0",
          "z-10",
          // Spacing
          "p-0",
          "m-0",
          // Shape
          "rounded",
          "border",
          // Shape
          "opacity-0",
          "rounded-md",
          "outline-none",
          "border-2 border-surface-300",
          // Misc
          "appearance-none"
        ]
      },
      icon: {
        class: [
          // Font
          "text-normal",
          // Size
          "w-3",
          "h-3",
          // Colors
          "text-white",
          // Transitions
          "transition-all",
          "duration-200"
        ]
      }
    },
    transition: {
      enterFromClass: "opacity-0 scale-y-[0.8]",
      enterActiveClass: "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
      leaveActiveClass: "transition-opacity duration-100 ease-linear",
      leaveToClass: "opacity-0"
    }
  },
  bodyrow: ({ context, props }) => ({
    class: [
      // Color
      {
        "bg-surface-100": context.selected && context.stripedRows
      },
      {
        "bg-surface-50": context.selected && !context.stripedRows
      },
      {
        "bg-surface-0 text-surface-600": !context.selected
      },
      { "bg-surface-0": props.frozenRow },
      {
        "odd:bg-surface-0 odd:text-surface-600 even:bg-surface-50 even:text-surface-600": context.stripedRows && !context.selected
      },
      // State
      {
        "focus:outline-none focus:outline-offset-0 focus:ring-2 focus:ring-primary-500 ring-inset": props.selectionMode
      },
      {
        "hover:bg-surface-300/20 hover:text-surface-600": props.selectionMode && !context.selected
      },
      // Transition
      {
        "transition duration-200": props.selectionMode && !context.selected || props.rowHover
      },
      // Misc
      { "cursor-pointer": props.selectionMode }
    ]
  }),
  rowexpansion: {
    class: "bg-surface-0 text-surface-600"
  },
  rowgroupheader: {
    class: ["sticky z-20", "bg-surface-0 text-surface-600"]
  },
  rowgroupfooter: {
    class: ["sticky z-20", "bg-surface-0 text-surface-600"]
  },
  rowgrouptoggler: {
    class: [
      "relative",
      // Flex & Alignment
      "inline-flex items-center justify-center",
      "text-left",
      // Spacing
      "m-0 p-0",
      // Size
      "w-8 h-8",
      // Shape
      "border-0 rounded-full",
      // Color
      "text-surface-500",
      "bg-transparent",
      "focus-visible:outline-none focus-visible:outline-offset-0",
      "focus-visible:ring-2 focus-visible:ring-primary-500",
      // Transition
      "transition duration-200",
      // Misc
      "overflow-hidden",
      "cursor-pointer select-none"
    ]
  },
  rowgrouptogglericon: {
    class: "inline-block w-4 h-4"
  },
  resizehelper: {
    class: "absolute hidden w-[2px] z-20 bg-primary-500"
  }
};
const dataview = {
  content: {
    class: [
      // Spacing
      "p-0",
      // Shape
      "border-0",
      // Color
      "text-surface-700",
      "bg-surface-0"
    ]
  },
  grid: {
    class: [
      // flex
      "flex flex-wrap",
      // Spacing
      "ml-0 mr-0 mt-0",
      // Color
      "bg-surface-0"
    ]
  },
  header: {
    class: [
      "font-semibold",
      // Spacing
      "p-6",
      // Color
      "text-surface-800",
      "bg-surface-0",
      "border-surface-200 border-b"
    ]
  }
};
const dataviewlayoutoptions = {
  listbutton: ({ props }) => ({
    class: [
      // Font
      "leading-none",
      // Flex Alignment
      "inline-flex items-center align-bottom text-center",
      // Shape
      "rounded-md rounded-r-none",
      // Spacing
      "px-2.5 py-1.5",
      // Color
      "ring-1 ring-surface-200",
      props.modelValue === "list" ? "bg-surface-100 text-surface-700" : "bg-surface-0 text-surface-700",
      // States
      "focus:outline-none focus:outline-offset-0 focus:ring-primary-500",
      "hover:bg-surface-200",
      // Transition
      "transition duration-200",
      // Misc
      "cursor-pointer select-none overflow-hidden"
    ]
  }),
  gridbutton: ({ props }) => ({
    class: [
      // Font
      "leading-none",
      // Flex Alignment
      "inline-flex items-center align-bottom text-center",
      // Shape
      "rounded-md rounded-l-none",
      // Spacing
      "px-2.5 py-1.5",
      // Color
      "ring-1 ring-surface-200",
      props.modelValue === "grid" ? "bg-surface-100 text-surface-700" : "bg-surface-0 text-surface-700",
      // States
      "focus:outline-none focus:outline-offset-0 focus:ring-primary-500",
      "hover:bg-surface-200",
      // Transition
      "transition duration-200",
      // Misc
      "cursor-pointer select-none overflow-hidden"
    ]
  })
};
const deferred = {
  root: {}
};
const dialog = {
  root: ({ state }) => ({
    class: [
      // Shape
      "rounded-lg",
      "shadow-xl",
      "border-0",
      // Size
      "max-h-[90vh]",
      { "sm:w-full sm:max-w-lg": !state.maximized },
      "m-0",
      // Transitions
      "transform",
      "scale-100",
      // Maximized State
      {
        "transition-none": state.maximized,
        "transform-none": state.maximized,
        "!w-screen": state.maximized,
        "!h-screen": state.maximized,
        "!max-h-full": state.maximized,
        "!top-0": state.maximized,
        "!left-0": state.maximized
      }
    ]
  }),
  header: {
    class: [
      // Flexbox and Alignment
      "flex items-center justify-between",
      "shrink-0",
      // Spacing
      "p-6 pt-4",
      // Shape
      "rounded-tl-lg",
      "rounded-tr-lg",
      // Colors
      "bg-surface-0",
      "text-surface-700"
    ]
  },
  title: {
    class: ["font-semibold text-base leading-6"]
  },
  icons: {
    class: ["flex items-center"]
  },
  closeButton: {
    class: [
      "relative",
      // Flexbox and Alignment
      "flex items-center justify-center",
      // Size and Spacing
      "mr-2",
      "last:mr-0",
      "w-6 h-6",
      // Shape
      "border-0",
      "rounded-full",
      // Colors
      "text-surface-500",
      "bg-transparent",
      // Transitions
      "transition duration-200 ease-in-out",
      // States
      "hover:text-surface-700",
      "hover:bg-surface-100",
      "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-inset",
      "focus:ring-primary-500",
      // Misc
      "overflow-hidden"
    ]
  },
  maximizablebutton: {
    class: [
      "relative",
      // Flexbox and Alignment
      "flex items-center justify-center",
      // Size and Spacing
      "mr-2",
      "last:mr-0",
      "w-6 h-6",
      // Shape
      "border-0",
      "rounded-full",
      // Colors
      "text-surface-500",
      "bg-transparent",
      // Transitions
      "transition duration-200 ease-in-out",
      // States
      "hover:text-surface-700",
      "hover:bg-surface-100",
      "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-inset",
      "focus:ring-primary-500",
      // Misc
      "overflow-hidden"
    ]
  },
  closeButtonIcon: {
    class: [
      // Display
      "inline-block",
      // Size
      "w-3",
      "h-3"
    ]
  },
  maximizableicon: {
    class: [
      // Display
      "inline-block",
      // Size
      "w-3",
      "h-3"
    ]
  },
  content: ({ state, instance }) => ({
    class: [
      // Font
      "text-sm",
      // Spacing
      "px-6",
      "pb-3",
      "pt-0",
      // Shape
      {
        grow: state.maximized,
        "rounded-bl-lg": !instance.$slots.footer,
        "rounded-br-lg": !instance.$slots.footer
      },
      // Colors
      "bg-surface-0",
      "text-surface-600",
      // Misc
      "overflow-y-auto"
    ]
  }),
  footer: {
    class: [
      // Flexbox and Alignment
      "flex items-center justify-end",
      "shrink-0",
      "text-right",
      "gap-3",
      // Spacing
      "px-6",
      "py-3",
      // Shape
      "border-t-0",
      "rounded-b-lg",
      // Colors
      "bg-surface-50",
      "text-surface-700"
    ]
  },
  mask: ({ props }) => ({
    class: [
      // Transitions
      "transition",
      "duration-300",
      { "p-5": !props.position == "full" },
      // Background and Effects
      {
        "has-[.mask-active]:bg-transparent bg-surface-500/70 ": props.modal,
        "has-[.mask-active]:backdrop-blur-none backdrop-blur-sm": props.modal
      }
    ]
  }),
  transition: ({ props }) => {
    return props.position === "top" ? {
      enterFromClass: "opacity-0 scale-75 translate-x-0 -translate-y-full translate-z-0 mask-active",
      enterActiveClass: "transition-all duration-200 ease-out",
      leaveActiveClass: "transition-all duration-200 ease-out",
      leaveToClass: "opacity-0 scale-75 translate-x-0 -translate-y-full translate-z-0 mask-active"
    } : props.position === "bottom" ? {
      enterFromClass: "opacity-0 scale-75 translate-y-full mask-active",
      enterActiveClass: "transition-all duration-200 ease-out",
      leaveActiveClass: "transition-all duration-200 ease-out",
      leaveToClass: "opacity-0 scale-75 translate-x-0 translate-y-full translate-z-0 mask-active"
    } : props.position === "left" || props.position === "topleft" || props.position === "bottomleft" ? {
      enterFromClass: "opacity-0 scale-75 -translate-x-full translate-y-0 translate-z-0 mask-active",
      enterActiveClass: "transition-all duration-200 ease-out",
      leaveActiveClass: "transition-all duration-200 ease-out",
      leaveToClass: "opacity-0 scale-75  -translate-x-full translate-y-0 translate-z-0 mask-active"
    } : props.position === "right" || props.position === "topright" || props.position === "bottomright" ? {
      enterFromClass: "opacity-0 scale-75 translate-x-full translate-y-0 translate-z-0 mask-active",
      enterActiveClass: "transition-all duration-200 ease-out",
      leaveActiveClass: "transition-all duration-200 ease-out",
      leaveToClass: "opacity-0 scale-75 opacity-0 scale-75 translate-x-full translate-y-0 translate-z-0 mask-active"
    } : {
      enterFromClass: "opacity-0 scale-75 mask-active",
      enterActiveClass: "transition-all duration-200 ease-out",
      leaveActiveClass: "transition-all duration-200 ease-out",
      leaveToClass: "opacity-0 scale-75 mask-active"
    };
  }
};
const divider = {
  root: ({ props }) => ({
    class: [
      // Flex and Position
      "flex relative",
      { "justify-center": props.layout == "vertical" },
      { "items-center": props.layout == "vertical" },
      {
        "justify-start": (props == null ? void 0 : props.align) == "left" && props.layout == "horizontal",
        "justify-center": (props == null ? void 0 : props.align) == "center" && props.layout == "horizontal",
        "justify-end": (props == null ? void 0 : props.align) == "right" && props.layout == "horizontal",
        "items-center": (props == null ? void 0 : props.align) == "top" && props.layout == "vertical",
        "items-start": (props == null ? void 0 : props.align) == "center" && props.layout == "vertical",
        "items-end": (props == null ? void 0 : props.align) == "bottom" && props.layout == "vertical"
      },
      // Spacing
      {
        "my-5 mx-0 py-0 px-5": props.layout == "horizontal",
        "mx-4 md:mx-5 py-5": props.layout == "vertical"
      },
      // Size
      {
        "w-full": props.layout == "horizontal",
        "min-h-full": props.layout == "vertical"
      },
      // Before: Line
      "before:block",
      // Position
      {
        "before:absolute before:left-0 before:top-1/2": props.layout == "horizontal",
        "before:absolute before:left-1/2 before:top-0 before:transform before:-translate-x-1/2": props.layout == "vertical"
      },
      // Size
      {
        "before:w-full": props.layout == "horizontal",
        "before:min-h-full": props.layout == "vertical"
      },
      // Shape
      {
        "before:border-solid": props.type == "solid",
        "before:border-dotted": props.type == "dotted",
        "before:border-dashed": props.type == "dashed"
      },
      // Color
      {
        "before:border-t before:border-surface-200": props.layout == "horizontal",
        "before:border-l before:border-surface-200": props.layout == "vertical"
      }
    ]
  }),
  content: {
    class: [
      // Space and Position
      "p-2 z-10",
      // Color
      "bg-surface-0"
    ]
  }
};
const dock = {
  root: ({ props }) => ({
    class: [
      // Positioning
      "absolute z-1",
      {
        "left-0 bottom-0 w-full": props.position == "bottom",
        "left-0 top-0 w-full": props.position == "top",
        "left-0 top-0 h-full": props.position == "left",
        "right-0 top-0 h-full": props.position == "right"
      },
      // Flexbox & Alignment
      "flex justify-center items-center",
      // Interactivity
      "pointer-events-none"
    ]
  }),
  container: {
    class: [
      // Flexbox
      "flex",
      // Shape & Border
      "rounded-md",
      // Color
      "bg-surface-0/10 border border-surface-0/20",
      "backdrop-blur-sm",
      // Spacing
      "p-2",
      // Misc
      "pointer-events-auto"
    ]
  },
  menu: ({ props }) => ({
    class: [
      // Flexbox & Alignment
      "flex items-center justify-center",
      {
        "flex-col": props.position == "left" || props.position == "right"
      },
      // List Style
      "m-0 p-0 list-none",
      // Shape
      "outline-none"
    ]
  }),
  menuitem: ({ props, context, instance }) => ({
    class: [
      // Spacing & Shape
      "p-2 rounded-md",
      // Conditional Scaling
      {
        "hover:scale-150": instance.currentIndex === context.index,
        "scale-125": instance.currentIndex - 1 === context.index || instance.currentIndex + 1 === context.index,
        "scale-110": instance.currentIndex - 2 === context.index || instance.currentIndex + 2 === context.index
      },
      // Positioning & Hover States
      {
        "origin-bottom hover:mx-6": props.position == "bottom",
        "origin-top hover:mx-6": props.position == "top",
        "origin-left hover:my-6": props.position == "left",
        "origin-right hover:my-6": props.position == "right"
      },
      // Transitions & Transform
      "transition-all duration-200 ease-cubic-bezier-will-change-transform transform"
    ]
  }),
  action: {
    class: [
      // Flexbox & Alignment
      "flex flex-col items-center justify-center",
      // Position
      "relative",
      // Size
      "w-16 h-16",
      // Misc
      "cursor-default overflow-hidden"
    ]
  }
};
const dropdown = {
  root: ({ props, state }) => ({
    class: [
      // Display and Position
      "inline-flex",
      "relative",
      // Shape
      "rounded-md",
      "shadow-sm",
      // Color and Background
      "bg-surface-0",
      // States
      {
        "ring-1 ring-inset": !state.focused,
        "ring-2 ring-inset ring-primary-500": state.focused
      },
      {
        "ring-surface-300": !props.invalid && !state.focused
      },
      // Invalid State
      { "ring-red-500": props.invalid && !state.focused },
      // Misc
      "cursor-default",
      "select-none",
      { "opacity-60": props.disabled, "pointer-events-none": props.disabled }
    ]
  }),
  input: ({ props }) => ({
    class: [
      //Font
      "font-sans",
      "leading-6",
      "sm:text-sm",
      // Display
      "block",
      "flex-auto",
      // Color and Background
      "bg-transparent",
      "border-0",
      {
        "text-surface-800": props.modelValue != void 0,
        "text-surface-400": props.modelValue == void 0
      },
      "placeholder:text-surface-400",
      // Sizing and Spacing
      "w-[1%]",
      "py-1.5 px-3",
      { "pr-7": props.showClear },
      //Shape
      "rounded-none",
      // Transitions
      "transition",
      "duration-200",
      // States
      "focus:outline-none focus:shadow-none",
      // Misc
      "relative",
      "cursor-pointer",
      "overflow-hidden overflow-ellipsis",
      "whitespace-nowrap",
      "appearance-none"
    ]
  }),
  trigger: {
    class: [
      //Font
      "sm:text-sm",
      // Flexbox
      "flex items-center justify-center",
      "shrink-0",
      // Color and Background
      "bg-transparent",
      "text-surface-500",
      // Size
      "w-12",
      // Shape
      "rounded-tr-md",
      "rounded-br-md"
    ]
  },
  panel: {
    class: [
      // Position
      "absolute top-0 left-0",
      "mt-2",
      // Shape
      "border-0",
      "rounded-md",
      "shadow-md",
      // Color
      "bg-surface-0",
      "text-surface-800",
      "ring-1 ring-inset ring-surface-300"
    ]
  },
  wrapper: {
    class: [
      // Sizing
      "max-h-[15rem]",
      // Misc
      "overflow-auto"
    ]
  },
  list: {
    class: "py-1 list-none m-0"
  },
  item: ({ context }) => ({
    class: [
      // Font
      "sm:text-sm",
      "leading-none",
      { "font-normal": !context.selected, "font-bold": context.selected },
      // Position
      "relative",
      // Shape
      "border-0",
      "rounded-none",
      // Spacing
      "m-0",
      "py-2 px-4",
      // Color
      {
        "text-surface-700": !context.focused && !context.selected && !context.disabled
      },
      {
        "text-surface-600": !context.focused && !context.selected && context.disabled
      },
      {
        "bg-surface-200 text-surface-700": context.focused && !context.selected
      },
      {
        "bg-primary-500 text-white": context.focused && context.selected
      },
      {
        "bg-transparent text-surface-700": !context.focused && context.selected
      },
      //States
      "hover:bg-primary-500 hover:text-white",
      "focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500",
      // Misc
      { "pointer-events-none cursor-default": context.disabled },
      { "cursor-pointer": !context.disabled },
      "overflow-hidden",
      "whitespace-nowrap"
    ]
  }),
  itemgroup: {
    class: [
      //Font
      "font-bold",
      "sm:text-sm",
      // Spacing
      "m-0",
      "py-2 px-4",
      // Color
      "text-surface-800",
      "bg-surface-0",
      // Misc
      "cursor-auto"
    ]
  },
  emptymessage: {
    class: [
      // Font
      "leading-none",
      "sm:text-sm",
      // Spacing
      "py-2 px-4",
      // Color
      "text-surface-800",
      "bg-transparent"
    ]
  },
  header: {
    class: [
      // Spacing
      "p-0",
      "m-0",
      //Shape
      "rounded-tl-md",
      "rounded-tr-md",
      // Color
      "text-surface-700",
      "bg-surface-100"
    ]
  },
  filtercontainer: {
    class: "relative"
  },
  filterinput: {
    class: [
      // Font
      "font-sans",
      "leading-none",
      "sm:text-sm",
      // Sizing
      "py-1.5 px-3",
      "pr-7",
      "-mr-7",
      "w-full",
      //Color
      "text-surface-700",
      "bg-surface-0",
      "placeholder:text-surface-400",
      "ring-1 ring-inset ring-surface-300",
      // Shape
      "border-0",
      "rounded-tl-md",
      "rounded-tr-md",
      "appearance-none",
      // States
      "focus:ring-2 focus:ring-inset focus:outline-none focus:outline-offset-0",
      "focus:ring-primary-600",
      // Misc
      "appearance-none"
    ]
  },
  filtericon: {
    class: ["absolute", "top-1/2 right-3", "-mt-2"]
  },
  clearicon: {
    class: [
      // Color
      "text-surface-500",
      // Position
      "absolute",
      "top-1/2",
      "right-12",
      // Spacing
      "-mt-2"
    ]
  },
  transition: {
    enterFromClass: "opacity-0 scale-y-[0.8]",
    enterActiveClass: "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
    leaveActiveClass: "transition-opacity duration-100 ease-linear",
    leaveToClass: "opacity-0"
  }
};
const fieldset = {
  root: {
    class: [
      "block",
      // Spacing
      "px-5 md:px-6 py-5",
      // Shape
      "rounded-md rounded-lg",
      // Color
      "bg-surface-0",
      "text-surface-700",
      "ring-1 ring-inset ring-surface-300 ring-offset-0"
    ]
  },
  legend: ({ props }) => ({
    class: [
      // Font
      "font-medium",
      "leading-none",
      //Spacing
      { "p-0": props.toggleable, "px-3 py-1.5": !props.toggleable },
      // Shape
      "rounded-md",
      // Color
      "text-surface-700",
      "bg-surface-0",
      // Transition
      "transition-none",
      // States
      { "": props.toggleable },
      {
        "focus:outline-none focus:outline-offset-0 focus:ring-2 focus:ring-primary-600 ring-inset": props.toggleable
      }
    ]
  }),
  toggler: ({ props }) => ({
    class: [
      // Alignments
      "flex items-center justify-center",
      "relative",
      //Spacing
      { "px-3 py-1.5": props.toggleable },
      // Shape
      { "rounded-md": props.toggleable },
      // Color
      {
        "text-surface-700 hover:text-surface-900 hover:text-surface-900": props.toggleable
      },
      // States
      {
        "hover:text-surface-900": props.toggleable
      },
      {
        "focus:outline-none focus:outline-offset-0 focus:ring-2 focus:ring-inset focus:ring-primary-600": props.toggleable
      },
      // Misc
      {
        "transition-none cursor-pointer overflow-hidden select-none": props.toggleable
      }
    ]
  }),
  togglerIcon: {
    class: "mr-2 inline-block"
  },
  legendTitle: {
    class: "flex items-center justify-center leading-none"
  },
  content: {
    class: "p-0"
  },
  transition: {
    enterFromClass: "max-h-0",
    enterActiveClass: "overflow-hidden transition-[max-height] duration-1000 ease-[cubic-bezier(0.42,0,0.58,1)]",
    enterToClass: "max-h-[1000px]",
    leaveFromClass: "max-h-[1000px]",
    leaveActiveClass: "overflow-hidden transition-[max-height] duration-[450ms] ease-[cubic-bezier(0,1,0,1)]",
    leaveToClass: "max-h-0"
  }
};
const fileupload = {
  input: {
    class: "hidden"
  },
  buttonbar: {
    class: [
      // Flexbox
      "flex",
      "flex-wrap",
      // Colors
      "bg-surface-50",
      "text-surface-700",
      // Spacing
      "p-5",
      "gap-2",
      // Borders
      "border",
      "border-solid",
      "border-surface-200",
      "border-b-0",
      // Shape
      "rounded-tr-lg",
      "rounded-tl-lg"
    ]
  },
  chooseButton: {
    class: [
      "relative",
      // Alignments
      "items-center inline-flex text-center align-bottom justify-center",
      // Spacing
      "px-2.5 py-1.5",
      // Shape
      "rounded-md",
      // Font
      "text-sm",
      "font-semibold",
      // Colors
      "text-white",
      "bg-primary-500",
      "border-primary-500",
      // States
      "hover:bg-primary-600",
      // Misc
      "overflow-hidden",
      "cursor-pointer"
    ]
  },
  chooseIcon: {
    class: ["mr-2", "inline-block"]
  },
  chooseButtonLabel: {
    class: ["flex-1", "font-bold"]
  },
  uploadbutton: {
    icon: {
      class: "mr-2"
    }
  },
  cancelbutton: {
    icon: {
      class: "mr-2"
    }
  },
  content: {
    class: [
      // Position
      "relative",
      // Colors
      "bg-surface-0",
      "text-surface-700",
      // Spacing
      "p-8",
      // Borders
      "border",
      "border-surface-200",
      // Shape
      "rounded-b-lg"
    ]
  },
  file: {
    class: [
      // Flexbox
      "flex",
      "items-center",
      "flex-wrap",
      // Spacing
      "p-4",
      "mb-2",
      "last:mb-0",
      // Borders
      "border",
      "border-surface-200",
      "gap-2",
      // Shape
      "rounded"
    ]
  },
  thumbnail: {
    class: "shrink-0"
  },
  fileName: {
    class: "mb-2 break-all"
  },
  fileSize: {
    class: "mr-2"
  },
  uploadicon: {
    class: "mr-2"
  },
  progressbar: {
    root: {
      class: [
        // Position and Overflow
        "overflow-hidden",
        "absolute top-0 left-0",
        // Shape and Size
        "border-0",
        "h-2",
        "rounded-md",
        "w-full",
        // Colors
        "bg-surface-100"
      ]
    },
    value: {
      class: [
        // Flexbox & Overflow & Position
        "absolute flex items-center justify-center overflow-hidden",
        // Colors
        "bg-primary-500",
        // Spacing & Sizing
        "m-0",
        "h-full w-0",
        // Shape
        "border-0",
        // Transitions
        "transition-width duration-1000 ease-in-out"
      ]
    }
  }
};
const floatlabel = {
  root: {
    class: [
      "block relative",
      // Base Label Appearance
      "[&>*:last-child]:text-surface-900/60",
      "[&>*:last-child]:absolute",
      "[&>*:last-child]:top-1/2",
      "[&>*:last-child]:-translate-y-1/2",
      "[&>*:last-child]:left-3",
      "[&>*:last-child]:pointer-events-none",
      "[&>*:last-child]:transition-all",
      "[&>*:last-child]:duration-200",
      "[&>*:last-child]:ease",
      // Focus Label Appearance
      "[&>*:last-child]:has-[:focus]:-top-3",
      "[&>*:last-child]:has-[:focus]:text-sm",
      // Filled Input Label Appearance
      "[&>*:last-child]:has-[.filled]:-top-3",
      "[&>*:last-child]:has-[.filled]:text-sm"
    ]
  }
};
const galleria = {
  content: ({ parent, props }) => ({
    class: [
      "flex",
      {
        "flex-col": props.fullScreen
      },
      {
        "flex-col": parent.props.thumbnailsPosition === "top" || parent.props.thumbnailsPosition === "bottom",
        "flex-row": parent.props.thumbnailsPosition === "right" || parent.props.thumbnailsPosition === "left"
      }
    ]
  }),
  itemwrapper: ({ parent, props }) => ({
    class: [
      "group",
      "flex relative",
      {
        "grow shrink w-0 justify-center": props.fullScreen
      },
      {
        "flex-col": parent.props.indicatorsPosition === "bottom" || parent.props.indicatorsPosition === "top",
        "flex-row items-center": parent.props.indicatorsPosition === "left" || parent.props.indicatorsPosition === "right"
      },
      {
        "order-2": parent.props.thumbnailsPosition === "top" || parent.props.thumbnailsPosition === "left",
        "flex-row": parent.props.thumbnailsPosition === "right"
      }
    ]
  }),
  itemcontainer: ({ parent }) => ({
    class: [
      "flex h-full relative",
      {
        "order-1": parent.props.indicatorsPosition === "bottom" || parent.props.indicatorsPosition === "right",
        "order-2": parent.props.indicatorsPosition === "top" || parent.props.indicatorsPosition === "left"
      }
    ]
  }),
  item: {
    class: [
      // Flex
      "flex justify-center items-center h-full w-full",
      // Sizing
      "h-full w-full"
    ]
  },
  thumbnailwrapper: ({ parent }) => ({
    class: [
      // Flex
      "flex flex-col shrink-0",
      {
        "order-1": parent.props.thumbnailsPosition === "top" || parent.props.thumbnailsPosition === "left"
      },
      // Misc
      "overflow-auto"
    ]
  }),
  thumbnailcontainer: ({ parent }) => ({
    class: [
      // Flex
      "flex",
      // Spacing
      "p-4",
      // Colors
      "bg-black/90",
      {
        "flex-row": parent.props.thumbnailsPosition === "top" || parent.props.thumbnailsPosition === "bottom",
        "flex-col grow": parent.props.thumbnailsPosition === "right" || parent.props.thumbnailsPosition === "left"
      }
    ]
  }),
  previousthumbnailbutton: {
    class: [
      // Positioning
      "self-center relative",
      // Display & Flexbox
      "flex shrink-0 justify-center items-center overflow-hidden",
      // Spacing
      "m-2",
      // Appearance
      "bg-transparent text-white w-8 h-8 rounded-full transition duration-200 ease-in-out",
      // Hover Effects
      "hover:bg-surface-0/10 hover:text-white",
      // Focus Effects
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50"
    ]
  },
  thumbnailitemscontainer: {
    class: "overflow-hidden w-full"
  },
  thumbnailitems: ({ parent }) => ({
    class: [
      "flex",
      {
        "flex-col h-full": parent.props.thumbnailsPosition === "right" || parent.props.thumbnailsPosition === "left"
      }
    ]
  }),
  thumbnailitem: ({ parent }) => ({
    class: [
      // Flexbox
      "flex items-center justify-center",
      "grow shrink-0",
      // Sizing
      {
        "w-full md:w-[25%] lg:w-[20%]": parent.props.thumbnailsPosition === "top" || parent.props.thumbnailsPosition === "bottom"
      },
      // Misc
      "overflow-auto",
      "cursor-pointer",
      "opacity-50",
      // States
      "hover:opacity-100",
      "hover:transition-opacity",
      "hover:duration-300"
    ]
  }),
  nextthumbnailbutton: {
    class: [
      // Positioning
      "self-center relative",
      // Display & Flexbox
      "flex shrink-0 justify-center items-center overflow-hidden",
      // Spacing
      "m-2",
      // Appearance
      "bg-transparent text-white w-8 h-8 rounded-full transition duration-200 ease-in-out",
      // Hover Effects
      "hover:bg-surface-0/10 hover:text-white",
      // Focus Effects
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50"
    ]
  },
  indicators: ({ parent }) => ({
    class: [
      // flex
      "flex items-center justify-center",
      // Spacing
      "p-4",
      // Indicators Position
      {
        "order-2": parent.props.indicatorsPosition == "bottom",
        "order-1": parent.props.indicatorsPosition == "top",
        "order-1 flex-col": parent.props.indicatorsPosition == "left",
        "flex-col order-2": parent.props.indicatorsPosition == "right"
      },
      {
        "absolute z-10 bg-black/50": parent.props.showIndicatorsOnItem
      },
      {
        "bottom-0 left-0 w-full items-start": parent.props.indicatorsPosition == "bottom" && parent.props.showIndicatorsOnItem,
        "top-0 left-0 w-full items-start": parent.props.indicatorsPosition == "top" && parent.props.showIndicatorsOnItem,
        "left-0 top-0 h-full items-start": parent.props.indicatorsPosition == "left" && parent.props.showIndicatorsOnItem,
        "right-0 top-0 h-full items-start": parent.props.indicatorsPosition == "right" && parent.props.showIndicatorsOnItem
      }
    ]
  }),
  indicator: ({ parent }) => ({
    class: [
      {
        "mr-2": parent.props.indicatorsPosition == "bottom" || parent.props.indicatorsPosition == "top",
        "mb-2": parent.props.indicatorsPosition == "left" || parent.props.indicatorsPosition == "right"
      }
    ]
  }),
  indicatorbutton: ({ context }) => ({
    class: [
      // Size
      "w-4 h-4",
      // Appearance
      "rounded-full transition duration-200",
      // Focus Effects
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50",
      // Conditional Appearance: Not Highlighted
      {
        "bg-surface-200 hover:bg-surface-300": !context.highlighted
      },
      // Conditional Appearance: Highlighted
      { "bg-primary-500 hover:bg-primary-600": context.highlighted }
    ]
  }),
  mask: {
    class: [
      "fixed top-0 left-0 w-full h-full",
      "flex items-center justify-center",
      "bg-black/90"
    ]
  },
  closebutton: {
    class: [
      // Positioning
      "!absolute top-0 right-0",
      // Display & Flexbox
      "flex justify-center items-center overflow-hidden",
      // Spacing
      "m-2",
      // Appearance
      "text-white bg-transparent w-12 h-12 rounded-full transition duration-200 ease-in-out",
      // Hover Effect
      "hover:text-white hover:bg-surface-0/10",
      // Focus Effects
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50"
    ]
  },
  closeicon: {
    class: "w-6 h-6"
  },
  previousitembutton: ({ parent }) => ({
    class: [
      // Display & Flexbox
      "inline-flex justify-center items-center overflow-hidden",
      // Appearance
      "bg-transparent text-white w-16 h-16 transition duration-200 ease-in-out rounded-md",
      {
        "opacity-0 group-hover:opacity-100": parent.props.showItemNavigatorsOnHover
      },
      // Spacing
      "mx-2",
      // Positioning
      "top-1/2 mt-[-0.5rem] left-0",
      {
        "!absolute": parent.props.showItemNavigators,
        "!fixed": !parent.props.showItemNavigators
      },
      // Hover Effect
      "hover:bg-surface-0/10 hover:text-white",
      // Focus Effects
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50"
    ]
  }),
  nextitembutton: ({ parent }) => ({
    class: [
      // Display & Flexbox
      "inline-flex justify-center items-center overflow-hidden",
      // Appearance
      "bg-transparent text-white w-16 h-16 transition duration-200 ease-in-out rounded-md",
      {
        "opacity-0 group-hover:opacity-100": parent.props.showItemNavigatorsOnHover
      },
      // Spacing
      "mx-2",
      // Positioning
      "top-1/2 mt-[-0.5rem] right-0",
      {
        "!absolute": parent.props.showItemNavigators,
        "!fixed": !parent.props.showItemNavigators
      },
      // Hover Effect
      "hover:bg-surface-0/10 hover:text-white",
      // Focus Effects
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50"
    ]
  }),
  caption: {
    class: [
      // Positioning
      "absolute bottom-0 left-0 w-full",
      // Appearance
      "bg-black/50 text-white p-4"
    ]
  },
  transition: {
    enterFromClass: "opacity-0 scale-75",
    enterActiveClass: "transition-all duration-150 ease-in-out",
    leaveActiveClass: "transition-all duration-150 ease-in",
    leaveToClass: "opacity-0 scale-75"
  }
};
const global$1 = {
  css: `
    *[data-pd-ripple="true"]{
        overflow: hidden;
        position: relative;
    }
    span[data-p-ink-active="true"]{
        animation: ripple 0.4s linear;
    }
    @keyframes ripple {
        100% {
            opacity: 0;
            transform: scale(2.5);
        }
    }

    .progress-spinner-circle {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: 0;
        animation: p-progress-spinner-dash 1.5s ease-in-out infinite, p-progress-spinner-color 6s ease-in-out infinite;
        stroke-linecap: round;
    }

    @keyframes p-progress-spinner-dash{
        0% {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
        }

        50% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -35px;
        }
        100% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -124px;
        }
    }
    @keyframes p-progress-spinner-color {
        100%, 0% {
            stroke: #ff5757;
        }
        40% {
            stroke: #696cff;
        }
        66% {
            stroke: #1ea97c;
        }
        80%, 90% {
            stroke: #cc8925;
        }
    }

    .progressbar-value-animate::after {
        will-change: left, right;
        animation: p-progressbar-indeterminate-anim-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
    }
    .progressbar-value-animate::before {
        will-change: left, right;
        animation: p-progressbar-indeterminate-anim 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    }
    @keyframes p-progressbar-indeterminate-anim {
        0% {
            left: -35%;
            right: 100%;
        }
        60% {
            left: 100%;
            right: -90%;
        }
        100% {
            left: 100%;
            right: -90%;
        }
    }
`
};
const iconfield = {
  root: ({ props }) => ({
    class: [
      "relative",
      "[&>input]:w-full",
      "[&>*:first-child]:absolute",
      "[&>*:first-child]:top-1/2",
      "[&>*:first-child]:-mt-2",
      "[&>*:first-child]:leading-none",
      "[&>*:first-child]:text-surface-900/60",
      {
        "[&>*:first-child]:right-3": props.iconPosition === "right",
        "[&>*:first-child]:left-3": props.iconPosition === "left"
      },
      {
        "[&>*:last-child]:pr-10": props.iconPosition === "right",
        "[&>*:last-child]:pl-10": props.iconPosition === "left"
      }
    ]
  })
};
const image = {
  root: {
    class: "relative inline-block"
  },
  button: {
    class: [
      // Flexbox & Alignment
      "flex items-center justify-center",
      // Positioning
      "absolute",
      // Shape
      "inset-0 opacity-0 transition-opacity duration-300",
      // Color
      "bg-transparent text-surface-100",
      // States
      "hover:opacity-100 hover:cursor-pointer hover:bg-surface-900 hover:bg-opacity-50"
    ]
  },
  mask: {
    class: [
      // Flexbox & Alignment
      "flex items-center justify-center",
      // Positioning
      "fixed top-0 left-0",
      // Sizing
      "w-full h-full",
      // Color
      "bg-surface-900/90"
    ]
  },
  toolbar: {
    class: [
      // Flexbox
      "flex",
      // Positioning
      "absolute top-0 right-0",
      // Spacing
      "p-4"
    ]
  },
  rotaterightbutton: {
    class: [
      "z-20",
      // Flexbox & Alignment
      "flex justify-center items-center",
      // Size
      "w-12 h-12",
      // Spacing
      "mr-2",
      // Shape
      "rounded-full",
      // Color
      "text-white bg-transparent",
      // States
      "hover:text-white hover:bg-surface-0/10",
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50",
      // Transition
      "transition duration-200 ease-in-out"
    ]
  },
  rotaterighticon: {
    class: "w-6 h-6"
  },
  rotateleftbutton: {
    class: [
      "z-20",
      // Flexbox & Alignment
      "flex justify-center items-center",
      // Size
      "w-12 h-12",
      // Spacing
      "mr-2",
      // Shape
      "rounded-full",
      // Color
      "text-white bg-transparent",
      // States
      "hover:text-white hover:bg-surface-0/10",
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50",
      // Transition
      "transition duration-200 ease-in-out"
    ]
  },
  rotatelefticon: {
    class: "w-6 h-6"
  },
  zoomoutbutton: {
    class: [
      "z-20",
      // Flexbox & Alignment
      "flex justify-center items-center",
      // Size
      "w-12 h-12",
      // Spacing
      "mr-2",
      // Shape
      "rounded-full",
      // Color
      "text-white bg-transparent",
      // States
      "hover:text-white hover:bg-surface-0/10",
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50",
      // Transition
      "transition duration-200 ease-in-out"
    ]
  },
  zoomouticon: {
    class: "w-6 h-6"
  },
  zoominbutton: {
    class: [
      "z-20",
      // Flexbox & Alignment
      "flex justify-center items-center",
      // Size
      "w-12 h-12",
      // Spacing
      "mr-2",
      // Shape
      "rounded-full",
      // Color
      "text-white bg-transparent",
      // States
      "hover:text-white hover:bg-surface-0/10",
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50",
      // Transition
      "transition duration-200 ease-in-out"
    ]
  },
  zoominicon: {
    class: "w-6 h-6"
  },
  closebutton: {
    class: [
      "z-20",
      // Flexbox & Alignment
      "flex justify-center items-center",
      // Size
      "w-12 h-12",
      // Spacing
      "mr-2",
      // Shape
      "rounded-full",
      // Color
      "text-white bg-transparent",
      // States
      "hover:text-white hover:bg-surface-0/10",
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50",
      // Transition
      "transition duration-200 ease-in-out"
    ]
  },
  closeicon: {
    class: "w-6 h-6"
  },
  transition: {
    enterFromClass: "opacity-0 scale-75",
    enterActiveClass: "transition-all duration-150 ease-in-out",
    leaveActiveClass: "transition-all duration-150 ease-in",
    leaveToClass: "opacity-0 scale-75"
  }
};
const inlinemessage = {
  root: ({ props }) => ({
    class: [
      "inline-flex items-center justify-center align-top gap-2",
      "py-2 px-3 m-0 rounded-md",
      "ring-1 ring-inset ring-surface-200 ring-offset-0",
      {
        "text-blue-500": props.severity == "info",
        "text-green-500": props.severity == "success",
        "text-orange-500": props.severity == "warn",
        "text-red-500": props.severity == "error"
      }
    ]
  }),
  icon: {
    class: [
      // Sizing and Spacing
      "w-4 h-4",
      "shrink-0"
    ]
  },
  text: {
    class: [
      // Font and Text
      "text-sm leading-none",
      "font-medium"
    ]
  }
};
const inplace = {
  display: {
    class: [
      // Display
      "inline",
      // Spacing
      "px-2.5 py-1.5",
      // Size
      "text-sm",
      // Shape
      "rounded-md",
      // Colors
      "text-surface-700",
      // States
      "hover:bg-surface-100 hover:text-surface-700",
      // Transitions
      "transition",
      "duration-200",
      // Misc
      "cursor-pointer"
    ]
  }
};
const inputgroup = {
  root: {
    class: ["flex items-stretch", "w-full"]
  }
};
const inputgroupaddon = {
  root: {
    class: [
      // Flex
      "flex items-center justify-center",
      // Shape
      "first:rounded-l-md",
      "last:rounded-r-md",
      "border-y",
      "last:border-r",
      "border-l",
      "border-r-0",
      // Space
      "p-1.5",
      // Size
      "min-w-[3rem]",
      // Color
      "bg-surface-50",
      "text-surface-600",
      "border-surface-300"
    ]
  }
};
const inputmask = {
  root: ({ context, props }) => ({
    class: [
      // Font
      "font-sans leading-6",
      // Spacing
      "m-0 py-1.5 px-3 sm:text-sm",
      // Colors
      "text-surface-900",
      "placeholder:text-surface-400",
      "bg-surface-0",
      "ring-1 ring-inset ring-offset-0",
      "shadow-sm",
      { "ring-surface-300": !props.invalid },
      // Invalid State
      { "ring-red-500": props.invalid },
      // Shape
      "rounded-md",
      "appearance-none",
      // Interactions
      {
        "outline-none focus:ring-primary-500": !context.disabled,
        "opacity-60 select-none pointer-events-none cursor-default": context.disabled
      }
    ]
  })
};
const inputnumber = {
  root: ({ props, parent }) => ({
    class: [
      // Flex
      "inline-flex",
      { "flex-col": props.showButtons && props.buttonLayout == "vertical" },
      { "flex-1 w-[1%]": parent.instance.$name == "InputGroup" },
      //Sizing
      { "!w-16": props.showButtons && props.buttonLayout == "vertical" },
      // Shape
      {
        "first:rounded-l-md rounded-none last:rounded-r-md": parent.instance.$name == "InputGroup" && !props.showButtons
      },
      {
        "border-0 border-y border-l last:border-r border-surface-300": parent.instance.$name == "InputGroup" && !props.showButtons
      },
      {
        "ring-1 ring-surface-300 ring-offset-0": parent.instance.$name !== "InputGroup"
      },
      "shadow-sm",
      "rounded-md"
    ]
  }),
  input: {
    root: ({ parent, context }) => {
      var _a;
      return {
        class: [
          // Display
          "flex flex-auto",
          //Text
          "sm:text-sm",
          {
            "text-center": parent.props.showButtons && parent.props.buttonLayout == "vertical"
          },
          // Spacing
          "m-0",
          "py-1.5 px-3",
          // Shape
          "rounded-md",
          { "rounded-tr-none rounded-br-none": parent.props.showButtons },
          {
            "rounded-tl-none rounded-bl-none": parent.props.showButtons && parent.props.buttonLayout == "horizontal"
          },
          {
            "rounded-none": parent.props.showButtons && parent.props.buttonLayout == "vertical"
          },
          // Colors
          "text-surface-900",
          "placeholder:text-surface-400",
          "bg-surface-0",
          {
            "border-r": parent.props.showButtons && parent.props.buttonLayout == "stacked"
          },
          {
            "border-x": parent.props.showButtons && parent.props.buttonLayout == "horizontal"
          },
          {
            "border-y": parent.props.showButtons && parent.props.buttonLayout == "vertical"
          },
          { "border-surface-300": !parent.props.invalid },
          // Invalid State
          { "border border-red-500": parent.props.invalid },
          // States
          "outline-none focus:ring-primary-600",
          "focus:outline-none focus:outline-offset-0 focus:ring-2 focus:ring-inset focus:ring-primary-600",
          // Filled State *for FloatLabel
          { filled: ((_a = parent.instance) == null ? void 0 : _a.$name) == "FloatLabel" && context.filled },
          //Position
          {
            "order-2": parent.props.buttonLayout == "horizontal" || parent.props.buttonLayout == "vertical"
          }
        ]
      };
    }
  },
  buttongroup: {
    class: ["flex", "flex-col"]
  },
  incrementbutton: {
    root: ({ parent }) => ({
      class: [
        // Display
        "flex flex-auto",
        // Alignment
        "items-center",
        "justify-center",
        "text-center align-bottom",
        //Position
        "relative",
        {
          "order-3": parent.props.showButtons && parent.props.buttonLayout == "horizontal"
        },
        {
          "order-1": parent.props.showButtons && parent.props.buttonLayout == "vertical"
        },
        //Color
        "text-surface-600",
        "bg-surface-0",
        // Sizing
        "w-[3rem]",
        {
          "px-2.5 py-1.5": parent.props.showButtons && parent.props.buttonLayout !== "stacked"
        },
        {
          "p-0": parent.props.showButtons && parent.props.buttonLayout == "stacked"
        },
        {
          "w-full": parent.props.showButtons && parent.props.buttonLayout == "vertical"
        },
        // Shape
        "rounded-md",
        {
          "rounded-tl-none rounded-br-none rounded-bl-none": parent.props.showButtons && parent.props.buttonLayout == "stacked"
        },
        {
          "rounded-bl-none rounded-tl-none": parent.props.showButtons && parent.props.buttonLayout == "horizontal"
        },
        {
          "rounded-bl-none rounded-br-none": parent.props.showButtons && parent.props.buttonLayout == "vertical"
        },
        //States
        "focus:outline-none focus:outline-offset-0 focus:ring-2 focus:ring-inset focus:ring-primary-600",
        "hover:bg-surface-50",
        //Misc
        "cursor-pointer overflow-hidden select-none"
      ]
    }),
    label: {
      class: "h-0 w-0"
    }
  },
  decrementbutton: {
    root: ({ parent }) => ({
      class: [
        // Display
        "flex flex-auto",
        // Alignment
        "items-center",
        "justify-center",
        "text-center align-bottom",
        //Position
        "relative",
        {
          "order-1": parent.props.showButtons && parent.props.buttonLayout == "horizontal"
        },
        {
          "order-3": parent.props.showButtons && parent.props.buttonLayout == "vertical"
        },
        //Color
        "text-surface-600",
        "bg-surface-0",
        // Sizing
        "w-[3rem]",
        {
          "px-2.5 py-1.5": parent.props.showButtons && parent.props.buttonLayout !== "stacked"
        },
        {
          "p-0": parent.props.showButtons && parent.props.buttonLayout == "stacked"
        },
        {
          "w-full": parent.props.showButtons && parent.props.buttonLayout == "vertical"
        },
        // Shape
        "rounded-md",
        {
          "rounded-tr-none rounded-tl-none rounded-bl-none": parent.props.showButtons && parent.props.buttonLayout == "stacked"
        },
        {
          "rounded-tr-none rounded-br-none ": parent.props.showButtons && parent.props.buttonLayout == "horizontal"
        },
        {
          "rounded-tr-none rounded-tl-none ": parent.props.showButtons && parent.props.buttonLayout == "vertical"
        },
        //States
        "focus:outline-none focus:outline-offset-0 focus:ring-2 focus:ring-inset focus:ring-primary-600",
        "hover:bg-surface-50",
        //Misc
        "cursor-pointer overflow-hidden select-none"
      ]
    }),
    label: {
      class: "h-0 w-0"
    }
  }
};
const inputotp = {
  root: {
    class: [
      // Alignment
      "flex items-center",
      "gap-2"
    ]
  },
  input: {
    root: ({ props, context, parent }) => {
      var _a;
      return {
        class: [
          // Font
          "font-sans leading-6",
          // Flex & Alignment
          { "flex-1 w-[1%]": parent.instance.$name == "InputGroup" },
          "text-center",
          // Spacing
          "m-0",
          {
            "py-1.5 px-3 sm:text-sm": props.size == null
          },
          // Size
          "w-8",
          // Colors
          "text-surface-900",
          "placeholder:text-surface-400",
          "bg-surface-0",
          "shadow-sm",
          {
            "ring-1 ring-inset ring-offset-0": parent.instance.$name !== "InputGroup"
          },
          { "ring-surface-300": !props.invalid },
          // Invalid State
          { "ring-red-500": props.invalid },
          // Shape
          { "rounded-md": parent.instance.$name !== "InputGroup" },
          {
            "first:rounded-l-md rounded-none last:rounded-r-md": parent.instance.$name == "InputGroup"
          },
          {
            "border-0 border-y border-l last:border-r border-surface-300": parent.instance.$name == "InputGroup"
          },
          {
            "first:ml-0 ml-[-1px]": parent.instance.$name == "InputGroup" && !props.showButtons
          },
          "appearance-none",
          // Interactions
          {
            "outline-none focus:ring-primary-500": !context.disabled,
            "opacity-60 select-none pointer-events-none cursor-default": context.disabled
          },
          // Filled State *for FloatLabel
          { filled: ((_a = parent.instance) == null ? void 0 : _a.$name) == "FloatLabel" && context.filled }
        ]
      };
    }
  }
};
const inputswitch = {
  root: ({ props }) => ({
    class: [
      // Alignments
      "inline-flex relative",
      "shrink-0",
      // Shape
      "rounded-2xl",
      // Size
      "h-5 w-9",
      // States
      {
        "opacity-60 select-none pointer-events-none cursor-default": props.disabled
      }
    ]
  }),
  slider: ({ props }) => ({
    class: [
      // Position
      "absolute top-0 left-0 right-0 bottom-0",
      // Shape
      "rounded-2xl",
      // Before:
      "before:absolute before:top-1/2",
      "before:-mt-2",
      "before:h-4 before:w-4",
      "before:rounded-full",
      "before:duration-200 before:transition before:ease-in-out",
      "before:bg-surface-0",
      "before:shadow",
      {
        "before:transform before:translate-x-4": props.modelValue == props.trueValue
      },
      // Colors
      "border",
      {
        "bg-surface-200": !(props.modelValue == props.trueValue),
        "bg-primary-500": props.modelValue == props.trueValue
      },
      { "border-transparent": !props.invalid },
      // Invalid State
      { "border-red-500": props.invalid },
      // States
      {
        "peer-hover:bg-surface-300": !(props.modelValue == props.trueValue) && !props.disabled
      },
      {
        "peer-hover:bg-primary-600": props.modelValue == props.trueValue && !props.disabled
      },
      "peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500",
      // Transition
      "transition-colors duration-200",
      // Misc
      "cursor-pointer"
    ]
  }),
  input: {
    class: [
      "peer",
      // Size
      "w-full ",
      "h-full",
      // Position
      "absolute",
      "top-0 left-0",
      "z-10",
      // Spacing
      "p-0",
      "m-0",
      // Shape
      "rounded",
      "border",
      // Shape
      "opacity-0",
      "rounded-md",
      "outline-none",
      "border-2 border-surface-300",
      // Misc
      "appearance-none"
    ]
  }
};
const inputtext = {
  root: ({ props, context, parent }) => {
    var _a;
    return {
      class: [
        // Font
        "font-sans leading-6",
        // Flex
        { "flex-1 w-[1%]": parent.instance.$name == "InputGroup" },
        // Spacing
        "m-0",
        {
          "py-3 px-4 text-lg sm:text-md": props.size == "large",
          "py-1 px-2 sm:text-sm": props.size == "small",
          "py-1.5 px-3 sm:text-sm": props.size == null
        },
        // Colors
        "text-surface-900",
        "placeholder:text-surface-400",
        "bg-surface-0",
        "shadow-sm",
        {
          "ring-1 ring-inset ring-offset-0": parent.instance.$name !== "InputGroup"
        },
        { "ring-surface-300": !props.invalid },
        // Invalid State
        { "ring-red-500": props.invalid },
        // Shape
        { "rounded-md": parent.instance.$name !== "InputGroup" },
        {
          "first:rounded-l-md rounded-none last:rounded-r-md": parent.instance.$name == "InputGroup"
        },
        {
          "border-0 border-y border-l last:border-r border-surface-300": parent.instance.$name == "InputGroup"
        },
        {
          "first:ml-0 -ml-px": parent.instance.$name == "InputGroup" && !props.showButtons
        },
        "appearance-none",
        // Interactions
        {
          "outline-none focus:ring-primary-500": !context.disabled,
          "opacity-60 select-none pointer-events-none cursor-default": context.disabled
        },
        // Filled State *for FloatLabel
        { filled: ((_a = parent.instance) == null ? void 0 : _a.$name) == "FloatLabel" && context.filled }
      ]
    };
  }
};
const knob = {
  root: ({ props }) => ({
    class: [
      // Misc
      {
        "opacity-60 select-none pointer-events-none cursor-default": props.disabled
      }
    ]
  }),
  range: {
    class: [
      // Stroke
      "stroke-current",
      // Color
      "stroke-surface-200",
      // Fill
      "fill-none",
      // Transition
      "transition duration-100 ease-in"
    ]
  },
  value: {
    class: [
      // Animation
      "animate-dash-frame",
      // Color
      "stroke-primary-500",
      // Fill
      "fill-none"
    ]
  },
  label: {
    class: [
      // Text Style
      "text-center text-xl",
      // Color
      "fill-surface-600"
    ]
  }
};
const listbox = {
  root: ({ props }) => ({
    class: [
      // Sizing and Shape
      "min-w-[12rem]",
      "rounded-md",
      // Colors
      "bg-surface-0 dark:bg-surface-700",
      "text-surface-700 dark:text-white/80",
      "ring-1",
      { "ring-surface-200 dark:ring-surface-700": !props.invalid },
      // Invalid State
      { "ring-red-500 dark:ring-red-400": props.invalid }
    ]
  }),
  wrapper: {
    class: [
      // Overflow
      "overflow-auto"
    ]
  },
  list: {
    class: "py-1 list-none m-0"
  },
  item: ({ context }) => ({
    class: [
      // Font
      "sm:text-sm",
      "leading-none",
      { "font-normal": !context.selected, "font-bold": context.selected },
      // Position
      "relative",
      // Shape
      "border-0",
      "rounded-none",
      // Spacing
      "m-0",
      "py-2 px-4",
      // Color
      { "text-surface-700 dark:text-white/80": !context.focused && !context.selected },
      { "bg-surface-200 dark:bg-surface-600/60 text-surface-700 dark:text-white/80": context.focused && !context.selected },
      { "bg-primary-500 dark:bg-primary-400 text-white dark:text-surface-700": context.focused && context.selected },
      { "bg-surface-100 dark:bg-surface-300/10 text-primary-500 dark:text-primary-400": !context.focused && context.selected },
      //States
      "hover:bg-primary-500 dark:hover:bg-primary-400 hover:text-white dark:hover:text-surface-700",
      "focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
      // Misc
      "cursor-pointer",
      "overflow-hidden",
      "whitespace-nowrap"
    ]
  }),
  itemgroup: {
    class: [
      //Font
      "font-bold",
      "sm:text-sm",
      // Spacing
      "m-0",
      "py-2 px-4",
      // Color
      "text-surface-800 dark:text-white/80",
      "bg-surface-0 dark:bg-surface-600/80",
      // Misc
      "cursor-auto"
    ]
  },
  header: {
    class: [
      // Spacing
      "p-0",
      "m-0",
      //Shape
      "rounded-tl-md",
      "rounded-tr-md",
      "border-b border-surface-200 dark:border-surface-700",
      // Color
      "text-surface-700 dark:text-white/80",
      "bg-surface-100 dark:bg-surface-800"
    ]
  },
  filtercontainer: {
    class: "relative"
  },
  filterinput: {
    class: [
      // Font
      "font-sans",
      "leading-none",
      "sm:text-sm",
      // Sizing
      "py-1.5 px-3",
      "pr-7",
      "-mr-7",
      "w-full",
      //Color
      "text-surface-700 dark:text-white/80",
      "bg-surface-0 dark:bg-surface-900",
      "placeholder:text-surface-400",
      // Shape
      "border-0",
      "rounded-tl-md",
      "rounded-tr-md",
      "appearance-none",
      // States
      "focus:ring-2 focus:ring-inset focus:outline-none focus:outline-offset-0",
      "focus:ring-primary-600 dark:focus:ring-primary-500",
      // Misc
      "appearance-none"
    ]
  },
  filtericon: {
    class: ["absolute", "top-1/2 right-3", "-mt-2"]
  },
  emptymessage: {
    class: [
      // Font
      "leading-none",
      "sm:text-sm",
      // Spacing
      "py-2 px-4",
      // Color
      "text-surface-800 dark:text-white/80",
      "bg-transparent"
    ]
  }
};
const megamenu = {
  root: ({ props }) => ({
    class: [
      "relative",
      // Flexbox
      "flex",
      // Spacing
      "min-h-[4rem]",
      // Shape
      "rounded-md",
      "shadow-md",
      // Color
      "bg-surface-0 dark:bg-surface-900",
      "ring-1 ring-inset ring-surface-100 dark:ring-surface-800 ring-offset-0",
      { "items-center px-2 sm:px-6": props.orientation == "horizontal", "flex-col justify-center sm:justify-start sm:w-48 px-2": props.orientation !== "horizontal" }
    ]
  }),
  menu: ({ props }) => ({
    class: [
      // Flexbox
      "sm:flex sm:row-gap-2 sm:col-gap-4",
      "items-center",
      "flex-wrap",
      "flex-col sm:flex-row",
      { hidden: !(props == null ? void 0 : props.mobileActive), flex: props == null ? void 0 : props.mobileActive },
      // Position
      "absolute sm:relative",
      "top-full left-0",
      "sm:top-auto sm:left-auto",
      // Size
      "w-full sm:w-auto",
      // Spacing
      "m-0 ",
      "py-2 px-1.5 sm:py-0 sm:p-0 sm:py-1.5",
      "list-none",
      // Shape
      "shadow-md sm:shadow-none",
      "border-0",
      "sm:rounded-none rounded-md",
      // Color
      "bg-surface-0 dark:bg-surface-900 sm:bg-transparent dark:sm:bg-transparent",
      // Misc
      "outline-none"
    ]
  }),
  menuitem: ({ props }) => ({
    class: [
      "sm:relative static",
      {
        "sm:w-auto w-full": props.horizontal,
        "w-full": !props.horizontal
      }
    ]
  }),
  content: ({ props, context }) => ({
    class: [
      // Shape
      { "rounded-md": props.level < 1 },
      //  Colors
      {
        "text-surface-500 dark:text-white/70": !context.focused && !context.active,
        "text-surface-500 dark:text-white/70 bg-surface-200 dark:bg-black/70": context.focused && !context.active,
        "text-surface-900 dark:text-surface-0/80 bg-surface-50 dark:bg-black/70": context.focused && context.active,
        "text-surface-900 dark:text-surface-0/80 bg-surface-50 dark:bg-black/70": !context.focused && context.active
      },
      // Hover States
      {
        "hover:bg-surface-50 dark:hover:bg-surface-800": !context.active,
        "hover:bg-surface-100 dark:hover:bg-black/40 text-surface-900 dark:text-surface-0/80": context.active
      },
      // Transitions
      "transition-all",
      "duration-200"
    ]
  }),
  action: {
    class: [
      "relative",
      // Font
      "sm:text-sm font-medium",
      // Flexbox
      "flex",
      "items-center",
      // Spacing
      "py-2",
      "px-3",
      "my-1 sm:my-0",
      // Misc
      "select-none",
      "cursor-pointer",
      "no-underline ",
      "overflow-hidden"
    ]
  },
  icon: {
    class: "mr-2"
  },
  submenuicon: ({ props }) => ({
    class: [
      {
        "ml-auto sm:ml-2": props.horizontal,
        "ml-auto": !props.horizontal
      }
    ]
  }),
  panel: ({ props }) => ({
    class: [
      // Size
      "w-auto",
      // Spacing
      "py-1",
      "m-0 mx-2",
      // Shape
      "shadow-none sm:shadow-md",
      "border-0",
      // Color
      "bg-surface-0 dark:bg-surface-900",
      // Position
      "static sm:absolute",
      "z-10",
      {
        "sm:left-full top-0": !props.horizontal
      }
    ]
  }),
  grid: {
    class: "flex flex-wrap sm:flex-nowrap"
  },
  column: {
    class: "w-full sm:w-1/2"
  },
  submenu: {
    class: ["m-0 list-none", "py-1 px-2 w-full sm:min-w-[14rem]"]
  },
  submenuheader: {
    class: [
      "font-medium",
      "sm:text-md",
      // Spacing
      "py-2.5 px-2",
      "m-0",
      // Shape
      "border-b border-surface-200 dark:border-surface-700",
      // Color
      "text-surface-700 dark:text-white/80",
      "bg-surface-0 dark:bg-surface-900"
    ]
  },
  separator: {
    class: "border-t border-surface-200 dark:border-surface-600 my-1"
  },
  menubutton: {
    class: [
      // Flexbox
      "flex sm:hidden",
      "items-center justify-center",
      // Size
      "w-8",
      "h-8",
      // Shape
      "rounded-full",
      // Color
      "text-surface-500 dark:text-white/80",
      // States
      "hover:text-surface-600 dark:hover:text-white/60",
      "hover:bg-surface-50 dark:hover:bg-surface-800/80",
      "focus:outline-none focus:outline-offset-0",
      "focus:ring-2 focus:ring-inset focus:ring-primary-500 dark:focus:ring-primary-400",
      // Transitions
      "transition duration-200 ease-in-out",
      // Misc
      "cursor-pointer",
      "no-underline"
    ]
  },
  end: {
    class: "ml-auto self-center"
  }
};
const menu = {
  root: {
    class: [
      // Sizing and Shape
      "min-w-[12rem]",
      "rounded-md",
      // Spacing
      "p-1.5",
      // Colors
      "bg-surface-0",
      "text-surface-700",
      "ring-1 ring-surface-200"
    ]
  },
  menu: {
    class: [
      // Spacings and Shape
      "list-none",
      "m-0",
      "p-0",
      "outline-none"
    ]
  },
  menuitem: {
    class: [
      // Space
      "first:mt-0 mt-1"
    ]
  },
  content: ({ context }) => ({
    class: [
      //Shape
      "rounded-md",
      // Colors
      {
        "text-surface-700": !context.focused,
        "bg-surface-100 text-primary-500": context.focused
      },
      // Transitions
      "transition-shadow",
      "duration-200",
      // States
      "hover:text-primary-600",
      "hover:bg-surface-100"
    ]
  }),
  action: {
    class: [
      "relative",
      // Font
      "font-semibold",
      // Flexbox
      "flex",
      "items-center",
      // Spacing
      "py-2",
      "px-3",
      // Misc
      "no-underline",
      "overflow-hidden",
      "cursor-pointer",
      "select-none"
    ]
  },
  icon: {
    class: [
      // Spacing
      "mr-2",
      "leading-6",
      "text-sm"
    ]
  },
  label: {
    class: ["leading-6", "text-sm"]
  },
  submenuheader: {
    class: [
      // Font
      "font-semibold",
      "text-xs leading-6",
      // Spacing
      "m-0 ",
      "py-1",
      "px-3",
      // Shape
      "rounded-tl-none",
      "rounded-tr-none",
      // Colors
      "bg-surface-0",
      "text-surface-600"
    ]
  },
  transition: {
    enterFromClass: "opacity-0 scale-y-[0.8]",
    enterActiveClass: "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
    leaveActiveClass: "transition-opacity duration-100 ease-linear",
    leaveToClass: "opacity-0"
  }
};
const menubar = {
  root: {
    class: [
      "relative",
      // Flexbox
      "flex",
      "items-center",
      "gap-6",
      // Spacing
      "px-6",
      "min-h-[4rem]",
      // Shape
      "rounded-md",
      "shadow-md",
      // Color
      "bg-surface-0",
      "ring-1 ring-inset ring-surface-100 ring-offset-0"
    ]
  },
  menu: ({ props }) => ({
    class: [
      // Flexbox
      "sm:flex sm:row-gap-2 sm:col-gap-4",
      "items-center",
      "flex-wrap",
      "flex-col sm:flex-row",
      { hidden: !(props == null ? void 0 : props.mobileActive), flex: props == null ? void 0 : props.mobileActive },
      // Position
      "absolute sm:relative",
      "top-full left-0",
      "sm:top-auto sm:left-auto",
      // Size
      "w-full sm:w-auto",
      // Spacing
      "m-0 ",
      "py-2 px-1.5 sm:py-0 sm:p-0 sm:py-1.5",
      "list-none",
      // Shape
      "shadow-md sm:shadow-none",
      "border-0",
      "sm:rounded-none rounded-md",
      // Color
      "bg-surface-0 sm:bg-transparent",
      // Misc
      "outline-none"
    ]
  }),
  menuitem: {
    class: "sm:relative sm:w-auto w-full static"
  },
  content: ({ props, context }) => ({
    class: [
      // Shape
      { "rounded-md": props.root },
      //  Colors
      {
        "text-surface-500": !context.focused && !context.active,
        "text-surface-500 bg-surface-200": context.focused && !context.active,
        "text-surface-900 bg-surface-50": context.focused && context.active,
        "text-surface-900 bg-surface-50": !context.focused && context.active
      },
      // Hover States
      {
        "hover:bg-surface-50": !context.active,
        "hover:bg-surface-100 text-surface-900": context.active
      },
      // Transitions
      "transition-all",
      "duration-200"
    ]
  }),
  action: ({ context }) => ({
    class: [
      "relative",
      // Font
      "sm:text-sm font-medium",
      // Flexbox
      "flex",
      "items-center",
      // Spacing
      "py-2",
      "px-3",
      "my-1 sm:my-0",
      // Size
      {
        "pl-5 sm:pl-3": context.level === 1,
        "pl-7 sm:pl-3": context.level === 2
      },
      // Misc
      "select-none",
      "cursor-pointer",
      "no-underline ",
      "overflow-hidden"
    ]
  }),
  icon: {
    class: "mr-2"
  },
  submenuicon: ({ props }) => ({
    class: [
      {
        "ml-auto sm:ml-2": props.root,
        "ml-auto": !props.root
      }
    ]
  }),
  submenu: ({ props }) => ({
    class: [
      // Size
      "w-full sm:w-48",
      // Spacing
      "py-1",
      "m-0 ",
      "list-none",
      // Shape
      "shadow-none sm:shadow-md",
      "border-0",
      // Position
      "static sm:absolute",
      "z-10",
      { "sm:absolute sm:left-full sm:top-0": props.level > 1 },
      // Color
      "bg-surface-0"
    ]
  }),
  separator: {
    class: "border-t border-surface-200 my-1"
  },
  button: {
    class: [
      // Flexbox
      "flex sm:hidden",
      "items-center justify-center",
      // Size
      "w-8",
      "h-8",
      // Shape
      "rounded-full",
      // Color
      "text-surface-500",
      // States
      "hover:text-surface-600",
      "hover:bg-surface-50",
      "focus:outline-none focus:outline-offset-0",
      "focus:ring-2 focus:ring-inset focus:ring-primary-500",
      // Transitions
      "transition duration-200 ease-in-out",
      // Misc
      "cursor-pointer",
      "no-underline"
    ]
  },
  end: {
    class: "ml-auto self-center"
  }
};
const message = {
  root: ({ props }) => ({
    class: [
      // Spacing and Shape
      "my-2 mx-0",
      "rounded-md",
      "ring-1 ring-inset ring-surface-200 ring-offset-0",
      // Colors
      "bg-surface-0",
      {
        "text-blue-500": props.severity == "info",
        "text-green-500": props.severity == "success",
        "text-orange-500": props.severity == "warn",
        "text-red-500": props.severity == "error"
      }
    ]
  }),
  wrapper: {
    class: [
      // Flexbox
      "flex items-center",
      // Spacing
      "p-4"
    ]
  },
  icon: {
    class: [
      // Sizing and Spacing
      "w-5 h-5",
      "mr-3 shrink-0"
    ]
  },
  text: {
    class: [
      // Font and Text
      "text-sm leading-none",
      "font-medium"
    ]
  },
  button: ({ props }) => ({
    class: [
      // Flexbox
      "flex items-center justify-center",
      // Size
      "w-6 h-6",
      // Spacing and Misc
      "ml-auto relative",
      // Shape
      "rounded-full",
      // Colors
      "bg-transparent",
      "text-surface-700",
      // Transitions
      "transition duration-200 ease-in-out",
      // States
      "hover:bg-surface-100",
      "outline-none focus:ring-1 focus:ring-inset",
      "focus:ring-primary-500",
      // Misc
      "overflow-hidden"
    ]
  }),
  closeicon: {
    class: [
      // Sizing and Spacing
      "w-3 h-3",
      "shrink-0"
    ]
  },
  transition: {
    enterFromClass: "opacity-0",
    enterActiveClass: "transition-opacity duration-300",
    leaveFromClass: "max-h-40",
    leaveActiveClass: "overflow-hidden transition-all duration-300 ease-in",
    leaveToClass: "max-h-0 opacity-0 !m-0"
  }
};
const metergroup = {
  root: ({ props }) => ({
    class: [
      // Flexbox
      "flex gap-4",
      {
        "flex-col": props.orientation == "horizontal",
        "flex-row": props.orientation == "vertical"
      }
    ]
  }),
  metercontainer: ({ props }) => ({
    class: [
      // Flexbox
      "flex",
      { "flex-col": props.orientation === "vertical" },
      // Sizing
      { "w-2 h-full": props.orientation === "vertical" },
      { "h-2": props.orientation === "horizontal" },
      // Colors
      "bg-gray-200",
      // Border Radius
      "rounded-lg"
    ]
  }),
  meter: ({ props }) => ({
    class: [
      // Shape
      "border-0",
      // Rounded Corners - Horizontal
      {
        "first:rounded-l-lg last:rounded-r-lg": props.orientation === "horizontal"
      },
      // Rounded Corners - Vertical
      {
        "first:rounded-t-lg last:rounded-b-lg": props.orientation === "vertical"
      },
      // Colors
      "bg-primary-500"
    ]
  }),
  labellist: ({ props }) => ({
    class: [
      // Display & Flexbox
      "flex flex-wrap",
      { "gap-4": props.labelOrientation === "horizontal" },
      { "gap-2": props.labelOrientation === "vertical" },
      { "flex-col": props.labelOrientation === "vertical" },
      // Conditional Alignment - Horizontal
      {
        "align-end": props.labelOrientation === "horizontal" && props.labelPosition === "end",
        "align-start": props.labelOrientation === "horizontal" && props.labelPosition === "start"
      },
      // Conditional Alignment - Vertical
      {
        "justify-end": props.labelOrientation === "vertical" && props.labelPosition === "end",
        "justify-start": props.labelOrientation === "vertical" && props.labelPosition === "start"
      },
      // List Styling
      "m-0 p-0 list-none"
    ]
  }),
  labellistitem: {
    class: [
      // Flexbox
      "inline-flex",
      "items-center",
      "gap-2"
    ]
  },
  labellisttype: {
    class: [
      // Display
      "inline-flex",
      // Background Color
      "bg-primary-500",
      // Size
      "w-2 h-2",
      // Rounded Shape
      "rounded-full"
    ]
  }
};
const multiselect = {
  root: ({ props, state }) => ({
    class: [
      // Display and Position
      "inline-flex",
      "relative",
      // Shape
      "rounded-md",
      "shadow-sm",
      // Color and Background
      "bg-surface-0",
      // States
      {
        "ring-1 ring-inset": !state.focused,
        "ring-2 ring-inset ring-primary-500": state.focused
      },
      {
        "ring-surface-300": !props.invalid && !state.focused
      },
      // Invalid State
      { "ring-red-500": props.invalid && !state.focused },
      // Misc
      "cursor-default",
      "select-none",
      { "opacity-60": props.disabled, "pointer-events-none": props.disabled }
    ]
  }),
  labelContainer: {
    class: "overflow-hidden flex flex-auto cursor-pointer"
  },
  label: ({ props }) => {
    var _a, _b, _c;
    return {
      class: [
        "block leading-5",
        props.display === "chip" && ((_a = props == null ? void 0 : props.modelValue) == null ? void 0 : _a.length) > 0 ? "py-1 px-3" : "py-1.5 px-3",
        // Color
        {
          "text-surface-800": (_b = props.modelValue) == null ? void 0 : _b.length,
          "text-surface-400": !((_c = props.modelValue) == null ? void 0 : _c.length)
        },
        "placeholder:text-surface-400",
        // Transitions
        "transition duration-200",
        // Misc
        "overflow-hidden whitespace-nowrap cursor-pointer overflow-ellipsis"
      ]
    };
  },
  token: {
    class: [
      // Flexbox
      "inline-flex items-center",
      // Spacing
      "py-0.5 px-3 mr-2",
      // Shape
      "rounded-[1.14rem]",
      // Colors
      "text-surface-700",
      "bg-surface-200"
    ]
  },
  removeTokenIcon: {
    class: [
      // Shape
      "rounded-md leading-6",
      // Spacing
      "ml-2",
      // Size
      "w-4 h-4",
      // Transition
      "transition duration-200 ease-in-out",
      // Misc
      "cursor-pointer"
    ]
  },
  trigger: {
    class: [
      //Font
      "sm:text-sm",
      // Flexbox
      "flex items-center justify-center",
      "shrink-0",
      // Color and Background
      "bg-transparent",
      "text-surface-500",
      // Size
      "w-12",
      // Shape
      "rounded-tr-md",
      "rounded-br-md"
    ]
  },
  panel: {
    class: [
      // Position
      "absolute top-0 left-0",
      "mt-2",
      // Shape
      "border-0",
      "rounded-md",
      "shadow-md",
      // Color
      "bg-surface-0",
      "text-surface-800 ",
      "ring-1 ring-inset ring-surface-300"
    ]
  },
  header: {
    class: [
      "flex items-center justify-between",
      // Spacing
      "py-2 px-4",
      "m-0",
      //Shape
      "border-b",
      "rounded-tl-md",
      "rounded-tr-md",
      // Color
      "text-surface-700 ",
      "bg-surface-50",
      "border-surface-200"
    ]
  },
  headerCheckboxContainer: {
    class: [
      "relative",
      // Alignment
      "inline-flex",
      "align-bottom",
      // Size
      "w-4",
      "h-4",
      // Spacing
      "mr-2",
      // Misc
      "cursor-default",
      "select-none"
    ]
  },
  headerCheckbox: ({ context, state }) => ({
    class: [
      // Alignment
      "flex",
      "items-center",
      "justify-center",
      // Size
      "w-4",
      "h-4",
      // Shape
      "rounded",
      "border",
      // Colors
      "text-surface-600",
      {
        "border-surface-300 bg-surface-0": !(context == null ? void 0 : context.selected),
        "border-primary-500 bg-primary-500": context == null ? void 0 : context.selected
      },
      {
        "outline-offset-0 ring-1 ring-primary-500 ": state.focused
      }
    ]
  }),
  headerCheckbox: {
    root: {
      class: [
        "relative",
        // Alignment
        "inline-flex",
        "align-bottom",
        // Size
        "w-4",
        "h-4",
        // Spacing
        "mr-2",
        // Misc
        "cursor-default",
        "select-none"
      ]
    },
    box: ({ props, context }) => ({
      class: [
        // Alignment
        "flex",
        "items-center",
        "justify-center",
        // Size
        "w-4",
        "h-4",
        // Shape
        "rounded",
        "border",
        // Colors
        "text-surface-600",
        {
          "border-surface-300 bg-surface-0": !context.checked,
          "border-primary-500 bg-primary-500": context.checked
        },
        {
          "ring-2 ring-primary-500 ": !props.disabled && context.focused,
          "cursor-default opacity-60": props.disabled
        },
        // States
        {
          "peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500": !props.disabled,
          "cursor-default opacity-60": props.disabled
        },
        // Transitions
        "transition-colors",
        "duration-200"
      ]
    }),
    input: {
      class: [
        "peer",
        // Size
        "w-full ",
        "h-full",
        // Position
        "absolute",
        "top-0 left-0",
        "z-10",
        // Spacing
        "p-0",
        "m-0",
        // Shape
        "rounded",
        "border",
        // Shape
        "opacity-0",
        "rounded-md",
        "outline-none",
        "border-2 border-surface-300",
        // Misc
        "appearance-none"
      ]
    },
    icon: {
      class: [
        // Font
        "text-normal",
        // Size
        "w-3",
        "h-3",
        // Colors
        "text-white",
        // Transitions
        "transition-all",
        "duration-200"
      ]
    }
  },
  itemCheckbox: {
    root: {
      class: [
        "relative",
        // Alignment
        "inline-flex",
        "align-bottom",
        // Size
        "w-4",
        "h-4",
        // Spacing
        "mr-2",
        // Misc
        "cursor-default",
        "select-none"
      ]
    },
    box: ({ props, context }) => ({
      class: [
        // Alignment
        "flex",
        "items-center",
        "justify-center",
        // Size
        "w-4",
        "h-4",
        // Shape
        "rounded",
        "border",
        // Colors
        "text-surface-600",
        {
          "border-surface-300 bg-surface-0": !context.checked,
          "border-primary-500 bg-primary-500": context.checked
        },
        {
          "ring-2 ring-primary-500 ": !props.disabled && context.focused,
          "cursor-default opacity-60": props.disabled
        },
        // States
        {
          "peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500": !props.disabled,
          "cursor-default opacity-60": props.disabled
        },
        // Transitions
        "transition-colors",
        "duration-200"
      ]
    }),
    input: {
      class: [
        "peer",
        // Size
        "w-full ",
        "h-full",
        // Position
        "absolute",
        "top-0 left-0",
        "z-10",
        // Spacing
        "p-0",
        "m-0",
        // Shape
        "rounded",
        "border",
        // Shape
        "opacity-0",
        "rounded-md",
        "outline-none",
        "border-2 border-surface-300",
        // Misc
        "appearance-none"
      ]
    },
    icon: {
      class: [
        // Font
        "text-normal",
        // Size
        "w-3",
        "h-3",
        // Colors
        "text-white",
        // Transitions
        "transition-all",
        "duration-200"
      ]
    }
  },
  closeButton: {
    class: [
      "relative",
      // Flexbox and Alignment
      "flex items-center justify-center",
      // Size and Spacing
      "mr-2",
      "last:mr-0",
      "w-6 h-6",
      // Shape
      "border-0",
      "rounded-full",
      // Colors
      "text-surface-500",
      "bg-transparent",
      // Transitions
      "transition duration-200 ease-in-out",
      // States
      "hover:text-surface-700",
      "hover:bg-surface-100",
      "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-inset",
      "focus:ring-primary-500",
      // Misc
      "overflow-hidden"
    ]
  },
  closeButtonIcon: {
    class: [
      // Display
      "inline-block",
      // Size
      "w-3",
      "h-3"
    ]
  },
  wrapper: {
    class: [
      // Sizing
      "max-h-[15rem]",
      // Misc
      "overflow-auto"
    ]
  },
  list: {
    class: "py-1 list-none m-0"
  },
  item: ({ context }) => ({
    class: [
      // Font
      "sm:text-sm",
      "leading-none",
      { "font-normal": !context.selected, "font-bold": context.selected },
      // Flexbox
      "flex items-center",
      // Position
      "relative",
      // Shape
      "border-0",
      "rounded-none",
      // Spacing
      "m-0",
      "py-2 px-4",
      // Color
      {
        "text-surface-700 ": !context.focused && !context.selected
      },
      {
        "bg-surface-200 text-surface-700 ": context.focused && !context.selected
      },
      {
        "bg-primary-500 text-white": context.focused && context.selected
      },
      {
        "bg-transparent text-surface-700 ": !context.focused && context.selected
      },
      //States
      "hover:bg-primary-500 hover:text-white",
      // Misc
      "cursor-pointer",
      "overflow-hidden",
      "whitespace-nowrap"
    ]
  }),
  itemgroup: {
    class: [
      //Font
      "font-bold",
      "sm:text-sm",
      // Spacing
      "m-0",
      "py-2 px-4",
      // Color
      "text-surface-800 ",
      "bg-surface-0",
      // Misc
      "cursor-auto"
    ]
  },
  filtercontainer: {
    class: "relative w-full mr-2"
  },
  filterinput: {
    class: [
      // Font
      "font-sans",
      "leading-none",
      "sm:text-sm",
      // Sizing
      "py-1.5 px-3",
      "pr-7",
      "-mr-7",
      "w-full",
      //Color
      "text-surface-700 ",
      "bg-surface-0 ",
      "placeholder:text-surface-400",
      "ring-1 ring-inset ring-surface-300",
      // Shape
      "border-0",
      "rounded-md",
      "appearance-none",
      // States
      "focus:ring-2 focus:ring-inset focus:outline-none focus:outline-offset-0",
      "focus:ring-primary-600",
      // Misc
      "appearance-none"
    ]
  },
  filtericon: {
    class: ["absolute", "top-1/2 right-3", "-mt-2"]
  },
  clearicon: {
    class: [
      // Color
      "text-surface-500",
      // Position
      "absolute",
      "top-1/2",
      "right-12",
      // Spacing
      "-mt-2"
    ]
  },
  emptymessage: {
    class: [
      // Font
      "leading-none",
      "sm:text-sm",
      // Spacing
      "py-2 px-4",
      // Color
      "text-surface-800 ",
      "bg-transparent"
    ]
  },
  transition: {
    enterFromClass: "opacity-0 scale-y-[0.8]",
    enterActiveClass: "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
    leaveActiveClass: "transition-opacity duration-100 ease-linear",
    leaveToClass: "opacity-0"
  }
};
const orderlist = {
  root: {
    class: [
      // Flexbox
      "flex"
    ]
  },
  controls: {
    class: [
      // Flexbox & Alignment
      "flex flex-col justify-center gap-2",
      // Spacing
      "p-3"
    ]
  },
  moveupbutton: {
    root: ({ context }) => ({
      class: [
        // Flexbox & Alignment
        "relative inline-flex items-center justify-center",
        // Shape
        "rounded-md",
        // Color
        "text-white dark:text-surface-900",
        "bg-primary-500 dark:bg-primary-400",
        "border border-primary-500 dark:border-primary-400",
        // Spacing & Size
        "text-sm",
        "w-8",
        "m-0",
        "px-2.5 py-1.5 min-w-[2rem]",
        "shadow-sm",
        // Transitions
        "transition duration-200 ease-in-out",
        // State
        "hover:bg-primary-600 dark:hover:bg-primary-300 hover:border-primary-600 dark:hover:border-primary-300",
        "focus:outline-none focus:outline-offset-0 focus:ring-2",
        "focus:ring-primary-500 dark:focus:ring-primary-400",
        { "cursor-default pointer-events-none opacity-60": context.disabled },
        // Interactivity
        "cursor-pointer user-select-none"
      ]
    }),
    label: {
      class: [
        // Flexbox
        "flex-initial",
        // Size
        "w-0"
      ]
    }
  },
  movedownbutton: {
    root: ({ context }) => ({
      class: [
        // Flexbox & Alignment
        "relative inline-flex items-center justify-center",
        // Shape
        "rounded-md",
        // Color
        "text-white dark:text-surface-900",
        "bg-primary-500 dark:bg-primary-400",
        "border border-primary-500 dark:border-primary-400",
        // Spacing & Size
        "text-sm",
        "w-8",
        "m-0",
        "px-2.5 py-1.5 min-w-[2rem]",
        "shadow-sm",
        // Transitions
        "transition duration-200 ease-in-out",
        // State
        "hover:bg-primary-600 dark:hover:bg-primary-300 hover:border-primary-600 dark:hover:border-primary-300",
        "focus:outline-none focus:outline-offset-0 focus:ring-2",
        "focus:ring-primary-500 dark:focus:ring-primary-400",
        { "cursor-default pointer-events-none opacity-60": context.disabled },
        // Interactivity
        "cursor-pointer user-select-none"
      ]
    }),
    label: {
      class: [
        // Flexbox
        "flex-initial",
        // Size
        "w-0"
      ]
    }
  },
  movetopbutton: {
    root: ({ context }) => ({
      class: [
        // Flexbox & Alignment
        "relative inline-flex items-center justify-center",
        // Shape
        "rounded-md",
        // Color
        "text-white dark:text-surface-900",
        "bg-primary-500 dark:bg-primary-400",
        "border border-primary-500 dark:border-primary-400",
        // Spacing & Size
        "text-sm",
        "w-8",
        "m-0",
        "px-2.5 py-1.5 min-w-[2rem]",
        "shadow-sm",
        // Transitions
        "transition duration-200 ease-in-out",
        // State
        "hover:bg-primary-600 dark:hover:bg-primary-300 hover:border-primary-600 dark:hover:border-primary-300",
        "focus:outline-none focus:outline-offset-0 focus:ring-2",
        "focus:ring-primary-500 dark:focus:ring-primary-400",
        { "cursor-default pointer-events-none opacity-60": context.disabled },
        // Interactivity
        "cursor-pointer user-select-none"
      ]
    }),
    label: {
      class: [
        // Flexbox
        "flex-initial",
        // Size
        "w-0"
      ]
    }
  },
  movebottombutton: {
    root: ({ context }) => ({
      class: [
        // Flexbox & Alignment
        "relative inline-flex items-center justify-center",
        // Shape
        "rounded-md",
        // Color
        "text-white dark:text-surface-900",
        "bg-primary-500 dark:bg-primary-400",
        "border border-primary-500 dark:border-primary-400",
        // Spacing & Size
        "text-sm",
        "w-8",
        "m-0",
        "px-2.5 py-1.5 min-w-[2rem]",
        "shadow-sm",
        // Transitions
        "transition duration-200 ease-in-out",
        // State
        "hover:bg-primary-600 dark:hover:bg-primary-300 hover:border-primary-600 dark:hover:border-primary-300",
        "focus:outline-none focus:outline-offset-0 focus:ring-2",
        "focus:ring-primary-500 dark:focus:ring-primary-400",
        { "cursor-default pointer-events-none opacity-60": context.disabled },
        // Interactivity
        "cursor-pointer user-select-none"
      ]
    }),
    label: {
      class: [
        // Flexbox
        "flex-initial",
        // Size
        "w-0"
      ]
    }
  },
  container: {
    class: ["flex-auto"]
  },
  header: {
    class: [
      "font-semibold",
      // Shape
      "border-b rounded-t-md",
      // Spacing
      "py-3.5 px-3",
      // Color
      "text-surface-800 dark:text-white/80",
      "bg-surface-0 dark:bg-surface-800",
      "border-surface-200 dark:border-surface-700 border-b"
    ]
  },
  list: {
    class: [
      // Spacing
      "list-none m-0 p-0",
      // Size
      "min-h-[12rem] max-h-[24rem]",
      // Shape
      "rounded-b-md border-0",
      // Color
      "text-surface-600 dark:text-white/80",
      "bg-surface-0 dark:bg-surface-800",
      "border border-surface-200 dark:border-surface-700",
      // Spacing
      "py-3 px-0",
      // Focus & Outline
      "outline-none",
      // Misc
      "overflow-auto"
    ]
  },
  item: ({ context }) => ({
    class: [
      // Position
      "relative",
      // Spacing
      "py-3.5 px-3 m-0",
      // Shape
      "border-b last:border-b-0",
      // Transition
      "transition duration-200",
      // Color
      "text-surface-700 dark:text-white/80",
      "border-surface-200 dark:border-surface-700",
      { "bg-surface-100 dark:bg-surface-600/30": context.active && !context.focused },
      { "bg-surface-200 dark:bg-surface-500/30": context.active && context.focused },
      { "bg-surface-50 dark:bg-surface-700/70": !context.active && context.focused },
      // State
      "hover:bg-surface-100 dark:hover:bg-surface-700",
      // Misc
      "cursor-pointer overflow-hidden"
    ]
  })
};
const organizationchart = {
  table: {
    class: [
      // Spacing & Position
      "mx-auto my-0",
      // Table Style
      "border-spacing-0 border-separate"
    ]
  },
  cell: {
    class: [
      // Alignment
      "text-center align-top",
      // Spacing
      "py-0 px-3"
    ]
  },
  node: ({ context }) => ({
    class: [
      "relative inline-block",
      // Font
      "text-sm leading-none",
      // Spacing
      "px-5 py-3",
      // Shape
      "border",
      "rounded",
      // Color
      "border-surface-200",
      {
        "text-surface-600": !(context == null ? void 0 : context.selected),
        "bg-surface-0": !(context == null ? void 0 : context.selected),
        "text-surface-700": context == null ? void 0 : context.selected,
        "bg-surface-50": context == null ? void 0 : context.selected
      },
      // States
      {
        "hover:bg-surface-100": context == null ? void 0 : context.selectable
      },
      { "cursor-pointer": context == null ? void 0 : context.selectable }
    ]
  }),
  linecell: {
    class: [
      // Alignment
      "text-center align-top",
      // Spacing
      "py-0 px-3"
    ]
  },
  linedown: {
    class: [
      // Spacing
      "mx-auto my-0",
      // Size
      "w-px h-[20px]",
      // Color
      "bg-surface-200"
    ]
  },
  lineleft: ({ context }) => ({
    class: [
      // Alignment
      "text-center align-top",
      // Spacing
      "py-0 px-3",
      // Shape
      "rounded-none border-r",
      { "border-t": context.lineTop },
      // Color
      "border-surface-200"
    ]
  }),
  lineright: ({ context }) => ({
    class: [
      // Alignment
      "text-center align-top",
      // Spacing
      "py-0 px-3",
      // Shape
      "rounded-none",
      // Color
      {
        "border-t border-surface-200": context.lineTop
      }
    ]
  }),
  nodecell: {
    class: "text-center align-top py-0 px-3"
  },
  nodetoggler: {
    class: [
      // Position
      "absolute bottom-[-0.75rem] left-2/4 -ml-3",
      "z-20",
      // Flexbox
      "flex items-center justify-center",
      // Size
      "w-6 h-6",
      // Shape
      "rounded-full",
      // Color
      "bg-inherit text-inherit",
      // Focus
      "focus:outline-none focus:outline-offset-0 focus:ring-2 focus:ring-primary-500",
      // Misc
      "cursor-pointer no-underline select-none"
    ]
  },
  nodetogglericon: {
    class: [
      // Position
      "relative inline-block",
      // Size
      "w-4 h-4"
    ]
  }
};
const overlaypanel = {
  root: {
    class: [
      // Shape
      "rounded-lg",
      "shadow-xl",
      "border-0",
      // Position
      "absolute left-0 top-0 mt-2",
      "z-40 transform origin-center",
      // Color
      "bg-surface-0",
      "text-surface-700",
      // Before: Triangle
      "before:absolute before:-top-[9px] before:-ml-[9px] before:left-[calc(var(--overlayArrowLeft,0)+1.25rem)] z-0",
      "before:w-0 before:h-0 before:shadow-xl",
      "before:border-transparent before:border-solid",
      "before:border-x-[8px] before:border-[8px]",
      "before:border-t-0 before:border-b-surface-300/10",
      "after:absolute after:-top-2 after:-ml-[8px] after:left-[calc(var(--overlayArrowLeft,0)+1.25rem)]",
      "after:w-0 after:h-0",
      "after:border-transparent after:border-solid",
      "after:border-x-[0.5rem] after:border-[0.5rem]",
      "after:border-t-0 after:border-b-surface-0"
    ]
  },
  content: {
    class: "p-6 items-center flex"
  },
  transition: {
    enterFromClass: "opacity-0 scale-y-[0.8]",
    enterActiveClass: "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
    leaveActiveClass: "transition-opacity duration-100 ease-linear",
    leaveToClass: "opacity-0"
  }
};
const paginator = {
  root: {
    class: [
      // Flex & Alignment
      "flex items-center justify-center flex-wrap",
      // Spacing
      "px-4",
      // Shape
      "border-t",
      // Color
      "bg-surface-0",
      "text-surface-500",
      "border-surface-200"
    ]
  },
  paginatorwrapper: {
    class: "-mt-px"
  },
  firstpagebutton: ({ context }) => ({
    class: [
      "relative",
      // Font
      "text-sm font-medium",
      // Flex & Alignment
      "inline-flex items-center justify-center",
      // Shape
      "border-t-2 border-transparent",
      // Size
      "min-w-[3rem] h-12 -mt-px",
      // Color
      "text-surface-500 ",
      // State
      {
        "hover:border-surface-300": !context.disabled,
        "focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring-2 focus-visible:ring-primary-500": !context.disabled
      },
      // Transition
      "transition duration-200",
      // Misc
      "user-none overflow-hidden",
      { "cursor-default pointer-events-none opacity-60": context.disabled }
    ]
  }),
  previouspagebutton: ({ context }) => ({
    class: [
      "relative",
      // Font
      "text-sm font-medium",
      // Flex & Alignment
      "inline-flex items-center justify-center",
      // Shape
      "border-t-2 border-transparent",
      // Size
      "min-w-[3rem] h-12 -mt-px",
      // Color
      "text-surface-500 ",
      // State
      {
        "hover:border-surface-300": !context.disabled,
        "focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring-2 focus-visible:ring-primary-500": !context.disabled
      },
      // Transition
      "transition duration-200",
      // Misc
      "user-none overflow-hidden",
      { "cursor-default pointer-events-none opacity-60": context.disabled }
    ]
  }),
  nextpagebutton: ({ context }) => ({
    class: [
      "relative",
      // Font
      "text-sm font-medium",
      // Flex & Alignment
      "inline-flex items-center justify-center",
      // Shape
      "border-t-2 border-transparent",
      // Size
      "min-w-[3rem] h-12 -mt-px",
      // Color
      "text-surface-500 ",
      // State
      {
        "hover:border-surface-300": !context.disabled,
        "focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring-2 focus-visible:ring-primary-500": !context.disabled
      },
      // Transition
      "transition duration-200",
      // Misc
      "user-none overflow-hidden",
      { "cursor-default pointer-events-none opacity-60": context.disabled }
    ]
  }),
  lastpagebutton: ({ context }) => ({
    class: [
      "relative",
      // Font
      "text-sm font-medium",
      // Flex & Alignment
      "inline-flex items-center justify-center",
      // Shape
      "border-t-2 border-transparent",
      // Size
      "min-w-[3rem] h-12 -mt-px",
      // Color
      "text-surface-500 ",
      // State
      {
        "hover:border-surface-300": !context.disabled,
        "focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring-2 focus-visible:ring-primary-500": !context.disabled
      },
      // Transition
      "transition duration-200",
      // Misc
      "user-none overflow-hidden",
      { "cursor-default pointer-events-none opacity-60": context.disabled }
    ]
  }),
  pagebutton: ({ context }) => ({
    class: [
      "relative",
      // Font
      "text-sm font-medium",
      // Flex & Alignment
      "inline-flex items-center justify-center",
      // Shape
      "border-t-2",
      // Size
      "min-w-[3rem] h-12 -mt-px",
      // Color
      {
        "text-surface-500  border-transparent": !context.active,
        "border-primary-500 text-primary-500": context.active
      },
      // State
      {
        "hover:border-surface-300": !context.disabled && !context.active,
        "focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring-2 focus-visible:ring-primary-500": !context.disabled
      },
      // Transition
      "transition duration-200",
      // Misc
      "user-none overflow-hidden",
      { "cursor-default pointer-events-none opacity-60": context.disabled }
    ]
  }),
  rowperpagedropdown: {
    root: ({ props, state }) => ({
      class: [
        // Display and Position
        "inline-flex",
        "relative",
        // Shape
        "h-8",
        "rounded-md",
        // Spacing
        "mx-2",
        // Color and Background
        "bg-transparent",
        // Transitions
        "transition-all",
        "duration-200",
        // States
        {
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600": !state.focused
        },
        // Misc
        "cursor-pointer",
        "select-none",
        {
          "opacity-60": props.disabled,
          "pointer-events-none": props.disabled,
          "cursor-default": props.disabled
        }
      ]
    }),
    input: {
      class: [
        //Font
        "font-sans",
        "leading-6",
        "sm:text-sm",
        // Display
        "block",
        "flex-auto",
        "flex items-center",
        // Color and Background
        "bg-transparent",
        "border-0",
        "text-surface-800",
        // Sizing and Spacing
        "w-[1%]",
        "py-1.5 px-3 pr-0",
        //Shape
        "rounded-none",
        // Transitions
        "transition",
        "duration-200",
        // States
        "focus-visible:outline-none focus-visible:shadow-none",
        // Misc
        "relative",
        "cursor-pointer",
        "overflow-hidden overflow-ellipsis",
        "whitespace-nowrap",
        "appearance-none"
      ]
    },
    trigger: {
      class: [
        //Font
        "sm:text-sm",
        // Flexbox
        "flex items-center justify-center",
        "shrink-0",
        // Color and Background
        "bg-transparent",
        "text-surface-500",
        // Size
        "w-12",
        "h-8",
        // Shape
        "rounded-tr-md",
        "rounded-br-md"
      ]
    },
    dropdownicon: {
      class: ""
    },
    panel: {
      class: [
        // Position
        "absolute top-0 left-0",
        "mt-1",
        // Shape
        "border-0",
        "rounded-md",
        "shadow-md",
        // Color
        "bg-surface-0",
        "text-surface-800",
        "ring-1 ring-inset ring-surface-300"
      ]
    },
    wrapper: {
      class: [
        // Sizing
        "max-h-[15rem]",
        // Misc
        "overflow-auto"
      ]
    },
    list: {
      class: "py-1 list-none m-0"
    },
    item: ({ context }) => ({
      class: [
        // Font
        "sm:text-sm",
        "leading-none",
        { "font-normal": !context.selected, "font-bold": context.selected },
        // Position
        "relative",
        // Shape
        "border-0",
        "rounded-none",
        // Spacing
        "m-0",
        "py-2 px-4",
        // Color
        {
          "text-surface-700": !context.focused && !context.selected
        },
        {
          "bg-primary-500 text-white": context.focused && context.selected
        },
        {
          "bg-transparent text-surface-700": !context.focused && context.selected
        },
        //States
        "hover:bg-primary-500 hover:text-white",
        // Misc
        "cursor-pointer",
        "overflow-hidden",
        "whitespace-nowrap"
      ]
    })
  },
  jumptopageinput: {
    root: {
      class: "inline-flex mx-2"
    },
    input: {
      root: {
        class: [
          "relative",
          //Font
          "font-sans",
          "leading-6",
          "sm:text-sm",
          // Display
          "block",
          "flex-auto",
          // Color and Background
          "bg-transparent",
          "border-0",
          "text-surface-800",
          "ring-1 ring-inset ring-surface-300",
          // Sizing and Spacing
          "w-[1%] max-w-[3rem]",
          "py-1.5 px-3",
          //Shape
          "rounded-md",
          // Transitions
          "transition",
          "duration-200",
          // States
          "hover:border-primary-500",
          "focus-visible:outline-none focus-visible:shadow-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-600",
          // Misc
          "cursor-pointer",
          "overflow-hidden overflow-ellipsis",
          "whitespace-nowrap",
          "appearance-none"
        ]
      }
    }
  },
  jumptopagedropdown: {
    root: ({ props, state }) => ({
      class: [
        // Display and Position
        "inline-flex",
        "relative",
        // Shape
        "h-8",
        "rounded-md",
        // Spacing
        "mx-2",
        // Color and Background
        "bg-transparent",
        // Transitions
        "transition-all",
        "duration-200",
        // States
        {
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600": !state.focused
        },
        // Misc
        "cursor-pointer",
        "select-none",
        {
          "opacity-60": props.disabled,
          "pointer-events-none": props.disabled,
          "cursor-default": props.disabled
        }
      ]
    }),
    input: {
      class: [
        //Font
        "font-sans",
        "leading-6",
        "sm:text-sm",
        // Display
        "block",
        "flex-auto",
        "flex items-center",
        // Color and Background
        "bg-transparent",
        "border-0",
        "text-surface-800",
        // Sizing and Spacing
        "w-[1%]",
        "py-1.5 px-3 pr-0",
        //Shape
        "rounded-none",
        // Transitions
        "transition",
        "duration-200",
        // States
        "focus-visible:outline-none focus-visible:shadow-none",
        // Misc
        "relative",
        "cursor-pointer",
        "overflow-hidden overflow-ellipsis",
        "whitespace-nowrap",
        "appearance-none"
      ]
    },
    trigger: {
      class: [
        //Font
        "sm:text-sm",
        // Flexbox
        "flex items-center justify-center",
        "shrink-0",
        // Color and Background
        "bg-transparent",
        "text-surface-500",
        // Size
        "w-12",
        "h-8",
        // Shape
        "rounded-tr-md",
        "rounded-br-md"
      ]
    },
    panel: {
      class: [
        // Position
        "absolute top-0 left-0",
        "mt-1",
        // Shape
        "border-0",
        "rounded-md",
        "shadow-md",
        // Color
        "bg-surface-0",
        "text-surface-800",
        "ring-1 ring-inset ring-surface-300"
      ]
    },
    wrapper: {
      class: [
        // Sizing
        "max-h-[15rem]",
        // Misc
        "overflow-auto"
      ]
    },
    list: {
      class: "py-1 list-none m-0"
    },
    item: ({ context }) => ({
      class: [
        // Font
        "sm:text-sm",
        "leading-none",
        { "font-normal": !context.selected, "font-bold": context.selected },
        // Position
        "relative",
        // Shape
        "border-0",
        "rounded-none",
        // Spacing
        "m-0",
        "py-2 px-4",
        // Color
        {
          "text-surface-700": !context.focused && !context.selected
        },
        {
          "bg-primary-500 text-white": context.focused && context.selected
        },
        {
          "bg-transparent text-surface-700": !context.focused && context.selected
        },
        //States
        "hover:bg-primary-500 hover:text-white",
        // Misc
        "cursor-pointer",
        "overflow-hidden",
        "whitespace-nowrap"
      ]
    })
  },
  start: {
    class: "mr-auto"
  },
  end: {
    class: "ml-auto"
  }
};
const panel = {
  root: {
    class: "shadow-md rounded-lg"
  },
  header: ({ props }) => ({
    class: [
      // Alignments
      "flex items-center justify-between",
      // Colors
      "text-surface-700",
      "bg-surface-0",
      "border-b border-surface-200",
      //Shape
      "rounded-tl-lg rounded-tr-lg",
      // Conditional Spacing
      {
        "px-5 md:px-6 py-5": !props.toggleable,
        "py-3 px-5 md:px-6": props.toggleable
      }
    ]
  }),
  title: {
    class: "leading-none font-medium"
  },
  toggler: {
    class: [
      // Alignments
      "inline-flex items-center justify-center",
      // Sized
      "w-8 h-8",
      //Shape
      "border-0 rounded-full",
      //Color
      "bg-transparent",
      "text-surface-600",
      // States
      "hover:text-surface-900",
      "hover:bg-surface-50",
      "focus:outline-none focus:outline-offset-0 focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-inset",
      // Transitions
      "transition duration-200 ease-in-out",
      // Misc
      "overflow-hidden relative no-underline"
    ]
  },
  togglerIcon: {
    class: "inline-block"
  },
  content: {
    class: [
      // Spacing
      "py-6 px-5 md:px-6",
      // Shape
      "last:rounded-br-lg last:rounded-bl-lg",
      //Color
      "bg-surface-0",
      "text-surface-700"
    ]
  },
  footer: {
    class: [
      // Spacing
      "py-6 px-5 md:px-6",
      //Shape
      "rounded-bl-lg rounded-br-lg",
      // Color
      "bg-surface-0",
      "text-surface-600",
      "border-t border-surface-200"
    ]
  },
  transition: {
    enterFromClass: "max-h-0",
    enterActiveClass: "overflow-hidden transition-[max-height] duration-1000 ease-[cubic-bezier(0.42,0,0.58,1)]",
    enterToClass: "max-h-[1000px]",
    leaveFromClass: "max-h-[1000px]",
    leaveActiveClass: "overflow-hidden transition-[max-height] duration-[450ms] ease-[cubic-bezier(0,1,0,1)]",
    leaveToClass: "max-h-0"
  }
};
const panelmenu = {
  panel: {
    class: "mb-1"
  },
  header: {
    class: [
      "rounded-md",
      "outline-none",
      "focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring focus-visible:ring-primary-400/50"
    ]
  },
  headercontent: ({ context, instance }) => {
    var _a, _b;
    return {
      class: [
        // Shape
        "rounded-t-md",
        {
          "rounded-br-md rounded-bl-md": !context.active || ((_a = instance.activeItem) == null ? void 0 : _a.items) === void 0,
          "rounded-br-0 rounded-bl-0": context.active && ((_b = instance.activeItem) == null ? void 0 : _b.items) !== void 0
        },
        // Color
        "border border-surface-200",
        "bg-surface-0",
        "text-surface-600",
        { "text-surface-900 ark:text-surface-0": context.active },
        // Transition
        "transition duration-200 ease-in-out",
        "transition-shadow duration-200"
      ]
    };
  },
  headeraction: {
    class: [
      "relative",
      // Font
      "font-semibold",
      "text-sm",
      "leading-none",
      // Flex & Alignments
      "flex items-center",
      // Spacing
      "px-3 py-2",
      // Misc
      "select-none cursor-pointer no-underline"
    ]
  },
  headerlabel: {
    class: "leading-none"
  },
  headerIcon: {
    class: "mr-2 text-sm"
  },
  submenuicon: {
    class: "ml-auto order-last text-sm"
  },
  menucontent: {
    class: [
      // Spacing
      "py-1",
      // Shape
      "border border-t-0",
      "rounded-t-none rounded-br-md rounded-bl-md",
      // Color
      "text-surface-700",
      "bg-surface-0",
      "border-surface-200"
    ]
  },
  menu: {
    class: ["outline-none", "m-0 p-0 list-none"]
  },
  content: {
    class: [
      // Shape
      "border-none rounded-none",
      // Color
      "text-surface-700",
      // Transition
      "transition-shadow duration-200"
    ]
  },
  action: ({ context }) => ({
    class: [
      "relative",
      // Font
      "text-sm leading-none",
      // Flex & Alignments
      "flex items-center",
      // Spacing
      "py-2 px-3",
      // Color
      "text-surface-700",
      // States
      "hover:bg-surface-100 hover:text-surface-700",
      {
        "bg-surface-200 text-surface-700": context.focused
      },
      // Misc
      "cursor-pointer no-underline",
      "select-none overflow-hidden"
    ]
  }),
  icon: {
    class: "mr-2"
  },
  submenu: {
    class: "p-0 pl-4 m-0 list-none"
  },
  transition: {
    enterFromClass: "max-h-0",
    enterActiveClass: "overflow-hidden transition-[max-height] duration-1000 ease-[cubic-bezier(0.42,0,0.58,1)]",
    enterToClass: "max-h-[1000px]",
    leaveFromClass: "max-h-[1000px]",
    leaveActiveClass: "overflow-hidden transition-[max-height] duration-[450ms] ease-[cubic-bezier(0,1,0,1)]",
    leaveToClass: "max-h-0"
  }
};
const password = {
  root: ({ props }) => ({
    class: [
      "inline-flex relative",
      {
        "opacity-60 select-none pointer-events-none cursor-default": props.disabled
      },
      { "[&>input]:pr-10": props.toggleMask }
    ]
  }),
  panel: {
    class: [
      // Spacing
      "p-3",
      // Shape
      "border-0",
      "shadow-md rounded-md",
      // Colors
      "bg-surface-0",
      "text-surface-700"
    ]
  },
  meter: {
    class: [
      // Position and Overflow
      "overflow-hidden",
      "relative",
      // Shape and Size
      "border-0",
      "h-2",
      "rounded-md",
      // Spacing
      "mb-2",
      // Colors
      "bg-surface-100"
    ]
  },
  meterlabel: ({ instance }) => {
    var _a, _b, _c;
    return {
      class: [
        // Size
        "h-full",
        // Colors
        {
          "bg-red-500": ((_a = instance == null ? void 0 : instance.meter) == null ? void 0 : _a.strength) == "weak",
          "bg-orange-500": ((_b = instance == null ? void 0 : instance.meter) == null ? void 0 : _b.strength) == "medium",
          "bg-green-500": ((_c = instance == null ? void 0 : instance.meter) == null ? void 0 : _c.strength) == "strong"
        },
        // Transitions
        "transition-all duration-1000 ease-in-out"
      ]
    };
  },
  showicon: {
    class: ["absolute top-1/2 right-3 -mt-2 z-10", "text-surface-600"]
  },
  hideicon: {
    class: ["absolute top-1/2 right-3 -mt-2 z-10", "text-surface-600"]
  },
  input: {
    root: ({ props, context, parent }) => ({
      class: [
        // Font
        "font-sans leading-6",
        // Flex
        { "flex-1 w-[1%]": parent.instance.$name == "InputGroup" },
        // Spacing
        "m-0",
        {
          "py-3 px-4 text-lg sm:text-md": props.size == "large",
          "py-1 px-2 sm:text-sm": props.size == "small",
          "py-1.5 px-3 sm:text-sm": props.size == null
        },
        "w-full",
        // Colors
        "text-surface-900",
        "placeholder:text-surface-400",
        "bg-surface-0",
        "shadow-sm",
        {
          "ring-1 ring-inset ring-offset-0": parent.instance.$name !== "InputGroup"
        },
        { "ring-surface-300": !parent.props.invalid },
        // Invalid State
        { "ring-red-500": parent.props.invalid },
        // Shape
        { "rounded-md": parent.instance.$name !== "InputGroup" },
        {
          "first:rounded-l-md rounded-none last:rounded-r-md": parent.instance.$name == "InputGroup"
        },
        {
          "border-0 border-y border-l last:border-r border-surface-300": parent.instance.$name == "InputGroup"
        },
        {
          "first:ml-0 -ml-px": parent.instance.$name == "InputGroup" && !props.showButtons
        },
        "appearance-none",
        // Interactions
        {
          "outline-none focus:ring-primary-500": !context.disabled,
          "opacity-60 select-none pointer-events-none cursor-default": context.disabled
        }
      ]
    })
  },
  transition: {
    enterFromClass: "opacity-0 scale-y-[0.8]",
    enterActiveClass: "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
    leaveActiveClass: "transition-opacity duration-100 ease-linear",
    leaveToClass: "opacity-0"
  }
};
const picklist = {
  root: {
    class: [
      // Flexbox
      "flex lg:flex-row flex-col"
    ]
  },
  sourcecontrols: {
    class: [
      // Flexbox & Alignment
      "flex lg:flex-col justify-center gap-2",
      // Spacing
      "p-3"
    ]
  },
  sourcemoveupbutton: {
    root: ({ context }) => ({
      class: [
        // Flexbox & Alignment
        "relative inline-flex items-center justify-center",
        // Shape
        "rounded-md",
        // Color
        "text-white dark:text-surface-900",
        "bg-primary-500 dark:bg-primary-400",
        "border border-primary-500 dark:border-primary-400",
        // Spacing & Size
        "text-sm",
        "w-8",
        "m-0",
        "px-2.5 py-1.5 min-w-[2rem]",
        "shadow-sm",
        // Transitions
        "transition duration-200 ease-in-out",
        // State
        "hover:bg-primary-600 dark:hover:bg-primary-300 hover:border-primary-600 dark:hover:border-primary-300",
        "focus:outline-none focus:outline-offset-0 focus:ring-2",
        "focus:ring-primary-500 dark:focus:ring-primary-400",
        { "cursor-default pointer-events-none opacity-60": context.disabled },
        // Interactivity
        "cursor-pointer user-select-none"
      ]
    }),
    label: {
      class: [
        // Flexbox
        "flex-initial",
        // Size
        "w-0"
      ]
    }
  },
  sourcemovetopbutton: {
    root: ({ context }) => ({
      class: [
        // Flexbox & Alignment
        "relative inline-flex items-center justify-center",
        // Shape
        "rounded-md",
        // Color
        "text-white dark:text-surface-900",
        "bg-primary-500 dark:bg-primary-400",
        "border border-primary-500 dark:border-primary-400",
        // Spacing & Size
        "text-sm",
        "w-8",
        "m-0",
        "px-2.5 py-1.5 min-w-[2rem]",
        "shadow-sm",
        // Transitions
        "transition duration-200 ease-in-out",
        // State
        "hover:bg-primary-600 dark:hover:bg-primary-300 hover:border-primary-600 dark:hover:border-primary-300",
        "focus:outline-none focus:outline-offset-0 focus:ring-2",
        "focus:ring-primary-500 dark:focus:ring-primary-400",
        { "cursor-default pointer-events-none opacity-60": context.disabled },
        // Interactivity
        "cursor-pointer user-select-none"
      ]
    }),
    label: {
      class: [
        // Flexbox
        "flex-initial",
        // Size
        "w-0"
      ]
    }
  },
  sourcemovedownbutton: {
    root: ({ context }) => ({
      class: [
        // Flexbox & Alignment
        "relative inline-flex items-center justify-center",
        // Shape
        "rounded-md",
        // Color
        "text-white dark:text-surface-900",
        "bg-primary-500 dark:bg-primary-400",
        "border border-primary-500 dark:border-primary-400",
        // Spacing & Size
        "text-sm",
        "w-8",
        "m-0",
        "px-2.5 py-1.5 min-w-[2rem]",
        "shadow-sm",
        // Transitions
        "transition duration-200 ease-in-out",
        // State
        "hover:bg-primary-600 dark:hover:bg-primary-300 hover:border-primary-600 dark:hover:border-primary-300",
        "focus:outline-none focus:outline-offset-0 focus:ring-2",
        "focus:ring-primary-500 dark:focus:ring-primary-400",
        { "cursor-default pointer-events-none opacity-60": context.disabled },
        // Interactivity
        "cursor-pointer user-select-none"
      ]
    }),
    label: {
      class: [
        // Flexbox
        "flex-initial",
        // Size
        "w-0"
      ]
    }
  },
  sourcemovebottombutton: {
    root: ({ context }) => ({
      class: [
        // Flexbox & Alignment
        "relative inline-flex items-center justify-center",
        // Shape
        "rounded-md",
        // Color
        "text-white dark:text-surface-900",
        "bg-primary-500 dark:bg-primary-400",
        "border border-primary-500 dark:border-primary-400",
        // Spacing & Size
        "text-sm",
        "w-8",
        "m-0",
        "px-2.5 py-1.5 min-w-[2rem]",
        "shadow-sm",
        // Transitions
        "transition duration-200 ease-in-out",
        // State
        "hover:bg-primary-600 dark:hover:bg-primary-300 hover:border-primary-600 dark:hover:border-primary-300",
        "focus:outline-none focus:outline-offset-0 focus:ring-2",
        "focus:ring-primary-500 dark:focus:ring-primary-400",
        { "cursor-default pointer-events-none opacity-60": context.disabled },
        // Interactivity
        "cursor-pointer user-select-none"
      ]
    }),
    label: {
      class: [
        // Flexbox
        "flex-initial",
        // Size
        "w-0"
      ]
    }
  },
  sourcewrapper: {
    class: "grow shrink basis-2/4"
  },
  sourceheader: {
    class: [
      "font-semibold",
      // Shape
      "border-b rounded-t-md",
      // Spacing
      "py-3.5 px-3",
      // Color
      "text-surface-800 dark:text-white/80",
      "bg-surface-0 dark:bg-surface-800",
      "border-surface-200 dark:border-surface-700 border-b"
    ]
  },
  sourcelist: {
    class: [
      // Spacing
      "list-none m-0 p-0",
      // Size
      "min-h-[12rem] max-h-[24rem]",
      // Shape
      "rounded-b-md border-0",
      // Color
      "text-surface-600 dark:text-white/80",
      "bg-surface-0 dark:bg-surface-800",
      "border border-surface-200 dark:border-surface-700",
      // Spacing
      "py-3 px-0",
      // Focus & Outline
      "outline-none",
      // Misc
      "overflow-auto"
    ]
  },
  item: ({ context }) => ({
    class: [
      // Position
      "relative",
      // Spacing
      "py-3.5 px-3 m-0",
      // Shape
      "border-b last:border-b-0",
      // Transition
      "transition duration-200",
      // Color
      "text-surface-700 dark:text-white/80",
      "border-surface-200 dark:border-surface-700",
      { "bg-surface-100 dark:bg-surface-600/30": context.active && !context.focused },
      { "bg-surface-200 dark:bg-surface-500/30": context.active && context.focused },
      { "bg-surface-50 dark:bg-surface-700/70": !context.active && context.focused },
      // State
      "hover:bg-surface-100 dark:hover:bg-surface-700",
      // Misc
      "cursor-pointer overflow-hidden"
    ]
  }),
  buttons: {
    class: "flex lg:flex-col justify-center gap-2 p-3"
  },
  movetotargetbutton: {
    root: ({ context }) => ({
      class: [
        // Flexbox & Alignment
        "relative inline-flex items-center justify-center",
        // Shape
        "rounded-md",
        // Color
        "text-white dark:text-surface-900",
        "bg-primary-500 dark:bg-primary-400",
        "border border-primary-500 dark:border-primary-400",
        // Spacing & Size
        "text-sm",
        "w-8",
        "m-0",
        "px-2.5 py-1.5 min-w-[2rem]",
        "shadow-sm",
        // Transitions
        "transition duration-200 ease-in-out",
        // State
        "hover:bg-primary-600 dark:hover:bg-primary-300 hover:border-primary-600 dark:hover:border-primary-300",
        "focus:outline-none focus:outline-offset-0 focus:ring-2",
        "focus:ring-primary-500 dark:focus:ring-primary-400",
        { "cursor-default pointer-events-none opacity-60": context.disabled },
        // Interactivity
        "cursor-pointer user-select-none"
      ]
    }),
    label: {
      class: [
        // Flexbox
        "flex-initial",
        // Size
        "w-0"
      ]
    }
  },
  movealltotargetbutton: {
    root: ({ context }) => ({
      class: [
        // Flexbox & Alignment
        "relative inline-flex items-center justify-center",
        // Shape
        "rounded-md",
        // Color
        "text-white dark:text-surface-900",
        "bg-primary-500 dark:bg-primary-400",
        "border border-primary-500 dark:border-primary-400",
        // Spacing & Size
        "text-sm",
        "w-8",
        "m-0",
        "px-2.5 py-1.5 min-w-[2rem]",
        "shadow-sm",
        // Transitions
        "transition duration-200 ease-in-out",
        // State
        "hover:bg-primary-600 dark:hover:bg-primary-300 hover:border-primary-600 dark:hover:border-primary-300",
        "focus:outline-none focus:outline-offset-0 focus:ring-2",
        "focus:ring-primary-500 dark:focus:ring-primary-400",
        { "cursor-default pointer-events-none opacity-60": context.disabled },
        // Interactivity
        "cursor-pointer user-select-none"
      ]
    }),
    label: {
      class: [
        // Flexbox
        "flex-initial",
        // Size
        "w-0"
      ]
    }
  },
  movetosourcebutton: {
    root: ({ context }) => ({
      class: [
        // Flexbox & Alignment
        "relative inline-flex items-center justify-center",
        // Shape
        "rounded-md",
        // Color
        "text-white dark:text-surface-900",
        "bg-primary-500 dark:bg-primary-400",
        "border border-primary-500 dark:border-primary-400",
        // Spacing & Size
        "text-sm",
        "w-8",
        "m-0",
        "px-2.5 py-1.5 min-w-[2rem]",
        "shadow-sm",
        // Transitions
        "transition duration-200 ease-in-out",
        // State
        "hover:bg-primary-600 dark:hover:bg-primary-300 hover:border-primary-600 dark:hover:border-primary-300",
        "focus:outline-none focus:outline-offset-0 focus:ring-2",
        "focus:ring-primary-500 dark:focus:ring-primary-400",
        { "cursor-default pointer-events-none opacity-60": context.disabled },
        // Interactivity
        "cursor-pointer user-select-none"
      ]
    }),
    label: {
      class: [
        // Flexbox
        "flex-initial",
        // Size
        "w-0"
      ]
    }
  },
  movealltosourcebutton: {
    root: ({ context }) => ({
      class: [
        // Flexbox & Alignment
        "relative inline-flex items-center justify-center",
        // Shape
        "rounded-md",
        // Color
        "text-white dark:text-surface-900",
        "bg-primary-500 dark:bg-primary-400",
        "border border-primary-500 dark:border-primary-400",
        // Spacing & Size
        "text-sm",
        "w-8",
        "m-0",
        "px-2.5 py-1.5 min-w-[2rem]",
        "shadow-sm",
        // Transitions
        "transition duration-200 ease-in-out",
        // State
        "hover:bg-primary-600 dark:hover:bg-primary-300 hover:border-primary-600 dark:hover:border-primary-300",
        "focus:outline-none focus:outline-offset-0 focus:ring-2",
        "focus:ring-primary-500 dark:focus:ring-primary-400",
        { "cursor-default pointer-events-none opacity-60": context.disabled },
        // Interactivity
        "cursor-pointer user-select-none"
      ]
    }),
    label: {
      class: [
        // Flexbox
        "flex-initial",
        // Size
        "w-0"
      ]
    }
  },
  targetcontrols: {
    class: "flex lg:flex-col justify-center gap-2 p-3"
  },
  targetmoveupbutton: {
    root: ({ context }) => ({
      class: [
        // Flexbox & Alignment
        "relative inline-flex items-center justify-center",
        // Shape
        "rounded-md",
        // Color
        "text-white dark:text-surface-900",
        "bg-primary-500 dark:bg-primary-400",
        "border border-primary-500 dark:border-primary-400",
        // Spacing & Size
        "text-sm",
        "w-8",
        "m-0",
        "px-2.5 py-1.5 min-w-[2rem]",
        "shadow-sm",
        // Transitions
        "transition duration-200 ease-in-out",
        // State
        "hover:bg-primary-600 dark:hover:bg-primary-300 hover:border-primary-600 dark:hover:border-primary-300",
        "focus:outline-none focus:outline-offset-0 focus:ring-2",
        "focus:ring-primary-500 dark:focus:ring-primary-400",
        { "cursor-default pointer-events-none opacity-60": context.disabled },
        // Interactivity
        "cursor-pointer user-select-none"
      ]
    }),
    label: {
      class: [
        // Flexbox
        "flex-initial",
        // Size
        "w-0"
      ]
    }
  },
  targetmovetopbutton: {
    root: ({ context }) => ({
      class: [
        // Flexbox & Alignment
        "relative inline-flex items-center justify-center",
        // Shape
        "rounded-md",
        // Color
        "text-white dark:text-surface-900",
        "bg-primary-500 dark:bg-primary-400",
        "border border-primary-500 dark:border-primary-400",
        // Spacing & Size
        "text-sm",
        "w-8",
        "m-0",
        "px-2.5 py-1.5 min-w-[2rem]",
        "shadow-sm",
        // Transitions
        "transition duration-200 ease-in-out",
        // State
        "hover:bg-primary-600 dark:hover:bg-primary-300 hover:border-primary-600 dark:hover:border-primary-300",
        "focus:outline-none focus:outline-offset-0 focus:ring-2",
        "focus:ring-primary-500 dark:focus:ring-primary-400",
        { "cursor-default pointer-events-none opacity-60": context.disabled },
        // Interactivity
        "cursor-pointer user-select-none"
      ]
    }),
    label: {
      class: [
        // Flexbox
        "flex-initial",
        // Size
        "w-0"
      ]
    }
  },
  targetmovedownbutton: {
    root: ({ context }) => ({
      class: [
        // Flexbox & Alignment
        "relative inline-flex items-center justify-center",
        // Shape
        "rounded-md",
        // Color
        "text-white dark:text-surface-900",
        "bg-primary-500 dark:bg-primary-400",
        "border border-primary-500 dark:border-primary-400",
        // Spacing & Size
        "text-sm",
        "w-8",
        "m-0",
        "px-2.5 py-1.5 min-w-[2rem]",
        "shadow-sm",
        // Transitions
        "transition duration-200 ease-in-out",
        // State
        "hover:bg-primary-600 dark:hover:bg-primary-300 hover:border-primary-600 dark:hover:border-primary-300",
        "focus:outline-none focus:outline-offset-0 focus:ring-2",
        "focus:ring-primary-500 dark:focus:ring-primary-400",
        { "cursor-default pointer-events-none opacity-60": context.disabled },
        // Interactivity
        "cursor-pointer user-select-none"
      ]
    }),
    label: {
      class: [
        // Flexbox
        "flex-initial",
        // Size
        "w-0"
      ]
    }
  },
  targetmovebottombutton: {
    root: ({ context }) => ({
      class: [
        // Flexbox & Alignment
        "relative inline-flex items-center justify-center",
        // Shape
        "rounded-md",
        // Color
        "text-white dark:text-surface-900",
        "bg-primary-500 dark:bg-primary-400",
        "border border-primary-500 dark:border-primary-400",
        // Spacing & Size
        "text-sm",
        "w-8",
        "m-0",
        "px-2.5 py-1.5 min-w-[2rem]",
        "shadow-sm",
        // Transitions
        "transition duration-200 ease-in-out",
        // State
        "hover:bg-primary-600 dark:hover:bg-primary-300 hover:border-primary-600 dark:hover:border-primary-300",
        "focus:outline-none focus:outline-offset-0 focus:ring-2",
        "focus:ring-primary-500 dark:focus:ring-primary-400",
        { "cursor-default pointer-events-none opacity-60": context.disabled },
        // Interactivity
        "cursor-pointer user-select-none"
      ]
    }),
    label: {
      class: [
        // Flexbox
        "flex-initial",
        // Size
        "w-0"
      ]
    }
  },
  targetwrapper: {
    class: "grow shrink basis-2/4"
  },
  targetheader: {
    class: [
      "font-semibold",
      // Shape
      "border-b rounded-t-md",
      // Spacing
      "py-3.5 px-3",
      // Color
      "text-surface-800 dark:text-white/80",
      "bg-surface-0 dark:bg-surface-800",
      "border-surface-200 dark:border-surface-700 border-b"
    ]
  },
  targetlist: {
    class: [
      // Spacing
      "list-none m-0 p-0",
      // Size
      "min-h-[12rem] max-h-[24rem]",
      // Shape
      "rounded-b-md border-0",
      // Color
      "text-surface-600 dark:text-white/80",
      "bg-surface-0 dark:bg-surface-800",
      "border border-surface-200 dark:border-surface-700",
      // Spacing
      "py-3 px-0",
      // Focus & Outline
      "outline-none",
      // Misc
      "overflow-auto"
    ]
  },
  transition: {
    enterFromClass: "!transition-none",
    enterActiveClass: "!transition-none",
    leaveActiveClass: "!transition-none",
    leaveToClass: "!transition-none"
  }
};
const progressbar = {
  root: ({ props }) => ({
    class: [
      // Position and Overflow
      "relative overflow-hidden",
      // Shape and Size
      "border-0",
      "rounded-md",
      { "h-7 pt-5": props.mode !== "indeterminate" && props.showValue },
      {
        "h-2 bg-surface-100": props.mode == "indeterminate" || !props.showValue
      },
      // Before & After (!indeterminate)
      {
        "before:absolute before:w-full before:rounded-md before:h-2 before:top-[1.25rem] before:left-0 before:bottom-0 before:bg-surface-100": props.mode !== "indeterminate"
      }
    ]
  }),
  value: ({ props }) => ({
    class: [
      // Flexbox & Overflow & Position
      {
        "absolute flex items-center justify-center": props.mode !== "indeterminate"
      },
      // Colors
      "bg-primary-500",
      // Spacing & Sizing
      "m-0",
      { "h-2 w-0": props.mode !== "indeterminate" },
      // Shape
      "border-0 rounded-md",
      // Transitions
      {
        "transition-width duration-1000 ease-in-out": props.mode !== "indeterminate",
        "progressbar-value-animate": props.mode == "indeterminate"
      },
      // Before & After (indeterminate)
      {
        "before:absolute before:top-0 before:left-0 before:bottom-0 before:bg-inherit ": props.mode == "indeterminate",
        "after:absolute after:top-0 after:left-0 after:bottom-0 after:bg-inherit after:delay-1000": props.mode == "indeterminate"
      }
    ]
  }),
  label: {
    class: [
      // Flexbox
      "inline-flex justify-end",
      "absolute inset-0 mr-1 -top-[1.15rem]",
      // Font and Text
      "text-sm text-surface-600",
      "leading-none"
    ]
  }
};
const progressspinner = {
  root: {
    class: [
      // Position
      "relative",
      "mx-auto",
      // Sizing
      "w-28",
      "h-28",
      // Flexbox
      "inline-block",
      // Pseudo-Elements
      "before:block",
      "before:pt-full"
    ]
  },
  spinner: {
    class: [
      // Position
      "absolute",
      "top-0",
      "bottom-0",
      "left-0",
      "right-0",
      "m-auto",
      // Sizing
      "w-full",
      "h-full",
      // Transformations
      "transform",
      "origin-center",
      // Animations
      "animate-spin"
    ]
  },
  circle: {
    class: [
      // Colors
      "text-red-500",
      // Misc
      "progress-spinner-circle"
    ]
  }
};
const radiobutton = {
  root: {
    class: [
      "relative",
      // Flexbox & Alignment
      "inline-flex",
      "align-bottom",
      // Size
      "w-4 h-4",
      // Misc
      "cursor-default",
      "select-none"
    ]
  },
  box: ({ props }) => ({
    class: [
      // Flexbox
      "flex justify-center items-center",
      // Size
      "w-4 h-4",
      "text-sm",
      "font-medium",
      // Shape
      "border-2",
      "rounded-full",
      // Transition
      "transition duration-200 ease-in-out",
      // Colors
      {
        "text-surface-700": props.value !== props.modelValue && props.value !== void 0,
        "bg-surface-0": props.value !== props.modelValue && props.value !== void 0,
        "border-surface-300": props.value !== props.modelValue && props.value !== void 0 && !props.invalid,
        "border-primary-500": props.value == props.modelValue && props.value !== void 0
      },
      // Invalid State
      { "border-red-500": props.invalid },
      // States
      {
        "outline-none outline-offset-0": !props.disabled,
        "peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-surface-0 peer-focus-visible:ring-primary-500": !props.disabled,
        "opacity-60 cursor-default": props.disabled
      }
    ]
  }),
  input: {
    class: [
      "peer",
      // Size
      "w-full ",
      "h-full",
      // Position
      "absolute",
      "top-0 left-0",
      "z-10",
      // Spacing
      "p-0",
      "m-0",
      // Shape
      "opacity-0",
      "rounded-md",
      "outline-none",
      "border-2 border-surface-300",
      // Misc
      "appearance-none",
      "cursor-default"
    ]
  },
  icon: {
    class: "hidden"
  }
};
const rating = {
  root: ({ props }) => ({
    class: [
      "relative",
      // Flex & Alignment
      "flex items-center",
      "gap-1",
      // Misc
      {
        "opacity-60 select-none pointer-events-none cursor-default": props.disabled
      }
    ]
  }),
  cancelitem: ({ context }) => ({
    class: [
      // Flex & Alignment
      "inline-flex items-center",
      //State
      {
        "outline-none ring-2 ring-primary-500": context.focused
      },
      // Misc
      "cursor-pointer"
    ]
  }),
  cancelicon: {
    class: [
      // Size
      "w-5 h-5",
      // Color
      "text-red-500"
    ]
  },
  item: ({ props, context }) => ({
    class: [
      // Flex & Alignment
      "inline-flex items-center",
      // State
      {
        "outline-none ring-2 ring-primary-500": context.focused
      },
      // Misc
      {
        "cursor-pointer": !props.readonly,
        "cursor-default": props.readonly
      }
    ]
  }),
  officon: ({ props }) => ({
    class: [
      // Size
      "w-5 h-5",
      // Color
      "text-surface-700",
      // State
      { "hover:text-primary-500": !props.readonly },
      // Transition
      "transition duration-200 ease-in"
    ]
  }),
  onicon: ({ props }) => ({
    class: [
      // Size
      "w-5 h-5",
      // Color
      "text-primary-500",
      // Transition
      "transition duration-200 ease-in"
    ]
  })
};
const ripple = {
  root: {
    class: ["block absolute bg-surface-0/50 rounded-full pointer-events-none"],
    style: "transform: scale(0)"
  }
};
const scrollpanel = {
  wrapper: {
    class: [
      // Size & Position
      "h-full w-full",
      // Layering
      "z-[1]",
      // Spacing
      "overflow-hidden",
      // Misc
      "relative float-left"
    ]
  },
  content: {
    class: [
      // Size & Spacing
      "h-[calc(100%+12px)] w-[calc(100%+12px)] pr-[12px] pb-[12px] pl-0 pt-0",
      // Overflow & Scrollbar
      "overflow-scroll scrollbar-none",
      // Box Model
      "box-border",
      // Position
      "relative",
      // Webkit Specific
      "[&::-webkit-scrollbar]:hidden"
    ]
  },
  barX: {
    class: [
      // Size & Position
      "h-[6px] bottom-0",
      // Appearance
      "bg-surface-100 rounded",
      // Interactivity
      "cursor-pointer",
      // Visibility & Layering
      "invisible z-20",
      // Transition
      "transition duration-[250ms] ease-linear",
      // Misc
      "relative"
    ]
  },
  barY: {
    class: [
      // Size & Position
      "w-[6px] top-0",
      // Appearance
      "bg-surface-100 rounded",
      // Interactivity
      "cursor-pointer",
      // Visibility & Layering
      "z-20",
      // Transition
      "transition duration-[250ms] ease-linear",
      // Misc
      "relative"
    ]
  }
};
const scrolltop = {
  root: ({ props }) => ({
    class: [
      // Flex & Alignment
      "flex items-center justify-center",
      // Positioning
      {
        sticky: props.target === "parent",
        fixed: props.target === "window"
      },
      "bottom-[20px] right-[20px]",
      "ml-auto",
      // Shape & Size
      {
        "rounded-md h-8 w-8": props.target === "parent",
        "h-12 w-12 rounded-full shadow-md": props.target === "window"
      },
      // Color
      "text-white",
      {
        "bg-primary-500 hover:bg-primary-600": props.target === "parent",
        "bg-surface-500 hover:bg-surface-600": props.target === "window"
      },
      // States
      {
        "hover:bg-primary-600": props.target === "parent",
        "hover:bg-surface-600": props.target === "window"
      }
    ]
  }),
  transition: {
    enterFromClass: "opacity-0",
    enterActiveClass: "transition-opacity duration-150",
    leaveActiveClass: "transition-opacity duration-150",
    leaveToClass: "opacity-0"
  }
};
const selectbutton = {
  root: ({ props }) => ({
    class: [
      "shadow-sm",
      {
        "opacity-60 select-none pointer-events-none cursor-default": props.disabled
      }
    ]
  }),
  button: ({ context, props }) => ({
    class: [
      "relative",
      // Font
      "text-sm",
      "leading-none",
      // Flex Alignment
      "inline-flex items-center align-bottom text-center",
      // Spacing
      "px-2.5 py-1.5",
      // Shape
      "ring-1",
      { "ring-surface-200": !props.invalid },
      "first:rounded-l-md first:rounded-tr-none first:rounded-br-none",
      "last:rounded-tl-none last:rounded-bl-none last:rounded-r-md ",
      // Color
      {
        "bg-surface-0": !context.active,
        "text-surface-700": !context.active,
        "bg-surface-100": context.active
      },
      // Invalid State
      { "ring-red-500": props.invalid },
      // States
      "focus:outline-none focus:outline-offset-0 focus:ring-primary-500 focus:z-10",
      "hover:bg-surface-200",
      {
        "opacity-60 select-none pointer-events-none cursor-default": context.disabled
      },
      // Transition
      "transition duration-200",
      // Misc
      "cursor-pointer select-none overflow-hidden"
    ]
  }),
  label: {
    class: "font-semibold"
  }
};
const sidebar = {
  root: ({ props }) => ({
    class: [
      // Flexbox
      "flex flex-col",
      // Position
      "relative",
      {
        "!transition-none !transform-none !w-screen !h-screen !max-h-full !top-0 !left-0": props.position == "full"
      },
      // Size
      {
        "h-full w-full max-w-[28rem]": props.position == "left" || props.position == "right",
        "h-auto w-full": props.position == "top" || props.position == "bottom"
      },
      // Shape
      "border-0",
      "shadow-xl",
      // Colors
      "bg-surface-0",
      "text-surface-700",
      // Transitions
      "transition-transform",
      "duration-300",
      // Misc
      "pointer-events-auto"
    ]
  }),
  header: {
    class: [
      // Flexbox and Alignment
      "flex items-center justify-between",
      "shrink-0",
      // Spacing
      "px-6 pt-6",
      // Colors
      "bg-surface-0",
      "text-surface-700"
    ]
  },
  title: {
    class: ["font-semibold leading-6 text-base m-0"]
  },
  icons: {
    class: ["flex items-center"]
  },
  closeButton: {
    class: [
      "relative",
      // Flexbox and Alignment
      "flex items-center justify-center",
      // Size and Spacing
      "mr-2",
      "last:mr-0",
      "w-6 h-6",
      // Shape
      "border-0",
      "rounded-full",
      // Colors
      "text-surface-500",
      "bg-transparent",
      // Transitions
      "transition duration-200 ease-in-out",
      // States
      "hover:text-surface-700",
      "hover:bg-surface-100",
      "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-inset",
      "focus:ring-primary-500",
      // Misc
      "overflow-hidden"
    ]
  },
  closeicon: {
    class: [
      // Display
      "inline-block",
      // Size
      "w-3",
      "h-3"
    ]
  },
  content: {
    class: [
      // Spacing and Size
      "px-6 pb-6",
      "mt-6",
      "h-full",
      "w-full",
      // Growth and Overflow
      "grow",
      "overflow-y-auto"
    ]
  },
  mask: ({ props }) => ({
    class: [
      // Transitions
      "transition",
      "duration-300",
      { "p-5": !props.position == "full" },
      // Background and Effects
      {
        "has-[.mask-active]:bg-transparent bg-surface-500/70": props.modal,
        "has-[.mask-active]:backdrop-blur-none backdrop-blur-sm": props.modal
      }
    ]
  }),
  transition: ({ props }) => {
    return props.position === "top" ? {
      enterFromClass: "translate-x-0 -translate-y-full translate-z-0 mask-active",
      leaveToClass: "translate-x-0 -translate-y-full translate-z-0 mask-active"
    } : props.position === "bottom" ? {
      enterFromClass: "translate-x-0 translate-y-full translate-z-0 mask-active",
      leaveToClass: "translate-x-0 translate-y-full translate-z-0 mask-active"
    } : props.position === "left" ? {
      enterFromClass: "-translate-x-full translate-y-0 translate-z-0 mask-active",
      leaveToClass: "-translate-x-full translate-y-0 translate-z-0 mask-active"
    } : props.position === "right" ? {
      enterFromClass: "translate-x-full translate-y-0 translate-z-0 mask-active",
      leaveToClass: "translate-x-full translate-y-0 translate-z-0 mask-active"
    } : {
      enterFromClass: "opacity-0 mask-active",
      enterActiveClass: "transition-opacity duration-400 ease-in",
      leaveActiveClass: "transition-opacity duration-400 ease-in",
      leaveToClass: "opacity-0 mask-active"
    };
  }
};
const skeleton = {
  root: ({ props }) => ({
    class: [
      "overflow-hidden",
      {
        "animate-pulse": props.animation !== "none"
      },
      // Round
      {
        "rounded-full": props.shape === "circle",
        "rounded-md": props.shape !== "circle"
      },
      // Colors
      "bg-surface-200"
    ]
  })
};
const slider = {
  root: ({ props }) => ({
    class: [
      "relative",
      "flex items-center",
      // Size
      {
        "h-2 w-full min-w-[15rem]": props.orientation == "horizontal",
        "w-2 h-full min-h-[15rem]": props.orientation == "vertical"
      },
      // Shape
      "border-0 rounded-lg",
      // Colors
      "bg-surface-100",
      // States
      {
        "opacity-60 select-none pointer-events-none cursor-default": props.disabled
      }
    ]
  }),
  range: ({ props }) => ({
    class: [
      // Position
      "block absolute",
      {
        "top-0 left-0": props.orientation == "horizontal",
        "bottom-0 left-0": props.orientation == "vertical"
      },
      //Size
      {
        "h-full": props.orientation == "horizontal",
        "w-full": props.orientation == "vertical"
      },
      //Shape
      "rounded-lg",
      // Colors
      "bg-primary-500"
    ]
  }),
  handle: ({ props }) => ({
    class: [
      "block",
      // Size
      "h-4",
      "w-4",
      {
        "top-[50%] mt-[-0.5rem] ml-[-0.5rem]": props.orientation == "horizontal",
        "left-[50%] mb-[-0.5rem] ml-[-0.5rem]": props.orientation == "vertical"
      },
      // Shape
      "rounded-full",
      "ring-2",
      // Colors
      "bg-surface-0",
      "ring-primary-500",
      // Transitions
      "transition duration-200",
      // Misc
      "cursor-grab",
      "touch-action-none"
    ]
  }),
  starthandler: ({ props }) => ({
    class: [
      "block",
      // Size
      "h-4",
      "w-4",
      {
        "top-[50%] mt-[-0.5rem] ml-[-0.5rem]": props.orientation == "horizontal",
        "left-[50%] mb-[-0.5rem] ml-[-0.5rem]": props.orientation == "vertical"
      },
      // Shape
      "rounded-full",
      "ring-2",
      // Colors
      "bg-surface-0",
      "ring-primary-500",
      // Transitions
      "transition duration-200",
      // Misc
      "cursor-grab",
      "touch-action-none"
    ]
  }),
  endhandler: ({ props }) => ({
    class: [
      "block",
      // Size
      "h-4",
      "w-4",
      {
        "top-[50%] mt-[-0.5rem] ml-[-0.5rem]": props.orientation == "horizontal",
        "left-[50%] mb-[-0.5rem] ml-[-0.5rem]": props.orientation == "vertical"
      },
      // Shape
      "rounded-full",
      "ring-2",
      // Colors
      "bg-surface-0",
      "ring-primary-500",
      // Transitions
      "transition duration-200",
      // Misc
      "cursor-grab",
      "touch-action-none"
    ]
  })
};
const speeddial = {
  root: {
    class: "absolute flex"
  },
  button: {
    root: ({ props, context, parent }) => ({
      class: [
        "relative",
        "z-20",
        // Alignments
        "items-center inline-flex text-center align-bottom justify-center",
        // Sizes & Spacing
        "leading-[normal]",
        "w-12 h-12 p-0 py-3",
        // Shapes
        "rounded-full",
        "shadow-md",
        // Link Button
        { "text-primary-600 bg-transparent ring-transparent": props.link },
        // Plain Button
        { "text-white bg-gray-500 ring-1 ring-gray-500": props.plain && !props.outlined && !props.text },
        // Plain Text Button
        { "text-surface-500": props.plain && props.text },
        // Plain Outlined Button
        { "text-surface-500 ring-1 ring-gray-500": props.plain && props.outlined },
        // Text Button
        { "bg-transparent ring-transparent": props.text && !props.plain },
        // Outlined Button
        { "bg-transparent": props.outlined && !props.plain },
        // --- Severity Buttons ---
        // Primary Button
        {
          "text-white dark:text-surface-900": !props.link && props.severity === null && !props.text && !props.outlined && !props.plain,
          "bg-primary-500 dark:bg-primary-400": !props.link && props.severity === null && !props.text && !props.outlined && !props.plain,
          "ring-1 ring-primary-500 dark:ring-primary-400": !props.link && props.severity === null && !props.text && !props.outlined && !props.plain
        },
        // Primary Text Button
        { "text-primary-500 dark:text-primary-400": props.text && props.severity === null && !props.plain },
        // Primary Outlined Button
        { "text-primary-500 ring-1 ring-primary-500 hover:bg-primary-300/20": props.outlined && props.severity === null && !props.plain },
        // Secondary Button
        {
          "text-white dark:text-surface-900": props.severity === "secondary" && !props.text && !props.outlined && !props.plain,
          "bg-surface-500 dark:bg-surface-400": props.severity === "secondary" && !props.text && !props.outlined && !props.plain,
          "ring-1 ring-surface-500 dark:ring-surface-400": props.severity === "secondary" && !props.text && !props.outlined && !props.plain
        },
        // Secondary Text Button
        { "text-surface-500 dark:text-surface-400": props.text && props.severity === "secondary" && !props.plain },
        // Secondary Outlined Button
        { "text-surface-500 ring-1 ring-surface-500 hover:bg-surface-300/20": props.outlined && props.severity === "secondary" && !props.plain },
        // Success Button
        {
          "text-white dark:text-green-900": props.severity === "success" && !props.text && !props.outlined && !props.plain,
          "bg-green-500 dark:bg-green-400": props.severity === "success" && !props.text && !props.outlined && !props.plain,
          "ring-1 ring-green-500 dark:ring-green-400": props.severity === "success" && !props.text && !props.outlined && !props.plain
        },
        // Success Text Button
        { "text-green-500 dark:text-green-400": props.text && props.severity === "success" && !props.plain },
        // Success Outlined Button
        { "text-green-500 ring-1 ring-green-500 hover:bg-green-300/20": props.outlined && props.severity === "success" && !props.plain },
        // Info Button
        {
          "text-white dark:text-surface-900": props.severity === "info" && !props.text && !props.outlined && !props.plain,
          "bg-blue-500 dark:bg-blue-400": props.severity === "info" && !props.text && !props.outlined && !props.plain,
          "ring-1 ring-blue-500 dark:ring-blue-400": props.severity === "info" && !props.text && !props.outlined && !props.plain
        },
        // Info Text Button
        { "text-blue-500 dark:text-blue-400": props.text && props.severity === "info" && !props.plain },
        // Info Outlined Button
        { "text-blue-500 ring-1 ring-blue-500 hover:bg-blue-300/20 ": props.outlined && props.severity === "info" && !props.plain },
        // Warning Button
        {
          "text-white dark:text-surface-900": props.severity === "warning" && !props.text && !props.outlined && !props.plain,
          "bg-orange-500 dark:bg-orange-400": props.severity === "warning" && !props.text && !props.outlined && !props.plain,
          "ring-1 ring-orange-500 dark:ring-orange-400": props.severity === "warning" && !props.text && !props.outlined && !props.plain
        },
        // Warning Text Button
        { "text-orange-500 dark:text-orange-400": props.text && props.severity === "warning" && !props.plain },
        // Warning Outlined Button
        { "text-orange-500 ring-1 ring-orange-500 hover:bg-orange-300/20": props.outlined && props.severity === "warning" && !props.plain },
        // Help Button
        {
          "text-white dark:text-surface-900": props.severity === "help" && !props.text && !props.outlined && !props.plain,
          "bg-purple-500 dark:bg-purple-400": props.severity === "help" && !props.text && !props.outlined && !props.plain,
          "ring-1 ring-purple-500 dark:ring-purple-400": props.severity === "help" && !props.text && !props.outlined && !props.plain
        },
        // Help Text Button
        { "text-purple-500 dark:text-purple-400": props.text && props.severity === "help" && !props.plain },
        // Help Outlined Button
        { "text-purple-500 ring-1 ring-purple-500 hover:bg-purple-300/20": props.outlined && props.severity === "help" && !props.plain },
        // Danger Button
        {
          "text-white dark:text-surface-900": props.severity === "danger" && !props.text && !props.outlined && !props.plain,
          "bg-red-500 dark:bg-red-400": props.severity === "danger" && !props.text && !props.outlined && !props.plain,
          "ring-1 ring-red-500 dark:ring-red-400": props.severity === "danger" && !props.text && !props.outlined && !props.plain
        },
        // Danger Text Button
        { "text-red-500 dark:text-red-400": props.text && props.severity === "danger" && !props.plain },
        // Danger Outlined Button
        { "text-red-500 ring-1 ring-red-500 hover:bg-red-300/20": props.outlined && props.severity === "danger" && !props.plain },
        // --- Severity Button States ---
        "focus:outline-none focus:outline-offset-0 focus:ring-2 focus:ring-offset-current",
        { "focus:ring-offset-2": !props.link && !props.plain && !props.outlined && !props.text },
        // Link
        { "focus:ring-primary-500 dark:focus:ring-primary-400": props.link },
        // Plain
        { "hover:bg-gray-600 hover:ring-gray-600": props.plain && !props.outlined && !props.text },
        // Text & Outlined Button
        { "hover:bg-surface-300/20": props.plain && (props.text || props.outlined) },
        // Primary
        { "hover:bg-primary-600 dark:hover:bg-primary-300 hover:ring-primary-600 dark:hover:ring-primary-300": !props.link && props.severity === null && !props.text && !props.outlined && !props.plain },
        { "focus:ring-primary-500 dark:focus:ring-primary-400": props.severity === null },
        // Text & Outlined Button
        { "hover:bg-primary-300/20": (props.text || props.outlined) && props.severity === null && !props.plain },
        // Secondary
        { "hover:bg-surface-600 dark:hover:bg-surface-300 hover:ring-surface-600 dark:hover:ring-surface-300": props.severity === "secondary" && !props.text && !props.outlined && !props.plain },
        { "focus:ring-surface-500 dark:focus:ring-surface-400": props.severity === "secondary" },
        // Text & Outlined Button
        { "hover:bg-surface-300/20": (props.text || props.outlined) && props.severity === "secondary" && !props.plain },
        // Success
        { "hover:bg-green-600 dark:hover:bg-green-300 hover:ring-green-600 dark:hover:ring-green-300": props.severity === "success" && !props.text && !props.outlined && !props.plain },
        { "focus:ring-green-500 dark:focus:ring-green-400": props.severity === "success" },
        // Text & Outlined Button
        { "hover:bg-green-300/20": (props.text || props.outlined) && props.severity === "success" && !props.plain },
        // Info
        { "hover:bg-blue-600 dark:hover:bg-blue-300 hover:ring-blue-600 dark:hover:ring-blue-300": props.severity === "info" && !props.text && !props.outlined && !props.plain },
        { "focus:ring-blue-500 dark:focus:ring-blue-400": props.severity === "info" },
        // Text & Outlined Button
        { "hover:bg-blue-300/20": (props.text || props.outlined) && props.severity === "info" && !props.plain },
        // Warning
        { "hover:bg-orange-600 dark:hover:bg-orange-300 hover:ring-orange-600 dark:hover:ring-orange-300": props.severity === "warning" && !props.text && !props.outlined && !props.plain },
        { "focus:ring-orange-500 dark:focus:ring-orange-400": props.severity === "warning" },
        // Text & Outlined Button
        { "hover:bg-orange-300/20": (props.text || props.outlined) && props.severity === "warning" && !props.plain },
        // Help
        { "hover:bg-purple-600 dark:hover:bg-purple-300 hover:ring-purple-600 dark:hover:ring-purple-300": props.severity === "help" && !props.text && !props.outlined && !props.plain },
        { "focus:ring-purple-500 dark:focus:ring-purple-400": props.severity === "help" },
        // Text & Outlined Button
        { "hover:bg-purple-300/20": (props.text || props.outlined) && props.severity === "help" && !props.plain },
        // Danger
        { "hover:bg-red-600 dark:hover:bg-red-300 hover:ring-red-600 dark:hover:ring-red-300": props.severity === "danger" && !props.text && !props.outlined && !props.plain },
        { "focus:ring-red-500 dark:focus:ring-red-400": props.severity === "danger" },
        // Text & Outlined Button
        { "hover:bg-red-300/20": (props.text || props.outlined) && props.severity === "danger" && !props.plain },
        // Disabled
        { "opacity-60 pointer-events-none cursor-default": context.disabled },
        // Transitions
        "transition duration-200 ease-in-out",
        parent.state.d_visible ? "rotate-45" : "rotate-0",
        // Misc
        "cursor-pointer overflow-hidden select-none"
      ]
    }),
    label: ({ props }) => ({
      class: [
        "duration-200",
        "font-semibold",
        {
          "hover:underline": props.link
        },
        { "flex-1": props.label !== null, "invisible w-0": props.label == null }
      ]
    }),
    icon: ({ props }) => ({
      class: [
        "mx-0",
        {
          "mr-2": props.iconPos == "left" && props.label != null,
          "ml-2 order-1": props.iconPos == "right" && props.label != null,
          "mb-2": props.iconPos == "top" && props.label != null,
          "mt-2": props.iconPos == "bottom" && props.label != null
        }
      ]
    }),
    loadingicon: ({ props }) => ({
      class: [
        "h-3 w-3",
        "mx-0",
        {
          "mr-2": props.iconPos == "left" && props.label != null,
          "ml-2 order-1": props.iconPos == "right" && props.label != null,
          "mb-2": props.iconPos == "top" && props.label != null,
          "mt-2": props.iconPos == "bottom" && props.label != null
        },
        "animate-spin"
      ]
    }),
    badge: ({ props }) => ({
      class: [{ "ml-2 w-4 h-4 leading-none flex items-center justify-center": props.badge }]
    })
  },
  menu: {
    class: [
      // Spacing
      "m-0 p-0",
      // Layout & Flexbox
      "list-none flex items-center justify-center",
      // Transitions
      "transition delay-200",
      // Z-Index (Positioning)
      "z-20"
    ]
  },
  menuitem: ({ props, context }) => ({
    class: [
      "transform transition-transform duration-200 ease-out transition-opacity duration-800",
      // Conditional Appearance
      context.hidden ? "opacity-0 scale-0" : "opacity-100 scale-100",
      // Conditional Spacing
      {
        "my-1 first:mb-2": props.direction == "up" && props.type == "linear",
        "my-1 first:mt-2": props.direction == "down" && props.type == "linear",
        "mx-1 first:mr-2": props.direction == "left" && props.type == "linear",
        "mx-1 first:ml-2": props.direction == "right" && props.type == "linear"
      },
      // Conditional Positioning
      { absolute: props.type !== "linear" }
    ]
  }),
  action: {
    class: [
      // Flexbox & Alignment
      "flex items-center justify-center",
      // Size
      "w-12 h-12",
      // Shape
      "rounded-full relative overflow-hidden",
      // Appearance
      "bg-surface-600 dark:bg-surface-0/80 text-white dark:text-surface-900/80",
      // Hover Effects
      "hover:bg-surface-700 dark:hover:bg-surface-200/80"
    ]
  },
  mask: ({ state }) => ({
    class: [
      // Base Styles
      "absolute left-0 top-0 w-full h-full transition-opacity duration-250 ease-in-out bg-surface-900/40 backdrop-blur-sm z-0",
      // Conditional Appearance
      {
        "opacity-0 pointer-events-none": !state.d_visible,
        "opacity-100 transition-opacity duration-400 ease-in-out": state.d_visible
      }
    ]
  })
};
const splitbutton = {
  root: ({ props }) => ({
    class: [
      // Flexbox and Position
      "inline-flex",
      "relative",
      // Shape
      "rounded-md",
      { "shadow-lg": props.raised }
    ]
  }),
  button: {
    root: ({ parent }) => ({
      class: [
        "relative",
        // Alignments
        "items-center inline-flex text-center align-bottom justify-center",
        // Sizes & Spacing
        "text-sm",
        {
          "px-2.5 py-1.5 min-w-[2rem]": parent.props.size === null,
          "px-2 py-1": parent.props.size === "small",
          "px-3 py-2": parent.props.size === "large"
        },
        {
          "min-w-8 p-0 py-1.5": parent.props.label == null && parent.props.icon !== null
        },
        // Shape
        "rounded-r-none",
        "border-r-0",
        { "rounded-l-full": parent.props.rounded },
        { "rounded-md": !parent.props.rounded, "rounded-full": parent.props.rounded },
        // Link Button
        { "text-primary-600 bg-transparent ring-transparent": parent.props.link },
        // Plain Button
        { "text-white bg-gray-500 ring-1 ring-gray-500": parent.props.plain && !parent.props.outlined && !parent.props.text },
        // Plain Text Button
        { "text-surface-500": parent.props.plain && parent.props.text },
        // Plain Outlined Button
        { "text-surface-500 ring-1 ring-gray-500": parent.props.plain && parent.props.outlined },
        // Text Button
        { "bg-transparent ring-transparent": parent.props.text && !parent.props.plain },
        // Outlined Button
        { "bg-transparent": parent.props.outlined && !parent.props.plain },
        // --- Severity Buttons ---
        // Primary Button
        {
          "text-white dark:text-surface-900": !parent.props.link && parent.props.severity === null && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "bg-primary-500 dark:bg-primary-400": !parent.props.link && parent.props.severity === null && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "ring-1 ring-primary-500 dark:ring-primary-400": !parent.props.link && parent.props.severity === null && !parent.props.text && !parent.props.outlined && !parent.props.plain
        },
        // Primary Text Button
        { "text-primary-500 dark:text-primary-400": parent.props.text && parent.props.severity === null && !parent.props.plain },
        // Primary Outlined Button
        { "text-primary-500 ring-1 ring-primary-500 hover:bg-primary-300/20": parent.props.outlined && parent.props.severity === null && !parent.props.plain },
        // Secondary Button
        {
          "text-white dark:text-surface-900": parent.props.severity === "secondary" && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "bg-surface-500 dark:bg-surface-400": parent.props.severity === "secondary" && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "ring-1 ring-surface-500 dark:ring-surface-400": parent.props.severity === "secondary" && !parent.props.text && !parent.props.outlined && !parent.props.plain
        },
        // Secondary Text Button
        { "text-surface-500 dark:text-surface-400": parent.props.text && parent.props.severity === "secondary" && !parent.props.plain },
        // Secondary Outlined Button
        { "text-surface-500 ring-1 ring-surface-500 hover:bg-surface-300/20": parent.props.outlined && parent.props.severity === "secondary" && !parent.props.plain },
        // Success Button
        {
          "text-white dark:text-surface-900": parent.props.severity === "success" && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "bg-green-500 dark:bg-green-400": parent.props.severity === "success" && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "ring-1 ring-green-500 dark:ring-green-400": parent.props.severity === "success" && !parent.props.text && !parent.props.outlined && !parent.props.plain
        },
        // Success Text Button
        { "text-surface-500 dark:text-surface-400": parent.props.text && parent.props.severity === "secondary" && !parent.props.plain },
        // Success Outlined Button
        { "text-green-500 ring-1 ring-green-500 hover:bg-green-300/20": parent.props.outlined && parent.props.severity === "success" && !parent.props.plain },
        // Info Button
        {
          "text-white dark:text-surface-900": parent.props.severity === "info" && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "bg-blue-500 dark:bg-blue-400": parent.props.severity === "info" && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "ring-1 ring-blue-500 dark:ring-blue-400": parent.props.severity === "info" && !parent.props.text && !parent.props.outlined && !parent.props.plain
        },
        // Info Text Button
        { "text-blue-500 dark:text-blue-400": parent.props.text && parent.props.severity === "info" && !parent.props.plain },
        // Info Outlined Button
        { "text-blue-500 ring-1 ring-blue-500 hover:bg-blue-300/20 ": parent.props.outlined && parent.props.severity === "info" && !parent.props.plain },
        // Warning Button
        {
          "text-white dark:text-surface-900": parent.props.severity === "warning" && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "bg-orange-500 dark:bg-orange-400": parent.props.severity === "warning" && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "ring-1 ring-orange-500 dark:ring-orange-400": parent.props.severity === "warning" && !parent.props.text && !parent.props.outlined && !parent.props.plain
        },
        // Warning Text Button
        { "text-orange-500 dark:text-orange-400": parent.props.text && parent.props.severity === "warning" && !parent.props.plain },
        // Warning Outlined Button
        { "text-orange-500 ring-1 ring-orange-500 hover:bg-orange-300/20": parent.props.outlined && parent.props.severity === "warning" && !parent.props.plain },
        // Help Button
        {
          "text-white dark:text-surface-900": parent.props.severity === "help" && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "bg-purple-500 dark:bg-purple-400": parent.props.severity === "help" && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "ring-1 ring-purple-500 dark:ring-purple-400": parent.props.severity === "help" && !parent.props.text && !parent.props.outlined && !parent.props.plain
        },
        // Help Text Button
        { "text-purple-500 dark:text-purple-400": parent.props.text && parent.props.severity === "help" && !parent.props.plain },
        // Help Outlined Button
        { "text-purple-500 ring-1 ring-purple-500 hover:bg-purple-300/20": parent.props.outlined && parent.props.severity === "help" && !parent.props.plain },
        // Danger Button
        {
          "text-white dark:text-surface-900": parent.props.severity === "danger" && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "bg-red-500 dark:bg-red-400": parent.props.severity === "danger" && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "ring-1 ring-red-500 dark:ring-red-400": parent.props.severity === "danger" && !parent.props.text && !parent.props.outlined && !parent.props.plain
        },
        // Danger Text Button
        { "text-red-500 dark:text-red-400": parent.props.text && parent.props.severity === "danger" && !parent.props.plain },
        // Danger Outlined Button
        { "text-red-500 ring-1 ring-red-500 hover:bg-red-300/20": parent.props.outlined && parent.props.severity === "danger" && !parent.props.plain },
        // --- Severity Button States ---
        "focus:outline-none focus:outline-offset-0 focus:ring-2 focus:ring-offset-current",
        { "focus:ring-offset-2": !parent.props.link && !parent.props.plain && !parent.props.outlined && !parent.props.text },
        // Link
        { "focus:ring-primary-500 dark:focus:ring-primary-400": parent.props.link },
        // Plain
        { "hover:bg-gray-600 hover:ring-gray-600": parent.props.plain && !parent.props.outlined && !parent.props.text },
        // Text & Outlined Button
        { "hover:bg-surface-300/20": parent.props.plain && (parent.props.text || parent.props.outlined) },
        // Primary
        { "hover:bg-primary-600 dark:hover:bg-primary-300 hover:ring-primary-600 dark:hover:ring-primary-300": !parent.props.link && parent.props.severity === null && !parent.props.text && !parent.props.outlined && !parent.props.plain },
        { "focus:ring-primary-500 dark:focus:ring-primary-400": parent.props.severity === null },
        // Text & Outlined Button
        { "hover:bg-primary-300/20": (parent.props.text || parent.props.outlined) && parent.props.severity === null && !parent.props.plain },
        // Secondary
        { "hover:bg-surface-600 dark:hover:bg-surface-300 hover:ring-surface-600 dark:hover:ring-surface-300": parent.props.severity === "secondary" && !parent.props.text && !parent.props.outlined && !parent.props.plain },
        { "focus:ring-surface-500 dark:focus:ring-surface-400": parent.props.severity === "secondary" },
        // Text & Outlined Button
        { "hover:bg-surface-300/20": (parent.props.text || parent.props.outlined) && parent.props.severity === "secondary" && !parent.props.plain },
        // Success
        { "hover:bg-green-600 dark:hover:bg-green-300 hover:ring-green-600 dark:hover:ring-green-300": parent.props.severity === "success" && !parent.props.text && !parent.props.outlined && !parent.props.plain },
        { "focus:ring-green-500 dark:focus:ring-green-400": parent.props.severity === "success" },
        // Text & Outlined Button
        { "hover:bg-green-300/20": (parent.props.text || parent.props.outlined) && parent.props.severity === "success" && !parent.props.plain },
        // Info
        { "hover:bg-blue-600 dark:hover:bg-blue-300 hover:ring-blue-600 dark:hover:ring-blue-300": parent.props.severity === "info" && !parent.props.text && !parent.props.outlined && !parent.props.plain },
        { "focus:ring-blue-500 dark:focus:ring-blue-400": parent.props.severity === "info" },
        // Text & Outlined Button
        { "hover:bg-blue-300/20": (parent.props.text || parent.props.outlined) && parent.props.severity === "info" && !parent.props.plain },
        // Warning
        { "hover:bg-orange-600 dark:hover:bg-orange-300 hover:ring-orange-600 dark:hover:ring-orange-300": parent.props.severity === "warning" && !parent.props.text && !parent.props.outlined && !parent.props.plain },
        { "focus:ring-orange-500 dark:focus:ring-orange-400": parent.props.severity === "warning" },
        // Text & Outlined Button
        { "hover:bg-orange-300/20": (parent.props.text || parent.props.outlined) && parent.props.severity === "warning" && !parent.props.plain },
        // Help
        { "hover:bg-purple-600 dark:hover:bg-purple-300 hover:ring-purple-600 dark:hover:ring-purple-300": parent.props.severity === "help" && !parent.props.text && !parent.props.outlined && !parent.props.plain },
        { "focus:ring-purple-500 dark:focus:ring-purple-400": parent.props.severity === "help" },
        // Text & Outlined Button
        { "hover:bg-purple-300/20": (parent.props.text || parent.props.outlined) && parent.props.severity === "help" && !parent.props.plain },
        // Warning
        { "hover:bg-red-600 dark:hover:bg-red-300 hover:ring-red-600 dark:hover:ring-red-300": parent.props.severity === "danger" && !parent.props.text && !parent.props.outlined && !parent.props.plain },
        { "focus:ring-red-500 dark:focus:ring-red-400": parent.props.severity === "danger" },
        // Text & Outlined Button
        { "hover:bg-red-300/20": (parent.props.text || parent.props.outlined) && parent.props.severity === "danger" && !parent.props.plain },
        // Transitions
        "transition duration-200 ease-in-out",
        // Misc
        "cursor-pointer overflow-hidden select-none"
      ]
    }),
    icon: {
      class: [
        // Margins
        "mr-2"
      ]
    }
  },
  menubutton: {
    root: ({ parent }) => ({
      class: [
        "relative",
        // Alignments
        "items-center inline-flex text-center align-bottom justify-center",
        // Sizes & Spacing
        "text-sm",
        {
          "px-2.5 py-1.5 min-w-[2rem]": parent.props.size === null,
          "px-2 py-1": parent.props.size === "small",
          "px-3 py-2": parent.props.size === "large"
        },
        {
          "min-w-8 p-0 py-1.5": parent.props.label == null && parent.props.icon !== null
        },
        "ml-px",
        // Shape
        "rounded-l-none",
        { "rounded-l-full": parent.props.rounded },
        { "rounded-md": !parent.props.rounded, "rounded-full": parent.props.rounded },
        // Link Button
        { "text-primary-600 bg-transparent ring-transparent": parent.props.link },
        // Plain Button
        { "text-white bg-gray-500 ring-1 ring-gray-500": parent.props.plain && !parent.props.outlined && !parent.props.text },
        // Plain Text Button
        { "text-surface-500": parent.props.plain && parent.props.text },
        // Plain Outlined Button
        { "text-surface-500 ring-1 ring-gray-500": parent.props.plain && parent.props.outlined },
        // Text Button
        { "bg-transparent ring-transparent": parent.props.text && !parent.props.plain },
        // Outlined Button
        { "bg-transparent": parent.props.outlined && !parent.props.plain },
        // --- Severity Buttons ---
        // Primary Button
        {
          "text-white dark:text-surface-900": !parent.props.link && parent.props.severity === null && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "bg-primary-500 dark:bg-primary-400": !parent.props.link && parent.props.severity === null && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "ring-1 ring-primary-500 dark:ring-primary-400": !parent.props.link && parent.props.severity === null && !parent.props.text && !parent.props.outlined && !parent.props.plain
        },
        // Primary Text Button
        { "text-primary-500 dark:text-primary-400": parent.props.text && parent.props.severity === null && !parent.props.plain },
        // Primary Outlined Button
        { "text-primary-500 ring-1 ring-primary-500 hover:bg-primary-300/20": parent.props.outlined && parent.props.severity === null && !parent.props.plain },
        // Secondary Button
        {
          "text-white dark:text-surface-900": parent.props.severity === "secondary" && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "bg-surface-500 dark:bg-surface-400": parent.props.severity === "secondary" && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "ring-1 ring-surface-500 dark:ring-surface-400": parent.props.severity === "secondary" && !parent.props.text && !parent.props.outlined && !parent.props.plain
        },
        // Secondary Text Button
        { "text-surface-500 dark:text-surface-400": parent.props.text && parent.props.severity === "secondary" && !parent.props.plain },
        // Secondary Outlined Button
        { "text-surface-500 ring-1 ring-surface-500 hover:bg-surface-300/20": parent.props.outlined && parent.props.severity === "secondary" && !parent.props.plain },
        // Success Button
        {
          "text-white dark:text-surface-900": parent.props.severity === "success" && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "bg-green-500 dark:bg-green-400": parent.props.severity === "success" && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "ring-1 ring-green-500 dark:ring-green-400": parent.props.severity === "success" && !parent.props.text && !parent.props.outlined && !parent.props.plain
        },
        // Success Text Button
        { "text-surface-500 dark:text-surface-400": parent.props.text && parent.props.severity === "secondary" && !parent.props.plain },
        // Success Outlined Button
        { "text-green-500 ring-1 ring-green-500 hover:bg-green-300/20": parent.props.outlined && parent.props.severity === "success" && !parent.props.plain },
        // Info Button
        {
          "text-white dark:text-surface-900": parent.props.severity === "info" && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "bg-blue-500 dark:bg-blue-400": parent.props.severity === "info" && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "ring-1 ring-blue-500 dark:ring-blue-400": parent.props.severity === "info" && !parent.props.text && !parent.props.outlined && !parent.props.plain
        },
        // Info Text Button
        { "text-blue-500 dark:text-blue-400": parent.props.text && parent.props.severity === "info" && !parent.props.plain },
        // Info Outlined Button
        { "text-blue-500 ring-1 ring-blue-500 hover:bg-blue-300/20 ": parent.props.outlined && parent.props.severity === "info" && !parent.props.plain },
        // Warning Button
        {
          "text-white dark:text-surface-900": parent.props.severity === "warning" && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "bg-orange-500 dark:bg-orange-400": parent.props.severity === "warning" && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "ring-1 ring-orange-500 dark:ring-orange-400": parent.props.severity === "warning" && !parent.props.text && !parent.props.outlined && !parent.props.plain
        },
        // Warning Text Button
        { "text-orange-500 dark:text-orange-400": parent.props.text && parent.props.severity === "warning" && !parent.props.plain },
        // Warning Outlined Button
        { "text-orange-500 ring-1 ring-orange-500 hover:bg-orange-300/20": parent.props.outlined && parent.props.severity === "warning" && !parent.props.plain },
        // Help Button
        {
          "text-white dark:text-surface-900": parent.props.severity === "help" && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "bg-purple-500 dark:bg-purple-400": parent.props.severity === "help" && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "ring-1 ring-purple-500 dark:ring-purple-400": parent.props.severity === "help" && !parent.props.text && !parent.props.outlined && !parent.props.plain
        },
        // Help Text Button
        { "text-purple-500 dark:text-purple-400": parent.props.text && parent.props.severity === "help" && !parent.props.plain },
        // Help Outlined Button
        { "text-purple-500 ring-1 ring-purple-500 hover:bg-purple-300/20": parent.props.outlined && parent.props.severity === "help" && !parent.props.plain },
        // Danger Button
        {
          "text-white dark:text-surface-900": parent.props.severity === "danger" && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "bg-red-500 dark:bg-red-400": parent.props.severity === "danger" && !parent.props.text && !parent.props.outlined && !parent.props.plain,
          "ring-1 ring-red-500 dark:ring-red-400": parent.props.severity === "danger" && !parent.props.text && !parent.props.outlined && !parent.props.plain
        },
        // Danger Text Button
        { "text-red-500 dark:text-red-400": parent.props.text && parent.props.severity === "danger" && !parent.props.plain },
        // Danger Outlined Button
        { "text-red-500 ring-1 ring-red-500 hover:bg-red-300/20": parent.props.outlined && parent.props.severity === "danger" && !parent.props.plain },
        // --- Severity Button States ---
        "focus:outline-none focus:outline-offset-0 focus:ring-2 focus:ring-offset-current",
        { "focus:ring-offset-2": !parent.props.link && !parent.props.plain && !parent.props.outlined && !parent.props.text },
        // Link
        { "focus:ring-primary-500 dark:focus:ring-primary-400": parent.props.link },
        // Plain
        { "hover:bg-gray-600 hover:ring-gray-600": parent.props.plain && !parent.props.outlined && !parent.props.text },
        // Text & Outlined Button
        { "hover:bg-surface-300/20": parent.props.plain && (parent.props.text || parent.props.outlined) },
        // Primary
        { "hover:bg-primary-600 dark:hover:bg-primary-300 hover:ring-primary-600 dark:hover:ring-primary-300": !parent.props.link && parent.props.severity === null && !parent.props.text && !parent.props.outlined && !parent.props.plain },
        { "focus:ring-primary-500 dark:focus:ring-primary-400": parent.props.severity === null },
        // Text & Outlined Button
        { "hover:bg-primary-300/20": (parent.props.text || parent.props.outlined) && parent.props.severity === null && !parent.props.plain },
        // Secondary
        { "hover:bg-surface-600 dark:hover:bg-surface-300 hover:ring-surface-600 dark:hover:ring-surface-300": parent.props.severity === "secondary" && !parent.props.text && !parent.props.outlined && !parent.props.plain },
        { "focus:ring-surface-500 dark:focus:ring-surface-400": parent.props.severity === "secondary" },
        // Text & Outlined Button
        { "hover:bg-surface-300/20": (parent.props.text || parent.props.outlined) && parent.props.severity === "secondary" && !parent.props.plain },
        // Success
        { "hover:bg-green-600 dark:hover:bg-green-300 hover:ring-green-600 dark:hover:ring-green-300": parent.props.severity === "success" && !parent.props.text && !parent.props.outlined && !parent.props.plain },
        { "focus:ring-green-500 dark:focus:ring-green-400": parent.props.severity === "success" },
        // Text & Outlined Button
        { "hover:bg-green-300/20": (parent.props.text || parent.props.outlined) && parent.props.severity === "success" && !parent.props.plain },
        // Info
        { "hover:bg-blue-600 dark:hover:bg-blue-300 hover:ring-blue-600 dark:hover:ring-blue-300": parent.props.severity === "info" && !parent.props.text && !parent.props.outlined && !parent.props.plain },
        { "focus:ring-blue-500 dark:focus:ring-blue-400": parent.props.severity === "info" },
        // Text & Outlined Button
        { "hover:bg-blue-300/20": (parent.props.text || parent.props.outlined) && parent.props.severity === "info" && !parent.props.plain },
        // Warning
        { "hover:bg-orange-600 dark:hover:bg-orange-300 hover:ring-orange-600 dark:hover:ring-orange-300": parent.props.severity === "warning" && !parent.props.text && !parent.props.outlined && !parent.props.plain },
        { "focus:ring-orange-500 dark:focus:ring-orange-400": parent.props.severity === "warning" },
        // Text & Outlined Button
        { "hover:bg-orange-300/20": (parent.props.text || parent.props.outlined) && parent.props.severity === "warning" && !parent.props.plain },
        // Help
        { "hover:bg-purple-600 dark:hover:bg-purple-300 hover:ring-purple-600 dark:hover:ring-purple-300": parent.props.severity === "help" && !parent.props.text && !parent.props.outlined && !parent.props.plain },
        { "focus:ring-purple-500 dark:focus:ring-purple-400": parent.props.severity === "help" },
        // Text & Outlined Button
        { "hover:bg-purple-300/20": (parent.props.text || parent.props.outlined) && parent.props.severity === "help" && !parent.props.plain },
        // Warning
        { "hover:bg-red-600 dark:hover:bg-red-300 hover:ring-red-600 dark:hover:ring-red-300": parent.props.severity === "danger" && !parent.props.text && !parent.props.outlined && !parent.props.plain },
        { "focus:ring-red-500 dark:focus:ring-red-400": parent.props.severity === "danger" },
        // Text & Outlined Button
        { "hover:bg-red-300/20": (parent.props.text || parent.props.outlined) && parent.props.severity === "danger" && !parent.props.plain },
        // Transitions
        "transition duration-200 ease-in-out",
        // Misc
        "cursor-pointer overflow-hidden select-none"
      ]
    }),
    label: {
      class: ["hidden"]
    }
  },
  menu: {
    root: {
      class: [
        // Shape
        "rounded-md",
        // Size
        "min-w-[12rem]",
        "p-1.5",
        // Colors
        "bg-surface-0 dark:bg-surface-700",
        "ring-1 ring-surface-200 dark:ring-surface-700"
      ]
    },
    menu: {
      class: [
        // Spacings and Shape
        "list-none",
        "m-0",
        "p-0",
        "outline-none"
      ]
    },
    menuitem: {
      class: ["relative first:mt-0 mt-1"]
    },
    content: ({ context }) => ({
      class: [
        //Shape
        "rounded-md",
        //  Colors
        {
          "text-surface-500 dark:text-white/70": !context.focused && !context.active,
          "text-surface-500 dark:text-white/70 bg-surface-200 dark:bg-black/70": context.focused && !context.active,
          "text-surface-900 dark:text-surface-0/80 bg-surface-50 dark:bg-black/70": context.focused && context.active,
          "text-surface-900 dark:text-surface-0/80 bg-surface-50 dark:bg-black/70": !context.focused && context.active
        },
        // Hover States
        {
          "hover:bg-surface-50 dark:hover:bg-surface-800": !context.active,
          "hover:bg-surface-100 dark:hover:bg-black/40 text-surface-900 dark:text-surface-0/80": context.active
        },
        // Transitions
        "transition-shadow",
        "duration-200"
      ]
    }),
    action: {
      class: [
        "relative",
        // Font
        "font-semibold",
        // Flexbox
        "flex",
        "items-center",
        // Spacing
        "py-2",
        "px-3",
        // Misc
        "no-underline",
        "overflow-hidden",
        "cursor-pointer",
        "select-none"
      ]
    },
    icon: {
      class: [
        // Spacing
        "mr-2",
        "leading-6",
        "text-sm"
      ]
    },
    label: {
      class: ["leading-none", "text-sm"]
    },
    submenuicon: {
      class: [
        // Position
        "ml-auto"
      ]
    },
    submenu: {
      class: [
        // Size
        "w-full sm:w-48",
        // Spacing
        "p-1.5",
        "m-0 mx-1.5",
        "list-none",
        // Shape
        "shadow-none sm:shadow-md",
        "border-0",
        // Position
        "static sm:absolute",
        "z-10",
        // Color
        "bg-surface-0 dark:bg-surface-700"
      ]
    },
    separator: {
      class: "border-t border-surface-200 dark:border-surface-600 my-1"
    }
  }
};
const splitter = {
  root: ({ context }) => ({
    class: [
      // Colors
      "bg-surface-0",
      "text-surface-700",
      // Shape
      "rounded-lg",
      // Borders (Conditional)
      {
        "border border-solid border-surface-50": !context.nested
      },
      // Nested
      { "flex grow border-0": context.nested }
    ]
  }),
  gutter: ({ props }) => ({
    class: [
      // Flexbox
      "flex",
      "items-center",
      "justify-center",
      "shrink-0",
      // Colors
      "bg-surface-50",
      // Transitions
      "transition-all",
      "duration-200",
      // Misc
      {
        "cursor-col-resize": props.layout == "horizontal",
        "cursor-row-resize": props.layout !== "horizontal"
      }
    ]
  }),
  gutterhandler: ({ props }) => ({
    class: [
      // Colors
      "bg-surface-100",
      // Transitions
      "transition-all",
      "duration-200",
      // Sizing (Conditional)
      {
        "h-7": props.layout == "horizontal",
        "w-7 h-2": props.layout !== "horizontal"
      }
    ]
  })
};
const splitterpanel = {
  root: ({ context }) => ({
    class: ["grow", { flex: context.nested }]
  })
};
const stepper = {
  root: ({ props }) => ({
    class: [
      "flex-1",
      props.orientation === "vertical" ? "flex-col" : "flex-row"
    ]
  }),
  nav: {
    class: [
      // Flexbox
      "flex",
      "justify-between",
      "items-center",
      // Spacing
      "m-0",
      "p-0",
      // Positioning
      "relative",
      // Lists
      "list-none",
      // Overflow
      "overflow-x-auto"
    ]
  },
  stepperpanel: {
    panel: ({ context, parent }) => ({
      class: [
        context.active ? "flex-1" : "",
        parent.props.orientation === "vertical" ? "flex flex-col flex-initial" : ""
      ]
    }),
    header: ({ parent, context }) => ({
      class: [
        // Position
        "relative",
        // Flexbox
        "flex",
        "items-center",
        context.last ? "flex-initial" : "flex-1",
        parent.props.orientation === "vertical" ? "flex-initial" : "",
        // Spacing
        "p-2"
      ]
    }),
    action: {
      class: [
        // Borders
        "border-0",
        "border-none",
        // Flexbox
        "inline-flex",
        "items-center",
        // Text
        "text-decoration-none",
        // Transitions
        "transition",
        "transition-shadow",
        "duration-200",
        // Shape
        "rounded-md",
        // Backgrounds
        "bg-transparent",
        // Focus
        "outline-none"
      ]
    },
    number: ({ context }) => ({
      class: [
        // Flexbox
        "flex",
        "items-center",
        "justify-center",
        // Colors (Conditional)
        context.active ? "bg-primary-500 text-surface-0" : "border border-surface-200 text-surface-900",
        // Adjust colors as needed
        // Size and Shape
        "min-w-[2rem]",
        "h-[2rem]",
        "rounded-full",
        "leading-none",
        // Borders
        context.active ? "border-0 border-none" : "border-solid border-2",
        // Transitions
        "transition",
        "transition-colors",
        "transition-shadow",
        "duration-200"
      ]
    }),
    title: ({ context }) => ({
      class: [
        // Layout
        "block",
        "whitespace-nowrap",
        "overflow-hidden",
        "text-ellipsis",
        "max-w-full",
        // Spacing
        "ml-2",
        // Text
        context.active ? "text-surface-900" : "text-surface-700",
        "font-semibold",
        // Transitions
        "transition",
        "transition-colors",
        "transition-shadow",
        "duration-200"
      ]
    }),
    separator: ({ context, state, parent }) => ({
      class: [
        // Colors (Conditional for active step)
        state.d_activeStep <= context.index ? "bg-surface-200" : "bg-primary-500",
        // Conditional for Vertical Orientation
        parent.props.orientation === "vertical" ? ["flex-none", "w-[2px]", "h-auto", "ml-[calc(1.29rem+2px)]"] : ["flex-1", "w-full", "h-[2px]", "ml-4"],
        // Transitions
        "transition-shadow",
        "duration-200"
      ]
    }),
    transition: {
      class: ["flex flex-1", "bg-surface-0", "text-surface-900"],
      enterFromClass: "max-h-0",
      enterActiveClass: "overflow-hidden transition-[max-height] duration-1000 ease-[cubic-bezier(0.42,0,0.58,1)]",
      enterToClass: "max-h-[1000px]",
      leaveFromClass: "max-h-[1000px]",
      leaveActiveClass: "overflow-hidden transition-[max-height] duration-[450ms] ease-[cubic-bezier(0,1,0,1)]",
      leaveToClass: "max-h-0"
    },
    content: ({ parent }) => ({
      class: [parent.props.orientation === "vertical" ? "w-full pl-4" : ""]
    })
  },
  panelcontainer: {
    class: [
      // Colors
      "bg-surface-0",
      "text-surface-900",
      // Spacing
      "p-4"
    ]
  }
};
const steps = {
  root: {
    class: "relative"
  },
  menu: {
    class: "p-0 m-0 list-none flex justify-center"
  },
  menuitem: {
    class: [
      // Flexbox and Position
      "relative",
      "flex",
      "justify-center"
    ]
  },
  action: ({ props, context, state }) => ({
    class: [
      // Flexbox
      "inline-flex items-start relative",
      "flex-col",
      // Transitions and Shape
      "transition-shadow",
      "rounded-md",
      // Spacing
      {
        "pr-4 min-[576px]:pr-32 md:pr-40": props.model.length !== context.index + 1
      },
      // Colors
      "bg-surface-0",
      // Misc
      { "cursor-pointer": !props.readonly },
      // After
      "after:border-t-2",
      {
        "after:border-surface-200": state.d_activeStep <= context.index
      },
      {
        "after:border-primary-500": state.d_activeStep > context.index
      },
      "after:w-full",
      "after:absolute",
      "after:top-1/2",
      "after:left-0",
      "after:transform",
      "after:-mt-3",
      { "after:hidden": props.model.length == context.index + 1 }
    ]
  }),
  step: ({ context, props, state }) => ({
    class: [
      // Flexbox
      "flex items-center justify-center",
      // Position
      "z-40",
      // Shape
      "rounded-full",
      "border-2",
      // Size
      "w-[2rem]",
      "h-[2rem]",
      "text-sm",
      "leading-[2rem]",
      // Colors
      {
        "text-surface-400": !context.active && state.d_activeStep < context.index,
        "border-surface-100": !context.active && state.d_activeStep < context.index,
        "bg-surface-0": state.d_activeStep <= context.index
      },
      {
        "border-primary-500": context.active,
        "text-primary-500": context.active
      },
      {
        "bg-primary-500": state.d_activeStep > context.index,
        "text-surface-0": state.d_activeStep > context.index,
        "border-primary-500": state.d_activeStep > context.index
      },
      // States
      {
        "hover:border-surface-300": !context.active && !props.readonly
      },
      // Transition
      "transition-colors duration-200 ease-in-out"
    ]
  }),
  label: ({ context }) => ({
    class: [
      "relative",
      // Font
      "text-sm leading-none",
      { "font-medium": context.active },
      // Display
      "block",
      // Spacing
      "mt-2",
      // Colors
      {
        "text-surface-400": !context.active,
        "text-surface-800": context.active
      },
      // Text and Overflow
      "whitespace-nowrap",
      "overflow-ellipsis",
      "max-w-full"
    ]
  })
};
const tabmenu = {
  root: {
    class: "overflow-x-auto"
  },
  menu: {
    class: [
      // Flexbox
      "flex flex-1",
      // Spacing
      "list-none",
      "p-0 m-0",
      // Colors
      "bg-surface-0",
      "border-b border-surface-200",
      "text-surface-900"
    ]
  },
  menuitem: {
    class: "mr-0"
  },
  action: ({ context, state }) => ({
    class: [
      "relative",
      // Font
      "font-medium",
      "text-md",
      // Flexbox and Alignment
      "flex items-center",
      // Spacing
      "py-4 px-3",
      "-mb-px",
      // Shape
      "border-b-2",
      "rounded-t-md",
      // Colors and Conditions
      {
        "border-surface-200": state.d_activeIndex !== context.index,
        "bg-surface-0": state.d_activeIndex !== context.index,
        "text-surface-700": state.d_activeIndex !== context.index,
        "bg-surface-0": state.d_activeIndex === context.index,
        "border-primary-500": state.d_activeIndex === context.index,
        "text-primary-500": state.d_activeIndex === context.index
      },
      // States
      "focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring-2 focus-visible:ring-inset",
      "focus-visible:ring-primary-500",
      {
        "hover:bg-surface-0": state.d_activeIndex !== context.index,
        "hover:border-surface-400": state.d_activeIndex !== context.index,
        "hover:text-surface-900": state.d_activeIndex !== context.index
      },
      // Transitions
      "transition-all duration-200",
      // Misc
      "cursor-pointer select-none text-decoration-none",
      "overflow-hidden",
      "user-select-none",
      "whitespace-nowrap"
    ]
  }),
  icon: {
    class: "mr-2"
  }
};
const tabview = {
  navContainer: ({ props }) => ({
    class: [
      // Position
      "relative",
      // Misc
      { "overflow-hidden": props.scrollable }
    ]
  }),
  navContent: {
    class: [
      // Overflow and Scrolling
      "overflow-y-hidden overscroll-contain",
      "overscroll-auto",
      "scroll-smooth",
      "[&::-webkit-scrollbar]:hidden"
    ]
  },
  previousButton: {
    class: [
      // Flexbox and Alignment
      "flex items-center justify-center",
      // Position
      "!absolute",
      "top-0 left-0",
      "z-20",
      // Size and Shape
      "h-full w-12",
      "rounded-none",
      // Colors
      "bg-surface-0",
      "text-primary-500",
      "shadow-md"
    ]
  },
  nextButton: {
    class: [
      // Flexbox and Alignment
      "flex items-center justify-center",
      // Position
      "!absolute",
      "top-0 right-0",
      "z-20",
      // Size and Shape
      "h-full w-12",
      "rounded-none",
      // Colors
      "bg-surface-0",
      "text-primary-500",
      "shadow-md"
    ]
  },
  nav: {
    class: [
      // Flexbox
      "flex flex-1",
      // Spacing
      "list-none",
      "p-0 m-0",
      // Colors
      "bg-surface-0",
      "border-b border-surface-200",
      "text-surface-900"
    ]
  },
  tabpanel: {
    header: ({ props }) => ({
      class: [
        // Spacing
        "mr-0",
        // Misc
        {
          "opacity-60 cursor-default user-select-none select-none pointer-events-none": props == null ? void 0 : props.disabled
        }
      ]
    }),
    headerAction: ({ parent, context }) => ({
      class: [
        "relative",
        // Font
        "font-medium",
        "text-md",
        // Flexbox and Alignment
        "flex items-center",
        // Spacing
        "py-4 px-3",
        "-mb-px",
        // Shape
        "border-b-2",
        "rounded-t-md",
        // Colors and Conditions
        {
          "border-surface-200": parent.state.d_activeIndex !== context.index,
          "bg-surface-0": parent.state.d_activeIndex !== context.index,
          "text-surface-700": parent.state.d_activeIndex !== context.index,
          "bg-surface-0": parent.state.d_activeIndex === context.index,
          "border-primary-500": parent.state.d_activeIndex === context.index,
          "text-primary-500": parent.state.d_activeIndex === context.index
        },
        // States
        "focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring-2 focus-visible:ring-inset",
        "focus-visible:ring-primary-500",
        {
          "hover:bg-surface-0": parent.state.d_activeIndex !== context.index,
          "hover:border-surface-400": parent.state.d_activeIndex !== context.index,
          "hover:text-surface-900": parent.state.d_activeIndex !== context.index
        },
        // Transitions
        "transition-all duration-200",
        // Misc
        "cursor-pointer select-none text-decoration-none",
        "overflow-hidden",
        "user-select-none",
        "whitespace-nowrap"
      ]
    }),
    headerTitle: {
      class: [
        // Text
        "leading-none",
        "whitespace-nowrap"
      ]
    },
    content: {
      class: [
        // Spacing
        "p-6",
        // Shape
        "rounded-b-md",
        // Colors
        "bg-surface-0",
        "text-surface-700",
        "border-0"
      ]
    }
  }
};
const tag = {
  root: ({ props }) => ({
    class: [
      //Font
      "text-xs font-bold",
      //Alignments
      "inline-flex items-center justify-center",
      //Spacing
      "px-2 py-1",
      //Shape
      {
        "rounded-md": !props.rounded,
        "rounded-full": props.rounded
      },
      //Colors
      "text-white",
      {
        "bg-primary-500": props.severity == null || props.severity == "primary",
        "bg-green-500": props.severity == "success",
        "bg-blue-500": props.severity == "info",
        "bg-orange-500": props.severity == "warning",
        "bg-red-500": props.severity == "danger"
      }
    ]
  }),
  value: {
    class: "leading-normal"
  },
  icon: {
    class: "mr-1 text-sm"
  }
};
const terminal = {
  root: {
    class: [
      // Spacing
      "p-5",
      // Shape
      "rounded-md",
      // Color
      "bg-surface-900 text-white",
      "border border-surface-700",
      // Sizing & Overflow
      "h-72 overflow-auto"
    ]
  },
  container: {
    class: [
      // Flexbox
      "flex items-center"
    ]
  },
  prompt: {
    class: [
      // Color
      "text-surface-400"
    ]
  },
  response: {
    class: [
      // Color
      "text-primary-400"
    ]
  },
  command: {
    class: [
      // Color
      "text-primary-400"
    ]
  },
  commandtext: {
    class: [
      // Flexbox
      "flex-1 shrink grow-0",
      // Shape
      "border-0",
      // Spacing
      "p-0",
      // Color
      "bg-transparent text-inherit",
      // Outline
      "outline-none"
    ]
  }
};
const textarea = {
  root: ({ context, props }) => ({
    class: [
      // Font
      "font-sans leading-6",
      "sm:text-sm",
      // Spacing
      "m-0",
      "py-1.5 px-3",
      // Shape
      "rounded-md",
      "appearance-none",
      // Colors
      "text-surface-900",
      "placeholder:text-surface-400",
      "bg-surface-0",
      "ring-1 ring-inset ring-offset-0",
      "shadow-sm",
      { " ring-surface-300": !props.invalid },
      // Invalid State
      { "ring-red-500": props.invalid },
      // States
      {
        "outline-none focus:ring-primary-500": !context.disabled,
        "opacity-60 select-none pointer-events-none cursor-default": context.disabled
      },
      // Misc
      "appearance-none",
      "transition-colors duration-200"
    ]
  })
};
const tieredmenu = {
  root: {
    class: [
      // Shape
      "rounded-md",
      // Size
      "min-w-[12rem]",
      "p-1.5",
      // Colors
      "bg-surface-0",
      "ring-1 ring-surface-200"
    ]
  },
  menu: {
    class: [
      // Spacings and Shape
      "list-none",
      "m-0",
      "p-0",
      "outline-none"
    ]
  },
  menuitem: {
    class: ["relative first:mt-0 mt-1"]
  },
  content: ({ context }) => ({
    class: [
      //Shape
      "rounded-md",
      //  Colors
      {
        "text-surface-500": !context.focused && !context.active,
        "text-surface-500 bg-surface-200": context.focused && !context.active,
        "text-surface-900 bg-surface-50": context.focused && context.active,
        "text-surface-900 bg-surface-50": !context.focused && context.active
      },
      // Hover States
      {
        "hover:bg-surface-50": !context.active,
        "hover:bg-surface-100 text-surface-900": context.active
      },
      // Transitions
      "transition-shadow",
      "duration-200"
    ]
  }),
  action: {
    class: [
      "relative",
      // Font
      "font-semibold",
      // Flexbox
      "flex",
      "items-center",
      // Spacing
      "py-2",
      "px-3",
      // Misc
      "no-underline",
      "overflow-hidden",
      "cursor-pointer",
      "select-none"
    ]
  },
  icon: {
    class: [
      // Spacing
      "mr-2",
      "leading-6",
      "text-sm"
    ]
  },
  label: {
    class: ["leading-none", "text-sm"]
  },
  submenuicon: {
    class: [
      // Position
      "ml-auto"
    ]
  },
  submenu: {
    class: [
      // Size
      "w-full sm:w-48",
      // Spacing
      "p-1.5",
      "m-0 mx-1.5",
      "list-none",
      // Shape
      "shadow-none sm:shadow-md",
      "border-0",
      // Position
      "static sm:absolute",
      "z-10",
      // Color
      "bg-surface-0"
    ]
  },
  separator: {
    class: "border-t border-surface-200 my-1"
  }
};
const timeline = {
  root: ({ props }) => ({
    class: [
      "flex grow",
      {
        "flex-col": props.layout === "vertical",
        "flex-row flex-1": props.layout === "horizontal"
      }
    ]
  }),
  event: ({ props, context }) => ({
    class: [
      "flex relative min-h-[70px]",
      {
        "flex-row-reverse": props.align === "right" || props.layout === "vertical" && props.align === "alternate" && context.index % 2 === 1,
        "flex-col flex-1": props.layout === "horizontal",
        "flex-col-reverse ": props.align === "bottom" || props.layout === "horizontal" && props.align === "alternate" && context.index % 2 === 1
      }
    ]
  }),
  opposite: ({ props, context }) => ({
    class: [
      "flex-1",
      {
        "px-4": props.layout === "vertical",
        "py-4": props.layout === "horizontal"
      },
      {
        "text-right": props.align === "left" || props.layout === "vertical" && props.align === "alternate" && context.index % 2 === 0,
        "text-left": props.align === "right" || props.layout === "vertical" && props.align === "alternate" && context.index % 2 === 1
      }
    ]
  }),
  separator: ({ props }) => ({
    class: [
      "flex items-center flex-initial",
      {
        "flex-col": props.layout === "vertical",
        "flex-row": props.layout === "horizontal"
      }
    ]
  }),
  marker: {
    class: [
      // Display & Flexbox
      "flex self-baseline",
      // Size
      "w-4 h-4",
      // Appearance
      "rounded-full border-2 border-primary-500 bg-surface-0"
    ]
  },
  connector: ({ props }) => ({
    class: [
      "grow bg-surface-300",
      {
        "w-[2px]": props.layout === "vertical",
        "w-full h-[2px]": props.layout === "horizontal"
      }
    ]
  }),
  content: ({ props, context }) => ({
    class: [
      "flex-1",
      {
        "px-4": props.layout === "vertical",
        "py-4": props.layout === "horizontal"
      },
      {
        "text-left": props.align === "left" || props.layout === "vertical" && props.align === "alternate" && context.index % 2 === 0,
        "text-right": props.align === "right" || props.layout === "vertical" && props.align === "alternate" && context.index % 2 === 1
      },
      {
        "min-h-0": props.layout === "vertical" && context.index === context.count,
        "grow-0": props.layout === "horizontal" && context.index === context.count
      }
    ]
  })
};
const toast = {
  root: ({ props }) => ({
    class: [
      //Size and Shape
      "w-96 rounded-md",
      // Positioning
      {
        "-translate-x-2/4": props.position == "top-center" || props.position == "bottom-center"
      }
    ]
  }),
  container: ({ props }) => ({
    class: [
      "my-4 rounded-md w-full",
      "shadow-lg",
      "bg-surface-0",
      "ring-1 ring-inset ring-surface-200 ring-offset-0",
      // Colors
      {
        "text-blue-500": props.message.severity == "info",
        "text-green-500": props.message.severity == "success",
        "text-orange-500": props.message.severity == "warn",
        "text-red-500": props.message.severity == "error"
      }
    ]
  }),
  content: ({ props }) => ({
    class: [
      "flex p-4",
      {
        "items-start": props.message.summary,
        "items-center": !props.message.summary
      }
    ]
  }),
  icon: {
    class: [
      // Sizing and Spacing
      "w-5 h-5",
      "mr-2 shrink-0"
    ]
  },
  text: {
    class: [
      // Font and Text
      "text-sm leading-none",
      "ml-2",
      "flex-1"
    ]
  },
  summary: {
    class: "font-medium block"
  },
  detail: ({ props }) => ({
    class: ["block", "text-surface-600", { "mt-1.5": props.message.summary }]
  }),
  closebutton: {
    class: [
      // Flexbox
      "flex items-center justify-center",
      // Size
      "w-6 h-6",
      // Spacing and Misc
      "ml-auto relative",
      // Shape
      "rounded-full",
      // Colors
      "bg-transparent",
      "text-surface-700",
      // Transitions
      "transition duration-200 ease-in-out",
      // States
      "hover:bg-surface-100",
      "outline-none focus:ring-1 focus:ring-inset",
      "focus:ring-primary-500",
      // Misc
      "overflow-hidden"
    ]
  },
  closeicon: {
    class: [
      // Sizing and Spacing
      "w-3 h-3",
      "shrink-0"
    ]
  },
  transition: {
    enterFromClass: "opacity-0 translate-y-2/4",
    enterActiveClass: "transition-[transform,opacity] duration-300",
    leaveFromClass: "max-h-[1000px]",
    leaveActiveClass: "!transition-[max-height_.45s_cubic-bezier(0,1,0,1),opacity_.3s,margin-bottom_.3s] overflow-hidden",
    leaveToClass: "max-h-0 opacity-0 mb-0"
  }
};
const togglebutton = {
  root: {
    class: [
      "relative",
      // Alignment
      "inline-flex",
      "align-bottom",
      // Misc
      "cursor-pointer",
      "select-none"
    ]
  },
  box: ({ props }) => ({
    class: [
      // Alignments
      "items-center inline-flex flex-1 text-center align-bottom justify-center",
      // Sizes & Spacing
      "px-2.5 py-1.5",
      "text-sm",
      // Shapes
      "rounded-md shadow-sm",
      // Colors
      "text-surface-700",
      "ring-1",
      { "ring-surface-200": !props.invalid },
      {
        "bg-surface-0": !props.modelValue,
        "bg-surface-100": props.modelValue
      },
      // Invalid State
      { "ring-red-500": props.invalid },
      // States
      "peer-hover:bg-surface-200",
      {
        "peer-focus-visible:ring-2 peer-focus-visible:ring-inset peer-focus-visible:ring-primary-500": !props.disabled
      },
      // Transitions
      "transition-all duration-200",
      // Misc
      {
        "cursor-pointer": !props.disabled,
        "opacity-60 select-none pointer-events-none cursor-default": props.disabled
      }
    ]
  }),
  label: {
    class: "font-semibold text-center w-full"
  },
  input: {
    class: [
      "peer",
      // Size
      "w-full ",
      "h-full",
      // Position
      "absolute",
      "top-0 left-0",
      "z-10",
      // Spacing
      "p-0",
      "m-0",
      // Shape
      "opacity-0",
      "rounded-md",
      "outline-none",
      "border border-surface-200",
      // Misc
      "appearance-none",
      "cursor-pointer"
    ]
  },
  icon: {
    class: ["mr-2", "text-surface-700"]
  }
};
const toolbar = {
  root: {
    class: [
      // Flex & Alignment
      "flex items-center justify-between flex-wrap",
      "gap-6",
      // Spacing
      "px-6 py-2",
      "min-h-[4rem]",
      // Shape
      "rounded-md",
      "shadow-md",
      // Color
      "bg-surface-0",
      "ring-1 ring-surface-100"
    ]
  },
  start: {
    class: "flex items-center"
  },
  center: {
    class: "flex items-center"
  },
  end: {
    class: "flex items-center"
  }
};
const tooltip = {
  root: ({ context, props }) => ({
    class: [
      // Position
      "absolute",
      // Spacing
      {
        "px-1.5": (context == null ? void 0 : context.right) || (context == null ? void 0 : context.left) || !(context == null ? void 0 : context.right) && !(context == null ? void 0 : context.left) && !(context == null ? void 0 : context.top) && !(context == null ? void 0 : context.bottom),
        "py-1.5": (context == null ? void 0 : context.top) || (context == null ? void 0 : context.bottom)
      }
    ]
  }),
  arrow: {
    class: "hidden"
  },
  text: {
    class: [
      // Size
      "text-xs leading-none",
      // Spacing
      "p-2",
      // Shape
      "rounded-md",
      // Color
      "text-surface-900",
      "bg-surface-0",
      "ring-1 ring-inset ring-surface-200 ring-offset-0",
      // Misc
      "whitespace-pre-line",
      "break-words"
    ]
  }
};
const tree = {
  root: {
    class: [
      "relative",
      // Space
      "p-1.5",
      // Shape
      "rounded-md",
      // Color
      "bg-surface-0 dark:bg-surface-800",
      "text-surface-700 dark:text-white/80",
      "ring-1 ring-surface-200 dark:ring-surface-700"
    ]
  },
  wrapper: {
    class: ["overflow-auto"]
  },
  container: {
    class: [
      // Spacing
      "m-0 p-0",
      // Misc
      "list-none overflow-auto"
    ]
  },
  node: {
    class: ["p-[2px]", "rounded-md", "focus:outline-none focus:outline-offset-0 focus:ring-2 focus:ring-inset focus:ring-primary-500 dark:focus:ring-primary-400"]
  },
  content: ({ context, props }) => ({
    class: [
      // Flex and Alignment
      "flex items-center",
      // Shape
      "rounded-md",
      // Spacing
      "p-2",
      // Colors
      "text-surface-700 dark:text-surface-0",
      { "bg-surface-100 text-primary-500 dark:bg-surface-300/10 dark:text-primary-400": context.selected },
      // States
      { "hover:bg-surface-200 dark:hover:bg-surface-400/10": props.selectionMode == "single" || props.selectionMode == "multiple" },
      // Transition
      "transition-shadow duration-200",
      { "cursor-pointer select-none": props.selectionMode == "single" || props.selectionMode == "multiple" }
    ]
  }),
  toggler: ({ context }) => ({
    class: [
      // Flex and Alignment
      "inline-flex items-center justify-center",
      // Shape
      "border-0 rounded-full",
      // Size and Spacing
      "mr-2",
      "w-6 h-6",
      // Spacing
      "mr-2",
      // Colors
      "text-surface-500",
      "bg-transparent",
      {
        invisible: context.leaf
      },
      // States
      "hover:text-surface-700 dark:hover:text-white/80",
      "hover:bg-surface-100 dark:hover:bg-surface-800/80",
      "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-inset",
      "focus:ring-primary-500 dark:focus:ring-primary-400",
      // Transition
      "transition duration-200",
      // Misc
      "cursor-pointer select-none"
    ]
  }),
  togglericon: {
    class: [
      // Size
      "w-4 h-4",
      // Color
      "text-surface-500 dark:text-white/70"
    ]
  },
  nodeCheckbox: ({ props, context, instance }) => ({
    root: {
      class: [
        "relative",
        // Alignment
        "inline-flex",
        "align-bottom",
        // Size
        "w-4",
        "h-4",
        // Spacing
        "mr-2",
        // Misc
        "cursor-default",
        "select-none"
      ]
    },
    box: {
      class: [
        // Alignment
        "flex",
        "items-center",
        "justify-center",
        // Size
        "w-4",
        "h-4",
        // Shape
        "rounded",
        "border",
        // Colors
        "text-surface-600",
        {
          "border-surface-300 bg-surface-0 dark:border-surface-700 dark:bg-surface-900": !context.checked,
          "border-primary-500 bg-primary-500 dark:border-primary-400 dark:bg-primary-400": context.checked
        },
        {
          "ring-2 ring-primary-500 dark:ring-primary-400": !props.disabled && context.focused,
          "cursor-default opacity-60": props.disabled
        },
        // States
        {
          "peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500 dark:peer-focus-visible:ring-primary-400": !props.disabled,
          "cursor-default opacity-60": props.disabled
        },
        // Transitions
        "transition-colors",
        "duration-200"
      ]
    },
    input: {
      class: [
        "peer",
        // Size
        "w-full ",
        "h-full",
        // Position
        "absolute",
        "top-0 left-0",
        "z-10",
        // Spacing
        "p-0",
        "m-0",
        // Shape
        "rounded",
        "border",
        // Shape
        "opacity-0",
        "rounded-md",
        "outline-none",
        "border-2 border-surface-300 dark:border-surface-700",
        // Misc
        "appearance-none"
      ]
    },
    icon: {
      class: [
        // Font
        "text-normal",
        // Size
        "w-3",
        "h-3",
        // Colors
        {
          "text-white dark:text-surface-900": !instance.partialChecked,
          "text-gray dark:text-white": instance.partialChecked
        },
        // Transitions
        "transition-all",
        "duration-200"
      ]
    }
  }),
  nodeicon: {
    class: [
      // Space
      "mr-2",
      // Color
      "text-surface-600 dark:text-white/70"
    ]
  },
  subgroup: {
    class: ["m-0 list-none p-0 pl-2 mt-1"]
  },
  filtercontainer: {
    class: [
      "relative block",
      // Space
      "mb-2",
      // Size
      "w-full"
    ]
  },
  input: {
    class: [
      "relative",
      // Font
      "font-sans leading-6",
      "sm:text-sm",
      // Spacing
      "m-0",
      "py-1.5 px-3 pr-10",
      // Size
      "w-full",
      // Shape
      "rounded-md",
      // Colors
      "text-surface-900 dark:text-surface-0",
      "placeholder:text-surface-400 dark:placeholder:text-surface-500",
      "bg-surface-0 dark:bg-surface-900",
      "ring-1 ring-inset ring-surface-300 dark:ring-surface-700 ring-offset-0",
      // States
      "hover:border-primary-500 dark:hover:border-primary-400",
      "focus:outline-none focus:outline-offset-0 focus:ring-2 focus:ring-inset focus:ring-primary-500 dark:focus:ring-primary-400",
      // Transition & Misc
      "appearance-none",
      "transition-colors duration-200"
    ]
  },
  loadingicon: {
    class: ["text-surface-500 dark:text-surface-0/70", "absolute top-[50%] right-[50%] -mt-2 -mr-2 animate-spin"]
  },
  searchicon: {
    class: [
      // Position
      "absolute top-1/2 -mt-2 right-3",
      // Color
      "text-surface-600 dark:hover:text-white/70"
    ]
  }
};
const treeselect = {
  root: ({ props, state }) => ({
    class: [
      // Display and Position
      "inline-flex",
      "relative",
      // Shape
      "rounded-md",
      "shadow-sm",
      // Color and Background
      "bg-surface-0 dark:bg-surface-900",
      // States
      { "ring-1 ring-inset": !state.focused, "ring-2 ring-inset ring-primary-500 dark:ring-primary-400": state.focused },
      { "ring-surface-300 dark:ring-surface-600": !props.invalid && !state.focused },
      // Invalid State
      { "ring-red-500 dark:ring-red-400": props.invalid && !state.focused },
      // Misc
      "cursor-default",
      "select-none",
      { "opacity-60": props.disabled, "pointer-events-none": props.disabled }
    ]
  }),
  labelContainer: {
    class: ["overflow-hidden flex flex-auto cursor-pointer"]
  },
  label: {
    class: [
      "block leading-5",
      // Space
      "py-1.5 px-3",
      // Color
      "text-surface-800 dark:text-white/80",
      // Transition
      "transition duration-200",
      // Misc
      "overflow-hidden whitespace-nowrap cursor-pointer overflow-ellipsis"
    ]
  },
  trigger: {
    class: [
      //Font
      "sm:text-sm",
      // Flexbox
      "flex items-center justify-center",
      "shrink-0",
      // Color and Background
      "bg-transparent",
      "text-surface-500",
      // Size
      "w-12",
      // Shape
      "rounded-tr-md",
      "rounded-br-md"
    ]
  },
  panel: {
    class: [
      // Position
      "absolute top-0 left-0",
      "mt-2",
      // Shape
      "border-0",
      "rounded-md",
      "shadow-md",
      // Color
      "bg-surface-0 dark:bg-surface-800",
      "text-surface-800 dark:text-white/80",
      "ring-1 ring-inset ring-surface-300 dark:ring-surface-700"
    ]
  },
  wrapper: {
    class: [
      // Sizing
      "max-h-[200px]",
      // Misc
      "overflow-auto"
    ]
  },
  tree: {
    root: {
      class: [
        "relative",
        // Space
        "p-1.5"
      ]
    },
    wrapper: {
      class: ["overflow-auto"]
    },
    container: {
      class: [
        // Spacing
        "m-0 p-0",
        // Misc
        "list-none overflow-auto"
      ]
    },
    node: {
      class: ["p-[2px]", "rounded-md", "focus:outline-none focus:outline-offset-0 focus:ring-2 focus:ring-inset focus:ring-primary-500 dark:focus:ring-primary-400"]
    },
    content: ({ context, props }) => ({
      class: [
        // Flex and Alignment
        "flex items-center",
        // Shape
        "rounded-md",
        // Spacing
        "p-2",
        // Colors
        "text-surface-700 dark:text-surface-0",
        { "bg-surface-100 text-primary-500 dark:bg-surface-300/10 dark:text-primary-400": context.selected },
        // States
        { "hover:bg-surface-200 dark:hover:bg-surface-400/10": props.selectionMode == "single" || props.selectionMode == "multiple" },
        // Transition
        "transition-shadow duration-200",
        { "cursor-pointer select-none": props.selectionMode == "single" || props.selectionMode == "multiple" }
      ]
    }),
    toggler: ({ context }) => ({
      class: [
        // Flex and Alignment
        "inline-flex items-center justify-center",
        // Shape
        "border-0 rounded-full",
        // Size and Spacing
        "mr-2",
        "w-6 h-6",
        // Spacing
        "mr-2",
        // Colors
        "text-surface-500",
        "bg-transparent",
        {
          invisible: context.leaf
        },
        // States
        "hover:text-surface-700 dark:hover:text-white/80",
        "hover:bg-surface-100 dark:hover:bg-surface-800/80",
        "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-inset",
        "focus:ring-primary-500 dark:focus:ring-primary-400",
        // Transition
        "transition duration-200",
        // Misc
        "cursor-pointer select-none"
      ]
    }),
    togglericon: {
      class: [
        // Size
        "w-4 h-4",
        // Color
        "text-surface-500 dark:text-white/70"
      ]
    },
    nodeCheckbox: ({ props, context, instance }) => ({
      root: {
        class: [
          "relative",
          // Alignment
          "inline-flex",
          "align-bottom",
          // Size
          "w-4",
          "h-4",
          // Spacing
          "mr-2",
          // Misc
          "cursor-default",
          "select-none"
        ]
      },
      box: {
        class: [
          // Alignment
          "flex",
          "items-center",
          "justify-center",
          // Size
          "w-4",
          "h-4",
          // Shape
          "rounded",
          "border",
          // Colors
          "text-surface-600",
          {
            "border-surface-300 bg-surface-0 dark:border-surface-700 dark:bg-surface-900": !context.checked,
            "border-primary-500 bg-primary-500 dark:border-primary-400 dark:bg-primary-400": context.checked
          },
          {
            "ring-2 ring-primary-500 dark:ring-primary-400": !props.disabled && context.focused,
            "cursor-default opacity-60": props.disabled
          },
          // States
          {
            "peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500 dark:peer-focus-visible:ring-primary-400": !props.disabled,
            "cursor-default opacity-60": props.disabled
          },
          // Transitions
          "transition-colors",
          "duration-200"
        ]
      },
      input: {
        class: [
          "peer",
          // Size
          "w-full ",
          "h-full",
          // Position
          "absolute",
          "top-0 left-0",
          "z-10",
          // Spacing
          "p-0",
          "m-0",
          // Shape
          "rounded",
          "border",
          // Shape
          "opacity-0",
          "rounded-md",
          "outline-none",
          "border-2 border-surface-300 dark:border-surface-700",
          // Misc
          "appearance-none"
        ]
      },
      icon: {
        class: [
          // Font
          "text-normal",
          // Size
          "w-3",
          "h-3",
          // Colors
          {
            "text-white dark:text-surface-900": !instance.partialChecked,
            "text-gray dark:text-white": instance.partialChecked
          },
          // Transitions
          "transition-all",
          "duration-200"
        ]
      }
    }),
    nodeicon: {
      class: [
        // Space
        "mr-2",
        // Color
        "text-surface-600 dark:text-white/70"
      ]
    },
    subgroup: {
      class: ["m-0 list-none p-0 pl-2 mt-1"]
    },
    filtercontainer: {
      class: [
        "relative block",
        // Space
        "mb-2",
        // Size
        "w-full"
      ]
    },
    input: {
      class: [
        "relative",
        // Font
        "font-sans leading-6",
        "sm:text-sm",
        // Spacing
        "m-0",
        "py-1.5 px-3 pr-10",
        // Size
        "w-full",
        // Shape
        "rounded-md",
        // Colors
        "text-surface-900 dark:text-surface-0",
        "placeholder:text-surface-400 dark:placeholder:text-surface-500",
        "bg-surface-0 dark:bg-surface-900",
        "ring-1 ring-inset ring-surface-300 dark:ring-surface-700 ring-offset-0",
        // States
        "hover:border-primary-500 dark:hover:border-primary-400",
        "focus:outline-none focus:outline-offset-0 focus:ring-2 focus:ring-inset focus:ring-primary-500 dark:focus:ring-primary-400",
        // Transition & Misc
        "appearance-none",
        "transition-colors duration-200"
      ]
    },
    loadingicon: {
      class: ["text-surface-500 dark:text-surface-0/70", "absolute top-[50%] right-[50%] -mt-2 -mr-2 animate-spin"]
    },
    searchicon: {
      class: [
        // Position
        "absolute top-1/2 -mt-2 right-3",
        // Color
        "text-surface-600 dark:hover:text-white/70"
      ]
    }
  },
  transition: {
    enterFromClass: "opacity-0 scale-y-[0.8]",
    enterActiveClass: "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
    leaveActiveClass: "transition-opacity duration-100 ease-linear",
    leaveToClass: "opacity-0"
  }
};
const treetable = {
  root: ({ props }) => ({
    class: [
      "relative",
      {
        "flex flex-col h-full": props.scrollHeight === "flex"
      },
      // Shape
      "border-spacing-0 border-separate"
    ]
  }),
  loadingoverlay: {
    class: [
      // Position
      "absolute",
      "top-0 left-0",
      "z-20",
      // Flex & Alignment
      "flex items-center justify-center",
      // Size
      "w-full h-full",
      // Color
      "bg-surface-100/40 dark:bg-surface-800/40",
      // Transition
      "transition duration-200"
    ]
  },
  loadingicon: {
    class: "w-8 h-8 animate-spin"
  },
  wrapper: ({ props }) => ({
    class: [
      // Overflow
      {
        "relative overflow-auto": props.scrollable,
        "overflow-x-auto": props.resizableColumns
      }
    ]
  }),
  header: ({ props }) => ({
    class: [
      "font-semibold",
      // Shape
      props.showGridlines ? "border-b" : "border-b border-x-0",
      // Spacing
      "py-3.5 px-3",
      // Color
      "bg-surface-0 dark:bg-surface-800",
      "border-surface-300 dark:border-surface-600",
      "text-surface-700 dark:text-white/80"
    ]
  }),
  footer: {
    class: [
      "font-semibold",
      // Shape
      "border-t-0 border-t border-x-0",
      // Spacing
      "p-4",
      // Color
      "bg-surface-0 dark:bg-surface-800",
      "border-surface-200 dark:border-surface-700",
      "text-surface-700 dark:text-white/80"
    ]
  },
  table: {
    class: [
      // Table & Width
      "border-collapse table-fixed w-full "
    ]
  },
  thead: ({ props }) => ({
    class: [
      // Position & Z-index
      {
        "top-0 z-40 sticky": props.scrollable
      }
    ]
  }),
  tbody: ({ props }) => ({
    class: [
      {
        block: props.scrollable
      }
    ]
  }),
  tfoot: ({ props }) => ({
    class: [
      // Block Display
      {
        block: props.scrollable
      }
    ]
  }),
  headerrow: ({ props }) => ({
    class: [
      // Flexbox & Width
      {
        "flex flex-nowrap w-full": props.scrollable
      }
    ]
  }),
  row: ({ context, props }) => ({
    class: [
      // Flex
      { "flex flex-nowrap w-full": context.scrollable },
      // Color
      "dark:text-white/80",
      { "bg-surface-50 dark:bg-surface-500/30": context.selected },
      { "bg-surface-0 text-surface-600 dark:bg-surface-800": !context.selected },
      // Hover & Flexbox
      {
        "hover:bg-surface-300/20 hover:text-surface-600": context.selectable && !context.selected
      },
      "focus:outline-none focus:outline-offset-0 focus:ring-2 focus:ring-primary-500 ring-inset dark:focus:ring-primary-400",
      // Transition
      { "transition duration-200": props.selectionMode && !context.selected || props.rowHover }
    ]
  }),
  headercell: ({ context, props }) => ({
    class: [
      "font-semibold",
      "text-sm",
      // Position
      { "sticky z-40": context.scrollable && context.scrollDirection === "both" && context.frozen },
      // Flex & Alignment
      {
        "flex flex-1 items-center": context.scrollable,
        "flex-initial shrink-0": context.scrollable && context.scrollDirection === "both" && !context.frozen
      },
      "text-left",
      // Shape
      { "border-r last:border-r-0": context == null ? void 0 : context.showGridlines },
      "border-0 border-b border-solid",
      // Spacing
      (context == null ? void 0 : context.size) === "small" ? "py-2.5 px-2" : (context == null ? void 0 : context.size) === "large" ? "py-5 px-4" : "py-3.5 px-3",
      // Color
      (props.sortable === "" || props.sortable) && context.sorted ? "text-primary-500" : "bg-surface-0 text-surface-700",
      (props.sortable === "" || props.sortable) && context.sorted ? "dark:text-primary-400" : "dark:text-white/80 dark:bg-surface-800",
      "border-surface-200 dark:border-surface-700 ",
      // States
      "focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
      // Transition
      { "transition duration-200": props.sortable === "" || props.sortable },
      // Misc
      {
        "overflow-hidden relative bg-clip-padding": context.resizable && !context.frozen
      }
    ]
  }),
  column: {
    headercell: ({ context, props }) => ({
      class: [
        "font-semibold",
        "text-sm",
        // Position
        { "sticky z-40": context.scrollable && context.scrollDirection === "both" && context.frozen },
        // Flex & Alignment
        {
          "flex flex-1 items-center": context.scrollable,
          "flex-initial shrink-0": context.scrollable && context.scrollDirection === "both" && !context.frozen
        },
        "text-left",
        // Shape
        { "border-r last:border-r-0": context == null ? void 0 : context.showGridlines },
        "border-0 border-b border-solid",
        // Spacing
        (context == null ? void 0 : context.size) === "small" ? "py-2.5 px-2" : (context == null ? void 0 : context.size) === "large" ? "py-5 px-4" : "py-3.5 px-3",
        // Color
        (props.sortable === "" || props.sortable) && context.sorted ? "text-primary-500" : "bg-surface-0 text-surface-700",
        (props.sortable === "" || props.sortable) && context.sorted ? "dark:text-primary-400" : "dark:text-white/80 dark:bg-surface-800",
        "border-surface-200 dark:border-surface-700 ",
        // States
        "focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
        // Transition
        { "transition duration-200": props.sortable === "" || props.sortable },
        // Misc
        {
          "overflow-hidden relative bg-clip-padding": context.resizable && !context.frozen
        }
      ]
    }),
    bodycell: ({ context }) => ({
      class: [
        // Position
        {
          sticky: context.scrollable && context.scrollDirection === "both" && context.frozen
        },
        // Font
        "text-sm",
        // Flex & Alignment
        {
          "flex flex-1 items-center": context.scrollable,
          "flex-initial shrink-0": context.scrollable && context.scrollDirection === "both" && !context.frozen
        },
        "text-left",
        // Shape
        "border-0 border-b border-solid",
        { "last:border-r-0 border-r border-b": context == null ? void 0 : context.showGridlines },
        // Color
        "border-surface-200 dark:border-surface-700",
        { "bg-surface-0 dark:bg-surface-800": !context.selected },
        // Spacing
        (context == null ? void 0 : context.size) === "small" ? "py-2.5 px-2" : (context == null ? void 0 : context.size) === "large" ? "py-5 px-4" : "py-3.5 px-3",
        // Misc
        "space-nowrap",
        {
          "cursor-pointer": context.selectable
        }
      ]
    }),
    rowtoggler: {
      class: [
        "relative",
        // Flex & Alignment
        "inline-flex items-center justify-center",
        "text-left align-middle",
        // Spacing
        "m-0 mr-2 p-0",
        // Size
        "w-8 h-8",
        // Shape
        "border-0 rounded-full",
        // Color
        "text-surface-500 dark:text-white/70",
        "bg-transparent",
        // States
        "hover:bg-surface-50 dark:hover:bg-surface-700",
        "focus-visible:outline-none focus-visible:outline-offset-0",
        "focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
        // Transition
        "transition duration-200",
        // Misc
        "overflow-hidden",
        "cursor-pointer select-none"
      ]
    },
    sorticon: ({ context }) => ({
      class: ["ml-2 inline-block", context.sorted ? "fill-primary-700 dark:fill-white/80" : "fill-surface-700 dark:fill-white/70"]
    }),
    sortbadge: {
      class: [
        // Flex & Alignment
        "inline-flex items-center justify-center align-middle",
        // Shape
        "rounded-full",
        // Size
        "w-[1.143rem] leading-[1.143rem]",
        // Spacing
        "ml-2",
        // Color
        "text-primary-700 dark:text-white",
        "bg-primary-50 dark:bg-primary-400/30"
      ]
    },
    columnresizer: {
      class: [
        "block",
        // Position
        "absolute top-0 right-0",
        // Sizing
        "w-2 h-full",
        // Spacing
        "m-0 p-0",
        // Color
        "border border-transparent",
        // Misc
        "cursor-col-resize"
      ]
    },
    rowCheckbox: ({ props, context, instance }) => ({
      root: {
        class: [
          "relative",
          // Alignment
          "inline-flex",
          "align-middle",
          // Size
          "w-4",
          "h-4",
          // Spacing
          "mr-2",
          // Misc
          "cursor-default",
          "select-none"
        ]
      },
      box: {
        class: [
          // Alignment
          "flex",
          "items-center",
          "justify-center",
          // Size
          "w-4",
          "h-4",
          // Shape
          "rounded",
          "border",
          // Colors
          "text-surface-600",
          {
            "border-surface-300 bg-surface-0 dark:border-surface-700 dark:bg-surface-900": !context.checked,
            "border-primary-500 bg-primary-500 dark:border-primary-400 dark:bg-primary-400": context.checked
          },
          {
            "ring-2 ring-primary-500 dark:ring-primary-400": !props.disabled && context.focused,
            "cursor-default opacity-60": props.disabled
          },
          // States
          {
            "peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500 dark:peer-focus-visible:ring-primary-400": !props.disabled,
            "cursor-default opacity-60": props.disabled
          },
          // Transitions
          "transition-colors",
          "duration-200"
        ]
      },
      input: {
        class: [
          "peer",
          // Size
          "w-full ",
          "h-full",
          // Position
          "absolute",
          "top-0 left-0",
          "z-10",
          // Spacing
          "p-0",
          "m-0",
          // Shape
          "rounded",
          "border",
          // Shape
          "opacity-0",
          "rounded-md",
          "outline-none",
          "border-2 border-surface-300 dark:border-surface-700",
          // Misc
          "appearance-none"
        ]
      },
      icon: {
        class: [
          // Font
          "text-normal",
          // Size
          "w-3",
          "h-3",
          // Colors
          {
            "text-white dark:text-surface-900": !instance.partialChecked,
            "text-gray dark:text-white": instance.partialChecked
          },
          // Transitions
          "transition-all",
          "duration-200"
        ]
      }
    }),
    transition: {
      enterFromClass: "opacity-0 scale-y-[0.8]",
      enterActiveClass: "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
      leaveActiveClass: "transition-opacity duration-100 ease-linear",
      leaveToClass: "opacity-0"
    }
  },
  resizehelper: {
    class: "absolute hidden w-[2px] z-20 bg-primary-500 dark:bg-primary-400"
  }
};
const tristatecheckbox = {
  root: {
    class: [
      "cursor-pointer inline-flex relative select-none align-bottom",
      "w-4 h-4"
    ]
  },
  box: ({ props, context }) => ({
    class: [
      // Alignment
      "flex",
      "items-center",
      "justify-center",
      // Size
      "w-4",
      "h-4",
      // Shape
      "rounded",
      "border",
      // Colors
      "text-surface-600",
      {
        "border-surface-300 bg-surface-0": !context.active && !props.invalid,
        "border-primary-500 bg-primary-500": context.active
      },
      {
        "ring-2 ring-primary-500": !props.disabled && context.focused,
        "cursor-default opacity-60": props.disabled
      },
      // Invalid State
      { "ring-1 ring-red-500": props.invalid },
      // States
      {
        "peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500": !props.disabled,
        "cursor-default opacity-60": props.disabled
      },
      // Transitions
      "transition-colors",
      "duration-200"
    ]
  }),
  input: {
    class: [
      "peer",
      // Size
      "w-full ",
      "h-full",
      // Position
      "absolute",
      "top-0 left-0",
      "z-10",
      // Spacing
      "p-0",
      "m-0",
      // Shape
      "rounded",
      "border",
      // Shape
      "opacity-0",
      "rounded-md",
      "outline-none",
      "border-2 border-surface-300",
      // Misc
      "appearance-none"
    ]
  },
  checkicon: {
    class: [
      // Font
      "text-normal",
      // Size
      "w-3",
      "h-3",
      // Colors
      "text-white",
      // Transitions
      "transition-all",
      "duration-200"
    ]
  },
  uncheckicon: {
    class: [
      // Font
      "text-normal",
      // Size
      "w-3",
      "h-3",
      // Colors
      "text-white",
      // Transitions
      "transition-all",
      "duration-200"
    ]
  }
};
const undefined$1 = {
  global: global$1,
  directives: {
    badge: badgedirective,
    ripple,
    tooltip
  },
  //forms
  autocomplete,
  dropdown,
  inputnumber,
  inputtext,
  calendar,
  checkbox,
  radiobutton,
  inputswitch,
  selectbutton,
  slider,
  chips,
  rating,
  multiselect,
  togglebutton,
  cascadeselect,
  listbox,
  colorpicker,
  inputgroup,
  inputgroupaddon,
  inputmask,
  knob,
  treeselect,
  tristatecheckbox,
  textarea,
  password,
  iconfield,
  floatlabel,
  inputotp,
  //buttons
  button,
  splitbutton,
  speeddial,
  //data
  paginator,
  datatable,
  tree,
  dataview,
  dataviewlayoutoptions,
  organizationchart,
  orderlist,
  picklist,
  treetable,
  timeline,
  //panels
  accordion,
  panel,
  fieldset,
  card,
  tabview,
  divider,
  toolbar,
  scrollpanel,
  splitter,
  splitterpanel,
  stepper,
  deferred,
  //file
  fileupload,
  //menu
  contextmenu,
  menu,
  menubar,
  steps,
  tieredmenu,
  breadcrumb,
  panelmenu,
  megamenu,
  dock,
  tabmenu,
  //overlays
  dialog,
  overlaypanel,
  sidebar,
  confirmpopup,
  //messages
  message,
  inlinemessage,
  toast,
  //media
  carousel,
  galleria,
  image,
  //misc
  badge,
  avatar,
  avatargroup,
  tag,
  chip,
  progressbar,
  skeleton,
  scrolltop,
  terminal,
  blockui,
  metergroup,
  inplace,
  progressspinner
};
const primevue_plugin_egKpok8Auk = /* @__PURE__ */ defineNuxtPlugin(({ vueApp }) => {
  var _a;
  const runtimeConfig = /* @__PURE__ */ useRuntimeConfig();
  const config = ((_a = runtimeConfig == null ? void 0 : runtimeConfig.public) == null ? void 0 : _a.primevue) ?? {};
  const { usePrimeVue = true, options = {} } = config;
  const pt = { pt: undefined$1 };
  usePrimeVue && vueApp.use(PrimeVue, { ...options, ...pt });
  vueApp.use(ConfirmationService);
  vueApp.use(DialogService);
  vueApp.use(ToastService);
  vueApp.directive("badge", BadgeDirective);
  vueApp.directive("tooltip", Tooltip);
  vueApp.directive("ripple", Ripple);
  vueApp.directive("styleclass", StyleClass);
  vueApp.directive("focustrap", FocusTrap);
  vueApp.directive("animateonscroll", AnimateOnScroll);
});
const primevue_TdXjRgL1MA = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue);
  nuxtApp.vueApp.use(ToastService);
  return {};
});
const plugins = [
  unhead_KgADcZ0jPj,
  plugin$1,
  plugin,
  revive_payload_server_eJ33V7gbc6,
  components_plugin_KR1HBZs4kY,
  pwa_icons_Y6agwlnXZq,
  plugin_tMGwffvjBc,
  motion_fmZWau4t0U,
  primevue_plugin_egKpok8Auk,
  primevue_TdXjRgL1MA
];
const layouts = {
  default: () => import("./_nuxt/default-DnGjseL6.js").then((m) => m.default || m),
  empty: () => import("./_nuxt/empty-BLDq-4tn.js").then((m) => m.default || m)
};
const LayoutLoader = defineComponent({
  name: "LayoutLoader",
  inheritAttrs: false,
  props: {
    name: String,
    layoutProps: Object
  },
  async setup(props, context) {
    const LayoutComponent = await layouts[props.name]().then((r) => r.default || r);
    return () => h(LayoutComponent, props.layoutProps, context.slots);
  }
});
const __nuxt_component_0 = defineComponent({
  name: "NuxtLayout",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean, Object],
      default: null
    },
    fallback: {
      type: [String, Object],
      default: null
    }
  },
  setup(props, context) {
    const nuxtApp = useNuxtApp();
    const injectedRoute = inject(PageRouteSymbol);
    const route = injectedRoute === useRoute() ? useRoute$1() : injectedRoute;
    const layout = computed(() => {
      let layout2 = unref(props.name) ?? route.meta.layout ?? "default";
      if (layout2 && !(layout2 in layouts)) {
        if (props.fallback) {
          layout2 = unref(props.fallback);
        }
      }
      return layout2;
    });
    const layoutRef = ref();
    context.expose({ layoutRef });
    const done = nuxtApp.deferHydration();
    return () => {
      const hasLayout = layout.value && layout.value in layouts;
      const transitionProps = route.meta.layoutTransition ?? appLayoutTransition;
      return _wrapIf(Transition, hasLayout && transitionProps, {
        default: () => h(Suspense, { suspensible: true, onResolve: () => {
          nextTick(done);
        } }, {
          default: () => h(
            LayoutProvider,
            {
              layoutProps: mergeProps(context.attrs, { ref: layoutRef }),
              key: layout.value || void 0,
              name: layout.value,
              shouldProvide: !props.name,
              hasTransition: !!transitionProps
            },
            context.slots
          )
        })
      }).default();
    };
  }
});
const LayoutProvider = defineComponent({
  name: "NuxtLayoutProvider",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean]
    },
    layoutProps: {
      type: Object
    },
    hasTransition: {
      type: Boolean
    },
    shouldProvide: {
      type: Boolean
    }
  },
  setup(props, context) {
    const name = props.name;
    if (props.shouldProvide) {
      provide(LayoutMetaSymbol, {
        isCurrent: (route) => name === (route.meta.layout ?? "default")
      });
    }
    return () => {
      var _a, _b;
      if (!name || typeof name === "string" && !(name in layouts)) {
        return (_b = (_a = context.slots).default) == null ? void 0 : _b.call(_a);
      }
      return h(
        LayoutLoader,
        { key: name, layoutProps: props.layoutProps, name },
        context.slots
      );
    };
  }
});
const RouteProvider = defineComponent({
  props: {
    vnode: {
      type: Object,
      required: true
    },
    route: {
      type: Object,
      required: true
    },
    vnodeRef: Object,
    renderKey: String,
    trackRootNodes: Boolean
  },
  setup(props) {
    const previousKey = props.renderKey;
    const previousRoute = props.route;
    const route = {};
    for (const key in props.route) {
      Object.defineProperty(route, key, {
        get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key]
      });
    }
    provide(PageRouteSymbol, shallowReactive(route));
    return () => {
      return h(props.vnode, { ref: props.vnodeRef });
    };
  }
});
const __nuxt_component_1 = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs, slots, expose }) {
    const nuxtApp = useNuxtApp();
    const pageRef = ref();
    const forkRoute = inject(PageRouteSymbol, null);
    let previousPageKey;
    expose({ pageRef });
    inject(LayoutMetaSymbol, null);
    let vnode;
    const done = nuxtApp.deferHydration();
    if (props.pageKey) {
      watch(() => props.pageKey, (next, prev) => {
        if (next !== prev) {
          nuxtApp.callHook("page:loading:start");
        }
      });
    }
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          if (!routeProps.Component) {
            done();
            return;
          }
          const key = generateRouteKey$1(routeProps, props.pageKey);
          if (!nuxtApp.isHydrating && !hasChildrenRoutes(forkRoute, routeProps.route, routeProps.Component) && previousPageKey === key) {
            nuxtApp.callHook("page:loading:end");
          }
          previousPageKey = key;
          const hasTransition = !!(props.transition ?? routeProps.route.meta.pageTransition ?? appPageTransition);
          const transitionProps = hasTransition && _mergeTransitionProps([
            props.transition,
            routeProps.route.meta.pageTransition,
            appPageTransition,
            { onAfterLeave: () => {
              nuxtApp.callHook("page:transition:finish", routeProps.Component);
            } }
          ].filter(Boolean));
          const keepaliveConfig = props.keepalive ?? routeProps.route.meta.keepalive ?? appKeepalive;
          vnode = _wrapIf(
            Transition,
            hasTransition && transitionProps,
            wrapInKeepAlive(
              keepaliveConfig,
              h(Suspense, {
                suspensible: true,
                onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
                onResolve: () => {
                  nextTick(() => nuxtApp.callHook("page:finish", routeProps.Component).then(() => nuxtApp.callHook("page:loading:end")).finally(done));
                }
              }, {
                default: () => {
                  const providerVNode = h(RouteProvider, {
                    key: key || void 0,
                    vnode: slots.default ? h(Fragment, void 0, slots.default(routeProps)) : routeProps.Component,
                    route: routeProps.route,
                    renderKey: key || void 0,
                    trackRootNodes: hasTransition,
                    vnodeRef: pageRef
                  });
                  return providerVNode;
                }
              })
            )
          ).default();
          return vnode;
        }
      });
    };
  }
});
function _mergeTransitionProps(routeProps) {
  const _props = routeProps.map((prop) => ({
    ...prop,
    onAfterLeave: prop.onAfterLeave ? toArray(prop.onAfterLeave) : void 0
  }));
  return defu(..._props);
}
function hasChildrenRoutes(fork, newRoute, Component) {
  if (!fork) {
    return false;
  }
  const index2 = newRoute.matched.findIndex((m) => {
    var _a;
    return ((_a = m.components) == null ? void 0 : _a.default) === (Component == null ? void 0 : Component.type);
  });
  return index2 < newRoute.matched.length - 1;
}
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLayout = __nuxt_component_0;
  const _component_NuxtPage = __nuxt_component_1;
  _push(ssrRenderComponent(_component_NuxtLayout, _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_NuxtPage)
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/pages/runtime/app.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const AppComponent = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$1 = {
  __name: "nuxt-error-page",
  __ssrInlineRender: true,
  props: {
    error: Object
  },
  setup(__props) {
    const props = __props;
    const _error = props.error;
    _error.stack ? _error.stack.split("\n").splice(1).map((line) => {
      const text = line.replace("webpack:/", "").replace(".vue", ".js").trim();
      return {
        text,
        internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
      };
    }).map((i) => `<span class="stack${i.internal ? " internal" : ""}">${i.text}</span>`).join("\n") : "";
    const statusCode = Number(_error.statusCode || 500);
    const is404 = statusCode === 404;
    const statusMessage = _error.statusMessage ?? (is404 ? "Page Not Found" : "Internal Server Error");
    const description = _error.message || _error.toString();
    const stack = void 0;
    const _Error404 = defineAsyncComponent(() => import("./_nuxt/error-404-BYPU1fu0.js").then((r) => r.default || r));
    const _Error = defineAsyncComponent(() => import("./_nuxt/error-500-YHyqdf9d.js").then((r) => r.default || r));
    const ErrorTemplate = is404 ? _Error404 : _Error;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ErrorTemplate), mergeProps({ statusCode: unref(statusCode), statusMessage: unref(statusMessage), description: unref(description), stack: unref(stack) }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-error-page.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = () => null;
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    const abortRender = error.value && !nuxtApp.ssrContext.error;
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(abortRender)) {
            _push(`<div></div>`);
          } else if (unref(error)) {
            _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(AppComponent), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(_sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (error) {
      await nuxt.hooks.callHook("app:error", error);
      nuxt.payload.error = nuxt.payload.error || createError(error);
    }
    if (ssrContext == null ? void 0 : ssrContext._renderResponse) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry$1 = (ssrContext) => entry(ssrContext);
export {
  useRequestEvent as A,
  BaseStyle as B,
  ConnectedOverlayScrollHandler as C,
  DomHandler as D,
  defu as E,
  FilterMatchMode as F,
  useDialog as G,
  DynamicDialogEventBus as H,
  ConfirmationEventBus as I,
  ToastEventBus as J,
  __nuxt_component_1 as K,
  ObjectUtils as O,
  Ripple as R,
  Tooltip as T,
  UniqueComponentId as U,
  ZIndexUtils as Z,
  _export_sfc as _,
  useCookie as a,
  baseUrl as b,
  useRouter as c,
  defineStore as d,
  entry$1 as default,
  useAuthStore as e,
  landingPageServicesContent as f,
  navigateTo as g,
  useRuntimeConfig as h,
  injectHead as i,
  useNuxtApp as j,
  FilterService as k,
  landingPageAboutUsContents as l,
  _default as m,
  nuxtLinkDefaults as n,
  FilterOperator as o,
  FocusTrap as p,
  useStyle as q,
  resolveUnrefHeadInput as r,
  storeToRefs as s,
  primebus as t,
  useToast as u,
  asyncDataDefaults as v,
  createError as w,
  fetchDefaults as x,
  useRequestFetch as y,
  defuFn as z
};
//# sourceMappingURL=server.mjs.map
