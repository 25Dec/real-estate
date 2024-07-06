import { s as script$2 } from './basecomponent.esm-DXWDIfdj.mjs';
import { B as BaseStyle } from './server.mjs';
import { openBlock, createElementBlock, mergeProps } from 'vue';
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
  root: function root(_ref) {
    var instance = _ref.instance, props = _ref.props;
    return ["p-inputtext p-component", {
      "p-filled": instance.filled,
      "p-inputtext-sm": props.size === "small",
      "p-inputtext-lg": props.size === "large",
      "p-invalid": props.invalid,
      "p-variant-filled": props.variant ? props.variant === "filled" : instance.$primevue.config.inputStyle === "filled"
    }];
  }
};
var InputTextStyle = BaseStyle.extend({
  name: "inputtext",
  classes
});
var script$1 = {
  name: "BaseInputText",
  "extends": script$2,
  props: {
    modelValue: null,
    size: {
      type: String,
      "default": null
    },
    invalid: {
      type: Boolean,
      "default": false
    },
    variant: {
      type: String,
      "default": null
    }
  },
  style: InputTextStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};
var script = {
  name: "InputText",
  "extends": script$1,
  inheritAttrs: false,
  emits: ["update:modelValue"],
  methods: {
    getPTOptions: function getPTOptions(key) {
      var _ptm = key === "root" ? this.ptmi : this.ptm;
      return _ptm(key, {
        context: {
          filled: this.filled,
          disabled: this.$attrs.disabled || this.$attrs.disabled === ""
        }
      });
    },
    onInput: function onInput(event) {
      this.$emit("update:modelValue", event.target.value);
    }
  },
  computed: {
    filled: function filled() {
      return this.modelValue != null && this.modelValue.toString().length > 0;
    }
  }
};
var _hoisted_1 = ["value", "aria-invalid"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("input", mergeProps({
    "class": _ctx.cx("root"),
    value: _ctx.modelValue,
    "aria-invalid": _ctx.invalid || void 0,
    onInput: _cache[0] || (_cache[0] = function() {
      return $options.onInput && $options.onInput.apply($options, arguments);
    })
  }, $options.getPTOptions("root")), null, 16, _hoisted_1);
}
script.render = render;

export { script as default };
//# sourceMappingURL=inputtext.esm-Blvd_dSV.mjs.map
