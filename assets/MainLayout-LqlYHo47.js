import { c as createComponent, a as computed, h, b as hSlot, g as getCurrentInstance, i as inject, e as emptyRenderFn, l as layoutKey, r as ref, w as watch, o as onBeforeUnmount, d as hUniqueSlot, f as createDirective, j as cleanEvt, k as client, p as preventDraggable, n as noop, m as addEvt, q as position, s as prevent, t as stop, u as leftClick, v as stopAndPrevent, x as useModelToggleEmits, y as useDarkProps, z as useModelToggleProps, A as useDark, B as useTimeout, C as useModelToggle, D as useHistory, E as usePreventScroll, F as nextTick, G as between, H as onMounted, I as withDirectives, J as hDir, K as provide, L as pageContainerKey, M as listenOpts, N as scrollTargetProp, O as getScrollTarget, P as getVerticalScrollPosition, Q as getHorizontalScrollPosition, R as getScrollbarWidth, S as isRuntimeSsrPreHydration, T as reactive, U as onUnmounted, V as hMergeSlot, W as debounce, X as setHorizontalScrollPosition, Y as onDeactivated, Z as onActivated, _ as setVerticalScrollPosition, $ as _export_sfc, a0 as createElementBlock, a1 as openBlock, a2 as createBaseVNode, a3 as createStaticVNode, a4 as createVNode, a5 as withCtx, a6 as toDisplayString, a7 as QCard, a8 as Fragment, a9 as renderList, aa as createCommentVNode, ab as normalizeClass, ac as createTextVNode, ad as QBtn, ae as createBlock, af as QCardSection, ag as withModifiers, ah as QIcon, ai as useQuasar, aj as resolveComponent, ak as QDialog, al as QSeparator, am as QSpinner, an as QToggle, ao as QAjaxBar } from "./index-DtVXev-T.js";
import { Q as QTooltip } from "./QTooltip-WXxOS_PO.js";
import { Q as QResizeObserver, g as getModifierDirections, s as shouldStart, c as clearSelection, a as QChip, b as QSelect, u as useScheduleStore, d as QSpace, C as ClosePopup, e as apiService } from "./QSelect-DP4GbAuv.js";
import { Q as QCircularProgress } from "./QCircularProgress-BnxIZAAI.js";
import { Q as QLinearProgress } from "./QLinearProgress-CacIPfM1.js";
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
const QHeader = createComponent({
  name: "QHeader",
  props: {
    modelValue: {
      type: Boolean,
      default: true
    },
    reveal: Boolean,
    revealOffset: {
      type: Number,
      default: 250
    },
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
      console.error("QHeader needs to be child of QLayout");
      return emptyRenderFn;
    }
    const size = ref(parseInt(props.heightHint, 10));
    const revealed = ref(true);
    const fixed = computed(
      () => props.reveal === true || $layout.view.value.indexOf("H") !== -1 || $q.platform.is.ios && $layout.isContainer.value === true
    );
    const offset = computed(() => {
      if (props.modelValue !== true) {
        return 0;
      }
      if (fixed.value === true) {
        return revealed.value === true ? size.value : 0;
      }
      const offset2 = size.value - $layout.scroll.value.position;
      return offset2 > 0 ? offset2 : 0;
    });
    const hidden = computed(
      () => props.modelValue !== true || fixed.value === true && revealed.value !== true
    );
    const revealOnFocus = computed(
      () => props.modelValue === true && hidden.value === true && props.reveal === true
    );
    const classes = computed(
      () => "q-header q-layout__section--marginal " + (fixed.value === true ? "fixed" : "absolute") + "-top" + (props.bordered === true ? " q-header--bordered" : "") + (hidden.value === true ? " q-header--hidden" : "") + (props.modelValue !== true ? " q-layout--prevent-focus" : "")
    );
    const style = computed(() => {
      const view = $layout.rows.value.top, css = {};
      if (view[0] === "l" && $layout.left.space === true) {
        css[$q.lang.rtl === true ? "right" : "left"] = `${$layout.left.size}px`;
      }
      if (view[2] === "r" && $layout.right.space === true) {
        css[$q.lang.rtl === true ? "left" : "right"] = `${$layout.right.size}px`;
      }
      return css;
    });
    function updateLayout(prop, val) {
      $layout.update("header", prop, val);
    }
    function updateLocal(prop, val) {
      if (prop.value !== val) {
        prop.value = val;
      }
    }
    function onResize({ height }) {
      updateLocal(size, height);
      updateLayout("size", height);
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
    watch($layout.scroll, (scroll) => {
      props.reveal === true && updateLocal(
        revealed,
        scroll.direction === "up" || scroll.position <= props.revealOffset || scroll.position - scroll.inflectionPoint < 100
      );
    });
    const instance = {};
    $layout.instances.header = instance;
    props.modelValue === true && updateLayout("size", size.value);
    updateLayout("space", props.modelValue);
    updateLayout("offset", offset.value);
    onBeforeUnmount(() => {
      if ($layout.instances.header === instance) {
        $layout.instances.header = void 0;
        updateLayout("size", 0);
        updateLayout("offset", 0);
        updateLayout("space", false);
      }
    });
    return () => {
      const child = hUniqueSlot(slots.default, []);
      props.elevated === true && child.push(
        h("div", {
          class: "q-layout__shadow absolute-full overflow-hidden no-pointer-events"
        })
      );
      child.push(
        h(QResizeObserver, {
          debounce: 0,
          onResize
        })
      );
      return h("header", {
        class: classes.value,
        style: style.value,
        onFocusin
      }, child);
    };
  }
});
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
let uid = 0;
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
        uid: "qvtp_" + uid++,
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
            const target = evt.target;
            addEvt(ctx, "temp", [
              [target, "touchmove", "move", "notPassiveCapture"],
              [target, "touchcancel", "end", "passiveCapture"],
              [target, "touchend", "end", "passiveCapture"]
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
    const size = computed(() => isMini.value === true ? props.miniWidth : props.width);
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
      applyPosition(stateDirection.value * size.value);
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
      size.value * stateDirection.value
    );
    const otherSide = computed(() => rightSide.value === true ? "left" : "right");
    const offset = computed(() => showing.value === true && belowBreakpoint.value === false && props.overlay === false ? props.miniToOverlay === true ? props.miniWidth : size.value : 0);
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
      const css = {};
      if ($layout.header.space === true && headerSlot.value === false) {
        if (fixed.value === true) {
          css.top = `${$layout.header.offset}px`;
        } else if ($layout.header.space === true) {
          css.top = `${$layout.header.size}px`;
        }
      }
      if ($layout.footer.space === true && footerSlot.value === false) {
        if (fixed.value === true) {
          css.bottom = `${$layout.footer.offset}px`;
        } else if ($layout.footer.space === true) {
          css.bottom = `${$layout.footer.size}px`;
        }
      }
      return css;
    });
    const style = computed(() => {
      const style2 = {
        width: `${size.value}px`,
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
      $layout[newSide].size = size.value;
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
    watch(size, (val) => {
      applyPosition();
      updateSizeOnLayout(props.miniToOverlay, val);
    });
    watch(() => props.miniToOverlay, (val) => {
      updateSizeOnLayout(val, size.value);
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
          position2 = showing.value === true ? 0 : size.value;
          applyPosition(stateDirection.value * position2);
        });
      } else {
        if ($layout.isContainer.value === true && rightSide.value === true && (belowBreakpoint.value === true || Math.abs(position2) === size.value)) {
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
      const width = size.value, position2 = between(evt.distance.x, 0, width);
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
      const width = size.value, dir = evt.direction === props.side, position2 = ($q.lang.rtl === true ? dir !== true : dir) ? between(evt.distance.x, 0, width) : 0;
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
    function updateSizeOnLayout(miniToOverlay, size2) {
      updateLayout("size", miniToOverlay === true ? props.miniWidth : size2);
    }
    $layout.instances[props.side] = instance;
    updateSizeOnLayout(props.miniToOverlay, size.value);
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
      const css = {};
      if ($layout.header.space === true) {
        css.paddingTop = `${$layout.header.size}px`;
      }
      if ($layout.right.space === true) {
        css[`padding${$q.lang.rtl === true ? "Left" : "Right"}`] = `${$layout.right.size}px`;
      }
      if ($layout.footer.space === true) {
        css.paddingBottom = `${$layout.footer.size}px`;
      }
      if ($layout.left.space === true) {
        css[`padding${$q.lang.rtl === true ? "Right" : "Left"}`] = `${$layout.left.size}px`;
      }
      return css;
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
      localScrollTarget.addEventListener("scroll", trigger, passive);
      trigger(true);
    }
    function unconfigureScrollTarget() {
      if (localScrollTarget !== void 0) {
        localScrollTarget.removeEventListener("scroll", trigger, passive);
        localScrollTarget = void 0;
      }
    }
    function trigger(immediately) {
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
      trigger,
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
const ScrollAreaControls = createComponent({
  props: [
    "store",
    "barStyle",
    "verticalBarStyle",
    "horizontalBarStyle"
  ],
  setup(props) {
    return () => [
      h("div", {
        class: props.store.scroll.vertical.barClass.value,
        style: [props.barStyle, props.verticalBarStyle],
        "aria-hidden": "true",
        onMousedown: props.store.onVerticalMousedown
      }),
      h("div", {
        class: props.store.scroll.horizontal.barClass.value,
        style: [props.barStyle, props.horizontalBarStyle],
        "aria-hidden": "true",
        onMousedown: props.store.onHorizontalMousedown
      }),
      withDirectives(
        h("div", {
          ref: props.store.scroll.vertical.ref,
          class: props.store.scroll.vertical.thumbClass.value,
          style: props.store.scroll.vertical.style.value,
          "aria-hidden": "true"
        }),
        props.store.thumbVertDir
      ),
      withDirectives(
        h("div", {
          ref: props.store.scroll.horizontal.ref,
          class: props.store.scroll.horizontal.thumbClass.value,
          style: props.store.scroll.horizontal.style.value,
          "aria-hidden": "true"
        }),
        props.store.thumbHorizDir
      )
    ];
  }
});
const axisList = ["vertical", "horizontal"];
const dirProps = {
  vertical: { offset: "offsetY", scroll: "scrollTop", dir: "down", dist: "y" },
  horizontal: { offset: "offsetX", scroll: "scrollLeft", dir: "right", dist: "x" }
};
const panOpts = {
  prevent: true,
  mouse: true,
  mouseAllDir: true
};
const getMinThumbSize = (size) => size >= 250 ? 50 : Math.ceil(size / 5);
const QScrollArea = createComponent({
  name: "QScrollArea",
  props: {
    ...useDarkProps,
    thumbStyle: Object,
    verticalThumbStyle: Object,
    horizontalThumbStyle: Object,
    barStyle: [Array, String, Object],
    verticalBarStyle: [Array, String, Object],
    horizontalBarStyle: [Array, String, Object],
    verticalOffset: {
      type: Array,
      default: [0, 0]
    },
    horizontalOffset: {
      type: Array,
      default: [0, 0]
    },
    contentStyle: [Array, String, Object],
    contentActiveStyle: [Array, String, Object],
    delay: {
      type: [String, Number],
      default: 1e3
    },
    visible: {
      type: Boolean,
      default: null
    },
    tabindex: [String, Number],
    onScroll: Function
  },
  setup(props, { slots, emit }) {
    const tempShowing = ref(false);
    const panning = ref(false);
    const hover = ref(false);
    const container = {
      vertical: ref(0),
      horizontal: ref(0)
    };
    const scroll = {
      vertical: {
        ref: ref(null),
        position: ref(0),
        size: ref(0)
      },
      horizontal: {
        ref: ref(null),
        position: ref(0),
        size: ref(0)
      }
    };
    const { proxy } = getCurrentInstance();
    const isDark = useDark(props, proxy.$q);
    let timer = null, panRefPos;
    const targetRef = ref(null);
    const classes = computed(
      () => "q-scrollarea" + (isDark.value === true ? " q-scrollarea--dark" : "")
    );
    Object.assign(container, {
      verticalInner: computed(() => container.vertical.value - props.verticalOffset[0] - props.verticalOffset[1]),
      horizontalInner: computed(() => container.horizontal.value - props.horizontalOffset[0] - props.horizontalOffset[1])
    });
    scroll.vertical.percentage = computed(() => {
      const diff = scroll.vertical.size.value - container.vertical.value;
      if (diff <= 0) {
        return 0;
      }
      const p = between(scroll.vertical.position.value / diff, 0, 1);
      return Math.round(p * 1e4) / 1e4;
    });
    scroll.vertical.thumbHidden = computed(() => (props.visible === null ? hover.value : props.visible) !== true && tempShowing.value === false && panning.value === false || scroll.vertical.size.value <= container.vertical.value + 1);
    scroll.vertical.thumbStart = computed(() => props.verticalOffset[0] + scroll.vertical.percentage.value * (container.verticalInner.value - scroll.vertical.thumbSize.value));
    scroll.vertical.thumbSize = computed(
      () => Math.round(
        between(
          container.verticalInner.value * container.verticalInner.value / scroll.vertical.size.value,
          getMinThumbSize(container.verticalInner.value),
          container.verticalInner.value
        )
      )
    );
    scroll.vertical.style = computed(() => ({
      ...props.thumbStyle,
      ...props.verticalThumbStyle,
      top: `${scroll.vertical.thumbStart.value}px`,
      height: `${scroll.vertical.thumbSize.value}px`,
      right: `${props.horizontalOffset[1]}px`
    }));
    scroll.vertical.thumbClass = computed(() => "q-scrollarea__thumb q-scrollarea__thumb--v absolute-right" + (scroll.vertical.thumbHidden.value === true ? " q-scrollarea__thumb--invisible" : ""));
    scroll.vertical.barClass = computed(() => "q-scrollarea__bar q-scrollarea__bar--v absolute-right" + (scroll.vertical.thumbHidden.value === true ? " q-scrollarea__bar--invisible" : ""));
    scroll.horizontal.percentage = computed(() => {
      const diff = scroll.horizontal.size.value - container.horizontal.value;
      if (diff <= 0) {
        return 0;
      }
      const p = between(Math.abs(scroll.horizontal.position.value) / diff, 0, 1);
      return Math.round(p * 1e4) / 1e4;
    });
    scroll.horizontal.thumbHidden = computed(() => (props.visible === null ? hover.value : props.visible) !== true && tempShowing.value === false && panning.value === false || scroll.horizontal.size.value <= container.horizontal.value + 1);
    scroll.horizontal.thumbStart = computed(() => props.horizontalOffset[0] + scroll.horizontal.percentage.value * (container.horizontalInner.value - scroll.horizontal.thumbSize.value));
    scroll.horizontal.thumbSize = computed(
      () => Math.round(
        between(
          container.horizontalInner.value * container.horizontalInner.value / scroll.horizontal.size.value,
          getMinThumbSize(container.horizontalInner.value),
          container.horizontalInner.value
        )
      )
    );
    scroll.horizontal.style = computed(() => ({
      ...props.thumbStyle,
      ...props.horizontalThumbStyle,
      [proxy.$q.lang.rtl === true ? "right" : "left"]: `${scroll.horizontal.thumbStart.value}px`,
      width: `${scroll.horizontal.thumbSize.value}px`,
      bottom: `${props.verticalOffset[1]}px`
    }));
    scroll.horizontal.thumbClass = computed(() => "q-scrollarea__thumb q-scrollarea__thumb--h absolute-bottom" + (scroll.horizontal.thumbHidden.value === true ? " q-scrollarea__thumb--invisible" : ""));
    scroll.horizontal.barClass = computed(() => "q-scrollarea__bar q-scrollarea__bar--h absolute-bottom" + (scroll.horizontal.thumbHidden.value === true ? " q-scrollarea__bar--invisible" : ""));
    const mainStyle = computed(() => scroll.vertical.thumbHidden.value === true && scroll.horizontal.thumbHidden.value === true ? props.contentStyle : props.contentActiveStyle);
    function getScroll() {
      const info = {};
      axisList.forEach((axis) => {
        const data = scroll[axis];
        Object.assign(info, {
          [axis + "Position"]: data.position.value,
          [axis + "Percentage"]: data.percentage.value,
          [axis + "Size"]: data.size.value,
          [axis + "ContainerSize"]: container[axis].value,
          [axis + "ContainerInnerSize"]: container[axis + "Inner"].value
        });
      });
      return info;
    }
    const emitScroll = debounce(() => {
      const info = getScroll();
      info.ref = proxy;
      emit("scroll", info);
    }, 0);
    function localSetScrollPosition(axis, offset, duration2) {
      if (axisList.includes(axis) === false) {
        console.error("[QScrollArea]: wrong first param of setScrollPosition (vertical/horizontal)");
        return;
      }
      const fn = axis === "vertical" ? setVerticalScrollPosition : setHorizontalScrollPosition;
      fn(targetRef.value, offset, duration2);
    }
    function updateContainer({ height, width }) {
      let change = false;
      if (container.vertical.value !== height) {
        container.vertical.value = height;
        change = true;
      }
      if (container.horizontal.value !== width) {
        container.horizontal.value = width;
        change = true;
      }
      change === true && startTimer();
    }
    function updateScroll({ position: position2 }) {
      let change = false;
      if (scroll.vertical.position.value !== position2.top) {
        scroll.vertical.position.value = position2.top;
        change = true;
      }
      if (scroll.horizontal.position.value !== position2.left) {
        scroll.horizontal.position.value = position2.left;
        change = true;
      }
      change === true && startTimer();
    }
    function updateScrollSize({ height, width }) {
      if (scroll.horizontal.size.value !== width) {
        scroll.horizontal.size.value = width;
        startTimer();
      }
      if (scroll.vertical.size.value !== height) {
        scroll.vertical.size.value = height;
        startTimer();
      }
    }
    function onPanThumb(e, axis) {
      const data = scroll[axis];
      if (e.isFirst === true) {
        if (data.thumbHidden.value === true) return;
        panRefPos = data.position.value;
        panning.value = true;
      } else if (panning.value !== true) {
        return;
      }
      if (e.isFinal === true) {
        panning.value = false;
      }
      const dProp = dirProps[axis];
      const multiplier = (data.size.value - container[axis].value) / (container[axis + "Inner"].value - data.thumbSize.value);
      const distance = e.distance[dProp.dist];
      const pos = panRefPos + (e.direction === dProp.dir ? 1 : -1) * distance * multiplier;
      setScroll(pos, axis);
    }
    function onMousedown(evt, axis) {
      const data = scroll[axis];
      if (data.thumbHidden.value !== true) {
        const startOffset = axis === "vertical" ? props.verticalOffset[0] : props.horizontalOffset[0];
        const offset = evt[dirProps[axis].offset] - startOffset;
        const thumbStart = data.thumbStart.value - startOffset;
        if (offset < thumbStart || offset > thumbStart + data.thumbSize.value) {
          const targetThumbStart = offset - data.thumbSize.value / 2;
          const percentage = between(targetThumbStart / (container[axis + "Inner"].value - data.thumbSize.value), 0, 1);
          setScroll(percentage * Math.max(0, data.size.value - container[axis].value), axis);
        }
        if (data.ref.value !== null) {
          data.ref.value.dispatchEvent(new MouseEvent(evt.type, evt));
        }
      }
    }
    function startTimer() {
      tempShowing.value = true;
      timer !== null && clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        tempShowing.value = false;
      }, props.delay);
      props.onScroll !== void 0 && emitScroll();
    }
    function setScroll(offset, axis) {
      targetRef.value[dirProps[axis].scroll] = offset;
    }
    let mouseEventTimer = null;
    function onMouseenter() {
      if (mouseEventTimer !== null) {
        clearTimeout(mouseEventTimer);
      }
      mouseEventTimer = setTimeout(() => {
        mouseEventTimer = null;
        hover.value = true;
      }, proxy.$q.platform.is.ios ? 50 : 0);
    }
    function onMouseleave() {
      if (mouseEventTimer !== null) {
        clearTimeout(mouseEventTimer);
        mouseEventTimer = null;
      }
      hover.value = false;
    }
    let scrollPosition = null;
    watch(() => proxy.$q.lang.rtl, (rtl) => {
      if (targetRef.value !== null) {
        setHorizontalScrollPosition(
          targetRef.value,
          Math.abs(scroll.horizontal.position.value) * (rtl === true ? -1 : 1)
        );
      }
    });
    onDeactivated(() => {
      scrollPosition = {
        top: scroll.vertical.position.value,
        left: scroll.horizontal.position.value
      };
    });
    onActivated(() => {
      if (scrollPosition === null) return;
      const scrollTarget = targetRef.value;
      if (scrollTarget !== null) {
        setHorizontalScrollPosition(scrollTarget, scrollPosition.left);
        setVerticalScrollPosition(scrollTarget, scrollPosition.top);
      }
    });
    onBeforeUnmount(emitScroll.cancel);
    Object.assign(proxy, {
      getScrollTarget: () => targetRef.value,
      getScroll,
      getScrollPosition: () => ({
        top: scroll.vertical.position.value,
        left: scroll.horizontal.position.value
      }),
      getScrollPercentage: () => ({
        top: scroll.vertical.percentage.value,
        left: scroll.horizontal.percentage.value
      }),
      setScrollPosition: localSetScrollPosition,
      setScrollPercentage(axis, percentage, duration2) {
        localSetScrollPosition(
          axis,
          percentage * (scroll[axis].size.value - container[axis].value) * (axis === "horizontal" && proxy.$q.lang.rtl === true ? -1 : 1),
          duration2
        );
      }
    });
    const store = {
      scroll,
      thumbVertDir: [[
        TouchPan,
        (e) => {
          onPanThumb(e, "vertical");
        },
        void 0,
        { vertical: true, ...panOpts }
      ]],
      thumbHorizDir: [[
        TouchPan,
        (e) => {
          onPanThumb(e, "horizontal");
        },
        void 0,
        { horizontal: true, ...panOpts }
      ]],
      onVerticalMousedown(evt) {
        onMousedown(evt, "vertical");
      },
      onHorizontalMousedown(evt) {
        onMousedown(evt, "horizontal");
      }
    };
    return () => {
      return h("div", {
        class: classes.value,
        onMouseenter,
        onMouseleave
      }, [
        h("div", {
          ref: targetRef,
          class: "q-scrollarea__container scroll relative-position fit hide-scrollbar",
          tabindex: props.tabindex !== void 0 ? props.tabindex : void 0
        }, [
          h("div", {
            class: "q-scrollarea__content absolute",
            style: mainStyle.value
          }, hMergeSlot(slots.default, [
            h(QResizeObserver, {
              debounce: 0,
              onResize: updateScrollSize
            })
          ])),
          h(QScrollObserver, {
            axis: "both",
            onScroll: updateScroll
          })
        ]),
        h(QResizeObserver, {
          debounce: 0,
          onResize: updateContainer
        }),
        h(ScrollAreaControls, {
          store,
          barStyle: props.barStyle,
          verticalBarStyle: props.verticalBarStyle,
          horizontalBarStyle: props.horizontalBarStyle
        })
      ]);
    };
  }
});
const _sfc_main$1 = {
  __name: "DrawerContent",
  setup(__props, { expose: __expose }) {
    __expose();
    const $q = useQuasar();
    const scheduleStore = useScheduleStore();
    onMounted(() => {
      scheduleStore.setNotifyFunction($q.notify);
    });
    const filters = ref({
      day: null,
      completed: null,
      priority: null
    });
    const dayOptions = [
      { label: "Monday", value: "Monday" },
      { label: "Tuesday", value: "Tuesday" },
      { label: "Wednesday", value: "Wednesday" },
      { label: "Thursday", value: "Thursday" },
      { label: "Friday", value: "Friday" }
    ];
    const statusOptions = [
      { label: "Completed", value: true },
      { label: "Incomplete", value: false }
    ];
    const priorityOptions = [
      { label: "High Priority", value: "high" },
      { label: "Medium Priority", value: "medium" },
      { label: "Low Priority", value: "low" }
    ];
    const todayCompletedCount = computed(() => {
      return scheduleStore.todayScheduledZones.filter((zone) => zone.completed).length;
    });
    const todayTotalCount = computed(() => {
      return scheduleStore.todayScheduledZones.length;
    });
    const hasActiveFilters = computed(() => {
      return filters.value.day || filters.value.completed !== null || filters.value.priority;
    });
    const getDayColor = (dayName) => {
      const colors = {
        Monday: "schedule-monday",
        Tuesday: "schedule-tuesday",
        Wednesday: "schedule-wednesday",
        Thursday: "schedule-thursday",
        Friday: "schedule-friday"
        // Will use pink from CSS
      };
      return colors[dayName] || "grey";
    };
    const getStatusClass = (zone) => {
      if (zone.completed) {
        return `bg-${getDayColor(zone.scheduledDay)}`;
      }
      return "bg-schedule-incomplete";
    };
    const updateFilter = (filterType, value2) => {
      filters.value[filterType] = value2;
      scheduleStore.setFilter(filterType, value2);
      if (value2) {
        let message = "";
        if (filterType === "day") {
          message = `Showing ${value2} zones`;
        } else if (filterType === "completed") {
          message = `Showing ${value2 ? "completed" : "incomplete"} zones`;
        } else if (filterType === "priority") {
          message = `Showing ${value2} priority zones`;
        }
        if ($q.notify && message) {
          $q.notify({
            type: "info",
            message,
            icon: "filter_list",
            timeout: 2e3
          });
        }
      }
    };
    const clearAllFilters = () => {
      filters.value = {
        day: null,
        completed: null,
        priority: null
      };
      scheduleStore.clearFilters();
    };
    const selectZone = (zone) => {
      scheduleStore.selectZone(zone);
    };
    const toggleZoneStatus = async (zone) => {
      await scheduleStore.updateZoneStatus(zone.id, !zone.completed);
    };
    const markAllDay = async (dayName, completed) => {
      if ($q.dialog && typeof $q.dialog === "function") {
        $q.dialog({
          title: "Confirm Action",
          message: `Mark all ${dayName} zones as ${completed ? "completed" : "incomplete"}?`,
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await scheduleStore.markAllZonesForDay(dayName, completed);
        });
      } else {
        await scheduleStore.markAllZonesForDay(dayName, completed);
      }
    };
    const confirmMarkAllComplete = () => {
      $q.dialog({
        title: "Mark All Zones Complete",
        message: "This will mark all zones as completed for this week. Continue?",
        cancel: true,
        persistent: true,
        ok: {
          color: "positive",
          label: "Mark All Complete"
        }
      }).onOk(async () => {
        const promises = scheduleStore.zones.filter((zone) => !zone.completed).map((zone) => scheduleStore.updateZoneStatus(zone.id, true));
        await Promise.all(promises);
        $q.notify({
          type: "positive",
          message: "All zones marked as completed!",
          icon: "celebration"
        });
      });
    };
    const confirmResetWeek = () => {
      $q.dialog({
        title: "Reset Weekly Progress",
        message: "This will mark all zones as incomplete and reset the weekly progress. This action cannot be undone.",
        cancel: true,
        persistent: true,
        ok: {
          color: "warning",
          label: "Reset Week"
        }
      }).onOk(async () => {
        await scheduleStore.resetWeeklyProgress();
      });
    };
    const showAddZone = () => {
      $q.notify({
        type: "info",
        message: "Zone creation feature coming in next phase!",
        icon: "construction"
      });
    };
    const __returned__ = { $q, scheduleStore, filters, dayOptions, statusOptions, priorityOptions, todayCompletedCount, todayTotalCount, hasActiveFilters, getDayColor, getStatusClass, updateFilter, clearAllFilters, selectZone, toggleZoneStatus, markAllDay, confirmMarkAllComplete, confirmResetWeek, showAddZone, ref, computed, onMounted, get useQuasar() {
      return useQuasar;
    }, get useScheduleStore() {
      return useScheduleStore;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$1 = { class: "drawer-content" };
const _hoisted_2$1 = { class: "drawer-section" };
const _hoisted_3$1 = { class: "progress-overview q-mb-md" };
const _hoisted_4$1 = { class: "row items-center q-gutter-md" };
const _hoisted_5$1 = { class: "col-auto" };
const _hoisted_6$1 = { class: "progress-text text-primary" };
const _hoisted_7$1 = { class: "col" };
const _hoisted_8$1 = { class: "text-h6" };
const _hoisted_9$1 = { class: "row q-gutter-xs" };
const _hoisted_10$1 = { class: "col" };
const _hoisted_11$1 = { class: "stat-number text-positive" };
const _hoisted_12$1 = { class: "col" };
const _hoisted_13$1 = { class: "stat-number text-info" };
const _hoisted_14$1 = { class: "drawer-section" };
const _hoisted_15$1 = { class: "daily-progress q-gutter-sm" };
const _hoisted_16$1 = { class: "row items-center justify-between q-mb-xs" };
const _hoisted_17 = { class: "text-caption" };
const _hoisted_18 = {
  key: 0,
  class: "day-actions row q-gutter-xs"
};
const _hoisted_19 = { class: "drawer-section" };
const _hoisted_20 = { class: "section-title" };
const _hoisted_21 = {
  key: 0,
  class: "active-filters q-mb-md"
};
const _hoisted_22 = { class: "q-gutter-xs" };
const _hoisted_23 = { class: "filter-controls q-gutter-md" };
const _hoisted_24 = { class: "quick-filters q-mt-md" };
const _hoisted_25 = { class: "row q-gutter-xs" };
const _hoisted_26 = { class: "row q-gutter-xs q-mt-xs" };
const _hoisted_27 = { class: "drawer-section" };
const _hoisted_28 = { class: "section-title" };
const _hoisted_29 = {
  key: 0,
  class: "text-caption text-grey q-ml-sm"
};
const _hoisted_30 = { class: "q-gutter-xs" };
const _hoisted_31 = { class: "row items-center q-gutter-xs" };
const _hoisted_32 = { class: "col" };
const _hoisted_33 = { class: "text-body2 text-weight-medium ellipsis" };
const _hoisted_34 = { class: "text-caption text-grey" };
const _hoisted_35 = {
  key: 0,
  class: "text-center q-pa-md text-grey"
};
const _hoisted_36 = { class: "drawer-section" };
const _hoisted_37 = { class: "q-gutter-sm" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$1, [
    createBaseVNode("div", _hoisted_2$1, [
      _cache[18] || (_cache[18] = createBaseVNode("div", { class: "section-title" }, "Weekly Progress", -1)),
      createBaseVNode("div", _hoisted_3$1, [
        createBaseVNode("div", _hoisted_4$1, [
          createBaseVNode("div", _hoisted_5$1, [
            createVNode(QCircularProgress, {
              value: $setup.scheduleStore.completionPercentage,
              size: "80px",
              thickness: 0.15,
              color: "primary",
              "track-color": "grey-3",
              class: "progress-circle"
            }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_6$1, toDisplayString($setup.scheduleStore.completionPercentage) + "% ", 1)
              ]),
              _: 1
            }, 8, ["value"])
          ]),
          createBaseVNode("div", _hoisted_7$1, [
            createBaseVNode("div", _hoisted_8$1, toDisplayString($setup.scheduleStore.completedZones) + "/" + toDisplayString($setup.scheduleStore.totalZones), 1),
            _cache[15] || (_cache[15] = createBaseVNode("div", { class: "text-caption text-grey" }, "Zones Completed", -1))
          ])
        ])
      ]),
      createBaseVNode("div", _hoisted_9$1, [
        createBaseVNode("div", _hoisted_10$1, [
          createVNode(QCard, {
            flat: "",
            bordered: "",
            class: "stat-card"
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_11$1, toDisplayString($setup.todayCompletedCount), 1),
              _cache[16] || (_cache[16] = createBaseVNode("div", { class: "stat-label" }, "Today", -1))
            ]),
            _: 1,
            __: [16]
          })
        ]),
        createBaseVNode("div", _hoisted_12$1, [
          createVNode(QCard, {
            flat: "",
            bordered: "",
            class: "stat-card"
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_13$1, toDisplayString($setup.todayTotalCount), 1),
              _cache[17] || (_cache[17] = createBaseVNode("div", { class: "stat-label" }, "Scheduled", -1))
            ]),
            _: 1,
            __: [17]
          })
        ])
      ])
    ]),
    createBaseVNode("div", _hoisted_14$1, [
      _cache[19] || (_cache[19] = createBaseVNode("div", { class: "section-title" }, "Daily Breakdown", -1)),
      createBaseVNode("div", _hoisted_15$1, [
        (openBlock(true), createElementBlock(Fragment, null, renderList($setup.scheduleStore.overallProgress, (day, dayName) => {
          return openBlock(), createElementBlock("div", {
            key: dayName,
            class: "day-progress-item"
          }, [
            createBaseVNode("div", _hoisted_16$1, [
              createBaseVNode("span", {
                class: normalizeClass(["text-weight-medium", `schedule-${dayName.toLowerCase()}`])
              }, toDisplayString(dayName), 3),
              createBaseVNode("span", _hoisted_17, toDisplayString(day.completed) + "/" + toDisplayString(day.total), 1)
            ]),
            createVNode(QLinearProgress, {
              value: day.percentage / 100,
              size: "8px",
              color: $setup.getDayColor(dayName),
              "track-color": "grey-3",
              class: "q-mb-sm"
            }, null, 8, ["value", "color"]),
            day.total > 0 ? (openBlock(), createElementBlock("div", _hoisted_18, [
              createVNode(QBtn, {
                dense: "",
                size: "xs",
                outline: "",
                color: $setup.getDayColor(dayName),
                icon: "check_circle",
                onClick: ($event) => $setup.markAllDay(dayName, true),
                disable: day.completed === day.total
              }, {
                default: withCtx(() => [
                  createVNode(QTooltip, null, {
                    default: withCtx(() => [
                      createTextVNode("Mark all " + toDisplayString(dayName) + " zones complete", 1)
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1032, ["color", "onClick", "disable"]),
              createVNode(QBtn, {
                dense: "",
                size: "xs",
                outline: "",
                color: "grey",
                icon: "radio_button_unchecked",
                onClick: ($event) => $setup.markAllDay(dayName, false),
                disable: day.completed === 0
              }, {
                default: withCtx(() => [
                  createVNode(QTooltip, null, {
                    default: withCtx(() => [
                      createTextVNode("Mark all " + toDisplayString(dayName) + " zones incomplete", 1)
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1032, ["onClick", "disable"])
            ])) : createCommentVNode("", true)
          ]);
        }), 128))
      ])
    ]),
    createBaseVNode("div", _hoisted_19, [
      createBaseVNode("div", _hoisted_20, [
        _cache[21] || (_cache[21] = createTextVNode(" Filters ", -1)),
        $setup.hasActiveFilters ? (openBlock(), createBlock(QChip, {
          key: 0,
          size: "sm",
          color: "primary",
          "text-color": "white",
          class: "q-ml-sm"
        }, {
          default: withCtx(() => _cache[20] || (_cache[20] = [
            createTextVNode(" Active ", -1)
          ])),
          _: 1,
          __: [20]
        })) : createCommentVNode("", true)
      ]),
      $setup.hasActiveFilters ? (openBlock(), createElementBlock("div", _hoisted_21, [
        _cache[22] || (_cache[22] = createBaseVNode("div", { class: "text-caption text-grey q-mb-xs" }, "Active filters:", -1)),
        createBaseVNode("div", _hoisted_22, [
          $setup.filters.day ? (openBlock(), createBlock(QChip, {
            key: 0,
            removable: "",
            onRemove: _cache[0] || (_cache[0] = ($event) => $setup.updateFilter("day", null)),
            size: "sm",
            color: "blue",
            "text-color": "white",
            icon: "event"
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString($setup.filters.day), 1)
            ]),
            _: 1
          })) : createCommentVNode("", true),
          $setup.filters.completed !== null ? (openBlock(), createBlock(QChip, {
            key: 1,
            removable: "",
            onRemove: _cache[1] || (_cache[1] = ($event) => $setup.updateFilter("completed", null)),
            size: "sm",
            color: $setup.filters.completed ? "positive" : "orange",
            "text-color": "white",
            icon: $setup.filters.completed ? "check_circle" : "schedule"
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString($setup.filters.completed ? "Completed" : "Incomplete"), 1)
            ]),
            _: 1
          }, 8, ["color", "icon"])) : createCommentVNode("", true),
          $setup.filters.priority ? (openBlock(), createBlock(QChip, {
            key: 2,
            removable: "",
            onRemove: _cache[2] || (_cache[2] = ($event) => $setup.updateFilter("priority", null)),
            size: "sm",
            color: "purple",
            "text-color": "white",
            icon: "flag"
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString($setup.filters.priority) + " priority ", 1)
            ]),
            _: 1
          })) : createCommentVNode("", true)
        ])
      ])) : createCommentVNode("", true),
      createBaseVNode("div", _hoisted_23, [
        createBaseVNode("div", null, [
          _cache[23] || (_cache[23] = createBaseVNode("label", { class: "text-caption text-grey q-mb-xs block" }, "Scheduled Day", -1)),
          createVNode(QSelect, {
            modelValue: $setup.filters.day,
            "onUpdate:modelValue": [
              _cache[3] || (_cache[3] = ($event) => $setup.filters.day = $event),
              _cache[4] || (_cache[4] = ($event) => $setup.updateFilter("day", $event))
            ],
            options: $setup.dayOptions,
            clearable: "",
            dense: "",
            outlined: "",
            "emit-value": "",
            "map-options": ""
          }, null, 8, ["modelValue"])
        ]),
        createBaseVNode("div", null, [
          _cache[24] || (_cache[24] = createBaseVNode("label", { class: "text-caption text-grey q-mb-xs block" }, "Status", -1)),
          createVNode(QSelect, {
            modelValue: $setup.filters.completed,
            "onUpdate:modelValue": [
              _cache[5] || (_cache[5] = ($event) => $setup.filters.completed = $event),
              _cache[6] || (_cache[6] = ($event) => $setup.updateFilter("completed", $event))
            ],
            options: $setup.statusOptions,
            clearable: "",
            dense: "",
            outlined: "",
            "emit-value": "",
            "map-options": ""
          }, null, 8, ["modelValue"])
        ]),
        createBaseVNode("div", null, [
          _cache[25] || (_cache[25] = createBaseVNode("label", { class: "text-caption text-grey q-mb-xs block" }, "Priority", -1)),
          createVNode(QSelect, {
            modelValue: $setup.filters.priority,
            "onUpdate:modelValue": [
              _cache[7] || (_cache[7] = ($event) => $setup.filters.priority = $event),
              _cache[8] || (_cache[8] = ($event) => $setup.updateFilter("priority", $event))
            ],
            options: $setup.priorityOptions,
            clearable: "",
            dense: "",
            outlined: "",
            "emit-value": "",
            "map-options": ""
          }, null, 8, ["modelValue"])
        ]),
        createVNode(QBtn, {
          flat: "",
          dense: "",
          color: "grey",
          icon: "clear_all",
          label: "Clear Filters",
          onClick: $setup.clearAllFilters,
          disable: !$setup.hasActiveFilters,
          class: "full-width"
        }, null, 8, ["disable"]),
        createBaseVNode("div", _hoisted_24, [
          _cache[26] || (_cache[26] = createBaseVNode("div", { class: "text-caption text-grey q-mb-xs" }, "Quick filters:", -1)),
          createBaseVNode("div", _hoisted_25, [
            createVNode(QBtn, {
              dense: "",
              size: "sm",
              color: "blue",
              label: "Monday",
              onClick: _cache[9] || (_cache[9] = ($event) => $setup.updateFilter("day", "Monday")),
              outline: $setup.filters.day !== "Monday"
            }, null, 8, ["outline"]),
            createVNode(QBtn, {
              dense: "",
              size: "sm",
              color: "green",
              label: "Tuesday",
              onClick: _cache[10] || (_cache[10] = ($event) => $setup.updateFilter("day", "Tuesday")),
              outline: $setup.filters.day !== "Tuesday"
            }, null, 8, ["outline"]),
            createVNode(QBtn, {
              dense: "",
              size: "sm",
              color: "orange",
              label: "Wednesday",
              onClick: _cache[11] || (_cache[11] = ($event) => $setup.updateFilter("day", "Wednesday")),
              outline: $setup.filters.day !== "Wednesday"
            }, null, 8, ["outline"])
          ]),
          createBaseVNode("div", _hoisted_26, [
            createVNode(QBtn, {
              dense: "",
              size: "sm",
              color: "purple",
              label: "Thursday",
              onClick: _cache[12] || (_cache[12] = ($event) => $setup.updateFilter("day", "Thursday")),
              outline: $setup.filters.day !== "Thursday"
            }, null, 8, ["outline"]),
            createVNode(QBtn, {
              dense: "",
              size: "sm",
              color: "indigo",
              label: "Friday",
              onClick: _cache[13] || (_cache[13] = ($event) => $setup.updateFilter("day", "Friday")),
              outline: $setup.filters.day !== "Friday"
            }, null, 8, ["outline"]),
            createVNode(QBtn, {
              dense: "",
              size: "sm",
              color: "positive",
              label: "Done",
              onClick: _cache[14] || (_cache[14] = ($event) => $setup.updateFilter("completed", true)),
              outline: $setup.filters.completed !== true
            }, null, 8, ["outline"])
          ])
        ])
      ])
    ]),
    createBaseVNode("div", _hoisted_27, [
      createBaseVNode("div", _hoisted_28, [
        _cache[27] || (_cache[27] = createTextVNode(" Zones ", -1)),
        createVNode(QChip, {
          size: "sm",
          color: "grey-4",
          "text-color": "grey-8"
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString($setup.scheduleStore.filteredZones.length), 1)
          ]),
          _: 1
        }),
        $setup.hasActiveFilters ? (openBlock(), createElementBlock("span", _hoisted_29, " of " + toDisplayString($setup.scheduleStore.totalZones) + " total ", 1)) : createCommentVNode("", true)
      ]),
      createVNode(QScrollArea, {
        style: { "height": "300px" },
        class: "zone-list"
      }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_30, [
            (openBlock(true), createElementBlock(Fragment, null, renderList($setup.scheduleStore.filteredZones, (zone) => {
              return openBlock(), createBlock(QCard, {
                key: zone.id,
                flat: "",
                bordered: "",
                class: "zone-card cursor-pointer",
                onClick: ($event) => $setup.selectZone(zone)
              }, {
                default: withCtx(() => [
                  createVNode(QCardSection, {
                    dense: "",
                    class: "q-pa-sm"
                  }, {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_31, [
                        createBaseVNode("div", {
                          class: normalizeClass(["zone-status-indicator", $setup.getStatusClass(zone)])
                        }, null, 2),
                        createBaseVNode("div", _hoisted_32, [
                          createBaseVNode("div", _hoisted_33, toDisplayString(zone.name), 1),
                          createBaseVNode("div", _hoisted_34, toDisplayString(zone.scheduledDay) + " • " + toDisplayString(zone.priority) + " priority ", 1)
                        ]),
                        createVNode(QBtn, {
                          dense: "",
                          round: "",
                          flat: "",
                          size: "sm",
                          icon: zone.completed ? "check_circle" : "radio_button_unchecked",
                          color: zone.completed ? "positive" : "grey",
                          onClick: withModifiers(($event) => $setup.toggleZoneStatus(zone), ["stop"])
                        }, null, 8, ["icon", "color", "onClick"])
                      ])
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1032, ["onClick"]);
            }), 128))
          ]),
          $setup.scheduleStore.filteredZones.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_35, [
            createVNode(QIcon, {
              name: "search_off",
              size: "3rem",
              class: "q-mb-md"
            }),
            _cache[28] || (_cache[28] = createBaseVNode("div", null, "No zones match current filters", -1))
          ])) : createCommentVNode("", true)
        ]),
        _: 1
      })
    ]),
    _cache[30] || (_cache[30] = createStaticVNode('<div class="drawer-section" data-v-862e5068><div class="section-title" data-v-862e5068>Legend</div><div class="legend q-gutter-xs" data-v-862e5068><div class="legend-item" data-v-862e5068><div class="legend-color bg-schedule-monday" data-v-862e5068></div><span class="legend-label" data-v-862e5068>Monday</span></div><div class="legend-item" data-v-862e5068><div class="legend-color bg-schedule-tuesday" data-v-862e5068></div><span class="legend-label" data-v-862e5068>Tuesday</span></div><div class="legend-item" data-v-862e5068><div class="legend-color bg-schedule-wednesday" data-v-862e5068></div><span class="legend-label" data-v-862e5068>Wednesday</span></div><div class="legend-item" data-v-862e5068><div class="legend-color bg-schedule-thursday" data-v-862e5068></div><span class="legend-label" data-v-862e5068>Thursday</span></div><div class="legend-item" data-v-862e5068><div class="legend-color bg-schedule-friday" data-v-862e5068></div><span class="legend-label" data-v-862e5068>Friday</span></div><div class="legend-item" data-v-862e5068><div class="legend-color bg-schedule-incomplete" data-v-862e5068></div><span class="legend-label" data-v-862e5068>Incomplete</span></div></div></div>', 1)),
    createBaseVNode("div", _hoisted_36, [
      _cache[29] || (_cache[29] = createBaseVNode("div", { class: "section-title" }, "Quick Actions", -1)),
      createBaseVNode("div", _hoisted_37, [
        createVNode(QBtn, {
          outline: "",
          color: "positive",
          icon: "check_circle_outline",
          label: "Mark All Complete",
          onClick: $setup.confirmMarkAllComplete,
          class: "full-width",
          size: "sm"
        }),
        createVNode(QBtn, {
          outline: "",
          color: "warning",
          icon: "refresh",
          label: "Reset Week",
          onClick: $setup.confirmResetWeek,
          class: "full-width",
          size: "sm"
        }),
        createVNode(QBtn, {
          outline: "",
          color: "primary",
          icon: "add_location",
          label: "Add New Zone",
          onClick: $setup.showAddZone,
          class: "full-width",
          size: "sm"
        })
      ])
    ])
  ]);
}
const DrawerContent = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-862e5068"], ["__file", "DrawerContent.vue"]]);
const _sfc_main = {
  __name: "MainLayout",
  setup(__props, { expose: __expose }) {
    __expose();
    const $q = useQuasar();
    const scheduleStore = useScheduleStore();
    const leftDrawerOpen = ref(false);
    const showWeather = ref(false);
    const showSettings = ref(false);
    const weatherData = ref(null);
    const darkMode = ref($q.dark.isActive);
    const autoRefresh = ref(false);
    let refreshInterval = null;
    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };
    const refreshData = async () => {
      try {
        await scheduleStore.fetchZones();
      } catch (error) {
        console.error("Error refreshing data:", error);
      }
    };
    const loadWeatherData = async () => {
      try {
        weatherData.value = await apiService.getWeatherData();
      } catch (error) {
        console.error("Error loading weather data:", error);
        $q.notify({
          type: "negative",
          message: "Failed to load weather data",
          icon: "error"
        });
      }
    };
    const toggleDarkMode = (value2) => {
      $q.dark.set(value2);
      localStorage.setItem("darkMode", value2);
    };
    const toggleAutoRefresh = (value2) => {
      if (value2) {
        refreshInterval = setInterval(refreshData, 5 * 60 * 1e3);
        $q.notify({
          type: "info",
          message: "Auto refresh enabled (every 5 minutes)",
          icon: "schedule"
        });
      } else {
        if (refreshInterval) {
          clearInterval(refreshInterval);
          refreshInterval = null;
        }
        $q.notify({
          type: "info",
          message: "Auto refresh disabled",
          icon: "schedule_off"
        });
      }
      localStorage.setItem("autoRefresh", value2);
    };
    const exportData = async () => {
      try {
        const data = await apiService.exportZones("json");
        const blob = new Blob([data], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `grass-cutting-zones-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        $q.notify({
          type: "positive",
          message: "Data exported successfully",
          icon: "download_done"
        });
      } catch (error) {
        console.error("Export error:", error);
        $q.notify({
          type: "negative",
          message: "Failed to export data",
          icon: "error"
        });
      }
    };
    const importData = () => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".json";
      input.onchange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        try {
          const text = await file.text();
          const result = await apiService.importZones(text, "json");
          await scheduleStore.fetchZones();
          $q.notify({
            type: "positive",
            message: `Imported ${result.imported} zones successfully`,
            icon: "upload_done"
          });
        } catch (error) {
          console.error("Import error:", error);
          $q.notify({
            type: "negative",
            message: "Failed to import data",
            icon: "error"
          });
        }
      };
      input.click();
    };
    onMounted(async () => {
      scheduleStore.setNotifyFunction($q.notify);
      const savedDarkMode = localStorage.getItem("darkMode");
      if (savedDarkMode !== null) {
        darkMode.value = savedDarkMode === "true";
        $q.dark.set(darkMode.value);
      }
      const savedAutoRefresh = localStorage.getItem("autoRefresh");
      if (savedAutoRefresh === "true") {
        autoRefresh.value = true;
        toggleAutoRefresh(true);
      }
      await scheduleStore.initializeStore();
      showWeather.value && loadWeatherData();
    });
    onUnmounted(() => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    });
    watch(showWeather, (newVal) => {
      if (newVal && !weatherData.value) {
        loadWeatherData();
      }
    });
    onUnmounted(() => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    });
    const __returned__ = { $q, scheduleStore, leftDrawerOpen, showWeather, showSettings, weatherData, darkMode, autoRefresh, get refreshInterval() {
      return refreshInterval;
    }, set refreshInterval(v) {
      refreshInterval = v;
    }, toggleLeftDrawer, refreshData, loadWeatherData, toggleDarkMode, toggleAutoRefresh, exportData, importData, ref, onMounted, onUnmounted, watch, get useQuasar() {
      return useQuasar;
    }, get useScheduleStore() {
      return useScheduleStore;
    }, get apiService() {
      return apiService;
    }, DrawerContent };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1 = { class: "q-gutter-sm row items-center no-wrap" };
const _hoisted_2 = {
  key: 0,
  class: "q-gutter-md"
};
const _hoisted_3 = { class: "row items-center q-gutter-md" };
const _hoisted_4 = { class: "text-h4" };
const _hoisted_5 = { class: "text-subtitle2" };
const _hoisted_6 = { class: "row q-gutter-md" };
const _hoisted_7 = { class: "col" };
const _hoisted_8 = { class: "text-body1" };
const _hoisted_9 = { class: "col" };
const _hoisted_10 = { class: "text-body1" };
const _hoisted_11 = { class: "text-subtitle2 q-mb-sm" };
const _hoisted_12 = { class: "q-ma-none q-pl-md" };
const _hoisted_13 = {
  key: 1,
  class: "text-center q-pa-md"
};
const _hoisted_14 = { class: "row items-center justify-between" };
const _hoisted_15 = { class: "row items-center justify-between" };
const _hoisted_16 = { class: "q-gutter-sm" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_view = resolveComponent("router-view");
  return openBlock(), createBlock(QLayout, { view: "lHh Lpr lFf" }, {
    default: withCtx(() => [
      createVNode(QHeader, {
        elevated: "",
        class: "bg-primary text-white"
      }, {
        default: withCtx(() => [
          createVNode(QToolbar, null, {
            default: withCtx(() => [
              createVNode(QBtn, {
                flat: "",
                dense: "",
                round: "",
                icon: "menu",
                "aria-label": "Menu",
                onClick: $setup.toggleLeftDrawer
              }),
              createVNode(QToolbarTitle, { class: "text-weight-medium" }, {
                default: withCtx(() => [
                  createVNode(QIcon, {
                    name: "grass",
                    size: "sm",
                    class: "q-mr-sm"
                  }),
                  _cache[7] || (_cache[7] = createTextVNode(" Grass & Snow ", -1)),
                  _cache[8] || (_cache[8] = createBaseVNode("div", { class: "text-caption" }, "Ste. Anne - Public Works", -1))
                ]),
                _: 1,
                __: [7, 8]
              }),
              createBaseVNode("div", _hoisted_1, [
                createVNode(QBtn, {
                  flat: "",
                  dense: "",
                  round: "",
                  icon: "wb_sunny",
                  onClick: _cache[0] || (_cache[0] = ($event) => $setup.showWeather = true)
                }, {
                  default: withCtx(() => [
                    createVNode(QTooltip, null, {
                      default: withCtx(() => _cache[9] || (_cache[9] = [
                        createTextVNode("Weather Conditions", -1)
                      ])),
                      _: 1,
                      __: [9]
                    })
                  ]),
                  _: 1
                }),
                createVNode(QBtn, {
                  flat: "",
                  dense: "",
                  round: "",
                  icon: "refresh",
                  loading: $setup.scheduleStore.loading,
                  onClick: $setup.refreshData
                }, {
                  default: withCtx(() => [
                    createVNode(QTooltip, null, {
                      default: withCtx(() => _cache[10] || (_cache[10] = [
                        createTextVNode("Refresh Data", -1)
                      ])),
                      _: 1,
                      __: [10]
                    })
                  ]),
                  _: 1
                }, 8, ["loading"]),
                createVNode(QBtn, {
                  flat: "",
                  dense: "",
                  round: "",
                  icon: "settings",
                  onClick: _cache[1] || (_cache[1] = ($event) => $setup.showSettings = true)
                }, {
                  default: withCtx(() => [
                    createVNode(QTooltip, null, {
                      default: withCtx(() => _cache[11] || (_cache[11] = [
                        createTextVNode("Settings", -1)
                      ])),
                      _: 1,
                      __: [11]
                    })
                  ]),
                  _: 1
                })
              ])
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(QDrawer, {
        modelValue: $setup.leftDrawerOpen,
        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.leftDrawerOpen = $event),
        "show-if-above": "",
        bordered: "",
        width: 320,
        breakpoint: 768
      }, {
        default: withCtx(() => [
          createVNode($setup["DrawerContent"])
        ]),
        _: 1
      }, 8, ["modelValue"]),
      createVNode(QPageContainer, null, {
        default: withCtx(() => [
          createVNode(_component_router_view)
        ]),
        _: 1
      }),
      createVNode(QDialog, {
        modelValue: $setup.showWeather,
        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.showWeather = $event)
      }, {
        default: withCtx(() => [
          createVNode(QCard, { style: { "min-width": "300px" } }, {
            default: withCtx(() => [
              createVNode(QCardSection, { class: "row items-center q-pb-none" }, {
                default: withCtx(() => [
                  _cache[12] || (_cache[12] = createBaseVNode("div", { class: "text-h6" }, "Weather Conditions", -1)),
                  createVNode(QSpace),
                  withDirectives(createVNode(QBtn, {
                    icon: "close",
                    flat: "",
                    round: "",
                    dense: ""
                  }, null, 512), [
                    [ClosePopup]
                  ])
                ]),
                _: 1,
                __: [12]
              }),
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  $setup.weatherData ? (openBlock(), createElementBlock("div", _hoisted_2, [
                    createBaseVNode("div", _hoisted_3, [
                      createVNode(QIcon, {
                        name: "wb_sunny",
                        size: "lg",
                        color: "orange"
                      }),
                      createBaseVNode("div", null, [
                        createBaseVNode("div", _hoisted_4, toDisplayString($setup.weatherData.temperature) + "°C", 1),
                        createBaseVNode("div", _hoisted_5, toDisplayString($setup.weatherData.condition), 1)
                      ])
                    ]),
                    createVNode(QSeparator),
                    createBaseVNode("div", _hoisted_6, [
                      createBaseVNode("div", _hoisted_7, [
                        _cache[13] || (_cache[13] = createBaseVNode("div", { class: "text-caption text-grey" }, "Humidity", -1)),
                        createBaseVNode("div", _hoisted_8, toDisplayString($setup.weatherData.humidity) + "%", 1)
                      ]),
                      createBaseVNode("div", _hoisted_9, [
                        _cache[14] || (_cache[14] = createBaseVNode("div", { class: "text-caption text-grey" }, "Wind", -1)),
                        createBaseVNode("div", _hoisted_10, toDisplayString($setup.weatherData.windSpeed) + " km/h " + toDisplayString($setup.weatherData.windDirection), 1)
                      ])
                    ]),
                    createVNode(QSeparator),
                    createBaseVNode("div", null, [
                      createBaseVNode("div", _hoisted_11, [
                        _cache[15] || (_cache[15] = createTextVNode(" Cutting Conditions: ", -1)),
                        createVNode(QChip, {
                          color: $setup.weatherData.cuttingConditions === "Good" ? "positive" : "warning",
                          "text-color": "white",
                          size: "sm"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString($setup.weatherData.cuttingConditions), 1)
                          ]),
                          _: 1
                        }, 8, ["color"])
                      ]),
                      createBaseVNode("ul", _hoisted_12, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList($setup.weatherData.recommendations, (rec) => {
                          return openBlock(), createElementBlock("li", {
                            key: rec,
                            class: "text-body2"
                          }, toDisplayString(rec), 1);
                        }), 128))
                      ])
                    ])
                  ])) : (openBlock(), createElementBlock("div", _hoisted_13, [
                    createVNode(QSpinner, { size: "lg" }),
                    _cache[16] || (_cache[16] = createBaseVNode("div", { class: "q-mt-md" }, "Loading weather data...", -1))
                  ]))
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["modelValue"]),
      createVNode(QDialog, {
        modelValue: $setup.showSettings,
        "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $setup.showSettings = $event)
      }, {
        default: withCtx(() => [
          createVNode(QCard, { style: { "min-width": "400px" } }, {
            default: withCtx(() => [
              createVNode(QCardSection, { class: "row items-center q-pb-none" }, {
                default: withCtx(() => [
                  _cache[17] || (_cache[17] = createBaseVNode("div", { class: "text-h6" }, "Settings", -1)),
                  createVNode(QSpace),
                  withDirectives(createVNode(QBtn, {
                    icon: "close",
                    flat: "",
                    round: "",
                    dense: ""
                  }, null, 512), [
                    [ClosePopup]
                  ])
                ]),
                _: 1,
                __: [17]
              }),
              createVNode(QCardSection, { class: "q-gutter-md" }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_14, [
                    _cache[18] || (_cache[18] = createBaseVNode("div", null, [
                      createBaseVNode("div", { class: "text-body1" }, "Dark Mode"),
                      createBaseVNode("div", { class: "text-caption text-grey" }, "Switch between light and dark themes")
                    ], -1)),
                    createVNode(QToggle, {
                      modelValue: $setup.darkMode,
                      "onUpdate:modelValue": [
                        _cache[4] || (_cache[4] = ($event) => $setup.darkMode = $event),
                        $setup.toggleDarkMode
                      ],
                      color: "primary"
                    }, null, 8, ["modelValue"])
                  ]),
                  createVNode(QSeparator),
                  createBaseVNode("div", _hoisted_15, [
                    _cache[19] || (_cache[19] = createBaseVNode("div", null, [
                      createBaseVNode("div", { class: "text-body1" }, "Auto Refresh"),
                      createBaseVNode("div", { class: "text-caption text-grey" }, "Automatically refresh data every 5 minutes")
                    ], -1)),
                    createVNode(QToggle, {
                      modelValue: $setup.autoRefresh,
                      "onUpdate:modelValue": [
                        _cache[5] || (_cache[5] = ($event) => $setup.autoRefresh = $event),
                        $setup.toggleAutoRefresh
                      ],
                      color: "primary"
                    }, null, 8, ["modelValue"])
                  ]),
                  createVNode(QSeparator),
                  createBaseVNode("div", null, [
                    _cache[20] || (_cache[20] = createBaseVNode("div", { class: "text-body1 q-mb-sm" }, "Data Management", -1)),
                    createBaseVNode("div", _hoisted_16, [
                      createVNode(QBtn, {
                        outline: "",
                        color: "primary",
                        icon: "download",
                        label: "Export Data",
                        onClick: $setup.exportData,
                        size: "sm"
                      }),
                      createVNode(QBtn, {
                        outline: "",
                        color: "secondary",
                        icon: "upload",
                        label: "Import Data",
                        onClick: $setup.importData,
                        size: "sm"
                      })
                    ])
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["modelValue"]),
      createVNode(QAjaxBar, {
        position: "top",
        color: "accent",
        size: "4px"
      })
    ]),
    _: 1
  });
}
const MainLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c51530cd"], ["__file", "MainLayout.vue"]]);
export {
  MainLayout as default
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFpbkxheW91dC1McWxZSG80Ny5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy90b29sYmFyL1FUb29sYmFyVGl0bGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3Rvb2xiYXIvUVRvb2xiYXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2hlYWRlci9RSGVhZGVyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvZGlyZWN0aXZlcy90b3VjaC1wYW4vVG91Y2hQYW4uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2RyYXdlci9RRHJhd2VyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9wYWdlL1FQYWdlQ29udGFpbmVyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9zY3JvbGwtb2JzZXJ2ZXIvUVNjcm9sbE9ic2VydmVyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9sYXlvdXQvUUxheW91dC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvc2Nyb2xsLWFyZWEvU2Nyb2xsQXJlYUNvbnRyb2xzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9zY3JvbGwtYXJlYS9RU2Nyb2xsQXJlYS5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0RyYXdlckNvbnRlbnQudnVlIiwiLi4vLi4vLi4vc3JjL2xheW91dHMvTWFpbkxheW91dC52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaCwgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5yZW5kZXIvcmVuZGVyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVRvb2xiYXJUaXRsZScsXG5cbiAgcHJvcHM6IHtcbiAgICBzaHJpbms6IEJvb2xlYW5cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtdG9vbGJhcl9fdGl0bGUgZWxsaXBzaXMnXG4gICAgICArIChwcm9wcy5zaHJpbmsgPT09IHRydWUgPyAnIGNvbC1zaHJpbmsnIDogJycpXG4gICAgKVxuXG4gICAgcmV0dXJuICgpID0+IGgoJ2RpdicsIHsgY2xhc3M6IGNsYXNzZXMudmFsdWUgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoLCBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRVG9vbGJhcicsXG5cbiAgcHJvcHM6IHtcbiAgICBpbnNldDogQm9vbGVhblxuICB9LFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cyB9KSB7XG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS10b29sYmFyIHJvdyBuby13cmFwIGl0ZW1zLWNlbnRlcidcbiAgICAgICsgKHByb3BzLmluc2V0ID09PSB0cnVlID8gJyBxLXRvb2xiYXItLWluc2V0JyA6ICcnKVxuICAgIClcblxuICAgIHJldHVybiAoKSA9PiBoKCdkaXYnLCB7IGNsYXNzOiBjbGFzc2VzLnZhbHVlLCByb2xlOiAndG9vbGJhcicgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCB3YXRjaCwgb25CZWZvcmVVbm1vdW50LCBpbmplY3QsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFSZXNpemVPYnNlcnZlciBmcm9tICcuLi9yZXNpemUtb2JzZXJ2ZXIvUVJlc2l6ZU9ic2VydmVyLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoVW5pcXVlU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcbmltcG9ydCB7IGxheW91dEtleSwgZW1wdHlSZW5kZXJGbiB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuc3ltYm9scy9zeW1ib2xzLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUhlYWRlcicsXG5cbiAgcHJvcHM6IHtcbiAgICBtb2RlbFZhbHVlOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgIH0sXG4gICAgcmV2ZWFsOiBCb29sZWFuLFxuICAgIHJldmVhbE9mZnNldDoge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgZGVmYXVsdDogMjUwXG4gICAgfSxcbiAgICBib3JkZXJlZDogQm9vbGVhbixcbiAgICBlbGV2YXRlZDogQm9vbGVhbixcblxuICAgIGhlaWdodEhpbnQ6IHtcbiAgICAgIHR5cGU6IFsgU3RyaW5nLCBOdW1iZXIgXSxcbiAgICAgIGRlZmF1bHQ6IDUwXG4gICAgfVxuICB9LFxuXG4gIGVtaXRzOiBbICdyZXZlYWwnLCAnZm9jdXNpbicgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIGNvbnN0IHsgcHJveHk6IHsgJHEgfSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIGNvbnN0ICRsYXlvdXQgPSBpbmplY3QobGF5b3V0S2V5LCBlbXB0eVJlbmRlckZuKVxuICAgIGlmICgkbGF5b3V0ID09PSBlbXB0eVJlbmRlckZuKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdRSGVhZGVyIG5lZWRzIHRvIGJlIGNoaWxkIG9mIFFMYXlvdXQnKVxuICAgICAgcmV0dXJuIGVtcHR5UmVuZGVyRm5cbiAgICB9XG5cbiAgICBjb25zdCBzaXplID0gcmVmKHBhcnNlSW50KHByb3BzLmhlaWdodEhpbnQsIDEwKSlcbiAgICBjb25zdCByZXZlYWxlZCA9IHJlZih0cnVlKVxuXG4gICAgY29uc3QgZml4ZWQgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMucmV2ZWFsID09PSB0cnVlXG4gICAgICB8fCAkbGF5b3V0LnZpZXcudmFsdWUuaW5kZXhPZignSCcpICE9PSAtMVxuICAgICAgfHwgKCRxLnBsYXRmb3JtLmlzLmlvcyAmJiAkbGF5b3V0LmlzQ29udGFpbmVyLnZhbHVlID09PSB0cnVlKVxuICAgIClcblxuICAgIGNvbnN0IG9mZnNldCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGlmIChwcm9wcy5tb2RlbFZhbHVlICE9PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiAwXG4gICAgICB9XG4gICAgICBpZiAoZml4ZWQudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIHJldmVhbGVkLnZhbHVlID09PSB0cnVlID8gc2l6ZS52YWx1ZSA6IDBcbiAgICAgIH1cbiAgICAgIGNvbnN0IG9mZnNldCA9IHNpemUudmFsdWUgLSAkbGF5b3V0LnNjcm9sbC52YWx1ZS5wb3NpdGlvblxuICAgICAgcmV0dXJuIG9mZnNldCA+IDAgPyBvZmZzZXQgOiAwXG4gICAgfSlcblxuICAgIGNvbnN0IGhpZGRlbiA9IGNvbXB1dGVkKCgpID0+IHByb3BzLm1vZGVsVmFsdWUgIT09IHRydWVcbiAgICAgIHx8IChmaXhlZC52YWx1ZSA9PT0gdHJ1ZSAmJiByZXZlYWxlZC52YWx1ZSAhPT0gdHJ1ZSlcbiAgICApXG5cbiAgICBjb25zdCByZXZlYWxPbkZvY3VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLm1vZGVsVmFsdWUgPT09IHRydWUgJiYgaGlkZGVuLnZhbHVlID09PSB0cnVlICYmIHByb3BzLnJldmVhbCA9PT0gdHJ1ZVxuICAgIClcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtaGVhZGVyIHEtbGF5b3V0X19zZWN0aW9uLS1tYXJnaW5hbCAnXG4gICAgICArIChmaXhlZC52YWx1ZSA9PT0gdHJ1ZSA/ICdmaXhlZCcgOiAnYWJzb2x1dGUnKSArICctdG9wJ1xuICAgICAgKyAocHJvcHMuYm9yZGVyZWQgPT09IHRydWUgPyAnIHEtaGVhZGVyLS1ib3JkZXJlZCcgOiAnJylcbiAgICAgICsgKGhpZGRlbi52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1oZWFkZXItLWhpZGRlbicgOiAnJylcbiAgICAgICsgKHByb3BzLm1vZGVsVmFsdWUgIT09IHRydWUgPyAnIHEtbGF5b3V0LS1wcmV2ZW50LWZvY3VzJyA6ICcnKVxuICAgIClcblxuICAgIGNvbnN0IHN0eWxlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3RcbiAgICAgICAgdmlldyA9ICRsYXlvdXQucm93cy52YWx1ZS50b3AsXG4gICAgICAgIGNzcyA9IHt9XG5cbiAgICAgIGlmICh2aWV3WyAwIF0gPT09ICdsJyAmJiAkbGF5b3V0LmxlZnQuc3BhY2UgPT09IHRydWUpIHtcbiAgICAgICAgY3NzWyAkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/ICdyaWdodCcgOiAnbGVmdCcgXSA9IGAkeyAkbGF5b3V0LmxlZnQuc2l6ZSB9cHhgXG4gICAgICB9XG4gICAgICBpZiAodmlld1sgMiBdID09PSAncicgJiYgJGxheW91dC5yaWdodC5zcGFjZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjc3NbICRxLmxhbmcucnRsID09PSB0cnVlID8gJ2xlZnQnIDogJ3JpZ2h0JyBdID0gYCR7ICRsYXlvdXQucmlnaHQuc2l6ZSB9cHhgXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjc3NcbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlTGF5b3V0IChwcm9wLCB2YWwpIHtcbiAgICAgICRsYXlvdXQudXBkYXRlKCdoZWFkZXInLCBwcm9wLCB2YWwpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlTG9jYWwgKHByb3AsIHZhbCkge1xuICAgICAgaWYgKHByb3AudmFsdWUgIT09IHZhbCkge1xuICAgICAgICBwcm9wLnZhbHVlID0gdmFsXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25SZXNpemUgKHsgaGVpZ2h0IH0pIHtcbiAgICAgIHVwZGF0ZUxvY2FsKHNpemUsIGhlaWdodClcbiAgICAgIHVwZGF0ZUxheW91dCgnc2l6ZScsIGhlaWdodClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkZvY3VzaW4gKGV2dCkge1xuICAgICAgaWYgKHJldmVhbE9uRm9jdXMudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgdXBkYXRlTG9jYWwocmV2ZWFsZWQsIHRydWUpXG4gICAgICB9XG5cbiAgICAgIGVtaXQoJ2ZvY3VzaW4nLCBldnQpXG4gICAgfVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMubW9kZWxWYWx1ZSwgdmFsID0+IHtcbiAgICAgIHVwZGF0ZUxheW91dCgnc3BhY2UnLCB2YWwpXG4gICAgICB1cGRhdGVMb2NhbChyZXZlYWxlZCwgdHJ1ZSlcbiAgICAgICRsYXlvdXQuYW5pbWF0ZSgpXG4gICAgfSlcblxuICAgIHdhdGNoKG9mZnNldCwgdmFsID0+IHtcbiAgICAgIHVwZGF0ZUxheW91dCgnb2Zmc2V0JywgdmFsKVxuICAgIH0pXG5cbiAgICB3YXRjaCgoKSA9PiBwcm9wcy5yZXZlYWwsIHZhbCA9PiB7XG4gICAgICB2YWwgPT09IGZhbHNlICYmIHVwZGF0ZUxvY2FsKHJldmVhbGVkLCBwcm9wcy5tb2RlbFZhbHVlKVxuICAgIH0pXG5cbiAgICB3YXRjaChyZXZlYWxlZCwgdmFsID0+IHtcbiAgICAgICRsYXlvdXQuYW5pbWF0ZSgpXG4gICAgICBlbWl0KCdyZXZlYWwnLCB2YWwpXG4gICAgfSlcblxuICAgIHdhdGNoKCRsYXlvdXQuc2Nyb2xsLCBzY3JvbGwgPT4ge1xuICAgICAgcHJvcHMucmV2ZWFsID09PSB0cnVlICYmIHVwZGF0ZUxvY2FsKHJldmVhbGVkLFxuICAgICAgICBzY3JvbGwuZGlyZWN0aW9uID09PSAndXAnXG4gICAgICAgIHx8IHNjcm9sbC5wb3NpdGlvbiA8PSBwcm9wcy5yZXZlYWxPZmZzZXRcbiAgICAgICAgfHwgc2Nyb2xsLnBvc2l0aW9uIC0gc2Nyb2xsLmluZmxlY3Rpb25Qb2ludCA8IDEwMFxuICAgICAgKVxuICAgIH0pXG5cbiAgICBjb25zdCBpbnN0YW5jZSA9IHt9XG5cbiAgICAkbGF5b3V0Lmluc3RhbmNlcy5oZWFkZXIgPSBpbnN0YW5jZVxuICAgIHByb3BzLm1vZGVsVmFsdWUgPT09IHRydWUgJiYgdXBkYXRlTGF5b3V0KCdzaXplJywgc2l6ZS52YWx1ZSlcbiAgICB1cGRhdGVMYXlvdXQoJ3NwYWNlJywgcHJvcHMubW9kZWxWYWx1ZSlcbiAgICB1cGRhdGVMYXlvdXQoJ29mZnNldCcsIG9mZnNldC52YWx1ZSlcblxuICAgIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgICBpZiAoJGxheW91dC5pbnN0YW5jZXMuaGVhZGVyID09PSBpbnN0YW5jZSkge1xuICAgICAgICAkbGF5b3V0Lmluc3RhbmNlcy5oZWFkZXIgPSB2b2lkIDBcbiAgICAgICAgdXBkYXRlTGF5b3V0KCdzaXplJywgMClcbiAgICAgICAgdXBkYXRlTGF5b3V0KCdvZmZzZXQnLCAwKVxuICAgICAgICB1cGRhdGVMYXlvdXQoJ3NwYWNlJywgZmFsc2UpXG4gICAgICB9XG4gICAgfSlcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjb25zdCBjaGlsZCA9IGhVbmlxdWVTbG90KHNsb3RzLmRlZmF1bHQsIFtdKVxuXG4gICAgICBwcm9wcy5lbGV2YXRlZCA9PT0gdHJ1ZSAmJiBjaGlsZC5wdXNoKFxuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWxheW91dF9fc2hhZG93IGFic29sdXRlLWZ1bGwgb3ZlcmZsb3ctaGlkZGVuIG5vLXBvaW50ZXItZXZlbnRzJ1xuICAgICAgICB9KVxuICAgICAgKVxuXG4gICAgICBjaGlsZC5wdXNoKFxuICAgICAgICBoKFFSZXNpemVPYnNlcnZlciwge1xuICAgICAgICAgIGRlYm91bmNlOiAwLFxuICAgICAgICAgIG9uUmVzaXplXG4gICAgICAgIH0pXG4gICAgICApXG5cbiAgICAgIHJldHVybiBoKCdoZWFkZXInLCB7XG4gICAgICAgIGNsYXNzOiBjbGFzc2VzLnZhbHVlLFxuICAgICAgICBzdHlsZTogc3R5bGUudmFsdWUsXG4gICAgICAgIG9uRm9jdXNpblxuICAgICAgfSwgY2hpbGQpXG4gICAgfVxuICB9XG59KVxuIiwiaW1wb3J0IHsgY2xpZW50IH0gZnJvbSAnLi4vLi4vcGx1Z2lucy9wbGF0Zm9ybS9QbGF0Zm9ybS5qcydcblxuaW1wb3J0IHsgY3JlYXRlRGlyZWN0aXZlIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgZ2V0TW9kaWZpZXJEaXJlY3Rpb25zLCBzaG91bGRTdGFydCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUudG91Y2gvdG91Y2guanMnXG5pbXBvcnQgeyBhZGRFdnQsIGNsZWFuRXZ0LCBwb3NpdGlvbiwgbGVmdENsaWNrLCBwcmV2ZW50LCBzdG9wLCBzdG9wQW5kUHJldmVudCwgcHJldmVudERyYWdnYWJsZSwgbm9vcCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50L2V2ZW50LmpzJ1xuaW1wb3J0IHsgY2xlYXJTZWxlY3Rpb24gfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnNlbGVjdGlvbi9zZWxlY3Rpb24uanMnXG5pbXBvcnQgZ2V0U1NSUHJvcHMgZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5ub29wLXNzci1kaXJlY3RpdmUtdHJhbnNmb3JtL25vb3Atc3NyLWRpcmVjdGl2ZS10cmFuc2Zvcm0uanMnXG5cbmZ1bmN0aW9uIGdldENoYW5nZXMgKGV2dCwgY3R4LCBpc0ZpbmFsKSB7XG4gIGNvbnN0IHBvcyA9IHBvc2l0aW9uKGV2dClcbiAgbGV0XG4gICAgZGlyLFxuICAgIGRpc3RYID0gcG9zLmxlZnQgLSBjdHguZXZlbnQueCxcbiAgICBkaXN0WSA9IHBvcy50b3AgLSBjdHguZXZlbnQueSxcbiAgICBhYnNYID0gTWF0aC5hYnMoZGlzdFgpLFxuICAgIGFic1kgPSBNYXRoLmFicyhkaXN0WSlcblxuICBjb25zdCBkaXJlY3Rpb24gPSBjdHguZGlyZWN0aW9uXG5cbiAgaWYgKGRpcmVjdGlvbi5ob3Jpem9udGFsID09PSB0cnVlICYmIGRpcmVjdGlvbi52ZXJ0aWNhbCAhPT0gdHJ1ZSkge1xuICAgIGRpciA9IGRpc3RYIDwgMCA/ICdsZWZ0JyA6ICdyaWdodCdcbiAgfVxuICBlbHNlIGlmIChkaXJlY3Rpb24uaG9yaXpvbnRhbCAhPT0gdHJ1ZSAmJiBkaXJlY3Rpb24udmVydGljYWwgPT09IHRydWUpIHtcbiAgICBkaXIgPSBkaXN0WSA8IDAgPyAndXAnIDogJ2Rvd24nXG4gIH1cbiAgZWxzZSBpZiAoZGlyZWN0aW9uLnVwID09PSB0cnVlICYmIGRpc3RZIDwgMCkge1xuICAgIGRpciA9ICd1cCdcbiAgICBpZiAoYWJzWCA+IGFic1kpIHtcbiAgICAgIGlmIChkaXJlY3Rpb24ubGVmdCA9PT0gdHJ1ZSAmJiBkaXN0WCA8IDApIHtcbiAgICAgICAgZGlyID0gJ2xlZnQnXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChkaXJlY3Rpb24ucmlnaHQgPT09IHRydWUgJiYgZGlzdFggPiAwKSB7XG4gICAgICAgIGRpciA9ICdyaWdodCdcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZWxzZSBpZiAoZGlyZWN0aW9uLmRvd24gPT09IHRydWUgJiYgZGlzdFkgPiAwKSB7XG4gICAgZGlyID0gJ2Rvd24nXG4gICAgaWYgKGFic1ggPiBhYnNZKSB7XG4gICAgICBpZiAoZGlyZWN0aW9uLmxlZnQgPT09IHRydWUgJiYgZGlzdFggPCAwKSB7XG4gICAgICAgIGRpciA9ICdsZWZ0J1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoZGlyZWN0aW9uLnJpZ2h0ID09PSB0cnVlICYmIGRpc3RYID4gMCkge1xuICAgICAgICBkaXIgPSAncmlnaHQnXG4gICAgICB9XG4gICAgfVxuICB9XG4gIGVsc2UgaWYgKGRpcmVjdGlvbi5sZWZ0ID09PSB0cnVlICYmIGRpc3RYIDwgMCkge1xuICAgIGRpciA9ICdsZWZ0J1xuICAgIGlmIChhYnNYIDwgYWJzWSkge1xuICAgICAgaWYgKGRpcmVjdGlvbi51cCA9PT0gdHJ1ZSAmJiBkaXN0WSA8IDApIHtcbiAgICAgICAgZGlyID0gJ3VwJ1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoZGlyZWN0aW9uLmRvd24gPT09IHRydWUgJiYgZGlzdFkgPiAwKSB7XG4gICAgICAgIGRpciA9ICdkb3duJ1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBlbHNlIGlmIChkaXJlY3Rpb24ucmlnaHQgPT09IHRydWUgJiYgZGlzdFggPiAwKSB7XG4gICAgZGlyID0gJ3JpZ2h0J1xuICAgIGlmIChhYnNYIDwgYWJzWSkge1xuICAgICAgaWYgKGRpcmVjdGlvbi51cCA9PT0gdHJ1ZSAmJiBkaXN0WSA8IDApIHtcbiAgICAgICAgZGlyID0gJ3VwJ1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoZGlyZWN0aW9uLmRvd24gPT09IHRydWUgJiYgZGlzdFkgPiAwKSB7XG4gICAgICAgIGRpciA9ICdkb3duJ1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGxldCBzeW50aGV0aWMgPSBmYWxzZVxuXG4gIGlmIChkaXIgPT09IHZvaWQgMCAmJiBpc0ZpbmFsID09PSBmYWxzZSkge1xuICAgIGlmIChjdHguZXZlbnQuaXNGaXJzdCA9PT0gdHJ1ZSB8fCBjdHguZXZlbnQubGFzdERpciA9PT0gdm9pZCAwKSB7XG4gICAgICByZXR1cm4ge31cbiAgICB9XG5cbiAgICBkaXIgPSBjdHguZXZlbnQubGFzdERpclxuICAgIHN5bnRoZXRpYyA9IHRydWVcblxuICAgIGlmIChkaXIgPT09ICdsZWZ0JyB8fCBkaXIgPT09ICdyaWdodCcpIHtcbiAgICAgIHBvcy5sZWZ0IC09IGRpc3RYXG4gICAgICBhYnNYID0gMFxuICAgICAgZGlzdFggPSAwXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcG9zLnRvcCAtPSBkaXN0WVxuICAgICAgYWJzWSA9IDBcbiAgICAgIGRpc3RZID0gMFxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgc3ludGhldGljLFxuICAgIHBheWxvYWQ6IHtcbiAgICAgIGV2dCxcbiAgICAgIHRvdWNoOiBjdHguZXZlbnQubW91c2UgIT09IHRydWUsXG4gICAgICBtb3VzZTogY3R4LmV2ZW50Lm1vdXNlID09PSB0cnVlLFxuICAgICAgcG9zaXRpb246IHBvcyxcbiAgICAgIGRpcmVjdGlvbjogZGlyLFxuICAgICAgaXNGaXJzdDogY3R4LmV2ZW50LmlzRmlyc3QsXG4gICAgICBpc0ZpbmFsOiBpc0ZpbmFsID09PSB0cnVlLFxuICAgICAgZHVyYXRpb246IERhdGUubm93KCkgLSBjdHguZXZlbnQudGltZSxcbiAgICAgIGRpc3RhbmNlOiB7XG4gICAgICAgIHg6IGFic1gsXG4gICAgICAgIHk6IGFic1lcbiAgICAgIH0sXG4gICAgICBvZmZzZXQ6IHtcbiAgICAgICAgeDogZGlzdFgsXG4gICAgICAgIHk6IGRpc3RZXG4gICAgICB9LFxuICAgICAgZGVsdGE6IHtcbiAgICAgICAgeDogcG9zLmxlZnQgLSBjdHguZXZlbnQubGFzdFgsXG4gICAgICAgIHk6IHBvcy50b3AgLSBjdHguZXZlbnQubGFzdFlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxubGV0IHVpZCA9IDBcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlRGlyZWN0aXZlKF9fUVVBU0FSX1NTUl9TRVJWRVJfX1xuICA/IHsgbmFtZTogJ3RvdWNoLXBhbicsIGdldFNTUlByb3BzIH1cbiAgOiB7XG4gICAgICBuYW1lOiAndG91Y2gtcGFuJyxcblxuICAgICAgYmVmb3JlTW91bnQgKGVsLCB7IHZhbHVlLCBtb2RpZmllcnMgfSkge1xuICAgICAgICAvLyBlYXJseSByZXR1cm4sIHdlIGRvbid0IG5lZWQgdG8gZG8gYW55dGhpbmdcbiAgICAgICAgaWYgKFxuICAgICAgICAgIG1vZGlmaWVycy5tb3VzZSAhPT0gdHJ1ZVxuICAgICAgICAgICYmIGNsaWVudC5oYXMudG91Y2ggIT09IHRydWVcbiAgICAgICAgKSByZXR1cm5cblxuICAgICAgICBmdW5jdGlvbiBoYW5kbGVFdmVudCAoZXZ0LCBtb3VzZUV2ZW50KSB7XG4gICAgICAgICAgaWYgKG1vZGlmaWVycy5tb3VzZSA9PT0gdHJ1ZSAmJiBtb3VzZUV2ZW50ID09PSB0cnVlKSB7XG4gICAgICAgICAgICBzdG9wQW5kUHJldmVudChldnQpXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbW9kaWZpZXJzLnN0b3AgPT09IHRydWUgJiYgc3RvcChldnQpXG4gICAgICAgICAgICBtb2RpZmllcnMucHJldmVudCA9PT0gdHJ1ZSAmJiBwcmV2ZW50KGV2dClcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjdHggPSB7XG4gICAgICAgICAgdWlkOiAncXZ0cF8nICsgKHVpZCsrKSxcbiAgICAgICAgICBoYW5kbGVyOiB2YWx1ZSxcbiAgICAgICAgICBtb2RpZmllcnMsXG4gICAgICAgICAgZGlyZWN0aW9uOiBnZXRNb2RpZmllckRpcmVjdGlvbnMobW9kaWZpZXJzKSxcblxuICAgICAgICAgIG5vb3AsXG5cbiAgICAgICAgICBtb3VzZVN0YXJ0IChldnQpIHtcbiAgICAgICAgICAgIGlmIChzaG91bGRTdGFydChldnQsIGN0eCkgJiYgbGVmdENsaWNrKGV2dCkpIHtcbiAgICAgICAgICAgICAgYWRkRXZ0KGN0eCwgJ3RlbXAnLCBbXG4gICAgICAgICAgICAgICAgWyBkb2N1bWVudCwgJ21vdXNlbW92ZScsICdtb3ZlJywgJ25vdFBhc3NpdmVDYXB0dXJlJyBdLFxuICAgICAgICAgICAgICAgIFsgZG9jdW1lbnQsICdtb3VzZXVwJywgJ2VuZCcsICdwYXNzaXZlQ2FwdHVyZScgXVxuICAgICAgICAgICAgICBdKVxuXG4gICAgICAgICAgICAgIGN0eC5zdGFydChldnQsIHRydWUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHRvdWNoU3RhcnQgKGV2dCkge1xuICAgICAgICAgICAgaWYgKHNob3VsZFN0YXJ0KGV2dCwgY3R4KSkge1xuICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBldnQudGFyZ2V0XG5cbiAgICAgICAgICAgICAgYWRkRXZ0KGN0eCwgJ3RlbXAnLCBbXG4gICAgICAgICAgICAgICAgWyB0YXJnZXQsICd0b3VjaG1vdmUnLCAnbW92ZScsICdub3RQYXNzaXZlQ2FwdHVyZScgXSxcbiAgICAgICAgICAgICAgICBbIHRhcmdldCwgJ3RvdWNoY2FuY2VsJywgJ2VuZCcsICdwYXNzaXZlQ2FwdHVyZScgXSxcbiAgICAgICAgICAgICAgICBbIHRhcmdldCwgJ3RvdWNoZW5kJywgJ2VuZCcsICdwYXNzaXZlQ2FwdHVyZScgXVxuICAgICAgICAgICAgICBdKVxuXG4gICAgICAgICAgICAgIGN0eC5zdGFydChldnQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHN0YXJ0IChldnQsIG1vdXNlRXZlbnQpIHtcbiAgICAgICAgICAgIGNsaWVudC5pcy5maXJlZm94ID09PSB0cnVlICYmIHByZXZlbnREcmFnZ2FibGUoZWwsIHRydWUpXG4gICAgICAgICAgICBjdHgubGFzdEV2dCA9IGV2dFxuXG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgKiBTdG9wIHByb3BhZ2F0aW9uIHNvIHBvc3NpYmxlIHVwcGVyIHYtdG91Y2gtcGFuIGRvbid0IGNhdGNoIHRoaXMgYXMgd2VsbDtcbiAgICAgICAgICAgICogSWYgd2UncmUgbm90IHRoZSB0YXJnZXQgKGJhc2VkIG9uIG1vZGlmaWVycyksIHdlJ2xsIHJlLWVtaXQgdGhlIGV2ZW50IGxhdGVyXG4gICAgICAgICAgICAqL1xuICAgICAgICAgICAgaWYgKG1vdXNlRXZlbnQgPT09IHRydWUgfHwgbW9kaWZpZXJzLnN0b3AgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgKiBhcmUgd2UgZGlyZWN0bHkgc3dpdGNoaW5nIHRvIGRldGVjdGVkIHN0YXRlP1xuICAgICAgICAgICAgICAqIGNsb25lIGV2ZW50IG9ubHkgb3RoZXJ3aXNlXG4gICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBjdHguZGlyZWN0aW9uLmFsbCAhPT0gdHJ1ZVxuICAgICAgICAgICAgICAgIC8vIGFjY291bnQgZm9yIFVNRCB0b28gd2hlcmUgbW9kaWZpZXJzIHdpbGwgYmUgbG93ZXJjYXNlZCB0byB3b3JrXG4gICAgICAgICAgICAgICAgJiYgKG1vdXNlRXZlbnQgIT09IHRydWUgfHwgKGN0eC5tb2RpZmllcnMubW91c2VBbGxEaXIgIT09IHRydWUgJiYgY3R4Lm1vZGlmaWVycy5tb3VzZWFsbGRpciAhPT0gdHJ1ZSkpXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNsb25lID0gZXZ0LnR5cGUuaW5kZXhPZignbW91c2UnKSAhPT0gLTFcbiAgICAgICAgICAgICAgICAgID8gbmV3IE1vdXNlRXZlbnQoZXZ0LnR5cGUsIGV2dClcbiAgICAgICAgICAgICAgICAgIDogbmV3IFRvdWNoRXZlbnQoZXZ0LnR5cGUsIGV2dClcblxuICAgICAgICAgICAgICAgIGV2dC5kZWZhdWx0UHJldmVudGVkID09PSB0cnVlICYmIHByZXZlbnQoY2xvbmUpXG4gICAgICAgICAgICAgICAgZXZ0LmNhbmNlbEJ1YmJsZSA9PT0gdHJ1ZSAmJiBzdG9wKGNsb25lKVxuXG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihjbG9uZSwge1xuICAgICAgICAgICAgICAgICAgcUtleUV2ZW50OiBldnQucUtleUV2ZW50LFxuICAgICAgICAgICAgICAgICAgcUNsaWNrT3V0c2lkZTogZXZ0LnFDbGlja091dHNpZGUsXG4gICAgICAgICAgICAgICAgICBxQW5jaG9ySGFuZGxlZDogZXZ0LnFBbmNob3JIYW5kbGVkLFxuICAgICAgICAgICAgICAgICAgcUNsb25lZEJ5OiBldnQucUNsb25lZEJ5ID09PSB2b2lkIDBcbiAgICAgICAgICAgICAgICAgICAgPyBbIGN0eC51aWQgXVxuICAgICAgICAgICAgICAgICAgICA6IGV2dC5xQ2xvbmVkQnkuY29uY2F0KGN0eC51aWQpXG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIGN0eC5pbml0aWFsRXZlbnQgPSB7XG4gICAgICAgICAgICAgICAgICB0YXJnZXQ6IGV2dC50YXJnZXQsXG4gICAgICAgICAgICAgICAgICBldmVudDogY2xvbmVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBzdG9wKGV2dClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgeyBsZWZ0LCB0b3AgfSA9IHBvc2l0aW9uKGV2dClcblxuICAgICAgICAgICAgY3R4LmV2ZW50ID0ge1xuICAgICAgICAgICAgICB4OiBsZWZ0LFxuICAgICAgICAgICAgICB5OiB0b3AsXG4gICAgICAgICAgICAgIHRpbWU6IERhdGUubm93KCksXG4gICAgICAgICAgICAgIG1vdXNlOiBtb3VzZUV2ZW50ID09PSB0cnVlLFxuICAgICAgICAgICAgICBkZXRlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgIGlzRmlyc3Q6IHRydWUsXG4gICAgICAgICAgICAgIGlzRmluYWw6IGZhbHNlLFxuICAgICAgICAgICAgICBsYXN0WDogbGVmdCxcbiAgICAgICAgICAgICAgbGFzdFk6IHRvcFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBtb3ZlIChldnQpIHtcbiAgICAgICAgICAgIGlmIChjdHguZXZlbnQgPT09IHZvaWQgMCkgcmV0dXJuXG5cbiAgICAgICAgICAgIGNvbnN0XG4gICAgICAgICAgICAgIHBvcyA9IHBvc2l0aW9uKGV2dCksXG4gICAgICAgICAgICAgIGRpc3RYID0gcG9zLmxlZnQgLSBjdHguZXZlbnQueCxcbiAgICAgICAgICAgICAgZGlzdFkgPSBwb3MudG9wIC0gY3R4LmV2ZW50LnlcblxuICAgICAgICAgICAgLy8gcHJldmVudCBidWdneSBicm93c2VyIGJlaGF2aW9yIChsaWtlIEJsaW5rLWJhc2VkIGVuZ2luZSBvbmVzIG9uIFdpbmRvd3MpXG4gICAgICAgICAgICAvLyB3aGVyZSB0aGUgbW91c2Vtb3ZlIGV2ZW50IG9jY3VycyBldmVuIGlmIHRoZXJlJ3Mgbm8gbW92ZW1lbnQgYWZ0ZXIgbW91c2Vkb3duXG4gICAgICAgICAgICAvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD0xNjE0NjRcbiAgICAgICAgICAgIC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTcyMTM0MVxuICAgICAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3F1YXNhcmZyYW1ld29yay9xdWFzYXIvaXNzdWVzLzEwNzIxXG4gICAgICAgICAgICBpZiAoZGlzdFggPT09IDAgJiYgZGlzdFkgPT09IDApIHJldHVyblxuXG4gICAgICAgICAgICBjdHgubGFzdEV2dCA9IGV2dFxuXG4gICAgICAgICAgICBjb25zdCBpc01vdXNlRXZ0ID0gY3R4LmV2ZW50Lm1vdXNlID09PSB0cnVlXG4gICAgICAgICAgICBjb25zdCBzdGFydCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgaGFuZGxlRXZlbnQoZXZ0LCBpc01vdXNlRXZ0KVxuXG4gICAgICAgICAgICAgIGxldCBjdXJzb3JcbiAgICAgICAgICAgICAgaWYgKG1vZGlmaWVycy5wcmVzZXJ2ZUN1cnNvciAhPT0gdHJ1ZSAmJiBtb2RpZmllcnMucHJlc2VydmVjdXJzb3IgIT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBjdXJzb3IgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuY3Vyc29yIHx8ICcnXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLmN1cnNvciA9ICdncmFiYmluZydcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlzTW91c2VFdnQgPT09IHRydWUgJiYgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCduby1wb2ludGVyLWV2ZW50cy0tY2hpbGRyZW4nKVxuICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ25vbi1zZWxlY3RhYmxlJylcbiAgICAgICAgICAgICAgY2xlYXJTZWxlY3Rpb24oKVxuXG4gICAgICAgICAgICAgIGN0eC5zdHlsZUNsZWFudXAgPSB3aXRoRGVsYXllZEZuID0+IHtcbiAgICAgICAgICAgICAgICBjdHguc3R5bGVDbGVhbnVwID0gdm9pZCAwXG5cbiAgICAgICAgICAgICAgICBpZiAoY3Vyc29yICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5jdXJzb3IgPSBjdXJzb3JcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ25vbi1zZWxlY3RhYmxlJylcblxuICAgICAgICAgICAgICAgIGlmIChpc01vdXNlRXZ0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCByZW1vdmUgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnbm8tcG9pbnRlci1ldmVudHMtLWNoaWxkcmVuJylcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgaWYgKHdpdGhEZWxheWVkRm4gIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICByZW1vdmUoKVxuICAgICAgICAgICAgICAgICAgICAgIHdpdGhEZWxheWVkRm4oKVxuICAgICAgICAgICAgICAgICAgICB9LCA1MClcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGVsc2UgeyByZW1vdmUoKSB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHdpdGhEZWxheWVkRm4gIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgICAgd2l0aERlbGF5ZWRGbigpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjdHguZXZlbnQuZGV0ZWN0ZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgY3R4LmV2ZW50LmlzRmlyc3QgIT09IHRydWUgJiYgaGFuZGxlRXZlbnQoZXZ0LCBjdHguZXZlbnQubW91c2UpXG5cbiAgICAgICAgICAgICAgY29uc3QgeyBwYXlsb2FkLCBzeW50aGV0aWMgfSA9IGdldENoYW5nZXMoZXZ0LCBjdHgsIGZhbHNlKVxuXG4gICAgICAgICAgICAgIGlmIChwYXlsb2FkICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICBpZiAoY3R4LmhhbmRsZXIocGF5bG9hZCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICBjdHguZW5kKGV2dClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICBpZiAoY3R4LnN0eWxlQ2xlYW51cCA9PT0gdm9pZCAwICYmIGN0eC5ldmVudC5pc0ZpcnN0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0KClcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgY3R4LmV2ZW50Lmxhc3RYID0gcGF5bG9hZC5wb3NpdGlvbi5sZWZ0XG4gICAgICAgICAgICAgICAgICBjdHguZXZlbnQubGFzdFkgPSBwYXlsb2FkLnBvc2l0aW9uLnRvcFxuICAgICAgICAgICAgICAgICAgY3R4LmV2ZW50Lmxhc3REaXIgPSBzeW50aGV0aWMgPT09IHRydWUgPyB2b2lkIDAgOiBwYXlsb2FkLmRpcmVjdGlvblxuICAgICAgICAgICAgICAgICAgY3R4LmV2ZW50LmlzRmlyc3QgPSBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGN0eC5kaXJlY3Rpb24uYWxsID09PSB0cnVlXG4gICAgICAgICAgICAgIC8vIGFjY291bnQgZm9yIFVNRCB0b28gd2hlcmUgbW9kaWZpZXJzIHdpbGwgYmUgbG93ZXJjYXNlZCB0byB3b3JrXG4gICAgICAgICAgICAgIHx8IChpc01vdXNlRXZ0ID09PSB0cnVlICYmIChjdHgubW9kaWZpZXJzLm1vdXNlQWxsRGlyID09PSB0cnVlIHx8IGN0eC5tb2RpZmllcnMubW91c2VhbGxkaXIgPT09IHRydWUpKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHN0YXJ0KClcbiAgICAgICAgICAgICAgY3R4LmV2ZW50LmRldGVjdGVkID0gdHJ1ZVxuICAgICAgICAgICAgICBjdHgubW92ZShldnQpXG4gICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdFxuICAgICAgICAgICAgICBhYnNYID0gTWF0aC5hYnMoZGlzdFgpLFxuICAgICAgICAgICAgICBhYnNZID0gTWF0aC5hYnMoZGlzdFkpXG5cbiAgICAgICAgICAgIGlmIChhYnNYICE9PSBhYnNZKSB7XG4gICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAoY3R4LmRpcmVjdGlvbi5ob3Jpem9udGFsID09PSB0cnVlICYmIGFic1ggPiBhYnNZKVxuICAgICAgICAgICAgICAgIHx8IChjdHguZGlyZWN0aW9uLnZlcnRpY2FsID09PSB0cnVlICYmIGFic1ggPCBhYnNZKVxuICAgICAgICAgICAgICAgIHx8IChjdHguZGlyZWN0aW9uLnVwID09PSB0cnVlICYmIGFic1ggPCBhYnNZICYmIGRpc3RZIDwgMClcbiAgICAgICAgICAgICAgICB8fCAoY3R4LmRpcmVjdGlvbi5kb3duID09PSB0cnVlICYmIGFic1ggPCBhYnNZICYmIGRpc3RZID4gMClcbiAgICAgICAgICAgICAgICB8fCAoY3R4LmRpcmVjdGlvbi5sZWZ0ID09PSB0cnVlICYmIGFic1ggPiBhYnNZICYmIGRpc3RYIDwgMClcbiAgICAgICAgICAgICAgICB8fCAoY3R4LmRpcmVjdGlvbi5yaWdodCA9PT0gdHJ1ZSAmJiBhYnNYID4gYWJzWSAmJiBkaXN0WCA+IDApXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGN0eC5ldmVudC5kZXRlY3RlZCA9IHRydWVcbiAgICAgICAgICAgICAgICBjdHgubW92ZShldnQpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY3R4LmVuZChldnQsIHRydWUpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgZW5kIChldnQsIGFib3J0KSB7XG4gICAgICAgICAgICBpZiAoY3R4LmV2ZW50ID09PSB2b2lkIDApIHJldHVyblxuXG4gICAgICAgICAgICBjbGVhbkV2dChjdHgsICd0ZW1wJylcbiAgICAgICAgICAgIGNsaWVudC5pcy5maXJlZm94ID09PSB0cnVlICYmIHByZXZlbnREcmFnZ2FibGUoZWwsIGZhbHNlKVxuXG4gICAgICAgICAgICBpZiAoYWJvcnQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgY3R4LnN0eWxlQ2xlYW51cD8uKClcblxuICAgICAgICAgICAgICBpZiAoY3R4LmV2ZW50LmRldGVjdGVkICE9PSB0cnVlICYmIGN0eC5pbml0aWFsRXZlbnQgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgIGN0eC5pbml0aWFsRXZlbnQudGFyZ2V0LmRpc3BhdGNoRXZlbnQoY3R4LmluaXRpYWxFdmVudC5ldmVudClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY3R4LmV2ZW50LmRldGVjdGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgIGN0eC5ldmVudC5pc0ZpcnN0ID09PSB0cnVlICYmIGN0eC5oYW5kbGVyKGdldENoYW5nZXMoZXZ0ID09PSB2b2lkIDAgPyBjdHgubGFzdEV2dCA6IGV2dCwgY3R4KS5wYXlsb2FkKVxuXG4gICAgICAgICAgICAgIGNvbnN0IHsgcGF5bG9hZCB9ID0gZ2V0Q2hhbmdlcyhldnQgPT09IHZvaWQgMCA/IGN0eC5sYXN0RXZ0IDogZXZ0LCBjdHgsIHRydWUpXG4gICAgICAgICAgICAgIGNvbnN0IGZuID0gKCkgPT4geyBjdHguaGFuZGxlcihwYXlsb2FkKSB9XG5cbiAgICAgICAgICAgICAgaWYgKGN0eC5zdHlsZUNsZWFudXAgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgIGN0eC5zdHlsZUNsZWFudXAoZm4pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZm4oKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGN0eC5ldmVudCA9IHZvaWQgMFxuICAgICAgICAgICAgY3R4LmluaXRpYWxFdmVudCA9IHZvaWQgMFxuICAgICAgICAgICAgY3R4Lmxhc3RFdnQgPSB2b2lkIDBcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBlbC5fX3F0b3VjaHBhbiA9IGN0eFxuXG4gICAgICAgIGlmIChtb2RpZmllcnMubW91c2UgPT09IHRydWUpIHtcbiAgICAgICAgICAvLyBhY2NvdW50IGZvciBVTUQgdG9vIHdoZXJlIG1vZGlmaWVycyB3aWxsIGJlIGxvd2VyY2FzZWQgdG8gd29ya1xuICAgICAgICAgIGNvbnN0IGNhcHR1cmUgPSBtb2RpZmllcnMubW91c2VDYXB0dXJlID09PSB0cnVlIHx8IG1vZGlmaWVycy5tb3VzZWNhcHR1cmUgPT09IHRydWVcbiAgICAgICAgICAgID8gJ0NhcHR1cmUnXG4gICAgICAgICAgICA6ICcnXG5cbiAgICAgICAgICBhZGRFdnQoY3R4LCAnbWFpbicsIFtcbiAgICAgICAgICAgIFsgZWwsICdtb3VzZWRvd24nLCAnbW91c2VTdGFydCcsIGBwYXNzaXZlJHsgY2FwdHVyZSB9YCBdXG4gICAgICAgICAgXSlcbiAgICAgICAgfVxuXG4gICAgICAgIGNsaWVudC5oYXMudG91Y2ggPT09IHRydWUgJiYgYWRkRXZ0KGN0eCwgJ21haW4nLCBbXG4gICAgICAgICAgWyBlbCwgJ3RvdWNoc3RhcnQnLCAndG91Y2hTdGFydCcsIGBwYXNzaXZlJHsgbW9kaWZpZXJzLmNhcHR1cmUgPT09IHRydWUgPyAnQ2FwdHVyZScgOiAnJyB9YCBdLFxuICAgICAgICAgIFsgZWwsICd0b3VjaG1vdmUnLCAnbm9vcCcsICdub3RQYXNzaXZlQ2FwdHVyZScgXSAvLyBjYW5ub3QgYmUgcGFzc2l2ZSAoZXg6IGlPUyBzY3JvbGwpXG4gICAgICAgIF0pXG4gICAgICB9LFxuXG4gICAgICB1cGRhdGVkIChlbCwgYmluZGluZ3MpIHtcbiAgICAgICAgY29uc3QgY3R4ID0gZWwuX19xdG91Y2hwYW5cblxuICAgICAgICBpZiAoY3R4ICE9PSB2b2lkIDApIHtcbiAgICAgICAgICBpZiAoYmluZGluZ3Mub2xkVmFsdWUgIT09IGJpbmRpbmdzLnZhbHVlKSB7XG4gICAgICAgICAgICB0eXBlb2YgdmFsdWUgIT09ICdmdW5jdGlvbicgJiYgY3R4LmVuZCgpXG4gICAgICAgICAgICBjdHguaGFuZGxlciA9IGJpbmRpbmdzLnZhbHVlXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY3R4LmRpcmVjdGlvbiA9IGdldE1vZGlmaWVyRGlyZWN0aW9ucyhiaW5kaW5ncy5tb2RpZmllcnMpXG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIGJlZm9yZVVubW91bnQgKGVsKSB7XG4gICAgICAgIGNvbnN0IGN0eCA9IGVsLl9fcXRvdWNocGFuXG5cbiAgICAgICAgaWYgKGN0eCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgLy8gZW1pdCB0aGUgZW5kIGV2ZW50IHdoZW4gdGhlIGRpcmVjdGl2ZSBpcyBkZXN0cm95ZWQgd2hpbGUgYWN0aXZlXG4gICAgICAgICAgLy8gdGhpcyBpcyBvbmx5IG5lZWRlZCBpbiBUb3VjaFBhbiBiZWNhdXNlIHRoZSByZXN0IG9mIHRoZSB0b3VjaCBkaXJlY3RpdmVzIGRvIG5vdCBlbWl0IGFuIGVuZCBldmVudFxuICAgICAgICAgIC8vIHRoZSBjb25kaXRpb24gaXMgYWxzbyBjaGVja2VkIGluIHRoZSBzdGFydCBvZiBmdW5jdGlvbiBidXQgd2UgYXZvaWQgdGhlIGNhbGxcbiAgICAgICAgICBjdHguZXZlbnQgIT09IHZvaWQgMCAmJiBjdHguZW5kKClcblxuICAgICAgICAgIGNsZWFuRXZ0KGN0eCwgJ21haW4nKVxuICAgICAgICAgIGNsZWFuRXZ0KGN0eCwgJ3RlbXAnKVxuXG4gICAgICAgICAgY2xpZW50LmlzLmZpcmVmb3ggPT09IHRydWUgJiYgcHJldmVudERyYWdnYWJsZShlbCwgZmFsc2UpXG4gICAgICAgICAgY3R4LnN0eWxlQ2xlYW51cD8uKClcblxuICAgICAgICAgIGRlbGV0ZSBlbC5fX3F0b3VjaHBhblxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuKVxuIiwiaW1wb3J0IHsgaCwgd2l0aERpcmVjdGl2ZXMsIHJlZiwgY29tcHV0ZWQsIHdhdGNoLCBvbk1vdW50ZWQsIG9uQmVmb3JlVW5tb3VudCwgbmV4dFRpY2ssIGluamVjdCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlSGlzdG9yeSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1oaXN0b3J5L3VzZS1oaXN0b3J5LmpzJ1xuaW1wb3J0IHVzZU1vZGVsVG9nZ2xlLCB7IHVzZU1vZGVsVG9nZ2xlUHJvcHMsIHVzZU1vZGVsVG9nZ2xlRW1pdHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1tb2RlbC10b2dnbGUvdXNlLW1vZGVsLXRvZ2dsZS5qcydcbmltcG9ydCB1c2VQcmV2ZW50U2Nyb2xsIGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLXByZXZlbnQtc2Nyb2xsL3VzZS1wcmV2ZW50LXNjcm9sbC5qcydcbmltcG9ydCB1c2VUaW1lb3V0IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3VzZS10aW1lb3V0L3VzZS10aW1lb3V0LmpzJ1xuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtZGFyay91c2UtZGFyay5qcydcblxuaW1wb3J0IFRvdWNoUGFuIGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvdG91Y2gtcGFuL1RvdWNoUGFuLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBiZXR3ZWVuIH0gZnJvbSAnLi4vLi4vdXRpbHMvZm9ybWF0L2Zvcm1hdC5qcydcbmltcG9ydCB7IGhTbG90LCBoRGlyIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5yZW5kZXIvcmVuZGVyLmpzJ1xuaW1wb3J0IHsgbGF5b3V0S2V5LCBlbXB0eVJlbmRlckZuIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5zeW1ib2xzL3N5bWJvbHMuanMnXG5cbmNvbnN0IGR1cmF0aW9uID0gMTUwXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRRHJhd2VyJyxcblxuICBpbmhlcml0QXR0cnM6IGZhbHNlLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlTW9kZWxUb2dnbGVQcm9wcyxcbiAgICAuLi51c2VEYXJrUHJvcHMsXG5cbiAgICBzaWRlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnbGVmdCcsXG4gICAgICB2YWxpZGF0b3I6IHYgPT4gWyAnbGVmdCcsICdyaWdodCcgXS5pbmNsdWRlcyh2KVxuICAgIH0sXG5cbiAgICB3aWR0aDoge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgZGVmYXVsdDogMzAwXG4gICAgfSxcblxuICAgIG1pbmk6IEJvb2xlYW4sXG4gICAgbWluaVRvT3ZlcmxheTogQm9vbGVhbixcbiAgICBtaW5pV2lkdGg6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIGRlZmF1bHQ6IDU3XG4gICAgfSxcbiAgICBub01pbmlBbmltYXRpb246IEJvb2xlYW4sXG5cbiAgICBicmVha3BvaW50OiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICBkZWZhdWx0OiAxMDIzXG4gICAgfSxcbiAgICBzaG93SWZBYm92ZTogQm9vbGVhbixcblxuICAgIGJlaGF2aW9yOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWxpZGF0b3I6IHYgPT4gWyAnZGVmYXVsdCcsICdkZXNrdG9wJywgJ21vYmlsZScgXS5pbmNsdWRlcyh2KSxcbiAgICAgIGRlZmF1bHQ6ICdkZWZhdWx0J1xuICAgIH0sXG5cbiAgICBib3JkZXJlZDogQm9vbGVhbixcbiAgICBlbGV2YXRlZDogQm9vbGVhbixcblxuICAgIG92ZXJsYXk6IEJvb2xlYW4sXG4gICAgcGVyc2lzdGVudDogQm9vbGVhbixcbiAgICBub1N3aXBlT3BlbjogQm9vbGVhbixcbiAgICBub1N3aXBlQ2xvc2U6IEJvb2xlYW4sXG4gICAgbm9Td2lwZUJhY2tkcm9wOiBCb29sZWFuXG4gIH0sXG5cbiAgZW1pdHM6IFtcbiAgICAuLi51c2VNb2RlbFRvZ2dsZUVtaXRzLFxuICAgICdvbkxheW91dCcsICdtaW5pU3RhdGUnXG4gIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0LCBhdHRycyB9KSB7XG4gICAgY29uc3Qgdm0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICAgIGNvbnN0IHsgcHJveHk6IHsgJHEgfSB9ID0gdm1cblxuICAgIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsICRxKVxuICAgIGNvbnN0IHsgcHJldmVudEJvZHlTY3JvbGwgfSA9IHVzZVByZXZlbnRTY3JvbGwoKVxuICAgIGNvbnN0IHsgcmVnaXN0ZXJUaW1lb3V0LCByZW1vdmVUaW1lb3V0IH0gPSB1c2VUaW1lb3V0KClcblxuICAgIGNvbnN0ICRsYXlvdXQgPSBpbmplY3QobGF5b3V0S2V5LCBlbXB0eVJlbmRlckZuKVxuICAgIGlmICgkbGF5b3V0ID09PSBlbXB0eVJlbmRlckZuKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdRRHJhd2VyIG5lZWRzIHRvIGJlIGNoaWxkIG9mIFFMYXlvdXQnKVxuICAgICAgcmV0dXJuIGVtcHR5UmVuZGVyRm5cbiAgICB9XG5cbiAgICBsZXQgbGFzdERlc2t0b3BTdGF0ZSwgdGltZXJNaW5pID0gbnVsbCwgbGF5b3V0VG90YWxXaWR0aFdhdGNoZXJcblxuICAgIGNvbnN0IGJlbG93QnJlYWtwb2ludCA9IHJlZihcbiAgICAgIHByb3BzLmJlaGF2aW9yID09PSAnbW9iaWxlJ1xuICAgICAgfHwgKHByb3BzLmJlaGF2aW9yICE9PSAnZGVza3RvcCcgJiYgJGxheW91dC50b3RhbFdpZHRoLnZhbHVlIDw9IHByb3BzLmJyZWFrcG9pbnQpXG4gICAgKVxuXG4gICAgY29uc3QgaXNNaW5pID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLm1pbmkgPT09IHRydWUgJiYgYmVsb3dCcmVha3BvaW50LnZhbHVlICE9PSB0cnVlXG4gICAgKVxuXG4gICAgY29uc3Qgc2l6ZSA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIGlzTWluaS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICA/IHByb3BzLm1pbmlXaWR0aFxuICAgICAgICA6IHByb3BzLndpZHRoXG4gICAgKSlcblxuICAgIGNvbnN0IHNob3dpbmcgPSByZWYoXG4gICAgICBwcm9wcy5zaG93SWZBYm92ZSA9PT0gdHJ1ZSAmJiBiZWxvd0JyZWFrcG9pbnQudmFsdWUgPT09IGZhbHNlXG4gICAgICAgID8gdHJ1ZVxuICAgICAgICA6IHByb3BzLm1vZGVsVmFsdWUgPT09IHRydWVcbiAgICApXG5cbiAgICBjb25zdCBoaWRlT25Sb3V0ZUNoYW5nZSA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5wZXJzaXN0ZW50ICE9PSB0cnVlXG4gICAgICAmJiAoYmVsb3dCcmVha3BvaW50LnZhbHVlID09PSB0cnVlIHx8IG9uU2NyZWVuT3ZlcmxheS52YWx1ZSA9PT0gdHJ1ZSlcbiAgICApXG5cbiAgICBmdW5jdGlvbiBoYW5kbGVTaG93IChldnQsIG5vRXZlbnQpIHtcbiAgICAgIGFkZFRvSGlzdG9yeSgpXG5cbiAgICAgIGV2dCAhPT0gZmFsc2UgJiYgJGxheW91dC5hbmltYXRlKClcbiAgICAgIGFwcGx5UG9zaXRpb24oMClcblxuICAgICAgaWYgKGJlbG93QnJlYWtwb2ludC52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBvdGhlckluc3RhbmNlID0gJGxheW91dC5pbnN0YW5jZXNbIG90aGVyU2lkZS52YWx1ZSBdXG4gICAgICAgIGlmIChvdGhlckluc3RhbmNlPy5iZWxvd0JyZWFrcG9pbnQgPT09IHRydWUpIHtcbiAgICAgICAgICBvdGhlckluc3RhbmNlLmhpZGUoZmFsc2UpXG4gICAgICAgIH1cblxuICAgICAgICBhcHBseUJhY2tkcm9wKDEpXG4gICAgICAgICRsYXlvdXQuaXNDb250YWluZXIudmFsdWUgIT09IHRydWUgJiYgcHJldmVudEJvZHlTY3JvbGwodHJ1ZSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBhcHBseUJhY2tkcm9wKDApXG4gICAgICAgIGV2dCAhPT0gZmFsc2UgJiYgc2V0U2Nyb2xsYWJsZShmYWxzZSlcbiAgICAgIH1cblxuICAgICAgcmVnaXN0ZXJUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgZXZ0ICE9PSBmYWxzZSAmJiBzZXRTY3JvbGxhYmxlKHRydWUpXG4gICAgICAgIG5vRXZlbnQgIT09IHRydWUgJiYgZW1pdCgnc2hvdycsIGV2dClcbiAgICAgIH0sIGR1cmF0aW9uKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZUhpZGUgKGV2dCwgbm9FdmVudCkge1xuICAgICAgcmVtb3ZlRnJvbUhpc3RvcnkoKVxuXG4gICAgICBldnQgIT09IGZhbHNlICYmICRsYXlvdXQuYW5pbWF0ZSgpXG5cbiAgICAgIGFwcGx5QmFja2Ryb3AoMClcbiAgICAgIGFwcGx5UG9zaXRpb24oc3RhdGVEaXJlY3Rpb24udmFsdWUgKiBzaXplLnZhbHVlKVxuXG4gICAgICBjbGVhbnVwKClcblxuICAgICAgaWYgKG5vRXZlbnQgIT09IHRydWUpIHtcbiAgICAgICAgcmVnaXN0ZXJUaW1lb3V0KCgpID0+IHsgZW1pdCgnaGlkZScsIGV2dCkgfSwgZHVyYXRpb24pXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmVtb3ZlVGltZW91dCgpXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgeyBzaG93LCBoaWRlIH0gPSB1c2VNb2RlbFRvZ2dsZSh7XG4gICAgICBzaG93aW5nLFxuICAgICAgaGlkZU9uUm91dGVDaGFuZ2UsXG4gICAgICBoYW5kbGVTaG93LFxuICAgICAgaGFuZGxlSGlkZVxuICAgIH0pXG5cbiAgICBjb25zdCB7IGFkZFRvSGlzdG9yeSwgcmVtb3ZlRnJvbUhpc3RvcnkgfSA9IHVzZUhpc3Rvcnkoc2hvd2luZywgaGlkZSwgaGlkZU9uUm91dGVDaGFuZ2UpXG5cbiAgICBjb25zdCBpbnN0YW5jZSA9IHtcbiAgICAgIGJlbG93QnJlYWtwb2ludCxcbiAgICAgIGhpZGVcbiAgICB9XG5cbiAgICBjb25zdCByaWdodFNpZGUgPSBjb21wdXRlZCgoKSA9PiBwcm9wcy5zaWRlID09PSAncmlnaHQnKVxuXG4gICAgY29uc3Qgc3RhdGVEaXJlY3Rpb24gPSBjb21wdXRlZCgoKSA9PlxuICAgICAgKCRxLmxhbmcucnRsID09PSB0cnVlID8gLTEgOiAxKSAqIChyaWdodFNpZGUudmFsdWUgPT09IHRydWUgPyAxIDogLTEpXG4gICAgKVxuXG4gICAgY29uc3QgZmxhZ0JhY2tkcm9wQmcgPSByZWYoMClcbiAgICBjb25zdCBmbGFnUGFubmluZyA9IHJlZihmYWxzZSlcbiAgICBjb25zdCBmbGFnTWluaUFuaW1hdGUgPSByZWYoZmFsc2UpXG4gICAgY29uc3QgZmxhZ0NvbnRlbnRQb3NpdGlvbiA9IHJlZiggLy8gc3RhcnRpbmcgd2l0aCBcImhpZGRlblwiIGZvciBTU1JcbiAgICAgIHNpemUudmFsdWUgKiBzdGF0ZURpcmVjdGlvbi52YWx1ZVxuICAgIClcblxuICAgIGNvbnN0IG90aGVyU2lkZSA9IGNvbXB1dGVkKCgpID0+IChyaWdodFNpZGUudmFsdWUgPT09IHRydWUgPyAnbGVmdCcgOiAncmlnaHQnKSlcbiAgICBjb25zdCBvZmZzZXQgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBzaG93aW5nLnZhbHVlID09PSB0cnVlICYmIGJlbG93QnJlYWtwb2ludC52YWx1ZSA9PT0gZmFsc2UgJiYgcHJvcHMub3ZlcmxheSA9PT0gZmFsc2VcbiAgICAgICAgPyAocHJvcHMubWluaVRvT3ZlcmxheSA9PT0gdHJ1ZSA/IHByb3BzLm1pbmlXaWR0aCA6IHNpemUudmFsdWUpXG4gICAgICAgIDogMFxuICAgICkpXG5cbiAgICBjb25zdCBmaXhlZCA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5vdmVybGF5ID09PSB0cnVlXG4gICAgICB8fCBwcm9wcy5taW5pVG9PdmVybGF5ID09PSB0cnVlXG4gICAgICB8fCAkbGF5b3V0LnZpZXcudmFsdWUuaW5kZXhPZihyaWdodFNpZGUudmFsdWUgPyAnUicgOiAnTCcpICE9PSAtMVxuICAgICAgfHwgKCRxLnBsYXRmb3JtLmlzLmlvcyA9PT0gdHJ1ZSAmJiAkbGF5b3V0LmlzQ29udGFpbmVyLnZhbHVlID09PSB0cnVlKVxuICAgIClcblxuICAgIGNvbnN0IG9uTGF5b3V0ID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLm92ZXJsYXkgPT09IGZhbHNlXG4gICAgICAmJiBzaG93aW5nLnZhbHVlID09PSB0cnVlXG4gICAgICAmJiBiZWxvd0JyZWFrcG9pbnQudmFsdWUgPT09IGZhbHNlXG4gICAgKVxuXG4gICAgY29uc3Qgb25TY3JlZW5PdmVybGF5ID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLm92ZXJsYXkgPT09IHRydWVcbiAgICAgICYmIHNob3dpbmcudmFsdWUgPT09IHRydWVcbiAgICAgICYmIGJlbG93QnJlYWtwb2ludC52YWx1ZSA9PT0gZmFsc2VcbiAgICApXG5cbiAgICBjb25zdCBiYWNrZHJvcENsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdmdWxsc2NyZWVuIHEtZHJhd2VyX19iYWNrZHJvcCdcbiAgICAgICsgKHNob3dpbmcudmFsdWUgPT09IGZhbHNlICYmIGZsYWdQYW5uaW5nLnZhbHVlID09PSBmYWxzZSA/ICcgaGlkZGVuJyA6ICcnKVxuICAgIClcblxuICAgIGNvbnN0IGJhY2tkcm9wU3R5bGUgPSBjb21wdXRlZCgoKSA9PiAoe1xuICAgICAgYmFja2dyb3VuZENvbG9yOiBgcmdiYSgwLDAsMCwkeyBmbGFnQmFja2Ryb3BCZy52YWx1ZSAqIDAuNCB9KWBcbiAgICB9KSlcblxuICAgIGNvbnN0IGhlYWRlclNsb3QgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICByaWdodFNpZGUudmFsdWUgPT09IHRydWVcbiAgICAgICAgPyAkbGF5b3V0LnJvd3MudmFsdWUudG9wWyAyIF0gPT09ICdyJ1xuICAgICAgICA6ICRsYXlvdXQucm93cy52YWx1ZS50b3BbIDAgXSA9PT0gJ2wnXG4gICAgKSlcblxuICAgIGNvbnN0IGZvb3RlclNsb3QgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICByaWdodFNpZGUudmFsdWUgPT09IHRydWVcbiAgICAgICAgPyAkbGF5b3V0LnJvd3MudmFsdWUuYm90dG9tWyAyIF0gPT09ICdyJ1xuICAgICAgICA6ICRsYXlvdXQucm93cy52YWx1ZS5ib3R0b21bIDAgXSA9PT0gJ2wnXG4gICAgKSlcblxuICAgIGNvbnN0IGFib3ZlU3R5bGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBjc3MgPSB7fVxuXG4gICAgICBpZiAoJGxheW91dC5oZWFkZXIuc3BhY2UgPT09IHRydWUgJiYgaGVhZGVyU2xvdC52YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgaWYgKGZpeGVkLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgY3NzLnRvcCA9IGAkeyAkbGF5b3V0LmhlYWRlci5vZmZzZXQgfXB4YFxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCRsYXlvdXQuaGVhZGVyLnNwYWNlID09PSB0cnVlKSB7XG4gICAgICAgICAgY3NzLnRvcCA9IGAkeyAkbGF5b3V0LmhlYWRlci5zaXplIH1weGBcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoJGxheW91dC5mb290ZXIuc3BhY2UgPT09IHRydWUgJiYgZm9vdGVyU2xvdC52YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgaWYgKGZpeGVkLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgY3NzLmJvdHRvbSA9IGAkeyAkbGF5b3V0LmZvb3Rlci5vZmZzZXQgfXB4YFxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCRsYXlvdXQuZm9vdGVyLnNwYWNlID09PSB0cnVlKSB7XG4gICAgICAgICAgY3NzLmJvdHRvbSA9IGAkeyAkbGF5b3V0LmZvb3Rlci5zaXplIH1weGBcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gY3NzXG4gICAgfSlcblxuICAgIGNvbnN0IHN0eWxlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3Qgc3R5bGUgPSB7XG4gICAgICAgIHdpZHRoOiBgJHsgc2l6ZS52YWx1ZSB9cHhgLFxuICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVYKCR7IGZsYWdDb250ZW50UG9zaXRpb24udmFsdWUgfXB4KWBcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGJlbG93QnJlYWtwb2ludC52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICA/IHN0eWxlXG4gICAgICAgIDogT2JqZWN0LmFzc2lnbihzdHlsZSwgYWJvdmVTdHlsZS52YWx1ZSlcbiAgICB9KVxuXG4gICAgY29uc3QgY29udGVudENsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLWRyYXdlcl9fY29udGVudCBmaXQgJ1xuICAgICAgKyAoJGxheW91dC5pc0NvbnRhaW5lci52YWx1ZSAhPT0gdHJ1ZSA/ICdzY3JvbGwnIDogJ292ZXJmbG93LWF1dG8nKVxuICAgIClcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgYHEtZHJhd2VyIHEtZHJhd2VyLS0keyBwcm9wcy5zaWRlIH1gXG4gICAgICArIChmbGFnTWluaUFuaW1hdGUudmFsdWUgPT09IHRydWUgPyAnIHEtZHJhd2VyLS1taW5pLWFuaW1hdGUnIDogJycpXG4gICAgICArIChwcm9wcy5ib3JkZXJlZCA9PT0gdHJ1ZSA/ICcgcS1kcmF3ZXItLWJvcmRlcmVkJyA6ICcnKVxuICAgICAgKyAoaXNEYXJrLnZhbHVlID09PSB0cnVlID8gJyBxLWRyYXdlci0tZGFyayBxLWRhcmsnIDogJycpXG4gICAgICArIChcbiAgICAgICAgZmxhZ1Bhbm5pbmcudmFsdWUgPT09IHRydWVcbiAgICAgICAgICA/ICcgbm8tdHJhbnNpdGlvbidcbiAgICAgICAgICA6IChzaG93aW5nLnZhbHVlID09PSB0cnVlID8gJycgOiAnIHEtbGF5b3V0LS1wcmV2ZW50LWZvY3VzJylcbiAgICAgIClcbiAgICAgICsgKFxuICAgICAgICBiZWxvd0JyZWFrcG9pbnQudmFsdWUgPT09IHRydWVcbiAgICAgICAgICA/ICcgZml4ZWQgcS1kcmF3ZXItLW9uLXRvcCBxLWRyYXdlci0tbW9iaWxlIHEtZHJhd2VyLS10b3AtcGFkZGluZydcbiAgICAgICAgICA6IGAgcS1kcmF3ZXItLSR7IGlzTWluaS52YWx1ZSA9PT0gdHJ1ZSA/ICdtaW5pJyA6ICdzdGFuZGFyZCcgfWBcbiAgICAgICAgICArIChmaXhlZC52YWx1ZSA9PT0gdHJ1ZSB8fCBvbkxheW91dC52YWx1ZSAhPT0gdHJ1ZSA/ICcgZml4ZWQnIDogJycpXG4gICAgICAgICAgKyAocHJvcHMub3ZlcmxheSA9PT0gdHJ1ZSB8fCBwcm9wcy5taW5pVG9PdmVybGF5ID09PSB0cnVlID8gJyBxLWRyYXdlci0tb24tdG9wJyA6ICcnKVxuICAgICAgICAgICsgKGhlYWRlclNsb3QudmFsdWUgPT09IHRydWUgPyAnIHEtZHJhd2VyLS10b3AtcGFkZGluZycgOiAnJylcbiAgICAgIClcbiAgICApXG5cbiAgICBjb25zdCBvcGVuRGlyZWN0aXZlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgLy8gaWYgcHJvcHMubm9Td2lwZU9wZW4gIT09IHRydWVcbiAgICAgIGNvbnN0IGRpciA9ICRxLmxhbmcucnRsID09PSB0cnVlID8gcHJvcHMuc2lkZSA6IG90aGVyU2lkZS52YWx1ZVxuXG4gICAgICByZXR1cm4gWyBbXG4gICAgICAgIFRvdWNoUGFuLFxuICAgICAgICBvbk9wZW5QYW4sXG4gICAgICAgIHZvaWQgMCxcbiAgICAgICAge1xuICAgICAgICAgIFsgZGlyIF06IHRydWUsXG4gICAgICAgICAgbW91c2U6IHRydWVcbiAgICAgICAgfVxuICAgICAgXSBdXG4gICAgfSlcblxuICAgIGNvbnN0IGNvbnRlbnRDbG9zZURpcmVjdGl2ZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIC8vIGlmIGJlbG93QnJlYWtwb2ludC52YWx1ZSA9PT0gdHJ1ZSAmJiBwcm9wcy5ub1N3aXBlQ2xvc2UgIT09IHRydWVcbiAgICAgIGNvbnN0IGRpciA9ICRxLmxhbmcucnRsID09PSB0cnVlID8gb3RoZXJTaWRlLnZhbHVlIDogcHJvcHMuc2lkZVxuXG4gICAgICByZXR1cm4gWyBbXG4gICAgICAgIFRvdWNoUGFuLFxuICAgICAgICBvbkNsb3NlUGFuLFxuICAgICAgICB2b2lkIDAsXG4gICAgICAgIHtcbiAgICAgICAgICBbIGRpciBdOiB0cnVlLFxuICAgICAgICAgIG1vdXNlOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIF0gXVxuICAgIH0pXG5cbiAgICBjb25zdCBiYWNrZHJvcENsb3NlRGlyZWN0aXZlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgLy8gaWYgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSAmJiBwcm9wcy5ub1N3aXBlQmFja2Ryb3AgIT09IHRydWVcbiAgICAgIGNvbnN0IGRpciA9ICRxLmxhbmcucnRsID09PSB0cnVlID8gb3RoZXJTaWRlLnZhbHVlIDogcHJvcHMuc2lkZVxuXG4gICAgICByZXR1cm4gWyBbXG4gICAgICAgIFRvdWNoUGFuLFxuICAgICAgICBvbkNsb3NlUGFuLFxuICAgICAgICB2b2lkIDAsXG4gICAgICAgIHtcbiAgICAgICAgICBbIGRpciBdOiB0cnVlLFxuICAgICAgICAgIG1vdXNlOiB0cnVlLFxuICAgICAgICAgIG1vdXNlQWxsRGlyOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIF0gXVxuICAgIH0pXG5cbiAgICBmdW5jdGlvbiB1cGRhdGVCZWxvd0JyZWFrcG9pbnQgKCkge1xuICAgICAgdXBkYXRlTG9jYWwoYmVsb3dCcmVha3BvaW50LCAoXG4gICAgICAgIHByb3BzLmJlaGF2aW9yID09PSAnbW9iaWxlJ1xuICAgICAgICB8fCAocHJvcHMuYmVoYXZpb3IgIT09ICdkZXNrdG9wJyAmJiAkbGF5b3V0LnRvdGFsV2lkdGgudmFsdWUgPD0gcHJvcHMuYnJlYWtwb2ludClcbiAgICAgICkpXG4gICAgfVxuXG4gICAgd2F0Y2goYmVsb3dCcmVha3BvaW50LCB2YWwgPT4ge1xuICAgICAgaWYgKHZhbCA9PT0gdHJ1ZSkgeyAvLyBmcm9tIGxnIHRvIHhzXG4gICAgICAgIGxhc3REZXNrdG9wU3RhdGUgPSBzaG93aW5nLnZhbHVlXG4gICAgICAgIHNob3dpbmcudmFsdWUgPT09IHRydWUgJiYgaGlkZShmYWxzZSlcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKFxuICAgICAgICBwcm9wcy5vdmVybGF5ID09PSBmYWxzZVxuICAgICAgICAmJiBwcm9wcy5iZWhhdmlvciAhPT0gJ21vYmlsZSdcbiAgICAgICAgJiYgbGFzdERlc2t0b3BTdGF0ZSAhPT0gZmFsc2VcbiAgICAgICkgeyAvLyBmcm9tIHhzIHRvIGxnXG4gICAgICAgIGlmIChzaG93aW5nLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgYXBwbHlQb3NpdGlvbigwKVxuICAgICAgICAgIGFwcGx5QmFja2Ryb3AoMClcbiAgICAgICAgICBjbGVhbnVwKClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBzaG93KGZhbHNlKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcblxuICAgIHdhdGNoKCgpID0+IHByb3BzLnNpZGUsIChuZXdTaWRlLCBvbGRTaWRlKSA9PiB7XG4gICAgICBpZiAoJGxheW91dC5pbnN0YW5jZXNbIG9sZFNpZGUgXSA9PT0gaW5zdGFuY2UpIHtcbiAgICAgICAgJGxheW91dC5pbnN0YW5jZXNbIG9sZFNpZGUgXSA9IHZvaWQgMFxuICAgICAgICAkbGF5b3V0WyBvbGRTaWRlIF0uc3BhY2UgPSBmYWxzZVxuICAgICAgICAkbGF5b3V0WyBvbGRTaWRlIF0ub2Zmc2V0ID0gMFxuICAgICAgfVxuXG4gICAgICAkbGF5b3V0Lmluc3RhbmNlc1sgbmV3U2lkZSBdID0gaW5zdGFuY2VcbiAgICAgICRsYXlvdXRbIG5ld1NpZGUgXS5zaXplID0gc2l6ZS52YWx1ZVxuICAgICAgJGxheW91dFsgbmV3U2lkZSBdLnNwYWNlID0gb25MYXlvdXQudmFsdWVcbiAgICAgICRsYXlvdXRbIG5ld1NpZGUgXS5vZmZzZXQgPSBvZmZzZXQudmFsdWVcbiAgICB9KVxuXG4gICAgd2F0Y2goJGxheW91dC50b3RhbFdpZHRoLCAoKSA9PiB7XG4gICAgICBpZiAoJGxheW91dC5pc0NvbnRhaW5lci52YWx1ZSA9PT0gdHJ1ZSB8fCBkb2N1bWVudC5xU2Nyb2xsUHJldmVudGVkICE9PSB0cnVlKSB7XG4gICAgICAgIHVwZGF0ZUJlbG93QnJlYWtwb2ludCgpXG4gICAgICB9XG4gICAgfSlcblxuICAgIHdhdGNoKFxuICAgICAgKCkgPT4gcHJvcHMuYmVoYXZpb3IgKyBwcm9wcy5icmVha3BvaW50LFxuICAgICAgdXBkYXRlQmVsb3dCcmVha3BvaW50XG4gICAgKVxuXG4gICAgd2F0Y2goJGxheW91dC5pc0NvbnRhaW5lciwgdmFsID0+IHtcbiAgICAgIHNob3dpbmcudmFsdWUgPT09IHRydWUgJiYgcHJldmVudEJvZHlTY3JvbGwodmFsICE9PSB0cnVlKVxuICAgICAgdmFsID09PSB0cnVlICYmIHVwZGF0ZUJlbG93QnJlYWtwb2ludCgpXG4gICAgfSlcblxuICAgIHdhdGNoKCRsYXlvdXQuc2Nyb2xsYmFyV2lkdGgsICgpID0+IHtcbiAgICAgIGFwcGx5UG9zaXRpb24oc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSA/IDAgOiB2b2lkIDApXG4gICAgfSlcblxuICAgIHdhdGNoKG9mZnNldCwgdmFsID0+IHsgdXBkYXRlTGF5b3V0KCdvZmZzZXQnLCB2YWwpIH0pXG5cbiAgICB3YXRjaChvbkxheW91dCwgdmFsID0+IHtcbiAgICAgIGVtaXQoJ29uTGF5b3V0JywgdmFsKVxuICAgICAgdXBkYXRlTGF5b3V0KCdzcGFjZScsIHZhbClcbiAgICB9KVxuXG4gICAgd2F0Y2gocmlnaHRTaWRlLCAoKSA9PiB7IGFwcGx5UG9zaXRpb24oKSB9KVxuXG4gICAgd2F0Y2goc2l6ZSwgdmFsID0+IHtcbiAgICAgIGFwcGx5UG9zaXRpb24oKVxuICAgICAgdXBkYXRlU2l6ZU9uTGF5b3V0KHByb3BzLm1pbmlUb092ZXJsYXksIHZhbClcbiAgICB9KVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMubWluaVRvT3ZlcmxheSwgdmFsID0+IHtcbiAgICAgIHVwZGF0ZVNpemVPbkxheW91dCh2YWwsIHNpemUudmFsdWUpXG4gICAgfSlcblxuICAgIHdhdGNoKCgpID0+ICRxLmxhbmcucnRsLCAoKSA9PiB7IGFwcGx5UG9zaXRpb24oKSB9KVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMubWluaSwgKCkgPT4ge1xuICAgICAgaWYgKHByb3BzLm5vTWluaUFuaW1hdGlvbikgcmV0dXJuXG4gICAgICBpZiAocHJvcHMubW9kZWxWYWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBhbmltYXRlTWluaSgpXG4gICAgICAgICRsYXlvdXQuYW5pbWF0ZSgpXG4gICAgICB9XG4gICAgfSlcblxuICAgIHdhdGNoKGlzTWluaSwgdmFsID0+IHsgZW1pdCgnbWluaVN0YXRlJywgdmFsKSB9KVxuXG4gICAgZnVuY3Rpb24gYXBwbHlQb3NpdGlvbiAocG9zaXRpb24pIHtcbiAgICAgIGlmIChwb3NpdGlvbiA9PT0gdm9pZCAwKSB7XG4gICAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICBwb3NpdGlvbiA9IHNob3dpbmcudmFsdWUgPT09IHRydWUgPyAwIDogc2l6ZS52YWx1ZVxuICAgICAgICAgIGFwcGx5UG9zaXRpb24oc3RhdGVEaXJlY3Rpb24udmFsdWUgKiBwb3NpdGlvbilcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgJGxheW91dC5pc0NvbnRhaW5lci52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgICYmIHJpZ2h0U2lkZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgICYmIChiZWxvd0JyZWFrcG9pbnQudmFsdWUgPT09IHRydWUgfHwgTWF0aC5hYnMocG9zaXRpb24pID09PSBzaXplLnZhbHVlKVxuICAgICAgICApIHtcbiAgICAgICAgICBwb3NpdGlvbiArPSBzdGF0ZURpcmVjdGlvbi52YWx1ZSAqICRsYXlvdXQuc2Nyb2xsYmFyV2lkdGgudmFsdWVcbiAgICAgICAgfVxuXG4gICAgICAgIGZsYWdDb250ZW50UG9zaXRpb24udmFsdWUgPSBwb3NpdGlvblxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFwcGx5QmFja2Ryb3AgKHgpIHtcbiAgICAgIGZsYWdCYWNrZHJvcEJnLnZhbHVlID0geFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldFNjcm9sbGFibGUgKHYpIHtcbiAgICAgIGNvbnN0IGFjdGlvbiA9IHYgPT09IHRydWVcbiAgICAgICAgPyAncmVtb3ZlJ1xuICAgICAgICA6ICgkbGF5b3V0LmlzQ29udGFpbmVyLnZhbHVlICE9PSB0cnVlID8gJ2FkZCcgOiAnJylcblxuICAgICAgYWN0aW9uICE9PSAnJyAmJiBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdFsgYWN0aW9uIF0oJ3EtYm9keS0tZHJhd2VyLXRvZ2dsZScpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYW5pbWF0ZU1pbmkgKCkge1xuICAgICAgdGltZXJNaW5pICE9PSBudWxsICYmIGNsZWFyVGltZW91dCh0aW1lck1pbmkpXG5cbiAgICAgIGlmICh2bS5wcm94eSAmJiB2bS5wcm94eS4kZWwpIHtcbiAgICAgICAgLy8gbmVlZCB0byBzcGVlZCBpdCB1cCBhbmQgYXBwbHkgaXQgaW1tZWRpYXRlbHksXG4gICAgICAgIC8vIGV2ZW4gZmFzdGVyIHRoYW4gVnVlJ3MgbmV4dFRpY2shXG4gICAgICAgIHZtLnByb3h5LiRlbC5jbGFzc0xpc3QuYWRkKCdxLWRyYXdlci0tbWluaS1hbmltYXRlJylcbiAgICAgIH1cblxuICAgICAgZmxhZ01pbmlBbmltYXRlLnZhbHVlID0gdHJ1ZVxuICAgICAgdGltZXJNaW5pID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRpbWVyTWluaSA9IG51bGxcbiAgICAgICAgZmxhZ01pbmlBbmltYXRlLnZhbHVlID0gZmFsc2VcbiAgICAgICAgdm0/LnByb3h5Py4kZWw/LmNsYXNzTGlzdC5yZW1vdmUoJ3EtZHJhd2VyLS1taW5pLWFuaW1hdGUnKVxuICAgICAgfSwgMTUwKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uT3BlblBhbiAoZXZ0KSB7XG4gICAgICBpZiAoc2hvd2luZy52YWx1ZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgLy8gc29tZSBicm93c2VycyBtaWdodCBjYXB0dXJlIGFuZCB0cmlnZ2VyIHRoaXNcbiAgICAgICAgLy8gZXZlbiBpZiBEcmF3ZXIgaGFzIGp1c3QgYmVlbiBvcGVuZWQgKGJ1dCBhbmltYXRpb24gaXMgc3RpbGwgcGVuZGluZylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0XG4gICAgICAgIHdpZHRoID0gc2l6ZS52YWx1ZSxcbiAgICAgICAgcG9zaXRpb24gPSBiZXR3ZWVuKGV2dC5kaXN0YW5jZS54LCAwLCB3aWR0aClcblxuICAgICAgaWYgKGV2dC5pc0ZpbmFsID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IG9wZW5lZCA9IHBvc2l0aW9uID49IE1hdGgubWluKDc1LCB3aWR0aClcblxuICAgICAgICBpZiAob3BlbmVkID09PSB0cnVlKSB7XG4gICAgICAgICAgc2hvdygpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgJGxheW91dC5hbmltYXRlKClcbiAgICAgICAgICBhcHBseUJhY2tkcm9wKDApXG4gICAgICAgICAgYXBwbHlQb3NpdGlvbihzdGF0ZURpcmVjdGlvbi52YWx1ZSAqIHdpZHRoKVxuICAgICAgICB9XG5cbiAgICAgICAgZmxhZ1Bhbm5pbmcudmFsdWUgPSBmYWxzZVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgYXBwbHlQb3NpdGlvbihcbiAgICAgICAgKCRxLmxhbmcucnRsID09PSB0cnVlID8gcmlnaHRTaWRlLnZhbHVlICE9PSB0cnVlIDogcmlnaHRTaWRlLnZhbHVlKVxuICAgICAgICAgID8gTWF0aC5tYXgod2lkdGggLSBwb3NpdGlvbiwgMClcbiAgICAgICAgICA6IE1hdGgubWluKDAsIHBvc2l0aW9uIC0gd2lkdGgpXG4gICAgICApXG4gICAgICBhcHBseUJhY2tkcm9wKFxuICAgICAgICBiZXR3ZWVuKHBvc2l0aW9uIC8gd2lkdGgsIDAsIDEpXG4gICAgICApXG5cbiAgICAgIGlmIChldnQuaXNGaXJzdCA9PT0gdHJ1ZSkge1xuICAgICAgICBmbGFnUGFubmluZy52YWx1ZSA9IHRydWVcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkNsb3NlUGFuIChldnQpIHtcbiAgICAgIGlmIChzaG93aW5nLnZhbHVlICE9PSB0cnVlKSB7XG4gICAgICAgIC8vIHNvbWUgYnJvd3NlcnMgbWlnaHQgY2FwdHVyZSBhbmQgdHJpZ2dlciB0aGlzXG4gICAgICAgIC8vIGV2ZW4gaWYgRHJhd2VyIGhhcyBqdXN0IGJlZW4gY2xvc2VkIChidXQgYW5pbWF0aW9uIGlzIHN0aWxsIHBlbmRpbmcpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBjb25zdFxuICAgICAgICB3aWR0aCA9IHNpemUudmFsdWUsXG4gICAgICAgIGRpciA9IGV2dC5kaXJlY3Rpb24gPT09IHByb3BzLnNpZGUsXG4gICAgICAgIHBvc2l0aW9uID0gKCRxLmxhbmcucnRsID09PSB0cnVlID8gZGlyICE9PSB0cnVlIDogZGlyKVxuICAgICAgICAgID8gYmV0d2VlbihldnQuZGlzdGFuY2UueCwgMCwgd2lkdGgpXG4gICAgICAgICAgOiAwXG5cbiAgICAgIGlmIChldnQuaXNGaW5hbCA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBvcGVuZWQgPSBNYXRoLmFicyhwb3NpdGlvbikgPCBNYXRoLm1pbig3NSwgd2lkdGgpXG5cbiAgICAgICAgaWYgKG9wZW5lZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICRsYXlvdXQuYW5pbWF0ZSgpXG4gICAgICAgICAgYXBwbHlCYWNrZHJvcCgxKVxuICAgICAgICAgIGFwcGx5UG9zaXRpb24oMClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBoaWRlKClcbiAgICAgICAgfVxuXG4gICAgICAgIGZsYWdQYW5uaW5nLnZhbHVlID0gZmFsc2VcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGFwcGx5UG9zaXRpb24oc3RhdGVEaXJlY3Rpb24udmFsdWUgKiBwb3NpdGlvbilcbiAgICAgIGFwcGx5QmFja2Ryb3AoYmV0d2VlbigxIC0gcG9zaXRpb24gLyB3aWR0aCwgMCwgMSkpXG5cbiAgICAgIGlmIChldnQuaXNGaXJzdCA9PT0gdHJ1ZSkge1xuICAgICAgICBmbGFnUGFubmluZy52YWx1ZSA9IHRydWVcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbGVhbnVwICgpIHtcbiAgICAgIHByZXZlbnRCb2R5U2Nyb2xsKGZhbHNlKVxuICAgICAgc2V0U2Nyb2xsYWJsZSh0cnVlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUxheW91dCAocHJvcCwgdmFsKSB7XG4gICAgICAkbGF5b3V0LnVwZGF0ZShwcm9wcy5zaWRlLCBwcm9wLCB2YWwpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlTG9jYWwgKHByb3AsIHZhbCkge1xuICAgICAgaWYgKHByb3AudmFsdWUgIT09IHZhbCkge1xuICAgICAgICBwcm9wLnZhbHVlID0gdmFsXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlU2l6ZU9uTGF5b3V0IChtaW5pVG9PdmVybGF5LCBzaXplKSB7XG4gICAgICB1cGRhdGVMYXlvdXQoJ3NpemUnLCBtaW5pVG9PdmVybGF5ID09PSB0cnVlID8gcHJvcHMubWluaVdpZHRoIDogc2l6ZSlcbiAgICB9XG5cbiAgICAkbGF5b3V0Lmluc3RhbmNlc1sgcHJvcHMuc2lkZSBdID0gaW5zdGFuY2VcbiAgICB1cGRhdGVTaXplT25MYXlvdXQocHJvcHMubWluaVRvT3ZlcmxheSwgc2l6ZS52YWx1ZSlcbiAgICB1cGRhdGVMYXlvdXQoJ3NwYWNlJywgb25MYXlvdXQudmFsdWUpXG4gICAgdXBkYXRlTGF5b3V0KCdvZmZzZXQnLCBvZmZzZXQudmFsdWUpXG5cbiAgICBpZiAoXG4gICAgICBwcm9wcy5zaG93SWZBYm92ZSA9PT0gdHJ1ZVxuICAgICAgJiYgcHJvcHMubW9kZWxWYWx1ZSAhPT0gdHJ1ZVxuICAgICAgJiYgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgJiYgcHJvcHNbICdvblVwZGF0ZTptb2RlbFZhbHVlJyBdICE9PSB2b2lkIDBcbiAgICApIHtcbiAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgdHJ1ZSlcbiAgICB9XG5cbiAgICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgICAgZW1pdCgnb25MYXlvdXQnLCBvbkxheW91dC52YWx1ZSlcbiAgICAgIGVtaXQoJ21pbmlTdGF0ZScsIGlzTWluaS52YWx1ZSlcblxuICAgICAgbGFzdERlc2t0b3BTdGF0ZSA9IHByb3BzLnNob3dJZkFib3ZlID09PSB0cnVlXG5cbiAgICAgIGNvbnN0IGZuID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBhY3Rpb24gPSBzaG93aW5nLnZhbHVlID09PSB0cnVlID8gaGFuZGxlU2hvdyA6IGhhbmRsZUhpZGVcbiAgICAgICAgYWN0aW9uKGZhbHNlLCB0cnVlKVxuICAgICAgfVxuXG4gICAgICBpZiAoJGxheW91dC50b3RhbFdpZHRoLnZhbHVlICE9PSAwKSB7XG4gICAgICAgIC8vIG1ha2Ugc3VyZSB0aGF0IGFsbCBjb21wdXRlZCBwcm9wZXJ0aWVzXG4gICAgICAgIC8vIGhhdmUgYmVlbiB1cGRhdGVkIGJlZm9yZSBjYWxsaW5nIGhhbmRsZVNob3cvaGFuZGxlSGlkZSgpXG4gICAgICAgIG5leHRUaWNrKGZuKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgbGF5b3V0VG90YWxXaWR0aFdhdGNoZXIgPSB3YXRjaCgkbGF5b3V0LnRvdGFsV2lkdGgsICgpID0+IHtcbiAgICAgICAgbGF5b3V0VG90YWxXaWR0aFdhdGNoZXIoKVxuICAgICAgICBsYXlvdXRUb3RhbFdpZHRoV2F0Y2hlciA9IHZvaWQgMFxuXG4gICAgICAgIGlmIChzaG93aW5nLnZhbHVlID09PSBmYWxzZSAmJiBwcm9wcy5zaG93SWZBYm92ZSA9PT0gdHJ1ZSAmJiBiZWxvd0JyZWFrcG9pbnQudmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgc2hvdyhmYWxzZSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBmbigpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcblxuICAgIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgICBsYXlvdXRUb3RhbFdpZHRoV2F0Y2hlcj8uKClcblxuICAgICAgaWYgKHRpbWVyTWluaSAhPT0gbnVsbCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZXJNaW5pKVxuICAgICAgICB0aW1lck1pbmkgPSBudWxsXG4gICAgICB9XG5cbiAgICAgIHNob3dpbmcudmFsdWUgPT09IHRydWUgJiYgY2xlYW51cCgpXG5cbiAgICAgIGlmICgkbGF5b3V0Lmluc3RhbmNlc1sgcHJvcHMuc2lkZSBdID09PSBpbnN0YW5jZSkge1xuICAgICAgICAkbGF5b3V0Lmluc3RhbmNlc1sgcHJvcHMuc2lkZSBdID0gdm9pZCAwXG4gICAgICAgIHVwZGF0ZUxheW91dCgnc2l6ZScsIDApXG4gICAgICAgIHVwZGF0ZUxheW91dCgnb2Zmc2V0JywgMClcbiAgICAgICAgdXBkYXRlTGF5b3V0KCdzcGFjZScsIGZhbHNlKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY29uc3QgY2hpbGQgPSBbXVxuXG4gICAgICBpZiAoYmVsb3dCcmVha3BvaW50LnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIHByb3BzLm5vU3dpcGVPcGVuID09PSBmYWxzZSAmJiBjaGlsZC5wdXNoKFxuICAgICAgICAgIHdpdGhEaXJlY3RpdmVzKFxuICAgICAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgICAgICBrZXk6ICdvcGVuJyxcbiAgICAgICAgICAgICAgY2xhc3M6IGBxLWRyYXdlcl9fb3BlbmVyIGZpeGVkLSR7IHByb3BzLnNpZGUgfWAsXG4gICAgICAgICAgICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJ1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBvcGVuRGlyZWN0aXZlLnZhbHVlXG4gICAgICAgICAgKVxuICAgICAgICApXG5cbiAgICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgICBoRGlyKFxuICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHJlZjogJ2JhY2tkcm9wJyxcbiAgICAgICAgICAgICAgY2xhc3M6IGJhY2tkcm9wQ2xhc3MudmFsdWUsXG4gICAgICAgICAgICAgIHN0eWxlOiBiYWNrZHJvcFN0eWxlLnZhbHVlLFxuICAgICAgICAgICAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZScsXG4gICAgICAgICAgICAgIG9uQ2xpY2s6IGhpZGVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB2b2lkIDAsXG4gICAgICAgICAgICAnYmFja2Ryb3AnLFxuICAgICAgICAgICAgcHJvcHMubm9Td2lwZUJhY2tkcm9wICE9PSB0cnVlICYmIHNob3dpbmcudmFsdWUgPT09IHRydWUsXG4gICAgICAgICAgICAoKSA9PiBiYWNrZHJvcENsb3NlRGlyZWN0aXZlLnZhbHVlXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1pbmkgPSBpc01pbmkudmFsdWUgPT09IHRydWUgJiYgc2xvdHMubWluaSAhPT0gdm9pZCAwXG4gICAgICBjb25zdCBjb250ZW50ID0gW1xuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgLi4uYXR0cnMsXG4gICAgICAgICAga2V5OiAnJyArIG1pbmksIC8vIHJlcXVpcmVkIG90aGVyd2lzZSBWdWUgd2lsbCBub3QgZGlmZiBjb3JyZWN0bHlcbiAgICAgICAgICBjbGFzczogW1xuICAgICAgICAgICAgY29udGVudENsYXNzLnZhbHVlLFxuICAgICAgICAgICAgYXR0cnMuY2xhc3NcbiAgICAgICAgICBdXG4gICAgICAgIH0sIG1pbmkgPT09IHRydWVcbiAgICAgICAgICA/IHNsb3RzLm1pbmkoKVxuICAgICAgICAgIDogaFNsb3Qoc2xvdHMuZGVmYXVsdClcbiAgICAgICAgKVxuICAgICAgXVxuXG4gICAgICBpZiAocHJvcHMuZWxldmF0ZWQgPT09IHRydWUgJiYgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb250ZW50LnB1c2goXG4gICAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgICAgY2xhc3M6ICdxLWxheW91dF9fc2hhZG93IGFic29sdXRlLWZ1bGwgb3ZlcmZsb3ctaGlkZGVuIG5vLXBvaW50ZXItZXZlbnRzJ1xuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgaERpcihcbiAgICAgICAgICAnYXNpZGUnLFxuICAgICAgICAgIHsgcmVmOiAnY29udGVudCcsIGNsYXNzOiBjbGFzc2VzLnZhbHVlLCBzdHlsZTogc3R5bGUudmFsdWUgfSxcbiAgICAgICAgICBjb250ZW50LFxuICAgICAgICAgICdjb250ZW50Y2xvc2UnLFxuICAgICAgICAgIHByb3BzLm5vU3dpcGVDbG9zZSAhPT0gdHJ1ZSAmJiBiZWxvd0JyZWFrcG9pbnQudmFsdWUgPT09IHRydWUsXG4gICAgICAgICAgKCkgPT4gY29udGVudENsb3NlRGlyZWN0aXZlLnZhbHVlXG4gICAgICAgIClcbiAgICAgIClcblxuICAgICAgcmV0dXJuIGgoJ2RpdicsIHsgY2xhc3M6ICdxLWRyYXdlci1jb250YWluZXInIH0sIGNoaWxkKVxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIGNvbXB1dGVkLCBwcm92aWRlLCBpbmplY3QsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5pbXBvcnQgeyBwYWdlQ29udGFpbmVyS2V5LCBsYXlvdXRLZXksIGVtcHR5UmVuZGVyRm4gfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnN5bWJvbHMvc3ltYm9scy5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FQYWdlQ29udGFpbmVyJyxcblxuICBzZXR1cCAoXywgeyBzbG90cyB9KSB7XG4gICAgY29uc3QgeyBwcm94eTogeyAkcSB9IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gICAgY29uc3QgJGxheW91dCA9IGluamVjdChsYXlvdXRLZXksIGVtcHR5UmVuZGVyRm4pXG4gICAgaWYgKCRsYXlvdXQgPT09IGVtcHR5UmVuZGVyRm4pIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1FQYWdlQ29udGFpbmVyIG5lZWRzIHRvIGJlIGNoaWxkIG9mIFFMYXlvdXQnKVxuICAgICAgcmV0dXJuIGVtcHR5UmVuZGVyRm5cbiAgICB9XG5cbiAgICBwcm92aWRlKHBhZ2VDb250YWluZXJLZXksIHRydWUpXG5cbiAgICBjb25zdCBzdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGNzcyA9IHt9XG5cbiAgICAgIGlmICgkbGF5b3V0LmhlYWRlci5zcGFjZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjc3MucGFkZGluZ1RvcCA9IGAkeyAkbGF5b3V0LmhlYWRlci5zaXplIH1weGBcbiAgICAgIH1cbiAgICAgIGlmICgkbGF5b3V0LnJpZ2h0LnNwYWNlID09PSB0cnVlKSB7XG4gICAgICAgIGNzc1sgYHBhZGRpbmckeyAkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/ICdMZWZ0JyA6ICdSaWdodCcgfWAgXSA9IGAkeyAkbGF5b3V0LnJpZ2h0LnNpemUgfXB4YFxuICAgICAgfVxuICAgICAgaWYgKCRsYXlvdXQuZm9vdGVyLnNwYWNlID09PSB0cnVlKSB7XG4gICAgICAgIGNzcy5wYWRkaW5nQm90dG9tID0gYCR7ICRsYXlvdXQuZm9vdGVyLnNpemUgfXB4YFxuICAgICAgfVxuICAgICAgaWYgKCRsYXlvdXQubGVmdC5zcGFjZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjc3NbIGBwYWRkaW5nJHsgJHEubGFuZy5ydGwgPT09IHRydWUgPyAnUmlnaHQnIDogJ0xlZnQnIH1gIF0gPSBgJHsgJGxheW91dC5sZWZ0LnNpemUgfXB4YFxuICAgICAgfVxuXG4gICAgICByZXR1cm4gY3NzXG4gICAgfSlcblxuICAgIHJldHVybiAoKSA9PiBoKCdkaXYnLCB7XG4gICAgICBjbGFzczogJ3EtcGFnZS1jb250YWluZXInLFxuICAgICAgc3R5bGU6IHN0eWxlLnZhbHVlXG4gICAgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyB3YXRjaCwgb25Nb3VudGVkLCBvbkJlZm9yZVVubW91bnQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgZ2V0U2Nyb2xsVGFyZ2V0LCBnZXRWZXJ0aWNhbFNjcm9sbFBvc2l0aW9uLCBnZXRIb3Jpem9udGFsU2Nyb2xsUG9zaXRpb24sIHNjcm9sbFRhcmdldFByb3AgfSBmcm9tICcuLi8uLi91dGlscy9zY3JvbGwvc2Nyb2xsLmpzJ1xuaW1wb3J0IHsgbGlzdGVuT3B0cywgbm9vcCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50L2V2ZW50LmpzJ1xuXG5jb25zdCB7IHBhc3NpdmUgfSA9IGxpc3Rlbk9wdHNcbmNvbnN0IGF4aXNWYWx1ZXMgPSBbICdib3RoJywgJ2hvcml6b250YWwnLCAndmVydGljYWwnIF1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FTY3JvbGxPYnNlcnZlcicsXG5cbiAgcHJvcHM6IHtcbiAgICBheGlzOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWxpZGF0b3I6IHYgPT4gYXhpc1ZhbHVlcy5pbmNsdWRlcyh2KSxcbiAgICAgIGRlZmF1bHQ6ICd2ZXJ0aWNhbCdcbiAgICB9LFxuXG4gICAgZGVib3VuY2U6IFsgU3RyaW5nLCBOdW1iZXIgXSxcblxuICAgIHNjcm9sbFRhcmdldDogc2Nyb2xsVGFyZ2V0UHJvcFxuICB9LFxuXG4gIGVtaXRzOiBbICdzY3JvbGwnIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IGVtaXQgfSkge1xuICAgIGNvbnN0IHNjcm9sbCA9IHtcbiAgICAgIHBvc2l0aW9uOiB7XG4gICAgICAgIHRvcDogMCxcbiAgICAgICAgbGVmdDogMFxuICAgICAgfSxcblxuICAgICAgZGlyZWN0aW9uOiAnZG93bicsXG4gICAgICBkaXJlY3Rpb25DaGFuZ2VkOiBmYWxzZSxcblxuICAgICAgZGVsdGE6IHtcbiAgICAgICAgdG9wOiAwLFxuICAgICAgICBsZWZ0OiAwXG4gICAgICB9LFxuXG4gICAgICBpbmZsZWN0aW9uUG9pbnQ6IHtcbiAgICAgICAgdG9wOiAwLFxuICAgICAgICBsZWZ0OiAwXG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGNsZWFyVGltZXIgPSBudWxsLCBsb2NhbFNjcm9sbFRhcmdldCwgcGFyZW50RWxcblxuICAgIHdhdGNoKCgpID0+IHByb3BzLnNjcm9sbFRhcmdldCwgKCkgPT4ge1xuICAgICAgdW5jb25maWd1cmVTY3JvbGxUYXJnZXQoKVxuICAgICAgY29uZmlndXJlU2Nyb2xsVGFyZ2V0KClcbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gZW1pdEV2ZW50ICgpIHtcbiAgICAgIGNsZWFyVGltZXI/LigpXG5cbiAgICAgIGNvbnN0IHRvcCA9IE1hdGgubWF4KDAsIGdldFZlcnRpY2FsU2Nyb2xsUG9zaXRpb24obG9jYWxTY3JvbGxUYXJnZXQpKVxuICAgICAgY29uc3QgbGVmdCA9IGdldEhvcml6b250YWxTY3JvbGxQb3NpdGlvbihsb2NhbFNjcm9sbFRhcmdldClcblxuICAgICAgY29uc3QgZGVsdGEgPSB7XG4gICAgICAgIHRvcDogdG9wIC0gc2Nyb2xsLnBvc2l0aW9uLnRvcCxcbiAgICAgICAgbGVmdDogbGVmdCAtIHNjcm9sbC5wb3NpdGlvbi5sZWZ0XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgKHByb3BzLmF4aXMgPT09ICd2ZXJ0aWNhbCcgJiYgZGVsdGEudG9wID09PSAwKVxuICAgICAgICB8fCAocHJvcHMuYXhpcyA9PT0gJ2hvcml6b250YWwnICYmIGRlbHRhLmxlZnQgPT09IDApXG4gICAgICApIHJldHVyblxuXG4gICAgICBjb25zdCBjdXJEaXIgPSBNYXRoLmFicyhkZWx0YS50b3ApID49IE1hdGguYWJzKGRlbHRhLmxlZnQpXG4gICAgICAgID8gKGRlbHRhLnRvcCA8IDAgPyAndXAnIDogJ2Rvd24nKVxuICAgICAgICA6IChkZWx0YS5sZWZ0IDwgMCA/ICdsZWZ0JyA6ICdyaWdodCcpXG5cbiAgICAgIHNjcm9sbC5wb3NpdGlvbiA9IHsgdG9wLCBsZWZ0IH1cbiAgICAgIHNjcm9sbC5kaXJlY3Rpb25DaGFuZ2VkID0gc2Nyb2xsLmRpcmVjdGlvbiAhPT0gY3VyRGlyXG4gICAgICBzY3JvbGwuZGVsdGEgPSBkZWx0YVxuXG4gICAgICBpZiAoc2Nyb2xsLmRpcmVjdGlvbkNoYW5nZWQgPT09IHRydWUpIHtcbiAgICAgICAgc2Nyb2xsLmRpcmVjdGlvbiA9IGN1ckRpclxuICAgICAgICBzY3JvbGwuaW5mbGVjdGlvblBvaW50ID0gc2Nyb2xsLnBvc2l0aW9uXG4gICAgICB9XG5cbiAgICAgIGVtaXQoJ3Njcm9sbCcsIHsgLi4uc2Nyb2xsIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29uZmlndXJlU2Nyb2xsVGFyZ2V0ICgpIHtcbiAgICAgIGxvY2FsU2Nyb2xsVGFyZ2V0ID0gZ2V0U2Nyb2xsVGFyZ2V0KHBhcmVudEVsLCBwcm9wcy5zY3JvbGxUYXJnZXQpXG4gICAgICBsb2NhbFNjcm9sbFRhcmdldC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0cmlnZ2VyLCBwYXNzaXZlKVxuICAgICAgdHJpZ2dlcih0cnVlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVuY29uZmlndXJlU2Nyb2xsVGFyZ2V0ICgpIHtcbiAgICAgIGlmIChsb2NhbFNjcm9sbFRhcmdldCAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGxvY2FsU2Nyb2xsVGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRyaWdnZXIsIHBhc3NpdmUpXG4gICAgICAgIGxvY2FsU2Nyb2xsVGFyZ2V0ID0gdm9pZCAwXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJpZ2dlciAoaW1tZWRpYXRlbHkpIHtcbiAgICAgIGlmIChpbW1lZGlhdGVseSA9PT0gdHJ1ZSB8fCBwcm9wcy5kZWJvdW5jZSA9PT0gMCB8fCBwcm9wcy5kZWJvdW5jZSA9PT0gJzAnKSB7XG4gICAgICAgIGVtaXRFdmVudCgpXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChjbGVhclRpbWVyID09PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IFsgdGltZXIsIGZuIF0gPSBwcm9wcy5kZWJvdW5jZVxuICAgICAgICAgID8gWyBzZXRUaW1lb3V0KGVtaXRFdmVudCwgcHJvcHMuZGVib3VuY2UpLCBjbGVhclRpbWVvdXQgXVxuICAgICAgICAgIDogWyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZW1pdEV2ZW50KSwgY2FuY2VsQW5pbWF0aW9uRnJhbWUgXVxuXG4gICAgICAgIGNsZWFyVGltZXIgPSAoKSA9PiB7XG4gICAgICAgICAgZm4odGltZXIpXG4gICAgICAgICAgY2xlYXJUaW1lciA9IG51bGxcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHsgcHJveHkgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgICB3YXRjaCgoKSA9PiBwcm94eS4kcS5sYW5nLnJ0bCwgZW1pdEV2ZW50KVxuXG4gICAgb25Nb3VudGVkKCgpID0+IHtcbiAgICAgIHBhcmVudEVsID0gcHJveHkuJGVsLnBhcmVudE5vZGVcbiAgICAgIGNvbmZpZ3VyZVNjcm9sbFRhcmdldCgpXG4gICAgfSlcblxuICAgIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgICBjbGVhclRpbWVyPy4oKVxuICAgICAgdW5jb25maWd1cmVTY3JvbGxUYXJnZXQoKVxuICAgIH0pXG5cbiAgICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHNcbiAgICBPYmplY3QuYXNzaWduKHByb3h5LCB7XG4gICAgICB0cmlnZ2VyLFxuICAgICAgZ2V0UG9zaXRpb246ICgpID0+IHNjcm9sbFxuICAgIH0pXG5cbiAgICByZXR1cm4gbm9vcFxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgcmVmLCByZWFjdGl2ZSwgY29tcHV0ZWQsIHdhdGNoLCBwcm92aWRlLCBvblVubW91bnRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBpc1J1bnRpbWVTc3JQcmVIeWRyYXRpb24gfSBmcm9tICcuLi8uLi9wbHVnaW5zL3BsYXRmb3JtL1BsYXRmb3JtLmpzJ1xuXG5pbXBvcnQgUVNjcm9sbE9ic2VydmVyIGZyb20gJy4uL3Njcm9sbC1vYnNlcnZlci9RU2Nyb2xsT2JzZXJ2ZXIuanMnXG5pbXBvcnQgUVJlc2l6ZU9ic2VydmVyIGZyb20gJy4uL3Jlc2l6ZS1vYnNlcnZlci9RUmVzaXplT2JzZXJ2ZXIuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGdldFNjcm9sbGJhcldpZHRoIH0gZnJvbSAnLi4vLi4vdXRpbHMvc2Nyb2xsL3Njcm9sbC5qcydcbmltcG9ydCB7IGhNZXJnZVNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5pbXBvcnQgeyBsYXlvdXRLZXkgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnN5bWJvbHMvc3ltYm9scy5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FMYXlvdXQnLFxuXG4gIHByb3BzOiB7XG4gICAgY29udGFpbmVyOiBCb29sZWFuLFxuICAgIHZpZXc6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdoaGggbHByIGZmZicsXG4gICAgICB2YWxpZGF0b3I6IHYgPT4gL14oaHxsKWgoaHxyKSBscHIgKGZ8bClmKGZ8cikkLy50ZXN0KHYudG9Mb3dlckNhc2UoKSlcbiAgICB9LFxuXG4gICAgb25TY3JvbGw6IEZ1bmN0aW9uLFxuICAgIG9uU2Nyb2xsSGVpZ2h0OiBGdW5jdGlvbixcbiAgICBvblJlc2l6ZTogRnVuY3Rpb25cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIGNvbnN0IHsgcHJveHk6IHsgJHEgfSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIGNvbnN0IHJvb3RSZWYgPSByZWYobnVsbClcblxuICAgIC8vIHBhZ2UgcmVsYXRlZFxuICAgIGNvbnN0IGhlaWdodCA9IHJlZigkcS5zY3JlZW4uaGVpZ2h0KVxuICAgIGNvbnN0IHdpZHRoID0gcmVmKHByb3BzLmNvbnRhaW5lciA9PT0gdHJ1ZSA/IDAgOiAkcS5zY3JlZW4ud2lkdGgpXG4gICAgY29uc3Qgc2Nyb2xsID0gcmVmKHsgcG9zaXRpb246IDAsIGRpcmVjdGlvbjogJ2Rvd24nLCBpbmZsZWN0aW9uUG9pbnQ6IDAgfSlcblxuICAgIC8vIGNvbnRhaW5lciBvbmx5IHByb3BcbiAgICBjb25zdCBjb250YWluZXJIZWlnaHQgPSByZWYoMClcbiAgICBjb25zdCBzY3JvbGxiYXJXaWR0aCA9IHJlZihpc1J1bnRpbWVTc3JQcmVIeWRyYXRpb24udmFsdWUgPT09IHRydWUgPyAwIDogZ2V0U2Nyb2xsYmFyV2lkdGgoKSlcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtbGF5b3V0IHEtbGF5b3V0LS0nXG4gICAgICArIChwcm9wcy5jb250YWluZXIgPT09IHRydWUgPyAnY29udGFpbmVyaXplZCcgOiAnc3RhbmRhcmQnKVxuICAgIClcblxuICAgIGNvbnN0IHN0eWxlID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuY29udGFpbmVyID09PSBmYWxzZVxuICAgICAgICA/IHsgbWluSGVpZ2h0OiAkcS5zY3JlZW4uaGVpZ2h0ICsgJ3B4JyB9XG4gICAgICAgIDogbnVsbFxuICAgICkpXG5cbiAgICAvLyB1c2VkIGJ5IGNvbnRhaW5lciBvbmx5XG4gICAgY29uc3QgdGFyZ2V0U3R5bGUgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBzY3JvbGxiYXJXaWR0aC52YWx1ZSAhPT0gMFxuICAgICAgICA/IHsgWyAkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/ICdsZWZ0JyA6ICdyaWdodCcgXTogYCR7IHNjcm9sbGJhcldpZHRoLnZhbHVlIH1weGAgfVxuICAgICAgICA6IG51bGxcbiAgICApKVxuXG4gICAgY29uc3QgdGFyZ2V0Q2hpbGRTdHlsZSA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHNjcm9sbGJhcldpZHRoLnZhbHVlICE9PSAwXG4gICAgICAgID8ge1xuICAgICAgICAgICAgWyAkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/ICdyaWdodCcgOiAnbGVmdCcgXTogMCxcbiAgICAgICAgICAgIFsgJHEubGFuZy5ydGwgPT09IHRydWUgPyAnbGVmdCcgOiAncmlnaHQnIF06IGAtJHsgc2Nyb2xsYmFyV2lkdGgudmFsdWUgfXB4YCxcbiAgICAgICAgICAgIHdpZHRoOiBgY2FsYygxMDAlICsgJHsgc2Nyb2xsYmFyV2lkdGgudmFsdWUgfXB4KWBcbiAgICAgICAgICB9XG4gICAgICAgIDogbnVsbFxuICAgICkpXG5cbiAgICBmdW5jdGlvbiBvblBhZ2VTY3JvbGwgKGRhdGEpIHtcbiAgICAgIGlmIChwcm9wcy5jb250YWluZXIgPT09IHRydWUgfHwgZG9jdW1lbnQucVNjcm9sbFByZXZlbnRlZCAhPT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBpbmZvID0ge1xuICAgICAgICAgIHBvc2l0aW9uOiBkYXRhLnBvc2l0aW9uLnRvcCxcbiAgICAgICAgICBkaXJlY3Rpb246IGRhdGEuZGlyZWN0aW9uLFxuICAgICAgICAgIGRpcmVjdGlvbkNoYW5nZWQ6IGRhdGEuZGlyZWN0aW9uQ2hhbmdlZCxcbiAgICAgICAgICBpbmZsZWN0aW9uUG9pbnQ6IGRhdGEuaW5mbGVjdGlvblBvaW50LnRvcCxcbiAgICAgICAgICBkZWx0YTogZGF0YS5kZWx0YS50b3BcbiAgICAgICAgfVxuXG4gICAgICAgIHNjcm9sbC52YWx1ZSA9IGluZm9cbiAgICAgICAgcHJvcHMub25TY3JvbGwgIT09IHZvaWQgMCAmJiBlbWl0KCdzY3JvbGwnLCBpbmZvKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uUGFnZVJlc2l6ZSAoZGF0YSkge1xuICAgICAgY29uc3QgeyBoZWlnaHQ6IG5ld0hlaWdodCwgd2lkdGg6IG5ld1dpZHRoIH0gPSBkYXRhXG4gICAgICBsZXQgcmVzaXplZCA9IGZhbHNlXG5cbiAgICAgIGlmIChoZWlnaHQudmFsdWUgIT09IG5ld0hlaWdodCkge1xuICAgICAgICByZXNpemVkID0gdHJ1ZVxuICAgICAgICBoZWlnaHQudmFsdWUgPSBuZXdIZWlnaHRcbiAgICAgICAgcHJvcHMub25TY3JvbGxIZWlnaHQgIT09IHZvaWQgMCAmJiBlbWl0KCdzY3JvbGxIZWlnaHQnLCBuZXdIZWlnaHQpXG4gICAgICAgIHVwZGF0ZVNjcm9sbGJhcldpZHRoKClcbiAgICAgIH1cbiAgICAgIGlmICh3aWR0aC52YWx1ZSAhPT0gbmV3V2lkdGgpIHtcbiAgICAgICAgcmVzaXplZCA9IHRydWVcbiAgICAgICAgd2lkdGgudmFsdWUgPSBuZXdXaWR0aFxuICAgICAgfVxuXG4gICAgICBpZiAocmVzaXplZCA9PT0gdHJ1ZSAmJiBwcm9wcy5vblJlc2l6ZSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGVtaXQoJ3Jlc2l6ZScsIGRhdGEpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Db250YWluZXJSZXNpemUgKHsgaGVpZ2h0IH0pIHtcbiAgICAgIGlmIChjb250YWluZXJIZWlnaHQudmFsdWUgIT09IGhlaWdodCkge1xuICAgICAgICBjb250YWluZXJIZWlnaHQudmFsdWUgPSBoZWlnaHRcbiAgICAgICAgdXBkYXRlU2Nyb2xsYmFyV2lkdGgoKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVNjcm9sbGJhcldpZHRoICgpIHtcbiAgICAgIGlmIChwcm9wcy5jb250YWluZXIgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3Qgd2lkdGggPSBoZWlnaHQudmFsdWUgPiBjb250YWluZXJIZWlnaHQudmFsdWVcbiAgICAgICAgICA/IGdldFNjcm9sbGJhcldpZHRoKClcbiAgICAgICAgICA6IDBcblxuICAgICAgICBpZiAoc2Nyb2xsYmFyV2lkdGgudmFsdWUgIT09IHdpZHRoKSB7XG4gICAgICAgICAgc2Nyb2xsYmFyV2lkdGgudmFsdWUgPSB3aWR0aFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGFuaW1hdGVUaW1lciA9IG51bGxcblxuICAgIGNvbnN0ICRsYXlvdXQgPSB7XG4gICAgICBpbnN0YW5jZXM6IHt9LFxuICAgICAgdmlldzogY29tcHV0ZWQoKCkgPT4gcHJvcHMudmlldyksXG4gICAgICBpc0NvbnRhaW5lcjogY29tcHV0ZWQoKCkgPT4gcHJvcHMuY29udGFpbmVyKSxcblxuICAgICAgcm9vdFJlZixcblxuICAgICAgaGVpZ2h0LFxuICAgICAgY29udGFpbmVySGVpZ2h0LFxuICAgICAgc2Nyb2xsYmFyV2lkdGgsXG4gICAgICB0b3RhbFdpZHRoOiBjb21wdXRlZCgoKSA9PiB3aWR0aC52YWx1ZSArIHNjcm9sbGJhcldpZHRoLnZhbHVlKSxcblxuICAgICAgcm93czogY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgICBjb25zdCByb3dzID0gcHJvcHMudmlldy50b0xvd2VyQ2FzZSgpLnNwbGl0KCcgJylcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0b3A6IHJvd3NbIDAgXS5zcGxpdCgnJyksXG4gICAgICAgICAgbWlkZGxlOiByb3dzWyAxIF0uc3BsaXQoJycpLFxuICAgICAgICAgIGJvdHRvbTogcm93c1sgMiBdLnNwbGl0KCcnKVxuICAgICAgICB9XG4gICAgICB9KSxcblxuICAgICAgaGVhZGVyOiByZWFjdGl2ZSh7IHNpemU6IDAsIG9mZnNldDogMCwgc3BhY2U6IGZhbHNlIH0pLFxuICAgICAgcmlnaHQ6IHJlYWN0aXZlKHsgc2l6ZTogMzAwLCBvZmZzZXQ6IDAsIHNwYWNlOiBmYWxzZSB9KSxcbiAgICAgIGZvb3RlcjogcmVhY3RpdmUoeyBzaXplOiAwLCBvZmZzZXQ6IDAsIHNwYWNlOiBmYWxzZSB9KSxcbiAgICAgIGxlZnQ6IHJlYWN0aXZlKHsgc2l6ZTogMzAwLCBvZmZzZXQ6IDAsIHNwYWNlOiBmYWxzZSB9KSxcblxuICAgICAgc2Nyb2xsLFxuXG4gICAgICBhbmltYXRlICgpIHtcbiAgICAgICAgaWYgKGFuaW1hdGVUaW1lciAhPT0gbnVsbCkge1xuICAgICAgICAgIGNsZWFyVGltZW91dChhbmltYXRlVGltZXIpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdxLWJvZHktLWxheW91dC1hbmltYXRlJylcbiAgICAgICAgfVxuXG4gICAgICAgIGFuaW1hdGVUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGFuaW1hdGVUaW1lciA9IG51bGxcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3EtYm9keS0tbGF5b3V0LWFuaW1hdGUnKVxuICAgICAgICB9LCAxNTUpXG4gICAgICB9LFxuXG4gICAgICB1cGRhdGUgKHBhcnQsIHByb3AsIHZhbCkge1xuICAgICAgICAkbGF5b3V0WyBwYXJ0IF1bIHByb3AgXSA9IHZhbFxuICAgICAgfVxuICAgIH1cblxuICAgIHByb3ZpZGUobGF5b3V0S2V5LCAkbGF5b3V0KVxuXG4gICAgLy8gcHJldmVudCBzY3JvbGxiYXIgZmxpY2tlciB3aGlsZSByZXNpemluZyB3aW5kb3cgaGVpZ2h0XG4gICAgLy8gaWYgbm8gcGFnZSBzY3JvbGxiYXIgaXMgYWxyZWFkeSBwcmVzZW50XG4gICAgaWYgKF9fUVVBU0FSX1NTUl9TRVJWRVJfXyAhPT0gdHJ1ZSAmJiBnZXRTY3JvbGxiYXJXaWR0aCgpID4gMCkge1xuICAgICAgbGV0IHRpbWVyID0gbnVsbFxuICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5ib2R5XG5cbiAgICAgIGZ1bmN0aW9uIHJlc3RvcmVTY3JvbGxiYXIgKCkge1xuICAgICAgICB0aW1lciA9IG51bGxcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZS1zY3JvbGxiYXInKVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBoaWRlU2Nyb2xsYmFyICgpIHtcbiAgICAgICAgaWYgKHRpbWVyID09PSBudWxsKSB7XG4gICAgICAgICAgLy8gaWYgaXQgaGFzIG5vIHNjcm9sbGJhciB0aGVuIHRoZXJlJ3Mgbm90aGluZyB0byBkb1xuICAgICAgICAgIGlmIChlbC5zY3JvbGxIZWlnaHQgPiAkcS5zY3JlZW4uaGVpZ2h0KSByZXR1cm5cblxuICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2hpZGUtc2Nyb2xsYmFyJylcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICAgIH1cblxuICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQocmVzdG9yZVNjcm9sbGJhciwgMzAwKVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiB1cGRhdGVTY3JvbGxFdmVudCAoYWN0aW9uKSB7XG4gICAgICAgIGlmICh0aW1lciAhPT0gbnVsbCAmJiBhY3Rpb24gPT09ICdyZW1vdmUnKSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgICAgICAgIHJlc3RvcmVTY3JvbGxiYXIoKVxuICAgICAgICB9XG5cbiAgICAgICAgd2luZG93WyBgJHsgYWN0aW9uIH1FdmVudExpc3RlbmVyYCBdKCdyZXNpemUnLCBoaWRlU2Nyb2xsYmFyKVxuICAgICAgfVxuXG4gICAgICB3YXRjaChcbiAgICAgICAgKCkgPT4gKHByb3BzLmNvbnRhaW5lciAhPT0gdHJ1ZSA/ICdhZGQnIDogJ3JlbW92ZScpLFxuICAgICAgICB1cGRhdGVTY3JvbGxFdmVudFxuICAgICAgKVxuXG4gICAgICBwcm9wcy5jb250YWluZXIgIT09IHRydWUgJiYgdXBkYXRlU2Nyb2xsRXZlbnQoJ2FkZCcpXG5cbiAgICAgIG9uVW5tb3VudGVkKCgpID0+IHtcbiAgICAgICAgdXBkYXRlU2Nyb2xsRXZlbnQoJ3JlbW92ZScpXG4gICAgICB9KVxuICAgIH1cblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjb25zdCBjb250ZW50ID0gaE1lcmdlU2xvdChzbG90cy5kZWZhdWx0LCBbXG4gICAgICAgIGgoUVNjcm9sbE9ic2VydmVyLCB7IG9uU2Nyb2xsOiBvblBhZ2VTY3JvbGwgfSksXG4gICAgICAgIGgoUVJlc2l6ZU9ic2VydmVyLCB7IG9uUmVzaXplOiBvblBhZ2VSZXNpemUgfSlcbiAgICAgIF0pXG5cbiAgICAgIGNvbnN0IGxheW91dCA9IGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUsXG4gICAgICAgIHN0eWxlOiBzdHlsZS52YWx1ZSxcbiAgICAgICAgcmVmOiBwcm9wcy5jb250YWluZXIgPT09IHRydWUgPyB2b2lkIDAgOiByb290UmVmLFxuICAgICAgICB0YWJpbmRleDogLTFcbiAgICAgIH0sIGNvbnRlbnQpXG5cbiAgICAgIGlmIChwcm9wcy5jb250YWluZXIgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogJ3EtbGF5b3V0LWNvbnRhaW5lciBvdmVyZmxvdy1oaWRkZW4nLFxuICAgICAgICAgIHJlZjogcm9vdFJlZlxuICAgICAgICB9LCBbXG4gICAgICAgICAgaChRUmVzaXplT2JzZXJ2ZXIsIHsgb25SZXNpemU6IG9uQ29udGFpbmVyUmVzaXplIH0pLFxuICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgIGNsYXNzOiAnYWJzb2x1dGUtZnVsbCcsXG4gICAgICAgICAgICBzdHlsZTogdGFyZ2V0U3R5bGUudmFsdWVcbiAgICAgICAgICB9LCBbXG4gICAgICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgICAgIGNsYXNzOiAnc2Nyb2xsJyxcbiAgICAgICAgICAgICAgc3R5bGU6IHRhcmdldENoaWxkU3R5bGUudmFsdWVcbiAgICAgICAgICAgIH0sIFsgbGF5b3V0IF0pXG4gICAgICAgICAgXSlcbiAgICAgICAgXSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGxheW91dFxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIHdpdGhEaXJlY3RpdmVzIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5cbi8qKlxuICogV2UgYXJlIHVzaW5nIGEgc3ViLWNvbXBvbmVudCB0byBhdm9pZCB1bm5lY2Vzc2FyeSByZS1yZW5kZXJzXG4gKiBvZiB0aGUgUVNjcm9sbEFyZWEgY29udGVudCB3aGVuIHRoZSBzY3JvbGxiYXJzIGFyZSBpbnRlcmFjdGVkIHdpdGguXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIHByb3BzOiBbXG4gICAgJ3N0b3JlJyxcbiAgICAnYmFyU3R5bGUnLFxuICAgICd2ZXJ0aWNhbEJhclN0eWxlJyxcbiAgICAnaG9yaXpvbnRhbEJhclN0eWxlJ1xuICBdLFxuXG4gIHNldHVwIChwcm9wcykge1xuICAgIHJldHVybiAoKSA9PiAoW1xuICAgICAgaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogcHJvcHMuc3RvcmUuc2Nyb2xsLnZlcnRpY2FsLmJhckNsYXNzLnZhbHVlLFxuICAgICAgICBzdHlsZTogWyBwcm9wcy5iYXJTdHlsZSwgcHJvcHMudmVydGljYWxCYXJTdHlsZSBdLFxuICAgICAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZScsXG4gICAgICAgIG9uTW91c2Vkb3duOiBwcm9wcy5zdG9yZS5vblZlcnRpY2FsTW91c2Vkb3duXG4gICAgICB9KSxcblxuICAgICAgaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogcHJvcHMuc3RvcmUuc2Nyb2xsLmhvcml6b250YWwuYmFyQ2xhc3MudmFsdWUsXG4gICAgICAgIHN0eWxlOiBbIHByb3BzLmJhclN0eWxlLCBwcm9wcy5ob3Jpem9udGFsQmFyU3R5bGUgXSxcbiAgICAgICAgJ2FyaWEtaGlkZGVuJzogJ3RydWUnLFxuICAgICAgICBvbk1vdXNlZG93bjogcHJvcHMuc3RvcmUub25Ib3Jpem9udGFsTW91c2Vkb3duXG4gICAgICB9KSxcblxuICAgICAgd2l0aERpcmVjdGl2ZXMoXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICByZWY6IHByb3BzLnN0b3JlLnNjcm9sbC52ZXJ0aWNhbC5yZWYsXG4gICAgICAgICAgY2xhc3M6IHByb3BzLnN0b3JlLnNjcm9sbC52ZXJ0aWNhbC50aHVtYkNsYXNzLnZhbHVlLFxuICAgICAgICAgIHN0eWxlOiBwcm9wcy5zdG9yZS5zY3JvbGwudmVydGljYWwuc3R5bGUudmFsdWUsXG4gICAgICAgICAgJ2FyaWEtaGlkZGVuJzogJ3RydWUnXG4gICAgICAgIH0pLFxuICAgICAgICBwcm9wcy5zdG9yZS50aHVtYlZlcnREaXJcbiAgICAgICksXG5cbiAgICAgIHdpdGhEaXJlY3RpdmVzKFxuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgcmVmOiBwcm9wcy5zdG9yZS5zY3JvbGwuaG9yaXpvbnRhbC5yZWYsXG4gICAgICAgICAgY2xhc3M6IHByb3BzLnN0b3JlLnNjcm9sbC5ob3Jpem9udGFsLnRodW1iQ2xhc3MudmFsdWUsXG4gICAgICAgICAgc3R5bGU6IHByb3BzLnN0b3JlLnNjcm9sbC5ob3Jpem9udGFsLnN0eWxlLnZhbHVlLFxuICAgICAgICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJ1xuICAgICAgICB9KSxcbiAgICAgICAgcHJvcHMuc3RvcmUudGh1bWJIb3JpekRpclxuICAgICAgKVxuICAgIF0pXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCB3YXRjaCwgb25BY3RpdmF0ZWQsIG9uRGVhY3RpdmF0ZWQsIG9uQmVmb3JlVW5tb3VudCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlRGFyaywgeyB1c2VEYXJrUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1kYXJrL3VzZS1kYXJrLmpzJ1xuXG5pbXBvcnQgU2Nyb2xsQXJlYUNvbnRyb2xzIGZyb20gJy4vU2Nyb2xsQXJlYUNvbnRyb2xzLmpzJ1xuaW1wb3J0IFFSZXNpemVPYnNlcnZlciBmcm9tICcuLi9yZXNpemUtb2JzZXJ2ZXIvUVJlc2l6ZU9ic2VydmVyLmpzJ1xuaW1wb3J0IFFTY3JvbGxPYnNlcnZlciBmcm9tICcuLi9zY3JvbGwtb2JzZXJ2ZXIvUVNjcm9sbE9ic2VydmVyLmpzJ1xuXG5pbXBvcnQgVG91Y2hQYW4gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy90b3VjaC1wYW4vVG91Y2hQYW4uanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGJldHdlZW4gfSBmcm9tICcuLi8uLi91dGlscy9mb3JtYXQvZm9ybWF0LmpzJ1xuaW1wb3J0IHsgc2V0VmVydGljYWxTY3JvbGxQb3NpdGlvbiwgc2V0SG9yaXpvbnRhbFNjcm9sbFBvc2l0aW9uIH0gZnJvbSAnLi4vLi4vdXRpbHMvc2Nyb2xsL3Njcm9sbC5qcydcbmltcG9ydCB7IGhNZXJnZVNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5pbXBvcnQgZGVib3VuY2UgZnJvbSAnLi4vLi4vdXRpbHMvZGVib3VuY2UvZGVib3VuY2UuanMnXG5cbmNvbnN0IGF4aXNMaXN0ID0gWyAndmVydGljYWwnLCAnaG9yaXpvbnRhbCcgXVxuY29uc3QgZGlyUHJvcHMgPSB7XG4gIHZlcnRpY2FsOiB7IG9mZnNldDogJ29mZnNldFknLCBzY3JvbGw6ICdzY3JvbGxUb3AnLCBkaXI6ICdkb3duJywgZGlzdDogJ3knIH0sXG4gIGhvcml6b250YWw6IHsgb2Zmc2V0OiAnb2Zmc2V0WCcsIHNjcm9sbDogJ3Njcm9sbExlZnQnLCBkaXI6ICdyaWdodCcsIGRpc3Q6ICd4JyB9XG59XG5jb25zdCBwYW5PcHRzID0ge1xuICBwcmV2ZW50OiB0cnVlLFxuICBtb3VzZTogdHJ1ZSxcbiAgbW91c2VBbGxEaXI6IHRydWVcbn1cblxuY29uc3QgZ2V0TWluVGh1bWJTaXplID0gc2l6ZSA9PiAoc2l6ZSA+PSAyNTAgPyA1MCA6IE1hdGguY2VpbChzaXplIC8gNSkpXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRU2Nyb2xsQXJlYScsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VEYXJrUHJvcHMsXG5cbiAgICB0aHVtYlN0eWxlOiBPYmplY3QsXG4gICAgdmVydGljYWxUaHVtYlN0eWxlOiBPYmplY3QsXG4gICAgaG9yaXpvbnRhbFRodW1iU3R5bGU6IE9iamVjdCxcblxuICAgIGJhclN0eWxlOiBbIEFycmF5LCBTdHJpbmcsIE9iamVjdCBdLFxuICAgIHZlcnRpY2FsQmFyU3R5bGU6IFsgQXJyYXksIFN0cmluZywgT2JqZWN0IF0sXG4gICAgaG9yaXpvbnRhbEJhclN0eWxlOiBbIEFycmF5LCBTdHJpbmcsIE9iamVjdCBdLFxuXG4gICAgdmVydGljYWxPZmZzZXQ6IHtcbiAgICAgIHR5cGU6IEFycmF5LFxuICAgICAgZGVmYXVsdDogWyAwLCAwIF1cbiAgICB9LFxuICAgIGhvcml6b250YWxPZmZzZXQ6IHtcbiAgICAgIHR5cGU6IEFycmF5LFxuICAgICAgZGVmYXVsdDogWyAwLCAwIF1cbiAgICB9LFxuXG4gICAgY29udGVudFN0eWxlOiBbIEFycmF5LCBTdHJpbmcsIE9iamVjdCBdLFxuICAgIGNvbnRlbnRBY3RpdmVTdHlsZTogWyBBcnJheSwgU3RyaW5nLCBPYmplY3QgXSxcblxuICAgIGRlbGF5OiB7XG4gICAgICB0eXBlOiBbIFN0cmluZywgTnVtYmVyIF0sXG4gICAgICBkZWZhdWx0OiAxMDAwXG4gICAgfSxcblxuICAgIHZpc2libGU6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiBudWxsXG4gICAgfSxcblxuICAgIHRhYmluZGV4OiBbIFN0cmluZywgTnVtYmVyIF0sXG5cbiAgICBvblNjcm9sbDogRnVuY3Rpb25cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIC8vIHN0YXRlIG1hbmFnZW1lbnRcbiAgICBjb25zdCB0ZW1wU2hvd2luZyA9IHJlZihmYWxzZSlcbiAgICBjb25zdCBwYW5uaW5nID0gcmVmKGZhbHNlKVxuICAgIGNvbnN0IGhvdmVyID0gcmVmKGZhbHNlKVxuXG4gICAgLy8gb3RoZXIuLi5cbiAgICBjb25zdCBjb250YWluZXIgPSB7XG4gICAgICB2ZXJ0aWNhbDogcmVmKDApLFxuICAgICAgaG9yaXpvbnRhbDogcmVmKDApXG4gICAgfVxuXG4gICAgY29uc3Qgc2Nyb2xsID0ge1xuICAgICAgdmVydGljYWw6IHtcbiAgICAgICAgcmVmOiByZWYobnVsbCksXG4gICAgICAgIHBvc2l0aW9uOiByZWYoMCksXG4gICAgICAgIHNpemU6IHJlZigwKVxuICAgICAgfSxcblxuICAgICAgaG9yaXpvbnRhbDoge1xuICAgICAgICByZWY6IHJlZihudWxsKSxcbiAgICAgICAgcG9zaXRpb246IHJlZigwKSxcbiAgICAgICAgc2l6ZTogcmVmKDApXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgeyBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsIHByb3h5LiRxKVxuXG4gICAgbGV0IHRpbWVyID0gbnVsbCwgcGFuUmVmUG9zXG5cbiAgICBjb25zdCB0YXJnZXRSZWYgPSByZWYobnVsbClcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3Etc2Nyb2xsYXJlYSdcbiAgICAgICsgKGlzRGFyay52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1zY3JvbGxhcmVhLS1kYXJrJyA6ICcnKVxuICAgIClcblxuICAgIE9iamVjdC5hc3NpZ24oY29udGFpbmVyLCB7XG4gICAgICB2ZXJ0aWNhbElubmVyOiBjb21wdXRlZCgoKSA9PiAoXG4gICAgICAgIGNvbnRhaW5lci52ZXJ0aWNhbC52YWx1ZSAtIHByb3BzLnZlcnRpY2FsT2Zmc2V0WyAwIF0gLSBwcm9wcy52ZXJ0aWNhbE9mZnNldFsgMSBdXG4gICAgICApKSxcblxuICAgICAgaG9yaXpvbnRhbElubmVyOiBjb21wdXRlZCgoKSA9PiAoXG4gICAgICAgIGNvbnRhaW5lci5ob3Jpem9udGFsLnZhbHVlIC0gcHJvcHMuaG9yaXpvbnRhbE9mZnNldFsgMCBdIC0gcHJvcHMuaG9yaXpvbnRhbE9mZnNldFsgMSBdXG4gICAgICApKVxuICAgIH0pXG5cbiAgICBzY3JvbGwudmVydGljYWwucGVyY2VudGFnZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGRpZmYgPSBzY3JvbGwudmVydGljYWwuc2l6ZS52YWx1ZSAtIGNvbnRhaW5lci52ZXJ0aWNhbC52YWx1ZVxuICAgICAgaWYgKGRpZmYgPD0gMCkgeyByZXR1cm4gMCB9XG4gICAgICBjb25zdCBwID0gYmV0d2VlbihzY3JvbGwudmVydGljYWwucG9zaXRpb24udmFsdWUgLyBkaWZmLCAwLCAxKVxuICAgICAgcmV0dXJuIE1hdGgucm91bmQocCAqIDEwMDAwKSAvIDEwMDAwXG4gICAgfSlcbiAgICBzY3JvbGwudmVydGljYWwudGh1bWJIaWRkZW4gPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICAoXG4gICAgICAgIChwcm9wcy52aXNpYmxlID09PSBudWxsID8gaG92ZXIudmFsdWUgOiBwcm9wcy52aXNpYmxlKSAhPT0gdHJ1ZVxuICAgICAgICAmJiB0ZW1wU2hvd2luZy52YWx1ZSA9PT0gZmFsc2VcbiAgICAgICAgJiYgcGFubmluZy52YWx1ZSA9PT0gZmFsc2VcbiAgICAgICkgfHwgc2Nyb2xsLnZlcnRpY2FsLnNpemUudmFsdWUgPD0gY29udGFpbmVyLnZlcnRpY2FsLnZhbHVlICsgMVxuICAgICkpXG4gICAgc2Nyb2xsLnZlcnRpY2FsLnRodW1iU3RhcnQgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy52ZXJ0aWNhbE9mZnNldFsgMCBdXG4gICAgICArIHNjcm9sbC52ZXJ0aWNhbC5wZXJjZW50YWdlLnZhbHVlICogKGNvbnRhaW5lci52ZXJ0aWNhbElubmVyLnZhbHVlIC0gc2Nyb2xsLnZlcnRpY2FsLnRodW1iU2l6ZS52YWx1ZSlcbiAgICApKVxuICAgIHNjcm9sbC52ZXJ0aWNhbC50aHVtYlNpemUgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgTWF0aC5yb3VuZChcbiAgICAgICAgYmV0d2VlbihcbiAgICAgICAgICBjb250YWluZXIudmVydGljYWxJbm5lci52YWx1ZSAqIGNvbnRhaW5lci52ZXJ0aWNhbElubmVyLnZhbHVlIC8gc2Nyb2xsLnZlcnRpY2FsLnNpemUudmFsdWUsXG4gICAgICAgICAgZ2V0TWluVGh1bWJTaXplKGNvbnRhaW5lci52ZXJ0aWNhbElubmVyLnZhbHVlKSxcbiAgICAgICAgICBjb250YWluZXIudmVydGljYWxJbm5lci52YWx1ZVxuICAgICAgICApXG4gICAgICApXG4gICAgKVxuICAgIHNjcm9sbC52ZXJ0aWNhbC5zdHlsZSA9IGNvbXB1dGVkKCgpID0+ICh7XG4gICAgICAuLi5wcm9wcy50aHVtYlN0eWxlLFxuICAgICAgLi4ucHJvcHMudmVydGljYWxUaHVtYlN0eWxlLFxuICAgICAgdG9wOiBgJHsgc2Nyb2xsLnZlcnRpY2FsLnRodW1iU3RhcnQudmFsdWUgfXB4YCxcbiAgICAgIGhlaWdodDogYCR7IHNjcm9sbC52ZXJ0aWNhbC50aHVtYlNpemUudmFsdWUgfXB4YCxcbiAgICAgIHJpZ2h0OiBgJHsgcHJvcHMuaG9yaXpvbnRhbE9mZnNldFsgMSBdIH1weGBcbiAgICB9KSlcbiAgICBzY3JvbGwudmVydGljYWwudGh1bWJDbGFzcyA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgICdxLXNjcm9sbGFyZWFfX3RodW1iIHEtc2Nyb2xsYXJlYV9fdGh1bWItLXYgYWJzb2x1dGUtcmlnaHQnXG4gICAgICArIChzY3JvbGwudmVydGljYWwudGh1bWJIaWRkZW4udmFsdWUgPT09IHRydWUgPyAnIHEtc2Nyb2xsYXJlYV9fdGh1bWItLWludmlzaWJsZScgOiAnJylcbiAgICApKVxuICAgIHNjcm9sbC52ZXJ0aWNhbC5iYXJDbGFzcyA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgICdxLXNjcm9sbGFyZWFfX2JhciBxLXNjcm9sbGFyZWFfX2Jhci0tdiBhYnNvbHV0ZS1yaWdodCdcbiAgICAgICsgKHNjcm9sbC52ZXJ0aWNhbC50aHVtYkhpZGRlbi52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1zY3JvbGxhcmVhX19iYXItLWludmlzaWJsZScgOiAnJylcbiAgICApKVxuXG4gICAgc2Nyb2xsLmhvcml6b250YWwucGVyY2VudGFnZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGRpZmYgPSBzY3JvbGwuaG9yaXpvbnRhbC5zaXplLnZhbHVlIC0gY29udGFpbmVyLmhvcml6b250YWwudmFsdWVcbiAgICAgIGlmIChkaWZmIDw9IDApIHsgcmV0dXJuIDAgfVxuICAgICAgY29uc3QgcCA9IGJldHdlZW4oTWF0aC5hYnMoc2Nyb2xsLmhvcml6b250YWwucG9zaXRpb24udmFsdWUpIC8gZGlmZiwgMCwgMSlcbiAgICAgIHJldHVybiBNYXRoLnJvdW5kKHAgKiAxMDAwMCkgLyAxMDAwMFxuICAgIH0pXG4gICAgc2Nyb2xsLmhvcml6b250YWwudGh1bWJIaWRkZW4gPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICAoXG4gICAgICAgIChwcm9wcy52aXNpYmxlID09PSBudWxsID8gaG92ZXIudmFsdWUgOiBwcm9wcy52aXNpYmxlKSAhPT0gdHJ1ZVxuICAgICAgICAmJiB0ZW1wU2hvd2luZy52YWx1ZSA9PT0gZmFsc2VcbiAgICAgICAgJiYgcGFubmluZy52YWx1ZSA9PT0gZmFsc2VcbiAgICAgICkgfHwgc2Nyb2xsLmhvcml6b250YWwuc2l6ZS52YWx1ZSA8PSBjb250YWluZXIuaG9yaXpvbnRhbC52YWx1ZSArIDFcbiAgICApKVxuICAgIHNjcm9sbC5ob3Jpem9udGFsLnRodW1iU3RhcnQgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5ob3Jpem9udGFsT2Zmc2V0WyAwIF1cbiAgICAgICsgc2Nyb2xsLmhvcml6b250YWwucGVyY2VudGFnZS52YWx1ZSAqIChjb250YWluZXIuaG9yaXpvbnRhbElubmVyLnZhbHVlIC0gc2Nyb2xsLmhvcml6b250YWwudGh1bWJTaXplLnZhbHVlKVxuICAgICkpXG4gICAgc2Nyb2xsLmhvcml6b250YWwudGh1bWJTaXplID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIE1hdGgucm91bmQoXG4gICAgICAgIGJldHdlZW4oXG4gICAgICAgICAgY29udGFpbmVyLmhvcml6b250YWxJbm5lci52YWx1ZSAqIGNvbnRhaW5lci5ob3Jpem9udGFsSW5uZXIudmFsdWUgLyBzY3JvbGwuaG9yaXpvbnRhbC5zaXplLnZhbHVlLFxuICAgICAgICAgIGdldE1pblRodW1iU2l6ZShjb250YWluZXIuaG9yaXpvbnRhbElubmVyLnZhbHVlKSxcbiAgICAgICAgICBjb250YWluZXIuaG9yaXpvbnRhbElubmVyLnZhbHVlXG4gICAgICAgIClcbiAgICAgIClcbiAgICApXG4gICAgc2Nyb2xsLmhvcml6b250YWwuc3R5bGUgPSBjb21wdXRlZCgoKSA9PiAoe1xuICAgICAgLi4ucHJvcHMudGh1bWJTdHlsZSxcbiAgICAgIC4uLnByb3BzLmhvcml6b250YWxUaHVtYlN0eWxlLFxuICAgICAgWyBwcm94eS4kcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/ICdyaWdodCcgOiAnbGVmdCcgXTogYCR7IHNjcm9sbC5ob3Jpem9udGFsLnRodW1iU3RhcnQudmFsdWUgfXB4YCxcbiAgICAgIHdpZHRoOiBgJHsgc2Nyb2xsLmhvcml6b250YWwudGh1bWJTaXplLnZhbHVlIH1weGAsXG4gICAgICBib3R0b206IGAkeyBwcm9wcy52ZXJ0aWNhbE9mZnNldFsgMSBdIH1weGBcbiAgICB9KSlcbiAgICBzY3JvbGwuaG9yaXpvbnRhbC50aHVtYkNsYXNzID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgJ3Etc2Nyb2xsYXJlYV9fdGh1bWIgcS1zY3JvbGxhcmVhX190aHVtYi0taCBhYnNvbHV0ZS1ib3R0b20nXG4gICAgICArIChzY3JvbGwuaG9yaXpvbnRhbC50aHVtYkhpZGRlbi52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1zY3JvbGxhcmVhX190aHVtYi0taW52aXNpYmxlJyA6ICcnKVxuICAgICkpXG4gICAgc2Nyb2xsLmhvcml6b250YWwuYmFyQ2xhc3MgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICAncS1zY3JvbGxhcmVhX19iYXIgcS1zY3JvbGxhcmVhX19iYXItLWggYWJzb2x1dGUtYm90dG9tJ1xuICAgICAgKyAoc2Nyb2xsLmhvcml6b250YWwudGh1bWJIaWRkZW4udmFsdWUgPT09IHRydWUgPyAnIHEtc2Nyb2xsYXJlYV9fYmFyLS1pbnZpc2libGUnIDogJycpXG4gICAgKSlcblxuICAgIGNvbnN0IG1haW5TdHlsZSA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHNjcm9sbC52ZXJ0aWNhbC50aHVtYkhpZGRlbi52YWx1ZSA9PT0gdHJ1ZSAmJiBzY3JvbGwuaG9yaXpvbnRhbC50aHVtYkhpZGRlbi52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICA/IHByb3BzLmNvbnRlbnRTdHlsZVxuICAgICAgICA6IHByb3BzLmNvbnRlbnRBY3RpdmVTdHlsZVxuICAgICkpXG5cbiAgICBmdW5jdGlvbiBnZXRTY3JvbGwgKCkge1xuICAgICAgY29uc3QgaW5mbyA9IHt9XG5cbiAgICAgIGF4aXNMaXN0LmZvckVhY2goYXhpcyA9PiB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBzY3JvbGxbIGF4aXMgXVxuICAgICAgICBPYmplY3QuYXNzaWduKGluZm8sIHtcbiAgICAgICAgICBbIGF4aXMgKyAnUG9zaXRpb24nIF06IGRhdGEucG9zaXRpb24udmFsdWUsXG4gICAgICAgICAgWyBheGlzICsgJ1BlcmNlbnRhZ2UnIF06IGRhdGEucGVyY2VudGFnZS52YWx1ZSxcbiAgICAgICAgICBbIGF4aXMgKyAnU2l6ZScgXTogZGF0YS5zaXplLnZhbHVlLFxuICAgICAgICAgIFsgYXhpcyArICdDb250YWluZXJTaXplJyBdOiBjb250YWluZXJbIGF4aXMgXS52YWx1ZSxcbiAgICAgICAgICBbIGF4aXMgKyAnQ29udGFpbmVySW5uZXJTaXplJyBdOiBjb250YWluZXJbIGF4aXMgKyAnSW5uZXInIF0udmFsdWVcbiAgICAgICAgfSlcbiAgICAgIH0pXG5cbiAgICAgIHJldHVybiBpbmZvXG4gICAgfVxuXG4gICAgLy8gd2UgaGF2ZSBsb3RzIG9mIGxpc3RlbmVycywgc29cbiAgICAvLyBlbnN1cmUgd2UncmUgbm90IGVtaXR0aW5nIHNhbWUgaW5mb1xuICAgIC8vIG11bHRpcGxlIHRpbWVzXG4gICAgY29uc3QgZW1pdFNjcm9sbCA9IGRlYm91bmNlKCgpID0+IHtcbiAgICAgIGNvbnN0IGluZm8gPSBnZXRTY3JvbGwoKVxuICAgICAgaW5mby5yZWYgPSBwcm94eVxuICAgICAgZW1pdCgnc2Nyb2xsJywgaW5mbylcbiAgICB9LCAwKVxuXG4gICAgZnVuY3Rpb24gbG9jYWxTZXRTY3JvbGxQb3NpdGlvbiAoYXhpcywgb2Zmc2V0LCBkdXJhdGlvbikge1xuICAgICAgaWYgKGF4aXNMaXN0LmluY2x1ZGVzKGF4aXMpID09PSBmYWxzZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdbUVNjcm9sbEFyZWFdOiB3cm9uZyBmaXJzdCBwYXJhbSBvZiBzZXRTY3JvbGxQb3NpdGlvbiAodmVydGljYWwvaG9yaXpvbnRhbCknKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3QgZm4gPSBheGlzID09PSAndmVydGljYWwnXG4gICAgICAgID8gc2V0VmVydGljYWxTY3JvbGxQb3NpdGlvblxuICAgICAgICA6IHNldEhvcml6b250YWxTY3JvbGxQb3NpdGlvblxuXG4gICAgICBmbih0YXJnZXRSZWYudmFsdWUsIG9mZnNldCwgZHVyYXRpb24pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlQ29udGFpbmVyICh7IGhlaWdodCwgd2lkdGggfSkge1xuICAgICAgbGV0IGNoYW5nZSA9IGZhbHNlXG5cbiAgICAgIGlmIChjb250YWluZXIudmVydGljYWwudmFsdWUgIT09IGhlaWdodCkge1xuICAgICAgICBjb250YWluZXIudmVydGljYWwudmFsdWUgPSBoZWlnaHRcbiAgICAgICAgY2hhbmdlID0gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBpZiAoY29udGFpbmVyLmhvcml6b250YWwudmFsdWUgIT09IHdpZHRoKSB7XG4gICAgICAgIGNvbnRhaW5lci5ob3Jpem9udGFsLnZhbHVlID0gd2lkdGhcbiAgICAgICAgY2hhbmdlID0gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBjaGFuZ2UgPT09IHRydWUgJiYgc3RhcnRUaW1lcigpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlU2Nyb2xsICh7IHBvc2l0aW9uIH0pIHtcbiAgICAgIGxldCBjaGFuZ2UgPSBmYWxzZVxuXG4gICAgICBpZiAoc2Nyb2xsLnZlcnRpY2FsLnBvc2l0aW9uLnZhbHVlICE9PSBwb3NpdGlvbi50b3ApIHtcbiAgICAgICAgc2Nyb2xsLnZlcnRpY2FsLnBvc2l0aW9uLnZhbHVlID0gcG9zaXRpb24udG9wXG4gICAgICAgIGNoYW5nZSA9IHRydWVcbiAgICAgIH1cblxuICAgICAgaWYgKHNjcm9sbC5ob3Jpem9udGFsLnBvc2l0aW9uLnZhbHVlICE9PSBwb3NpdGlvbi5sZWZ0KSB7XG4gICAgICAgIHNjcm9sbC5ob3Jpem9udGFsLnBvc2l0aW9uLnZhbHVlID0gcG9zaXRpb24ubGVmdFxuICAgICAgICBjaGFuZ2UgPSB0cnVlXG4gICAgICB9XG5cbiAgICAgIGNoYW5nZSA9PT0gdHJ1ZSAmJiBzdGFydFRpbWVyKClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVTY3JvbGxTaXplICh7IGhlaWdodCwgd2lkdGggfSkge1xuICAgICAgaWYgKHNjcm9sbC5ob3Jpem9udGFsLnNpemUudmFsdWUgIT09IHdpZHRoKSB7XG4gICAgICAgIHNjcm9sbC5ob3Jpem9udGFsLnNpemUudmFsdWUgPSB3aWR0aFxuICAgICAgICBzdGFydFRpbWVyKClcbiAgICAgIH1cblxuICAgICAgaWYgKHNjcm9sbC52ZXJ0aWNhbC5zaXplLnZhbHVlICE9PSBoZWlnaHQpIHtcbiAgICAgICAgc2Nyb2xsLnZlcnRpY2FsLnNpemUudmFsdWUgPSBoZWlnaHRcbiAgICAgICAgc3RhcnRUaW1lcigpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25QYW5UaHVtYiAoZSwgYXhpcykge1xuICAgICAgY29uc3QgZGF0YSA9IHNjcm9sbFsgYXhpcyBdXG5cbiAgICAgIGlmIChlLmlzRmlyc3QgPT09IHRydWUpIHtcbiAgICAgICAgaWYgKGRhdGEudGh1bWJIaWRkZW4udmFsdWUgPT09IHRydWUpIHJldHVyblxuXG4gICAgICAgIHBhblJlZlBvcyA9IGRhdGEucG9zaXRpb24udmFsdWVcbiAgICAgICAgcGFubmluZy52YWx1ZSA9IHRydWVcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHBhbm5pbmcudmFsdWUgIT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChlLmlzRmluYWwgPT09IHRydWUpIHtcbiAgICAgICAgcGFubmluZy52YWx1ZSA9IGZhbHNlXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRQcm9wID0gZGlyUHJvcHNbIGF4aXMgXVxuXG4gICAgICBjb25zdCBtdWx0aXBsaWVyID0gKFxuICAgICAgICAoZGF0YS5zaXplLnZhbHVlIC0gY29udGFpbmVyWyBheGlzIF0udmFsdWUpXG4gICAgICAgIC8gKGNvbnRhaW5lclsgYXhpcyArICdJbm5lcicgXS52YWx1ZSAtIGRhdGEudGh1bWJTaXplLnZhbHVlKVxuICAgICAgKVxuICAgICAgY29uc3QgZGlzdGFuY2UgPSBlLmRpc3RhbmNlWyBkUHJvcC5kaXN0IF1cbiAgICAgIGNvbnN0IHBvcyA9IHBhblJlZlBvcyArIChlLmRpcmVjdGlvbiA9PT0gZFByb3AuZGlyID8gMSA6IC0xKSAqIGRpc3RhbmNlICogbXVsdGlwbGllclxuXG4gICAgICBzZXRTY3JvbGwocG9zLCBheGlzKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTW91c2Vkb3duIChldnQsIGF4aXMpIHtcbiAgICAgIGNvbnN0IGRhdGEgPSBzY3JvbGxbIGF4aXMgXVxuXG4gICAgICBpZiAoZGF0YS50aHVtYkhpZGRlbi52YWx1ZSAhPT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBzdGFydE9mZnNldCA9IGF4aXMgPT09ICd2ZXJ0aWNhbCdcbiAgICAgICAgICA/IHByb3BzLnZlcnRpY2FsT2Zmc2V0WyAwIF1cbiAgICAgICAgICA6IHByb3BzLmhvcml6b250YWxPZmZzZXRbIDAgXVxuXG4gICAgICAgIGNvbnN0IG9mZnNldCA9IGV2dFsgZGlyUHJvcHNbIGF4aXMgXS5vZmZzZXQgXSAtIHN0YXJ0T2Zmc2V0XG4gICAgICAgIGNvbnN0IHRodW1iU3RhcnQgPSBkYXRhLnRodW1iU3RhcnQudmFsdWUgLSBzdGFydE9mZnNldFxuXG4gICAgICAgIGlmIChvZmZzZXQgPCB0aHVtYlN0YXJ0IHx8IG9mZnNldCA+IHRodW1iU3RhcnQgKyBkYXRhLnRodW1iU2l6ZS52YWx1ZSkge1xuICAgICAgICAgIGNvbnN0IHRhcmdldFRodW1iU3RhcnQgPSBvZmZzZXQgLSBkYXRhLnRodW1iU2l6ZS52YWx1ZSAvIDJcbiAgICAgICAgICBjb25zdCBwZXJjZW50YWdlID0gYmV0d2Vlbih0YXJnZXRUaHVtYlN0YXJ0IC8gKGNvbnRhaW5lclsgYXhpcyArICdJbm5lcicgXS52YWx1ZSAtIGRhdGEudGh1bWJTaXplLnZhbHVlKSwgMCwgMSlcbiAgICAgICAgICBzZXRTY3JvbGwocGVyY2VudGFnZSAqIE1hdGgubWF4KDAsIGRhdGEuc2l6ZS52YWx1ZSAtIGNvbnRhaW5lclsgYXhpcyBdLnZhbHVlKSwgYXhpcylcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFjdGl2YXRlIHRodW1iIHBhblxuICAgICAgICBpZiAoZGF0YS5yZWYudmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICBkYXRhLnJlZi52YWx1ZS5kaXNwYXRjaEV2ZW50KG5ldyBNb3VzZUV2ZW50KGV2dC50eXBlLCBldnQpKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3RhcnRUaW1lciAoKSB7XG4gICAgICB0ZW1wU2hvd2luZy52YWx1ZSA9IHRydWVcblxuICAgICAgdGltZXIgIT09IG51bGwgJiYgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGltZXIgPSBudWxsXG4gICAgICAgIHRlbXBTaG93aW5nLnZhbHVlID0gZmFsc2VcbiAgICAgIH0sIHByb3BzLmRlbGF5KVxuXG4gICAgICBwcm9wcy5vblNjcm9sbCAhPT0gdm9pZCAwICYmIGVtaXRTY3JvbGwoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldFNjcm9sbCAob2Zmc2V0LCBheGlzKSB7XG4gICAgICB0YXJnZXRSZWYudmFsdWVbIGRpclByb3BzWyBheGlzIF0uc2Nyb2xsIF0gPSBvZmZzZXRcbiAgICB9XG5cbiAgICBsZXQgbW91c2VFdmVudFRpbWVyID0gbnVsbFxuXG4gICAgZnVuY3Rpb24gb25Nb3VzZWVudGVyICgpIHtcbiAgICAgIGlmIChtb3VzZUV2ZW50VGltZXIgIT09IG51bGwpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KG1vdXNlRXZlbnRUaW1lcilcbiAgICAgIH1cblxuICAgICAgLy8gc2V0VGltZW91dCBuZWVkZWQgZm9yIGlPUzsgc2VlIHRpY2tldCAjMTYyMTBcbiAgICAgIG1vdXNlRXZlbnRUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBtb3VzZUV2ZW50VGltZXIgPSBudWxsXG4gICAgICAgIGhvdmVyLnZhbHVlID0gdHJ1ZVxuICAgICAgfSwgcHJveHkuJHEucGxhdGZvcm0uaXMuaW9zID8gNTAgOiAwKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTW91c2VsZWF2ZSAoKSB7XG4gICAgICBpZiAobW91c2VFdmVudFRpbWVyICE9PSBudWxsKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChtb3VzZUV2ZW50VGltZXIpXG4gICAgICAgIG1vdXNlRXZlbnRUaW1lciA9IG51bGxcbiAgICAgIH1cblxuICAgICAgaG92ZXIudmFsdWUgPSBmYWxzZVxuICAgIH1cblxuICAgIGxldCBzY3JvbGxQb3NpdGlvbiA9IG51bGxcblxuICAgIHdhdGNoKCgpID0+IHByb3h5LiRxLmxhbmcucnRsLCBydGwgPT4ge1xuICAgICAgaWYgKHRhcmdldFJlZi52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICBzZXRIb3Jpem9udGFsU2Nyb2xsUG9zaXRpb24oXG4gICAgICAgICAgdGFyZ2V0UmVmLnZhbHVlLFxuICAgICAgICAgIE1hdGguYWJzKHNjcm9sbC5ob3Jpem9udGFsLnBvc2l0aW9uLnZhbHVlKSAqIChydGwgPT09IHRydWUgPyAtMSA6IDEpXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgb25EZWFjdGl2YXRlZCgoKSA9PiB7XG4gICAgICBzY3JvbGxQb3NpdGlvbiA9IHtcbiAgICAgICAgdG9wOiBzY3JvbGwudmVydGljYWwucG9zaXRpb24udmFsdWUsXG4gICAgICAgIGxlZnQ6IHNjcm9sbC5ob3Jpem9udGFsLnBvc2l0aW9uLnZhbHVlXG4gICAgICB9XG4gICAgfSlcblxuICAgIG9uQWN0aXZhdGVkKCgpID0+IHtcbiAgICAgIGlmIChzY3JvbGxQb3NpdGlvbiA9PT0gbnVsbCkgcmV0dXJuXG5cbiAgICAgIGNvbnN0IHNjcm9sbFRhcmdldCA9IHRhcmdldFJlZi52YWx1ZVxuXG4gICAgICBpZiAoc2Nyb2xsVGFyZ2V0ICE9PSBudWxsKSB7XG4gICAgICAgIHNldEhvcml6b250YWxTY3JvbGxQb3NpdGlvbihzY3JvbGxUYXJnZXQsIHNjcm9sbFBvc2l0aW9uLmxlZnQpXG4gICAgICAgIHNldFZlcnRpY2FsU2Nyb2xsUG9zaXRpb24oc2Nyb2xsVGFyZ2V0LCBzY3JvbGxQb3NpdGlvbi50b3ApXG4gICAgICB9XG4gICAgfSlcblxuICAgIG9uQmVmb3JlVW5tb3VudChlbWl0U2Nyb2xsLmNhbmNlbClcblxuICAgIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kc1xuICAgIE9iamVjdC5hc3NpZ24ocHJveHksIHtcbiAgICAgIGdldFNjcm9sbFRhcmdldDogKCkgPT4gdGFyZ2V0UmVmLnZhbHVlLFxuICAgICAgZ2V0U2Nyb2xsLFxuICAgICAgZ2V0U2Nyb2xsUG9zaXRpb246ICgpID0+ICh7XG4gICAgICAgIHRvcDogc2Nyb2xsLnZlcnRpY2FsLnBvc2l0aW9uLnZhbHVlLFxuICAgICAgICBsZWZ0OiBzY3JvbGwuaG9yaXpvbnRhbC5wb3NpdGlvbi52YWx1ZVxuICAgICAgfSksXG4gICAgICBnZXRTY3JvbGxQZXJjZW50YWdlOiAoKSA9PiAoe1xuICAgICAgICB0b3A6IHNjcm9sbC52ZXJ0aWNhbC5wZXJjZW50YWdlLnZhbHVlLFxuICAgICAgICBsZWZ0OiBzY3JvbGwuaG9yaXpvbnRhbC5wZXJjZW50YWdlLnZhbHVlXG4gICAgICB9KSxcbiAgICAgIHNldFNjcm9sbFBvc2l0aW9uOiBsb2NhbFNldFNjcm9sbFBvc2l0aW9uLFxuICAgICAgc2V0U2Nyb2xsUGVyY2VudGFnZSAoYXhpcywgcGVyY2VudGFnZSwgZHVyYXRpb24pIHtcbiAgICAgICAgbG9jYWxTZXRTY3JvbGxQb3NpdGlvbihcbiAgICAgICAgICBheGlzLFxuICAgICAgICAgIHBlcmNlbnRhZ2VcbiAgICAgICAgICAgICogKHNjcm9sbFsgYXhpcyBdLnNpemUudmFsdWUgLSBjb250YWluZXJbIGF4aXMgXS52YWx1ZSlcbiAgICAgICAgICAgICogKGF4aXMgPT09ICdob3Jpem9udGFsJyAmJiBwcm94eS4kcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/IC0xIDogMSksXG4gICAgICAgICAgZHVyYXRpb25cbiAgICAgICAgKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCBzdG9yZSA9IHtcbiAgICAgIHNjcm9sbCxcblxuICAgICAgdGh1bWJWZXJ0RGlyOiBbIFtcbiAgICAgICAgVG91Y2hQYW4sXG4gICAgICAgIGUgPT4geyBvblBhblRodW1iKGUsICd2ZXJ0aWNhbCcpIH0sXG4gICAgICAgIHZvaWQgMCxcbiAgICAgICAgeyB2ZXJ0aWNhbDogdHJ1ZSwgLi4ucGFuT3B0cyB9XG4gICAgICBdIF0sXG5cbiAgICAgIHRodW1iSG9yaXpEaXI6IFsgW1xuICAgICAgICBUb3VjaFBhbixcbiAgICAgICAgZSA9PiB7IG9uUGFuVGh1bWIoZSwgJ2hvcml6b250YWwnKSB9LFxuICAgICAgICB2b2lkIDAsXG4gICAgICAgIHsgaG9yaXpvbnRhbDogdHJ1ZSwgLi4ucGFuT3B0cyB9XG4gICAgICBdIF0sXG5cbiAgICAgIG9uVmVydGljYWxNb3VzZWRvd24gKGV2dCkge1xuICAgICAgICBvbk1vdXNlZG93bihldnQsICd2ZXJ0aWNhbCcpXG4gICAgICB9LFxuXG4gICAgICBvbkhvcml6b250YWxNb3VzZWRvd24gKGV2dCkge1xuICAgICAgICBvbk1vdXNlZG93bihldnQsICdob3Jpem9udGFsJylcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUsXG4gICAgICAgIG9uTW91c2VlbnRlcixcbiAgICAgICAgb25Nb3VzZWxlYXZlXG4gICAgICB9LCBbXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICByZWY6IHRhcmdldFJlZixcbiAgICAgICAgICBjbGFzczogJ3Etc2Nyb2xsYXJlYV9fY29udGFpbmVyIHNjcm9sbCByZWxhdGl2ZS1wb3NpdGlvbiBmaXQgaGlkZS1zY3JvbGxiYXInLFxuICAgICAgICAgIHRhYmluZGV4OiBwcm9wcy50YWJpbmRleCAhPT0gdm9pZCAwID8gcHJvcHMudGFiaW5kZXggOiB2b2lkIDBcbiAgICAgICAgfSwgW1xuICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgIGNsYXNzOiAncS1zY3JvbGxhcmVhX19jb250ZW50IGFic29sdXRlJyxcbiAgICAgICAgICAgIHN0eWxlOiBtYWluU3R5bGUudmFsdWVcbiAgICAgICAgICB9LCBoTWVyZ2VTbG90KHNsb3RzLmRlZmF1bHQsIFtcbiAgICAgICAgICAgIGgoUVJlc2l6ZU9ic2VydmVyLCB7XG4gICAgICAgICAgICAgIGRlYm91bmNlOiAwLFxuICAgICAgICAgICAgICBvblJlc2l6ZTogdXBkYXRlU2Nyb2xsU2l6ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdKSksXG5cbiAgICAgICAgICBoKFFTY3JvbGxPYnNlcnZlciwge1xuICAgICAgICAgICAgYXhpczogJ2JvdGgnLFxuICAgICAgICAgICAgb25TY3JvbGw6IHVwZGF0ZVNjcm9sbFxuICAgICAgICAgIH0pXG4gICAgICAgIF0pLFxuXG4gICAgICAgIGgoUVJlc2l6ZU9ic2VydmVyLCB7XG4gICAgICAgICAgZGVib3VuY2U6IDAsXG4gICAgICAgICAgb25SZXNpemU6IHVwZGF0ZUNvbnRhaW5lclxuICAgICAgICB9KSxcblxuICAgICAgICBoKFNjcm9sbEFyZWFDb250cm9scywge1xuICAgICAgICAgIHN0b3JlLFxuICAgICAgICAgIGJhclN0eWxlOiBwcm9wcy5iYXJTdHlsZSxcbiAgICAgICAgICB2ZXJ0aWNhbEJhclN0eWxlOiBwcm9wcy52ZXJ0aWNhbEJhclN0eWxlLFxuICAgICAgICAgIGhvcml6b250YWxCYXJTdHlsZTogcHJvcHMuaG9yaXpvbnRhbEJhclN0eWxlXG4gICAgICAgIH0pXG4gICAgICBdKVxuICAgIH1cbiAgfVxufSlcbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cImRyYXdlci1jb250ZW50XCI+XG4gICAgPCEtLSBQcm9ncmVzcyBPdmVydmlldyAtLT5cbiAgICA8ZGl2IGNsYXNzPVwiZHJhd2VyLXNlY3Rpb25cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLXRpdGxlXCI+V2Vla2x5IFByb2dyZXNzPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJwcm9ncmVzcy1vdmVydmlldyBxLW1iLW1kXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyIHEtZ3V0dGVyLW1kXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1hdXRvXCI+XG4gICAgICAgICAgICA8cS1jaXJjdWxhci1wcm9ncmVzc1xuICAgICAgICAgICAgICA6dmFsdWU9XCJzY2hlZHVsZVN0b3JlLmNvbXBsZXRpb25QZXJjZW50YWdlXCJcbiAgICAgICAgICAgICAgc2l6ZT1cIjgwcHhcIlxuICAgICAgICAgICAgICA6dGhpY2tuZXNzPVwiMC4xNVwiXG4gICAgICAgICAgICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgICAgICAgICAgIHRyYWNrLWNvbG9yPVwiZ3JleS0zXCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJwcm9ncmVzcy1jaXJjbGVcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZ3Jlc3MtdGV4dCB0ZXh0LXByaW1hcnlcIj5cbiAgICAgICAgICAgICAgICB7eyBzY2hlZHVsZVN0b3JlLmNvbXBsZXRpb25QZXJjZW50YWdlIH19JVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvcS1jaXJjdWxhci1wcm9ncmVzcz5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2xcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2XCI+XG4gICAgICAgICAgICAgIHt7IHNjaGVkdWxlU3RvcmUuY29tcGxldGVkWm9uZXMgfX0ve3sgc2NoZWR1bGVTdG9yZS50b3RhbFpvbmVzIH19XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWNhcHRpb24gdGV4dC1ncmV5XCI+Wm9uZXMgQ29tcGxldGVkPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDwhLS0gUXVpY2sgU3RhdHMgLS0+XG4gICAgICA8ZGl2IGNsYXNzPVwicm93IHEtZ3V0dGVyLXhzXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2xcIj5cbiAgICAgICAgICA8cS1jYXJkIGZsYXQgYm9yZGVyZWQgY2xhc3M9XCJzdGF0LWNhcmRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LW51bWJlciB0ZXh0LXBvc2l0aXZlXCI+e3sgdG9kYXlDb21wbGV0ZWRDb3VudCB9fTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtbGFiZWxcIj5Ub2RheTwvZGl2PlxuICAgICAgICAgIDwvcS1jYXJkPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbFwiPlxuICAgICAgICAgIDxxLWNhcmQgZmxhdCBib3JkZXJlZCBjbGFzcz1cInN0YXQtY2FyZFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtbnVtYmVyIHRleHQtaW5mb1wiPnt7IHRvZGF5VG90YWxDb3VudCB9fTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtbGFiZWxcIj5TY2hlZHVsZWQ8L2Rpdj5cbiAgICAgICAgICA8L3EtY2FyZD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDwhLS0gRGFpbHkgUHJvZ3Jlc3MgLS0+XG4gICAgPGRpdiBjbGFzcz1cImRyYXdlci1zZWN0aW9uXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi10aXRsZVwiPkRhaWx5IEJyZWFrZG93bjwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzPVwiZGFpbHktcHJvZ3Jlc3MgcS1ndXR0ZXItc21cIj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIHYtZm9yPVwiKGRheSwgZGF5TmFtZSkgaW4gc2NoZWR1bGVTdG9yZS5vdmVyYWxsUHJvZ3Jlc3NcIlxuICAgICAgICAgIDprZXk9XCJkYXlOYW1lXCJcbiAgICAgICAgICBjbGFzcz1cImRheS1wcm9ncmVzcy1pdGVtXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBxLW1iLXhzXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtd2VpZ2h0LW1lZGl1bVwiIDpjbGFzcz1cImBzY2hlZHVsZS0ke2RheU5hbWUudG9Mb3dlckNhc2UoKX1gXCI+XG4gICAgICAgICAgICAgIHt7IGRheU5hbWUgfX1cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1jYXB0aW9uXCI+e3sgZGF5LmNvbXBsZXRlZCB9fS97eyBkYXkudG90YWwgfX08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8cS1saW5lYXItcHJvZ3Jlc3NcbiAgICAgICAgICAgIDp2YWx1ZT1cImRheS5wZXJjZW50YWdlIC8gMTAwXCJcbiAgICAgICAgICAgIHNpemU9XCI4cHhcIlxuICAgICAgICAgICAgOmNvbG9yPVwiZ2V0RGF5Q29sb3IoZGF5TmFtZSlcIlxuICAgICAgICAgICAgdHJhY2stY29sb3I9XCJncmV5LTNcIlxuICAgICAgICAgICAgY2xhc3M9XCJxLW1iLXNtXCJcbiAgICAgICAgICAvPlxuXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImRheS1hY3Rpb25zIHJvdyBxLWd1dHRlci14c1wiIHYtaWY9XCJkYXkudG90YWwgPiAwXCI+XG4gICAgICAgICAgICA8cS1idG5cbiAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgc2l6ZT1cInhzXCJcbiAgICAgICAgICAgICAgb3V0bGluZVxuICAgICAgICAgICAgICA6Y29sb3I9XCJnZXREYXlDb2xvcihkYXlOYW1lKVwiXG4gICAgICAgICAgICAgIGljb249XCJjaGVja19jaXJjbGVcIlxuICAgICAgICAgICAgICBAY2xpY2s9XCJtYXJrQWxsRGF5KGRheU5hbWUsIHRydWUpXCJcbiAgICAgICAgICAgICAgOmRpc2FibGU9XCJkYXkuY29tcGxldGVkID09PSBkYXkudG90YWxcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8cS10b29sdGlwPk1hcmsgYWxsIHt7IGRheU5hbWUgfX0gem9uZXMgY29tcGxldGU8L3EtdG9vbHRpcD5cbiAgICAgICAgICAgIDwvcS1idG4+XG4gICAgICAgICAgICA8cS1idG5cbiAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgc2l6ZT1cInhzXCJcbiAgICAgICAgICAgICAgb3V0bGluZVxuICAgICAgICAgICAgICBjb2xvcj1cImdyZXlcIlxuICAgICAgICAgICAgICBpY29uPVwicmFkaW9fYnV0dG9uX3VuY2hlY2tlZFwiXG4gICAgICAgICAgICAgIEBjbGljaz1cIm1hcmtBbGxEYXkoZGF5TmFtZSwgZmFsc2UpXCJcbiAgICAgICAgICAgICAgOmRpc2FibGU9XCJkYXkuY29tcGxldGVkID09PSAwXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHEtdG9vbHRpcD5NYXJrIGFsbCB7eyBkYXlOYW1lIH19IHpvbmVzIGluY29tcGxldGU8L3EtdG9vbHRpcD5cbiAgICAgICAgICAgIDwvcS1idG4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8IS0tIEZpbHRlcnMgLS0+XG4gICAgPGRpdiBjbGFzcz1cImRyYXdlci1zZWN0aW9uXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi10aXRsZVwiPlxuICAgICAgICBGaWx0ZXJzXG4gICAgICAgIDxxLWNoaXBcbiAgICAgICAgICB2LWlmPVwiaGFzQWN0aXZlRmlsdGVyc1wiXG4gICAgICAgICAgc2l6ZT1cInNtXCJcbiAgICAgICAgICBjb2xvcj1cInByaW1hcnlcIlxuICAgICAgICAgIHRleHQtY29sb3I9XCJ3aGl0ZVwiXG4gICAgICAgICAgY2xhc3M9XCJxLW1sLXNtXCJcbiAgICAgICAgPlxuICAgICAgICAgIEFjdGl2ZVxuICAgICAgICA8L3EtY2hpcD5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8IS0tIEFjdGl2ZSBGaWx0ZXJzIERpc3BsYXkgLS0+XG4gICAgICA8ZGl2IHYtaWY9XCJoYXNBY3RpdmVGaWx0ZXJzXCIgY2xhc3M9XCJhY3RpdmUtZmlsdGVycyBxLW1iLW1kXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWNhcHRpb24gdGV4dC1ncmV5IHEtbWIteHNcIj5BY3RpdmUgZmlsdGVyczo8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInEtZ3V0dGVyLXhzXCI+XG4gICAgICAgICAgPHEtY2hpcFxuICAgICAgICAgICAgdi1pZj1cImZpbHRlcnMuZGF5XCJcbiAgICAgICAgICAgIHJlbW92YWJsZVxuICAgICAgICAgICAgQHJlbW92ZT1cInVwZGF0ZUZpbHRlcignZGF5JywgbnVsbClcIlxuICAgICAgICAgICAgc2l6ZT1cInNtXCJcbiAgICAgICAgICAgIGNvbG9yPVwiYmx1ZVwiXG4gICAgICAgICAgICB0ZXh0LWNvbG9yPVwid2hpdGVcIlxuICAgICAgICAgICAgaWNvbj1cImV2ZW50XCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7eyBmaWx0ZXJzLmRheSB9fVxuICAgICAgICAgIDwvcS1jaGlwPlxuXG4gICAgICAgICAgPHEtY2hpcFxuICAgICAgICAgICAgdi1pZj1cImZpbHRlcnMuY29tcGxldGVkICE9PSBudWxsXCJcbiAgICAgICAgICAgIHJlbW92YWJsZVxuICAgICAgICAgICAgQHJlbW92ZT1cInVwZGF0ZUZpbHRlcignY29tcGxldGVkJywgbnVsbClcIlxuICAgICAgICAgICAgc2l6ZT1cInNtXCJcbiAgICAgICAgICAgIDpjb2xvcj1cImZpbHRlcnMuY29tcGxldGVkID8gJ3Bvc2l0aXZlJyA6ICdvcmFuZ2UnXCJcbiAgICAgICAgICAgIHRleHQtY29sb3I9XCJ3aGl0ZVwiXG4gICAgICAgICAgICA6aWNvbj1cImZpbHRlcnMuY29tcGxldGVkID8gJ2NoZWNrX2NpcmNsZScgOiAnc2NoZWR1bGUnXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7eyBmaWx0ZXJzLmNvbXBsZXRlZCA/ICdDb21wbGV0ZWQnIDogJ0luY29tcGxldGUnIH19XG4gICAgICAgICAgPC9xLWNoaXA+XG5cbiAgICAgICAgICA8cS1jaGlwXG4gICAgICAgICAgICB2LWlmPVwiZmlsdGVycy5wcmlvcml0eVwiXG4gICAgICAgICAgICByZW1vdmFibGVcbiAgICAgICAgICAgIEByZW1vdmU9XCJ1cGRhdGVGaWx0ZXIoJ3ByaW9yaXR5JywgbnVsbClcIlxuICAgICAgICAgICAgc2l6ZT1cInNtXCJcbiAgICAgICAgICAgIGNvbG9yPVwicHVycGxlXCJcbiAgICAgICAgICAgIHRleHQtY29sb3I9XCJ3aGl0ZVwiXG4gICAgICAgICAgICBpY29uPVwiZmxhZ1wiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge3sgZmlsdGVycy5wcmlvcml0eSB9fSBwcmlvcml0eVxuICAgICAgICAgIDwvcS1jaGlwPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzPVwiZmlsdGVyLWNvbnRyb2xzIHEtZ3V0dGVyLW1kXCI+XG4gICAgICAgIDwhLS0gRGF5IGZpbHRlciAtLT5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJ0ZXh0LWNhcHRpb24gdGV4dC1ncmV5IHEtbWIteHMgYmxvY2tcIj5TY2hlZHVsZWQgRGF5PC9sYWJlbD5cbiAgICAgICAgICA8cS1zZWxlY3RcbiAgICAgICAgICAgIHYtbW9kZWw9XCJmaWx0ZXJzLmRheVwiXG4gICAgICAgICAgICA6b3B0aW9ucz1cImRheU9wdGlvbnNcIlxuICAgICAgICAgICAgY2xlYXJhYmxlXG4gICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgIGVtaXQtdmFsdWVcbiAgICAgICAgICAgIG1hcC1vcHRpb25zXG4gICAgICAgICAgICBAdXBkYXRlOm1vZGVsLXZhbHVlPVwidXBkYXRlRmlsdGVyKCdkYXknLCAkZXZlbnQpXCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8IS0tIENvbXBsZXRpb24gZmlsdGVyIC0tPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxsYWJlbCBjbGFzcz1cInRleHQtY2FwdGlvbiB0ZXh0LWdyZXkgcS1tYi14cyBibG9ja1wiPlN0YXR1czwvbGFiZWw+XG4gICAgICAgICAgPHEtc2VsZWN0XG4gICAgICAgICAgICB2LW1vZGVsPVwiZmlsdGVycy5jb21wbGV0ZWRcIlxuICAgICAgICAgICAgOm9wdGlvbnM9XCJzdGF0dXNPcHRpb25zXCJcbiAgICAgICAgICAgIGNsZWFyYWJsZVxuICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICBlbWl0LXZhbHVlXG4gICAgICAgICAgICBtYXAtb3B0aW9uc1xuICAgICAgICAgICAgQHVwZGF0ZTptb2RlbC12YWx1ZT1cInVwZGF0ZUZpbHRlcignY29tcGxldGVkJywgJGV2ZW50KVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPCEtLSBQcmlvcml0eSBmaWx0ZXIgLS0+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGxhYmVsIGNsYXNzPVwidGV4dC1jYXB0aW9uIHRleHQtZ3JleSBxLW1iLXhzIGJsb2NrXCI+UHJpb3JpdHk8L2xhYmVsPlxuICAgICAgICAgIDxxLXNlbGVjdFxuICAgICAgICAgICAgdi1tb2RlbD1cImZpbHRlcnMucHJpb3JpdHlcIlxuICAgICAgICAgICAgOm9wdGlvbnM9XCJwcmlvcml0eU9wdGlvbnNcIlxuICAgICAgICAgICAgY2xlYXJhYmxlXG4gICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgIGVtaXQtdmFsdWVcbiAgICAgICAgICAgIG1hcC1vcHRpb25zXG4gICAgICAgICAgICBAdXBkYXRlOm1vZGVsLXZhbHVlPVwidXBkYXRlRmlsdGVyKCdwcmlvcml0eScsICRldmVudClcIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwhLS0gQ2xlYXIgZmlsdGVycyAtLT5cbiAgICAgICAgPHEtYnRuXG4gICAgICAgICAgZmxhdFxuICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgY29sb3I9XCJncmV5XCJcbiAgICAgICAgICBpY29uPVwiY2xlYXJfYWxsXCJcbiAgICAgICAgICBsYWJlbD1cIkNsZWFyIEZpbHRlcnNcIlxuICAgICAgICAgIEBjbGljaz1cImNsZWFyQWxsRmlsdGVyc1wiXG4gICAgICAgICAgOmRpc2FibGU9XCIhaGFzQWN0aXZlRmlsdGVyc1wiXG4gICAgICAgICAgY2xhc3M9XCJmdWxsLXdpZHRoXCJcbiAgICAgICAgLz5cblxuICAgICAgICA8IS0tIFF1aWNrIEZpbHRlciBCdXR0b25zIC0tPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicXVpY2stZmlsdGVycyBxLW10LW1kXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtY2FwdGlvbiB0ZXh0LWdyZXkgcS1tYi14c1wiPlF1aWNrIGZpbHRlcnM6PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBxLWd1dHRlci14c1wiPlxuICAgICAgICAgICAgPHEtYnRuXG4gICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgIHNpemU9XCJzbVwiXG4gICAgICAgICAgICAgIGNvbG9yPVwiYmx1ZVwiXG4gICAgICAgICAgICAgIGxhYmVsPVwiTW9uZGF5XCJcbiAgICAgICAgICAgICAgQGNsaWNrPVwidXBkYXRlRmlsdGVyKCdkYXknLCAnTW9uZGF5JylcIlxuICAgICAgICAgICAgICA6b3V0bGluZT1cImZpbHRlcnMuZGF5ICE9PSAnTW9uZGF5J1wiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPHEtYnRuXG4gICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgIHNpemU9XCJzbVwiXG4gICAgICAgICAgICAgIGNvbG9yPVwiZ3JlZW5cIlxuICAgICAgICAgICAgICBsYWJlbD1cIlR1ZXNkYXlcIlxuICAgICAgICAgICAgICBAY2xpY2s9XCJ1cGRhdGVGaWx0ZXIoJ2RheScsICdUdWVzZGF5JylcIlxuICAgICAgICAgICAgICA6b3V0bGluZT1cImZpbHRlcnMuZGF5ICE9PSAnVHVlc2RheSdcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICBzaXplPVwic21cIlxuICAgICAgICAgICAgICBjb2xvcj1cIm9yYW5nZVwiXG4gICAgICAgICAgICAgIGxhYmVsPVwiV2VkbmVzZGF5XCJcbiAgICAgICAgICAgICAgQGNsaWNrPVwidXBkYXRlRmlsdGVyKCdkYXknLCAnV2VkbmVzZGF5JylcIlxuICAgICAgICAgICAgICA6b3V0bGluZT1cImZpbHRlcnMuZGF5ICE9PSAnV2VkbmVzZGF5J1wiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgcS1ndXR0ZXIteHMgcS1tdC14c1wiPlxuICAgICAgICAgICAgPHEtYnRuXG4gICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgIHNpemU9XCJzbVwiXG4gICAgICAgICAgICAgIGNvbG9yPVwicHVycGxlXCJcbiAgICAgICAgICAgICAgbGFiZWw9XCJUaHVyc2RheVwiXG4gICAgICAgICAgICAgIEBjbGljaz1cInVwZGF0ZUZpbHRlcignZGF5JywgJ1RodXJzZGF5JylcIlxuICAgICAgICAgICAgICA6b3V0bGluZT1cImZpbHRlcnMuZGF5ICE9PSAnVGh1cnNkYXknXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8cS1idG5cbiAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgc2l6ZT1cInNtXCJcbiAgICAgICAgICAgICAgY29sb3I9XCJpbmRpZ29cIlxuICAgICAgICAgICAgICBsYWJlbD1cIkZyaWRheVwiXG4gICAgICAgICAgICAgIEBjbGljaz1cInVwZGF0ZUZpbHRlcignZGF5JywgJ0ZyaWRheScpXCJcbiAgICAgICAgICAgICAgOm91dGxpbmU9XCJmaWx0ZXJzLmRheSAhPT0gJ0ZyaWRheSdcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICBzaXplPVwic21cIlxuICAgICAgICAgICAgICBjb2xvcj1cInBvc2l0aXZlXCJcbiAgICAgICAgICAgICAgbGFiZWw9XCJEb25lXCJcbiAgICAgICAgICAgICAgQGNsaWNrPVwidXBkYXRlRmlsdGVyKCdjb21wbGV0ZWQnLCB0cnVlKVwiXG4gICAgICAgICAgICAgIDpvdXRsaW5lPVwiZmlsdGVycy5jb21wbGV0ZWQgIT09IHRydWVcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDwhLS0gWm9uZSBMaXN0IC0tPlxuICAgIDxkaXYgY2xhc3M9XCJkcmF3ZXItc2VjdGlvblwiPlxuICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tdGl0bGVcIj5cbiAgICAgICAgWm9uZXNcbiAgICAgICAgPHEtY2hpcCBzaXplPVwic21cIiBjb2xvcj1cImdyZXktNFwiIHRleHQtY29sb3I9XCJncmV5LThcIj5cbiAgICAgICAgICB7eyBzY2hlZHVsZVN0b3JlLmZpbHRlcmVkWm9uZXMubGVuZ3RoIH19XG4gICAgICAgIDwvcS1jaGlwPlxuICAgICAgICA8c3BhbiB2LWlmPVwiaGFzQWN0aXZlRmlsdGVyc1wiIGNsYXNzPVwidGV4dC1jYXB0aW9uIHRleHQtZ3JleSBxLW1sLXNtXCI+XG4gICAgICAgICAgb2Yge3sgc2NoZWR1bGVTdG9yZS50b3RhbFpvbmVzIH19IHRvdGFsXG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8cS1zY3JvbGwtYXJlYSBzdHlsZT1cImhlaWdodDogMzAwcHhcIiBjbGFzcz1cInpvbmUtbGlzdFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicS1ndXR0ZXIteHNcIj5cbiAgICAgICAgICA8cS1jYXJkXG4gICAgICAgICAgICB2LWZvcj1cInpvbmUgaW4gc2NoZWR1bGVTdG9yZS5maWx0ZXJlZFpvbmVzXCJcbiAgICAgICAgICAgIDprZXk9XCJ6b25lLmlkXCJcbiAgICAgICAgICAgIGZsYXRcbiAgICAgICAgICAgIGJvcmRlcmVkXG4gICAgICAgICAgICBjbGFzcz1cInpvbmUtY2FyZCBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICBAY2xpY2s9XCJzZWxlY3Rab25lKHpvbmUpXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8cS1jYXJkLXNlY3Rpb24gZGVuc2UgY2xhc3M9XCJxLXBhLXNtXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyIHEtZ3V0dGVyLXhzXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInpvbmUtc3RhdHVzLWluZGljYXRvclwiIDpjbGFzcz1cImdldFN0YXR1c0NsYXNzKHpvbmUpXCI+PC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1ib2R5MiB0ZXh0LXdlaWdodC1tZWRpdW0gZWxsaXBzaXNcIj5cbiAgICAgICAgICAgICAgICAgICAge3sgem9uZS5uYW1lIH19XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWNhcHRpb24gdGV4dC1ncmV5XCI+XG4gICAgICAgICAgICAgICAgICAgIHt7IHpvbmUuc2NoZWR1bGVkRGF5IH19IOKAoiB7eyB6b25lLnByaW9yaXR5IH19IHByaW9yaXR5XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICAgIHJvdW5kXG4gICAgICAgICAgICAgICAgICBmbGF0XG4gICAgICAgICAgICAgICAgICBzaXplPVwic21cIlxuICAgICAgICAgICAgICAgICAgOmljb249XCJ6b25lLmNvbXBsZXRlZCA/ICdjaGVja19jaXJjbGUnIDogJ3JhZGlvX2J1dHRvbl91bmNoZWNrZWQnXCJcbiAgICAgICAgICAgICAgICAgIDpjb2xvcj1cInpvbmUuY29tcGxldGVkID8gJ3Bvc2l0aXZlJyA6ICdncmV5J1wiXG4gICAgICAgICAgICAgICAgICBAY2xpY2suc3RvcD1cInRvZ2dsZVpvbmVTdGF0dXMoem9uZSlcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICA8L3EtY2FyZD5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiB2LWlmPVwic2NoZWR1bGVTdG9yZS5maWx0ZXJlZFpvbmVzLmxlbmd0aCA9PT0gMFwiIGNsYXNzPVwidGV4dC1jZW50ZXIgcS1wYS1tZCB0ZXh0LWdyZXlcIj5cbiAgICAgICAgICA8cS1pY29uIG5hbWU9XCJzZWFyY2hfb2ZmXCIgc2l6ZT1cIjNyZW1cIiBjbGFzcz1cInEtbWItbWRcIiAvPlxuICAgICAgICAgIDxkaXY+Tm8gem9uZXMgbWF0Y2ggY3VycmVudCBmaWx0ZXJzPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9xLXNjcm9sbC1hcmVhPlxuICAgIDwvZGl2PlxuXG4gICAgPCEtLSBMZWdlbmQgLS0+XG4gICAgPGRpdiBjbGFzcz1cImRyYXdlci1zZWN0aW9uXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi10aXRsZVwiPkxlZ2VuZDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzPVwibGVnZW5kIHEtZ3V0dGVyLXhzXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsZWdlbmQtaXRlbVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJsZWdlbmQtY29sb3IgYmctc2NoZWR1bGUtbW9uZGF5XCI+PC9kaXY+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJsZWdlbmQtbGFiZWxcIj5Nb25kYXk8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwibGVnZW5kLWl0ZW1cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibGVnZW5kLWNvbG9yIGJnLXNjaGVkdWxlLXR1ZXNkYXlcIj48L2Rpdj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImxlZ2VuZC1sYWJlbFwiPlR1ZXNkYXk8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwibGVnZW5kLWl0ZW1cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibGVnZW5kLWNvbG9yIGJnLXNjaGVkdWxlLXdlZG5lc2RheVwiPjwvZGl2PlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwibGVnZW5kLWxhYmVsXCI+V2VkbmVzZGF5PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImxlZ2VuZC1pdGVtXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImxlZ2VuZC1jb2xvciBiZy1zY2hlZHVsZS10aHVyc2RheVwiPjwvZGl2PlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwibGVnZW5kLWxhYmVsXCI+VGh1cnNkYXk8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwibGVnZW5kLWl0ZW1cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibGVnZW5kLWNvbG9yIGJnLXNjaGVkdWxlLWZyaWRheVwiPjwvZGl2PlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwibGVnZW5kLWxhYmVsXCI+RnJpZGF5PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImxlZ2VuZC1pdGVtXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImxlZ2VuZC1jb2xvciBiZy1zY2hlZHVsZS1pbmNvbXBsZXRlXCI+PC9kaXY+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJsZWdlbmQtbGFiZWxcIj5JbmNvbXBsZXRlPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPCEtLSBRdWljayBBY3Rpb25zIC0tPlxuICAgIDxkaXYgY2xhc3M9XCJkcmF3ZXItc2VjdGlvblwiPlxuICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tdGl0bGVcIj5RdWljayBBY3Rpb25zPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJxLWd1dHRlci1zbVwiPlxuICAgICAgICA8cS1idG5cbiAgICAgICAgICBvdXRsaW5lXG4gICAgICAgICAgY29sb3I9XCJwb3NpdGl2ZVwiXG4gICAgICAgICAgaWNvbj1cImNoZWNrX2NpcmNsZV9vdXRsaW5lXCJcbiAgICAgICAgICBsYWJlbD1cIk1hcmsgQWxsIENvbXBsZXRlXCJcbiAgICAgICAgICBAY2xpY2s9XCJjb25maXJtTWFya0FsbENvbXBsZXRlXCJcbiAgICAgICAgICBjbGFzcz1cImZ1bGwtd2lkdGhcIlxuICAgICAgICAgIHNpemU9XCJzbVwiXG4gICAgICAgIC8+XG5cbiAgICAgICAgPHEtYnRuXG4gICAgICAgICAgb3V0bGluZVxuICAgICAgICAgIGNvbG9yPVwid2FybmluZ1wiXG4gICAgICAgICAgaWNvbj1cInJlZnJlc2hcIlxuICAgICAgICAgIGxhYmVsPVwiUmVzZXQgV2Vla1wiXG4gICAgICAgICAgQGNsaWNrPVwiY29uZmlybVJlc2V0V2Vla1wiXG4gICAgICAgICAgY2xhc3M9XCJmdWxsLXdpZHRoXCJcbiAgICAgICAgICBzaXplPVwic21cIlxuICAgICAgICAvPlxuXG4gICAgICAgIDxxLWJ0blxuICAgICAgICAgIG91dGxpbmVcbiAgICAgICAgICBjb2xvcj1cInByaW1hcnlcIlxuICAgICAgICAgIGljb249XCJhZGRfbG9jYXRpb25cIlxuICAgICAgICAgIGxhYmVsPVwiQWRkIE5ldyBab25lXCJcbiAgICAgICAgICBAY2xpY2s9XCJzaG93QWRkWm9uZVwiXG4gICAgICAgICAgY2xhc3M9XCJmdWxsLXdpZHRoXCJcbiAgICAgICAgICBzaXplPVwic21cIlxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgY29tcHV0ZWQsIG9uTW91bnRlZCB9IGZyb20gJ3Z1ZSdcbmltcG9ydCB7IHVzZVF1YXNhciB9IGZyb20gJ3F1YXNhcidcbmltcG9ydCB7IHVzZVNjaGVkdWxlU3RvcmUgfSBmcm9tICcuLi9zdG9yZXMvc2NoZWR1bGUtc3RvcmUuanMnXG5cbmNvbnN0ICRxID0gdXNlUXVhc2FyKClcbmNvbnN0IHNjaGVkdWxlU3RvcmUgPSB1c2VTY2hlZHVsZVN0b3JlKClcblxuLy8gU2V0IHVwIG5vdGlmaWNhdGlvbnMgZm9yIHRoZSBzdG9yZVxub25Nb3VudGVkKCgpID0+IHtcbiAgc2NoZWR1bGVTdG9yZS5zZXROb3RpZnlGdW5jdGlvbigkcS5ub3RpZnkpXG59KVxuXG4vLyBMb2NhbCByZWFjdGl2ZSBzdGF0ZVxuY29uc3QgZmlsdGVycyA9IHJlZih7XG4gIGRheTogbnVsbCxcbiAgY29tcGxldGVkOiBudWxsLFxuICBwcmlvcml0eTogbnVsbCxcbn0pXG5cbi8vIEZpbHRlciBvcHRpb25zXG5jb25zdCBkYXlPcHRpb25zID0gW1xuICB7IGxhYmVsOiAnTW9uZGF5JywgdmFsdWU6ICdNb25kYXknIH0sXG4gIHsgbGFiZWw6ICdUdWVzZGF5JywgdmFsdWU6ICdUdWVzZGF5JyB9LFxuICB7IGxhYmVsOiAnV2VkbmVzZGF5JywgdmFsdWU6ICdXZWRuZXNkYXknIH0sXG4gIHsgbGFiZWw6ICdUaHVyc2RheScsIHZhbHVlOiAnVGh1cnNkYXknIH0sXG4gIHsgbGFiZWw6ICdGcmlkYXknLCB2YWx1ZTogJ0ZyaWRheScgfSxcbl1cblxuY29uc3Qgc3RhdHVzT3B0aW9ucyA9IFtcbiAgeyBsYWJlbDogJ0NvbXBsZXRlZCcsIHZhbHVlOiB0cnVlIH0sXG4gIHsgbGFiZWw6ICdJbmNvbXBsZXRlJywgdmFsdWU6IGZhbHNlIH0sXG5dXG5cbmNvbnN0IHByaW9yaXR5T3B0aW9ucyA9IFtcbiAgeyBsYWJlbDogJ0hpZ2ggUHJpb3JpdHknLCB2YWx1ZTogJ2hpZ2gnIH0sXG4gIHsgbGFiZWw6ICdNZWRpdW0gUHJpb3JpdHknLCB2YWx1ZTogJ21lZGl1bScgfSxcbiAgeyBsYWJlbDogJ0xvdyBQcmlvcml0eScsIHZhbHVlOiAnbG93JyB9LFxuXVxuXG4vLyBDb21wdXRlZCBwcm9wZXJ0aWVzXG5jb25zdCB0b2RheUNvbXBsZXRlZENvdW50ID0gY29tcHV0ZWQoKCkgPT4ge1xuICByZXR1cm4gc2NoZWR1bGVTdG9yZS50b2RheVNjaGVkdWxlZFpvbmVzLmZpbHRlcigoem9uZSkgPT4gem9uZS5jb21wbGV0ZWQpLmxlbmd0aFxufSlcblxuY29uc3QgdG9kYXlUb3RhbENvdW50ID0gY29tcHV0ZWQoKCkgPT4ge1xuICByZXR1cm4gc2NoZWR1bGVTdG9yZS50b2RheVNjaGVkdWxlZFpvbmVzLmxlbmd0aFxufSlcblxuY29uc3QgaGFzQWN0aXZlRmlsdGVycyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgcmV0dXJuIGZpbHRlcnMudmFsdWUuZGF5IHx8IGZpbHRlcnMudmFsdWUuY29tcGxldGVkICE9PSBudWxsIHx8IGZpbHRlcnMudmFsdWUucHJpb3JpdHlcbn0pXG5cbi8vIE1ldGhvZHNcbmNvbnN0IGdldERheUNvbG9yID0gKGRheU5hbWUpID0+IHtcbiAgY29uc3QgY29sb3JzID0ge1xuICAgIE1vbmRheTogJ3NjaGVkdWxlLW1vbmRheScsXG4gICAgVHVlc2RheTogJ3NjaGVkdWxlLXR1ZXNkYXknLFxuICAgIFdlZG5lc2RheTogJ3NjaGVkdWxlLXdlZG5lc2RheScsXG4gICAgVGh1cnNkYXk6ICdzY2hlZHVsZS10aHVyc2RheScsXG4gICAgRnJpZGF5OiAnc2NoZWR1bGUtZnJpZGF5JywgLy8gV2lsbCB1c2UgcGluayBmcm9tIENTU1xuICB9XG4gIHJldHVybiBjb2xvcnNbZGF5TmFtZV0gfHwgJ2dyZXknXG59XG5cbmNvbnN0IGdldFN0YXR1c0NsYXNzID0gKHpvbmUpID0+IHtcbiAgaWYgKHpvbmUuY29tcGxldGVkKSB7XG4gICAgcmV0dXJuIGBiZy0ke2dldERheUNvbG9yKHpvbmUuc2NoZWR1bGVkRGF5KX1gXG4gIH1cbiAgcmV0dXJuICdiZy1zY2hlZHVsZS1pbmNvbXBsZXRlJ1xufVxuXG5jb25zdCB1cGRhdGVGaWx0ZXIgPSAoZmlsdGVyVHlwZSwgdmFsdWUpID0+IHtcbiAgZmlsdGVycy52YWx1ZVtmaWx0ZXJUeXBlXSA9IHZhbHVlXG4gIHNjaGVkdWxlU3RvcmUuc2V0RmlsdGVyKGZpbHRlclR5cGUsIHZhbHVlKVxuXG4gIC8vIFNob3cgbm90aWZpY2F0aW9uIGFib3V0IGZpbHRlciBjaGFuZ2VcbiAgaWYgKHZhbHVlKSB7XG4gICAgbGV0IG1lc3NhZ2UgPSAnJ1xuICAgIGlmIChmaWx0ZXJUeXBlID09PSAnZGF5Jykge1xuICAgICAgbWVzc2FnZSA9IGBTaG93aW5nICR7dmFsdWV9IHpvbmVzYFxuICAgIH0gZWxzZSBpZiAoZmlsdGVyVHlwZSA9PT0gJ2NvbXBsZXRlZCcpIHtcbiAgICAgIG1lc3NhZ2UgPSBgU2hvd2luZyAke3ZhbHVlID8gJ2NvbXBsZXRlZCcgOiAnaW5jb21wbGV0ZSd9IHpvbmVzYFxuICAgIH0gZWxzZSBpZiAoZmlsdGVyVHlwZSA9PT0gJ3ByaW9yaXR5Jykge1xuICAgICAgbWVzc2FnZSA9IGBTaG93aW5nICR7dmFsdWV9IHByaW9yaXR5IHpvbmVzYFxuICAgIH1cblxuICAgIGlmICgkcS5ub3RpZnkgJiYgbWVzc2FnZSkge1xuICAgICAgJHEubm90aWZ5KHtcbiAgICAgICAgdHlwZTogJ2luZm8nLFxuICAgICAgICBtZXNzYWdlLFxuICAgICAgICBpY29uOiAnZmlsdGVyX2xpc3QnLFxuICAgICAgICB0aW1lb3V0OiAyMDAwLFxuICAgICAgfSlcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgY2xlYXJBbGxGaWx0ZXJzID0gKCkgPT4ge1xuICBmaWx0ZXJzLnZhbHVlID0ge1xuICAgIGRheTogbnVsbCxcbiAgICBjb21wbGV0ZWQ6IG51bGwsXG4gICAgcHJpb3JpdHk6IG51bGwsXG4gIH1cbiAgc2NoZWR1bGVTdG9yZS5jbGVhckZpbHRlcnMoKVxufVxuXG5jb25zdCBzZWxlY3Rab25lID0gKHpvbmUpID0+IHtcbiAgc2NoZWR1bGVTdG9yZS5zZWxlY3Rab25lKHpvbmUpXG59XG5cbmNvbnN0IHRvZ2dsZVpvbmVTdGF0dXMgPSBhc3luYyAoem9uZSkgPT4ge1xuICBhd2FpdCBzY2hlZHVsZVN0b3JlLnVwZGF0ZVpvbmVTdGF0dXMoem9uZS5pZCwgIXpvbmUuY29tcGxldGVkKVxufVxuXG5jb25zdCBtYXJrQWxsRGF5ID0gYXN5bmMgKGRheU5hbWUsIGNvbXBsZXRlZCkgPT4ge1xuICBpZiAoJHEuZGlhbG9nICYmIHR5cGVvZiAkcS5kaWFsb2cgPT09ICdmdW5jdGlvbicpIHtcbiAgICAkcS5kaWFsb2coe1xuICAgICAgdGl0bGU6ICdDb25maXJtIEFjdGlvbicsXG4gICAgICBtZXNzYWdlOiBgTWFyayBhbGwgJHtkYXlOYW1lfSB6b25lcyBhcyAke2NvbXBsZXRlZCA/ICdjb21wbGV0ZWQnIDogJ2luY29tcGxldGUnfT9gLFxuICAgICAgY2FuY2VsOiB0cnVlLFxuICAgICAgcGVyc2lzdGVudDogdHJ1ZSxcbiAgICB9KS5vbk9rKGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IHNjaGVkdWxlU3RvcmUubWFya0FsbFpvbmVzRm9yRGF5KGRheU5hbWUsIGNvbXBsZXRlZClcbiAgICB9KVxuICB9IGVsc2Uge1xuICAgIC8vIEZhbGxiYWNrIHdpdGhvdXQgZGlhbG9nIC0gZGlyZWN0IGFjdGlvblxuICAgIGF3YWl0IHNjaGVkdWxlU3RvcmUubWFya0FsbFpvbmVzRm9yRGF5KGRheU5hbWUsIGNvbXBsZXRlZClcbiAgfVxufVxuXG5jb25zdCBjb25maXJtTWFya0FsbENvbXBsZXRlID0gKCkgPT4ge1xuICAkcS5kaWFsb2coe1xuICAgIHRpdGxlOiAnTWFyayBBbGwgWm9uZXMgQ29tcGxldGUnLFxuICAgIG1lc3NhZ2U6ICdUaGlzIHdpbGwgbWFyayBhbGwgem9uZXMgYXMgY29tcGxldGVkIGZvciB0aGlzIHdlZWsuIENvbnRpbnVlPycsXG4gICAgY2FuY2VsOiB0cnVlLFxuICAgIHBlcnNpc3RlbnQ6IHRydWUsXG4gICAgb2s6IHtcbiAgICAgIGNvbG9yOiAncG9zaXRpdmUnLFxuICAgICAgbGFiZWw6ICdNYXJrIEFsbCBDb21wbGV0ZScsXG4gICAgfSxcbiAgfSkub25Payhhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgcHJvbWlzZXMgPSBzY2hlZHVsZVN0b3JlLnpvbmVzXG4gICAgICAuZmlsdGVyKCh6b25lKSA9PiAhem9uZS5jb21wbGV0ZWQpXG4gICAgICAubWFwKCh6b25lKSA9PiBzY2hlZHVsZVN0b3JlLnVwZGF0ZVpvbmVTdGF0dXMoem9uZS5pZCwgdHJ1ZSkpXG5cbiAgICBhd2FpdCBQcm9taXNlLmFsbChwcm9taXNlcylcblxuICAgICRxLm5vdGlmeSh7XG4gICAgICB0eXBlOiAncG9zaXRpdmUnLFxuICAgICAgbWVzc2FnZTogJ0FsbCB6b25lcyBtYXJrZWQgYXMgY29tcGxldGVkIScsXG4gICAgICBpY29uOiAnY2VsZWJyYXRpb24nLFxuICAgIH0pXG4gIH0pXG59XG5cbmNvbnN0IGNvbmZpcm1SZXNldFdlZWsgPSAoKSA9PiB7XG4gICRxLmRpYWxvZyh7XG4gICAgdGl0bGU6ICdSZXNldCBXZWVrbHkgUHJvZ3Jlc3MnLFxuICAgIG1lc3NhZ2U6XG4gICAgICAnVGhpcyB3aWxsIG1hcmsgYWxsIHpvbmVzIGFzIGluY29tcGxldGUgYW5kIHJlc2V0IHRoZSB3ZWVrbHkgcHJvZ3Jlc3MuIFRoaXMgYWN0aW9uIGNhbm5vdCBiZSB1bmRvbmUuJyxcbiAgICBjYW5jZWw6IHRydWUsXG4gICAgcGVyc2lzdGVudDogdHJ1ZSxcbiAgICBvazoge1xuICAgICAgY29sb3I6ICd3YXJuaW5nJyxcbiAgICAgIGxhYmVsOiAnUmVzZXQgV2VlaycsXG4gICAgfSxcbiAgfSkub25Payhhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgc2NoZWR1bGVTdG9yZS5yZXNldFdlZWtseVByb2dyZXNzKClcbiAgfSlcbn1cblxuY29uc3Qgc2hvd0FkZFpvbmUgPSAoKSA9PiB7XG4gICRxLm5vdGlmeSh7XG4gICAgdHlwZTogJ2luZm8nLFxuICAgIG1lc3NhZ2U6ICdab25lIGNyZWF0aW9uIGZlYXR1cmUgY29taW5nIGluIG5leHQgcGhhc2UhJyxcbiAgICBpY29uOiAnY29uc3RydWN0aW9uJyxcbiAgfSlcbn1cbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cInNjc3NcIiBzY29wZWQ+XG4uZHJhd2VyLWNvbnRlbnQge1xuICBoZWlnaHQ6IDEwMCU7XG4gIG92ZXJmbG93LXk6IGF1dG87XG59XG5cbi5wcm9ncmVzcy1vdmVydmlldyB7XG4gIC5wcm9ncmVzcy1jaXJjbGUge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgfVxufVxuXG4uZGFpbHktcHJvZ3Jlc3Mge1xuICAuZGF5LXByb2dyZXNzLWl0ZW0ge1xuICAgIG1hcmdpbi1ib3R0b206IDE2cHg7XG5cbiAgICAmOmxhc3QtY2hpbGQge1xuICAgICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgICB9XG4gIH1cblxuICAuZGF5LWFjdGlvbnMge1xuICAgIG1hcmdpbi10b3A6IDRweDtcbiAgfVxufVxuXG4uZmlsdGVyLWNvbnRyb2xzIHtcbiAgLnEtc2VsZWN0IHtcbiAgICBtaW4taGVpZ2h0OiA0MHB4O1xuICB9XG59XG5cbi5hY3RpdmUtZmlsdGVycyB7XG4gIHBhZGRpbmc6IDhweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgzMywgMTUwLCAyNDMsIDAuMSk7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYm9yZGVyLWxlZnQ6IDNweCBzb2xpZCAjMjE5NmYzO1xufVxuXG4ucXVpY2stZmlsdGVycyB7XG4gIC5xLWJ0biB7XG4gICAgbWluLXdpZHRoOiA2MHB4O1xuICB9XG59XG5cbi56b25lLWxpc3Qge1xuICAuem9uZS1jYXJkIHtcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlO1xuXG4gICAgJjpob3ZlciB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMDUpO1xuICAgIH1cbiAgfVxuXG4gIC56b25lLXN0YXR1cy1pbmRpY2F0b3Ige1xuICAgIHdpZHRoOiAxMnB4O1xuICAgIGhlaWdodDogMTJweDtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjIpO1xuICB9XG59XG5cbi5sZWdlbmQge1xuICAubGVnZW5kLWl0ZW0ge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBtYXJnaW4tYm90dG9tOiA2cHg7XG5cbiAgICAubGVnZW5kLWNvbG9yIHtcbiAgICAgIHdpZHRoOiAxNnB4O1xuICAgICAgaGVpZ2h0OiAxNnB4O1xuICAgICAgYm9yZGVyLXJhZGl1czogM3B4O1xuICAgICAgbWFyZ2luLXJpZ2h0OiA4cHg7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuMik7XG4gICAgfVxuXG4gICAgLmxlZ2VuZC1sYWJlbCB7XG4gICAgICBmb250LXNpemU6IDAuODVyZW07XG4gICAgfVxuICB9XG59XG5cbi8vIERhcmsgbW9kZSBhZGp1c3RtZW50c1xuLmJvZHktLWRhcmsge1xuICAuem9uZS1jYXJkOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpO1xuICB9XG5cbiAgLnpvbmUtc3RhdHVzLWluZGljYXRvciB7XG4gICAgYm9yZGVyLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMik7XG4gIH1cblxuICAubGVnZW5kLWNvbG9yIHtcbiAgICBib3JkZXItY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKTtcbiAgfVxufVxuXG4vLyBNb2JpbGUgcmVzcG9uc2l2ZVxuQG1lZGlhIChtYXgtd2lkdGg6IDU5OXB4KSB7XG4gIC5wcm9ncmVzcy1vdmVydmlldyB7XG4gICAgLnEtY2lyY3VsYXItcHJvZ3Jlc3Mge1xuICAgICAgd2lkdGg6IDYwcHg7XG4gICAgICBoZWlnaHQ6IDYwcHg7XG4gICAgfVxuXG4gICAgLnByb2dyZXNzLXRleHQge1xuICAgICAgZm9udC1zaXplOiAwLjlyZW07XG4gICAgfVxuICB9XG5cbiAgLmRheS1hY3Rpb25zIHtcbiAgICAucS1idG4ge1xuICAgICAgbWluLXdpZHRoOiAzMnB4O1xuICAgIH1cbiAgfVxufVxuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtbGF5b3V0IHZpZXc9XCJsSGggTHByIGxGZlwiPlxuICAgIDwhLS0gSGVhZGVyIC0tPlxuICAgIDxxLWhlYWRlciBlbGV2YXRlZCBjbGFzcz1cImJnLXByaW1hcnkgdGV4dC13aGl0ZVwiPlxuICAgICAgPHEtdG9vbGJhcj5cbiAgICAgICAgPHEtYnRuIGZsYXQgZGVuc2Ugcm91bmQgaWNvbj1cIm1lbnVcIiBhcmlhLWxhYmVsPVwiTWVudVwiIEBjbGljaz1cInRvZ2dsZUxlZnREcmF3ZXJcIiAvPlxuXG4gICAgICAgIDxxLXRvb2xiYXItdGl0bGUgY2xhc3M9XCJ0ZXh0LXdlaWdodC1tZWRpdW1cIj5cbiAgICAgICAgICA8cS1pY29uIG5hbWU9XCJncmFzc1wiIHNpemU9XCJzbVwiIGNsYXNzPVwicS1tci1zbVwiIC8+XG4gICAgICAgICAgR3Jhc3MgJiBTbm93XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtY2FwdGlvblwiPlN0ZS4gQW5uZSAtIFB1YmxpYyBXb3JrczwvZGl2PlxuICAgICAgICA8L3EtdG9vbGJhci10aXRsZT5cblxuICAgICAgICA8IS0tIEhlYWRlciBhY3Rpb25zIC0tPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicS1ndXR0ZXItc20gcm93IGl0ZW1zLWNlbnRlciBuby13cmFwXCI+XG4gICAgICAgICAgPCEtLSBXZWF0aGVyIGluZGljYXRvciAtLT5cbiAgICAgICAgICA8cS1idG4gZmxhdCBkZW5zZSByb3VuZCBpY29uPVwid2Jfc3VubnlcIiBAY2xpY2s9XCJzaG93V2VhdGhlciA9IHRydWVcIj5cbiAgICAgICAgICAgIDxxLXRvb2x0aXA+V2VhdGhlciBDb25kaXRpb25zPC9xLXRvb2x0aXA+XG4gICAgICAgICAgPC9xLWJ0bj5cblxuICAgICAgICAgIDwhLS0gUmVmcmVzaCBidXR0b24gLS0+XG4gICAgICAgICAgPHEtYnRuXG4gICAgICAgICAgICBmbGF0XG4gICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgcm91bmRcbiAgICAgICAgICAgIGljb249XCJyZWZyZXNoXCJcbiAgICAgICAgICAgIDpsb2FkaW5nPVwic2NoZWR1bGVTdG9yZS5sb2FkaW5nXCJcbiAgICAgICAgICAgIEBjbGljaz1cInJlZnJlc2hEYXRhXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8cS10b29sdGlwPlJlZnJlc2ggRGF0YTwvcS10b29sdGlwPlxuICAgICAgICAgIDwvcS1idG4+XG5cbiAgICAgICAgICA8IS0tIFNldHRpbmdzIC0tPlxuICAgICAgICAgIDxxLWJ0biBmbGF0IGRlbnNlIHJvdW5kIGljb249XCJzZXR0aW5nc1wiIEBjbGljaz1cInNob3dTZXR0aW5ncyA9IHRydWVcIj5cbiAgICAgICAgICAgIDxxLXRvb2x0aXA+U2V0dGluZ3M8L3EtdG9vbHRpcD5cbiAgICAgICAgICA8L3EtYnRuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvcS10b29sYmFyPlxuICAgIDwvcS1oZWFkZXI+XG5cbiAgICA8IS0tIExlZnQgRHJhd2VyIC0tPlxuICAgIDxxLWRyYXdlciB2LW1vZGVsPVwibGVmdERyYXdlck9wZW5cIiBzaG93LWlmLWFib3ZlIGJvcmRlcmVkIDp3aWR0aD1cIjMyMFwiIDpicmVha3BvaW50PVwiNzY4XCI+XG4gICAgICA8RHJhd2VyQ29udGVudCAvPlxuICAgIDwvcS1kcmF3ZXI+XG5cbiAgICA8IS0tIE1haW4gQ29udGVudCAtLT5cbiAgICA8cS1wYWdlLWNvbnRhaW5lcj5cbiAgICAgIDxyb3V0ZXItdmlldyAvPlxuICAgIDwvcS1wYWdlLWNvbnRhaW5lcj5cblxuICAgIDwhLS0gV2VhdGhlciBEaWFsb2cgLS0+XG4gICAgPHEtZGlhbG9nIHYtbW9kZWw9XCJzaG93V2VhdGhlclwiPlxuICAgICAgPHEtY2FyZCBzdHlsZT1cIm1pbi13aWR0aDogMzAwcHhcIj5cbiAgICAgICAgPHEtY2FyZC1zZWN0aW9uIGNsYXNzPVwicm93IGl0ZW1zLWNlbnRlciBxLXBiLW5vbmVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNlwiPldlYXRoZXIgQ29uZGl0aW9uczwvZGl2PlxuICAgICAgICAgIDxxLXNwYWNlIC8+XG4gICAgICAgICAgPHEtYnRuIGljb249XCJjbG9zZVwiIGZsYXQgcm91bmQgZGVuc2Ugdi1jbG9zZS1wb3B1cCAvPlxuICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuXG4gICAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICA8ZGl2IHYtaWY9XCJ3ZWF0aGVyRGF0YVwiIGNsYXNzPVwicS1ndXR0ZXItbWRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyIHEtZ3V0dGVyLW1kXCI+XG4gICAgICAgICAgICAgIDxxLWljb24gbmFtZT1cIndiX3N1bm55XCIgc2l6ZT1cImxnXCIgY29sb3I9XCJvcmFuZ2VcIiAvPlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg0XCI+e3sgd2VhdGhlckRhdGEudGVtcGVyYXR1cmUgfX3CsEM8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1zdWJ0aXRsZTJcIj57eyB3ZWF0aGVyRGF0YS5jb25kaXRpb24gfX08L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPHEtc2VwYXJhdG9yIC8+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgcS1ndXR0ZXItbWRcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWNhcHRpb24gdGV4dC1ncmV5XCI+SHVtaWRpdHk8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1ib2R5MVwiPnt7IHdlYXRoZXJEYXRhLmh1bWlkaXR5IH19JTwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWNhcHRpb24gdGV4dC1ncmV5XCI+V2luZDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWJvZHkxXCI+XG4gICAgICAgICAgICAgICAgICB7eyB3ZWF0aGVyRGF0YS53aW5kU3BlZWQgfX0ga20vaCB7eyB3ZWF0aGVyRGF0YS53aW5kRGlyZWN0aW9uIH19XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxxLXNlcGFyYXRvciAvPlxuXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1zdWJ0aXRsZTIgcS1tYi1zbVwiPlxuICAgICAgICAgICAgICAgIEN1dHRpbmcgQ29uZGl0aW9uczpcbiAgICAgICAgICAgICAgICA8cS1jaGlwXG4gICAgICAgICAgICAgICAgICA6Y29sb3I9XCJ3ZWF0aGVyRGF0YS5jdXR0aW5nQ29uZGl0aW9ucyA9PT0gJ0dvb2QnID8gJ3Bvc2l0aXZlJyA6ICd3YXJuaW5nJ1wiXG4gICAgICAgICAgICAgICAgICB0ZXh0LWNvbG9yPVwid2hpdGVcIlxuICAgICAgICAgICAgICAgICAgc2l6ZT1cInNtXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7eyB3ZWF0aGVyRGF0YS5jdXR0aW5nQ29uZGl0aW9ucyB9fVxuICAgICAgICAgICAgICAgIDwvcS1jaGlwPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPHVsIGNsYXNzPVwicS1tYS1ub25lIHEtcGwtbWRcIj5cbiAgICAgICAgICAgICAgICA8bGkgdi1mb3I9XCJyZWMgaW4gd2VhdGhlckRhdGEucmVjb21tZW5kYXRpb25zXCIgOmtleT1cInJlY1wiIGNsYXNzPVwidGV4dC1ib2R5MlwiPlxuICAgICAgICAgICAgICAgICAge3sgcmVjIH19XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiB2LWVsc2UgY2xhc3M9XCJ0ZXh0LWNlbnRlciBxLXBhLW1kXCI+XG4gICAgICAgICAgICA8cS1zcGlubmVyIHNpemU9XCJsZ1wiIC8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1tdC1tZFwiPkxvYWRpbmcgd2VhdGhlciBkYXRhLi4uPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICA8L3EtY2FyZD5cbiAgICA8L3EtZGlhbG9nPlxuXG4gICAgPCEtLSBTZXR0aW5ncyBEaWFsb2cgLS0+XG4gICAgPHEtZGlhbG9nIHYtbW9kZWw9XCJzaG93U2V0dGluZ3NcIj5cbiAgICAgIDxxLWNhcmQgc3R5bGU9XCJtaW4td2lkdGg6IDQwMHB4XCI+XG4gICAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInJvdyBpdGVtcy1jZW50ZXIgcS1wYi1ub25lXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDZcIj5TZXR0aW5nczwvZGl2PlxuICAgICAgICAgIDxxLXNwYWNlIC8+XG4gICAgICAgICAgPHEtYnRuIGljb249XCJjbG9zZVwiIGZsYXQgcm91bmQgZGVuc2Ugdi1jbG9zZS1wb3B1cCAvPlxuICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuXG4gICAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInEtZ3V0dGVyLW1kXCI+XG4gICAgICAgICAgPCEtLSBEYXJrIG1vZGUgdG9nZ2xlIC0tPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtYm9keTFcIj5EYXJrIE1vZGU8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtY2FwdGlvbiB0ZXh0LWdyZXlcIj5Td2l0Y2ggYmV0d2VlbiBsaWdodCBhbmQgZGFyayB0aGVtZXM8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHEtdG9nZ2xlIHYtbW9kZWw9XCJkYXJrTW9kZVwiIEB1cGRhdGU6bW9kZWwtdmFsdWU9XCJ0b2dnbGVEYXJrTW9kZVwiIGNvbG9yPVwicHJpbWFyeVwiIC8+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8cS1zZXBhcmF0b3IgLz5cblxuICAgICAgICAgIDwhLS0gQXV0byByZWZyZXNoIC0tPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtYm9keTFcIj5BdXRvIFJlZnJlc2g8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtY2FwdGlvbiB0ZXh0LWdyZXlcIj5BdXRvbWF0aWNhbGx5IHJlZnJlc2ggZGF0YSBldmVyeSA1IG1pbnV0ZXM8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHEtdG9nZ2xlXG4gICAgICAgICAgICAgIHYtbW9kZWw9XCJhdXRvUmVmcmVzaFwiXG4gICAgICAgICAgICAgIEB1cGRhdGU6bW9kZWwtdmFsdWU9XCJ0b2dnbGVBdXRvUmVmcmVzaFwiXG4gICAgICAgICAgICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPHEtc2VwYXJhdG9yIC8+XG5cbiAgICAgICAgICA8IS0tIEV4cG9ydC9JbXBvcnQgLS0+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWJvZHkxIHEtbWItc21cIj5EYXRhIE1hbmFnZW1lbnQ8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLWd1dHRlci1zbVwiPlxuICAgICAgICAgICAgICA8cS1idG5cbiAgICAgICAgICAgICAgICBvdXRsaW5lXG4gICAgICAgICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgICAgICBpY29uPVwiZG93bmxvYWRcIlxuICAgICAgICAgICAgICAgIGxhYmVsPVwiRXhwb3J0IERhdGFcIlxuICAgICAgICAgICAgICAgIEBjbGljaz1cImV4cG9ydERhdGFcIlxuICAgICAgICAgICAgICAgIHNpemU9XCJzbVwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgICAgIG91dGxpbmVcbiAgICAgICAgICAgICAgICBjb2xvcj1cInNlY29uZGFyeVwiXG4gICAgICAgICAgICAgICAgaWNvbj1cInVwbG9hZFwiXG4gICAgICAgICAgICAgICAgbGFiZWw9XCJJbXBvcnQgRGF0YVwiXG4gICAgICAgICAgICAgICAgQGNsaWNrPVwiaW1wb3J0RGF0YVwiXG4gICAgICAgICAgICAgICAgc2l6ZT1cInNtXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgPC9xLWNhcmQ+XG4gICAgPC9xLWRpYWxvZz5cblxuICAgIDwhLS0gR2xvYmFsIG5vdGlmaWNhdGlvbnMgYXJlYSAtLT5cbiAgICA8cS1hamF4LWJhciBwb3NpdGlvbj1cInRvcFwiIGNvbG9yPVwiYWNjZW50XCIgc2l6ZT1cIjRweFwiIC8+XG4gIDwvcS1sYXlvdXQ+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgcmVmLCBvbk1vdW50ZWQsIG9uVW5tb3VudGVkLCB3YXRjaCB9IGZyb20gJ3Z1ZSdcbmltcG9ydCB7IHVzZVF1YXNhciB9IGZyb20gJ3F1YXNhcidcbmltcG9ydCB7IHVzZVNjaGVkdWxlU3RvcmUgfSBmcm9tICcuLi9zdG9yZXMvc2NoZWR1bGUtc3RvcmUuanMnXG5pbXBvcnQgeyBhcGlTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvYXBpLXNlcnZpY2UuanMnXG5pbXBvcnQgRHJhd2VyQ29udGVudCBmcm9tICcuLi9jb21wb25lbnRzL0RyYXdlckNvbnRlbnQudnVlJ1xuXG5jb25zdCAkcSA9IHVzZVF1YXNhcigpXG5jb25zdCBzY2hlZHVsZVN0b3JlID0gdXNlU2NoZWR1bGVTdG9yZSgpXG5cbi8vIFJlYWN0aXZlIHN0YXRlXG5jb25zdCBsZWZ0RHJhd2VyT3BlbiA9IHJlZihmYWxzZSlcbmNvbnN0IHNob3dXZWF0aGVyID0gcmVmKGZhbHNlKVxuY29uc3Qgc2hvd1NldHRpbmdzID0gcmVmKGZhbHNlKVxuY29uc3Qgd2VhdGhlckRhdGEgPSByZWYobnVsbClcbmNvbnN0IGRhcmtNb2RlID0gcmVmKCRxLmRhcmsuaXNBY3RpdmUpXG5jb25zdCBhdXRvUmVmcmVzaCA9IHJlZihmYWxzZSlcbmxldCByZWZyZXNoSW50ZXJ2YWwgPSBudWxsXG5cbi8vIENvbXB1dGVkXG5jb25zdCB0b2dnbGVMZWZ0RHJhd2VyID0gKCkgPT4ge1xuICBsZWZ0RHJhd2VyT3Blbi52YWx1ZSA9ICFsZWZ0RHJhd2VyT3Blbi52YWx1ZVxufVxuXG4vLyBNZXRob2RzXG5jb25zdCByZWZyZXNoRGF0YSA9IGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBhd2FpdCBzY2hlZHVsZVN0b3JlLmZldGNoWm9uZXMoKVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHJlZnJlc2hpbmcgZGF0YTonLCBlcnJvcilcbiAgfVxufVxuXG5jb25zdCBsb2FkV2VhdGhlckRhdGEgPSBhc3luYyAoKSA9PiB7XG4gIHRyeSB7XG4gICAgd2VhdGhlckRhdGEudmFsdWUgPSBhd2FpdCBhcGlTZXJ2aWNlLmdldFdlYXRoZXJEYXRhKClcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBsb2FkaW5nIHdlYXRoZXIgZGF0YTonLCBlcnJvcilcbiAgICAkcS5ub3RpZnkoe1xuICAgICAgdHlwZTogJ25lZ2F0aXZlJyxcbiAgICAgIG1lc3NhZ2U6ICdGYWlsZWQgdG8gbG9hZCB3ZWF0aGVyIGRhdGEnLFxuICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICB9KVxuICB9XG59XG5cbmNvbnN0IHRvZ2dsZURhcmtNb2RlID0gKHZhbHVlKSA9PiB7XG4gICRxLmRhcmsuc2V0KHZhbHVlKVxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZGFya01vZGUnLCB2YWx1ZSlcbn1cblxuY29uc3QgdG9nZ2xlQXV0b1JlZnJlc2ggPSAodmFsdWUpID0+IHtcbiAgaWYgKHZhbHVlKSB7XG4gICAgcmVmcmVzaEludGVydmFsID0gc2V0SW50ZXJ2YWwocmVmcmVzaERhdGEsIDUgKiA2MCAqIDEwMDApIC8vIDUgbWludXRlc1xuICAgICRxLm5vdGlmeSh7XG4gICAgICB0eXBlOiAnaW5mbycsXG4gICAgICBtZXNzYWdlOiAnQXV0byByZWZyZXNoIGVuYWJsZWQgKGV2ZXJ5IDUgbWludXRlcyknLFxuICAgICAgaWNvbjogJ3NjaGVkdWxlJyxcbiAgICB9KVxuICB9IGVsc2Uge1xuICAgIGlmIChyZWZyZXNoSW50ZXJ2YWwpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwocmVmcmVzaEludGVydmFsKVxuICAgICAgcmVmcmVzaEludGVydmFsID0gbnVsbFxuICAgIH1cbiAgICAkcS5ub3RpZnkoe1xuICAgICAgdHlwZTogJ2luZm8nLFxuICAgICAgbWVzc2FnZTogJ0F1dG8gcmVmcmVzaCBkaXNhYmxlZCcsXG4gICAgICBpY29uOiAnc2NoZWR1bGVfb2ZmJyxcbiAgICB9KVxuICB9XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhdXRvUmVmcmVzaCcsIHZhbHVlKVxufVxuXG5jb25zdCBleHBvcnREYXRhID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBhcGlTZXJ2aWNlLmV4cG9ydFpvbmVzKCdqc29uJylcbiAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW2RhdGFdLCB7IHR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyB9KVxuICAgIGNvbnN0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYilcbiAgICBjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpXG4gICAgYS5ocmVmID0gdXJsXG4gICAgYS5kb3dubG9hZCA9IGBncmFzcy1jdXR0aW5nLXpvbmVzLSR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF19Lmpzb25gXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhKVxuICAgIGEuY2xpY2soKVxuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoYSlcbiAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHVybClcblxuICAgICRxLm5vdGlmeSh7XG4gICAgICB0eXBlOiAncG9zaXRpdmUnLFxuICAgICAgbWVzc2FnZTogJ0RhdGEgZXhwb3J0ZWQgc3VjY2Vzc2Z1bGx5JyxcbiAgICAgIGljb246ICdkb3dubG9hZF9kb25lJyxcbiAgICB9KVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0V4cG9ydCBlcnJvcjonLCBlcnJvcilcbiAgICAkcS5ub3RpZnkoe1xuICAgICAgdHlwZTogJ25lZ2F0aXZlJyxcbiAgICAgIG1lc3NhZ2U6ICdGYWlsZWQgdG8gZXhwb3J0IGRhdGEnLFxuICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICB9KVxuICB9XG59XG5cbmNvbnN0IGltcG9ydERhdGEgPSAoKSA9PiB7XG4gIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuICBpbnB1dC50eXBlID0gJ2ZpbGUnXG4gIGlucHV0LmFjY2VwdCA9ICcuanNvbidcbiAgaW5wdXQub25jaGFuZ2UgPSBhc3luYyAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBmaWxlID0gZXZlbnQudGFyZ2V0LmZpbGVzWzBdXG4gICAgaWYgKCFmaWxlKSByZXR1cm5cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCB0ZXh0ID0gYXdhaXQgZmlsZS50ZXh0KClcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGFwaVNlcnZpY2UuaW1wb3J0Wm9uZXModGV4dCwgJ2pzb24nKVxuICAgICAgYXdhaXQgc2NoZWR1bGVTdG9yZS5mZXRjaFpvbmVzKClcblxuICAgICAgJHEubm90aWZ5KHtcbiAgICAgICAgdHlwZTogJ3Bvc2l0aXZlJyxcbiAgICAgICAgbWVzc2FnZTogYEltcG9ydGVkICR7cmVzdWx0LmltcG9ydGVkfSB6b25lcyBzdWNjZXNzZnVsbHlgLFxuICAgICAgICBpY29uOiAndXBsb2FkX2RvbmUnLFxuICAgICAgfSlcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignSW1wb3J0IGVycm9yOicsIGVycm9yKVxuICAgICAgJHEubm90aWZ5KHtcbiAgICAgICAgdHlwZTogJ25lZ2F0aXZlJyxcbiAgICAgICAgbWVzc2FnZTogJ0ZhaWxlZCB0byBpbXBvcnQgZGF0YScsXG4gICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICB9KVxuICAgIH1cbiAgfVxuICBpbnB1dC5jbGljaygpXG59XG5cbi8vIExpZmVjeWNsZVxub25Nb3VudGVkKGFzeW5jICgpID0+IHtcbiAgLy8gU2V0IHVwIG5vdGlmaWNhdGlvbnMgZm9yIHRoZSBzdG9yZVxuICBzY2hlZHVsZVN0b3JlLnNldE5vdGlmeUZ1bmN0aW9uKCRxLm5vdGlmeSlcblxuICAvLyBMb2FkIHNhdmVkIHByZWZlcmVuY2VzXG4gIGNvbnN0IHNhdmVkRGFya01vZGUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZGFya01vZGUnKVxuICBpZiAoc2F2ZWREYXJrTW9kZSAhPT0gbnVsbCkge1xuICAgIGRhcmtNb2RlLnZhbHVlID0gc2F2ZWREYXJrTW9kZSA9PT0gJ3RydWUnXG4gICAgJHEuZGFyay5zZXQoZGFya01vZGUudmFsdWUpXG4gIH1cblxuICBjb25zdCBzYXZlZEF1dG9SZWZyZXNoID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2F1dG9SZWZyZXNoJylcbiAgaWYgKHNhdmVkQXV0b1JlZnJlc2ggPT09ICd0cnVlJykge1xuICAgIGF1dG9SZWZyZXNoLnZhbHVlID0gdHJ1ZVxuICAgIHRvZ2dsZUF1dG9SZWZyZXNoKHRydWUpXG4gIH1cblxuICAvLyBJbml0aWFsaXplIGRhdGFcbiAgYXdhaXQgc2NoZWR1bGVTdG9yZS5pbml0aWFsaXplU3RvcmUoKVxuXG4gIC8vIExvYWQgd2VhdGhlciBkYXRhIHdoZW4gd2VhdGhlciBkaWFsb2cgb3BlbnNcbiAgc2hvd1dlYXRoZXIudmFsdWUgJiYgbG9hZFdlYXRoZXJEYXRhKClcbn0pXG5cbm9uVW5tb3VudGVkKCgpID0+IHtcbiAgaWYgKHJlZnJlc2hJbnRlcnZhbCkge1xuICAgIGNsZWFySW50ZXJ2YWwocmVmcmVzaEludGVydmFsKVxuICB9XG59KVxuXG4vLyBXYXRjaCBmb3Igd2VhdGhlciBkaWFsb2cgb3BlbmluZ1xud2F0Y2goc2hvd1dlYXRoZXIsIChuZXdWYWwpID0+IHtcbiAgaWYgKG5ld1ZhbCAmJiAhd2VhdGhlckRhdGEudmFsdWUpIHtcbiAgICBsb2FkV2VhdGhlckRhdGEoKVxuICB9XG59KVxuXG5vblVubW91bnRlZCgoKSA9PiB7XG4gIGlmIChyZWZyZXNoSW50ZXJ2YWwpIHtcbiAgICBjbGVhckludGVydmFsKHJlZnJlc2hJbnRlcnZhbClcbiAgfVxufSlcbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cInNjc3NcIiBzY29wZWQ+XG4ucS10b29sYmFyIHtcbiAgbWluLWhlaWdodDogNjRweDtcbn1cblxuLnEtdG9vbGJhci10aXRsZSB7XG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xuXG4gIC50ZXh0LWNhcHRpb24ge1xuICAgIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgICBvcGFjaXR5OiAwLjg7XG4gICAgbGluZS1oZWlnaHQ6IDE7XG4gIH1cbn1cblxuLnEtZHJhd2VyIHtcbiAgLnEtc2Nyb2xsYXJlYSB7XG4gICAgaGVpZ2h0OiBjYWxjKDEwMHZoIC0gNjRweCk7XG4gIH1cbn1cblxuLy8gV2VhdGhlciBkaWFsb2cgY29udGVudFxuLndlYXRoZXItaWNvbiB7XG4gIGZvbnQtc2l6ZTogM3JlbTtcbn1cblxuLy8gU2V0dGluZ3MgZGlhbG9nXG4uc2V0dGluZ3Mtc2VjdGlvbiB7XG4gIC5xLXRvZ2dsZSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjkpO1xuICB9XG59XG5cbi8vIE1vYmlsZSBhZGp1c3RtZW50c1xuQG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KSB7XG4gIC5xLXRvb2xiYXItdGl0bGUge1xuICAgIGZvbnQtc2l6ZTogMXJlbTtcblxuICAgIC50ZXh0LWNhcHRpb24ge1xuICAgICAgZm9udC1zaXplOiAwLjdyZW07XG4gICAgfVxuICB9XG59XG48L3N0eWxlPlxuIl0sIm5hbWVzIjpbIm9mZnNldCIsInZhbHVlIiwic3R5bGUiLCJwb3NpdGlvbiIsInNpemUiLCJoZWlnaHQiLCJ3aWR0aCIsImR1cmF0aW9uIiwiX2hvaXN0ZWRfMSIsIl9ob2lzdGVkXzIiLCJfaG9pc3RlZF8zIiwiX2hvaXN0ZWRfNCIsIl9ob2lzdGVkXzUiLCJfaG9pc3RlZF82IiwiX2hvaXN0ZWRfNyIsIl9ob2lzdGVkXzgiLCJfaG9pc3RlZF85IiwiX2hvaXN0ZWRfMTAiLCJfaG9pc3RlZF8xMSIsIl9ob2lzdGVkXzEyIiwiX2hvaXN0ZWRfMTMiLCJfaG9pc3RlZF8xNCIsIl9ob2lzdGVkXzE1IiwiX2hvaXN0ZWRfMTYiLCJfb3BlbkJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfY3JlYXRlVk5vZGUiLCJfdG9EaXNwbGF5U3RyaW5nIiwiX0ZyYWdtZW50IiwiX25vcm1hbGl6ZUNsYXNzIiwiX2NyZWF0ZUJsb2NrIiwiX2NyZWF0ZVRleHRWTm9kZSIsIl9yZW5kZXJMaXN0IiwiX3dpdGhN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
