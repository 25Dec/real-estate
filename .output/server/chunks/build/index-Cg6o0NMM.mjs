import { _ as __nuxt_component_0 } from './nuxt-link-CXbm9kH4.mjs';
import __nuxt_component_1 from './Icon-B04GAuZ4.mjs';
import script from './button.esm-D8sVcJb8.mjs';
import script$1 from './avatar.esm-G-uX_ALX.mjs';
import script$2 from './menu.esm-C_RMEhtK.mjs';
import { _ as __nuxt_component_4 } from './nuxt-img-B1CeyAfr.mjs';
import { withAsyncContext, ref, resolveDirective, unref, withCtx, createVNode, createTextVNode, toDisplayString, mergeProps, useSSRContext, withDirectives, openBlock, createBlock } from 'vue';
import { ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttrs, ssrGetDirectiveProps } from 'vue/server-renderer';
import script$5 from './card.esm-Dl-1afH1.mjs';
import script$6 from './tag.esm-Bkya-FxV.mjs';
import { u as useProjectsStore } from './projects-store-50IgnX7b.mjs';
import { _ as _export_sfc, s as storeToRefs, e as useAuthStore, l as landingPageAboutUsContents, f as landingPageServicesContent, c as useRouter } from './server.mjs';
import { c as capitalize } from './core_utils-WJ_cJnbk.mjs';
import script$3 from './inputtext.esm-Blvd_dSV.mjs';
import script$4 from './textarea.esm-r2lUF_RZ.mjs';
import { D as commonjsGlobal } from '../runtime.mjs';
import './index-DE5HZNjr.mjs';
import '@iconify/vue/dist/offline';
import '@iconify/vue';
import './badge.esm-CGMv5799.mjs';
import './basecomponent.esm-DXWDIfdj.mjs';
import './index.esm-C7T4V9vj.mjs';
import './baseicon.esm-DbzTeshI.mjs';
import './overlayeventbus.esm-Cq2NCN3a.mjs';
import './portal.esm-CdWWxjdD.mjs';
import './index-BabADJUJ.mjs';
import '@unhead/shared';
import './fetch-DXSGE_KZ.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import 'vue-router';
import '@formkit/auto-animate/vue';
import 'framesync';
import 'popmotion';
import 'style-value-types';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'ipx';

var scrollLock = {exports: {}};

