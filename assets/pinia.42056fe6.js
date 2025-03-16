import{e as r,r as l,m as p}from"./index.c893d867.js";var u=!1;/*!
 * pinia v2.2.8
 * (c) 2024 Eduardo San Martin Morote
 * @license MIT
 */const f=Symbol();var c;(function(t){t.direct="direct",t.patchObject="patch object",t.patchFunction="patch function"})(c||(c={}));function h(){const t=r(!0),i=t.run(()=>l({}));let n=[],s=[];const a=p({install(e){a._a=e,e.provide(f,a),e.config.globalProperties.$pinia=a,s.forEach(o=>n.push(o)),s=[]},use(e){return!this._a&&!u?s.push(e):n.push(e),this},_p:n,_a:null,_e:t,_s:new Map,state:i});return a}var _=({app:t})=>{const i=h();t.use(i)};export{_ as default};
