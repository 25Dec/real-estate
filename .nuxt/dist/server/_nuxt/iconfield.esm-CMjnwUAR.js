import { s as script$2 } from "./basecomponent.esm-DXWDIfdj.js";
import { B as BaseStyle } from "../server.mjs";
import { openBlock, createElementBlock, mergeProps, renderSlot } from "vue";
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
  root: function root(_ref) {
    var props = _ref.props;
    return ["p-icon-field", {
      "p-icon-field-right": props.iconPosition === "right",
      "p-icon-field-left": props.iconPosition === "left"
    }];
  }
};
var IconFieldStyle = BaseStyle.extend({
  name: "iconfield",
  classes
});
var script$1 = {
  name: "BaseIconField",
  "extends": script$2,
  props: {
    iconPosition: {
      type: String,
      "default": "right"
    }
  },
  style: IconFieldStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};
var script = {
  name: "IconField",
  "extends": script$1,
  inheritAttrs: false
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx("root")
  }, _ctx.ptmi("root")), [renderSlot(_ctx.$slots, "default")], 16);
}
script.render = render;
export {
  script as default
};
//# sourceMappingURL=iconfield.esm-CMjnwUAR.js.map
