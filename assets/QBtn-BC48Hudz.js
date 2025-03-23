import { b as computed, a as createComponent, g as getCurrentInstance, r as ref, d as onBeforeUnmount, h, W as Transition, B as withDirectives, s as stopAndPrevent, l as listenOpts, G as isKeyCode, y as prevent, z as stop } from "./index-CFDbAO6J.js";
import { o as useRouterLinkNonMatchingProps, i as useSizeProps, j as useSize, d as useRouterLink, Q as QIcon, a as hMergeSlot, f as QSpinner, R as Ripple } from "./Ripple-DUa7a61F.js";
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
  QBtn as Q
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUUJ0bi1CQzQ4SHVkei5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtYWxpZ24vdXNlLWFsaWduLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9idG4vdXNlLWJ0bi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvYnRuL1FCdG4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmV4cG9ydCBjb25zdCBhbGlnbk1hcCA9IHtcbiAgbGVmdDogJ3N0YXJ0JyxcbiAgY2VudGVyOiAnY2VudGVyJyxcbiAgcmlnaHQ6ICdlbmQnLFxuICBiZXR3ZWVuOiAnYmV0d2VlbicsXG4gIGFyb3VuZDogJ2Fyb3VuZCcsXG4gIGV2ZW5seTogJ2V2ZW5seScsXG4gIHN0cmV0Y2g6ICdzdHJldGNoJ1xufVxuXG5leHBvcnQgY29uc3QgYWxpZ25WYWx1ZXMgPSBPYmplY3Qua2V5cyhhbGlnbk1hcClcblxuZXhwb3J0IGNvbnN0IHVzZUFsaWduUHJvcHMgPSB7XG4gIGFsaWduOiB7XG4gICAgdHlwZTogU3RyaW5nLFxuICAgIHZhbGlkYXRvcjogdiA9PiBhbGlnblZhbHVlcy5pbmNsdWRlcyh2KVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcykge1xuICAvLyByZXR1cm4gYWxpZ25DbGFzc1xuICByZXR1cm4gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGNvbnN0IGFsaWduID0gcHJvcHMuYWxpZ24gPT09IHZvaWQgMFxuICAgICAgPyBwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZSA/ICdzdHJldGNoJyA6ICdsZWZ0J1xuICAgICAgOiBwcm9wcy5hbGlnblxuXG4gICAgcmV0dXJuIGAkeyBwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZSA/ICdpdGVtcycgOiAnanVzdGlmeScgfS0keyBhbGlnbk1hcFsgYWxpZ24gXSB9YFxuICB9KVxufVxuIiwiaW1wb3J0IHsgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VBbGlnbiwgeyB1c2VBbGlnblByb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtYWxpZ24vdXNlLWFsaWduLmpzJ1xuaW1wb3J0IHVzZVNpemUsIHsgdXNlU2l6ZVByb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2Utc2l6ZS91c2Utc2l6ZS5qcydcbmltcG9ydCB1c2VSb3V0ZXJMaW5rLCB7IHVzZVJvdXRlckxpbmtOb25NYXRjaGluZ1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2Utcm91dGVyLWxpbmsvdXNlLXJvdXRlci1saW5rLmpzJ1xuXG5leHBvcnQgY29uc3QgYnRuUGFkZGluZyA9IHtcbiAgbm9uZTogMCxcbiAgeHM6IDQsXG4gIHNtOiA4LFxuICBtZDogMTYsXG4gIGxnOiAyNCxcbiAgeGw6IDMyXG59XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0U2l6ZXMgPSB7XG4gIHhzOiA4LFxuICBzbTogMTAsXG4gIG1kOiAxNCxcbiAgbGc6IDIwLFxuICB4bDogMjRcbn1cblxuY29uc3QgZm9ybVR5cGVzID0gWyAnYnV0dG9uJywgJ3N1Ym1pdCcsICdyZXNldCcgXVxuY29uc3QgbWVkaWFUeXBlUkUgPSAvW15cXHNdXFwvW15cXHNdL1xuXG5leHBvcnQgY29uc3QgYnRuRGVzaWduT3B0aW9ucyA9IFsgJ2ZsYXQnLCAnb3V0bGluZScsICdwdXNoJywgJ3VuZWxldmF0ZWQnIF1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEJ0bkRlc2lnbiAocHJvcHMsIGRlZmF1bHRWYWx1ZSkge1xuICBpZiAocHJvcHMuZmxhdCA9PT0gdHJ1ZSkgcmV0dXJuICdmbGF0J1xuICBpZiAocHJvcHMub3V0bGluZSA9PT0gdHJ1ZSkgcmV0dXJuICdvdXRsaW5lJ1xuICBpZiAocHJvcHMucHVzaCA9PT0gdHJ1ZSkgcmV0dXJuICdwdXNoJ1xuICBpZiAocHJvcHMudW5lbGV2YXRlZCA9PT0gdHJ1ZSkgcmV0dXJuICd1bmVsZXZhdGVkJ1xuICByZXR1cm4gZGVmYXVsdFZhbHVlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRCdG5EZXNpZ25BdHRyIChwcm9wcykge1xuICBjb25zdCBkZXNpZ24gPSBnZXRCdG5EZXNpZ24ocHJvcHMpXG4gIHJldHVybiBkZXNpZ24gIT09IHZvaWQgMFxuICAgID8geyBbIGRlc2lnbiBdOiB0cnVlIH1cbiAgICA6IHt9XG59XG5cbmV4cG9ydCBjb25zdCBub25Sb3VuZEJ0blByb3BzID0ge1xuICAuLi51c2VTaXplUHJvcHMsXG4gIC4uLnVzZVJvdXRlckxpbmtOb25NYXRjaGluZ1Byb3BzLFxuXG4gIHR5cGU6IHtcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgZGVmYXVsdDogJ2J1dHRvbidcbiAgfSxcblxuICBsYWJlbDogWyBOdW1iZXIsIFN0cmluZyBdLFxuICBpY29uOiBTdHJpbmcsXG4gIGljb25SaWdodDogU3RyaW5nLFxuXG4gIC4uLmJ0bkRlc2lnbk9wdGlvbnMucmVkdWNlKFxuICAgIChhY2MsIHZhbCkgPT4gKGFjY1sgdmFsIF0gPSBCb29sZWFuKSAmJiBhY2MsXG4gICAge31cbiAgKSxcblxuICBzcXVhcmU6IEJvb2xlYW4sXG4gIHJvdW5kZWQ6IEJvb2xlYW4sXG4gIGdsb3NzeTogQm9vbGVhbixcblxuICBzaXplOiBTdHJpbmcsXG4gIGZhYjogQm9vbGVhbixcbiAgZmFiTWluaTogQm9vbGVhbixcbiAgcGFkZGluZzogU3RyaW5nLFxuXG4gIGNvbG9yOiBTdHJpbmcsXG4gIHRleHRDb2xvcjogU3RyaW5nLFxuICBub0NhcHM6IEJvb2xlYW4sXG4gIG5vV3JhcDogQm9vbGVhbixcbiAgZGVuc2U6IEJvb2xlYW4sXG5cbiAgdGFiaW5kZXg6IFsgTnVtYmVyLCBTdHJpbmcgXSxcblxuICByaXBwbGU6IHtcbiAgICB0eXBlOiBbIEJvb2xlYW4sIE9iamVjdCBdLFxuICAgIGRlZmF1bHQ6IHRydWVcbiAgfSxcblxuICBhbGlnbjoge1xuICAgIC4uLnVzZUFsaWduUHJvcHMuYWxpZ24sXG4gICAgZGVmYXVsdDogJ2NlbnRlcidcbiAgfSxcbiAgc3RhY2s6IEJvb2xlYW4sXG4gIHN0cmV0Y2g6IEJvb2xlYW4sXG4gIGxvYWRpbmc6IHtcbiAgICB0eXBlOiBCb29sZWFuLFxuICAgIGRlZmF1bHQ6IG51bGxcbiAgfSxcbiAgZGlzYWJsZTogQm9vbGVhblxufVxuXG5leHBvcnQgY29uc3QgdXNlQnRuUHJvcHMgPSB7XG4gIC4uLm5vblJvdW5kQnRuUHJvcHMsXG4gIHJvdW5kOiBCb29sZWFuXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcykge1xuICBjb25zdCBzaXplU3R5bGUgPSB1c2VTaXplKHByb3BzLCBkZWZhdWx0U2l6ZXMpXG4gIGNvbnN0IGFsaWduQ2xhc3MgPSB1c2VBbGlnbihwcm9wcylcbiAgY29uc3QgeyBoYXNSb3V0ZXJMaW5rLCBoYXNMaW5rLCBsaW5rVGFnLCBsaW5rQXR0cnMsIG5hdmlnYXRlT25DbGljayB9ID0gdXNlUm91dGVyTGluayh7XG4gICAgZmFsbGJhY2tUYWc6ICdidXR0b24nXG4gIH0pXG5cbiAgY29uc3Qgc3R5bGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgY29uc3Qgb2JqID0gcHJvcHMuZmFiID09PSBmYWxzZSAmJiBwcm9wcy5mYWJNaW5pID09PSBmYWxzZVxuICAgICAgPyBzaXplU3R5bGUudmFsdWVcbiAgICAgIDoge31cblxuICAgIHJldHVybiBwcm9wcy5wYWRkaW5nICE9PSB2b2lkIDBcbiAgICAgID8gT2JqZWN0LmFzc2lnbih7fSwgb2JqLCB7XG4gICAgICAgIHBhZGRpbmc6IHByb3BzLnBhZGRpbmdcbiAgICAgICAgICAuc3BsaXQoL1xccysvKVxuICAgICAgICAgIC5tYXAodiA9PiAodiBpbiBidG5QYWRkaW5nID8gYnRuUGFkZGluZ1sgdiBdICsgJ3B4JyA6IHYpKVxuICAgICAgICAgIC5qb2luKCcgJyksXG4gICAgICAgIG1pbldpZHRoOiAnMCcsXG4gICAgICAgIG1pbkhlaWdodDogJzAnXG4gICAgICB9KVxuICAgICAgOiBvYmpcbiAgfSlcblxuICBjb25zdCBpc1JvdW5kZWQgPSBjb21wdXRlZCgoKSA9PlxuICAgIHByb3BzLnJvdW5kZWQgPT09IHRydWUgfHwgcHJvcHMuZmFiID09PSB0cnVlIHx8IHByb3BzLmZhYk1pbmkgPT09IHRydWVcbiAgKVxuXG4gIGNvbnN0IGlzQWN0aW9uYWJsZSA9IGNvbXB1dGVkKCgpID0+XG4gICAgcHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZSAmJiBwcm9wcy5sb2FkaW5nICE9PSB0cnVlXG4gIClcblxuICBjb25zdCB0YWJJbmRleCA9IGNvbXB1dGVkKCgpID0+IChcbiAgICBpc0FjdGlvbmFibGUudmFsdWUgPT09IHRydWUgPyBwcm9wcy50YWJpbmRleCB8fCAwIDogLTFcbiAgKSlcblxuICBjb25zdCBkZXNpZ24gPSBjb21wdXRlZCgoKSA9PiBnZXRCdG5EZXNpZ24ocHJvcHMsICdzdGFuZGFyZCcpKVxuXG4gIGNvbnN0IGF0dHJpYnV0ZXMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgY29uc3QgYWNjID0geyB0YWJpbmRleDogdGFiSW5kZXgudmFsdWUgfVxuXG4gICAgaWYgKGhhc0xpbmsudmFsdWUgPT09IHRydWUpIHtcbiAgICAgIE9iamVjdC5hc3NpZ24oYWNjLCBsaW5rQXR0cnMudmFsdWUpXG4gICAgfVxuICAgIGVsc2UgaWYgKGZvcm1UeXBlcy5pbmNsdWRlcyhwcm9wcy50eXBlKSA9PT0gdHJ1ZSkge1xuICAgICAgYWNjLnR5cGUgPSBwcm9wcy50eXBlXG4gICAgfVxuXG4gICAgaWYgKGxpbmtUYWcudmFsdWUgPT09ICdhJykge1xuICAgICAgaWYgKHByb3BzLmRpc2FibGUgPT09IHRydWUpIHtcbiAgICAgICAgYWNjWyAnYXJpYS1kaXNhYmxlZCcgXSA9ICd0cnVlJ1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoYWNjLmhyZWYgPT09IHZvaWQgMCkge1xuICAgICAgICBhY2Mucm9sZSA9ICdidXR0b24nXG4gICAgICB9XG5cbiAgICAgIGlmIChoYXNSb3V0ZXJMaW5rLnZhbHVlICE9PSB0cnVlICYmIG1lZGlhVHlwZVJFLnRlc3QocHJvcHMudHlwZSkgPT09IHRydWUpIHtcbiAgICAgICAgYWNjLnR5cGUgPSBwcm9wcy50eXBlXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHByb3BzLmRpc2FibGUgPT09IHRydWUpIHtcbiAgICAgIGFjYy5kaXNhYmxlZCA9ICcnXG4gICAgICBhY2NbICdhcmlhLWRpc2FibGVkJyBdID0gJ3RydWUnXG4gICAgfVxuXG4gICAgaWYgKHByb3BzLmxvYWRpbmcgPT09IHRydWUgJiYgcHJvcHMucGVyY2VudGFnZSAhPT0gdm9pZCAwKSB7XG4gICAgICBPYmplY3QuYXNzaWduKGFjYywge1xuICAgICAgICByb2xlOiAncHJvZ3Jlc3NiYXInLFxuICAgICAgICAnYXJpYS12YWx1ZW1pbic6IDAsXG4gICAgICAgICdhcmlhLXZhbHVlbWF4JzogMTAwLFxuICAgICAgICAnYXJpYS12YWx1ZW5vdyc6IHByb3BzLnBlcmNlbnRhZ2VcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuIGFjY1xuICB9KVxuXG4gIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgbGV0IGNvbG9yc1xuXG4gICAgaWYgKHByb3BzLmNvbG9yICE9PSB2b2lkIDApIHtcbiAgICAgIGlmIChwcm9wcy5mbGF0ID09PSB0cnVlIHx8IHByb3BzLm91dGxpbmUgPT09IHRydWUpIHtcbiAgICAgICAgY29sb3JzID0gYHRleHQtJHsgcHJvcHMudGV4dENvbG9yIHx8IHByb3BzLmNvbG9yIH1gXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY29sb3JzID0gYGJnLSR7IHByb3BzLmNvbG9yIH0gdGV4dC0keyBwcm9wcy50ZXh0Q29sb3IgfHwgJ3doaXRlJyB9YFxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChwcm9wcy50ZXh0Q29sb3IpIHtcbiAgICAgIGNvbG9ycyA9IGB0ZXh0LSR7IHByb3BzLnRleHRDb2xvciB9YFxuICAgIH1cblxuICAgIGNvbnN0IHNoYXBlID0gcHJvcHMucm91bmQgPT09IHRydWVcbiAgICAgID8gJ3JvdW5kJ1xuICAgICAgOiBgcmVjdGFuZ2xlJHsgaXNSb3VuZGVkLnZhbHVlID09PSB0cnVlID8gJyBxLWJ0bi0tcm91bmRlZCcgOiAocHJvcHMuc3F1YXJlID09PSB0cnVlID8gJyBxLWJ0bi0tc3F1YXJlJyA6ICcnKSB9YFxuXG4gICAgcmV0dXJuIGBxLWJ0bi0tJHsgZGVzaWduLnZhbHVlIH0gcS1idG4tLSR7IHNoYXBlIH1gXG4gICAgICArIChjb2xvcnMgIT09IHZvaWQgMCA/ICcgJyArIGNvbG9ycyA6ICcnKVxuICAgICAgKyAoaXNBY3Rpb25hYmxlLnZhbHVlID09PSB0cnVlID8gJyBxLWJ0bi0tYWN0aW9uYWJsZSBxLWZvY3VzYWJsZSBxLWhvdmVyYWJsZScgOiAocHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSA/ICcgZGlzYWJsZWQnIDogJycpKVxuICAgICAgKyAocHJvcHMuZmFiID09PSB0cnVlID8gJyBxLWJ0bi0tZmFiJyA6IChwcm9wcy5mYWJNaW5pID09PSB0cnVlID8gJyBxLWJ0bi0tZmFiLW1pbmknIDogJycpKVxuICAgICAgKyAocHJvcHMubm9DYXBzID09PSB0cnVlID8gJyBxLWJ0bi0tbm8tdXBwZXJjYXNlJyA6ICcnKVxuICAgICAgKyAocHJvcHMuZGVuc2UgPT09IHRydWUgPyAnIHEtYnRuLS1kZW5zZScgOiAnJylcbiAgICAgICsgKHByb3BzLnN0cmV0Y2ggPT09IHRydWUgPyAnIG5vLWJvcmRlci1yYWRpdXMgc2VsZi1zdHJldGNoJyA6ICcnKVxuICAgICAgKyAocHJvcHMuZ2xvc3N5ID09PSB0cnVlID8gJyBnbG9zc3knIDogJycpXG4gICAgICArIChwcm9wcy5zcXVhcmUgPyAnIHEtYnRuLS1zcXVhcmUnIDogJycpXG4gIH0pXG5cbiAgY29uc3QgaW5uZXJDbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICBhbGlnbkNsYXNzLnZhbHVlICsgKHByb3BzLnN0YWNrID09PSB0cnVlID8gJyBjb2x1bW4nIDogJyByb3cnKVxuICAgICsgKHByb3BzLm5vV3JhcCA9PT0gdHJ1ZSA/ICcgbm8td3JhcCB0ZXh0LW5vLXdyYXAnIDogJycpXG4gICAgKyAocHJvcHMubG9hZGluZyA9PT0gdHJ1ZSA/ICcgcS1idG5fX2NvbnRlbnQtLWhpZGRlbicgOiAnJylcbiAgKVxuXG4gIHJldHVybiB7XG4gICAgY2xhc3NlcyxcbiAgICBzdHlsZSxcbiAgICBpbm5lckNsYXNzZXMsXG4gICAgYXR0cmlidXRlcyxcbiAgICBoYXNMaW5rLFxuICAgIGxpbmtUYWcsXG4gICAgbmF2aWdhdGVPbkNsaWNrLFxuICAgIGlzQWN0aW9uYWJsZVxuICB9XG59XG4iLCJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCBUcmFuc2l0aW9uLCBvbkJlZm9yZVVubW91bnQsIHdpdGhEaXJlY3RpdmVzLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRSWNvbiBmcm9tICcuLi9pY29uL1FJY29uLmpzJ1xuaW1wb3J0IFFTcGlubmVyIGZyb20gJy4uL3NwaW5uZXIvUVNwaW5uZXIuanMnXG5cbmltcG9ydCBSaXBwbGUgZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9yaXBwbGUvUmlwcGxlLmpzJ1xuXG5pbXBvcnQgdXNlQnRuLCB7IHVzZUJ0blByb3BzIH0gZnJvbSAnLi91c2UtYnRuLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoTWVyZ2VTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5yZW5kZXIvcmVuZGVyLmpzJ1xuaW1wb3J0IHsgc3RvcCwgcHJldmVudCwgc3RvcEFuZFByZXZlbnQsIGxpc3Rlbk9wdHMgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC9ldmVudC5qcydcbmltcG9ydCB7IGlzS2V5Q29kZSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUua2V5Ym9hcmQva2V5LWNvbXBvc2l0aW9uLmpzJ1xuXG5jb25zdCB7IHBhc3NpdmVDYXB0dXJlIH0gPSBsaXN0ZW5PcHRzXG5cbmxldFxuICB0b3VjaFRhcmdldCA9IG51bGwsXG4gIGtleWJvYXJkVGFyZ2V0ID0gbnVsbCxcbiAgbW91c2VUYXJnZXQgPSBudWxsXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRQnRuJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZUJ0blByb3BzLFxuXG4gICAgcGVyY2VudGFnZTogTnVtYmVyLFxuICAgIGRhcmtQZXJjZW50YWdlOiBCb29sZWFuLFxuXG4gICAgb25Ub3VjaHN0YXJ0OiBbIEZ1bmN0aW9uLCBBcnJheSBdXG4gIH0sXG5cbiAgZW1pdHM6IFsgJ2NsaWNrJywgJ2tleWRvd24nLCAnbW91c2Vkb3duJywgJ2tleXVwJyBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCB9KSB7XG4gICAgY29uc3QgeyBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIGNvbnN0IHtcbiAgICAgIGNsYXNzZXMsIHN0eWxlLCBpbm5lckNsYXNzZXMsXG4gICAgICBhdHRyaWJ1dGVzLFxuICAgICAgaGFzTGluaywgbGlua1RhZywgbmF2aWdhdGVPbkNsaWNrLFxuICAgICAgaXNBY3Rpb25hYmxlXG4gICAgfSA9IHVzZUJ0bihwcm9wcylcblxuICAgIGNvbnN0IHJvb3RSZWYgPSByZWYobnVsbClcbiAgICBjb25zdCBibHVyVGFyZ2V0UmVmID0gcmVmKG51bGwpXG5cbiAgICBsZXQgbG9jYWxUb3VjaFRhcmdldEVsID0gbnVsbCwgYXZvaWRNb3VzZVJpcHBsZSwgbW91c2VUaW1lciA9IG51bGxcblxuICAgIGNvbnN0IGhhc0xhYmVsID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLmxhYmVsICE9PSB2b2lkIDAgJiYgcHJvcHMubGFiZWwgIT09IG51bGwgJiYgcHJvcHMubGFiZWwgIT09ICcnXG4gICAgKVxuXG4gICAgY29uc3QgcmlwcGxlID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSB8fCBwcm9wcy5yaXBwbGUgPT09IGZhbHNlXG4gICAgICAgID8gZmFsc2VcbiAgICAgICAgOiB7XG4gICAgICAgICAgICBrZXlDb2RlczogaGFzTGluay52YWx1ZSA9PT0gdHJ1ZSA/IFsgMTMsIDMyIF0gOiBbIDEzIF0sXG4gICAgICAgICAgICAuLi4ocHJvcHMucmlwcGxlID09PSB0cnVlID8ge30gOiBwcm9wcy5yaXBwbGUpXG4gICAgICAgICAgfVxuICAgICkpXG5cbiAgICBjb25zdCByaXBwbGVQcm9wcyA9IGNvbXB1dGVkKCgpID0+ICh7IGNlbnRlcjogcHJvcHMucm91bmQgfSkpXG5cbiAgICBjb25zdCBwZXJjZW50YWdlU3R5bGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCB2YWwgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxMDAsIHByb3BzLnBlcmNlbnRhZ2UpKVxuICAgICAgcmV0dXJuIHZhbCA+IDBcbiAgICAgICAgPyB7IHRyYW5zaXRpb246ICd0cmFuc2Zvcm0gMC42cycsIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVgoJHsgdmFsIC0gMTAwIH0lKWAgfVxuICAgICAgICA6IHt9XG4gICAgfSlcblxuICAgIGNvbnN0IG9uRXZlbnRzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgaWYgKHByb3BzLmxvYWRpbmcgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBvbk1vdXNlZG93bjogb25Mb2FkaW5nRXZ0LFxuICAgICAgICAgIG9uVG91Y2hzdGFydDogb25Mb2FkaW5nRXZ0LFxuICAgICAgICAgIG9uQ2xpY2s6IG9uTG9hZGluZ0V2dCxcbiAgICAgICAgICBvbktleWRvd246IG9uTG9hZGluZ0V2dCxcbiAgICAgICAgICBvbktleXVwOiBvbkxvYWRpbmdFdnRcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoaXNBY3Rpb25hYmxlLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IGFjYyA9IHtcbiAgICAgICAgICBvbkNsaWNrLFxuICAgICAgICAgIG9uS2V5ZG93bixcbiAgICAgICAgICBvbk1vdXNlZG93blxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb3h5LiRxLnBsYXRmb3JtLmhhcy50b3VjaCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNvbnN0IHN1ZmZpeCA9IHByb3BzLm9uVG91Y2hzdGFydCAhPT0gdm9pZCAwXG4gICAgICAgICAgICA/ICcnXG4gICAgICAgICAgICA6ICdQYXNzaXZlJ1xuXG4gICAgICAgICAgYWNjWyBgb25Ub3VjaHN0YXJ0JHsgc3VmZml4IH1gIF0gPSBvblRvdWNoc3RhcnRcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhY2NcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLy8gbmVlZGVkOyBlc3BlY2lhbGx5IGZvciBkaXNhYmxlZCA8YT4gdGFnc1xuICAgICAgICBvbkNsaWNrOiBzdG9wQW5kUHJldmVudFxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCBub2RlUHJvcHMgPSBjb21wdXRlZCgoKSA9PiAoe1xuICAgICAgcmVmOiByb290UmVmLFxuICAgICAgY2xhc3M6ICdxLWJ0biBxLWJ0bi1pdGVtIG5vbi1zZWxlY3RhYmxlIG5vLW91dGxpbmUgJyArIGNsYXNzZXMudmFsdWUsXG4gICAgICBzdHlsZTogc3R5bGUudmFsdWUsXG4gICAgICAuLi5hdHRyaWJ1dGVzLnZhbHVlLFxuICAgICAgLi4ub25FdmVudHMudmFsdWVcbiAgICB9KSlcblxuICAgIGZ1bmN0aW9uIG9uQ2xpY2sgKGUpIHtcbiAgICAgIC8vIGlzIGl0IGFscmVhZHkgZGVzdHJveWVkP1xuICAgICAgaWYgKHJvb3RSZWYudmFsdWUgPT09IG51bGwpIHJldHVyblxuXG4gICAgICBpZiAoZSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGlmIChlLmRlZmF1bHRQcmV2ZW50ZWQgPT09IHRydWUpIHJldHVyblxuXG4gICAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudFxuICAgICAgICAvLyBmb2N1cyBidXR0b24gaWYgaXQgY2FtZSBmcm9tIEVOVEVSIG9uIGZvcm1cbiAgICAgICAgLy8gcHJldmVudCB0aGUgbmV3IHN1Ym1pdCAoYWxyZWFkeSBkb25lKVxuICAgICAgICBpZiAoXG4gICAgICAgICAgcHJvcHMudHlwZSA9PT0gJ3N1Ym1pdCdcbiAgICAgICAgICAmJiBlbCAhPT0gZG9jdW1lbnQuYm9keVxuICAgICAgICAgICYmIHJvb3RSZWYudmFsdWUuY29udGFpbnMoZWwpID09PSBmYWxzZVxuICAgICAgICAgIC8vIHJlcXVpcmVkIGZvciBpT1MgYW5kIGRlc2t0b3AgU2FmYXJpXG4gICAgICAgICAgJiYgZWwuY29udGFpbnMocm9vdFJlZi52YWx1ZSkgPT09IGZhbHNlXG4gICAgICAgICkge1xuICAgICAgICAgIGUucUF2b2lkRm9jdXMgIT09IHRydWUgJiYgcm9vdFJlZi52YWx1ZS5mb2N1cygpXG5cbiAgICAgICAgICBjb25zdCBvbkNsaWNrQ2xlYW51cCA9ICgpID0+IHtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBzdG9wQW5kUHJldmVudCwgdHJ1ZSlcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgb25DbGlja0NsZWFudXAsIHBhc3NpdmVDYXB0dXJlKVxuICAgICAgICAgICAgcm9vdFJlZi52YWx1ZT8ucmVtb3ZlRXZlbnRMaXN0ZW5lcignYmx1cicsIG9uQ2xpY2tDbGVhbnVwLCBwYXNzaXZlQ2FwdHVyZSlcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgc3RvcEFuZFByZXZlbnQsIHRydWUpXG4gICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBvbkNsaWNrQ2xlYW51cCwgcGFzc2l2ZUNhcHR1cmUpXG4gICAgICAgICAgcm9vdFJlZi52YWx1ZS5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgb25DbGlja0NsZWFudXAsIHBhc3NpdmVDYXB0dXJlKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG5hdmlnYXRlT25DbGljayhlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uS2V5ZG93biAoZSkge1xuICAgICAgLy8gaXMgaXQgYWxyZWFkeSBkZXN0cm95ZWQ/XG4gICAgICBpZiAocm9vdFJlZi52YWx1ZSA9PT0gbnVsbCkgcmV0dXJuXG5cbiAgICAgIGVtaXQoJ2tleWRvd24nLCBlKVxuXG4gICAgICBpZiAoaXNLZXlDb2RlKGUsIFsgMTMsIDMyIF0pID09PSB0cnVlICYmIGtleWJvYXJkVGFyZ2V0ICE9PSByb290UmVmLnZhbHVlKSB7XG4gICAgICAgIGtleWJvYXJkVGFyZ2V0ICE9PSBudWxsICYmIGNsZWFudXAoKVxuXG4gICAgICAgIGlmIChlLmRlZmF1bHRQcmV2ZW50ZWQgIT09IHRydWUpIHtcbiAgICAgICAgICAvLyBmb2N1cyBleHRlcm5hbCBidXR0b24gaWYgdGhlIGZvY3VzIGhlbHBlciB3YXMgZm9jdXNlZCBiZWZvcmVcbiAgICAgICAgICBlLnFBdm9pZEZvY3VzICE9PSB0cnVlICYmIHJvb3RSZWYudmFsdWUuZm9jdXMoKVxuXG4gICAgICAgICAga2V5Ym9hcmRUYXJnZXQgPSByb290UmVmLnZhbHVlXG4gICAgICAgICAgcm9vdFJlZi52YWx1ZS5jbGFzc0xpc3QuYWRkKCdxLWJ0bi0tYWN0aXZlJylcbiAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIG9uUHJlc3NFbmQsIHRydWUpXG4gICAgICAgICAgcm9vdFJlZi52YWx1ZS5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgb25QcmVzc0VuZCwgcGFzc2l2ZUNhcHR1cmUpXG4gICAgICAgIH1cblxuICAgICAgICBzdG9wQW5kUHJldmVudChlKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uVG91Y2hzdGFydCAoZSkge1xuICAgICAgLy8gaXMgaXQgYWxyZWFkeSBkZXN0cm95ZWQ/XG4gICAgICBpZiAocm9vdFJlZi52YWx1ZSA9PT0gbnVsbCkgcmV0dXJuXG5cbiAgICAgIGVtaXQoJ3RvdWNoc3RhcnQnLCBlKVxuXG4gICAgICBpZiAoZS5kZWZhdWx0UHJldmVudGVkID09PSB0cnVlKSByZXR1cm5cblxuICAgICAgaWYgKHRvdWNoVGFyZ2V0ICE9PSByb290UmVmLnZhbHVlKSB7XG4gICAgICAgIHRvdWNoVGFyZ2V0ICE9PSBudWxsICYmIGNsZWFudXAoKVxuICAgICAgICB0b3VjaFRhcmdldCA9IHJvb3RSZWYudmFsdWVcblxuICAgICAgICBsb2NhbFRvdWNoVGFyZ2V0RWwgPSBlLnRhcmdldFxuICAgICAgICBsb2NhbFRvdWNoVGFyZ2V0RWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCBvblByZXNzRW5kLCBwYXNzaXZlQ2FwdHVyZSlcbiAgICAgICAgbG9jYWxUb3VjaFRhcmdldEVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgb25QcmVzc0VuZCwgcGFzc2l2ZUNhcHR1cmUpXG4gICAgICB9XG5cbiAgICAgIC8vIGF2b2lkIGR1cGxpY2F0ZWQgbW91c2Vkb3duIGV2ZW50XG4gICAgICAvLyB0cmlnZ2VyaW5nIGFub3RoZXIgZWFybHkgcmlwcGxlXG4gICAgICBhdm9pZE1vdXNlUmlwcGxlID0gdHJ1ZVxuICAgICAgbW91c2VUaW1lciAhPT0gbnVsbCAmJiBjbGVhclRpbWVvdXQobW91c2VUaW1lcilcbiAgICAgIG1vdXNlVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgbW91c2VUaW1lciA9IG51bGxcbiAgICAgICAgYXZvaWRNb3VzZVJpcHBsZSA9IGZhbHNlXG4gICAgICB9LCAyMDApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Nb3VzZWRvd24gKGUpIHtcbiAgICAgIC8vIGlzIGl0IGFscmVhZHkgZGVzdHJveWVkP1xuICAgICAgaWYgKHJvb3RSZWYudmFsdWUgPT09IG51bGwpIHJldHVyblxuXG4gICAgICBlLnFTa2lwUmlwcGxlID0gYXZvaWRNb3VzZVJpcHBsZSA9PT0gdHJ1ZVxuICAgICAgZW1pdCgnbW91c2Vkb3duJywgZSlcblxuICAgICAgaWYgKGUuZGVmYXVsdFByZXZlbnRlZCAhPT0gdHJ1ZSAmJiBtb3VzZVRhcmdldCAhPT0gcm9vdFJlZi52YWx1ZSkge1xuICAgICAgICBtb3VzZVRhcmdldCAhPT0gbnVsbCAmJiBjbGVhbnVwKClcbiAgICAgICAgbW91c2VUYXJnZXQgPSByb290UmVmLnZhbHVlXG4gICAgICAgIHJvb3RSZWYudmFsdWUuY2xhc3NMaXN0LmFkZCgncS1idG4tLWFjdGl2ZScpXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBvblByZXNzRW5kLCBwYXNzaXZlQ2FwdHVyZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblByZXNzRW5kIChlKSB7XG4gICAgICAvLyBpcyBpdCBhbHJlYWR5IGRlc3Ryb3llZD9cbiAgICAgIGlmIChyb290UmVmLnZhbHVlID09PSBudWxsKSByZXR1cm5cblxuICAgICAgLy8gbmVlZGVkIGZvciBJRSAoYmVjYXVzZSBpdCBlbWl0cyBibHVyIHdoZW4gZm9jdXNpbmcgYnV0dG9uIGZyb20gZm9jdXMgaGVscGVyKVxuICAgICAgaWYgKFxuICAgICAgICBlPy50eXBlID09PSAnYmx1cidcbiAgICAgICAgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gcm9vdFJlZi52YWx1ZVxuICAgICAgKSByZXR1cm5cblxuICAgICAgaWYgKGU/LnR5cGUgPT09ICdrZXl1cCcpIHtcbiAgICAgICAgaWYgKGtleWJvYXJkVGFyZ2V0ID09PSByb290UmVmLnZhbHVlICYmIGlzS2V5Q29kZShlLCBbIDEzLCAzMiBdKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIC8vIGZvciBjbGljayB0cmlnZ2VyXG4gICAgICAgICAgY29uc3QgZXZ0ID0gbmV3IE1vdXNlRXZlbnQoJ2NsaWNrJywgZSlcbiAgICAgICAgICBldnQucUtleUV2ZW50ID0gdHJ1ZVxuICAgICAgICAgIGUuZGVmYXVsdFByZXZlbnRlZCA9PT0gdHJ1ZSAmJiBwcmV2ZW50KGV2dClcbiAgICAgICAgICBlLmNhbmNlbEJ1YmJsZSA9PT0gdHJ1ZSAmJiBzdG9wKGV2dClcbiAgICAgICAgICByb290UmVmLnZhbHVlLmRpc3BhdGNoRXZlbnQoZXZ0KVxuXG4gICAgICAgICAgc3RvcEFuZFByZXZlbnQoZSlcblxuICAgICAgICAgIC8vIGZvciByaXBwbGVcbiAgICAgICAgICBlLnFLZXlFdmVudCA9IHRydWVcbiAgICAgICAgfVxuXG4gICAgICAgIGVtaXQoJ2tleXVwJywgZSlcbiAgICAgIH1cblxuICAgICAgY2xlYW51cCgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYW51cCAoZGVzdHJveWluZykge1xuICAgICAgY29uc3QgYmx1clRhcmdldCA9IGJsdXJUYXJnZXRSZWYudmFsdWVcblxuICAgICAgaWYgKFxuICAgICAgICBkZXN0cm95aW5nICE9PSB0cnVlXG4gICAgICAgICYmICh0b3VjaFRhcmdldCA9PT0gcm9vdFJlZi52YWx1ZSB8fCBtb3VzZVRhcmdldCA9PT0gcm9vdFJlZi52YWx1ZSlcbiAgICAgICAgJiYgYmx1clRhcmdldCAhPT0gbnVsbFxuICAgICAgICAmJiBibHVyVGFyZ2V0ICE9PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50XG4gICAgICApIHtcbiAgICAgICAgYmx1clRhcmdldC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgLTEpXG4gICAgICAgIGJsdXJUYXJnZXQuZm9jdXMoKVxuICAgICAgfVxuXG4gICAgICBpZiAodG91Y2hUYXJnZXQgPT09IHJvb3RSZWYudmFsdWUpIHtcbiAgICAgICAgaWYgKGxvY2FsVG91Y2hUYXJnZXRFbCAhPT0gbnVsbCkge1xuICAgICAgICAgIGxvY2FsVG91Y2hUYXJnZXRFbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIG9uUHJlc3NFbmQsIHBhc3NpdmVDYXB0dXJlKVxuICAgICAgICAgIGxvY2FsVG91Y2hUYXJnZXRFbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIG9uUHJlc3NFbmQsIHBhc3NpdmVDYXB0dXJlKVxuICAgICAgICB9XG4gICAgICAgIHRvdWNoVGFyZ2V0ID0gbG9jYWxUb3VjaFRhcmdldEVsID0gbnVsbFxuICAgICAgfVxuXG4gICAgICBpZiAobW91c2VUYXJnZXQgPT09IHJvb3RSZWYudmFsdWUpIHtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG9uUHJlc3NFbmQsIHBhc3NpdmVDYXB0dXJlKVxuICAgICAgICBtb3VzZVRhcmdldCA9IG51bGxcbiAgICAgIH1cblxuICAgICAgaWYgKGtleWJvYXJkVGFyZ2V0ID09PSByb290UmVmLnZhbHVlKSB7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgb25QcmVzc0VuZCwgdHJ1ZSlcbiAgICAgICAgcm9vdFJlZi52YWx1ZT8ucmVtb3ZlRXZlbnRMaXN0ZW5lcignYmx1cicsIG9uUHJlc3NFbmQsIHBhc3NpdmVDYXB0dXJlKVxuICAgICAgICBrZXlib2FyZFRhcmdldCA9IG51bGxcbiAgICAgIH1cblxuICAgICAgcm9vdFJlZi52YWx1ZT8uY2xhc3NMaXN0LnJlbW92ZSgncS1idG4tLWFjdGl2ZScpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Mb2FkaW5nRXZ0IChldnQpIHtcbiAgICAgIHN0b3BBbmRQcmV2ZW50KGV2dClcbiAgICAgIGV2dC5xU2tpcFJpcHBsZSA9IHRydWVcbiAgICB9XG5cbiAgICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgICAgY2xlYW51cCh0cnVlKVxuICAgIH0pXG5cbiAgICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHNcbiAgICBPYmplY3QuYXNzaWduKHByb3h5LCB7XG4gICAgICBjbGljazogZSA9PiB7XG4gICAgICAgIGlmIChpc0FjdGlvbmFibGUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICBvbkNsaWNrKGUpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGxldCBpbm5lciA9IFtdXG5cbiAgICAgIHByb3BzLmljb24gIT09IHZvaWQgMCAmJiBpbm5lci5wdXNoKFxuICAgICAgICBoKFFJY29uLCB7XG4gICAgICAgICAgbmFtZTogcHJvcHMuaWNvbixcbiAgICAgICAgICBsZWZ0OiBwcm9wcy5zdGFjayAhPT0gdHJ1ZSAmJiBoYXNMYWJlbC52YWx1ZSA9PT0gdHJ1ZSxcbiAgICAgICAgICByb2xlOiAnaW1nJ1xuICAgICAgICB9KVxuICAgICAgKVxuXG4gICAgICBoYXNMYWJlbC52YWx1ZSA9PT0gdHJ1ZSAmJiBpbm5lci5wdXNoKFxuICAgICAgICBoKCdzcGFuJywgeyBjbGFzczogJ2Jsb2NrJyB9LCBbIHByb3BzLmxhYmVsIF0pXG4gICAgICApXG5cbiAgICAgIGlubmVyID0gaE1lcmdlU2xvdChzbG90cy5kZWZhdWx0LCBpbm5lcilcblxuICAgICAgaWYgKHByb3BzLmljb25SaWdodCAhPT0gdm9pZCAwICYmIHByb3BzLnJvdW5kID09PSBmYWxzZSkge1xuICAgICAgICBpbm5lci5wdXNoKFxuICAgICAgICAgIGgoUUljb24sIHtcbiAgICAgICAgICAgIG5hbWU6IHByb3BzLmljb25SaWdodCxcbiAgICAgICAgICAgIHJpZ2h0OiBwcm9wcy5zdGFjayAhPT0gdHJ1ZSAmJiBoYXNMYWJlbC52YWx1ZSA9PT0gdHJ1ZSxcbiAgICAgICAgICAgIHJvbGU6ICdpbWcnXG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBjaGlsZCA9IFtcbiAgICAgICAgaCgnc3BhbicsIHtcbiAgICAgICAgICBjbGFzczogJ3EtZm9jdXMtaGVscGVyJyxcbiAgICAgICAgICByZWY6IGJsdXJUYXJnZXRSZWZcbiAgICAgICAgfSlcbiAgICAgIF1cblxuICAgICAgaWYgKHByb3BzLmxvYWRpbmcgPT09IHRydWUgJiYgcHJvcHMucGVyY2VudGFnZSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGNoaWxkLnB1c2goXG4gICAgICAgICAgaCgnc3BhbicsIHtcbiAgICAgICAgICAgIGNsYXNzOiAncS1idG5fX3Byb2dyZXNzIGFic29sdXRlLWZ1bGwgb3ZlcmZsb3ctaGlkZGVuJyArIChwcm9wcy5kYXJrUGVyY2VudGFnZSA9PT0gdHJ1ZSA/ICcgcS1idG5fX3Byb2dyZXNzLS1kYXJrJyA6ICcnKVxuICAgICAgICAgIH0sIFtcbiAgICAgICAgICAgIGgoJ3NwYW4nLCB7XG4gICAgICAgICAgICAgIGNsYXNzOiAncS1idG5fX3Byb2dyZXNzLWluZGljYXRvciBmaXQgYmxvY2snLFxuICAgICAgICAgICAgICBzdHlsZTogcGVyY2VudGFnZVN0eWxlLnZhbHVlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF0pXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgaCgnc3BhbicsIHtcbiAgICAgICAgICBjbGFzczogJ3EtYnRuX19jb250ZW50IHRleHQtY2VudGVyIGNvbCBpdGVtcy1jZW50ZXIgcS1hbmNob3ItLXNraXAgJyArIGlubmVyQ2xhc3Nlcy52YWx1ZVxuICAgICAgICB9LCBpbm5lcilcbiAgICAgIClcblxuICAgICAgcHJvcHMubG9hZGluZyAhPT0gbnVsbCAmJiBjaGlsZC5wdXNoKFxuICAgICAgICBoKFRyYW5zaXRpb24sIHtcbiAgICAgICAgICBuYW1lOiAncS10cmFuc2l0aW9uLS1mYWRlJ1xuICAgICAgICB9LCAoKSA9PiAoXG4gICAgICAgICAgcHJvcHMubG9hZGluZyA9PT0gdHJ1ZVxuICAgICAgICAgICAgPyBbXG4gICAgICAgICAgICAgICAgaCgnc3BhbicsIHtcbiAgICAgICAgICAgICAgICAgIGtleTogJ2xvYWRpbmcnLFxuICAgICAgICAgICAgICAgICAgY2xhc3M6ICdhYnNvbHV0ZS1mdWxsIGZsZXggZmxleC1jZW50ZXInXG4gICAgICAgICAgICAgICAgfSwgc2xvdHMubG9hZGluZyAhPT0gdm9pZCAwID8gc2xvdHMubG9hZGluZygpIDogWyBoKFFTcGlubmVyKSBdKVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICA6IG51bGxcbiAgICAgICAgKSlcbiAgICAgIClcblxuICAgICAgcmV0dXJuIHdpdGhEaXJlY3RpdmVzKFxuICAgICAgICBoKFxuICAgICAgICAgIGxpbmtUYWcudmFsdWUsXG4gICAgICAgICAgbm9kZVByb3BzLnZhbHVlLFxuICAgICAgICAgIGNoaWxkXG4gICAgICAgICksXG4gICAgICAgIFsgW1xuICAgICAgICAgIFJpcHBsZSxcbiAgICAgICAgICByaXBwbGUudmFsdWUsXG4gICAgICAgICAgdm9pZCAwLFxuICAgICAgICAgIHJpcHBsZVByb3BzLnZhbHVlXG4gICAgICAgIF0gXVxuICAgICAgKVxuICAgIH1cbiAgfVxufSlcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVPLE1BQU0sV0FBVztBQUFBLEVBQ3RCLE1BQU07QUFBQSxFQUNOLFFBQVE7QUFBQSxFQUNSLE9BQU87QUFBQSxFQUNQLFNBQVM7QUFBQSxFQUNULFFBQVE7QUFBQSxFQUNSLFFBQVE7QUFBQSxFQUNSLFNBQVM7QUFDWDtBQUVPLE1BQU0sY0FBYyxPQUFPLEtBQUssUUFBUTtBQUV4QyxNQUFNLGdCQUFnQjtBQUFBLEVBQzNCLE9BQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLFdBQVcsT0FBSyxZQUFZLFNBQVMsQ0FBQztBQUFBLEVBQzFDO0FBQ0E7QUFFZSxTQUFRLFNBQUUsT0FBTztBQUU5QixTQUFPLFNBQVMsTUFBTTtBQUNwQixVQUFNLFFBQVEsTUFBTSxVQUFVLFNBQzFCLE1BQU0s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
