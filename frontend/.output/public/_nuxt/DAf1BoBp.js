import{s as t}from"./BvNob-ru.js";import{W as n,o as r,c as a,a4 as o,a3 as c}from"./DaYTUSRu.js";var p={root:"p-input-icon"},i=n.extend({name:"inputicon",classes:p}),l={name:"BaseInputIcon",extends:t,style:i,props:{class:null},provide:function(){return{$parentInstance:this}}},u={name:"InputIcon",extends:l,inheritAttrs:!1,computed:{containerClass:function(){return[this.cx("root"),this.class]}}};function d(e,m,f,I,$,s){return r(),a("span",c({class:s.containerClass},e.ptmi("root")),[o(e.$slots,"default")],16)}u.render=d;export{u as default};