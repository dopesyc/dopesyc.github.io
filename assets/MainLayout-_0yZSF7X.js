import { a as createComponent, b as computed, h, d as hSlot, r as ref, i as isRuntimeSsrPreHydration, o as onMounted, g as getCurrentInstance, e as onBeforeUnmount, n as noop, f as nextTick, l as listenOpts, j as inject, k as emptyRenderFn, m as layoutKey, w as watch, p as hMergeSlot, q as provide, s as pageContainerKey, t as getElement, u as css, v as reactive, x as onUnmounted, y as onBeforeUpdate, z as formKey, A as debounce, B as injectProp, C as stopAndPrevent, D as onDeactivated, E as onActivated, F as prevent, Q as QIcon, G as QSpinner, T as Transition, H as useSizeProps, I as useSize, J as hDir, K as hMergeSlotSafely, R as Ripple, L as useRouterLinkProps, M as useRouterLink, N as isKeyCode, O as hUniqueSlot, P as Platform, S as addEvt, U as cleanEvt, V as vmHasRouter, W as getParentProxy, X as Teleport, Y as createGlobalNode, Z as removeGlobalNode, _ as vmIsDestroyed, $ as client, a0 as position, a1 as childHasFocus, a2 as History, a3 as getEventPath, a4 as onBeforeMount, a5 as isDeepEqual, a6 as shouldIgnoreKey, a7 as onUpdated, a8 as stop, a9 as _export_sfc, aa as createElementBlock, ab as openBlock, ac as createVNode, ad as createBlock, ae as withCtx, af as resolveComponent, ag as normalizeClass, ah as createBaseVNode } from "./index-NyiAvSu4.js";
import { u as useDarkProps, a as useDark, b as useFormProps, c as useFormInputNameAttr, d as useMoodStore } from "./moodStore-nKiY1B-O.js";
const QToolbarTitle = createComponent({
  name: "QToolbarTitle",
  props: {
    shrink: Boolean
  },
  setup(props, { slots }) {
    const classes = computed(
      () => "q-toolbar__title ellipsis" + (props.shrink === true ? " col-shrink" : "")
    );
    return () => h("div", { class: classes.value }, hSlot(slots.default));
  }
});
const QToolbar = createComponent({
  name: "QToolbar",
  props: {
    inset: Boolean
  },
  setup(props, { slots }) {
    const classes = computed(
      () => "q-toolbar row no-wrap items-center" + (props.inset === true ? " q-toolbar--inset" : "")
    );
    return () => h("div", { class: classes.value, role: "toolbar" }, hSlot(slots.default));
  }
});
function useHydration() {
  const isHydrated = ref(!isRuntimeSsrPreHydration.value);
  if (isHydrated.value === false) {
    onMounted(() => {
      isHydrated.value = true;
    });
  }
  return { isHydrated };
}
const hasObserver = typeof ResizeObserver !== "undefined";
const resizeProps = hasObserver === true ? {} : {
  style: "display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",
  url: "about:blank"
};
const QResizeObserver = createComponent({
  name: "QResizeObserver",
  props: {
    debounce: {
      type: [String, Number],
      default: 100
    }
  },
  emits: ["resize"],
  setup(props, { emit }) {
    let timer = null, targetEl, size2 = { width: -1, height: -1 };
    function trigger2(immediately) {
      if (immediately === true || props.debounce === 0 || props.debounce === "0") {
        emitEvent();
      } else if (timer === null) {
        timer = setTimeout(emitEvent, props.debounce);
      }
    }
    function emitEvent() {
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
      if (targetEl) {
        const { offsetWidth: width, offsetHeight: height } = targetEl;
        if (width !== size2.width || height !== size2.height) {
          size2 = { width, height };
          emit("resize", size2);
        }
      }
    }
    const { proxy } = getCurrentInstance();
    proxy.trigger = trigger2;
    if (hasObserver === true) {
      let observer;
      const init = (stop2) => {
        targetEl = proxy.$el.parentNode;
        if (targetEl) {
          observer = new ResizeObserver(trigger2);
          observer.observe(targetEl);
          emitEvent();
        } else if (stop2 !== true) {
          nextTick(() => {
            init(true);
          });
        }
      };
      onMounted(() => {
        init();
      });
      onBeforeUnmount(() => {
        timer !== null && clearTimeout(timer);
        if (observer !== void 0) {
          if (observer.disconnect !== void 0) {
            observer.disconnect();
          } else if (targetEl) {
            observer.unobserve(targetEl);
          }
        }
      });
      return noop;
    } else {
      let cleanup = function() {
        if (timer !== null) {
          clearTimeout(timer);
          timer = null;
        }
        if (curDocView !== void 0) {
          if (curDocView.removeEventListener !== void 0) {
            curDocView.removeEventListener("resize", trigger2, listenOpts.passive);
          }
          curDocView = void 0;
        }
      }, onObjLoad = function() {
        cleanup();
        if (targetEl?.contentDocument) {
          curDocView = targetEl.contentDocument.defaultView;
          curDocView.addEventListener("resize", trigger2, listenOpts.passive);
          emitEvent();
        }
      };
      const { isHydrated } = useHydration();
      let curDocView;
      onMounted(() => {
        nextTick(() => {
          targetEl = proxy.$el;
          targetEl && onObjLoad();
        });
      });
      onBeforeUnmount(cleanup);
      return () => {
        if (isHydrated.value === true) {
          return h("object", {
            class: "q--avoid-card-border",
            style: resizeProps.style,
            tabindex: -1,
            // fix for Firefox
            type: "text/html",
            data: resizeProps.url,
            "aria-hidden": "true",
            onLoad: onObjLoad
          });
        }
      };
    }
  }
});
const QFooter = createComponent({
  name: "QFooter",
  props: {
    modelValue: {
      type: Boolean,
      default: true
    },
    reveal: Boolean,
    bordered: Boolean,
    elevated: Boolean,
    heightHint: {
      type: [String, Number],
      default: 50
    }
  },
  emits: ["reveal", "focusin"],
  setup(props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const $layout = inject(layoutKey, emptyRenderFn);
    if ($layout === emptyRenderFn) {
      console.error("QFooter needs to be child of QLayout");
      return emptyRenderFn;
    }
    const size2 = ref(parseInt(props.heightHint, 10));
    const revealed = ref(true);
    const windowHeight = ref(
      isRuntimeSsrPreHydration.value === true || $layout.isContainer.value === true ? 0 : window.innerHeight
    );
    const fixed = computed(
      () => props.reveal === true || $layout.view.value.indexOf("F") !== -1 || $q.platform.is.ios && $layout.isContainer.value === true
    );
    const containerHeight = computed(() => $layout.isContainer.value === true ? $layout.containerHeight.value : windowHeight.value);
    const offset = computed(() => {
      if (props.modelValue !== true) {
        return 0;
      }
      if (fixed.value === true) {
        return revealed.value === true ? size2.value : 0;
      }
      const offset2 = $layout.scroll.value.position + containerHeight.value + size2.value - $layout.height.value;
      return offset2 > 0 ? offset2 : 0;
    });
    const hidden = computed(
      () => props.modelValue !== true || fixed.value === true && revealed.value !== true
    );
    const revealOnFocus = computed(
      () => props.modelValue === true && hidden.value === true && props.reveal === true
    );
    const classes = computed(
      () => "q-footer q-layout__section--marginal " + (fixed.value === true ? "fixed" : "absolute") + "-bottom" + (props.bordered === true ? " q-footer--bordered" : "") + (hidden.value === true ? " q-footer--hidden" : "") + (props.modelValue !== true ? " q-layout--prevent-focus" + (fixed.value !== true ? " hidden" : "") : "")
    );
    const style = computed(() => {
      const view = $layout.rows.value.bottom, css2 = {};
      if (view[0] === "l" && $layout.left.space === true) {
        css2[$q.lang.rtl === true ? "right" : "left"] = `${$layout.left.size}px`;
      }
      if (view[2] === "r" && $layout.right.space === true) {
        css2[$q.lang.rtl === true ? "left" : "right"] = `${$layout.right.size}px`;
      }
      return css2;
    });
    function updateLayout(prop, val) {
      $layout.update("footer", prop, val);
    }
    function updateLocal(prop, val) {
      if (prop.value !== val) {
        prop.value = val;
      }
    }
    function onResize({ height }) {
      updateLocal(size2, height);
      updateLayout("size", height);
    }
    function updateRevealed() {
      if (props.reveal !== true) return;
      const { direction, position: position2, inflectionPoint } = $layout.scroll.value;
      updateLocal(revealed, direction === "up" || position2 - inflectionPoint < 100 || $layout.height.value - containerHeight.value - position2 - size2.value < 300);
    }
    function onFocusin(evt) {
      if (revealOnFocus.value === true) {
        updateLocal(revealed, true);
      }
      emit("focusin", evt);
    }
    watch(() => props.modelValue, (val) => {
      updateLayout("space", val);
      updateLocal(revealed, true);
      $layout.animate();
    });
    watch(offset, (val) => {
      updateLayout("offset", val);
    });
    watch(() => props.reveal, (val) => {
      val === false && updateLocal(revealed, props.modelValue);
    });
    watch(revealed, (val) => {
      $layout.animate();
      emit("reveal", val);
    });
    watch([size2, $layout.scroll, $layout.height], updateRevealed);
    watch(() => $q.screen.height, (val) => {
      $layout.isContainer.value !== true && updateLocal(windowHeight, val);
    });
    const instance = {};
    $layout.instances.footer = instance;
    props.modelValue === true && updateLayout("size", size2.value);
    updateLayout("space", props.modelValue);
    updateLayout("offset", offset.value);
    onBeforeUnmount(() => {
      if ($layout.instances.footer === instance) {
        $layout.instances.footer = void 0;
        updateLayout("size", 0);
        updateLayout("offset", 0);
        updateLayout("space", false);
      }
    });
    return () => {
      const child = hMergeSlot(slots.default, [
        h(QResizeObserver, {
          debounce: 0,
          onResize
        })
      ]);
      props.elevated === true && child.push(
        h("div", {
          class: "q-layout__shadow absolute-full overflow-hidden no-pointer-events"
        })
      );
      return h("footer", {
        class: classes.value,
        style: style.value,
        onFocusin
      }, child);
    };
  }
});
const QPageContainer = createComponent({
  name: "QPageContainer",
  setup(_, { slots }) {
    const { proxy: { $q } } = getCurrentInstance();
    const $layout = inject(layoutKey, emptyRenderFn);
    if ($layout === emptyRenderFn) {
      console.error("QPageContainer needs to be child of QLayout");
      return emptyRenderFn;
    }
    provide(pageContainerKey, true);
    const style = computed(() => {
      const css2 = {};
      if ($layout.header.space === true) {
        css2.paddingTop = `${$layout.header.size}px`;
      }
      if ($layout.right.space === true) {
        css2[`padding${$q.lang.rtl === true ? "Left" : "Right"}`] = `${$layout.right.size}px`;
      }
      if ($layout.footer.space === true) {
        css2.paddingBottom = `${$layout.footer.size}px`;
      }
      if ($layout.left.space === true) {
        css2[`padding${$q.lang.rtl === true ? "Right" : "Left"}`] = `${$layout.left.size}px`;
      }
      return css2;
    });
    return () => h("div", {
      class: "q-page-container",
      style: style.value
    }, hSlot(slots.default));
  }
});
const scrollTargetProp = [Element, String];
const scrollTargets = [null, document, document.body, document.scrollingElement, document.documentElement];
function getScrollTarget(el, targetEl) {
  let target = getElement(targetEl);
  if (target === void 0) {
    if (el === void 0 || el === null) {
      return window;
    }
    target = el.closest(".scroll,.scroll-y,.overflow-auto");
  }
  return scrollTargets.includes(target) ? window : target;
}
function getVerticalScrollPosition(scrollTarget) {
  return scrollTarget === window ? window.pageYOffset || window.scrollY || document.body.scrollTop || 0 : scrollTarget.scrollTop;
}
function getHorizontalScrollPosition(scrollTarget) {
  return scrollTarget === window ? window.pageXOffset || window.scrollX || document.body.scrollLeft || 0 : scrollTarget.scrollLeft;
}
let size;
function getScrollbarWidth() {
  if (size !== void 0) {
    return size;
  }
  const inner = document.createElement("p"), outer = document.createElement("div");
  css(inner, {
    width: "100%",
    height: "200px"
  });
  css(outer, {
    position: "absolute",
    top: "0px",
    left: "0px",
    visibility: "hidden",
    width: "200px",
    height: "150px",
    overflow: "hidden"
  });
  outer.appendChild(inner);
  document.body.appendChild(outer);
  const w1 = inner.offsetWidth;
  outer.style.overflow = "scroll";
  let w2 = inner.offsetWidth;
  if (w1 === w2) {
    w2 = outer.clientWidth;
  }
  outer.remove();
  size = w1 - w2;
  return size;
}
function hasScrollbar(el, onY = true) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) {
    return false;
  }
  return onY ? el.scrollHeight > el.clientHeight && (el.classList.contains("scroll") || el.classList.contains("overflow-auto") || ["auto", "scroll"].includes(window.getComputedStyle(el)["overflow-y"])) : el.scrollWidth > el.clientWidth && (el.classList.contains("scroll") || el.classList.contains("overflow-auto") || ["auto", "scroll"].includes(window.getComputedStyle(el)["overflow-x"]));
}
const { passive } = listenOpts;
const axisValues = ["both", "horizontal", "vertical"];
const QScrollObserver = createComponent({
  name: "QScrollObserver",
  props: {
    axis: {
      type: String,
      validator: (v) => axisValues.includes(v),
      default: "vertical"
    },
    debounce: [String, Number],
    scrollTarget: scrollTargetProp
  },
  emits: ["scroll"],
  setup(props, { emit }) {
    const scroll = {
      position: {
        top: 0,
        left: 0
      },
      direction: "down",
      directionChanged: false,
      delta: {
        top: 0,
        left: 0
      },
      inflectionPoint: {
        top: 0,
        left: 0
      }
    };
    let clearTimer = null, localScrollTarget, parentEl;
    watch(() => props.scrollTarget, () => {
      unconfigureScrollTarget();
      configureScrollTarget();
    });
    function emitEvent() {
      clearTimer?.();
      const top = Math.max(0, getVerticalScrollPosition(localScrollTarget));
      const left = getHorizontalScrollPosition(localScrollTarget);
      const delta = {
        top: top - scroll.position.top,
        left: left - scroll.position.left
      };
      if (props.axis === "vertical" && delta.top === 0 || props.axis === "horizontal" && delta.left === 0) return;
      const curDir = Math.abs(delta.top) >= Math.abs(delta.left) ? delta.top < 0 ? "up" : "down" : delta.left < 0 ? "left" : "right";
      scroll.position = { top, left };
      scroll.directionChanged = scroll.direction !== curDir;
      scroll.delta = delta;
      if (scroll.directionChanged === true) {
        scroll.direction = curDir;
        scroll.inflectionPoint = scroll.position;
      }
      emit("scroll", { ...scroll });
    }
    function configureScrollTarget() {
      localScrollTarget = getScrollTarget(parentEl, props.scrollTarget);
      localScrollTarget.addEventListener("scroll", trigger2, passive);
      trigger2(true);
    }
    function unconfigureScrollTarget() {
      if (localScrollTarget !== void 0) {
        localScrollTarget.removeEventListener("scroll", trigger2, passive);
        localScrollTarget = void 0;
      }
    }
    function trigger2(immediately) {
      if (immediately === true || props.debounce === 0 || props.debounce === "0") {
        emitEvent();
      } else if (clearTimer === null) {
        const [timer, fn] = props.debounce ? [setTimeout(emitEvent, props.debounce), clearTimeout] : [requestAnimationFrame(emitEvent), cancelAnimationFrame];
        clearTimer = () => {
          fn(timer);
          clearTimer = null;
        };
      }
    }
    const { proxy } = getCurrentInstance();
    watch(() => proxy.$q.lang.rtl, emitEvent);
    onMounted(() => {
      parentEl = proxy.$el.parentNode;
      configureScrollTarget();
    });
    onBeforeUnmount(() => {
      clearTimer?.();
      unconfigureScrollTarget();
    });
    Object.assign(proxy, {
      trigger: trigger2,
      getPosition: () => scroll
    });
    return noop;
  }
});
const QLayout = createComponent({
  name: "QLayout",
  props: {
    container: Boolean,
    view: {
      type: String,
      default: "hhh lpr fff",
      validator: (v) => /^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(v.toLowerCase())
    },
    onScroll: Function,
    onScrollHeight: Function,
    onResize: Function
  },
  setup(props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const rootRef = ref(null);
    const height = ref($q.screen.height);
    const width = ref(props.container === true ? 0 : $q.screen.width);
    const scroll = ref({ position: 0, direction: "down", inflectionPoint: 0 });
    const containerHeight = ref(0);
    const scrollbarWidth = ref(isRuntimeSsrPreHydration.value === true ? 0 : getScrollbarWidth());
    const classes = computed(
      () => "q-layout q-layout--" + (props.container === true ? "containerized" : "standard")
    );
    const style = computed(() => props.container === false ? { minHeight: $q.screen.height + "px" } : null);
    const targetStyle = computed(() => scrollbarWidth.value !== 0 ? { [$q.lang.rtl === true ? "left" : "right"]: `${scrollbarWidth.value}px` } : null);
    const targetChildStyle = computed(() => scrollbarWidth.value !== 0 ? {
      [$q.lang.rtl === true ? "right" : "left"]: 0,
      [$q.lang.rtl === true ? "left" : "right"]: `-${scrollbarWidth.value}px`,
      width: `calc(100% + ${scrollbarWidth.value}px)`
    } : null);
    function onPageScroll(data) {
      if (props.container === true || document.qScrollPrevented !== true) {
        const info = {
          position: data.position.top,
          direction: data.direction,
          directionChanged: data.directionChanged,
          inflectionPoint: data.inflectionPoint.top,
          delta: data.delta.top
        };
        scroll.value = info;
        props.onScroll !== void 0 && emit("scroll", info);
      }
    }
    function onPageResize(data) {
      const { height: newHeight, width: newWidth } = data;
      let resized = false;
      if (height.value !== newHeight) {
        resized = true;
        height.value = newHeight;
        props.onScrollHeight !== void 0 && emit("scrollHeight", newHeight);
        updateScrollbarWidth();
      }
      if (width.value !== newWidth) {
        resized = true;
        width.value = newWidth;
      }
      if (resized === true && props.onResize !== void 0) {
        emit("resize", data);
      }
    }
    function onContainerResize({ height: height2 }) {
      if (containerHeight.value !== height2) {
        containerHeight.value = height2;
        updateScrollbarWidth();
      }
    }
    function updateScrollbarWidth() {
      if (props.container === true) {
        const width2 = height.value > containerHeight.value ? getScrollbarWidth() : 0;
        if (scrollbarWidth.value !== width2) {
          scrollbarWidth.value = width2;
        }
      }
    }
    let animateTimer = null;
    const $layout = {
      instances: {},
      view: computed(() => props.view),
      isContainer: computed(() => props.container),
      rootRef,
      height,
      containerHeight,
      scrollbarWidth,
      totalWidth: computed(() => width.value + scrollbarWidth.value),
      rows: computed(() => {
        const rows = props.view.toLowerCase().split(" ");
        return {
          top: rows[0].split(""),
          middle: rows[1].split(""),
          bottom: rows[2].split("")
        };
      }),
      header: reactive({ size: 0, offset: 0, space: false }),
      right: reactive({ size: 300, offset: 0, space: false }),
      footer: reactive({ size: 0, offset: 0, space: false }),
      left: reactive({ size: 300, offset: 0, space: false }),
      scroll,
      animate() {
        if (animateTimer !== null) {
          clearTimeout(animateTimer);
        } else {
          document.body.classList.add("q-body--layout-animate");
        }
        animateTimer = setTimeout(() => {
          animateTimer = null;
          document.body.classList.remove("q-body--layout-animate");
        }, 155);
      },
      update(part, prop, val) {
        $layout[part][prop] = val;
      }
    };
    provide(layoutKey, $layout);
    if (getScrollbarWidth() > 0) {
      let restoreScrollbar = function() {
        timer = null;
        el.classList.remove("hide-scrollbar");
      }, hideScrollbar = function() {
        if (timer === null) {
          if (el.scrollHeight > $q.screen.height) return;
          el.classList.add("hide-scrollbar");
        } else {
          clearTimeout(timer);
        }
        timer = setTimeout(restoreScrollbar, 300);
      }, updateScrollEvent = function(action) {
        if (timer !== null && action === "remove") {
          clearTimeout(timer);
          restoreScrollbar();
        }
        window[`${action}EventListener`]("resize", hideScrollbar);
      };
      let timer = null;
      const el = document.body;
      watch(
        () => props.container !== true ? "add" : "remove",
        updateScrollEvent
      );
      props.container !== true && updateScrollEvent("add");
      onUnmounted(() => {
        updateScrollEvent("remove");
      });
    }
    return () => {
      const content = hMergeSlot(slots.default, [
        h(QScrollObserver, { onScroll: onPageScroll }),
        h(QResizeObserver, { onResize: onPageResize })
      ]);
      const layout = h("div", {
        class: classes.value,
        style: style.value,
        ref: props.container === true ? void 0 : rootRef,
        tabindex: -1
      }, content);
      if (props.container === true) {
        return h("div", {
          class: "q-layout-container overflow-hidden",
          ref: rootRef
        }, [
          h(QResizeObserver, { onResize: onContainerResize }),
          h("div", {
            class: "absolute-full",
            style: targetStyle.value
          }, [
            h("div", {
              class: "scroll",
              style: targetChildStyle.value
            }, [layout])
          ])
        ]);
      }
      return layout;
    };
  }
});
let buf, bufIdx = 0;
const hexBytes = new Array(256);
for (let i = 0; i < 256; i++) {
  hexBytes[i] = (i + 256).toString(16).substring(1);
}
const randomBytes = (() => {
  const lib = typeof crypto !== "undefined" ? crypto : typeof window !== "undefined" ? window.crypto || window.msCrypto : void 0;
  if (lib !== void 0) {
    if (lib.randomBytes !== void 0) {
      return lib.randomBytes;
    }
    if (lib.getRandomValues !== void 0) {
      return (n) => {
        const bytes = new Uint8Array(n);
        lib.getRandomValues(bytes);
        return bytes;
      };
    }
  }
  return (n) => {
    const r = [];
    for (let i = n; i > 0; i--) {
      r.push(Math.floor(Math.random() * 256));
    }
    return r;
  };
})();
const BUFFER_SIZE = 4096;
function uid() {
  if (buf === void 0 || bufIdx + 16 > BUFFER_SIZE) {
    bufIdx = 0;
    buf = randomBytes(BUFFER_SIZE);
  }
  const b = Array.prototype.slice.call(buf, bufIdx, bufIdx += 16);
  b[6] = b[6] & 15 | 64;
  b[8] = b[8] & 63 | 128;
  return hexBytes[b[0]] + hexBytes[b[1]] + hexBytes[b[2]] + hexBytes[b[3]] + "-" + hexBytes[b[4]] + hexBytes[b[5]] + "-" + hexBytes[b[6]] + hexBytes[b[7]] + "-" + hexBytes[b[8]] + hexBytes[b[9]] + "-" + hexBytes[b[10]] + hexBytes[b[11]] + hexBytes[b[12]] + hexBytes[b[13]] + hexBytes[b[14]] + hexBytes[b[15]];
}
function parseValue(val) {
  return val === void 0 || val === null ? null : val;
}
function getId(val, required) {
  return val === void 0 || val === null ? required === true ? `f_${uid()}` : null : val;
}
function useId({ getValue, required = true } = {}) {
  if (isRuntimeSsrPreHydration.value === true) {
    const id = getValue !== void 0 ? ref(parseValue(getValue())) : ref(null);
    if (required === true && id.value === null) {
      onMounted(() => {
        id.value = `f_${uid()}`;
      });
    }
    if (getValue !== void 0) {
      watch(getValue, (newId) => {
        id.value = getId(newId, required);
      });
    }
    return id;
  }
  return getValue !== void 0 ? computed(() => getId(getValue(), required)) : ref(`f_${uid()}`);
}
const listenerRE = /^on[A-Z]/;
function useSplitAttrs() {
  const { attrs, vnode } = getCurrentInstance();
  const acc = {
    listeners: ref({}),
    attributes: ref({})
  };
  function update2() {
    const attributes = {};
    const listeners = {};
    for (const key in attrs) {
      if (key !== "class" && key !== "style" && listenerRE.test(key) === false) {
        attributes[key] = attrs[key];
      }
    }
    for (const key in vnode.props) {
      if (listenerRE.test(key) === true) {
        listeners[key] = vnode.props[key];
      }
    }
    acc.attributes.value = attributes;
    acc.listeners.value = listeners;
  }
  onBeforeUpdate(update2);
  update2();
  return acc;
}
function useFormChild({ validate, resetValidation, requiresQForm }) {
  const $form = inject(formKey, false);
  if ($form !== false) {
    const { props, proxy } = getCurrentInstance();
    Object.assign(proxy, { validate, resetValidation });
    watch(() => props.disable, (val) => {
      if (val === true) {
        typeof resetValidation === "function" && resetValidation();
        $form.unbindComponent(proxy);
      } else {
        $form.bindComponent(proxy);
      }
    });
    onMounted(() => {
      props.disable !== true && $form.bindComponent(proxy);
    });
    onBeforeUnmount(() => {
      props.disable !== true && $form.unbindComponent(proxy);
    });
  } else if (requiresQForm === true) {
    console.error("Parent QForm not found on useFormChild()!");
  }
}
const hex = /^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/, hexa = /^#[0-9a-fA-F]{4}([0-9a-fA-F]{4})?$/, hexOrHexa = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/, rgb = /^rgb\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5])\)$/, rgba = /^rgba\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/;
const testPattern = {
  date: (v) => /^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(v),
  time: (v) => /^([0-1]?\d|2[0-3]):[0-5]\d$/.test(v),
  fulltime: (v) => /^([0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(v),
  timeOrFulltime: (v) => /^([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(v),
  // -- RFC 5322 --
  // -- Added in v2.6.6 --
  // This is a basic helper validation.
  // For something more complex (like RFC 822) you should write and use your own rule.
  // We won't be accepting PRs to enhance the one below because of the reason above.
  // eslint-disable-next-line
  email: (v) => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v),
  hexColor: (v) => hex.test(v),
  hexaColor: (v) => hexa.test(v),
  hexOrHexaColor: (v) => hexOrHexa.test(v),
  rgbColor: (v) => rgb.test(v),
  rgbaColor: (v) => rgba.test(v),
  rgbOrRgbaColor: (v) => rgb.test(v) || rgba.test(v),
  hexOrRgbColor: (v) => hex.test(v) || rgb.test(v),
  hexaOrRgbaColor: (v) => hexa.test(v) || rgba.test(v),
  anyColor: (v) => hexOrHexa.test(v) || rgb.test(v) || rgba.test(v)
};
const lazyRulesValues = [true, false, "ondemand"];
const useValidateProps = {
  modelValue: {},
  error: {
    type: Boolean,
    default: null
  },
  errorMessage: String,
  noErrorIcon: Boolean,
  rules: Array,
  reactiveRules: Boolean,
  lazyRules: {
    type: [Boolean, String],
    default: false,
    // statement unneeded but avoids future vue implementation changes
    validator: (v) => lazyRulesValues.includes(v)
  }
};
function useValidate(focused, innerLoading) {
  const { props, proxy } = getCurrentInstance();
  const innerError = ref(false);
  const innerErrorMessage = ref(null);
  const isDirtyModel = ref(false);
  useFormChild({ validate, resetValidation });
  let validateIndex = 0, unwatchRules;
  const hasRules = computed(
    () => props.rules !== void 0 && props.rules !== null && props.rules.length !== 0
  );
  const canDebounceValidate = computed(() => props.disable !== true && hasRules.value === true && innerLoading.value === false);
  const hasError = computed(
    () => props.error === true || innerError.value === true
  );
  const errorMessage = computed(() => typeof props.errorMessage === "string" && props.errorMessage.length !== 0 ? props.errorMessage : innerErrorMessage.value);
  watch(() => props.modelValue, () => {
    isDirtyModel.value = true;
    if (canDebounceValidate.value === true && props.lazyRules === false) {
      debouncedValidate();
    }
  });
  function onRulesChange() {
    if (props.lazyRules !== "ondemand" && canDebounceValidate.value === true && isDirtyModel.value === true) {
      debouncedValidate();
    }
  }
  watch(() => props.reactiveRules, (val) => {
    if (val === true) {
      if (unwatchRules === void 0) {
        unwatchRules = watch(() => props.rules, onRulesChange, { immediate: true, deep: true });
      }
    } else if (unwatchRules !== void 0) {
      unwatchRules();
      unwatchRules = void 0;
    }
  }, { immediate: true });
  watch(() => props.lazyRules, onRulesChange);
  watch(focused, (val) => {
    if (val === true) {
      isDirtyModel.value = true;
    } else if (canDebounceValidate.value === true && props.lazyRules !== "ondemand") {
      debouncedValidate();
    }
  });
  function resetValidation() {
    validateIndex++;
    innerLoading.value = false;
    isDirtyModel.value = false;
    innerError.value = false;
    innerErrorMessage.value = null;
    debouncedValidate.cancel();
  }
  function validate(val = props.modelValue) {
    if (props.disable === true || hasRules.value === false) {
      return true;
    }
    const index = ++validateIndex;
    const setDirty = innerLoading.value !== true ? () => {
      isDirtyModel.value = true;
    } : () => {
    };
    const update2 = (err, msg) => {
      err === true && setDirty();
      innerError.value = err;
      innerErrorMessage.value = msg || null;
      innerLoading.value = false;
    };
    const promises = [];
    for (let i = 0; i < props.rules.length; i++) {
      const rule = props.rules[i];
      let res;
      if (typeof rule === "function") {
        res = rule(val, testPattern);
      } else if (typeof rule === "string" && testPattern[rule] !== void 0) {
        res = testPattern[rule](val);
      }
      if (res === false || typeof res === "string") {
        update2(true, res);
        return false;
      } else if (res !== true && res !== void 0) {
        promises.push(res);
      }
    }
    if (promises.length === 0) {
      update2(false);
      return true;
    }
    innerLoading.value = true;
    return Promise.all(promises).then(
      (res) => {
        if (res === void 0 || Array.isArray(res) === false || res.length === 0) {
          index === validateIndex && update2(false);
          return true;
        }
        const msg = res.find((r) => r === false || typeof r === "string");
        index === validateIndex && update2(msg !== void 0, msg);
        return msg === void 0;
      },
      (e) => {
        if (index === validateIndex) {
          console.error(e);
          update2(true);
        }
        return false;
      }
    );
  }
  const debouncedValidate = debounce(validate, 0);
  onBeforeUnmount(() => {
    unwatchRules?.();
    debouncedValidate.cancel();
  });
  Object.assign(proxy, { resetValidation, validate });
  injectProp(proxy, "hasError", () => hasError.value);
  return {
    isDirtyModel,
    hasRules,
    hasError,
    errorMessage,
    validate,
    resetValidation
  };
}
let queue = [];
let waitFlags = [];
function clearFlag(flag) {
  waitFlags = waitFlags.filter((entry) => entry !== flag);
}
function addFocusWaitFlag(flag) {
  clearFlag(flag);
  waitFlags.push(flag);
}
function removeFocusWaitFlag(flag) {
  clearFlag(flag);
  if (waitFlags.length === 0 && queue.length !== 0) {
    queue[queue.length - 1]();
    queue = [];
  }
}
function addFocusFn(fn) {
  if (waitFlags.length === 0) {
    fn();
  } else {
    queue.push(fn);
  }
}
function removeFocusFn(fn) {
  queue = queue.filter((entry) => entry !== fn);
}
function fieldValueIsFilled(val) {
  return val !== void 0 && val !== null && ("" + val).length !== 0;
}
const useNonInputFieldProps = {
  ...useDarkProps,
  ...useValidateProps,
  label: String,
  stackLabel: Boolean,
  hint: String,
  hideHint: Boolean,
  prefix: String,
  suffix: String,
  labelColor: String,
  color: String,
  bgColor: String,
  filled: Boolean,
  outlined: Boolean,
  borderless: Boolean,
  standout: [Boolean, String],
  square: Boolean,
  loading: Boolean,
  labelSlot: Boolean,
  bottomSlots: Boolean,
  hideBottomSpace: Boolean,
  rounded: Boolean,
  dense: Boolean,
  itemAligned: Boolean,
  counter: Boolean,
  clearable: Boolean,
  clearIcon: String,
  disable: Boolean,
  readonly: Boolean,
  autofocus: Boolean,
  for: String
};
const useFieldProps = {
  ...useNonInputFieldProps,
  maxlength: [Number, String]
};
const useFieldEmits = ["update:modelValue", "clear", "focus", "blur"];
function useFieldState({ requiredForAttr = true, tagProp, changeEvent = false } = {}) {
  const { props, proxy } = getCurrentInstance();
  const isDark = useDark(props, proxy.$q);
  const targetUid = useId({
    required: requiredForAttr,
    getValue: () => props.for
  });
  return {
    requiredForAttr,
    changeEvent,
    tag: tagProp === true ? computed(() => props.tag) : { value: "label" },
    isDark,
    editable: computed(
      () => props.disable !== true && props.readonly !== true
    ),
    innerLoading: ref(false),
    focused: ref(false),
    hasPopupOpen: false,
    splitAttrs: useSplitAttrs(),
    targetUid,
    rootRef: ref(null),
    targetRef: ref(null),
    controlRef: ref(null)
    /**
         * user supplied additionals:
    
         * innerValue - computed
         * floatingLabel - computed
         * inputRef - computed
    
         * fieldClass - computed
         * hasShadow - computed
    
         * controlEvents - Object with fn(e)
    
         * getControl - fn
         * getInnerAppend - fn
         * getControlChild - fn
         * getShadowControl - fn
         * showPopup - fn
         */
  };
}
function useField(state) {
  const { props, emit, slots, attrs, proxy } = getCurrentInstance();
  const { $q } = proxy;
  let focusoutTimer = null;
  if (state.hasValue === void 0) {
    state.hasValue = computed(() => fieldValueIsFilled(props.modelValue));
  }
  if (state.emitValue === void 0) {
    state.emitValue = (value) => {
      emit("update:modelValue", value);
    };
  }
  if (state.controlEvents === void 0) {
    state.controlEvents = {
      onFocusin: onControlFocusin,
      onFocusout: onControlFocusout
    };
  }
  Object.assign(state, {
    clearValue,
    onControlFocusin,
    onControlFocusout,
    focus
  });
  if (state.computedCounter === void 0) {
    state.computedCounter = computed(() => {
      if (props.counter !== false) {
        const len = typeof props.modelValue === "string" || typeof props.modelValue === "number" ? ("" + props.modelValue).length : Array.isArray(props.modelValue) === true ? props.modelValue.length : 0;
        const max = props.maxlength !== void 0 ? props.maxlength : props.maxValues;
        return len + (max !== void 0 ? " / " + max : "");
      }
    });
  }
  const {
    isDirtyModel,
    hasRules,
    hasError,
    errorMessage,
    resetValidation
  } = useValidate(state.focused, state.innerLoading);
  const floatingLabel = state.floatingLabel !== void 0 ? computed(() => props.stackLabel === true || state.focused.value === true || state.floatingLabel.value === true) : computed(() => props.stackLabel === true || state.focused.value === true || state.hasValue.value === true);
  const shouldRenderBottom = computed(
    () => props.bottomSlots === true || props.hint !== void 0 || hasRules.value === true || props.counter === true || props.error !== null
  );
  const styleType = computed(() => {
    if (props.filled === true) {
      return "filled";
    }
    if (props.outlined === true) {
      return "outlined";
    }
    if (props.borderless === true) {
      return "borderless";
    }
    if (props.standout) {
      return "standout";
    }
    return "standard";
  });
  const classes = computed(
    () => `q-field row no-wrap items-start q-field--${styleType.value}` + (state.fieldClass !== void 0 ? ` ${state.fieldClass.value}` : "") + (props.rounded === true ? " q-field--rounded" : "") + (props.square === true ? " q-field--square" : "") + (floatingLabel.value === true ? " q-field--float" : "") + (hasLabel.value === true ? " q-field--labeled" : "") + (props.dense === true ? " q-field--dense" : "") + (props.itemAligned === true ? " q-field--item-aligned q-item-type" : "") + (state.isDark.value === true ? " q-field--dark" : "") + (state.getControl === void 0 ? " q-field--auto-height" : "") + (state.focused.value === true ? " q-field--focused" : "") + (hasError.value === true ? " q-field--error" : "") + (hasError.value === true || state.focused.value === true ? " q-field--highlighted" : "") + (props.hideBottomSpace !== true && shouldRenderBottom.value === true ? " q-field--with-bottom" : "") + (props.disable === true ? " q-field--disabled" : props.readonly === true ? " q-field--readonly" : "")
  );
  const contentClass = computed(
    () => "q-field__control relative-position row no-wrap" + (props.bgColor !== void 0 ? ` bg-${props.bgColor}` : "") + (hasError.value === true ? " text-negative" : typeof props.standout === "string" && props.standout.length !== 0 && state.focused.value === true ? ` ${props.standout}` : props.color !== void 0 ? ` text-${props.color}` : "")
  );
  const hasLabel = computed(
    () => props.labelSlot === true || props.label !== void 0
  );
  const labelClass = computed(
    () => "q-field__label no-pointer-events absolute ellipsis" + (props.labelColor !== void 0 && hasError.value !== true ? ` text-${props.labelColor}` : "")
  );
  const controlSlotScope = computed(() => ({
    id: state.targetUid.value,
    editable: state.editable.value,
    focused: state.focused.value,
    floatingLabel: floatingLabel.value,
    modelValue: props.modelValue,
    emitValue: state.emitValue
  }));
  const attributes = computed(() => {
    const acc = {};
    if (state.targetUid.value) {
      acc.for = state.targetUid.value;
    }
    if (props.disable === true) {
      acc["aria-disabled"] = "true";
    }
    return acc;
  });
  function focusHandler() {
    const el = document.activeElement;
    let target = state.targetRef?.value;
    if (target && (el === null || el.id !== state.targetUid.value)) {
      target.hasAttribute("tabindex") === true || (target = target.querySelector("[tabindex]"));
      if (target !== el) {
        target?.focus({ preventScroll: true });
      }
    }
  }
  function focus() {
    addFocusFn(focusHandler);
  }
  function blur() {
    removeFocusFn(focusHandler);
    const el = document.activeElement;
    if (el !== null && state.rootRef.value.contains(el)) {
      el.blur();
    }
  }
  function onControlFocusin(e) {
    if (focusoutTimer !== null) {
      clearTimeout(focusoutTimer);
      focusoutTimer = null;
    }
    if (state.editable.value === true && state.focused.value === false) {
      state.focused.value = true;
      emit("focus", e);
    }
  }
  function onControlFocusout(e, then) {
    focusoutTimer !== null && clearTimeout(focusoutTimer);
    focusoutTimer = setTimeout(() => {
      focusoutTimer = null;
      if (document.hasFocus() === true && (state.hasPopupOpen === true || state.controlRef === void 0 || state.controlRef.value === null || state.controlRef.value.contains(document.activeElement) !== false)) return;
      if (state.focused.value === true) {
        state.focused.value = false;
        emit("blur", e);
      }
      then?.();
    });
  }
  function clearValue(e) {
    stopAndPrevent(e);
    if ($q.platform.is.mobile !== true) {
      const el = state.targetRef?.value || state.rootRef.value;
      el.focus();
    } else if (state.rootRef.value.contains(document.activeElement) === true) {
      document.activeElement.blur();
    }
    if (props.type === "file") {
      state.inputRef.value.value = null;
    }
    emit("update:modelValue", null);
    state.changeEvent === true && emit("change", null);
    emit("clear", props.modelValue);
    nextTick(() => {
      const isDirty = isDirtyModel.value;
      resetValidation();
      isDirtyModel.value = isDirty;
    });
  }
  function onClearableKeyup(evt) {
    [13, 32].includes(evt.keyCode) && clearValue(evt);
  }
  function getContent() {
    const node = [];
    slots.prepend !== void 0 && node.push(
      h("div", {
        class: "q-field__prepend q-field__marginal row no-wrap items-center",
        key: "prepend",
        onClick: prevent
      }, slots.prepend())
    );
    node.push(
      h("div", {
        class: "q-field__control-container col relative-position row no-wrap q-anchor--skip"
      }, getControlContainer())
    );
    hasError.value === true && props.noErrorIcon === false && node.push(
      getInnerAppendNode("error", [
        h(QIcon, { name: $q.iconSet.field.error, color: "negative" })
      ])
    );
    if (props.loading === true || state.innerLoading.value === true) {
      node.push(
        getInnerAppendNode(
          "inner-loading-append",
          slots.loading !== void 0 ? slots.loading() : [h(QSpinner, { color: props.color })]
        )
      );
    } else if (props.clearable === true && state.hasValue.value === true && state.editable.value === true) {
      node.push(
        getInnerAppendNode("inner-clearable-append", [
          h(QIcon, {
            class: "q-field__focusable-action",
            name: props.clearIcon || $q.iconSet.field.clear,
            tabindex: 0,
            role: "button",
            "aria-hidden": "false",
            "aria-label": $q.lang.label.clear,
            onKeyup: onClearableKeyup,
            onClick: clearValue
          })
        ])
      );
    }
    slots.append !== void 0 && node.push(
      h("div", {
        class: "q-field__append q-field__marginal row no-wrap items-center",
        key: "append",
        onClick: prevent
      }, slots.append())
    );
    state.getInnerAppend !== void 0 && node.push(
      getInnerAppendNode("inner-append", state.getInnerAppend())
    );
    state.getControlChild !== void 0 && node.push(
      state.getControlChild()
    );
    return node;
  }
  function getControlContainer() {
    const node = [];
    props.prefix !== void 0 && props.prefix !== null && node.push(
      h("div", {
        class: "q-field__prefix no-pointer-events row items-center"
      }, props.prefix)
    );
    if (state.getShadowControl !== void 0 && state.hasShadow.value === true) {
      node.push(
        state.getShadowControl()
      );
    }
    if (state.getControl !== void 0) {
      node.push(state.getControl());
    } else if (slots.rawControl !== void 0) {
      node.push(slots.rawControl());
    } else if (slots.control !== void 0) {
      node.push(
        h("div", {
          ref: state.targetRef,
          class: "q-field__native row",
          tabindex: -1,
          ...state.splitAttrs.attributes.value,
          "data-autofocus": props.autofocus === true || void 0
        }, slots.control(controlSlotScope.value))
      );
    }
    hasLabel.value === true && node.push(
      h("div", {
        class: labelClass.value
      }, hSlot(slots.label, props.label))
    );
    props.suffix !== void 0 && props.suffix !== null && node.push(
      h("div", {
        class: "q-field__suffix no-pointer-events row items-center"
      }, props.suffix)
    );
    return node.concat(hSlot(slots.default));
  }
  function getBottom() {
    let msg, key;
    if (hasError.value === true) {
      if (errorMessage.value !== null) {
        msg = [h("div", { role: "alert" }, errorMessage.value)];
        key = `q--slot-error-${errorMessage.value}`;
      } else {
        msg = hSlot(slots.error);
        key = "q--slot-error";
      }
    } else if (props.hideHint !== true || state.focused.value === true) {
      if (props.hint !== void 0) {
        msg = [h("div", props.hint)];
        key = `q--slot-hint-${props.hint}`;
      } else {
        msg = hSlot(slots.hint);
        key = "q--slot-hint";
      }
    }
    const hasCounter = props.counter === true || slots.counter !== void 0;
    if (props.hideBottomSpace === true && hasCounter === false && msg === void 0) return;
    const main = h("div", {
      key,
      class: "q-field__messages col"
    }, msg);
    return h("div", {
      class: "q-field__bottom row items-start q-field__bottom--" + (props.hideBottomSpace !== true ? "animated" : "stale"),
      onClick: prevent
    }, [
      props.hideBottomSpace === true ? main : h(Transition, { name: "q-transition--field-message" }, () => main),
      hasCounter === true ? h("div", {
        class: "q-field__counter"
      }, slots.counter !== void 0 ? slots.counter() : state.computedCounter.value) : null
    ]);
  }
  function getInnerAppendNode(key, content) {
    return content === null ? null : h("div", {
      key,
      class: "q-field__append q-field__marginal row no-wrap items-center q-anchor--skip"
    }, content);
  }
  let shouldActivate = false;
  onDeactivated(() => {
    shouldActivate = true;
  });
  onActivated(() => {
    shouldActivate === true && props.autofocus === true && proxy.focus();
  });
  props.autofocus === true && onMounted(() => {
    proxy.focus();
  });
  onBeforeUnmount(() => {
    focusoutTimer !== null && clearTimeout(focusoutTimer);
  });
  Object.assign(proxy, { focus, blur });
  return function renderField() {
    const labelAttrs = state.getControl === void 0 && slots.control === void 0 ? {
      ...state.splitAttrs.attributes.value,
      "data-autofocus": props.autofocus === true || void 0,
      ...attributes.value
    } : attributes.value;
    return h(state.tag.value, {
      ref: state.rootRef,
      class: [
        classes.value,
        attrs.class
      ],
      style: attrs.style,
      ...labelAttrs
    }, [
      slots.before !== void 0 ? h("div", {
        class: "q-field__before q-field__marginal row no-wrap items-center",
        onClick: prevent
      }, slots.before()) : null,
      h("div", {
        class: "q-field__inner relative-position col self-stretch"
      }, [
        h("div", {
          ref: state.controlRef,
          class: contentClass.value,
          tabindex: -1,
          ...state.controlEvents
        }, getContent()),
        shouldRenderBottom.value === true ? getBottom() : null
      ]),
      slots.after !== void 0 ? h("div", {
        class: "q-field__after q-field__marginal row no-wrap items-center",
        onClick: prevent
      }, slots.after()) : null
    ]);
  };
}
const QField = createComponent({
  name: "QField",
  inheritAttrs: false,
  props: {
    ...useFieldProps,
    tag: {
      type: String,
      default: "label"
    }
  },
  emits: useFieldEmits,
  setup() {
    return useField(
      useFieldState({ tagProp: true })
    );
  }
});
const defaultSizes = {
  xs: 8,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 24
};
const QChip = createComponent({
  name: "QChip",
  props: {
    ...useDarkProps,
    ...useSizeProps,
    dense: Boolean,
    icon: String,
    iconRight: String,
    iconRemove: String,
    iconSelected: String,
    label: [String, Number],
    color: String,
    textColor: String,
    modelValue: {
      type: Boolean,
      default: true
    },
    selected: {
      type: Boolean,
      default: null
    },
    square: Boolean,
    outline: Boolean,
    clickable: Boolean,
    removable: Boolean,
    removeAriaLabel: String,
    tabindex: [String, Number],
    disable: Boolean,
    ripple: {
      type: [Boolean, Object],
      default: true
    }
  },
  emits: ["update:modelValue", "update:selected", "remove", "click"],
  setup(props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const isDark = useDark(props, $q);
    const sizeStyle = useSize(props, defaultSizes);
    const hasLeftIcon = computed(() => props.selected === true || props.icon !== void 0);
    const leftIcon = computed(() => props.selected === true ? props.iconSelected || $q.iconSet.chip.selected : props.icon);
    const removeIcon = computed(() => props.iconRemove || $q.iconSet.chip.remove);
    const isClickable = computed(
      () => props.disable === false && (props.clickable === true || props.selected !== null)
    );
    const classes = computed(() => {
      const text = props.outline === true ? props.color || props.textColor : props.textColor;
      return "q-chip row inline no-wrap items-center" + (props.outline === false && props.color !== void 0 ? ` bg-${props.color}` : "") + (text ? ` text-${text} q-chip--colored` : "") + (props.disable === true ? " disabled" : "") + (props.dense === true ? " q-chip--dense" : "") + (props.outline === true ? " q-chip--outline" : "") + (props.selected === true ? " q-chip--selected" : "") + (isClickable.value === true ? " q-chip--clickable cursor-pointer non-selectable q-hoverable" : "") + (props.square === true ? " q-chip--square" : "") + (isDark.value === true ? " q-chip--dark q-dark" : "");
    });
    const attributes = computed(() => {
      const chip = props.disable === true ? { tabindex: -1, "aria-disabled": "true" } : { tabindex: props.tabindex || 0 };
      const remove = {
        ...chip,
        role: "button",
        "aria-hidden": "false",
        "aria-label": props.removeAriaLabel || $q.lang.label.remove
      };
      return { chip, remove };
    });
    function onKeyup2(e) {
      e.keyCode === 13 && onClick(e);
    }
    function onClick(e) {
      if (!props.disable) {
        emit("update:selected", !props.selected);
        emit("click", e);
      }
    }
    function onRemove(e) {
      if (e.keyCode === void 0 || e.keyCode === 13) {
        stopAndPrevent(e);
        if (props.disable === false) {
          emit("update:modelValue", false);
          emit("remove");
        }
      }
    }
    function getContent() {
      const child = [];
      isClickable.value === true && child.push(
        h("div", { class: "q-focus-helper" })
      );
      hasLeftIcon.value === true && child.push(
        h(QIcon, {
          class: "q-chip__icon q-chip__icon--left",
          name: leftIcon.value
        })
      );
      const label = props.label !== void 0 ? [h("div", { class: "ellipsis" }, [props.label])] : void 0;
      child.push(
        h("div", {
          class: "q-chip__content col row no-wrap items-center q-anchor--skip"
        }, hMergeSlotSafely(slots.default, label))
      );
      props.iconRight && child.push(
        h(QIcon, {
          class: "q-chip__icon q-chip__icon--right",
          name: props.iconRight
        })
      );
      props.removable === true && child.push(
        h(QIcon, {
          class: "q-chip__icon q-chip__icon--remove cursor-pointer",
          name: removeIcon.value,
          ...attributes.value.remove,
          onClick: onRemove,
          onKeyup: onRemove
        })
      );
      return child;
    }
    return () => {
      if (props.modelValue === false) return;
      const data = {
        class: classes.value,
        style: sizeStyle.value
      };
      isClickable.value === true && Object.assign(
        data,
        attributes.value.chip,
        { onClick, onKeyup: onKeyup2 }
      );
      return hDir(
        "div",
        data,
        getContent(),
        "ripple",
        props.ripple !== false && props.disable !== true,
        () => [[Ripple, props.ripple]]
      );
    };
  }
});
const QItem = createComponent({
  name: "QItem",
  props: {
    ...useDarkProps,
    ...useRouterLinkProps,
    tag: {
      type: String,
      default: "div"
    },
    active: {
      type: Boolean,
      default: null
    },
    clickable: Boolean,
    dense: Boolean,
    insetLevel: Number,
    tabindex: [String, Number],
    focused: Boolean,
    manualFocus: Boolean
  },
  emits: ["click", "keyup"],
  setup(props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const isDark = useDark(props, $q);
    const { hasLink, linkAttrs, linkClass, linkTag, navigateOnClick } = useRouterLink();
    const rootRef = ref(null);
    const blurTargetRef = ref(null);
    const isActionable = computed(
      () => props.clickable === true || hasLink.value === true || props.tag === "label"
    );
    const isClickable = computed(
      () => props.disable !== true && isActionable.value === true
    );
    const classes = computed(
      () => "q-item q-item-type row no-wrap" + (props.dense === true ? " q-item--dense" : "") + (isDark.value === true ? " q-item--dark" : "") + (hasLink.value === true && props.active === null ? linkClass.value : props.active === true ? ` q-item--active${props.activeClass !== void 0 ? ` ${props.activeClass}` : ""}` : "") + (props.disable === true ? " disabled" : "") + (isClickable.value === true ? " q-item--clickable q-link cursor-pointer " + (props.manualFocus === true ? "q-manual-focusable" : "q-focusable q-hoverable") + (props.focused === true ? " q-manual-focusable--focused" : "") : "")
    );
    const style = computed(() => {
      if (props.insetLevel === void 0) {
        return null;
      }
      const dir = $q.lang.rtl === true ? "Right" : "Left";
      return {
        ["padding" + dir]: 16 + props.insetLevel * 56 + "px"
      };
    });
    function onClick(e) {
      if (isClickable.value === true) {
        if (blurTargetRef.value !== null && e.qAvoidFocus !== true) {
          if (e.qKeyEvent !== true && document.activeElement === rootRef.value) {
            blurTargetRef.value.focus();
          } else if (document.activeElement === blurTargetRef.value) {
            rootRef.value.focus();
          }
        }
        navigateOnClick(e);
      }
    }
    function onKeyup2(e) {
      if (isClickable.value === true && isKeyCode(e, [13, 32]) === true) {
        stopAndPrevent(e);
        e.qKeyEvent = true;
        const evt = new MouseEvent("click", e);
        evt.qKeyEvent = true;
        rootRef.value.dispatchEvent(evt);
      }
      emit("keyup", e);
    }
    function getContent() {
      const child = hUniqueSlot(slots.default, []);
      isClickable.value === true && child.unshift(
        h("div", { class: "q-focus-helper", tabindex: -1, ref: blurTargetRef })
      );
      return child;
    }
    return () => {
      const data = {
        ref: rootRef,
        class: classes.value,
        style: style.value,
        role: "listitem",
        onClick,
        onKeyup: onKeyup2
      };
      if (isClickable.value === true) {
        data.tabindex = props.tabindex || "0";
        Object.assign(data, linkAttrs.value);
      } else if (isActionable.value === true) {
        data["aria-disabled"] = "true";
      }
      return h(
        linkTag.value,
        data,
        getContent()
      );
    };
  }
});
const QItemSection = createComponent({
  name: "QItemSection",
  props: {
    avatar: Boolean,
    thumbnail: Boolean,
    side: Boolean,
    top: Boolean,
    noWrap: Boolean
  },
  setup(props, { slots }) {
    const classes = computed(
      () => `q-item__section column q-item__section--${props.avatar === true || props.side === true || props.thumbnail === true ? "side" : "main"}` + (props.top === true ? " q-item__section--top justify-start" : " justify-center") + (props.avatar === true ? " q-item__section--avatar" : "") + (props.thumbnail === true ? " q-item__section--thumbnail" : "") + (props.noWrap === true ? " q-item__section--nowrap" : "")
    );
    return () => h("div", { class: classes.value }, hSlot(slots.default));
  }
});
const QItemLabel = createComponent({
  name: "QItemLabel",
  props: {
    overline: Boolean,
    caption: Boolean,
    header: Boolean,
    lines: [Number, String]
  },
  setup(props, { slots }) {
    const parsedLines = computed(() => parseInt(props.lines, 10));
    const classes = computed(
      () => "q-item__label" + (props.overline === true ? " q-item__label--overline text-overline" : "") + (props.caption === true ? " q-item__label--caption text-caption" : "") + (props.header === true ? " q-item__label--header" : "") + (parsedLines.value === 1 ? " ellipsis" : "")
    );
    const style = computed(() => {
      return props.lines !== void 0 && parsedLines.value > 1 ? {
        overflow: "hidden",
        display: "-webkit-box",
        "-webkit-box-orient": "vertical",
        "-webkit-line-clamp": parsedLines.value
      } : null;
    });
    return () => h("div", {
      style: style.value,
      class: classes.value
    }, hSlot(slots.default));
  }
});
function clearSelection() {
  if (window.getSelection !== void 0) {
    const selection = window.getSelection();
    if (selection.empty !== void 0) {
      selection.empty();
    } else if (selection.removeAllRanges !== void 0) {
      selection.removeAllRanges();
      Platform.is.mobile !== true && selection.addRange(document.createRange());
    }
  } else if (document.selection !== void 0) {
    document.selection.empty();
  }
}
const useAnchorStaticProps = {
  /* SSR does not know about Element */
  target: {
    type: [Boolean, String, Element],
    default: true
  },
  noParentEvent: Boolean
};
const useAnchorProps = {
  ...useAnchorStaticProps,
  contextMenu: Boolean
};
function useAnchor({
  showing,
  avoidEmit,
  // required for QPopupProxy (true)
  configureAnchorEl
  // optional
}) {
  const { props, proxy, emit } = getCurrentInstance();
  const anchorEl = ref(null);
  let touchTimer = null;
  function canShow(evt) {
    return anchorEl.value === null ? false : evt === void 0 || evt.touches === void 0 || evt.touches.length <= 1;
  }
  const anchorEvents = {};
  if (configureAnchorEl === void 0) {
    Object.assign(anchorEvents, {
      hide(evt) {
        proxy.hide(evt);
      },
      toggle(evt) {
        proxy.toggle(evt);
        evt.qAnchorHandled = true;
      },
      toggleKey(evt) {
        isKeyCode(evt, 13) === true && anchorEvents.toggle(evt);
      },
      contextClick(evt) {
        proxy.hide(evt);
        prevent(evt);
        nextTick(() => {
          proxy.show(evt);
          evt.qAnchorHandled = true;
        });
      },
      prevent,
      mobileTouch(evt) {
        anchorEvents.mobileCleanup(evt);
        if (canShow(evt) !== true) return;
        proxy.hide(evt);
        anchorEl.value.classList.add("non-selectable");
        const target = evt.target;
        addEvt(anchorEvents, "anchor", [
          [target, "touchmove", "mobileCleanup", "passive"],
          [target, "touchend", "mobileCleanup", "passive"],
          [target, "touchcancel", "mobileCleanup", "passive"],
          [anchorEl.value, "contextmenu", "prevent", "notPassive"]
        ]);
        touchTimer = setTimeout(() => {
          touchTimer = null;
          proxy.show(evt);
          evt.qAnchorHandled = true;
        }, 300);
      },
      mobileCleanup(evt) {
        anchorEl.value.classList.remove("non-selectable");
        if (touchTimer !== null) {
          clearTimeout(touchTimer);
          touchTimer = null;
        }
        if (showing.value === true && evt !== void 0) {
          clearSelection();
        }
      }
    });
    configureAnchorEl = function(context = props.contextMenu) {
      if (props.noParentEvent === true || anchorEl.value === null) return;
      let evts;
      if (context === true) {
        if (proxy.$q.platform.is.mobile === true) {
          evts = [
            [anchorEl.value, "touchstart", "mobileTouch", "passive"]
          ];
        } else {
          evts = [
            [anchorEl.value, "mousedown", "hide", "passive"],
            [anchorEl.value, "contextmenu", "contextClick", "notPassive"]
          ];
        }
      } else {
        evts = [
          [anchorEl.value, "click", "toggle", "passive"],
          [anchorEl.value, "keyup", "toggleKey", "passive"]
        ];
      }
      addEvt(anchorEvents, "anchor", evts);
    };
  }
  function unconfigureAnchorEl() {
    cleanEvt(anchorEvents, "anchor");
  }
  function setAnchorEl(el) {
    anchorEl.value = el;
    while (anchorEl.value.classList.contains("q-anchor--skip")) {
      anchorEl.value = anchorEl.value.parentNode;
    }
    configureAnchorEl();
  }
  function pickAnchorEl() {
    if (props.target === false || props.target === "" || proxy.$el.parentNode === null) {
      anchorEl.value = null;
    } else if (props.target === true) {
      setAnchorEl(proxy.$el.parentNode);
    } else {
      let el = props.target;
      if (typeof props.target === "string") {
        try {
          el = document.querySelector(props.target);
        } catch (err) {
          el = void 0;
        }
      }
      if (el !== void 0 && el !== null) {
        anchorEl.value = el.$el || el;
        configureAnchorEl();
      } else {
        anchorEl.value = null;
        console.error(`Anchor: target "${props.target}" not found`);
      }
    }
  }
  watch(() => props.contextMenu, (val) => {
    if (anchorEl.value !== null) {
      unconfigureAnchorEl();
      configureAnchorEl(val);
    }
  });
  watch(() => props.target, () => {
    if (anchorEl.value !== null) {
      unconfigureAnchorEl();
    }
    pickAnchorEl();
  });
  watch(() => props.noParentEvent, (val) => {
    if (anchorEl.value !== null) {
      if (val === true) {
        unconfigureAnchorEl();
      } else {
        configureAnchorEl();
      }
    }
  });
  onMounted(() => {
    pickAnchorEl();
    if (avoidEmit !== true && props.modelValue === true && anchorEl.value === null) {
      emit("update:modelValue", false);
    }
  });
  onBeforeUnmount(() => {
    touchTimer !== null && clearTimeout(touchTimer);
    unconfigureAnchorEl();
  });
  return {
    anchorEl,
    canShow,
    anchorEvents
  };
}
function useScrollTarget(props, configureScrollTarget) {
  const localScrollTarget = ref(null);
  let scrollFn;
  function changeScrollEvent(scrollTarget, fn) {
    const fnProp = `${fn !== void 0 ? "add" : "remove"}EventListener`;
    const fnHandler = fn !== void 0 ? fn : scrollFn;
    if (scrollTarget !== window) {
      scrollTarget[fnProp]("scroll", fnHandler, listenOpts.passive);
    }
    window[fnProp]("scroll", fnHandler, listenOpts.passive);
    scrollFn = fn;
  }
  function unconfigureScrollTarget() {
    if (localScrollTarget.value !== null) {
      changeScrollEvent(localScrollTarget.value);
      localScrollTarget.value = null;
    }
  }
  const noParentEventWatcher = watch(() => props.noParentEvent, () => {
    if (localScrollTarget.value !== null) {
      unconfigureScrollTarget();
      configureScrollTarget();
    }
  });
  onBeforeUnmount(noParentEventWatcher);
  return {
    localScrollTarget,
    unconfigureScrollTarget,
    changeScrollEvent
  };
}
const useModelToggleProps = {
  modelValue: {
    type: Boolean,
    default: null
  },
  "onUpdate:modelValue": [Function, Array]
};
const useModelToggleEmits = [
  "beforeShow",
  "show",
  "beforeHide",
  "hide"
];
function useModelToggle({
  showing,
  canShow,
  // optional
  hideOnRouteChange,
  // optional
  handleShow,
  // optional
  handleHide,
  // optional
  processOnMount
  // optional
}) {
  const vm = getCurrentInstance();
  const { props, emit, proxy } = vm;
  let payload;
  function toggle(evt) {
    if (showing.value === true) {
      hide(evt);
    } else {
      show(evt);
    }
  }
  function show(evt) {
    if (props.disable === true || evt?.qAnchorHandled === true || canShow !== void 0 && canShow(evt) !== true) return;
    const listener = props["onUpdate:modelValue"] !== void 0;
    if (listener === true && true) {
      emit("update:modelValue", true);
      payload = evt;
      nextTick(() => {
        if (payload === evt) {
          payload = void 0;
        }
      });
    }
    if (props.modelValue === null || listener === false || false) {
      processShow(evt);
    }
  }
  function processShow(evt) {
    if (showing.value === true) return;
    showing.value = true;
    emit("beforeShow", evt);
    if (handleShow !== void 0) {
      handleShow(evt);
    } else {
      emit("show", evt);
    }
  }
  function hide(evt) {
    if (props.disable === true) return;
    const listener = props["onUpdate:modelValue"] !== void 0;
    if (listener === true && true) {
      emit("update:modelValue", false);
      payload = evt;
      nextTick(() => {
        if (payload === evt) {
          payload = void 0;
        }
      });
    }
    if (props.modelValue === null || listener === false || false) {
      processHide(evt);
    }
  }
  function processHide(evt) {
    if (showing.value === false) return;
    showing.value = false;
    emit("beforeHide", evt);
    if (handleHide !== void 0) {
      handleHide(evt);
    } else {
      emit("hide", evt);
    }
  }
  function processModelChange(val) {
    if (props.disable === true && val === true) {
      if (props["onUpdate:modelValue"] !== void 0) {
        emit("update:modelValue", false);
      }
    } else if (val === true !== showing.value) {
      const fn = val === true ? processShow : processHide;
      fn(payload);
    }
  }
  watch(() => props.modelValue, processModelChange);
  if (hideOnRouteChange !== void 0 && vmHasRouter(vm) === true) {
    watch(() => proxy.$route.fullPath, () => {
      if (hideOnRouteChange.value === true && showing.value === true) {
        hide();
      }
    });
  }
  onMounted(() => {
    processModelChange(props.modelValue);
  });
  const publicMethods = { show, hide, toggle };
  Object.assign(proxy, publicMethods);
  return publicMethods;
}
const portalProxyList = [];
function closePortalMenus(proxy, evt) {
  do {
    if (proxy.$options.name === "QMenu") {
      proxy.hide(evt);
      if (proxy.$props.separateClosePopup === true) {
        return getParentProxy(proxy);
      }
    } else if (proxy.__qPortal === true) {
      const parent = getParentProxy(proxy);
      if (parent?.$options.name === "QPopupProxy") {
        proxy.hide(evt);
        return parent;
      } else {
        return proxy;
      }
    }
    proxy = getParentProxy(proxy);
  } while (proxy !== void 0 && proxy !== null);
}
const QPortal = createComponent({
  name: "QPortal",
  setup(_, { slots }) {
    return () => slots.default();
  }
});
function isOnGlobalDialog(vm) {
  vm = vm.parent;
  while (vm !== void 0 && vm !== null) {
    if (vm.type.name === "QGlobalDialog") {
      return true;
    }
    if (vm.type.name === "QDialog" || vm.type.name === "QMenu") {
      return false;
    }
    vm = vm.parent;
  }
  return false;
}
function usePortal(vm, innerRef, renderPortalContent, type) {
  const portalIsActive = ref(false);
  const portalIsAccessible = ref(false);
  let portalEl = null;
  const focusObj = {};
  const onGlobalDialog = type === "dialog" && isOnGlobalDialog(vm);
  function showPortal(isReady) {
    if (isReady === true) {
      removeFocusWaitFlag(focusObj);
      portalIsAccessible.value = true;
      return;
    }
    portalIsAccessible.value = false;
    if (portalIsActive.value === false) {
      if (onGlobalDialog === false && portalEl === null) {
        portalEl = createGlobalNode(false, type);
      }
      portalIsActive.value = true;
      portalProxyList.push(vm.proxy);
      addFocusWaitFlag(focusObj);
    }
  }
  function hidePortal(isReady) {
    portalIsAccessible.value = false;
    if (isReady !== true) return;
    removeFocusWaitFlag(focusObj);
    portalIsActive.value = false;
    const index = portalProxyList.indexOf(vm.proxy);
    if (index !== -1) {
      portalProxyList.splice(index, 1);
    }
    if (portalEl !== null) {
      removeGlobalNode(portalEl);
      portalEl = null;
    }
  }
  onUnmounted(() => {
    hidePortal(true);
  });
  vm.proxy.__qPortal = true;
  injectProp(vm.proxy, "contentEl", () => innerRef.value);
  return {
    showPortal,
    hidePortal,
    portalIsActive,
    portalIsAccessible,
    renderPortal: () => onGlobalDialog === true ? renderPortalContent() : portalIsActive.value === true ? [h(Teleport, { to: portalEl }, h(QPortal, renderPortalContent))] : void 0
  };
}
const useTransitionProps = {
  transitionShow: {
    type: String,
    default: "fade"
  },
  transitionHide: {
    type: String,
    default: "fade"
  },
  transitionDuration: {
    type: [String, Number],
    default: 300
  }
};
function useTransition(props, defaultShowFn = () => {
}, defaultHideFn = () => {
}) {
  return {
    transitionProps: computed(() => {
      const show = `q-transition--${props.transitionShow || defaultShowFn()}`;
      const hide = `q-transition--${props.transitionHide || defaultHideFn()}`;
      return {
        appear: true,
        enterFromClass: `${show}-enter-from`,
        enterActiveClass: `${show}-enter-active`,
        enterToClass: `${show}-enter-to`,
        leaveFromClass: `${hide}-leave-from`,
        leaveActiveClass: `${hide}-leave-active`,
        leaveToClass: `${hide}-leave-to`
      };
    }),
    transitionStyle: computed(() => `--q-transition-duration: ${props.transitionDuration}ms`)
  };
}
function useTick() {
  let tickFn;
  const vm = getCurrentInstance();
  function removeTick() {
    tickFn = void 0;
  }
  onDeactivated(removeTick);
  onBeforeUnmount(removeTick);
  return {
    removeTick,
    registerTick(fn) {
      tickFn = fn;
      nextTick(() => {
        if (tickFn === fn) {
          vmIsDestroyed(vm) === false && tickFn();
          tickFn = void 0;
        }
      });
    }
  };
}
function useTimeout() {
  let timer = null;
  const vm = getCurrentInstance();
  function removeTimeout() {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
  }
  onDeactivated(removeTimeout);
  onBeforeUnmount(removeTimeout);
  return {
    removeTimeout,
    registerTimeout(fn, delay) {
      removeTimeout();
      if (vmIsDestroyed(vm) === false) {
        timer = setTimeout(() => {
          timer = null;
          fn();
        }, delay);
      }
    }
  };
}
const handlers$1 = [];
let escDown;
function onKeydown(evt) {
  escDown = evt.keyCode === 27;
}
function onBlur() {
  if (escDown === true) {
    escDown = false;
  }
}
function onKeyup(evt) {
  if (escDown === true) {
    escDown = false;
    if (isKeyCode(evt, 27) === true) {
      handlers$1[handlers$1.length - 1](evt);
    }
  }
}
function update(action) {
  window[action]("keydown", onKeydown);
  window[action]("blur", onBlur);
  window[action]("keyup", onKeyup);
  escDown = false;
}
function addEscapeKey(fn) {
  if (client.is.desktop === true) {
    handlers$1.push(fn);
    if (handlers$1.length === 1) {
      update("addEventListener");
    }
  }
}
function removeEscapeKey(fn) {
  const index = handlers$1.indexOf(fn);
  if (index !== -1) {
    handlers$1.splice(index, 1);
    if (handlers$1.length === 0) {
      update("removeEventListener");
    }
  }
}
const handlers = [];
function trigger(e) {
  handlers[handlers.length - 1](e);
}
function addFocusout(fn) {
  if (client.is.desktop === true) {
    handlers.push(fn);
    if (handlers.length === 1) {
      document.body.addEventListener("focusin", trigger);
    }
  }
}
function removeFocusout(fn) {
  const index = handlers.indexOf(fn);
  if (index !== -1) {
    handlers.splice(index, 1);
    if (handlers.length === 0) {
      document.body.removeEventListener("focusin", trigger);
    }
  }
}
const { notPassiveCapture } = listenOpts, registeredList = [];
function globalHandler(evt) {
  const target = evt.target;
  if (target === void 0 || target.nodeType === 8 || target.classList.contains("no-pointer-events") === true) return;
  let portalIndex = portalProxyList.length - 1;
  while (portalIndex >= 0) {
    const proxy = portalProxyList[portalIndex].$;
    if (proxy.type.name === "QTooltip") {
      portalIndex--;
      continue;
    }
    if (proxy.type.name !== "QDialog") {
      break;
    }
    if (proxy.props.seamless !== true) return;
    portalIndex--;
  }
  for (let i = registeredList.length - 1; i >= 0; i--) {
    const state = registeredList[i];
    if ((state.anchorEl.value === null || state.anchorEl.value.contains(target) === false) && (target === document.body || state.innerRef.value !== null && state.innerRef.value.contains(target) === false)) {
      evt.qClickOutside = true;
      state.onClickOutside(evt);
    } else {
      return;
    }
  }
}
function addClickOutside(clickOutsideProps) {
  registeredList.push(clickOutsideProps);
  if (registeredList.length === 1) {
    document.addEventListener("mousedown", globalHandler, notPassiveCapture);
    document.addEventListener("touchstart", globalHandler, notPassiveCapture);
  }
}
function removeClickOutside(clickOutsideProps) {
  const index = registeredList.findIndex((h2) => h2 === clickOutsideProps);
  if (index !== -1) {
    registeredList.splice(index, 1);
    if (registeredList.length === 0) {
      document.removeEventListener("mousedown", globalHandler, notPassiveCapture);
      document.removeEventListener("touchstart", globalHandler, notPassiveCapture);
    }
  }
}
let vpLeft, vpTop;
function validatePosition(pos) {
  const parts = pos.split(" ");
  if (parts.length !== 2) {
    return false;
  }
  if (["top", "center", "bottom"].includes(parts[0]) !== true) {
    console.error("Anchor/Self position must start with one of top/center/bottom");
    return false;
  }
  if (["left", "middle", "right", "start", "end"].includes(parts[1]) !== true) {
    console.error("Anchor/Self position must end with one of left/middle/right/start/end");
    return false;
  }
  return true;
}
function validateOffset(val) {
  if (!val) {
    return true;
  }
  if (val.length !== 2) {
    return false;
  }
  if (typeof val[0] !== "number" || typeof val[1] !== "number") {
    return false;
  }
  return true;
}
const horizontalPos = {
  "start#ltr": "left",
  "start#rtl": "right",
  "end#ltr": "right",
  "end#rtl": "left"
};
["left", "middle", "right"].forEach((pos) => {
  horizontalPos[`${pos}#ltr`] = pos;
  horizontalPos[`${pos}#rtl`] = pos;
});
function parsePosition(pos, rtl) {
  const parts = pos.split(" ");
  return {
    vertical: parts[0],
    horizontal: horizontalPos[`${parts[1]}#${rtl === true ? "rtl" : "ltr"}`]
  };
}
function getAnchorProps(el, offset) {
  let { top, left, right, bottom, width, height } = el.getBoundingClientRect();
  if (offset !== void 0) {
    top -= offset[1];
    left -= offset[0];
    bottom += offset[1];
    right += offset[0];
    width += offset[0];
    height += offset[1];
  }
  return {
    top,
    bottom,
    height,
    left,
    right,
    width,
    middle: left + (right - left) / 2,
    center: top + (bottom - top) / 2
  };
}
function getAbsoluteAnchorProps(el, absoluteOffset, offset) {
  let { top, left } = el.getBoundingClientRect();
  top += absoluteOffset.top;
  left += absoluteOffset.left;
  if (offset !== void 0) {
    top += offset[1];
    left += offset[0];
  }
  return {
    top,
    bottom: top + 1,
    height: 1,
    left,
    right: left + 1,
    width: 1,
    middle: left,
    center: top
  };
}
function getTargetProps(width, height) {
  return {
    top: 0,
    center: height / 2,
    bottom: height,
    left: 0,
    middle: width / 2,
    right: width
  };
}
function getTopLeftProps(anchorProps, targetProps, anchorOrigin, selfOrigin) {
  return {
    top: anchorProps[anchorOrigin.vertical] - targetProps[selfOrigin.vertical],
    left: anchorProps[anchorOrigin.horizontal] - targetProps[selfOrigin.horizontal]
  };
}
function setPosition(cfg, retryNumber = 0) {
  if (cfg.targetEl === null || cfg.anchorEl === null || retryNumber > 5) return;
  if (cfg.targetEl.offsetHeight === 0 || cfg.targetEl.offsetWidth === 0) {
    setTimeout(() => {
      setPosition(cfg, retryNumber + 1);
    }, 10);
    return;
  }
  const {
    targetEl,
    offset,
    anchorEl,
    anchorOrigin,
    selfOrigin,
    absoluteOffset,
    fit,
    cover,
    maxHeight,
    maxWidth
  } = cfg;
  if (client.is.ios === true && window.visualViewport !== void 0) {
    const el = document.body.style;
    const { offsetLeft: left, offsetTop: top } = window.visualViewport;
    if (left !== vpLeft) {
      el.setProperty("--q-pe-left", left + "px");
      vpLeft = left;
    }
    if (top !== vpTop) {
      el.setProperty("--q-pe-top", top + "px");
      vpTop = top;
    }
  }
  const { scrollLeft, scrollTop } = targetEl;
  const anchorProps = absoluteOffset === void 0 ? getAnchorProps(anchorEl, cover === true ? [0, 0] : offset) : getAbsoluteAnchorProps(anchorEl, absoluteOffset, offset);
  Object.assign(targetEl.style, {
    top: 0,
    left: 0,
    minWidth: null,
    minHeight: null,
    maxWidth,
    maxHeight,
    visibility: "visible"
  });
  const { offsetWidth: origElWidth, offsetHeight: origElHeight } = targetEl;
  const { elWidth, elHeight } = fit === true || cover === true ? { elWidth: Math.max(anchorProps.width, origElWidth), elHeight: cover === true ? Math.max(anchorProps.height, origElHeight) : origElHeight } : { elWidth: origElWidth, elHeight: origElHeight };
  let elStyle = { maxWidth, maxHeight };
  if (fit === true || cover === true) {
    elStyle.minWidth = anchorProps.width + "px";
    if (cover === true) {
      elStyle.minHeight = anchorProps.height + "px";
    }
  }
  Object.assign(targetEl.style, elStyle);
  const targetProps = getTargetProps(elWidth, elHeight);
  let props = getTopLeftProps(anchorProps, targetProps, anchorOrigin, selfOrigin);
  if (absoluteOffset === void 0 || offset === void 0) {
    applyBoundaries(props, anchorProps, targetProps, anchorOrigin, selfOrigin);
  } else {
    const { top, left } = props;
    applyBoundaries(props, anchorProps, targetProps, anchorOrigin, selfOrigin);
    let hasChanged = false;
    if (props.top !== top) {
      hasChanged = true;
      const offsetY = 2 * offset[1];
      anchorProps.center = anchorProps.top -= offsetY;
      anchorProps.bottom -= offsetY + 2;
    }
    if (props.left !== left) {
      hasChanged = true;
      const offsetX = 2 * offset[0];
      anchorProps.middle = anchorProps.left -= offsetX;
      anchorProps.right -= offsetX + 2;
    }
    if (hasChanged === true) {
      props = getTopLeftProps(anchorProps, targetProps, anchorOrigin, selfOrigin);
      applyBoundaries(props, anchorProps, targetProps, anchorOrigin, selfOrigin);
    }
  }
  elStyle = {
    top: props.top + "px",
    left: props.left + "px"
  };
  if (props.maxHeight !== void 0) {
    elStyle.maxHeight = props.maxHeight + "px";
    if (anchorProps.height > props.maxHeight) {
      elStyle.minHeight = elStyle.maxHeight;
    }
  }
  if (props.maxWidth !== void 0) {
    elStyle.maxWidth = props.maxWidth + "px";
    if (anchorProps.width > props.maxWidth) {
      elStyle.minWidth = elStyle.maxWidth;
    }
  }
  Object.assign(targetEl.style, elStyle);
  if (targetEl.scrollTop !== scrollTop) {
    targetEl.scrollTop = scrollTop;
  }
  if (targetEl.scrollLeft !== scrollLeft) {
    targetEl.scrollLeft = scrollLeft;
  }
}
function applyBoundaries(props, anchorProps, targetProps, anchorOrigin, selfOrigin) {
  const currentHeight = targetProps.bottom, currentWidth = targetProps.right, margin = getScrollbarWidth(), innerHeight = window.innerHeight - margin, innerWidth = document.body.clientWidth;
  if (props.top < 0 || props.top + currentHeight > innerHeight) {
    if (selfOrigin.vertical === "center") {
      props.top = anchorProps[anchorOrigin.vertical] > innerHeight / 2 ? Math.max(0, innerHeight - currentHeight) : 0;
      props.maxHeight = Math.min(currentHeight, innerHeight);
    } else if (anchorProps[anchorOrigin.vertical] > innerHeight / 2) {
      const anchorY = Math.min(
        innerHeight,
        anchorOrigin.vertical === "center" ? anchorProps.center : anchorOrigin.vertical === selfOrigin.vertical ? anchorProps.bottom : anchorProps.top
      );
      props.maxHeight = Math.min(currentHeight, anchorY);
      props.top = Math.max(0, anchorY - currentHeight);
    } else {
      props.top = Math.max(
        0,
        anchorOrigin.vertical === "center" ? anchorProps.center : anchorOrigin.vertical === selfOrigin.vertical ? anchorProps.top : anchorProps.bottom
      );
      props.maxHeight = Math.min(currentHeight, innerHeight - props.top);
    }
  }
  if (props.left < 0 || props.left + currentWidth > innerWidth) {
    props.maxWidth = Math.min(currentWidth, innerWidth);
    if (selfOrigin.horizontal === "middle") {
      props.left = anchorProps[anchorOrigin.horizontal] > innerWidth / 2 ? Math.max(0, innerWidth - currentWidth) : 0;
    } else if (anchorProps[anchorOrigin.horizontal] > innerWidth / 2) {
      const anchorX = Math.min(
        innerWidth,
        anchorOrigin.horizontal === "middle" ? anchorProps.middle : anchorOrigin.horizontal === selfOrigin.horizontal ? anchorProps.right : anchorProps.left
      );
      props.maxWidth = Math.min(currentWidth, anchorX);
      props.left = Math.max(0, anchorX - props.maxWidth);
    } else {
      props.left = Math.max(
        0,
        anchorOrigin.horizontal === "middle" ? anchorProps.middle : anchorOrigin.horizontal === selfOrigin.horizontal ? anchorProps.left : anchorProps.right
      );
      props.maxWidth = Math.min(currentWidth, innerWidth - props.left);
    }
  }
}
const QMenu = createComponent({
  name: "QMenu",
  inheritAttrs: false,
  props: {
    ...useAnchorProps,
    ...useModelToggleProps,
    ...useDarkProps,
    ...useTransitionProps,
    persistent: Boolean,
    autoClose: Boolean,
    separateClosePopup: Boolean,
    noEscDismiss: Boolean,
    noRouteDismiss: Boolean,
    noRefocus: Boolean,
    noFocus: Boolean,
    fit: Boolean,
    cover: Boolean,
    square: Boolean,
    anchor: {
      type: String,
      validator: validatePosition
    },
    self: {
      type: String,
      validator: validatePosition
    },
    offset: {
      type: Array,
      validator: validateOffset
    },
    scrollTarget: scrollTargetProp,
    touchPosition: Boolean,
    maxHeight: {
      type: String,
      default: null
    },
    maxWidth: {
      type: String,
      default: null
    }
  },
  emits: [
    ...useModelToggleEmits,
    "click",
    "escapeKey"
  ],
  setup(props, { slots, emit, attrs }) {
    let refocusTarget = null, absoluteOffset, unwatchPosition, avoidAutoClose;
    const vm = getCurrentInstance();
    const { proxy } = vm;
    const { $q } = proxy;
    const innerRef = ref(null);
    const showing = ref(false);
    const hideOnRouteChange = computed(
      () => props.persistent !== true && props.noRouteDismiss !== true
    );
    const isDark = useDark(props, $q);
    const { registerTick, removeTick } = useTick();
    const { registerTimeout } = useTimeout();
    const { transitionProps, transitionStyle } = useTransition(props);
    const { localScrollTarget, changeScrollEvent, unconfigureScrollTarget } = useScrollTarget(props, configureScrollTarget);
    const { anchorEl, canShow } = useAnchor({ showing });
    const { hide } = useModelToggle({
      showing,
      canShow,
      handleShow,
      handleHide,
      hideOnRouteChange,
      processOnMount: true
    });
    const { showPortal, hidePortal, renderPortal } = usePortal(vm, innerRef, renderPortalContent, "menu");
    const clickOutsideProps = {
      anchorEl,
      innerRef,
      onClickOutside(e) {
        if (props.persistent !== true && showing.value === true) {
          hide(e);
          if (
            // always prevent touch event
            e.type === "touchstart" || e.target.classList.contains("q-dialog__backdrop")
          ) {
            stopAndPrevent(e);
          }
          return true;
        }
      }
    };
    const anchorOrigin = computed(
      () => parsePosition(
        props.anchor || (props.cover === true ? "center middle" : "bottom start"),
        $q.lang.rtl
      )
    );
    const selfOrigin = computed(() => props.cover === true ? anchorOrigin.value : parsePosition(props.self || "top start", $q.lang.rtl));
    const menuClass = computed(
      () => (props.square === true ? " q-menu--square" : "") + (isDark.value === true ? " q-menu--dark q-dark" : "")
    );
    const onEvents = computed(() => props.autoClose === true ? { onClick: onAutoClose } : {});
    const handlesFocus = computed(
      () => showing.value === true && props.persistent !== true
    );
    watch(handlesFocus, (val) => {
      if (val === true) {
        addEscapeKey(onEscapeKey);
        addClickOutside(clickOutsideProps);
      } else {
        removeEscapeKey(onEscapeKey);
        removeClickOutside(clickOutsideProps);
      }
    });
    function focus() {
      addFocusFn(() => {
        let node = innerRef.value;
        if (node && node.contains(document.activeElement) !== true) {
          node = node.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]") || node.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]") || node.querySelector("[autofocus], [data-autofocus]") || node;
          node.focus({ preventScroll: true });
        }
      });
    }
    function handleShow(evt) {
      refocusTarget = props.noRefocus === false ? document.activeElement : null;
      addFocusout(onFocusout);
      showPortal();
      configureScrollTarget();
      absoluteOffset = void 0;
      if (evt !== void 0 && (props.touchPosition || props.contextMenu)) {
        const pos = position(evt);
        if (pos.left !== void 0) {
          const { top, left } = anchorEl.value.getBoundingClientRect();
          absoluteOffset = { left: pos.left - left, top: pos.top - top };
        }
      }
      if (unwatchPosition === void 0) {
        unwatchPosition = watch(
          () => $q.screen.width + "|" + $q.screen.height + "|" + props.self + "|" + props.anchor + "|" + $q.lang.rtl,
          updatePosition
        );
      }
      if (props.noFocus !== true) {
        document.activeElement.blur();
      }
      registerTick(() => {
        updatePosition();
        props.noFocus !== true && focus();
      });
      registerTimeout(() => {
        if ($q.platform.is.ios === true) {
          avoidAutoClose = props.autoClose;
          innerRef.value.click();
        }
        updatePosition();
        showPortal(true);
        emit("show", evt);
      }, props.transitionDuration);
    }
    function handleHide(evt) {
      removeTick();
      hidePortal();
      anchorCleanup(true);
      if (refocusTarget !== null && // menu was hidden from code or ESC plugin
      (evt === void 0 || evt.qClickOutside !== true)) {
        ((evt?.type.indexOf("key") === 0 ? refocusTarget.closest('[tabindex]:not([tabindex^="-"])') : void 0) || refocusTarget).focus();
        refocusTarget = null;
      }
      registerTimeout(() => {
        hidePortal(true);
        emit("hide", evt);
      }, props.transitionDuration);
    }
    function anchorCleanup(hiding) {
      absoluteOffset = void 0;
      if (unwatchPosition !== void 0) {
        unwatchPosition();
        unwatchPosition = void 0;
      }
      if (hiding === true || showing.value === true) {
        removeFocusout(onFocusout);
        unconfigureScrollTarget();
        removeClickOutside(clickOutsideProps);
        removeEscapeKey(onEscapeKey);
      }
      if (hiding !== true) {
        refocusTarget = null;
      }
    }
    function configureScrollTarget() {
      if (anchorEl.value !== null || props.scrollTarget !== void 0) {
        localScrollTarget.value = getScrollTarget(anchorEl.value, props.scrollTarget);
        changeScrollEvent(localScrollTarget.value, updatePosition);
      }
    }
    function onAutoClose(e) {
      if (avoidAutoClose !== true) {
        closePortalMenus(proxy, e);
        emit("click", e);
      } else {
        avoidAutoClose = false;
      }
    }
    function onFocusout(evt) {
      if (handlesFocus.value === true && props.noFocus !== true && childHasFocus(innerRef.value, evt.target) !== true) {
        focus();
      }
    }
    function onEscapeKey(evt) {
      if (props.noEscDismiss !== true) {
        emit("escapeKey");
        hide(evt);
      }
    }
    function updatePosition() {
      setPosition({
        targetEl: innerRef.value,
        offset: props.offset,
        anchorEl: anchorEl.value,
        anchorOrigin: anchorOrigin.value,
        selfOrigin: selfOrigin.value,
        absoluteOffset,
        fit: props.fit,
        cover: props.cover,
        maxHeight: props.maxHeight,
        maxWidth: props.maxWidth
      });
    }
    function renderPortalContent() {
      return h(
        Transition,
        transitionProps.value,
        () => showing.value === true ? h("div", {
          role: "menu",
          ...attrs,
          ref: innerRef,
          tabindex: -1,
          class: [
            "q-menu q-position-engine scroll" + menuClass.value,
            attrs.class
          ],
          style: [
            attrs.style,
            transitionStyle.value
          ],
          ...onEvents.value
        }, hSlot(slots.default)) : null
      );
    }
    onBeforeUnmount(anchorCleanup);
    Object.assign(proxy, { focus, updatePosition });
    return renderPortal;
  }
});
function useHistory(showing, hide, hideOnRouteChange) {
  let historyEntry;
  function removeFromHistory() {
    if (historyEntry !== void 0) {
      History.remove(historyEntry);
      historyEntry = void 0;
    }
  }
  onBeforeUnmount(() => {
    showing.value === true && removeFromHistory();
  });
  return {
    removeFromHistory,
    addToHistory() {
      historyEntry = {
        condition: () => hideOnRouteChange.value === true,
        handler: hide
      };
      History.add(historyEntry);
    }
  };
}
let registered = 0, scrollPositionX, scrollPositionY, maxScrollTop, vpPendingUpdate = false, bodyLeft, bodyTop, href, closeTimer = null;
function onWheel(e) {
  if (shouldPreventScroll(e)) {
    stopAndPrevent(e);
  }
}
function shouldPreventScroll(e) {
  if (e.target === document.body || e.target.classList.contains("q-layout__backdrop")) {
    return true;
  }
  const path = getEventPath(e), shift = e.shiftKey && !e.deltaX, scrollY = !shift && Math.abs(e.deltaX) <= Math.abs(e.deltaY), delta = shift || scrollY ? e.deltaY : e.deltaX;
  for (let index = 0; index < path.length; index++) {
    const el = path[index];
    if (hasScrollbar(el, scrollY)) {
      return scrollY ? delta < 0 && el.scrollTop === 0 ? true : delta > 0 && el.scrollTop + el.clientHeight === el.scrollHeight : delta < 0 && el.scrollLeft === 0 ? true : delta > 0 && el.scrollLeft + el.clientWidth === el.scrollWidth;
    }
  }
  return true;
}
function onAppleScroll(e) {
  if (e.target === document) {
    document.scrollingElement.scrollTop = document.scrollingElement.scrollTop;
  }
}
function onAppleResize(evt) {
  if (vpPendingUpdate === true) return;
  vpPendingUpdate = true;
  requestAnimationFrame(() => {
    vpPendingUpdate = false;
    const { height } = evt.target, { clientHeight, scrollTop } = document.scrollingElement;
    if (maxScrollTop === void 0 || height !== window.innerHeight) {
      maxScrollTop = clientHeight - height;
      document.scrollingElement.scrollTop = scrollTop;
    }
    if (scrollTop > maxScrollTop) {
      document.scrollingElement.scrollTop -= Math.ceil((scrollTop - maxScrollTop) / 8);
    }
  });
}
function apply(action) {
  const body = document.body, hasViewport = window.visualViewport !== void 0;
  if (action === "add") {
    const { overflowY, overflowX } = window.getComputedStyle(body);
    scrollPositionX = getHorizontalScrollPosition(window);
    scrollPositionY = getVerticalScrollPosition(window);
    bodyLeft = body.style.left;
    bodyTop = body.style.top;
    href = window.location.href;
    body.style.left = `-${scrollPositionX}px`;
    body.style.top = `-${scrollPositionY}px`;
    if (overflowX !== "hidden" && (overflowX === "scroll" || body.scrollWidth > window.innerWidth)) {
      body.classList.add("q-body--force-scrollbar-x");
    }
    if (overflowY !== "hidden" && (overflowY === "scroll" || body.scrollHeight > window.innerHeight)) {
      body.classList.add("q-body--force-scrollbar-y");
    }
    body.classList.add("q-body--prevent-scroll");
    document.qScrollPrevented = true;
    if (client.is.ios === true) {
      if (hasViewport === true) {
        window.scrollTo(0, 0);
        window.visualViewport.addEventListener("resize", onAppleResize, listenOpts.passiveCapture);
        window.visualViewport.addEventListener("scroll", onAppleResize, listenOpts.passiveCapture);
        window.scrollTo(0, 0);
      } else {
        window.addEventListener("scroll", onAppleScroll, listenOpts.passiveCapture);
      }
    }
  }
  if (client.is.desktop === true && client.is.mac === true) {
    window[`${action}EventListener`]("wheel", onWheel, listenOpts.notPassive);
  }
  if (action === "remove") {
    if (client.is.ios === true) {
      if (hasViewport === true) {
        window.visualViewport.removeEventListener("resize", onAppleResize, listenOpts.passiveCapture);
        window.visualViewport.removeEventListener("scroll", onAppleResize, listenOpts.passiveCapture);
      } else {
        window.removeEventListener("scroll", onAppleScroll, listenOpts.passiveCapture);
      }
    }
    body.classList.remove("q-body--prevent-scroll");
    body.classList.remove("q-body--force-scrollbar-x");
    body.classList.remove("q-body--force-scrollbar-y");
    document.qScrollPrevented = false;
    body.style.left = bodyLeft;
    body.style.top = bodyTop;
    if (window.location.href === href) {
      window.scrollTo(scrollPositionX, scrollPositionY);
    }
    maxScrollTop = void 0;
  }
}
function preventScroll(state) {
  let action = "add";
  if (state === true) {
    registered++;
    if (closeTimer !== null) {
      clearTimeout(closeTimer);
      closeTimer = null;
      return;
    }
    if (registered > 1) return;
  } else {
    if (registered === 0) return;
    registered--;
    if (registered > 0) return;
    action = "remove";
    if (client.is.ios === true && client.is.nativeMobile === true) {
      closeTimer !== null && clearTimeout(closeTimer);
      closeTimer = setTimeout(() => {
        apply(action);
        closeTimer = null;
      }, 100);
      return;
    }
  }
  apply(action);
}
function usePreventScroll() {
  let currentState;
  return {
    preventBodyScroll(state) {
      if (state !== currentState && (currentState !== void 0 || state === true)) {
        currentState = state;
        preventScroll(state);
      }
    }
  };
}
let maximizedModals = 0;
const positionClass = {
  standard: "fixed-full flex-center",
  top: "fixed-top justify-center",
  bottom: "fixed-bottom justify-center",
  right: "fixed-right items-center",
  left: "fixed-left items-center"
};
const defaultTransitions = {
  standard: ["scale", "scale"],
  top: ["slide-down", "slide-up"],
  bottom: ["slide-up", "slide-down"],
  right: ["slide-left", "slide-right"],
  left: ["slide-right", "slide-left"]
};
const QDialog = createComponent({
  name: "QDialog",
  inheritAttrs: false,
  props: {
    ...useModelToggleProps,
    ...useTransitionProps,
    transitionShow: String,
    // override useTransitionProps
    transitionHide: String,
    // override useTransitionProps
    persistent: Boolean,
    autoClose: Boolean,
    allowFocusOutside: Boolean,
    noEscDismiss: Boolean,
    noBackdropDismiss: Boolean,
    noRouteDismiss: Boolean,
    noRefocus: Boolean,
    noFocus: Boolean,
    noShake: Boolean,
    seamless: Boolean,
    maximized: Boolean,
    fullWidth: Boolean,
    fullHeight: Boolean,
    square: Boolean,
    backdropFilter: String,
    position: {
      type: String,
      default: "standard",
      validator: (val) => ["standard", "top", "bottom", "left", "right"].includes(val)
    }
  },
  emits: [
    ...useModelToggleEmits,
    "shake",
    "click",
    "escapeKey"
  ],
  setup(props, { slots, emit, attrs }) {
    const vm = getCurrentInstance();
    const innerRef = ref(null);
    const showing = ref(false);
    const animating = ref(false);
    let shakeTimeout = null, refocusTarget = null, isMaximized, avoidAutoClose;
    const hideOnRouteChange = computed(
      () => props.persistent !== true && props.noRouteDismiss !== true && props.seamless !== true
    );
    const { preventBodyScroll } = usePreventScroll();
    const { registerTimeout } = useTimeout();
    const { registerTick, removeTick } = useTick();
    const { transitionProps, transitionStyle } = useTransition(
      props,
      () => defaultTransitions[props.position][0],
      () => defaultTransitions[props.position][1]
    );
    const backdropStyle = computed(() => transitionStyle.value + (props.backdropFilter !== void 0 ? `;backdrop-filter:${props.backdropFilter};-webkit-backdrop-filter:${props.backdropFilter}` : ""));
    const { showPortal, hidePortal, portalIsAccessible, renderPortal } = usePortal(
      vm,
      innerRef,
      renderPortalContent,
      "dialog"
    );
    const { hide } = useModelToggle({
      showing,
      hideOnRouteChange,
      handleShow,
      handleHide,
      processOnMount: true
    });
    const { addToHistory, removeFromHistory } = useHistory(showing, hide, hideOnRouteChange);
    const classes = computed(
      () => `q-dialog__inner flex no-pointer-events q-dialog__inner--${props.maximized === true ? "maximized" : "minimized"} q-dialog__inner--${props.position} ${positionClass[props.position]}` + (animating.value === true ? " q-dialog__inner--animating" : "") + (props.fullWidth === true ? " q-dialog__inner--fullwidth" : "") + (props.fullHeight === true ? " q-dialog__inner--fullheight" : "") + (props.square === true ? " q-dialog__inner--square" : "")
    );
    const useBackdrop = computed(() => showing.value === true && props.seamless !== true);
    const onEvents = computed(() => props.autoClose === true ? { onClick: onAutoClose } : {});
    const rootClasses = computed(() => [
      `q-dialog fullscreen no-pointer-events q-dialog--${useBackdrop.value === true ? "modal" : "seamless"}`,
      attrs.class
    ]);
    watch(() => props.maximized, (state) => {
      showing.value === true && updateMaximized(state);
    });
    watch(useBackdrop, (val) => {
      preventBodyScroll(val);
      if (val === true) {
        addFocusout(onFocusChange);
        addEscapeKey(onEscapeKey);
      } else {
        removeFocusout(onFocusChange);
        removeEscapeKey(onEscapeKey);
      }
    });
    function handleShow(evt) {
      addToHistory();
      refocusTarget = props.noRefocus === false && document.activeElement !== null ? document.activeElement : null;
      updateMaximized(props.maximized);
      showPortal();
      animating.value = true;
      if (props.noFocus !== true) {
        document.activeElement?.blur();
        registerTick(focus);
      } else {
        removeTick();
      }
      registerTimeout(() => {
        if (vm.proxy.$q.platform.is.ios === true) {
          if (props.seamless !== true && document.activeElement) {
            const { top, bottom } = document.activeElement.getBoundingClientRect(), { innerHeight } = window, height = window.visualViewport !== void 0 ? window.visualViewport.height : innerHeight;
            if (top > 0 && bottom > height / 2) {
              document.scrollingElement.scrollTop = Math.min(
                document.scrollingElement.scrollHeight - height,
                bottom >= innerHeight ? Infinity : Math.ceil(document.scrollingElement.scrollTop + bottom - height / 2)
              );
            }
            document.activeElement.scrollIntoView();
          }
          avoidAutoClose = true;
          innerRef.value.click();
          avoidAutoClose = false;
        }
        showPortal(true);
        animating.value = false;
        emit("show", evt);
      }, props.transitionDuration);
    }
    function handleHide(evt) {
      removeTick();
      removeFromHistory();
      cleanup(true);
      animating.value = true;
      hidePortal();
      if (refocusTarget !== null) {
        ((evt?.type.indexOf("key") === 0 ? refocusTarget.closest('[tabindex]:not([tabindex^="-"])') : void 0) || refocusTarget).focus();
        refocusTarget = null;
      }
      registerTimeout(() => {
        hidePortal(true);
        animating.value = false;
        emit("hide", evt);
      }, props.transitionDuration);
    }
    function focus(selector) {
      addFocusFn(() => {
        let node = innerRef.value;
        if (node === null) return;
        if (selector !== void 0) {
          const target = node.querySelector(selector);
          if (target !== null) {
            target.focus({ preventScroll: true });
            return;
          }
        }
        if (node.contains(document.activeElement) !== true) {
          node = node.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]") || node.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]") || node.querySelector("[autofocus], [data-autofocus]") || node;
          node.focus({ preventScroll: true });
        }
      });
    }
    function shake(focusTarget) {
      if (focusTarget && typeof focusTarget.focus === "function") {
        focusTarget.focus({ preventScroll: true });
      } else {
        focus();
      }
      emit("shake");
      const node = innerRef.value;
      if (node !== null) {
        node.classList.remove("q-animate--scale");
        node.classList.add("q-animate--scale");
        shakeTimeout !== null && clearTimeout(shakeTimeout);
        shakeTimeout = setTimeout(() => {
          shakeTimeout = null;
          if (innerRef.value !== null) {
            node.classList.remove("q-animate--scale");
            focus();
          }
        }, 170);
      }
    }
    function onEscapeKey() {
      if (props.seamless !== true) {
        if (props.persistent === true || props.noEscDismiss === true) {
          props.maximized !== true && props.noShake !== true && shake();
        } else {
          emit("escapeKey");
          hide();
        }
      }
    }
    function cleanup(hiding) {
      if (shakeTimeout !== null) {
        clearTimeout(shakeTimeout);
        shakeTimeout = null;
      }
      if (hiding === true || showing.value === true) {
        updateMaximized(false);
        if (props.seamless !== true) {
          preventBodyScroll(false);
          removeFocusout(onFocusChange);
          removeEscapeKey(onEscapeKey);
        }
      }
      if (hiding !== true) {
        refocusTarget = null;
      }
    }
    function updateMaximized(active) {
      if (active === true) {
        if (isMaximized !== true) {
          maximizedModals < 1 && document.body.classList.add("q-body--dialog");
          maximizedModals++;
          isMaximized = true;
        }
      } else if (isMaximized === true) {
        if (maximizedModals < 2) {
          document.body.classList.remove("q-body--dialog");
        }
        maximizedModals--;
        isMaximized = false;
      }
    }
    function onAutoClose(e) {
      if (avoidAutoClose !== true) {
        hide(e);
        emit("click", e);
      }
    }
    function onBackdropClick(e) {
      if (props.persistent !== true && props.noBackdropDismiss !== true) {
        hide(e);
      } else if (props.noShake !== true) {
        shake();
      }
    }
    function onFocusChange(evt) {
      if (props.allowFocusOutside !== true && portalIsAccessible.value === true && childHasFocus(innerRef.value, evt.target) !== true) {
        focus('[tabindex]:not([tabindex="-1"])');
      }
    }
    Object.assign(vm.proxy, {
      // expose public methods
      focus,
      shake,
      // private but needed by QSelect
      __updateRefocusTarget(target) {
        refocusTarget = target || null;
      }
    });
    onBeforeUnmount(cleanup);
    function renderPortalContent() {
      return h("div", {
        role: "dialog",
        "aria-modal": useBackdrop.value === true ? "true" : "false",
        ...attrs,
        class: rootClasses.value
      }, [
        h(Transition, {
          name: "q-transition--fade",
          appear: true
        }, () => useBackdrop.value === true ? h("div", {
          class: "q-dialog__backdrop fixed-full",
          style: backdropStyle.value,
          "aria-hidden": "true",
          tabindex: -1,
          onClick: onBackdropClick
        }) : null),
        h(
          Transition,
          transitionProps.value,
          () => showing.value === true ? h("div", {
            ref: innerRef,
            class: classes.value,
            style: transitionStyle.value,
            tabindex: -1,
            ...onEvents.value
          }, hSlot(slots.default)) : null
        )
      ]);
    }
    return renderPortal;
  }
});
let rtlHasScrollBug = false;
{
  const scroller = document.createElement("div");
  scroller.setAttribute("dir", "rtl");
  Object.assign(scroller.style, {
    width: "1px",
    height: "1px",
    overflow: "auto"
  });
  const spacer = document.createElement("div");
  Object.assign(spacer.style, {
    width: "1000px",
    height: "1px"
  });
  document.body.appendChild(scroller);
  scroller.appendChild(spacer);
  scroller.scrollLeft = -1e3;
  rtlHasScrollBug = scroller.scrollLeft >= 0;
  scroller.remove();
}
const aggBucketSize = 1e3;
const scrollToEdges = [
  "start",
  "center",
  "end",
  "start-force",
  "center-force",
  "end-force"
];
const filterProto = Array.prototype.filter;
const setOverflowAnchor = window.getComputedStyle(document.body).overflowAnchor === void 0 ? noop : function(contentEl, index) {
  if (contentEl === null) return;
  if (contentEl._qOverflowAnimationFrame !== void 0) {
    cancelAnimationFrame(contentEl._qOverflowAnimationFrame);
  }
  contentEl._qOverflowAnimationFrame = requestAnimationFrame(() => {
    if (contentEl === null) return;
    contentEl._qOverflowAnimationFrame = void 0;
    const children = contentEl.children || [];
    filterProto.call(children, (el2) => el2.dataset && el2.dataset.qVsAnchor !== void 0).forEach((el2) => {
      delete el2.dataset.qVsAnchor;
    });
    const el = children[index];
    if (el?.dataset) {
      el.dataset.qVsAnchor = "";
    }
  });
};
function sumFn(acc, h2) {
  return acc + h2;
}
function getScrollDetails(parent, child, beforeRef, afterRef, horizontal, rtl, stickyStart, stickyEnd) {
  const parentCalc = parent === window ? document.scrollingElement || document.documentElement : parent, propElSize = horizontal === true ? "offsetWidth" : "offsetHeight", details = {
    scrollStart: 0,
    scrollViewSize: -stickyStart - stickyEnd,
    scrollMaxSize: 0,
    offsetStart: -stickyStart,
    offsetEnd: -stickyEnd
  };
  if (horizontal === true) {
    if (parent === window) {
      details.scrollStart = window.pageXOffset || window.scrollX || document.body.scrollLeft || 0;
      details.scrollViewSize += document.documentElement.clientWidth;
    } else {
      details.scrollStart = parentCalc.scrollLeft;
      details.scrollViewSize += parentCalc.clientWidth;
    }
    details.scrollMaxSize = parentCalc.scrollWidth;
    if (rtl === true) {
      details.scrollStart = (rtlHasScrollBug === true ? details.scrollMaxSize - details.scrollViewSize : 0) - details.scrollStart;
    }
  } else {
    if (parent === window) {
      details.scrollStart = window.pageYOffset || window.scrollY || document.body.scrollTop || 0;
      details.scrollViewSize += document.documentElement.clientHeight;
    } else {
      details.scrollStart = parentCalc.scrollTop;
      details.scrollViewSize += parentCalc.clientHeight;
    }
    details.scrollMaxSize = parentCalc.scrollHeight;
  }
  if (beforeRef !== null) {
    for (let el = beforeRef.previousElementSibling; el !== null; el = el.previousElementSibling) {
      if (el.classList.contains("q-virtual-scroll--skip") === false) {
        details.offsetStart += el[propElSize];
      }
    }
  }
  if (afterRef !== null) {
    for (let el = afterRef.nextElementSibling; el !== null; el = el.nextElementSibling) {
      if (el.classList.contains("q-virtual-scroll--skip") === false) {
        details.offsetEnd += el[propElSize];
      }
    }
  }
  if (child !== parent) {
    const parentRect = parentCalc.getBoundingClientRect(), childRect = child.getBoundingClientRect();
    if (horizontal === true) {
      details.offsetStart += childRect.left - parentRect.left;
      details.offsetEnd -= childRect.width;
    } else {
      details.offsetStart += childRect.top - parentRect.top;
      details.offsetEnd -= childRect.height;
    }
    if (parent !== window) {
      details.offsetStart += details.scrollStart;
    }
    details.offsetEnd += details.scrollMaxSize - details.offsetStart;
  }
  return details;
}
function setScroll(parent, scroll, horizontal, rtl) {
  if (scroll === "end") {
    scroll = (parent === window ? document.body : parent)[horizontal === true ? "scrollWidth" : "scrollHeight"];
  }
  if (parent === window) {
    if (horizontal === true) {
      if (rtl === true) {
        scroll = (rtlHasScrollBug === true ? document.body.scrollWidth - document.documentElement.clientWidth : 0) - scroll;
      }
      window.scrollTo(scroll, window.pageYOffset || window.scrollY || document.body.scrollTop || 0);
    } else {
      window.scrollTo(window.pageXOffset || window.scrollX || document.body.scrollLeft || 0, scroll);
    }
  } else if (horizontal === true) {
    if (rtl === true) {
      scroll = (rtlHasScrollBug === true ? parent.scrollWidth - parent.offsetWidth : 0) - scroll;
    }
    parent.scrollLeft = scroll;
  } else {
    parent.scrollTop = scroll;
  }
}
function sumSize(sizeAgg, size2, from, to) {
  if (from >= to) {
    return 0;
  }
  const lastTo = size2.length, fromAgg = Math.floor(from / aggBucketSize), toAgg = Math.floor((to - 1) / aggBucketSize) + 1;
  let total = sizeAgg.slice(fromAgg, toAgg).reduce(sumFn, 0);
  if (from % aggBucketSize !== 0) {
    total -= size2.slice(fromAgg * aggBucketSize, from).reduce(sumFn, 0);
  }
  if (to % aggBucketSize !== 0 && to !== lastTo) {
    total -= size2.slice(to, toAgg * aggBucketSize).reduce(sumFn, 0);
  }
  return total;
}
const commonVirtScrollProps = {
  virtualScrollSliceSize: {
    type: [Number, String],
    default: 10
  },
  virtualScrollSliceRatioBefore: {
    type: [Number, String],
    default: 1
  },
  virtualScrollSliceRatioAfter: {
    type: [Number, String],
    default: 1
  },
  virtualScrollItemSize: {
    type: [Number, String],
    default: 24
  },
  virtualScrollStickySizeStart: {
    type: [Number, String],
    default: 0
  },
  virtualScrollStickySizeEnd: {
    type: [Number, String],
    default: 0
  },
  tableColspan: [Number, String]
};
const useVirtualScrollProps = {
  virtualScrollHorizontal: Boolean,
  onVirtualScroll: Function,
  ...commonVirtScrollProps
};
function useVirtualScroll({
  virtualScrollLength,
  getVirtualScrollTarget,
  getVirtualScrollEl,
  virtualScrollItemSizeComputed
  // optional
}) {
  const vm = getCurrentInstance();
  const { props, emit, proxy } = vm;
  const { $q } = proxy;
  let prevScrollStart, prevToIndex, localScrollViewSize, virtualScrollSizesAgg = [], virtualScrollSizes;
  const virtualScrollPaddingBefore = ref(0);
  const virtualScrollPaddingAfter = ref(0);
  const virtualScrollSliceSizeComputed = ref({});
  const beforeRef = ref(null);
  const afterRef = ref(null);
  const contentRef = ref(null);
  const virtualScrollSliceRange = ref({ from: 0, to: 0 });
  const colspanAttr = computed(() => props.tableColspan !== void 0 ? props.tableColspan : 100);
  if (virtualScrollItemSizeComputed === void 0) {
    virtualScrollItemSizeComputed = computed(() => props.virtualScrollItemSize);
  }
  const needsReset = computed(() => virtualScrollItemSizeComputed.value + ";" + props.virtualScrollHorizontal);
  const needsSliceRecalc = computed(
    () => needsReset.value + ";" + props.virtualScrollSliceRatioBefore + ";" + props.virtualScrollSliceRatioAfter
  );
  watch(needsSliceRecalc, () => {
    setVirtualScrollSize();
  });
  watch(needsReset, reset);
  function reset() {
    localResetVirtualScroll(prevToIndex, true);
  }
  function refresh(toIndex) {
    localResetVirtualScroll(toIndex === void 0 ? prevToIndex : toIndex);
  }
  function scrollTo(toIndex, edge) {
    const scrollEl = getVirtualScrollTarget();
    if (scrollEl === void 0 || scrollEl === null || scrollEl.nodeType === 8) return;
    const scrollDetails = getScrollDetails(
      scrollEl,
      getVirtualScrollEl(),
      beforeRef.value,
      afterRef.value,
      props.virtualScrollHorizontal,
      $q.lang.rtl,
      props.virtualScrollStickySizeStart,
      props.virtualScrollStickySizeEnd
    );
    localScrollViewSize !== scrollDetails.scrollViewSize && setVirtualScrollSize(scrollDetails.scrollViewSize);
    setVirtualScrollSliceRange(
      scrollEl,
      scrollDetails,
      Math.min(virtualScrollLength.value - 1, Math.max(0, parseInt(toIndex, 10) || 0)),
      0,
      scrollToEdges.indexOf(edge) !== -1 ? edge : prevToIndex !== -1 && toIndex > prevToIndex ? "end" : "start"
    );
  }
  function localOnVirtualScrollEvt() {
    const scrollEl = getVirtualScrollTarget();
    if (scrollEl === void 0 || scrollEl === null || scrollEl.nodeType === 8) return;
    const scrollDetails = getScrollDetails(
      scrollEl,
      getVirtualScrollEl(),
      beforeRef.value,
      afterRef.value,
      props.virtualScrollHorizontal,
      $q.lang.rtl,
      props.virtualScrollStickySizeStart,
      props.virtualScrollStickySizeEnd
    ), listLastIndex = virtualScrollLength.value - 1, listEndOffset = scrollDetails.scrollMaxSize - scrollDetails.offsetStart - scrollDetails.offsetEnd - virtualScrollPaddingAfter.value;
    if (prevScrollStart === scrollDetails.scrollStart) return;
    if (scrollDetails.scrollMaxSize <= 0) {
      setVirtualScrollSliceRange(scrollEl, scrollDetails, 0, 0);
      return;
    }
    localScrollViewSize !== scrollDetails.scrollViewSize && setVirtualScrollSize(scrollDetails.scrollViewSize);
    updateVirtualScrollSizes(virtualScrollSliceRange.value.from);
    const scrollMaxStart = Math.floor(scrollDetails.scrollMaxSize - Math.max(scrollDetails.scrollViewSize, scrollDetails.offsetEnd) - Math.min(virtualScrollSizes[listLastIndex], scrollDetails.scrollViewSize / 2));
    if (scrollMaxStart > 0 && Math.ceil(scrollDetails.scrollStart) >= scrollMaxStart) {
      setVirtualScrollSliceRange(
        scrollEl,
        scrollDetails,
        listLastIndex,
        scrollDetails.scrollMaxSize - scrollDetails.offsetEnd - virtualScrollSizesAgg.reduce(sumFn, 0)
      );
      return;
    }
    let toIndex = 0, listOffset = scrollDetails.scrollStart - scrollDetails.offsetStart, offset = listOffset;
    if (listOffset <= listEndOffset && listOffset + scrollDetails.scrollViewSize >= virtualScrollPaddingBefore.value) {
      listOffset -= virtualScrollPaddingBefore.value;
      toIndex = virtualScrollSliceRange.value.from;
      offset = listOffset;
    } else {
      for (let j = 0; listOffset >= virtualScrollSizesAgg[j] && toIndex < listLastIndex; j++) {
        listOffset -= virtualScrollSizesAgg[j];
        toIndex += aggBucketSize;
      }
    }
    while (listOffset > 0 && toIndex < listLastIndex) {
      listOffset -= virtualScrollSizes[toIndex];
      if (listOffset > -scrollDetails.scrollViewSize) {
        toIndex++;
        offset = listOffset;
      } else {
        offset = virtualScrollSizes[toIndex] + listOffset;
      }
    }
    setVirtualScrollSliceRange(
      scrollEl,
      scrollDetails,
      toIndex,
      offset
    );
  }
  function setVirtualScrollSliceRange(scrollEl, scrollDetails, toIndex, offset, align) {
    const alignForce = typeof align === "string" && align.indexOf("-force") !== -1;
    const alignEnd = alignForce === true ? align.replace("-force", "") : align;
    const alignRange = alignEnd !== void 0 ? alignEnd : "start";
    let from = Math.max(0, toIndex - virtualScrollSliceSizeComputed.value[alignRange]), to = from + virtualScrollSliceSizeComputed.value.total;
    if (to > virtualScrollLength.value) {
      to = virtualScrollLength.value;
      from = Math.max(0, to - virtualScrollSliceSizeComputed.value.total);
    }
    prevScrollStart = scrollDetails.scrollStart;
    const rangeChanged = from !== virtualScrollSliceRange.value.from || to !== virtualScrollSliceRange.value.to;
    if (rangeChanged === false && alignEnd === void 0) {
      emitScroll(toIndex);
      return;
    }
    const { activeElement } = document;
    const contentEl = contentRef.value;
    if (rangeChanged === true && contentEl !== null && contentEl !== activeElement && contentEl.contains(activeElement) === true) {
      contentEl.addEventListener("focusout", onBlurRefocusFn);
      setTimeout(() => {
        contentEl?.removeEventListener("focusout", onBlurRefocusFn);
      });
    }
    setOverflowAnchor(contentEl, toIndex - from);
    const sizeBefore = alignEnd !== void 0 ? virtualScrollSizes.slice(from, toIndex).reduce(sumFn, 0) : 0;
    if (rangeChanged === true) {
      const tempTo = to >= virtualScrollSliceRange.value.from && from <= virtualScrollSliceRange.value.to ? virtualScrollSliceRange.value.to : to;
      virtualScrollSliceRange.value = { from, to: tempTo };
      virtualScrollPaddingBefore.value = sumSize(virtualScrollSizesAgg, virtualScrollSizes, 0, from);
      virtualScrollPaddingAfter.value = sumSize(virtualScrollSizesAgg, virtualScrollSizes, to, virtualScrollLength.value);
      requestAnimationFrame(() => {
        if (virtualScrollSliceRange.value.to !== to && prevScrollStart === scrollDetails.scrollStart) {
          virtualScrollSliceRange.value = { from: virtualScrollSliceRange.value.from, to };
          virtualScrollPaddingAfter.value = sumSize(virtualScrollSizesAgg, virtualScrollSizes, to, virtualScrollLength.value);
        }
      });
    }
    requestAnimationFrame(() => {
      if (prevScrollStart !== scrollDetails.scrollStart) return;
      if (rangeChanged === true) {
        updateVirtualScrollSizes(from);
      }
      const sizeAfter = virtualScrollSizes.slice(from, toIndex).reduce(sumFn, 0), posStart = sizeAfter + scrollDetails.offsetStart + virtualScrollPaddingBefore.value, posEnd = posStart + virtualScrollSizes[toIndex];
      let scrollPosition = posStart + offset;
      if (alignEnd !== void 0) {
        const sizeDiff = sizeAfter - sizeBefore;
        const scrollStart = scrollDetails.scrollStart + sizeDiff;
        scrollPosition = alignForce !== true && scrollStart < posStart && posEnd < scrollStart + scrollDetails.scrollViewSize ? scrollStart : alignEnd === "end" ? posEnd - scrollDetails.scrollViewSize : posStart - (alignEnd === "start" ? 0 : Math.round((scrollDetails.scrollViewSize - virtualScrollSizes[toIndex]) / 2));
      }
      prevScrollStart = scrollPosition;
      setScroll(
        scrollEl,
        scrollPosition,
        props.virtualScrollHorizontal,
        $q.lang.rtl
      );
      emitScroll(toIndex);
    });
  }
  function updateVirtualScrollSizes(from) {
    const contentEl = contentRef.value;
    if (contentEl) {
      const children = filterProto.call(
        contentEl.children,
        (el) => el.classList && el.classList.contains("q-virtual-scroll--skip") === false
      ), childrenLength = children.length, sizeFn = props.virtualScrollHorizontal === true ? (el) => el.getBoundingClientRect().width : (el) => el.offsetHeight;
      let index = from, size2, diff;
      for (let i = 0; i < childrenLength; ) {
        size2 = sizeFn(children[i]);
        i++;
        while (i < childrenLength && children[i].classList.contains("q-virtual-scroll--with-prev") === true) {
          size2 += sizeFn(children[i]);
          i++;
        }
        diff = size2 - virtualScrollSizes[index];
        if (diff !== 0) {
          virtualScrollSizes[index] += diff;
          virtualScrollSizesAgg[Math.floor(index / aggBucketSize)] += diff;
        }
        index++;
      }
    }
  }
  function onBlurRefocusFn() {
    contentRef.value?.focus();
  }
  function localResetVirtualScroll(toIndex, fullReset) {
    const defaultSize = 1 * virtualScrollItemSizeComputed.value;
    if (fullReset === true || Array.isArray(virtualScrollSizes) === false) {
      virtualScrollSizes = [];
    }
    const oldVirtualScrollSizesLength = virtualScrollSizes.length;
    virtualScrollSizes.length = virtualScrollLength.value;
    for (let i = virtualScrollLength.value - 1; i >= oldVirtualScrollSizesLength; i--) {
      virtualScrollSizes[i] = defaultSize;
    }
    const jMax = Math.floor((virtualScrollLength.value - 1) / aggBucketSize);
    virtualScrollSizesAgg = [];
    for (let j = 0; j <= jMax; j++) {
      let size2 = 0;
      const iMax = Math.min((j + 1) * aggBucketSize, virtualScrollLength.value);
      for (let i = j * aggBucketSize; i < iMax; i++) {
        size2 += virtualScrollSizes[i];
      }
      virtualScrollSizesAgg.push(size2);
    }
    prevToIndex = -1;
    prevScrollStart = void 0;
    virtualScrollPaddingBefore.value = sumSize(virtualScrollSizesAgg, virtualScrollSizes, 0, virtualScrollSliceRange.value.from);
    virtualScrollPaddingAfter.value = sumSize(virtualScrollSizesAgg, virtualScrollSizes, virtualScrollSliceRange.value.to, virtualScrollLength.value);
    if (toIndex >= 0) {
      updateVirtualScrollSizes(virtualScrollSliceRange.value.from);
      nextTick(() => {
        scrollTo(toIndex);
      });
    } else {
      onVirtualScrollEvt();
    }
  }
  function setVirtualScrollSize(scrollViewSize) {
    if (scrollViewSize === void 0 && typeof window !== "undefined") {
      const scrollEl = getVirtualScrollTarget();
      if (scrollEl !== void 0 && scrollEl !== null && scrollEl.nodeType !== 8) {
        scrollViewSize = getScrollDetails(
          scrollEl,
          getVirtualScrollEl(),
          beforeRef.value,
          afterRef.value,
          props.virtualScrollHorizontal,
          $q.lang.rtl,
          props.virtualScrollStickySizeStart,
          props.virtualScrollStickySizeEnd
        ).scrollViewSize;
      }
    }
    localScrollViewSize = scrollViewSize;
    const virtualScrollSliceRatioBefore = parseFloat(props.virtualScrollSliceRatioBefore) || 0;
    const virtualScrollSliceRatioAfter = parseFloat(props.virtualScrollSliceRatioAfter) || 0;
    const multiplier = 1 + virtualScrollSliceRatioBefore + virtualScrollSliceRatioAfter;
    const view = scrollViewSize === void 0 || scrollViewSize <= 0 ? 1 : Math.ceil(scrollViewSize / virtualScrollItemSizeComputed.value);
    const baseSize = Math.max(
      1,
      view,
      Math.ceil((props.virtualScrollSliceSize > 0 ? props.virtualScrollSliceSize : 10) / multiplier)
    );
    virtualScrollSliceSizeComputed.value = {
      total: Math.ceil(baseSize * multiplier),
      start: Math.ceil(baseSize * virtualScrollSliceRatioBefore),
      center: Math.ceil(baseSize * (0.5 + virtualScrollSliceRatioBefore)),
      end: Math.ceil(baseSize * (1 + virtualScrollSliceRatioBefore)),
      view
    };
  }
  function padVirtualScroll(tag, content) {
    const paddingSize = props.virtualScrollHorizontal === true ? "width" : "height";
    const style = {
      ["--q-virtual-scroll-item-" + paddingSize]: virtualScrollItemSizeComputed.value + "px"
    };
    return [
      tag === "tbody" ? h(tag, {
        class: "q-virtual-scroll__padding",
        key: "before",
        ref: beforeRef
      }, [
        h("tr", [
          h("td", {
            style: { [paddingSize]: `${virtualScrollPaddingBefore.value}px`, ...style },
            colspan: colspanAttr.value
          })
        ])
      ]) : h(tag, {
        class: "q-virtual-scroll__padding",
        key: "before",
        ref: beforeRef,
        style: { [paddingSize]: `${virtualScrollPaddingBefore.value}px`, ...style }
      }),
      h(tag, {
        class: "q-virtual-scroll__content",
        key: "content",
        ref: contentRef,
        tabindex: -1
      }, content.flat()),
      tag === "tbody" ? h(tag, {
        class: "q-virtual-scroll__padding",
        key: "after",
        ref: afterRef
      }, [
        h("tr", [
          h("td", {
            style: { [paddingSize]: `${virtualScrollPaddingAfter.value}px`, ...style },
            colspan: colspanAttr.value
          })
        ])
      ]) : h(tag, {
        class: "q-virtual-scroll__padding",
        key: "after",
        ref: afterRef,
        style: { [paddingSize]: `${virtualScrollPaddingAfter.value}px`, ...style }
      })
    ];
  }
  function emitScroll(index) {
    if (prevToIndex !== index) {
      props.onVirtualScroll !== void 0 && emit("virtualScroll", {
        index,
        from: virtualScrollSliceRange.value.from,
        to: virtualScrollSliceRange.value.to - 1,
        direction: index < prevToIndex ? "decrease" : "increase",
        ref: proxy
      });
      prevToIndex = index;
    }
  }
  setVirtualScrollSize();
  const onVirtualScrollEvt = debounce(
    localOnVirtualScrollEvt,
    $q.platform.is.ios === true ? 120 : 35
  );
  onBeforeMount(() => {
    setVirtualScrollSize();
  });
  let shouldActivate = false;
  onDeactivated(() => {
    shouldActivate = true;
  });
  onActivated(() => {
    if (shouldActivate !== true) return;
    const scrollEl = getVirtualScrollTarget();
    if (prevScrollStart !== void 0 && scrollEl !== void 0 && scrollEl !== null && scrollEl.nodeType !== 8) {
      setScroll(
        scrollEl,
        prevScrollStart,
        props.virtualScrollHorizontal,
        $q.lang.rtl
      );
    } else {
      scrollTo(prevToIndex);
    }
  });
  onBeforeUnmount(() => {
    onVirtualScrollEvt.cancel();
  });
  Object.assign(proxy, { scrollTo, reset, refresh });
  return {
    virtualScrollSliceRange,
    virtualScrollSliceSizeComputed,
    setVirtualScrollSize,
    onVirtualScrollEvt,
    localResetVirtualScroll,
    padVirtualScroll,
    scrollTo,
    reset,
    refresh
  };
}
const isJapanese = /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/;
const isChinese = /[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}\u{2b740}-\u{2b81f}\u{2b820}-\u{2ceaf}\uf900-\ufaff\u3300-\u33ff\ufe30-\ufe4f\uf900-\ufaff\u{2f800}-\u{2fa1f}]/u;
const isKorean = /[\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]/;
const isPlainText = /[a-z0-9_ -]$/i;
function useKeyComposition(onInput) {
  return function onComposition(e) {
    if (e.type === "compositionend" || e.type === "change") {
      if (e.target.qComposing !== true) return;
      e.target.qComposing = false;
      onInput(e);
    } else if (e.type === "compositionupdate" && e.target.qComposing !== true && typeof e.data === "string") {
      const isComposing = client.is.firefox === true ? isPlainText.test(e.data) === false : isJapanese.test(e.data) === true || isChinese.test(e.data) === true || isKorean.test(e.data) === true;
      if (isComposing === true) {
        e.target.qComposing = true;
      }
    }
  };
}
function normalizeToInterval(v, min, max) {
  if (max <= min) {
    return min;
  }
  const size2 = max - min + 1;
  let index = min + (v - min) % size2;
  if (index < min) {
    index = size2 + index;
  }
  return index === 0 ? 0 : index;
}
const validateNewValueMode = (v) => ["add", "add-unique", "toggle"].includes(v);
const reEscapeList = ".*+?^${}()|[]\\";
const fieldPropsList = Object.keys(useFieldProps);
function getPropValueFn(userPropName, defaultPropName) {
  if (typeof userPropName === "function") return userPropName;
  const propName = userPropName !== void 0 ? userPropName : defaultPropName;
  return (opt) => opt !== null && typeof opt === "object" && propName in opt ? opt[propName] : opt;
}
const QSelect = createComponent({
  name: "QSelect",
  inheritAttrs: false,
  props: {
    ...useVirtualScrollProps,
    ...useFormProps,
    ...useFieldProps,
    // override of useFieldProps > modelValue
    modelValue: {
      required: true
    },
    multiple: Boolean,
    displayValue: [String, Number],
    displayValueHtml: Boolean,
    dropdownIcon: String,
    options: {
      type: Array,
      default: () => []
    },
    optionValue: [Function, String],
    optionLabel: [Function, String],
    optionDisable: [Function, String],
    hideSelected: Boolean,
    hideDropdownIcon: Boolean,
    fillInput: Boolean,
    maxValues: [Number, String],
    optionsDense: Boolean,
    optionsDark: {
      type: Boolean,
      default: null
    },
    optionsSelectedClass: String,
    optionsHtml: Boolean,
    optionsCover: Boolean,
    menuShrink: Boolean,
    menuAnchor: String,
    menuSelf: String,
    menuOffset: Array,
    popupContentClass: String,
    popupContentStyle: [String, Array, Object],
    popupNoRouteDismiss: Boolean,
    useInput: Boolean,
    useChips: Boolean,
    newValueMode: {
      type: String,
      validator: validateNewValueMode
    },
    mapOptions: Boolean,
    emitValue: Boolean,
    disableTabSelection: Boolean,
    inputDebounce: {
      type: [Number, String],
      default: 500
    },
    inputClass: [Array, String, Object],
    inputStyle: [Array, String, Object],
    tabindex: {
      type: [String, Number],
      default: 0
    },
    autocomplete: String,
    transitionShow: {},
    transitionHide: {},
    transitionDuration: {},
    behavior: {
      type: String,
      validator: (v) => ["default", "menu", "dialog"].includes(v),
      default: "default"
    },
    // override of useVirtualScrollProps > virtualScrollItemSize (no default)
    virtualScrollItemSize: useVirtualScrollProps.virtualScrollItemSize.type,
    onNewValue: Function,
    onFilter: Function
  },
  emits: [
    ...useFieldEmits,
    "add",
    "remove",
    "inputValue",
    "keyup",
    "keypress",
    "keydown",
    "popupShow",
    "popupHide",
    "filterAbort"
  ],
  setup(props, { slots, emit }) {
    const { proxy } = getCurrentInstance();
    const { $q } = proxy;
    const menu = ref(false);
    const dialog = ref(false);
    const optionIndex = ref(-1);
    const inputValue = ref("");
    const dialogFieldFocused = ref(false);
    const innerLoadingIndicator = ref(false);
    let filterTimer = null, inputValueTimer = null, innerValueCache, hasDialog, userInputValue, filterId = null, defaultInputValue, transitionShowComputed, searchBuffer, searchBufferExp;
    const inputRef = ref(null);
    const targetRef = ref(null);
    const menuRef = ref(null);
    const dialogRef = ref(null);
    const menuContentRef = ref(null);
    const nameProp = useFormInputNameAttr(props);
    const onComposition = useKeyComposition(onInput);
    const virtualScrollLength = computed(() => Array.isArray(props.options) ? props.options.length : 0);
    const virtualScrollItemSizeComputed = computed(() => props.virtualScrollItemSize === void 0 ? props.optionsDense === true ? 24 : 48 : props.virtualScrollItemSize);
    const {
      virtualScrollSliceRange,
      virtualScrollSliceSizeComputed,
      localResetVirtualScroll,
      padVirtualScroll,
      onVirtualScrollEvt,
      scrollTo,
      setVirtualScrollSize
    } = useVirtualScroll({
      virtualScrollLength,
      getVirtualScrollTarget,
      getVirtualScrollEl,
      virtualScrollItemSizeComputed
    });
    const state = useFieldState();
    const innerValue = computed(() => {
      const mapNull = props.mapOptions === true && props.multiple !== true, val = props.modelValue !== void 0 && (props.modelValue !== null || mapNull === true) ? props.multiple === true && Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue] : [];
      if (props.mapOptions === true && Array.isArray(props.options) === true) {
        const cache = props.mapOptions === true && innerValueCache !== void 0 ? innerValueCache : [];
        const values = val.map((v) => getOption(v, cache));
        return props.modelValue === null && mapNull === true ? values.filter((v) => v !== null) : values;
      }
      return val;
    });
    const innerFieldProps = computed(() => {
      const acc = {};
      fieldPropsList.forEach((key) => {
        const val = props[key];
        if (val !== void 0) {
          acc[key] = val;
        }
      });
      return acc;
    });
    const isOptionsDark = computed(() => props.optionsDark === null ? state.isDark.value : props.optionsDark);
    const hasValue = computed(() => fieldValueIsFilled(innerValue.value));
    const computedInputClass = computed(() => {
      let cls = "q-field__input q-placeholder col";
      if (props.hideSelected === true || innerValue.value.length === 0) {
        return [cls, props.inputClass];
      }
      cls += " q-field__input--padding";
      return props.inputClass === void 0 ? cls : [cls, props.inputClass];
    });
    const menuContentClass = computed(
      () => (props.virtualScrollHorizontal === true ? "q-virtual-scroll--horizontal" : "") + (props.popupContentClass ? " " + props.popupContentClass : "")
    );
    const noOptions = computed(() => virtualScrollLength.value === 0);
    const selectedString = computed(
      () => innerValue.value.map((opt) => getOptionLabel.value(opt)).join(", ")
    );
    const ariaCurrentValue = computed(() => props.displayValue !== void 0 ? props.displayValue : selectedString.value);
    const needsHtmlFn = computed(() => props.optionsHtml === true ? () => true : (opt) => opt?.html === true);
    const valueAsHtml = computed(() => props.displayValueHtml === true || props.displayValue === void 0 && (props.optionsHtml === true || innerValue.value.some(needsHtmlFn.value)));
    const tabindex = computed(() => state.focused.value === true ? props.tabindex : -1);
    const comboboxAttrs = computed(() => {
      const attrs = {
        tabindex: props.tabindex,
        role: "combobox",
        "aria-label": props.label,
        "aria-readonly": props.readonly === true ? "true" : "false",
        "aria-autocomplete": props.useInput === true ? "list" : "none",
        "aria-expanded": menu.value === true ? "true" : "false",
        "aria-controls": `${state.targetUid.value}_lb`
      };
      if (optionIndex.value >= 0) {
        attrs["aria-activedescendant"] = `${state.targetUid.value}_${optionIndex.value}`;
      }
      return attrs;
    });
    const listboxAttrs = computed(() => ({
      id: `${state.targetUid.value}_lb`,
      role: "listbox",
      "aria-multiselectable": props.multiple === true ? "true" : "false"
    }));
    const selectedScope = computed(() => {
      return innerValue.value.map((opt, i) => ({
        index: i,
        opt,
        html: needsHtmlFn.value(opt),
        selected: true,
        removeAtIndex: removeAtIndexAndFocus,
        toggleOption,
        tabindex: tabindex.value
      }));
    });
    const optionScope = computed(() => {
      if (virtualScrollLength.value === 0) {
        return [];
      }
      const { from, to } = virtualScrollSliceRange.value;
      return props.options.slice(from, to).map((opt, i) => {
        const disable = isOptionDisabled.value(opt) === true;
        const active = isOptionSelected(opt) === true;
        const index = from + i;
        const itemProps = {
          clickable: true,
          active,
          activeClass: computedOptionsSelectedClass.value,
          manualFocus: true,
          focused: false,
          disable,
          tabindex: -1,
          dense: props.optionsDense,
          dark: isOptionsDark.value,
          role: "option",
          "aria-selected": active === true ? "true" : "false",
          id: `${state.targetUid.value}_${index}`,
          onClick: () => {
            toggleOption(opt);
          }
        };
        if (disable !== true) {
          optionIndex.value === index && (itemProps.focused = true);
          if ($q.platform.is.desktop === true) {
            itemProps.onMousemove = () => {
              menu.value === true && setOptionIndex(index);
            };
          }
        }
        return {
          index,
          opt,
          html: needsHtmlFn.value(opt),
          label: getOptionLabel.value(opt),
          selected: itemProps.active,
          focused: itemProps.focused,
          toggleOption,
          setOptionIndex,
          itemProps
        };
      });
    });
    const dropdownArrowIcon = computed(() => props.dropdownIcon !== void 0 ? props.dropdownIcon : $q.iconSet.arrow.dropdown);
    const squaredMenu = computed(
      () => props.optionsCover === false && props.outlined !== true && props.standout !== true && props.borderless !== true && props.rounded !== true
    );
    const computedOptionsSelectedClass = computed(() => props.optionsSelectedClass !== void 0 ? props.optionsSelectedClass : props.color !== void 0 ? `text-${props.color}` : "");
    const getOptionValue = computed(() => getPropValueFn(props.optionValue, "value"));
    const getOptionLabel = computed(() => getPropValueFn(props.optionLabel, "label"));
    const isOptionDisabled = computed(() => getPropValueFn(props.optionDisable, "disable"));
    const innerOptionsValue = computed(() => innerValue.value.map(getOptionValue.value));
    const inputControlEvents = computed(() => {
      const evt = {
        onInput,
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        onChange: onComposition,
        onKeydown: onTargetKeydown,
        onKeyup: onTargetAutocomplete,
        onKeypress: onTargetKeypress,
        onFocus: selectInputText,
        onClick(e) {
          hasDialog === true && stop(e);
        }
      };
      evt.onCompositionstart = evt.onCompositionupdate = evt.onCompositionend = onComposition;
      return evt;
    });
    watch(innerValue, (val) => {
      innerValueCache = val;
      if (props.useInput === true && props.fillInput === true && props.multiple !== true && state.innerLoading.value !== true && (dialog.value !== true && menu.value !== true || hasValue.value !== true)) {
        userInputValue !== true && resetInputValue();
        if (dialog.value === true || menu.value === true) {
          filter("");
        }
      }
    }, { immediate: true });
    watch(() => props.fillInput, resetInputValue);
    watch(menu, updateMenu);
    watch(virtualScrollLength, rerenderMenu);
    function getEmittingOptionValue(opt) {
      return props.emitValue === true ? getOptionValue.value(opt) : opt;
    }
    function removeAtIndex(index) {
      if (index !== -1 && index < innerValue.value.length) {
        if (props.multiple === true) {
          const model = props.modelValue.slice();
          emit("remove", { index, value: model.splice(index, 1)[0] });
          emit("update:modelValue", model);
        } else {
          emit("update:modelValue", null);
        }
      }
    }
    function removeAtIndexAndFocus(index) {
      removeAtIndex(index);
      state.focus();
    }
    function add(opt, unique) {
      const val = getEmittingOptionValue(opt);
      if (props.multiple !== true) {
        props.fillInput === true && updateInputValue(
          getOptionLabel.value(opt),
          true,
          true
        );
        emit("update:modelValue", val);
        return;
      }
      if (innerValue.value.length === 0) {
        emit("add", { index: 0, value: val });
        emit("update:modelValue", props.multiple === true ? [val] : val);
        return;
      }
      if (unique === true && isOptionSelected(opt) === true) return;
      if (props.maxValues !== void 0 && props.modelValue.length >= props.maxValues) return;
      const model = props.modelValue.slice();
      emit("add", { index: model.length, value: val });
      model.push(val);
      emit("update:modelValue", model);
    }
    function toggleOption(opt, keepOpen) {
      if (state.editable.value !== true || opt === void 0 || isOptionDisabled.value(opt) === true) return;
      const optValue = getOptionValue.value(opt);
      if (props.multiple !== true) {
        if (keepOpen !== true) {
          updateInputValue(
            props.fillInput === true ? getOptionLabel.value(opt) : "",
            true,
            true
          );
          hidePopup();
        }
        targetRef.value?.focus();
        if (innerValue.value.length === 0 || isDeepEqual(getOptionValue.value(innerValue.value[0]), optValue) !== true) {
          emit("update:modelValue", props.emitValue === true ? optValue : opt);
        }
        return;
      }
      if (hasDialog !== true || dialogFieldFocused.value === true) {
        state.focus();
      }
      selectInputText();
      if (innerValue.value.length === 0) {
        const val = props.emitValue === true ? optValue : opt;
        emit("add", { index: 0, value: val });
        emit("update:modelValue", props.multiple === true ? [val] : val);
        return;
      }
      const model = props.modelValue.slice(), index = innerOptionsValue.value.findIndex((v) => isDeepEqual(v, optValue));
      if (index !== -1) {
        emit("remove", { index, value: model.splice(index, 1)[0] });
      } else {
        if (props.maxValues !== void 0 && model.length >= props.maxValues) return;
        const val = props.emitValue === true ? optValue : opt;
        emit("add", { index: model.length, value: val });
        model.push(val);
      }
      emit("update:modelValue", model);
    }
    function setOptionIndex(index) {
      if ($q.platform.is.desktop !== true) return;
      const val = index !== -1 && index < virtualScrollLength.value ? index : -1;
      if (optionIndex.value !== val) {
        optionIndex.value = val;
      }
    }
    function moveOptionSelection(offset = 1, skipInputValue) {
      if (menu.value === true) {
        let index = optionIndex.value;
        do {
          index = normalizeToInterval(
            index + offset,
            -1,
            virtualScrollLength.value - 1
          );
        } while (index !== -1 && index !== optionIndex.value && isOptionDisabled.value(props.options[index]) === true);
        if (optionIndex.value !== index) {
          setOptionIndex(index);
          scrollTo(index);
          if (skipInputValue !== true && props.useInput === true && props.fillInput === true) {
            setInputValue(
              index >= 0 ? getOptionLabel.value(props.options[index]) : defaultInputValue,
              true
            );
          }
        }
      }
    }
    function getOption(value, valueCache) {
      const fn = (opt) => isDeepEqual(getOptionValue.value(opt), value);
      return props.options.find(fn) || valueCache.find(fn) || value;
    }
    function isOptionSelected(opt) {
      const val = getOptionValue.value(opt);
      return innerOptionsValue.value.find((v) => isDeepEqual(v, val)) !== void 0;
    }
    function selectInputText(e) {
      if (props.useInput === true && targetRef.value !== null && (e === void 0 || targetRef.value === e.target && e.target.value === selectedString.value)) {
        targetRef.value.select();
      }
    }
    function onTargetKeyup(e) {
      if (isKeyCode(e, 27) === true && menu.value === true) {
        stop(e);
        hidePopup();
        resetInputValue();
      }
      emit("keyup", e);
    }
    function onTargetAutocomplete(e) {
      const { value } = e.target;
      if (e.keyCode !== void 0) {
        onTargetKeyup(e);
        return;
      }
      e.target.value = "";
      if (filterTimer !== null) {
        clearTimeout(filterTimer);
        filterTimer = null;
      }
      if (inputValueTimer !== null) {
        clearTimeout(inputValueTimer);
        inputValueTimer = null;
      }
      resetInputValue();
      if (typeof value === "string" && value.length !== 0) {
        const needle = value.toLocaleLowerCase();
        const findFn = (extractFn) => {
          const option = props.options.find((opt) => String(extractFn.value(opt)).toLocaleLowerCase() === needle);
          if (option === void 0) return false;
          if (innerValue.value.indexOf(option) === -1) {
            toggleOption(option);
          } else {
            hidePopup();
          }
          return true;
        };
        const fillFn = (afterFilter) => {
          if (findFn(getOptionValue) !== true && afterFilter !== true && findFn(getOptionLabel) !== true) {
            filter(value, true, () => fillFn(true));
          }
        };
        fillFn();
      } else {
        state.clearValue(e);
      }
    }
    function onTargetKeypress(e) {
      emit("keypress", e);
    }
    function onTargetKeydown(e) {
      emit("keydown", e);
      if (shouldIgnoreKey(e) === true) return;
      const newValueModeValid = inputValue.value.length !== 0 && (props.newValueMode !== void 0 || props.onNewValue !== void 0);
      const tabShouldSelect = e.shiftKey !== true && props.disableTabSelection !== true && props.multiple !== true && (optionIndex.value !== -1 || newValueModeValid === true);
      if (e.keyCode === 27) {
        prevent(e);
        return;
      }
      if (e.keyCode === 9 && tabShouldSelect === false) {
        closeMenu();
        return;
      }
      if (e.target === void 0 || e.target.id !== state.targetUid.value || state.editable.value !== true) return;
      if (e.keyCode === 40 && state.innerLoading.value !== true && menu.value === false) {
        stopAndPrevent(e);
        showPopup();
        return;
      }
      if (e.keyCode === 8 && (props.useChips === true || props.clearable === true) && props.hideSelected !== true && inputValue.value.length === 0) {
        if (props.multiple === true && Array.isArray(props.modelValue) === true) {
          removeAtIndex(props.modelValue.length - 1);
        } else if (props.multiple !== true && props.modelValue !== null) {
          emit("update:modelValue", null);
        }
        return;
      }
      if ((e.keyCode === 35 || e.keyCode === 36) && (typeof inputValue.value !== "string" || inputValue.value.length === 0)) {
        stopAndPrevent(e);
        optionIndex.value = -1;
        moveOptionSelection(e.keyCode === 36 ? 1 : -1, props.multiple);
      }
      if ((e.keyCode === 33 || e.keyCode === 34) && virtualScrollSliceSizeComputed.value !== void 0) {
        stopAndPrevent(e);
        optionIndex.value = Math.max(
          -1,
          Math.min(
            virtualScrollLength.value,
            optionIndex.value + (e.keyCode === 33 ? -1 : 1) * virtualScrollSliceSizeComputed.value.view
          )
        );
        moveOptionSelection(e.keyCode === 33 ? 1 : -1, props.multiple);
      }
      if (e.keyCode === 38 || e.keyCode === 40) {
        stopAndPrevent(e);
        moveOptionSelection(e.keyCode === 38 ? -1 : 1, props.multiple);
      }
      const optionsLength = virtualScrollLength.value;
      if (searchBuffer === void 0 || searchBufferExp < Date.now()) {
        searchBuffer = "";
      }
      if (optionsLength > 0 && props.useInput !== true && e.key !== void 0 && e.key.length === 1 && e.altKey === false && e.ctrlKey === false && e.metaKey === false && (e.keyCode !== 32 || searchBuffer.length !== 0)) {
        menu.value !== true && showPopup(e);
        const char = e.key.toLocaleLowerCase(), keyRepeat = searchBuffer.length === 1 && searchBuffer[0] === char;
        searchBufferExp = Date.now() + 1500;
        if (keyRepeat === false) {
          stopAndPrevent(e);
          searchBuffer += char;
        }
        const searchRe = new RegExp("^" + searchBuffer.split("").map((l) => reEscapeList.indexOf(l) !== -1 ? "\\" + l : l).join(".*"), "i");
        let index = optionIndex.value;
        if (keyRepeat === true || index < 0 || searchRe.test(getOptionLabel.value(props.options[index])) !== true) {
          do {
            index = normalizeToInterval(index + 1, -1, optionsLength - 1);
          } while (index !== optionIndex.value && (isOptionDisabled.value(props.options[index]) === true || searchRe.test(getOptionLabel.value(props.options[index])) !== true));
        }
        if (optionIndex.value !== index) {
          nextTick(() => {
            setOptionIndex(index);
            scrollTo(index);
            if (index >= 0 && props.useInput === true && props.fillInput === true) {
              setInputValue(getOptionLabel.value(props.options[index]), true);
            }
          });
        }
        return;
      }
      if (e.keyCode !== 13 && (e.keyCode !== 32 || props.useInput === true || searchBuffer !== "") && (e.keyCode !== 9 || tabShouldSelect === false)) return;
      e.keyCode !== 9 && stopAndPrevent(e);
      if (optionIndex.value !== -1 && optionIndex.value < optionsLength) {
        toggleOption(props.options[optionIndex.value]);
        return;
      }
      if (newValueModeValid === true) {
        const done = (val, mode) => {
          if (mode) {
            if (validateNewValueMode(mode) !== true) return;
          } else {
            mode = props.newValueMode;
          }
          updateInputValue("", props.multiple !== true, true);
          if (val === void 0 || val === null) return;
          const fn = mode === "toggle" ? toggleOption : add;
          fn(val, mode === "add-unique");
          if (props.multiple !== true) {
            targetRef.value?.focus();
            hidePopup();
          }
        };
        if (props.onNewValue !== void 0) {
          emit("newValue", inputValue.value, done);
        } else {
          done(inputValue.value);
        }
        if (props.multiple !== true) return;
      }
      if (menu.value === true) {
        closeMenu();
      } else if (state.innerLoading.value !== true) {
        showPopup();
      }
    }
    function getVirtualScrollEl() {
      return hasDialog === true ? menuContentRef.value : menuRef.value !== null && menuRef.value.contentEl !== null ? menuRef.value.contentEl : void 0;
    }
    function getVirtualScrollTarget() {
      return getVirtualScrollEl();
    }
    function getSelection() {
      if (props.hideSelected === true) {
        return [];
      }
      if (slots["selected-item"] !== void 0) {
        return selectedScope.value.map((scope) => slots["selected-item"](scope)).slice();
      }
      if (slots.selected !== void 0) {
        return [].concat(slots.selected());
      }
      if (props.useChips === true) {
        return selectedScope.value.map((scope, i) => h(QChip, {
          key: "option-" + i,
          removable: state.editable.value === true && isOptionDisabled.value(scope.opt) !== true,
          dense: true,
          textColor: props.color,
          tabindex: tabindex.value,
          onRemove() {
            scope.removeAtIndex(i);
          }
        }, () => h("span", {
          class: "ellipsis",
          [scope.html === true ? "innerHTML" : "textContent"]: getOptionLabel.value(scope.opt)
        })));
      }
      return [
        h("span", {
          class: "ellipsis",
          [valueAsHtml.value === true ? "innerHTML" : "textContent"]: ariaCurrentValue.value
        })
      ];
    }
    function getAllOptions() {
      if (noOptions.value === true) {
        return slots["no-option"] !== void 0 ? slots["no-option"]({ inputValue: inputValue.value }) : void 0;
      }
      const fn = slots.option !== void 0 ? slots.option : (scope) => {
        return h(QItem, {
          key: scope.index,
          ...scope.itemProps
        }, () => {
          return h(
            QItemSection,
            () => h(
              QItemLabel,
              () => h("span", {
                [scope.html === true ? "innerHTML" : "textContent"]: scope.label
              })
            )
          );
        });
      };
      let options = padVirtualScroll("div", optionScope.value.map(fn));
      if (slots["before-options"] !== void 0) {
        options = slots["before-options"]().concat(options);
      }
      return hMergeSlot(slots["after-options"], options);
    }
    function getInput(fromDialog, isTarget) {
      const attrs = isTarget === true ? { ...comboboxAttrs.value, ...state.splitAttrs.attributes.value } : void 0;
      const data = {
        ref: isTarget === true ? targetRef : void 0,
        key: "i_t",
        class: computedInputClass.value,
        style: props.inputStyle,
        value: inputValue.value !== void 0 ? inputValue.value : "",
        // required for Android in order to show ENTER key when in form
        type: "search",
        ...attrs,
        id: isTarget === true ? state.targetUid.value : void 0,
        maxlength: props.maxlength,
        autocomplete: props.autocomplete,
        "data-autofocus": fromDialog === true || props.autofocus === true || void 0,
        disabled: props.disable === true,
        readonly: props.readonly === true,
        ...inputControlEvents.value
      };
      if (fromDialog !== true && hasDialog === true) {
        if (Array.isArray(data.class) === true) {
          data.class = [...data.class, "no-pointer-events"];
        } else {
          data.class += " no-pointer-events";
        }
      }
      return h("input", data);
    }
    function onInput(e) {
      if (filterTimer !== null) {
        clearTimeout(filterTimer);
        filterTimer = null;
      }
      if (inputValueTimer !== null) {
        clearTimeout(inputValueTimer);
        inputValueTimer = null;
      }
      if (e && e.target && e.target.qComposing === true) return;
      setInputValue(e.target.value || "");
      userInputValue = true;
      defaultInputValue = inputValue.value;
      if (state.focused.value !== true && (hasDialog !== true || dialogFieldFocused.value === true)) {
        state.focus();
      }
      if (props.onFilter !== void 0) {
        filterTimer = setTimeout(() => {
          filterTimer = null;
          filter(inputValue.value);
        }, props.inputDebounce);
      }
    }
    function setInputValue(val, emitImmediately) {
      if (inputValue.value !== val) {
        inputValue.value = val;
        if (emitImmediately === true || props.inputDebounce === 0 || props.inputDebounce === "0") {
          emit("inputValue", val);
        } else {
          inputValueTimer = setTimeout(() => {
            inputValueTimer = null;
            emit("inputValue", val);
          }, props.inputDebounce);
        }
      }
    }
    function updateInputValue(val, noFiltering, internal) {
      userInputValue = internal !== true;
      if (props.useInput === true) {
        setInputValue(val, true);
        if (noFiltering === true || internal !== true) {
          defaultInputValue = val;
        }
        noFiltering !== true && filter(val);
      }
    }
    function filter(val, keepClosed, afterUpdateFn) {
      if (props.onFilter === void 0 || keepClosed !== true && state.focused.value !== true) return;
      if (state.innerLoading.value === true) {
        emit("filterAbort");
      } else {
        state.innerLoading.value = true;
        innerLoadingIndicator.value = true;
      }
      if (val !== "" && props.multiple !== true && innerValue.value.length !== 0 && userInputValue !== true && val === getOptionLabel.value(innerValue.value[0])) {
        val = "";
      }
      const localFilterId = setTimeout(() => {
        menu.value === true && (menu.value = false);
      }, 10);
      filterId !== null && clearTimeout(filterId);
      filterId = localFilterId;
      emit(
        "filter",
        val,
        (fn, afterFn) => {
          if ((keepClosed === true || state.focused.value === true) && filterId === localFilterId) {
            clearTimeout(filterId);
            typeof fn === "function" && fn();
            innerLoadingIndicator.value = false;
            nextTick(() => {
              state.innerLoading.value = false;
              if (state.editable.value === true) {
                if (keepClosed === true) {
                  menu.value === true && hidePopup();
                } else if (menu.value === true) {
                  updateMenu(true);
                } else {
                  menu.value = true;
                }
              }
              typeof afterFn === "function" && nextTick(() => {
                afterFn(proxy);
              });
              typeof afterUpdateFn === "function" && nextTick(() => {
                afterUpdateFn(proxy);
              });
            });
          }
        },
        () => {
          if (state.focused.value === true && filterId === localFilterId) {
            clearTimeout(filterId);
            state.innerLoading.value = false;
            innerLoadingIndicator.value = false;
          }
          menu.value === true && (menu.value = false);
        }
      );
    }
    function getMenu() {
      return h(QMenu, {
        ref: menuRef,
        class: menuContentClass.value,
        style: props.popupContentStyle,
        modelValue: menu.value,
        fit: props.menuShrink !== true,
        cover: props.optionsCover === true && noOptions.value !== true && props.useInput !== true,
        anchor: props.menuAnchor,
        self: props.menuSelf,
        offset: props.menuOffset,
        dark: isOptionsDark.value,
        noParentEvent: true,
        noRefocus: true,
        noFocus: true,
        noRouteDismiss: props.popupNoRouteDismiss,
        square: squaredMenu.value,
        transitionShow: props.transitionShow,
        transitionHide: props.transitionHide,
        transitionDuration: props.transitionDuration,
        separateClosePopup: true,
        ...listboxAttrs.value,
        onScrollPassive: onVirtualScrollEvt,
        onBeforeShow: onControlPopupShow,
        onBeforeHide: onMenuBeforeHide,
        onShow: onMenuShow
      }, getAllOptions);
    }
    function onMenuBeforeHide(e) {
      onControlPopupHide(e);
      closeMenu();
    }
    function onMenuShow() {
      setVirtualScrollSize();
    }
    function onDialogFieldFocus(e) {
      stop(e);
      targetRef.value?.focus();
      dialogFieldFocused.value = true;
      window.scrollTo(window.pageXOffset || window.scrollX || document.body.scrollLeft || 0, 0);
    }
    function onDialogFieldBlur(e) {
      stop(e);
      nextTick(() => {
        dialogFieldFocused.value = false;
      });
    }
    function getDialog() {
      const content = [
        h(QField, {
          class: `col-auto ${state.fieldClass.value}`,
          ...innerFieldProps.value,
          for: state.targetUid.value,
          dark: isOptionsDark.value,
          square: true,
          loading: innerLoadingIndicator.value,
          itemAligned: false,
          filled: true,
          stackLabel: inputValue.value.length !== 0,
          ...state.splitAttrs.listeners.value,
          onFocus: onDialogFieldFocus,
          onBlur: onDialogFieldBlur
        }, {
          ...slots,
          rawControl: () => state.getControl(true),
          before: void 0,
          after: void 0
        })
      ];
      menu.value === true && content.push(
        h("div", {
          ref: menuContentRef,
          class: menuContentClass.value + " scroll",
          style: props.popupContentStyle,
          ...listboxAttrs.value,
          onClick: prevent,
          onScrollPassive: onVirtualScrollEvt
        }, getAllOptions())
      );
      return h(QDialog, {
        ref: dialogRef,
        modelValue: dialog.value,
        position: props.useInput === true ? "top" : void 0,
        transitionShow: transitionShowComputed,
        transitionHide: props.transitionHide,
        transitionDuration: props.transitionDuration,
        noRouteDismiss: props.popupNoRouteDismiss,
        onBeforeShow: onControlPopupShow,
        onBeforeHide: onDialogBeforeHide,
        onHide: onDialogHide,
        onShow: onDialogShow
      }, () => h("div", {
        class: "q-select__dialog" + (isOptionsDark.value === true ? " q-select__dialog--dark q-dark" : "") + (dialogFieldFocused.value === true ? " q-select__dialog--focused" : "")
      }, content));
    }
    function onDialogBeforeHide(e) {
      onControlPopupHide(e);
      if (dialogRef.value !== null) {
        dialogRef.value.__updateRefocusTarget(
          state.rootRef.value.querySelector(".q-field__native > [tabindex]:last-child")
        );
      }
      state.focused.value = false;
    }
    function onDialogHide(e) {
      hidePopup();
      state.focused.value === false && emit("blur", e);
      resetInputValue();
    }
    function onDialogShow() {
      const el = document.activeElement;
      if ((el === null || el.id !== state.targetUid.value) && targetRef.value !== null && targetRef.value !== el) {
        targetRef.value.focus();
      }
      setVirtualScrollSize();
    }
    function closeMenu() {
      if (dialog.value === true) return;
      optionIndex.value = -1;
      if (menu.value === true) {
        menu.value = false;
      }
      if (state.focused.value === false) {
        if (filterId !== null) {
          clearTimeout(filterId);
          filterId = null;
        }
        if (state.innerLoading.value === true) {
          emit("filterAbort");
          state.innerLoading.value = false;
          innerLoadingIndicator.value = false;
        }
      }
    }
    function showPopup(e) {
      if (state.editable.value !== true) return;
      if (hasDialog === true) {
        state.onControlFocusin(e);
        dialog.value = true;
        nextTick(() => {
          state.focus();
        });
      } else {
        state.focus();
      }
      if (props.onFilter !== void 0) {
        filter(inputValue.value);
      } else if (noOptions.value !== true || slots["no-option"] !== void 0) {
        menu.value = true;
      }
    }
    function hidePopup() {
      dialog.value = false;
      closeMenu();
    }
    function resetInputValue() {
      props.useInput === true && updateInputValue(
        props.multiple !== true && props.fillInput === true && innerValue.value.length !== 0 ? getOptionLabel.value(innerValue.value[0]) || "" : "",
        true,
        true
      );
    }
    function updateMenu(show) {
      let optionIndex2 = -1;
      if (show === true) {
        if (innerValue.value.length !== 0) {
          const val = getOptionValue.value(innerValue.value[0]);
          optionIndex2 = props.options.findIndex((v) => isDeepEqual(getOptionValue.value(v), val));
        }
        localResetVirtualScroll(optionIndex2);
      }
      setOptionIndex(optionIndex2);
    }
    function rerenderMenu(newLength, oldLength) {
      if (menu.value === true && state.innerLoading.value === false) {
        localResetVirtualScroll(-1, true);
        nextTick(() => {
          if (menu.value === true && state.innerLoading.value === false) {
            if (newLength > oldLength) {
              localResetVirtualScroll();
            } else {
              updateMenu(true);
            }
          }
        });
      }
    }
    function updateMenuPosition() {
      if (dialog.value === false && menuRef.value !== null) {
        menuRef.value.updatePosition();
      }
    }
    function onControlPopupShow(e) {
      e !== void 0 && stop(e);
      emit("popupShow", e);
      state.hasPopupOpen = true;
      state.onControlFocusin(e);
    }
    function onControlPopupHide(e) {
      e !== void 0 && stop(e);
      emit("popupHide", e);
      state.hasPopupOpen = false;
      state.onControlFocusout(e);
    }
    function updatePreState() {
      hasDialog = $q.platform.is.mobile !== true && props.behavior !== "dialog" ? false : props.behavior !== "menu" && (props.useInput === true ? slots["no-option"] !== void 0 || props.onFilter !== void 0 || noOptions.value === false : true);
      transitionShowComputed = $q.platform.is.ios === true && hasDialog === true && props.useInput === true ? "fade" : props.transitionShow;
    }
    onBeforeUpdate(updatePreState);
    onUpdated(updateMenuPosition);
    updatePreState();
    onBeforeUnmount(() => {
      filterTimer !== null && clearTimeout(filterTimer);
      inputValueTimer !== null && clearTimeout(inputValueTimer);
    });
    Object.assign(proxy, {
      showPopup,
      hidePopup,
      removeAtIndex,
      add,
      toggleOption,
      getOptionIndex: () => optionIndex.value,
      setOptionIndex,
      moveOptionSelection,
      filter,
      updateMenuPosition,
      updateInputValue,
      isOptionSelected,
      getEmittingOptionValue,
      isOptionDisabled: (...args) => isOptionDisabled.value.apply(null, args) === true,
      getOptionValue: (...args) => getOptionValue.value.apply(null, args),
      getOptionLabel: (...args) => getOptionLabel.value.apply(null, args)
    });
    Object.assign(state, {
      innerValue,
      fieldClass: computed(
        () => `q-select q-field--auto-height q-select--with${props.useInput !== true ? "out" : ""}-input q-select--with${props.useChips !== true ? "out" : ""}-chips q-select--${props.multiple === true ? "multiple" : "single"}`
      ),
      inputRef,
      targetRef,
      hasValue,
      showPopup,
      floatingLabel: computed(
        () => props.hideSelected !== true && hasValue.value === true || typeof inputValue.value === "number" || inputValue.value.length !== 0 || fieldValueIsFilled(props.displayValue)
      ),
      getControlChild: () => {
        if (state.editable.value !== false && (dialog.value === true || noOptions.value !== true || slots["no-option"] !== void 0)) {
          return hasDialog === true ? getDialog() : getMenu();
        } else if (state.hasPopupOpen === true) {
          state.hasPopupOpen = false;
        }
      },
      controlEvents: {
        onFocusin(e) {
          state.onControlFocusin(e);
        },
        onFocusout(e) {
          state.onControlFocusout(e, () => {
            resetInputValue();
            closeMenu();
          });
        },
        onClick(e) {
          prevent(e);
          if (hasDialog !== true && menu.value === true) {
            closeMenu();
            targetRef.value?.focus();
            return;
          }
          showPopup(e);
        }
      },
      getControl: (fromDialog) => {
        const child = getSelection();
        const isTarget = fromDialog === true || dialog.value !== true || hasDialog !== true;
        if (props.useInput === true) {
          child.push(getInput(fromDialog, isTarget));
        } else if (state.editable.value === true) {
          const attrs2 = isTarget === true ? comboboxAttrs.value : void 0;
          child.push(
            h("input", {
              ref: isTarget === true ? targetRef : void 0,
              key: "d_t",
              class: "q-select__focus-target",
              id: isTarget === true ? state.targetUid.value : void 0,
              value: ariaCurrentValue.value,
              readonly: true,
              "data-autofocus": fromDialog === true || props.autofocus === true || void 0,
              ...attrs2,
              onKeydown: onTargetKeydown,
              onKeyup: onTargetKeyup,
              onKeypress: onTargetKeypress
            })
          );
          if (isTarget === true && typeof props.autocomplete === "string" && props.autocomplete.length !== 0) {
            child.push(
              h("input", {
                class: "q-select__autocomplete-input",
                autocomplete: props.autocomplete,
                tabindex: -1,
                onKeyup: onTargetAutocomplete
              })
            );
          }
        }
        if (nameProp.value !== void 0 && props.disable !== true && innerOptionsValue.value.length !== 0) {
          const opts = innerOptionsValue.value.map((value) => h("option", { value, selected: true }));
          child.push(
            h("select", {
              class: "hidden",
              name: nameProp.value,
              multiple: props.multiple
            }, opts)
          );
        }
        const attrs = props.useInput === true || isTarget !== true ? void 0 : state.splitAttrs.attributes.value;
        return h("div", {
          class: "q-field__native row items-center",
          ...attrs,
          ...state.splitAttrs.listeners.value
        }, child);
      },
      getInnerAppend: () => props.loading !== true && innerLoadingIndicator.value !== true && props.hideDropdownIcon !== true ? [
        h(QIcon, {
          class: "q-select__dropdown-icon" + (menu.value === true ? " rotate-180" : ""),
          name: dropdownArrowIcon.value
        })
      ] : null
    });
    return useField(state);
  }
});
const _sfc_main$1 = {
  name: "MoodSelector",
  setup() {
    const moodStore = useMoodStore();
    const selectedMood = ref(moodStore.currentMood ? moodStore.currentMood.name : "Neutral");
    console.log("[MoodSelector] Initial selectedMood:", selectedMood.value);
    console.log("[MoodSelector] moodOptions:", moodStore.moodOptions);
    watch(selectedMood, (newVal) => {
      console.log("[MoodSelector] selectedMood changed to:", newVal);
    });
    const onMoodChange = (mood) => {
      console.log("[MoodSelector] onMoodChange called with:", mood);
      const moodName = mood.value;
      console.log("[MoodSelector] Extracted moodName:", moodName);
      moodStore.setMood(moodName);
      console.log("[MoodSelector] moodStore.currentMood after setMood:", moodStore.currentMood);
    };
    return {
      selectedMood,
      moodOptions: moodStore.moodOptions,
      onMoodChange
    };
  }
};
const _hoisted_1$1 = { class: "mood-selector" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$1, [
    createVNode(QSelect, {
      modelValue: $setup.selectedMood,
      "onUpdate:modelValue": [
        _cache[0] || (_cache[0] = ($event) => $setup.selectedMood = $event),
        $setup.onMoodChange
      ],
      options: $setup.moodOptions,
      label: "Select Your Mood",
      behavior: "menu",
      rounded: "",
      filled: "",
      "popup-content-class": "popup-style-class",
      "bg-color": "secondary",
      "dropdown-icon": "img:icons/valenceblack.svg"
    }, null, 8, ["modelValue", "options", "onUpdate:modelValue"])
  ]);
}
const MoodSelector = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__file", "MoodSelector.vue"]]);
const _sfc_main = {
  __name: "MainLayout",
  setup(__props, { expose: __expose }) {
    __expose();
    onMounted(() => {
      document.addEventListener(
        "click",
        () => {
          const audioContext = new (window.AudioContext || window.webkitAudioContext)();
          audioContext.suspend();
        },
        { once: true }
      );
    });
    const __returned__ = { onMounted, MoodSelector };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1 = { class: "mood-selector-container" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_view = resolveComponent("router-view");
  return openBlock(), createBlock(QLayout, { view: "lHh Lpr lFf" }, {
    default: withCtx(() => [
      createVNode(QFooter, {
        reveal: "",
        elevated: "",
        class: normalizeClass(["header-style", "shadow-up-10"])
      }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1, [
            createVNode($setup["MoodSelector"])
          ]),
          createVNode(QToolbar, null, {
            default: withCtx(() => [
              createVNode(QToolbarTitle, { style: { "text-shadow": "1px 1px black" } }, {
                default: withCtx(() => _cache[0] || (_cache[0] = [
                  createBaseVNode("div", { class: "header-text" }, null, -1)
                ])),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(QPageContainer, null, {
        default: withCtx(() => [
          createVNode(_component_router_view)
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const MainLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "MainLayout.vue"]]);
export {
  MainLayout as default
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFpbkxheW91dC1fMHlaU0Y3WC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy90b29sYmFyL1FUb29sYmFyVGl0bGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3Rvb2xiYXIvUVRvb2xiYXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy91c2UtaHlkcmF0aW9uL3VzZS1oeWRyYXRpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3Jlc2l6ZS1vYnNlcnZlci9RUmVzaXplT2JzZXJ2ZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2Zvb3Rlci9RRm9vdGVyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9wYWdlL1FQYWdlQ29udGFpbmVyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvc2Nyb2xsL3Njcm9sbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvc2Nyb2xsLW9ic2VydmVyL1FTY3JvbGxPYnNlcnZlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvbGF5b3V0L1FMYXlvdXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy91aWQvdWlkLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvdXNlLWlkL3VzZS1pZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3VzZS1zcGxpdC1hdHRycy91c2Utc3BsaXQtYXR0cnMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy91c2UtZm9ybS91c2UtZm9ybS1jaGlsZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3BhdHRlcm5zL3BhdHRlcm5zLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtdmFsaWRhdGUvdXNlLXZhbGlkYXRlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvcHJpdmF0ZS5mb2N1cy9mb2N1cy1tYW5hZ2VyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtZmllbGQvdXNlLWZpZWxkLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9maWVsZC9RRmllbGQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2NoaXAvUUNoaXAuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2l0ZW0vUUl0ZW0uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2l0ZW0vUUl0ZW1TZWN0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9pdGVtL1FJdGVtTGFiZWwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9wcml2YXRlLnNlbGVjdGlvbi9zZWxlY3Rpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1hbmNob3IvdXNlLWFuY2hvci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLXNjcm9sbC10YXJnZXQvdXNlLXNjcm9sbC10YXJnZXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1tb2RlbC10b2dnbGUvdXNlLW1vZGVsLXRvZ2dsZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3ByaXZhdGUucG9ydGFsL3BvcnRhbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLXBvcnRhbC91c2UtcG9ydGFsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtdHJhbnNpdGlvbi91c2UtdHJhbnNpdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3VzZS10aWNrL3VzZS10aWNrLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvdXNlLXRpbWVvdXQvdXNlLXRpbWVvdXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9wcml2YXRlLmtleWJvYXJkL2VzY2FwZS1rZXkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9wcml2YXRlLmZvY3VzL2ZvY3Vzb3V0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvcHJpdmF0ZS5jbGljay1vdXRzaWRlL2NsaWNrLW91dHNpZGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9wcml2YXRlLnBvc2l0aW9uLWVuZ2luZS9wb3NpdGlvbi1lbmdpbmUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL21lbnUvUU1lbnUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1oaXN0b3J5L3VzZS1oaXN0b3J5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvc2Nyb2xsL3ByZXZlbnQtc2Nyb2xsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtcHJldmVudC1zY3JvbGwvdXNlLXByZXZlbnQtc2Nyb2xsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9kaWFsb2cvUURpYWxvZy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3ByaXZhdGUucnRsL3J0bC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvdmlydHVhbC1zY3JvbGwvdXNlLXZpcnR1YWwtc2Nyb2xsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS51c2Uta2V5LWNvbXBvc2l0aW9uL3VzZS1rZXktY29tcG9zaXRpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9mb3JtYXQvZm9ybWF0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9zZWxlY3QvUVNlbGVjdC5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL01vb2RTZWxlY3Rvci52dWUiLCIuLi8uLi8uLi9zcmMvbGF5b3V0cy9NYWluTGF5b3V0LnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoLCBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRVG9vbGJhclRpdGxlJyxcblxuICBwcm9wczoge1xuICAgIHNocmluazogQm9vbGVhblxuICB9LFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cyB9KSB7XG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS10b29sYmFyX190aXRsZSBlbGxpcHNpcydcbiAgICAgICsgKHByb3BzLnNocmluayA9PT0gdHJ1ZSA/ICcgY29sLXNocmluaycgOiAnJylcbiAgICApXG5cbiAgICByZXR1cm4gKCkgPT4gaCgnZGl2JywgeyBjbGFzczogY2xhc3Nlcy52YWx1ZSB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FUb29sYmFyJyxcblxuICBwcm9wczoge1xuICAgIGluc2V0OiBCb29sZWFuXG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLXRvb2xiYXIgcm93IG5vLXdyYXAgaXRlbXMtY2VudGVyJ1xuICAgICAgKyAocHJvcHMuaW5zZXQgPT09IHRydWUgPyAnIHEtdG9vbGJhci0taW5zZXQnIDogJycpXG4gICAgKVxuXG4gICAgcmV0dXJuICgpID0+IGgoJ2RpdicsIHsgY2xhc3M6IGNsYXNzZXMudmFsdWUsIHJvbGU6ICd0b29sYmFyJyB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgfVxufSlcbiIsImltcG9ydCB7IHJlZiwgb25Nb3VudGVkIH0gZnJvbSAndnVlJ1xuXG4vLyB1c2luZyBpdCB0byBtYW5hZ2UgU1NSIHJlbmRlcmluZyB3aXRoIGJlc3QgcGVyZm9ybWFuY2VcbmltcG9ydCB7IGlzUnVudGltZVNzclByZUh5ZHJhdGlvbiB9IGZyb20gJy4uLy4uL3BsdWdpbnMvcGxhdGZvcm0vUGxhdGZvcm0uanMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgaXNIeWRyYXRlZCA9IHJlZighaXNSdW50aW1lU3NyUHJlSHlkcmF0aW9uLnZhbHVlKVxuXG4gIGlmIChpc0h5ZHJhdGVkLnZhbHVlID09PSBmYWxzZSkge1xuICAgIG9uTW91bnRlZCgoKSA9PiB7XG4gICAgICBpc0h5ZHJhdGVkLnZhbHVlID0gdHJ1ZVxuICAgIH0pXG4gIH1cblxuICByZXR1cm4geyBpc0h5ZHJhdGVkIH1cbn1cbiIsImltcG9ydCB7IGgsIG9uTW91bnRlZCwgb25CZWZvcmVVbm1vdW50LCBnZXRDdXJyZW50SW5zdGFuY2UsIG5leHRUaWNrIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlSHlkcmF0aW9uIGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3VzZS1oeWRyYXRpb24vdXNlLWh5ZHJhdGlvbi5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgbGlzdGVuT3B0cywgbm9vcCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50L2V2ZW50LmpzJ1xuXG5jb25zdCBoYXNPYnNlcnZlciA9IHR5cGVvZiBSZXNpemVPYnNlcnZlciAhPT0gJ3VuZGVmaW5lZCdcbmNvbnN0IHJlc2l6ZVByb3BzID0gaGFzT2JzZXJ2ZXIgPT09IHRydWVcbiAgPyB7fVxuICA6IHtcbiAgICAgIHN0eWxlOiAnZGlzcGxheTpibG9jaztwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7cmlnaHQ6MDtib3R0b206MDtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlO292ZXJmbG93OmhpZGRlbjtwb2ludGVyLWV2ZW50czpub25lO3otaW5kZXg6LTE7JyxcbiAgICAgIHVybDogJ2Fib3V0OmJsYW5rJ1xuICAgIH1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FSZXNpemVPYnNlcnZlcicsXG5cbiAgcHJvcHM6IHtcbiAgICBkZWJvdW5jZToge1xuICAgICAgdHlwZTogWyBTdHJpbmcsIE51bWJlciBdLFxuICAgICAgZGVmYXVsdDogMTAwXG4gICAgfVxuICB9LFxuXG4gIGVtaXRzOiBbICdyZXNpemUnIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IGVtaXQgfSkge1xuICAgIGlmIChfX1FVQVNBUl9TU1JfU0VSVkVSX18pIHsgcmV0dXJuIG5vb3AgfVxuXG4gICAgbGV0IHRpbWVyID0gbnVsbCwgdGFyZ2V0RWwsIHNpemUgPSB7IHdpZHRoOiAtMSwgaGVpZ2h0OiAtMSB9XG5cbiAgICBmdW5jdGlvbiB0cmlnZ2VyIChpbW1lZGlhdGVseSkge1xuICAgICAgaWYgKGltbWVkaWF0ZWx5ID09PSB0cnVlIHx8IHByb3BzLmRlYm91bmNlID09PSAwIHx8IHByb3BzLmRlYm91bmNlID09PSAnMCcpIHtcbiAgICAgICAgZW1pdEV2ZW50KClcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHRpbWVyID09PSBudWxsKSB7XG4gICAgICAgIHRpbWVyID0gc2V0VGltZW91dChlbWl0RXZlbnQsIHByb3BzLmRlYm91bmNlKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVtaXRFdmVudCAoKSB7XG4gICAgICBpZiAodGltZXIgIT09IG51bGwpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgICAgICB0aW1lciA9IG51bGxcbiAgICAgIH1cblxuICAgICAgaWYgKHRhcmdldEVsKSB7XG4gICAgICAgIGNvbnN0IHsgb2Zmc2V0V2lkdGg6IHdpZHRoLCBvZmZzZXRIZWlnaHQ6IGhlaWdodCB9ID0gdGFyZ2V0RWxcblxuICAgICAgICBpZiAod2lkdGggIT09IHNpemUud2lkdGggfHwgaGVpZ2h0ICE9PSBzaXplLmhlaWdodCkge1xuICAgICAgICAgIHNpemUgPSB7IHdpZHRoLCBoZWlnaHQgfVxuICAgICAgICAgIGVtaXQoJ3Jlc2l6ZScsIHNpemUpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB7IHByb3h5IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gICAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RcbiAgICBwcm94eS50cmlnZ2VyID0gdHJpZ2dlclxuXG4gICAgaWYgKGhhc09ic2VydmVyID09PSB0cnVlKSB7XG4gICAgICBsZXQgb2JzZXJ2ZXJcblxuICAgICAgLy8gaW5pdGlhbGl6ZSBhcyBzb29uIGFzIHBvc3NpYmxlXG4gICAgICBjb25zdCBpbml0ID0gc3RvcCA9PiB7XG4gICAgICAgIHRhcmdldEVsID0gcHJveHkuJGVsLnBhcmVudE5vZGVcblxuICAgICAgICBpZiAodGFyZ2V0RWwpIHtcbiAgICAgICAgICBvYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcih0cmlnZ2VyKVxuICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUodGFyZ2V0RWwpXG4gICAgICAgICAgZW1pdEV2ZW50KClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzdG9wICE9PSB0cnVlKSB7XG4gICAgICAgICAgbmV4dFRpY2soKCkgPT4geyBpbml0KHRydWUpIH0pXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgb25Nb3VudGVkKCgpID0+IHsgaW5pdCgpIH0pXG5cbiAgICAgIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgICAgIHRpbWVyICE9PSBudWxsICYmIGNsZWFyVGltZW91dCh0aW1lcilcblxuICAgICAgICBpZiAob2JzZXJ2ZXIgIT09IHZvaWQgMCkge1xuICAgICAgICAgIGlmIChvYnNlcnZlci5kaXNjb25uZWN0ICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmICh0YXJnZXRFbCkgeyAvLyBGRiBmb3IgQW5kcm9pZFxuICAgICAgICAgICAgb2JzZXJ2ZXIudW5vYnNlcnZlKHRhcmdldEVsKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgcmV0dXJuIG5vb3BcbiAgICB9XG4gICAgZWxzZSB7IC8vIG5vIG9ic2VydmVyLCBzbyBmYWxsYmFjayB0byBvbGQgaWZyYW1lIG1ldGhvZFxuICAgICAgY29uc3QgeyBpc0h5ZHJhdGVkIH0gPSB1c2VIeWRyYXRpb24oKVxuXG4gICAgICBsZXQgY3VyRG9jVmlld1xuXG4gICAgICBmdW5jdGlvbiBjbGVhbnVwICgpIHtcbiAgICAgICAgaWYgKHRpbWVyICE9PSBudWxsKSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgICAgICAgIHRpbWVyID0gbnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGN1ckRvY1ZpZXcgIT09IHZvaWQgMCkge1xuICAgICAgICAgIC8vIGlPUyBpcyBmdXp6eSwgbmVlZCB0byBjaGVjayBpdCBmaXJzdFxuICAgICAgICAgIGlmIChjdXJEb2NWaWV3LnJlbW92ZUV2ZW50TGlzdGVuZXIgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgY3VyRG9jVmlldy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0cmlnZ2VyLCBsaXN0ZW5PcHRzLnBhc3NpdmUpXG4gICAgICAgICAgfVxuICAgICAgICAgIGN1ckRvY1ZpZXcgPSB2b2lkIDBcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBvbk9iakxvYWQgKCkge1xuICAgICAgICBjbGVhbnVwKClcblxuICAgICAgICBpZiAodGFyZ2V0RWw/LmNvbnRlbnREb2N1bWVudCkge1xuICAgICAgICAgIGN1ckRvY1ZpZXcgPSB0YXJnZXRFbC5jb250ZW50RG9jdW1lbnQuZGVmYXVsdFZpZXdcbiAgICAgICAgICBjdXJEb2NWaWV3LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRyaWdnZXIsIGxpc3Rlbk9wdHMucGFzc2l2ZSlcbiAgICAgICAgICBlbWl0RXZlbnQoKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG9uTW91bnRlZCgoKSA9PiB7XG4gICAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICB0YXJnZXRFbCA9IHByb3h5LiRlbFxuICAgICAgICAgIHRhcmdldEVsICYmIG9uT2JqTG9hZCgpXG4gICAgICAgIH0pXG4gICAgICB9KVxuXG4gICAgICBvbkJlZm9yZVVubW91bnQoY2xlYW51cClcblxuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgaWYgKGlzSHlkcmF0ZWQudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICByZXR1cm4gaCgnb2JqZWN0Jywge1xuICAgICAgICAgICAgY2xhc3M6ICdxLS1hdm9pZC1jYXJkLWJvcmRlcicsXG4gICAgICAgICAgICBzdHlsZTogcmVzaXplUHJvcHMuc3R5bGUsXG4gICAgICAgICAgICB0YWJpbmRleDogLTEsIC8vIGZpeCBmb3IgRmlyZWZveFxuICAgICAgICAgICAgdHlwZTogJ3RleHQvaHRtbCcsXG4gICAgICAgICAgICBkYXRhOiByZXNpemVQcm9wcy51cmwsXG4gICAgICAgICAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZScsXG4gICAgICAgICAgICBvbkxvYWQ6IG9uT2JqTG9hZFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCB3YXRjaCwgb25CZWZvcmVVbm1vdW50LCBpbmplY3QsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgaXNSdW50aW1lU3NyUHJlSHlkcmF0aW9uIH0gZnJvbSAnLi4vLi4vcGx1Z2lucy9wbGF0Zm9ybS9QbGF0Zm9ybS5qcydcblxuaW1wb3J0IFFSZXNpemVPYnNlcnZlciBmcm9tICcuLi9yZXNpemUtb2JzZXJ2ZXIvUVJlc2l6ZU9ic2VydmVyLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoTWVyZ2VTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5yZW5kZXIvcmVuZGVyLmpzJ1xuaW1wb3J0IHsgbGF5b3V0S2V5LCBlbXB0eVJlbmRlckZuIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5zeW1ib2xzL3N5bWJvbHMuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRRm9vdGVyJyxcblxuICBwcm9wczoge1xuICAgIG1vZGVsVmFsdWU6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiB0cnVlXG4gICAgfSxcbiAgICByZXZlYWw6IEJvb2xlYW4sXG4gICAgYm9yZGVyZWQ6IEJvb2xlYW4sXG4gICAgZWxldmF0ZWQ6IEJvb2xlYW4sXG5cbiAgICBoZWlnaHRIaW50OiB7XG4gICAgICB0eXBlOiBbIFN0cmluZywgTnVtYmVyIF0sXG4gICAgICBkZWZhdWx0OiA1MFxuICAgIH1cbiAgfSxcblxuICBlbWl0czogWyAncmV2ZWFsJywgJ2ZvY3VzaW4nIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0IH0pIHtcbiAgICBjb25zdCB7IHByb3h5OiB7ICRxIH0gfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgICBjb25zdCAkbGF5b3V0ID0gaW5qZWN0KGxheW91dEtleSwgZW1wdHlSZW5kZXJGbilcbiAgICBpZiAoJGxheW91dCA9PT0gZW1wdHlSZW5kZXJGbikge1xuICAgICAgY29uc29sZS5lcnJvcignUUZvb3RlciBuZWVkcyB0byBiZSBjaGlsZCBvZiBRTGF5b3V0JylcbiAgICAgIHJldHVybiBlbXB0eVJlbmRlckZuXG4gICAgfVxuXG4gICAgY29uc3Qgc2l6ZSA9IHJlZihwYXJzZUludChwcm9wcy5oZWlnaHRIaW50LCAxMCkpXG4gICAgY29uc3QgcmV2ZWFsZWQgPSByZWYodHJ1ZSlcbiAgICBjb25zdCB3aW5kb3dIZWlnaHQgPSByZWYoXG4gICAgICBpc1J1bnRpbWVTc3JQcmVIeWRyYXRpb24udmFsdWUgPT09IHRydWUgfHwgJGxheW91dC5pc0NvbnRhaW5lci52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICA/IDBcbiAgICAgICAgOiB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgICApXG5cbiAgICBjb25zdCBmaXhlZCA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5yZXZlYWwgPT09IHRydWVcbiAgICAgIHx8ICRsYXlvdXQudmlldy52YWx1ZS5pbmRleE9mKCdGJykgIT09IC0xXG4gICAgICB8fCAoJHEucGxhdGZvcm0uaXMuaW9zICYmICRsYXlvdXQuaXNDb250YWluZXIudmFsdWUgPT09IHRydWUpXG4gICAgKVxuXG4gICAgY29uc3QgY29udGFpbmVySGVpZ2h0ID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgJGxheW91dC5pc0NvbnRhaW5lci52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICA/ICRsYXlvdXQuY29udGFpbmVySGVpZ2h0LnZhbHVlXG4gICAgICAgIDogd2luZG93SGVpZ2h0LnZhbHVlXG4gICAgKSlcblxuICAgIGNvbnN0IG9mZnNldCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGlmIChwcm9wcy5tb2RlbFZhbHVlICE9PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiAwXG4gICAgICB9XG4gICAgICBpZiAoZml4ZWQudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIHJldmVhbGVkLnZhbHVlID09PSB0cnVlID8gc2l6ZS52YWx1ZSA6IDBcbiAgICAgIH1cbiAgICAgIGNvbnN0IG9mZnNldCA9ICRsYXlvdXQuc2Nyb2xsLnZhbHVlLnBvc2l0aW9uICsgY29udGFpbmVySGVpZ2h0LnZhbHVlICsgc2l6ZS52YWx1ZSAtICRsYXlvdXQuaGVpZ2h0LnZhbHVlXG4gICAgICByZXR1cm4gb2Zmc2V0ID4gMCA/IG9mZnNldCA6IDBcbiAgICB9KVxuXG4gICAgY29uc3QgaGlkZGVuID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLm1vZGVsVmFsdWUgIT09IHRydWUgfHwgKGZpeGVkLnZhbHVlID09PSB0cnVlICYmIHJldmVhbGVkLnZhbHVlICE9PSB0cnVlKVxuICAgIClcblxuICAgIGNvbnN0IHJldmVhbE9uRm9jdXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMubW9kZWxWYWx1ZSA9PT0gdHJ1ZSAmJiBoaWRkZW4udmFsdWUgPT09IHRydWUgJiYgcHJvcHMucmV2ZWFsID09PSB0cnVlXG4gICAgKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1mb290ZXIgcS1sYXlvdXRfX3NlY3Rpb24tLW1hcmdpbmFsICdcbiAgICAgICsgKGZpeGVkLnZhbHVlID09PSB0cnVlID8gJ2ZpeGVkJyA6ICdhYnNvbHV0ZScpICsgJy1ib3R0b20nXG4gICAgICArIChwcm9wcy5ib3JkZXJlZCA9PT0gdHJ1ZSA/ICcgcS1mb290ZXItLWJvcmRlcmVkJyA6ICcnKVxuICAgICAgKyAoaGlkZGVuLnZhbHVlID09PSB0cnVlID8gJyBxLWZvb3Rlci0taGlkZGVuJyA6ICcnKVxuICAgICAgKyAoXG4gICAgICAgIHByb3BzLm1vZGVsVmFsdWUgIT09IHRydWVcbiAgICAgICAgICA/ICcgcS1sYXlvdXQtLXByZXZlbnQtZm9jdXMnICsgKGZpeGVkLnZhbHVlICE9PSB0cnVlID8gJyBoaWRkZW4nIDogJycpXG4gICAgICAgICAgOiAnJ1xuICAgICAgKVxuICAgIClcblxuICAgIGNvbnN0IHN0eWxlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3RcbiAgICAgICAgdmlldyA9ICRsYXlvdXQucm93cy52YWx1ZS5ib3R0b20sXG4gICAgICAgIGNzcyA9IHt9XG5cbiAgICAgIGlmICh2aWV3WyAwIF0gPT09ICdsJyAmJiAkbGF5b3V0LmxlZnQuc3BhY2UgPT09IHRydWUpIHtcbiAgICAgICAgY3NzWyAkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/ICdyaWdodCcgOiAnbGVmdCcgXSA9IGAkeyAkbGF5b3V0LmxlZnQuc2l6ZSB9cHhgXG4gICAgICB9XG4gICAgICBpZiAodmlld1sgMiBdID09PSAncicgJiYgJGxheW91dC5yaWdodC5zcGFjZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjc3NbICRxLmxhbmcucnRsID09PSB0cnVlID8gJ2xlZnQnIDogJ3JpZ2h0JyBdID0gYCR7ICRsYXlvdXQucmlnaHQuc2l6ZSB9cHhgXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjc3NcbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlTGF5b3V0IChwcm9wLCB2YWwpIHtcbiAgICAgICRsYXlvdXQudXBkYXRlKCdmb290ZXInLCBwcm9wLCB2YWwpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlTG9jYWwgKHByb3AsIHZhbCkge1xuICAgICAgaWYgKHByb3AudmFsdWUgIT09IHZhbCkge1xuICAgICAgICBwcm9wLnZhbHVlID0gdmFsXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25SZXNpemUgKHsgaGVpZ2h0IH0pIHtcbiAgICAgIHVwZGF0ZUxvY2FsKHNpemUsIGhlaWdodClcbiAgICAgIHVwZGF0ZUxheW91dCgnc2l6ZScsIGhlaWdodClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVSZXZlYWxlZCAoKSB7XG4gICAgICBpZiAocHJvcHMucmV2ZWFsICE9PSB0cnVlKSByZXR1cm5cblxuICAgICAgY29uc3QgeyBkaXJlY3Rpb24sIHBvc2l0aW9uLCBpbmZsZWN0aW9uUG9pbnQgfSA9ICRsYXlvdXQuc2Nyb2xsLnZhbHVlXG5cbiAgICAgIHVwZGF0ZUxvY2FsKHJldmVhbGVkLCAoXG4gICAgICAgIGRpcmVjdGlvbiA9PT0gJ3VwJ1xuICAgICAgICB8fCBwb3NpdGlvbiAtIGluZmxlY3Rpb25Qb2ludCA8IDEwMFxuICAgICAgICB8fCAkbGF5b3V0LmhlaWdodC52YWx1ZSAtIGNvbnRhaW5lckhlaWdodC52YWx1ZSAtIHBvc2l0aW9uIC0gc2l6ZS52YWx1ZSA8IDMwMFxuICAgICAgKSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkZvY3VzaW4gKGV2dCkge1xuICAgICAgaWYgKHJldmVhbE9uRm9jdXMudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgdXBkYXRlTG9jYWwocmV2ZWFsZWQsIHRydWUpXG4gICAgICB9XG5cbiAgICAgIGVtaXQoJ2ZvY3VzaW4nLCBldnQpXG4gICAgfVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMubW9kZWxWYWx1ZSwgdmFsID0+IHtcbiAgICAgIHVwZGF0ZUxheW91dCgnc3BhY2UnLCB2YWwpXG4gICAgICB1cGRhdGVMb2NhbChyZXZlYWxlZCwgdHJ1ZSlcbiAgICAgICRsYXlvdXQuYW5pbWF0ZSgpXG4gICAgfSlcblxuICAgIHdhdGNoKG9mZnNldCwgdmFsID0+IHtcbiAgICAgIHVwZGF0ZUxheW91dCgnb2Zmc2V0JywgdmFsKVxuICAgIH0pXG5cbiAgICB3YXRjaCgoKSA9PiBwcm9wcy5yZXZlYWwsIHZhbCA9PiB7XG4gICAgICB2YWwgPT09IGZhbHNlICYmIHVwZGF0ZUxvY2FsKHJldmVhbGVkLCBwcm9wcy5tb2RlbFZhbHVlKVxuICAgIH0pXG5cbiAgICB3YXRjaChyZXZlYWxlZCwgdmFsID0+IHtcbiAgICAgICRsYXlvdXQuYW5pbWF0ZSgpXG4gICAgICBlbWl0KCdyZXZlYWwnLCB2YWwpXG4gICAgfSlcblxuICAgIHdhdGNoKFsgc2l6ZSwgJGxheW91dC5zY3JvbGwsICRsYXlvdXQuaGVpZ2h0IF0sIHVwZGF0ZVJldmVhbGVkKVxuXG4gICAgd2F0Y2goKCkgPT4gJHEuc2NyZWVuLmhlaWdodCwgdmFsID0+IHtcbiAgICAgICRsYXlvdXQuaXNDb250YWluZXIudmFsdWUgIT09IHRydWUgJiYgdXBkYXRlTG9jYWwod2luZG93SGVpZ2h0LCB2YWwpXG4gICAgfSlcblxuICAgIGNvbnN0IGluc3RhbmNlID0ge31cblxuICAgICRsYXlvdXQuaW5zdGFuY2VzLmZvb3RlciA9IGluc3RhbmNlXG4gICAgcHJvcHMubW9kZWxWYWx1ZSA9PT0gdHJ1ZSAmJiB1cGRhdGVMYXlvdXQoJ3NpemUnLCBzaXplLnZhbHVlKVxuICAgIHVwZGF0ZUxheW91dCgnc3BhY2UnLCBwcm9wcy5tb2RlbFZhbHVlKVxuICAgIHVwZGF0ZUxheW91dCgnb2Zmc2V0Jywgb2Zmc2V0LnZhbHVlKVxuXG4gICAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICAgIGlmICgkbGF5b3V0Lmluc3RhbmNlcy5mb290ZXIgPT09IGluc3RhbmNlKSB7XG4gICAgICAgICRsYXlvdXQuaW5zdGFuY2VzLmZvb3RlciA9IHZvaWQgMFxuICAgICAgICB1cGRhdGVMYXlvdXQoJ3NpemUnLCAwKVxuICAgICAgICB1cGRhdGVMYXlvdXQoJ29mZnNldCcsIDApXG4gICAgICAgIHVwZGF0ZUxheW91dCgnc3BhY2UnLCBmYWxzZSlcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNvbnN0IGNoaWxkID0gaE1lcmdlU2xvdChzbG90cy5kZWZhdWx0LCBbXG4gICAgICAgIGgoUVJlc2l6ZU9ic2VydmVyLCB7XG4gICAgICAgICAgZGVib3VuY2U6IDAsXG4gICAgICAgICAgb25SZXNpemVcbiAgICAgICAgfSlcbiAgICAgIF0pXG5cbiAgICAgIHByb3BzLmVsZXZhdGVkID09PSB0cnVlICYmIGNoaWxkLnB1c2goXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogJ3EtbGF5b3V0X19zaGFkb3cgYWJzb2x1dGUtZnVsbCBvdmVyZmxvdy1oaWRkZW4gbm8tcG9pbnRlci1ldmVudHMnXG4gICAgICAgIH0pXG4gICAgICApXG5cbiAgICAgIHJldHVybiBoKCdmb290ZXInLCB7XG4gICAgICAgIGNsYXNzOiBjbGFzc2VzLnZhbHVlLFxuICAgICAgICBzdHlsZTogc3R5bGUudmFsdWUsXG4gICAgICAgIG9uRm9jdXNpblxuICAgICAgfSwgY2hpbGQpXG4gICAgfVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQsIHByb3ZpZGUsIGluamVjdCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcbmltcG9ydCB7IHBhZ2VDb250YWluZXJLZXksIGxheW91dEtleSwgZW1wdHlSZW5kZXJGbiB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuc3ltYm9scy9zeW1ib2xzLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVBhZ2VDb250YWluZXInLFxuXG4gIHNldHVwIChfLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCB7IHByb3h5OiB7ICRxIH0gfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgICBjb25zdCAkbGF5b3V0ID0gaW5qZWN0KGxheW91dEtleSwgZW1wdHlSZW5kZXJGbilcbiAgICBpZiAoJGxheW91dCA9PT0gZW1wdHlSZW5kZXJGbikge1xuICAgICAgY29uc29sZS5lcnJvcignUVBhZ2VDb250YWluZXIgbmVlZHMgdG8gYmUgY2hpbGQgb2YgUUxheW91dCcpXG4gICAgICByZXR1cm4gZW1wdHlSZW5kZXJGblxuICAgIH1cblxuICAgIHByb3ZpZGUocGFnZUNvbnRhaW5lcktleSwgdHJ1ZSlcblxuICAgIGNvbnN0IHN0eWxlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgY3NzID0ge31cblxuICAgICAgaWYgKCRsYXlvdXQuaGVhZGVyLnNwYWNlID09PSB0cnVlKSB7XG4gICAgICAgIGNzcy5wYWRkaW5nVG9wID0gYCR7ICRsYXlvdXQuaGVhZGVyLnNpemUgfXB4YFxuICAgICAgfVxuICAgICAgaWYgKCRsYXlvdXQucmlnaHQuc3BhY2UgPT09IHRydWUpIHtcbiAgICAgICAgY3NzWyBgcGFkZGluZyR7ICRxLmxhbmcucnRsID09PSB0cnVlID8gJ0xlZnQnIDogJ1JpZ2h0JyB9YCBdID0gYCR7ICRsYXlvdXQucmlnaHQuc2l6ZSB9cHhgXG4gICAgICB9XG4gICAgICBpZiAoJGxheW91dC5mb290ZXIuc3BhY2UgPT09IHRydWUpIHtcbiAgICAgICAgY3NzLnBhZGRpbmdCb3R0b20gPSBgJHsgJGxheW91dC5mb290ZXIuc2l6ZSB9cHhgXG4gICAgICB9XG4gICAgICBpZiAoJGxheW91dC5sZWZ0LnNwYWNlID09PSB0cnVlKSB7XG4gICAgICAgIGNzc1sgYHBhZGRpbmckeyAkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/ICdSaWdodCcgOiAnTGVmdCcgfWAgXSA9IGAkeyAkbGF5b3V0LmxlZnQuc2l6ZSB9cHhgXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjc3NcbiAgICB9KVxuXG4gICAgcmV0dXJuICgpID0+IGgoJ2RpdicsIHtcbiAgICAgIGNsYXNzOiAncS1wYWdlLWNvbnRhaW5lcicsXG4gICAgICBzdHlsZTogc3R5bGUudmFsdWVcbiAgICB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgfVxufSlcbiIsImltcG9ydCB7IGNzcywgZ2V0RWxlbWVudCB9IGZyb20gJy4uL2RvbS9kb20uanMnXG5cbmV4cG9ydCBjb25zdCBzY3JvbGxUYXJnZXRQcm9wID0gX19RVUFTQVJfU1NSX1NFUlZFUl9fXG4gID8ge30gLyogU1NSIGRvZXMgbm90IGtub3cgYWJvdXQgRWxlbWVudCAqL1xuICA6IFsgRWxlbWVudCwgU3RyaW5nIF1cblxuY29uc3Qgc2Nyb2xsVGFyZ2V0cyA9IF9fUVVBU0FSX1NTUl9TRVJWRVJfX1xuICA/IFtdXG4gIDogWyBudWxsLCBkb2N1bWVudCwgZG9jdW1lbnQuYm9keSwgZG9jdW1lbnQuc2Nyb2xsaW5nRWxlbWVudCwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IF1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNjcm9sbFRhcmdldCAoZWwsIHRhcmdldEVsKSB7XG4gIGxldCB0YXJnZXQgPSBnZXRFbGVtZW50KHRhcmdldEVsKVxuXG4gIGlmICh0YXJnZXQgPT09IHZvaWQgMCkge1xuICAgIGlmIChlbCA9PT0gdm9pZCAwIHx8IGVsID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gd2luZG93XG4gICAgfVxuXG4gICAgdGFyZ2V0ID0gZWwuY2xvc2VzdCgnLnNjcm9sbCwuc2Nyb2xsLXksLm92ZXJmbG93LWF1dG8nKVxuICB9XG5cbiAgcmV0dXJuIHNjcm9sbFRhcmdldHMuaW5jbHVkZXModGFyZ2V0KVxuICAgID8gd2luZG93XG4gICAgOiB0YXJnZXRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNjcm9sbEhlaWdodCAoZWwpIHtcbiAgcmV0dXJuIChlbCA9PT0gd2luZG93ID8gZG9jdW1lbnQuYm9keSA6IGVsKS5zY3JvbGxIZWlnaHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNjcm9sbFdpZHRoIChlbCkge1xuICByZXR1cm4gKGVsID09PSB3aW5kb3cgPyBkb2N1bWVudC5ib2R5IDogZWwpLnNjcm9sbFdpZHRoXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRWZXJ0aWNhbFNjcm9sbFBvc2l0aW9uIChzY3JvbGxUYXJnZXQpIHtcbiAgcmV0dXJuIHNjcm9sbFRhcmdldCA9PT0gd2luZG93XG4gICAgPyB3aW5kb3cucGFnZVlPZmZzZXQgfHwgd2luZG93LnNjcm9sbFkgfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgfHwgMFxuICAgIDogc2Nyb2xsVGFyZ2V0LnNjcm9sbFRvcFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SG9yaXpvbnRhbFNjcm9sbFBvc2l0aW9uIChzY3JvbGxUYXJnZXQpIHtcbiAgcmV0dXJuIHNjcm9sbFRhcmdldCA9PT0gd2luZG93XG4gICAgPyB3aW5kb3cucGFnZVhPZmZzZXQgfHwgd2luZG93LnNjcm9sbFggfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0IHx8IDBcbiAgICA6IHNjcm9sbFRhcmdldC5zY3JvbGxMZWZ0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhbmltVmVydGljYWxTY3JvbGxUbyAoZWwsIHRvLCBkdXJhdGlvbiA9IDAgLyogLCBwcmV2VGltZSAqLykge1xuICBjb25zdCBwcmV2VGltZSA9IGFyZ3VtZW50c1sgMyBdID09PSB2b2lkIDAgPyBwZXJmb3JtYW5jZS5ub3coKSA6IGFyZ3VtZW50c1sgMyBdXG4gIGNvbnN0IHBvcyA9IGdldFZlcnRpY2FsU2Nyb2xsUG9zaXRpb24oZWwpXG5cbiAgaWYgKGR1cmF0aW9uIDw9IDApIHtcbiAgICBpZiAocG9zICE9PSB0bykge1xuICAgICAgc2V0U2Nyb2xsKGVsLCB0bylcbiAgICB9XG4gICAgcmV0dXJuXG4gIH1cblxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobm93VGltZSA9PiB7XG4gICAgY29uc3QgZnJhbWVUaW1lID0gbm93VGltZSAtIHByZXZUaW1lXG4gICAgY29uc3QgbmV3UG9zID0gcG9zICsgKHRvIC0gcG9zKSAvIE1hdGgubWF4KGZyYW1lVGltZSwgZHVyYXRpb24pICogZnJhbWVUaW1lXG4gICAgc2V0U2Nyb2xsKGVsLCBuZXdQb3MpXG4gICAgaWYgKG5ld1BvcyAhPT0gdG8pIHtcbiAgICAgIGFuaW1WZXJ0aWNhbFNjcm9sbFRvKGVsLCB0bywgZHVyYXRpb24gLSBmcmFtZVRpbWUsIG5vd1RpbWUpXG4gICAgfVxuICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYW5pbUhvcml6b250YWxTY3JvbGxUbyAoZWwsIHRvLCBkdXJhdGlvbiA9IDAgLyogLCBwcmV2VGltZSAqLykge1xuICBjb25zdCBwcmV2VGltZSA9IGFyZ3VtZW50c1sgMyBdID09PSB2b2lkIDAgPyBwZXJmb3JtYW5jZS5ub3coKSA6IGFyZ3VtZW50c1sgMyBdXG4gIGNvbnN0IHBvcyA9IGdldEhvcml6b250YWxTY3JvbGxQb3NpdGlvbihlbClcblxuICBpZiAoZHVyYXRpb24gPD0gMCkge1xuICAgIGlmIChwb3MgIT09IHRvKSB7XG4gICAgICBzZXRIb3Jpem9udGFsU2Nyb2xsKGVsLCB0bylcbiAgICB9XG4gICAgcmV0dXJuXG4gIH1cblxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobm93VGltZSA9PiB7XG4gICAgY29uc3QgZnJhbWVUaW1lID0gbm93VGltZSAtIHByZXZUaW1lXG4gICAgY29uc3QgbmV3UG9zID0gcG9zICsgKHRvIC0gcG9zKSAvIE1hdGgubWF4KGZyYW1lVGltZSwgZHVyYXRpb24pICogZnJhbWVUaW1lXG4gICAgc2V0SG9yaXpvbnRhbFNjcm9sbChlbCwgbmV3UG9zKVxuICAgIGlmIChuZXdQb3MgIT09IHRvKSB7XG4gICAgICBhbmltSG9yaXpvbnRhbFNjcm9sbFRvKGVsLCB0bywgZHVyYXRpb24gLSBmcmFtZVRpbWUsIG5vd1RpbWUpXG4gICAgfVxuICB9KVxufVxuXG5mdW5jdGlvbiBzZXRTY3JvbGwgKHNjcm9sbFRhcmdldCwgb2Zmc2V0KSB7XG4gIGlmIChzY3JvbGxUYXJnZXQgPT09IHdpbmRvdykge1xuICAgIHdpbmRvdy5zY3JvbGxUbyh3aW5kb3cucGFnZVhPZmZzZXQgfHwgd2luZG93LnNjcm9sbFggfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0IHx8IDAsIG9mZnNldClcbiAgICByZXR1cm5cbiAgfVxuICBzY3JvbGxUYXJnZXQuc2Nyb2xsVG9wID0gb2Zmc2V0XG59XG5cbmZ1bmN0aW9uIHNldEhvcml6b250YWxTY3JvbGwgKHNjcm9sbFRhcmdldCwgb2Zmc2V0KSB7XG4gIGlmIChzY3JvbGxUYXJnZXQgPT09IHdpbmRvdykge1xuICAgIHdpbmRvdy5zY3JvbGxUbyhvZmZzZXQsIHdpbmRvdy5wYWdlWU9mZnNldCB8fCB3aW5kb3cuc2Nyb2xsWSB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCB8fCAwKVxuICAgIHJldHVyblxuICB9XG4gIHNjcm9sbFRhcmdldC5zY3JvbGxMZWZ0ID0gb2Zmc2V0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRWZXJ0aWNhbFNjcm9sbFBvc2l0aW9uIChzY3JvbGxUYXJnZXQsIG9mZnNldCwgZHVyYXRpb24pIHtcbiAgaWYgKGR1cmF0aW9uKSB7XG4gICAgYW5pbVZlcnRpY2FsU2Nyb2xsVG8oc2Nyb2xsVGFyZ2V0LCBvZmZzZXQsIGR1cmF0aW9uKVxuICAgIHJldHVyblxuICB9XG4gIHNldFNjcm9sbChzY3JvbGxUYXJnZXQsIG9mZnNldClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEhvcml6b250YWxTY3JvbGxQb3NpdGlvbiAoc2Nyb2xsVGFyZ2V0LCBvZmZzZXQsIGR1cmF0aW9uKSB7XG4gIGlmIChkdXJhdGlvbikge1xuICAgIGFuaW1Ib3Jpem9udGFsU2Nyb2xsVG8oc2Nyb2xsVGFyZ2V0LCBvZmZzZXQsIGR1cmF0aW9uKVxuICAgIHJldHVyblxuICB9XG4gIHNldEhvcml6b250YWxTY3JvbGwoc2Nyb2xsVGFyZ2V0LCBvZmZzZXQpXG59XG5cbmxldCBzaXplXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2Nyb2xsYmFyV2lkdGggKCkge1xuICBpZiAoc2l6ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHNpemVcbiAgfVxuXG4gIGNvbnN0XG4gICAgaW5uZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyksXG4gICAgb3V0ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXG4gIGNzcyhpbm5lciwge1xuICAgIHdpZHRoOiAnMTAwJScsXG4gICAgaGVpZ2h0OiAnMjAwcHgnXG4gIH0pXG4gIGNzcyhvdXRlciwge1xuICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgIHRvcDogJzBweCcsXG4gICAgbGVmdDogJzBweCcsXG4gICAgdmlzaWJpbGl0eTogJ2hpZGRlbicsXG4gICAgd2lkdGg6ICcyMDBweCcsXG4gICAgaGVpZ2h0OiAnMTUwcHgnLFxuICAgIG92ZXJmbG93OiAnaGlkZGVuJ1xuICB9KVxuXG4gIG91dGVyLmFwcGVuZENoaWxkKGlubmVyKVxuXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQob3V0ZXIpXG5cbiAgY29uc3QgdzEgPSBpbm5lci5vZmZzZXRXaWR0aFxuICBvdXRlci5zdHlsZS5vdmVyZmxvdyA9ICdzY3JvbGwnXG4gIGxldCB3MiA9IGlubmVyLm9mZnNldFdpZHRoXG5cbiAgaWYgKHcxID09PSB3Mikge1xuICAgIHcyID0gb3V0ZXIuY2xpZW50V2lkdGhcbiAgfVxuXG4gIG91dGVyLnJlbW92ZSgpXG4gIHNpemUgPSB3MSAtIHcyXG5cbiAgcmV0dXJuIHNpemVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc1Njcm9sbGJhciAoZWwsIG9uWSA9IHRydWUpIHtcbiAgaWYgKCFlbCB8fCBlbC5ub2RlVHlwZSAhPT0gTm9kZS5FTEVNRU5UX05PREUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHJldHVybiBvbllcbiAgICA/IChcbiAgICAgICAgZWwuc2Nyb2xsSGVpZ2h0ID4gZWwuY2xpZW50SGVpZ2h0ICYmIChcbiAgICAgICAgICBlbC5jbGFzc0xpc3QuY29udGFpbnMoJ3Njcm9sbCcpXG4gICAgICAgICAgfHwgZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdvdmVyZmxvdy1hdXRvJylcbiAgICAgICAgICB8fCBbICdhdXRvJywgJ3Njcm9sbCcgXS5pbmNsdWRlcyh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbClbICdvdmVyZmxvdy15JyBdKVxuICAgICAgICApXG4gICAgICApXG4gICAgOiAoXG4gICAgICAgIGVsLnNjcm9sbFdpZHRoID4gZWwuY2xpZW50V2lkdGggJiYgKFxuICAgICAgICAgIGVsLmNsYXNzTGlzdC5jb250YWlucygnc2Nyb2xsJylcbiAgICAgICAgICB8fCBlbC5jbGFzc0xpc3QuY29udGFpbnMoJ292ZXJmbG93LWF1dG8nKVxuICAgICAgICAgIHx8IFsgJ2F1dG8nLCAnc2Nyb2xsJyBdLmluY2x1ZGVzKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKVsgJ292ZXJmbG93LXgnIF0pXG4gICAgICAgIClcbiAgICAgIClcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBnZXRTY3JvbGxUYXJnZXQsXG5cbiAgZ2V0U2Nyb2xsSGVpZ2h0LFxuICBnZXRTY3JvbGxXaWR0aCxcblxuICBnZXRWZXJ0aWNhbFNjcm9sbFBvc2l0aW9uLFxuICBnZXRIb3Jpem9udGFsU2Nyb2xsUG9zaXRpb24sXG5cbiAgYW5pbVZlcnRpY2FsU2Nyb2xsVG8sXG4gIGFuaW1Ib3Jpem9udGFsU2Nyb2xsVG8sXG5cbiAgc2V0VmVydGljYWxTY3JvbGxQb3NpdGlvbixcbiAgc2V0SG9yaXpvbnRhbFNjcm9sbFBvc2l0aW9uLFxuXG4gIGdldFNjcm9sbGJhcldpZHRoLFxuICBoYXNTY3JvbGxiYXJcbn1cbiIsImltcG9ydCB7IHdhdGNoLCBvbk1vdW50ZWQsIG9uQmVmb3JlVW5tb3VudCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBnZXRTY3JvbGxUYXJnZXQsIGdldFZlcnRpY2FsU2Nyb2xsUG9zaXRpb24sIGdldEhvcml6b250YWxTY3JvbGxQb3NpdGlvbiwgc2Nyb2xsVGFyZ2V0UHJvcCB9IGZyb20gJy4uLy4uL3V0aWxzL3Njcm9sbC9zY3JvbGwuanMnXG5pbXBvcnQgeyBsaXN0ZW5PcHRzLCBub29wIH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnQvZXZlbnQuanMnXG5cbmNvbnN0IHsgcGFzc2l2ZSB9ID0gbGlzdGVuT3B0c1xuY29uc3QgYXhpc1ZhbHVlcyA9IFsgJ2JvdGgnLCAnaG9yaXpvbnRhbCcsICd2ZXJ0aWNhbCcgXVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVNjcm9sbE9ic2VydmVyJyxcblxuICBwcm9wczoge1xuICAgIGF4aXM6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbGlkYXRvcjogdiA9PiBheGlzVmFsdWVzLmluY2x1ZGVzKHYpLFxuICAgICAgZGVmYXVsdDogJ3ZlcnRpY2FsJ1xuICAgIH0sXG5cbiAgICBkZWJvdW5jZTogWyBTdHJpbmcsIE51bWJlciBdLFxuXG4gICAgc2Nyb2xsVGFyZ2V0OiBzY3JvbGxUYXJnZXRQcm9wXG4gIH0sXG5cbiAgZW1pdHM6IFsgJ3Njcm9sbCcgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgZW1pdCB9KSB7XG4gICAgY29uc3Qgc2Nyb2xsID0ge1xuICAgICAgcG9zaXRpb246IHtcbiAgICAgICAgdG9wOiAwLFxuICAgICAgICBsZWZ0OiAwXG4gICAgICB9LFxuXG4gICAgICBkaXJlY3Rpb246ICdkb3duJyxcbiAgICAgIGRpcmVjdGlvbkNoYW5nZWQ6IGZhbHNlLFxuXG4gICAgICBkZWx0YToge1xuICAgICAgICB0b3A6IDAsXG4gICAgICAgIGxlZnQ6IDBcbiAgICAgIH0sXG5cbiAgICAgIGluZmxlY3Rpb25Qb2ludDoge1xuICAgICAgICB0b3A6IDAsXG4gICAgICAgIGxlZnQ6IDBcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgY2xlYXJUaW1lciA9IG51bGwsIGxvY2FsU2Nyb2xsVGFyZ2V0LCBwYXJlbnRFbFxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMuc2Nyb2xsVGFyZ2V0LCAoKSA9PiB7XG4gICAgICB1bmNvbmZpZ3VyZVNjcm9sbFRhcmdldCgpXG4gICAgICBjb25maWd1cmVTY3JvbGxUYXJnZXQoKVxuICAgIH0pXG5cbiAgICBmdW5jdGlvbiBlbWl0RXZlbnQgKCkge1xuICAgICAgY2xlYXJUaW1lcj8uKClcblxuICAgICAgY29uc3QgdG9wID0gTWF0aC5tYXgoMCwgZ2V0VmVydGljYWxTY3JvbGxQb3NpdGlvbihsb2NhbFNjcm9sbFRhcmdldCkpXG4gICAgICBjb25zdCBsZWZ0ID0gZ2V0SG9yaXpvbnRhbFNjcm9sbFBvc2l0aW9uKGxvY2FsU2Nyb2xsVGFyZ2V0KVxuXG4gICAgICBjb25zdCBkZWx0YSA9IHtcbiAgICAgICAgdG9wOiB0b3AgLSBzY3JvbGwucG9zaXRpb24udG9wLFxuICAgICAgICBsZWZ0OiBsZWZ0IC0gc2Nyb2xsLnBvc2l0aW9uLmxlZnRcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICAocHJvcHMuYXhpcyA9PT0gJ3ZlcnRpY2FsJyAmJiBkZWx0YS50b3AgPT09IDApXG4gICAgICAgIHx8IChwcm9wcy5heGlzID09PSAnaG9yaXpvbnRhbCcgJiYgZGVsdGEubGVmdCA9PT0gMClcbiAgICAgICkgcmV0dXJuXG5cbiAgICAgIGNvbnN0IGN1ckRpciA9IE1hdGguYWJzKGRlbHRhLnRvcCkgPj0gTWF0aC5hYnMoZGVsdGEubGVmdClcbiAgICAgICAgPyAoZGVsdGEudG9wIDwgMCA/ICd1cCcgOiAnZG93bicpXG4gICAgICAgIDogKGRlbHRhLmxlZnQgPCAwID8gJ2xlZnQnIDogJ3JpZ2h0JylcblxuICAgICAgc2Nyb2xsLnBvc2l0aW9uID0geyB0b3AsIGxlZnQgfVxuICAgICAgc2Nyb2xsLmRpcmVjdGlvbkNoYW5nZWQgPSBzY3JvbGwuZGlyZWN0aW9uICE9PSBjdXJEaXJcbiAgICAgIHNjcm9sbC5kZWx0YSA9IGRlbHRhXG5cbiAgICAgIGlmIChzY3JvbGwuZGlyZWN0aW9uQ2hhbmdlZCA9PT0gdHJ1ZSkge1xuICAgICAgICBzY3JvbGwuZGlyZWN0aW9uID0gY3VyRGlyXG4gICAgICAgIHNjcm9sbC5pbmZsZWN0aW9uUG9pbnQgPSBzY3JvbGwucG9zaXRpb25cbiAgICAgIH1cblxuICAgICAgZW1pdCgnc2Nyb2xsJywgeyAuLi5zY3JvbGwgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb25maWd1cmVTY3JvbGxUYXJnZXQgKCkge1xuICAgICAgbG9jYWxTY3JvbGxUYXJnZXQgPSBnZXRTY3JvbGxUYXJnZXQocGFyZW50RWwsIHByb3BzLnNjcm9sbFRhcmdldClcbiAgICAgIGxvY2FsU2Nyb2xsVGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRyaWdnZXIsIHBhc3NpdmUpXG4gICAgICB0cmlnZ2VyKHRydWUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdW5jb25maWd1cmVTY3JvbGxUYXJnZXQgKCkge1xuICAgICAgaWYgKGxvY2FsU2Nyb2xsVGFyZ2V0ICE9PSB2b2lkIDApIHtcbiAgICAgICAgbG9jYWxTY3JvbGxUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdHJpZ2dlciwgcGFzc2l2ZSlcbiAgICAgICAgbG9jYWxTY3JvbGxUYXJnZXQgPSB2b2lkIDBcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmlnZ2VyIChpbW1lZGlhdGVseSkge1xuICAgICAgaWYgKGltbWVkaWF0ZWx5ID09PSB0cnVlIHx8IHByb3BzLmRlYm91bmNlID09PSAwIHx8IHByb3BzLmRlYm91bmNlID09PSAnMCcpIHtcbiAgICAgICAgZW1pdEV2ZW50KClcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGNsZWFyVGltZXIgPT09IG51bGwpIHtcbiAgICAgICAgY29uc3QgWyB0aW1lciwgZm4gXSA9IHByb3BzLmRlYm91bmNlXG4gICAgICAgICAgPyBbIHNldFRpbWVvdXQoZW1pdEV2ZW50LCBwcm9wcy5kZWJvdW5jZSksIGNsZWFyVGltZW91dCBdXG4gICAgICAgICAgOiBbIHJlcXVlc3RBbmltYXRpb25GcmFtZShlbWl0RXZlbnQpLCBjYW5jZWxBbmltYXRpb25GcmFtZSBdXG5cbiAgICAgICAgY2xlYXJUaW1lciA9ICgpID0+IHtcbiAgICAgICAgICBmbih0aW1lcilcbiAgICAgICAgICBjbGVhclRpbWVyID0gbnVsbFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgeyBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIHdhdGNoKCgpID0+IHByb3h5LiRxLmxhbmcucnRsLCBlbWl0RXZlbnQpXG5cbiAgICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgICAgcGFyZW50RWwgPSBwcm94eS4kZWwucGFyZW50Tm9kZVxuICAgICAgY29uZmlndXJlU2Nyb2xsVGFyZ2V0KClcbiAgICB9KVxuXG4gICAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICAgIGNsZWFyVGltZXI/LigpXG4gICAgICB1bmNvbmZpZ3VyZVNjcm9sbFRhcmdldCgpXG4gICAgfSlcblxuICAgIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kc1xuICAgIE9iamVjdC5hc3NpZ24ocHJveHksIHtcbiAgICAgIHRyaWdnZXIsXG4gICAgICBnZXRQb3NpdGlvbjogKCkgPT4gc2Nyb2xsXG4gICAgfSlcblxuICAgIHJldHVybiBub29wXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoLCByZWYsIHJlYWN0aXZlLCBjb21wdXRlZCwgd2F0Y2gsIHByb3ZpZGUsIG9uVW5tb3VudGVkLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGlzUnVudGltZVNzclByZUh5ZHJhdGlvbiB9IGZyb20gJy4uLy4uL3BsdWdpbnMvcGxhdGZvcm0vUGxhdGZvcm0uanMnXG5cbmltcG9ydCBRU2Nyb2xsT2JzZXJ2ZXIgZnJvbSAnLi4vc2Nyb2xsLW9ic2VydmVyL1FTY3JvbGxPYnNlcnZlci5qcydcbmltcG9ydCBRUmVzaXplT2JzZXJ2ZXIgZnJvbSAnLi4vcmVzaXplLW9ic2VydmVyL1FSZXNpemVPYnNlcnZlci5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgZ2V0U2Nyb2xsYmFyV2lkdGggfSBmcm9tICcuLi8uLi91dGlscy9zY3JvbGwvc2Nyb2xsLmpzJ1xuaW1wb3J0IHsgaE1lcmdlU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcbmltcG9ydCB7IGxheW91dEtleSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuc3ltYm9scy9zeW1ib2xzLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUxheW91dCcsXG5cbiAgcHJvcHM6IHtcbiAgICBjb250YWluZXI6IEJvb2xlYW4sXG4gICAgdmlldzoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2hoaCBscHIgZmZmJyxcbiAgICAgIHZhbGlkYXRvcjogdiA9PiAvXihofGwpaChofHIpIGxwciAoZnxsKWYoZnxyKSQvLnRlc3Qodi50b0xvd2VyQ2FzZSgpKVxuICAgIH0sXG5cbiAgICBvblNjcm9sbDogRnVuY3Rpb24sXG4gICAgb25TY3JvbGxIZWlnaHQ6IEZ1bmN0aW9uLFxuICAgIG9uUmVzaXplOiBGdW5jdGlvblxuICB9LFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCB9KSB7XG4gICAgY29uc3QgeyBwcm94eTogeyAkcSB9IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gICAgY29uc3Qgcm9vdFJlZiA9IHJlZihudWxsKVxuXG4gICAgLy8gcGFnZSByZWxhdGVkXG4gICAgY29uc3QgaGVpZ2h0ID0gcmVmKCRxLnNjcmVlbi5oZWlnaHQpXG4gICAgY29uc3Qgd2lkdGggPSByZWYocHJvcHMuY29udGFpbmVyID09PSB0cnVlID8gMCA6ICRxLnNjcmVlbi53aWR0aClcbiAgICBjb25zdCBzY3JvbGwgPSByZWYoeyBwb3NpdGlvbjogMCwgZGlyZWN0aW9uOiAnZG93bicsIGluZmxlY3Rpb25Qb2ludDogMCB9KVxuXG4gICAgLy8gY29udGFpbmVyIG9ubHkgcHJvcFxuICAgIGNvbnN0IGNvbnRhaW5lckhlaWdodCA9IHJlZigwKVxuICAgIGNvbnN0IHNjcm9sbGJhcldpZHRoID0gcmVmKGlzUnVudGltZVNzclByZUh5ZHJhdGlvbi52YWx1ZSA9PT0gdHJ1ZSA/IDAgOiBnZXRTY3JvbGxiYXJXaWR0aCgpKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1sYXlvdXQgcS1sYXlvdXQtLSdcbiAgICAgICsgKHByb3BzLmNvbnRhaW5lciA9PT0gdHJ1ZSA/ICdjb250YWluZXJpemVkJyA6ICdzdGFuZGFyZCcpXG4gICAgKVxuXG4gICAgY29uc3Qgc3R5bGUgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5jb250YWluZXIgPT09IGZhbHNlXG4gICAgICAgID8geyBtaW5IZWlnaHQ6ICRxLnNjcmVlbi5oZWlnaHQgKyAncHgnIH1cbiAgICAgICAgOiBudWxsXG4gICAgKSlcblxuICAgIC8vIHVzZWQgYnkgY29udGFpbmVyIG9ubHlcbiAgICBjb25zdCB0YXJnZXRTdHlsZSA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHNjcm9sbGJhcldpZHRoLnZhbHVlICE9PSAwXG4gICAgICAgID8geyBbICRxLmxhbmcucnRsID09PSB0cnVlID8gJ2xlZnQnIDogJ3JpZ2h0JyBdOiBgJHsgc2Nyb2xsYmFyV2lkdGgudmFsdWUgfXB4YCB9XG4gICAgICAgIDogbnVsbFxuICAgICkpXG5cbiAgICBjb25zdCB0YXJnZXRDaGlsZFN0eWxlID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgc2Nyb2xsYmFyV2lkdGgudmFsdWUgIT09IDBcbiAgICAgICAgPyB7XG4gICAgICAgICAgICBbICRxLmxhbmcucnRsID09PSB0cnVlID8gJ3JpZ2h0JyA6ICdsZWZ0JyBdOiAwLFxuICAgICAgICAgICAgWyAkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/ICdsZWZ0JyA6ICdyaWdodCcgXTogYC0keyBzY3JvbGxiYXJXaWR0aC52YWx1ZSB9cHhgLFxuICAgICAgICAgICAgd2lkdGg6IGBjYWxjKDEwMCUgKyAkeyBzY3JvbGxiYXJXaWR0aC52YWx1ZSB9cHgpYFxuICAgICAgICAgIH1cbiAgICAgICAgOiBudWxsXG4gICAgKSlcblxuICAgIGZ1bmN0aW9uIG9uUGFnZVNjcm9sbCAoZGF0YSkge1xuICAgICAgaWYgKHByb3BzLmNvbnRhaW5lciA9PT0gdHJ1ZSB8fCBkb2N1bWVudC5xU2Nyb2xsUHJldmVudGVkICE9PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IGluZm8gPSB7XG4gICAgICAgICAgcG9zaXRpb246IGRhdGEucG9zaXRpb24udG9wLFxuICAgICAgICAgIGRpcmVjdGlvbjogZGF0YS5kaXJlY3Rpb24sXG4gICAgICAgICAgZGlyZWN0aW9uQ2hhbmdlZDogZGF0YS5kaXJlY3Rpb25DaGFuZ2VkLFxuICAgICAgICAgIGluZmxlY3Rpb25Qb2ludDogZGF0YS5pbmZsZWN0aW9uUG9pbnQudG9wLFxuICAgICAgICAgIGRlbHRhOiBkYXRhLmRlbHRhLnRvcFxuICAgICAgICB9XG5cbiAgICAgICAgc2Nyb2xsLnZhbHVlID0gaW5mb1xuICAgICAgICBwcm9wcy5vblNjcm9sbCAhPT0gdm9pZCAwICYmIGVtaXQoJ3Njcm9sbCcsIGluZm8pXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25QYWdlUmVzaXplIChkYXRhKSB7XG4gICAgICBjb25zdCB7IGhlaWdodDogbmV3SGVpZ2h0LCB3aWR0aDogbmV3V2lkdGggfSA9IGRhdGFcbiAgICAgIGxldCByZXNpemVkID0gZmFsc2VcblxuICAgICAgaWYgKGhlaWdodC52YWx1ZSAhPT0gbmV3SGVpZ2h0KSB7XG4gICAgICAgIHJlc2l6ZWQgPSB0cnVlXG4gICAgICAgIGhlaWdodC52YWx1ZSA9IG5ld0hlaWdodFxuICAgICAgICBwcm9wcy5vblNjcm9sbEhlaWdodCAhPT0gdm9pZCAwICYmIGVtaXQoJ3Njcm9sbEhlaWdodCcsIG5ld0hlaWdodClcbiAgICAgICAgdXBkYXRlU2Nyb2xsYmFyV2lkdGgoKVxuICAgICAgfVxuICAgICAgaWYgKHdpZHRoLnZhbHVlICE9PSBuZXdXaWR0aCkge1xuICAgICAgICByZXNpemVkID0gdHJ1ZVxuICAgICAgICB3aWR0aC52YWx1ZSA9IG5ld1dpZHRoXG4gICAgICB9XG5cbiAgICAgIGlmIChyZXNpemVkID09PSB0cnVlICYmIHByb3BzLm9uUmVzaXplICE9PSB2b2lkIDApIHtcbiAgICAgICAgZW1pdCgncmVzaXplJywgZGF0YSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkNvbnRhaW5lclJlc2l6ZSAoeyBoZWlnaHQgfSkge1xuICAgICAgaWYgKGNvbnRhaW5lckhlaWdodC52YWx1ZSAhPT0gaGVpZ2h0KSB7XG4gICAgICAgIGNvbnRhaW5lckhlaWdodC52YWx1ZSA9IGhlaWdodFxuICAgICAgICB1cGRhdGVTY3JvbGxiYXJXaWR0aCgpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlU2Nyb2xsYmFyV2lkdGggKCkge1xuICAgICAgaWYgKHByb3BzLmNvbnRhaW5lciA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCB3aWR0aCA9IGhlaWdodC52YWx1ZSA+IGNvbnRhaW5lckhlaWdodC52YWx1ZVxuICAgICAgICAgID8gZ2V0U2Nyb2xsYmFyV2lkdGgoKVxuICAgICAgICAgIDogMFxuXG4gICAgICAgIGlmIChzY3JvbGxiYXJXaWR0aC52YWx1ZSAhPT0gd2lkdGgpIHtcbiAgICAgICAgICBzY3JvbGxiYXJXaWR0aC52YWx1ZSA9IHdpZHRoXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgYW5pbWF0ZVRpbWVyID0gbnVsbFxuXG4gICAgY29uc3QgJGxheW91dCA9IHtcbiAgICAgIGluc3RhbmNlczoge30sXG4gICAgICB2aWV3OiBjb21wdXRlZCgoKSA9PiBwcm9wcy52aWV3KSxcbiAgICAgIGlzQ29udGFpbmVyOiBjb21wdXRlZCgoKSA9PiBwcm9wcy5jb250YWluZXIpLFxuXG4gICAgICByb290UmVmLFxuXG4gICAgICBoZWlnaHQsXG4gICAgICBjb250YWluZXJIZWlnaHQsXG4gICAgICBzY3JvbGxiYXJXaWR0aCxcbiAgICAgIHRvdGFsV2lkdGg6IGNvbXB1dGVkKCgpID0+IHdpZHRoLnZhbHVlICsgc2Nyb2xsYmFyV2lkdGgudmFsdWUpLFxuXG4gICAgICByb3dzOiBjb21wdXRlZCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJvd3MgPSBwcm9wcy52aWV3LnRvTG93ZXJDYXNlKCkuc3BsaXQoJyAnKVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHRvcDogcm93c1sgMCBdLnNwbGl0KCcnKSxcbiAgICAgICAgICBtaWRkbGU6IHJvd3NbIDEgXS5zcGxpdCgnJyksXG4gICAgICAgICAgYm90dG9tOiByb3dzWyAyIF0uc3BsaXQoJycpXG4gICAgICAgIH1cbiAgICAgIH0pLFxuXG4gICAgICBoZWFkZXI6IHJlYWN0aXZlKHsgc2l6ZTogMCwgb2Zmc2V0OiAwLCBzcGFjZTogZmFsc2UgfSksXG4gICAgICByaWdodDogcmVhY3RpdmUoeyBzaXplOiAzMDAsIG9mZnNldDogMCwgc3BhY2U6IGZhbHNlIH0pLFxuICAgICAgZm9vdGVyOiByZWFjdGl2ZSh7IHNpemU6IDAsIG9mZnNldDogMCwgc3BhY2U6IGZhbHNlIH0pLFxuICAgICAgbGVmdDogcmVhY3RpdmUoeyBzaXplOiAzMDAsIG9mZnNldDogMCwgc3BhY2U6IGZhbHNlIH0pLFxuXG4gICAgICBzY3JvbGwsXG5cbiAgICAgIGFuaW1hdGUgKCkge1xuICAgICAgICBpZiAoYW5pbWF0ZVRpbWVyICE9PSBudWxsKSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KGFuaW1hdGVUaW1lcilcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3EtYm9keS0tbGF5b3V0LWFuaW1hdGUnKVxuICAgICAgICB9XG5cbiAgICAgICAgYW5pbWF0ZVRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgYW5pbWF0ZVRpbWVyID0gbnVsbFxuICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgncS1ib2R5LS1sYXlvdXQtYW5pbWF0ZScpXG4gICAgICAgIH0sIDE1NSlcbiAgICAgIH0sXG5cbiAgICAgIHVwZGF0ZSAocGFydCwgcHJvcCwgdmFsKSB7XG4gICAgICAgICRsYXlvdXRbIHBhcnQgXVsgcHJvcCBdID0gdmFsXG4gICAgICB9XG4gICAgfVxuXG4gICAgcHJvdmlkZShsYXlvdXRLZXksICRsYXlvdXQpXG5cbiAgICAvLyBwcmV2ZW50IHNjcm9sbGJhciBmbGlja2VyIHdoaWxlIHJlc2l6aW5nIHdpbmRvdyBoZWlnaHRcbiAgICAvLyBpZiBubyBwYWdlIHNjcm9sbGJhciBpcyBhbHJlYWR5IHByZXNlbnRcbiAgICBpZiAoX19RVUFTQVJfU1NSX1NFUlZFUl9fICE9PSB0cnVlICYmIGdldFNjcm9sbGJhcldpZHRoKCkgPiAwKSB7XG4gICAgICBsZXQgdGltZXIgPSBudWxsXG4gICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmJvZHlcblxuICAgICAgZnVuY3Rpb24gcmVzdG9yZVNjcm9sbGJhciAoKSB7XG4gICAgICAgIHRpbWVyID0gbnVsbFxuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlLXNjcm9sbGJhcicpXG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGhpZGVTY3JvbGxiYXIgKCkge1xuICAgICAgICBpZiAodGltZXIgPT09IG51bGwpIHtcbiAgICAgICAgICAvLyBpZiBpdCBoYXMgbm8gc2Nyb2xsYmFyIHRoZW4gdGhlcmUncyBub3RoaW5nIHRvIGRvXG4gICAgICAgICAgaWYgKGVsLnNjcm9sbEhlaWdodCA+ICRxLnNjcmVlbi5oZWlnaHQpIHJldHVyblxuXG4gICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnaGlkZS1zY3JvbGxiYXInKVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICAgICAgfVxuXG4gICAgICAgIHRpbWVyID0gc2V0VGltZW91dChyZXN0b3JlU2Nyb2xsYmFyLCAzMDApXG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHVwZGF0ZVNjcm9sbEV2ZW50IChhY3Rpb24pIHtcbiAgICAgICAgaWYgKHRpbWVyICE9PSBudWxsICYmIGFjdGlvbiA9PT0gJ3JlbW92ZScpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICAgICAgcmVzdG9yZVNjcm9sbGJhcigpXG4gICAgICAgIH1cblxuICAgICAgICB3aW5kb3dbIGAkeyBhY3Rpb24gfUV2ZW50TGlzdGVuZXJgIF0oJ3Jlc2l6ZScsIGhpZGVTY3JvbGxiYXIpXG4gICAgICB9XG5cbiAgICAgIHdhdGNoKFxuICAgICAgICAoKSA9PiAocHJvcHMuY29udGFpbmVyICE9PSB0cnVlID8gJ2FkZCcgOiAncmVtb3ZlJyksXG4gICAgICAgIHVwZGF0ZVNjcm9sbEV2ZW50XG4gICAgICApXG5cbiAgICAgIHByb3BzLmNvbnRhaW5lciAhPT0gdHJ1ZSAmJiB1cGRhdGVTY3JvbGxFdmVudCgnYWRkJylcblxuICAgICAgb25Vbm1vdW50ZWQoKCkgPT4ge1xuICAgICAgICB1cGRhdGVTY3JvbGxFdmVudCgncmVtb3ZlJylcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBoTWVyZ2VTbG90KHNsb3RzLmRlZmF1bHQsIFtcbiAgICAgICAgaChRU2Nyb2xsT2JzZXJ2ZXIsIHsgb25TY3JvbGw6IG9uUGFnZVNjcm9sbCB9KSxcbiAgICAgICAgaChRUmVzaXplT2JzZXJ2ZXIsIHsgb25SZXNpemU6IG9uUGFnZVJlc2l6ZSB9KVxuICAgICAgXSlcblxuICAgICAgY29uc3QgbGF5b3V0ID0gaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgICAgc3R5bGU6IHN0eWxlLnZhbHVlLFxuICAgICAgICByZWY6IHByb3BzLmNvbnRhaW5lciA9PT0gdHJ1ZSA/IHZvaWQgMCA6IHJvb3RSZWYsXG4gICAgICAgIHRhYmluZGV4OiAtMVxuICAgICAgfSwgY29udGVudClcblxuICAgICAgaWYgKHByb3BzLmNvbnRhaW5lciA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS1sYXlvdXQtY29udGFpbmVyIG92ZXJmbG93LWhpZGRlbicsXG4gICAgICAgICAgcmVmOiByb290UmVmXG4gICAgICAgIH0sIFtcbiAgICAgICAgICBoKFFSZXNpemVPYnNlcnZlciwgeyBvblJlc2l6ZTogb25Db250YWluZXJSZXNpemUgfSksXG4gICAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgICAgY2xhc3M6ICdhYnNvbHV0ZS1mdWxsJyxcbiAgICAgICAgICAgIHN0eWxlOiB0YXJnZXRTdHlsZS52YWx1ZVxuICAgICAgICAgIH0sIFtcbiAgICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAgY2xhc3M6ICdzY3JvbGwnLFxuICAgICAgICAgICAgICBzdHlsZTogdGFyZ2V0Q2hpbGRTdHlsZS52YWx1ZVxuICAgICAgICAgICAgfSwgWyBsYXlvdXQgXSlcbiAgICAgICAgICBdKVxuICAgICAgICBdKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbGF5b3V0XG4gICAgfVxuICB9XG59KVxuIiwiLyoqXG4gKiBCYXNlZCBvbiB0aGUgd29yayBvZiBodHRwczovL2dpdGh1Yi5jb20vamNob29rL3V1aWQtcmFuZG9tXG4gKi9cblxubGV0XG4gIGJ1ZixcbiAgYnVmSWR4ID0gMFxuY29uc3QgaGV4Qnl0ZXMgPSBuZXcgQXJyYXkoMjU2KVxuXG4vLyBQcmUtY2FsY3VsYXRlIHRvU3RyaW5nKDE2KSBmb3Igc3BlZWRcbmZvciAobGV0IGkgPSAwOyBpIDwgMjU2OyBpKyspIHtcbiAgaGV4Qnl0ZXNbIGkgXSA9IChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zdWJzdHJpbmcoMSlcbn1cblxuLy8gVXNlIGJlc3QgYXZhaWxhYmxlIFBSTkdcbmNvbnN0IHJhbmRvbUJ5dGVzID0gKCgpID0+IHtcbiAgLy8gTm9kZSAmIEJyb3dzZXIgc3VwcG9ydFxuICBjb25zdCBsaWIgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJ1xuICAgID8gY3J5cHRvXG4gICAgOiAoXG4gICAgICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgICAgICAgPyB3aW5kb3cuY3J5cHRvIHx8IHdpbmRvdy5tc0NyeXB0b1xuICAgICAgICAgIDogdm9pZCAwXG4gICAgICApXG5cbiAgaWYgKGxpYiAhPT0gdm9pZCAwKSB7XG4gICAgaWYgKGxpYi5yYW5kb21CeXRlcyAhPT0gdm9pZCAwKSB7XG4gICAgICByZXR1cm4gbGliLnJhbmRvbUJ5dGVzXG4gICAgfVxuICAgIGlmIChsaWIuZ2V0UmFuZG9tVmFsdWVzICE9PSB2b2lkIDApIHtcbiAgICAgIHJldHVybiBuID0+IHtcbiAgICAgICAgY29uc3QgYnl0ZXMgPSBuZXcgVWludDhBcnJheShuKVxuICAgICAgICBsaWIuZ2V0UmFuZG9tVmFsdWVzKGJ5dGVzKVxuICAgICAgICByZXR1cm4gYnl0ZXNcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbiA9PiB7XG4gICAgY29uc3QgciA9IFtdXG4gICAgZm9yIChsZXQgaSA9IG47IGkgPiAwOyBpLS0pIHtcbiAgICAgIHIucHVzaChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTYpKVxuICAgIH1cbiAgICByZXR1cm4gclxuICB9XG59KSgpXG5cbi8vIEJ1ZmZlciByYW5kb20gbnVtYmVycyBmb3Igc3BlZWRcbi8vIFJlZHVjZSBtZW1vcnkgdXNhZ2UgYnkgZGVjcmVhc2luZyB0aGlzIG51bWJlciAobWluIDE2KVxuLy8gb3IgaW1wcm92ZSBzcGVlZCBieSBpbmNyZWFzaW5nIHRoaXMgbnVtYmVyICh0cnkgMTYzODQpXG5jb25zdCBCVUZGRVJfU0laRSA9IDQwOTZcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICAvLyBCdWZmZXIgc29tZSByYW5kb20gYnl0ZXMgZm9yIHNwZWVkXG4gIGlmIChidWYgPT09IHZvaWQgMCB8fCAoYnVmSWR4ICsgMTYgPiBCVUZGRVJfU0laRSkpIHtcbiAgICBidWZJZHggPSAwXG4gICAgYnVmID0gcmFuZG9tQnl0ZXMoQlVGRkVSX1NJWkUpXG4gIH1cblxuICBjb25zdCBiID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYnVmLCBidWZJZHgsIChidWZJZHggKz0gMTYpKVxuICBiWyA2IF0gPSAoYlsgNiBdICYgMHgwZikgfCAweDQwXG4gIGJbIDggXSA9IChiWyA4IF0gJiAweDNmKSB8IDB4ODBcblxuICByZXR1cm4gaGV4Qnl0ZXNbIGJbIDAgXSBdICsgaGV4Qnl0ZXNbIGJbIDEgXSBdXG4gICAgKyBoZXhCeXRlc1sgYlsgMiBdIF0gKyBoZXhCeXRlc1sgYlsgMyBdIF0gKyAnLSdcbiAgICArIGhleEJ5dGVzWyBiWyA0IF0gXSArIGhleEJ5dGVzWyBiWyA1IF0gXSArICctJ1xuICAgICsgaGV4Qnl0ZXNbIGJbIDYgXSBdICsgaGV4Qnl0ZXNbIGJbIDcgXSBdICsgJy0nXG4gICAgKyBoZXhCeXRlc1sgYlsgOCBdIF0gKyBoZXhCeXRlc1sgYlsgOSBdIF0gKyAnLSdcbiAgICArIGhleEJ5dGVzWyBiWyAxMCBdIF0gKyBoZXhCeXRlc1sgYlsgMTEgXSBdXG4gICAgKyBoZXhCeXRlc1sgYlsgMTIgXSBdICsgaGV4Qnl0ZXNbIGJbIDEzIF0gXVxuICAgICsgaGV4Qnl0ZXNbIGJbIDE0IF0gXSArIGhleEJ5dGVzWyBiWyAxNSBdIF1cbn1cbiIsImltcG9ydCB7IHJlZiwgY29tcHV0ZWQsIHdhdGNoLCBvbk1vdW50ZWQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1aWQgZnJvbSAnLi4vLi4vdXRpbHMvdWlkL3VpZC5qcydcblxuaW1wb3J0IHsgaXNSdW50aW1lU3NyUHJlSHlkcmF0aW9uIH0gZnJvbSAnLi4vLi4vcGx1Z2lucy9wbGF0Zm9ybS9QbGF0Zm9ybS5qcydcblxuZnVuY3Rpb24gcGFyc2VWYWx1ZSAodmFsKSB7XG4gIHJldHVybiB2YWwgPT09IHZvaWQgMCB8fCB2YWwgPT09IG51bGxcbiAgICA/IG51bGxcbiAgICA6IHZhbFxufVxuXG5mdW5jdGlvbiBnZXRJZCAodmFsLCByZXF1aXJlZCkge1xuICByZXR1cm4gdmFsID09PSB2b2lkIDAgfHwgdmFsID09PSBudWxsXG4gICAgPyAocmVxdWlyZWQgPT09IHRydWUgPyBgZl8keyB1aWQoKSB9YCA6IG51bGwpXG4gICAgOiB2YWxcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGFuIFwiaWRcIiB3aGljaCBpcyBhIHJlZigpIHRoYXQgY2FuIGJlIHVzZWQgYXNcbiAqIGEgdW5pcXVlIGlkZW50aWZpZXIgdG8gYXBwbHkgdG8gYSBET00gbm9kZSBhdHRyaWJ1dGUuXG4gKlxuICogT24gU1NSLCBpdCB0YWtlcyBjYXJlIG9mIGdlbmVyYXRpbmcgdGhlIGlkIG9uIHRoZSBjbGllbnQgc2lkZSAob25seSkgdG9cbiAqIGF2b2lkIGh5ZHJhdGlvbiBlcnJvcnMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh7IGdldFZhbHVlLCByZXF1aXJlZCA9IHRydWUgfSA9IHt9KSB7XG4gIGlmIChpc1J1bnRpbWVTc3JQcmVIeWRyYXRpb24udmFsdWUgPT09IHRydWUpIHtcbiAgICBjb25zdCBpZCA9IGdldFZhbHVlICE9PSB2b2lkIDBcbiAgICAgID8gcmVmKHBhcnNlVmFsdWUoZ2V0VmFsdWUoKSkpXG4gICAgICA6IHJlZihudWxsKVxuXG4gICAgaWYgKHJlcXVpcmVkID09PSB0cnVlICYmIGlkLnZhbHVlID09PSBudWxsKSB7XG4gICAgICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgICAgICBpZC52YWx1ZSA9IGBmXyR7IHVpZCgpIH1gIC8vIGdldElkKG51bGwsIHRydWUpXG4gICAgICB9KVxuICAgIH1cblxuICAgIGlmIChnZXRWYWx1ZSAhPT0gdm9pZCAwKSB7XG4gICAgICB3YXRjaChnZXRWYWx1ZSwgbmV3SWQgPT4ge1xuICAgICAgICBpZC52YWx1ZSA9IGdldElkKG5ld0lkLCByZXF1aXJlZClcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuIGlkXG4gIH1cblxuICByZXR1cm4gZ2V0VmFsdWUgIT09IHZvaWQgMFxuICAgID8gY29tcHV0ZWQoKCkgPT4gZ2V0SWQoZ2V0VmFsdWUoKSwgcmVxdWlyZWQpKVxuICAgIDogcmVmKGBmXyR7IHVpZCgpIH1gKSAvLyBnZXRJZChudWxsLCB0cnVlKVxufVxuIiwiaW1wb3J0IHsgcmVmLCBvbkJlZm9yZVVwZGF0ZSwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5jb25zdCBsaXN0ZW5lclJFID0gL15vbltBLVpdL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHsgYXR0cnMsIHZub2RlIH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gIGNvbnN0IGFjYyA9IHtcbiAgICBsaXN0ZW5lcnM6IHJlZih7fSksXG4gICAgYXR0cmlidXRlczogcmVmKHt9KVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlICgpIHtcbiAgICBjb25zdCBhdHRyaWJ1dGVzID0ge31cbiAgICBjb25zdCBsaXN0ZW5lcnMgPSB7fVxuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gYXR0cnMpIHtcbiAgICAgIGlmIChrZXkgIT09ICdjbGFzcycgJiYga2V5ICE9PSAnc3R5bGUnICYmIGxpc3RlbmVyUkUudGVzdChrZXkpID09PSBmYWxzZSkge1xuICAgICAgICBhdHRyaWJ1dGVzWyBrZXkgXSA9IGF0dHJzWyBrZXkgXVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoY29uc3Qga2V5IGluIHZub2RlLnByb3BzKSB7XG4gICAgICBpZiAobGlzdGVuZXJSRS50ZXN0KGtleSkgPT09IHRydWUpIHtcbiAgICAgICAgbGlzdGVuZXJzWyBrZXkgXSA9IHZub2RlLnByb3BzWyBrZXkgXVxuICAgICAgfVxuICAgIH1cblxuICAgIGFjYy5hdHRyaWJ1dGVzLnZhbHVlID0gYXR0cmlidXRlc1xuICAgIGFjYy5saXN0ZW5lcnMudmFsdWUgPSBsaXN0ZW5lcnNcbiAgfVxuXG4gIG9uQmVmb3JlVXBkYXRlKHVwZGF0ZSlcblxuICB1cGRhdGUoKVxuXG4gIHJldHVybiBhY2Ncbn1cbiIsImltcG9ydCB7IGluamVjdCwgd2F0Y2gsIGdldEN1cnJlbnRJbnN0YW5jZSwgb25Nb3VudGVkLCBvbkJlZm9yZVVubW91bnQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGZvcm1LZXkgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnN5bWJvbHMvc3ltYm9scy5qcydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHsgdmFsaWRhdGUsIHJlc2V0VmFsaWRhdGlvbiwgcmVxdWlyZXNRRm9ybSB9KSB7XG4gIGNvbnN0ICRmb3JtID0gaW5qZWN0KGZvcm1LZXksIGZhbHNlKVxuXG4gIGlmICgkZm9ybSAhPT0gZmFsc2UpIHtcbiAgICBjb25zdCB7IHByb3BzLCBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIC8vIGV4cG9ydCBwdWJsaWMgbWV0aG9kIChzbyBpdCBjYW4gYmUgdXNlZCBpbiBRRm9ybSlcbiAgICBPYmplY3QuYXNzaWduKHByb3h5LCB7IHZhbGlkYXRlLCByZXNldFZhbGlkYXRpb24gfSlcblxuICAgIHdhdGNoKCgpID0+IHByb3BzLmRpc2FibGUsIHZhbCA9PiB7XG4gICAgICBpZiAodmFsID09PSB0cnVlKSB7XG4gICAgICAgIHR5cGVvZiByZXNldFZhbGlkYXRpb24gPT09ICdmdW5jdGlvbicgJiYgcmVzZXRWYWxpZGF0aW9uKClcbiAgICAgICAgJGZvcm0udW5iaW5kQ29tcG9uZW50KHByb3h5KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgICRmb3JtLmJpbmRDb21wb25lbnQocHJveHkpXG4gICAgICB9XG4gICAgfSlcblxuICAgIG9uTW91bnRlZCgoKSA9PiB7XG4gICAgICAvLyByZWdpc3RlciB0byBwYXJlbnQgUUZvcm1cbiAgICAgIHByb3BzLmRpc2FibGUgIT09IHRydWUgJiYgJGZvcm0uYmluZENvbXBvbmVudChwcm94eSlcbiAgICB9KVxuXG4gICAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICAgIC8vIHVuLXJlZ2lzdGVyIGZyb20gcGFyZW50IFFGb3JtXG4gICAgICBwcm9wcy5kaXNhYmxlICE9PSB0cnVlICYmICRmb3JtLnVuYmluZENvbXBvbmVudChwcm94eSlcbiAgICB9KVxuICB9XG4gIGVsc2UgaWYgKHJlcXVpcmVzUUZvcm0gPT09IHRydWUpIHtcbiAgICBjb25zb2xlLmVycm9yKCdQYXJlbnQgUUZvcm0gbm90IGZvdW5kIG9uIHVzZUZvcm1DaGlsZCgpIScpXG4gIH1cbn1cbiIsIi8vIGZpbGUgcmVmZXJlbmNlZCBmcm9tIGRvY3NcblxuY29uc3RcbiAgaGV4ID0gL14jWzAtOWEtZkEtRl17M30oWzAtOWEtZkEtRl17M30pPyQvLFxuICBoZXhhID0gL14jWzAtOWEtZkEtRl17NH0oWzAtOWEtZkEtRl17NH0pPyQvLFxuICBoZXhPckhleGEgPSAvXiMoWzAtOWEtZkEtRl17M318WzAtOWEtZkEtRl17NH18WzAtOWEtZkEtRl17Nn18WzAtOWEtZkEtRl17OH0pJC8sXG4gIHJnYiA9IC9ecmdiXFwoKCgwfFsxLTldW1xcZF0/fDFbXFxkXXswLDJ9fDJbXFxkXT98MlswLTRdW1xcZF18MjVbMC01XSksKXsyfSgwfFsxLTldW1xcZF0/fDFbXFxkXXswLDJ9fDJbXFxkXT98MlswLTRdW1xcZF18MjVbMC01XSlcXCkkLyxcbiAgcmdiYSA9IC9ecmdiYVxcKCgoMHxbMS05XVtcXGRdP3wxW1xcZF17MCwyfXwyW1xcZF0/fDJbMC00XVtcXGRdfDI1WzAtNV0pLCl7Mn0oMHxbMS05XVtcXGRdP3wxW1xcZF17MCwyfXwyW1xcZF0/fDJbMC00XVtcXGRdfDI1WzAtNV0pLCgwfDBcXC5bMC05XStbMS05XXwwXFwuWzEtOV0rfDEpXFwpJC9cblxuLy8gS2VlcCBpbiBzeW5jIHdpdGggdWkvdHlwZXMvYXBpL3ZhbGlkYXRpb24uZC50c1xuZXhwb3J0IGNvbnN0IHRlc3RQYXR0ZXJuID0ge1xuICBkYXRlOiB2ID0+IC9eLT9bXFxkXStcXC9bMC0xXVxcZFxcL1swLTNdXFxkJC8udGVzdCh2KSxcbiAgdGltZTogdiA9PiAvXihbMC0xXT9cXGR8MlswLTNdKTpbMC01XVxcZCQvLnRlc3QodiksXG4gIGZ1bGx0aW1lOiB2ID0+IC9eKFswLTFdP1xcZHwyWzAtM10pOlswLTVdXFxkOlswLTVdXFxkJC8udGVzdCh2KSxcbiAgdGltZU9yRnVsbHRpbWU6IHYgPT4gL14oWzAtMV0/XFxkfDJbMC0zXSk6WzAtNV1cXGQoOlswLTVdXFxkKT8kLy50ZXN0KHYpLFxuXG4gIC8vIC0tIFJGQyA1MzIyIC0tXG4gIC8vIC0tIEFkZGVkIGluIHYyLjYuNiAtLVxuICAvLyBUaGlzIGlzIGEgYmFzaWMgaGVscGVyIHZhbGlkYXRpb24uXG4gIC8vIEZvciBzb21ldGhpbmcgbW9yZSBjb21wbGV4IChsaWtlIFJGQyA4MjIpIHlvdSBzaG91bGQgd3JpdGUgYW5kIHVzZSB5b3VyIG93biBydWxlLlxuICAvLyBXZSB3b24ndCBiZSBhY2NlcHRpbmcgUFJzIHRvIGVuaGFuY2UgdGhlIG9uZSBiZWxvdyBiZWNhdXNlIG9mIHRoZSByZWFzb24gYWJvdmUuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICBlbWFpbDogdiA9PiAvXigoW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKyhcXC5bXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKSopfChcIi4rXCIpKUAoKFxcW1swLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31dKXwoKFthLXpBLVpcXC0wLTldK1xcLikrW2EtekEtWl17Mix9KSkkLy50ZXN0KHYpLFxuXG4gIGhleENvbG9yOiB2ID0+IGhleC50ZXN0KHYpLFxuICBoZXhhQ29sb3I6IHYgPT4gaGV4YS50ZXN0KHYpLFxuICBoZXhPckhleGFDb2xvcjogdiA9PiBoZXhPckhleGEudGVzdCh2KSxcblxuICByZ2JDb2xvcjogdiA9PiByZ2IudGVzdCh2KSxcbiAgcmdiYUNvbG9yOiB2ID0+IHJnYmEudGVzdCh2KSxcbiAgcmdiT3JSZ2JhQ29sb3I6IHYgPT4gcmdiLnRlc3QodikgfHwgcmdiYS50ZXN0KHYpLFxuXG4gIGhleE9yUmdiQ29sb3I6IHYgPT4gaGV4LnRlc3QodikgfHwgcmdiLnRlc3QodiksXG4gIGhleGFPclJnYmFDb2xvcjogdiA9PiBoZXhhLnRlc3QodikgfHwgcmdiYS50ZXN0KHYpLFxuICBhbnlDb2xvcjogdiA9PiBoZXhPckhleGEudGVzdCh2KSB8fCByZ2IudGVzdCh2KSB8fCByZ2JhLnRlc3Qodilcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICB0ZXN0UGF0dGVyblxufVxuIiwiaW1wb3J0IHsgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIG9uQmVmb3JlVW5tb3VudCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlRm9ybUNoaWxkIGZyb20gJy4uL3VzZS1mb3JtL3VzZS1mb3JtLWNoaWxkLmpzJ1xuaW1wb3J0IHsgdGVzdFBhdHRlcm4gfSBmcm9tICcuLi8uLi91dGlscy9wYXR0ZXJucy9wYXR0ZXJucy5qcydcbmltcG9ydCBkZWJvdW5jZSBmcm9tICcuLi8uLi91dGlscy9kZWJvdW5jZS9kZWJvdW5jZS5qcydcbmltcG9ydCB7IGluamVjdFByb3AgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmluamVjdC1vYmotcHJvcC9pbmplY3Qtb2JqLXByb3AuanMnXG5cbmNvbnN0IGxhenlSdWxlc1ZhbHVlcyA9IFsgdHJ1ZSwgZmFsc2UsICdvbmRlbWFuZCcgXVxuXG5leHBvcnQgY29uc3QgdXNlVmFsaWRhdGVQcm9wcyA9IHtcbiAgbW9kZWxWYWx1ZToge30sXG5cbiAgZXJyb3I6IHtcbiAgICB0eXBlOiBCb29sZWFuLFxuICAgIGRlZmF1bHQ6IG51bGxcbiAgfSxcbiAgZXJyb3JNZXNzYWdlOiBTdHJpbmcsXG4gIG5vRXJyb3JJY29uOiBCb29sZWFuLFxuXG4gIHJ1bGVzOiBBcnJheSxcbiAgcmVhY3RpdmVSdWxlczogQm9vbGVhbixcbiAgbGF6eVJ1bGVzOiB7XG4gICAgdHlwZTogWyBCb29sZWFuLCBTdHJpbmcgXSxcbiAgICBkZWZhdWx0OiBmYWxzZSwgLy8gc3RhdGVtZW50IHVubmVlZGVkIGJ1dCBhdm9pZHMgZnV0dXJlIHZ1ZSBpbXBsZW1lbnRhdGlvbiBjaGFuZ2VzXG4gICAgdmFsaWRhdG9yOiB2ID0+IGxhenlSdWxlc1ZhbHVlcy5pbmNsdWRlcyh2KVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChmb2N1c2VkLCBpbm5lckxvYWRpbmcpIHtcbiAgY29uc3QgeyBwcm9wcywgcHJveHkgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgY29uc3QgaW5uZXJFcnJvciA9IHJlZihmYWxzZSlcbiAgY29uc3QgaW5uZXJFcnJvck1lc3NhZ2UgPSByZWYobnVsbClcbiAgY29uc3QgaXNEaXJ0eU1vZGVsID0gcmVmKGZhbHNlKVxuXG4gIHVzZUZvcm1DaGlsZCh7IHZhbGlkYXRlLCByZXNldFZhbGlkYXRpb24gfSlcblxuICBsZXQgdmFsaWRhdGVJbmRleCA9IDAsIHVud2F0Y2hSdWxlc1xuXG4gIGNvbnN0IGhhc1J1bGVzID0gY29tcHV0ZWQoKCkgPT5cbiAgICBwcm9wcy5ydWxlcyAhPT0gdm9pZCAwXG4gICAgJiYgcHJvcHMucnVsZXMgIT09IG51bGxcbiAgICAmJiBwcm9wcy5ydWxlcy5sZW5ndGggIT09IDBcbiAgKVxuXG4gIGNvbnN0IGNhbkRlYm91bmNlVmFsaWRhdGUgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgcHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZVxuICAgICYmIGhhc1J1bGVzLnZhbHVlID09PSB0cnVlXG4gICAgLy8gU2hvdWxkIG5vdCBoYXZlIGEgdmFsaWRhdGlvbiBpbiBwcm9ncmVzcyBhbHJlYWR5O1xuICAgIC8vIEl0IG1pZ2h0IG1lYW4gdGhhdCBmb2N1cyBzd2l0Y2hlZCB0byBzdWJtaXQgYnRuIGFuZFxuICAgIC8vIFFGb3JtJ3Mgc3VibWl0KCkgaGFzIGJlZW4gY2FsbGVkIGFscmVhZHkgKEVOVEVSIGtleSlcbiAgICAmJiBpbm5lckxvYWRpbmcudmFsdWUgPT09IGZhbHNlXG4gICkpXG5cbiAgY29uc3QgaGFzRXJyb3IgPSBjb21wdXRlZCgoKSA9PlxuICAgIHByb3BzLmVycm9yID09PSB0cnVlIHx8IGlubmVyRXJyb3IudmFsdWUgPT09IHRydWVcbiAgKVxuXG4gIGNvbnN0IGVycm9yTWVzc2FnZSA9IGNvbXB1dGVkKCgpID0+IChcbiAgICB0eXBlb2YgcHJvcHMuZXJyb3JNZXNzYWdlID09PSAnc3RyaW5nJyAmJiBwcm9wcy5lcnJvck1lc3NhZ2UubGVuZ3RoICE9PSAwXG4gICAgICA/IHByb3BzLmVycm9yTWVzc2FnZVxuICAgICAgOiBpbm5lckVycm9yTWVzc2FnZS52YWx1ZVxuICApKVxuXG4gIHdhdGNoKCgpID0+IHByb3BzLm1vZGVsVmFsdWUsICgpID0+IHtcbiAgICBpc0RpcnR5TW9kZWwudmFsdWUgPSB0cnVlXG5cbiAgICBpZiAoXG4gICAgICBjYW5EZWJvdW5jZVZhbGlkYXRlLnZhbHVlID09PSB0cnVlXG4gICAgICAvLyB0cmlnZ2VyIHZhbGlkYXRpb24gaWYgbm90IHVzaW5nIGFueSBraW5kIG9mIGxhenktcnVsZXNcbiAgICAgICYmIHByb3BzLmxhenlSdWxlcyA9PT0gZmFsc2VcbiAgICApIHtcbiAgICAgIGRlYm91bmNlZFZhbGlkYXRlKClcbiAgICB9XG4gIH0pXG5cbiAgZnVuY3Rpb24gb25SdWxlc0NoYW5nZSAoKSB7XG4gICAgaWYgKFxuICAgICAgcHJvcHMubGF6eVJ1bGVzICE9PSAnb25kZW1hbmQnXG4gICAgICAmJiBjYW5EZWJvdW5jZVZhbGlkYXRlLnZhbHVlID09PSB0cnVlXG4gICAgICAmJiBpc0RpcnR5TW9kZWwudmFsdWUgPT09IHRydWVcbiAgICApIHtcbiAgICAgIGRlYm91bmNlZFZhbGlkYXRlKClcbiAgICB9XG4gIH1cblxuICB3YXRjaCgoKSA9PiBwcm9wcy5yZWFjdGl2ZVJ1bGVzLCB2YWwgPT4ge1xuICAgIGlmICh2YWwgPT09IHRydWUpIHtcbiAgICAgIGlmICh1bndhdGNoUnVsZXMgPT09IHZvaWQgMCkge1xuICAgICAgICB1bndhdGNoUnVsZXMgPSB3YXRjaCgoKSA9PiBwcm9wcy5ydWxlcywgb25SdWxlc0NoYW5nZSwgeyBpbW1lZGlhdGU6IHRydWUsIGRlZXA6IHRydWUgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAodW53YXRjaFJ1bGVzICE9PSB2b2lkIDApIHtcbiAgICAgIHVud2F0Y2hSdWxlcygpXG4gICAgICB1bndhdGNoUnVsZXMgPSB2b2lkIDBcbiAgICB9XG4gIH0sIHsgaW1tZWRpYXRlOiB0cnVlIH0pXG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMubGF6eVJ1bGVzLCBvblJ1bGVzQ2hhbmdlKVxuXG4gIHdhdGNoKGZvY3VzZWQsIHZhbCA9PiB7XG4gICAgaWYgKHZhbCA9PT0gdHJ1ZSkge1xuICAgICAgaXNEaXJ0eU1vZGVsLnZhbHVlID0gdHJ1ZVxuICAgIH1cbiAgICBlbHNlIGlmIChcbiAgICAgIGNhbkRlYm91bmNlVmFsaWRhdGUudmFsdWUgPT09IHRydWVcbiAgICAgICYmIHByb3BzLmxhenlSdWxlcyAhPT0gJ29uZGVtYW5kJ1xuICAgICkge1xuICAgICAgZGVib3VuY2VkVmFsaWRhdGUoKVxuICAgIH1cbiAgfSlcblxuICBmdW5jdGlvbiByZXNldFZhbGlkYXRpb24gKCkge1xuICAgIHZhbGlkYXRlSW5kZXgrK1xuICAgIGlubmVyTG9hZGluZy52YWx1ZSA9IGZhbHNlXG4gICAgaXNEaXJ0eU1vZGVsLnZhbHVlID0gZmFsc2VcbiAgICBpbm5lckVycm9yLnZhbHVlID0gZmFsc2VcbiAgICBpbm5lckVycm9yTWVzc2FnZS52YWx1ZSA9IG51bGxcbiAgICBkZWJvdW5jZWRWYWxpZGF0ZS5jYW5jZWwoKVxuICB9XG5cbiAgLypcbiAgICogUmV0dXJuIHZhbHVlXG4gICAqICAgLSB0cnVlICh2YWxpZGF0aW9uIHN1Y2NlZWRlZClcbiAgICogICAtIGZhbHNlICh2YWxpZGF0aW9uIGZhaWxlZClcbiAgICogICAtIFByb21pc2UgKHBlbmRpbmcgYXN5bmMgdmFsaWRhdGlvbilcbiAgICovXG4gIGZ1bmN0aW9uIHZhbGlkYXRlICh2YWwgPSBwcm9wcy5tb2RlbFZhbHVlKSB7XG4gICAgaWYgKFxuICAgICAgcHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZVxuICAgICAgfHwgaGFzUnVsZXMudmFsdWUgPT09IGZhbHNlXG4gICAgKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIGNvbnN0IGluZGV4ID0gKyt2YWxpZGF0ZUluZGV4XG5cbiAgICBjb25zdCBzZXREaXJ0eSA9IGlubmVyTG9hZGluZy52YWx1ZSAhPT0gdHJ1ZVxuICAgICAgPyAoKSA9PiB7IGlzRGlydHlNb2RlbC52YWx1ZSA9IHRydWUgfVxuICAgICAgOiAoKSA9PiB7fVxuXG4gICAgY29uc3QgdXBkYXRlID0gKGVyciwgbXNnKSA9PiB7XG4gICAgICBlcnIgPT09IHRydWUgJiYgc2V0RGlydHkoKVxuXG4gICAgICBpbm5lckVycm9yLnZhbHVlID0gZXJyXG4gICAgICBpbm5lckVycm9yTWVzc2FnZS52YWx1ZSA9IG1zZyB8fCBudWxsXG4gICAgICBpbm5lckxvYWRpbmcudmFsdWUgPSBmYWxzZVxuICAgIH1cblxuICAgIGNvbnN0IHByb21pc2VzID0gW11cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcHMucnVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHJ1bGUgPSBwcm9wcy5ydWxlc1sgaSBdXG4gICAgICBsZXQgcmVzXG5cbiAgICAgIGlmICh0eXBlb2YgcnVsZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXMgPSBydWxlKHZhbCwgdGVzdFBhdHRlcm4pXG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0eXBlb2YgcnVsZSA9PT0gJ3N0cmluZycgJiYgdGVzdFBhdHRlcm5bIHJ1bGUgXSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHJlcyA9IHRlc3RQYXR0ZXJuWyBydWxlIF0odmFsKVxuICAgICAgfVxuXG4gICAgICBpZiAocmVzID09PSBmYWxzZSB8fCB0eXBlb2YgcmVzID09PSAnc3RyaW5nJykge1xuICAgICAgICB1cGRhdGUodHJ1ZSwgcmVzKVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHJlcyAhPT0gdHJ1ZSAmJiByZXMgIT09IHZvaWQgMCkge1xuICAgICAgICBwcm9taXNlcy5wdXNoKHJlcylcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocHJvbWlzZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICB1cGRhdGUoZmFsc2UpXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIGlubmVyTG9hZGluZy52YWx1ZSA9IHRydWVcblxuICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbihcbiAgICAgIHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMgPT09IHZvaWQgMCB8fCBBcnJheS5pc0FycmF5KHJlcykgPT09IGZhbHNlIHx8IHJlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBpbmRleCA9PT0gdmFsaWRhdGVJbmRleCAmJiB1cGRhdGUoZmFsc2UpXG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1zZyA9IHJlcy5maW5kKHIgPT4gciA9PT0gZmFsc2UgfHwgdHlwZW9mIHIgPT09ICdzdHJpbmcnKVxuICAgICAgICBpbmRleCA9PT0gdmFsaWRhdGVJbmRleCAmJiB1cGRhdGUobXNnICE9PSB2b2lkIDAsIG1zZylcbiAgICAgICAgcmV0dXJuIG1zZyA9PT0gdm9pZCAwXG4gICAgICB9LFxuICAgICAgZSA9PiB7XG4gICAgICAgIGlmIChpbmRleCA9PT0gdmFsaWRhdGVJbmRleCkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSlcbiAgICAgICAgICB1cGRhdGUodHJ1ZSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIClcbiAgfVxuXG4gIGNvbnN0IGRlYm91bmNlZFZhbGlkYXRlID0gZGVib3VuY2UodmFsaWRhdGUsIDApXG5cbiAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICB1bndhdGNoUnVsZXM/LigpXG4gICAgZGVib3VuY2VkVmFsaWRhdGUuY2FuY2VsKClcbiAgfSlcblxuICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHMgJiBwcm9wc1xuICBPYmplY3QuYXNzaWduKHByb3h5LCB7IHJlc2V0VmFsaWRhdGlvbiwgdmFsaWRhdGUgfSlcbiAgaW5qZWN0UHJvcChwcm94eSwgJ2hhc0Vycm9yJywgKCkgPT4gaGFzRXJyb3IudmFsdWUpXG5cbiAgcmV0dXJuIHtcbiAgICBpc0RpcnR5TW9kZWwsXG4gICAgaGFzUnVsZXMsXG4gICAgaGFzRXJyb3IsXG4gICAgZXJyb3JNZXNzYWdlLFxuXG4gICAgdmFsaWRhdGUsXG4gICAgcmVzZXRWYWxpZGF0aW9uXG4gIH1cbn1cbiIsImxldCBxdWV1ZSA9IFtdXG5sZXQgd2FpdEZsYWdzID0gW11cblxuZnVuY3Rpb24gY2xlYXJGbGFnIChmbGFnKSB7XG4gIHdhaXRGbGFncyA9IHdhaXRGbGFncy5maWx0ZXIoZW50cnkgPT4gZW50cnkgIT09IGZsYWcpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRGb2N1c1dhaXRGbGFnIChmbGFnKSB7XG4gIGNsZWFyRmxhZyhmbGFnKVxuICB3YWl0RmxhZ3MucHVzaChmbGFnKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlRm9jdXNXYWl0RmxhZyAoZmxhZykge1xuICBjbGVhckZsYWcoZmxhZylcblxuICBpZiAod2FpdEZsYWdzLmxlbmd0aCA9PT0gMCAmJiBxdWV1ZS5sZW5ndGggIT09IDApIHtcbiAgICAvLyBvbmx5IGNhbGwgbGFzdCBmb2N1cyBoYW5kbGVyIChjYW4ndCBmb2N1cyBtdWx0aXBsZSB0aGluZ3MgYXQgb25jZSlcbiAgICBxdWV1ZVsgcXVldWUubGVuZ3RoIC0gMSBdKClcbiAgICBxdWV1ZSA9IFtdXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZEZvY3VzRm4gKGZuKSB7XG4gIGlmICh3YWl0RmxhZ3MubGVuZ3RoID09PSAwKSB7XG4gICAgZm4oKVxuICB9XG4gIGVsc2Uge1xuICAgIHF1ZXVlLnB1c2goZm4pXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUZvY3VzRm4gKGZuKSB7XG4gIHF1ZXVlID0gcXVldWUuZmlsdGVyKGVudHJ5ID0+IGVudHJ5ICE9PSBmbilcbn1cbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIFRyYW5zaXRpb24sIG5leHRUaWNrLCBvbkFjdGl2YXRlZCwgb25EZWFjdGl2YXRlZCwgb25CZWZvcmVVbm1vdW50LCBvbk1vdW50ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFJY29uIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvaWNvbi9RSWNvbi5qcydcbmltcG9ydCBRU3Bpbm5lciBmcm9tICcuLi8uLi9jb21wb25lbnRzL3NwaW5uZXIvUVNwaW5uZXIuanMnXG5cbmltcG9ydCB1c2VJZCBmcm9tICcuLi91c2UtaWQvdXNlLWlkLmpzJ1xuaW1wb3J0IHVzZVNwbGl0QXR0cnMgZnJvbSAnLi4vdXNlLXNwbGl0LWF0dHJzL3VzZS1zcGxpdC1hdHRycy5qcydcbmltcG9ydCB1c2VEYXJrLCB7IHVzZURhcmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLWRhcmsvdXNlLWRhcmsuanMnXG5pbXBvcnQgdXNlVmFsaWRhdGUsIHsgdXNlVmFsaWRhdGVQcm9wcyB9IGZyb20gJy4uL3ByaXZhdGUudXNlLXZhbGlkYXRlL3VzZS12YWxpZGF0ZS5qcydcblxuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5pbXBvcnQgeyBwcmV2ZW50LCBzdG9wQW5kUHJldmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50L2V2ZW50LmpzJ1xuaW1wb3J0IHsgYWRkRm9jdXNGbiwgcmVtb3ZlRm9jdXNGbiB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuZm9jdXMvZm9jdXMtbWFuYWdlci5qcydcblxuZXhwb3J0IGZ1bmN0aW9uIGZpZWxkVmFsdWVJc0ZpbGxlZCAodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IHZvaWQgMFxuICAgICYmIHZhbCAhPT0gbnVsbFxuICAgICYmICgnJyArIHZhbCkubGVuZ3RoICE9PSAwXG59XG5cbmV4cG9ydCBjb25zdCB1c2VOb25JbnB1dEZpZWxkUHJvcHMgPSB7XG4gIC4uLnVzZURhcmtQcm9wcyxcbiAgLi4udXNlVmFsaWRhdGVQcm9wcyxcblxuICBsYWJlbDogU3RyaW5nLFxuICBzdGFja0xhYmVsOiBCb29sZWFuLFxuICBoaW50OiBTdHJpbmcsXG4gIGhpZGVIaW50OiBCb29sZWFuLFxuICBwcmVmaXg6IFN0cmluZyxcbiAgc3VmZml4OiBTdHJpbmcsXG5cbiAgbGFiZWxDb2xvcjogU3RyaW5nLFxuICBjb2xvcjogU3RyaW5nLFxuICBiZ0NvbG9yOiBTdHJpbmcsXG5cbiAgZmlsbGVkOiBCb29sZWFuLFxuICBvdXRsaW5lZDogQm9vbGVhbixcbiAgYm9yZGVybGVzczogQm9vbGVhbixcbiAgc3RhbmRvdXQ6IFsgQm9vbGVhbiwgU3RyaW5nIF0sXG5cbiAgc3F1YXJlOiBCb29sZWFuLFxuXG4gIGxvYWRpbmc6IEJvb2xlYW4sXG5cbiAgbGFiZWxTbG90OiBCb29sZWFuLFxuXG4gIGJvdHRvbVNsb3RzOiBCb29sZWFuLFxuICBoaWRlQm90dG9tU3BhY2U6IEJvb2xlYW4sXG5cbiAgcm91bmRlZDogQm9vbGVhbixcbiAgZGVuc2U6IEJvb2xlYW4sXG4gIGl0ZW1BbGlnbmVkOiBCb29sZWFuLFxuXG4gIGNvdW50ZXI6IEJvb2xlYW4sXG5cbiAgY2xlYXJhYmxlOiBCb29sZWFuLFxuICBjbGVhckljb246IFN0cmluZyxcblxuICBkaXNhYmxlOiBCb29sZWFuLFxuICByZWFkb25seTogQm9vbGVhbixcblxuICBhdXRvZm9jdXM6IEJvb2xlYW4sXG5cbiAgZm9yOiBTdHJpbmdcbn1cblxuZXhwb3J0IGNvbnN0IHVzZUZpZWxkUHJvcHMgPSB7XG4gIC4uLnVzZU5vbklucHV0RmllbGRQcm9wcyxcbiAgbWF4bGVuZ3RoOiBbIE51bWJlciwgU3RyaW5nIF1cbn1cblxuZXhwb3J0IGNvbnN0IHVzZUZpZWxkRW1pdHMgPSBbICd1cGRhdGU6bW9kZWxWYWx1ZScsICdjbGVhcicsICdmb2N1cycsICdibHVyJyBdXG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VGaWVsZFN0YXRlICh7IHJlcXVpcmVkRm9yQXR0ciA9IHRydWUsIHRhZ1Byb3AsIGNoYW5nZUV2ZW50ID0gZmFsc2UgfSA9IHt9KSB7XG4gIGNvbnN0IHsgcHJvcHMsIHByb3h5IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsIHByb3h5LiRxKVxuICBjb25zdCB0YXJnZXRVaWQgPSB1c2VJZCh7XG4gICAgcmVxdWlyZWQ6IHJlcXVpcmVkRm9yQXR0cixcbiAgICBnZXRWYWx1ZTogKCkgPT4gcHJvcHMuZm9yXG4gIH0pXG5cbiAgcmV0dXJuIHtcbiAgICByZXF1aXJlZEZvckF0dHIsXG4gICAgY2hhbmdlRXZlbnQsXG4gICAgdGFnOiB0YWdQcm9wID09PSB0cnVlXG4gICAgICA/IGNvbXB1dGVkKCgpID0+IHByb3BzLnRhZylcbiAgICAgIDogeyB2YWx1ZTogJ2xhYmVsJyB9LFxuXG4gICAgaXNEYXJrLFxuXG4gICAgZWRpdGFibGU6IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5kaXNhYmxlICE9PSB0cnVlICYmIHByb3BzLnJlYWRvbmx5ICE9PSB0cnVlXG4gICAgKSxcblxuICAgIGlubmVyTG9hZGluZzogcmVmKGZhbHNlKSxcbiAgICBmb2N1c2VkOiByZWYoZmFsc2UpLFxuICAgIGhhc1BvcHVwT3BlbjogZmFsc2UsXG5cbiAgICBzcGxpdEF0dHJzOiB1c2VTcGxpdEF0dHJzKCksXG4gICAgdGFyZ2V0VWlkLFxuXG4gICAgcm9vdFJlZjogcmVmKG51bGwpLFxuICAgIHRhcmdldFJlZjogcmVmKG51bGwpLFxuICAgIGNvbnRyb2xSZWY6IHJlZihudWxsKVxuXG4gICAgLyoqXG4gICAgICogdXNlciBzdXBwbGllZCBhZGRpdGlvbmFsczpcblxuICAgICAqIGlubmVyVmFsdWUgLSBjb21wdXRlZFxuICAgICAqIGZsb2F0aW5nTGFiZWwgLSBjb21wdXRlZFxuICAgICAqIGlucHV0UmVmIC0gY29tcHV0ZWRcblxuICAgICAqIGZpZWxkQ2xhc3MgLSBjb21wdXRlZFxuICAgICAqIGhhc1NoYWRvdyAtIGNvbXB1dGVkXG5cbiAgICAgKiBjb250cm9sRXZlbnRzIC0gT2JqZWN0IHdpdGggZm4oZSlcblxuICAgICAqIGdldENvbnRyb2wgLSBmblxuICAgICAqIGdldElubmVyQXBwZW5kIC0gZm5cbiAgICAgKiBnZXRDb250cm9sQ2hpbGQgLSBmblxuICAgICAqIGdldFNoYWRvd0NvbnRyb2wgLSBmblxuICAgICAqIHNob3dQb3B1cCAtIGZuXG4gICAgICovXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlKSB7XG4gIGNvbnN0IHsgcHJvcHMsIGVtaXQsIHNsb3RzLCBhdHRycywgcHJveHkgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gIGNvbnN0IHsgJHEgfSA9IHByb3h5XG5cbiAgbGV0IGZvY3Vzb3V0VGltZXIgPSBudWxsXG5cbiAgaWYgKHN0YXRlLmhhc1ZhbHVlID09PSB2b2lkIDApIHtcbiAgICBzdGF0ZS5oYXNWYWx1ZSA9IGNvbXB1dGVkKCgpID0+IGZpZWxkVmFsdWVJc0ZpbGxlZChwcm9wcy5tb2RlbFZhbHVlKSlcbiAgfVxuXG4gIGlmIChzdGF0ZS5lbWl0VmFsdWUgPT09IHZvaWQgMCkge1xuICAgIHN0YXRlLmVtaXRWYWx1ZSA9IHZhbHVlID0+IHtcbiAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgdmFsdWUpXG4gICAgfVxuICB9XG5cbiAgaWYgKHN0YXRlLmNvbnRyb2xFdmVudHMgPT09IHZvaWQgMCkge1xuICAgIHN0YXRlLmNvbnRyb2xFdmVudHMgPSB7XG4gICAgICBvbkZvY3VzaW46IG9uQ29udHJvbEZvY3VzaW4sXG4gICAgICBvbkZvY3Vzb3V0OiBvbkNvbnRyb2xGb2N1c291dFxuICAgIH1cbiAgfVxuXG4gIE9iamVjdC5hc3NpZ24oc3RhdGUsIHtcbiAgICBjbGVhclZhbHVlLFxuICAgIG9uQ29udHJvbEZvY3VzaW4sXG4gICAgb25Db250cm9sRm9jdXNvdXQsXG4gICAgZm9jdXNcbiAgfSlcblxuICBpZiAoc3RhdGUuY29tcHV0ZWRDb3VudGVyID09PSB2b2lkIDApIHtcbiAgICBzdGF0ZS5jb21wdXRlZENvdW50ZXIgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBpZiAocHJvcHMuY291bnRlciAhPT0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgbGVuID0gdHlwZW9mIHByb3BzLm1vZGVsVmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBwcm9wcy5tb2RlbFZhbHVlID09PSAnbnVtYmVyJ1xuICAgICAgICAgID8gKCcnICsgcHJvcHMubW9kZWxWYWx1ZSkubGVuZ3RoXG4gICAgICAgICAgOiAoQXJyYXkuaXNBcnJheShwcm9wcy5tb2RlbFZhbHVlKSA9PT0gdHJ1ZSA/IHByb3BzLm1vZGVsVmFsdWUubGVuZ3RoIDogMClcblxuICAgICAgICBjb25zdCBtYXggPSBwcm9wcy5tYXhsZW5ndGggIT09IHZvaWQgMFxuICAgICAgICAgID8gcHJvcHMubWF4bGVuZ3RoXG4gICAgICAgICAgOiBwcm9wcy5tYXhWYWx1ZXNcblxuICAgICAgICByZXR1cm4gbGVuICsgKG1heCAhPT0gdm9pZCAwID8gJyAvICcgKyBtYXggOiAnJylcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgY29uc3Qge1xuICAgIGlzRGlydHlNb2RlbCxcbiAgICBoYXNSdWxlcyxcbiAgICBoYXNFcnJvcixcbiAgICBlcnJvck1lc3NhZ2UsXG4gICAgcmVzZXRWYWxpZGF0aW9uXG4gIH0gPSB1c2VWYWxpZGF0ZShzdGF0ZS5mb2N1c2VkLCBzdGF0ZS5pbm5lckxvYWRpbmcpXG5cbiAgY29uc3QgZmxvYXRpbmdMYWJlbCA9IHN0YXRlLmZsb2F0aW5nTGFiZWwgIT09IHZvaWQgMFxuICAgID8gY29tcHV0ZWQoKCkgPT4gcHJvcHMuc3RhY2tMYWJlbCA9PT0gdHJ1ZSB8fCBzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSB0cnVlIHx8IHN0YXRlLmZsb2F0aW5nTGFiZWwudmFsdWUgPT09IHRydWUpXG4gICAgOiBjb21wdXRlZCgoKSA9PiBwcm9wcy5zdGFja0xhYmVsID09PSB0cnVlIHx8IHN0YXRlLmZvY3VzZWQudmFsdWUgPT09IHRydWUgfHwgc3RhdGUuaGFzVmFsdWUudmFsdWUgPT09IHRydWUpXG5cbiAgY29uc3Qgc2hvdWxkUmVuZGVyQm90dG9tID0gY29tcHV0ZWQoKCkgPT5cbiAgICBwcm9wcy5ib3R0b21TbG90cyA9PT0gdHJ1ZVxuICAgIHx8IHByb3BzLmhpbnQgIT09IHZvaWQgMFxuICAgIHx8IGhhc1J1bGVzLnZhbHVlID09PSB0cnVlXG4gICAgfHwgcHJvcHMuY291bnRlciA9PT0gdHJ1ZVxuICAgIHx8IHByb3BzLmVycm9yICE9PSBudWxsXG4gIClcblxuICBjb25zdCBzdHlsZVR5cGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgaWYgKHByb3BzLmZpbGxlZCA9PT0gdHJ1ZSkgeyByZXR1cm4gJ2ZpbGxlZCcgfVxuICAgIGlmIChwcm9wcy5vdXRsaW5lZCA9PT0gdHJ1ZSkgeyByZXR1cm4gJ291dGxpbmVkJyB9XG4gICAgaWYgKHByb3BzLmJvcmRlcmxlc3MgPT09IHRydWUpIHsgcmV0dXJuICdib3JkZXJsZXNzJyB9XG4gICAgaWYgKHByb3BzLnN0YW5kb3V0KSB7IHJldHVybiAnc3RhbmRvdXQnIH1cbiAgICByZXR1cm4gJ3N0YW5kYXJkJ1xuICB9KVxuXG4gIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgIGBxLWZpZWxkIHJvdyBuby13cmFwIGl0ZW1zLXN0YXJ0IHEtZmllbGQtLSR7IHN0eWxlVHlwZS52YWx1ZSB9YFxuICAgICsgKHN0YXRlLmZpZWxkQ2xhc3MgIT09IHZvaWQgMCA/IGAgJHsgc3RhdGUuZmllbGRDbGFzcy52YWx1ZSB9YCA6ICcnKVxuICAgICsgKHByb3BzLnJvdW5kZWQgPT09IHRydWUgPyAnIHEtZmllbGQtLXJvdW5kZWQnIDogJycpXG4gICAgKyAocHJvcHMuc3F1YXJlID09PSB0cnVlID8gJyBxLWZpZWxkLS1zcXVhcmUnIDogJycpXG4gICAgKyAoZmxvYXRpbmdMYWJlbC52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0tZmxvYXQnIDogJycpXG4gICAgKyAoaGFzTGFiZWwudmFsdWUgPT09IHRydWUgPyAnIHEtZmllbGQtLWxhYmVsZWQnIDogJycpXG4gICAgKyAocHJvcHMuZGVuc2UgPT09IHRydWUgPyAnIHEtZmllbGQtLWRlbnNlJyA6ICcnKVxuICAgICsgKHByb3BzLml0ZW1BbGlnbmVkID09PSB0cnVlID8gJyBxLWZpZWxkLS1pdGVtLWFsaWduZWQgcS1pdGVtLXR5cGUnIDogJycpXG4gICAgKyAoc3RhdGUuaXNEYXJrLnZhbHVlID09PSB0cnVlID8gJyBxLWZpZWxkLS1kYXJrJyA6ICcnKVxuICAgICsgKHN0YXRlLmdldENvbnRyb2wgPT09IHZvaWQgMCA/ICcgcS1maWVsZC0tYXV0by1oZWlnaHQnIDogJycpXG4gICAgKyAoc3RhdGUuZm9jdXNlZC52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0tZm9jdXNlZCcgOiAnJylcbiAgICArIChoYXNFcnJvci52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0tZXJyb3InIDogJycpXG4gICAgKyAoaGFzRXJyb3IudmFsdWUgPT09IHRydWUgfHwgc3RhdGUuZm9jdXNlZC52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0taGlnaGxpZ2h0ZWQnIDogJycpXG4gICAgKyAocHJvcHMuaGlkZUJvdHRvbVNwYWNlICE9PSB0cnVlICYmIHNob3VsZFJlbmRlckJvdHRvbS52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0td2l0aC1ib3R0b20nIDogJycpXG4gICAgKyAocHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0tZGlzYWJsZWQnIDogKHByb3BzLnJlYWRvbmx5ID09PSB0cnVlID8gJyBxLWZpZWxkLS1yZWFkb25seScgOiAnJykpXG4gIClcblxuICBjb25zdCBjb250ZW50Q2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICdxLWZpZWxkX19jb250cm9sIHJlbGF0aXZlLXBvc2l0aW9uIHJvdyBuby13cmFwJ1xuICAgICsgKHByb3BzLmJnQ29sb3IgIT09IHZvaWQgMCA/IGAgYmctJHsgcHJvcHMuYmdDb2xvciB9YCA6ICcnKVxuICAgICsgKFxuICAgICAgaGFzRXJyb3IudmFsdWUgPT09IHRydWVcbiAgICAgICAgPyAnIHRleHQtbmVnYXRpdmUnXG4gICAgICAgIDogKFxuICAgICAgICAgICAgdHlwZW9mIHByb3BzLnN0YW5kb3V0ID09PSAnc3RyaW5nJyAmJiBwcm9wcy5zdGFuZG91dC5sZW5ndGggIT09IDAgJiYgc3RhdGUuZm9jdXNlZC52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgICAgICA/IGAgJHsgcHJvcHMuc3RhbmRvdXQgfWBcbiAgICAgICAgICAgICAgOiAocHJvcHMuY29sb3IgIT09IHZvaWQgMCA/IGAgdGV4dC0keyBwcm9wcy5jb2xvciB9YCA6ICcnKVxuICAgICAgICAgIClcbiAgICApXG4gIClcblxuICBjb25zdCBoYXNMYWJlbCA9IGNvbXB1dGVkKCgpID0+XG4gICAgcHJvcHMubGFiZWxTbG90ID09PSB0cnVlIHx8IHByb3BzLmxhYmVsICE9PSB2b2lkIDBcbiAgKVxuXG4gIGNvbnN0IGxhYmVsQ2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICdxLWZpZWxkX19sYWJlbCBuby1wb2ludGVyLWV2ZW50cyBhYnNvbHV0ZSBlbGxpcHNpcydcbiAgICArIChwcm9wcy5sYWJlbENvbG9yICE9PSB2b2lkIDAgJiYgaGFzRXJyb3IudmFsdWUgIT09IHRydWUgPyBgIHRleHQtJHsgcHJvcHMubGFiZWxDb2xvciB9YCA6ICcnKVxuICApXG5cbiAgY29uc3QgY29udHJvbFNsb3RTY29wZSA9IGNvbXB1dGVkKCgpID0+ICh7XG4gICAgaWQ6IHN0YXRlLnRhcmdldFVpZC52YWx1ZSxcbiAgICBlZGl0YWJsZTogc3RhdGUuZWRpdGFibGUudmFsdWUsXG4gICAgZm9jdXNlZDogc3RhdGUuZm9jdXNlZC52YWx1ZSxcbiAgICBmbG9hdGluZ0xhYmVsOiBmbG9hdGluZ0xhYmVsLnZhbHVlLFxuICAgIG1vZGVsVmFsdWU6IHByb3BzLm1vZGVsVmFsdWUsXG4gICAgZW1pdFZhbHVlOiBzdGF0ZS5lbWl0VmFsdWVcbiAgfSkpXG5cbiAgY29uc3QgYXR0cmlidXRlcyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBjb25zdCBhY2MgPSB7fVxuXG4gICAgaWYgKHN0YXRlLnRhcmdldFVpZC52YWx1ZSkge1xuICAgICAgYWNjLmZvciA9IHN0YXRlLnRhcmdldFVpZC52YWx1ZVxuICAgIH1cblxuICAgIGlmIChwcm9wcy5kaXNhYmxlID09PSB0cnVlKSB7XG4gICAgICBhY2NbICdhcmlhLWRpc2FibGVkJyBdID0gJ3RydWUnXG4gICAgfVxuXG4gICAgcmV0dXJuIGFjY1xuICB9KVxuXG4gIGZ1bmN0aW9uIGZvY3VzSGFuZGxlciAoKSB7XG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50XG4gICAgbGV0IHRhcmdldCA9IHN0YXRlLnRhcmdldFJlZj8udmFsdWVcblxuICAgIGlmICh0YXJnZXQgJiYgKGVsID09PSBudWxsIHx8IGVsLmlkICE9PSBzdGF0ZS50YXJnZXRVaWQudmFsdWUpKSB7XG4gICAgICB0YXJnZXQuaGFzQXR0cmlidXRlKCd0YWJpbmRleCcpID09PSB0cnVlIHx8ICh0YXJnZXQgPSB0YXJnZXQucXVlcnlTZWxlY3RvcignW3RhYmluZGV4XScpKVxuICAgICAgaWYgKHRhcmdldCAhPT0gZWwpIHtcbiAgICAgICAgdGFyZ2V0Py5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBmb2N1cyAoKSB7XG4gICAgYWRkRm9jdXNGbihmb2N1c0hhbmRsZXIpXG4gIH1cblxuICBmdW5jdGlvbiBibHVyICgpIHtcbiAgICByZW1vdmVGb2N1c0ZuKGZvY3VzSGFuZGxlcilcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnRcbiAgICBpZiAoZWwgIT09IG51bGwgJiYgc3RhdGUucm9vdFJlZi52YWx1ZS5jb250YWlucyhlbCkpIHtcbiAgICAgIGVsLmJsdXIoKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uQ29udHJvbEZvY3VzaW4gKGUpIHtcbiAgICBpZiAoZm9jdXNvdXRUaW1lciAhPT0gbnVsbCkge1xuICAgICAgY2xlYXJUaW1lb3V0KGZvY3Vzb3V0VGltZXIpXG4gICAgICBmb2N1c291dFRpbWVyID0gbnVsbFxuICAgIH1cblxuICAgIGlmIChzdGF0ZS5lZGl0YWJsZS52YWx1ZSA9PT0gdHJ1ZSAmJiBzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSBmYWxzZSkge1xuICAgICAgc3RhdGUuZm9jdXNlZC52YWx1ZSA9IHRydWVcbiAgICAgIGVtaXQoJ2ZvY3VzJywgZSlcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbkNvbnRyb2xGb2N1c291dCAoZSwgdGhlbikge1xuICAgIGZvY3Vzb3V0VGltZXIgIT09IG51bGwgJiYgY2xlYXJUaW1lb3V0KGZvY3Vzb3V0VGltZXIpXG4gICAgZm9jdXNvdXRUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgZm9jdXNvdXRUaW1lciA9IG51bGxcblxuICAgICAgaWYgKFxuICAgICAgICBkb2N1bWVudC5oYXNGb2N1cygpID09PSB0cnVlICYmIChcbiAgICAgICAgICBzdGF0ZS5oYXNQb3B1cE9wZW4gPT09IHRydWVcbiAgICAgICAgICB8fCBzdGF0ZS5jb250cm9sUmVmID09PSB2b2lkIDBcbiAgICAgICAgICB8fCBzdGF0ZS5jb250cm9sUmVmLnZhbHVlID09PSBudWxsXG4gICAgICAgICAgfHwgc3RhdGUuY29udHJvbFJlZi52YWx1ZS5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSAhPT0gZmFsc2VcbiAgICAgICAgKVxuICAgICAgKSByZXR1cm5cblxuICAgICAgaWYgKHN0YXRlLmZvY3VzZWQudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgc3RhdGUuZm9jdXNlZC52YWx1ZSA9IGZhbHNlXG4gICAgICAgIGVtaXQoJ2JsdXInLCBlKVxuICAgICAgfVxuXG4gICAgICB0aGVuPy4oKVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBjbGVhclZhbHVlIChlKSB7XG4gICAgLy8gcHJldmVudCBhY3RpdmF0aW5nIHRoZSBmaWVsZCBidXQga2VlcCBmb2N1cyBvbiBkZXNrdG9wXG4gICAgc3RvcEFuZFByZXZlbnQoZSlcblxuICAgIGlmICgkcS5wbGF0Zm9ybS5pcy5tb2JpbGUgIT09IHRydWUpIHtcbiAgICAgIGNvbnN0IGVsID0gc3RhdGUudGFyZ2V0UmVmPy52YWx1ZSB8fCBzdGF0ZS5yb290UmVmLnZhbHVlXG4gICAgICBlbC5mb2N1cygpXG4gICAgfVxuICAgIGVsc2UgaWYgKHN0YXRlLnJvb3RSZWYudmFsdWUuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkgPT09IHRydWUpIHtcbiAgICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuYmx1cigpXG4gICAgfVxuXG4gICAgaWYgKHByb3BzLnR5cGUgPT09ICdmaWxlJykge1xuICAgICAgLy8gZG8gbm90IGxldCBmb2N1cyBiZSB0cmlnZ2VyZWRcbiAgICAgIC8vIGFzIGl0IHdpbGwgbWFrZSB0aGUgbmF0aXZlIGZpbGUgZGlhbG9nXG4gICAgICAvLyBhcHBlYXIgZm9yIGFub3RoZXIgc2VsZWN0aW9uXG4gICAgICBzdGF0ZS5pbnB1dFJlZi52YWx1ZS52YWx1ZSA9IG51bGxcbiAgICB9XG5cbiAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIG51bGwpXG4gICAgc3RhdGUuY2hhbmdlRXZlbnQgPT09IHRydWUgJiYgZW1pdCgnY2hhbmdlJywgbnVsbClcbiAgICBlbWl0KCdjbGVhcicsIHByb3BzLm1vZGVsVmFsdWUpXG5cbiAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICBjb25zdCBpc0RpcnR5ID0gaXNEaXJ0eU1vZGVsLnZhbHVlXG4gICAgICByZXNldFZhbGlkYXRpb24oKVxuICAgICAgaXNEaXJ0eU1vZGVsLnZhbHVlID0gaXNEaXJ0eVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBvbkNsZWFyYWJsZUtleXVwIChldnQpIHtcbiAgICBbIDEzLCAzMiBdLmluY2x1ZGVzKGV2dC5rZXlDb2RlKSAmJiBjbGVhclZhbHVlKGV2dClcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENvbnRlbnQgKCkge1xuICAgIGNvbnN0IG5vZGUgPSBbXVxuXG4gICAgc2xvdHMucHJlcGVuZCAhPT0gdm9pZCAwICYmIG5vZGUucHVzaChcbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19wcmVwZW5kIHEtZmllbGRfX21hcmdpbmFsIHJvdyBuby13cmFwIGl0ZW1zLWNlbnRlcicsXG4gICAgICAgIGtleTogJ3ByZXBlbmQnLFxuICAgICAgICBvbkNsaWNrOiBwcmV2ZW50XG4gICAgICB9LCBzbG90cy5wcmVwZW5kKCkpXG4gICAgKVxuXG4gICAgbm9kZS5wdXNoKFxuICAgICAgaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogJ3EtZmllbGRfX2NvbnRyb2wtY29udGFpbmVyIGNvbCByZWxhdGl2ZS1wb3NpdGlvbiByb3cgbm8td3JhcCBxLWFuY2hvci0tc2tpcCdcbiAgICAgIH0sIGdldENvbnRyb2xDb250YWluZXIoKSlcbiAgICApXG5cbiAgICBoYXNFcnJvci52YWx1ZSA9PT0gdHJ1ZSAmJiBwcm9wcy5ub0Vycm9ySWNvbiA9PT0gZmFsc2UgJiYgbm9kZS5wdXNoKFxuICAgICAgZ2V0SW5uZXJBcHBlbmROb2RlKCdlcnJvcicsIFtcbiAgICAgICAgaChRSWNvbiwgeyBuYW1lOiAkcS5pY29uU2V0LmZpZWxkLmVycm9yLCBjb2xvcjogJ25lZ2F0aXZlJyB9KVxuICAgICAgXSlcbiAgICApXG5cbiAgICBpZiAocHJvcHMubG9hZGluZyA9PT0gdHJ1ZSB8fCBzdGF0ZS5pbm5lckxvYWRpbmcudmFsdWUgPT09IHRydWUpIHtcbiAgICAgIG5vZGUucHVzaChcbiAgICAgICAgZ2V0SW5uZXJBcHBlbmROb2RlKFxuICAgICAgICAgICdpbm5lci1sb2FkaW5nLWFwcGVuZCcsXG4gICAgICAgICAgc2xvdHMubG9hZGluZyAhPT0gdm9pZCAwXG4gICAgICAgICAgICA/IHNsb3RzLmxvYWRpbmcoKVxuICAgICAgICAgICAgOiBbIGgoUVNwaW5uZXIsIHsgY29sb3I6IHByb3BzLmNvbG9yIH0pIF1cbiAgICAgICAgKVxuICAgICAgKVxuICAgIH1cbiAgICBlbHNlIGlmIChwcm9wcy5jbGVhcmFibGUgPT09IHRydWUgJiYgc3RhdGUuaGFzVmFsdWUudmFsdWUgPT09IHRydWUgJiYgc3RhdGUuZWRpdGFibGUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgIG5vZGUucHVzaChcbiAgICAgICAgZ2V0SW5uZXJBcHBlbmROb2RlKCdpbm5lci1jbGVhcmFibGUtYXBwZW5kJywgW1xuICAgICAgICAgIGgoUUljb24sIHtcbiAgICAgICAgICAgIGNsYXNzOiAncS1maWVsZF9fZm9jdXNhYmxlLWFjdGlvbicsXG4gICAgICAgICAgICBuYW1lOiBwcm9wcy5jbGVhckljb24gfHwgJHEuaWNvblNldC5maWVsZC5jbGVhcixcbiAgICAgICAgICAgIHRhYmluZGV4OiAwLFxuICAgICAgICAgICAgcm9sZTogJ2J1dHRvbicsXG4gICAgICAgICAgICAnYXJpYS1oaWRkZW4nOiAnZmFsc2UnLFxuICAgICAgICAgICAgJ2FyaWEtbGFiZWwnOiAkcS5sYW5nLmxhYmVsLmNsZWFyLFxuICAgICAgICAgICAgb25LZXl1cDogb25DbGVhcmFibGVLZXl1cCxcbiAgICAgICAgICAgIG9uQ2xpY2s6IGNsZWFyVmFsdWVcbiAgICAgICAgICB9KVxuICAgICAgICBdKVxuICAgICAgKVxuICAgIH1cblxuICAgIHNsb3RzLmFwcGVuZCAhPT0gdm9pZCAwICYmIG5vZGUucHVzaChcbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19hcHBlbmQgcS1maWVsZF9fbWFyZ2luYWwgcm93IG5vLXdyYXAgaXRlbXMtY2VudGVyJyxcbiAgICAgICAga2V5OiAnYXBwZW5kJyxcbiAgICAgICAgb25DbGljazogcHJldmVudFxuICAgICAgfSwgc2xvdHMuYXBwZW5kKCkpXG4gICAgKVxuXG4gICAgc3RhdGUuZ2V0SW5uZXJBcHBlbmQgIT09IHZvaWQgMCAmJiBub2RlLnB1c2goXG4gICAgICBnZXRJbm5lckFwcGVuZE5vZGUoJ2lubmVyLWFwcGVuZCcsIHN0YXRlLmdldElubmVyQXBwZW5kKCkpXG4gICAgKVxuXG4gICAgc3RhdGUuZ2V0Q29udHJvbENoaWxkICE9PSB2b2lkIDAgJiYgbm9kZS5wdXNoKFxuICAgICAgc3RhdGUuZ2V0Q29udHJvbENoaWxkKClcbiAgICApXG5cbiAgICByZXR1cm4gbm9kZVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q29udHJvbENvbnRhaW5lciAoKSB7XG4gICAgY29uc3Qgbm9kZSA9IFtdXG5cbiAgICBwcm9wcy5wcmVmaXggIT09IHZvaWQgMCAmJiBwcm9wcy5wcmVmaXggIT09IG51bGwgJiYgbm9kZS5wdXNoKFxuICAgICAgaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogJ3EtZmllbGRfX3ByZWZpeCBuby1wb2ludGVyLWV2ZW50cyByb3cgaXRlbXMtY2VudGVyJ1xuICAgICAgfSwgcHJvcHMucHJlZml4KVxuICAgIClcblxuICAgIGlmIChzdGF0ZS5nZXRTaGFkb3dDb250cm9sICE9PSB2b2lkIDAgJiYgc3RhdGUuaGFzU2hhZG93LnZhbHVlID09PSB0cnVlKSB7XG4gICAgICBub2RlLnB1c2goXG4gICAgICAgIHN0YXRlLmdldFNoYWRvd0NvbnRyb2woKVxuICAgICAgKVxuICAgIH1cblxuICAgIGlmIChzdGF0ZS5nZXRDb250cm9sICE9PSB2b2lkIDApIHtcbiAgICAgIG5vZGUucHVzaChzdGF0ZS5nZXRDb250cm9sKCkpXG4gICAgfVxuICAgIC8vIGludGVybmFsIHVzYWdlIG9ubHk6XG4gICAgZWxzZSBpZiAoc2xvdHMucmF3Q29udHJvbCAhPT0gdm9pZCAwKSB7XG4gICAgICBub2RlLnB1c2goc2xvdHMucmF3Q29udHJvbCgpKVxuICAgIH1cbiAgICBlbHNlIGlmIChzbG90cy5jb250cm9sICE9PSB2b2lkIDApIHtcbiAgICAgIG5vZGUucHVzaChcbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIHJlZjogc3RhdGUudGFyZ2V0UmVmLFxuICAgICAgICAgIGNsYXNzOiAncS1maWVsZF9fbmF0aXZlIHJvdycsXG4gICAgICAgICAgdGFiaW5kZXg6IC0xLFxuICAgICAgICAgIC4uLnN0YXRlLnNwbGl0QXR0cnMuYXR0cmlidXRlcy52YWx1ZSxcbiAgICAgICAgICAnZGF0YS1hdXRvZm9jdXMnOiBwcm9wcy5hdXRvZm9jdXMgPT09IHRydWUgfHwgdm9pZCAwXG4gICAgICAgIH0sIHNsb3RzLmNvbnRyb2woY29udHJvbFNsb3RTY29wZS52YWx1ZSkpXG4gICAgICApXG4gICAgfVxuXG4gICAgaGFzTGFiZWwudmFsdWUgPT09IHRydWUgJiYgbm9kZS5wdXNoKFxuICAgICAgaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogbGFiZWxDbGFzcy52YWx1ZVxuICAgICAgfSwgaFNsb3Qoc2xvdHMubGFiZWwsIHByb3BzLmxhYmVsKSlcbiAgICApXG5cbiAgICBwcm9wcy5zdWZmaXggIT09IHZvaWQgMCAmJiBwcm9wcy5zdWZmaXggIT09IG51bGwgJiYgbm9kZS5wdXNoKFxuICAgICAgaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogJ3EtZmllbGRfX3N1ZmZpeCBuby1wb2ludGVyLWV2ZW50cyByb3cgaXRlbXMtY2VudGVyJ1xuICAgICAgfSwgcHJvcHMuc3VmZml4KVxuICAgIClcblxuICAgIHJldHVybiBub2RlLmNvbmNhdChoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEJvdHRvbSAoKSB7XG4gICAgbGV0IG1zZywga2V5XG5cbiAgICBpZiAoaGFzRXJyb3IudmFsdWUgPT09IHRydWUpIHtcbiAgICAgIGlmIChlcnJvck1lc3NhZ2UudmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgbXNnID0gWyBoKCdkaXYnLCB7IHJvbGU6ICdhbGVydCcgfSwgZXJyb3JNZXNzYWdlLnZhbHVlKSBdXG4gICAgICAgIGtleSA9IGBxLS1zbG90LWVycm9yLSR7IGVycm9yTWVzc2FnZS52YWx1ZSB9YFxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIG1zZyA9IGhTbG90KHNsb3RzLmVycm9yKVxuICAgICAgICBrZXkgPSAncS0tc2xvdC1lcnJvcidcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAocHJvcHMuaGlkZUhpbnQgIT09IHRydWUgfHwgc3RhdGUuZm9jdXNlZC52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKHByb3BzLmhpbnQgIT09IHZvaWQgMCkge1xuICAgICAgICBtc2cgPSBbIGgoJ2RpdicsIHByb3BzLmhpbnQpIF1cbiAgICAgICAga2V5ID0gYHEtLXNsb3QtaGludC0keyBwcm9wcy5oaW50IH1gXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgbXNnID0gaFNsb3Qoc2xvdHMuaGludClcbiAgICAgICAga2V5ID0gJ3EtLXNsb3QtaGludCdcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBoYXNDb3VudGVyID0gcHJvcHMuY291bnRlciA9PT0gdHJ1ZSB8fCBzbG90cy5jb3VudGVyICE9PSB2b2lkIDBcblxuICAgIGlmIChcbiAgICAgIHByb3BzLmhpZGVCb3R0b21TcGFjZSA9PT0gdHJ1ZVxuICAgICAgJiYgaGFzQ291bnRlciA9PT0gZmFsc2VcbiAgICAgICYmIG1zZyA9PT0gdm9pZCAwXG4gICAgKSByZXR1cm5cblxuICAgIGNvbnN0IG1haW4gPSBoKCdkaXYnLCB7XG4gICAgICBrZXksXG4gICAgICBjbGFzczogJ3EtZmllbGRfX21lc3NhZ2VzIGNvbCdcbiAgICB9LCBtc2cpXG5cbiAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgY2xhc3M6ICdxLWZpZWxkX19ib3R0b20gcm93IGl0ZW1zLXN0YXJ0IHEtZmllbGRfX2JvdHRvbS0tJ1xuICAgICAgICArIChwcm9wcy5oaWRlQm90dG9tU3BhY2UgIT09IHRydWUgPyAnYW5pbWF0ZWQnIDogJ3N0YWxlJyksXG4gICAgICBvbkNsaWNrOiBwcmV2ZW50XG4gICAgfSwgW1xuICAgICAgcHJvcHMuaGlkZUJvdHRvbVNwYWNlID09PSB0cnVlXG4gICAgICAgID8gbWFpblxuICAgICAgICA6IGgoVHJhbnNpdGlvbiwgeyBuYW1lOiAncS10cmFuc2l0aW9uLS1maWVsZC1tZXNzYWdlJyB9LCAoKSA9PiBtYWluKSxcblxuICAgICAgaGFzQ291bnRlciA9PT0gdHJ1ZVxuICAgICAgICA/IGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogJ3EtZmllbGRfX2NvdW50ZXInXG4gICAgICAgIH0sIHNsb3RzLmNvdW50ZXIgIT09IHZvaWQgMCA/IHNsb3RzLmNvdW50ZXIoKSA6IHN0YXRlLmNvbXB1dGVkQ291bnRlci52YWx1ZSlcbiAgICAgICAgOiBudWxsXG4gICAgXSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldElubmVyQXBwZW5kTm9kZSAoa2V5LCBjb250ZW50KSB7XG4gICAgcmV0dXJuIGNvbnRlbnQgPT09IG51bGxcbiAgICAgID8gbnVsbFxuICAgICAgOiBoKCdkaXYnLCB7XG4gICAgICAgIGtleSxcbiAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19hcHBlbmQgcS1maWVsZF9fbWFyZ2luYWwgcm93IG5vLXdyYXAgaXRlbXMtY2VudGVyIHEtYW5jaG9yLS1za2lwJ1xuICAgICAgfSwgY29udGVudClcbiAgfVxuXG4gIGxldCBzaG91bGRBY3RpdmF0ZSA9IGZhbHNlXG5cbiAgb25EZWFjdGl2YXRlZCgoKSA9PiB7XG4gICAgc2hvdWxkQWN0aXZhdGUgPSB0cnVlXG4gIH0pXG5cbiAgb25BY3RpdmF0ZWQoKCkgPT4ge1xuICAgIHNob3VsZEFjdGl2YXRlID09PSB0cnVlICYmIHByb3BzLmF1dG9mb2N1cyA9PT0gdHJ1ZSAmJiBwcm94eS5mb2N1cygpXG4gIH0pXG5cbiAgcHJvcHMuYXV0b2ZvY3VzID09PSB0cnVlICYmIG9uTW91bnRlZCgoKSA9PiB7XG4gICAgcHJveHkuZm9jdXMoKVxuICB9KVxuXG4gIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgZm9jdXNvdXRUaW1lciAhPT0gbnVsbCAmJiBjbGVhclRpbWVvdXQoZm9jdXNvdXRUaW1lcilcbiAgfSlcblxuICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHNcbiAgT2JqZWN0LmFzc2lnbihwcm94eSwgeyBmb2N1cywgYmx1ciB9KVxuXG4gIHJldHVybiBmdW5jdGlvbiByZW5kZXJGaWVsZCAoKSB7XG4gICAgY29uc3QgbGFiZWxBdHRycyA9IHN0YXRlLmdldENvbnRyb2wgPT09IHZvaWQgMCAmJiBzbG90cy5jb250cm9sID09PSB2b2lkIDBcbiAgICAgID8ge1xuICAgICAgICAgIC4uLnN0YXRlLnNwbGl0QXR0cnMuYXR0cmlidXRlcy52YWx1ZSxcbiAgICAgICAgICAnZGF0YS1hdXRvZm9jdXMnOiBwcm9wcy5hdXRvZm9jdXMgPT09IHRydWUgfHwgdm9pZCAwLFxuICAgICAgICAgIC4uLmF0dHJpYnV0ZXMudmFsdWVcbiAgICAgICAgfVxuICAgICAgOiBhdHRyaWJ1dGVzLnZhbHVlXG5cbiAgICByZXR1cm4gaChzdGF0ZS50YWcudmFsdWUsIHtcbiAgICAgIHJlZjogc3RhdGUucm9vdFJlZixcbiAgICAgIGNsYXNzOiBbXG4gICAgICAgIGNsYXNzZXMudmFsdWUsXG4gICAgICAgIGF0dHJzLmNsYXNzXG4gICAgICBdLFxuICAgICAgc3R5bGU6IGF0dHJzLnN0eWxlLFxuICAgICAgLi4ubGFiZWxBdHRyc1xuICAgIH0sIFtcbiAgICAgIHNsb3RzLmJlZm9yZSAhPT0gdm9pZCAwXG4gICAgICAgID8gaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS1maWVsZF9fYmVmb3JlIHEtZmllbGRfX21hcmdpbmFsIHJvdyBuby13cmFwIGl0ZW1zLWNlbnRlcicsXG4gICAgICAgICAgb25DbGljazogcHJldmVudFxuICAgICAgICB9LCBzbG90cy5iZWZvcmUoKSlcbiAgICAgICAgOiBudWxsLFxuXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiAncS1maWVsZF9faW5uZXIgcmVsYXRpdmUtcG9zaXRpb24gY29sIHNlbGYtc3RyZXRjaCdcbiAgICAgIH0sIFtcbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIHJlZjogc3RhdGUuY29udHJvbFJlZixcbiAgICAgICAgICBjbGFzczogY29udGVudENsYXNzLnZhbHVlLFxuICAgICAgICAgIHRhYmluZGV4OiAtMSxcbiAgICAgICAgICAuLi5zdGF0ZS5jb250cm9sRXZlbnRzXG4gICAgICAgIH0sIGdldENvbnRlbnQoKSksXG5cbiAgICAgICAgc2hvdWxkUmVuZGVyQm90dG9tLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgPyBnZXRCb3R0b20oKVxuICAgICAgICAgIDogbnVsbFxuICAgICAgXSksXG5cbiAgICAgIHNsb3RzLmFmdGVyICE9PSB2b2lkIDBcbiAgICAgICAgPyBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19hZnRlciBxLWZpZWxkX19tYXJnaW5hbCByb3cgbm8td3JhcCBpdGVtcy1jZW50ZXInLFxuICAgICAgICAgIG9uQ2xpY2s6IHByZXZlbnRcbiAgICAgICAgfSwgc2xvdHMuYWZ0ZXIoKSlcbiAgICAgICAgOiBudWxsXG4gICAgXSlcbiAgfVxufVxuIiwiaW1wb3J0IHVzZUZpZWxkLCB7IHVzZUZpZWxkU3RhdGUsIHVzZUZpZWxkUHJvcHMsIHVzZUZpZWxkRW1pdHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1maWVsZC91c2UtZmllbGQuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FGaWVsZCcsXG5cbiAgaW5oZXJpdEF0dHJzOiBmYWxzZSxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZUZpZWxkUHJvcHMsXG5cbiAgICB0YWc6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdsYWJlbCdcbiAgICB9XG4gIH0sXG5cbiAgZW1pdHM6IHVzZUZpZWxkRW1pdHMsXG5cbiAgc2V0dXAgKCkge1xuICAgIHJldHVybiB1c2VGaWVsZChcbiAgICAgIHVzZUZpZWxkU3RhdGUoeyB0YWdQcm9wOiB0cnVlIH0pXG4gICAgKVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFJY29uIGZyb20gJy4uL2ljb24vUUljb24uanMnXG5cbmltcG9ydCBSaXBwbGUgZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9yaXBwbGUvUmlwcGxlLmpzJ1xuXG5pbXBvcnQgdXNlRGFyaywgeyB1c2VEYXJrUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1kYXJrL3VzZS1kYXJrLmpzJ1xuaW1wb3J0IHVzZVNpemUsIHsgdXNlU2l6ZVByb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2Utc2l6ZS91c2Utc2l6ZS5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgc3RvcEFuZFByZXZlbnQgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC9ldmVudC5qcydcbmltcG9ydCB7IGhNZXJnZVNsb3RTYWZlbHksIGhEaXIgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0U2l6ZXMgPSB7XG4gIHhzOiA4LFxuICBzbTogMTAsXG4gIG1kOiAxNCxcbiAgbGc6IDIwLFxuICB4bDogMjRcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FDaGlwJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZURhcmtQcm9wcyxcbiAgICAuLi51c2VTaXplUHJvcHMsXG5cbiAgICBkZW5zZTogQm9vbGVhbixcblxuICAgIGljb246IFN0cmluZyxcbiAgICBpY29uUmlnaHQ6IFN0cmluZyxcbiAgICBpY29uUmVtb3ZlOiBTdHJpbmcsXG4gICAgaWNvblNlbGVjdGVkOiBTdHJpbmcsXG4gICAgbGFiZWw6IFsgU3RyaW5nLCBOdW1iZXIgXSxcblxuICAgIGNvbG9yOiBTdHJpbmcsXG4gICAgdGV4dENvbG9yOiBTdHJpbmcsXG5cbiAgICBtb2RlbFZhbHVlOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgIH0sXG4gICAgc2VsZWN0ZWQ6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiBudWxsXG4gICAgfSxcblxuICAgIHNxdWFyZTogQm9vbGVhbixcbiAgICBvdXRsaW5lOiBCb29sZWFuLFxuICAgIGNsaWNrYWJsZTogQm9vbGVhbixcbiAgICByZW1vdmFibGU6IEJvb2xlYW4sXG5cbiAgICByZW1vdmVBcmlhTGFiZWw6IFN0cmluZyxcblxuICAgIHRhYmluZGV4OiBbIFN0cmluZywgTnVtYmVyIF0sXG4gICAgZGlzYWJsZTogQm9vbGVhbixcblxuICAgIHJpcHBsZToge1xuICAgICAgdHlwZTogWyBCb29sZWFuLCBPYmplY3QgXSxcbiAgICAgIGRlZmF1bHQ6IHRydWVcbiAgICB9XG4gIH0sXG5cbiAgZW1pdHM6IFsgJ3VwZGF0ZTptb2RlbFZhbHVlJywgJ3VwZGF0ZTpzZWxlY3RlZCcsICdyZW1vdmUnLCAnY2xpY2snIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0IH0pIHtcbiAgICBjb25zdCB7IHByb3h5OiB7ICRxIH0gfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgICBjb25zdCBpc0RhcmsgPSB1c2VEYXJrKHByb3BzLCAkcSlcbiAgICBjb25zdCBzaXplU3R5bGUgPSB1c2VTaXplKHByb3BzLCBkZWZhdWx0U2l6ZXMpXG5cbiAgICBjb25zdCBoYXNMZWZ0SWNvbiA9IGNvbXB1dGVkKCgpID0+IHByb3BzLnNlbGVjdGVkID09PSB0cnVlIHx8IHByb3BzLmljb24gIT09IHZvaWQgMClcblxuICAgIGNvbnN0IGxlZnRJY29uID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuc2VsZWN0ZWQgPT09IHRydWVcbiAgICAgICAgPyBwcm9wcy5pY29uU2VsZWN0ZWQgfHwgJHEuaWNvblNldC5jaGlwLnNlbGVjdGVkXG4gICAgICAgIDogcHJvcHMuaWNvblxuICAgICkpXG5cbiAgICBjb25zdCByZW1vdmVJY29uID0gY29tcHV0ZWQoKCkgPT4gcHJvcHMuaWNvblJlbW92ZSB8fCAkcS5pY29uU2V0LmNoaXAucmVtb3ZlKVxuXG4gICAgY29uc3QgaXNDbGlja2FibGUgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMuZGlzYWJsZSA9PT0gZmFsc2VcbiAgICAgICYmIChwcm9wcy5jbGlja2FibGUgPT09IHRydWUgfHwgcHJvcHMuc2VsZWN0ZWQgIT09IG51bGwpXG4gICAgKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IHRleHQgPSBwcm9wcy5vdXRsaW5lID09PSB0cnVlXG4gICAgICAgID8gcHJvcHMuY29sb3IgfHwgcHJvcHMudGV4dENvbG9yXG4gICAgICAgIDogcHJvcHMudGV4dENvbG9yXG5cbiAgICAgIHJldHVybiAncS1jaGlwIHJvdyBpbmxpbmUgbm8td3JhcCBpdGVtcy1jZW50ZXInXG4gICAgICAgICsgKHByb3BzLm91dGxpbmUgPT09IGZhbHNlICYmIHByb3BzLmNvbG9yICE9PSB2b2lkIDAgPyBgIGJnLSR7IHByb3BzLmNvbG9yIH1gIDogJycpXG4gICAgICAgICsgKHRleHQgPyBgIHRleHQtJHsgdGV4dCB9IHEtY2hpcC0tY29sb3JlZGAgOiAnJylcbiAgICAgICAgKyAocHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSA/ICcgZGlzYWJsZWQnIDogJycpXG4gICAgICAgICsgKHByb3BzLmRlbnNlID09PSB0cnVlID8gJyBxLWNoaXAtLWRlbnNlJyA6ICcnKVxuICAgICAgICArIChwcm9wcy5vdXRsaW5lID09PSB0cnVlID8gJyBxLWNoaXAtLW91dGxpbmUnIDogJycpXG4gICAgICAgICsgKHByb3BzLnNlbGVjdGVkID09PSB0cnVlID8gJyBxLWNoaXAtLXNlbGVjdGVkJyA6ICcnKVxuICAgICAgICArIChpc0NsaWNrYWJsZS52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1jaGlwLS1jbGlja2FibGUgY3Vyc29yLXBvaW50ZXIgbm9uLXNlbGVjdGFibGUgcS1ob3ZlcmFibGUnIDogJycpXG4gICAgICAgICsgKHByb3BzLnNxdWFyZSA9PT0gdHJ1ZSA/ICcgcS1jaGlwLS1zcXVhcmUnIDogJycpXG4gICAgICAgICsgKGlzRGFyay52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1jaGlwLS1kYXJrIHEtZGFyaycgOiAnJylcbiAgICB9KVxuXG4gICAgY29uc3QgYXR0cmlidXRlcyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGNoaXAgPSBwcm9wcy5kaXNhYmxlID09PSB0cnVlXG4gICAgICAgID8geyB0YWJpbmRleDogLTEsICdhcmlhLWRpc2FibGVkJzogJ3RydWUnIH1cbiAgICAgICAgOiB7IHRhYmluZGV4OiBwcm9wcy50YWJpbmRleCB8fCAwIH1cblxuICAgICAgY29uc3QgcmVtb3ZlID0ge1xuICAgICAgICAuLi5jaGlwLFxuICAgICAgICByb2xlOiAnYnV0dG9uJyxcbiAgICAgICAgJ2FyaWEtaGlkZGVuJzogJ2ZhbHNlJyxcbiAgICAgICAgJ2FyaWEtbGFiZWwnOiBwcm9wcy5yZW1vdmVBcmlhTGFiZWwgfHwgJHEubGFuZy5sYWJlbC5yZW1vdmVcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHsgY2hpcCwgcmVtb3ZlIH1cbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gb25LZXl1cCAoZSkge1xuICAgICAgZS5rZXlDb2RlID09PSAxMyAvKiBFTlRFUiAqLyAmJiBvbkNsaWNrKGUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25DbGljayAoZSkge1xuICAgICAgaWYgKCFwcm9wcy5kaXNhYmxlKSB7XG4gICAgICAgIGVtaXQoJ3VwZGF0ZTpzZWxlY3RlZCcsICFwcm9wcy5zZWxlY3RlZClcbiAgICAgICAgZW1pdCgnY2xpY2snLCBlKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uUmVtb3ZlIChlKSB7XG4gICAgICBpZiAoZS5rZXlDb2RlID09PSB2b2lkIDAgfHwgZS5rZXlDb2RlID09PSAxMykge1xuICAgICAgICBzdG9wQW5kUHJldmVudChlKVxuICAgICAgICBpZiAocHJvcHMuZGlzYWJsZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIGZhbHNlKVxuICAgICAgICAgIGVtaXQoJ3JlbW92ZScpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRDb250ZW50ICgpIHtcbiAgICAgIGNvbnN0IGNoaWxkID0gW11cblxuICAgICAgaXNDbGlja2FibGUudmFsdWUgPT09IHRydWUgJiYgY2hpbGQucHVzaChcbiAgICAgICAgaCgnZGl2JywgeyBjbGFzczogJ3EtZm9jdXMtaGVscGVyJyB9KVxuICAgICAgKVxuXG4gICAgICBoYXNMZWZ0SWNvbi52YWx1ZSA9PT0gdHJ1ZSAmJiBjaGlsZC5wdXNoKFxuICAgICAgICBoKFFJY29uLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWNoaXBfX2ljb24gcS1jaGlwX19pY29uLS1sZWZ0JyxcbiAgICAgICAgICBuYW1lOiBsZWZ0SWNvbi52YWx1ZVxuICAgICAgICB9KVxuICAgICAgKVxuXG4gICAgICBjb25zdCBsYWJlbCA9IHByb3BzLmxhYmVsICE9PSB2b2lkIDBcbiAgICAgICAgPyBbIGgoJ2RpdicsIHsgY2xhc3M6ICdlbGxpcHNpcycgfSwgWyBwcm9wcy5sYWJlbCBdKSBdXG4gICAgICAgIDogdm9pZCAwXG5cbiAgICAgIGNoaWxkLnB1c2goXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogJ3EtY2hpcF9fY29udGVudCBjb2wgcm93IG5vLXdyYXAgaXRlbXMtY2VudGVyIHEtYW5jaG9yLS1za2lwJ1xuICAgICAgICB9LCBoTWVyZ2VTbG90U2FmZWx5KHNsb3RzLmRlZmF1bHQsIGxhYmVsKSlcbiAgICAgIClcblxuICAgICAgcHJvcHMuaWNvblJpZ2h0ICYmIGNoaWxkLnB1c2goXG4gICAgICAgIGgoUUljb24sIHtcbiAgICAgICAgICBjbGFzczogJ3EtY2hpcF9faWNvbiBxLWNoaXBfX2ljb24tLXJpZ2h0JyxcbiAgICAgICAgICBuYW1lOiBwcm9wcy5pY29uUmlnaHRcbiAgICAgICAgfSlcbiAgICAgIClcblxuICAgICAgcHJvcHMucmVtb3ZhYmxlID09PSB0cnVlICYmIGNoaWxkLnB1c2goXG4gICAgICAgIGgoUUljb24sIHtcbiAgICAgICAgICBjbGFzczogJ3EtY2hpcF9faWNvbiBxLWNoaXBfX2ljb24tLXJlbW92ZSBjdXJzb3ItcG9pbnRlcicsXG4gICAgICAgICAgbmFtZTogcmVtb3ZlSWNvbi52YWx1ZSxcbiAgICAgICAgICAuLi5hdHRyaWJ1dGVzLnZhbHVlLnJlbW92ZSxcbiAgICAgICAgICBvbkNsaWNrOiBvblJlbW92ZSxcbiAgICAgICAgICBvbktleXVwOiBvblJlbW92ZVxuICAgICAgICB9KVxuICAgICAgKVxuXG4gICAgICByZXR1cm4gY2hpbGRcbiAgICB9XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaWYgKHByb3BzLm1vZGVsVmFsdWUgPT09IGZhbHNlKSByZXR1cm5cblxuICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUsXG4gICAgICAgIHN0eWxlOiBzaXplU3R5bGUudmFsdWVcbiAgICAgIH1cblxuICAgICAgaXNDbGlja2FibGUudmFsdWUgPT09IHRydWUgJiYgT2JqZWN0LmFzc2lnbihcbiAgICAgICAgZGF0YSxcbiAgICAgICAgYXR0cmlidXRlcy52YWx1ZS5jaGlwLFxuICAgICAgICB7IG9uQ2xpY2ssIG9uS2V5dXAgfVxuICAgICAgKVxuXG4gICAgICByZXR1cm4gaERpcihcbiAgICAgICAgJ2RpdicsXG4gICAgICAgIGRhdGEsXG4gICAgICAgIGdldENvbnRlbnQoKSxcbiAgICAgICAgJ3JpcHBsZScsXG4gICAgICAgIHByb3BzLnJpcHBsZSAhPT0gZmFsc2UgJiYgcHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZSxcbiAgICAgICAgKCkgPT4gWyBbIFJpcHBsZSwgcHJvcHMucmlwcGxlIF0gXVxuICAgICAgKVxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtZGFyay91c2UtZGFyay5qcydcbmltcG9ydCB1c2VSb3V0ZXJMaW5rLCB7IHVzZVJvdXRlckxpbmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLXJvdXRlci1saW5rL3VzZS1yb3V0ZXItbGluay5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFVuaXF1ZVNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5pbXBvcnQgeyBzdG9wQW5kUHJldmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50L2V2ZW50LmpzJ1xuaW1wb3J0IHsgaXNLZXlDb2RlIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5rZXlib2FyZC9rZXktY29tcG9zaXRpb24uanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRSXRlbScsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VEYXJrUHJvcHMsXG4gICAgLi4udXNlUm91dGVyTGlua1Byb3BzLFxuXG4gICAgdGFnOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnZGl2J1xuICAgIH0sXG5cbiAgICBhY3RpdmU6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiBudWxsXG4gICAgfSxcblxuICAgIGNsaWNrYWJsZTogQm9vbGVhbixcbiAgICBkZW5zZTogQm9vbGVhbixcbiAgICBpbnNldExldmVsOiBOdW1iZXIsXG5cbiAgICB0YWJpbmRleDogWyBTdHJpbmcsIE51bWJlciBdLFxuXG4gICAgZm9jdXNlZDogQm9vbGVhbixcbiAgICBtYW51YWxGb2N1czogQm9vbGVhblxuICB9LFxuXG4gIGVtaXRzOiBbICdjbGljaycsICdrZXl1cCcgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIGNvbnN0IHsgcHJveHk6IHsgJHEgfSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsICRxKVxuICAgIGNvbnN0IHsgaGFzTGluaywgbGlua0F0dHJzLCBsaW5rQ2xhc3MsIGxpbmtUYWcsIG5hdmlnYXRlT25DbGljayB9ID0gdXNlUm91dGVyTGluaygpXG5cbiAgICBjb25zdCByb290UmVmID0gcmVmKG51bGwpXG4gICAgY29uc3QgYmx1clRhcmdldFJlZiA9IHJlZihudWxsKVxuXG4gICAgY29uc3QgaXNBY3Rpb25hYmxlID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLmNsaWNrYWJsZSA9PT0gdHJ1ZVxuICAgICAgICB8fCBoYXNMaW5rLnZhbHVlID09PSB0cnVlXG4gICAgICAgIHx8IHByb3BzLnRhZyA9PT0gJ2xhYmVsJ1xuICAgIClcblxuICAgIGNvbnN0IGlzQ2xpY2thYmxlID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLmRpc2FibGUgIT09IHRydWUgJiYgaXNBY3Rpb25hYmxlLnZhbHVlID09PSB0cnVlXG4gICAgKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1pdGVtIHEtaXRlbS10eXBlIHJvdyBuby13cmFwJ1xuICAgICAgKyAocHJvcHMuZGVuc2UgPT09IHRydWUgPyAnIHEtaXRlbS0tZGVuc2UnIDogJycpXG4gICAgICArIChpc0RhcmsudmFsdWUgPT09IHRydWUgPyAnIHEtaXRlbS0tZGFyaycgOiAnJylcbiAgICAgICsgKFxuICAgICAgICBoYXNMaW5rLnZhbHVlID09PSB0cnVlICYmIHByb3BzLmFjdGl2ZSA9PT0gbnVsbFxuICAgICAgICAgID8gbGlua0NsYXNzLnZhbHVlXG4gICAgICAgICAgOiAoXG4gICAgICAgICAgICAgIHByb3BzLmFjdGl2ZSA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAgID8gYCBxLWl0ZW0tLWFjdGl2ZSR7IHByb3BzLmFjdGl2ZUNsYXNzICE9PSB2b2lkIDAgPyBgICR7IHByb3BzLmFjdGl2ZUNsYXNzIH1gIDogJycgfWBcbiAgICAgICAgICAgICAgICA6ICcnXG4gICAgICAgICAgICApXG4gICAgICApXG4gICAgICArIChwcm9wcy5kaXNhYmxlID09PSB0cnVlID8gJyBkaXNhYmxlZCcgOiAnJylcbiAgICAgICsgKFxuICAgICAgICBpc0NsaWNrYWJsZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgID8gJyBxLWl0ZW0tLWNsaWNrYWJsZSBxLWxpbmsgY3Vyc29yLXBvaW50ZXIgJ1xuICAgICAgICAgICAgKyAocHJvcHMubWFudWFsRm9jdXMgPT09IHRydWUgPyAncS1tYW51YWwtZm9jdXNhYmxlJyA6ICdxLWZvY3VzYWJsZSBxLWhvdmVyYWJsZScpXG4gICAgICAgICAgICArIChwcm9wcy5mb2N1c2VkID09PSB0cnVlID8gJyBxLW1hbnVhbC1mb2N1c2FibGUtLWZvY3VzZWQnIDogJycpXG4gICAgICAgICAgOiAnJ1xuICAgICAgKVxuICAgIClcblxuICAgIGNvbnN0IHN0eWxlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgaWYgKHByb3BzLmluc2V0TGV2ZWwgPT09IHZvaWQgMCkge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuXG4gICAgICBjb25zdCBkaXIgPSAkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/ICdSaWdodCcgOiAnTGVmdCdcbiAgICAgIHJldHVybiB7XG4gICAgICAgIFsgJ3BhZGRpbmcnICsgZGlyIF06ICgxNiArIHByb3BzLmluc2V0TGV2ZWwgKiA1NikgKyAncHgnXG4gICAgICB9XG4gICAgfSlcblxuICAgIGZ1bmN0aW9uIG9uQ2xpY2sgKGUpIHtcbiAgICAgIGlmIChpc0NsaWNrYWJsZS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBpZiAoYmx1clRhcmdldFJlZi52YWx1ZSAhPT0gbnVsbCAmJiBlLnFBdm9pZEZvY3VzICE9PSB0cnVlKSB7XG4gICAgICAgICAgaWYgKGUucUtleUV2ZW50ICE9PSB0cnVlICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IHJvb3RSZWYudmFsdWUpIHtcbiAgICAgICAgICAgIGJsdXJUYXJnZXRSZWYudmFsdWUuZm9jdXMoKVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBibHVyVGFyZ2V0UmVmLnZhbHVlKSB7XG4gICAgICAgICAgICByb290UmVmLnZhbHVlLmZvY3VzKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBuYXZpZ2F0ZU9uQ2xpY2soZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbktleXVwIChlKSB7XG4gICAgICBpZiAoaXNDbGlja2FibGUudmFsdWUgPT09IHRydWUgJiYgaXNLZXlDb2RlKGUsIFsgMTMsIDMyIF0pID09PSB0cnVlKSB7XG4gICAgICAgIHN0b3BBbmRQcmV2ZW50KGUpXG5cbiAgICAgICAgLy8gZm9yIHJpcHBsZVxuICAgICAgICBlLnFLZXlFdmVudCA9IHRydWVcblxuICAgICAgICAvLyBmb3IgY2xpY2sgdHJpZ2dlclxuICAgICAgICBjb25zdCBldnQgPSBuZXcgTW91c2VFdmVudCgnY2xpY2snLCBlKVxuICAgICAgICBldnQucUtleUV2ZW50ID0gdHJ1ZVxuICAgICAgICByb290UmVmLnZhbHVlLmRpc3BhdGNoRXZlbnQoZXZ0KVxuICAgICAgfVxuXG4gICAgICBlbWl0KCdrZXl1cCcsIGUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Q29udGVudCAoKSB7XG4gICAgICBjb25zdCBjaGlsZCA9IGhVbmlxdWVTbG90KHNsb3RzLmRlZmF1bHQsIFtdKVxuXG4gICAgICBpc0NsaWNrYWJsZS52YWx1ZSA9PT0gdHJ1ZSAmJiBjaGlsZC51bnNoaWZ0KFxuICAgICAgICBoKCdkaXYnLCB7IGNsYXNzOiAncS1mb2N1cy1oZWxwZXInLCB0YWJpbmRleDogLTEsIHJlZjogYmx1clRhcmdldFJlZiB9KVxuICAgICAgKVxuXG4gICAgICByZXR1cm4gY2hpbGRcbiAgICB9XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgcmVmOiByb290UmVmLFxuICAgICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgICAgc3R5bGU6IHN0eWxlLnZhbHVlLFxuICAgICAgICByb2xlOiAnbGlzdGl0ZW0nLFxuICAgICAgICBvbkNsaWNrLFxuICAgICAgICBvbktleXVwXG4gICAgICB9XG5cbiAgICAgIGlmIChpc0NsaWNrYWJsZS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBkYXRhLnRhYmluZGV4ID0gcHJvcHMudGFiaW5kZXggfHwgJzAnXG4gICAgICAgIE9iamVjdC5hc3NpZ24oZGF0YSwgbGlua0F0dHJzLnZhbHVlKVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaXNBY3Rpb25hYmxlLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGRhdGFbICdhcmlhLWRpc2FibGVkJyBdID0gJ3RydWUnXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoKFxuICAgICAgICBsaW5rVGFnLnZhbHVlLFxuICAgICAgICBkYXRhLFxuICAgICAgICBnZXRDb250ZW50KClcbiAgICAgIClcbiAgICB9XG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoLCBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRSXRlbVNlY3Rpb24nLFxuXG4gIHByb3BzOiB7XG4gICAgYXZhdGFyOiBCb29sZWFuLFxuICAgIHRodW1ibmFpbDogQm9vbGVhbixcbiAgICBzaWRlOiBCb29sZWFuLFxuICAgIHRvcDogQm9vbGVhbixcbiAgICBub1dyYXA6IEJvb2xlYW5cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtaXRlbV9fc2VjdGlvbiBjb2x1bW4nXG4gICAgICArIGAgcS1pdGVtX19zZWN0aW9uLS0keyBwcm9wcy5hdmF0YXIgPT09IHRydWUgfHwgcHJvcHMuc2lkZSA9PT0gdHJ1ZSB8fCBwcm9wcy50aHVtYm5haWwgPT09IHRydWUgPyAnc2lkZScgOiAnbWFpbicgfWBcbiAgICAgICsgKHByb3BzLnRvcCA9PT0gdHJ1ZSA/ICcgcS1pdGVtX19zZWN0aW9uLS10b3AganVzdGlmeS1zdGFydCcgOiAnIGp1c3RpZnktY2VudGVyJylcbiAgICAgICsgKHByb3BzLmF2YXRhciA9PT0gdHJ1ZSA/ICcgcS1pdGVtX19zZWN0aW9uLS1hdmF0YXInIDogJycpXG4gICAgICArIChwcm9wcy50aHVtYm5haWwgPT09IHRydWUgPyAnIHEtaXRlbV9fc2VjdGlvbi0tdGh1bWJuYWlsJyA6ICcnKVxuICAgICAgKyAocHJvcHMubm9XcmFwID09PSB0cnVlID8gJyBxLWl0ZW1fX3NlY3Rpb24tLW5vd3JhcCcgOiAnJylcbiAgICApXG5cbiAgICByZXR1cm4gKCkgPT4gaCgnZGl2JywgeyBjbGFzczogY2xhc3Nlcy52YWx1ZSB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FJdGVtTGFiZWwnLFxuXG4gIHByb3BzOiB7XG4gICAgb3ZlcmxpbmU6IEJvb2xlYW4sXG4gICAgY2FwdGlvbjogQm9vbGVhbixcbiAgICBoZWFkZXI6IEJvb2xlYW4sXG4gICAgbGluZXM6IFsgTnVtYmVyLCBTdHJpbmcgXVxuICB9LFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cyB9KSB7XG4gICAgY29uc3QgcGFyc2VkTGluZXMgPSBjb21wdXRlZCgoKSA9PiBwYXJzZUludChwcm9wcy5saW5lcywgMTApKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1pdGVtX19sYWJlbCdcbiAgICAgICsgKHByb3BzLm92ZXJsaW5lID09PSB0cnVlID8gJyBxLWl0ZW1fX2xhYmVsLS1vdmVybGluZSB0ZXh0LW92ZXJsaW5lJyA6ICcnKVxuICAgICAgKyAocHJvcHMuY2FwdGlvbiA9PT0gdHJ1ZSA/ICcgcS1pdGVtX19sYWJlbC0tY2FwdGlvbiB0ZXh0LWNhcHRpb24nIDogJycpXG4gICAgICArIChwcm9wcy5oZWFkZXIgPT09IHRydWUgPyAnIHEtaXRlbV9fbGFiZWwtLWhlYWRlcicgOiAnJylcbiAgICAgICsgKHBhcnNlZExpbmVzLnZhbHVlID09PSAxID8gJyBlbGxpcHNpcycgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCBzdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIHJldHVybiBwcm9wcy5saW5lcyAhPT0gdm9pZCAwICYmIHBhcnNlZExpbmVzLnZhbHVlID4gMVxuICAgICAgICA/IHtcbiAgICAgICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgICAgIGRpc3BsYXk6ICctd2Via2l0LWJveCcsXG4gICAgICAgICAgICAnLXdlYmtpdC1ib3gtb3JpZW50JzogJ3ZlcnRpY2FsJyxcbiAgICAgICAgICAgICctd2Via2l0LWxpbmUtY2xhbXAnOiBwYXJzZWRMaW5lcy52YWx1ZVxuICAgICAgICAgIH1cbiAgICAgICAgOiBudWxsXG4gICAgfSlcblxuICAgIHJldHVybiAoKSA9PiBoKCdkaXYnLCB7XG4gICAgICBzdHlsZTogc3R5bGUudmFsdWUsXG4gICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZVxuICAgIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICB9XG59KVxuIiwiaW1wb3J0IFBsYXRmb3JtIGZyb20gJy4uLy4uL3BsdWdpbnMvcGxhdGZvcm0vUGxhdGZvcm0uanMnXG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhclNlbGVjdGlvbiAoKSB7XG4gIGlmICh3aW5kb3cuZ2V0U2VsZWN0aW9uICE9PSB2b2lkIDApIHtcbiAgICBjb25zdCBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKClcbiAgICBpZiAoc2VsZWN0aW9uLmVtcHR5ICE9PSB2b2lkIDApIHtcbiAgICAgIHNlbGVjdGlvbi5lbXB0eSgpXG4gICAgfVxuICAgIGVsc2UgaWYgKHNlbGVjdGlvbi5yZW1vdmVBbGxSYW5nZXMgIT09IHZvaWQgMCkge1xuICAgICAgc2VsZWN0aW9uLnJlbW92ZUFsbFJhbmdlcygpXG4gICAgICBQbGF0Zm9ybS5pcy5tb2JpbGUgIT09IHRydWUgJiYgc2VsZWN0aW9uLmFkZFJhbmdlKGRvY3VtZW50LmNyZWF0ZVJhbmdlKCkpXG4gICAgfVxuICB9XG4gIGVsc2UgaWYgKGRvY3VtZW50LnNlbGVjdGlvbiAhPT0gdm9pZCAwKSB7XG4gICAgZG9jdW1lbnQuc2VsZWN0aW9uLmVtcHR5KClcbiAgfVxufVxuIiwiaW1wb3J0IHsgcmVmLCB3YXRjaCwgb25Nb3VudGVkLCBvbkJlZm9yZVVubW91bnQsIG5leHRUaWNrLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGNsZWFyU2VsZWN0aW9uIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5zZWxlY3Rpb24vc2VsZWN0aW9uLmpzJ1xuaW1wb3J0IHsgYWRkRXZ0LCBjbGVhbkV2dCwgcHJldmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50L2V2ZW50LmpzJ1xuaW1wb3J0IHsgaXNLZXlDb2RlIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5rZXlib2FyZC9rZXktY29tcG9zaXRpb24uanMnXG5cbmV4cG9ydCBjb25zdCB1c2VBbmNob3JTdGF0aWNQcm9wcyA9IHtcbiAgLyogU1NSIGRvZXMgbm90IGtub3cgYWJvdXQgRWxlbWVudCAqL1xuICB0YXJnZXQ6IF9fUVVBU0FSX1NTUl9TRVJWRVJfX1xuICAgID8geyBkZWZhdWx0OiB0cnVlIH1cbiAgICA6IHtcbiAgICAgICAgdHlwZTogWyBCb29sZWFuLCBTdHJpbmcsIEVsZW1lbnQgXSxcbiAgICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgICAgfSxcblxuICBub1BhcmVudEV2ZW50OiBCb29sZWFuXG59XG5cbmV4cG9ydCBjb25zdCB1c2VBbmNob3JQcm9wcyA9IHtcbiAgLi4udXNlQW5jaG9yU3RhdGljUHJvcHMsXG4gIGNvbnRleHRNZW51OiBCb29sZWFuXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh7XG4gIHNob3dpbmcsXG4gIGF2b2lkRW1pdCwgLy8gcmVxdWlyZWQgZm9yIFFQb3B1cFByb3h5ICh0cnVlKVxuICBjb25maWd1cmVBbmNob3JFbCAvLyBvcHRpb25hbFxufSkge1xuICBjb25zdCB7IHByb3BzLCBwcm94eSwgZW1pdCB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICBjb25zdCBhbmNob3JFbCA9IHJlZihudWxsKVxuXG4gIGxldCB0b3VjaFRpbWVyID0gbnVsbFxuXG4gIGZ1bmN0aW9uIGNhblNob3cgKGV2dCkge1xuICAgIC8vIGFib3J0IHdpdGggbm8gcGFyZW50IGNvbmZpZ3VyZWQgb3Igb24gbXVsdGktdG91Y2hcbiAgICByZXR1cm4gYW5jaG9yRWwudmFsdWUgPT09IG51bGxcbiAgICAgID8gZmFsc2VcbiAgICAgIDogKGV2dCA9PT0gdm9pZCAwIHx8IGV2dC50b3VjaGVzID09PSB2b2lkIDAgfHwgZXZ0LnRvdWNoZXMubGVuZ3RoIDw9IDEpXG4gIH1cblxuICBjb25zdCBhbmNob3JFdmVudHMgPSB7fVxuXG4gIGlmIChjb25maWd1cmVBbmNob3JFbCA9PT0gdm9pZCAwKSB7XG4gICAgLy8gZGVmYXVsdCBjb25maWd1cmVBbmNob3JFbCBpcyBkZXNpZ25lZCBmb3JcbiAgICAvLyBRTWVudSAmIFFQb3B1cFByb3h5ICh3aGljaCBpcyB3aHkgaXQncyBoYW5kbGVkIGhlcmUpXG5cbiAgICBPYmplY3QuYXNzaWduKGFuY2hvckV2ZW50cywge1xuICAgICAgaGlkZSAoZXZ0KSB7XG4gICAgICAgIHByb3h5LmhpZGUoZXZ0KVxuICAgICAgfSxcblxuICAgICAgdG9nZ2xlIChldnQpIHtcbiAgICAgICAgcHJveHkudG9nZ2xlKGV2dClcbiAgICAgICAgZXZ0LnFBbmNob3JIYW5kbGVkID0gdHJ1ZVxuICAgICAgfSxcblxuICAgICAgdG9nZ2xlS2V5IChldnQpIHtcbiAgICAgICAgaXNLZXlDb2RlKGV2dCwgMTMpID09PSB0cnVlICYmIGFuY2hvckV2ZW50cy50b2dnbGUoZXZ0KVxuICAgICAgfSxcblxuICAgICAgY29udGV4dENsaWNrIChldnQpIHtcbiAgICAgICAgcHJveHkuaGlkZShldnQpXG4gICAgICAgIHByZXZlbnQoZXZ0KVxuICAgICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgcHJveHkuc2hvdyhldnQpXG4gICAgICAgICAgZXZ0LnFBbmNob3JIYW5kbGVkID0gdHJ1ZVxuICAgICAgICB9KVxuICAgICAgfSxcblxuICAgICAgcHJldmVudCxcblxuICAgICAgbW9iaWxlVG91Y2ggKGV2dCkge1xuICAgICAgICBhbmNob3JFdmVudHMubW9iaWxlQ2xlYW51cChldnQpXG5cbiAgICAgICAgaWYgKGNhblNob3coZXZ0KSAhPT0gdHJ1ZSkgcmV0dXJuXG5cbiAgICAgICAgcHJveHkuaGlkZShldnQpXG4gICAgICAgIGFuY2hvckVsLnZhbHVlLmNsYXNzTGlzdC5hZGQoJ25vbi1zZWxlY3RhYmxlJylcblxuICAgICAgICBjb25zdCB0YXJnZXQgPSBldnQudGFyZ2V0XG4gICAgICAgIGFkZEV2dChhbmNob3JFdmVudHMsICdhbmNob3InLCBbXG4gICAgICAgICAgWyB0YXJnZXQsICd0b3VjaG1vdmUnLCAnbW9iaWxlQ2xlYW51cCcsICdwYXNzaXZlJyBdLFxuICAgICAgICAgIFsgdGFyZ2V0LCAndG91Y2hlbmQnLCAnbW9iaWxlQ2xlYW51cCcsICdwYXNzaXZlJyBdLFxuICAgICAgICAgIFsgdGFyZ2V0LCAndG91Y2hjYW5jZWwnLCAnbW9iaWxlQ2xlYW51cCcsICdwYXNzaXZlJyBdLFxuICAgICAgICAgIFsgYW5jaG9yRWwudmFsdWUsICdjb250ZXh0bWVudScsICdwcmV2ZW50JywgJ25vdFBhc3NpdmUnIF1cbiAgICAgICAgXSlcblxuICAgICAgICB0b3VjaFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdG91Y2hUaW1lciA9IG51bGxcbiAgICAgICAgICBwcm94eS5zaG93KGV2dClcbiAgICAgICAgICBldnQucUFuY2hvckhhbmRsZWQgPSB0cnVlXG4gICAgICAgIH0sIDMwMClcbiAgICAgIH0sXG5cbiAgICAgIG1vYmlsZUNsZWFudXAgKGV2dCkge1xuICAgICAgICBhbmNob3JFbC52YWx1ZS5jbGFzc0xpc3QucmVtb3ZlKCdub24tc2VsZWN0YWJsZScpXG5cbiAgICAgICAgaWYgKHRvdWNoVGltZXIgIT09IG51bGwpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodG91Y2hUaW1lcilcbiAgICAgICAgICB0b3VjaFRpbWVyID0gbnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNob3dpbmcudmFsdWUgPT09IHRydWUgJiYgZXZ0ICE9PSB2b2lkIDApIHtcbiAgICAgICAgICBjbGVhclNlbGVjdGlvbigpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uZmlndXJlQW5jaG9yRWwgPSBmdW5jdGlvbiAoY29udGV4dCA9IHByb3BzLmNvbnRleHRNZW51KSB7XG4gICAgICBpZiAocHJvcHMubm9QYXJlbnRFdmVudCA9PT0gdHJ1ZSB8fCBhbmNob3JFbC52YWx1ZSA9PT0gbnVsbCkgcmV0dXJuXG5cbiAgICAgIGxldCBldnRzXG5cbiAgICAgIGlmIChjb250ZXh0ID09PSB0cnVlKSB7XG4gICAgICAgIGlmIChwcm94eS4kcS5wbGF0Zm9ybS5pcy5tb2JpbGUgPT09IHRydWUpIHtcbiAgICAgICAgICBldnRzID0gW1xuICAgICAgICAgICAgWyBhbmNob3JFbC52YWx1ZSwgJ3RvdWNoc3RhcnQnLCAnbW9iaWxlVG91Y2gnLCAncGFzc2l2ZScgXVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBldnRzID0gW1xuICAgICAgICAgICAgWyBhbmNob3JFbC52YWx1ZSwgJ21vdXNlZG93bicsICdoaWRlJywgJ3Bhc3NpdmUnIF0sXG4gICAgICAgICAgICBbIGFuY2hvckVsLnZhbHVlLCAnY29udGV4dG1lbnUnLCAnY29udGV4dENsaWNrJywgJ25vdFBhc3NpdmUnIF1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBldnRzID0gW1xuICAgICAgICAgIFsgYW5jaG9yRWwudmFsdWUsICdjbGljaycsICd0b2dnbGUnLCAncGFzc2l2ZScgXSxcbiAgICAgICAgICBbIGFuY2hvckVsLnZhbHVlLCAna2V5dXAnLCAndG9nZ2xlS2V5JywgJ3Bhc3NpdmUnIF1cbiAgICAgICAgXVxuICAgICAgfVxuXG4gICAgICBhZGRFdnQoYW5jaG9yRXZlbnRzLCAnYW5jaG9yJywgZXZ0cylcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1bmNvbmZpZ3VyZUFuY2hvckVsICgpIHtcbiAgICBjbGVhbkV2dChhbmNob3JFdmVudHMsICdhbmNob3InKVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0QW5jaG9yRWwgKGVsKSB7XG4gICAgYW5jaG9yRWwudmFsdWUgPSBlbFxuICAgIHdoaWxlIChhbmNob3JFbC52YWx1ZS5jbGFzc0xpc3QuY29udGFpbnMoJ3EtYW5jaG9yLS1za2lwJykpIHtcbiAgICAgIGFuY2hvckVsLnZhbHVlID0gYW5jaG9yRWwudmFsdWUucGFyZW50Tm9kZVxuICAgIH1cbiAgICBjb25maWd1cmVBbmNob3JFbCgpXG4gIH1cblxuICBmdW5jdGlvbiBwaWNrQW5jaG9yRWwgKCkge1xuICAgIGlmIChwcm9wcy50YXJnZXQgPT09IGZhbHNlIHx8IHByb3BzLnRhcmdldCA9PT0gJycgfHwgcHJveHkuJGVsLnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICAgIGFuY2hvckVsLnZhbHVlID0gbnVsbFxuICAgIH1cbiAgICBlbHNlIGlmIChwcm9wcy50YXJnZXQgPT09IHRydWUpIHtcbiAgICAgIHNldEFuY2hvckVsKHByb3h5LiRlbC5wYXJlbnROb2RlKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGxldCBlbCA9IHByb3BzLnRhcmdldFxuXG4gICAgICBpZiAodHlwZW9mIHByb3BzLnRhcmdldCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocHJvcHMudGFyZ2V0KVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBlbCA9IHZvaWQgMFxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChlbCAhPT0gdm9pZCAwICYmIGVsICE9PSBudWxsKSB7XG4gICAgICAgIGFuY2hvckVsLnZhbHVlID0gZWwuJGVsIHx8IGVsXG4gICAgICAgIGNvbmZpZ3VyZUFuY2hvckVsKClcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBhbmNob3JFbC52YWx1ZSA9IG51bGxcbiAgICAgICAgY29uc29sZS5lcnJvcihgQW5jaG9yOiB0YXJnZXQgXCIkeyBwcm9wcy50YXJnZXQgfVwiIG5vdCBmb3VuZGApXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMuY29udGV4dE1lbnUsIHZhbCA9PiB7XG4gICAgaWYgKGFuY2hvckVsLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICB1bmNvbmZpZ3VyZUFuY2hvckVsKClcbiAgICAgIGNvbmZpZ3VyZUFuY2hvckVsKHZhbClcbiAgICB9XG4gIH0pXG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMudGFyZ2V0LCAoKSA9PiB7XG4gICAgaWYgKGFuY2hvckVsLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICB1bmNvbmZpZ3VyZUFuY2hvckVsKClcbiAgICB9XG5cbiAgICBwaWNrQW5jaG9yRWwoKVxuICB9KVxuXG4gIHdhdGNoKCgpID0+IHByb3BzLm5vUGFyZW50RXZlbnQsIHZhbCA9PiB7XG4gICAgaWYgKGFuY2hvckVsLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICBpZiAodmFsID09PSB0cnVlKSB7XG4gICAgICAgIHVuY29uZmlndXJlQW5jaG9yRWwoKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbmZpZ3VyZUFuY2hvckVsKClcbiAgICAgIH1cbiAgICB9XG4gIH0pXG5cbiAgb25Nb3VudGVkKCgpID0+IHtcbiAgICBwaWNrQW5jaG9yRWwoKVxuXG4gICAgaWYgKGF2b2lkRW1pdCAhPT0gdHJ1ZSAmJiBwcm9wcy5tb2RlbFZhbHVlID09PSB0cnVlICYmIGFuY2hvckVsLnZhbHVlID09PSBudWxsKSB7XG4gICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIGZhbHNlKVxuICAgIH1cbiAgfSlcblxuICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgIHRvdWNoVGltZXIgIT09IG51bGwgJiYgY2xlYXJUaW1lb3V0KHRvdWNoVGltZXIpXG4gICAgdW5jb25maWd1cmVBbmNob3JFbCgpXG4gIH0pXG5cbiAgcmV0dXJuIHtcbiAgICBhbmNob3JFbCxcbiAgICBjYW5TaG93LFxuICAgIGFuY2hvckV2ZW50c1xuICB9XG59XG4iLCJpbXBvcnQgeyByZWYsIHdhdGNoLCBvbkJlZm9yZVVubW91bnQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGxpc3Rlbk9wdHMgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC9ldmVudC5qcydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCBjb25maWd1cmVTY3JvbGxUYXJnZXQpIHtcbiAgY29uc3QgbG9jYWxTY3JvbGxUYXJnZXQgPSByZWYobnVsbClcbiAgbGV0IHNjcm9sbEZuXG5cbiAgZnVuY3Rpb24gY2hhbmdlU2Nyb2xsRXZlbnQgKHNjcm9sbFRhcmdldCwgZm4pIHtcbiAgICBjb25zdCBmblByb3AgPSBgJHsgZm4gIT09IHZvaWQgMCA/ICdhZGQnIDogJ3JlbW92ZScgfUV2ZW50TGlzdGVuZXJgXG4gICAgY29uc3QgZm5IYW5kbGVyID0gZm4gIT09IHZvaWQgMCA/IGZuIDogc2Nyb2xsRm5cblxuICAgIGlmIChzY3JvbGxUYXJnZXQgIT09IHdpbmRvdykge1xuICAgICAgc2Nyb2xsVGFyZ2V0WyBmblByb3AgXSgnc2Nyb2xsJywgZm5IYW5kbGVyLCBsaXN0ZW5PcHRzLnBhc3NpdmUpXG4gICAgfVxuXG4gICAgd2luZG93WyBmblByb3AgXSgnc2Nyb2xsJywgZm5IYW5kbGVyLCBsaXN0ZW5PcHRzLnBhc3NpdmUpXG5cbiAgICBzY3JvbGxGbiA9IGZuXG4gIH1cblxuICBmdW5jdGlvbiB1bmNvbmZpZ3VyZVNjcm9sbFRhcmdldCAoKSB7XG4gICAgaWYgKGxvY2FsU2Nyb2xsVGFyZ2V0LnZhbHVlICE9PSBudWxsKSB7XG4gICAgICBjaGFuZ2VTY3JvbGxFdmVudChsb2NhbFNjcm9sbFRhcmdldC52YWx1ZSlcbiAgICAgIGxvY2FsU2Nyb2xsVGFyZ2V0LnZhbHVlID0gbnVsbFxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IG5vUGFyZW50RXZlbnRXYXRjaGVyID0gd2F0Y2goKCkgPT4gcHJvcHMubm9QYXJlbnRFdmVudCwgKCkgPT4ge1xuICAgIGlmIChsb2NhbFNjcm9sbFRhcmdldC52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgdW5jb25maWd1cmVTY3JvbGxUYXJnZXQoKVxuICAgICAgY29uZmlndXJlU2Nyb2xsVGFyZ2V0KClcbiAgICB9XG4gIH0pXG5cbiAgb25CZWZvcmVVbm1vdW50KG5vUGFyZW50RXZlbnRXYXRjaGVyKVxuXG4gIHJldHVybiB7XG4gICAgbG9jYWxTY3JvbGxUYXJnZXQsXG4gICAgdW5jb25maWd1cmVTY3JvbGxUYXJnZXQsXG4gICAgY2hhbmdlU2Nyb2xsRXZlbnRcbiAgfVxufVxuIiwiaW1wb3J0IHsgd2F0Y2gsIG5leHRUaWNrLCBvbk1vdW50ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgdm1IYXNSb3V0ZXIgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnZtL3ZtLmpzJ1xuXG5leHBvcnQgY29uc3QgdXNlTW9kZWxUb2dnbGVQcm9wcyA9IHtcbiAgbW9kZWxWYWx1ZToge1xuICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgZGVmYXVsdDogbnVsbFxuICB9LFxuXG4gICdvblVwZGF0ZTptb2RlbFZhbHVlJzogWyBGdW5jdGlvbiwgQXJyYXkgXVxufVxuXG5leHBvcnQgY29uc3QgdXNlTW9kZWxUb2dnbGVFbWl0cyA9IFtcbiAgJ2JlZm9yZVNob3cnLCAnc2hvdycsICdiZWZvcmVIaWRlJywgJ2hpZGUnXG5dXG5cbi8vIGhhbmRsZVNob3cvaGFuZGxlSGlkZSAtPiByZW1vdmVUaWNrKCksIHNlbGYgKCYgZW1pdCBzaG93KVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoe1xuICBzaG93aW5nLFxuICBjYW5TaG93LCAvLyBvcHRpb25hbFxuICBoaWRlT25Sb3V0ZUNoYW5nZSwgLy8gb3B0aW9uYWxcbiAgaGFuZGxlU2hvdywgLy8gb3B0aW9uYWxcbiAgaGFuZGxlSGlkZSwgLy8gb3B0aW9uYWxcbiAgcHJvY2Vzc09uTW91bnQgLy8gb3B0aW9uYWxcbn0pIHtcbiAgY29uc3Qgdm0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICBjb25zdCB7IHByb3BzLCBlbWl0LCBwcm94eSB9ID0gdm1cblxuICBsZXQgcGF5bG9hZFxuXG4gIGZ1bmN0aW9uIHRvZ2dsZSAoZXZ0KSB7XG4gICAgaWYgKHNob3dpbmcudmFsdWUgPT09IHRydWUpIHtcbiAgICAgIGhpZGUoZXZ0KVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHNob3coZXZ0KVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3cgKGV2dCkge1xuICAgIGlmIChcbiAgICAgIChwcm9wcy5kaXNhYmxlID09PSB0cnVlKVxuICAgICAgfHwgKGV2dD8ucUFuY2hvckhhbmRsZWQgPT09IHRydWUpXG4gICAgICB8fCAoY2FuU2hvdyAhPT0gdm9pZCAwICYmIGNhblNob3coZXZ0KSAhPT0gdHJ1ZSlcbiAgICApIHJldHVyblxuXG4gICAgY29uc3QgbGlzdGVuZXIgPSBwcm9wc1sgJ29uVXBkYXRlOm1vZGVsVmFsdWUnIF0gIT09IHZvaWQgMFxuXG4gICAgaWYgKGxpc3RlbmVyID09PSB0cnVlICYmIF9fUVVBU0FSX1NTUl9TRVJWRVJfXyAhPT0gdHJ1ZSkge1xuICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCB0cnVlKVxuICAgICAgcGF5bG9hZCA9IGV2dFxuICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICBpZiAocGF5bG9hZCA9PT0gZXZ0KSB7XG4gICAgICAgICAgcGF5bG9hZCA9IHZvaWQgMFxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIGlmIChwcm9wcy5tb2RlbFZhbHVlID09PSBudWxsIHx8IGxpc3RlbmVyID09PSBmYWxzZSB8fCBfX1FVQVNBUl9TU1JfU0VSVkVSX18pIHtcbiAgICAgIHByb2Nlc3NTaG93KGV2dClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwcm9jZXNzU2hvdyAoZXZ0KSB7XG4gICAgaWYgKHNob3dpbmcudmFsdWUgPT09IHRydWUpIHJldHVyblxuXG4gICAgc2hvd2luZy52YWx1ZSA9IHRydWVcblxuICAgIGVtaXQoJ2JlZm9yZVNob3cnLCBldnQpXG5cbiAgICBpZiAoaGFuZGxlU2hvdyAhPT0gdm9pZCAwKSB7XG4gICAgICBoYW5kbGVTaG93KGV2dClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBlbWl0KCdzaG93JywgZXZ0KVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGhpZGUgKGV2dCkge1xuICAgIGlmIChfX1FVQVNBUl9TU1JfU0VSVkVSX18gfHwgcHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSkgcmV0dXJuXG5cbiAgICBjb25zdCBsaXN0ZW5lciA9IHByb3BzWyAnb25VcGRhdGU6bW9kZWxWYWx1ZScgXSAhPT0gdm9pZCAwXG5cbiAgICBpZiAobGlzdGVuZXIgPT09IHRydWUgJiYgX19RVUFTQVJfU1NSX1NFUlZFUl9fICE9PSB0cnVlKSB7XG4gICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIGZhbHNlKVxuICAgICAgcGF5bG9hZCA9IGV2dFxuICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICBpZiAocGF5bG9hZCA9PT0gZXZ0KSB7XG4gICAgICAgICAgcGF5bG9hZCA9IHZvaWQgMFxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIGlmIChwcm9wcy5tb2RlbFZhbHVlID09PSBudWxsIHx8IGxpc3RlbmVyID09PSBmYWxzZSB8fCBfX1FVQVNBUl9TU1JfU0VSVkVSX18pIHtcbiAgICAgIHByb2Nlc3NIaWRlKGV2dClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwcm9jZXNzSGlkZSAoZXZ0KSB7XG4gICAgaWYgKHNob3dpbmcudmFsdWUgPT09IGZhbHNlKSByZXR1cm5cblxuICAgIHNob3dpbmcudmFsdWUgPSBmYWxzZVxuXG4gICAgZW1pdCgnYmVmb3JlSGlkZScsIGV2dClcblxuICAgIGlmIChoYW5kbGVIaWRlICE9PSB2b2lkIDApIHtcbiAgICAgIGhhbmRsZUhpZGUoZXZ0KVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGVtaXQoJ2hpZGUnLCBldnQpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcHJvY2Vzc01vZGVsQ2hhbmdlICh2YWwpIHtcbiAgICBpZiAocHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSAmJiB2YWwgPT09IHRydWUpIHtcbiAgICAgIGlmIChwcm9wc1sgJ29uVXBkYXRlOm1vZGVsVmFsdWUnIF0gIT09IHZvaWQgMCkge1xuICAgICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIGZhbHNlKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICgodmFsID09PSB0cnVlKSAhPT0gc2hvd2luZy52YWx1ZSkge1xuICAgICAgY29uc3QgZm4gPSB2YWwgPT09IHRydWUgPyBwcm9jZXNzU2hvdyA6IHByb2Nlc3NIaWRlXG4gICAgICBmbihwYXlsb2FkKVxuICAgIH1cbiAgfVxuXG4gIHdhdGNoKCgpID0+IHByb3BzLm1vZGVsVmFsdWUsIHByb2Nlc3NNb2RlbENoYW5nZSlcblxuICBpZiAoaGlkZU9uUm91dGVDaGFuZ2UgIT09IHZvaWQgMCAmJiB2bUhhc1JvdXRlcih2bSkgPT09IHRydWUpIHtcbiAgICB3YXRjaCgoKSA9PiBwcm94eS4kcm91dGUuZnVsbFBhdGgsICgpID0+IHtcbiAgICAgIGlmIChoaWRlT25Sb3V0ZUNoYW5nZS52YWx1ZSA9PT0gdHJ1ZSAmJiBzaG93aW5nLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGhpZGUoKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBwcm9jZXNzT25Nb3VudCA9PT0gdHJ1ZSAmJiBvbk1vdW50ZWQoKCkgPT4ge1xuICAgIHByb2Nlc3NNb2RlbENoYW5nZShwcm9wcy5tb2RlbFZhbHVlKVxuICB9KVxuXG4gIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kc1xuICBjb25zdCBwdWJsaWNNZXRob2RzID0geyBzaG93LCBoaWRlLCB0b2dnbGUgfVxuICBPYmplY3QuYXNzaWduKHByb3h5LCBwdWJsaWNNZXRob2RzKVxuXG4gIHJldHVybiBwdWJsaWNNZXRob2RzXG59XG4iLCJpbXBvcnQgeyBnZXRQYXJlbnRQcm94eSB9IGZyb20gJy4uL3ByaXZhdGUudm0vdm0uanMnXG5cbmV4cG9ydCBjb25zdCBwb3J0YWxQcm94eUxpc3QgPSBbXVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UG9ydGFsUHJveHkgKGVsKSB7XG4gIHJldHVybiBwb3J0YWxQcm94eUxpc3QuZmluZChwcm94eSA9PlxuICAgIHByb3h5LmNvbnRlbnRFbCAhPT0gbnVsbFxuICAgICYmIHByb3h5LmNvbnRlbnRFbC5jb250YWlucyhlbClcbiAgKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xvc2VQb3J0YWxNZW51cyAocHJveHksIGV2dCkge1xuICBkbyB7XG4gICAgaWYgKHByb3h5LiRvcHRpb25zLm5hbWUgPT09ICdRTWVudScpIHtcbiAgICAgIHByb3h5LmhpZGUoZXZ0KVxuXG4gICAgICAvLyBpcyB0aGlzIGEgcG9pbnQgb2Ygc2VwYXJhdGlvbj9cbiAgICAgIGlmIChwcm94eS4kcHJvcHMuc2VwYXJhdGVDbG9zZVBvcHVwID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBnZXRQYXJlbnRQcm94eShwcm94eSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAocHJveHkuX19xUG9ydGFsID09PSB0cnVlKSB7XG4gICAgICAvLyB0cmVhdCBpdCBhcyBwb2ludCBvZiBzZXBhcmF0aW9uIGlmIHBhcmVudCBpcyBRUG9wdXBQcm94eVxuICAgICAgLy8gKHNvIG1vYmlsZSBtYXRjaGVzIGRlc2t0b3AgYmVoYXZpb3IpXG4gICAgICAvLyBhbmQgaGlkZSBpdCB0b29cbiAgICAgIGNvbnN0IHBhcmVudCA9IGdldFBhcmVudFByb3h5KHByb3h5KVxuXG4gICAgICBpZiAocGFyZW50Py4kb3B0aW9ucy5uYW1lID09PSAnUVBvcHVwUHJveHknKSB7XG4gICAgICAgIHByb3h5LmhpZGUoZXZ0KVxuICAgICAgICByZXR1cm4gcGFyZW50XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHByb3h5XG4gICAgICB9XG4gICAgfVxuXG4gICAgcHJveHkgPSBnZXRQYXJlbnRQcm94eShwcm94eSlcbiAgfSB3aGlsZSAocHJveHkgIT09IHZvaWQgMCAmJiBwcm94eSAhPT0gbnVsbClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb3NlUG9ydGFscyAocHJveHksIGV2dCwgZGVwdGgpIHtcbiAgd2hpbGUgKGRlcHRoICE9PSAwICYmIHByb3h5ICE9PSB2b2lkIDAgJiYgcHJveHkgIT09IG51bGwpIHtcbiAgICBpZiAocHJveHkuX19xUG9ydGFsID09PSB0cnVlKSB7XG4gICAgICBkZXB0aC0tXG5cbiAgICAgIGlmIChwcm94eS4kb3B0aW9ucy5uYW1lID09PSAnUU1lbnUnKSB7XG4gICAgICAgIHByb3h5ID0gY2xvc2VQb3J0YWxNZW51cyhwcm94eSwgZXZ0KVxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICBwcm94eS5oaWRlKGV2dClcbiAgICB9XG5cbiAgICBwcm94eSA9IGdldFBhcmVudFByb3h5KHByb3h5KVxuICB9XG59XG4iLCJpbXBvcnQgeyBoLCByZWYsIG9uVW5tb3VudGVkLCBUZWxlcG9ydCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgbm9vcCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50L2V2ZW50LmpzJ1xuaW1wb3J0IHsgYWRkRm9jdXNXYWl0RmxhZywgcmVtb3ZlRm9jdXNXYWl0RmxhZyB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuZm9jdXMvZm9jdXMtbWFuYWdlci5qcydcbmltcG9ydCB7IGNyZWF0ZUdsb2JhbE5vZGUsIHJlbW92ZUdsb2JhbE5vZGUgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNvbmZpZy9ub2Rlcy5qcydcbmltcG9ydCB7IHBvcnRhbFByb3h5TGlzdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucG9ydGFsL3BvcnRhbC5qcydcbmltcG9ydCB7IGluamVjdFByb3AgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmluamVjdC1vYmotcHJvcC9pbmplY3Qtb2JqLXByb3AuanMnXG5cbi8qKlxuICogTm9vcCBpbnRlcm5hbCBjb21wb25lbnQgdG8gZWFzZSB0ZXN0aW5nXG4gKiBvZiB0aGUgdGVsZXBvcnRlZCBjb250ZW50LlxuICpcbiAqIGNvbnN0IHdyYXBwZXIgPSBtb3VudChRRGlhbG9nLCB7IC4uLiB9KVxuICogY29uc3QgdGVsZXBvcnRlZFdyYXBwZXIgPSB3cmFwcGVyLmZpbmRDb21wb25lbnQoeyBuYW1lOiAnUVBvcnRhbCcgfSlcbiAqL1xuY29uc3QgUVBvcnRhbCA9IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRUG9ydGFsJyxcbiAgc2V0dXAgKF8sIHsgc2xvdHMgfSkge1xuICAgIHJldHVybiAoKSA9PiBzbG90cy5kZWZhdWx0KClcbiAgfVxufSlcblxuZnVuY3Rpb24gaXNPbkdsb2JhbERpYWxvZyAodm0pIHtcbiAgdm0gPSB2bS5wYXJlbnRcblxuICB3aGlsZSAodm0gIT09IHZvaWQgMCAmJiB2bSAhPT0gbnVsbCkge1xuICAgIGlmICh2bS50eXBlLm5hbWUgPT09ICdRR2xvYmFsRGlhbG9nJykge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgaWYgKHZtLnR5cGUubmFtZSA9PT0gJ1FEaWFsb2cnIHx8IHZtLnR5cGUubmFtZSA9PT0gJ1FNZW51Jykge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgdm0gPSB2bS5wYXJlbnRcbiAgfVxuXG4gIHJldHVybiBmYWxzZVxufVxuXG4vLyBXYXJuaW5nIVxuLy8gWW91IE1VU1Qgc3BlY2lmeSBcImluaGVyaXRBdHRyczogZmFsc2VcIiBpbiB5b3VyIGNvbXBvbmVudFxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAodm0sIGlubmVyUmVmLCByZW5kZXJQb3J0YWxDb250ZW50LCB0eXBlKSB7XG4gIC8vIHNob3dpbmcsIGluY2x1ZGluZyB3aGlsZSBpbiBzaG93L2hpZGUgdHJhbnNpdGlvblxuICBjb25zdCBwb3J0YWxJc0FjdGl2ZSA9IHJlZihmYWxzZSlcblxuICAvLyBzaG93aW5nICYgbm90IGluIGFueSBzaG93L2hpZGUgdHJhbnNpdGlvblxuICBjb25zdCBwb3J0YWxJc0FjY2Vzc2libGUgPSByZWYoZmFsc2UpXG5cbiAgaWYgKF9fUVVBU0FSX1NTUl9TRVJWRVJfXykge1xuICAgIHJldHVybiB7XG4gICAgICBwb3J0YWxJc0FjdGl2ZSxcbiAgICAgIHBvcnRhbElzQWNjZXNzaWJsZSxcblxuICAgICAgc2hvd1BvcnRhbDogbm9vcCxcbiAgICAgIGhpZGVQb3J0YWw6IG5vb3AsXG4gICAgICByZW5kZXJQb3J0YWw6IG5vb3BcbiAgICB9XG4gIH1cblxuICBsZXQgcG9ydGFsRWwgPSBudWxsXG4gIGNvbnN0IGZvY3VzT2JqID0ge31cbiAgY29uc3Qgb25HbG9iYWxEaWFsb2cgPSB0eXBlID09PSAnZGlhbG9nJyAmJiBpc09uR2xvYmFsRGlhbG9nKHZtKVxuXG4gIGZ1bmN0aW9uIHNob3dQb3J0YWwgKGlzUmVhZHkpIHtcbiAgICBpZiAoaXNSZWFkeSA9PT0gdHJ1ZSkge1xuICAgICAgcmVtb3ZlRm9jdXNXYWl0RmxhZyhmb2N1c09iailcbiAgICAgIHBvcnRhbElzQWNjZXNzaWJsZS52YWx1ZSA9IHRydWVcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHBvcnRhbElzQWNjZXNzaWJsZS52YWx1ZSA9IGZhbHNlXG5cbiAgICBpZiAocG9ydGFsSXNBY3RpdmUudmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICBpZiAob25HbG9iYWxEaWFsb2cgPT09IGZhbHNlICYmIHBvcnRhbEVsID09PSBudWxsKSB7XG4gICAgICAgIHBvcnRhbEVsID0gY3JlYXRlR2xvYmFsTm9kZShmYWxzZSwgdHlwZSlcbiAgICAgIH1cblxuICAgICAgcG9ydGFsSXNBY3RpdmUudmFsdWUgPSB0cnVlXG5cbiAgICAgIC8vIHJlZ2lzdGVyIHBvcnRhbFxuICAgICAgcG9ydGFsUHJveHlMaXN0LnB1c2godm0ucHJveHkpXG5cbiAgICAgIGFkZEZvY3VzV2FpdEZsYWcoZm9jdXNPYmopXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaGlkZVBvcnRhbCAoaXNSZWFkeSkge1xuICAgIHBvcnRhbElzQWNjZXNzaWJsZS52YWx1ZSA9IGZhbHNlXG5cbiAgICBpZiAoaXNSZWFkeSAhPT0gdHJ1ZSkgcmV0dXJuXG5cbiAgICByZW1vdmVGb2N1c1dhaXRGbGFnKGZvY3VzT2JqKVxuICAgIHBvcnRhbElzQWN0aXZlLnZhbHVlID0gZmFsc2VcblxuICAgIC8vIHVucmVnaXN0ZXIgcG9ydGFsXG4gICAgY29uc3QgaW5kZXggPSBwb3J0YWxQcm94eUxpc3QuaW5kZXhPZih2bS5wcm94eSlcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICBwb3J0YWxQcm94eUxpc3Quc3BsaWNlKGluZGV4LCAxKVxuICAgIH1cblxuICAgIGlmIChwb3J0YWxFbCAhPT0gbnVsbCkge1xuICAgICAgcmVtb3ZlR2xvYmFsTm9kZShwb3J0YWxFbClcbiAgICAgIHBvcnRhbEVsID0gbnVsbFxuICAgIH1cbiAgfVxuXG4gIG9uVW5tb3VudGVkKCgpID0+IHsgaGlkZVBvcnRhbCh0cnVlKSB9KVxuXG4gIC8vIG5lZWRlZCBmb3IgcG9ydGFsIHZtIGRldGVjdGlvblxuICB2bS5wcm94eS5fX3FQb3J0YWwgPSB0cnVlXG5cbiAgLy8gcHVibGljIHdheSBvZiBhY2Nlc3NpbmcgdGhlIHJlbmRlcmVkIGNvbnRlbnRcbiAgaW5qZWN0UHJvcCh2bS5wcm94eSwgJ2NvbnRlbnRFbCcsICgpID0+IGlubmVyUmVmLnZhbHVlKVxuXG4gIHJldHVybiB7XG4gICAgc2hvd1BvcnRhbCxcbiAgICBoaWRlUG9ydGFsLFxuXG4gICAgcG9ydGFsSXNBY3RpdmUsXG4gICAgcG9ydGFsSXNBY2Nlc3NpYmxlLFxuXG4gICAgcmVuZGVyUG9ydGFsOiAoKSA9PiAoXG4gICAgICBvbkdsb2JhbERpYWxvZyA9PT0gdHJ1ZVxuICAgICAgICA/IHJlbmRlclBvcnRhbENvbnRlbnQoKVxuICAgICAgICA6IChcbiAgICAgICAgICAgIHBvcnRhbElzQWN0aXZlLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgICAgID8gWyBoKFRlbGVwb3J0LCB7IHRvOiBwb3J0YWxFbCB9LCBoKFFQb3J0YWwsIHJlbmRlclBvcnRhbENvbnRlbnQpKSBdXG4gICAgICAgICAgICAgIDogdm9pZCAwXG4gICAgICAgICAgKVxuICAgIClcbiAgfVxufVxuIiwiaW1wb3J0IHsgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmV4cG9ydCBjb25zdCB1c2VUcmFuc2l0aW9uUHJvcHMgPSB7XG4gIHRyYW5zaXRpb25TaG93OiB7XG4gICAgdHlwZTogU3RyaW5nLFxuICAgIGRlZmF1bHQ6ICdmYWRlJ1xuICB9LFxuXG4gIHRyYW5zaXRpb25IaWRlOiB7XG4gICAgdHlwZTogU3RyaW5nLFxuICAgIGRlZmF1bHQ6ICdmYWRlJ1xuICB9LFxuXG4gIHRyYW5zaXRpb25EdXJhdGlvbjoge1xuICAgIHR5cGU6IFsgU3RyaW5nLCBOdW1iZXIgXSxcbiAgICBkZWZhdWx0OiAzMDBcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIGRlZmF1bHRTaG93Rm4gPSAoKSA9PiB7fSwgZGVmYXVsdEhpZGVGbiA9ICgpID0+IHt9KSB7XG4gIHJldHVybiB7XG4gICAgdHJhbnNpdGlvblByb3BzOiBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBzaG93ID0gYHEtdHJhbnNpdGlvbi0tJHsgcHJvcHMudHJhbnNpdGlvblNob3cgfHwgZGVmYXVsdFNob3dGbigpIH1gXG4gICAgICBjb25zdCBoaWRlID0gYHEtdHJhbnNpdGlvbi0tJHsgcHJvcHMudHJhbnNpdGlvbkhpZGUgfHwgZGVmYXVsdEhpZGVGbigpIH1gXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFwcGVhcjogdHJ1ZSxcblxuICAgICAgICBlbnRlckZyb21DbGFzczogYCR7IHNob3cgfS1lbnRlci1mcm9tYCxcbiAgICAgICAgZW50ZXJBY3RpdmVDbGFzczogYCR7IHNob3cgfS1lbnRlci1hY3RpdmVgLFxuICAgICAgICBlbnRlclRvQ2xhc3M6IGAkeyBzaG93IH0tZW50ZXItdG9gLFxuXG4gICAgICAgIGxlYXZlRnJvbUNsYXNzOiBgJHsgaGlkZSB9LWxlYXZlLWZyb21gLFxuICAgICAgICBsZWF2ZUFjdGl2ZUNsYXNzOiBgJHsgaGlkZSB9LWxlYXZlLWFjdGl2ZWAsXG4gICAgICAgIGxlYXZlVG9DbGFzczogYCR7IGhpZGUgfS1sZWF2ZS10b2BcbiAgICAgIH1cbiAgICB9KSxcblxuICAgIHRyYW5zaXRpb25TdHlsZTogY29tcHV0ZWQoKCkgPT4gYC0tcS10cmFuc2l0aW9uLWR1cmF0aW9uOiAkeyBwcm9wcy50cmFuc2l0aW9uRHVyYXRpb24gfW1zYClcbiAgfVxufVxuIiwiaW1wb3J0IHsgbmV4dFRpY2ssIG9uRGVhY3RpdmF0ZWQsIG9uQmVmb3JlVW5tb3VudCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyB2bUlzRGVzdHJveWVkIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS52bS92bS5qcydcblxuLypcbiAqIFVzYWdlOlxuICogICAgcmVnaXN0ZXJUaWNrKGZuKVxuICogICAgcmVtb3ZlVGljaygpXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICBsZXQgdGlja0ZuXG4gIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICBmdW5jdGlvbiByZW1vdmVUaWNrICgpIHtcbiAgICB0aWNrRm4gPSB2b2lkIDBcbiAgfVxuXG4gIG9uRGVhY3RpdmF0ZWQocmVtb3ZlVGljaylcbiAgb25CZWZvcmVVbm1vdW50KHJlbW92ZVRpY2spXG5cbiAgcmV0dXJuIHtcbiAgICByZW1vdmVUaWNrLFxuXG4gICAgcmVnaXN0ZXJUaWNrIChmbikge1xuICAgICAgdGlja0ZuID0gZm5cblxuICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICBpZiAodGlja0ZuID09PSBmbikge1xuICAgICAgICAgIC8vIHdlIGFsc28gY2hlY2sgaWYgVk0gaXMgZGVzdHJveWVkLCBzaW5jZSBpZiBpdFxuICAgICAgICAgIC8vIGdvdCB0byB0cmlnZ2VyIG9uZSBuZXh0VGljaygpIHdlIGNhbm5vdCBzdG9wIGl0XG4gICAgICAgICAgdm1Jc0Rlc3Ryb3llZCh2bSkgPT09IGZhbHNlICYmIHRpY2tGbigpXG4gICAgICAgICAgdGlja0ZuID0gdm9pZCAwXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBvbkRlYWN0aXZhdGVkLCBvbkJlZm9yZVVubW91bnQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgdm1Jc0Rlc3Ryb3llZCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUudm0vdm0uanMnXG5cbi8qXG4gKiBVc2FnZTpcbiAqICAgIHJlZ2lzdGVyVGltZW91dChmblssIGRlbGF5XSlcbiAqICAgIHJlbW92ZVRpbWVvdXQoKVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgbGV0IHRpbWVyID0gbnVsbFxuICBjb25zdCB2bSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgZnVuY3Rpb24gcmVtb3ZlVGltZW91dCAoKSB7XG4gICAgaWYgKHRpbWVyICE9PSBudWxsKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICB0aW1lciA9IG51bGxcbiAgICB9XG4gIH1cblxuICBvbkRlYWN0aXZhdGVkKHJlbW92ZVRpbWVvdXQpXG4gIG9uQmVmb3JlVW5tb3VudChyZW1vdmVUaW1lb3V0KVxuXG4gIHJldHVybiB7XG4gICAgcmVtb3ZlVGltZW91dCxcblxuICAgIHJlZ2lzdGVyVGltZW91dCAoZm4sIGRlbGF5KSB7XG4gICAgICByZW1vdmVUaW1lb3V0KClcblxuICAgICAgaWYgKHZtSXNEZXN0cm95ZWQodm0pID09PSBmYWxzZSkge1xuICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRpbWVyID0gbnVsbFxuICAgICAgICAgIGZuKClcbiAgICAgICAgfSwgZGVsYXkpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBjbGllbnQgfSBmcm9tICcuLi8uLi9wbHVnaW5zL3BsYXRmb3JtL1BsYXRmb3JtLmpzJ1xuaW1wb3J0IHsgaXNLZXlDb2RlIH0gZnJvbSAnLi4vcHJpdmF0ZS5rZXlib2FyZC9rZXktY29tcG9zaXRpb24uanMnXG5cbmNvbnN0IGhhbmRsZXJzID0gW11cbmxldCBlc2NEb3duXG5cbmZ1bmN0aW9uIG9uS2V5ZG93biAoZXZ0KSB7XG4gIGVzY0Rvd24gPSBldnQua2V5Q29kZSA9PT0gMjdcbn1cblxuZnVuY3Rpb24gb25CbHVyICgpIHtcbiAgaWYgKGVzY0Rvd24gPT09IHRydWUpIHtcbiAgICBlc2NEb3duID0gZmFsc2VcbiAgfVxufVxuXG5mdW5jdGlvbiBvbktleXVwIChldnQpIHtcbiAgaWYgKGVzY0Rvd24gPT09IHRydWUpIHtcbiAgICBlc2NEb3duID0gZmFsc2VcblxuICAgIGlmIChpc0tleUNvZGUoZXZ0LCAyNykgPT09IHRydWUpIHtcbiAgICAgIGhhbmRsZXJzWyBoYW5kbGVycy5sZW5ndGggLSAxIF0oZXZ0KVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGUgKGFjdGlvbikge1xuICB3aW5kb3dbIGFjdGlvbiBdKCdrZXlkb3duJywgb25LZXlkb3duKVxuICB3aW5kb3dbIGFjdGlvbiBdKCdibHVyJywgb25CbHVyKVxuICB3aW5kb3dbIGFjdGlvbiBdKCdrZXl1cCcsIG9uS2V5dXApXG4gIGVzY0Rvd24gPSBmYWxzZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkRXNjYXBlS2V5IChmbikge1xuICBpZiAoY2xpZW50LmlzLmRlc2t0b3AgPT09IHRydWUpIHtcbiAgICBoYW5kbGVycy5wdXNoKGZuKVxuXG4gICAgaWYgKGhhbmRsZXJzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgdXBkYXRlKCdhZGRFdmVudExpc3RlbmVyJylcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUVzY2FwZUtleSAoZm4pIHtcbiAgY29uc3QgaW5kZXggPSBoYW5kbGVycy5pbmRleE9mKGZuKVxuICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgaGFuZGxlcnMuc3BsaWNlKGluZGV4LCAxKVxuXG4gICAgaWYgKGhhbmRsZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdXBkYXRlKCdyZW1vdmVFdmVudExpc3RlbmVyJylcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IGNsaWVudCB9IGZyb20gJy4uLy4uL3BsdWdpbnMvcGxhdGZvcm0vUGxhdGZvcm0uanMnXG5cbmNvbnN0IGhhbmRsZXJzID0gW11cblxuZnVuY3Rpb24gdHJpZ2dlciAoZSkge1xuICBoYW5kbGVyc1sgaGFuZGxlcnMubGVuZ3RoIC0gMSBdKGUpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRGb2N1c291dCAoZm4pIHtcbiAgaWYgKGNsaWVudC5pcy5kZXNrdG9wID09PSB0cnVlKSB7XG4gICAgaGFuZGxlcnMucHVzaChmbilcblxuICAgIGlmIChoYW5kbGVycy5sZW5ndGggPT09IDEpIHtcbiAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNpbicsIHRyaWdnZXIpXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVGb2N1c291dCAoZm4pIHtcbiAgY29uc3QgaW5kZXggPSBoYW5kbGVycy5pbmRleE9mKGZuKVxuICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgaGFuZGxlcnMuc3BsaWNlKGluZGV4LCAxKVxuXG4gICAgaWYgKGhhbmRsZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1c2luJywgdHJpZ2dlcilcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IGxpc3Rlbk9wdHMgfSBmcm9tICcuLi9ldmVudC9ldmVudC5qcydcbmltcG9ydCB7IHBvcnRhbFByb3h5TGlzdCB9IGZyb20gJy4uL3ByaXZhdGUucG9ydGFsL3BvcnRhbC5qcydcblxubGV0IHRpbWVyID0gbnVsbFxuXG5jb25zdFxuICB7IG5vdFBhc3NpdmVDYXB0dXJlIH0gPSBsaXN0ZW5PcHRzLFxuICByZWdpc3RlcmVkTGlzdCA9IFtdXG5cbmZ1bmN0aW9uIGdsb2JhbEhhbmRsZXIgKGV2dCkge1xuICBpZiAodGltZXIgIT09IG51bGwpIHtcbiAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgdGltZXIgPSBudWxsXG4gIH1cblxuICBjb25zdCB0YXJnZXQgPSBldnQudGFyZ2V0XG5cbiAgaWYgKFxuICAgIHRhcmdldCA9PT0gdm9pZCAwXG4gICAgfHwgdGFyZ2V0Lm5vZGVUeXBlID09PSA4XG4gICAgfHwgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbm8tcG9pbnRlci1ldmVudHMnKSA9PT0gdHJ1ZVxuICApIHJldHVyblxuXG4gIC8vIGNoZWNrIGxhc3QgcG9ydGFsIHZtIGlmIGl0J3NcbiAgLy8gYSBRRGlhbG9nIGFuZCBub3QgaW4gc2VhbWxlc3MgbW9kZVxuICBsZXQgcG9ydGFsSW5kZXggPSBwb3J0YWxQcm94eUxpc3QubGVuZ3RoIC0gMVxuXG4gIHdoaWxlIChwb3J0YWxJbmRleCA+PSAwKSB7XG4gICAgY29uc3QgcHJveHkgPSBwb3J0YWxQcm94eUxpc3RbIHBvcnRhbEluZGV4IF0uJFxuXG4gICAgLy8gc2tpcCBRVG9vbHRpcCBwb3J0YWxzXG4gICAgaWYgKHByb3h5LnR5cGUubmFtZSA9PT0gJ1FUb29sdGlwJykge1xuICAgICAgcG9ydGFsSW5kZXgtLVxuICAgICAgY29udGludWVcbiAgICB9XG5cbiAgICBpZiAocHJveHkudHlwZS5uYW1lICE9PSAnUURpYWxvZycpIHtcbiAgICAgIGJyZWFrXG4gICAgfVxuXG4gICAgaWYgKHByb3h5LnByb3BzLnNlYW1sZXNzICE9PSB0cnVlKSByZXR1cm5cblxuICAgIHBvcnRhbEluZGV4LS1cbiAgfVxuXG4gIGZvciAobGV0IGkgPSByZWdpc3RlcmVkTGlzdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGNvbnN0IHN0YXRlID0gcmVnaXN0ZXJlZExpc3RbIGkgXVxuXG4gICAgaWYgKFxuICAgICAgKFxuICAgICAgICBzdGF0ZS5hbmNob3JFbC52YWx1ZSA9PT0gbnVsbFxuICAgICAgICB8fCBzdGF0ZS5hbmNob3JFbC52YWx1ZS5jb250YWlucyh0YXJnZXQpID09PSBmYWxzZVxuICAgICAgKVxuICAgICAgJiYgKFxuICAgICAgICB0YXJnZXQgPT09IGRvY3VtZW50LmJvZHlcbiAgICAgICAgfHwgKFxuICAgICAgICAgIHN0YXRlLmlubmVyUmVmLnZhbHVlICE9PSBudWxsXG4gICAgICAgICAgJiYgc3RhdGUuaW5uZXJSZWYudmFsdWUuY29udGFpbnModGFyZ2V0KSA9PT0gZmFsc2VcbiAgICAgICAgKVxuICAgICAgKVxuICAgICkge1xuICAgICAgLy8gbWFyayB0aGUgZXZlbnQgYXMgYmVpbmcgcHJvY2Vzc2VkIGJ5IGNsaWNrT3V0c2lkZVxuICAgICAgLy8gdXNlZCB0byBwcmV2ZW50IHJlZm9jdXMgYWZ0ZXIgbWVudSBjbG9zZVxuICAgICAgZXZ0LnFDbGlja091dHNpZGUgPSB0cnVlXG4gICAgICBzdGF0ZS5vbkNsaWNrT3V0c2lkZShldnQpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRDbGlja091dHNpZGUgKGNsaWNrT3V0c2lkZVByb3BzKSB7XG4gIHJlZ2lzdGVyZWRMaXN0LnB1c2goY2xpY2tPdXRzaWRlUHJvcHMpXG5cbiAgaWYgKHJlZ2lzdGVyZWRMaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGdsb2JhbEhhbmRsZXIsIG5vdFBhc3NpdmVDYXB0dXJlKVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBnbG9iYWxIYW5kbGVyLCBub3RQYXNzaXZlQ2FwdHVyZSlcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlQ2xpY2tPdXRzaWRlIChjbGlja091dHNpZGVQcm9wcykge1xuICBjb25zdCBpbmRleCA9IHJlZ2lzdGVyZWRMaXN0LmZpbmRJbmRleChoID0+IGggPT09IGNsaWNrT3V0c2lkZVByb3BzKVxuXG4gIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICByZWdpc3RlcmVkTGlzdC5zcGxpY2UoaW5kZXgsIDEpXG5cbiAgICBpZiAocmVnaXN0ZXJlZExpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICBpZiAodGltZXIgIT09IG51bGwpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgICAgICB0aW1lciA9IG51bGxcbiAgICAgIH1cblxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZ2xvYmFsSGFuZGxlciwgbm90UGFzc2l2ZUNhcHR1cmUpXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgZ2xvYmFsSGFuZGxlciwgbm90UGFzc2l2ZUNhcHR1cmUpXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBnZXRTY3JvbGxiYXJXaWR0aCB9IGZyb20gJy4uL3Njcm9sbC9zY3JvbGwuanMnXG5pbXBvcnQgeyBjbGllbnQgfSBmcm9tICcuLi8uLi9wbHVnaW5zL3BsYXRmb3JtL1BsYXRmb3JtLmpzJ1xuXG5sZXQgdnBMZWZ0LCB2cFRvcFxuXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVQb3NpdGlvbiAocG9zKSB7XG4gIGNvbnN0IHBhcnRzID0gcG9zLnNwbGl0KCcgJylcbiAgaWYgKHBhcnRzLmxlbmd0aCAhPT0gMikge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIGlmIChbICd0b3AnLCAnY2VudGVyJywgJ2JvdHRvbScgXS5pbmNsdWRlcyhwYXJ0c1sgMCBdKSAhPT0gdHJ1ZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0FuY2hvci9TZWxmIHBvc2l0aW9uIG11c3Qgc3RhcnQgd2l0aCBvbmUgb2YgdG9wL2NlbnRlci9ib3R0b20nKVxuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIGlmIChbICdsZWZ0JywgJ21pZGRsZScsICdyaWdodCcsICdzdGFydCcsICdlbmQnIF0uaW5jbHVkZXMocGFydHNbIDEgXSkgIT09IHRydWUpIHtcbiAgICBjb25zb2xlLmVycm9yKCdBbmNob3IvU2VsZiBwb3NpdGlvbiBtdXN0IGVuZCB3aXRoIG9uZSBvZiBsZWZ0L21pZGRsZS9yaWdodC9zdGFydC9lbmQnKVxuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIHJldHVybiB0cnVlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZU9mZnNldCAodmFsKSB7XG4gIGlmICghdmFsKSB7IHJldHVybiB0cnVlIH1cbiAgaWYgKHZhbC5sZW5ndGggIT09IDIpIHsgcmV0dXJuIGZhbHNlIH1cbiAgaWYgKHR5cGVvZiB2YWxbIDAgXSAhPT0gJ251bWJlcicgfHwgdHlwZW9mIHZhbFsgMSBdICE9PSAnbnVtYmVyJykge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIHJldHVybiB0cnVlXG59XG5cbmNvbnN0IGhvcml6b250YWxQb3MgPSB7XG4gICdzdGFydCNsdHInOiAnbGVmdCcsXG4gICdzdGFydCNydGwnOiAncmlnaHQnLFxuICAnZW5kI2x0cic6ICdyaWdodCcsXG4gICdlbmQjcnRsJzogJ2xlZnQnXG59XG5cbjtbICdsZWZ0JywgJ21pZGRsZScsICdyaWdodCcgXS5mb3JFYWNoKHBvcyA9PiB7XG4gIGhvcml6b250YWxQb3NbIGAkeyBwb3MgfSNsdHJgIF0gPSBwb3NcbiAgaG9yaXpvbnRhbFBvc1sgYCR7IHBvcyB9I3J0bGAgXSA9IHBvc1xufSlcblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlUG9zaXRpb24gKHBvcywgcnRsKSB7XG4gIGNvbnN0IHBhcnRzID0gcG9zLnNwbGl0KCcgJylcbiAgcmV0dXJuIHtcbiAgICB2ZXJ0aWNhbDogcGFydHNbIDAgXSxcbiAgICBob3Jpem9udGFsOiBob3Jpem9udGFsUG9zWyBgJHsgcGFydHNbIDEgXSB9IyR7IHJ0bCA9PT0gdHJ1ZSA/ICdydGwnIDogJ2x0cicgfWAgXVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBbmNob3JQcm9wcyAoZWwsIG9mZnNldCkge1xuICBsZXQgeyB0b3AsIGxlZnQsIHJpZ2h0LCBib3R0b20sIHdpZHRoLCBoZWlnaHQgfSA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cbiAgaWYgKG9mZnNldCAhPT0gdm9pZCAwKSB7XG4gICAgdG9wIC09IG9mZnNldFsgMSBdXG4gICAgbGVmdCAtPSBvZmZzZXRbIDAgXVxuICAgIGJvdHRvbSArPSBvZmZzZXRbIDEgXVxuICAgIHJpZ2h0ICs9IG9mZnNldFsgMCBdXG5cbiAgICB3aWR0aCArPSBvZmZzZXRbIDAgXVxuICAgIGhlaWdodCArPSBvZmZzZXRbIDEgXVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB0b3AsIGJvdHRvbSwgaGVpZ2h0LFxuICAgIGxlZnQsIHJpZ2h0LCB3aWR0aCxcbiAgICBtaWRkbGU6IGxlZnQgKyAocmlnaHQgLSBsZWZ0KSAvIDIsXG4gICAgY2VudGVyOiB0b3AgKyAoYm90dG9tIC0gdG9wKSAvIDJcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRBYnNvbHV0ZUFuY2hvclByb3BzIChlbCwgYWJzb2x1dGVPZmZzZXQsIG9mZnNldCkge1xuICBsZXQgeyB0b3AsIGxlZnQgfSA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cbiAgdG9wICs9IGFic29sdXRlT2Zmc2V0LnRvcFxuICBsZWZ0ICs9IGFic29sdXRlT2Zmc2V0LmxlZnRcblxuICBpZiAob2Zmc2V0ICE9PSB2b2lkIDApIHtcbiAgICB0b3AgKz0gb2Zmc2V0WyAxIF1cbiAgICBsZWZ0ICs9IG9mZnNldFsgMCBdXG4gIH1cblxuICByZXR1cm4ge1xuICAgIHRvcCwgYm90dG9tOiB0b3AgKyAxLCBoZWlnaHQ6IDEsXG4gICAgbGVmdCwgcmlnaHQ6IGxlZnQgKyAxLCB3aWR0aDogMSxcbiAgICBtaWRkbGU6IGxlZnQsXG4gICAgY2VudGVyOiB0b3BcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRUYXJnZXRQcm9wcyAod2lkdGgsIGhlaWdodCkge1xuICByZXR1cm4ge1xuICAgIHRvcDogMCxcbiAgICBjZW50ZXI6IGhlaWdodCAvIDIsXG4gICAgYm90dG9tOiBoZWlnaHQsXG4gICAgbGVmdDogMCxcbiAgICBtaWRkbGU6IHdpZHRoIC8gMixcbiAgICByaWdodDogd2lkdGhcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRUb3BMZWZ0UHJvcHMgKGFuY2hvclByb3BzLCB0YXJnZXRQcm9wcywgYW5jaG9yT3JpZ2luLCBzZWxmT3JpZ2luKSB7XG4gIHJldHVybiB7XG4gICAgdG9wOiBhbmNob3JQcm9wc1sgYW5jaG9yT3JpZ2luLnZlcnRpY2FsIF0gLSB0YXJnZXRQcm9wc1sgc2VsZk9yaWdpbi52ZXJ0aWNhbCBdLFxuICAgIGxlZnQ6IGFuY2hvclByb3BzWyBhbmNob3JPcmlnaW4uaG9yaXpvbnRhbCBdIC0gdGFyZ2V0UHJvcHNbIHNlbGZPcmlnaW4uaG9yaXpvbnRhbCBdXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFBvc2l0aW9uIChjZmcsIHJldHJ5TnVtYmVyID0gMCkge1xuICBpZiAoXG4gICAgY2ZnLnRhcmdldEVsID09PSBudWxsXG4gICAgfHwgY2ZnLmFuY2hvckVsID09PSBudWxsXG4gICAgfHwgcmV0cnlOdW1iZXIgPiA1IC8vIHdlIHNob3VsZCB0cnkgb25seSBhIGZldyB0aW1lc1xuICApIHJldHVyblxuXG4gIC8vIHNvbWUgYnJvd3NlcnMgcmVwb3J0IHplcm8gaGVpZ2h0IG9yIHdpZHRoIGJlY2F1c2VcbiAgLy8gd2UgYXJlIHRyeWluZyB0b28gZWFybHkgdG8gZ2V0IHRoZXNlIGRpbWVuc2lvbnNcbiAgaWYgKGNmZy50YXJnZXRFbC5vZmZzZXRIZWlnaHQgPT09IDAgfHwgY2ZnLnRhcmdldEVsLm9mZnNldFdpZHRoID09PSAwKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBzZXRQb3NpdGlvbihjZmcsIHJldHJ5TnVtYmVyICsgMSlcbiAgICB9LCAxMClcbiAgICByZXR1cm5cbiAgfVxuXG4gIGNvbnN0IHtcbiAgICB0YXJnZXRFbCxcbiAgICBvZmZzZXQsXG4gICAgYW5jaG9yRWwsXG4gICAgYW5jaG9yT3JpZ2luLFxuICAgIHNlbGZPcmlnaW4sXG4gICAgYWJzb2x1dGVPZmZzZXQsXG4gICAgZml0LFxuICAgIGNvdmVyLFxuICAgIG1heEhlaWdodCxcbiAgICBtYXhXaWR0aFxuICB9ID0gY2ZnXG5cbiAgaWYgKGNsaWVudC5pcy5pb3MgPT09IHRydWUgJiYgd2luZG93LnZpc3VhbFZpZXdwb3J0ICE9PSB2b2lkIDApIHtcbiAgICAvLyB1c2VzIHRoZSBxLXBvc2l0aW9uLWVuZ2luZSBDU1MgY2xhc3NcblxuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuYm9keS5zdHlsZVxuICAgIGNvbnN0IHsgb2Zmc2V0TGVmdDogbGVmdCwgb2Zmc2V0VG9wOiB0b3AgfSA9IHdpbmRvdy52aXN1YWxWaWV3cG9ydFxuXG4gICAgaWYgKGxlZnQgIT09IHZwTGVmdCkge1xuICAgICAgZWwuc2V0UHJvcGVydHkoJy0tcS1wZS1sZWZ0JywgbGVmdCArICdweCcpXG4gICAgICB2cExlZnQgPSBsZWZ0XG4gICAgfVxuICAgIGlmICh0b3AgIT09IHZwVG9wKSB7XG4gICAgICBlbC5zZXRQcm9wZXJ0eSgnLS1xLXBlLXRvcCcsIHRvcCArICdweCcpXG4gICAgICB2cFRvcCA9IHRvcFxuICAgIH1cbiAgfVxuXG4gIC8vIHNjcm9sbCBwb3NpdGlvbiBtaWdodCBjaGFuZ2VcbiAgLy8gaWYgbWF4LWhlaWdodC8td2lkdGggY2hhbmdlcywgc28gd2VcbiAgLy8gbmVlZCB0byByZXN0b3JlIGl0IGFmdGVyIHdlIGNhbGN1bGF0ZVxuICAvLyB0aGUgbmV3IHBvc2l0aW9uaW5nXG4gIGNvbnN0IHsgc2Nyb2xsTGVmdCwgc2Nyb2xsVG9wIH0gPSB0YXJnZXRFbFxuXG4gIGNvbnN0IGFuY2hvclByb3BzID0gYWJzb2x1dGVPZmZzZXQgPT09IHZvaWQgMFxuICAgID8gZ2V0QW5jaG9yUHJvcHMoYW5jaG9yRWwsIGNvdmVyID09PSB0cnVlID8gWyAwLCAwIF0gOiBvZmZzZXQpXG4gICAgOiBnZXRBYnNvbHV0ZUFuY2hvclByb3BzKGFuY2hvckVsLCBhYnNvbHV0ZU9mZnNldCwgb2Zmc2V0KVxuXG4gIC8qKlxuICAgKiBXZSBcInJlc2V0XCIgdGhlIGNyaXRpY2FsIENTUyBwcm9wZXJ0aWVzXG4gICAqIHNvIHdlIGNhbiB0YWtlIGFuIGFjY3VyYXRlIG1lYXN1cmVtZW50LlxuICAgKlxuICAgKiBFbnN1cmUgdGhhdCB0YXJnZXRFbCBoYXMgYSBtYXgtd2lkdGggJiBtYXgtaGVpZ2h0XG4gICAqIHNldCBpbiBDU1MgYW5kIHRoYXQgdGhlIHZhbHVlIGRvZXMgTk9UIGV4Y2VlZHMgMTAwdncvdmguXG4gICAqIEFsbCB1c2VycyBvZiB0aGUgcG9zaXRpb24tZW5naW5lIChjdXJyZW50bHkgUU1lbnUgJiBRVG9vbHRpcClcbiAgICogaGF2ZSBDU1MgZm9yIHRoaXMuXG4gICAqL1xuICBPYmplY3QuYXNzaWduKHRhcmdldEVsLnN0eWxlLCB7XG4gICAgdG9wOiAwLFxuICAgIGxlZnQ6IDAsXG4gICAgbWluV2lkdGg6IG51bGwsXG4gICAgbWluSGVpZ2h0OiBudWxsLFxuICAgIG1heFdpZHRoLFxuICAgIG1heEhlaWdodCxcbiAgICB2aXNpYmlsaXR5OiAndmlzaWJsZSdcbiAgfSlcblxuICBjb25zdCB7IG9mZnNldFdpZHRoOiBvcmlnRWxXaWR0aCwgb2Zmc2V0SGVpZ2h0OiBvcmlnRWxIZWlnaHQgfSA9IHRhcmdldEVsXG4gIGNvbnN0IHsgZWxXaWR0aCwgZWxIZWlnaHQgfSA9IGZpdCA9PT0gdHJ1ZSB8fCBjb3ZlciA9PT0gdHJ1ZVxuICAgID8geyBlbFdpZHRoOiBNYXRoLm1heChhbmNob3JQcm9wcy53aWR0aCwgb3JpZ0VsV2lkdGgpLCBlbEhlaWdodDogY292ZXIgPT09IHRydWUgPyBNYXRoLm1heChhbmNob3JQcm9wcy5oZWlnaHQsIG9yaWdFbEhlaWdodCkgOiBvcmlnRWxIZWlnaHQgfVxuICAgIDogeyBlbFdpZHRoOiBvcmlnRWxXaWR0aCwgZWxIZWlnaHQ6IG9yaWdFbEhlaWdodCB9XG5cbiAgbGV0IGVsU3R5bGUgPSB7IG1heFdpZHRoLCBtYXhIZWlnaHQgfVxuXG4gIGlmIChmaXQgPT09IHRydWUgfHwgY292ZXIgPT09IHRydWUpIHtcbiAgICBlbFN0eWxlLm1pbldpZHRoID0gYW5jaG9yUHJvcHMud2lkdGggKyAncHgnXG4gICAgaWYgKGNvdmVyID09PSB0cnVlKSB7XG4gICAgICBlbFN0eWxlLm1pbkhlaWdodCA9IGFuY2hvclByb3BzLmhlaWdodCArICdweCdcbiAgICB9XG4gIH1cblxuICBPYmplY3QuYXNzaWduKHRhcmdldEVsLnN0eWxlLCBlbFN0eWxlKVxuXG4gIGNvbnN0IHRhcmdldFByb3BzID0gZ2V0VGFyZ2V0UHJvcHMoZWxXaWR0aCwgZWxIZWlnaHQpXG4gIGxldCBwcm9wcyA9IGdldFRvcExlZnRQcm9wcyhhbmNob3JQcm9wcywgdGFyZ2V0UHJvcHMsIGFuY2hvck9yaWdpbiwgc2VsZk9yaWdpbilcblxuICBpZiAoYWJzb2x1dGVPZmZzZXQgPT09IHZvaWQgMCB8fCBvZmZzZXQgPT09IHZvaWQgMCkge1xuICAgIGFwcGx5Qm91bmRhcmllcyhwcm9wcywgYW5jaG9yUHJvcHMsIHRhcmdldFByb3BzLCBhbmNob3JPcmlnaW4sIHNlbGZPcmlnaW4pXG4gIH1cbiAgZWxzZSB7IC8vIHdlIGhhdmUgdG91Y2ggcG9zaXRpb24gb3IgY29udGV4dCBtZW51IHdpdGggb2Zmc2V0XG4gICAgY29uc3QgeyB0b3AsIGxlZnQgfSA9IHByb3BzIC8vIGNhY2hlIGluaXRpYWwgdmFsdWVzXG5cbiAgICAvLyBhcHBseSBpbml0aWFsIGJvdW5kYXJpZXNcbiAgICBhcHBseUJvdW5kYXJpZXMocHJvcHMsIGFuY2hvclByb3BzLCB0YXJnZXRQcm9wcywgYW5jaG9yT3JpZ2luLCBzZWxmT3JpZ2luKVxuXG4gICAgbGV0IGhhc0NoYW5nZWQgPSBmYWxzZVxuXG4gICAgLy8gZGlkIGl0IGZsaXAgdmVydGljYWxseT9cbiAgICBpZiAocHJvcHMudG9wICE9PSB0b3ApIHtcbiAgICAgIGhhc0NoYW5nZWQgPSB0cnVlXG4gICAgICBjb25zdCBvZmZzZXRZID0gMiAqIG9mZnNldFsgMSBdXG4gICAgICBhbmNob3JQcm9wcy5jZW50ZXIgPSBhbmNob3JQcm9wcy50b3AgLT0gb2Zmc2V0WVxuICAgICAgYW5jaG9yUHJvcHMuYm90dG9tIC09IG9mZnNldFkgKyAyXG4gICAgfVxuXG4gICAgLy8gZGlkIGl0IGZsaXAgaG9yaXpvbnRhbGx5P1xuICAgIGlmIChwcm9wcy5sZWZ0ICE9PSBsZWZ0KSB7XG4gICAgICBoYXNDaGFuZ2VkID0gdHJ1ZVxuICAgICAgY29uc3Qgb2Zmc2V0WCA9IDIgKiBvZmZzZXRbIDAgXVxuICAgICAgYW5jaG9yUHJvcHMubWlkZGxlID0gYW5jaG9yUHJvcHMubGVmdCAtPSBvZmZzZXRYXG4gICAgICBhbmNob3JQcm9wcy5yaWdodCAtPSBvZmZzZXRYICsgMlxuICAgIH1cblxuICAgIGlmIChoYXNDaGFuZ2VkID09PSB0cnVlKSB7XG4gICAgICAvLyByZS1jYWxjdWxhdGUgcHJvcHMgd2l0aCB0aGUgbmV3IGFuY2hvclxuICAgICAgcHJvcHMgPSBnZXRUb3BMZWZ0UHJvcHMoYW5jaG9yUHJvcHMsIHRhcmdldFByb3BzLCBhbmNob3JPcmlnaW4sIHNlbGZPcmlnaW4pXG5cbiAgICAgIC8vIGFuZCByZS1hcHBseSBib3VuZGFyaWVzXG4gICAgICBhcHBseUJvdW5kYXJpZXMocHJvcHMsIGFuY2hvclByb3BzLCB0YXJnZXRQcm9wcywgYW5jaG9yT3JpZ2luLCBzZWxmT3JpZ2luKVxuICAgIH1cbiAgfVxuXG4gIGVsU3R5bGUgPSB7XG4gICAgdG9wOiBwcm9wcy50b3AgKyAncHgnLFxuICAgIGxlZnQ6IHByb3BzLmxlZnQgKyAncHgnXG4gIH1cblxuICBpZiAocHJvcHMubWF4SGVpZ2h0ICE9PSB2b2lkIDApIHtcbiAgICBlbFN0eWxlLm1heEhlaWdodCA9IHByb3BzLm1heEhlaWdodCArICdweCdcblxuICAgIGlmIChhbmNob3JQcm9wcy5oZWlnaHQgPiBwcm9wcy5tYXhIZWlnaHQpIHtcbiAgICAgIGVsU3R5bGUubWluSGVpZ2h0ID0gZWxTdHlsZS5tYXhIZWlnaHRcbiAgICB9XG4gIH1cbiAgaWYgKHByb3BzLm1heFdpZHRoICE9PSB2b2lkIDApIHtcbiAgICBlbFN0eWxlLm1heFdpZHRoID0gcHJvcHMubWF4V2lkdGggKyAncHgnXG5cbiAgICBpZiAoYW5jaG9yUHJvcHMud2lkdGggPiBwcm9wcy5tYXhXaWR0aCkge1xuICAgICAgZWxTdHlsZS5taW5XaWR0aCA9IGVsU3R5bGUubWF4V2lkdGhcbiAgICB9XG4gIH1cblxuICBPYmplY3QuYXNzaWduKHRhcmdldEVsLnN0eWxlLCBlbFN0eWxlKVxuXG4gIC8vIHJlc3RvcmUgc2Nyb2xsIHBvc2l0aW9uXG4gIGlmICh0YXJnZXRFbC5zY3JvbGxUb3AgIT09IHNjcm9sbFRvcCkge1xuICAgIHRhcmdldEVsLnNjcm9sbFRvcCA9IHNjcm9sbFRvcFxuICB9XG4gIGlmICh0YXJnZXRFbC5zY3JvbGxMZWZ0ICE9PSBzY3JvbGxMZWZ0KSB7XG4gICAgdGFyZ2V0RWwuc2Nyb2xsTGVmdCA9IHNjcm9sbExlZnRcbiAgfVxufVxuXG5mdW5jdGlvbiBhcHBseUJvdW5kYXJpZXMgKHByb3BzLCBhbmNob3JQcm9wcywgdGFyZ2V0UHJvcHMsIGFuY2hvck9yaWdpbiwgc2VsZk9yaWdpbikge1xuICBjb25zdFxuICAgIGN1cnJlbnRIZWlnaHQgPSB0YXJnZXRQcm9wcy5ib3R0b20sXG4gICAgY3VycmVudFdpZHRoID0gdGFyZ2V0UHJvcHMucmlnaHQsXG4gICAgbWFyZ2luID0gZ2V0U2Nyb2xsYmFyV2lkdGgoKSxcbiAgICBpbm5lckhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCAtIG1hcmdpbixcbiAgICBpbm5lcldpZHRoID0gZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aFxuXG4gIGlmIChwcm9wcy50b3AgPCAwIHx8IHByb3BzLnRvcCArIGN1cnJlbnRIZWlnaHQgPiBpbm5lckhlaWdodCkge1xuICAgIGlmIChzZWxmT3JpZ2luLnZlcnRpY2FsID09PSAnY2VudGVyJykge1xuICAgICAgcHJvcHMudG9wID0gYW5jaG9yUHJvcHNbIGFuY2hvck9yaWdpbi52ZXJ0aWNhbCBdID4gaW5uZXJIZWlnaHQgLyAyXG4gICAgICAgID8gTWF0aC5tYXgoMCwgaW5uZXJIZWlnaHQgLSBjdXJyZW50SGVpZ2h0KVxuICAgICAgICA6IDBcbiAgICAgIHByb3BzLm1heEhlaWdodCA9IE1hdGgubWluKGN1cnJlbnRIZWlnaHQsIGlubmVySGVpZ2h0KVxuICAgIH1cbiAgICBlbHNlIGlmIChhbmNob3JQcm9wc1sgYW5jaG9yT3JpZ2luLnZlcnRpY2FsIF0gPiBpbm5lckhlaWdodCAvIDIpIHtcbiAgICAgIGNvbnN0IGFuY2hvclkgPSBNYXRoLm1pbihcbiAgICAgICAgaW5uZXJIZWlnaHQsXG4gICAgICAgIGFuY2hvck9yaWdpbi52ZXJ0aWNhbCA9PT0gJ2NlbnRlcidcbiAgICAgICAgICA/IGFuY2hvclByb3BzLmNlbnRlclxuICAgICAgICAgIDogKGFuY2hvck9yaWdpbi52ZXJ0aWNhbCA9PT0gc2VsZk9yaWdpbi52ZXJ0aWNhbCA/IGFuY2hvclByb3BzLmJvdHRvbSA6IGFuY2hvclByb3BzLnRvcClcbiAgICAgIClcbiAgICAgIHByb3BzLm1heEhlaWdodCA9IE1hdGgubWluKGN1cnJlbnRIZWlnaHQsIGFuY2hvclkpXG4gICAgICBwcm9wcy50b3AgPSBNYXRoLm1heCgwLCBhbmNob3JZIC0gY3VycmVudEhlaWdodClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBwcm9wcy50b3AgPSBNYXRoLm1heCgwLCBhbmNob3JPcmlnaW4udmVydGljYWwgPT09ICdjZW50ZXInXG4gICAgICAgID8gYW5jaG9yUHJvcHMuY2VudGVyXG4gICAgICAgIDogKGFuY2hvck9yaWdpbi52ZXJ0aWNhbCA9PT0gc2VsZk9yaWdpbi52ZXJ0aWNhbCA/IGFuY2hvclByb3BzLnRvcCA6IGFuY2hvclByb3BzLmJvdHRvbSlcbiAgICAgIClcbiAgICAgIHByb3BzLm1heEhlaWdodCA9IE1hdGgubWluKGN1cnJlbnRIZWlnaHQsIGlubmVySGVpZ2h0IC0gcHJvcHMudG9wKVxuICAgIH1cbiAgfVxuXG4gIGlmIChwcm9wcy5sZWZ0IDwgMCB8fCBwcm9wcy5sZWZ0ICsgY3VycmVudFdpZHRoID4gaW5uZXJXaWR0aCkge1xuICAgIHByb3BzLm1heFdpZHRoID0gTWF0aC5taW4oY3VycmVudFdpZHRoLCBpbm5lcldpZHRoKVxuICAgIGlmIChzZWxmT3JpZ2luLmhvcml6b250YWwgPT09ICdtaWRkbGUnKSB7XG4gICAgICBwcm9wcy5sZWZ0ID0gYW5jaG9yUHJvcHNbIGFuY2hvck9yaWdpbi5ob3Jpem9udGFsIF0gPiBpbm5lcldpZHRoIC8gMlxuICAgICAgICA/IE1hdGgubWF4KDAsIGlubmVyV2lkdGggLSBjdXJyZW50V2lkdGgpXG4gICAgICAgIDogMFxuICAgIH1cbiAgICBlbHNlIGlmIChhbmNob3JQcm9wc1sgYW5jaG9yT3JpZ2luLmhvcml6b250YWwgXSA+IGlubmVyV2lkdGggLyAyKSB7XG4gICAgICBjb25zdCBhbmNob3JYID0gTWF0aC5taW4oXG4gICAgICAgIGlubmVyV2lkdGgsXG4gICAgICAgIGFuY2hvck9yaWdpbi5ob3Jpem9udGFsID09PSAnbWlkZGxlJ1xuICAgICAgICAgID8gYW5jaG9yUHJvcHMubWlkZGxlXG4gICAgICAgICAgOiAoYW5jaG9yT3JpZ2luLmhvcml6b250YWwgPT09IHNlbGZPcmlnaW4uaG9yaXpvbnRhbCA/IGFuY2hvclByb3BzLnJpZ2h0IDogYW5jaG9yUHJvcHMubGVmdClcbiAgICAgIClcbiAgICAgIHByb3BzLm1heFdpZHRoID0gTWF0aC5taW4oY3VycmVudFdpZHRoLCBhbmNob3JYKVxuICAgICAgcHJvcHMubGVmdCA9IE1hdGgubWF4KDAsIGFuY2hvclggLSBwcm9wcy5tYXhXaWR0aClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBwcm9wcy5sZWZ0ID0gTWF0aC5tYXgoMCwgYW5jaG9yT3JpZ2luLmhvcml6b250YWwgPT09ICdtaWRkbGUnXG4gICAgICAgID8gYW5jaG9yUHJvcHMubWlkZGxlXG4gICAgICAgIDogKGFuY2hvck9yaWdpbi5ob3Jpem9udGFsID09PSBzZWxmT3JpZ2luLmhvcml6b250YWwgPyBhbmNob3JQcm9wcy5sZWZ0IDogYW5jaG9yUHJvcHMucmlnaHQpXG4gICAgICApXG4gICAgICBwcm9wcy5tYXhXaWR0aCA9IE1hdGgubWluKGN1cnJlbnRXaWR0aCwgaW5uZXJXaWR0aCAtIHByb3BzLmxlZnQpXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCB3YXRjaCwgVHJhbnNpdGlvbiwgb25CZWZvcmVVbm1vdW50LCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VBbmNob3IsIHsgdXNlQW5jaG9yUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1hbmNob3IvdXNlLWFuY2hvci5qcydcbmltcG9ydCB1c2VTY3JvbGxUYXJnZXQgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2Utc2Nyb2xsLXRhcmdldC91c2Utc2Nyb2xsLXRhcmdldC5qcydcbmltcG9ydCB1c2VNb2RlbFRvZ2dsZSwgeyB1c2VNb2RlbFRvZ2dsZVByb3BzLCB1c2VNb2RlbFRvZ2dsZUVtaXRzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtbW9kZWwtdG9nZ2xlL3VzZS1tb2RlbC10b2dnbGUuanMnXG5pbXBvcnQgdXNlRGFyaywgeyB1c2VEYXJrUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1kYXJrL3VzZS1kYXJrLmpzJ1xuaW1wb3J0IHVzZVBvcnRhbCBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1wb3J0YWwvdXNlLXBvcnRhbC5qcydcbmltcG9ydCB1c2VUcmFuc2l0aW9uLCB7IHVzZVRyYW5zaXRpb25Qcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLXRyYW5zaXRpb24vdXNlLXRyYW5zaXRpb24uanMnXG5pbXBvcnQgdXNlVGljayBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy91c2UtdGljay91c2UtdGljay5qcydcbmltcG9ydCB1c2VUaW1lb3V0IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3VzZS10aW1lb3V0L3VzZS10aW1lb3V0LmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBjbG9zZVBvcnRhbE1lbnVzIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5wb3J0YWwvcG9ydGFsLmpzJ1xuaW1wb3J0IHsgZ2V0U2Nyb2xsVGFyZ2V0LCBzY3JvbGxUYXJnZXRQcm9wIH0gZnJvbSAnLi4vLi4vdXRpbHMvc2Nyb2xsL3Njcm9sbC5qcydcbmltcG9ydCB7IHBvc2l0aW9uLCBzdG9wQW5kUHJldmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50L2V2ZW50LmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5pbXBvcnQgeyBhZGRFc2NhcGVLZXksIHJlbW92ZUVzY2FwZUtleSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUua2V5Ym9hcmQvZXNjYXBlLWtleS5qcydcbmltcG9ydCB7IGFkZEZvY3Vzb3V0LCByZW1vdmVGb2N1c291dCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuZm9jdXMvZm9jdXNvdXQuanMnXG5pbXBvcnQgeyBjaGlsZEhhc0ZvY3VzIH0gZnJvbSAnLi4vLi4vdXRpbHMvZG9tL2RvbS5qcydcbmltcG9ydCB7IGFkZENsaWNrT3V0c2lkZSwgcmVtb3ZlQ2xpY2tPdXRzaWRlIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jbGljay1vdXRzaWRlL2NsaWNrLW91dHNpZGUuanMnXG5pbXBvcnQgeyBhZGRGb2N1c0ZuIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5mb2N1cy9mb2N1cy1tYW5hZ2VyLmpzJ1xuXG5pbXBvcnQge1xuICB2YWxpZGF0ZVBvc2l0aW9uLCB2YWxpZGF0ZU9mZnNldCwgc2V0UG9zaXRpb24sIHBhcnNlUG9zaXRpb25cbn0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5wb3NpdGlvbi1lbmdpbmUvcG9zaXRpb24tZW5naW5lLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUU1lbnUnLFxuXG4gIGluaGVyaXRBdHRyczogZmFsc2UsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VBbmNob3JQcm9wcyxcbiAgICAuLi51c2VNb2RlbFRvZ2dsZVByb3BzLFxuICAgIC4uLnVzZURhcmtQcm9wcyxcbiAgICAuLi51c2VUcmFuc2l0aW9uUHJvcHMsXG5cbiAgICBwZXJzaXN0ZW50OiBCb29sZWFuLFxuICAgIGF1dG9DbG9zZTogQm9vbGVhbixcbiAgICBzZXBhcmF0ZUNsb3NlUG9wdXA6IEJvb2xlYW4sXG4gICAgbm9Fc2NEaXNtaXNzOiBCb29sZWFuLFxuICAgIG5vUm91dGVEaXNtaXNzOiBCb29sZWFuLFxuICAgIG5vUmVmb2N1czogQm9vbGVhbixcbiAgICBub0ZvY3VzOiBCb29sZWFuLFxuXG4gICAgZml0OiBCb29sZWFuLFxuICAgIGNvdmVyOiBCb29sZWFuLFxuXG4gICAgc3F1YXJlOiBCb29sZWFuLFxuXG4gICAgYW5jaG9yOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWxpZGF0b3I6IHZhbGlkYXRlUG9zaXRpb25cbiAgICB9LFxuICAgIHNlbGY6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbGlkYXRvcjogdmFsaWRhdGVQb3NpdGlvblxuICAgIH0sXG4gICAgb2Zmc2V0OiB7XG4gICAgICB0eXBlOiBBcnJheSxcbiAgICAgIHZhbGlkYXRvcjogdmFsaWRhdGVPZmZzZXRcbiAgICB9LFxuXG4gICAgc2Nyb2xsVGFyZ2V0OiBzY3JvbGxUYXJnZXRQcm9wLFxuXG4gICAgdG91Y2hQb3NpdGlvbjogQm9vbGVhbixcblxuICAgIG1heEhlaWdodDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH0sXG4gICAgbWF4V2lkdGg6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9XG4gIH0sXG5cbiAgZW1pdHM6IFtcbiAgICAuLi51c2VNb2RlbFRvZ2dsZUVtaXRzLFxuICAgICdjbGljaycsICdlc2NhcGVLZXknXG4gIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0LCBhdHRycyB9KSB7XG4gICAgbGV0IHJlZm9jdXNUYXJnZXQgPSBudWxsLCBhYnNvbHV0ZU9mZnNldCwgdW53YXRjaFBvc2l0aW9uLCBhdm9pZEF1dG9DbG9zZVxuXG4gICAgY29uc3Qgdm0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICAgIGNvbnN0IHsgcHJveHkgfSA9IHZtXG4gICAgY29uc3QgeyAkcSB9ID0gcHJveHlcblxuICAgIGNvbnN0IGlubmVyUmVmID0gcmVmKG51bGwpXG4gICAgY29uc3Qgc2hvd2luZyA9IHJlZihmYWxzZSlcblxuICAgIGNvbnN0IGhpZGVPblJvdXRlQ2hhbmdlID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLnBlcnNpc3RlbnQgIT09IHRydWVcbiAgICAgICYmIHByb3BzLm5vUm91dGVEaXNtaXNzICE9PSB0cnVlXG4gICAgKVxuXG4gICAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgJHEpXG4gICAgY29uc3QgeyByZWdpc3RlclRpY2ssIHJlbW92ZVRpY2sgfSA9IHVzZVRpY2soKVxuICAgIGNvbnN0IHsgcmVnaXN0ZXJUaW1lb3V0IH0gPSB1c2VUaW1lb3V0KClcbiAgICBjb25zdCB7IHRyYW5zaXRpb25Qcm9wcywgdHJhbnNpdGlvblN0eWxlIH0gPSB1c2VUcmFuc2l0aW9uKHByb3BzKVxuICAgIGNvbnN0IHsgbG9jYWxTY3JvbGxUYXJnZXQsIGNoYW5nZVNjcm9sbEV2ZW50LCB1bmNvbmZpZ3VyZVNjcm9sbFRhcmdldCB9ID0gdXNlU2Nyb2xsVGFyZ2V0KHByb3BzLCBjb25maWd1cmVTY3JvbGxUYXJnZXQpXG5cbiAgICBjb25zdCB7IGFuY2hvckVsLCBjYW5TaG93IH0gPSB1c2VBbmNob3IoeyBzaG93aW5nIH0pXG5cbiAgICBjb25zdCB7IGhpZGUgfSA9IHVzZU1vZGVsVG9nZ2xlKHtcbiAgICAgIHNob3dpbmcsIGNhblNob3csIGhhbmRsZVNob3csIGhhbmRsZUhpZGUsXG4gICAgICBoaWRlT25Sb3V0ZUNoYW5nZSxcbiAgICAgIHByb2Nlc3NPbk1vdW50OiB0cnVlXG4gICAgfSlcblxuICAgIGNvbnN0IHsgc2hvd1BvcnRhbCwgaGlkZVBvcnRhbCwgcmVuZGVyUG9ydGFsIH0gPSB1c2VQb3J0YWwodm0sIGlubmVyUmVmLCByZW5kZXJQb3J0YWxDb250ZW50LCAnbWVudScpXG5cbiAgICBjb25zdCBjbGlja091dHNpZGVQcm9wcyA9IHtcbiAgICAgIGFuY2hvckVsLFxuICAgICAgaW5uZXJSZWYsXG4gICAgICBvbkNsaWNrT3V0c2lkZSAoZSkge1xuICAgICAgICBpZiAocHJvcHMucGVyc2lzdGVudCAhPT0gdHJ1ZSAmJiBzaG93aW5nLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgaGlkZShlKVxuXG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgLy8gYWx3YXlzIHByZXZlbnQgdG91Y2ggZXZlbnRcbiAgICAgICAgICAgIGUudHlwZSA9PT0gJ3RvdWNoc3RhcnQnXG4gICAgICAgICAgICAvLyBwcmV2ZW50IGNsaWNrIGlmIGl0J3Mgb24gYSBkaWFsb2cgYmFja2Ryb3BcbiAgICAgICAgICAgIHx8IGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncS1kaWFsb2dfX2JhY2tkcm9wJylcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGFuY2hvck9yaWdpbiA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwYXJzZVBvc2l0aW9uKFxuICAgICAgICBwcm9wcy5hbmNob3IgfHwgKFxuICAgICAgICAgIHByb3BzLmNvdmVyID09PSB0cnVlID8gJ2NlbnRlciBtaWRkbGUnIDogJ2JvdHRvbSBzdGFydCdcbiAgICAgICAgKSxcbiAgICAgICAgJHEubGFuZy5ydGxcbiAgICAgIClcbiAgICApXG5cbiAgICBjb25zdCBzZWxmT3JpZ2luID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuY292ZXIgPT09IHRydWVcbiAgICAgICAgPyBhbmNob3JPcmlnaW4udmFsdWVcbiAgICAgICAgOiBwYXJzZVBvc2l0aW9uKHByb3BzLnNlbGYgfHwgJ3RvcCBzdGFydCcsICRxLmxhbmcucnRsKVxuICAgICkpXG5cbiAgICBjb25zdCBtZW51Q2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgKHByb3BzLnNxdWFyZSA9PT0gdHJ1ZSA/ICcgcS1tZW51LS1zcXVhcmUnIDogJycpXG4gICAgICArIChpc0RhcmsudmFsdWUgPT09IHRydWUgPyAnIHEtbWVudS0tZGFyayBxLWRhcmsnIDogJycpXG4gICAgKVxuXG4gICAgY29uc3Qgb25FdmVudHMgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5hdXRvQ2xvc2UgPT09IHRydWVcbiAgICAgICAgPyB7IG9uQ2xpY2s6IG9uQXV0b0Nsb3NlIH1cbiAgICAgICAgOiB7fVxuICAgICkpXG5cbiAgICBjb25zdCBoYW5kbGVzRm9jdXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSAmJiBwcm9wcy5wZXJzaXN0ZW50ICE9PSB0cnVlXG4gICAgKVxuXG4gICAgd2F0Y2goaGFuZGxlc0ZvY3VzLCB2YWwgPT4ge1xuICAgICAgaWYgKHZhbCA9PT0gdHJ1ZSkge1xuICAgICAgICBhZGRFc2NhcGVLZXkob25Fc2NhcGVLZXkpXG4gICAgICAgIGFkZENsaWNrT3V0c2lkZShjbGlja091dHNpZGVQcm9wcylcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZW1vdmVFc2NhcGVLZXkob25Fc2NhcGVLZXkpXG4gICAgICAgIHJlbW92ZUNsaWNrT3V0c2lkZShjbGlja091dHNpZGVQcm9wcylcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gZm9jdXMgKCkge1xuICAgICAgYWRkRm9jdXNGbigoKSA9PiB7XG4gICAgICAgIGxldCBub2RlID0gaW5uZXJSZWYudmFsdWVcblxuICAgICAgICBpZiAobm9kZSAmJiAobm9kZS5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSAhPT0gdHJ1ZSkpIHtcbiAgICAgICAgICBub2RlID0gbm9kZS5xdWVyeVNlbGVjdG9yKCdbYXV0b2ZvY3VzXVt0YWJpbmRleF0sIFtkYXRhLWF1dG9mb2N1c11bdGFiaW5kZXhdJylcbiAgICAgICAgICAgIHx8IG5vZGUucXVlcnlTZWxlY3RvcignW2F1dG9mb2N1c10gW3RhYmluZGV4XSwgW2RhdGEtYXV0b2ZvY3VzXSBbdGFiaW5kZXhdJylcbiAgICAgICAgICAgIHx8IG5vZGUucXVlcnlTZWxlY3RvcignW2F1dG9mb2N1c10sIFtkYXRhLWF1dG9mb2N1c10nKVxuICAgICAgICAgICAgfHwgbm9kZVxuICAgICAgICAgIG5vZGUuZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlU2hvdyAoZXZ0KSB7XG4gICAgICByZWZvY3VzVGFyZ2V0ID0gcHJvcHMubm9SZWZvY3VzID09PSBmYWxzZVxuICAgICAgICA/IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnRcbiAgICAgICAgOiBudWxsXG5cbiAgICAgIGFkZEZvY3Vzb3V0KG9uRm9jdXNvdXQpXG5cbiAgICAgIHNob3dQb3J0YWwoKVxuICAgICAgY29uZmlndXJlU2Nyb2xsVGFyZ2V0KClcblxuICAgICAgYWJzb2x1dGVPZmZzZXQgPSB2b2lkIDBcblxuICAgICAgaWYgKGV2dCAhPT0gdm9pZCAwICYmIChwcm9wcy50b3VjaFBvc2l0aW9uIHx8IHByb3BzLmNvbnRleHRNZW51KSkge1xuICAgICAgICBjb25zdCBwb3MgPSBwb3NpdGlvbihldnQpXG5cbiAgICAgICAgaWYgKHBvcy5sZWZ0ICE9PSB2b2lkIDApIHtcbiAgICAgICAgICBjb25zdCB7IHRvcCwgbGVmdCB9ID0gYW5jaG9yRWwudmFsdWUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgICBhYnNvbHV0ZU9mZnNldCA9IHsgbGVmdDogcG9zLmxlZnQgLSBsZWZ0LCB0b3A6IHBvcy50b3AgLSB0b3AgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh1bndhdGNoUG9zaXRpb24gPT09IHZvaWQgMCkge1xuICAgICAgICB1bndhdGNoUG9zaXRpb24gPSB3YXRjaChcbiAgICAgICAgICAoKSA9PiAkcS5zY3JlZW4ud2lkdGggKyAnfCcgKyAkcS5zY3JlZW4uaGVpZ2h0ICsgJ3wnICsgcHJvcHMuc2VsZiArICd8JyArIHByb3BzLmFuY2hvciArICd8JyArICRxLmxhbmcucnRsLFxuICAgICAgICAgIHVwZGF0ZVBvc2l0aW9uXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgaWYgKHByb3BzLm5vRm9jdXMgIT09IHRydWUpIHtcbiAgICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ibHVyKClcbiAgICAgIH1cblxuICAgICAgLy8gc2hvdWxkIHJlbW92ZVRpY2soKSBpZiB0aGlzIGdldHMgcmVtb3ZlZFxuICAgICAgcmVnaXN0ZXJUaWNrKCgpID0+IHtcbiAgICAgICAgdXBkYXRlUG9zaXRpb24oKVxuICAgICAgICBwcm9wcy5ub0ZvY3VzICE9PSB0cnVlICYmIGZvY3VzKClcbiAgICAgIH0pXG5cbiAgICAgIC8vIHNob3VsZCByZW1vdmVUaW1lb3V0KCkgaWYgdGhpcyBnZXRzIHJlbW92ZWRcbiAgICAgIHJlZ2lzdGVyVGltZW91dCgoKSA9PiB7XG4gICAgICAgIC8vIHJlcXVpcmVkIGluIG9yZGVyIHRvIGF2b2lkIHRoZSBcImRvdWJsZS10YXAgbmVlZGVkXCIgaXNzdWVcbiAgICAgICAgaWYgKCRxLnBsYXRmb3JtLmlzLmlvcyA9PT0gdHJ1ZSkge1xuICAgICAgICAgIC8vIGlmIGF1dG8tY2xvc2UsIHRoZW4gdGhpcyBjbGljayBzaG91bGRcbiAgICAgICAgICAvLyBub3QgY2xvc2UgdGhlIG1lbnVcbiAgICAgICAgICBhdm9pZEF1dG9DbG9zZSA9IHByb3BzLmF1dG9DbG9zZVxuICAgICAgICAgIGlubmVyUmVmLnZhbHVlLmNsaWNrKClcbiAgICAgICAgfVxuXG4gICAgICAgIHVwZGF0ZVBvc2l0aW9uKClcbiAgICAgICAgc2hvd1BvcnRhbCh0cnVlKSAvLyBkb25lIHNob3dpbmcgcG9ydGFsXG4gICAgICAgIGVtaXQoJ3Nob3cnLCBldnQpXG4gICAgICB9LCBwcm9wcy50cmFuc2l0aW9uRHVyYXRpb24pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlSGlkZSAoZXZ0KSB7XG4gICAgICByZW1vdmVUaWNrKClcbiAgICAgIGhpZGVQb3J0YWwoKVxuXG4gICAgICBhbmNob3JDbGVhbnVwKHRydWUpXG5cbiAgICAgIGlmIChcbiAgICAgICAgcmVmb2N1c1RhcmdldCAhPT0gbnVsbFxuICAgICAgICAmJiAoXG4gICAgICAgICAgLy8gbWVudSB3YXMgaGlkZGVuIGZyb20gY29kZSBvciBFU0MgcGx1Z2luXG4gICAgICAgICAgZXZ0ID09PSB2b2lkIDBcbiAgICAgICAgICAvLyBtZW51IHdhcyBub3QgY2xvc2VkIGZyb20gYSBtb3VzZSBvciB0b3VjaCBjbGlja091dHNpZGVcbiAgICAgICAgICB8fCBldnQucUNsaWNrT3V0c2lkZSAhPT0gdHJ1ZVxuICAgICAgICApXG4gICAgICApIHtcbiAgICAgICAgKChldnQ/LnR5cGUuaW5kZXhPZigna2V5JykgPT09IDBcbiAgICAgICAgICA/IHJlZm9jdXNUYXJnZXQuY2xvc2VzdCgnW3RhYmluZGV4XTpub3QoW3RhYmluZGV4Xj1cIi1cIl0pJylcbiAgICAgICAgICA6IHZvaWQgMFxuICAgICAgICApIHx8IHJlZm9jdXNUYXJnZXQpLmZvY3VzKClcblxuICAgICAgICByZWZvY3VzVGFyZ2V0ID0gbnVsbFxuICAgICAgfVxuXG4gICAgICAvLyBzaG91bGQgcmVtb3ZlVGltZW91dCgpIGlmIHRoaXMgZ2V0cyByZW1vdmVkXG4gICAgICByZWdpc3RlclRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBoaWRlUG9ydGFsKHRydWUpIC8vIGRvbmUgaGlkaW5nLCBub3cgZGVzdHJveVxuICAgICAgICBlbWl0KCdoaWRlJywgZXZ0KVxuICAgICAgfSwgcHJvcHMudHJhbnNpdGlvbkR1cmF0aW9uKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFuY2hvckNsZWFudXAgKGhpZGluZykge1xuICAgICAgYWJzb2x1dGVPZmZzZXQgPSB2b2lkIDBcblxuICAgICAgaWYgKHVud2F0Y2hQb3NpdGlvbiAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHVud2F0Y2hQb3NpdGlvbigpXG4gICAgICAgIHVud2F0Y2hQb3NpdGlvbiA9IHZvaWQgMFxuICAgICAgfVxuXG4gICAgICBpZiAoaGlkaW5nID09PSB0cnVlIHx8IHNob3dpbmcudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgcmVtb3ZlRm9jdXNvdXQob25Gb2N1c291dClcbiAgICAgICAgdW5jb25maWd1cmVTY3JvbGxUYXJnZXQoKVxuICAgICAgICByZW1vdmVDbGlja091dHNpZGUoY2xpY2tPdXRzaWRlUHJvcHMpXG4gICAgICAgIHJlbW92ZUVzY2FwZUtleShvbkVzY2FwZUtleSlcbiAgICAgIH1cblxuICAgICAgaWYgKGhpZGluZyAhPT0gdHJ1ZSkge1xuICAgICAgICByZWZvY3VzVGFyZ2V0ID0gbnVsbFxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbmZpZ3VyZVNjcm9sbFRhcmdldCAoKSB7XG4gICAgICBpZiAoYW5jaG9yRWwudmFsdWUgIT09IG51bGwgfHwgcHJvcHMuc2Nyb2xsVGFyZ2V0ICE9PSB2b2lkIDApIHtcbiAgICAgICAgbG9jYWxTY3JvbGxUYXJnZXQudmFsdWUgPSBnZXRTY3JvbGxUYXJnZXQoYW5jaG9yRWwudmFsdWUsIHByb3BzLnNjcm9sbFRhcmdldClcbiAgICAgICAgY2hhbmdlU2Nyb2xsRXZlbnQobG9jYWxTY3JvbGxUYXJnZXQudmFsdWUsIHVwZGF0ZVBvc2l0aW9uKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uQXV0b0Nsb3NlIChlKSB7XG4gICAgICAvLyBpZiBhdXRvLWNsb3NlLCB0aGVuIHRoZSBpb3MgZG91YmxlLXRhcCBmaXggd2hpY2hcbiAgICAgIC8vIGlzc3VlcyBhIGNsaWNrIHNob3VsZCBub3QgY2xvc2UgdGhlIG1lbnVcbiAgICAgIGlmIChhdm9pZEF1dG9DbG9zZSAhPT0gdHJ1ZSkge1xuICAgICAgICBjbG9zZVBvcnRhbE1lbnVzKHByb3h5LCBlKVxuICAgICAgICBlbWl0KCdjbGljaycsIGUpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgYXZvaWRBdXRvQ2xvc2UgPSBmYWxzZVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRm9jdXNvdXQgKGV2dCkge1xuICAgICAgLy8gdGhlIGZvY3VzIGlzIG5vdCBpbiBhIHZ1ZSBjaGlsZCBjb21wb25lbnRcbiAgICAgIGlmIChcbiAgICAgICAgaGFuZGxlc0ZvY3VzLnZhbHVlID09PSB0cnVlXG4gICAgICAgICYmIHByb3BzLm5vRm9jdXMgIT09IHRydWVcbiAgICAgICAgJiYgY2hpbGRIYXNGb2N1cyhpbm5lclJlZi52YWx1ZSwgZXZ0LnRhcmdldCkgIT09IHRydWVcbiAgICAgICkge1xuICAgICAgICBmb2N1cygpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Fc2NhcGVLZXkgKGV2dCkge1xuICAgICAgaWYgKHByb3BzLm5vRXNjRGlzbWlzcyAhPT0gdHJ1ZSkge1xuICAgICAgICBlbWl0KCdlc2NhcGVLZXknKVxuICAgICAgICBoaWRlKGV2dClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVQb3NpdGlvbiAoKSB7XG4gICAgICBzZXRQb3NpdGlvbih7XG4gICAgICAgIHRhcmdldEVsOiBpbm5lclJlZi52YWx1ZSxcbiAgICAgICAgb2Zmc2V0OiBwcm9wcy5vZmZzZXQsXG4gICAgICAgIGFuY2hvckVsOiBhbmNob3JFbC52YWx1ZSxcbiAgICAgICAgYW5jaG9yT3JpZ2luOiBhbmNob3JPcmlnaW4udmFsdWUsXG4gICAgICAgIHNlbGZPcmlnaW46IHNlbGZPcmlnaW4udmFsdWUsXG4gICAgICAgIGFic29sdXRlT2Zmc2V0LFxuICAgICAgICBmaXQ6IHByb3BzLmZpdCxcbiAgICAgICAgY292ZXI6IHByb3BzLmNvdmVyLFxuICAgICAgICBtYXhIZWlnaHQ6IHByb3BzLm1heEhlaWdodCxcbiAgICAgICAgbWF4V2lkdGg6IHByb3BzLm1heFdpZHRoXG4gICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbmRlclBvcnRhbENvbnRlbnQgKCkge1xuICAgICAgcmV0dXJuIGgoXG4gICAgICAgIFRyYW5zaXRpb24sXG4gICAgICAgIHRyYW5zaXRpb25Qcm9wcy52YWx1ZSxcbiAgICAgICAgKCkgPT4gKFxuICAgICAgICAgIHNob3dpbmcudmFsdWUgPT09IHRydWVcbiAgICAgICAgICAgID8gaCgnZGl2Jywge1xuICAgICAgICAgICAgICByb2xlOiAnbWVudScsXG4gICAgICAgICAgICAgIC4uLmF0dHJzLFxuICAgICAgICAgICAgICByZWY6IGlubmVyUmVmLFxuICAgICAgICAgICAgICB0YWJpbmRleDogLTEsXG4gICAgICAgICAgICAgIGNsYXNzOiBbXG4gICAgICAgICAgICAgICAgJ3EtbWVudSBxLXBvc2l0aW9uLWVuZ2luZSBzY3JvbGwnICsgbWVudUNsYXNzLnZhbHVlLFxuICAgICAgICAgICAgICAgIGF0dHJzLmNsYXNzXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIHN0eWxlOiBbXG4gICAgICAgICAgICAgICAgYXR0cnMuc3R5bGUsXG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvblN0eWxlLnZhbHVlXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIC4uLm9uRXZlbnRzLnZhbHVlXG4gICAgICAgICAgICB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgICAgICAgICAgIDogbnVsbFxuICAgICAgICApXG4gICAgICApXG4gICAgfVxuXG4gICAgb25CZWZvcmVVbm1vdW50KGFuY2hvckNsZWFudXApXG5cbiAgICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHNcbiAgICBPYmplY3QuYXNzaWduKHByb3h5LCB7IGZvY3VzLCB1cGRhdGVQb3NpdGlvbiB9KVxuXG4gICAgcmV0dXJuIHJlbmRlclBvcnRhbFxuICB9XG59KVxuIiwiaW1wb3J0IHsgb25CZWZvcmVVbm1vdW50IH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgSGlzdG9yeSBmcm9tICcuLi8uLi9wbHVnaW5zL3ByaXZhdGUuaGlzdG9yeS9IaXN0b3J5LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc2hvd2luZywgaGlkZSwgaGlkZU9uUm91dGVDaGFuZ2UpIHtcbiAgbGV0IGhpc3RvcnlFbnRyeVxuXG4gIGZ1bmN0aW9uIHJlbW92ZUZyb21IaXN0b3J5ICgpIHtcbiAgICBpZiAoaGlzdG9yeUVudHJ5ICE9PSB2b2lkIDApIHtcbiAgICAgIEhpc3RvcnkucmVtb3ZlKGhpc3RvcnlFbnRyeSlcbiAgICAgIGhpc3RvcnlFbnRyeSA9IHZvaWQgMFxuICAgIH1cbiAgfVxuXG4gIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSAmJiByZW1vdmVGcm9tSGlzdG9yeSgpXG4gIH0pXG5cbiAgcmV0dXJuIHtcbiAgICByZW1vdmVGcm9tSGlzdG9yeSxcblxuICAgIGFkZFRvSGlzdG9yeSAoKSB7XG4gICAgICBoaXN0b3J5RW50cnkgPSB7XG4gICAgICAgIGNvbmRpdGlvbjogKCkgPT4gaGlkZU9uUm91dGVDaGFuZ2UudmFsdWUgPT09IHRydWUsXG4gICAgICAgIGhhbmRsZXI6IGhpZGVcbiAgICAgIH1cblxuICAgICAgSGlzdG9yeS5hZGQoaGlzdG9yeUVudHJ5KVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgaGFzU2Nyb2xsYmFyLCBnZXRWZXJ0aWNhbFNjcm9sbFBvc2l0aW9uLCBnZXRIb3Jpem9udGFsU2Nyb2xsUG9zaXRpb24gfSBmcm9tICcuL3Njcm9sbC5qcydcbmltcG9ydCB7IGdldEV2ZW50UGF0aCwgbGlzdGVuT3B0cywgc3RvcEFuZFByZXZlbnQgfSBmcm9tICcuLi9ldmVudC9ldmVudC5qcydcbmltcG9ydCB7IGNsaWVudCB9IGZyb20gJy4uLy4uL3BsdWdpbnMvcGxhdGZvcm0vUGxhdGZvcm0uanMnXG5cbmxldFxuICByZWdpc3RlcmVkID0gMCxcbiAgc2Nyb2xsUG9zaXRpb25YLFxuICBzY3JvbGxQb3NpdGlvblksXG4gIG1heFNjcm9sbFRvcCxcbiAgdnBQZW5kaW5nVXBkYXRlID0gZmFsc2UsXG4gIGJvZHlMZWZ0LFxuICBib2R5VG9wLFxuICBocmVmLFxuICBjbG9zZVRpbWVyID0gbnVsbFxuXG5mdW5jdGlvbiBvbldoZWVsIChlKSB7XG4gIGlmIChzaG91bGRQcmV2ZW50U2Nyb2xsKGUpKSB7XG4gICAgc3RvcEFuZFByZXZlbnQoZSlcbiAgfVxufVxuXG5mdW5jdGlvbiBzaG91bGRQcmV2ZW50U2Nyb2xsIChlKSB7XG4gIGlmIChlLnRhcmdldCA9PT0gZG9jdW1lbnQuYm9keSB8fCBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3EtbGF5b3V0X19iYWNrZHJvcCcpKSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGNvbnN0XG4gICAgcGF0aCA9IGdldEV2ZW50UGF0aChlKSxcbiAgICBzaGlmdCA9IGUuc2hpZnRLZXkgJiYgIWUuZGVsdGFYLFxuICAgIHNjcm9sbFkgPSAhc2hpZnQgJiYgTWF0aC5hYnMoZS5kZWx0YVgpIDw9IE1hdGguYWJzKGUuZGVsdGFZKSxcbiAgICBkZWx0YSA9IHNoaWZ0IHx8IHNjcm9sbFkgPyBlLmRlbHRhWSA6IGUuZGVsdGFYXG5cbiAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHBhdGgubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgY29uc3QgZWwgPSBwYXRoWyBpbmRleCBdXG5cbiAgICBpZiAoaGFzU2Nyb2xsYmFyKGVsLCBzY3JvbGxZKSkge1xuICAgICAgcmV0dXJuIHNjcm9sbFlcbiAgICAgICAgPyAoXG4gICAgICAgICAgICBkZWx0YSA8IDAgJiYgZWwuc2Nyb2xsVG9wID09PSAwXG4gICAgICAgICAgICAgID8gdHJ1ZVxuICAgICAgICAgICAgICA6IGRlbHRhID4gMCAmJiBlbC5zY3JvbGxUb3AgKyBlbC5jbGllbnRIZWlnaHQgPT09IGVsLnNjcm9sbEhlaWdodFxuICAgICAgICAgIClcbiAgICAgICAgOiAoXG4gICAgICAgICAgICBkZWx0YSA8IDAgJiYgZWwuc2Nyb2xsTGVmdCA9PT0gMFxuICAgICAgICAgICAgICA/IHRydWVcbiAgICAgICAgICAgICAgOiBkZWx0YSA+IDAgJiYgZWwuc2Nyb2xsTGVmdCArIGVsLmNsaWVudFdpZHRoID09PSBlbC5zY3JvbGxXaWR0aFxuICAgICAgICAgIClcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZVxufVxuXG5mdW5jdGlvbiBvbkFwcGxlU2Nyb2xsIChlKSB7XG4gIGlmIChlLnRhcmdldCA9PT0gZG9jdW1lbnQpIHtcbiAgICAvLyByZXF1aXJlZCwgb3RoZXJ3aXNlIGlPUyBibG9ja3MgZnVydGhlciBzY3JvbGxpbmdcbiAgICAvLyB1bnRpbCB0aGUgbW9iaWxlIHNjcm9sbGJhciBkaXNzYXBwZWFyc1xuICAgIGRvY3VtZW50LnNjcm9sbGluZ0VsZW1lbnQuc2Nyb2xsVG9wID0gZG9jdW1lbnQuc2Nyb2xsaW5nRWxlbWVudC5zY3JvbGxUb3AgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICB9XG59XG5cbmZ1bmN0aW9uIG9uQXBwbGVSZXNpemUgKGV2dCkge1xuICBpZiAodnBQZW5kaW5nVXBkYXRlID09PSB0cnVlKSByZXR1cm5cblxuICB2cFBlbmRpbmdVcGRhdGUgPSB0cnVlXG5cbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICB2cFBlbmRpbmdVcGRhdGUgPSBmYWxzZVxuXG4gICAgY29uc3RcbiAgICAgIHsgaGVpZ2h0IH0gPSBldnQudGFyZ2V0LFxuICAgICAgeyBjbGllbnRIZWlnaHQsIHNjcm9sbFRvcCB9ID0gZG9jdW1lbnQuc2Nyb2xsaW5nRWxlbWVudFxuXG4gICAgaWYgKG1heFNjcm9sbFRvcCA9PT0gdm9pZCAwIHx8IGhlaWdodCAhPT0gd2luZG93LmlubmVySGVpZ2h0KSB7XG4gICAgICBtYXhTY3JvbGxUb3AgPSBjbGllbnRIZWlnaHQgLSBoZWlnaHRcbiAgICAgIGRvY3VtZW50LnNjcm9sbGluZ0VsZW1lbnQuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wXG4gICAgfVxuXG4gICAgaWYgKHNjcm9sbFRvcCA+IG1heFNjcm9sbFRvcCkge1xuICAgICAgZG9jdW1lbnQuc2Nyb2xsaW5nRWxlbWVudC5zY3JvbGxUb3AgLT0gTWF0aC5jZWlsKChzY3JvbGxUb3AgLSBtYXhTY3JvbGxUb3ApIC8gOClcbiAgICB9XG4gIH0pXG59XG5cbmZ1bmN0aW9uIGFwcGx5IChhY3Rpb24pIHtcbiAgY29uc3RcbiAgICBib2R5ID0gZG9jdW1lbnQuYm9keSxcbiAgICBoYXNWaWV3cG9ydCA9IHdpbmRvdy52aXN1YWxWaWV3cG9ydCAhPT0gdm9pZCAwXG5cbiAgaWYgKGFjdGlvbiA9PT0gJ2FkZCcpIHtcbiAgICBjb25zdCB7IG92ZXJmbG93WSwgb3ZlcmZsb3dYIH0gPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShib2R5KVxuXG4gICAgc2Nyb2xsUG9zaXRpb25YID0gZ2V0SG9yaXpvbnRhbFNjcm9sbFBvc2l0aW9uKHdpbmRvdylcbiAgICBzY3JvbGxQb3NpdGlvblkgPSBnZXRWZXJ0aWNhbFNjcm9sbFBvc2l0aW9uKHdpbmRvdylcbiAgICBib2R5TGVmdCA9IGJvZHkuc3R5bGUubGVmdFxuICAgIGJvZHlUb3AgPSBib2R5LnN0eWxlLnRvcFxuXG4gICAgaHJlZiA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmXG5cbiAgICBib2R5LnN0eWxlLmxlZnQgPSBgLSR7IHNjcm9sbFBvc2l0aW9uWCB9cHhgXG4gICAgYm9keS5zdHlsZS50b3AgPSBgLSR7IHNjcm9sbFBvc2l0aW9uWSB9cHhgXG5cbiAgICBpZiAob3ZlcmZsb3dYICE9PSAnaGlkZGVuJyAmJiAob3ZlcmZsb3dYID09PSAnc2Nyb2xsJyB8fCBib2R5LnNjcm9sbFdpZHRoID4gd2luZG93LmlubmVyV2lkdGgpKSB7XG4gICAgICBib2R5LmNsYXNzTGlzdC5hZGQoJ3EtYm9keS0tZm9yY2Utc2Nyb2xsYmFyLXgnKVxuICAgIH1cbiAgICBpZiAob3ZlcmZsb3dZICE9PSAnaGlkZGVuJyAmJiAob3ZlcmZsb3dZID09PSAnc2Nyb2xsJyB8fCBib2R5LnNjcm9sbEhlaWdodCA+IHdpbmRvdy5pbm5lckhlaWdodCkpIHtcbiAgICAgIGJvZHkuY2xhc3NMaXN0LmFkZCgncS1ib2R5LS1mb3JjZS1zY3JvbGxiYXIteScpXG4gICAgfVxuXG4gICAgYm9keS5jbGFzc0xpc3QuYWRkKCdxLWJvZHktLXByZXZlbnQtc2Nyb2xsJylcbiAgICBkb2N1bWVudC5xU2Nyb2xsUHJldmVudGVkID0gdHJ1ZVxuXG4gICAgaWYgKGNsaWVudC5pcy5pb3MgPT09IHRydWUpIHtcbiAgICAgIGlmIChoYXNWaWV3cG9ydCA9PT0gdHJ1ZSkge1xuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMClcbiAgICAgICAgd2luZG93LnZpc3VhbFZpZXdwb3J0LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIG9uQXBwbGVSZXNpemUsIGxpc3Rlbk9wdHMucGFzc2l2ZUNhcHR1cmUpXG4gICAgICAgIHdpbmRvdy52aXN1YWxWaWV3cG9ydC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBvbkFwcGxlUmVzaXplLCBsaXN0ZW5PcHRzLnBhc3NpdmVDYXB0dXJlKVxuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMClcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgb25BcHBsZVNjcm9sbCwgbGlzdGVuT3B0cy5wYXNzaXZlQ2FwdHVyZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoY2xpZW50LmlzLmRlc2t0b3AgPT09IHRydWUgJiYgY2xpZW50LmlzLm1hYyA9PT0gdHJ1ZSkge1xuICAgIC8vIHJlZi4gaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vd2ViL3VwZGF0ZXMvMjAxNy8wMS9zY3JvbGxpbmctaW50ZXJ2ZW50aW9uXG4gICAgd2luZG93WyBgJHsgYWN0aW9uIH1FdmVudExpc3RlbmVyYCBdKCd3aGVlbCcsIG9uV2hlZWwsIGxpc3Rlbk9wdHMubm90UGFzc2l2ZSlcbiAgfVxuXG4gIGlmIChhY3Rpb24gPT09ICdyZW1vdmUnKSB7XG4gICAgaWYgKGNsaWVudC5pcy5pb3MgPT09IHRydWUpIHtcbiAgICAgIGlmIChoYXNWaWV3cG9ydCA9PT0gdHJ1ZSkge1xuICAgICAgICB3aW5kb3cudmlzdWFsVmlld3BvcnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgb25BcHBsZVJlc2l6ZSwgbGlzdGVuT3B0cy5wYXNzaXZlQ2FwdHVyZSlcbiAgICAgICAgd2luZG93LnZpc3VhbFZpZXdwb3J0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIG9uQXBwbGVSZXNpemUsIGxpc3Rlbk9wdHMucGFzc2l2ZUNhcHR1cmUpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIG9uQXBwbGVTY3JvbGwsIGxpc3Rlbk9wdHMucGFzc2l2ZUNhcHR1cmUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdxLWJvZHktLXByZXZlbnQtc2Nyb2xsJylcbiAgICBib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3EtYm9keS0tZm9yY2Utc2Nyb2xsYmFyLXgnKVxuICAgIGJvZHkuY2xhc3NMaXN0LnJlbW92ZSgncS1ib2R5LS1mb3JjZS1zY3JvbGxiYXIteScpXG5cbiAgICBkb2N1bWVudC5xU2Nyb2xsUHJldmVudGVkID0gZmFsc2VcblxuICAgIGJvZHkuc3R5bGUubGVmdCA9IGJvZHlMZWZ0XG4gICAgYm9keS5zdHlsZS50b3AgPSBib2R5VG9wXG5cbiAgICAvLyBzY3JvbGwgYmFjayBvbmx5IGlmIHJvdXRlIGhhcyBub3QgY2hhbmdlZFxuICAgIGlmICh3aW5kb3cubG9jYXRpb24uaHJlZiA9PT0gaHJlZikge1xuICAgICAgd2luZG93LnNjcm9sbFRvKHNjcm9sbFBvc2l0aW9uWCwgc2Nyb2xsUG9zaXRpb25ZKVxuICAgIH1cblxuICAgIG1heFNjcm9sbFRvcCA9IHZvaWQgMFxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSkge1xuICBsZXQgYWN0aW9uID0gJ2FkZCdcblxuICBpZiAoc3RhdGUgPT09IHRydWUpIHtcbiAgICByZWdpc3RlcmVkKytcblxuICAgIGlmIChjbG9zZVRpbWVyICE9PSBudWxsKSB7XG4gICAgICBjbGVhclRpbWVvdXQoY2xvc2VUaW1lcilcbiAgICAgIGNsb3NlVGltZXIgPSBudWxsXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAocmVnaXN0ZXJlZCA+IDEpIHJldHVyblxuICB9XG4gIGVsc2Uge1xuICAgIGlmIChyZWdpc3RlcmVkID09PSAwKSByZXR1cm5cblxuICAgIHJlZ2lzdGVyZWQtLVxuXG4gICAgaWYgKHJlZ2lzdGVyZWQgPiAwKSByZXR1cm5cblxuICAgIGFjdGlvbiA9ICdyZW1vdmUnXG5cbiAgICBpZiAoY2xpZW50LmlzLmlvcyA9PT0gdHJ1ZSAmJiBjbGllbnQuaXMubmF0aXZlTW9iaWxlID09PSB0cnVlKSB7XG4gICAgICBjbG9zZVRpbWVyICE9PSBudWxsICYmIGNsZWFyVGltZW91dChjbG9zZVRpbWVyKVxuICAgICAgY2xvc2VUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBhcHBseShhY3Rpb24pXG4gICAgICAgIGNsb3NlVGltZXIgPSBudWxsXG4gICAgICB9LCAxMDApXG4gICAgICByZXR1cm5cbiAgICB9XG4gIH1cblxuICBhcHBseShhY3Rpb24pXG59XG4iLCJpbXBvcnQgcHJldmVudFNjcm9sbCBmcm9tICcuLi8uLi91dGlscy9zY3JvbGwvcHJldmVudC1zY3JvbGwuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgbGV0IGN1cnJlbnRTdGF0ZVxuXG4gIHJldHVybiB7XG4gICAgcHJldmVudEJvZHlTY3JvbGwgKHN0YXRlKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHN0YXRlICE9PSBjdXJyZW50U3RhdGVcbiAgICAgICAgJiYgKGN1cnJlbnRTdGF0ZSAhPT0gdm9pZCAwIHx8IHN0YXRlID09PSB0cnVlKVxuICAgICAgKSB7XG4gICAgICAgIGN1cnJlbnRTdGF0ZSA9IHN0YXRlXG4gICAgICAgIHByZXZlbnRTY3JvbGwoc3RhdGUpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCB3YXRjaCwgb25CZWZvcmVVbm1vdW50LCBUcmFuc2l0aW9uLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VIaXN0b3J5IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLWhpc3RvcnkvdXNlLWhpc3RvcnkuanMnXG5pbXBvcnQgdXNlVGltZW91dCBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy91c2UtdGltZW91dC91c2UtdGltZW91dC5qcydcbmltcG9ydCB1c2VUaWNrIGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3VzZS10aWNrL3VzZS10aWNrLmpzJ1xuaW1wb3J0IHVzZU1vZGVsVG9nZ2xlLCB7IHVzZU1vZGVsVG9nZ2xlUHJvcHMsIHVzZU1vZGVsVG9nZ2xlRW1pdHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1tb2RlbC10b2dnbGUvdXNlLW1vZGVsLXRvZ2dsZS5qcydcbmltcG9ydCB1c2VUcmFuc2l0aW9uLCB7IHVzZVRyYW5zaXRpb25Qcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLXRyYW5zaXRpb24vdXNlLXRyYW5zaXRpb24uanMnXG5pbXBvcnQgdXNlUG9ydGFsIGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLXBvcnRhbC91c2UtcG9ydGFsLmpzJ1xuaW1wb3J0IHVzZVByZXZlbnRTY3JvbGwgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtcHJldmVudC1zY3JvbGwvdXNlLXByZXZlbnQtc2Nyb2xsLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBjaGlsZEhhc0ZvY3VzIH0gZnJvbSAnLi4vLi4vdXRpbHMvZG9tL2RvbS5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5yZW5kZXIvcmVuZGVyLmpzJ1xuaW1wb3J0IHsgYWRkRXNjYXBlS2V5LCByZW1vdmVFc2NhcGVLZXkgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmtleWJvYXJkL2VzY2FwZS1rZXkuanMnXG5pbXBvcnQgeyBhZGRGb2N1c291dCwgcmVtb3ZlRm9jdXNvdXQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmZvY3VzL2ZvY3Vzb3V0LmpzJ1xuaW1wb3J0IHsgYWRkRm9jdXNGbiB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuZm9jdXMvZm9jdXMtbWFuYWdlci5qcydcblxubGV0IG1heGltaXplZE1vZGFscyA9IDBcblxuY29uc3QgcG9zaXRpb25DbGFzcyA9IHtcbiAgc3RhbmRhcmQ6ICdmaXhlZC1mdWxsIGZsZXgtY2VudGVyJyxcbiAgdG9wOiAnZml4ZWQtdG9wIGp1c3RpZnktY2VudGVyJyxcbiAgYm90dG9tOiAnZml4ZWQtYm90dG9tIGp1c3RpZnktY2VudGVyJyxcbiAgcmlnaHQ6ICdmaXhlZC1yaWdodCBpdGVtcy1jZW50ZXInLFxuICBsZWZ0OiAnZml4ZWQtbGVmdCBpdGVtcy1jZW50ZXInXG59XG5cbmNvbnN0IGRlZmF1bHRUcmFuc2l0aW9ucyA9IHtcbiAgc3RhbmRhcmQ6IFsgJ3NjYWxlJywgJ3NjYWxlJyBdLFxuICB0b3A6IFsgJ3NsaWRlLWRvd24nLCAnc2xpZGUtdXAnIF0sXG4gIGJvdHRvbTogWyAnc2xpZGUtdXAnLCAnc2xpZGUtZG93bicgXSxcbiAgcmlnaHQ6IFsgJ3NsaWRlLWxlZnQnLCAnc2xpZGUtcmlnaHQnIF0sXG4gIGxlZnQ6IFsgJ3NsaWRlLXJpZ2h0JywgJ3NsaWRlLWxlZnQnIF1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FEaWFsb2cnLFxuXG4gIGluaGVyaXRBdHRyczogZmFsc2UsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VNb2RlbFRvZ2dsZVByb3BzLFxuICAgIC4uLnVzZVRyYW5zaXRpb25Qcm9wcyxcblxuICAgIHRyYW5zaXRpb25TaG93OiBTdHJpbmcsIC8vIG92ZXJyaWRlIHVzZVRyYW5zaXRpb25Qcm9wc1xuICAgIHRyYW5zaXRpb25IaWRlOiBTdHJpbmcsIC8vIG92ZXJyaWRlIHVzZVRyYW5zaXRpb25Qcm9wc1xuXG4gICAgcGVyc2lzdGVudDogQm9vbGVhbixcbiAgICBhdXRvQ2xvc2U6IEJvb2xlYW4sXG4gICAgYWxsb3dGb2N1c091dHNpZGU6IEJvb2xlYW4sXG5cbiAgICBub0VzY0Rpc21pc3M6IEJvb2xlYW4sXG4gICAgbm9CYWNrZHJvcERpc21pc3M6IEJvb2xlYW4sXG4gICAgbm9Sb3V0ZURpc21pc3M6IEJvb2xlYW4sXG4gICAgbm9SZWZvY3VzOiBCb29sZWFuLFxuICAgIG5vRm9jdXM6IEJvb2xlYW4sXG4gICAgbm9TaGFrZTogQm9vbGVhbixcblxuICAgIHNlYW1sZXNzOiBCb29sZWFuLFxuXG4gICAgbWF4aW1pemVkOiBCb29sZWFuLFxuICAgIGZ1bGxXaWR0aDogQm9vbGVhbixcbiAgICBmdWxsSGVpZ2h0OiBCb29sZWFuLFxuXG4gICAgc3F1YXJlOiBCb29sZWFuLFxuXG4gICAgYmFja2Ryb3BGaWx0ZXI6IFN0cmluZyxcblxuICAgIHBvc2l0aW9uOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnc3RhbmRhcmQnLFxuICAgICAgdmFsaWRhdG9yOiB2YWwgPT4gWyAnc3RhbmRhcmQnLCAndG9wJywgJ2JvdHRvbScsICdsZWZ0JywgJ3JpZ2h0JyBdLmluY2x1ZGVzKHZhbClcbiAgICB9XG4gIH0sXG5cbiAgZW1pdHM6IFtcbiAgICAuLi51c2VNb2RlbFRvZ2dsZUVtaXRzLFxuICAgICdzaGFrZScsICdjbGljaycsICdlc2NhcGVLZXknXG4gIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0LCBhdHRycyB9KSB7XG4gICAgY29uc3Qgdm0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gICAgY29uc3QgaW5uZXJSZWYgPSByZWYobnVsbClcbiAgICBjb25zdCBzaG93aW5nID0gcmVmKGZhbHNlKVxuICAgIGNvbnN0IGFuaW1hdGluZyA9IHJlZihmYWxzZSlcblxuICAgIGxldCBzaGFrZVRpbWVvdXQgPSBudWxsLCByZWZvY3VzVGFyZ2V0ID0gbnVsbCwgaXNNYXhpbWl6ZWQsIGF2b2lkQXV0b0Nsb3NlXG5cbiAgICBjb25zdCBoaWRlT25Sb3V0ZUNoYW5nZSA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5wZXJzaXN0ZW50ICE9PSB0cnVlXG4gICAgICAmJiBwcm9wcy5ub1JvdXRlRGlzbWlzcyAhPT0gdHJ1ZVxuICAgICAgJiYgcHJvcHMuc2VhbWxlc3MgIT09IHRydWVcbiAgICApXG5cbiAgICBjb25zdCB7IHByZXZlbnRCb2R5U2Nyb2xsIH0gPSB1c2VQcmV2ZW50U2Nyb2xsKClcbiAgICBjb25zdCB7IHJlZ2lzdGVyVGltZW91dCB9ID0gdXNlVGltZW91dCgpXG4gICAgY29uc3QgeyByZWdpc3RlclRpY2ssIHJlbW92ZVRpY2sgfSA9IHVzZVRpY2soKVxuXG4gICAgY29uc3QgeyB0cmFuc2l0aW9uUHJvcHMsIHRyYW5zaXRpb25TdHlsZSB9ID0gdXNlVHJhbnNpdGlvbihcbiAgICAgIHByb3BzLFxuICAgICAgKCkgPT4gZGVmYXVsdFRyYW5zaXRpb25zWyBwcm9wcy5wb3NpdGlvbiBdWyAwIF0sXG4gICAgICAoKSA9PiBkZWZhdWx0VHJhbnNpdGlvbnNbIHByb3BzLnBvc2l0aW9uIF1bIDEgXVxuICAgIClcblxuICAgIGNvbnN0IGJhY2tkcm9wU3R5bGUgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICB0cmFuc2l0aW9uU3R5bGUudmFsdWVcbiAgICAgICsgKFxuICAgICAgICBwcm9wcy5iYWNrZHJvcEZpbHRlciAhPT0gdm9pZCAwXG4gICAgICAgICAgLy8gU2FmYXJpIHJlcXVpcmVzIHRoZSAtd2Via2l0IHByZWZpeFxuICAgICAgICAgID8gYDtiYWNrZHJvcC1maWx0ZXI6JHsgcHJvcHMuYmFja2Ryb3BGaWx0ZXIgfTstd2Via2l0LWJhY2tkcm9wLWZpbHRlcjokeyBwcm9wcy5iYWNrZHJvcEZpbHRlciB9YFxuICAgICAgICAgIDogJydcbiAgICAgIClcbiAgICApKVxuXG4gICAgY29uc3QgeyBzaG93UG9ydGFsLCBoaWRlUG9ydGFsLCBwb3J0YWxJc0FjY2Vzc2libGUsIHJlbmRlclBvcnRhbCB9ID0gdXNlUG9ydGFsKFxuICAgICAgdm0sIGlubmVyUmVmLCByZW5kZXJQb3J0YWxDb250ZW50LCAnZGlhbG9nJ1xuICAgIClcblxuICAgIGNvbnN0IHsgaGlkZSB9ID0gdXNlTW9kZWxUb2dnbGUoe1xuICAgICAgc2hvd2luZyxcbiAgICAgIGhpZGVPblJvdXRlQ2hhbmdlLFxuICAgICAgaGFuZGxlU2hvdyxcbiAgICAgIGhhbmRsZUhpZGUsXG4gICAgICBwcm9jZXNzT25Nb3VudDogdHJ1ZVxuICAgIH0pXG5cbiAgICBjb25zdCB7IGFkZFRvSGlzdG9yeSwgcmVtb3ZlRnJvbUhpc3RvcnkgfSA9IHVzZUhpc3Rvcnkoc2hvd2luZywgaGlkZSwgaGlkZU9uUm91dGVDaGFuZ2UpXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLWRpYWxvZ19faW5uZXIgZmxleCBuby1wb2ludGVyLWV2ZW50cydcbiAgICAgICsgYCBxLWRpYWxvZ19faW5uZXItLSR7IHByb3BzLm1heGltaXplZCA9PT0gdHJ1ZSA/ICdtYXhpbWl6ZWQnIDogJ21pbmltaXplZCcgfWBcbiAgICAgICsgYCBxLWRpYWxvZ19faW5uZXItLSR7IHByb3BzLnBvc2l0aW9uIH0gJHsgcG9zaXRpb25DbGFzc1sgcHJvcHMucG9zaXRpb24gXSB9YFxuICAgICAgKyAoYW5pbWF0aW5nLnZhbHVlID09PSB0cnVlID8gJyBxLWRpYWxvZ19faW5uZXItLWFuaW1hdGluZycgOiAnJylcbiAgICAgICsgKHByb3BzLmZ1bGxXaWR0aCA9PT0gdHJ1ZSA/ICcgcS1kaWFsb2dfX2lubmVyLS1mdWxsd2lkdGgnIDogJycpXG4gICAgICArIChwcm9wcy5mdWxsSGVpZ2h0ID09PSB0cnVlID8gJyBxLWRpYWxvZ19faW5uZXItLWZ1bGxoZWlnaHQnIDogJycpXG4gICAgICArIChwcm9wcy5zcXVhcmUgPT09IHRydWUgPyAnIHEtZGlhbG9nX19pbm5lci0tc3F1YXJlJyA6ICcnKVxuICAgIClcblxuICAgIGNvbnN0IHVzZUJhY2tkcm9wID0gY29tcHV0ZWQoKCkgPT4gc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSAmJiBwcm9wcy5zZWFtbGVzcyAhPT0gdHJ1ZSlcblxuICAgIGNvbnN0IG9uRXZlbnRzID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuYXV0b0Nsb3NlID09PSB0cnVlXG4gICAgICAgID8geyBvbkNsaWNrOiBvbkF1dG9DbG9zZSB9XG4gICAgICAgIDoge31cbiAgICApKVxuXG4gICAgY29uc3Qgcm9vdENsYXNzZXMgPSBjb21wdXRlZCgoKSA9PiBbXG4gICAgICAncS1kaWFsb2cgZnVsbHNjcmVlbiBuby1wb2ludGVyLWV2ZW50cyAnXG4gICAgICAgICsgYHEtZGlhbG9nLS0keyB1c2VCYWNrZHJvcC52YWx1ZSA9PT0gdHJ1ZSA/ICdtb2RhbCcgOiAnc2VhbWxlc3MnIH1gLFxuICAgICAgYXR0cnMuY2xhc3NcbiAgICBdKVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMubWF4aW1pemVkLCBzdGF0ZSA9PiB7XG4gICAgICBzaG93aW5nLnZhbHVlID09PSB0cnVlICYmIHVwZGF0ZU1heGltaXplZChzdGF0ZSlcbiAgICB9KVxuXG4gICAgd2F0Y2godXNlQmFja2Ryb3AsIHZhbCA9PiB7XG4gICAgICBwcmV2ZW50Qm9keVNjcm9sbCh2YWwpXG5cbiAgICAgIGlmICh2YWwgPT09IHRydWUpIHtcbiAgICAgICAgYWRkRm9jdXNvdXQob25Gb2N1c0NoYW5nZSlcbiAgICAgICAgYWRkRXNjYXBlS2V5KG9uRXNjYXBlS2V5KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJlbW92ZUZvY3Vzb3V0KG9uRm9jdXNDaGFuZ2UpXG4gICAgICAgIHJlbW92ZUVzY2FwZUtleShvbkVzY2FwZUtleSlcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlU2hvdyAoZXZ0KSB7XG4gICAgICBhZGRUb0hpc3RvcnkoKVxuXG4gICAgICByZWZvY3VzVGFyZ2V0ID0gcHJvcHMubm9SZWZvY3VzID09PSBmYWxzZSAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSBudWxsXG4gICAgICAgID8gZG9jdW1lbnQuYWN0aXZlRWxlbWVudFxuICAgICAgICA6IG51bGxcblxuICAgICAgdXBkYXRlTWF4aW1pemVkKHByb3BzLm1heGltaXplZClcbiAgICAgIHNob3dQb3J0YWwoKVxuICAgICAgYW5pbWF0aW5nLnZhbHVlID0gdHJ1ZVxuXG4gICAgICBpZiAocHJvcHMubm9Gb2N1cyAhPT0gdHJ1ZSkge1xuICAgICAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50Py5ibHVyKClcbiAgICAgICAgcmVnaXN0ZXJUaWNrKGZvY3VzKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJlbW92ZVRpY2soKVxuICAgICAgfVxuXG4gICAgICAvLyBzaG91bGQgcmVtb3ZlVGltZW91dCgpIGlmIHRoaXMgZ2V0cyByZW1vdmVkXG4gICAgICByZWdpc3RlclRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAodm0ucHJveHkuJHEucGxhdGZvcm0uaXMuaW9zID09PSB0cnVlKSB7XG4gICAgICAgICAgaWYgKHByb3BzLnNlYW1sZXNzICE9PSB0cnVlICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIGNvbnN0XG4gICAgICAgICAgICAgIHsgdG9wLCBib3R0b20gfSA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICAgICAgICAgIHsgaW5uZXJIZWlnaHQgfSA9IHdpbmRvdyxcbiAgICAgICAgICAgICAgaGVpZ2h0ID0gd2luZG93LnZpc3VhbFZpZXdwb3J0ICE9PSB2b2lkIDBcbiAgICAgICAgICAgICAgICA/IHdpbmRvdy52aXN1YWxWaWV3cG9ydC5oZWlnaHRcbiAgICAgICAgICAgICAgICA6IGlubmVySGVpZ2h0XG5cbiAgICAgICAgICAgIGlmICh0b3AgPiAwICYmIGJvdHRvbSA+IGhlaWdodCAvIDIpIHtcbiAgICAgICAgICAgICAgZG9jdW1lbnQuc2Nyb2xsaW5nRWxlbWVudC5zY3JvbGxUb3AgPSBNYXRoLm1pbihcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5zY3JvbGxpbmdFbGVtZW50LnNjcm9sbEhlaWdodCAtIGhlaWdodCxcbiAgICAgICAgICAgICAgICBib3R0b20gPj0gaW5uZXJIZWlnaHRcbiAgICAgICAgICAgICAgICAgID8gSW5maW5pdHlcbiAgICAgICAgICAgICAgICAgIDogTWF0aC5jZWlsKGRvY3VtZW50LnNjcm9sbGluZ0VsZW1lbnQuc2Nyb2xsVG9wICsgYm90dG9tIC0gaGVpZ2h0IC8gMilcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50LnNjcm9sbEludG9WaWV3KClcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyByZXF1aXJlZCBpbiBvcmRlciB0byBhdm9pZCB0aGUgXCJkb3VibGUtdGFwIG5lZWRlZFwiIGlzc3VlXG4gICAgICAgICAgYXZvaWRBdXRvQ2xvc2UgPSB0cnVlXG4gICAgICAgICAgaW5uZXJSZWYudmFsdWUuY2xpY2soKVxuICAgICAgICAgIGF2b2lkQXV0b0Nsb3NlID0gZmFsc2VcbiAgICAgICAgfVxuXG4gICAgICAgIHNob3dQb3J0YWwodHJ1ZSkgLy8gZG9uZSBzaG93aW5nIHBvcnRhbFxuICAgICAgICBhbmltYXRpbmcudmFsdWUgPSBmYWxzZVxuICAgICAgICBlbWl0KCdzaG93JywgZXZ0KVxuICAgICAgfSwgcHJvcHMudHJhbnNpdGlvbkR1cmF0aW9uKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZUhpZGUgKGV2dCkge1xuICAgICAgcmVtb3ZlVGljaygpXG4gICAgICByZW1vdmVGcm9tSGlzdG9yeSgpXG4gICAgICBjbGVhbnVwKHRydWUpXG4gICAgICBhbmltYXRpbmcudmFsdWUgPSB0cnVlXG4gICAgICBoaWRlUG9ydGFsKClcblxuICAgICAgaWYgKHJlZm9jdXNUYXJnZXQgIT09IG51bGwpIHtcbiAgICAgICAgKChldnQ/LnR5cGUuaW5kZXhPZigna2V5JykgPT09IDBcbiAgICAgICAgICA/IHJlZm9jdXNUYXJnZXQuY2xvc2VzdCgnW3RhYmluZGV4XTpub3QoW3RhYmluZGV4Xj1cIi1cIl0pJylcbiAgICAgICAgICA6IHZvaWQgMFxuICAgICAgICApIHx8IHJlZm9jdXNUYXJnZXQpLmZvY3VzKClcblxuICAgICAgICByZWZvY3VzVGFyZ2V0ID0gbnVsbFxuICAgICAgfVxuXG4gICAgICAvLyBzaG91bGQgcmVtb3ZlVGltZW91dCgpIGlmIHRoaXMgZ2V0cyByZW1vdmVkXG4gICAgICByZWdpc3RlclRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBoaWRlUG9ydGFsKHRydWUpIC8vIGRvbmUgaGlkaW5nLCBub3cgZGVzdHJveVxuICAgICAgICBhbmltYXRpbmcudmFsdWUgPSBmYWxzZVxuICAgICAgICBlbWl0KCdoaWRlJywgZXZ0KVxuICAgICAgfSwgcHJvcHMudHJhbnNpdGlvbkR1cmF0aW9uKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvY3VzIChzZWxlY3Rvcikge1xuICAgICAgYWRkRm9jdXNGbigoKSA9PiB7XG4gICAgICAgIGxldCBub2RlID0gaW5uZXJSZWYudmFsdWVcblxuICAgICAgICBpZiAobm9kZSA9PT0gbnVsbCkgcmV0dXJuXG5cbiAgICAgICAgaWYgKHNlbGVjdG9yICE9PSB2b2lkIDApIHtcbiAgICAgICAgICBjb25zdCB0YXJnZXQgPSBub2RlLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXG4gICAgICAgICAgaWYgKHRhcmdldCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGFyZ2V0LmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9KVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5vZGUuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkgIT09IHRydWUpIHtcbiAgICAgICAgICBub2RlID0gKFxuICAgICAgICAgICAgbm9kZS5xdWVyeVNlbGVjdG9yKCdbYXV0b2ZvY3VzXVt0YWJpbmRleF0sIFtkYXRhLWF1dG9mb2N1c11bdGFiaW5kZXhdJylcbiAgICAgICAgICAgIHx8IG5vZGUucXVlcnlTZWxlY3RvcignW2F1dG9mb2N1c10gW3RhYmluZGV4XSwgW2RhdGEtYXV0b2ZvY3VzXSBbdGFiaW5kZXhdJylcbiAgICAgICAgICAgIHx8IG5vZGUucXVlcnlTZWxlY3RvcignW2F1dG9mb2N1c10sIFtkYXRhLWF1dG9mb2N1c10nKVxuICAgICAgICAgICAgfHwgbm9kZVxuICAgICAgICAgIClcblxuICAgICAgICAgIG5vZGUuZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2hha2UgKGZvY3VzVGFyZ2V0KSB7XG4gICAgICBpZiAoZm9jdXNUYXJnZXQgJiYgdHlwZW9mIGZvY3VzVGFyZ2V0LmZvY3VzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGZvY3VzVGFyZ2V0LmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGZvY3VzKClcbiAgICAgIH1cblxuICAgICAgZW1pdCgnc2hha2UnKVxuXG4gICAgICBjb25zdCBub2RlID0gaW5uZXJSZWYudmFsdWVcblxuICAgICAgaWYgKG5vZGUgIT09IG51bGwpIHtcbiAgICAgICAgbm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdxLWFuaW1hdGUtLXNjYWxlJylcbiAgICAgICAgbm9kZS5jbGFzc0xpc3QuYWRkKCdxLWFuaW1hdGUtLXNjYWxlJylcbiAgICAgICAgc2hha2VUaW1lb3V0ICE9PSBudWxsICYmIGNsZWFyVGltZW91dChzaGFrZVRpbWVvdXQpXG4gICAgICAgIHNoYWtlVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHNoYWtlVGltZW91dCA9IG51bGxcbiAgICAgICAgICBpZiAoaW5uZXJSZWYudmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIG5vZGUuY2xhc3NMaXN0LnJlbW92ZSgncS1hbmltYXRlLS1zY2FsZScpXG4gICAgICAgICAgICAvLyBzb21lIHBsYXRmb3JtcyAobGlrZSBkZXNrdG9wIENocm9tZSlcbiAgICAgICAgICAgIC8vIHJlcXVpcmUgY2FsbGluZyBmb2N1cygpIGFnYWluXG4gICAgICAgICAgICBmb2N1cygpXG4gICAgICAgICAgfVxuICAgICAgICB9LCAxNzApXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Fc2NhcGVLZXkgKCkge1xuICAgICAgaWYgKHByb3BzLnNlYW1sZXNzICE9PSB0cnVlKSB7XG4gICAgICAgIGlmIChwcm9wcy5wZXJzaXN0ZW50ID09PSB0cnVlIHx8IHByb3BzLm5vRXNjRGlzbWlzcyA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHByb3BzLm1heGltaXplZCAhPT0gdHJ1ZSAmJiBwcm9wcy5ub1NoYWtlICE9PSB0cnVlICYmIHNoYWtlKClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBlbWl0KCdlc2NhcGVLZXknKVxuICAgICAgICAgIGhpZGUoKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYW51cCAoaGlkaW5nKSB7XG4gICAgICBpZiAoc2hha2VUaW1lb3V0ICE9PSBudWxsKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChzaGFrZVRpbWVvdXQpXG4gICAgICAgIHNoYWtlVGltZW91dCA9IG51bGxcbiAgICAgIH1cblxuICAgICAgaWYgKGhpZGluZyA9PT0gdHJ1ZSB8fCBzaG93aW5nLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIHVwZGF0ZU1heGltaXplZChmYWxzZSlcblxuICAgICAgICBpZiAocHJvcHMuc2VhbWxlc3MgIT09IHRydWUpIHtcbiAgICAgICAgICBwcmV2ZW50Qm9keVNjcm9sbChmYWxzZSlcbiAgICAgICAgICByZW1vdmVGb2N1c291dChvbkZvY3VzQ2hhbmdlKVxuICAgICAgICAgIHJlbW92ZUVzY2FwZUtleShvbkVzY2FwZUtleSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoaGlkaW5nICE9PSB0cnVlKSB7XG4gICAgICAgIHJlZm9jdXNUYXJnZXQgPSBudWxsXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlTWF4aW1pemVkIChhY3RpdmUpIHtcbiAgICAgIGlmIChhY3RpdmUgPT09IHRydWUpIHtcbiAgICAgICAgaWYgKGlzTWF4aW1pemVkICE9PSB0cnVlKSB7XG4gICAgICAgICAgbWF4aW1pemVkTW9kYWxzIDwgMSAmJiBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3EtYm9keS0tZGlhbG9nJylcbiAgICAgICAgICBtYXhpbWl6ZWRNb2RhbHMrK1xuXG4gICAgICAgICAgaXNNYXhpbWl6ZWQgPSB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGlzTWF4aW1pemVkID09PSB0cnVlKSB7XG4gICAgICAgIGlmIChtYXhpbWl6ZWRNb2RhbHMgPCAyKSB7XG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdxLWJvZHktLWRpYWxvZycpXG4gICAgICAgIH1cblxuICAgICAgICBtYXhpbWl6ZWRNb2RhbHMtLVxuICAgICAgICBpc01heGltaXplZCA9IGZhbHNlXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25BdXRvQ2xvc2UgKGUpIHtcbiAgICAgIGlmIChhdm9pZEF1dG9DbG9zZSAhPT0gdHJ1ZSkge1xuICAgICAgICBoaWRlKGUpXG4gICAgICAgIGVtaXQoJ2NsaWNrJywgZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkJhY2tkcm9wQ2xpY2sgKGUpIHtcbiAgICAgIGlmIChwcm9wcy5wZXJzaXN0ZW50ICE9PSB0cnVlICYmIHByb3BzLm5vQmFja2Ryb3BEaXNtaXNzICE9PSB0cnVlKSB7XG4gICAgICAgIGhpZGUoZSlcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHByb3BzLm5vU2hha2UgIT09IHRydWUpIHtcbiAgICAgICAgc2hha2UoKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRm9jdXNDaGFuZ2UgKGV2dCkge1xuICAgICAgLy8gdGhlIGZvY3VzIGlzIG5vdCBpbiBhIHZ1ZSBjaGlsZCBjb21wb25lbnRcbiAgICAgIGlmIChcbiAgICAgICAgcHJvcHMuYWxsb3dGb2N1c091dHNpZGUgIT09IHRydWVcbiAgICAgICAgJiYgcG9ydGFsSXNBY2Nlc3NpYmxlLnZhbHVlID09PSB0cnVlXG4gICAgICAgICYmIGNoaWxkSGFzRm9jdXMoaW5uZXJSZWYudmFsdWUsIGV2dC50YXJnZXQpICE9PSB0cnVlXG4gICAgICApIHtcbiAgICAgICAgZm9jdXMoJ1t0YWJpbmRleF06bm90KFt0YWJpbmRleD1cIi0xXCJdKScpXG4gICAgICB9XG4gICAgfVxuXG4gICAgT2JqZWN0LmFzc2lnbih2bS5wcm94eSwge1xuICAgICAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gICAgICBmb2N1cywgc2hha2UsXG5cbiAgICAgIC8vIHByaXZhdGUgYnV0IG5lZWRlZCBieSBRU2VsZWN0XG4gICAgICBfX3VwZGF0ZVJlZm9jdXNUYXJnZXQgKHRhcmdldCkge1xuICAgICAgICByZWZvY3VzVGFyZ2V0ID0gdGFyZ2V0IHx8IG51bGxcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgb25CZWZvcmVVbm1vdW50KGNsZWFudXApXG5cbiAgICBmdW5jdGlvbiByZW5kZXJQb3J0YWxDb250ZW50ICgpIHtcbiAgICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAgIHJvbGU6ICdkaWFsb2cnLFxuICAgICAgICAnYXJpYS1tb2RhbCc6IHVzZUJhY2tkcm9wLnZhbHVlID09PSB0cnVlID8gJ3RydWUnIDogJ2ZhbHNlJyxcbiAgICAgICAgLi4uYXR0cnMsXG4gICAgICAgIGNsYXNzOiByb290Q2xhc3Nlcy52YWx1ZVxuICAgICAgfSwgW1xuICAgICAgICBoKFRyYW5zaXRpb24sIHtcbiAgICAgICAgICBuYW1lOiAncS10cmFuc2l0aW9uLS1mYWRlJyxcbiAgICAgICAgICBhcHBlYXI6IHRydWVcbiAgICAgICAgfSwgKCkgPT4gKFxuICAgICAgICAgIHVzZUJhY2tkcm9wLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgICA/IGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAgY2xhc3M6ICdxLWRpYWxvZ19fYmFja2Ryb3AgZml4ZWQtZnVsbCcsXG4gICAgICAgICAgICAgIHN0eWxlOiBiYWNrZHJvcFN0eWxlLnZhbHVlLFxuICAgICAgICAgICAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZScsXG4gICAgICAgICAgICAgIHRhYmluZGV4OiAtMSxcbiAgICAgICAgICAgICAgb25DbGljazogb25CYWNrZHJvcENsaWNrXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgOiBudWxsXG4gICAgICAgICkpLFxuXG4gICAgICAgIGgoXG4gICAgICAgICAgVHJhbnNpdGlvbixcbiAgICAgICAgICB0cmFuc2l0aW9uUHJvcHMudmFsdWUsXG4gICAgICAgICAgKCkgPT4gKFxuICAgICAgICAgICAgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgICAgICA/IGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAgICByZWY6IGlubmVyUmVmLFxuICAgICAgICAgICAgICAgIGNsYXNzOiBjbGFzc2VzLnZhbHVlLFxuICAgICAgICAgICAgICAgIHN0eWxlOiB0cmFuc2l0aW9uU3R5bGUudmFsdWUsXG4gICAgICAgICAgICAgICAgdGFiaW5kZXg6IC0xLFxuICAgICAgICAgICAgICAgIC4uLm9uRXZlbnRzLnZhbHVlXG4gICAgICAgICAgICAgIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICAgICAgICAgICAgICA6IG51bGxcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgIF0pXG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbmRlclBvcnRhbFxuICB9XG59KVxuIiwibGV0IHJ0bEhhc1Njcm9sbEJ1ZyA9IGZhbHNlXG5cbi8vIG1vYmlsZSBDaHJvbWUgdGFrZXMgdGhlIGNyb3duIGZvciB0aGlzXG5pZiAoIV9fUVVBU0FSX1NTUl9fKSB7XG4gIGNvbnN0IHNjcm9sbGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgc2Nyb2xsZXIuc2V0QXR0cmlidXRlKCdkaXInLCAncnRsJylcbiAgT2JqZWN0LmFzc2lnbihzY3JvbGxlci5zdHlsZSwge1xuICAgIHdpZHRoOiAnMXB4JyxcbiAgICBoZWlnaHQ6ICcxcHgnLFxuICAgIG92ZXJmbG93OiAnYXV0bydcbiAgfSlcblxuICBjb25zdCBzcGFjZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICBPYmplY3QuYXNzaWduKHNwYWNlci5zdHlsZSwge1xuICAgIHdpZHRoOiAnMTAwMHB4JyxcbiAgICBoZWlnaHQ6ICcxcHgnXG4gIH0pXG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JvbGxlcilcbiAgc2Nyb2xsZXIuYXBwZW5kQ2hpbGQoc3BhY2VyKVxuICBzY3JvbGxlci5zY3JvbGxMZWZ0ID0gLTEwMDBcblxuICBydGxIYXNTY3JvbGxCdWcgPSBzY3JvbGxlci5zY3JvbGxMZWZ0ID49IDBcblxuICBzY3JvbGxlci5yZW1vdmUoKVxufVxuXG5leHBvcnQge1xuICBydGxIYXNTY3JvbGxCdWdcbn1cbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIHdhdGNoLCBvbkFjdGl2YXRlZCwgb25EZWFjdGl2YXRlZCwgb25CZWZvcmVNb3VudCwgb25CZWZvcmVVbm1vdW50LCBuZXh0VGljaywgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgZGVib3VuY2UgZnJvbSAnLi4vLi4vdXRpbHMvZGVib3VuY2UvZGVib3VuY2UuanMnXG5pbXBvcnQgeyBub29wIH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnQvZXZlbnQuanMnXG5pbXBvcnQgeyBydGxIYXNTY3JvbGxCdWcgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJ0bC9ydGwuanMnXG5cbmNvbnN0IGFnZ0J1Y2tldFNpemUgPSAxMDAwXG5cbmNvbnN0IHNjcm9sbFRvRWRnZXMgPSBbXG4gICdzdGFydCcsXG4gICdjZW50ZXInLFxuICAnZW5kJyxcbiAgJ3N0YXJ0LWZvcmNlJyxcbiAgJ2NlbnRlci1mb3JjZScsXG4gICdlbmQtZm9yY2UnXG5dXG5cbmNvbnN0IGZpbHRlclByb3RvID0gQXJyYXkucHJvdG90eXBlLmZpbHRlclxuXG5jb25zdCBzZXRPdmVyZmxvd0FuY2hvciA9IF9fUVVBU0FSX1NTUl9fIHx8IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHkpLm92ZXJmbG93QW5jaG9yID09PSB2b2lkIDBcbiAgPyBub29wXG4gIDogZnVuY3Rpb24gKGNvbnRlbnRFbCwgaW5kZXgpIHtcbiAgICBpZiAoY29udGVudEVsID09PSBudWxsKSByZXR1cm5cblxuICAgIGlmIChjb250ZW50RWwuX3FPdmVyZmxvd0FuaW1hdGlvbkZyYW1lICE9PSB2b2lkIDApIHtcbiAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKGNvbnRlbnRFbC5fcU92ZXJmbG93QW5pbWF0aW9uRnJhbWUpXG4gICAgfVxuXG4gICAgY29udGVudEVsLl9xT3ZlcmZsb3dBbmltYXRpb25GcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICBpZiAoY29udGVudEVsID09PSBudWxsKSByZXR1cm5cblxuICAgICAgY29udGVudEVsLl9xT3ZlcmZsb3dBbmltYXRpb25GcmFtZSA9IHZvaWQgMFxuICAgICAgY29uc3QgY2hpbGRyZW4gPSBjb250ZW50RWwuY2hpbGRyZW4gfHwgW11cblxuICAgICAgZmlsdGVyUHJvdG9cbiAgICAgICAgLmNhbGwoY2hpbGRyZW4sIGVsID0+IGVsLmRhdGFzZXQgJiYgZWwuZGF0YXNldC5xVnNBbmNob3IgIT09IHZvaWQgMClcbiAgICAgICAgLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgIGRlbGV0ZSBlbC5kYXRhc2V0LnFWc0FuY2hvclxuICAgICAgICB9KVxuXG4gICAgICBjb25zdCBlbCA9IGNoaWxkcmVuWyBpbmRleCBdXG5cbiAgICAgIGlmIChlbD8uZGF0YXNldCkge1xuICAgICAgICBlbC5kYXRhc2V0LnFWc0FuY2hvciA9ICcnXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG5mdW5jdGlvbiBzdW1GbiAoYWNjLCBoKSB7XG4gIHJldHVybiBhY2MgKyBoXG59XG5cbmZ1bmN0aW9uIGdldFNjcm9sbERldGFpbHMgKFxuICBwYXJlbnQsXG4gIGNoaWxkLFxuICBiZWZvcmVSZWYsXG4gIGFmdGVyUmVmLFxuICBob3Jpem9udGFsLFxuICBydGwsXG4gIHN0aWNreVN0YXJ0LFxuICBzdGlja3lFbmRcbikge1xuICBjb25zdFxuICAgIHBhcmVudENhbGMgPSBwYXJlbnQgPT09IHdpbmRvdyA/IGRvY3VtZW50LnNjcm9sbGluZ0VsZW1lbnQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IDogcGFyZW50LFxuICAgIHByb3BFbFNpemUgPSBob3Jpem9udGFsID09PSB0cnVlID8gJ29mZnNldFdpZHRoJyA6ICdvZmZzZXRIZWlnaHQnLFxuICAgIGRldGFpbHMgPSB7XG4gICAgICBzY3JvbGxTdGFydDogMCxcbiAgICAgIHNjcm9sbFZpZXdTaXplOiAtc3RpY2t5U3RhcnQgLSBzdGlja3lFbmQsXG4gICAgICBzY3JvbGxNYXhTaXplOiAwLFxuICAgICAgb2Zmc2V0U3RhcnQ6IC1zdGlja3lTdGFydCxcbiAgICAgIG9mZnNldEVuZDogLXN0aWNreUVuZFxuICAgIH1cblxuICBpZiAoaG9yaXpvbnRhbCA9PT0gdHJ1ZSkge1xuICAgIGlmIChwYXJlbnQgPT09IHdpbmRvdykge1xuICAgICAgZGV0YWlscy5zY3JvbGxTdGFydCA9IHdpbmRvdy5wYWdlWE9mZnNldCB8fCB3aW5kb3cuc2Nyb2xsWCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQgfHwgMFxuICAgICAgZGV0YWlscy5zY3JvbGxWaWV3U2l6ZSArPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGhcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBkZXRhaWxzLnNjcm9sbFN0YXJ0ID0gcGFyZW50Q2FsYy5zY3JvbGxMZWZ0XG4gICAgICBkZXRhaWxzLnNjcm9sbFZpZXdTaXplICs9IHBhcmVudENhbGMuY2xpZW50V2lkdGhcbiAgICB9XG4gICAgZGV0YWlscy5zY3JvbGxNYXhTaXplID0gcGFyZW50Q2FsYy5zY3JvbGxXaWR0aFxuXG4gICAgaWYgKHJ0bCA9PT0gdHJ1ZSkge1xuICAgICAgZGV0YWlscy5zY3JvbGxTdGFydCA9IChydGxIYXNTY3JvbGxCdWcgPT09IHRydWUgPyBkZXRhaWxzLnNjcm9sbE1heFNpemUgLSBkZXRhaWxzLnNjcm9sbFZpZXdTaXplIDogMCkgLSBkZXRhaWxzLnNjcm9sbFN0YXJ0XG4gICAgfVxuICB9XG4gIGVsc2Uge1xuICAgIGlmIChwYXJlbnQgPT09IHdpbmRvdykge1xuICAgICAgZGV0YWlscy5zY3JvbGxTdGFydCA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCB3aW5kb3cuc2Nyb2xsWSB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCB8fCAwXG4gICAgICBkZXRhaWxzLnNjcm9sbFZpZXdTaXplICs9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHRcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBkZXRhaWxzLnNjcm9sbFN0YXJ0ID0gcGFyZW50Q2FsYy5zY3JvbGxUb3BcbiAgICAgIGRldGFpbHMuc2Nyb2xsVmlld1NpemUgKz0gcGFyZW50Q2FsYy5jbGllbnRIZWlnaHRcbiAgICB9XG4gICAgZGV0YWlscy5zY3JvbGxNYXhTaXplID0gcGFyZW50Q2FsYy5zY3JvbGxIZWlnaHRcbiAgfVxuXG4gIGlmIChiZWZvcmVSZWYgIT09IG51bGwpIHtcbiAgICBmb3IgKGxldCBlbCA9IGJlZm9yZVJlZi5wcmV2aW91c0VsZW1lbnRTaWJsaW5nOyBlbCAhPT0gbnVsbDsgZWwgPSBlbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKSB7XG4gICAgICBpZiAoZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdxLXZpcnR1YWwtc2Nyb2xsLS1za2lwJykgPT09IGZhbHNlKSB7XG4gICAgICAgIGRldGFpbHMub2Zmc2V0U3RhcnQgKz0gZWxbIHByb3BFbFNpemUgXVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChhZnRlclJlZiAhPT0gbnVsbCkge1xuICAgIGZvciAobGV0IGVsID0gYWZ0ZXJSZWYubmV4dEVsZW1lbnRTaWJsaW5nOyBlbCAhPT0gbnVsbDsgZWwgPSBlbC5uZXh0RWxlbWVudFNpYmxpbmcpIHtcbiAgICAgIGlmIChlbC5jbGFzc0xpc3QuY29udGFpbnMoJ3EtdmlydHVhbC1zY3JvbGwtLXNraXAnKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgZGV0YWlscy5vZmZzZXRFbmQgKz0gZWxbIHByb3BFbFNpemUgXVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChjaGlsZCAhPT0gcGFyZW50KSB7XG4gICAgY29uc3RcbiAgICAgIHBhcmVudFJlY3QgPSBwYXJlbnRDYWxjLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgY2hpbGRSZWN0ID0gY2hpbGQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuICAgIGlmIChob3Jpem9udGFsID09PSB0cnVlKSB7XG4gICAgICBkZXRhaWxzLm9mZnNldFN0YXJ0ICs9IGNoaWxkUmVjdC5sZWZ0IC0gcGFyZW50UmVjdC5sZWZ0XG4gICAgICBkZXRhaWxzLm9mZnNldEVuZCAtPSBjaGlsZFJlY3Qud2lkdGhcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBkZXRhaWxzLm9mZnNldFN0YXJ0ICs9IGNoaWxkUmVjdC50b3AgLSBwYXJlbnRSZWN0LnRvcFxuICAgICAgZGV0YWlscy5vZmZzZXRFbmQgLT0gY2hpbGRSZWN0LmhlaWdodFxuICAgIH1cblxuICAgIGlmIChwYXJlbnQgIT09IHdpbmRvdykge1xuICAgICAgZGV0YWlscy5vZmZzZXRTdGFydCArPSBkZXRhaWxzLnNjcm9sbFN0YXJ0XG4gICAgfVxuICAgIGRldGFpbHMub2Zmc2V0RW5kICs9IGRldGFpbHMuc2Nyb2xsTWF4U2l6ZSAtIGRldGFpbHMub2Zmc2V0U3RhcnRcbiAgfVxuXG4gIHJldHVybiBkZXRhaWxzXG59XG5cbmZ1bmN0aW9uIHNldFNjcm9sbCAocGFyZW50LCBzY3JvbGwsIGhvcml6b250YWwsIHJ0bCkge1xuICBpZiAoc2Nyb2xsID09PSAnZW5kJykge1xuICAgIHNjcm9sbCA9IChwYXJlbnQgPT09IHdpbmRvdyA/IGRvY3VtZW50LmJvZHkgOiBwYXJlbnQpW1xuICAgICAgaG9yaXpvbnRhbCA9PT0gdHJ1ZSA/ICdzY3JvbGxXaWR0aCcgOiAnc2Nyb2xsSGVpZ2h0J1xuICAgIF1cbiAgfVxuXG4gIGlmIChwYXJlbnQgPT09IHdpbmRvdykge1xuICAgIGlmIChob3Jpem9udGFsID09PSB0cnVlKSB7XG4gICAgICBpZiAocnRsID09PSB0cnVlKSB7XG4gICAgICAgIHNjcm9sbCA9IChydGxIYXNTY3JvbGxCdWcgPT09IHRydWUgPyBkb2N1bWVudC5ib2R5LnNjcm9sbFdpZHRoIC0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIDogMCkgLSBzY3JvbGxcbiAgICAgIH1cbiAgICAgIHdpbmRvdy5zY3JvbGxUbyhzY3JvbGwsIHdpbmRvdy5wYWdlWU9mZnNldCB8fCB3aW5kb3cuc2Nyb2xsWSB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCB8fCAwKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHdpbmRvdy5zY3JvbGxUbyh3aW5kb3cucGFnZVhPZmZzZXQgfHwgd2luZG93LnNjcm9sbFggfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0IHx8IDAsIHNjcm9sbClcbiAgICB9XG4gIH1cbiAgZWxzZSBpZiAoaG9yaXpvbnRhbCA9PT0gdHJ1ZSkge1xuICAgIGlmIChydGwgPT09IHRydWUpIHtcbiAgICAgIHNjcm9sbCA9IChydGxIYXNTY3JvbGxCdWcgPT09IHRydWUgPyBwYXJlbnQuc2Nyb2xsV2lkdGggLSBwYXJlbnQub2Zmc2V0V2lkdGggOiAwKSAtIHNjcm9sbFxuICAgIH1cbiAgICBwYXJlbnQuc2Nyb2xsTGVmdCA9IHNjcm9sbFxuICB9XG4gIGVsc2Uge1xuICAgIHBhcmVudC5zY3JvbGxUb3AgPSBzY3JvbGxcbiAgfVxufVxuXG5mdW5jdGlvbiBzdW1TaXplIChzaXplQWdnLCBzaXplLCBmcm9tLCB0bykge1xuICBpZiAoZnJvbSA+PSB0bykgeyByZXR1cm4gMCB9XG5cbiAgY29uc3RcbiAgICBsYXN0VG8gPSBzaXplLmxlbmd0aCxcbiAgICBmcm9tQWdnID0gTWF0aC5mbG9vcihmcm9tIC8gYWdnQnVja2V0U2l6ZSksXG4gICAgdG9BZ2cgPSBNYXRoLmZsb29yKCh0byAtIDEpIC8gYWdnQnVja2V0U2l6ZSkgKyAxXG5cbiAgbGV0IHRvdGFsID0gc2l6ZUFnZy5zbGljZShmcm9tQWdnLCB0b0FnZykucmVkdWNlKHN1bUZuLCAwKVxuXG4gIGlmIChmcm9tICUgYWdnQnVja2V0U2l6ZSAhPT0gMCkge1xuICAgIHRvdGFsIC09IHNpemUuc2xpY2UoZnJvbUFnZyAqIGFnZ0J1Y2tldFNpemUsIGZyb20pLnJlZHVjZShzdW1GbiwgMClcbiAgfVxuICBpZiAodG8gJSBhZ2dCdWNrZXRTaXplICE9PSAwICYmIHRvICE9PSBsYXN0VG8pIHtcbiAgICB0b3RhbCAtPSBzaXplLnNsaWNlKHRvLCB0b0FnZyAqIGFnZ0J1Y2tldFNpemUpLnJlZHVjZShzdW1GbiwgMClcbiAgfVxuXG4gIHJldHVybiB0b3RhbFxufVxuXG5jb25zdCBjb21tb25WaXJ0U2Nyb2xsUHJvcHMgPSB7XG4gIHZpcnR1YWxTY3JvbGxTbGljZVNpemU6IHtcbiAgICB0eXBlOiBbIE51bWJlciwgU3RyaW5nIF0sXG4gICAgZGVmYXVsdDogMTBcbiAgfSxcblxuICB2aXJ0dWFsU2Nyb2xsU2xpY2VSYXRpb0JlZm9yZToge1xuICAgIHR5cGU6IFsgTnVtYmVyLCBTdHJpbmcgXSxcbiAgICBkZWZhdWx0OiAxXG4gIH0sXG5cbiAgdmlydHVhbFNjcm9sbFNsaWNlUmF0aW9BZnRlcjoge1xuICAgIHR5cGU6IFsgTnVtYmVyLCBTdHJpbmcgXSxcbiAgICBkZWZhdWx0OiAxXG4gIH0sXG5cbiAgdmlydHVhbFNjcm9sbEl0ZW1TaXplOiB7XG4gICAgdHlwZTogWyBOdW1iZXIsIFN0cmluZyBdLFxuICAgIGRlZmF1bHQ6IDI0XG4gIH0sXG5cbiAgdmlydHVhbFNjcm9sbFN0aWNreVNpemVTdGFydDoge1xuICAgIHR5cGU6IFsgTnVtYmVyLCBTdHJpbmcgXSxcbiAgICBkZWZhdWx0OiAwXG4gIH0sXG5cbiAgdmlydHVhbFNjcm9sbFN0aWNreVNpemVFbmQ6IHtcbiAgICB0eXBlOiBbIE51bWJlciwgU3RyaW5nIF0sXG4gICAgZGVmYXVsdDogMFxuICB9LFxuXG4gIHRhYmxlQ29sc3BhbjogWyBOdW1iZXIsIFN0cmluZyBdXG59XG5cbmV4cG9ydCBjb25zdCBjb21tb25WaXJ0U2Nyb2xsUHJvcHNMaXN0ID0gT2JqZWN0LmtleXMoY29tbW9uVmlydFNjcm9sbFByb3BzKVxuXG5leHBvcnQgY29uc3QgdXNlVmlydHVhbFNjcm9sbFByb3BzID0ge1xuICB2aXJ0dWFsU2Nyb2xsSG9yaXpvbnRhbDogQm9vbGVhbixcbiAgb25WaXJ0dWFsU2Nyb2xsOiBGdW5jdGlvbixcbiAgLi4uY29tbW9uVmlydFNjcm9sbFByb3BzXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VWaXJ0dWFsU2Nyb2xsICh7XG4gIHZpcnR1YWxTY3JvbGxMZW5ndGgsIGdldFZpcnR1YWxTY3JvbGxUYXJnZXQsIGdldFZpcnR1YWxTY3JvbGxFbCxcbiAgdmlydHVhbFNjcm9sbEl0ZW1TaXplQ29tcHV0ZWQgLy8gb3B0aW9uYWxcbn0pIHtcbiAgY29uc3Qgdm0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gIGNvbnN0IHsgcHJvcHMsIGVtaXQsIHByb3h5IH0gPSB2bVxuICBjb25zdCB7ICRxIH0gPSBwcm94eVxuXG4gIGxldCBwcmV2U2Nyb2xsU3RhcnQsIHByZXZUb0luZGV4LCBsb2NhbFNjcm9sbFZpZXdTaXplLCB2aXJ0dWFsU2Nyb2xsU2l6ZXNBZ2cgPSBbXSwgdmlydHVhbFNjcm9sbFNpemVzXG5cbiAgY29uc3QgdmlydHVhbFNjcm9sbFBhZGRpbmdCZWZvcmUgPSByZWYoMClcbiAgY29uc3QgdmlydHVhbFNjcm9sbFBhZGRpbmdBZnRlciA9IHJlZigwKVxuICBjb25zdCB2aXJ0dWFsU2Nyb2xsU2xpY2VTaXplQ29tcHV0ZWQgPSByZWYoe30pXG5cbiAgY29uc3QgYmVmb3JlUmVmID0gcmVmKG51bGwpXG4gIGNvbnN0IGFmdGVyUmVmID0gcmVmKG51bGwpXG4gIGNvbnN0IGNvbnRlbnRSZWYgPSByZWYobnVsbClcblxuICBjb25zdCB2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZSA9IHJlZih7IGZyb206IDAsIHRvOiAwIH0pXG5cbiAgY29uc3QgY29sc3BhbkF0dHIgPSBjb21wdXRlZCgoKSA9PiAocHJvcHMudGFibGVDb2xzcGFuICE9PSB2b2lkIDAgPyBwcm9wcy50YWJsZUNvbHNwYW4gOiAxMDApKVxuXG4gIGlmICh2aXJ0dWFsU2Nyb2xsSXRlbVNpemVDb21wdXRlZCA9PT0gdm9pZCAwKSB7XG4gICAgdmlydHVhbFNjcm9sbEl0ZW1TaXplQ29tcHV0ZWQgPSBjb21wdXRlZCgoKSA9PiBwcm9wcy52aXJ0dWFsU2Nyb2xsSXRlbVNpemUpXG4gIH1cblxuICBjb25zdCBuZWVkc1Jlc2V0ID0gY29tcHV0ZWQoKCkgPT4gdmlydHVhbFNjcm9sbEl0ZW1TaXplQ29tcHV0ZWQudmFsdWUgKyAnOycgKyBwcm9wcy52aXJ0dWFsU2Nyb2xsSG9yaXpvbnRhbClcblxuICBjb25zdCBuZWVkc1NsaWNlUmVjYWxjID0gY29tcHV0ZWQoKCkgPT5cbiAgICBuZWVkc1Jlc2V0LnZhbHVlICsgJzsnICsgcHJvcHMudmlydHVhbFNjcm9sbFNsaWNlUmF0aW9CZWZvcmUgKyAnOycgKyBwcm9wcy52aXJ0dWFsU2Nyb2xsU2xpY2VSYXRpb0FmdGVyXG4gIClcblxuICB3YXRjaChuZWVkc1NsaWNlUmVjYWxjLCAoKSA9PiB7IHNldFZpcnR1YWxTY3JvbGxTaXplKCkgfSlcbiAgd2F0Y2gobmVlZHNSZXNldCwgcmVzZXQpXG5cbiAgZnVuY3Rpb24gcmVzZXQgKCkge1xuICAgIGxvY2FsUmVzZXRWaXJ0dWFsU2Nyb2xsKHByZXZUb0luZGV4LCB0cnVlKVxuICB9XG5cbiAgZnVuY3Rpb24gcmVmcmVzaCAodG9JbmRleCkge1xuICAgIGxvY2FsUmVzZXRWaXJ0dWFsU2Nyb2xsKHRvSW5kZXggPT09IHZvaWQgMCA/IHByZXZUb0luZGV4IDogdG9JbmRleClcbiAgfVxuXG4gIGZ1bmN0aW9uIHNjcm9sbFRvICh0b0luZGV4LCBlZGdlKSB7XG4gICAgY29uc3Qgc2Nyb2xsRWwgPSBnZXRWaXJ0dWFsU2Nyb2xsVGFyZ2V0KClcblxuICAgIGlmIChcbiAgICAgIHNjcm9sbEVsID09PSB2b2lkIDBcbiAgICAgIHx8IHNjcm9sbEVsID09PSBudWxsXG4gICAgICB8fCBzY3JvbGxFbC5ub2RlVHlwZSA9PT0gOFxuICAgICkgcmV0dXJuXG5cbiAgICBjb25zdCBzY3JvbGxEZXRhaWxzID0gZ2V0U2Nyb2xsRGV0YWlscyhcbiAgICAgIHNjcm9sbEVsLFxuICAgICAgZ2V0VmlydHVhbFNjcm9sbEVsKCksXG4gICAgICBiZWZvcmVSZWYudmFsdWUsXG4gICAgICBhZnRlclJlZi52YWx1ZSxcbiAgICAgIHByb3BzLnZpcnR1YWxTY3JvbGxIb3Jpem9udGFsLFxuICAgICAgJHEubGFuZy5ydGwsXG4gICAgICBwcm9wcy52aXJ0dWFsU2Nyb2xsU3RpY2t5U2l6ZVN0YXJ0LFxuICAgICAgcHJvcHMudmlydHVhbFNjcm9sbFN0aWNreVNpemVFbmRcbiAgICApXG5cbiAgICBsb2NhbFNjcm9sbFZpZXdTaXplICE9PSBzY3JvbGxEZXRhaWxzLnNjcm9sbFZpZXdTaXplICYmIHNldFZpcnR1YWxTY3JvbGxTaXplKHNjcm9sbERldGFpbHMuc2Nyb2xsVmlld1NpemUpXG5cbiAgICBzZXRWaXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZShcbiAgICAgIHNjcm9sbEVsLFxuICAgICAgc2Nyb2xsRGV0YWlscyxcbiAgICAgIE1hdGgubWluKHZpcnR1YWxTY3JvbGxMZW5ndGgudmFsdWUgLSAxLCBNYXRoLm1heCgwLCBwYXJzZUludCh0b0luZGV4LCAxMCkgfHwgMCkpLFxuICAgICAgMCxcbiAgICAgIHNjcm9sbFRvRWRnZXMuaW5kZXhPZihlZGdlKSAhPT0gLTEgPyBlZGdlIDogKHByZXZUb0luZGV4ICE9PSAtMSAmJiB0b0luZGV4ID4gcHJldlRvSW5kZXggPyAnZW5kJyA6ICdzdGFydCcpXG4gICAgKVxuICB9XG5cbiAgZnVuY3Rpb24gbG9jYWxPblZpcnR1YWxTY3JvbGxFdnQgKCkge1xuICAgIGNvbnN0IHNjcm9sbEVsID0gZ2V0VmlydHVhbFNjcm9sbFRhcmdldCgpXG5cbiAgICBpZiAoXG4gICAgICBzY3JvbGxFbCA9PT0gdm9pZCAwXG4gICAgICB8fCBzY3JvbGxFbCA9PT0gbnVsbFxuICAgICAgfHwgc2Nyb2xsRWwubm9kZVR5cGUgPT09IDhcbiAgICApIHJldHVyblxuXG4gICAgY29uc3RcbiAgICAgIHNjcm9sbERldGFpbHMgPSBnZXRTY3JvbGxEZXRhaWxzKFxuICAgICAgICBzY3JvbGxFbCxcbiAgICAgICAgZ2V0VmlydHVhbFNjcm9sbEVsKCksXG4gICAgICAgIGJlZm9yZVJlZi52YWx1ZSxcbiAgICAgICAgYWZ0ZXJSZWYudmFsdWUsXG4gICAgICAgIHByb3BzLnZpcnR1YWxTY3JvbGxIb3Jpem9udGFsLFxuICAgICAgICAkcS5sYW5nLnJ0bCxcbiAgICAgICAgcHJvcHMudmlydHVhbFNjcm9sbFN0aWNreVNpemVTdGFydCxcbiAgICAgICAgcHJvcHMudmlydHVhbFNjcm9sbFN0aWNreVNpemVFbmRcbiAgICAgICksXG4gICAgICBsaXN0TGFzdEluZGV4ID0gdmlydHVhbFNjcm9sbExlbmd0aC52YWx1ZSAtIDEsXG4gICAgICBsaXN0RW5kT2Zmc2V0ID0gc2Nyb2xsRGV0YWlscy5zY3JvbGxNYXhTaXplIC0gc2Nyb2xsRGV0YWlscy5vZmZzZXRTdGFydCAtIHNjcm9sbERldGFpbHMub2Zmc2V0RW5kIC0gdmlydHVhbFNjcm9sbFBhZGRpbmdBZnRlci52YWx1ZVxuXG4gICAgaWYgKHByZXZTY3JvbGxTdGFydCA9PT0gc2Nyb2xsRGV0YWlscy5zY3JvbGxTdGFydCkgcmV0dXJuXG5cbiAgICBpZiAoc2Nyb2xsRGV0YWlscy5zY3JvbGxNYXhTaXplIDw9IDApIHtcbiAgICAgIHNldFZpcnR1YWxTY3JvbGxTbGljZVJhbmdlKHNjcm9sbEVsLCBzY3JvbGxEZXRhaWxzLCAwLCAwKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgbG9jYWxTY3JvbGxWaWV3U2l6ZSAhPT0gc2Nyb2xsRGV0YWlscy5zY3JvbGxWaWV3U2l6ZSAmJiBzZXRWaXJ0dWFsU2Nyb2xsU2l6ZShzY3JvbGxEZXRhaWxzLnNjcm9sbFZpZXdTaXplKVxuXG4gICAgdXBkYXRlVmlydHVhbFNjcm9sbFNpemVzKHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlLmZyb20pXG5cbiAgICBjb25zdCBzY3JvbGxNYXhTdGFydCA9IE1hdGguZmxvb3Ioc2Nyb2xsRGV0YWlscy5zY3JvbGxNYXhTaXplXG4gICAgICAtIE1hdGgubWF4KHNjcm9sbERldGFpbHMuc2Nyb2xsVmlld1NpemUsIHNjcm9sbERldGFpbHMub2Zmc2V0RW5kKVxuICAgICAgLSBNYXRoLm1pbih2aXJ0dWFsU2Nyb2xsU2l6ZXNbIGxpc3RMYXN0SW5kZXggXSwgc2Nyb2xsRGV0YWlscy5zY3JvbGxWaWV3U2l6ZSAvIDIpKVxuXG4gICAgaWYgKHNjcm9sbE1heFN0YXJ0ID4gMCAmJiBNYXRoLmNlaWwoc2Nyb2xsRGV0YWlscy5zY3JvbGxTdGFydCkgPj0gc2Nyb2xsTWF4U3RhcnQpIHtcbiAgICAgIHNldFZpcnR1YWxTY3JvbGxTbGljZVJhbmdlKFxuICAgICAgICBzY3JvbGxFbCxcbiAgICAgICAgc2Nyb2xsRGV0YWlscyxcbiAgICAgICAgbGlzdExhc3RJbmRleCxcbiAgICAgICAgc2Nyb2xsRGV0YWlscy5zY3JvbGxNYXhTaXplIC0gc2Nyb2xsRGV0YWlscy5vZmZzZXRFbmQgLSB2aXJ0dWFsU2Nyb2xsU2l6ZXNBZ2cucmVkdWNlKHN1bUZuLCAwKVxuICAgICAgKVxuXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBsZXRcbiAgICAgIHRvSW5kZXggPSAwLFxuICAgICAgbGlzdE9mZnNldCA9IHNjcm9sbERldGFpbHMuc2Nyb2xsU3RhcnQgLSBzY3JvbGxEZXRhaWxzLm9mZnNldFN0YXJ0LFxuICAgICAgb2Zmc2V0ID0gbGlzdE9mZnNldFxuXG4gICAgaWYgKGxpc3RPZmZzZXQgPD0gbGlzdEVuZE9mZnNldCAmJiBsaXN0T2Zmc2V0ICsgc2Nyb2xsRGV0YWlscy5zY3JvbGxWaWV3U2l6ZSA+PSB2aXJ0dWFsU2Nyb2xsUGFkZGluZ0JlZm9yZS52YWx1ZSkge1xuICAgICAgbGlzdE9mZnNldCAtPSB2aXJ0dWFsU2Nyb2xsUGFkZGluZ0JlZm9yZS52YWx1ZVxuICAgICAgdG9JbmRleCA9IHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlLmZyb21cbiAgICAgIG9mZnNldCA9IGxpc3RPZmZzZXRcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgbGlzdE9mZnNldCA+PSB2aXJ0dWFsU2Nyb2xsU2l6ZXNBZ2dbIGogXSAmJiB0b0luZGV4IDwgbGlzdExhc3RJbmRleDsgaisrKSB7XG4gICAgICAgIGxpc3RPZmZzZXQgLT0gdmlydHVhbFNjcm9sbFNpemVzQWdnWyBqIF1cbiAgICAgICAgdG9JbmRleCArPSBhZ2dCdWNrZXRTaXplXG4gICAgICB9XG4gICAgfVxuXG4gICAgd2hpbGUgKGxpc3RPZmZzZXQgPiAwICYmIHRvSW5kZXggPCBsaXN0TGFzdEluZGV4KSB7XG4gICAgICBsaXN0T2Zmc2V0IC09IHZpcnR1YWxTY3JvbGxTaXplc1sgdG9JbmRleCBdXG4gICAgICBpZiAobGlzdE9mZnNldCA+IC1zY3JvbGxEZXRhaWxzLnNjcm9sbFZpZXdTaXplKSB7XG4gICAgICAgIHRvSW5kZXgrK1xuICAgICAgICBvZmZzZXQgPSBsaXN0T2Zmc2V0XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgb2Zmc2V0ID0gdmlydHVhbFNjcm9sbFNpemVzWyB0b0luZGV4IF0gKyBsaXN0T2Zmc2V0XG4gICAgICB9XG4gICAgfVxuXG4gICAgc2V0VmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UoXG4gICAgICBzY3JvbGxFbCxcbiAgICAgIHNjcm9sbERldGFpbHMsXG4gICAgICB0b0luZGV4LFxuICAgICAgb2Zmc2V0XG4gICAgKVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0VmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UgKHNjcm9sbEVsLCBzY3JvbGxEZXRhaWxzLCB0b0luZGV4LCBvZmZzZXQsIGFsaWduKSB7XG4gICAgY29uc3QgYWxpZ25Gb3JjZSA9IHR5cGVvZiBhbGlnbiA9PT0gJ3N0cmluZycgJiYgYWxpZ24uaW5kZXhPZignLWZvcmNlJykgIT09IC0xXG4gICAgY29uc3QgYWxpZ25FbmQgPSBhbGlnbkZvcmNlID09PSB0cnVlID8gYWxpZ24ucmVwbGFjZSgnLWZvcmNlJywgJycpIDogYWxpZ25cbiAgICBjb25zdCBhbGlnblJhbmdlID0gYWxpZ25FbmQgIT09IHZvaWQgMCA/IGFsaWduRW5kIDogJ3N0YXJ0J1xuXG4gICAgbGV0XG4gICAgICBmcm9tID0gTWF0aC5tYXgoMCwgdG9JbmRleCAtIHZpcnR1YWxTY3JvbGxTbGljZVNpemVDb21wdXRlZC52YWx1ZVsgYWxpZ25SYW5nZSBdKSxcbiAgICAgIHRvID0gZnJvbSArIHZpcnR1YWxTY3JvbGxTbGljZVNpemVDb21wdXRlZC52YWx1ZS50b3RhbFxuXG4gICAgaWYgKHRvID4gdmlydHVhbFNjcm9sbExlbmd0aC52YWx1ZSkge1xuICAgICAgdG8gPSB2aXJ0dWFsU2Nyb2xsTGVuZ3RoLnZhbHVlXG4gICAgICBmcm9tID0gTWF0aC5tYXgoMCwgdG8gLSB2aXJ0dWFsU2Nyb2xsU2xpY2VTaXplQ29tcHV0ZWQudmFsdWUudG90YWwpXG4gICAgfVxuXG4gICAgcHJldlNjcm9sbFN0YXJ0ID0gc2Nyb2xsRGV0YWlscy5zY3JvbGxTdGFydFxuXG4gICAgY29uc3QgcmFuZ2VDaGFuZ2VkID0gZnJvbSAhPT0gdmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UudmFsdWUuZnJvbSB8fCB0byAhPT0gdmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UudmFsdWUudG9cblxuICAgIGlmIChyYW5nZUNoYW5nZWQgPT09IGZhbHNlICYmIGFsaWduRW5kID09PSB2b2lkIDApIHtcbiAgICAgIGVtaXRTY3JvbGwodG9JbmRleClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IHsgYWN0aXZlRWxlbWVudCB9ID0gZG9jdW1lbnRcbiAgICBjb25zdCBjb250ZW50RWwgPSBjb250ZW50UmVmLnZhbHVlXG4gICAgaWYgKFxuICAgICAgcmFuZ2VDaGFuZ2VkID09PSB0cnVlXG4gICAgICAmJiBjb250ZW50RWwgIT09IG51bGxcbiAgICAgICYmIGNvbnRlbnRFbCAhPT0gYWN0aXZlRWxlbWVudFxuICAgICAgJiYgY29udGVudEVsLmNvbnRhaW5zKGFjdGl2ZUVsZW1lbnQpID09PSB0cnVlXG4gICAgKSB7XG4gICAgICBjb250ZW50RWwuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCBvbkJsdXJSZWZvY3VzRm4pXG5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjb250ZW50RWw/LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0Jywgb25CbHVyUmVmb2N1c0ZuKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBzZXRPdmVyZmxvd0FuY2hvcihjb250ZW50RWwsIHRvSW5kZXggLSBmcm9tKVxuXG4gICAgY29uc3Qgc2l6ZUJlZm9yZSA9IGFsaWduRW5kICE9PSB2b2lkIDAgPyB2aXJ0dWFsU2Nyb2xsU2l6ZXMuc2xpY2UoZnJvbSwgdG9JbmRleCkucmVkdWNlKHN1bUZuLCAwKSA6IDBcblxuICAgIGlmIChyYW5nZUNoYW5nZWQgPT09IHRydWUpIHtcbiAgICAgIC8vIHZ1ZSBrZXkgbWF0Y2hpbmcgYWxnb3JpdGhtIHdvcmtzIG9ubHkgaWZcbiAgICAgIC8vIHRoZSBhcnJheSBvZiBWTm9kZXMgY2hhbmdlcyBvbiBvbmx5IG9uZSBvZiB0aGUgZW5kc1xuICAgICAgLy8gc28gd2UgZmlyc3QgY2hhbmdlIG9uZSBlbmQgYW5kIHRoZW4gdGhlIG90aGVyXG5cbiAgICAgIGNvbnN0IHRlbXBUbyA9IHRvID49IHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlLmZyb20gJiYgZnJvbSA8PSB2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZS52YWx1ZS50b1xuICAgICAgICA/IHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlLnRvXG4gICAgICAgIDogdG9cblxuICAgICAgdmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UudmFsdWUgPSB7IGZyb20sIHRvOiB0ZW1wVG8gfVxuICAgICAgdmlydHVhbFNjcm9sbFBhZGRpbmdCZWZvcmUudmFsdWUgPSBzdW1TaXplKHZpcnR1YWxTY3JvbGxTaXplc0FnZywgdmlydHVhbFNjcm9sbFNpemVzLCAwLCBmcm9tKVxuICAgICAgdmlydHVhbFNjcm9sbFBhZGRpbmdBZnRlci52YWx1ZSA9IHN1bVNpemUodmlydHVhbFNjcm9sbFNpemVzQWdnLCB2aXJ0dWFsU2Nyb2xsU2l6ZXMsIHRvLCB2aXJ0dWFsU2Nyb2xsTGVuZ3RoLnZhbHVlKVxuXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICBpZiAodmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UudmFsdWUudG8gIT09IHRvICYmIHByZXZTY3JvbGxTdGFydCA9PT0gc2Nyb2xsRGV0YWlscy5zY3JvbGxTdGFydCkge1xuICAgICAgICAgIHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlID0geyBmcm9tOiB2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZS52YWx1ZS5mcm9tLCB0byB9XG4gICAgICAgICAgdmlydHVhbFNjcm9sbFBhZGRpbmdBZnRlci52YWx1ZSA9IHN1bVNpemUodmlydHVhbFNjcm9sbFNpemVzQWdnLCB2aXJ0dWFsU2Nyb2xsU2l6ZXMsIHRvLCB2aXJ0dWFsU2Nyb2xsTGVuZ3RoLnZhbHVlKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAvLyBpZiB0aGUgc2Nyb2xsIHdhcyBjaGFuZ2VkIGdpdmUgdXBcbiAgICAgIC8vIChhbm90aGVyIGNhbGwgdG8gc2V0VmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UgYmVmb3JlIGFuaW1hdGlvbiBmcmFtZSlcbiAgICAgIGlmIChwcmV2U2Nyb2xsU3RhcnQgIT09IHNjcm9sbERldGFpbHMuc2Nyb2xsU3RhcnQpIHJldHVyblxuXG4gICAgICBpZiAocmFuZ2VDaGFuZ2VkID09PSB0cnVlKSB7XG4gICAgICAgIHVwZGF0ZVZpcnR1YWxTY3JvbGxTaXplcyhmcm9tKVxuICAgICAgfVxuXG4gICAgICBjb25zdFxuICAgICAgICBzaXplQWZ0ZXIgPSB2aXJ0dWFsU2Nyb2xsU2l6ZXMuc2xpY2UoZnJvbSwgdG9JbmRleCkucmVkdWNlKHN1bUZuLCAwKSxcbiAgICAgICAgcG9zU3RhcnQgPSBzaXplQWZ0ZXIgKyBzY3JvbGxEZXRhaWxzLm9mZnNldFN0YXJ0ICsgdmlydHVhbFNjcm9sbFBhZGRpbmdCZWZvcmUudmFsdWUsXG4gICAgICAgIHBvc0VuZCA9IHBvc1N0YXJ0ICsgdmlydHVhbFNjcm9sbFNpemVzWyB0b0luZGV4IF1cblxuICAgICAgbGV0IHNjcm9sbFBvc2l0aW9uID0gcG9zU3RhcnQgKyBvZmZzZXRcblxuICAgICAgaWYgKGFsaWduRW5kICE9PSB2b2lkIDApIHtcbiAgICAgICAgY29uc3Qgc2l6ZURpZmYgPSBzaXplQWZ0ZXIgLSBzaXplQmVmb3JlXG4gICAgICAgIGNvbnN0IHNjcm9sbFN0YXJ0ID0gc2Nyb2xsRGV0YWlscy5zY3JvbGxTdGFydCArIHNpemVEaWZmXG5cbiAgICAgICAgc2Nyb2xsUG9zaXRpb24gPSBhbGlnbkZvcmNlICE9PSB0cnVlICYmIHNjcm9sbFN0YXJ0IDwgcG9zU3RhcnQgJiYgcG9zRW5kIDwgc2Nyb2xsU3RhcnQgKyBzY3JvbGxEZXRhaWxzLnNjcm9sbFZpZXdTaXplXG4gICAgICAgICAgPyBzY3JvbGxTdGFydFxuICAgICAgICAgIDogKFxuICAgICAgICAgICAgICBhbGlnbkVuZCA9PT0gJ2VuZCdcbiAgICAgICAgICAgICAgICA/IHBvc0VuZCAtIHNjcm9sbERldGFpbHMuc2Nyb2xsVmlld1NpemVcbiAgICAgICAgICAgICAgICA6IHBvc1N0YXJ0IC0gKGFsaWduRW5kID09PSAnc3RhcnQnID8gMCA6IE1hdGgucm91bmQoKHNjcm9sbERldGFpbHMuc2Nyb2xsVmlld1NpemUgLSB2aXJ0dWFsU2Nyb2xsU2l6ZXNbIHRvSW5kZXggXSkgLyAyKSlcbiAgICAgICAgICAgIClcbiAgICAgIH1cblxuICAgICAgcHJldlNjcm9sbFN0YXJ0ID0gc2Nyb2xsUG9zaXRpb25cblxuICAgICAgc2V0U2Nyb2xsKFxuICAgICAgICBzY3JvbGxFbCxcbiAgICAgICAgc2Nyb2xsUG9zaXRpb24sXG4gICAgICAgIHByb3BzLnZpcnR1YWxTY3JvbGxIb3Jpem9udGFsLFxuICAgICAgICAkcS5sYW5nLnJ0bFxuICAgICAgKVxuXG4gICAgICBlbWl0U2Nyb2xsKHRvSW5kZXgpXG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVZpcnR1YWxTY3JvbGxTaXplcyAoZnJvbSkge1xuICAgIGNvbnN0IGNvbnRlbnRFbCA9IGNvbnRlbnRSZWYudmFsdWVcblxuICAgIGlmIChjb250ZW50RWwpIHtcbiAgICAgIGNvbnN0XG4gICAgICAgIGNoaWxkcmVuID0gZmlsdGVyUHJvdG8uY2FsbChcbiAgICAgICAgICBjb250ZW50RWwuY2hpbGRyZW4sXG4gICAgICAgICAgZWwgPT4gZWwuY2xhc3NMaXN0ICYmIGVsLmNsYXNzTGlzdC5jb250YWlucygncS12aXJ0dWFsLXNjcm9sbC0tc2tpcCcpID09PSBmYWxzZVxuICAgICAgICApLFxuICAgICAgICBjaGlsZHJlbkxlbmd0aCA9IGNoaWxkcmVuLmxlbmd0aCxcbiAgICAgICAgc2l6ZUZuID0gcHJvcHMudmlydHVhbFNjcm9sbEhvcml6b250YWwgPT09IHRydWVcbiAgICAgICAgICA/IGVsID0+IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoXG4gICAgICAgICAgOiBlbCA9PiBlbC5vZmZzZXRIZWlnaHRcblxuICAgICAgbGV0XG4gICAgICAgIGluZGV4ID0gZnJvbSxcbiAgICAgICAgc2l6ZSwgZGlmZlxuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuTGVuZ3RoOykge1xuICAgICAgICBzaXplID0gc2l6ZUZuKGNoaWxkcmVuWyBpIF0pXG4gICAgICAgIGkrK1xuXG4gICAgICAgIHdoaWxlIChpIDwgY2hpbGRyZW5MZW5ndGggJiYgY2hpbGRyZW5bIGkgXS5jbGFzc0xpc3QuY29udGFpbnMoJ3EtdmlydHVhbC1zY3JvbGwtLXdpdGgtcHJldicpID09PSB0cnVlKSB7XG4gICAgICAgICAgc2l6ZSArPSBzaXplRm4oY2hpbGRyZW5bIGkgXSlcbiAgICAgICAgICBpKytcbiAgICAgICAgfVxuXG4gICAgICAgIGRpZmYgPSBzaXplIC0gdmlydHVhbFNjcm9sbFNpemVzWyBpbmRleCBdXG5cbiAgICAgICAgaWYgKGRpZmYgIT09IDApIHtcbiAgICAgICAgICB2aXJ0dWFsU2Nyb2xsU2l6ZXNbIGluZGV4IF0gKz0gZGlmZlxuICAgICAgICAgIHZpcnR1YWxTY3JvbGxTaXplc0FnZ1sgTWF0aC5mbG9vcihpbmRleCAvIGFnZ0J1Y2tldFNpemUpIF0gKz0gZGlmZlxuICAgICAgICB9XG5cbiAgICAgICAgaW5kZXgrK1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uQmx1clJlZm9jdXNGbiAoKSB7XG4gICAgY29udGVudFJlZi52YWx1ZT8uZm9jdXMoKVxuICB9XG5cbiAgZnVuY3Rpb24gbG9jYWxSZXNldFZpcnR1YWxTY3JvbGwgKHRvSW5kZXgsIGZ1bGxSZXNldCkge1xuICAgIGNvbnN0IGRlZmF1bHRTaXplID0gMSAqIHZpcnR1YWxTY3JvbGxJdGVtU2l6ZUNvbXB1dGVkLnZhbHVlXG5cbiAgICBpZiAoZnVsbFJlc2V0ID09PSB0cnVlIHx8IEFycmF5LmlzQXJyYXkodmlydHVhbFNjcm9sbFNpemVzKSA9PT0gZmFsc2UpIHtcbiAgICAgIHZpcnR1YWxTY3JvbGxTaXplcyA9IFtdXG4gICAgfVxuXG4gICAgY29uc3Qgb2xkVmlydHVhbFNjcm9sbFNpemVzTGVuZ3RoID0gdmlydHVhbFNjcm9sbFNpemVzLmxlbmd0aFxuXG4gICAgdmlydHVhbFNjcm9sbFNpemVzLmxlbmd0aCA9IHZpcnR1YWxTY3JvbGxMZW5ndGgudmFsdWVcblxuICAgIGZvciAobGV0IGkgPSB2aXJ0dWFsU2Nyb2xsTGVuZ3RoLnZhbHVlIC0gMTsgaSA+PSBvbGRWaXJ0dWFsU2Nyb2xsU2l6ZXNMZW5ndGg7IGktLSkge1xuICAgICAgdmlydHVhbFNjcm9sbFNpemVzWyBpIF0gPSBkZWZhdWx0U2l6ZVxuICAgIH1cblxuICAgIGNvbnN0IGpNYXggPSBNYXRoLmZsb29yKCh2aXJ0dWFsU2Nyb2xsTGVuZ3RoLnZhbHVlIC0gMSkgLyBhZ2dCdWNrZXRTaXplKVxuICAgIHZpcnR1YWxTY3JvbGxTaXplc0FnZyA9IFtdXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPD0gak1heDsgaisrKSB7XG4gICAgICBsZXQgc2l6ZSA9IDBcbiAgICAgIGNvbnN0IGlNYXggPSBNYXRoLm1pbigoaiArIDEpICogYWdnQnVja2V0U2l6ZSwgdmlydHVhbFNjcm9sbExlbmd0aC52YWx1ZSlcbiAgICAgIGZvciAobGV0IGkgPSBqICogYWdnQnVja2V0U2l6ZTsgaSA8IGlNYXg7IGkrKykge1xuICAgICAgICBzaXplICs9IHZpcnR1YWxTY3JvbGxTaXplc1sgaSBdXG4gICAgICB9XG4gICAgICB2aXJ0dWFsU2Nyb2xsU2l6ZXNBZ2cucHVzaChzaXplKVxuICAgIH1cblxuICAgIHByZXZUb0luZGV4ID0gLTFcbiAgICBwcmV2U2Nyb2xsU3RhcnQgPSB2b2lkIDBcblxuICAgIHZpcnR1YWxTY3JvbGxQYWRkaW5nQmVmb3JlLnZhbHVlID0gc3VtU2l6ZSh2aXJ0dWFsU2Nyb2xsU2l6ZXNBZ2csIHZpcnR1YWxTY3JvbGxTaXplcywgMCwgdmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UudmFsdWUuZnJvbSlcbiAgICB2aXJ0dWFsU2Nyb2xsUGFkZGluZ0FmdGVyLnZhbHVlID0gc3VtU2l6ZSh2aXJ0dWFsU2Nyb2xsU2l6ZXNBZ2csIHZpcnR1YWxTY3JvbGxTaXplcywgdmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UudmFsdWUudG8sIHZpcnR1YWxTY3JvbGxMZW5ndGgudmFsdWUpXG5cbiAgICBpZiAodG9JbmRleCA+PSAwKSB7XG4gICAgICB1cGRhdGVWaXJ0dWFsU2Nyb2xsU2l6ZXModmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UudmFsdWUuZnJvbSlcbiAgICAgIG5leHRUaWNrKCgpID0+IHsgc2Nyb2xsVG8odG9JbmRleCkgfSlcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBvblZpcnR1YWxTY3JvbGxFdnQoKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNldFZpcnR1YWxTY3JvbGxTaXplIChzY3JvbGxWaWV3U2l6ZSkge1xuICAgIGlmIChzY3JvbGxWaWV3U2l6ZSA9PT0gdm9pZCAwICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zdCBzY3JvbGxFbCA9IGdldFZpcnR1YWxTY3JvbGxUYXJnZXQoKVxuXG4gICAgICBpZiAoc2Nyb2xsRWwgIT09IHZvaWQgMCAmJiBzY3JvbGxFbCAhPT0gbnVsbCAmJiBzY3JvbGxFbC5ub2RlVHlwZSAhPT0gOCkge1xuICAgICAgICBzY3JvbGxWaWV3U2l6ZSA9IGdldFNjcm9sbERldGFpbHMoXG4gICAgICAgICAgc2Nyb2xsRWwsXG4gICAgICAgICAgZ2V0VmlydHVhbFNjcm9sbEVsKCksXG4gICAgICAgICAgYmVmb3JlUmVmLnZhbHVlLFxuICAgICAgICAgIGFmdGVyUmVmLnZhbHVlLFxuICAgICAgICAgIHByb3BzLnZpcnR1YWxTY3JvbGxIb3Jpem9udGFsLFxuICAgICAgICAgICRxLmxhbmcucnRsLFxuICAgICAgICAgIHByb3BzLnZpcnR1YWxTY3JvbGxTdGlja3lTaXplU3RhcnQsXG4gICAgICAgICAgcHJvcHMudmlydHVhbFNjcm9sbFN0aWNreVNpemVFbmRcbiAgICAgICAgKS5zY3JvbGxWaWV3U2l6ZVxuICAgICAgfVxuICAgIH1cblxuICAgIGxvY2FsU2Nyb2xsVmlld1NpemUgPSBzY3JvbGxWaWV3U2l6ZVxuXG4gICAgY29uc3QgdmlydHVhbFNjcm9sbFNsaWNlUmF0aW9CZWZvcmUgPSBwYXJzZUZsb2F0KHByb3BzLnZpcnR1YWxTY3JvbGxTbGljZVJhdGlvQmVmb3JlKSB8fCAwXG4gICAgY29uc3QgdmlydHVhbFNjcm9sbFNsaWNlUmF0aW9BZnRlciA9IHBhcnNlRmxvYXQocHJvcHMudmlydHVhbFNjcm9sbFNsaWNlUmF0aW9BZnRlcikgfHwgMFxuICAgIGNvbnN0IG11bHRpcGxpZXIgPSAxICsgdmlydHVhbFNjcm9sbFNsaWNlUmF0aW9CZWZvcmUgKyB2aXJ0dWFsU2Nyb2xsU2xpY2VSYXRpb0FmdGVyXG4gICAgY29uc3QgdmlldyA9IHNjcm9sbFZpZXdTaXplID09PSB2b2lkIDAgfHwgc2Nyb2xsVmlld1NpemUgPD0gMFxuICAgICAgPyAxXG4gICAgICA6IE1hdGguY2VpbChzY3JvbGxWaWV3U2l6ZSAvIHZpcnR1YWxTY3JvbGxJdGVtU2l6ZUNvbXB1dGVkLnZhbHVlKVxuXG4gICAgY29uc3QgYmFzZVNpemUgPSBNYXRoLm1heChcbiAgICAgIDEsXG4gICAgICB2aWV3LFxuICAgICAgTWF0aC5jZWlsKChwcm9wcy52aXJ0dWFsU2Nyb2xsU2xpY2VTaXplID4gMCA/IHByb3BzLnZpcnR1YWxTY3JvbGxTbGljZVNpemUgOiAxMCkgLyBtdWx0aXBsaWVyKVxuICAgIClcblxuICAgIHZpcnR1YWxTY3JvbGxTbGljZVNpemVDb21wdXRlZC52YWx1ZSA9IHtcbiAgICAgIHRvdGFsOiBNYXRoLmNlaWwoYmFzZVNpemUgKiBtdWx0aXBsaWVyKSxcbiAgICAgIHN0YXJ0OiBNYXRoLmNlaWwoYmFzZVNpemUgKiB2aXJ0dWFsU2Nyb2xsU2xpY2VSYXRpb0JlZm9yZSksXG4gICAgICBjZW50ZXI6IE1hdGguY2VpbChiYXNlU2l6ZSAqICgwLjUgKyB2aXJ0dWFsU2Nyb2xsU2xpY2VSYXRpb0JlZm9yZSkpLFxuICAgICAgZW5kOiBNYXRoLmNlaWwoYmFzZVNpemUgKiAoMSArIHZpcnR1YWxTY3JvbGxTbGljZVJhdGlvQmVmb3JlKSksXG4gICAgICB2aWV3XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcGFkVmlydHVhbFNjcm9sbCAodGFnLCBjb250ZW50KSB7XG4gICAgY29uc3QgcGFkZGluZ1NpemUgPSBwcm9wcy52aXJ0dWFsU2Nyb2xsSG9yaXpvbnRhbCA9PT0gdHJ1ZSA/ICd3aWR0aCcgOiAnaGVpZ2h0J1xuICAgIGNvbnN0IHN0eWxlID0ge1xuICAgICAgWyAnLS1xLXZpcnR1YWwtc2Nyb2xsLWl0ZW0tJyArIHBhZGRpbmdTaXplIF06IHZpcnR1YWxTY3JvbGxJdGVtU2l6ZUNvbXB1dGVkLnZhbHVlICsgJ3B4J1xuICAgIH1cblxuICAgIHJldHVybiBbXG4gICAgICB0YWcgPT09ICd0Ym9keSdcbiAgICAgICAgPyBoKHRhZywge1xuICAgICAgICAgIGNsYXNzOiAncS12aXJ0dWFsLXNjcm9sbF9fcGFkZGluZycsXG4gICAgICAgICAga2V5OiAnYmVmb3JlJyxcbiAgICAgICAgICByZWY6IGJlZm9yZVJlZlxuICAgICAgICB9LCBbXG4gICAgICAgICAgaCgndHInLCBbXG4gICAgICAgICAgICBoKCd0ZCcsIHtcbiAgICAgICAgICAgICAgc3R5bGU6IHsgWyBwYWRkaW5nU2l6ZSBdOiBgJHsgdmlydHVhbFNjcm9sbFBhZGRpbmdCZWZvcmUudmFsdWUgfXB4YCwgLi4uc3R5bGUgfSxcbiAgICAgICAgICAgICAgY29sc3BhbjogY29sc3BhbkF0dHIudmFsdWVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgXSlcbiAgICAgICAgXSlcbiAgICAgICAgOiBoKHRhZywge1xuICAgICAgICAgIGNsYXNzOiAncS12aXJ0dWFsLXNjcm9sbF9fcGFkZGluZycsXG4gICAgICAgICAga2V5OiAnYmVmb3JlJyxcbiAgICAgICAgICByZWY6IGJlZm9yZVJlZixcbiAgICAgICAgICBzdHlsZTogeyBbIHBhZGRpbmdTaXplIF06IGAkeyB2aXJ0dWFsU2Nyb2xsUGFkZGluZ0JlZm9yZS52YWx1ZSB9cHhgLCAuLi5zdHlsZSB9XG4gICAgICAgIH0pLFxuXG4gICAgICBoKHRhZywge1xuICAgICAgICBjbGFzczogJ3EtdmlydHVhbC1zY3JvbGxfX2NvbnRlbnQnLFxuICAgICAgICBrZXk6ICdjb250ZW50JyxcbiAgICAgICAgcmVmOiBjb250ZW50UmVmLFxuICAgICAgICB0YWJpbmRleDogLTFcbiAgICAgIH0sIGNvbnRlbnQuZmxhdCgpKSxcblxuICAgICAgdGFnID09PSAndGJvZHknXG4gICAgICAgID8gaCh0YWcsIHtcbiAgICAgICAgICBjbGFzczogJ3EtdmlydHVhbC1zY3JvbGxfX3BhZGRpbmcnLFxuICAgICAgICAgIGtleTogJ2FmdGVyJyxcbiAgICAgICAgICByZWY6IGFmdGVyUmVmXG4gICAgICAgIH0sIFtcbiAgICAgICAgICBoKCd0cicsIFtcbiAgICAgICAgICAgIGgoJ3RkJywge1xuICAgICAgICAgICAgICBzdHlsZTogeyBbIHBhZGRpbmdTaXplIF06IGAkeyB2aXJ0dWFsU2Nyb2xsUGFkZGluZ0FmdGVyLnZhbHVlIH1weGAsIC4uLnN0eWxlIH0sXG4gICAgICAgICAgICAgIGNvbHNwYW46IGNvbHNwYW5BdHRyLnZhbHVlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF0pXG4gICAgICAgIF0pXG4gICAgICAgIDogaCh0YWcsIHtcbiAgICAgICAgICBjbGFzczogJ3EtdmlydHVhbC1zY3JvbGxfX3BhZGRpbmcnLFxuICAgICAgICAgIGtleTogJ2FmdGVyJyxcbiAgICAgICAgICByZWY6IGFmdGVyUmVmLFxuICAgICAgICAgIHN0eWxlOiB7IFsgcGFkZGluZ1NpemUgXTogYCR7IHZpcnR1YWxTY3JvbGxQYWRkaW5nQWZ0ZXIudmFsdWUgfXB4YCwgLi4uc3R5bGUgfVxuICAgICAgICB9KVxuICAgIF1cbiAgfVxuXG4gIGZ1bmN0aW9uIGVtaXRTY3JvbGwgKGluZGV4KSB7XG4gICAgaWYgKHByZXZUb0luZGV4ICE9PSBpbmRleCkge1xuICAgICAgcHJvcHMub25WaXJ0dWFsU2Nyb2xsICE9PSB2b2lkIDAgJiYgZW1pdCgndmlydHVhbFNjcm9sbCcsIHtcbiAgICAgICAgaW5kZXgsXG4gICAgICAgIGZyb206IHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlLmZyb20sXG4gICAgICAgIHRvOiB2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZS52YWx1ZS50byAtIDEsXG4gICAgICAgIGRpcmVjdGlvbjogaW5kZXggPCBwcmV2VG9JbmRleCA/ICdkZWNyZWFzZScgOiAnaW5jcmVhc2UnLFxuICAgICAgICByZWY6IHByb3h5XG4gICAgICB9KVxuXG4gICAgICBwcmV2VG9JbmRleCA9IGluZGV4XG4gICAgfVxuICB9XG5cbiAgc2V0VmlydHVhbFNjcm9sbFNpemUoKVxuICBjb25zdCBvblZpcnR1YWxTY3JvbGxFdnQgPSBkZWJvdW5jZShcbiAgICBsb2NhbE9uVmlydHVhbFNjcm9sbEV2dCxcbiAgICAkcS5wbGF0Zm9ybS5pcy5pb3MgPT09IHRydWUgPyAxMjAgOiAzNVxuICApXG5cbiAgb25CZWZvcmVNb3VudCgoKSA9PiB7XG4gICAgc2V0VmlydHVhbFNjcm9sbFNpemUoKVxuICB9KVxuXG4gIGxldCBzaG91bGRBY3RpdmF0ZSA9IGZhbHNlXG5cbiAgb25EZWFjdGl2YXRlZCgoKSA9PiB7XG4gICAgc2hvdWxkQWN0aXZhdGUgPSB0cnVlXG4gIH0pXG5cbiAgb25BY3RpdmF0ZWQoKCkgPT4ge1xuICAgIGlmIChzaG91bGRBY3RpdmF0ZSAhPT0gdHJ1ZSkgcmV0dXJuXG5cbiAgICBjb25zdCBzY3JvbGxFbCA9IGdldFZpcnR1YWxTY3JvbGxUYXJnZXQoKVxuXG4gICAgaWYgKHByZXZTY3JvbGxTdGFydCAhPT0gdm9pZCAwICYmIHNjcm9sbEVsICE9PSB2b2lkIDAgJiYgc2Nyb2xsRWwgIT09IG51bGwgJiYgc2Nyb2xsRWwubm9kZVR5cGUgIT09IDgpIHtcbiAgICAgIHNldFNjcm9sbChcbiAgICAgICAgc2Nyb2xsRWwsXG4gICAgICAgIHByZXZTY3JvbGxTdGFydCxcbiAgICAgICAgcHJvcHMudmlydHVhbFNjcm9sbEhvcml6b250YWwsXG4gICAgICAgICRxLmxhbmcucnRsXG4gICAgICApXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgc2Nyb2xsVG8ocHJldlRvSW5kZXgpXG4gICAgfVxuICB9KVxuXG4gIF9fUVVBU0FSX1NTUl9fIHx8IG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgb25WaXJ0dWFsU2Nyb2xsRXZ0LmNhbmNlbCgpXG4gIH0pXG5cbiAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gIE9iamVjdC5hc3NpZ24ocHJveHksIHsgc2Nyb2xsVG8sIHJlc2V0LCByZWZyZXNoIH0pXG5cbiAgcmV0dXJuIHtcbiAgICB2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZSxcbiAgICB2aXJ0dWFsU2Nyb2xsU2xpY2VTaXplQ29tcHV0ZWQsXG5cbiAgICBzZXRWaXJ0dWFsU2Nyb2xsU2l6ZSxcbiAgICBvblZpcnR1YWxTY3JvbGxFdnQsXG4gICAgbG9jYWxSZXNldFZpcnR1YWxTY3JvbGwsXG4gICAgcGFkVmlydHVhbFNjcm9sbCxcblxuICAgIHNjcm9sbFRvLFxuICAgIHJlc2V0LFxuICAgIHJlZnJlc2hcbiAgfVxufVxuIiwiaW1wb3J0IHsgY2xpZW50IH0gZnJvbSAnLi4vLi4vcGx1Z2lucy9wbGF0Zm9ybS9QbGF0Zm9ybS5qcydcblxuY29uc3QgaXNKYXBhbmVzZSA9IC9bXFx1MzAwMC1cXHUzMDNmXFx1MzA0MC1cXHUzMDlmXFx1MzBhMC1cXHUzMGZmXFx1ZmYwMC1cXHVmZjlmXFx1NGUwMC1cXHU5ZmFmXFx1MzQwMC1cXHU0ZGJmXS9cbmNvbnN0IGlzQ2hpbmVzZSA9IC9bXFx1NGUwMC1cXHU5ZmZmXFx1MzQwMC1cXHU0ZGJmXFx1ezIwMDAwfS1cXHV7MmE2ZGZ9XFx1ezJhNzAwfS1cXHV7MmI3M2Z9XFx1ezJiNzQwfS1cXHV7MmI4MWZ9XFx1ezJiODIwfS1cXHV7MmNlYWZ9XFx1ZjkwMC1cXHVmYWZmXFx1MzMwMC1cXHUzM2ZmXFx1ZmUzMC1cXHVmZTRmXFx1ZjkwMC1cXHVmYWZmXFx1ezJmODAwfS1cXHV7MmZhMWZ9XS91XG5jb25zdCBpc0tvcmVhbiA9IC9bXFx1MzEzMS1cXHUzMTRlXFx1MzE0Zi1cXHUzMTYzXFx1YWMwMC1cXHVkN2EzXS9cbmNvbnN0IGlzUGxhaW5UZXh0ID0gL1thLXowLTlfIC1dJC9pXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChvbklucHV0KSB7XG4gIHJldHVybiBmdW5jdGlvbiBvbkNvbXBvc2l0aW9uIChlKSB7XG4gICAgaWYgKGUudHlwZSA9PT0gJ2NvbXBvc2l0aW9uZW5kJyB8fCBlLnR5cGUgPT09ICdjaGFuZ2UnKSB7XG4gICAgICBpZiAoZS50YXJnZXQucUNvbXBvc2luZyAhPT0gdHJ1ZSkgcmV0dXJuXG4gICAgICBlLnRhcmdldC5xQ29tcG9zaW5nID0gZmFsc2VcbiAgICAgIG9uSW5wdXQoZSlcbiAgICB9XG4gICAgZWxzZSBpZiAoXG4gICAgICBlLnR5cGUgPT09ICdjb21wb3NpdGlvbnVwZGF0ZSdcbiAgICAgICYmIGUudGFyZ2V0LnFDb21wb3NpbmcgIT09IHRydWVcbiAgICAgICYmIHR5cGVvZiBlLmRhdGEgPT09ICdzdHJpbmcnXG4gICAgKSB7XG4gICAgICBjb25zdCBpc0NvbXBvc2luZyA9IGNsaWVudC5pcy5maXJlZm94ID09PSB0cnVlXG4gICAgICAgID8gaXNQbGFpblRleHQudGVzdChlLmRhdGEpID09PSBmYWxzZVxuICAgICAgICA6IGlzSmFwYW5lc2UudGVzdChlLmRhdGEpID09PSB0cnVlIHx8IGlzQ2hpbmVzZS50ZXN0KGUuZGF0YSkgPT09IHRydWUgfHwgaXNLb3JlYW4udGVzdChlLmRhdGEpID09PSB0cnVlXG5cbiAgICAgIGlmIChpc0NvbXBvc2luZyA9PT0gdHJ1ZSkge1xuICAgICAgICBlLnRhcmdldC5xQ29tcG9zaW5nID0gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiY29uc3QgdW5pdHMgPSBbICdCJywgJ0tCJywgJ01CJywgJ0dCJywgJ1RCJywgJ1BCJyBdXG5cbmV4cG9ydCBmdW5jdGlvbiBodW1hblN0b3JhZ2VTaXplIChieXRlcywgZGVjaW1hbHMgPSAxKSB7XG4gIGxldCB1ID0gMFxuXG4gIHdoaWxlIChwYXJzZUludChieXRlcywgMTApID49IDEwMjQgJiYgdSA8IHVuaXRzLmxlbmd0aCAtIDEpIHtcbiAgICBieXRlcyAvPSAxMDI0XG4gICAgKyt1XG4gIH1cblxuICByZXR1cm4gYCR7IGJ5dGVzLnRvRml4ZWQoZGVjaW1hbHMpIH0keyB1bml0c1sgdSBdIH1gXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYXBpdGFsaXplIChzdHIpIHtcbiAgcmV0dXJuIHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYmV0d2VlbiAodiwgbWluLCBtYXgpIHtcbiAgcmV0dXJuIG1heCA8PSBtaW5cbiAgICA/IG1pblxuICAgIDogTWF0aC5taW4obWF4LCBNYXRoLm1heChtaW4sIHYpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplVG9JbnRlcnZhbCAodiwgbWluLCBtYXgpIHtcbiAgaWYgKG1heCA8PSBtaW4pIHtcbiAgICByZXR1cm4gbWluXG4gIH1cblxuICBjb25zdCBzaXplID0gKG1heCAtIG1pbiArIDEpXG5cbiAgbGV0IGluZGV4ID0gbWluICsgKHYgLSBtaW4pICUgc2l6ZVxuICBpZiAoaW5kZXggPCBtaW4pIHtcbiAgICBpbmRleCA9IHNpemUgKyBpbmRleFxuICB9XG5cbiAgcmV0dXJuIGluZGV4ID09PSAwID8gMCA6IGluZGV4IC8vIGZpeCBmb3IgKC1hICUgYSkgPT4gLTBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhZCAodiwgbGVuZ3RoID0gMiwgY2hhciA9ICcwJykge1xuICBpZiAodiA9PT0gdm9pZCAwIHx8IHYgPT09IG51bGwpIHtcbiAgICByZXR1cm4gdlxuICB9XG5cbiAgY29uc3QgdmFsID0gJycgKyB2XG4gIHJldHVybiB2YWwubGVuZ3RoID49IGxlbmd0aFxuICAgID8gdmFsXG4gICAgOiBuZXcgQXJyYXkobGVuZ3RoIC0gdmFsLmxlbmd0aCArIDEpLmpvaW4oY2hhcikgKyB2YWxcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBodW1hblN0b3JhZ2VTaXplLFxuICBjYXBpdGFsaXplLFxuICBiZXR3ZWVuLFxuICBub3JtYWxpemVUb0ludGVydmFsLFxuICBwYWRcbn1cbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIHdhdGNoLCBvbkJlZm9yZVVwZGF0ZSwgb25VcGRhdGVkLCBvbkJlZm9yZVVubW91bnQsIG5leHRUaWNrLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRRmllbGQgZnJvbSAnLi4vZmllbGQvUUZpZWxkLmpzJ1xuaW1wb3J0IFFJY29uIGZyb20gJy4uL2ljb24vUUljb24uanMnXG5pbXBvcnQgUUNoaXAgZnJvbSAnLi4vY2hpcC9RQ2hpcC5qcydcblxuaW1wb3J0IFFJdGVtIGZyb20gJy4uL2l0ZW0vUUl0ZW0uanMnXG5pbXBvcnQgUUl0ZW1TZWN0aW9uIGZyb20gJy4uL2l0ZW0vUUl0ZW1TZWN0aW9uLmpzJ1xuaW1wb3J0IFFJdGVtTGFiZWwgZnJvbSAnLi4vaXRlbS9RSXRlbUxhYmVsLmpzJ1xuXG5pbXBvcnQgUU1lbnUgZnJvbSAnLi4vbWVudS9RTWVudS5qcydcbmltcG9ydCBRRGlhbG9nIGZyb20gJy4uL2RpYWxvZy9RRGlhbG9nLmpzJ1xuXG5pbXBvcnQgdXNlRmllbGQsIHsgdXNlRmllbGRTdGF0ZSwgdXNlRmllbGRQcm9wcywgdXNlRmllbGRFbWl0cywgZmllbGRWYWx1ZUlzRmlsbGVkIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtZmllbGQvdXNlLWZpZWxkLmpzJ1xuaW1wb3J0IHsgdXNlVmlydHVhbFNjcm9sbCwgdXNlVmlydHVhbFNjcm9sbFByb3BzIH0gZnJvbSAnLi4vdmlydHVhbC1zY3JvbGwvdXNlLXZpcnR1YWwtc2Nyb2xsLmpzJ1xuaW1wb3J0IHsgdXNlRm9ybVByb3BzLCB1c2VGb3JtSW5wdXROYW1lQXR0ciB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3VzZS1mb3JtL3ByaXZhdGUudXNlLWZvcm0uanMnXG5pbXBvcnQgdXNlS2V5Q29tcG9zaXRpb24gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2Uta2V5LWNvbXBvc2l0aW9uL3VzZS1rZXktY29tcG9zaXRpb24uanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGlzRGVlcEVxdWFsIH0gZnJvbSAnLi4vLi4vdXRpbHMvaXMvaXMuanMnXG5pbXBvcnQgeyBzdG9wLCBwcmV2ZW50LCBzdG9wQW5kUHJldmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50L2V2ZW50LmpzJ1xuaW1wb3J0IHsgbm9ybWFsaXplVG9JbnRlcnZhbCB9IGZyb20gJy4uLy4uL3V0aWxzL2Zvcm1hdC9mb3JtYXQuanMnXG5pbXBvcnQgeyBzaG91bGRJZ25vcmVLZXksIGlzS2V5Q29kZSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUua2V5Ym9hcmQva2V5LWNvbXBvc2l0aW9uLmpzJ1xuaW1wb3J0IHsgaE1lcmdlU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcblxuY29uc3QgdmFsaWRhdGVOZXdWYWx1ZU1vZGUgPSB2ID0+IFsgJ2FkZCcsICdhZGQtdW5pcXVlJywgJ3RvZ2dsZScgXS5pbmNsdWRlcyh2KVxuY29uc3QgcmVFc2NhcGVMaXN0ID0gJy4qKz9eJHt9KCl8W11cXFxcJ1xuY29uc3QgZmllbGRQcm9wc0xpc3QgPSBPYmplY3Qua2V5cyh1c2VGaWVsZFByb3BzKVxuXG5mdW5jdGlvbiBnZXRQcm9wVmFsdWVGbiAodXNlclByb3BOYW1lLCBkZWZhdWx0UHJvcE5hbWUpIHtcbiAgaWYgKHR5cGVvZiB1c2VyUHJvcE5hbWUgPT09ICdmdW5jdGlvbicpIHJldHVybiB1c2VyUHJvcE5hbWVcblxuICBjb25zdCBwcm9wTmFtZSA9IHVzZXJQcm9wTmFtZSAhPT0gdm9pZCAwXG4gICAgPyB1c2VyUHJvcE5hbWVcbiAgICA6IGRlZmF1bHRQcm9wTmFtZVxuXG4gIHJldHVybiBvcHQgPT4gKChvcHQgIT09IG51bGwgJiYgdHlwZW9mIG9wdCA9PT0gJ29iamVjdCcgJiYgcHJvcE5hbWUgaW4gb3B0KSA/IG9wdFsgcHJvcE5hbWUgXSA6IG9wdClcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FTZWxlY3QnLFxuXG4gIGluaGVyaXRBdHRyczogZmFsc2UsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VWaXJ0dWFsU2Nyb2xsUHJvcHMsXG4gICAgLi4udXNlRm9ybVByb3BzLFxuICAgIC4uLnVzZUZpZWxkUHJvcHMsXG5cbiAgICAvLyBvdmVycmlkZSBvZiB1c2VGaWVsZFByb3BzID4gbW9kZWxWYWx1ZVxuICAgIG1vZGVsVmFsdWU6IHtcbiAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgfSxcblxuICAgIG11bHRpcGxlOiBCb29sZWFuLFxuXG4gICAgZGlzcGxheVZhbHVlOiBbIFN0cmluZywgTnVtYmVyIF0sXG4gICAgZGlzcGxheVZhbHVlSHRtbDogQm9vbGVhbixcbiAgICBkcm9wZG93bkljb246IFN0cmluZyxcblxuICAgIG9wdGlvbnM6IHtcbiAgICAgIHR5cGU6IEFycmF5LFxuICAgICAgZGVmYXVsdDogKCkgPT4gW11cbiAgICB9LFxuXG4gICAgb3B0aW9uVmFsdWU6IFsgRnVuY3Rpb24sIFN0cmluZyBdLFxuICAgIG9wdGlvbkxhYmVsOiBbIEZ1bmN0aW9uLCBTdHJpbmcgXSxcbiAgICBvcHRpb25EaXNhYmxlOiBbIEZ1bmN0aW9uLCBTdHJpbmcgXSxcblxuICAgIGhpZGVTZWxlY3RlZDogQm9vbGVhbixcbiAgICBoaWRlRHJvcGRvd25JY29uOiBCb29sZWFuLFxuICAgIGZpbGxJbnB1dDogQm9vbGVhbixcblxuICAgIG1heFZhbHVlczogWyBOdW1iZXIsIFN0cmluZyBdLFxuXG4gICAgb3B0aW9uc0RlbnNlOiBCb29sZWFuLFxuICAgIG9wdGlvbnNEYXJrOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH0sXG4gICAgb3B0aW9uc1NlbGVjdGVkQ2xhc3M6IFN0cmluZyxcbiAgICBvcHRpb25zSHRtbDogQm9vbGVhbixcblxuICAgIG9wdGlvbnNDb3ZlcjogQm9vbGVhbixcblxuICAgIG1lbnVTaHJpbms6IEJvb2xlYW4sXG4gICAgbWVudUFuY2hvcjogU3RyaW5nLFxuICAgIG1lbnVTZWxmOiBTdHJpbmcsXG4gICAgbWVudU9mZnNldDogQXJyYXksXG5cbiAgICBwb3B1cENvbnRlbnRDbGFzczogU3RyaW5nLFxuICAgIHBvcHVwQ29udGVudFN0eWxlOiBbIFN0cmluZywgQXJyYXksIE9iamVjdCBdLFxuICAgIHBvcHVwTm9Sb3V0ZURpc21pc3M6IEJvb2xlYW4sXG5cbiAgICB1c2VJbnB1dDogQm9vbGVhbixcbiAgICB1c2VDaGlwczogQm9vbGVhbixcblxuICAgIG5ld1ZhbHVlTW9kZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0ZU5ld1ZhbHVlTW9kZVxuICAgIH0sXG5cbiAgICBtYXBPcHRpb25zOiBCb29sZWFuLFxuICAgIGVtaXRWYWx1ZTogQm9vbGVhbixcblxuICAgIGRpc2FibGVUYWJTZWxlY3Rpb246IEJvb2xlYW4sXG5cbiAgICBpbnB1dERlYm91bmNlOiB7XG4gICAgICB0eXBlOiBbIE51bWJlciwgU3RyaW5nIF0sXG4gICAgICBkZWZhdWx0OiA1MDBcbiAgICB9LFxuXG4gICAgaW5wdXRDbGFzczogWyBBcnJheSwgU3RyaW5nLCBPYmplY3QgXSxcbiAgICBpbnB1dFN0eWxlOiBbIEFycmF5LCBTdHJpbmcsIE9iamVjdCBdLFxuXG4gICAgdGFiaW5kZXg6IHtcbiAgICAgIHR5cGU6IFsgU3RyaW5nLCBOdW1iZXIgXSxcbiAgICAgIGRlZmF1bHQ6IDBcbiAgICB9LFxuXG4gICAgYXV0b2NvbXBsZXRlOiBTdHJpbmcsXG5cbiAgICB0cmFuc2l0aW9uU2hvdzoge30sXG4gICAgdHJhbnNpdGlvbkhpZGU6IHt9LFxuICAgIHRyYW5zaXRpb25EdXJhdGlvbjoge30sXG5cbiAgICBiZWhhdmlvcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsaWRhdG9yOiB2ID0+IFsgJ2RlZmF1bHQnLCAnbWVudScsICdkaWFsb2cnIF0uaW5jbHVkZXModiksXG4gICAgICBkZWZhdWx0OiAnZGVmYXVsdCdcbiAgICB9LFxuXG4gICAgLy8gb3ZlcnJpZGUgb2YgdXNlVmlydHVhbFNjcm9sbFByb3BzID4gdmlydHVhbFNjcm9sbEl0ZW1TaXplIChubyBkZWZhdWx0KVxuICAgIHZpcnR1YWxTY3JvbGxJdGVtU2l6ZTogdXNlVmlydHVhbFNjcm9sbFByb3BzLnZpcnR1YWxTY3JvbGxJdGVtU2l6ZS50eXBlLFxuXG4gICAgb25OZXdWYWx1ZTogRnVuY3Rpb24sXG4gICAgb25GaWx0ZXI6IEZ1bmN0aW9uXG4gIH0sXG5cbiAgZW1pdHM6IFtcbiAgICAuLi51c2VGaWVsZEVtaXRzLFxuICAgICdhZGQnLCAncmVtb3ZlJywgJ2lucHV0VmFsdWUnLFxuICAgICdrZXl1cCcsICdrZXlwcmVzcycsICdrZXlkb3duJyxcbiAgICAncG9wdXBTaG93JywgJ3BvcHVwSGlkZScsXG4gICAgJ2ZpbHRlckFib3J0J1xuICBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCB9KSB7XG4gICAgY29uc3QgeyBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCB7ICRxIH0gPSBwcm94eVxuXG4gICAgY29uc3QgbWVudSA9IHJlZihmYWxzZSlcbiAgICBjb25zdCBkaWFsb2cgPSByZWYoZmFsc2UpXG4gICAgY29uc3Qgb3B0aW9uSW5kZXggPSByZWYoLTEpXG4gICAgY29uc3QgaW5wdXRWYWx1ZSA9IHJlZignJylcbiAgICBjb25zdCBkaWFsb2dGaWVsZEZvY3VzZWQgPSByZWYoZmFsc2UpXG4gICAgY29uc3QgaW5uZXJMb2FkaW5nSW5kaWNhdG9yID0gcmVmKGZhbHNlKVxuXG4gICAgbGV0IGZpbHRlclRpbWVyID0gbnVsbCwgaW5wdXRWYWx1ZVRpbWVyID0gbnVsbCxcbiAgICAgIGlubmVyVmFsdWVDYWNoZSxcbiAgICAgIGhhc0RpYWxvZywgdXNlcklucHV0VmFsdWUsIGZpbHRlcklkID0gbnVsbCwgZGVmYXVsdElucHV0VmFsdWUsXG4gICAgICB0cmFuc2l0aW9uU2hvd0NvbXB1dGVkLCBzZWFyY2hCdWZmZXIsIHNlYXJjaEJ1ZmZlckV4cFxuXG4gICAgY29uc3QgaW5wdXRSZWYgPSByZWYobnVsbClcbiAgICBjb25zdCB0YXJnZXRSZWYgPSByZWYobnVsbClcbiAgICBjb25zdCBtZW51UmVmID0gcmVmKG51bGwpXG4gICAgY29uc3QgZGlhbG9nUmVmID0gcmVmKG51bGwpXG4gICAgY29uc3QgbWVudUNvbnRlbnRSZWYgPSByZWYobnVsbClcblxuICAgIGNvbnN0IG5hbWVQcm9wID0gdXNlRm9ybUlucHV0TmFtZUF0dHIocHJvcHMpXG5cbiAgICBjb25zdCBvbkNvbXBvc2l0aW9uID0gdXNlS2V5Q29tcG9zaXRpb24ob25JbnB1dClcblxuICAgIGNvbnN0IHZpcnR1YWxTY3JvbGxMZW5ndGggPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBBcnJheS5pc0FycmF5KHByb3BzLm9wdGlvbnMpXG4gICAgICAgID8gcHJvcHMub3B0aW9ucy5sZW5ndGhcbiAgICAgICAgOiAwXG4gICAgKSlcblxuICAgIGNvbnN0IHZpcnR1YWxTY3JvbGxJdGVtU2l6ZUNvbXB1dGVkID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMudmlydHVhbFNjcm9sbEl0ZW1TaXplID09PSB2b2lkIDBcbiAgICAgICAgPyAocHJvcHMub3B0aW9uc0RlbnNlID09PSB0cnVlID8gMjQgOiA0OClcbiAgICAgICAgOiBwcm9wcy52aXJ0dWFsU2Nyb2xsSXRlbVNpemVcbiAgICApKVxuXG4gICAgY29uc3Qge1xuICAgICAgdmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UsXG4gICAgICB2aXJ0dWFsU2Nyb2xsU2xpY2VTaXplQ29tcHV0ZWQsXG4gICAgICBsb2NhbFJlc2V0VmlydHVhbFNjcm9sbCxcbiAgICAgIHBhZFZpcnR1YWxTY3JvbGwsXG4gICAgICBvblZpcnR1YWxTY3JvbGxFdnQsXG4gICAgICBzY3JvbGxUbyxcbiAgICAgIHNldFZpcnR1YWxTY3JvbGxTaXplXG4gICAgfSA9IHVzZVZpcnR1YWxTY3JvbGwoe1xuICAgICAgdmlydHVhbFNjcm9sbExlbmd0aCwgZ2V0VmlydHVhbFNjcm9sbFRhcmdldCwgZ2V0VmlydHVhbFNjcm9sbEVsLFxuICAgICAgdmlydHVhbFNjcm9sbEl0ZW1TaXplQ29tcHV0ZWRcbiAgICB9KVxuXG4gICAgY29uc3Qgc3RhdGUgPSB1c2VGaWVsZFN0YXRlKClcblxuICAgIGNvbnN0IGlubmVyVmFsdWUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdFxuICAgICAgICBtYXBOdWxsID0gcHJvcHMubWFwT3B0aW9ucyA9PT0gdHJ1ZSAmJiBwcm9wcy5tdWx0aXBsZSAhPT0gdHJ1ZSxcbiAgICAgICAgdmFsID0gcHJvcHMubW9kZWxWYWx1ZSAhPT0gdm9pZCAwICYmIChwcm9wcy5tb2RlbFZhbHVlICE9PSBudWxsIHx8IG1hcE51bGwgPT09IHRydWUpXG4gICAgICAgICAgPyAocHJvcHMubXVsdGlwbGUgPT09IHRydWUgJiYgQXJyYXkuaXNBcnJheShwcm9wcy5tb2RlbFZhbHVlKSA/IHByb3BzLm1vZGVsVmFsdWUgOiBbIHByb3BzLm1vZGVsVmFsdWUgXSlcbiAgICAgICAgICA6IFtdXG5cbiAgICAgIGlmIChwcm9wcy5tYXBPcHRpb25zID09PSB0cnVlICYmIEFycmF5LmlzQXJyYXkocHJvcHMub3B0aW9ucykgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgY2FjaGUgPSBwcm9wcy5tYXBPcHRpb25zID09PSB0cnVlICYmIGlubmVyVmFsdWVDYWNoZSAhPT0gdm9pZCAwXG4gICAgICAgICAgPyBpbm5lclZhbHVlQ2FjaGVcbiAgICAgICAgICA6IFtdXG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IHZhbC5tYXAodiA9PiBnZXRPcHRpb24odiwgY2FjaGUpKVxuXG4gICAgICAgIHJldHVybiBwcm9wcy5tb2RlbFZhbHVlID09PSBudWxsICYmIG1hcE51bGwgPT09IHRydWVcbiAgICAgICAgICA/IHZhbHVlcy5maWx0ZXIodiA9PiB2ICE9PSBudWxsKVxuICAgICAgICAgIDogdmFsdWVzXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB2YWxcbiAgICB9KVxuXG4gICAgY29uc3QgaW5uZXJGaWVsZFByb3BzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgYWNjID0ge31cbiAgICAgIGZpZWxkUHJvcHNMaXN0LmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgY29uc3QgdmFsID0gcHJvcHNbIGtleSBdXG4gICAgICAgIGlmICh2YWwgIT09IHZvaWQgMCkge1xuICAgICAgICAgIGFjY1sga2V5IF0gPSB2YWxcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHJldHVybiBhY2NcbiAgICB9KVxuXG4gICAgY29uc3QgaXNPcHRpb25zRGFyayA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLm9wdGlvbnNEYXJrID09PSBudWxsXG4gICAgICAgID8gc3RhdGUuaXNEYXJrLnZhbHVlXG4gICAgICAgIDogcHJvcHMub3B0aW9uc0RhcmtcbiAgICApKVxuXG4gICAgY29uc3QgaGFzVmFsdWUgPSBjb21wdXRlZCgoKSA9PiBmaWVsZFZhbHVlSXNGaWxsZWQoaW5uZXJWYWx1ZS52YWx1ZSkpXG5cbiAgICBjb25zdCBjb21wdXRlZElucHV0Q2xhc3MgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBsZXQgY2xzID0gJ3EtZmllbGRfX2lucHV0IHEtcGxhY2Vob2xkZXIgY29sJ1xuXG4gICAgICBpZiAocHJvcHMuaGlkZVNlbGVjdGVkID09PSB0cnVlIHx8IGlubmVyVmFsdWUudmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBbIGNscywgcHJvcHMuaW5wdXRDbGFzcyBdXG4gICAgICB9XG5cbiAgICAgIGNscyArPSAnIHEtZmllbGRfX2lucHV0LS1wYWRkaW5nJ1xuXG4gICAgICByZXR1cm4gcHJvcHMuaW5wdXRDbGFzcyA9PT0gdm9pZCAwXG4gICAgICAgID8gY2xzXG4gICAgICAgIDogWyBjbHMsIHByb3BzLmlucHV0Q2xhc3MgXVxuICAgIH0pXG5cbiAgICBjb25zdCBtZW51Q29udGVudENsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIChwcm9wcy52aXJ0dWFsU2Nyb2xsSG9yaXpvbnRhbCA9PT0gdHJ1ZSA/ICdxLXZpcnR1YWwtc2Nyb2xsLS1ob3Jpem9udGFsJyA6ICcnKVxuICAgICAgKyAocHJvcHMucG9wdXBDb250ZW50Q2xhc3MgPyAnICcgKyBwcm9wcy5wb3B1cENvbnRlbnRDbGFzcyA6ICcnKVxuICAgIClcblxuICAgIGNvbnN0IG5vT3B0aW9ucyA9IGNvbXB1dGVkKCgpID0+IHZpcnR1YWxTY3JvbGxMZW5ndGgudmFsdWUgPT09IDApXG5cbiAgICBjb25zdCBzZWxlY3RlZFN0cmluZyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBpbm5lclZhbHVlLnZhbHVlXG4gICAgICAgIC5tYXAob3B0ID0+IGdldE9wdGlvbkxhYmVsLnZhbHVlKG9wdCkpXG4gICAgICAgIC5qb2luKCcsICcpXG4gICAgKVxuXG4gICAgY29uc3QgYXJpYUN1cnJlbnRWYWx1ZSA9IGNvbXB1dGVkKCgpID0+IChwcm9wcy5kaXNwbGF5VmFsdWUgIT09IHZvaWQgMFxuICAgICAgPyBwcm9wcy5kaXNwbGF5VmFsdWVcbiAgICAgIDogc2VsZWN0ZWRTdHJpbmcudmFsdWVcbiAgICApKVxuXG4gICAgY29uc3QgbmVlZHNIdG1sRm4gPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5vcHRpb25zSHRtbCA9PT0gdHJ1ZVxuICAgICAgICA/ICgpID0+IHRydWVcbiAgICAgICAgOiBvcHQgPT4gb3B0Py5odG1sID09PSB0cnVlXG4gICAgKSlcblxuICAgIGNvbnN0IHZhbHVlQXNIdG1sID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuZGlzcGxheVZhbHVlSHRtbCA9PT0gdHJ1ZSB8fCAoXG4gICAgICAgIHByb3BzLmRpc3BsYXlWYWx1ZSA9PT0gdm9pZCAwICYmIChcbiAgICAgICAgICBwcm9wcy5vcHRpb25zSHRtbCA9PT0gdHJ1ZVxuICAgICAgICAgIHx8IGlubmVyVmFsdWUudmFsdWUuc29tZShuZWVkc0h0bWxGbi52YWx1ZSlcbiAgICAgICAgKVxuICAgICAgKVxuICAgICkpXG5cbiAgICBjb25zdCB0YWJpbmRleCA9IGNvbXB1dGVkKCgpID0+IChzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSB0cnVlID8gcHJvcHMudGFiaW5kZXggOiAtMSkpXG5cbiAgICBjb25zdCBjb21ib2JveEF0dHJzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgYXR0cnMgPSB7XG4gICAgICAgIHRhYmluZGV4OiBwcm9wcy50YWJpbmRleCxcbiAgICAgICAgcm9sZTogJ2NvbWJvYm94JyxcbiAgICAgICAgJ2FyaWEtbGFiZWwnOiBwcm9wcy5sYWJlbCxcbiAgICAgICAgJ2FyaWEtcmVhZG9ubHknOiBwcm9wcy5yZWFkb25seSA9PT0gdHJ1ZSA/ICd0cnVlJyA6ICdmYWxzZScsXG4gICAgICAgICdhcmlhLWF1dG9jb21wbGV0ZSc6IHByb3BzLnVzZUlucHV0ID09PSB0cnVlID8gJ2xpc3QnIDogJ25vbmUnLFxuICAgICAgICAnYXJpYS1leHBhbmRlZCc6IG1lbnUudmFsdWUgPT09IHRydWUgPyAndHJ1ZScgOiAnZmFsc2UnLFxuICAgICAgICAnYXJpYS1jb250cm9scyc6IGAkeyBzdGF0ZS50YXJnZXRVaWQudmFsdWUgfV9sYmBcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbkluZGV4LnZhbHVlID49IDApIHtcbiAgICAgICAgYXR0cnNbICdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnIF0gPSBgJHsgc3RhdGUudGFyZ2V0VWlkLnZhbHVlIH1fJHsgb3B0aW9uSW5kZXgudmFsdWUgfWBcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGF0dHJzXG4gICAgfSlcblxuICAgIGNvbnN0IGxpc3Rib3hBdHRycyA9IGNvbXB1dGVkKCgpID0+ICh7XG4gICAgICBpZDogYCR7IHN0YXRlLnRhcmdldFVpZC52YWx1ZSB9X2xiYCxcbiAgICAgIHJvbGU6ICdsaXN0Ym94JyxcbiAgICAgICdhcmlhLW11bHRpc2VsZWN0YWJsZSc6IHByb3BzLm11bHRpcGxlID09PSB0cnVlID8gJ3RydWUnIDogJ2ZhbHNlJ1xuICAgIH0pKVxuXG4gICAgY29uc3Qgc2VsZWN0ZWRTY29wZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIHJldHVybiBpbm5lclZhbHVlLnZhbHVlLm1hcCgob3B0LCBpKSA9PiAoe1xuICAgICAgICBpbmRleDogaSxcbiAgICAgICAgb3B0LFxuICAgICAgICBodG1sOiBuZWVkc0h0bWxGbi52YWx1ZShvcHQpLFxuICAgICAgICBzZWxlY3RlZDogdHJ1ZSxcbiAgICAgICAgcmVtb3ZlQXRJbmRleDogcmVtb3ZlQXRJbmRleEFuZEZvY3VzLFxuICAgICAgICB0b2dnbGVPcHRpb24sXG4gICAgICAgIHRhYmluZGV4OiB0YWJpbmRleC52YWx1ZVxuICAgICAgfSkpXG4gICAgfSlcblxuICAgIGNvbnN0IG9wdGlvblNjb3BlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgaWYgKHZpcnR1YWxTY3JvbGxMZW5ndGgudmFsdWUgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIFtdXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHsgZnJvbSwgdG8gfSA9IHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlXG5cbiAgICAgIHJldHVybiBwcm9wcy5vcHRpb25zLnNsaWNlKGZyb20sIHRvKS5tYXAoKG9wdCwgaSkgPT4ge1xuICAgICAgICBjb25zdCBkaXNhYmxlID0gaXNPcHRpb25EaXNhYmxlZC52YWx1ZShvcHQpID09PSB0cnVlXG4gICAgICAgIGNvbnN0IGFjdGl2ZSA9IGlzT3B0aW9uU2VsZWN0ZWQob3B0KSA9PT0gdHJ1ZVxuICAgICAgICBjb25zdCBpbmRleCA9IGZyb20gKyBpXG5cbiAgICAgICAgY29uc3QgaXRlbVByb3BzID0ge1xuICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcbiAgICAgICAgICBhY3RpdmUsXG4gICAgICAgICAgYWN0aXZlQ2xhc3M6IGNvbXB1dGVkT3B0aW9uc1NlbGVjdGVkQ2xhc3MudmFsdWUsXG4gICAgICAgICAgbWFudWFsRm9jdXM6IHRydWUsXG4gICAgICAgICAgZm9jdXNlZDogZmFsc2UsXG4gICAgICAgICAgZGlzYWJsZSxcbiAgICAgICAgICB0YWJpbmRleDogLTEsXG4gICAgICAgICAgZGVuc2U6IHByb3BzLm9wdGlvbnNEZW5zZSxcbiAgICAgICAgICBkYXJrOiBpc09wdGlvbnNEYXJrLnZhbHVlLFxuICAgICAgICAgIHJvbGU6ICdvcHRpb24nLFxuICAgICAgICAgICdhcmlhLXNlbGVjdGVkJzogYWN0aXZlID09PSB0cnVlID8gJ3RydWUnIDogJ2ZhbHNlJyxcbiAgICAgICAgICBpZDogYCR7IHN0YXRlLnRhcmdldFVpZC52YWx1ZSB9XyR7IGluZGV4IH1gLFxuICAgICAgICAgIG9uQ2xpY2s6ICgpID0+IHsgdG9nZ2xlT3B0aW9uKG9wdCkgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRpc2FibGUgIT09IHRydWUpIHtcbiAgICAgICAgICBvcHRpb25JbmRleC52YWx1ZSA9PT0gaW5kZXggJiYgKGl0ZW1Qcm9wcy5mb2N1c2VkID0gdHJ1ZSlcblxuICAgICAgICAgIGlmICgkcS5wbGF0Zm9ybS5pcy5kZXNrdG9wID09PSB0cnVlKSB7XG4gICAgICAgICAgICBpdGVtUHJvcHMub25Nb3VzZW1vdmUgPSAoKSA9PiB7IG1lbnUudmFsdWUgPT09IHRydWUgJiYgc2V0T3B0aW9uSW5kZXgoaW5kZXgpIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGluZGV4LFxuICAgICAgICAgIG9wdCxcbiAgICAgICAgICBodG1sOiBuZWVkc0h0bWxGbi52YWx1ZShvcHQpLFxuICAgICAgICAgIGxhYmVsOiBnZXRPcHRpb25MYWJlbC52YWx1ZShvcHQpLFxuICAgICAgICAgIHNlbGVjdGVkOiBpdGVtUHJvcHMuYWN0aXZlLFxuICAgICAgICAgIGZvY3VzZWQ6IGl0ZW1Qcm9wcy5mb2N1c2VkLFxuICAgICAgICAgIHRvZ2dsZU9wdGlvbixcbiAgICAgICAgICBzZXRPcHRpb25JbmRleCxcbiAgICAgICAgICBpdGVtUHJvcHNcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuXG4gICAgY29uc3QgZHJvcGRvd25BcnJvd0ljb24gPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5kcm9wZG93bkljb24gIT09IHZvaWQgMFxuICAgICAgICA/IHByb3BzLmRyb3Bkb3duSWNvblxuICAgICAgICA6ICRxLmljb25TZXQuYXJyb3cuZHJvcGRvd25cbiAgICApKVxuXG4gICAgY29uc3Qgc3F1YXJlZE1lbnUgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMub3B0aW9uc0NvdmVyID09PSBmYWxzZVxuICAgICAgJiYgcHJvcHMub3V0bGluZWQgIT09IHRydWVcbiAgICAgICYmIHByb3BzLnN0YW5kb3V0ICE9PSB0cnVlXG4gICAgICAmJiBwcm9wcy5ib3JkZXJsZXNzICE9PSB0cnVlXG4gICAgICAmJiBwcm9wcy5yb3VuZGVkICE9PSB0cnVlXG4gICAgKVxuXG4gICAgY29uc3QgY29tcHV0ZWRPcHRpb25zU2VsZWN0ZWRDbGFzcyA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLm9wdGlvbnNTZWxlY3RlZENsYXNzICE9PSB2b2lkIDBcbiAgICAgICAgPyBwcm9wcy5vcHRpb25zU2VsZWN0ZWRDbGFzc1xuICAgICAgICA6IChwcm9wcy5jb2xvciAhPT0gdm9pZCAwID8gYHRleHQtJHsgcHJvcHMuY29sb3IgfWAgOiAnJylcbiAgICApKVxuXG4gICAgLy8gcmV0dXJucyBtZXRob2QgdG8gZ2V0IHZhbHVlIG9mIGFuIG9wdGlvbjtcbiAgICAvLyB0YWtlcyBpbnRvIGFjY291bnQgJ29wdGlvbi12YWx1ZScgcHJvcFxuICAgIGNvbnN0IGdldE9wdGlvblZhbHVlID0gY29tcHV0ZWQoKCkgPT4gZ2V0UHJvcFZhbHVlRm4ocHJvcHMub3B0aW9uVmFsdWUsICd2YWx1ZScpKVxuXG4gICAgLy8gcmV0dXJucyBtZXRob2QgdG8gZ2V0IGxhYmVsIG9mIGFuIG9wdGlvbjtcbiAgICAvLyB0YWtlcyBpbnRvIGFjY291bnQgJ29wdGlvbi1sYWJlbCcgcHJvcFxuICAgIGNvbnN0IGdldE9wdGlvbkxhYmVsID0gY29tcHV0ZWQoKCkgPT4gZ2V0UHJvcFZhbHVlRm4ocHJvcHMub3B0aW9uTGFiZWwsICdsYWJlbCcpKVxuXG4gICAgLy8gcmV0dXJucyBtZXRob2QgdG8gdGVsbCBpZiBhbiBvcHRpb24gaXMgZGlzYWJsZWQ7XG4gICAgLy8gdGFrZXMgaW50byBhY2NvdW50ICdvcHRpb24tZGlzYWJsZScgcHJvcFxuICAgIGNvbnN0IGlzT3B0aW9uRGlzYWJsZWQgPSBjb21wdXRlZCgoKSA9PiBnZXRQcm9wVmFsdWVGbihwcm9wcy5vcHRpb25EaXNhYmxlLCAnZGlzYWJsZScpKVxuXG4gICAgY29uc3QgaW5uZXJPcHRpb25zVmFsdWUgPSBjb21wdXRlZCgoKSA9PiBpbm5lclZhbHVlLnZhbHVlLm1hcChnZXRPcHRpb25WYWx1ZS52YWx1ZSkpXG5cbiAgICBjb25zdCBpbnB1dENvbnRyb2xFdmVudHMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBldnQgPSB7XG4gICAgICAgIG9uSW5wdXQsXG4gICAgICAgIC8vIFNhZmFyaSA8IDEwLjIgJiBVSVdlYlZpZXcgZG9lc24ndCBmaXJlIGNvbXBvc2l0aW9uZW5kIHdoZW5cbiAgICAgICAgLy8gc3dpdGNoaW5nIGZvY3VzIGJlZm9yZSBjb25maXJtaW5nIGNvbXBvc2l0aW9uIGNob2ljZVxuICAgICAgICAvLyB0aGlzIGFsc28gZml4ZXMgdGhlIGlzc3VlIHdoZXJlIHNvbWUgYnJvd3NlcnMgZS5nLiBpT1MgQ2hyb21lXG4gICAgICAgIC8vIGZpcmVzIFwiY2hhbmdlXCIgaW5zdGVhZCBvZiBcImlucHV0XCIgb24gYXV0b2NvbXBsZXRlLlxuICAgICAgICBvbkNoYW5nZTogb25Db21wb3NpdGlvbixcbiAgICAgICAgb25LZXlkb3duOiBvblRhcmdldEtleWRvd24sXG4gICAgICAgIG9uS2V5dXA6IG9uVGFyZ2V0QXV0b2NvbXBsZXRlLFxuICAgICAgICBvbktleXByZXNzOiBvblRhcmdldEtleXByZXNzLFxuICAgICAgICBvbkZvY3VzOiBzZWxlY3RJbnB1dFRleHQsXG4gICAgICAgIG9uQ2xpY2sgKGUpIHsgaGFzRGlhbG9nID09PSB0cnVlICYmIHN0b3AoZSkgfVxuICAgICAgfVxuXG4gICAgICBldnQub25Db21wb3NpdGlvbnN0YXJ0ID0gZXZ0Lm9uQ29tcG9zaXRpb251cGRhdGUgPSBldnQub25Db21wb3NpdGlvbmVuZCA9IG9uQ29tcG9zaXRpb25cblxuICAgICAgcmV0dXJuIGV2dFxuICAgIH0pXG5cbiAgICB3YXRjaChpbm5lclZhbHVlLCB2YWwgPT4ge1xuICAgICAgaW5uZXJWYWx1ZUNhY2hlID0gdmFsXG5cbiAgICAgIGlmIChcbiAgICAgICAgcHJvcHMudXNlSW5wdXQgPT09IHRydWVcbiAgICAgICAgJiYgcHJvcHMuZmlsbElucHV0ID09PSB0cnVlXG4gICAgICAgICYmIHByb3BzLm11bHRpcGxlICE9PSB0cnVlXG4gICAgICAgIC8vIFByZXZlbnQgcmUtZW50ZXJpbmcgaW4gZmlsdGVyIHdoaWxlIGZpbHRlcmluZ1xuICAgICAgICAvLyBBbHNvIHByZXZlbnQgY2xlYXJpbmcgaW5wdXRWYWx1ZSB3aGlsZSBmaWx0ZXJpbmdcbiAgICAgICAgJiYgc3RhdGUuaW5uZXJMb2FkaW5nLnZhbHVlICE9PSB0cnVlXG4gICAgICAgICYmICgoZGlhbG9nLnZhbHVlICE9PSB0cnVlICYmIG1lbnUudmFsdWUgIT09IHRydWUpIHx8IGhhc1ZhbHVlLnZhbHVlICE9PSB0cnVlKVxuICAgICAgKSB7XG4gICAgICAgIHVzZXJJbnB1dFZhbHVlICE9PSB0cnVlICYmIHJlc2V0SW5wdXRWYWx1ZSgpXG4gICAgICAgIGlmIChkaWFsb2cudmFsdWUgPT09IHRydWUgfHwgbWVudS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGZpbHRlcignJylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIHsgaW1tZWRpYXRlOiB0cnVlIH0pXG5cbiAgICB3YXRjaCgoKSA9PiBwcm9wcy5maWxsSW5wdXQsIHJlc2V0SW5wdXRWYWx1ZSlcblxuICAgIHdhdGNoKG1lbnUsIHVwZGF0ZU1lbnUpXG5cbiAgICB3YXRjaCh2aXJ0dWFsU2Nyb2xsTGVuZ3RoLCByZXJlbmRlck1lbnUpXG5cbiAgICBmdW5jdGlvbiBnZXRFbWl0dGluZ09wdGlvblZhbHVlIChvcHQpIHtcbiAgICAgIHJldHVybiBwcm9wcy5lbWl0VmFsdWUgPT09IHRydWVcbiAgICAgICAgPyBnZXRPcHRpb25WYWx1ZS52YWx1ZShvcHQpXG4gICAgICAgIDogb3B0XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlQXRJbmRleCAoaW5kZXgpIHtcbiAgICAgIGlmIChpbmRleCAhPT0gLTEgJiYgaW5kZXggPCBpbm5lclZhbHVlLnZhbHVlLmxlbmd0aCkge1xuICAgICAgICBpZiAocHJvcHMubXVsdGlwbGUgPT09IHRydWUpIHtcbiAgICAgICAgICBjb25zdCBtb2RlbCA9IHByb3BzLm1vZGVsVmFsdWUuc2xpY2UoKVxuICAgICAgICAgIGVtaXQoJ3JlbW92ZScsIHsgaW5kZXgsIHZhbHVlOiBtb2RlbC5zcGxpY2UoaW5kZXgsIDEpWyAwIF0gfSlcbiAgICAgICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIG1vZGVsKVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgbnVsbClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZUF0SW5kZXhBbmRGb2N1cyAoaW5kZXgpIHtcbiAgICAgIHJlbW92ZUF0SW5kZXgoaW5kZXgpXG4gICAgICBzdGF0ZS5mb2N1cygpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkIChvcHQsIHVuaXF1ZSkge1xuICAgICAgY29uc3QgdmFsID0gZ2V0RW1pdHRpbmdPcHRpb25WYWx1ZShvcHQpXG5cbiAgICAgIGlmIChwcm9wcy5tdWx0aXBsZSAhPT0gdHJ1ZSkge1xuICAgICAgICBwcm9wcy5maWxsSW5wdXQgPT09IHRydWUgJiYgdXBkYXRlSW5wdXRWYWx1ZShcbiAgICAgICAgICBnZXRPcHRpb25MYWJlbC52YWx1ZShvcHQpLFxuICAgICAgICAgIHRydWUsXG4gICAgICAgICAgdHJ1ZVxuICAgICAgICApXG5cbiAgICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCB2YWwpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAoaW5uZXJWYWx1ZS52YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgZW1pdCgnYWRkJywgeyBpbmRleDogMCwgdmFsdWU6IHZhbCB9KVxuICAgICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIHByb3BzLm11bHRpcGxlID09PSB0cnVlID8gWyB2YWwgXSA6IHZhbClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgdW5pcXVlID09PSB0cnVlXG4gICAgICAgICYmIGlzT3B0aW9uU2VsZWN0ZWQob3B0KSA9PT0gdHJ1ZVxuICAgICAgKSByZXR1cm5cblxuICAgICAgaWYgKFxuICAgICAgICBwcm9wcy5tYXhWYWx1ZXMgIT09IHZvaWQgMFxuICAgICAgICAmJiBwcm9wcy5tb2RlbFZhbHVlLmxlbmd0aCA+PSBwcm9wcy5tYXhWYWx1ZXNcbiAgICAgICkgcmV0dXJuXG5cbiAgICAgIGNvbnN0IG1vZGVsID0gcHJvcHMubW9kZWxWYWx1ZS5zbGljZSgpXG5cbiAgICAgIGVtaXQoJ2FkZCcsIHsgaW5kZXg6IG1vZGVsLmxlbmd0aCwgdmFsdWU6IHZhbCB9KVxuICAgICAgbW9kZWwucHVzaCh2YWwpXG4gICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIG1vZGVsKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvZ2dsZU9wdGlvbiAob3B0LCBrZWVwT3Blbikge1xuICAgICAgaWYgKFxuICAgICAgICBzdGF0ZS5lZGl0YWJsZS52YWx1ZSAhPT0gdHJ1ZVxuICAgICAgICB8fCBvcHQgPT09IHZvaWQgMFxuICAgICAgICB8fCBpc09wdGlvbkRpc2FibGVkLnZhbHVlKG9wdCkgPT09IHRydWVcbiAgICAgICkgcmV0dXJuXG5cbiAgICAgIGNvbnN0IG9wdFZhbHVlID0gZ2V0T3B0aW9uVmFsdWUudmFsdWUob3B0KVxuXG4gICAgICBpZiAocHJvcHMubXVsdGlwbGUgIT09IHRydWUpIHtcbiAgICAgICAgaWYgKGtlZXBPcGVuICE9PSB0cnVlKSB7XG4gICAgICAgICAgdXBkYXRlSW5wdXRWYWx1ZShcbiAgICAgICAgICAgIHByb3BzLmZpbGxJbnB1dCA9PT0gdHJ1ZSA/IGdldE9wdGlvbkxhYmVsLnZhbHVlKG9wdCkgOiAnJyxcbiAgICAgICAgICAgIHRydWUsXG4gICAgICAgICAgICB0cnVlXG4gICAgICAgICAgKVxuXG4gICAgICAgICAgaGlkZVBvcHVwKClcbiAgICAgICAgfVxuXG4gICAgICAgIHRhcmdldFJlZi52YWx1ZT8uZm9jdXMoKVxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICBpbm5lclZhbHVlLnZhbHVlLmxlbmd0aCA9PT0gMFxuICAgICAgICAgIHx8IGlzRGVlcEVxdWFsKGdldE9wdGlvblZhbHVlLnZhbHVlKGlubmVyVmFsdWUudmFsdWVbIDAgXSksIG9wdFZhbHVlKSAhPT0gdHJ1ZVxuICAgICAgICApIHtcbiAgICAgICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIHByb3BzLmVtaXRWYWx1ZSA9PT0gdHJ1ZSA/IG9wdFZhbHVlIDogb3B0KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChoYXNEaWFsb2cgIT09IHRydWUgfHwgZGlhbG9nRmllbGRGb2N1c2VkLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIHN0YXRlLmZvY3VzKClcbiAgICAgIH1cblxuICAgICAgc2VsZWN0SW5wdXRUZXh0KClcblxuICAgICAgaWYgKGlubmVyVmFsdWUudmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGNvbnN0IHZhbCA9IHByb3BzLmVtaXRWYWx1ZSA9PT0gdHJ1ZSA/IG9wdFZhbHVlIDogb3B0XG4gICAgICAgIGVtaXQoJ2FkZCcsIHsgaW5kZXg6IDAsIHZhbHVlOiB2YWwgfSlcbiAgICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBwcm9wcy5tdWx0aXBsZSA9PT0gdHJ1ZSA/IFsgdmFsIF0gOiB2YWwpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBjb25zdFxuICAgICAgICBtb2RlbCA9IHByb3BzLm1vZGVsVmFsdWUuc2xpY2UoKSxcbiAgICAgICAgaW5kZXggPSBpbm5lck9wdGlvbnNWYWx1ZS52YWx1ZS5maW5kSW5kZXgodiA9PiBpc0RlZXBFcXVhbCh2LCBvcHRWYWx1ZSkpXG5cbiAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgZW1pdCgncmVtb3ZlJywgeyBpbmRleCwgdmFsdWU6IG1vZGVsLnNwbGljZShpbmRleCwgMSlbIDAgXSB9KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBwcm9wcy5tYXhWYWx1ZXMgIT09IHZvaWQgMFxuICAgICAgICAgICYmIG1vZGVsLmxlbmd0aCA+PSBwcm9wcy5tYXhWYWx1ZXNcbiAgICAgICAgKSByZXR1cm5cblxuICAgICAgICBjb25zdCB2YWwgPSBwcm9wcy5lbWl0VmFsdWUgPT09IHRydWUgPyBvcHRWYWx1ZSA6IG9wdFxuXG4gICAgICAgIGVtaXQoJ2FkZCcsIHsgaW5kZXg6IG1vZGVsLmxlbmd0aCwgdmFsdWU6IHZhbCB9KVxuICAgICAgICBtb2RlbC5wdXNoKHZhbClcbiAgICAgIH1cblxuICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBtb2RlbClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRPcHRpb25JbmRleCAoaW5kZXgpIHtcbiAgICAgIGlmICgkcS5wbGF0Zm9ybS5pcy5kZXNrdG9wICE9PSB0cnVlKSByZXR1cm5cblxuICAgICAgY29uc3QgdmFsID0gaW5kZXggIT09IC0xICYmIGluZGV4IDwgdmlydHVhbFNjcm9sbExlbmd0aC52YWx1ZVxuICAgICAgICA/IGluZGV4XG4gICAgICAgIDogLTFcblxuICAgICAgaWYgKG9wdGlvbkluZGV4LnZhbHVlICE9PSB2YWwpIHtcbiAgICAgICAgb3B0aW9uSW5kZXgudmFsdWUgPSB2YWxcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb3ZlT3B0aW9uU2VsZWN0aW9uIChvZmZzZXQgPSAxLCBza2lwSW5wdXRWYWx1ZSkge1xuICAgICAgaWYgKG1lbnUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gb3B0aW9uSW5kZXgudmFsdWVcbiAgICAgICAgZG8ge1xuICAgICAgICAgIGluZGV4ID0gbm9ybWFsaXplVG9JbnRlcnZhbChcbiAgICAgICAgICAgIGluZGV4ICsgb2Zmc2V0LFxuICAgICAgICAgICAgLTEsXG4gICAgICAgICAgICB2aXJ0dWFsU2Nyb2xsTGVuZ3RoLnZhbHVlIC0gMVxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAoaW5kZXggIT09IC0xICYmIGluZGV4ICE9PSBvcHRpb25JbmRleC52YWx1ZSAmJiBpc09wdGlvbkRpc2FibGVkLnZhbHVlKHByb3BzLm9wdGlvbnNbIGluZGV4IF0pID09PSB0cnVlKVxuXG4gICAgICAgIGlmIChvcHRpb25JbmRleC52YWx1ZSAhPT0gaW5kZXgpIHtcbiAgICAgICAgICBzZXRPcHRpb25JbmRleChpbmRleClcbiAgICAgICAgICBzY3JvbGxUbyhpbmRleClcblxuICAgICAgICAgIGlmIChza2lwSW5wdXRWYWx1ZSAhPT0gdHJ1ZSAmJiBwcm9wcy51c2VJbnB1dCA9PT0gdHJ1ZSAmJiBwcm9wcy5maWxsSW5wdXQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHNldElucHV0VmFsdWUoXG4gICAgICAgICAgICAgIGluZGV4ID49IDBcbiAgICAgICAgICAgICAgICA/IGdldE9wdGlvbkxhYmVsLnZhbHVlKHByb3BzLm9wdGlvbnNbIGluZGV4IF0pXG4gICAgICAgICAgICAgICAgOiBkZWZhdWx0SW5wdXRWYWx1ZSxcbiAgICAgICAgICAgICAgdHJ1ZVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldE9wdGlvbiAodmFsdWUsIHZhbHVlQ2FjaGUpIHtcbiAgICAgIGNvbnN0IGZuID0gb3B0ID0+IGlzRGVlcEVxdWFsKGdldE9wdGlvblZhbHVlLnZhbHVlKG9wdCksIHZhbHVlKVxuICAgICAgcmV0dXJuIHByb3BzLm9wdGlvbnMuZmluZChmbikgfHwgdmFsdWVDYWNoZS5maW5kKGZuKSB8fCB2YWx1ZVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzT3B0aW9uU2VsZWN0ZWQgKG9wdCkge1xuICAgICAgY29uc3QgdmFsID0gZ2V0T3B0aW9uVmFsdWUudmFsdWUob3B0KVxuICAgICAgcmV0dXJuIGlubmVyT3B0aW9uc1ZhbHVlLnZhbHVlLmZpbmQodiA9PiBpc0RlZXBFcXVhbCh2LCB2YWwpKSAhPT0gdm9pZCAwXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2VsZWN0SW5wdXRUZXh0IChlKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHByb3BzLnVzZUlucHV0ID09PSB0cnVlXG4gICAgICAgICYmIHRhcmdldFJlZi52YWx1ZSAhPT0gbnVsbFxuICAgICAgICAmJiAoZSA9PT0gdm9pZCAwIHx8ICh0YXJnZXRSZWYudmFsdWUgPT09IGUudGFyZ2V0ICYmIGUudGFyZ2V0LnZhbHVlID09PSBzZWxlY3RlZFN0cmluZy52YWx1ZSkpXG4gICAgICApIHtcbiAgICAgICAgdGFyZ2V0UmVmLnZhbHVlLnNlbGVjdCgpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25UYXJnZXRLZXl1cCAoZSkge1xuICAgICAgLy8gaWYgRVNDIGFuZCB3ZSBoYXZlIGFuIG9wZW5lZCBtZW51XG4gICAgICAvLyB0aGVuIHN0b3AgcHJvcGFnYXRpb24gKG1pZ2h0IGJlIGNhdWdodCBieSBhIFFEaWFsb2dcbiAgICAgIC8vIGFuZCBzbyBpdCB3aWxsIGFsc28gY2xvc2UgdGhlIFFEaWFsb2csIHdoaWNoIGlzIHdyb25nKVxuICAgICAgaWYgKGlzS2V5Q29kZShlLCAyNykgPT09IHRydWUgJiYgbWVudS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBzdG9wKGUpXG4gICAgICAgIC8vIG9uIEVTQyB3ZSBuZWVkIHRvIGNsb3NlIHRoZSBkaWFsb2cgYWxzb1xuICAgICAgICBoaWRlUG9wdXAoKVxuICAgICAgICByZXNldElucHV0VmFsdWUoKVxuICAgICAgfVxuXG4gICAgICBlbWl0KCdrZXl1cCcsIGUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25UYXJnZXRBdXRvY29tcGxldGUgKGUpIHtcbiAgICAgIGNvbnN0IHsgdmFsdWUgfSA9IGUudGFyZ2V0XG5cbiAgICAgIGlmIChlLmtleUNvZGUgIT09IHZvaWQgMCkge1xuICAgICAgICBvblRhcmdldEtleXVwKGUpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBlLnRhcmdldC52YWx1ZSA9ICcnXG5cbiAgICAgIGlmIChmaWx0ZXJUaW1lciAhPT0gbnVsbCkge1xuICAgICAgICBjbGVhclRpbWVvdXQoZmlsdGVyVGltZXIpXG4gICAgICAgIGZpbHRlclRpbWVyID0gbnVsbFxuICAgICAgfVxuICAgICAgaWYgKGlucHV0VmFsdWVUaW1lciAhPT0gbnVsbCkge1xuICAgICAgICBjbGVhclRpbWVvdXQoaW5wdXRWYWx1ZVRpbWVyKVxuICAgICAgICBpbnB1dFZhbHVlVGltZXIgPSBudWxsXG4gICAgICB9XG5cbiAgICAgIHJlc2V0SW5wdXRWYWx1ZSgpXG5cbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICBjb25zdCBuZWVkbGUgPSB2YWx1ZS50b0xvY2FsZUxvd2VyQ2FzZSgpXG4gICAgICAgIGNvbnN0IGZpbmRGbiA9IGV4dHJhY3RGbiA9PiB7XG4gICAgICAgICAgY29uc3Qgb3B0aW9uID0gcHJvcHMub3B0aW9ucy5maW5kKG9wdCA9PiBTdHJpbmcoZXh0cmFjdEZuLnZhbHVlKG9wdCkpLnRvTG9jYWxlTG93ZXJDYXNlKCkgPT09IG5lZWRsZSlcblxuICAgICAgICAgIGlmIChvcHRpb24gPT09IHZvaWQgMCkgcmV0dXJuIGZhbHNlXG5cbiAgICAgICAgICBpZiAoaW5uZXJWYWx1ZS52YWx1ZS5pbmRleE9mKG9wdGlvbikgPT09IC0xKSB7XG4gICAgICAgICAgICB0b2dnbGVPcHRpb24ob3B0aW9uKVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGhpZGVQb3B1cCgpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmaWxsRm4gPSBhZnRlckZpbHRlciA9PiB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgZmluZEZuKGdldE9wdGlvblZhbHVlKSAhPT0gdHJ1ZVxuICAgICAgICAgICAgJiYgYWZ0ZXJGaWx0ZXIgIT09IHRydWVcbiAgICAgICAgICAgICYmIGZpbmRGbihnZXRPcHRpb25MYWJlbCkgIT09IHRydWVcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGZpbHRlcih2YWx1ZSwgdHJ1ZSwgKCkgPT4gZmlsbEZuKHRydWUpKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZpbGxGbigpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgc3RhdGUuY2xlYXJWYWx1ZShlKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uVGFyZ2V0S2V5cHJlc3MgKGUpIHtcbiAgICAgIGVtaXQoJ2tleXByZXNzJywgZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblRhcmdldEtleWRvd24gKGUpIHtcbiAgICAgIGVtaXQoJ2tleWRvd24nLCBlKVxuXG4gICAgICBpZiAoc2hvdWxkSWdub3JlS2V5KGUpID09PSB0cnVlKSByZXR1cm5cblxuICAgICAgY29uc3QgbmV3VmFsdWVNb2RlVmFsaWQgPSBpbnB1dFZhbHVlLnZhbHVlLmxlbmd0aCAhPT0gMFxuICAgICAgICAmJiAocHJvcHMubmV3VmFsdWVNb2RlICE9PSB2b2lkIDAgfHwgcHJvcHMub25OZXdWYWx1ZSAhPT0gdm9pZCAwKVxuXG4gICAgICBjb25zdCB0YWJTaG91bGRTZWxlY3QgPSBlLnNoaWZ0S2V5ICE9PSB0cnVlXG4gICAgICAgICYmIHByb3BzLmRpc2FibGVUYWJTZWxlY3Rpb24gIT09IHRydWVcbiAgICAgICAgJiYgcHJvcHMubXVsdGlwbGUgIT09IHRydWVcbiAgICAgICAgJiYgKG9wdGlvbkluZGV4LnZhbHVlICE9PSAtMSB8fCBuZXdWYWx1ZU1vZGVWYWxpZCA9PT0gdHJ1ZSlcblxuICAgICAgLy8gZXNjYXBlXG4gICAgICBpZiAoZS5rZXlDb2RlID09PSAyNykge1xuICAgICAgICBwcmV2ZW50KGUpIC8vIHByZXZlbnQgY2xlYXJpbmcgdGhlIGlucHV0VmFsdWVcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIC8vIHRhYlxuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gOSAmJiB0YWJTaG91bGRTZWxlY3QgPT09IGZhbHNlKSB7XG4gICAgICAgIGNsb3NlTWVudSgpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIGUudGFyZ2V0ID09PSB2b2lkIDBcbiAgICAgICAgfHwgZS50YXJnZXQuaWQgIT09IHN0YXRlLnRhcmdldFVpZC52YWx1ZVxuICAgICAgICB8fCBzdGF0ZS5lZGl0YWJsZS52YWx1ZSAhPT0gdHJ1ZVxuICAgICAgKSByZXR1cm5cblxuICAgICAgLy8gZG93blxuICAgICAgaWYgKFxuICAgICAgICBlLmtleUNvZGUgPT09IDQwXG4gICAgICAgICYmIHN0YXRlLmlubmVyTG9hZGluZy52YWx1ZSAhPT0gdHJ1ZVxuICAgICAgICAmJiBtZW51LnZhbHVlID09PSBmYWxzZVxuICAgICAgKSB7XG4gICAgICAgIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgICAgIHNob3dQb3B1cCgpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICAvLyBiYWNrc3BhY2VcbiAgICAgIGlmIChcbiAgICAgICAgZS5rZXlDb2RlID09PSA4XG4gICAgICAgICYmIChcbiAgICAgICAgICBwcm9wcy51c2VDaGlwcyA9PT0gdHJ1ZVxuICAgICAgICAgIHx8IHByb3BzLmNsZWFyYWJsZSA9PT0gdHJ1ZVxuICAgICAgICApXG4gICAgICAgICYmIHByb3BzLmhpZGVTZWxlY3RlZCAhPT0gdHJ1ZVxuICAgICAgICAmJiBpbnB1dFZhbHVlLnZhbHVlLmxlbmd0aCA9PT0gMFxuICAgICAgKSB7XG4gICAgICAgIGlmIChwcm9wcy5tdWx0aXBsZSA9PT0gdHJ1ZSAmJiBBcnJheS5pc0FycmF5KHByb3BzLm1vZGVsVmFsdWUpID09PSB0cnVlKSB7XG4gICAgICAgICAgcmVtb3ZlQXRJbmRleChwcm9wcy5tb2RlbFZhbHVlLmxlbmd0aCAtIDEpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocHJvcHMubXVsdGlwbGUgIT09IHRydWUgJiYgcHJvcHMubW9kZWxWYWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgbnVsbClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICAvLyBob21lLCBlbmQgLSAzNiwgMzVcbiAgICAgIGlmIChcbiAgICAgICAgKGUua2V5Q29kZSA9PT0gMzUgfHwgZS5rZXlDb2RlID09PSAzNilcbiAgICAgICAgJiYgKHR5cGVvZiBpbnB1dFZhbHVlLnZhbHVlICE9PSAnc3RyaW5nJyB8fCBpbnB1dFZhbHVlLnZhbHVlLmxlbmd0aCA9PT0gMClcbiAgICAgICkge1xuICAgICAgICBzdG9wQW5kUHJldmVudChlKVxuICAgICAgICBvcHRpb25JbmRleC52YWx1ZSA9IC0xXG4gICAgICAgIG1vdmVPcHRpb25TZWxlY3Rpb24oZS5rZXlDb2RlID09PSAzNiA/IDEgOiAtMSwgcHJvcHMubXVsdGlwbGUpXG4gICAgICB9XG5cbiAgICAgIC8vIHBnIHVwLCBwZyBkb3duIC0gMzMsIDM0XG4gICAgICBpZiAoXG4gICAgICAgIChlLmtleUNvZGUgPT09IDMzIHx8IGUua2V5Q29kZSA9PT0gMzQpXG4gICAgICAgICYmIHZpcnR1YWxTY3JvbGxTbGljZVNpemVDb21wdXRlZC52YWx1ZSAhPT0gdm9pZCAwXG4gICAgICApIHtcbiAgICAgICAgc3RvcEFuZFByZXZlbnQoZSlcbiAgICAgICAgb3B0aW9uSW5kZXgudmFsdWUgPSBNYXRoLm1heChcbiAgICAgICAgICAtMSxcbiAgICAgICAgICBNYXRoLm1pbihcbiAgICAgICAgICAgIHZpcnR1YWxTY3JvbGxMZW5ndGgudmFsdWUsXG4gICAgICAgICAgICBvcHRpb25JbmRleC52YWx1ZSArIChlLmtleUNvZGUgPT09IDMzID8gLTEgOiAxKSAqIHZpcnR1YWxTY3JvbGxTbGljZVNpemVDb21wdXRlZC52YWx1ZS52aWV3XG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICAgIG1vdmVPcHRpb25TZWxlY3Rpb24oZS5rZXlDb2RlID09PSAzMyA/IDEgOiAtMSwgcHJvcHMubXVsdGlwbGUpXG4gICAgICB9XG5cbiAgICAgIC8vIHVwLCBkb3duXG4gICAgICBpZiAoZS5rZXlDb2RlID09PSAzOCB8fCBlLmtleUNvZGUgPT09IDQwKSB7XG4gICAgICAgIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgICAgIG1vdmVPcHRpb25TZWxlY3Rpb24oZS5rZXlDb2RlID09PSAzOCA/IC0xIDogMSwgcHJvcHMubXVsdGlwbGUpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG9wdGlvbnNMZW5ndGggPSB2aXJ0dWFsU2Nyb2xsTGVuZ3RoLnZhbHVlXG5cbiAgICAgIC8vIGNsZWFyIHNlYXJjaCBidWZmZXIgaWYgZXhwaXJlZFxuICAgICAgaWYgKHNlYXJjaEJ1ZmZlciA9PT0gdm9pZCAwIHx8IHNlYXJjaEJ1ZmZlckV4cCA8IERhdGUubm93KCkpIHtcbiAgICAgICAgc2VhcmNoQnVmZmVyID0gJydcbiAgICAgIH1cblxuICAgICAgLy8ga2V5Ym9hcmQgc2VhcmNoIHdoZW4gbm90IGhhdmluZyB1c2UtaW5wdXRcbiAgICAgIGlmIChcbiAgICAgICAgb3B0aW9uc0xlbmd0aCA+IDBcbiAgICAgICAgJiYgcHJvcHMudXNlSW5wdXQgIT09IHRydWVcbiAgICAgICAgJiYgZS5rZXkgIT09IHZvaWQgMFxuICAgICAgICAmJiBlLmtleS5sZW5ndGggPT09IDEgLy8gcHJpbnRhYmxlIGNoYXJcbiAgICAgICAgJiYgZS5hbHRLZXkgPT09IGZhbHNlIC8vIG5vdCBrYmQgc2hvcnRjdXRcbiAgICAgICAgJiYgZS5jdHJsS2V5ID09PSBmYWxzZSAvLyBub3Qga2JkIHNob3J0Y3V0XG4gICAgICAgICYmIGUubWV0YUtleSA9PT0gZmFsc2UgLy8gbm90IGtiZCBzaG9ydGN1dCwgZXNwZWNpYWxseSBvbiBtYWNPUyB3aXRoIENvbW1hbmQga2V5XG4gICAgICAgICYmIChlLmtleUNvZGUgIT09IDMyIHx8IHNlYXJjaEJ1ZmZlci5sZW5ndGggIT09IDApIC8vIHNwYWNlIGluIG1pZGRsZSBvZiBzZWFyY2hcbiAgICAgICkge1xuICAgICAgICBtZW51LnZhbHVlICE9PSB0cnVlICYmIHNob3dQb3B1cChlKVxuXG4gICAgICAgIGNvbnN0XG4gICAgICAgICAgY2hhciA9IGUua2V5LnRvTG9jYWxlTG93ZXJDYXNlKCksXG4gICAgICAgICAga2V5UmVwZWF0ID0gc2VhcmNoQnVmZmVyLmxlbmd0aCA9PT0gMSAmJiBzZWFyY2hCdWZmZXJbIDAgXSA9PT0gY2hhclxuXG4gICAgICAgIHNlYXJjaEJ1ZmZlckV4cCA9IERhdGUubm93KCkgKyAxNTAwXG4gICAgICAgIGlmIChrZXlSZXBlYXQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgc3RvcEFuZFByZXZlbnQoZSlcbiAgICAgICAgICBzZWFyY2hCdWZmZXIgKz0gY2hhclxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2VhcmNoUmUgPSBuZXcgUmVnRXhwKCdeJyArIHNlYXJjaEJ1ZmZlci5zcGxpdCgnJykubWFwKGwgPT4gKHJlRXNjYXBlTGlzdC5pbmRleE9mKGwpICE9PSAtMSA/ICdcXFxcJyArIGwgOiBsKSkuam9pbignLionKSwgJ2knKVxuXG4gICAgICAgIGxldCBpbmRleCA9IG9wdGlvbkluZGV4LnZhbHVlXG5cbiAgICAgICAgaWYgKGtleVJlcGVhdCA9PT0gdHJ1ZSB8fCBpbmRleCA8IDAgfHwgc2VhcmNoUmUudGVzdChnZXRPcHRpb25MYWJlbC52YWx1ZShwcm9wcy5vcHRpb25zWyBpbmRleCBdKSkgIT09IHRydWUpIHtcbiAgICAgICAgICBkbyB7XG4gICAgICAgICAgICBpbmRleCA9IG5vcm1hbGl6ZVRvSW50ZXJ2YWwoaW5kZXggKyAxLCAtMSwgb3B0aW9uc0xlbmd0aCAtIDEpXG4gICAgICAgICAgfVxuICAgICAgICAgIHdoaWxlIChpbmRleCAhPT0gb3B0aW9uSW5kZXgudmFsdWUgJiYgKFxuICAgICAgICAgICAgaXNPcHRpb25EaXNhYmxlZC52YWx1ZShwcm9wcy5vcHRpb25zWyBpbmRleCBdKSA9PT0gdHJ1ZVxuICAgICAgICAgICAgfHwgc2VhcmNoUmUudGVzdChnZXRPcHRpb25MYWJlbC52YWx1ZShwcm9wcy5vcHRpb25zWyBpbmRleCBdKSkgIT09IHRydWVcbiAgICAgICAgICApKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbkluZGV4LnZhbHVlICE9PSBpbmRleCkge1xuICAgICAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICAgIHNldE9wdGlvbkluZGV4KGluZGV4KVxuICAgICAgICAgICAgc2Nyb2xsVG8oaW5kZXgpXG5cbiAgICAgICAgICAgIGlmIChpbmRleCA+PSAwICYmIHByb3BzLnVzZUlucHV0ID09PSB0cnVlICYmIHByb3BzLmZpbGxJbnB1dCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICBzZXRJbnB1dFZhbHVlKGdldE9wdGlvbkxhYmVsLnZhbHVlKHByb3BzLm9wdGlvbnNbIGluZGV4IF0pLCB0cnVlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgLy8gZW50ZXIsIHNwYWNlICh3aGVuIG5vdCB1c2luZyB1c2UtaW5wdXQgYW5kIG5vdCBpbiBzZWFyY2gpLCBvciB0YWIgKHdoZW4gbm90IHVzaW5nIG11bHRpcGxlIGFuZCBvcHRpb24gc2VsZWN0ZWQpXG4gICAgICAvLyBzYW1lIHRhcmdldCBpcyBjaGVja2VkIGFib3ZlXG4gICAgICBpZiAoXG4gICAgICAgIGUua2V5Q29kZSAhPT0gMTNcbiAgICAgICAgJiYgKGUua2V5Q29kZSAhPT0gMzIgfHwgcHJvcHMudXNlSW5wdXQgPT09IHRydWUgfHwgc2VhcmNoQnVmZmVyICE9PSAnJylcbiAgICAgICAgJiYgKGUua2V5Q29kZSAhPT0gOSB8fCB0YWJTaG91bGRTZWxlY3QgPT09IGZhbHNlKVxuICAgICAgKSByZXR1cm5cblxuICAgICAgZS5rZXlDb2RlICE9PSA5ICYmIHN0b3BBbmRQcmV2ZW50KGUpXG5cbiAgICAgIGlmIChvcHRpb25JbmRleC52YWx1ZSAhPT0gLTEgJiYgb3B0aW9uSW5kZXgudmFsdWUgPCBvcHRpb25zTGVuZ3RoKSB7XG4gICAgICAgIHRvZ2dsZU9wdGlvbihwcm9wcy5vcHRpb25zWyBvcHRpb25JbmRleC52YWx1ZSBdKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKG5ld1ZhbHVlTW9kZVZhbGlkID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IGRvbmUgPSAodmFsLCBtb2RlKSA9PiB7XG4gICAgICAgICAgaWYgKG1vZGUpIHtcbiAgICAgICAgICAgIGlmICh2YWxpZGF0ZU5ld1ZhbHVlTW9kZShtb2RlKSAhPT0gdHJ1ZSkgcmV0dXJuXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbW9kZSA9IHByb3BzLm5ld1ZhbHVlTW9kZVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHVwZGF0ZUlucHV0VmFsdWUoJycsIHByb3BzLm11bHRpcGxlICE9PSB0cnVlLCB0cnVlKVxuXG4gICAgICAgICAgaWYgKHZhbCA9PT0gdm9pZCAwIHx8IHZhbCA9PT0gbnVsbCkgcmV0dXJuXG5cbiAgICAgICAgICBjb25zdCBmbiA9IG1vZGUgPT09ICd0b2dnbGUnID8gdG9nZ2xlT3B0aW9uIDogYWRkXG4gICAgICAgICAgZm4odmFsLCBtb2RlID09PSAnYWRkLXVuaXF1ZScpXG5cbiAgICAgICAgICBpZiAocHJvcHMubXVsdGlwbGUgIT09IHRydWUpIHtcbiAgICAgICAgICAgIHRhcmdldFJlZi52YWx1ZT8uZm9jdXMoKVxuICAgICAgICAgICAgaGlkZVBvcHVwKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvcHMub25OZXdWYWx1ZSAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgZW1pdCgnbmV3VmFsdWUnLCBpbnB1dFZhbHVlLnZhbHVlLCBkb25lKVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGRvbmUoaW5wdXRWYWx1ZS52YWx1ZSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9wcy5tdWx0aXBsZSAhPT0gdHJ1ZSkgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChtZW51LnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGNsb3NlTWVudSgpXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChzdGF0ZS5pbm5lckxvYWRpbmcudmFsdWUgIT09IHRydWUpIHtcbiAgICAgICAgc2hvd1BvcHVwKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRWaXJ0dWFsU2Nyb2xsRWwgKCkge1xuICAgICAgcmV0dXJuIGhhc0RpYWxvZyA9PT0gdHJ1ZVxuICAgICAgICA/IG1lbnVDb250ZW50UmVmLnZhbHVlXG4gICAgICAgIDogKFxuICAgICAgICAgICAgbWVudVJlZi52YWx1ZSAhPT0gbnVsbCAmJiBtZW51UmVmLnZhbHVlLmNvbnRlbnRFbCAhPT0gbnVsbFxuICAgICAgICAgICAgICA/IG1lbnVSZWYudmFsdWUuY29udGVudEVsXG4gICAgICAgICAgICAgIDogdm9pZCAwXG4gICAgICAgICAgKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFZpcnR1YWxTY3JvbGxUYXJnZXQgKCkge1xuICAgICAgcmV0dXJuIGdldFZpcnR1YWxTY3JvbGxFbCgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U2VsZWN0aW9uICgpIHtcbiAgICAgIGlmIChwcm9wcy5oaWRlU2VsZWN0ZWQgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIFtdXG4gICAgICB9XG5cbiAgICAgIGlmIChzbG90c1sgJ3NlbGVjdGVkLWl0ZW0nIF0gIT09IHZvaWQgMCkge1xuICAgICAgICByZXR1cm4gc2VsZWN0ZWRTY29wZS52YWx1ZS5tYXAoc2NvcGUgPT4gc2xvdHNbICdzZWxlY3RlZC1pdGVtJyBdKHNjb3BlKSkuc2xpY2UoKVxuICAgICAgfVxuXG4gICAgICBpZiAoc2xvdHMuc2VsZWN0ZWQgIT09IHZvaWQgMCkge1xuICAgICAgICByZXR1cm4gW10uY29uY2F0KHNsb3RzLnNlbGVjdGVkKCkpXG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9wcy51c2VDaGlwcyA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gc2VsZWN0ZWRTY29wZS52YWx1ZS5tYXAoKHNjb3BlLCBpKSA9PiBoKFFDaGlwLCB7XG4gICAgICAgICAga2V5OiAnb3B0aW9uLScgKyBpLFxuICAgICAgICAgIHJlbW92YWJsZTogc3RhdGUuZWRpdGFibGUudmFsdWUgPT09IHRydWUgJiYgaXNPcHRpb25EaXNhYmxlZC52YWx1ZShzY29wZS5vcHQpICE9PSB0cnVlLFxuICAgICAgICAgIGRlbnNlOiB0cnVlLFxuICAgICAgICAgIHRleHRDb2xvcjogcHJvcHMuY29sb3IsXG4gICAgICAgICAgdGFiaW5kZXg6IHRhYmluZGV4LnZhbHVlLFxuICAgICAgICAgIG9uUmVtb3ZlICgpIHsgc2NvcGUucmVtb3ZlQXRJbmRleChpKSB9XG4gICAgICAgIH0sICgpID0+IGgoJ3NwYW4nLCB7XG4gICAgICAgICAgY2xhc3M6ICdlbGxpcHNpcycsXG4gICAgICAgICAgWyBzY29wZS5odG1sID09PSB0cnVlID8gJ2lubmVySFRNTCcgOiAndGV4dENvbnRlbnQnIF06IGdldE9wdGlvbkxhYmVsLnZhbHVlKHNjb3BlLm9wdClcbiAgICAgICAgfSkpKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gW1xuICAgICAgICBoKCdzcGFuJywge1xuICAgICAgICAgIGNsYXNzOiAnZWxsaXBzaXMnLFxuICAgICAgICAgIFsgdmFsdWVBc0h0bWwudmFsdWUgPT09IHRydWUgPyAnaW5uZXJIVE1MJyA6ICd0ZXh0Q29udGVudCcgXTogYXJpYUN1cnJlbnRWYWx1ZS52YWx1ZVxuICAgICAgICB9KVxuICAgICAgXVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEFsbE9wdGlvbnMgKCkge1xuICAgICAgaWYgKG5vT3B0aW9ucy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gc2xvdHNbICduby1vcHRpb24nIF0gIT09IHZvaWQgMFxuICAgICAgICAgID8gc2xvdHNbICduby1vcHRpb24nIF0oeyBpbnB1dFZhbHVlOiBpbnB1dFZhbHVlLnZhbHVlIH0pXG4gICAgICAgICAgOiB2b2lkIDBcbiAgICAgIH1cblxuICAgICAgY29uc3QgZm4gPSBzbG90cy5vcHRpb24gIT09IHZvaWQgMFxuICAgICAgICA/IHNsb3RzLm9wdGlvblxuICAgICAgICA6IHNjb3BlID0+IHtcbiAgICAgICAgICByZXR1cm4gaChRSXRlbSwge1xuICAgICAgICAgICAga2V5OiBzY29wZS5pbmRleCxcbiAgICAgICAgICAgIC4uLnNjb3BlLml0ZW1Qcm9wc1xuICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBoKFxuICAgICAgICAgICAgICBRSXRlbVNlY3Rpb24sXG4gICAgICAgICAgICAgICgpID0+IGgoXG4gICAgICAgICAgICAgICAgUUl0ZW1MYWJlbCxcbiAgICAgICAgICAgICAgICAoKSA9PiBoKCdzcGFuJywge1xuICAgICAgICAgICAgICAgICAgWyBzY29wZS5odG1sID09PSB0cnVlID8gJ2lubmVySFRNTCcgOiAndGV4dENvbnRlbnQnIF06IHNjb3BlLmxhYmVsXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgbGV0IG9wdGlvbnMgPSBwYWRWaXJ0dWFsU2Nyb2xsKCdkaXYnLCBvcHRpb25TY29wZS52YWx1ZS5tYXAoZm4pKVxuXG4gICAgICBpZiAoc2xvdHNbICdiZWZvcmUtb3B0aW9ucycgXSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIG9wdGlvbnMgPSBzbG90c1sgJ2JlZm9yZS1vcHRpb25zJyBdKCkuY29uY2F0KG9wdGlvbnMpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoTWVyZ2VTbG90KHNsb3RzWyAnYWZ0ZXItb3B0aW9ucycgXSwgb3B0aW9ucylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRJbnB1dCAoZnJvbURpYWxvZywgaXNUYXJnZXQpIHtcbiAgICAgIGNvbnN0IGF0dHJzID0gaXNUYXJnZXQgPT09IHRydWUgPyB7IC4uLmNvbWJvYm94QXR0cnMudmFsdWUsIC4uLnN0YXRlLnNwbGl0QXR0cnMuYXR0cmlidXRlcy52YWx1ZSB9IDogdm9pZCAwXG5cbiAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIHJlZjogaXNUYXJnZXQgPT09IHRydWUgPyB0YXJnZXRSZWYgOiB2b2lkIDAsXG4gICAgICAgIGtleTogJ2lfdCcsXG4gICAgICAgIGNsYXNzOiBjb21wdXRlZElucHV0Q2xhc3MudmFsdWUsXG4gICAgICAgIHN0eWxlOiBwcm9wcy5pbnB1dFN0eWxlLFxuICAgICAgICB2YWx1ZTogaW5wdXRWYWx1ZS52YWx1ZSAhPT0gdm9pZCAwID8gaW5wdXRWYWx1ZS52YWx1ZSA6ICcnLFxuICAgICAgICAvLyByZXF1aXJlZCBmb3IgQW5kcm9pZCBpbiBvcmRlciB0byBzaG93IEVOVEVSIGtleSB3aGVuIGluIGZvcm1cbiAgICAgICAgdHlwZTogJ3NlYXJjaCcsXG4gICAgICAgIC4uLmF0dHJzLFxuICAgICAgICBpZDogaXNUYXJnZXQgPT09IHRydWUgPyBzdGF0ZS50YXJnZXRVaWQudmFsdWUgOiB2b2lkIDAsXG4gICAgICAgIG1heGxlbmd0aDogcHJvcHMubWF4bGVuZ3RoLFxuICAgICAgICBhdXRvY29tcGxldGU6IHByb3BzLmF1dG9jb21wbGV0ZSxcbiAgICAgICAgJ2RhdGEtYXV0b2ZvY3VzJzogZnJvbURpYWxvZyA9PT0gdHJ1ZSB8fCBwcm9wcy5hdXRvZm9jdXMgPT09IHRydWUgfHwgdm9pZCAwLFxuICAgICAgICBkaXNhYmxlZDogcHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSxcbiAgICAgICAgcmVhZG9ubHk6IHByb3BzLnJlYWRvbmx5ID09PSB0cnVlLFxuICAgICAgICAuLi5pbnB1dENvbnRyb2xFdmVudHMudmFsdWVcbiAgICAgIH1cblxuICAgICAgaWYgKGZyb21EaWFsb2cgIT09IHRydWUgJiYgaGFzRGlhbG9nID09PSB0cnVlKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEuY2xhc3MpID09PSB0cnVlKSB7XG4gICAgICAgICAgZGF0YS5jbGFzcyA9IFsgLi4uZGF0YS5jbGFzcywgJ25vLXBvaW50ZXItZXZlbnRzJyBdXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZGF0YS5jbGFzcyArPSAnIG5vLXBvaW50ZXItZXZlbnRzJ1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoKCdpbnB1dCcsIGRhdGEpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25JbnB1dCAoZSkge1xuICAgICAgaWYgKGZpbHRlclRpbWVyICE9PSBudWxsKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChmaWx0ZXJUaW1lcilcbiAgICAgICAgZmlsdGVyVGltZXIgPSBudWxsXG4gICAgICB9XG4gICAgICBpZiAoaW5wdXRWYWx1ZVRpbWVyICE9PSBudWxsKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChpbnB1dFZhbHVlVGltZXIpXG4gICAgICAgIGlucHV0VmFsdWVUaW1lciA9IG51bGxcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICBlXG4gICAgICAgICYmIGUudGFyZ2V0XG4gICAgICAgICYmIGUudGFyZ2V0LnFDb21wb3NpbmcgPT09IHRydWVcbiAgICAgICkgcmV0dXJuXG5cbiAgICAgIHNldElucHV0VmFsdWUoZS50YXJnZXQudmFsdWUgfHwgJycpXG4gICAgICAvLyBtYXJrIGl0IGhlcmUgYXMgdXNlciBpbnB1dCBzbyB0aGF0IGlmIHVwZGF0ZUlucHV0VmFsdWUgaXMgY2FsbGVkXG4gICAgICAvLyBiZWZvcmUgZmlsdGVyIGlzIGNhbGxlZCB0aGUgaW5kaWNhdG9yIGlzIHJlc2V0XG4gICAgICB1c2VySW5wdXRWYWx1ZSA9IHRydWVcbiAgICAgIGRlZmF1bHRJbnB1dFZhbHVlID0gaW5wdXRWYWx1ZS52YWx1ZVxuXG4gICAgICBpZiAoXG4gICAgICAgIHN0YXRlLmZvY3VzZWQudmFsdWUgIT09IHRydWVcbiAgICAgICAgJiYgKGhhc0RpYWxvZyAhPT0gdHJ1ZSB8fCBkaWFsb2dGaWVsZEZvY3VzZWQudmFsdWUgPT09IHRydWUpXG4gICAgICApIHtcbiAgICAgICAgc3RhdGUuZm9jdXMoKVxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMub25GaWx0ZXIgIT09IHZvaWQgMCkge1xuICAgICAgICBmaWx0ZXJUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGZpbHRlclRpbWVyID0gbnVsbFxuICAgICAgICAgIGZpbHRlcihpbnB1dFZhbHVlLnZhbHVlKVxuICAgICAgICB9LCBwcm9wcy5pbnB1dERlYm91bmNlKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldElucHV0VmFsdWUgKHZhbCwgZW1pdEltbWVkaWF0ZWx5KSB7XG4gICAgICBpZiAoaW5wdXRWYWx1ZS52YWx1ZSAhPT0gdmFsKSB7XG4gICAgICAgIGlucHV0VmFsdWUudmFsdWUgPSB2YWxcblxuICAgICAgICBpZiAoZW1pdEltbWVkaWF0ZWx5ID09PSB0cnVlIHx8IHByb3BzLmlucHV0RGVib3VuY2UgPT09IDAgfHwgcHJvcHMuaW5wdXREZWJvdW5jZSA9PT0gJzAnKSB7XG4gICAgICAgICAgZW1pdCgnaW5wdXRWYWx1ZScsIHZhbClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBpbnB1dFZhbHVlVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlucHV0VmFsdWVUaW1lciA9IG51bGxcbiAgICAgICAgICAgIGVtaXQoJ2lucHV0VmFsdWUnLCB2YWwpXG4gICAgICAgICAgfSwgcHJvcHMuaW5wdXREZWJvdW5jZSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUlucHV0VmFsdWUgKHZhbCwgbm9GaWx0ZXJpbmcsIGludGVybmFsKSB7XG4gICAgICB1c2VySW5wdXRWYWx1ZSA9IGludGVybmFsICE9PSB0cnVlXG5cbiAgICAgIGlmIChwcm9wcy51c2VJbnB1dCA9PT0gdHJ1ZSkge1xuICAgICAgICBzZXRJbnB1dFZhbHVlKHZhbCwgdHJ1ZSlcblxuICAgICAgICBpZiAobm9GaWx0ZXJpbmcgPT09IHRydWUgfHwgaW50ZXJuYWwgIT09IHRydWUpIHtcbiAgICAgICAgICBkZWZhdWx0SW5wdXRWYWx1ZSA9IHZhbFxuICAgICAgICB9XG5cbiAgICAgICAgbm9GaWx0ZXJpbmcgIT09IHRydWUgJiYgZmlsdGVyKHZhbClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaWx0ZXIgKHZhbCwga2VlcENsb3NlZCwgYWZ0ZXJVcGRhdGVGbikge1xuICAgICAgaWYgKFxuICAgICAgICBwcm9wcy5vbkZpbHRlciA9PT0gdm9pZCAwXG4gICAgICAgIHx8IChrZWVwQ2xvc2VkICE9PSB0cnVlICYmIHN0YXRlLmZvY3VzZWQudmFsdWUgIT09IHRydWUpXG4gICAgICApIHJldHVyblxuXG4gICAgICBpZiAoc3RhdGUuaW5uZXJMb2FkaW5nLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGVtaXQoJ2ZpbHRlckFib3J0JylcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBzdGF0ZS5pbm5lckxvYWRpbmcudmFsdWUgPSB0cnVlXG4gICAgICAgIGlubmVyTG9hZGluZ0luZGljYXRvci52YWx1ZSA9IHRydWVcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICB2YWwgIT09ICcnXG4gICAgICAgICYmIHByb3BzLm11bHRpcGxlICE9PSB0cnVlXG4gICAgICAgICYmIGlubmVyVmFsdWUudmFsdWUubGVuZ3RoICE9PSAwXG4gICAgICAgICYmIHVzZXJJbnB1dFZhbHVlICE9PSB0cnVlXG4gICAgICAgICYmIHZhbCA9PT0gZ2V0T3B0aW9uTGFiZWwudmFsdWUoaW5uZXJWYWx1ZS52YWx1ZVsgMCBdKVxuICAgICAgKSB7XG4gICAgICAgIHZhbCA9ICcnXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGxvY2FsRmlsdGVySWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgbWVudS52YWx1ZSA9PT0gdHJ1ZSAmJiAobWVudS52YWx1ZSA9IGZhbHNlKVxuICAgICAgfSwgMTApXG5cbiAgICAgIGZpbHRlcklkICE9PSBudWxsICYmIGNsZWFyVGltZW91dChmaWx0ZXJJZClcbiAgICAgIGZpbHRlcklkID0gbG9jYWxGaWx0ZXJJZFxuXG4gICAgICBlbWl0KFxuICAgICAgICAnZmlsdGVyJyxcbiAgICAgICAgdmFsLFxuICAgICAgICAoZm4sIGFmdGVyRm4pID0+IHtcbiAgICAgICAgICBpZiAoKGtlZXBDbG9zZWQgPT09IHRydWUgfHwgc3RhdGUuZm9jdXNlZC52YWx1ZSA9PT0gdHJ1ZSkgJiYgZmlsdGVySWQgPT09IGxvY2FsRmlsdGVySWQpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChmaWx0ZXJJZClcblxuICAgICAgICAgICAgdHlwZW9mIGZuID09PSAnZnVuY3Rpb24nICYmIGZuKClcblxuICAgICAgICAgICAgLy8gaGlkZSBpbmRpY2F0b3IgdG8gYWxsb3cgYXJyb3cgdG8gYW5pbWF0ZVxuICAgICAgICAgICAgaW5uZXJMb2FkaW5nSW5kaWNhdG9yLnZhbHVlID0gZmFsc2VcblxuICAgICAgICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgICAgICBzdGF0ZS5pbm5lckxvYWRpbmcudmFsdWUgPSBmYWxzZVxuXG4gICAgICAgICAgICAgIGlmIChzdGF0ZS5lZGl0YWJsZS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChrZWVwQ2xvc2VkID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICBtZW51LnZhbHVlID09PSB0cnVlICYmIGhpZGVQb3B1cCgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG1lbnUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgIHVwZGF0ZU1lbnUodHJ1ZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICBtZW51LnZhbHVlID0gdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHR5cGVvZiBhZnRlckZuID09PSAnZnVuY3Rpb24nICYmIG5leHRUaWNrKCgpID0+IHsgYWZ0ZXJGbihwcm94eSkgfSlcbiAgICAgICAgICAgICAgdHlwZW9mIGFmdGVyVXBkYXRlRm4gPT09ICdmdW5jdGlvbicgJiYgbmV4dFRpY2soKCkgPT4geyBhZnRlclVwZGF0ZUZuKHByb3h5KSB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICBpZiAoc3RhdGUuZm9jdXNlZC52YWx1ZSA9PT0gdHJ1ZSAmJiBmaWx0ZXJJZCA9PT0gbG9jYWxGaWx0ZXJJZCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGZpbHRlcklkKVxuICAgICAgICAgICAgc3RhdGUuaW5uZXJMb2FkaW5nLnZhbHVlID0gZmFsc2VcbiAgICAgICAgICAgIGlubmVyTG9hZGluZ0luZGljYXRvci52YWx1ZSA9IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICAgIG1lbnUudmFsdWUgPT09IHRydWUgJiYgKG1lbnUudmFsdWUgPSBmYWxzZSlcbiAgICAgICAgfVxuICAgICAgKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldE1lbnUgKCkge1xuICAgICAgcmV0dXJuIGgoUU1lbnUsIHtcbiAgICAgICAgcmVmOiBtZW51UmVmLFxuICAgICAgICBjbGFzczogbWVudUNvbnRlbnRDbGFzcy52YWx1ZSxcbiAgICAgICAgc3R5bGU6IHByb3BzLnBvcHVwQ29udGVudFN0eWxlLFxuICAgICAgICBtb2RlbFZhbHVlOiBtZW51LnZhbHVlLFxuICAgICAgICBmaXQ6IHByb3BzLm1lbnVTaHJpbmsgIT09IHRydWUsXG4gICAgICAgIGNvdmVyOiBwcm9wcy5vcHRpb25zQ292ZXIgPT09IHRydWUgJiYgbm9PcHRpb25zLnZhbHVlICE9PSB0cnVlICYmIHByb3BzLnVzZUlucHV0ICE9PSB0cnVlLFxuICAgICAgICBhbmNob3I6IHByb3BzLm1lbnVBbmNob3IsXG4gICAgICAgIHNlbGY6IHByb3BzLm1lbnVTZWxmLFxuICAgICAgICBvZmZzZXQ6IHByb3BzLm1lbnVPZmZzZXQsXG4gICAgICAgIGRhcms6IGlzT3B0aW9uc0RhcmsudmFsdWUsXG4gICAgICAgIG5vUGFyZW50RXZlbnQ6IHRydWUsXG4gICAgICAgIG5vUmVmb2N1czogdHJ1ZSxcbiAgICAgICAgbm9Gb2N1czogdHJ1ZSxcbiAgICAgICAgbm9Sb3V0ZURpc21pc3M6IHByb3BzLnBvcHVwTm9Sb3V0ZURpc21pc3MsXG4gICAgICAgIHNxdWFyZTogc3F1YXJlZE1lbnUudmFsdWUsXG4gICAgICAgIHRyYW5zaXRpb25TaG93OiBwcm9wcy50cmFuc2l0aW9uU2hvdyxcbiAgICAgICAgdHJhbnNpdGlvbkhpZGU6IHByb3BzLnRyYW5zaXRpb25IaWRlLFxuICAgICAgICB0cmFuc2l0aW9uRHVyYXRpb246IHByb3BzLnRyYW5zaXRpb25EdXJhdGlvbixcbiAgICAgICAgc2VwYXJhdGVDbG9zZVBvcHVwOiB0cnVlLFxuICAgICAgICAuLi5saXN0Ym94QXR0cnMudmFsdWUsXG4gICAgICAgIG9uU2Nyb2xsUGFzc2l2ZTogb25WaXJ0dWFsU2Nyb2xsRXZ0LFxuICAgICAgICBvbkJlZm9yZVNob3c6IG9uQ29udHJvbFBvcHVwU2hvdyxcbiAgICAgICAgb25CZWZvcmVIaWRlOiBvbk1lbnVCZWZvcmVIaWRlLFxuICAgICAgICBvblNob3c6IG9uTWVudVNob3dcbiAgICAgIH0sIGdldEFsbE9wdGlvbnMpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25NZW51QmVmb3JlSGlkZSAoZSkge1xuICAgICAgb25Db250cm9sUG9wdXBIaWRlKGUpXG4gICAgICBjbG9zZU1lbnUoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTWVudVNob3cgKCkge1xuICAgICAgc2V0VmlydHVhbFNjcm9sbFNpemUoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRGlhbG9nRmllbGRGb2N1cyAoZSkge1xuICAgICAgc3RvcChlKVxuICAgICAgdGFyZ2V0UmVmLnZhbHVlPy5mb2N1cygpXG4gICAgICBkaWFsb2dGaWVsZEZvY3VzZWQudmFsdWUgPSB0cnVlXG4gICAgICB3aW5kb3cuc2Nyb2xsVG8od2luZG93LnBhZ2VYT2Zmc2V0IHx8IHdpbmRvdy5zY3JvbGxYIHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdCB8fCAwLCAwKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRGlhbG9nRmllbGRCbHVyIChlKSB7XG4gICAgICBzdG9wKGUpXG4gICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgIGRpYWxvZ0ZpZWxkRm9jdXNlZC52YWx1ZSA9IGZhbHNlXG4gICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldERpYWxvZyAoKSB7XG4gICAgICBjb25zdCBjb250ZW50ID0gW1xuICAgICAgICBoKFFGaWVsZCwge1xuICAgICAgICAgIGNsYXNzOiBgY29sLWF1dG8gJHsgc3RhdGUuZmllbGRDbGFzcy52YWx1ZSB9YCxcbiAgICAgICAgICAuLi5pbm5lckZpZWxkUHJvcHMudmFsdWUsXG4gICAgICAgICAgZm9yOiBzdGF0ZS50YXJnZXRVaWQudmFsdWUsXG4gICAgICAgICAgZGFyazogaXNPcHRpb25zRGFyay52YWx1ZSxcbiAgICAgICAgICBzcXVhcmU6IHRydWUsXG4gICAgICAgICAgbG9hZGluZzogaW5uZXJMb2FkaW5nSW5kaWNhdG9yLnZhbHVlLFxuICAgICAgICAgIGl0ZW1BbGlnbmVkOiBmYWxzZSxcbiAgICAgICAgICBmaWxsZWQ6IHRydWUsXG4gICAgICAgICAgc3RhY2tMYWJlbDogaW5wdXRWYWx1ZS52YWx1ZS5sZW5ndGggIT09IDAsXG4gICAgICAgICAgLi4uc3RhdGUuc3BsaXRBdHRycy5saXN0ZW5lcnMudmFsdWUsXG4gICAgICAgICAgb25Gb2N1czogb25EaWFsb2dGaWVsZEZvY3VzLFxuICAgICAgICAgIG9uQmx1cjogb25EaWFsb2dGaWVsZEJsdXJcbiAgICAgICAgfSwge1xuICAgICAgICAgIC4uLnNsb3RzLFxuICAgICAgICAgIHJhd0NvbnRyb2w6ICgpID0+IHN0YXRlLmdldENvbnRyb2wodHJ1ZSksXG4gICAgICAgICAgYmVmb3JlOiB2b2lkIDAsXG4gICAgICAgICAgYWZ0ZXI6IHZvaWQgMFxuICAgICAgICB9KVxuICAgICAgXVxuXG4gICAgICBtZW51LnZhbHVlID09PSB0cnVlICYmIGNvbnRlbnQucHVzaChcbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIHJlZjogbWVudUNvbnRlbnRSZWYsXG4gICAgICAgICAgY2xhc3M6IG1lbnVDb250ZW50Q2xhc3MudmFsdWUgKyAnIHNjcm9sbCcsXG4gICAgICAgICAgc3R5bGU6IHByb3BzLnBvcHVwQ29udGVudFN0eWxlLFxuICAgICAgICAgIC4uLmxpc3Rib3hBdHRycy52YWx1ZSxcbiAgICAgICAgICBvbkNsaWNrOiBwcmV2ZW50LFxuICAgICAgICAgIG9uU2Nyb2xsUGFzc2l2ZTogb25WaXJ0dWFsU2Nyb2xsRXZ0XG4gICAgICAgIH0sIGdldEFsbE9wdGlvbnMoKSlcbiAgICAgIClcblxuICAgICAgcmV0dXJuIGgoUURpYWxvZywge1xuICAgICAgICByZWY6IGRpYWxvZ1JlZixcbiAgICAgICAgbW9kZWxWYWx1ZTogZGlhbG9nLnZhbHVlLFxuICAgICAgICBwb3NpdGlvbjogcHJvcHMudXNlSW5wdXQgPT09IHRydWUgPyAndG9wJyA6IHZvaWQgMCxcbiAgICAgICAgdHJhbnNpdGlvblNob3c6IHRyYW5zaXRpb25TaG93Q29tcHV0ZWQsXG4gICAgICAgIHRyYW5zaXRpb25IaWRlOiBwcm9wcy50cmFuc2l0aW9uSGlkZSxcbiAgICAgICAgdHJhbnNpdGlvbkR1cmF0aW9uOiBwcm9wcy50cmFuc2l0aW9uRHVyYXRpb24sXG4gICAgICAgIG5vUm91dGVEaXNtaXNzOiBwcm9wcy5wb3B1cE5vUm91dGVEaXNtaXNzLFxuICAgICAgICBvbkJlZm9yZVNob3c6IG9uQ29udHJvbFBvcHVwU2hvdyxcbiAgICAgICAgb25CZWZvcmVIaWRlOiBvbkRpYWxvZ0JlZm9yZUhpZGUsXG4gICAgICAgIG9uSGlkZTogb25EaWFsb2dIaWRlLFxuICAgICAgICBvblNob3c6IG9uRGlhbG9nU2hvd1xuICAgICAgfSwgKCkgPT4gaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogJ3Etc2VsZWN0X19kaWFsb2cnXG4gICAgICAgICAgKyAoaXNPcHRpb25zRGFyay52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1zZWxlY3RfX2RpYWxvZy0tZGFyayBxLWRhcmsnIDogJycpXG4gICAgICAgICAgKyAoZGlhbG9nRmllbGRGb2N1c2VkLnZhbHVlID09PSB0cnVlID8gJyBxLXNlbGVjdF9fZGlhbG9nLS1mb2N1c2VkJyA6ICcnKVxuICAgICAgfSwgY29udGVudCkpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25EaWFsb2dCZWZvcmVIaWRlIChlKSB7XG4gICAgICBvbkNvbnRyb2xQb3B1cEhpZGUoZSlcblxuICAgICAgaWYgKGRpYWxvZ1JlZi52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICBkaWFsb2dSZWYudmFsdWUuX191cGRhdGVSZWZvY3VzVGFyZ2V0KFxuICAgICAgICAgIHN0YXRlLnJvb3RSZWYudmFsdWUucXVlcnlTZWxlY3RvcignLnEtZmllbGRfX25hdGl2ZSA+IFt0YWJpbmRleF06bGFzdC1jaGlsZCcpXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgc3RhdGUuZm9jdXNlZC52YWx1ZSA9IGZhbHNlXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25EaWFsb2dIaWRlIChlKSB7XG4gICAgICBoaWRlUG9wdXAoKVxuICAgICAgc3RhdGUuZm9jdXNlZC52YWx1ZSA9PT0gZmFsc2UgJiYgZW1pdCgnYmx1cicsIGUpXG4gICAgICByZXNldElucHV0VmFsdWUoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRGlhbG9nU2hvdyAoKSB7XG4gICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnRcbiAgICAgIGlmIChcbiAgICAgICAgKGVsID09PSBudWxsIHx8IGVsLmlkICE9PSBzdGF0ZS50YXJnZXRVaWQudmFsdWUpXG4gICAgICAgICYmIHRhcmdldFJlZi52YWx1ZSAhPT0gbnVsbFxuICAgICAgICAmJiB0YXJnZXRSZWYudmFsdWUgIT09IGVsXG4gICAgICApIHtcbiAgICAgICAgdGFyZ2V0UmVmLnZhbHVlLmZvY3VzKClcbiAgICAgIH1cblxuICAgICAgc2V0VmlydHVhbFNjcm9sbFNpemUoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsb3NlTWVudSAoKSB7XG4gICAgICBpZiAoZGlhbG9nLnZhbHVlID09PSB0cnVlKSByZXR1cm5cblxuICAgICAgb3B0aW9uSW5kZXgudmFsdWUgPSAtMVxuXG4gICAgICBpZiAobWVudS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBtZW51LnZhbHVlID0gZmFsc2VcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlLmZvY3VzZWQudmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgIGlmIChmaWx0ZXJJZCAhPT0gbnVsbCkge1xuICAgICAgICAgIGNsZWFyVGltZW91dChmaWx0ZXJJZClcbiAgICAgICAgICBmaWx0ZXJJZCA9IG51bGxcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdGF0ZS5pbm5lckxvYWRpbmcudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICBlbWl0KCdmaWx0ZXJBYm9ydCcpXG4gICAgICAgICAgc3RhdGUuaW5uZXJMb2FkaW5nLnZhbHVlID0gZmFsc2VcbiAgICAgICAgICBpbm5lckxvYWRpbmdJbmRpY2F0b3IudmFsdWUgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2hvd1BvcHVwIChlKSB7XG4gICAgICBpZiAoc3RhdGUuZWRpdGFibGUudmFsdWUgIT09IHRydWUpIHJldHVyblxuXG4gICAgICBpZiAoaGFzRGlhbG9nID09PSB0cnVlKSB7XG4gICAgICAgIHN0YXRlLm9uQ29udHJvbEZvY3VzaW4oZSlcbiAgICAgICAgZGlhbG9nLnZhbHVlID0gdHJ1ZVxuICAgICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgc3RhdGUuZm9jdXMoKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHN0YXRlLmZvY3VzKClcbiAgICAgIH1cblxuICAgICAgaWYgKHByb3BzLm9uRmlsdGVyICE9PSB2b2lkIDApIHtcbiAgICAgICAgZmlsdGVyKGlucHV0VmFsdWUudmFsdWUpXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChub09wdGlvbnMudmFsdWUgIT09IHRydWUgfHwgc2xvdHNbICduby1vcHRpb24nIF0gIT09IHZvaWQgMCkge1xuICAgICAgICBtZW51LnZhbHVlID0gdHJ1ZVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhpZGVQb3B1cCAoKSB7XG4gICAgICBkaWFsb2cudmFsdWUgPSBmYWxzZVxuICAgICAgY2xvc2VNZW51KClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXNldElucHV0VmFsdWUgKCkge1xuICAgICAgcHJvcHMudXNlSW5wdXQgPT09IHRydWUgJiYgdXBkYXRlSW5wdXRWYWx1ZShcbiAgICAgICAgcHJvcHMubXVsdGlwbGUgIT09IHRydWUgJiYgcHJvcHMuZmlsbElucHV0ID09PSB0cnVlICYmIGlubmVyVmFsdWUudmFsdWUubGVuZ3RoICE9PSAwXG4gICAgICAgICAgPyBnZXRPcHRpb25MYWJlbC52YWx1ZShpbm5lclZhbHVlLnZhbHVlWyAwIF0pIHx8ICcnXG4gICAgICAgICAgOiAnJyxcbiAgICAgICAgdHJ1ZSxcbiAgICAgICAgdHJ1ZVxuICAgICAgKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZU1lbnUgKHNob3cpIHtcbiAgICAgIGxldCBvcHRpb25JbmRleCA9IC0xXG5cbiAgICAgIGlmIChzaG93ID09PSB0cnVlKSB7XG4gICAgICAgIGlmIChpbm5lclZhbHVlLnZhbHVlLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgIGNvbnN0IHZhbCA9IGdldE9wdGlvblZhbHVlLnZhbHVlKGlubmVyVmFsdWUudmFsdWVbIDAgXSlcbiAgICAgICAgICBvcHRpb25JbmRleCA9IHByb3BzLm9wdGlvbnMuZmluZEluZGV4KHYgPT4gaXNEZWVwRXF1YWwoZ2V0T3B0aW9uVmFsdWUudmFsdWUodiksIHZhbCkpXG4gICAgICAgIH1cblxuICAgICAgICBsb2NhbFJlc2V0VmlydHVhbFNjcm9sbChvcHRpb25JbmRleClcbiAgICAgIH1cblxuICAgICAgc2V0T3B0aW9uSW5kZXgob3B0aW9uSW5kZXgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVyZW5kZXJNZW51IChuZXdMZW5ndGgsIG9sZExlbmd0aCkge1xuICAgICAgaWYgKG1lbnUudmFsdWUgPT09IHRydWUgJiYgc3RhdGUuaW5uZXJMb2FkaW5nLnZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICBsb2NhbFJlc2V0VmlydHVhbFNjcm9sbCgtMSwgdHJ1ZSlcblxuICAgICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgaWYgKG1lbnUudmFsdWUgPT09IHRydWUgJiYgc3RhdGUuaW5uZXJMb2FkaW5nLnZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgaWYgKG5ld0xlbmd0aCA+IG9sZExlbmd0aCkge1xuICAgICAgICAgICAgICBsb2NhbFJlc2V0VmlydHVhbFNjcm9sbCgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgdXBkYXRlTWVudSh0cnVlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVNZW51UG9zaXRpb24gKCkge1xuICAgICAgaWYgKGRpYWxvZy52YWx1ZSA9PT0gZmFsc2UgJiYgbWVudVJlZi52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICBtZW51UmVmLnZhbHVlLnVwZGF0ZVBvc2l0aW9uKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkNvbnRyb2xQb3B1cFNob3cgKGUpIHtcbiAgICAgIGUgIT09IHZvaWQgMCAmJiBzdG9wKGUpXG4gICAgICBlbWl0KCdwb3B1cFNob3cnLCBlKVxuICAgICAgc3RhdGUuaGFzUG9wdXBPcGVuID0gdHJ1ZVxuICAgICAgc3RhdGUub25Db250cm9sRm9jdXNpbihlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uQ29udHJvbFBvcHVwSGlkZSAoZSkge1xuICAgICAgZSAhPT0gdm9pZCAwICYmIHN0b3AoZSlcbiAgICAgIGVtaXQoJ3BvcHVwSGlkZScsIGUpXG4gICAgICBzdGF0ZS5oYXNQb3B1cE9wZW4gPSBmYWxzZVxuICAgICAgc3RhdGUub25Db250cm9sRm9jdXNvdXQoZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVQcmVTdGF0ZSAoKSB7XG4gICAgICBoYXNEaWFsb2cgPSAkcS5wbGF0Zm9ybS5pcy5tb2JpbGUgIT09IHRydWUgJiYgcHJvcHMuYmVoYXZpb3IgIT09ICdkaWFsb2cnXG4gICAgICAgID8gZmFsc2VcbiAgICAgICAgOiBwcm9wcy5iZWhhdmlvciAhPT0gJ21lbnUnICYmIChcbiAgICAgICAgICBwcm9wcy51c2VJbnB1dCA9PT0gdHJ1ZVxuICAgICAgICAgICAgPyBzbG90c1sgJ25vLW9wdGlvbicgXSAhPT0gdm9pZCAwIHx8IHByb3BzLm9uRmlsdGVyICE9PSB2b2lkIDAgfHwgbm9PcHRpb25zLnZhbHVlID09PSBmYWxzZVxuICAgICAgICAgICAgOiB0cnVlXG4gICAgICAgIClcblxuICAgICAgdHJhbnNpdGlvblNob3dDb21wdXRlZCA9ICRxLnBsYXRmb3JtLmlzLmlvcyA9PT0gdHJ1ZSAmJiBoYXNEaWFsb2cgPT09IHRydWUgJiYgcHJvcHMudXNlSW5wdXQgPT09IHRydWVcbiAgICAgICAgPyAnZmFkZSdcbiAgICAgICAgOiBwcm9wcy50cmFuc2l0aW9uU2hvd1xuICAgIH1cblxuICAgIG9uQmVmb3JlVXBkYXRlKHVwZGF0ZVByZVN0YXRlKVxuICAgIG9uVXBkYXRlZCh1cGRhdGVNZW51UG9zaXRpb24pXG5cbiAgICB1cGRhdGVQcmVTdGF0ZSgpXG5cbiAgICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgICAgZmlsdGVyVGltZXIgIT09IG51bGwgJiYgY2xlYXJUaW1lb3V0KGZpbHRlclRpbWVyKVxuICAgICAgaW5wdXRWYWx1ZVRpbWVyICE9PSBudWxsICYmIGNsZWFyVGltZW91dChpbnB1dFZhbHVlVGltZXIpXG4gICAgfSlcblxuICAgIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kc1xuICAgIE9iamVjdC5hc3NpZ24ocHJveHksIHtcbiAgICAgIHNob3dQb3B1cCwgaGlkZVBvcHVwLFxuICAgICAgcmVtb3ZlQXRJbmRleCwgYWRkLCB0b2dnbGVPcHRpb24sXG4gICAgICBnZXRPcHRpb25JbmRleDogKCkgPT4gb3B0aW9uSW5kZXgudmFsdWUsXG4gICAgICBzZXRPcHRpb25JbmRleCwgbW92ZU9wdGlvblNlbGVjdGlvbixcbiAgICAgIGZpbHRlciwgdXBkYXRlTWVudVBvc2l0aW9uLCB1cGRhdGVJbnB1dFZhbHVlLFxuICAgICAgaXNPcHRpb25TZWxlY3RlZCxcbiAgICAgIGdldEVtaXR0aW5nT3B0aW9uVmFsdWUsXG4gICAgICBpc09wdGlvbkRpc2FibGVkOiAoLi4uYXJncykgPT4gaXNPcHRpb25EaXNhYmxlZC52YWx1ZS5hcHBseShudWxsLCBhcmdzKSA9PT0gdHJ1ZSxcbiAgICAgIGdldE9wdGlvblZhbHVlOiAoLi4uYXJncykgPT4gZ2V0T3B0aW9uVmFsdWUudmFsdWUuYXBwbHkobnVsbCwgYXJncyksXG4gICAgICBnZXRPcHRpb25MYWJlbDogKC4uLmFyZ3MpID0+IGdldE9wdGlvbkxhYmVsLnZhbHVlLmFwcGx5KG51bGwsIGFyZ3MpXG4gICAgfSlcblxuICAgIE9iamVjdC5hc3NpZ24oc3RhdGUsIHtcbiAgICAgIGlubmVyVmFsdWUsXG5cbiAgICAgIGZpZWxkQ2xhc3M6IGNvbXB1dGVkKCgpID0+XG4gICAgICAgIGBxLXNlbGVjdCBxLWZpZWxkLS1hdXRvLWhlaWdodCBxLXNlbGVjdC0td2l0aCR7IHByb3BzLnVzZUlucHV0ICE9PSB0cnVlID8gJ291dCcgOiAnJyB9LWlucHV0YFxuICAgICAgICArIGAgcS1zZWxlY3QtLXdpdGgkeyBwcm9wcy51c2VDaGlwcyAhPT0gdHJ1ZSA/ICdvdXQnIDogJycgfS1jaGlwc2BcbiAgICAgICAgKyBgIHEtc2VsZWN0LS0keyBwcm9wcy5tdWx0aXBsZSA9PT0gdHJ1ZSA/ICdtdWx0aXBsZScgOiAnc2luZ2xlJyB9YFxuICAgICAgKSxcblxuICAgICAgaW5wdXRSZWYsXG4gICAgICB0YXJnZXRSZWYsXG4gICAgICBoYXNWYWx1ZSxcbiAgICAgIHNob3dQb3B1cCxcblxuICAgICAgZmxvYXRpbmdMYWJlbDogY29tcHV0ZWQoKCkgPT5cbiAgICAgICAgKHByb3BzLmhpZGVTZWxlY3RlZCAhPT0gdHJ1ZSAmJiBoYXNWYWx1ZS52YWx1ZSA9PT0gdHJ1ZSlcbiAgICAgICAgfHwgdHlwZW9mIGlucHV0VmFsdWUudmFsdWUgPT09ICdudW1iZXInXG4gICAgICAgIHx8IGlucHV0VmFsdWUudmFsdWUubGVuZ3RoICE9PSAwXG4gICAgICAgIHx8IGZpZWxkVmFsdWVJc0ZpbGxlZChwcm9wcy5kaXNwbGF5VmFsdWUpXG4gICAgICApLFxuXG4gICAgICBnZXRDb250cm9sQ2hpbGQ6ICgpID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHN0YXRlLmVkaXRhYmxlLnZhbHVlICE9PSBmYWxzZSAmJiAoXG4gICAgICAgICAgICBkaWFsb2cudmFsdWUgPT09IHRydWUgLy8gZGlhbG9nIGFsd2F5cyBoYXMgbWVudSBkaXNwbGF5ZWQsIHNvIG5lZWQgdG8gcmVuZGVyIGl0XG4gICAgICAgICAgICB8fCBub09wdGlvbnMudmFsdWUgIT09IHRydWVcbiAgICAgICAgICAgIHx8IHNsb3RzWyAnbm8tb3B0aW9uJyBdICE9PSB2b2lkIDBcbiAgICAgICAgICApXG4gICAgICAgICkge1xuICAgICAgICAgIHJldHVybiBoYXNEaWFsb2cgPT09IHRydWUgPyBnZXREaWFsb2coKSA6IGdldE1lbnUoKVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHN0YXRlLmhhc1BvcHVwT3BlbiA9PT0gdHJ1ZSkge1xuICAgICAgICAgIC8vIGV4cGxpY2l0bHkgc2V0IGl0IG90aGVyd2lzZSBUQUIgd2lsbCBub3QgYmx1ciBjb21wb25lbnRcbiAgICAgICAgICBzdGF0ZS5oYXNQb3B1cE9wZW4gPSBmYWxzZVxuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICBjb250cm9sRXZlbnRzOiB7XG4gICAgICAgIG9uRm9jdXNpbiAoZSkgeyBzdGF0ZS5vbkNvbnRyb2xGb2N1c2luKGUpIH0sXG4gICAgICAgIG9uRm9jdXNvdXQgKGUpIHtcbiAgICAgICAgICBzdGF0ZS5vbkNvbnRyb2xGb2N1c291dChlLCAoKSA9PiB7XG4gICAgICAgICAgICByZXNldElucHV0VmFsdWUoKVxuICAgICAgICAgICAgY2xvc2VNZW51KClcbiAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBvbkNsaWNrIChlKSB7XG4gICAgICAgICAgLy8gbGFiZWwgZnJvbSBRRmllbGQgd2lsbCBwcm9wYWdhdGUgY2xpY2sgb24gdGhlIGlucHV0XG4gICAgICAgICAgcHJldmVudChlKVxuXG4gICAgICAgICAgaWYgKGhhc0RpYWxvZyAhPT0gdHJ1ZSAmJiBtZW51LnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjbG9zZU1lbnUoKVxuICAgICAgICAgICAgdGFyZ2V0UmVmLnZhbHVlPy5mb2N1cygpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzaG93UG9wdXAoZSlcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgZ2V0Q29udHJvbDogZnJvbURpYWxvZyA9PiB7XG4gICAgICAgIGNvbnN0IGNoaWxkID0gZ2V0U2VsZWN0aW9uKClcbiAgICAgICAgY29uc3QgaXNUYXJnZXQgPSBmcm9tRGlhbG9nID09PSB0cnVlIHx8IGRpYWxvZy52YWx1ZSAhPT0gdHJ1ZSB8fCBoYXNEaWFsb2cgIT09IHRydWVcblxuICAgICAgICBpZiAocHJvcHMudXNlSW5wdXQgPT09IHRydWUpIHtcbiAgICAgICAgICBjaGlsZC5wdXNoKGdldElucHV0KGZyb21EaWFsb2csIGlzVGFyZ2V0KSlcbiAgICAgICAgfVxuICAgICAgICAvLyB0aGVyZSBjYW4gYmUgb25seSBvbmUgKHdoZW4gZGlhbG9nIGlzIG9wZW5lZCB0aGUgY29udHJvbCBpbiBkaWFsb2cgc2hvdWxkIGJlIHRhcmdldClcbiAgICAgICAgZWxzZSBpZiAoc3RhdGUuZWRpdGFibGUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICBjb25zdCBhdHRycyA9IGlzVGFyZ2V0ID09PSB0cnVlID8gY29tYm9ib3hBdHRycy52YWx1ZSA6IHZvaWQgMFxuXG4gICAgICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgICAgIGgoJ2lucHV0Jywge1xuICAgICAgICAgICAgICByZWY6IGlzVGFyZ2V0ID09PSB0cnVlID8gdGFyZ2V0UmVmIDogdm9pZCAwLFxuICAgICAgICAgICAgICBrZXk6ICdkX3QnLFxuICAgICAgICAgICAgICBjbGFzczogJ3Etc2VsZWN0X19mb2N1cy10YXJnZXQnLFxuICAgICAgICAgICAgICBpZDogaXNUYXJnZXQgPT09IHRydWUgPyBzdGF0ZS50YXJnZXRVaWQudmFsdWUgOiB2b2lkIDAsXG4gICAgICAgICAgICAgIHZhbHVlOiBhcmlhQ3VycmVudFZhbHVlLnZhbHVlLFxuICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZSxcbiAgICAgICAgICAgICAgJ2RhdGEtYXV0b2ZvY3VzJzogZnJvbURpYWxvZyA9PT0gdHJ1ZSB8fCBwcm9wcy5hdXRvZm9jdXMgPT09IHRydWUgfHwgdm9pZCAwLFxuICAgICAgICAgICAgICAuLi5hdHRycyxcbiAgICAgICAgICAgICAgb25LZXlkb3duOiBvblRhcmdldEtleWRvd24sXG4gICAgICAgICAgICAgIG9uS2V5dXA6IG9uVGFyZ2V0S2V5dXAsXG4gICAgICAgICAgICAgIG9uS2V5cHJlc3M6IG9uVGFyZ2V0S2V5cHJlc3NcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKVxuXG4gICAgICAgICAgaWYgKGlzVGFyZ2V0ID09PSB0cnVlICYmIHR5cGVvZiBwcm9wcy5hdXRvY29tcGxldGUgPT09ICdzdHJpbmcnICYmIHByb3BzLmF1dG9jb21wbGV0ZS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgIGNoaWxkLnB1c2goXG4gICAgICAgICAgICAgIGgoJ2lucHV0Jywge1xuICAgICAgICAgICAgICAgIGNsYXNzOiAncS1zZWxlY3RfX2F1dG9jb21wbGV0ZS1pbnB1dCcsXG4gICAgICAgICAgICAgICAgYXV0b2NvbXBsZXRlOiBwcm9wcy5hdXRvY29tcGxldGUsXG4gICAgICAgICAgICAgICAgdGFiaW5kZXg6IC0xLFxuICAgICAgICAgICAgICAgIG9uS2V5dXA6IG9uVGFyZ2V0QXV0b2NvbXBsZXRlXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5hbWVQcm9wLnZhbHVlICE9PSB2b2lkIDAgJiYgcHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZSAmJiBpbm5lck9wdGlvbnNWYWx1ZS52YWx1ZS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICBjb25zdCBvcHRzID0gaW5uZXJPcHRpb25zVmFsdWUudmFsdWUubWFwKHZhbHVlID0+IGgoJ29wdGlvbicsIHsgdmFsdWUsIHNlbGVjdGVkOiB0cnVlIH0pKVxuXG4gICAgICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgICAgIGgoJ3NlbGVjdCcsIHtcbiAgICAgICAgICAgICAgY2xhc3M6ICdoaWRkZW4nLFxuICAgICAgICAgICAgICBuYW1lOiBuYW1lUHJvcC52YWx1ZSxcbiAgICAgICAgICAgICAgbXVsdGlwbGU6IHByb3BzLm11bHRpcGxlXG4gICAgICAgICAgICB9LCBvcHRzKVxuICAgICAgICAgIClcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGF0dHJzID0gcHJvcHMudXNlSW5wdXQgPT09IHRydWUgfHwgaXNUYXJnZXQgIT09IHRydWUgPyB2b2lkIDAgOiBzdGF0ZS5zcGxpdEF0dHJzLmF0dHJpYnV0ZXMudmFsdWVcblxuICAgICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS1maWVsZF9fbmF0aXZlIHJvdyBpdGVtcy1jZW50ZXInLFxuICAgICAgICAgIC4uLmF0dHJzLFxuICAgICAgICAgIC4uLnN0YXRlLnNwbGl0QXR0cnMubGlzdGVuZXJzLnZhbHVlXG4gICAgICAgIH0sIGNoaWxkKVxuICAgICAgfSxcblxuICAgICAgZ2V0SW5uZXJBcHBlbmQ6ICgpID0+IChcbiAgICAgICAgcHJvcHMubG9hZGluZyAhPT0gdHJ1ZSAmJiBpbm5lckxvYWRpbmdJbmRpY2F0b3IudmFsdWUgIT09IHRydWUgJiYgcHJvcHMuaGlkZURyb3Bkb3duSWNvbiAhPT0gdHJ1ZVxuICAgICAgICAgID8gW1xuICAgICAgICAgICAgICBoKFFJY29uLCB7XG4gICAgICAgICAgICAgICAgY2xhc3M6ICdxLXNlbGVjdF9fZHJvcGRvd24taWNvbicgKyAobWVudS52YWx1ZSA9PT0gdHJ1ZSA/ICcgcm90YXRlLTE4MCcgOiAnJyksXG4gICAgICAgICAgICAgICAgbmFtZTogZHJvcGRvd25BcnJvd0ljb24udmFsdWVcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF1cbiAgICAgICAgICA6IG51bGxcbiAgICAgIClcbiAgICB9KVxuXG4gICAgcmV0dXJuIHVzZUZpZWxkKHN0YXRlKVxuICB9XG59KVxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwibW9vZC1zZWxlY3RvclwiPlxuICAgIDxxLXNlbGVjdFxuICAgICAgdi1tb2RlbD1cInNlbGVjdGVkTW9vZFwiXG4gICAgICA6b3B0aW9ucz1cIm1vb2RPcHRpb25zXCJcbiAgICAgIGxhYmVsPVwiU2VsZWN0IFlvdXIgTW9vZFwiXG4gICAgICBAdXBkYXRlOm1vZGVsLXZhbHVlPVwib25Nb29kQ2hhbmdlXCJcbiAgICAgIGJlaGF2aW9yPVwibWVudVwiXG4gICAgICByb3VuZGVkXG4gICAgICBmaWxsZWRcbiAgICAgIHBvcHVwLWNvbnRlbnQtY2xhc3M9XCJwb3B1cC1zdHlsZS1jbGFzc1wiXG4gICAgICBiZy1jb2xvcj1cInNlY29uZGFyeVwiXG4gICAgICBkcm9wZG93bi1pY29uPVwiaW1nOmljb25zL3ZhbGVuY2VibGFjay5zdmdcIlxuICAgID5cbiAgICA8L3Etc2VsZWN0PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgeyByZWYsIHdhdGNoIH0gZnJvbSAndnVlJ1xuaW1wb3J0IHsgdXNlTW9vZFN0b3JlIH0gZnJvbSAnc3JjL3N0b3Jlcy9tb29kU3RvcmUnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ01vb2RTZWxlY3RvcicsXG4gIHNldHVwKCkge1xuICAgIGNvbnN0IG1vb2RTdG9yZSA9IHVzZU1vb2RTdG9yZSgpXG4gICAgLy8gRGVmYXVsdCB0byBcIkRlZmF1bHRcIiBpZiBub3Qgc2V0XG4gICAgY29uc3Qgc2VsZWN0ZWRNb29kID0gcmVmKG1vb2RTdG9yZS5jdXJyZW50TW9vZCA/IG1vb2RTdG9yZS5jdXJyZW50TW9vZC5uYW1lIDogJ05ldXRyYWwnKSAvLyBmYWxsYmFjayBkZWZhdWx0IG1vb2RcblxuICAgIC8vIExvZyBpbml0aWFsIHN0YXRlXG4gICAgY29uc29sZS5sb2coJ1tNb29kU2VsZWN0b3JdIEluaXRpYWwgc2VsZWN0ZWRNb29kOicsIHNlbGVjdGVkTW9vZC52YWx1ZSlcbiAgICBjb25zb2xlLmxvZygnW01vb2RTZWxlY3Rvcl0gbW9vZE9wdGlvbnM6JywgbW9vZFN0b3JlLm1vb2RPcHRpb25zKVxuXG4gICAgLy8gV2F0Y2ggdGhlIGxvY2FsIHNlbGVjdGVkTW9vZCB2YWx1ZVxuICAgIHdhdGNoKHNlbGVjdGVkTW9vZCwgKG5ld1ZhbCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ1tNb29kU2VsZWN0b3JdIHNlbGVjdGVkTW9vZCBjaGFuZ2VkIHRvOicsIG5ld1ZhbClcbiAgICB9KVxuXG4gICAgLy8gV2hlbiB0aGUgc2VsZWN0aW9uIGNoYW5nZXMsIHVwZGF0ZSB0aGUgc3RvcmVcbiAgICBjb25zdCBvbk1vb2RDaGFuZ2UgPSAobW9vZCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ1tNb29kU2VsZWN0b3JdIG9uTW9vZENoYW5nZSBjYWxsZWQgd2l0aDonLCBtb29kKVxuICAgICAgY29uc3QgbW9vZE5hbWUgPSBtb29kLnZhbHVlIC8vIEV4dHJhY3Qgb25seSB0aGUgc3RyaW5nIG5hbWVcbiAgICAgIGNvbnNvbGUubG9nKCdbTW9vZFNlbGVjdG9yXSBFeHRyYWN0ZWQgbW9vZE5hbWU6JywgbW9vZE5hbWUpXG4gICAgICBtb29kU3RvcmUuc2V0TW9vZChtb29kTmFtZSlcbiAgICAgIGNvbnNvbGUubG9nKCdbTW9vZFNlbGVjdG9yXSBtb29kU3RvcmUuY3VycmVudE1vb2QgYWZ0ZXIgc2V0TW9vZDonLCBtb29kU3RvcmUuY3VycmVudE1vb2QpXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHNlbGVjdGVkTW9vZCxcbiAgICAgIG1vb2RPcHRpb25zOiBtb29kU3RvcmUubW9vZE9wdGlvbnMsXG4gICAgICBvbk1vb2RDaGFuZ2UsXG4gICAgfVxuICB9LFxufVxuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cbi5tb29kLXNlbGVjdG9yIC5xLXNlbGVjdCB7XG4gIHdpZHRoOiA2NXZ3O1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgbWFyZ2luLWJvdHRvbTogMzBweDtcbn1cblxuLnEtc2VsZWN0X19kcm9wZG93bi1pY29uIGltZyB7XG4gIHdpZHRoOiA1MHB4ICFpbXBvcnRhbnQ7XG4gIGhlaWdodDogNTBweCAhaW1wb3J0YW50O1xufVxuXG4ucG9wdXAtc3R5bGUtY2xhc3Mge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWExYTFhO1xuICBjb2xvcjogd2hpdGU7XG4gIGJvcmRlci1yYWRpdXM6IDUwcHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KSB7XG4gIC5tb29kLXNlbGVjdG9yIC5xLXNlbGVjdCB7XG4gICAgd2lkdGg6IDkwdnc7XG4gICAgbWFyZ2luOiAwIGF1dG87XG4gIH1cbn1cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxxLWxheW91dCB2aWV3PVwibEhoIExwciBsRmZcIj5cbiAgICA8cS1mb290ZXIgcmV2ZWFsIGVsZXZhdGVkIDpjbGFzcz1cIlsnaGVhZGVyLXN0eWxlJywgJ3NoYWRvdy11cC0xMCddXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwibW9vZC1zZWxlY3Rvci1jb250YWluZXJcIj5cbiAgICAgICAgPE1vb2RTZWxlY3RvciAvPlxuICAgICAgPC9kaXY+XG4gICAgICA8cS10b29sYmFyPlxuICAgICAgICA8cS10b29sYmFyLXRpdGxlIHN0eWxlPVwidGV4dC1zaGFkb3c6IDFweCAxcHggYmxhY2tcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyLXRleHRcIj48L2Rpdj5cbiAgICAgICAgPC9xLXRvb2xiYXItdGl0bGU+XG4gICAgICA8L3EtdG9vbGJhcj5cbiAgICA8L3EtZm9vdGVyPlxuXG4gICAgPHEtcGFnZS1jb250YWluZXI+XG4gICAgICA8cm91dGVyLXZpZXcgLz5cbiAgICA8L3EtcGFnZS1jb250YWluZXI+XG4gIDwvcS1sYXlvdXQ+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgb25Nb3VudGVkIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgTW9vZFNlbGVjdG9yIGZyb20gJ2NvbXBvbmVudHMvTW9vZFNlbGVjdG9yLnZ1ZSdcblxub25Nb3VudGVkKCgpID0+IHtcbiAgLy8gU2FmYXJpIHJlcXVpcmVzIHVzZXIgaW50ZXJhY3Rpb24gdG8gaW5pdGlhbGl6ZSBhdWRpb1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgICdjbGljaycsXG4gICAgKCkgPT4ge1xuICAgICAgY29uc3QgYXVkaW9Db250ZXh0ID0gbmV3ICh3aW5kb3cuQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQpKClcbiAgICAgIGF1ZGlvQ29udGV4dC5zdXNwZW5kKClcbiAgICB9LFxuICAgIHsgb25jZTogdHJ1ZSB9LFxuICApXG59KVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiPlxuLmhlYWRlci1zdHlsZSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMxYTFhMWE7XG59XG5cbi5oZWFkZXItdGV4dCB7XG4gIHdpZHRoOiAxMDAlOyAvKiBGaWxsIHRoZSB3aWR0aCBvZiB0aGUgdG9vbGJhciB0aXRsZSAqL1xuICBoZWlnaHQ6IDYwcHg7IC8qIFNldCBhIGZpeGVkIGhlaWdodCAoYWRqdXN0IGFzIG5lZWRlZCkgKi9cbiAgYmFja2dyb3VuZDogdXJsKCcvaWNvbnMvdmFsZW5jZXRpdGxlbmV3My5zdmcnKSBuby1yZXBlYXQgY2VudGVyIGNlbnRlcjtcbiAgYmFja2dyb3VuZC1zaXplOiBjb250YWluOyAvKiBTY2FsZSB0aGUgU1ZHIHByb3BvcnRpb25hbGx5ICovXG4gIG1hcmdpbjogMnB4IGF1dG87IC8qIENlbnRlciBpdCB3aXRoaW4gdGhlIGNvbnRhaW5lciAqL1xuICAvKiBPcHRpb25hbGx5LCBhZGQgYSBkcm9wLXNoYWRvdyBvciBvdGhlciBlZmZlY3RzICovXG4gIGZpbHRlcjogZHJvcC1zaGFkb3coMXB4IDJweCAycHggcmdiYSgwLCAwLCAwLCAxKSk7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xufVxuXG4ubG9nby1zdHlsZSB7XG4gIG1heC13aWR0aDogMTg1cHg7XG4gIG1heC1oZWlnaHQ6IDE0NXB4O1xufVxuXG4ubW9vZC1zZWxlY3Rvci1jb250YWluZXIge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogLTU2cHg7IC8qIEFkanVzdCBiYXNlZCBvbiBkZXNpcmVkIHBsYWNlbWVudCAqL1xuICBsZWZ0OiAwO1xuICByaWdodDogMDtcbiAgbWFyZ2luOiBhdXRvO1xuICB3aWR0aDogZml0LWNvbnRlbnQ7XG4gIHotaW5kZXg6IDEwO1xufVxuXG4uZHJhdy1jbGFzcy1zdHlsZSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICRwcmltYXJ5O1xuICBjb2xvcjogd2hpdGU7XG4gIHRleHQtc2hhZG93OiAxcHggMXB4IDFweCBibGFjaztcbn1cbjwvc3R5bGU+XG4iXSwibmFtZXMiOlsic2l6ZSIsInRyaWdnZXIiLCJzdG9wIiwib2Zmc2V0IiwiY3NzIiwicG9zaXRpb24iLCJoZWlnaHQiLCJ3aWR0aCIsInVwZGF0ZSIsIm9uS2V5dXAiLCJoYW5kbGVycyIsImgiLCJlbCIsIm9wdGlvbkluZGV4IiwiYXR0cnMiLCJfc2ZjX21haW4iLCJfaG9pc3RlZF8xIiwiX29wZW5CbG9jayIsIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfY3JlYXRlVk5vZGUiLCJfY3JlYXRlQmxvY2siLCJfd2l0aEN0eCIsIl9ub3JtYWxpemVDbGFzcyIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiXSwibWFwcGluZ3MiOiI7O0FBS0EsTUFBQSxnQkFBZSxnQkFBZ0I7QUFBQSxFQUM3QixNQUFNO0FBQUEsRUFFTixPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsRUFDVDtBQUFBLEVBRUQsTUFBTyxPQUFPLEVBQUUsU0FBUztBQUN2QixVQUFNLFVBQVU7QUFBQSxNQUFTLE1BQ3ZCLCtCQUNHLE1BQU0sV0FBVyxPQUFPLGdCQUFnQjtBQUFBLElBQ2pEO0FBRUksV0FBTyxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sUUFBUSxTQUFTLE1BQU0sTUFBTSxPQUFPLENBQUM7QUFBQSxFQUN4RTtBQUNBLENBQUM7QUNmRCxNQUFBLFdBQWUsZ0JBQWdCO0FBQUEsRUFDN0IsTUFBTTtBQUFBLEVBRU4sT0FBTztBQUFBLElBQ0wsT0FBTztBQUFBLEVBQ1I7QUFBQSxFQUVELE1BQU8sT0FBTyxFQUFFLFNBQVM7QUFDdkIsVUFBTSxVQUFVO0FBQUEsTUFBUyxNQUN2Qix3Q0FDRyxNQUFNLFVBQVUsT0FBTyxzQkFBc0I7QUFBQSxJQUN0RDtBQUVJLFdBQU8sTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLFFBQVEsT0FBTyxNQUFNLFVBQVcsR0FBRSxNQUFNLE1BQU0sT0FBTyxDQUFDO0FBQUEsRUFDekY7QUFDQSxDQUFDO0FDZmMsU0FBQSxlQUFZO0FBQ3pCLFFBQU0sYUFBYSxJQUFJLENBQUMseUJBQXlCLEtBQUs7QUFFdEQsTUFBSSxXQUFXLFVBQVUsT0FBTztBQUM5QixjQUFVLE1BQU07QUFDZCxpQkFBVyxRQUFRO0FBQUEsSUFDcEIsQ0FBQTtBQUFBLEVBQ0w7QUFFRSxTQUFPLEVBQUUsV0FBVTtBQUNyQjtBQ1JBLE1BQU0sY0FBYyxPQUFPLG1CQUFtQjtBQUM5QyxNQUFNLGNBQWMsZ0JBQWdCLE9BQ2hDLEtBQ0E7QUFBQSxFQUNFLE9BQU87QUFBQSxFQUNQLEtBQUs7QUFDUDtBQUVKLE1BQUEsa0JBQWUsZ0JBQWdCO0FBQUEsRUFDN0IsTUFBTTtBQUFBLEVBRU4sT0FBTztBQUFBLElBQ0wsVUFBVTtBQUFBLE1BQ1IsTUFBTSxDQUFFLFFBQVEsTUFBTztBQUFBLE1BQ3ZCLFNBQVM7QUFBQSxJQUFBO0FBQUEsRUFFYjtBQUFBLEVBRUEsT0FBTyxDQUFFLFFBQVM7QUFBQSxFQUVsQixNQUFPLE9BQU8sRUFBRSxRQUFRO0FBR2xCLFFBQUEsUUFBUSxNQUFNLFVBQVVBLFFBQU8sRUFBRSxPQUFPLElBQUksUUFBUSxHQUFHO0FBRTNELGFBQVNDLFNBQVMsYUFBYTtBQUM3QixVQUFJLGdCQUFnQixRQUFRLE1BQU0sYUFBYSxLQUFLLE1BQU0sYUFBYSxLQUFLO0FBQ2hFLGtCQUFBO0FBQUEsTUFBQSxXQUVILFVBQVUsTUFBTTtBQUNmLGdCQUFBLFdBQVcsV0FBVyxNQUFNLFFBQVE7QUFBQSxNQUFBO0FBQUEsSUFDOUM7QUFHRixhQUFTLFlBQWE7QUFDcEIsVUFBSSxVQUFVLE1BQU07QUFDbEIscUJBQWEsS0FBSztBQUNWLGdCQUFBO0FBQUEsTUFBQTtBQUdWLFVBQUksVUFBVTtBQUNaLGNBQU0sRUFBRSxhQUFhLE9BQU8sY0FBYyxPQUFXLElBQUE7QUFFckQsWUFBSSxVQUFVRCxNQUFLLFNBQVMsV0FBV0EsTUFBSyxRQUFRO0FBQzNDLFVBQUFBLFFBQUEsRUFBRSxPQUFPLE9BQU87QUFDdkIsZUFBSyxVQUFVQSxLQUFJO0FBQUEsUUFBQTtBQUFBLE1BQ3JCO0FBQUEsSUFDRjtBQUdJLFVBQUEsRUFBRSxNQUFNLElBQUksbUJBQW1CO0FBR3JDLFVBQU0sVUFBVUM7QUFFaEIsUUFBSSxnQkFBZ0IsTUFBTTtBQUNwQixVQUFBO0FBR0osWUFBTSxPQUFPLENBQVFDLFVBQUE7QUFDbkIsbUJBQVcsTUFBTSxJQUFJO0FBRXJCLFlBQUksVUFBVTtBQUNELHFCQUFBLElBQUksZUFBZUQsUUFBTztBQUNyQyxtQkFBUyxRQUFRLFFBQVE7QUFDZixvQkFBQTtBQUFBLFFBQUEsV0FFSEMsVUFBUyxNQUFNO0FBQ3RCLG1CQUFTLE1BQU07QUFBRSxpQkFBSyxJQUFJO0FBQUEsVUFBQSxDQUFHO0FBQUEsUUFBQTtBQUFBLE1BRWpDO0FBRUEsZ0JBQVUsTUFBTTtBQUFPLGFBQUE7QUFBQSxNQUFBLENBQUc7QUFFMUIsc0JBQWdCLE1BQU07QUFDVixrQkFBQSxRQUFRLGFBQWEsS0FBSztBQUVwQyxZQUFJLGFBQWEsUUFBUTtBQUNuQixjQUFBLFNBQVMsZUFBZSxRQUFRO0FBQ2xDLHFCQUFTLFdBQVc7QUFBQSxxQkFFYixVQUFVO0FBQ2pCLHFCQUFTLFVBQVUsUUFBUTtBQUFBLFVBQUE7QUFBQSxRQUM3QjtBQUFBLE1BQ0YsQ0FDRDtBQUVNLGFBQUE7QUFBQSxJQUFBLE9BRUo7QUFLSCxVQUFTLFVBQVQsV0FBb0I7QUFDbEIsWUFBSSxVQUFVLE1BQU07QUFDbEIsdUJBQWEsS0FBSztBQUNWLGtCQUFBO0FBQUEsUUFBQTtBQUdWLFlBQUksZUFBZSxRQUFRO0FBRXJCLGNBQUEsV0FBVyx3QkFBd0IsUUFBUTtBQUM3Qyx1QkFBVyxvQkFBb0IsVUFBVUQsVUFBUyxXQUFXLE9BQU87QUFBQSxVQUFBO0FBRXpELHVCQUFBO0FBQUEsUUFBQTtBQUFBLE1BRWpCLEdBRVMsWUFBVCxXQUFzQjtBQUNaLGdCQUFBO0FBRVIsWUFBSSxVQUFVLGlCQUFpQjtBQUM3Qix1QkFBYSxTQUFTLGdCQUFnQjtBQUN0QyxxQkFBVyxpQkFBaUIsVUFBVUEsVUFBUyxXQUFXLE9BQU87QUFDdkQsb0JBQUE7QUFBQSxRQUFBO0FBQUEsTUFFZDtBQTNCTSxZQUFBLEVBQUUsV0FBVyxJQUFJLGFBQWE7QUFFaEMsVUFBQTtBQTJCSixnQkFBVSxNQUFNO0FBQ2QsaUJBQVMsTUFBTTtBQUNiLHFCQUFXLE1BQU07QUFDakIsc0JBQVksVUFBVTtBQUFBLFFBQUEsQ0FDdkI7QUFBQSxNQUFBLENBQ0Y7QUFFRCxzQkFBZ0IsT0FBTztBQUV2QixhQUFPLE1BQU07QUFDUCxZQUFBLFdBQVcsVUFBVSxNQUFNO0FBQzdCLGlCQUFPLEVBQUUsVUFBVTtBQUFBLFlBQ2pCLE9BQU87QUFBQSxZQUNQLE9BQU8sWUFBWTtBQUFBLFlBQ25CLFVBQVU7QUFBQTtBQUFBLFlBQ1YsTUFBTTtBQUFBLFlBQ04sTUFBTSxZQUFZO0FBQUEsWUFDbEIsZUFBZTtBQUFBLFlBQ2YsUUFBUTtBQUFBLFVBQUEsQ0FDVDtBQUFBLFFBQUE7QUFBQSxNQUVMO0FBQUEsSUFBQTtBQUFBLEVBQ0Y7QUFFSixDQUFDO0FDNUlELE1BQUEsVUFBZSxnQkFBZ0I7QUFBQSxFQUM3QixNQUFNO0FBQUEsRUFFTixPQUFPO0FBQUEsSUFDTCxZQUFZO0FBQUEsTUFDVixNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsSUFDVjtBQUFBLElBQ0QsUUFBUTtBQUFBLElBQ1IsVUFBVTtBQUFBLElBQ1YsVUFBVTtBQUFBLElBRVYsWUFBWTtBQUFBLE1BQ1YsTUFBTSxDQUFFLFFBQVEsTUFBUTtBQUFBLE1BQ3hCLFNBQVM7QUFBQSxJQUNmO0FBQUEsRUFDRztBQUFBLEVBRUQsT0FBTyxDQUFFLFVBQVUsU0FBVztBQUFBLEVBRTlCLE1BQU8sT0FBTyxFQUFFLE9BQU8sS0FBSSxHQUFJO0FBQzdCLFVBQU0sRUFBRSxPQUFPLEVBQUUsR0FBRSxFQUFJLElBQUcsbUJBQWtCO0FBRTVDLFVBQU0sVUFBVSxPQUFPLFdBQVcsYUFBYTtBQUMvQyxRQUFJLFlBQVksZUFBZTtBQUM3QixjQUFRLE1BQU0sc0NBQXNDO0FBQ3BELGFBQU87QUFBQSxJQUNiO0FBRUksVUFBTUQsUUFBTyxJQUFJLFNBQVMsTUFBTSxZQUFZLEVBQUUsQ0FBQztBQUMvQyxVQUFNLFdBQVcsSUFBSSxJQUFJO0FBQ3pCLFVBQU0sZUFBZTtBQUFBLE1BQ25CLHlCQUF5QixVQUFVLFFBQVEsUUFBUSxZQUFZLFVBQVUsT0FDckUsSUFDQSxPQUFPO0FBQUEsSUFDakI7QUFFSSxVQUFNLFFBQVE7QUFBQSxNQUFTLE1BQ3JCLE1BQU0sV0FBVyxRQUNkLFFBQVEsS0FBSyxNQUFNLFFBQVEsR0FBRyxNQUFNLE1BQ25DLEdBQUcsU0FBUyxHQUFHLE9BQU8sUUFBUSxZQUFZLFVBQVU7QUFBQSxJQUM5RDtBQUVJLFVBQU0sa0JBQWtCLFNBQVMsTUFDL0IsUUFBUSxZQUFZLFVBQVUsT0FDMUIsUUFBUSxnQkFBZ0IsUUFDeEIsYUFBYSxLQUNsQjtBQUVELFVBQU0sU0FBUyxTQUFTLE1BQU07QUFDNUIsVUFBSSxNQUFNLGVBQWUsTUFBTTtBQUM3QixlQUFPO0FBQUEsTUFDZjtBQUNNLFVBQUksTUFBTSxVQUFVLE1BQU07QUFDeEIsZUFBTyxTQUFTLFVBQVUsT0FBT0EsTUFBSyxRQUFRO0FBQUEsTUFDdEQ7QUFDTSxZQUFNRyxVQUFTLFFBQVEsT0FBTyxNQUFNLFdBQVcsZ0JBQWdCLFFBQVFILE1BQUssUUFBUSxRQUFRLE9BQU87QUFDbkcsYUFBT0csVUFBUyxJQUFJQSxVQUFTO0FBQUEsSUFDOUIsQ0FBQTtBQUVELFVBQU0sU0FBUztBQUFBLE1BQVMsTUFDdEIsTUFBTSxlQUFlLFFBQVMsTUFBTSxVQUFVLFFBQVEsU0FBUyxVQUFVO0FBQUEsSUFDL0U7QUFFSSxVQUFNLGdCQUFnQjtBQUFBLE1BQVMsTUFDN0IsTUFBTSxlQUFlLFFBQVEsT0FBTyxVQUFVLFFBQVEsTUFBTSxXQUFXO0FBQUEsSUFDN0U7QUFFSSxVQUFNLFVBQVU7QUFBQSxNQUFTLE1BQ3ZCLDJDQUNHLE1BQU0sVUFBVSxPQUFPLFVBQVUsY0FBYyxhQUMvQyxNQUFNLGFBQWEsT0FBTyx3QkFBd0IsT0FDbEQsT0FBTyxVQUFVLE9BQU8sc0JBQXNCLE9BRS9DLE1BQU0sZUFBZSxPQUNqQiw4QkFBOEIsTUFBTSxVQUFVLE9BQU8sWUFBWSxNQUNqRTtBQUFBLElBRVo7QUFFSSxVQUFNLFFBQVEsU0FBUyxNQUFNO0FBQzNCLFlBQ0UsT0FBTyxRQUFRLEtBQUssTUFBTSxRQUMxQkMsT0FBTSxDQUFBO0FBRVIsVUFBSSxLQUFNLE9BQVEsT0FBTyxRQUFRLEtBQUssVUFBVSxNQUFNO0FBQ3BELFFBQUFBLEtBQUssR0FBRyxLQUFLLFFBQVEsT0FBTyxVQUFVLE1BQU0sSUFBSyxHQUFJLFFBQVEsS0FBSyxJQUFJO0FBQUEsTUFDOUU7QUFDTSxVQUFJLEtBQU0sT0FBUSxPQUFPLFFBQVEsTUFBTSxVQUFVLE1BQU07QUFDckQsUUFBQUEsS0FBSyxHQUFHLEtBQUssUUFBUSxPQUFPLFNBQVMsT0FBTyxJQUFLLEdBQUksUUFBUSxNQUFNLElBQUk7QUFBQSxNQUMvRTtBQUVNLGFBQU9BO0FBQUEsSUFDUixDQUFBO0FBRUQsYUFBUyxhQUFjLE1BQU0sS0FBSztBQUNoQyxjQUFRLE9BQU8sVUFBVSxNQUFNLEdBQUc7QUFBQSxJQUN4QztBQUVJLGFBQVMsWUFBYSxNQUFNLEtBQUs7QUFDL0IsVUFBSSxLQUFLLFVBQVUsS0FBSztBQUN0QixhQUFLLFFBQVE7QUFBQSxNQUNyQjtBQUFBLElBQ0E7QUFFSSxhQUFTLFNBQVUsRUFBRSxVQUFVO0FBQzdCLGtCQUFZSixPQUFNLE1BQU07QUFDeEIsbUJBQWEsUUFBUSxNQUFNO0FBQUEsSUFDakM7QUFFSSxhQUFTLGlCQUFrQjtBQUN6QixVQUFJLE1BQU0sV0FBVyxLQUFNO0FBRTNCLFlBQU0sRUFBRSxXQUFXLFVBQUFLLFdBQVUsZ0JBQWUsSUFBSyxRQUFRLE9BQU87QUFFaEUsa0JBQVksVUFDVixjQUFjLFFBQ1hBLFlBQVcsa0JBQWtCLE9BQzdCLFFBQVEsT0FBTyxRQUFRLGdCQUFnQixRQUFRQSxZQUFXTCxNQUFLLFFBQVEsR0FDbEY7QUFBQSxJQUNBO0FBRUksYUFBUyxVQUFXLEtBQUs7QUFDdkIsVUFBSSxjQUFjLFVBQVUsTUFBTTtBQUNoQyxvQkFBWSxVQUFVLElBQUk7QUFBQSxNQUNsQztBQUVNLFdBQUssV0FBVyxHQUFHO0FBQUEsSUFDekI7QUFFSSxVQUFNLE1BQU0sTUFBTSxZQUFZLFNBQU87QUFDbkMsbUJBQWEsU0FBUyxHQUFHO0FBQ3pCLGtCQUFZLFVBQVUsSUFBSTtBQUMxQixjQUFRLFFBQU87QUFBQSxJQUNoQixDQUFBO0FBRUQsVUFBTSxRQUFRLFNBQU87QUFDbkIsbUJBQWEsVUFBVSxHQUFHO0FBQUEsSUFDM0IsQ0FBQTtBQUVELFVBQU0sTUFBTSxNQUFNLFFBQVEsU0FBTztBQUMvQixjQUFRLFNBQVMsWUFBWSxVQUFVLE1BQU0sVUFBVTtBQUFBLElBQ3hELENBQUE7QUFFRCxVQUFNLFVBQVUsU0FBTztBQUNyQixjQUFRLFFBQU87QUFDZixXQUFLLFVBQVUsR0FBRztBQUFBLElBQ25CLENBQUE7QUFFRCxVQUFNLENBQUVBLE9BQU0sUUFBUSxRQUFRLFFBQVEsTUFBTSxHQUFJLGNBQWM7QUFFOUQsVUFBTSxNQUFNLEdBQUcsT0FBTyxRQUFRLFNBQU87QUFDbkMsY0FBUSxZQUFZLFVBQVUsUUFBUSxZQUFZLGNBQWMsR0FBRztBQUFBLElBQ3BFLENBQUE7QUFFRCxVQUFNLFdBQVcsQ0FBQTtBQUVqQixZQUFRLFVBQVUsU0FBUztBQUMzQixVQUFNLGVBQWUsUUFBUSxhQUFhLFFBQVFBLE1BQUssS0FBSztBQUM1RCxpQkFBYSxTQUFTLE1BQU0sVUFBVTtBQUN0QyxpQkFBYSxVQUFVLE9BQU8sS0FBSztBQUVuQyxvQkFBZ0IsTUFBTTtBQUNwQixVQUFJLFFBQVEsVUFBVSxXQUFXLFVBQVU7QUFDekMsZ0JBQVEsVUFBVSxTQUFTO0FBQzNCLHFCQUFhLFFBQVEsQ0FBQztBQUN0QixxQkFBYSxVQUFVLENBQUM7QUFDeEIscUJBQWEsU0FBUyxLQUFLO0FBQUEsTUFDbkM7QUFBQSxJQUNLLENBQUE7QUFFRCxXQUFPLE1BQU07QUFDWCxZQUFNLFFBQVEsV0FBVyxNQUFNLFNBQVM7QUFBQSxRQUN0QyxFQUFFLGlCQUFpQjtBQUFBLFVBQ2pCLFVBQVU7QUFBQSxVQUNWO0FBQUEsUUFDRCxDQUFBO0FBQUEsTUFDRixDQUFBO0FBRUQsWUFBTSxhQUFhLFFBQVEsTUFBTTtBQUFBLFFBQy9CLEVBQUUsT0FBTztBQUFBLFVBQ1AsT0FBTztBQUFBLFFBQ1IsQ0FBQTtBQUFBLE1BQ1Q7QUFFTSxhQUFPLEVBQUUsVUFBVTtBQUFBLFFBQ2pCLE9BQU8sUUFBUTtBQUFBLFFBQ2YsT0FBTyxNQUFNO0FBQUEsUUFDYjtBQUFBLE1BQ1IsR0FBUyxLQUFLO0FBQUEsSUFDZDtBQUFBLEVBQ0E7QUFDQSxDQUFDO0FDcE1ELE1BQUEsaUJBQWUsZ0JBQWdCO0FBQUEsRUFDN0IsTUFBTTtBQUFBLEVBRU4sTUFBTyxHQUFHLEVBQUUsU0FBUztBQUNuQixVQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUUsRUFBSSxJQUFHLG1CQUFrQjtBQUU1QyxVQUFNLFVBQVUsT0FBTyxXQUFXLGFBQWE7QUFDL0MsUUFBSSxZQUFZLGVBQWU7QUFDN0IsY0FBUSxNQUFNLDZDQUE2QztBQUMzRCxhQUFPO0FBQUEsSUFDYjtBQUVJLFlBQVEsa0JBQWtCLElBQUk7QUFFOUIsVUFBTSxRQUFRLFNBQVMsTUFBTTtBQUMzQixZQUFNSSxPQUFNLENBQUE7QUFFWixVQUFJLFFBQVEsT0FBTyxVQUFVLE1BQU07QUFDakMsUUFBQUEsS0FBSSxhQUFhLEdBQUksUUFBUSxPQUFPLElBQUk7QUFBQSxNQUNoRDtBQUNNLFVBQUksUUFBUSxNQUFNLFVBQVUsTUFBTTtBQUNoQyxRQUFBQSxLQUFLLFVBQVcsR0FBRyxLQUFLLFFBQVEsT0FBTyxTQUFTLE9BQVMsRUFBRyxJQUFHLEdBQUksUUFBUSxNQUFNLElBQUk7QUFBQSxNQUM3RjtBQUNNLFVBQUksUUFBUSxPQUFPLFVBQVUsTUFBTTtBQUNqQyxRQUFBQSxLQUFJLGdCQUFnQixHQUFJLFFBQVEsT0FBTyxJQUFJO0FBQUEsTUFDbkQ7QUFDTSxVQUFJLFFBQVEsS0FBSyxVQUFVLE1BQU07QUFDL0IsUUFBQUEsS0FBSyxVQUFXLEdBQUcsS0FBSyxRQUFRLE9BQU8sVUFBVSxNQUFRLEVBQUcsSUFBRyxHQUFJLFFBQVEsS0FBSyxJQUFJO0FBQUEsTUFDNUY7QUFFTSxhQUFPQTtBQUFBLElBQ1IsQ0FBQTtBQUVELFdBQU8sTUFBTSxFQUFFLE9BQU87QUFBQSxNQUNwQixPQUFPO0FBQUEsTUFDUCxPQUFPLE1BQU07QUFBQSxJQUNuQixHQUFPLE1BQU0sTUFBTSxPQUFPLENBQUM7QUFBQSxFQUMzQjtBQUNBLENBQUM7QUMxQ00sTUFBTSxtQkFFVCxDQUFFLFNBQVMsTUFBTztBQUV0QixNQUFNLGdCQUVGLENBQUUsTUFBTSxVQUFVLFNBQVMsTUFBTSxTQUFTLGtCQUFrQixTQUFTLGVBQWdCO0FBRXpFLFNBQUEsZ0JBQWlCLElBQUksVUFBVTtBQUN6QyxNQUFBLFNBQVMsV0FBVyxRQUFRO0FBRWhDLE1BQUksV0FBVyxRQUFRO0FBQ2pCLFFBQUEsT0FBTyxVQUFVLE9BQU8sTUFBTTtBQUN6QixhQUFBO0FBQUEsSUFBQTtBQUdBLGFBQUEsR0FBRyxRQUFRLGtDQUFrQztBQUFBLEVBQUE7QUFHeEQsU0FBTyxjQUFjLFNBQVMsTUFBTSxJQUNoQyxTQUNBO0FBQ047QUFVTyxTQUFTLDBCQUEyQixjQUFjO0FBQ2hELFNBQUEsaUJBQWlCLFNBQ3BCLE9BQU8sZUFBZSxPQUFPLFdBQVcsU0FBUyxLQUFLLGFBQWEsSUFDbkUsYUFBYTtBQUNuQjtBQUVPLFNBQVMsNEJBQTZCLGNBQWM7QUFDbEQsU0FBQSxpQkFBaUIsU0FDcEIsT0FBTyxlQUFlLE9BQU8sV0FBVyxTQUFTLEtBQUssY0FBYyxJQUNwRSxhQUFhO0FBQ25CO0FBNEVBLElBQUk7QUFDRyxTQUFTLG9CQUFxQjtBQUNuQyxNQUFJLFNBQVMsUUFBVztBQUNmLFdBQUE7QUFBQSxFQUFBO0FBSVAsUUFBQSxRQUFRLFNBQVMsY0FBYyxHQUFHLEdBQ2xDLFFBQVEsU0FBUyxjQUFjLEtBQUs7QUFFdEMsTUFBSSxPQUFPO0FBQUEsSUFDVCxPQUFPO0FBQUEsSUFDUCxRQUFRO0FBQUEsRUFBQSxDQUNUO0FBQ0QsTUFBSSxPQUFPO0FBQUEsSUFDVCxVQUFVO0FBQUEsSUFDVixLQUFLO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixZQUFZO0FBQUEsSUFDWixPQUFPO0FBQUEsSUFDUCxRQUFRO0FBQUEsSUFDUixVQUFVO0FBQUEsRUFBQSxDQUNYO0FBRUQsUUFBTSxZQUFZLEtBQUs7QUFFZCxXQUFBLEtBQUssWUFBWSxLQUFLO0FBRS9CLFFBQU0sS0FBSyxNQUFNO0FBQ2pCLFFBQU0sTUFBTSxXQUFXO0FBQ3ZCLE1BQUksS0FBSyxNQUFNO0FBRWYsTUFBSSxPQUFPLElBQUk7QUFDYixTQUFLLE1BQU07QUFBQSxFQUFBO0FBR2IsUUFBTSxPQUFPO0FBQ2IsU0FBTyxLQUFLO0FBRUwsU0FBQTtBQUNUO0FBRWdCLFNBQUEsYUFBYyxJQUFJLE1BQU0sTUFBTTtBQUM1QyxNQUFJLENBQUMsTUFBTSxHQUFHLGFBQWEsS0FBSyxjQUFjO0FBQ3JDLFdBQUE7QUFBQSxFQUFBO0FBR0YsU0FBQSxNQUVELEdBQUcsZUFBZSxHQUFHLGlCQUNuQixHQUFHLFVBQVUsU0FBUyxRQUFRLEtBQzNCLEdBQUcsVUFBVSxTQUFTLGVBQWUsS0FDckMsQ0FBRSxRQUFRLFFBQVMsRUFBRSxTQUFTLE9BQU8saUJBQWlCLEVBQUUsRUFBRyxZQUFhLENBQUMsS0FJOUUsR0FBRyxjQUFjLEdBQUcsZ0JBQ2xCLEdBQUcsVUFBVSxTQUFTLFFBQVEsS0FDM0IsR0FBRyxVQUFVLFNBQVMsZUFBZSxLQUNyQyxDQUFFLFFBQVEsUUFBUyxFQUFFLFNBQVMsT0FBTyxpQkFBaUIsRUFBRSxFQUFHLFlBQWEsQ0FBQztBQUd0RjtBQ2hMQSxNQUFNLEVBQUUsUUFBTyxJQUFLO0FBQ3BCLE1BQU0sYUFBYSxDQUFFLFFBQVEsY0FBYyxVQUFVO0FBRXJELE1BQUEsa0JBQWUsZ0JBQWdCO0FBQUEsRUFDN0IsTUFBTTtBQUFBLEVBRU4sT0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLE1BQ0osTUFBTTtBQUFBLE1BQ04sV0FBVyxPQUFLLFdBQVcsU0FBUyxDQUFDO0FBQUEsTUFDckMsU0FBUztBQUFBLElBQ1Y7QUFBQSxJQUVELFVBQVUsQ0FBRSxRQUFRLE1BQVE7QUFBQSxJQUU1QixjQUFjO0FBQUEsRUFDZjtBQUFBLEVBRUQsT0FBTyxDQUFFLFFBQVU7QUFBQSxFQUVuQixNQUFPLE9BQU8sRUFBRSxRQUFRO0FBQ3RCLFVBQU0sU0FBUztBQUFBLE1BQ2IsVUFBVTtBQUFBLFFBQ1IsS0FBSztBQUFBLFFBQ0wsTUFBTTtBQUFBLE1BQ1A7QUFBQSxNQUVELFdBQVc7QUFBQSxNQUNYLGtCQUFrQjtBQUFBLE1BRWxCLE9BQU87QUFBQSxRQUNMLEtBQUs7QUFBQSxRQUNMLE1BQU07QUFBQSxNQUNQO0FBQUEsTUFFRCxpQkFBaUI7QUFBQSxRQUNmLEtBQUs7QUFBQSxRQUNMLE1BQU07QUFBQSxNQUNkO0FBQUEsSUFDQTtBQUVJLFFBQUksYUFBYSxNQUFNLG1CQUFtQjtBQUUxQyxVQUFNLE1BQU0sTUFBTSxjQUFjLE1BQU07QUFDcEMsOEJBQXVCO0FBQ3ZCLDRCQUFxQjtBQUFBLElBQ3RCLENBQUE7QUFFRCxhQUFTLFlBQWE7QUFDcEIsbUJBQVU7QUFFVixZQUFNLE1BQU0sS0FBSyxJQUFJLEdBQUcsMEJBQTBCLGlCQUFpQixDQUFDO0FBQ3BFLFlBQU0sT0FBTyw0QkFBNEIsaUJBQWlCO0FBRTFELFlBQU0sUUFBUTtBQUFBLFFBQ1osS0FBSyxNQUFNLE9BQU8sU0FBUztBQUFBLFFBQzNCLE1BQU0sT0FBTyxPQUFPLFNBQVM7QUFBQSxNQUNyQztBQUVNLFVBQ0csTUFBTSxTQUFTLGNBQWMsTUFBTSxRQUFRLEtBQ3hDLE1BQU0sU0FBUyxnQkFBZ0IsTUFBTSxTQUFTLEVBQ2xEO0FBRUYsWUFBTSxTQUFTLEtBQUssSUFBSSxNQUFNLEdBQUcsS0FBSyxLQUFLLElBQUksTUFBTSxJQUFJLElBQ3BELE1BQU0sTUFBTSxJQUFJLE9BQU8sU0FDdkIsTUFBTSxPQUFPLElBQUksU0FBUztBQUUvQixhQUFPLFdBQVcsRUFBRSxLQUFLLEtBQUk7QUFDN0IsYUFBTyxtQkFBbUIsT0FBTyxjQUFjO0FBQy9DLGFBQU8sUUFBUTtBQUVmLFVBQUksT0FBTyxxQkFBcUIsTUFBTTtBQUNwQyxlQUFPLFlBQVk7QUFDbkIsZUFBTyxrQkFBa0IsT0FBTztBQUFBLE1BQ3hDO0FBRU0sV0FBSyxVQUFVLEVBQUUsR0FBRyxPQUFRLENBQUE7QUFBQSxJQUNsQztBQUVJLGFBQVMsd0JBQXlCO0FBQ2hDLDBCQUFvQixnQkFBZ0IsVUFBVSxNQUFNLFlBQVk7QUFDaEUsd0JBQWtCLGlCQUFpQixVQUFVSCxVQUFTLE9BQU87QUFDN0QsTUFBQUEsU0FBUSxJQUFJO0FBQUEsSUFDbEI7QUFFSSxhQUFTLDBCQUEyQjtBQUNsQyxVQUFJLHNCQUFzQixRQUFRO0FBQ2hDLDBCQUFrQixvQkFBb0IsVUFBVUEsVUFBUyxPQUFPO0FBQ2hFLDRCQUFvQjtBQUFBLE1BQzVCO0FBQUEsSUFDQTtBQUVJLGFBQVNBLFNBQVMsYUFBYTtBQUM3QixVQUFJLGdCQUFnQixRQUFRLE1BQU0sYUFBYSxLQUFLLE1BQU0sYUFBYSxLQUFLO0FBQzFFLGtCQUFTO0FBQUEsTUFDakIsV0FDZSxlQUFlLE1BQU07QUFDNUIsY0FBTSxDQUFFLE9BQU8sRUFBSSxJQUFHLE1BQU0sV0FDeEIsQ0FBRSxXQUFXLFdBQVcsTUFBTSxRQUFRLEdBQUcsWUFBWSxJQUNyRCxDQUFFLHNCQUFzQixTQUFTLEdBQUcsb0JBQW9CO0FBRTVELHFCQUFhLE1BQU07QUFDakIsYUFBRyxLQUFLO0FBQ1IsdUJBQWE7QUFBQSxRQUN2QjtBQUFBLE1BQ0E7QUFBQSxJQUNBO0FBRUksVUFBTSxFQUFFLE1BQUssSUFBSyxtQkFBa0I7QUFFcEMsVUFBTSxNQUFNLE1BQU0sR0FBRyxLQUFLLEtBQUssU0FBUztBQUV4QyxjQUFVLE1BQU07QUFDZCxpQkFBVyxNQUFNLElBQUk7QUFDckIsNEJBQXFCO0FBQUEsSUFDdEIsQ0FBQTtBQUVELG9CQUFnQixNQUFNO0FBQ3BCLG1CQUFVO0FBQ1YsOEJBQXVCO0FBQUEsSUFDeEIsQ0FBQTtBQUdELFdBQU8sT0FBTyxPQUFPO0FBQUEsTUFDbkIsU0FBQUE7QUFBQSxNQUNBLGFBQWEsTUFBTTtBQUFBLElBQ3BCLENBQUE7QUFFRCxXQUFPO0FBQUEsRUFDWDtBQUNBLENBQUM7QUM3SEQsTUFBQSxVQUFlLGdCQUFnQjtBQUFBLEVBQzdCLE1BQU07QUFBQSxFQUVOLE9BQU87QUFBQSxJQUNMLFdBQVc7QUFBQSxJQUNYLE1BQU07QUFBQSxNQUNKLE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxNQUNULFdBQVcsQ0FBSyxNQUFBLGdDQUFnQyxLQUFLLEVBQUUsWUFBYSxDQUFBO0FBQUEsSUFDdEU7QUFBQSxJQUVBLFVBQVU7QUFBQSxJQUNWLGdCQUFnQjtBQUFBLElBQ2hCLFVBQVU7QUFBQSxFQUNaO0FBQUEsRUFFQSxNQUFPLE9BQU8sRUFBRSxPQUFPLFFBQVE7QUFDN0IsVUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUEsSUFBTSxtQkFBbUI7QUFFdkMsVUFBQSxVQUFVLElBQUksSUFBSTtBQUd4QixVQUFNLFNBQVMsSUFBSSxHQUFHLE9BQU8sTUFBTTtBQUM3QixVQUFBLFFBQVEsSUFBSSxNQUFNLGNBQWMsT0FBTyxJQUFJLEdBQUcsT0FBTyxLQUFLO0FBQzFELFVBQUEsU0FBUyxJQUFJLEVBQUUsVUFBVSxHQUFHLFdBQVcsUUFBUSxpQkFBaUIsR0FBRztBQUduRSxVQUFBLGtCQUFrQixJQUFJLENBQUM7QUFDN0IsVUFBTSxpQkFBaUIsSUFBSSx5QkFBeUIsVUFBVSxPQUFPLElBQUksbUJBQW1CO0FBRTVGLFVBQU0sVUFBVTtBQUFBLE1BQVMsTUFDdkIseUJBQ0csTUFBTSxjQUFjLE9BQU8sa0JBQWtCO0FBQUEsSUFDbEQ7QUFFQSxVQUFNLFFBQVEsU0FBUyxNQUNyQixNQUFNLGNBQWMsUUFDaEIsRUFBRSxXQUFXLEdBQUcsT0FBTyxTQUFTLEtBQUEsSUFDaEMsSUFDTDtBQUdLLFVBQUEsY0FBYyxTQUFTLE1BQzNCLGVBQWUsVUFBVSxJQUNyQixFQUFFLENBQUUsR0FBRyxLQUFLLFFBQVEsT0FBTyxTQUFTLE9BQVEsR0FBRyxHQUFJLGVBQWUsS0FBTSxTQUN4RSxJQUNMO0FBRUQsVUFBTSxtQkFBbUIsU0FBUyxNQUNoQyxlQUFlLFVBQVUsSUFDckI7QUFBQSxNQUNFLENBQUUsR0FBRyxLQUFLLFFBQVEsT0FBTyxVQUFVLE1BQU8sR0FBRztBQUFBLE1BQzdDLENBQUUsR0FBRyxLQUFLLFFBQVEsT0FBTyxTQUFTLE9BQVEsR0FBRyxJQUFLLGVBQWUsS0FBTTtBQUFBLE1BQ3ZFLE9BQU8sZUFBZ0IsZUFBZSxLQUFNO0FBQUEsUUFFOUMsSUFDTDtBQUVELGFBQVMsYUFBYyxNQUFNO0FBQzNCLFVBQUksTUFBTSxjQUFjLFFBQVEsU0FBUyxxQkFBcUIsTUFBTTtBQUNsRSxjQUFNLE9BQU87QUFBQSxVQUNYLFVBQVUsS0FBSyxTQUFTO0FBQUEsVUFDeEIsV0FBVyxLQUFLO0FBQUEsVUFDaEIsa0JBQWtCLEtBQUs7QUFBQSxVQUN2QixpQkFBaUIsS0FBSyxnQkFBZ0I7QUFBQSxVQUN0QyxPQUFPLEtBQUssTUFBTTtBQUFBLFFBQ3BCO0FBRUEsZUFBTyxRQUFRO0FBQ2YsY0FBTSxhQUFhLFVBQVUsS0FBSyxVQUFVLElBQUk7QUFBQSxNQUFBO0FBQUEsSUFDbEQ7QUFHRixhQUFTLGFBQWMsTUFBTTtBQUMzQixZQUFNLEVBQUUsUUFBUSxXQUFXLE9BQU8sU0FBYSxJQUFBO0FBQy9DLFVBQUksVUFBVTtBQUVWLFVBQUEsT0FBTyxVQUFVLFdBQVc7QUFDcEIsa0JBQUE7QUFDVixlQUFPLFFBQVE7QUFDZixjQUFNLG1CQUFtQixVQUFVLEtBQUssZ0JBQWdCLFNBQVM7QUFDNUMsNkJBQUE7QUFBQSxNQUFBO0FBRW5CLFVBQUEsTUFBTSxVQUFVLFVBQVU7QUFDbEIsa0JBQUE7QUFDVixjQUFNLFFBQVE7QUFBQSxNQUFBO0FBR2hCLFVBQUksWUFBWSxRQUFRLE1BQU0sYUFBYSxRQUFRO0FBQ2pELGFBQUssVUFBVSxJQUFJO0FBQUEsTUFBQTtBQUFBLElBQ3JCO0FBR0YsYUFBUyxrQkFBbUIsRUFBRSxRQUFBSyxXQUFVO0FBQ2xDLFVBQUEsZ0JBQWdCLFVBQVVBLFNBQVE7QUFDcEMsd0JBQWdCLFFBQVFBO0FBQ0gsNkJBQUE7QUFBQSxNQUFBO0FBQUEsSUFDdkI7QUFHRixhQUFTLHVCQUF3QjtBQUMzQixVQUFBLE1BQU0sY0FBYyxNQUFNO0FBQzVCLGNBQU1DLFNBQVEsT0FBTyxRQUFRLGdCQUFnQixRQUN6QyxzQkFDQTtBQUVBLFlBQUEsZUFBZSxVQUFVQSxRQUFPO0FBQ2xDLHlCQUFlLFFBQVFBO0FBQUFBLFFBQUE7QUFBQSxNQUN6QjtBQUFBLElBQ0Y7QUFHRixRQUFJLGVBQWU7QUFFbkIsVUFBTSxVQUFVO0FBQUEsTUFDZCxXQUFXLENBQUM7QUFBQSxNQUNaLE1BQU0sU0FBUyxNQUFNLE1BQU0sSUFBSTtBQUFBLE1BQy9CLGFBQWEsU0FBUyxNQUFNLE1BQU0sU0FBUztBQUFBLE1BRTNDO0FBQUEsTUFFQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQSxZQUFZLFNBQVMsTUFBTSxNQUFNLFFBQVEsZUFBZSxLQUFLO0FBQUEsTUFFN0QsTUFBTSxTQUFTLE1BQU07QUFDbkIsY0FBTSxPQUFPLE1BQU0sS0FBSyxZQUFZLEVBQUUsTUFBTSxHQUFHO0FBQ3hDLGVBQUE7QUFBQSxVQUNMLEtBQUssS0FBTSxDQUFFLEVBQUUsTUFBTSxFQUFFO0FBQUEsVUFDdkIsUUFBUSxLQUFNLENBQUUsRUFBRSxNQUFNLEVBQUU7QUFBQSxVQUMxQixRQUFRLEtBQU0sQ0FBRSxFQUFFLE1BQU0sRUFBRTtBQUFBLFFBQzVCO0FBQUEsTUFBQSxDQUNEO0FBQUEsTUFFRCxRQUFRLFNBQVMsRUFBRSxNQUFNLEdBQUcsUUFBUSxHQUFHLE9BQU8sT0FBTztBQUFBLE1BQ3JELE9BQU8sU0FBUyxFQUFFLE1BQU0sS0FBSyxRQUFRLEdBQUcsT0FBTyxPQUFPO0FBQUEsTUFDdEQsUUFBUSxTQUFTLEVBQUUsTUFBTSxHQUFHLFFBQVEsR0FBRyxPQUFPLE9BQU87QUFBQSxNQUNyRCxNQUFNLFNBQVMsRUFBRSxNQUFNLEtBQUssUUFBUSxHQUFHLE9BQU8sT0FBTztBQUFBLE1BRXJEO0FBQUEsTUFFQSxVQUFXO0FBQ1QsWUFBSSxpQkFBaUIsTUFBTTtBQUN6Qix1QkFBYSxZQUFZO0FBQUEsUUFBQSxPQUV0QjtBQUNNLG1CQUFBLEtBQUssVUFBVSxJQUFJLHdCQUF3QjtBQUFBLFFBQUE7QUFHdEQsdUJBQWUsV0FBVyxNQUFNO0FBQ2YseUJBQUE7QUFDTixtQkFBQSxLQUFLLFVBQVUsT0FBTyx3QkFBd0I7QUFBQSxXQUN0RCxHQUFHO0FBQUEsTUFDUjtBQUFBLE1BRUEsT0FBUSxNQUFNLE1BQU0sS0FBSztBQUNkLGdCQUFBLElBQUssRUFBRyxJQUFLLElBQUk7QUFBQSxNQUFBO0FBQUEsSUFFOUI7QUFFQSxZQUFRLFdBQVcsT0FBTztBQUlZLFFBQUEsc0JBQXNCLEdBQUc7QUFJN0QsVUFBUyxtQkFBVCxXQUE2QjtBQUNuQixnQkFBQTtBQUNMLFdBQUEsVUFBVSxPQUFPLGdCQUFnQjtBQUFBLE1BQ3RDLEdBRVMsZ0JBQVQsV0FBMEI7QUFDeEIsWUFBSSxVQUFVLE1BQU07QUFFbEIsY0FBSSxHQUFHLGVBQWUsR0FBRyxPQUFPLE9BQVE7QUFFckMsYUFBQSxVQUFVLElBQUksZ0JBQWdCO0FBQUEsUUFBQSxPQUU5QjtBQUNILHVCQUFhLEtBQUs7QUFBQSxRQUFBO0FBR1osZ0JBQUEsV0FBVyxrQkFBa0IsR0FBRztBQUFBLE1BQUEsR0FHakMsb0JBQVQsU0FBNEIsUUFBUTtBQUM5QixZQUFBLFVBQVUsUUFBUSxXQUFXLFVBQVU7QUFDekMsdUJBQWEsS0FBSztBQUNELDJCQUFBO0FBQUEsUUFBQTtBQUduQixlQUFRLEdBQUksTUFBTyxlQUFnQixFQUFFLFVBQVUsYUFBYTtBQUFBLE1BQzlEO0FBN0JBLFVBQUksUUFBUTtBQUNaLFlBQU0sS0FBSyxTQUFTO0FBOEJwQjtBQUFBLFFBQ0UsTUFBTyxNQUFNLGNBQWMsT0FBTyxRQUFRO0FBQUEsUUFDMUM7QUFBQSxNQUNGO0FBRU0sWUFBQSxjQUFjLFFBQVEsa0JBQWtCLEtBQUs7QUFFbkQsa0JBQVksTUFBTTtBQUNoQiwwQkFBa0IsUUFBUTtBQUFBLE1BQUEsQ0FDM0I7QUFBQSxJQUFBO0FBR0gsV0FBTyxNQUFNO0FBQ0wsWUFBQSxVQUFVLFdBQVcsTUFBTSxTQUFTO0FBQUEsUUFDeEMsRUFBRSxpQkFBaUIsRUFBRSxVQUFVLGNBQWM7QUFBQSxRQUM3QyxFQUFFLGlCQUFpQixFQUFFLFVBQVUsYUFBYyxDQUFBO0FBQUEsTUFBQSxDQUM5QztBQUVLLFlBQUEsU0FBUyxFQUFFLE9BQU87QUFBQSxRQUN0QixPQUFPLFFBQVE7QUFBQSxRQUNmLE9BQU8sTUFBTTtBQUFBLFFBQ2IsS0FBSyxNQUFNLGNBQWMsT0FBTyxTQUFTO0FBQUEsUUFDekMsVUFBVTtBQUFBLFNBQ1QsT0FBTztBQUVOLFVBQUEsTUFBTSxjQUFjLE1BQU07QUFDNUIsZUFBTyxFQUFFLE9BQU87QUFBQSxVQUNkLE9BQU87QUFBQSxVQUNQLEtBQUs7QUFBQSxRQUFBLEdBQ0o7QUFBQSxVQUNELEVBQUUsaUJBQWlCLEVBQUUsVUFBVSxtQkFBbUI7QUFBQSxVQUNsRCxFQUFFLE9BQU87QUFBQSxZQUNQLE9BQU87QUFBQSxZQUNQLE9BQU8sWUFBWTtBQUFBLFVBQUEsR0FDbEI7QUFBQSxZQUNELEVBQUUsT0FBTztBQUFBLGNBQ1AsT0FBTztBQUFBLGNBQ1AsT0FBTyxpQkFBaUI7QUFBQSxZQUMxQixHQUFHLENBQUUsTUFBTyxDQUFDO0FBQUEsVUFDZCxDQUFBO0FBQUEsUUFBQSxDQUNGO0FBQUEsTUFBQTtBQUdJLGFBQUE7QUFBQSxJQUNUO0FBQUEsRUFBQTtBQUVKLENBQUM7QUMzUEQsSUFDRSxLQUNBLFNBQVM7QUFDWCxNQUFNLFdBQVcsSUFBSSxNQUFNLEdBQUc7QUFHOUIsU0FBUyxJQUFJLEdBQUcsSUFBSSxLQUFLLEtBQUs7QUFDNUIsV0FBVSxDQUFHLEtBQUksSUFBSSxLQUFPLFNBQVMsRUFBRSxFQUFFLFVBQVUsQ0FBQztBQUN0RDtBQUdBLE1BQU0sZUFBZSxNQUFNO0FBRXpCLFFBQU0sTUFBTSxPQUFPLFdBQVcsY0FDMUIsU0FFRSxPQUFPLFdBQVcsY0FDZCxPQUFPLFVBQVUsT0FBTyxXQUN4QjtBQUdWLE1BQUksUUFBUSxRQUFRO0FBQ2xCLFFBQUksSUFBSSxnQkFBZ0IsUUFBUTtBQUM5QixhQUFPLElBQUk7QUFBQSxJQUNqQjtBQUNJLFFBQUksSUFBSSxvQkFBb0IsUUFBUTtBQUNsQyxhQUFPLE9BQUs7QUFDVixjQUFNLFFBQVEsSUFBSSxXQUFXLENBQUM7QUFDOUIsWUFBSSxnQkFBZ0IsS0FBSztBQUN6QixlQUFPO0FBQUEsTUFDZjtBQUFBLElBQ0E7QUFBQSxFQUNBO0FBRUUsU0FBTyxPQUFLO0FBQ1YsVUFBTSxJQUFJLENBQUE7QUFDVixhQUFTLElBQUksR0FBRyxJQUFJLEdBQUcsS0FBSztBQUMxQixRQUFFLEtBQUssS0FBSyxNQUFNLEtBQUssT0FBUSxJQUFHLEdBQUcsQ0FBQztBQUFBLElBQzVDO0FBQ0ksV0FBTztBQUFBLEVBQ1g7QUFDQSxHQUFDO0FBS0QsTUFBTSxjQUFjO0FBRUwsU0FBQSxNQUFZO0FBRXpCLE1BQUksUUFBUSxVQUFXLFNBQVMsS0FBSyxhQUFjO0FBQ2pELGFBQVM7QUFDVCxVQUFNLFlBQVksV0FBVztBQUFBLEVBQ2pDO0FBRUUsUUFBTSxJQUFJLE1BQU0sVUFBVSxNQUFNLEtBQUssS0FBSyxRQUFTLFVBQVUsRUFBRTtBQUMvRCxJQUFHLENBQUMsSUFBTSxFQUFHLENBQUMsSUFBSyxLQUFRO0FBQzNCLElBQUcsQ0FBQyxJQUFNLEVBQUcsQ0FBQyxJQUFLLEtBQVE7QUFFM0IsU0FBTyxTQUFVLEVBQUcsQ0FBQyxDQUFJLElBQUcsU0FBVSxFQUFHLENBQUcsQ0FBQSxJQUN4QyxTQUFVLEVBQUcsQ0FBRyxDQUFBLElBQUssU0FBVSxFQUFHLENBQUMsS0FBTyxNQUMxQyxTQUFVLEVBQUcsQ0FBRyxDQUFBLElBQUssU0FBVSxFQUFHLENBQUMsS0FBTyxNQUMxQyxTQUFVLEVBQUcsQ0FBRyxDQUFBLElBQUssU0FBVSxFQUFHLENBQUMsS0FBTyxNQUMxQyxTQUFVLEVBQUcsQ0FBRyxDQUFBLElBQUssU0FBVSxFQUFHLENBQUMsS0FBTyxNQUMxQyxTQUFVLEVBQUcsRUFBRSxDQUFJLElBQUcsU0FBVSxFQUFHLEVBQUksQ0FBQSxJQUN2QyxTQUFVLEVBQUcsRUFBRSxDQUFJLElBQUcsU0FBVSxFQUFHLEVBQUksQ0FBQSxJQUN2QyxTQUFVLEVBQUcsRUFBRSxDQUFJLElBQUcsU0FBVSxFQUFHLEVBQUksQ0FBQTtBQUM3QztBQ2pFQSxTQUFTLFdBQVksS0FBSztBQUN4QixTQUFPLFFBQVEsVUFBVSxRQUFRLE9BQzdCLE9BQ0E7QUFDTjtBQUVBLFNBQVMsTUFBTyxLQUFLLFVBQVU7QUFDN0IsU0FBTyxRQUFRLFVBQVUsUUFBUSxPQUM1QixhQUFhLE9BQU8sS0FBTSxJQUFLLENBQUEsS0FBTSxPQUN0QztBQUNOO0FBU2UsU0FBUSxNQUFFLEVBQUUsVUFBVSxXQUFXLEtBQUksSUFBSyxDQUFBLEdBQUk7QUFDM0QsTUFBSSx5QkFBeUIsVUFBVSxNQUFNO0FBQzNDLFVBQU0sS0FBSyxhQUFhLFNBQ3BCLElBQUksV0FBVyxVQUFVLENBQUMsSUFDMUIsSUFBSSxJQUFJO0FBRVosUUFBSSxhQUFhLFFBQVEsR0FBRyxVQUFVLE1BQU07QUFDMUMsZ0JBQVUsTUFBTTtBQUNkLFdBQUcsUUFBUSxLQUFNLElBQUssQ0FBQTtBQUFBLE1BQ3ZCLENBQUE7QUFBQSxJQUNQO0FBRUksUUFBSSxhQUFhLFFBQVE7QUFDdkIsWUFBTSxVQUFVLFdBQVM7QUFDdkIsV0FBRyxRQUFRLE1BQU0sT0FBTyxRQUFRO0FBQUEsTUFDakMsQ0FBQTtBQUFBLElBQ1A7QUFFSSxXQUFPO0FBQUEsRUFDWDtBQUVFLFNBQU8sYUFBYSxTQUNoQixTQUFTLE1BQU0sTUFBTSxTQUFRLEdBQUksUUFBUSxDQUFDLElBQzFDLElBQUksS0FBTSxJQUFHLENBQUksRUFBQztBQUN4QjtBQy9DQSxNQUFNLGFBQWE7QUFFSixTQUFBLGdCQUFZO0FBQ3pCLFFBQU0sRUFBRSxPQUFPLE1BQUssSUFBSyxtQkFBa0I7QUFFM0MsUUFBTSxNQUFNO0FBQUEsSUFDVixXQUFXLElBQUksRUFBRTtBQUFBLElBQ2pCLFlBQVksSUFBSSxDQUFFLENBQUE7QUFBQSxFQUN0QjtBQUVFLFdBQVNDLFVBQVU7QUFDakIsVUFBTSxhQUFhLENBQUE7QUFDbkIsVUFBTSxZQUFZLENBQUE7QUFFbEIsZUFBVyxPQUFPLE9BQU87QUFDdkIsVUFBSSxRQUFRLFdBQVcsUUFBUSxXQUFXLFdBQVcsS0FBSyxHQUFHLE1BQU0sT0FBTztBQUN4RSxtQkFBWSxPQUFRLE1BQU8sR0FBRztBQUFBLE1BQ3RDO0FBQUEsSUFDQTtBQUVJLGVBQVcsT0FBTyxNQUFNLE9BQU87QUFDN0IsVUFBSSxXQUFXLEtBQUssR0FBRyxNQUFNLE1BQU07QUFDakMsa0JBQVcsR0FBRyxJQUFLLE1BQU0sTUFBTyxHQUFHO0FBQUEsTUFDM0M7QUFBQSxJQUNBO0FBRUksUUFBSSxXQUFXLFFBQVE7QUFDdkIsUUFBSSxVQUFVLFFBQVE7QUFBQSxFQUMxQjtBQUVFLGlCQUFlQSxPQUFNO0FBRXJCLEVBQUFBLFFBQU07QUFFTixTQUFPO0FBQ1Q7QUNqQ2UsU0FBUSxhQUFFLEVBQUUsVUFBVSxpQkFBaUIsaUJBQWlCO0FBQ3JFLFFBQU0sUUFBUSxPQUFPLFNBQVMsS0FBSztBQUVuQyxNQUFJLFVBQVUsT0FBTztBQUNuQixVQUFNLEVBQUUsT0FBTyxNQUFLLElBQUssbUJBQWtCO0FBRzNDLFdBQU8sT0FBTyxPQUFPLEVBQUUsVUFBVSxnQkFBaUIsQ0FBQTtBQUVsRCxVQUFNLE1BQU0sTUFBTSxTQUFTLFNBQU87QUFDaEMsVUFBSSxRQUFRLE1BQU07QUFDaEIsZUFBTyxvQkFBb0IsY0FBYyxnQkFBZTtBQUN4RCxjQUFNLGdCQUFnQixLQUFLO0FBQUEsTUFDbkMsT0FDVztBQUNILGNBQU0sY0FBYyxLQUFLO0FBQUEsTUFDakM7QUFBQSxJQUNLLENBQUE7QUFFRCxjQUFVLE1BQU07QUFFZCxZQUFNLFlBQVksUUFBUSxNQUFNLGNBQWMsS0FBSztBQUFBLElBQ3BELENBQUE7QUFFRCxvQkFBZ0IsTUFBTTtBQUVwQixZQUFNLFlBQVksUUFBUSxNQUFNLGdCQUFnQixLQUFLO0FBQUEsSUFDdEQsQ0FBQTtBQUFBLEVBQ0wsV0FDVyxrQkFBa0IsTUFBTTtBQUMvQixZQUFRLE1BQU0sMkNBQTJDO0FBQUEsRUFDN0Q7QUFDQTtBQ2xDQSxNQUNFLE1BQU0sc0NBQ04sT0FBTyxzQ0FDUCxZQUFZLG9FQUNaLE1BQU0seUhBQ04sT0FBTztBQUdGLE1BQU0sY0FBYztBQUFBLEVBQ3pCLE1BQU0sT0FBSyw4QkFBOEIsS0FBSyxDQUFDO0FBQUEsRUFDL0MsTUFBTSxPQUFLLDhCQUE4QixLQUFLLENBQUM7QUFBQSxFQUMvQyxVQUFVLE9BQUssc0NBQXNDLEtBQUssQ0FBQztBQUFBLEVBQzNELGdCQUFnQixPQUFLLHlDQUF5QyxLQUFLLENBQUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQVFwRSxPQUFPLE9BQUsseUpBQXlKLEtBQUssQ0FBQztBQUFBLEVBRTNLLFVBQVUsT0FBSyxJQUFJLEtBQUssQ0FBQztBQUFBLEVBQ3pCLFdBQVcsT0FBSyxLQUFLLEtBQUssQ0FBQztBQUFBLEVBQzNCLGdCQUFnQixPQUFLLFVBQVUsS0FBSyxDQUFDO0FBQUEsRUFFckMsVUFBVSxPQUFLLElBQUksS0FBSyxDQUFDO0FBQUEsRUFDekIsV0FBVyxPQUFLLEtBQUssS0FBSyxDQUFDO0FBQUEsRUFDM0IsZ0JBQWdCLE9BQUssSUFBSSxLQUFLLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQztBQUFBLEVBRS9DLGVBQWUsT0FBSyxJQUFJLEtBQUssQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDO0FBQUEsRUFDN0MsaUJBQWlCLE9BQUssS0FBSyxLQUFLLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQztBQUFBLEVBQ2pELFVBQVUsT0FBSyxVQUFVLEtBQUssQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUM7QUFDaEU7QUM1QkEsTUFBTSxrQkFBa0IsQ0FBRSxNQUFNLE9BQU8sVUFBVTtBQUUxQyxNQUFNLG1CQUFtQjtBQUFBLEVBQzlCLFlBQVksQ0FBRTtBQUFBLEVBRWQsT0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLEVBQ1Y7QUFBQSxFQUNELGNBQWM7QUFBQSxFQUNkLGFBQWE7QUFBQSxFQUViLE9BQU87QUFBQSxFQUNQLGVBQWU7QUFBQSxFQUNmLFdBQVc7QUFBQSxJQUNULE1BQU0sQ0FBRSxTQUFTLE1BQVE7QUFBQSxJQUN6QixTQUFTO0FBQUE7QUFBQSxJQUNULFdBQVcsT0FBSyxnQkFBZ0IsU0FBUyxDQUFDO0FBQUEsRUFDOUM7QUFDQTtBQUVlLFNBQUEsWUFBVSxTQUFTLGNBQWM7QUFDOUMsUUFBTSxFQUFFLE9BQU8sTUFBSyxJQUFLLG1CQUFrQjtBQUUzQyxRQUFNLGFBQWEsSUFBSSxLQUFLO0FBQzVCLFFBQU0sb0JBQW9CLElBQUksSUFBSTtBQUNsQyxRQUFNLGVBQWUsSUFBSSxLQUFLO0FBRTlCLGVBQWEsRUFBRSxVQUFVLGdCQUFpQixDQUFBO0FBRTFDLE1BQUksZ0JBQWdCLEdBQUc7QUFFdkIsUUFBTSxXQUFXO0FBQUEsSUFBUyxNQUN4QixNQUFNLFVBQVUsVUFDYixNQUFNLFVBQVUsUUFDaEIsTUFBTSxNQUFNLFdBQVc7QUFBQSxFQUM5QjtBQUVFLFFBQU0sc0JBQXNCLFNBQVMsTUFDbkMsTUFBTSxZQUFZLFFBQ2YsU0FBUyxVQUFVLFFBSW5CLGFBQWEsVUFBVSxLQUMzQjtBQUVELFFBQU0sV0FBVztBQUFBLElBQVMsTUFDeEIsTUFBTSxVQUFVLFFBQVEsV0FBVyxVQUFVO0FBQUEsRUFDakQ7QUFFRSxRQUFNLGVBQWUsU0FBUyxNQUM1QixPQUFPLE1BQU0saUJBQWlCLFlBQVksTUFBTSxhQUFhLFdBQVcsSUFDcEUsTUFBTSxlQUNOLGtCQUFrQixLQUN2QjtBQUVELFFBQU0sTUFBTSxNQUFNLFlBQVksTUFBTTtBQUNsQyxpQkFBYSxRQUFRO0FBRXJCLFFBQ0Usb0JBQW9CLFVBQVUsUUFFM0IsTUFBTSxjQUFjLE9BQ3ZCO0FBQ0Esd0JBQWlCO0FBQUEsSUFDdkI7QUFBQSxFQUNHLENBQUE7QUFFRCxXQUFTLGdCQUFpQjtBQUN4QixRQUNFLE1BQU0sY0FBYyxjQUNqQixvQkFBb0IsVUFBVSxRQUM5QixhQUFhLFVBQVUsTUFDMUI7QUFDQSx3QkFBaUI7QUFBQSxJQUN2QjtBQUFBLEVBQ0E7QUFFRSxRQUFNLE1BQU0sTUFBTSxlQUFlLFNBQU87QUFDdEMsUUFBSSxRQUFRLE1BQU07QUFDaEIsVUFBSSxpQkFBaUIsUUFBUTtBQUMzQix1QkFBZSxNQUFNLE1BQU0sTUFBTSxPQUFPLGVBQWUsRUFBRSxXQUFXLE1BQU0sTUFBTSxLQUFNLENBQUE7QUFBQSxNQUM5RjtBQUFBLElBQ0EsV0FDYSxpQkFBaUIsUUFBUTtBQUNoQyxtQkFBWTtBQUNaLHFCQUFlO0FBQUEsSUFDckI7QUFBQSxFQUNBLEdBQUssRUFBRSxXQUFXLEtBQU0sQ0FBQTtBQUV0QixRQUFNLE1BQU0sTUFBTSxXQUFXLGFBQWE7QUFFMUMsUUFBTSxTQUFTLFNBQU87QUFDcEIsUUFBSSxRQUFRLE1BQU07QUFDaEIsbUJBQWEsUUFBUTtBQUFBLElBQzNCLFdBRU0sb0JBQW9CLFVBQVUsUUFDM0IsTUFBTSxjQUFjLFlBQ3ZCO0FBQ0Esd0JBQWlCO0FBQUEsSUFDdkI7QUFBQSxFQUNHLENBQUE7QUFFRCxXQUFTLGtCQUFtQjtBQUMxQjtBQUNBLGlCQUFhLFFBQVE7QUFDckIsaUJBQWEsUUFBUTtBQUNyQixlQUFXLFFBQVE7QUFDbkIsc0JBQWtCLFFBQVE7QUFDMUIsc0JBQWtCLE9BQU07QUFBQSxFQUM1QjtBQVFFLFdBQVMsU0FBVSxNQUFNLE1BQU0sWUFBWTtBQUN6QyxRQUNFLE1BQU0sWUFBWSxRQUNmLFNBQVMsVUFBVSxPQUN0QjtBQUNBLGFBQU87QUFBQSxJQUNiO0FBRUksVUFBTSxRQUFRLEVBQUU7QUFFaEIsVUFBTSxXQUFXLGFBQWEsVUFBVSxPQUNwQyxNQUFNO0FBQUUsbUJBQWEsUUFBUTtBQUFBLElBQUksSUFDakMsTUFBTTtBQUFBLElBQUE7QUFFVixVQUFNQSxVQUFTLENBQUMsS0FBSyxRQUFRO0FBQzNCLGNBQVEsUUFBUSxTQUFRO0FBRXhCLGlCQUFXLFFBQVE7QUFDbkIsd0JBQWtCLFFBQVEsT0FBTztBQUNqQyxtQkFBYSxRQUFRO0FBQUEsSUFDM0I7QUFFSSxVQUFNLFdBQVcsQ0FBQTtBQUVqQixhQUFTLElBQUksR0FBRyxJQUFJLE1BQU0sTUFBTSxRQUFRLEtBQUs7QUFDM0MsWUFBTSxPQUFPLE1BQU0sTUFBTyxDQUFDO0FBQzNCLFVBQUk7QUFFSixVQUFJLE9BQU8sU0FBUyxZQUFZO0FBQzlCLGNBQU0sS0FBSyxLQUFLLFdBQVc7QUFBQSxNQUNuQyxXQUNlLE9BQU8sU0FBUyxZQUFZLFlBQWEsSUFBSSxNQUFPLFFBQVE7QUFDbkUsY0FBTSxZQUFhLElBQUksRUFBRyxHQUFHO0FBQUEsTUFDckM7QUFFTSxVQUFJLFFBQVEsU0FBUyxPQUFPLFFBQVEsVUFBVTtBQUM1QyxRQUFBQSxRQUFPLE1BQU0sR0FBRztBQUNoQixlQUFPO0FBQUEsTUFDZixXQUNlLFFBQVEsUUFBUSxRQUFRLFFBQVE7QUFDdkMsaUJBQVMsS0FBSyxHQUFHO0FBQUEsTUFDekI7QUFBQSxJQUNBO0FBRUksUUFBSSxTQUFTLFdBQVcsR0FBRztBQUN6QixNQUFBQSxRQUFPLEtBQUs7QUFDWixhQUFPO0FBQUEsSUFDYjtBQUVJLGlCQUFhLFFBQVE7QUFFckIsV0FBTyxRQUFRLElBQUksUUFBUSxFQUFFO0FBQUEsTUFDM0IsU0FBTztBQUNMLFlBQUksUUFBUSxVQUFVLE1BQU0sUUFBUSxHQUFHLE1BQU0sU0FBUyxJQUFJLFdBQVcsR0FBRztBQUN0RSxvQkFBVSxpQkFBaUJBLFFBQU8sS0FBSztBQUN2QyxpQkFBTztBQUFBLFFBQ2pCO0FBRVEsY0FBTSxNQUFNLElBQUksS0FBSyxPQUFLLE1BQU0sU0FBUyxPQUFPLE1BQU0sUUFBUTtBQUM5RCxrQkFBVSxpQkFBaUJBLFFBQU8sUUFBUSxRQUFRLEdBQUc7QUFDckQsZUFBTyxRQUFRO0FBQUEsTUFDaEI7QUFBQSxNQUNELE9BQUs7QUFDSCxZQUFJLFVBQVUsZUFBZTtBQUMzQixrQkFBUSxNQUFNLENBQUM7QUFDZixVQUFBQSxRQUFPLElBQUk7QUFBQSxRQUNyQjtBQUVRLGVBQU87QUFBQSxNQUNmO0FBQUEsSUFDQTtBQUFBLEVBQ0E7QUFFRSxRQUFNLG9CQUFvQixTQUFTLFVBQVUsQ0FBQztBQUU5QyxrQkFBZ0IsTUFBTTtBQUNwQixtQkFBWTtBQUNaLHNCQUFrQixPQUFNO0FBQUEsRUFDekIsQ0FBQTtBQUdELFNBQU8sT0FBTyxPQUFPLEVBQUUsaUJBQWlCLFNBQVUsQ0FBQTtBQUNsRCxhQUFXLE9BQU8sWUFBWSxNQUFNLFNBQVMsS0FBSztBQUVsRCxTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBRUE7QUFBQSxJQUNBO0FBQUEsRUFDSjtBQUNBO0FDNU5BLElBQUksUUFBUSxDQUFBO0FBQ1osSUFBSSxZQUFZLENBQUE7QUFFaEIsU0FBUyxVQUFXLE1BQU07QUFDeEIsY0FBWSxVQUFVLE9BQU8sV0FBUyxVQUFVLElBQUk7QUFDdEQ7QUFFTyxTQUFTLGlCQUFrQixNQUFNO0FBQ3RDLFlBQVUsSUFBSTtBQUNkLFlBQVUsS0FBSyxJQUFJO0FBQ3JCO0FBRU8sU0FBUyxvQkFBcUIsTUFBTTtBQUN6QyxZQUFVLElBQUk7QUFFZCxNQUFJLFVBQVUsV0FBVyxLQUFLLE1BQU0sV0FBVyxHQUFHO0FBRWhELFVBQU8sTUFBTSxTQUFTLENBQUcsRUFBQTtBQUN6QixZQUFRLENBQUE7QUFBQSxFQUNaO0FBQ0E7QUFFTyxTQUFTLFdBQVksSUFBSTtBQUM5QixNQUFJLFVBQVUsV0FBVyxHQUFHO0FBQzFCLE9BQUU7QUFBQSxFQUNOLE9BQ087QUFDSCxVQUFNLEtBQUssRUFBRTtBQUFBLEVBQ2pCO0FBQ0E7QUFFTyxTQUFTLGNBQWUsSUFBSTtBQUNqQyxVQUFRLE1BQU0sT0FBTyxXQUFTLFVBQVUsRUFBRTtBQUM1QztBQ25CTyxTQUFTLG1CQUFvQixLQUFLO0FBQ3ZDLFNBQU8sUUFBUSxVQUNWLFFBQVEsU0FDUCxLQUFLLEtBQUssV0FBVztBQUM3QjtBQUVPLE1BQU0sd0JBQXdCO0FBQUEsRUFDbkMsR0FBRztBQUFBLEVBQ0gsR0FBRztBQUFBLEVBRUgsT0FBTztBQUFBLEVBQ1AsWUFBWTtBQUFBLEVBQ1osTUFBTTtBQUFBLEVBQ04sVUFBVTtBQUFBLEVBQ1YsUUFBUTtBQUFBLEVBQ1IsUUFBUTtBQUFBLEVBRVIsWUFBWTtBQUFBLEVBQ1osT0FBTztBQUFBLEVBQ1AsU0FBUztBQUFBLEVBRVQsUUFBUTtBQUFBLEVBQ1IsVUFBVTtBQUFBLEVBQ1YsWUFBWTtBQUFBLEVBQ1osVUFBVSxDQUFFLFNBQVMsTUFBUTtBQUFBLEVBRTdCLFFBQVE7QUFBQSxFQUVSLFNBQVM7QUFBQSxFQUVULFdBQVc7QUFBQSxFQUVYLGFBQWE7QUFBQSxFQUNiLGlCQUFpQjtBQUFBLEVBRWpCLFNBQVM7QUFBQSxFQUNULE9BQU87QUFBQSxFQUNQLGFBQWE7QUFBQSxFQUViLFNBQVM7QUFBQSxFQUVULFdBQVc7QUFBQSxFQUNYLFdBQVc7QUFBQSxFQUVYLFNBQVM7QUFBQSxFQUNULFVBQVU7QUFBQSxFQUVWLFdBQVc7QUFBQSxFQUVYLEtBQUs7QUFDUDtBQUVPLE1BQU0sZ0JBQWdCO0FBQUEsRUFDM0IsR0FBRztBQUFBLEVBQ0gsV0FBVyxDQUFFLFFBQVEsTUFBTTtBQUM3QjtBQUVPLE1BQU0sZ0JBQWdCLENBQUUscUJBQXFCLFNBQVMsU0FBUyxNQUFNO0FBRXJFLFNBQVMsY0FBZSxFQUFFLGtCQUFrQixNQUFNLFNBQVMsY0FBYyxNQUFPLElBQUcsSUFBSTtBQUM1RixRQUFNLEVBQUUsT0FBTyxNQUFLLElBQUssbUJBQWtCO0FBRTNDLFFBQU0sU0FBUyxRQUFRLE9BQU8sTUFBTSxFQUFFO0FBQ3RDLFFBQU0sWUFBWSxNQUFNO0FBQUEsSUFDdEIsVUFBVTtBQUFBLElBQ1YsVUFBVSxNQUFNLE1BQU07QUFBQSxFQUN2QixDQUFBO0FBRUQsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQSxLQUFLLFlBQVksT0FDYixTQUFTLE1BQU0sTUFBTSxHQUFHLElBQ3hCLEVBQUUsT0FBTyxRQUFTO0FBQUEsSUFFdEI7QUFBQSxJQUVBLFVBQVU7QUFBQSxNQUFTLE1BQ2pCLE1BQU0sWUFBWSxRQUFRLE1BQU0sYUFBYTtBQUFBLElBQzlDO0FBQUEsSUFFRCxjQUFjLElBQUksS0FBSztBQUFBLElBQ3ZCLFNBQVMsSUFBSSxLQUFLO0FBQUEsSUFDbEIsY0FBYztBQUFBLElBRWQsWUFBWSxjQUFlO0FBQUEsSUFDM0I7QUFBQSxJQUVBLFNBQVMsSUFBSSxJQUFJO0FBQUEsSUFDakIsV0FBVyxJQUFJLElBQUk7QUFBQSxJQUNuQixZQUFZLElBQUksSUFBSTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBb0J4QjtBQUNBO0FBRWUsU0FBUSxTQUFFLE9BQU87QUFDOUIsUUFBTSxFQUFFLE9BQU8sTUFBTSxPQUFPLE9BQU8sTUFBSyxJQUFLLG1CQUFrQjtBQUMvRCxRQUFNLEVBQUUsR0FBRSxJQUFLO0FBRWYsTUFBSSxnQkFBZ0I7QUFFcEIsTUFBSSxNQUFNLGFBQWEsUUFBUTtBQUM3QixVQUFNLFdBQVcsU0FBUyxNQUFNLG1CQUFtQixNQUFNLFVBQVUsQ0FBQztBQUFBLEVBQ3hFO0FBRUUsTUFBSSxNQUFNLGNBQWMsUUFBUTtBQUM5QixVQUFNLFlBQVksV0FBUztBQUN6QixXQUFLLHFCQUFxQixLQUFLO0FBQUEsSUFDckM7QUFBQSxFQUNBO0FBRUUsTUFBSSxNQUFNLGtCQUFrQixRQUFRO0FBQ2xDLFVBQU0sZ0JBQWdCO0FBQUEsTUFDcEIsV0FBVztBQUFBLE1BQ1gsWUFBWTtBQUFBLElBQ2xCO0FBQUEsRUFDQTtBQUVFLFNBQU8sT0FBTyxPQUFPO0FBQUEsSUFDbkI7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNELENBQUE7QUFFRCxNQUFJLE1BQU0sb0JBQW9CLFFBQVE7QUFDcEMsVUFBTSxrQkFBa0IsU0FBUyxNQUFNO0FBQ3JDLFVBQUksTUFBTSxZQUFZLE9BQU87QUFDM0IsY0FBTSxNQUFNLE9BQU8sTUFBTSxlQUFlLFlBQVksT0FBTyxNQUFNLGVBQWUsWUFDM0UsS0FBSyxNQUFNLFlBQVksU0FDdkIsTUFBTSxRQUFRLE1BQU0sVUFBVSxNQUFNLE9BQU8sTUFBTSxXQUFXLFNBQVM7QUFFMUUsY0FBTSxNQUFNLE1BQU0sY0FBYyxTQUM1QixNQUFNLFlBQ04sTUFBTTtBQUVWLGVBQU8sT0FBTyxRQUFRLFNBQVMsUUFBUSxNQUFNO0FBQUEsTUFDckQ7QUFBQSxJQUNLLENBQUE7QUFBQSxFQUNMO0FBRUUsUUFBTTtBQUFBLElBQ0o7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRCxJQUFHLFlBQVksTUFBTSxTQUFTLE1BQU0sWUFBWTtBQUVqRCxRQUFNLGdCQUFnQixNQUFNLGtCQUFrQixTQUMxQyxTQUFTLE1BQU0sTUFBTSxlQUFlLFFBQVEsTUFBTSxRQUFRLFVBQVUsUUFBUSxNQUFNLGNBQWMsVUFBVSxJQUFJLElBQzlHLFNBQVMsTUFBTSxNQUFNLGVBQWUsUUFBUSxNQUFNLFFBQVEsVUFBVSxRQUFRLE1BQU0sU0FBUyxVQUFVLElBQUk7QUFFN0csUUFBTSxxQkFBcUI7QUFBQSxJQUFTLE1BQ2xDLE1BQU0sZ0JBQWdCLFFBQ25CLE1BQU0sU0FBUyxVQUNmLFNBQVMsVUFBVSxRQUNuQixNQUFNLFlBQVksUUFDbEIsTUFBTSxVQUFVO0FBQUEsRUFDdkI7QUFFRSxRQUFNLFlBQVksU0FBUyxNQUFNO0FBQy9CLFFBQUksTUFBTSxXQUFXLE1BQU07QUFBRSxhQUFPO0FBQUEsSUFBUTtBQUM1QyxRQUFJLE1BQU0sYUFBYSxNQUFNO0FBQUUsYUFBTztBQUFBLElBQVU7QUFDaEQsUUFBSSxNQUFNLGVBQWUsTUFBTTtBQUFFLGFBQU87QUFBQSxJQUFZO0FBQ3BELFFBQUksTUFBTSxVQUFVO0FBQUUsYUFBTztBQUFBLElBQVU7QUFDdkMsV0FBTztBQUFBLEVBQ1IsQ0FBQTtBQUVELFFBQU0sVUFBVTtBQUFBLElBQVMsTUFDdkIsNENBQTZDLFVBQVUsS0FBTyxNQUMzRCxNQUFNLGVBQWUsU0FBUyxJQUFLLE1BQU0sV0FBVyxLQUFPLEtBQUksT0FDL0QsTUFBTSxZQUFZLE9BQU8sc0JBQXNCLE9BQy9DLE1BQU0sV0FBVyxPQUFPLHFCQUFxQixPQUM3QyxjQUFjLFVBQVUsT0FBTyxvQkFBb0IsT0FDbkQsU0FBUyxVQUFVLE9BQU8sc0JBQXNCLE9BQ2hELE1BQU0sVUFBVSxPQUFPLG9CQUFvQixPQUMzQyxNQUFNLGdCQUFnQixPQUFPLHVDQUF1QyxPQUNwRSxNQUFNLE9BQU8sVUFBVSxPQUFPLG1CQUFtQixPQUNqRCxNQUFNLGVBQWUsU0FBUywwQkFBMEIsT0FDeEQsTUFBTSxRQUFRLFVBQVUsT0FBTyxzQkFBc0IsT0FDckQsU0FBUyxVQUFVLE9BQU8sb0JBQW9CLE9BQzlDLFNBQVMsVUFBVSxRQUFRLE1BQU0sUUFBUSxVQUFVLE9BQU8sMEJBQTBCLE9BQ3BGLE1BQU0sb0JBQW9CLFFBQVEsbUJBQW1CLFVBQVUsT0FBTywwQkFBMEIsT0FDaEcsTUFBTSxZQUFZLE9BQU8sdUJBQXdCLE1BQU0sYUFBYSxPQUFPLHVCQUF1QjtBQUFBLEVBQ3pHO0FBRUUsUUFBTSxlQUFlO0FBQUEsSUFBUyxNQUM1QixvREFDRyxNQUFNLFlBQVksU0FBUyxPQUFRLE1BQU0sT0FBUyxLQUFJLE9BRXZELFNBQVMsVUFBVSxPQUNmLG1CQUVFLE9BQU8sTUFBTSxhQUFhLFlBQVksTUFBTSxTQUFTLFdBQVcsS0FBSyxNQUFNLFFBQVEsVUFBVSxPQUN6RixJQUFLLE1BQU0sUUFBVSxLQUNwQixNQUFNLFVBQVUsU0FBUyxTQUFVLE1BQU0sS0FBTyxLQUFJO0FBQUEsRUFHckU7QUFFRSxRQUFNLFdBQVc7QUFBQSxJQUFTLE1BQ3hCLE1BQU0sY0FBYyxRQUFRLE1BQU0sVUFBVTtBQUFBLEVBQ2hEO0FBRUUsUUFBTSxhQUFhO0FBQUEsSUFBUyxNQUMxQix3REFDRyxNQUFNLGVBQWUsVUFBVSxTQUFTLFVBQVUsT0FBTyxTQUFVLE1BQU0sVUFBVSxLQUFNO0FBQUEsRUFDaEc7QUFFRSxRQUFNLG1CQUFtQixTQUFTLE9BQU87QUFBQSxJQUN2QyxJQUFJLE1BQU0sVUFBVTtBQUFBLElBQ3BCLFVBQVUsTUFBTSxTQUFTO0FBQUEsSUFDekIsU0FBUyxNQUFNLFFBQVE7QUFBQSxJQUN2QixlQUFlLGNBQWM7QUFBQSxJQUM3QixZQUFZLE1BQU07QUFBQSxJQUNsQixXQUFXLE1BQU07QUFBQSxFQUNyQixFQUFJO0FBRUYsUUFBTSxhQUFhLFNBQVMsTUFBTTtBQUNoQyxVQUFNLE1BQU0sQ0FBQTtBQUVaLFFBQUksTUFBTSxVQUFVLE9BQU87QUFDekIsVUFBSSxNQUFNLE1BQU0sVUFBVTtBQUFBLElBQ2hDO0FBRUksUUFBSSxNQUFNLFlBQVksTUFBTTtBQUMxQixVQUFLLGVBQWUsSUFBSztBQUFBLElBQy9CO0FBRUksV0FBTztBQUFBLEVBQ1IsQ0FBQTtBQUVELFdBQVMsZUFBZ0I7QUFDdkIsVUFBTSxLQUFLLFNBQVM7QUFDcEIsUUFBSSxTQUFTLE1BQU0sV0FBVztBQUU5QixRQUFJLFdBQVcsT0FBTyxRQUFRLEdBQUcsT0FBTyxNQUFNLFVBQVUsUUFBUTtBQUM5RCxhQUFPLGFBQWEsVUFBVSxNQUFNLFNBQVMsU0FBUyxPQUFPLGNBQWMsWUFBWTtBQUN2RixVQUFJLFdBQVcsSUFBSTtBQUNqQixnQkFBUSxNQUFNLEVBQUUsZUFBZSxLQUFNLENBQUE7QUFBQSxNQUM3QztBQUFBLElBQ0E7QUFBQSxFQUNBO0FBRUUsV0FBUyxRQUFTO0FBQ2hCLGVBQVcsWUFBWTtBQUFBLEVBQzNCO0FBRUUsV0FBUyxPQUFRO0FBQ2Ysa0JBQWMsWUFBWTtBQUMxQixVQUFNLEtBQUssU0FBUztBQUNwQixRQUFJLE9BQU8sUUFBUSxNQUFNLFFBQVEsTUFBTSxTQUFTLEVBQUUsR0FBRztBQUNuRCxTQUFHLEtBQUk7QUFBQSxJQUNiO0FBQUEsRUFDQTtBQUVFLFdBQVMsaUJBQWtCLEdBQUc7QUFDNUIsUUFBSSxrQkFBa0IsTUFBTTtBQUMxQixtQkFBYSxhQUFhO0FBQzFCLHNCQUFnQjtBQUFBLElBQ3RCO0FBRUksUUFBSSxNQUFNLFNBQVMsVUFBVSxRQUFRLE1BQU0sUUFBUSxVQUFVLE9BQU87QUFDbEUsWUFBTSxRQUFRLFFBQVE7QUFDdEIsV0FBSyxTQUFTLENBQUM7QUFBQSxJQUNyQjtBQUFBLEVBQ0E7QUFFRSxXQUFTLGtCQUFtQixHQUFHLE1BQU07QUFDbkMsc0JBQWtCLFFBQVEsYUFBYSxhQUFhO0FBQ3BELG9CQUFnQixXQUFXLE1BQU07QUFDL0Isc0JBQWdCO0FBRWhCLFVBQ0UsU0FBUyxTQUFRLE1BQU8sU0FDdEIsTUFBTSxpQkFBaUIsUUFDcEIsTUFBTSxlQUFlLFVBQ3JCLE1BQU0sV0FBVyxVQUFVLFFBQzNCLE1BQU0sV0FBVyxNQUFNLFNBQVMsU0FBUyxhQUFhLE1BQU0sT0FFakU7QUFFRixVQUFJLE1BQU0sUUFBUSxVQUFVLE1BQU07QUFDaEMsY0FBTSxRQUFRLFFBQVE7QUFDdEIsYUFBSyxRQUFRLENBQUM7QUFBQSxNQUN0QjtBQUVNLGFBQUk7QUFBQSxJQUNMLENBQUE7QUFBQSxFQUNMO0FBRUUsV0FBUyxXQUFZLEdBQUc7QUFFdEIsbUJBQWUsQ0FBQztBQUVoQixRQUFJLEdBQUcsU0FBUyxHQUFHLFdBQVcsTUFBTTtBQUNsQyxZQUFNLEtBQUssTUFBTSxXQUFXLFNBQVMsTUFBTSxRQUFRO0FBQ25ELFNBQUcsTUFBSztBQUFBLElBQ2QsV0FDYSxNQUFNLFFBQVEsTUFBTSxTQUFTLFNBQVMsYUFBYSxNQUFNLE1BQU07QUFDdEUsZUFBUyxjQUFjLEtBQUk7QUFBQSxJQUNqQztBQUVJLFFBQUksTUFBTSxTQUFTLFFBQVE7QUFJekIsWUFBTSxTQUFTLE1BQU0sUUFBUTtBQUFBLElBQ25DO0FBRUksU0FBSyxxQkFBcUIsSUFBSTtBQUM5QixVQUFNLGdCQUFnQixRQUFRLEtBQUssVUFBVSxJQUFJO0FBQ2pELFNBQUssU0FBUyxNQUFNLFVBQVU7QUFFOUIsYUFBUyxNQUFNO0FBQ2IsWUFBTSxVQUFVLGFBQWE7QUFDN0Isc0JBQWU7QUFDZixtQkFBYSxRQUFRO0FBQUEsSUFDdEIsQ0FBQTtBQUFBLEVBQ0w7QUFFRSxXQUFTLGlCQUFrQixLQUFLO0FBQzlCLEtBQUUsSUFBSSxJQUFLLFNBQVMsSUFBSSxPQUFPLEtBQUssV0FBVyxHQUFHO0FBQUEsRUFDdEQ7QUFFRSxXQUFTLGFBQWM7QUFDckIsVUFBTSxPQUFPLENBQUE7QUFFYixVQUFNLFlBQVksVUFBVSxLQUFLO0FBQUEsTUFDL0IsRUFBRSxPQUFPO0FBQUEsUUFDUCxPQUFPO0FBQUEsUUFDUCxLQUFLO0FBQUEsUUFDTCxTQUFTO0FBQUEsTUFDakIsR0FBUyxNQUFNLFFBQVMsQ0FBQTtBQUFBLElBQ3hCO0FBRUksU0FBSztBQUFBLE1BQ0gsRUFBRSxPQUFPO0FBQUEsUUFDUCxPQUFPO0FBQUEsTUFDUixHQUFFLG9CQUFxQixDQUFBO0FBQUEsSUFDOUI7QUFFSSxhQUFTLFVBQVUsUUFBUSxNQUFNLGdCQUFnQixTQUFTLEtBQUs7QUFBQSxNQUM3RCxtQkFBbUIsU0FBUztBQUFBLFFBQzFCLEVBQUUsT0FBTyxFQUFFLE1BQU0sR0FBRyxRQUFRLE1BQU0sT0FBTyxPQUFPLFdBQVksQ0FBQTtBQUFBLE1BQzdELENBQUE7QUFBQSxJQUNQO0FBRUksUUFBSSxNQUFNLFlBQVksUUFBUSxNQUFNLGFBQWEsVUFBVSxNQUFNO0FBQy9ELFdBQUs7QUFBQSxRQUNIO0FBQUEsVUFDRTtBQUFBLFVBQ0EsTUFBTSxZQUFZLFNBQ2QsTUFBTSxRQUFPLElBQ2IsQ0FBRSxFQUFFLFVBQVUsRUFBRSxPQUFPLE1BQU0sTUFBSyxDQUFFLENBQUM7QUFBQSxRQUNuRDtBQUFBLE1BQ0E7QUFBQSxJQUNBLFdBQ2EsTUFBTSxjQUFjLFFBQVEsTUFBTSxTQUFTLFVBQVUsUUFBUSxNQUFNLFNBQVMsVUFBVSxNQUFNO0FBQ25HLFdBQUs7QUFBQSxRQUNILG1CQUFtQiwwQkFBMEI7QUFBQSxVQUMzQyxFQUFFLE9BQU87QUFBQSxZQUNQLE9BQU87QUFBQSxZQUNQLE1BQU0sTUFBTSxhQUFhLEdBQUcsUUFBUSxNQUFNO0FBQUEsWUFDMUMsVUFBVTtBQUFBLFlBQ1YsTUFBTTtBQUFBLFlBQ04sZUFBZTtBQUFBLFlBQ2YsY0FBYyxHQUFHLEtBQUssTUFBTTtBQUFBLFlBQzVCLFNBQVM7QUFBQSxZQUNULFNBQVM7QUFBQSxVQUNWLENBQUE7QUFBQSxRQUNGLENBQUE7QUFBQSxNQUNUO0FBQUEsSUFDQTtBQUVJLFVBQU0sV0FBVyxVQUFVLEtBQUs7QUFBQSxNQUM5QixFQUFFLE9BQU87QUFBQSxRQUNQLE9BQU87QUFBQSxRQUNQLEtBQUs7QUFBQSxRQUNMLFNBQVM7QUFBQSxNQUNqQixHQUFTLE1BQU0sT0FBUSxDQUFBO0FBQUEsSUFDdkI7QUFFSSxVQUFNLG1CQUFtQixVQUFVLEtBQUs7QUFBQSxNQUN0QyxtQkFBbUIsZ0JBQWdCLE1BQU0sZUFBZ0IsQ0FBQTtBQUFBLElBQy9EO0FBRUksVUFBTSxvQkFBb0IsVUFBVSxLQUFLO0FBQUEsTUFDdkMsTUFBTSxnQkFBZTtBQUFBLElBQzNCO0FBRUksV0FBTztBQUFBLEVBQ1g7QUFFRSxXQUFTLHNCQUF1QjtBQUM5QixVQUFNLE9BQU8sQ0FBQTtBQUViLFVBQU0sV0FBVyxVQUFVLE1BQU0sV0FBVyxRQUFRLEtBQUs7QUFBQSxNQUN2RCxFQUFFLE9BQU87QUFBQSxRQUNQLE9BQU87QUFBQSxNQUNSLEdBQUUsTUFBTSxNQUFNO0FBQUEsSUFDckI7QUFFSSxRQUFJLE1BQU0scUJBQXFCLFVBQVUsTUFBTSxVQUFVLFVBQVUsTUFBTTtBQUN2RSxXQUFLO0FBQUEsUUFDSCxNQUFNLGlCQUFnQjtBQUFBLE1BQzlCO0FBQUEsSUFDQTtBQUVJLFFBQUksTUFBTSxlQUFlLFFBQVE7QUFDL0IsV0FBSyxLQUFLLE1BQU0sV0FBWSxDQUFBO0FBQUEsSUFDbEMsV0FFYSxNQUFNLGVBQWUsUUFBUTtBQUNwQyxXQUFLLEtBQUssTUFBTSxXQUFZLENBQUE7QUFBQSxJQUNsQyxXQUNhLE1BQU0sWUFBWSxRQUFRO0FBQ2pDLFdBQUs7QUFBQSxRQUNILEVBQUUsT0FBTztBQUFBLFVBQ1AsS0FBSyxNQUFNO0FBQUEsVUFDWCxPQUFPO0FBQUEsVUFDUCxVQUFVO0FBQUEsVUFDVixHQUFHLE1BQU0sV0FBVyxXQUFXO0FBQUEsVUFDL0Isa0JBQWtCLE1BQU0sY0FBYyxRQUFRO0FBQUEsUUFDL0MsR0FBRSxNQUFNLFFBQVEsaUJBQWlCLEtBQUssQ0FBQztBQUFBLE1BQ2hEO0FBQUEsSUFDQTtBQUVJLGFBQVMsVUFBVSxRQUFRLEtBQUs7QUFBQSxNQUM5QixFQUFFLE9BQU87QUFBQSxRQUNQLE9BQU8sV0FBVztBQUFBLE1BQ25CLEdBQUUsTUFBTSxNQUFNLE9BQU8sTUFBTSxLQUFLLENBQUM7QUFBQSxJQUN4QztBQUVJLFVBQU0sV0FBVyxVQUFVLE1BQU0sV0FBVyxRQUFRLEtBQUs7QUFBQSxNQUN2RCxFQUFFLE9BQU87QUFBQSxRQUNQLE9BQU87QUFBQSxNQUNSLEdBQUUsTUFBTSxNQUFNO0FBQUEsSUFDckI7QUFFSSxXQUFPLEtBQUssT0FBTyxNQUFNLE1BQU0sT0FBTyxDQUFDO0FBQUEsRUFDM0M7QUFFRSxXQUFTLFlBQWE7QUFDcEIsUUFBSSxLQUFLO0FBRVQsUUFBSSxTQUFTLFVBQVUsTUFBTTtBQUMzQixVQUFJLGFBQWEsVUFBVSxNQUFNO0FBQy9CLGNBQU0sQ0FBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLFFBQVMsR0FBRSxhQUFhLEtBQUssQ0FBQztBQUN2RCxjQUFNLGlCQUFrQixhQUFhLEtBQU87QUFBQSxNQUNwRCxPQUNXO0FBQ0gsY0FBTSxNQUFNLE1BQU0sS0FBSztBQUN2QixjQUFNO0FBQUEsTUFDZDtBQUFBLElBQ0EsV0FDYSxNQUFNLGFBQWEsUUFBUSxNQUFNLFFBQVEsVUFBVSxNQUFNO0FBQ2hFLFVBQUksTUFBTSxTQUFTLFFBQVE7QUFDekIsY0FBTSxDQUFFLEVBQUUsT0FBTyxNQUFNLElBQUksQ0FBQztBQUM1QixjQUFNLGdCQUFpQixNQUFNLElBQU07QUFBQSxNQUMzQyxPQUNXO0FBQ0gsY0FBTSxNQUFNLE1BQU0sSUFBSTtBQUN0QixjQUFNO0FBQUEsTUFDZDtBQUFBLElBQ0E7QUFFSSxVQUFNLGFBQWEsTUFBTSxZQUFZLFFBQVEsTUFBTSxZQUFZO0FBRS9ELFFBQ0UsTUFBTSxvQkFBb0IsUUFDdkIsZUFBZSxTQUNmLFFBQVEsT0FDWDtBQUVGLFVBQU0sT0FBTyxFQUFFLE9BQU87QUFBQSxNQUNwQjtBQUFBLE1BQ0EsT0FBTztBQUFBLElBQ2IsR0FBTyxHQUFHO0FBRU4sV0FBTyxFQUFFLE9BQU87QUFBQSxNQUNkLE9BQU8sdURBQ0YsTUFBTSxvQkFBb0IsT0FBTyxhQUFhO0FBQUEsTUFDbkQsU0FBUztBQUFBLElBQ2YsR0FBTztBQUFBLE1BQ0QsTUFBTSxvQkFBb0IsT0FDdEIsT0FDQSxFQUFFLFlBQVksRUFBRSxNQUFNLDhCQUErQixHQUFFLE1BQU0sSUFBSTtBQUFBLE1BRXJFLGVBQWUsT0FDWCxFQUFFLE9BQU87QUFBQSxRQUNULE9BQU87QUFBQSxNQUNqQixHQUFXLE1BQU0sWUFBWSxTQUFTLE1BQU0sWUFBWSxNQUFNLGdCQUFnQixLQUFLLElBQ3pFO0FBQUEsSUFDTCxDQUFBO0FBQUEsRUFDTDtBQUVFLFdBQVMsbUJBQW9CLEtBQUssU0FBUztBQUN6QyxXQUFPLFlBQVksT0FDZixPQUNBLEVBQUUsT0FBTztBQUFBLE1BQ1Q7QUFBQSxNQUNBLE9BQU87QUFBQSxJQUNmLEdBQVMsT0FBTztBQUFBLEVBQ2hCO0FBRUUsTUFBSSxpQkFBaUI7QUFFckIsZ0JBQWMsTUFBTTtBQUNsQixxQkFBaUI7QUFBQSxFQUNsQixDQUFBO0FBRUQsY0FBWSxNQUFNO0FBQ2hCLHVCQUFtQixRQUFRLE1BQU0sY0FBYyxRQUFRLE1BQU0sTUFBSztBQUFBLEVBQ25FLENBQUE7QUFFRCxRQUFNLGNBQWMsUUFBUSxVQUFVLE1BQU07QUFDMUMsVUFBTSxNQUFLO0FBQUEsRUFDWixDQUFBO0FBRUQsa0JBQWdCLE1BQU07QUFDcEIsc0JBQWtCLFFBQVEsYUFBYSxhQUFhO0FBQUEsRUFDckQsQ0FBQTtBQUdELFNBQU8sT0FBTyxPQUFPLEVBQUUsT0FBTyxLQUFNLENBQUE7QUFFcEMsU0FBTyxTQUFTLGNBQWU7QUFDN0IsVUFBTSxhQUFhLE1BQU0sZUFBZSxVQUFVLE1BQU0sWUFBWSxTQUNoRTtBQUFBLE1BQ0UsR0FBRyxNQUFNLFdBQVcsV0FBVztBQUFBLE1BQy9CLGtCQUFrQixNQUFNLGNBQWMsUUFBUTtBQUFBLE1BQzlDLEdBQUcsV0FBVztBQUFBLElBQ3hCLElBQ1EsV0FBVztBQUVmLFdBQU8sRUFBRSxNQUFNLElBQUksT0FBTztBQUFBLE1BQ3hCLEtBQUssTUFBTTtBQUFBLE1BQ1gsT0FBTztBQUFBLFFBQ0wsUUFBUTtBQUFBLFFBQ1IsTUFBTTtBQUFBLE1BQ1A7QUFBQSxNQUNELE9BQU8sTUFBTTtBQUFBLE1BQ2IsR0FBRztBQUFBLElBQ1QsR0FBTztBQUFBLE1BQ0QsTUFBTSxXQUFXLFNBQ2IsRUFBRSxPQUFPO0FBQUEsUUFDVCxPQUFPO0FBQUEsUUFDUCxTQUFTO0FBQUEsTUFDbkIsR0FBVyxNQUFNLE9BQVEsQ0FBQSxJQUNmO0FBQUEsTUFFSixFQUFFLE9BQU87QUFBQSxRQUNQLE9BQU87QUFBQSxNQUNmLEdBQVM7QUFBQSxRQUNELEVBQUUsT0FBTztBQUFBLFVBQ1AsS0FBSyxNQUFNO0FBQUEsVUFDWCxPQUFPLGFBQWE7QUFBQSxVQUNwQixVQUFVO0FBQUEsVUFDVixHQUFHLE1BQU07QUFBQSxRQUNWLEdBQUUsV0FBVSxDQUFFO0FBQUEsUUFFZixtQkFBbUIsVUFBVSxPQUN6QixVQUFTLElBQ1Q7QUFBQSxNQUNaLENBQU87QUFBQSxNQUVELE1BQU0sVUFBVSxTQUNaLEVBQUUsT0FBTztBQUFBLFFBQ1QsT0FBTztBQUFBLFFBQ1AsU0FBUztBQUFBLE1BQ25CLEdBQVcsTUFBTSxNQUFPLENBQUEsSUFDZDtBQUFBLElBQ0wsQ0FBQTtBQUFBLEVBQ0w7QUFDQTtBQzVsQkEsTUFBQSxTQUFlLGdCQUFnQjtBQUFBLEVBQzdCLE1BQU07QUFBQSxFQUVOLGNBQWM7QUFBQSxFQUVkLE9BQU87QUFBQSxJQUNMLEdBQUc7QUFBQSxJQUVILEtBQUs7QUFBQSxNQUNILE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxJQUNmO0FBQUEsRUFDRztBQUFBLEVBRUQsT0FBTztBQUFBLEVBRVAsUUFBUztBQUNQLFdBQU87QUFBQSxNQUNMLGNBQWMsRUFBRSxTQUFTLEtBQU0sQ0FBQTtBQUFBLElBQ3JDO0FBQUEsRUFDQTtBQUNBLENBQUM7QUNaTSxNQUFNLGVBQWU7QUFBQSxFQUMxQixJQUFJO0FBQUEsRUFDSixJQUFJO0FBQUEsRUFDSixJQUFJO0FBQUEsRUFDSixJQUFJO0FBQUEsRUFDSixJQUFJO0FBQ047QUFFQSxNQUFBLFFBQWUsZ0JBQWdCO0FBQUEsRUFDN0IsTUFBTTtBQUFBLEVBRU4sT0FBTztBQUFBLElBQ0wsR0FBRztBQUFBLElBQ0gsR0FBRztBQUFBLElBRUgsT0FBTztBQUFBLElBRVAsTUFBTTtBQUFBLElBQ04sV0FBVztBQUFBLElBQ1gsWUFBWTtBQUFBLElBQ1osY0FBYztBQUFBLElBQ2QsT0FBTyxDQUFFLFFBQVEsTUFBUTtBQUFBLElBRXpCLE9BQU87QUFBQSxJQUNQLFdBQVc7QUFBQSxJQUVYLFlBQVk7QUFBQSxNQUNWLE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxJQUNWO0FBQUEsSUFDRCxVQUFVO0FBQUEsTUFDUixNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsSUFDVjtBQUFBLElBRUQsUUFBUTtBQUFBLElBQ1IsU0FBUztBQUFBLElBQ1QsV0FBVztBQUFBLElBQ1gsV0FBVztBQUFBLElBRVgsaUJBQWlCO0FBQUEsSUFFakIsVUFBVSxDQUFFLFFBQVEsTUFBUTtBQUFBLElBQzVCLFNBQVM7QUFBQSxJQUVULFFBQVE7QUFBQSxNQUNOLE1BQU0sQ0FBRSxTQUFTLE1BQVE7QUFBQSxNQUN6QixTQUFTO0FBQUEsSUFDZjtBQUFBLEVBQ0c7QUFBQSxFQUVELE9BQU8sQ0FBRSxxQkFBcUIsbUJBQW1CLFVBQVUsT0FBUztBQUFBLEVBRXBFLE1BQU8sT0FBTyxFQUFFLE9BQU8sS0FBSSxHQUFJO0FBQzdCLFVBQU0sRUFBRSxPQUFPLEVBQUUsR0FBRSxFQUFJLElBQUcsbUJBQWtCO0FBRTVDLFVBQU0sU0FBUyxRQUFRLE9BQU8sRUFBRTtBQUNoQyxVQUFNLFlBQVksUUFBUSxPQUFPLFlBQVk7QUFFN0MsVUFBTSxjQUFjLFNBQVMsTUFBTSxNQUFNLGFBQWEsUUFBUSxNQUFNLFNBQVMsTUFBTTtBQUVuRixVQUFNLFdBQVcsU0FBUyxNQUN4QixNQUFNLGFBQWEsT0FDZixNQUFNLGdCQUFnQixHQUFHLFFBQVEsS0FBSyxXQUN0QyxNQUFNLElBQ1g7QUFFRCxVQUFNLGFBQWEsU0FBUyxNQUFNLE1BQU0sY0FBYyxHQUFHLFFBQVEsS0FBSyxNQUFNO0FBRTVFLFVBQU0sY0FBYztBQUFBLE1BQVMsTUFDM0IsTUFBTSxZQUFZLFVBQ2QsTUFBTSxjQUFjLFFBQVEsTUFBTSxhQUFhO0FBQUEsSUFDekQ7QUFFSSxVQUFNLFVBQVUsU0FBUyxNQUFNO0FBQzdCLFlBQU0sT0FBTyxNQUFNLFlBQVksT0FDM0IsTUFBTSxTQUFTLE1BQU0sWUFDckIsTUFBTTtBQUVWLGFBQU8sNENBQ0YsTUFBTSxZQUFZLFNBQVMsTUFBTSxVQUFVLFNBQVMsT0FBUSxNQUFNLEtBQUssS0FBTSxPQUM3RSxPQUFPLFNBQVUsSUFBTSxxQkFBb0IsT0FDM0MsTUFBTSxZQUFZLE9BQU8sY0FBYyxPQUN2QyxNQUFNLFVBQVUsT0FBTyxtQkFBbUIsT0FDMUMsTUFBTSxZQUFZLE9BQU8scUJBQXFCLE9BQzlDLE1BQU0sYUFBYSxPQUFPLHNCQUFzQixPQUNoRCxZQUFZLFVBQVUsT0FBTyxpRUFBaUUsT0FDOUYsTUFBTSxXQUFXLE9BQU8sb0JBQW9CLE9BQzVDLE9BQU8sVUFBVSxPQUFPLHlCQUF5QjtBQUFBLElBQ3ZELENBQUE7QUFFRCxVQUFNLGFBQWEsU0FBUyxNQUFNO0FBQ2hDLFlBQU0sT0FBTyxNQUFNLFlBQVksT0FDM0IsRUFBRSxVQUFVLElBQUksaUJBQWlCLE9BQU0sSUFDdkMsRUFBRSxVQUFVLE1BQU0sWUFBWSxFQUFDO0FBRW5DLFlBQU0sU0FBUztBQUFBLFFBQ2IsR0FBRztBQUFBLFFBQ0gsTUFBTTtBQUFBLFFBQ04sZUFBZTtBQUFBLFFBQ2YsY0FBYyxNQUFNLG1CQUFtQixHQUFHLEtBQUssTUFBTTtBQUFBLE1BQzdEO0FBRU0sYUFBTyxFQUFFLE1BQU0sT0FBTTtBQUFBLElBQ3RCLENBQUE7QUFFRCxhQUFTQyxTQUFTLEdBQUc7QUFDbkIsUUFBRSxZQUFZLE1BQWtCLFFBQVEsQ0FBQztBQUFBLElBQy9DO0FBRUksYUFBUyxRQUFTLEdBQUc7QUFDbkIsVUFBSSxDQUFDLE1BQU0sU0FBUztBQUNsQixhQUFLLG1CQUFtQixDQUFDLE1BQU0sUUFBUTtBQUN2QyxhQUFLLFNBQVMsQ0FBQztBQUFBLE1BQ3ZCO0FBQUEsSUFDQTtBQUVJLGFBQVMsU0FBVSxHQUFHO0FBQ3BCLFVBQUksRUFBRSxZQUFZLFVBQVUsRUFBRSxZQUFZLElBQUk7QUFDNUMsdUJBQWUsQ0FBQztBQUNoQixZQUFJLE1BQU0sWUFBWSxPQUFPO0FBQzNCLGVBQUsscUJBQXFCLEtBQUs7QUFDL0IsZUFBSyxRQUFRO0FBQUEsUUFDdkI7QUFBQSxNQUNBO0FBQUEsSUFDQTtBQUVJLGFBQVMsYUFBYztBQUNyQixZQUFNLFFBQVEsQ0FBQTtBQUVkLGtCQUFZLFVBQVUsUUFBUSxNQUFNO0FBQUEsUUFDbEMsRUFBRSxPQUFPLEVBQUUsT0FBTyxpQkFBa0IsQ0FBQTtBQUFBLE1BQzVDO0FBRU0sa0JBQVksVUFBVSxRQUFRLE1BQU07QUFBQSxRQUNsQyxFQUFFLE9BQU87QUFBQSxVQUNQLE9BQU87QUFBQSxVQUNQLE1BQU0sU0FBUztBQUFBLFFBQ2hCLENBQUE7QUFBQSxNQUNUO0FBRU0sWUFBTSxRQUFRLE1BQU0sVUFBVSxTQUMxQixDQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sV0FBVSxHQUFJLENBQUUsTUFBTSxNQUFPLENBQUMsSUFDbEQ7QUFFSixZQUFNO0FBQUEsUUFDSixFQUFFLE9BQU87QUFBQSxVQUNQLE9BQU87QUFBQSxRQUNSLEdBQUUsaUJBQWlCLE1BQU0sU0FBUyxLQUFLLENBQUM7QUFBQSxNQUNqRDtBQUVNLFlBQU0sYUFBYSxNQUFNO0FBQUEsUUFDdkIsRUFBRSxPQUFPO0FBQUEsVUFDUCxPQUFPO0FBQUEsVUFDUCxNQUFNLE1BQU07QUFBQSxRQUNiLENBQUE7QUFBQSxNQUNUO0FBRU0sWUFBTSxjQUFjLFFBQVEsTUFBTTtBQUFBLFFBQ2hDLEVBQUUsT0FBTztBQUFBLFVBQ1AsT0FBTztBQUFBLFVBQ1AsTUFBTSxXQUFXO0FBQUEsVUFDakIsR0FBRyxXQUFXLE1BQU07QUFBQSxVQUNwQixTQUFTO0FBQUEsVUFDVCxTQUFTO0FBQUEsUUFDVixDQUFBO0FBQUEsTUFDVDtBQUVNLGFBQU87QUFBQSxJQUNiO0FBRUksV0FBTyxNQUFNO0FBQ1gsVUFBSSxNQUFNLGVBQWUsTUFBTztBQUVoQyxZQUFNLE9BQU87QUFBQSxRQUNYLE9BQU8sUUFBUTtBQUFBLFFBQ2YsT0FBTyxVQUFVO0FBQUEsTUFDekI7QUFFTSxrQkFBWSxVQUFVLFFBQVEsT0FBTztBQUFBLFFBQ25DO0FBQUEsUUFDQSxXQUFXLE1BQU07QUFBQSxRQUNqQixFQUFFLFNBQVMsU0FBQUEsU0FBTztBQUFBLE1BQzFCO0FBRU0sYUFBTztBQUFBLFFBQ0w7QUFBQSxRQUNBO0FBQUEsUUFDQSxXQUFZO0FBQUEsUUFDWjtBQUFBLFFBQ0EsTUFBTSxXQUFXLFNBQVMsTUFBTSxZQUFZO0FBQUEsUUFDNUMsTUFBTSxDQUFFLENBQUUsUUFBUSxNQUFNLE1BQVEsQ0FBQTtBQUFBLE1BQ3hDO0FBQUEsSUFDQTtBQUFBLEVBQ0E7QUFDQSxDQUFDO0FDdE1ELE1BQUEsUUFBZSxnQkFBZ0I7QUFBQSxFQUM3QixNQUFNO0FBQUEsRUFFTixPQUFPO0FBQUEsSUFDTCxHQUFHO0FBQUEsSUFDSCxHQUFHO0FBQUEsSUFFSCxLQUFLO0FBQUEsTUFDSCxNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsSUFDVjtBQUFBLElBRUQsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLElBQ1Y7QUFBQSxJQUVELFdBQVc7QUFBQSxJQUNYLE9BQU87QUFBQSxJQUNQLFlBQVk7QUFBQSxJQUVaLFVBQVUsQ0FBRSxRQUFRLE1BQVE7QUFBQSxJQUU1QixTQUFTO0FBQUEsSUFDVCxhQUFhO0FBQUEsRUFDZDtBQUFBLEVBRUQsT0FBTyxDQUFFLFNBQVMsT0FBUztBQUFBLEVBRTNCLE1BQU8sT0FBTyxFQUFFLE9BQU8sS0FBSSxHQUFJO0FBQzdCLFVBQU0sRUFBRSxPQUFPLEVBQUUsR0FBRSxFQUFJLElBQUcsbUJBQWtCO0FBRTVDLFVBQU0sU0FBUyxRQUFRLE9BQU8sRUFBRTtBQUNoQyxVQUFNLEVBQUUsU0FBUyxXQUFXLFdBQVcsU0FBUyxnQkFBZSxJQUFLLGNBQWE7QUFFakYsVUFBTSxVQUFVLElBQUksSUFBSTtBQUN4QixVQUFNLGdCQUFnQixJQUFJLElBQUk7QUFFOUIsVUFBTSxlQUFlO0FBQUEsTUFBUyxNQUM1QixNQUFNLGNBQWMsUUFDZixRQUFRLFVBQVUsUUFDbEIsTUFBTSxRQUFRO0FBQUEsSUFDekI7QUFFSSxVQUFNLGNBQWM7QUFBQSxNQUFTLE1BQzNCLE1BQU0sWUFBWSxRQUFRLGFBQWEsVUFBVTtBQUFBLElBQ3ZEO0FBRUksVUFBTSxVQUFVO0FBQUEsTUFBUyxNQUN2QixvQ0FDRyxNQUFNLFVBQVUsT0FBTyxtQkFBbUIsT0FDMUMsT0FBTyxVQUFVLE9BQU8sa0JBQWtCLE9BRTNDLFFBQVEsVUFBVSxRQUFRLE1BQU0sV0FBVyxPQUN2QyxVQUFVLFFBRVIsTUFBTSxXQUFXLE9BQ2Isa0JBQW1CLE1BQU0sZ0JBQWdCLFNBQVMsSUFBSyxNQUFNLGdCQUFpQixFQUFJLEtBQ2xGLE9BR1QsTUFBTSxZQUFZLE9BQU8sY0FBYyxPQUV4QyxZQUFZLFVBQVUsT0FDbEIsK0NBQ0csTUFBTSxnQkFBZ0IsT0FBTyx1QkFBdUIsOEJBQ3BELE1BQU0sWUFBWSxPQUFPLGlDQUFpQyxNQUM3RDtBQUFBLElBRVo7QUFFSSxVQUFNLFFBQVEsU0FBUyxNQUFNO0FBQzNCLFVBQUksTUFBTSxlQUFlLFFBQVE7QUFDL0IsZUFBTztBQUFBLE1BQ2Y7QUFFTSxZQUFNLE1BQU0sR0FBRyxLQUFLLFFBQVEsT0FBTyxVQUFVO0FBQzdDLGFBQU87QUFBQSxRQUNMLENBQUUsWUFBWSxHQUFPLEdBQUMsS0FBSyxNQUFNLGFBQWEsS0FBTTtBQUFBLE1BQzVEO0FBQUEsSUFDSyxDQUFBO0FBRUQsYUFBUyxRQUFTLEdBQUc7QUFDbkIsVUFBSSxZQUFZLFVBQVUsTUFBTTtBQUM5QixZQUFJLGNBQWMsVUFBVSxRQUFRLEVBQUUsZ0JBQWdCLE1BQU07QUFDMUQsY0FBSSxFQUFFLGNBQWMsUUFBUSxTQUFTLGtCQUFrQixRQUFRLE9BQU87QUFDcEUsMEJBQWMsTUFBTSxNQUFLO0FBQUEsVUFDckMsV0FDbUIsU0FBUyxrQkFBa0IsY0FBYyxPQUFPO0FBQ3ZELG9CQUFRLE1BQU0sTUFBSztBQUFBLFVBQy9CO0FBQUEsUUFDQTtBQUVRLHdCQUFnQixDQUFDO0FBQUEsTUFDekI7QUFBQSxJQUNBO0FBRUksYUFBU0EsU0FBUyxHQUFHO0FBQ25CLFVBQUksWUFBWSxVQUFVLFFBQVEsVUFBVSxHQUFHLENBQUUsSUFBSSxHQUFJLE1BQU0sTUFBTTtBQUNuRSx1QkFBZSxDQUFDO0FBR2hCLFVBQUUsWUFBWTtBQUdkLGNBQU0sTUFBTSxJQUFJLFdBQVcsU0FBUyxDQUFDO0FBQ3JDLFlBQUksWUFBWTtBQUNoQixnQkFBUSxNQUFNLGNBQWMsR0FBRztBQUFBLE1BQ3ZDO0FBRU0sV0FBSyxTQUFTLENBQUM7QUFBQSxJQUNyQjtBQUVJLGFBQVMsYUFBYztBQUNyQixZQUFNLFFBQVEsWUFBWSxNQUFNLFNBQVMsQ0FBRSxDQUFBO0FBRTNDLGtCQUFZLFVBQVUsUUFBUSxNQUFNO0FBQUEsUUFDbEMsRUFBRSxPQUFPLEVBQUUsT0FBTyxrQkFBa0IsVUFBVSxJQUFJLEtBQUssY0FBZSxDQUFBO0FBQUEsTUFDOUU7QUFFTSxhQUFPO0FBQUEsSUFDYjtBQUVJLFdBQU8sTUFBTTtBQUNYLFlBQU0sT0FBTztBQUFBLFFBQ1gsS0FBSztBQUFBLFFBQ0wsT0FBTyxRQUFRO0FBQUEsUUFDZixPQUFPLE1BQU07QUFBQSxRQUNiLE1BQU07QUFBQSxRQUNOO0FBQUEsUUFDQSxTQUFBQTtBQUFBLE1BQ1I7QUFFTSxVQUFJLFlBQVksVUFBVSxNQUFNO0FBQzlCLGFBQUssV0FBVyxNQUFNLFlBQVk7QUFDbEMsZUFBTyxPQUFPLE1BQU0sVUFBVSxLQUFLO0FBQUEsTUFDM0MsV0FDZSxhQUFhLFVBQVUsTUFBTTtBQUNwQyxhQUFNLGVBQWUsSUFBSztBQUFBLE1BQ2xDO0FBRU0sYUFBTztBQUFBLFFBQ0wsUUFBUTtBQUFBLFFBQ1I7QUFBQSxRQUNBLFdBQVU7QUFBQSxNQUNsQjtBQUFBLElBQ0E7QUFBQSxFQUNBO0FBQ0EsQ0FBQztBQ3pKRCxNQUFBLGVBQWUsZ0JBQWdCO0FBQUEsRUFDN0IsTUFBTTtBQUFBLEVBRU4sT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsV0FBVztBQUFBLElBQ1gsTUFBTTtBQUFBLElBQ04sS0FBSztBQUFBLElBQ0wsUUFBUTtBQUFBLEVBQ1Q7QUFBQSxFQUVELE1BQU8sT0FBTyxFQUFFLFNBQVM7QUFDdkIsVUFBTSxVQUFVO0FBQUEsTUFBUyxNQUN2QiwyQ0FDd0IsTUFBTSxXQUFXLFFBQVEsTUFBTSxTQUFTLFFBQVEsTUFBTSxjQUFjLE9BQU8sU0FBUyxNQUFRLE1BQ2pILE1BQU0sUUFBUSxPQUFPLHdDQUF3QyxzQkFDN0QsTUFBTSxXQUFXLE9BQU8sNkJBQTZCLE9BQ3JELE1BQU0sY0FBYyxPQUFPLGdDQUFnQyxPQUMzRCxNQUFNLFdBQVcsT0FBTyw2QkFBNkI7QUFBQSxJQUM5RDtBQUVJLFdBQU8sTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLFFBQVEsU0FBUyxNQUFNLE1BQU0sT0FBTyxDQUFDO0FBQUEsRUFDeEU7QUFDQSxDQUFDO0FDdkJELE1BQUEsYUFBZSxnQkFBZ0I7QUFBQSxFQUM3QixNQUFNO0FBQUEsRUFFTixPQUFPO0FBQUEsSUFDTCxVQUFVO0FBQUEsSUFDVixTQUFTO0FBQUEsSUFDVCxRQUFRO0FBQUEsSUFDUixPQUFPLENBQUUsUUFBUSxNQUFNO0FBQUEsRUFDeEI7QUFBQSxFQUVELE1BQU8sT0FBTyxFQUFFLFNBQVM7QUFDdkIsVUFBTSxjQUFjLFNBQVMsTUFBTSxTQUFTLE1BQU0sT0FBTyxFQUFFLENBQUM7QUFFNUQsVUFBTSxVQUFVO0FBQUEsTUFBUyxNQUN2QixtQkFDRyxNQUFNLGFBQWEsT0FBTywyQ0FBMkMsT0FDckUsTUFBTSxZQUFZLE9BQU8seUNBQXlDLE9BQ2xFLE1BQU0sV0FBVyxPQUFPLDJCQUEyQixPQUNuRCxZQUFZLFVBQVUsSUFBSSxjQUFjO0FBQUEsSUFDakQ7QUFFSSxVQUFNLFFBQVEsU0FBUyxNQUFNO0FBQzNCLGFBQU8sTUFBTSxVQUFVLFVBQVUsWUFBWSxRQUFRLElBQ2pEO0FBQUEsUUFDRSxVQUFVO0FBQUEsUUFDVixTQUFTO0FBQUEsUUFDVCxzQkFBc0I7QUFBQSxRQUN0QixzQkFBc0IsWUFBWTtBQUFBLE1BQzlDLElBQ1U7QUFBQSxJQUNMLENBQUE7QUFFRCxXQUFPLE1BQU0sRUFBRSxPQUFPO0FBQUEsTUFDcEIsT0FBTyxNQUFNO0FBQUEsTUFDYixPQUFPLFFBQVE7QUFBQSxJQUNyQixHQUFPLE1BQU0sTUFBTSxPQUFPLENBQUM7QUFBQSxFQUMzQjtBQUNBLENBQUM7QUN4Q00sU0FBUyxpQkFBa0I7QUFDaEMsTUFBSSxPQUFPLGlCQUFpQixRQUFRO0FBQ2xDLFVBQU0sWUFBWSxPQUFPLGFBQVk7QUFDckMsUUFBSSxVQUFVLFVBQVUsUUFBUTtBQUM5QixnQkFBVSxNQUFLO0FBQUEsSUFDckIsV0FDYSxVQUFVLG9CQUFvQixRQUFRO0FBQzdDLGdCQUFVLGdCQUFlO0FBQ3pCLGVBQVMsR0FBRyxXQUFXLFFBQVEsVUFBVSxTQUFTLFNBQVMsWUFBYSxDQUFBO0FBQUEsSUFDOUU7QUFBQSxFQUNBLFdBQ1csU0FBUyxjQUFjLFFBQVE7QUFDdEMsYUFBUyxVQUFVLE1BQUs7QUFBQSxFQUM1QjtBQUNBO0FDVk8sTUFBTSx1QkFBdUI7QUFBQTtBQUFBLEVBRWxDLFFBRUk7QUFBQSxJQUNFLE1BQU0sQ0FBRSxTQUFTLFFBQVEsT0FBUTtBQUFBLElBQ2pDLFNBQVM7QUFBQSxFQUNYO0FBQUEsRUFFSixlQUFlO0FBQ2pCO0FBRU8sTUFBTSxpQkFBaUI7QUFBQSxFQUM1QixHQUFHO0FBQUEsRUFDSCxhQUFhO0FBQ2Y7QUFFeUIsU0FBQSxVQUFBO0FBQUEsRUFDdkI7QUFBQSxFQUNBO0FBQUE7QUFBQSxFQUNBO0FBQUE7QUFDRixHQUFHO0FBQ0QsUUFBTSxFQUFFLE9BQU8sT0FBTyxLQUFBLElBQVMsbUJBQW1CO0FBRTVDLFFBQUEsV0FBVyxJQUFJLElBQUk7QUFFekIsTUFBSSxhQUFhO0FBRWpCLFdBQVMsUUFBUyxLQUFLO0FBRWQsV0FBQSxTQUFTLFVBQVUsT0FDdEIsUUFDQyxRQUFRLFVBQVUsSUFBSSxZQUFZLFVBQVUsSUFBSSxRQUFRLFVBQVU7QUFBQSxFQUFBO0FBR3pFLFFBQU0sZUFBZSxDQUFDO0FBRXRCLE1BQUksc0JBQXNCLFFBQVE7QUFJaEMsV0FBTyxPQUFPLGNBQWM7QUFBQSxNQUMxQixLQUFNLEtBQUs7QUFDVCxjQUFNLEtBQUssR0FBRztBQUFBLE1BQ2hCO0FBQUEsTUFFQSxPQUFRLEtBQUs7QUFDWCxjQUFNLE9BQU8sR0FBRztBQUNoQixZQUFJLGlCQUFpQjtBQUFBLE1BQ3ZCO0FBQUEsTUFFQSxVQUFXLEtBQUs7QUFDZCxrQkFBVSxLQUFLLEVBQUUsTUFBTSxRQUFRLGFBQWEsT0FBTyxHQUFHO0FBQUEsTUFDeEQ7QUFBQSxNQUVBLGFBQWMsS0FBSztBQUNqQixjQUFNLEtBQUssR0FBRztBQUNkLGdCQUFRLEdBQUc7QUFDWCxpQkFBUyxNQUFNO0FBQ2IsZ0JBQU0sS0FBSyxHQUFHO0FBQ2QsY0FBSSxpQkFBaUI7QUFBQSxRQUFBLENBQ3RCO0FBQUEsTUFDSDtBQUFBLE1BRUE7QUFBQSxNQUVBLFlBQWEsS0FBSztBQUNoQixxQkFBYSxjQUFjLEdBQUc7QUFFMUIsWUFBQSxRQUFRLEdBQUcsTUFBTSxLQUFNO0FBRTNCLGNBQU0sS0FBSyxHQUFHO0FBQ0wsaUJBQUEsTUFBTSxVQUFVLElBQUksZ0JBQWdCO0FBRTdDLGNBQU0sU0FBUyxJQUFJO0FBQ25CLGVBQU8sY0FBYyxVQUFVO0FBQUEsVUFDN0IsQ0FBRSxRQUFRLGFBQWEsaUJBQWlCLFNBQVU7QUFBQSxVQUNsRCxDQUFFLFFBQVEsWUFBWSxpQkFBaUIsU0FBVTtBQUFBLFVBQ2pELENBQUUsUUFBUSxlQUFlLGlCQUFpQixTQUFVO0FBQUEsVUFDcEQsQ0FBRSxTQUFTLE9BQU8sZUFBZSxXQUFXLFlBQWE7QUFBQSxRQUFBLENBQzFEO0FBRUQscUJBQWEsV0FBVyxNQUFNO0FBQ2YsdUJBQUE7QUFDYixnQkFBTSxLQUFLLEdBQUc7QUFDZCxjQUFJLGlCQUFpQjtBQUFBLFdBQ3BCLEdBQUc7QUFBQSxNQUNSO0FBQUEsTUFFQSxjQUFlLEtBQUs7QUFDVCxpQkFBQSxNQUFNLFVBQVUsT0FBTyxnQkFBZ0I7QUFFaEQsWUFBSSxlQUFlLE1BQU07QUFDdkIsdUJBQWEsVUFBVTtBQUNWLHVCQUFBO0FBQUEsUUFBQTtBQUdmLFlBQUksUUFBUSxVQUFVLFFBQVEsUUFBUSxRQUFRO0FBQzdCLHlCQUFBO0FBQUEsUUFBQTtBQUFBLE1BQ2pCO0FBQUEsSUFDRixDQUNEO0FBRW1CLHdCQUFBLFNBQVUsVUFBVSxNQUFNLGFBQWE7QUFDekQsVUFBSSxNQUFNLGtCQUFrQixRQUFRLFNBQVMsVUFBVSxLQUFNO0FBRXpELFVBQUE7QUFFSixVQUFJLFlBQVksTUFBTTtBQUNwQixZQUFJLE1BQU0sR0FBRyxTQUFTLEdBQUcsV0FBVyxNQUFNO0FBQ2pDLGlCQUFBO0FBQUEsWUFDTCxDQUFFLFNBQVMsT0FBTyxjQUFjLGVBQWUsU0FBVTtBQUFBLFVBQzNEO0FBQUEsUUFBQSxPQUVHO0FBQ0ksaUJBQUE7QUFBQSxZQUNMLENBQUUsU0FBUyxPQUFPLGFBQWEsUUFBUSxTQUFVO0FBQUEsWUFDakQsQ0FBRSxTQUFTLE9BQU8sZUFBZSxnQkFBZ0IsWUFBYTtBQUFBLFVBQ2hFO0FBQUEsUUFBQTtBQUFBLE1BQ0YsT0FFRztBQUNJLGVBQUE7QUFBQSxVQUNMLENBQUUsU0FBUyxPQUFPLFNBQVMsVUFBVSxTQUFVO0FBQUEsVUFDL0MsQ0FBRSxTQUFTLE9BQU8sU0FBUyxhQUFhLFNBQVU7QUFBQSxRQUNwRDtBQUFBLE1BQUE7QUFHSyxhQUFBLGNBQWMsVUFBVSxJQUFJO0FBQUEsSUFDckM7QUFBQSxFQUFBO0FBR0YsV0FBUyxzQkFBdUI7QUFDOUIsYUFBUyxjQUFjLFFBQVE7QUFBQSxFQUFBO0FBR2pDLFdBQVMsWUFBYSxJQUFJO0FBQ3hCLGFBQVMsUUFBUTtBQUNqQixXQUFPLFNBQVMsTUFBTSxVQUFVLFNBQVMsZ0JBQWdCLEdBQUc7QUFDakQsZUFBQSxRQUFRLFNBQVMsTUFBTTtBQUFBLElBQUE7QUFFaEIsc0JBQUE7QUFBQSxFQUFBO0FBR3BCLFdBQVMsZUFBZ0I7QUFDbkIsUUFBQSxNQUFNLFdBQVcsU0FBUyxNQUFNLFdBQVcsTUFBTSxNQUFNLElBQUksZUFBZSxNQUFNO0FBQ2xGLGVBQVMsUUFBUTtBQUFBLElBQUEsV0FFVixNQUFNLFdBQVcsTUFBTTtBQUNsQixrQkFBQSxNQUFNLElBQUksVUFBVTtBQUFBLElBQUEsT0FFN0I7QUFDSCxVQUFJLEtBQUssTUFBTTtBQUVYLFVBQUEsT0FBTyxNQUFNLFdBQVcsVUFBVTtBQUNoQyxZQUFBO0FBQ0csZUFBQSxTQUFTLGNBQWMsTUFBTSxNQUFNO0FBQUEsaUJBRW5DLEtBQUs7QUFDTCxlQUFBO0FBQUEsUUFBQTtBQUFBLE1BQ1A7QUFHRSxVQUFBLE9BQU8sVUFBVSxPQUFPLE1BQU07QUFDdkIsaUJBQUEsUUFBUSxHQUFHLE9BQU87QUFDVCwwQkFBQTtBQUFBLE1BQUEsT0FFZjtBQUNILGlCQUFTLFFBQVE7QUFDakIsZ0JBQVEsTUFBTSxtQkFBb0IsTUFBTSxNQUFPLGFBQWE7QUFBQSxNQUFBO0FBQUEsSUFDOUQ7QUFBQSxFQUNGO0FBR0ksUUFBQSxNQUFNLE1BQU0sYUFBYSxDQUFPLFFBQUE7QUFDaEMsUUFBQSxTQUFTLFVBQVUsTUFBTTtBQUNQLDBCQUFBO0FBQ3BCLHdCQUFrQixHQUFHO0FBQUEsSUFBQTtBQUFBLEVBQ3ZCLENBQ0Q7QUFFSyxRQUFBLE1BQU0sTUFBTSxRQUFRLE1BQU07QUFDMUIsUUFBQSxTQUFTLFVBQVUsTUFBTTtBQUNQLDBCQUFBO0FBQUEsSUFBQTtBQUdULGlCQUFBO0FBQUEsRUFBQSxDQUNkO0FBRUssUUFBQSxNQUFNLE1BQU0sZUFBZSxDQUFPLFFBQUE7QUFDbEMsUUFBQSxTQUFTLFVBQVUsTUFBTTtBQUMzQixVQUFJLFFBQVEsTUFBTTtBQUNJLDRCQUFBO0FBQUEsTUFBQSxPQUVqQjtBQUNlLDBCQUFBO0FBQUEsTUFBQTtBQUFBLElBQ3BCO0FBQUEsRUFDRixDQUNEO0FBRUQsWUFBVSxNQUFNO0FBQ0QsaUJBQUE7QUFFYixRQUFJLGNBQWMsUUFBUSxNQUFNLGVBQWUsUUFBUSxTQUFTLFVBQVUsTUFBTTtBQUM5RSxXQUFLLHFCQUFxQixLQUFLO0FBQUEsSUFBQTtBQUFBLEVBQ2pDLENBQ0Q7QUFFRCxrQkFBZ0IsTUFBTTtBQUNMLG1CQUFBLFFBQVEsYUFBYSxVQUFVO0FBQzFCLHdCQUFBO0FBQUEsRUFBQSxDQUNyQjtBQUVNLFNBQUE7QUFBQSxJQUNMO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0Y7QUM1TmUsU0FBQSxnQkFBVSxPQUFPLHVCQUF1QjtBQUNyRCxRQUFNLG9CQUFvQixJQUFJLElBQUk7QUFDbEMsTUFBSTtBQUVKLFdBQVMsa0JBQW1CLGNBQWMsSUFBSTtBQUM1QyxVQUFNLFNBQVMsR0FBSSxPQUFPLFNBQVMsUUFBUTtBQUMzQyxVQUFNLFlBQVksT0FBTyxTQUFTLEtBQUs7QUFFdkMsUUFBSSxpQkFBaUIsUUFBUTtBQUMzQixtQkFBYyxNQUFRLEVBQUMsVUFBVSxXQUFXLFdBQVcsT0FBTztBQUFBLElBQ3BFO0FBRUksV0FBUSxNQUFRLEVBQUMsVUFBVSxXQUFXLFdBQVcsT0FBTztBQUV4RCxlQUFXO0FBQUEsRUFDZjtBQUVFLFdBQVMsMEJBQTJCO0FBQ2xDLFFBQUksa0JBQWtCLFVBQVUsTUFBTTtBQUNwQyx3QkFBa0Isa0JBQWtCLEtBQUs7QUFDekMsd0JBQWtCLFFBQVE7QUFBQSxJQUNoQztBQUFBLEVBQ0E7QUFFRSxRQUFNLHVCQUF1QixNQUFNLE1BQU0sTUFBTSxlQUFlLE1BQU07QUFDbEUsUUFBSSxrQkFBa0IsVUFBVSxNQUFNO0FBQ3BDLDhCQUF1QjtBQUN2Qiw0QkFBcUI7QUFBQSxJQUMzQjtBQUFBLEVBQ0csQ0FBQTtBQUVELGtCQUFnQixvQkFBb0I7QUFFcEMsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0o7QUFDQTtBQ3RDTyxNQUFNLHNCQUFzQjtBQUFBLEVBQ2pDLFlBQVk7QUFBQSxJQUNWLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxFQUNYO0FBQUEsRUFFQSx1QkFBdUIsQ0FBRSxVQUFVLEtBQU07QUFDM0M7QUFFTyxNQUFNLHNCQUFzQjtBQUFBLEVBQ2pDO0FBQUEsRUFBYztBQUFBLEVBQVE7QUFBQSxFQUFjO0FBQ3RDO0FBSXlCLFNBQUEsZUFBQTtBQUFBLEVBQ3ZCO0FBQUEsRUFDQTtBQUFBO0FBQUEsRUFDQTtBQUFBO0FBQUEsRUFDQTtBQUFBO0FBQUEsRUFDQTtBQUFBO0FBQUEsRUFDQTtBQUFBO0FBQ0YsR0FBRztBQUNELFFBQU0sS0FBSyxtQkFBbUI7QUFDOUIsUUFBTSxFQUFFLE9BQU8sTUFBTSxNQUFVLElBQUE7QUFFM0IsTUFBQTtBQUVKLFdBQVMsT0FBUSxLQUFLO0FBQ2hCLFFBQUEsUUFBUSxVQUFVLE1BQU07QUFDMUIsV0FBSyxHQUFHO0FBQUEsSUFBQSxPQUVMO0FBQ0gsV0FBSyxHQUFHO0FBQUEsSUFBQTtBQUFBLEVBQ1Y7QUFHRixXQUFTLEtBQU0sS0FBSztBQUVmLFFBQUEsTUFBTSxZQUFZLFFBQ2YsS0FBSyxtQkFBbUIsUUFDeEIsWUFBWSxVQUFVLFFBQVEsR0FBRyxNQUFNLEtBQzNDO0FBRUksVUFBQSxXQUFXLE1BQU8scUJBQXNCLE1BQU07QUFFaEQsUUFBQSxhQUFhLFFBQVEsTUFBZ0M7QUFDdkQsV0FBSyxxQkFBcUIsSUFBSTtBQUNwQixnQkFBQTtBQUNWLGVBQVMsTUFBTTtBQUNiLFlBQUksWUFBWSxLQUFLO0FBQ1Qsb0JBQUE7QUFBQSxRQUFBO0FBQUEsTUFDWixDQUNEO0FBQUEsSUFBQTtBQUdILFFBQUksTUFBTSxlQUFlLFFBQVEsYUFBYSxTQUFTLE9BQXVCO0FBQzVFLGtCQUFZLEdBQUc7QUFBQSxJQUFBO0FBQUEsRUFDakI7QUFHRixXQUFTLFlBQWEsS0FBSztBQUNyQixRQUFBLFFBQVEsVUFBVSxLQUFNO0FBRTVCLFlBQVEsUUFBUTtBQUVoQixTQUFLLGNBQWMsR0FBRztBQUV0QixRQUFJLGVBQWUsUUFBUTtBQUN6QixpQkFBVyxHQUFHO0FBQUEsSUFBQSxPQUVYO0FBQ0gsV0FBSyxRQUFRLEdBQUc7QUFBQSxJQUFBO0FBQUEsRUFDbEI7QUFHRixXQUFTLEtBQU0sS0FBSztBQUNXLFFBQUEsTUFBTSxZQUFZLEtBQU07QUFFL0MsVUFBQSxXQUFXLE1BQU8scUJBQXNCLE1BQU07QUFFaEQsUUFBQSxhQUFhLFFBQVEsTUFBZ0M7QUFDdkQsV0FBSyxxQkFBcUIsS0FBSztBQUNyQixnQkFBQTtBQUNWLGVBQVMsTUFBTTtBQUNiLFlBQUksWUFBWSxLQUFLO0FBQ1Qsb0JBQUE7QUFBQSxRQUFBO0FBQUEsTUFDWixDQUNEO0FBQUEsSUFBQTtBQUdILFFBQUksTUFBTSxlQUFlLFFBQVEsYUFBYSxTQUFTLE9BQXVCO0FBQzVFLGtCQUFZLEdBQUc7QUFBQSxJQUFBO0FBQUEsRUFDakI7QUFHRixXQUFTLFlBQWEsS0FBSztBQUNyQixRQUFBLFFBQVEsVUFBVSxNQUFPO0FBRTdCLFlBQVEsUUFBUTtBQUVoQixTQUFLLGNBQWMsR0FBRztBQUV0QixRQUFJLGVBQWUsUUFBUTtBQUN6QixpQkFBVyxHQUFHO0FBQUEsSUFBQSxPQUVYO0FBQ0gsV0FBSyxRQUFRLEdBQUc7QUFBQSxJQUFBO0FBQUEsRUFDbEI7QUFHRixXQUFTLG1CQUFvQixLQUFLO0FBQ2hDLFFBQUksTUFBTSxZQUFZLFFBQVEsUUFBUSxNQUFNO0FBQ3RDLFVBQUEsTUFBTyxxQkFBc0IsTUFBTSxRQUFRO0FBQzdDLGFBQUsscUJBQXFCLEtBQUs7QUFBQSxNQUFBO0FBQUEsSUFHekIsV0FBQSxRQUFRLFNBQVUsUUFBUSxPQUFPO0FBQ25DLFlBQUEsS0FBSyxRQUFRLE9BQU8sY0FBYztBQUN4QyxTQUFHLE9BQU87QUFBQSxJQUFBO0FBQUEsRUFDWjtBQUdJLFFBQUEsTUFBTSxNQUFNLFlBQVksa0JBQWtCO0FBRWhELE1BQUksc0JBQXNCLFVBQVUsWUFBWSxFQUFFLE1BQU0sTUFBTTtBQUM1RCxVQUFNLE1BQU0sTUFBTSxPQUFPLFVBQVUsTUFBTTtBQUN2QyxVQUFJLGtCQUFrQixVQUFVLFFBQVEsUUFBUSxVQUFVLE1BQU07QUFDekQsYUFBQTtBQUFBLE1BQUE7QUFBQSxJQUNQLENBQ0Q7QUFBQSxFQUFBO0FBR3dCLFlBQVUsTUFBTTtBQUN6Qyx1QkFBbUIsTUFBTSxVQUFVO0FBQUEsRUFBQSxDQUNwQztBQUdELFFBQU0sZ0JBQWdCLEVBQUUsTUFBTSxNQUFNLE9BQU87QUFDcEMsU0FBQSxPQUFPLE9BQU8sYUFBYTtBQUUzQixTQUFBO0FBQ1Q7QUNoSk8sTUFBTSxrQkFBa0IsQ0FBQTtBQVN4QixTQUFTLGlCQUFrQixPQUFPLEtBQUs7QUFDNUMsS0FBRztBQUNELFFBQUksTUFBTSxTQUFTLFNBQVMsU0FBUztBQUNuQyxZQUFNLEtBQUssR0FBRztBQUdkLFVBQUksTUFBTSxPQUFPLHVCQUF1QixNQUFNO0FBQzVDLGVBQU8sZUFBZSxLQUFLO0FBQUEsTUFDbkM7QUFBQSxJQUNBLFdBQ2EsTUFBTSxjQUFjLE1BQU07QUFJakMsWUFBTSxTQUFTLGVBQWUsS0FBSztBQUVuQyxVQUFJLFFBQVEsU0FBUyxTQUFTLGVBQWU7QUFDM0MsY0FBTSxLQUFLLEdBQUc7QUFDZCxlQUFPO0FBQUEsTUFDZixPQUNXO0FBQ0gsZUFBTztBQUFBLE1BQ2Y7QUFBQSxJQUNBO0FBRUksWUFBUSxlQUFlLEtBQUs7QUFBQSxFQUNoQyxTQUFXLFVBQVUsVUFBVSxVQUFVO0FBQ3pDO0FDdEJBLE1BQU0sVUFBVSxnQkFBZ0I7QUFBQSxFQUM5QixNQUFNO0FBQUEsRUFDTixNQUFPLEdBQUcsRUFBRSxTQUFTO0FBQ1osV0FBQSxNQUFNLE1BQU0sUUFBUTtBQUFBLEVBQUE7QUFFL0IsQ0FBQztBQUVELFNBQVMsaUJBQWtCLElBQUk7QUFDN0IsT0FBSyxHQUFHO0FBRUQsU0FBQSxPQUFPLFVBQVUsT0FBTyxNQUFNO0FBQy9CLFFBQUEsR0FBRyxLQUFLLFNBQVMsaUJBQWlCO0FBQzdCLGFBQUE7QUFBQSxJQUFBO0FBRVQsUUFBSSxHQUFHLEtBQUssU0FBUyxhQUFhLEdBQUcsS0FBSyxTQUFTLFNBQVM7QUFDbkQsYUFBQTtBQUFBLElBQUE7QUFHVCxTQUFLLEdBQUc7QUFBQSxFQUFBO0FBR0gsU0FBQTtBQUNUO0FBS3lCLFNBQUEsVUFBQSxJQUFJLFVBQVUscUJBQXFCLE1BQU07QUFFMUQsUUFBQSxpQkFBaUIsSUFBSSxLQUFLO0FBRzFCLFFBQUEscUJBQXFCLElBQUksS0FBSztBQWFwQyxNQUFJLFdBQVc7QUFDZixRQUFNLFdBQVcsQ0FBQztBQUNsQixRQUFNLGlCQUFpQixTQUFTLFlBQVksaUJBQWlCLEVBQUU7QUFFL0QsV0FBUyxXQUFZLFNBQVM7QUFDNUIsUUFBSSxZQUFZLE1BQU07QUFDcEIsMEJBQW9CLFFBQVE7QUFDNUIseUJBQW1CLFFBQVE7QUFDM0I7QUFBQSxJQUFBO0FBR0YsdUJBQW1CLFFBQVE7QUFFdkIsUUFBQSxlQUFlLFVBQVUsT0FBTztBQUM5QixVQUFBLG1CQUFtQixTQUFTLGFBQWEsTUFBTTtBQUN0QyxtQkFBQSxpQkFBaUIsT0FBTyxJQUFJO0FBQUEsTUFBQTtBQUd6QyxxQkFBZSxRQUFRO0FBR1Asc0JBQUEsS0FBSyxHQUFHLEtBQUs7QUFFN0IsdUJBQWlCLFFBQVE7QUFBQSxJQUFBO0FBQUEsRUFDM0I7QUFHRixXQUFTLFdBQVksU0FBUztBQUM1Qix1QkFBbUIsUUFBUTtBQUUzQixRQUFJLFlBQVksS0FBTTtBQUV0Qix3QkFBb0IsUUFBUTtBQUM1QixtQkFBZSxRQUFRO0FBR3ZCLFVBQU0sUUFBUSxnQkFBZ0IsUUFBUSxHQUFHLEtBQUs7QUFDOUMsUUFBSSxVQUFVLElBQUk7QUFDQSxzQkFBQSxPQUFPLE9BQU8sQ0FBQztBQUFBLElBQUE7QUFHakMsUUFBSSxhQUFhLE1BQU07QUFDckIsdUJBQWlCLFFBQVE7QUFDZCxpQkFBQTtBQUFBLElBQUE7QUFBQSxFQUNiO0FBR0YsY0FBWSxNQUFNO0FBQUUsZUFBVyxJQUFJO0FBQUEsRUFBQSxDQUFHO0FBR3RDLEtBQUcsTUFBTSxZQUFZO0FBR3JCLGFBQVcsR0FBRyxPQUFPLGFBQWEsTUFBTSxTQUFTLEtBQUs7QUFFL0MsU0FBQTtBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFFQTtBQUFBLElBQ0E7QUFBQSxJQUVBLGNBQWMsTUFDWixtQkFBbUIsT0FDZix3QkFFRSxlQUFlLFVBQVUsT0FDckIsQ0FBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLFNBQVMsR0FBRyxFQUFFLFNBQVMsbUJBQW1CLENBQUMsQ0FBRSxJQUNqRTtBQUFBLEVBR2Q7QUFDRjtBQ25JTyxNQUFNLHFCQUFxQjtBQUFBLEVBQ2hDLGdCQUFnQjtBQUFBLElBQ2QsTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLEVBQ1Y7QUFBQSxFQUVELGdCQUFnQjtBQUFBLElBQ2QsTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLEVBQ1Y7QUFBQSxFQUVELG9CQUFvQjtBQUFBLElBQ2xCLE1BQU0sQ0FBRSxRQUFRLE1BQVE7QUFBQSxJQUN4QixTQUFTO0FBQUEsRUFDYjtBQUNBO0FBRWUsU0FBQSxjQUFVLE9BQU8sZ0JBQWdCLE1BQU07QUFBRSxHQUFFLGdCQUFnQixNQUFNO0FBQUEsR0FBSTtBQUNsRixTQUFPO0FBQUEsSUFDTCxpQkFBaUIsU0FBUyxNQUFNO0FBQzlCLFlBQU0sT0FBTyxpQkFBa0IsTUFBTSxrQkFBa0IsY0FBYSxDQUFJO0FBQ3hFLFlBQU0sT0FBTyxpQkFBa0IsTUFBTSxrQkFBa0IsY0FBYSxDQUFJO0FBRXhFLGFBQU87QUFBQSxRQUNMLFFBQVE7QUFBQSxRQUVSLGdCQUFnQixHQUFJLElBQUk7QUFBQSxRQUN4QixrQkFBa0IsR0FBSSxJQUFJO0FBQUEsUUFDMUIsY0FBYyxHQUFJLElBQUk7QUFBQSxRQUV0QixnQkFBZ0IsR0FBSSxJQUFJO0FBQUEsUUFDeEIsa0JBQWtCLEdBQUksSUFBSTtBQUFBLFFBQzFCLGNBQWMsR0FBSTtNQUMxQjtBQUFBLElBQ0EsQ0FBSztBQUFBLElBRUQsaUJBQWlCLFNBQVMsTUFBTSw0QkFBNkIsTUFBTSxrQkFBa0IsSUFBSztBQUFBLEVBQzlGO0FBQ0E7QUM5QmUsU0FBQSxVQUFZO0FBQ3pCLE1BQUk7QUFDSixRQUFNLEtBQUssbUJBQWtCO0FBRTdCLFdBQVMsYUFBYztBQUNyQixhQUFTO0FBQUEsRUFDYjtBQUVFLGdCQUFjLFVBQVU7QUFDeEIsa0JBQWdCLFVBQVU7QUFFMUIsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUVBLGFBQWMsSUFBSTtBQUNoQixlQUFTO0FBRVQsZUFBUyxNQUFNO0FBQ2IsWUFBSSxXQUFXLElBQUk7QUFHakIsd0JBQWMsRUFBRSxNQUFNLFNBQVMsT0FBTTtBQUNyQyxtQkFBUztBQUFBLFFBQ25CO0FBQUEsTUFDTyxDQUFBO0FBQUEsSUFDUDtBQUFBLEVBQ0E7QUFDQTtBQzNCZSxTQUFBLGFBQVk7QUFDekIsTUFBSSxRQUFRO0FBQ1osUUFBTSxLQUFLLG1CQUFrQjtBQUU3QixXQUFTLGdCQUFpQjtBQUN4QixRQUFJLFVBQVUsTUFBTTtBQUNsQixtQkFBYSxLQUFLO0FBQ2xCLGNBQVE7QUFBQSxJQUNkO0FBQUEsRUFDQTtBQUVFLGdCQUFjLGFBQWE7QUFDM0Isa0JBQWdCLGFBQWE7QUFFN0IsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUVBLGdCQUFpQixJQUFJLE9BQU87QUFDMUIsb0JBQWE7QUFFYixVQUFJLGNBQWMsRUFBRSxNQUFNLE9BQU87QUFDL0IsZ0JBQVEsV0FBVyxNQUFNO0FBQ3ZCLGtCQUFRO0FBQ1IsYUFBRTtBQUFBLFFBQ1osR0FBVyxLQUFLO0FBQUEsTUFDaEI7QUFBQSxJQUNBO0FBQUEsRUFDQTtBQUNBO0FDbkNBLE1BQU1DLGFBQVcsQ0FBQTtBQUNqQixJQUFJO0FBRUosU0FBUyxVQUFXLEtBQUs7QUFDdkIsWUFBVSxJQUFJLFlBQVk7QUFDNUI7QUFFQSxTQUFTLFNBQVU7QUFDakIsTUFBSSxZQUFZLE1BQU07QUFDcEIsY0FBVTtBQUFBLEVBQ2Q7QUFDQTtBQUVBLFNBQVMsUUFBUyxLQUFLO0FBQ3JCLE1BQUksWUFBWSxNQUFNO0FBQ3BCLGNBQVU7QUFFVixRQUFJLFVBQVUsS0FBSyxFQUFFLE1BQU0sTUFBTTtBQUMvQkEsaUJBQVVBLFdBQVMsU0FBUyxDQUFHLEVBQUMsR0FBRztBQUFBLElBQ3pDO0FBQUEsRUFDQTtBQUNBO0FBRUEsU0FBUyxPQUFRLFFBQVE7QUFDdkIsU0FBUSxRQUFTLFdBQVcsU0FBUztBQUNyQyxTQUFRLFFBQVMsUUFBUSxNQUFNO0FBQy9CLFNBQVEsUUFBUyxTQUFTLE9BQU87QUFDakMsWUFBVTtBQUNaO0FBRU8sU0FBUyxhQUFjLElBQUk7QUFDaEMsTUFBSSxPQUFPLEdBQUcsWUFBWSxNQUFNO0FBQzlCQSxlQUFTLEtBQUssRUFBRTtBQUVoQixRQUFJQSxXQUFTLFdBQVcsR0FBRztBQUN6QixhQUFPLGtCQUFrQjtBQUFBLElBQy9CO0FBQUEsRUFDQTtBQUNBO0FBRU8sU0FBUyxnQkFBaUIsSUFBSTtBQUNuQyxRQUFNLFFBQVFBLFdBQVMsUUFBUSxFQUFFO0FBQ2pDLE1BQUksVUFBVSxJQUFJO0FBQ2hCQSxlQUFTLE9BQU8sT0FBTyxDQUFDO0FBRXhCLFFBQUlBLFdBQVMsV0FBVyxHQUFHO0FBQ3pCLGFBQU8scUJBQXFCO0FBQUEsSUFDbEM7QUFBQSxFQUNBO0FBQ0E7QUNsREEsTUFBTSxXQUFXLENBQUE7QUFFakIsU0FBUyxRQUFTLEdBQUc7QUFDbkIsV0FBVSxTQUFTLFNBQVMsQ0FBRyxFQUFDLENBQUM7QUFDbkM7QUFFTyxTQUFTLFlBQWEsSUFBSTtBQUMvQixNQUFJLE9BQU8sR0FBRyxZQUFZLE1BQU07QUFDOUIsYUFBUyxLQUFLLEVBQUU7QUFFaEIsUUFBSSxTQUFTLFdBQVcsR0FBRztBQUN6QixlQUFTLEtBQUssaUJBQWlCLFdBQVcsT0FBTztBQUFBLElBQ3ZEO0FBQUEsRUFDQTtBQUNBO0FBRU8sU0FBUyxlQUFnQixJQUFJO0FBQ2xDLFFBQU0sUUFBUSxTQUFTLFFBQVEsRUFBRTtBQUNqQyxNQUFJLFVBQVUsSUFBSTtBQUNoQixhQUFTLE9BQU8sT0FBTyxDQUFDO0FBRXhCLFFBQUksU0FBUyxXQUFXLEdBQUc7QUFDekIsZUFBUyxLQUFLLG9CQUFvQixXQUFXLE9BQU87QUFBQSxJQUMxRDtBQUFBLEVBQ0E7QUFDQTtBQ3RCQSxNQUNFLEVBQUUsa0JBQW1CLElBQUcsWUFDeEIsaUJBQWlCLENBQUE7QUFFbkIsU0FBUyxjQUFlLEtBQUs7QUFNM0IsUUFBTSxTQUFTLElBQUk7QUFFbkIsTUFDRSxXQUFXLFVBQ1IsT0FBTyxhQUFhLEtBQ3BCLE9BQU8sVUFBVSxTQUFTLG1CQUFtQixNQUFNLEtBQ3REO0FBSUYsTUFBSSxjQUFjLGdCQUFnQixTQUFTO0FBRTNDLFNBQU8sZUFBZSxHQUFHO0FBQ3ZCLFVBQU0sUUFBUSxnQkFBaUIsYUFBYztBQUc3QyxRQUFJLE1BQU0sS0FBSyxTQUFTLFlBQVk7QUFDbEM7QUFDQTtBQUFBLElBQ047QUFFSSxRQUFJLE1BQU0sS0FBSyxTQUFTLFdBQVc7QUFDakM7QUFBQSxJQUNOO0FBRUksUUFBSSxNQUFNLE1BQU0sYUFBYSxLQUFNO0FBRW5DO0FBQUEsRUFDSjtBQUVFLFdBQVMsSUFBSSxlQUFlLFNBQVMsR0FBRyxLQUFLLEdBQUcsS0FBSztBQUNuRCxVQUFNLFFBQVEsZUFBZ0IsQ0FBQztBQUUvQixTQUVJLE1BQU0sU0FBUyxVQUFVLFFBQ3RCLE1BQU0sU0FBUyxNQUFNLFNBQVMsTUFBTSxNQUFNLFdBRzdDLFdBQVcsU0FBUyxRQUVsQixNQUFNLFNBQVMsVUFBVSxRQUN0QixNQUFNLFNBQVMsTUFBTSxTQUFTLE1BQU0sTUFBTSxRQUdqRDtBQUdBLFVBQUksZ0JBQWdCO0FBQ3BCLFlBQU0sZUFBZSxHQUFHO0FBQUEsSUFDOUIsT0FDUztBQUNIO0FBQUEsSUFDTjtBQUFBLEVBQ0E7QUFDQTtBQUVPLFNBQVMsZ0JBQWlCLG1CQUFtQjtBQUNsRCxpQkFBZSxLQUFLLGlCQUFpQjtBQUVyQyxNQUFJLGVBQWUsV0FBVyxHQUFHO0FBQy9CLGFBQVMsaUJBQWlCLGFBQWEsZUFBZSxpQkFBaUI7QUFDdkUsYUFBUyxpQkFBaUIsY0FBYyxlQUFlLGlCQUFpQjtBQUFBLEVBQzVFO0FBQ0E7QUFFTyxTQUFTLG1CQUFvQixtQkFBbUI7QUFDckQsUUFBTSxRQUFRLGVBQWUsVUFBVSxDQUFBQyxPQUFLQSxPQUFNLGlCQUFpQjtBQUVuRSxNQUFJLFVBQVUsSUFBSTtBQUNoQixtQkFBZSxPQUFPLE9BQU8sQ0FBQztBQUU5QixRQUFJLGVBQWUsV0FBVyxHQUFHO0FBTS9CLGVBQVMsb0JBQW9CLGFBQWEsZUFBZSxpQkFBaUI7QUFDMUUsZUFBUyxvQkFBb0IsY0FBYyxlQUFlLGlCQUFpQjtBQUFBLElBQ2pGO0FBQUEsRUFDQTtBQUNBO0FDOUZBLElBQUksUUFBUTtBQUVMLFNBQVMsaUJBQWtCLEtBQUs7QUFDckMsUUFBTSxRQUFRLElBQUksTUFBTSxHQUFHO0FBQzNCLE1BQUksTUFBTSxXQUFXLEdBQUc7QUFDdEIsV0FBTztBQUFBLEVBQ1g7QUFDRSxNQUFJLENBQUUsT0FBTyxVQUFVLFFBQVUsRUFBQyxTQUFTLE1BQU8sRUFBRyxNQUFNLE1BQU07QUFDL0QsWUFBUSxNQUFNLCtEQUErRDtBQUM3RSxXQUFPO0FBQUEsRUFDWDtBQUNFLE1BQUksQ0FBRSxRQUFRLFVBQVUsU0FBUyxTQUFTLE9BQVEsU0FBUyxNQUFPLENBQUcsQ0FBQSxNQUFNLE1BQU07QUFDL0UsWUFBUSxNQUFNLHVFQUF1RTtBQUNyRixXQUFPO0FBQUEsRUFDWDtBQUNFLFNBQU87QUFDVDtBQUVPLFNBQVMsZUFBZ0IsS0FBSztBQUNuQyxNQUFJLENBQUMsS0FBSztBQUFFLFdBQU87QUFBQSxFQUFJO0FBQ3ZCLE1BQUksSUFBSSxXQUFXLEdBQUc7QUFBRSxXQUFPO0FBQUEsRUFBSztBQUNwQyxNQUFJLE9BQU8sSUFBSyxPQUFRLFlBQVksT0FBTyxJQUFLLENBQUcsTUFBSyxVQUFVO0FBQ2hFLFdBQU87QUFBQSxFQUNYO0FBQ0UsU0FBTztBQUNUO0FBRUEsTUFBTSxnQkFBZ0I7QUFBQSxFQUNwQixhQUFhO0FBQUEsRUFDYixhQUFhO0FBQUEsRUFDYixXQUFXO0FBQUEsRUFDWCxXQUFXO0FBQ2I7QUFFQyxDQUFFLFFBQVEsVUFBVSxPQUFPLEVBQUcsUUFBUSxTQUFPO0FBQzVDLGdCQUFlLEdBQUksR0FBSyxNQUFLLElBQUs7QUFDbEMsZ0JBQWUsR0FBSSxHQUFLLE1BQUssSUFBSztBQUNwQyxDQUFDO0FBRU0sU0FBUyxjQUFlLEtBQUssS0FBSztBQUN2QyxRQUFNLFFBQVEsSUFBSSxNQUFNLEdBQUc7QUFDM0IsU0FBTztBQUFBLElBQ0wsVUFBVSxNQUFPLENBQUc7QUFBQSxJQUNwQixZQUFZLGNBQWUsR0FBSSxNQUFPLENBQUMsS0FBUSxRQUFRLE9BQU8sUUFBUSxLQUFLLEVBQUc7QUFBQSxFQUNsRjtBQUNBO0FBRU8sU0FBUyxlQUFnQixJQUFJLFFBQVE7QUFDMUMsTUFBSSxFQUFFLEtBQUssTUFBTSxPQUFPLFFBQVEsT0FBTyxXQUFXLEdBQUcsc0JBQXFCO0FBRTFFLE1BQUksV0FBVyxRQUFRO0FBQ3JCLFdBQU8sT0FBUSxDQUFDO0FBQ2hCLFlBQVEsT0FBUSxDQUFDO0FBQ2pCLGNBQVUsT0FBUSxDQUFDO0FBQ25CLGFBQVMsT0FBUSxDQUFDO0FBRWxCLGFBQVMsT0FBUSxDQUFDO0FBQ2xCLGNBQVUsT0FBUSxDQUFDO0FBQUEsRUFDdkI7QUFFRSxTQUFPO0FBQUEsSUFDTDtBQUFBLElBQUs7QUFBQSxJQUFRO0FBQUEsSUFDYjtBQUFBLElBQU07QUFBQSxJQUFPO0FBQUEsSUFDYixRQUFRLFFBQVEsUUFBUSxRQUFRO0FBQUEsSUFDaEMsUUFBUSxPQUFPLFNBQVMsT0FBTztBQUFBLEVBQ25DO0FBQ0E7QUFFQSxTQUFTLHVCQUF3QixJQUFJLGdCQUFnQixRQUFRO0FBQzNELE1BQUksRUFBRSxLQUFLLEtBQU0sSUFBRyxHQUFHLHNCQUFxQjtBQUU1QyxTQUFPLGVBQWU7QUFDdEIsVUFBUSxlQUFlO0FBRXZCLE1BQUksV0FBVyxRQUFRO0FBQ3JCLFdBQU8sT0FBUSxDQUFDO0FBQ2hCLFlBQVEsT0FBUSxDQUFDO0FBQUEsRUFDckI7QUFFRSxTQUFPO0FBQUEsSUFDTDtBQUFBLElBQUssUUFBUSxNQUFNO0FBQUEsSUFBRyxRQUFRO0FBQUEsSUFDOUI7QUFBQSxJQUFNLE9BQU8sT0FBTztBQUFBLElBQUcsT0FBTztBQUFBLElBQzlCLFFBQVE7QUFBQSxJQUNSLFFBQVE7QUFBQSxFQUNaO0FBQ0E7QUFFQSxTQUFTLGVBQWdCLE9BQU8sUUFBUTtBQUN0QyxTQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxRQUFRLFNBQVM7QUFBQSxJQUNqQixRQUFRO0FBQUEsSUFDUixNQUFNO0FBQUEsSUFDTixRQUFRLFFBQVE7QUFBQSxJQUNoQixPQUFPO0FBQUEsRUFDWDtBQUNBO0FBRUEsU0FBUyxnQkFBaUIsYUFBYSxhQUFhLGNBQWMsWUFBWTtBQUM1RSxTQUFPO0FBQUEsSUFDTCxLQUFLLFlBQWEsYUFBYSxRQUFVLElBQUcsWUFBYSxXQUFXLFFBQVU7QUFBQSxJQUM5RSxNQUFNLFlBQWEsYUFBYSxVQUFVLElBQUssWUFBYSxXQUFXLFVBQVU7QUFBQSxFQUNyRjtBQUNBO0FBRU8sU0FBUyxZQUFhLEtBQUssY0FBYyxHQUFHO0FBQ2pELE1BQ0UsSUFBSSxhQUFhLFFBQ2QsSUFBSSxhQUFhLFFBQ2pCLGNBQWMsRUFDakI7QUFJRixNQUFJLElBQUksU0FBUyxpQkFBaUIsS0FBSyxJQUFJLFNBQVMsZ0JBQWdCLEdBQUc7QUFDckUsZUFBVyxNQUFNO0FBQ2Ysa0JBQVksS0FBSyxjQUFjLENBQUM7QUFBQSxJQUN0QyxHQUFPLEVBQUU7QUFDTDtBQUFBLEVBQ0o7QUFFRSxRQUFNO0FBQUEsSUFDSjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0osSUFBTTtBQUVKLE1BQUksT0FBTyxHQUFHLFFBQVEsUUFBUSxPQUFPLG1CQUFtQixRQUFRO0FBRzlELFVBQU0sS0FBSyxTQUFTLEtBQUs7QUFDekIsVUFBTSxFQUFFLFlBQVksTUFBTSxXQUFXLElBQUcsSUFBSyxPQUFPO0FBRXBELFFBQUksU0FBUyxRQUFRO0FBQ25CLFNBQUcsWUFBWSxlQUFlLE9BQU8sSUFBSTtBQUN6QyxlQUFTO0FBQUEsSUFDZjtBQUNJLFFBQUksUUFBUSxPQUFPO0FBQ2pCLFNBQUcsWUFBWSxjQUFjLE1BQU0sSUFBSTtBQUN2QyxjQUFRO0FBQUEsSUFDZDtBQUFBLEVBQ0E7QUFNRSxRQUFNLEVBQUUsWUFBWSxjQUFjO0FBRWxDLFFBQU0sY0FBYyxtQkFBbUIsU0FDbkMsZUFBZSxVQUFVLFVBQVUsT0FBTyxDQUFFLEdBQUcsQ0FBQyxJQUFLLE1BQU0sSUFDM0QsdUJBQXVCLFVBQVUsZ0JBQWdCLE1BQU07QUFXM0QsU0FBTyxPQUFPLFNBQVMsT0FBTztBQUFBLElBQzVCLEtBQUs7QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLFVBQVU7QUFBQSxJQUNWLFdBQVc7QUFBQSxJQUNYO0FBQUEsSUFDQTtBQUFBLElBQ0EsWUFBWTtBQUFBLEVBQ2IsQ0FBQTtBQUVELFFBQU0sRUFBRSxhQUFhLGFBQWEsY0FBYyxhQUFZLElBQUs7QUFDakUsUUFBTSxFQUFFLFNBQVMsU0FBUSxJQUFLLFFBQVEsUUFBUSxVQUFVLE9BQ3BELEVBQUUsU0FBUyxLQUFLLElBQUksWUFBWSxPQUFPLFdBQVcsR0FBRyxVQUFVLFVBQVUsT0FBTyxLQUFLLElBQUksWUFBWSxRQUFRLFlBQVksSUFBSSxhQUFZLElBQ3pJLEVBQUUsU0FBUyxhQUFhLFVBQVUsYUFBWTtBQUVsRCxNQUFJLFVBQVUsRUFBRSxVQUFVLFVBQVM7QUFFbkMsTUFBSSxRQUFRLFFBQVEsVUFBVSxNQUFNO0FBQ2xDLFlBQVEsV0FBVyxZQUFZLFFBQVE7QUFDdkMsUUFBSSxVQUFVLE1BQU07QUFDbEIsY0FBUSxZQUFZLFlBQVksU0FBUztBQUFBLElBQy9DO0FBQUEsRUFDQTtBQUVFLFNBQU8sT0FBTyxTQUFTLE9BQU8sT0FBTztBQUVyQyxRQUFNLGNBQWMsZUFBZSxTQUFTLFFBQVE7QUFDcEQsTUFBSSxRQUFRLGdCQUFnQixhQUFhLGFBQWEsY0FBYyxVQUFVO0FBRTlFLE1BQUksbUJBQW1CLFVBQVUsV0FBVyxRQUFRO0FBQ2xELG9CQUFnQixPQUFPLGFBQWEsYUFBYSxjQUFjLFVBQVU7QUFBQSxFQUM3RSxPQUNPO0FBQ0gsVUFBTSxFQUFFLEtBQUssS0FBSSxJQUFLO0FBR3RCLG9CQUFnQixPQUFPLGFBQWEsYUFBYSxjQUFjLFVBQVU7QUFFekUsUUFBSSxhQUFhO0FBR2pCLFFBQUksTUFBTSxRQUFRLEtBQUs7QUFDckIsbUJBQWE7QUFDYixZQUFNLFVBQVUsSUFBSSxPQUFRLENBQUM7QUFDN0Isa0JBQVksU0FBUyxZQUFZLE9BQU87QUFDeEMsa0JBQVksVUFBVSxVQUFVO0FBQUEsSUFDdEM7QUFHSSxRQUFJLE1BQU0sU0FBUyxNQUFNO0FBQ3ZCLG1CQUFhO0FBQ2IsWUFBTSxVQUFVLElBQUksT0FBUSxDQUFDO0FBQzdCLGtCQUFZLFNBQVMsWUFBWSxRQUFRO0FBQ3pDLGtCQUFZLFNBQVMsVUFBVTtBQUFBLElBQ3JDO0FBRUksUUFBSSxlQUFlLE1BQU07QUFFdkIsY0FBUSxnQkFBZ0IsYUFBYSxhQUFhLGNBQWMsVUFBVTtBQUcxRSxzQkFBZ0IsT0FBTyxhQUFhLGFBQWEsY0FBYyxVQUFVO0FBQUEsSUFDL0U7QUFBQSxFQUNBO0FBRUUsWUFBVTtBQUFBLElBQ1IsS0FBSyxNQUFNLE1BQU07QUFBQSxJQUNqQixNQUFNLE1BQU0sT0FBTztBQUFBLEVBQ3ZCO0FBRUUsTUFBSSxNQUFNLGNBQWMsUUFBUTtBQUM5QixZQUFRLFlBQVksTUFBTSxZQUFZO0FBRXRDLFFBQUksWUFBWSxTQUFTLE1BQU0sV0FBVztBQUN4QyxjQUFRLFlBQVksUUFBUTtBQUFBLElBQ2xDO0FBQUEsRUFDQTtBQUNFLE1BQUksTUFBTSxhQUFhLFFBQVE7QUFDN0IsWUFBUSxXQUFXLE1BQU0sV0FBVztBQUVwQyxRQUFJLFlBQVksUUFBUSxNQUFNLFVBQVU7QUFDdEMsY0FBUSxXQUFXLFFBQVE7QUFBQSxJQUNqQztBQUFBLEVBQ0E7QUFFRSxTQUFPLE9BQU8sU0FBUyxPQUFPLE9BQU87QUFHckMsTUFBSSxTQUFTLGNBQWMsV0FBVztBQUNwQyxhQUFTLFlBQVk7QUFBQSxFQUN6QjtBQUNFLE1BQUksU0FBUyxlQUFlLFlBQVk7QUFDdEMsYUFBUyxhQUFhO0FBQUEsRUFDMUI7QUFDQTtBQUVBLFNBQVMsZ0JBQWlCLE9BQU8sYUFBYSxhQUFhLGNBQWMsWUFBWTtBQUNuRixRQUNFLGdCQUFnQixZQUFZLFFBQzVCLGVBQWUsWUFBWSxPQUMzQixTQUFTLGtCQUFtQixHQUM1QixjQUFjLE9BQU8sY0FBYyxRQUNuQyxhQUFhLFNBQVMsS0FBSztBQUU3QixNQUFJLE1BQU0sTUFBTSxLQUFLLE1BQU0sTUFBTSxnQkFBZ0IsYUFBYTtBQUM1RCxRQUFJLFdBQVcsYUFBYSxVQUFVO0FBQ3BDLFlBQU0sTUFBTSxZQUFhLGFBQWEsUUFBUSxJQUFLLGNBQWMsSUFDN0QsS0FBSyxJQUFJLEdBQUcsY0FBYyxhQUFhLElBQ3ZDO0FBQ0osWUFBTSxZQUFZLEtBQUssSUFBSSxlQUFlLFdBQVc7QUFBQSxJQUMzRCxXQUNhLFlBQWEsYUFBYSxRQUFRLElBQUssY0FBYyxHQUFHO0FBQy9ELFlBQU0sVUFBVSxLQUFLO0FBQUEsUUFDbkI7QUFBQSxRQUNBLGFBQWEsYUFBYSxXQUN0QixZQUFZLFNBQ1gsYUFBYSxhQUFhLFdBQVcsV0FBVyxZQUFZLFNBQVMsWUFBWTtBQUFBLE1BQzlGO0FBQ00sWUFBTSxZQUFZLEtBQUssSUFBSSxlQUFlLE9BQU87QUFDakQsWUFBTSxNQUFNLEtBQUssSUFBSSxHQUFHLFVBQVUsYUFBYTtBQUFBLElBQ3JELE9BQ1M7QUFDSCxZQUFNLE1BQU0sS0FBSztBQUFBLFFBQUk7QUFBQSxRQUFHLGFBQWEsYUFBYSxXQUM5QyxZQUFZLFNBQ1gsYUFBYSxhQUFhLFdBQVcsV0FBVyxZQUFZLE1BQU0sWUFBWTtBQUFBLE1BQ3pGO0FBQ00sWUFBTSxZQUFZLEtBQUssSUFBSSxlQUFlLGNBQWMsTUFBTSxHQUFHO0FBQUEsSUFDdkU7QUFBQSxFQUNBO0FBRUUsTUFBSSxNQUFNLE9BQU8sS0FBSyxNQUFNLE9BQU8sZUFBZSxZQUFZO0FBQzVELFVBQU0sV0FBVyxLQUFLLElBQUksY0FBYyxVQUFVO0FBQ2xELFFBQUksV0FBVyxlQUFlLFVBQVU7QUFDdEMsWUFBTSxPQUFPLFlBQWEsYUFBYSxVQUFVLElBQUssYUFBYSxJQUMvRCxLQUFLLElBQUksR0FBRyxhQUFhLFlBQVksSUFDckM7QUFBQSxJQUNWLFdBQ2EsWUFBYSxhQUFhLFVBQVUsSUFBSyxhQUFhLEdBQUc7QUFDaEUsWUFBTSxVQUFVLEtBQUs7QUFBQSxRQUNuQjtBQUFBLFFBQ0EsYUFBYSxlQUFlLFdBQ3hCLFlBQVksU0FDWCxhQUFhLGVBQWUsV0FBVyxhQUFhLFlBQVksUUFBUSxZQUFZO0FBQUEsTUFDakc7QUFDTSxZQUFNLFdBQVcsS0FBSyxJQUFJLGNBQWMsT0FBTztBQUMvQyxZQUFNLE9BQU8sS0FBSyxJQUFJLEdBQUcsVUFBVSxNQUFNLFFBQVE7QUFBQSxJQUN2RCxPQUNTO0FBQ0gsWUFBTSxPQUFPLEtBQUs7QUFBQSxRQUFJO0FBQUEsUUFBRyxhQUFhLGVBQWUsV0FDakQsWUFBWSxTQUNYLGFBQWEsZUFBZSxXQUFXLGFBQWEsWUFBWSxPQUFPLFlBQVk7QUFBQSxNQUM5RjtBQUNNLFlBQU0sV0FBVyxLQUFLLElBQUksY0FBYyxhQUFhLE1BQU0sSUFBSTtBQUFBLElBQ3JFO0FBQUEsRUFDQTtBQUNBO0FDN1NBLE1BQUEsUUFBZSxnQkFBZ0I7QUFBQSxFQUM3QixNQUFNO0FBQUEsRUFFTixjQUFjO0FBQUEsRUFFZCxPQUFPO0FBQUEsSUFDTCxHQUFHO0FBQUEsSUFDSCxHQUFHO0FBQUEsSUFDSCxHQUFHO0FBQUEsSUFDSCxHQUFHO0FBQUEsSUFFSCxZQUFZO0FBQUEsSUFDWixXQUFXO0FBQUEsSUFDWCxvQkFBb0I7QUFBQSxJQUNwQixjQUFjO0FBQUEsSUFDZCxnQkFBZ0I7QUFBQSxJQUNoQixXQUFXO0FBQUEsSUFDWCxTQUFTO0FBQUEsSUFFVCxLQUFLO0FBQUEsSUFDTCxPQUFPO0FBQUEsSUFFUCxRQUFRO0FBQUEsSUFFUixRQUFRO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixXQUFXO0FBQUEsSUFDWjtBQUFBLElBQ0QsTUFBTTtBQUFBLE1BQ0osTUFBTTtBQUFBLE1BQ04sV0FBVztBQUFBLElBQ1o7QUFBQSxJQUNELFFBQVE7QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLFdBQVc7QUFBQSxJQUNaO0FBQUEsSUFFRCxjQUFjO0FBQUEsSUFFZCxlQUFlO0FBQUEsSUFFZixXQUFXO0FBQUEsTUFDVCxNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsSUFDVjtBQUFBLElBQ0QsVUFBVTtBQUFBLE1BQ1IsTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLElBQ2Y7QUFBQSxFQUNHO0FBQUEsRUFFRCxPQUFPO0FBQUEsSUFDTCxHQUFHO0FBQUEsSUFDSDtBQUFBLElBQVM7QUFBQSxFQUNWO0FBQUEsRUFFRCxNQUFPLE9BQU8sRUFBRSxPQUFPLE1BQU0sTUFBSyxHQUFJO0FBQ3BDLFFBQUksZ0JBQWdCLE1BQU0sZ0JBQWdCLGlCQUFpQjtBQUUzRCxVQUFNLEtBQUssbUJBQWtCO0FBQzdCLFVBQU0sRUFBRSxNQUFLLElBQUs7QUFDbEIsVUFBTSxFQUFFLEdBQUUsSUFBSztBQUVmLFVBQU0sV0FBVyxJQUFJLElBQUk7QUFDekIsVUFBTSxVQUFVLElBQUksS0FBSztBQUV6QixVQUFNLG9CQUFvQjtBQUFBLE1BQVMsTUFDakMsTUFBTSxlQUFlLFFBQ2xCLE1BQU0sbUJBQW1CO0FBQUEsSUFDbEM7QUFFSSxVQUFNLFNBQVMsUUFBUSxPQUFPLEVBQUU7QUFDaEMsVUFBTSxFQUFFLGNBQWMsV0FBVSxJQUFLLFFBQU87QUFDNUMsVUFBTSxFQUFFLGdCQUFlLElBQUssV0FBVTtBQUN0QyxVQUFNLEVBQUUsaUJBQWlCLGdCQUFpQixJQUFHLGNBQWMsS0FBSztBQUNoRSxVQUFNLEVBQUUsbUJBQW1CLG1CQUFtQix3QkFBdUIsSUFBSyxnQkFBZ0IsT0FBTyxxQkFBcUI7QUFFdEgsVUFBTSxFQUFFLFVBQVUsUUFBUyxJQUFHLFVBQVUsRUFBRSxRQUFTLENBQUE7QUFFbkQsVUFBTSxFQUFFLEtBQU0sSUFBRyxlQUFlO0FBQUEsTUFDOUI7QUFBQSxNQUFTO0FBQUEsTUFBUztBQUFBLE1BQVk7QUFBQSxNQUM5QjtBQUFBLE1BQ0EsZ0JBQWdCO0FBQUEsSUFDakIsQ0FBQTtBQUVELFVBQU0sRUFBRSxZQUFZLFlBQVksYUFBWSxJQUFLLFVBQVUsSUFBSSxVQUFVLHFCQUFxQixNQUFNO0FBRXBHLFVBQU0sb0JBQW9CO0FBQUEsTUFDeEI7QUFBQSxNQUNBO0FBQUEsTUFDQSxlQUFnQixHQUFHO0FBQ2pCLFlBQUksTUFBTSxlQUFlLFFBQVEsUUFBUSxVQUFVLE1BQU07QUFDdkQsZUFBSyxDQUFDO0FBRU47QUFBQTtBQUFBLFlBRUUsRUFBRSxTQUFTLGdCQUVSLEVBQUUsT0FBTyxVQUFVLFNBQVMsb0JBQW9CO0FBQUEsWUFDbkQ7QUFDQSwyQkFBZSxDQUFDO0FBQUEsVUFDNUI7QUFFVSxpQkFBTztBQUFBLFFBQ2pCO0FBQUEsTUFDQTtBQUFBLElBQ0E7QUFFSSxVQUFNLGVBQWU7QUFBQSxNQUFTLE1BQzVCO0FBQUEsUUFDRSxNQUFNLFdBQ0osTUFBTSxVQUFVLE9BQU8sa0JBQWtCO0FBQUEsUUFFM0MsR0FBRyxLQUFLO0FBQUEsTUFDaEI7QUFBQSxJQUNBO0FBRUksVUFBTSxhQUFhLFNBQVMsTUFDMUIsTUFBTSxVQUFVLE9BQ1osYUFBYSxRQUNiLGNBQWMsTUFBTSxRQUFRLGFBQWEsR0FBRyxLQUFLLEdBQUcsQ0FDekQ7QUFFRCxVQUFNLFlBQVk7QUFBQSxNQUFTLE9BQ3hCLE1BQU0sV0FBVyxPQUFPLG9CQUFvQixPQUMxQyxPQUFPLFVBQVUsT0FBTyx5QkFBeUI7QUFBQSxJQUMxRDtBQUVJLFVBQU0sV0FBVyxTQUFTLE1BQ3hCLE1BQU0sY0FBYyxPQUNoQixFQUFFLFNBQVMsWUFBVyxJQUN0QixDQUFBLENBQ0w7QUFFRCxVQUFNLGVBQWU7QUFBQSxNQUFTLE1BQzVCLFFBQVEsVUFBVSxRQUFRLE1BQU0sZUFBZTtBQUFBLElBQ3JEO0FBRUksVUFBTSxjQUFjLFNBQU87QUFDekIsVUFBSSxRQUFRLE1BQU07QUFDaEIscUJBQWEsV0FBVztBQUN4Qix3QkFBZ0IsaUJBQWlCO0FBQUEsTUFDekMsT0FDVztBQUNILHdCQUFnQixXQUFXO0FBQzNCLDJCQUFtQixpQkFBaUI7QUFBQSxNQUM1QztBQUFBLElBQ0ssQ0FBQTtBQUVELGFBQVMsUUFBUztBQUNoQixpQkFBVyxNQUFNO0FBQ2YsWUFBSSxPQUFPLFNBQVM7QUFFcEIsWUFBSSxRQUFTLEtBQUssU0FBUyxTQUFTLGFBQWEsTUFBTSxNQUFPO0FBQzVELGlCQUFPLEtBQUssY0FBYyxtREFBbUQsS0FDeEUsS0FBSyxjQUFjLHFEQUFxRCxLQUN4RSxLQUFLLGNBQWMsK0JBQStCLEtBQ2xEO0FBQ0wsZUFBSyxNQUFNLEVBQUUsZUFBZSxLQUFNLENBQUE7QUFBQSxRQUM1QztBQUFBLE1BQ08sQ0FBQTtBQUFBLElBQ1A7QUFFSSxhQUFTLFdBQVksS0FBSztBQUN4QixzQkFBZ0IsTUFBTSxjQUFjLFFBQ2hDLFNBQVMsZ0JBQ1Q7QUFFSixrQkFBWSxVQUFVO0FBRXRCLGlCQUFVO0FBQ1YsNEJBQXFCO0FBRXJCLHVCQUFpQjtBQUVqQixVQUFJLFFBQVEsV0FBVyxNQUFNLGlCQUFpQixNQUFNLGNBQWM7QUFDaEUsY0FBTSxNQUFNLFNBQVMsR0FBRztBQUV4QixZQUFJLElBQUksU0FBUyxRQUFRO0FBQ3ZCLGdCQUFNLEVBQUUsS0FBSyxLQUFNLElBQUcsU0FBUyxNQUFNLHNCQUFxQjtBQUMxRCwyQkFBaUIsRUFBRSxNQUFNLElBQUksT0FBTyxNQUFNLEtBQUssSUFBSSxNQUFNLElBQUc7QUFBQSxRQUN0RTtBQUFBLE1BQ0E7QUFFTSxVQUFJLG9CQUFvQixRQUFRO0FBQzlCLDBCQUFrQjtBQUFBLFVBQ2hCLE1BQU0sR0FBRyxPQUFPLFFBQVEsTUFBTSxHQUFHLE9BQU8sU0FBUyxNQUFNLE1BQU0sT0FBTyxNQUFNLE1BQU0sU0FBUyxNQUFNLEdBQUcsS0FBSztBQUFBLFVBQ3ZHO0FBQUEsUUFDVjtBQUFBLE1BQ0E7QUFFTSxVQUFJLE1BQU0sWUFBWSxNQUFNO0FBQzFCLGlCQUFTLGNBQWMsS0FBSTtBQUFBLE1BQ25DO0FBR00sbUJBQWEsTUFBTTtBQUNqQix1QkFBYztBQUNkLGNBQU0sWUFBWSxRQUFRLE1BQUs7QUFBQSxNQUNoQyxDQUFBO0FBR0Qsc0JBQWdCLE1BQU07QUFFcEIsWUFBSSxHQUFHLFNBQVMsR0FBRyxRQUFRLE1BQU07QUFHL0IsMkJBQWlCLE1BQU07QUFDdkIsbUJBQVMsTUFBTSxNQUFLO0FBQUEsUUFDOUI7QUFFUSx1QkFBYztBQUNkLG1CQUFXLElBQUk7QUFDZixhQUFLLFFBQVEsR0FBRztBQUFBLE1BQ2pCLEdBQUUsTUFBTSxrQkFBa0I7QUFBQSxJQUNqQztBQUVJLGFBQVMsV0FBWSxLQUFLO0FBQ3hCLGlCQUFVO0FBQ1YsaUJBQVU7QUFFVixvQkFBYyxJQUFJO0FBRWxCLFVBQ0Usa0JBQWtCO0FBQUEsT0FHaEIsUUFBUSxVQUVMLElBQUksa0JBQWtCLE9BRTNCO0FBQ0EsVUFBRSxLQUFLLEtBQUssUUFBUSxLQUFLLE1BQU0sSUFDM0IsY0FBYyxRQUFRLGlDQUFpQyxJQUN2RCxXQUNDLGVBQWUsTUFBSztBQUV6Qix3QkFBZ0I7QUFBQSxNQUN4QjtBQUdNLHNCQUFnQixNQUFNO0FBQ3BCLG1CQUFXLElBQUk7QUFDZixhQUFLLFFBQVEsR0FBRztBQUFBLE1BQ2pCLEdBQUUsTUFBTSxrQkFBa0I7QUFBQSxJQUNqQztBQUVJLGFBQVMsY0FBZSxRQUFRO0FBQzlCLHVCQUFpQjtBQUVqQixVQUFJLG9CQUFvQixRQUFRO0FBQzlCLHdCQUFlO0FBQ2YsMEJBQWtCO0FBQUEsTUFDMUI7QUFFTSxVQUFJLFdBQVcsUUFBUSxRQUFRLFVBQVUsTUFBTTtBQUM3Qyx1QkFBZSxVQUFVO0FBQ3pCLGdDQUF1QjtBQUN2QiwyQkFBbUIsaUJBQWlCO0FBQ3BDLHdCQUFnQixXQUFXO0FBQUEsTUFDbkM7QUFFTSxVQUFJLFdBQVcsTUFBTTtBQUNuQix3QkFBZ0I7QUFBQSxNQUN4QjtBQUFBLElBQ0E7QUFFSSxhQUFTLHdCQUF5QjtBQUNoQyxVQUFJLFNBQVMsVUFBVSxRQUFRLE1BQU0saUJBQWlCLFFBQVE7QUFDNUQsMEJBQWtCLFFBQVEsZ0JBQWdCLFNBQVMsT0FBTyxNQUFNLFlBQVk7QUFDNUUsMEJBQWtCLGtCQUFrQixPQUFPLGNBQWM7QUFBQSxNQUNqRTtBQUFBLElBQ0E7QUFFSSxhQUFTLFlBQWEsR0FBRztBQUd2QixVQUFJLG1CQUFtQixNQUFNO0FBQzNCLHlCQUFpQixPQUFPLENBQUM7QUFDekIsYUFBSyxTQUFTLENBQUM7QUFBQSxNQUN2QixPQUNXO0FBQ0gseUJBQWlCO0FBQUEsTUFDekI7QUFBQSxJQUNBO0FBRUksYUFBUyxXQUFZLEtBQUs7QUFFeEIsVUFDRSxhQUFhLFVBQVUsUUFDcEIsTUFBTSxZQUFZLFFBQ2xCLGNBQWMsU0FBUyxPQUFPLElBQUksTUFBTSxNQUFNLE1BQ2pEO0FBQ0EsY0FBSztBQUFBLE1BQ2I7QUFBQSxJQUNBO0FBRUksYUFBUyxZQUFhLEtBQUs7QUFDekIsVUFBSSxNQUFNLGlCQUFpQixNQUFNO0FBQy9CLGFBQUssV0FBVztBQUNoQixhQUFLLEdBQUc7QUFBQSxNQUNoQjtBQUFBLElBQ0E7QUFFSSxhQUFTLGlCQUFrQjtBQUN6QixrQkFBWTtBQUFBLFFBQ1YsVUFBVSxTQUFTO0FBQUEsUUFDbkIsUUFBUSxNQUFNO0FBQUEsUUFDZCxVQUFVLFNBQVM7QUFBQSxRQUNuQixjQUFjLGFBQWE7QUFBQSxRQUMzQixZQUFZLFdBQVc7QUFBQSxRQUN2QjtBQUFBLFFBQ0EsS0FBSyxNQUFNO0FBQUEsUUFDWCxPQUFPLE1BQU07QUFBQSxRQUNiLFdBQVcsTUFBTTtBQUFBLFFBQ2pCLFVBQVUsTUFBTTtBQUFBLE1BQ2pCLENBQUE7QUFBQSxJQUNQO0FBRUksYUFBUyxzQkFBdUI7QUFDOUIsYUFBTztBQUFBLFFBQ0w7QUFBQSxRQUNBLGdCQUFnQjtBQUFBLFFBQ2hCLE1BQ0UsUUFBUSxVQUFVLE9BQ2QsRUFBRSxPQUFPO0FBQUEsVUFDVCxNQUFNO0FBQUEsVUFDTixHQUFHO0FBQUEsVUFDSCxLQUFLO0FBQUEsVUFDTCxVQUFVO0FBQUEsVUFDVixPQUFPO0FBQUEsWUFDTCxvQ0FBb0MsVUFBVTtBQUFBLFlBQzlDLE1BQU07QUFBQSxVQUNQO0FBQUEsVUFDRCxPQUFPO0FBQUEsWUFDTCxNQUFNO0FBQUEsWUFDTixnQkFBZ0I7QUFBQSxVQUNqQjtBQUFBLFVBQ0QsR0FBRyxTQUFTO0FBQUEsUUFDMUIsR0FBZSxNQUFNLE1BQU0sT0FBTyxDQUFDLElBQ3JCO0FBQUEsTUFFZDtBQUFBLElBQ0E7QUFFSSxvQkFBZ0IsYUFBYTtBQUc3QixXQUFPLE9BQU8sT0FBTyxFQUFFLE9BQU8sZUFBZ0IsQ0FBQTtBQUU5QyxXQUFPO0FBQUEsRUFDWDtBQUNBLENBQUM7QUN0WGMsU0FBQSxXQUFVLFNBQVMsTUFBTSxtQkFBbUI7QUFDekQsTUFBSTtBQUVKLFdBQVMsb0JBQXFCO0FBQzVCLFFBQUksaUJBQWlCLFFBQVE7QUFDM0IsY0FBUSxPQUFPLFlBQVk7QUFDM0IscUJBQWU7QUFBQSxJQUNyQjtBQUFBLEVBQ0E7QUFFRSxrQkFBZ0IsTUFBTTtBQUNwQixZQUFRLFVBQVUsUUFBUSxrQkFBaUI7QUFBQSxFQUM1QyxDQUFBO0FBRUQsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUVBLGVBQWdCO0FBQ2QscUJBQWU7QUFBQSxRQUNiLFdBQVcsTUFBTSxrQkFBa0IsVUFBVTtBQUFBLFFBQzdDLFNBQVM7QUFBQSxNQUNqQjtBQUVNLGNBQVEsSUFBSSxZQUFZO0FBQUEsSUFDOUI7QUFBQSxFQUNBO0FBQ0E7QUMxQkEsSUFDRSxhQUFhLEdBQ2IsaUJBQ0EsaUJBQ0EsY0FDQSxrQkFBa0IsT0FDbEIsVUFDQSxTQUNBLE1BQ0EsYUFBYTtBQUVmLFNBQVMsUUFBUyxHQUFHO0FBQ25CLE1BQUksb0JBQW9CLENBQUMsR0FBRztBQUMxQixtQkFBZSxDQUFDO0FBQUEsRUFDcEI7QUFDQTtBQUVBLFNBQVMsb0JBQXFCLEdBQUc7QUFDL0IsTUFBSSxFQUFFLFdBQVcsU0FBUyxRQUFRLEVBQUUsT0FBTyxVQUFVLFNBQVMsb0JBQW9CLEdBQUc7QUFDbkYsV0FBTztBQUFBLEVBQ1g7QUFFRSxRQUNFLE9BQU8sYUFBYSxDQUFDLEdBQ3JCLFFBQVEsRUFBRSxZQUFZLENBQUMsRUFBRSxRQUN6QixVQUFVLENBQUMsU0FBUyxLQUFLLElBQUksRUFBRSxNQUFNLEtBQUssS0FBSyxJQUFJLEVBQUUsTUFBTSxHQUMzRCxRQUFRLFNBQVMsVUFBVSxFQUFFLFNBQVMsRUFBRTtBQUUxQyxXQUFTLFFBQVEsR0FBRyxRQUFRLEtBQUssUUFBUSxTQUFTO0FBQ2hELFVBQU0sS0FBSyxLQUFNLEtBQUs7QUFFdEIsUUFBSSxhQUFhLElBQUksT0FBTyxHQUFHO0FBQzdCLGFBQU8sVUFFRCxRQUFRLEtBQUssR0FBRyxjQUFjLElBQzFCLE9BQ0EsUUFBUSxLQUFLLEdBQUcsWUFBWSxHQUFHLGlCQUFpQixHQUFHLGVBR3ZELFFBQVEsS0FBSyxHQUFHLGVBQWUsSUFDM0IsT0FDQSxRQUFRLEtBQUssR0FBRyxhQUFhLEdBQUcsZ0JBQWdCLEdBQUc7QUFBQSxJQUVuRTtBQUFBLEVBQ0E7QUFFRSxTQUFPO0FBQ1Q7QUFFQSxTQUFTLGNBQWUsR0FBRztBQUN6QixNQUFJLEVBQUUsV0FBVyxVQUFVO0FBR3pCLGFBQVMsaUJBQWlCLFlBQVksU0FBUyxpQkFBaUI7QUFBQSxFQUNwRTtBQUNBO0FBRUEsU0FBUyxjQUFlLEtBQUs7QUFDM0IsTUFBSSxvQkFBb0IsS0FBTTtBQUU5QixvQkFBa0I7QUFFbEIsd0JBQXNCLE1BQU07QUFDMUIsc0JBQWtCO0FBRWxCLFVBQ0UsRUFBRSxPQUFNLElBQUssSUFBSSxRQUNqQixFQUFFLGNBQWMsVUFBVyxJQUFHLFNBQVM7QUFFekMsUUFBSSxpQkFBaUIsVUFBVSxXQUFXLE9BQU8sYUFBYTtBQUM1RCxxQkFBZSxlQUFlO0FBQzlCLGVBQVMsaUJBQWlCLFlBQVk7QUFBQSxJQUM1QztBQUVJLFFBQUksWUFBWSxjQUFjO0FBQzVCLGVBQVMsaUJBQWlCLGFBQWEsS0FBSyxNQUFNLFlBQVksZ0JBQWdCLENBQUM7QUFBQSxJQUNyRjtBQUFBLEVBQ0csQ0FBQTtBQUNIO0FBRUEsU0FBUyxNQUFPLFFBQVE7QUFDdEIsUUFDRSxPQUFPLFNBQVMsTUFDaEIsY0FBYyxPQUFPLG1CQUFtQjtBQUUxQyxNQUFJLFdBQVcsT0FBTztBQUNwQixVQUFNLEVBQUUsV0FBVyxVQUFXLElBQUcsT0FBTyxpQkFBaUIsSUFBSTtBQUU3RCxzQkFBa0IsNEJBQTRCLE1BQU07QUFDcEQsc0JBQWtCLDBCQUEwQixNQUFNO0FBQ2xELGVBQVcsS0FBSyxNQUFNO0FBQ3RCLGNBQVUsS0FBSyxNQUFNO0FBRXJCLFdBQU8sT0FBTyxTQUFTO0FBRXZCLFNBQUssTUFBTSxPQUFPLElBQUssZUFBZTtBQUN0QyxTQUFLLE1BQU0sTUFBTSxJQUFLLGVBQWU7QUFFckMsUUFBSSxjQUFjLGFBQWEsY0FBYyxZQUFZLEtBQUssY0FBYyxPQUFPLGFBQWE7QUFDOUYsV0FBSyxVQUFVLElBQUksMkJBQTJCO0FBQUEsSUFDcEQ7QUFDSSxRQUFJLGNBQWMsYUFBYSxjQUFjLFlBQVksS0FBSyxlQUFlLE9BQU8sY0FBYztBQUNoRyxXQUFLLFVBQVUsSUFBSSwyQkFBMkI7QUFBQSxJQUNwRDtBQUVJLFNBQUssVUFBVSxJQUFJLHdCQUF3QjtBQUMzQyxhQUFTLG1CQUFtQjtBQUU1QixRQUFJLE9BQU8sR0FBRyxRQUFRLE1BQU07QUFDMUIsVUFBSSxnQkFBZ0IsTUFBTTtBQUN4QixlQUFPLFNBQVMsR0FBRyxDQUFDO0FBQ3BCLGVBQU8sZUFBZSxpQkFBaUIsVUFBVSxlQUFlLFdBQVcsY0FBYztBQUN6RixlQUFPLGVBQWUsaUJBQWlCLFVBQVUsZUFBZSxXQUFXLGNBQWM7QUFDekYsZUFBTyxTQUFTLEdBQUcsQ0FBQztBQUFBLE1BQzVCLE9BQ1c7QUFDSCxlQUFPLGlCQUFpQixVQUFVLGVBQWUsV0FBVyxjQUFjO0FBQUEsTUFDbEY7QUFBQSxJQUNBO0FBQUEsRUFDQTtBQUVFLE1BQUksT0FBTyxHQUFHLFlBQVksUUFBUSxPQUFPLEdBQUcsUUFBUSxNQUFNO0FBRXhELFdBQVEsR0FBSSxxQkFBd0IsRUFBQyxTQUFTLFNBQVMsV0FBVyxVQUFVO0FBQUEsRUFDaEY7QUFFRSxNQUFJLFdBQVcsVUFBVTtBQUN2QixRQUFJLE9BQU8sR0FBRyxRQUFRLE1BQU07QUFDMUIsVUFBSSxnQkFBZ0IsTUFBTTtBQUN4QixlQUFPLGVBQWUsb0JBQW9CLFVBQVUsZUFBZSxXQUFXLGNBQWM7QUFDNUYsZUFBTyxlQUFlLG9CQUFvQixVQUFVLGVBQWUsV0FBVyxjQUFjO0FBQUEsTUFDcEcsT0FDVztBQUNILGVBQU8sb0JBQW9CLFVBQVUsZUFBZSxXQUFXLGNBQWM7QUFBQSxNQUNyRjtBQUFBLElBQ0E7QUFFSSxTQUFLLFVBQVUsT0FBTyx3QkFBd0I7QUFDOUMsU0FBSyxVQUFVLE9BQU8sMkJBQTJCO0FBQ2pELFNBQUssVUFBVSxPQUFPLDJCQUEyQjtBQUVqRCxhQUFTLG1CQUFtQjtBQUU1QixTQUFLLE1BQU0sT0FBTztBQUNsQixTQUFLLE1BQU0sTUFBTTtBQUdqQixRQUFJLE9BQU8sU0FBUyxTQUFTLE1BQU07QUFDakMsYUFBTyxTQUFTLGlCQUFpQixlQUFlO0FBQUEsSUFDdEQ7QUFFSSxtQkFBZTtBQUFBLEVBQ25CO0FBQ0E7QUFFZSxTQUFRLGNBQUUsT0FBTztBQUM5QixNQUFJLFNBQVM7QUFFYixNQUFJLFVBQVUsTUFBTTtBQUNsQjtBQUVBLFFBQUksZUFBZSxNQUFNO0FBQ3ZCLG1CQUFhLFVBQVU7QUFDdkIsbUJBQWE7QUFDYjtBQUFBLElBQ047QUFFSSxRQUFJLGFBQWEsRUFBRztBQUFBLEVBQ3hCLE9BQ087QUFDSCxRQUFJLGVBQWUsRUFBRztBQUV0QjtBQUVBLFFBQUksYUFBYSxFQUFHO0FBRXBCLGFBQVM7QUFFVCxRQUFJLE9BQU8sR0FBRyxRQUFRLFFBQVEsT0FBTyxHQUFHLGlCQUFpQixNQUFNO0FBQzdELHFCQUFlLFFBQVEsYUFBYSxVQUFVO0FBQzlDLG1CQUFhLFdBQVcsTUFBTTtBQUM1QixjQUFNLE1BQU07QUFDWixxQkFBYTtBQUFBLE1BQ3JCLEdBQVMsR0FBRztBQUNOO0FBQUEsSUFDTjtBQUFBLEVBQ0E7QUFFRSxRQUFNLE1BQU07QUFDZDtBQy9MZSxTQUFBLG1CQUFZO0FBQ3pCLE1BQUk7QUFFSixTQUFPO0FBQUEsSUFDTCxrQkFBbUIsT0FBTztBQUN4QixVQUNFLFVBQVUsaUJBQ04saUJBQWlCLFVBQVUsVUFBVSxPQUN6QztBQUNBLHVCQUFlO0FBQ2Ysc0JBQWMsS0FBSztBQUFBLE1BQzNCO0FBQUEsSUFDQTtBQUFBLEVBQ0E7QUFDQTtBQ0NBLElBQUksa0JBQWtCO0FBRXRCLE1BQU0sZ0JBQWdCO0FBQUEsRUFDcEIsVUFBVTtBQUFBLEVBQ1YsS0FBSztBQUFBLEVBQ0wsUUFBUTtBQUFBLEVBQ1IsT0FBTztBQUFBLEVBQ1AsTUFBTTtBQUNSO0FBRUEsTUFBTSxxQkFBcUI7QUFBQSxFQUN6QixVQUFVLENBQUUsU0FBUyxPQUFTO0FBQUEsRUFDOUIsS0FBSyxDQUFFLGNBQWMsVUFBWTtBQUFBLEVBQ2pDLFFBQVEsQ0FBRSxZQUFZLFlBQWM7QUFBQSxFQUNwQyxPQUFPLENBQUUsY0FBYyxhQUFlO0FBQUEsRUFDdEMsTUFBTSxDQUFFLGVBQWUsWUFBWTtBQUNyQztBQUVBLE1BQUEsVUFBZSxnQkFBZ0I7QUFBQSxFQUM3QixNQUFNO0FBQUEsRUFFTixjQUFjO0FBQUEsRUFFZCxPQUFPO0FBQUEsSUFDTCxHQUFHO0FBQUEsSUFDSCxHQUFHO0FBQUEsSUFFSCxnQkFBZ0I7QUFBQTtBQUFBLElBQ2hCLGdCQUFnQjtBQUFBO0FBQUEsSUFFaEIsWUFBWTtBQUFBLElBQ1osV0FBVztBQUFBLElBQ1gsbUJBQW1CO0FBQUEsSUFFbkIsY0FBYztBQUFBLElBQ2QsbUJBQW1CO0FBQUEsSUFDbkIsZ0JBQWdCO0FBQUEsSUFDaEIsV0FBVztBQUFBLElBQ1gsU0FBUztBQUFBLElBQ1QsU0FBUztBQUFBLElBRVQsVUFBVTtBQUFBLElBRVYsV0FBVztBQUFBLElBQ1gsV0FBVztBQUFBLElBQ1gsWUFBWTtBQUFBLElBRVosUUFBUTtBQUFBLElBRVIsZ0JBQWdCO0FBQUEsSUFFaEIsVUFBVTtBQUFBLE1BQ1IsTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLE1BQ1QsV0FBVyxTQUFPLENBQUUsWUFBWSxPQUFPLFVBQVUsUUFBUSxTQUFVLFNBQVMsR0FBRztBQUFBLElBQ3JGO0FBQUEsRUFDRztBQUFBLEVBRUQsT0FBTztBQUFBLElBQ0wsR0FBRztBQUFBLElBQ0g7QUFBQSxJQUFTO0FBQUEsSUFBUztBQUFBLEVBQ25CO0FBQUEsRUFFRCxNQUFPLE9BQU8sRUFBRSxPQUFPLE1BQU0sTUFBSyxHQUFJO0FBQ3BDLFVBQU0sS0FBSyxtQkFBa0I7QUFFN0IsVUFBTSxXQUFXLElBQUksSUFBSTtBQUN6QixVQUFNLFVBQVUsSUFBSSxLQUFLO0FBQ3pCLFVBQU0sWUFBWSxJQUFJLEtBQUs7QUFFM0IsUUFBSSxlQUFlLE1BQU0sZ0JBQWdCLE1BQU0sYUFBYTtBQUU1RCxVQUFNLG9CQUFvQjtBQUFBLE1BQVMsTUFDakMsTUFBTSxlQUFlLFFBQ2xCLE1BQU0sbUJBQW1CLFFBQ3pCLE1BQU0sYUFBYTtBQUFBLElBQzVCO0FBRUksVUFBTSxFQUFFLGtCQUFpQixJQUFLLGlCQUFnQjtBQUM5QyxVQUFNLEVBQUUsZ0JBQWUsSUFBSyxXQUFVO0FBQ3RDLFVBQU0sRUFBRSxjQUFjLFdBQVUsSUFBSyxRQUFPO0FBRTVDLFVBQU0sRUFBRSxpQkFBaUIsZ0JBQWUsSUFBSztBQUFBLE1BQzNDO0FBQUEsTUFDQSxNQUFNLG1CQUFvQixNQUFNLFFBQVEsRUFBSSxDQUFHO0FBQUEsTUFDL0MsTUFBTSxtQkFBb0IsTUFBTSxRQUFRLEVBQUksQ0FBQztBQUFBLElBQ25EO0FBRUksVUFBTSxnQkFBZ0IsU0FBUyxNQUM3QixnQkFBZ0IsU0FFZCxNQUFNLG1CQUFtQixTQUVyQixvQkFBcUIsTUFBTSxjQUFnQiw0QkFBNEIsTUFBTSxjQUFnQixLQUM3RixHQUVQO0FBRUQsVUFBTSxFQUFFLFlBQVksWUFBWSxvQkFBb0IsYUFBYyxJQUFHO0FBQUEsTUFDbkU7QUFBQSxNQUFJO0FBQUEsTUFBVTtBQUFBLE1BQXFCO0FBQUEsSUFDekM7QUFFSSxVQUFNLEVBQUUsS0FBTSxJQUFHLGVBQWU7QUFBQSxNQUM5QjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0EsZ0JBQWdCO0FBQUEsSUFDakIsQ0FBQTtBQUVELFVBQU0sRUFBRSxjQUFjLGtCQUFpQixJQUFLLFdBQVcsU0FBUyxNQUFNLGlCQUFpQjtBQUV2RixVQUFNLFVBQVU7QUFBQSxNQUFTLE1BQ3ZCLDJEQUN3QixNQUFNLGNBQWMsT0FBTyxjQUFjLFdBQWEscUJBQ3RELE1BQU0sUUFBUSxJQUFNLGNBQWUsTUFBTSxTQUFZLE1BQzFFLFVBQVUsVUFBVSxPQUFPLGdDQUFnQyxPQUMzRCxNQUFNLGNBQWMsT0FBTyxnQ0FBZ0MsT0FDM0QsTUFBTSxlQUFlLE9BQU8saUNBQWlDLE9BQzdELE1BQU0sV0FBVyxPQUFPLDZCQUE2QjtBQUFBLElBQzlEO0FBRUksVUFBTSxjQUFjLFNBQVMsTUFBTSxRQUFRLFVBQVUsUUFBUSxNQUFNLGFBQWEsSUFBSTtBQUVwRixVQUFNLFdBQVcsU0FBUyxNQUN4QixNQUFNLGNBQWMsT0FDaEIsRUFBRSxTQUFTLFlBQVcsSUFDdEIsQ0FBQSxDQUNMO0FBRUQsVUFBTSxjQUFjLFNBQVMsTUFBTTtBQUFBLE1BQ2pDLG1EQUNrQixZQUFZLFVBQVUsT0FBTyxVQUFVO01BQ3pELE1BQU07QUFBQSxJQUNQLENBQUE7QUFFRCxVQUFNLE1BQU0sTUFBTSxXQUFXLFdBQVM7QUFDcEMsY0FBUSxVQUFVLFFBQVEsZ0JBQWdCLEtBQUs7QUFBQSxJQUNoRCxDQUFBO0FBRUQsVUFBTSxhQUFhLFNBQU87QUFDeEIsd0JBQWtCLEdBQUc7QUFFckIsVUFBSSxRQUFRLE1BQU07QUFDaEIsb0JBQVksYUFBYTtBQUN6QixxQkFBYSxXQUFXO0FBQUEsTUFDaEMsT0FDVztBQUNILHVCQUFlLGFBQWE7QUFDNUIsd0JBQWdCLFdBQVc7QUFBQSxNQUNuQztBQUFBLElBQ0ssQ0FBQTtBQUVELGFBQVMsV0FBWSxLQUFLO0FBQ3hCLG1CQUFZO0FBRVosc0JBQWdCLE1BQU0sY0FBYyxTQUFTLFNBQVMsa0JBQWtCLE9BQ3BFLFNBQVMsZ0JBQ1Q7QUFFSixzQkFBZ0IsTUFBTSxTQUFTO0FBQy9CLGlCQUFVO0FBQ1YsZ0JBQVUsUUFBUTtBQUVsQixVQUFJLE1BQU0sWUFBWSxNQUFNO0FBQzFCLGlCQUFTLGVBQWUsS0FBSTtBQUM1QixxQkFBYSxLQUFLO0FBQUEsTUFDMUIsT0FDVztBQUNILG1CQUFVO0FBQUEsTUFDbEI7QUFHTSxzQkFBZ0IsTUFBTTtBQUNwQixZQUFJLEdBQUcsTUFBTSxHQUFHLFNBQVMsR0FBRyxRQUFRLE1BQU07QUFDeEMsY0FBSSxNQUFNLGFBQWEsUUFBUSxTQUFTLGVBQWU7QUFDckQsa0JBQ0UsRUFBRSxLQUFLLE9BQU0sSUFBSyxTQUFTLGNBQWMsc0JBQXVCLEdBQ2hFLEVBQUUsWUFBYSxJQUFHLFFBQ2xCLFNBQVMsT0FBTyxtQkFBbUIsU0FDL0IsT0FBTyxlQUFlLFNBQ3RCO0FBRU4sZ0JBQUksTUFBTSxLQUFLLFNBQVMsU0FBUyxHQUFHO0FBQ2xDLHVCQUFTLGlCQUFpQixZQUFZLEtBQUs7QUFBQSxnQkFDekMsU0FBUyxpQkFBaUIsZUFBZTtBQUFBLGdCQUN6QyxVQUFVLGNBQ04sV0FDQSxLQUFLLEtBQUssU0FBUyxpQkFBaUIsWUFBWSxTQUFTLFNBQVMsQ0FBQztBQUFBLGNBQ3ZGO0FBQUEsWUFDQTtBQUVZLHFCQUFTLGNBQWMsZUFBYztBQUFBLFVBQ2pEO0FBR1UsMkJBQWlCO0FBQ2pCLG1CQUFTLE1BQU0sTUFBSztBQUNwQiwyQkFBaUI7QUFBQSxRQUMzQjtBQUVRLG1CQUFXLElBQUk7QUFDZixrQkFBVSxRQUFRO0FBQ2xCLGFBQUssUUFBUSxHQUFHO0FBQUEsTUFDakIsR0FBRSxNQUFNLGtCQUFrQjtBQUFBLElBQ2pDO0FBRUksYUFBUyxXQUFZLEtBQUs7QUFDeEIsaUJBQVU7QUFDVix3QkFBaUI7QUFDakIsY0FBUSxJQUFJO0FBQ1osZ0JBQVUsUUFBUTtBQUNsQixpQkFBVTtBQUVWLFVBQUksa0JBQWtCLE1BQU07QUFDMUIsVUFBRSxLQUFLLEtBQUssUUFBUSxLQUFLLE1BQU0sSUFDM0IsY0FBYyxRQUFRLGlDQUFpQyxJQUN2RCxXQUNDLGVBQWUsTUFBSztBQUV6Qix3QkFBZ0I7QUFBQSxNQUN4QjtBQUdNLHNCQUFnQixNQUFNO0FBQ3BCLG1CQUFXLElBQUk7QUFDZixrQkFBVSxRQUFRO0FBQ2xCLGFBQUssUUFBUSxHQUFHO0FBQUEsTUFDakIsR0FBRSxNQUFNLGtCQUFrQjtBQUFBLElBQ2pDO0FBRUksYUFBUyxNQUFPLFVBQVU7QUFDeEIsaUJBQVcsTUFBTTtBQUNmLFlBQUksT0FBTyxTQUFTO0FBRXBCLFlBQUksU0FBUyxLQUFNO0FBRW5CLFlBQUksYUFBYSxRQUFRO0FBQ3ZCLGdCQUFNLFNBQVMsS0FBSyxjQUFjLFFBQVE7QUFDMUMsY0FBSSxXQUFXLE1BQU07QUFDbkIsbUJBQU8sTUFBTSxFQUFFLGVBQWUsS0FBTSxDQUFBO0FBQ3BDO0FBQUEsVUFDWjtBQUFBLFFBQ0E7QUFFUSxZQUFJLEtBQUssU0FBUyxTQUFTLGFBQWEsTUFBTSxNQUFNO0FBQ2xELGlCQUNFLEtBQUssY0FBYyxtREFBbUQsS0FDbkUsS0FBSyxjQUFjLHFEQUFxRCxLQUN4RSxLQUFLLGNBQWMsK0JBQStCLEtBQ2xEO0FBR0wsZUFBSyxNQUFNLEVBQUUsZUFBZSxLQUFNLENBQUE7QUFBQSxRQUM1QztBQUFBLE1BQ08sQ0FBQTtBQUFBLElBQ1A7QUFFSSxhQUFTLE1BQU8sYUFBYTtBQUMzQixVQUFJLGVBQWUsT0FBTyxZQUFZLFVBQVUsWUFBWTtBQUMxRCxvQkFBWSxNQUFNLEVBQUUsZUFBZSxLQUFNLENBQUE7QUFBQSxNQUNqRCxPQUNXO0FBQ0gsY0FBSztBQUFBLE1BQ2I7QUFFTSxXQUFLLE9BQU87QUFFWixZQUFNLE9BQU8sU0FBUztBQUV0QixVQUFJLFNBQVMsTUFBTTtBQUNqQixhQUFLLFVBQVUsT0FBTyxrQkFBa0I7QUFDeEMsYUFBSyxVQUFVLElBQUksa0JBQWtCO0FBQ3JDLHlCQUFpQixRQUFRLGFBQWEsWUFBWTtBQUNsRCx1QkFBZSxXQUFXLE1BQU07QUFDOUIseUJBQWU7QUFDZixjQUFJLFNBQVMsVUFBVSxNQUFNO0FBQzNCLGlCQUFLLFVBQVUsT0FBTyxrQkFBa0I7QUFHeEMsa0JBQUs7QUFBQSxVQUNqQjtBQUFBLFFBQ0EsR0FBVyxHQUFHO0FBQUEsTUFDZDtBQUFBLElBQ0E7QUFFSSxhQUFTLGNBQWU7QUFDdEIsVUFBSSxNQUFNLGFBQWEsTUFBTTtBQUMzQixZQUFJLE1BQU0sZUFBZSxRQUFRLE1BQU0saUJBQWlCLE1BQU07QUFDNUQsZ0JBQU0sY0FBYyxRQUFRLE1BQU0sWUFBWSxRQUFRLE1BQUs7QUFBQSxRQUNyRSxPQUNhO0FBQ0gsZUFBSyxXQUFXO0FBQ2hCLGVBQUk7QUFBQSxRQUNkO0FBQUEsTUFDQTtBQUFBLElBQ0E7QUFFSSxhQUFTLFFBQVMsUUFBUTtBQUN4QixVQUFJLGlCQUFpQixNQUFNO0FBQ3pCLHFCQUFhLFlBQVk7QUFDekIsdUJBQWU7QUFBQSxNQUN2QjtBQUVNLFVBQUksV0FBVyxRQUFRLFFBQVEsVUFBVSxNQUFNO0FBQzdDLHdCQUFnQixLQUFLO0FBRXJCLFlBQUksTUFBTSxhQUFhLE1BQU07QUFDM0IsNEJBQWtCLEtBQUs7QUFDdkIseUJBQWUsYUFBYTtBQUM1QiwwQkFBZ0IsV0FBVztBQUFBLFFBQ3JDO0FBQUEsTUFDQTtBQUVNLFVBQUksV0FBVyxNQUFNO0FBQ25CLHdCQUFnQjtBQUFBLE1BQ3hCO0FBQUEsSUFDQTtBQUVJLGFBQVMsZ0JBQWlCLFFBQVE7QUFDaEMsVUFBSSxXQUFXLE1BQU07QUFDbkIsWUFBSSxnQkFBZ0IsTUFBTTtBQUN4Qiw0QkFBa0IsS0FBSyxTQUFTLEtBQUssVUFBVSxJQUFJLGdCQUFnQjtBQUNuRTtBQUVBLHdCQUFjO0FBQUEsUUFDeEI7QUFBQSxNQUNBLFdBQ2UsZ0JBQWdCLE1BQU07QUFDN0IsWUFBSSxrQkFBa0IsR0FBRztBQUN2QixtQkFBUyxLQUFLLFVBQVUsT0FBTyxnQkFBZ0I7QUFBQSxRQUN6RDtBQUVRO0FBQ0Esc0JBQWM7QUFBQSxNQUN0QjtBQUFBLElBQ0E7QUFFSSxhQUFTLFlBQWEsR0FBRztBQUN2QixVQUFJLG1CQUFtQixNQUFNO0FBQzNCLGFBQUssQ0FBQztBQUNOLGFBQUssU0FBUyxDQUFDO0FBQUEsTUFDdkI7QUFBQSxJQUNBO0FBRUksYUFBUyxnQkFBaUIsR0FBRztBQUMzQixVQUFJLE1BQU0sZUFBZSxRQUFRLE1BQU0sc0JBQXNCLE1BQU07QUFDakUsYUFBSyxDQUFDO0FBQUEsTUFDZCxXQUNlLE1BQU0sWUFBWSxNQUFNO0FBQy9CLGNBQUs7QUFBQSxNQUNiO0FBQUEsSUFDQTtBQUVJLGFBQVMsY0FBZSxLQUFLO0FBRTNCLFVBQ0UsTUFBTSxzQkFBc0IsUUFDekIsbUJBQW1CLFVBQVUsUUFDN0IsY0FBYyxTQUFTLE9BQU8sSUFBSSxNQUFNLE1BQU0sTUFDakQ7QUFDQSxjQUFNLGlDQUFpQztBQUFBLE1BQy9DO0FBQUEsSUFDQTtBQUVJLFdBQU8sT0FBTyxHQUFHLE9BQU87QUFBQTtBQUFBLE1BRXRCO0FBQUEsTUFBTztBQUFBO0FBQUEsTUFHUCxzQkFBdUIsUUFBUTtBQUM3Qix3QkFBZ0IsVUFBVTtBQUFBLE1BQ2xDO0FBQUEsSUFDSyxDQUFBO0FBRUQsb0JBQWdCLE9BQU87QUFFdkIsYUFBUyxzQkFBdUI7QUFDOUIsYUFBTyxFQUFFLE9BQU87QUFBQSxRQUNkLE1BQU07QUFBQSxRQUNOLGNBQWMsWUFBWSxVQUFVLE9BQU8sU0FBUztBQUFBLFFBQ3BELEdBQUc7QUFBQSxRQUNILE9BQU8sWUFBWTtBQUFBLE1BQzNCLEdBQVM7QUFBQSxRQUNELEVBQUUsWUFBWTtBQUFBLFVBQ1osTUFBTTtBQUFBLFVBQ04sUUFBUTtBQUFBLFFBQ2xCLEdBQVcsTUFDRCxZQUFZLFVBQVUsT0FDbEIsRUFBRSxPQUFPO0FBQUEsVUFDVCxPQUFPO0FBQUEsVUFDUCxPQUFPLGNBQWM7QUFBQSxVQUNyQixlQUFlO0FBQUEsVUFDZixVQUFVO0FBQUEsVUFDVixTQUFTO0FBQUEsUUFDVixDQUFBLElBQ0MsSUFDTDtBQUFBLFFBRUQ7QUFBQSxVQUNFO0FBQUEsVUFDQSxnQkFBZ0I7QUFBQSxVQUNoQixNQUNFLFFBQVEsVUFBVSxPQUNkLEVBQUUsT0FBTztBQUFBLFlBQ1QsS0FBSztBQUFBLFlBQ0wsT0FBTyxRQUFRO0FBQUEsWUFDZixPQUFPLGdCQUFnQjtBQUFBLFlBQ3ZCLFVBQVU7QUFBQSxZQUNWLEdBQUcsU0FBUztBQUFBLFVBQzVCLEdBQWlCLE1BQU0sTUFBTSxPQUFPLENBQUMsSUFDckI7QUFBQSxRQUVoQjtBQUFBLE1BQ08sQ0FBQTtBQUFBLElBQ1A7QUFFSSxXQUFPO0FBQUEsRUFDWDtBQUNBLENBQUM7QUNwYkQsSUFBSSxrQkFBa0I7QUFHRDtBQUNiLFFBQUEsV0FBVyxTQUFTLGNBQWMsS0FBSztBQUNwQyxXQUFBLGFBQWEsT0FBTyxLQUFLO0FBQzNCLFNBQUEsT0FBTyxTQUFTLE9BQU87QUFBQSxJQUM1QixPQUFPO0FBQUEsSUFDUCxRQUFRO0FBQUEsSUFDUixVQUFVO0FBQUEsRUFBQSxDQUNYO0FBRUssUUFBQSxTQUFTLFNBQVMsY0FBYyxLQUFLO0FBQ3BDLFNBQUEsT0FBTyxPQUFPLE9BQU87QUFBQSxJQUMxQixPQUFPO0FBQUEsSUFDUCxRQUFRO0FBQUEsRUFBQSxDQUNUO0FBRVEsV0FBQSxLQUFLLFlBQVksUUFBUTtBQUNsQyxXQUFTLFlBQVksTUFBTTtBQUMzQixXQUFTLGFBQWE7QUFFdEIsb0JBQWtCLFNBQVMsY0FBYztBQUV6QyxXQUFTLE9BQU87QUFDbEI7QUNuQkEsTUFBTSxnQkFBZ0I7QUFFdEIsTUFBTSxnQkFBZ0I7QUFBQSxFQUNwQjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0Y7QUFFQSxNQUFNLGNBQWMsTUFBTSxVQUFVO0FBRXBDLE1BQU0sb0JBQXNDLE9BQU8saUJBQWlCLFNBQVMsSUFBSSxFQUFFLG1CQUFtQixTQUNsRyxPQUNBLFNBQVUsV0FBVyxPQUFPO0FBQzVCLE1BQUksY0FBYyxLQUFNO0FBRXBCLE1BQUEsVUFBVSw2QkFBNkIsUUFBUTtBQUNqRCx5QkFBcUIsVUFBVSx3QkFBd0I7QUFBQSxFQUFBO0FBRy9DLFlBQUEsMkJBQTJCLHNCQUFzQixNQUFNO0FBQy9ELFFBQUksY0FBYyxLQUFNO0FBRXhCLGNBQVUsMkJBQTJCO0FBQy9CLFVBQUEsV0FBVyxVQUFVLFlBQVksQ0FBQztBQUV4QyxnQkFDRyxLQUFLLFVBQVUsQ0FBQUMsUUFBTUEsSUFBRyxXQUFXQSxJQUFHLFFBQVEsY0FBYyxNQUFNLEVBQ2xFLFFBQVEsQ0FBQUEsUUFBTTtBQUNiLGFBQU9BLElBQUcsUUFBUTtBQUFBLElBQUEsQ0FDbkI7QUFFRyxVQUFBLEtBQUssU0FBVSxLQUFNO0FBRTNCLFFBQUksSUFBSSxTQUFTO0FBQ2YsU0FBRyxRQUFRLFlBQVk7QUFBQSxJQUFBO0FBQUEsRUFDekIsQ0FDRDtBQUNIO0FBRUYsU0FBUyxNQUFPLEtBQUtELElBQUc7QUFDdEIsU0FBTyxNQUFNQTtBQUNmO0FBRUEsU0FBUyxpQkFDUCxRQUNBLE9BQ0EsV0FDQSxVQUNBLFlBQ0EsS0FDQSxhQUNBLFdBQ0E7QUFDQSxRQUNFLGFBQWEsV0FBVyxTQUFTLFNBQVMsb0JBQW9CLFNBQVMsa0JBQWtCLFFBQ3pGLGFBQWEsZUFBZSxPQUFPLGdCQUFnQixnQkFDbkQsVUFBVTtBQUFBLElBQ1IsYUFBYTtBQUFBLElBQ2IsZ0JBQWdCLENBQUMsY0FBYztBQUFBLElBQy9CLGVBQWU7QUFBQSxJQUNmLGFBQWEsQ0FBQztBQUFBLElBQ2QsV0FBVyxDQUFDO0FBQUEsRUFDZDtBQUVGLE1BQUksZUFBZSxNQUFNO0FBQ3ZCLFFBQUksV0FBVyxRQUFRO0FBQ3JCLGNBQVEsY0FBYyxPQUFPLGVBQWUsT0FBTyxXQUFXLFNBQVMsS0FBSyxjQUFjO0FBQ2xGLGNBQUEsa0JBQWtCLFNBQVMsZ0JBQWdCO0FBQUEsSUFBQSxPQUVoRDtBQUNILGNBQVEsY0FBYyxXQUFXO0FBQ2pDLGNBQVEsa0JBQWtCLFdBQVc7QUFBQSxJQUFBO0FBRXZDLFlBQVEsZ0JBQWdCLFdBQVc7QUFFbkMsUUFBSSxRQUFRLE1BQU07QUFDUixjQUFBLGVBQWUsb0JBQW9CLE9BQU8sUUFBUSxnQkFBZ0IsUUFBUSxpQkFBaUIsS0FBSyxRQUFRO0FBQUEsSUFBQTtBQUFBLEVBQ2xILE9BRUc7QUFDSCxRQUFJLFdBQVcsUUFBUTtBQUNyQixjQUFRLGNBQWMsT0FBTyxlQUFlLE9BQU8sV0FBVyxTQUFTLEtBQUssYUFBYTtBQUNqRixjQUFBLGtCQUFrQixTQUFTLGdCQUFnQjtBQUFBLElBQUEsT0FFaEQ7QUFDSCxjQUFRLGNBQWMsV0FBVztBQUNqQyxjQUFRLGtCQUFrQixXQUFXO0FBQUEsSUFBQTtBQUV2QyxZQUFRLGdCQUFnQixXQUFXO0FBQUEsRUFBQTtBQUdyQyxNQUFJLGNBQWMsTUFBTTtBQUN0QixhQUFTLEtBQUssVUFBVSx3QkFBd0IsT0FBTyxNQUFNLEtBQUssR0FBRyx3QkFBd0I7QUFDM0YsVUFBSSxHQUFHLFVBQVUsU0FBUyx3QkFBd0IsTUFBTSxPQUFPO0FBQ3JELGdCQUFBLGVBQWUsR0FBSSxVQUFXO0FBQUEsTUFBQTtBQUFBLElBQ3hDO0FBQUEsRUFDRjtBQUdGLE1BQUksYUFBYSxNQUFNO0FBQ3JCLGFBQVMsS0FBSyxTQUFTLG9CQUFvQixPQUFPLE1BQU0sS0FBSyxHQUFHLG9CQUFvQjtBQUNsRixVQUFJLEdBQUcsVUFBVSxTQUFTLHdCQUF3QixNQUFNLE9BQU87QUFDckQsZ0JBQUEsYUFBYSxHQUFJLFVBQVc7QUFBQSxNQUFBO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBR0YsTUFBSSxVQUFVLFFBQVE7QUFDcEIsVUFDRSxhQUFhLFdBQVcsc0JBQ3hCLEdBQUEsWUFBWSxNQUFNLHNCQUFzQjtBQUUxQyxRQUFJLGVBQWUsTUFBTTtBQUNmLGNBQUEsZUFBZSxVQUFVLE9BQU8sV0FBVztBQUNuRCxjQUFRLGFBQWEsVUFBVTtBQUFBLElBQUEsT0FFNUI7QUFDSyxjQUFBLGVBQWUsVUFBVSxNQUFNLFdBQVc7QUFDbEQsY0FBUSxhQUFhLFVBQVU7QUFBQSxJQUFBO0FBR2pDLFFBQUksV0FBVyxRQUFRO0FBQ3JCLGNBQVEsZUFBZSxRQUFRO0FBQUEsSUFBQTtBQUV6QixZQUFBLGFBQWEsUUFBUSxnQkFBZ0IsUUFBUTtBQUFBLEVBQUE7QUFHaEQsU0FBQTtBQUNUO0FBRUEsU0FBUyxVQUFXLFFBQVEsUUFBUSxZQUFZLEtBQUs7QUFDbkQsTUFBSSxXQUFXLE9BQU87QUFDVixjQUFBLFdBQVcsU0FBUyxTQUFTLE9BQU8sUUFDNUMsZUFBZSxPQUFPLGdCQUFnQixjQUN4QztBQUFBLEVBQUE7QUFHRixNQUFJLFdBQVcsUUFBUTtBQUNyQixRQUFJLGVBQWUsTUFBTTtBQUN2QixVQUFJLFFBQVEsTUFBTTtBQUNOLGtCQUFBLG9CQUFvQixPQUFPLFNBQVMsS0FBSyxjQUFjLFNBQVMsZ0JBQWdCLGNBQWMsS0FBSztBQUFBLE1BQUE7QUFFeEcsYUFBQSxTQUFTLFFBQVEsT0FBTyxlQUFlLE9BQU8sV0FBVyxTQUFTLEtBQUssYUFBYSxDQUFDO0FBQUEsSUFBQSxPQUV6RjtBQUNJLGFBQUEsU0FBUyxPQUFPLGVBQWUsT0FBTyxXQUFXLFNBQVMsS0FBSyxjQUFjLEdBQUcsTUFBTTtBQUFBLElBQUE7QUFBQSxFQUMvRixXQUVPLGVBQWUsTUFBTTtBQUM1QixRQUFJLFFBQVEsTUFBTTtBQUNoQixnQkFBVSxvQkFBb0IsT0FBTyxPQUFPLGNBQWMsT0FBTyxjQUFjLEtBQUs7QUFBQSxJQUFBO0FBRXRGLFdBQU8sYUFBYTtBQUFBLEVBQUEsT0FFakI7QUFDSCxXQUFPLFlBQVk7QUFBQSxFQUFBO0FBRXZCO0FBRUEsU0FBUyxRQUFTLFNBQVNYLE9BQU0sTUFBTSxJQUFJO0FBQ3pDLE1BQUksUUFBUSxJQUFJO0FBQVMsV0FBQTtBQUFBLEVBQUE7QUFFekIsUUFDRSxTQUFTQSxNQUFLLFFBQ2QsVUFBVSxLQUFLLE1BQU0sT0FBTyxhQUFhLEdBQ3pDLFFBQVEsS0FBSyxPQUFPLEtBQUssS0FBSyxhQUFhLElBQUk7QUFFN0MsTUFBQSxRQUFRLFFBQVEsTUFBTSxTQUFTLEtBQUssRUFBRSxPQUFPLE9BQU8sQ0FBQztBQUVyRCxNQUFBLE9BQU8sa0JBQWtCLEdBQUc7QUFDckIsYUFBQUEsTUFBSyxNQUFNLFVBQVUsZUFBZSxJQUFJLEVBQUUsT0FBTyxPQUFPLENBQUM7QUFBQSxFQUFBO0FBRXBFLE1BQUksS0FBSyxrQkFBa0IsS0FBSyxPQUFPLFFBQVE7QUFDcEMsYUFBQUEsTUFBSyxNQUFNLElBQUksUUFBUSxhQUFhLEVBQUUsT0FBTyxPQUFPLENBQUM7QUFBQSxFQUFBO0FBR3pELFNBQUE7QUFDVDtBQUVBLE1BQU0sd0JBQXdCO0FBQUEsRUFDNUIsd0JBQXdCO0FBQUEsSUFDdEIsTUFBTSxDQUFFLFFBQVEsTUFBTztBQUFBLElBQ3ZCLFNBQVM7QUFBQSxFQUNYO0FBQUEsRUFFQSwrQkFBK0I7QUFBQSxJQUM3QixNQUFNLENBQUUsUUFBUSxNQUFPO0FBQUEsSUFDdkIsU0FBUztBQUFBLEVBQ1g7QUFBQSxFQUVBLDhCQUE4QjtBQUFBLElBQzVCLE1BQU0sQ0FBRSxRQUFRLE1BQU87QUFBQSxJQUN2QixTQUFTO0FBQUEsRUFDWDtBQUFBLEVBRUEsdUJBQXVCO0FBQUEsSUFDckIsTUFBTSxDQUFFLFFBQVEsTUFBTztBQUFBLElBQ3ZCLFNBQVM7QUFBQSxFQUNYO0FBQUEsRUFFQSw4QkFBOEI7QUFBQSxJQUM1QixNQUFNLENBQUUsUUFBUSxNQUFPO0FBQUEsSUFDdkIsU0FBUztBQUFBLEVBQ1g7QUFBQSxFQUVBLDRCQUE0QjtBQUFBLElBQzFCLE1BQU0sQ0FBRSxRQUFRLE1BQU87QUFBQSxJQUN2QixTQUFTO0FBQUEsRUFDWDtBQUFBLEVBRUEsY0FBYyxDQUFFLFFBQVEsTUFBTztBQUNqQztBQUlPLE1BQU0sd0JBQXdCO0FBQUEsRUFDbkMseUJBQXlCO0FBQUEsRUFDekIsaUJBQWlCO0FBQUEsRUFDakIsR0FBRztBQUNMO0FBRU8sU0FBUyxpQkFBa0I7QUFBQSxFQUNoQztBQUFBLEVBQXFCO0FBQUEsRUFBd0I7QUFBQSxFQUM3QztBQUFBO0FBQ0YsR0FBRztBQUNELFFBQU0sS0FBSyxtQkFBbUI7QUFFOUIsUUFBTSxFQUFFLE9BQU8sTUFBTSxNQUFVLElBQUE7QUFDekIsUUFBQSxFQUFFLE9BQU87QUFFZixNQUFJLGlCQUFpQixhQUFhLHFCQUFxQix3QkFBd0IsQ0FBSSxHQUFBO0FBRTdFLFFBQUEsNkJBQTZCLElBQUksQ0FBQztBQUNsQyxRQUFBLDRCQUE0QixJQUFJLENBQUM7QUFDakMsUUFBQSxpQ0FBaUMsSUFBSSxFQUFFO0FBRXZDLFFBQUEsWUFBWSxJQUFJLElBQUk7QUFDcEIsUUFBQSxXQUFXLElBQUksSUFBSTtBQUNuQixRQUFBLGFBQWEsSUFBSSxJQUFJO0FBRTNCLFFBQU0sMEJBQTBCLElBQUksRUFBRSxNQUFNLEdBQUcsSUFBSSxHQUFHO0FBRWhELFFBQUEsY0FBYyxTQUFTLE1BQU8sTUFBTSxpQkFBaUIsU0FBUyxNQUFNLGVBQWUsR0FBSTtBQUU3RixNQUFJLGtDQUFrQyxRQUFRO0FBQ1osb0NBQUEsU0FBUyxNQUFNLE1BQU0scUJBQXFCO0FBQUEsRUFBQTtBQUc1RSxRQUFNLGFBQWEsU0FBUyxNQUFNLDhCQUE4QixRQUFRLE1BQU0sTUFBTSx1QkFBdUI7QUFFM0csUUFBTSxtQkFBbUI7QUFBQSxJQUFTLE1BQ2hDLFdBQVcsUUFBUSxNQUFNLE1BQU0sZ0NBQWdDLE1BQU0sTUFBTTtBQUFBLEVBQzdFO0FBRUEsUUFBTSxrQkFBa0IsTUFBTTtBQUF1Qix5QkFBQTtBQUFBLEVBQUEsQ0FBRztBQUN4RCxRQUFNLFlBQVksS0FBSztBQUV2QixXQUFTLFFBQVM7QUFDaEIsNEJBQXdCLGFBQWEsSUFBSTtBQUFBLEVBQUE7QUFHM0MsV0FBUyxRQUFTLFNBQVM7QUFDRCw0QkFBQSxZQUFZLFNBQVMsY0FBYyxPQUFPO0FBQUEsRUFBQTtBQUczRCxXQUFBLFNBQVUsU0FBUyxNQUFNO0FBQ2hDLFVBQU0sV0FBVyx1QkFBdUI7QUFFeEMsUUFDRSxhQUFhLFVBQ1YsYUFBYSxRQUNiLFNBQVMsYUFBYSxFQUN6QjtBQUVGLFVBQU0sZ0JBQWdCO0FBQUEsTUFDcEI7QUFBQSxNQUNBLG1CQUFtQjtBQUFBLE1BQ25CLFVBQVU7QUFBQSxNQUNWLFNBQVM7QUFBQSxNQUNULE1BQU07QUFBQSxNQUNOLEdBQUcsS0FBSztBQUFBLE1BQ1IsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLElBQ1I7QUFFQSw0QkFBd0IsY0FBYyxrQkFBa0IscUJBQXFCLGNBQWMsY0FBYztBQUV6RztBQUFBLE1BQ0U7QUFBQSxNQUNBO0FBQUEsTUFDQSxLQUFLLElBQUksb0JBQW9CLFFBQVEsR0FBRyxLQUFLLElBQUksR0FBRyxTQUFTLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUFBLE1BQy9FO0FBQUEsTUFDQSxjQUFjLFFBQVEsSUFBSSxNQUFNLEtBQUssT0FBUSxnQkFBZ0IsTUFBTSxVQUFVLGNBQWMsUUFBUTtBQUFBLElBQ3JHO0FBQUEsRUFBQTtBQUdGLFdBQVMsMEJBQTJCO0FBQ2xDLFVBQU0sV0FBVyx1QkFBdUI7QUFFeEMsUUFDRSxhQUFhLFVBQ1YsYUFBYSxRQUNiLFNBQVMsYUFBYSxFQUN6QjtBQUVGLFVBQ0UsZ0JBQWdCO0FBQUEsTUFDZDtBQUFBLE1BQ0EsbUJBQW1CO0FBQUEsTUFDbkIsVUFBVTtBQUFBLE1BQ1YsU0FBUztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04sR0FBRyxLQUFLO0FBQUEsTUFDUixNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsSUFFUixHQUFBLGdCQUFnQixvQkFBb0IsUUFBUSxHQUM1QyxnQkFBZ0IsY0FBYyxnQkFBZ0IsY0FBYyxjQUFjLGNBQWMsWUFBWSwwQkFBMEI7QUFFNUgsUUFBQSxvQkFBb0IsY0FBYyxZQUFhO0FBRS9DLFFBQUEsY0FBYyxpQkFBaUIsR0FBRztBQUNULGlDQUFBLFVBQVUsZUFBZSxHQUFHLENBQUM7QUFDeEQ7QUFBQSxJQUFBO0FBR0YsNEJBQXdCLGNBQWMsa0JBQWtCLHFCQUFxQixjQUFjLGNBQWM7QUFFaEYsNkJBQUEsd0JBQXdCLE1BQU0sSUFBSTtBQUVyRCxVQUFBLGlCQUFpQixLQUFLLE1BQU0sY0FBYyxnQkFDNUMsS0FBSyxJQUFJLGNBQWMsZ0JBQWdCLGNBQWMsU0FBUyxJQUM5RCxLQUFLLElBQUksbUJBQW9CLGFBQWMsR0FBRyxjQUFjLGlCQUFpQixDQUFDLENBQUM7QUFFbkYsUUFBSSxpQkFBaUIsS0FBSyxLQUFLLEtBQUssY0FBYyxXQUFXLEtBQUssZ0JBQWdCO0FBQ2hGO0FBQUEsUUFDRTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQSxjQUFjLGdCQUFnQixjQUFjLFlBQVksc0JBQXNCLE9BQU8sT0FBTyxDQUFDO0FBQUEsTUFDL0Y7QUFFQTtBQUFBLElBQUE7QUFHRixRQUNFLFVBQVUsR0FDVixhQUFhLGNBQWMsY0FBYyxjQUFjLGFBQ3ZELFNBQVM7QUFFWCxRQUFJLGNBQWMsaUJBQWlCLGFBQWEsY0FBYyxrQkFBa0IsMkJBQTJCLE9BQU87QUFDaEgsb0JBQWMsMkJBQTJCO0FBQ3pDLGdCQUFVLHdCQUF3QixNQUFNO0FBQy9CLGVBQUE7QUFBQSxJQUFBLE9BRU47QUFDTSxlQUFBLElBQUksR0FBRyxjQUFjLHNCQUF1QixDQUFFLEtBQUssVUFBVSxlQUFlLEtBQUs7QUFDeEYsc0JBQWMsc0JBQXVCLENBQUU7QUFDNUIsbUJBQUE7QUFBQSxNQUFBO0FBQUEsSUFDYjtBQUdLLFdBQUEsYUFBYSxLQUFLLFVBQVUsZUFBZTtBQUNoRCxvQkFBYyxtQkFBb0IsT0FBUTtBQUN0QyxVQUFBLGFBQWEsQ0FBQyxjQUFjLGdCQUFnQjtBQUM5QztBQUNTLGlCQUFBO0FBQUEsTUFBQSxPQUVOO0FBQ00saUJBQUEsbUJBQW9CLE9BQVEsSUFBSTtBQUFBLE1BQUE7QUFBQSxJQUMzQztBQUdGO0FBQUEsTUFDRTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUFBO0FBR0YsV0FBUywyQkFBNEIsVUFBVSxlQUFlLFNBQVMsUUFBUSxPQUFPO0FBQ3BGLFVBQU0sYUFBYSxPQUFPLFVBQVUsWUFBWSxNQUFNLFFBQVEsUUFBUSxNQUFNO0FBQzVFLFVBQU0sV0FBVyxlQUFlLE9BQU8sTUFBTSxRQUFRLFVBQVUsRUFBRSxJQUFJO0FBQy9ELFVBQUEsYUFBYSxhQUFhLFNBQVMsV0FBVztBQUVwRCxRQUNFLE9BQU8sS0FBSyxJQUFJLEdBQUcsVUFBVSwrQkFBK0IsTUFBTyxVQUFXLENBQUMsR0FDL0UsS0FBSyxPQUFPLCtCQUErQixNQUFNO0FBRS9DLFFBQUEsS0FBSyxvQkFBb0IsT0FBTztBQUNsQyxXQUFLLG9CQUFvQjtBQUN6QixhQUFPLEtBQUssSUFBSSxHQUFHLEtBQUssK0JBQStCLE1BQU0sS0FBSztBQUFBLElBQUE7QUFHcEUsc0JBQWtCLGNBQWM7QUFFaEMsVUFBTSxlQUFlLFNBQVMsd0JBQXdCLE1BQU0sUUFBUSxPQUFPLHdCQUF3QixNQUFNO0FBRXJHLFFBQUEsaUJBQWlCLFNBQVMsYUFBYSxRQUFRO0FBQ2pELGlCQUFXLE9BQU87QUFDbEI7QUFBQSxJQUFBO0FBR0ksVUFBQSxFQUFFLGtCQUFrQjtBQUMxQixVQUFNLFlBQVksV0FBVztBQUUzQixRQUFBLGlCQUFpQixRQUNkLGNBQWMsUUFDZCxjQUFjLGlCQUNkLFVBQVUsU0FBUyxhQUFhLE1BQU0sTUFDekM7QUFDVSxnQkFBQSxpQkFBaUIsWUFBWSxlQUFlO0FBRXRELGlCQUFXLE1BQU07QUFDSixtQkFBQSxvQkFBb0IsWUFBWSxlQUFlO0FBQUEsTUFBQSxDQUMzRDtBQUFBLElBQUE7QUFHZSxzQkFBQSxXQUFXLFVBQVUsSUFBSTtBQUVyQyxVQUFBLGFBQWEsYUFBYSxTQUFTLG1CQUFtQixNQUFNLE1BQU0sT0FBTyxFQUFFLE9BQU8sT0FBTyxDQUFDLElBQUk7QUFFcEcsUUFBSSxpQkFBaUIsTUFBTTtBQUtuQixZQUFBLFNBQVMsTUFBTSx3QkFBd0IsTUFBTSxRQUFRLFFBQVEsd0JBQXdCLE1BQU0sS0FDN0Ysd0JBQXdCLE1BQU0sS0FDOUI7QUFFSiw4QkFBd0IsUUFBUSxFQUFFLE1BQU0sSUFBSSxPQUFPO0FBQ25ELGlDQUEyQixRQUFRLFFBQVEsdUJBQXVCLG9CQUFvQixHQUFHLElBQUk7QUFDN0YsZ0NBQTBCLFFBQVEsUUFBUSx1QkFBdUIsb0JBQW9CLElBQUksb0JBQW9CLEtBQUs7QUFFbEgsNEJBQXNCLE1BQU07QUFDMUIsWUFBSSx3QkFBd0IsTUFBTSxPQUFPLE1BQU0sb0JBQW9CLGNBQWMsYUFBYTtBQUM1RixrQ0FBd0IsUUFBUSxFQUFFLE1BQU0sd0JBQXdCLE1BQU0sTUFBTSxHQUFHO0FBQy9FLG9DQUEwQixRQUFRLFFBQVEsdUJBQXVCLG9CQUFvQixJQUFJLG9CQUFvQixLQUFLO0FBQUEsUUFBQTtBQUFBLE1BQ3BILENBQ0Q7QUFBQSxJQUFBO0FBR0gsMEJBQXNCLE1BQU07QUFHdEIsVUFBQSxvQkFBb0IsY0FBYyxZQUFhO0FBRW5ELFVBQUksaUJBQWlCLE1BQU07QUFDekIsaUNBQXlCLElBQUk7QUFBQSxNQUFBO0FBRy9CLFlBQ0UsWUFBWSxtQkFBbUIsTUFBTSxNQUFNLE9BQU8sRUFBRSxPQUFPLE9BQU8sQ0FBQyxHQUNuRSxXQUFXLFlBQVksY0FBYyxjQUFjLDJCQUEyQixPQUM5RSxTQUFTLFdBQVcsbUJBQW9CLE9BQVE7QUFFbEQsVUFBSSxpQkFBaUIsV0FBVztBQUVoQyxVQUFJLGFBQWEsUUFBUTtBQUN2QixjQUFNLFdBQVcsWUFBWTtBQUN2QixjQUFBLGNBQWMsY0FBYyxjQUFjO0FBRS9CLHlCQUFBLGVBQWUsUUFBUSxjQUFjLFlBQVksU0FBUyxjQUFjLGNBQWMsaUJBQ25HLGNBRUUsYUFBYSxRQUNULFNBQVMsY0FBYyxpQkFDdkIsWUFBWSxhQUFhLFVBQVUsSUFBSSxLQUFLLE9BQU8sY0FBYyxpQkFBaUIsbUJBQW9CLE9BQVEsS0FBSyxDQUFDO0FBQUEsTUFBQTtBQUk5Ryx3QkFBQTtBQUVsQjtBQUFBLFFBQ0U7QUFBQSxRQUNBO0FBQUEsUUFDQSxNQUFNO0FBQUEsUUFDTixHQUFHLEtBQUs7QUFBQSxNQUNWO0FBRUEsaUJBQVcsT0FBTztBQUFBLElBQUEsQ0FDbkI7QUFBQSxFQUFBO0FBR0gsV0FBUyx5QkFBMEIsTUFBTTtBQUN2QyxVQUFNLFlBQVksV0FBVztBQUU3QixRQUFJLFdBQVc7QUFDYixZQUNFLFdBQVcsWUFBWTtBQUFBLFFBQ3JCLFVBQVU7QUFBQSxRQUNWLFFBQU0sR0FBRyxhQUFhLEdBQUcsVUFBVSxTQUFTLHdCQUF3QixNQUFNO0FBQUEsTUFBQSxHQUU1RSxpQkFBaUIsU0FBUyxRQUMxQixTQUFTLE1BQU0sNEJBQTRCLE9BQ3ZDLENBQUEsT0FBTSxHQUFHLHNCQUF3QixFQUFBLFFBQ2pDLFFBQU0sR0FBRztBQUdiLFVBQUEsUUFBUSxNQUNSQSxPQUFNO0FBRUMsZUFBQSxJQUFJLEdBQUcsSUFBSSxrQkFBaUI7QUFDNUIsUUFBQUEsUUFBQSxPQUFPLFNBQVUsQ0FBRSxDQUFDO0FBQzNCO0FBRU8sZUFBQSxJQUFJLGtCQUFrQixTQUFVLENBQUUsRUFBRSxVQUFVLFNBQVMsNkJBQTZCLE1BQU0sTUFBTTtBQUM3RixVQUFBQSxTQUFBLE9BQU8sU0FBVSxDQUFFLENBQUM7QUFDNUI7QUFBQSxRQUFBO0FBR0ssZUFBQUEsUUFBTyxtQkFBb0IsS0FBTTtBQUV4QyxZQUFJLFNBQVMsR0FBRztBQUNkLDZCQUFvQixLQUFNLEtBQUs7QUFDL0IsZ0NBQXVCLEtBQUssTUFBTSxRQUFRLGFBQWEsQ0FBRSxLQUFLO0FBQUEsUUFBQTtBQUdoRTtBQUFBLE1BQUE7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUdGLFdBQVMsa0JBQW1CO0FBQzFCLGVBQVcsT0FBTyxNQUFNO0FBQUEsRUFBQTtBQUdqQixXQUFBLHdCQUF5QixTQUFTLFdBQVc7QUFDOUMsVUFBQSxjQUFjLElBQUksOEJBQThCO0FBRXRELFFBQUksY0FBYyxRQUFRLE1BQU0sUUFBUSxrQkFBa0IsTUFBTSxPQUFPO0FBQ3JFLDJCQUFxQixDQUFDO0FBQUEsSUFBQTtBQUd4QixVQUFNLDhCQUE4QixtQkFBbUI7QUFFdkQsdUJBQW1CLFNBQVMsb0JBQW9CO0FBRWhELGFBQVMsSUFBSSxvQkFBb0IsUUFBUSxHQUFHLEtBQUssNkJBQTZCLEtBQUs7QUFDakYseUJBQW9CLENBQUUsSUFBSTtBQUFBLElBQUE7QUFHNUIsVUFBTSxPQUFPLEtBQUssT0FBTyxvQkFBb0IsUUFBUSxLQUFLLGFBQWE7QUFDdkUsNEJBQXdCLENBQUM7QUFDekIsYUFBUyxJQUFJLEdBQUcsS0FBSyxNQUFNLEtBQUs7QUFDOUIsVUFBSUEsUUFBTztBQUNYLFlBQU0sT0FBTyxLQUFLLEtBQUssSUFBSSxLQUFLLGVBQWUsb0JBQW9CLEtBQUs7QUFDeEUsZUFBUyxJQUFJLElBQUksZUFBZSxJQUFJLE1BQU0sS0FBSztBQUM3QyxRQUFBQSxTQUFRLG1CQUFvQixDQUFFO0FBQUEsTUFBQTtBQUVoQyw0QkFBc0IsS0FBS0EsS0FBSTtBQUFBLElBQUE7QUFHbkIsa0JBQUE7QUFDSSxzQkFBQTtBQUVsQiwrQkFBMkIsUUFBUSxRQUFRLHVCQUF1QixvQkFBb0IsR0FBRyx3QkFBd0IsTUFBTSxJQUFJO0FBQ2pHLDhCQUFBLFFBQVEsUUFBUSx1QkFBdUIsb0JBQW9CLHdCQUF3QixNQUFNLElBQUksb0JBQW9CLEtBQUs7QUFFaEosUUFBSSxXQUFXLEdBQUc7QUFDUywrQkFBQSx3QkFBd0IsTUFBTSxJQUFJO0FBQzNELGVBQVMsTUFBTTtBQUFFLGlCQUFTLE9BQU87QUFBQSxNQUFBLENBQUc7QUFBQSxJQUFBLE9BRWpDO0FBQ2dCLHlCQUFBO0FBQUEsSUFBQTtBQUFBLEVBQ3JCO0FBR0YsV0FBUyxxQkFBc0IsZ0JBQWdCO0FBQzdDLFFBQUksbUJBQW1CLFVBQVUsT0FBTyxXQUFXLGFBQWE7QUFDOUQsWUFBTSxXQUFXLHVCQUF1QjtBQUV4QyxVQUFJLGFBQWEsVUFBVSxhQUFhLFFBQVEsU0FBUyxhQUFhLEdBQUc7QUFDdEQseUJBQUE7QUFBQSxVQUNmO0FBQUEsVUFDQSxtQkFBbUI7QUFBQSxVQUNuQixVQUFVO0FBQUEsVUFDVixTQUFTO0FBQUEsVUFDVCxNQUFNO0FBQUEsVUFDTixHQUFHLEtBQUs7QUFBQSxVQUNSLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUFBLEVBQ047QUFBQSxNQUFBO0FBQUEsSUFDSjtBQUdvQiwwQkFBQTtBQUV0QixVQUFNLGdDQUFnQyxXQUFXLE1BQU0sNkJBQTZCLEtBQUs7QUFDekYsVUFBTSwrQkFBK0IsV0FBVyxNQUFNLDRCQUE0QixLQUFLO0FBQ2pGLFVBQUEsYUFBYSxJQUFJLGdDQUFnQztBQUNqRCxVQUFBLE9BQU8sbUJBQW1CLFVBQVUsa0JBQWtCLElBQ3hELElBQ0EsS0FBSyxLQUFLLGlCQUFpQiw4QkFBOEIsS0FBSztBQUVsRSxVQUFNLFdBQVcsS0FBSztBQUFBLE1BQ3BCO0FBQUEsTUFDQTtBQUFBLE1BQ0EsS0FBSyxNQUFNLE1BQU0seUJBQXlCLElBQUksTUFBTSx5QkFBeUIsTUFBTSxVQUFVO0FBQUEsSUFDL0Y7QUFFQSxtQ0FBK0IsUUFBUTtBQUFBLE1BQ3JDLE9BQU8sS0FBSyxLQUFLLFdBQVcsVUFBVTtBQUFBLE1BQ3RDLE9BQU8sS0FBSyxLQUFLLFdBQVcsNkJBQTZCO0FBQUEsTUFDekQsUUFBUSxLQUFLLEtBQUssWUFBWSxNQUFNLDhCQUE4QjtBQUFBLE1BQ2xFLEtBQUssS0FBSyxLQUFLLFlBQVksSUFBSSw4QkFBOEI7QUFBQSxNQUM3RDtBQUFBLElBQ0Y7QUFBQSxFQUFBO0FBR08sV0FBQSxpQkFBa0IsS0FBSyxTQUFTO0FBQ3ZDLFVBQU0sY0FBYyxNQUFNLDRCQUE0QixPQUFPLFVBQVU7QUFDdkUsVUFBTSxRQUFRO0FBQUEsTUFDWixDQUFFLDZCQUE2QixXQUFZLEdBQUcsOEJBQThCLFFBQVE7QUFBQSxJQUN0RjtBQUVPLFdBQUE7QUFBQSxNQUNMLFFBQVEsVUFDSixFQUFFLEtBQUs7QUFBQSxRQUNQLE9BQU87QUFBQSxRQUNQLEtBQUs7QUFBQSxRQUNMLEtBQUs7QUFBQSxNQUFBLEdBQ0o7QUFBQSxRQUNELEVBQUUsTUFBTTtBQUFBLFVBQ04sRUFBRSxNQUFNO0FBQUEsWUFDTixPQUFPLEVBQUUsQ0FBRSxXQUFZLEdBQUcsR0FBSSwyQkFBMkIsS0FBTSxNQUFNLEdBQUcsTUFBTTtBQUFBLFlBQzlFLFNBQVMsWUFBWTtBQUFBLFVBQ3RCLENBQUE7QUFBQSxRQUNGLENBQUE7QUFBQSxNQUFBLENBQ0YsSUFDQyxFQUFFLEtBQUs7QUFBQSxRQUNQLE9BQU87QUFBQSxRQUNQLEtBQUs7QUFBQSxRQUNMLEtBQUs7QUFBQSxRQUNMLE9BQU8sRUFBRSxDQUFFLFdBQVksR0FBRyxHQUFJLDJCQUEyQixLQUFNLE1BQU0sR0FBRyxNQUFNO0FBQUEsTUFBQSxDQUMvRTtBQUFBLE1BRUgsRUFBRSxLQUFLO0FBQUEsUUFDTCxPQUFPO0FBQUEsUUFDUCxLQUFLO0FBQUEsUUFDTCxLQUFLO0FBQUEsUUFDTCxVQUFVO0FBQUEsTUFBQSxHQUNULFFBQVEsTUFBTTtBQUFBLE1BRWpCLFFBQVEsVUFDSixFQUFFLEtBQUs7QUFBQSxRQUNQLE9BQU87QUFBQSxRQUNQLEtBQUs7QUFBQSxRQUNMLEtBQUs7QUFBQSxNQUFBLEdBQ0o7QUFBQSxRQUNELEVBQUUsTUFBTTtBQUFBLFVBQ04sRUFBRSxNQUFNO0FBQUEsWUFDTixPQUFPLEVBQUUsQ0FBRSxXQUFZLEdBQUcsR0FBSSwwQkFBMEIsS0FBTSxNQUFNLEdBQUcsTUFBTTtBQUFBLFlBQzdFLFNBQVMsWUFBWTtBQUFBLFVBQ3RCLENBQUE7QUFBQSxRQUNGLENBQUE7QUFBQSxNQUFBLENBQ0YsSUFDQyxFQUFFLEtBQUs7QUFBQSxRQUNQLE9BQU87QUFBQSxRQUNQLEtBQUs7QUFBQSxRQUNMLEtBQUs7QUFBQSxRQUNMLE9BQU8sRUFBRSxDQUFFLFdBQVksR0FBRyxHQUFJLDBCQUEwQixLQUFNLE1BQU0sR0FBRyxNQUFNO0FBQUEsTUFDOUUsQ0FBQTtBQUFBLElBQ0w7QUFBQSxFQUFBO0FBR0YsV0FBUyxXQUFZLE9BQU87QUFDMUIsUUFBSSxnQkFBZ0IsT0FBTztBQUNuQixZQUFBLG9CQUFvQixVQUFVLEtBQUssaUJBQWlCO0FBQUEsUUFDeEQ7QUFBQSxRQUNBLE1BQU0sd0JBQXdCLE1BQU07QUFBQSxRQUNwQyxJQUFJLHdCQUF3QixNQUFNLEtBQUs7QUFBQSxRQUN2QyxXQUFXLFFBQVEsY0FBYyxhQUFhO0FBQUEsUUFDOUMsS0FBSztBQUFBLE1BQUEsQ0FDTjtBQUVhLG9CQUFBO0FBQUEsSUFBQTtBQUFBLEVBQ2hCO0FBR21CLHVCQUFBO0FBQ3JCLFFBQU0scUJBQXFCO0FBQUEsSUFDekI7QUFBQSxJQUNBLEdBQUcsU0FBUyxHQUFHLFFBQVEsT0FBTyxNQUFNO0FBQUEsRUFDdEM7QUFFQSxnQkFBYyxNQUFNO0FBQ0cseUJBQUE7QUFBQSxFQUFBLENBQ3RCO0FBRUQsTUFBSSxpQkFBaUI7QUFFckIsZ0JBQWMsTUFBTTtBQUNELHFCQUFBO0FBQUEsRUFBQSxDQUNsQjtBQUVELGNBQVksTUFBTTtBQUNoQixRQUFJLG1CQUFtQixLQUFNO0FBRTdCLFVBQU0sV0FBVyx1QkFBdUI7QUFFcEMsUUFBQSxvQkFBb0IsVUFBVSxhQUFhLFVBQVUsYUFBYSxRQUFRLFNBQVMsYUFBYSxHQUFHO0FBQ3JHO0FBQUEsUUFDRTtBQUFBLFFBQ0E7QUFBQSxRQUNBLE1BQU07QUFBQSxRQUNOLEdBQUcsS0FBSztBQUFBLE1BQ1Y7QUFBQSxJQUFBLE9BRUc7QUFDSCxlQUFTLFdBQVc7QUFBQSxJQUFBO0FBQUEsRUFDdEIsQ0FDRDtBQUVpQixrQkFBZ0IsTUFBTTtBQUN0Qyx1QkFBbUIsT0FBTztBQUFBLEVBQUEsQ0FDM0I7QUFHRCxTQUFPLE9BQU8sT0FBTyxFQUFFLFVBQVUsT0FBTyxTQUFTO0FBRTFDLFNBQUE7QUFBQSxJQUNMO0FBQUEsSUFDQTtBQUFBLElBRUE7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUVBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0Y7QUN2dUJBLE1BQU0sYUFBYTtBQUNuQixNQUFNLFlBQVk7QUFDbEIsTUFBTSxXQUFXO0FBQ2pCLE1BQU0sY0FBYztBQUVMLFNBQVEsa0JBQUUsU0FBUztBQUNoQyxTQUFPLFNBQVMsY0FBZSxHQUFHO0FBQ2hDLFFBQUksRUFBRSxTQUFTLG9CQUFvQixFQUFFLFNBQVMsVUFBVTtBQUN0RCxVQUFJLEVBQUUsT0FBTyxlQUFlLEtBQU07QUFDbEMsUUFBRSxPQUFPLGFBQWE7QUFDdEIsY0FBUSxDQUFDO0FBQUEsSUFDZixXQUVNLEVBQUUsU0FBUyx1QkFDUixFQUFFLE9BQU8sZUFBZSxRQUN4QixPQUFPLEVBQUUsU0FBUyxVQUNyQjtBQUNBLFlBQU0sY0FBYyxPQUFPLEdBQUcsWUFBWSxPQUN0QyxZQUFZLEtBQUssRUFBRSxJQUFJLE1BQU0sUUFDN0IsV0FBVyxLQUFLLEVBQUUsSUFBSSxNQUFNLFFBQVEsVUFBVSxLQUFLLEVBQUUsSUFBSSxNQUFNLFFBQVEsU0FBUyxLQUFLLEVBQUUsSUFBSSxNQUFNO0FBRXJHLFVBQUksZ0JBQWdCLE1BQU07QUFDeEIsVUFBRSxPQUFPLGFBQWE7QUFBQSxNQUM5QjtBQUFBLElBQ0E7QUFBQSxFQUNBO0FBQ0E7QUNMTyxTQUFTLG9CQUFxQixHQUFHLEtBQUssS0FBSztBQUNoRCxNQUFJLE9BQU8sS0FBSztBQUNkLFdBQU87QUFBQSxFQUNYO0FBRUUsUUFBTUEsUUFBUSxNQUFNLE1BQU07QUFFMUIsTUFBSSxRQUFRLE9BQU8sSUFBSSxPQUFPQTtBQUM5QixNQUFJLFFBQVEsS0FBSztBQUNmLFlBQVFBLFFBQU87QUFBQSxFQUNuQjtBQUVFLFNBQU8sVUFBVSxJQUFJLElBQUk7QUFDM0I7QUNYQSxNQUFNLHVCQUF1QixPQUFLLENBQUUsT0FBTyxjQUFjLFFBQVEsRUFBRyxTQUFTLENBQUM7QUFDOUUsTUFBTSxlQUFlO0FBQ3JCLE1BQU0saUJBQWlCLE9BQU8sS0FBSyxhQUFhO0FBRWhELFNBQVMsZUFBZ0IsY0FBYyxpQkFBaUI7QUFDdEQsTUFBSSxPQUFPLGlCQUFpQixXQUFZLFFBQU87QUFFL0MsUUFBTSxXQUFXLGlCQUFpQixTQUM5QixlQUNBO0FBRUosU0FBTyxTQUFTLFFBQVEsUUFBUSxPQUFPLFFBQVEsWUFBWSxZQUFZLE1BQU8sSUFBSyxRQUFVLElBQUc7QUFDbEc7QUFFQSxNQUFBLFVBQWUsZ0JBQWdCO0FBQUEsRUFDN0IsTUFBTTtBQUFBLEVBRU4sY0FBYztBQUFBLEVBRWQsT0FBTztBQUFBLElBQ0wsR0FBRztBQUFBLElBQ0gsR0FBRztBQUFBLElBQ0gsR0FBRztBQUFBO0FBQUEsSUFHSCxZQUFZO0FBQUEsTUFDVixVQUFVO0FBQUEsSUFDWDtBQUFBLElBRUQsVUFBVTtBQUFBLElBRVYsY0FBYyxDQUFFLFFBQVEsTUFBUTtBQUFBLElBQ2hDLGtCQUFrQjtBQUFBLElBQ2xCLGNBQWM7QUFBQSxJQUVkLFNBQVM7QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLFNBQVMsTUFBTSxDQUFBO0FBQUEsSUFDaEI7QUFBQSxJQUVELGFBQWEsQ0FBRSxVQUFVLE1BQVE7QUFBQSxJQUNqQyxhQUFhLENBQUUsVUFBVSxNQUFRO0FBQUEsSUFDakMsZUFBZSxDQUFFLFVBQVUsTUFBUTtBQUFBLElBRW5DLGNBQWM7QUFBQSxJQUNkLGtCQUFrQjtBQUFBLElBQ2xCLFdBQVc7QUFBQSxJQUVYLFdBQVcsQ0FBRSxRQUFRLE1BQVE7QUFBQSxJQUU3QixjQUFjO0FBQUEsSUFDZCxhQUFhO0FBQUEsTUFDWCxNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsSUFDVjtBQUFBLElBQ0Qsc0JBQXNCO0FBQUEsSUFDdEIsYUFBYTtBQUFBLElBRWIsY0FBYztBQUFBLElBRWQsWUFBWTtBQUFBLElBQ1osWUFBWTtBQUFBLElBQ1osVUFBVTtBQUFBLElBQ1YsWUFBWTtBQUFBLElBRVosbUJBQW1CO0FBQUEsSUFDbkIsbUJBQW1CLENBQUUsUUFBUSxPQUFPLE1BQVE7QUFBQSxJQUM1QyxxQkFBcUI7QUFBQSxJQUVyQixVQUFVO0FBQUEsSUFDVixVQUFVO0FBQUEsSUFFVixjQUFjO0FBQUEsTUFDWixNQUFNO0FBQUEsTUFDTixXQUFXO0FBQUEsSUFDWjtBQUFBLElBRUQsWUFBWTtBQUFBLElBQ1osV0FBVztBQUFBLElBRVgscUJBQXFCO0FBQUEsSUFFckIsZUFBZTtBQUFBLE1BQ2IsTUFBTSxDQUFFLFFBQVEsTUFBUTtBQUFBLE1BQ3hCLFNBQVM7QUFBQSxJQUNWO0FBQUEsSUFFRCxZQUFZLENBQUUsT0FBTyxRQUFRLE1BQVE7QUFBQSxJQUNyQyxZQUFZLENBQUUsT0FBTyxRQUFRLE1BQVE7QUFBQSxJQUVyQyxVQUFVO0FBQUEsTUFDUixNQUFNLENBQUUsUUFBUSxNQUFRO0FBQUEsTUFDeEIsU0FBUztBQUFBLElBQ1Y7QUFBQSxJQUVELGNBQWM7QUFBQSxJQUVkLGdCQUFnQixDQUFFO0FBQUEsSUFDbEIsZ0JBQWdCLENBQUU7QUFBQSxJQUNsQixvQkFBb0IsQ0FBRTtBQUFBLElBRXRCLFVBQVU7QUFBQSxNQUNSLE1BQU07QUFBQSxNQUNOLFdBQVcsT0FBSyxDQUFFLFdBQVcsUUFBUSxRQUFVLEVBQUMsU0FBUyxDQUFDO0FBQUEsTUFDMUQsU0FBUztBQUFBLElBQ1Y7QUFBQTtBQUFBLElBR0QsdUJBQXVCLHNCQUFzQixzQkFBc0I7QUFBQSxJQUVuRSxZQUFZO0FBQUEsSUFDWixVQUFVO0FBQUEsRUFDWDtBQUFBLEVBRUQsT0FBTztBQUFBLElBQ0wsR0FBRztBQUFBLElBQ0g7QUFBQSxJQUFPO0FBQUEsSUFBVTtBQUFBLElBQ2pCO0FBQUEsSUFBUztBQUFBLElBQVk7QUFBQSxJQUNyQjtBQUFBLElBQWE7QUFBQSxJQUNiO0FBQUEsRUFDRDtBQUFBLEVBRUQsTUFBTyxPQUFPLEVBQUUsT0FBTyxLQUFJLEdBQUk7QUFDN0IsVUFBTSxFQUFFLE1BQUssSUFBSyxtQkFBa0I7QUFDcEMsVUFBTSxFQUFFLEdBQUUsSUFBSztBQUVmLFVBQU0sT0FBTyxJQUFJLEtBQUs7QUFDdEIsVUFBTSxTQUFTLElBQUksS0FBSztBQUN4QixVQUFNLGNBQWMsSUFBSSxFQUFFO0FBQzFCLFVBQU0sYUFBYSxJQUFJLEVBQUU7QUFDekIsVUFBTSxxQkFBcUIsSUFBSSxLQUFLO0FBQ3BDLFVBQU0sd0JBQXdCLElBQUksS0FBSztBQUV2QyxRQUFJLGNBQWMsTUFBTSxrQkFBa0IsTUFDeEMsaUJBQ0EsV0FBVyxnQkFBZ0IsV0FBVyxNQUFNLG1CQUM1Qyx3QkFBd0IsY0FBYztBQUV4QyxVQUFNLFdBQVcsSUFBSSxJQUFJO0FBQ3pCLFVBQU0sWUFBWSxJQUFJLElBQUk7QUFDMUIsVUFBTSxVQUFVLElBQUksSUFBSTtBQUN4QixVQUFNLFlBQVksSUFBSSxJQUFJO0FBQzFCLFVBQU0saUJBQWlCLElBQUksSUFBSTtBQUUvQixVQUFNLFdBQVcscUJBQXFCLEtBQUs7QUFFM0MsVUFBTSxnQkFBZ0Isa0JBQWtCLE9BQU87QUFFL0MsVUFBTSxzQkFBc0IsU0FBUyxNQUNuQyxNQUFNLFFBQVEsTUFBTSxPQUFPLElBQ3ZCLE1BQU0sUUFBUSxTQUNkLENBQ0w7QUFFRCxVQUFNLGdDQUFnQyxTQUFTLE1BQzdDLE1BQU0sMEJBQTBCLFNBQzNCLE1BQU0saUJBQWlCLE9BQU8sS0FBSyxLQUNwQyxNQUFNLHFCQUNYO0FBRUQsVUFBTTtBQUFBLE1BQ0o7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNELElBQUcsaUJBQWlCO0FBQUEsTUFDbkI7QUFBQSxNQUFxQjtBQUFBLE1BQXdCO0FBQUEsTUFDN0M7QUFBQSxJQUNELENBQUE7QUFFRCxVQUFNLFFBQVEsY0FBYTtBQUUzQixVQUFNLGFBQWEsU0FBUyxNQUFNO0FBQ2hDLFlBQ0UsVUFBVSxNQUFNLGVBQWUsUUFBUSxNQUFNLGFBQWEsTUFDMUQsTUFBTSxNQUFNLGVBQWUsV0FBVyxNQUFNLGVBQWUsUUFBUSxZQUFZLFFBQzFFLE1BQU0sYUFBYSxRQUFRLE1BQU0sUUFBUSxNQUFNLFVBQVUsSUFBSSxNQUFNLGFBQWEsQ0FBRSxNQUFNLFVBQVksSUFDckcsQ0FBQTtBQUVOLFVBQUksTUFBTSxlQUFlLFFBQVEsTUFBTSxRQUFRLE1BQU0sT0FBTyxNQUFNLE1BQU07QUFDdEUsY0FBTSxRQUFRLE1BQU0sZUFBZSxRQUFRLG9CQUFvQixTQUMzRCxrQkFDQSxDQUFBO0FBQ0osY0FBTSxTQUFTLElBQUksSUFBSSxPQUFLLFVBQVUsR0FBRyxLQUFLLENBQUM7QUFFL0MsZUFBTyxNQUFNLGVBQWUsUUFBUSxZQUFZLE9BQzVDLE9BQU8sT0FBTyxPQUFLLE1BQU0sSUFBSSxJQUM3QjtBQUFBLE1BQ1o7QUFFTSxhQUFPO0FBQUEsSUFDUixDQUFBO0FBRUQsVUFBTSxrQkFBa0IsU0FBUyxNQUFNO0FBQ3JDLFlBQU0sTUFBTSxDQUFBO0FBQ1oscUJBQWUsUUFBUSxTQUFPO0FBQzVCLGNBQU0sTUFBTSxNQUFPLEdBQUc7QUFDdEIsWUFBSSxRQUFRLFFBQVE7QUFDbEIsY0FBSyxHQUFHLElBQUs7QUFBQSxRQUN2QjtBQUFBLE1BQ08sQ0FBQTtBQUNELGFBQU87QUFBQSxJQUNSLENBQUE7QUFFRCxVQUFNLGdCQUFnQixTQUFTLE1BQzdCLE1BQU0sZ0JBQWdCLE9BQ2xCLE1BQU0sT0FBTyxRQUNiLE1BQU0sV0FDWDtBQUVELFVBQU0sV0FBVyxTQUFTLE1BQU0sbUJBQW1CLFdBQVcsS0FBSyxDQUFDO0FBRXBFLFVBQU0scUJBQXFCLFNBQVMsTUFBTTtBQUN4QyxVQUFJLE1BQU07QUFFVixVQUFJLE1BQU0saUJBQWlCLFFBQVEsV0FBVyxNQUFNLFdBQVcsR0FBRztBQUNoRSxlQUFPLENBQUUsS0FBSyxNQUFNLFVBQVU7QUFBQSxNQUN0QztBQUVNLGFBQU87QUFFUCxhQUFPLE1BQU0sZUFBZSxTQUN4QixNQUNBLENBQUUsS0FBSyxNQUFNLFVBQVU7QUFBQSxJQUM1QixDQUFBO0FBRUQsVUFBTSxtQkFBbUI7QUFBQSxNQUFTLE9BQy9CLE1BQU0sNEJBQTRCLE9BQU8saUNBQWlDLE9BQ3hFLE1BQU0sb0JBQW9CLE1BQU0sTUFBTSxvQkFBb0I7QUFBQSxJQUNuRTtBQUVJLFVBQU0sWUFBWSxTQUFTLE1BQU0sb0JBQW9CLFVBQVUsQ0FBQztBQUVoRSxVQUFNLGlCQUFpQjtBQUFBLE1BQVMsTUFDOUIsV0FBVyxNQUNSLElBQUksU0FBTyxlQUFlLE1BQU0sR0FBRyxDQUFDLEVBQ3BDLEtBQUssSUFBSTtBQUFBLElBQ2xCO0FBRUksVUFBTSxtQkFBbUIsU0FBUyxNQUFPLE1BQU0saUJBQWlCLFNBQzVELE1BQU0sZUFDTixlQUFlLEtBQ2xCO0FBRUQsVUFBTSxjQUFjLFNBQVMsTUFDM0IsTUFBTSxnQkFBZ0IsT0FDbEIsTUFBTSxPQUNOLFNBQU8sS0FBSyxTQUFTLElBQzFCO0FBRUQsVUFBTSxjQUFjLFNBQVMsTUFDM0IsTUFBTSxxQkFBcUIsUUFDekIsTUFBTSxpQkFBaUIsV0FDckIsTUFBTSxnQkFBZ0IsUUFDbkIsV0FBVyxNQUFNLEtBQUssWUFBWSxLQUFLLEVBRy9DO0FBRUQsVUFBTSxXQUFXLFNBQVMsTUFBTyxNQUFNLFFBQVEsVUFBVSxPQUFPLE1BQU0sV0FBVyxFQUFHO0FBRXBGLFVBQU0sZ0JBQWdCLFNBQVMsTUFBTTtBQUNuQyxZQUFNLFFBQVE7QUFBQSxRQUNaLFVBQVUsTUFBTTtBQUFBLFFBQ2hCLE1BQU07QUFBQSxRQUNOLGNBQWMsTUFBTTtBQUFBLFFBQ3BCLGlCQUFpQixNQUFNLGFBQWEsT0FBTyxTQUFTO0FBQUEsUUFDcEQscUJBQXFCLE1BQU0sYUFBYSxPQUFPLFNBQVM7QUFBQSxRQUN4RCxpQkFBaUIsS0FBSyxVQUFVLE9BQU8sU0FBUztBQUFBLFFBQ2hELGlCQUFpQixHQUFJLE1BQU0sVUFBVSxLQUFLO0FBQUEsTUFDbEQ7QUFFTSxVQUFJLFlBQVksU0FBUyxHQUFHO0FBQzFCLGNBQU8sMkJBQTRCLEdBQUksTUFBTSxVQUFVLEtBQU8sSUFBSSxZQUFZLEtBQU87QUFBQSxNQUM3RjtBQUVNLGFBQU87QUFBQSxJQUNSLENBQUE7QUFFRCxVQUFNLGVBQWUsU0FBUyxPQUFPO0FBQUEsTUFDbkMsSUFBSSxHQUFJLE1BQU0sVUFBVSxLQUFPO0FBQUEsTUFDL0IsTUFBTTtBQUFBLE1BQ04sd0JBQXdCLE1BQU0sYUFBYSxPQUFPLFNBQVM7QUFBQSxJQUNqRSxFQUFNO0FBRUYsVUFBTSxnQkFBZ0IsU0FBUyxNQUFNO0FBQ25DLGFBQU8sV0FBVyxNQUFNLElBQUksQ0FBQyxLQUFLLE9BQU87QUFBQSxRQUN2QyxPQUFPO0FBQUEsUUFDUDtBQUFBLFFBQ0EsTUFBTSxZQUFZLE1BQU0sR0FBRztBQUFBLFFBQzNCLFVBQVU7QUFBQSxRQUNWLGVBQWU7QUFBQSxRQUNmO0FBQUEsUUFDQSxVQUFVLFNBQVM7QUFBQSxNQUMzQixFQUFRO0FBQUEsSUFDSCxDQUFBO0FBRUQsVUFBTSxjQUFjLFNBQVMsTUFBTTtBQUNqQyxVQUFJLG9CQUFvQixVQUFVLEdBQUc7QUFDbkMsZUFBTyxDQUFBO0FBQUEsTUFDZjtBQUVNLFlBQU0sRUFBRSxNQUFNLEdBQUksSUFBRyx3QkFBd0I7QUFFN0MsYUFBTyxNQUFNLFFBQVEsTUFBTSxNQUFNLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxNQUFNO0FBQ25ELGNBQU0sVUFBVSxpQkFBaUIsTUFBTSxHQUFHLE1BQU07QUFDaEQsY0FBTSxTQUFTLGlCQUFpQixHQUFHLE1BQU07QUFDekMsY0FBTSxRQUFRLE9BQU87QUFFckIsY0FBTSxZQUFZO0FBQUEsVUFDaEIsV0FBVztBQUFBLFVBQ1g7QUFBQSxVQUNBLGFBQWEsNkJBQTZCO0FBQUEsVUFDMUMsYUFBYTtBQUFBLFVBQ2IsU0FBUztBQUFBLFVBQ1Q7QUFBQSxVQUNBLFVBQVU7QUFBQSxVQUNWLE9BQU8sTUFBTTtBQUFBLFVBQ2IsTUFBTSxjQUFjO0FBQUEsVUFDcEIsTUFBTTtBQUFBLFVBQ04saUJBQWlCLFdBQVcsT0FBTyxTQUFTO0FBQUEsVUFDNUMsSUFBSSxHQUFJLE1BQU0sVUFBVSxLQUFPLElBQUk7VUFDbkMsU0FBUyxNQUFNO0FBQUUseUJBQWEsR0FBRztBQUFBLFVBQUM7QUFBQSxRQUM1QztBQUVRLFlBQUksWUFBWSxNQUFNO0FBQ3BCLHNCQUFZLFVBQVUsVUFBVSxVQUFVLFVBQVU7QUFFcEQsY0FBSSxHQUFHLFNBQVMsR0FBRyxZQUFZLE1BQU07QUFDbkMsc0JBQVUsY0FBYyxNQUFNO0FBQUUsbUJBQUssVUFBVSxRQUFRLGVBQWUsS0FBSztBQUFBLFlBQUM7QUFBQSxVQUN4RjtBQUFBLFFBQ0E7QUFFUSxlQUFPO0FBQUEsVUFDTDtBQUFBLFVBQ0E7QUFBQSxVQUNBLE1BQU0sWUFBWSxNQUFNLEdBQUc7QUFBQSxVQUMzQixPQUFPLGVBQWUsTUFBTSxHQUFHO0FBQUEsVUFDL0IsVUFBVSxVQUFVO0FBQUEsVUFDcEIsU0FBUyxVQUFVO0FBQUEsVUFDbkI7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFFBQ1Y7QUFBQSxNQUNPLENBQUE7QUFBQSxJQUNGLENBQUE7QUFFRCxVQUFNLG9CQUFvQixTQUFTLE1BQ2pDLE1BQU0saUJBQWlCLFNBQ25CLE1BQU0sZUFDTixHQUFHLFFBQVEsTUFBTSxRQUN0QjtBQUVELFVBQU0sY0FBYztBQUFBLE1BQVMsTUFDM0IsTUFBTSxpQkFBaUIsU0FDcEIsTUFBTSxhQUFhLFFBQ25CLE1BQU0sYUFBYSxRQUNuQixNQUFNLGVBQWUsUUFDckIsTUFBTSxZQUFZO0FBQUEsSUFDM0I7QUFFSSxVQUFNLCtCQUErQixTQUFTLE1BQzVDLE1BQU0seUJBQXlCLFNBQzNCLE1BQU0sdUJBQ0wsTUFBTSxVQUFVLFNBQVMsUUFBUyxNQUFNLEtBQU8sS0FBSSxFQUN6RDtBQUlELFVBQU0saUJBQWlCLFNBQVMsTUFBTSxlQUFlLE1BQU0sYUFBYSxPQUFPLENBQUM7QUFJaEYsVUFBTSxpQkFBaUIsU0FBUyxNQUFNLGVBQWUsTUFBTSxhQUFhLE9BQU8sQ0FBQztBQUloRixVQUFNLG1CQUFtQixTQUFTLE1BQU0sZUFBZSxNQUFNLGVBQWUsU0FBUyxDQUFDO0FBRXRGLFVBQU0sb0JBQW9CLFNBQVMsTUFBTSxXQUFXLE1BQU0sSUFBSSxlQUFlLEtBQUssQ0FBQztBQUVuRixVQUFNLHFCQUFxQixTQUFTLE1BQU07QUFDeEMsWUFBTSxNQUFNO0FBQUEsUUFDVjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFLQSxVQUFVO0FBQUEsUUFDVixXQUFXO0FBQUEsUUFDWCxTQUFTO0FBQUEsUUFDVCxZQUFZO0FBQUEsUUFDWixTQUFTO0FBQUEsUUFDVCxRQUFTLEdBQUc7QUFBRSx3QkFBYyxRQUFRLEtBQUssQ0FBQztBQUFBLFFBQUM7QUFBQSxNQUNuRDtBQUVNLFVBQUkscUJBQXFCLElBQUksc0JBQXNCLElBQUksbUJBQW1CO0FBRTFFLGFBQU87QUFBQSxJQUNSLENBQUE7QUFFRCxVQUFNLFlBQVksU0FBTztBQUN2Qix3QkFBa0I7QUFFbEIsVUFDRSxNQUFNLGFBQWEsUUFDaEIsTUFBTSxjQUFjLFFBQ3BCLE1BQU0sYUFBYSxRQUduQixNQUFNLGFBQWEsVUFBVSxTQUMzQixPQUFPLFVBQVUsUUFBUSxLQUFLLFVBQVUsUUFBUyxTQUFTLFVBQVUsT0FDekU7QUFDQSwyQkFBbUIsUUFBUSxnQkFBZTtBQUMxQyxZQUFJLE9BQU8sVUFBVSxRQUFRLEtBQUssVUFBVSxNQUFNO0FBQ2hELGlCQUFPLEVBQUU7QUFBQSxRQUNuQjtBQUFBLE1BQ0E7QUFBQSxJQUNBLEdBQU8sRUFBRSxXQUFXLEtBQU0sQ0FBQTtBQUV0QixVQUFNLE1BQU0sTUFBTSxXQUFXLGVBQWU7QUFFNUMsVUFBTSxNQUFNLFVBQVU7QUFFdEIsVUFBTSxxQkFBcUIsWUFBWTtBQUV2QyxhQUFTLHVCQUF3QixLQUFLO0FBQ3BDLGFBQU8sTUFBTSxjQUFjLE9BQ3ZCLGVBQWUsTUFBTSxHQUFHLElBQ3hCO0FBQUEsSUFDVjtBQUVJLGFBQVMsY0FBZSxPQUFPO0FBQzdCLFVBQUksVUFBVSxNQUFNLFFBQVEsV0FBVyxNQUFNLFFBQVE7QUFDbkQsWUFBSSxNQUFNLGFBQWEsTUFBTTtBQUMzQixnQkFBTSxRQUFRLE1BQU0sV0FBVyxNQUFLO0FBQ3BDLGVBQUssVUFBVSxFQUFFLE9BQU8sT0FBTyxNQUFNLE9BQU8sT0FBTyxDQUFDLEVBQUcsR0FBSyxDQUFBO0FBQzVELGVBQUsscUJBQXFCLEtBQUs7QUFBQSxRQUN6QyxPQUNhO0FBQ0gsZUFBSyxxQkFBcUIsSUFBSTtBQUFBLFFBQ3hDO0FBQUEsTUFDQTtBQUFBLElBQ0E7QUFFSSxhQUFTLHNCQUF1QixPQUFPO0FBQ3JDLG9CQUFjLEtBQUs7QUFDbkIsWUFBTSxNQUFLO0FBQUEsSUFDakI7QUFFSSxhQUFTLElBQUssS0FBSyxRQUFRO0FBQ3pCLFlBQU0sTUFBTSx1QkFBdUIsR0FBRztBQUV0QyxVQUFJLE1BQU0sYUFBYSxNQUFNO0FBQzNCLGNBQU0sY0FBYyxRQUFRO0FBQUEsVUFDMUIsZUFBZSxNQUFNLEdBQUc7QUFBQSxVQUN4QjtBQUFBLFVBQ0E7QUFBQSxRQUNWO0FBRVEsYUFBSyxxQkFBcUIsR0FBRztBQUM3QjtBQUFBLE1BQ1I7QUFFTSxVQUFJLFdBQVcsTUFBTSxXQUFXLEdBQUc7QUFDakMsYUFBSyxPQUFPLEVBQUUsT0FBTyxHQUFHLE9BQU8sSUFBSyxDQUFBO0FBQ3BDLGFBQUsscUJBQXFCLE1BQU0sYUFBYSxPQUFPLENBQUUsR0FBRyxJQUFLLEdBQUc7QUFDakU7QUFBQSxNQUNSO0FBRU0sVUFDRSxXQUFXLFFBQ1IsaUJBQWlCLEdBQUcsTUFBTSxLQUM3QjtBQUVGLFVBQ0UsTUFBTSxjQUFjLFVBQ2pCLE1BQU0sV0FBVyxVQUFVLE1BQU0sVUFDcEM7QUFFRixZQUFNLFFBQVEsTUFBTSxXQUFXLE1BQUs7QUFFcEMsV0FBSyxPQUFPLEVBQUUsT0FBTyxNQUFNLFFBQVEsT0FBTyxJQUFLLENBQUE7QUFDL0MsWUFBTSxLQUFLLEdBQUc7QUFDZCxXQUFLLHFCQUFxQixLQUFLO0FBQUEsSUFDckM7QUFFSSxhQUFTLGFBQWMsS0FBSyxVQUFVO0FBQ3BDLFVBQ0UsTUFBTSxTQUFTLFVBQVUsUUFDdEIsUUFBUSxVQUNSLGlCQUFpQixNQUFNLEdBQUcsTUFBTSxLQUNuQztBQUVGLFlBQU0sV0FBVyxlQUFlLE1BQU0sR0FBRztBQUV6QyxVQUFJLE1BQU0sYUFBYSxNQUFNO0FBQzNCLFlBQUksYUFBYSxNQUFNO0FBQ3JCO0FBQUEsWUFDRSxNQUFNLGNBQWMsT0FBTyxlQUFlLE1BQU0sR0FBRyxJQUFJO0FBQUEsWUFDdkQ7QUFBQSxZQUNBO0FBQUEsVUFDWjtBQUVVLG9CQUFTO0FBQUEsUUFDbkI7QUFFUSxrQkFBVSxPQUFPLE1BQUs7QUFFdEIsWUFDRSxXQUFXLE1BQU0sV0FBVyxLQUN6QixZQUFZLGVBQWUsTUFBTSxXQUFXLE1BQU8sQ0FBRyxDQUFBLEdBQUcsUUFBUSxNQUFNLE1BQzFFO0FBQ0EsZUFBSyxxQkFBcUIsTUFBTSxjQUFjLE9BQU8sV0FBVyxHQUFHO0FBQUEsUUFDN0U7QUFFUTtBQUFBLE1BQ1I7QUFFTSxVQUFJLGNBQWMsUUFBUSxtQkFBbUIsVUFBVSxNQUFNO0FBQzNELGNBQU0sTUFBSztBQUFBLE1BQ25CO0FBRU0sc0JBQWU7QUFFZixVQUFJLFdBQVcsTUFBTSxXQUFXLEdBQUc7QUFDakMsY0FBTSxNQUFNLE1BQU0sY0FBYyxPQUFPLFdBQVc7QUFDbEQsYUFBSyxPQUFPLEVBQUUsT0FBTyxHQUFHLE9BQU8sSUFBSyxDQUFBO0FBQ3BDLGFBQUsscUJBQXFCLE1BQU0sYUFBYSxPQUFPLENBQUUsR0FBRyxJQUFLLEdBQUc7QUFDakU7QUFBQSxNQUNSO0FBRU0sWUFDRSxRQUFRLE1BQU0sV0FBVyxNQUFPLEdBQ2hDLFFBQVEsa0JBQWtCLE1BQU0sVUFBVSxPQUFLLFlBQVksR0FBRyxRQUFRLENBQUM7QUFFekUsVUFBSSxVQUFVLElBQUk7QUFDaEIsYUFBSyxVQUFVLEVBQUUsT0FBTyxPQUFPLE1BQU0sT0FBTyxPQUFPLENBQUMsRUFBRyxHQUFLLENBQUE7QUFBQSxNQUNwRSxPQUNXO0FBQ0gsWUFDRSxNQUFNLGNBQWMsVUFDakIsTUFBTSxVQUFVLE1BQU0sVUFDekI7QUFFRixjQUFNLE1BQU0sTUFBTSxjQUFjLE9BQU8sV0FBVztBQUVsRCxhQUFLLE9BQU8sRUFBRSxPQUFPLE1BQU0sUUFBUSxPQUFPLElBQUssQ0FBQTtBQUMvQyxjQUFNLEtBQUssR0FBRztBQUFBLE1BQ3RCO0FBRU0sV0FBSyxxQkFBcUIsS0FBSztBQUFBLElBQ3JDO0FBRUksYUFBUyxlQUFnQixPQUFPO0FBQzlCLFVBQUksR0FBRyxTQUFTLEdBQUcsWUFBWSxLQUFNO0FBRXJDLFlBQU0sTUFBTSxVQUFVLE1BQU0sUUFBUSxvQkFBb0IsUUFDcEQsUUFDQTtBQUVKLFVBQUksWUFBWSxVQUFVLEtBQUs7QUFDN0Isb0JBQVksUUFBUTtBQUFBLE1BQzVCO0FBQUEsSUFDQTtBQUVJLGFBQVMsb0JBQXFCLFNBQVMsR0FBRyxnQkFBZ0I7QUFDeEQsVUFBSSxLQUFLLFVBQVUsTUFBTTtBQUN2QixZQUFJLFFBQVEsWUFBWTtBQUN4QixXQUFHO0FBQ0Qsa0JBQVE7QUFBQSxZQUNOLFFBQVE7QUFBQSxZQUNSO0FBQUEsWUFDQSxvQkFBb0IsUUFBUTtBQUFBLFVBQ3hDO0FBQUEsUUFDQSxTQUNlLFVBQVUsTUFBTSxVQUFVLFlBQVksU0FBUyxpQkFBaUIsTUFBTSxNQUFNLFFBQVMsS0FBSyxDQUFFLE1BQU07QUFFekcsWUFBSSxZQUFZLFVBQVUsT0FBTztBQUMvQix5QkFBZSxLQUFLO0FBQ3BCLG1CQUFTLEtBQUs7QUFFZCxjQUFJLG1CQUFtQixRQUFRLE1BQU0sYUFBYSxRQUFRLE1BQU0sY0FBYyxNQUFNO0FBQ2xGO0FBQUEsY0FDRSxTQUFTLElBQ0wsZUFBZSxNQUFNLE1BQU0sUUFBUyxLQUFPLENBQUEsSUFDM0M7QUFBQSxjQUNKO0FBQUEsWUFDZDtBQUFBLFVBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0E7QUFFSSxhQUFTLFVBQVcsT0FBTyxZQUFZO0FBQ3JDLFlBQU0sS0FBSyxTQUFPLFlBQVksZUFBZSxNQUFNLEdBQUcsR0FBRyxLQUFLO0FBQzlELGFBQU8sTUFBTSxRQUFRLEtBQUssRUFBRSxLQUFLLFdBQVcsS0FBSyxFQUFFLEtBQUs7QUFBQSxJQUM5RDtBQUVJLGFBQVMsaUJBQWtCLEtBQUs7QUFDOUIsWUFBTSxNQUFNLGVBQWUsTUFBTSxHQUFHO0FBQ3BDLGFBQU8sa0JBQWtCLE1BQU0sS0FBSyxPQUFLLFlBQVksR0FBRyxHQUFHLENBQUMsTUFBTTtBQUFBLElBQ3hFO0FBRUksYUFBUyxnQkFBaUIsR0FBRztBQUMzQixVQUNFLE1BQU0sYUFBYSxRQUNoQixVQUFVLFVBQVUsU0FDbkIsTUFBTSxVQUFXLFVBQVUsVUFBVSxFQUFFLFVBQVUsRUFBRSxPQUFPLFVBQVUsZUFBZSxRQUN2RjtBQUNBLGtCQUFVLE1BQU0sT0FBTTtBQUFBLE1BQzlCO0FBQUEsSUFDQTtBQUVJLGFBQVMsY0FBZSxHQUFHO0FBSXpCLFVBQUksVUFBVSxHQUFHLEVBQUUsTUFBTSxRQUFRLEtBQUssVUFBVSxNQUFNO0FBQ3BELGFBQUssQ0FBQztBQUVOLGtCQUFTO0FBQ1Qsd0JBQWU7QUFBQSxNQUN2QjtBQUVNLFdBQUssU0FBUyxDQUFDO0FBQUEsSUFDckI7QUFFSSxhQUFTLHFCQUFzQixHQUFHO0FBQ2hDLFlBQU0sRUFBRSxNQUFPLElBQUcsRUFBRTtBQUVwQixVQUFJLEVBQUUsWUFBWSxRQUFRO0FBQ3hCLHNCQUFjLENBQUM7QUFDZjtBQUFBLE1BQ1I7QUFFTSxRQUFFLE9BQU8sUUFBUTtBQUVqQixVQUFJLGdCQUFnQixNQUFNO0FBQ3hCLHFCQUFhLFdBQVc7QUFDeEIsc0JBQWM7QUFBQSxNQUN0QjtBQUNNLFVBQUksb0JBQW9CLE1BQU07QUFDNUIscUJBQWEsZUFBZTtBQUM1QiwwQkFBa0I7QUFBQSxNQUMxQjtBQUVNLHNCQUFlO0FBRWYsVUFBSSxPQUFPLFVBQVUsWUFBWSxNQUFNLFdBQVcsR0FBRztBQUNuRCxjQUFNLFNBQVMsTUFBTSxrQkFBaUI7QUFDdEMsY0FBTSxTQUFTLGVBQWE7QUFDMUIsZ0JBQU0sU0FBUyxNQUFNLFFBQVEsS0FBSyxTQUFPLE9BQU8sVUFBVSxNQUFNLEdBQUcsQ0FBQyxFQUFFLGtCQUFtQixNQUFLLE1BQU07QUFFcEcsY0FBSSxXQUFXLE9BQVEsUUFBTztBQUU5QixjQUFJLFdBQVcsTUFBTSxRQUFRLE1BQU0sTUFBTSxJQUFJO0FBQzNDLHlCQUFhLE1BQU07QUFBQSxVQUMvQixPQUNlO0FBQ0gsc0JBQVM7QUFBQSxVQUNyQjtBQUVVLGlCQUFPO0FBQUEsUUFDakI7QUFDUSxjQUFNLFNBQVMsaUJBQWU7QUFDNUIsY0FDRSxPQUFPLGNBQWMsTUFBTSxRQUN4QixnQkFBZ0IsUUFDaEIsT0FBTyxjQUFjLE1BQU0sTUFDOUI7QUFDQSxtQkFBTyxPQUFPLE1BQU0sTUFBTSxPQUFPLElBQUksQ0FBQztBQUFBLFVBQ2xEO0FBQUEsUUFDQTtBQUVRLGVBQU07QUFBQSxNQUNkLE9BQ1c7QUFDSCxjQUFNLFdBQVcsQ0FBQztBQUFBLE1BQzFCO0FBQUEsSUFDQTtBQUVJLGFBQVMsaUJBQWtCLEdBQUc7QUFDNUIsV0FBSyxZQUFZLENBQUM7QUFBQSxJQUN4QjtBQUVJLGFBQVMsZ0JBQWlCLEdBQUc7QUFDM0IsV0FBSyxXQUFXLENBQUM7QUFFakIsVUFBSSxnQkFBZ0IsQ0FBQyxNQUFNLEtBQU07QUFFakMsWUFBTSxvQkFBb0IsV0FBVyxNQUFNLFdBQVcsTUFDaEQsTUFBTSxpQkFBaUIsVUFBVSxNQUFNLGVBQWU7QUFFNUQsWUFBTSxrQkFBa0IsRUFBRSxhQUFhLFFBQ2xDLE1BQU0sd0JBQXdCLFFBQzlCLE1BQU0sYUFBYSxTQUNsQixZQUFZLFVBQVUsTUFBTSxzQkFBc0I7QUFHeEQsVUFBSSxFQUFFLFlBQVksSUFBSTtBQUNwQixnQkFBUSxDQUFDO0FBQ1Q7QUFBQSxNQUNSO0FBR00sVUFBSSxFQUFFLFlBQVksS0FBSyxvQkFBb0IsT0FBTztBQUNoRCxrQkFBUztBQUNUO0FBQUEsTUFDUjtBQUVNLFVBQ0UsRUFBRSxXQUFXLFVBQ1YsRUFBRSxPQUFPLE9BQU8sTUFBTSxVQUFVLFNBQ2hDLE1BQU0sU0FBUyxVQUFVLEtBQzVCO0FBR0YsVUFDRSxFQUFFLFlBQVksTUFDWCxNQUFNLGFBQWEsVUFBVSxRQUM3QixLQUFLLFVBQVUsT0FDbEI7QUFDQSx1QkFBZSxDQUFDO0FBQ2hCLGtCQUFTO0FBQ1Q7QUFBQSxNQUNSO0FBR00sVUFDRSxFQUFFLFlBQVksTUFFWixNQUFNLGFBQWEsUUFDaEIsTUFBTSxjQUFjLFNBRXRCLE1BQU0saUJBQWlCLFFBQ3ZCLFdBQVcsTUFBTSxXQUFXLEdBQy9CO0FBQ0EsWUFBSSxNQUFNLGFBQWEsUUFBUSxNQUFNLFFBQVEsTUFBTSxVQUFVLE1BQU0sTUFBTTtBQUN2RSx3QkFBYyxNQUFNLFdBQVcsU0FBUyxDQUFDO0FBQUEsUUFDbkQsV0FDaUIsTUFBTSxhQUFhLFFBQVEsTUFBTSxlQUFlLE1BQU07QUFDN0QsZUFBSyxxQkFBcUIsSUFBSTtBQUFBLFFBQ3hDO0FBRVE7QUFBQSxNQUNSO0FBR00sV0FDRyxFQUFFLFlBQVksTUFBTSxFQUFFLFlBQVksUUFDL0IsT0FBTyxXQUFXLFVBQVUsWUFBWSxXQUFXLE1BQU0sV0FBVyxJQUN4RTtBQUNBLHVCQUFlLENBQUM7QUFDaEIsb0JBQVksUUFBUTtBQUNwQiw0QkFBb0IsRUFBRSxZQUFZLEtBQUssSUFBSSxJQUFJLE1BQU0sUUFBUTtBQUFBLE1BQ3JFO0FBR00sV0FDRyxFQUFFLFlBQVksTUFBTSxFQUFFLFlBQVksT0FDaEMsK0JBQStCLFVBQVUsUUFDNUM7QUFDQSx1QkFBZSxDQUFDO0FBQ2hCLG9CQUFZLFFBQVEsS0FBSztBQUFBLFVBQ3ZCO0FBQUEsVUFDQSxLQUFLO0FBQUEsWUFDSCxvQkFBb0I7QUFBQSxZQUNwQixZQUFZLFNBQVMsRUFBRSxZQUFZLEtBQUssS0FBSyxLQUFLLCtCQUErQixNQUFNO0FBQUEsVUFDbkc7QUFBQSxRQUNBO0FBQ1EsNEJBQW9CLEVBQUUsWUFBWSxLQUFLLElBQUksSUFBSSxNQUFNLFFBQVE7QUFBQSxNQUNyRTtBQUdNLFVBQUksRUFBRSxZQUFZLE1BQU0sRUFBRSxZQUFZLElBQUk7QUFDeEMsdUJBQWUsQ0FBQztBQUNoQiw0QkFBb0IsRUFBRSxZQUFZLEtBQUssS0FBSyxHQUFHLE1BQU0sUUFBUTtBQUFBLE1BQ3JFO0FBRU0sWUFBTSxnQkFBZ0Isb0JBQW9CO0FBRzFDLFVBQUksaUJBQWlCLFVBQVUsa0JBQWtCLEtBQUssSUFBRyxHQUFJO0FBQzNELHVCQUFlO0FBQUEsTUFDdkI7QUFHTSxVQUNFLGdCQUFnQixLQUNiLE1BQU0sYUFBYSxRQUNuQixFQUFFLFFBQVEsVUFDVixFQUFFLElBQUksV0FBVyxLQUNqQixFQUFFLFdBQVcsU0FDYixFQUFFLFlBQVksU0FDZCxFQUFFLFlBQVksVUFDYixFQUFFLFlBQVksTUFBTSxhQUFhLFdBQVcsSUFDaEQ7QUFDQSxhQUFLLFVBQVUsUUFBUSxVQUFVLENBQUM7QUFFbEMsY0FDRSxPQUFPLEVBQUUsSUFBSSxrQkFBbUIsR0FDaEMsWUFBWSxhQUFhLFdBQVcsS0FBSyxhQUFjLENBQUMsTUFBTztBQUVqRSwwQkFBa0IsS0FBSyxRQUFRO0FBQy9CLFlBQUksY0FBYyxPQUFPO0FBQ3ZCLHlCQUFlLENBQUM7QUFDaEIsMEJBQWdCO0FBQUEsUUFDMUI7QUFFUSxjQUFNLFdBQVcsSUFBSSxPQUFPLE1BQU0sYUFBYSxNQUFNLEVBQUUsRUFBRSxJQUFJLE9BQU0sYUFBYSxRQUFRLENBQUMsTUFBTSxLQUFLLE9BQU8sSUFBSSxDQUFFLEVBQUUsS0FBSyxJQUFJLEdBQUcsR0FBRztBQUVsSSxZQUFJLFFBQVEsWUFBWTtBQUV4QixZQUFJLGNBQWMsUUFBUSxRQUFRLEtBQUssU0FBUyxLQUFLLGVBQWUsTUFBTSxNQUFNLFFBQVMsS0FBSyxDQUFFLENBQUMsTUFBTSxNQUFNO0FBQzNHLGFBQUc7QUFDRCxvQkFBUSxvQkFBb0IsUUFBUSxHQUFHLElBQUksZ0JBQWdCLENBQUM7QUFBQSxVQUN4RSxTQUNpQixVQUFVLFlBQVksVUFDM0IsaUJBQWlCLE1BQU0sTUFBTSxRQUFTLEtBQU8sQ0FBQSxNQUFNLFFBQ2hELFNBQVMsS0FBSyxlQUFlLE1BQU0sTUFBTSxRQUFTLEtBQU8sQ0FBQSxDQUFDLE1BQU07QUFBQSxRQUUvRTtBQUVRLFlBQUksWUFBWSxVQUFVLE9BQU87QUFDL0IsbUJBQVMsTUFBTTtBQUNiLDJCQUFlLEtBQUs7QUFDcEIscUJBQVMsS0FBSztBQUVkLGdCQUFJLFNBQVMsS0FBSyxNQUFNLGFBQWEsUUFBUSxNQUFNLGNBQWMsTUFBTTtBQUNyRSw0QkFBYyxlQUFlLE1BQU0sTUFBTSxRQUFTLEtBQU8sQ0FBQSxHQUFHLElBQUk7QUFBQSxZQUM5RTtBQUFBLFVBQ1csQ0FBQTtBQUFBLFFBQ1g7QUFFUTtBQUFBLE1BQ1I7QUFJTSxVQUNFLEVBQUUsWUFBWSxPQUNWLEVBQUUsWUFBWSxNQUFNLE1BQU0sYUFBYSxRQUFRLGlCQUFpQixRQUNoRSxFQUFFLFlBQVksS0FBSyxvQkFBb0IsT0FDM0M7QUFFRixRQUFFLFlBQVksS0FBSyxlQUFlLENBQUM7QUFFbkMsVUFBSSxZQUFZLFVBQVUsTUFBTSxZQUFZLFFBQVEsZUFBZTtBQUNqRSxxQkFBYSxNQUFNLFFBQVMsWUFBWSxLQUFPLENBQUE7QUFDL0M7QUFBQSxNQUNSO0FBRU0sVUFBSSxzQkFBc0IsTUFBTTtBQUM5QixjQUFNLE9BQU8sQ0FBQyxLQUFLLFNBQVM7QUFDMUIsY0FBSSxNQUFNO0FBQ1IsZ0JBQUkscUJBQXFCLElBQUksTUFBTSxLQUFNO0FBQUEsVUFDckQsT0FDZTtBQUNILG1CQUFPLE1BQU07QUFBQSxVQUN6QjtBQUVVLDJCQUFpQixJQUFJLE1BQU0sYUFBYSxNQUFNLElBQUk7QUFFbEQsY0FBSSxRQUFRLFVBQVUsUUFBUSxLQUFNO0FBRXBDLGdCQUFNLEtBQUssU0FBUyxXQUFXLGVBQWU7QUFDOUMsYUFBRyxLQUFLLFNBQVMsWUFBWTtBQUU3QixjQUFJLE1BQU0sYUFBYSxNQUFNO0FBQzNCLHNCQUFVLE9BQU8sTUFBSztBQUN0QixzQkFBUztBQUFBLFVBQ3JCO0FBQUEsUUFDQTtBQUVRLFlBQUksTUFBTSxlQUFlLFFBQVE7QUFDL0IsZUFBSyxZQUFZLFdBQVcsT0FBTyxJQUFJO0FBQUEsUUFDakQsT0FDYTtBQUNILGVBQUssV0FBVyxLQUFLO0FBQUEsUUFDL0I7QUFFUSxZQUFJLE1BQU0sYUFBYSxLQUFNO0FBQUEsTUFDckM7QUFFTSxVQUFJLEtBQUssVUFBVSxNQUFNO0FBQ3ZCLGtCQUFTO0FBQUEsTUFDakIsV0FDZSxNQUFNLGFBQWEsVUFBVSxNQUFNO0FBQzFDLGtCQUFTO0FBQUEsTUFDakI7QUFBQSxJQUNBO0FBRUksYUFBUyxxQkFBc0I7QUFDN0IsYUFBTyxjQUFjLE9BQ2pCLGVBQWUsUUFFYixRQUFRLFVBQVUsUUFBUSxRQUFRLE1BQU0sY0FBYyxPQUNsRCxRQUFRLE1BQU0sWUFDZDtBQUFBLElBRWhCO0FBRUksYUFBUyx5QkFBMEI7QUFDakMsYUFBTyxtQkFBa0I7QUFBQSxJQUMvQjtBQUVJLGFBQVMsZUFBZ0I7QUFDdkIsVUFBSSxNQUFNLGlCQUFpQixNQUFNO0FBQy9CLGVBQU8sQ0FBQTtBQUFBLE1BQ2Y7QUFFTSxVQUFJLE1BQU8sZUFBaUIsTUFBSyxRQUFRO0FBQ3ZDLGVBQU8sY0FBYyxNQUFNLElBQUksV0FBUyxNQUFPLGVBQWlCLEVBQUMsS0FBSyxDQUFDLEVBQUUsTUFBSztBQUFBLE1BQ3RGO0FBRU0sVUFBSSxNQUFNLGFBQWEsUUFBUTtBQUM3QixlQUFPLEdBQUcsT0FBTyxNQUFNLFNBQVUsQ0FBQTtBQUFBLE1BQ3pDO0FBRU0sVUFBSSxNQUFNLGFBQWEsTUFBTTtBQUMzQixlQUFPLGNBQWMsTUFBTSxJQUFJLENBQUMsT0FBTyxNQUFNLEVBQUUsT0FBTztBQUFBLFVBQ3BELEtBQUssWUFBWTtBQUFBLFVBQ2pCLFdBQVcsTUFBTSxTQUFTLFVBQVUsUUFBUSxpQkFBaUIsTUFBTSxNQUFNLEdBQUcsTUFBTTtBQUFBLFVBQ2xGLE9BQU87QUFBQSxVQUNQLFdBQVcsTUFBTTtBQUFBLFVBQ2pCLFVBQVUsU0FBUztBQUFBLFVBQ25CLFdBQVk7QUFBRSxrQkFBTSxjQUFjLENBQUM7QUFBQSxVQUFDO0FBQUEsUUFDOUMsR0FBVyxNQUFNLEVBQUUsUUFBUTtBQUFBLFVBQ2pCLE9BQU87QUFBQSxVQUNQLENBQUUsTUFBTSxTQUFTLE9BQU8sY0FBYyxnQkFBaUIsZUFBZSxNQUFNLE1BQU0sR0FBRztBQUFBLFFBQy9GLENBQVMsQ0FBQyxDQUFDO0FBQUEsTUFDWDtBQUVNLGFBQU87QUFBQSxRQUNMLEVBQUUsUUFBUTtBQUFBLFVBQ1IsT0FBTztBQUFBLFVBQ1AsQ0FBRSxZQUFZLFVBQVUsT0FBTyxjQUFjLGFBQWlCLEdBQUEsaUJBQWlCO0FBQUEsUUFDaEYsQ0FBQTtBQUFBLE1BQ1Q7QUFBQSxJQUNBO0FBRUksYUFBUyxnQkFBaUI7QUFDeEIsVUFBSSxVQUFVLFVBQVUsTUFBTTtBQUM1QixlQUFPLE1BQU8saUJBQWtCLFNBQzVCLE1BQU8sV0FBYSxFQUFDLEVBQUUsWUFBWSxXQUFXLE1BQU8sQ0FBQSxJQUNyRDtBQUFBLE1BQ1o7QUFFTSxZQUFNLEtBQUssTUFBTSxXQUFXLFNBQ3hCLE1BQU0sU0FDTixXQUFTO0FBQ1QsZUFBTyxFQUFFLE9BQU87QUFBQSxVQUNkLEtBQUssTUFBTTtBQUFBLFVBQ1gsR0FBRyxNQUFNO0FBQUEsUUFDckIsR0FBYSxNQUFNO0FBQ1AsaUJBQU87QUFBQSxZQUNMO0FBQUEsWUFDQSxNQUFNO0FBQUEsY0FDSjtBQUFBLGNBQ0EsTUFBTSxFQUFFLFFBQVE7QUFBQSxnQkFDZCxDQUFFLE1BQU0sU0FBUyxPQUFPLGNBQWMsYUFBaUIsR0FBQSxNQUFNO0FBQUEsY0FDOUQsQ0FBQTtBQUFBLFlBQ2pCO0FBQUEsVUFDQTtBQUFBLFFBQ1csQ0FBQTtBQUFBLE1BQ1g7QUFFTSxVQUFJLFVBQVUsaUJBQWlCLE9BQU8sWUFBWSxNQUFNLElBQUksRUFBRSxDQUFDO0FBRS9ELFVBQUksTUFBTyxnQkFBa0IsTUFBSyxRQUFRO0FBQ3hDLGtCQUFVLE1BQU8sa0JBQW9CLEVBQUMsT0FBTyxPQUFPO0FBQUEsTUFDNUQ7QUFFTSxhQUFPLFdBQVcsTUFBTyxlQUFlLEdBQUksT0FBTztBQUFBLElBQ3pEO0FBRUksYUFBUyxTQUFVLFlBQVksVUFBVTtBQUN2QyxZQUFNLFFBQVEsYUFBYSxPQUFPLEVBQUUsR0FBRyxjQUFjLE9BQU8sR0FBRyxNQUFNLFdBQVcsV0FBVyxNQUFLLElBQUs7QUFFckcsWUFBTSxPQUFPO0FBQUEsUUFDWCxLQUFLLGFBQWEsT0FBTyxZQUFZO0FBQUEsUUFDckMsS0FBSztBQUFBLFFBQ0wsT0FBTyxtQkFBbUI7QUFBQSxRQUMxQixPQUFPLE1BQU07QUFBQSxRQUNiLE9BQU8sV0FBVyxVQUFVLFNBQVMsV0FBVyxRQUFRO0FBQUE7QUFBQSxRQUV4RCxNQUFNO0FBQUEsUUFDTixHQUFHO0FBQUEsUUFDSCxJQUFJLGFBQWEsT0FBTyxNQUFNLFVBQVUsUUFBUTtBQUFBLFFBQ2hELFdBQVcsTUFBTTtBQUFBLFFBQ2pCLGNBQWMsTUFBTTtBQUFBLFFBQ3BCLGtCQUFrQixlQUFlLFFBQVEsTUFBTSxjQUFjLFFBQVE7QUFBQSxRQUNyRSxVQUFVLE1BQU0sWUFBWTtBQUFBLFFBQzVCLFVBQVUsTUFBTSxhQUFhO0FBQUEsUUFDN0IsR0FBRyxtQkFBbUI7QUFBQSxNQUM5QjtBQUVNLFVBQUksZUFBZSxRQUFRLGNBQWMsTUFBTTtBQUM3QyxZQUFJLE1BQU0sUUFBUSxLQUFLLEtBQUssTUFBTSxNQUFNO0FBQ3RDLGVBQUssUUFBUSxDQUFFLEdBQUcsS0FBSyxPQUFPLG1CQUFtQjtBQUFBLFFBQzNELE9BQ2E7QUFDSCxlQUFLLFNBQVM7QUFBQSxRQUN4QjtBQUFBLE1BQ0E7QUFFTSxhQUFPLEVBQUUsU0FBUyxJQUFJO0FBQUEsSUFDNUI7QUFFSSxhQUFTLFFBQVMsR0FBRztBQUNuQixVQUFJLGdCQUFnQixNQUFNO0FBQ3hCLHFCQUFhLFdBQVc7QUFDeEIsc0JBQWM7QUFBQSxNQUN0QjtBQUNNLFVBQUksb0JBQW9CLE1BQU07QUFDNUIscUJBQWEsZUFBZTtBQUM1QiwwQkFBa0I7QUFBQSxNQUMxQjtBQUVNLFVBQ0UsS0FDRyxFQUFFLFVBQ0YsRUFBRSxPQUFPLGVBQWUsS0FDM0I7QUFFRixvQkFBYyxFQUFFLE9BQU8sU0FBUyxFQUFFO0FBR2xDLHVCQUFpQjtBQUNqQiwwQkFBb0IsV0FBVztBQUUvQixVQUNFLE1BQU0sUUFBUSxVQUFVLFNBQ3BCLGNBQWMsUUFBUSxtQkFBbUIsVUFBVSxPQUN2RDtBQUNBLGNBQU0sTUFBSztBQUFBLE1BQ25CO0FBRU0sVUFBSSxNQUFNLGFBQWEsUUFBUTtBQUM3QixzQkFBYyxXQUFXLE1BQU07QUFDN0Isd0JBQWM7QUFDZCxpQkFBTyxXQUFXLEtBQUs7QUFBQSxRQUN4QixHQUFFLE1BQU0sYUFBYTtBQUFBLE1BQzlCO0FBQUEsSUFDQTtBQUVJLGFBQVMsY0FBZSxLQUFLLGlCQUFpQjtBQUM1QyxVQUFJLFdBQVcsVUFBVSxLQUFLO0FBQzVCLG1CQUFXLFFBQVE7QUFFbkIsWUFBSSxvQkFBb0IsUUFBUSxNQUFNLGtCQUFrQixLQUFLLE1BQU0sa0JBQWtCLEtBQUs7QUFDeEYsZUFBSyxjQUFjLEdBQUc7QUFBQSxRQUNoQyxPQUNhO0FBQ0gsNEJBQWtCLFdBQVcsTUFBTTtBQUNqQyw4QkFBa0I7QUFDbEIsaUJBQUssY0FBYyxHQUFHO0FBQUEsVUFDdkIsR0FBRSxNQUFNLGFBQWE7QUFBQSxRQUNoQztBQUFBLE1BQ0E7QUFBQSxJQUNBO0FBRUksYUFBUyxpQkFBa0IsS0FBSyxhQUFhLFVBQVU7QUFDckQsdUJBQWlCLGFBQWE7QUFFOUIsVUFBSSxNQUFNLGFBQWEsTUFBTTtBQUMzQixzQkFBYyxLQUFLLElBQUk7QUFFdkIsWUFBSSxnQkFBZ0IsUUFBUSxhQUFhLE1BQU07QUFDN0MsOEJBQW9CO0FBQUEsUUFDOUI7QUFFUSx3QkFBZ0IsUUFBUSxPQUFPLEdBQUc7QUFBQSxNQUMxQztBQUFBLElBQ0E7QUFFSSxhQUFTLE9BQVEsS0FBSyxZQUFZLGVBQWU7QUFDL0MsVUFDRSxNQUFNLGFBQWEsVUFDZixlQUFlLFFBQVEsTUFBTSxRQUFRLFVBQVUsS0FDbkQ7QUFFRixVQUFJLE1BQU0sYUFBYSxVQUFVLE1BQU07QUFDckMsYUFBSyxhQUFhO0FBQUEsTUFDMUIsT0FDVztBQUNILGNBQU0sYUFBYSxRQUFRO0FBQzNCLDhCQUFzQixRQUFRO0FBQUEsTUFDdEM7QUFFTSxVQUNFLFFBQVEsTUFDTCxNQUFNLGFBQWEsUUFDbkIsV0FBVyxNQUFNLFdBQVcsS0FDNUIsbUJBQW1CLFFBQ25CLFFBQVEsZUFBZSxNQUFNLFdBQVcsTUFBTyxDQUFHLENBQUEsR0FDckQ7QUFDQSxjQUFNO0FBQUEsTUFDZDtBQUVNLFlBQU0sZ0JBQWdCLFdBQVcsTUFBTTtBQUNyQyxhQUFLLFVBQVUsU0FBUyxLQUFLLFFBQVE7QUFBQSxNQUM3QyxHQUFTLEVBQUU7QUFFTCxtQkFBYSxRQUFRLGFBQWEsUUFBUTtBQUMxQyxpQkFBVztBQUVYO0FBQUEsUUFDRTtBQUFBLFFBQ0E7QUFBQSxRQUNBLENBQUMsSUFBSSxZQUFZO0FBQ2YsZUFBSyxlQUFlLFFBQVEsTUFBTSxRQUFRLFVBQVUsU0FBUyxhQUFhLGVBQWU7QUFDdkYseUJBQWEsUUFBUTtBQUVyQixtQkFBTyxPQUFPLGNBQWMsR0FBRTtBQUc5QixrQ0FBc0IsUUFBUTtBQUU5QixxQkFBUyxNQUFNO0FBQ2Isb0JBQU0sYUFBYSxRQUFRO0FBRTNCLGtCQUFJLE1BQU0sU0FBUyxVQUFVLE1BQU07QUFDakMsb0JBQUksZUFBZSxNQUFNO0FBQ3ZCLHVCQUFLLFVBQVUsUUFBUSxVQUFTO0FBQUEsZ0JBQ2xELFdBQ3lCLEtBQUssVUFBVSxNQUFNO0FBQzVCLDZCQUFXLElBQUk7QUFBQSxnQkFDakMsT0FDcUI7QUFDSCx1QkFBSyxRQUFRO0FBQUEsZ0JBQy9CO0FBQUEsY0FDQTtBQUVjLHFCQUFPLFlBQVksY0FBYyxTQUFTLE1BQU07QUFBRSx3QkFBUSxLQUFLO0FBQUEsY0FBRyxDQUFBO0FBQ2xFLHFCQUFPLGtCQUFrQixjQUFjLFNBQVMsTUFBTTtBQUFFLDhCQUFjLEtBQUs7QUFBQSxjQUFHLENBQUE7QUFBQSxZQUMvRSxDQUFBO0FBQUEsVUFDYjtBQUFBLFFBQ1M7QUFBQSxRQUNELE1BQU07QUFDSixjQUFJLE1BQU0sUUFBUSxVQUFVLFFBQVEsYUFBYSxlQUFlO0FBQzlELHlCQUFhLFFBQVE7QUFDckIsa0JBQU0sYUFBYSxRQUFRO0FBQzNCLGtDQUFzQixRQUFRO0FBQUEsVUFDMUM7QUFDVSxlQUFLLFVBQVUsU0FBUyxLQUFLLFFBQVE7QUFBQSxRQUMvQztBQUFBLE1BQ0E7QUFBQSxJQUNBO0FBRUksYUFBUyxVQUFXO0FBQ2xCLGFBQU8sRUFBRSxPQUFPO0FBQUEsUUFDZCxLQUFLO0FBQUEsUUFDTCxPQUFPLGlCQUFpQjtBQUFBLFFBQ3hCLE9BQU8sTUFBTTtBQUFBLFFBQ2IsWUFBWSxLQUFLO0FBQUEsUUFDakIsS0FBSyxNQUFNLGVBQWU7QUFBQSxRQUMxQixPQUFPLE1BQU0saUJBQWlCLFFBQVEsVUFBVSxVQUFVLFFBQVEsTUFBTSxhQUFhO0FBQUEsUUFDckYsUUFBUSxNQUFNO0FBQUEsUUFDZCxNQUFNLE1BQU07QUFBQSxRQUNaLFFBQVEsTUFBTTtBQUFBLFFBQ2QsTUFBTSxjQUFjO0FBQUEsUUFDcEIsZUFBZTtBQUFBLFFBQ2YsV0FBVztBQUFBLFFBQ1gsU0FBUztBQUFBLFFBQ1QsZ0JBQWdCLE1BQU07QUFBQSxRQUN0QixRQUFRLFlBQVk7QUFBQSxRQUNwQixnQkFBZ0IsTUFBTTtBQUFBLFFBQ3RCLGdCQUFnQixNQUFNO0FBQUEsUUFDdEIsb0JBQW9CLE1BQU07QUFBQSxRQUMxQixvQkFBb0I7QUFBQSxRQUNwQixHQUFHLGFBQWE7QUFBQSxRQUNoQixpQkFBaUI7QUFBQSxRQUNqQixjQUFjO0FBQUEsUUFDZCxjQUFjO0FBQUEsUUFDZCxRQUFRO0FBQUEsTUFDaEIsR0FBUyxhQUFhO0FBQUEsSUFDdEI7QUFFSSxhQUFTLGlCQUFrQixHQUFHO0FBQzVCLHlCQUFtQixDQUFDO0FBQ3BCLGdCQUFTO0FBQUEsSUFDZjtBQUVJLGFBQVMsYUFBYztBQUNyQiwyQkFBb0I7QUFBQSxJQUMxQjtBQUVJLGFBQVMsbUJBQW9CLEdBQUc7QUFDOUIsV0FBSyxDQUFDO0FBQ04sZ0JBQVUsT0FBTyxNQUFLO0FBQ3RCLHlCQUFtQixRQUFRO0FBQzNCLGFBQU8sU0FBUyxPQUFPLGVBQWUsT0FBTyxXQUFXLFNBQVMsS0FBSyxjQUFjLEdBQUcsQ0FBQztBQUFBLElBQzlGO0FBRUksYUFBUyxrQkFBbUIsR0FBRztBQUM3QixXQUFLLENBQUM7QUFDTixlQUFTLE1BQU07QUFDYiwyQkFBbUIsUUFBUTtBQUFBLE1BQzVCLENBQUE7QUFBQSxJQUNQO0FBRUksYUFBUyxZQUFhO0FBQ3BCLFlBQU0sVUFBVTtBQUFBLFFBQ2QsRUFBRSxRQUFRO0FBQUEsVUFDUixPQUFPLFlBQWEsTUFBTSxXQUFXLEtBQUs7QUFBQSxVQUMxQyxHQUFHLGdCQUFnQjtBQUFBLFVBQ25CLEtBQUssTUFBTSxVQUFVO0FBQUEsVUFDckIsTUFBTSxjQUFjO0FBQUEsVUFDcEIsUUFBUTtBQUFBLFVBQ1IsU0FBUyxzQkFBc0I7QUFBQSxVQUMvQixhQUFhO0FBQUEsVUFDYixRQUFRO0FBQUEsVUFDUixZQUFZLFdBQVcsTUFBTSxXQUFXO0FBQUEsVUFDeEMsR0FBRyxNQUFNLFdBQVcsVUFBVTtBQUFBLFVBQzlCLFNBQVM7QUFBQSxVQUNULFFBQVE7QUFBQSxRQUNsQixHQUFXO0FBQUEsVUFDRCxHQUFHO0FBQUEsVUFDSCxZQUFZLE1BQU0sTUFBTSxXQUFXLElBQUk7QUFBQSxVQUN2QyxRQUFRO0FBQUEsVUFDUixPQUFPO0FBQUEsUUFDUixDQUFBO0FBQUEsTUFDVDtBQUVNLFdBQUssVUFBVSxRQUFRLFFBQVE7QUFBQSxRQUM3QixFQUFFLE9BQU87QUFBQSxVQUNQLEtBQUs7QUFBQSxVQUNMLE9BQU8saUJBQWlCLFFBQVE7QUFBQSxVQUNoQyxPQUFPLE1BQU07QUFBQSxVQUNiLEdBQUcsYUFBYTtBQUFBLFVBQ2hCLFNBQVM7QUFBQSxVQUNULGlCQUFpQjtBQUFBLFFBQ2xCLEdBQUUsY0FBZSxDQUFBO0FBQUEsTUFDMUI7QUFFTSxhQUFPLEVBQUUsU0FBUztBQUFBLFFBQ2hCLEtBQUs7QUFBQSxRQUNMLFlBQVksT0FBTztBQUFBLFFBQ25CLFVBQVUsTUFBTSxhQUFhLE9BQU8sUUFBUTtBQUFBLFFBQzVDLGdCQUFnQjtBQUFBLFFBQ2hCLGdCQUFnQixNQUFNO0FBQUEsUUFDdEIsb0JBQW9CLE1BQU07QUFBQSxRQUMxQixnQkFBZ0IsTUFBTTtBQUFBLFFBQ3RCLGNBQWM7QUFBQSxRQUNkLGNBQWM7QUFBQSxRQUNkLFFBQVE7QUFBQSxRQUNSLFFBQVE7QUFBQSxNQUNoQixHQUFTLE1BQU0sRUFBRSxPQUFPO0FBQUEsUUFDaEIsT0FBTyxzQkFDRixjQUFjLFVBQVUsT0FBTyxtQ0FBbUMsT0FDbEUsbUJBQW1CLFVBQVUsT0FBTywrQkFBK0I7QUFBQSxNQUN6RSxHQUFFLE9BQU8sQ0FBQztBQUFBLElBQ2pCO0FBRUksYUFBUyxtQkFBb0IsR0FBRztBQUM5Qix5QkFBbUIsQ0FBQztBQUVwQixVQUFJLFVBQVUsVUFBVSxNQUFNO0FBQzVCLGtCQUFVLE1BQU07QUFBQSxVQUNkLE1BQU0sUUFBUSxNQUFNLGNBQWMsMENBQTBDO0FBQUEsUUFDdEY7QUFBQSxNQUNBO0FBRU0sWUFBTSxRQUFRLFFBQVE7QUFBQSxJQUM1QjtBQUVJLGFBQVMsYUFBYyxHQUFHO0FBQ3hCLGdCQUFTO0FBQ1QsWUFBTSxRQUFRLFVBQVUsU0FBUyxLQUFLLFFBQVEsQ0FBQztBQUMvQyxzQkFBZTtBQUFBLElBQ3JCO0FBRUksYUFBUyxlQUFnQjtBQUN2QixZQUFNLEtBQUssU0FBUztBQUNwQixXQUNHLE9BQU8sUUFBUSxHQUFHLE9BQU8sTUFBTSxVQUFVLFVBQ3ZDLFVBQVUsVUFBVSxRQUNwQixVQUFVLFVBQVUsSUFDdkI7QUFDQSxrQkFBVSxNQUFNLE1BQUs7QUFBQSxNQUM3QjtBQUVNLDJCQUFvQjtBQUFBLElBQzFCO0FBRUksYUFBUyxZQUFhO0FBQ3BCLFVBQUksT0FBTyxVQUFVLEtBQU07QUFFM0Isa0JBQVksUUFBUTtBQUVwQixVQUFJLEtBQUssVUFBVSxNQUFNO0FBQ3ZCLGFBQUssUUFBUTtBQUFBLE1BQ3JCO0FBRU0sVUFBSSxNQUFNLFFBQVEsVUFBVSxPQUFPO0FBQ2pDLFlBQUksYUFBYSxNQUFNO0FBQ3JCLHVCQUFhLFFBQVE7QUFDckIscUJBQVc7QUFBQSxRQUNyQjtBQUVRLFlBQUksTUFBTSxhQUFhLFVBQVUsTUFBTTtBQUNyQyxlQUFLLGFBQWE7QUFDbEIsZ0JBQU0sYUFBYSxRQUFRO0FBQzNCLGdDQUFzQixRQUFRO0FBQUEsUUFDeEM7QUFBQSxNQUNBO0FBQUEsSUFDQTtBQUVJLGFBQVMsVUFBVyxHQUFHO0FBQ3JCLFVBQUksTUFBTSxTQUFTLFVBQVUsS0FBTTtBQUVuQyxVQUFJLGNBQWMsTUFBTTtBQUN0QixjQUFNLGlCQUFpQixDQUFDO0FBQ3hCLGVBQU8sUUFBUTtBQUNmLGlCQUFTLE1BQU07QUFDYixnQkFBTSxNQUFLO0FBQUEsUUFDWixDQUFBO0FBQUEsTUFDVCxPQUNXO0FBQ0gsY0FBTSxNQUFLO0FBQUEsTUFDbkI7QUFFTSxVQUFJLE1BQU0sYUFBYSxRQUFRO0FBQzdCLGVBQU8sV0FBVyxLQUFLO0FBQUEsTUFDL0IsV0FDZSxVQUFVLFVBQVUsUUFBUSxNQUFPLFdBQWEsTUFBSyxRQUFRO0FBQ3BFLGFBQUssUUFBUTtBQUFBLE1BQ3JCO0FBQUEsSUFDQTtBQUVJLGFBQVMsWUFBYTtBQUNwQixhQUFPLFFBQVE7QUFDZixnQkFBUztBQUFBLElBQ2Y7QUFFSSxhQUFTLGtCQUFtQjtBQUMxQixZQUFNLGFBQWEsUUFBUTtBQUFBLFFBQ3pCLE1BQU0sYUFBYSxRQUFRLE1BQU0sY0FBYyxRQUFRLFdBQVcsTUFBTSxXQUFXLElBQy9FLGVBQWUsTUFBTSxXQUFXLE1BQU8sQ0FBRyxDQUFBLEtBQUssS0FDL0M7QUFBQSxRQUNKO0FBQUEsUUFDQTtBQUFBLE1BQ1I7QUFBQSxJQUNBO0FBRUksYUFBUyxXQUFZLE1BQU07QUFDekIsVUFBSWEsZUFBYztBQUVsQixVQUFJLFNBQVMsTUFBTTtBQUNqQixZQUFJLFdBQVcsTUFBTSxXQUFXLEdBQUc7QUFDakMsZ0JBQU0sTUFBTSxlQUFlLE1BQU0sV0FBVyxNQUFPLENBQUcsQ0FBQTtBQUN0RCxVQUFBQSxlQUFjLE1BQU0sUUFBUSxVQUFVLE9BQUssWUFBWSxlQUFlLE1BQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLFFBQzlGO0FBRVEsZ0NBQXdCQSxZQUFXO0FBQUEsTUFDM0M7QUFFTSxxQkFBZUEsWUFBVztBQUFBLElBQ2hDO0FBRUksYUFBUyxhQUFjLFdBQVcsV0FBVztBQUMzQyxVQUFJLEtBQUssVUFBVSxRQUFRLE1BQU0sYUFBYSxVQUFVLE9BQU87QUFDN0QsZ0NBQXdCLElBQUksSUFBSTtBQUVoQyxpQkFBUyxNQUFNO0FBQ2IsY0FBSSxLQUFLLFVBQVUsUUFBUSxNQUFNLGFBQWEsVUFBVSxPQUFPO0FBQzdELGdCQUFJLFlBQVksV0FBVztBQUN6QixzQ0FBdUI7QUFBQSxZQUNyQyxPQUNpQjtBQUNILHlCQUFXLElBQUk7QUFBQSxZQUM3QjtBQUFBLFVBQ0E7QUFBQSxRQUNTLENBQUE7QUFBQSxNQUNUO0FBQUEsSUFDQTtBQUVJLGFBQVMscUJBQXNCO0FBQzdCLFVBQUksT0FBTyxVQUFVLFNBQVMsUUFBUSxVQUFVLE1BQU07QUFDcEQsZ0JBQVEsTUFBTSxlQUFjO0FBQUEsTUFDcEM7QUFBQSxJQUNBO0FBRUksYUFBUyxtQkFBb0IsR0FBRztBQUM5QixZQUFNLFVBQVUsS0FBSyxDQUFDO0FBQ3RCLFdBQUssYUFBYSxDQUFDO0FBQ25CLFlBQU0sZUFBZTtBQUNyQixZQUFNLGlCQUFpQixDQUFDO0FBQUEsSUFDOUI7QUFFSSxhQUFTLG1CQUFvQixHQUFHO0FBQzlCLFlBQU0sVUFBVSxLQUFLLENBQUM7QUFDdEIsV0FBSyxhQUFhLENBQUM7QUFDbkIsWUFBTSxlQUFlO0FBQ3JCLFlBQU0sa0JBQWtCLENBQUM7QUFBQSxJQUMvQjtBQUVJLGFBQVMsaUJBQWtCO0FBQ3pCLGtCQUFZLEdBQUcsU0FBUyxHQUFHLFdBQVcsUUFBUSxNQUFNLGFBQWEsV0FDN0QsUUFDQSxNQUFNLGFBQWEsV0FDbkIsTUFBTSxhQUFhLE9BQ2YsTUFBTyxXQUFhLE1BQUssVUFBVSxNQUFNLGFBQWEsVUFBVSxVQUFVLFVBQVUsUUFDcEY7QUFHUiwrQkFBeUIsR0FBRyxTQUFTLEdBQUcsUUFBUSxRQUFRLGNBQWMsUUFBUSxNQUFNLGFBQWEsT0FDN0YsU0FDQSxNQUFNO0FBQUEsSUFDaEI7QUFFSSxtQkFBZSxjQUFjO0FBQzdCLGNBQVUsa0JBQWtCO0FBRTVCLG1CQUFjO0FBRWQsb0JBQWdCLE1BQU07QUFDcEIsc0JBQWdCLFFBQVEsYUFBYSxXQUFXO0FBQ2hELDBCQUFvQixRQUFRLGFBQWEsZUFBZTtBQUFBLElBQ3pELENBQUE7QUFHRCxXQUFPLE9BQU8sT0FBTztBQUFBLE1BQ25CO0FBQUEsTUFBVztBQUFBLE1BQ1g7QUFBQSxNQUFlO0FBQUEsTUFBSztBQUFBLE1BQ3BCLGdCQUFnQixNQUFNLFlBQVk7QUFBQSxNQUNsQztBQUFBLE1BQWdCO0FBQUEsTUFDaEI7QUFBQSxNQUFRO0FBQUEsTUFBb0I7QUFBQSxNQUM1QjtBQUFBLE1BQ0E7QUFBQSxNQUNBLGtCQUFrQixJQUFJLFNBQVMsaUJBQWlCLE1BQU0sTUFBTSxNQUFNLElBQUksTUFBTTtBQUFBLE1BQzVFLGdCQUFnQixJQUFJLFNBQVMsZUFBZSxNQUFNLE1BQU0sTUFBTSxJQUFJO0FBQUEsTUFDbEUsZ0JBQWdCLElBQUksU0FBUyxlQUFlLE1BQU0sTUFBTSxNQUFNLElBQUk7QUFBQSxJQUNuRSxDQUFBO0FBRUQsV0FBTyxPQUFPLE9BQU87QUFBQSxNQUNuQjtBQUFBLE1BRUEsWUFBWTtBQUFBLFFBQVMsTUFDbkIsK0NBQWdELE1BQU0sYUFBYSxPQUFPLFFBQVEsMEJBQzdELE1BQU0sYUFBYSxPQUFPLFFBQVEsc0JBQ3RDLE1BQU0sYUFBYSxPQUFPLGFBQWEsUUFBVTtBQUFBLE1BQ25FO0FBQUEsTUFFRDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BRUEsZUFBZTtBQUFBLFFBQVMsTUFDckIsTUFBTSxpQkFBaUIsUUFBUSxTQUFTLFVBQVUsUUFDaEQsT0FBTyxXQUFXLFVBQVUsWUFDNUIsV0FBVyxNQUFNLFdBQVcsS0FDNUIsbUJBQW1CLE1BQU0sWUFBWTtBQUFBLE1BQ3pDO0FBQUEsTUFFRCxpQkFBaUIsTUFBTTtBQUNyQixZQUNFLE1BQU0sU0FBUyxVQUFVLFVBQ3ZCLE9BQU8sVUFBVSxRQUNkLFVBQVUsVUFBVSxRQUNwQixNQUFPLFdBQVcsTUFBTyxTQUU5QjtBQUNBLGlCQUFPLGNBQWMsT0FBTyxVQUFTLElBQUssUUFBTztBQUFBLFFBQzNELFdBQ2lCLE1BQU0saUJBQWlCLE1BQU07QUFFcEMsZ0JBQU0sZUFBZTtBQUFBLFFBQy9CO0FBQUEsTUFDTztBQUFBLE1BRUQsZUFBZTtBQUFBLFFBQ2IsVUFBVyxHQUFHO0FBQUUsZ0JBQU0saUJBQWlCLENBQUM7QUFBQSxRQUFHO0FBQUEsUUFDM0MsV0FBWSxHQUFHO0FBQ2IsZ0JBQU0sa0JBQWtCLEdBQUcsTUFBTTtBQUMvQiw0QkFBZTtBQUNmLHNCQUFTO0FBQUEsVUFDVixDQUFBO0FBQUEsUUFDRjtBQUFBLFFBQ0QsUUFBUyxHQUFHO0FBRVYsa0JBQVEsQ0FBQztBQUVULGNBQUksY0FBYyxRQUFRLEtBQUssVUFBVSxNQUFNO0FBQzdDLHNCQUFTO0FBQ1Qsc0JBQVUsT0FBTyxNQUFLO0FBQ3RCO0FBQUEsVUFDWjtBQUVVLG9CQUFVLENBQUM7QUFBQSxRQUNyQjtBQUFBLE1BQ087QUFBQSxNQUVELFlBQVksZ0JBQWM7QUFDeEIsY0FBTSxRQUFRLGFBQVk7QUFDMUIsY0FBTSxXQUFXLGVBQWUsUUFBUSxPQUFPLFVBQVUsUUFBUSxjQUFjO0FBRS9FLFlBQUksTUFBTSxhQUFhLE1BQU07QUFDM0IsZ0JBQU0sS0FBSyxTQUFTLFlBQVksUUFBUSxDQUFDO0FBQUEsUUFDbkQsV0FFaUIsTUFBTSxTQUFTLFVBQVUsTUFBTTtBQUN0QyxnQkFBTUMsU0FBUSxhQUFhLE9BQU8sY0FBYyxRQUFRO0FBRXhELGdCQUFNO0FBQUEsWUFDSixFQUFFLFNBQVM7QUFBQSxjQUNULEtBQUssYUFBYSxPQUFPLFlBQVk7QUFBQSxjQUNyQyxLQUFLO0FBQUEsY0FDTCxPQUFPO0FBQUEsY0FDUCxJQUFJLGFBQWEsT0FBTyxNQUFNLFVBQVUsUUFBUTtBQUFBLGNBQ2hELE9BQU8saUJBQWlCO0FBQUEsY0FDeEIsVUFBVTtBQUFBLGNBQ1Ysa0JBQWtCLGVBQWUsUUFBUSxNQUFNLGNBQWMsUUFBUTtBQUFBLGNBQ3JFLEdBQUdBO0FBQUEsY0FDSCxXQUFXO0FBQUEsY0FDWCxTQUFTO0FBQUEsY0FDVCxZQUFZO0FBQUEsWUFDYixDQUFBO0FBQUEsVUFDYjtBQUVVLGNBQUksYUFBYSxRQUFRLE9BQU8sTUFBTSxpQkFBaUIsWUFBWSxNQUFNLGFBQWEsV0FBVyxHQUFHO0FBQ2xHLGtCQUFNO0FBQUEsY0FDSixFQUFFLFNBQVM7QUFBQSxnQkFDVCxPQUFPO0FBQUEsZ0JBQ1AsY0FBYyxNQUFNO0FBQUEsZ0JBQ3BCLFVBQVU7QUFBQSxnQkFDVixTQUFTO0FBQUEsY0FDVixDQUFBO0FBQUEsWUFDZjtBQUFBLFVBQ0E7QUFBQSxRQUNBO0FBRVEsWUFBSSxTQUFTLFVBQVUsVUFBVSxNQUFNLFlBQVksUUFBUSxrQkFBa0IsTUFBTSxXQUFXLEdBQUc7QUFDL0YsZ0JBQU0sT0FBTyxrQkFBa0IsTUFBTSxJQUFJLFdBQVMsRUFBRSxVQUFVLEVBQUUsT0FBTyxVQUFVLEtBQUksQ0FBRSxDQUFDO0FBRXhGLGdCQUFNO0FBQUEsWUFDSixFQUFFLFVBQVU7QUFBQSxjQUNWLE9BQU87QUFBQSxjQUNQLE1BQU0sU0FBUztBQUFBLGNBQ2YsVUFBVSxNQUFNO0FBQUEsWUFDOUIsR0FBZSxJQUFJO0FBQUEsVUFDbkI7QUFBQSxRQUNBO0FBRVEsY0FBTSxRQUFRLE1BQU0sYUFBYSxRQUFRLGFBQWEsT0FBTyxTQUFTLE1BQU0sV0FBVyxXQUFXO0FBRWxHLGVBQU8sRUFBRSxPQUFPO0FBQUEsVUFDZCxPQUFPO0FBQUEsVUFDUCxHQUFHO0FBQUEsVUFDSCxHQUFHLE1BQU0sV0FBVyxVQUFVO0FBQUEsUUFDeEMsR0FBVyxLQUFLO0FBQUEsTUFDVDtBQUFBLE1BRUQsZ0JBQWdCLE1BQ2QsTUFBTSxZQUFZLFFBQVEsc0JBQXNCLFVBQVUsUUFBUSxNQUFNLHFCQUFxQixPQUN6RjtBQUFBLFFBQ0UsRUFBRSxPQUFPO0FBQUEsVUFDUCxPQUFPLDZCQUE2QixLQUFLLFVBQVUsT0FBTyxnQkFBZ0I7QUFBQSxVQUMxRSxNQUFNLGtCQUFrQjtBQUFBLFFBQ3pCLENBQUE7QUFBQSxNQUNmLElBQ1k7QUFBQSxJQUVQLENBQUE7QUFFRCxXQUFPLFNBQVMsS0FBSztBQUFBLEVBQ3pCO0FBQ0EsQ0FBQztBQ3hpREQsTUFBS0MsY0FBVTtBQUFBLEVBQ2IsTUFBTTtBQUFBLEVBQ04sUUFBUTtBQUNOLFVBQU0sWUFBWSxhQUFZO0FBRTlCLFVBQU0sZUFBZSxJQUFJLFVBQVUsY0FBYyxVQUFVLFlBQVksT0FBTyxTQUFTO0FBR3ZGLFlBQVEsSUFBSSx3Q0FBd0MsYUFBYSxLQUFLO0FBQ3RFLFlBQVEsSUFBSSwrQkFBK0IsVUFBVSxXQUFXO0FBR2hFLFVBQU0sY0FBYyxDQUFDLFdBQVc7QUFDOUIsY0FBUSxJQUFJLDJDQUEyQyxNQUFNO0FBQUEsSUFDOUQsQ0FBQTtBQUdELFVBQU0sZUFBZSxDQUFDLFNBQVM7QUFDN0IsY0FBUSxJQUFJLDRDQUE0QyxJQUFJO0FBQzVELFlBQU0sV0FBVyxLQUFLO0FBQ3RCLGNBQVEsSUFBSSxzQ0FBc0MsUUFBUTtBQUMxRCxnQkFBVSxRQUFRLFFBQVE7QUFDMUIsY0FBUSxJQUFJLHVEQUF1RCxVQUFVLFdBQVc7QUFBQSxJQUMxRjtBQUVBLFdBQU87QUFBQSxNQUNMO0FBQUEsTUFDQSxhQUFhLFVBQVU7QUFBQSxNQUN2QjtBQUFBLElBQ0Y7QUFBQSxFQUNEO0FBQ0g7QUFwRE8sTUFBQUMsZUFBQSxFQUFBLE9BQU0sZ0JBQWU7O0FBQTFCLFNBQUFDLFVBQUEsR0FBQUMsbUJBY00sT0FkTkYsY0FjTTtBQUFBLElBYkpHLFlBWVcsU0FBQTtBQUFBLE1BZGYsWUFHZSxPQUFZO0FBQUEsTUFIM0IsdUJBQUE7QUFBQSw4Q0FHZSxPQUFZLGVBQUE7QUFBQSxRQUdBLE9BQVk7QUFBQTtNQUZoQyxTQUFTLE9BQVc7QUFBQSxNQUNyQixPQUFNO0FBQUEsTUFFTixVQUFTO0FBQUEsTUFDVCxTQUFBO0FBQUEsTUFDQSxRQUFBO0FBQUEsTUFDQSx1QkFBb0I7QUFBQSxNQUNwQixZQUFTO0FBQUEsTUFDVCxpQkFBYztBQUFBOzs7Ozs7OztBQ1lwQixjQUFVLE1BQU07QUFFZCxlQUFTO0FBQUEsUUFDUDtBQUFBLFFBQ0EsTUFBTTtBQUNKLGdCQUFNLGVBQWUsS0FBSyxPQUFPLGdCQUFnQixPQUFPLG9CQUFrQjtBQUMxRSx1QkFBYSxRQUFPO0FBQUEsUUFDckI7QUFBQSxRQUNELEVBQUUsTUFBTSxLQUFNO0FBQUEsTUFDbEI7QUFBQSxJQUNBLENBQUM7Ozs7OztBQS9CVSxNQUFBLGFBQUEsRUFBQSxPQUFNLDBCQUF5Qjs7O3NCQUZ4Q0MsWUFlVyxTQUFBLEVBQUEsTUFBQSxpQkFmaUI7QUFBQSxJQUQ5QixTQUFBQyxRQUVJLE1BU1c7QUFBQSxNQVRYRixZQVNXLFNBQUE7QUFBQSxRQVRELFFBQUE7QUFBQSxRQUFPLFVBQUE7QUFBQSxRQUFVLE9BRi9CRyxlQUVzQyxDQUFnQyxnQkFBQSxjQUFBLENBQUE7QUFBQTtRQUZ0RSxTQUFBRCxRQUdNLE1BRU07QUFBQSxVQUZORSxnQkFFTSxPQUZOLFlBRU07QUFBQSxZQURKSixZQUFnQixPQUFBLGNBQUEsQ0FBQTtBQUFBO1VBRWxCQSxZQUlZLFVBQUEsTUFBQTtBQUFBLFlBVmxCLFNBQUFFLFFBT1EsTUFFa0I7QUFBQSxjQUZsQkYsWUFFa0IsZUFBQSxFQUFBLE9BQUEsRUFBQSxlQUZpQyxnQkFBQSxLQUFBO0FBQUEsZ0JBUDNELFNBQUFFLFFBUVUsTUFBK0IsT0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLElBQUE7QUFBQSxrQkFBL0JFLGdCQUErQixPQUFBLEVBQTFCLE9BQU0sY0FBYSxHQUFBLE1BQUEsRUFBQTtBQUFBO2dCQVJsQyxHQUFBO0FBQUE7O1lBQUEsR0FBQTtBQUFBOztRQUFBLEdBQUE7QUFBQTtNQWFJSixZQUVtQixnQkFBQSxNQUFBO0FBQUEsUUFmdkIsU0FBQUUsUUFjTSxNQUFlO0FBQUEsVUFBZkYsWUFBZSxzQkFBQTtBQUFBO1FBZHJCLEdBQUE7QUFBQTs7SUFBQSxHQUFBO0FBQUE7OzsiLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMCwxLDIsMyw0LDUsNiw3LDgsOSwxMCwxMSwxMiwxMywxNCwxNSwxNiwxNywxOCwxOSwyMCwyMSwyMiwyMywyNCwyNSwyNiwyNywyOCwyOSwzMCwzMSwzMiwzMywzNCwzNSwzNiwzNywzOCwzOSw0MCw0MSw0Miw0Myw0NF19
