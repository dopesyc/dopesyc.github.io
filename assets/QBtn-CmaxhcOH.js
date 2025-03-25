import { b as computed, a as createComponent, h, B as withDirectives, g as getCurrentInstance, af as unref, q as createDirective, t as cleanEvt, v as addEvt, G as isKeyCode, z as stop, x as position, r as ref, d as onBeforeUnmount, W as Transition, s as stopAndPrevent, l as listenOpts, y as prevent } from "./index-DrKvdikb.js";
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
const alignMap = {
  left: "start",
  center: "center",
  right: "end",
  between: "between",
  around: "around",
  evenly: "evenly",
  stretch: "stretch"
};
const alignValues = Object.keys(alignMap);
const useAlignProps = {
  align: {
    type: String,
    validator: (v) => alignValues.includes(v)
  }
};
function useAlign(props) {
  return computed(() => {
    const align = props.align === void 0 ? props.vertical === true ? "stretch" : "left" : props.align;
    return `${props.vertical === true ? "items" : "justify"}-${alignMap[align]}`;
  });
}
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
const btnPadding = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32
};
const defaultSizes = {
  xs: 8,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 24
};
const formTypes = ["button", "submit", "reset"];
const mediaTypeRE = /[^\s]\/[^\s]/;
const btnDesignOptions = ["flat", "outline", "push", "unelevated"];
function getBtnDesign(props, defaultValue) {
  if (props.flat === true) return "flat";
  if (props.outline === true) return "outline";
  if (props.push === true) return "push";
  if (props.unelevated === true) return "unelevated";
  return defaultValue;
}
function getBtnDesignAttr(props) {
  const design = getBtnDesign(props);
  return design !== void 0 ? { [design]: true } : {};
}
const nonRoundBtnProps = {
  ...useSizeProps,
  ...useRouterLinkNonMatchingProps,
  type: {
    type: String,
    default: "button"
  },
  label: [Number, String],
  icon: String,
  iconRight: String,
  ...btnDesignOptions.reduce(
    (acc, val) => (acc[val] = Boolean) && acc,
    {}
  ),
  square: Boolean,
  rounded: Boolean,
  glossy: Boolean,
  size: String,
  fab: Boolean,
  fabMini: Boolean,
  padding: String,
  color: String,
  textColor: String,
  noCaps: Boolean,
  noWrap: Boolean,
  dense: Boolean,
  tabindex: [Number, String],
  ripple: {
    type: [Boolean, Object],
    default: true
  },
  align: {
    ...useAlignProps.align,
    default: "center"
  },
  stack: Boolean,
  stretch: Boolean,
  loading: {
    type: Boolean,
    default: null
  },
  disable: Boolean
};
const useBtnProps = {
  ...nonRoundBtnProps,
  round: Boolean
};
function useBtn(props) {
  const sizeStyle = useSize(props, defaultSizes);
  const alignClass = useAlign(props);
  const { hasRouterLink, hasLink, linkTag, linkAttrs, navigateOnClick } = useRouterLink({
    fallbackTag: "button"
  });
  const style = computed(() => {
    const obj = props.fab === false && props.fabMini === false ? sizeStyle.value : {};
    return props.padding !== void 0 ? Object.assign({}, obj, {
      padding: props.padding.split(/\s+/).map((v) => v in btnPadding ? btnPadding[v] + "px" : v).join(" "),
      minWidth: "0",
      minHeight: "0"
    }) : obj;
  });
  const isRounded = computed(
    () => props.rounded === true || props.fab === true || props.fabMini === true
  );
  const isActionable = computed(
    () => props.disable !== true && props.loading !== true
  );
  const tabIndex = computed(() => isActionable.value === true ? props.tabindex || 0 : -1);
  const design = computed(() => getBtnDesign(props, "standard"));
  const attributes = computed(() => {
    const acc = { tabindex: tabIndex.value };
    if (hasLink.value === true) {
      Object.assign(acc, linkAttrs.value);
    } else if (formTypes.includes(props.type) === true) {
      acc.type = props.type;
    }
    if (linkTag.value === "a") {
      if (props.disable === true) {
        acc["aria-disabled"] = "true";
      } else if (acc.href === void 0) {
        acc.role = "button";
      }
      if (hasRouterLink.value !== true && mediaTypeRE.test(props.type) === true) {
        acc.type = props.type;
      }
    } else if (props.disable === true) {
      acc.disabled = "";
      acc["aria-disabled"] = "true";
    }
    if (props.loading === true && props.percentage !== void 0) {
      Object.assign(acc, {
        role: "progressbar",
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-valuenow": props.percentage
      });
    }
    return acc;
  });
  const classes = computed(() => {
    let colors;
    if (props.color !== void 0) {
      if (props.flat === true || props.outline === true) {
        colors = `text-${props.textColor || props.color}`;
      } else {
        colors = `bg-${props.color} text-${props.textColor || "white"}`;
      }
    } else if (props.textColor) {
      colors = `text-${props.textColor}`;
    }
    const shape = props.round === true ? "round" : `rectangle${isRounded.value === true ? " q-btn--rounded" : props.square === true ? " q-btn--square" : ""}`;
    return `q-btn--${design.value} q-btn--${shape}` + (colors !== void 0 ? " " + colors : "") + (isActionable.value === true ? " q-btn--actionable q-focusable q-hoverable" : props.disable === true ? " disabled" : "") + (props.fab === true ? " q-btn--fab" : props.fabMini === true ? " q-btn--fab-mini" : "") + (props.noCaps === true ? " q-btn--no-uppercase" : "") + (props.dense === true ? " q-btn--dense" : "") + (props.stretch === true ? " no-border-radius self-stretch" : "") + (props.glossy === true ? " glossy" : "") + (props.square ? " q-btn--square" : "");
  });
  const innerClasses = computed(
    () => alignClass.value + (props.stack === true ? " column" : " row") + (props.noWrap === true ? " no-wrap text-no-wrap" : "") + (props.loading === true ? " q-btn__content--hidden" : "")
  );
  return {
    classes,
    style,
    innerClasses,
    attributes,
    hasLink,
    linkTag,
    navigateOnClick,
    isActionable
  };
}
const { passiveCapture } = listenOpts;
let touchTarget = null, keyboardTarget = null, mouseTarget = null;
const QBtn = createComponent({
  name: "QBtn",
  props: {
    ...useBtnProps,
    percentage: Number,
    darkPercentage: Boolean,
    onTouchstart: [Function, Array]
  },
  emits: ["click", "keydown", "mousedown", "keyup"],
  setup(props, { slots, emit }) {
    const { proxy } = getCurrentInstance();
    const {
      classes,
      style,
      innerClasses,
      attributes,
      hasLink,
      linkTag,
      navigateOnClick,
      isActionable
    } = useBtn(props);
    const rootRef = ref(null);
    const blurTargetRef = ref(null);
    let localTouchTargetEl = null, avoidMouseRipple, mouseTimer = null;
    const hasLabel = computed(
      () => props.label !== void 0 && props.label !== null && props.label !== ""
    );
    const ripple = computed(() => props.disable === true || props.ripple === false ? false : {
      keyCodes: hasLink.value === true ? [13, 32] : [13],
      ...props.ripple === true ? {} : props.ripple
    });
    const rippleProps = computed(() => ({ center: props.round }));
    const percentageStyle = computed(() => {
      const val = Math.max(0, Math.min(100, props.percentage));
      return val > 0 ? { transition: "transform 0.6s", transform: `translateX(${val - 100}%)` } : {};
    });
    const onEvents = computed(() => {
      if (props.loading === true) {
        return {
          onMousedown: onLoadingEvt,
          onTouchstart: onLoadingEvt,
          onClick: onLoadingEvt,
          onKeydown: onLoadingEvt,
          onKeyup: onLoadingEvt
        };
      }
      if (isActionable.value === true) {
        const acc = {
          onClick,
          onKeydown,
          onMousedown
        };
        if (proxy.$q.platform.has.touch === true) {
          const suffix = props.onTouchstart !== void 0 ? "" : "Passive";
          acc[`onTouchstart${suffix}`] = onTouchstart;
        }
        return acc;
      }
      return {
        // needed; especially for disabled <a> tags
        onClick: stopAndPrevent
      };
    });
    const nodeProps = computed(() => ({
      ref: rootRef,
      class: "q-btn q-btn-item non-selectable no-outline " + classes.value,
      style: style.value,
      ...attributes.value,
      ...onEvents.value
    }));
    function onClick(e) {
      if (rootRef.value === null) return;
      if (e !== void 0) {
        if (e.defaultPrevented === true) return;
        const el = document.activeElement;
        if (props.type === "submit" && el !== document.body && rootRef.value.contains(el) === false && el.contains(rootRef.value) === false) {
          e.qAvoidFocus !== true && rootRef.value.focus();
          const onClickCleanup = () => {
            document.removeEventListener("keydown", stopAndPrevent, true);
            document.removeEventListener("keyup", onClickCleanup, passiveCapture);
            rootRef.value?.removeEventListener("blur", onClickCleanup, passiveCapture);
          };
          document.addEventListener("keydown", stopAndPrevent, true);
          document.addEventListener("keyup", onClickCleanup, passiveCapture);
          rootRef.value.addEventListener("blur", onClickCleanup, passiveCapture);
        }
      }
      navigateOnClick(e);
    }
    function onKeydown(e) {
      if (rootRef.value === null) return;
      emit("keydown", e);
      if (isKeyCode(e, [13, 32]) === true && keyboardTarget !== rootRef.value) {
        keyboardTarget !== null && cleanup();
        if (e.defaultPrevented !== true) {
          e.qAvoidFocus !== true && rootRef.value.focus();
          keyboardTarget = rootRef.value;
          rootRef.value.classList.add("q-btn--active");
          document.addEventListener("keyup", onPressEnd, true);
          rootRef.value.addEventListener("blur", onPressEnd, passiveCapture);
        }
        stopAndPrevent(e);
      }
    }
    function onTouchstart(e) {
      if (rootRef.value === null) return;
      emit("touchstart", e);
      if (e.defaultPrevented === true) return;
      if (touchTarget !== rootRef.value) {
        touchTarget !== null && cleanup();
        touchTarget = rootRef.value;
        localTouchTargetEl = e.target;
        localTouchTargetEl.addEventListener("touchcancel", onPressEnd, passiveCapture);
        localTouchTargetEl.addEventListener("touchend", onPressEnd, passiveCapture);
      }
      avoidMouseRipple = true;
      mouseTimer !== null && clearTimeout(mouseTimer);
      mouseTimer = setTimeout(() => {
        mouseTimer = null;
        avoidMouseRipple = false;
      }, 200);
    }
    function onMousedown(e) {
      if (rootRef.value === null) return;
      e.qSkipRipple = avoidMouseRipple === true;
      emit("mousedown", e);
      if (e.defaultPrevented !== true && mouseTarget !== rootRef.value) {
        mouseTarget !== null && cleanup();
        mouseTarget = rootRef.value;
        rootRef.value.classList.add("q-btn--active");
        document.addEventListener("mouseup", onPressEnd, passiveCapture);
      }
    }
    function onPressEnd(e) {
      if (rootRef.value === null) return;
      if (e?.type === "blur" && document.activeElement === rootRef.value) return;
      if (e?.type === "keyup") {
        if (keyboardTarget === rootRef.value && isKeyCode(e, [13, 32]) === true) {
          const evt = new MouseEvent("click", e);
          evt.qKeyEvent = true;
          e.defaultPrevented === true && prevent(evt);
          e.cancelBubble === true && stop(evt);
          rootRef.value.dispatchEvent(evt);
          stopAndPrevent(e);
          e.qKeyEvent = true;
        }
        emit("keyup", e);
      }
      cleanup();
    }
    function cleanup(destroying) {
      const blurTarget = blurTargetRef.value;
      if (destroying !== true && (touchTarget === rootRef.value || mouseTarget === rootRef.value) && blurTarget !== null && blurTarget !== document.activeElement) {
        blurTarget.setAttribute("tabindex", -1);
        blurTarget.focus();
      }
      if (touchTarget === rootRef.value) {
        if (localTouchTargetEl !== null) {
          localTouchTargetEl.removeEventListener("touchcancel", onPressEnd, passiveCapture);
          localTouchTargetEl.removeEventListener("touchend", onPressEnd, passiveCapture);
        }
        touchTarget = localTouchTargetEl = null;
      }
      if (mouseTarget === rootRef.value) {
        document.removeEventListener("mouseup", onPressEnd, passiveCapture);
        mouseTarget = null;
      }
      if (keyboardTarget === rootRef.value) {
        document.removeEventListener("keyup", onPressEnd, true);
        rootRef.value?.removeEventListener("blur", onPressEnd, passiveCapture);
        keyboardTarget = null;
      }
      rootRef.value?.classList.remove("q-btn--active");
    }
    function onLoadingEvt(evt) {
      stopAndPrevent(evt);
      evt.qSkipRipple = true;
    }
    onBeforeUnmount(() => {
      cleanup(true);
    });
    Object.assign(proxy, {
      click: (e) => {
        if (isActionable.value === true) {
          onClick(e);
        }
      }
    });
    return () => {
      let inner = [];
      props.icon !== void 0 && inner.push(
        h(QIcon, {
          name: props.icon,
          left: props.stack !== true && hasLabel.value === true,
          role: "img"
        })
      );
      hasLabel.value === true && inner.push(
        h("span", { class: "block" }, [props.label])
      );
      inner = hMergeSlot(slots.default, inner);
      if (props.iconRight !== void 0 && props.round === false) {
        inner.push(
          h(QIcon, {
            name: props.iconRight,
            right: props.stack !== true && hasLabel.value === true,
            role: "img"
          })
        );
      }
      const child = [
        h("span", {
          class: "q-focus-helper",
          ref: blurTargetRef
        })
      ];
      if (props.loading === true && props.percentage !== void 0) {
        child.push(
          h("span", {
            class: "q-btn__progress absolute-full overflow-hidden" + (props.darkPercentage === true ? " q-btn__progress--dark" : "")
          }, [
            h("span", {
              class: "q-btn__progress-indicator fit block",
              style: percentageStyle.value
            })
          ])
        );
      }
      child.push(
        h("span", {
          class: "q-btn__content text-center col items-center q-anchor--skip " + innerClasses.value
        }, inner)
      );
      props.loading !== null && child.push(
        h(Transition, {
          name: "q-transition--fade"
        }, () => props.loading === true ? [
          h("span", {
            key: "loading",
            class: "absolute-full flex flex-center"
          }, slots.loading !== void 0 ? slots.loading() : [h(QSpinner)])
        ] : null)
      );
      return withDirectives(
        h(
          linkTag.value,
          nodeProps.value,
          child
        ),
        [[
          Ripple,
          ripple.value,
          void 0,
          rippleProps.value
        ]]
      );
    };
  }
});
export {
  QIcon as Q,
  Ripple as R,
  useSize as a,
  hMergeSlotSafely as b,
  hMergeSlot as c,
  css as d,
  hDir as e,
  useRouterLinkProps as f,
  getElement as g,
  hSlot as h,
  useRouterLink as i,
  hUniqueSlot as j,
  QSpinner as k,
  getParentProxy as l,
  vmIsDestroyed as m,
  childHasFocus as n,
  QBtn as o,
  getBtnDesignAttr as p,
  useSizeProps as u,
  vmHasRouter as v
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUUJ0bi1DbWF4aGNPSC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS51c2Utc2l6ZS91c2Utc2l6ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvc3Bpbm5lci91c2Utc3Bpbm5lci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvc3Bpbm5lci9RU3Bpbm5lci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3ByaXZhdGUudm0vdm0uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2ljb24vUUljb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9kb20vZG9tLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvdGhyb3R0bGUvdGhyb3R0bGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9kaXJlY3RpdmVzL3JpcHBsZS9SaXBwbGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1hbGlnbi91c2UtYWxpZ24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1yb3V0ZXItbGluay91c2Utcm91dGVyLWxpbmsuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2J0bi91c2UtYnRuLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9idG4vUUJ0bi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuZXhwb3J0IGNvbnN0IHVzZVNpemVEZWZhdWx0cyA9IHtcbiAgeHM6IDE4LFxuICBzbTogMjQsXG4gIG1kOiAzMixcbiAgbGc6IDM4LFxuICB4bDogNDZcbn1cblxuZXhwb3J0IGNvbnN0IHVzZVNpemVQcm9wcyA9IHtcbiAgc2l6ZTogU3RyaW5nXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgc2l6ZXMgPSB1c2VTaXplRGVmYXVsdHMpIHtcbiAgLy8gcmV0dXJuIHNpemVTdHlsZVxuICByZXR1cm4gY29tcHV0ZWQoKCkgPT4gKFxuICAgIHByb3BzLnNpemUgIT09IHZvaWQgMFxuICAgICAgPyB7IGZvbnRTaXplOiBwcm9wcy5zaXplIGluIHNpemVzID8gYCR7IHNpemVzWyBwcm9wcy5zaXplIF0gfXB4YCA6IHByb3BzLnNpemUgfVxuICAgICAgOiBudWxsXG4gICkpXG59XG4iLCJpbXBvcnQgeyBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcbmltcG9ydCB7IHVzZVNpemVEZWZhdWx0cyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLXNpemUvdXNlLXNpemUuanMnXG5cbmV4cG9ydCBjb25zdCB1c2VTcGlubmVyUHJvcHMgPSB7XG4gIHNpemU6IHtcbiAgICB0eXBlOiBbIFN0cmluZywgTnVtYmVyIF0sXG4gICAgZGVmYXVsdDogJzFlbSdcbiAgfSxcbiAgY29sb3I6IFN0cmluZ1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1c2VTcGlubmVyIChwcm9wcykge1xuICByZXR1cm4ge1xuICAgIGNTaXplOiBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5zaXplIGluIHVzZVNpemVEZWZhdWx0c1xuICAgICAgICA/IGAkeyB1c2VTaXplRGVmYXVsdHNbIHByb3BzLnNpemUgXSB9cHhgXG4gICAgICAgIDogcHJvcHMuc2l6ZVxuICAgICkpLFxuXG4gICAgY2xhc3NlczogY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLXNwaW5uZXInICsgKHByb3BzLmNvbG9yID8gYCB0ZXh0LSR7IHByb3BzLmNvbG9yIH1gIDogJycpXG4gICAgKVxuICB9XG59XG4iLCJpbXBvcnQgeyBoIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlU3Bpbm5lciwgeyB1c2VTcGlubmVyUHJvcHMgfSBmcm9tICcuL3VzZS1zcGlubmVyLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRU3Bpbm5lcicsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VTcGlubmVyUHJvcHMsXG5cbiAgICB0aGlja25lc3M6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIGRlZmF1bHQ6IDVcbiAgICB9XG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzKSB7XG4gICAgY29uc3QgeyBjU2l6ZSwgY2xhc3NlcyB9ID0gdXNlU3Bpbm5lcihwcm9wcylcblxuICAgIHJldHVybiAoKSA9PiBoKCdzdmcnLCB7XG4gICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSArICcgcS1zcGlubmVyLW1hdCcsXG4gICAgICB3aWR0aDogY1NpemUudmFsdWUsXG4gICAgICBoZWlnaHQ6IGNTaXplLnZhbHVlLFxuICAgICAgdmlld0JveDogJzI1IDI1IDUwIDUwJ1xuICAgIH0sIFtcbiAgICAgIGgoJ2NpcmNsZScsIHtcbiAgICAgICAgY2xhc3M6ICdwYXRoJyxcbiAgICAgICAgY3g6ICc1MCcsXG4gICAgICAgIGN5OiAnNTAnLFxuICAgICAgICByOiAnMjAnLFxuICAgICAgICBmaWxsOiAnbm9uZScsXG4gICAgICAgIHN0cm9rZTogJ2N1cnJlbnRDb2xvcicsXG4gICAgICAgICdzdHJva2Utd2lkdGgnOiBwcm9wcy50aGlja25lc3MsXG4gICAgICAgICdzdHJva2UtbWl0ZXJsaW1pdCc6ICcxMCdcbiAgICAgIH0pXG4gICAgXSlcbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIHdpdGhEaXJlY3RpdmVzIH0gZnJvbSAndnVlJ1xuXG5leHBvcnQgZnVuY3Rpb24gaFNsb3QgKHNsb3QsIG90aGVyd2lzZSkge1xuICByZXR1cm4gc2xvdCAhPT0gdm9pZCAwXG4gICAgPyBzbG90KCkgfHwgb3RoZXJ3aXNlXG4gICAgOiBvdGhlcndpc2Vcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhVbmlxdWVTbG90IChzbG90LCBvdGhlcndpc2UpIHtcbiAgaWYgKHNsb3QgIT09IHZvaWQgMCkge1xuICAgIGNvbnN0IHZub2RlID0gc2xvdCgpXG4gICAgaWYgKHZub2RlICE9PSB2b2lkIDAgJiYgdm5vZGUgIT09IG51bGwpIHtcbiAgICAgIHJldHVybiB2bm9kZS5zbGljZSgpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG90aGVyd2lzZVxufVxuXG4vKipcbiAqIFNvdXJjZSBkZWZpbml0ZWx5IGV4aXN0cyxcbiAqIHNvIGl0J3MgbWVyZ2VkIHdpdGggdGhlIHBvc3NpYmxlIHNsb3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhNZXJnZVNsb3QgKHNsb3QsIHNvdXJjZSkge1xuICByZXR1cm4gc2xvdCAhPT0gdm9pZCAwXG4gICAgPyBzb3VyY2UuY29uY2F0KHNsb3QoKSlcbiAgICA6IHNvdXJjZVxufVxuXG4vKipcbiAqIE1lcmdlIHdpdGggcG9zc2libGUgc2xvdCxcbiAqIGV2ZW4gaWYgc291cmNlIG1pZ2h0IG5vdCBleGlzdFxuICovXG5leHBvcnQgZnVuY3Rpb24gaE1lcmdlU2xvdFNhZmVseSAoc2xvdCwgc291cmNlKSB7XG4gIGlmIChzbG90ID09PSB2b2lkIDApIHtcbiAgICByZXR1cm4gc291cmNlXG4gIH1cblxuICByZXR1cm4gc291cmNlICE9PSB2b2lkIDBcbiAgICA/IHNvdXJjZS5jb25jYXQoc2xvdCgpKVxuICAgIDogc2xvdCgpXG59XG5cbi8qXG4gKiAoU3RyaW5nKSAga2V5ICAgICAgIC0gdW5pcXVlIHZub2RlIGtleVxuICogKEJvb2xlYW4pIGNvbmRpdGlvbiAtIHNob3VsZCBjaGFuZ2UgT05MWSB3aGVuIGFkZGluZy9yZW1vdmluZyBkaXJlY3RpdmVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhEaXIgKFxuICB0YWcsXG4gIGRhdGEsXG4gIGNoaWxkcmVuLFxuICBrZXksXG4gIGNvbmRpdGlvbixcbiAgZ2V0RGlyc0ZuXG4pIHtcbiAgZGF0YS5rZXkgPSBrZXkgKyBjb25kaXRpb25cblxuICBjb25zdCB2bm9kZSA9IGgodGFnLCBkYXRhLCBjaGlsZHJlbilcblxuICByZXR1cm4gY29uZGl0aW9uID09PSB0cnVlXG4gICAgPyB3aXRoRGlyZWN0aXZlcyh2bm9kZSwgZ2V0RGlyc0ZuKCkpXG4gICAgOiB2bm9kZVxufVxuIiwiLy8gY29waWVkIHRvIGRvY3MgdG9vXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGFyZW50UHJveHkgKHByb3h5KSB7XG4gIGlmIChPYmplY3QocHJveHkuJHBhcmVudCkgPT09IHByb3h5LiRwYXJlbnQpIHtcbiAgICByZXR1cm4gcHJveHkuJHBhcmVudFxuICB9XG5cbiAgbGV0IHsgcGFyZW50IH0gPSBwcm94eS4kXG5cbiAgd2hpbGUgKE9iamVjdChwYXJlbnQpID09PSBwYXJlbnQpIHtcbiAgICBpZiAoT2JqZWN0KHBhcmVudC5wcm94eSkgPT09IHBhcmVudC5wcm94eSkge1xuICAgICAgcmV0dXJuIHBhcmVudC5wcm94eVxuICAgIH1cblxuICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRcbiAgfVxufVxuXG5mdW5jdGlvbiBmaWxsTm9ybWFsaXplZFZOb2RlcyAoY2hpbGRyZW4sIHZub2RlKSB7XG4gIGlmICh0eXBlb2Ygdm5vZGUudHlwZSA9PT0gJ3N5bWJvbCcpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2bm9kZS5jaGlsZHJlbikgPT09IHRydWUpIHtcbiAgICAgIHZub2RlLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICBmaWxsTm9ybWFsaXplZFZOb2RlcyhjaGlsZHJlbiwgY2hpbGQpXG4gICAgICB9KVxuICAgIH1cbiAgfVxuICBlbHNlIHtcbiAgICBjaGlsZHJlbi5hZGQodm5vZGUpXG4gIH1cbn1cblxuLy8gdm5vZGVzIGZyb20gcmVuZGVyZWQgaW4gYWR2YW5jZWQgc2xvdHNcbmV4cG9ydCBmdW5jdGlvbiBnZXROb3JtYWxpemVkVk5vZGVzICh2bm9kZXMpIHtcbiAgY29uc3QgY2hpbGRyZW4gPSBuZXcgU2V0KClcblxuICB2bm9kZXMuZm9yRWFjaCh2bm9kZSA9PiB7XG4gICAgZmlsbE5vcm1hbGl6ZWRWTm9kZXMoY2hpbGRyZW4sIHZub2RlKVxuICB9KVxuXG4gIHJldHVybiBBcnJheS5mcm9tKGNoaWxkcmVuKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdm1IYXNSb3V0ZXIgKHZtKSB7XG4gIHJldHVybiB2bS5hcHBDb250ZXh0LmNvbmZpZy5nbG9iYWxQcm9wZXJ0aWVzLiRyb3V0ZXIgIT09IHZvaWQgMFxufVxuXG5leHBvcnQgZnVuY3Rpb24gdm1Jc0Rlc3Ryb3llZCAodm0pIHtcbiAgcmV0dXJuIHZtLmlzVW5tb3VudGVkID09PSB0cnVlIHx8IHZtLmlzRGVhY3RpdmF0ZWQgPT09IHRydWVcbn1cbiIsImltcG9ydCB7IGgsIGNvbXB1dGVkLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VTaXplLCB7IHVzZVNpemVQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLXNpemUvdXNlLXNpemUuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90LCBoTWVyZ2VTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5yZW5kZXIvcmVuZGVyLmpzJ1xuXG5jb25zdCBkZWZhdWx0Vmlld0JveCA9ICcwIDAgMjQgMjQnXG5cbmNvbnN0IHNhbWVGbiA9IGkgPT4gaVxuY29uc3QgaW9uRm4gPSBpID0+IGBpb25pY29ucyAkeyBpIH1gXG5cbmNvbnN0IGxpYk1hcCA9IHtcbiAgJ21kaS0nOiBpID0+IGBtZGkgJHsgaSB9YCxcbiAgJ2ljb24tJzogc2FtZUZuLCAvLyBmb250YXdlc29tZSBlcXVpdlxuICAnYnQtJzogaSA9PiBgYnQgJHsgaSB9YCxcbiAgJ2V2YS0nOiBpID0+IGBldmEgJHsgaSB9YCxcbiAgJ2lvbi1tZCc6IGlvbkZuLFxuICAnaW9uLWlvcyc6IGlvbkZuLFxuICAnaW9uLWxvZ28nOiBpb25GbixcbiAgJ2ljb25mb250ICc6IHNhbWVGbixcbiAgJ3RpLSc6IGkgPT4gYHRoZW1pZnktaWNvbiAkeyBpIH1gLFxuICAnYmktJzogaSA9PiBgYm9vdHN0cmFwLWljb25zICR7IGkgfWAsXG4gICdpLSc6IHNhbWVGbiAvLyBVbm9DU1MgcHVyZSBpY29uc1xufVxuXG5jb25zdCBtYXRNYXAgPSB7XG4gIG9fOiAnLW91dGxpbmVkJyxcbiAgcl86ICctcm91bmQnLFxuICBzXzogJy1zaGFycCdcbn1cblxuY29uc3Qgc3ltTWFwID0ge1xuICBzeW1fb186ICctb3V0bGluZWQnLFxuICBzeW1fcl86ICctcm91bmRlZCcsXG4gIHN5bV9zXzogJy1zaGFycCdcbn1cblxuY29uc3QgbGliUkUgPSBuZXcgUmVnRXhwKCdeKCcgKyBPYmplY3Qua2V5cyhsaWJNYXApLmpvaW4oJ3wnKSArICcpJylcbmNvbnN0IG1hdFJFID0gbmV3IFJlZ0V4cCgnXignICsgT2JqZWN0LmtleXMobWF0TWFwKS5qb2luKCd8JykgKyAnKScpXG5jb25zdCBzeW1SRSA9IG5ldyBSZWdFeHAoJ14oJyArIE9iamVjdC5rZXlzKHN5bU1hcCkuam9pbignfCcpICsgJyknKVxuY29uc3QgbVJFID0gL15bTW1dXFxzP1stK10/XFwuP1xcZC9cbmNvbnN0IGltZ1JFID0gL15pbWc6L1xuY29uc3Qgc3ZnVXNlUkUgPSAvXnN2Z3VzZTovXG5jb25zdCBpb25SRSA9IC9eaW9uLS9cbmNvbnN0IGZhUkUgPSAvXihmYS0oY2xhc3NpY3xzaGFycHxzb2xpZHxyZWd1bGFyfGxpZ2h0fGJyYW5kc3xkdW90b25lfHRoaW4pfFtsZl1hW3NybGJka10/KSAvXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRSWNvbicsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VTaXplUHJvcHMsXG5cbiAgICB0YWc6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdpJ1xuICAgIH0sXG5cbiAgICBuYW1lOiBTdHJpbmcsXG4gICAgY29sb3I6IFN0cmluZyxcbiAgICBsZWZ0OiBCb29sZWFuLFxuICAgIHJpZ2h0OiBCb29sZWFuXG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCB7IHByb3h5OiB7ICRxIH0gfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3Qgc2l6ZVN0eWxlID0gdXNlU2l6ZShwcm9wcylcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtaWNvbidcbiAgICAgICsgKHByb3BzLmxlZnQgPT09IHRydWUgPyAnIG9uLWxlZnQnIDogJycpIC8vIFRPRE8gUXYzOiBkcm9wIHRoaXNcbiAgICAgICsgKHByb3BzLnJpZ2h0ID09PSB0cnVlID8gJyBvbi1yaWdodCcgOiAnJylcbiAgICAgICsgKHByb3BzLmNvbG9yICE9PSB2b2lkIDAgPyBgIHRleHQtJHsgcHJvcHMuY29sb3IgfWAgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCB0eXBlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgbGV0IGNsc1xuICAgICAgbGV0IGljb24gPSBwcm9wcy5uYW1lXG5cbiAgICAgIGlmIChpY29uID09PSAnbm9uZScgfHwgIWljb24pIHtcbiAgICAgICAgcmV0dXJuIHsgbm9uZTogdHJ1ZSB9XG4gICAgICB9XG5cbiAgICAgIGlmICgkcS5pY29uTWFwRm4gIT09IG51bGwpIHtcbiAgICAgICAgY29uc3QgcmVzID0gJHEuaWNvbk1hcEZuKGljb24pXG4gICAgICAgIGlmIChyZXMgIT09IHZvaWQgMCkge1xuICAgICAgICAgIGlmIChyZXMuaWNvbiAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICBpY29uID0gcmVzLmljb25cbiAgICAgICAgICAgIGlmIChpY29uID09PSAnbm9uZScgfHwgIWljb24pIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHsgbm9uZTogdHJ1ZSB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgY2xzOiByZXMuY2xzLFxuICAgICAgICAgICAgICBjb250ZW50OiByZXMuY29udGVudCAhPT0gdm9pZCAwXG4gICAgICAgICAgICAgICAgPyByZXMuY29udGVudFxuICAgICAgICAgICAgICAgIDogJyAnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtUkUudGVzdChpY29uKSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBbIGRlZiwgdmlld0JveCA9IGRlZmF1bHRWaWV3Qm94IF0gPSBpY29uLnNwbGl0KCd8JylcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHN2ZzogdHJ1ZSxcbiAgICAgICAgICB2aWV3Qm94LFxuICAgICAgICAgIG5vZGVzOiBkZWYuc3BsaXQoJyYmJykubWFwKHBhdGggPT4ge1xuICAgICAgICAgICAgY29uc3QgWyBkLCBzdHlsZSwgdHJhbnNmb3JtIF0gPSBwYXRoLnNwbGl0KCdAQCcpXG4gICAgICAgICAgICByZXR1cm4gaCgncGF0aCcsIHsgc3R5bGUsIGQsIHRyYW5zZm9ybSB9KVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGltZ1JFLnRlc3QoaWNvbikgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBpbWc6IHRydWUsXG4gICAgICAgICAgc3JjOiBpY29uLnN1YnN0cmluZyg0KVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdmdVc2VSRS50ZXN0KGljb24pID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IFsgZGVmLCB2aWV3Qm94ID0gZGVmYXVsdFZpZXdCb3ggXSA9IGljb24uc3BsaXQoJ3wnKVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc3ZndXNlOiB0cnVlLFxuICAgICAgICAgIHNyYzogZGVmLnN1YnN0cmluZyg3KSxcbiAgICAgICAgICB2aWV3Qm94XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGV0IGNvbnRlbnQgPSAnICdcbiAgICAgIGNvbnN0IG1hdGNoZXMgPSBpY29uLm1hdGNoKGxpYlJFKVxuXG4gICAgICBpZiAobWF0Y2hlcyAhPT0gbnVsbCkge1xuICAgICAgICBjbHMgPSBsaWJNYXBbIG1hdGNoZXNbIDEgXSBdKGljb24pXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChmYVJFLnRlc3QoaWNvbikgPT09IHRydWUpIHtcbiAgICAgICAgY2xzID0gaWNvblxuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaW9uUkUudGVzdChpY29uKSA9PT0gdHJ1ZSkge1xuICAgICAgICBjbHMgPSBgaW9uaWNvbnMgaW9uLSR7ICRxLnBsYXRmb3JtLmlzLmlvcyA9PT0gdHJ1ZSA/ICdpb3MnIDogJ21kJyB9JHsgaWNvbi5zdWJzdHJpbmcoMykgfWBcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHN5bVJFLnRlc3QoaWNvbikgPT09IHRydWUpIHtcbiAgICAgICAgLy8gXCJub3RyYW5zbGF0ZVwiIGNsYXNzIGlzIGZvciBHb29nbGUgVHJhbnNsYXRlXG4gICAgICAgIC8vIHRvIGF2b2lkIHRhbXBlcmluZyB3aXRoIE1hdGVyaWFsIFN5bWJvbHMgbGlnYXR1cmUgZm9udFxuICAgICAgICAvL1xuICAgICAgICAvLyBDYXV0aW9uOiBUbyBiZSBhYmxlIHRvIGFkZCBzdWZmaXggdG8gdGhlIGNsYXNzIG5hbWUsXG4gICAgICAgIC8vIGtlZXAgdGhlICdtYXRlcmlhbC1zeW1ib2xzJyBhdCB0aGUgZW5kIG9mIHRoZSBzdHJpbmcuXG4gICAgICAgIGNscyA9ICdub3RyYW5zbGF0ZSBtYXRlcmlhbC1zeW1ib2xzJ1xuXG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSBpY29uLm1hdGNoKHN5bVJFKVxuICAgICAgICBpZiAobWF0Y2hlcyAhPT0gbnVsbCkge1xuICAgICAgICAgIGljb24gPSBpY29uLnN1YnN0cmluZyg2KVxuICAgICAgICAgIGNscyArPSBzeW1NYXBbIG1hdGNoZXNbIDEgXSBdXG4gICAgICAgIH1cblxuICAgICAgICBjb250ZW50ID0gaWNvblxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIC8vIFwibm90cmFuc2xhdGVcIiBjbGFzcyBpcyBmb3IgR29vZ2xlIFRyYW5zbGF0ZVxuICAgICAgICAvLyB0byBhdm9pZCB0YW1wZXJpbmcgd2l0aCBNYXRlcmlhbCBJY29ucyBsaWdhdHVyZSBmb250XG4gICAgICAgIC8vXG4gICAgICAgIC8vIENhdXRpb246IFRvIGJlIGFibGUgdG8gYWRkIHN1ZmZpeCB0byB0aGUgY2xhc3MgbmFtZSxcbiAgICAgICAgLy8ga2VlcCB0aGUgJ21hdGVyaWFsLWljb25zJyBhdCB0aGUgZW5kIG9mIHRoZSBzdHJpbmcuXG4gICAgICAgIGNscyA9ICdub3RyYW5zbGF0ZSBtYXRlcmlhbC1pY29ucydcblxuICAgICAgICBjb25zdCBtYXRjaGVzID0gaWNvbi5tYXRjaChtYXRSRSlcbiAgICAgICAgaWYgKG1hdGNoZXMgIT09IG51bGwpIHtcbiAgICAgICAgICBpY29uID0gaWNvbi5zdWJzdHJpbmcoMilcbiAgICAgICAgICBjbHMgKz0gbWF0TWFwWyBtYXRjaGVzWyAxIF0gXVxuICAgICAgICB9XG5cbiAgICAgICAgY29udGVudCA9IGljb25cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY2xzLFxuICAgICAgICBjb250ZW50XG4gICAgICB9XG4gICAgfSlcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgICAgc3R5bGU6IHNpemVTdHlsZS52YWx1ZSxcbiAgICAgICAgJ2FyaWEtaGlkZGVuJzogJ3RydWUnLFxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZS52YWx1ZS5ub25lID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBoKHByb3BzLnRhZywgZGF0YSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlLnZhbHVlLmltZyA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gaChwcm9wcy50YWcsIGRhdGEsIGhNZXJnZVNsb3Qoc2xvdHMuZGVmYXVsdCwgW1xuICAgICAgICAgIGgoJ2ltZycsIHsgc3JjOiB0eXBlLnZhbHVlLnNyYyB9KVxuICAgICAgICBdKSlcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGUudmFsdWUuc3ZnID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBoKHByb3BzLnRhZywgZGF0YSwgaE1lcmdlU2xvdChzbG90cy5kZWZhdWx0LCBbXG4gICAgICAgICAgaCgnc3ZnJywge1xuICAgICAgICAgICAgdmlld0JveDogdHlwZS52YWx1ZS52aWV3Qm94IHx8ICcwIDAgMjQgMjQnXG4gICAgICAgICAgfSwgdHlwZS52YWx1ZS5ub2RlcylcbiAgICAgICAgXSkpXG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlLnZhbHVlLnN2Z3VzZSA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gaChwcm9wcy50YWcsIGRhdGEsIGhNZXJnZVNsb3Qoc2xvdHMuZGVmYXVsdCwgW1xuICAgICAgICAgIGgoJ3N2ZycsIHtcbiAgICAgICAgICAgIHZpZXdCb3g6IHR5cGUudmFsdWUudmlld0JveFxuICAgICAgICAgIH0sIFtcbiAgICAgICAgICAgIGgoJ3VzZScsIHsgJ3hsaW5rOmhyZWYnOiB0eXBlLnZhbHVlLnNyYyB9KVxuICAgICAgICAgIF0pXG4gICAgICAgIF0pKVxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZS52YWx1ZS5jbHMgIT09IHZvaWQgMCkge1xuICAgICAgICBkYXRhLmNsYXNzICs9ICcgJyArIHR5cGUudmFsdWUuY2xzXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoKHByb3BzLnRhZywgZGF0YSwgaE1lcmdlU2xvdChzbG90cy5kZWZhdWx0LCBbXG4gICAgICAgIHR5cGUudmFsdWUuY29udGVudFxuICAgICAgXSkpXG4gICAgfVxuICB9XG59KVxuIiwiaW1wb3J0IHsgdW5yZWYgfSBmcm9tICd2dWUnXG5cbmV4cG9ydCBmdW5jdGlvbiBvZmZzZXQgKGVsKSB7XG4gIGlmIChlbCA9PT0gd2luZG93KSB7XG4gICAgcmV0dXJuIHsgdG9wOiAwLCBsZWZ0OiAwIH1cbiAgfVxuICBjb25zdCB7IHRvcCwgbGVmdCB9ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgcmV0dXJuIHsgdG9wLCBsZWZ0IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0eWxlIChlbCwgcHJvcGVydHkpIHtcbiAgcmV0dXJuIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKS5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaGVpZ2h0IChlbCkge1xuICByZXR1cm4gZWwgPT09IHdpbmRvd1xuICAgID8gd2luZG93LmlubmVySGVpZ2h0XG4gICAgOiBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdpZHRoIChlbCkge1xuICByZXR1cm4gZWwgPT09IHdpbmRvd1xuICAgID8gd2luZG93LmlubmVyV2lkdGhcbiAgICA6IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjc3MgKGVsZW1lbnQsIGNzcykge1xuICBjb25zdCBzdHlsZSA9IGVsZW1lbnQuc3R5bGVcblxuICBmb3IgKGNvbnN0IHByb3AgaW4gY3NzKSB7XG4gICAgc3R5bGVbIHByb3AgXSA9IGNzc1sgcHJvcCBdXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNzc0JhdGNoIChlbGVtZW50cywgc3R5bGUpIHtcbiAgZWxlbWVudHMuZm9yRWFjaChlbCA9PiBjc3MoZWwsIHN0eWxlKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlYWR5IChmbikge1xuICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSByZXR1cm5cblxuICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSAhPT0gJ2xvYWRpbmcnKSB7XG4gICAgcmV0dXJuIGZuKClcbiAgfVxuXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmbiwgZmFsc2UpXG59XG5cbi8vIGludGVybmFsXG5leHBvcnQgZnVuY3Rpb24gZ2V0RWxlbWVudCAoZWwpIHtcbiAgaWYgKGVsID09PSB2b2lkIDAgfHwgZWwgPT09IG51bGwpIHtcbiAgICByZXR1cm4gdm9pZCAwXG4gIH1cblxuICBpZiAodHlwZW9mIGVsID09PSAnc3RyaW5nJykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbCkgfHwgdm9pZCAwXG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB2b2lkIDBcbiAgICB9XG4gIH1cblxuICBjb25zdCB0YXJnZXQgPSB1bnJlZihlbClcbiAgaWYgKHRhcmdldCkge1xuICAgIHJldHVybiB0YXJnZXQuJGVsIHx8IHRhcmdldFxuICB9XG59XG5cbi8vIGludGVybmFsXG5leHBvcnQgZnVuY3Rpb24gY2hpbGRIYXNGb2N1cyAoZWwsIGZvY3VzZWRFbCkge1xuICBpZiAoZWwgPT09IHZvaWQgMCB8fCBlbCA9PT0gbnVsbCB8fCBlbC5jb250YWlucyhmb2N1c2VkRWwpID09PSB0cnVlKSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGZvciAobGV0IG5leHQgPSBlbC5uZXh0RWxlbWVudFNpYmxpbmc7IG5leHQgIT09IG51bGw7IG5leHQgPSBuZXh0Lm5leHRFbGVtZW50U2libGluZykge1xuICAgIGlmIChuZXh0LmNvbnRhaW5zKGZvY3VzZWRFbCkpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgb2Zmc2V0LFxuICBzdHlsZSxcbiAgaGVpZ2h0LFxuICB3aWR0aCxcbiAgY3NzLFxuICBjc3NCYXRjaCxcbiAgcmVhZHlcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChmbiwgbGltaXQgPSAyNTApIHtcbiAgbGV0IHdhaXQgPSBmYWxzZSwgcmVzdWx0XG5cbiAgcmV0dXJuIGZ1bmN0aW9uICgvKiAuLi5hcmdzICovKSB7XG4gICAgaWYgKHdhaXQgPT09IGZhbHNlKSB7XG4gICAgICB3YWl0ID0gdHJ1ZVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7IHdhaXQgPSBmYWxzZSB9LCBsaW1pdClcbiAgICAgIHJlc3VsdCA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cbn1cbiIsImltcG9ydCB7IGNyZWF0ZURpcmVjdGl2ZSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGNzcyB9IGZyb20gJy4uLy4uL3V0aWxzL2RvbS9kb20uanMnXG5pbXBvcnQgeyBwb3NpdGlvbiwgc3RvcCwgYWRkRXZ0LCBjbGVhbkV2dCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50L2V2ZW50LmpzJ1xuaW1wb3J0IHsgaXNLZXlDb2RlIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5rZXlib2FyZC9rZXktY29tcG9zaXRpb24uanMnXG5pbXBvcnQgdGhyb3R0bGUgZnJvbSAnLi4vLi4vdXRpbHMvdGhyb3R0bGUvdGhyb3R0bGUuanMnXG5pbXBvcnQgZ2V0U1NSUHJvcHMgZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5ub29wLXNzci1kaXJlY3RpdmUtdHJhbnNmb3JtL25vb3Atc3NyLWRpcmVjdGl2ZS10cmFuc2Zvcm0uanMnXG5cbmZ1bmN0aW9uIHNob3dSaXBwbGUgKGV2dCwgZWwsIGN0eCwgZm9yY2VDZW50ZXIpIHtcbiAgY3R4Lm1vZGlmaWVycy5zdG9wID09PSB0cnVlICYmIHN0b3AoZXZ0KVxuXG4gIGNvbnN0IGNvbG9yID0gY3R4Lm1vZGlmaWVycy5jb2xvclxuICBsZXQgY2VudGVyID0gY3R4Lm1vZGlmaWVycy5jZW50ZXJcbiAgY2VudGVyID0gY2VudGVyID09PSB0cnVlIHx8IGZvcmNlQ2VudGVyID09PSB0cnVlXG5cbiAgY29uc3RcbiAgICBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpLFxuICAgIGlubmVyTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKSxcbiAgICBwb3MgPSBwb3NpdGlvbihldnQpLFxuICAgIHsgbGVmdCwgdG9wLCB3aWR0aCwgaGVpZ2h0IH0gPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICBkaWFtZXRlciA9IE1hdGguc3FydCh3aWR0aCAqIHdpZHRoICsgaGVpZ2h0ICogaGVpZ2h0KSxcbiAgICByYWRpdXMgPSBkaWFtZXRlciAvIDIsXG4gICAgY2VudGVyWCA9IGAkeyAod2lkdGggLSBkaWFtZXRlcikgLyAyIH1weGAsXG4gICAgeCA9IGNlbnRlciA/IGNlbnRlclggOiBgJHsgcG9zLmxlZnQgLSBsZWZ0IC0gcmFkaXVzIH1weGAsXG4gICAgY2VudGVyWSA9IGAkeyAoaGVpZ2h0IC0gZGlhbWV0ZXIpIC8gMiB9cHhgLFxuICAgIHkgPSBjZW50ZXIgPyBjZW50ZXJZIDogYCR7IHBvcy50b3AgLSB0b3AgLSByYWRpdXMgfXB4YFxuXG4gIGlubmVyTm9kZS5jbGFzc05hbWUgPSAncS1yaXBwbGVfX2lubmVyJ1xuICBjc3MoaW5uZXJOb2RlLCB7XG4gICAgaGVpZ2h0OiBgJHsgZGlhbWV0ZXIgfXB4YCxcbiAgICB3aWR0aDogYCR7IGRpYW1ldGVyIH1weGAsXG4gICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoJHsgeCB9LCR7IHkgfSwwKSBzY2FsZTNkKC4yLC4yLDEpYCxcbiAgICBvcGFjaXR5OiAwXG4gIH0pXG5cbiAgbm9kZS5jbGFzc05hbWUgPSBgcS1yaXBwbGUkeyBjb2xvciA/ICcgdGV4dC0nICsgY29sb3IgOiAnJyB9YFxuICBub2RlLnNldEF0dHJpYnV0ZSgnZGlyJywgJ2x0cicpXG4gIG5vZGUuYXBwZW5kQ2hpbGQoaW5uZXJOb2RlKVxuICBlbC5hcHBlbmRDaGlsZChub2RlKVxuXG4gIGNvbnN0IGFib3J0ID0gKCkgPT4ge1xuICAgIG5vZGUucmVtb3ZlKClcbiAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gIH1cbiAgY3R4LmFib3J0LnB1c2goYWJvcnQpXG5cbiAgbGV0IHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgaW5uZXJOb2RlLmNsYXNzTGlzdC5hZGQoJ3EtcmlwcGxlX19pbm5lci0tZW50ZXInKVxuICAgIGlubmVyTm9kZS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoJHsgY2VudGVyWCB9LCR7IGNlbnRlclkgfSwwKSBzY2FsZTNkKDEsMSwxKWBcbiAgICBpbm5lck5vZGUuc3R5bGUub3BhY2l0eSA9IDAuMlxuXG4gICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlubmVyTm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdxLXJpcHBsZV9faW5uZXItLWVudGVyJylcbiAgICAgIGlubmVyTm9kZS5jbGFzc0xpc3QuYWRkKCdxLXJpcHBsZV9faW5uZXItLWxlYXZlJylcbiAgICAgIGlubmVyTm9kZS5zdHlsZS5vcGFjaXR5ID0gMFxuXG4gICAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBub2RlLnJlbW92ZSgpXG4gICAgICAgIGN0eC5hYm9ydC5zcGxpY2UoY3R4LmFib3J0LmluZGV4T2YoYWJvcnQpLCAxKVxuICAgICAgfSwgMjc1KVxuICAgIH0sIDI1MClcbiAgfSwgNTApXG59XG5cbmZ1bmN0aW9uIHVwZGF0ZU1vZGlmaWVycyAoY3R4LCB7IG1vZGlmaWVycywgdmFsdWUsIGFyZyB9KSB7XG4gIGNvbnN0IGNmZyA9IE9iamVjdC5hc3NpZ24oe30sIGN0eC5jZmcucmlwcGxlLCBtb2RpZmllcnMsIHZhbHVlKVxuICBjdHgubW9kaWZpZXJzID0ge1xuICAgIGVhcmx5OiBjZmcuZWFybHkgPT09IHRydWUsXG4gICAgc3RvcDogY2ZnLnN0b3AgPT09IHRydWUsXG4gICAgY2VudGVyOiBjZmcuY2VudGVyID09PSB0cnVlLFxuICAgIGNvbG9yOiBjZmcuY29sb3IgfHwgYXJnLFxuICAgIGtleUNvZGVzOiBbXS5jb25jYXQoY2ZnLmtleUNvZGVzIHx8IDEzKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZURpcmVjdGl2ZShfX1FVQVNBUl9TU1JfU0VSVkVSX19cbiAgPyB7IG5hbWU6ICdyaXBwbGUnLCBnZXRTU1JQcm9wcyB9XG4gIDoge1xuICAgICAgbmFtZTogJ3JpcHBsZScsXG5cbiAgICAgIGJlZm9yZU1vdW50IChlbCwgYmluZGluZykge1xuICAgICAgICBjb25zdCBjZmcgPSBiaW5kaW5nLmluc3RhbmNlLiQuYXBwQ29udGV4dC5jb25maWcuZ2xvYmFsUHJvcGVydGllcy4kcS5jb25maWcgfHwge31cblxuICAgICAgICBpZiAoY2ZnLnJpcHBsZSA9PT0gZmFsc2UpIHJldHVyblxuXG4gICAgICAgIGNvbnN0IGN0eCA9IHtcbiAgICAgICAgICBjZmcsXG4gICAgICAgICAgZW5hYmxlZDogYmluZGluZy52YWx1ZSAhPT0gZmFsc2UsXG4gICAgICAgICAgbW9kaWZpZXJzOiB7fSxcbiAgICAgICAgICBhYm9ydDogW10sXG5cbiAgICAgICAgICBzdGFydCAoZXZ0KSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGN0eC5lbmFibGVkID09PSB0cnVlXG4gICAgICAgICAgICAgICYmIGV2dC5xU2tpcFJpcHBsZSAhPT0gdHJ1ZVxuICAgICAgICAgICAgICAmJiBldnQudHlwZSA9PT0gKGN0eC5tb2RpZmllcnMuZWFybHkgPT09IHRydWUgPyAncG9pbnRlcmRvd24nIDogJ2NsaWNrJylcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBzaG93UmlwcGxlKGV2dCwgZWwsIGN0eCwgZXZ0LnFLZXlFdmVudCA9PT0gdHJ1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAga2V5c3RhcnQ6IHRocm90dGxlKGV2dCA9PiB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGN0eC5lbmFibGVkID09PSB0cnVlXG4gICAgICAgICAgICAgICYmIGV2dC5xU2tpcFJpcHBsZSAhPT0gdHJ1ZVxuICAgICAgICAgICAgICAmJiBpc0tleUNvZGUoZXZ0LCBjdHgubW9kaWZpZXJzLmtleUNvZGVzKSA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAmJiBldnQudHlwZSA9PT0gYGtleSR7IGN0eC5tb2RpZmllcnMuZWFybHkgPT09IHRydWUgPyAnZG93bicgOiAndXAnIH1gXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgc2hvd1JpcHBsZShldnQsIGVsLCBjdHgsIHRydWUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgMzAwKVxuICAgICAgICB9XG5cbiAgICAgICAgdXBkYXRlTW9kaWZpZXJzKGN0eCwgYmluZGluZylcblxuICAgICAgICBlbC5fX3FyaXBwbGUgPSBjdHhcblxuICAgICAgICBhZGRFdnQoY3R4LCAnbWFpbicsIFtcbiAgICAgICAgICBbIGVsLCAncG9pbnRlcmRvd24nLCAnc3RhcnQnLCAncGFzc2l2ZScgXSxcbiAgICAgICAgICBbIGVsLCAnY2xpY2snLCAnc3RhcnQnLCAncGFzc2l2ZScgXSxcbiAgICAgICAgICBbIGVsLCAna2V5ZG93bicsICdrZXlzdGFydCcsICdwYXNzaXZlJyBdLFxuICAgICAgICAgIFsgZWwsICdrZXl1cCcsICdrZXlzdGFydCcsICdwYXNzaXZlJyBdXG4gICAgICAgIF0pXG4gICAgICB9LFxuXG4gICAgICB1cGRhdGVkIChlbCwgYmluZGluZykge1xuICAgICAgICBpZiAoYmluZGluZy5vbGRWYWx1ZSAhPT0gYmluZGluZy52YWx1ZSkge1xuICAgICAgICAgIGNvbnN0IGN0eCA9IGVsLl9fcXJpcHBsZVxuICAgICAgICAgIGlmIChjdHggIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgY3R4LmVuYWJsZWQgPSBiaW5kaW5nLnZhbHVlICE9PSBmYWxzZVxuXG4gICAgICAgICAgICBpZiAoY3R4LmVuYWJsZWQgPT09IHRydWUgJiYgT2JqZWN0KGJpbmRpbmcudmFsdWUpID09PSBiaW5kaW5nLnZhbHVlKSB7XG4gICAgICAgICAgICAgIHVwZGF0ZU1vZGlmaWVycyhjdHgsIGJpbmRpbmcpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICBiZWZvcmVVbm1vdW50IChlbCkge1xuICAgICAgICBjb25zdCBjdHggPSBlbC5fX3FyaXBwbGVcbiAgICAgICAgaWYgKGN0eCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgY3R4LmFib3J0LmZvckVhY2goZm4gPT4geyBmbigpIH0pXG4gICAgICAgICAgY2xlYW5FdnQoY3R4LCAnbWFpbicpXG4gICAgICAgICAgZGVsZXRlIGVsLl9xcmlwcGxlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4pXG4iLCJpbXBvcnQgeyBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuZXhwb3J0IGNvbnN0IGFsaWduTWFwID0ge1xuICBsZWZ0OiAnc3RhcnQnLFxuICBjZW50ZXI6ICdjZW50ZXInLFxuICByaWdodDogJ2VuZCcsXG4gIGJldHdlZW46ICdiZXR3ZWVuJyxcbiAgYXJvdW5kOiAnYXJvdW5kJyxcbiAgZXZlbmx5OiAnZXZlbmx5JyxcbiAgc3RyZXRjaDogJ3N0cmV0Y2gnXG59XG5cbmV4cG9ydCBjb25zdCBhbGlnblZhbHVlcyA9IE9iamVjdC5rZXlzKGFsaWduTWFwKVxuXG5leHBvcnQgY29uc3QgdXNlQWxpZ25Qcm9wcyA9IHtcbiAgYWxpZ246IHtcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgdmFsaWRhdG9yOiB2ID0+IGFsaWduVmFsdWVzLmluY2x1ZGVzKHYpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzKSB7XG4gIC8vIHJldHVybiBhbGlnbkNsYXNzXG4gIHJldHVybiBjb21wdXRlZCgoKSA9PiB7XG4gICAgY29uc3QgYWxpZ24gPSBwcm9wcy5hbGlnbiA9PT0gdm9pZCAwXG4gICAgICA/IHByb3BzLnZlcnRpY2FsID09PSB0cnVlID8gJ3N0cmV0Y2gnIDogJ2xlZnQnXG4gICAgICA6IHByb3BzLmFsaWduXG5cbiAgICByZXR1cm4gYCR7IHByb3BzLnZlcnRpY2FsID09PSB0cnVlID8gJ2l0ZW1zJyA6ICdqdXN0aWZ5JyB9LSR7IGFsaWduTWFwWyBhbGlnbiBdIH1gXG4gIH0pXG59XG4iLCIvKlxuICogSW5zcGlyZWQgYnkgUm91dGVyTGluayBmcm9tIFZ1ZSBSb3V0ZXJcbiAqICAtLT4gQVBJIHNob3VsZCBtYXRjaCFcbiAqL1xuXG5pbXBvcnQgeyBjb21wdXRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyB2bUhhc1JvdXRlciB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUudm0vdm0uanMnXG5cbi8vIEdldCB0aGUgb3JpZ2luYWwgcGF0aCB2YWx1ZSBvZiBhIHJlY29yZCBieSBmb2xsb3dpbmcgaXRzIGFsaWFzT2ZcbmZ1bmN0aW9uIGdldE9yaWdpbmFsUGF0aCAocmVjb3JkKSB7XG4gIHJldHVybiByZWNvcmRcbiAgICA/IChcbiAgICAgICAgcmVjb3JkLmFsaWFzT2ZcbiAgICAgICAgICA/IHJlY29yZC5hbGlhc09mLnBhdGhcbiAgICAgICAgICA6IHJlY29yZC5wYXRoXG4gICAgICApIDogJydcbn1cblxuZnVuY3Rpb24gaXNTYW1lUm91dGVSZWNvcmQgKGEsIGIpIHtcbiAgLy8gc2luY2UgdGhlIG9yaWdpbmFsIHJlY29yZCBoYXMgYW4gdW5kZWZpbmVkIHZhbHVlIGZvciBhbGlhc09mXG4gIC8vIGJ1dCBhbGwgYWxpYXNlcyBwb2ludCB0byB0aGUgb3JpZ2luYWwgcmVjb3JkLCB0aGlzIHdpbGwgYWx3YXlzIGNvbXBhcmVcbiAgLy8gdGhlIG9yaWdpbmFsIHJlY29yZFxuICByZXR1cm4gKGEuYWxpYXNPZiB8fCBhKSA9PT0gKGIuYWxpYXNPZiB8fCBiKVxufVxuXG5mdW5jdGlvbiBpbmNsdWRlc1BhcmFtcyAob3V0ZXIsIGlubmVyKSB7XG4gIGZvciAoY29uc3Qga2V5IGluIGlubmVyKSB7XG4gICAgY29uc3RcbiAgICAgIGlubmVyVmFsdWUgPSBpbm5lclsga2V5IF0sXG4gICAgICBvdXRlclZhbHVlID0gb3V0ZXJbIGtleSBdXG5cbiAgICBpZiAodHlwZW9mIGlubmVyVmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICBpZiAoaW5uZXJWYWx1ZSAhPT0gb3V0ZXJWYWx1ZSkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoXG4gICAgICBBcnJheS5pc0FycmF5KG91dGVyVmFsdWUpID09PSBmYWxzZVxuICAgICAgfHwgb3V0ZXJWYWx1ZS5sZW5ndGggIT09IGlubmVyVmFsdWUubGVuZ3RoXG4gICAgICB8fCBpbm5lclZhbHVlLnNvbWUoKHZhbHVlLCBpKSA9PiB2YWx1ZSAhPT0gb3V0ZXJWYWx1ZVsgaSBdKVxuICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWVcbn1cblxuZnVuY3Rpb24gaXNFcXVpdmFsZW50QXJyYXkgKGEsIGIpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkoYikgPT09IHRydWVcbiAgICA/IGEubGVuZ3RoID09PSBiLmxlbmd0aCAmJiBhLmV2ZXJ5KCh2YWx1ZSwgaSkgPT4gdmFsdWUgPT09IGJbIGkgXSlcbiAgICA6IGEubGVuZ3RoID09PSAxICYmIGFbIDAgXSA9PT0gYlxufVxuXG5mdW5jdGlvbiBpc1NhbWVSb3V0ZUxvY2F0aW9uUGFyYW1zVmFsdWUgKGEsIGIpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkoYSkgPT09IHRydWVcbiAgICA/IGlzRXF1aXZhbGVudEFycmF5KGEsIGIpXG4gICAgOiAoXG4gICAgICAgIEFycmF5LmlzQXJyYXkoYikgPT09IHRydWVcbiAgICAgICAgICA/IGlzRXF1aXZhbGVudEFycmF5KGIsIGEpXG4gICAgICAgICAgOiBhID09PSBiXG4gICAgICApXG59XG5cbmZ1bmN0aW9uIGlzU2FtZVJvdXRlTG9jYXRpb25QYXJhbXMgKGEsIGIpIHtcbiAgaWYgKE9iamVjdC5rZXlzKGEpLmxlbmd0aCAhPT0gT2JqZWN0LmtleXMoYikubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBmb3IgKGNvbnN0IGtleSBpbiBhKSB7XG4gICAgaWYgKGlzU2FtZVJvdXRlTG9jYXRpb25QYXJhbXNWYWx1ZShhWyBrZXkgXSwgYlsga2V5IF0pID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWVcbn1cblxuZXhwb3J0IGNvbnN0IHVzZVJvdXRlckxpbmtOb25NYXRjaGluZ1Byb3BzID0ge1xuICAvLyByb3V0ZXItbGlua1xuICB0bzogWyBTdHJpbmcsIE9iamVjdCBdLFxuICByZXBsYWNlOiBCb29sZWFuLFxuXG4gIC8vIHJlZ3VsYXIgPGE+IGxpbmtcbiAgaHJlZjogU3RyaW5nLFxuICB0YXJnZXQ6IFN0cmluZyxcblxuICAvLyBzdGF0ZVxuICBkaXNhYmxlOiBCb29sZWFuXG59XG5cbmV4cG9ydCBjb25zdCB1c2VSb3V0ZXJMaW5rUHJvcHMgPSB7XG4gIC4uLnVzZVJvdXRlckxpbmtOb25NYXRjaGluZ1Byb3BzLFxuXG4gIC8vIHJvdXRlci1saW5rXG4gIGV4YWN0OiBCb29sZWFuLFxuICBhY3RpdmVDbGFzczoge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICBkZWZhdWx0OiAncS1yb3V0ZXItbGluay0tYWN0aXZlJ1xuICB9LFxuICBleGFjdEFjdGl2ZUNsYXNzOiB7XG4gICAgdHlwZTogU3RyaW5nLFxuICAgIGRlZmF1bHQ6ICdxLXJvdXRlci1saW5rLS1leGFjdC1hY3RpdmUnXG4gIH1cbn1cblxuLy8gZXh0ZXJuYWwgcHJvcHM6IHR5cGUsIHRhZ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoeyBmYWxsYmFja1RhZywgdXNlRGlzYWJsZUZvclJvdXRlckxpbmtQcm9wcyA9IHRydWUgfSA9IHt9KSB7XG4gIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgY29uc3QgeyBwcm9wcywgcHJveHksIGVtaXQgfSA9IHZtXG5cbiAgY29uc3QgaGFzUm91dGVyID0gdm1IYXNSb3V0ZXIodm0pXG4gIGNvbnN0IGhhc0hyZWZMaW5rID0gY29tcHV0ZWQoKCkgPT4gcHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZSAmJiBwcm9wcy5ocmVmICE9PSB2b2lkIDApXG5cbiAgLy8gZm9yIHBlcmYgcmVhc29ucywgd2UgdXNlIG1pbmltdW0gYW1vdW50IG9mIHJ1bnRpbWUgd29ya1xuICBjb25zdCBoYXNSb3V0ZXJMaW5rUHJvcHMgPSB1c2VEaXNhYmxlRm9yUm91dGVyTGlua1Byb3BzID09PSB0cnVlXG4gICAgPyBjb21wdXRlZCgoKSA9PlxuICAgICAgaGFzUm91dGVyID09PSB0cnVlXG4gICAgICAmJiBwcm9wcy5kaXNhYmxlICE9PSB0cnVlXG4gICAgICAmJiBoYXNIcmVmTGluay52YWx1ZSAhPT0gdHJ1ZVxuICAgICAgJiYgcHJvcHMudG8gIT09IHZvaWQgMCAmJiBwcm9wcy50byAhPT0gbnVsbCAmJiBwcm9wcy50byAhPT0gJydcbiAgICApXG4gICAgOiBjb21wdXRlZCgoKSA9PlxuICAgICAgaGFzUm91dGVyID09PSB0cnVlXG4gICAgICAmJiBoYXNIcmVmTGluay52YWx1ZSAhPT0gdHJ1ZVxuICAgICAgJiYgcHJvcHMudG8gIT09IHZvaWQgMCAmJiBwcm9wcy50byAhPT0gbnVsbCAmJiBwcm9wcy50byAhPT0gJydcbiAgICApXG5cbiAgY29uc3QgcmVzb2x2ZWRMaW5rID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgIGhhc1JvdXRlckxpbmtQcm9wcy52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgPyBnZXRMaW5rKHByb3BzLnRvKVxuICAgICAgOiBudWxsXG4gICkpXG5cbiAgY29uc3QgaGFzUm91dGVyTGluayA9IGNvbXB1dGVkKCgpID0+IHJlc29sdmVkTGluay52YWx1ZSAhPT0gbnVsbClcbiAgY29uc3QgaGFzTGluayA9IGNvbXB1dGVkKCgpID0+IGhhc0hyZWZMaW5rLnZhbHVlID09PSB0cnVlIHx8IGhhc1JvdXRlckxpbmsudmFsdWUgPT09IHRydWUpXG5cbiAgY29uc3QgbGlua1RhZyA9IGNvbXB1dGVkKCgpID0+IChcbiAgICBwcm9wcy50eXBlID09PSAnYScgfHwgaGFzTGluay52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgPyAnYSdcbiAgICAgIDogKHByb3BzLnRhZyB8fCBmYWxsYmFja1RhZyB8fCAnZGl2JylcbiAgKSlcblxuICBjb25zdCBsaW5rQXR0cnMgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgaGFzSHJlZkxpbmsudmFsdWUgPT09IHRydWVcbiAgICAgID8ge1xuICAgICAgICAgIGhyZWY6IHByb3BzLmhyZWYsXG4gICAgICAgICAgdGFyZ2V0OiBwcm9wcy50YXJnZXRcbiAgICAgICAgfVxuICAgICAgOiAoXG4gICAgICAgICAgaGFzUm91dGVyTGluay52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgaHJlZjogcmVzb2x2ZWRMaW5rLnZhbHVlLmhyZWYsXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiBwcm9wcy50YXJnZXRcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiB7fVxuICAgICAgICApXG4gICkpXG5cbiAgY29uc3QgbGlua0FjdGl2ZUluZGV4ID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGlmIChoYXNSb3V0ZXJMaW5rLnZhbHVlID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIC0xXG4gICAgfVxuXG4gICAgY29uc3RcbiAgICAgIHsgbWF0Y2hlZCB9ID0gcmVzb2x2ZWRMaW5rLnZhbHVlLFxuICAgICAgeyBsZW5ndGggfSA9IG1hdGNoZWQsXG4gICAgICByb3V0ZU1hdGNoZWQgPSBtYXRjaGVkWyBsZW5ndGggLSAxIF1cblxuICAgIGlmIChyb3V0ZU1hdGNoZWQgPT09IHZvaWQgMCkge1xuICAgICAgcmV0dXJuIC0xXG4gICAgfVxuXG4gICAgY29uc3QgY3VycmVudE1hdGNoZWQgPSBwcm94eS4kcm91dGUubWF0Y2hlZFxuXG4gICAgaWYgKGN1cnJlbnRNYXRjaGVkLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIC0xXG4gICAgfVxuXG4gICAgY29uc3QgaW5kZXggPSBjdXJyZW50TWF0Y2hlZC5maW5kSW5kZXgoXG4gICAgICBpc1NhbWVSb3V0ZVJlY29yZC5iaW5kKG51bGwsIHJvdXRlTWF0Y2hlZClcbiAgICApXG5cbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICByZXR1cm4gaW5kZXhcbiAgICB9XG5cbiAgICAvLyBwb3NzaWJsZSBwYXJlbnQgcmVjb3JkXG4gICAgY29uc3QgcGFyZW50UmVjb3JkUGF0aCA9IGdldE9yaWdpbmFsUGF0aChtYXRjaGVkWyBsZW5ndGggLSAyIF0pXG5cbiAgICByZXR1cm4gKFxuICAgICAgLy8gd2UgYXJlIGRlYWxpbmcgd2l0aCBuZXN0ZWQgcm91dGVzXG4gICAgICBsZW5ndGggPiAxXG4gICAgICAvLyBpZiB0aGUgcGFyZW50IGFuZCBtYXRjaGVkIHJvdXRlIGhhdmUgdGhlIHNhbWUgcGF0aCwgdGhpcyBsaW5rIGlzXG4gICAgICAvLyByZWZlcnJpbmcgdG8gdGhlIGVtcHR5IGNoaWxkLiBPciB3ZSBjdXJyZW50bHkgYXJlIG9uIGEgZGlmZmVyZW50XG4gICAgICAvLyBjaGlsZCBvZiB0aGUgc2FtZSBwYXJlbnRcbiAgICAgICYmIGdldE9yaWdpbmFsUGF0aChyb3V0ZU1hdGNoZWQpID09PSBwYXJlbnRSZWNvcmRQYXRoXG4gICAgICAvLyBhdm9pZCBjb21wYXJpbmcgdGhlIGNoaWxkIHdpdGggaXRzIHBhcmVudFxuICAgICAgJiYgY3VycmVudE1hdGNoZWRbIGN1cnJlbnRNYXRjaGVkLmxlbmd0aCAtIDEgXS5wYXRoICE9PSBwYXJlbnRSZWNvcmRQYXRoXG4gICAgICAgID8gY3VycmVudE1hdGNoZWQuZmluZEluZGV4KFxuICAgICAgICAgIGlzU2FtZVJvdXRlUmVjb3JkLmJpbmQobnVsbCwgbWF0Y2hlZFsgbGVuZ3RoIC0gMiBdKVxuICAgICAgICApXG4gICAgICAgIDogaW5kZXhcbiAgICApXG4gIH0pXG5cbiAgY29uc3QgbGlua0lzQWN0aXZlID0gY29tcHV0ZWQoKCkgPT5cbiAgICBoYXNSb3V0ZXJMaW5rLnZhbHVlID09PSB0cnVlXG4gICAgJiYgbGlua0FjdGl2ZUluZGV4LnZhbHVlICE9PSAtMVxuICAgICYmIGluY2x1ZGVzUGFyYW1zKHByb3h5LiRyb3V0ZS5wYXJhbXMsIHJlc29sdmVkTGluay52YWx1ZS5wYXJhbXMpXG4gIClcblxuICBjb25zdCBsaW5rSXNFeGFjdEFjdGl2ZSA9IGNvbXB1dGVkKCgpID0+XG4gICAgbGlua0lzQWN0aXZlLnZhbHVlID09PSB0cnVlXG4gICAgICAmJiBsaW5rQWN0aXZlSW5kZXgudmFsdWUgPT09IHByb3h5LiRyb3V0ZS5tYXRjaGVkLmxlbmd0aCAtIDFcbiAgICAgICYmIGlzU2FtZVJvdXRlTG9jYXRpb25QYXJhbXMocHJveHkuJHJvdXRlLnBhcmFtcywgcmVzb2x2ZWRMaW5rLnZhbHVlLnBhcmFtcylcbiAgKVxuXG4gIGNvbnN0IGxpbmtDbGFzcyA9IGNvbXB1dGVkKCgpID0+IChcbiAgICBoYXNSb3V0ZXJMaW5rLnZhbHVlID09PSB0cnVlXG4gICAgICA/IChcbiAgICAgICAgICBsaW5rSXNFeGFjdEFjdGl2ZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgICAgPyBgICR7IHByb3BzLmV4YWN0QWN0aXZlQ2xhc3MgfSAkeyBwcm9wcy5hY3RpdmVDbGFzcyB9YFxuICAgICAgICAgICAgOiAoXG4gICAgICAgICAgICAgICAgcHJvcHMuZXhhY3QgPT09IHRydWVcbiAgICAgICAgICAgICAgICAgID8gJydcbiAgICAgICAgICAgICAgICAgIDogKGxpbmtJc0FjdGl2ZS52YWx1ZSA9PT0gdHJ1ZSA/IGAgJHsgcHJvcHMuYWN0aXZlQ2xhc3MgfWAgOiAnJylcbiAgICAgICAgICAgICAgKVxuICAgICAgICApXG4gICAgICA6ICcnXG4gICkpXG5cbiAgZnVuY3Rpb24gZ2V0TGluayAodG8pIHtcbiAgICB0cnkgeyByZXR1cm4gcHJveHkuJHJvdXRlci5yZXNvbHZlKHRvKSB9XG4gICAgY2F0Y2ggKF8pIHt9XG5cbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIFByb21pc2U8Um91dGVyRXJyb3IgfCBmYWxzZSB8IHVuZGVmaW5lZD5cbiAgICovXG4gIGZ1bmN0aW9uIG5hdmlnYXRlVG9Sb3V0ZXJMaW5rIChcbiAgICBlLFxuICAgIHsgcmV0dXJuUm91dGVyRXJyb3IsIHRvID0gcHJvcHMudG8sIHJlcGxhY2UgPSBwcm9wcy5yZXBsYWNlIH0gPSB7fVxuICApIHtcbiAgICBpZiAocHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSkge1xuICAgICAgLy8gZW5zdXJlIG5hdGl2ZSBuYXZpZ2F0aW9uIGlzIHByZXZlbnRlZCBpbiBhbGwgY2FzZXMsXG4gICAgICAvLyBsaWtlIHdoZW4gdXNlRGlzYWJsZUZvclJvdXRlckxpbmtQcm9wcyA9PT0gZmFsc2UgKFFSb3V0ZVRhYilcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShmYWxzZSlcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICAvLyBkb24ndCByZWRpcmVjdCB3aXRoIGNvbnRyb2wga2V5cztcbiAgICAgIC8vIHNob3VsZCBtYXRjaCBSb3V0ZXJMaW5rIGZyb20gVnVlIFJvdXRlclxuICAgICAgZS5tZXRhS2V5IHx8IGUuYWx0S2V5IHx8IGUuY3RybEtleSB8fCBlLnNoaWZ0S2V5XG5cbiAgICAgIC8vIGRvbid0IHJlZGlyZWN0IG9uIHJpZ2h0IGNsaWNrXG4gICAgICB8fCAoZS5idXR0b24gIT09IHZvaWQgMCAmJiBlLmJ1dHRvbiAhPT0gMClcblxuICAgICAgLy8gZG9uJ3QgcmVkaXJlY3QgaWYgaXQgc2hvdWxkIG9wZW4gaW4gYSBuZXcgd2luZG93XG4gICAgICB8fCBwcm9wcy50YXJnZXQgPT09ICdfYmxhbmsnXG4gICAgKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGZhbHNlKVxuICAgIH1cblxuICAgIC8vIGhpbmRlciB0aGUgbmF0aXZlIG5hdmlnYXRpb25cbiAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgIC8vIHRoZW4oKSBjYW4gYWxzbyByZXR1cm4gYSBcInNvZnRcIiByb3V0ZXIgZXJyb3IgKFZ1ZSBSb3V0ZXIgYmVoYXZpb3IpXG4gICAgY29uc3QgcHJvbWlzZSA9IHByb3h5LiRyb3V0ZXJbIHJlcGxhY2UgPT09IHRydWUgPyAncmVwbGFjZScgOiAncHVzaCcgXSh0bylcblxuICAgIHJldHVybiByZXR1cm5Sb3V0ZXJFcnJvciA9PT0gdHJ1ZVxuICAgICAgPyBwcm9taXNlXG4gICAgICAvLyBlbHNlIGNhdGNoaW5nIGhhcmQgZXJyb3JzIGFuZCBhbHNvIFwic29mdFwiIG9uZXMgLSB0aGVuKGVyciA9PiAuLi4pXG4gICAgICA6IHByb21pc2UudGhlbigoKSA9PiB7fSkuY2F0Y2goKCkgPT4ge30pXG4gIH1cblxuICAvLyB3YXJuaW5nISBlbnN1cmUgdGhhdCB0aGUgY29tcG9uZW50IHVzaW5nIGl0IGhhcyAnY2xpY2snIGluY2x1ZGVkIGluIGl0cyAnZW1pdHMnIGRlZmluaXRpb24gcHJvcFxuICBmdW5jdGlvbiBuYXZpZ2F0ZU9uQ2xpY2sgKGUpIHtcbiAgICBpZiAoaGFzUm91dGVyTGluay52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3QgZ28gPSBvcHRzID0+IG5hdmlnYXRlVG9Sb3V0ZXJMaW5rKGUsIG9wdHMpXG5cbiAgICAgIGVtaXQoJ2NsaWNrJywgZSwgZ28pXG4gICAgICBlLmRlZmF1bHRQcmV2ZW50ZWQgIT09IHRydWUgJiYgZ28oKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGVtaXQoJ2NsaWNrJywgZSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGhhc1JvdXRlckxpbmssXG4gICAgaGFzSHJlZkxpbmssXG4gICAgaGFzTGluayxcblxuICAgIGxpbmtUYWcsXG4gICAgcmVzb2x2ZWRMaW5rLFxuICAgIGxpbmtJc0FjdGl2ZSxcbiAgICBsaW5rSXNFeGFjdEFjdGl2ZSxcbiAgICBsaW5rQ2xhc3MsXG4gICAgbGlua0F0dHJzLFxuXG4gICAgZ2V0TGluayxcbiAgICBuYXZpZ2F0ZVRvUm91dGVyTGluayxcbiAgICBuYXZpZ2F0ZU9uQ2xpY2tcbiAgfVxufVxuIiwiaW1wb3J0IHsgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VBbGlnbiwgeyB1c2VBbGlnblByb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtYWxpZ24vdXNlLWFsaWduLmpzJ1xuaW1wb3J0IHVzZVNpemUsIHsgdXNlU2l6ZVByb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2Utc2l6ZS91c2Utc2l6ZS5qcydcbmltcG9ydCB1c2VSb3V0ZXJMaW5rLCB7IHVzZVJvdXRlckxpbmtOb25NYXRjaGluZ1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2Utcm91dGVyLWxpbmsvdXNlLXJvdXRlci1saW5rLmpzJ1xuXG5leHBvcnQgY29uc3QgYnRuUGFkZGluZyA9IHtcbiAgbm9uZTogMCxcbiAgeHM6IDQsXG4gIHNtOiA4LFxuICBtZDogMTYsXG4gIGxnOiAyNCxcbiAgeGw6IDMyXG59XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0U2l6ZXMgPSB7XG4gIHhzOiA4LFxuICBzbTogMTAsXG4gIG1kOiAxNCxcbiAgbGc6IDIwLFxuICB4bDogMjRcbn1cblxuY29uc3QgZm9ybVR5cGVzID0gWyAnYnV0dG9uJywgJ3N1Ym1pdCcsICdyZXNldCcgXVxuY29uc3QgbWVkaWFUeXBlUkUgPSAvW15cXHNdXFwvW15cXHNdL1xuXG5leHBvcnQgY29uc3QgYnRuRGVzaWduT3B0aW9ucyA9IFsgJ2ZsYXQnLCAnb3V0bGluZScsICdwdXNoJywgJ3VuZWxldmF0ZWQnIF1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEJ0bkRlc2lnbiAocHJvcHMsIGRlZmF1bHRWYWx1ZSkge1xuICBpZiAocHJvcHMuZmxhdCA9PT0gdHJ1ZSkgcmV0dXJuICdmbGF0J1xuICBpZiAocHJvcHMub3V0bGluZSA9PT0gdHJ1ZSkgcmV0dXJuICdvdXRsaW5lJ1xuICBpZiAocHJvcHMucHVzaCA9PT0gdHJ1ZSkgcmV0dXJuICdwdXNoJ1xuICBpZiAocHJvcHMudW5lbGV2YXRlZCA9PT0gdHJ1ZSkgcmV0dXJuICd1bmVsZXZhdGVkJ1xuICByZXR1cm4gZGVmYXVsdFZhbHVlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRCdG5EZXNpZ25BdHRyIChwcm9wcykge1xuICBjb25zdCBkZXNpZ24gPSBnZXRCdG5EZXNpZ24ocHJvcHMpXG4gIHJldHVybiBkZXNpZ24gIT09IHZvaWQgMFxuICAgID8geyBbIGRlc2lnbiBdOiB0cnVlIH1cbiAgICA6IHt9XG59XG5cbmV4cG9ydCBjb25zdCBub25Sb3VuZEJ0blByb3BzID0ge1xuICAuLi51c2VTaXplUHJvcHMsXG4gIC4uLnVzZVJvdXRlckxpbmtOb25NYXRjaGluZ1Byb3BzLFxuXG4gIHR5cGU6IHtcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgZGVmYXVsdDogJ2J1dHRvbidcbiAgfSxcblxuICBsYWJlbDogWyBOdW1iZXIsIFN0cmluZyBdLFxuICBpY29uOiBTdHJpbmcsXG4gIGljb25SaWdodDogU3RyaW5nLFxuXG4gIC4uLmJ0bkRlc2lnbk9wdGlvbnMucmVkdWNlKFxuICAgIChhY2MsIHZhbCkgPT4gKGFjY1sgdmFsIF0gPSBCb29sZWFuKSAmJiBhY2MsXG4gICAge31cbiAgKSxcblxuICBzcXVhcmU6IEJvb2xlYW4sXG4gIHJvdW5kZWQ6IEJvb2xlYW4sXG4gIGdsb3NzeTogQm9vbGVhbixcblxuICBzaXplOiBTdHJpbmcsXG4gIGZhYjogQm9vbGVhbixcbiAgZmFiTWluaTogQm9vbGVhbixcbiAgcGFkZGluZzogU3RyaW5nLFxuXG4gIGNvbG9yOiBTdHJpbmcsXG4gIHRleHRDb2xvcjogU3RyaW5nLFxuICBub0NhcHM6IEJvb2xlYW4sXG4gIG5vV3JhcDogQm9vbGVhbixcbiAgZGVuc2U6IEJvb2xlYW4sXG5cbiAgdGFiaW5kZXg6IFsgTnVtYmVyLCBTdHJpbmcgXSxcblxuICByaXBwbGU6IHtcbiAgICB0eXBlOiBbIEJvb2xlYW4sIE9iamVjdCBdLFxuICAgIGRlZmF1bHQ6IHRydWVcbiAgfSxcblxuICBhbGlnbjoge1xuICAgIC4uLnVzZUFsaWduUHJvcHMuYWxpZ24sXG4gICAgZGVmYXVsdDogJ2NlbnRlcidcbiAgfSxcbiAgc3RhY2s6IEJvb2xlYW4sXG4gIHN0cmV0Y2g6IEJvb2xlYW4sXG4gIGxvYWRpbmc6IHtcbiAgICB0eXBlOiBCb29sZWFuLFxuICAgIGRlZmF1bHQ6IG51bGxcbiAgfSxcbiAgZGlzYWJsZTogQm9vbGVhblxufVxuXG5leHBvcnQgY29uc3QgdXNlQnRuUHJvcHMgPSB7XG4gIC4uLm5vblJvdW5kQnRuUHJvcHMsXG4gIHJvdW5kOiBCb29sZWFuXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcykge1xuICBjb25zdCBzaXplU3R5bGUgPSB1c2VTaXplKHByb3BzLCBkZWZhdWx0U2l6ZXMpXG4gIGNvbnN0IGFsaWduQ2xhc3MgPSB1c2VBbGlnbihwcm9wcylcbiAgY29uc3QgeyBoYXNSb3V0ZXJMaW5rLCBoYXNMaW5rLCBsaW5rVGFnLCBsaW5rQXR0cnMsIG5hdmlnYXRlT25DbGljayB9ID0gdXNlUm91dGVyTGluayh7XG4gICAgZmFsbGJhY2tUYWc6ICdidXR0b24nXG4gIH0pXG5cbiAgY29uc3Qgc3R5bGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgY29uc3Qgb2JqID0gcHJvcHMuZmFiID09PSBmYWxzZSAmJiBwcm9wcy5mYWJNaW5pID09PSBmYWxzZVxuICAgICAgPyBzaXplU3R5bGUudmFsdWVcbiAgICAgIDoge31cblxuICAgIHJldHVybiBwcm9wcy5wYWRkaW5nICE9PSB2b2lkIDBcbiAgICAgID8gT2JqZWN0LmFzc2lnbih7fSwgb2JqLCB7XG4gICAgICAgIHBhZGRpbmc6IHByb3BzLnBhZGRpbmdcbiAgICAgICAgICAuc3BsaXQoL1xccysvKVxuICAgICAgICAgIC5tYXAodiA9PiAodiBpbiBidG5QYWRkaW5nID8gYnRuUGFkZGluZ1sgdiBdICsgJ3B4JyA6IHYpKVxuICAgICAgICAgIC5qb2luKCcgJyksXG4gICAgICAgIG1pbldpZHRoOiAnMCcsXG4gICAgICAgIG1pbkhlaWdodDogJzAnXG4gICAgICB9KVxuICAgICAgOiBvYmpcbiAgfSlcblxuICBjb25zdCBpc1JvdW5kZWQgPSBjb21wdXRlZCgoKSA9PlxuICAgIHByb3BzLnJvdW5kZWQgPT09IHRydWUgfHwgcHJvcHMuZmFiID09PSB0cnVlIHx8IHByb3BzLmZhYk1pbmkgPT09IHRydWVcbiAgKVxuXG4gIGNvbnN0IGlzQWN0aW9uYWJsZSA9IGNvbXB1dGVkKCgpID0+XG4gICAgcHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZSAmJiBwcm9wcy5sb2FkaW5nICE9PSB0cnVlXG4gIClcblxuICBjb25zdCB0YWJJbmRleCA9IGNvbXB1dGVkKCgpID0+IChcbiAgICBpc0FjdGlvbmFibGUudmFsdWUgPT09IHRydWUgPyBwcm9wcy50YWJpbmRleCB8fCAwIDogLTFcbiAgKSlcblxuICBjb25zdCBkZXNpZ24gPSBjb21wdXRlZCgoKSA9PiBnZXRCdG5EZXNpZ24ocHJvcHMsICdzdGFuZGFyZCcpKVxuXG4gIGNvbnN0IGF0dHJpYnV0ZXMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgY29uc3QgYWNjID0geyB0YWJpbmRleDogdGFiSW5kZXgudmFsdWUgfVxuXG4gICAgaWYgKGhhc0xpbmsudmFsdWUgPT09IHRydWUpIHtcbiAgICAgIE9iamVjdC5hc3NpZ24oYWNjLCBsaW5rQXR0cnMudmFsdWUpXG4gICAgfVxuICAgIGVsc2UgaWYgKGZvcm1UeXBlcy5pbmNsdWRlcyhwcm9wcy50eXBlKSA9PT0gdHJ1ZSkge1xuICAgICAgYWNjLnR5cGUgPSBwcm9wcy50eXBlXG4gICAgfVxuXG4gICAgaWYgKGxpbmtUYWcudmFsdWUgPT09ICdhJykge1xuICAgICAgaWYgKHByb3BzLmRpc2FibGUgPT09IHRydWUpIHtcbiAgICAgICAgYWNjWyAnYXJpYS1kaXNhYmxlZCcgXSA9ICd0cnVlJ1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoYWNjLmhyZWYgPT09IHZvaWQgMCkge1xuICAgICAgICBhY2Mucm9sZSA9ICdidXR0b24nXG4gICAgICB9XG5cbiAgICAgIGlmIChoYXNSb3V0ZXJMaW5rLnZhbHVlICE9PSB0cnVlICYmIG1lZGlhVHlwZVJFLnRlc3QocHJvcHMudHlwZSkgPT09IHRydWUpIHtcbiAgICAgICAgYWNjLnR5cGUgPSBwcm9wcy50eXBlXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHByb3BzLmRpc2FibGUgPT09IHRydWUpIHtcbiAgICAgIGFjYy5kaXNhYmxlZCA9ICcnXG4gICAgICBhY2NbICdhcmlhLWRpc2FibGVkJyBdID0gJ3RydWUnXG4gICAgfVxuXG4gICAgaWYgKHByb3BzLmxvYWRpbmcgPT09IHRydWUgJiYgcHJvcHMucGVyY2VudGFnZSAhPT0gdm9pZCAwKSB7XG4gICAgICBPYmplY3QuYXNzaWduKGFjYywge1xuICAgICAgICByb2xlOiAncHJvZ3Jlc3NiYXInLFxuICAgICAgICAnYXJpYS12YWx1ZW1pbic6IDAsXG4gICAgICAgICdhcmlhLXZhbHVlbWF4JzogMTAwLFxuICAgICAgICAnYXJpYS12YWx1ZW5vdyc6IHByb3BzLnBlcmNlbnRhZ2VcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuIGFjY1xuICB9KVxuXG4gIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgbGV0IGNvbG9yc1xuXG4gICAgaWYgKHByb3BzLmNvbG9yICE9PSB2b2lkIDApIHtcbiAgICAgIGlmIChwcm9wcy5mbGF0ID09PSB0cnVlIHx8IHByb3BzLm91dGxpbmUgPT09IHRydWUpIHtcbiAgICAgICAgY29sb3JzID0gYHRleHQtJHsgcHJvcHMudGV4dENvbG9yIHx8IHByb3BzLmNvbG9yIH1gXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY29sb3JzID0gYGJnLSR7IHByb3BzLmNvbG9yIH0gdGV4dC0keyBwcm9wcy50ZXh0Q29sb3IgfHwgJ3doaXRlJyB9YFxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChwcm9wcy50ZXh0Q29sb3IpIHtcbiAgICAgIGNvbG9ycyA9IGB0ZXh0LSR7IHByb3BzLnRleHRDb2xvciB9YFxuICAgIH1cblxuICAgIGNvbnN0IHNoYXBlID0gcHJvcHMucm91bmQgPT09IHRydWVcbiAgICAgID8gJ3JvdW5kJ1xuICAgICAgOiBgcmVjdGFuZ2xlJHsgaXNSb3VuZGVkLnZhbHVlID09PSB0cnVlID8gJyBxLWJ0bi0tcm91bmRlZCcgOiAocHJvcHMuc3F1YXJlID09PSB0cnVlID8gJyBxLWJ0bi0tc3F1YXJlJyA6ICcnKSB9YFxuXG4gICAgcmV0dXJuIGBxLWJ0bi0tJHsgZGVzaWduLnZhbHVlIH0gcS1idG4tLSR7IHNoYXBlIH1gXG4gICAgICArIChjb2xvcnMgIT09IHZvaWQgMCA/ICcgJyArIGNvbG9ycyA6ICcnKVxuICAgICAgKyAoaXNBY3Rpb25hYmxlLnZhbHVlID09PSB0cnVlID8gJyBxLWJ0bi0tYWN0aW9uYWJsZSBxLWZvY3VzYWJsZSBxLWhvdmVyYWJsZScgOiAocHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSA/ICcgZGlzYWJsZWQnIDogJycpKVxuICAgICAgKyAocHJvcHMuZmFiID09PSB0cnVlID8gJyBxLWJ0bi0tZmFiJyA6IChwcm9wcy5mYWJNaW5pID09PSB0cnVlID8gJyBxLWJ0bi0tZmFiLW1pbmknIDogJycpKVxuICAgICAgKyAocHJvcHMubm9DYXBzID09PSB0cnVlID8gJyBxLWJ0bi0tbm8tdXBwZXJjYXNlJyA6ICcnKVxuICAgICAgKyAocHJvcHMuZGVuc2UgPT09IHRydWUgPyAnIHEtYnRuLS1kZW5zZScgOiAnJylcbiAgICAgICsgKHByb3BzLnN0cmV0Y2ggPT09IHRydWUgPyAnIG5vLWJvcmRlci1yYWRpdXMgc2VsZi1zdHJldGNoJyA6ICcnKVxuICAgICAgKyAocHJvcHMuZ2xvc3N5ID09PSB0cnVlID8gJyBnbG9zc3knIDogJycpXG4gICAgICArIChwcm9wcy5zcXVhcmUgPyAnIHEtYnRuLS1zcXVhcmUnIDogJycpXG4gIH0pXG5cbiAgY29uc3QgaW5uZXJDbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICBhbGlnbkNsYXNzLnZhbHVlICsgKHByb3BzLnN0YWNrID09PSB0cnVlID8gJyBjb2x1bW4nIDogJyByb3cnKVxuICAgICsgKHByb3BzLm5vV3JhcCA9PT0gdHJ1ZSA/ICcgbm8td3JhcCB0ZXh0LW5vLXdyYXAnIDogJycpXG4gICAgKyAocHJvcHMubG9hZGluZyA9PT0gdHJ1ZSA/ICcgcS1idG5fX2NvbnRlbnQtLWhpZGRlbicgOiAnJylcbiAgKVxuXG4gIHJldHVybiB7XG4gICAgY2xhc3NlcyxcbiAgICBzdHlsZSxcbiAgICBpbm5lckNsYXNzZXMsXG4gICAgYXR0cmlidXRlcyxcbiAgICBoYXNMaW5rLFxuICAgIGxpbmtUYWcsXG4gICAgbmF2aWdhdGVPbkNsaWNrLFxuICAgIGlzQWN0aW9uYWJsZVxuICB9XG59XG4iLCJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCBUcmFuc2l0aW9uLCBvbkJlZm9yZVVubW91bnQsIHdpdGhEaXJlY3RpdmVzLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRSWNvbiBmcm9tICcuLi9pY29uL1FJY29uLmpzJ1xuaW1wb3J0IFFTcGlubmVyIGZyb20gJy4uL3NwaW5uZXIvUVNwaW5uZXIuanMnXG5cbmltcG9ydCBSaXBwbGUgZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9yaXBwbGUvUmlwcGxlLmpzJ1xuXG5pbXBvcnQgdXNlQnRuLCB7IHVzZUJ0blByb3BzIH0gZnJvbSAnLi91c2UtYnRuLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoTWVyZ2VTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5yZW5kZXIvcmVuZGVyLmpzJ1xuaW1wb3J0IHsgc3RvcCwgcHJldmVudCwgc3RvcEFuZFByZXZlbnQsIGxpc3Rlbk9wdHMgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC9ldmVudC5qcydcbmltcG9ydCB7IGlzS2V5Q29kZSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUua2V5Ym9hcmQva2V5LWNvbXBvc2l0aW9uLmpzJ1xuXG5jb25zdCB7IHBhc3NpdmVDYXB0dXJlIH0gPSBsaXN0ZW5PcHRzXG5cbmxldFxuICB0b3VjaFRhcmdldCA9IG51bGwsXG4gIGtleWJvYXJkVGFyZ2V0ID0gbnVsbCxcbiAgbW91c2VUYXJnZXQgPSBudWxsXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRQnRuJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZUJ0blByb3BzLFxuXG4gICAgcGVyY2VudGFnZTogTnVtYmVyLFxuICAgIGRhcmtQZXJjZW50YWdlOiBCb29sZWFuLFxuXG4gICAgb25Ub3VjaHN0YXJ0OiBbIEZ1bmN0aW9uLCBBcnJheSBdXG4gIH0sXG5cbiAgZW1pdHM6IFsgJ2NsaWNrJywgJ2tleWRvd24nLCAnbW91c2Vkb3duJywgJ2tleXVwJyBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCB9KSB7XG4gICAgY29uc3QgeyBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIGNvbnN0IHtcbiAgICAgIGNsYXNzZXMsIHN0eWxlLCBpbm5lckNsYXNzZXMsXG4gICAgICBhdHRyaWJ1dGVzLFxuICAgICAgaGFzTGluaywgbGlua1RhZywgbmF2aWdhdGVPbkNsaWNrLFxuICAgICAgaXNBY3Rpb25hYmxlXG4gICAgfSA9IHVzZUJ0bihwcm9wcylcblxuICAgIGNvbnN0IHJvb3RSZWYgPSByZWYobnVsbClcbiAgICBjb25zdCBibHVyVGFyZ2V0UmVmID0gcmVmKG51bGwpXG5cbiAgICBsZXQgbG9jYWxUb3VjaFRhcmdldEVsID0gbnVsbCwgYXZvaWRNb3VzZVJpcHBsZSwgbW91c2VUaW1lciA9IG51bGxcblxuICAgIGNvbnN0IGhhc0xhYmVsID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLmxhYmVsICE9PSB2b2lkIDAgJiYgcHJvcHMubGFiZWwgIT09IG51bGwgJiYgcHJvcHMubGFiZWwgIT09ICcnXG4gICAgKVxuXG4gICAgY29uc3QgcmlwcGxlID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSB8fCBwcm9wcy5yaXBwbGUgPT09IGZhbHNlXG4gICAgICAgID8gZmFsc2VcbiAgICAgICAgOiB7XG4gICAgICAgICAgICBrZXlDb2RlczogaGFzTGluay52YWx1ZSA9PT0gdHJ1ZSA/IFsgMTMsIDMyIF0gOiBbIDEzIF0sXG4gICAgICAgICAgICAuLi4ocHJvcHMucmlwcGxlID09PSB0cnVlID8ge30gOiBwcm9wcy5yaXBwbGUpXG4gICAgICAgICAgfVxuICAgICkpXG5cbiAgICBjb25zdCByaXBwbGVQcm9wcyA9IGNvbXB1dGVkKCgpID0+ICh7IGNlbnRlcjogcHJvcHMucm91bmQgfSkpXG5cbiAgICBjb25zdCBwZXJjZW50YWdlU3R5bGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCB2YWwgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxMDAsIHByb3BzLnBlcmNlbnRhZ2UpKVxuICAgICAgcmV0dXJuIHZhbCA+IDBcbiAgICAgICAgPyB7IHRyYW5zaXRpb246ICd0cmFuc2Zvcm0gMC42cycsIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVgoJHsgdmFsIC0gMTAwIH0lKWAgfVxuICAgICAgICA6IHt9XG4gICAgfSlcblxuICAgIGNvbnN0IG9uRXZlbnRzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgaWYgKHByb3BzLmxvYWRpbmcgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBvbk1vdXNlZG93bjogb25Mb2FkaW5nRXZ0LFxuICAgICAgICAgIG9uVG91Y2hzdGFydDogb25Mb2FkaW5nRXZ0LFxuICAgICAgICAgIG9uQ2xpY2s6IG9uTG9hZGluZ0V2dCxcbiAgICAgICAgICBvbktleWRvd246IG9uTG9hZGluZ0V2dCxcbiAgICAgICAgICBvbktleXVwOiBvbkxvYWRpbmdFdnRcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoaXNBY3Rpb25hYmxlLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IGFjYyA9IHtcbiAgICAgICAgICBvbkNsaWNrLFxuICAgICAgICAgIG9uS2V5ZG93bixcbiAgICAgICAgICBvbk1vdXNlZG93blxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb3h5LiRxLnBsYXRmb3JtLmhhcy50b3VjaCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNvbnN0IHN1ZmZpeCA9IHByb3BzLm9uVG91Y2hzdGFydCAhPT0gdm9pZCAwXG4gICAgICAgICAgICA/ICcnXG4gICAgICAgICAgICA6ICdQYXNzaXZlJ1xuXG4gICAgICAgICAgYWNjWyBgb25Ub3VjaHN0YXJ0JHsgc3VmZml4IH1gIF0gPSBvblRvdWNoc3RhcnRcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhY2NcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLy8gbmVlZGVkOyBlc3BlY2lhbGx5IGZvciBkaXNhYmxlZCA8YT4gdGFnc1xuICAgICAgICBvbkNsaWNrOiBzdG9wQW5kUHJldmVudFxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCBub2RlUHJvcHMgPSBjb21wdXRlZCgoKSA9PiAoe1xuICAgICAgcmVmOiByb290UmVmLFxuICAgICAgY2xhc3M6ICdxLWJ0biBxLWJ0bi1pdGVtIG5vbi1zZWxlY3RhYmxlIG5vLW91dGxpbmUgJyArIGNsYXNzZXMudmFsdWUsXG4gICAgICBzdHlsZTogc3R5bGUudmFsdWUsXG4gICAgICAuLi5hdHRyaWJ1dGVzLnZhbHVlLFxuICAgICAgLi4ub25FdmVudHMudmFsdWVcbiAgICB9KSlcblxuICAgIGZ1bmN0aW9uIG9uQ2xpY2sgKGUpIHtcbiAgICAgIC8vIGlzIGl0IGFscmVhZHkgZGVzdHJveWVkP1xuICAgICAgaWYgKHJvb3RSZWYudmFsdWUgPT09IG51bGwpIHJldHVyblxuXG4gICAgICBpZiAoZSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGlmIChlLmRlZmF1bHRQcmV2ZW50ZWQgPT09IHRydWUpIHJldHVyblxuXG4gICAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudFxuICAgICAgICAvLyBmb2N1cyBidXR0b24gaWYgaXQgY2FtZSBmcm9tIEVOVEVSIG9uIGZvcm1cbiAgICAgICAgLy8gcHJldmVudCB0aGUgbmV3IHN1Ym1pdCAoYWxyZWFkeSBkb25lKVxuICAgICAgICBpZiAoXG4gICAgICAgICAgcHJvcHMudHlwZSA9PT0gJ3N1Ym1pdCdcbiAgICAgICAgICAmJiBlbCAhPT0gZG9jdW1lbnQuYm9keVxuICAgICAgICAgICYmIHJvb3RSZWYudmFsdWUuY29udGFpbnMoZWwpID09PSBmYWxzZVxuICAgICAgICAgIC8vIHJlcXVpcmVkIGZvciBpT1MgYW5kIGRlc2t0b3AgU2FmYXJpXG4gICAgICAgICAgJiYgZWwuY29udGFpbnMocm9vdFJlZi52YWx1ZSkgPT09IGZhbHNlXG4gICAgICAgICkge1xuICAgICAgICAgIGUucUF2b2lkRm9jdXMgIT09IHRydWUgJiYgcm9vdFJlZi52YWx1ZS5mb2N1cygpXG5cbiAgICAgICAgICBjb25zdCBvbkNsaWNrQ2xlYW51cCA9ICgpID0+IHtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBzdG9wQW5kUHJldmVudCwgdHJ1ZSlcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgb25DbGlja0NsZWFudXAsIHBhc3NpdmVDYXB0dXJlKVxuICAgICAgICAgICAgcm9vdFJlZi52YWx1ZT8ucmVtb3ZlRXZlbnRMaXN0ZW5lcignYmx1cicsIG9uQ2xpY2tDbGVhbnVwLCBwYXNzaXZlQ2FwdHVyZSlcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgc3RvcEFuZFByZXZlbnQsIHRydWUpXG4gICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBvbkNsaWNrQ2xlYW51cCwgcGFzc2l2ZUNhcHR1cmUpXG4gICAgICAgICAgcm9vdFJlZi52YWx1ZS5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgb25DbGlja0NsZWFudXAsIHBhc3NpdmVDYXB0dXJlKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG5hdmlnYXRlT25DbGljayhlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uS2V5ZG93biAoZSkge1xuICAgICAgLy8gaXMgaXQgYWxyZWFkeSBkZXN0cm95ZWQ/XG4gICAgICBpZiAocm9vdFJlZi52YWx1ZSA9PT0gbnVsbCkgcmV0dXJuXG5cbiAgICAgIGVtaXQoJ2tleWRvd24nLCBlKVxuXG4gICAgICBpZiAoaXNLZXlDb2RlKGUsIFsgMTMsIDMyIF0pID09PSB0cnVlICYmIGtleWJvYXJkVGFyZ2V0ICE9PSByb290UmVmLnZhbHVlKSB7XG4gICAgICAgIGtleWJvYXJkVGFyZ2V0ICE9PSBudWxsICYmIGNsZWFudXAoKVxuXG4gICAgICAgIGlmIChlLmRlZmF1bHRQcmV2ZW50ZWQgIT09IHRydWUpIHtcbiAgICAgICAgICAvLyBmb2N1cyBleHRlcm5hbCBidXR0b24gaWYgdGhlIGZvY3VzIGhlbHBlciB3YXMgZm9jdXNlZCBiZWZvcmVcbiAgICAgICAgICBlLnFBdm9pZEZvY3VzICE9PSB0cnVlICYmIHJvb3RSZWYudmFsdWUuZm9jdXMoKVxuXG4gICAgICAgICAga2V5Ym9hcmRUYXJnZXQgPSByb290UmVmLnZhbHVlXG4gICAgICAgICAgcm9vdFJlZi52YWx1ZS5jbGFzc0xpc3QuYWRkKCdxLWJ0bi0tYWN0aXZlJylcbiAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIG9uUHJlc3NFbmQsIHRydWUpXG4gICAgICAgICAgcm9vdFJlZi52YWx1ZS5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgb25QcmVzc0VuZCwgcGFzc2l2ZUNhcHR1cmUpXG4gICAgICAgIH1cblxuICAgICAgICBzdG9wQW5kUHJldmVudChlKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uVG91Y2hzdGFydCAoZSkge1xuICAgICAgLy8gaXMgaXQgYWxyZWFkeSBkZXN0cm95ZWQ/XG4gICAgICBpZiAocm9vdFJlZi52YWx1ZSA9PT0gbnVsbCkgcmV0dXJuXG5cbiAgICAgIGVtaXQoJ3RvdWNoc3RhcnQnLCBlKVxuXG4gICAgICBpZiAoZS5kZWZhdWx0UHJldmVudGVkID09PSB0cnVlKSByZXR1cm5cblxuICAgICAgaWYgKHRvdWNoVGFyZ2V0ICE9PSByb290UmVmLnZhbHVlKSB7XG4gICAgICAgIHRvdWNoVGFyZ2V0ICE9PSBudWxsICYmIGNsZWFudXAoKVxuICAgICAgICB0b3VjaFRhcmdldCA9IHJvb3RSZWYudmFsdWVcblxuICAgICAgICBsb2NhbFRvdWNoVGFyZ2V0RWwgPSBlLnRhcmdldFxuICAgICAgICBsb2NhbFRvdWNoVGFyZ2V0RWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCBvblByZXNzRW5kLCBwYXNzaXZlQ2FwdHVyZSlcbiAgICAgICAgbG9jYWxUb3VjaFRhcmdldEVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgb25QcmVzc0VuZCwgcGFzc2l2ZUNhcHR1cmUpXG4gICAgICB9XG5cbiAgICAgIC8vIGF2b2lkIGR1cGxpY2F0ZWQgbW91c2Vkb3duIGV2ZW50XG4gICAgICAvLyB0cmlnZ2VyaW5nIGFub3RoZXIgZWFybHkgcmlwcGxlXG4gICAgICBhdm9pZE1vdXNlUmlwcGxlID0gdHJ1ZVxuICAgICAgbW91c2VUaW1lciAhPT0gbnVsbCAmJiBjbGVhclRpbWVvdXQobW91c2VUaW1lcilcbiAgICAgIG1vdXNlVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgbW91c2VUaW1lciA9IG51bGxcbiAgICAgICAgYXZvaWRNb3VzZVJpcHBsZSA9IGZhbHNlXG4gICAgICB9LCAyMDApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Nb3VzZWRvd24gKGUpIHtcbiAgICAgIC8vIGlzIGl0IGFscmVhZHkgZGVzdHJveWVkP1xuICAgICAgaWYgKHJvb3RSZWYudmFsdWUgPT09IG51bGwpIHJldHVyblxuXG4gICAgICBlLnFTa2lwUmlwcGxlID0gYXZvaWRNb3VzZVJpcHBsZSA9PT0gdHJ1ZVxuICAgICAgZW1pdCgnbW91c2Vkb3duJywgZSlcblxuICAgICAgaWYgKGUuZGVmYXVsdFByZXZlbnRlZCAhPT0gdHJ1ZSAmJiBtb3VzZVRhcmdldCAhPT0gcm9vdFJlZi52YWx1ZSkge1xuICAgICAgICBtb3VzZVRhcmdldCAhPT0gbnVsbCAmJiBjbGVhbnVwKClcbiAgICAgICAgbW91c2VUYXJnZXQgPSByb290UmVmLnZhbHVlXG4gICAgICAgIHJvb3RSZWYudmFsdWUuY2xhc3NMaXN0LmFkZCgncS1idG4tLWFjdGl2ZScpXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBvblByZXNzRW5kLCBwYXNzaXZlQ2FwdHVyZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblByZXNzRW5kIChlKSB7XG4gICAgICAvLyBpcyBpdCBhbHJlYWR5IGRlc3Ryb3llZD9cbiAgICAgIGlmIChyb290UmVmLnZhbHVlID09PSBudWxsKSByZXR1cm5cblxuICAgICAgLy8gbmVlZGVkIGZvciBJRSAoYmVjYXVzZSBpdCBlbWl0cyBibHVyIHdoZW4gZm9jdXNpbmcgYnV0dG9uIGZyb20gZm9jdXMgaGVscGVyKVxuICAgICAgaWYgKFxuICAgICAgICBlPy50eXBlID09PSAnYmx1cidcbiAgICAgICAgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gcm9vdFJlZi52YWx1ZVxuICAgICAgKSByZXR1cm5cblxuICAgICAgaWYgKGU/LnR5cGUgPT09ICdrZXl1cCcpIHtcbiAgICAgICAgaWYgKGtleWJvYXJkVGFyZ2V0ID09PSByb290UmVmLnZhbHVlICYmIGlzS2V5Q29kZShlLCBbIDEzLCAzMiBdKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIC8vIGZvciBjbGljayB0cmlnZ2VyXG4gICAgICAgICAgY29uc3QgZXZ0ID0gbmV3IE1vdXNlRXZlbnQoJ2NsaWNrJywgZSlcbiAgICAgICAgICBldnQucUtleUV2ZW50ID0gdHJ1ZVxuICAgICAgICAgIGUuZGVmYXVsdFByZXZlbnRlZCA9PT0gdHJ1ZSAmJiBwcmV2ZW50KGV2dClcbiAgICAgICAgICBlLmNhbmNlbEJ1YmJsZSA9PT0gdHJ1ZSAmJiBzdG9wKGV2dClcbiAgICAgICAgICByb290UmVmLnZhbHVlLmRpc3BhdGNoRXZlbnQoZXZ0KVxuXG4gICAgICAgICAgc3RvcEFuZFByZXZlbnQoZSlcblxuICAgICAgICAgIC8vIGZvciByaXBwbGVcbiAgICAgICAgICBlLnFLZXlFdmVudCA9IHRydWVcbiAgICAgICAgfVxuXG4gICAgICAgIGVtaXQoJ2tleXVwJywgZSlcbiAgICAgIH1cblxuICAgICAgY2xlYW51cCgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYW51cCAoZGVzdHJveWluZykge1xuICAgICAgY29uc3QgYmx1clRhcmdldCA9IGJsdXJUYXJnZXRSZWYudmFsdWVcblxuICAgICAgaWYgKFxuICAgICAgICBkZXN0cm95aW5nICE9PSB0cnVlXG4gICAgICAgICYmICh0b3VjaFRhcmdldCA9PT0gcm9vdFJlZi52YWx1ZSB8fCBtb3VzZVRhcmdldCA9PT0gcm9vdFJlZi52YWx1ZSlcbiAgICAgICAgJiYgYmx1clRhcmdldCAhPT0gbnVsbFxuICAgICAgICAmJiBibHVyVGFyZ2V0ICE9PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50XG4gICAgICApIHtcbiAgICAgICAgYmx1clRhcmdldC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgLTEpXG4gICAgICAgIGJsdXJUYXJnZXQuZm9jdXMoKVxuICAgICAgfVxuXG4gICAgICBpZiAodG91Y2hUYXJnZXQgPT09IHJvb3RSZWYudmFsdWUpIHtcbiAgICAgICAgaWYgKGxvY2FsVG91Y2hUYXJnZXRFbCAhPT0gbnVsbCkge1xuICAgICAgICAgIGxvY2FsVG91Y2hUYXJnZXRFbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIG9uUHJlc3NFbmQsIHBhc3NpdmVDYXB0dXJlKVxuICAgICAgICAgIGxvY2FsVG91Y2hUYXJnZXRFbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIG9uUHJlc3NFbmQsIHBhc3NpdmVDYXB0dXJlKVxuICAgICAgICB9XG4gICAgICAgIHRvdWNoVGFyZ2V0ID0gbG9jYWxUb3VjaFRhcmdldEVsID0gbnVsbFxuICAgICAgfVxuXG4gICAgICBpZiAobW91c2VUYXJnZXQgPT09IHJvb3RSZWYudmFsdWUpIHtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG9uUHJlc3NFbmQsIHBhc3NpdmVDYXB0dXJlKVxuICAgICAgICBtb3VzZVRhcmdldCA9IG51bGxcbiAgICAgIH1cblxuICAgICAgaWYgKGtleWJvYXJkVGFyZ2V0ID09PSByb290UmVmLnZhbHVlKSB7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgb25QcmVzc0VuZCwgdHJ1ZSlcbiAgICAgICAgcm9vdFJlZi52YWx1ZT8ucmVtb3ZlRXZlbnRMaXN0ZW5lcignYmx1cicsIG9uUHJlc3NFbmQsIHBhc3NpdmVDYXB0dXJlKVxuICAgICAgICBrZXlib2FyZFRhcmdldCA9IG51bGxcbiAgICAgIH1cblxuICAgICAgcm9vdFJlZi52YWx1ZT8uY2xhc3NMaXN0LnJlbW92ZSgncS1idG4tLWFjdGl2ZScpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Mb2FkaW5nRXZ0IChldnQpIHtcbiAgICAgIHN0b3BBbmRQcmV2ZW50KGV2dClcbiAgICAgIGV2dC5xU2tpcFJpcHBsZSA9IHRydWVcbiAgICB9XG5cbiAgICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgICAgY2xlYW51cCh0cnVlKVxuICAgIH0pXG5cbiAgICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHNcbiAgICBPYmplY3QuYXNzaWduKHByb3h5LCB7XG4gICAgICBjbGljazogZSA9PiB7XG4gICAgICAgIGlmIChpc0FjdGlvbmFibGUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICBvbkNsaWNrKGUpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGxldCBpbm5lciA9IFtdXG5cbiAgICAgIHByb3BzLmljb24gIT09IHZvaWQgMCAmJiBpbm5lci5wdXNoKFxuICAgICAgICBoKFFJY29uLCB7XG4gICAgICAgICAgbmFtZTogcHJvcHMuaWNvbixcbiAgICAgICAgICBsZWZ0OiBwcm9wcy5zdGFjayAhPT0gdHJ1ZSAmJiBoYXNMYWJlbC52YWx1ZSA9PT0gdHJ1ZSxcbiAgICAgICAgICByb2xlOiAnaW1nJ1xuICAgICAgICB9KVxuICAgICAgKVxuXG4gICAgICBoYXNMYWJlbC52YWx1ZSA9PT0gdHJ1ZSAmJiBpbm5lci5wdXNoKFxuICAgICAgICBoKCdzcGFuJywgeyBjbGFzczogJ2Jsb2NrJyB9LCBbIHByb3BzLmxhYmVsIF0pXG4gICAgICApXG5cbiAgICAgIGlubmVyID0gaE1lcmdlU2xvdChzbG90cy5kZWZhdWx0LCBpbm5lcilcblxuICAgICAgaWYgKHByb3BzLmljb25SaWdodCAhPT0gdm9pZCAwICYmIHByb3BzLnJvdW5kID09PSBmYWxzZSkge1xuICAgICAgICBpbm5lci5wdXNoKFxuICAgICAgICAgIGgoUUljb24sIHtcbiAgICAgICAgICAgIG5hbWU6IHByb3BzLmljb25SaWdodCxcbiAgICAgICAgICAgIHJpZ2h0OiBwcm9wcy5zdGFjayAhPT0gdHJ1ZSAmJiBoYXNMYWJlbC52YWx1ZSA9PT0gdHJ1ZSxcbiAgICAgICAgICAgIHJvbGU6ICdpbWcnXG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBjaGlsZCA9IFtcbiAgICAgICAgaCgnc3BhbicsIHtcbiAgICAgICAgICBjbGFzczogJ3EtZm9jdXMtaGVscGVyJyxcbiAgICAgICAgICByZWY6IGJsdXJUYXJnZXRSZWZcbiAgICAgICAgfSlcbiAgICAgIF1cblxuICAgICAgaWYgKHByb3BzLmxvYWRpbmcgPT09IHRydWUgJiYgcHJvcHMucGVyY2VudGFnZSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGNoaWxkLnB1c2goXG4gICAgICAgICAgaCgnc3BhbicsIHtcbiAgICAgICAgICAgIGNsYXNzOiAncS1idG5fX3Byb2dyZXNzIGFic29sdXRlLWZ1bGwgb3ZlcmZsb3ctaGlkZGVuJyArIChwcm9wcy5kYXJrUGVyY2VudGFnZSA9PT0gdHJ1ZSA/ICcgcS1idG5fX3Byb2dyZXNzLS1kYXJrJyA6ICcnKVxuICAgICAgICAgIH0sIFtcbiAgICAgICAgICAgIGgoJ3NwYW4nLCB7XG4gICAgICAgICAgICAgIGNsYXNzOiAncS1idG5fX3Byb2dyZXNzLWluZGljYXRvciBmaXQgYmxvY2snLFxuICAgICAgICAgICAgICBzdHlsZTogcGVyY2VudGFnZVN0eWxlLnZhbHVlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF0pXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgaCgnc3BhbicsIHtcbiAgICAgICAgICBjbGFzczogJ3EtYnRuX19jb250ZW50IHRleHQtY2VudGVyIGNvbCBpdGVtcy1jZW50ZXIgcS1hbmNob3ItLXNraXAgJyArIGlubmVyQ2xhc3Nlcy52YWx1ZVxuICAgICAgICB9LCBpbm5lcilcbiAgICAgIClcblxuICAgICAgcHJvcHMubG9hZGluZyAhPT0gbnVsbCAmJiBjaGlsZC5wdXNoKFxuICAgICAgICBoKFRyYW5zaXRpb24sIHtcbiAgICAgICAgICBuYW1lOiAncS10cmFuc2l0aW9uLS1mYWRlJ1xuICAgICAgICB9LCAoKSA9PiAoXG4gICAgICAgICAgcHJvcHMubG9hZGluZyA9PT0gdHJ1ZVxuICAgICAgICAgICAgPyBbXG4gICAgICAgICAgICAgICAgaCgnc3BhbicsIHtcbiAgICAgICAgICAgICAgICAgIGtleTogJ2xvYWRpbmcnLFxuICAgICAgICAgICAgICAgICAgY2xhc3M6ICdhYnNvbHV0ZS1mdWxsIGZsZXggZmxleC1jZW50ZXInXG4gICAgICAgICAgICAgICAgfSwgc2xvdHMubG9hZGluZyAhPT0gdm9pZCAwID8gc2xvdHMubG9hZGluZygpIDogWyBoKFFTcGlubmVyKSBdKVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICA6IG51bGxcbiAgICAgICAgKSlcbiAgICAgIClcblxuICAgICAgcmV0dXJuIHdpdGhEaXJlY3RpdmVzKFxuICAgICAgICBoKFxuICAgICAgICAgIGxpbmtUYWcudmFsdWUsXG4gICAgICAgICAgbm9kZVByb3BzLnZhbHVlLFxuICAgICAgICAgIGNoaWxkXG4gICAgICAgICksXG4gICAgICAgIFsgW1xuICAgICAgICAgIFJpcHBsZSxcbiAgICAgICAgICByaXBwbGUudmFsdWUsXG4gICAgICAgICAgdm9pZCAwLFxuICAgICAgICAgIHJpcHBsZVByb3BzLnZhbHVlXG4gICAgICAgIF0gXVxuICAgICAgKVxuICAgIH1cbiAgfVxufSlcbiJdLCJuYW1lcyI6WyJtYXRjaGVzIiwiY3NzIl0sIm1hcHBpbmdzIjoiO0FBRU8sTUFBTSxrQkFBa0I7QUFBQSxFQUM3QixJQUFJO0FBQUEsRUFDSixJQUFJO0FBQUEsRUFDSixJQUFJO0FBQUEsRUFDSixJQUFJO0FBQUEsRUFDSixJQUFJO0FBQ047QUFFWSxNQUFDLGVBQWU7QUFBQSxFQUMxQixNQUFNO0FBQ1I7QUFFZSxTQUFBLFFBQVUsT0FBTyxRQUFRLGlCQUFpQjtBQUV2RCxTQUFPLFNBQVMsTUFDZCxNQUFNLFNBQVMsU0FDWCxFQUFFLFVBQVUsTUFBTSxRQUFRLFFBQVEsR0FBSSxNQUFPLE1BQU0sSUFBTSxDQUFBLE9BQVEsTUFBTSxLQUFJLElBQzNFLElBQ0w7QUFDSDtBQ2xCTyxNQUFNLGtCQUFrQjtBQUFBLEVBQzdCLE1BQU07QUFBQSxJQUNKLE1BQU0sQ0FBRSxRQUFRLE1BQVE7QUFBQSxJQUN4QixTQUFTO0FBQUEsRUFDVjtBQUFBLEVBQ0QsT0FBTztBQUNUO0FBRWUsU0FBUyxXQUFZLE9BQU87QUFDekMsU0FBTztBQUFBLElBQ0wsT0FBTyxTQUFTLE1BQ2QsTUFBTSxRQUFRLGtCQUNWLEdBQUksZ0JBQWlCLE1BQU0sSUFBTSxDQUFBLE9BQ2pDLE1BQU0sSUFDWDtBQUFBLElBRUQsU0FBUztBQUFBLE1BQVMsTUFDaEIsZUFBZSxNQUFNLFFBQVEsU0FBVSxNQUFNLEtBQU8sS0FBSTtBQUFBLElBQzlEO0FBQUEsRUFDQTtBQUNBO0FDakJBLE1BQUEsV0FBZSxnQkFBZ0I7QUFBQSxFQUM3QixNQUFNO0FBQUEsRUFFTixPQUFPO0FBQUEsSUFDTCxHQUFHO0FBQUEsSUFFSCxXQUFXO0FBQUEsTUFDVCxNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsSUFDZjtBQUFBLEVBQ0c7QUFBQSxFQUVELE1BQU8sT0FBTztBQUNaLFVBQU0sRUFB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TSxlQUFTLFVBQVUsUUFBUSxNQUFNO0FBQUEsUUFDL0IsRUFBRSxRQUFRLEVBQUUsT0FBTyxRQUFPLEdBQUksQ0FBRSxNQUFNLEtBQU8sQ0FBQTtBQUFBLE1BQ3JEO0FBRU0sY0FBUSxXQUFXLE1BQU0sU0FBUyxLQUFLO0FBRXZDLFVBQUksTUFBTSxjQUFjLFVBQVUsTUFBTSxVQUFVLE9BQU87QUFDdkQsY0FBTTtBQUFBLFVBQ0osRUFBRSxPQUFPO0FBQUEsWUFDUCxNQUFNLE1BQU07QUFBQSxZQUNaLE9BQU8sTUFBTSxVQUFVLFFBQVEsU0FBUyxVQUFVO0FBQUEsWUFDbEQsTUFBTTtBQUFBLFVBQ1AsQ0FBQTtBQUFBLFFBQ1g7QUFBQSxNQUNBO0FBRU0sWUFBTSxRQUFRO0FBQUEsUUFDWixFQUFFLFFBQVE7QUFBQSxVQUNSLE9BQU87QUFBQSxVQUNQLEtBQUs7QUFBQSxRQUNOLENBQUE7QUFBQSxNQUNUO0FBRU0sVUFBSSxNQUFNLFlBQVksUUFBUSxNQUFNLGVBQWUsUUFBUTtBQUN6RCxjQUFNO0FBQUEsVUFDSixFQUFFLFFBQVE7QUFBQSxZQUNSLE9BQU8sbURBQW1ELE1BQU0sbUJBQW1CLE9BQU8sMkJBQTJCO0FBQUEsVUFDakksR0FBYTtBQUFBLFlBQ0QsRUFBRSxRQUFRO0FBQUEsY0FDUixPQUFPO0FBQUEsY0FDUCxPQUFPLGdCQUFnQjtBQUFBLFlBQ3hCLENBQUE7QUFBQSxVQUNGLENBQUE7QUFBQSxRQUNYO0FBQUEsTUFDQTtBQUVNLFlBQU07QUFBQSxRQUNKLEVBQUUsUUFBUTtBQUFBLFVBQ1IsT0FBTyxnRUFBZ0UsYUFBYTtBQUFBLFFBQzlGLEdBQVcsS0FBSztBQUFBLE1BQ2hCO0FBRU0sWUFBTSxZQUFZLFFBQVEsTUFBTTtBQUFBLFFBQzlCLEVBQUUsWUFBWTtBQUFBLFVBQ1osTUFBTTtBQUFBLFFBQ2hCLEdBQVcsTUFDRCxNQUFNLFlBQVksT0FDZDtBQUFBLFVBQ0UsRUFBRSxRQUFRO0FBQUEsWUFDUixLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsVUFDekIsR0FBbUIsTUFBTSxZQUFZLFNBQVMsTUFBTSxZQUFZLENBQUUsRUFBRSxRQUFRLENBQUcsQ0FBQTtBQUFBLFFBQy9FLElBQ2MsSUFDTDtBQUFBLE1BQ1Q7QUFFTSxhQUFPO0FBQUEsUUFDTDtBQUFBLFVBQ0UsUUFBUTtBQUFBLFVBQ1IsVUFBVTtBQUFBLFVBQ1Y7QUFBQSxRQUNEO0FBQUEsUUFDRCxDQUFFO0FBQUEsVUFDQTtBQUFBLFVBQ0EsT0FBTztBQUFBLFVBQ1A7QUFBQSxVQUNBLFlBQVk7QUFBQSxRQUNiLENBQUE7QUFBQSxNQUNUO0FBQUEsSUFDQTtBQUFBLEVBQ0E7QUFDQSxDQUFDOyIsInhfZ29vZ2xlX2lnbm9yZUxpc3QiOlswLDEsMiwzLDQsNSw2LDcsOCw5LDEwLDExLDEyXX0=
