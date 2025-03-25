import { u as useDarkProps, a as useDark, b as useTimeout, c as useFormProps, d as useFormInputNameAttr, e as useMoodStore, Q as QImg } from "./moodStore-Dnb7hJXV.js";
import { a as createComponent, b as computed, h, r as ref, i as isRuntimeSsrPreHydration, o as onMounted, g as getCurrentInstance, d as onBeforeUnmount, n as noop, e as nextTick, l as listenOpts, f as inject, j as emptyRenderFn, k as layoutKey, w as watch, H as History, m as client, s as stopAndPrevent, p as getEventPath, P as Platform, q as createDirective, t as cleanEvt, u as preventDraggable, v as addEvt, x as position, y as prevent, z as stop, A as leftClick, B as withDirectives, C as provide, D as pageContainerKey, E as reactive, F as onUnmounted, G as isKeyCode, _ as _export_sfc, I as createBlock, J as openBlock, K as withCtx, L as createCommentVNode, M as createVNode, N as createTextVNode, O as toDisplayString, Q as onBeforeUpdate, R as formKey, S as debounce, T as injectProp, U as onDeactivated, V as onActivated, W as Transition, X as globalConfig, Y as Teleport, Z as onBeforeMount, $ as onUpdated, a0 as isDeepEqual, a1 as shouldIgnoreKey, a2 as createElementBlock, a3 as resolveComponent, a4 as normalizeClass, a5 as createBaseVNode, a6 as Fragment, a7 as renderList, a8 as mergeProps } from "./index-DrKvdikb.js";
import { h as hSlot, u as useSizeProps, a as useSize, Q as QIcon, b as hMergeSlotSafely, c as hMergeSlot, v as vmHasRouter, d as css, g as getElement, e as hDir, f as useRouterLinkProps, i as useRouterLink, j as hUniqueSlot, k as QSpinner, R as Ripple, l as getParentProxy, m as vmIsDestroyed, n as childHasFocus, o as QBtn } from "./QBtn-CmaxhcOH.js";
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
const QAvatar = createComponent({
  name: "QAvatar",
  props: {
    ...useSizeProps,
    fontSize: String,
    color: String,
    textColor: String,
    icon: String,
    square: Boolean,
    rounded: Boolean
  },
  setup(props, { slots }) {
    const sizeStyle = useSize(props);
    const classes = computed(
      () => "q-avatar" + (props.color ? ` bg-${props.color}` : "") + (props.textColor ? ` text-${props.textColor} q-chip--colored` : "") + (props.square === true ? " q-avatar--square" : props.rounded === true ? " rounded-borders" : "")
    );
    const contentStyle = computed(() => props.fontSize ? { fontSize: props.fontSize } : null);
    return () => {
      const icon = props.icon !== void 0 ? [h(QIcon, { name: props.icon })] : void 0;
      return h("div", {
        class: classes.value,
        style: sizeStyle.value
      }, [
        h("div", {
          class: "q-avatar__content row flex-center overflow-hidden",
          style: contentStyle.value
        }, hMergeSlotSafely(slots.default, icon))
      ]);
    };
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
const roleAttrExceptions = ["ul", "ol"];
const QList = createComponent({
  name: "QList",
  props: {
    ...useDarkProps,
    bordered: Boolean,
    dense: Boolean,
    separator: Boolean,
    padding: Boolean,
    tag: {
      type: String,
      default: "div"
    }
  },
  setup(props, { slots }) {
    const vm = getCurrentInstance();
    const isDark = useDark(props, vm.proxy.$q);
    const role = computed(
      () => roleAttrExceptions.includes(props.tag) ? null : "list"
    );
    const classes = computed(
      () => "q-list" + (props.bordered === true ? " q-list--bordered" : "") + (props.dense === true ? " q-list--dense" : "") + (props.separator === true ? " q-list--separator" : "") + (isDark.value === true ? " q-list--dark" : "") + (props.padding === true ? " q-list--padding" : "")
    );
    return () => h(props.tag, { class: classes.value, role: role.value }, hSlot(slots.default));
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
  processOnMount === true && onMounted(() => {
    processModelChange(props.modelValue);
  });
  const publicMethods = { show, hide, toggle };
  Object.assign(proxy, publicMethods);
  return publicMethods;
}
const scrollTargetProp = [Element, String];
const scrollTargets = [null, document, document.body, document.scrollingElement, document.documentElement];
function getScrollTarget(el, targetEl) {
  let target2 = getElement(targetEl);
  if (target2 === void 0) {
    if (el === void 0 || el === null) {
      return window;
    }
    target2 = el.closest(".scroll,.scroll-y,.overflow-auto");
  }
  return scrollTargets.includes(target2) ? window : target2;
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
const modifiersAll = {
  left: true,
  right: true,
  up: true,
  down: true,
  horizontal: true,
  vertical: true
};
const directionList = Object.keys(modifiersAll);
modifiersAll.all = true;
function getModifierDirections(mod) {
  const dir = {};
  for (const direction of directionList) {
    if (mod[direction] === true) {
      dir[direction] = true;
    }
  }
  if (Object.keys(dir).length === 0) {
    return modifiersAll;
  }
  if (dir.horizontal === true) {
    dir.left = dir.right = true;
  } else if (dir.left === true && dir.right === true) {
    dir.horizontal = true;
  }
  if (dir.vertical === true) {
    dir.up = dir.down = true;
  } else if (dir.up === true && dir.down === true) {
    dir.vertical = true;
  }
  if (dir.horizontal === true && dir.vertical === true) {
    dir.all = true;
  }
  return dir;
}
const avoidNodeNamesList = ["INPUT", "TEXTAREA"];
function shouldStart(evt, ctx) {
  return ctx.event === void 0 && evt.target !== void 0 && evt.target.draggable !== true && typeof ctx.handler === "function" && avoidNodeNamesList.includes(evt.target.nodeName.toUpperCase()) === false && (evt.qClonedBy === void 0 || evt.qClonedBy.indexOf(ctx.uid) === -1);
}
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
function getChanges(evt, ctx, isFinal) {
  const pos = position(evt);
  let dir, distX = pos.left - ctx.event.x, distY = pos.top - ctx.event.y, absX = Math.abs(distX), absY = Math.abs(distY);
  const direction = ctx.direction;
  if (direction.horizontal === true && direction.vertical !== true) {
    dir = distX < 0 ? "left" : "right";
  } else if (direction.horizontal !== true && direction.vertical === true) {
    dir = distY < 0 ? "up" : "down";
  } else if (direction.up === true && distY < 0) {
    dir = "up";
    if (absX > absY) {
      if (direction.left === true && distX < 0) {
        dir = "left";
      } else if (direction.right === true && distX > 0) {
        dir = "right";
      }
    }
  } else if (direction.down === true && distY > 0) {
    dir = "down";
    if (absX > absY) {
      if (direction.left === true && distX < 0) {
        dir = "left";
      } else if (direction.right === true && distX > 0) {
        dir = "right";
      }
    }
  } else if (direction.left === true && distX < 0) {
    dir = "left";
    if (absX < absY) {
      if (direction.up === true && distY < 0) {
        dir = "up";
      } else if (direction.down === true && distY > 0) {
        dir = "down";
      }
    }
  } else if (direction.right === true && distX > 0) {
    dir = "right";
    if (absX < absY) {
      if (direction.up === true && distY < 0) {
        dir = "up";
      } else if (direction.down === true && distY > 0) {
        dir = "down";
      }
    }
  }
  let synthetic = false;
  if (dir === void 0 && isFinal === false) {
    if (ctx.event.isFirst === true || ctx.event.lastDir === void 0) {
      return {};
    }
    dir = ctx.event.lastDir;
    synthetic = true;
    if (dir === "left" || dir === "right") {
      pos.left -= distX;
      absX = 0;
      distX = 0;
    } else {
      pos.top -= distY;
      absY = 0;
      distY = 0;
    }
  }
  return {
    synthetic,
    payload: {
      evt,
      touch: ctx.event.mouse !== true,
      mouse: ctx.event.mouse === true,
      position: pos,
      direction: dir,
      isFirst: ctx.event.isFirst,
      isFinal: isFinal === true,
      duration: Date.now() - ctx.event.time,
      distance: {
        x: absX,
        y: absY
      },
      offset: {
        x: distX,
        y: distY
      },
      delta: {
        x: pos.left - ctx.event.lastX,
        y: pos.top - ctx.event.lastY
      }
    }
  };
}
let uid$1 = 0;
const TouchPan = createDirective(
  {
    name: "touch-pan",
    beforeMount(el, { value: value2, modifiers }) {
      if (modifiers.mouse !== true && client.has.touch !== true) return;
      function handleEvent(evt, mouseEvent) {
        if (modifiers.mouse === true && mouseEvent === true) {
          stopAndPrevent(evt);
        } else {
          modifiers.stop === true && stop(evt);
          modifiers.prevent === true && prevent(evt);
        }
      }
      const ctx = {
        uid: "qvtp_" + uid$1++,
        handler: value2,
        modifiers,
        direction: getModifierDirections(modifiers),
        noop,
        mouseStart(evt) {
          if (shouldStart(evt, ctx) && leftClick(evt)) {
            addEvt(ctx, "temp", [
              [document, "mousemove", "move", "notPassiveCapture"],
              [document, "mouseup", "end", "passiveCapture"]
            ]);
            ctx.start(evt, true);
          }
        },
        touchStart(evt) {
          if (shouldStart(evt, ctx)) {
            const target2 = evt.target;
            addEvt(ctx, "temp", [
              [target2, "touchmove", "move", "notPassiveCapture"],
              [target2, "touchcancel", "end", "passiveCapture"],
              [target2, "touchend", "end", "passiveCapture"]
            ]);
            ctx.start(evt);
          }
        },
        start(evt, mouseEvent) {
          client.is.firefox === true && preventDraggable(el, true);
          ctx.lastEvt = evt;
          if (mouseEvent === true || modifiers.stop === true) {
            if (ctx.direction.all !== true && (mouseEvent !== true || ctx.modifiers.mouseAllDir !== true && ctx.modifiers.mousealldir !== true)) {
              const clone = evt.type.indexOf("mouse") !== -1 ? new MouseEvent(evt.type, evt) : new TouchEvent(evt.type, evt);
              evt.defaultPrevented === true && prevent(clone);
              evt.cancelBubble === true && stop(clone);
              Object.assign(clone, {
                qKeyEvent: evt.qKeyEvent,
                qClickOutside: evt.qClickOutside,
                qAnchorHandled: evt.qAnchorHandled,
                qClonedBy: evt.qClonedBy === void 0 ? [ctx.uid] : evt.qClonedBy.concat(ctx.uid)
              });
              ctx.initialEvent = {
                target: evt.target,
                event: clone
              };
            }
            stop(evt);
          }
          const { left, top } = position(evt);
          ctx.event = {
            x: left,
            y: top,
            time: Date.now(),
            mouse: mouseEvent === true,
            detected: false,
            isFirst: true,
            isFinal: false,
            lastX: left,
            lastY: top
          };
        },
        move(evt) {
          if (ctx.event === void 0) return;
          const pos = position(evt), distX = pos.left - ctx.event.x, distY = pos.top - ctx.event.y;
          if (distX === 0 && distY === 0) return;
          ctx.lastEvt = evt;
          const isMouseEvt = ctx.event.mouse === true;
          const start = () => {
            handleEvent(evt, isMouseEvt);
            let cursor;
            if (modifiers.preserveCursor !== true && modifiers.preservecursor !== true) {
              cursor = document.documentElement.style.cursor || "";
              document.documentElement.style.cursor = "grabbing";
            }
            isMouseEvt === true && document.body.classList.add("no-pointer-events--children");
            document.body.classList.add("non-selectable");
            clearSelection();
            ctx.styleCleanup = (withDelayedFn) => {
              ctx.styleCleanup = void 0;
              if (cursor !== void 0) {
                document.documentElement.style.cursor = cursor;
              }
              document.body.classList.remove("non-selectable");
              if (isMouseEvt === true) {
                const remove = () => {
                  document.body.classList.remove("no-pointer-events--children");
                };
                if (withDelayedFn !== void 0) {
                  setTimeout(() => {
                    remove();
                    withDelayedFn();
                  }, 50);
                } else {
                  remove();
                }
              } else if (withDelayedFn !== void 0) {
                withDelayedFn();
              }
            };
          };
          if (ctx.event.detected === true) {
            ctx.event.isFirst !== true && handleEvent(evt, ctx.event.mouse);
            const { payload, synthetic } = getChanges(evt, ctx, false);
            if (payload !== void 0) {
              if (ctx.handler(payload) === false) {
                ctx.end(evt);
              } else {
                if (ctx.styleCleanup === void 0 && ctx.event.isFirst === true) {
                  start();
                }
                ctx.event.lastX = payload.position.left;
                ctx.event.lastY = payload.position.top;
                ctx.event.lastDir = synthetic === true ? void 0 : payload.direction;
                ctx.event.isFirst = false;
              }
            }
            return;
          }
          if (ctx.direction.all === true || isMouseEvt === true && (ctx.modifiers.mouseAllDir === true || ctx.modifiers.mousealldir === true)) {
            start();
            ctx.event.detected = true;
            ctx.move(evt);
            return;
          }
          const absX = Math.abs(distX), absY = Math.abs(distY);
          if (absX !== absY) {
            if (ctx.direction.horizontal === true && absX > absY || ctx.direction.vertical === true && absX < absY || ctx.direction.up === true && absX < absY && distY < 0 || ctx.direction.down === true && absX < absY && distY > 0 || ctx.direction.left === true && absX > absY && distX < 0 || ctx.direction.right === true && absX > absY && distX > 0) {
              ctx.event.detected = true;
              ctx.move(evt);
            } else {
              ctx.end(evt, true);
            }
          }
        },
        end(evt, abort) {
          if (ctx.event === void 0) return;
          cleanEvt(ctx, "temp");
          client.is.firefox === true && preventDraggable(el, false);
          if (abort === true) {
            ctx.styleCleanup?.();
            if (ctx.event.detected !== true && ctx.initialEvent !== void 0) {
              ctx.initialEvent.target.dispatchEvent(ctx.initialEvent.event);
            }
          } else if (ctx.event.detected === true) {
            ctx.event.isFirst === true && ctx.handler(getChanges(evt === void 0 ? ctx.lastEvt : evt, ctx).payload);
            const { payload } = getChanges(evt === void 0 ? ctx.lastEvt : evt, ctx, true);
            const fn = () => {
              ctx.handler(payload);
            };
            if (ctx.styleCleanup !== void 0) {
              ctx.styleCleanup(fn);
            } else {
              fn();
            }
          }
          ctx.event = void 0;
          ctx.initialEvent = void 0;
          ctx.lastEvt = void 0;
        }
      };
      el.__qtouchpan = ctx;
      if (modifiers.mouse === true) {
        const capture = modifiers.mouseCapture === true || modifiers.mousecapture === true ? "Capture" : "";
        addEvt(ctx, "main", [
          [el, "mousedown", "mouseStart", `passive${capture}`]
        ]);
      }
      client.has.touch === true && addEvt(ctx, "main", [
        [el, "touchstart", "touchStart", `passive${modifiers.capture === true ? "Capture" : ""}`],
        [el, "touchmove", "noop", "notPassiveCapture"]
        // cannot be passive (ex: iOS scroll)
      ]);
    },
    updated(el, bindings) {
      const ctx = el.__qtouchpan;
      if (ctx !== void 0) {
        if (bindings.oldValue !== bindings.value) {
          typeof value !== "function" && ctx.end();
          ctx.handler = bindings.value;
        }
        ctx.direction = getModifierDirections(bindings.modifiers);
      }
    },
    beforeUnmount(el) {
      const ctx = el.__qtouchpan;
      if (ctx !== void 0) {
        ctx.event !== void 0 && ctx.end();
        cleanEvt(ctx, "main");
        cleanEvt(ctx, "temp");
        client.is.firefox === true && preventDraggable(el, false);
        ctx.styleCleanup?.();
        delete el.__qtouchpan;
      }
    }
  }
);
function between(v, min, max) {
  return max <= min ? min : Math.min(max, Math.max(min, v));
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
const duration = 150;
const QDrawer = createComponent({
  name: "QDrawer",
  inheritAttrs: false,
  props: {
    ...useModelToggleProps,
    ...useDarkProps,
    side: {
      type: String,
      default: "left",
      validator: (v) => ["left", "right"].includes(v)
    },
    width: {
      type: Number,
      default: 300
    },
    mini: Boolean,
    miniToOverlay: Boolean,
    miniWidth: {
      type: Number,
      default: 57
    },
    noMiniAnimation: Boolean,
    breakpoint: {
      type: Number,
      default: 1023
    },
    showIfAbove: Boolean,
    behavior: {
      type: String,
      validator: (v) => ["default", "desktop", "mobile"].includes(v),
      default: "default"
    },
    bordered: Boolean,
    elevated: Boolean,
    overlay: Boolean,
    persistent: Boolean,
    noSwipeOpen: Boolean,
    noSwipeClose: Boolean,
    noSwipeBackdrop: Boolean
  },
  emits: [
    ...useModelToggleEmits,
    "onLayout",
    "miniState"
  ],
  setup(props, { slots, emit, attrs }) {
    const vm = getCurrentInstance();
    const { proxy: { $q } } = vm;
    const isDark = useDark(props, $q);
    const { preventBodyScroll } = usePreventScroll();
    const { registerTimeout, removeTimeout } = useTimeout();
    const $layout = inject(layoutKey, emptyRenderFn);
    if ($layout === emptyRenderFn) {
      console.error("QDrawer needs to be child of QLayout");
      return emptyRenderFn;
    }
    let lastDesktopState, timerMini = null, layoutTotalWidthWatcher;
    const belowBreakpoint = ref(
      props.behavior === "mobile" || props.behavior !== "desktop" && $layout.totalWidth.value <= props.breakpoint
    );
    const isMini = computed(
      () => props.mini === true && belowBreakpoint.value !== true
    );
    const size2 = computed(() => isMini.value === true ? props.miniWidth : props.width);
    const showing = ref(
      props.showIfAbove === true && belowBreakpoint.value === false ? true : props.modelValue === true
    );
    const hideOnRouteChange = computed(
      () => props.persistent !== true && (belowBreakpoint.value === true || onScreenOverlay.value === true)
    );
    function handleShow(evt, noEvent) {
      addToHistory();
      evt !== false && $layout.animate();
      applyPosition(0);
      if (belowBreakpoint.value === true) {
        const otherInstance = $layout.instances[otherSide.value];
        if (otherInstance?.belowBreakpoint === true) {
          otherInstance.hide(false);
        }
        applyBackdrop(1);
        $layout.isContainer.value !== true && preventBodyScroll(true);
      } else {
        applyBackdrop(0);
        evt !== false && setScrollable(false);
      }
      registerTimeout(() => {
        evt !== false && setScrollable(true);
        noEvent !== true && emit("show", evt);
      }, duration);
    }
    function handleHide(evt, noEvent) {
      removeFromHistory();
      evt !== false && $layout.animate();
      applyBackdrop(0);
      applyPosition(stateDirection.value * size2.value);
      cleanup();
      if (noEvent !== true) {
        registerTimeout(() => {
          emit("hide", evt);
        }, duration);
      } else {
        removeTimeout();
      }
    }
    const { show, hide } = useModelToggle({
      showing,
      hideOnRouteChange,
      handleShow,
      handleHide
    });
    const { addToHistory, removeFromHistory } = useHistory(showing, hide, hideOnRouteChange);
    const instance = {
      belowBreakpoint,
      hide
    };
    const rightSide = computed(() => props.side === "right");
    const stateDirection = computed(
      () => ($q.lang.rtl === true ? -1 : 1) * (rightSide.value === true ? 1 : -1)
    );
    const flagBackdropBg = ref(0);
    const flagPanning = ref(false);
    const flagMiniAnimate = ref(false);
    const flagContentPosition = ref(
      // starting with "hidden" for SSR
      size2.value * stateDirection.value
    );
    const otherSide = computed(() => rightSide.value === true ? "left" : "right");
    const offset = computed(() => showing.value === true && belowBreakpoint.value === false && props.overlay === false ? props.miniToOverlay === true ? props.miniWidth : size2.value : 0);
    const fixed = computed(
      () => props.overlay === true || props.miniToOverlay === true || $layout.view.value.indexOf(rightSide.value ? "R" : "L") !== -1 || $q.platform.is.ios === true && $layout.isContainer.value === true
    );
    const onLayout = computed(
      () => props.overlay === false && showing.value === true && belowBreakpoint.value === false
    );
    const onScreenOverlay = computed(
      () => props.overlay === true && showing.value === true && belowBreakpoint.value === false
    );
    const backdropClass = computed(
      () => "fullscreen q-drawer__backdrop" + (showing.value === false && flagPanning.value === false ? " hidden" : "")
    );
    const backdropStyle = computed(() => ({
      backgroundColor: `rgba(0,0,0,${flagBackdropBg.value * 0.4})`
    }));
    const headerSlot = computed(() => rightSide.value === true ? $layout.rows.value.top[2] === "r" : $layout.rows.value.top[0] === "l");
    const footerSlot = computed(() => rightSide.value === true ? $layout.rows.value.bottom[2] === "r" : $layout.rows.value.bottom[0] === "l");
    const aboveStyle = computed(() => {
      const css2 = {};
      if ($layout.header.space === true && headerSlot.value === false) {
        if (fixed.value === true) {
          css2.top = `${$layout.header.offset}px`;
        } else if ($layout.header.space === true) {
          css2.top = `${$layout.header.size}px`;
        }
      }
      if ($layout.footer.space === true && footerSlot.value === false) {
        if (fixed.value === true) {
          css2.bottom = `${$layout.footer.offset}px`;
        } else if ($layout.footer.space === true) {
          css2.bottom = `${$layout.footer.size}px`;
        }
      }
      return css2;
    });
    const style = computed(() => {
      const style2 = {
        width: `${size2.value}px`,
        transform: `translateX(${flagContentPosition.value}px)`
      };
      return belowBreakpoint.value === true ? style2 : Object.assign(style2, aboveStyle.value);
    });
    const contentClass = computed(
      () => "q-drawer__content fit " + ($layout.isContainer.value !== true ? "scroll" : "overflow-auto")
    );
    const classes = computed(
      () => `q-drawer q-drawer--${props.side}` + (flagMiniAnimate.value === true ? " q-drawer--mini-animate" : "") + (props.bordered === true ? " q-drawer--bordered" : "") + (isDark.value === true ? " q-drawer--dark q-dark" : "") + (flagPanning.value === true ? " no-transition" : showing.value === true ? "" : " q-layout--prevent-focus") + (belowBreakpoint.value === true ? " fixed q-drawer--on-top q-drawer--mobile q-drawer--top-padding" : ` q-drawer--${isMini.value === true ? "mini" : "standard"}` + (fixed.value === true || onLayout.value !== true ? " fixed" : "") + (props.overlay === true || props.miniToOverlay === true ? " q-drawer--on-top" : "") + (headerSlot.value === true ? " q-drawer--top-padding" : ""))
    );
    const openDirective = computed(() => {
      const dir = $q.lang.rtl === true ? props.side : otherSide.value;
      return [[
        TouchPan,
        onOpenPan,
        void 0,
        {
          [dir]: true,
          mouse: true
        }
      ]];
    });
    const contentCloseDirective = computed(() => {
      const dir = $q.lang.rtl === true ? otherSide.value : props.side;
      return [[
        TouchPan,
        onClosePan,
        void 0,
        {
          [dir]: true,
          mouse: true
        }
      ]];
    });
    const backdropCloseDirective = computed(() => {
      const dir = $q.lang.rtl === true ? otherSide.value : props.side;
      return [[
        TouchPan,
        onClosePan,
        void 0,
        {
          [dir]: true,
          mouse: true,
          mouseAllDir: true
        }
      ]];
    });
    function updateBelowBreakpoint() {
      updateLocal(belowBreakpoint, props.behavior === "mobile" || props.behavior !== "desktop" && $layout.totalWidth.value <= props.breakpoint);
    }
    watch(belowBreakpoint, (val) => {
      if (val === true) {
        lastDesktopState = showing.value;
        showing.value === true && hide(false);
      } else if (props.overlay === false && props.behavior !== "mobile" && lastDesktopState !== false) {
        if (showing.value === true) {
          applyPosition(0);
          applyBackdrop(0);
          cleanup();
        } else {
          show(false);
        }
      }
    });
    watch(() => props.side, (newSide, oldSide) => {
      if ($layout.instances[oldSide] === instance) {
        $layout.instances[oldSide] = void 0;
        $layout[oldSide].space = false;
        $layout[oldSide].offset = 0;
      }
      $layout.instances[newSide] = instance;
      $layout[newSide].size = size2.value;
      $layout[newSide].space = onLayout.value;
      $layout[newSide].offset = offset.value;
    });
    watch($layout.totalWidth, () => {
      if ($layout.isContainer.value === true || document.qScrollPrevented !== true) {
        updateBelowBreakpoint();
      }
    });
    watch(
      () => props.behavior + props.breakpoint,
      updateBelowBreakpoint
    );
    watch($layout.isContainer, (val) => {
      showing.value === true && preventBodyScroll(val !== true);
      val === true && updateBelowBreakpoint();
    });
    watch($layout.scrollbarWidth, () => {
      applyPosition(showing.value === true ? 0 : void 0);
    });
    watch(offset, (val) => {
      updateLayout("offset", val);
    });
    watch(onLayout, (val) => {
      emit("onLayout", val);
      updateLayout("space", val);
    });
    watch(rightSide, () => {
      applyPosition();
    });
    watch(size2, (val) => {
      applyPosition();
      updateSizeOnLayout(props.miniToOverlay, val);
    });
    watch(() => props.miniToOverlay, (val) => {
      updateSizeOnLayout(val, size2.value);
    });
    watch(() => $q.lang.rtl, () => {
      applyPosition();
    });
    watch(() => props.mini, () => {
      if (props.noMiniAnimation) return;
      if (props.modelValue === true) {
        animateMini();
        $layout.animate();
      }
    });
    watch(isMini, (val) => {
      emit("miniState", val);
    });
    function applyPosition(position2) {
      if (position2 === void 0) {
        nextTick(() => {
          position2 = showing.value === true ? 0 : size2.value;
          applyPosition(stateDirection.value * position2);
        });
      } else {
        if ($layout.isContainer.value === true && rightSide.value === true && (belowBreakpoint.value === true || Math.abs(position2) === size2.value)) {
          position2 += stateDirection.value * $layout.scrollbarWidth.value;
        }
        flagContentPosition.value = position2;
      }
    }
    function applyBackdrop(x) {
      flagBackdropBg.value = x;
    }
    function setScrollable(v) {
      const action = v === true ? "remove" : $layout.isContainer.value !== true ? "add" : "";
      action !== "" && document.body.classList[action]("q-body--drawer-toggle");
    }
    function animateMini() {
      timerMini !== null && clearTimeout(timerMini);
      if (vm.proxy && vm.proxy.$el) {
        vm.proxy.$el.classList.add("q-drawer--mini-animate");
      }
      flagMiniAnimate.value = true;
      timerMini = setTimeout(() => {
        timerMini = null;
        flagMiniAnimate.value = false;
        vm?.proxy?.$el?.classList.remove("q-drawer--mini-animate");
      }, 150);
    }
    function onOpenPan(evt) {
      if (showing.value !== false) {
        return;
      }
      const width = size2.value, position2 = between(evt.distance.x, 0, width);
      if (evt.isFinal === true) {
        const opened = position2 >= Math.min(75, width);
        if (opened === true) {
          show();
        } else {
          $layout.animate();
          applyBackdrop(0);
          applyPosition(stateDirection.value * width);
        }
        flagPanning.value = false;
        return;
      }
      applyPosition(
        ($q.lang.rtl === true ? rightSide.value !== true : rightSide.value) ? Math.max(width - position2, 0) : Math.min(0, position2 - width)
      );
      applyBackdrop(
        between(position2 / width, 0, 1)
      );
      if (evt.isFirst === true) {
        flagPanning.value = true;
      }
    }
    function onClosePan(evt) {
      if (showing.value !== true) {
        return;
      }
      const width = size2.value, dir = evt.direction === props.side, position2 = ($q.lang.rtl === true ? dir !== true : dir) ? between(evt.distance.x, 0, width) : 0;
      if (evt.isFinal === true) {
        const opened = Math.abs(position2) < Math.min(75, width);
        if (opened === true) {
          $layout.animate();
          applyBackdrop(1);
          applyPosition(0);
        } else {
          hide();
        }
        flagPanning.value = false;
        return;
      }
      applyPosition(stateDirection.value * position2);
      applyBackdrop(between(1 - position2 / width, 0, 1));
      if (evt.isFirst === true) {
        flagPanning.value = true;
      }
    }
    function cleanup() {
      preventBodyScroll(false);
      setScrollable(true);
    }
    function updateLayout(prop, val) {
      $layout.update(props.side, prop, val);
    }
    function updateLocal(prop, val) {
      if (prop.value !== val) {
        prop.value = val;
      }
    }
    function updateSizeOnLayout(miniToOverlay, size3) {
      updateLayout("size", miniToOverlay === true ? props.miniWidth : size3);
    }
    $layout.instances[props.side] = instance;
    updateSizeOnLayout(props.miniToOverlay, size2.value);
    updateLayout("space", onLayout.value);
    updateLayout("offset", offset.value);
    if (props.showIfAbove === true && props.modelValue !== true && showing.value === true && props["onUpdate:modelValue"] !== void 0) {
      emit("update:modelValue", true);
    }
    onMounted(() => {
      emit("onLayout", onLayout.value);
      emit("miniState", isMini.value);
      lastDesktopState = props.showIfAbove === true;
      const fn = () => {
        const action = showing.value === true ? handleShow : handleHide;
        action(false, true);
      };
      if ($layout.totalWidth.value !== 0) {
        nextTick(fn);
        return;
      }
      layoutTotalWidthWatcher = watch($layout.totalWidth, () => {
        layoutTotalWidthWatcher();
        layoutTotalWidthWatcher = void 0;
        if (showing.value === false && props.showIfAbove === true && belowBreakpoint.value === false) {
          show(false);
        } else {
          fn();
        }
      });
    });
    onBeforeUnmount(() => {
      layoutTotalWidthWatcher?.();
      if (timerMini !== null) {
        clearTimeout(timerMini);
        timerMini = null;
      }
      showing.value === true && cleanup();
      if ($layout.instances[props.side] === instance) {
        $layout.instances[props.side] = void 0;
        updateLayout("size", 0);
        updateLayout("offset", 0);
        updateLayout("space", false);
      }
    });
    return () => {
      const child = [];
      if (belowBreakpoint.value === true) {
        props.noSwipeOpen === false && child.push(
          withDirectives(
            h("div", {
              key: "open",
              class: `q-drawer__opener fixed-${props.side}`,
              "aria-hidden": "true"
            }),
            openDirective.value
          )
        );
        child.push(
          hDir(
            "div",
            {
              ref: "backdrop",
              class: backdropClass.value,
              style: backdropStyle.value,
              "aria-hidden": "true",
              onClick: hide
            },
            void 0,
            "backdrop",
            props.noSwipeBackdrop !== true && showing.value === true,
            () => backdropCloseDirective.value
          )
        );
      }
      const mini = isMini.value === true && slots.mini !== void 0;
      const content = [
        h(
          "div",
          {
            ...attrs,
            key: "" + mini,
            // required otherwise Vue will not diff correctly
            class: [
              contentClass.value,
              attrs.class
            ]
          },
          mini === true ? slots.mini() : hSlot(slots.default)
        )
      ];
      if (props.elevated === true && showing.value === true) {
        content.push(
          h("div", {
            class: "q-layout__shadow absolute-full overflow-hidden no-pointer-events"
          })
        );
      }
      child.push(
        hDir(
          "aside",
          { ref: "content", class: classes.value, style: style.value },
          content,
          "contentclose",
          props.noSwipeClose !== true && belowBreakpoint.value === true,
          () => contentCloseDirective.value
        )
      );
      return h("div", { class: "q-drawer-container" }, child);
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
const _sfc_main$2 = {
  __name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true
    },
    caption: {
      type: String,
      default: ""
    },
    link: {
      type: String,
      default: "#"
    },
    icon: {
      type: String,
      default: ""
    }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const __returned__ = { props };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QItem, {
    clickable: "",
    tag: "a",
    target: "_blank",
    href: $setup.props.link
  }, {
    default: withCtx(() => [
      $setup.props.icon ? (openBlock(), createBlock(QItemSection, {
        key: 0,
        avatar: ""
      }, {
        default: withCtx(() => [
          createVNode(QIcon, {
            name: $setup.props.icon
          }, null, 8, ["name"])
        ]),
        _: 1
      })) : createCommentVNode("", true),
      createVNode(QItemSection, null, {
        default: withCtx(() => [
          createVNode(QItemLabel, null, {
            default: withCtx(() => [
              createTextVNode(toDisplayString($setup.props.title), 1)
            ]),
            _: 1
          }),
          createVNode(QItemLabel, { caption: "" }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString($setup.props.caption), 1)
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 8, ["href"]);
}
const EssentialLink = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__file", "EssentialLink.vue"]]);
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
    state.emitValue = (value2) => {
      emit("update:modelValue", value2);
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
    let target2 = state.targetRef?.value;
    if (target2 && (el === null || el.id !== state.targetUid.value)) {
      target2.hasAttribute("tabindex") === true || (target2 = target2.querySelector("[tabindex]"));
      if (target2 !== el) {
        target2?.focus({ preventScroll: true });
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
        const target2 = evt.target;
        addEvt(anchorEvents, "anchor", [
          [target2, "touchmove", "mobileCleanup", "passive"],
          [target2, "touchend", "mobileCleanup", "passive"],
          [target2, "touchcancel", "mobileCleanup", "passive"],
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
let portalIndex = 1;
let target = document.body;
function createGlobalNode(id, portalType) {
  const el = document.createElement("div");
  el.id = portalType !== void 0 ? `q-portal--${portalType}--${portalIndex++}` : id;
  if (globalConfig.globalNodes !== void 0) {
    const cls = globalConfig.globalNodes.class;
    if (cls !== void 0) {
      el.className = cls;
    }
  }
  target.appendChild(el);
  return el;
}
function removeGlobalNode(el) {
  el.remove();
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
  const target2 = evt.target;
  if (target2 === void 0 || target2.nodeType === 8 || target2.classList.contains("no-pointer-events") === true) return;
  let portalIndex2 = portalProxyList.length - 1;
  while (portalIndex2 >= 0) {
    const proxy = portalProxyList[portalIndex2].$;
    if (proxy.type.name === "QTooltip") {
      portalIndex2--;
      continue;
    }
    if (proxy.type.name !== "QDialog") {
      break;
    }
    if (proxy.props.seamless !== true) return;
    portalIndex2--;
  }
  for (let i = registeredList.length - 1; i >= 0; i--) {
    const state = registeredList[i];
    if ((state.anchorEl.value === null || state.anchorEl.value.contains(target2) === false) && (target2 === document.body || state.innerRef.value !== null && state.innerRef.value.contains(target2) === false)) {
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
          const target2 = node.querySelector(selector);
          if (target2 !== null) {
            target2.focus({ preventScroll: true });
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
      __updateRefocusTarget(target2) {
        refocusTarget = target2 || null;
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
    function getOption(value2, valueCache) {
      const fn = (opt) => isDeepEqual(getOptionValue.value(opt), value2);
      return props.options.find(fn) || valueCache.find(fn) || value2;
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
      const { value: value2 } = e.target;
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
      if (typeof value2 === "string" && value2.length !== 0) {
        const needle = value2.toLocaleLowerCase();
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
            filter(value2, true, () => fillFn(true));
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
          const opts = innerOptionsValue.value.map((value2) => h("option", { value: value2, selected: true }));
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
      "dropdown-icon": "img:icons/VSVG.svg"
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
    const linksList = [
      {
        title: "Docs",
        caption: "quasar.dev",
        icon: "school",
        link: "https://quasar.dev"
      },
      {
        title: "Github",
        caption: "github.com/quasarframework",
        icon: "code",
        link: "https://github.com/quasarframework"
      },
      {
        title: "Discord Chat Channel",
        caption: "chat.quasar.dev",
        icon: "chat",
        link: "https://chat.quasar.dev"
      },
      {
        title: "Forum",
        caption: "forum.quasar.dev",
        icon: "record_voice_over",
        link: "https://forum.quasar.dev"
      },
      {
        title: "Twitter",
        caption: "@quasarframework",
        icon: "rss_feed",
        link: "https://twitter.quasar.dev"
      },
      {
        title: "Facebook",
        caption: "@QuasarFramework",
        icon: "public",
        link: "https://facebook.quasar.dev"
      },
      {
        title: "Quasar Awesome",
        caption: "Community Quasar projects",
        icon: "favorite",
        link: "https://awesome.quasar.dev"
      }
    ];
    const rightDrawerOpen = ref(false);
    function toggleRightDrawer() {
      rightDrawerOpen.value = !rightDrawerOpen.value;
    }
    const __returned__ = { linksList, rightDrawerOpen, toggleRightDrawer, ref, onMounted, EssentialLink, MoodSelector };
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
                default: withCtx(() => [
                  createVNode(QImg, {
                    class: "header-text",
                    src: "/icons/valence6.png"
                  })
                ]),
                _: 1
              }),
              createVNode(QBtn, {
                round: "",
                dense: "",
                ripple: "",
                onClick: $setup.toggleRightDrawer
              }, {
                default: withCtx(() => [
                  createVNode(QAvatar, { size: "40px" }, {
                    default: withCtx(() => _cache[1] || (_cache[1] = [
                      createBaseVNode("img", { src: "/icons/VSVG.svg" }, null, -1)
                    ])),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(QDrawer, {
        modelValue: $setup.rightDrawerOpen,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.rightDrawerOpen = $event),
        side: "right",
        class: normalizeClass(["draw-class-style", "shadow-8"]),
        bordered: ""
      }, {
        default: withCtx(() => [
          createVNode(QList, null, {
            default: withCtx(() => [
              createVNode(QItemLabel, { header: "" }, {
                default: withCtx(() => _cache[2] || (_cache[2] = [
                  createTextVNode(" Essential Links ")
                ])),
                _: 1
              }),
              (openBlock(), createElementBlock(Fragment, null, renderList($setup.linksList, (link) => {
                return createVNode($setup["EssentialLink"], mergeProps({
                  key: link.title,
                  ref_for: true
                }, link), null, 16);
              }), 64))
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["modelValue"]),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFpbkxheW91dC1DUXh2NW5Cby5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy90b29sYmFyL1FUb29sYmFyVGl0bGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2F2YXRhci9RQXZhdGFyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy90b29sYmFyL1FUb29sYmFyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvdXNlLWh5ZHJhdGlvbi91c2UtaHlkcmF0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9yZXNpemUtb2JzZXJ2ZXIvUVJlc2l6ZU9ic2VydmVyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9mb290ZXIvUUZvb3Rlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvaXRlbS9RSXRlbUxhYmVsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9pdGVtL1FMaXN0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtaGlzdG9yeS91c2UtaGlzdG9yeS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLW1vZGVsLXRvZ2dsZS91c2UtbW9kZWwtdG9nZ2xlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvc2Nyb2xsL3Njcm9sbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3Njcm9sbC9wcmV2ZW50LXNjcm9sbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLXByZXZlbnQtc2Nyb2xsL3VzZS1wcmV2ZW50LXNjcm9sbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3ByaXZhdGUudG91Y2gvdG91Y2guanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9wcml2YXRlLnNlbGVjdGlvbi9zZWxlY3Rpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9kaXJlY3RpdmVzL3RvdWNoLXBhbi9Ub3VjaFBhbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL2Zvcm1hdC9mb3JtYXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2RyYXdlci9RRHJhd2VyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9wYWdlL1FQYWdlQ29udGFpbmVyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9zY3JvbGwtb2JzZXJ2ZXIvUVNjcm9sbE9ic2VydmVyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9sYXlvdXQvUUxheW91dC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvaXRlbS9RSXRlbVNlY3Rpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2l0ZW0vUUl0ZW0uanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Fc3NlbnRpYWxMaW5rLnZ1ZSIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3VpZC91aWQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy91c2UtaWQvdXNlLWlkLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvdXNlLXNwbGl0LWF0dHJzL3VzZS1zcGxpdC1hdHRycy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3VzZS1mb3JtL3VzZS1mb3JtLWNoaWxkLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvcGF0dGVybnMvcGF0dGVybnMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS12YWxpZGF0ZS91c2UtdmFsaWRhdGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9wcml2YXRlLmZvY3VzL2ZvY3VzLW1hbmFnZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1maWVsZC91c2UtZmllbGQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2ZpZWxkL1FGaWVsZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvY2hpcC9RQ2hpcC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLWFuY2hvci91c2UtYW5jaG9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS51c2Utc2Nyb2xsLXRhcmdldC91c2Utc2Nyb2xsLXRhcmdldC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3ByaXZhdGUuY29uZmlnL25vZGVzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvcHJpdmF0ZS5wb3J0YWwvcG9ydGFsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtcG9ydGFsL3VzZS1wb3J0YWwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS10cmFuc2l0aW9uL3VzZS10cmFuc2l0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvdXNlLXRpY2svdXNlLXRpY2suanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9wcml2YXRlLmtleWJvYXJkL2VzY2FwZS1rZXkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9wcml2YXRlLmZvY3VzL2ZvY3Vzb3V0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvcHJpdmF0ZS5jbGljay1vdXRzaWRlL2NsaWNrLW91dHNpZGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9wcml2YXRlLnBvc2l0aW9uLWVuZ2luZS9wb3NpdGlvbi1lbmdpbmUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL21lbnUvUU1lbnUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2RpYWxvZy9RRGlhbG9nLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvcHJpdmF0ZS5ydGwvcnRsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy92aXJ0dWFsLXNjcm9sbC91c2UtdmlydHVhbC1zY3JvbGwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1rZXktY29tcG9zaXRpb24vdXNlLWtleS1jb21wb3NpdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvc2VsZWN0L1FTZWxlY3QuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Nb29kU2VsZWN0b3IudnVlIiwiLi4vLi4vLi4vc3JjL2xheW91dHMvTWFpbkxheW91dC52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaCwgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5yZW5kZXIvcmVuZGVyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVRvb2xiYXJUaXRsZScsXG5cbiAgcHJvcHM6IHtcbiAgICBzaHJpbms6IEJvb2xlYW5cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtdG9vbGJhcl9fdGl0bGUgZWxsaXBzaXMnXG4gICAgICArIChwcm9wcy5zaHJpbmsgPT09IHRydWUgPyAnIGNvbC1zaHJpbmsnIDogJycpXG4gICAgKVxuXG4gICAgcmV0dXJuICgpID0+IGgoJ2RpdicsIHsgY2xhc3M6IGNsYXNzZXMudmFsdWUgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoLCBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFJY29uIGZyb20gJy4uL2ljb24vUUljb24uanMnXG5cbmltcG9ydCB1c2VTaXplLCB7IHVzZVNpemVQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLXNpemUvdXNlLXNpemUuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhNZXJnZVNsb3RTYWZlbHkgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRQXZhdGFyJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZVNpemVQcm9wcyxcblxuICAgIGZvbnRTaXplOiBTdHJpbmcsXG5cbiAgICBjb2xvcjogU3RyaW5nLFxuICAgIHRleHRDb2xvcjogU3RyaW5nLFxuXG4gICAgaWNvbjogU3RyaW5nLFxuICAgIHNxdWFyZTogQm9vbGVhbixcbiAgICByb3VuZGVkOiBCb29sZWFuXG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCBzaXplU3R5bGUgPSB1c2VTaXplKHByb3BzKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1hdmF0YXInXG4gICAgICArIChwcm9wcy5jb2xvciA/IGAgYmctJHsgcHJvcHMuY29sb3IgfWAgOiAnJylcbiAgICAgICsgKHByb3BzLnRleHRDb2xvciA/IGAgdGV4dC0keyBwcm9wcy50ZXh0Q29sb3IgfSBxLWNoaXAtLWNvbG9yZWRgIDogJycpXG4gICAgICArIChcbiAgICAgICAgcHJvcHMuc3F1YXJlID09PSB0cnVlXG4gICAgICAgICAgPyAnIHEtYXZhdGFyLS1zcXVhcmUnXG4gICAgICAgICAgOiAocHJvcHMucm91bmRlZCA9PT0gdHJ1ZSA/ICcgcm91bmRlZC1ib3JkZXJzJyA6ICcnKVxuICAgICAgKVxuICAgIClcblxuICAgIGNvbnN0IGNvbnRlbnRTdHlsZSA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLmZvbnRTaXplXG4gICAgICAgID8geyBmb250U2l6ZTogcHJvcHMuZm9udFNpemUgfVxuICAgICAgICA6IG51bGxcbiAgICApKVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNvbnN0IGljb24gPSBwcm9wcy5pY29uICE9PSB2b2lkIDBcbiAgICAgICAgPyBbIGgoUUljb24sIHsgbmFtZTogcHJvcHMuaWNvbiB9KSBdXG4gICAgICAgIDogdm9pZCAwXG5cbiAgICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiBjbGFzc2VzLnZhbHVlLFxuICAgICAgICBzdHlsZTogc2l6ZVN0eWxlLnZhbHVlXG4gICAgICB9LCBbXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogJ3EtYXZhdGFyX19jb250ZW50IHJvdyBmbGV4LWNlbnRlciBvdmVyZmxvdy1oaWRkZW4nLFxuICAgICAgICAgIHN0eWxlOiBjb250ZW50U3R5bGUudmFsdWVcbiAgICAgICAgfSwgaE1lcmdlU2xvdFNhZmVseShzbG90cy5kZWZhdWx0LCBpY29uKSlcbiAgICAgIF0pXG4gICAgfVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5yZW5kZXIvcmVuZGVyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVRvb2xiYXInLFxuXG4gIHByb3BzOiB7XG4gICAgaW5zZXQ6IEJvb2xlYW5cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtdG9vbGJhciByb3cgbm8td3JhcCBpdGVtcy1jZW50ZXInXG4gICAgICArIChwcm9wcy5pbnNldCA9PT0gdHJ1ZSA/ICcgcS10b29sYmFyLS1pbnNldCcgOiAnJylcbiAgICApXG5cbiAgICByZXR1cm4gKCkgPT4gaCgnZGl2JywgeyBjbGFzczogY2xhc3Nlcy52YWx1ZSwgcm9sZTogJ3Rvb2xiYXInIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICB9XG59KVxuIiwiaW1wb3J0IHsgcmVmLCBvbk1vdW50ZWQgfSBmcm9tICd2dWUnXG5cbi8vIHVzaW5nIGl0IHRvIG1hbmFnZSBTU1IgcmVuZGVyaW5nIHdpdGggYmVzdCBwZXJmb3JtYW5jZVxuaW1wb3J0IHsgaXNSdW50aW1lU3NyUHJlSHlkcmF0aW9uIH0gZnJvbSAnLi4vLi4vcGx1Z2lucy9wbGF0Zm9ybS9QbGF0Zm9ybS5qcydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICBjb25zdCBpc0h5ZHJhdGVkID0gcmVmKCFpc1J1bnRpbWVTc3JQcmVIeWRyYXRpb24udmFsdWUpXG5cbiAgaWYgKGlzSHlkcmF0ZWQudmFsdWUgPT09IGZhbHNlKSB7XG4gICAgb25Nb3VudGVkKCgpID0+IHtcbiAgICAgIGlzSHlkcmF0ZWQudmFsdWUgPSB0cnVlXG4gICAgfSlcbiAgfVxuXG4gIHJldHVybiB7IGlzSHlkcmF0ZWQgfVxufVxuIiwiaW1wb3J0IHsgaCwgb25Nb3VudGVkLCBvbkJlZm9yZVVubW91bnQsIGdldEN1cnJlbnRJbnN0YW5jZSwgbmV4dFRpY2sgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VIeWRyYXRpb24gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvdXNlLWh5ZHJhdGlvbi91c2UtaHlkcmF0aW9uLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBsaXN0ZW5PcHRzLCBub29wIH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnQvZXZlbnQuanMnXG5cbmNvbnN0IGhhc09ic2VydmVyID0gdHlwZW9mIFJlc2l6ZU9ic2VydmVyICE9PSAndW5kZWZpbmVkJ1xuY29uc3QgcmVzaXplUHJvcHMgPSBoYXNPYnNlcnZlciA9PT0gdHJ1ZVxuICA/IHt9XG4gIDoge1xuICAgICAgc3R5bGU6ICdkaXNwbGF5OmJsb2NrO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDtyaWdodDowO2JvdHRvbTowO2hlaWdodDoxMDAlO3dpZHRoOjEwMCU7b3ZlcmZsb3c6aGlkZGVuO3BvaW50ZXItZXZlbnRzOm5vbmU7ei1pbmRleDotMTsnLFxuICAgICAgdXJsOiAnYWJvdXQ6YmxhbmsnXG4gICAgfVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVJlc2l6ZU9ic2VydmVyJyxcblxuICBwcm9wczoge1xuICAgIGRlYm91bmNlOiB7XG4gICAgICB0eXBlOiBbIFN0cmluZywgTnVtYmVyIF0sXG4gICAgICBkZWZhdWx0OiAxMDBcbiAgICB9XG4gIH0sXG5cbiAgZW1pdHM6IFsgJ3Jlc2l6ZScgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgZW1pdCB9KSB7XG4gICAgaWYgKF9fUVVBU0FSX1NTUl9TRVJWRVJfXykgeyByZXR1cm4gbm9vcCB9XG5cbiAgICBsZXQgdGltZXIgPSBudWxsLCB0YXJnZXRFbCwgc2l6ZSA9IHsgd2lkdGg6IC0xLCBoZWlnaHQ6IC0xIH1cblxuICAgIGZ1bmN0aW9uIHRyaWdnZXIgKGltbWVkaWF0ZWx5KSB7XG4gICAgICBpZiAoaW1tZWRpYXRlbHkgPT09IHRydWUgfHwgcHJvcHMuZGVib3VuY2UgPT09IDAgfHwgcHJvcHMuZGVib3VuY2UgPT09ICcwJykge1xuICAgICAgICBlbWl0RXZlbnQoKVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAodGltZXIgPT09IG51bGwpIHtcbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KGVtaXRFdmVudCwgcHJvcHMuZGVib3VuY2UpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZW1pdEV2ZW50ICgpIHtcbiAgICAgIGlmICh0aW1lciAhPT0gbnVsbCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICAgIHRpbWVyID0gbnVsbFxuICAgICAgfVxuXG4gICAgICBpZiAodGFyZ2V0RWwpIHtcbiAgICAgICAgY29uc3QgeyBvZmZzZXRXaWR0aDogd2lkdGgsIG9mZnNldEhlaWdodDogaGVpZ2h0IH0gPSB0YXJnZXRFbFxuXG4gICAgICAgIGlmICh3aWR0aCAhPT0gc2l6ZS53aWR0aCB8fCBoZWlnaHQgIT09IHNpemUuaGVpZ2h0KSB7XG4gICAgICAgICAgc2l6ZSA9IHsgd2lkdGgsIGhlaWdodCB9XG4gICAgICAgICAgZW1pdCgncmVzaXplJywgc2l6ZSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHsgcHJveHkgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgICAvLyBleHBvc2UgcHVibGljIG1ldGhvZFxuICAgIHByb3h5LnRyaWdnZXIgPSB0cmlnZ2VyXG5cbiAgICBpZiAoaGFzT2JzZXJ2ZXIgPT09IHRydWUpIHtcbiAgICAgIGxldCBvYnNlcnZlclxuXG4gICAgICAvLyBpbml0aWFsaXplIGFzIHNvb24gYXMgcG9zc2libGVcbiAgICAgIGNvbnN0IGluaXQgPSBzdG9wID0+IHtcbiAgICAgICAgdGFyZ2V0RWwgPSBwcm94eS4kZWwucGFyZW50Tm9kZVxuXG4gICAgICAgIGlmICh0YXJnZXRFbCkge1xuICAgICAgICAgIG9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKHRyaWdnZXIpXG4gICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXRFbClcbiAgICAgICAgICBlbWl0RXZlbnQoKVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHN0b3AgIT09IHRydWUpIHtcbiAgICAgICAgICBuZXh0VGljaygoKSA9PiB7IGluaXQodHJ1ZSkgfSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBvbk1vdW50ZWQoKCkgPT4geyBpbml0KCkgfSlcblxuICAgICAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICAgICAgdGltZXIgIT09IG51bGwgJiYgY2xlYXJUaW1lb3V0KHRpbWVyKVxuXG4gICAgICAgIGlmIChvYnNlcnZlciAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgaWYgKG9ic2VydmVyLmRpc2Nvbm5lY3QgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKHRhcmdldEVsKSB7IC8vIEZGIGZvciBBbmRyb2lkXG4gICAgICAgICAgICBvYnNlcnZlci51bm9ic2VydmUodGFyZ2V0RWwpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICByZXR1cm4gbm9vcFxuICAgIH1cbiAgICBlbHNlIHsgLy8gbm8gb2JzZXJ2ZXIsIHNvIGZhbGxiYWNrIHRvIG9sZCBpZnJhbWUgbWV0aG9kXG4gICAgICBjb25zdCB7IGlzSHlkcmF0ZWQgfSA9IHVzZUh5ZHJhdGlvbigpXG5cbiAgICAgIGxldCBjdXJEb2NWaWV3XG5cbiAgICAgIGZ1bmN0aW9uIGNsZWFudXAgKCkge1xuICAgICAgICBpZiAodGltZXIgIT09IG51bGwpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICAgICAgdGltZXIgPSBudWxsXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY3VyRG9jVmlldyAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgLy8gaU9TIGlzIGZ1enp5LCBuZWVkIHRvIGNoZWNrIGl0IGZpcnN0XG4gICAgICAgICAgaWYgKGN1ckRvY1ZpZXcucmVtb3ZlRXZlbnRMaXN0ZW5lciAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICBjdXJEb2NWaWV3LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRyaWdnZXIsIGxpc3Rlbk9wdHMucGFzc2l2ZSlcbiAgICAgICAgICB9XG4gICAgICAgICAgY3VyRG9jVmlldyA9IHZvaWQgMFxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIG9uT2JqTG9hZCAoKSB7XG4gICAgICAgIGNsZWFudXAoKVxuXG4gICAgICAgIGlmICh0YXJnZXRFbD8uY29udGVudERvY3VtZW50KSB7XG4gICAgICAgICAgY3VyRG9jVmlldyA9IHRhcmdldEVsLmNvbnRlbnREb2N1bWVudC5kZWZhdWx0Vmlld1xuICAgICAgICAgIGN1ckRvY1ZpZXcuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdHJpZ2dlciwgbGlzdGVuT3B0cy5wYXNzaXZlKVxuICAgICAgICAgIGVtaXRFdmVudCgpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgb25Nb3VudGVkKCgpID0+IHtcbiAgICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgIHRhcmdldEVsID0gcHJveHkuJGVsXG4gICAgICAgICAgdGFyZ2V0RWwgJiYgb25PYmpMb2FkKClcbiAgICAgICAgfSlcbiAgICAgIH0pXG5cbiAgICAgIG9uQmVmb3JlVW5tb3VudChjbGVhbnVwKVxuXG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBpZiAoaXNIeWRyYXRlZC52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHJldHVybiBoKCdvYmplY3QnLCB7XG4gICAgICAgICAgICBjbGFzczogJ3EtLWF2b2lkLWNhcmQtYm9yZGVyJyxcbiAgICAgICAgICAgIHN0eWxlOiByZXNpemVQcm9wcy5zdHlsZSxcbiAgICAgICAgICAgIHRhYmluZGV4OiAtMSwgLy8gZml4IGZvciBGaXJlZm94XG4gICAgICAgICAgICB0eXBlOiAndGV4dC9odG1sJyxcbiAgICAgICAgICAgIGRhdGE6IHJlc2l6ZVByb3BzLnVybCxcbiAgICAgICAgICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJyxcbiAgICAgICAgICAgIG9uTG9hZDogb25PYmpMb2FkXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIHdhdGNoLCBvbkJlZm9yZVVubW91bnQsIGluamVjdCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBpc1J1bnRpbWVTc3JQcmVIeWRyYXRpb24gfSBmcm9tICcuLi8uLi9wbHVnaW5zL3BsYXRmb3JtL1BsYXRmb3JtLmpzJ1xuXG5pbXBvcnQgUVJlc2l6ZU9ic2VydmVyIGZyb20gJy4uL3Jlc2l6ZS1vYnNlcnZlci9RUmVzaXplT2JzZXJ2ZXIuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhNZXJnZVNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5pbXBvcnQgeyBsYXlvdXRLZXksIGVtcHR5UmVuZGVyRm4gfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnN5bWJvbHMvc3ltYm9scy5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FGb290ZXInLFxuXG4gIHByb3BzOiB7XG4gICAgbW9kZWxWYWx1ZToge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IHRydWVcbiAgICB9LFxuICAgIHJldmVhbDogQm9vbGVhbixcbiAgICBib3JkZXJlZDogQm9vbGVhbixcbiAgICBlbGV2YXRlZDogQm9vbGVhbixcblxuICAgIGhlaWdodEhpbnQ6IHtcbiAgICAgIHR5cGU6IFsgU3RyaW5nLCBOdW1iZXIgXSxcbiAgICAgIGRlZmF1bHQ6IDUwXG4gICAgfVxuICB9LFxuXG4gIGVtaXRzOiBbICdyZXZlYWwnLCAnZm9jdXNpbicgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIGNvbnN0IHsgcHJveHk6IHsgJHEgfSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIGNvbnN0ICRsYXlvdXQgPSBpbmplY3QobGF5b3V0S2V5LCBlbXB0eVJlbmRlckZuKVxuICAgIGlmICgkbGF5b3V0ID09PSBlbXB0eVJlbmRlckZuKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdRRm9vdGVyIG5lZWRzIHRvIGJlIGNoaWxkIG9mIFFMYXlvdXQnKVxuICAgICAgcmV0dXJuIGVtcHR5UmVuZGVyRm5cbiAgICB9XG5cbiAgICBjb25zdCBzaXplID0gcmVmKHBhcnNlSW50KHByb3BzLmhlaWdodEhpbnQsIDEwKSlcbiAgICBjb25zdCByZXZlYWxlZCA9IHJlZih0cnVlKVxuICAgIGNvbnN0IHdpbmRvd0hlaWdodCA9IHJlZihcbiAgICAgIGlzUnVudGltZVNzclByZUh5ZHJhdGlvbi52YWx1ZSA9PT0gdHJ1ZSB8fCAkbGF5b3V0LmlzQ29udGFpbmVyLnZhbHVlID09PSB0cnVlXG4gICAgICAgID8gMFxuICAgICAgICA6IHdpbmRvdy5pbm5lckhlaWdodFxuICAgIClcblxuICAgIGNvbnN0IGZpeGVkID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLnJldmVhbCA9PT0gdHJ1ZVxuICAgICAgfHwgJGxheW91dC52aWV3LnZhbHVlLmluZGV4T2YoJ0YnKSAhPT0gLTFcbiAgICAgIHx8ICgkcS5wbGF0Zm9ybS5pcy5pb3MgJiYgJGxheW91dC5pc0NvbnRhaW5lci52YWx1ZSA9PT0gdHJ1ZSlcbiAgICApXG5cbiAgICBjb25zdCBjb250YWluZXJIZWlnaHQgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICAkbGF5b3V0LmlzQ29udGFpbmVyLnZhbHVlID09PSB0cnVlXG4gICAgICAgID8gJGxheW91dC5jb250YWluZXJIZWlnaHQudmFsdWVcbiAgICAgICAgOiB3aW5kb3dIZWlnaHQudmFsdWVcbiAgICApKVxuXG4gICAgY29uc3Qgb2Zmc2V0ID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgaWYgKHByb3BzLm1vZGVsVmFsdWUgIT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIDBcbiAgICAgIH1cbiAgICAgIGlmIChmaXhlZC52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gcmV2ZWFsZWQudmFsdWUgPT09IHRydWUgPyBzaXplLnZhbHVlIDogMFxuICAgICAgfVxuICAgICAgY29uc3Qgb2Zmc2V0ID0gJGxheW91dC5zY3JvbGwudmFsdWUucG9zaXRpb24gKyBjb250YWluZXJIZWlnaHQudmFsdWUgKyBzaXplLnZhbHVlIC0gJGxheW91dC5oZWlnaHQudmFsdWVcbiAgICAgIHJldHVybiBvZmZzZXQgPiAwID8gb2Zmc2V0IDogMFxuICAgIH0pXG5cbiAgICBjb25zdCBoaWRkZW4gPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMubW9kZWxWYWx1ZSAhPT0gdHJ1ZSB8fCAoZml4ZWQudmFsdWUgPT09IHRydWUgJiYgcmV2ZWFsZWQudmFsdWUgIT09IHRydWUpXG4gICAgKVxuXG4gICAgY29uc3QgcmV2ZWFsT25Gb2N1cyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5tb2RlbFZhbHVlID09PSB0cnVlICYmIGhpZGRlbi52YWx1ZSA9PT0gdHJ1ZSAmJiBwcm9wcy5yZXZlYWwgPT09IHRydWVcbiAgICApXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLWZvb3RlciBxLWxheW91dF9fc2VjdGlvbi0tbWFyZ2luYWwgJ1xuICAgICAgKyAoZml4ZWQudmFsdWUgPT09IHRydWUgPyAnZml4ZWQnIDogJ2Fic29sdXRlJykgKyAnLWJvdHRvbSdcbiAgICAgICsgKHByb3BzLmJvcmRlcmVkID09PSB0cnVlID8gJyBxLWZvb3Rlci0tYm9yZGVyZWQnIDogJycpXG4gICAgICArIChoaWRkZW4udmFsdWUgPT09IHRydWUgPyAnIHEtZm9vdGVyLS1oaWRkZW4nIDogJycpXG4gICAgICArIChcbiAgICAgICAgcHJvcHMubW9kZWxWYWx1ZSAhPT0gdHJ1ZVxuICAgICAgICAgID8gJyBxLWxheW91dC0tcHJldmVudC1mb2N1cycgKyAoZml4ZWQudmFsdWUgIT09IHRydWUgPyAnIGhpZGRlbicgOiAnJylcbiAgICAgICAgICA6ICcnXG4gICAgICApXG4gICAgKVxuXG4gICAgY29uc3Qgc3R5bGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdFxuICAgICAgICB2aWV3ID0gJGxheW91dC5yb3dzLnZhbHVlLmJvdHRvbSxcbiAgICAgICAgY3NzID0ge31cblxuICAgICAgaWYgKHZpZXdbIDAgXSA9PT0gJ2wnICYmICRsYXlvdXQubGVmdC5zcGFjZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjc3NbICRxLmxhbmcucnRsID09PSB0cnVlID8gJ3JpZ2h0JyA6ICdsZWZ0JyBdID0gYCR7ICRsYXlvdXQubGVmdC5zaXplIH1weGBcbiAgICAgIH1cbiAgICAgIGlmICh2aWV3WyAyIF0gPT09ICdyJyAmJiAkbGF5b3V0LnJpZ2h0LnNwYWNlID09PSB0cnVlKSB7XG4gICAgICAgIGNzc1sgJHEubGFuZy5ydGwgPT09IHRydWUgPyAnbGVmdCcgOiAncmlnaHQnIF0gPSBgJHsgJGxheW91dC5yaWdodC5zaXplIH1weGBcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNzc1xuICAgIH0pXG5cbiAgICBmdW5jdGlvbiB1cGRhdGVMYXlvdXQgKHByb3AsIHZhbCkge1xuICAgICAgJGxheW91dC51cGRhdGUoJ2Zvb3RlcicsIHByb3AsIHZhbClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVMb2NhbCAocHJvcCwgdmFsKSB7XG4gICAgICBpZiAocHJvcC52YWx1ZSAhPT0gdmFsKSB7XG4gICAgICAgIHByb3AudmFsdWUgPSB2YWxcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblJlc2l6ZSAoeyBoZWlnaHQgfSkge1xuICAgICAgdXBkYXRlTG9jYWwoc2l6ZSwgaGVpZ2h0KVxuICAgICAgdXBkYXRlTGF5b3V0KCdzaXplJywgaGVpZ2h0KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVJldmVhbGVkICgpIHtcbiAgICAgIGlmIChwcm9wcy5yZXZlYWwgIT09IHRydWUpIHJldHVyblxuXG4gICAgICBjb25zdCB7IGRpcmVjdGlvbiwgcG9zaXRpb24sIGluZmxlY3Rpb25Qb2ludCB9ID0gJGxheW91dC5zY3JvbGwudmFsdWVcblxuICAgICAgdXBkYXRlTG9jYWwocmV2ZWFsZWQsIChcbiAgICAgICAgZGlyZWN0aW9uID09PSAndXAnXG4gICAgICAgIHx8IHBvc2l0aW9uIC0gaW5mbGVjdGlvblBvaW50IDwgMTAwXG4gICAgICAgIHx8ICRsYXlvdXQuaGVpZ2h0LnZhbHVlIC0gY29udGFpbmVySGVpZ2h0LnZhbHVlIC0gcG9zaXRpb24gLSBzaXplLnZhbHVlIDwgMzAwXG4gICAgICApKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRm9jdXNpbiAoZXZ0KSB7XG4gICAgICBpZiAocmV2ZWFsT25Gb2N1cy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICB1cGRhdGVMb2NhbChyZXZlYWxlZCwgdHJ1ZSlcbiAgICAgIH1cblxuICAgICAgZW1pdCgnZm9jdXNpbicsIGV2dClcbiAgICB9XG5cbiAgICB3YXRjaCgoKSA9PiBwcm9wcy5tb2RlbFZhbHVlLCB2YWwgPT4ge1xuICAgICAgdXBkYXRlTGF5b3V0KCdzcGFjZScsIHZhbClcbiAgICAgIHVwZGF0ZUxvY2FsKHJldmVhbGVkLCB0cnVlKVxuICAgICAgJGxheW91dC5hbmltYXRlKClcbiAgICB9KVxuXG4gICAgd2F0Y2gob2Zmc2V0LCB2YWwgPT4ge1xuICAgICAgdXBkYXRlTGF5b3V0KCdvZmZzZXQnLCB2YWwpXG4gICAgfSlcblxuICAgIHdhdGNoKCgpID0+IHByb3BzLnJldmVhbCwgdmFsID0+IHtcbiAgICAgIHZhbCA9PT0gZmFsc2UgJiYgdXBkYXRlTG9jYWwocmV2ZWFsZWQsIHByb3BzLm1vZGVsVmFsdWUpXG4gICAgfSlcblxuICAgIHdhdGNoKHJldmVhbGVkLCB2YWwgPT4ge1xuICAgICAgJGxheW91dC5hbmltYXRlKClcbiAgICAgIGVtaXQoJ3JldmVhbCcsIHZhbClcbiAgICB9KVxuXG4gICAgd2F0Y2goWyBzaXplLCAkbGF5b3V0LnNjcm9sbCwgJGxheW91dC5oZWlnaHQgXSwgdXBkYXRlUmV2ZWFsZWQpXG5cbiAgICB3YXRjaCgoKSA9PiAkcS5zY3JlZW4uaGVpZ2h0LCB2YWwgPT4ge1xuICAgICAgJGxheW91dC5pc0NvbnRhaW5lci52YWx1ZSAhPT0gdHJ1ZSAmJiB1cGRhdGVMb2NhbCh3aW5kb3dIZWlnaHQsIHZhbClcbiAgICB9KVxuXG4gICAgY29uc3QgaW5zdGFuY2UgPSB7fVxuXG4gICAgJGxheW91dC5pbnN0YW5jZXMuZm9vdGVyID0gaW5zdGFuY2VcbiAgICBwcm9wcy5tb2RlbFZhbHVlID09PSB0cnVlICYmIHVwZGF0ZUxheW91dCgnc2l6ZScsIHNpemUudmFsdWUpXG4gICAgdXBkYXRlTGF5b3V0KCdzcGFjZScsIHByb3BzLm1vZGVsVmFsdWUpXG4gICAgdXBkYXRlTGF5b3V0KCdvZmZzZXQnLCBvZmZzZXQudmFsdWUpXG5cbiAgICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgICAgaWYgKCRsYXlvdXQuaW5zdGFuY2VzLmZvb3RlciA9PT0gaW5zdGFuY2UpIHtcbiAgICAgICAgJGxheW91dC5pbnN0YW5jZXMuZm9vdGVyID0gdm9pZCAwXG4gICAgICAgIHVwZGF0ZUxheW91dCgnc2l6ZScsIDApXG4gICAgICAgIHVwZGF0ZUxheW91dCgnb2Zmc2V0JywgMClcbiAgICAgICAgdXBkYXRlTGF5b3V0KCdzcGFjZScsIGZhbHNlKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY29uc3QgY2hpbGQgPSBoTWVyZ2VTbG90KHNsb3RzLmRlZmF1bHQsIFtcbiAgICAgICAgaChRUmVzaXplT2JzZXJ2ZXIsIHtcbiAgICAgICAgICBkZWJvdW5jZTogMCxcbiAgICAgICAgICBvblJlc2l6ZVxuICAgICAgICB9KVxuICAgICAgXSlcblxuICAgICAgcHJvcHMuZWxldmF0ZWQgPT09IHRydWUgJiYgY2hpbGQucHVzaChcbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS1sYXlvdXRfX3NoYWRvdyBhYnNvbHV0ZS1mdWxsIG92ZXJmbG93LWhpZGRlbiBuby1wb2ludGVyLWV2ZW50cydcbiAgICAgICAgfSlcbiAgICAgIClcblxuICAgICAgcmV0dXJuIGgoJ2Zvb3RlcicsIHtcbiAgICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUsXG4gICAgICAgIHN0eWxlOiBzdHlsZS52YWx1ZSxcbiAgICAgICAgb25Gb2N1c2luXG4gICAgICB9LCBjaGlsZClcbiAgICB9XG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoLCBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRSXRlbUxhYmVsJyxcblxuICBwcm9wczoge1xuICAgIG92ZXJsaW5lOiBCb29sZWFuLFxuICAgIGNhcHRpb246IEJvb2xlYW4sXG4gICAgaGVhZGVyOiBCb29sZWFuLFxuICAgIGxpbmVzOiBbIE51bWJlciwgU3RyaW5nIF1cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IHBhcnNlZExpbmVzID0gY29tcHV0ZWQoKCkgPT4gcGFyc2VJbnQocHJvcHMubGluZXMsIDEwKSlcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtaXRlbV9fbGFiZWwnXG4gICAgICArIChwcm9wcy5vdmVybGluZSA9PT0gdHJ1ZSA/ICcgcS1pdGVtX19sYWJlbC0tb3ZlcmxpbmUgdGV4dC1vdmVybGluZScgOiAnJylcbiAgICAgICsgKHByb3BzLmNhcHRpb24gPT09IHRydWUgPyAnIHEtaXRlbV9fbGFiZWwtLWNhcHRpb24gdGV4dC1jYXB0aW9uJyA6ICcnKVxuICAgICAgKyAocHJvcHMuaGVhZGVyID09PSB0cnVlID8gJyBxLWl0ZW1fX2xhYmVsLS1oZWFkZXInIDogJycpXG4gICAgICArIChwYXJzZWRMaW5lcy52YWx1ZSA9PT0gMSA/ICcgZWxsaXBzaXMnIDogJycpXG4gICAgKVxuXG4gICAgY29uc3Qgc3R5bGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICByZXR1cm4gcHJvcHMubGluZXMgIT09IHZvaWQgMCAmJiBwYXJzZWRMaW5lcy52YWx1ZSA+IDFcbiAgICAgICAgPyB7XG4gICAgICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICAgICAgICBkaXNwbGF5OiAnLXdlYmtpdC1ib3gnLFxuICAgICAgICAgICAgJy13ZWJraXQtYm94LW9yaWVudCc6ICd2ZXJ0aWNhbCcsXG4gICAgICAgICAgICAnLXdlYmtpdC1saW5lLWNsYW1wJzogcGFyc2VkTGluZXMudmFsdWVcbiAgICAgICAgICB9XG4gICAgICAgIDogbnVsbFxuICAgIH0pXG5cbiAgICByZXR1cm4gKCkgPT4gaCgnZGl2Jywge1xuICAgICAgc3R5bGU6IHN0eWxlLnZhbHVlLFxuICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWVcbiAgICB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIGNvbXB1dGVkLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB1c2VEYXJrLCB7IHVzZURhcmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLWRhcmsvdXNlLWRhcmsuanMnXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcblxuY29uc3Qgcm9sZUF0dHJFeGNlcHRpb25zID0gWyAndWwnLCAnb2wnIF1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FMaXN0JyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZURhcmtQcm9wcyxcblxuICAgIGJvcmRlcmVkOiBCb29sZWFuLFxuICAgIGRlbnNlOiBCb29sZWFuLFxuICAgIHNlcGFyYXRvcjogQm9vbGVhbixcbiAgICBwYWRkaW5nOiBCb29sZWFuLFxuXG4gICAgdGFnOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnZGl2J1xuICAgIH1cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCBpc0RhcmsgPSB1c2VEYXJrKHByb3BzLCB2bS5wcm94eS4kcSlcblxuICAgIGNvbnN0IHJvbGUgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICByb2xlQXR0ckV4Y2VwdGlvbnMuaW5jbHVkZXMocHJvcHMudGFnKSA/IG51bGwgOiAnbGlzdCcpXG4gICAgKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1saXN0J1xuICAgICAgKyAocHJvcHMuYm9yZGVyZWQgPT09IHRydWUgPyAnIHEtbGlzdC0tYm9yZGVyZWQnIDogJycpXG4gICAgICArIChwcm9wcy5kZW5zZSA9PT0gdHJ1ZSA/ICcgcS1saXN0LS1kZW5zZScgOiAnJylcbiAgICAgICsgKHByb3BzLnNlcGFyYXRvciA9PT0gdHJ1ZSA/ICcgcS1saXN0LS1zZXBhcmF0b3InIDogJycpXG4gICAgICArIChpc0RhcmsudmFsdWUgPT09IHRydWUgPyAnIHEtbGlzdC0tZGFyaycgOiAnJylcbiAgICAgICsgKHByb3BzLnBhZGRpbmcgPT09IHRydWUgPyAnIHEtbGlzdC0tcGFkZGluZycgOiAnJylcbiAgICApXG5cbiAgICByZXR1cm4gKCkgPT4gaChwcm9wcy50YWcsIHsgY2xhc3M6IGNsYXNzZXMudmFsdWUsIHJvbGU6IHJvbGUudmFsdWUgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBvbkJlZm9yZVVubW91bnQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBIaXN0b3J5IGZyb20gJy4uLy4uL3BsdWdpbnMvcHJpdmF0ZS5oaXN0b3J5L0hpc3RvcnkuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzaG93aW5nLCBoaWRlLCBoaWRlT25Sb3V0ZUNoYW5nZSkge1xuICBsZXQgaGlzdG9yeUVudHJ5XG5cbiAgZnVuY3Rpb24gcmVtb3ZlRnJvbUhpc3RvcnkgKCkge1xuICAgIGlmIChoaXN0b3J5RW50cnkgIT09IHZvaWQgMCkge1xuICAgICAgSGlzdG9yeS5yZW1vdmUoaGlzdG9yeUVudHJ5KVxuICAgICAgaGlzdG9yeUVudHJ5ID0gdm9pZCAwXG4gICAgfVxuICB9XG5cbiAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICBzaG93aW5nLnZhbHVlID09PSB0cnVlICYmIHJlbW92ZUZyb21IaXN0b3J5KClcbiAgfSlcblxuICByZXR1cm4ge1xuICAgIHJlbW92ZUZyb21IaXN0b3J5LFxuXG4gICAgYWRkVG9IaXN0b3J5ICgpIHtcbiAgICAgIGhpc3RvcnlFbnRyeSA9IHtcbiAgICAgICAgY29uZGl0aW9uOiAoKSA9PiBoaWRlT25Sb3V0ZUNoYW5nZS52YWx1ZSA9PT0gdHJ1ZSxcbiAgICAgICAgaGFuZGxlcjogaGlkZVxuICAgICAgfVxuXG4gICAgICBIaXN0b3J5LmFkZChoaXN0b3J5RW50cnkpXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyB3YXRjaCwgbmV4dFRpY2ssIG9uTW91bnRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyB2bUhhc1JvdXRlciB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUudm0vdm0uanMnXG5cbmV4cG9ydCBjb25zdCB1c2VNb2RlbFRvZ2dsZVByb3BzID0ge1xuICBtb2RlbFZhbHVlOiB7XG4gICAgdHlwZTogQm9vbGVhbixcbiAgICBkZWZhdWx0OiBudWxsXG4gIH0sXG5cbiAgJ29uVXBkYXRlOm1vZGVsVmFsdWUnOiBbIEZ1bmN0aW9uLCBBcnJheSBdXG59XG5cbmV4cG9ydCBjb25zdCB1c2VNb2RlbFRvZ2dsZUVtaXRzID0gW1xuICAnYmVmb3JlU2hvdycsICdzaG93JywgJ2JlZm9yZUhpZGUnLCAnaGlkZSdcbl1cblxuLy8gaGFuZGxlU2hvdy9oYW5kbGVIaWRlIC0+IHJlbW92ZVRpY2soKSwgc2VsZiAoJiBlbWl0IHNob3cpXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh7XG4gIHNob3dpbmcsXG4gIGNhblNob3csIC8vIG9wdGlvbmFsXG4gIGhpZGVPblJvdXRlQ2hhbmdlLCAvLyBvcHRpb25hbFxuICBoYW5kbGVTaG93LCAvLyBvcHRpb25hbFxuICBoYW5kbGVIaWRlLCAvLyBvcHRpb25hbFxuICBwcm9jZXNzT25Nb3VudCAvLyBvcHRpb25hbFxufSkge1xuICBjb25zdCB2bSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gIGNvbnN0IHsgcHJvcHMsIGVtaXQsIHByb3h5IH0gPSB2bVxuXG4gIGxldCBwYXlsb2FkXG5cbiAgZnVuY3Rpb24gdG9nZ2xlIChldnQpIHtcbiAgICBpZiAoc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgaGlkZShldnQpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgc2hvdyhldnQpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2hvdyAoZXZ0KSB7XG4gICAgaWYgKFxuICAgICAgKHByb3BzLmRpc2FibGUgPT09IHRydWUpXG4gICAgICB8fCAoZXZ0Py5xQW5jaG9ySGFuZGxlZCA9PT0gdHJ1ZSlcbiAgICAgIHx8IChjYW5TaG93ICE9PSB2b2lkIDAgJiYgY2FuU2hvdyhldnQpICE9PSB0cnVlKVxuICAgICkgcmV0dXJuXG5cbiAgICBjb25zdCBsaXN0ZW5lciA9IHByb3BzWyAnb25VcGRhdGU6bW9kZWxWYWx1ZScgXSAhPT0gdm9pZCAwXG5cbiAgICBpZiAobGlzdGVuZXIgPT09IHRydWUgJiYgX19RVUFTQVJfU1NSX1NFUlZFUl9fICE9PSB0cnVlKSB7XG4gICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIHRydWUpXG4gICAgICBwYXlsb2FkID0gZXZ0XG4gICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgIGlmIChwYXlsb2FkID09PSBldnQpIHtcbiAgICAgICAgICBwYXlsb2FkID0gdm9pZCAwXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgaWYgKHByb3BzLm1vZGVsVmFsdWUgPT09IG51bGwgfHwgbGlzdGVuZXIgPT09IGZhbHNlIHx8IF9fUVVBU0FSX1NTUl9TRVJWRVJfXykge1xuICAgICAgcHJvY2Vzc1Nob3coZXZ0KVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHByb2Nlc3NTaG93IChldnQpIHtcbiAgICBpZiAoc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSkgcmV0dXJuXG5cbiAgICBzaG93aW5nLnZhbHVlID0gdHJ1ZVxuXG4gICAgZW1pdCgnYmVmb3JlU2hvdycsIGV2dClcblxuICAgIGlmIChoYW5kbGVTaG93ICE9PSB2b2lkIDApIHtcbiAgICAgIGhhbmRsZVNob3coZXZ0KVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGVtaXQoJ3Nob3cnLCBldnQpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaGlkZSAoZXZ0KSB7XG4gICAgaWYgKF9fUVVBU0FSX1NTUl9TRVJWRVJfXyB8fCBwcm9wcy5kaXNhYmxlID09PSB0cnVlKSByZXR1cm5cblxuICAgIGNvbnN0IGxpc3RlbmVyID0gcHJvcHNbICdvblVwZGF0ZTptb2RlbFZhbHVlJyBdICE9PSB2b2lkIDBcblxuICAgIGlmIChsaXN0ZW5lciA9PT0gdHJ1ZSAmJiBfX1FVQVNBUl9TU1JfU0VSVkVSX18gIT09IHRydWUpIHtcbiAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgZmFsc2UpXG4gICAgICBwYXlsb2FkID0gZXZ0XG4gICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgIGlmIChwYXlsb2FkID09PSBldnQpIHtcbiAgICAgICAgICBwYXlsb2FkID0gdm9pZCAwXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgaWYgKHByb3BzLm1vZGVsVmFsdWUgPT09IG51bGwgfHwgbGlzdGVuZXIgPT09IGZhbHNlIHx8IF9fUVVBU0FSX1NTUl9TRVJWRVJfXykge1xuICAgICAgcHJvY2Vzc0hpZGUoZXZ0KVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHByb2Nlc3NIaWRlIChldnQpIHtcbiAgICBpZiAoc2hvd2luZy52YWx1ZSA9PT0gZmFsc2UpIHJldHVyblxuXG4gICAgc2hvd2luZy52YWx1ZSA9IGZhbHNlXG5cbiAgICBlbWl0KCdiZWZvcmVIaWRlJywgZXZ0KVxuXG4gICAgaWYgKGhhbmRsZUhpZGUgIT09IHZvaWQgMCkge1xuICAgICAgaGFuZGxlSGlkZShldnQpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZW1pdCgnaGlkZScsIGV2dClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwcm9jZXNzTW9kZWxDaGFuZ2UgKHZhbCkge1xuICAgIGlmIChwcm9wcy5kaXNhYmxlID09PSB0cnVlICYmIHZhbCA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKHByb3BzWyAnb25VcGRhdGU6bW9kZWxWYWx1ZScgXSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgZmFsc2UpXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKCh2YWwgPT09IHRydWUpICE9PSBzaG93aW5nLnZhbHVlKSB7XG4gICAgICBjb25zdCBmbiA9IHZhbCA9PT0gdHJ1ZSA/IHByb2Nlc3NTaG93IDogcHJvY2Vzc0hpZGVcbiAgICAgIGZuKHBheWxvYWQpXG4gICAgfVxuICB9XG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMubW9kZWxWYWx1ZSwgcHJvY2Vzc01vZGVsQ2hhbmdlKVxuXG4gIGlmIChoaWRlT25Sb3V0ZUNoYW5nZSAhPT0gdm9pZCAwICYmIHZtSGFzUm91dGVyKHZtKSA9PT0gdHJ1ZSkge1xuICAgIHdhdGNoKCgpID0+IHByb3h5LiRyb3V0ZS5mdWxsUGF0aCwgKCkgPT4ge1xuICAgICAgaWYgKGhpZGVPblJvdXRlQ2hhbmdlLnZhbHVlID09PSB0cnVlICYmIHNob3dpbmcudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgaGlkZSgpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHByb2Nlc3NPbk1vdW50ID09PSB0cnVlICYmIG9uTW91bnRlZCgoKSA9PiB7XG4gICAgcHJvY2Vzc01vZGVsQ2hhbmdlKHByb3BzLm1vZGVsVmFsdWUpXG4gIH0pXG5cbiAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gIGNvbnN0IHB1YmxpY01ldGhvZHMgPSB7IHNob3csIGhpZGUsIHRvZ2dsZSB9XG4gIE9iamVjdC5hc3NpZ24ocHJveHksIHB1YmxpY01ldGhvZHMpXG5cbiAgcmV0dXJuIHB1YmxpY01ldGhvZHNcbn1cbiIsImltcG9ydCB7IGNzcywgZ2V0RWxlbWVudCB9IGZyb20gJy4uL2RvbS9kb20uanMnXG5cbmV4cG9ydCBjb25zdCBzY3JvbGxUYXJnZXRQcm9wID0gX19RVUFTQVJfU1NSX1NFUlZFUl9fXG4gID8ge30gLyogU1NSIGRvZXMgbm90IGtub3cgYWJvdXQgRWxlbWVudCAqL1xuICA6IFsgRWxlbWVudCwgU3RyaW5nIF1cblxuY29uc3Qgc2Nyb2xsVGFyZ2V0cyA9IF9fUVVBU0FSX1NTUl9TRVJWRVJfX1xuICA/IFtdXG4gIDogWyBudWxsLCBkb2N1bWVudCwgZG9jdW1lbnQuYm9keSwgZG9jdW1lbnQuc2Nyb2xsaW5nRWxlbWVudCwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IF1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNjcm9sbFRhcmdldCAoZWwsIHRhcmdldEVsKSB7XG4gIGxldCB0YXJnZXQgPSBnZXRFbGVtZW50KHRhcmdldEVsKVxuXG4gIGlmICh0YXJnZXQgPT09IHZvaWQgMCkge1xuICAgIGlmIChlbCA9PT0gdm9pZCAwIHx8IGVsID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gd2luZG93XG4gICAgfVxuXG4gICAgdGFyZ2V0ID0gZWwuY2xvc2VzdCgnLnNjcm9sbCwuc2Nyb2xsLXksLm92ZXJmbG93LWF1dG8nKVxuICB9XG5cbiAgcmV0dXJuIHNjcm9sbFRhcmdldHMuaW5jbHVkZXModGFyZ2V0KVxuICAgID8gd2luZG93XG4gICAgOiB0YXJnZXRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNjcm9sbEhlaWdodCAoZWwpIHtcbiAgcmV0dXJuIChlbCA9PT0gd2luZG93ID8gZG9jdW1lbnQuYm9keSA6IGVsKS5zY3JvbGxIZWlnaHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNjcm9sbFdpZHRoIChlbCkge1xuICByZXR1cm4gKGVsID09PSB3aW5kb3cgPyBkb2N1bWVudC5ib2R5IDogZWwpLnNjcm9sbFdpZHRoXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRWZXJ0aWNhbFNjcm9sbFBvc2l0aW9uIChzY3JvbGxUYXJnZXQpIHtcbiAgcmV0dXJuIHNjcm9sbFRhcmdldCA9PT0gd2luZG93XG4gICAgPyB3aW5kb3cucGFnZVlPZmZzZXQgfHwgd2luZG93LnNjcm9sbFkgfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgfHwgMFxuICAgIDogc2Nyb2xsVGFyZ2V0LnNjcm9sbFRvcFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SG9yaXpvbnRhbFNjcm9sbFBvc2l0aW9uIChzY3JvbGxUYXJnZXQpIHtcbiAgcmV0dXJuIHNjcm9sbFRhcmdldCA9PT0gd2luZG93XG4gICAgPyB3aW5kb3cucGFnZVhPZmZzZXQgfHwgd2luZG93LnNjcm9sbFggfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0IHx8IDBcbiAgICA6IHNjcm9sbFRhcmdldC5zY3JvbGxMZWZ0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhbmltVmVydGljYWxTY3JvbGxUbyAoZWwsIHRvLCBkdXJhdGlvbiA9IDAgLyogLCBwcmV2VGltZSAqLykge1xuICBjb25zdCBwcmV2VGltZSA9IGFyZ3VtZW50c1sgMyBdID09PSB2b2lkIDAgPyBwZXJmb3JtYW5jZS5ub3coKSA6IGFyZ3VtZW50c1sgMyBdXG4gIGNvbnN0IHBvcyA9IGdldFZlcnRpY2FsU2Nyb2xsUG9zaXRpb24oZWwpXG5cbiAgaWYgKGR1cmF0aW9uIDw9IDApIHtcbiAgICBpZiAocG9zICE9PSB0bykge1xuICAgICAgc2V0U2Nyb2xsKGVsLCB0bylcbiAgICB9XG4gICAgcmV0dXJuXG4gIH1cblxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobm93VGltZSA9PiB7XG4gICAgY29uc3QgZnJhbWVUaW1lID0gbm93VGltZSAtIHByZXZUaW1lXG4gICAgY29uc3QgbmV3UG9zID0gcG9zICsgKHRvIC0gcG9zKSAvIE1hdGgubWF4KGZyYW1lVGltZSwgZHVyYXRpb24pICogZnJhbWVUaW1lXG4gICAgc2V0U2Nyb2xsKGVsLCBuZXdQb3MpXG4gICAgaWYgKG5ld1BvcyAhPT0gdG8pIHtcbiAgICAgIGFuaW1WZXJ0aWNhbFNjcm9sbFRvKGVsLCB0bywgZHVyYXRpb24gLSBmcmFtZVRpbWUsIG5vd1RpbWUpXG4gICAgfVxuICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYW5pbUhvcml6b250YWxTY3JvbGxUbyAoZWwsIHRvLCBkdXJhdGlvbiA9IDAgLyogLCBwcmV2VGltZSAqLykge1xuICBjb25zdCBwcmV2VGltZSA9IGFyZ3VtZW50c1sgMyBdID09PSB2b2lkIDAgPyBwZXJmb3JtYW5jZS5ub3coKSA6IGFyZ3VtZW50c1sgMyBdXG4gIGNvbnN0IHBvcyA9IGdldEhvcml6b250YWxTY3JvbGxQb3NpdGlvbihlbClcblxuICBpZiAoZHVyYXRpb24gPD0gMCkge1xuICAgIGlmIChwb3MgIT09IHRvKSB7XG4gICAgICBzZXRIb3Jpem9udGFsU2Nyb2xsKGVsLCB0bylcbiAgICB9XG4gICAgcmV0dXJuXG4gIH1cblxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobm93VGltZSA9PiB7XG4gICAgY29uc3QgZnJhbWVUaW1lID0gbm93VGltZSAtIHByZXZUaW1lXG4gICAgY29uc3QgbmV3UG9zID0gcG9zICsgKHRvIC0gcG9zKSAvIE1hdGgubWF4KGZyYW1lVGltZSwgZHVyYXRpb24pICogZnJhbWVUaW1lXG4gICAgc2V0SG9yaXpvbnRhbFNjcm9sbChlbCwgbmV3UG9zKVxuICAgIGlmIChuZXdQb3MgIT09IHRvKSB7XG4gICAgICBhbmltSG9yaXpvbnRhbFNjcm9sbFRvKGVsLCB0bywgZHVyYXRpb24gLSBmcmFtZVRpbWUsIG5vd1RpbWUpXG4gICAgfVxuICB9KVxufVxuXG5mdW5jdGlvbiBzZXRTY3JvbGwgKHNjcm9sbFRhcmdldCwgb2Zmc2V0KSB7XG4gIGlmIChzY3JvbGxUYXJnZXQgPT09IHdpbmRvdykge1xuICAgIHdpbmRvdy5zY3JvbGxUbyh3aW5kb3cucGFnZVhPZmZzZXQgfHwgd2luZG93LnNjcm9sbFggfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0IHx8IDAsIG9mZnNldClcbiAgICByZXR1cm5cbiAgfVxuICBzY3JvbGxUYXJnZXQuc2Nyb2xsVG9wID0gb2Zmc2V0XG59XG5cbmZ1bmN0aW9uIHNldEhvcml6b250YWxTY3JvbGwgKHNjcm9sbFRhcmdldCwgb2Zmc2V0KSB7XG4gIGlmIChzY3JvbGxUYXJnZXQgPT09IHdpbmRvdykge1xuICAgIHdpbmRvdy5zY3JvbGxUbyhvZmZzZXQsIHdpbmRvdy5wYWdlWU9mZnNldCB8fCB3aW5kb3cuc2Nyb2xsWSB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCB8fCAwKVxuICAgIHJldHVyblxuICB9XG4gIHNjcm9sbFRhcmdldC5zY3JvbGxMZWZ0ID0gb2Zmc2V0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRWZXJ0aWNhbFNjcm9sbFBvc2l0aW9uIChzY3JvbGxUYXJnZXQsIG9mZnNldCwgZHVyYXRpb24pIHtcbiAgaWYgKGR1cmF0aW9uKSB7XG4gICAgYW5pbVZlcnRpY2FsU2Nyb2xsVG8oc2Nyb2xsVGFyZ2V0LCBvZmZzZXQsIGR1cmF0aW9uKVxuICAgIHJldHVyblxuICB9XG4gIHNldFNjcm9sbChzY3JvbGxUYXJnZXQsIG9mZnNldClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEhvcml6b250YWxTY3JvbGxQb3NpdGlvbiAoc2Nyb2xsVGFyZ2V0LCBvZmZzZXQsIGR1cmF0aW9uKSB7XG4gIGlmIChkdXJhdGlvbikge1xuICAgIGFuaW1Ib3Jpem9udGFsU2Nyb2xsVG8oc2Nyb2xsVGFyZ2V0LCBvZmZzZXQsIGR1cmF0aW9uKVxuICAgIHJldHVyblxuICB9XG4gIHNldEhvcml6b250YWxTY3JvbGwoc2Nyb2xsVGFyZ2V0LCBvZmZzZXQpXG59XG5cbmxldCBzaXplXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2Nyb2xsYmFyV2lkdGggKCkge1xuICBpZiAoc2l6ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHNpemVcbiAgfVxuXG4gIGNvbnN0XG4gICAgaW5uZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyksXG4gICAgb3V0ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXG4gIGNzcyhpbm5lciwge1xuICAgIHdpZHRoOiAnMTAwJScsXG4gICAgaGVpZ2h0OiAnMjAwcHgnXG4gIH0pXG4gIGNzcyhvdXRlciwge1xuICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgIHRvcDogJzBweCcsXG4gICAgbGVmdDogJzBweCcsXG4gICAgdmlzaWJpbGl0eTogJ2hpZGRlbicsXG4gICAgd2lkdGg6ICcyMDBweCcsXG4gICAgaGVpZ2h0OiAnMTUwcHgnLFxuICAgIG92ZXJmbG93OiAnaGlkZGVuJ1xuICB9KVxuXG4gIG91dGVyLmFwcGVuZENoaWxkKGlubmVyKVxuXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQob3V0ZXIpXG5cbiAgY29uc3QgdzEgPSBpbm5lci5vZmZzZXRXaWR0aFxuICBvdXRlci5zdHlsZS5vdmVyZmxvdyA9ICdzY3JvbGwnXG4gIGxldCB3MiA9IGlubmVyLm9mZnNldFdpZHRoXG5cbiAgaWYgKHcxID09PSB3Mikge1xuICAgIHcyID0gb3V0ZXIuY2xpZW50V2lkdGhcbiAgfVxuXG4gIG91dGVyLnJlbW92ZSgpXG4gIHNpemUgPSB3MSAtIHcyXG5cbiAgcmV0dXJuIHNpemVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc1Njcm9sbGJhciAoZWwsIG9uWSA9IHRydWUpIHtcbiAgaWYgKCFlbCB8fCBlbC5ub2RlVHlwZSAhPT0gTm9kZS5FTEVNRU5UX05PREUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHJldHVybiBvbllcbiAgICA/IChcbiAgICAgICAgZWwuc2Nyb2xsSGVpZ2h0ID4gZWwuY2xpZW50SGVpZ2h0ICYmIChcbiAgICAgICAgICBlbC5jbGFzc0xpc3QuY29udGFpbnMoJ3Njcm9sbCcpXG4gICAgICAgICAgfHwgZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdvdmVyZmxvdy1hdXRvJylcbiAgICAgICAgICB8fCBbICdhdXRvJywgJ3Njcm9sbCcgXS5pbmNsdWRlcyh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbClbICdvdmVyZmxvdy15JyBdKVxuICAgICAgICApXG4gICAgICApXG4gICAgOiAoXG4gICAgICAgIGVsLnNjcm9sbFdpZHRoID4gZWwuY2xpZW50V2lkdGggJiYgKFxuICAgICAgICAgIGVsLmNsYXNzTGlzdC5jb250YWlucygnc2Nyb2xsJylcbiAgICAgICAgICB8fCBlbC5jbGFzc0xpc3QuY29udGFpbnMoJ292ZXJmbG93LWF1dG8nKVxuICAgICAgICAgIHx8IFsgJ2F1dG8nLCAnc2Nyb2xsJyBdLmluY2x1ZGVzKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKVsgJ292ZXJmbG93LXgnIF0pXG4gICAgICAgIClcbiAgICAgIClcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBnZXRTY3JvbGxUYXJnZXQsXG5cbiAgZ2V0U2Nyb2xsSGVpZ2h0LFxuICBnZXRTY3JvbGxXaWR0aCxcblxuICBnZXRWZXJ0aWNhbFNjcm9sbFBvc2l0aW9uLFxuICBnZXRIb3Jpem9udGFsU2Nyb2xsUG9zaXRpb24sXG5cbiAgYW5pbVZlcnRpY2FsU2Nyb2xsVG8sXG4gIGFuaW1Ib3Jpem9udGFsU2Nyb2xsVG8sXG5cbiAgc2V0VmVydGljYWxTY3JvbGxQb3NpdGlvbixcbiAgc2V0SG9yaXpvbnRhbFNjcm9sbFBvc2l0aW9uLFxuXG4gIGdldFNjcm9sbGJhcldpZHRoLFxuICBoYXNTY3JvbGxiYXJcbn1cbiIsImltcG9ydCB7IGhhc1Njcm9sbGJhciwgZ2V0VmVydGljYWxTY3JvbGxQb3NpdGlvbiwgZ2V0SG9yaXpvbnRhbFNjcm9sbFBvc2l0aW9uIH0gZnJvbSAnLi9zY3JvbGwuanMnXG5pbXBvcnQgeyBnZXRFdmVudFBhdGgsIGxpc3Rlbk9wdHMsIHN0b3BBbmRQcmV2ZW50IH0gZnJvbSAnLi4vZXZlbnQvZXZlbnQuanMnXG5pbXBvcnQgeyBjbGllbnQgfSBmcm9tICcuLi8uLi9wbHVnaW5zL3BsYXRmb3JtL1BsYXRmb3JtLmpzJ1xuXG5sZXRcbiAgcmVnaXN0ZXJlZCA9IDAsXG4gIHNjcm9sbFBvc2l0aW9uWCxcbiAgc2Nyb2xsUG9zaXRpb25ZLFxuICBtYXhTY3JvbGxUb3AsXG4gIHZwUGVuZGluZ1VwZGF0ZSA9IGZhbHNlLFxuICBib2R5TGVmdCxcbiAgYm9keVRvcCxcbiAgaHJlZixcbiAgY2xvc2VUaW1lciA9IG51bGxcblxuZnVuY3Rpb24gb25XaGVlbCAoZSkge1xuICBpZiAoc2hvdWxkUHJldmVudFNjcm9sbChlKSkge1xuICAgIHN0b3BBbmRQcmV2ZW50KGUpXG4gIH1cbn1cblxuZnVuY3Rpb24gc2hvdWxkUHJldmVudFNjcm9sbCAoZSkge1xuICBpZiAoZS50YXJnZXQgPT09IGRvY3VtZW50LmJvZHkgfHwgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdxLWxheW91dF9fYmFja2Ryb3AnKSkge1xuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBjb25zdFxuICAgIHBhdGggPSBnZXRFdmVudFBhdGgoZSksXG4gICAgc2hpZnQgPSBlLnNoaWZ0S2V5ICYmICFlLmRlbHRhWCxcbiAgICBzY3JvbGxZID0gIXNoaWZ0ICYmIE1hdGguYWJzKGUuZGVsdGFYKSA8PSBNYXRoLmFicyhlLmRlbHRhWSksXG4gICAgZGVsdGEgPSBzaGlmdCB8fCBzY3JvbGxZID8gZS5kZWx0YVkgOiBlLmRlbHRhWFxuXG4gIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBwYXRoLmxlbmd0aDsgaW5kZXgrKykge1xuICAgIGNvbnN0IGVsID0gcGF0aFsgaW5kZXggXVxuXG4gICAgaWYgKGhhc1Njcm9sbGJhcihlbCwgc2Nyb2xsWSkpIHtcbiAgICAgIHJldHVybiBzY3JvbGxZXG4gICAgICAgID8gKFxuICAgICAgICAgICAgZGVsdGEgPCAwICYmIGVsLnNjcm9sbFRvcCA9PT0gMFxuICAgICAgICAgICAgICA/IHRydWVcbiAgICAgICAgICAgICAgOiBkZWx0YSA+IDAgJiYgZWwuc2Nyb2xsVG9wICsgZWwuY2xpZW50SGVpZ2h0ID09PSBlbC5zY3JvbGxIZWlnaHRcbiAgICAgICAgICApXG4gICAgICAgIDogKFxuICAgICAgICAgICAgZGVsdGEgPCAwICYmIGVsLnNjcm9sbExlZnQgPT09IDBcbiAgICAgICAgICAgICAgPyB0cnVlXG4gICAgICAgICAgICAgIDogZGVsdGEgPiAwICYmIGVsLnNjcm9sbExlZnQgKyBlbC5jbGllbnRXaWR0aCA9PT0gZWwuc2Nyb2xsV2lkdGhcbiAgICAgICAgICApXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWVcbn1cblxuZnVuY3Rpb24gb25BcHBsZVNjcm9sbCAoZSkge1xuICBpZiAoZS50YXJnZXQgPT09IGRvY3VtZW50KSB7XG4gICAgLy8gcmVxdWlyZWQsIG90aGVyd2lzZSBpT1MgYmxvY2tzIGZ1cnRoZXIgc2Nyb2xsaW5nXG4gICAgLy8gdW50aWwgdGhlIG1vYmlsZSBzY3JvbGxiYXIgZGlzc2FwcGVhcnNcbiAgICBkb2N1bWVudC5zY3JvbGxpbmdFbGVtZW50LnNjcm9sbFRvcCA9IGRvY3VtZW50LnNjcm9sbGluZ0VsZW1lbnQuc2Nyb2xsVG9wIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgfVxufVxuXG5mdW5jdGlvbiBvbkFwcGxlUmVzaXplIChldnQpIHtcbiAgaWYgKHZwUGVuZGluZ1VwZGF0ZSA9PT0gdHJ1ZSkgcmV0dXJuXG5cbiAgdnBQZW5kaW5nVXBkYXRlID0gdHJ1ZVxuXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgdnBQZW5kaW5nVXBkYXRlID0gZmFsc2VcblxuICAgIGNvbnN0XG4gICAgICB7IGhlaWdodCB9ID0gZXZ0LnRhcmdldCxcbiAgICAgIHsgY2xpZW50SGVpZ2h0LCBzY3JvbGxUb3AgfSA9IGRvY3VtZW50LnNjcm9sbGluZ0VsZW1lbnRcblxuICAgIGlmIChtYXhTY3JvbGxUb3AgPT09IHZvaWQgMCB8fCBoZWlnaHQgIT09IHdpbmRvdy5pbm5lckhlaWdodCkge1xuICAgICAgbWF4U2Nyb2xsVG9wID0gY2xpZW50SGVpZ2h0IC0gaGVpZ2h0XG4gICAgICBkb2N1bWVudC5zY3JvbGxpbmdFbGVtZW50LnNjcm9sbFRvcCA9IHNjcm9sbFRvcFxuICAgIH1cblxuICAgIGlmIChzY3JvbGxUb3AgPiBtYXhTY3JvbGxUb3ApIHtcbiAgICAgIGRvY3VtZW50LnNjcm9sbGluZ0VsZW1lbnQuc2Nyb2xsVG9wIC09IE1hdGguY2VpbCgoc2Nyb2xsVG9wIC0gbWF4U2Nyb2xsVG9wKSAvIDgpXG4gICAgfVxuICB9KVxufVxuXG5mdW5jdGlvbiBhcHBseSAoYWN0aW9uKSB7XG4gIGNvbnN0XG4gICAgYm9keSA9IGRvY3VtZW50LmJvZHksXG4gICAgaGFzVmlld3BvcnQgPSB3aW5kb3cudmlzdWFsVmlld3BvcnQgIT09IHZvaWQgMFxuXG4gIGlmIChhY3Rpb24gPT09ICdhZGQnKSB7XG4gICAgY29uc3QgeyBvdmVyZmxvd1ksIG92ZXJmbG93WCB9ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoYm9keSlcblxuICAgIHNjcm9sbFBvc2l0aW9uWCA9IGdldEhvcml6b250YWxTY3JvbGxQb3NpdGlvbih3aW5kb3cpXG4gICAgc2Nyb2xsUG9zaXRpb25ZID0gZ2V0VmVydGljYWxTY3JvbGxQb3NpdGlvbih3aW5kb3cpXG4gICAgYm9keUxlZnQgPSBib2R5LnN0eWxlLmxlZnRcbiAgICBib2R5VG9wID0gYm9keS5zdHlsZS50b3BcblxuICAgIGhyZWYgPSB3aW5kb3cubG9jYXRpb24uaHJlZlxuXG4gICAgYm9keS5zdHlsZS5sZWZ0ID0gYC0keyBzY3JvbGxQb3NpdGlvblggfXB4YFxuICAgIGJvZHkuc3R5bGUudG9wID0gYC0keyBzY3JvbGxQb3NpdGlvblkgfXB4YFxuXG4gICAgaWYgKG92ZXJmbG93WCAhPT0gJ2hpZGRlbicgJiYgKG92ZXJmbG93WCA9PT0gJ3Njcm9sbCcgfHwgYm9keS5zY3JvbGxXaWR0aCA+IHdpbmRvdy5pbm5lcldpZHRoKSkge1xuICAgICAgYm9keS5jbGFzc0xpc3QuYWRkKCdxLWJvZHktLWZvcmNlLXNjcm9sbGJhci14JylcbiAgICB9XG4gICAgaWYgKG92ZXJmbG93WSAhPT0gJ2hpZGRlbicgJiYgKG92ZXJmbG93WSA9PT0gJ3Njcm9sbCcgfHwgYm9keS5zY3JvbGxIZWlnaHQgPiB3aW5kb3cuaW5uZXJIZWlnaHQpKSB7XG4gICAgICBib2R5LmNsYXNzTGlzdC5hZGQoJ3EtYm9keS0tZm9yY2Utc2Nyb2xsYmFyLXknKVxuICAgIH1cblxuICAgIGJvZHkuY2xhc3NMaXN0LmFkZCgncS1ib2R5LS1wcmV2ZW50LXNjcm9sbCcpXG4gICAgZG9jdW1lbnQucVNjcm9sbFByZXZlbnRlZCA9IHRydWVcblxuICAgIGlmIChjbGllbnQuaXMuaW9zID09PSB0cnVlKSB7XG4gICAgICBpZiAoaGFzVmlld3BvcnQgPT09IHRydWUpIHtcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIDApXG4gICAgICAgIHdpbmRvdy52aXN1YWxWaWV3cG9ydC5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBvbkFwcGxlUmVzaXplLCBsaXN0ZW5PcHRzLnBhc3NpdmVDYXB0dXJlKVxuICAgICAgICB3aW5kb3cudmlzdWFsVmlld3BvcnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgb25BcHBsZVJlc2l6ZSwgbGlzdGVuT3B0cy5wYXNzaXZlQ2FwdHVyZSlcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIDApXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIG9uQXBwbGVTY3JvbGwsIGxpc3Rlbk9wdHMucGFzc2l2ZUNhcHR1cmUpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKGNsaWVudC5pcy5kZXNrdG9wID09PSB0cnVlICYmIGNsaWVudC5pcy5tYWMgPT09IHRydWUpIHtcbiAgICAvLyByZWYuIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL3dlYi91cGRhdGVzLzIwMTcvMDEvc2Nyb2xsaW5nLWludGVydmVudGlvblxuICAgIHdpbmRvd1sgYCR7IGFjdGlvbiB9RXZlbnRMaXN0ZW5lcmAgXSgnd2hlZWwnLCBvbldoZWVsLCBsaXN0ZW5PcHRzLm5vdFBhc3NpdmUpXG4gIH1cblxuICBpZiAoYWN0aW9uID09PSAncmVtb3ZlJykge1xuICAgIGlmIChjbGllbnQuaXMuaW9zID09PSB0cnVlKSB7XG4gICAgICBpZiAoaGFzVmlld3BvcnQgPT09IHRydWUpIHtcbiAgICAgICAgd2luZG93LnZpc3VhbFZpZXdwb3J0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIG9uQXBwbGVSZXNpemUsIGxpc3Rlbk9wdHMucGFzc2l2ZUNhcHR1cmUpXG4gICAgICAgIHdpbmRvdy52aXN1YWxWaWV3cG9ydC5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBvbkFwcGxlUmVzaXplLCBsaXN0ZW5PcHRzLnBhc3NpdmVDYXB0dXJlKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBvbkFwcGxlU2Nyb2xsLCBsaXN0ZW5PcHRzLnBhc3NpdmVDYXB0dXJlKVxuICAgICAgfVxuICAgIH1cblxuICAgIGJvZHkuY2xhc3NMaXN0LnJlbW92ZSgncS1ib2R5LS1wcmV2ZW50LXNjcm9sbCcpXG4gICAgYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdxLWJvZHktLWZvcmNlLXNjcm9sbGJhci14JylcbiAgICBib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3EtYm9keS0tZm9yY2Utc2Nyb2xsYmFyLXknKVxuXG4gICAgZG9jdW1lbnQucVNjcm9sbFByZXZlbnRlZCA9IGZhbHNlXG5cbiAgICBib2R5LnN0eWxlLmxlZnQgPSBib2R5TGVmdFxuICAgIGJvZHkuc3R5bGUudG9wID0gYm9keVRvcFxuXG4gICAgLy8gc2Nyb2xsIGJhY2sgb25seSBpZiByb3V0ZSBoYXMgbm90IGNoYW5nZWRcbiAgICBpZiAod2luZG93LmxvY2F0aW9uLmhyZWYgPT09IGhyZWYpIHtcbiAgICAgIHdpbmRvdy5zY3JvbGxUbyhzY3JvbGxQb3NpdGlvblgsIHNjcm9sbFBvc2l0aW9uWSlcbiAgICB9XG5cbiAgICBtYXhTY3JvbGxUb3AgPSB2b2lkIDBcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgbGV0IGFjdGlvbiA9ICdhZGQnXG5cbiAgaWYgKHN0YXRlID09PSB0cnVlKSB7XG4gICAgcmVnaXN0ZXJlZCsrXG5cbiAgICBpZiAoY2xvc2VUaW1lciAhPT0gbnVsbCkge1xuICAgICAgY2xlYXJUaW1lb3V0KGNsb3NlVGltZXIpXG4gICAgICBjbG9zZVRpbWVyID0gbnVsbFxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKHJlZ2lzdGVyZWQgPiAxKSByZXR1cm5cbiAgfVxuICBlbHNlIHtcbiAgICBpZiAocmVnaXN0ZXJlZCA9PT0gMCkgcmV0dXJuXG5cbiAgICByZWdpc3RlcmVkLS1cblxuICAgIGlmIChyZWdpc3RlcmVkID4gMCkgcmV0dXJuXG5cbiAgICBhY3Rpb24gPSAncmVtb3ZlJ1xuXG4gICAgaWYgKGNsaWVudC5pcy5pb3MgPT09IHRydWUgJiYgY2xpZW50LmlzLm5hdGl2ZU1vYmlsZSA9PT0gdHJ1ZSkge1xuICAgICAgY2xvc2VUaW1lciAhPT0gbnVsbCAmJiBjbGVhclRpbWVvdXQoY2xvc2VUaW1lcilcbiAgICAgIGNsb3NlVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgYXBwbHkoYWN0aW9uKVxuICAgICAgICBjbG9zZVRpbWVyID0gbnVsbFxuICAgICAgfSwgMTAwKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICB9XG5cbiAgYXBwbHkoYWN0aW9uKVxufVxuIiwiaW1wb3J0IHByZXZlbnRTY3JvbGwgZnJvbSAnLi4vLi4vdXRpbHMvc2Nyb2xsL3ByZXZlbnQtc2Nyb2xsLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIGxldCBjdXJyZW50U3RhdGVcblxuICByZXR1cm4ge1xuICAgIHByZXZlbnRCb2R5U2Nyb2xsIChzdGF0ZSkge1xuICAgICAgaWYgKFxuICAgICAgICBzdGF0ZSAhPT0gY3VycmVudFN0YXRlXG4gICAgICAgICYmIChjdXJyZW50U3RhdGUgIT09IHZvaWQgMCB8fCBzdGF0ZSA9PT0gdHJ1ZSlcbiAgICAgICkge1xuICAgICAgICBjdXJyZW50U3RhdGUgPSBzdGF0ZVxuICAgICAgICBwcmV2ZW50U2Nyb2xsKHN0YXRlKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiY29uc3QgbW9kaWZpZXJzQWxsID0ge1xuICBsZWZ0OiB0cnVlLFxuICByaWdodDogdHJ1ZSxcbiAgdXA6IHRydWUsXG4gIGRvd246IHRydWUsXG4gIGhvcml6b250YWw6IHRydWUsXG4gIHZlcnRpY2FsOiB0cnVlXG59XG5cbmNvbnN0IGRpcmVjdGlvbkxpc3QgPSBPYmplY3Qua2V5cyhtb2RpZmllcnNBbGwpXG5cbm1vZGlmaWVyc0FsbC5hbGwgPSB0cnVlXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNb2RpZmllckRpcmVjdGlvbnMgKG1vZCkge1xuICBjb25zdCBkaXIgPSB7fVxuXG4gIGZvciAoY29uc3QgZGlyZWN0aW9uIG9mIGRpcmVjdGlvbkxpc3QpIHtcbiAgICBpZiAobW9kWyBkaXJlY3Rpb24gXSA9PT0gdHJ1ZSkge1xuICAgICAgZGlyWyBkaXJlY3Rpb24gXSA9IHRydWVcbiAgICB9XG4gIH1cblxuICBpZiAoT2JqZWN0LmtleXMoZGlyKS5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gbW9kaWZpZXJzQWxsXG4gIH1cblxuICBpZiAoZGlyLmhvcml6b250YWwgPT09IHRydWUpIHtcbiAgICBkaXIubGVmdCA9IGRpci5yaWdodCA9IHRydWVcbiAgfVxuICBlbHNlIGlmIChkaXIubGVmdCA9PT0gdHJ1ZSAmJiBkaXIucmlnaHQgPT09IHRydWUpIHtcbiAgICBkaXIuaG9yaXpvbnRhbCA9IHRydWVcbiAgfVxuXG4gIGlmIChkaXIudmVydGljYWwgPT09IHRydWUpIHtcbiAgICBkaXIudXAgPSBkaXIuZG93biA9IHRydWVcbiAgfVxuICBlbHNlIGlmIChkaXIudXAgPT09IHRydWUgJiYgZGlyLmRvd24gPT09IHRydWUpIHtcbiAgICBkaXIudmVydGljYWwgPSB0cnVlXG4gIH1cblxuICBpZiAoZGlyLmhvcml6b250YWwgPT09IHRydWUgJiYgZGlyLnZlcnRpY2FsID09PSB0cnVlKSB7XG4gICAgZGlyLmFsbCA9IHRydWVcbiAgfVxuXG4gIHJldHVybiBkaXJcbn1cblxuLy8gVGhpcyBpcyBlc3BlY2lhbGx5IGltcG9ydGFudCAobm90IHRoZSBtYWluIHJlYXNvbiwgYnV0IGltcG9ydGFudClcbi8vIGZvciBUb3VjaFN3aXBlIGRpcmVjdGl2ZSBydW5uaW5nIG9uIEZpcmVmb3hcbi8vIGJlY2F1c2UgdGV4dCBzZWxlY3Rpb24gb24gc3VjaCBlbGVtZW50cyBjYW5ub3QgYmUgZGV0ZXJtaW5lZFxuLy8gd2l0aG91dCBhZGRpdGlvbmFsIHdvcmsgKG9uIHRvcCBvZiBnZXRTZWxlY3Rpb24oKSBBUEkpXG4vLyBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD04NTY4NlxuY29uc3QgYXZvaWROb2RlTmFtZXNMaXN0ID0gWyAnSU5QVVQnLCAnVEVYVEFSRUEnIF1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3VsZFN0YXJ0IChldnQsIGN0eCkge1xuICByZXR1cm4gY3R4LmV2ZW50ID09PSB2b2lkIDBcbiAgICAmJiBldnQudGFyZ2V0ICE9PSB2b2lkIDBcbiAgICAmJiBldnQudGFyZ2V0LmRyYWdnYWJsZSAhPT0gdHJ1ZVxuICAgICYmIHR5cGVvZiBjdHguaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJ1xuICAgICYmIGF2b2lkTm9kZU5hbWVzTGlzdC5pbmNsdWRlcyhldnQudGFyZ2V0Lm5vZGVOYW1lLnRvVXBwZXJDYXNlKCkpID09PSBmYWxzZVxuICAgICYmIChldnQucUNsb25lZEJ5ID09PSB2b2lkIDAgfHwgZXZ0LnFDbG9uZWRCeS5pbmRleE9mKGN0eC51aWQpID09PSAtMSlcbn1cbiIsImltcG9ydCBQbGF0Zm9ybSBmcm9tICcuLi8uLi9wbHVnaW5zL3BsYXRmb3JtL1BsYXRmb3JtLmpzJ1xuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJTZWxlY3Rpb24gKCkge1xuICBpZiAod2luZG93LmdldFNlbGVjdGlvbiAhPT0gdm9pZCAwKSB7XG4gICAgY29uc3Qgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpXG4gICAgaWYgKHNlbGVjdGlvbi5lbXB0eSAhPT0gdm9pZCAwKSB7XG4gICAgICBzZWxlY3Rpb24uZW1wdHkoKVxuICAgIH1cbiAgICBlbHNlIGlmIChzZWxlY3Rpb24ucmVtb3ZlQWxsUmFuZ2VzICE9PSB2b2lkIDApIHtcbiAgICAgIHNlbGVjdGlvbi5yZW1vdmVBbGxSYW5nZXMoKVxuICAgICAgUGxhdGZvcm0uaXMubW9iaWxlICE9PSB0cnVlICYmIHNlbGVjdGlvbi5hZGRSYW5nZShkb2N1bWVudC5jcmVhdGVSYW5nZSgpKVxuICAgIH1cbiAgfVxuICBlbHNlIGlmIChkb2N1bWVudC5zZWxlY3Rpb24gIT09IHZvaWQgMCkge1xuICAgIGRvY3VtZW50LnNlbGVjdGlvbi5lbXB0eSgpXG4gIH1cbn1cbiIsImltcG9ydCB7IGNsaWVudCB9IGZyb20gJy4uLy4uL3BsdWdpbnMvcGxhdGZvcm0vUGxhdGZvcm0uanMnXG5cbmltcG9ydCB7IGNyZWF0ZURpcmVjdGl2ZSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGdldE1vZGlmaWVyRGlyZWN0aW9ucywgc2hvdWxkU3RhcnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnRvdWNoL3RvdWNoLmpzJ1xuaW1wb3J0IHsgYWRkRXZ0LCBjbGVhbkV2dCwgcG9zaXRpb24sIGxlZnRDbGljaywgcHJldmVudCwgc3RvcCwgc3RvcEFuZFByZXZlbnQsIHByZXZlbnREcmFnZ2FibGUsIG5vb3AgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC9ldmVudC5qcydcbmltcG9ydCB7IGNsZWFyU2VsZWN0aW9uIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5zZWxlY3Rpb24vc2VsZWN0aW9uLmpzJ1xuaW1wb3J0IGdldFNTUlByb3BzIGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUubm9vcC1zc3ItZGlyZWN0aXZlLXRyYW5zZm9ybS9ub29wLXNzci1kaXJlY3RpdmUtdHJhbnNmb3JtLmpzJ1xuXG5mdW5jdGlvbiBnZXRDaGFuZ2VzIChldnQsIGN0eCwgaXNGaW5hbCkge1xuICBjb25zdCBwb3MgPSBwb3NpdGlvbihldnQpXG4gIGxldFxuICAgIGRpcixcbiAgICBkaXN0WCA9IHBvcy5sZWZ0IC0gY3R4LmV2ZW50LngsXG4gICAgZGlzdFkgPSBwb3MudG9wIC0gY3R4LmV2ZW50LnksXG4gICAgYWJzWCA9IE1hdGguYWJzKGRpc3RYKSxcbiAgICBhYnNZID0gTWF0aC5hYnMoZGlzdFkpXG5cbiAgY29uc3QgZGlyZWN0aW9uID0gY3R4LmRpcmVjdGlvblxuXG4gIGlmIChkaXJlY3Rpb24uaG9yaXpvbnRhbCA9PT0gdHJ1ZSAmJiBkaXJlY3Rpb24udmVydGljYWwgIT09IHRydWUpIHtcbiAgICBkaXIgPSBkaXN0WCA8IDAgPyAnbGVmdCcgOiAncmlnaHQnXG4gIH1cbiAgZWxzZSBpZiAoZGlyZWN0aW9uLmhvcml6b250YWwgIT09IHRydWUgJiYgZGlyZWN0aW9uLnZlcnRpY2FsID09PSB0cnVlKSB7XG4gICAgZGlyID0gZGlzdFkgPCAwID8gJ3VwJyA6ICdkb3duJ1xuICB9XG4gIGVsc2UgaWYgKGRpcmVjdGlvbi51cCA9PT0gdHJ1ZSAmJiBkaXN0WSA8IDApIHtcbiAgICBkaXIgPSAndXAnXG4gICAgaWYgKGFic1ggPiBhYnNZKSB7XG4gICAgICBpZiAoZGlyZWN0aW9uLmxlZnQgPT09IHRydWUgJiYgZGlzdFggPCAwKSB7XG4gICAgICAgIGRpciA9ICdsZWZ0J1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoZGlyZWN0aW9uLnJpZ2h0ID09PSB0cnVlICYmIGRpc3RYID4gMCkge1xuICAgICAgICBkaXIgPSAncmlnaHQnXG4gICAgICB9XG4gICAgfVxuICB9XG4gIGVsc2UgaWYgKGRpcmVjdGlvbi5kb3duID09PSB0cnVlICYmIGRpc3RZID4gMCkge1xuICAgIGRpciA9ICdkb3duJ1xuICAgIGlmIChhYnNYID4gYWJzWSkge1xuICAgICAgaWYgKGRpcmVjdGlvbi5sZWZ0ID09PSB0cnVlICYmIGRpc3RYIDwgMCkge1xuICAgICAgICBkaXIgPSAnbGVmdCdcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGRpcmVjdGlvbi5yaWdodCA9PT0gdHJ1ZSAmJiBkaXN0WCA+IDApIHtcbiAgICAgICAgZGlyID0gJ3JpZ2h0J1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBlbHNlIGlmIChkaXJlY3Rpb24ubGVmdCA9PT0gdHJ1ZSAmJiBkaXN0WCA8IDApIHtcbiAgICBkaXIgPSAnbGVmdCdcbiAgICBpZiAoYWJzWCA8IGFic1kpIHtcbiAgICAgIGlmIChkaXJlY3Rpb24udXAgPT09IHRydWUgJiYgZGlzdFkgPCAwKSB7XG4gICAgICAgIGRpciA9ICd1cCdcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGRpcmVjdGlvbi5kb3duID09PSB0cnVlICYmIGRpc3RZID4gMCkge1xuICAgICAgICBkaXIgPSAnZG93bidcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZWxzZSBpZiAoZGlyZWN0aW9uLnJpZ2h0ID09PSB0cnVlICYmIGRpc3RYID4gMCkge1xuICAgIGRpciA9ICdyaWdodCdcbiAgICBpZiAoYWJzWCA8IGFic1kpIHtcbiAgICAgIGlmIChkaXJlY3Rpb24udXAgPT09IHRydWUgJiYgZGlzdFkgPCAwKSB7XG4gICAgICAgIGRpciA9ICd1cCdcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGRpcmVjdGlvbi5kb3duID09PSB0cnVlICYmIGRpc3RZID4gMCkge1xuICAgICAgICBkaXIgPSAnZG93bidcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBsZXQgc3ludGhldGljID0gZmFsc2VcblxuICBpZiAoZGlyID09PSB2b2lkIDAgJiYgaXNGaW5hbCA9PT0gZmFsc2UpIHtcbiAgICBpZiAoY3R4LmV2ZW50LmlzRmlyc3QgPT09IHRydWUgfHwgY3R4LmV2ZW50Lmxhc3REaXIgPT09IHZvaWQgMCkge1xuICAgICAgcmV0dXJuIHt9XG4gICAgfVxuXG4gICAgZGlyID0gY3R4LmV2ZW50Lmxhc3REaXJcbiAgICBzeW50aGV0aWMgPSB0cnVlXG5cbiAgICBpZiAoZGlyID09PSAnbGVmdCcgfHwgZGlyID09PSAncmlnaHQnKSB7XG4gICAgICBwb3MubGVmdCAtPSBkaXN0WFxuICAgICAgYWJzWCA9IDBcbiAgICAgIGRpc3RYID0gMFxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHBvcy50b3AgLT0gZGlzdFlcbiAgICAgIGFic1kgPSAwXG4gICAgICBkaXN0WSA9IDBcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHN5bnRoZXRpYyxcbiAgICBwYXlsb2FkOiB7XG4gICAgICBldnQsXG4gICAgICB0b3VjaDogY3R4LmV2ZW50Lm1vdXNlICE9PSB0cnVlLFxuICAgICAgbW91c2U6IGN0eC5ldmVudC5tb3VzZSA9PT0gdHJ1ZSxcbiAgICAgIHBvc2l0aW9uOiBwb3MsXG4gICAgICBkaXJlY3Rpb246IGRpcixcbiAgICAgIGlzRmlyc3Q6IGN0eC5ldmVudC5pc0ZpcnN0LFxuICAgICAgaXNGaW5hbDogaXNGaW5hbCA9PT0gdHJ1ZSxcbiAgICAgIGR1cmF0aW9uOiBEYXRlLm5vdygpIC0gY3R4LmV2ZW50LnRpbWUsXG4gICAgICBkaXN0YW5jZToge1xuICAgICAgICB4OiBhYnNYLFxuICAgICAgICB5OiBhYnNZXG4gICAgICB9LFxuICAgICAgb2Zmc2V0OiB7XG4gICAgICAgIHg6IGRpc3RYLFxuICAgICAgICB5OiBkaXN0WVxuICAgICAgfSxcbiAgICAgIGRlbHRhOiB7XG4gICAgICAgIHg6IHBvcy5sZWZ0IC0gY3R4LmV2ZW50Lmxhc3RYLFxuICAgICAgICB5OiBwb3MudG9wIC0gY3R4LmV2ZW50Lmxhc3RZXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmxldCB1aWQgPSAwXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZURpcmVjdGl2ZShfX1FVQVNBUl9TU1JfU0VSVkVSX19cbiAgPyB7IG5hbWU6ICd0b3VjaC1wYW4nLCBnZXRTU1JQcm9wcyB9XG4gIDoge1xuICAgICAgbmFtZTogJ3RvdWNoLXBhbicsXG5cbiAgICAgIGJlZm9yZU1vdW50IChlbCwgeyB2YWx1ZSwgbW9kaWZpZXJzIH0pIHtcbiAgICAgICAgLy8gZWFybHkgcmV0dXJuLCB3ZSBkb24ndCBuZWVkIHRvIGRvIGFueXRoaW5nXG4gICAgICAgIGlmIChcbiAgICAgICAgICBtb2RpZmllcnMubW91c2UgIT09IHRydWVcbiAgICAgICAgICAmJiBjbGllbnQuaGFzLnRvdWNoICE9PSB0cnVlXG4gICAgICAgICkgcmV0dXJuXG5cbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlRXZlbnQgKGV2dCwgbW91c2VFdmVudCkge1xuICAgICAgICAgIGlmIChtb2RpZmllcnMubW91c2UgPT09IHRydWUgJiYgbW91c2VFdmVudCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgc3RvcEFuZFByZXZlbnQoZXZ0KVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG1vZGlmaWVycy5zdG9wID09PSB0cnVlICYmIHN0b3AoZXZ0KVxuICAgICAgICAgICAgbW9kaWZpZXJzLnByZXZlbnQgPT09IHRydWUgJiYgcHJldmVudChldnQpXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY3R4ID0ge1xuICAgICAgICAgIHVpZDogJ3F2dHBfJyArICh1aWQrKyksXG4gICAgICAgICAgaGFuZGxlcjogdmFsdWUsXG4gICAgICAgICAgbW9kaWZpZXJzLFxuICAgICAgICAgIGRpcmVjdGlvbjogZ2V0TW9kaWZpZXJEaXJlY3Rpb25zKG1vZGlmaWVycyksXG5cbiAgICAgICAgICBub29wLFxuXG4gICAgICAgICAgbW91c2VTdGFydCAoZXZ0KSB7XG4gICAgICAgICAgICBpZiAoc2hvdWxkU3RhcnQoZXZ0LCBjdHgpICYmIGxlZnRDbGljayhldnQpKSB7XG4gICAgICAgICAgICAgIGFkZEV2dChjdHgsICd0ZW1wJywgW1xuICAgICAgICAgICAgICAgIFsgZG9jdW1lbnQsICdtb3VzZW1vdmUnLCAnbW92ZScsICdub3RQYXNzaXZlQ2FwdHVyZScgXSxcbiAgICAgICAgICAgICAgICBbIGRvY3VtZW50LCAnbW91c2V1cCcsICdlbmQnLCAncGFzc2l2ZUNhcHR1cmUnIF1cbiAgICAgICAgICAgICAgXSlcblxuICAgICAgICAgICAgICBjdHguc3RhcnQoZXZ0LCB0cnVlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB0b3VjaFN0YXJ0IChldnQpIHtcbiAgICAgICAgICAgIGlmIChzaG91bGRTdGFydChldnQsIGN0eCkpIHtcbiAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZ0LnRhcmdldFxuXG4gICAgICAgICAgICAgIGFkZEV2dChjdHgsICd0ZW1wJywgW1xuICAgICAgICAgICAgICAgIFsgdGFyZ2V0LCAndG91Y2htb3ZlJywgJ21vdmUnLCAnbm90UGFzc2l2ZUNhcHR1cmUnIF0sXG4gICAgICAgICAgICAgICAgWyB0YXJnZXQsICd0b3VjaGNhbmNlbCcsICdlbmQnLCAncGFzc2l2ZUNhcHR1cmUnIF0sXG4gICAgICAgICAgICAgICAgWyB0YXJnZXQsICd0b3VjaGVuZCcsICdlbmQnLCAncGFzc2l2ZUNhcHR1cmUnIF1cbiAgICAgICAgICAgICAgXSlcblxuICAgICAgICAgICAgICBjdHguc3RhcnQoZXZ0KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBzdGFydCAoZXZ0LCBtb3VzZUV2ZW50KSB7XG4gICAgICAgICAgICBjbGllbnQuaXMuZmlyZWZveCA9PT0gdHJ1ZSAmJiBwcmV2ZW50RHJhZ2dhYmxlKGVsLCB0cnVlKVxuICAgICAgICAgICAgY3R4Lmxhc3RFdnQgPSBldnRcblxuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICogU3RvcCBwcm9wYWdhdGlvbiBzbyBwb3NzaWJsZSB1cHBlciB2LXRvdWNoLXBhbiBkb24ndCBjYXRjaCB0aGlzIGFzIHdlbGw7XG4gICAgICAgICAgICAqIElmIHdlJ3JlIG5vdCB0aGUgdGFyZ2V0IChiYXNlZCBvbiBtb2RpZmllcnMpLCB3ZSdsbCByZS1lbWl0IHRoZSBldmVudCBsYXRlclxuICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmIChtb3VzZUV2ZW50ID09PSB0cnVlIHx8IG1vZGlmaWVycy5zdG9wID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICogYXJlIHdlIGRpcmVjdGx5IHN3aXRjaGluZyB0byBkZXRlY3RlZCBzdGF0ZT9cbiAgICAgICAgICAgICAgKiBjbG9uZSBldmVudCBvbmx5IG90aGVyd2lzZVxuICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgY3R4LmRpcmVjdGlvbi5hbGwgIT09IHRydWVcbiAgICAgICAgICAgICAgICAvLyBhY2NvdW50IGZvciBVTUQgdG9vIHdoZXJlIG1vZGlmaWVycyB3aWxsIGJlIGxvd2VyY2FzZWQgdG8gd29ya1xuICAgICAgICAgICAgICAgICYmIChtb3VzZUV2ZW50ICE9PSB0cnVlIHx8IChjdHgubW9kaWZpZXJzLm1vdXNlQWxsRGlyICE9PSB0cnVlICYmIGN0eC5tb2RpZmllcnMubW91c2VhbGxkaXIgIT09IHRydWUpKVxuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjbG9uZSA9IGV2dC50eXBlLmluZGV4T2YoJ21vdXNlJykgIT09IC0xXG4gICAgICAgICAgICAgICAgICA/IG5ldyBNb3VzZUV2ZW50KGV2dC50eXBlLCBldnQpXG4gICAgICAgICAgICAgICAgICA6IG5ldyBUb3VjaEV2ZW50KGV2dC50eXBlLCBldnQpXG5cbiAgICAgICAgICAgICAgICBldnQuZGVmYXVsdFByZXZlbnRlZCA9PT0gdHJ1ZSAmJiBwcmV2ZW50KGNsb25lKVxuICAgICAgICAgICAgICAgIGV2dC5jYW5jZWxCdWJibGUgPT09IHRydWUgJiYgc3RvcChjbG9uZSlcblxuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oY2xvbmUsIHtcbiAgICAgICAgICAgICAgICAgIHFLZXlFdmVudDogZXZ0LnFLZXlFdmVudCxcbiAgICAgICAgICAgICAgICAgIHFDbGlja091dHNpZGU6IGV2dC5xQ2xpY2tPdXRzaWRlLFxuICAgICAgICAgICAgICAgICAgcUFuY2hvckhhbmRsZWQ6IGV2dC5xQW5jaG9ySGFuZGxlZCxcbiAgICAgICAgICAgICAgICAgIHFDbG9uZWRCeTogZXZ0LnFDbG9uZWRCeSA9PT0gdm9pZCAwXG4gICAgICAgICAgICAgICAgICAgID8gWyBjdHgudWlkIF1cbiAgICAgICAgICAgICAgICAgICAgOiBldnQucUNsb25lZEJ5LmNvbmNhdChjdHgudWlkKVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICBjdHguaW5pdGlhbEV2ZW50ID0ge1xuICAgICAgICAgICAgICAgICAgdGFyZ2V0OiBldnQudGFyZ2V0LFxuICAgICAgICAgICAgICAgICAgZXZlbnQ6IGNsb25lXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgc3RvcChldnQpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHsgbGVmdCwgdG9wIH0gPSBwb3NpdGlvbihldnQpXG5cbiAgICAgICAgICAgIGN0eC5ldmVudCA9IHtcbiAgICAgICAgICAgICAgeDogbGVmdCxcbiAgICAgICAgICAgICAgeTogdG9wLFxuICAgICAgICAgICAgICB0aW1lOiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgICBtb3VzZTogbW91c2VFdmVudCA9PT0gdHJ1ZSxcbiAgICAgICAgICAgICAgZGV0ZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICBpc0ZpcnN0OiB0cnVlLFxuICAgICAgICAgICAgICBpc0ZpbmFsOiBmYWxzZSxcbiAgICAgICAgICAgICAgbGFzdFg6IGxlZnQsXG4gICAgICAgICAgICAgIGxhc3RZOiB0b3BcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgbW92ZSAoZXZ0KSB7XG4gICAgICAgICAgICBpZiAoY3R4LmV2ZW50ID09PSB2b2lkIDApIHJldHVyblxuXG4gICAgICAgICAgICBjb25zdFxuICAgICAgICAgICAgICBwb3MgPSBwb3NpdGlvbihldnQpLFxuICAgICAgICAgICAgICBkaXN0WCA9IHBvcy5sZWZ0IC0gY3R4LmV2ZW50LngsXG4gICAgICAgICAgICAgIGRpc3RZID0gcG9zLnRvcCAtIGN0eC5ldmVudC55XG5cbiAgICAgICAgICAgIC8vIHByZXZlbnQgYnVnZ3kgYnJvd3NlciBiZWhhdmlvciAobGlrZSBCbGluay1iYXNlZCBlbmdpbmUgb25lcyBvbiBXaW5kb3dzKVxuICAgICAgICAgICAgLy8gd2hlcmUgdGhlIG1vdXNlbW92ZSBldmVudCBvY2N1cnMgZXZlbiBpZiB0aGVyZSdzIG5vIG1vdmVtZW50IGFmdGVyIG1vdXNlZG93blxuICAgICAgICAgICAgLy8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9MTYxNDY0XG4gICAgICAgICAgICAvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD03MjEzNDFcbiAgICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9xdWFzYXJmcmFtZXdvcmsvcXVhc2FyL2lzc3Vlcy8xMDcyMVxuICAgICAgICAgICAgaWYgKGRpc3RYID09PSAwICYmIGRpc3RZID09PSAwKSByZXR1cm5cblxuICAgICAgICAgICAgY3R4Lmxhc3RFdnQgPSBldnRcblxuICAgICAgICAgICAgY29uc3QgaXNNb3VzZUV2dCA9IGN0eC5ldmVudC5tb3VzZSA9PT0gdHJ1ZVxuICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgIGhhbmRsZUV2ZW50KGV2dCwgaXNNb3VzZUV2dClcblxuICAgICAgICAgICAgICBsZXQgY3Vyc29yXG4gICAgICAgICAgICAgIGlmIChtb2RpZmllcnMucHJlc2VydmVDdXJzb3IgIT09IHRydWUgJiYgbW9kaWZpZXJzLnByZXNlcnZlY3Vyc29yICE9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgY3Vyc29yID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLmN1cnNvciB8fCAnJ1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5jdXJzb3IgPSAnZ3JhYmJpbmcnXG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpc01vdXNlRXZ0ID09PSB0cnVlICYmIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnbm8tcG9pbnRlci1ldmVudHMtLWNoaWxkcmVuJylcbiAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdub24tc2VsZWN0YWJsZScpXG4gICAgICAgICAgICAgIGNsZWFyU2VsZWN0aW9uKClcblxuICAgICAgICAgICAgICBjdHguc3R5bGVDbGVhbnVwID0gd2l0aERlbGF5ZWRGbiA9PiB7XG4gICAgICAgICAgICAgICAgY3R4LnN0eWxlQ2xlYW51cCA9IHZvaWQgMFxuXG4gICAgICAgICAgICAgICAgaWYgKGN1cnNvciAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuY3Vyc29yID0gY3Vyc29yXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdub24tc2VsZWN0YWJsZScpXG5cbiAgICAgICAgICAgICAgICBpZiAoaXNNb3VzZUV2dCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgcmVtb3ZlID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ25vLXBvaW50ZXItZXZlbnRzLS1jaGlsZHJlbicpXG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIGlmICh3aXRoRGVsYXllZEZuICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlKClcbiAgICAgICAgICAgICAgICAgICAgICB3aXRoRGVsYXllZEZuKClcbiAgICAgICAgICAgICAgICAgICAgfSwgNTApXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBlbHNlIHsgcmVtb3ZlKCkgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh3aXRoRGVsYXllZEZuICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICAgIHdpdGhEZWxheWVkRm4oKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY3R4LmV2ZW50LmRldGVjdGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgIGN0eC5ldmVudC5pc0ZpcnN0ICE9PSB0cnVlICYmIGhhbmRsZUV2ZW50KGV2dCwgY3R4LmV2ZW50Lm1vdXNlKVxuXG4gICAgICAgICAgICAgIGNvbnN0IHsgcGF5bG9hZCwgc3ludGhldGljIH0gPSBnZXRDaGFuZ2VzKGV2dCwgY3R4LCBmYWxzZSlcblxuICAgICAgICAgICAgICBpZiAocGF5bG9hZCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKGN0eC5oYW5kbGVyKHBheWxvYWQpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgY3R4LmVuZChldnQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgaWYgKGN0eC5zdHlsZUNsZWFudXAgPT09IHZvaWQgMCAmJiBjdHguZXZlbnQuaXNGaXJzdCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBzdGFydCgpXG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIGN0eC5ldmVudC5sYXN0WCA9IHBheWxvYWQucG9zaXRpb24ubGVmdFxuICAgICAgICAgICAgICAgICAgY3R4LmV2ZW50Lmxhc3RZID0gcGF5bG9hZC5wb3NpdGlvbi50b3BcbiAgICAgICAgICAgICAgICAgIGN0eC5ldmVudC5sYXN0RGlyID0gc3ludGhldGljID09PSB0cnVlID8gdm9pZCAwIDogcGF5bG9hZC5kaXJlY3Rpb25cbiAgICAgICAgICAgICAgICAgIGN0eC5ldmVudC5pc0ZpcnN0ID0gZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBjdHguZGlyZWN0aW9uLmFsbCA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAvLyBhY2NvdW50IGZvciBVTUQgdG9vIHdoZXJlIG1vZGlmaWVycyB3aWxsIGJlIGxvd2VyY2FzZWQgdG8gd29ya1xuICAgICAgICAgICAgICB8fCAoaXNNb3VzZUV2dCA9PT0gdHJ1ZSAmJiAoY3R4Lm1vZGlmaWVycy5tb3VzZUFsbERpciA9PT0gdHJ1ZSB8fCBjdHgubW9kaWZpZXJzLm1vdXNlYWxsZGlyID09PSB0cnVlKSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBzdGFydCgpXG4gICAgICAgICAgICAgIGN0eC5ldmVudC5kZXRlY3RlZCA9IHRydWVcbiAgICAgICAgICAgICAgY3R4Lm1vdmUoZXZ0KVxuICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3RcbiAgICAgICAgICAgICAgYWJzWCA9IE1hdGguYWJzKGRpc3RYKSxcbiAgICAgICAgICAgICAgYWJzWSA9IE1hdGguYWJzKGRpc3RZKVxuXG4gICAgICAgICAgICBpZiAoYWJzWCAhPT0gYWJzWSkge1xuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgKGN0eC5kaXJlY3Rpb24uaG9yaXpvbnRhbCA9PT0gdHJ1ZSAmJiBhYnNYID4gYWJzWSlcbiAgICAgICAgICAgICAgICB8fCAoY3R4LmRpcmVjdGlvbi52ZXJ0aWNhbCA9PT0gdHJ1ZSAmJiBhYnNYIDwgYWJzWSlcbiAgICAgICAgICAgICAgICB8fCAoY3R4LmRpcmVjdGlvbi51cCA9PT0gdHJ1ZSAmJiBhYnNYIDwgYWJzWSAmJiBkaXN0WSA8IDApXG4gICAgICAgICAgICAgICAgfHwgKGN0eC5kaXJlY3Rpb24uZG93biA9PT0gdHJ1ZSAmJiBhYnNYIDwgYWJzWSAmJiBkaXN0WSA+IDApXG4gICAgICAgICAgICAgICAgfHwgKGN0eC5kaXJlY3Rpb24ubGVmdCA9PT0gdHJ1ZSAmJiBhYnNYID4gYWJzWSAmJiBkaXN0WCA8IDApXG4gICAgICAgICAgICAgICAgfHwgKGN0eC5kaXJlY3Rpb24ucmlnaHQgPT09IHRydWUgJiYgYWJzWCA+IGFic1kgJiYgZGlzdFggPiAwKVxuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBjdHguZXZlbnQuZGV0ZWN0ZWQgPSB0cnVlXG4gICAgICAgICAgICAgICAgY3R4Lm1vdmUoZXZ0KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGN0eC5lbmQoZXZ0LCB0cnVlKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGVuZCAoZXZ0LCBhYm9ydCkge1xuICAgICAgICAgICAgaWYgKGN0eC5ldmVudCA9PT0gdm9pZCAwKSByZXR1cm5cblxuICAgICAgICAgICAgY2xlYW5FdnQoY3R4LCAndGVtcCcpXG4gICAgICAgICAgICBjbGllbnQuaXMuZmlyZWZveCA9PT0gdHJ1ZSAmJiBwcmV2ZW50RHJhZ2dhYmxlKGVsLCBmYWxzZSlcblxuICAgICAgICAgICAgaWYgKGFib3J0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgIGN0eC5zdHlsZUNsZWFudXA/LigpXG5cbiAgICAgICAgICAgICAgaWYgKGN0eC5ldmVudC5kZXRlY3RlZCAhPT0gdHJ1ZSAmJiBjdHguaW5pdGlhbEV2ZW50ICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICBjdHguaW5pdGlhbEV2ZW50LnRhcmdldC5kaXNwYXRjaEV2ZW50KGN0eC5pbml0aWFsRXZlbnQuZXZlbnQpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGN0eC5ldmVudC5kZXRlY3RlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICBjdHguZXZlbnQuaXNGaXJzdCA9PT0gdHJ1ZSAmJiBjdHguaGFuZGxlcihnZXRDaGFuZ2VzKGV2dCA9PT0gdm9pZCAwID8gY3R4Lmxhc3RFdnQgOiBldnQsIGN0eCkucGF5bG9hZClcblxuICAgICAgICAgICAgICBjb25zdCB7IHBheWxvYWQgfSA9IGdldENoYW5nZXMoZXZ0ID09PSB2b2lkIDAgPyBjdHgubGFzdEV2dCA6IGV2dCwgY3R4LCB0cnVlKVxuICAgICAgICAgICAgICBjb25zdCBmbiA9ICgpID0+IHsgY3R4LmhhbmRsZXIocGF5bG9hZCkgfVxuXG4gICAgICAgICAgICAgIGlmIChjdHguc3R5bGVDbGVhbnVwICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICBjdHguc3R5bGVDbGVhbnVwKGZuKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGZuKClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjdHguZXZlbnQgPSB2b2lkIDBcbiAgICAgICAgICAgIGN0eC5pbml0aWFsRXZlbnQgPSB2b2lkIDBcbiAgICAgICAgICAgIGN0eC5sYXN0RXZ0ID0gdm9pZCAwXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZWwuX19xdG91Y2hwYW4gPSBjdHhcblxuICAgICAgICBpZiAobW9kaWZpZXJzLm1vdXNlID09PSB0cnVlKSB7XG4gICAgICAgICAgLy8gYWNjb3VudCBmb3IgVU1EIHRvbyB3aGVyZSBtb2RpZmllcnMgd2lsbCBiZSBsb3dlcmNhc2VkIHRvIHdvcmtcbiAgICAgICAgICBjb25zdCBjYXB0dXJlID0gbW9kaWZpZXJzLm1vdXNlQ2FwdHVyZSA9PT0gdHJ1ZSB8fCBtb2RpZmllcnMubW91c2VjYXB0dXJlID09PSB0cnVlXG4gICAgICAgICAgICA/ICdDYXB0dXJlJ1xuICAgICAgICAgICAgOiAnJ1xuXG4gICAgICAgICAgYWRkRXZ0KGN0eCwgJ21haW4nLCBbXG4gICAgICAgICAgICBbIGVsLCAnbW91c2Vkb3duJywgJ21vdXNlU3RhcnQnLCBgcGFzc2l2ZSR7IGNhcHR1cmUgfWAgXVxuICAgICAgICAgIF0pXG4gICAgICAgIH1cblxuICAgICAgICBjbGllbnQuaGFzLnRvdWNoID09PSB0cnVlICYmIGFkZEV2dChjdHgsICdtYWluJywgW1xuICAgICAgICAgIFsgZWwsICd0b3VjaHN0YXJ0JywgJ3RvdWNoU3RhcnQnLCBgcGFzc2l2ZSR7IG1vZGlmaWVycy5jYXB0dXJlID09PSB0cnVlID8gJ0NhcHR1cmUnIDogJycgfWAgXSxcbiAgICAgICAgICBbIGVsLCAndG91Y2htb3ZlJywgJ25vb3AnLCAnbm90UGFzc2l2ZUNhcHR1cmUnIF0gLy8gY2Fubm90IGJlIHBhc3NpdmUgKGV4OiBpT1Mgc2Nyb2xsKVxuICAgICAgICBdKVxuICAgICAgfSxcblxuICAgICAgdXBkYXRlZCAoZWwsIGJpbmRpbmdzKSB7XG4gICAgICAgIGNvbnN0IGN0eCA9IGVsLl9fcXRvdWNocGFuXG5cbiAgICAgICAgaWYgKGN0eCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgaWYgKGJpbmRpbmdzLm9sZFZhbHVlICE9PSBiaW5kaW5ncy52YWx1ZSkge1xuICAgICAgICAgICAgdHlwZW9mIHZhbHVlICE9PSAnZnVuY3Rpb24nICYmIGN0eC5lbmQoKVxuICAgICAgICAgICAgY3R4LmhhbmRsZXIgPSBiaW5kaW5ncy52YWx1ZVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGN0eC5kaXJlY3Rpb24gPSBnZXRNb2RpZmllckRpcmVjdGlvbnMoYmluZGluZ3MubW9kaWZpZXJzKVxuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICBiZWZvcmVVbm1vdW50IChlbCkge1xuICAgICAgICBjb25zdCBjdHggPSBlbC5fX3F0b3VjaHBhblxuXG4gICAgICAgIGlmIChjdHggIT09IHZvaWQgMCkge1xuICAgICAgICAgIC8vIGVtaXQgdGhlIGVuZCBldmVudCB3aGVuIHRoZSBkaXJlY3RpdmUgaXMgZGVzdHJveWVkIHdoaWxlIGFjdGl2ZVxuICAgICAgICAgIC8vIHRoaXMgaXMgb25seSBuZWVkZWQgaW4gVG91Y2hQYW4gYmVjYXVzZSB0aGUgcmVzdCBvZiB0aGUgdG91Y2ggZGlyZWN0aXZlcyBkbyBub3QgZW1pdCBhbiBlbmQgZXZlbnRcbiAgICAgICAgICAvLyB0aGUgY29uZGl0aW9uIGlzIGFsc28gY2hlY2tlZCBpbiB0aGUgc3RhcnQgb2YgZnVuY3Rpb24gYnV0IHdlIGF2b2lkIHRoZSBjYWxsXG4gICAgICAgICAgY3R4LmV2ZW50ICE9PSB2b2lkIDAgJiYgY3R4LmVuZCgpXG5cbiAgICAgICAgICBjbGVhbkV2dChjdHgsICdtYWluJylcbiAgICAgICAgICBjbGVhbkV2dChjdHgsICd0ZW1wJylcblxuICAgICAgICAgIGNsaWVudC5pcy5maXJlZm94ID09PSB0cnVlICYmIHByZXZlbnREcmFnZ2FibGUoZWwsIGZhbHNlKVxuICAgICAgICAgIGN0eC5zdHlsZUNsZWFudXA/LigpXG5cbiAgICAgICAgICBkZWxldGUgZWwuX19xdG91Y2hwYW5cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbilcbiIsImNvbnN0IHVuaXRzID0gWyAnQicsICdLQicsICdNQicsICdHQicsICdUQicsICdQQicgXVxuXG5leHBvcnQgZnVuY3Rpb24gaHVtYW5TdG9yYWdlU2l6ZSAoYnl0ZXMsIGRlY2ltYWxzID0gMSkge1xuICBsZXQgdSA9IDBcblxuICB3aGlsZSAocGFyc2VJbnQoYnl0ZXMsIDEwKSA+PSAxMDI0ICYmIHUgPCB1bml0cy5sZW5ndGggLSAxKSB7XG4gICAgYnl0ZXMgLz0gMTAyNFxuICAgICsrdVxuICB9XG5cbiAgcmV0dXJuIGAkeyBieXRlcy50b0ZpeGVkKGRlY2ltYWxzKSB9JHsgdW5pdHNbIHUgXSB9YFxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FwaXRhbGl6ZSAoc3RyKSB7XG4gIHJldHVybiBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJldHdlZW4gKHYsIG1pbiwgbWF4KSB7XG4gIHJldHVybiBtYXggPD0gbWluXG4gICAgPyBtaW5cbiAgICA6IE1hdGgubWluKG1heCwgTWF0aC5tYXgobWluLCB2KSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZVRvSW50ZXJ2YWwgKHYsIG1pbiwgbWF4KSB7XG4gIGlmIChtYXggPD0gbWluKSB7XG4gICAgcmV0dXJuIG1pblxuICB9XG5cbiAgY29uc3Qgc2l6ZSA9IChtYXggLSBtaW4gKyAxKVxuXG4gIGxldCBpbmRleCA9IG1pbiArICh2IC0gbWluKSAlIHNpemVcbiAgaWYgKGluZGV4IDwgbWluKSB7XG4gICAgaW5kZXggPSBzaXplICsgaW5kZXhcbiAgfVxuXG4gIHJldHVybiBpbmRleCA9PT0gMCA/IDAgOiBpbmRleCAvLyBmaXggZm9yICgtYSAlIGEpID0+IC0wXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYWQgKHYsIGxlbmd0aCA9IDIsIGNoYXIgPSAnMCcpIHtcbiAgaWYgKHYgPT09IHZvaWQgMCB8fCB2ID09PSBudWxsKSB7XG4gICAgcmV0dXJuIHZcbiAgfVxuXG4gIGNvbnN0IHZhbCA9ICcnICsgdlxuICByZXR1cm4gdmFsLmxlbmd0aCA+PSBsZW5ndGhcbiAgICA/IHZhbFxuICAgIDogbmV3IEFycmF5KGxlbmd0aCAtIHZhbC5sZW5ndGggKyAxKS5qb2luKGNoYXIpICsgdmFsXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaHVtYW5TdG9yYWdlU2l6ZSxcbiAgY2FwaXRhbGl6ZSxcbiAgYmV0d2VlbixcbiAgbm9ybWFsaXplVG9JbnRlcnZhbCxcbiAgcGFkXG59XG4iLCJpbXBvcnQgeyBoLCB3aXRoRGlyZWN0aXZlcywgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIG9uTW91bnRlZCwgb25CZWZvcmVVbm1vdW50LCBuZXh0VGljaywgaW5qZWN0LCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VIaXN0b3J5IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLWhpc3RvcnkvdXNlLWhpc3RvcnkuanMnXG5pbXBvcnQgdXNlTW9kZWxUb2dnbGUsIHsgdXNlTW9kZWxUb2dnbGVQcm9wcywgdXNlTW9kZWxUb2dnbGVFbWl0cyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLW1vZGVsLXRvZ2dsZS91c2UtbW9kZWwtdG9nZ2xlLmpzJ1xuaW1wb3J0IHVzZVByZXZlbnRTY3JvbGwgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtcHJldmVudC1zY3JvbGwvdXNlLXByZXZlbnQtc2Nyb2xsLmpzJ1xuaW1wb3J0IHVzZVRpbWVvdXQgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvdXNlLXRpbWVvdXQvdXNlLXRpbWVvdXQuanMnXG5pbXBvcnQgdXNlRGFyaywgeyB1c2VEYXJrUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1kYXJrL3VzZS1kYXJrLmpzJ1xuXG5pbXBvcnQgVG91Y2hQYW4gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy90b3VjaC1wYW4vVG91Y2hQYW4uanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGJldHdlZW4gfSBmcm9tICcuLi8uLi91dGlscy9mb3JtYXQvZm9ybWF0LmpzJ1xuaW1wb3J0IHsgaFNsb3QsIGhEaXIgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5pbXBvcnQgeyBsYXlvdXRLZXksIGVtcHR5UmVuZGVyRm4gfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnN5bWJvbHMvc3ltYm9scy5qcydcblxuY29uc3QgZHVyYXRpb24gPSAxNTBcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FEcmF3ZXInLFxuXG4gIGluaGVyaXRBdHRyczogZmFsc2UsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VNb2RlbFRvZ2dsZVByb3BzLFxuICAgIC4uLnVzZURhcmtQcm9wcyxcblxuICAgIHNpZGU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdsZWZ0JyxcbiAgICAgIHZhbGlkYXRvcjogdiA9PiBbICdsZWZ0JywgJ3JpZ2h0JyBdLmluY2x1ZGVzKHYpXG4gICAgfSxcblxuICAgIHdpZHRoOiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICBkZWZhdWx0OiAzMDBcbiAgICB9LFxuXG4gICAgbWluaTogQm9vbGVhbixcbiAgICBtaW5pVG9PdmVybGF5OiBCb29sZWFuLFxuICAgIG1pbmlXaWR0aDoge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgZGVmYXVsdDogNTdcbiAgICB9LFxuICAgIG5vTWluaUFuaW1hdGlvbjogQm9vbGVhbixcblxuICAgIGJyZWFrcG9pbnQ6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIGRlZmF1bHQ6IDEwMjNcbiAgICB9LFxuICAgIHNob3dJZkFib3ZlOiBCb29sZWFuLFxuXG4gICAgYmVoYXZpb3I6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbGlkYXRvcjogdiA9PiBbICdkZWZhdWx0JywgJ2Rlc2t0b3AnLCAnbW9iaWxlJyBdLmluY2x1ZGVzKHYpLFxuICAgICAgZGVmYXVsdDogJ2RlZmF1bHQnXG4gICAgfSxcblxuICAgIGJvcmRlcmVkOiBCb29sZWFuLFxuICAgIGVsZXZhdGVkOiBCb29sZWFuLFxuXG4gICAgb3ZlcmxheTogQm9vbGVhbixcbiAgICBwZXJzaXN0ZW50OiBCb29sZWFuLFxuICAgIG5vU3dpcGVPcGVuOiBCb29sZWFuLFxuICAgIG5vU3dpcGVDbG9zZTogQm9vbGVhbixcbiAgICBub1N3aXBlQmFja2Ryb3A6IEJvb2xlYW5cbiAgfSxcblxuICBlbWl0czogW1xuICAgIC4uLnVzZU1vZGVsVG9nZ2xlRW1pdHMsXG4gICAgJ29uTGF5b3V0JywgJ21pbmlTdGF0ZSdcbiAgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQsIGF0dHJzIH0pIHtcbiAgICBjb25zdCB2bSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3QgeyBwcm94eTogeyAkcSB9IH0gPSB2bVxuXG4gICAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgJHEpXG4gICAgY29uc3QgeyBwcmV2ZW50Qm9keVNjcm9sbCB9ID0gdXNlUHJldmVudFNjcm9sbCgpXG4gICAgY29uc3QgeyByZWdpc3RlclRpbWVvdXQsIHJlbW92ZVRpbWVvdXQgfSA9IHVzZVRpbWVvdXQoKVxuXG4gICAgY29uc3QgJGxheW91dCA9IGluamVjdChsYXlvdXRLZXksIGVtcHR5UmVuZGVyRm4pXG4gICAgaWYgKCRsYXlvdXQgPT09IGVtcHR5UmVuZGVyRm4pIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1FEcmF3ZXIgbmVlZHMgdG8gYmUgY2hpbGQgb2YgUUxheW91dCcpXG4gICAgICByZXR1cm4gZW1wdHlSZW5kZXJGblxuICAgIH1cblxuICAgIGxldCBsYXN0RGVza3RvcFN0YXRlLCB0aW1lck1pbmkgPSBudWxsLCBsYXlvdXRUb3RhbFdpZHRoV2F0Y2hlclxuXG4gICAgY29uc3QgYmVsb3dCcmVha3BvaW50ID0gcmVmKFxuICAgICAgcHJvcHMuYmVoYXZpb3IgPT09ICdtb2JpbGUnXG4gICAgICB8fCAocHJvcHMuYmVoYXZpb3IgIT09ICdkZXNrdG9wJyAmJiAkbGF5b3V0LnRvdGFsV2lkdGgudmFsdWUgPD0gcHJvcHMuYnJlYWtwb2ludClcbiAgICApXG5cbiAgICBjb25zdCBpc01pbmkgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMubWluaSA9PT0gdHJ1ZSAmJiBiZWxvd0JyZWFrcG9pbnQudmFsdWUgIT09IHRydWVcbiAgICApXG5cbiAgICBjb25zdCBzaXplID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgaXNNaW5pLnZhbHVlID09PSB0cnVlXG4gICAgICAgID8gcHJvcHMubWluaVdpZHRoXG4gICAgICAgIDogcHJvcHMud2lkdGhcbiAgICApKVxuXG4gICAgY29uc3Qgc2hvd2luZyA9IHJlZihcbiAgICAgIHByb3BzLnNob3dJZkFib3ZlID09PSB0cnVlICYmIGJlbG93QnJlYWtwb2ludC52YWx1ZSA9PT0gZmFsc2VcbiAgICAgICAgPyB0cnVlXG4gICAgICAgIDogcHJvcHMubW9kZWxWYWx1ZSA9PT0gdHJ1ZVxuICAgIClcblxuICAgIGNvbnN0IGhpZGVPblJvdXRlQ2hhbmdlID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLnBlcnNpc3RlbnQgIT09IHRydWVcbiAgICAgICYmIChiZWxvd0JyZWFrcG9pbnQudmFsdWUgPT09IHRydWUgfHwgb25TY3JlZW5PdmVybGF5LnZhbHVlID09PSB0cnVlKVxuICAgIClcblxuICAgIGZ1bmN0aW9uIGhhbmRsZVNob3cgKGV2dCwgbm9FdmVudCkge1xuICAgICAgYWRkVG9IaXN0b3J5KClcblxuICAgICAgZXZ0ICE9PSBmYWxzZSAmJiAkbGF5b3V0LmFuaW1hdGUoKVxuICAgICAgYXBwbHlQb3NpdGlvbigwKVxuXG4gICAgICBpZiAoYmVsb3dCcmVha3BvaW50LnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IG90aGVySW5zdGFuY2UgPSAkbGF5b3V0Lmluc3RhbmNlc1sgb3RoZXJTaWRlLnZhbHVlIF1cbiAgICAgICAgaWYgKG90aGVySW5zdGFuY2U/LmJlbG93QnJlYWtwb2ludCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIG90aGVySW5zdGFuY2UuaGlkZShmYWxzZSlcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5QmFja2Ryb3AoMSlcbiAgICAgICAgJGxheW91dC5pc0NvbnRhaW5lci52YWx1ZSAhPT0gdHJ1ZSAmJiBwcmV2ZW50Qm9keVNjcm9sbCh0cnVlKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGFwcGx5QmFja2Ryb3AoMClcbiAgICAgICAgZXZ0ICE9PSBmYWxzZSAmJiBzZXRTY3JvbGxhYmxlKGZhbHNlKVxuICAgICAgfVxuXG4gICAgICByZWdpc3RlclRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBldnQgIT09IGZhbHNlICYmIHNldFNjcm9sbGFibGUodHJ1ZSlcbiAgICAgICAgbm9FdmVudCAhPT0gdHJ1ZSAmJiBlbWl0KCdzaG93JywgZXZ0KVxuICAgICAgfSwgZHVyYXRpb24pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlSGlkZSAoZXZ0LCBub0V2ZW50KSB7XG4gICAgICByZW1vdmVGcm9tSGlzdG9yeSgpXG5cbiAgICAgIGV2dCAhPT0gZmFsc2UgJiYgJGxheW91dC5hbmltYXRlKClcblxuICAgICAgYXBwbHlCYWNrZHJvcCgwKVxuICAgICAgYXBwbHlQb3NpdGlvbihzdGF0ZURpcmVjdGlvbi52YWx1ZSAqIHNpemUudmFsdWUpXG5cbiAgICAgIGNsZWFudXAoKVxuXG4gICAgICBpZiAobm9FdmVudCAhPT0gdHJ1ZSkge1xuICAgICAgICByZWdpc3RlclRpbWVvdXQoKCkgPT4geyBlbWl0KCdoaWRlJywgZXZ0KSB9LCBkdXJhdGlvbilcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZW1vdmVUaW1lb3V0KClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB7IHNob3csIGhpZGUgfSA9IHVzZU1vZGVsVG9nZ2xlKHtcbiAgICAgIHNob3dpbmcsXG4gICAgICBoaWRlT25Sb3V0ZUNoYW5nZSxcbiAgICAgIGhhbmRsZVNob3csXG4gICAgICBoYW5kbGVIaWRlXG4gICAgfSlcblxuICAgIGNvbnN0IHsgYWRkVG9IaXN0b3J5LCByZW1vdmVGcm9tSGlzdG9yeSB9ID0gdXNlSGlzdG9yeShzaG93aW5nLCBoaWRlLCBoaWRlT25Sb3V0ZUNoYW5nZSlcblxuICAgIGNvbnN0IGluc3RhbmNlID0ge1xuICAgICAgYmVsb3dCcmVha3BvaW50LFxuICAgICAgaGlkZVxuICAgIH1cblxuICAgIGNvbnN0IHJpZ2h0U2lkZSA9IGNvbXB1dGVkKCgpID0+IHByb3BzLnNpZGUgPT09ICdyaWdodCcpXG5cbiAgICBjb25zdCBzdGF0ZURpcmVjdGlvbiA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAoJHEubGFuZy5ydGwgPT09IHRydWUgPyAtMSA6IDEpICogKHJpZ2h0U2lkZS52YWx1ZSA9PT0gdHJ1ZSA/IDEgOiAtMSlcbiAgICApXG5cbiAgICBjb25zdCBmbGFnQmFja2Ryb3BCZyA9IHJlZigwKVxuICAgIGNvbnN0IGZsYWdQYW5uaW5nID0gcmVmKGZhbHNlKVxuICAgIGNvbnN0IGZsYWdNaW5pQW5pbWF0ZSA9IHJlZihmYWxzZSlcbiAgICBjb25zdCBmbGFnQ29udGVudFBvc2l0aW9uID0gcmVmKCAvLyBzdGFydGluZyB3aXRoIFwiaGlkZGVuXCIgZm9yIFNTUlxuICAgICAgc2l6ZS52YWx1ZSAqIHN0YXRlRGlyZWN0aW9uLnZhbHVlXG4gICAgKVxuXG4gICAgY29uc3Qgb3RoZXJTaWRlID0gY29tcHV0ZWQoKCkgPT4gKHJpZ2h0U2lkZS52YWx1ZSA9PT0gdHJ1ZSA/ICdsZWZ0JyA6ICdyaWdodCcpKVxuICAgIGNvbnN0IG9mZnNldCA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHNob3dpbmcudmFsdWUgPT09IHRydWUgJiYgYmVsb3dCcmVha3BvaW50LnZhbHVlID09PSBmYWxzZSAmJiBwcm9wcy5vdmVybGF5ID09PSBmYWxzZVxuICAgICAgICA/IChwcm9wcy5taW5pVG9PdmVybGF5ID09PSB0cnVlID8gcHJvcHMubWluaVdpZHRoIDogc2l6ZS52YWx1ZSlcbiAgICAgICAgOiAwXG4gICAgKSlcblxuICAgIGNvbnN0IGZpeGVkID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLm92ZXJsYXkgPT09IHRydWVcbiAgICAgIHx8IHByb3BzLm1pbmlUb092ZXJsYXkgPT09IHRydWVcbiAgICAgIHx8ICRsYXlvdXQudmlldy52YWx1ZS5pbmRleE9mKHJpZ2h0U2lkZS52YWx1ZSA/ICdSJyA6ICdMJykgIT09IC0xXG4gICAgICB8fCAoJHEucGxhdGZvcm0uaXMuaW9zID09PSB0cnVlICYmICRsYXlvdXQuaXNDb250YWluZXIudmFsdWUgPT09IHRydWUpXG4gICAgKVxuXG4gICAgY29uc3Qgb25MYXlvdXQgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMub3ZlcmxheSA9PT0gZmFsc2VcbiAgICAgICYmIHNob3dpbmcudmFsdWUgPT09IHRydWVcbiAgICAgICYmIGJlbG93QnJlYWtwb2ludC52YWx1ZSA9PT0gZmFsc2VcbiAgICApXG5cbiAgICBjb25zdCBvblNjcmVlbk92ZXJsYXkgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMub3ZlcmxheSA9PT0gdHJ1ZVxuICAgICAgJiYgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgJiYgYmVsb3dCcmVha3BvaW50LnZhbHVlID09PSBmYWxzZVxuICAgIClcblxuICAgIGNvbnN0IGJhY2tkcm9wQ2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ2Z1bGxzY3JlZW4gcS1kcmF3ZXJfX2JhY2tkcm9wJ1xuICAgICAgKyAoc2hvd2luZy52YWx1ZSA9PT0gZmFsc2UgJiYgZmxhZ1Bhbm5pbmcudmFsdWUgPT09IGZhbHNlID8gJyBoaWRkZW4nIDogJycpXG4gICAgKVxuXG4gICAgY29uc3QgYmFja2Ryb3BTdHlsZSA9IGNvbXB1dGVkKCgpID0+ICh7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IGByZ2JhKDAsMCwwLCR7IGZsYWdCYWNrZHJvcEJnLnZhbHVlICogMC40IH0pYFxuICAgIH0pKVxuXG4gICAgY29uc3QgaGVhZGVyU2xvdCA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHJpZ2h0U2lkZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICA/ICRsYXlvdXQucm93cy52YWx1ZS50b3BbIDIgXSA9PT0gJ3InXG4gICAgICAgIDogJGxheW91dC5yb3dzLnZhbHVlLnRvcFsgMCBdID09PSAnbCdcbiAgICApKVxuXG4gICAgY29uc3QgZm9vdGVyU2xvdCA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHJpZ2h0U2lkZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICA/ICRsYXlvdXQucm93cy52YWx1ZS5ib3R0b21bIDIgXSA9PT0gJ3InXG4gICAgICAgIDogJGxheW91dC5yb3dzLnZhbHVlLmJvdHRvbVsgMCBdID09PSAnbCdcbiAgICApKVxuXG4gICAgY29uc3QgYWJvdmVTdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGNzcyA9IHt9XG5cbiAgICAgIGlmICgkbGF5b3V0LmhlYWRlci5zcGFjZSA9PT0gdHJ1ZSAmJiBoZWFkZXJTbG90LnZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICBpZiAoZml4ZWQudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICBjc3MudG9wID0gYCR7ICRsYXlvdXQuaGVhZGVyLm9mZnNldCB9cHhgXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoJGxheW91dC5oZWFkZXIuc3BhY2UgPT09IHRydWUpIHtcbiAgICAgICAgICBjc3MudG9wID0gYCR7ICRsYXlvdXQuaGVhZGVyLnNpemUgfXB4YFxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICgkbGF5b3V0LmZvb3Rlci5zcGFjZSA9PT0gdHJ1ZSAmJiBmb290ZXJTbG90LnZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICBpZiAoZml4ZWQudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICBjc3MuYm90dG9tID0gYCR7ICRsYXlvdXQuZm9vdGVyLm9mZnNldCB9cHhgXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoJGxheW91dC5mb290ZXIuc3BhY2UgPT09IHRydWUpIHtcbiAgICAgICAgICBjc3MuYm90dG9tID0gYCR7ICRsYXlvdXQuZm9vdGVyLnNpemUgfXB4YFxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjc3NcbiAgICB9KVxuXG4gICAgY29uc3Qgc3R5bGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBzdHlsZSA9IHtcbiAgICAgICAgd2lkdGg6IGAkeyBzaXplLnZhbHVlIH1weGAsXG4gICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVgoJHsgZmxhZ0NvbnRlbnRQb3NpdGlvbi52YWx1ZSB9cHgpYFxuICAgICAgfVxuXG4gICAgICByZXR1cm4gYmVsb3dCcmVha3BvaW50LnZhbHVlID09PSB0cnVlXG4gICAgICAgID8gc3R5bGVcbiAgICAgICAgOiBPYmplY3QuYXNzaWduKHN0eWxlLCBhYm92ZVN0eWxlLnZhbHVlKVxuICAgIH0pXG5cbiAgICBjb25zdCBjb250ZW50Q2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtZHJhd2VyX19jb250ZW50IGZpdCAnXG4gICAgICArICgkbGF5b3V0LmlzQ29udGFpbmVyLnZhbHVlICE9PSB0cnVlID8gJ3Njcm9sbCcgOiAnb3ZlcmZsb3ctYXV0bycpXG4gICAgKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBgcS1kcmF3ZXIgcS1kcmF3ZXItLSR7IHByb3BzLnNpZGUgfWBcbiAgICAgICsgKGZsYWdNaW5pQW5pbWF0ZS52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1kcmF3ZXItLW1pbmktYW5pbWF0ZScgOiAnJylcbiAgICAgICsgKHByb3BzLmJvcmRlcmVkID09PSB0cnVlID8gJyBxLWRyYXdlci0tYm9yZGVyZWQnIDogJycpXG4gICAgICArIChpc0RhcmsudmFsdWUgPT09IHRydWUgPyAnIHEtZHJhd2VyLS1kYXJrIHEtZGFyaycgOiAnJylcbiAgICAgICsgKFxuICAgICAgICBmbGFnUGFubmluZy52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgID8gJyBuby10cmFuc2l0aW9uJ1xuICAgICAgICAgIDogKHNob3dpbmcudmFsdWUgPT09IHRydWUgPyAnJyA6ICcgcS1sYXlvdXQtLXByZXZlbnQtZm9jdXMnKVxuICAgICAgKVxuICAgICAgKyAoXG4gICAgICAgIGJlbG93QnJlYWtwb2ludC52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgID8gJyBmaXhlZCBxLWRyYXdlci0tb24tdG9wIHEtZHJhd2VyLS1tb2JpbGUgcS1kcmF3ZXItLXRvcC1wYWRkaW5nJ1xuICAgICAgICAgIDogYCBxLWRyYXdlci0tJHsgaXNNaW5pLnZhbHVlID09PSB0cnVlID8gJ21pbmknIDogJ3N0YW5kYXJkJyB9YFxuICAgICAgICAgICsgKGZpeGVkLnZhbHVlID09PSB0cnVlIHx8IG9uTGF5b3V0LnZhbHVlICE9PSB0cnVlID8gJyBmaXhlZCcgOiAnJylcbiAgICAgICAgICArIChwcm9wcy5vdmVybGF5ID09PSB0cnVlIHx8IHByb3BzLm1pbmlUb092ZXJsYXkgPT09IHRydWUgPyAnIHEtZHJhd2VyLS1vbi10b3AnIDogJycpXG4gICAgICAgICAgKyAoaGVhZGVyU2xvdC52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1kcmF3ZXItLXRvcC1wYWRkaW5nJyA6ICcnKVxuICAgICAgKVxuICAgIClcblxuICAgIGNvbnN0IG9wZW5EaXJlY3RpdmUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICAvLyBpZiBwcm9wcy5ub1N3aXBlT3BlbiAhPT0gdHJ1ZVxuICAgICAgY29uc3QgZGlyID0gJHEubGFuZy5ydGwgPT09IHRydWUgPyBwcm9wcy5zaWRlIDogb3RoZXJTaWRlLnZhbHVlXG5cbiAgICAgIHJldHVybiBbIFtcbiAgICAgICAgVG91Y2hQYW4sXG4gICAgICAgIG9uT3BlblBhbixcbiAgICAgICAgdm9pZCAwLFxuICAgICAgICB7XG4gICAgICAgICAgWyBkaXIgXTogdHJ1ZSxcbiAgICAgICAgICBtb3VzZTogdHJ1ZVxuICAgICAgICB9XG4gICAgICBdIF1cbiAgICB9KVxuXG4gICAgY29uc3QgY29udGVudENsb3NlRGlyZWN0aXZlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgLy8gaWYgYmVsb3dCcmVha3BvaW50LnZhbHVlID09PSB0cnVlICYmIHByb3BzLm5vU3dpcGVDbG9zZSAhPT0gdHJ1ZVxuICAgICAgY29uc3QgZGlyID0gJHEubGFuZy5ydGwgPT09IHRydWUgPyBvdGhlclNpZGUudmFsdWUgOiBwcm9wcy5zaWRlXG5cbiAgICAgIHJldHVybiBbIFtcbiAgICAgICAgVG91Y2hQYW4sXG4gICAgICAgIG9uQ2xvc2VQYW4sXG4gICAgICAgIHZvaWQgMCxcbiAgICAgICAge1xuICAgICAgICAgIFsgZGlyIF06IHRydWUsXG4gICAgICAgICAgbW91c2U6IHRydWVcbiAgICAgICAgfVxuICAgICAgXSBdXG4gICAgfSlcblxuICAgIGNvbnN0IGJhY2tkcm9wQ2xvc2VEaXJlY3RpdmUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICAvLyBpZiBzaG93aW5nLnZhbHVlID09PSB0cnVlICYmIHByb3BzLm5vU3dpcGVCYWNrZHJvcCAhPT0gdHJ1ZVxuICAgICAgY29uc3QgZGlyID0gJHEubGFuZy5ydGwgPT09IHRydWUgPyBvdGhlclNpZGUudmFsdWUgOiBwcm9wcy5zaWRlXG5cbiAgICAgIHJldHVybiBbIFtcbiAgICAgICAgVG91Y2hQYW4sXG4gICAgICAgIG9uQ2xvc2VQYW4sXG4gICAgICAgIHZvaWQgMCxcbiAgICAgICAge1xuICAgICAgICAgIFsgZGlyIF06IHRydWUsXG4gICAgICAgICAgbW91c2U6IHRydWUsXG4gICAgICAgICAgbW91c2VBbGxEaXI6IHRydWVcbiAgICAgICAgfVxuICAgICAgXSBdXG4gICAgfSlcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUJlbG93QnJlYWtwb2ludCAoKSB7XG4gICAgICB1cGRhdGVMb2NhbChiZWxvd0JyZWFrcG9pbnQsIChcbiAgICAgICAgcHJvcHMuYmVoYXZpb3IgPT09ICdtb2JpbGUnXG4gICAgICAgIHx8IChwcm9wcy5iZWhhdmlvciAhPT0gJ2Rlc2t0b3AnICYmICRsYXlvdXQudG90YWxXaWR0aC52YWx1ZSA8PSBwcm9wcy5icmVha3BvaW50KVxuICAgICAgKSlcbiAgICB9XG5cbiAgICB3YXRjaChiZWxvd0JyZWFrcG9pbnQsIHZhbCA9PiB7XG4gICAgICBpZiAodmFsID09PSB0cnVlKSB7IC8vIGZyb20gbGcgdG8geHNcbiAgICAgICAgbGFzdERlc2t0b3BTdGF0ZSA9IHNob3dpbmcudmFsdWVcbiAgICAgICAgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSAmJiBoaWRlKGZhbHNlKVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAoXG4gICAgICAgIHByb3BzLm92ZXJsYXkgPT09IGZhbHNlXG4gICAgICAgICYmIHByb3BzLmJlaGF2aW9yICE9PSAnbW9iaWxlJ1xuICAgICAgICAmJiBsYXN0RGVza3RvcFN0YXRlICE9PSBmYWxzZVxuICAgICAgKSB7IC8vIGZyb20geHMgdG8gbGdcbiAgICAgICAgaWYgKHNob3dpbmcudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICBhcHBseVBvc2l0aW9uKDApXG4gICAgICAgICAgYXBwbHlCYWNrZHJvcCgwKVxuICAgICAgICAgIGNsZWFudXAoKVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHNob3coZmFsc2UpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMuc2lkZSwgKG5ld1NpZGUsIG9sZFNpZGUpID0+IHtcbiAgICAgIGlmICgkbGF5b3V0Lmluc3RhbmNlc1sgb2xkU2lkZSBdID09PSBpbnN0YW5jZSkge1xuICAgICAgICAkbGF5b3V0Lmluc3RhbmNlc1sgb2xkU2lkZSBdID0gdm9pZCAwXG4gICAgICAgICRsYXlvdXRbIG9sZFNpZGUgXS5zcGFjZSA9IGZhbHNlXG4gICAgICAgICRsYXlvdXRbIG9sZFNpZGUgXS5vZmZzZXQgPSAwXG4gICAgICB9XG5cbiAgICAgICRsYXlvdXQuaW5zdGFuY2VzWyBuZXdTaWRlIF0gPSBpbnN0YW5jZVxuICAgICAgJGxheW91dFsgbmV3U2lkZSBdLnNpemUgPSBzaXplLnZhbHVlXG4gICAgICAkbGF5b3V0WyBuZXdTaWRlIF0uc3BhY2UgPSBvbkxheW91dC52YWx1ZVxuICAgICAgJGxheW91dFsgbmV3U2lkZSBdLm9mZnNldCA9IG9mZnNldC52YWx1ZVxuICAgIH0pXG5cbiAgICB3YXRjaCgkbGF5b3V0LnRvdGFsV2lkdGgsICgpID0+IHtcbiAgICAgIGlmICgkbGF5b3V0LmlzQ29udGFpbmVyLnZhbHVlID09PSB0cnVlIHx8IGRvY3VtZW50LnFTY3JvbGxQcmV2ZW50ZWQgIT09IHRydWUpIHtcbiAgICAgICAgdXBkYXRlQmVsb3dCcmVha3BvaW50KClcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgd2F0Y2goXG4gICAgICAoKSA9PiBwcm9wcy5iZWhhdmlvciArIHByb3BzLmJyZWFrcG9pbnQsXG4gICAgICB1cGRhdGVCZWxvd0JyZWFrcG9pbnRcbiAgICApXG5cbiAgICB3YXRjaCgkbGF5b3V0LmlzQ29udGFpbmVyLCB2YWwgPT4ge1xuICAgICAgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSAmJiBwcmV2ZW50Qm9keVNjcm9sbCh2YWwgIT09IHRydWUpXG4gICAgICB2YWwgPT09IHRydWUgJiYgdXBkYXRlQmVsb3dCcmVha3BvaW50KClcbiAgICB9KVxuXG4gICAgd2F0Y2goJGxheW91dC5zY3JvbGxiYXJXaWR0aCwgKCkgPT4ge1xuICAgICAgYXBwbHlQb3NpdGlvbihzaG93aW5nLnZhbHVlID09PSB0cnVlID8gMCA6IHZvaWQgMClcbiAgICB9KVxuXG4gICAgd2F0Y2gob2Zmc2V0LCB2YWwgPT4geyB1cGRhdGVMYXlvdXQoJ29mZnNldCcsIHZhbCkgfSlcblxuICAgIHdhdGNoKG9uTGF5b3V0LCB2YWwgPT4ge1xuICAgICAgZW1pdCgnb25MYXlvdXQnLCB2YWwpXG4gICAgICB1cGRhdGVMYXlvdXQoJ3NwYWNlJywgdmFsKVxuICAgIH0pXG5cbiAgICB3YXRjaChyaWdodFNpZGUsICgpID0+IHsgYXBwbHlQb3NpdGlvbigpIH0pXG5cbiAgICB3YXRjaChzaXplLCB2YWwgPT4ge1xuICAgICAgYXBwbHlQb3NpdGlvbigpXG4gICAgICB1cGRhdGVTaXplT25MYXlvdXQocHJvcHMubWluaVRvT3ZlcmxheSwgdmFsKVxuICAgIH0pXG5cbiAgICB3YXRjaCgoKSA9PiBwcm9wcy5taW5pVG9PdmVybGF5LCB2YWwgPT4ge1xuICAgICAgdXBkYXRlU2l6ZU9uTGF5b3V0KHZhbCwgc2l6ZS52YWx1ZSlcbiAgICB9KVxuXG4gICAgd2F0Y2goKCkgPT4gJHEubGFuZy5ydGwsICgpID0+IHsgYXBwbHlQb3NpdGlvbigpIH0pXG5cbiAgICB3YXRjaCgoKSA9PiBwcm9wcy5taW5pLCAoKSA9PiB7XG4gICAgICBpZiAocHJvcHMubm9NaW5pQW5pbWF0aW9uKSByZXR1cm5cbiAgICAgIGlmIChwcm9wcy5tb2RlbFZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGFuaW1hdGVNaW5pKClcbiAgICAgICAgJGxheW91dC5hbmltYXRlKClcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgd2F0Y2goaXNNaW5pLCB2YWwgPT4geyBlbWl0KCdtaW5pU3RhdGUnLCB2YWwpIH0pXG5cbiAgICBmdW5jdGlvbiBhcHBseVBvc2l0aW9uIChwb3NpdGlvbikge1xuICAgICAgaWYgKHBvc2l0aW9uID09PSB2b2lkIDApIHtcbiAgICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgIHBvc2l0aW9uID0gc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSA/IDAgOiBzaXplLnZhbHVlXG4gICAgICAgICAgYXBwbHlQb3NpdGlvbihzdGF0ZURpcmVjdGlvbi52YWx1ZSAqIHBvc2l0aW9uKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAkbGF5b3V0LmlzQ29udGFpbmVyLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgJiYgcmlnaHRTaWRlLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgJiYgKGJlbG93QnJlYWtwb2ludC52YWx1ZSA9PT0gdHJ1ZSB8fCBNYXRoLmFicyhwb3NpdGlvbikgPT09IHNpemUudmFsdWUpXG4gICAgICAgICkge1xuICAgICAgICAgIHBvc2l0aW9uICs9IHN0YXRlRGlyZWN0aW9uLnZhbHVlICogJGxheW91dC5zY3JvbGxiYXJXaWR0aC52YWx1ZVxuICAgICAgICB9XG5cbiAgICAgICAgZmxhZ0NvbnRlbnRQb3NpdGlvbi52YWx1ZSA9IHBvc2l0aW9uXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXBwbHlCYWNrZHJvcCAoeCkge1xuICAgICAgZmxhZ0JhY2tkcm9wQmcudmFsdWUgPSB4XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0U2Nyb2xsYWJsZSAodikge1xuICAgICAgY29uc3QgYWN0aW9uID0gdiA9PT0gdHJ1ZVxuICAgICAgICA/ICdyZW1vdmUnXG4gICAgICAgIDogKCRsYXlvdXQuaXNDb250YWluZXIudmFsdWUgIT09IHRydWUgPyAnYWRkJyA6ICcnKVxuXG4gICAgICBhY3Rpb24gIT09ICcnICYmIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0WyBhY3Rpb24gXSgncS1ib2R5LS1kcmF3ZXItdG9nZ2xlJylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhbmltYXRlTWluaSAoKSB7XG4gICAgICB0aW1lck1pbmkgIT09IG51bGwgJiYgY2xlYXJUaW1lb3V0KHRpbWVyTWluaSlcblxuICAgICAgaWYgKHZtLnByb3h5ICYmIHZtLnByb3h5LiRlbCkge1xuICAgICAgICAvLyBuZWVkIHRvIHNwZWVkIGl0IHVwIGFuZCBhcHBseSBpdCBpbW1lZGlhdGVseSxcbiAgICAgICAgLy8gZXZlbiBmYXN0ZXIgdGhhbiBWdWUncyBuZXh0VGljayFcbiAgICAgICAgdm0ucHJveHkuJGVsLmNsYXNzTGlzdC5hZGQoJ3EtZHJhd2VyLS1taW5pLWFuaW1hdGUnKVxuICAgICAgfVxuXG4gICAgICBmbGFnTWluaUFuaW1hdGUudmFsdWUgPSB0cnVlXG4gICAgICB0aW1lck1pbmkgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGltZXJNaW5pID0gbnVsbFxuICAgICAgICBmbGFnTWluaUFuaW1hdGUudmFsdWUgPSBmYWxzZVxuICAgICAgICB2bT8ucHJveHk/LiRlbD8uY2xhc3NMaXN0LnJlbW92ZSgncS1kcmF3ZXItLW1pbmktYW5pbWF0ZScpXG4gICAgICB9LCAxNTApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25PcGVuUGFuIChldnQpIHtcbiAgICAgIGlmIChzaG93aW5nLnZhbHVlICE9PSBmYWxzZSkge1xuICAgICAgICAvLyBzb21lIGJyb3dzZXJzIG1pZ2h0IGNhcHR1cmUgYW5kIHRyaWdnZXIgdGhpc1xuICAgICAgICAvLyBldmVuIGlmIERyYXdlciBoYXMganVzdCBiZWVuIG9wZW5lZCAoYnV0IGFuaW1hdGlvbiBpcyBzdGlsbCBwZW5kaW5nKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3RcbiAgICAgICAgd2lkdGggPSBzaXplLnZhbHVlLFxuICAgICAgICBwb3NpdGlvbiA9IGJldHdlZW4oZXZ0LmRpc3RhbmNlLngsIDAsIHdpZHRoKVxuXG4gICAgICBpZiAoZXZ0LmlzRmluYWwgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3Qgb3BlbmVkID0gcG9zaXRpb24gPj0gTWF0aC5taW4oNzUsIHdpZHRoKVxuXG4gICAgICAgIGlmIChvcGVuZWQgPT09IHRydWUpIHtcbiAgICAgICAgICBzaG93KClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAkbGF5b3V0LmFuaW1hdGUoKVxuICAgICAgICAgIGFwcGx5QmFja2Ryb3AoMClcbiAgICAgICAgICBhcHBseVBvc2l0aW9uKHN0YXRlRGlyZWN0aW9uLnZhbHVlICogd2lkdGgpXG4gICAgICAgIH1cblxuICAgICAgICBmbGFnUGFubmluZy52YWx1ZSA9IGZhbHNlXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBhcHBseVBvc2l0aW9uKFxuICAgICAgICAoJHEubGFuZy5ydGwgPT09IHRydWUgPyByaWdodFNpZGUudmFsdWUgIT09IHRydWUgOiByaWdodFNpZGUudmFsdWUpXG4gICAgICAgICAgPyBNYXRoLm1heCh3aWR0aCAtIHBvc2l0aW9uLCAwKVxuICAgICAgICAgIDogTWF0aC5taW4oMCwgcG9zaXRpb24gLSB3aWR0aClcbiAgICAgIClcbiAgICAgIGFwcGx5QmFja2Ryb3AoXG4gICAgICAgIGJldHdlZW4ocG9zaXRpb24gLyB3aWR0aCwgMCwgMSlcbiAgICAgIClcblxuICAgICAgaWYgKGV2dC5pc0ZpcnN0ID09PSB0cnVlKSB7XG4gICAgICAgIGZsYWdQYW5uaW5nLnZhbHVlID0gdHJ1ZVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uQ2xvc2VQYW4gKGV2dCkge1xuICAgICAgaWYgKHNob3dpbmcudmFsdWUgIT09IHRydWUpIHtcbiAgICAgICAgLy8gc29tZSBicm93c2VycyBtaWdodCBjYXB0dXJlIGFuZCB0cmlnZ2VyIHRoaXNcbiAgICAgICAgLy8gZXZlbiBpZiBEcmF3ZXIgaGFzIGp1c3QgYmVlbiBjbG9zZWQgKGJ1dCBhbmltYXRpb24gaXMgc3RpbGwgcGVuZGluZylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0XG4gICAgICAgIHdpZHRoID0gc2l6ZS52YWx1ZSxcbiAgICAgICAgZGlyID0gZXZ0LmRpcmVjdGlvbiA9PT0gcHJvcHMuc2lkZSxcbiAgICAgICAgcG9zaXRpb24gPSAoJHEubGFuZy5ydGwgPT09IHRydWUgPyBkaXIgIT09IHRydWUgOiBkaXIpXG4gICAgICAgICAgPyBiZXR3ZWVuKGV2dC5kaXN0YW5jZS54LCAwLCB3aWR0aClcbiAgICAgICAgICA6IDBcblxuICAgICAgaWYgKGV2dC5pc0ZpbmFsID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IG9wZW5lZCA9IE1hdGguYWJzKHBvc2l0aW9uKSA8IE1hdGgubWluKDc1LCB3aWR0aClcblxuICAgICAgICBpZiAob3BlbmVkID09PSB0cnVlKSB7XG4gICAgICAgICAgJGxheW91dC5hbmltYXRlKClcbiAgICAgICAgICBhcHBseUJhY2tkcm9wKDEpXG4gICAgICAgICAgYXBwbHlQb3NpdGlvbigwKVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGhpZGUoKVxuICAgICAgICB9XG5cbiAgICAgICAgZmxhZ1Bhbm5pbmcudmFsdWUgPSBmYWxzZVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgYXBwbHlQb3NpdGlvbihzdGF0ZURpcmVjdGlvbi52YWx1ZSAqIHBvc2l0aW9uKVxuICAgICAgYXBwbHlCYWNrZHJvcChiZXR3ZWVuKDEgLSBwb3NpdGlvbiAvIHdpZHRoLCAwLCAxKSlcblxuICAgICAgaWYgKGV2dC5pc0ZpcnN0ID09PSB0cnVlKSB7XG4gICAgICAgIGZsYWdQYW5uaW5nLnZhbHVlID0gdHJ1ZVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsZWFudXAgKCkge1xuICAgICAgcHJldmVudEJvZHlTY3JvbGwoZmFsc2UpXG4gICAgICBzZXRTY3JvbGxhYmxlKHRydWUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlTGF5b3V0IChwcm9wLCB2YWwpIHtcbiAgICAgICRsYXlvdXQudXBkYXRlKHByb3BzLnNpZGUsIHByb3AsIHZhbClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVMb2NhbCAocHJvcCwgdmFsKSB7XG4gICAgICBpZiAocHJvcC52YWx1ZSAhPT0gdmFsKSB7XG4gICAgICAgIHByb3AudmFsdWUgPSB2YWxcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVTaXplT25MYXlvdXQgKG1pbmlUb092ZXJsYXksIHNpemUpIHtcbiAgICAgIHVwZGF0ZUxheW91dCgnc2l6ZScsIG1pbmlUb092ZXJsYXkgPT09IHRydWUgPyBwcm9wcy5taW5pV2lkdGggOiBzaXplKVxuICAgIH1cblxuICAgICRsYXlvdXQuaW5zdGFuY2VzWyBwcm9wcy5zaWRlIF0gPSBpbnN0YW5jZVxuICAgIHVwZGF0ZVNpemVPbkxheW91dChwcm9wcy5taW5pVG9PdmVybGF5LCBzaXplLnZhbHVlKVxuICAgIHVwZGF0ZUxheW91dCgnc3BhY2UnLCBvbkxheW91dC52YWx1ZSlcbiAgICB1cGRhdGVMYXlvdXQoJ29mZnNldCcsIG9mZnNldC52YWx1ZSlcblxuICAgIGlmIChcbiAgICAgIHByb3BzLnNob3dJZkFib3ZlID09PSB0cnVlXG4gICAgICAmJiBwcm9wcy5tb2RlbFZhbHVlICE9PSB0cnVlXG4gICAgICAmJiBzaG93aW5nLnZhbHVlID09PSB0cnVlXG4gICAgICAmJiBwcm9wc1sgJ29uVXBkYXRlOm1vZGVsVmFsdWUnIF0gIT09IHZvaWQgMFxuICAgICkge1xuICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCB0cnVlKVxuICAgIH1cblxuICAgIG9uTW91bnRlZCgoKSA9PiB7XG4gICAgICBlbWl0KCdvbkxheW91dCcsIG9uTGF5b3V0LnZhbHVlKVxuICAgICAgZW1pdCgnbWluaVN0YXRlJywgaXNNaW5pLnZhbHVlKVxuXG4gICAgICBsYXN0RGVza3RvcFN0YXRlID0gcHJvcHMuc2hvd0lmQWJvdmUgPT09IHRydWVcblxuICAgICAgY29uc3QgZm4gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFjdGlvbiA9IHNob3dpbmcudmFsdWUgPT09IHRydWUgPyBoYW5kbGVTaG93IDogaGFuZGxlSGlkZVxuICAgICAgICBhY3Rpb24oZmFsc2UsIHRydWUpXG4gICAgICB9XG5cbiAgICAgIGlmICgkbGF5b3V0LnRvdGFsV2lkdGgudmFsdWUgIT09IDApIHtcbiAgICAgICAgLy8gbWFrZSBzdXJlIHRoYXQgYWxsIGNvbXB1dGVkIHByb3BlcnRpZXNcbiAgICAgICAgLy8gaGF2ZSBiZWVuIHVwZGF0ZWQgYmVmb3JlIGNhbGxpbmcgaGFuZGxlU2hvdy9oYW5kbGVIaWRlKClcbiAgICAgICAgbmV4dFRpY2soZm4pXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBsYXlvdXRUb3RhbFdpZHRoV2F0Y2hlciA9IHdhdGNoKCRsYXlvdXQudG90YWxXaWR0aCwgKCkgPT4ge1xuICAgICAgICBsYXlvdXRUb3RhbFdpZHRoV2F0Y2hlcigpXG4gICAgICAgIGxheW91dFRvdGFsV2lkdGhXYXRjaGVyID0gdm9pZCAwXG5cbiAgICAgICAgaWYgKHNob3dpbmcudmFsdWUgPT09IGZhbHNlICYmIHByb3BzLnNob3dJZkFib3ZlID09PSB0cnVlICYmIGJlbG93QnJlYWtwb2ludC52YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBzaG93KGZhbHNlKVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGZuKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuXG4gICAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICAgIGxheW91dFRvdGFsV2lkdGhXYXRjaGVyPy4oKVxuXG4gICAgICBpZiAodGltZXJNaW5pICE9PSBudWxsKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lck1pbmkpXG4gICAgICAgIHRpbWVyTWluaSA9IG51bGxcbiAgICAgIH1cblxuICAgICAgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSAmJiBjbGVhbnVwKClcblxuICAgICAgaWYgKCRsYXlvdXQuaW5zdGFuY2VzWyBwcm9wcy5zaWRlIF0gPT09IGluc3RhbmNlKSB7XG4gICAgICAgICRsYXlvdXQuaW5zdGFuY2VzWyBwcm9wcy5zaWRlIF0gPSB2b2lkIDBcbiAgICAgICAgdXBkYXRlTGF5b3V0KCdzaXplJywgMClcbiAgICAgICAgdXBkYXRlTGF5b3V0KCdvZmZzZXQnLCAwKVxuICAgICAgICB1cGRhdGVMYXlvdXQoJ3NwYWNlJywgZmFsc2UpXG4gICAgICB9XG4gICAgfSlcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjb25zdCBjaGlsZCA9IFtdXG5cbiAgICAgIGlmIChiZWxvd0JyZWFrcG9pbnQudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgcHJvcHMubm9Td2lwZU9wZW4gPT09IGZhbHNlICYmIGNoaWxkLnB1c2goXG4gICAgICAgICAgd2l0aERpcmVjdGl2ZXMoXG4gICAgICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgICAgIGtleTogJ29wZW4nLFxuICAgICAgICAgICAgICBjbGFzczogYHEtZHJhd2VyX19vcGVuZXIgZml4ZWQtJHsgcHJvcHMuc2lkZSB9YCxcbiAgICAgICAgICAgICAgJ2FyaWEtaGlkZGVuJzogJ3RydWUnXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG9wZW5EaXJlY3RpdmUudmFsdWVcbiAgICAgICAgICApXG4gICAgICAgIClcblxuICAgICAgICBjaGlsZC5wdXNoKFxuICAgICAgICAgIGhEaXIoXG4gICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcmVmOiAnYmFja2Ryb3AnLFxuICAgICAgICAgICAgICBjbGFzczogYmFja2Ryb3BDbGFzcy52YWx1ZSxcbiAgICAgICAgICAgICAgc3R5bGU6IGJhY2tkcm9wU3R5bGUudmFsdWUsXG4gICAgICAgICAgICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJyxcbiAgICAgICAgICAgICAgb25DbGljazogaGlkZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHZvaWQgMCxcbiAgICAgICAgICAgICdiYWNrZHJvcCcsXG4gICAgICAgICAgICBwcm9wcy5ub1N3aXBlQmFja2Ryb3AgIT09IHRydWUgJiYgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSxcbiAgICAgICAgICAgICgpID0+IGJhY2tkcm9wQ2xvc2VEaXJlY3RpdmUudmFsdWVcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgY29uc3QgbWluaSA9IGlzTWluaS52YWx1ZSA9PT0gdHJ1ZSAmJiBzbG90cy5taW5pICE9PSB2b2lkIDBcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBbXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAuLi5hdHRycyxcbiAgICAgICAgICBrZXk6ICcnICsgbWluaSwgLy8gcmVxdWlyZWQgb3RoZXJ3aXNlIFZ1ZSB3aWxsIG5vdCBkaWZmIGNvcnJlY3RseVxuICAgICAgICAgIGNsYXNzOiBbXG4gICAgICAgICAgICBjb250ZW50Q2xhc3MudmFsdWUsXG4gICAgICAgICAgICBhdHRycy5jbGFzc1xuICAgICAgICAgIF1cbiAgICAgICAgfSwgbWluaSA9PT0gdHJ1ZVxuICAgICAgICAgID8gc2xvdHMubWluaSgpXG4gICAgICAgICAgOiBoU2xvdChzbG90cy5kZWZhdWx0KVxuICAgICAgICApXG4gICAgICBdXG5cbiAgICAgIGlmIChwcm9wcy5lbGV2YXRlZCA9PT0gdHJ1ZSAmJiBzaG93aW5nLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnRlbnQucHVzaChcbiAgICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgICBjbGFzczogJ3EtbGF5b3V0X19zaGFkb3cgYWJzb2x1dGUtZnVsbCBvdmVyZmxvdy1oaWRkZW4gbm8tcG9pbnRlci1ldmVudHMnXG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICBjaGlsZC5wdXNoKFxuICAgICAgICBoRGlyKFxuICAgICAgICAgICdhc2lkZScsXG4gICAgICAgICAgeyByZWY6ICdjb250ZW50JywgY2xhc3M6IGNsYXNzZXMudmFsdWUsIHN0eWxlOiBzdHlsZS52YWx1ZSB9LFxuICAgICAgICAgIGNvbnRlbnQsXG4gICAgICAgICAgJ2NvbnRlbnRjbG9zZScsXG4gICAgICAgICAgcHJvcHMubm9Td2lwZUNsb3NlICE9PSB0cnVlICYmIGJlbG93QnJlYWtwb2ludC52YWx1ZSA9PT0gdHJ1ZSxcbiAgICAgICAgICAoKSA9PiBjb250ZW50Q2xvc2VEaXJlY3RpdmUudmFsdWVcbiAgICAgICAgKVxuICAgICAgKVxuXG4gICAgICByZXR1cm4gaCgnZGl2JywgeyBjbGFzczogJ3EtZHJhd2VyLWNvbnRhaW5lcicgfSwgY2hpbGQpXG4gICAgfVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQsIHByb3ZpZGUsIGluamVjdCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcbmltcG9ydCB7IHBhZ2VDb250YWluZXJLZXksIGxheW91dEtleSwgZW1wdHlSZW5kZXJGbiB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuc3ltYm9scy9zeW1ib2xzLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVBhZ2VDb250YWluZXInLFxuXG4gIHNldHVwIChfLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCB7IHByb3h5OiB7ICRxIH0gfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgICBjb25zdCAkbGF5b3V0ID0gaW5qZWN0KGxheW91dEtleSwgZW1wdHlSZW5kZXJGbilcbiAgICBpZiAoJGxheW91dCA9PT0gZW1wdHlSZW5kZXJGbikge1xuICAgICAgY29uc29sZS5lcnJvcignUVBhZ2VDb250YWluZXIgbmVlZHMgdG8gYmUgY2hpbGQgb2YgUUxheW91dCcpXG4gICAgICByZXR1cm4gZW1wdHlSZW5kZXJGblxuICAgIH1cblxuICAgIHByb3ZpZGUocGFnZUNvbnRhaW5lcktleSwgdHJ1ZSlcblxuICAgIGNvbnN0IHN0eWxlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgY3NzID0ge31cblxuICAgICAgaWYgKCRsYXlvdXQuaGVhZGVyLnNwYWNlID09PSB0cnVlKSB7XG4gICAgICAgIGNzcy5wYWRkaW5nVG9wID0gYCR7ICRsYXlvdXQuaGVhZGVyLnNpemUgfXB4YFxuICAgICAgfVxuICAgICAgaWYgKCRsYXlvdXQucmlnaHQuc3BhY2UgPT09IHRydWUpIHtcbiAgICAgICAgY3NzWyBgcGFkZGluZyR7ICRxLmxhbmcucnRsID09PSB0cnVlID8gJ0xlZnQnIDogJ1JpZ2h0JyB9YCBdID0gYCR7ICRsYXlvdXQucmlnaHQuc2l6ZSB9cHhgXG4gICAgICB9XG4gICAgICBpZiAoJGxheW91dC5mb290ZXIuc3BhY2UgPT09IHRydWUpIHtcbiAgICAgICAgY3NzLnBhZGRpbmdCb3R0b20gPSBgJHsgJGxheW91dC5mb290ZXIuc2l6ZSB9cHhgXG4gICAgICB9XG4gICAgICBpZiAoJGxheW91dC5sZWZ0LnNwYWNlID09PSB0cnVlKSB7XG4gICAgICAgIGNzc1sgYHBhZGRpbmckeyAkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/ICdSaWdodCcgOiAnTGVmdCcgfWAgXSA9IGAkeyAkbGF5b3V0LmxlZnQuc2l6ZSB9cHhgXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjc3NcbiAgICB9KVxuXG4gICAgcmV0dXJuICgpID0+IGgoJ2RpdicsIHtcbiAgICAgIGNsYXNzOiAncS1wYWdlLWNvbnRhaW5lcicsXG4gICAgICBzdHlsZTogc3R5bGUudmFsdWVcbiAgICB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgfVxufSlcbiIsImltcG9ydCB7IHdhdGNoLCBvbk1vdW50ZWQsIG9uQmVmb3JlVW5tb3VudCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBnZXRTY3JvbGxUYXJnZXQsIGdldFZlcnRpY2FsU2Nyb2xsUG9zaXRpb24sIGdldEhvcml6b250YWxTY3JvbGxQb3NpdGlvbiwgc2Nyb2xsVGFyZ2V0UHJvcCB9IGZyb20gJy4uLy4uL3V0aWxzL3Njcm9sbC9zY3JvbGwuanMnXG5pbXBvcnQgeyBsaXN0ZW5PcHRzLCBub29wIH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnQvZXZlbnQuanMnXG5cbmNvbnN0IHsgcGFzc2l2ZSB9ID0gbGlzdGVuT3B0c1xuY29uc3QgYXhpc1ZhbHVlcyA9IFsgJ2JvdGgnLCAnaG9yaXpvbnRhbCcsICd2ZXJ0aWNhbCcgXVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVNjcm9sbE9ic2VydmVyJyxcblxuICBwcm9wczoge1xuICAgIGF4aXM6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbGlkYXRvcjogdiA9PiBheGlzVmFsdWVzLmluY2x1ZGVzKHYpLFxuICAgICAgZGVmYXVsdDogJ3ZlcnRpY2FsJ1xuICAgIH0sXG5cbiAgICBkZWJvdW5jZTogWyBTdHJpbmcsIE51bWJlciBdLFxuXG4gICAgc2Nyb2xsVGFyZ2V0OiBzY3JvbGxUYXJnZXRQcm9wXG4gIH0sXG5cbiAgZW1pdHM6IFsgJ3Njcm9sbCcgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgZW1pdCB9KSB7XG4gICAgY29uc3Qgc2Nyb2xsID0ge1xuICAgICAgcG9zaXRpb246IHtcbiAgICAgICAgdG9wOiAwLFxuICAgICAgICBsZWZ0OiAwXG4gICAgICB9LFxuXG4gICAgICBkaXJlY3Rpb246ICdkb3duJyxcbiAgICAgIGRpcmVjdGlvbkNoYW5nZWQ6IGZhbHNlLFxuXG4gICAgICBkZWx0YToge1xuICAgICAgICB0b3A6IDAsXG4gICAgICAgIGxlZnQ6IDBcbiAgICAgIH0sXG5cbiAgICAgIGluZmxlY3Rpb25Qb2ludDoge1xuICAgICAgICB0b3A6IDAsXG4gICAgICAgIGxlZnQ6IDBcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgY2xlYXJUaW1lciA9IG51bGwsIGxvY2FsU2Nyb2xsVGFyZ2V0LCBwYXJlbnRFbFxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMuc2Nyb2xsVGFyZ2V0LCAoKSA9PiB7XG4gICAgICB1bmNvbmZpZ3VyZVNjcm9sbFRhcmdldCgpXG4gICAgICBjb25maWd1cmVTY3JvbGxUYXJnZXQoKVxuICAgIH0pXG5cbiAgICBmdW5jdGlvbiBlbWl0RXZlbnQgKCkge1xuICAgICAgY2xlYXJUaW1lcj8uKClcblxuICAgICAgY29uc3QgdG9wID0gTWF0aC5tYXgoMCwgZ2V0VmVydGljYWxTY3JvbGxQb3NpdGlvbihsb2NhbFNjcm9sbFRhcmdldCkpXG4gICAgICBjb25zdCBsZWZ0ID0gZ2V0SG9yaXpvbnRhbFNjcm9sbFBvc2l0aW9uKGxvY2FsU2Nyb2xsVGFyZ2V0KVxuXG4gICAgICBjb25zdCBkZWx0YSA9IHtcbiAgICAgICAgdG9wOiB0b3AgLSBzY3JvbGwucG9zaXRpb24udG9wLFxuICAgICAgICBsZWZ0OiBsZWZ0IC0gc2Nyb2xsLnBvc2l0aW9uLmxlZnRcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICAocHJvcHMuYXhpcyA9PT0gJ3ZlcnRpY2FsJyAmJiBkZWx0YS50b3AgPT09IDApXG4gICAgICAgIHx8IChwcm9wcy5heGlzID09PSAnaG9yaXpvbnRhbCcgJiYgZGVsdGEubGVmdCA9PT0gMClcbiAgICAgICkgcmV0dXJuXG5cbiAgICAgIGNvbnN0IGN1ckRpciA9IE1hdGguYWJzKGRlbHRhLnRvcCkgPj0gTWF0aC5hYnMoZGVsdGEubGVmdClcbiAgICAgICAgPyAoZGVsdGEudG9wIDwgMCA/ICd1cCcgOiAnZG93bicpXG4gICAgICAgIDogKGRlbHRhLmxlZnQgPCAwID8gJ2xlZnQnIDogJ3JpZ2h0JylcblxuICAgICAgc2Nyb2xsLnBvc2l0aW9uID0geyB0b3AsIGxlZnQgfVxuICAgICAgc2Nyb2xsLmRpcmVjdGlvbkNoYW5nZWQgPSBzY3JvbGwuZGlyZWN0aW9uICE9PSBjdXJEaXJcbiAgICAgIHNjcm9sbC5kZWx0YSA9IGRlbHRhXG5cbiAgICAgIGlmIChzY3JvbGwuZGlyZWN0aW9uQ2hhbmdlZCA9PT0gdHJ1ZSkge1xuICAgICAgICBzY3JvbGwuZGlyZWN0aW9uID0gY3VyRGlyXG4gICAgICAgIHNjcm9sbC5pbmZsZWN0aW9uUG9pbnQgPSBzY3JvbGwucG9zaXRpb25cbiAgICAgIH1cblxuICAgICAgZW1pdCgnc2Nyb2xsJywgeyAuLi5zY3JvbGwgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb25maWd1cmVTY3JvbGxUYXJnZXQgKCkge1xuICAgICAgbG9jYWxTY3JvbGxUYXJnZXQgPSBnZXRTY3JvbGxUYXJnZXQocGFyZW50RWwsIHByb3BzLnNjcm9sbFRhcmdldClcbiAgICAgIGxvY2FsU2Nyb2xsVGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRyaWdnZXIsIHBhc3NpdmUpXG4gICAgICB0cmlnZ2VyKHRydWUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdW5jb25maWd1cmVTY3JvbGxUYXJnZXQgKCkge1xuICAgICAgaWYgKGxvY2FsU2Nyb2xsVGFyZ2V0ICE9PSB2b2lkIDApIHtcbiAgICAgICAgbG9jYWxTY3JvbGxUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdHJpZ2dlciwgcGFzc2l2ZSlcbiAgICAgICAgbG9jYWxTY3JvbGxUYXJnZXQgPSB2b2lkIDBcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmlnZ2VyIChpbW1lZGlhdGVseSkge1xuICAgICAgaWYgKGltbWVkaWF0ZWx5ID09PSB0cnVlIHx8IHByb3BzLmRlYm91bmNlID09PSAwIHx8IHByb3BzLmRlYm91bmNlID09PSAnMCcpIHtcbiAgICAgICAgZW1pdEV2ZW50KClcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGNsZWFyVGltZXIgPT09IG51bGwpIHtcbiAgICAgICAgY29uc3QgWyB0aW1lciwgZm4gXSA9IHByb3BzLmRlYm91bmNlXG4gICAgICAgICAgPyBbIHNldFRpbWVvdXQoZW1pdEV2ZW50LCBwcm9wcy5kZWJvdW5jZSksIGNsZWFyVGltZW91dCBdXG4gICAgICAgICAgOiBbIHJlcXVlc3RBbmltYXRpb25GcmFtZShlbWl0RXZlbnQpLCBjYW5jZWxBbmltYXRpb25GcmFtZSBdXG5cbiAgICAgICAgY2xlYXJUaW1lciA9ICgpID0+IHtcbiAgICAgICAgICBmbih0aW1lcilcbiAgICAgICAgICBjbGVhclRpbWVyID0gbnVsbFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgeyBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIHdhdGNoKCgpID0+IHByb3h5LiRxLmxhbmcucnRsLCBlbWl0RXZlbnQpXG5cbiAgICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgICAgcGFyZW50RWwgPSBwcm94eS4kZWwucGFyZW50Tm9kZVxuICAgICAgY29uZmlndXJlU2Nyb2xsVGFyZ2V0KClcbiAgICB9KVxuXG4gICAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICAgIGNsZWFyVGltZXI/LigpXG4gICAgICB1bmNvbmZpZ3VyZVNjcm9sbFRhcmdldCgpXG4gICAgfSlcblxuICAgIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kc1xuICAgIE9iamVjdC5hc3NpZ24ocHJveHksIHtcbiAgICAgIHRyaWdnZXIsXG4gICAgICBnZXRQb3NpdGlvbjogKCkgPT4gc2Nyb2xsXG4gICAgfSlcblxuICAgIHJldHVybiBub29wXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoLCByZWYsIHJlYWN0aXZlLCBjb21wdXRlZCwgd2F0Y2gsIHByb3ZpZGUsIG9uVW5tb3VudGVkLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGlzUnVudGltZVNzclByZUh5ZHJhdGlvbiB9IGZyb20gJy4uLy4uL3BsdWdpbnMvcGxhdGZvcm0vUGxhdGZvcm0uanMnXG5cbmltcG9ydCBRU2Nyb2xsT2JzZXJ2ZXIgZnJvbSAnLi4vc2Nyb2xsLW9ic2VydmVyL1FTY3JvbGxPYnNlcnZlci5qcydcbmltcG9ydCBRUmVzaXplT2JzZXJ2ZXIgZnJvbSAnLi4vcmVzaXplLW9ic2VydmVyL1FSZXNpemVPYnNlcnZlci5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgZ2V0U2Nyb2xsYmFyV2lkdGggfSBmcm9tICcuLi8uLi91dGlscy9zY3JvbGwvc2Nyb2xsLmpzJ1xuaW1wb3J0IHsgaE1lcmdlU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcbmltcG9ydCB7IGxheW91dEtleSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuc3ltYm9scy9zeW1ib2xzLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUxheW91dCcsXG5cbiAgcHJvcHM6IHtcbiAgICBjb250YWluZXI6IEJvb2xlYW4sXG4gICAgdmlldzoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2hoaCBscHIgZmZmJyxcbiAgICAgIHZhbGlkYXRvcjogdiA9PiAvXihofGwpaChofHIpIGxwciAoZnxsKWYoZnxyKSQvLnRlc3Qodi50b0xvd2VyQ2FzZSgpKVxuICAgIH0sXG5cbiAgICBvblNjcm9sbDogRnVuY3Rpb24sXG4gICAgb25TY3JvbGxIZWlnaHQ6IEZ1bmN0aW9uLFxuICAgIG9uUmVzaXplOiBGdW5jdGlvblxuICB9LFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCB9KSB7XG4gICAgY29uc3QgeyBwcm94eTogeyAkcSB9IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gICAgY29uc3Qgcm9vdFJlZiA9IHJlZihudWxsKVxuXG4gICAgLy8gcGFnZSByZWxhdGVkXG4gICAgY29uc3QgaGVpZ2h0ID0gcmVmKCRxLnNjcmVlbi5oZWlnaHQpXG4gICAgY29uc3Qgd2lkdGggPSByZWYocHJvcHMuY29udGFpbmVyID09PSB0cnVlID8gMCA6ICRxLnNjcmVlbi53aWR0aClcbiAgICBjb25zdCBzY3JvbGwgPSByZWYoeyBwb3NpdGlvbjogMCwgZGlyZWN0aW9uOiAnZG93bicsIGluZmxlY3Rpb25Qb2ludDogMCB9KVxuXG4gICAgLy8gY29udGFpbmVyIG9ubHkgcHJvcFxuICAgIGNvbnN0IGNvbnRhaW5lckhlaWdodCA9IHJlZigwKVxuICAgIGNvbnN0IHNjcm9sbGJhcldpZHRoID0gcmVmKGlzUnVudGltZVNzclByZUh5ZHJhdGlvbi52YWx1ZSA9PT0gdHJ1ZSA/IDAgOiBnZXRTY3JvbGxiYXJXaWR0aCgpKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1sYXlvdXQgcS1sYXlvdXQtLSdcbiAgICAgICsgKHByb3BzLmNvbnRhaW5lciA9PT0gdHJ1ZSA/ICdjb250YWluZXJpemVkJyA6ICdzdGFuZGFyZCcpXG4gICAgKVxuXG4gICAgY29uc3Qgc3R5bGUgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5jb250YWluZXIgPT09IGZhbHNlXG4gICAgICAgID8geyBtaW5IZWlnaHQ6ICRxLnNjcmVlbi5oZWlnaHQgKyAncHgnIH1cbiAgICAgICAgOiBudWxsXG4gICAgKSlcblxuICAgIC8vIHVzZWQgYnkgY29udGFpbmVyIG9ubHlcbiAgICBjb25zdCB0YXJnZXRTdHlsZSA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHNjcm9sbGJhcldpZHRoLnZhbHVlICE9PSAwXG4gICAgICAgID8geyBbICRxLmxhbmcucnRsID09PSB0cnVlID8gJ2xlZnQnIDogJ3JpZ2h0JyBdOiBgJHsgc2Nyb2xsYmFyV2lkdGgudmFsdWUgfXB4YCB9XG4gICAgICAgIDogbnVsbFxuICAgICkpXG5cbiAgICBjb25zdCB0YXJnZXRDaGlsZFN0eWxlID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgc2Nyb2xsYmFyV2lkdGgudmFsdWUgIT09IDBcbiAgICAgICAgPyB7XG4gICAgICAgICAgICBbICRxLmxhbmcucnRsID09PSB0cnVlID8gJ3JpZ2h0JyA6ICdsZWZ0JyBdOiAwLFxuICAgICAgICAgICAgWyAkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/ICdsZWZ0JyA6ICdyaWdodCcgXTogYC0keyBzY3JvbGxiYXJXaWR0aC52YWx1ZSB9cHhgLFxuICAgICAgICAgICAgd2lkdGg6IGBjYWxjKDEwMCUgKyAkeyBzY3JvbGxiYXJXaWR0aC52YWx1ZSB9cHgpYFxuICAgICAgICAgIH1cbiAgICAgICAgOiBudWxsXG4gICAgKSlcblxuICAgIGZ1bmN0aW9uIG9uUGFnZVNjcm9sbCAoZGF0YSkge1xuICAgICAgaWYgKHByb3BzLmNvbnRhaW5lciA9PT0gdHJ1ZSB8fCBkb2N1bWVudC5xU2Nyb2xsUHJldmVudGVkICE9PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IGluZm8gPSB7XG4gICAgICAgICAgcG9zaXRpb246IGRhdGEucG9zaXRpb24udG9wLFxuICAgICAgICAgIGRpcmVjdGlvbjogZGF0YS5kaXJlY3Rpb24sXG4gICAgICAgICAgZGlyZWN0aW9uQ2hhbmdlZDogZGF0YS5kaXJlY3Rpb25DaGFuZ2VkLFxuICAgICAgICAgIGluZmxlY3Rpb25Qb2ludDogZGF0YS5pbmZsZWN0aW9uUG9pbnQudG9wLFxuICAgICAgICAgIGRlbHRhOiBkYXRhLmRlbHRhLnRvcFxuICAgICAgICB9XG5cbiAgICAgICAgc2Nyb2xsLnZhbHVlID0gaW5mb1xuICAgICAgICBwcm9wcy5vblNjcm9sbCAhPT0gdm9pZCAwICYmIGVtaXQoJ3Njcm9sbCcsIGluZm8pXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25QYWdlUmVzaXplIChkYXRhKSB7XG4gICAgICBjb25zdCB7IGhlaWdodDogbmV3SGVpZ2h0LCB3aWR0aDogbmV3V2lkdGggfSA9IGRhdGFcbiAgICAgIGxldCByZXNpemVkID0gZmFsc2VcblxuICAgICAgaWYgKGhlaWdodC52YWx1ZSAhPT0gbmV3SGVpZ2h0KSB7XG4gICAgICAgIHJlc2l6ZWQgPSB0cnVlXG4gICAgICAgIGhlaWdodC52YWx1ZSA9IG5ld0hlaWdodFxuICAgICAgICBwcm9wcy5vblNjcm9sbEhlaWdodCAhPT0gdm9pZCAwICYmIGVtaXQoJ3Njcm9sbEhlaWdodCcsIG5ld0hlaWdodClcbiAgICAgICAgdXBkYXRlU2Nyb2xsYmFyV2lkdGgoKVxuICAgICAgfVxuICAgICAgaWYgKHdpZHRoLnZhbHVlICE9PSBuZXdXaWR0aCkge1xuICAgICAgICByZXNpemVkID0gdHJ1ZVxuICAgICAgICB3aWR0aC52YWx1ZSA9IG5ld1dpZHRoXG4gICAgICB9XG5cbiAgICAgIGlmIChyZXNpemVkID09PSB0cnVlICYmIHByb3BzLm9uUmVzaXplICE9PSB2b2lkIDApIHtcbiAgICAgICAgZW1pdCgncmVzaXplJywgZGF0YSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkNvbnRhaW5lclJlc2l6ZSAoeyBoZWlnaHQgfSkge1xuICAgICAgaWYgKGNvbnRhaW5lckhlaWdodC52YWx1ZSAhPT0gaGVpZ2h0KSB7XG4gICAgICAgIGNvbnRhaW5lckhlaWdodC52YWx1ZSA9IGhlaWdodFxuICAgICAgICB1cGRhdGVTY3JvbGxiYXJXaWR0aCgpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlU2Nyb2xsYmFyV2lkdGggKCkge1xuICAgICAgaWYgKHByb3BzLmNvbnRhaW5lciA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCB3aWR0aCA9IGhlaWdodC52YWx1ZSA+IGNvbnRhaW5lckhlaWdodC52YWx1ZVxuICAgICAgICAgID8gZ2V0U2Nyb2xsYmFyV2lkdGgoKVxuICAgICAgICAgIDogMFxuXG4gICAgICAgIGlmIChzY3JvbGxiYXJXaWR0aC52YWx1ZSAhPT0gd2lkdGgpIHtcbiAgICAgICAgICBzY3JvbGxiYXJXaWR0aC52YWx1ZSA9IHdpZHRoXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgYW5pbWF0ZVRpbWVyID0gbnVsbFxuXG4gICAgY29uc3QgJGxheW91dCA9IHtcbiAgICAgIGluc3RhbmNlczoge30sXG4gICAgICB2aWV3OiBjb21wdXRlZCgoKSA9PiBwcm9wcy52aWV3KSxcbiAgICAgIGlzQ29udGFpbmVyOiBjb21wdXRlZCgoKSA9PiBwcm9wcy5jb250YWluZXIpLFxuXG4gICAgICByb290UmVmLFxuXG4gICAgICBoZWlnaHQsXG4gICAgICBjb250YWluZXJIZWlnaHQsXG4gICAgICBzY3JvbGxiYXJXaWR0aCxcbiAgICAgIHRvdGFsV2lkdGg6IGNvbXB1dGVkKCgpID0+IHdpZHRoLnZhbHVlICsgc2Nyb2xsYmFyV2lkdGgudmFsdWUpLFxuXG4gICAgICByb3dzOiBjb21wdXRlZCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJvd3MgPSBwcm9wcy52aWV3LnRvTG93ZXJDYXNlKCkuc3BsaXQoJyAnKVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHRvcDogcm93c1sgMCBdLnNwbGl0KCcnKSxcbiAgICAgICAgICBtaWRkbGU6IHJvd3NbIDEgXS5zcGxpdCgnJyksXG4gICAgICAgICAgYm90dG9tOiByb3dzWyAyIF0uc3BsaXQoJycpXG4gICAgICAgIH1cbiAgICAgIH0pLFxuXG4gICAgICBoZWFkZXI6IHJlYWN0aXZlKHsgc2l6ZTogMCwgb2Zmc2V0OiAwLCBzcGFjZTogZmFsc2UgfSksXG4gICAgICByaWdodDogcmVhY3RpdmUoeyBzaXplOiAzMDAsIG9mZnNldDogMCwgc3BhY2U6IGZhbHNlIH0pLFxuICAgICAgZm9vdGVyOiByZWFjdGl2ZSh7IHNpemU6IDAsIG9mZnNldDogMCwgc3BhY2U6IGZhbHNlIH0pLFxuICAgICAgbGVmdDogcmVhY3RpdmUoeyBzaXplOiAzMDAsIG9mZnNldDogMCwgc3BhY2U6IGZhbHNlIH0pLFxuXG4gICAgICBzY3JvbGwsXG5cbiAgICAgIGFuaW1hdGUgKCkge1xuICAgICAgICBpZiAoYW5pbWF0ZVRpbWVyICE9PSBudWxsKSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KGFuaW1hdGVUaW1lcilcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3EtYm9keS0tbGF5b3V0LWFuaW1hdGUnKVxuICAgICAgICB9XG5cbiAgICAgICAgYW5pbWF0ZVRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgYW5pbWF0ZVRpbWVyID0gbnVsbFxuICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgncS1ib2R5LS1sYXlvdXQtYW5pbWF0ZScpXG4gICAgICAgIH0sIDE1NSlcbiAgICAgIH0sXG5cbiAgICAgIHVwZGF0ZSAocGFydCwgcHJvcCwgdmFsKSB7XG4gICAgICAgICRsYXlvdXRbIHBhcnQgXVsgcHJvcCBdID0gdmFsXG4gICAgICB9XG4gICAgfVxuXG4gICAgcHJvdmlkZShsYXlvdXRLZXksICRsYXlvdXQpXG5cbiAgICAvLyBwcmV2ZW50IHNjcm9sbGJhciBmbGlja2VyIHdoaWxlIHJlc2l6aW5nIHdpbmRvdyBoZWlnaHRcbiAgICAvLyBpZiBubyBwYWdlIHNjcm9sbGJhciBpcyBhbHJlYWR5IHByZXNlbnRcbiAgICBpZiAoX19RVUFTQVJfU1NSX1NFUlZFUl9fICE9PSB0cnVlICYmIGdldFNjcm9sbGJhcldpZHRoKCkgPiAwKSB7XG4gICAgICBsZXQgdGltZXIgPSBudWxsXG4gICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmJvZHlcblxuICAgICAgZnVuY3Rpb24gcmVzdG9yZVNjcm9sbGJhciAoKSB7XG4gICAgICAgIHRpbWVyID0gbnVsbFxuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlLXNjcm9sbGJhcicpXG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGhpZGVTY3JvbGxiYXIgKCkge1xuICAgICAgICBpZiAodGltZXIgPT09IG51bGwpIHtcbiAgICAgICAgICAvLyBpZiBpdCBoYXMgbm8gc2Nyb2xsYmFyIHRoZW4gdGhlcmUncyBub3RoaW5nIHRvIGRvXG4gICAgICAgICAgaWYgKGVsLnNjcm9sbEhlaWdodCA+ICRxLnNjcmVlbi5oZWlnaHQpIHJldHVyblxuXG4gICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnaGlkZS1zY3JvbGxiYXInKVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICAgICAgfVxuXG4gICAgICAgIHRpbWVyID0gc2V0VGltZW91dChyZXN0b3JlU2Nyb2xsYmFyLCAzMDApXG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHVwZGF0ZVNjcm9sbEV2ZW50IChhY3Rpb24pIHtcbiAgICAgICAgaWYgKHRpbWVyICE9PSBudWxsICYmIGFjdGlvbiA9PT0gJ3JlbW92ZScpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICAgICAgcmVzdG9yZVNjcm9sbGJhcigpXG4gICAgICAgIH1cblxuICAgICAgICB3aW5kb3dbIGAkeyBhY3Rpb24gfUV2ZW50TGlzdGVuZXJgIF0oJ3Jlc2l6ZScsIGhpZGVTY3JvbGxiYXIpXG4gICAgICB9XG5cbiAgICAgIHdhdGNoKFxuICAgICAgICAoKSA9PiAocHJvcHMuY29udGFpbmVyICE9PSB0cnVlID8gJ2FkZCcgOiAncmVtb3ZlJyksXG4gICAgICAgIHVwZGF0ZVNjcm9sbEV2ZW50XG4gICAgICApXG5cbiAgICAgIHByb3BzLmNvbnRhaW5lciAhPT0gdHJ1ZSAmJiB1cGRhdGVTY3JvbGxFdmVudCgnYWRkJylcblxuICAgICAgb25Vbm1vdW50ZWQoKCkgPT4ge1xuICAgICAgICB1cGRhdGVTY3JvbGxFdmVudCgncmVtb3ZlJylcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBoTWVyZ2VTbG90KHNsb3RzLmRlZmF1bHQsIFtcbiAgICAgICAgaChRU2Nyb2xsT2JzZXJ2ZXIsIHsgb25TY3JvbGw6IG9uUGFnZVNjcm9sbCB9KSxcbiAgICAgICAgaChRUmVzaXplT2JzZXJ2ZXIsIHsgb25SZXNpemU6IG9uUGFnZVJlc2l6ZSB9KVxuICAgICAgXSlcblxuICAgICAgY29uc3QgbGF5b3V0ID0gaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgICAgc3R5bGU6IHN0eWxlLnZhbHVlLFxuICAgICAgICByZWY6IHByb3BzLmNvbnRhaW5lciA9PT0gdHJ1ZSA/IHZvaWQgMCA6IHJvb3RSZWYsXG4gICAgICAgIHRhYmluZGV4OiAtMVxuICAgICAgfSwgY29udGVudClcblxuICAgICAgaWYgKHByb3BzLmNvbnRhaW5lciA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS1sYXlvdXQtY29udGFpbmVyIG92ZXJmbG93LWhpZGRlbicsXG4gICAgICAgICAgcmVmOiByb290UmVmXG4gICAgICAgIH0sIFtcbiAgICAgICAgICBoKFFSZXNpemVPYnNlcnZlciwgeyBvblJlc2l6ZTogb25Db250YWluZXJSZXNpemUgfSksXG4gICAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgICAgY2xhc3M6ICdhYnNvbHV0ZS1mdWxsJyxcbiAgICAgICAgICAgIHN0eWxlOiB0YXJnZXRTdHlsZS52YWx1ZVxuICAgICAgICAgIH0sIFtcbiAgICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAgY2xhc3M6ICdzY3JvbGwnLFxuICAgICAgICAgICAgICBzdHlsZTogdGFyZ2V0Q2hpbGRTdHlsZS52YWx1ZVxuICAgICAgICAgICAgfSwgWyBsYXlvdXQgXSlcbiAgICAgICAgICBdKVxuICAgICAgICBdKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbGF5b3V0XG4gICAgfVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5yZW5kZXIvcmVuZGVyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUl0ZW1TZWN0aW9uJyxcblxuICBwcm9wczoge1xuICAgIGF2YXRhcjogQm9vbGVhbixcbiAgICB0aHVtYm5haWw6IEJvb2xlYW4sXG4gICAgc2lkZTogQm9vbGVhbixcbiAgICB0b3A6IEJvb2xlYW4sXG4gICAgbm9XcmFwOiBCb29sZWFuXG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLWl0ZW1fX3NlY3Rpb24gY29sdW1uJ1xuICAgICAgKyBgIHEtaXRlbV9fc2VjdGlvbi0tJHsgcHJvcHMuYXZhdGFyID09PSB0cnVlIHx8IHByb3BzLnNpZGUgPT09IHRydWUgfHwgcHJvcHMudGh1bWJuYWlsID09PSB0cnVlID8gJ3NpZGUnIDogJ21haW4nIH1gXG4gICAgICArIChwcm9wcy50b3AgPT09IHRydWUgPyAnIHEtaXRlbV9fc2VjdGlvbi0tdG9wIGp1c3RpZnktc3RhcnQnIDogJyBqdXN0aWZ5LWNlbnRlcicpXG4gICAgICArIChwcm9wcy5hdmF0YXIgPT09IHRydWUgPyAnIHEtaXRlbV9fc2VjdGlvbi0tYXZhdGFyJyA6ICcnKVxuICAgICAgKyAocHJvcHMudGh1bWJuYWlsID09PSB0cnVlID8gJyBxLWl0ZW1fX3NlY3Rpb24tLXRodW1ibmFpbCcgOiAnJylcbiAgICAgICsgKHByb3BzLm5vV3JhcCA9PT0gdHJ1ZSA/ICcgcS1pdGVtX19zZWN0aW9uLS1ub3dyYXAnIDogJycpXG4gICAgKVxuXG4gICAgcmV0dXJuICgpID0+IGgoJ2RpdicsIHsgY2xhc3M6IGNsYXNzZXMudmFsdWUgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VEYXJrLCB7IHVzZURhcmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLWRhcmsvdXNlLWRhcmsuanMnXG5pbXBvcnQgdXNlUm91dGVyTGluaywgeyB1c2VSb3V0ZXJMaW5rUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1yb3V0ZXItbGluay91c2Utcm91dGVyLWxpbmsuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhVbmlxdWVTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5yZW5kZXIvcmVuZGVyLmpzJ1xuaW1wb3J0IHsgc3RvcEFuZFByZXZlbnQgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC9ldmVudC5qcydcbmltcG9ydCB7IGlzS2V5Q29kZSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUua2V5Ym9hcmQva2V5LWNvbXBvc2l0aW9uLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUl0ZW0nLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlRGFya1Byb3BzLFxuICAgIC4uLnVzZVJvdXRlckxpbmtQcm9wcyxcblxuICAgIHRhZzoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2RpdidcbiAgICB9LFxuXG4gICAgYWN0aXZlOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH0sXG5cbiAgICBjbGlja2FibGU6IEJvb2xlYW4sXG4gICAgZGVuc2U6IEJvb2xlYW4sXG4gICAgaW5zZXRMZXZlbDogTnVtYmVyLFxuXG4gICAgdGFiaW5kZXg6IFsgU3RyaW5nLCBOdW1iZXIgXSxcblxuICAgIGZvY3VzZWQ6IEJvb2xlYW4sXG4gICAgbWFudWFsRm9jdXM6IEJvb2xlYW5cbiAgfSxcblxuICBlbWl0czogWyAnY2xpY2snLCAna2V5dXAnIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0IH0pIHtcbiAgICBjb25zdCB7IHByb3h5OiB7ICRxIH0gfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgICBjb25zdCBpc0RhcmsgPSB1c2VEYXJrKHByb3BzLCAkcSlcbiAgICBjb25zdCB7IGhhc0xpbmssIGxpbmtBdHRycywgbGlua0NsYXNzLCBsaW5rVGFnLCBuYXZpZ2F0ZU9uQ2xpY2sgfSA9IHVzZVJvdXRlckxpbmsoKVxuXG4gICAgY29uc3Qgcm9vdFJlZiA9IHJlZihudWxsKVxuICAgIGNvbnN0IGJsdXJUYXJnZXRSZWYgPSByZWYobnVsbClcblxuICAgIGNvbnN0IGlzQWN0aW9uYWJsZSA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5jbGlja2FibGUgPT09IHRydWVcbiAgICAgICAgfHwgaGFzTGluay52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICB8fCBwcm9wcy50YWcgPT09ICdsYWJlbCdcbiAgICApXG5cbiAgICBjb25zdCBpc0NsaWNrYWJsZSA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5kaXNhYmxlICE9PSB0cnVlICYmIGlzQWN0aW9uYWJsZS52YWx1ZSA9PT0gdHJ1ZVxuICAgIClcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtaXRlbSBxLWl0ZW0tdHlwZSByb3cgbm8td3JhcCdcbiAgICAgICsgKHByb3BzLmRlbnNlID09PSB0cnVlID8gJyBxLWl0ZW0tLWRlbnNlJyA6ICcnKVxuICAgICAgKyAoaXNEYXJrLnZhbHVlID09PSB0cnVlID8gJyBxLWl0ZW0tLWRhcmsnIDogJycpXG4gICAgICArIChcbiAgICAgICAgaGFzTGluay52YWx1ZSA9PT0gdHJ1ZSAmJiBwcm9wcy5hY3RpdmUgPT09IG51bGxcbiAgICAgICAgICA/IGxpbmtDbGFzcy52YWx1ZVxuICAgICAgICAgIDogKFxuICAgICAgICAgICAgICBwcm9wcy5hY3RpdmUgPT09IHRydWVcbiAgICAgICAgICAgICAgICA/IGAgcS1pdGVtLS1hY3RpdmUkeyBwcm9wcy5hY3RpdmVDbGFzcyAhPT0gdm9pZCAwID8gYCAkeyBwcm9wcy5hY3RpdmVDbGFzcyB9YCA6ICcnIH1gXG4gICAgICAgICAgICAgICAgOiAnJ1xuICAgICAgICAgICAgKVxuICAgICAgKVxuICAgICAgKyAocHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSA/ICcgZGlzYWJsZWQnIDogJycpXG4gICAgICArIChcbiAgICAgICAgaXNDbGlja2FibGUudmFsdWUgPT09IHRydWVcbiAgICAgICAgICA/ICcgcS1pdGVtLS1jbGlja2FibGUgcS1saW5rIGN1cnNvci1wb2ludGVyICdcbiAgICAgICAgICAgICsgKHByb3BzLm1hbnVhbEZvY3VzID09PSB0cnVlID8gJ3EtbWFudWFsLWZvY3VzYWJsZScgOiAncS1mb2N1c2FibGUgcS1ob3ZlcmFibGUnKVxuICAgICAgICAgICAgKyAocHJvcHMuZm9jdXNlZCA9PT0gdHJ1ZSA/ICcgcS1tYW51YWwtZm9jdXNhYmxlLS1mb2N1c2VkJyA6ICcnKVxuICAgICAgICAgIDogJydcbiAgICAgIClcbiAgICApXG5cbiAgICBjb25zdCBzdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGlmIChwcm9wcy5pbnNldExldmVsID09PSB2b2lkIDApIHtcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGlyID0gJHEubGFuZy5ydGwgPT09IHRydWUgPyAnUmlnaHQnIDogJ0xlZnQnXG4gICAgICByZXR1cm4ge1xuICAgICAgICBbICdwYWRkaW5nJyArIGRpciBdOiAoMTYgKyBwcm9wcy5pbnNldExldmVsICogNTYpICsgJ3B4J1xuICAgICAgfVxuICAgIH0pXG5cbiAgICBmdW5jdGlvbiBvbkNsaWNrIChlKSB7XG4gICAgICBpZiAoaXNDbGlja2FibGUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgaWYgKGJsdXJUYXJnZXRSZWYudmFsdWUgIT09IG51bGwgJiYgZS5xQXZvaWRGb2N1cyAhPT0gdHJ1ZSkge1xuICAgICAgICAgIGlmIChlLnFLZXlFdmVudCAhPT0gdHJ1ZSAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSByb290UmVmLnZhbHVlKSB7XG4gICAgICAgICAgICBibHVyVGFyZ2V0UmVmLnZhbHVlLmZvY3VzKClcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gYmx1clRhcmdldFJlZi52YWx1ZSkge1xuICAgICAgICAgICAgcm9vdFJlZi52YWx1ZS5mb2N1cygpXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbmF2aWdhdGVPbkNsaWNrKGUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25LZXl1cCAoZSkge1xuICAgICAgaWYgKGlzQ2xpY2thYmxlLnZhbHVlID09PSB0cnVlICYmIGlzS2V5Q29kZShlLCBbIDEzLCAzMiBdKSA9PT0gdHJ1ZSkge1xuICAgICAgICBzdG9wQW5kUHJldmVudChlKVxuXG4gICAgICAgIC8vIGZvciByaXBwbGVcbiAgICAgICAgZS5xS2V5RXZlbnQgPSB0cnVlXG5cbiAgICAgICAgLy8gZm9yIGNsaWNrIHRyaWdnZXJcbiAgICAgICAgY29uc3QgZXZ0ID0gbmV3IE1vdXNlRXZlbnQoJ2NsaWNrJywgZSlcbiAgICAgICAgZXZ0LnFLZXlFdmVudCA9IHRydWVcbiAgICAgICAgcm9vdFJlZi52YWx1ZS5kaXNwYXRjaEV2ZW50KGV2dClcbiAgICAgIH1cblxuICAgICAgZW1pdCgna2V5dXAnLCBlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldENvbnRlbnQgKCkge1xuICAgICAgY29uc3QgY2hpbGQgPSBoVW5pcXVlU2xvdChzbG90cy5kZWZhdWx0LCBbXSlcblxuICAgICAgaXNDbGlja2FibGUudmFsdWUgPT09IHRydWUgJiYgY2hpbGQudW5zaGlmdChcbiAgICAgICAgaCgnZGl2JywgeyBjbGFzczogJ3EtZm9jdXMtaGVscGVyJywgdGFiaW5kZXg6IC0xLCByZWY6IGJsdXJUYXJnZXRSZWYgfSlcbiAgICAgIClcblxuICAgICAgcmV0dXJuIGNoaWxkXG4gICAgfVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIHJlZjogcm9vdFJlZixcbiAgICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUsXG4gICAgICAgIHN0eWxlOiBzdHlsZS52YWx1ZSxcbiAgICAgICAgcm9sZTogJ2xpc3RpdGVtJyxcbiAgICAgICAgb25DbGljayxcbiAgICAgICAgb25LZXl1cFxuICAgICAgfVxuXG4gICAgICBpZiAoaXNDbGlja2FibGUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgZGF0YS50YWJpbmRleCA9IHByb3BzLnRhYmluZGV4IHx8ICcwJ1xuICAgICAgICBPYmplY3QuYXNzaWduKGRhdGEsIGxpbmtBdHRycy52YWx1ZSlcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGlzQWN0aW9uYWJsZS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBkYXRhWyAnYXJpYS1kaXNhYmxlZCcgXSA9ICd0cnVlJ1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaChcbiAgICAgICAgbGlua1RhZy52YWx1ZSxcbiAgICAgICAgZGF0YSxcbiAgICAgICAgZ2V0Q29udGVudCgpXG4gICAgICApXG4gICAgfVxuICB9XG59KVxuIiwiPHRlbXBsYXRlPlxuICA8cS1pdGVtXG4gICAgY2xpY2thYmxlXG4gICAgdGFnPVwiYVwiXG4gICAgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICA6aHJlZj1cInByb3BzLmxpbmtcIlxuICA+XG4gICAgPHEtaXRlbS1zZWN0aW9uXG4gICAgICB2LWlmPVwicHJvcHMuaWNvblwiXG4gICAgICBhdmF0YXJcbiAgICA+XG4gICAgICA8cS1pY29uIDpuYW1lPVwicHJvcHMuaWNvblwiIC8+XG4gICAgPC9xLWl0ZW0tc2VjdGlvbj5cblxuICAgIDxxLWl0ZW0tc2VjdGlvbj5cbiAgICAgIDxxLWl0ZW0tbGFiZWw+e3sgcHJvcHMudGl0bGUgfX08L3EtaXRlbS1sYWJlbD5cbiAgICAgIDxxLWl0ZW0tbGFiZWwgY2FwdGlvbj57eyBwcm9wcy5jYXB0aW9uIH19PC9xLWl0ZW0tbGFiZWw+XG4gICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgPC9xLWl0ZW0+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuY29uc3QgcHJvcHMgPSBkZWZpbmVQcm9wcyh7XG4gIHRpdGxlOiB7XG4gICAgdHlwZTogU3RyaW5nLFxuICAgIHJlcXVpcmVkOiB0cnVlXG4gIH0sXG5cbiAgY2FwdGlvbjoge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICBkZWZhdWx0OiAnJ1xuICB9LFxuXG4gIGxpbms6IHtcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgZGVmYXVsdDogJyMnXG4gIH0sXG5cbiAgaWNvbjoge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICBkZWZhdWx0OiAnJ1xuICB9XG59KVxuPC9zY3JpcHQ+XG4iLCIvKipcbiAqIEJhc2VkIG9uIHRoZSB3b3JrIG9mIGh0dHBzOi8vZ2l0aHViLmNvbS9qY2hvb2svdXVpZC1yYW5kb21cbiAqL1xuXG5sZXRcbiAgYnVmLFxuICBidWZJZHggPSAwXG5jb25zdCBoZXhCeXRlcyA9IG5ldyBBcnJheSgyNTYpXG5cbi8vIFByZS1jYWxjdWxhdGUgdG9TdHJpbmcoMTYpIGZvciBzcGVlZFxuZm9yIChsZXQgaSA9IDA7IGkgPCAyNTY7IGkrKykge1xuICBoZXhCeXRlc1sgaSBdID0gKGkgKyAweDEwMCkudG9TdHJpbmcoMTYpLnN1YnN0cmluZygxKVxufVxuXG4vLyBVc2UgYmVzdCBhdmFpbGFibGUgUFJOR1xuY29uc3QgcmFuZG9tQnl0ZXMgPSAoKCkgPT4ge1xuICAvLyBOb2RlICYgQnJvd3NlciBzdXBwb3J0XG4gIGNvbnN0IGxpYiA9IHR5cGVvZiBjcnlwdG8gIT09ICd1bmRlZmluZWQnXG4gICAgPyBjcnlwdG9cbiAgICA6IChcbiAgICAgICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgICA/IHdpbmRvdy5jcnlwdG8gfHwgd2luZG93Lm1zQ3J5cHRvXG4gICAgICAgICAgOiB2b2lkIDBcbiAgICAgIClcblxuICBpZiAobGliICE9PSB2b2lkIDApIHtcbiAgICBpZiAobGliLnJhbmRvbUJ5dGVzICE9PSB2b2lkIDApIHtcbiAgICAgIHJldHVybiBsaWIucmFuZG9tQnl0ZXNcbiAgICB9XG4gICAgaWYgKGxpYi5nZXRSYW5kb21WYWx1ZXMgIT09IHZvaWQgMCkge1xuICAgICAgcmV0dXJuIG4gPT4ge1xuICAgICAgICBjb25zdCBieXRlcyA9IG5ldyBVaW50OEFycmF5KG4pXG4gICAgICAgIGxpYi5nZXRSYW5kb21WYWx1ZXMoYnl0ZXMpXG4gICAgICAgIHJldHVybiBieXRlc1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuID0+IHtcbiAgICBjb25zdCByID0gW11cbiAgICBmb3IgKGxldCBpID0gbjsgaSA+IDA7IGktLSkge1xuICAgICAgci5wdXNoKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1NikpXG4gICAgfVxuICAgIHJldHVybiByXG4gIH1cbn0pKClcblxuLy8gQnVmZmVyIHJhbmRvbSBudW1iZXJzIGZvciBzcGVlZFxuLy8gUmVkdWNlIG1lbW9yeSB1c2FnZSBieSBkZWNyZWFzaW5nIHRoaXMgbnVtYmVyIChtaW4gMTYpXG4vLyBvciBpbXByb3ZlIHNwZWVkIGJ5IGluY3JlYXNpbmcgdGhpcyBudW1iZXIgKHRyeSAxNjM4NClcbmNvbnN0IEJVRkZFUl9TSVpFID0gNDA5NlxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIC8vIEJ1ZmZlciBzb21lIHJhbmRvbSBieXRlcyBmb3Igc3BlZWRcbiAgaWYgKGJ1ZiA9PT0gdm9pZCAwIHx8IChidWZJZHggKyAxNiA+IEJVRkZFUl9TSVpFKSkge1xuICAgIGJ1ZklkeCA9IDBcbiAgICBidWYgPSByYW5kb21CeXRlcyhCVUZGRVJfU0laRSlcbiAgfVxuXG4gIGNvbnN0IGIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChidWYsIGJ1ZklkeCwgKGJ1ZklkeCArPSAxNikpXG4gIGJbIDYgXSA9IChiWyA2IF0gJiAweDBmKSB8IDB4NDBcbiAgYlsgOCBdID0gKGJbIDggXSAmIDB4M2YpIHwgMHg4MFxuXG4gIHJldHVybiBoZXhCeXRlc1sgYlsgMCBdIF0gKyBoZXhCeXRlc1sgYlsgMSBdIF1cbiAgICArIGhleEJ5dGVzWyBiWyAyIF0gXSArIGhleEJ5dGVzWyBiWyAzIF0gXSArICctJ1xuICAgICsgaGV4Qnl0ZXNbIGJbIDQgXSBdICsgaGV4Qnl0ZXNbIGJbIDUgXSBdICsgJy0nXG4gICAgKyBoZXhCeXRlc1sgYlsgNiBdIF0gKyBoZXhCeXRlc1sgYlsgNyBdIF0gKyAnLSdcbiAgICArIGhleEJ5dGVzWyBiWyA4IF0gXSArIGhleEJ5dGVzWyBiWyA5IF0gXSArICctJ1xuICAgICsgaGV4Qnl0ZXNbIGJbIDEwIF0gXSArIGhleEJ5dGVzWyBiWyAxMSBdIF1cbiAgICArIGhleEJ5dGVzWyBiWyAxMiBdIF0gKyBoZXhCeXRlc1sgYlsgMTMgXSBdXG4gICAgKyBoZXhCeXRlc1sgYlsgMTQgXSBdICsgaGV4Qnl0ZXNbIGJbIDE1IF0gXVxufVxuIiwiaW1wb3J0IHsgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIG9uTW91bnRlZCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVpZCBmcm9tICcuLi8uLi91dGlscy91aWQvdWlkLmpzJ1xuXG5pbXBvcnQgeyBpc1J1bnRpbWVTc3JQcmVIeWRyYXRpb24gfSBmcm9tICcuLi8uLi9wbHVnaW5zL3BsYXRmb3JtL1BsYXRmb3JtLmpzJ1xuXG5mdW5jdGlvbiBwYXJzZVZhbHVlICh2YWwpIHtcbiAgcmV0dXJuIHZhbCA9PT0gdm9pZCAwIHx8IHZhbCA9PT0gbnVsbFxuICAgID8gbnVsbFxuICAgIDogdmFsXG59XG5cbmZ1bmN0aW9uIGdldElkICh2YWwsIHJlcXVpcmVkKSB7XG4gIHJldHVybiB2YWwgPT09IHZvaWQgMCB8fCB2YWwgPT09IG51bGxcbiAgICA/IChyZXF1aXJlZCA9PT0gdHJ1ZSA/IGBmXyR7IHVpZCgpIH1gIDogbnVsbClcbiAgICA6IHZhbFxufVxuXG4vKipcbiAqIFJldHVybnMgYW4gXCJpZFwiIHdoaWNoIGlzIGEgcmVmKCkgdGhhdCBjYW4gYmUgdXNlZCBhc1xuICogYSB1bmlxdWUgaWRlbnRpZmllciB0byBhcHBseSB0byBhIERPTSBub2RlIGF0dHJpYnV0ZS5cbiAqXG4gKiBPbiBTU1IsIGl0IHRha2VzIGNhcmUgb2YgZ2VuZXJhdGluZyB0aGUgaWQgb24gdGhlIGNsaWVudCBzaWRlIChvbmx5KSB0b1xuICogYXZvaWQgaHlkcmF0aW9uIGVycm9ycy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHsgZ2V0VmFsdWUsIHJlcXVpcmVkID0gdHJ1ZSB9ID0ge30pIHtcbiAgaWYgKGlzUnVudGltZVNzclByZUh5ZHJhdGlvbi52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgIGNvbnN0IGlkID0gZ2V0VmFsdWUgIT09IHZvaWQgMFxuICAgICAgPyByZWYocGFyc2VWYWx1ZShnZXRWYWx1ZSgpKSlcbiAgICAgIDogcmVmKG51bGwpXG5cbiAgICBpZiAocmVxdWlyZWQgPT09IHRydWUgJiYgaWQudmFsdWUgPT09IG51bGwpIHtcbiAgICAgIG9uTW91bnRlZCgoKSA9PiB7XG4gICAgICAgIGlkLnZhbHVlID0gYGZfJHsgdWlkKCkgfWAgLy8gZ2V0SWQobnVsbCwgdHJ1ZSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgaWYgKGdldFZhbHVlICE9PSB2b2lkIDApIHtcbiAgICAgIHdhdGNoKGdldFZhbHVlLCBuZXdJZCA9PiB7XG4gICAgICAgIGlkLnZhbHVlID0gZ2V0SWQobmV3SWQsIHJlcXVpcmVkKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4gaWRcbiAgfVxuXG4gIHJldHVybiBnZXRWYWx1ZSAhPT0gdm9pZCAwXG4gICAgPyBjb21wdXRlZCgoKSA9PiBnZXRJZChnZXRWYWx1ZSgpLCByZXF1aXJlZCkpXG4gICAgOiByZWYoYGZfJHsgdWlkKCkgfWApIC8vIGdldElkKG51bGwsIHRydWUpXG59XG4iLCJpbXBvcnQgeyByZWYsIG9uQmVmb3JlVXBkYXRlLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmNvbnN0IGxpc3RlbmVyUkUgPSAvXm9uW0EtWl0vXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgeyBhdHRycywgdm5vZGUgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgY29uc3QgYWNjID0ge1xuICAgIGxpc3RlbmVyczogcmVmKHt9KSxcbiAgICBhdHRyaWJ1dGVzOiByZWYoe30pXG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGUgKCkge1xuICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSB7fVxuICAgIGNvbnN0IGxpc3RlbmVycyA9IHt9XG5cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBhdHRycykge1xuICAgICAgaWYgKGtleSAhPT0gJ2NsYXNzJyAmJiBrZXkgIT09ICdzdHlsZScgJiYgbGlzdGVuZXJSRS50ZXN0KGtleSkgPT09IGZhbHNlKSB7XG4gICAgICAgIGF0dHJpYnV0ZXNbIGtleSBdID0gYXR0cnNbIGtleSBdXG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gdm5vZGUucHJvcHMpIHtcbiAgICAgIGlmIChsaXN0ZW5lclJFLnRlc3Qoa2V5KSA9PT0gdHJ1ZSkge1xuICAgICAgICBsaXN0ZW5lcnNbIGtleSBdID0gdm5vZGUucHJvcHNbIGtleSBdXG4gICAgICB9XG4gICAgfVxuXG4gICAgYWNjLmF0dHJpYnV0ZXMudmFsdWUgPSBhdHRyaWJ1dGVzXG4gICAgYWNjLmxpc3RlbmVycy52YWx1ZSA9IGxpc3RlbmVyc1xuICB9XG5cbiAgb25CZWZvcmVVcGRhdGUodXBkYXRlKVxuXG4gIHVwZGF0ZSgpXG5cbiAgcmV0dXJuIGFjY1xufVxuIiwiaW1wb3J0IHsgaW5qZWN0LCB3YXRjaCwgZ2V0Q3VycmVudEluc3RhbmNlLCBvbk1vdW50ZWQsIG9uQmVmb3JlVW5tb3VudCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgZm9ybUtleSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuc3ltYm9scy9zeW1ib2xzLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoeyB2YWxpZGF0ZSwgcmVzZXRWYWxpZGF0aW9uLCByZXF1aXJlc1FGb3JtIH0pIHtcbiAgY29uc3QgJGZvcm0gPSBpbmplY3QoZm9ybUtleSwgZmFsc2UpXG5cbiAgaWYgKCRmb3JtICE9PSBmYWxzZSkge1xuICAgIGNvbnN0IHsgcHJvcHMsIHByb3h5IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gICAgLy8gZXhwb3J0IHB1YmxpYyBtZXRob2QgKHNvIGl0IGNhbiBiZSB1c2VkIGluIFFGb3JtKVxuICAgIE9iamVjdC5hc3NpZ24ocHJveHksIHsgdmFsaWRhdGUsIHJlc2V0VmFsaWRhdGlvbiB9KVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMuZGlzYWJsZSwgdmFsID0+IHtcbiAgICAgIGlmICh2YWwgPT09IHRydWUpIHtcbiAgICAgICAgdHlwZW9mIHJlc2V0VmFsaWRhdGlvbiA9PT0gJ2Z1bmN0aW9uJyAmJiByZXNldFZhbGlkYXRpb24oKVxuICAgICAgICAkZm9ybS51bmJpbmRDb21wb25lbnQocHJveHkpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgJGZvcm0uYmluZENvbXBvbmVudChwcm94eSlcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgb25Nb3VudGVkKCgpID0+IHtcbiAgICAgIC8vIHJlZ2lzdGVyIHRvIHBhcmVudCBRRm9ybVxuICAgICAgcHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZSAmJiAkZm9ybS5iaW5kQ29tcG9uZW50KHByb3h5KVxuICAgIH0pXG5cbiAgICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgICAgLy8gdW4tcmVnaXN0ZXIgZnJvbSBwYXJlbnQgUUZvcm1cbiAgICAgIHByb3BzLmRpc2FibGUgIT09IHRydWUgJiYgJGZvcm0udW5iaW5kQ29tcG9uZW50KHByb3h5KVxuICAgIH0pXG4gIH1cbiAgZWxzZSBpZiAocmVxdWlyZXNRRm9ybSA9PT0gdHJ1ZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1BhcmVudCBRRm9ybSBub3QgZm91bmQgb24gdXNlRm9ybUNoaWxkKCkhJylcbiAgfVxufVxuIiwiLy8gZmlsZSByZWZlcmVuY2VkIGZyb20gZG9jc1xuXG5jb25zdFxuICBoZXggPSAvXiNbMC05YS1mQS1GXXszfShbMC05YS1mQS1GXXszfSk/JC8sXG4gIGhleGEgPSAvXiNbMC05YS1mQS1GXXs0fShbMC05YS1mQS1GXXs0fSk/JC8sXG4gIGhleE9ySGV4YSA9IC9eIyhbMC05YS1mQS1GXXszfXxbMC05YS1mQS1GXXs0fXxbMC05YS1mQS1GXXs2fXxbMC05YS1mQS1GXXs4fSkkLyxcbiAgcmdiID0gL15yZ2JcXCgoKDB8WzEtOV1bXFxkXT98MVtcXGRdezAsMn18MltcXGRdP3wyWzAtNF1bXFxkXXwyNVswLTVdKSwpezJ9KDB8WzEtOV1bXFxkXT98MVtcXGRdezAsMn18MltcXGRdP3wyWzAtNF1bXFxkXXwyNVswLTVdKVxcKSQvLFxuICByZ2JhID0gL15yZ2JhXFwoKCgwfFsxLTldW1xcZF0/fDFbXFxkXXswLDJ9fDJbXFxkXT98MlswLTRdW1xcZF18MjVbMC01XSksKXsyfSgwfFsxLTldW1xcZF0/fDFbXFxkXXswLDJ9fDJbXFxkXT98MlswLTRdW1xcZF18MjVbMC01XSksKDB8MFxcLlswLTldK1sxLTldfDBcXC5bMS05XSt8MSlcXCkkL1xuXG4vLyBLZWVwIGluIHN5bmMgd2l0aCB1aS90eXBlcy9hcGkvdmFsaWRhdGlvbi5kLnRzXG5leHBvcnQgY29uc3QgdGVzdFBhdHRlcm4gPSB7XG4gIGRhdGU6IHYgPT4gL14tP1tcXGRdK1xcL1swLTFdXFxkXFwvWzAtM11cXGQkLy50ZXN0KHYpLFxuICB0aW1lOiB2ID0+IC9eKFswLTFdP1xcZHwyWzAtM10pOlswLTVdXFxkJC8udGVzdCh2KSxcbiAgZnVsbHRpbWU6IHYgPT4gL14oWzAtMV0/XFxkfDJbMC0zXSk6WzAtNV1cXGQ6WzAtNV1cXGQkLy50ZXN0KHYpLFxuICB0aW1lT3JGdWxsdGltZTogdiA9PiAvXihbMC0xXT9cXGR8MlswLTNdKTpbMC01XVxcZCg6WzAtNV1cXGQpPyQvLnRlc3QodiksXG5cbiAgLy8gLS0gUkZDIDUzMjIgLS1cbiAgLy8gLS0gQWRkZWQgaW4gdjIuNi42IC0tXG4gIC8vIFRoaXMgaXMgYSBiYXNpYyBoZWxwZXIgdmFsaWRhdGlvbi5cbiAgLy8gRm9yIHNvbWV0aGluZyBtb3JlIGNvbXBsZXggKGxpa2UgUkZDIDgyMikgeW91IHNob3VsZCB3cml0ZSBhbmQgdXNlIHlvdXIgb3duIHJ1bGUuXG4gIC8vIFdlIHdvbid0IGJlIGFjY2VwdGluZyBQUnMgdG8gZW5oYW5jZSB0aGUgb25lIGJlbG93IGJlY2F1c2Ugb2YgdGhlIHJlYXNvbiBhYm92ZS5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gIGVtYWlsOiB2ID0+IC9eKChbXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKFxcLltePD4oKVxcW1xcXVxcXFwuLDs6XFxzQFwiXSspKil8KFwiLitcIikpQCgoXFxbWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfV0pfCgoW2EtekEtWlxcLTAtOV0rXFwuKStbYS16QS1aXXsyLH0pKSQvLnRlc3QodiksXG5cbiAgaGV4Q29sb3I6IHYgPT4gaGV4LnRlc3QodiksXG4gIGhleGFDb2xvcjogdiA9PiBoZXhhLnRlc3QodiksXG4gIGhleE9ySGV4YUNvbG9yOiB2ID0+IGhleE9ySGV4YS50ZXN0KHYpLFxuXG4gIHJnYkNvbG9yOiB2ID0+IHJnYi50ZXN0KHYpLFxuICByZ2JhQ29sb3I6IHYgPT4gcmdiYS50ZXN0KHYpLFxuICByZ2JPclJnYmFDb2xvcjogdiA9PiByZ2IudGVzdCh2KSB8fCByZ2JhLnRlc3QodiksXG5cbiAgaGV4T3JSZ2JDb2xvcjogdiA9PiBoZXgudGVzdCh2KSB8fCByZ2IudGVzdCh2KSxcbiAgaGV4YU9yUmdiYUNvbG9yOiB2ID0+IGhleGEudGVzdCh2KSB8fCByZ2JhLnRlc3QodiksXG4gIGFueUNvbG9yOiB2ID0+IGhleE9ySGV4YS50ZXN0KHYpIHx8IHJnYi50ZXN0KHYpIHx8IHJnYmEudGVzdCh2KVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRlc3RQYXR0ZXJuXG59XG4iLCJpbXBvcnQgeyByZWYsIGNvbXB1dGVkLCB3YXRjaCwgb25CZWZvcmVVbm1vdW50LCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VGb3JtQ2hpbGQgZnJvbSAnLi4vdXNlLWZvcm0vdXNlLWZvcm0tY2hpbGQuanMnXG5pbXBvcnQgeyB0ZXN0UGF0dGVybiB9IGZyb20gJy4uLy4uL3V0aWxzL3BhdHRlcm5zL3BhdHRlcm5zLmpzJ1xuaW1wb3J0IGRlYm91bmNlIGZyb20gJy4uLy4uL3V0aWxzL2RlYm91bmNlL2RlYm91bmNlLmpzJ1xuaW1wb3J0IHsgaW5qZWN0UHJvcCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuaW5qZWN0LW9iai1wcm9wL2luamVjdC1vYmotcHJvcC5qcydcblxuY29uc3QgbGF6eVJ1bGVzVmFsdWVzID0gWyB0cnVlLCBmYWxzZSwgJ29uZGVtYW5kJyBdXG5cbmV4cG9ydCBjb25zdCB1c2VWYWxpZGF0ZVByb3BzID0ge1xuICBtb2RlbFZhbHVlOiB7fSxcblxuICBlcnJvcjoge1xuICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgZGVmYXVsdDogbnVsbFxuICB9LFxuICBlcnJvck1lc3NhZ2U6IFN0cmluZyxcbiAgbm9FcnJvckljb246IEJvb2xlYW4sXG5cbiAgcnVsZXM6IEFycmF5LFxuICByZWFjdGl2ZVJ1bGVzOiBCb29sZWFuLFxuICBsYXp5UnVsZXM6IHtcbiAgICB0eXBlOiBbIEJvb2xlYW4sIFN0cmluZyBdLFxuICAgIGRlZmF1bHQ6IGZhbHNlLCAvLyBzdGF0ZW1lbnQgdW5uZWVkZWQgYnV0IGF2b2lkcyBmdXR1cmUgdnVlIGltcGxlbWVudGF0aW9uIGNoYW5nZXNcbiAgICB2YWxpZGF0b3I6IHYgPT4gbGF6eVJ1bGVzVmFsdWVzLmluY2x1ZGVzKHYpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGZvY3VzZWQsIGlubmVyTG9hZGluZykge1xuICBjb25zdCB7IHByb3BzLCBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICBjb25zdCBpbm5lckVycm9yID0gcmVmKGZhbHNlKVxuICBjb25zdCBpbm5lckVycm9yTWVzc2FnZSA9IHJlZihudWxsKVxuICBjb25zdCBpc0RpcnR5TW9kZWwgPSByZWYoZmFsc2UpXG5cbiAgdXNlRm9ybUNoaWxkKHsgdmFsaWRhdGUsIHJlc2V0VmFsaWRhdGlvbiB9KVxuXG4gIGxldCB2YWxpZGF0ZUluZGV4ID0gMCwgdW53YXRjaFJ1bGVzXG5cbiAgY29uc3QgaGFzUnVsZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgIHByb3BzLnJ1bGVzICE9PSB2b2lkIDBcbiAgICAmJiBwcm9wcy5ydWxlcyAhPT0gbnVsbFxuICAgICYmIHByb3BzLnJ1bGVzLmxlbmd0aCAhPT0gMFxuICApXG5cbiAgY29uc3QgY2FuRGVib3VuY2VWYWxpZGF0ZSA9IGNvbXB1dGVkKCgpID0+IChcbiAgICBwcm9wcy5kaXNhYmxlICE9PSB0cnVlXG4gICAgJiYgaGFzUnVsZXMudmFsdWUgPT09IHRydWVcbiAgICAvLyBTaG91bGQgbm90IGhhdmUgYSB2YWxpZGF0aW9uIGluIHByb2dyZXNzIGFscmVhZHk7XG4gICAgLy8gSXQgbWlnaHQgbWVhbiB0aGF0IGZvY3VzIHN3aXRjaGVkIHRvIHN1Ym1pdCBidG4gYW5kXG4gICAgLy8gUUZvcm0ncyBzdWJtaXQoKSBoYXMgYmVlbiBjYWxsZWQgYWxyZWFkeSAoRU5URVIga2V5KVxuICAgICYmIGlubmVyTG9hZGluZy52YWx1ZSA9PT0gZmFsc2VcbiAgKSlcblxuICBjb25zdCBoYXNFcnJvciA9IGNvbXB1dGVkKCgpID0+XG4gICAgcHJvcHMuZXJyb3IgPT09IHRydWUgfHwgaW5uZXJFcnJvci52YWx1ZSA9PT0gdHJ1ZVxuICApXG5cbiAgY29uc3QgZXJyb3JNZXNzYWdlID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgIHR5cGVvZiBwcm9wcy5lcnJvck1lc3NhZ2UgPT09ICdzdHJpbmcnICYmIHByb3BzLmVycm9yTWVzc2FnZS5sZW5ndGggIT09IDBcbiAgICAgID8gcHJvcHMuZXJyb3JNZXNzYWdlXG4gICAgICA6IGlubmVyRXJyb3JNZXNzYWdlLnZhbHVlXG4gICkpXG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMubW9kZWxWYWx1ZSwgKCkgPT4ge1xuICAgIGlzRGlydHlNb2RlbC52YWx1ZSA9IHRydWVcblxuICAgIGlmIChcbiAgICAgIGNhbkRlYm91bmNlVmFsaWRhdGUudmFsdWUgPT09IHRydWVcbiAgICAgIC8vIHRyaWdnZXIgdmFsaWRhdGlvbiBpZiBub3QgdXNpbmcgYW55IGtpbmQgb2YgbGF6eS1ydWxlc1xuICAgICAgJiYgcHJvcHMubGF6eVJ1bGVzID09PSBmYWxzZVxuICAgICkge1xuICAgICAgZGVib3VuY2VkVmFsaWRhdGUoKVxuICAgIH1cbiAgfSlcblxuICBmdW5jdGlvbiBvblJ1bGVzQ2hhbmdlICgpIHtcbiAgICBpZiAoXG4gICAgICBwcm9wcy5sYXp5UnVsZXMgIT09ICdvbmRlbWFuZCdcbiAgICAgICYmIGNhbkRlYm91bmNlVmFsaWRhdGUudmFsdWUgPT09IHRydWVcbiAgICAgICYmIGlzRGlydHlNb2RlbC52YWx1ZSA9PT0gdHJ1ZVxuICAgICkge1xuICAgICAgZGVib3VuY2VkVmFsaWRhdGUoKVxuICAgIH1cbiAgfVxuXG4gIHdhdGNoKCgpID0+IHByb3BzLnJlYWN0aXZlUnVsZXMsIHZhbCA9PiB7XG4gICAgaWYgKHZhbCA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKHVud2F0Y2hSdWxlcyA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHVud2F0Y2hSdWxlcyA9IHdhdGNoKCgpID0+IHByb3BzLnJ1bGVzLCBvblJ1bGVzQ2hhbmdlLCB7IGltbWVkaWF0ZTogdHJ1ZSwgZGVlcDogdHJ1ZSB9KVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh1bndhdGNoUnVsZXMgIT09IHZvaWQgMCkge1xuICAgICAgdW53YXRjaFJ1bGVzKClcbiAgICAgIHVud2F0Y2hSdWxlcyA9IHZvaWQgMFxuICAgIH1cbiAgfSwgeyBpbW1lZGlhdGU6IHRydWUgfSlcblxuICB3YXRjaCgoKSA9PiBwcm9wcy5sYXp5UnVsZXMsIG9uUnVsZXNDaGFuZ2UpXG5cbiAgd2F0Y2goZm9jdXNlZCwgdmFsID0+IHtcbiAgICBpZiAodmFsID09PSB0cnVlKSB7XG4gICAgICBpc0RpcnR5TW9kZWwudmFsdWUgPSB0cnVlXG4gICAgfVxuICAgIGVsc2UgaWYgKFxuICAgICAgY2FuRGVib3VuY2VWYWxpZGF0ZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgJiYgcHJvcHMubGF6eVJ1bGVzICE9PSAnb25kZW1hbmQnXG4gICAgKSB7XG4gICAgICBkZWJvdW5jZWRWYWxpZGF0ZSgpXG4gICAgfVxuICB9KVxuXG4gIGZ1bmN0aW9uIHJlc2V0VmFsaWRhdGlvbiAoKSB7XG4gICAgdmFsaWRhdGVJbmRleCsrXG4gICAgaW5uZXJMb2FkaW5nLnZhbHVlID0gZmFsc2VcbiAgICBpc0RpcnR5TW9kZWwudmFsdWUgPSBmYWxzZVxuICAgIGlubmVyRXJyb3IudmFsdWUgPSBmYWxzZVxuICAgIGlubmVyRXJyb3JNZXNzYWdlLnZhbHVlID0gbnVsbFxuICAgIGRlYm91bmNlZFZhbGlkYXRlLmNhbmNlbCgpXG4gIH1cblxuICAvKlxuICAgKiBSZXR1cm4gdmFsdWVcbiAgICogICAtIHRydWUgKHZhbGlkYXRpb24gc3VjY2VlZGVkKVxuICAgKiAgIC0gZmFsc2UgKHZhbGlkYXRpb24gZmFpbGVkKVxuICAgKiAgIC0gUHJvbWlzZSAocGVuZGluZyBhc3luYyB2YWxpZGF0aW9uKVxuICAgKi9cbiAgZnVuY3Rpb24gdmFsaWRhdGUgKHZhbCA9IHByb3BzLm1vZGVsVmFsdWUpIHtcbiAgICBpZiAoXG4gICAgICBwcm9wcy5kaXNhYmxlID09PSB0cnVlXG4gICAgICB8fCBoYXNSdWxlcy52YWx1ZSA9PT0gZmFsc2VcbiAgICApIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgY29uc3QgaW5kZXggPSArK3ZhbGlkYXRlSW5kZXhcblxuICAgIGNvbnN0IHNldERpcnR5ID0gaW5uZXJMb2FkaW5nLnZhbHVlICE9PSB0cnVlXG4gICAgICA/ICgpID0+IHsgaXNEaXJ0eU1vZGVsLnZhbHVlID0gdHJ1ZSB9XG4gICAgICA6ICgpID0+IHt9XG5cbiAgICBjb25zdCB1cGRhdGUgPSAoZXJyLCBtc2cpID0+IHtcbiAgICAgIGVyciA9PT0gdHJ1ZSAmJiBzZXREaXJ0eSgpXG5cbiAgICAgIGlubmVyRXJyb3IudmFsdWUgPSBlcnJcbiAgICAgIGlubmVyRXJyb3JNZXNzYWdlLnZhbHVlID0gbXNnIHx8IG51bGxcbiAgICAgIGlubmVyTG9hZGluZy52YWx1ZSA9IGZhbHNlXG4gICAgfVxuXG4gICAgY29uc3QgcHJvbWlzZXMgPSBbXVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wcy5ydWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgcnVsZSA9IHByb3BzLnJ1bGVzWyBpIF1cbiAgICAgIGxldCByZXNcblxuICAgICAgaWYgKHR5cGVvZiBydWxlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJlcyA9IHJ1bGUodmFsLCB0ZXN0UGF0dGVybilcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHR5cGVvZiBydWxlID09PSAnc3RyaW5nJyAmJiB0ZXN0UGF0dGVyblsgcnVsZSBdICE9PSB2b2lkIDApIHtcbiAgICAgICAgcmVzID0gdGVzdFBhdHRlcm5bIHJ1bGUgXSh2YWwpXG4gICAgICB9XG5cbiAgICAgIGlmIChyZXMgPT09IGZhbHNlIHx8IHR5cGVvZiByZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHVwZGF0ZSh0cnVlLCByZXMpXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAocmVzICE9PSB0cnVlICYmIHJlcyAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHByb21pc2VzLnB1c2gocmVzKVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwcm9taXNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHVwZGF0ZShmYWxzZSlcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgaW5uZXJMb2FkaW5nLnZhbHVlID0gdHJ1ZVxuXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKFxuICAgICAgcmVzID0+IHtcbiAgICAgICAgaWYgKHJlcyA9PT0gdm9pZCAwIHx8IEFycmF5LmlzQXJyYXkocmVzKSA9PT0gZmFsc2UgfHwgcmVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIGluZGV4ID09PSB2YWxpZGF0ZUluZGV4ICYmIHVwZGF0ZShmYWxzZSlcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbXNnID0gcmVzLmZpbmQociA9PiByID09PSBmYWxzZSB8fCB0eXBlb2YgciA9PT0gJ3N0cmluZycpXG4gICAgICAgIGluZGV4ID09PSB2YWxpZGF0ZUluZGV4ICYmIHVwZGF0ZShtc2cgIT09IHZvaWQgMCwgbXNnKVxuICAgICAgICByZXR1cm4gbXNnID09PSB2b2lkIDBcbiAgICAgIH0sXG4gICAgICBlID0+IHtcbiAgICAgICAgaWYgKGluZGV4ID09PSB2YWxpZGF0ZUluZGV4KSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihlKVxuICAgICAgICAgIHVwZGF0ZSh0cnVlKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgKVxuICB9XG5cbiAgY29uc3QgZGVib3VuY2VkVmFsaWRhdGUgPSBkZWJvdW5jZSh2YWxpZGF0ZSwgMClcblxuICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgIHVud2F0Y2hSdWxlcz8uKClcbiAgICBkZWJvdW5jZWRWYWxpZGF0ZS5jYW5jZWwoKVxuICB9KVxuXG4gIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kcyAmIHByb3BzXG4gIE9iamVjdC5hc3NpZ24ocHJveHksIHsgcmVzZXRWYWxpZGF0aW9uLCB2YWxpZGF0ZSB9KVxuICBpbmplY3RQcm9wKHByb3h5LCAnaGFzRXJyb3InLCAoKSA9PiBoYXNFcnJvci52YWx1ZSlcblxuICByZXR1cm4ge1xuICAgIGlzRGlydHlNb2RlbCxcbiAgICBoYXNSdWxlcyxcbiAgICBoYXNFcnJvcixcbiAgICBlcnJvck1lc3NhZ2UsXG5cbiAgICB2YWxpZGF0ZSxcbiAgICByZXNldFZhbGlkYXRpb25cbiAgfVxufVxuIiwibGV0IHF1ZXVlID0gW11cbmxldCB3YWl0RmxhZ3MgPSBbXVxuXG5mdW5jdGlvbiBjbGVhckZsYWcgKGZsYWcpIHtcbiAgd2FpdEZsYWdzID0gd2FpdEZsYWdzLmZpbHRlcihlbnRyeSA9PiBlbnRyeSAhPT0gZmxhZylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZEZvY3VzV2FpdEZsYWcgKGZsYWcpIHtcbiAgY2xlYXJGbGFnKGZsYWcpXG4gIHdhaXRGbGFncy5wdXNoKGZsYWcpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVGb2N1c1dhaXRGbGFnIChmbGFnKSB7XG4gIGNsZWFyRmxhZyhmbGFnKVxuXG4gIGlmICh3YWl0RmxhZ3MubGVuZ3RoID09PSAwICYmIHF1ZXVlLmxlbmd0aCAhPT0gMCkge1xuICAgIC8vIG9ubHkgY2FsbCBsYXN0IGZvY3VzIGhhbmRsZXIgKGNhbid0IGZvY3VzIG11bHRpcGxlIHRoaW5ncyBhdCBvbmNlKVxuICAgIHF1ZXVlWyBxdWV1ZS5sZW5ndGggLSAxIF0oKVxuICAgIHF1ZXVlID0gW11cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkRm9jdXNGbiAoZm4pIHtcbiAgaWYgKHdhaXRGbGFncy5sZW5ndGggPT09IDApIHtcbiAgICBmbigpXG4gIH1cbiAgZWxzZSB7XG4gICAgcXVldWUucHVzaChmbilcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlRm9jdXNGbiAoZm4pIHtcbiAgcXVldWUgPSBxdWV1ZS5maWx0ZXIoZW50cnkgPT4gZW50cnkgIT09IGZuKVxufVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgVHJhbnNpdGlvbiwgbmV4dFRpY2ssIG9uQWN0aXZhdGVkLCBvbkRlYWN0aXZhdGVkLCBvbkJlZm9yZVVubW91bnQsIG9uTW91bnRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgUUljb24gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9pY29uL1FJY29uLmpzJ1xuaW1wb3J0IFFTcGlubmVyIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvc3Bpbm5lci9RU3Bpbm5lci5qcydcblxuaW1wb3J0IHVzZUlkIGZyb20gJy4uL3VzZS1pZC91c2UtaWQuanMnXG5pbXBvcnQgdXNlU3BsaXRBdHRycyBmcm9tICcuLi91c2Utc3BsaXQtYXR0cnMvdXNlLXNwbGl0LWF0dHJzLmpzJ1xuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtZGFyay91c2UtZGFyay5qcydcbmltcG9ydCB1c2VWYWxpZGF0ZSwgeyB1c2VWYWxpZGF0ZVByb3BzIH0gZnJvbSAnLi4vcHJpdmF0ZS51c2UtdmFsaWRhdGUvdXNlLXZhbGlkYXRlLmpzJ1xuXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcbmltcG9ydCB7IHByZXZlbnQsIHN0b3BBbmRQcmV2ZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnQvZXZlbnQuanMnXG5pbXBvcnQgeyBhZGRGb2N1c0ZuLCByZW1vdmVGb2N1c0ZuIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5mb2N1cy9mb2N1cy1tYW5hZ2VyLmpzJ1xuXG5leHBvcnQgZnVuY3Rpb24gZmllbGRWYWx1ZUlzRmlsbGVkICh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gdm9pZCAwXG4gICAgJiYgdmFsICE9PSBudWxsXG4gICAgJiYgKCcnICsgdmFsKS5sZW5ndGggIT09IDBcbn1cblxuZXhwb3J0IGNvbnN0IHVzZU5vbklucHV0RmllbGRQcm9wcyA9IHtcbiAgLi4udXNlRGFya1Byb3BzLFxuICAuLi51c2VWYWxpZGF0ZVByb3BzLFxuXG4gIGxhYmVsOiBTdHJpbmcsXG4gIHN0YWNrTGFiZWw6IEJvb2xlYW4sXG4gIGhpbnQ6IFN0cmluZyxcbiAgaGlkZUhpbnQ6IEJvb2xlYW4sXG4gIHByZWZpeDogU3RyaW5nLFxuICBzdWZmaXg6IFN0cmluZyxcblxuICBsYWJlbENvbG9yOiBTdHJpbmcsXG4gIGNvbG9yOiBTdHJpbmcsXG4gIGJnQ29sb3I6IFN0cmluZyxcblxuICBmaWxsZWQ6IEJvb2xlYW4sXG4gIG91dGxpbmVkOiBCb29sZWFuLFxuICBib3JkZXJsZXNzOiBCb29sZWFuLFxuICBzdGFuZG91dDogWyBCb29sZWFuLCBTdHJpbmcgXSxcblxuICBzcXVhcmU6IEJvb2xlYW4sXG5cbiAgbG9hZGluZzogQm9vbGVhbixcblxuICBsYWJlbFNsb3Q6IEJvb2xlYW4sXG5cbiAgYm90dG9tU2xvdHM6IEJvb2xlYW4sXG4gIGhpZGVCb3R0b21TcGFjZTogQm9vbGVhbixcblxuICByb3VuZGVkOiBCb29sZWFuLFxuICBkZW5zZTogQm9vbGVhbixcbiAgaXRlbUFsaWduZWQ6IEJvb2xlYW4sXG5cbiAgY291bnRlcjogQm9vbGVhbixcblxuICBjbGVhcmFibGU6IEJvb2xlYW4sXG4gIGNsZWFySWNvbjogU3RyaW5nLFxuXG4gIGRpc2FibGU6IEJvb2xlYW4sXG4gIHJlYWRvbmx5OiBCb29sZWFuLFxuXG4gIGF1dG9mb2N1czogQm9vbGVhbixcblxuICBmb3I6IFN0cmluZ1xufVxuXG5leHBvcnQgY29uc3QgdXNlRmllbGRQcm9wcyA9IHtcbiAgLi4udXNlTm9uSW5wdXRGaWVsZFByb3BzLFxuICBtYXhsZW5ndGg6IFsgTnVtYmVyLCBTdHJpbmcgXVxufVxuXG5leHBvcnQgY29uc3QgdXNlRmllbGRFbWl0cyA9IFsgJ3VwZGF0ZTptb2RlbFZhbHVlJywgJ2NsZWFyJywgJ2ZvY3VzJywgJ2JsdXInIF1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUZpZWxkU3RhdGUgKHsgcmVxdWlyZWRGb3JBdHRyID0gdHJ1ZSwgdGFnUHJvcCwgY2hhbmdlRXZlbnQgPSBmYWxzZSB9ID0ge30pIHtcbiAgY29uc3QgeyBwcm9wcywgcHJveHkgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgcHJveHkuJHEpXG4gIGNvbnN0IHRhcmdldFVpZCA9IHVzZUlkKHtcbiAgICByZXF1aXJlZDogcmVxdWlyZWRGb3JBdHRyLFxuICAgIGdldFZhbHVlOiAoKSA9PiBwcm9wcy5mb3JcbiAgfSlcblxuICByZXR1cm4ge1xuICAgIHJlcXVpcmVkRm9yQXR0cixcbiAgICBjaGFuZ2VFdmVudCxcbiAgICB0YWc6IHRhZ1Byb3AgPT09IHRydWVcbiAgICAgID8gY29tcHV0ZWQoKCkgPT4gcHJvcHMudGFnKVxuICAgICAgOiB7IHZhbHVlOiAnbGFiZWwnIH0sXG5cbiAgICBpc0RhcmssXG5cbiAgICBlZGl0YWJsZTogY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLmRpc2FibGUgIT09IHRydWUgJiYgcHJvcHMucmVhZG9ubHkgIT09IHRydWVcbiAgICApLFxuXG4gICAgaW5uZXJMb2FkaW5nOiByZWYoZmFsc2UpLFxuICAgIGZvY3VzZWQ6IHJlZihmYWxzZSksXG4gICAgaGFzUG9wdXBPcGVuOiBmYWxzZSxcblxuICAgIHNwbGl0QXR0cnM6IHVzZVNwbGl0QXR0cnMoKSxcbiAgICB0YXJnZXRVaWQsXG5cbiAgICByb290UmVmOiByZWYobnVsbCksXG4gICAgdGFyZ2V0UmVmOiByZWYobnVsbCksXG4gICAgY29udHJvbFJlZjogcmVmKG51bGwpXG5cbiAgICAvKipcbiAgICAgKiB1c2VyIHN1cHBsaWVkIGFkZGl0aW9uYWxzOlxuXG4gICAgICogaW5uZXJWYWx1ZSAtIGNvbXB1dGVkXG4gICAgICogZmxvYXRpbmdMYWJlbCAtIGNvbXB1dGVkXG4gICAgICogaW5wdXRSZWYgLSBjb21wdXRlZFxuXG4gICAgICogZmllbGRDbGFzcyAtIGNvbXB1dGVkXG4gICAgICogaGFzU2hhZG93IC0gY29tcHV0ZWRcblxuICAgICAqIGNvbnRyb2xFdmVudHMgLSBPYmplY3Qgd2l0aCBmbihlKVxuXG4gICAgICogZ2V0Q29udHJvbCAtIGZuXG4gICAgICogZ2V0SW5uZXJBcHBlbmQgLSBmblxuICAgICAqIGdldENvbnRyb2xDaGlsZCAtIGZuXG4gICAgICogZ2V0U2hhZG93Q29udHJvbCAtIGZuXG4gICAgICogc2hvd1BvcHVwIC0gZm5cbiAgICAgKi9cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgY29uc3QgeyBwcm9wcywgZW1pdCwgc2xvdHMsIGF0dHJzLCBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgY29uc3QgeyAkcSB9ID0gcHJveHlcblxuICBsZXQgZm9jdXNvdXRUaW1lciA9IG51bGxcblxuICBpZiAoc3RhdGUuaGFzVmFsdWUgPT09IHZvaWQgMCkge1xuICAgIHN0YXRlLmhhc1ZhbHVlID0gY29tcHV0ZWQoKCkgPT4gZmllbGRWYWx1ZUlzRmlsbGVkKHByb3BzLm1vZGVsVmFsdWUpKVxuICB9XG5cbiAgaWYgKHN0YXRlLmVtaXRWYWx1ZSA9PT0gdm9pZCAwKSB7XG4gICAgc3RhdGUuZW1pdFZhbHVlID0gdmFsdWUgPT4ge1xuICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCB2YWx1ZSlcbiAgICB9XG4gIH1cblxuICBpZiAoc3RhdGUuY29udHJvbEV2ZW50cyA9PT0gdm9pZCAwKSB7XG4gICAgc3RhdGUuY29udHJvbEV2ZW50cyA9IHtcbiAgICAgIG9uRm9jdXNpbjogb25Db250cm9sRm9jdXNpbixcbiAgICAgIG9uRm9jdXNvdXQ6IG9uQ29udHJvbEZvY3Vzb3V0XG4gICAgfVxuICB9XG5cbiAgT2JqZWN0LmFzc2lnbihzdGF0ZSwge1xuICAgIGNsZWFyVmFsdWUsXG4gICAgb25Db250cm9sRm9jdXNpbixcbiAgICBvbkNvbnRyb2xGb2N1c291dCxcbiAgICBmb2N1c1xuICB9KVxuXG4gIGlmIChzdGF0ZS5jb21wdXRlZENvdW50ZXIgPT09IHZvaWQgMCkge1xuICAgIHN0YXRlLmNvbXB1dGVkQ291bnRlciA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGlmIChwcm9wcy5jb3VudGVyICE9PSBmYWxzZSkge1xuICAgICAgICBjb25zdCBsZW4gPSB0eXBlb2YgcHJvcHMubW9kZWxWYWx1ZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHByb3BzLm1vZGVsVmFsdWUgPT09ICdudW1iZXInXG4gICAgICAgICAgPyAoJycgKyBwcm9wcy5tb2RlbFZhbHVlKS5sZW5ndGhcbiAgICAgICAgICA6IChBcnJheS5pc0FycmF5KHByb3BzLm1vZGVsVmFsdWUpID09PSB0cnVlID8gcHJvcHMubW9kZWxWYWx1ZS5sZW5ndGggOiAwKVxuXG4gICAgICAgIGNvbnN0IG1heCA9IHByb3BzLm1heGxlbmd0aCAhPT0gdm9pZCAwXG4gICAgICAgICAgPyBwcm9wcy5tYXhsZW5ndGhcbiAgICAgICAgICA6IHByb3BzLm1heFZhbHVlc1xuXG4gICAgICAgIHJldHVybiBsZW4gKyAobWF4ICE9PSB2b2lkIDAgPyAnIC8gJyArIG1heCA6ICcnKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBjb25zdCB7XG4gICAgaXNEaXJ0eU1vZGVsLFxuICAgIGhhc1J1bGVzLFxuICAgIGhhc0Vycm9yLFxuICAgIGVycm9yTWVzc2FnZSxcbiAgICByZXNldFZhbGlkYXRpb25cbiAgfSA9IHVzZVZhbGlkYXRlKHN0YXRlLmZvY3VzZWQsIHN0YXRlLmlubmVyTG9hZGluZylcblxuICBjb25zdCBmbG9hdGluZ0xhYmVsID0gc3RhdGUuZmxvYXRpbmdMYWJlbCAhPT0gdm9pZCAwXG4gICAgPyBjb21wdXRlZCgoKSA9PiBwcm9wcy5zdGFja0xhYmVsID09PSB0cnVlIHx8IHN0YXRlLmZvY3VzZWQudmFsdWUgPT09IHRydWUgfHwgc3RhdGUuZmxvYXRpbmdMYWJlbC52YWx1ZSA9PT0gdHJ1ZSlcbiAgICA6IGNvbXB1dGVkKCgpID0+IHByb3BzLnN0YWNrTGFiZWwgPT09IHRydWUgfHwgc3RhdGUuZm9jdXNlZC52YWx1ZSA9PT0gdHJ1ZSB8fCBzdGF0ZS5oYXNWYWx1ZS52YWx1ZSA9PT0gdHJ1ZSlcblxuICBjb25zdCBzaG91bGRSZW5kZXJCb3R0b20gPSBjb21wdXRlZCgoKSA9PlxuICAgIHByb3BzLmJvdHRvbVNsb3RzID09PSB0cnVlXG4gICAgfHwgcHJvcHMuaGludCAhPT0gdm9pZCAwXG4gICAgfHwgaGFzUnVsZXMudmFsdWUgPT09IHRydWVcbiAgICB8fCBwcm9wcy5jb3VudGVyID09PSB0cnVlXG4gICAgfHwgcHJvcHMuZXJyb3IgIT09IG51bGxcbiAgKVxuXG4gIGNvbnN0IHN0eWxlVHlwZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBpZiAocHJvcHMuZmlsbGVkID09PSB0cnVlKSB7IHJldHVybiAnZmlsbGVkJyB9XG4gICAgaWYgKHByb3BzLm91dGxpbmVkID09PSB0cnVlKSB7IHJldHVybiAnb3V0bGluZWQnIH1cbiAgICBpZiAocHJvcHMuYm9yZGVybGVzcyA9PT0gdHJ1ZSkgeyByZXR1cm4gJ2JvcmRlcmxlc3MnIH1cbiAgICBpZiAocHJvcHMuc3RhbmRvdXQpIHsgcmV0dXJuICdzdGFuZG91dCcgfVxuICAgIHJldHVybiAnc3RhbmRhcmQnXG4gIH0pXG5cbiAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgYHEtZmllbGQgcm93IG5vLXdyYXAgaXRlbXMtc3RhcnQgcS1maWVsZC0tJHsgc3R5bGVUeXBlLnZhbHVlIH1gXG4gICAgKyAoc3RhdGUuZmllbGRDbGFzcyAhPT0gdm9pZCAwID8gYCAkeyBzdGF0ZS5maWVsZENsYXNzLnZhbHVlIH1gIDogJycpXG4gICAgKyAocHJvcHMucm91bmRlZCA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0tcm91bmRlZCcgOiAnJylcbiAgICArIChwcm9wcy5zcXVhcmUgPT09IHRydWUgPyAnIHEtZmllbGQtLXNxdWFyZScgOiAnJylcbiAgICArIChmbG9hdGluZ0xhYmVsLnZhbHVlID09PSB0cnVlID8gJyBxLWZpZWxkLS1mbG9hdCcgOiAnJylcbiAgICArIChoYXNMYWJlbC52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0tbGFiZWxlZCcgOiAnJylcbiAgICArIChwcm9wcy5kZW5zZSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0tZGVuc2UnIDogJycpXG4gICAgKyAocHJvcHMuaXRlbUFsaWduZWQgPT09IHRydWUgPyAnIHEtZmllbGQtLWl0ZW0tYWxpZ25lZCBxLWl0ZW0tdHlwZScgOiAnJylcbiAgICArIChzdGF0ZS5pc0RhcmsudmFsdWUgPT09IHRydWUgPyAnIHEtZmllbGQtLWRhcmsnIDogJycpXG4gICAgKyAoc3RhdGUuZ2V0Q29udHJvbCA9PT0gdm9pZCAwID8gJyBxLWZpZWxkLS1hdXRvLWhlaWdodCcgOiAnJylcbiAgICArIChzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSB0cnVlID8gJyBxLWZpZWxkLS1mb2N1c2VkJyA6ICcnKVxuICAgICsgKGhhc0Vycm9yLnZhbHVlID09PSB0cnVlID8gJyBxLWZpZWxkLS1lcnJvcicgOiAnJylcbiAgICArIChoYXNFcnJvci52YWx1ZSA9PT0gdHJ1ZSB8fCBzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSB0cnVlID8gJyBxLWZpZWxkLS1oaWdobGlnaHRlZCcgOiAnJylcbiAgICArIChwcm9wcy5oaWRlQm90dG9tU3BhY2UgIT09IHRydWUgJiYgc2hvdWxkUmVuZGVyQm90dG9tLnZhbHVlID09PSB0cnVlID8gJyBxLWZpZWxkLS13aXRoLWJvdHRvbScgOiAnJylcbiAgICArIChwcm9wcy5kaXNhYmxlID09PSB0cnVlID8gJyBxLWZpZWxkLS1kaXNhYmxlZCcgOiAocHJvcHMucmVhZG9ubHkgPT09IHRydWUgPyAnIHEtZmllbGQtLXJlYWRvbmx5JyA6ICcnKSlcbiAgKVxuXG4gIGNvbnN0IGNvbnRlbnRDbGFzcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgJ3EtZmllbGRfX2NvbnRyb2wgcmVsYXRpdmUtcG9zaXRpb24gcm93IG5vLXdyYXAnXG4gICAgKyAocHJvcHMuYmdDb2xvciAhPT0gdm9pZCAwID8gYCBiZy0keyBwcm9wcy5iZ0NvbG9yIH1gIDogJycpXG4gICAgKyAoXG4gICAgICBoYXNFcnJvci52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICA/ICcgdGV4dC1uZWdhdGl2ZSdcbiAgICAgICAgOiAoXG4gICAgICAgICAgICB0eXBlb2YgcHJvcHMuc3RhbmRvdXQgPT09ICdzdHJpbmcnICYmIHByb3BzLnN0YW5kb3V0Lmxlbmd0aCAhPT0gMCAmJiBzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgICAgID8gYCAkeyBwcm9wcy5zdGFuZG91dCB9YFxuICAgICAgICAgICAgICA6IChwcm9wcy5jb2xvciAhPT0gdm9pZCAwID8gYCB0ZXh0LSR7IHByb3BzLmNvbG9yIH1gIDogJycpXG4gICAgICAgICAgKVxuICAgIClcbiAgKVxuXG4gIGNvbnN0IGhhc0xhYmVsID0gY29tcHV0ZWQoKCkgPT5cbiAgICBwcm9wcy5sYWJlbFNsb3QgPT09IHRydWUgfHwgcHJvcHMubGFiZWwgIT09IHZvaWQgMFxuICApXG5cbiAgY29uc3QgbGFiZWxDbGFzcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgJ3EtZmllbGRfX2xhYmVsIG5vLXBvaW50ZXItZXZlbnRzIGFic29sdXRlIGVsbGlwc2lzJ1xuICAgICsgKHByb3BzLmxhYmVsQ29sb3IgIT09IHZvaWQgMCAmJiBoYXNFcnJvci52YWx1ZSAhPT0gdHJ1ZSA/IGAgdGV4dC0keyBwcm9wcy5sYWJlbENvbG9yIH1gIDogJycpXG4gIClcblxuICBjb25zdCBjb250cm9sU2xvdFNjb3BlID0gY29tcHV0ZWQoKCkgPT4gKHtcbiAgICBpZDogc3RhdGUudGFyZ2V0VWlkLnZhbHVlLFxuICAgIGVkaXRhYmxlOiBzdGF0ZS5lZGl0YWJsZS52YWx1ZSxcbiAgICBmb2N1c2VkOiBzdGF0ZS5mb2N1c2VkLnZhbHVlLFxuICAgIGZsb2F0aW5nTGFiZWw6IGZsb2F0aW5nTGFiZWwudmFsdWUsXG4gICAgbW9kZWxWYWx1ZTogcHJvcHMubW9kZWxWYWx1ZSxcbiAgICBlbWl0VmFsdWU6IHN0YXRlLmVtaXRWYWx1ZVxuICB9KSlcblxuICBjb25zdCBhdHRyaWJ1dGVzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGNvbnN0IGFjYyA9IHt9XG5cbiAgICBpZiAoc3RhdGUudGFyZ2V0VWlkLnZhbHVlKSB7XG4gICAgICBhY2MuZm9yID0gc3RhdGUudGFyZ2V0VWlkLnZhbHVlXG4gICAgfVxuXG4gICAgaWYgKHByb3BzLmRpc2FibGUgPT09IHRydWUpIHtcbiAgICAgIGFjY1sgJ2FyaWEtZGlzYWJsZWQnIF0gPSAndHJ1ZSdcbiAgICB9XG5cbiAgICByZXR1cm4gYWNjXG4gIH0pXG5cbiAgZnVuY3Rpb24gZm9jdXNIYW5kbGVyICgpIHtcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnRcbiAgICBsZXQgdGFyZ2V0ID0gc3RhdGUudGFyZ2V0UmVmPy52YWx1ZVxuXG4gICAgaWYgKHRhcmdldCAmJiAoZWwgPT09IG51bGwgfHwgZWwuaWQgIT09IHN0YXRlLnRhcmdldFVpZC52YWx1ZSkpIHtcbiAgICAgIHRhcmdldC5oYXNBdHRyaWJ1dGUoJ3RhYmluZGV4JykgPT09IHRydWUgfHwgKHRhcmdldCA9IHRhcmdldC5xdWVyeVNlbGVjdG9yKCdbdGFiaW5kZXhdJykpXG4gICAgICBpZiAodGFyZ2V0ICE9PSBlbCkge1xuICAgICAgICB0YXJnZXQ/LmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9KVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGZvY3VzICgpIHtcbiAgICBhZGRGb2N1c0ZuKGZvY3VzSGFuZGxlcilcbiAgfVxuXG4gIGZ1bmN0aW9uIGJsdXIgKCkge1xuICAgIHJlbW92ZUZvY3VzRm4oZm9jdXNIYW5kbGVyKVxuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudFxuICAgIGlmIChlbCAhPT0gbnVsbCAmJiBzdGF0ZS5yb290UmVmLnZhbHVlLmNvbnRhaW5zKGVsKSkge1xuICAgICAgZWwuYmx1cigpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25Db250cm9sRm9jdXNpbiAoZSkge1xuICAgIGlmIChmb2N1c291dFRpbWVyICE9PSBudWxsKSB7XG4gICAgICBjbGVhclRpbWVvdXQoZm9jdXNvdXRUaW1lcilcbiAgICAgIGZvY3Vzb3V0VGltZXIgPSBudWxsXG4gICAgfVxuXG4gICAgaWYgKHN0YXRlLmVkaXRhYmxlLnZhbHVlID09PSB0cnVlICYmIHN0YXRlLmZvY3VzZWQudmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICBzdGF0ZS5mb2N1c2VkLnZhbHVlID0gdHJ1ZVxuICAgICAgZW1pdCgnZm9jdXMnLCBlKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uQ29udHJvbEZvY3Vzb3V0IChlLCB0aGVuKSB7XG4gICAgZm9jdXNvdXRUaW1lciAhPT0gbnVsbCAmJiBjbGVhclRpbWVvdXQoZm9jdXNvdXRUaW1lcilcbiAgICBmb2N1c291dFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBmb2N1c291dFRpbWVyID0gbnVsbFxuXG4gICAgICBpZiAoXG4gICAgICAgIGRvY3VtZW50Lmhhc0ZvY3VzKCkgPT09IHRydWUgJiYgKFxuICAgICAgICAgIHN0YXRlLmhhc1BvcHVwT3BlbiA9PT0gdHJ1ZVxuICAgICAgICAgIHx8IHN0YXRlLmNvbnRyb2xSZWYgPT09IHZvaWQgMFxuICAgICAgICAgIHx8IHN0YXRlLmNvbnRyb2xSZWYudmFsdWUgPT09IG51bGxcbiAgICAgICAgICB8fCBzdGF0ZS5jb250cm9sUmVmLnZhbHVlLmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpICE9PSBmYWxzZVxuICAgICAgICApXG4gICAgICApIHJldHVyblxuXG4gICAgICBpZiAoc3RhdGUuZm9jdXNlZC52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBzdGF0ZS5mb2N1c2VkLnZhbHVlID0gZmFsc2VcbiAgICAgICAgZW1pdCgnYmx1cicsIGUpXG4gICAgICB9XG5cbiAgICAgIHRoZW4/LigpXG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsZWFyVmFsdWUgKGUpIHtcbiAgICAvLyBwcmV2ZW50IGFjdGl2YXRpbmcgdGhlIGZpZWxkIGJ1dCBrZWVwIGZvY3VzIG9uIGRlc2t0b3BcbiAgICBzdG9wQW5kUHJldmVudChlKVxuXG4gICAgaWYgKCRxLnBsYXRmb3JtLmlzLm1vYmlsZSAhPT0gdHJ1ZSkge1xuICAgICAgY29uc3QgZWwgPSBzdGF0ZS50YXJnZXRSZWY/LnZhbHVlIHx8IHN0YXRlLnJvb3RSZWYudmFsdWVcbiAgICAgIGVsLmZvY3VzKClcbiAgICB9XG4gICAgZWxzZSBpZiAoc3RhdGUucm9vdFJlZi52YWx1ZS5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSA9PT0gdHJ1ZSkge1xuICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ibHVyKClcbiAgICB9XG5cbiAgICBpZiAocHJvcHMudHlwZSA9PT0gJ2ZpbGUnKSB7XG4gICAgICAvLyBkbyBub3QgbGV0IGZvY3VzIGJlIHRyaWdnZXJlZFxuICAgICAgLy8gYXMgaXQgd2lsbCBtYWtlIHRoZSBuYXRpdmUgZmlsZSBkaWFsb2dcbiAgICAgIC8vIGFwcGVhciBmb3IgYW5vdGhlciBzZWxlY3Rpb25cbiAgICAgIHN0YXRlLmlucHV0UmVmLnZhbHVlLnZhbHVlID0gbnVsbFxuICAgIH1cblxuICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgbnVsbClcbiAgICBzdGF0ZS5jaGFuZ2VFdmVudCA9PT0gdHJ1ZSAmJiBlbWl0KCdjaGFuZ2UnLCBudWxsKVxuICAgIGVtaXQoJ2NsZWFyJywgcHJvcHMubW9kZWxWYWx1ZSlcblxuICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgIGNvbnN0IGlzRGlydHkgPSBpc0RpcnR5TW9kZWwudmFsdWVcbiAgICAgIHJlc2V0VmFsaWRhdGlvbigpXG4gICAgICBpc0RpcnR5TW9kZWwudmFsdWUgPSBpc0RpcnR5XG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uQ2xlYXJhYmxlS2V5dXAgKGV2dCkge1xuICAgIFsgMTMsIDMyIF0uaW5jbHVkZXMoZXZ0LmtleUNvZGUpICYmIGNsZWFyVmFsdWUoZXZ0KVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q29udGVudCAoKSB7XG4gICAgY29uc3Qgbm9kZSA9IFtdXG5cbiAgICBzbG90cy5wcmVwZW5kICE9PSB2b2lkIDAgJiYgbm9kZS5wdXNoKFxuICAgICAgaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogJ3EtZmllbGRfX3ByZXBlbmQgcS1maWVsZF9fbWFyZ2luYWwgcm93IG5vLXdyYXAgaXRlbXMtY2VudGVyJyxcbiAgICAgICAga2V5OiAncHJlcGVuZCcsXG4gICAgICAgIG9uQ2xpY2s6IHByZXZlbnRcbiAgICAgIH0sIHNsb3RzLnByZXBlbmQoKSlcbiAgICApXG5cbiAgICBub2RlLnB1c2goXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiAncS1maWVsZF9fY29udHJvbC1jb250YWluZXIgY29sIHJlbGF0aXZlLXBvc2l0aW9uIHJvdyBuby13cmFwIHEtYW5jaG9yLS1za2lwJ1xuICAgICAgfSwgZ2V0Q29udHJvbENvbnRhaW5lcigpKVxuICAgIClcblxuICAgIGhhc0Vycm9yLnZhbHVlID09PSB0cnVlICYmIHByb3BzLm5vRXJyb3JJY29uID09PSBmYWxzZSAmJiBub2RlLnB1c2goXG4gICAgICBnZXRJbm5lckFwcGVuZE5vZGUoJ2Vycm9yJywgW1xuICAgICAgICBoKFFJY29uLCB7IG5hbWU6ICRxLmljb25TZXQuZmllbGQuZXJyb3IsIGNvbG9yOiAnbmVnYXRpdmUnIH0pXG4gICAgICBdKVxuICAgIClcblxuICAgIGlmIChwcm9wcy5sb2FkaW5nID09PSB0cnVlIHx8IHN0YXRlLmlubmVyTG9hZGluZy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgbm9kZS5wdXNoKFxuICAgICAgICBnZXRJbm5lckFwcGVuZE5vZGUoXG4gICAgICAgICAgJ2lubmVyLWxvYWRpbmctYXBwZW5kJyxcbiAgICAgICAgICBzbG90cy5sb2FkaW5nICE9PSB2b2lkIDBcbiAgICAgICAgICAgID8gc2xvdHMubG9hZGluZygpXG4gICAgICAgICAgICA6IFsgaChRU3Bpbm5lciwgeyBjb2xvcjogcHJvcHMuY29sb3IgfSkgXVxuICAgICAgICApXG4gICAgICApXG4gICAgfVxuICAgIGVsc2UgaWYgKHByb3BzLmNsZWFyYWJsZSA9PT0gdHJ1ZSAmJiBzdGF0ZS5oYXNWYWx1ZS52YWx1ZSA9PT0gdHJ1ZSAmJiBzdGF0ZS5lZGl0YWJsZS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgbm9kZS5wdXNoKFxuICAgICAgICBnZXRJbm5lckFwcGVuZE5vZGUoJ2lubmVyLWNsZWFyYWJsZS1hcHBlbmQnLCBbXG4gICAgICAgICAgaChRSWNvbiwge1xuICAgICAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19mb2N1c2FibGUtYWN0aW9uJyxcbiAgICAgICAgICAgIG5hbWU6IHByb3BzLmNsZWFySWNvbiB8fCAkcS5pY29uU2V0LmZpZWxkLmNsZWFyLFxuICAgICAgICAgICAgdGFiaW5kZXg6IDAsXG4gICAgICAgICAgICByb2xlOiAnYnV0dG9uJyxcbiAgICAgICAgICAgICdhcmlhLWhpZGRlbic6ICdmYWxzZScsXG4gICAgICAgICAgICAnYXJpYS1sYWJlbCc6ICRxLmxhbmcubGFiZWwuY2xlYXIsXG4gICAgICAgICAgICBvbktleXVwOiBvbkNsZWFyYWJsZUtleXVwLFxuICAgICAgICAgICAgb25DbGljazogY2xlYXJWYWx1ZVxuICAgICAgICAgIH0pXG4gICAgICAgIF0pXG4gICAgICApXG4gICAgfVxuXG4gICAgc2xvdHMuYXBwZW5kICE9PSB2b2lkIDAgJiYgbm9kZS5wdXNoKFxuICAgICAgaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogJ3EtZmllbGRfX2FwcGVuZCBxLWZpZWxkX19tYXJnaW5hbCByb3cgbm8td3JhcCBpdGVtcy1jZW50ZXInLFxuICAgICAgICBrZXk6ICdhcHBlbmQnLFxuICAgICAgICBvbkNsaWNrOiBwcmV2ZW50XG4gICAgICB9LCBzbG90cy5hcHBlbmQoKSlcbiAgICApXG5cbiAgICBzdGF0ZS5nZXRJbm5lckFwcGVuZCAhPT0gdm9pZCAwICYmIG5vZGUucHVzaChcbiAgICAgIGdldElubmVyQXBwZW5kTm9kZSgnaW5uZXItYXBwZW5kJywgc3RhdGUuZ2V0SW5uZXJBcHBlbmQoKSlcbiAgICApXG5cbiAgICBzdGF0ZS5nZXRDb250cm9sQ2hpbGQgIT09IHZvaWQgMCAmJiBub2RlLnB1c2goXG4gICAgICBzdGF0ZS5nZXRDb250cm9sQ2hpbGQoKVxuICAgIClcblxuICAgIHJldHVybiBub2RlXG4gIH1cblxuICBmdW5jdGlvbiBnZXRDb250cm9sQ29udGFpbmVyICgpIHtcbiAgICBjb25zdCBub2RlID0gW11cblxuICAgIHByb3BzLnByZWZpeCAhPT0gdm9pZCAwICYmIHByb3BzLnByZWZpeCAhPT0gbnVsbCAmJiBub2RlLnB1c2goXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiAncS1maWVsZF9fcHJlZml4IG5vLXBvaW50ZXItZXZlbnRzIHJvdyBpdGVtcy1jZW50ZXInXG4gICAgICB9LCBwcm9wcy5wcmVmaXgpXG4gICAgKVxuXG4gICAgaWYgKHN0YXRlLmdldFNoYWRvd0NvbnRyb2wgIT09IHZvaWQgMCAmJiBzdGF0ZS5oYXNTaGFkb3cudmFsdWUgPT09IHRydWUpIHtcbiAgICAgIG5vZGUucHVzaChcbiAgICAgICAgc3RhdGUuZ2V0U2hhZG93Q29udHJvbCgpXG4gICAgICApXG4gICAgfVxuXG4gICAgaWYgKHN0YXRlLmdldENvbnRyb2wgIT09IHZvaWQgMCkge1xuICAgICAgbm9kZS5wdXNoKHN0YXRlLmdldENvbnRyb2woKSlcbiAgICB9XG4gICAgLy8gaW50ZXJuYWwgdXNhZ2Ugb25seTpcbiAgICBlbHNlIGlmIChzbG90cy5yYXdDb250cm9sICE9PSB2b2lkIDApIHtcbiAgICAgIG5vZGUucHVzaChzbG90cy5yYXdDb250cm9sKCkpXG4gICAgfVxuICAgIGVsc2UgaWYgKHNsb3RzLmNvbnRyb2wgIT09IHZvaWQgMCkge1xuICAgICAgbm9kZS5wdXNoKFxuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgcmVmOiBzdGF0ZS50YXJnZXRSZWYsXG4gICAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19uYXRpdmUgcm93JyxcbiAgICAgICAgICB0YWJpbmRleDogLTEsXG4gICAgICAgICAgLi4uc3RhdGUuc3BsaXRBdHRycy5hdHRyaWJ1dGVzLnZhbHVlLFxuICAgICAgICAgICdkYXRhLWF1dG9mb2N1cyc6IHByb3BzLmF1dG9mb2N1cyA9PT0gdHJ1ZSB8fCB2b2lkIDBcbiAgICAgICAgfSwgc2xvdHMuY29udHJvbChjb250cm9sU2xvdFNjb3BlLnZhbHVlKSlcbiAgICAgIClcbiAgICB9XG5cbiAgICBoYXNMYWJlbC52YWx1ZSA9PT0gdHJ1ZSAmJiBub2RlLnB1c2goXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiBsYWJlbENsYXNzLnZhbHVlXG4gICAgICB9LCBoU2xvdChzbG90cy5sYWJlbCwgcHJvcHMubGFiZWwpKVxuICAgIClcblxuICAgIHByb3BzLnN1ZmZpeCAhPT0gdm9pZCAwICYmIHByb3BzLnN1ZmZpeCAhPT0gbnVsbCAmJiBub2RlLnB1c2goXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiAncS1maWVsZF9fc3VmZml4IG5vLXBvaW50ZXItZXZlbnRzIHJvdyBpdGVtcy1jZW50ZXInXG4gICAgICB9LCBwcm9wcy5zdWZmaXgpXG4gICAgKVxuXG4gICAgcmV0dXJuIG5vZGUuY29uY2F0KGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Qm90dG9tICgpIHtcbiAgICBsZXQgbXNnLCBrZXlcblxuICAgIGlmIChoYXNFcnJvci52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKGVycm9yTWVzc2FnZS52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICBtc2cgPSBbIGgoJ2RpdicsIHsgcm9sZTogJ2FsZXJ0JyB9LCBlcnJvck1lc3NhZ2UudmFsdWUpIF1cbiAgICAgICAga2V5ID0gYHEtLXNsb3QtZXJyb3ItJHsgZXJyb3JNZXNzYWdlLnZhbHVlIH1gXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgbXNnID0gaFNsb3Qoc2xvdHMuZXJyb3IpXG4gICAgICAgIGtleSA9ICdxLS1zbG90LWVycm9yJ1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChwcm9wcy5oaWRlSGludCAhPT0gdHJ1ZSB8fCBzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICBpZiAocHJvcHMuaGludCAhPT0gdm9pZCAwKSB7XG4gICAgICAgIG1zZyA9IFsgaCgnZGl2JywgcHJvcHMuaGludCkgXVxuICAgICAgICBrZXkgPSBgcS0tc2xvdC1oaW50LSR7IHByb3BzLmhpbnQgfWBcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBtc2cgPSBoU2xvdChzbG90cy5oaW50KVxuICAgICAgICBrZXkgPSAncS0tc2xvdC1oaW50J1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGhhc0NvdW50ZXIgPSBwcm9wcy5jb3VudGVyID09PSB0cnVlIHx8IHNsb3RzLmNvdW50ZXIgIT09IHZvaWQgMFxuXG4gICAgaWYgKFxuICAgICAgcHJvcHMuaGlkZUJvdHRvbVNwYWNlID09PSB0cnVlXG4gICAgICAmJiBoYXNDb3VudGVyID09PSBmYWxzZVxuICAgICAgJiYgbXNnID09PSB2b2lkIDBcbiAgICApIHJldHVyblxuXG4gICAgY29uc3QgbWFpbiA9IGgoJ2RpdicsIHtcbiAgICAgIGtleSxcbiAgICAgIGNsYXNzOiAncS1maWVsZF9fbWVzc2FnZXMgY29sJ1xuICAgIH0sIG1zZylcblxuICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICBjbGFzczogJ3EtZmllbGRfX2JvdHRvbSByb3cgaXRlbXMtc3RhcnQgcS1maWVsZF9fYm90dG9tLS0nXG4gICAgICAgICsgKHByb3BzLmhpZGVCb3R0b21TcGFjZSAhPT0gdHJ1ZSA/ICdhbmltYXRlZCcgOiAnc3RhbGUnKSxcbiAgICAgIG9uQ2xpY2s6IHByZXZlbnRcbiAgICB9LCBbXG4gICAgICBwcm9wcy5oaWRlQm90dG9tU3BhY2UgPT09IHRydWVcbiAgICAgICAgPyBtYWluXG4gICAgICAgIDogaChUcmFuc2l0aW9uLCB7IG5hbWU6ICdxLXRyYW5zaXRpb24tLWZpZWxkLW1lc3NhZ2UnIH0sICgpID0+IG1haW4pLFxuXG4gICAgICBoYXNDb3VudGVyID09PSB0cnVlXG4gICAgICAgID8gaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS1maWVsZF9fY291bnRlcidcbiAgICAgICAgfSwgc2xvdHMuY291bnRlciAhPT0gdm9pZCAwID8gc2xvdHMuY291bnRlcigpIDogc3RhdGUuY29tcHV0ZWRDb3VudGVyLnZhbHVlKVxuICAgICAgICA6IG51bGxcbiAgICBdKVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0SW5uZXJBcHBlbmROb2RlIChrZXksIGNvbnRlbnQpIHtcbiAgICByZXR1cm4gY29udGVudCA9PT0gbnVsbFxuICAgICAgPyBudWxsXG4gICAgICA6IGgoJ2RpdicsIHtcbiAgICAgICAga2V5LFxuICAgICAgICBjbGFzczogJ3EtZmllbGRfX2FwcGVuZCBxLWZpZWxkX19tYXJnaW5hbCByb3cgbm8td3JhcCBpdGVtcy1jZW50ZXIgcS1hbmNob3ItLXNraXAnXG4gICAgICB9LCBjb250ZW50KVxuICB9XG5cbiAgbGV0IHNob3VsZEFjdGl2YXRlID0gZmFsc2VcblxuICBvbkRlYWN0aXZhdGVkKCgpID0+IHtcbiAgICBzaG91bGRBY3RpdmF0ZSA9IHRydWVcbiAgfSlcblxuICBvbkFjdGl2YXRlZCgoKSA9PiB7XG4gICAgc2hvdWxkQWN0aXZhdGUgPT09IHRydWUgJiYgcHJvcHMuYXV0b2ZvY3VzID09PSB0cnVlICYmIHByb3h5LmZvY3VzKClcbiAgfSlcblxuICBwcm9wcy5hdXRvZm9jdXMgPT09IHRydWUgJiYgb25Nb3VudGVkKCgpID0+IHtcbiAgICBwcm94eS5mb2N1cygpXG4gIH0pXG5cbiAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICBmb2N1c291dFRpbWVyICE9PSBudWxsICYmIGNsZWFyVGltZW91dChmb2N1c291dFRpbWVyKVxuICB9KVxuXG4gIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kc1xuICBPYmplY3QuYXNzaWduKHByb3h5LCB7IGZvY3VzLCBibHVyIH0pXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHJlbmRlckZpZWxkICgpIHtcbiAgICBjb25zdCBsYWJlbEF0dHJzID0gc3RhdGUuZ2V0Q29udHJvbCA9PT0gdm9pZCAwICYmIHNsb3RzLmNvbnRyb2wgPT09IHZvaWQgMFxuICAgICAgPyB7XG4gICAgICAgICAgLi4uc3RhdGUuc3BsaXRBdHRycy5hdHRyaWJ1dGVzLnZhbHVlLFxuICAgICAgICAgICdkYXRhLWF1dG9mb2N1cyc6IHByb3BzLmF1dG9mb2N1cyA9PT0gdHJ1ZSB8fCB2b2lkIDAsXG4gICAgICAgICAgLi4uYXR0cmlidXRlcy52YWx1ZVxuICAgICAgICB9XG4gICAgICA6IGF0dHJpYnV0ZXMudmFsdWVcblxuICAgIHJldHVybiBoKHN0YXRlLnRhZy52YWx1ZSwge1xuICAgICAgcmVmOiBzdGF0ZS5yb290UmVmLFxuICAgICAgY2xhc3M6IFtcbiAgICAgICAgY2xhc3Nlcy52YWx1ZSxcbiAgICAgICAgYXR0cnMuY2xhc3NcbiAgICAgIF0sXG4gICAgICBzdHlsZTogYXR0cnMuc3R5bGUsXG4gICAgICAuLi5sYWJlbEF0dHJzXG4gICAgfSwgW1xuICAgICAgc2xvdHMuYmVmb3JlICE9PSB2b2lkIDBcbiAgICAgICAgPyBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19iZWZvcmUgcS1maWVsZF9fbWFyZ2luYWwgcm93IG5vLXdyYXAgaXRlbXMtY2VudGVyJyxcbiAgICAgICAgICBvbkNsaWNrOiBwcmV2ZW50XG4gICAgICAgIH0sIHNsb3RzLmJlZm9yZSgpKVxuICAgICAgICA6IG51bGwsXG5cbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19pbm5lciByZWxhdGl2ZS1wb3NpdGlvbiBjb2wgc2VsZi1zdHJldGNoJ1xuICAgICAgfSwgW1xuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgcmVmOiBzdGF0ZS5jb250cm9sUmVmLFxuICAgICAgICAgIGNsYXNzOiBjb250ZW50Q2xhc3MudmFsdWUsXG4gICAgICAgICAgdGFiaW5kZXg6IC0xLFxuICAgICAgICAgIC4uLnN0YXRlLmNvbnRyb2xFdmVudHNcbiAgICAgICAgfSwgZ2V0Q29udGVudCgpKSxcblxuICAgICAgICBzaG91bGRSZW5kZXJCb3R0b20udmFsdWUgPT09IHRydWVcbiAgICAgICAgICA/IGdldEJvdHRvbSgpXG4gICAgICAgICAgOiBudWxsXG4gICAgICBdKSxcblxuICAgICAgc2xvdHMuYWZ0ZXIgIT09IHZvaWQgMFxuICAgICAgICA/IGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogJ3EtZmllbGRfX2FmdGVyIHEtZmllbGRfX21hcmdpbmFsIHJvdyBuby13cmFwIGl0ZW1zLWNlbnRlcicsXG4gICAgICAgICAgb25DbGljazogcHJldmVudFxuICAgICAgICB9LCBzbG90cy5hZnRlcigpKVxuICAgICAgICA6IG51bGxcbiAgICBdKVxuICB9XG59XG4iLCJpbXBvcnQgdXNlRmllbGQsIHsgdXNlRmllbGRTdGF0ZSwgdXNlRmllbGRQcm9wcywgdXNlRmllbGRFbWl0cyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLWZpZWxkL3VzZS1maWVsZC5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUZpZWxkJyxcblxuICBpbmhlcml0QXR0cnM6IGZhbHNlLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlRmllbGRQcm9wcyxcblxuICAgIHRhZzoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2xhYmVsJ1xuICAgIH1cbiAgfSxcblxuICBlbWl0czogdXNlRmllbGRFbWl0cyxcblxuICBzZXR1cCAoKSB7XG4gICAgcmV0dXJuIHVzZUZpZWxkKFxuICAgICAgdXNlRmllbGRTdGF0ZSh7IHRhZ1Byb3A6IHRydWUgfSlcbiAgICApXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoLCBjb21wdXRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgUUljb24gZnJvbSAnLi4vaWNvbi9RSWNvbi5qcydcblxuaW1wb3J0IFJpcHBsZSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3JpcHBsZS9SaXBwbGUuanMnXG5cbmltcG9ydCB1c2VEYXJrLCB7IHVzZURhcmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLWRhcmsvdXNlLWRhcmsuanMnXG5pbXBvcnQgdXNlU2l6ZSwgeyB1c2VTaXplUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1zaXplL3VzZS1zaXplLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBzdG9wQW5kUHJldmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50L2V2ZW50LmpzJ1xuaW1wb3J0IHsgaE1lcmdlU2xvdFNhZmVseSwgaERpciB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRTaXplcyA9IHtcbiAgeHM6IDgsXG4gIHNtOiAxMCxcbiAgbWQ6IDE0LFxuICBsZzogMjAsXG4gIHhsOiAyNFxufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUNoaXAnLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlRGFya1Byb3BzLFxuICAgIC4uLnVzZVNpemVQcm9wcyxcblxuICAgIGRlbnNlOiBCb29sZWFuLFxuXG4gICAgaWNvbjogU3RyaW5nLFxuICAgIGljb25SaWdodDogU3RyaW5nLFxuICAgIGljb25SZW1vdmU6IFN0cmluZyxcbiAgICBpY29uU2VsZWN0ZWQ6IFN0cmluZyxcbiAgICBsYWJlbDogWyBTdHJpbmcsIE51bWJlciBdLFxuXG4gICAgY29sb3I6IFN0cmluZyxcbiAgICB0ZXh0Q29sb3I6IFN0cmluZyxcblxuICAgIG1vZGVsVmFsdWU6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiB0cnVlXG4gICAgfSxcbiAgICBzZWxlY3RlZDoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuXG4gICAgc3F1YXJlOiBCb29sZWFuLFxuICAgIG91dGxpbmU6IEJvb2xlYW4sXG4gICAgY2xpY2thYmxlOiBCb29sZWFuLFxuICAgIHJlbW92YWJsZTogQm9vbGVhbixcblxuICAgIHJlbW92ZUFyaWFMYWJlbDogU3RyaW5nLFxuXG4gICAgdGFiaW5kZXg6IFsgU3RyaW5nLCBOdW1iZXIgXSxcbiAgICBkaXNhYmxlOiBCb29sZWFuLFxuXG4gICAgcmlwcGxlOiB7XG4gICAgICB0eXBlOiBbIEJvb2xlYW4sIE9iamVjdCBdLFxuICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgIH1cbiAgfSxcblxuICBlbWl0czogWyAndXBkYXRlOm1vZGVsVmFsdWUnLCAndXBkYXRlOnNlbGVjdGVkJywgJ3JlbW92ZScsICdjbGljaycgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIGNvbnN0IHsgcHJveHk6IHsgJHEgfSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsICRxKVxuICAgIGNvbnN0IHNpemVTdHlsZSA9IHVzZVNpemUocHJvcHMsIGRlZmF1bHRTaXplcylcblxuICAgIGNvbnN0IGhhc0xlZnRJY29uID0gY29tcHV0ZWQoKCkgPT4gcHJvcHMuc2VsZWN0ZWQgPT09IHRydWUgfHwgcHJvcHMuaWNvbiAhPT0gdm9pZCAwKVxuXG4gICAgY29uc3QgbGVmdEljb24gPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5zZWxlY3RlZCA9PT0gdHJ1ZVxuICAgICAgICA/IHByb3BzLmljb25TZWxlY3RlZCB8fCAkcS5pY29uU2V0LmNoaXAuc2VsZWN0ZWRcbiAgICAgICAgOiBwcm9wcy5pY29uXG4gICAgKSlcblxuICAgIGNvbnN0IHJlbW92ZUljb24gPSBjb21wdXRlZCgoKSA9PiBwcm9wcy5pY29uUmVtb3ZlIHx8ICRxLmljb25TZXQuY2hpcC5yZW1vdmUpXG5cbiAgICBjb25zdCBpc0NsaWNrYWJsZSA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5kaXNhYmxlID09PSBmYWxzZVxuICAgICAgJiYgKHByb3BzLmNsaWNrYWJsZSA9PT0gdHJ1ZSB8fCBwcm9wcy5zZWxlY3RlZCAhPT0gbnVsbClcbiAgICApXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgdGV4dCA9IHByb3BzLm91dGxpbmUgPT09IHRydWVcbiAgICAgICAgPyBwcm9wcy5jb2xvciB8fCBwcm9wcy50ZXh0Q29sb3JcbiAgICAgICAgOiBwcm9wcy50ZXh0Q29sb3JcblxuICAgICAgcmV0dXJuICdxLWNoaXAgcm93IGlubGluZSBuby13cmFwIGl0ZW1zLWNlbnRlcidcbiAgICAgICAgKyAocHJvcHMub3V0bGluZSA9PT0gZmFsc2UgJiYgcHJvcHMuY29sb3IgIT09IHZvaWQgMCA/IGAgYmctJHsgcHJvcHMuY29sb3IgfWAgOiAnJylcbiAgICAgICAgKyAodGV4dCA/IGAgdGV4dC0keyB0ZXh0IH0gcS1jaGlwLS1jb2xvcmVkYCA6ICcnKVxuICAgICAgICArIChwcm9wcy5kaXNhYmxlID09PSB0cnVlID8gJyBkaXNhYmxlZCcgOiAnJylcbiAgICAgICAgKyAocHJvcHMuZGVuc2UgPT09IHRydWUgPyAnIHEtY2hpcC0tZGVuc2UnIDogJycpXG4gICAgICAgICsgKHByb3BzLm91dGxpbmUgPT09IHRydWUgPyAnIHEtY2hpcC0tb3V0bGluZScgOiAnJylcbiAgICAgICAgKyAocHJvcHMuc2VsZWN0ZWQgPT09IHRydWUgPyAnIHEtY2hpcC0tc2VsZWN0ZWQnIDogJycpXG4gICAgICAgICsgKGlzQ2xpY2thYmxlLnZhbHVlID09PSB0cnVlID8gJyBxLWNoaXAtLWNsaWNrYWJsZSBjdXJzb3ItcG9pbnRlciBub24tc2VsZWN0YWJsZSBxLWhvdmVyYWJsZScgOiAnJylcbiAgICAgICAgKyAocHJvcHMuc3F1YXJlID09PSB0cnVlID8gJyBxLWNoaXAtLXNxdWFyZScgOiAnJylcbiAgICAgICAgKyAoaXNEYXJrLnZhbHVlID09PSB0cnVlID8gJyBxLWNoaXAtLWRhcmsgcS1kYXJrJyA6ICcnKVxuICAgIH0pXG5cbiAgICBjb25zdCBhdHRyaWJ1dGVzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgY2hpcCA9IHByb3BzLmRpc2FibGUgPT09IHRydWVcbiAgICAgICAgPyB7IHRhYmluZGV4OiAtMSwgJ2FyaWEtZGlzYWJsZWQnOiAndHJ1ZScgfVxuICAgICAgICA6IHsgdGFiaW5kZXg6IHByb3BzLnRhYmluZGV4IHx8IDAgfVxuXG4gICAgICBjb25zdCByZW1vdmUgPSB7XG4gICAgICAgIC4uLmNoaXAsXG4gICAgICAgIHJvbGU6ICdidXR0b24nLFxuICAgICAgICAnYXJpYS1oaWRkZW4nOiAnZmFsc2UnLFxuICAgICAgICAnYXJpYS1sYWJlbCc6IHByb3BzLnJlbW92ZUFyaWFMYWJlbCB8fCAkcS5sYW5nLmxhYmVsLnJlbW92ZVxuICAgICAgfVxuXG4gICAgICByZXR1cm4geyBjaGlwLCByZW1vdmUgfVxuICAgIH0pXG5cbiAgICBmdW5jdGlvbiBvbktleXVwIChlKSB7XG4gICAgICBlLmtleUNvZGUgPT09IDEzIC8qIEVOVEVSICovICYmIG9uQ2xpY2soZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkNsaWNrIChlKSB7XG4gICAgICBpZiAoIXByb3BzLmRpc2FibGUpIHtcbiAgICAgICAgZW1pdCgndXBkYXRlOnNlbGVjdGVkJywgIXByb3BzLnNlbGVjdGVkKVxuICAgICAgICBlbWl0KCdjbGljaycsIGUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25SZW1vdmUgKGUpIHtcbiAgICAgIGlmIChlLmtleUNvZGUgPT09IHZvaWQgMCB8fCBlLmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgICAgIGlmIChwcm9wcy5kaXNhYmxlID09PSBmYWxzZSkge1xuICAgICAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgZmFsc2UpXG4gICAgICAgICAgZW1pdCgncmVtb3ZlJylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldENvbnRlbnQgKCkge1xuICAgICAgY29uc3QgY2hpbGQgPSBbXVxuXG4gICAgICBpc0NsaWNrYWJsZS52YWx1ZSA9PT0gdHJ1ZSAmJiBjaGlsZC5wdXNoKFxuICAgICAgICBoKCdkaXYnLCB7IGNsYXNzOiAncS1mb2N1cy1oZWxwZXInIH0pXG4gICAgICApXG5cbiAgICAgIGhhc0xlZnRJY29uLnZhbHVlID09PSB0cnVlICYmIGNoaWxkLnB1c2goXG4gICAgICAgIGgoUUljb24sIHtcbiAgICAgICAgICBjbGFzczogJ3EtY2hpcF9faWNvbiBxLWNoaXBfX2ljb24tLWxlZnQnLFxuICAgICAgICAgIG5hbWU6IGxlZnRJY29uLnZhbHVlXG4gICAgICAgIH0pXG4gICAgICApXG5cbiAgICAgIGNvbnN0IGxhYmVsID0gcHJvcHMubGFiZWwgIT09IHZvaWQgMFxuICAgICAgICA/IFsgaCgnZGl2JywgeyBjbGFzczogJ2VsbGlwc2lzJyB9LCBbIHByb3BzLmxhYmVsIF0pIF1cbiAgICAgICAgOiB2b2lkIDBcblxuICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS1jaGlwX19jb250ZW50IGNvbCByb3cgbm8td3JhcCBpdGVtcy1jZW50ZXIgcS1hbmNob3ItLXNraXAnXG4gICAgICAgIH0sIGhNZXJnZVNsb3RTYWZlbHkoc2xvdHMuZGVmYXVsdCwgbGFiZWwpKVxuICAgICAgKVxuXG4gICAgICBwcm9wcy5pY29uUmlnaHQgJiYgY2hpbGQucHVzaChcbiAgICAgICAgaChRSWNvbiwge1xuICAgICAgICAgIGNsYXNzOiAncS1jaGlwX19pY29uIHEtY2hpcF9faWNvbi0tcmlnaHQnLFxuICAgICAgICAgIG5hbWU6IHByb3BzLmljb25SaWdodFxuICAgICAgICB9KVxuICAgICAgKVxuXG4gICAgICBwcm9wcy5yZW1vdmFibGUgPT09IHRydWUgJiYgY2hpbGQucHVzaChcbiAgICAgICAgaChRSWNvbiwge1xuICAgICAgICAgIGNsYXNzOiAncS1jaGlwX19pY29uIHEtY2hpcF9faWNvbi0tcmVtb3ZlIGN1cnNvci1wb2ludGVyJyxcbiAgICAgICAgICBuYW1lOiByZW1vdmVJY29uLnZhbHVlLFxuICAgICAgICAgIC4uLmF0dHJpYnV0ZXMudmFsdWUucmVtb3ZlLFxuICAgICAgICAgIG9uQ2xpY2s6IG9uUmVtb3ZlLFxuICAgICAgICAgIG9uS2V5dXA6IG9uUmVtb3ZlXG4gICAgICAgIH0pXG4gICAgICApXG5cbiAgICAgIHJldHVybiBjaGlsZFxuICAgIH1cblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpZiAocHJvcHMubW9kZWxWYWx1ZSA9PT0gZmFsc2UpIHJldHVyblxuXG4gICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgICAgc3R5bGU6IHNpemVTdHlsZS52YWx1ZVxuICAgICAgfVxuXG4gICAgICBpc0NsaWNrYWJsZS52YWx1ZSA9PT0gdHJ1ZSAmJiBPYmplY3QuYXNzaWduKFxuICAgICAgICBkYXRhLFxuICAgICAgICBhdHRyaWJ1dGVzLnZhbHVlLmNoaXAsXG4gICAgICAgIHsgb25DbGljaywgb25LZXl1cCB9XG4gICAgICApXG5cbiAgICAgIHJldHVybiBoRGlyKFxuICAgICAgICAnZGl2JyxcbiAgICAgICAgZGF0YSxcbiAgICAgICAgZ2V0Q29udGVudCgpLFxuICAgICAgICAncmlwcGxlJyxcbiAgICAgICAgcHJvcHMucmlwcGxlICE9PSBmYWxzZSAmJiBwcm9wcy5kaXNhYmxlICE9PSB0cnVlLFxuICAgICAgICAoKSA9PiBbIFsgUmlwcGxlLCBwcm9wcy5yaXBwbGUgXSBdXG4gICAgICApXG4gICAgfVxuICB9XG59KVxuIiwiaW1wb3J0IHsgcmVmLCB3YXRjaCwgb25Nb3VudGVkLCBvbkJlZm9yZVVubW91bnQsIG5leHRUaWNrLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGNsZWFyU2VsZWN0aW9uIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5zZWxlY3Rpb24vc2VsZWN0aW9uLmpzJ1xuaW1wb3J0IHsgYWRkRXZ0LCBjbGVhbkV2dCwgcHJldmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50L2V2ZW50LmpzJ1xuaW1wb3J0IHsgaXNLZXlDb2RlIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5rZXlib2FyZC9rZXktY29tcG9zaXRpb24uanMnXG5cbmV4cG9ydCBjb25zdCB1c2VBbmNob3JTdGF0aWNQcm9wcyA9IHtcbiAgLyogU1NSIGRvZXMgbm90IGtub3cgYWJvdXQgRWxlbWVudCAqL1xuICB0YXJnZXQ6IF9fUVVBU0FSX1NTUl9TRVJWRVJfX1xuICAgID8geyBkZWZhdWx0OiB0cnVlIH1cbiAgICA6IHtcbiAgICAgICAgdHlwZTogWyBCb29sZWFuLCBTdHJpbmcsIEVsZW1lbnQgXSxcbiAgICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgICAgfSxcblxuICBub1BhcmVudEV2ZW50OiBCb29sZWFuXG59XG5cbmV4cG9ydCBjb25zdCB1c2VBbmNob3JQcm9wcyA9IHtcbiAgLi4udXNlQW5jaG9yU3RhdGljUHJvcHMsXG4gIGNvbnRleHRNZW51OiBCb29sZWFuXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh7XG4gIHNob3dpbmcsXG4gIGF2b2lkRW1pdCwgLy8gcmVxdWlyZWQgZm9yIFFQb3B1cFByb3h5ICh0cnVlKVxuICBjb25maWd1cmVBbmNob3JFbCAvLyBvcHRpb25hbFxufSkge1xuICBjb25zdCB7IHByb3BzLCBwcm94eSwgZW1pdCB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICBjb25zdCBhbmNob3JFbCA9IHJlZihudWxsKVxuXG4gIGxldCB0b3VjaFRpbWVyID0gbnVsbFxuXG4gIGZ1bmN0aW9uIGNhblNob3cgKGV2dCkge1xuICAgIC8vIGFib3J0IHdpdGggbm8gcGFyZW50IGNvbmZpZ3VyZWQgb3Igb24gbXVsdGktdG91Y2hcbiAgICByZXR1cm4gYW5jaG9yRWwudmFsdWUgPT09IG51bGxcbiAgICAgID8gZmFsc2VcbiAgICAgIDogKGV2dCA9PT0gdm9pZCAwIHx8IGV2dC50b3VjaGVzID09PSB2b2lkIDAgfHwgZXZ0LnRvdWNoZXMubGVuZ3RoIDw9IDEpXG4gIH1cblxuICBjb25zdCBhbmNob3JFdmVudHMgPSB7fVxuXG4gIGlmIChjb25maWd1cmVBbmNob3JFbCA9PT0gdm9pZCAwKSB7XG4gICAgLy8gZGVmYXVsdCBjb25maWd1cmVBbmNob3JFbCBpcyBkZXNpZ25lZCBmb3JcbiAgICAvLyBRTWVudSAmIFFQb3B1cFByb3h5ICh3aGljaCBpcyB3aHkgaXQncyBoYW5kbGVkIGhlcmUpXG5cbiAgICBPYmplY3QuYXNzaWduKGFuY2hvckV2ZW50cywge1xuICAgICAgaGlkZSAoZXZ0KSB7XG4gICAgICAgIHByb3h5LmhpZGUoZXZ0KVxuICAgICAgfSxcblxuICAgICAgdG9nZ2xlIChldnQpIHtcbiAgICAgICAgcHJveHkudG9nZ2xlKGV2dClcbiAgICAgICAgZXZ0LnFBbmNob3JIYW5kbGVkID0gdHJ1ZVxuICAgICAgfSxcblxuICAgICAgdG9nZ2xlS2V5IChldnQpIHtcbiAgICAgICAgaXNLZXlDb2RlKGV2dCwgMTMpID09PSB0cnVlICYmIGFuY2hvckV2ZW50cy50b2dnbGUoZXZ0KVxuICAgICAgfSxcblxuICAgICAgY29udGV4dENsaWNrIChldnQpIHtcbiAgICAgICAgcHJveHkuaGlkZShldnQpXG4gICAgICAgIHByZXZlbnQoZXZ0KVxuICAgICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgcHJveHkuc2hvdyhldnQpXG4gICAgICAgICAgZXZ0LnFBbmNob3JIYW5kbGVkID0gdHJ1ZVxuICAgICAgICB9KVxuICAgICAgfSxcblxuICAgICAgcHJldmVudCxcblxuICAgICAgbW9iaWxlVG91Y2ggKGV2dCkge1xuICAgICAgICBhbmNob3JFdmVudHMubW9iaWxlQ2xlYW51cChldnQpXG5cbiAgICAgICAgaWYgKGNhblNob3coZXZ0KSAhPT0gdHJ1ZSkgcmV0dXJuXG5cbiAgICAgICAgcHJveHkuaGlkZShldnQpXG4gICAgICAgIGFuY2hvckVsLnZhbHVlLmNsYXNzTGlzdC5hZGQoJ25vbi1zZWxlY3RhYmxlJylcblxuICAgICAgICBjb25zdCB0YXJnZXQgPSBldnQudGFyZ2V0XG4gICAgICAgIGFkZEV2dChhbmNob3JFdmVudHMsICdhbmNob3InLCBbXG4gICAgICAgICAgWyB0YXJnZXQsICd0b3VjaG1vdmUnLCAnbW9iaWxlQ2xlYW51cCcsICdwYXNzaXZlJyBdLFxuICAgICAgICAgIFsgdGFyZ2V0LCAndG91Y2hlbmQnLCAnbW9iaWxlQ2xlYW51cCcsICdwYXNzaXZlJyBdLFxuICAgICAgICAgIFsgdGFyZ2V0LCAndG91Y2hjYW5jZWwnLCAnbW9iaWxlQ2xlYW51cCcsICdwYXNzaXZlJyBdLFxuICAgICAgICAgIFsgYW5jaG9yRWwudmFsdWUsICdjb250ZXh0bWVudScsICdwcmV2ZW50JywgJ25vdFBhc3NpdmUnIF1cbiAgICAgICAgXSlcblxuICAgICAgICB0b3VjaFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdG91Y2hUaW1lciA9IG51bGxcbiAgICAgICAgICBwcm94eS5zaG93KGV2dClcbiAgICAgICAgICBldnQucUFuY2hvckhhbmRsZWQgPSB0cnVlXG4gICAgICAgIH0sIDMwMClcbiAgICAgIH0sXG5cbiAgICAgIG1vYmlsZUNsZWFudXAgKGV2dCkge1xuICAgICAgICBhbmNob3JFbC52YWx1ZS5jbGFzc0xpc3QucmVtb3ZlKCdub24tc2VsZWN0YWJsZScpXG5cbiAgICAgICAgaWYgKHRvdWNoVGltZXIgIT09IG51bGwpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodG91Y2hUaW1lcilcbiAgICAgICAgICB0b3VjaFRpbWVyID0gbnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNob3dpbmcudmFsdWUgPT09IHRydWUgJiYgZXZ0ICE9PSB2b2lkIDApIHtcbiAgICAgICAgICBjbGVhclNlbGVjdGlvbigpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uZmlndXJlQW5jaG9yRWwgPSBmdW5jdGlvbiAoY29udGV4dCA9IHByb3BzLmNvbnRleHRNZW51KSB7XG4gICAgICBpZiAocHJvcHMubm9QYXJlbnRFdmVudCA9PT0gdHJ1ZSB8fCBhbmNob3JFbC52YWx1ZSA9PT0gbnVsbCkgcmV0dXJuXG5cbiAgICAgIGxldCBldnRzXG5cbiAgICAgIGlmIChjb250ZXh0ID09PSB0cnVlKSB7XG4gICAgICAgIGlmIChwcm94eS4kcS5wbGF0Zm9ybS5pcy5tb2JpbGUgPT09IHRydWUpIHtcbiAgICAgICAgICBldnRzID0gW1xuICAgICAgICAgICAgWyBhbmNob3JFbC52YWx1ZSwgJ3RvdWNoc3RhcnQnLCAnbW9iaWxlVG91Y2gnLCAncGFzc2l2ZScgXVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBldnRzID0gW1xuICAgICAgICAgICAgWyBhbmNob3JFbC52YWx1ZSwgJ21vdXNlZG93bicsICdoaWRlJywgJ3Bhc3NpdmUnIF0sXG4gICAgICAgICAgICBbIGFuY2hvckVsLnZhbHVlLCAnY29udGV4dG1lbnUnLCAnY29udGV4dENsaWNrJywgJ25vdFBhc3NpdmUnIF1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBldnRzID0gW1xuICAgICAgICAgIFsgYW5jaG9yRWwudmFsdWUsICdjbGljaycsICd0b2dnbGUnLCAncGFzc2l2ZScgXSxcbiAgICAgICAgICBbIGFuY2hvckVsLnZhbHVlLCAna2V5dXAnLCAndG9nZ2xlS2V5JywgJ3Bhc3NpdmUnIF1cbiAgICAgICAgXVxuICAgICAgfVxuXG4gICAgICBhZGRFdnQoYW5jaG9yRXZlbnRzLCAnYW5jaG9yJywgZXZ0cylcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1bmNvbmZpZ3VyZUFuY2hvckVsICgpIHtcbiAgICBjbGVhbkV2dChhbmNob3JFdmVudHMsICdhbmNob3InKVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0QW5jaG9yRWwgKGVsKSB7XG4gICAgYW5jaG9yRWwudmFsdWUgPSBlbFxuICAgIHdoaWxlIChhbmNob3JFbC52YWx1ZS5jbGFzc0xpc3QuY29udGFpbnMoJ3EtYW5jaG9yLS1za2lwJykpIHtcbiAgICAgIGFuY2hvckVsLnZhbHVlID0gYW5jaG9yRWwudmFsdWUucGFyZW50Tm9kZVxuICAgIH1cbiAgICBjb25maWd1cmVBbmNob3JFbCgpXG4gIH1cblxuICBmdW5jdGlvbiBwaWNrQW5jaG9yRWwgKCkge1xuICAgIGlmIChwcm9wcy50YXJnZXQgPT09IGZhbHNlIHx8IHByb3BzLnRhcmdldCA9PT0gJycgfHwgcHJveHkuJGVsLnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICAgIGFuY2hvckVsLnZhbHVlID0gbnVsbFxuICAgIH1cbiAgICBlbHNlIGlmIChwcm9wcy50YXJnZXQgPT09IHRydWUpIHtcbiAgICAgIHNldEFuY2hvckVsKHByb3h5LiRlbC5wYXJlbnROb2RlKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGxldCBlbCA9IHByb3BzLnRhcmdldFxuXG4gICAgICBpZiAodHlwZW9mIHByb3BzLnRhcmdldCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocHJvcHMudGFyZ2V0KVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBlbCA9IHZvaWQgMFxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChlbCAhPT0gdm9pZCAwICYmIGVsICE9PSBudWxsKSB7XG4gICAgICAgIGFuY2hvckVsLnZhbHVlID0gZWwuJGVsIHx8IGVsXG4gICAgICAgIGNvbmZpZ3VyZUFuY2hvckVsKClcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBhbmNob3JFbC52YWx1ZSA9IG51bGxcbiAgICAgICAgY29uc29sZS5lcnJvcihgQW5jaG9yOiB0YXJnZXQgXCIkeyBwcm9wcy50YXJnZXQgfVwiIG5vdCBmb3VuZGApXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMuY29udGV4dE1lbnUsIHZhbCA9PiB7XG4gICAgaWYgKGFuY2hvckVsLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICB1bmNvbmZpZ3VyZUFuY2hvckVsKClcbiAgICAgIGNvbmZpZ3VyZUFuY2hvckVsKHZhbClcbiAgICB9XG4gIH0pXG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMudGFyZ2V0LCAoKSA9PiB7XG4gICAgaWYgKGFuY2hvckVsLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICB1bmNvbmZpZ3VyZUFuY2hvckVsKClcbiAgICB9XG5cbiAgICBwaWNrQW5jaG9yRWwoKVxuICB9KVxuXG4gIHdhdGNoKCgpID0+IHByb3BzLm5vUGFyZW50RXZlbnQsIHZhbCA9PiB7XG4gICAgaWYgKGFuY2hvckVsLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICBpZiAodmFsID09PSB0cnVlKSB7XG4gICAgICAgIHVuY29uZmlndXJlQW5jaG9yRWwoKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbmZpZ3VyZUFuY2hvckVsKClcbiAgICAgIH1cbiAgICB9XG4gIH0pXG5cbiAgb25Nb3VudGVkKCgpID0+IHtcbiAgICBwaWNrQW5jaG9yRWwoKVxuXG4gICAgaWYgKGF2b2lkRW1pdCAhPT0gdHJ1ZSAmJiBwcm9wcy5tb2RlbFZhbHVlID09PSB0cnVlICYmIGFuY2hvckVsLnZhbHVlID09PSBudWxsKSB7XG4gICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIGZhbHNlKVxuICAgIH1cbiAgfSlcblxuICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgIHRvdWNoVGltZXIgIT09IG51bGwgJiYgY2xlYXJUaW1lb3V0KHRvdWNoVGltZXIpXG4gICAgdW5jb25maWd1cmVBbmNob3JFbCgpXG4gIH0pXG5cbiAgcmV0dXJuIHtcbiAgICBhbmNob3JFbCxcbiAgICBjYW5TaG93LFxuICAgIGFuY2hvckV2ZW50c1xuICB9XG59XG4iLCJpbXBvcnQgeyByZWYsIHdhdGNoLCBvbkJlZm9yZVVubW91bnQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGxpc3Rlbk9wdHMgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC9ldmVudC5qcydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCBjb25maWd1cmVTY3JvbGxUYXJnZXQpIHtcbiAgY29uc3QgbG9jYWxTY3JvbGxUYXJnZXQgPSByZWYobnVsbClcbiAgbGV0IHNjcm9sbEZuXG5cbiAgZnVuY3Rpb24gY2hhbmdlU2Nyb2xsRXZlbnQgKHNjcm9sbFRhcmdldCwgZm4pIHtcbiAgICBjb25zdCBmblByb3AgPSBgJHsgZm4gIT09IHZvaWQgMCA/ICdhZGQnIDogJ3JlbW92ZScgfUV2ZW50TGlzdGVuZXJgXG4gICAgY29uc3QgZm5IYW5kbGVyID0gZm4gIT09IHZvaWQgMCA/IGZuIDogc2Nyb2xsRm5cblxuICAgIGlmIChzY3JvbGxUYXJnZXQgIT09IHdpbmRvdykge1xuICAgICAgc2Nyb2xsVGFyZ2V0WyBmblByb3AgXSgnc2Nyb2xsJywgZm5IYW5kbGVyLCBsaXN0ZW5PcHRzLnBhc3NpdmUpXG4gICAgfVxuXG4gICAgd2luZG93WyBmblByb3AgXSgnc2Nyb2xsJywgZm5IYW5kbGVyLCBsaXN0ZW5PcHRzLnBhc3NpdmUpXG5cbiAgICBzY3JvbGxGbiA9IGZuXG4gIH1cblxuICBmdW5jdGlvbiB1bmNvbmZpZ3VyZVNjcm9sbFRhcmdldCAoKSB7XG4gICAgaWYgKGxvY2FsU2Nyb2xsVGFyZ2V0LnZhbHVlICE9PSBudWxsKSB7XG4gICAgICBjaGFuZ2VTY3JvbGxFdmVudChsb2NhbFNjcm9sbFRhcmdldC52YWx1ZSlcbiAgICAgIGxvY2FsU2Nyb2xsVGFyZ2V0LnZhbHVlID0gbnVsbFxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IG5vUGFyZW50RXZlbnRXYXRjaGVyID0gd2F0Y2goKCkgPT4gcHJvcHMubm9QYXJlbnRFdmVudCwgKCkgPT4ge1xuICAgIGlmIChsb2NhbFNjcm9sbFRhcmdldC52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgdW5jb25maWd1cmVTY3JvbGxUYXJnZXQoKVxuICAgICAgY29uZmlndXJlU2Nyb2xsVGFyZ2V0KClcbiAgICB9XG4gIH0pXG5cbiAgb25CZWZvcmVVbm1vdW50KG5vUGFyZW50RXZlbnRXYXRjaGVyKVxuXG4gIHJldHVybiB7XG4gICAgbG9jYWxTY3JvbGxUYXJnZXQsXG4gICAgdW5jb25maWd1cmVTY3JvbGxUYXJnZXQsXG4gICAgY2hhbmdlU2Nyb2xsRXZlbnRcbiAgfVxufVxuIiwiaW1wb3J0IHsgZ2xvYmFsQ29uZmlnIH0gZnJvbSAnLi4vcHJpdmF0ZS5jb25maWcvaW5zdGFuY2UtY29uZmlnLmpzJ1xuXG5jb25zdCBub2Rlc0xpc3QgPSBbXVxuY29uc3QgcG9ydGFsVHlwZUxpc3QgPSBbXVxuXG5sZXQgcG9ydGFsSW5kZXggPSAxXG5sZXQgdGFyZ2V0ID0gX19RVUFTQVJfU1NSX1NFUlZFUl9fXG4gID8gdm9pZCAwXG4gIDogZG9jdW1lbnQuYm9keVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlR2xvYmFsTm9kZSAoaWQsIHBvcnRhbFR5cGUpIHtcbiAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXG4gIGVsLmlkID0gcG9ydGFsVHlwZSAhPT0gdm9pZCAwXG4gICAgPyBgcS1wb3J0YWwtLSR7IHBvcnRhbFR5cGUgfS0tJHsgcG9ydGFsSW5kZXgrKyB9YFxuICAgIDogaWRcblxuICBpZiAoZ2xvYmFsQ29uZmlnLmdsb2JhbE5vZGVzICE9PSB2b2lkIDApIHtcbiAgICBjb25zdCBjbHMgPSBnbG9iYWxDb25maWcuZ2xvYmFsTm9kZXMuY2xhc3NcbiAgICBpZiAoY2xzICE9PSB2b2lkIDApIHtcbiAgICAgIGVsLmNsYXNzTmFtZSA9IGNsc1xuICAgIH1cbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChlbClcbiAgbm9kZXNMaXN0LnB1c2goZWwpXG4gIHBvcnRhbFR5cGVMaXN0LnB1c2gocG9ydGFsVHlwZSlcblxuICByZXR1cm4gZWxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUdsb2JhbE5vZGUgKGVsKSB7XG4gIGNvbnN0IG5vZGVJbmRleCA9IG5vZGVzTGlzdC5pbmRleE9mKGVsKVxuXG4gIG5vZGVzTGlzdC5zcGxpY2Uobm9kZUluZGV4LCAxKVxuICBwb3J0YWxUeXBlTGlzdC5zcGxpY2Uobm9kZUluZGV4LCAxKVxuXG4gIGVsLnJlbW92ZSgpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGFuZ2VHbG9iYWxOb2Rlc1RhcmdldCAobmV3VGFyZ2V0KSB7XG4gIGlmIChuZXdUYXJnZXQgPT09IHRhcmdldCkgcmV0dXJuXG5cbiAgdGFyZ2V0ID0gbmV3VGFyZ2V0XG5cbiAgaWYgKFxuICAgIHRhcmdldCA9PT0gZG9jdW1lbnQuYm9keVxuICAgIC8vIG9yIHdlIGhhdmUgbGVzcyB0aGFuIDIgZGlhbG9nczpcbiAgICB8fCBwb3J0YWxUeXBlTGlzdC5yZWR1Y2UoKGFjYywgdHlwZSkgPT4gKHR5cGUgPT09ICdkaWFsb2cnID8gYWNjICsgMSA6IGFjYyksIDApIDwgMlxuICApIHtcbiAgICBub2Rlc0xpc3QuZm9yRWFjaChub2RlID0+IHtcbiAgICAgIGlmIChub2RlLmNvbnRhaW5zKHRhcmdldCkgPT09IGZhbHNlKSB7XG4gICAgICAgIHRhcmdldC5hcHBlbmRDaGlsZChub2RlKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm5cbiAgfVxuXG4gIGNvbnN0IGxhc3REaWFsb2dJbmRleCA9IHBvcnRhbFR5cGVMaXN0Lmxhc3RJbmRleE9mKCdkaWFsb2cnKVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZXNMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgZWwgPSBub2Rlc0xpc3RbIGkgXVxuXG4gICAgaWYgKFxuICAgICAgKGkgPT09IGxhc3REaWFsb2dJbmRleCB8fCBwb3J0YWxUeXBlTGlzdFsgaSBdICE9PSAnZGlhbG9nJylcbiAgICAgICYmIGVsLmNvbnRhaW5zKHRhcmdldCkgPT09IGZhbHNlXG4gICAgKSB7XG4gICAgICB0YXJnZXQuYXBwZW5kQ2hpbGQoZWwpXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBnZXRQYXJlbnRQcm94eSB9IGZyb20gJy4uL3ByaXZhdGUudm0vdm0uanMnXG5cbmV4cG9ydCBjb25zdCBwb3J0YWxQcm94eUxpc3QgPSBbXVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UG9ydGFsUHJveHkgKGVsKSB7XG4gIHJldHVybiBwb3J0YWxQcm94eUxpc3QuZmluZChwcm94eSA9PlxuICAgIHByb3h5LmNvbnRlbnRFbCAhPT0gbnVsbFxuICAgICYmIHByb3h5LmNvbnRlbnRFbC5jb250YWlucyhlbClcbiAgKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xvc2VQb3J0YWxNZW51cyAocHJveHksIGV2dCkge1xuICBkbyB7XG4gICAgaWYgKHByb3h5LiRvcHRpb25zLm5hbWUgPT09ICdRTWVudScpIHtcbiAgICAgIHByb3h5LmhpZGUoZXZ0KVxuXG4gICAgICAvLyBpcyB0aGlzIGEgcG9pbnQgb2Ygc2VwYXJhdGlvbj9cbiAgICAgIGlmIChwcm94eS4kcHJvcHMuc2VwYXJhdGVDbG9zZVBvcHVwID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBnZXRQYXJlbnRQcm94eShwcm94eSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAocHJveHkuX19xUG9ydGFsID09PSB0cnVlKSB7XG4gICAgICAvLyB0cmVhdCBpdCBhcyBwb2ludCBvZiBzZXBhcmF0aW9uIGlmIHBhcmVudCBpcyBRUG9wdXBQcm94eVxuICAgICAgLy8gKHNvIG1vYmlsZSBtYXRjaGVzIGRlc2t0b3AgYmVoYXZpb3IpXG4gICAgICAvLyBhbmQgaGlkZSBpdCB0b29cbiAgICAgIGNvbnN0IHBhcmVudCA9IGdldFBhcmVudFByb3h5KHByb3h5KVxuXG4gICAgICBpZiAocGFyZW50Py4kb3B0aW9ucy5uYW1lID09PSAnUVBvcHVwUHJveHknKSB7XG4gICAgICAgIHByb3h5LmhpZGUoZXZ0KVxuICAgICAgICByZXR1cm4gcGFyZW50XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHByb3h5XG4gICAgICB9XG4gICAgfVxuXG4gICAgcHJveHkgPSBnZXRQYXJlbnRQcm94eShwcm94eSlcbiAgfSB3aGlsZSAocHJveHkgIT09IHZvaWQgMCAmJiBwcm94eSAhPT0gbnVsbClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb3NlUG9ydGFscyAocHJveHksIGV2dCwgZGVwdGgpIHtcbiAgd2hpbGUgKGRlcHRoICE9PSAwICYmIHByb3h5ICE9PSB2b2lkIDAgJiYgcHJveHkgIT09IG51bGwpIHtcbiAgICBpZiAocHJveHkuX19xUG9ydGFsID09PSB0cnVlKSB7XG4gICAgICBkZXB0aC0tXG5cbiAgICAgIGlmIChwcm94eS4kb3B0aW9ucy5uYW1lID09PSAnUU1lbnUnKSB7XG4gICAgICAgIHByb3h5ID0gY2xvc2VQb3J0YWxNZW51cyhwcm94eSwgZXZ0KVxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICBwcm94eS5oaWRlKGV2dClcbiAgICB9XG5cbiAgICBwcm94eSA9IGdldFBhcmVudFByb3h5KHByb3h5KVxuICB9XG59XG4iLCJpbXBvcnQgeyBoLCByZWYsIG9uVW5tb3VudGVkLCBUZWxlcG9ydCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgbm9vcCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50L2V2ZW50LmpzJ1xuaW1wb3J0IHsgYWRkRm9jdXNXYWl0RmxhZywgcmVtb3ZlRm9jdXNXYWl0RmxhZyB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuZm9jdXMvZm9jdXMtbWFuYWdlci5qcydcbmltcG9ydCB7IGNyZWF0ZUdsb2JhbE5vZGUsIHJlbW92ZUdsb2JhbE5vZGUgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNvbmZpZy9ub2Rlcy5qcydcbmltcG9ydCB7IHBvcnRhbFByb3h5TGlzdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucG9ydGFsL3BvcnRhbC5qcydcbmltcG9ydCB7IGluamVjdFByb3AgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmluamVjdC1vYmotcHJvcC9pbmplY3Qtb2JqLXByb3AuanMnXG5cbi8qKlxuICogTm9vcCBpbnRlcm5hbCBjb21wb25lbnQgdG8gZWFzZSB0ZXN0aW5nXG4gKiBvZiB0aGUgdGVsZXBvcnRlZCBjb250ZW50LlxuICpcbiAqIGNvbnN0IHdyYXBwZXIgPSBtb3VudChRRGlhbG9nLCB7IC4uLiB9KVxuICogY29uc3QgdGVsZXBvcnRlZFdyYXBwZXIgPSB3cmFwcGVyLmZpbmRDb21wb25lbnQoeyBuYW1lOiAnUVBvcnRhbCcgfSlcbiAqL1xuY29uc3QgUVBvcnRhbCA9IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRUG9ydGFsJyxcbiAgc2V0dXAgKF8sIHsgc2xvdHMgfSkge1xuICAgIHJldHVybiAoKSA9PiBzbG90cy5kZWZhdWx0KClcbiAgfVxufSlcblxuZnVuY3Rpb24gaXNPbkdsb2JhbERpYWxvZyAodm0pIHtcbiAgdm0gPSB2bS5wYXJlbnRcblxuICB3aGlsZSAodm0gIT09IHZvaWQgMCAmJiB2bSAhPT0gbnVsbCkge1xuICAgIGlmICh2bS50eXBlLm5hbWUgPT09ICdRR2xvYmFsRGlhbG9nJykge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgaWYgKHZtLnR5cGUubmFtZSA9PT0gJ1FEaWFsb2cnIHx8IHZtLnR5cGUubmFtZSA9PT0gJ1FNZW51Jykge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgdm0gPSB2bS5wYXJlbnRcbiAgfVxuXG4gIHJldHVybiBmYWxzZVxufVxuXG4vLyBXYXJuaW5nIVxuLy8gWW91IE1VU1Qgc3BlY2lmeSBcImluaGVyaXRBdHRyczogZmFsc2VcIiBpbiB5b3VyIGNvbXBvbmVudFxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAodm0sIGlubmVyUmVmLCByZW5kZXJQb3J0YWxDb250ZW50LCB0eXBlKSB7XG4gIC8vIHNob3dpbmcsIGluY2x1ZGluZyB3aGlsZSBpbiBzaG93L2hpZGUgdHJhbnNpdGlvblxuICBjb25zdCBwb3J0YWxJc0FjdGl2ZSA9IHJlZihmYWxzZSlcblxuICAvLyBzaG93aW5nICYgbm90IGluIGFueSBzaG93L2hpZGUgdHJhbnNpdGlvblxuICBjb25zdCBwb3J0YWxJc0FjY2Vzc2libGUgPSByZWYoZmFsc2UpXG5cbiAgaWYgKF9fUVVBU0FSX1NTUl9TRVJWRVJfXykge1xuICAgIHJldHVybiB7XG4gICAgICBwb3J0YWxJc0FjdGl2ZSxcbiAgICAgIHBvcnRhbElzQWNjZXNzaWJsZSxcblxuICAgICAgc2hvd1BvcnRhbDogbm9vcCxcbiAgICAgIGhpZGVQb3J0YWw6IG5vb3AsXG4gICAgICByZW5kZXJQb3J0YWw6IG5vb3BcbiAgICB9XG4gIH1cblxuICBsZXQgcG9ydGFsRWwgPSBudWxsXG4gIGNvbnN0IGZvY3VzT2JqID0ge31cbiAgY29uc3Qgb25HbG9iYWxEaWFsb2cgPSB0eXBlID09PSAnZGlhbG9nJyAmJiBpc09uR2xvYmFsRGlhbG9nKHZtKVxuXG4gIGZ1bmN0aW9uIHNob3dQb3J0YWwgKGlzUmVhZHkpIHtcbiAgICBpZiAoaXNSZWFkeSA9PT0gdHJ1ZSkge1xuICAgICAgcmVtb3ZlRm9jdXNXYWl0RmxhZyhmb2N1c09iailcbiAgICAgIHBvcnRhbElzQWNjZXNzaWJsZS52YWx1ZSA9IHRydWVcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHBvcnRhbElzQWNjZXNzaWJsZS52YWx1ZSA9IGZhbHNlXG5cbiAgICBpZiAocG9ydGFsSXNBY3RpdmUudmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICBpZiAob25HbG9iYWxEaWFsb2cgPT09IGZhbHNlICYmIHBvcnRhbEVsID09PSBudWxsKSB7XG4gICAgICAgIHBvcnRhbEVsID0gY3JlYXRlR2xvYmFsTm9kZShmYWxzZSwgdHlwZSlcbiAgICAgIH1cblxuICAgICAgcG9ydGFsSXNBY3RpdmUudmFsdWUgPSB0cnVlXG5cbiAgICAgIC8vIHJlZ2lzdGVyIHBvcnRhbFxuICAgICAgcG9ydGFsUHJveHlMaXN0LnB1c2godm0ucHJveHkpXG5cbiAgICAgIGFkZEZvY3VzV2FpdEZsYWcoZm9jdXNPYmopXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaGlkZVBvcnRhbCAoaXNSZWFkeSkge1xuICAgIHBvcnRhbElzQWNjZXNzaWJsZS52YWx1ZSA9IGZhbHNlXG5cbiAgICBpZiAoaXNSZWFkeSAhPT0gdHJ1ZSkgcmV0dXJuXG5cbiAgICByZW1vdmVGb2N1c1dhaXRGbGFnKGZvY3VzT2JqKVxuICAgIHBvcnRhbElzQWN0aXZlLnZhbHVlID0gZmFsc2VcblxuICAgIC8vIHVucmVnaXN0ZXIgcG9ydGFsXG4gICAgY29uc3QgaW5kZXggPSBwb3J0YWxQcm94eUxpc3QuaW5kZXhPZih2bS5wcm94eSlcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICBwb3J0YWxQcm94eUxpc3Quc3BsaWNlKGluZGV4LCAxKVxuICAgIH1cblxuICAgIGlmIChwb3J0YWxFbCAhPT0gbnVsbCkge1xuICAgICAgcmVtb3ZlR2xvYmFsTm9kZShwb3J0YWxFbClcbiAgICAgIHBvcnRhbEVsID0gbnVsbFxuICAgIH1cbiAgfVxuXG4gIG9uVW5tb3VudGVkKCgpID0+IHsgaGlkZVBvcnRhbCh0cnVlKSB9KVxuXG4gIC8vIG5lZWRlZCBmb3IgcG9ydGFsIHZtIGRldGVjdGlvblxuICB2bS5wcm94eS5fX3FQb3J0YWwgPSB0cnVlXG5cbiAgLy8gcHVibGljIHdheSBvZiBhY2Nlc3NpbmcgdGhlIHJlbmRlcmVkIGNvbnRlbnRcbiAgaW5qZWN0UHJvcCh2bS5wcm94eSwgJ2NvbnRlbnRFbCcsICgpID0+IGlubmVyUmVmLnZhbHVlKVxuXG4gIHJldHVybiB7XG4gICAgc2hvd1BvcnRhbCxcbiAgICBoaWRlUG9ydGFsLFxuXG4gICAgcG9ydGFsSXNBY3RpdmUsXG4gICAgcG9ydGFsSXNBY2Nlc3NpYmxlLFxuXG4gICAgcmVuZGVyUG9ydGFsOiAoKSA9PiAoXG4gICAgICBvbkdsb2JhbERpYWxvZyA9PT0gdHJ1ZVxuICAgICAgICA/IHJlbmRlclBvcnRhbENvbnRlbnQoKVxuICAgICAgICA6IChcbiAgICAgICAgICAgIHBvcnRhbElzQWN0aXZlLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgICAgID8gWyBoKFRlbGVwb3J0LCB7IHRvOiBwb3J0YWxFbCB9LCBoKFFQb3J0YWwsIHJlbmRlclBvcnRhbENvbnRlbnQpKSBdXG4gICAgICAgICAgICAgIDogdm9pZCAwXG4gICAgICAgICAgKVxuICAgIClcbiAgfVxufVxuIiwiaW1wb3J0IHsgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmV4cG9ydCBjb25zdCB1c2VUcmFuc2l0aW9uUHJvcHMgPSB7XG4gIHRyYW5zaXRpb25TaG93OiB7XG4gICAgdHlwZTogU3RyaW5nLFxuICAgIGRlZmF1bHQ6ICdmYWRlJ1xuICB9LFxuXG4gIHRyYW5zaXRpb25IaWRlOiB7XG4gICAgdHlwZTogU3RyaW5nLFxuICAgIGRlZmF1bHQ6ICdmYWRlJ1xuICB9LFxuXG4gIHRyYW5zaXRpb25EdXJhdGlvbjoge1xuICAgIHR5cGU6IFsgU3RyaW5nLCBOdW1iZXIgXSxcbiAgICBkZWZhdWx0OiAzMDBcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIGRlZmF1bHRTaG93Rm4gPSAoKSA9PiB7fSwgZGVmYXVsdEhpZGVGbiA9ICgpID0+IHt9KSB7XG4gIHJldHVybiB7XG4gICAgdHJhbnNpdGlvblByb3BzOiBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBzaG93ID0gYHEtdHJhbnNpdGlvbi0tJHsgcHJvcHMudHJhbnNpdGlvblNob3cgfHwgZGVmYXVsdFNob3dGbigpIH1gXG4gICAgICBjb25zdCBoaWRlID0gYHEtdHJhbnNpdGlvbi0tJHsgcHJvcHMudHJhbnNpdGlvbkhpZGUgfHwgZGVmYXVsdEhpZGVGbigpIH1gXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFwcGVhcjogdHJ1ZSxcblxuICAgICAgICBlbnRlckZyb21DbGFzczogYCR7IHNob3cgfS1lbnRlci1mcm9tYCxcbiAgICAgICAgZW50ZXJBY3RpdmVDbGFzczogYCR7IHNob3cgfS1lbnRlci1hY3RpdmVgLFxuICAgICAgICBlbnRlclRvQ2xhc3M6IGAkeyBzaG93IH0tZW50ZXItdG9gLFxuXG4gICAgICAgIGxlYXZlRnJvbUNsYXNzOiBgJHsgaGlkZSB9LWxlYXZlLWZyb21gLFxuICAgICAgICBsZWF2ZUFjdGl2ZUNsYXNzOiBgJHsgaGlkZSB9LWxlYXZlLWFjdGl2ZWAsXG4gICAgICAgIGxlYXZlVG9DbGFzczogYCR7IGhpZGUgfS1sZWF2ZS10b2BcbiAgICAgIH1cbiAgICB9KSxcblxuICAgIHRyYW5zaXRpb25TdHlsZTogY29tcHV0ZWQoKCkgPT4gYC0tcS10cmFuc2l0aW9uLWR1cmF0aW9uOiAkeyBwcm9wcy50cmFuc2l0aW9uRHVyYXRpb24gfW1zYClcbiAgfVxufVxuIiwiaW1wb3J0IHsgbmV4dFRpY2ssIG9uRGVhY3RpdmF0ZWQsIG9uQmVmb3JlVW5tb3VudCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyB2bUlzRGVzdHJveWVkIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS52bS92bS5qcydcblxuLypcbiAqIFVzYWdlOlxuICogICAgcmVnaXN0ZXJUaWNrKGZuKVxuICogICAgcmVtb3ZlVGljaygpXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICBsZXQgdGlja0ZuXG4gIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICBmdW5jdGlvbiByZW1vdmVUaWNrICgpIHtcbiAgICB0aWNrRm4gPSB2b2lkIDBcbiAgfVxuXG4gIG9uRGVhY3RpdmF0ZWQocmVtb3ZlVGljaylcbiAgb25CZWZvcmVVbm1vdW50KHJlbW92ZVRpY2spXG5cbiAgcmV0dXJuIHtcbiAgICByZW1vdmVUaWNrLFxuXG4gICAgcmVnaXN0ZXJUaWNrIChmbikge1xuICAgICAgdGlja0ZuID0gZm5cblxuICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICBpZiAodGlja0ZuID09PSBmbikge1xuICAgICAgICAgIC8vIHdlIGFsc28gY2hlY2sgaWYgVk0gaXMgZGVzdHJveWVkLCBzaW5jZSBpZiBpdFxuICAgICAgICAgIC8vIGdvdCB0byB0cmlnZ2VyIG9uZSBuZXh0VGljaygpIHdlIGNhbm5vdCBzdG9wIGl0XG4gICAgICAgICAgdm1Jc0Rlc3Ryb3llZCh2bSkgPT09IGZhbHNlICYmIHRpY2tGbigpXG4gICAgICAgICAgdGlja0ZuID0gdm9pZCAwXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBjbGllbnQgfSBmcm9tICcuLi8uLi9wbHVnaW5zL3BsYXRmb3JtL1BsYXRmb3JtLmpzJ1xuaW1wb3J0IHsgaXNLZXlDb2RlIH0gZnJvbSAnLi4vcHJpdmF0ZS5rZXlib2FyZC9rZXktY29tcG9zaXRpb24uanMnXG5cbmNvbnN0IGhhbmRsZXJzID0gW11cbmxldCBlc2NEb3duXG5cbmZ1bmN0aW9uIG9uS2V5ZG93biAoZXZ0KSB7XG4gIGVzY0Rvd24gPSBldnQua2V5Q29kZSA9PT0gMjdcbn1cblxuZnVuY3Rpb24gb25CbHVyICgpIHtcbiAgaWYgKGVzY0Rvd24gPT09IHRydWUpIHtcbiAgICBlc2NEb3duID0gZmFsc2VcbiAgfVxufVxuXG5mdW5jdGlvbiBvbktleXVwIChldnQpIHtcbiAgaWYgKGVzY0Rvd24gPT09IHRydWUpIHtcbiAgICBlc2NEb3duID0gZmFsc2VcblxuICAgIGlmIChpc0tleUNvZGUoZXZ0LCAyNykgPT09IHRydWUpIHtcbiAgICAgIGhhbmRsZXJzWyBoYW5kbGVycy5sZW5ndGggLSAxIF0oZXZ0KVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGUgKGFjdGlvbikge1xuICB3aW5kb3dbIGFjdGlvbiBdKCdrZXlkb3duJywgb25LZXlkb3duKVxuICB3aW5kb3dbIGFjdGlvbiBdKCdibHVyJywgb25CbHVyKVxuICB3aW5kb3dbIGFjdGlvbiBdKCdrZXl1cCcsIG9uS2V5dXApXG4gIGVzY0Rvd24gPSBmYWxzZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkRXNjYXBlS2V5IChmbikge1xuICBpZiAoY2xpZW50LmlzLmRlc2t0b3AgPT09IHRydWUpIHtcbiAgICBoYW5kbGVycy5wdXNoKGZuKVxuXG4gICAgaWYgKGhhbmRsZXJzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgdXBkYXRlKCdhZGRFdmVudExpc3RlbmVyJylcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUVzY2FwZUtleSAoZm4pIHtcbiAgY29uc3QgaW5kZXggPSBoYW5kbGVycy5pbmRleE9mKGZuKVxuICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgaGFuZGxlcnMuc3BsaWNlKGluZGV4LCAxKVxuXG4gICAgaWYgKGhhbmRsZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdXBkYXRlKCdyZW1vdmVFdmVudExpc3RlbmVyJylcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IGNsaWVudCB9IGZyb20gJy4uLy4uL3BsdWdpbnMvcGxhdGZvcm0vUGxhdGZvcm0uanMnXG5cbmNvbnN0IGhhbmRsZXJzID0gW11cblxuZnVuY3Rpb24gdHJpZ2dlciAoZSkge1xuICBoYW5kbGVyc1sgaGFuZGxlcnMubGVuZ3RoIC0gMSBdKGUpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRGb2N1c291dCAoZm4pIHtcbiAgaWYgKGNsaWVudC5pcy5kZXNrdG9wID09PSB0cnVlKSB7XG4gICAgaGFuZGxlcnMucHVzaChmbilcblxuICAgIGlmIChoYW5kbGVycy5sZW5ndGggPT09IDEpIHtcbiAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNpbicsIHRyaWdnZXIpXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVGb2N1c291dCAoZm4pIHtcbiAgY29uc3QgaW5kZXggPSBoYW5kbGVycy5pbmRleE9mKGZuKVxuICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgaGFuZGxlcnMuc3BsaWNlKGluZGV4LCAxKVxuXG4gICAgaWYgKGhhbmRsZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1c2luJywgdHJpZ2dlcilcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IGxpc3Rlbk9wdHMgfSBmcm9tICcuLi9ldmVudC9ldmVudC5qcydcbmltcG9ydCB7IHBvcnRhbFByb3h5TGlzdCB9IGZyb20gJy4uL3ByaXZhdGUucG9ydGFsL3BvcnRhbC5qcydcblxubGV0IHRpbWVyID0gbnVsbFxuXG5jb25zdFxuICB7IG5vdFBhc3NpdmVDYXB0dXJlIH0gPSBsaXN0ZW5PcHRzLFxuICByZWdpc3RlcmVkTGlzdCA9IFtdXG5cbmZ1bmN0aW9uIGdsb2JhbEhhbmRsZXIgKGV2dCkge1xuICBpZiAodGltZXIgIT09IG51bGwpIHtcbiAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgdGltZXIgPSBudWxsXG4gIH1cblxuICBjb25zdCB0YXJnZXQgPSBldnQudGFyZ2V0XG5cbiAgaWYgKFxuICAgIHRhcmdldCA9PT0gdm9pZCAwXG4gICAgfHwgdGFyZ2V0Lm5vZGVUeXBlID09PSA4XG4gICAgfHwgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbm8tcG9pbnRlci1ldmVudHMnKSA9PT0gdHJ1ZVxuICApIHJldHVyblxuXG4gIC8vIGNoZWNrIGxhc3QgcG9ydGFsIHZtIGlmIGl0J3NcbiAgLy8gYSBRRGlhbG9nIGFuZCBub3QgaW4gc2VhbWxlc3MgbW9kZVxuICBsZXQgcG9ydGFsSW5kZXggPSBwb3J0YWxQcm94eUxpc3QubGVuZ3RoIC0gMVxuXG4gIHdoaWxlIChwb3J0YWxJbmRleCA+PSAwKSB7XG4gICAgY29uc3QgcHJveHkgPSBwb3J0YWxQcm94eUxpc3RbIHBvcnRhbEluZGV4IF0uJFxuXG4gICAgLy8gc2tpcCBRVG9vbHRpcCBwb3J0YWxzXG4gICAgaWYgKHByb3h5LnR5cGUubmFtZSA9PT0gJ1FUb29sdGlwJykge1xuICAgICAgcG9ydGFsSW5kZXgtLVxuICAgICAgY29udGludWVcbiAgICB9XG5cbiAgICBpZiAocHJveHkudHlwZS5uYW1lICE9PSAnUURpYWxvZycpIHtcbiAgICAgIGJyZWFrXG4gICAgfVxuXG4gICAgaWYgKHByb3h5LnByb3BzLnNlYW1sZXNzICE9PSB0cnVlKSByZXR1cm5cblxuICAgIHBvcnRhbEluZGV4LS1cbiAgfVxuXG4gIGZvciAobGV0IGkgPSByZWdpc3RlcmVkTGlzdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGNvbnN0IHN0YXRlID0gcmVnaXN0ZXJlZExpc3RbIGkgXVxuXG4gICAgaWYgKFxuICAgICAgKFxuICAgICAgICBzdGF0ZS5hbmNob3JFbC52YWx1ZSA9PT0gbnVsbFxuICAgICAgICB8fCBzdGF0ZS5hbmNob3JFbC52YWx1ZS5jb250YWlucyh0YXJnZXQpID09PSBmYWxzZVxuICAgICAgKVxuICAgICAgJiYgKFxuICAgICAgICB0YXJnZXQgPT09IGRvY3VtZW50LmJvZHlcbiAgICAgICAgfHwgKFxuICAgICAgICAgIHN0YXRlLmlubmVyUmVmLnZhbHVlICE9PSBudWxsXG4gICAgICAgICAgJiYgc3RhdGUuaW5uZXJSZWYudmFsdWUuY29udGFpbnModGFyZ2V0KSA9PT0gZmFsc2VcbiAgICAgICAgKVxuICAgICAgKVxuICAgICkge1xuICAgICAgLy8gbWFyayB0aGUgZXZlbnQgYXMgYmVpbmcgcHJvY2Vzc2VkIGJ5IGNsaWNrT3V0c2lkZVxuICAgICAgLy8gdXNlZCB0byBwcmV2ZW50IHJlZm9jdXMgYWZ0ZXIgbWVudSBjbG9zZVxuICAgICAgZXZ0LnFDbGlja091dHNpZGUgPSB0cnVlXG4gICAgICBzdGF0ZS5vbkNsaWNrT3V0c2lkZShldnQpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRDbGlja091dHNpZGUgKGNsaWNrT3V0c2lkZVByb3BzKSB7XG4gIHJlZ2lzdGVyZWRMaXN0LnB1c2goY2xpY2tPdXRzaWRlUHJvcHMpXG5cbiAgaWYgKHJlZ2lzdGVyZWRMaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGdsb2JhbEhhbmRsZXIsIG5vdFBhc3NpdmVDYXB0dXJlKVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBnbG9iYWxIYW5kbGVyLCBub3RQYXNzaXZlQ2FwdHVyZSlcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlQ2xpY2tPdXRzaWRlIChjbGlja091dHNpZGVQcm9wcykge1xuICBjb25zdCBpbmRleCA9IHJlZ2lzdGVyZWRMaXN0LmZpbmRJbmRleChoID0+IGggPT09IGNsaWNrT3V0c2lkZVByb3BzKVxuXG4gIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICByZWdpc3RlcmVkTGlzdC5zcGxpY2UoaW5kZXgsIDEpXG5cbiAgICBpZiAocmVnaXN0ZXJlZExpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICBpZiAodGltZXIgIT09IG51bGwpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgICAgICB0aW1lciA9IG51bGxcbiAgICAgIH1cblxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZ2xvYmFsSGFuZGxlciwgbm90UGFzc2l2ZUNhcHR1cmUpXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgZ2xvYmFsSGFuZGxlciwgbm90UGFzc2l2ZUNhcHR1cmUpXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBnZXRTY3JvbGxiYXJXaWR0aCB9IGZyb20gJy4uL3Njcm9sbC9zY3JvbGwuanMnXG5pbXBvcnQgeyBjbGllbnQgfSBmcm9tICcuLi8uLi9wbHVnaW5zL3BsYXRmb3JtL1BsYXRmb3JtLmpzJ1xuXG5sZXQgdnBMZWZ0LCB2cFRvcFxuXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVQb3NpdGlvbiAocG9zKSB7XG4gIGNvbnN0IHBhcnRzID0gcG9zLnNwbGl0KCcgJylcbiAgaWYgKHBhcnRzLmxlbmd0aCAhPT0gMikge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIGlmIChbICd0b3AnLCAnY2VudGVyJywgJ2JvdHRvbScgXS5pbmNsdWRlcyhwYXJ0c1sgMCBdKSAhPT0gdHJ1ZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0FuY2hvci9TZWxmIHBvc2l0aW9uIG11c3Qgc3RhcnQgd2l0aCBvbmUgb2YgdG9wL2NlbnRlci9ib3R0b20nKVxuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIGlmIChbICdsZWZ0JywgJ21pZGRsZScsICdyaWdodCcsICdzdGFydCcsICdlbmQnIF0uaW5jbHVkZXMocGFydHNbIDEgXSkgIT09IHRydWUpIHtcbiAgICBjb25zb2xlLmVycm9yKCdBbmNob3IvU2VsZiBwb3NpdGlvbiBtdXN0IGVuZCB3aXRoIG9uZSBvZiBsZWZ0L21pZGRsZS9yaWdodC9zdGFydC9lbmQnKVxuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIHJldHVybiB0cnVlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZU9mZnNldCAodmFsKSB7XG4gIGlmICghdmFsKSB7IHJldHVybiB0cnVlIH1cbiAgaWYgKHZhbC5sZW5ndGggIT09IDIpIHsgcmV0dXJuIGZhbHNlIH1cbiAgaWYgKHR5cGVvZiB2YWxbIDAgXSAhPT0gJ251bWJlcicgfHwgdHlwZW9mIHZhbFsgMSBdICE9PSAnbnVtYmVyJykge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIHJldHVybiB0cnVlXG59XG5cbmNvbnN0IGhvcml6b250YWxQb3MgPSB7XG4gICdzdGFydCNsdHInOiAnbGVmdCcsXG4gICdzdGFydCNydGwnOiAncmlnaHQnLFxuICAnZW5kI2x0cic6ICdyaWdodCcsXG4gICdlbmQjcnRsJzogJ2xlZnQnXG59XG5cbjtbICdsZWZ0JywgJ21pZGRsZScsICdyaWdodCcgXS5mb3JFYWNoKHBvcyA9PiB7XG4gIGhvcml6b250YWxQb3NbIGAkeyBwb3MgfSNsdHJgIF0gPSBwb3NcbiAgaG9yaXpvbnRhbFBvc1sgYCR7IHBvcyB9I3J0bGAgXSA9IHBvc1xufSlcblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlUG9zaXRpb24gKHBvcywgcnRsKSB7XG4gIGNvbnN0IHBhcnRzID0gcG9zLnNwbGl0KCcgJylcbiAgcmV0dXJuIHtcbiAgICB2ZXJ0aWNhbDogcGFydHNbIDAgXSxcbiAgICBob3Jpem9udGFsOiBob3Jpem9udGFsUG9zWyBgJHsgcGFydHNbIDEgXSB9IyR7IHJ0bCA9PT0gdHJ1ZSA/ICdydGwnIDogJ2x0cicgfWAgXVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBbmNob3JQcm9wcyAoZWwsIG9mZnNldCkge1xuICBsZXQgeyB0b3AsIGxlZnQsIHJpZ2h0LCBib3R0b20sIHdpZHRoLCBoZWlnaHQgfSA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cbiAgaWYgKG9mZnNldCAhPT0gdm9pZCAwKSB7XG4gICAgdG9wIC09IG9mZnNldFsgMSBdXG4gICAgbGVmdCAtPSBvZmZzZXRbIDAgXVxuICAgIGJvdHRvbSArPSBvZmZzZXRbIDEgXVxuICAgIHJpZ2h0ICs9IG9mZnNldFsgMCBdXG5cbiAgICB3aWR0aCArPSBvZmZzZXRbIDAgXVxuICAgIGhlaWdodCArPSBvZmZzZXRbIDEgXVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB0b3AsIGJvdHRvbSwgaGVpZ2h0LFxuICAgIGxlZnQsIHJpZ2h0LCB3aWR0aCxcbiAgICBtaWRkbGU6IGxlZnQgKyAocmlnaHQgLSBsZWZ0KSAvIDIsXG4gICAgY2VudGVyOiB0b3AgKyAoYm90dG9tIC0gdG9wKSAvIDJcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRBYnNvbHV0ZUFuY2hvclByb3BzIChlbCwgYWJzb2x1dGVPZmZzZXQsIG9mZnNldCkge1xuICBsZXQgeyB0b3AsIGxlZnQgfSA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cbiAgdG9wICs9IGFic29sdXRlT2Zmc2V0LnRvcFxuICBsZWZ0ICs9IGFic29sdXRlT2Zmc2V0LmxlZnRcblxuICBpZiAob2Zmc2V0ICE9PSB2b2lkIDApIHtcbiAgICB0b3AgKz0gb2Zmc2V0WyAxIF1cbiAgICBsZWZ0ICs9IG9mZnNldFsgMCBdXG4gIH1cblxuICByZXR1cm4ge1xuICAgIHRvcCwgYm90dG9tOiB0b3AgKyAxLCBoZWlnaHQ6IDEsXG4gICAgbGVmdCwgcmlnaHQ6IGxlZnQgKyAxLCB3aWR0aDogMSxcbiAgICBtaWRkbGU6IGxlZnQsXG4gICAgY2VudGVyOiB0b3BcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRUYXJnZXRQcm9wcyAod2lkdGgsIGhlaWdodCkge1xuICByZXR1cm4ge1xuICAgIHRvcDogMCxcbiAgICBjZW50ZXI6IGhlaWdodCAvIDIsXG4gICAgYm90dG9tOiBoZWlnaHQsXG4gICAgbGVmdDogMCxcbiAgICBtaWRkbGU6IHdpZHRoIC8gMixcbiAgICByaWdodDogd2lkdGhcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRUb3BMZWZ0UHJvcHMgKGFuY2hvclByb3BzLCB0YXJnZXRQcm9wcywgYW5jaG9yT3JpZ2luLCBzZWxmT3JpZ2luKSB7XG4gIHJldHVybiB7XG4gICAgdG9wOiBhbmNob3JQcm9wc1sgYW5jaG9yT3JpZ2luLnZlcnRpY2FsIF0gLSB0YXJnZXRQcm9wc1sgc2VsZk9yaWdpbi52ZXJ0aWNhbCBdLFxuICAgIGxlZnQ6IGFuY2hvclByb3BzWyBhbmNob3JPcmlnaW4uaG9yaXpvbnRhbCBdIC0gdGFyZ2V0UHJvcHNbIHNlbGZPcmlnaW4uaG9yaXpvbnRhbCBdXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFBvc2l0aW9uIChjZmcsIHJldHJ5TnVtYmVyID0gMCkge1xuICBpZiAoXG4gICAgY2ZnLnRhcmdldEVsID09PSBudWxsXG4gICAgfHwgY2ZnLmFuY2hvckVsID09PSBudWxsXG4gICAgfHwgcmV0cnlOdW1iZXIgPiA1IC8vIHdlIHNob3VsZCB0cnkgb25seSBhIGZldyB0aW1lc1xuICApIHJldHVyblxuXG4gIC8vIHNvbWUgYnJvd3NlcnMgcmVwb3J0IHplcm8gaGVpZ2h0IG9yIHdpZHRoIGJlY2F1c2VcbiAgLy8gd2UgYXJlIHRyeWluZyB0b28gZWFybHkgdG8gZ2V0IHRoZXNlIGRpbWVuc2lvbnNcbiAgaWYgKGNmZy50YXJnZXRFbC5vZmZzZXRIZWlnaHQgPT09IDAgfHwgY2ZnLnRhcmdldEVsLm9mZnNldFdpZHRoID09PSAwKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBzZXRQb3NpdGlvbihjZmcsIHJldHJ5TnVtYmVyICsgMSlcbiAgICB9LCAxMClcbiAgICByZXR1cm5cbiAgfVxuXG4gIGNvbnN0IHtcbiAgICB0YXJnZXRFbCxcbiAgICBvZmZzZXQsXG4gICAgYW5jaG9yRWwsXG4gICAgYW5jaG9yT3JpZ2luLFxuICAgIHNlbGZPcmlnaW4sXG4gICAgYWJzb2x1dGVPZmZzZXQsXG4gICAgZml0LFxuICAgIGNvdmVyLFxuICAgIG1heEhlaWdodCxcbiAgICBtYXhXaWR0aFxuICB9ID0gY2ZnXG5cbiAgaWYgKGNsaWVudC5pcy5pb3MgPT09IHRydWUgJiYgd2luZG93LnZpc3VhbFZpZXdwb3J0ICE9PSB2b2lkIDApIHtcbiAgICAvLyB1c2VzIHRoZSBxLXBvc2l0aW9uLWVuZ2luZSBDU1MgY2xhc3NcblxuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuYm9keS5zdHlsZVxuICAgIGNvbnN0IHsgb2Zmc2V0TGVmdDogbGVmdCwgb2Zmc2V0VG9wOiB0b3AgfSA9IHdpbmRvdy52aXN1YWxWaWV3cG9ydFxuXG4gICAgaWYgKGxlZnQgIT09IHZwTGVmdCkge1xuICAgICAgZWwuc2V0UHJvcGVydHkoJy0tcS1wZS1sZWZ0JywgbGVmdCArICdweCcpXG4gICAgICB2cExlZnQgPSBsZWZ0XG4gICAgfVxuICAgIGlmICh0b3AgIT09IHZwVG9wKSB7XG4gICAgICBlbC5zZXRQcm9wZXJ0eSgnLS1xLXBlLXRvcCcsIHRvcCArICdweCcpXG4gICAgICB2cFRvcCA9IHRvcFxuICAgIH1cbiAgfVxuXG4gIC8vIHNjcm9sbCBwb3NpdGlvbiBtaWdodCBjaGFuZ2VcbiAgLy8gaWYgbWF4LWhlaWdodC8td2lkdGggY2hhbmdlcywgc28gd2VcbiAgLy8gbmVlZCB0byByZXN0b3JlIGl0IGFmdGVyIHdlIGNhbGN1bGF0ZVxuICAvLyB0aGUgbmV3IHBvc2l0aW9uaW5nXG4gIGNvbnN0IHsgc2Nyb2xsTGVmdCwgc2Nyb2xsVG9wIH0gPSB0YXJnZXRFbFxuXG4gIGNvbnN0IGFuY2hvclByb3BzID0gYWJzb2x1dGVPZmZzZXQgPT09IHZvaWQgMFxuICAgID8gZ2V0QW5jaG9yUHJvcHMoYW5jaG9yRWwsIGNvdmVyID09PSB0cnVlID8gWyAwLCAwIF0gOiBvZmZzZXQpXG4gICAgOiBnZXRBYnNvbHV0ZUFuY2hvclByb3BzKGFuY2hvckVsLCBhYnNvbHV0ZU9mZnNldCwgb2Zmc2V0KVxuXG4gIC8qKlxuICAgKiBXZSBcInJlc2V0XCIgdGhlIGNyaXRpY2FsIENTUyBwcm9wZXJ0aWVzXG4gICAqIHNvIHdlIGNhbiB0YWtlIGFuIGFjY3VyYXRlIG1lYXN1cmVtZW50LlxuICAgKlxuICAgKiBFbnN1cmUgdGhhdCB0YXJnZXRFbCBoYXMgYSBtYXgtd2lkdGggJiBtYXgtaGVpZ2h0XG4gICAqIHNldCBpbiBDU1MgYW5kIHRoYXQgdGhlIHZhbHVlIGRvZXMgTk9UIGV4Y2VlZHMgMTAwdncvdmguXG4gICAqIEFsbCB1c2VycyBvZiB0aGUgcG9zaXRpb24tZW5naW5lIChjdXJyZW50bHkgUU1lbnUgJiBRVG9vbHRpcClcbiAgICogaGF2ZSBDU1MgZm9yIHRoaXMuXG4gICAqL1xuICBPYmplY3QuYXNzaWduKHRhcmdldEVsLnN0eWxlLCB7XG4gICAgdG9wOiAwLFxuICAgIGxlZnQ6IDAsXG4gICAgbWluV2lkdGg6IG51bGwsXG4gICAgbWluSGVpZ2h0OiBudWxsLFxuICAgIG1heFdpZHRoLFxuICAgIG1heEhlaWdodCxcbiAgICB2aXNpYmlsaXR5OiAndmlzaWJsZSdcbiAgfSlcblxuICBjb25zdCB7IG9mZnNldFdpZHRoOiBvcmlnRWxXaWR0aCwgb2Zmc2V0SGVpZ2h0OiBvcmlnRWxIZWlnaHQgfSA9IHRhcmdldEVsXG4gIGNvbnN0IHsgZWxXaWR0aCwgZWxIZWlnaHQgfSA9IGZpdCA9PT0gdHJ1ZSB8fCBjb3ZlciA9PT0gdHJ1ZVxuICAgID8geyBlbFdpZHRoOiBNYXRoLm1heChhbmNob3JQcm9wcy53aWR0aCwgb3JpZ0VsV2lkdGgpLCBlbEhlaWdodDogY292ZXIgPT09IHRydWUgPyBNYXRoLm1heChhbmNob3JQcm9wcy5oZWlnaHQsIG9yaWdFbEhlaWdodCkgOiBvcmlnRWxIZWlnaHQgfVxuICAgIDogeyBlbFdpZHRoOiBvcmlnRWxXaWR0aCwgZWxIZWlnaHQ6IG9yaWdFbEhlaWdodCB9XG5cbiAgbGV0IGVsU3R5bGUgPSB7IG1heFdpZHRoLCBtYXhIZWlnaHQgfVxuXG4gIGlmIChmaXQgPT09IHRydWUgfHwgY292ZXIgPT09IHRydWUpIHtcbiAgICBlbFN0eWxlLm1pbldpZHRoID0gYW5jaG9yUHJvcHMud2lkdGggKyAncHgnXG4gICAgaWYgKGNvdmVyID09PSB0cnVlKSB7XG4gICAgICBlbFN0eWxlLm1pbkhlaWdodCA9IGFuY2hvclByb3BzLmhlaWdodCArICdweCdcbiAgICB9XG4gIH1cblxuICBPYmplY3QuYXNzaWduKHRhcmdldEVsLnN0eWxlLCBlbFN0eWxlKVxuXG4gIGNvbnN0IHRhcmdldFByb3BzID0gZ2V0VGFyZ2V0UHJvcHMoZWxXaWR0aCwgZWxIZWlnaHQpXG4gIGxldCBwcm9wcyA9IGdldFRvcExlZnRQcm9wcyhhbmNob3JQcm9wcywgdGFyZ2V0UHJvcHMsIGFuY2hvck9yaWdpbiwgc2VsZk9yaWdpbilcblxuICBpZiAoYWJzb2x1dGVPZmZzZXQgPT09IHZvaWQgMCB8fCBvZmZzZXQgPT09IHZvaWQgMCkge1xuICAgIGFwcGx5Qm91bmRhcmllcyhwcm9wcywgYW5jaG9yUHJvcHMsIHRhcmdldFByb3BzLCBhbmNob3JPcmlnaW4sIHNlbGZPcmlnaW4pXG4gIH1cbiAgZWxzZSB7IC8vIHdlIGhhdmUgdG91Y2ggcG9zaXRpb24gb3IgY29udGV4dCBtZW51IHdpdGggb2Zmc2V0XG4gICAgY29uc3QgeyB0b3AsIGxlZnQgfSA9IHByb3BzIC8vIGNhY2hlIGluaXRpYWwgdmFsdWVzXG5cbiAgICAvLyBhcHBseSBpbml0aWFsIGJvdW5kYXJpZXNcbiAgICBhcHBseUJvdW5kYXJpZXMocHJvcHMsIGFuY2hvclByb3BzLCB0YXJnZXRQcm9wcywgYW5jaG9yT3JpZ2luLCBzZWxmT3JpZ2luKVxuXG4gICAgbGV0IGhhc0NoYW5nZWQgPSBmYWxzZVxuXG4gICAgLy8gZGlkIGl0IGZsaXAgdmVydGljYWxseT9cbiAgICBpZiAocHJvcHMudG9wICE9PSB0b3ApIHtcbiAgICAgIGhhc0NoYW5nZWQgPSB0cnVlXG4gICAgICBjb25zdCBvZmZzZXRZID0gMiAqIG9mZnNldFsgMSBdXG4gICAgICBhbmNob3JQcm9wcy5jZW50ZXIgPSBhbmNob3JQcm9wcy50b3AgLT0gb2Zmc2V0WVxuICAgICAgYW5jaG9yUHJvcHMuYm90dG9tIC09IG9mZnNldFkgKyAyXG4gICAgfVxuXG4gICAgLy8gZGlkIGl0IGZsaXAgaG9yaXpvbnRhbGx5P1xuICAgIGlmIChwcm9wcy5sZWZ0ICE9PSBsZWZ0KSB7XG4gICAgICBoYXNDaGFuZ2VkID0gdHJ1ZVxuICAgICAgY29uc3Qgb2Zmc2V0WCA9IDIgKiBvZmZzZXRbIDAgXVxuICAgICAgYW5jaG9yUHJvcHMubWlkZGxlID0gYW5jaG9yUHJvcHMubGVmdCAtPSBvZmZzZXRYXG4gICAgICBhbmNob3JQcm9wcy5yaWdodCAtPSBvZmZzZXRYICsgMlxuICAgIH1cblxuICAgIGlmIChoYXNDaGFuZ2VkID09PSB0cnVlKSB7XG4gICAgICAvLyByZS1jYWxjdWxhdGUgcHJvcHMgd2l0aCB0aGUgbmV3IGFuY2hvclxuICAgICAgcHJvcHMgPSBnZXRUb3BMZWZ0UHJvcHMoYW5jaG9yUHJvcHMsIHRhcmdldFByb3BzLCBhbmNob3JPcmlnaW4sIHNlbGZPcmlnaW4pXG5cbiAgICAgIC8vIGFuZCByZS1hcHBseSBib3VuZGFyaWVzXG4gICAgICBhcHBseUJvdW5kYXJpZXMocHJvcHMsIGFuY2hvclByb3BzLCB0YXJnZXRQcm9wcywgYW5jaG9yT3JpZ2luLCBzZWxmT3JpZ2luKVxuICAgIH1cbiAgfVxuXG4gIGVsU3R5bGUgPSB7XG4gICAgdG9wOiBwcm9wcy50b3AgKyAncHgnLFxuICAgIGxlZnQ6IHByb3BzLmxlZnQgKyAncHgnXG4gIH1cblxuICBpZiAocHJvcHMubWF4SGVpZ2h0ICE9PSB2b2lkIDApIHtcbiAgICBlbFN0eWxlLm1heEhlaWdodCA9IHByb3BzLm1heEhlaWdodCArICdweCdcblxuICAgIGlmIChhbmNob3JQcm9wcy5oZWlnaHQgPiBwcm9wcy5tYXhIZWlnaHQpIHtcbiAgICAgIGVsU3R5bGUubWluSGVpZ2h0ID0gZWxTdHlsZS5tYXhIZWlnaHRcbiAgICB9XG4gIH1cbiAgaWYgKHByb3BzLm1heFdpZHRoICE9PSB2b2lkIDApIHtcbiAgICBlbFN0eWxlLm1heFdpZHRoID0gcHJvcHMubWF4V2lkdGggKyAncHgnXG5cbiAgICBpZiAoYW5jaG9yUHJvcHMud2lkdGggPiBwcm9wcy5tYXhXaWR0aCkge1xuICAgICAgZWxTdHlsZS5taW5XaWR0aCA9IGVsU3R5bGUubWF4V2lkdGhcbiAgICB9XG4gIH1cblxuICBPYmplY3QuYXNzaWduKHRhcmdldEVsLnN0eWxlLCBlbFN0eWxlKVxuXG4gIC8vIHJlc3RvcmUgc2Nyb2xsIHBvc2l0aW9uXG4gIGlmICh0YXJnZXRFbC5zY3JvbGxUb3AgIT09IHNjcm9sbFRvcCkge1xuICAgIHRhcmdldEVsLnNjcm9sbFRvcCA9IHNjcm9sbFRvcFxuICB9XG4gIGlmICh0YXJnZXRFbC5zY3JvbGxMZWZ0ICE9PSBzY3JvbGxMZWZ0KSB7XG4gICAgdGFyZ2V0RWwuc2Nyb2xsTGVmdCA9IHNjcm9sbExlZnRcbiAgfVxufVxuXG5mdW5jdGlvbiBhcHBseUJvdW5kYXJpZXMgKHByb3BzLCBhbmNob3JQcm9wcywgdGFyZ2V0UHJvcHMsIGFuY2hvck9yaWdpbiwgc2VsZk9yaWdpbikge1xuICBjb25zdFxuICAgIGN1cnJlbnRIZWlnaHQgPSB0YXJnZXRQcm9wcy5ib3R0b20sXG4gICAgY3VycmVudFdpZHRoID0gdGFyZ2V0UHJvcHMucmlnaHQsXG4gICAgbWFyZ2luID0gZ2V0U2Nyb2xsYmFyV2lkdGgoKSxcbiAgICBpbm5lckhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCAtIG1hcmdpbixcbiAgICBpbm5lcldpZHRoID0gZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aFxuXG4gIGlmIChwcm9wcy50b3AgPCAwIHx8IHByb3BzLnRvcCArIGN1cnJlbnRIZWlnaHQgPiBpbm5lckhlaWdodCkge1xuICAgIGlmIChzZWxmT3JpZ2luLnZlcnRpY2FsID09PSAnY2VudGVyJykge1xuICAgICAgcHJvcHMudG9wID0gYW5jaG9yUHJvcHNbIGFuY2hvck9yaWdpbi52ZXJ0aWNhbCBdID4gaW5uZXJIZWlnaHQgLyAyXG4gICAgICAgID8gTWF0aC5tYXgoMCwgaW5uZXJIZWlnaHQgLSBjdXJyZW50SGVpZ2h0KVxuICAgICAgICA6IDBcbiAgICAgIHByb3BzLm1heEhlaWdodCA9IE1hdGgubWluKGN1cnJlbnRIZWlnaHQsIGlubmVySGVpZ2h0KVxuICAgIH1cbiAgICBlbHNlIGlmIChhbmNob3JQcm9wc1sgYW5jaG9yT3JpZ2luLnZlcnRpY2FsIF0gPiBpbm5lckhlaWdodCAvIDIpIHtcbiAgICAgIGNvbnN0IGFuY2hvclkgPSBNYXRoLm1pbihcbiAgICAgICAgaW5uZXJIZWlnaHQsXG4gICAgICAgIGFuY2hvck9yaWdpbi52ZXJ0aWNhbCA9PT0gJ2NlbnRlcidcbiAgICAgICAgICA/IGFuY2hvclByb3BzLmNlbnRlclxuICAgICAgICAgIDogKGFuY2hvck9yaWdpbi52ZXJ0aWNhbCA9PT0gc2VsZk9yaWdpbi52ZXJ0aWNhbCA/IGFuY2hvclByb3BzLmJvdHRvbSA6IGFuY2hvclByb3BzLnRvcClcbiAgICAgIClcbiAgICAgIHByb3BzLm1heEhlaWdodCA9IE1hdGgubWluKGN1cnJlbnRIZWlnaHQsIGFuY2hvclkpXG4gICAgICBwcm9wcy50b3AgPSBNYXRoLm1heCgwLCBhbmNob3JZIC0gY3VycmVudEhlaWdodClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBwcm9wcy50b3AgPSBNYXRoLm1heCgwLCBhbmNob3JPcmlnaW4udmVydGljYWwgPT09ICdjZW50ZXInXG4gICAgICAgID8gYW5jaG9yUHJvcHMuY2VudGVyXG4gICAgICAgIDogKGFuY2hvck9yaWdpbi52ZXJ0aWNhbCA9PT0gc2VsZk9yaWdpbi52ZXJ0aWNhbCA/IGFuY2hvclByb3BzLnRvcCA6IGFuY2hvclByb3BzLmJvdHRvbSlcbiAgICAgIClcbiAgICAgIHByb3BzLm1heEhlaWdodCA9IE1hdGgubWluKGN1cnJlbnRIZWlnaHQsIGlubmVySGVpZ2h0IC0gcHJvcHMudG9wKVxuICAgIH1cbiAgfVxuXG4gIGlmIChwcm9wcy5sZWZ0IDwgMCB8fCBwcm9wcy5sZWZ0ICsgY3VycmVudFdpZHRoID4gaW5uZXJXaWR0aCkge1xuICAgIHByb3BzLm1heFdpZHRoID0gTWF0aC5taW4oY3VycmVudFdpZHRoLCBpbm5lcldpZHRoKVxuICAgIGlmIChzZWxmT3JpZ2luLmhvcml6b250YWwgPT09ICdtaWRkbGUnKSB7XG4gICAgICBwcm9wcy5sZWZ0ID0gYW5jaG9yUHJvcHNbIGFuY2hvck9yaWdpbi5ob3Jpem9udGFsIF0gPiBpbm5lcldpZHRoIC8gMlxuICAgICAgICA/IE1hdGgubWF4KDAsIGlubmVyV2lkdGggLSBjdXJyZW50V2lkdGgpXG4gICAgICAgIDogMFxuICAgIH1cbiAgICBlbHNlIGlmIChhbmNob3JQcm9wc1sgYW5jaG9yT3JpZ2luLmhvcml6b250YWwgXSA+IGlubmVyV2lkdGggLyAyKSB7XG4gICAgICBjb25zdCBhbmNob3JYID0gTWF0aC5taW4oXG4gICAgICAgIGlubmVyV2lkdGgsXG4gICAgICAgIGFuY2hvck9yaWdpbi5ob3Jpem9udGFsID09PSAnbWlkZGxlJ1xuICAgICAgICAgID8gYW5jaG9yUHJvcHMubWlkZGxlXG4gICAgICAgICAgOiAoYW5jaG9yT3JpZ2luLmhvcml6b250YWwgPT09IHNlbGZPcmlnaW4uaG9yaXpvbnRhbCA/IGFuY2hvclByb3BzLnJpZ2h0IDogYW5jaG9yUHJvcHMubGVmdClcbiAgICAgIClcbiAgICAgIHByb3BzLm1heFdpZHRoID0gTWF0aC5taW4oY3VycmVudFdpZHRoLCBhbmNob3JYKVxuICAgICAgcHJvcHMubGVmdCA9IE1hdGgubWF4KDAsIGFuY2hvclggLSBwcm9wcy5tYXhXaWR0aClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBwcm9wcy5sZWZ0ID0gTWF0aC5tYXgoMCwgYW5jaG9yT3JpZ2luLmhvcml6b250YWwgPT09ICdtaWRkbGUnXG4gICAgICAgID8gYW5jaG9yUHJvcHMubWlkZGxlXG4gICAgICAgIDogKGFuY2hvck9yaWdpbi5ob3Jpem9udGFsID09PSBzZWxmT3JpZ2luLmhvcml6b250YWwgPyBhbmNob3JQcm9wcy5sZWZ0IDogYW5jaG9yUHJvcHMucmlnaHQpXG4gICAgICApXG4gICAgICBwcm9wcy5tYXhXaWR0aCA9IE1hdGgubWluKGN1cnJlbnRXaWR0aCwgaW5uZXJXaWR0aCAtIHByb3BzLmxlZnQpXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCB3YXRjaCwgVHJhbnNpdGlvbiwgb25CZWZvcmVVbm1vdW50LCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VBbmNob3IsIHsgdXNlQW5jaG9yUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1hbmNob3IvdXNlLWFuY2hvci5qcydcbmltcG9ydCB1c2VTY3JvbGxUYXJnZXQgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2Utc2Nyb2xsLXRhcmdldC91c2Utc2Nyb2xsLXRhcmdldC5qcydcbmltcG9ydCB1c2VNb2RlbFRvZ2dsZSwgeyB1c2VNb2RlbFRvZ2dsZVByb3BzLCB1c2VNb2RlbFRvZ2dsZUVtaXRzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtbW9kZWwtdG9nZ2xlL3VzZS1tb2RlbC10b2dnbGUuanMnXG5pbXBvcnQgdXNlRGFyaywgeyB1c2VEYXJrUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1kYXJrL3VzZS1kYXJrLmpzJ1xuaW1wb3J0IHVzZVBvcnRhbCBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1wb3J0YWwvdXNlLXBvcnRhbC5qcydcbmltcG9ydCB1c2VUcmFuc2l0aW9uLCB7IHVzZVRyYW5zaXRpb25Qcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLXRyYW5zaXRpb24vdXNlLXRyYW5zaXRpb24uanMnXG5pbXBvcnQgdXNlVGljayBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy91c2UtdGljay91c2UtdGljay5qcydcbmltcG9ydCB1c2VUaW1lb3V0IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3VzZS10aW1lb3V0L3VzZS10aW1lb3V0LmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBjbG9zZVBvcnRhbE1lbnVzIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5wb3J0YWwvcG9ydGFsLmpzJ1xuaW1wb3J0IHsgZ2V0U2Nyb2xsVGFyZ2V0LCBzY3JvbGxUYXJnZXRQcm9wIH0gZnJvbSAnLi4vLi4vdXRpbHMvc2Nyb2xsL3Njcm9sbC5qcydcbmltcG9ydCB7IHBvc2l0aW9uLCBzdG9wQW5kUHJldmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50L2V2ZW50LmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5pbXBvcnQgeyBhZGRFc2NhcGVLZXksIHJlbW92ZUVzY2FwZUtleSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUua2V5Ym9hcmQvZXNjYXBlLWtleS5qcydcbmltcG9ydCB7IGFkZEZvY3Vzb3V0LCByZW1vdmVGb2N1c291dCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuZm9jdXMvZm9jdXNvdXQuanMnXG5pbXBvcnQgeyBjaGlsZEhhc0ZvY3VzIH0gZnJvbSAnLi4vLi4vdXRpbHMvZG9tL2RvbS5qcydcbmltcG9ydCB7IGFkZENsaWNrT3V0c2lkZSwgcmVtb3ZlQ2xpY2tPdXRzaWRlIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jbGljay1vdXRzaWRlL2NsaWNrLW91dHNpZGUuanMnXG5pbXBvcnQgeyBhZGRGb2N1c0ZuIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5mb2N1cy9mb2N1cy1tYW5hZ2VyLmpzJ1xuXG5pbXBvcnQge1xuICB2YWxpZGF0ZVBvc2l0aW9uLCB2YWxpZGF0ZU9mZnNldCwgc2V0UG9zaXRpb24sIHBhcnNlUG9zaXRpb25cbn0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5wb3NpdGlvbi1lbmdpbmUvcG9zaXRpb24tZW5naW5lLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUU1lbnUnLFxuXG4gIGluaGVyaXRBdHRyczogZmFsc2UsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VBbmNob3JQcm9wcyxcbiAgICAuLi51c2VNb2RlbFRvZ2dsZVByb3BzLFxuICAgIC4uLnVzZURhcmtQcm9wcyxcbiAgICAuLi51c2VUcmFuc2l0aW9uUHJvcHMsXG5cbiAgICBwZXJzaXN0ZW50OiBCb29sZWFuLFxuICAgIGF1dG9DbG9zZTogQm9vbGVhbixcbiAgICBzZXBhcmF0ZUNsb3NlUG9wdXA6IEJvb2xlYW4sXG4gICAgbm9Fc2NEaXNtaXNzOiBCb29sZWFuLFxuICAgIG5vUm91dGVEaXNtaXNzOiBCb29sZWFuLFxuICAgIG5vUmVmb2N1czogQm9vbGVhbixcbiAgICBub0ZvY3VzOiBCb29sZWFuLFxuXG4gICAgZml0OiBCb29sZWFuLFxuICAgIGNvdmVyOiBCb29sZWFuLFxuXG4gICAgc3F1YXJlOiBCb29sZWFuLFxuXG4gICAgYW5jaG9yOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWxpZGF0b3I6IHZhbGlkYXRlUG9zaXRpb25cbiAgICB9LFxuICAgIHNlbGY6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbGlkYXRvcjogdmFsaWRhdGVQb3NpdGlvblxuICAgIH0sXG4gICAgb2Zmc2V0OiB7XG4gICAgICB0eXBlOiBBcnJheSxcbiAgICAgIHZhbGlkYXRvcjogdmFsaWRhdGVPZmZzZXRcbiAgICB9LFxuXG4gICAgc2Nyb2xsVGFyZ2V0OiBzY3JvbGxUYXJnZXRQcm9wLFxuXG4gICAgdG91Y2hQb3NpdGlvbjogQm9vbGVhbixcblxuICAgIG1heEhlaWdodDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH0sXG4gICAgbWF4V2lkdGg6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9XG4gIH0sXG5cbiAgZW1pdHM6IFtcbiAgICAuLi51c2VNb2RlbFRvZ2dsZUVtaXRzLFxuICAgICdjbGljaycsICdlc2NhcGVLZXknXG4gIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0LCBhdHRycyB9KSB7XG4gICAgbGV0IHJlZm9jdXNUYXJnZXQgPSBudWxsLCBhYnNvbHV0ZU9mZnNldCwgdW53YXRjaFBvc2l0aW9uLCBhdm9pZEF1dG9DbG9zZVxuXG4gICAgY29uc3Qgdm0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICAgIGNvbnN0IHsgcHJveHkgfSA9IHZtXG4gICAgY29uc3QgeyAkcSB9ID0gcHJveHlcblxuICAgIGNvbnN0IGlubmVyUmVmID0gcmVmKG51bGwpXG4gICAgY29uc3Qgc2hvd2luZyA9IHJlZihmYWxzZSlcblxuICAgIGNvbnN0IGhpZGVPblJvdXRlQ2hhbmdlID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLnBlcnNpc3RlbnQgIT09IHRydWVcbiAgICAgICYmIHByb3BzLm5vUm91dGVEaXNtaXNzICE9PSB0cnVlXG4gICAgKVxuXG4gICAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgJHEpXG4gICAgY29uc3QgeyByZWdpc3RlclRpY2ssIHJlbW92ZVRpY2sgfSA9IHVzZVRpY2soKVxuICAgIGNvbnN0IHsgcmVnaXN0ZXJUaW1lb3V0IH0gPSB1c2VUaW1lb3V0KClcbiAgICBjb25zdCB7IHRyYW5zaXRpb25Qcm9wcywgdHJhbnNpdGlvblN0eWxlIH0gPSB1c2VUcmFuc2l0aW9uKHByb3BzKVxuICAgIGNvbnN0IHsgbG9jYWxTY3JvbGxUYXJnZXQsIGNoYW5nZVNjcm9sbEV2ZW50LCB1bmNvbmZpZ3VyZVNjcm9sbFRhcmdldCB9ID0gdXNlU2Nyb2xsVGFyZ2V0KHByb3BzLCBjb25maWd1cmVTY3JvbGxUYXJnZXQpXG5cbiAgICBjb25zdCB7IGFuY2hvckVsLCBjYW5TaG93IH0gPSB1c2VBbmNob3IoeyBzaG93aW5nIH0pXG5cbiAgICBjb25zdCB7IGhpZGUgfSA9IHVzZU1vZGVsVG9nZ2xlKHtcbiAgICAgIHNob3dpbmcsIGNhblNob3csIGhhbmRsZVNob3csIGhhbmRsZUhpZGUsXG4gICAgICBoaWRlT25Sb3V0ZUNoYW5nZSxcbiAgICAgIHByb2Nlc3NPbk1vdW50OiB0cnVlXG4gICAgfSlcblxuICAgIGNvbnN0IHsgc2hvd1BvcnRhbCwgaGlkZVBvcnRhbCwgcmVuZGVyUG9ydGFsIH0gPSB1c2VQb3J0YWwodm0sIGlubmVyUmVmLCByZW5kZXJQb3J0YWxDb250ZW50LCAnbWVudScpXG5cbiAgICBjb25zdCBjbGlja091dHNpZGVQcm9wcyA9IHtcbiAgICAgIGFuY2hvckVsLFxuICAgICAgaW5uZXJSZWYsXG4gICAgICBvbkNsaWNrT3V0c2lkZSAoZSkge1xuICAgICAgICBpZiAocHJvcHMucGVyc2lzdGVudCAhPT0gdHJ1ZSAmJiBzaG93aW5nLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgaGlkZShlKVxuXG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgLy8gYWx3YXlzIHByZXZlbnQgdG91Y2ggZXZlbnRcbiAgICAgICAgICAgIGUudHlwZSA9PT0gJ3RvdWNoc3RhcnQnXG4gICAgICAgICAgICAvLyBwcmV2ZW50IGNsaWNrIGlmIGl0J3Mgb24gYSBkaWFsb2cgYmFja2Ryb3BcbiAgICAgICAgICAgIHx8IGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncS1kaWFsb2dfX2JhY2tkcm9wJylcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGFuY2hvck9yaWdpbiA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwYXJzZVBvc2l0aW9uKFxuICAgICAgICBwcm9wcy5hbmNob3IgfHwgKFxuICAgICAgICAgIHByb3BzLmNvdmVyID09PSB0cnVlID8gJ2NlbnRlciBtaWRkbGUnIDogJ2JvdHRvbSBzdGFydCdcbiAgICAgICAgKSxcbiAgICAgICAgJHEubGFuZy5ydGxcbiAgICAgIClcbiAgICApXG5cbiAgICBjb25zdCBzZWxmT3JpZ2luID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuY292ZXIgPT09IHRydWVcbiAgICAgICAgPyBhbmNob3JPcmlnaW4udmFsdWVcbiAgICAgICAgOiBwYXJzZVBvc2l0aW9uKHByb3BzLnNlbGYgfHwgJ3RvcCBzdGFydCcsICRxLmxhbmcucnRsKVxuICAgICkpXG5cbiAgICBjb25zdCBtZW51Q2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgKHByb3BzLnNxdWFyZSA9PT0gdHJ1ZSA/ICcgcS1tZW51LS1zcXVhcmUnIDogJycpXG4gICAgICArIChpc0RhcmsudmFsdWUgPT09IHRydWUgPyAnIHEtbWVudS0tZGFyayBxLWRhcmsnIDogJycpXG4gICAgKVxuXG4gICAgY29uc3Qgb25FdmVudHMgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5hdXRvQ2xvc2UgPT09IHRydWVcbiAgICAgICAgPyB7IG9uQ2xpY2s6IG9uQXV0b0Nsb3NlIH1cbiAgICAgICAgOiB7fVxuICAgICkpXG5cbiAgICBjb25zdCBoYW5kbGVzRm9jdXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSAmJiBwcm9wcy5wZXJzaXN0ZW50ICE9PSB0cnVlXG4gICAgKVxuXG4gICAgd2F0Y2goaGFuZGxlc0ZvY3VzLCB2YWwgPT4ge1xuICAgICAgaWYgKHZhbCA9PT0gdHJ1ZSkge1xuICAgICAgICBhZGRFc2NhcGVLZXkob25Fc2NhcGVLZXkpXG4gICAgICAgIGFkZENsaWNrT3V0c2lkZShjbGlja091dHNpZGVQcm9wcylcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZW1vdmVFc2NhcGVLZXkob25Fc2NhcGVLZXkpXG4gICAgICAgIHJlbW92ZUNsaWNrT3V0c2lkZShjbGlja091dHNpZGVQcm9wcylcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gZm9jdXMgKCkge1xuICAgICAgYWRkRm9jdXNGbigoKSA9PiB7XG4gICAgICAgIGxldCBub2RlID0gaW5uZXJSZWYudmFsdWVcblxuICAgICAgICBpZiAobm9kZSAmJiAobm9kZS5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSAhPT0gdHJ1ZSkpIHtcbiAgICAgICAgICBub2RlID0gbm9kZS5xdWVyeVNlbGVjdG9yKCdbYXV0b2ZvY3VzXVt0YWJpbmRleF0sIFtkYXRhLWF1dG9mb2N1c11bdGFiaW5kZXhdJylcbiAgICAgICAgICAgIHx8IG5vZGUucXVlcnlTZWxlY3RvcignW2F1dG9mb2N1c10gW3RhYmluZGV4XSwgW2RhdGEtYXV0b2ZvY3VzXSBbdGFiaW5kZXhdJylcbiAgICAgICAgICAgIHx8IG5vZGUucXVlcnlTZWxlY3RvcignW2F1dG9mb2N1c10sIFtkYXRhLWF1dG9mb2N1c10nKVxuICAgICAgICAgICAgfHwgbm9kZVxuICAgICAgICAgIG5vZGUuZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlU2hvdyAoZXZ0KSB7XG4gICAgICByZWZvY3VzVGFyZ2V0ID0gcHJvcHMubm9SZWZvY3VzID09PSBmYWxzZVxuICAgICAgICA/IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnRcbiAgICAgICAgOiBudWxsXG5cbiAgICAgIGFkZEZvY3Vzb3V0KG9uRm9jdXNvdXQpXG5cbiAgICAgIHNob3dQb3J0YWwoKVxuICAgICAgY29uZmlndXJlU2Nyb2xsVGFyZ2V0KClcblxuICAgICAgYWJzb2x1dGVPZmZzZXQgPSB2b2lkIDBcblxuICAgICAgaWYgKGV2dCAhPT0gdm9pZCAwICYmIChwcm9wcy50b3VjaFBvc2l0aW9uIHx8IHByb3BzLmNvbnRleHRNZW51KSkge1xuICAgICAgICBjb25zdCBwb3MgPSBwb3NpdGlvbihldnQpXG5cbiAgICAgICAgaWYgKHBvcy5sZWZ0ICE9PSB2b2lkIDApIHtcbiAgICAgICAgICBjb25zdCB7IHRvcCwgbGVmdCB9ID0gYW5jaG9yRWwudmFsdWUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgICBhYnNvbHV0ZU9mZnNldCA9IHsgbGVmdDogcG9zLmxlZnQgLSBsZWZ0LCB0b3A6IHBvcy50b3AgLSB0b3AgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh1bndhdGNoUG9zaXRpb24gPT09IHZvaWQgMCkge1xuICAgICAgICB1bndhdGNoUG9zaXRpb24gPSB3YXRjaChcbiAgICAgICAgICAoKSA9PiAkcS5zY3JlZW4ud2lkdGggKyAnfCcgKyAkcS5zY3JlZW4uaGVpZ2h0ICsgJ3wnICsgcHJvcHMuc2VsZiArICd8JyArIHByb3BzLmFuY2hvciArICd8JyArICRxLmxhbmcucnRsLFxuICAgICAgICAgIHVwZGF0ZVBvc2l0aW9uXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgaWYgKHByb3BzLm5vRm9jdXMgIT09IHRydWUpIHtcbiAgICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ibHVyKClcbiAgICAgIH1cblxuICAgICAgLy8gc2hvdWxkIHJlbW92ZVRpY2soKSBpZiB0aGlzIGdldHMgcmVtb3ZlZFxuICAgICAgcmVnaXN0ZXJUaWNrKCgpID0+IHtcbiAgICAgICAgdXBkYXRlUG9zaXRpb24oKVxuICAgICAgICBwcm9wcy5ub0ZvY3VzICE9PSB0cnVlICYmIGZvY3VzKClcbiAgICAgIH0pXG5cbiAgICAgIC8vIHNob3VsZCByZW1vdmVUaW1lb3V0KCkgaWYgdGhpcyBnZXRzIHJlbW92ZWRcbiAgICAgIHJlZ2lzdGVyVGltZW91dCgoKSA9PiB7XG4gICAgICAgIC8vIHJlcXVpcmVkIGluIG9yZGVyIHRvIGF2b2lkIHRoZSBcImRvdWJsZS10YXAgbmVlZGVkXCIgaXNzdWVcbiAgICAgICAgaWYgKCRxLnBsYXRmb3JtLmlzLmlvcyA9PT0gdHJ1ZSkge1xuICAgICAgICAgIC8vIGlmIGF1dG8tY2xvc2UsIHRoZW4gdGhpcyBjbGljayBzaG91bGRcbiAgICAgICAgICAvLyBub3QgY2xvc2UgdGhlIG1lbnVcbiAgICAgICAgICBhdm9pZEF1dG9DbG9zZSA9IHByb3BzLmF1dG9DbG9zZVxuICAgICAgICAgIGlubmVyUmVmLnZhbHVlLmNsaWNrKClcbiAgICAgICAgfVxuXG4gICAgICAgIHVwZGF0ZVBvc2l0aW9uKClcbiAgICAgICAgc2hvd1BvcnRhbCh0cnVlKSAvLyBkb25lIHNob3dpbmcgcG9ydGFsXG4gICAgICAgIGVtaXQoJ3Nob3cnLCBldnQpXG4gICAgICB9LCBwcm9wcy50cmFuc2l0aW9uRHVyYXRpb24pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlSGlkZSAoZXZ0KSB7XG4gICAgICByZW1vdmVUaWNrKClcbiAgICAgIGhpZGVQb3J0YWwoKVxuXG4gICAgICBhbmNob3JDbGVhbnVwKHRydWUpXG5cbiAgICAgIGlmIChcbiAgICAgICAgcmVmb2N1c1RhcmdldCAhPT0gbnVsbFxuICAgICAgICAmJiAoXG4gICAgICAgICAgLy8gbWVudSB3YXMgaGlkZGVuIGZyb20gY29kZSBvciBFU0MgcGx1Z2luXG4gICAgICAgICAgZXZ0ID09PSB2b2lkIDBcbiAgICAgICAgICAvLyBtZW51IHdhcyBub3QgY2xvc2VkIGZyb20gYSBtb3VzZSBvciB0b3VjaCBjbGlja091dHNpZGVcbiAgICAgICAgICB8fCBldnQucUNsaWNrT3V0c2lkZSAhPT0gdHJ1ZVxuICAgICAgICApXG4gICAgICApIHtcbiAgICAgICAgKChldnQ/LnR5cGUuaW5kZXhPZigna2V5JykgPT09IDBcbiAgICAgICAgICA/IHJlZm9jdXNUYXJnZXQuY2xvc2VzdCgnW3RhYmluZGV4XTpub3QoW3RhYmluZGV4Xj1cIi1cIl0pJylcbiAgICAgICAgICA6IHZvaWQgMFxuICAgICAgICApIHx8IHJlZm9jdXNUYXJnZXQpLmZvY3VzKClcblxuICAgICAgICByZWZvY3VzVGFyZ2V0ID0gbnVsbFxuICAgICAgfVxuXG4gICAgICAvLyBzaG91bGQgcmVtb3ZlVGltZW91dCgpIGlmIHRoaXMgZ2V0cyByZW1vdmVkXG4gICAgICByZWdpc3RlclRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBoaWRlUG9ydGFsKHRydWUpIC8vIGRvbmUgaGlkaW5nLCBub3cgZGVzdHJveVxuICAgICAgICBlbWl0KCdoaWRlJywgZXZ0KVxuICAgICAgfSwgcHJvcHMudHJhbnNpdGlvbkR1cmF0aW9uKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFuY2hvckNsZWFudXAgKGhpZGluZykge1xuICAgICAgYWJzb2x1dGVPZmZzZXQgPSB2b2lkIDBcblxuICAgICAgaWYgKHVud2F0Y2hQb3NpdGlvbiAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHVud2F0Y2hQb3NpdGlvbigpXG4gICAgICAgIHVud2F0Y2hQb3NpdGlvbiA9IHZvaWQgMFxuICAgICAgfVxuXG4gICAgICBpZiAoaGlkaW5nID09PSB0cnVlIHx8IHNob3dpbmcudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgcmVtb3ZlRm9jdXNvdXQob25Gb2N1c291dClcbiAgICAgICAgdW5jb25maWd1cmVTY3JvbGxUYXJnZXQoKVxuICAgICAgICByZW1vdmVDbGlja091dHNpZGUoY2xpY2tPdXRzaWRlUHJvcHMpXG4gICAgICAgIHJlbW92ZUVzY2FwZUtleShvbkVzY2FwZUtleSlcbiAgICAgIH1cblxuICAgICAgaWYgKGhpZGluZyAhPT0gdHJ1ZSkge1xuICAgICAgICByZWZvY3VzVGFyZ2V0ID0gbnVsbFxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbmZpZ3VyZVNjcm9sbFRhcmdldCAoKSB7XG4gICAgICBpZiAoYW5jaG9yRWwudmFsdWUgIT09IG51bGwgfHwgcHJvcHMuc2Nyb2xsVGFyZ2V0ICE9PSB2b2lkIDApIHtcbiAgICAgICAgbG9jYWxTY3JvbGxUYXJnZXQudmFsdWUgPSBnZXRTY3JvbGxUYXJnZXQoYW5jaG9yRWwudmFsdWUsIHByb3BzLnNjcm9sbFRhcmdldClcbiAgICAgICAgY2hhbmdlU2Nyb2xsRXZlbnQobG9jYWxTY3JvbGxUYXJnZXQudmFsdWUsIHVwZGF0ZVBvc2l0aW9uKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uQXV0b0Nsb3NlIChlKSB7XG4gICAgICAvLyBpZiBhdXRvLWNsb3NlLCB0aGVuIHRoZSBpb3MgZG91YmxlLXRhcCBmaXggd2hpY2hcbiAgICAgIC8vIGlzc3VlcyBhIGNsaWNrIHNob3VsZCBub3QgY2xvc2UgdGhlIG1lbnVcbiAgICAgIGlmIChhdm9pZEF1dG9DbG9zZSAhPT0gdHJ1ZSkge1xuICAgICAgICBjbG9zZVBvcnRhbE1lbnVzKHByb3h5LCBlKVxuICAgICAgICBlbWl0KCdjbGljaycsIGUpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgYXZvaWRBdXRvQ2xvc2UgPSBmYWxzZVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRm9jdXNvdXQgKGV2dCkge1xuICAgICAgLy8gdGhlIGZvY3VzIGlzIG5vdCBpbiBhIHZ1ZSBjaGlsZCBjb21wb25lbnRcbiAgICAgIGlmIChcbiAgICAgICAgaGFuZGxlc0ZvY3VzLnZhbHVlID09PSB0cnVlXG4gICAgICAgICYmIHByb3BzLm5vRm9jdXMgIT09IHRydWVcbiAgICAgICAgJiYgY2hpbGRIYXNGb2N1cyhpbm5lclJlZi52YWx1ZSwgZXZ0LnRhcmdldCkgIT09IHRydWVcbiAgICAgICkge1xuICAgICAgICBmb2N1cygpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Fc2NhcGVLZXkgKGV2dCkge1xuICAgICAgaWYgKHByb3BzLm5vRXNjRGlzbWlzcyAhPT0gdHJ1ZSkge1xuICAgICAgICBlbWl0KCdlc2NhcGVLZXknKVxuICAgICAgICBoaWRlKGV2dClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVQb3NpdGlvbiAoKSB7XG4gICAgICBzZXRQb3NpdGlvbih7XG4gICAgICAgIHRhcmdldEVsOiBpbm5lclJlZi52YWx1ZSxcbiAgICAgICAgb2Zmc2V0OiBwcm9wcy5vZmZzZXQsXG4gICAgICAgIGFuY2hvckVsOiBhbmNob3JFbC52YWx1ZSxcbiAgICAgICAgYW5jaG9yT3JpZ2luOiBhbmNob3JPcmlnaW4udmFsdWUsXG4gICAgICAgIHNlbGZPcmlnaW46IHNlbGZPcmlnaW4udmFsdWUsXG4gICAgICAgIGFic29sdXRlT2Zmc2V0LFxuICAgICAgICBmaXQ6IHByb3BzLmZpdCxcbiAgICAgICAgY292ZXI6IHByb3BzLmNvdmVyLFxuICAgICAgICBtYXhIZWlnaHQ6IHByb3BzLm1heEhlaWdodCxcbiAgICAgICAgbWF4V2lkdGg6IHByb3BzLm1heFdpZHRoXG4gICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbmRlclBvcnRhbENvbnRlbnQgKCkge1xuICAgICAgcmV0dXJuIGgoXG4gICAgICAgIFRyYW5zaXRpb24sXG4gICAgICAgIHRyYW5zaXRpb25Qcm9wcy52YWx1ZSxcbiAgICAgICAgKCkgPT4gKFxuICAgICAgICAgIHNob3dpbmcudmFsdWUgPT09IHRydWVcbiAgICAgICAgICAgID8gaCgnZGl2Jywge1xuICAgICAgICAgICAgICByb2xlOiAnbWVudScsXG4gICAgICAgICAgICAgIC4uLmF0dHJzLFxuICAgICAgICAgICAgICByZWY6IGlubmVyUmVmLFxuICAgICAgICAgICAgICB0YWJpbmRleDogLTEsXG4gICAgICAgICAgICAgIGNsYXNzOiBbXG4gICAgICAgICAgICAgICAgJ3EtbWVudSBxLXBvc2l0aW9uLWVuZ2luZSBzY3JvbGwnICsgbWVudUNsYXNzLnZhbHVlLFxuICAgICAgICAgICAgICAgIGF0dHJzLmNsYXNzXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIHN0eWxlOiBbXG4gICAgICAgICAgICAgICAgYXR0cnMuc3R5bGUsXG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvblN0eWxlLnZhbHVlXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIC4uLm9uRXZlbnRzLnZhbHVlXG4gICAgICAgICAgICB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgICAgICAgICAgIDogbnVsbFxuICAgICAgICApXG4gICAgICApXG4gICAgfVxuXG4gICAgb25CZWZvcmVVbm1vdW50KGFuY2hvckNsZWFudXApXG5cbiAgICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHNcbiAgICBPYmplY3QuYXNzaWduKHByb3h5LCB7IGZvY3VzLCB1cGRhdGVQb3NpdGlvbiB9KVxuXG4gICAgcmV0dXJuIHJlbmRlclBvcnRhbFxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIG9uQmVmb3JlVW5tb3VudCwgVHJhbnNpdGlvbiwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlSGlzdG9yeSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1oaXN0b3J5L3VzZS1oaXN0b3J5LmpzJ1xuaW1wb3J0IHVzZVRpbWVvdXQgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvdXNlLXRpbWVvdXQvdXNlLXRpbWVvdXQuanMnXG5pbXBvcnQgdXNlVGljayBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy91c2UtdGljay91c2UtdGljay5qcydcbmltcG9ydCB1c2VNb2RlbFRvZ2dsZSwgeyB1c2VNb2RlbFRvZ2dsZVByb3BzLCB1c2VNb2RlbFRvZ2dsZUVtaXRzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtbW9kZWwtdG9nZ2xlL3VzZS1tb2RlbC10b2dnbGUuanMnXG5pbXBvcnQgdXNlVHJhbnNpdGlvbiwgeyB1c2VUcmFuc2l0aW9uUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS10cmFuc2l0aW9uL3VzZS10cmFuc2l0aW9uLmpzJ1xuaW1wb3J0IHVzZVBvcnRhbCBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1wb3J0YWwvdXNlLXBvcnRhbC5qcydcbmltcG9ydCB1c2VQcmV2ZW50U2Nyb2xsIGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLXByZXZlbnQtc2Nyb2xsL3VzZS1wcmV2ZW50LXNjcm9sbC5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgY2hpbGRIYXNGb2N1cyB9IGZyb20gJy4uLy4uL3V0aWxzL2RvbS9kb20uanMnXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcbmltcG9ydCB7IGFkZEVzY2FwZUtleSwgcmVtb3ZlRXNjYXBlS2V5IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5rZXlib2FyZC9lc2NhcGUta2V5LmpzJ1xuaW1wb3J0IHsgYWRkRm9jdXNvdXQsIHJlbW92ZUZvY3Vzb3V0IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5mb2N1cy9mb2N1c291dC5qcydcbmltcG9ydCB7IGFkZEZvY3VzRm4gfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmZvY3VzL2ZvY3VzLW1hbmFnZXIuanMnXG5cbmxldCBtYXhpbWl6ZWRNb2RhbHMgPSAwXG5cbmNvbnN0IHBvc2l0aW9uQ2xhc3MgPSB7XG4gIHN0YW5kYXJkOiAnZml4ZWQtZnVsbCBmbGV4LWNlbnRlcicsXG4gIHRvcDogJ2ZpeGVkLXRvcCBqdXN0aWZ5LWNlbnRlcicsXG4gIGJvdHRvbTogJ2ZpeGVkLWJvdHRvbSBqdXN0aWZ5LWNlbnRlcicsXG4gIHJpZ2h0OiAnZml4ZWQtcmlnaHQgaXRlbXMtY2VudGVyJyxcbiAgbGVmdDogJ2ZpeGVkLWxlZnQgaXRlbXMtY2VudGVyJ1xufVxuXG5jb25zdCBkZWZhdWx0VHJhbnNpdGlvbnMgPSB7XG4gIHN0YW5kYXJkOiBbICdzY2FsZScsICdzY2FsZScgXSxcbiAgdG9wOiBbICdzbGlkZS1kb3duJywgJ3NsaWRlLXVwJyBdLFxuICBib3R0b206IFsgJ3NsaWRlLXVwJywgJ3NsaWRlLWRvd24nIF0sXG4gIHJpZ2h0OiBbICdzbGlkZS1sZWZ0JywgJ3NsaWRlLXJpZ2h0JyBdLFxuICBsZWZ0OiBbICdzbGlkZS1yaWdodCcsICdzbGlkZS1sZWZ0JyBdXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRRGlhbG9nJyxcblxuICBpbmhlcml0QXR0cnM6IGZhbHNlLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlTW9kZWxUb2dnbGVQcm9wcyxcbiAgICAuLi51c2VUcmFuc2l0aW9uUHJvcHMsXG5cbiAgICB0cmFuc2l0aW9uU2hvdzogU3RyaW5nLCAvLyBvdmVycmlkZSB1c2VUcmFuc2l0aW9uUHJvcHNcbiAgICB0cmFuc2l0aW9uSGlkZTogU3RyaW5nLCAvLyBvdmVycmlkZSB1c2VUcmFuc2l0aW9uUHJvcHNcblxuICAgIHBlcnNpc3RlbnQ6IEJvb2xlYW4sXG4gICAgYXV0b0Nsb3NlOiBCb29sZWFuLFxuICAgIGFsbG93Rm9jdXNPdXRzaWRlOiBCb29sZWFuLFxuXG4gICAgbm9Fc2NEaXNtaXNzOiBCb29sZWFuLFxuICAgIG5vQmFja2Ryb3BEaXNtaXNzOiBCb29sZWFuLFxuICAgIG5vUm91dGVEaXNtaXNzOiBCb29sZWFuLFxuICAgIG5vUmVmb2N1czogQm9vbGVhbixcbiAgICBub0ZvY3VzOiBCb29sZWFuLFxuICAgIG5vU2hha2U6IEJvb2xlYW4sXG5cbiAgICBzZWFtbGVzczogQm9vbGVhbixcblxuICAgIG1heGltaXplZDogQm9vbGVhbixcbiAgICBmdWxsV2lkdGg6IEJvb2xlYW4sXG4gICAgZnVsbEhlaWdodDogQm9vbGVhbixcblxuICAgIHNxdWFyZTogQm9vbGVhbixcblxuICAgIGJhY2tkcm9wRmlsdGVyOiBTdHJpbmcsXG5cbiAgICBwb3NpdGlvbjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ3N0YW5kYXJkJyxcbiAgICAgIHZhbGlkYXRvcjogdmFsID0+IFsgJ3N0YW5kYXJkJywgJ3RvcCcsICdib3R0b20nLCAnbGVmdCcsICdyaWdodCcgXS5pbmNsdWRlcyh2YWwpXG4gICAgfVxuICB9LFxuXG4gIGVtaXRzOiBbXG4gICAgLi4udXNlTW9kZWxUb2dnbGVFbWl0cyxcbiAgICAnc2hha2UnLCAnY2xpY2snLCAnZXNjYXBlS2V5J1xuICBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCwgYXR0cnMgfSkge1xuICAgIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIGNvbnN0IGlubmVyUmVmID0gcmVmKG51bGwpXG4gICAgY29uc3Qgc2hvd2luZyA9IHJlZihmYWxzZSlcbiAgICBjb25zdCBhbmltYXRpbmcgPSByZWYoZmFsc2UpXG5cbiAgICBsZXQgc2hha2VUaW1lb3V0ID0gbnVsbCwgcmVmb2N1c1RhcmdldCA9IG51bGwsIGlzTWF4aW1pemVkLCBhdm9pZEF1dG9DbG9zZVxuXG4gICAgY29uc3QgaGlkZU9uUm91dGVDaGFuZ2UgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMucGVyc2lzdGVudCAhPT0gdHJ1ZVxuICAgICAgJiYgcHJvcHMubm9Sb3V0ZURpc21pc3MgIT09IHRydWVcbiAgICAgICYmIHByb3BzLnNlYW1sZXNzICE9PSB0cnVlXG4gICAgKVxuXG4gICAgY29uc3QgeyBwcmV2ZW50Qm9keVNjcm9sbCB9ID0gdXNlUHJldmVudFNjcm9sbCgpXG4gICAgY29uc3QgeyByZWdpc3RlclRpbWVvdXQgfSA9IHVzZVRpbWVvdXQoKVxuICAgIGNvbnN0IHsgcmVnaXN0ZXJUaWNrLCByZW1vdmVUaWNrIH0gPSB1c2VUaWNrKClcblxuICAgIGNvbnN0IHsgdHJhbnNpdGlvblByb3BzLCB0cmFuc2l0aW9uU3R5bGUgfSA9IHVzZVRyYW5zaXRpb24oXG4gICAgICBwcm9wcyxcbiAgICAgICgpID0+IGRlZmF1bHRUcmFuc2l0aW9uc1sgcHJvcHMucG9zaXRpb24gXVsgMCBdLFxuICAgICAgKCkgPT4gZGVmYXVsdFRyYW5zaXRpb25zWyBwcm9wcy5wb3NpdGlvbiBdWyAxIF1cbiAgICApXG5cbiAgICBjb25zdCBiYWNrZHJvcFN0eWxlID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgdHJhbnNpdGlvblN0eWxlLnZhbHVlXG4gICAgICArIChcbiAgICAgICAgcHJvcHMuYmFja2Ryb3BGaWx0ZXIgIT09IHZvaWQgMFxuICAgICAgICAgIC8vIFNhZmFyaSByZXF1aXJlcyB0aGUgLXdlYmtpdCBwcmVmaXhcbiAgICAgICAgICA/IGA7YmFja2Ryb3AtZmlsdGVyOiR7IHByb3BzLmJhY2tkcm9wRmlsdGVyIH07LXdlYmtpdC1iYWNrZHJvcC1maWx0ZXI6JHsgcHJvcHMuYmFja2Ryb3BGaWx0ZXIgfWBcbiAgICAgICAgICA6ICcnXG4gICAgICApXG4gICAgKSlcblxuICAgIGNvbnN0IHsgc2hvd1BvcnRhbCwgaGlkZVBvcnRhbCwgcG9ydGFsSXNBY2Nlc3NpYmxlLCByZW5kZXJQb3J0YWwgfSA9IHVzZVBvcnRhbChcbiAgICAgIHZtLCBpbm5lclJlZiwgcmVuZGVyUG9ydGFsQ29udGVudCwgJ2RpYWxvZydcbiAgICApXG5cbiAgICBjb25zdCB7IGhpZGUgfSA9IHVzZU1vZGVsVG9nZ2xlKHtcbiAgICAgIHNob3dpbmcsXG4gICAgICBoaWRlT25Sb3V0ZUNoYW5nZSxcbiAgICAgIGhhbmRsZVNob3csXG4gICAgICBoYW5kbGVIaWRlLFxuICAgICAgcHJvY2Vzc09uTW91bnQ6IHRydWVcbiAgICB9KVxuXG4gICAgY29uc3QgeyBhZGRUb0hpc3RvcnksIHJlbW92ZUZyb21IaXN0b3J5IH0gPSB1c2VIaXN0b3J5KHNob3dpbmcsIGhpZGUsIGhpZGVPblJvdXRlQ2hhbmdlKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1kaWFsb2dfX2lubmVyIGZsZXggbm8tcG9pbnRlci1ldmVudHMnXG4gICAgICArIGAgcS1kaWFsb2dfX2lubmVyLS0keyBwcm9wcy5tYXhpbWl6ZWQgPT09IHRydWUgPyAnbWF4aW1pemVkJyA6ICdtaW5pbWl6ZWQnIH1gXG4gICAgICArIGAgcS1kaWFsb2dfX2lubmVyLS0keyBwcm9wcy5wb3NpdGlvbiB9ICR7IHBvc2l0aW9uQ2xhc3NbIHByb3BzLnBvc2l0aW9uIF0gfWBcbiAgICAgICsgKGFuaW1hdGluZy52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1kaWFsb2dfX2lubmVyLS1hbmltYXRpbmcnIDogJycpXG4gICAgICArIChwcm9wcy5mdWxsV2lkdGggPT09IHRydWUgPyAnIHEtZGlhbG9nX19pbm5lci0tZnVsbHdpZHRoJyA6ICcnKVxuICAgICAgKyAocHJvcHMuZnVsbEhlaWdodCA9PT0gdHJ1ZSA/ICcgcS1kaWFsb2dfX2lubmVyLS1mdWxsaGVpZ2h0JyA6ICcnKVxuICAgICAgKyAocHJvcHMuc3F1YXJlID09PSB0cnVlID8gJyBxLWRpYWxvZ19faW5uZXItLXNxdWFyZScgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCB1c2VCYWNrZHJvcCA9IGNvbXB1dGVkKCgpID0+IHNob3dpbmcudmFsdWUgPT09IHRydWUgJiYgcHJvcHMuc2VhbWxlc3MgIT09IHRydWUpXG5cbiAgICBjb25zdCBvbkV2ZW50cyA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLmF1dG9DbG9zZSA9PT0gdHJ1ZVxuICAgICAgICA/IHsgb25DbGljazogb25BdXRvQ2xvc2UgfVxuICAgICAgICA6IHt9XG4gICAgKSlcblxuICAgIGNvbnN0IHJvb3RDbGFzc2VzID0gY29tcHV0ZWQoKCkgPT4gW1xuICAgICAgJ3EtZGlhbG9nIGZ1bGxzY3JlZW4gbm8tcG9pbnRlci1ldmVudHMgJ1xuICAgICAgICArIGBxLWRpYWxvZy0tJHsgdXNlQmFja2Ryb3AudmFsdWUgPT09IHRydWUgPyAnbW9kYWwnIDogJ3NlYW1sZXNzJyB9YCxcbiAgICAgIGF0dHJzLmNsYXNzXG4gICAgXSlcblxuICAgIHdhdGNoKCgpID0+IHByb3BzLm1heGltaXplZCwgc3RhdGUgPT4ge1xuICAgICAgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSAmJiB1cGRhdGVNYXhpbWl6ZWQoc3RhdGUpXG4gICAgfSlcblxuICAgIHdhdGNoKHVzZUJhY2tkcm9wLCB2YWwgPT4ge1xuICAgICAgcHJldmVudEJvZHlTY3JvbGwodmFsKVxuXG4gICAgICBpZiAodmFsID09PSB0cnVlKSB7XG4gICAgICAgIGFkZEZvY3Vzb3V0KG9uRm9jdXNDaGFuZ2UpXG4gICAgICAgIGFkZEVzY2FwZUtleShvbkVzY2FwZUtleSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZW1vdmVGb2N1c291dChvbkZvY3VzQ2hhbmdlKVxuICAgICAgICByZW1vdmVFc2NhcGVLZXkob25Fc2NhcGVLZXkpXG4gICAgICB9XG4gICAgfSlcblxuICAgIGZ1bmN0aW9uIGhhbmRsZVNob3cgKGV2dCkge1xuICAgICAgYWRkVG9IaXN0b3J5KClcblxuICAgICAgcmVmb2N1c1RhcmdldCA9IHByb3BzLm5vUmVmb2N1cyA9PT0gZmFsc2UgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gbnVsbFxuICAgICAgICA/IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnRcbiAgICAgICAgOiBudWxsXG5cbiAgICAgIHVwZGF0ZU1heGltaXplZChwcm9wcy5tYXhpbWl6ZWQpXG4gICAgICBzaG93UG9ydGFsKClcbiAgICAgIGFuaW1hdGluZy52YWx1ZSA9IHRydWVcblxuICAgICAgaWYgKHByb3BzLm5vRm9jdXMgIT09IHRydWUpIHtcbiAgICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudD8uYmx1cigpXG4gICAgICAgIHJlZ2lzdGVyVGljayhmb2N1cylcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZW1vdmVUaWNrKClcbiAgICAgIH1cblxuICAgICAgLy8gc2hvdWxkIHJlbW92ZVRpbWVvdXQoKSBpZiB0aGlzIGdldHMgcmVtb3ZlZFxuICAgICAgcmVnaXN0ZXJUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKHZtLnByb3h5LiRxLnBsYXRmb3JtLmlzLmlvcyA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGlmIChwcm9wcy5zZWFtbGVzcyAhPT0gdHJ1ZSAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICBjb25zdFxuICAgICAgICAgICAgICB7IHRvcCwgYm90dG9tIH0gPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgICAgICAgICB7IGlubmVySGVpZ2h0IH0gPSB3aW5kb3csXG4gICAgICAgICAgICAgIGhlaWdodCA9IHdpbmRvdy52aXN1YWxWaWV3cG9ydCAhPT0gdm9pZCAwXG4gICAgICAgICAgICAgICAgPyB3aW5kb3cudmlzdWFsVmlld3BvcnQuaGVpZ2h0XG4gICAgICAgICAgICAgICAgOiBpbm5lckhlaWdodFxuXG4gICAgICAgICAgICBpZiAodG9wID4gMCAmJiBib3R0b20gPiBoZWlnaHQgLyAyKSB7XG4gICAgICAgICAgICAgIGRvY3VtZW50LnNjcm9sbGluZ0VsZW1lbnQuc2Nyb2xsVG9wID0gTWF0aC5taW4oXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuc2Nyb2xsaW5nRWxlbWVudC5zY3JvbGxIZWlnaHQgLSBoZWlnaHQsXG4gICAgICAgICAgICAgICAgYm90dG9tID49IGlubmVySGVpZ2h0XG4gICAgICAgICAgICAgICAgICA/IEluZmluaXR5XG4gICAgICAgICAgICAgICAgICA6IE1hdGguY2VpbChkb2N1bWVudC5zY3JvbGxpbmdFbGVtZW50LnNjcm9sbFRvcCArIGJvdHRvbSAtIGhlaWdodCAvIDIpXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5zY3JvbGxJbnRvVmlldygpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gcmVxdWlyZWQgaW4gb3JkZXIgdG8gYXZvaWQgdGhlIFwiZG91YmxlLXRhcCBuZWVkZWRcIiBpc3N1ZVxuICAgICAgICAgIGF2b2lkQXV0b0Nsb3NlID0gdHJ1ZVxuICAgICAgICAgIGlubmVyUmVmLnZhbHVlLmNsaWNrKClcbiAgICAgICAgICBhdm9pZEF1dG9DbG9zZSA9IGZhbHNlXG4gICAgICAgIH1cblxuICAgICAgICBzaG93UG9ydGFsKHRydWUpIC8vIGRvbmUgc2hvd2luZyBwb3J0YWxcbiAgICAgICAgYW5pbWF0aW5nLnZhbHVlID0gZmFsc2VcbiAgICAgICAgZW1pdCgnc2hvdycsIGV2dClcbiAgICAgIH0sIHByb3BzLnRyYW5zaXRpb25EdXJhdGlvbilcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVIaWRlIChldnQpIHtcbiAgICAgIHJlbW92ZVRpY2soKVxuICAgICAgcmVtb3ZlRnJvbUhpc3RvcnkoKVxuICAgICAgY2xlYW51cCh0cnVlKVxuICAgICAgYW5pbWF0aW5nLnZhbHVlID0gdHJ1ZVxuICAgICAgaGlkZVBvcnRhbCgpXG5cbiAgICAgIGlmIChyZWZvY3VzVGFyZ2V0ICE9PSBudWxsKSB7XG4gICAgICAgICgoZXZ0Py50eXBlLmluZGV4T2YoJ2tleScpID09PSAwXG4gICAgICAgICAgPyByZWZvY3VzVGFyZ2V0LmNsb3Nlc3QoJ1t0YWJpbmRleF06bm90KFt0YWJpbmRleF49XCItXCJdKScpXG4gICAgICAgICAgOiB2b2lkIDBcbiAgICAgICAgKSB8fCByZWZvY3VzVGFyZ2V0KS5mb2N1cygpXG5cbiAgICAgICAgcmVmb2N1c1RhcmdldCA9IG51bGxcbiAgICAgIH1cblxuICAgICAgLy8gc2hvdWxkIHJlbW92ZVRpbWVvdXQoKSBpZiB0aGlzIGdldHMgcmVtb3ZlZFxuICAgICAgcmVnaXN0ZXJUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaGlkZVBvcnRhbCh0cnVlKSAvLyBkb25lIGhpZGluZywgbm93IGRlc3Ryb3lcbiAgICAgICAgYW5pbWF0aW5nLnZhbHVlID0gZmFsc2VcbiAgICAgICAgZW1pdCgnaGlkZScsIGV2dClcbiAgICAgIH0sIHByb3BzLnRyYW5zaXRpb25EdXJhdGlvbilcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb2N1cyAoc2VsZWN0b3IpIHtcbiAgICAgIGFkZEZvY3VzRm4oKCkgPT4ge1xuICAgICAgICBsZXQgbm9kZSA9IGlubmVyUmVmLnZhbHVlXG5cbiAgICAgICAgaWYgKG5vZGUgPT09IG51bGwpIHJldHVyblxuXG4gICAgICAgIGlmIChzZWxlY3RvciAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgY29uc3QgdGFyZ2V0ID0gbm9kZS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKVxuICAgICAgICAgIGlmICh0YXJnZXQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRhcmdldC5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSlcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChub2RlLmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpICE9PSB0cnVlKSB7XG4gICAgICAgICAgbm9kZSA9IChcbiAgICAgICAgICAgIG5vZGUucXVlcnlTZWxlY3RvcignW2F1dG9mb2N1c11bdGFiaW5kZXhdLCBbZGF0YS1hdXRvZm9jdXNdW3RhYmluZGV4XScpXG4gICAgICAgICAgICB8fCBub2RlLnF1ZXJ5U2VsZWN0b3IoJ1thdXRvZm9jdXNdIFt0YWJpbmRleF0sIFtkYXRhLWF1dG9mb2N1c10gW3RhYmluZGV4XScpXG4gICAgICAgICAgICB8fCBub2RlLnF1ZXJ5U2VsZWN0b3IoJ1thdXRvZm9jdXNdLCBbZGF0YS1hdXRvZm9jdXNdJylcbiAgICAgICAgICAgIHx8IG5vZGVcbiAgICAgICAgICApXG5cbiAgICAgICAgICBub2RlLmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNoYWtlIChmb2N1c1RhcmdldCkge1xuICAgICAgaWYgKGZvY3VzVGFyZ2V0ICYmIHR5cGVvZiBmb2N1c1RhcmdldC5mb2N1cyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBmb2N1c1RhcmdldC5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBmb2N1cygpXG4gICAgICB9XG5cbiAgICAgIGVtaXQoJ3NoYWtlJylcblxuICAgICAgY29uc3Qgbm9kZSA9IGlubmVyUmVmLnZhbHVlXG5cbiAgICAgIGlmIChub2RlICE9PSBudWxsKSB7XG4gICAgICAgIG5vZGUuY2xhc3NMaXN0LnJlbW92ZSgncS1hbmltYXRlLS1zY2FsZScpXG4gICAgICAgIG5vZGUuY2xhc3NMaXN0LmFkZCgncS1hbmltYXRlLS1zY2FsZScpXG4gICAgICAgIHNoYWtlVGltZW91dCAhPT0gbnVsbCAmJiBjbGVhclRpbWVvdXQoc2hha2VUaW1lb3V0KVxuICAgICAgICBzaGFrZVRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBzaGFrZVRpbWVvdXQgPSBudWxsXG4gICAgICAgICAgaWYgKGlubmVyUmVmLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBub2RlLmNsYXNzTGlzdC5yZW1vdmUoJ3EtYW5pbWF0ZS0tc2NhbGUnKVxuICAgICAgICAgICAgLy8gc29tZSBwbGF0Zm9ybXMgKGxpa2UgZGVza3RvcCBDaHJvbWUpXG4gICAgICAgICAgICAvLyByZXF1aXJlIGNhbGxpbmcgZm9jdXMoKSBhZ2FpblxuICAgICAgICAgICAgZm9jdXMoKVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgMTcwKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRXNjYXBlS2V5ICgpIHtcbiAgICAgIGlmIChwcm9wcy5zZWFtbGVzcyAhPT0gdHJ1ZSkge1xuICAgICAgICBpZiAocHJvcHMucGVyc2lzdGVudCA9PT0gdHJ1ZSB8fCBwcm9wcy5ub0VzY0Rpc21pc3MgPT09IHRydWUpIHtcbiAgICAgICAgICBwcm9wcy5tYXhpbWl6ZWQgIT09IHRydWUgJiYgcHJvcHMubm9TaGFrZSAhPT0gdHJ1ZSAmJiBzaGFrZSgpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZW1pdCgnZXNjYXBlS2V5JylcbiAgICAgICAgICBoaWRlKClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsZWFudXAgKGhpZGluZykge1xuICAgICAgaWYgKHNoYWtlVGltZW91dCAhPT0gbnVsbCkge1xuICAgICAgICBjbGVhclRpbWVvdXQoc2hha2VUaW1lb3V0KVxuICAgICAgICBzaGFrZVRpbWVvdXQgPSBudWxsXG4gICAgICB9XG5cbiAgICAgIGlmIChoaWRpbmcgPT09IHRydWUgfHwgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICB1cGRhdGVNYXhpbWl6ZWQoZmFsc2UpXG5cbiAgICAgICAgaWYgKHByb3BzLnNlYW1sZXNzICE9PSB0cnVlKSB7XG4gICAgICAgICAgcHJldmVudEJvZHlTY3JvbGwoZmFsc2UpXG4gICAgICAgICAgcmVtb3ZlRm9jdXNvdXQob25Gb2N1c0NoYW5nZSlcbiAgICAgICAgICByZW1vdmVFc2NhcGVLZXkob25Fc2NhcGVLZXkpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGhpZGluZyAhPT0gdHJ1ZSkge1xuICAgICAgICByZWZvY3VzVGFyZ2V0ID0gbnVsbFxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZU1heGltaXplZCAoYWN0aXZlKSB7XG4gICAgICBpZiAoYWN0aXZlID09PSB0cnVlKSB7XG4gICAgICAgIGlmIChpc01heGltaXplZCAhPT0gdHJ1ZSkge1xuICAgICAgICAgIG1heGltaXplZE1vZGFscyA8IDEgJiYgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdxLWJvZHktLWRpYWxvZycpXG4gICAgICAgICAgbWF4aW1pemVkTW9kYWxzKytcblxuICAgICAgICAgIGlzTWF4aW1pemVkID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChpc01heGltaXplZCA9PT0gdHJ1ZSkge1xuICAgICAgICBpZiAobWF4aW1pemVkTW9kYWxzIDwgMikge1xuICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgncS1ib2R5LS1kaWFsb2cnKVxuICAgICAgICB9XG5cbiAgICAgICAgbWF4aW1pemVkTW9kYWxzLS1cbiAgICAgICAgaXNNYXhpbWl6ZWQgPSBmYWxzZVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uQXV0b0Nsb3NlIChlKSB7XG4gICAgICBpZiAoYXZvaWRBdXRvQ2xvc2UgIT09IHRydWUpIHtcbiAgICAgICAgaGlkZShlKVxuICAgICAgICBlbWl0KCdjbGljaycsIGUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25CYWNrZHJvcENsaWNrIChlKSB7XG4gICAgICBpZiAocHJvcHMucGVyc2lzdGVudCAhPT0gdHJ1ZSAmJiBwcm9wcy5ub0JhY2tkcm9wRGlzbWlzcyAhPT0gdHJ1ZSkge1xuICAgICAgICBoaWRlKGUpXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChwcm9wcy5ub1NoYWtlICE9PSB0cnVlKSB7XG4gICAgICAgIHNoYWtlKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkZvY3VzQ2hhbmdlIChldnQpIHtcbiAgICAgIC8vIHRoZSBmb2N1cyBpcyBub3QgaW4gYSB2dWUgY2hpbGQgY29tcG9uZW50XG4gICAgICBpZiAoXG4gICAgICAgIHByb3BzLmFsbG93Rm9jdXNPdXRzaWRlICE9PSB0cnVlXG4gICAgICAgICYmIHBvcnRhbElzQWNjZXNzaWJsZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAmJiBjaGlsZEhhc0ZvY3VzKGlubmVyUmVmLnZhbHVlLCBldnQudGFyZ2V0KSAhPT0gdHJ1ZVxuICAgICAgKSB7XG4gICAgICAgIGZvY3VzKCdbdGFiaW5kZXhdOm5vdChbdGFiaW5kZXg9XCItMVwiXSknKVxuICAgICAgfVxuICAgIH1cblxuICAgIE9iamVjdC5hc3NpZ24odm0ucHJveHksIHtcbiAgICAgIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kc1xuICAgICAgZm9jdXMsIHNoYWtlLFxuXG4gICAgICAvLyBwcml2YXRlIGJ1dCBuZWVkZWQgYnkgUVNlbGVjdFxuICAgICAgX191cGRhdGVSZWZvY3VzVGFyZ2V0ICh0YXJnZXQpIHtcbiAgICAgICAgcmVmb2N1c1RhcmdldCA9IHRhcmdldCB8fCBudWxsXG4gICAgICB9XG4gICAgfSlcblxuICAgIG9uQmVmb3JlVW5tb3VudChjbGVhbnVwKVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyUG9ydGFsQ29udGVudCAoKSB7XG4gICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICByb2xlOiAnZGlhbG9nJyxcbiAgICAgICAgJ2FyaWEtbW9kYWwnOiB1c2VCYWNrZHJvcC52YWx1ZSA9PT0gdHJ1ZSA/ICd0cnVlJyA6ICdmYWxzZScsXG4gICAgICAgIC4uLmF0dHJzLFxuICAgICAgICBjbGFzczogcm9vdENsYXNzZXMudmFsdWVcbiAgICAgIH0sIFtcbiAgICAgICAgaChUcmFuc2l0aW9uLCB7XG4gICAgICAgICAgbmFtZTogJ3EtdHJhbnNpdGlvbi0tZmFkZScsXG4gICAgICAgICAgYXBwZWFyOiB0cnVlXG4gICAgICAgIH0sICgpID0+IChcbiAgICAgICAgICB1c2VCYWNrZHJvcC52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgICAgPyBoKCdkaXYnLCB7XG4gICAgICAgICAgICAgIGNsYXNzOiAncS1kaWFsb2dfX2JhY2tkcm9wIGZpeGVkLWZ1bGwnLFxuICAgICAgICAgICAgICBzdHlsZTogYmFja2Ryb3BTdHlsZS52YWx1ZSxcbiAgICAgICAgICAgICAgJ2FyaWEtaGlkZGVuJzogJ3RydWUnLFxuICAgICAgICAgICAgICB0YWJpbmRleDogLTEsXG4gICAgICAgICAgICAgIG9uQ2xpY2s6IG9uQmFja2Ryb3BDbGlja1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIDogbnVsbFxuICAgICAgICApKSxcblxuICAgICAgICBoKFxuICAgICAgICAgIFRyYW5zaXRpb24sXG4gICAgICAgICAgdHJhbnNpdGlvblByb3BzLnZhbHVlLFxuICAgICAgICAgICgpID0+IChcbiAgICAgICAgICAgIHNob3dpbmcudmFsdWUgPT09IHRydWVcbiAgICAgICAgICAgICAgPyBoKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgcmVmOiBpbm5lclJlZixcbiAgICAgICAgICAgICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgICAgICAgICAgICBzdHlsZTogdHJhbnNpdGlvblN0eWxlLnZhbHVlLFxuICAgICAgICAgICAgICAgIHRhYmluZGV4OiAtMSxcbiAgICAgICAgICAgICAgICAuLi5vbkV2ZW50cy52YWx1ZVxuICAgICAgICAgICAgICB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgICAgICAgICAgICAgOiBudWxsXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICBdKVxuICAgIH1cblxuICAgIHJldHVybiByZW5kZXJQb3J0YWxcbiAgfVxufSlcbiIsImxldCBydGxIYXNTY3JvbGxCdWcgPSBmYWxzZVxuXG4vLyBtb2JpbGUgQ2hyb21lIHRha2VzIHRoZSBjcm93biBmb3IgdGhpc1xuaWYgKCFfX1FVQVNBUl9TU1JfXykge1xuICBjb25zdCBzY3JvbGxlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gIHNjcm9sbGVyLnNldEF0dHJpYnV0ZSgnZGlyJywgJ3J0bCcpXG4gIE9iamVjdC5hc3NpZ24oc2Nyb2xsZXIuc3R5bGUsIHtcbiAgICB3aWR0aDogJzFweCcsXG4gICAgaGVpZ2h0OiAnMXB4JyxcbiAgICBvdmVyZmxvdzogJ2F1dG8nXG4gIH0pXG5cbiAgY29uc3Qgc3BhY2VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgT2JqZWN0LmFzc2lnbihzcGFjZXIuc3R5bGUsIHtcbiAgICB3aWR0aDogJzEwMDBweCcsXG4gICAgaGVpZ2h0OiAnMXB4J1xuICB9KVxuXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2Nyb2xsZXIpXG4gIHNjcm9sbGVyLmFwcGVuZENoaWxkKHNwYWNlcilcbiAgc2Nyb2xsZXIuc2Nyb2xsTGVmdCA9IC0xMDAwXG5cbiAgcnRsSGFzU2Nyb2xsQnVnID0gc2Nyb2xsZXIuc2Nyb2xsTGVmdCA+PSAwXG5cbiAgc2Nyb2xsZXIucmVtb3ZlKClcbn1cblxuZXhwb3J0IHtcbiAgcnRsSGFzU2Nyb2xsQnVnXG59XG4iLCJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCB3YXRjaCwgb25BY3RpdmF0ZWQsIG9uRGVhY3RpdmF0ZWQsIG9uQmVmb3JlTW91bnQsIG9uQmVmb3JlVW5tb3VudCwgbmV4dFRpY2ssIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IGRlYm91bmNlIGZyb20gJy4uLy4uL3V0aWxzL2RlYm91bmNlL2RlYm91bmNlLmpzJ1xuaW1wb3J0IHsgbm9vcCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50L2V2ZW50LmpzJ1xuaW1wb3J0IHsgcnRsSGFzU2Nyb2xsQnVnIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5ydGwvcnRsLmpzJ1xuXG5jb25zdCBhZ2dCdWNrZXRTaXplID0gMTAwMFxuXG5jb25zdCBzY3JvbGxUb0VkZ2VzID0gW1xuICAnc3RhcnQnLFxuICAnY2VudGVyJyxcbiAgJ2VuZCcsXG4gICdzdGFydC1mb3JjZScsXG4gICdjZW50ZXItZm9yY2UnLFxuICAnZW5kLWZvcmNlJ1xuXVxuXG5jb25zdCBmaWx0ZXJQcm90byA9IEFycmF5LnByb3RvdHlwZS5maWx0ZXJcblxuY29uc3Qgc2V0T3ZlcmZsb3dBbmNob3IgPSBfX1FVQVNBUl9TU1JfXyB8fCB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5ib2R5KS5vdmVyZmxvd0FuY2hvciA9PT0gdm9pZCAwXG4gID8gbm9vcFxuICA6IGZ1bmN0aW9uIChjb250ZW50RWwsIGluZGV4KSB7XG4gICAgaWYgKGNvbnRlbnRFbCA9PT0gbnVsbCkgcmV0dXJuXG5cbiAgICBpZiAoY29udGVudEVsLl9xT3ZlcmZsb3dBbmltYXRpb25GcmFtZSAhPT0gdm9pZCAwKSB7XG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShjb250ZW50RWwuX3FPdmVyZmxvd0FuaW1hdGlvbkZyYW1lKVxuICAgIH1cblxuICAgIGNvbnRlbnRFbC5fcU92ZXJmbG93QW5pbWF0aW9uRnJhbWUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgaWYgKGNvbnRlbnRFbCA9PT0gbnVsbCkgcmV0dXJuXG5cbiAgICAgIGNvbnRlbnRFbC5fcU92ZXJmbG93QW5pbWF0aW9uRnJhbWUgPSB2b2lkIDBcbiAgICAgIGNvbnN0IGNoaWxkcmVuID0gY29udGVudEVsLmNoaWxkcmVuIHx8IFtdXG5cbiAgICAgIGZpbHRlclByb3RvXG4gICAgICAgIC5jYWxsKGNoaWxkcmVuLCBlbCA9PiBlbC5kYXRhc2V0ICYmIGVsLmRhdGFzZXQucVZzQW5jaG9yICE9PSB2b2lkIDApXG4gICAgICAgIC5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgICBkZWxldGUgZWwuZGF0YXNldC5xVnNBbmNob3JcbiAgICAgICAgfSlcblxuICAgICAgY29uc3QgZWwgPSBjaGlsZHJlblsgaW5kZXggXVxuXG4gICAgICBpZiAoZWw/LmRhdGFzZXQpIHtcbiAgICAgICAgZWwuZGF0YXNldC5xVnNBbmNob3IgPSAnJ1xuICAgICAgfVxuICAgIH0pXG4gIH1cblxuZnVuY3Rpb24gc3VtRm4gKGFjYywgaCkge1xuICByZXR1cm4gYWNjICsgaFxufVxuXG5mdW5jdGlvbiBnZXRTY3JvbGxEZXRhaWxzIChcbiAgcGFyZW50LFxuICBjaGlsZCxcbiAgYmVmb3JlUmVmLFxuICBhZnRlclJlZixcbiAgaG9yaXpvbnRhbCxcbiAgcnRsLFxuICBzdGlja3lTdGFydCxcbiAgc3RpY2t5RW5kXG4pIHtcbiAgY29uc3RcbiAgICBwYXJlbnRDYWxjID0gcGFyZW50ID09PSB3aW5kb3cgPyBkb2N1bWVudC5zY3JvbGxpbmdFbGVtZW50IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCA6IHBhcmVudCxcbiAgICBwcm9wRWxTaXplID0gaG9yaXpvbnRhbCA9PT0gdHJ1ZSA/ICdvZmZzZXRXaWR0aCcgOiAnb2Zmc2V0SGVpZ2h0JyxcbiAgICBkZXRhaWxzID0ge1xuICAgICAgc2Nyb2xsU3RhcnQ6IDAsXG4gICAgICBzY3JvbGxWaWV3U2l6ZTogLXN0aWNreVN0YXJ0IC0gc3RpY2t5RW5kLFxuICAgICAgc2Nyb2xsTWF4U2l6ZTogMCxcbiAgICAgIG9mZnNldFN0YXJ0OiAtc3RpY2t5U3RhcnQsXG4gICAgICBvZmZzZXRFbmQ6IC1zdGlja3lFbmRcbiAgICB9XG5cbiAgaWYgKGhvcml6b250YWwgPT09IHRydWUpIHtcbiAgICBpZiAocGFyZW50ID09PSB3aW5kb3cpIHtcbiAgICAgIGRldGFpbHMuc2Nyb2xsU3RhcnQgPSB3aW5kb3cucGFnZVhPZmZzZXQgfHwgd2luZG93LnNjcm9sbFggfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0IHx8IDBcbiAgICAgIGRldGFpbHMuc2Nyb2xsVmlld1NpemUgKz0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZGV0YWlscy5zY3JvbGxTdGFydCA9IHBhcmVudENhbGMuc2Nyb2xsTGVmdFxuICAgICAgZGV0YWlscy5zY3JvbGxWaWV3U2l6ZSArPSBwYXJlbnRDYWxjLmNsaWVudFdpZHRoXG4gICAgfVxuICAgIGRldGFpbHMuc2Nyb2xsTWF4U2l6ZSA9IHBhcmVudENhbGMuc2Nyb2xsV2lkdGhcblxuICAgIGlmIChydGwgPT09IHRydWUpIHtcbiAgICAgIGRldGFpbHMuc2Nyb2xsU3RhcnQgPSAocnRsSGFzU2Nyb2xsQnVnID09PSB0cnVlID8gZGV0YWlscy5zY3JvbGxNYXhTaXplIC0gZGV0YWlscy5zY3JvbGxWaWV3U2l6ZSA6IDApIC0gZGV0YWlscy5zY3JvbGxTdGFydFxuICAgIH1cbiAgfVxuICBlbHNlIHtcbiAgICBpZiAocGFyZW50ID09PSB3aW5kb3cpIHtcbiAgICAgIGRldGFpbHMuc2Nyb2xsU3RhcnQgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgd2luZG93LnNjcm9sbFkgfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgfHwgMFxuICAgICAgZGV0YWlscy5zY3JvbGxWaWV3U2l6ZSArPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZGV0YWlscy5zY3JvbGxTdGFydCA9IHBhcmVudENhbGMuc2Nyb2xsVG9wXG4gICAgICBkZXRhaWxzLnNjcm9sbFZpZXdTaXplICs9IHBhcmVudENhbGMuY2xpZW50SGVpZ2h0XG4gICAgfVxuICAgIGRldGFpbHMuc2Nyb2xsTWF4U2l6ZSA9IHBhcmVudENhbGMuc2Nyb2xsSGVpZ2h0XG4gIH1cblxuICBpZiAoYmVmb3JlUmVmICE9PSBudWxsKSB7XG4gICAgZm9yIChsZXQgZWwgPSBiZWZvcmVSZWYucHJldmlvdXNFbGVtZW50U2libGluZzsgZWwgIT09IG51bGw7IGVsID0gZWwucHJldmlvdXNFbGVtZW50U2libGluZykge1xuICAgICAgaWYgKGVsLmNsYXNzTGlzdC5jb250YWlucygncS12aXJ0dWFsLXNjcm9sbC0tc2tpcCcpID09PSBmYWxzZSkge1xuICAgICAgICBkZXRhaWxzLm9mZnNldFN0YXJ0ICs9IGVsWyBwcm9wRWxTaXplIF1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoYWZ0ZXJSZWYgIT09IG51bGwpIHtcbiAgICBmb3IgKGxldCBlbCA9IGFmdGVyUmVmLm5leHRFbGVtZW50U2libGluZzsgZWwgIT09IG51bGw7IGVsID0gZWwubmV4dEVsZW1lbnRTaWJsaW5nKSB7XG4gICAgICBpZiAoZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdxLXZpcnR1YWwtc2Nyb2xsLS1za2lwJykgPT09IGZhbHNlKSB7XG4gICAgICAgIGRldGFpbHMub2Zmc2V0RW5kICs9IGVsWyBwcm9wRWxTaXplIF1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoY2hpbGQgIT09IHBhcmVudCkge1xuICAgIGNvbnN0XG4gICAgICBwYXJlbnRSZWN0ID0gcGFyZW50Q2FsYy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgIGNoaWxkUmVjdCA9IGNoaWxkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cbiAgICBpZiAoaG9yaXpvbnRhbCA9PT0gdHJ1ZSkge1xuICAgICAgZGV0YWlscy5vZmZzZXRTdGFydCArPSBjaGlsZFJlY3QubGVmdCAtIHBhcmVudFJlY3QubGVmdFxuICAgICAgZGV0YWlscy5vZmZzZXRFbmQgLT0gY2hpbGRSZWN0LndpZHRoXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZGV0YWlscy5vZmZzZXRTdGFydCArPSBjaGlsZFJlY3QudG9wIC0gcGFyZW50UmVjdC50b3BcbiAgICAgIGRldGFpbHMub2Zmc2V0RW5kIC09IGNoaWxkUmVjdC5oZWlnaHRcbiAgICB9XG5cbiAgICBpZiAocGFyZW50ICE9PSB3aW5kb3cpIHtcbiAgICAgIGRldGFpbHMub2Zmc2V0U3RhcnQgKz0gZGV0YWlscy5zY3JvbGxTdGFydFxuICAgIH1cbiAgICBkZXRhaWxzLm9mZnNldEVuZCArPSBkZXRhaWxzLnNjcm9sbE1heFNpemUgLSBkZXRhaWxzLm9mZnNldFN0YXJ0XG4gIH1cblxuICByZXR1cm4gZGV0YWlsc1xufVxuXG5mdW5jdGlvbiBzZXRTY3JvbGwgKHBhcmVudCwgc2Nyb2xsLCBob3Jpem9udGFsLCBydGwpIHtcbiAgaWYgKHNjcm9sbCA9PT0gJ2VuZCcpIHtcbiAgICBzY3JvbGwgPSAocGFyZW50ID09PSB3aW5kb3cgPyBkb2N1bWVudC5ib2R5IDogcGFyZW50KVtcbiAgICAgIGhvcml6b250YWwgPT09IHRydWUgPyAnc2Nyb2xsV2lkdGgnIDogJ3Njcm9sbEhlaWdodCdcbiAgICBdXG4gIH1cblxuICBpZiAocGFyZW50ID09PSB3aW5kb3cpIHtcbiAgICBpZiAoaG9yaXpvbnRhbCA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKHJ0bCA9PT0gdHJ1ZSkge1xuICAgICAgICBzY3JvbGwgPSAocnRsSGFzU2Nyb2xsQnVnID09PSB0cnVlID8gZG9jdW1lbnQuYm9keS5zY3JvbGxXaWR0aCAtIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCA6IDApIC0gc2Nyb2xsXG4gICAgICB9XG4gICAgICB3aW5kb3cuc2Nyb2xsVG8oc2Nyb2xsLCB3aW5kb3cucGFnZVlPZmZzZXQgfHwgd2luZG93LnNjcm9sbFkgfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgfHwgMClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB3aW5kb3cuc2Nyb2xsVG8od2luZG93LnBhZ2VYT2Zmc2V0IHx8IHdpbmRvdy5zY3JvbGxYIHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdCB8fCAwLCBzY3JvbGwpXG4gICAgfVxuICB9XG4gIGVsc2UgaWYgKGhvcml6b250YWwgPT09IHRydWUpIHtcbiAgICBpZiAocnRsID09PSB0cnVlKSB7XG4gICAgICBzY3JvbGwgPSAocnRsSGFzU2Nyb2xsQnVnID09PSB0cnVlID8gcGFyZW50LnNjcm9sbFdpZHRoIC0gcGFyZW50Lm9mZnNldFdpZHRoIDogMCkgLSBzY3JvbGxcbiAgICB9XG4gICAgcGFyZW50LnNjcm9sbExlZnQgPSBzY3JvbGxcbiAgfVxuICBlbHNlIHtcbiAgICBwYXJlbnQuc2Nyb2xsVG9wID0gc2Nyb2xsXG4gIH1cbn1cblxuZnVuY3Rpb24gc3VtU2l6ZSAoc2l6ZUFnZywgc2l6ZSwgZnJvbSwgdG8pIHtcbiAgaWYgKGZyb20gPj0gdG8pIHsgcmV0dXJuIDAgfVxuXG4gIGNvbnN0XG4gICAgbGFzdFRvID0gc2l6ZS5sZW5ndGgsXG4gICAgZnJvbUFnZyA9IE1hdGguZmxvb3IoZnJvbSAvIGFnZ0J1Y2tldFNpemUpLFxuICAgIHRvQWdnID0gTWF0aC5mbG9vcigodG8gLSAxKSAvIGFnZ0J1Y2tldFNpemUpICsgMVxuXG4gIGxldCB0b3RhbCA9IHNpemVBZ2cuc2xpY2UoZnJvbUFnZywgdG9BZ2cpLnJlZHVjZShzdW1GbiwgMClcblxuICBpZiAoZnJvbSAlIGFnZ0J1Y2tldFNpemUgIT09IDApIHtcbiAgICB0b3RhbCAtPSBzaXplLnNsaWNlKGZyb21BZ2cgKiBhZ2dCdWNrZXRTaXplLCBmcm9tKS5yZWR1Y2Uoc3VtRm4sIDApXG4gIH1cbiAgaWYgKHRvICUgYWdnQnVja2V0U2l6ZSAhPT0gMCAmJiB0byAhPT0gbGFzdFRvKSB7XG4gICAgdG90YWwgLT0gc2l6ZS5zbGljZSh0bywgdG9BZ2cgKiBhZ2dCdWNrZXRTaXplKS5yZWR1Y2Uoc3VtRm4sIDApXG4gIH1cblxuICByZXR1cm4gdG90YWxcbn1cblxuY29uc3QgY29tbW9uVmlydFNjcm9sbFByb3BzID0ge1xuICB2aXJ0dWFsU2Nyb2xsU2xpY2VTaXplOiB7XG4gICAgdHlwZTogWyBOdW1iZXIsIFN0cmluZyBdLFxuICAgIGRlZmF1bHQ6IDEwXG4gIH0sXG5cbiAgdmlydHVhbFNjcm9sbFNsaWNlUmF0aW9CZWZvcmU6IHtcbiAgICB0eXBlOiBbIE51bWJlciwgU3RyaW5nIF0sXG4gICAgZGVmYXVsdDogMVxuICB9LFxuXG4gIHZpcnR1YWxTY3JvbGxTbGljZVJhdGlvQWZ0ZXI6IHtcbiAgICB0eXBlOiBbIE51bWJlciwgU3RyaW5nIF0sXG4gICAgZGVmYXVsdDogMVxuICB9LFxuXG4gIHZpcnR1YWxTY3JvbGxJdGVtU2l6ZToge1xuICAgIHR5cGU6IFsgTnVtYmVyLCBTdHJpbmcgXSxcbiAgICBkZWZhdWx0OiAyNFxuICB9LFxuXG4gIHZpcnR1YWxTY3JvbGxTdGlja3lTaXplU3RhcnQ6IHtcbiAgICB0eXBlOiBbIE51bWJlciwgU3RyaW5nIF0sXG4gICAgZGVmYXVsdDogMFxuICB9LFxuXG4gIHZpcnR1YWxTY3JvbGxTdGlja3lTaXplRW5kOiB7XG4gICAgdHlwZTogWyBOdW1iZXIsIFN0cmluZyBdLFxuICAgIGRlZmF1bHQ6IDBcbiAgfSxcblxuICB0YWJsZUNvbHNwYW46IFsgTnVtYmVyLCBTdHJpbmcgXVxufVxuXG5leHBvcnQgY29uc3QgY29tbW9uVmlydFNjcm9sbFByb3BzTGlzdCA9IE9iamVjdC5rZXlzKGNvbW1vblZpcnRTY3JvbGxQcm9wcylcblxuZXhwb3J0IGNvbnN0IHVzZVZpcnR1YWxTY3JvbGxQcm9wcyA9IHtcbiAgdmlydHVhbFNjcm9sbEhvcml6b250YWw6IEJvb2xlYW4sXG4gIG9uVmlydHVhbFNjcm9sbDogRnVuY3Rpb24sXG4gIC4uLmNvbW1vblZpcnRTY3JvbGxQcm9wc1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlVmlydHVhbFNjcm9sbCAoe1xuICB2aXJ0dWFsU2Nyb2xsTGVuZ3RoLCBnZXRWaXJ0dWFsU2Nyb2xsVGFyZ2V0LCBnZXRWaXJ0dWFsU2Nyb2xsRWwsXG4gIHZpcnR1YWxTY3JvbGxJdGVtU2l6ZUNvbXB1dGVkIC8vIG9wdGlvbmFsXG59KSB7XG4gIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICBjb25zdCB7IHByb3BzLCBlbWl0LCBwcm94eSB9ID0gdm1cbiAgY29uc3QgeyAkcSB9ID0gcHJveHlcblxuICBsZXQgcHJldlNjcm9sbFN0YXJ0LCBwcmV2VG9JbmRleCwgbG9jYWxTY3JvbGxWaWV3U2l6ZSwgdmlydHVhbFNjcm9sbFNpemVzQWdnID0gW10sIHZpcnR1YWxTY3JvbGxTaXplc1xuXG4gIGNvbnN0IHZpcnR1YWxTY3JvbGxQYWRkaW5nQmVmb3JlID0gcmVmKDApXG4gIGNvbnN0IHZpcnR1YWxTY3JvbGxQYWRkaW5nQWZ0ZXIgPSByZWYoMClcbiAgY29uc3QgdmlydHVhbFNjcm9sbFNsaWNlU2l6ZUNvbXB1dGVkID0gcmVmKHt9KVxuXG4gIGNvbnN0IGJlZm9yZVJlZiA9IHJlZihudWxsKVxuICBjb25zdCBhZnRlclJlZiA9IHJlZihudWxsKVxuICBjb25zdCBjb250ZW50UmVmID0gcmVmKG51bGwpXG5cbiAgY29uc3QgdmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UgPSByZWYoeyBmcm9tOiAwLCB0bzogMCB9KVxuXG4gIGNvbnN0IGNvbHNwYW5BdHRyID0gY29tcHV0ZWQoKCkgPT4gKHByb3BzLnRhYmxlQ29sc3BhbiAhPT0gdm9pZCAwID8gcHJvcHMudGFibGVDb2xzcGFuIDogMTAwKSlcblxuICBpZiAodmlydHVhbFNjcm9sbEl0ZW1TaXplQ29tcHV0ZWQgPT09IHZvaWQgMCkge1xuICAgIHZpcnR1YWxTY3JvbGxJdGVtU2l6ZUNvbXB1dGVkID0gY29tcHV0ZWQoKCkgPT4gcHJvcHMudmlydHVhbFNjcm9sbEl0ZW1TaXplKVxuICB9XG5cbiAgY29uc3QgbmVlZHNSZXNldCA9IGNvbXB1dGVkKCgpID0+IHZpcnR1YWxTY3JvbGxJdGVtU2l6ZUNvbXB1dGVkLnZhbHVlICsgJzsnICsgcHJvcHMudmlydHVhbFNjcm9sbEhvcml6b250YWwpXG5cbiAgY29uc3QgbmVlZHNTbGljZVJlY2FsYyA9IGNvbXB1dGVkKCgpID0+XG4gICAgbmVlZHNSZXNldC52YWx1ZSArICc7JyArIHByb3BzLnZpcnR1YWxTY3JvbGxTbGljZVJhdGlvQmVmb3JlICsgJzsnICsgcHJvcHMudmlydHVhbFNjcm9sbFNsaWNlUmF0aW9BZnRlclxuICApXG5cbiAgd2F0Y2gobmVlZHNTbGljZVJlY2FsYywgKCkgPT4geyBzZXRWaXJ0dWFsU2Nyb2xsU2l6ZSgpIH0pXG4gIHdhdGNoKG5lZWRzUmVzZXQsIHJlc2V0KVxuXG4gIGZ1bmN0aW9uIHJlc2V0ICgpIHtcbiAgICBsb2NhbFJlc2V0VmlydHVhbFNjcm9sbChwcmV2VG9JbmRleCwgdHJ1ZSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlZnJlc2ggKHRvSW5kZXgpIHtcbiAgICBsb2NhbFJlc2V0VmlydHVhbFNjcm9sbCh0b0luZGV4ID09PSB2b2lkIDAgPyBwcmV2VG9JbmRleCA6IHRvSW5kZXgpXG4gIH1cblxuICBmdW5jdGlvbiBzY3JvbGxUbyAodG9JbmRleCwgZWRnZSkge1xuICAgIGNvbnN0IHNjcm9sbEVsID0gZ2V0VmlydHVhbFNjcm9sbFRhcmdldCgpXG5cbiAgICBpZiAoXG4gICAgICBzY3JvbGxFbCA9PT0gdm9pZCAwXG4gICAgICB8fCBzY3JvbGxFbCA9PT0gbnVsbFxuICAgICAgfHwgc2Nyb2xsRWwubm9kZVR5cGUgPT09IDhcbiAgICApIHJldHVyblxuXG4gICAgY29uc3Qgc2Nyb2xsRGV0YWlscyA9IGdldFNjcm9sbERldGFpbHMoXG4gICAgICBzY3JvbGxFbCxcbiAgICAgIGdldFZpcnR1YWxTY3JvbGxFbCgpLFxuICAgICAgYmVmb3JlUmVmLnZhbHVlLFxuICAgICAgYWZ0ZXJSZWYudmFsdWUsXG4gICAgICBwcm9wcy52aXJ0dWFsU2Nyb2xsSG9yaXpvbnRhbCxcbiAgICAgICRxLmxhbmcucnRsLFxuICAgICAgcHJvcHMudmlydHVhbFNjcm9sbFN0aWNreVNpemVTdGFydCxcbiAgICAgIHByb3BzLnZpcnR1YWxTY3JvbGxTdGlja3lTaXplRW5kXG4gICAgKVxuXG4gICAgbG9jYWxTY3JvbGxWaWV3U2l6ZSAhPT0gc2Nyb2xsRGV0YWlscy5zY3JvbGxWaWV3U2l6ZSAmJiBzZXRWaXJ0dWFsU2Nyb2xsU2l6ZShzY3JvbGxEZXRhaWxzLnNjcm9sbFZpZXdTaXplKVxuXG4gICAgc2V0VmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UoXG4gICAgICBzY3JvbGxFbCxcbiAgICAgIHNjcm9sbERldGFpbHMsXG4gICAgICBNYXRoLm1pbih2aXJ0dWFsU2Nyb2xsTGVuZ3RoLnZhbHVlIC0gMSwgTWF0aC5tYXgoMCwgcGFyc2VJbnQodG9JbmRleCwgMTApIHx8IDApKSxcbiAgICAgIDAsXG4gICAgICBzY3JvbGxUb0VkZ2VzLmluZGV4T2YoZWRnZSkgIT09IC0xID8gZWRnZSA6IChwcmV2VG9JbmRleCAhPT0gLTEgJiYgdG9JbmRleCA+IHByZXZUb0luZGV4ID8gJ2VuZCcgOiAnc3RhcnQnKVxuICAgIClcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvY2FsT25WaXJ0dWFsU2Nyb2xsRXZ0ICgpIHtcbiAgICBjb25zdCBzY3JvbGxFbCA9IGdldFZpcnR1YWxTY3JvbGxUYXJnZXQoKVxuXG4gICAgaWYgKFxuICAgICAgc2Nyb2xsRWwgPT09IHZvaWQgMFxuICAgICAgfHwgc2Nyb2xsRWwgPT09IG51bGxcbiAgICAgIHx8IHNjcm9sbEVsLm5vZGVUeXBlID09PSA4XG4gICAgKSByZXR1cm5cblxuICAgIGNvbnN0XG4gICAgICBzY3JvbGxEZXRhaWxzID0gZ2V0U2Nyb2xsRGV0YWlscyhcbiAgICAgICAgc2Nyb2xsRWwsXG4gICAgICAgIGdldFZpcnR1YWxTY3JvbGxFbCgpLFxuICAgICAgICBiZWZvcmVSZWYudmFsdWUsXG4gICAgICAgIGFmdGVyUmVmLnZhbHVlLFxuICAgICAgICBwcm9wcy52aXJ0dWFsU2Nyb2xsSG9yaXpvbnRhbCxcbiAgICAgICAgJHEubGFuZy5ydGwsXG4gICAgICAgIHByb3BzLnZpcnR1YWxTY3JvbGxTdGlja3lTaXplU3RhcnQsXG4gICAgICAgIHByb3BzLnZpcnR1YWxTY3JvbGxTdGlja3lTaXplRW5kXG4gICAgICApLFxuICAgICAgbGlzdExhc3RJbmRleCA9IHZpcnR1YWxTY3JvbGxMZW5ndGgudmFsdWUgLSAxLFxuICAgICAgbGlzdEVuZE9mZnNldCA9IHNjcm9sbERldGFpbHMuc2Nyb2xsTWF4U2l6ZSAtIHNjcm9sbERldGFpbHMub2Zmc2V0U3RhcnQgLSBzY3JvbGxEZXRhaWxzLm9mZnNldEVuZCAtIHZpcnR1YWxTY3JvbGxQYWRkaW5nQWZ0ZXIudmFsdWVcblxuICAgIGlmIChwcmV2U2Nyb2xsU3RhcnQgPT09IHNjcm9sbERldGFpbHMuc2Nyb2xsU3RhcnQpIHJldHVyblxuXG4gICAgaWYgKHNjcm9sbERldGFpbHMuc2Nyb2xsTWF4U2l6ZSA8PSAwKSB7XG4gICAgICBzZXRWaXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZShzY3JvbGxFbCwgc2Nyb2xsRGV0YWlscywgMCwgMClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGxvY2FsU2Nyb2xsVmlld1NpemUgIT09IHNjcm9sbERldGFpbHMuc2Nyb2xsVmlld1NpemUgJiYgc2V0VmlydHVhbFNjcm9sbFNpemUoc2Nyb2xsRGV0YWlscy5zY3JvbGxWaWV3U2l6ZSlcblxuICAgIHVwZGF0ZVZpcnR1YWxTY3JvbGxTaXplcyh2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZS52YWx1ZS5mcm9tKVxuXG4gICAgY29uc3Qgc2Nyb2xsTWF4U3RhcnQgPSBNYXRoLmZsb29yKHNjcm9sbERldGFpbHMuc2Nyb2xsTWF4U2l6ZVxuICAgICAgLSBNYXRoLm1heChzY3JvbGxEZXRhaWxzLnNjcm9sbFZpZXdTaXplLCBzY3JvbGxEZXRhaWxzLm9mZnNldEVuZClcbiAgICAgIC0gTWF0aC5taW4odmlydHVhbFNjcm9sbFNpemVzWyBsaXN0TGFzdEluZGV4IF0sIHNjcm9sbERldGFpbHMuc2Nyb2xsVmlld1NpemUgLyAyKSlcblxuICAgIGlmIChzY3JvbGxNYXhTdGFydCA+IDAgJiYgTWF0aC5jZWlsKHNjcm9sbERldGFpbHMuc2Nyb2xsU3RhcnQpID49IHNjcm9sbE1heFN0YXJ0KSB7XG4gICAgICBzZXRWaXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZShcbiAgICAgICAgc2Nyb2xsRWwsXG4gICAgICAgIHNjcm9sbERldGFpbHMsXG4gICAgICAgIGxpc3RMYXN0SW5kZXgsXG4gICAgICAgIHNjcm9sbERldGFpbHMuc2Nyb2xsTWF4U2l6ZSAtIHNjcm9sbERldGFpbHMub2Zmc2V0RW5kIC0gdmlydHVhbFNjcm9sbFNpemVzQWdnLnJlZHVjZShzdW1GbiwgMClcbiAgICAgIClcblxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgbGV0XG4gICAgICB0b0luZGV4ID0gMCxcbiAgICAgIGxpc3RPZmZzZXQgPSBzY3JvbGxEZXRhaWxzLnNjcm9sbFN0YXJ0IC0gc2Nyb2xsRGV0YWlscy5vZmZzZXRTdGFydCxcbiAgICAgIG9mZnNldCA9IGxpc3RPZmZzZXRcblxuICAgIGlmIChsaXN0T2Zmc2V0IDw9IGxpc3RFbmRPZmZzZXQgJiYgbGlzdE9mZnNldCArIHNjcm9sbERldGFpbHMuc2Nyb2xsVmlld1NpemUgPj0gdmlydHVhbFNjcm9sbFBhZGRpbmdCZWZvcmUudmFsdWUpIHtcbiAgICAgIGxpc3RPZmZzZXQgLT0gdmlydHVhbFNjcm9sbFBhZGRpbmdCZWZvcmUudmFsdWVcbiAgICAgIHRvSW5kZXggPSB2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZS52YWx1ZS5mcm9tXG4gICAgICBvZmZzZXQgPSBsaXN0T2Zmc2V0XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGxpc3RPZmZzZXQgPj0gdmlydHVhbFNjcm9sbFNpemVzQWdnWyBqIF0gJiYgdG9JbmRleCA8IGxpc3RMYXN0SW5kZXg7IGorKykge1xuICAgICAgICBsaXN0T2Zmc2V0IC09IHZpcnR1YWxTY3JvbGxTaXplc0FnZ1sgaiBdXG4gICAgICAgIHRvSW5kZXggKz0gYWdnQnVja2V0U2l6ZVxuICAgICAgfVxuICAgIH1cblxuICAgIHdoaWxlIChsaXN0T2Zmc2V0ID4gMCAmJiB0b0luZGV4IDwgbGlzdExhc3RJbmRleCkge1xuICAgICAgbGlzdE9mZnNldCAtPSB2aXJ0dWFsU2Nyb2xsU2l6ZXNbIHRvSW5kZXggXVxuICAgICAgaWYgKGxpc3RPZmZzZXQgPiAtc2Nyb2xsRGV0YWlscy5zY3JvbGxWaWV3U2l6ZSkge1xuICAgICAgICB0b0luZGV4KytcbiAgICAgICAgb2Zmc2V0ID0gbGlzdE9mZnNldFxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIG9mZnNldCA9IHZpcnR1YWxTY3JvbGxTaXplc1sgdG9JbmRleCBdICsgbGlzdE9mZnNldFxuICAgICAgfVxuICAgIH1cblxuICAgIHNldFZpcnR1YWxTY3JvbGxTbGljZVJhbmdlKFxuICAgICAgc2Nyb2xsRWwsXG4gICAgICBzY3JvbGxEZXRhaWxzLFxuICAgICAgdG9JbmRleCxcbiAgICAgIG9mZnNldFxuICAgIClcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldFZpcnR1YWxTY3JvbGxTbGljZVJhbmdlIChzY3JvbGxFbCwgc2Nyb2xsRGV0YWlscywgdG9JbmRleCwgb2Zmc2V0LCBhbGlnbikge1xuICAgIGNvbnN0IGFsaWduRm9yY2UgPSB0eXBlb2YgYWxpZ24gPT09ICdzdHJpbmcnICYmIGFsaWduLmluZGV4T2YoJy1mb3JjZScpICE9PSAtMVxuICAgIGNvbnN0IGFsaWduRW5kID0gYWxpZ25Gb3JjZSA9PT0gdHJ1ZSA/IGFsaWduLnJlcGxhY2UoJy1mb3JjZScsICcnKSA6IGFsaWduXG4gICAgY29uc3QgYWxpZ25SYW5nZSA9IGFsaWduRW5kICE9PSB2b2lkIDAgPyBhbGlnbkVuZCA6ICdzdGFydCdcblxuICAgIGxldFxuICAgICAgZnJvbSA9IE1hdGgubWF4KDAsIHRvSW5kZXggLSB2aXJ0dWFsU2Nyb2xsU2xpY2VTaXplQ29tcHV0ZWQudmFsdWVbIGFsaWduUmFuZ2UgXSksXG4gICAgICB0byA9IGZyb20gKyB2aXJ0dWFsU2Nyb2xsU2xpY2VTaXplQ29tcHV0ZWQudmFsdWUudG90YWxcblxuICAgIGlmICh0byA+IHZpcnR1YWxTY3JvbGxMZW5ndGgudmFsdWUpIHtcbiAgICAgIHRvID0gdmlydHVhbFNjcm9sbExlbmd0aC52YWx1ZVxuICAgICAgZnJvbSA9IE1hdGgubWF4KDAsIHRvIC0gdmlydHVhbFNjcm9sbFNsaWNlU2l6ZUNvbXB1dGVkLnZhbHVlLnRvdGFsKVxuICAgIH1cblxuICAgIHByZXZTY3JvbGxTdGFydCA9IHNjcm9sbERldGFpbHMuc2Nyb2xsU3RhcnRcblxuICAgIGNvbnN0IHJhbmdlQ2hhbmdlZCA9IGZyb20gIT09IHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlLmZyb20gfHwgdG8gIT09IHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlLnRvXG5cbiAgICBpZiAocmFuZ2VDaGFuZ2VkID09PSBmYWxzZSAmJiBhbGlnbkVuZCA9PT0gdm9pZCAwKSB7XG4gICAgICBlbWl0U2Nyb2xsKHRvSW5kZXgpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCB7IGFjdGl2ZUVsZW1lbnQgfSA9IGRvY3VtZW50XG4gICAgY29uc3QgY29udGVudEVsID0gY29udGVudFJlZi52YWx1ZVxuICAgIGlmIChcbiAgICAgIHJhbmdlQ2hhbmdlZCA9PT0gdHJ1ZVxuICAgICAgJiYgY29udGVudEVsICE9PSBudWxsXG4gICAgICAmJiBjb250ZW50RWwgIT09IGFjdGl2ZUVsZW1lbnRcbiAgICAgICYmIGNvbnRlbnRFbC5jb250YWlucyhhY3RpdmVFbGVtZW50KSA9PT0gdHJ1ZVxuICAgICkge1xuICAgICAgY29udGVudEVsLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0Jywgb25CbHVyUmVmb2N1c0ZuKVxuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY29udGVudEVsPy5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIG9uQmx1clJlZm9jdXNGbilcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgc2V0T3ZlcmZsb3dBbmNob3IoY29udGVudEVsLCB0b0luZGV4IC0gZnJvbSlcblxuICAgIGNvbnN0IHNpemVCZWZvcmUgPSBhbGlnbkVuZCAhPT0gdm9pZCAwID8gdmlydHVhbFNjcm9sbFNpemVzLnNsaWNlKGZyb20sIHRvSW5kZXgpLnJlZHVjZShzdW1GbiwgMCkgOiAwXG5cbiAgICBpZiAocmFuZ2VDaGFuZ2VkID09PSB0cnVlKSB7XG4gICAgICAvLyB2dWUga2V5IG1hdGNoaW5nIGFsZ29yaXRobSB3b3JrcyBvbmx5IGlmXG4gICAgICAvLyB0aGUgYXJyYXkgb2YgVk5vZGVzIGNoYW5nZXMgb24gb25seSBvbmUgb2YgdGhlIGVuZHNcbiAgICAgIC8vIHNvIHdlIGZpcnN0IGNoYW5nZSBvbmUgZW5kIGFuZCB0aGVuIHRoZSBvdGhlclxuXG4gICAgICBjb25zdCB0ZW1wVG8gPSB0byA+PSB2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZS52YWx1ZS5mcm9tICYmIGZyb20gPD0gdmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UudmFsdWUudG9cbiAgICAgICAgPyB2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZS52YWx1ZS50b1xuICAgICAgICA6IHRvXG5cbiAgICAgIHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlID0geyBmcm9tLCB0bzogdGVtcFRvIH1cbiAgICAgIHZpcnR1YWxTY3JvbGxQYWRkaW5nQmVmb3JlLnZhbHVlID0gc3VtU2l6ZSh2aXJ0dWFsU2Nyb2xsU2l6ZXNBZ2csIHZpcnR1YWxTY3JvbGxTaXplcywgMCwgZnJvbSlcbiAgICAgIHZpcnR1YWxTY3JvbGxQYWRkaW5nQWZ0ZXIudmFsdWUgPSBzdW1TaXplKHZpcnR1YWxTY3JvbGxTaXplc0FnZywgdmlydHVhbFNjcm9sbFNpemVzLCB0bywgdmlydHVhbFNjcm9sbExlbmd0aC52YWx1ZSlcblxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgaWYgKHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlLnRvICE9PSB0byAmJiBwcmV2U2Nyb2xsU3RhcnQgPT09IHNjcm9sbERldGFpbHMuc2Nyb2xsU3RhcnQpIHtcbiAgICAgICAgICB2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZS52YWx1ZSA9IHsgZnJvbTogdmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UudmFsdWUuZnJvbSwgdG8gfVxuICAgICAgICAgIHZpcnR1YWxTY3JvbGxQYWRkaW5nQWZ0ZXIudmFsdWUgPSBzdW1TaXplKHZpcnR1YWxTY3JvbGxTaXplc0FnZywgdmlydHVhbFNjcm9sbFNpemVzLCB0bywgdmlydHVhbFNjcm9sbExlbmd0aC52YWx1ZSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgLy8gaWYgdGhlIHNjcm9sbCB3YXMgY2hhbmdlZCBnaXZlIHVwXG4gICAgICAvLyAoYW5vdGhlciBjYWxsIHRvIHNldFZpcnR1YWxTY3JvbGxTbGljZVJhbmdlIGJlZm9yZSBhbmltYXRpb24gZnJhbWUpXG4gICAgICBpZiAocHJldlNjcm9sbFN0YXJ0ICE9PSBzY3JvbGxEZXRhaWxzLnNjcm9sbFN0YXJ0KSByZXR1cm5cblxuICAgICAgaWYgKHJhbmdlQ2hhbmdlZCA9PT0gdHJ1ZSkge1xuICAgICAgICB1cGRhdGVWaXJ0dWFsU2Nyb2xsU2l6ZXMoZnJvbSlcbiAgICAgIH1cblxuICAgICAgY29uc3RcbiAgICAgICAgc2l6ZUFmdGVyID0gdmlydHVhbFNjcm9sbFNpemVzLnNsaWNlKGZyb20sIHRvSW5kZXgpLnJlZHVjZShzdW1GbiwgMCksXG4gICAgICAgIHBvc1N0YXJ0ID0gc2l6ZUFmdGVyICsgc2Nyb2xsRGV0YWlscy5vZmZzZXRTdGFydCArIHZpcnR1YWxTY3JvbGxQYWRkaW5nQmVmb3JlLnZhbHVlLFxuICAgICAgICBwb3NFbmQgPSBwb3NTdGFydCArIHZpcnR1YWxTY3JvbGxTaXplc1sgdG9JbmRleCBdXG5cbiAgICAgIGxldCBzY3JvbGxQb3NpdGlvbiA9IHBvc1N0YXJ0ICsgb2Zmc2V0XG5cbiAgICAgIGlmIChhbGlnbkVuZCAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGNvbnN0IHNpemVEaWZmID0gc2l6ZUFmdGVyIC0gc2l6ZUJlZm9yZVxuICAgICAgICBjb25zdCBzY3JvbGxTdGFydCA9IHNjcm9sbERldGFpbHMuc2Nyb2xsU3RhcnQgKyBzaXplRGlmZlxuXG4gICAgICAgIHNjcm9sbFBvc2l0aW9uID0gYWxpZ25Gb3JjZSAhPT0gdHJ1ZSAmJiBzY3JvbGxTdGFydCA8IHBvc1N0YXJ0ICYmIHBvc0VuZCA8IHNjcm9sbFN0YXJ0ICsgc2Nyb2xsRGV0YWlscy5zY3JvbGxWaWV3U2l6ZVxuICAgICAgICAgID8gc2Nyb2xsU3RhcnRcbiAgICAgICAgICA6IChcbiAgICAgICAgICAgICAgYWxpZ25FbmQgPT09ICdlbmQnXG4gICAgICAgICAgICAgICAgPyBwb3NFbmQgLSBzY3JvbGxEZXRhaWxzLnNjcm9sbFZpZXdTaXplXG4gICAgICAgICAgICAgICAgOiBwb3NTdGFydCAtIChhbGlnbkVuZCA9PT0gJ3N0YXJ0JyA/IDAgOiBNYXRoLnJvdW5kKChzY3JvbGxEZXRhaWxzLnNjcm9sbFZpZXdTaXplIC0gdmlydHVhbFNjcm9sbFNpemVzWyB0b0luZGV4IF0pIC8gMikpXG4gICAgICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIHByZXZTY3JvbGxTdGFydCA9IHNjcm9sbFBvc2l0aW9uXG5cbiAgICAgIHNldFNjcm9sbChcbiAgICAgICAgc2Nyb2xsRWwsXG4gICAgICAgIHNjcm9sbFBvc2l0aW9uLFxuICAgICAgICBwcm9wcy52aXJ0dWFsU2Nyb2xsSG9yaXpvbnRhbCxcbiAgICAgICAgJHEubGFuZy5ydGxcbiAgICAgIClcblxuICAgICAgZW1pdFNjcm9sbCh0b0luZGV4KVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVWaXJ0dWFsU2Nyb2xsU2l6ZXMgKGZyb20pIHtcbiAgICBjb25zdCBjb250ZW50RWwgPSBjb250ZW50UmVmLnZhbHVlXG5cbiAgICBpZiAoY29udGVudEVsKSB7XG4gICAgICBjb25zdFxuICAgICAgICBjaGlsZHJlbiA9IGZpbHRlclByb3RvLmNhbGwoXG4gICAgICAgICAgY29udGVudEVsLmNoaWxkcmVuLFxuICAgICAgICAgIGVsID0+IGVsLmNsYXNzTGlzdCAmJiBlbC5jbGFzc0xpc3QuY29udGFpbnMoJ3EtdmlydHVhbC1zY3JvbGwtLXNraXAnKSA9PT0gZmFsc2VcbiAgICAgICAgKSxcbiAgICAgICAgY2hpbGRyZW5MZW5ndGggPSBjaGlsZHJlbi5sZW5ndGgsXG4gICAgICAgIHNpemVGbiA9IHByb3BzLnZpcnR1YWxTY3JvbGxIb3Jpem9udGFsID09PSB0cnVlXG4gICAgICAgICAgPyBlbCA9PiBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aFxuICAgICAgICAgIDogZWwgPT4gZWwub2Zmc2V0SGVpZ2h0XG5cbiAgICAgIGxldFxuICAgICAgICBpbmRleCA9IGZyb20sXG4gICAgICAgIHNpemUsIGRpZmZcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbkxlbmd0aDspIHtcbiAgICAgICAgc2l6ZSA9IHNpemVGbihjaGlsZHJlblsgaSBdKVxuICAgICAgICBpKytcblxuICAgICAgICB3aGlsZSAoaSA8IGNoaWxkcmVuTGVuZ3RoICYmIGNoaWxkcmVuWyBpIF0uY2xhc3NMaXN0LmNvbnRhaW5zKCdxLXZpcnR1YWwtc2Nyb2xsLS13aXRoLXByZXYnKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHNpemUgKz0gc2l6ZUZuKGNoaWxkcmVuWyBpIF0pXG4gICAgICAgICAgaSsrXG4gICAgICAgIH1cblxuICAgICAgICBkaWZmID0gc2l6ZSAtIHZpcnR1YWxTY3JvbGxTaXplc1sgaW5kZXggXVxuXG4gICAgICAgIGlmIChkaWZmICE9PSAwKSB7XG4gICAgICAgICAgdmlydHVhbFNjcm9sbFNpemVzWyBpbmRleCBdICs9IGRpZmZcbiAgICAgICAgICB2aXJ0dWFsU2Nyb2xsU2l6ZXNBZ2dbIE1hdGguZmxvb3IoaW5kZXggLyBhZ2dCdWNrZXRTaXplKSBdICs9IGRpZmZcbiAgICAgICAgfVxuXG4gICAgICAgIGluZGV4KytcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbkJsdXJSZWZvY3VzRm4gKCkge1xuICAgIGNvbnRlbnRSZWYudmFsdWU/LmZvY3VzKClcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvY2FsUmVzZXRWaXJ0dWFsU2Nyb2xsICh0b0luZGV4LCBmdWxsUmVzZXQpIHtcbiAgICBjb25zdCBkZWZhdWx0U2l6ZSA9IDEgKiB2aXJ0dWFsU2Nyb2xsSXRlbVNpemVDb21wdXRlZC52YWx1ZVxuXG4gICAgaWYgKGZ1bGxSZXNldCA9PT0gdHJ1ZSB8fCBBcnJheS5pc0FycmF5KHZpcnR1YWxTY3JvbGxTaXplcykgPT09IGZhbHNlKSB7XG4gICAgICB2aXJ0dWFsU2Nyb2xsU2l6ZXMgPSBbXVxuICAgIH1cblxuICAgIGNvbnN0IG9sZFZpcnR1YWxTY3JvbGxTaXplc0xlbmd0aCA9IHZpcnR1YWxTY3JvbGxTaXplcy5sZW5ndGhcblxuICAgIHZpcnR1YWxTY3JvbGxTaXplcy5sZW5ndGggPSB2aXJ0dWFsU2Nyb2xsTGVuZ3RoLnZhbHVlXG5cbiAgICBmb3IgKGxldCBpID0gdmlydHVhbFNjcm9sbExlbmd0aC52YWx1ZSAtIDE7IGkgPj0gb2xkVmlydHVhbFNjcm9sbFNpemVzTGVuZ3RoOyBpLS0pIHtcbiAgICAgIHZpcnR1YWxTY3JvbGxTaXplc1sgaSBdID0gZGVmYXVsdFNpemVcbiAgICB9XG5cbiAgICBjb25zdCBqTWF4ID0gTWF0aC5mbG9vcigodmlydHVhbFNjcm9sbExlbmd0aC52YWx1ZSAtIDEpIC8gYWdnQnVja2V0U2l6ZSlcbiAgICB2aXJ0dWFsU2Nyb2xsU2l6ZXNBZ2cgPSBbXVxuICAgIGZvciAobGV0IGogPSAwOyBqIDw9IGpNYXg7IGorKykge1xuICAgICAgbGV0IHNpemUgPSAwXG4gICAgICBjb25zdCBpTWF4ID0gTWF0aC5taW4oKGogKyAxKSAqIGFnZ0J1Y2tldFNpemUsIHZpcnR1YWxTY3JvbGxMZW5ndGgudmFsdWUpXG4gICAgICBmb3IgKGxldCBpID0gaiAqIGFnZ0J1Y2tldFNpemU7IGkgPCBpTWF4OyBpKyspIHtcbiAgICAgICAgc2l6ZSArPSB2aXJ0dWFsU2Nyb2xsU2l6ZXNbIGkgXVxuICAgICAgfVxuICAgICAgdmlydHVhbFNjcm9sbFNpemVzQWdnLnB1c2goc2l6ZSlcbiAgICB9XG5cbiAgICBwcmV2VG9JbmRleCA9IC0xXG4gICAgcHJldlNjcm9sbFN0YXJ0ID0gdm9pZCAwXG5cbiAgICB2aXJ0dWFsU2Nyb2xsUGFkZGluZ0JlZm9yZS52YWx1ZSA9IHN1bVNpemUodmlydHVhbFNjcm9sbFNpemVzQWdnLCB2aXJ0dWFsU2Nyb2xsU2l6ZXMsIDAsIHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlLmZyb20pXG4gICAgdmlydHVhbFNjcm9sbFBhZGRpbmdBZnRlci52YWx1ZSA9IHN1bVNpemUodmlydHVhbFNjcm9sbFNpemVzQWdnLCB2aXJ0dWFsU2Nyb2xsU2l6ZXMsIHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlLnRvLCB2aXJ0dWFsU2Nyb2xsTGVuZ3RoLnZhbHVlKVxuXG4gICAgaWYgKHRvSW5kZXggPj0gMCkge1xuICAgICAgdXBkYXRlVmlydHVhbFNjcm9sbFNpemVzKHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlLmZyb20pXG4gICAgICBuZXh0VGljaygoKSA9PiB7IHNjcm9sbFRvKHRvSW5kZXgpIH0pXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgb25WaXJ0dWFsU2Nyb2xsRXZ0KClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzZXRWaXJ0dWFsU2Nyb2xsU2l6ZSAoc2Nyb2xsVmlld1NpemUpIHtcbiAgICBpZiAoc2Nyb2xsVmlld1NpemUgPT09IHZvaWQgMCAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc3Qgc2Nyb2xsRWwgPSBnZXRWaXJ0dWFsU2Nyb2xsVGFyZ2V0KClcblxuICAgICAgaWYgKHNjcm9sbEVsICE9PSB2b2lkIDAgJiYgc2Nyb2xsRWwgIT09IG51bGwgJiYgc2Nyb2xsRWwubm9kZVR5cGUgIT09IDgpIHtcbiAgICAgICAgc2Nyb2xsVmlld1NpemUgPSBnZXRTY3JvbGxEZXRhaWxzKFxuICAgICAgICAgIHNjcm9sbEVsLFxuICAgICAgICAgIGdldFZpcnR1YWxTY3JvbGxFbCgpLFxuICAgICAgICAgIGJlZm9yZVJlZi52YWx1ZSxcbiAgICAgICAgICBhZnRlclJlZi52YWx1ZSxcbiAgICAgICAgICBwcm9wcy52aXJ0dWFsU2Nyb2xsSG9yaXpvbnRhbCxcbiAgICAgICAgICAkcS5sYW5nLnJ0bCxcbiAgICAgICAgICBwcm9wcy52aXJ0dWFsU2Nyb2xsU3RpY2t5U2l6ZVN0YXJ0LFxuICAgICAgICAgIHByb3BzLnZpcnR1YWxTY3JvbGxTdGlja3lTaXplRW5kXG4gICAgICAgICkuc2Nyb2xsVmlld1NpemVcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsb2NhbFNjcm9sbFZpZXdTaXplID0gc2Nyb2xsVmlld1NpemVcblxuICAgIGNvbnN0IHZpcnR1YWxTY3JvbGxTbGljZVJhdGlvQmVmb3JlID0gcGFyc2VGbG9hdChwcm9wcy52aXJ0dWFsU2Nyb2xsU2xpY2VSYXRpb0JlZm9yZSkgfHwgMFxuICAgIGNvbnN0IHZpcnR1YWxTY3JvbGxTbGljZVJhdGlvQWZ0ZXIgPSBwYXJzZUZsb2F0KHByb3BzLnZpcnR1YWxTY3JvbGxTbGljZVJhdGlvQWZ0ZXIpIHx8IDBcbiAgICBjb25zdCBtdWx0aXBsaWVyID0gMSArIHZpcnR1YWxTY3JvbGxTbGljZVJhdGlvQmVmb3JlICsgdmlydHVhbFNjcm9sbFNsaWNlUmF0aW9BZnRlclxuICAgIGNvbnN0IHZpZXcgPSBzY3JvbGxWaWV3U2l6ZSA9PT0gdm9pZCAwIHx8IHNjcm9sbFZpZXdTaXplIDw9IDBcbiAgICAgID8gMVxuICAgICAgOiBNYXRoLmNlaWwoc2Nyb2xsVmlld1NpemUgLyB2aXJ0dWFsU2Nyb2xsSXRlbVNpemVDb21wdXRlZC52YWx1ZSlcblxuICAgIGNvbnN0IGJhc2VTaXplID0gTWF0aC5tYXgoXG4gICAgICAxLFxuICAgICAgdmlldyxcbiAgICAgIE1hdGguY2VpbCgocHJvcHMudmlydHVhbFNjcm9sbFNsaWNlU2l6ZSA+IDAgPyBwcm9wcy52aXJ0dWFsU2Nyb2xsU2xpY2VTaXplIDogMTApIC8gbXVsdGlwbGllcilcbiAgICApXG5cbiAgICB2aXJ0dWFsU2Nyb2xsU2xpY2VTaXplQ29tcHV0ZWQudmFsdWUgPSB7XG4gICAgICB0b3RhbDogTWF0aC5jZWlsKGJhc2VTaXplICogbXVsdGlwbGllciksXG4gICAgICBzdGFydDogTWF0aC5jZWlsKGJhc2VTaXplICogdmlydHVhbFNjcm9sbFNsaWNlUmF0aW9CZWZvcmUpLFxuICAgICAgY2VudGVyOiBNYXRoLmNlaWwoYmFzZVNpemUgKiAoMC41ICsgdmlydHVhbFNjcm9sbFNsaWNlUmF0aW9CZWZvcmUpKSxcbiAgICAgIGVuZDogTWF0aC5jZWlsKGJhc2VTaXplICogKDEgKyB2aXJ0dWFsU2Nyb2xsU2xpY2VSYXRpb0JlZm9yZSkpLFxuICAgICAgdmlld1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBhZFZpcnR1YWxTY3JvbGwgKHRhZywgY29udGVudCkge1xuICAgIGNvbnN0IHBhZGRpbmdTaXplID0gcHJvcHMudmlydHVhbFNjcm9sbEhvcml6b250YWwgPT09IHRydWUgPyAnd2lkdGgnIDogJ2hlaWdodCdcbiAgICBjb25zdCBzdHlsZSA9IHtcbiAgICAgIFsgJy0tcS12aXJ0dWFsLXNjcm9sbC1pdGVtLScgKyBwYWRkaW5nU2l6ZSBdOiB2aXJ0dWFsU2Nyb2xsSXRlbVNpemVDb21wdXRlZC52YWx1ZSArICdweCdcbiAgICB9XG5cbiAgICByZXR1cm4gW1xuICAgICAgdGFnID09PSAndGJvZHknXG4gICAgICAgID8gaCh0YWcsIHtcbiAgICAgICAgICBjbGFzczogJ3EtdmlydHVhbC1zY3JvbGxfX3BhZGRpbmcnLFxuICAgICAgICAgIGtleTogJ2JlZm9yZScsXG4gICAgICAgICAgcmVmOiBiZWZvcmVSZWZcbiAgICAgICAgfSwgW1xuICAgICAgICAgIGgoJ3RyJywgW1xuICAgICAgICAgICAgaCgndGQnLCB7XG4gICAgICAgICAgICAgIHN0eWxlOiB7IFsgcGFkZGluZ1NpemUgXTogYCR7IHZpcnR1YWxTY3JvbGxQYWRkaW5nQmVmb3JlLnZhbHVlIH1weGAsIC4uLnN0eWxlIH0sXG4gICAgICAgICAgICAgIGNvbHNwYW46IGNvbHNwYW5BdHRyLnZhbHVlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF0pXG4gICAgICAgIF0pXG4gICAgICAgIDogaCh0YWcsIHtcbiAgICAgICAgICBjbGFzczogJ3EtdmlydHVhbC1zY3JvbGxfX3BhZGRpbmcnLFxuICAgICAgICAgIGtleTogJ2JlZm9yZScsXG4gICAgICAgICAgcmVmOiBiZWZvcmVSZWYsXG4gICAgICAgICAgc3R5bGU6IHsgWyBwYWRkaW5nU2l6ZSBdOiBgJHsgdmlydHVhbFNjcm9sbFBhZGRpbmdCZWZvcmUudmFsdWUgfXB4YCwgLi4uc3R5bGUgfVxuICAgICAgICB9KSxcblxuICAgICAgaCh0YWcsIHtcbiAgICAgICAgY2xhc3M6ICdxLXZpcnR1YWwtc2Nyb2xsX19jb250ZW50JyxcbiAgICAgICAga2V5OiAnY29udGVudCcsXG4gICAgICAgIHJlZjogY29udGVudFJlZixcbiAgICAgICAgdGFiaW5kZXg6IC0xXG4gICAgICB9LCBjb250ZW50LmZsYXQoKSksXG5cbiAgICAgIHRhZyA9PT0gJ3Rib2R5J1xuICAgICAgICA/IGgodGFnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLXZpcnR1YWwtc2Nyb2xsX19wYWRkaW5nJyxcbiAgICAgICAgICBrZXk6ICdhZnRlcicsXG4gICAgICAgICAgcmVmOiBhZnRlclJlZlxuICAgICAgICB9LCBbXG4gICAgICAgICAgaCgndHInLCBbXG4gICAgICAgICAgICBoKCd0ZCcsIHtcbiAgICAgICAgICAgICAgc3R5bGU6IHsgWyBwYWRkaW5nU2l6ZSBdOiBgJHsgdmlydHVhbFNjcm9sbFBhZGRpbmdBZnRlci52YWx1ZSB9cHhgLCAuLi5zdHlsZSB9LFxuICAgICAgICAgICAgICBjb2xzcGFuOiBjb2xzcGFuQXR0ci52YWx1ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdKVxuICAgICAgICBdKVxuICAgICAgICA6IGgodGFnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLXZpcnR1YWwtc2Nyb2xsX19wYWRkaW5nJyxcbiAgICAgICAgICBrZXk6ICdhZnRlcicsXG4gICAgICAgICAgcmVmOiBhZnRlclJlZixcbiAgICAgICAgICBzdHlsZTogeyBbIHBhZGRpbmdTaXplIF06IGAkeyB2aXJ0dWFsU2Nyb2xsUGFkZGluZ0FmdGVyLnZhbHVlIH1weGAsIC4uLnN0eWxlIH1cbiAgICAgICAgfSlcbiAgICBdXG4gIH1cblxuICBmdW5jdGlvbiBlbWl0U2Nyb2xsIChpbmRleCkge1xuICAgIGlmIChwcmV2VG9JbmRleCAhPT0gaW5kZXgpIHtcbiAgICAgIHByb3BzLm9uVmlydHVhbFNjcm9sbCAhPT0gdm9pZCAwICYmIGVtaXQoJ3ZpcnR1YWxTY3JvbGwnLCB7XG4gICAgICAgIGluZGV4LFxuICAgICAgICBmcm9tOiB2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZS52YWx1ZS5mcm9tLFxuICAgICAgICB0bzogdmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UudmFsdWUudG8gLSAxLFxuICAgICAgICBkaXJlY3Rpb246IGluZGV4IDwgcHJldlRvSW5kZXggPyAnZGVjcmVhc2UnIDogJ2luY3JlYXNlJyxcbiAgICAgICAgcmVmOiBwcm94eVxuICAgICAgfSlcblxuICAgICAgcHJldlRvSW5kZXggPSBpbmRleFxuICAgIH1cbiAgfVxuXG4gIHNldFZpcnR1YWxTY3JvbGxTaXplKClcbiAgY29uc3Qgb25WaXJ0dWFsU2Nyb2xsRXZ0ID0gZGVib3VuY2UoXG4gICAgbG9jYWxPblZpcnR1YWxTY3JvbGxFdnQsXG4gICAgJHEucGxhdGZvcm0uaXMuaW9zID09PSB0cnVlID8gMTIwIDogMzVcbiAgKVxuXG4gIG9uQmVmb3JlTW91bnQoKCkgPT4ge1xuICAgIHNldFZpcnR1YWxTY3JvbGxTaXplKClcbiAgfSlcblxuICBsZXQgc2hvdWxkQWN0aXZhdGUgPSBmYWxzZVxuXG4gIG9uRGVhY3RpdmF0ZWQoKCkgPT4ge1xuICAgIHNob3VsZEFjdGl2YXRlID0gdHJ1ZVxuICB9KVxuXG4gIG9uQWN0aXZhdGVkKCgpID0+IHtcbiAgICBpZiAoc2hvdWxkQWN0aXZhdGUgIT09IHRydWUpIHJldHVyblxuXG4gICAgY29uc3Qgc2Nyb2xsRWwgPSBnZXRWaXJ0dWFsU2Nyb2xsVGFyZ2V0KClcblxuICAgIGlmIChwcmV2U2Nyb2xsU3RhcnQgIT09IHZvaWQgMCAmJiBzY3JvbGxFbCAhPT0gdm9pZCAwICYmIHNjcm9sbEVsICE9PSBudWxsICYmIHNjcm9sbEVsLm5vZGVUeXBlICE9PSA4KSB7XG4gICAgICBzZXRTY3JvbGwoXG4gICAgICAgIHNjcm9sbEVsLFxuICAgICAgICBwcmV2U2Nyb2xsU3RhcnQsXG4gICAgICAgIHByb3BzLnZpcnR1YWxTY3JvbGxIb3Jpem9udGFsLFxuICAgICAgICAkcS5sYW5nLnJ0bFxuICAgICAgKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHNjcm9sbFRvKHByZXZUb0luZGV4KVxuICAgIH1cbiAgfSlcblxuICBfX1FVQVNBUl9TU1JfXyB8fCBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgIG9uVmlydHVhbFNjcm9sbEV2dC5jYW5jZWwoKVxuICB9KVxuXG4gIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kc1xuICBPYmplY3QuYXNzaWduKHByb3h5LCB7IHNjcm9sbFRvLCByZXNldCwgcmVmcmVzaCB9KVxuXG4gIHJldHVybiB7XG4gICAgdmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UsXG4gICAgdmlydHVhbFNjcm9sbFNsaWNlU2l6ZUNvbXB1dGVkLFxuXG4gICAgc2V0VmlydHVhbFNjcm9sbFNpemUsXG4gICAgb25WaXJ0dWFsU2Nyb2xsRXZ0LFxuICAgIGxvY2FsUmVzZXRWaXJ0dWFsU2Nyb2xsLFxuICAgIHBhZFZpcnR1YWxTY3JvbGwsXG5cbiAgICBzY3JvbGxUbyxcbiAgICByZXNldCxcbiAgICByZWZyZXNoXG4gIH1cbn1cbiIsImltcG9ydCB7IGNsaWVudCB9IGZyb20gJy4uLy4uL3BsdWdpbnMvcGxhdGZvcm0vUGxhdGZvcm0uanMnXG5cbmNvbnN0IGlzSmFwYW5lc2UgPSAvW1xcdTMwMDAtXFx1MzAzZlxcdTMwNDAtXFx1MzA5ZlxcdTMwYTAtXFx1MzBmZlxcdWZmMDAtXFx1ZmY5ZlxcdTRlMDAtXFx1OWZhZlxcdTM0MDAtXFx1NGRiZl0vXG5jb25zdCBpc0NoaW5lc2UgPSAvW1xcdTRlMDAtXFx1OWZmZlxcdTM0MDAtXFx1NGRiZlxcdXsyMDAwMH0tXFx1ezJhNmRmfVxcdXsyYTcwMH0tXFx1ezJiNzNmfVxcdXsyYjc0MH0tXFx1ezJiODFmfVxcdXsyYjgyMH0tXFx1ezJjZWFmfVxcdWY5MDAtXFx1ZmFmZlxcdTMzMDAtXFx1MzNmZlxcdWZlMzAtXFx1ZmU0ZlxcdWY5MDAtXFx1ZmFmZlxcdXsyZjgwMH0tXFx1ezJmYTFmfV0vdVxuY29uc3QgaXNLb3JlYW4gPSAvW1xcdTMxMzEtXFx1MzE0ZVxcdTMxNGYtXFx1MzE2M1xcdWFjMDAtXFx1ZDdhM10vXG5jb25zdCBpc1BsYWluVGV4dCA9IC9bYS16MC05XyAtXSQvaVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAob25JbnB1dCkge1xuICByZXR1cm4gZnVuY3Rpb24gb25Db21wb3NpdGlvbiAoZSkge1xuICAgIGlmIChlLnR5cGUgPT09ICdjb21wb3NpdGlvbmVuZCcgfHwgZS50eXBlID09PSAnY2hhbmdlJykge1xuICAgICAgaWYgKGUudGFyZ2V0LnFDb21wb3NpbmcgIT09IHRydWUpIHJldHVyblxuICAgICAgZS50YXJnZXQucUNvbXBvc2luZyA9IGZhbHNlXG4gICAgICBvbklucHV0KGUpXG4gICAgfVxuICAgIGVsc2UgaWYgKFxuICAgICAgZS50eXBlID09PSAnY29tcG9zaXRpb251cGRhdGUnXG4gICAgICAmJiBlLnRhcmdldC5xQ29tcG9zaW5nICE9PSB0cnVlXG4gICAgICAmJiB0eXBlb2YgZS5kYXRhID09PSAnc3RyaW5nJ1xuICAgICkge1xuICAgICAgY29uc3QgaXNDb21wb3NpbmcgPSBjbGllbnQuaXMuZmlyZWZveCA9PT0gdHJ1ZVxuICAgICAgICA/IGlzUGxhaW5UZXh0LnRlc3QoZS5kYXRhKSA9PT0gZmFsc2VcbiAgICAgICAgOiBpc0phcGFuZXNlLnRlc3QoZS5kYXRhKSA9PT0gdHJ1ZSB8fCBpc0NoaW5lc2UudGVzdChlLmRhdGEpID09PSB0cnVlIHx8IGlzS29yZWFuLnRlc3QoZS5kYXRhKSA9PT0gdHJ1ZVxuXG4gICAgICBpZiAoaXNDb21wb3NpbmcgPT09IHRydWUpIHtcbiAgICAgICAgZS50YXJnZXQucUNvbXBvc2luZyA9IHRydWVcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIHdhdGNoLCBvbkJlZm9yZVVwZGF0ZSwgb25VcGRhdGVkLCBvbkJlZm9yZVVubW91bnQsIG5leHRUaWNrLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRRmllbGQgZnJvbSAnLi4vZmllbGQvUUZpZWxkLmpzJ1xuaW1wb3J0IFFJY29uIGZyb20gJy4uL2ljb24vUUljb24uanMnXG5pbXBvcnQgUUNoaXAgZnJvbSAnLi4vY2hpcC9RQ2hpcC5qcydcblxuaW1wb3J0IFFJdGVtIGZyb20gJy4uL2l0ZW0vUUl0ZW0uanMnXG5pbXBvcnQgUUl0ZW1TZWN0aW9uIGZyb20gJy4uL2l0ZW0vUUl0ZW1TZWN0aW9uLmpzJ1xuaW1wb3J0IFFJdGVtTGFiZWwgZnJvbSAnLi4vaXRlbS9RSXRlbUxhYmVsLmpzJ1xuXG5pbXBvcnQgUU1lbnUgZnJvbSAnLi4vbWVudS9RTWVudS5qcydcbmltcG9ydCBRRGlhbG9nIGZyb20gJy4uL2RpYWxvZy9RRGlhbG9nLmpzJ1xuXG5pbXBvcnQgdXNlRmllbGQsIHsgdXNlRmllbGRTdGF0ZSwgdXNlRmllbGRQcm9wcywgdXNlRmllbGRFbWl0cywgZmllbGRWYWx1ZUlzRmlsbGVkIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtZmllbGQvdXNlLWZpZWxkLmpzJ1xuaW1wb3J0IHsgdXNlVmlydHVhbFNjcm9sbCwgdXNlVmlydHVhbFNjcm9sbFByb3BzIH0gZnJvbSAnLi4vdmlydHVhbC1zY3JvbGwvdXNlLXZpcnR1YWwtc2Nyb2xsLmpzJ1xuaW1wb3J0IHsgdXNlRm9ybVByb3BzLCB1c2VGb3JtSW5wdXROYW1lQXR0ciB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3VzZS1mb3JtL3ByaXZhdGUudXNlLWZvcm0uanMnXG5pbXBvcnQgdXNlS2V5Q29tcG9zaXRpb24gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2Uta2V5LWNvbXBvc2l0aW9uL3VzZS1rZXktY29tcG9zaXRpb24uanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGlzRGVlcEVxdWFsIH0gZnJvbSAnLi4vLi4vdXRpbHMvaXMvaXMuanMnXG5pbXBvcnQgeyBzdG9wLCBwcmV2ZW50LCBzdG9wQW5kUHJldmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50L2V2ZW50LmpzJ1xuaW1wb3J0IHsgbm9ybWFsaXplVG9JbnRlcnZhbCB9IGZyb20gJy4uLy4uL3V0aWxzL2Zvcm1hdC9mb3JtYXQuanMnXG5pbXBvcnQgeyBzaG91bGRJZ25vcmVLZXksIGlzS2V5Q29kZSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUua2V5Ym9hcmQva2V5LWNvbXBvc2l0aW9uLmpzJ1xuaW1wb3J0IHsgaE1lcmdlU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcblxuY29uc3QgdmFsaWRhdGVOZXdWYWx1ZU1vZGUgPSB2ID0+IFsgJ2FkZCcsICdhZGQtdW5pcXVlJywgJ3RvZ2dsZScgXS5pbmNsdWRlcyh2KVxuY29uc3QgcmVFc2NhcGVMaXN0ID0gJy4qKz9eJHt9KCl8W11cXFxcJ1xuY29uc3QgZmllbGRQcm9wc0xpc3QgPSBPYmplY3Qua2V5cyh1c2VGaWVsZFByb3BzKVxuXG5mdW5jdGlvbiBnZXRQcm9wVmFsdWVGbiAodXNlclByb3BOYW1lLCBkZWZhdWx0UHJvcE5hbWUpIHtcbiAgaWYgKHR5cGVvZiB1c2VyUHJvcE5hbWUgPT09ICdmdW5jdGlvbicpIHJldHVybiB1c2VyUHJvcE5hbWVcblxuICBjb25zdCBwcm9wTmFtZSA9IHVzZXJQcm9wTmFtZSAhPT0gdm9pZCAwXG4gICAgPyB1c2VyUHJvcE5hbWVcbiAgICA6IGRlZmF1bHRQcm9wTmFtZVxuXG4gIHJldHVybiBvcHQgPT4gKChvcHQgIT09IG51bGwgJiYgdHlwZW9mIG9wdCA9PT0gJ29iamVjdCcgJiYgcHJvcE5hbWUgaW4gb3B0KSA/IG9wdFsgcHJvcE5hbWUgXSA6IG9wdClcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FTZWxlY3QnLFxuXG4gIGluaGVyaXRBdHRyczogZmFsc2UsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VWaXJ0dWFsU2Nyb2xsUHJvcHMsXG4gICAgLi4udXNlRm9ybVByb3BzLFxuICAgIC4uLnVzZUZpZWxkUHJvcHMsXG5cbiAgICAvLyBvdmVycmlkZSBvZiB1c2VGaWVsZFByb3BzID4gbW9kZWxWYWx1ZVxuICAgIG1vZGVsVmFsdWU6IHtcbiAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgfSxcblxuICAgIG11bHRpcGxlOiBCb29sZWFuLFxuXG4gICAgZGlzcGxheVZhbHVlOiBbIFN0cmluZywgTnVtYmVyIF0sXG4gICAgZGlzcGxheVZhbHVlSHRtbDogQm9vbGVhbixcbiAgICBkcm9wZG93bkljb246IFN0cmluZyxcblxuICAgIG9wdGlvbnM6IHtcbiAgICAgIHR5cGU6IEFycmF5LFxuICAgICAgZGVmYXVsdDogKCkgPT4gW11cbiAgICB9LFxuXG4gICAgb3B0aW9uVmFsdWU6IFsgRnVuY3Rpb24sIFN0cmluZyBdLFxuICAgIG9wdGlvbkxhYmVsOiBbIEZ1bmN0aW9uLCBTdHJpbmcgXSxcbiAgICBvcHRpb25EaXNhYmxlOiBbIEZ1bmN0aW9uLCBTdHJpbmcgXSxcblxuICAgIGhpZGVTZWxlY3RlZDogQm9vbGVhbixcbiAgICBoaWRlRHJvcGRvd25JY29uOiBCb29sZWFuLFxuICAgIGZpbGxJbnB1dDogQm9vbGVhbixcblxuICAgIG1heFZhbHVlczogWyBOdW1iZXIsIFN0cmluZyBdLFxuXG4gICAgb3B0aW9uc0RlbnNlOiBCb29sZWFuLFxuICAgIG9wdGlvbnNEYXJrOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH0sXG4gICAgb3B0aW9uc1NlbGVjdGVkQ2xhc3M6IFN0cmluZyxcbiAgICBvcHRpb25zSHRtbDogQm9vbGVhbixcblxuICAgIG9wdGlvbnNDb3ZlcjogQm9vbGVhbixcblxuICAgIG1lbnVTaHJpbms6IEJvb2xlYW4sXG4gICAgbWVudUFuY2hvcjogU3RyaW5nLFxuICAgIG1lbnVTZWxmOiBTdHJpbmcsXG4gICAgbWVudU9mZnNldDogQXJyYXksXG5cbiAgICBwb3B1cENvbnRlbnRDbGFzczogU3RyaW5nLFxuICAgIHBvcHVwQ29udGVudFN0eWxlOiBbIFN0cmluZywgQXJyYXksIE9iamVjdCBdLFxuICAgIHBvcHVwTm9Sb3V0ZURpc21pc3M6IEJvb2xlYW4sXG5cbiAgICB1c2VJbnB1dDogQm9vbGVhbixcbiAgICB1c2VDaGlwczogQm9vbGVhbixcblxuICAgIG5ld1ZhbHVlTW9kZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0ZU5ld1ZhbHVlTW9kZVxuICAgIH0sXG5cbiAgICBtYXBPcHRpb25zOiBCb29sZWFuLFxuICAgIGVtaXRWYWx1ZTogQm9vbGVhbixcblxuICAgIGRpc2FibGVUYWJTZWxlY3Rpb246IEJvb2xlYW4sXG5cbiAgICBpbnB1dERlYm91bmNlOiB7XG4gICAgICB0eXBlOiBbIE51bWJlciwgU3RyaW5nIF0sXG4gICAgICBkZWZhdWx0OiA1MDBcbiAgICB9LFxuXG4gICAgaW5wdXRDbGFzczogWyBBcnJheSwgU3RyaW5nLCBPYmplY3QgXSxcbiAgICBpbnB1dFN0eWxlOiBbIEFycmF5LCBTdHJpbmcsIE9iamVjdCBdLFxuXG4gICAgdGFiaW5kZXg6IHtcbiAgICAgIHR5cGU6IFsgU3RyaW5nLCBOdW1iZXIgXSxcbiAgICAgIGRlZmF1bHQ6IDBcbiAgICB9LFxuXG4gICAgYXV0b2NvbXBsZXRlOiBTdHJpbmcsXG5cbiAgICB0cmFuc2l0aW9uU2hvdzoge30sXG4gICAgdHJhbnNpdGlvbkhpZGU6IHt9LFxuICAgIHRyYW5zaXRpb25EdXJhdGlvbjoge30sXG5cbiAgICBiZWhhdmlvcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsaWRhdG9yOiB2ID0+IFsgJ2RlZmF1bHQnLCAnbWVudScsICdkaWFsb2cnIF0uaW5jbHVkZXModiksXG4gICAgICBkZWZhdWx0OiAnZGVmYXVsdCdcbiAgICB9LFxuXG4gICAgLy8gb3ZlcnJpZGUgb2YgdXNlVmlydHVhbFNjcm9sbFByb3BzID4gdmlydHVhbFNjcm9sbEl0ZW1TaXplIChubyBkZWZhdWx0KVxuICAgIHZpcnR1YWxTY3JvbGxJdGVtU2l6ZTogdXNlVmlydHVhbFNjcm9sbFByb3BzLnZpcnR1YWxTY3JvbGxJdGVtU2l6ZS50eXBlLFxuXG4gICAgb25OZXdWYWx1ZTogRnVuY3Rpb24sXG4gICAgb25GaWx0ZXI6IEZ1bmN0aW9uXG4gIH0sXG5cbiAgZW1pdHM6IFtcbiAgICAuLi51c2VGaWVsZEVtaXRzLFxuICAgICdhZGQnLCAncmVtb3ZlJywgJ2lucHV0VmFsdWUnLFxuICAgICdrZXl1cCcsICdrZXlwcmVzcycsICdrZXlkb3duJyxcbiAgICAncG9wdXBTaG93JywgJ3BvcHVwSGlkZScsXG4gICAgJ2ZpbHRlckFib3J0J1xuICBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCB9KSB7XG4gICAgY29uc3QgeyBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCB7ICRxIH0gPSBwcm94eVxuXG4gICAgY29uc3QgbWVudSA9IHJlZihmYWxzZSlcbiAgICBjb25zdCBkaWFsb2cgPSByZWYoZmFsc2UpXG4gICAgY29uc3Qgb3B0aW9uSW5kZXggPSByZWYoLTEpXG4gICAgY29uc3QgaW5wdXRWYWx1ZSA9IHJlZignJylcbiAgICBjb25zdCBkaWFsb2dGaWVsZEZvY3VzZWQgPSByZWYoZmFsc2UpXG4gICAgY29uc3QgaW5uZXJMb2FkaW5nSW5kaWNhdG9yID0gcmVmKGZhbHNlKVxuXG4gICAgbGV0IGZpbHRlclRpbWVyID0gbnVsbCwgaW5wdXRWYWx1ZVRpbWVyID0gbnVsbCxcbiAgICAgIGlubmVyVmFsdWVDYWNoZSxcbiAgICAgIGhhc0RpYWxvZywgdXNlcklucHV0VmFsdWUsIGZpbHRlcklkID0gbnVsbCwgZGVmYXVsdElucHV0VmFsdWUsXG4gICAgICB0cmFuc2l0aW9uU2hvd0NvbXB1dGVkLCBzZWFyY2hCdWZmZXIsIHNlYXJjaEJ1ZmZlckV4cFxuXG4gICAgY29uc3QgaW5wdXRSZWYgPSByZWYobnVsbClcbiAgICBjb25zdCB0YXJnZXRSZWYgPSByZWYobnVsbClcbiAgICBjb25zdCBtZW51UmVmID0gcmVmKG51bGwpXG4gICAgY29uc3QgZGlhbG9nUmVmID0gcmVmKG51bGwpXG4gICAgY29uc3QgbWVudUNvbnRlbnRSZWYgPSByZWYobnVsbClcblxuICAgIGNvbnN0IG5hbWVQcm9wID0gdXNlRm9ybUlucHV0TmFtZUF0dHIocHJvcHMpXG5cbiAgICBjb25zdCBvbkNvbXBvc2l0aW9uID0gdXNlS2V5Q29tcG9zaXRpb24ob25JbnB1dClcblxuICAgIGNvbnN0IHZpcnR1YWxTY3JvbGxMZW5ndGggPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBBcnJheS5pc0FycmF5KHByb3BzLm9wdGlvbnMpXG4gICAgICAgID8gcHJvcHMub3B0aW9ucy5sZW5ndGhcbiAgICAgICAgOiAwXG4gICAgKSlcblxuICAgIGNvbnN0IHZpcnR1YWxTY3JvbGxJdGVtU2l6ZUNvbXB1dGVkID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMudmlydHVhbFNjcm9sbEl0ZW1TaXplID09PSB2b2lkIDBcbiAgICAgICAgPyAocHJvcHMub3B0aW9uc0RlbnNlID09PSB0cnVlID8gMjQgOiA0OClcbiAgICAgICAgOiBwcm9wcy52aXJ0dWFsU2Nyb2xsSXRlbVNpemVcbiAgICApKVxuXG4gICAgY29uc3Qge1xuICAgICAgdmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UsXG4gICAgICB2aXJ0dWFsU2Nyb2xsU2xpY2VTaXplQ29tcHV0ZWQsXG4gICAgICBsb2NhbFJlc2V0VmlydHVhbFNjcm9sbCxcbiAgICAgIHBhZFZpcnR1YWxTY3JvbGwsXG4gICAgICBvblZpcnR1YWxTY3JvbGxFdnQsXG4gICAgICBzY3JvbGxUbyxcbiAgICAgIHNldFZpcnR1YWxTY3JvbGxTaXplXG4gICAgfSA9IHVzZVZpcnR1YWxTY3JvbGwoe1xuICAgICAgdmlydHVhbFNjcm9sbExlbmd0aCwgZ2V0VmlydHVhbFNjcm9sbFRhcmdldCwgZ2V0VmlydHVhbFNjcm9sbEVsLFxuICAgICAgdmlydHVhbFNjcm9sbEl0ZW1TaXplQ29tcHV0ZWRcbiAgICB9KVxuXG4gICAgY29uc3Qgc3RhdGUgPSB1c2VGaWVsZFN0YXRlKClcblxuICAgIGNvbnN0IGlubmVyVmFsdWUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdFxuICAgICAgICBtYXBOdWxsID0gcHJvcHMubWFwT3B0aW9ucyA9PT0gdHJ1ZSAmJiBwcm9wcy5tdWx0aXBsZSAhPT0gdHJ1ZSxcbiAgICAgICAgdmFsID0gcHJvcHMubW9kZWxWYWx1ZSAhPT0gdm9pZCAwICYmIChwcm9wcy5tb2RlbFZhbHVlICE9PSBudWxsIHx8IG1hcE51bGwgPT09IHRydWUpXG4gICAgICAgICAgPyAocHJvcHMubXVsdGlwbGUgPT09IHRydWUgJiYgQXJyYXkuaXNBcnJheShwcm9wcy5tb2RlbFZhbHVlKSA/IHByb3BzLm1vZGVsVmFsdWUgOiBbIHByb3BzLm1vZGVsVmFsdWUgXSlcbiAgICAgICAgICA6IFtdXG5cbiAgICAgIGlmIChwcm9wcy5tYXBPcHRpb25zID09PSB0cnVlICYmIEFycmF5LmlzQXJyYXkocHJvcHMub3B0aW9ucykgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgY2FjaGUgPSBwcm9wcy5tYXBPcHRpb25zID09PSB0cnVlICYmIGlubmVyVmFsdWVDYWNoZSAhPT0gdm9pZCAwXG4gICAgICAgICAgPyBpbm5lclZhbHVlQ2FjaGVcbiAgICAgICAgICA6IFtdXG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IHZhbC5tYXAodiA9PiBnZXRPcHRpb24odiwgY2FjaGUpKVxuXG4gICAgICAgIHJldHVybiBwcm9wcy5tb2RlbFZhbHVlID09PSBudWxsICYmIG1hcE51bGwgPT09IHRydWVcbiAgICAgICAgICA/IHZhbHVlcy5maWx0ZXIodiA9PiB2ICE9PSBudWxsKVxuICAgICAgICAgIDogdmFsdWVzXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB2YWxcbiAgICB9KVxuXG4gICAgY29uc3QgaW5uZXJGaWVsZFByb3BzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgYWNjID0ge31cbiAgICAgIGZpZWxkUHJvcHNMaXN0LmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgY29uc3QgdmFsID0gcHJvcHNbIGtleSBdXG4gICAgICAgIGlmICh2YWwgIT09IHZvaWQgMCkge1xuICAgICAgICAgIGFjY1sga2V5IF0gPSB2YWxcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHJldHVybiBhY2NcbiAgICB9KVxuXG4gICAgY29uc3QgaXNPcHRpb25zRGFyayA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLm9wdGlvbnNEYXJrID09PSBudWxsXG4gICAgICAgID8gc3RhdGUuaXNEYXJrLnZhbHVlXG4gICAgICAgIDogcHJvcHMub3B0aW9uc0RhcmtcbiAgICApKVxuXG4gICAgY29uc3QgaGFzVmFsdWUgPSBjb21wdXRlZCgoKSA9PiBmaWVsZFZhbHVlSXNGaWxsZWQoaW5uZXJWYWx1ZS52YWx1ZSkpXG5cbiAgICBjb25zdCBjb21wdXRlZElucHV0Q2xhc3MgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBsZXQgY2xzID0gJ3EtZmllbGRfX2lucHV0IHEtcGxhY2Vob2xkZXIgY29sJ1xuXG4gICAgICBpZiAocHJvcHMuaGlkZVNlbGVjdGVkID09PSB0cnVlIHx8IGlubmVyVmFsdWUudmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBbIGNscywgcHJvcHMuaW5wdXRDbGFzcyBdXG4gICAgICB9XG5cbiAgICAgIGNscyArPSAnIHEtZmllbGRfX2lucHV0LS1wYWRkaW5nJ1xuXG4gICAgICByZXR1cm4gcHJvcHMuaW5wdXRDbGFzcyA9PT0gdm9pZCAwXG4gICAgICAgID8gY2xzXG4gICAgICAgIDogWyBjbHMsIHByb3BzLmlucHV0Q2xhc3MgXVxuICAgIH0pXG5cbiAgICBjb25zdCBtZW51Q29udGVudENsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIChwcm9wcy52aXJ0dWFsU2Nyb2xsSG9yaXpvbnRhbCA9PT0gdHJ1ZSA/ICdxLXZpcnR1YWwtc2Nyb2xsLS1ob3Jpem9udGFsJyA6ICcnKVxuICAgICAgKyAocHJvcHMucG9wdXBDb250ZW50Q2xhc3MgPyAnICcgKyBwcm9wcy5wb3B1cENvbnRlbnRDbGFzcyA6ICcnKVxuICAgIClcblxuICAgIGNvbnN0IG5vT3B0aW9ucyA9IGNvbXB1dGVkKCgpID0+IHZpcnR1YWxTY3JvbGxMZW5ndGgudmFsdWUgPT09IDApXG5cbiAgICBjb25zdCBzZWxlY3RlZFN0cmluZyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBpbm5lclZhbHVlLnZhbHVlXG4gICAgICAgIC5tYXAob3B0ID0+IGdldE9wdGlvbkxhYmVsLnZhbHVlKG9wdCkpXG4gICAgICAgIC5qb2luKCcsICcpXG4gICAgKVxuXG4gICAgY29uc3QgYXJpYUN1cnJlbnRWYWx1ZSA9IGNvbXB1dGVkKCgpID0+IChwcm9wcy5kaXNwbGF5VmFsdWUgIT09IHZvaWQgMFxuICAgICAgPyBwcm9wcy5kaXNwbGF5VmFsdWVcbiAgICAgIDogc2VsZWN0ZWRTdHJpbmcudmFsdWVcbiAgICApKVxuXG4gICAgY29uc3QgbmVlZHNIdG1sRm4gPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5vcHRpb25zSHRtbCA9PT0gdHJ1ZVxuICAgICAgICA/ICgpID0+IHRydWVcbiAgICAgICAgOiBvcHQgPT4gb3B0Py5odG1sID09PSB0cnVlXG4gICAgKSlcblxuICAgIGNvbnN0IHZhbHVlQXNIdG1sID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuZGlzcGxheVZhbHVlSHRtbCA9PT0gdHJ1ZSB8fCAoXG4gICAgICAgIHByb3BzLmRpc3BsYXlWYWx1ZSA9PT0gdm9pZCAwICYmIChcbiAgICAgICAgICBwcm9wcy5vcHRpb25zSHRtbCA9PT0gdHJ1ZVxuICAgICAgICAgIHx8IGlubmVyVmFsdWUudmFsdWUuc29tZShuZWVkc0h0bWxGbi52YWx1ZSlcbiAgICAgICAgKVxuICAgICAgKVxuICAgICkpXG5cbiAgICBjb25zdCB0YWJpbmRleCA9IGNvbXB1dGVkKCgpID0+IChzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSB0cnVlID8gcHJvcHMudGFiaW5kZXggOiAtMSkpXG5cbiAgICBjb25zdCBjb21ib2JveEF0dHJzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgYXR0cnMgPSB7XG4gICAgICAgIHRhYmluZGV4OiBwcm9wcy50YWJpbmRleCxcbiAgICAgICAgcm9sZTogJ2NvbWJvYm94JyxcbiAgICAgICAgJ2FyaWEtbGFiZWwnOiBwcm9wcy5sYWJlbCxcbiAgICAgICAgJ2FyaWEtcmVhZG9ubHknOiBwcm9wcy5yZWFkb25seSA9PT0gdHJ1ZSA/ICd0cnVlJyA6ICdmYWxzZScsXG4gICAgICAgICdhcmlhLWF1dG9jb21wbGV0ZSc6IHByb3BzLnVzZUlucHV0ID09PSB0cnVlID8gJ2xpc3QnIDogJ25vbmUnLFxuICAgICAgICAnYXJpYS1leHBhbmRlZCc6IG1lbnUudmFsdWUgPT09IHRydWUgPyAndHJ1ZScgOiAnZmFsc2UnLFxuICAgICAgICAnYXJpYS1jb250cm9scyc6IGAkeyBzdGF0ZS50YXJnZXRVaWQudmFsdWUgfV9sYmBcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbkluZGV4LnZhbHVlID49IDApIHtcbiAgICAgICAgYXR0cnNbICdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnIF0gPSBgJHsgc3RhdGUudGFyZ2V0VWlkLnZhbHVlIH1fJHsgb3B0aW9uSW5kZXgudmFsdWUgfWBcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGF0dHJzXG4gICAgfSlcblxuICAgIGNvbnN0IGxpc3Rib3hBdHRycyA9IGNvbXB1dGVkKCgpID0+ICh7XG4gICAgICBpZDogYCR7IHN0YXRlLnRhcmdldFVpZC52YWx1ZSB9X2xiYCxcbiAgICAgIHJvbGU6ICdsaXN0Ym94JyxcbiAgICAgICdhcmlhLW11bHRpc2VsZWN0YWJsZSc6IHByb3BzLm11bHRpcGxlID09PSB0cnVlID8gJ3RydWUnIDogJ2ZhbHNlJ1xuICAgIH0pKVxuXG4gICAgY29uc3Qgc2VsZWN0ZWRTY29wZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIHJldHVybiBpbm5lclZhbHVlLnZhbHVlLm1hcCgob3B0LCBpKSA9PiAoe1xuICAgICAgICBpbmRleDogaSxcbiAgICAgICAgb3B0LFxuICAgICAgICBodG1sOiBuZWVkc0h0bWxGbi52YWx1ZShvcHQpLFxuICAgICAgICBzZWxlY3RlZDogdHJ1ZSxcbiAgICAgICAgcmVtb3ZlQXRJbmRleDogcmVtb3ZlQXRJbmRleEFuZEZvY3VzLFxuICAgICAgICB0b2dnbGVPcHRpb24sXG4gICAgICAgIHRhYmluZGV4OiB0YWJpbmRleC52YWx1ZVxuICAgICAgfSkpXG4gICAgfSlcblxuICAgIGNvbnN0IG9wdGlvblNjb3BlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgaWYgKHZpcnR1YWxTY3JvbGxMZW5ndGgudmFsdWUgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIFtdXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHsgZnJvbSwgdG8gfSA9IHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlXG5cbiAgICAgIHJldHVybiBwcm9wcy5vcHRpb25zLnNsaWNlKGZyb20sIHRvKS5tYXAoKG9wdCwgaSkgPT4ge1xuICAgICAgICBjb25zdCBkaXNhYmxlID0gaXNPcHRpb25EaXNhYmxlZC52YWx1ZShvcHQpID09PSB0cnVlXG4gICAgICAgIGNvbnN0IGFjdGl2ZSA9IGlzT3B0aW9uU2VsZWN0ZWQob3B0KSA9PT0gdHJ1ZVxuICAgICAgICBjb25zdCBpbmRleCA9IGZyb20gKyBpXG5cbiAgICAgICAgY29uc3QgaXRlbVByb3BzID0ge1xuICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcbiAgICAgICAgICBhY3RpdmUsXG4gICAgICAgICAgYWN0aXZlQ2xhc3M6IGNvbXB1dGVkT3B0aW9uc1NlbGVjdGVkQ2xhc3MudmFsdWUsXG4gICAgICAgICAgbWFudWFsRm9jdXM6IHRydWUsXG4gICAgICAgICAgZm9jdXNlZDogZmFsc2UsXG4gICAgICAgICAgZGlzYWJsZSxcbiAgICAgICAgICB0YWJpbmRleDogLTEsXG4gICAgICAgICAgZGVuc2U6IHByb3BzLm9wdGlvbnNEZW5zZSxcbiAgICAgICAgICBkYXJrOiBpc09wdGlvbnNEYXJrLnZhbHVlLFxuICAgICAgICAgIHJvbGU6ICdvcHRpb24nLFxuICAgICAgICAgICdhcmlhLXNlbGVjdGVkJzogYWN0aXZlID09PSB0cnVlID8gJ3RydWUnIDogJ2ZhbHNlJyxcbiAgICAgICAgICBpZDogYCR7IHN0YXRlLnRhcmdldFVpZC52YWx1ZSB9XyR7IGluZGV4IH1gLFxuICAgICAgICAgIG9uQ2xpY2s6ICgpID0+IHsgdG9nZ2xlT3B0aW9uKG9wdCkgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRpc2FibGUgIT09IHRydWUpIHtcbiAgICAgICAgICBvcHRpb25JbmRleC52YWx1ZSA9PT0gaW5kZXggJiYgKGl0ZW1Qcm9wcy5mb2N1c2VkID0gdHJ1ZSlcblxuICAgICAgICAgIGlmICgkcS5wbGF0Zm9ybS5pcy5kZXNrdG9wID09PSB0cnVlKSB7XG4gICAgICAgICAgICBpdGVtUHJvcHMub25Nb3VzZW1vdmUgPSAoKSA9PiB7IG1lbnUudmFsdWUgPT09IHRydWUgJiYgc2V0T3B0aW9uSW5kZXgoaW5kZXgpIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGluZGV4LFxuICAgICAgICAgIG9wdCxcbiAgICAgICAgICBodG1sOiBuZWVkc0h0bWxGbi52YWx1ZShvcHQpLFxuICAgICAgICAgIGxhYmVsOiBnZXRPcHRpb25MYWJlbC52YWx1ZShvcHQpLFxuICAgICAgICAgIHNlbGVjdGVkOiBpdGVtUHJvcHMuYWN0aXZlLFxuICAgICAgICAgIGZvY3VzZWQ6IGl0ZW1Qcm9wcy5mb2N1c2VkLFxuICAgICAgICAgIHRvZ2dsZU9wdGlvbixcbiAgICAgICAgICBzZXRPcHRpb25JbmRleCxcbiAgICAgICAgICBpdGVtUHJvcHNcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuXG4gICAgY29uc3QgZHJvcGRvd25BcnJvd0ljb24gPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5kcm9wZG93bkljb24gIT09IHZvaWQgMFxuICAgICAgICA/IHByb3BzLmRyb3Bkb3duSWNvblxuICAgICAgICA6ICRxLmljb25TZXQuYXJyb3cuZHJvcGRvd25cbiAgICApKVxuXG4gICAgY29uc3Qgc3F1YXJlZE1lbnUgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMub3B0aW9uc0NvdmVyID09PSBmYWxzZVxuICAgICAgJiYgcHJvcHMub3V0bGluZWQgIT09IHRydWVcbiAgICAgICYmIHByb3BzLnN0YW5kb3V0ICE9PSB0cnVlXG4gICAgICAmJiBwcm9wcy5ib3JkZXJsZXNzICE9PSB0cnVlXG4gICAgICAmJiBwcm9wcy5yb3VuZGVkICE9PSB0cnVlXG4gICAgKVxuXG4gICAgY29uc3QgY29tcHV0ZWRPcHRpb25zU2VsZWN0ZWRDbGFzcyA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLm9wdGlvbnNTZWxlY3RlZENsYXNzICE9PSB2b2lkIDBcbiAgICAgICAgPyBwcm9wcy5vcHRpb25zU2VsZWN0ZWRDbGFzc1xuICAgICAgICA6IChwcm9wcy5jb2xvciAhPT0gdm9pZCAwID8gYHRleHQtJHsgcHJvcHMuY29sb3IgfWAgOiAnJylcbiAgICApKVxuXG4gICAgLy8gcmV0dXJucyBtZXRob2QgdG8gZ2V0IHZhbHVlIG9mIGFuIG9wdGlvbjtcbiAgICAvLyB0YWtlcyBpbnRvIGFjY291bnQgJ29wdGlvbi12YWx1ZScgcHJvcFxuICAgIGNvbnN0IGdldE9wdGlvblZhbHVlID0gY29tcHV0ZWQoKCkgPT4gZ2V0UHJvcFZhbHVlRm4ocHJvcHMub3B0aW9uVmFsdWUsICd2YWx1ZScpKVxuXG4gICAgLy8gcmV0dXJucyBtZXRob2QgdG8gZ2V0IGxhYmVsIG9mIGFuIG9wdGlvbjtcbiAgICAvLyB0YWtlcyBpbnRvIGFjY291bnQgJ29wdGlvbi1sYWJlbCcgcHJvcFxuICAgIGNvbnN0IGdldE9wdGlvbkxhYmVsID0gY29tcHV0ZWQoKCkgPT4gZ2V0UHJvcFZhbHVlRm4ocHJvcHMub3B0aW9uTGFiZWwsICdsYWJlbCcpKVxuXG4gICAgLy8gcmV0dXJucyBtZXRob2QgdG8gdGVsbCBpZiBhbiBvcHRpb24gaXMgZGlzYWJsZWQ7XG4gICAgLy8gdGFrZXMgaW50byBhY2NvdW50ICdvcHRpb24tZGlzYWJsZScgcHJvcFxuICAgIGNvbnN0IGlzT3B0aW9uRGlzYWJsZWQgPSBjb21wdXRlZCgoKSA9PiBnZXRQcm9wVmFsdWVGbihwcm9wcy5vcHRpb25EaXNhYmxlLCAnZGlzYWJsZScpKVxuXG4gICAgY29uc3QgaW5uZXJPcHRpb25zVmFsdWUgPSBjb21wdXRlZCgoKSA9PiBpbm5lclZhbHVlLnZhbHVlLm1hcChnZXRPcHRpb25WYWx1ZS52YWx1ZSkpXG5cbiAgICBjb25zdCBpbnB1dENvbnRyb2xFdmVudHMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBldnQgPSB7XG4gICAgICAgIG9uSW5wdXQsXG4gICAgICAgIC8vIFNhZmFyaSA8IDEwLjIgJiBVSVdlYlZpZXcgZG9lc24ndCBmaXJlIGNvbXBvc2l0aW9uZW5kIHdoZW5cbiAgICAgICAgLy8gc3dpdGNoaW5nIGZvY3VzIGJlZm9yZSBjb25maXJtaW5nIGNvbXBvc2l0aW9uIGNob2ljZVxuICAgICAgICAvLyB0aGlzIGFsc28gZml4ZXMgdGhlIGlzc3VlIHdoZXJlIHNvbWUgYnJvd3NlcnMgZS5nLiBpT1MgQ2hyb21lXG4gICAgICAgIC8vIGZpcmVzIFwiY2hhbmdlXCIgaW5zdGVhZCBvZiBcImlucHV0XCIgb24gYXV0b2NvbXBsZXRlLlxuICAgICAgICBvbkNoYW5nZTogb25Db21wb3NpdGlvbixcbiAgICAgICAgb25LZXlkb3duOiBvblRhcmdldEtleWRvd24sXG4gICAgICAgIG9uS2V5dXA6IG9uVGFyZ2V0QXV0b2NvbXBsZXRlLFxuICAgICAgICBvbktleXByZXNzOiBvblRhcmdldEtleXByZXNzLFxuICAgICAgICBvbkZvY3VzOiBzZWxlY3RJbnB1dFRleHQsXG4gICAgICAgIG9uQ2xpY2sgKGUpIHsgaGFzRGlhbG9nID09PSB0cnVlICYmIHN0b3AoZSkgfVxuICAgICAgfVxuXG4gICAgICBldnQub25Db21wb3NpdGlvbnN0YXJ0ID0gZXZ0Lm9uQ29tcG9zaXRpb251cGRhdGUgPSBldnQub25Db21wb3NpdGlvbmVuZCA9IG9uQ29tcG9zaXRpb25cblxuICAgICAgcmV0dXJuIGV2dFxuICAgIH0pXG5cbiAgICB3YXRjaChpbm5lclZhbHVlLCB2YWwgPT4ge1xuICAgICAgaW5uZXJWYWx1ZUNhY2hlID0gdmFsXG5cbiAgICAgIGlmIChcbiAgICAgICAgcHJvcHMudXNlSW5wdXQgPT09IHRydWVcbiAgICAgICAgJiYgcHJvcHMuZmlsbElucHV0ID09PSB0cnVlXG4gICAgICAgICYmIHByb3BzLm11bHRpcGxlICE9PSB0cnVlXG4gICAgICAgIC8vIFByZXZlbnQgcmUtZW50ZXJpbmcgaW4gZmlsdGVyIHdoaWxlIGZpbHRlcmluZ1xuICAgICAgICAvLyBBbHNvIHByZXZlbnQgY2xlYXJpbmcgaW5wdXRWYWx1ZSB3aGlsZSBmaWx0ZXJpbmdcbiAgICAgICAgJiYgc3RhdGUuaW5uZXJMb2FkaW5nLnZhbHVlICE9PSB0cnVlXG4gICAgICAgICYmICgoZGlhbG9nLnZhbHVlICE9PSB0cnVlICYmIG1lbnUudmFsdWUgIT09IHRydWUpIHx8IGhhc1ZhbHVlLnZhbHVlICE9PSB0cnVlKVxuICAgICAgKSB7XG4gICAgICAgIHVzZXJJbnB1dFZhbHVlICE9PSB0cnVlICYmIHJlc2V0SW5wdXRWYWx1ZSgpXG4gICAgICAgIGlmIChkaWFsb2cudmFsdWUgPT09IHRydWUgfHwgbWVudS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGZpbHRlcignJylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIHsgaW1tZWRpYXRlOiB0cnVlIH0pXG5cbiAgICB3YXRjaCgoKSA9PiBwcm9wcy5maWxsSW5wdXQsIHJlc2V0SW5wdXRWYWx1ZSlcblxuICAgIHdhdGNoKG1lbnUsIHVwZGF0ZU1lbnUpXG5cbiAgICB3YXRjaCh2aXJ0dWFsU2Nyb2xsTGVuZ3RoLCByZXJlbmRlck1lbnUpXG5cbiAgICBmdW5jdGlvbiBnZXRFbWl0dGluZ09wdGlvblZhbHVlIChvcHQpIHtcbiAgICAgIHJldHVybiBwcm9wcy5lbWl0VmFsdWUgPT09IHRydWVcbiAgICAgICAgPyBnZXRPcHRpb25WYWx1ZS52YWx1ZShvcHQpXG4gICAgICAgIDogb3B0XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlQXRJbmRleCAoaW5kZXgpIHtcbiAgICAgIGlmIChpbmRleCAhPT0gLTEgJiYgaW5kZXggPCBpbm5lclZhbHVlLnZhbHVlLmxlbmd0aCkge1xuICAgICAgICBpZiAocHJvcHMubXVsdGlwbGUgPT09IHRydWUpIHtcbiAgICAgICAgICBjb25zdCBtb2RlbCA9IHByb3BzLm1vZGVsVmFsdWUuc2xpY2UoKVxuICAgICAgICAgIGVtaXQoJ3JlbW92ZScsIHsgaW5kZXgsIHZhbHVlOiBtb2RlbC5zcGxpY2UoaW5kZXgsIDEpWyAwIF0gfSlcbiAgICAgICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIG1vZGVsKVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgbnVsbClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZUF0SW5kZXhBbmRGb2N1cyAoaW5kZXgpIHtcbiAgICAgIHJlbW92ZUF0SW5kZXgoaW5kZXgpXG4gICAgICBzdGF0ZS5mb2N1cygpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkIChvcHQsIHVuaXF1ZSkge1xuICAgICAgY29uc3QgdmFsID0gZ2V0RW1pdHRpbmdPcHRpb25WYWx1ZShvcHQpXG5cbiAgICAgIGlmIChwcm9wcy5tdWx0aXBsZSAhPT0gdHJ1ZSkge1xuICAgICAgICBwcm9wcy5maWxsSW5wdXQgPT09IHRydWUgJiYgdXBkYXRlSW5wdXRWYWx1ZShcbiAgICAgICAgICBnZXRPcHRpb25MYWJlbC52YWx1ZShvcHQpLFxuICAgICAgICAgIHRydWUsXG4gICAgICAgICAgdHJ1ZVxuICAgICAgICApXG5cbiAgICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCB2YWwpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAoaW5uZXJWYWx1ZS52YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgZW1pdCgnYWRkJywgeyBpbmRleDogMCwgdmFsdWU6IHZhbCB9KVxuICAgICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIHByb3BzLm11bHRpcGxlID09PSB0cnVlID8gWyB2YWwgXSA6IHZhbClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgdW5pcXVlID09PSB0cnVlXG4gICAgICAgICYmIGlzT3B0aW9uU2VsZWN0ZWQob3B0KSA9PT0gdHJ1ZVxuICAgICAgKSByZXR1cm5cblxuICAgICAgaWYgKFxuICAgICAgICBwcm9wcy5tYXhWYWx1ZXMgIT09IHZvaWQgMFxuICAgICAgICAmJiBwcm9wcy5tb2RlbFZhbHVlLmxlbmd0aCA+PSBwcm9wcy5tYXhWYWx1ZXNcbiAgICAgICkgcmV0dXJuXG5cbiAgICAgIGNvbnN0IG1vZGVsID0gcHJvcHMubW9kZWxWYWx1ZS5zbGljZSgpXG5cbiAgICAgIGVtaXQoJ2FkZCcsIHsgaW5kZXg6IG1vZGVsLmxlbmd0aCwgdmFsdWU6IHZhbCB9KVxuICAgICAgbW9kZWwucHVzaCh2YWwpXG4gICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIG1vZGVsKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvZ2dsZU9wdGlvbiAob3B0LCBrZWVwT3Blbikge1xuICAgICAgaWYgKFxuICAgICAgICBzdGF0ZS5lZGl0YWJsZS52YWx1ZSAhPT0gdHJ1ZVxuICAgICAgICB8fCBvcHQgPT09IHZvaWQgMFxuICAgICAgICB8fCBpc09wdGlvbkRpc2FibGVkLnZhbHVlKG9wdCkgPT09IHRydWVcbiAgICAgICkgcmV0dXJuXG5cbiAgICAgIGNvbnN0IG9wdFZhbHVlID0gZ2V0T3B0aW9uVmFsdWUudmFsdWUob3B0KVxuXG4gICAgICBpZiAocHJvcHMubXVsdGlwbGUgIT09IHRydWUpIHtcbiAgICAgICAgaWYgKGtlZXBPcGVuICE9PSB0cnVlKSB7XG4gICAgICAgICAgdXBkYXRlSW5wdXRWYWx1ZShcbiAgICAgICAgICAgIHByb3BzLmZpbGxJbnB1dCA9PT0gdHJ1ZSA/IGdldE9wdGlvbkxhYmVsLnZhbHVlKG9wdCkgOiAnJyxcbiAgICAgICAgICAgIHRydWUsXG4gICAgICAgICAgICB0cnVlXG4gICAgICAgICAgKVxuXG4gICAgICAgICAgaGlkZVBvcHVwKClcbiAgICAgICAgfVxuXG4gICAgICAgIHRhcmdldFJlZi52YWx1ZT8uZm9jdXMoKVxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICBpbm5lclZhbHVlLnZhbHVlLmxlbmd0aCA9PT0gMFxuICAgICAgICAgIHx8IGlzRGVlcEVxdWFsKGdldE9wdGlvblZhbHVlLnZhbHVlKGlubmVyVmFsdWUudmFsdWVbIDAgXSksIG9wdFZhbHVlKSAhPT0gdHJ1ZVxuICAgICAgICApIHtcbiAgICAgICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIHByb3BzLmVtaXRWYWx1ZSA9PT0gdHJ1ZSA/IG9wdFZhbHVlIDogb3B0KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChoYXNEaWFsb2cgIT09IHRydWUgfHwgZGlhbG9nRmllbGRGb2N1c2VkLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIHN0YXRlLmZvY3VzKClcbiAgICAgIH1cblxuICAgICAgc2VsZWN0SW5wdXRUZXh0KClcblxuICAgICAgaWYgKGlubmVyVmFsdWUudmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGNvbnN0IHZhbCA9IHByb3BzLmVtaXRWYWx1ZSA9PT0gdHJ1ZSA/IG9wdFZhbHVlIDogb3B0XG4gICAgICAgIGVtaXQoJ2FkZCcsIHsgaW5kZXg6IDAsIHZhbHVlOiB2YWwgfSlcbiAgICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBwcm9wcy5tdWx0aXBsZSA9PT0gdHJ1ZSA/IFsgdmFsIF0gOiB2YWwpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBjb25zdFxuICAgICAgICBtb2RlbCA9IHByb3BzLm1vZGVsVmFsdWUuc2xpY2UoKSxcbiAgICAgICAgaW5kZXggPSBpbm5lck9wdGlvbnNWYWx1ZS52YWx1ZS5maW5kSW5kZXgodiA9PiBpc0RlZXBFcXVhbCh2LCBvcHRWYWx1ZSkpXG5cbiAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgZW1pdCgncmVtb3ZlJywgeyBpbmRleCwgdmFsdWU6IG1vZGVsLnNwbGljZShpbmRleCwgMSlbIDAgXSB9KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBwcm9wcy5tYXhWYWx1ZXMgIT09IHZvaWQgMFxuICAgICAgICAgICYmIG1vZGVsLmxlbmd0aCA+PSBwcm9wcy5tYXhWYWx1ZXNcbiAgICAgICAgKSByZXR1cm5cblxuICAgICAgICBjb25zdCB2YWwgPSBwcm9wcy5lbWl0VmFsdWUgPT09IHRydWUgPyBvcHRWYWx1ZSA6IG9wdFxuXG4gICAgICAgIGVtaXQoJ2FkZCcsIHsgaW5kZXg6IG1vZGVsLmxlbmd0aCwgdmFsdWU6IHZhbCB9KVxuICAgICAgICBtb2RlbC5wdXNoKHZhbClcbiAgICAgIH1cblxuICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBtb2RlbClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRPcHRpb25JbmRleCAoaW5kZXgpIHtcbiAgICAgIGlmICgkcS5wbGF0Zm9ybS5pcy5kZXNrdG9wICE9PSB0cnVlKSByZXR1cm5cblxuICAgICAgY29uc3QgdmFsID0gaW5kZXggIT09IC0xICYmIGluZGV4IDwgdmlydHVhbFNjcm9sbExlbmd0aC52YWx1ZVxuICAgICAgICA/IGluZGV4XG4gICAgICAgIDogLTFcblxuICAgICAgaWYgKG9wdGlvbkluZGV4LnZhbHVlICE9PSB2YWwpIHtcbiAgICAgICAgb3B0aW9uSW5kZXgudmFsdWUgPSB2YWxcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb3ZlT3B0aW9uU2VsZWN0aW9uIChvZmZzZXQgPSAxLCBza2lwSW5wdXRWYWx1ZSkge1xuICAgICAgaWYgKG1lbnUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gb3B0aW9uSW5kZXgudmFsdWVcbiAgICAgICAgZG8ge1xuICAgICAgICAgIGluZGV4ID0gbm9ybWFsaXplVG9JbnRlcnZhbChcbiAgICAgICAgICAgIGluZGV4ICsgb2Zmc2V0LFxuICAgICAgICAgICAgLTEsXG4gICAgICAgICAgICB2aXJ0dWFsU2Nyb2xsTGVuZ3RoLnZhbHVlIC0gMVxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAoaW5kZXggIT09IC0xICYmIGluZGV4ICE9PSBvcHRpb25JbmRleC52YWx1ZSAmJiBpc09wdGlvbkRpc2FibGVkLnZhbHVlKHByb3BzLm9wdGlvbnNbIGluZGV4IF0pID09PSB0cnVlKVxuXG4gICAgICAgIGlmIChvcHRpb25JbmRleC52YWx1ZSAhPT0gaW5kZXgpIHtcbiAgICAgICAgICBzZXRPcHRpb25JbmRleChpbmRleClcbiAgICAgICAgICBzY3JvbGxUbyhpbmRleClcblxuICAgICAgICAgIGlmIChza2lwSW5wdXRWYWx1ZSAhPT0gdHJ1ZSAmJiBwcm9wcy51c2VJbnB1dCA9PT0gdHJ1ZSAmJiBwcm9wcy5maWxsSW5wdXQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHNldElucHV0VmFsdWUoXG4gICAgICAgICAgICAgIGluZGV4ID49IDBcbiAgICAgICAgICAgICAgICA/IGdldE9wdGlvbkxhYmVsLnZhbHVlKHByb3BzLm9wdGlvbnNbIGluZGV4IF0pXG4gICAgICAgICAgICAgICAgOiBkZWZhdWx0SW5wdXRWYWx1ZSxcbiAgICAgICAgICAgICAgdHJ1ZVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldE9wdGlvbiAodmFsdWUsIHZhbHVlQ2FjaGUpIHtcbiAgICAgIGNvbnN0IGZuID0gb3B0ID0+IGlzRGVlcEVxdWFsKGdldE9wdGlvblZhbHVlLnZhbHVlKG9wdCksIHZhbHVlKVxuICAgICAgcmV0dXJuIHByb3BzLm9wdGlvbnMuZmluZChmbikgfHwgdmFsdWVDYWNoZS5maW5kKGZuKSB8fCB2YWx1ZVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzT3B0aW9uU2VsZWN0ZWQgKG9wdCkge1xuICAgICAgY29uc3QgdmFsID0gZ2V0T3B0aW9uVmFsdWUudmFsdWUob3B0KVxuICAgICAgcmV0dXJuIGlubmVyT3B0aW9uc1ZhbHVlLnZhbHVlLmZpbmQodiA9PiBpc0RlZXBFcXVhbCh2LCB2YWwpKSAhPT0gdm9pZCAwXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2VsZWN0SW5wdXRUZXh0IChlKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHByb3BzLnVzZUlucHV0ID09PSB0cnVlXG4gICAgICAgICYmIHRhcmdldFJlZi52YWx1ZSAhPT0gbnVsbFxuICAgICAgICAmJiAoZSA9PT0gdm9pZCAwIHx8ICh0YXJnZXRSZWYudmFsdWUgPT09IGUudGFyZ2V0ICYmIGUudGFyZ2V0LnZhbHVlID09PSBzZWxlY3RlZFN0cmluZy52YWx1ZSkpXG4gICAgICApIHtcbiAgICAgICAgdGFyZ2V0UmVmLnZhbHVlLnNlbGVjdCgpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25UYXJnZXRLZXl1cCAoZSkge1xuICAgICAgLy8gaWYgRVNDIGFuZCB3ZSBoYXZlIGFuIG9wZW5lZCBtZW51XG4gICAgICAvLyB0aGVuIHN0b3AgcHJvcGFnYXRpb24gKG1pZ2h0IGJlIGNhdWdodCBieSBhIFFEaWFsb2dcbiAgICAgIC8vIGFuZCBzbyBpdCB3aWxsIGFsc28gY2xvc2UgdGhlIFFEaWFsb2csIHdoaWNoIGlzIHdyb25nKVxuICAgICAgaWYgKGlzS2V5Q29kZShlLCAyNykgPT09IHRydWUgJiYgbWVudS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBzdG9wKGUpXG4gICAgICAgIC8vIG9uIEVTQyB3ZSBuZWVkIHRvIGNsb3NlIHRoZSBkaWFsb2cgYWxzb1xuICAgICAgICBoaWRlUG9wdXAoKVxuICAgICAgICByZXNldElucHV0VmFsdWUoKVxuICAgICAgfVxuXG4gICAgICBlbWl0KCdrZXl1cCcsIGUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25UYXJnZXRBdXRvY29tcGxldGUgKGUpIHtcbiAgICAgIGNvbnN0IHsgdmFsdWUgfSA9IGUudGFyZ2V0XG5cbiAgICAgIGlmIChlLmtleUNvZGUgIT09IHZvaWQgMCkge1xuICAgICAgICBvblRhcmdldEtleXVwKGUpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBlLnRhcmdldC52YWx1ZSA9ICcnXG5cbiAgICAgIGlmIChmaWx0ZXJUaW1lciAhPT0gbnVsbCkge1xuICAgICAgICBjbGVhclRpbWVvdXQoZmlsdGVyVGltZXIpXG4gICAgICAgIGZpbHRlclRpbWVyID0gbnVsbFxuICAgICAgfVxuICAgICAgaWYgKGlucHV0VmFsdWVUaW1lciAhPT0gbnVsbCkge1xuICAgICAgICBjbGVhclRpbWVvdXQoaW5wdXRWYWx1ZVRpbWVyKVxuICAgICAgICBpbnB1dFZhbHVlVGltZXIgPSBudWxsXG4gICAgICB9XG5cbiAgICAgIHJlc2V0SW5wdXRWYWx1ZSgpXG5cbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICBjb25zdCBuZWVkbGUgPSB2YWx1ZS50b0xvY2FsZUxvd2VyQ2FzZSgpXG4gICAgICAgIGNvbnN0IGZpbmRGbiA9IGV4dHJhY3RGbiA9PiB7XG4gICAgICAgICAgY29uc3Qgb3B0aW9uID0gcHJvcHMub3B0aW9ucy5maW5kKG9wdCA9PiBTdHJpbmcoZXh0cmFjdEZuLnZhbHVlKG9wdCkpLnRvTG9jYWxlTG93ZXJDYXNlKCkgPT09IG5lZWRsZSlcblxuICAgICAgICAgIGlmIChvcHRpb24gPT09IHZvaWQgMCkgcmV0dXJuIGZhbHNlXG5cbiAgICAgICAgICBpZiAoaW5uZXJWYWx1ZS52YWx1ZS5pbmRleE9mKG9wdGlvbikgPT09IC0xKSB7XG4gICAgICAgICAgICB0b2dnbGVPcHRpb24ob3B0aW9uKVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGhpZGVQb3B1cCgpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmaWxsRm4gPSBhZnRlckZpbHRlciA9PiB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgZmluZEZuKGdldE9wdGlvblZhbHVlKSAhPT0gdHJ1ZVxuICAgICAgICAgICAgJiYgYWZ0ZXJGaWx0ZXIgIT09IHRydWVcbiAgICAgICAgICAgICYmIGZpbmRGbihnZXRPcHRpb25MYWJlbCkgIT09IHRydWVcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGZpbHRlcih2YWx1ZSwgdHJ1ZSwgKCkgPT4gZmlsbEZuKHRydWUpKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZpbGxGbigpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgc3RhdGUuY2xlYXJWYWx1ZShlKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uVGFyZ2V0S2V5cHJlc3MgKGUpIHtcbiAgICAgIGVtaXQoJ2tleXByZXNzJywgZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblRhcmdldEtleWRvd24gKGUpIHtcbiAgICAgIGVtaXQoJ2tleWRvd24nLCBlKVxuXG4gICAgICBpZiAoc2hvdWxkSWdub3JlS2V5KGUpID09PSB0cnVlKSByZXR1cm5cblxuICAgICAgY29uc3QgbmV3VmFsdWVNb2RlVmFsaWQgPSBpbnB1dFZhbHVlLnZhbHVlLmxlbmd0aCAhPT0gMFxuICAgICAgICAmJiAocHJvcHMubmV3VmFsdWVNb2RlICE9PSB2b2lkIDAgfHwgcHJvcHMub25OZXdWYWx1ZSAhPT0gdm9pZCAwKVxuXG4gICAgICBjb25zdCB0YWJTaG91bGRTZWxlY3QgPSBlLnNoaWZ0S2V5ICE9PSB0cnVlXG4gICAgICAgICYmIHByb3BzLmRpc2FibGVUYWJTZWxlY3Rpb24gIT09IHRydWVcbiAgICAgICAgJiYgcHJvcHMubXVsdGlwbGUgIT09IHRydWVcbiAgICAgICAgJiYgKG9wdGlvbkluZGV4LnZhbHVlICE9PSAtMSB8fCBuZXdWYWx1ZU1vZGVWYWxpZCA9PT0gdHJ1ZSlcblxuICAgICAgLy8gZXNjYXBlXG4gICAgICBpZiAoZS5rZXlDb2RlID09PSAyNykge1xuICAgICAgICBwcmV2ZW50KGUpIC8vIHByZXZlbnQgY2xlYXJpbmcgdGhlIGlucHV0VmFsdWVcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIC8vIHRhYlxuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gOSAmJiB0YWJTaG91bGRTZWxlY3QgPT09IGZhbHNlKSB7XG4gICAgICAgIGNsb3NlTWVudSgpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIGUudGFyZ2V0ID09PSB2b2lkIDBcbiAgICAgICAgfHwgZS50YXJnZXQuaWQgIT09IHN0YXRlLnRhcmdldFVpZC52YWx1ZVxuICAgICAgICB8fCBzdGF0ZS5lZGl0YWJsZS52YWx1ZSAhPT0gdHJ1ZVxuICAgICAgKSByZXR1cm5cblxuICAgICAgLy8gZG93blxuICAgICAgaWYgKFxuICAgICAgICBlLmtleUNvZGUgPT09IDQwXG4gICAgICAgICYmIHN0YXRlLmlubmVyTG9hZGluZy52YWx1ZSAhPT0gdHJ1ZVxuICAgICAgICAmJiBtZW51LnZhbHVlID09PSBmYWxzZVxuICAgICAgKSB7XG4gICAgICAgIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgICAgIHNob3dQb3B1cCgpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICAvLyBiYWNrc3BhY2VcbiAgICAgIGlmIChcbiAgICAgICAgZS5rZXlDb2RlID09PSA4XG4gICAgICAgICYmIChcbiAgICAgICAgICBwcm9wcy51c2VDaGlwcyA9PT0gdHJ1ZVxuICAgICAgICAgIHx8IHByb3BzLmNsZWFyYWJsZSA9PT0gdHJ1ZVxuICAgICAgICApXG4gICAgICAgICYmIHByb3BzLmhpZGVTZWxlY3RlZCAhPT0gdHJ1ZVxuICAgICAgICAmJiBpbnB1dFZhbHVlLnZhbHVlLmxlbmd0aCA9PT0gMFxuICAgICAgKSB7XG4gICAgICAgIGlmIChwcm9wcy5tdWx0aXBsZSA9PT0gdHJ1ZSAmJiBBcnJheS5pc0FycmF5KHByb3BzLm1vZGVsVmFsdWUpID09PSB0cnVlKSB7XG4gICAgICAgICAgcmVtb3ZlQXRJbmRleChwcm9wcy5tb2RlbFZhbHVlLmxlbmd0aCAtIDEpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocHJvcHMubXVsdGlwbGUgIT09IHRydWUgJiYgcHJvcHMubW9kZWxWYWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgbnVsbClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICAvLyBob21lLCBlbmQgLSAzNiwgMzVcbiAgICAgIGlmIChcbiAgICAgICAgKGUua2V5Q29kZSA9PT0gMzUgfHwgZS5rZXlDb2RlID09PSAzNilcbiAgICAgICAgJiYgKHR5cGVvZiBpbnB1dFZhbHVlLnZhbHVlICE9PSAnc3RyaW5nJyB8fCBpbnB1dFZhbHVlLnZhbHVlLmxlbmd0aCA9PT0gMClcbiAgICAgICkge1xuICAgICAgICBzdG9wQW5kUHJldmVudChlKVxuICAgICAgICBvcHRpb25JbmRleC52YWx1ZSA9IC0xXG4gICAgICAgIG1vdmVPcHRpb25TZWxlY3Rpb24oZS5rZXlDb2RlID09PSAzNiA/IDEgOiAtMSwgcHJvcHMubXVsdGlwbGUpXG4gICAgICB9XG5cbiAgICAgIC8vIHBnIHVwLCBwZyBkb3duIC0gMzMsIDM0XG4gICAgICBpZiAoXG4gICAgICAgIChlLmtleUNvZGUgPT09IDMzIHx8IGUua2V5Q29kZSA9PT0gMzQpXG4gICAgICAgICYmIHZpcnR1YWxTY3JvbGxTbGljZVNpemVDb21wdXRlZC52YWx1ZSAhPT0gdm9pZCAwXG4gICAgICApIHtcbiAgICAgICAgc3RvcEFuZFByZXZlbnQoZSlcbiAgICAgICAgb3B0aW9uSW5kZXgudmFsdWUgPSBNYXRoLm1heChcbiAgICAgICAgICAtMSxcbiAgICAgICAgICBNYXRoLm1pbihcbiAgICAgICAgICAgIHZpcnR1YWxTY3JvbGxMZW5ndGgudmFsdWUsXG4gICAgICAgICAgICBvcHRpb25JbmRleC52YWx1ZSArIChlLmtleUNvZGUgPT09IDMzID8gLTEgOiAxKSAqIHZpcnR1YWxTY3JvbGxTbGljZVNpemVDb21wdXRlZC52YWx1ZS52aWV3XG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICAgIG1vdmVPcHRpb25TZWxlY3Rpb24oZS5rZXlDb2RlID09PSAzMyA/IDEgOiAtMSwgcHJvcHMubXVsdGlwbGUpXG4gICAgICB9XG5cbiAgICAgIC8vIHVwLCBkb3duXG4gICAgICBpZiAoZS5rZXlDb2RlID09PSAzOCB8fCBlLmtleUNvZGUgPT09IDQwKSB7XG4gICAgICAgIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgICAgIG1vdmVPcHRpb25TZWxlY3Rpb24oZS5rZXlDb2RlID09PSAzOCA/IC0xIDogMSwgcHJvcHMubXVsdGlwbGUpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG9wdGlvbnNMZW5ndGggPSB2aXJ0dWFsU2Nyb2xsTGVuZ3RoLnZhbHVlXG5cbiAgICAgIC8vIGNsZWFyIHNlYXJjaCBidWZmZXIgaWYgZXhwaXJlZFxuICAgICAgaWYgKHNlYXJjaEJ1ZmZlciA9PT0gdm9pZCAwIHx8IHNlYXJjaEJ1ZmZlckV4cCA8IERhdGUubm93KCkpIHtcbiAgICAgICAgc2VhcmNoQnVmZmVyID0gJydcbiAgICAgIH1cblxuICAgICAgLy8ga2V5Ym9hcmQgc2VhcmNoIHdoZW4gbm90IGhhdmluZyB1c2UtaW5wdXRcbiAgICAgIGlmIChcbiAgICAgICAgb3B0aW9uc0xlbmd0aCA+IDBcbiAgICAgICAgJiYgcHJvcHMudXNlSW5wdXQgIT09IHRydWVcbiAgICAgICAgJiYgZS5rZXkgIT09IHZvaWQgMFxuICAgICAgICAmJiBlLmtleS5sZW5ndGggPT09IDEgLy8gcHJpbnRhYmxlIGNoYXJcbiAgICAgICAgJiYgZS5hbHRLZXkgPT09IGZhbHNlIC8vIG5vdCBrYmQgc2hvcnRjdXRcbiAgICAgICAgJiYgZS5jdHJsS2V5ID09PSBmYWxzZSAvLyBub3Qga2JkIHNob3J0Y3V0XG4gICAgICAgICYmIGUubWV0YUtleSA9PT0gZmFsc2UgLy8gbm90IGtiZCBzaG9ydGN1dCwgZXNwZWNpYWxseSBvbiBtYWNPUyB3aXRoIENvbW1hbmQga2V5XG4gICAgICAgICYmIChlLmtleUNvZGUgIT09IDMyIHx8IHNlYXJjaEJ1ZmZlci5sZW5ndGggIT09IDApIC8vIHNwYWNlIGluIG1pZGRsZSBvZiBzZWFyY2hcbiAgICAgICkge1xuICAgICAgICBtZW51LnZhbHVlICE9PSB0cnVlICYmIHNob3dQb3B1cChlKVxuXG4gICAgICAgIGNvbnN0XG4gICAgICAgICAgY2hhciA9IGUua2V5LnRvTG9jYWxlTG93ZXJDYXNlKCksXG4gICAgICAgICAga2V5UmVwZWF0ID0gc2VhcmNoQnVmZmVyLmxlbmd0aCA9PT0gMSAmJiBzZWFyY2hCdWZmZXJbIDAgXSA9PT0gY2hhclxuXG4gICAgICAgIHNlYXJjaEJ1ZmZlckV4cCA9IERhdGUubm93KCkgKyAxNTAwXG4gICAgICAgIGlmIChrZXlSZXBlYXQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgc3RvcEFuZFByZXZlbnQoZSlcbiAgICAgICAgICBzZWFyY2hCdWZmZXIgKz0gY2hhclxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2VhcmNoUmUgPSBuZXcgUmVnRXhwKCdeJyArIHNlYXJjaEJ1ZmZlci5zcGxpdCgnJykubWFwKGwgPT4gKHJlRXNjYXBlTGlzdC5pbmRleE9mKGwpICE9PSAtMSA/ICdcXFxcJyArIGwgOiBsKSkuam9pbignLionKSwgJ2knKVxuXG4gICAgICAgIGxldCBpbmRleCA9IG9wdGlvbkluZGV4LnZhbHVlXG5cbiAgICAgICAgaWYgKGtleVJlcGVhdCA9PT0gdHJ1ZSB8fCBpbmRleCA8IDAgfHwgc2VhcmNoUmUudGVzdChnZXRPcHRpb25MYWJlbC52YWx1ZShwcm9wcy5vcHRpb25zWyBpbmRleCBdKSkgIT09IHRydWUpIHtcbiAgICAgICAgICBkbyB7XG4gICAgICAgICAgICBpbmRleCA9IG5vcm1hbGl6ZVRvSW50ZXJ2YWwoaW5kZXggKyAxLCAtMSwgb3B0aW9uc0xlbmd0aCAtIDEpXG4gICAgICAgICAgfVxuICAgICAgICAgIHdoaWxlIChpbmRleCAhPT0gb3B0aW9uSW5kZXgudmFsdWUgJiYgKFxuICAgICAgICAgICAgaXNPcHRpb25EaXNhYmxlZC52YWx1ZShwcm9wcy5vcHRpb25zWyBpbmRleCBdKSA9PT0gdHJ1ZVxuICAgICAgICAgICAgfHwgc2VhcmNoUmUudGVzdChnZXRPcHRpb25MYWJlbC52YWx1ZShwcm9wcy5vcHRpb25zWyBpbmRleCBdKSkgIT09IHRydWVcbiAgICAgICAgICApKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbkluZGV4LnZhbHVlICE9PSBpbmRleCkge1xuICAgICAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICAgIHNldE9wdGlvbkluZGV4KGluZGV4KVxuICAgICAgICAgICAgc2Nyb2xsVG8oaW5kZXgpXG5cbiAgICAgICAgICAgIGlmIChpbmRleCA+PSAwICYmIHByb3BzLnVzZUlucHV0ID09PSB0cnVlICYmIHByb3BzLmZpbGxJbnB1dCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICBzZXRJbnB1dFZhbHVlKGdldE9wdGlvbkxhYmVsLnZhbHVlKHByb3BzLm9wdGlvbnNbIGluZGV4IF0pLCB0cnVlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgLy8gZW50ZXIsIHNwYWNlICh3aGVuIG5vdCB1c2luZyB1c2UtaW5wdXQgYW5kIG5vdCBpbiBzZWFyY2gpLCBvciB0YWIgKHdoZW4gbm90IHVzaW5nIG11bHRpcGxlIGFuZCBvcHRpb24gc2VsZWN0ZWQpXG4gICAgICAvLyBzYW1lIHRhcmdldCBpcyBjaGVja2VkIGFib3ZlXG4gICAgICBpZiAoXG4gICAgICAgIGUua2V5Q29kZSAhPT0gMTNcbiAgICAgICAgJiYgKGUua2V5Q29kZSAhPT0gMzIgfHwgcHJvcHMudXNlSW5wdXQgPT09IHRydWUgfHwgc2VhcmNoQnVmZmVyICE9PSAnJylcbiAgICAgICAgJiYgKGUua2V5Q29kZSAhPT0gOSB8fCB0YWJTaG91bGRTZWxlY3QgPT09IGZhbHNlKVxuICAgICAgKSByZXR1cm5cblxuICAgICAgZS5rZXlDb2RlICE9PSA5ICYmIHN0b3BBbmRQcmV2ZW50KGUpXG5cbiAgICAgIGlmIChvcHRpb25JbmRleC52YWx1ZSAhPT0gLTEgJiYgb3B0aW9uSW5kZXgudmFsdWUgPCBvcHRpb25zTGVuZ3RoKSB7XG4gICAgICAgIHRvZ2dsZU9wdGlvbihwcm9wcy5vcHRpb25zWyBvcHRpb25JbmRleC52YWx1ZSBdKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKG5ld1ZhbHVlTW9kZVZhbGlkID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IGRvbmUgPSAodmFsLCBtb2RlKSA9PiB7XG4gICAgICAgICAgaWYgKG1vZGUpIHtcbiAgICAgICAgICAgIGlmICh2YWxpZGF0ZU5ld1ZhbHVlTW9kZShtb2RlKSAhPT0gdHJ1ZSkgcmV0dXJuXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbW9kZSA9IHByb3BzLm5ld1ZhbHVlTW9kZVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHVwZGF0ZUlucHV0VmFsdWUoJycsIHByb3BzLm11bHRpcGxlICE9PSB0cnVlLCB0cnVlKVxuXG4gICAgICAgICAgaWYgKHZhbCA9PT0gdm9pZCAwIHx8IHZhbCA9PT0gbnVsbCkgcmV0dXJuXG5cbiAgICAgICAgICBjb25zdCBmbiA9IG1vZGUgPT09ICd0b2dnbGUnID8gdG9nZ2xlT3B0aW9uIDogYWRkXG4gICAgICAgICAgZm4odmFsLCBtb2RlID09PSAnYWRkLXVuaXF1ZScpXG5cbiAgICAgICAgICBpZiAocHJvcHMubXVsdGlwbGUgIT09IHRydWUpIHtcbiAgICAgICAgICAgIHRhcmdldFJlZi52YWx1ZT8uZm9jdXMoKVxuICAgICAgICAgICAgaGlkZVBvcHVwKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvcHMub25OZXdWYWx1ZSAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgZW1pdCgnbmV3VmFsdWUnLCBpbnB1dFZhbHVlLnZhbHVlLCBkb25lKVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGRvbmUoaW5wdXRWYWx1ZS52YWx1ZSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9wcy5tdWx0aXBsZSAhPT0gdHJ1ZSkgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChtZW51LnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGNsb3NlTWVudSgpXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChzdGF0ZS5pbm5lckxvYWRpbmcudmFsdWUgIT09IHRydWUpIHtcbiAgICAgICAgc2hvd1BvcHVwKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRWaXJ0dWFsU2Nyb2xsRWwgKCkge1xuICAgICAgcmV0dXJuIGhhc0RpYWxvZyA9PT0gdHJ1ZVxuICAgICAgICA/IG1lbnVDb250ZW50UmVmLnZhbHVlXG4gICAgICAgIDogKFxuICAgICAgICAgICAgbWVudVJlZi52YWx1ZSAhPT0gbnVsbCAmJiBtZW51UmVmLnZhbHVlLmNvbnRlbnRFbCAhPT0gbnVsbFxuICAgICAgICAgICAgICA/IG1lbnVSZWYudmFsdWUuY29udGVudEVsXG4gICAgICAgICAgICAgIDogdm9pZCAwXG4gICAgICAgICAgKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFZpcnR1YWxTY3JvbGxUYXJnZXQgKCkge1xuICAgICAgcmV0dXJuIGdldFZpcnR1YWxTY3JvbGxFbCgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U2VsZWN0aW9uICgpIHtcbiAgICAgIGlmIChwcm9wcy5oaWRlU2VsZWN0ZWQgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIFtdXG4gICAgICB9XG5cbiAgICAgIGlmIChzbG90c1sgJ3NlbGVjdGVkLWl0ZW0nIF0gIT09IHZvaWQgMCkge1xuICAgICAgICByZXR1cm4gc2VsZWN0ZWRTY29wZS52YWx1ZS5tYXAoc2NvcGUgPT4gc2xvdHNbICdzZWxlY3RlZC1pdGVtJyBdKHNjb3BlKSkuc2xpY2UoKVxuICAgICAgfVxuXG4gICAgICBpZiAoc2xvdHMuc2VsZWN0ZWQgIT09IHZvaWQgMCkge1xuICAgICAgICByZXR1cm4gW10uY29uY2F0KHNsb3RzLnNlbGVjdGVkKCkpXG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9wcy51c2VDaGlwcyA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gc2VsZWN0ZWRTY29wZS52YWx1ZS5tYXAoKHNjb3BlLCBpKSA9PiBoKFFDaGlwLCB7XG4gICAgICAgICAga2V5OiAnb3B0aW9uLScgKyBpLFxuICAgICAgICAgIHJlbW92YWJsZTogc3RhdGUuZWRpdGFibGUudmFsdWUgPT09IHRydWUgJiYgaXNPcHRpb25EaXNhYmxlZC52YWx1ZShzY29wZS5vcHQpICE9PSB0cnVlLFxuICAgICAgICAgIGRlbnNlOiB0cnVlLFxuICAgICAgICAgIHRleHRDb2xvcjogcHJvcHMuY29sb3IsXG4gICAgICAgICAgdGFiaW5kZXg6IHRhYmluZGV4LnZhbHVlLFxuICAgICAgICAgIG9uUmVtb3ZlICgpIHsgc2NvcGUucmVtb3ZlQXRJbmRleChpKSB9XG4gICAgICAgIH0sICgpID0+IGgoJ3NwYW4nLCB7XG4gICAgICAgICAgY2xhc3M6ICdlbGxpcHNpcycsXG4gICAgICAgICAgWyBzY29wZS5odG1sID09PSB0cnVlID8gJ2lubmVySFRNTCcgOiAndGV4dENvbnRlbnQnIF06IGdldE9wdGlvbkxhYmVsLnZhbHVlKHNjb3BlLm9wdClcbiAgICAgICAgfSkpKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gW1xuICAgICAgICBoKCdzcGFuJywge1xuICAgICAgICAgIGNsYXNzOiAnZWxsaXBzaXMnLFxuICAgICAgICAgIFsgdmFsdWVBc0h0bWwudmFsdWUgPT09IHRydWUgPyAnaW5uZXJIVE1MJyA6ICd0ZXh0Q29udGVudCcgXTogYXJpYUN1cnJlbnRWYWx1ZS52YWx1ZVxuICAgICAgICB9KVxuICAgICAgXVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEFsbE9wdGlvbnMgKCkge1xuICAgICAgaWYgKG5vT3B0aW9ucy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gc2xvdHNbICduby1vcHRpb24nIF0gIT09IHZvaWQgMFxuICAgICAgICAgID8gc2xvdHNbICduby1vcHRpb24nIF0oeyBpbnB1dFZhbHVlOiBpbnB1dFZhbHVlLnZhbHVlIH0pXG4gICAgICAgICAgOiB2b2lkIDBcbiAgICAgIH1cblxuICAgICAgY29uc3QgZm4gPSBzbG90cy5vcHRpb24gIT09IHZvaWQgMFxuICAgICAgICA/IHNsb3RzLm9wdGlvblxuICAgICAgICA6IHNjb3BlID0+IHtcbiAgICAgICAgICByZXR1cm4gaChRSXRlbSwge1xuICAgICAgICAgICAga2V5OiBzY29wZS5pbmRleCxcbiAgICAgICAgICAgIC4uLnNjb3BlLml0ZW1Qcm9wc1xuICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBoKFxuICAgICAgICAgICAgICBRSXRlbVNlY3Rpb24sXG4gICAgICAgICAgICAgICgpID0+IGgoXG4gICAgICAgICAgICAgICAgUUl0ZW1MYWJlbCxcbiAgICAgICAgICAgICAgICAoKSA9PiBoKCdzcGFuJywge1xuICAgICAgICAgICAgICAgICAgWyBzY29wZS5odG1sID09PSB0cnVlID8gJ2lubmVySFRNTCcgOiAndGV4dENvbnRlbnQnIF06IHNjb3BlLmxhYmVsXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgbGV0IG9wdGlvbnMgPSBwYWRWaXJ0dWFsU2Nyb2xsKCdkaXYnLCBvcHRpb25TY29wZS52YWx1ZS5tYXAoZm4pKVxuXG4gICAgICBpZiAoc2xvdHNbICdiZWZvcmUtb3B0aW9ucycgXSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIG9wdGlvbnMgPSBzbG90c1sgJ2JlZm9yZS1vcHRpb25zJyBdKCkuY29uY2F0KG9wdGlvbnMpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoTWVyZ2VTbG90KHNsb3RzWyAnYWZ0ZXItb3B0aW9ucycgXSwgb3B0aW9ucylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRJbnB1dCAoZnJvbURpYWxvZywgaXNUYXJnZXQpIHtcbiAgICAgIGNvbnN0IGF0dHJzID0gaXNUYXJnZXQgPT09IHRydWUgPyB7IC4uLmNvbWJvYm94QXR0cnMudmFsdWUsIC4uLnN0YXRlLnNwbGl0QXR0cnMuYXR0cmlidXRlcy52YWx1ZSB9IDogdm9pZCAwXG5cbiAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIHJlZjogaXNUYXJnZXQgPT09IHRydWUgPyB0YXJnZXRSZWYgOiB2b2lkIDAsXG4gICAgICAgIGtleTogJ2lfdCcsXG4gICAgICAgIGNsYXNzOiBjb21wdXRlZElucHV0Q2xhc3MudmFsdWUsXG4gICAgICAgIHN0eWxlOiBwcm9wcy5pbnB1dFN0eWxlLFxuICAgICAgICB2YWx1ZTogaW5wdXRWYWx1ZS52YWx1ZSAhPT0gdm9pZCAwID8gaW5wdXRWYWx1ZS52YWx1ZSA6ICcnLFxuICAgICAgICAvLyByZXF1aXJlZCBmb3IgQW5kcm9pZCBpbiBvcmRlciB0byBzaG93IEVOVEVSIGtleSB3aGVuIGluIGZvcm1cbiAgICAgICAgdHlwZTogJ3NlYXJjaCcsXG4gICAgICAgIC4uLmF0dHJzLFxuICAgICAgICBpZDogaXNUYXJnZXQgPT09IHRydWUgPyBzdGF0ZS50YXJnZXRVaWQudmFsdWUgOiB2b2lkIDAsXG4gICAgICAgIG1heGxlbmd0aDogcHJvcHMubWF4bGVuZ3RoLFxuICAgICAgICBhdXRvY29tcGxldGU6IHByb3BzLmF1dG9jb21wbGV0ZSxcbiAgICAgICAgJ2RhdGEtYXV0b2ZvY3VzJzogZnJvbURpYWxvZyA9PT0gdHJ1ZSB8fCBwcm9wcy5hdXRvZm9jdXMgPT09IHRydWUgfHwgdm9pZCAwLFxuICAgICAgICBkaXNhYmxlZDogcHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSxcbiAgICAgICAgcmVhZG9ubHk6IHByb3BzLnJlYWRvbmx5ID09PSB0cnVlLFxuICAgICAgICAuLi5pbnB1dENvbnRyb2xFdmVudHMudmFsdWVcbiAgICAgIH1cblxuICAgICAgaWYgKGZyb21EaWFsb2cgIT09IHRydWUgJiYgaGFzRGlhbG9nID09PSB0cnVlKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEuY2xhc3MpID09PSB0cnVlKSB7XG4gICAgICAgICAgZGF0YS5jbGFzcyA9IFsgLi4uZGF0YS5jbGFzcywgJ25vLXBvaW50ZXItZXZlbnRzJyBdXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZGF0YS5jbGFzcyArPSAnIG5vLXBvaW50ZXItZXZlbnRzJ1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoKCdpbnB1dCcsIGRhdGEpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25JbnB1dCAoZSkge1xuICAgICAgaWYgKGZpbHRlclRpbWVyICE9PSBudWxsKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChmaWx0ZXJUaW1lcilcbiAgICAgICAgZmlsdGVyVGltZXIgPSBudWxsXG4gICAgICB9XG4gICAgICBpZiAoaW5wdXRWYWx1ZVRpbWVyICE9PSBudWxsKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChpbnB1dFZhbHVlVGltZXIpXG4gICAgICAgIGlucHV0VmFsdWVUaW1lciA9IG51bGxcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICBlXG4gICAgICAgICYmIGUudGFyZ2V0XG4gICAgICAgICYmIGUudGFyZ2V0LnFDb21wb3NpbmcgPT09IHRydWVcbiAgICAgICkgcmV0dXJuXG5cbiAgICAgIHNldElucHV0VmFsdWUoZS50YXJnZXQudmFsdWUgfHwgJycpXG4gICAgICAvLyBtYXJrIGl0IGhlcmUgYXMgdXNlciBpbnB1dCBzbyB0aGF0IGlmIHVwZGF0ZUlucHV0VmFsdWUgaXMgY2FsbGVkXG4gICAgICAvLyBiZWZvcmUgZmlsdGVyIGlzIGNhbGxlZCB0aGUgaW5kaWNhdG9yIGlzIHJlc2V0XG4gICAgICB1c2VySW5wdXRWYWx1ZSA9IHRydWVcbiAgICAgIGRlZmF1bHRJbnB1dFZhbHVlID0gaW5wdXRWYWx1ZS52YWx1ZVxuXG4gICAgICBpZiAoXG4gICAgICAgIHN0YXRlLmZvY3VzZWQudmFsdWUgIT09IHRydWVcbiAgICAgICAgJiYgKGhhc0RpYWxvZyAhPT0gdHJ1ZSB8fCBkaWFsb2dGaWVsZEZvY3VzZWQudmFsdWUgPT09IHRydWUpXG4gICAgICApIHtcbiAgICAgICAgc3RhdGUuZm9jdXMoKVxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMub25GaWx0ZXIgIT09IHZvaWQgMCkge1xuICAgICAgICBmaWx0ZXJUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGZpbHRlclRpbWVyID0gbnVsbFxuICAgICAgICAgIGZpbHRlcihpbnB1dFZhbHVlLnZhbHVlKVxuICAgICAgICB9LCBwcm9wcy5pbnB1dERlYm91bmNlKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldElucHV0VmFsdWUgKHZhbCwgZW1pdEltbWVkaWF0ZWx5KSB7XG4gICAgICBpZiAoaW5wdXRWYWx1ZS52YWx1ZSAhPT0gdmFsKSB7XG4gICAgICAgIGlucHV0VmFsdWUudmFsdWUgPSB2YWxcblxuICAgICAgICBpZiAoZW1pdEltbWVkaWF0ZWx5ID09PSB0cnVlIHx8IHByb3BzLmlucHV0RGVib3VuY2UgPT09IDAgfHwgcHJvcHMuaW5wdXREZWJvdW5jZSA9PT0gJzAnKSB7XG4gICAgICAgICAgZW1pdCgnaW5wdXRWYWx1ZScsIHZhbClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBpbnB1dFZhbHVlVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlucHV0VmFsdWVUaW1lciA9IG51bGxcbiAgICAgICAgICAgIGVtaXQoJ2lucHV0VmFsdWUnLCB2YWwpXG4gICAgICAgICAgfSwgcHJvcHMuaW5wdXREZWJvdW5jZSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUlucHV0VmFsdWUgKHZhbCwgbm9GaWx0ZXJpbmcsIGludGVybmFsKSB7XG4gICAgICB1c2VySW5wdXRWYWx1ZSA9IGludGVybmFsICE9PSB0cnVlXG5cbiAgICAgIGlmIChwcm9wcy51c2VJbnB1dCA9PT0gdHJ1ZSkge1xuICAgICAgICBzZXRJbnB1dFZhbHVlKHZhbCwgdHJ1ZSlcblxuICAgICAgICBpZiAobm9GaWx0ZXJpbmcgPT09IHRydWUgfHwgaW50ZXJuYWwgIT09IHRydWUpIHtcbiAgICAgICAgICBkZWZhdWx0SW5wdXRWYWx1ZSA9IHZhbFxuICAgICAgICB9XG5cbiAgICAgICAgbm9GaWx0ZXJpbmcgIT09IHRydWUgJiYgZmlsdGVyKHZhbClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaWx0ZXIgKHZhbCwga2VlcENsb3NlZCwgYWZ0ZXJVcGRhdGVGbikge1xuICAgICAgaWYgKFxuICAgICAgICBwcm9wcy5vbkZpbHRlciA9PT0gdm9pZCAwXG4gICAgICAgIHx8IChrZWVwQ2xvc2VkICE9PSB0cnVlICYmIHN0YXRlLmZvY3VzZWQudmFsdWUgIT09IHRydWUpXG4gICAgICApIHJldHVyblxuXG4gICAgICBpZiAoc3RhdGUuaW5uZXJMb2FkaW5nLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGVtaXQoJ2ZpbHRlckFib3J0JylcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBzdGF0ZS5pbm5lckxvYWRpbmcudmFsdWUgPSB0cnVlXG4gICAgICAgIGlubmVyTG9hZGluZ0luZGljYXRvci52YWx1ZSA9IHRydWVcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICB2YWwgIT09ICcnXG4gICAgICAgICYmIHByb3BzLm11bHRpcGxlICE9PSB0cnVlXG4gICAgICAgICYmIGlubmVyVmFsdWUudmFsdWUubGVuZ3RoICE9PSAwXG4gICAgICAgICYmIHVzZXJJbnB1dFZhbHVlICE9PSB0cnVlXG4gICAgICAgICYmIHZhbCA9PT0gZ2V0T3B0aW9uTGFiZWwudmFsdWUoaW5uZXJWYWx1ZS52YWx1ZVsgMCBdKVxuICAgICAgKSB7XG4gICAgICAgIHZhbCA9ICcnXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGxvY2FsRmlsdGVySWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgbWVudS52YWx1ZSA9PT0gdHJ1ZSAmJiAobWVudS52YWx1ZSA9IGZhbHNlKVxuICAgICAgfSwgMTApXG5cbiAgICAgIGZpbHRlcklkICE9PSBudWxsICYmIGNsZWFyVGltZW91dChmaWx0ZXJJZClcbiAgICAgIGZpbHRlcklkID0gbG9jYWxGaWx0ZXJJZFxuXG4gICAgICBlbWl0KFxuICAgICAgICAnZmlsdGVyJyxcbiAgICAgICAgdmFsLFxuICAgICAgICAoZm4sIGFmdGVyRm4pID0+IHtcbiAgICAgICAgICBpZiAoKGtlZXBDbG9zZWQgPT09IHRydWUgfHwgc3RhdGUuZm9jdXNlZC52YWx1ZSA9PT0gdHJ1ZSkgJiYgZmlsdGVySWQgPT09IGxvY2FsRmlsdGVySWQpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChmaWx0ZXJJZClcblxuICAgICAgICAgICAgdHlwZW9mIGZuID09PSAnZnVuY3Rpb24nICYmIGZuKClcblxuICAgICAgICAgICAgLy8gaGlkZSBpbmRpY2F0b3IgdG8gYWxsb3cgYXJyb3cgdG8gYW5pbWF0ZVxuICAgICAgICAgICAgaW5uZXJMb2FkaW5nSW5kaWNhdG9yLnZhbHVlID0gZmFsc2VcblxuICAgICAgICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgICAgICBzdGF0ZS5pbm5lckxvYWRpbmcudmFsdWUgPSBmYWxzZVxuXG4gICAgICAgICAgICAgIGlmIChzdGF0ZS5lZGl0YWJsZS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChrZWVwQ2xvc2VkID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICBtZW51LnZhbHVlID09PSB0cnVlICYmIGhpZGVQb3B1cCgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG1lbnUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgIHVwZGF0ZU1lbnUodHJ1ZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICBtZW51LnZhbHVlID0gdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHR5cGVvZiBhZnRlckZuID09PSAnZnVuY3Rpb24nICYmIG5leHRUaWNrKCgpID0+IHsgYWZ0ZXJGbihwcm94eSkgfSlcbiAgICAgICAgICAgICAgdHlwZW9mIGFmdGVyVXBkYXRlRm4gPT09ICdmdW5jdGlvbicgJiYgbmV4dFRpY2soKCkgPT4geyBhZnRlclVwZGF0ZUZuKHByb3h5KSB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICBpZiAoc3RhdGUuZm9jdXNlZC52YWx1ZSA9PT0gdHJ1ZSAmJiBmaWx0ZXJJZCA9PT0gbG9jYWxGaWx0ZXJJZCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGZpbHRlcklkKVxuICAgICAgICAgICAgc3RhdGUuaW5uZXJMb2FkaW5nLnZhbHVlID0gZmFsc2VcbiAgICAgICAgICAgIGlubmVyTG9hZGluZ0luZGljYXRvci52YWx1ZSA9IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICAgIG1lbnUudmFsdWUgPT09IHRydWUgJiYgKG1lbnUudmFsdWUgPSBmYWxzZSlcbiAgICAgICAgfVxuICAgICAgKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldE1lbnUgKCkge1xuICAgICAgcmV0dXJuIGgoUU1lbnUsIHtcbiAgICAgICAgcmVmOiBtZW51UmVmLFxuICAgICAgICBjbGFzczogbWVudUNvbnRlbnRDbGFzcy52YWx1ZSxcbiAgICAgICAgc3R5bGU6IHByb3BzLnBvcHVwQ29udGVudFN0eWxlLFxuICAgICAgICBtb2RlbFZhbHVlOiBtZW51LnZhbHVlLFxuICAgICAgICBmaXQ6IHByb3BzLm1lbnVTaHJpbmsgIT09IHRydWUsXG4gICAgICAgIGNvdmVyOiBwcm9wcy5vcHRpb25zQ292ZXIgPT09IHRydWUgJiYgbm9PcHRpb25zLnZhbHVlICE9PSB0cnVlICYmIHByb3BzLnVzZUlucHV0ICE9PSB0cnVlLFxuICAgICAgICBhbmNob3I6IHByb3BzLm1lbnVBbmNob3IsXG4gICAgICAgIHNlbGY6IHByb3BzLm1lbnVTZWxmLFxuICAgICAgICBvZmZzZXQ6IHByb3BzLm1lbnVPZmZzZXQsXG4gICAgICAgIGRhcms6IGlzT3B0aW9uc0RhcmsudmFsdWUsXG4gICAgICAgIG5vUGFyZW50RXZlbnQ6IHRydWUsXG4gICAgICAgIG5vUmVmb2N1czogdHJ1ZSxcbiAgICAgICAgbm9Gb2N1czogdHJ1ZSxcbiAgICAgICAgbm9Sb3V0ZURpc21pc3M6IHByb3BzLnBvcHVwTm9Sb3V0ZURpc21pc3MsXG4gICAgICAgIHNxdWFyZTogc3F1YXJlZE1lbnUudmFsdWUsXG4gICAgICAgIHRyYW5zaXRpb25TaG93OiBwcm9wcy50cmFuc2l0aW9uU2hvdyxcbiAgICAgICAgdHJhbnNpdGlvbkhpZGU6IHByb3BzLnRyYW5zaXRpb25IaWRlLFxuICAgICAgICB0cmFuc2l0aW9uRHVyYXRpb246IHByb3BzLnRyYW5zaXRpb25EdXJhdGlvbixcbiAgICAgICAgc2VwYXJhdGVDbG9zZVBvcHVwOiB0cnVlLFxuICAgICAgICAuLi5saXN0Ym94QXR0cnMudmFsdWUsXG4gICAgICAgIG9uU2Nyb2xsUGFzc2l2ZTogb25WaXJ0dWFsU2Nyb2xsRXZ0LFxuICAgICAgICBvbkJlZm9yZVNob3c6IG9uQ29udHJvbFBvcHVwU2hvdyxcbiAgICAgICAgb25CZWZvcmVIaWRlOiBvbk1lbnVCZWZvcmVIaWRlLFxuICAgICAgICBvblNob3c6IG9uTWVudVNob3dcbiAgICAgIH0sIGdldEFsbE9wdGlvbnMpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25NZW51QmVmb3JlSGlkZSAoZSkge1xuICAgICAgb25Db250cm9sUG9wdXBIaWRlKGUpXG4gICAgICBjbG9zZU1lbnUoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTWVudVNob3cgKCkge1xuICAgICAgc2V0VmlydHVhbFNjcm9sbFNpemUoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRGlhbG9nRmllbGRGb2N1cyAoZSkge1xuICAgICAgc3RvcChlKVxuICAgICAgdGFyZ2V0UmVmLnZhbHVlPy5mb2N1cygpXG4gICAgICBkaWFsb2dGaWVsZEZvY3VzZWQudmFsdWUgPSB0cnVlXG4gICAgICB3aW5kb3cuc2Nyb2xsVG8od2luZG93LnBhZ2VYT2Zmc2V0IHx8IHdpbmRvdy5zY3JvbGxYIHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdCB8fCAwLCAwKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRGlhbG9nRmllbGRCbHVyIChlKSB7XG4gICAgICBzdG9wKGUpXG4gICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgIGRpYWxvZ0ZpZWxkRm9jdXNlZC52YWx1ZSA9IGZhbHNlXG4gICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldERpYWxvZyAoKSB7XG4gICAgICBjb25zdCBjb250ZW50ID0gW1xuICAgICAgICBoKFFGaWVsZCwge1xuICAgICAgICAgIGNsYXNzOiBgY29sLWF1dG8gJHsgc3RhdGUuZmllbGRDbGFzcy52YWx1ZSB9YCxcbiAgICAgICAgICAuLi5pbm5lckZpZWxkUHJvcHMudmFsdWUsXG4gICAgICAgICAgZm9yOiBzdGF0ZS50YXJnZXRVaWQudmFsdWUsXG4gICAgICAgICAgZGFyazogaXNPcHRpb25zRGFyay52YWx1ZSxcbiAgICAgICAgICBzcXVhcmU6IHRydWUsXG4gICAgICAgICAgbG9hZGluZzogaW5uZXJMb2FkaW5nSW5kaWNhdG9yLnZhbHVlLFxuICAgICAgICAgIGl0ZW1BbGlnbmVkOiBmYWxzZSxcbiAgICAgICAgICBmaWxsZWQ6IHRydWUsXG4gICAgICAgICAgc3RhY2tMYWJlbDogaW5wdXRWYWx1ZS52YWx1ZS5sZW5ndGggIT09IDAsXG4gICAgICAgICAgLi4uc3RhdGUuc3BsaXRBdHRycy5saXN0ZW5lcnMudmFsdWUsXG4gICAgICAgICAgb25Gb2N1czogb25EaWFsb2dGaWVsZEZvY3VzLFxuICAgICAgICAgIG9uQmx1cjogb25EaWFsb2dGaWVsZEJsdXJcbiAgICAgICAgfSwge1xuICAgICAgICAgIC4uLnNsb3RzLFxuICAgICAgICAgIHJhd0NvbnRyb2w6ICgpID0+IHN0YXRlLmdldENvbnRyb2wodHJ1ZSksXG4gICAgICAgICAgYmVmb3JlOiB2b2lkIDAsXG4gICAgICAgICAgYWZ0ZXI6IHZvaWQgMFxuICAgICAgICB9KVxuICAgICAgXVxuXG4gICAgICBtZW51LnZhbHVlID09PSB0cnVlICYmIGNvbnRlbnQucHVzaChcbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIHJlZjogbWVudUNvbnRlbnRSZWYsXG4gICAgICAgICAgY2xhc3M6IG1lbnVDb250ZW50Q2xhc3MudmFsdWUgKyAnIHNjcm9sbCcsXG4gICAgICAgICAgc3R5bGU6IHByb3BzLnBvcHVwQ29udGVudFN0eWxlLFxuICAgICAgICAgIC4uLmxpc3Rib3hBdHRycy52YWx1ZSxcbiAgICAgICAgICBvbkNsaWNrOiBwcmV2ZW50LFxuICAgICAgICAgIG9uU2Nyb2xsUGFzc2l2ZTogb25WaXJ0dWFsU2Nyb2xsRXZ0XG4gICAgICAgIH0sIGdldEFsbE9wdGlvbnMoKSlcbiAgICAgIClcblxuICAgICAgcmV0dXJuIGgoUURpYWxvZywge1xuICAgICAgICByZWY6IGRpYWxvZ1JlZixcbiAgICAgICAgbW9kZWxWYWx1ZTogZGlhbG9nLnZhbHVlLFxuICAgICAgICBwb3NpdGlvbjogcHJvcHMudXNlSW5wdXQgPT09IHRydWUgPyAndG9wJyA6IHZvaWQgMCxcbiAgICAgICAgdHJhbnNpdGlvblNob3c6IHRyYW5zaXRpb25TaG93Q29tcHV0ZWQsXG4gICAgICAgIHRyYW5zaXRpb25IaWRlOiBwcm9wcy50cmFuc2l0aW9uSGlkZSxcbiAgICAgICAgdHJhbnNpdGlvbkR1cmF0aW9uOiBwcm9wcy50cmFuc2l0aW9uRHVyYXRpb24sXG4gICAgICAgIG5vUm91dGVEaXNtaXNzOiBwcm9wcy5wb3B1cE5vUm91dGVEaXNtaXNzLFxuICAgICAgICBvbkJlZm9yZVNob3c6IG9uQ29udHJvbFBvcHVwU2hvdyxcbiAgICAgICAgb25CZWZvcmVIaWRlOiBvbkRpYWxvZ0JlZm9yZUhpZGUsXG4gICAgICAgIG9uSGlkZTogb25EaWFsb2dIaWRlLFxuICAgICAgICBvblNob3c6IG9uRGlhbG9nU2hvd1xuICAgICAgfSwgKCkgPT4gaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogJ3Etc2VsZWN0X19kaWFsb2cnXG4gICAgICAgICAgKyAoaXNPcHRpb25zRGFyay52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1zZWxlY3RfX2RpYWxvZy0tZGFyayBxLWRhcmsnIDogJycpXG4gICAgICAgICAgKyAoZGlhbG9nRmllbGRGb2N1c2VkLnZhbHVlID09PSB0cnVlID8gJyBxLXNlbGVjdF9fZGlhbG9nLS1mb2N1c2VkJyA6ICcnKVxuICAgICAgfSwgY29udGVudCkpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25EaWFsb2dCZWZvcmVIaWRlIChlKSB7XG4gICAgICBvbkNvbnRyb2xQb3B1cEhpZGUoZSlcblxuICAgICAgaWYgKGRpYWxvZ1JlZi52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICBkaWFsb2dSZWYudmFsdWUuX191cGRhdGVSZWZvY3VzVGFyZ2V0KFxuICAgICAgICAgIHN0YXRlLnJvb3RSZWYudmFsdWUucXVlcnlTZWxlY3RvcignLnEtZmllbGRfX25hdGl2ZSA+IFt0YWJpbmRleF06bGFzdC1jaGlsZCcpXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgc3RhdGUuZm9jdXNlZC52YWx1ZSA9IGZhbHNlXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25EaWFsb2dIaWRlIChlKSB7XG4gICAgICBoaWRlUG9wdXAoKVxuICAgICAgc3RhdGUuZm9jdXNlZC52YWx1ZSA9PT0gZmFsc2UgJiYgZW1pdCgnYmx1cicsIGUpXG4gICAgICByZXNldElucHV0VmFsdWUoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRGlhbG9nU2hvdyAoKSB7XG4gICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnRcbiAgICAgIGlmIChcbiAgICAgICAgKGVsID09PSBudWxsIHx8IGVsLmlkICE9PSBzdGF0ZS50YXJnZXRVaWQudmFsdWUpXG4gICAgICAgICYmIHRhcmdldFJlZi52YWx1ZSAhPT0gbnVsbFxuICAgICAgICAmJiB0YXJnZXRSZWYudmFsdWUgIT09IGVsXG4gICAgICApIHtcbiAgICAgICAgdGFyZ2V0UmVmLnZhbHVlLmZvY3VzKClcbiAgICAgIH1cblxuICAgICAgc2V0VmlydHVhbFNjcm9sbFNpemUoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsb3NlTWVudSAoKSB7XG4gICAgICBpZiAoZGlhbG9nLnZhbHVlID09PSB0cnVlKSByZXR1cm5cblxuICAgICAgb3B0aW9uSW5kZXgudmFsdWUgPSAtMVxuXG4gICAgICBpZiAobWVudS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBtZW51LnZhbHVlID0gZmFsc2VcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlLmZvY3VzZWQudmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgIGlmIChmaWx0ZXJJZCAhPT0gbnVsbCkge1xuICAgICAgICAgIGNsZWFyVGltZW91dChmaWx0ZXJJZClcbiAgICAgICAgICBmaWx0ZXJJZCA9IG51bGxcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdGF0ZS5pbm5lckxvYWRpbmcudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICBlbWl0KCdmaWx0ZXJBYm9ydCcpXG4gICAgICAgICAgc3RhdGUuaW5uZXJMb2FkaW5nLnZhbHVlID0gZmFsc2VcbiAgICAgICAgICBpbm5lckxvYWRpbmdJbmRpY2F0b3IudmFsdWUgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2hvd1BvcHVwIChlKSB7XG4gICAgICBpZiAoc3RhdGUuZWRpdGFibGUudmFsdWUgIT09IHRydWUpIHJldHVyblxuXG4gICAgICBpZiAoaGFzRGlhbG9nID09PSB0cnVlKSB7XG4gICAgICAgIHN0YXRlLm9uQ29udHJvbEZvY3VzaW4oZSlcbiAgICAgICAgZGlhbG9nLnZhbHVlID0gdHJ1ZVxuICAgICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgc3RhdGUuZm9jdXMoKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHN0YXRlLmZvY3VzKClcbiAgICAgIH1cblxuICAgICAgaWYgKHByb3BzLm9uRmlsdGVyICE9PSB2b2lkIDApIHtcbiAgICAgICAgZmlsdGVyKGlucHV0VmFsdWUudmFsdWUpXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChub09wdGlvbnMudmFsdWUgIT09IHRydWUgfHwgc2xvdHNbICduby1vcHRpb24nIF0gIT09IHZvaWQgMCkge1xuICAgICAgICBtZW51LnZhbHVlID0gdHJ1ZVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhpZGVQb3B1cCAoKSB7XG4gICAgICBkaWFsb2cudmFsdWUgPSBmYWxzZVxuICAgICAgY2xvc2VNZW51KClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXNldElucHV0VmFsdWUgKCkge1xuICAgICAgcHJvcHMudXNlSW5wdXQgPT09IHRydWUgJiYgdXBkYXRlSW5wdXRWYWx1ZShcbiAgICAgICAgcHJvcHMubXVsdGlwbGUgIT09IHRydWUgJiYgcHJvcHMuZmlsbElucHV0ID09PSB0cnVlICYmIGlubmVyVmFsdWUudmFsdWUubGVuZ3RoICE9PSAwXG4gICAgICAgICAgPyBnZXRPcHRpb25MYWJlbC52YWx1ZShpbm5lclZhbHVlLnZhbHVlWyAwIF0pIHx8ICcnXG4gICAgICAgICAgOiAnJyxcbiAgICAgICAgdHJ1ZSxcbiAgICAgICAgdHJ1ZVxuICAgICAgKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZU1lbnUgKHNob3cpIHtcbiAgICAgIGxldCBvcHRpb25JbmRleCA9IC0xXG5cbiAgICAgIGlmIChzaG93ID09PSB0cnVlKSB7XG4gICAgICAgIGlmIChpbm5lclZhbHVlLnZhbHVlLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgIGNvbnN0IHZhbCA9IGdldE9wdGlvblZhbHVlLnZhbHVlKGlubmVyVmFsdWUudmFsdWVbIDAgXSlcbiAgICAgICAgICBvcHRpb25JbmRleCA9IHByb3BzLm9wdGlvbnMuZmluZEluZGV4KHYgPT4gaXNEZWVwRXF1YWwoZ2V0T3B0aW9uVmFsdWUudmFsdWUodiksIHZhbCkpXG4gICAgICAgIH1cblxuICAgICAgICBsb2NhbFJlc2V0VmlydHVhbFNjcm9sbChvcHRpb25JbmRleClcbiAgICAgIH1cblxuICAgICAgc2V0T3B0aW9uSW5kZXgob3B0aW9uSW5kZXgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVyZW5kZXJNZW51IChuZXdMZW5ndGgsIG9sZExlbmd0aCkge1xuICAgICAgaWYgKG1lbnUudmFsdWUgPT09IHRydWUgJiYgc3RhdGUuaW5uZXJMb2FkaW5nLnZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICBsb2NhbFJlc2V0VmlydHVhbFNjcm9sbCgtMSwgdHJ1ZSlcblxuICAgICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgaWYgKG1lbnUudmFsdWUgPT09IHRydWUgJiYgc3RhdGUuaW5uZXJMb2FkaW5nLnZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgaWYgKG5ld0xlbmd0aCA+IG9sZExlbmd0aCkge1xuICAgICAgICAgICAgICBsb2NhbFJlc2V0VmlydHVhbFNjcm9sbCgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgdXBkYXRlTWVudSh0cnVlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVNZW51UG9zaXRpb24gKCkge1xuICAgICAgaWYgKGRpYWxvZy52YWx1ZSA9PT0gZmFsc2UgJiYgbWVudVJlZi52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICBtZW51UmVmLnZhbHVlLnVwZGF0ZVBvc2l0aW9uKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkNvbnRyb2xQb3B1cFNob3cgKGUpIHtcbiAgICAgIGUgIT09IHZvaWQgMCAmJiBzdG9wKGUpXG4gICAgICBlbWl0KCdwb3B1cFNob3cnLCBlKVxuICAgICAgc3RhdGUuaGFzUG9wdXBPcGVuID0gdHJ1ZVxuICAgICAgc3RhdGUub25Db250cm9sRm9jdXNpbihlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uQ29udHJvbFBvcHVwSGlkZSAoZSkge1xuICAgICAgZSAhPT0gdm9pZCAwICYmIHN0b3AoZSlcbiAgICAgIGVtaXQoJ3BvcHVwSGlkZScsIGUpXG4gICAgICBzdGF0ZS5oYXNQb3B1cE9wZW4gPSBmYWxzZVxuICAgICAgc3RhdGUub25Db250cm9sRm9jdXNvdXQoZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVQcmVTdGF0ZSAoKSB7XG4gICAgICBoYXNEaWFsb2cgPSAkcS5wbGF0Zm9ybS5pcy5tb2JpbGUgIT09IHRydWUgJiYgcHJvcHMuYmVoYXZpb3IgIT09ICdkaWFsb2cnXG4gICAgICAgID8gZmFsc2VcbiAgICAgICAgOiBwcm9wcy5iZWhhdmlvciAhPT0gJ21lbnUnICYmIChcbiAgICAgICAgICBwcm9wcy51c2VJbnB1dCA9PT0gdHJ1ZVxuICAgICAgICAgICAgPyBzbG90c1sgJ25vLW9wdGlvbicgXSAhPT0gdm9pZCAwIHx8IHByb3BzLm9uRmlsdGVyICE9PSB2b2lkIDAgfHwgbm9PcHRpb25zLnZhbHVlID09PSBmYWxzZVxuICAgICAgICAgICAgOiB0cnVlXG4gICAgICAgIClcblxuICAgICAgdHJhbnNpdGlvblNob3dDb21wdXRlZCA9ICRxLnBsYXRmb3JtLmlzLmlvcyA9PT0gdHJ1ZSAmJiBoYXNEaWFsb2cgPT09IHRydWUgJiYgcHJvcHMudXNlSW5wdXQgPT09IHRydWVcbiAgICAgICAgPyAnZmFkZSdcbiAgICAgICAgOiBwcm9wcy50cmFuc2l0aW9uU2hvd1xuICAgIH1cblxuICAgIG9uQmVmb3JlVXBkYXRlKHVwZGF0ZVByZVN0YXRlKVxuICAgIG9uVXBkYXRlZCh1cGRhdGVNZW51UG9zaXRpb24pXG5cbiAgICB1cGRhdGVQcmVTdGF0ZSgpXG5cbiAgICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgICAgZmlsdGVyVGltZXIgIT09IG51bGwgJiYgY2xlYXJUaW1lb3V0KGZpbHRlclRpbWVyKVxuICAgICAgaW5wdXRWYWx1ZVRpbWVyICE9PSBudWxsICYmIGNsZWFyVGltZW91dChpbnB1dFZhbHVlVGltZXIpXG4gICAgfSlcblxuICAgIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kc1xuICAgIE9iamVjdC5hc3NpZ24ocHJveHksIHtcbiAgICAgIHNob3dQb3B1cCwgaGlkZVBvcHVwLFxuICAgICAgcmVtb3ZlQXRJbmRleCwgYWRkLCB0b2dnbGVPcHRpb24sXG4gICAgICBnZXRPcHRpb25JbmRleDogKCkgPT4gb3B0aW9uSW5kZXgudmFsdWUsXG4gICAgICBzZXRPcHRpb25JbmRleCwgbW92ZU9wdGlvblNlbGVjdGlvbixcbiAgICAgIGZpbHRlciwgdXBkYXRlTWVudVBvc2l0aW9uLCB1cGRhdGVJbnB1dFZhbHVlLFxuICAgICAgaXNPcHRpb25TZWxlY3RlZCxcbiAgICAgIGdldEVtaXR0aW5nT3B0aW9uVmFsdWUsXG4gICAgICBpc09wdGlvbkRpc2FibGVkOiAoLi4uYXJncykgPT4gaXNPcHRpb25EaXNhYmxlZC52YWx1ZS5hcHBseShudWxsLCBhcmdzKSA9PT0gdHJ1ZSxcbiAgICAgIGdldE9wdGlvblZhbHVlOiAoLi4uYXJncykgPT4gZ2V0T3B0aW9uVmFsdWUudmFsdWUuYXBwbHkobnVsbCwgYXJncyksXG4gICAgICBnZXRPcHRpb25MYWJlbDogKC4uLmFyZ3MpID0+IGdldE9wdGlvbkxhYmVsLnZhbHVlLmFwcGx5KG51bGwsIGFyZ3MpXG4gICAgfSlcblxuICAgIE9iamVjdC5hc3NpZ24oc3RhdGUsIHtcbiAgICAgIGlubmVyVmFsdWUsXG5cbiAgICAgIGZpZWxkQ2xhc3M6IGNvbXB1dGVkKCgpID0+XG4gICAgICAgIGBxLXNlbGVjdCBxLWZpZWxkLS1hdXRvLWhlaWdodCBxLXNlbGVjdC0td2l0aCR7IHByb3BzLnVzZUlucHV0ICE9PSB0cnVlID8gJ291dCcgOiAnJyB9LWlucHV0YFxuICAgICAgICArIGAgcS1zZWxlY3QtLXdpdGgkeyBwcm9wcy51c2VDaGlwcyAhPT0gdHJ1ZSA/ICdvdXQnIDogJycgfS1jaGlwc2BcbiAgICAgICAgKyBgIHEtc2VsZWN0LS0keyBwcm9wcy5tdWx0aXBsZSA9PT0gdHJ1ZSA/ICdtdWx0aXBsZScgOiAnc2luZ2xlJyB9YFxuICAgICAgKSxcblxuICAgICAgaW5wdXRSZWYsXG4gICAgICB0YXJnZXRSZWYsXG4gICAgICBoYXNWYWx1ZSxcbiAgICAgIHNob3dQb3B1cCxcblxuICAgICAgZmxvYXRpbmdMYWJlbDogY29tcHV0ZWQoKCkgPT5cbiAgICAgICAgKHByb3BzLmhpZGVTZWxlY3RlZCAhPT0gdHJ1ZSAmJiBoYXNWYWx1ZS52YWx1ZSA9PT0gdHJ1ZSlcbiAgICAgICAgfHwgdHlwZW9mIGlucHV0VmFsdWUudmFsdWUgPT09ICdudW1iZXInXG4gICAgICAgIHx8IGlucHV0VmFsdWUudmFsdWUubGVuZ3RoICE9PSAwXG4gICAgICAgIHx8IGZpZWxkVmFsdWVJc0ZpbGxlZChwcm9wcy5kaXNwbGF5VmFsdWUpXG4gICAgICApLFxuXG4gICAgICBnZXRDb250cm9sQ2hpbGQ6ICgpID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHN0YXRlLmVkaXRhYmxlLnZhbHVlICE9PSBmYWxzZSAmJiAoXG4gICAgICAgICAgICBkaWFsb2cudmFsdWUgPT09IHRydWUgLy8gZGlhbG9nIGFsd2F5cyBoYXMgbWVudSBkaXNwbGF5ZWQsIHNvIG5lZWQgdG8gcmVuZGVyIGl0XG4gICAgICAgICAgICB8fCBub09wdGlvbnMudmFsdWUgIT09IHRydWVcbiAgICAgICAgICAgIHx8IHNsb3RzWyAnbm8tb3B0aW9uJyBdICE9PSB2b2lkIDBcbiAgICAgICAgICApXG4gICAgICAgICkge1xuICAgICAgICAgIHJldHVybiBoYXNEaWFsb2cgPT09IHRydWUgPyBnZXREaWFsb2coKSA6IGdldE1lbnUoKVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHN0YXRlLmhhc1BvcHVwT3BlbiA9PT0gdHJ1ZSkge1xuICAgICAgICAgIC8vIGV4cGxpY2l0bHkgc2V0IGl0IG90aGVyd2lzZSBUQUIgd2lsbCBub3QgYmx1ciBjb21wb25lbnRcbiAgICAgICAgICBzdGF0ZS5oYXNQb3B1cE9wZW4gPSBmYWxzZVxuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICBjb250cm9sRXZlbnRzOiB7XG4gICAgICAgIG9uRm9jdXNpbiAoZSkgeyBzdGF0ZS5vbkNvbnRyb2xGb2N1c2luKGUpIH0sXG4gICAgICAgIG9uRm9jdXNvdXQgKGUpIHtcbiAgICAgICAgICBzdGF0ZS5vbkNvbnRyb2xGb2N1c291dChlLCAoKSA9PiB7XG4gICAgICAgICAgICByZXNldElucHV0VmFsdWUoKVxuICAgICAgICAgICAgY2xvc2VNZW51KClcbiAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBvbkNsaWNrIChlKSB7XG4gICAgICAgICAgLy8gbGFiZWwgZnJvbSBRRmllbGQgd2lsbCBwcm9wYWdhdGUgY2xpY2sgb24gdGhlIGlucHV0XG4gICAgICAgICAgcHJldmVudChlKVxuXG4gICAgICAgICAgaWYgKGhhc0RpYWxvZyAhPT0gdHJ1ZSAmJiBtZW51LnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjbG9zZU1lbnUoKVxuICAgICAgICAgICAgdGFyZ2V0UmVmLnZhbHVlPy5mb2N1cygpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzaG93UG9wdXAoZSlcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgZ2V0Q29udHJvbDogZnJvbURpYWxvZyA9PiB7XG4gICAgICAgIGNvbnN0IGNoaWxkID0gZ2V0U2VsZWN0aW9uKClcbiAgICAgICAgY29uc3QgaXNUYXJnZXQgPSBmcm9tRGlhbG9nID09PSB0cnVlIHx8IGRpYWxvZy52YWx1ZSAhPT0gdHJ1ZSB8fCBoYXNEaWFsb2cgIT09IHRydWVcblxuICAgICAgICBpZiAocHJvcHMudXNlSW5wdXQgPT09IHRydWUpIHtcbiAgICAgICAgICBjaGlsZC5wdXNoKGdldElucHV0KGZyb21EaWFsb2csIGlzVGFyZ2V0KSlcbiAgICAgICAgfVxuICAgICAgICAvLyB0aGVyZSBjYW4gYmUgb25seSBvbmUgKHdoZW4gZGlhbG9nIGlzIG9wZW5lZCB0aGUgY29udHJvbCBpbiBkaWFsb2cgc2hvdWxkIGJlIHRhcmdldClcbiAgICAgICAgZWxzZSBpZiAoc3RhdGUuZWRpdGFibGUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICBjb25zdCBhdHRycyA9IGlzVGFyZ2V0ID09PSB0cnVlID8gY29tYm9ib3hBdHRycy52YWx1ZSA6IHZvaWQgMFxuXG4gICAgICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgICAgIGgoJ2lucHV0Jywge1xuICAgICAgICAgICAgICByZWY6IGlzVGFyZ2V0ID09PSB0cnVlID8gdGFyZ2V0UmVmIDogdm9pZCAwLFxuICAgICAgICAgICAgICBrZXk6ICdkX3QnLFxuICAgICAgICAgICAgICBjbGFzczogJ3Etc2VsZWN0X19mb2N1cy10YXJnZXQnLFxuICAgICAgICAgICAgICBpZDogaXNUYXJnZXQgPT09IHRydWUgPyBzdGF0ZS50YXJnZXRVaWQudmFsdWUgOiB2b2lkIDAsXG4gICAgICAgICAgICAgIHZhbHVlOiBhcmlhQ3VycmVudFZhbHVlLnZhbHVlLFxuICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZSxcbiAgICAgICAgICAgICAgJ2RhdGEtYXV0b2ZvY3VzJzogZnJvbURpYWxvZyA9PT0gdHJ1ZSB8fCBwcm9wcy5hdXRvZm9jdXMgPT09IHRydWUgfHwgdm9pZCAwLFxuICAgICAgICAgICAgICAuLi5hdHRycyxcbiAgICAgICAgICAgICAgb25LZXlkb3duOiBvblRhcmdldEtleWRvd24sXG4gICAgICAgICAgICAgIG9uS2V5dXA6IG9uVGFyZ2V0S2V5dXAsXG4gICAgICAgICAgICAgIG9uS2V5cHJlc3M6IG9uVGFyZ2V0S2V5cHJlc3NcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKVxuXG4gICAgICAgICAgaWYgKGlzVGFyZ2V0ID09PSB0cnVlICYmIHR5cGVvZiBwcm9wcy5hdXRvY29tcGxldGUgPT09ICdzdHJpbmcnICYmIHByb3BzLmF1dG9jb21wbGV0ZS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgIGNoaWxkLnB1c2goXG4gICAgICAgICAgICAgIGgoJ2lucHV0Jywge1xuICAgICAgICAgICAgICAgIGNsYXNzOiAncS1zZWxlY3RfX2F1dG9jb21wbGV0ZS1pbnB1dCcsXG4gICAgICAgICAgICAgICAgYXV0b2NvbXBsZXRlOiBwcm9wcy5hdXRvY29tcGxldGUsXG4gICAgICAgICAgICAgICAgdGFiaW5kZXg6IC0xLFxuICAgICAgICAgICAgICAgIG9uS2V5dXA6IG9uVGFyZ2V0QXV0b2NvbXBsZXRlXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5hbWVQcm9wLnZhbHVlICE9PSB2b2lkIDAgJiYgcHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZSAmJiBpbm5lck9wdGlvbnNWYWx1ZS52YWx1ZS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICBjb25zdCBvcHRzID0gaW5uZXJPcHRpb25zVmFsdWUudmFsdWUubWFwKHZhbHVlID0+IGgoJ29wdGlvbicsIHsgdmFsdWUsIHNlbGVjdGVkOiB0cnVlIH0pKVxuXG4gICAgICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgICAgIGgoJ3NlbGVjdCcsIHtcbiAgICAgICAgICAgICAgY2xhc3M6ICdoaWRkZW4nLFxuICAgICAgICAgICAgICBuYW1lOiBuYW1lUHJvcC52YWx1ZSxcbiAgICAgICAgICAgICAgbXVsdGlwbGU6IHByb3BzLm11bHRpcGxlXG4gICAgICAgICAgICB9LCBvcHRzKVxuICAgICAgICAgIClcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGF0dHJzID0gcHJvcHMudXNlSW5wdXQgPT09IHRydWUgfHwgaXNUYXJnZXQgIT09IHRydWUgPyB2b2lkIDAgOiBzdGF0ZS5zcGxpdEF0dHJzLmF0dHJpYnV0ZXMudmFsdWVcblxuICAgICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS1maWVsZF9fbmF0aXZlIHJvdyBpdGVtcy1jZW50ZXInLFxuICAgICAgICAgIC4uLmF0dHJzLFxuICAgICAgICAgIC4uLnN0YXRlLnNwbGl0QXR0cnMubGlzdGVuZXJzLnZhbHVlXG4gICAgICAgIH0sIGNoaWxkKVxuICAgICAgfSxcblxuICAgICAgZ2V0SW5uZXJBcHBlbmQ6ICgpID0+IChcbiAgICAgICAgcHJvcHMubG9hZGluZyAhPT0gdHJ1ZSAmJiBpbm5lckxvYWRpbmdJbmRpY2F0b3IudmFsdWUgIT09IHRydWUgJiYgcHJvcHMuaGlkZURyb3Bkb3duSWNvbiAhPT0gdHJ1ZVxuICAgICAgICAgID8gW1xuICAgICAgICAgICAgICBoKFFJY29uLCB7XG4gICAgICAgICAgICAgICAgY2xhc3M6ICdxLXNlbGVjdF9fZHJvcGRvd24taWNvbicgKyAobWVudS52YWx1ZSA9PT0gdHJ1ZSA/ICcgcm90YXRlLTE4MCcgOiAnJyksXG4gICAgICAgICAgICAgICAgbmFtZTogZHJvcGRvd25BcnJvd0ljb24udmFsdWVcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF1cbiAgICAgICAgICA6IG51bGxcbiAgICAgIClcbiAgICB9KVxuXG4gICAgcmV0dXJuIHVzZUZpZWxkKHN0YXRlKVxuICB9XG59KVxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwibW9vZC1zZWxlY3RvclwiPlxuICAgIDxxLXNlbGVjdFxuICAgICAgdi1tb2RlbD1cInNlbGVjdGVkTW9vZFwiXG4gICAgICA6b3B0aW9ucz1cIm1vb2RPcHRpb25zXCJcbiAgICAgIGxhYmVsPVwiU2VsZWN0IFlvdXIgTW9vZFwiXG4gICAgICBAdXBkYXRlOm1vZGVsLXZhbHVlPVwib25Nb29kQ2hhbmdlXCJcbiAgICAgIGJlaGF2aW9yPVwibWVudVwiXG4gICAgICByb3VuZGVkXG4gICAgICBmaWxsZWRcbiAgICAgIHBvcHVwLWNvbnRlbnQtY2xhc3M9XCJwb3B1cC1zdHlsZS1jbGFzc1wiXG4gICAgICBiZy1jb2xvcj1cInNlY29uZGFyeVwiXG4gICAgICBkcm9wZG93bi1pY29uPVwiaW1nOmljb25zL1ZTVkcuc3ZnXCJcbiAgICA+XG4gICAgPC9xLXNlbGVjdD5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IHsgcmVmLCB3YXRjaCB9IGZyb20gJ3Z1ZSdcbmltcG9ydCB7IHVzZU1vb2RTdG9yZSB9IGZyb20gJ3NyYy9zdG9yZXMvbW9vZFN0b3JlJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdNb29kU2VsZWN0b3InLFxuICBzZXR1cCgpIHtcbiAgICBjb25zdCBtb29kU3RvcmUgPSB1c2VNb29kU3RvcmUoKVxuICAgIC8vIERlZmF1bHQgdG8gXCJEZWZhdWx0XCIgaWYgbm90IHNldFxuICAgIGNvbnN0IHNlbGVjdGVkTW9vZCA9IHJlZihtb29kU3RvcmUuY3VycmVudE1vb2QgPyBtb29kU3RvcmUuY3VycmVudE1vb2QubmFtZSA6ICdOZXV0cmFsJykgLy8gZmFsbGJhY2sgZGVmYXVsdCBtb29kXG5cbiAgICAvLyBMb2cgaW5pdGlhbCBzdGF0ZVxuICAgIGNvbnNvbGUubG9nKCdbTW9vZFNlbGVjdG9yXSBJbml0aWFsIHNlbGVjdGVkTW9vZDonLCBzZWxlY3RlZE1vb2QudmFsdWUpXG4gICAgY29uc29sZS5sb2coJ1tNb29kU2VsZWN0b3JdIG1vb2RPcHRpb25zOicsIG1vb2RTdG9yZS5tb29kT3B0aW9ucylcblxuICAgIC8vIFdhdGNoIHRoZSBsb2NhbCBzZWxlY3RlZE1vb2QgdmFsdWVcbiAgICB3YXRjaChzZWxlY3RlZE1vb2QsIChuZXdWYWwpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdbTW9vZFNlbGVjdG9yXSBzZWxlY3RlZE1vb2QgY2hhbmdlZCB0bzonLCBuZXdWYWwpXG4gICAgfSlcblxuICAgIC8vIFdoZW4gdGhlIHNlbGVjdGlvbiBjaGFuZ2VzLCB1cGRhdGUgdGhlIHN0b3JlXG4gICAgY29uc3Qgb25Nb29kQ2hhbmdlID0gKG1vb2QpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdbTW9vZFNlbGVjdG9yXSBvbk1vb2RDaGFuZ2UgY2FsbGVkIHdpdGg6JywgbW9vZClcbiAgICAgIGNvbnN0IG1vb2ROYW1lID0gbW9vZC52YWx1ZSAvLyBFeHRyYWN0IG9ubHkgdGhlIHN0cmluZyBuYW1lXG4gICAgICBjb25zb2xlLmxvZygnW01vb2RTZWxlY3Rvcl0gRXh0cmFjdGVkIG1vb2ROYW1lOicsIG1vb2ROYW1lKVxuICAgICAgbW9vZFN0b3JlLnNldE1vb2QobW9vZE5hbWUpXG4gICAgICBjb25zb2xlLmxvZygnW01vb2RTZWxlY3Rvcl0gbW9vZFN0b3JlLmN1cnJlbnRNb29kIGFmdGVyIHNldE1vb2Q6JywgbW9vZFN0b3JlLmN1cnJlbnRNb29kKVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBzZWxlY3RlZE1vb2QsXG4gICAgICBtb29kT3B0aW9uczogbW9vZFN0b3JlLm1vb2RPcHRpb25zLFxuICAgICAgb25Nb29kQ2hhbmdlLFxuICAgIH1cbiAgfSxcbn1cbjwvc2NyaXB0PlxuXG48c3R5bGU+XG4ubW9vZC1zZWxlY3RvciB7XG4gIHdpZHRoOiA2NXZ3O1xuICBtYXJnaW4tYm90dG9tOiAzMHB4O1xufVxuLnBvcHVwLXN0eWxlLWNsYXNzIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFhMWExYTtcbiAgY29sb3I6IHdoaXRlO1xuICBib3JkZXItcmFkaXVzOiA1MHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8cS1sYXlvdXQgdmlldz1cImxIaCBMcHIgbEZmXCI+XG4gICAgPHEtZm9vdGVyIHJldmVhbCBlbGV2YXRlZCA6Y2xhc3M9XCJbJ2hlYWRlci1zdHlsZScsICdzaGFkb3ctdXAtMTAnXVwiPlxuICAgICAgPGRpdiBjbGFzcz1cIm1vb2Qtc2VsZWN0b3ItY29udGFpbmVyXCI+XG4gICAgICAgIDxNb29kU2VsZWN0b3IgLz5cbiAgICAgIDwvZGl2PlxuICAgICAgPHEtdG9vbGJhcj5cbiAgICAgICAgPHEtdG9vbGJhci10aXRsZSBzdHlsZT1cInRleHQtc2hhZG93OiAxcHggMXB4IGJsYWNrXCI+XG4gICAgICAgICAgPHEtaW1nIGNsYXNzPVwiaGVhZGVyLXRleHRcIiBzcmM9XCIvaWNvbnMvdmFsZW5jZTYucG5nXCIgLz5cbiAgICAgICAgPC9xLXRvb2xiYXItdGl0bGU+XG4gICAgICAgIDxxLWJ0biByb3VuZCBkZW5zZSByaXBwbGUgQGNsaWNrPVwidG9nZ2xlUmlnaHREcmF3ZXJcIj5cbiAgICAgICAgICA8cS1hdmF0YXIgc2l6ZT1cIjQwcHhcIj48aW1nIHNyYz1cIi9pY29ucy9WU1ZHLnN2Z1wiIC8+PC9xLWF2YXRhclxuICAgICAgICA+PC9xLWJ0bj5cbiAgICAgIDwvcS10b29sYmFyPlxuICAgIDwvcS1mb290ZXI+XG5cbiAgICA8cS1kcmF3ZXJcbiAgICAgIHYtbW9kZWw9XCJyaWdodERyYXdlck9wZW5cIlxuICAgICAgc2lkZT1cInJpZ2h0XCJcbiAgICAgIDpjbGFzcz1cIlsnZHJhdy1jbGFzcy1zdHlsZScsICdzaGFkb3ctOCddXCJcbiAgICAgIGJvcmRlcmVkXG4gICAgPlxuICAgICAgPHEtbGlzdD5cbiAgICAgICAgPHEtaXRlbS1sYWJlbCBoZWFkZXI+IEVzc2VudGlhbCBMaW5rcyA8L3EtaXRlbS1sYWJlbD5cblxuICAgICAgICA8RXNzZW50aWFsTGluayB2LWZvcj1cImxpbmsgaW4gbGlua3NMaXN0XCIgOmtleT1cImxpbmsudGl0bGVcIiB2LWJpbmQ9XCJsaW5rXCIgLz5cbiAgICAgIDwvcS1saXN0PlxuICAgIDwvcS1kcmF3ZXI+XG5cbiAgICA8cS1wYWdlLWNvbnRhaW5lcj5cbiAgICAgIDxyb3V0ZXItdmlldyAvPlxuICAgIDwvcS1wYWdlLWNvbnRhaW5lcj5cbiAgPC9xLWxheW91dD5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyByZWYsIG9uTW91bnRlZCB9IGZyb20gJ3Z1ZSdcbmltcG9ydCBFc3NlbnRpYWxMaW5rIGZyb20gJ2NvbXBvbmVudHMvRXNzZW50aWFsTGluay52dWUnXG5pbXBvcnQgTW9vZFNlbGVjdG9yIGZyb20gJ2NvbXBvbmVudHMvTW9vZFNlbGVjdG9yLnZ1ZSdcblxub25Nb3VudGVkKCgpID0+IHtcbiAgLy8gU2FmYXJpIHJlcXVpcmVzIHVzZXIgaW50ZXJhY3Rpb24gdG8gaW5pdGlhbGl6ZSBhdWRpb1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgICdjbGljaycsXG4gICAgKCkgPT4ge1xuICAgICAgY29uc3QgYXVkaW9Db250ZXh0ID0gbmV3ICh3aW5kb3cuQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQpKClcbiAgICAgIGF1ZGlvQ29udGV4dC5zdXNwZW5kKClcbiAgICB9LFxuICAgIHsgb25jZTogdHJ1ZSB9LFxuICApXG59KVxuXG5jb25zdCBsaW5rc0xpc3QgPSBbXG4gIHtcbiAgICB0aXRsZTogJ0RvY3MnLFxuICAgIGNhcHRpb246ICdxdWFzYXIuZGV2JyxcbiAgICBpY29uOiAnc2Nob29sJyxcbiAgICBsaW5rOiAnaHR0cHM6Ly9xdWFzYXIuZGV2JyxcbiAgfSxcbiAge1xuICAgIHRpdGxlOiAnR2l0aHViJyxcbiAgICBjYXB0aW9uOiAnZ2l0aHViLmNvbS9xdWFzYXJmcmFtZXdvcmsnLFxuICAgIGljb246ICdjb2RlJyxcbiAgICBsaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL3F1YXNhcmZyYW1ld29yaycsXG4gIH0sXG4gIHtcbiAgICB0aXRsZTogJ0Rpc2NvcmQgQ2hhdCBDaGFubmVsJyxcbiAgICBjYXB0aW9uOiAnY2hhdC5xdWFzYXIuZGV2JyxcbiAgICBpY29uOiAnY2hhdCcsXG4gICAgbGluazogJ2h0dHBzOi8vY2hhdC5xdWFzYXIuZGV2JyxcbiAgfSxcbiAge1xuICAgIHRpdGxlOiAnRm9ydW0nLFxuICAgIGNhcHRpb246ICdmb3J1bS5xdWFzYXIuZGV2JyxcbiAgICBpY29uOiAncmVjb3JkX3ZvaWNlX292ZXInLFxuICAgIGxpbms6ICdodHRwczovL2ZvcnVtLnF1YXNhci5kZXYnLFxuICB9LFxuICB7XG4gICAgdGl0bGU6ICdUd2l0dGVyJyxcbiAgICBjYXB0aW9uOiAnQHF1YXNhcmZyYW1ld29yaycsXG4gICAgaWNvbjogJ3Jzc19mZWVkJyxcbiAgICBsaW5rOiAnaHR0cHM6Ly90d2l0dGVyLnF1YXNhci5kZXYnLFxuICB9LFxuICB7XG4gICAgdGl0bGU6ICdGYWNlYm9vaycsXG4gICAgY2FwdGlvbjogJ0BRdWFzYXJGcmFtZXdvcmsnLFxuICAgIGljb246ICdwdWJsaWMnLFxuICAgIGxpbms6ICdodHRwczovL2ZhY2Vib29rLnF1YXNhci5kZXYnLFxuICB9LFxuICB7XG4gICAgdGl0bGU6ICdRdWFzYXIgQXdlc29tZScsXG4gICAgY2FwdGlvbjogJ0NvbW11bml0eSBRdWFzYXIgcHJvamVjdHMnLFxuICAgIGljb246ICdmYXZvcml0ZScsXG4gICAgbGluazogJ2h0dHBzOi8vYXdlc29tZS5xdWFzYXIuZGV2JyxcbiAgfSxcbl1cblxuY29uc3QgcmlnaHREcmF3ZXJPcGVuID0gcmVmKGZhbHNlKVxuXG5mdW5jdGlvbiB0b2dnbGVSaWdodERyYXdlcigpIHtcbiAgcmlnaHREcmF3ZXJPcGVuLnZhbHVlID0gIXJpZ2h0RHJhd2VyT3Blbi52YWx1ZVxufVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiPlxuLmhlYWRlci1zdHlsZSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMxYTFhMWE7XG59XG5cbi5oZWFkZXItdGV4dCB7XG4gIG1heC13aWR0aDogMzk0cHg7XG4gIG1heC1oZWlnaHQ6IDU0cHg7XG4gIHVzZXItc2VsZWN0OiBub25lO1xuICBmaWx0ZXI6IGRyb3Atc2hhZG93KDFweCAycHggMnB4IHJnYmEoMCwgMCwgMCwgMSkpO1xuICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gIG1hcmdpbjogMnB4IGF1dG87XG59XG5cbi5sb2dvLXN0eWxlIHtcbiAgbWF4LXdpZHRoOiAxODVweDtcbiAgbWF4LWhlaWdodDogMTQ1cHg7XG59XG5cbi5tb29kLXNlbGVjdG9yLWNvbnRhaW5lciB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAtNTZweDsgLyogQWRqdXN0IGJhc2VkIG9uIGRlc2lyZWQgcGxhY2VtZW50ICovXG4gIGxlZnQ6IDA7XG4gIHJpZ2h0OiAwO1xuICBtYXJnaW46IGF1dG87XG4gIHdpZHRoOiBmaXQtY29udGVudDtcbiAgei1pbmRleDogMTA7XG59XG5cbi5kcmF3LWNsYXNzLXN0eWxlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogJHByaW1hcnk7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgdGV4dC1zaGFkb3c6IDFweCAxcHggMXB4IGJsYWNrO1xufVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJzaXplIiwidHJpZ2dlciIsInN0b3AiLCJvZmZzZXQiLCJjc3MiLCJwb3NpdGlvbiIsInRhcmdldCIsInVpZCIsInZhbHVlIiwic3R5bGUiLCJoZWlnaHQiLCJ3aWR0aCIsIm9uS2V5dXAiLCJfY3JlYXRlQmxvY2siLCJfd2l0aEN0eCIsIl9jcmVhdGVWTm9kZSIsIl9jcmVhdGVDb21tZW50Vk5vZGUiLCJfY3JlYXRlVGV4dFZOb2RlIiwiX3RvRGlzcGxheVN0cmluZyIsInVwZGF0ZSIsImhhbmRsZXJzIiwicG9ydGFsSW5kZXgiLCJoIiwiZWwiLCJvcHRpb25JbmRleCIsImF0dHJzIiwiX3NmY19tYWluIiwiX2hvaXN0ZWRfMSIsIl9vcGVuQmxvY2siLCJfY3JlYXRlRWxlbWVudEJsb2NrIiwiX25vcm1hbGl6ZUNsYXNzIiwiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl9GcmFnbWVudCIsIl9yZW5kZXJMaXN0IiwiX21lcmdlUHJvcHMiXSwibWFwcGluZ3MiOiI7OztBQUtBLE1BQUEsZ0JBQWUsZ0JBQWdCO0FBQUEsRUFDN0IsTUFBTTtBQUFBLEVBRU4sT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLEVBQ1Q7QUFBQSxFQUVELE1BQU8sT0FBTyxFQUFFLFNBQVM7QUFDdkIsVUFBTSxVQUFVO0FBQUEsTUFBUyxNQUN2QiwrQkFDRyxNQUFNLFdBQVcsT0FBTyxnQkFBZ0I7QUFBQSxJQUNqRDtBQUVJLFdBQU8sTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLFFBQVEsU0FBUyxNQUFNLE1BQU0sT0FBTyxDQUFDO0FBQUEsRUFDeEU7QUFDQSxDQUFDO0FDWEQsTUFBQSxVQUFlLGdCQUFnQjtBQUFBLEVBQzdCLE1BQU07QUFBQSxFQUVOLE9BQU87QUFBQSxJQUNMLEdBQUc7QUFBQSxJQUVILFVBQVU7QUFBQSxJQUVWLE9BQU87QUFBQSxJQUNQLFdBQVc7QUFBQSxJQUVYLE1BQU07QUFBQSxJQUNOLFFBQVE7QUFBQSxJQUNSLFNBQVM7QUFBQSxFQUNWO0FBQUEsRUFFRCxNQUFPLE9BQU8sRUFBRSxTQUFTO0FBQ3ZCLFVBQU0sWUFBWSxRQUFR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QSxNQUFBLE9BQUEsQ0FBQSxJQUFBLFlBaUJlLE9BQWUsa0JBQUE7QUFBQSxRQUN4QixNQUFLO0FBQUEsUUFDSixPQW5CUGUsZUFtQmMsQ0FBZ0Msb0JBQUEsVUFBQSxDQUFBO0FBQUEsUUFDeEMsVUFBQTtBQUFBO1FBcEJOLFNBQUFoQixRQXNCTSxNQUlTO0FBQUEsVUFKVEMsWUFJUyxPQUFBLE1BQUE7QUFBQSxZQTFCZixTQUFBRCxRQXVCUSxNQUFxRDtBQUFBLGNBQXJEQyxZQUFxRCxZQUFBLEVBQUEsUUFBQSxHQUFBLEdBQWpDO0FBQUEsZ0JBdkI1QixTQUFBRCxRQXVCNkIsTUFBaUIsT0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLElBQUE7QUFBQSxrQkF2QjlDRyxnQkF1QjZCLG1CQUFpQjtBQUFBO2dCQXZCOUMsR0FBQTtBQUFBO2VBeUJRVyxVQUFBLEdBQUFDLG1CQUEyRUcsVUF6Qm5GLE1BQUFDLFdBeUJzQyxPQUFTLFdBekIvQyxDQXlCOEIsU0FBSTtBQUExQix1QkFBQWxCLFlBQTJFLHlCQUEzRW1CLFdBQTJFO0FBQUEsa0JBQWpDLEtBQUssS0FBSztBQUFBLGtCQXpCNUQsU0FBQTtBQUFBLG1CQXlCMkUsSUFBSSxHQUFBLE1BQUEsRUFBQTtBQUFBOztZQXpCL0UsR0FBQTtBQUFBOztRQUFBLEdBQUE7QUFBQTtNQTZCSW5CLFlBRW1CLGdCQUFBLE1BQUE7QUFBQSxRQS9CdkIsU0FBQUQsUUE4Qk0sTUFBZTtBQUFBLFVBQWZDLFlBQWUsc0JBQUE7QUFBQTtRQTlCckIsR0FBQTtBQUFBOztJQUFBLEdBQUE7QUFBQTs7OyIsInhfZ29vZ2xlX2lnbm9yZUxpc3QiOlswLDEsMiwzLDQsNSw2LDcsOCw5LDEwLDExLDEyLDEzLDE0LDE1LDE2LDE3LDE4LDE5LDIwLDIxLDIyLDI0LDI1LDI2LDI3LDI4LDI5LDMwLDMxLDMyLDMzLDM0LDM1LDM2LDM3LDM4LDM5LDQwLDQxLDQyLDQzLDQ0LDQ1LDQ2LDQ3LDQ4LDQ5LDUwXX0=
