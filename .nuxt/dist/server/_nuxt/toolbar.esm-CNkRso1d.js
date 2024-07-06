import { s as script$2 } from "./basecomponent.esm-DXWDIfdj.js";
import { B as BaseStyle } from "../server.mjs";
import { openBlock, createElementBlock, mergeProps, createElementVNode, renderSlot } from "vue";
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
import "vue/server-renderer";
var classes = {
  root: "p-toolbar p-component",
  start: "p-toolbar-group-start p-toolbar-group-left",
  center: "p-toolbar-group-center",
  end: "p-toolbar-group-end p-toolbar-group-right"
};
var ToolbarStyle = BaseStyle.extend({
  name: "toolbar",
  classes
});
var script$1 = {
  name: "BaseToolbar",
  "extends": script$2,
  props: {
    ariaLabelledby: {
      type: String,
      "default": null
    }
  },
  style: ToolbarStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};
var script = {
  name: "Toolbar",
  "extends": script$1,
  inheritAttrs: false
};
var _hoisted_1 = ["aria-labelledby"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx("root"),
    role: "toolbar",
    "aria-labelledby": _ctx.ariaLabelledby
  }, _ctx.ptmi("root")), [createElementVNode("div", mergeProps({
    "class": _ctx.cx("start")
  }, _ctx.ptm("start")), [renderSlot(_ctx.$slots, "start")], 16), createElementVNode("div", mergeProps({
    "class": _ctx.cx("center")
  }, _ctx.ptm("center")), [renderSlot(_ctx.$slots, "center")], 16), createElementVNode("div", mergeProps({
    "class": _ctx.cx("end")
  }, _ctx.ptm("end")), [renderSlot(_ctx.$slots, "end")], 16)], 16, _hoisted_1);
}
script.render = render;
export {
  script as default
};
//# sourceMappingURL=toolbar.esm-CNkRso1d.js.map
