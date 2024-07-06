import { s as script$2 } from './basecomponent.esm-DXWDIfdj.mjs';
import { renderSlot } from 'vue';
import './server.mjs';
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

var StepperPanelStyle = {};
var script$1 = {
  name: "BaseStepperPanel",
  "extends": script$2,
  props: {
    header: null
  },
  style: StepperPanelStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};
var script = {
  name: "StepperPanel",
  "extends": script$1
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return renderSlot(_ctx.$slots, "default");
}
script.render = render;

export { script as default };
//# sourceMappingURL=stepperpanel.esm-DaJ__N4J.mjs.map
