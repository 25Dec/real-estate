import script from './tag.esm-Bkya-FxV.mjs';
import script$1 from './iconfield.esm-CMjnwUAR.mjs';
import script$2 from './inputicon.esm-DsrGfACI.mjs';
import __nuxt_component_1 from './Icon-B04GAuZ4.mjs';
import script$3 from './inputtext.esm-Blvd_dSV.mjs';
import script$4 from './button.esm-D8sVcJb8.mjs';
import script$5 from './datatable.esm-BAh19VmC.mjs';
import script$6 from './column.esm-KktM_xTo.mjs';
import script$7 from './avatar.esm-G-uX_ALX.mjs';
import script$8 from './dialog.esm-Wemb0g_v.mjs';
import script$9 from './password.esm-WFEp3LGb.mjs';
import script$a from './dropdown.esm-BZz-eegH.mjs';
import { withAsyncContext, ref, resolveDirective, unref, withCtx, createVNode, mergeProps, isRef, toDisplayString, createTextVNode, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { s as storeToRefs, F as FilterMatchMode, u as useToast } from './server.mjs';
import { u as useUsersStore } from './users-store-OjMRM6-M.mjs';
import { c as capitalize, a as convertDateTime } from './core_utils-WJ_cJnbk.mjs';
import { ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate } from 'vue/server-renderer';
import './basecomponent.esm-DXWDIfdj.mjs';
import './index-DE5HZNjr.mjs';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'ipx';
import '@iconify/vue/dist/offline';
import '@iconify/vue';
import './badge.esm-CGMv5799.mjs';
import './index.esm-C7T4V9vj.mjs';
import './baseicon.esm-DbzTeshI.mjs';
import './paginator.esm-BvYTZ1KY.mjs';
import './index.esm-7xcJfJVp.mjs';
import './inputnumber.esm-CMvh_h4P.mjs';
import './index.esm-Dpdcp6OZ.mjs';
import './index.esm-CE-esNCM.mjs';
import './index.esm-ByqdG2PS.mjs';
import './virtualscroller.esm-QhUci9XU.mjs';
import './index.esm-Clcms31c.mjs';
import './index.esm-C03T_CK6.mjs';
import './index.esm-Cs4cT7wr.mjs';
import './index.esm-BIjuQzNw.mjs';
import './index.esm-CbKY_bSB.mjs';
import './overlayeventbus.esm-Cq2NCN3a.mjs';
import './checkbox.esm-Duuim8Iu.mjs';
import './radiobutton.esm-CQ1mq00b.mjs';
import './index.esm-BvZNBu0f.mjs';
import './portal.esm-CdWWxjdD.mjs';
import './index.esm-DTIot6dj.mjs';
import './index.esm-BBjfxSHW.mjs';
import './index.esm-CBLFGZyH.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@formkit/auto-animate/vue';
import 'framesync';
import 'popmotion';
import 'style-value-types';
import './fetch-DXSGE_KZ.mjs';

const _sfc_main$4 = {
  __name: "ViewDetailsUserDialog",
  __ssrInlineRender: true,
  props: ["visible", "roles"],
  setup(__props) {
    var _a, _b, _c, _d;
    const { visible, roles } = __props;
    const { currentUser } = storeToRefs(useUsersStore());
    const myVisible = ref(visible);
    const socialID = ref(currentUser.value["social_id"]);
    const phone = ref(currentUser.value["phone"]);
    const loginName = ref(currentUser.value["login_name"]);
    const password = ref(currentUser.value["password"]);
    const firstName = ref(currentUser.value["first_name"]);
    const lastName = ref(currentUser.value["last_name"]);
    const email = ref(currentUser.value["email"]);
    const type = ref({
      name: (_b = (_a = roles.filter(
        (role) => role["value"] == currentUser.value["type"]
      )) == null ? void 0 : _a[0]) == null ? void 0 : _b["name"],
      value: (_d = (_c = roles.filter(
        (role) => role["value"] == currentUser.value["type"]
      )) == null ? void 0 : _c[0]) == null ? void 0 : _d["value"]
    });
    const phoneVerified = ref(currentUser.value["phone_verified"]);
    const emailVerified = ref(currentUser.value["email_verified"]);
    const socialVerified = ref(currentUser.value["social_verified"]);
    const createdAt = ref(currentUser.value["created_at"]);
    const updatedAt = ref(currentUser.value["updated_at"]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script$8;
      const _component_InputText = script$3;
      const _component_Password = script$9;
      const _component_Dropdown = script$a;
      const _component_Button = script$4;
      _push(ssrRenderComponent(_component_Dialog, mergeProps({
        visible: unref(myVisible),
        "onUpdate:visible": ($event) => isRef(myVisible) ? myVisible.value = $event : null,
        modal: "",
        maximizable: "",
        header: "Header",
        style: { width: "50rem" },
        breakpoints: { "1199px": "75vw", "575px": "90vw" }
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="inline-flex items-center justify-center gap-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>User Details</span></div>`);
          } else {
            return [
              createVNode("div", { class: "inline-flex items-center justify-center gap-2" }, [
                createVNode("span", { class: "font-bold text-xl" }, "User Details")
              ])
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Button, {
              type: "button",
              label: "Close",
              onClick: ($event) => myVisible.value = false
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Button, {
                type: "button",
                label: "Close",
                onClick: ($event) => myVisible.value = false
              }, null, 8, ["onClick"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<template class="flex flex-col gap-3"${_scopeId}><div class="flex flex-row gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="firstName"${_scopeId}>First Name</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "firstName",
              placeholder: "First Name",
              modelValue: unref(firstName),
              "onUpdate:modelValue": ($event) => isRef(firstName) ? firstName.value = $event : null,
              modelModifiers: { trim: true },
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="lastName"${_scopeId}>Last Name</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "lastName",
              placeholder: "Last Name",
              modelValue: unref(lastName),
              "onUpdate:modelValue": ($event) => isRef(lastName) ? lastName.value = $event : null,
              modelModifiers: { trim: true },
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-row gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="loginName"${_scopeId}>Login Name</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "loginName",
              placeholder: "Login Name",
              modelValue: unref(loginName),
              "onUpdate:modelValue": ($event) => isRef(loginName) ? loginName.value = $event : null,
              modelModifiers: { trim: true },
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="password"${_scopeId}>Password</label>`);
            _push2(ssrRenderComponent(_component_Password, {
              id: "password",
              placeholder: "Password",
              modelValue: unref(password),
              "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
              feedback: false,
              toggleMask: "",
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-row gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="phone"${_scopeId}>Phone Number</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "phone",
              placeholder: "+84 9698 886 660",
              modelValue: unref(phone),
              "onUpdate:modelValue": ($event) => isRef(phone) ? phone.value = $event : null,
              modelModifiers: { trim: true },
              integeronly: "",
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="phoneVerified"${_scopeId}>Phone Verified</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "phoneVerified",
              placeholder: "+84 9698 886 660",
              modelValue: unref(phoneVerified),
              "onUpdate:modelValue": ($event) => isRef(phoneVerified) ? phoneVerified.value = $event : null,
              modelModifiers: { trim: true },
              integeronly: "",
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="type"${_scopeId}>User Role</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "type",
              class: "flex-1",
              placeholder: "Select User Role",
              modelValue: unref(type).value,
              "onUpdate:modelValue": ($event) => unref(type).value = $event,
              options: __props.roles,
              optionLabel: "name",
              optionValue: "value",
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-col gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="email"${_scopeId}>Email</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "email",
              placeholder: "example@gmail.com",
              modelValue: unref(email),
              "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="emailVerified"${_scopeId}>Email Verified</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "emailVerified",
              placeholder: "example@gmail.com",
              modelValue: unref(emailVerified),
              "onUpdate:modelValue": ($event) => isRef(emailVerified) ? emailVerified.value = $event : null,
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-col gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="socialID"${_scopeId}>Social ID</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "socialID",
              placeholder: "https://www.facebook.com",
              modelValue: unref(socialID),
              "onUpdate:modelValue": ($event) => isRef(socialID) ? socialID.value = $event : null,
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="socialVerified"${_scopeId}>Social Verified</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "socialVerified",
              placeholder: "https://www.facebook.com",
              modelValue: unref(socialVerified),
              "onUpdate:modelValue": ($event) => isRef(socialVerified) ? socialVerified.value = $event : null,
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-row gap-3 justify-between"${_scopeId}><span class="text-xs text-gray-400"${_scopeId}> Created at: ${ssrInterpolate(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(createdAt)))}</span><span class="text-xs text-gray-400"${_scopeId}> Updated at: ${ssrInterpolate(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(updatedAt)))}</span></div></template>`);
          } else {
            return [
              createVNode("template", { class: "flex flex-col gap-3" }, [
                createVNode("div", { class: "flex flex-row gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "firstName" }, "First Name"),
                    createVNode(_component_InputText, {
                      id: "firstName",
                      placeholder: "First Name",
                      modelValue: unref(firstName),
                      "onUpdate:modelValue": ($event) => isRef(firstName) ? firstName.value = $event : null,
                      modelModifiers: { trim: true },
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "lastName" }, "Last Name"),
                    createVNode(_component_InputText, {
                      id: "lastName",
                      placeholder: "Last Name",
                      modelValue: unref(lastName),
                      "onUpdate:modelValue": ($event) => isRef(lastName) ? lastName.value = $event : null,
                      modelModifiers: { trim: true },
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-row gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "loginName" }, "Login Name"),
                    createVNode(_component_InputText, {
                      id: "loginName",
                      placeholder: "Login Name",
                      modelValue: unref(loginName),
                      "onUpdate:modelValue": ($event) => isRef(loginName) ? loginName.value = $event : null,
                      modelModifiers: { trim: true },
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "password" }, "Password"),
                    createVNode(_component_Password, {
                      id: "password",
                      placeholder: "Password",
                      modelValue: unref(password),
                      "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                      feedback: false,
                      toggleMask: "",
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-row gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "phone" }, "Phone Number"),
                    createVNode(_component_InputText, {
                      id: "phone",
                      placeholder: "+84 9698 886 660",
                      modelValue: unref(phone),
                      "onUpdate:modelValue": ($event) => isRef(phone) ? phone.value = $event : null,
                      modelModifiers: { trim: true },
                      integeronly: "",
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "phoneVerified" }, "Phone Verified"),
                    createVNode(_component_InputText, {
                      id: "phoneVerified",
                      placeholder: "+84 9698 886 660",
                      modelValue: unref(phoneVerified),
                      "onUpdate:modelValue": ($event) => isRef(phoneVerified) ? phoneVerified.value = $event : null,
                      modelModifiers: { trim: true },
                      integeronly: "",
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                  createVNode("label", { for: "type" }, "User Role"),
                  createVNode(_component_Dropdown, {
                    id: "type",
                    class: "flex-1",
                    placeholder: "Select User Role",
                    modelValue: unref(type).value,
                    "onUpdate:modelValue": ($event) => unref(type).value = $event,
                    options: __props.roles,
                    optionLabel: "name",
                    optionValue: "value",
                    disabled: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                ]),
                createVNode("div", { class: "flex flex-col gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "email" }, "Email"),
                    createVNode(_component_InputText, {
                      id: "email",
                      placeholder: "example@gmail.com",
                      modelValue: unref(email),
                      "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "emailVerified" }, "Email Verified"),
                    createVNode(_component_InputText, {
                      id: "emailVerified",
                      placeholder: "example@gmail.com",
                      modelValue: unref(emailVerified),
                      "onUpdate:modelValue": ($event) => isRef(emailVerified) ? emailVerified.value = $event : null,
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-col gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "socialID" }, "Social ID"),
                    createVNode(_component_InputText, {
                      id: "socialID",
                      placeholder: "https://www.facebook.com",
                      modelValue: unref(socialID),
                      "onUpdate:modelValue": ($event) => isRef(socialID) ? socialID.value = $event : null,
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "socialVerified" }, "Social Verified"),
                    createVNode(_component_InputText, {
                      id: "socialVerified",
                      placeholder: "https://www.facebook.com",
                      modelValue: unref(socialVerified),
                      "onUpdate:modelValue": ($event) => isRef(socialVerified) ? socialVerified.value = $event : null,
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-row gap-3 justify-between" }, [
                  createVNode("span", { class: "text-xs text-gray-400" }, " Created at: " + toDisplayString(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(createdAt))), 1),
                  createVNode("span", { class: "text-xs text-gray-400" }, " Updated at: " + toDisplayString(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(updatedAt))), 1)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/users/ViewDetailsUserDialog.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
  __name: "CreateUserDialog",
  __ssrInlineRender: true,
  props: ["visible", "roles"],
  setup(__props) {
    const { visible, roles } = __props;
    const { addNewUser } = useUsersStore();
    const toast = useToast();
    const myVisible = ref(visible);
    const socialID = ref("");
    const phone = ref("");
    const loginName = ref("");
    const password = ref("");
    const firstName = ref("");
    const lastName = ref("");
    const email = ref("");
    const type = ref({});
    const phoneVerified = ref("");
    const emailVerified = ref("");
    const socialVerified = ref("");
    const onSave = async () => {
      const newUserData = {
        id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1,
        social_id: socialID.value,
        phone: phone.value,
        login_name: loginName.value,
        password: password.value,
        first_name: firstName.value,
        last_name: lastName.value,
        display_name: `${firstName.value} ${lastName.value}`,
        email: email.value,
        language: "vi",
        type: type.value.value,
        phone_verified: phoneVerified.value,
        email_verified: emailVerified.value,
        social_verified: socialVerified.value,
        activated: "true",
        deleted: "false",
        created_by: 1,
        updated_by: 1,
        created_at: (/* @__PURE__ */ new Date()).toLocaleString(),
        updated_at: null
      };
      const response = await addNewUser(newUserData);
      myVisible.value = false;
      if (response != null && response["result"] == "ok") {
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Create New User Successfully!",
          group: "bl",
          life: 3e3
        });
      } else {
        toast.add({
          severity: "danger",
          summary: "Error",
          detail: "Failed to Create New User",
          group: "bl",
          life: 3e3
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script$8;
      const _component_InputText = script$3;
      const _component_Password = script$9;
      const _component_Dropdown = script$a;
      const _component_Button = script$4;
      _push(ssrRenderComponent(_component_Dialog, mergeProps({
        visible: unref(myVisible),
        "onUpdate:visible": ($event) => isRef(myVisible) ? myVisible.value = $event : null,
        modal: "",
        maximizable: "",
        header: "Header",
        style: { width: "50rem" },
        breakpoints: { "1199px": "75vw", "575px": "90vw" }
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="inline-flex items-center justify-center gap-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>Create New User</span></div>`);
          } else {
            return [
              createVNode("div", { class: "inline-flex items-center justify-center gap-2" }, [
                createVNode("span", { class: "font-bold text-xl" }, "Create New User")
              ])
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Button, {
              type: "button",
              label: "Cancel",
              text: "",
              severity: "secondary",
              onClick: ($event) => myVisible.value = false
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Button, {
              type: "submit",
              label: "Save",
              onClick: onSave
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Button, {
                type: "button",
                label: "Cancel",
                text: "",
                severity: "secondary",
                onClick: ($event) => myVisible.value = false
              }, null, 8, ["onClick"]),
              createVNode(_component_Button, {
                type: "submit",
                label: "Save",
                onClick: onSave
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<template class="flex flex-col gap-3"${_scopeId}><div class="flex flex-row gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="firstName"${_scopeId}>First Name</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "firstName",
              placeholder: "First Name",
              modelValue: unref(firstName),
              "onUpdate:modelValue": ($event) => isRef(firstName) ? firstName.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="lastName"${_scopeId}>Last Name</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "lastName",
              placeholder: "Last Name",
              modelValue: unref(lastName),
              "onUpdate:modelValue": ($event) => isRef(lastName) ? lastName.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-row gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="loginName"${_scopeId}>Login Name</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "loginName",
              placeholder: "Login Name",
              modelValue: unref(loginName),
              "onUpdate:modelValue": ($event) => isRef(loginName) ? loginName.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="password"${_scopeId}>Password</label>`);
            _push2(ssrRenderComponent(_component_Password, {
              id: "password",
              placeholder: "Password",
              modelValue: unref(password),
              "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
              feedback: false,
              toggleMask: ""
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-row gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="phone"${_scopeId}>Phone Number</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "phone",
              placeholder: "+84 9698 886 660",
              modelValue: unref(phone),
              "onUpdate:modelValue": ($event) => isRef(phone) ? phone.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="phoneVerified"${_scopeId}>Phone Verified</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "phoneVerified",
              placeholder: "+84 9698 886 660",
              modelValue: unref(phoneVerified),
              "onUpdate:modelValue": ($event) => isRef(phoneVerified) ? phoneVerified.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="type"${_scopeId}>User Role</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "type",
              class: "flex-1",
              placeholder: "Select User Role",
              modelValue: unref(type).value,
              "onUpdate:modelValue": ($event) => unref(type).value = $event,
              options: __props.roles,
              optionLabel: "name"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-col gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="email"${_scopeId}>Email</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "email",
              placeholder: "example@gmail.com",
              modelValue: unref(email),
              "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="emailVerified"${_scopeId}>Email Verified</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "emailVerified",
              placeholder: "example@gmail.com",
              modelValue: unref(emailVerified),
              "onUpdate:modelValue": ($event) => isRef(emailVerified) ? emailVerified.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-col gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="socialID"${_scopeId}>Social ID</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "socialID",
              placeholder: "https://www.facebook.com",
              modelValue: unref(socialID),
              "onUpdate:modelValue": ($event) => isRef(socialID) ? socialID.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="socialVerified"${_scopeId}>Social Verified</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "socialVerified",
              placeholder: "https://www.facebook.com",
              modelValue: unref(socialVerified),
              "onUpdate:modelValue": ($event) => isRef(socialVerified) ? socialVerified.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(`</div></div></template>`);
          } else {
            return [
              createVNode("template", { class: "flex flex-col gap-3" }, [
                createVNode("div", { class: "flex flex-row gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "firstName" }, "First Name"),
                    createVNode(_component_InputText, {
                      id: "firstName",
                      placeholder: "First Name",
                      modelValue: unref(firstName),
                      "onUpdate:modelValue": ($event) => isRef(firstName) ? firstName.value = $event : null
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "lastName" }, "Last Name"),
                    createVNode(_component_InputText, {
                      id: "lastName",
                      placeholder: "Last Name",
                      modelValue: unref(lastName),
                      "onUpdate:modelValue": ($event) => isRef(lastName) ? lastName.value = $event : null
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-row gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "loginName" }, "Login Name"),
                    createVNode(_component_InputText, {
                      id: "loginName",
                      placeholder: "Login Name",
                      modelValue: unref(loginName),
                      "onUpdate:modelValue": ($event) => isRef(loginName) ? loginName.value = $event : null
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "password" }, "Password"),
                    createVNode(_component_Password, {
                      id: "password",
                      placeholder: "Password",
                      modelValue: unref(password),
                      "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                      feedback: false,
                      toggleMask: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-row gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "phone" }, "Phone Number"),
                    createVNode(_component_InputText, {
                      id: "phone",
                      placeholder: "+84 9698 886 660",
                      modelValue: unref(phone),
                      "onUpdate:modelValue": ($event) => isRef(phone) ? phone.value = $event : null
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "phoneVerified" }, "Phone Verified"),
                    createVNode(_component_InputText, {
                      id: "phoneVerified",
                      placeholder: "+84 9698 886 660",
                      modelValue: unref(phoneVerified),
                      "onUpdate:modelValue": ($event) => isRef(phoneVerified) ? phoneVerified.value = $event : null
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                  createVNode("label", { for: "type" }, "User Role"),
                  createVNode(_component_Dropdown, {
                    id: "type",
                    class: "flex-1",
                    placeholder: "Select User Role",
                    modelValue: unref(type).value,
                    "onUpdate:modelValue": ($event) => unref(type).value = $event,
                    options: __props.roles,
                    optionLabel: "name"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                ]),
                createVNode("div", { class: "flex flex-col gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "email" }, "Email"),
                    createVNode(_component_InputText, {
                      id: "email",
                      placeholder: "example@gmail.com",
                      modelValue: unref(email),
                      "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "emailVerified" }, "Email Verified"),
                    createVNode(_component_InputText, {
                      id: "emailVerified",
                      placeholder: "example@gmail.com",
                      modelValue: unref(emailVerified),
                      "onUpdate:modelValue": ($event) => isRef(emailVerified) ? emailVerified.value = $event : null
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-col gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "socialID" }, "Social ID"),
                    createVNode(_component_InputText, {
                      id: "socialID",
                      placeholder: "https://www.facebook.com",
                      modelValue: unref(socialID),
                      "onUpdate:modelValue": ($event) => isRef(socialID) ? socialID.value = $event : null
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "socialVerified" }, "Social Verified"),
                    createVNode(_component_InputText, {
                      id: "socialVerified",
                      placeholder: "https://www.facebook.com",
                      modelValue: unref(socialVerified),
                      "onUpdate:modelValue": ($event) => isRef(socialVerified) ? socialVerified.value = $event : null
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/users/CreateUserDialog.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "EditUserDialog",
  __ssrInlineRender: true,
  props: ["visible", "roles"],
  setup(__props) {
    var _a, _b, _c, _d;
    const { visible, roles } = __props;
    const { currentUser } = storeToRefs(useUsersStore());
    const { editUser } = useUsersStore();
    const toast = useToast();
    const myVisible = ref(visible);
    const socialID = ref(currentUser.value["social_id"]);
    const phone = ref(currentUser.value["phone"]);
    const loginName = ref(currentUser.value["login_name"]);
    const password = ref(currentUser.value["password"]);
    const firstName = ref(currentUser.value["first_name"]);
    const lastName = ref(currentUser.value["last_name"]);
    const email = ref(currentUser.value["email"]);
    const type = ref({
      name: (_b = (_a = roles.filter(
        (role) => role["value"] == currentUser.value["type"]
      )) == null ? void 0 : _a[0]) == null ? void 0 : _b["name"],
      value: (_d = (_c = roles.filter(
        (role) => role["value"] == currentUser.value["type"]
      )) == null ? void 0 : _c[0]) == null ? void 0 : _d["value"]
    });
    const phoneVerified = ref(currentUser.value["phone_verified"]);
    const emailVerified = ref(currentUser.value["email_verified"]);
    const socialVerified = ref(currentUser.value["social_verified"]);
    const createdAt = ref(currentUser.value["created_at"]);
    const updatedAt = ref(currentUser.value["updated_at"]);
    const onSave = async () => {
      const newUserData = {
        ...currentUser.value,
        social_id: socialID.value,
        phone: phone.value,
        first_name: firstName.value,
        last_name: lastName.value,
        display_name: `${firstName.value} ${lastName.value}`,
        email: email.value,
        type: type.value.value,
        phone_verified: phoneVerified.value,
        email_verified: emailVerified.value,
        social_verified: socialVerified.value,
        updated_at: (/* @__PURE__ */ new Date()).toLocaleString()
      };
      const response = await editUser(newUserData);
      myVisible.value = false;
      if (response != null && response["result"] == "ok") {
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Edit User Successfully!",
          group: "bl",
          life: 3e3
        });
      } else {
        toast.add({
          severity: "danger",
          summary: "Error",
          detail: "Failed to Edit User",
          group: "bl",
          life: 3e3
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script$8;
      const _component_InputText = script$3;
      const _component_Password = script$9;
      const _component_Dropdown = script$a;
      const _component_Button = script$4;
      _push(ssrRenderComponent(_component_Dialog, mergeProps({
        visible: unref(myVisible),
        "onUpdate:visible": ($event) => isRef(myVisible) ? myVisible.value = $event : null,
        modal: "",
        maximizable: "",
        header: "Header",
        style: { width: "50rem" },
        breakpoints: { "1199px": "75vw", "575px": "90vw" }
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="inline-flex items-center justify-center gap-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>User Details</span></div>`);
          } else {
            return [
              createVNode("div", { class: "inline-flex items-center justify-center gap-2" }, [
                createVNode("span", { class: "font-bold text-xl" }, "User Details")
              ])
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Button, {
              type: "button",
              label: "Cancel",
              text: "",
              severity: "secondary",
              onClick: ($event) => myVisible.value = false
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Button, {
              type: "submit",
              label: "Save",
              onClick: onSave
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Button, {
                type: "button",
                label: "Cancel",
                text: "",
                severity: "secondary",
                onClick: ($event) => myVisible.value = false
              }, null, 8, ["onClick"]),
              createVNode(_component_Button, {
                type: "submit",
                label: "Save",
                onClick: onSave
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<template class="flex flex-col gap-3"${_scopeId}><div class="flex flex-row gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="firstName"${_scopeId}>First Name</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "firstName",
              placeholder: "First Name",
              modelValue: unref(firstName),
              "onUpdate:modelValue": ($event) => isRef(firstName) ? firstName.value = $event : null,
              modelModifiers: { trim: true }
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="lastName"${_scopeId}>Last Name</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "lastName",
              placeholder: "Last Name",
              modelValue: unref(lastName),
              "onUpdate:modelValue": ($event) => isRef(lastName) ? lastName.value = $event : null,
              modelModifiers: { trim: true }
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-row gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="loginName"${_scopeId}>Login Name</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "loginName",
              placeholder: "Login Name",
              modelValue: unref(loginName),
              "onUpdate:modelValue": ($event) => isRef(loginName) ? loginName.value = $event : null,
              modelModifiers: { trim: true }
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="password"${_scopeId}>Password</label>`);
            _push2(ssrRenderComponent(_component_Password, {
              id: "password",
              placeholder: "Password",
              modelValue: unref(password),
              "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
              feedback: false,
              toggleMask: ""
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-row gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="phone"${_scopeId}>Phone Number</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "phone",
              placeholder: "+84 9698 886 660",
              modelValue: unref(phone),
              "onUpdate:modelValue": ($event) => isRef(phone) ? phone.value = $event : null,
              modelModifiers: { trim: true },
              integeronly: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="phoneVerified"${_scopeId}>Phone Verified</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "phoneVerified",
              placeholder: "+84 9698 886 660",
              modelValue: unref(phoneVerified),
              "onUpdate:modelValue": ($event) => isRef(phoneVerified) ? phoneVerified.value = $event : null,
              modelModifiers: { trim: true },
              integeronly: ""
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="type"${_scopeId}>User Role</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "type",
              class: "flex-1",
              placeholder: "Select User Role",
              modelValue: unref(type).value,
              "onUpdate:modelValue": ($event) => unref(type).value = $event,
              options: __props.roles,
              optionLabel: "name",
              optionValue: "value"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-col gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="email"${_scopeId}>Email</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "email",
              placeholder: "example@gmail.com",
              modelValue: unref(email),
              "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="emailVerified"${_scopeId}>Email Verified</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "emailVerified",
              placeholder: "example@gmail.com",
              modelValue: unref(emailVerified),
              "onUpdate:modelValue": ($event) => isRef(emailVerified) ? emailVerified.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-col gap-3"${_scopeId}><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="socialID"${_scopeId}>Social ID</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "socialID",
              placeholder: "https://www.facebook.com",
              modelValue: unref(socialID),
              "onUpdate:modelValue": ($event) => isRef(socialID) ? socialID.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-1 flex-col gap-2"${_scopeId}><label for="socialVerified"${_scopeId}>Social Verified</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "socialVerified",
              placeholder: "https://www.facebook.com",
              modelValue: unref(socialVerified),
              "onUpdate:modelValue": ($event) => isRef(socialVerified) ? socialVerified.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-row gap-3 justify-between"${_scopeId}><span class="text-xs text-gray-400"${_scopeId}> Created at: ${ssrInterpolate(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(createdAt)))}</span><span class="text-xs text-gray-400"${_scopeId}> Updated at: ${ssrInterpolate(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(updatedAt)))}</span></div></template>`);
          } else {
            return [
              createVNode("template", { class: "flex flex-col gap-3" }, [
                createVNode("div", { class: "flex flex-row gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "firstName" }, "First Name"),
                    createVNode(_component_InputText, {
                      id: "firstName",
                      placeholder: "First Name",
                      modelValue: unref(firstName),
                      "onUpdate:modelValue": ($event) => isRef(firstName) ? firstName.value = $event : null,
                      modelModifiers: { trim: true }
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "lastName" }, "Last Name"),
                    createVNode(_component_InputText, {
                      id: "lastName",
                      placeholder: "Last Name",
                      modelValue: unref(lastName),
                      "onUpdate:modelValue": ($event) => isRef(lastName) ? lastName.value = $event : null,
                      modelModifiers: { trim: true }
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-row gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "loginName" }, "Login Name"),
                    createVNode(_component_InputText, {
                      id: "loginName",
                      placeholder: "Login Name",
                      modelValue: unref(loginName),
                      "onUpdate:modelValue": ($event) => isRef(loginName) ? loginName.value = $event : null,
                      modelModifiers: { trim: true }
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "password" }, "Password"),
                    createVNode(_component_Password, {
                      id: "password",
                      placeholder: "Password",
                      modelValue: unref(password),
                      "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                      feedback: false,
                      toggleMask: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-row gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "phone" }, "Phone Number"),
                    createVNode(_component_InputText, {
                      id: "phone",
                      placeholder: "+84 9698 886 660",
                      modelValue: unref(phone),
                      "onUpdate:modelValue": ($event) => isRef(phone) ? phone.value = $event : null,
                      modelModifiers: { trim: true },
                      integeronly: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "phoneVerified" }, "Phone Verified"),
                    createVNode(_component_InputText, {
                      id: "phoneVerified",
                      placeholder: "+84 9698 886 660",
                      modelValue: unref(phoneVerified),
                      "onUpdate:modelValue": ($event) => isRef(phoneVerified) ? phoneVerified.value = $event : null,
                      modelModifiers: { trim: true },
                      integeronly: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                  createVNode("label", { for: "type" }, "User Role"),
                  createVNode(_component_Dropdown, {
                    id: "type",
                    class: "flex-1",
                    placeholder: "Select User Role",
                    modelValue: unref(type).value,
                    "onUpdate:modelValue": ($event) => unref(type).value = $event,
                    options: __props.roles,
                    optionLabel: "name",
                    optionValue: "value"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                ]),
                createVNode("div", { class: "flex flex-col gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "email" }, "Email"),
                    createVNode(_component_InputText, {
                      id: "email",
                      placeholder: "example@gmail.com",
                      modelValue: unref(email),
                      "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "emailVerified" }, "Email Verified"),
                    createVNode(_component_InputText, {
                      id: "emailVerified",
                      placeholder: "example@gmail.com",
                      modelValue: unref(emailVerified),
                      "onUpdate:modelValue": ($event) => isRef(emailVerified) ? emailVerified.value = $event : null
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-col gap-3" }, [
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "socialID" }, "Social ID"),
                    createVNode(_component_InputText, {
                      id: "socialID",
                      placeholder: "https://www.facebook.com",
                      modelValue: unref(socialID),
                      "onUpdate:modelValue": ($event) => isRef(socialID) ? socialID.value = $event : null
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-1 flex-col gap-2" }, [
                    createVNode("label", { for: "socialVerified" }, "Social Verified"),
                    createVNode(_component_InputText, {
                      id: "socialVerified",
                      placeholder: "https://www.facebook.com",
                      modelValue: unref(socialVerified),
                      "onUpdate:modelValue": ($event) => isRef(socialVerified) ? socialVerified.value = $event : null
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-row gap-3 justify-between" }, [
                  createVNode("span", { class: "text-xs text-gray-400" }, " Created at: " + toDisplayString(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(createdAt))), 1),
                  createVNode("span", { class: "text-xs text-gray-400" }, " Updated at: " + toDisplayString(("convertDateTime" in _ctx ? _ctx.convertDateTime : unref(convertDateTime))(unref(updatedAt))), 1)
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/users/EditUserDialog.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "DeleteUserDialog",
  __ssrInlineRender: true,
  props: ["visible"],
  setup(__props) {
    const { visible } = __props;
    const { currentUser } = storeToRefs(useUsersStore());
    const { deleteUser } = useUsersStore();
    const toast = useToast();
    const myVisible = ref(visible);
    const onDelete = async () => {
      const response = await deleteUser(currentUser.value);
      myVisible.value = false;
      if (response != null && response["result"] == "ok") {
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Delete User Successfully!",
          group: "bl",
          life: 3e3
        });
      } else {
        toast.add({
          severity: "danger",
          summary: "Error",
          detail: "Failed to Delete User",
          group: "bl",
          life: 3e3
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script$8;
      const _component_Button = script$4;
      _push(ssrRenderComponent(_component_Dialog, mergeProps({
        visible: unref(myVisible),
        "onUpdate:visible": ($event) => isRef(myVisible) ? myVisible.value = $event : null,
        modal: "",
        maximizable: "",
        header: "Header",
        style: { width: "50rem" },
        breakpoints: { "1199px": "75vw", "575px": "90vw" }
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="inline-flex items-center justify-center gap-2"${_scopeId}><span class="font-bold text-xl"${_scopeId}>Delete User?</span></div>`);
          } else {
            return [
              createVNode("div", { class: "inline-flex items-center justify-center gap-2" }, [
                createVNode("span", { class: "font-bold text-xl" }, "Delete User?")
              ])
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Button, {
              type: "button",
              label: "Cancel",
              text: "",
              severity: "secondary",
              onClick: ($event) => myVisible.value = false
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Button, {
              type: "submit",
              label: "Yes, delete",
              severity: "danger",
              onClick: onDelete
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Button, {
                type: "button",
                label: "Cancel",
                text: "",
                severity: "secondary",
                onClick: ($event) => myVisible.value = false
              }, null, 8, ["onClick"]),
              createVNode(_component_Button, {
                type: "submit",
                label: "Yes, delete",
                severity: "danger",
                onClick: onDelete
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}><span${_scopeId}> This will delete user <b${_scopeId}>${ssrInterpolate(`${unref(currentUser)["first_name"]} ${unref(currentUser)["last_name"]}`)}</b> permanently! </span><span${_scopeId}>You cannot undo this action!</span></div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode("span", null, [
                  createTextVNode(" This will delete user "),
                  createVNode("b", null, toDisplayString(`${unref(currentUser)["first_name"]} ${unref(currentUser)["last_name"]}`), 1),
                  createTextVNode(" permanently! ")
                ]),
                createVNode("span", null, "You cannot undo this action!")
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/users/DeleteUserDialog.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { users, currentUser } = storeToRefs(useUsersStore());
    const { getUsers } = useUsersStore();
    [__temp, __restore] = withAsyncContext(() => getUsers()), await __temp, __restore();
    const user = ref({});
    const userPermissionForActions = user.value["type"] == "admin" || user.value["type"] == "super_admin" || user.value["type"] == "sale_manager" ? true : false;
    const roles = ref([
      { name: "Anonymous", value: "anonymous" },
      { name: "Sale", value: "sale" },
      { name: "Sale Manager", value: "sale_manager" },
      { name: "Admin", value: "admin" },
      { name: "Super Admin", value: "super_admin" }
    ]);
    const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    const viewDetailsUserDialogVisible = ref(false);
    const createUserDialogVisible = ref(false);
    const editUserDialogVisible = ref(false);
    const deleteUserDialogVisible = ref(false);
    const viewDetailsUser = (data) => {
      currentUser.value = data;
      viewDetailsUserDialogVisible.value = !viewDetailsUserDialogVisible.value;
    };
    const editUser = (data) => {
      currentUser.value = data;
      editUserDialogVisible.value = !editUserDialogVisible.value;
    };
    const deleteUser = async (data) => {
      currentUser.value = data;
      deleteUserDialogVisible.value = !deleteUserDialogVisible.value;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Tag = script;
      const _component_IconField = script$1;
      const _component_InputIcon = script$2;
      const _component_Icon = __nuxt_component_1;
      const _component_InputText = script$3;
      const _component_Button = script$4;
      const _component_DataTable = script$5;
      const _component_Column = script$6;
      const _component_Avatar = script$7;
      const _component_ViewDetailsUserDialog = _sfc_main$4;
      const _component_CreateUserDialog = _sfc_main$3;
      const _component_EditUserDialog = _sfc_main$2;
      const _component_DeleteUserDialog = _sfc_main$1;
      const _directive_auto_animate = resolveDirective("auto-animate");
      _push(`<!--[--><div class="w-full h-full flex flex-col"><div class="fixed right-0 top-0 z-50 backdrop-blur-xl w-5/6 h-[8%] px-4 border-b flex justify-between items-center"><div class="flex items-center gap-2"><span class="font-semibold text-lg">Users</span>`);
      _push(ssrRenderComponent(_component_Tag, {
        value: unref(users).length
      }, null, _parent));
      _push(`</div><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_IconField, { iconPosition: "left" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_InputIcon, { class: "flex items-center" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, { name: "mdi:filter-outline" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Icon, { name: "mdi:filter-outline" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_InputText, {
              modelValue: unref(filters)["global"].value,
              "onUpdate:modelValue": ($event) => unref(filters)["global"].value = $event,
              placeholder: "Filter User..."
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_InputIcon, { class: "flex items-center" }, {
                default: withCtx(() => [
                  createVNode(_component_Icon, { name: "mdi:filter-outline" })
                ]),
                _: 1
              }),
              createVNode(_component_InputText, {
                modelValue: unref(filters)["global"].value,
                "onUpdate:modelValue": ($event) => unref(filters)["global"].value = $event,
                placeholder: "Filter User..."
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(userPermissionForActions)) {
        _push(ssrRenderComponent(_component_Button, {
          size: "small",
          label: "New",
          onClick: ($event) => createUserDialogVisible.value = !unref(createUserDialogVisible)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="absolute top-[8%] w-full h-[92%]">`);
      _push(ssrRenderComponent(_component_DataTable, mergeProps({
        value: unref(users),
        filters: unref(filters),
        "onUpdate:filters": ($event) => isRef(filters) ? filters.value = $event : null,
        paginator: true,
        rows: 50,
        rowsPerPageOptions: [5, 10, 20, 50],
        scrollable: "",
        scrollHeight: "flex",
        removableSort: ""
      }, ssrGetDirectiveProps(_ctx, _directive_auto_animate)), {
        empty: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-center items-center"${_scopeId}><span${_scopeId}>No Users Found.</span></div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-center items-center" }, [
                createVNode("span", null, "No Users Found.")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Column, {
              field: "fullname",
              header: "Full Name"
            }, {
              body: withCtx(({ data }, _push3, _parent3, _scopeId2) => {
                var _a, _b;
                if (_push3) {
                  _push3(`<div class="flex items-center gap-3"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Avatar, {
                    label: (_a = data["first_name"]) == null ? void 0 : _a.substring(0, 3),
                    shape: "square"
                  }, null, _parent3, _scopeId2));
                  _push3(`<div class="flex flex-col"${_scopeId2}><span class="font-semibold"${_scopeId2}>${ssrInterpolate(`${data["first_name"]} ${data["last_name"]}`)}</span><span${_scopeId2}>${ssrInterpolate(data["email"])}</span></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center gap-3" }, [
                      createVNode(_component_Avatar, {
                        label: (_b = data["first_name"]) == null ? void 0 : _b.substring(0, 3),
                        shape: "square"
                      }, null, 8, ["label"]),
                      createVNode("div", { class: "flex flex-col" }, [
                        createVNode("span", { class: "font-semibold" }, toDisplayString(`${data["first_name"]} ${data["last_name"]}`), 1),
                        createVNode("span", null, toDisplayString(data["email"]), 1)
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Column, {
              field: "login_name",
              header: "Login Name",
              sortable: ""
            }, {
              body: withCtx(({ data }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(data["login_name"])}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(data["login_name"]), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Column, {
              field: "phone",
              header: "Phone",
              sortable: ""
            }, {
              body: withCtx(({ data }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(data["phone"])}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(data["phone"]), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Column, {
              field: "type",
              header: "Role",
              sortable: "",
              sortField: "type",
              filterField: "type",
              showFilterMatchModes: false
            }, {
              body: withCtx(({ data }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(("capitalize" in _ctx ? _ctx.capitalize : unref(capitalize))(data["type"]))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(("capitalize" in _ctx ? _ctx.capitalize : unref(capitalize))(data["type"])), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Column, { header: "Actions" }, {
              body: withCtx(({ data }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Button, {
                    text: "",
                    severity: "secondary",
                    onClick: ($event) => viewDetailsUser(data)
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Icon, { name: "mdi:eye-outline" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_Icon, { name: "mdi:eye-outline" })
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  if (unref(userPermissionForActions)) {
                    _push3(ssrRenderComponent(_component_Button, {
                      text: "",
                      severity: "secondary",
                      onClick: ($event) => editUser(data)
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_Icon, { name: "mdi:edit-outline" }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_Icon, { name: "mdi:edit-outline" })
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(userPermissionForActions)) {
                    _push3(ssrRenderComponent(_component_Button, {
                      text: "",
                      severity: "danger",
                      onClick: ($event) => deleteUser(data)
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_Icon, { name: "mdi:delete-outline" }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_Icon, { name: "mdi:delete-outline" })
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(_component_Button, {
                      text: "",
                      severity: "secondary",
                      onClick: ($event) => viewDetailsUser(data)
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, { name: "mdi:eye-outline" })
                      ]),
                      _: 2
                    }, 1032, ["onClick"]),
                    unref(userPermissionForActions) ? (openBlock(), createBlock(_component_Button, {
                      key: 0,
                      text: "",
                      severity: "secondary",
                      onClick: ($event) => editUser(data)
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, { name: "mdi:edit-outline" })
                      ]),
                      _: 2
                    }, 1032, ["onClick"])) : createCommentVNode("", true),
                    unref(userPermissionForActions) ? (openBlock(), createBlock(_component_Button, {
                      key: 1,
                      text: "",
                      severity: "danger",
                      onClick: ($event) => deleteUser(data)
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, { name: "mdi:delete-outline" })
                      ]),
                      _: 2
                    }, 1032, ["onClick"])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Column, {
                field: "fullname",
                header: "Full Name"
              }, {
                body: withCtx(({ data }) => {
                  var _a;
                  return [
                    createVNode("div", { class: "flex items-center gap-3" }, [
                      createVNode(_component_Avatar, {
                        label: (_a = data["first_name"]) == null ? void 0 : _a.substring(0, 3),
                        shape: "square"
                      }, null, 8, ["label"]),
                      createVNode("div", { class: "flex flex-col" }, [
                        createVNode("span", { class: "font-semibold" }, toDisplayString(`${data["first_name"]} ${data["last_name"]}`), 1),
                        createVNode("span", null, toDisplayString(data["email"]), 1)
                      ])
                    ])
                  ];
                }),
                _: 1
              }),
              createVNode(_component_Column, {
                field: "login_name",
                header: "Login Name",
                sortable: ""
              }, {
                body: withCtx(({ data }) => [
                  createTextVNode(toDisplayString(data["login_name"]), 1)
                ]),
                _: 1
              }),
              createVNode(_component_Column, {
                field: "phone",
                header: "Phone",
                sortable: ""
              }, {
                body: withCtx(({ data }) => [
                  createTextVNode(toDisplayString(data["phone"]), 1)
                ]),
                _: 1
              }),
              createVNode(_component_Column, {
                field: "type",
                header: "Role",
                sortable: "",
                sortField: "type",
                filterField: "type",
                showFilterMatchModes: false
              }, {
                body: withCtx(({ data }) => [
                  createTextVNode(toDisplayString(("capitalize" in _ctx ? _ctx.capitalize : unref(capitalize))(data["type"])), 1)
                ]),
                _: 1
              }),
              createVNode(_component_Column, { header: "Actions" }, {
                body: withCtx(({ data }) => [
                  createVNode(_component_Button, {
                    text: "",
                    severity: "secondary",
                    onClick: ($event) => viewDetailsUser(data)
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, { name: "mdi:eye-outline" })
                    ]),
                    _: 2
                  }, 1032, ["onClick"]),
                  unref(userPermissionForActions) ? (openBlock(), createBlock(_component_Button, {
                    key: 0,
                    text: "",
                    severity: "secondary",
                    onClick: ($event) => editUser(data)
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, { name: "mdi:edit-outline" })
                    ]),
                    _: 2
                  }, 1032, ["onClick"])) : createCommentVNode("", true),
                  unref(userPermissionForActions) ? (openBlock(), createBlock(_component_Button, {
                    key: 1,
                    text: "",
                    severity: "danger",
                    onClick: ($event) => deleteUser(data)
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, { name: "mdi:delete-outline" })
                    ]),
                    _: 2
                  }, 1032, ["onClick"])) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      if (unref(viewDetailsUserDialogVisible)) {
        _push(ssrRenderComponent(_component_ViewDetailsUserDialog, {
          visible: unref(viewDetailsUserDialogVisible),
          roles: unref(roles)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(createUserDialogVisible)) {
        _push(ssrRenderComponent(_component_CreateUserDialog, {
          visible: unref(createUserDialogVisible),
          roles: unref(roles)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(editUserDialogVisible)) {
        _push(ssrRenderComponent(_component_EditUserDialog, {
          visible: unref(editUserDialogVisible),
          roles: unref(roles)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(deleteUserDialogVisible)) {
        _push(ssrRenderComponent(_component_DeleteUserDialog, { visible: unref(deleteUserDialogVisible) }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/users/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DrrFC80d.mjs.map