(function (module, exports) {
	(function webpackUniversalModuleDefinition(root, factory) {
		module.exports = factory();
	})(commonjsGlobal, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	/******/
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	/******/
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId]) {
	/******/ 			return installedModules[moduleId].exports;
	/******/ 		}
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			i: moduleId,
	/******/ 			l: false,
	/******/ 			exports: {}
	/******/ 		};
	/******/
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	/******/
	/******/ 		// Flag the module as loaded
	/******/ 		module.l = true;
	/******/
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	/******/
	/******/
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	/******/
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	/******/
	/******/ 	// define getter function for harmony exports
	/******/ 	__webpack_require__.d = function(exports, name, getter) {
	/******/ 		if(!__webpack_require__.o(exports, name)) {
	/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
	/******/ 		}
	/******/ 	};
	/******/
	/******/ 	// define __esModule on exports
	/******/ 	__webpack_require__.r = function(exports) {
	/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
	/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
	/******/ 		}
	/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
	/******/ 	};
	/******/
	/******/ 	// create a fake namespace object
	/******/ 	// mode & 1: value is a module id, require it
	/******/ 	// mode & 2: merge all properties of value into the ns
	/******/ 	// mode & 4: return value when already ns object
	/******/ 	// mode & 8|1: behave like require
	/******/ 	__webpack_require__.t = function(value, mode) {
	/******/ 		if(mode & 1) value = __webpack_require__(value);
	/******/ 		if(mode & 8) return value;
	/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
	/******/ 		var ns = Object.create(null);
	/******/ 		__webpack_require__.r(ns);
	/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
	/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
	/******/ 		return ns;
	/******/ 	};
	/******/
	/******/ 	// getDefaultExport function for compatibility with non-harmony modules
	/******/ 	__webpack_require__.n = function(module) {
	/******/ 		var getter = module && module.__esModule ?
	/******/ 			function getDefault() { return module['default']; } :
	/******/ 			function getModuleExports() { return module; };
	/******/ 		__webpack_require__.d(getter, 'a', getter);
	/******/ 		return getter;
	/******/ 	};
	/******/
	/******/ 	// Object.prototype.hasOwnProperty.call
	/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
	/******/
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	/******/
	/******/
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(__webpack_require__.s = 0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	__webpack_require__.r(__webpack_exports__);

	// CONCATENATED MODULE: ./src/tools.js
	var argumentAsArray = function argumentAsArray(argument) {
	  return Array.isArray(argument) ? argument : [argument];
	};
	var isElement = function isElement(target) {
	  return target instanceof Node;
	};
	var isElementList = function isElementList(nodeList) {
	  return nodeList instanceof NodeList;
	};
	var eachNode = function eachNode(nodeList, callback) {
	  if (nodeList && callback) {
	    nodeList = isElementList(nodeList) ? nodeList : [nodeList];

	    for (var i = 0; i < nodeList.length; i++) {
	      if (callback(nodeList[i], i, nodeList.length) === true) {
	        break;
	      }
	    }
	  }
	};
	var throwError = function throwError(message) {
	  return console.error("[scroll-lock] ".concat(message));
	};
	var arrayAsSelector = function arrayAsSelector(array) {
	  if (Array.isArray(array)) {
	    var selector = array.join(', ');
	    return selector;
	  }
	};
	var nodeListAsArray = function nodeListAsArray(nodeList) {
	  var nodes = [];
	  eachNode(nodeList, function (node) {
	    return nodes.push(node);
	  });
	  return nodes;
	};
	var findParentBySelector = function findParentBySelector($el, selector) {
	  var self = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
	  var $root = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : document;

	  if (self && nodeListAsArray($root.querySelectorAll(selector)).indexOf($el) !== -1) {
	    return $el;
	  }

	  while (($el = $el.parentElement) && nodeListAsArray($root.querySelectorAll(selector)).indexOf($el) === -1) {
	  }

	  return $el;
	};
	var elementHasSelector = function elementHasSelector($el, selector) {
	  var $root = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document;
	  var has = nodeListAsArray($root.querySelectorAll(selector)).indexOf($el) !== -1;
	  return has;
	};
	var elementHasOverflowHidden = function elementHasOverflowHidden($el) {
	  if ($el) {
	    var computedStyle = getComputedStyle($el);
	    var overflowIsHidden = computedStyle.overflow === 'hidden';
	    return overflowIsHidden;
	  }
	};
	var elementScrollTopOnStart = function elementScrollTopOnStart($el) {
	  if ($el) {
	    if (elementHasOverflowHidden($el)) {
	      return true;
	    }

	    var scrollTop = $el.scrollTop;
	    return scrollTop <= 0;
	  }
	};
	var elementScrollTopOnEnd = function elementScrollTopOnEnd($el) {
	  if ($el) {
	    if (elementHasOverflowHidden($el)) {
	      return true;
	    }

	    var scrollTop = $el.scrollTop;
	    var scrollHeight = $el.scrollHeight;
	    var scrollTopWithHeight = scrollTop + $el.offsetHeight;
	    return scrollTopWithHeight >= scrollHeight;
	  }
	};
	var elementScrollLeftOnStart = function elementScrollLeftOnStart($el) {
	  if ($el) {
	    if (elementHasOverflowHidden($el)) {
	      return true;
	    }

	    var scrollLeft = $el.scrollLeft;
	    return scrollLeft <= 0;
	  }
	};
	var elementScrollLeftOnEnd = function elementScrollLeftOnEnd($el) {
	  if ($el) {
	    if (elementHasOverflowHidden($el)) {
	      return true;
	    }

	    var scrollLeft = $el.scrollLeft;
	    var scrollWidth = $el.scrollWidth;
	    var scrollLeftWithWidth = scrollLeft + $el.offsetWidth;
	    return scrollLeftWithWidth >= scrollWidth;
	  }
	};
	var elementIsScrollableField = function elementIsScrollableField($el) {
	  var selector = 'textarea, [contenteditable="true"]';
	  return elementHasSelector($el, selector);
	};
	var elementIsInputRange = function elementIsInputRange($el) {
	  var selector = 'input[type="range"]';
	  return elementHasSelector($el, selector);
	};
	// CONCATENATED MODULE: ./src/scroll-lock.js
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "disablePageScroll", function() { return disablePageScroll; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enablePageScroll", function() { return enablePageScroll; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getScrollState", function() { return getScrollState; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearQueueScrollLocks", function() { return clearQueueScrollLocks; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTargetScrollBarWidth", function() { return scroll_lock_getTargetScrollBarWidth; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentTargetScrollBarWidth", function() { return scroll_lock_getCurrentTargetScrollBarWidth; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPageScrollBarWidth", function() { return getPageScrollBarWidth; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentPageScrollBarWidth", function() { return getCurrentPageScrollBarWidth; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addScrollableTarget", function() { return scroll_lock_addScrollableTarget; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeScrollableTarget", function() { return scroll_lock_removeScrollableTarget; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addScrollableSelector", function() { return scroll_lock_addScrollableSelector; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeScrollableSelector", function() { return scroll_lock_removeScrollableSelector; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addLockableTarget", function() { return scroll_lock_addLockableTarget; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addLockableSelector", function() { return scroll_lock_addLockableSelector; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setFillGapMethod", function() { return scroll_lock_setFillGapMethod; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addFillGapTarget", function() { return scroll_lock_addFillGapTarget; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeFillGapTarget", function() { return scroll_lock_removeFillGapTarget; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addFillGapSelector", function() { return scroll_lock_addFillGapSelector; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeFillGapSelector", function() { return scroll_lock_removeFillGapSelector; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "refillGaps", function() { return refillGaps; });
	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


	var FILL_GAP_AVAILABLE_METHODS = ['padding', 'margin', 'width', 'max-width', 'none'];
	var TOUCH_DIRECTION_DETECT_OFFSET = 3;
	var state = {
	  scroll: true,
	  queue: 0,
	  scrollableSelectors: ['[data-scroll-lock-scrollable]'],
	  lockableSelectors: ['body', '[data-scroll-lock-lockable]'],
	  fillGapSelectors: ['body', '[data-scroll-lock-fill-gap]', '[data-scroll-lock-lockable]'],
	  fillGapMethod: FILL_GAP_AVAILABLE_METHODS[0],
	  //
	  startTouchY: 0,
	  startTouchX: 0
	};
	var disablePageScroll = function disablePageScroll(target) {
	  if (state.queue <= 0) {
	    state.scroll = false;
	    scroll_lock_hideLockableOverflow();
	    fillGaps();
	  }

	  scroll_lock_addScrollableTarget(target);
	  state.queue++;
	};
	var enablePageScroll = function enablePageScroll(target) {
	  state.queue > 0 && state.queue--;

	  if (state.queue <= 0) {
	    state.scroll = true;
	    scroll_lock_showLockableOverflow();
	    unfillGaps();
	  }

	  scroll_lock_removeScrollableTarget(target);
	};
	var getScrollState = function getScrollState() {
	  return state.scroll;
	};
	var clearQueueScrollLocks = function clearQueueScrollLocks() {
	  state.queue = 0;
	};
	var scroll_lock_getTargetScrollBarWidth = function getTargetScrollBarWidth($target) {
	  var onlyExists = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	  if (isElement($target)) {
	    var currentOverflowYProperty = $target.style.overflowY;

	    if (onlyExists) {
	      if (!getScrollState()) {
	        $target.style.overflowY = $target.getAttribute('data-scroll-lock-saved-overflow-y-property');
	      }
	    } else {
	      $target.style.overflowY = 'scroll';
	    }

	    var width = scroll_lock_getCurrentTargetScrollBarWidth($target);
	    $target.style.overflowY = currentOverflowYProperty;
	    return width;
	  } else {
	    return 0;
	  }
	};
	var scroll_lock_getCurrentTargetScrollBarWidth = function getCurrentTargetScrollBarWidth($target) {
	  if (isElement($target)) {
	    if ($target === document.body) {
	      var documentWidth = document.documentElement.clientWidth;
	      var windowWidth = window.innerWidth;
	      var currentWidth = windowWidth - documentWidth;
	      return currentWidth;
	    } else {
	      var borderLeftWidthCurrentProperty = $target.style.borderLeftWidth;
	      var borderRightWidthCurrentProperty = $target.style.borderRightWidth;
	      $target.style.borderLeftWidth = '0px';
	      $target.style.borderRightWidth = '0px';

	      var _currentWidth = $target.offsetWidth - $target.clientWidth;

	      $target.style.borderLeftWidth = borderLeftWidthCurrentProperty;
	      $target.style.borderRightWidth = borderRightWidthCurrentProperty;
	      return _currentWidth;
	    }
	  } else {
	    return 0;
	  }
	};
	var getPageScrollBarWidth = function getPageScrollBarWidth() {
	  var onlyExists = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	  return scroll_lock_getTargetScrollBarWidth(document.body, onlyExists);
	};
	var getCurrentPageScrollBarWidth = function getCurrentPageScrollBarWidth() {
	  return scroll_lock_getCurrentTargetScrollBarWidth(document.body);
	};
	var scroll_lock_addScrollableTarget = function addScrollableTarget(target) {
	  if (target) {
	    var targets = argumentAsArray(target);
	    targets.map(function ($targets) {
	      eachNode($targets, function ($target) {
	        if (isElement($target)) {
	          $target.setAttribute('data-scroll-lock-scrollable', '');
	        } else {
	          throwError("\"".concat($target, "\" is not a Element."));
	        }
	      });
	    });
	  }
	};
	var scroll_lock_removeScrollableTarget = function removeScrollableTarget(target) {
	  if (target) {
	    var targets = argumentAsArray(target);
	    targets.map(function ($targets) {
	      eachNode($targets, function ($target) {
	        if (isElement($target)) {
	          $target.removeAttribute('data-scroll-lock-scrollable');
	        } else {
	          throwError("\"".concat($target, "\" is not a Element."));
	        }
	      });
	    });
	  }
	};
	var scroll_lock_addScrollableSelector = function addScrollableSelector(selector) {
	  if (selector) {
	    var selectors = argumentAsArray(selector);
	    selectors.map(function (selector) {
	      state.scrollableSelectors.push(selector);
	    });
	  }
	};
	var scroll_lock_removeScrollableSelector = function removeScrollableSelector(selector) {
	  if (selector) {
	    var selectors = argumentAsArray(selector);
	    selectors.map(function (selector) {
	      state.scrollableSelectors = state.scrollableSelectors.filter(function (sSelector) {
	        return sSelector !== selector;
	      });
	    });
	  }
	};
	var scroll_lock_addLockableTarget = function addLockableTarget(target) {
	  if (target) {
	    var targets = argumentAsArray(target);
	    targets.map(function ($targets) {
	      eachNode($targets, function ($target) {
	        if (isElement($target)) {
	          $target.setAttribute('data-scroll-lock-lockable', '');
	        } else {
	          throwError("\"".concat($target, "\" is not a Element."));
	        }
	      });
	    });

	    if (!getScrollState()) {
	      scroll_lock_hideLockableOverflow();
	    }
	  }
	};
	var scroll_lock_addLockableSelector = function addLockableSelector(selector) {
	  if (selector) {
	    var selectors = argumentAsArray(selector);
	    selectors.map(function (selector) {
	      state.lockableSelectors.push(selector);
	    });

	    if (!getScrollState()) {
	      scroll_lock_hideLockableOverflow();
	    }

	    scroll_lock_addFillGapSelector(selector);
	  }
	};
	var scroll_lock_setFillGapMethod = function setFillGapMethod(method) {
	  if (method) {
	    if (FILL_GAP_AVAILABLE_METHODS.indexOf(method) !== -1) {
	      state.fillGapMethod = method;
	      refillGaps();
	    } else {
	      var methods = FILL_GAP_AVAILABLE_METHODS.join(', ');
	      throwError("\"".concat(method, "\" method is not available!\nAvailable fill gap methods: ").concat(methods, "."));
	    }
	  }
	};
	var scroll_lock_addFillGapTarget = function addFillGapTarget(target) {
	  if (target) {
	    var targets = argumentAsArray(target);
	    targets.map(function ($targets) {
	      eachNode($targets, function ($target) {
	        if (isElement($target)) {
	          $target.setAttribute('data-scroll-lock-fill-gap', '');

	          if (!state.scroll) {
	            scroll_lock_fillGapTarget($target);
	          }
	        } else {
	          throwError("\"".concat($target, "\" is not a Element."));
	        }
	      });
	    });
	  }
	};
	var scroll_lock_removeFillGapTarget = function removeFillGapTarget(target) {
	  if (target) {
	    var targets = argumentAsArray(target);
	    targets.map(function ($targets) {
	      eachNode($targets, function ($target) {
	        if (isElement($target)) {
	          $target.removeAttribute('data-scroll-lock-fill-gap');

	          if (!state.scroll) {
	            scroll_lock_unfillGapTarget($target);
	          }
	        } else {
	          throwError("\"".concat($target, "\" is not a Element."));
	        }
	      });
	    });
	  }
	};
	var scroll_lock_addFillGapSelector = function addFillGapSelector(selector) {
	  if (selector) {
	    var selectors = argumentAsArray(selector);
	    selectors.map(function (selector) {
	      if (state.fillGapSelectors.indexOf(selector) === -1) {
	        state.fillGapSelectors.push(selector);

	        if (!state.scroll) {
	          scroll_lock_fillGapSelector(selector);
	        }
	      }
	    });
	  }
	};
	var scroll_lock_removeFillGapSelector = function removeFillGapSelector(selector) {
	  if (selector) {
	    var selectors = argumentAsArray(selector);
	    selectors.map(function (selector) {
	      state.fillGapSelectors = state.fillGapSelectors.filter(function (fSelector) {
	        return fSelector !== selector;
	      });

	      if (!state.scroll) {
	        scroll_lock_unfillGapSelector(selector);
	      }
	    });
	  }
	};
	var refillGaps = function refillGaps() {
	  if (!state.scroll) {
	    fillGaps();
	  }
	};

	var scroll_lock_hideLockableOverflow = function hideLockableOverflow() {
	  var selector = arrayAsSelector(state.lockableSelectors);
	  scroll_lock_hideLockableOverflowSelector(selector);
	};

	var scroll_lock_showLockableOverflow = function showLockableOverflow() {
	  var selector = arrayAsSelector(state.lockableSelectors);
	  scroll_lock_showLockableOverflowSelector(selector);
	};

	var scroll_lock_hideLockableOverflowSelector = function hideLockableOverflowSelector(selector) {
	  var $targets = document.querySelectorAll(selector);
	  eachNode($targets, function ($target) {
	    scroll_lock_hideLockableOverflowTarget($target);
	  });
	};

	var scroll_lock_showLockableOverflowSelector = function showLockableOverflowSelector(selector) {
	  var $targets = document.querySelectorAll(selector);
	  eachNode($targets, function ($target) {
	    scroll_lock_showLockableOverflowTarget($target);
	  });
	};

	var scroll_lock_hideLockableOverflowTarget = function hideLockableOverflowTarget($target) {
	  if (isElement($target) && $target.getAttribute('data-scroll-lock-locked') !== 'true') {
	    var computedStyle = window.getComputedStyle($target);
	    $target.setAttribute('data-scroll-lock-saved-overflow-y-property', computedStyle.overflowY);
	    $target.setAttribute('data-scroll-lock-saved-inline-overflow-property', $target.style.overflow);
	    $target.setAttribute('data-scroll-lock-saved-inline-overflow-y-property', $target.style.overflowY);
	    $target.style.overflow = 'hidden';
	    $target.setAttribute('data-scroll-lock-locked', 'true');
	  }
	};

	var scroll_lock_showLockableOverflowTarget = function showLockableOverflowTarget($target) {
	  if (isElement($target) && $target.getAttribute('data-scroll-lock-locked') === 'true') {
	    $target.style.overflow = $target.getAttribute('data-scroll-lock-saved-inline-overflow-property');
	    $target.style.overflowY = $target.getAttribute('data-scroll-lock-saved-inline-overflow-y-property');
	    $target.removeAttribute('data-scroll-lock-saved-overflow-property');
	    $target.removeAttribute('data-scroll-lock-saved-inline-overflow-property');
	    $target.removeAttribute('data-scroll-lock-saved-inline-overflow-y-property');
	    $target.removeAttribute('data-scroll-lock-locked');
	  }
	};

	var fillGaps = function fillGaps() {
	  state.fillGapSelectors.map(function (selector) {
	    scroll_lock_fillGapSelector(selector);
	  });
	};

	var unfillGaps = function unfillGaps() {
	  state.fillGapSelectors.map(function (selector) {
	    scroll_lock_unfillGapSelector(selector);
	  });
	};

	var scroll_lock_fillGapSelector = function fillGapSelector(selector) {
	  var $targets = document.querySelectorAll(selector);
	  var isLockable = state.lockableSelectors.indexOf(selector) !== -1;
	  eachNode($targets, function ($target) {
	    scroll_lock_fillGapTarget($target, isLockable);
	  });
	};

	var scroll_lock_fillGapTarget = function fillGapTarget($target) {
	  var isLockable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	  if (isElement($target)) {
	    var scrollBarWidth;

	    if ($target.getAttribute('data-scroll-lock-lockable') === '' || isLockable) {
	      scrollBarWidth = scroll_lock_getTargetScrollBarWidth($target, true);
	    } else {
	      var $lockableParent = findParentBySelector($target, arrayAsSelector(state.lockableSelectors));
	      scrollBarWidth = scroll_lock_getTargetScrollBarWidth($lockableParent, true);
	    }

	    if ($target.getAttribute('data-scroll-lock-filled-gap') === 'true') {
	      scroll_lock_unfillGapTarget($target);
	    }

	    var computedStyle = window.getComputedStyle($target);
	    $target.setAttribute('data-scroll-lock-filled-gap', 'true');
	    $target.setAttribute('data-scroll-lock-current-fill-gap-method', state.fillGapMethod);

	    if (state.fillGapMethod === 'margin') {
	      var currentMargin = parseFloat(computedStyle.marginRight);
	      $target.style.marginRight = "".concat(currentMargin + scrollBarWidth, "px");
	    } else if (state.fillGapMethod === 'width') {
	      $target.style.width = "calc(100% - ".concat(scrollBarWidth, "px)");
	    } else if (state.fillGapMethod === 'max-width') {
	      $target.style.maxWidth = "calc(100% - ".concat(scrollBarWidth, "px)");
	    } else if (state.fillGapMethod === 'padding') {
	      var currentPadding = parseFloat(computedStyle.paddingRight);
	      $target.style.paddingRight = "".concat(currentPadding + scrollBarWidth, "px");
	    }
	  }
	};

	var scroll_lock_unfillGapSelector = function unfillGapSelector(selector) {
	  var $targets = document.querySelectorAll(selector);
	  eachNode($targets, function ($target) {
	    scroll_lock_unfillGapTarget($target);
	  });
	};

	var scroll_lock_unfillGapTarget = function unfillGapTarget($target) {
	  if (isElement($target)) {
	    if ($target.getAttribute('data-scroll-lock-filled-gap') === 'true') {
	      var currentFillGapMethod = $target.getAttribute('data-scroll-lock-current-fill-gap-method');
	      $target.removeAttribute('data-scroll-lock-filled-gap');
	      $target.removeAttribute('data-scroll-lock-current-fill-gap-method');

	      if (currentFillGapMethod === 'margin') {
	        $target.style.marginRight = "";
	      } else if (currentFillGapMethod === 'width') {
	        $target.style.width = "";
	      } else if (currentFillGapMethod === 'max-width') {
	        $target.style.maxWidth = "";
	      } else if (currentFillGapMethod === 'padding') {
	        $target.style.paddingRight = "";
	      }
	    }
	  }
	};

	var onTouchStart = function onTouchStart(e) {
	  if (!state.scroll) {
	    state.startTouchY = e.touches[0].clientY;
	    state.startTouchX = e.touches[0].clientX;
	  }
	};

	var scroll_lock_onTouchMove = function onTouchMove(e) {
	  if (!state.scroll) {
	    var startTouchY = state.startTouchY,
	        startTouchX = state.startTouchX;
	    var currentClientY = e.touches[0].clientY;
	    var currentClientX = e.touches[0].clientX;

	    if (e.touches.length < 2) {
	      var selector = arrayAsSelector(state.scrollableSelectors);
	      var direction = {
	        up: startTouchY < currentClientY,
	        down: startTouchY > currentClientY,
	        left: startTouchX < currentClientX,
	        right: startTouchX > currentClientX
	      };
	      var directionWithOffset = {
	        up: startTouchY + TOUCH_DIRECTION_DETECT_OFFSET < currentClientY,
	        down: startTouchY - TOUCH_DIRECTION_DETECT_OFFSET > currentClientY,
	        left: startTouchX + TOUCH_DIRECTION_DETECT_OFFSET < currentClientX,
	        right: startTouchX - TOUCH_DIRECTION_DETECT_OFFSET > currentClientX
	      };

	      var handle = function handle($el) {
	        var skip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	        if ($el) {
	          var parentScrollableEl = findParentBySelector($el, selector, false);

	          if (elementIsInputRange($el)) {
	            return false;
	          }

	          if (skip || elementIsScrollableField($el) && findParentBySelector($el, selector) || elementHasSelector($el, selector)) {
	            var prevent = false;

	            if (elementScrollLeftOnStart($el) && elementScrollLeftOnEnd($el)) {
	              if (direction.up && elementScrollTopOnStart($el) || direction.down && elementScrollTopOnEnd($el)) {
	                prevent = true;
	              }
	            } else if (elementScrollTopOnStart($el) && elementScrollTopOnEnd($el)) {
	              if (direction.left && elementScrollLeftOnStart($el) || direction.right && elementScrollLeftOnEnd($el)) {
	                prevent = true;
	              }
	            } else if (directionWithOffset.up && elementScrollTopOnStart($el) || directionWithOffset.down && elementScrollTopOnEnd($el) || directionWithOffset.left && elementScrollLeftOnStart($el) || directionWithOffset.right && elementScrollLeftOnEnd($el)) {
	              prevent = true;
	            }

	            if (prevent) {
	              if (parentScrollableEl) {
	                handle(parentScrollableEl, true);
	              } else {
	                if (e.cancelable) {
	                  e.preventDefault();
	                }
	              }
	            }
	          } else {
	            handle(parentScrollableEl);
	          }
	        } else {
	          if (e.cancelable) {
	            e.preventDefault();
	          }
	        }
	      };

	      handle(e.target);
	    }
	  }
	};

	var onTouchEnd = function onTouchEnd(e) {
	  if (!state.scroll) {
	    state.startTouchY = 0;
	    state.startTouchX = 0;
	  }
	};

	if (typeof document !== 'undefined') {
	  document.addEventListener('touchstart', onTouchStart);
	  document.addEventListener('touchmove', scroll_lock_onTouchMove, {
	    passive: false
	  });
	  document.addEventListener('touchend', onTouchEnd);
	}

	var deprecatedMethods = {
	  hide: function hide(target) {
	    throwError('"hide" is deprecated! Use "disablePageScroll" instead. \n https://github.com/FL3NKEY/scroll-lock#disablepagescrollscrollabletarget');
	    disablePageScroll(target);
	  },
	  show: function show(target) {
	    throwError('"show" is deprecated! Use "enablePageScroll" instead. \n https://github.com/FL3NKEY/scroll-lock#enablepagescrollscrollabletarget');
	    enablePageScroll(target);
	  },
	  toggle: function toggle(target) {
	    throwError('"toggle" is deprecated! Do not use it.');

	    if (getScrollState()) {
	      disablePageScroll();
	    } else {
	      enablePageScroll(target);
	    }
	  },
	  getState: function getState() {
	    throwError('"getState" is deprecated! Use "getScrollState" instead. \n https://github.com/FL3NKEY/scroll-lock#getscrollstate');
	    return getScrollState();
	  },
	  getWidth: function getWidth() {
	    throwError('"getWidth" is deprecated! Use "getPageScrollBarWidth" instead. \n https://github.com/FL3NKEY/scroll-lock#getpagescrollbarwidth');
	    return getPageScrollBarWidth();
	  },
	  getCurrentWidth: function getCurrentWidth() {
	    throwError('"getCurrentWidth" is deprecated! Use "getCurrentPageScrollBarWidth" instead. \n https://github.com/FL3NKEY/scroll-lock#getcurrentpagescrollbarwidth');
	    return getCurrentPageScrollBarWidth();
	  },
	  setScrollableTargets: function setScrollableTargets(target) {
	    throwError('"setScrollableTargets" is deprecated! Use "addScrollableTarget" instead. \n https://github.com/FL3NKEY/scroll-lock#addscrollabletargetscrollabletarget');
	    scroll_lock_addScrollableTarget(target);
	  },
	  setFillGapSelectors: function setFillGapSelectors(selector) {
	    throwError('"setFillGapSelectors" is deprecated! Use "addFillGapSelector" instead. \n https://github.com/FL3NKEY/scroll-lock#addfillgapselectorfillgapselector');
	    scroll_lock_addFillGapSelector(selector);
	  },
	  setFillGapTargets: function setFillGapTargets(target) {
	    throwError('"setFillGapTargets" is deprecated! Use "addFillGapTarget" instead. \n https://github.com/FL3NKEY/scroll-lock#addfillgaptargetfillgaptarget');
	    scroll_lock_addFillGapTarget(target);
	  },
	  clearQueue: function clearQueue() {
	    throwError('"clearQueue" is deprecated! Use "clearQueueScrollLocks" instead. \n https://github.com/FL3NKEY/scroll-lock#clearqueuescrolllocks');
	    clearQueueScrollLocks();
	  }
	};

	var scrollLock = _objectSpread({
	  disablePageScroll: disablePageScroll,
	  enablePageScroll: enablePageScroll,
	  getScrollState: getScrollState,
	  clearQueueScrollLocks: clearQueueScrollLocks,
	  getTargetScrollBarWidth: scroll_lock_getTargetScrollBarWidth,
	  getCurrentTargetScrollBarWidth: scroll_lock_getCurrentTargetScrollBarWidth,
	  getPageScrollBarWidth: getPageScrollBarWidth,
	  getCurrentPageScrollBarWidth: getCurrentPageScrollBarWidth,
	  addScrollableSelector: scroll_lock_addScrollableSelector,
	  removeScrollableSelector: scroll_lock_removeScrollableSelector,
	  addScrollableTarget: scroll_lock_addScrollableTarget,
	  removeScrollableTarget: scroll_lock_removeScrollableTarget,
	  addLockableSelector: scroll_lock_addLockableSelector,
	  addLockableTarget: scroll_lock_addLockableTarget,
	  addFillGapSelector: scroll_lock_addFillGapSelector,
	  removeFillGapSelector: scroll_lock_removeFillGapSelector,
	  addFillGapTarget: scroll_lock_addFillGapTarget,
	  removeFillGapTarget: scroll_lock_removeFillGapTarget,
	  setFillGapMethod: scroll_lock_setFillGapMethod,
	  refillGaps: refillGaps,
	  _state: state
	}, deprecatedMethods);

	/* harmony default export */ __webpack_exports__["default"] = (scrollLock);

	/***/ })
	/******/ ])["default"];
	}); 
} (scrollLock));

var scrollLockExports = scrollLock.exports;

const _sfc_main$3 = {
  __name: "AboutCard",
  __ssrInlineRender: true,
  props: ["data"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Avatar = script$1;
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
      const _component_Card = script$5;
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
      const _component_Card = script$5;
      const _component_NuxtImg = __nuxt_component_4;
      const _component_Tag = script$6;
      const _component_Button = script;
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
        scrollLockExports.enablePageScroll();
      } else {
        openNavigation.value = true;
        scrollLockExports.disablePageScroll();
      }
    };
    const handleClick = () => {
      if (!openNavigation.value)
        return;
      scrollLockExports.enablePageScroll();
      openNavigation.value = false;
    };
    const toggleOption = (event) => {
      option.value.toggle(event);
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_1;
      const _component_Button = script;
      const _component_Avatar = script$1;
      const _component_Menu = script$2;
      const _component_NuxtImg = __nuxt_component_4;
      const _component_AboutCard = _sfc_main$3;
      const _component_ServiceCard = _sfc_main$2;
      const _component_ProjectCard = _sfc_main$1;
      const _component_InputText = script$3;
      const _component_Textarea = script$4;
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
      _push(`</div></div></section><footer class="w-full bg-[#131313] h-[120px] p-4 flex justify-center items-center" data-v-cb030e77><span class="text-white" data-v-cb030e77>\xA9 Copyrights. All Rights Reserved</span></footer><!--]-->`);
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

export { index as default };
//# sourceMappingURL=index-Cg6o0NMM.mjs.map
