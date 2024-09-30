import { s as script$2 } from './basecomponent.esm-DXWDIfdj.mjs';
import { B as BaseStyle } from './server.mjs';
import { openBlock, createElementBlock, mergeProps, renderSlot } from 'vue';
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
import 'vue/server-renderer';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@formkit/auto-animate/vue';
import 'framesync';
import 'popmotion';
import 'style-value-types';

var classes = {
  root: "p-input-icon"
};
var InputIconStyle = BaseStyle.extend({
  name: "inputicon",
  classes
});
var script$1 = {
  name: "BaseInputIcon",
  "extends": script$2,
  style: InputIconStyle,
  props: {
    "class": null
  },
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};
var script = {
  name: "InputIcon",
  "extends": script$1,
  inheritAttrs: false,
  computed: {
    containerClass: function containerClass() {
      return [this.cx("root"), this["class"]];
    }
  }
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", mergeProps({
    "class": $options.containerClass
  }, _ctx.ptmi("root")), [renderSlot(_ctx.$slots, "default")], 16);
}
script.render = render;

export { script as default };
//# sourceMappingURL=inputicon.esm-DsrGfACI.mjs.map
