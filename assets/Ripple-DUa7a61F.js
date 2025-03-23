import { b as computed, a as createComponent, h, B as withDirectives, ac as unref, g as getCurrentInstance, q as createDirective, t as cleanEvt, v as addEvt, G as isKeyCode, z as stop, x as position } from "./index-CFDbAO6J.js";
const useSizeDefaults = {
  xs: 18,
  sm: 24,
  md: 32,
  lg: 38,
  xl: 46
};
const useSizeProps = {
  size: String
};
function useSize(props, sizes = useSizeDefaults) {
  return computed(() => props.size !== void 0 ? { fontSize: props.size in sizes ? `${sizes[props.size]}px` : props.size } : null);
}
const useSpinnerProps = {
  size: {
    type: [String, Number],
    default: "1em"
  },
  color: String
};
function useSpinner(props) {
  return {
    cSize: computed(() => props.size in useSizeDefaults ? `${useSizeDefaults[props.size]}px` : props.size),
    classes: computed(
      () => "q-spinner" + (props.color ? ` text-${props.color}` : "")
    )
  };
}
const QSpinner = createComponent({
  name: "QSpinner",
  props: {
    ...useSpinnerProps,
    thickness: {
      type: Number,
      default: 5
    }
  },
  setup(props) {
    const { cSize, classes } = useSpinner(props);
    return () => h("svg", {
      class: classes.value + " q-spinner-mat",
      width: cSize.value,
      height: cSize.value,
      viewBox: "25 25 50 50"
    }, [
      h("circle", {
        class: "path",
        cx: "50",
        cy: "50",
        r: "20",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": props.thickness,
        "stroke-miterlimit": "10"
      })
    ]);
  }
});
function hSlot(slot, otherwise) {
  return slot !== void 0 ? slot() || otherwise : otherwise;
}
function hUniqueSlot(slot, otherwise) {
  if (slot !== void 0) {
    const vnode = slot();
    if (vnode !== void 0 && vnode !== null) {
      return vnode.slice();
    }
  }
  return otherwise;
}
function hMergeSlot(slot, source) {
  return slot !== void 0 ? source.concat(slot()) : source;
}
function hMergeSlotSafely(slot, source) {
  if (slot === void 0) {
    return source;
  }
  return source !== void 0 ? source.concat(slot()) : slot();
}
function hDir(tag, data, children, key, condition, getDirsFn) {
  data.key = key + condition;
  const vnode = h(tag, data, children);
  return condition === true ? withDirectives(vnode, getDirsFn()) : vnode;
}
function getParentProxy(proxy) {
  if (Object(proxy.$parent) === proxy.$parent) {
    return proxy.$parent;
  }
  let { parent } = proxy.$;
  while (Object(parent) === parent) {
    if (Object(parent.proxy) === parent.proxy) {
      return parent.proxy;
    }
    parent = parent.parent;
  }
}
function vmHasRouter(vm) {
  return vm.appContext.config.globalProperties.$router !== void 0;
}
function vmIsDestroyed(vm) {
  return vm.isUnmounted === true || vm.isDeactivated === true;
}
function css(element, css2) {
  const style = element.style;
  for (const prop in css2) {
    style[prop] = css2[prop];
  }
}
function getElement(el) {
  if (el === void 0 || el === null) {
    return void 0;
  }
  if (typeof el === "string") {
    try {
      return document.querySelector(el) || void 0;
    } catch (err) {
      return void 0;
    }
  }
  const target = unref(el);
  if (target) {
    return target.$el || target;
  }
}
function childHasFocus(el, focusedEl) {
  if (el === void 0 || el === null || el.contains(focusedEl) === true) {
    return true;
  }
  for (let next = el.nextElementSibling; next !== null; next = next.nextElementSibling) {
    if (next.contains(focusedEl)) {
      return true;
    }
  }
  return false;
}
const defaultViewBox = "0 0 24 24";
const sameFn = (i) => i;
const ionFn = (i) => `ionicons ${i}`;
const libMap = {
  "mdi-": (i) => `mdi ${i}`,
  "icon-": sameFn,
  // fontawesome equiv
  "bt-": (i) => `bt ${i}`,
  "eva-": (i) => `eva ${i}`,
  "ion-md": ionFn,
  "ion-ios": ionFn,
  "ion-logo": ionFn,
  "iconfont ": sameFn,
  "ti-": (i) => `themify-icon ${i}`,
  "bi-": (i) => `bootstrap-icons ${i}`,
  "i-": sameFn
  // UnoCSS pure icons
};
const matMap = {
  o_: "-outlined",
  r_: "-round",
  s_: "-sharp"
};
const symMap = {
  sym_o_: "-outlined",
  sym_r_: "-rounded",
  sym_s_: "-sharp"
};
const libRE = new RegExp("^(" + Object.keys(libMap).join("|") + ")");
const matRE = new RegExp("^(" + Object.keys(matMap).join("|") + ")");
const symRE = new RegExp("^(" + Object.keys(symMap).join("|") + ")");
const mRE = /^[Mm]\s?[-+]?\.?\d/;
const imgRE = /^img:/;
const svgUseRE = /^svguse:/;
const ionRE = /^ion-/;
const faRE = /^(fa-(classic|sharp|solid|regular|light|brands|duotone|thin)|[lf]a[srlbdk]?) /;
const QIcon = createComponent({
  name: "QIcon",
  props: {
    ...useSizeProps,
    tag: {
      type: String,
      default: "i"
    },
    name: String,
    color: String,
    left: Boolean,
    right: Boolean
  },
  setup(props, { slots }) {
    const { proxy: { $q } } = getCurrentInstance();
    const sizeStyle = useSize(props);
    const classes = computed(
      () => "q-icon" + (props.left === true ? " on-left" : "") + (props.right === true ? " on-right" : "") + (props.color !== void 0 ? ` text-${props.color}` : "")
    );
    const type = computed(() => {
      let cls;
      let icon = props.name;
      if (icon === "none" || !icon) {
        return { none: true };
      }
      if ($q.iconMapFn !== null) {
        const res = $q.iconMapFn(icon);
        if (res !== void 0) {
          if (res.icon !== void 0) {
            icon = res.icon;
            if (icon === "none" || !icon) {
              return { none: true };
            }
          } else {
            return {
              cls: res.cls,
              content: res.content !== void 0 ? res.content : " "
            };
          }
        }
      }
      if (mRE.test(icon) === true) {
        const [def, viewBox = defaultViewBox] = icon.split("|");
        return {
          svg: true,
          viewBox,
          nodes: def.split("&&").map((path) => {
            const [d, style, transform] = path.split("@@");
            return h("path", { style, d, transform });
          })
        };
      }
      if (imgRE.test(icon) === true) {
        return {
          img: true,
          src: icon.substring(4)
        };
      }
      if (svgUseRE.test(icon) === true) {
        const [def, viewBox = defaultViewBox] = icon.split("|");
        return {
          svguse: true,
          src: def.substring(7),
          viewBox
        };
      }
      let content = " ";
      const matches = icon.match(libRE);
      if (matches !== null) {
        cls = libMap[matches[1]](icon);
      } else if (faRE.test(icon) === true) {
        cls = icon;
      } else if (ionRE.test(icon) === true) {
        cls = `ionicons ion-${$q.platform.is.ios === true ? "ios" : "md"}${icon.substring(3)}`;
      } else if (symRE.test(icon) === true) {
        cls = "notranslate material-symbols";
        const matches2 = icon.match(symRE);
        if (matches2 !== null) {
          icon = icon.substring(6);
          cls += symMap[matches2[1]];
        }
        content = icon;
      } else {
        cls = "notranslate material-icons";
        const matches2 = icon.match(matRE);
        if (matches2 !== null) {
          icon = icon.substring(2);
          cls += matMap[matches2[1]];
        }
        content = icon;
      }
      return {
        cls,
        content
      };
    });
    return () => {
      const data = {
        class: classes.value,
        style: sizeStyle.value,
        "aria-hidden": "true"
      };
      if (type.value.none === true) {
        return h(props.tag, data, hSlot(slots.default));
      }
      if (type.value.img === true) {
        return h(props.tag, data, hMergeSlot(slots.default, [
          h("img", { src: type.value.src })
        ]));
      }
      if (type.value.svg === true) {
        return h(props.tag, data, hMergeSlot(slots.default, [
          h("svg", {
            viewBox: type.value.viewBox || "0 0 24 24"
          }, type.value.nodes)
        ]));
      }
      if (type.value.svguse === true) {
        return h(props.tag, data, hMergeSlot(slots.default, [
          h("svg", {
            viewBox: type.value.viewBox
          }, [
            h("use", { "xlink:href": type.value.src })
          ])
        ]));
      }
      if (type.value.cls !== void 0) {
        data.class += " " + type.value.cls;
      }
      return h(props.tag, data, hMergeSlot(slots.default, [
        type.value.content
      ]));
    };
  }
});
function getOriginalPath(record) {
  return record ? record.aliasOf ? record.aliasOf.path : record.path : "";
}
function isSameRouteRecord(a, b) {
  return (a.aliasOf || a) === (b.aliasOf || b);
}
function includesParams(outer, inner) {
  for (const key in inner) {
    const innerValue = inner[key], outerValue = outer[key];
    if (typeof innerValue === "string") {
      if (innerValue !== outerValue) {
        return false;
      }
    } else if (Array.isArray(outerValue) === false || outerValue.length !== innerValue.length || innerValue.some((value, i) => value !== outerValue[i])) {
      return false;
    }
  }
  return true;
}
function isEquivalentArray(a, b) {
  return Array.isArray(b) === true ? a.length === b.length && a.every((value, i) => value === b[i]) : a.length === 1 && a[0] === b;
}
function isSameRouteLocationParamsValue(a, b) {
  return Array.isArray(a) === true ? isEquivalentArray(a, b) : Array.isArray(b) === true ? isEquivalentArray(b, a) : a === b;
}
function isSameRouteLocationParams(a, b) {
  if (Object.keys(a).length !== Object.keys(b).length) {
    return false;
  }
  for (const key in a) {
    if (isSameRouteLocationParamsValue(a[key], b[key]) === false) {
      return false;
    }
  }
  return true;
}
const useRouterLinkNonMatchingProps = {
  // router-link
  to: [String, Object],
  replace: Boolean,
  // regular <a> link
  href: String,
  target: String,
  // state
  disable: Boolean
};
const useRouterLinkProps = {
  ...useRouterLinkNonMatchingProps,
  // router-link
  exact: Boolean,
  activeClass: {
    type: String,
    default: "q-router-link--active"
  },
  exactActiveClass: {
    type: String,
    default: "q-router-link--exact-active"
  }
};
function useRouterLink({ fallbackTag, useDisableForRouterLinkProps = true } = {}) {
  const vm = getCurrentInstance();
  const { props, proxy, emit } = vm;
  const hasRouter = vmHasRouter(vm);
  const hasHrefLink = computed(() => props.disable !== true && props.href !== void 0);
  const hasRouterLinkProps = useDisableForRouterLinkProps === true ? computed(
    () => hasRouter === true && props.disable !== true && hasHrefLink.value !== true && props.to !== void 0 && props.to !== null && props.to !== ""
  ) : computed(
    () => hasRouter === true && hasHrefLink.value !== true && props.to !== void 0 && props.to !== null && props.to !== ""
  );
  const resolvedLink = computed(() => hasRouterLinkProps.value === true ? getLink(props.to) : null);
  const hasRouterLink = computed(() => resolvedLink.value !== null);
  const hasLink = computed(() => hasHrefLink.value === true || hasRouterLink.value === true);
  const linkTag = computed(() => props.type === "a" || hasLink.value === true ? "a" : props.tag || fallbackTag || "div");
  const linkAttrs = computed(() => hasHrefLink.value === true ? {
    href: props.href,
    target: props.target
  } : hasRouterLink.value === true ? {
    href: resolvedLink.value.href,
    target: props.target
  } : {});
  const linkActiveIndex = computed(() => {
    if (hasRouterLink.value === false) {
      return -1;
    }
    const { matched } = resolvedLink.value, { length } = matched, routeMatched = matched[length - 1];
    if (routeMatched === void 0) {
      return -1;
    }
    const currentMatched = proxy.$route.matched;
    if (currentMatched.length === 0) {
      return -1;
    }
    const index = currentMatched.findIndex(
      isSameRouteRecord.bind(null, routeMatched)
    );
    if (index !== -1) {
      return index;
    }
    const parentRecordPath = getOriginalPath(matched[length - 2]);
    return (
      // we are dealing with nested routes
      length > 1 && getOriginalPath(routeMatched) === parentRecordPath && currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(
        isSameRouteRecord.bind(null, matched[length - 2])
      ) : index
    );
  });
  const linkIsActive = computed(
    () => hasRouterLink.value === true && linkActiveIndex.value !== -1 && includesParams(proxy.$route.params, resolvedLink.value.params)
  );
  const linkIsExactActive = computed(
    () => linkIsActive.value === true && linkActiveIndex.value === proxy.$route.matched.length - 1 && isSameRouteLocationParams(proxy.$route.params, resolvedLink.value.params)
  );
  const linkClass = computed(() => hasRouterLink.value === true ? linkIsExactActive.value === true ? ` ${props.exactActiveClass} ${props.activeClass}` : props.exact === true ? "" : linkIsActive.value === true ? ` ${props.activeClass}` : "" : "");
  function getLink(to) {
    try {
      return proxy.$router.resolve(to);
    } catch (_) {
    }
    return null;
  }
  function navigateToRouterLink(e, { returnRouterError, to = props.to, replace = props.replace } = {}) {
    if (props.disable === true) {
      e.preventDefault();
      return Promise.resolve(false);
    }
    if (
      // don't redirect with control keys;
      // should match RouterLink from Vue Router
      e.metaKey || e.altKey || e.ctrlKey || e.shiftKey || e.button !== void 0 && e.button !== 0 || props.target === "_blank"
    ) {
      return Promise.resolve(false);
    }
    e.preventDefault();
    const promise = proxy.$router[replace === true ? "replace" : "push"](to);
    return returnRouterError === true ? promise : promise.then(() => {
    }).catch(() => {
    });
  }
  function navigateOnClick(e) {
    if (hasRouterLink.value === true) {
      const go = (opts) => navigateToRouterLink(e, opts);
      emit("click", e, go);
      e.defaultPrevented !== true && go();
    } else {
      emit("click", e);
    }
  }
  return {
    hasRouterLink,
    hasHrefLink,
    hasLink,
    linkTag,
    resolvedLink,
    linkIsActive,
    linkIsExactActive,
    linkClass,
    linkAttrs,
    getLink,
    navigateToRouterLink,
    navigateOnClick
  };
}
function throttle(fn, limit = 250) {
  let wait = false, result;
  return function() {
    if (wait === false) {
      wait = true;
      setTimeout(() => {
        wait = false;
      }, limit);
      result = fn.apply(this, arguments);
    }
    return result;
  };
}
function showRipple(evt, el, ctx, forceCenter) {
  ctx.modifiers.stop === true && stop(evt);
  const color = ctx.modifiers.color;
  let center = ctx.modifiers.center;
  center = center === true || forceCenter === true;
  const node = document.createElement("span"), innerNode = document.createElement("span"), pos = position(evt), { left, top, width, height } = el.getBoundingClientRect(), diameter = Math.sqrt(width * width + height * height), radius = diameter / 2, centerX = `${(width - diameter) / 2}px`, x = center ? centerX : `${pos.left - left - radius}px`, centerY = `${(height - diameter) / 2}px`, y = center ? centerY : `${pos.top - top - radius}px`;
  innerNode.className = "q-ripple__inner";
  css(innerNode, {
    height: `${diameter}px`,
    width: `${diameter}px`,
    transform: `translate3d(${x},${y},0) scale3d(.2,.2,1)`,
    opacity: 0
  });
  node.className = `q-ripple${color ? " text-" + color : ""}`;
  node.setAttribute("dir", "ltr");
  node.appendChild(innerNode);
  el.appendChild(node);
  const abort = () => {
    node.remove();
    clearTimeout(timer);
  };
  ctx.abort.push(abort);
  let timer = setTimeout(() => {
    innerNode.classList.add("q-ripple__inner--enter");
    innerNode.style.transform = `translate3d(${centerX},${centerY},0) scale3d(1,1,1)`;
    innerNode.style.opacity = 0.2;
    timer = setTimeout(() => {
      innerNode.classList.remove("q-ripple__inner--enter");
      innerNode.classList.add("q-ripple__inner--leave");
      innerNode.style.opacity = 0;
      timer = setTimeout(() => {
        node.remove();
        ctx.abort.splice(ctx.abort.indexOf(abort), 1);
      }, 275);
    }, 250);
  }, 50);
}
function updateModifiers(ctx, { modifiers, value, arg }) {
  const cfg = Object.assign({}, ctx.cfg.ripple, modifiers, value);
  ctx.modifiers = {
    early: cfg.early === true,
    stop: cfg.stop === true,
    center: cfg.center === true,
    color: cfg.color || arg,
    keyCodes: [].concat(cfg.keyCodes || 13)
  };
}
const Ripple = createDirective(
  {
    name: "ripple",
    beforeMount(el, binding) {
      const cfg = binding.instance.$.appContext.config.globalProperties.$q.config || {};
      if (cfg.ripple === false) return;
      const ctx = {
        cfg,
        enabled: binding.value !== false,
        modifiers: {},
        abort: [],
        start(evt) {
          if (ctx.enabled === true && evt.qSkipRipple !== true && evt.type === (ctx.modifiers.early === true ? "pointerdown" : "click")) {
            showRipple(evt, el, ctx, evt.qKeyEvent === true);
          }
        },
        keystart: throttle((evt) => {
          if (ctx.enabled === true && evt.qSkipRipple !== true && isKeyCode(evt, ctx.modifiers.keyCodes) === true && evt.type === `key${ctx.modifiers.early === true ? "down" : "up"}`) {
            showRipple(evt, el, ctx, true);
          }
        }, 300)
      };
      updateModifiers(ctx, binding);
      el.__qripple = ctx;
      addEvt(ctx, "main", [
        [el, "pointerdown", "start", "passive"],
        [el, "click", "start", "passive"],
        [el, "keydown", "keystart", "passive"],
        [el, "keyup", "keystart", "passive"]
      ]);
    },
    updated(el, binding) {
      if (binding.oldValue !== binding.value) {
        const ctx = el.__qripple;
        if (ctx !== void 0) {
          ctx.enabled = binding.value !== false;
          if (ctx.enabled === true && Object(binding.value) === binding.value) {
            updateModifiers(ctx, binding);
          }
        }
      }
    },
    beforeUnmount(el) {
      const ctx = el.__qripple;
      if (ctx !== void 0) {
        ctx.abort.forEach((fn) => {
          fn();
        });
        cleanEvt(ctx, "main");
        delete el._qripple;
      }
    }
  }
);
export {
  QIcon as Q,
  Ripple as R,
  hMergeSlot as a,
  hDir as b,
  css as c,
  useRouterLink as d,
  hUniqueSlot as e,
  QSpinner as f,
  getElement as g,
  hSlot as h,
  useSizeProps as i,
  useSize as j,
  hMergeSlotSafely as k,
  getParentProxy as l,
  vmIsDestroyed as m,
  childHasFocus as n,
  useRouterLinkNonMatchingProps as o,
  useRouterLinkProps as u,
  vmHasRouter as v
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmlwcGxlLURVYTdhNjFGLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1zaXplL3VzZS1zaXplLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9zcGlubmVyL3VzZS1zcGlubmVyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9zcGlubmVyL1FTcGlubmVyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvcHJpdmF0ZS5yZW5kZXIvcmVuZGVyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvcHJpdmF0ZS52bS92bS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL2RvbS9kb20uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2ljb24vUUljb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1yb3V0ZXItbGluay91c2Utcm91dGVyLWxpbmsuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy90aHJvdHRsZS90aHJvdHRsZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2RpcmVjdGl2ZXMvcmlwcGxlL1JpcHBsZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuZXhwb3J0IGNvbnN0IHVzZVNpemVEZWZhdWx0cyA9IHtcbiAgeHM6IDE4LFxuICBzbTogMjQsXG4gIG1kOiAzMixcbiAgbGc6IDM4LFxuICB4bDogNDZcbn1cblxuZXhwb3J0IGNvbnN0IHVzZVNpemVQcm9wcyA9IHtcbiAgc2l6ZTogU3RyaW5nXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgc2l6ZXMgPSB1c2VTaXplRGVmYXVsdHMpIHtcbiAgLy8gcmV0dXJuIHNpemVTdHlsZVxuICByZXR1cm4gY29tcHV0ZWQoKCkgPT4gKFxuICAgIHByb3BzLnNpemUgIT09IHZvaWQgMFxuICAgICAgPyB7IGZvbnRTaXplOiBwcm9wcy5zaXplIGluIHNpemVzID8gYCR7IHNpemVzWyBwcm9wcy5zaXplIF0gfXB4YCA6IHByb3BzLnNpemUgfVxuICAgICAgOiBudWxsXG4gICkpXG59XG4iLCJpbXBvcnQgeyBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcbmltcG9ydCB7IHVzZVNpemVEZWZhdWx0cyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLXNpemUvdXNlLXNpemUuanMnXG5cbmV4cG9ydCBjb25zdCB1c2VTcGlubmVyUHJvcHMgPSB7XG4gIHNpemU6IHtcbiAgICB0eXBlOiBbIFN0cmluZywgTnVtYmVyIF0sXG4gICAgZGVmYXVsdDogJzFlbSdcbiAgfSxcbiAgY29sb3I6IFN0cmluZ1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1c2VTcGlubmVyIChwcm9wcykge1xuICByZXR1cm4ge1xuICAgIGNTaXplOiBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5zaXplIGluIHVzZVNpemVEZWZhdWx0c1xuICAgICAgICA/IGAkeyB1c2VTaXplRGVmYXVsdHNbIHByb3BzLnNpemUgXSB9cHhgXG4gICAgICAgIDogcHJvcHMuc2l6ZVxuICAgICkpLFxuXG4gICAgY2xhc3NlczogY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLXNwaW5uZXInICsgKHByb3BzLmNvbG9yID8gYCB0ZXh0LSR7IHByb3BzLmNvbG9yIH1gIDogJycpXG4gICAgKVxuICB9XG59XG4iLCJpbXBvcnQgeyBoIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlU3Bpbm5lciwgeyB1c2VTcGlubmVyUHJvcHMgfSBmcm9tICcuL3VzZS1zcGlubmVyLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRU3Bpbm5lcicsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VTcGlubmVyUHJvcHMsXG5cbiAgICB0aGlja25lc3M6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIGRlZmF1bHQ6IDVcbiAgICB9XG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzKSB7XG4gICAgY29uc3QgeyBjU2l6ZSwgY2xhc3NlcyB9ID0gdXNlU3Bpbm5lcihwcm9wcylcblxuICAgIHJldHVybiAoKSA9PiBoKCdzdmcnLCB7XG4gICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSArICcgcS1zcGlubmVyLW1hdCcsXG4gICAgICB3aWR0aDogY1NpemUudmFsdWUsXG4gICAgICBoZWlnaHQ6IGNTaXplLnZhbHVlLFxuICAgICAgdmlld0JveDogJzI1IDI1IDUwIDUwJ1xuICAgIH0sIFtcbiAgICAgIGgoJ2NpcmNsZScsIHtcbiAgICAgICAgY2xhc3M6ICdwYXRoJyxcbiAgICAgICAgY3g6ICc1MCcsXG4gICAgICAgIGN5OiAnNTAnLFxuICAgICAgICByOiAnMjAnLFxuICAgICAgICBmaWxsOiAnbm9uZScsXG4gICAgICAgIHN0cm9rZTogJ2N1cnJlbnRDb2xvcicsXG4gICAgICAgICdzdHJva2Utd2lkdGgnOiBwcm9wcy50aGlja25lc3MsXG4gICAgICAgICdzdHJva2UtbWl0ZXJsaW1pdCc6ICcxMCdcbiAgICAgIH0pXG4gICAgXSlcbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIHdpdGhEaXJlY3RpdmVzIH0gZnJvbSAndnVlJ1xuXG5leHBvcnQgZnVuY3Rpb24gaFNsb3QgKHNsb3QsIG90aGVyd2lzZSkge1xuICByZXR1cm4gc2xvdCAhPT0gdm9pZCAwXG4gICAgPyBzbG90KCkgfHwgb3RoZXJ3aXNlXG4gICAgOiBvdGhlcndpc2Vcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhVbmlxdWVTbG90IChzbG90LCBvdGhlcndpc2UpIHtcbiAgaWYgKHNsb3QgIT09IHZvaWQgMCkge1xuICAgIGNvbnN0IHZub2RlID0gc2xvdCgpXG4gICAgaWYgKHZub2RlICE9PSB2b2lkIDAgJiYgdm5vZGUgIT09IG51bGwpIHtcbiAgICAgIHJldHVybiB2bm9kZS5zbGljZSgpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG90aGVyd2lzZVxufVxuXG4vKipcbiAqIFNvdXJjZSBkZWZpbml0ZWx5IGV4aXN0cyxcbiAqIHNvIGl0J3MgbWVyZ2VkIHdpdGggdGhlIHBvc3NpYmxlIHNsb3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhNZXJnZVNsb3QgKHNsb3QsIHNvdXJjZSkge1xuICByZXR1cm4gc2xvdCAhPT0gdm9pZCAwXG4gICAgPyBzb3VyY2UuY29uY2F0KHNsb3QoKSlcbiAgICA6IHNvdXJjZVxufVxuXG4vKipcbiAqIE1lcmdlIHdpdGggcG9zc2libGUgc2xvdCxcbiAqIGV2ZW4gaWYgc291cmNlIG1pZ2h0IG5vdCBleGlzdFxuICovXG5leHBvcnQgZnVuY3Rpb24gaE1lcmdlU2xvdFNhZmVseSAoc2xvdCwgc291cmNlKSB7XG4gIGlmIChzbG90ID09PSB2b2lkIDApIHtcbiAgICByZXR1cm4gc291cmNlXG4gIH1cblxuICByZXR1cm4gc291cmNlICE9PSB2b2lkIDBcbiAgICA/IHNvdXJjZS5jb25jYXQoc2xvdCgpKVxuICAgIDogc2xvdCgpXG59XG5cbi8qXG4gKiAoU3RyaW5nKSAga2V5ICAgICAgIC0gdW5pcXVlIHZub2RlIGtleVxuICogKEJvb2xlYW4pIGNvbmRpdGlvbiAtIHNob3VsZCBjaGFuZ2UgT05MWSB3aGVuIGFkZGluZy9yZW1vdmluZyBkaXJlY3RpdmVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhEaXIgKFxuICB0YWcsXG4gIGRhdGEsXG4gIGNoaWxkcmVuLFxuICBrZXksXG4gIGNvbmRpdGlvbixcbiAgZ2V0RGlyc0ZuXG4pIHtcbiAgZGF0YS5rZXkgPSBrZXkgKyBjb25kaXRpb25cblxuICBjb25zdCB2bm9kZSA9IGgodGFnLCBkYXRhLCBjaGlsZHJlbilcblxuICByZXR1cm4gY29uZGl0aW9uID09PSB0cnVlXG4gICAgPyB3aXRoRGlyZWN0aXZlcyh2bm9kZSwgZ2V0RGlyc0ZuKCkpXG4gICAgOiB2bm9kZVxufVxuIiwiLy8gY29waWVkIHRvIGRvY3MgdG9vXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGFyZW50UHJveHkgKHByb3h5KSB7XG4gIGlmIChPYmplY3QocHJveHkuJHBhcmVudCkgPT09IHByb3h5LiRwYXJlbnQpIHtcbiAgICByZXR1cm4gcHJveHkuJHBhcmVudFxuICB9XG5cbiAgbGV0IHsgcGFyZW50IH0gPSBwcm94eS4kXG5cbiAgd2hpbGUgKE9iamVjdChwYXJlbnQpID09PSBwYXJlbnQpIHtcbiAgICBpZiAoT2JqZWN0KHBhcmVudC5wcm94eSkgPT09IHBhcmVudC5wcm94eSkge1xuICAgICAgcmV0dXJuIHBhcmVudC5wcm94eVxuICAgIH1cblxuICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRcbiAgfVxufVxuXG5mdW5jdGlvbiBmaWxsTm9ybWFsaXplZFZOb2RlcyAoY2hpbGRyZW4sIHZub2RlKSB7XG4gIGlmICh0eXBlb2Ygdm5vZGUudHlwZSA9PT0gJ3N5bWJvbCcpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2bm9kZS5jaGlsZHJlbikgPT09IHRydWUpIHtcbiAgICAgIHZub2RlLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICBmaWxsTm9ybWFsaXplZFZOb2RlcyhjaGlsZHJlbiwgY2hpbGQpXG4gICAgICB9KVxuICAgIH1cbiAgfVxuICBlbHNlIHtcbiAgICBjaGlsZHJlbi5hZGQodm5vZGUpXG4gIH1cbn1cblxuLy8gdm5vZGVzIGZyb20gcmVuZGVyZWQgaW4gYWR2YW5jZWQgc2xvdHNcbmV4cG9ydCBmdW5jdGlvbiBnZXROb3JtYWxpemVkVk5vZGVzICh2bm9kZXMpIHtcbiAgY29uc3QgY2hpbGRyZW4gPSBuZXcgU2V0KClcblxuICB2bm9kZXMuZm9yRWFjaCh2bm9kZSA9PiB7XG4gICAgZmlsbE5vcm1hbGl6ZWRWTm9kZXMoY2hpbGRyZW4sIHZub2RlKVxuICB9KVxuXG4gIHJldHVybiBBcnJheS5mcm9tKGNoaWxkcmVuKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdm1IYXNSb3V0ZXIgKHZtKSB7XG4gIHJldHVybiB2bS5hcHBDb250ZXh0LmNvbmZpZy5nbG9iYWxQcm9wZXJ0aWVzLiRyb3V0ZXIgIT09IHZvaWQgMFxufVxuXG5leHBvcnQgZnVuY3Rpb24gdm1Jc0Rlc3Ryb3llZCAodm0pIHtcbiAgcmV0dXJuIHZtLmlzVW5tb3VudGVkID09PSB0cnVlIHx8IHZtLmlzRGVhY3RpdmF0ZWQgPT09IHRydWVcbn1cbiIsImltcG9ydCB7IHVucmVmIH0gZnJvbSAndnVlJ1xuXG5leHBvcnQgZnVuY3Rpb24gb2Zmc2V0IChlbCkge1xuICBpZiAoZWwgPT09IHdpbmRvdykge1xuICAgIHJldHVybiB7IHRvcDogMCwgbGVmdDogMCB9XG4gIH1cbiAgY29uc3QgeyB0b3AsIGxlZnQgfSA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gIHJldHVybiB7IHRvcCwgbGVmdCB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHlsZSAoZWwsIHByb3BlcnR5KSB7XG4gIHJldHVybiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCkuZ2V0UHJvcGVydHlWYWx1ZShwcm9wZXJ0eSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhlaWdodCAoZWwpIHtcbiAgcmV0dXJuIGVsID09PSB3aW5kb3dcbiAgICA/IHdpbmRvdy5pbm5lckhlaWdodFxuICAgIDogZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3aWR0aCAoZWwpIHtcbiAgcmV0dXJuIGVsID09PSB3aW5kb3dcbiAgICA/IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgOiBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aFxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3NzIChlbGVtZW50LCBjc3MpIHtcbiAgY29uc3Qgc3R5bGUgPSBlbGVtZW50LnN0eWxlXG5cbiAgZm9yIChjb25zdCBwcm9wIGluIGNzcykge1xuICAgIHN0eWxlWyBwcm9wIF0gPSBjc3NbIHByb3AgXVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjc3NCYXRjaCAoZWxlbWVudHMsIHN0eWxlKSB7XG4gIGVsZW1lbnRzLmZvckVhY2goZWwgPT4gY3NzKGVsLCBzdHlsZSkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWFkeSAoZm4pIHtcbiAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykgcmV0dXJuXG5cbiAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgIT09ICdsb2FkaW5nJykge1xuICAgIHJldHVybiBmbigpXG4gIH1cblxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZm4sIGZhbHNlKVxufVxuXG4vLyBpbnRlcm5hbFxuZXhwb3J0IGZ1bmN0aW9uIGdldEVsZW1lbnQgKGVsKSB7XG4gIGlmIChlbCA9PT0gdm9pZCAwIHx8IGVsID09PSBudWxsKSB7XG4gICAgcmV0dXJuIHZvaWQgMFxuICB9XG5cbiAgaWYgKHR5cGVvZiBlbCA9PT0gJ3N0cmluZycpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpIHx8IHZvaWQgMFxuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gdm9pZCAwXG4gICAgfVxuICB9XG5cbiAgY29uc3QgdGFyZ2V0ID0gdW5yZWYoZWwpXG4gIGlmICh0YXJnZXQpIHtcbiAgICByZXR1cm4gdGFyZ2V0LiRlbCB8fCB0YXJnZXRcbiAgfVxufVxuXG4vLyBpbnRlcm5hbFxuZXhwb3J0IGZ1bmN0aW9uIGNoaWxkSGFzRm9jdXMgKGVsLCBmb2N1c2VkRWwpIHtcbiAgaWYgKGVsID09PSB2b2lkIDAgfHwgZWwgPT09IG51bGwgfHwgZWwuY29udGFpbnMoZm9jdXNlZEVsKSA9PT0gdHJ1ZSkge1xuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBmb3IgKGxldCBuZXh0ID0gZWwubmV4dEVsZW1lbnRTaWJsaW5nOyBuZXh0ICE9PSBudWxsOyBuZXh0ID0gbmV4dC5uZXh0RWxlbWVudFNpYmxpbmcpIHtcbiAgICBpZiAobmV4dC5jb250YWlucyhmb2N1c2VkRWwpKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG9mZnNldCxcbiAgc3R5bGUsXG4gIGhlaWdodCxcbiAgd2lkdGgsXG4gIGNzcyxcbiAgY3NzQmF0Y2gsXG4gIHJlYWR5XG59XG4iLCJpbXBvcnQgeyBoLCBjb21wdXRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlU2l6ZSwgeyB1c2VTaXplUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1zaXplL3VzZS1zaXplLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoU2xvdCwgaE1lcmdlU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcblxuY29uc3QgZGVmYXVsdFZpZXdCb3ggPSAnMCAwIDI0IDI0J1xuXG5jb25zdCBzYW1lRm4gPSBpID0+IGlcbmNvbnN0IGlvbkZuID0gaSA9PiBgaW9uaWNvbnMgJHsgaSB9YFxuXG5jb25zdCBsaWJNYXAgPSB7XG4gICdtZGktJzogaSA9PiBgbWRpICR7IGkgfWAsXG4gICdpY29uLSc6IHNhbWVGbiwgLy8gZm9udGF3ZXNvbWUgZXF1aXZcbiAgJ2J0LSc6IGkgPT4gYGJ0ICR7IGkgfWAsXG4gICdldmEtJzogaSA9PiBgZXZhICR7IGkgfWAsXG4gICdpb24tbWQnOiBpb25GbixcbiAgJ2lvbi1pb3MnOiBpb25GbixcbiAgJ2lvbi1sb2dvJzogaW9uRm4sXG4gICdpY29uZm9udCAnOiBzYW1lRm4sXG4gICd0aS0nOiBpID0+IGB0aGVtaWZ5LWljb24gJHsgaSB9YCxcbiAgJ2JpLSc6IGkgPT4gYGJvb3RzdHJhcC1pY29ucyAkeyBpIH1gLFxuICAnaS0nOiBzYW1lRm4gLy8gVW5vQ1NTIHB1cmUgaWNvbnNcbn1cblxuY29uc3QgbWF0TWFwID0ge1xuICBvXzogJy1vdXRsaW5lZCcsXG4gIHJfOiAnLXJvdW5kJyxcbiAgc186ICctc2hhcnAnXG59XG5cbmNvbnN0IHN5bU1hcCA9IHtcbiAgc3ltX29fOiAnLW91dGxpbmVkJyxcbiAgc3ltX3JfOiAnLXJvdW5kZWQnLFxuICBzeW1fc186ICctc2hhcnAnXG59XG5cbmNvbnN0IGxpYlJFID0gbmV3IFJlZ0V4cCgnXignICsgT2JqZWN0LmtleXMobGliTWFwKS5qb2luKCd8JykgKyAnKScpXG5jb25zdCBtYXRSRSA9IG5ldyBSZWdFeHAoJ14oJyArIE9iamVjdC5rZXlzKG1hdE1hcCkuam9pbignfCcpICsgJyknKVxuY29uc3Qgc3ltUkUgPSBuZXcgUmVnRXhwKCdeKCcgKyBPYmplY3Qua2V5cyhzeW1NYXApLmpvaW4oJ3wnKSArICcpJylcbmNvbnN0IG1SRSA9IC9eW01tXVxccz9bLStdP1xcLj9cXGQvXG5jb25zdCBpbWdSRSA9IC9eaW1nOi9cbmNvbnN0IHN2Z1VzZVJFID0gL15zdmd1c2U6L1xuY29uc3QgaW9uUkUgPSAvXmlvbi0vXG5jb25zdCBmYVJFID0gL14oZmEtKGNsYXNzaWN8c2hhcnB8c29saWR8cmVndWxhcnxsaWdodHxicmFuZHN8ZHVvdG9uZXx0aGluKXxbbGZdYVtzcmxiZGtdPykgL1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUljb24nLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlU2l6ZVByb3BzLFxuXG4gICAgdGFnOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnaSdcbiAgICB9LFxuXG4gICAgbmFtZTogU3RyaW5nLFxuICAgIGNvbG9yOiBTdHJpbmcsXG4gICAgbGVmdDogQm9vbGVhbixcbiAgICByaWdodDogQm9vbGVhblxuICB9LFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cyB9KSB7XG4gICAgY29uc3QgeyBwcm94eTogeyAkcSB9IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICAgIGNvbnN0IHNpemVTdHlsZSA9IHVzZVNpemUocHJvcHMpXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLWljb24nXG4gICAgICArIChwcm9wcy5sZWZ0ID09PSB0cnVlID8gJyBvbi1sZWZ0JyA6ICcnKSAvLyBUT0RPIFF2MzogZHJvcCB0aGlzXG4gICAgICArIChwcm9wcy5yaWdodCA9PT0gdHJ1ZSA/ICcgb24tcmlnaHQnIDogJycpXG4gICAgICArIChwcm9wcy5jb2xvciAhPT0gdm9pZCAwID8gYCB0ZXh0LSR7IHByb3BzLmNvbG9yIH1gIDogJycpXG4gICAgKVxuXG4gICAgY29uc3QgdHlwZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGxldCBjbHNcbiAgICAgIGxldCBpY29uID0gcHJvcHMubmFtZVxuXG4gICAgICBpZiAoaWNvbiA9PT0gJ25vbmUnIHx8ICFpY29uKSB7XG4gICAgICAgIHJldHVybiB7IG5vbmU6IHRydWUgfVxuICAgICAgfVxuXG4gICAgICBpZiAoJHEuaWNvbk1hcEZuICE9PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IHJlcyA9ICRxLmljb25NYXBGbihpY29uKVxuICAgICAgICBpZiAocmVzICE9PSB2b2lkIDApIHtcbiAgICAgICAgICBpZiAocmVzLmljb24gIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgaWNvbiA9IHJlcy5pY29uXG4gICAgICAgICAgICBpZiAoaWNvbiA9PT0gJ25vbmUnIHx8ICFpY29uKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7IG5vbmU6IHRydWUgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGNsczogcmVzLmNscyxcbiAgICAgICAgICAgICAgY29udGVudDogcmVzLmNvbnRlbnQgIT09IHZvaWQgMFxuICAgICAgICAgICAgICAgID8gcmVzLmNvbnRlbnRcbiAgICAgICAgICAgICAgICA6ICcgJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobVJFLnRlc3QoaWNvbikgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgWyBkZWYsIHZpZXdCb3ggPSBkZWZhdWx0Vmlld0JveCBdID0gaWNvbi5zcGxpdCgnfCcpXG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzdmc6IHRydWUsXG4gICAgICAgICAgdmlld0JveCxcbiAgICAgICAgICBub2RlczogZGVmLnNwbGl0KCcmJicpLm1hcChwYXRoID0+IHtcbiAgICAgICAgICAgIGNvbnN0IFsgZCwgc3R5bGUsIHRyYW5zZm9ybSBdID0gcGF0aC5zcGxpdCgnQEAnKVxuICAgICAgICAgICAgcmV0dXJuIGgoJ3BhdGgnLCB7IHN0eWxlLCBkLCB0cmFuc2Zvcm0gfSlcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChpbWdSRS50ZXN0KGljb24pID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaW1nOiB0cnVlLFxuICAgICAgICAgIHNyYzogaWNvbi5zdWJzdHJpbmcoNClcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3ZnVXNlUkUudGVzdChpY29uKSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBbIGRlZiwgdmlld0JveCA9IGRlZmF1bHRWaWV3Qm94IF0gPSBpY29uLnNwbGl0KCd8JylcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHN2Z3VzZTogdHJ1ZSxcbiAgICAgICAgICBzcmM6IGRlZi5zdWJzdHJpbmcoNyksXG4gICAgICAgICAgdmlld0JveFxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxldCBjb250ZW50ID0gJyAnXG4gICAgICBjb25zdCBtYXRjaGVzID0gaWNvbi5tYXRjaChsaWJSRSlcblxuICAgICAgaWYgKG1hdGNoZXMgIT09IG51bGwpIHtcbiAgICAgICAgY2xzID0gbGliTWFwWyBtYXRjaGVzWyAxIF0gXShpY29uKVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAoZmFSRS50ZXN0KGljb24pID09PSB0cnVlKSB7XG4gICAgICAgIGNscyA9IGljb25cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGlvblJFLnRlc3QoaWNvbikgPT09IHRydWUpIHtcbiAgICAgICAgY2xzID0gYGlvbmljb25zIGlvbi0keyAkcS5wbGF0Zm9ybS5pcy5pb3MgPT09IHRydWUgPyAnaW9zJyA6ICdtZCcgfSR7IGljb24uc3Vic3RyaW5nKDMpIH1gXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChzeW1SRS50ZXN0KGljb24pID09PSB0cnVlKSB7XG4gICAgICAgIC8vIFwibm90cmFuc2xhdGVcIiBjbGFzcyBpcyBmb3IgR29vZ2xlIFRyYW5zbGF0ZVxuICAgICAgICAvLyB0byBhdm9pZCB0YW1wZXJpbmcgd2l0aCBNYXRlcmlhbCBTeW1ib2xzIGxpZ2F0dXJlIGZvbnRcbiAgICAgICAgLy9cbiAgICAgICAgLy8gQ2F1dGlvbjogVG8gYmUgYWJsZSB0byBhZGQgc3VmZml4IHRvIHRoZSBjbGFzcyBuYW1lLFxuICAgICAgICAvLyBrZWVwIHRoZSAnbWF0ZXJpYWwtc3ltYm9scycgYXQgdGhlIGVuZCBvZiB0aGUgc3RyaW5nLlxuICAgICAgICBjbHMgPSAnbm90cmFuc2xhdGUgbWF0ZXJpYWwtc3ltYm9scydcblxuICAgICAgICBjb25zdCBtYXRjaGVzID0gaWNvbi5tYXRjaChzeW1SRSlcbiAgICAgICAgaWYgKG1hdGNoZXMgIT09IG51bGwpIHtcbiAgICAgICAgICBpY29uID0gaWNvbi5zdWJzdHJpbmcoNilcbiAgICAgICAgICBjbHMgKz0gc3ltTWFwWyBtYXRjaGVzWyAxIF0gXVxuICAgICAgICB9XG5cbiAgICAgICAgY29udGVudCA9IGljb25cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICAvLyBcIm5vdHJhbnNsYXRlXCIgY2xhc3MgaXMgZm9yIEdvb2dsZSBUcmFuc2xhdGVcbiAgICAgICAgLy8gdG8gYXZvaWQgdGFtcGVyaW5nIHdpdGggTWF0ZXJpYWwgSWNvbnMgbGlnYXR1cmUgZm9udFxuICAgICAgICAvL1xuICAgICAgICAvLyBDYXV0aW9uOiBUbyBiZSBhYmxlIHRvIGFkZCBzdWZmaXggdG8gdGhlIGNsYXNzIG5hbWUsXG4gICAgICAgIC8vIGtlZXAgdGhlICdtYXRlcmlhbC1pY29ucycgYXQgdGhlIGVuZCBvZiB0aGUgc3RyaW5nLlxuICAgICAgICBjbHMgPSAnbm90cmFuc2xhdGUgbWF0ZXJpYWwtaWNvbnMnXG5cbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IGljb24ubWF0Y2gobWF0UkUpXG4gICAgICAgIGlmIChtYXRjaGVzICE9PSBudWxsKSB7XG4gICAgICAgICAgaWNvbiA9IGljb24uc3Vic3RyaW5nKDIpXG4gICAgICAgICAgY2xzICs9IG1hdE1hcFsgbWF0Y2hlc1sgMSBdIF1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRlbnQgPSBpY29uXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNscyxcbiAgICAgICAgY29udGVudFxuICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUsXG4gICAgICAgIHN0eWxlOiBzaXplU3R5bGUudmFsdWUsXG4gICAgICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJyxcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGUudmFsdWUubm9uZSA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gaChwcm9wcy50YWcsIGRhdGEsIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZS52YWx1ZS5pbWcgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIGgocHJvcHMudGFnLCBkYXRhLCBoTWVyZ2VTbG90KHNsb3RzLmRlZmF1bHQsIFtcbiAgICAgICAgICBoKCdpbWcnLCB7IHNyYzogdHlwZS52YWx1ZS5zcmMgfSlcbiAgICAgICAgXSkpXG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlLnZhbHVlLnN2ZyA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gaChwcm9wcy50YWcsIGRhdGEsIGhNZXJnZVNsb3Qoc2xvdHMuZGVmYXVsdCwgW1xuICAgICAgICAgIGgoJ3N2ZycsIHtcbiAgICAgICAgICAgIHZpZXdCb3g6IHR5cGUudmFsdWUudmlld0JveCB8fCAnMCAwIDI0IDI0J1xuICAgICAgICAgIH0sIHR5cGUudmFsdWUubm9kZXMpXG4gICAgICAgIF0pKVxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZS52YWx1ZS5zdmd1c2UgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIGgocHJvcHMudGFnLCBkYXRhLCBoTWVyZ2VTbG90KHNsb3RzLmRlZmF1bHQsIFtcbiAgICAgICAgICBoKCdzdmcnLCB7XG4gICAgICAgICAgICB2aWV3Qm94OiB0eXBlLnZhbHVlLnZpZXdCb3hcbiAgICAgICAgICB9LCBbXG4gICAgICAgICAgICBoKCd1c2UnLCB7ICd4bGluazpocmVmJzogdHlwZS52YWx1ZS5zcmMgfSlcbiAgICAgICAgICBdKVxuICAgICAgICBdKSlcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGUudmFsdWUuY2xzICE9PSB2b2lkIDApIHtcbiAgICAgICAgZGF0YS5jbGFzcyArPSAnICcgKyB0eXBlLnZhbHVlLmNsc1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaChwcm9wcy50YWcsIGRhdGEsIGhNZXJnZVNsb3Qoc2xvdHMuZGVmYXVsdCwgW1xuICAgICAgICB0eXBlLnZhbHVlLmNvbnRlbnRcbiAgICAgIF0pKVxuICAgIH1cbiAgfVxufSlcbiIsIi8qXG4gKiBJbnNwaXJlZCBieSBSb3V0ZXJMaW5rIGZyb20gVnVlIFJvdXRlclxuICogIC0tPiBBUEkgc2hvdWxkIG1hdGNoIVxuICovXG5cbmltcG9ydCB7IGNvbXB1dGVkLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IHZtSGFzUm91dGVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS52bS92bS5qcydcblxuLy8gR2V0IHRoZSBvcmlnaW5hbCBwYXRoIHZhbHVlIG9mIGEgcmVjb3JkIGJ5IGZvbGxvd2luZyBpdHMgYWxpYXNPZlxuZnVuY3Rpb24gZ2V0T3JpZ2luYWxQYXRoIChyZWNvcmQpIHtcbiAgcmV0dXJuIHJlY29yZFxuICAgID8gKFxuICAgICAgICByZWNvcmQuYWxpYXNPZlxuICAgICAgICAgID8gcmVjb3JkLmFsaWFzT2YucGF0aFxuICAgICAgICAgIDogcmVjb3JkLnBhdGhcbiAgICAgICkgOiAnJ1xufVxuXG5mdW5jdGlvbiBpc1NhbWVSb3V0ZVJlY29yZCAoYSwgYikge1xuICAvLyBzaW5jZSB0aGUgb3JpZ2luYWwgcmVjb3JkIGhhcyBhbiB1bmRlZmluZWQgdmFsdWUgZm9yIGFsaWFzT2ZcbiAgLy8gYnV0IGFsbCBhbGlhc2VzIHBvaW50IHRvIHRoZSBvcmlnaW5hbCByZWNvcmQsIHRoaXMgd2lsbCBhbHdheXMgY29tcGFyZVxuICAvLyB0aGUgb3JpZ2luYWwgcmVjb3JkXG4gIHJldHVybiAoYS5hbGlhc09mIHx8IGEpID09PSAoYi5hbGlhc09mIHx8IGIpXG59XG5cbmZ1bmN0aW9uIGluY2x1ZGVzUGFyYW1zIChvdXRlciwgaW5uZXIpIHtcbiAgZm9yIChjb25zdCBrZXkgaW4gaW5uZXIpIHtcbiAgICBjb25zdFxuICAgICAgaW5uZXJWYWx1ZSA9IGlubmVyWyBrZXkgXSxcbiAgICAgIG91dGVyVmFsdWUgPSBvdXRlclsga2V5IF1cblxuICAgIGlmICh0eXBlb2YgaW5uZXJWYWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmIChpbm5lclZhbHVlICE9PSBvdXRlclZhbHVlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChcbiAgICAgIEFycmF5LmlzQXJyYXkob3V0ZXJWYWx1ZSkgPT09IGZhbHNlXG4gICAgICB8fCBvdXRlclZhbHVlLmxlbmd0aCAhPT0gaW5uZXJWYWx1ZS5sZW5ndGhcbiAgICAgIHx8IGlubmVyVmFsdWUuc29tZSgodmFsdWUsIGkpID0+IHZhbHVlICE9PSBvdXRlclZhbHVlWyBpIF0pXG4gICAgKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZVxufVxuXG5mdW5jdGlvbiBpc0VxdWl2YWxlbnRBcnJheSAoYSwgYikge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheShiKSA9PT0gdHJ1ZVxuICAgID8gYS5sZW5ndGggPT09IGIubGVuZ3RoICYmIGEuZXZlcnkoKHZhbHVlLCBpKSA9PiB2YWx1ZSA9PT0gYlsgaSBdKVxuICAgIDogYS5sZW5ndGggPT09IDEgJiYgYVsgMCBdID09PSBiXG59XG5cbmZ1bmN0aW9uIGlzU2FtZVJvdXRlTG9jYXRpb25QYXJhbXNWYWx1ZSAoYSwgYikge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheShhKSA9PT0gdHJ1ZVxuICAgID8gaXNFcXVpdmFsZW50QXJyYXkoYSwgYilcbiAgICA6IChcbiAgICAgICAgQXJyYXkuaXNBcnJheShiKSA9PT0gdHJ1ZVxuICAgICAgICAgID8gaXNFcXVpdmFsZW50QXJyYXkoYiwgYSlcbiAgICAgICAgICA6IGEgPT09IGJcbiAgICAgIClcbn1cblxuZnVuY3Rpb24gaXNTYW1lUm91dGVMb2NhdGlvblBhcmFtcyAoYSwgYikge1xuICBpZiAoT2JqZWN0LmtleXMoYSkubGVuZ3RoICE9PSBPYmplY3Qua2V5cyhiKS5sZW5ndGgpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGZvciAoY29uc3Qga2V5IGluIGEpIHtcbiAgICBpZiAoaXNTYW1lUm91dGVMb2NhdGlvblBhcmFtc1ZhbHVlKGFbIGtleSBdLCBiWyBrZXkgXSkgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZVxufVxuXG5leHBvcnQgY29uc3QgdXNlUm91dGVyTGlua05vbk1hdGNoaW5nUHJvcHMgPSB7XG4gIC8vIHJvdXRlci1saW5rXG4gIHRvOiBbIFN0cmluZywgT2JqZWN0IF0sXG4gIHJlcGxhY2U6IEJvb2xlYW4sXG5cbiAgLy8gcmVndWxhciA8YT4gbGlua1xuICBocmVmOiBTdHJpbmcsXG4gIHRhcmdldDogU3RyaW5nLFxuXG4gIC8vIHN0YXRlXG4gIGRpc2FibGU6IEJvb2xlYW5cbn1cblxuZXhwb3J0IGNvbnN0IHVzZVJvdXRlckxpbmtQcm9wcyA9IHtcbiAgLi4udXNlUm91dGVyTGlua05vbk1hdGNoaW5nUHJvcHMsXG5cbiAgLy8gcm91dGVyLWxpbmtcbiAgZXhhY3Q6IEJvb2xlYW4sXG4gIGFjdGl2ZUNsYXNzOiB7XG4gICAgdHlwZTogU3RyaW5nLFxuICAgIGRlZmF1bHQ6ICdxLXJvdXRlci1saW5rLS1hY3RpdmUnXG4gIH0sXG4gIGV4YWN0QWN0aXZlQ2xhc3M6IHtcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgZGVmYXVsdDogJ3Etcm91dGVyLWxpbmstLWV4YWN0LWFjdGl2ZSdcbiAgfVxufVxuXG4vLyBleHRlcm5hbCBwcm9wczogdHlwZSwgdGFnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh7IGZhbGxiYWNrVGFnLCB1c2VEaXNhYmxlRm9yUm91dGVyTGlua1Byb3BzID0gdHJ1ZSB9ID0ge30pIHtcbiAgY29uc3Qgdm0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICBjb25zdCB7IHByb3BzLCBwcm94eSwgZW1pdCB9ID0gdm1cblxuICBjb25zdCBoYXNSb3V0ZXIgPSB2bUhhc1JvdXRlcih2bSlcbiAgY29uc3QgaGFzSHJlZkxpbmsgPSBjb21wdXRlZCgoKSA9PiBwcm9wcy5kaXNhYmxlICE9PSB0cnVlICYmIHByb3BzLmhyZWYgIT09IHZvaWQgMClcblxuICAvLyBmb3IgcGVyZiByZWFzb25zLCB3ZSB1c2UgbWluaW11bSBhbW91bnQgb2YgcnVudGltZSB3b3JrXG4gIGNvbnN0IGhhc1JvdXRlckxpbmtQcm9wcyA9IHVzZURpc2FibGVGb3JSb3V0ZXJMaW5rUHJvcHMgPT09IHRydWVcbiAgICA/IGNvbXB1dGVkKCgpID0+XG4gICAgICBoYXNSb3V0ZXIgPT09IHRydWVcbiAgICAgICYmIHByb3BzLmRpc2FibGUgIT09IHRydWVcbiAgICAgICYmIGhhc0hyZWZMaW5rLnZhbHVlICE9PSB0cnVlXG4gICAgICAmJiBwcm9wcy50byAhPT0gdm9pZCAwICYmIHByb3BzLnRvICE9PSBudWxsICYmIHByb3BzLnRvICE9PSAnJ1xuICAgIClcbiAgICA6IGNvbXB1dGVkKCgpID0+XG4gICAgICBoYXNSb3V0ZXIgPT09IHRydWVcbiAgICAgICYmIGhhc0hyZWZMaW5rLnZhbHVlICE9PSB0cnVlXG4gICAgICAmJiBwcm9wcy50byAhPT0gdm9pZCAwICYmIHByb3BzLnRvICE9PSBudWxsICYmIHByb3BzLnRvICE9PSAnJ1xuICAgIClcblxuICBjb25zdCByZXNvbHZlZExpbmsgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgaGFzUm91dGVyTGlua1Byb3BzLnZhbHVlID09PSB0cnVlXG4gICAgICA/IGdldExpbmsocHJvcHMudG8pXG4gICAgICA6IG51bGxcbiAgKSlcblxuICBjb25zdCBoYXNSb3V0ZXJMaW5rID0gY29tcHV0ZWQoKCkgPT4gcmVzb2x2ZWRMaW5rLnZhbHVlICE9PSBudWxsKVxuICBjb25zdCBoYXNMaW5rID0gY29tcHV0ZWQoKCkgPT4gaGFzSHJlZkxpbmsudmFsdWUgPT09IHRydWUgfHwgaGFzUm91dGVyTGluay52YWx1ZSA9PT0gdHJ1ZSlcblxuICBjb25zdCBsaW5rVGFnID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgIHByb3BzLnR5cGUgPT09ICdhJyB8fCBoYXNMaW5rLnZhbHVlID09PSB0cnVlXG4gICAgICA/ICdhJ1xuICAgICAgOiAocHJvcHMudGFnIHx8IGZhbGxiYWNrVGFnIHx8ICdkaXYnKVxuICApKVxuXG4gIGNvbnN0IGxpbmtBdHRycyA9IGNvbXB1dGVkKCgpID0+IChcbiAgICBoYXNIcmVmTGluay52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgPyB7XG4gICAgICAgICAgaHJlZjogcHJvcHMuaHJlZixcbiAgICAgICAgICB0YXJnZXQ6IHByb3BzLnRhcmdldFxuICAgICAgICB9XG4gICAgICA6IChcbiAgICAgICAgICBoYXNSb3V0ZXJMaW5rLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICBocmVmOiByZXNvbHZlZExpbmsudmFsdWUuaHJlZixcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IHByb3BzLnRhcmdldFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA6IHt9XG4gICAgICAgIClcbiAgKSlcblxuICBjb25zdCBsaW5rQWN0aXZlSW5kZXggPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgaWYgKGhhc1JvdXRlckxpbmsudmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gLTFcbiAgICB9XG5cbiAgICBjb25zdFxuICAgICAgeyBtYXRjaGVkIH0gPSByZXNvbHZlZExpbmsudmFsdWUsXG4gICAgICB7IGxlbmd0aCB9ID0gbWF0Y2hlZCxcbiAgICAgIHJvdXRlTWF0Y2hlZCA9IG1hdGNoZWRbIGxlbmd0aCAtIDEgXVxuXG4gICAgaWYgKHJvdXRlTWF0Y2hlZCA9PT0gdm9pZCAwKSB7XG4gICAgICByZXR1cm4gLTFcbiAgICB9XG5cbiAgICBjb25zdCBjdXJyZW50TWF0Y2hlZCA9IHByb3h5LiRyb3V0ZS5tYXRjaGVkXG5cbiAgICBpZiAoY3VycmVudE1hdGNoZWQubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gLTFcbiAgICB9XG5cbiAgICBjb25zdCBpbmRleCA9IGN1cnJlbnRNYXRjaGVkLmZpbmRJbmRleChcbiAgICAgIGlzU2FtZVJvdXRlUmVjb3JkLmJpbmQobnVsbCwgcm91dGVNYXRjaGVkKVxuICAgIClcblxuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIHJldHVybiBpbmRleFxuICAgIH1cblxuICAgIC8vIHBvc3NpYmxlIHBhcmVudCByZWNvcmRcbiAgICBjb25zdCBwYXJlbnRSZWNvcmRQYXRoID0gZ2V0T3JpZ2luYWxQYXRoKG1hdGNoZWRbIGxlbmd0aCAtIDIgXSlcblxuICAgIHJldHVybiAoXG4gICAgICAvLyB3ZSBhcmUgZGVhbGluZyB3aXRoIG5lc3RlZCByb3V0ZXNcbiAgICAgIGxlbmd0aCA+IDFcbiAgICAgIC8vIGlmIHRoZSBwYXJlbnQgYW5kIG1hdGNoZWQgcm91dGUgaGF2ZSB0aGUgc2FtZSBwYXRoLCB0aGlzIGxpbmsgaXNcbiAgICAgIC8vIHJlZmVycmluZyB0byB0aGUgZW1wdHkgY2hpbGQuIE9yIHdlIGN1cnJlbnRseSBhcmUgb24gYSBkaWZmZXJlbnRcbiAgICAgIC8vIGNoaWxkIG9mIHRoZSBzYW1lIHBhcmVudFxuICAgICAgJiYgZ2V0T3JpZ2luYWxQYXRoKHJvdXRlTWF0Y2hlZCkgPT09IHBhcmVudFJlY29yZFBhdGhcbiAgICAgIC8vIGF2b2lkIGNvbXBhcmluZyB0aGUgY2hpbGQgd2l0aCBpdHMgcGFyZW50XG4gICAgICAmJiBjdXJyZW50TWF0Y2hlZFsgY3VycmVudE1hdGNoZWQubGVuZ3RoIC0gMSBdLnBhdGggIT09IHBhcmVudFJlY29yZFBhdGhcbiAgICAgICAgPyBjdXJyZW50TWF0Y2hlZC5maW5kSW5kZXgoXG4gICAgICAgICAgaXNTYW1lUm91dGVSZWNvcmQuYmluZChudWxsLCBtYXRjaGVkWyBsZW5ndGggLSAyIF0pXG4gICAgICAgIClcbiAgICAgICAgOiBpbmRleFxuICAgIClcbiAgfSlcblxuICBjb25zdCBsaW5rSXNBY3RpdmUgPSBjb21wdXRlZCgoKSA9PlxuICAgIGhhc1JvdXRlckxpbmsudmFsdWUgPT09IHRydWVcbiAgICAmJiBsaW5rQWN0aXZlSW5kZXgudmFsdWUgIT09IC0xXG4gICAgJiYgaW5jbHVkZXNQYXJhbXMocHJveHkuJHJvdXRlLnBhcmFtcywgcmVzb2x2ZWRMaW5rLnZhbHVlLnBhcmFtcylcbiAgKVxuXG4gIGNvbnN0IGxpbmtJc0V4YWN0QWN0aXZlID0gY29tcHV0ZWQoKCkgPT5cbiAgICBsaW5rSXNBY3RpdmUudmFsdWUgPT09IHRydWVcbiAgICAgICYmIGxpbmtBY3RpdmVJbmRleC52YWx1ZSA9PT0gcHJveHkuJHJvdXRlLm1hdGNoZWQubGVuZ3RoIC0gMVxuICAgICAgJiYgaXNTYW1lUm91dGVMb2NhdGlvblBhcmFtcyhwcm94eS4kcm91dGUucGFyYW1zLCByZXNvbHZlZExpbmsudmFsdWUucGFyYW1zKVxuICApXG5cbiAgY29uc3QgbGlua0NsYXNzID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgIGhhc1JvdXRlckxpbmsudmFsdWUgPT09IHRydWVcbiAgICAgID8gKFxuICAgICAgICAgIGxpbmtJc0V4YWN0QWN0aXZlLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgICA/IGAgJHsgcHJvcHMuZXhhY3RBY3RpdmVDbGFzcyB9ICR7IHByb3BzLmFjdGl2ZUNsYXNzIH1gXG4gICAgICAgICAgICA6IChcbiAgICAgICAgICAgICAgICBwcm9wcy5leGFjdCA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgPyAnJ1xuICAgICAgICAgICAgICAgICAgOiAobGlua0lzQWN0aXZlLnZhbHVlID09PSB0cnVlID8gYCAkeyBwcm9wcy5hY3RpdmVDbGFzcyB9YCA6ICcnKVxuICAgICAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgIDogJydcbiAgKSlcblxuICBmdW5jdGlvbiBnZXRMaW5rICh0bykge1xuICAgIHRyeSB7IHJldHVybiBwcm94eS4kcm91dGVyLnJlc29sdmUodG8pIH1cbiAgICBjYXRjaCAoXykge31cblxuICAgIHJldHVybiBudWxsXG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMgUHJvbWlzZTxSb3V0ZXJFcnJvciB8IGZhbHNlIHwgdW5kZWZpbmVkPlxuICAgKi9cbiAgZnVuY3Rpb24gbmF2aWdhdGVUb1JvdXRlckxpbmsgKFxuICAgIGUsXG4gICAgeyByZXR1cm5Sb3V0ZXJFcnJvciwgdG8gPSBwcm9wcy50bywgcmVwbGFjZSA9IHByb3BzLnJlcGxhY2UgfSA9IHt9XG4gICkge1xuICAgIGlmIChwcm9wcy5kaXNhYmxlID09PSB0cnVlKSB7XG4gICAgICAvLyBlbnN1cmUgbmF0aXZlIG5hdmlnYXRpb24gaXMgcHJldmVudGVkIGluIGFsbCBjYXNlcyxcbiAgICAgIC8vIGxpa2Ugd2hlbiB1c2VEaXNhYmxlRm9yUm91dGVyTGlua1Byb3BzID09PSBmYWxzZSAoUVJvdXRlVGFiKVxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGZhbHNlKVxuICAgIH1cblxuICAgIGlmIChcbiAgICAgIC8vIGRvbid0IHJlZGlyZWN0IHdpdGggY29udHJvbCBrZXlzO1xuICAgICAgLy8gc2hvdWxkIG1hdGNoIFJvdXRlckxpbmsgZnJvbSBWdWUgUm91dGVyXG4gICAgICBlLm1ldGFLZXkgfHwgZS5hbHRLZXkgfHwgZS5jdHJsS2V5IHx8IGUuc2hpZnRLZXlcblxuICAgICAgLy8gZG9uJ3QgcmVkaXJlY3Qgb24gcmlnaHQgY2xpY2tcbiAgICAgIHx8IChlLmJ1dHRvbiAhPT0gdm9pZCAwICYmIGUuYnV0dG9uICE9PSAwKVxuXG4gICAgICAvLyBkb24ndCByZWRpcmVjdCBpZiBpdCBzaG91bGQgb3BlbiBpbiBhIG5ldyB3aW5kb3dcbiAgICAgIHx8IHByb3BzLnRhcmdldCA9PT0gJ19ibGFuaydcbiAgICApIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZmFsc2UpXG4gICAgfVxuXG4gICAgLy8gaGluZGVyIHRoZSBuYXRpdmUgbmF2aWdhdGlvblxuICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgLy8gdGhlbigpIGNhbiBhbHNvIHJldHVybiBhIFwic29mdFwiIHJvdXRlciBlcnJvciAoVnVlIFJvdXRlciBiZWhhdmlvcilcbiAgICBjb25zdCBwcm9taXNlID0gcHJveHkuJHJvdXRlclsgcmVwbGFjZSA9PT0gdHJ1ZSA/ICdyZXBsYWNlJyA6ICdwdXNoJyBdKHRvKVxuXG4gICAgcmV0dXJuIHJldHVyblJvdXRlckVycm9yID09PSB0cnVlXG4gICAgICA/IHByb21pc2VcbiAgICAgIC8vIGVsc2UgY2F0Y2hpbmcgaGFyZCBlcnJvcnMgYW5kIGFsc28gXCJzb2Z0XCIgb25lcyAtIHRoZW4oZXJyID0+IC4uLilcbiAgICAgIDogcHJvbWlzZS50aGVuKCgpID0+IHt9KS5jYXRjaCgoKSA9PiB7fSlcbiAgfVxuXG4gIC8vIHdhcm5pbmchIGVuc3VyZSB0aGF0IHRoZSBjb21wb25lbnQgdXNpbmcgaXQgaGFzICdjbGljaycgaW5jbHVkZWQgaW4gaXRzICdlbWl0cycgZGVmaW5pdGlvbiBwcm9wXG4gIGZ1bmN0aW9uIG5hdmlnYXRlT25DbGljayAoZSkge1xuICAgIGlmIChoYXNSb3V0ZXJMaW5rLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICBjb25zdCBnbyA9IG9wdHMgPT4gbmF2aWdhdGVUb1JvdXRlckxpbmsoZSwgb3B0cylcblxuICAgICAgZW1pdCgnY2xpY2snLCBlLCBnbylcbiAgICAgIGUuZGVmYXVsdFByZXZlbnRlZCAhPT0gdHJ1ZSAmJiBnbygpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZW1pdCgnY2xpY2snLCBlKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaGFzUm91dGVyTGluayxcbiAgICBoYXNIcmVmTGluayxcbiAgICBoYXNMaW5rLFxuXG4gICAgbGlua1RhZyxcbiAgICByZXNvbHZlZExpbmssXG4gICAgbGlua0lzQWN0aXZlLFxuICAgIGxpbmtJc0V4YWN0QWN0aXZlLFxuICAgIGxpbmtDbGFzcyxcbiAgICBsaW5rQXR0cnMsXG5cbiAgICBnZXRMaW5rLFxuICAgIG5hdmlnYXRlVG9Sb3V0ZXJMaW5rLFxuICAgIG5hdmlnYXRlT25DbGlja1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoZm4sIGxpbWl0ID0gMjUwKSB7XG4gIGxldCB3YWl0ID0gZmFsc2UsIHJlc3VsdFxuXG4gIHJldHVybiBmdW5jdGlvbiAoLyogLi4uYXJncyAqLykge1xuICAgIGlmICh3YWl0ID09PSBmYWxzZSkge1xuICAgICAgd2FpdCA9IHRydWVcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4geyB3YWl0ID0gZmFsc2UgfSwgbGltaXQpXG4gICAgICByZXN1bHQgPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG59XG4iLCJpbXBvcnQgeyBjcmVhdGVEaXJlY3RpdmUgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBjc3MgfSBmcm9tICcuLi8uLi91dGlscy9kb20vZG9tLmpzJ1xuaW1wb3J0IHsgcG9zaXRpb24sIHN0b3AsIGFkZEV2dCwgY2xlYW5FdnQgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC9ldmVudC5qcydcbmltcG9ydCB7IGlzS2V5Q29kZSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUua2V5Ym9hcmQva2V5LWNvbXBvc2l0aW9uLmpzJ1xuaW1wb3J0IHRocm90dGxlIGZyb20gJy4uLy4uL3V0aWxzL3Rocm90dGxlL3Rocm90dGxlLmpzJ1xuaW1wb3J0IGdldFNTUlByb3BzIGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUubm9vcC1zc3ItZGlyZWN0aXZlLXRyYW5zZm9ybS9ub29wLXNzci1kaXJlY3RpdmUtdHJhbnNmb3JtLmpzJ1xuXG5mdW5jdGlvbiBzaG93UmlwcGxlIChldnQsIGVsLCBjdHgsIGZvcmNlQ2VudGVyKSB7XG4gIGN0eC5tb2RpZmllcnMuc3RvcCA9PT0gdHJ1ZSAmJiBzdG9wKGV2dClcblxuICBjb25zdCBjb2xvciA9IGN0eC5tb2RpZmllcnMuY29sb3JcbiAgbGV0IGNlbnRlciA9IGN0eC5tb2RpZmllcnMuY2VudGVyXG4gIGNlbnRlciA9IGNlbnRlciA9PT0gdHJ1ZSB8fCBmb3JjZUNlbnRlciA9PT0gdHJ1ZVxuXG4gIGNvbnN0XG4gICAgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKSxcbiAgICBpbm5lck5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyksXG4gICAgcG9zID0gcG9zaXRpb24oZXZ0KSxcbiAgICB7IGxlZnQsIHRvcCwgd2lkdGgsIGhlaWdodCB9ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgZGlhbWV0ZXIgPSBNYXRoLnNxcnQod2lkdGggKiB3aWR0aCArIGhlaWdodCAqIGhlaWdodCksXG4gICAgcmFkaXVzID0gZGlhbWV0ZXIgLyAyLFxuICAgIGNlbnRlclggPSBgJHsgKHdpZHRoIC0gZGlhbWV0ZXIpIC8gMiB9cHhgLFxuICAgIHggPSBjZW50ZXIgPyBjZW50ZXJYIDogYCR7IHBvcy5sZWZ0IC0gbGVmdCAtIHJhZGl1cyB9cHhgLFxuICAgIGNlbnRlclkgPSBgJHsgKGhlaWdodCAtIGRpYW1ldGVyKSAvIDIgfXB4YCxcbiAgICB5ID0gY2VudGVyID8gY2VudGVyWSA6IGAkeyBwb3MudG9wIC0gdG9wIC0gcmFkaXVzIH1weGBcblxuICBpbm5lck5vZGUuY2xhc3NOYW1lID0gJ3EtcmlwcGxlX19pbm5lcidcbiAgY3NzKGlubmVyTm9kZSwge1xuICAgIGhlaWdodDogYCR7IGRpYW1ldGVyIH1weGAsXG4gICAgd2lkdGg6IGAkeyBkaWFtZXRlciB9cHhgLFxuICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZTNkKCR7IHggfSwkeyB5IH0sMCkgc2NhbGUzZCguMiwuMiwxKWAsXG4gICAgb3BhY2l0eTogMFxuICB9KVxuXG4gIG5vZGUuY2xhc3NOYW1lID0gYHEtcmlwcGxlJHsgY29sb3IgPyAnIHRleHQtJyArIGNvbG9yIDogJycgfWBcbiAgbm9kZS5zZXRBdHRyaWJ1dGUoJ2RpcicsICdsdHInKVxuICBub2RlLmFwcGVuZENoaWxkKGlubmVyTm9kZSlcbiAgZWwuYXBwZW5kQ2hpbGQobm9kZSlcblxuICBjb25zdCBhYm9ydCA9ICgpID0+IHtcbiAgICBub2RlLnJlbW92ZSgpXG4gICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICB9XG4gIGN0eC5hYm9ydC5wdXNoKGFib3J0KVxuXG4gIGxldCB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGlubmVyTm9kZS5jbGFzc0xpc3QuYWRkKCdxLXJpcHBsZV9faW5uZXItLWVudGVyJylcbiAgICBpbm5lck5vZGUuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZTNkKCR7IGNlbnRlclggfSwkeyBjZW50ZXJZIH0sMCkgc2NhbGUzZCgxLDEsMSlgXG4gICAgaW5uZXJOb2RlLnN0eWxlLm9wYWNpdHkgPSAwLjJcblxuICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpbm5lck5vZGUuY2xhc3NMaXN0LnJlbW92ZSgncS1yaXBwbGVfX2lubmVyLS1lbnRlcicpXG4gICAgICBpbm5lck5vZGUuY2xhc3NMaXN0LmFkZCgncS1yaXBwbGVfX2lubmVyLS1sZWF2ZScpXG4gICAgICBpbm5lck5vZGUuc3R5bGUub3BhY2l0eSA9IDBcblxuICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgbm9kZS5yZW1vdmUoKVxuICAgICAgICBjdHguYWJvcnQuc3BsaWNlKGN0eC5hYm9ydC5pbmRleE9mKGFib3J0KSwgMSlcbiAgICAgIH0sIDI3NSlcbiAgICB9LCAyNTApXG4gIH0sIDUwKVxufVxuXG5mdW5jdGlvbiB1cGRhdGVNb2RpZmllcnMgKGN0eCwgeyBtb2RpZmllcnMsIHZhbHVlLCBhcmcgfSkge1xuICBjb25zdCBjZmcgPSBPYmplY3QuYXNzaWduKHt9LCBjdHguY2ZnLnJpcHBsZSwgbW9kaWZpZXJzLCB2YWx1ZSlcbiAgY3R4Lm1vZGlmaWVycyA9IHtcbiAgICBlYXJseTogY2ZnLmVhcmx5ID09PSB0cnVlLFxuICAgIHN0b3A6IGNmZy5zdG9wID09PSB0cnVlLFxuICAgIGNlbnRlcjogY2ZnLmNlbnRlciA9PT0gdHJ1ZSxcbiAgICBjb2xvcjogY2ZnLmNvbG9yIHx8IGFyZyxcbiAgICBrZXlDb2RlczogW10uY29uY2F0KGNmZy5rZXlDb2RlcyB8fCAxMylcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVEaXJlY3RpdmUoX19RVUFTQVJfU1NSX1NFUlZFUl9fXG4gID8geyBuYW1lOiAncmlwcGxlJywgZ2V0U1NSUHJvcHMgfVxuICA6IHtcbiAgICAgIG5hbWU6ICdyaXBwbGUnLFxuXG4gICAgICBiZWZvcmVNb3VudCAoZWwsIGJpbmRpbmcpIHtcbiAgICAgICAgY29uc3QgY2ZnID0gYmluZGluZy5pbnN0YW5jZS4kLmFwcENvbnRleHQuY29uZmlnLmdsb2JhbFByb3BlcnRpZXMuJHEuY29uZmlnIHx8IHt9XG5cbiAgICAgICAgaWYgKGNmZy5yaXBwbGUgPT09IGZhbHNlKSByZXR1cm5cblxuICAgICAgICBjb25zdCBjdHggPSB7XG4gICAgICAgICAgY2ZnLFxuICAgICAgICAgIGVuYWJsZWQ6IGJpbmRpbmcudmFsdWUgIT09IGZhbHNlLFxuICAgICAgICAgIG1vZGlmaWVyczoge30sXG4gICAgICAgICAgYWJvcnQ6IFtdLFxuXG4gICAgICAgICAgc3RhcnQgKGV2dCkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBjdHguZW5hYmxlZCA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAmJiBldnQucVNraXBSaXBwbGUgIT09IHRydWVcbiAgICAgICAgICAgICAgJiYgZXZ0LnR5cGUgPT09IChjdHgubW9kaWZpZXJzLmVhcmx5ID09PSB0cnVlID8gJ3BvaW50ZXJkb3duJyA6ICdjbGljaycpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgc2hvd1JpcHBsZShldnQsIGVsLCBjdHgsIGV2dC5xS2V5RXZlbnQgPT09IHRydWUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGtleXN0YXJ0OiB0aHJvdHRsZShldnQgPT4ge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBjdHguZW5hYmxlZCA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAmJiBldnQucVNraXBSaXBwbGUgIT09IHRydWVcbiAgICAgICAgICAgICAgJiYgaXNLZXlDb2RlKGV2dCwgY3R4Lm1vZGlmaWVycy5rZXlDb2RlcykgPT09IHRydWVcbiAgICAgICAgICAgICAgJiYgZXZ0LnR5cGUgPT09IGBrZXkkeyBjdHgubW9kaWZpZXJzLmVhcmx5ID09PSB0cnVlID8gJ2Rvd24nIDogJ3VwJyB9YFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHNob3dSaXBwbGUoZXZ0LCBlbCwgY3R4LCB0cnVlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIDMwMClcbiAgICAgICAgfVxuXG4gICAgICAgIHVwZGF0ZU1vZGlmaWVycyhjdHgsIGJpbmRpbmcpXG5cbiAgICAgICAgZWwuX19xcmlwcGxlID0gY3R4XG5cbiAgICAgICAgYWRkRXZ0KGN0eCwgJ21haW4nLCBbXG4gICAgICAgICAgWyBlbCwgJ3BvaW50ZXJkb3duJywgJ3N0YXJ0JywgJ3Bhc3NpdmUnIF0sXG4gICAgICAgICAgWyBlbCwgJ2NsaWNrJywgJ3N0YXJ0JywgJ3Bhc3NpdmUnIF0sXG4gICAgICAgICAgWyBlbCwgJ2tleWRvd24nLCAna2V5c3RhcnQnLCAncGFzc2l2ZScgXSxcbiAgICAgICAgICBbIGVsLCAna2V5dXAnLCAna2V5c3RhcnQnLCAncGFzc2l2ZScgXVxuICAgICAgICBdKVxuICAgICAgfSxcblxuICAgICAgdXBkYXRlZCAoZWwsIGJpbmRpbmcpIHtcbiAgICAgICAgaWYgKGJpbmRpbmcub2xkVmFsdWUgIT09IGJpbmRpbmcudmFsdWUpIHtcbiAgICAgICAgICBjb25zdCBjdHggPSBlbC5fX3FyaXBwbGVcbiAgICAgICAgICBpZiAoY3R4ICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgIGN0eC5lbmFibGVkID0gYmluZGluZy52YWx1ZSAhPT0gZmFsc2VcblxuICAgICAgICAgICAgaWYgKGN0eC5lbmFibGVkID09PSB0cnVlICYmIE9iamVjdChiaW5kaW5nLnZhbHVlKSA9PT0gYmluZGluZy52YWx1ZSkge1xuICAgICAgICAgICAgICB1cGRhdGVNb2RpZmllcnMoY3R4LCBiaW5kaW5nKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgYmVmb3JlVW5tb3VudCAoZWwpIHtcbiAgICAgICAgY29uc3QgY3R4ID0gZWwuX19xcmlwcGxlXG4gICAgICAgIGlmIChjdHggIT09IHZvaWQgMCkge1xuICAgICAgICAgIGN0eC5hYm9ydC5mb3JFYWNoKGZuID0+IHsgZm4oKSB9KVxuICAgICAgICAgIGNsZWFuRXZ0KGN0eCwgJ21haW4nKVxuICAgICAgICAgIGRlbGV0ZSBlbC5fcXJpcHBsZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuKVxuIl0sIm5hbWVzIjpbImNzcyIsIm1hdGNoZXMiXSwibWFwcGluZ3MiOiI7QUFFTyxNQUFNLGtCQUFrQjtBQUFBLEVBQzdCLElBQUk7QUFBQSxFQUNKLElBQUk7QUFBQSxFQUNKLElBQUk7QUFBQSxFQUNKLElBQUk7QUFBQSxFQUNKLElBQUk7QUFDTjtBQUVZLE1BQUMsZUFBZTtBQUFBLEVBQzFCLE1BQU07QUFDUjtBQUVlLFNBQUEsUUFBVSxPQUFPLFFBQVEsaUJBQWlCO0FBRXZELFNBQU8sU0FBUyxNQUNkLE1BQU0sU0FBUyxTQUNYLEVBQUUsVUFBVSxNQUFNLFFBQVEsUUFBUSxHQUFJLE1BQU8sTUFBTSxJQUFNLENBQUEsT0FBUSxNQUFNLEtBQUksSUFDM0UsSUFDTDtBQUNIO0FDbEJPLE1BQU0sa0JBQWtCO0FBQUEsRUFDN0IsTUFBTTtBQUFBLElBQ0osTUFBTSxDQUFF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
