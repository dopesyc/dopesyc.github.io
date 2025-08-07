import { c as createComponent, g as getCurrentInstance, i as inject, e as emptyRenderFn, l as layoutKey, L as pageContainerKey, a as computed, h, b as hSlot, r as ref, B as useTimeout, S as isRuntimeSsrPreHydration, H as onMounted, aL as Transition, am as QSpinner, w as watch, aM as vmIsDestroyed, aN as tabsKey, o as onBeforeUnmount, I as withDirectives, aO as Ripple, ah as QIcon, V as hMergeSlot, aP as isKeyCode, aQ as shouldIgnoreKey, v as stopAndPrevent, aI as useTick, Y as onDeactivated, Z as onActivated, K as provide, y as useDarkProps, A as useDark, f as createDirective, j as cleanEvt, k as client, p as preventDraggable, n as noop, m as addEvt, q as position, u as leftClick, aR as getNormalizedVNodes, aS as KeepAlive, aT as timelineKey, d as hUniqueSlot, J as hDir, $ as _export_sfc, ae as createBlock, a1 as openBlock, a5 as withCtx, aa as createCommentVNode, a4 as createVNode, a7 as QCard, af as QCardSection, a2 as createBaseVNode, a6 as toDisplayString, ad as QBtn, a0 as createElementBlock, a8 as Fragment, a9 as renderList, al as QSeparator, ac as createTextVNode, ab as normalizeClass, au as QCheckbox, at as QCardActions, ak as QDialog, ai as useQuasar } from "./index-DtVXev-T.js";
import { x as rtlHasScrollBug, Q as QResizeObserver, g as getModifierDirections, c as clearSelection, s as shouldStart, C as ClosePopup, f as QItem, h as QItemSection, i as QItemLabel, a as QChip, b as QSelect, d as QSpace, u as useScheduleStore } from "./QSelect-DP4GbAuv.js";
const QPage = createComponent({
  name: "QPage",
  props: {
    padding: Boolean,
    styleFn: Function
  },
  setup(props, { slots }) {
    const { proxy: { $q } } = getCurrentInstance();
    const $layout = inject(layoutKey, emptyRenderFn);
    if ($layout === emptyRenderFn) {
      console.error("QPage needs to be a deep child of QLayout");
      return emptyRenderFn;
    }
    const $pageContainer = inject(pageContainerKey, emptyRenderFn);
    if ($pageContainer === emptyRenderFn) {
      console.error("QPage needs to be child of QPageContainer");
      return emptyRenderFn;
    }
    const style = computed(() => {
      const offset = ($layout.header.space === true ? $layout.header.size : 0) + ($layout.footer.space === true ? $layout.footer.size : 0);
      if (typeof props.styleFn === "function") {
        const height = $layout.isContainer.value === true ? $layout.containerHeight.value : $q.screen.height;
        return props.styleFn(offset, height);
      }
      return {
        minHeight: $layout.isContainer.value === true ? $layout.containerHeight.value - offset + "px" : $q.screen.height === 0 ? offset !== 0 ? `calc(100vh - ${offset}px)` : "100vh" : $q.screen.height - offset + "px"
      };
    });
    const classes = computed(
      () => `q-page${props.padding === true ? " q-layout-padding" : ""}`
    );
    return () => h("main", {
      class: classes.value,
      style: style.value
    }, hSlot(slots.default));
  }
});
const useRatioProps = {
  ratio: [String, Number]
};
function useRatio(props, naturalRatio) {
  return computed(() => {
    const ratio = Number(
      props.ratio || (naturalRatio !== void 0 ? naturalRatio.value : void 0)
    );
    return isNaN(ratio) !== true && ratio > 0 ? { paddingBottom: `${100 / ratio}%` } : null;
  });
}
const defaultRatio = 1.7778;
const QImg = createComponent({
  name: "QImg",
  props: {
    ...useRatioProps,
    src: String,
    srcset: String,
    sizes: String,
    alt: String,
    crossorigin: String,
    decoding: String,
    referrerpolicy: String,
    draggable: Boolean,
    loading: {
      type: String,
      default: "lazy"
    },
    loadingShowDelay: {
      type: [Number, String],
      default: 0
    },
    fetchpriority: {
      type: String,
      default: "auto"
    },
    width: String,
    height: String,
    initialRatio: {
      type: [Number, String],
      default: defaultRatio
    },
    placeholderSrc: String,
    errorSrc: String,
    fit: {
      type: String,
      default: "cover"
    },
    position: {
      type: String,
      default: "50% 50%"
    },
    imgClass: String,
    imgStyle: Object,
    noSpinner: Boolean,
    noNativeMenu: Boolean,
    noTransition: Boolean,
    spinnerColor: String,
    spinnerSize: String
  },
  emits: ["load", "error"],
  setup(props, { slots, emit }) {
    const naturalRatio = ref(props.initialRatio);
    const ratioStyle = useRatio(props, naturalRatio);
    const vm = getCurrentInstance();
    const { registerTimeout: registerLoadTimeout, removeTimeout: removeLoadTimeout } = useTimeout();
    const { registerTimeout: registerLoadShowTimeout, removeTimeout: removeLoadShowTimeout } = useTimeout();
    const placeholderImg = computed(() => props.placeholderSrc !== void 0 ? { src: props.placeholderSrc } : null);
    const errorImg = computed(() => props.errorSrc !== void 0 ? { src: props.errorSrc, __qerror: true } : null);
    const images = [
      ref(null),
      ref(placeholderImg.value)
    ];
    const position2 = ref(0);
    const isLoading = ref(false);
    const hasError = ref(false);
    const classes = computed(
      () => `q-img q-img--${props.noNativeMenu === true ? "no-" : ""}menu`
    );
    const style = computed(() => ({
      width: props.width,
      height: props.height
    }));
    const imgClass = computed(
      () => `q-img__image ${props.imgClass !== void 0 ? props.imgClass + " " : ""}q-img__image--with${props.noTransition === true ? "out" : ""}-transition q-img__image--`
    );
    const imgStyle = computed(() => ({
      ...props.imgStyle,
      objectFit: props.fit,
      objectPosition: props.position
    }));
    function setLoading() {
      removeLoadShowTimeout();
      if (props.loadingShowDelay === 0) {
        isLoading.value = true;
        return;
      }
      registerLoadShowTimeout(() => {
        isLoading.value = true;
      }, props.loadingShowDelay);
    }
    function clearLoading() {
      removeLoadShowTimeout();
      isLoading.value = false;
    }
    function onLoad({ target }) {
      if (vmIsDestroyed(vm) === false) {
        removeLoadTimeout();
        naturalRatio.value = target.naturalHeight === 0 ? 0.5 : target.naturalWidth / target.naturalHeight;
        waitForCompleteness(target, 1);
      }
    }
    function waitForCompleteness(target, count) {
      if (count === 1e3 || vmIsDestroyed(vm) === true) return;
      if (target.complete === true) {
        onReady(target);
      } else {
        registerLoadTimeout(() => {
          waitForCompleteness(target, count + 1);
        }, 50);
      }
    }
    function onReady(target) {
      if (vmIsDestroyed(vm) === true) return;
      position2.value = position2.value ^ 1;
      images[position2.value].value = null;
      clearLoading();
      if (target.getAttribute("__qerror") !== "true") {
        hasError.value = false;
      }
      emit("load", target.currentSrc || target.src);
    }
    function onError(err) {
      removeLoadTimeout();
      clearLoading();
      hasError.value = true;
      images[position2.value].value = errorImg.value;
      images[position2.value ^ 1].value = placeholderImg.value;
      emit("error", err);
    }
    function getImage(index) {
      const img = images[index].value;
      const data = {
        key: "img_" + index,
        class: imgClass.value,
        style: imgStyle.value,
        alt: props.alt,
        crossorigin: props.crossorigin,
        decoding: props.decoding,
        referrerpolicy: props.referrerpolicy,
        height: props.height,
        width: props.width,
        loading: props.loading,
        fetchpriority: props.fetchpriority,
        "aria-hidden": "true",
        draggable: props.draggable,
        ...img
      };
      if (position2.value === index) {
        Object.assign(data, {
          class: data.class + "current",
          onLoad,
          onError
        });
      } else {
        data.class += "loaded";
      }
      return h(
        "div",
        { class: "q-img__container absolute-full", key: "img" + index },
        h("img", data)
      );
    }
    function getContent() {
      if (isLoading.value === false) {
        return h("div", {
          key: "content",
          class: "q-img__content absolute-full q-anchor--skip"
        }, hSlot(slots[hasError.value === true ? "error" : "default"]));
      }
      return h("div", {
        key: "loading",
        class: "q-img__loading absolute-full flex flex-center"
      }, slots.loading !== void 0 ? slots.loading() : props.noSpinner === true ? void 0 : [
        h(QSpinner, {
          color: props.spinnerColor,
          size: props.spinnerSize
        })
      ]);
    }
    {
      let watchSrc = function() {
        watch(
          () => props.src || props.srcset || props.sizes ? {
            src: props.src,
            srcset: props.srcset,
            sizes: props.sizes
          } : null,
          (imgProps) => {
            removeLoadTimeout();
            hasError.value = false;
            if (imgProps === null) {
              clearLoading();
              images[position2.value ^ 1].value = placeholderImg.value;
            } else {
              setLoading();
            }
            images[position2.value].value = imgProps;
          },
          { immediate: true }
        );
      };
      if (isRuntimeSsrPreHydration.value === true) {
        onMounted(watchSrc);
      } else {
        watchSrc();
      }
    }
    return () => {
      const content = [];
      if (ratioStyle.value !== null) {
        content.push(
          h("div", { key: "filler", style: ratioStyle.value })
        );
      }
      if (images[0].value !== null) {
        content.push(
          getImage(0)
        );
      }
      if (images[1].value !== null) {
        content.push(
          getImage(1)
        );
      }
      content.push(
        h(Transition, { name: "q-transition--fade" }, getContent)
      );
      return h("div", {
        key: "main",
        class: classes.value,
        style: style.value,
        role: "img",
        "aria-label": props.alt
      }, content);
    };
  }
});
let id = 0;
const useTabEmits = ["click", "keydown"];
const useTabProps = {
  icon: String,
  label: [Number, String],
  alert: [Boolean, String],
  alertIcon: String,
  name: {
    type: [Number, String],
    default: () => `t_${id++}`
  },
  noCaps: Boolean,
  tabindex: [String, Number],
  disable: Boolean,
  contentClass: String,
  ripple: {
    type: [Boolean, Object],
    default: true
  }
};
function useTab(props, slots, emit, routeData) {
  const $tabs = inject(tabsKey, emptyRenderFn);
  if ($tabs === emptyRenderFn) {
    console.error("QTab/QRouteTab component needs to be child of QTabs");
    return emptyRenderFn;
  }
  const { proxy } = getCurrentInstance();
  const blurTargetRef = ref(null);
  const rootRef = ref(null);
  const tabIndicatorRef = ref(null);
  const ripple = computed(() => props.disable === true || props.ripple === false ? false : Object.assign(
    { keyCodes: [13, 32], early: true },
    props.ripple === true ? {} : props.ripple
  ));
  const isActive = computed(() => $tabs.currentModel.value === props.name);
  const classes = computed(
    () => "q-tab relative-position self-stretch flex flex-center text-center" + (isActive.value === true ? " q-tab--active" + ($tabs.tabProps.value.activeClass ? " " + $tabs.tabProps.value.activeClass : "") + ($tabs.tabProps.value.activeColor ? ` text-${$tabs.tabProps.value.activeColor}` : "") + ($tabs.tabProps.value.activeBgColor ? ` bg-${$tabs.tabProps.value.activeBgColor}` : "") : " q-tab--inactive") + (props.icon && props.label && $tabs.tabProps.value.inlineLabel === false ? " q-tab--full" : "") + (props.noCaps === true || $tabs.tabProps.value.noCaps === true ? " q-tab--no-caps" : "") + (props.disable === true ? " disabled" : " q-focusable q-hoverable cursor-pointer")
  );
  const innerClass = computed(
    () => "q-tab__content self-stretch flex-center relative-position q-anchor--skip non-selectable " + ($tabs.tabProps.value.inlineLabel === true ? "row no-wrap q-tab__content--inline" : "column") + (props.contentClass !== void 0 ? ` ${props.contentClass}` : "")
  );
  const tabIndex = computed(() => props.disable === true || $tabs.hasFocus.value === true || isActive.value === false && $tabs.hasActiveTab.value === true ? -1 : props.tabindex || 0);
  function onClick(e, keyboard) {
    if (keyboard !== true && e?.qAvoidFocus !== true) {
      blurTargetRef.value?.focus();
    }
    if (props.disable === true) {
      return;
    }
    {
      $tabs.updateModel({ name: props.name });
      emit("click", e);
      return;
    }
  }
  function onKeydown(e) {
    if (isKeyCode(e, [13, 32])) {
      onClick(e, true);
    } else if (shouldIgnoreKey(e) !== true && e.keyCode >= 35 && e.keyCode <= 40 && e.altKey !== true && e.metaKey !== true) {
      $tabs.onKbdNavigate(e.keyCode, proxy.$el) === true && stopAndPrevent(e);
    }
    emit("keydown", e);
  }
  function getContent() {
    const narrow = $tabs.tabProps.value.narrowIndicator, content = [], indicator = h("div", {
      ref: tabIndicatorRef,
      class: [
        "q-tab__indicator",
        $tabs.tabProps.value.indicatorClass
      ]
    });
    props.icon !== void 0 && content.push(
      h(QIcon, {
        class: "q-tab__icon",
        name: props.icon
      })
    );
    props.label !== void 0 && content.push(
      h("div", { class: "q-tab__label" }, props.label)
    );
    props.alert !== false && content.push(
      props.alertIcon !== void 0 ? h(QIcon, {
        class: "q-tab__alert-icon",
        color: props.alert !== true ? props.alert : void 0,
        name: props.alertIcon
      }) : h("div", {
        class: "q-tab__alert" + (props.alert !== true ? ` text-${props.alert}` : "")
      })
    );
    narrow === true && content.push(indicator);
    const node = [
      h("div", { class: "q-focus-helper", tabindex: -1, ref: blurTargetRef }),
      h("div", { class: innerClass.value }, hMergeSlot(slots.default, content))
    ];
    narrow === false && node.push(indicator);
    return node;
  }
  const tabData = {
    name: computed(() => props.name),
    rootRef,
    tabIndicatorRef,
    routeData
  };
  onBeforeUnmount(() => {
    $tabs.unregisterTab(tabData);
  });
  onMounted(() => {
    $tabs.registerTab(tabData);
  });
  function renderTab(tag, customData) {
    const data = {
      ref: rootRef,
      class: classes.value,
      tabindex: tabIndex.value,
      role: "tab",
      "aria-selected": isActive.value === true ? "true" : "false",
      "aria-disabled": props.disable === true ? "true" : void 0,
      onClick,
      onKeydown,
      ...customData
    };
    return withDirectives(
      h(tag, data, getContent()),
      [[Ripple, ripple.value]]
    );
  }
  return { renderTab, $tabs };
}
const QTab = createComponent({
  name: "QTab",
  props: useTabProps,
  emits: useTabEmits,
  setup(props, { slots, emit }) {
    const { renderTab } = useTab(props, slots, emit);
    return () => renderTab("div");
  }
});
function getIndicatorClass(color, top, vertical) {
  const pos = vertical === true ? ["left", "right"] : ["top", "bottom"];
  return `absolute-${top === true ? pos[0] : pos[1]}${color ? ` text-${color}` : ""}`;
}
const alignValues = ["left", "center", "right", "justify"];
const QTabs = createComponent({
  name: "QTabs",
  props: {
    modelValue: [Number, String],
    align: {
      type: String,
      default: "center",
      validator: (v) => alignValues.includes(v)
    },
    breakpoint: {
      type: [String, Number],
      default: 600
    },
    vertical: Boolean,
    shrink: Boolean,
    stretch: Boolean,
    activeClass: String,
    activeColor: String,
    activeBgColor: String,
    indicatorColor: String,
    leftIcon: String,
    rightIcon: String,
    outsideArrows: Boolean,
    mobileArrows: Boolean,
    switchIndicator: Boolean,
    narrowIndicator: Boolean,
    inlineLabel: Boolean,
    noCaps: Boolean,
    dense: Boolean,
    contentClass: String,
    "onUpdate:modelValue": [Function, Array]
  },
  setup(props, { slots, emit }) {
    const { proxy } = getCurrentInstance();
    const { $q } = proxy;
    const { registerTick: registerScrollTick } = useTick();
    const { registerTick: registerUpdateArrowsTick } = useTick();
    const { registerTick: registerAnimateTick } = useTick();
    const { registerTimeout: registerFocusTimeout, removeTimeout: removeFocusTimeout } = useTimeout();
    const { registerTimeout: registerScrollToTabTimeout, removeTimeout: removeScrollToTabTimeout } = useTimeout();
    const rootRef = ref(null);
    const contentRef = ref(null);
    const currentModel = ref(props.modelValue);
    const scrollable = ref(false);
    const leftArrow = ref(true);
    const rightArrow = ref(false);
    const justify = ref(false);
    const tabDataList = [];
    const tabDataListLen = ref(0);
    const hasFocus = ref(false);
    let animateTimer = null, scrollTimer = null, unwatchRoute;
    const tabProps = computed(() => ({
      activeClass: props.activeClass,
      activeColor: props.activeColor,
      activeBgColor: props.activeBgColor,
      indicatorClass: getIndicatorClass(
        props.indicatorColor,
        props.switchIndicator,
        props.vertical
      ),
      narrowIndicator: props.narrowIndicator,
      inlineLabel: props.inlineLabel,
      noCaps: props.noCaps
    }));
    const hasActiveTab = computed(() => {
      const len = tabDataListLen.value;
      const val = currentModel.value;
      for (let i = 0; i < len; i++) {
        if (tabDataList[i].name.value === val) {
          return true;
        }
      }
      return false;
    });
    const alignClass = computed(() => {
      const align = scrollable.value === true ? "left" : justify.value === true ? "justify" : props.align;
      return `q-tabs__content--align-${align}`;
    });
    const classes = computed(
      () => `q-tabs row no-wrap items-center q-tabs--${scrollable.value === true ? "" : "not-"}scrollable q-tabs--${props.vertical === true ? "vertical" : "horizontal"} q-tabs__arrows--${props.outsideArrows === true ? "outside" : "inside"} q-tabs--mobile-with${props.mobileArrows === true ? "" : "out"}-arrows` + (props.dense === true ? " q-tabs--dense" : "") + (props.shrink === true ? " col-shrink" : "") + (props.stretch === true ? " self-stretch" : "")
    );
    const innerClass = computed(
      () => "q-tabs__content scroll--mobile row no-wrap items-center self-stretch hide-scrollbar relative-position " + alignClass.value + (props.contentClass !== void 0 ? ` ${props.contentClass}` : "")
    );
    const domProps = computed(() => props.vertical === true ? { container: "height", content: "offsetHeight", scroll: "scrollHeight" } : { container: "width", content: "offsetWidth", scroll: "scrollWidth" });
    const isRTL = computed(() => props.vertical !== true && $q.lang.rtl === true);
    const rtlPosCorrection = computed(() => rtlHasScrollBug === false && isRTL.value === true);
    watch(isRTL, updateArrows);
    watch(() => props.modelValue, (name) => {
      updateModel({ name, setCurrent: true, skipEmit: true });
    });
    watch(() => props.outsideArrows, recalculateScroll);
    function updateModel({ name, setCurrent, skipEmit }) {
      if (currentModel.value === name) return;
      if (skipEmit !== true && props["onUpdate:modelValue"] !== void 0) {
        emit("update:modelValue", name);
      }
      if (setCurrent === true || props["onUpdate:modelValue"] === void 0) {
        animate(currentModel.value, name);
        currentModel.value = name;
      }
    }
    function recalculateScroll() {
      registerScrollTick(() => {
        rootRef.value && updateContainer({
          width: rootRef.value.offsetWidth,
          height: rootRef.value.offsetHeight
        });
      });
    }
    function updateContainer(domSize) {
      if (domProps.value === void 0 || contentRef.value === null) return;
      const size = domSize[domProps.value.container], scrollSize = Math.min(
        contentRef.value[domProps.value.scroll],
        Array.prototype.reduce.call(
          contentRef.value.children,
          (acc, el) => acc + (el[domProps.value.content] || 0),
          0
        )
      ), scroll = size > 0 && scrollSize > size;
      scrollable.value = scroll;
      scroll === true && registerUpdateArrowsTick(updateArrows);
      justify.value = size < parseInt(props.breakpoint, 10);
    }
    function animate(oldName, newName) {
      const oldTab = oldName !== void 0 && oldName !== null && oldName !== "" ? tabDataList.find((tab) => tab.name.value === oldName) : null, newTab = newName !== void 0 && newName !== null && newName !== "" ? tabDataList.find((tab) => tab.name.value === newName) : null;
      if (hadActivated === true) {
        hadActivated = false;
      } else if (oldTab && newTab) {
        const oldEl = oldTab.tabIndicatorRef.value, newEl = newTab.tabIndicatorRef.value;
        if (animateTimer !== null) {
          clearTimeout(animateTimer);
          animateTimer = null;
        }
        oldEl.style.transition = "none";
        oldEl.style.transform = "none";
        newEl.style.transition = "none";
        newEl.style.transform = "none";
        const oldPos = oldEl.getBoundingClientRect(), newPos = newEl.getBoundingClientRect();
        newEl.style.transform = props.vertical === true ? `translate3d(0,${oldPos.top - newPos.top}px,0) scale3d(1,${newPos.height ? oldPos.height / newPos.height : 1},1)` : `translate3d(${oldPos.left - newPos.left}px,0,0) scale3d(${newPos.width ? oldPos.width / newPos.width : 1},1,1)`;
        registerAnimateTick(() => {
          animateTimer = setTimeout(() => {
            animateTimer = null;
            newEl.style.transition = "transform .25s cubic-bezier(.4, 0, .2, 1)";
            newEl.style.transform = "none";
          }, 70);
        });
      }
      if (newTab && scrollable.value === true) {
        scrollToTabEl(newTab.rootRef.value);
      }
    }
    function scrollToTabEl(el) {
      const { left, width, top, height } = contentRef.value.getBoundingClientRect(), newPos = el.getBoundingClientRect();
      let offset = props.vertical === true ? newPos.top - top : newPos.left - left;
      if (offset < 0) {
        contentRef.value[props.vertical === true ? "scrollTop" : "scrollLeft"] += Math.floor(offset);
        updateArrows();
        return;
      }
      offset += props.vertical === true ? newPos.height - height : newPos.width - width;
      if (offset > 0) {
        contentRef.value[props.vertical === true ? "scrollTop" : "scrollLeft"] += Math.ceil(offset);
        updateArrows();
      }
    }
    function updateArrows() {
      const content = contentRef.value;
      if (content === null) return;
      const rect = content.getBoundingClientRect(), pos = props.vertical === true ? content.scrollTop : Math.abs(content.scrollLeft);
      if (isRTL.value === true) {
        leftArrow.value = Math.ceil(pos + rect.width) < content.scrollWidth - 1;
        rightArrow.value = pos > 0;
      } else {
        leftArrow.value = pos > 0;
        rightArrow.value = props.vertical === true ? Math.ceil(pos + rect.height) < content.scrollHeight : Math.ceil(pos + rect.width) < content.scrollWidth;
      }
    }
    function animScrollTo(value) {
      scrollTimer !== null && clearInterval(scrollTimer);
      scrollTimer = setInterval(() => {
        if (scrollTowards(value) === true) {
          stopAnimScroll();
        }
      }, 5);
    }
    function scrollToStart() {
      animScrollTo(rtlPosCorrection.value === true ? Number.MAX_SAFE_INTEGER : 0);
    }
    function scrollToEnd() {
      animScrollTo(rtlPosCorrection.value === true ? 0 : Number.MAX_SAFE_INTEGER);
    }
    function stopAnimScroll() {
      if (scrollTimer !== null) {
        clearInterval(scrollTimer);
        scrollTimer = null;
      }
    }
    function onKbdNavigate(keyCode, fromEl) {
      const tabs = Array.prototype.filter.call(
        contentRef.value.children,
        (el) => el === fromEl || el.matches && el.matches(".q-tab.q-focusable") === true
      );
      const len = tabs.length;
      if (len === 0) return;
      if (keyCode === 36) {
        scrollToTabEl(tabs[0]);
        tabs[0].focus();
        return true;
      }
      if (keyCode === 35) {
        scrollToTabEl(tabs[len - 1]);
        tabs[len - 1].focus();
        return true;
      }
      const dirPrev = keyCode === (props.vertical === true ? 38 : 37);
      const dirNext = keyCode === (props.vertical === true ? 40 : 39);
      const dir = dirPrev === true ? -1 : dirNext === true ? 1 : void 0;
      if (dir !== void 0) {
        const rtlDir = isRTL.value === true ? -1 : 1;
        const index = tabs.indexOf(fromEl) + dir * rtlDir;
        if (index >= 0 && index < len) {
          scrollToTabEl(tabs[index]);
          tabs[index].focus({ preventScroll: true });
        }
        return true;
      }
    }
    const posFn = computed(() => rtlPosCorrection.value === true ? { get: (content) => Math.abs(content.scrollLeft), set: (content, pos) => {
      content.scrollLeft = -pos;
    } } : props.vertical === true ? { get: (content) => content.scrollTop, set: (content, pos) => {
      content.scrollTop = pos;
    } } : { get: (content) => content.scrollLeft, set: (content, pos) => {
      content.scrollLeft = pos;
    } });
    function scrollTowards(value) {
      const content = contentRef.value, { get, set } = posFn.value;
      let done = false, pos = get(content);
      const direction = value < pos ? -1 : 1;
      pos += direction * 5;
      if (pos < 0) {
        done = true;
        pos = 0;
      } else if (direction === -1 && pos <= value || direction === 1 && pos >= value) {
        done = true;
        pos = value;
      }
      set(content, pos);
      updateArrows();
      return done;
    }
    function hasQueryIncluded(targetQuery, matchingQuery) {
      for (const key in targetQuery) {
        if (targetQuery[key] !== matchingQuery[key]) {
          return false;
        }
      }
      return true;
    }
    function updateActiveRoute() {
      let name = null, bestScore = { matchedLen: 0, queryDiff: 9999, hrefLen: 0 };
      const list = tabDataList.filter((tab) => tab.routeData?.hasRouterLink.value === true);
      const { hash: currentHash, query: currentQuery } = proxy.$route;
      const currentQueryLen = Object.keys(currentQuery).length;
      for (const tab of list) {
        const exact = tab.routeData.exact.value === true;
        if (tab.routeData[exact === true ? "linkIsExactActive" : "linkIsActive"].value !== true) {
          continue;
        }
        const { hash, query, matched, href } = tab.routeData.resolvedLink.value;
        const queryLen = Object.keys(query).length;
        if (exact === true) {
          if (hash !== currentHash) {
            continue;
          }
          if (queryLen !== currentQueryLen || hasQueryIncluded(currentQuery, query) === false) {
            continue;
          }
          name = tab.name.value;
          break;
        }
        if (hash !== "" && hash !== currentHash) {
          continue;
        }
        if (queryLen !== 0 && hasQueryIncluded(query, currentQuery) === false) {
          continue;
        }
        const newScore = {
          matchedLen: matched.length,
          queryDiff: currentQueryLen - queryLen,
          hrefLen: href.length - hash.length
        };
        if (newScore.matchedLen > bestScore.matchedLen) {
          name = tab.name.value;
          bestScore = newScore;
          continue;
        } else if (newScore.matchedLen !== bestScore.matchedLen) {
          continue;
        }
        if (newScore.queryDiff < bestScore.queryDiff) {
          name = tab.name.value;
          bestScore = newScore;
        } else if (newScore.queryDiff !== bestScore.queryDiff) {
          continue;
        }
        if (newScore.hrefLen > bestScore.hrefLen) {
          name = tab.name.value;
          bestScore = newScore;
        }
      }
      if (name === null && tabDataList.some((tab) => tab.routeData === void 0 && tab.name.value === currentModel.value) === true) {
        hadActivated = false;
        return;
      }
      updateModel({ name, setCurrent: true });
    }
    function onFocusin(e) {
      removeFocusTimeout();
      if (hasFocus.value !== true && rootRef.value !== null && e.target && typeof e.target.closest === "function") {
        const tab = e.target.closest(".q-tab");
        if (tab && rootRef.value.contains(tab) === true) {
          hasFocus.value = true;
          scrollable.value === true && scrollToTabEl(tab);
        }
      }
    }
    function onFocusout() {
      registerFocusTimeout(() => {
        hasFocus.value = false;
      }, 30);
    }
    function verifyRouteModel() {
      if ($tabs.avoidRouteWatcher === false) {
        registerScrollToTabTimeout(updateActiveRoute);
      } else {
        removeScrollToTabTimeout();
      }
    }
    function watchRoute() {
      if (unwatchRoute === void 0) {
        const unwatch = watch(() => proxy.$route.fullPath, verifyRouteModel);
        unwatchRoute = () => {
          unwatch();
          unwatchRoute = void 0;
        };
      }
    }
    function registerTab(tabData) {
      tabDataList.push(tabData);
      tabDataListLen.value++;
      recalculateScroll();
      if (tabData.routeData === void 0 || proxy.$route === void 0) {
        registerScrollToTabTimeout(() => {
          if (scrollable.value === true) {
            const value = currentModel.value;
            const newTab = value !== void 0 && value !== null && value !== "" ? tabDataList.find((tab) => tab.name.value === value) : null;
            newTab && scrollToTabEl(newTab.rootRef.value);
          }
        });
      } else {
        watchRoute();
        if (tabData.routeData.hasRouterLink.value === true) {
          verifyRouteModel();
        }
      }
    }
    function unregisterTab(tabData) {
      tabDataList.splice(tabDataList.indexOf(tabData), 1);
      tabDataListLen.value--;
      recalculateScroll();
      if (unwatchRoute !== void 0 && tabData.routeData !== void 0) {
        if (tabDataList.every((tab) => tab.routeData === void 0) === true) {
          unwatchRoute();
        }
        verifyRouteModel();
      }
    }
    const $tabs = {
      currentModel,
      tabProps,
      hasFocus,
      hasActiveTab,
      registerTab,
      unregisterTab,
      verifyRouteModel,
      updateModel,
      onKbdNavigate,
      avoidRouteWatcher: false
      // false | string (uid)
    };
    provide(tabsKey, $tabs);
    function cleanup() {
      animateTimer !== null && clearTimeout(animateTimer);
      stopAnimScroll();
      unwatchRoute?.();
    }
    let hadRouteWatcher, hadActivated;
    onBeforeUnmount(cleanup);
    onDeactivated(() => {
      hadRouteWatcher = unwatchRoute !== void 0;
      cleanup();
    });
    onActivated(() => {
      if (hadRouteWatcher === true) {
        watchRoute();
        hadActivated = true;
        verifyRouteModel();
      }
      recalculateScroll();
    });
    return () => {
      return h("div", {
        ref: rootRef,
        class: classes.value,
        role: "tablist",
        onFocusin,
        onFocusout
      }, [
        h(QResizeObserver, { onResize: updateContainer }),
        h("div", {
          ref: contentRef,
          class: innerClass.value,
          onScroll: updateArrows
        }, hSlot(slots.default)),
        h(QIcon, {
          class: "q-tabs__arrow q-tabs__arrow--left absolute q-tab__icon" + (leftArrow.value === true ? "" : " q-tabs__arrow--faded"),
          name: props.leftIcon || $q.iconSet.tabs[props.vertical === true ? "up" : "left"],
          onMousedownPassive: scrollToStart,
          onTouchstartPassive: scrollToStart,
          onMouseupPassive: stopAnimScroll,
          onMouseleavePassive: stopAnimScroll,
          onTouchendPassive: stopAnimScroll
        }),
        h(QIcon, {
          class: "q-tabs__arrow q-tabs__arrow--right absolute q-tab__icon" + (rightArrow.value === true ? "" : " q-tabs__arrow--faded"),
          name: props.rightIcon || $q.iconSet.tabs[props.vertical === true ? "down" : "right"],
          onMousedownPassive: scrollToEnd,
          onTouchstartPassive: scrollToEnd,
          onMouseupPassive: stopAnimScroll,
          onMouseleavePassive: stopAnimScroll,
          onTouchendPassive: stopAnimScroll
        })
      ]);
    };
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
function parseArg(arg) {
  const data = [0.06, 6, 50];
  if (typeof arg === "string" && arg.length) {
    arg.split(":").forEach((val, index) => {
      const v = parseFloat(val);
      v && (data[index] = v);
    });
  }
  return data;
}
const TouchSwipe = createDirective(
  {
    name: "touch-swipe",
    beforeMount(el, { value, arg, modifiers }) {
      if (modifiers.mouse !== true && client.has.touch !== true) return;
      const mouseCapture = modifiers.mouseCapture === true ? "Capture" : "";
      const ctx = {
        handler: value,
        sensitivity: parseArg(arg),
        direction: getModifierDirections(modifiers),
        noop,
        mouseStart(evt) {
          if (shouldStart(evt, ctx) && leftClick(evt)) {
            addEvt(ctx, "temp", [
              [document, "mousemove", "move", `notPassive${mouseCapture}`],
              [document, "mouseup", "end", "notPassiveCapture"]
            ]);
            ctx.start(evt, true);
          }
        },
        touchStart(evt) {
          if (shouldStart(evt, ctx)) {
            const target = evt.target;
            addEvt(ctx, "temp", [
              [target, "touchmove", "move", "notPassiveCapture"],
              [target, "touchcancel", "end", "notPassiveCapture"],
              [target, "touchend", "end", "notPassiveCapture"]
            ]);
            ctx.start(evt);
          }
        },
        start(evt, mouseEvent) {
          client.is.firefox === true && preventDraggable(el, true);
          const pos = position(evt);
          ctx.event = {
            x: pos.left,
            y: pos.top,
            time: Date.now(),
            mouse: mouseEvent === true,
            dir: false
          };
        },
        move(evt) {
          if (ctx.event === void 0) return;
          if (ctx.event.dir !== false) {
            stopAndPrevent(evt);
            return;
          }
          const time = Date.now() - ctx.event.time;
          if (time === 0) return;
          const pos = position(evt), distX = pos.left - ctx.event.x, absX = Math.abs(distX), distY = pos.top - ctx.event.y, absY = Math.abs(distY);
          if (ctx.event.mouse !== true) {
            if (absX < ctx.sensitivity[1] && absY < ctx.sensitivity[1]) {
              ctx.end(evt);
              return;
            }
          } else if (window.getSelection().toString() !== "") {
            ctx.end(evt);
            return;
          } else if (absX < ctx.sensitivity[2] && absY < ctx.sensitivity[2]) {
            return;
          }
          const velX = absX / time, velY = absY / time;
          if (ctx.direction.vertical === true && absX < absY && absX < 100 && velY > ctx.sensitivity[0]) {
            ctx.event.dir = distY < 0 ? "up" : "down";
          }
          if (ctx.direction.horizontal === true && absX > absY && absY < 100 && velX > ctx.sensitivity[0]) {
            ctx.event.dir = distX < 0 ? "left" : "right";
          }
          if (ctx.direction.up === true && absX < absY && distY < 0 && absX < 100 && velY > ctx.sensitivity[0]) {
            ctx.event.dir = "up";
          }
          if (ctx.direction.down === true && absX < absY && distY > 0 && absX < 100 && velY > ctx.sensitivity[0]) {
            ctx.event.dir = "down";
          }
          if (ctx.direction.left === true && absX > absY && distX < 0 && absY < 100 && velX > ctx.sensitivity[0]) {
            ctx.event.dir = "left";
          }
          if (ctx.direction.right === true && absX > absY && distX > 0 && absY < 100 && velX > ctx.sensitivity[0]) {
            ctx.event.dir = "right";
          }
          if (ctx.event.dir !== false) {
            stopAndPrevent(evt);
            if (ctx.event.mouse === true) {
              document.body.classList.add("no-pointer-events--children");
              document.body.classList.add("non-selectable");
              clearSelection();
              ctx.styleCleanup = (withDelay) => {
                ctx.styleCleanup = void 0;
                document.body.classList.remove("non-selectable");
                const remove = () => {
                  document.body.classList.remove("no-pointer-events--children");
                };
                if (withDelay === true) {
                  setTimeout(remove, 50);
                } else {
                  remove();
                }
              };
            }
            ctx.handler({
              evt,
              touch: ctx.event.mouse !== true,
              mouse: ctx.event.mouse,
              direction: ctx.event.dir,
              duration: time,
              distance: {
                x: absX,
                y: absY
              }
            });
          } else {
            ctx.end(evt);
          }
        },
        end(evt) {
          if (ctx.event === void 0) return;
          cleanEvt(ctx, "temp");
          client.is.firefox === true && preventDraggable(el, false);
          ctx.styleCleanup?.(true);
          if (evt !== void 0 && ctx.event.dir !== false) stopAndPrevent(evt);
          ctx.event = void 0;
        }
      };
      el.__qtouchswipe = ctx;
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
      const ctx = el.__qtouchswipe;
      if (ctx !== void 0) {
        if (bindings.oldValue !== bindings.value) {
          typeof bindings.value !== "function" && ctx.end();
          ctx.handler = bindings.value;
        }
        ctx.direction = getModifierDirections(bindings.modifiers);
      }
    },
    beforeUnmount(el) {
      const ctx = el.__qtouchswipe;
      if (ctx !== void 0) {
        cleanEvt(ctx, "main");
        cleanEvt(ctx, "temp");
        client.is.firefox === true && preventDraggable(el, false);
        ctx.styleCleanup?.();
        delete el.__qtouchswipe;
      }
    }
  }
);
function useRenderCache() {
  let cache = /* @__PURE__ */ Object.create(null);
  return {
    getCache: (key, defaultValue) => cache[key] === void 0 ? cache[key] = typeof defaultValue === "function" ? defaultValue() : defaultValue : cache[key],
    setCache(key, obj) {
      cache[key] = obj;
    },
    hasCache(key) {
      return Object.hasOwnProperty.call(cache, key);
    },
    clearCache(key) {
      if (key !== void 0) {
        delete cache[key];
      } else {
        cache = /* @__PURE__ */ Object.create(null);
      }
    }
  };
}
const usePanelChildProps = {
  name: { required: true },
  disable: Boolean
};
const PanelWrapper = {
  setup(_, { slots }) {
    return () => h("div", {
      class: "q-panel scroll",
      role: "tabpanel"
    }, hSlot(slots.default));
  }
};
const usePanelProps = {
  modelValue: {
    required: true
  },
  animated: Boolean,
  infinite: Boolean,
  swipeable: Boolean,
  vertical: Boolean,
  transitionPrev: String,
  transitionNext: String,
  transitionDuration: {
    type: [String, Number],
    default: 300
  },
  keepAlive: Boolean,
  keepAliveInclude: [String, Array, RegExp],
  keepAliveExclude: [String, Array, RegExp],
  keepAliveMax: Number
};
const usePanelEmits = ["update:modelValue", "beforeTransition", "transition"];
function usePanel() {
  const { props, emit, proxy } = getCurrentInstance();
  const { getCache } = useRenderCache();
  const { registerTimeout } = useTimeout();
  let panels, forcedPanelTransition;
  const panelTransition = ref(null);
  const panelIndex = { value: null };
  function onSwipe(evt) {
    const dir = props.vertical === true ? "up" : "left";
    goToPanelByOffset((proxy.$q.lang.rtl === true ? -1 : 1) * (evt.direction === dir ? 1 : -1));
  }
  const panelDirectives = computed(() => {
    return [[
      TouchSwipe,
      onSwipe,
      void 0,
      {
        horizontal: props.vertical !== true,
        vertical: props.vertical,
        mouse: true
      }
    ]];
  });
  const transitionPrev = computed(
    () => props.transitionPrev || `slide-${props.vertical === true ? "down" : "right"}`
  );
  const transitionNext = computed(
    () => props.transitionNext || `slide-${props.vertical === true ? "up" : "left"}`
  );
  const transitionStyle = computed(
    () => `--q-transition-duration: ${props.transitionDuration}ms`
  );
  const contentKey = computed(() => typeof props.modelValue === "string" || typeof props.modelValue === "number" ? props.modelValue : String(props.modelValue));
  const keepAliveProps = computed(() => ({
    include: props.keepAliveInclude,
    exclude: props.keepAliveExclude,
    max: props.keepAliveMax
  }));
  const needsUniqueKeepAliveWrapper = computed(
    () => props.keepAliveInclude !== void 0 || props.keepAliveExclude !== void 0
  );
  watch(() => props.modelValue, (newVal, oldVal) => {
    const index = isValidPanelName(newVal) === true ? getPanelIndex(newVal) : -1;
    if (forcedPanelTransition !== true) {
      updatePanelTransition(
        index === -1 ? 0 : index < getPanelIndex(oldVal) ? -1 : 1
      );
    }
    if (panelIndex.value !== index) {
      panelIndex.value = index;
      emit("beforeTransition", newVal, oldVal);
      registerTimeout(() => {
        emit("transition", newVal, oldVal);
      }, props.transitionDuration);
    }
  });
  function nextPanel() {
    goToPanelByOffset(1);
  }
  function previousPanel() {
    goToPanelByOffset(-1);
  }
  function goToPanel(name) {
    emit("update:modelValue", name);
  }
  function isValidPanelName(name) {
    return name !== void 0 && name !== null && name !== "";
  }
  function getPanelIndex(name) {
    return panels.findIndex((panel) => {
      return panel.props.name === name && panel.props.disable !== "" && panel.props.disable !== true;
    });
  }
  function getEnabledPanels() {
    return panels.filter((panel) => {
      return panel.props.disable !== "" && panel.props.disable !== true;
    });
  }
  function updatePanelTransition(direction) {
    const val = direction !== 0 && props.animated === true && panelIndex.value !== -1 ? "q-transition--" + (direction === -1 ? transitionPrev.value : transitionNext.value) : null;
    if (panelTransition.value !== val) {
      panelTransition.value = val;
    }
  }
  function goToPanelByOffset(direction, startIndex = panelIndex.value) {
    let index = startIndex + direction;
    while (index !== -1 && index < panels.length) {
      const opt = panels[index];
      if (opt !== void 0 && opt.props.disable !== "" && opt.props.disable !== true) {
        updatePanelTransition(direction);
        forcedPanelTransition = true;
        emit("update:modelValue", opt.props.name);
        setTimeout(() => {
          forcedPanelTransition = false;
        });
        return;
      }
      index += direction;
    }
    if (props.infinite === true && panels.length !== 0 && startIndex !== -1 && startIndex !== panels.length) {
      goToPanelByOffset(direction, direction === -1 ? panels.length : -1);
    }
  }
  function updatePanelIndex() {
    const index = getPanelIndex(props.modelValue);
    if (panelIndex.value !== index) {
      panelIndex.value = index;
    }
    return true;
  }
  function getPanelContentChild() {
    const panel = isValidPanelName(props.modelValue) === true && updatePanelIndex() && panels[panelIndex.value];
    return props.keepAlive === true ? [
      h(KeepAlive, keepAliveProps.value, [
        h(
          needsUniqueKeepAliveWrapper.value === true ? getCache(contentKey.value, () => ({ ...PanelWrapper, name: contentKey.value })) : PanelWrapper,
          { key: contentKey.value, style: transitionStyle.value },
          () => panel
        )
      ])
    ] : [
      h("div", {
        class: "q-panel scroll",
        style: transitionStyle.value,
        key: contentKey.value,
        role: "tabpanel"
      }, [panel])
    ];
  }
  function getPanelContent() {
    if (panels.length === 0) return;
    return props.animated === true ? [h(Transition, { name: panelTransition.value }, getPanelContentChild)] : getPanelContentChild();
  }
  function updatePanelsList(slots) {
    panels = getNormalizedVNodes(
      hSlot(slots.default, [])
    ).filter(
      (panel) => panel.props !== null && panel.props.slot === void 0 && isValidPanelName(panel.props.name) === true
    );
    return panels.length;
  }
  function getPanels() {
    return panels;
  }
  Object.assign(proxy, {
    next: nextPanel,
    previous: previousPanel,
    goTo: goToPanel
  });
  return {
    panelIndex,
    panelDirectives,
    updatePanelsList,
    updatePanelIndex,
    getPanelContent,
    getEnabledPanels,
    getPanels,
    isValidPanelName,
    keepAliveProps,
    needsUniqueKeepAliveWrapper,
    goToPanelByOffset,
    goToPanel,
    nextPanel,
    previousPanel
  };
}
const QTabPanel = createComponent({
  name: "QTabPanel",
  props: usePanelChildProps,
  setup(_, { slots }) {
    return () => h("div", { class: "q-tab-panel", role: "tabpanel" }, hSlot(slots.default));
  }
});
const QTimelineEntry = createComponent({
  name: "QTimelineEntry",
  props: {
    heading: Boolean,
    tag: {
      type: String,
      default: "h3"
    },
    side: {
      type: String,
      default: "right",
      validator: (v) => ["left", "right"].includes(v)
    },
    icon: String,
    avatar: String,
    color: String,
    title: String,
    subtitle: String,
    body: String
  },
  setup(props, { slots }) {
    const $timeline = inject(timelineKey, emptyRenderFn);
    if ($timeline === emptyRenderFn) {
      console.error("QTimelineEntry needs to be child of QTimeline");
      return emptyRenderFn;
    }
    const classes = computed(
      () => `q-timeline__entry q-timeline__entry--${props.side}` + (props.icon !== void 0 || props.avatar !== void 0 ? " q-timeline__entry--icon" : "")
    );
    const dotClass = computed(
      () => `q-timeline__dot text-${props.color || $timeline.color}`
    );
    const reverse = computed(
      () => $timeline.layout === "comfortable" && $timeline.side === "left"
    );
    return () => {
      const child = hUniqueSlot(slots.default, []);
      if (props.body !== void 0) {
        child.unshift(props.body);
      }
      if (props.heading === true) {
        const content2 = [
          h("div"),
          h("div"),
          h(
            props.tag,
            { class: "q-timeline__heading-title" },
            child
          )
        ];
        return h("div", {
          class: "q-timeline__heading"
        }, reverse.value === true ? content2.reverse() : content2);
      }
      let dot;
      if (props.icon !== void 0) {
        dot = [
          h(QIcon, {
            class: "row items-center justify-center",
            name: props.icon
          })
        ];
      } else if (props.avatar !== void 0) {
        dot = [
          h("img", {
            class: "q-timeline__dot-img",
            src: props.avatar
          })
        ];
      }
      const content = [
        h("div", { class: "q-timeline__subtitle" }, [
          h("span", {}, hSlot(slots.subtitle, [props.subtitle]))
        ]),
        h("div", { class: dotClass.value }, dot),
        h("div", { class: "q-timeline__content" }, [
          h("h6", { class: "q-timeline__title" }, hSlot(slots.title, [props.title]))
        ].concat(child))
      ];
      return h("li", {
        class: classes.value
      }, reverse.value === true ? content.reverse() : content);
    };
  }
});
const QTimeline = createComponent({
  name: "QTimeline",
  props: {
    ...useDarkProps,
    color: {
      type: String,
      default: "primary"
    },
    side: {
      type: String,
      default: "right",
      validator: (v) => ["left", "right"].includes(v)
    },
    layout: {
      type: String,
      default: "dense",
      validator: (v) => ["dense", "comfortable", "loose"].includes(v)
    }
  },
  setup(props, { slots }) {
    const vm = getCurrentInstance();
    const isDark = useDark(props, vm.proxy.$q);
    provide(timelineKey, props);
    const classes = computed(
      () => `q-timeline q-timeline--${props.layout} q-timeline--${props.layout}--${props.side}` + (isDark.value === true ? " q-timeline--dark" : "")
    );
    return () => h("ul", { class: classes.value }, hSlot(slots.default));
  }
});
const QTabPanels = createComponent({
  name: "QTabPanels",
  props: {
    ...usePanelProps,
    ...useDarkProps
  },
  emits: usePanelEmits,
  setup(props, { slots }) {
    const vm = getCurrentInstance();
    const isDark = useDark(props, vm.proxy.$q);
    const { updatePanelsList, getPanelContent, panelDirectives } = usePanel();
    const classes = computed(
      () => "q-tab-panels q-panel-parent" + (isDark.value === true ? " q-tab-panels--dark q-dark" : "")
    );
    return () => {
      updatePanelsList(slots);
      return hDir(
        "div",
        { class: classes.value },
        getPanelContent(),
        "pan",
        props.swipeable,
        () => panelDirectives.value
      );
    };
  }
});
const _sfc_main = {
  __name: "ZoneDetailsDialog",
  setup(__props, { expose: __expose }) {
    __expose();
    const $q = useQuasar();
    const scheduleStore = useScheduleStore();
    const activeTab = ref("details");
    const updating = ref(false);
    const showReschedule = ref(false);
    const newScheduleDay = ref(null);
    const equipmentChecklist = ref([]);
    const imageViewerOpen = ref(false);
    const currentImage = ref(null);
    const zone = computed(() => scheduleStore.selectedZone);
    const weeklyStats = computed(() => {
      const total = scheduleStore.totalZones;
      const completed = scheduleStore.completedZones;
      return {
        total,
        completed,
        remaining: total - completed
      };
    });
    const checkedEquipment = computed(() => {
      return equipmentChecklist.value.filter(Boolean).length;
    });
    const dayOptions = [
      { label: "Monday", value: "Monday" },
      { label: "Tuesday", value: "Tuesday" },
      { label: "Wednesday", value: "Wednesday" },
      { label: "Thursday", value: "Thursday" },
      { label: "Friday", value: "Friday" }
    ];
    watch(
      zone,
      (newZone) => {
        if (newZone) {
          equipmentChecklist.value = new Array(newZone.equipment.length).fill(false);
          newScheduleDay.value = newZone.scheduledDay;
        }
      },
      { immediate: true }
    );
    const toggleStatus = async () => {
      if (!zone.value) return;
      updating.value = true;
      try {
        await scheduleStore.updateZoneStatus(zone.value.id, !zone.value.completed);
      } finally {
        updating.value = false;
      }
    };
    const getPriorityColor = (priority) => {
      const colors = {
        high: "negative",
        medium: "warning",
        low: "positive"
      };
      return colors[priority] || "grey";
    };
    const getDayColor = (day) => {
      const colors = {
        Monday: "blue",
        Tuesday: "green",
        Wednesday: "orange",
        Thursday: "purple",
        Friday: "indigo"
        // Blue-purple theme
      };
      return colors[day] || "grey";
    };
    const formatDate = (dateString) => {
      if (!dateString) return "Never";
      const date = new Date(dateString);
      return date.toLocaleDateString("en-CA", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const getEquipmentIcon = (equipment) => {
      const icons = {
        "Riding mower": "agriculture",
        "Push mower": "grass",
        "String trimmer": "content_cut",
        Trimmer: "content_cut",
        Blower: "air",
        Edger: "straighten",
        "Safety markers": "warning",
        "Line marker": "edit",
        "Hand tools": "handyman"
      };
      return icons[equipment] || "build";
    };
    const getEquipmentDescription = (equipment) => {
      const descriptions = {
        "Riding mower": "Primary cutting equipment for large areas",
        "Push mower": "Manual mower for detailed work",
        "String trimmer": "Trim around obstacles and edges",
        Trimmer: "Trim around obstacles and edges",
        Blower: "Clean up grass clippings and debris",
        Edger: "Create clean edges along walkways",
        "Safety markers": "Mark hazards and work areas",
        "Line marker": "Mark sports fields and boundaries",
        "Hand tools": "Various manual tools for detail work"
      };
      return descriptions[equipment] || "Required equipment";
    };
    const checkAllEquipment = () => {
      equipmentChecklist.value = equipmentChecklist.value.map(() => true);
      $q.notify({
        type: "positive",
        message: "All equipment marked as ready",
        icon: "check_circle"
      });
    };
    const clearEquipmentChecklist = () => {
      equipmentChecklist.value = equipmentChecklist.value.map(() => false);
      $q.notify({
        type: "info",
        message: "Equipment checklist cleared",
        icon: "clear_all"
      });
    };
    const rescheduleZone = async () => {
      if (!zone.value || !newScheduleDay.value) return;
      try {
        await scheduleStore.updateZone(zone.value.id, {
          scheduledDay: newScheduleDay.value
        });
        showReschedule.value = false;
        $q.notify({
          type: "positive",
          message: `Zone rescheduled to ${newScheduleDay.value}`,
          icon: "event"
        });
      } catch (error) {
        console.error("Error rescheduling zone:", error);
      }
    };
    const duplicateZone = () => {
      $q.notify({
        type: "info",
        message: "Zone duplication feature coming soon!",
        icon: "content_copy"
      });
    };
    const editZone = () => {
      $q.notify({
        type: "info",
        message: "Zone editing feature coming in next phase!",
        icon: "edit"
      });
    };
    const getImageDescription = (imagePath, index) => {
      const filename = imagePath.split("/").pop().replace(".jpg", "").replace(".png", "");
      if (filename.includes("before")) return "Before maintenance";
      if (filename.includes("after")) return "After maintenance";
      if (filename.includes("playground")) return "Playground area";
      if (filename.includes("field")) return "Sports field";
      if (filename.includes("entrance")) return "Entrance area";
      if (filename.includes("welcome")) return "Welcome sign area";
      if (filename.includes("memorial")) return "Memorial area";
      if (filename.includes("rink")) return "Hockey rink area";
      if (filename.includes("grain")) return "Grain elevator area";
      if (filename.includes("park")) return "Park area";
      return `Photo ${index + 1}`;
    };
    const openImageViewer = (imagePath) => {
      currentImage.value = imagePath;
      imageViewerOpen.value = true;
    };
    const confirmDeleteZone = () => {
      if (!zone.value) return;
      $q.dialog({
        title: "Delete Zone",
        message: `Are you sure you want to delete "${zone.value.name}"? This action cannot be undone.`,
        cancel: true,
        persistent: true,
        ok: {
          color: "negative",
          label: "Delete Zone"
        }
      }).onOk(async () => {
        try {
          await scheduleStore.deleteZone(zone.value.id);
          scheduleStore.clearSelection();
        } catch (error) {
          console.error("Error deleting zone:", error);
        }
      });
    };
    const __returned__ = { $q, scheduleStore, activeTab, updating, showReschedule, newScheduleDay, equipmentChecklist, imageViewerOpen, currentImage, zone, weeklyStats, checkedEquipment, dayOptions, toggleStatus, getPriorityColor, getDayColor, formatDate, getEquipmentIcon, getEquipmentDescription, checkAllEquipment, clearEquipmentChecklist, rescheduleZone, duplicateZone, editZone, getImageDescription, openImageViewer, confirmDeleteZone, ref, computed, watch, get useQuasar() {
      return useQuasar;
    }, get useScheduleStore() {
      return useScheduleStore;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1 = { class: "col" };
const _hoisted_2 = { class: "text-h5 text-weight-medium" };
const _hoisted_3 = { class: "text-subtitle2 text-grey" };
const _hoisted_4 = { class: "col-auto q-gutter-sm" };
const _hoisted_5 = { class: "image-gallery" };
const _hoisted_6 = { class: "row q-gutter-sm" };
const _hoisted_7 = { class: "absolute-full flex flex-center bg-grey-3 text-grey" };
const _hoisted_8 = { class: "text-center" };
const _hoisted_9 = { class: "absolute-bottom bg-black-5 text-white q-pa-xs" };
const _hoisted_10 = { class: "text-caption" };
const _hoisted_11 = { class: "absolute-full flex flex-center bg-grey-3 text-grey" };
const _hoisted_12 = { class: "q-gutter-md" };
const _hoisted_13 = { class: "text-body2" };
const _hoisted_14 = { class: "row q-gutter-md" };
const _hoisted_15 = { class: "col-12 col-sm-6" };
const _hoisted_16 = { class: "col-12 col-sm-6" };
const _hoisted_17 = { key: 0 };
const _hoisted_18 = { class: "text-body2" };
const _hoisted_19 = { class: "q-gutter-md" };
const _hoisted_20 = { class: "row items-center q-gutter-md" };
const _hoisted_21 = { class: "col-auto" };
const _hoisted_22 = { class: "col" };
const _hoisted_23 = { class: "text-h6" };
const _hoisted_24 = { class: "col-auto" };
const _hoisted_25 = { class: "row q-gutter-sm" };
const _hoisted_26 = { class: "col" };
const _hoisted_27 = { class: "text-h4 text-positive" };
const _hoisted_28 = { class: "col" };
const _hoisted_29 = { class: "text-h4 text-info" };
const _hoisted_30 = { class: "col" };
const _hoisted_31 = { class: "text-h4 text-warning" };
const _hoisted_32 = { class: "row q-gutter-sm" };
const _hoisted_33 = { class: "q-gutter-md" };
const _hoisted_34 = { class: "equipment-list" };
const _hoisted_35 = { class: "row items-center q-gutter-md" };
const _hoisted_36 = { class: "text-caption" };
const _hoisted_37 = { class: "row q-gutter-sm" };
const _hoisted_38 = { class: "q-gutter-md" };
const _hoisted_39 = { class: "text-center text-grey" };
const _hoisted_40 = { class: "text-h6" };
const _hoisted_41 = { class: "absolute-full flex flex-center bg-grey-8 text-white" };
const _hoisted_42 = { class: "text-center" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QDialog, {
    modelValue: $setup.scheduleStore.dialogOpen,
    "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $setup.scheduleStore.dialogOpen = $event),
    onHide: $setup.scheduleStore.clearSelection,
    maximized: $setup.$q.screen.lt.sm,
    "transition-show": "slide-up",
    "transition-hide": "slide-down"
  }, {
    default: withCtx(() => [
      $setup.zone ? (openBlock(), createBlock(QCard, {
        key: 0,
        class: "zone-details-dialog",
        style: { "width": "700px", "max-width": "90vw" }
      }, {
        default: withCtx(() => [
          createVNode(QCardSection, { class: "row items-center q-pb-none" }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_1, [
                createBaseVNode("div", _hoisted_2, toDisplayString($setup.zone.name), 1),
                createBaseVNode("div", _hoisted_3, "Zone #" + toDisplayString($setup.zone.id) + " • " + toDisplayString($setup.zone.scheduledDay), 1)
              ]),
              createBaseVNode("div", _hoisted_4, [
                createVNode(QBtn, {
                  icon: $setup.zone.completed ? "check_circle" : "radio_button_unchecked",
                  color: $setup.zone.completed ? "positive" : "grey",
                  label: $setup.zone.completed ? "Completed" : "Mark Complete",
                  onClick: $setup.toggleStatus,
                  loading: $setup.updating
                }, null, 8, ["icon", "color", "label", "loading"]),
                withDirectives(createVNode(QBtn, {
                  flat: "",
                  round: "",
                  dense: "",
                  icon: "close"
                }, null, 512), [
                  [ClosePopup]
                ])
              ])
            ]),
            _: 1
          }),
          $setup.zone.defaultImages && $setup.zone.defaultImages.length > 0 ? (openBlock(), createBlock(QCardSection, {
            key: 0,
            class: "q-pt-none"
          }, {
            default: withCtx(() => [
              _cache[9] || (_cache[9] = createBaseVNode("div", { class: "text-subtitle2 text-weight-medium q-mb-sm" }, "Zone Photos", -1)),
              createBaseVNode("div", _hoisted_5, [
                createBaseVNode("div", _hoisted_6, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList($setup.zone.defaultImages, (image, index) => {
                    return openBlock(), createElementBlock("div", {
                      key: index,
                      class: "col-12 col-sm-6 col-md-4"
                    }, [
                      createVNode(QImg, {
                        src: image,
                        alt: `${$setup.zone.name} - Photo ${index + 1}`,
                        class: "rounded-borders cursor-pointer zone-photo",
                        style: { "height": "150px" },
                        fit: "cover",
                        onClick: ($event) => $setup.openImageViewer(image)
                      }, {
                        error: withCtx(() => [
                          createBaseVNode("div", _hoisted_7, [
                            createBaseVNode("div", _hoisted_8, [
                              createVNode(QIcon, {
                                name: "broken_image",
                                size: "2rem"
                              }),
                              _cache[8] || (_cache[8] = createBaseVNode("div", { class: "text-caption q-mt-xs" }, "Image not found", -1))
                            ])
                          ])
                        ]),
                        default: withCtx(() => [
                          createBaseVNode("div", _hoisted_9, [
                            createBaseVNode("div", _hoisted_10, toDisplayString($setup.getImageDescription(image, index)), 1)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["src", "alt", "onClick"])
                    ]);
                  }), 128))
                ])
              ])
            ]),
            _: 1,
            __: [9]
          })) : $setup.zone.image ? (openBlock(), createBlock(QCardSection, {
            key: 1,
            class: "q-pt-none"
          }, {
            default: withCtx(() => [
              _cache[10] || (_cache[10] = createBaseVNode("div", { class: "text-subtitle2 text-weight-medium q-mb-sm" }, "Zone Photo", -1)),
              createVNode(QImg, {
                src: $setup.zone.image,
                alt: $setup.zone.name,
                class: "rounded-borders cursor-pointer",
                style: { "height": "200px" },
                fit: "cover",
                onClick: _cache[0] || (_cache[0] = ($event) => $setup.openImageViewer($setup.zone.image))
              }, {
                error: withCtx(() => [
                  createBaseVNode("div", _hoisted_11, [
                    createVNode(QIcon, {
                      name: "broken_image",
                      size: "3rem"
                    })
                  ])
                ]),
                _: 1
              }, 8, ["src", "alt"])
            ]),
            _: 1,
            __: [10]
          })) : createCommentVNode("", true),
          createVNode(QTabs, {
            modelValue: $setup.activeTab,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.activeTab = $event),
            dense: "",
            class: "text-grey",
            "active-color": "primary",
            "indicator-color": "primary",
            align: "justify",
            "narrow-indicator": ""
          }, {
            default: withCtx(() => [
              createVNode(QTab, {
                name: "details",
                icon: "info",
                label: "Details"
              }),
              createVNode(QTab, {
                name: "schedule",
                icon: "schedule",
                label: "Schedule"
              }),
              createVNode(QTab, {
                name: "equipment",
                icon: "build",
                label: "Equipment"
              }),
              createVNode(QTab, {
                name: "history",
                icon: "history",
                label: "History"
              })
            ]),
            _: 1
          }, 8, ["modelValue"]),
          createVNode(QSeparator),
          createVNode(QTabPanels, {
            modelValue: $setup.activeTab,
            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.activeTab = $event),
            animated: ""
          }, {
            default: withCtx(() => [
              createVNode(QTabPanel, {
                name: "details",
                class: "q-pa-md"
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_12, [
                    createBaseVNode("div", null, [
                      _cache[11] || (_cache[11] = createBaseVNode("div", { class: "text-subtitle2 text-weight-medium q-mb-sm" }, "Description", -1)),
                      createBaseVNode("div", _hoisted_13, toDisplayString($setup.zone.description), 1)
                    ]),
                    createBaseVNode("div", _hoisted_14, [
                      createBaseVNode("div", _hoisted_15, [
                        createVNode(QList, { dense: "" }, {
                          default: withCtx(() => [
                            createVNode(QItem, null, {
                              default: withCtx(() => [
                                createVNode(QItemSection, { avatar: "" }, {
                                  default: withCtx(() => [
                                    createVNode(QIcon, {
                                      name: "event",
                                      color: "primary"
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(QItemSection, null, {
                                  default: withCtx(() => [
                                    createVNode(QItemLabel, null, {
                                      default: withCtx(() => _cache[12] || (_cache[12] = [
                                        createTextVNode("Scheduled Day", -1)
                                      ])),
                                      _: 1,
                                      __: [12]
                                    }),
                                    createVNode(QItemLabel, {
                                      caption: "",
                                      class: normalizeClass(`schedule-${$setup.zone.scheduledDay.toLowerCase()}`)
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString($setup.zone.scheduledDay), 1)
                                      ]),
                                      _: 1
                                    }, 8, ["class"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(QItem, null, {
                              default: withCtx(() => [
                                createVNode(QItemSection, { avatar: "" }, {
                                  default: withCtx(() => [
                                    createVNode(QIcon, {
                                      name: "flag",
                                      color: $setup.getPriorityColor($setup.zone.priority)
                                    }, null, 8, ["color"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(QItemSection, null, {
                                  default: withCtx(() => [
                                    createVNode(QItemLabel, null, {
                                      default: withCtx(() => _cache[13] || (_cache[13] = [
                                        createTextVNode("Priority", -1)
                                      ])),
                                      _: 1,
                                      __: [13]
                                    }),
                                    createVNode(QItemLabel, { caption: "" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString($setup.zone.priority) + " priority", 1)
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(QItem, null, {
                              default: withCtx(() => [
                                createVNode(QItemSection, { avatar: "" }, {
                                  default: withCtx(() => [
                                    createVNode(QIcon, {
                                      name: "straighten",
                                      color: "info"
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(QItemSection, null, {
                                  default: withCtx(() => [
                                    createVNode(QItemLabel, null, {
                                      default: withCtx(() => _cache[14] || (_cache[14] = [
                                        createTextVNode("Area Size", -1)
                                      ])),
                                      _: 1,
                                      __: [14]
                                    }),
                                    createVNode(QItemLabel, { caption: "" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString($setup.zone.areaSize), 1)
                                      ]),
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
                        })
                      ]),
                      createBaseVNode("div", _hoisted_16, [
                        createVNode(QList, { dense: "" }, {
                          default: withCtx(() => [
                            createVNode(QItem, null, {
                              default: withCtx(() => [
                                createVNode(QItemSection, { avatar: "" }, {
                                  default: withCtx(() => [
                                    createVNode(QIcon, {
                                      name: "schedule",
                                      color: "warning"
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(QItemSection, null, {
                                  default: withCtx(() => [
                                    createVNode(QItemLabel, null, {
                                      default: withCtx(() => _cache[15] || (_cache[15] = [
                                        createTextVNode("Estimated Time", -1)
                                      ])),
                                      _: 1,
                                      __: [15]
                                    }),
                                    createVNode(QItemLabel, { caption: "" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString($setup.zone.estimatedTime) + " minutes", 1)
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(QItem, null, {
                              default: withCtx(() => [
                                createVNode(QItemSection, { avatar: "" }, {
                                  default: withCtx(() => [
                                    createVNode(QIcon, {
                                      name: $setup.zone.completed ? "check_circle" : "radio_button_unchecked",
                                      color: $setup.zone.completed ? "positive" : "grey"
                                    }, null, 8, ["name", "color"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(QItemSection, null, {
                                  default: withCtx(() => [
                                    createVNode(QItemLabel, null, {
                                      default: withCtx(() => _cache[16] || (_cache[16] = [
                                        createTextVNode("Status", -1)
                                      ])),
                                      _: 1,
                                      __: [16]
                                    }),
                                    createVNode(QItemLabel, { caption: "" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString($setup.zone.completed ? "Completed" : "Incomplete"), 1)
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            $setup.zone.lastCompleted ? (openBlock(), createBlock(QItem, { key: 0 }, {
                              default: withCtx(() => [
                                createVNode(QItemSection, { avatar: "" }, {
                                  default: withCtx(() => [
                                    createVNode(QIcon, {
                                      name: "access_time",
                                      color: "positive"
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(QItemSection, null, {
                                  default: withCtx(() => [
                                    createVNode(QItemLabel, null, {
                                      default: withCtx(() => _cache[17] || (_cache[17] = [
                                        createTextVNode("Last Completed", -1)
                                      ])),
                                      _: 1,
                                      __: [17]
                                    }),
                                    createVNode(QItemLabel, { caption: "" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString($setup.formatDate($setup.zone.lastCompleted)), 1)
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })) : createCommentVNode("", true)
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    $setup.zone.notes ? (openBlock(), createElementBlock("div", _hoisted_17, [
                      _cache[18] || (_cache[18] = createBaseVNode("div", { class: "text-subtitle2 text-weight-medium q-mb-sm" }, "Special Notes", -1)),
                      createVNode(QCard, {
                        flat: "",
                        bordered: "",
                        class: "q-pa-md bg-blue-1"
                      }, {
                        default: withCtx(() => [
                          createBaseVNode("div", _hoisted_18, toDisplayString($setup.zone.notes), 1)
                        ]),
                        _: 1
                      })
                    ])) : createCommentVNode("", true)
                  ])
                ]),
                _: 1
              }),
              createVNode(QTabPanel, {
                name: "schedule",
                class: "q-pa-md"
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_19, [
                    _cache[24] || (_cache[24] = createBaseVNode("div", { class: "text-subtitle1 text-weight-medium" }, "Schedule Information", -1)),
                    createVNode(QCard, {
                      flat: "",
                      bordered: "",
                      class: "q-pa-md"
                    }, {
                      default: withCtx(() => [
                        createBaseVNode("div", _hoisted_20, [
                          createBaseVNode("div", _hoisted_21, [
                            createVNode(QIcon, {
                              name: "event",
                              size: "2rem",
                              class: normalizeClass(`schedule-${$setup.zone.scheduledDay.toLowerCase()}`)
                            }, null, 8, ["class"])
                          ]),
                          createBaseVNode("div", _hoisted_22, [
                            createBaseVNode("div", _hoisted_23, toDisplayString($setup.zone.scheduledDay), 1),
                            _cache[19] || (_cache[19] = createBaseVNode("div", { class: "text-caption text-grey" }, "Scheduled cutting day", -1))
                          ]),
                          createBaseVNode("div", _hoisted_24, [
                            createVNode(QChip, {
                              color: $setup.getDayColor($setup.zone.scheduledDay),
                              "text-color": "white",
                              icon: "schedule"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString($setup.zone.estimatedTime) + "min ", 1)
                              ]),
                              _: 1
                            }, 8, ["color"])
                          ])
                        ])
                      ]),
                      _: 1
                    }),
                    createBaseVNode("div", null, [
                      _cache[23] || (_cache[23] = createBaseVNode("div", { class: "text-subtitle2 q-mb-sm" }, "This Week's Progress", -1)),
                      createBaseVNode("div", _hoisted_25, [
                        createBaseVNode("div", _hoisted_26, [
                          createVNode(QCard, {
                            flat: "",
                            bordered: "",
                            class: "text-center q-pa-sm"
                          }, {
                            default: withCtx(() => [
                              createBaseVNode("div", _hoisted_27, toDisplayString($setup.weeklyStats.completed), 1),
                              _cache[20] || (_cache[20] = createBaseVNode("div", { class: "text-caption" }, "Completed", -1))
                            ]),
                            _: 1,
                            __: [20]
                          })
                        ]),
                        createBaseVNode("div", _hoisted_28, [
                          createVNode(QCard, {
                            flat: "",
                            bordered: "",
                            class: "text-center q-pa-sm"
                          }, {
                            default: withCtx(() => [
                              createBaseVNode("div", _hoisted_29, toDisplayString($setup.weeklyStats.total), 1),
                              _cache[21] || (_cache[21] = createBaseVNode("div", { class: "text-caption" }, "Total Zones", -1))
                            ]),
                            _: 1,
                            __: [21]
                          })
                        ]),
                        createBaseVNode("div", _hoisted_30, [
                          createVNode(QCard, {
                            flat: "",
                            bordered: "",
                            class: "text-center q-pa-sm"
                          }, {
                            default: withCtx(() => [
                              createBaseVNode("div", _hoisted_31, toDisplayString($setup.weeklyStats.remaining), 1),
                              _cache[22] || (_cache[22] = createBaseVNode("div", { class: "text-caption" }, "Remaining", -1))
                            ]),
                            _: 1,
                            __: [22]
                          })
                        ])
                      ])
                    ]),
                    createVNode(QSeparator),
                    createBaseVNode("div", _hoisted_32, [
                      createVNode(QBtn, {
                        outline: "",
                        color: "primary",
                        icon: "edit",
                        label: "Reschedule",
                        onClick: _cache[2] || (_cache[2] = ($event) => $setup.showReschedule = true)
                      }),
                      createVNode(QBtn, {
                        outline: "",
                        color: "info",
                        icon: "content_copy",
                        label: "Duplicate Zone",
                        onClick: $setup.duplicateZone
                      })
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(QTabPanel, {
                name: "equipment",
                class: "q-pa-md"
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_33, [
                    _cache[26] || (_cache[26] = createBaseVNode("div", { class: "text-subtitle1 text-weight-medium" }, "Required Equipment", -1)),
                    createBaseVNode("div", _hoisted_34, [
                      createVNode(QList, { bordered: "" }, {
                        default: withCtx(() => [
                          (openBlock(true), createElementBlock(Fragment, null, renderList($setup.zone.equipment, (equipment, index) => {
                            return openBlock(), createBlock(QItem, {
                              key: index,
                              class: "equipment-item"
                            }, {
                              default: withCtx(() => [
                                createVNode(QItemSection, { avatar: "" }, {
                                  default: withCtx(() => [
                                    createVNode(QIcon, {
                                      name: $setup.getEquipmentIcon(equipment),
                                      color: "primary"
                                    }, null, 8, ["name"])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(QItemSection, null, {
                                  default: withCtx(() => [
                                    createVNode(QItemLabel, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(equipment), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(QItemLabel, { caption: "" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString($setup.getEquipmentDescription(equipment)), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(QItemSection, { side: "" }, {
                                  default: withCtx(() => [
                                    createVNode(QCheckbox, {
                                      modelValue: $setup.equipmentChecklist[index],
                                      "onUpdate:modelValue": ($event) => $setup.equipmentChecklist[index] = $event
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode(QCard, {
                      flat: "",
                      bordered: "",
                      class: "q-pa-md bg-green-1"
                    }, {
                      default: withCtx(() => [
                        createBaseVNode("div", _hoisted_35, [
                          createVNode(QIcon, {
                            name: "checklist",
                            size: "2rem",
                            color: "positive"
                          }),
                          createBaseVNode("div", null, [
                            _cache[25] || (_cache[25] = createBaseVNode("div", { class: "text-body1 text-weight-medium" }, "Equipment Checklist", -1)),
                            createBaseVNode("div", _hoisted_36, toDisplayString($setup.checkedEquipment) + "/" + toDisplayString($setup.zone.equipment.length) + " items ready ", 1)
                          ])
                        ])
                      ]),
                      _: 1
                    }),
                    createBaseVNode("div", _hoisted_37, [
                      createVNode(QBtn, {
                        outline: "",
                        color: "positive",
                        icon: "check_circle",
                        label: "Mark All Ready",
                        onClick: $setup.checkAllEquipment
                      }),
                      createVNode(QBtn, {
                        outline: "",
                        color: "grey",
                        icon: "clear_all",
                        label: "Clear Checklist",
                        onClick: $setup.clearEquipmentChecklist
                      })
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(QTabPanel, {
                name: "history",
                class: "q-pa-md"
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_38, [
                    _cache[29] || (_cache[29] = createBaseVNode("div", { class: "text-subtitle1 text-weight-medium" }, "Completion History", -1)),
                    createVNode(QTimeline, null, {
                      default: withCtx(() => [
                        $setup.zone.lastCompleted ? (openBlock(), createBlock(QTimelineEntry, {
                          key: 0,
                          title: "Completed on " + $setup.formatDate($setup.zone.lastCompleted),
                          subtitle: "Last maintenance completed",
                          icon: "check_circle",
                          color: "positive"
                        }, null, 8, ["title"])) : createCommentVNode("", true),
                        createVNode(QTimelineEntry, {
                          title: "Zone Created",
                          subtitle: "Initial zone setup",
                          icon: "add_location",
                          color: "info"
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(QCard, {
                      flat: "",
                      bordered: "",
                      class: "q-pa-md"
                    }, {
                      default: withCtx(() => [
                        createBaseVNode("div", _hoisted_39, [
                          createVNode(QIcon, {
                            name: "analytics",
                            size: "3rem",
                            class: "q-mb-md"
                          }),
                          _cache[27] || (_cache[27] = createBaseVNode("div", null, "Detailed analytics coming soon", -1)),
                          _cache[28] || (_cache[28] = createBaseVNode("div", { class: "text-caption" }, " Track completion trends, efficiency metrics, and more ", -1))
                        ])
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["modelValue"]),
          createVNode(QSeparator),
          createVNode(QCardActions, {
            align: "right",
            class: "q-pa-md"
          }, {
            default: withCtx(() => [
              withDirectives(createVNode(QBtn, {
                flat: "",
                color: "grey",
                label: "Close"
              }, null, 512), [
                [ClosePopup]
              ]),
              createVNode(QBtn, {
                color: "primary",
                icon: "edit",
                label: "Edit Zone",
                onClick: $setup.editZone
              }),
              createVNode(QBtn, {
                color: "negative",
                icon: "delete",
                label: "Delete Zone",
                onClick: $setup.confirmDeleteZone
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      })) : createCommentVNode("", true),
      createVNode(QDialog, {
        modelValue: $setup.showReschedule,
        "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.showReschedule = $event)
      }, {
        default: withCtx(() => [
          createVNode(QCard, { style: { "min-width": "300px" } }, {
            default: withCtx(() => [
              createVNode(QCardSection, null, {
                default: withCtx(() => _cache[30] || (_cache[30] = [
                  createBaseVNode("div", { class: "text-h6" }, "Reschedule Zone", -1)
                ])),
                _: 1,
                __: [30]
              }),
              createVNode(QCardSection, { class: "q-pt-none" }, {
                default: withCtx(() => [
                  createVNode(QSelect, {
                    modelValue: $setup.newScheduleDay,
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.newScheduleDay = $event),
                    options: $setup.dayOptions,
                    label: "New Scheduled Day",
                    "emit-value": "",
                    "map-options": ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              createVNode(QCardActions, { align: "right" }, {
                default: withCtx(() => [
                  withDirectives(createVNode(QBtn, {
                    flat: "",
                    label: "Cancel",
                    color: "grey"
                  }, null, 512), [
                    [ClosePopup]
                  ]),
                  createVNode(QBtn, {
                    label: "Reschedule",
                    color: "primary",
                    onClick: $setup.rescheduleZone,
                    disable: !$setup.newScheduleDay
                  }, null, 8, ["disable"])
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
        modelValue: $setup.imageViewerOpen,
        "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $setup.imageViewerOpen = $event),
        maximized: ""
      }, {
        default: withCtx(() => [
          createVNode(QCard, { class: "bg-black text-white" }, {
            default: withCtx(() => [
              createVNode(QCardSection, { class: "row items-center q-pb-none" }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_40, toDisplayString($setup.zone?.name) + " - Zone Photo", 1),
                  createVNode(QSpace),
                  withDirectives(createVNode(QBtn, {
                    icon: "close",
                    flat: "",
                    round: "",
                    dense: "",
                    color: "white"
                  }, null, 512), [
                    [ClosePopup]
                  ])
                ]),
                _: 1
              }),
              createVNode(QCardSection, {
                class: "flex flex-center",
                style: { "height": "calc(100vh - 100px)" }
              }, {
                default: withCtx(() => [
                  $setup.currentImage ? (openBlock(), createBlock(QImg, {
                    key: 0,
                    src: $setup.currentImage,
                    alt: $setup.zone?.name,
                    fit: "contain",
                    style: { "max-height": "100%", "max-width": "100%" },
                    class: "rounded-borders"
                  }, {
                    error: withCtx(() => [
                      createBaseVNode("div", _hoisted_41, [
                        createBaseVNode("div", _hoisted_42, [
                          createVNode(QIcon, {
                            name: "broken_image",
                            size: "4rem"
                          }),
                          _cache[31] || (_cache[31] = createBaseVNode("div", { class: "q-mt-md" }, "Image could not be loaded", -1))
                        ])
                      ])
                    ]),
                    _: 1
                  }, 8, ["src", "alt"])) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["modelValue"])
    ]),
    _: 1
  }, 8, ["modelValue", "onHide", "maximized"]);
}
const ZoneDetailsDialog = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-807fcec9"], ["__file", "ZoneDetailsDialog.vue"]]);
export {
  QPage as Q,
  ZoneDetailsDialog as Z,
  QImg as a,
  QList as b
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWm9uZURldGFpbHNEaWFsb2ctQmlJRTVOdU4uanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvcGFnZS9RUGFnZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLXJhdGlvL3VzZS1yYXRpby5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvaW1nL1FJbWcuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3RhYnMvdXNlLXRhYi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvdGFicy9RVGFiLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy90YWJzL1FUYWJzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9pdGVtL1FMaXN0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvZGlyZWN0aXZlcy90b3VjaC1zd2lwZS9Ub3VjaFN3aXBlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvdXNlLXJlbmRlci1jYWNoZS91c2UtcmVuZGVyLWNhY2hlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtcGFuZWwvdXNlLXBhbmVsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy90YWItcGFuZWxzL1FUYWJQYW5lbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvdGltZWxpbmUvUVRpbWVsaW5lRW50cnkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3RpbWVsaW5lL1FUaW1lbGluZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvdGFiLXBhbmVscy9RVGFiUGFuZWxzLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvWm9uZURldGFpbHNEaWFsb2cudnVlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGgsIGNvbXB1dGVkLCBpbmplY3QsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5pbXBvcnQgeyBwYWdlQ29udGFpbmVyS2V5LCBsYXlvdXRLZXksIGVtcHR5UmVuZGVyRm4gfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnN5bWJvbHMvc3ltYm9scy5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FQYWdlJyxcblxuICBwcm9wczoge1xuICAgIHBhZGRpbmc6IEJvb2xlYW4sXG4gICAgc3R5bGVGbjogRnVuY3Rpb25cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IHsgcHJveHk6IHsgJHEgfSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIGNvbnN0ICRsYXlvdXQgPSBpbmplY3QobGF5b3V0S2V5LCBlbXB0eVJlbmRlckZuKVxuICAgIGlmICgkbGF5b3V0ID09PSBlbXB0eVJlbmRlckZuKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdRUGFnZSBuZWVkcyB0byBiZSBhIGRlZXAgY2hpbGQgb2YgUUxheW91dCcpXG4gICAgICByZXR1cm4gZW1wdHlSZW5kZXJGblxuICAgIH1cblxuICAgIGNvbnN0ICRwYWdlQ29udGFpbmVyID0gaW5qZWN0KHBhZ2VDb250YWluZXJLZXksIGVtcHR5UmVuZGVyRm4pXG4gICAgaWYgKCRwYWdlQ29udGFpbmVyID09PSBlbXB0eVJlbmRlckZuKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdRUGFnZSBuZWVkcyB0byBiZSBjaGlsZCBvZiBRUGFnZUNvbnRhaW5lcicpXG4gICAgICByZXR1cm4gZW1wdHlSZW5kZXJGblxuICAgIH1cblxuICAgIGNvbnN0IHN0eWxlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3Qgb2Zmc2V0XG4gICAgICAgID0gKCRsYXlvdXQuaGVhZGVyLnNwYWNlID09PSB0cnVlID8gJGxheW91dC5oZWFkZXIuc2l6ZSA6IDApXG4gICAgICAgICsgKCRsYXlvdXQuZm9vdGVyLnNwYWNlID09PSB0cnVlID8gJGxheW91dC5mb290ZXIuc2l6ZSA6IDApXG5cbiAgICAgIGlmICh0eXBlb2YgcHJvcHMuc3R5bGVGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBjb25zdCBoZWlnaHQgPSAkbGF5b3V0LmlzQ29udGFpbmVyLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgPyAkbGF5b3V0LmNvbnRhaW5lckhlaWdodC52YWx1ZVxuICAgICAgICAgIDogJHEuc2NyZWVuLmhlaWdodFxuXG4gICAgICAgIHJldHVybiBwcm9wcy5zdHlsZUZuKG9mZnNldCwgaGVpZ2h0KVxuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBtaW5IZWlnaHQ6ICRsYXlvdXQuaXNDb250YWluZXIudmFsdWUgPT09IHRydWVcbiAgICAgICAgICA/ICgkbGF5b3V0LmNvbnRhaW5lckhlaWdodC52YWx1ZSAtIG9mZnNldCkgKyAncHgnXG4gICAgICAgICAgOiAoXG4gICAgICAgICAgICAgICRxLnNjcmVlbi5oZWlnaHQgPT09IDBcbiAgICAgICAgICAgICAgICA/IChvZmZzZXQgIT09IDAgPyBgY2FsYygxMDB2aCAtICR7IG9mZnNldCB9cHgpYCA6ICcxMDB2aCcpXG4gICAgICAgICAgICAgICAgOiAoJHEuc2NyZWVuLmhlaWdodCAtIG9mZnNldCkgKyAncHgnXG4gICAgICAgICAgICApXG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgYHEtcGFnZSR7IHByb3BzLnBhZGRpbmcgPT09IHRydWUgPyAnIHEtbGF5b3V0LXBhZGRpbmcnIDogJycgfWBcbiAgICApXG5cbiAgICByZXR1cm4gKCkgPT4gaCgnbWFpbicsIHtcbiAgICAgIGNsYXNzOiBjbGFzc2VzLnZhbHVlLFxuICAgICAgc3R5bGU6IHN0eWxlLnZhbHVlXG4gICAgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuZXhwb3J0IGNvbnN0IHVzZVJhdGlvUHJvcHMgPSB7XG4gIHJhdGlvOiBbIFN0cmluZywgTnVtYmVyIF1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCBuYXR1cmFsUmF0aW8pIHtcbiAgLy8gcmV0dXJuIHJhdGlvU3R5bGVcbiAgcmV0dXJuIGNvbXB1dGVkKCgpID0+IHtcbiAgICBjb25zdCByYXRpbyA9IE51bWJlcihcbiAgICAgIHByb3BzLnJhdGlvIHx8IChuYXR1cmFsUmF0aW8gIT09IHZvaWQgMCA/IG5hdHVyYWxSYXRpby52YWx1ZSA6IHZvaWQgMClcbiAgICApXG5cbiAgICByZXR1cm4gaXNOYU4ocmF0aW8pICE9PSB0cnVlICYmIHJhdGlvID4gMFxuICAgICAgPyB7IHBhZGRpbmdCb3R0b206IGAkeyAxMDAgLyByYXRpbyB9JWAgfVxuICAgICAgOiBudWxsXG4gIH0pXG59XG4iLCJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCB3YXRjaCwgb25Nb3VudGVkLCBUcmFuc2l0aW9uLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRU3Bpbm5lciBmcm9tICcuLi9zcGlubmVyL1FTcGlubmVyLmpzJ1xuXG5pbXBvcnQgeyBpc1J1bnRpbWVTc3JQcmVIeWRyYXRpb24gfSBmcm9tICcuLi8uLi9wbHVnaW5zL3BsYXRmb3JtL1BsYXRmb3JtLmpzJ1xuaW1wb3J0IHVzZVJhdGlvLCB7IHVzZVJhdGlvUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1yYXRpby91c2UtcmF0aW8uanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5yZW5kZXIvcmVuZGVyLmpzJ1xuaW1wb3J0IHsgdm1Jc0Rlc3Ryb3llZCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUudm0vdm0uanMnXG5pbXBvcnQgdXNlVGltZW91dCBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy91c2UtdGltZW91dC91c2UtdGltZW91dC5qcydcblxuY29uc3QgZGVmYXVsdFJhdGlvID0gMS43Nzc4IC8qIDE2LzkgKi9cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FJbWcnLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlUmF0aW9Qcm9wcyxcblxuICAgIHNyYzogU3RyaW5nLFxuICAgIHNyY3NldDogU3RyaW5nLFxuICAgIHNpemVzOiBTdHJpbmcsXG5cbiAgICBhbHQ6IFN0cmluZyxcbiAgICBjcm9zc29yaWdpbjogU3RyaW5nLFxuICAgIGRlY29kaW5nOiBTdHJpbmcsXG4gICAgcmVmZXJyZXJwb2xpY3k6IFN0cmluZyxcblxuICAgIGRyYWdnYWJsZTogQm9vbGVhbixcblxuICAgIGxvYWRpbmc6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdsYXp5J1xuICAgIH0sXG4gICAgbG9hZGluZ1Nob3dEZWxheToge1xuICAgICAgdHlwZTogWyBOdW1iZXIsIFN0cmluZyBdLFxuICAgICAgZGVmYXVsdDogMFxuICAgIH0sXG5cbiAgICBmZXRjaHByaW9yaXR5OiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnYXV0bydcbiAgICB9LFxuICAgIHdpZHRoOiBTdHJpbmcsXG4gICAgaGVpZ2h0OiBTdHJpbmcsXG4gICAgaW5pdGlhbFJhdGlvOiB7XG4gICAgICB0eXBlOiBbIE51bWJlciwgU3RyaW5nIF0sXG4gICAgICBkZWZhdWx0OiBkZWZhdWx0UmF0aW9cbiAgICB9LFxuXG4gICAgcGxhY2Vob2xkZXJTcmM6IFN0cmluZyxcbiAgICBlcnJvclNyYzogU3RyaW5nLFxuXG4gICAgZml0OiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnY292ZXInXG4gICAgfSxcbiAgICBwb3NpdGlvbjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJzUwJSA1MCUnXG4gICAgfSxcblxuICAgIGltZ0NsYXNzOiBTdHJpbmcsXG4gICAgaW1nU3R5bGU6IE9iamVjdCxcblxuICAgIG5vU3Bpbm5lcjogQm9vbGVhbixcbiAgICBub05hdGl2ZU1lbnU6IEJvb2xlYW4sXG4gICAgbm9UcmFuc2l0aW9uOiBCb29sZWFuLFxuXG4gICAgc3Bpbm5lckNvbG9yOiBTdHJpbmcsXG4gICAgc3Bpbm5lclNpemU6IFN0cmluZ1xuICB9LFxuXG4gIGVtaXRzOiBbICdsb2FkJywgJ2Vycm9yJyBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCB9KSB7XG4gICAgY29uc3QgbmF0dXJhbFJhdGlvID0gcmVmKHByb3BzLmluaXRpYWxSYXRpbylcbiAgICBjb25zdCByYXRpb1N0eWxlID0gdXNlUmF0aW8ocHJvcHMsIG5hdHVyYWxSYXRpbylcbiAgICBjb25zdCB2bSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgICBjb25zdCB7IHJlZ2lzdGVyVGltZW91dDogcmVnaXN0ZXJMb2FkVGltZW91dCwgcmVtb3ZlVGltZW91dDogcmVtb3ZlTG9hZFRpbWVvdXQgfSA9IHVzZVRpbWVvdXQoKVxuICAgIGNvbnN0IHsgcmVnaXN0ZXJUaW1lb3V0OiByZWdpc3RlckxvYWRTaG93VGltZW91dCwgcmVtb3ZlVGltZW91dDogcmVtb3ZlTG9hZFNob3dUaW1lb3V0IH0gPSB1c2VUaW1lb3V0KClcblxuICAgIGNvbnN0IHBsYWNlaG9sZGVySW1nID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMucGxhY2Vob2xkZXJTcmMgIT09IHZvaWQgMFxuICAgICAgICA/IHsgc3JjOiBwcm9wcy5wbGFjZWhvbGRlclNyYyB9XG4gICAgICAgIDogbnVsbFxuICAgICkpXG5cbiAgICBjb25zdCBlcnJvckltZyA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLmVycm9yU3JjICE9PSB2b2lkIDBcbiAgICAgICAgPyB7IHNyYzogcHJvcHMuZXJyb3JTcmMsIF9fcWVycm9yOiB0cnVlIH1cbiAgICAgICAgOiBudWxsXG4gICAgKSlcblxuICAgIGNvbnN0IGltYWdlcyA9IFtcbiAgICAgIHJlZihudWxsKSxcbiAgICAgIHJlZihwbGFjZWhvbGRlckltZy52YWx1ZSlcbiAgICBdXG5cbiAgICBjb25zdCBwb3NpdGlvbiA9IHJlZigwKVxuXG4gICAgY29uc3QgaXNMb2FkaW5nID0gcmVmKGZhbHNlKVxuICAgIGNvbnN0IGhhc0Vycm9yID0gcmVmKGZhbHNlKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBgcS1pbWcgcS1pbWctLSR7IHByb3BzLm5vTmF0aXZlTWVudSA9PT0gdHJ1ZSA/ICduby0nIDogJycgfW1lbnVgXG4gICAgKVxuXG4gICAgY29uc3Qgc3R5bGUgPSBjb21wdXRlZCgoKSA9PiAoe1xuICAgICAgd2lkdGg6IHByb3BzLndpZHRoLFxuICAgICAgaGVpZ2h0OiBwcm9wcy5oZWlnaHRcbiAgICB9KSlcblxuICAgIGNvbnN0IGltZ0NsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIGBxLWltZ19faW1hZ2UgJHsgcHJvcHMuaW1nQ2xhc3MgIT09IHZvaWQgMCA/IHByb3BzLmltZ0NsYXNzICsgJyAnIDogJycgfWBcbiAgICAgICsgYHEtaW1nX19pbWFnZS0td2l0aCR7IHByb3BzLm5vVHJhbnNpdGlvbiA9PT0gdHJ1ZSA/ICdvdXQnIDogJycgfS10cmFuc2l0aW9uYFxuICAgICAgKyAnIHEtaW1nX19pbWFnZS0tJ1xuICAgIClcblxuICAgIGNvbnN0IGltZ1N0eWxlID0gY29tcHV0ZWQoKCkgPT4gKHtcbiAgICAgIC4uLnByb3BzLmltZ1N0eWxlLFxuICAgICAgb2JqZWN0Rml0OiBwcm9wcy5maXQsXG4gICAgICBvYmplY3RQb3NpdGlvbjogcHJvcHMucG9zaXRpb25cbiAgICB9KSlcblxuICAgIGZ1bmN0aW9uIHNldExvYWRpbmcgKCkge1xuICAgICAgcmVtb3ZlTG9hZFNob3dUaW1lb3V0KClcblxuICAgICAgaWYgKHByb3BzLmxvYWRpbmdTaG93RGVsYXkgPT09IDApIHtcbiAgICAgICAgaXNMb2FkaW5nLnZhbHVlID0gdHJ1ZVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgcmVnaXN0ZXJMb2FkU2hvd1RpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpc0xvYWRpbmcudmFsdWUgPSB0cnVlXG4gICAgICB9LCBwcm9wcy5sb2FkaW5nU2hvd0RlbGF5KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsZWFyTG9hZGluZyAoKSB7XG4gICAgICByZW1vdmVMb2FkU2hvd1RpbWVvdXQoKVxuICAgICAgaXNMb2FkaW5nLnZhbHVlID0gZmFsc2VcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkxvYWQgKHsgdGFyZ2V0IH0pIHtcbiAgICAgIGlmICh2bUlzRGVzdHJveWVkKHZtKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmVtb3ZlTG9hZFRpbWVvdXQoKVxuXG4gICAgICAgIG5hdHVyYWxSYXRpby52YWx1ZSA9IHRhcmdldC5uYXR1cmFsSGVpZ2h0ID09PSAwXG4gICAgICAgICAgPyAwLjVcbiAgICAgICAgICA6IHRhcmdldC5uYXR1cmFsV2lkdGggLyB0YXJnZXQubmF0dXJhbEhlaWdodFxuXG4gICAgICAgIHdhaXRGb3JDb21wbGV0ZW5lc3ModGFyZ2V0LCAxKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHdhaXRGb3JDb21wbGV0ZW5lc3MgKHRhcmdldCwgY291bnQpIHtcbiAgICAgIC8vIHByb3RlY3QgYWdhaW5zdCBydW5uaW5nIGZvcmV2ZXJcbiAgICAgIGlmIChjb3VudCA9PT0gMTAwMCB8fCB2bUlzRGVzdHJveWVkKHZtKSA9PT0gdHJ1ZSkgcmV0dXJuXG5cbiAgICAgIGlmICh0YXJnZXQuY29tcGxldGUgPT09IHRydWUpIHtcbiAgICAgICAgb25SZWFkeSh0YXJnZXQpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmVnaXN0ZXJMb2FkVGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgd2FpdEZvckNvbXBsZXRlbmVzcyh0YXJnZXQsIGNvdW50ICsgMSlcbiAgICAgICAgfSwgNTApXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25SZWFkeSAodGFyZ2V0KSB7XG4gICAgICBpZiAodm1Jc0Rlc3Ryb3llZCh2bSkgPT09IHRydWUpIHJldHVyblxuXG4gICAgICBwb3NpdGlvbi52YWx1ZSA9IHBvc2l0aW9uLnZhbHVlIF4gMVxuICAgICAgaW1hZ2VzWyBwb3NpdGlvbi52YWx1ZSBdLnZhbHVlID0gbnVsbFxuXG4gICAgICBjbGVhckxvYWRpbmcoKVxuXG4gICAgICBpZiAodGFyZ2V0LmdldEF0dHJpYnV0ZSgnX19xZXJyb3InKSAhPT0gJ3RydWUnKSB7XG4gICAgICAgIGhhc0Vycm9yLnZhbHVlID0gZmFsc2VcbiAgICAgIH1cblxuICAgICAgZW1pdCgnbG9hZCcsIHRhcmdldC5jdXJyZW50U3JjIHx8IHRhcmdldC5zcmMpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25FcnJvciAoZXJyKSB7XG4gICAgICByZW1vdmVMb2FkVGltZW91dCgpXG4gICAgICBjbGVhckxvYWRpbmcoKVxuXG4gICAgICBoYXNFcnJvci52YWx1ZSA9IHRydWVcbiAgICAgIGltYWdlc1sgcG9zaXRpb24udmFsdWUgXS52YWx1ZSA9IGVycm9ySW1nLnZhbHVlXG4gICAgICBpbWFnZXNbIHBvc2l0aW9uLnZhbHVlIF4gMSBdLnZhbHVlID0gcGxhY2Vob2xkZXJJbWcudmFsdWVcblxuICAgICAgZW1pdCgnZXJyb3InLCBlcnIpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0SW1hZ2UgKGluZGV4KSB7XG4gICAgICBjb25zdCBpbWcgPSBpbWFnZXNbIGluZGV4IF0udmFsdWVcblxuICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAga2V5OiAnaW1nXycgKyBpbmRleCxcbiAgICAgICAgY2xhc3M6IGltZ0NsYXNzLnZhbHVlLFxuICAgICAgICBzdHlsZTogaW1nU3R5bGUudmFsdWUsXG4gICAgICAgIGFsdDogcHJvcHMuYWx0LFxuICAgICAgICBjcm9zc29yaWdpbjogcHJvcHMuY3Jvc3NvcmlnaW4sXG4gICAgICAgIGRlY29kaW5nOiBwcm9wcy5kZWNvZGluZyxcbiAgICAgICAgcmVmZXJyZXJwb2xpY3k6IHByb3BzLnJlZmVycmVycG9saWN5LFxuICAgICAgICBoZWlnaHQ6IHByb3BzLmhlaWdodCxcbiAgICAgICAgd2lkdGg6IHByb3BzLndpZHRoLFxuICAgICAgICBsb2FkaW5nOiBwcm9wcy5sb2FkaW5nLFxuICAgICAgICBmZXRjaHByaW9yaXR5OiBwcm9wcy5mZXRjaHByaW9yaXR5LFxuICAgICAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZScsXG4gICAgICAgIGRyYWdnYWJsZTogcHJvcHMuZHJhZ2dhYmxlLFxuICAgICAgICAuLi5pbWdcbiAgICAgIH1cblxuICAgICAgaWYgKHBvc2l0aW9uLnZhbHVlID09PSBpbmRleCkge1xuICAgICAgICBPYmplY3QuYXNzaWduKGRhdGEsIHtcbiAgICAgICAgICBjbGFzczogZGF0YS5jbGFzcyArICdjdXJyZW50JyxcbiAgICAgICAgICBvbkxvYWQsXG4gICAgICAgICAgb25FcnJvclxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGRhdGEuY2xhc3MgKz0gJ2xvYWRlZCdcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGgoXG4gICAgICAgICdkaXYnLFxuICAgICAgICB7IGNsYXNzOiAncS1pbWdfX2NvbnRhaW5lciBhYnNvbHV0ZS1mdWxsJywga2V5OiAnaW1nJyArIGluZGV4IH0sXG4gICAgICAgIGgoJ2ltZycsIGRhdGEpXG4gICAgICApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Q29udGVudCAoKSB7XG4gICAgICBpZiAoaXNMb2FkaW5nLnZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICAgIGtleTogJ2NvbnRlbnQnLFxuICAgICAgICAgIGNsYXNzOiAncS1pbWdfX2NvbnRlbnQgYWJzb2x1dGUtZnVsbCBxLWFuY2hvci0tc2tpcCdcbiAgICAgICAgfSwgaFNsb3Qoc2xvdHNbIGhhc0Vycm9yLnZhbHVlID09PSB0cnVlID8gJ2Vycm9yJyA6ICdkZWZhdWx0JyBdKSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAga2V5OiAnbG9hZGluZycsXG4gICAgICAgIGNsYXNzOiAncS1pbWdfX2xvYWRpbmcgYWJzb2x1dGUtZnVsbCBmbGV4IGZsZXgtY2VudGVyJ1xuICAgICAgfSwgKFxuICAgICAgICBzbG90cy5sb2FkaW5nICE9PSB2b2lkIDBcbiAgICAgICAgICA/IHNsb3RzLmxvYWRpbmcoKVxuICAgICAgICAgIDogKFxuICAgICAgICAgICAgICBwcm9wcy5ub1NwaW5uZXIgPT09IHRydWVcbiAgICAgICAgICAgICAgICA/IHZvaWQgMFxuICAgICAgICAgICAgICAgIDogW1xuICAgICAgICAgICAgICAgICAgICBoKFFTcGlubmVyLCB7XG4gICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHByb3BzLnNwaW5uZXJDb2xvcixcbiAgICAgICAgICAgICAgICAgICAgICBzaXplOiBwcm9wcy5zcGlubmVyU2l6ZVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgKVxuICAgICAgKSlcbiAgICB9XG5cbiAgICBpZiAoX19RVUFTQVJfU1NSX1NFUlZFUl9fICE9PSB0cnVlKSB7XG4gICAgICBmdW5jdGlvbiB3YXRjaFNyYyAoKSB7XG4gICAgICAgIHdhdGNoKFxuICAgICAgICAgICgpID0+IChcbiAgICAgICAgICAgIHByb3BzLnNyYyB8fCBwcm9wcy5zcmNzZXQgfHwgcHJvcHMuc2l6ZXNcbiAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICBzcmM6IHByb3BzLnNyYyxcbiAgICAgICAgICAgICAgICAgIHNyY3NldDogcHJvcHMuc3Jjc2V0LFxuICAgICAgICAgICAgICAgICAgc2l6ZXM6IHByb3BzLnNpemVzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICA6IG51bGxcbiAgICAgICAgICApLFxuICAgICAgICAgIGltZ1Byb3BzID0+IHtcbiAgICAgICAgICAgIHJlbW92ZUxvYWRUaW1lb3V0KClcbiAgICAgICAgICAgIGhhc0Vycm9yLnZhbHVlID0gZmFsc2VcblxuICAgICAgICAgICAgaWYgKGltZ1Byb3BzID09PSBudWxsKSB7XG4gICAgICAgICAgICAgIGNsZWFyTG9hZGluZygpXG4gICAgICAgICAgICAgIGltYWdlc1sgcG9zaXRpb24udmFsdWUgXiAxIF0udmFsdWUgPSBwbGFjZWhvbGRlckltZy52YWx1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIHNldExvYWRpbmcoKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpbWFnZXNbIHBvc2l0aW9uLnZhbHVlIF0udmFsdWUgPSBpbWdQcm9wc1xuICAgICAgICAgIH0sXG4gICAgICAgICAgeyBpbW1lZGlhdGU6IHRydWUgfVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIGlmIChpc1J1bnRpbWVTc3JQcmVIeWRyYXRpb24udmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgb25Nb3VudGVkKHdhdGNoU3JjKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHdhdGNoU3JjKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY29uc3QgY29udGVudCA9IFtdXG5cbiAgICAgIGlmIChyYXRpb1N0eWxlLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIGNvbnRlbnQucHVzaChcbiAgICAgICAgICBoKCdkaXYnLCB7IGtleTogJ2ZpbGxlcicsIHN0eWxlOiByYXRpb1N0eWxlLnZhbHVlIH0pXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgaWYgKGltYWdlc1sgMCBdLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIGNvbnRlbnQucHVzaChcbiAgICAgICAgICBnZXRJbWFnZSgwKVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIGlmIChpbWFnZXNbIDEgXS52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICBjb250ZW50LnB1c2goXG4gICAgICAgICAgZ2V0SW1hZ2UoMSlcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICBjb250ZW50LnB1c2goXG4gICAgICAgIGgoVHJhbnNpdGlvbiwgeyBuYW1lOiAncS10cmFuc2l0aW9uLS1mYWRlJyB9LCBnZXRDb250ZW50KVxuICAgICAgKVxuXG4gICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICBrZXk6ICdtYWluJyxcbiAgICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUsXG4gICAgICAgIHN0eWxlOiBzdHlsZS52YWx1ZSxcbiAgICAgICAgcm9sZTogJ2ltZycsXG4gICAgICAgICdhcmlhLWxhYmVsJzogcHJvcHMuYWx0XG4gICAgICB9LCBjb250ZW50KVxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIGluamVjdCwgb25CZWZvcmVVbm1vdW50LCBvbk1vdW50ZWQsIHdpdGhEaXJlY3RpdmVzLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRSWNvbiBmcm9tICcuLi9pY29uL1FJY29uLmpzJ1xuXG5pbXBvcnQgUmlwcGxlIGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvcmlwcGxlL1JpcHBsZS5qcydcblxuaW1wb3J0IHsgaE1lcmdlU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcbmltcG9ydCB7IGlzS2V5Q29kZSwgc2hvdWxkSWdub3JlS2V5IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5rZXlib2FyZC9rZXktY29tcG9zaXRpb24uanMnXG5pbXBvcnQgeyB0YWJzS2V5LCBlbXB0eVJlbmRlckZuIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5zeW1ib2xzL3N5bWJvbHMuanMnXG5pbXBvcnQgeyBzdG9wQW5kUHJldmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50L2V2ZW50LmpzJ1xuaW1wb3J0IHVpZCBmcm9tICcuLi8uLi91dGlscy91aWQvdWlkLmpzJ1xuaW1wb3J0IHsgaXNEZWVwRXF1YWwgfSBmcm9tICcuLi8uLi91dGlscy9pcy9pcy5qcydcblxubGV0IGlkID0gMFxuXG5leHBvcnQgY29uc3QgdXNlVGFiRW1pdHMgPSBbICdjbGljaycsICdrZXlkb3duJyBdXG5cbmV4cG9ydCBjb25zdCB1c2VUYWJQcm9wcyA9IHtcbiAgaWNvbjogU3RyaW5nLFxuICBsYWJlbDogWyBOdW1iZXIsIFN0cmluZyBdLFxuXG4gIGFsZXJ0OiBbIEJvb2xlYW4sIFN0cmluZyBdLFxuICBhbGVydEljb246IFN0cmluZyxcblxuICBuYW1lOiB7XG4gICAgdHlwZTogWyBOdW1iZXIsIFN0cmluZyBdLFxuICAgIGRlZmF1bHQ6ICgpID0+IGB0XyR7IGlkKysgfWBcbiAgfSxcblxuICBub0NhcHM6IEJvb2xlYW4sXG5cbiAgdGFiaW5kZXg6IFsgU3RyaW5nLCBOdW1iZXIgXSxcbiAgZGlzYWJsZTogQm9vbGVhbixcblxuICBjb250ZW50Q2xhc3M6IFN0cmluZyxcblxuICByaXBwbGU6IHtcbiAgICB0eXBlOiBbIEJvb2xlYW4sIE9iamVjdCBdLFxuICAgIGRlZmF1bHQ6IHRydWVcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHNsb3RzLCBlbWl0LCByb3V0ZURhdGEpIHtcbiAgY29uc3QgJHRhYnMgPSBpbmplY3QodGFic0tleSwgZW1wdHlSZW5kZXJGbilcbiAgaWYgKCR0YWJzID09PSBlbXB0eVJlbmRlckZuKSB7XG4gICAgY29uc29sZS5lcnJvcignUVRhYi9RUm91dGVUYWIgY29tcG9uZW50IG5lZWRzIHRvIGJlIGNoaWxkIG9mIFFUYWJzJylcbiAgICByZXR1cm4gZW1wdHlSZW5kZXJGblxuICB9XG5cbiAgY29uc3QgeyBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICBjb25zdCBibHVyVGFyZ2V0UmVmID0gcmVmKG51bGwpXG4gIGNvbnN0IHJvb3RSZWYgPSByZWYobnVsbClcbiAgY29uc3QgdGFiSW5kaWNhdG9yUmVmID0gcmVmKG51bGwpXG5cbiAgY29uc3QgcmlwcGxlID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgIHByb3BzLmRpc2FibGUgPT09IHRydWUgfHwgcHJvcHMucmlwcGxlID09PSBmYWxzZVxuICAgICAgPyBmYWxzZVxuICAgICAgOiBPYmplY3QuYXNzaWduKFxuICAgICAgICB7IGtleUNvZGVzOiBbIDEzLCAzMiBdLCBlYXJseTogdHJ1ZSB9LFxuICAgICAgICBwcm9wcy5yaXBwbGUgPT09IHRydWUgPyB7fSA6IHByb3BzLnJpcHBsZVxuICAgICAgKVxuICApKVxuXG4gIGNvbnN0IGlzQWN0aXZlID0gY29tcHV0ZWQoKCkgPT4gJHRhYnMuY3VycmVudE1vZGVsLnZhbHVlID09PSBwcm9wcy5uYW1lKVxuXG4gIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICdxLXRhYiByZWxhdGl2ZS1wb3NpdGlvbiBzZWxmLXN0cmV0Y2ggZmxleCBmbGV4LWNlbnRlciB0ZXh0LWNlbnRlcidcbiAgICArIChcbiAgICAgIGlzQWN0aXZlLnZhbHVlID09PSB0cnVlXG4gICAgICAgID8gKFxuICAgICAgICAgICAgJyBxLXRhYi0tYWN0aXZlJ1xuICAgICAgICAgICAgKyAoJHRhYnMudGFiUHJvcHMudmFsdWUuYWN0aXZlQ2xhc3MgPyAnICcgKyAkdGFicy50YWJQcm9wcy52YWx1ZS5hY3RpdmVDbGFzcyA6ICcnKVxuICAgICAgICAgICAgKyAoJHRhYnMudGFiUHJvcHMudmFsdWUuYWN0aXZlQ29sb3IgPyBgIHRleHQtJHsgJHRhYnMudGFiUHJvcHMudmFsdWUuYWN0aXZlQ29sb3IgfWAgOiAnJylcbiAgICAgICAgICAgICsgKCR0YWJzLnRhYlByb3BzLnZhbHVlLmFjdGl2ZUJnQ29sb3IgPyBgIGJnLSR7ICR0YWJzLnRhYlByb3BzLnZhbHVlLmFjdGl2ZUJnQ29sb3IgfWAgOiAnJylcbiAgICAgICAgICApXG4gICAgICAgIDogJyBxLXRhYi0taW5hY3RpdmUnXG4gICAgKVxuICAgICsgKHByb3BzLmljb24gJiYgcHJvcHMubGFiZWwgJiYgJHRhYnMudGFiUHJvcHMudmFsdWUuaW5saW5lTGFiZWwgPT09IGZhbHNlID8gJyBxLXRhYi0tZnVsbCcgOiAnJylcbiAgICArIChwcm9wcy5ub0NhcHMgPT09IHRydWUgfHwgJHRhYnMudGFiUHJvcHMudmFsdWUubm9DYXBzID09PSB0cnVlID8gJyBxLXRhYi0tbm8tY2FwcycgOiAnJylcbiAgICArIChwcm9wcy5kaXNhYmxlID09PSB0cnVlID8gJyBkaXNhYmxlZCcgOiAnIHEtZm9jdXNhYmxlIHEtaG92ZXJhYmxlIGN1cnNvci1wb2ludGVyJylcbiAgICArIChyb3V0ZURhdGEgIT09IHZvaWQgMCA/IHJvdXRlRGF0YS5saW5rQ2xhc3MudmFsdWUgOiAnJylcbiAgKVxuXG4gIGNvbnN0IGlubmVyQ2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICdxLXRhYl9fY29udGVudCBzZWxmLXN0cmV0Y2ggZmxleC1jZW50ZXIgcmVsYXRpdmUtcG9zaXRpb24gcS1hbmNob3ItLXNraXAgbm9uLXNlbGVjdGFibGUgJ1xuICAgICsgKCR0YWJzLnRhYlByb3BzLnZhbHVlLmlubGluZUxhYmVsID09PSB0cnVlID8gJ3JvdyBuby13cmFwIHEtdGFiX19jb250ZW50LS1pbmxpbmUnIDogJ2NvbHVtbicpXG4gICAgKyAocHJvcHMuY29udGVudENsYXNzICE9PSB2b2lkIDAgPyBgICR7IHByb3BzLmNvbnRlbnRDbGFzcyB9YCA6ICcnKVxuICApXG5cbiAgY29uc3QgdGFiSW5kZXggPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgKFxuICAgICAgcHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZVxuICAgICAgfHwgJHRhYnMuaGFzRm9jdXMudmFsdWUgPT09IHRydWVcbiAgICAgIHx8IChpc0FjdGl2ZS52YWx1ZSA9PT0gZmFsc2UgJiYgJHRhYnMuaGFzQWN0aXZlVGFiLnZhbHVlID09PSB0cnVlKVxuICAgIClcbiAgICAgID8gLTFcbiAgICAgIDogcHJvcHMudGFiaW5kZXggfHwgMFxuICApKVxuXG4gIGZ1bmN0aW9uIG9uQ2xpY2sgKGUsIGtleWJvYXJkKSB7XG4gICAgaWYgKGtleWJvYXJkICE9PSB0cnVlICYmIGU/LnFBdm9pZEZvY3VzICE9PSB0cnVlKSB7XG4gICAgICBibHVyVGFyZ2V0UmVmLnZhbHVlPy5mb2N1cygpXG4gICAgfVxuXG4gICAgaWYgKHByb3BzLmRpc2FibGUgPT09IHRydWUpIHtcbiAgICAgIC8vIHdlIHNob3VsZCBoaW5kZXIgbmF0aXZlIG5hdmlnYXRpb24gdGhvdWdoXG4gICAgICBpZiAocm91dGVEYXRhPy5oYXNSb3V0ZXJMaW5rLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgICB9XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAvLyBkbyB3ZSBoYXZlIGEgUVRhYj9cbiAgICBpZiAocm91dGVEYXRhID09PSB2b2lkIDApIHtcbiAgICAgICR0YWJzLnVwZGF0ZU1vZGVsKHsgbmFtZTogcHJvcHMubmFtZSB9KVxuICAgICAgZW1pdCgnY2xpY2snLCBlKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKHJvdXRlRGF0YS5oYXNSb3V0ZXJMaW5rLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICBjb25zdCBnbyA9IChvcHRzID0ge30pID0+IHtcbiAgICAgICAgLy8gaWYgcmVxdWlyaW5nIHRvIGdvIHRvIGFub3RoZXIgcm91dGUsIHRoZW4gd2VcbiAgICAgICAgLy8gbGV0IHRoZSBRVGFicyByb3V0ZSB3YXRjaGVyIGRvIGl0cyBqb2IsXG4gICAgICAgIC8vIG90aGVyd2lzZSBkaXJlY3RseSBzZWxlY3QgdGhpc1xuICAgICAgICBsZXQgaGFyZEVycm9yXG4gICAgICAgIGNvbnN0IHJlcUlkID0gb3B0cy50byA9PT0gdm9pZCAwIHx8IGlzRGVlcEVxdWFsKG9wdHMudG8sIHByb3BzLnRvKSA9PT0gdHJ1ZVxuICAgICAgICAgID8gKCR0YWJzLmF2b2lkUm91dGVXYXRjaGVyID0gdWlkKCkpXG4gICAgICAgICAgOiBudWxsXG5cbiAgICAgICAgcmV0dXJuIHJvdXRlRGF0YS5uYXZpZ2F0ZVRvUm91dGVyTGluayhlLCB7IC4uLm9wdHMsIHJldHVyblJvdXRlckVycm9yOiB0cnVlIH0pXG4gICAgICAgICAgLmNhdGNoKGVyciA9PiB7IGhhcmRFcnJvciA9IGVyciB9KVxuICAgICAgICAgIC50aGVuKHNvZnRFcnJvciA9PiB7XG4gICAgICAgICAgICBpZiAocmVxSWQgPT09ICR0YWJzLmF2b2lkUm91dGVXYXRjaGVyKSB7XG4gICAgICAgICAgICAgICR0YWJzLmF2b2lkUm91dGVXYXRjaGVyID0gZmFsc2VcblxuICAgICAgICAgICAgICAvLyBpZiB3ZSBkb24ndCBoYXZlIGFueSBoYXJkIGVycm9ycyBvciBhbnkgc29mdCBlcnJvcnMsIGV4Y2VwdCBmb3JcbiAgICAgICAgICAgICAgLy8gd2hlbiBuYXZpZ2F0aW5nIHRvIHRoZSBzYW1lIHJvdXRlIChvbiBhbGwgb3RoZXIgc29mdCBlcnJvcnMsXG4gICAgICAgICAgICAgIC8vIGxpa2Ugd2hlbiBuYXZpZ2F0aW9uIHdhcyBhYm9ydGVkIGluIGEgbmF2IGd1YXJkLCB3ZSBkb24ndCBhY3RpdmF0ZSB0aGlzIHRhYilcbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGhhcmRFcnJvciA9PT0gdm9pZCAwICYmIChcbiAgICAgICAgICAgICAgICAgIHNvZnRFcnJvciA9PT0gdm9pZCAwXG4gICAgICAgICAgICAgICAgICB8fCAoc29mdEVycm9yLm1lc3NhZ2U/LnN0YXJ0c1dpdGgoJ0F2b2lkZWQgcmVkdW5kYW50IG5hdmlnYXRpb24nKSA9PT0gdHJ1ZSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICR0YWJzLnVwZGF0ZU1vZGVsKHsgbmFtZTogcHJvcHMubmFtZSB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChvcHRzLnJldHVyblJvdXRlckVycm9yID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYXJkRXJyb3IgIT09IHZvaWQgMCA/IFByb21pc2UucmVqZWN0KGhhcmRFcnJvcikgOiBzb2Z0RXJyb3JcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICBlbWl0KCdjbGljaycsIGUsIGdvKVxuICAgICAgZS5kZWZhdWx0UHJldmVudGVkICE9PSB0cnVlICYmIGdvKClcblxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgZW1pdCgnY2xpY2snLCBlKVxuICB9XG5cbiAgZnVuY3Rpb24gb25LZXlkb3duIChlKSB7XG4gICAgaWYgKGlzS2V5Q29kZShlLCBbIDEzLCAzMiBdKSkge1xuICAgICAgb25DbGljayhlLCB0cnVlKVxuICAgIH1cbiAgICBlbHNlIGlmIChcbiAgICAgIHNob3VsZElnbm9yZUtleShlKSAhPT0gdHJ1ZVxuICAgICAgJiYgZS5rZXlDb2RlID49IDM1XG4gICAgICAmJiBlLmtleUNvZGUgPD0gNDBcbiAgICAgICYmIGUuYWx0S2V5ICE9PSB0cnVlXG4gICAgICAmJiBlLm1ldGFLZXkgIT09IHRydWVcbiAgICApIHtcbiAgICAgICR0YWJzLm9uS2JkTmF2aWdhdGUoZS5rZXlDb2RlLCBwcm94eS4kZWwpID09PSB0cnVlICYmIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgfVxuXG4gICAgZW1pdCgna2V5ZG93bicsIGUpXG4gIH1cblxuICBmdW5jdGlvbiBnZXRDb250ZW50ICgpIHtcbiAgICBjb25zdFxuICAgICAgbmFycm93ID0gJHRhYnMudGFiUHJvcHMudmFsdWUubmFycm93SW5kaWNhdG9yLFxuICAgICAgY29udGVudCA9IFtdLFxuICAgICAgaW5kaWNhdG9yID0gaCgnZGl2Jywge1xuICAgICAgICByZWY6IHRhYkluZGljYXRvclJlZixcbiAgICAgICAgY2xhc3M6IFtcbiAgICAgICAgICAncS10YWJfX2luZGljYXRvcicsXG4gICAgICAgICAgJHRhYnMudGFiUHJvcHMudmFsdWUuaW5kaWNhdG9yQ2xhc3NcbiAgICAgICAgXVxuICAgICAgfSlcblxuICAgIHByb3BzLmljb24gIT09IHZvaWQgMCAmJiBjb250ZW50LnB1c2goXG4gICAgICBoKFFJY29uLCB7XG4gICAgICAgIGNsYXNzOiAncS10YWJfX2ljb24nLFxuICAgICAgICBuYW1lOiBwcm9wcy5pY29uXG4gICAgICB9KVxuICAgIClcblxuICAgIHByb3BzLmxhYmVsICE9PSB2b2lkIDAgJiYgY29udGVudC5wdXNoKFxuICAgICAgaCgnZGl2JywgeyBjbGFzczogJ3EtdGFiX19sYWJlbCcgfSwgcHJvcHMubGFiZWwpXG4gICAgKVxuXG4gICAgcHJvcHMuYWxlcnQgIT09IGZhbHNlICYmIGNvbnRlbnQucHVzaChcbiAgICAgIHByb3BzLmFsZXJ0SWNvbiAhPT0gdm9pZCAwXG4gICAgICAgID8gaChRSWNvbiwge1xuICAgICAgICAgIGNsYXNzOiAncS10YWJfX2FsZXJ0LWljb24nLFxuICAgICAgICAgIGNvbG9yOiBwcm9wcy5hbGVydCAhPT0gdHJ1ZVxuICAgICAgICAgICAgPyBwcm9wcy5hbGVydFxuICAgICAgICAgICAgOiB2b2lkIDAsXG4gICAgICAgICAgbmFtZTogcHJvcHMuYWxlcnRJY29uXG4gICAgICAgIH0pXG4gICAgICAgIDogaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS10YWJfX2FsZXJ0J1xuICAgICAgICAgICAgKyAocHJvcHMuYWxlcnQgIT09IHRydWUgPyBgIHRleHQtJHsgcHJvcHMuYWxlcnQgfWAgOiAnJylcbiAgICAgICAgfSlcbiAgICApXG5cbiAgICBuYXJyb3cgPT09IHRydWUgJiYgY29udGVudC5wdXNoKGluZGljYXRvcilcblxuICAgIGNvbnN0IG5vZGUgPSBbXG4gICAgICBoKCdkaXYnLCB7IGNsYXNzOiAncS1mb2N1cy1oZWxwZXInLCB0YWJpbmRleDogLTEsIHJlZjogYmx1clRhcmdldFJlZiB9KSxcbiAgICAgIGgoJ2RpdicsIHsgY2xhc3M6IGlubmVyQ2xhc3MudmFsdWUgfSwgaE1lcmdlU2xvdChzbG90cy5kZWZhdWx0LCBjb250ZW50KSlcbiAgICBdXG5cbiAgICBuYXJyb3cgPT09IGZhbHNlICYmIG5vZGUucHVzaChpbmRpY2F0b3IpXG5cbiAgICByZXR1cm4gbm9kZVxuICB9XG5cbiAgY29uc3QgdGFiRGF0YSA9IHtcbiAgICBuYW1lOiBjb21wdXRlZCgoKSA9PiBwcm9wcy5uYW1lKSxcbiAgICByb290UmVmLFxuICAgIHRhYkluZGljYXRvclJlZixcbiAgICByb3V0ZURhdGFcbiAgfVxuXG4gIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgJHRhYnMudW5yZWdpc3RlclRhYih0YWJEYXRhKVxuICB9KVxuXG4gIG9uTW91bnRlZCgoKSA9PiB7XG4gICAgJHRhYnMucmVnaXN0ZXJUYWIodGFiRGF0YSlcbiAgfSlcblxuICBmdW5jdGlvbiByZW5kZXJUYWIgKHRhZywgY3VzdG9tRGF0YSkge1xuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICByZWY6IHJvb3RSZWYsXG4gICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgIHRhYmluZGV4OiB0YWJJbmRleC52YWx1ZSxcbiAgICAgIHJvbGU6ICd0YWInLFxuICAgICAgJ2FyaWEtc2VsZWN0ZWQnOiBpc0FjdGl2ZS52YWx1ZSA9PT0gdHJ1ZSA/ICd0cnVlJyA6ICdmYWxzZScsXG4gICAgICAnYXJpYS1kaXNhYmxlZCc6IHByb3BzLmRpc2FibGUgPT09IHRydWUgPyAndHJ1ZScgOiB2b2lkIDAsXG4gICAgICBvbkNsaWNrLFxuICAgICAgb25LZXlkb3duLFxuICAgICAgLi4uY3VzdG9tRGF0YVxuICAgIH1cblxuICAgIHJldHVybiB3aXRoRGlyZWN0aXZlcyhcbiAgICAgIGgodGFnLCBkYXRhLCBnZXRDb250ZW50KCkpLFxuICAgICAgWyBbIFJpcHBsZSwgcmlwcGxlLnZhbHVlIF0gXVxuICAgIClcbiAgfVxuXG4gIHJldHVybiB7IHJlbmRlclRhYiwgJHRhYnMgfVxufVxuIiwiaW1wb3J0IHVzZVRhYiwgeyB1c2VUYWJQcm9wcywgdXNlVGFiRW1pdHMgfSBmcm9tICcuL3VzZS10YWIuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FUYWInLFxuXG4gIHByb3BzOiB1c2VUYWJQcm9wcyxcblxuICBlbWl0czogdXNlVGFiRW1pdHMsXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0IH0pIHtcbiAgICBjb25zdCB7IHJlbmRlclRhYiB9ID0gdXNlVGFiKHByb3BzLCBzbG90cywgZW1pdClcbiAgICByZXR1cm4gKCkgPT4gcmVuZGVyVGFiKCdkaXYnKVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIG9uQmVmb3JlVW5tb3VudCwgb25BY3RpdmF0ZWQsIG9uRGVhY3RpdmF0ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSwgcHJvdmlkZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFJY29uIGZyb20gJy4uL2ljb24vUUljb24uanMnXG5pbXBvcnQgUVJlc2l6ZU9ic2VydmVyIGZyb20gJy4uL3Jlc2l6ZS1vYnNlcnZlci9RUmVzaXplT2JzZXJ2ZXIuanMnXG5cbmltcG9ydCB1c2VUaWNrIGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3VzZS10aWNrL3VzZS10aWNrLmpzJ1xuaW1wb3J0IHVzZVRpbWVvdXQgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvdXNlLXRpbWVvdXQvdXNlLXRpbWVvdXQuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5yZW5kZXIvcmVuZGVyLmpzJ1xuaW1wb3J0IHsgdGFic0tleSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuc3ltYm9scy9zeW1ib2xzLmpzJ1xuaW1wb3J0IHsgcnRsSGFzU2Nyb2xsQnVnIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5ydGwvcnRsLmpzJ1xuXG5mdW5jdGlvbiBnZXRJbmRpY2F0b3JDbGFzcyAoY29sb3IsIHRvcCwgdmVydGljYWwpIHtcbiAgY29uc3QgcG9zID0gdmVydGljYWwgPT09IHRydWVcbiAgICA/IFsgJ2xlZnQnLCAncmlnaHQnIF1cbiAgICA6IFsgJ3RvcCcsICdib3R0b20nIF1cblxuICByZXR1cm4gYGFic29sdXRlLSR7IHRvcCA9PT0gdHJ1ZSA/IHBvc1sgMCBdIDogcG9zWyAxIF0gfSR7IGNvbG9yID8gYCB0ZXh0LSR7IGNvbG9yIH1gIDogJycgfWBcbn1cblxuY29uc3QgYWxpZ25WYWx1ZXMgPSBbICdsZWZ0JywgJ2NlbnRlcicsICdyaWdodCcsICdqdXN0aWZ5JyBdXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRVGFicycsXG5cbiAgcHJvcHM6IHtcbiAgICBtb2RlbFZhbHVlOiBbIE51bWJlciwgU3RyaW5nIF0sXG5cbiAgICBhbGlnbjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2NlbnRlcicsXG4gICAgICB2YWxpZGF0b3I6IHYgPT4gYWxpZ25WYWx1ZXMuaW5jbHVkZXModilcbiAgICB9LFxuICAgIGJyZWFrcG9pbnQ6IHtcbiAgICAgIHR5cGU6IFsgU3RyaW5nLCBOdW1iZXIgXSxcbiAgICAgIGRlZmF1bHQ6IDYwMFxuICAgIH0sXG5cbiAgICB2ZXJ0aWNhbDogQm9vbGVhbixcbiAgICBzaHJpbms6IEJvb2xlYW4sXG4gICAgc3RyZXRjaDogQm9vbGVhbixcblxuICAgIGFjdGl2ZUNsYXNzOiBTdHJpbmcsXG4gICAgYWN0aXZlQ29sb3I6IFN0cmluZyxcbiAgICBhY3RpdmVCZ0NvbG9yOiBTdHJpbmcsXG4gICAgaW5kaWNhdG9yQ29sb3I6IFN0cmluZyxcbiAgICBsZWZ0SWNvbjogU3RyaW5nLFxuICAgIHJpZ2h0SWNvbjogU3RyaW5nLFxuXG4gICAgb3V0c2lkZUFycm93czogQm9vbGVhbixcbiAgICBtb2JpbGVBcnJvd3M6IEJvb2xlYW4sXG5cbiAgICBzd2l0Y2hJbmRpY2F0b3I6IEJvb2xlYW4sXG5cbiAgICBuYXJyb3dJbmRpY2F0b3I6IEJvb2xlYW4sXG4gICAgaW5saW5lTGFiZWw6IEJvb2xlYW4sXG4gICAgbm9DYXBzOiBCb29sZWFuLFxuXG4gICAgZGVuc2U6IEJvb2xlYW4sXG5cbiAgICBjb250ZW50Q2xhc3M6IFN0cmluZyxcblxuICAgICdvblVwZGF0ZTptb2RlbFZhbHVlJzogWyBGdW5jdGlvbiwgQXJyYXkgXVxuICB9LFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCB9KSB7XG4gICAgY29uc3QgeyBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCB7ICRxIH0gPSBwcm94eVxuXG4gICAgY29uc3QgeyByZWdpc3RlclRpY2s6IHJlZ2lzdGVyU2Nyb2xsVGljayB9ID0gdXNlVGljaygpXG4gICAgY29uc3QgeyByZWdpc3RlclRpY2s6IHJlZ2lzdGVyVXBkYXRlQXJyb3dzVGljayB9ID0gdXNlVGljaygpXG4gICAgY29uc3QgeyByZWdpc3RlclRpY2s6IHJlZ2lzdGVyQW5pbWF0ZVRpY2sgfSA9IHVzZVRpY2soKVxuXG4gICAgY29uc3QgeyByZWdpc3RlclRpbWVvdXQ6IHJlZ2lzdGVyRm9jdXNUaW1lb3V0LCByZW1vdmVUaW1lb3V0OiByZW1vdmVGb2N1c1RpbWVvdXQgfSA9IHVzZVRpbWVvdXQoKVxuICAgIGNvbnN0IHsgcmVnaXN0ZXJUaW1lb3V0OiByZWdpc3RlclNjcm9sbFRvVGFiVGltZW91dCwgcmVtb3ZlVGltZW91dDogcmVtb3ZlU2Nyb2xsVG9UYWJUaW1lb3V0IH0gPSB1c2VUaW1lb3V0KClcblxuICAgIGNvbnN0IHJvb3RSZWYgPSByZWYobnVsbClcbiAgICBjb25zdCBjb250ZW50UmVmID0gcmVmKG51bGwpXG5cbiAgICBjb25zdCBjdXJyZW50TW9kZWwgPSByZWYocHJvcHMubW9kZWxWYWx1ZSlcbiAgICBjb25zdCBzY3JvbGxhYmxlID0gcmVmKGZhbHNlKVxuICAgIGNvbnN0IGxlZnRBcnJvdyA9IHJlZih0cnVlKVxuICAgIGNvbnN0IHJpZ2h0QXJyb3cgPSByZWYoZmFsc2UpXG4gICAgY29uc3QganVzdGlmeSA9IHJlZihmYWxzZSlcblxuICAgIGNvbnN0IHRhYkRhdGFMaXN0ID0gW11cbiAgICBjb25zdCB0YWJEYXRhTGlzdExlbiA9IHJlZigwKVxuICAgIGNvbnN0IGhhc0ZvY3VzID0gcmVmKGZhbHNlKVxuXG4gICAgbGV0IGFuaW1hdGVUaW1lciA9IG51bGwsIHNjcm9sbFRpbWVyID0gbnVsbCwgdW53YXRjaFJvdXRlXG5cbiAgICBjb25zdCB0YWJQcm9wcyA9IGNvbXB1dGVkKCgpID0+ICh7XG4gICAgICBhY3RpdmVDbGFzczogcHJvcHMuYWN0aXZlQ2xhc3MsXG4gICAgICBhY3RpdmVDb2xvcjogcHJvcHMuYWN0aXZlQ29sb3IsXG4gICAgICBhY3RpdmVCZ0NvbG9yOiBwcm9wcy5hY3RpdmVCZ0NvbG9yLFxuICAgICAgaW5kaWNhdG9yQ2xhc3M6IGdldEluZGljYXRvckNsYXNzKFxuICAgICAgICBwcm9wcy5pbmRpY2F0b3JDb2xvcixcbiAgICAgICAgcHJvcHMuc3dpdGNoSW5kaWNhdG9yLFxuICAgICAgICBwcm9wcy52ZXJ0aWNhbFxuICAgICAgKSxcbiAgICAgIG5hcnJvd0luZGljYXRvcjogcHJvcHMubmFycm93SW5kaWNhdG9yLFxuICAgICAgaW5saW5lTGFiZWw6IHByb3BzLmlubGluZUxhYmVsLFxuICAgICAgbm9DYXBzOiBwcm9wcy5ub0NhcHNcbiAgICB9KSlcblxuICAgIGNvbnN0IGhhc0FjdGl2ZVRhYiA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGxlbiA9IHRhYkRhdGFMaXN0TGVuLnZhbHVlXG4gICAgICBjb25zdCB2YWwgPSBjdXJyZW50TW9kZWwudmFsdWVcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAodGFiRGF0YUxpc3RbIGkgXS5uYW1lLnZhbHVlID09PSB2YWwpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH0pXG5cbiAgICBjb25zdCBhbGlnbkNsYXNzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgYWxpZ24gPSBzY3JvbGxhYmxlLnZhbHVlID09PSB0cnVlXG4gICAgICAgID8gJ2xlZnQnXG4gICAgICAgIDogKGp1c3RpZnkudmFsdWUgPT09IHRydWUgPyAnanVzdGlmeScgOiBwcm9wcy5hbGlnbilcblxuICAgICAgcmV0dXJuIGBxLXRhYnNfX2NvbnRlbnQtLWFsaWduLSR7IGFsaWduIH1gXG4gICAgfSlcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtdGFicyByb3cgbm8td3JhcCBpdGVtcy1jZW50ZXInXG4gICAgICArIGAgcS10YWJzLS0keyBzY3JvbGxhYmxlLnZhbHVlID09PSB0cnVlID8gJycgOiAnbm90LScgfXNjcm9sbGFibGVgXG4gICAgICArIGAgcS10YWJzLS0keyBwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZSA/ICd2ZXJ0aWNhbCcgOiAnaG9yaXpvbnRhbCcgfWBcbiAgICAgICsgYCBxLXRhYnNfX2Fycm93cy0tJHsgcHJvcHMub3V0c2lkZUFycm93cyA9PT0gdHJ1ZSA/ICdvdXRzaWRlJyA6ICdpbnNpZGUnIH1gXG4gICAgICArIGAgcS10YWJzLS1tb2JpbGUtd2l0aCR7IHByb3BzLm1vYmlsZUFycm93cyA9PT0gdHJ1ZSA/ICcnIDogJ291dCcgfS1hcnJvd3NgXG4gICAgICArIChwcm9wcy5kZW5zZSA9PT0gdHJ1ZSA/ICcgcS10YWJzLS1kZW5zZScgOiAnJylcbiAgICAgICsgKHByb3BzLnNocmluayA9PT0gdHJ1ZSA/ICcgY29sLXNocmluaycgOiAnJylcbiAgICAgICsgKHByb3BzLnN0cmV0Y2ggPT09IHRydWUgPyAnIHNlbGYtc3RyZXRjaCcgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCBpbm5lckNsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLXRhYnNfX2NvbnRlbnQgc2Nyb2xsLS1tb2JpbGUgcm93IG5vLXdyYXAgaXRlbXMtY2VudGVyIHNlbGYtc3RyZXRjaCBoaWRlLXNjcm9sbGJhciByZWxhdGl2ZS1wb3NpdGlvbiAnXG4gICAgICArIGFsaWduQ2xhc3MudmFsdWVcbiAgICAgICsgKHByb3BzLmNvbnRlbnRDbGFzcyAhPT0gdm9pZCAwID8gYCAkeyBwcm9wcy5jb250ZW50Q2xhc3MgfWAgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCBkb21Qcm9wcyA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLnZlcnRpY2FsID09PSB0cnVlXG4gICAgICAgID8geyBjb250YWluZXI6ICdoZWlnaHQnLCBjb250ZW50OiAnb2Zmc2V0SGVpZ2h0Jywgc2Nyb2xsOiAnc2Nyb2xsSGVpZ2h0JyB9XG4gICAgICAgIDogeyBjb250YWluZXI6ICd3aWR0aCcsIGNvbnRlbnQ6ICdvZmZzZXRXaWR0aCcsIHNjcm9sbDogJ3Njcm9sbFdpZHRoJyB9XG4gICAgKSlcblxuICAgIGNvbnN0IGlzUlRMID0gY29tcHV0ZWQoKCkgPT4gcHJvcHMudmVydGljYWwgIT09IHRydWUgJiYgJHEubGFuZy5ydGwgPT09IHRydWUpXG4gICAgY29uc3QgcnRsUG9zQ29ycmVjdGlvbiA9IGNvbXB1dGVkKCgpID0+IHJ0bEhhc1Njcm9sbEJ1ZyA9PT0gZmFsc2UgJiYgaXNSVEwudmFsdWUgPT09IHRydWUpXG5cbiAgICB3YXRjaChpc1JUTCwgdXBkYXRlQXJyb3dzKVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMubW9kZWxWYWx1ZSwgbmFtZSA9PiB7XG4gICAgICB1cGRhdGVNb2RlbCh7IG5hbWUsIHNldEN1cnJlbnQ6IHRydWUsIHNraXBFbWl0OiB0cnVlIH0pXG4gICAgfSlcblxuICAgIHdhdGNoKCgpID0+IHByb3BzLm91dHNpZGVBcnJvd3MsIHJlY2FsY3VsYXRlU2Nyb2xsKVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlTW9kZWwgKHsgbmFtZSwgc2V0Q3VycmVudCwgc2tpcEVtaXQgfSkge1xuICAgICAgaWYgKGN1cnJlbnRNb2RlbC52YWx1ZSA9PT0gbmFtZSkgcmV0dXJuXG5cbiAgICAgIGlmIChza2lwRW1pdCAhPT0gdHJ1ZSAmJiBwcm9wc1sgJ29uVXBkYXRlOm1vZGVsVmFsdWUnIF0gIT09IHZvaWQgMCkge1xuICAgICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIG5hbWUpXG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgc2V0Q3VycmVudCA9PT0gdHJ1ZVxuICAgICAgICB8fCBwcm9wc1sgJ29uVXBkYXRlOm1vZGVsVmFsdWUnIF0gPT09IHZvaWQgMFxuICAgICAgKSB7XG4gICAgICAgIGFuaW1hdGUoY3VycmVudE1vZGVsLnZhbHVlLCBuYW1lKVxuICAgICAgICBjdXJyZW50TW9kZWwudmFsdWUgPSBuYW1lXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVjYWxjdWxhdGVTY3JvbGwgKCkge1xuICAgICAgcmVnaXN0ZXJTY3JvbGxUaWNrKCgpID0+IHtcbiAgICAgICAgcm9vdFJlZi52YWx1ZSAmJiB1cGRhdGVDb250YWluZXIoe1xuICAgICAgICAgIHdpZHRoOiByb290UmVmLnZhbHVlLm9mZnNldFdpZHRoLFxuICAgICAgICAgIGhlaWdodDogcm9vdFJlZi52YWx1ZS5vZmZzZXRIZWlnaHRcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlQ29udGFpbmVyIChkb21TaXplKSB7XG4gICAgICAvLyBpdCBjYW4gYmUgY2FsbGVkIGZhc3RlciB0aGFuIGNvbXBvbmVudCBiZWluZyBpbml0aWFsaXplZFxuICAgICAgLy8gc28gd2UgbmVlZCB0byBwcm90ZWN0IGFnYWluc3QgdGhhdCBjYXNlXG4gICAgICAvLyAob25lIGV4YW1wbGUgb2Ygc3VjaCBjYXNlIGlzIHRoZSBkb2NzIHJlbGVhc2Ugbm90ZXMgcGFnZSlcbiAgICAgIGlmIChkb21Qcm9wcy52YWx1ZSA9PT0gdm9pZCAwIHx8IGNvbnRlbnRSZWYudmFsdWUgPT09IG51bGwpIHJldHVyblxuXG4gICAgICBjb25zdFxuICAgICAgICBzaXplID0gZG9tU2l6ZVsgZG9tUHJvcHMudmFsdWUuY29udGFpbmVyIF0sXG4gICAgICAgIHNjcm9sbFNpemUgPSBNYXRoLm1pbihcbiAgICAgICAgICBjb250ZW50UmVmLnZhbHVlWyBkb21Qcm9wcy52YWx1ZS5zY3JvbGwgXSxcbiAgICAgICAgICBBcnJheS5wcm90b3R5cGUucmVkdWNlLmNhbGwoXG4gICAgICAgICAgICBjb250ZW50UmVmLnZhbHVlLmNoaWxkcmVuLFxuICAgICAgICAgICAgKGFjYywgZWwpID0+IGFjYyArIChlbFsgZG9tUHJvcHMudmFsdWUuY29udGVudCBdIHx8IDApLFxuICAgICAgICAgICAgMFxuICAgICAgICAgIClcbiAgICAgICAgKSxcbiAgICAgICAgc2Nyb2xsID0gc2l6ZSA+IDAgJiYgc2Nyb2xsU2l6ZSA+IHNpemUgLy8gd2hlbiB0aGVyZSBpcyBubyB0YWIsIGluIENocm9tZSwgc2l6ZSA9PT0gMCBhbmQgc2Nyb2xsU2l6ZSA9PT0gMVxuXG4gICAgICBzY3JvbGxhYmxlLnZhbHVlID0gc2Nyb2xsXG5cbiAgICAgIC8vIEFycm93cyBuZWVkIHRvIGJlIHVwZGF0ZWQgZXZlbiBpZiB0aGUgc2Nyb2xsIHN0YXR1cyB3YXMgYWxyZWFkeSB0cnVlXG4gICAgICBzY3JvbGwgPT09IHRydWUgJiYgcmVnaXN0ZXJVcGRhdGVBcnJvd3NUaWNrKHVwZGF0ZUFycm93cylcblxuICAgICAganVzdGlmeS52YWx1ZSA9IHNpemUgPCBwYXJzZUludChwcm9wcy5icmVha3BvaW50LCAxMClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhbmltYXRlIChvbGROYW1lLCBuZXdOYW1lKSB7XG4gICAgICBjb25zdFxuICAgICAgICBvbGRUYWIgPSBvbGROYW1lICE9PSB2b2lkIDAgJiYgb2xkTmFtZSAhPT0gbnVsbCAmJiBvbGROYW1lICE9PSAnJ1xuICAgICAgICAgID8gdGFiRGF0YUxpc3QuZmluZCh0YWIgPT4gdGFiLm5hbWUudmFsdWUgPT09IG9sZE5hbWUpXG4gICAgICAgICAgOiBudWxsLFxuICAgICAgICBuZXdUYWIgPSBuZXdOYW1lICE9PSB2b2lkIDAgJiYgbmV3TmFtZSAhPT0gbnVsbCAmJiBuZXdOYW1lICE9PSAnJ1xuICAgICAgICAgID8gdGFiRGF0YUxpc3QuZmluZCh0YWIgPT4gdGFiLm5hbWUudmFsdWUgPT09IG5ld05hbWUpXG4gICAgICAgICAgOiBudWxsXG5cbiAgICAgIGlmIChoYWRBY3RpdmF0ZWQgPT09IHRydWUpIHtcbiAgICAgICAgLy8gQWZ0ZXIgdGhlIGNvbXBvbmVudCBoYXMgYmVlbiByZS1hY3RpdmF0ZWRcbiAgICAgICAgLy8gd2Ugc2hvdWxkIG5vdCBhbmltYXRlIHRoZSB0cmFuc2l0aW9uLlxuICAgICAgICAvLyBDb25zaWRlciBpdCBhcyBpZiB0aGUgY29tcG9uZW50IGhhcyBqdXN0IGJlZW4gbW91bnRlZC5cbiAgICAgICAgaGFkQWN0aXZhdGVkID0gZmFsc2VcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKG9sZFRhYiAmJiBuZXdUYWIpIHtcbiAgICAgICAgY29uc3RcbiAgICAgICAgICBvbGRFbCA9IG9sZFRhYi50YWJJbmRpY2F0b3JSZWYudmFsdWUsXG4gICAgICAgICAgbmV3RWwgPSBuZXdUYWIudGFiSW5kaWNhdG9yUmVmLnZhbHVlXG5cbiAgICAgICAgaWYgKGFuaW1hdGVUaW1lciAhPT0gbnVsbCkge1xuICAgICAgICAgIGNsZWFyVGltZW91dChhbmltYXRlVGltZXIpXG4gICAgICAgICAgYW5pbWF0ZVRpbWVyID0gbnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgb2xkRWwuc3R5bGUudHJhbnNpdGlvbiA9ICdub25lJ1xuICAgICAgICBvbGRFbC5zdHlsZS50cmFuc2Zvcm0gPSAnbm9uZSdcbiAgICAgICAgbmV3RWwuc3R5bGUudHJhbnNpdGlvbiA9ICdub25lJ1xuICAgICAgICBuZXdFbC5zdHlsZS50cmFuc2Zvcm0gPSAnbm9uZSdcblxuICAgICAgICBjb25zdFxuICAgICAgICAgIG9sZFBvcyA9IG9sZEVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgICAgIG5ld1BvcyA9IG5ld0VsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cbiAgICAgICAgbmV3RWwuc3R5bGUudHJhbnNmb3JtID0gcHJvcHMudmVydGljYWwgPT09IHRydWVcbiAgICAgICAgICA/IGB0cmFuc2xhdGUzZCgwLCR7IG9sZFBvcy50b3AgLSBuZXdQb3MudG9wIH1weCwwKSBzY2FsZTNkKDEsJHsgbmV3UG9zLmhlaWdodCA/IG9sZFBvcy5oZWlnaHQgLyBuZXdQb3MuaGVpZ2h0IDogMSB9LDEpYFxuICAgICAgICAgIDogYHRyYW5zbGF0ZTNkKCR7IG9sZFBvcy5sZWZ0IC0gbmV3UG9zLmxlZnQgfXB4LDAsMCkgc2NhbGUzZCgkeyBuZXdQb3Mud2lkdGggPyBvbGRQb3Mud2lkdGggLyBuZXdQb3Mud2lkdGggOiAxIH0sMSwxKWBcblxuICAgICAgICAvLyBhbGxvdyBzY29wZSB1cGRhdGVzIHRvIGtpY2sgaW4gKFFSb3V0ZVRhYiBuZWVkcyBtb3JlIHRpbWUpXG4gICAgICAgIHJlZ2lzdGVyQW5pbWF0ZVRpY2soKCkgPT4ge1xuICAgICAgICAgIGFuaW1hdGVUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgYW5pbWF0ZVRpbWVyID0gbnVsbFxuICAgICAgICAgICAgbmV3RWwuc3R5bGUudHJhbnNpdGlvbiA9ICd0cmFuc2Zvcm0gLjI1cyBjdWJpYy1iZXppZXIoLjQsIDAsIC4yLCAxKSdcbiAgICAgICAgICAgIG5ld0VsLnN0eWxlLnRyYW5zZm9ybSA9ICdub25lJ1xuICAgICAgICAgIH0sIDcwKVxuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICBpZiAobmV3VGFiICYmIHNjcm9sbGFibGUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgc2Nyb2xsVG9UYWJFbChuZXdUYWIucm9vdFJlZi52YWx1ZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzY3JvbGxUb1RhYkVsIChlbCkge1xuICAgICAgY29uc3RcbiAgICAgICAgeyBsZWZ0LCB3aWR0aCwgdG9wLCBoZWlnaHQgfSA9IGNvbnRlbnRSZWYudmFsdWUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICAgIG5ld1BvcyA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cbiAgICAgIGxldCBvZmZzZXQgPSBwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZSA/IG5ld1Bvcy50b3AgLSB0b3AgOiBuZXdQb3MubGVmdCAtIGxlZnRcblxuICAgICAgaWYgKG9mZnNldCA8IDApIHtcbiAgICAgICAgY29udGVudFJlZi52YWx1ZVsgcHJvcHMudmVydGljYWwgPT09IHRydWUgPyAnc2Nyb2xsVG9wJyA6ICdzY3JvbGxMZWZ0JyBdICs9IE1hdGguZmxvb3Iob2Zmc2V0KVxuICAgICAgICB1cGRhdGVBcnJvd3MoKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgb2Zmc2V0ICs9IHByb3BzLnZlcnRpY2FsID09PSB0cnVlID8gbmV3UG9zLmhlaWdodCAtIGhlaWdodCA6IG5ld1Bvcy53aWR0aCAtIHdpZHRoXG4gICAgICBpZiAob2Zmc2V0ID4gMCkge1xuICAgICAgICBjb250ZW50UmVmLnZhbHVlWyBwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZSA/ICdzY3JvbGxUb3AnIDogJ3Njcm9sbExlZnQnIF0gKz0gTWF0aC5jZWlsKG9mZnNldClcbiAgICAgICAgdXBkYXRlQXJyb3dzKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVBcnJvd3MgKCkge1xuICAgICAgY29uc3QgY29udGVudCA9IGNvbnRlbnRSZWYudmFsdWVcbiAgICAgIGlmIChjb250ZW50ID09PSBudWxsKSByZXR1cm5cblxuICAgICAgY29uc3RcbiAgICAgICAgcmVjdCA9IGNvbnRlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICAgIHBvcyA9IHByb3BzLnZlcnRpY2FsID09PSB0cnVlID8gY29udGVudC5zY3JvbGxUb3AgOiBNYXRoLmFicyhjb250ZW50LnNjcm9sbExlZnQpXG5cbiAgICAgIGlmIChpc1JUTC52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBsZWZ0QXJyb3cudmFsdWUgPSBNYXRoLmNlaWwocG9zICsgcmVjdC53aWR0aCkgPCBjb250ZW50LnNjcm9sbFdpZHRoIC0gMVxuICAgICAgICByaWdodEFycm93LnZhbHVlID0gcG9zID4gMFxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGxlZnRBcnJvdy52YWx1ZSA9IHBvcyA+IDBcbiAgICAgICAgcmlnaHRBcnJvdy52YWx1ZSA9IHByb3BzLnZlcnRpY2FsID09PSB0cnVlXG4gICAgICAgICAgPyBNYXRoLmNlaWwocG9zICsgcmVjdC5oZWlnaHQpIDwgY29udGVudC5zY3JvbGxIZWlnaHRcbiAgICAgICAgICA6IE1hdGguY2VpbChwb3MgKyByZWN0LndpZHRoKSA8IGNvbnRlbnQuc2Nyb2xsV2lkdGhcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhbmltU2Nyb2xsVG8gKHZhbHVlKSB7XG4gICAgICBzY3JvbGxUaW1lciAhPT0gbnVsbCAmJiBjbGVhckludGVydmFsKHNjcm9sbFRpbWVyKVxuICAgICAgc2Nyb2xsVGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGlmIChzY3JvbGxUb3dhcmRzKHZhbHVlKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHN0b3BBbmltU2Nyb2xsKClcbiAgICAgICAgfVxuICAgICAgfSwgNSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzY3JvbGxUb1N0YXJ0ICgpIHtcbiAgICAgIGFuaW1TY3JvbGxUbyhydGxQb3NDb3JyZWN0aW9uLnZhbHVlID09PSB0cnVlID8gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIgOiAwKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNjcm9sbFRvRW5kICgpIHtcbiAgICAgIGFuaW1TY3JvbGxUbyhydGxQb3NDb3JyZWN0aW9uLnZhbHVlID09PSB0cnVlID8gMCA6IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0b3BBbmltU2Nyb2xsICgpIHtcbiAgICAgIGlmIChzY3JvbGxUaW1lciAhPT0gbnVsbCkge1xuICAgICAgICBjbGVhckludGVydmFsKHNjcm9sbFRpbWVyKVxuICAgICAgICBzY3JvbGxUaW1lciA9IG51bGxcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbktiZE5hdmlnYXRlIChrZXlDb2RlLCBmcm9tRWwpIHtcbiAgICAgIGNvbnN0IHRhYnMgPSBBcnJheS5wcm90b3R5cGUuZmlsdGVyLmNhbGwoXG4gICAgICAgIGNvbnRlbnRSZWYudmFsdWUuY2hpbGRyZW4sXG4gICAgICAgIGVsID0+IGVsID09PSBmcm9tRWwgfHwgKGVsLm1hdGNoZXMgJiYgZWwubWF0Y2hlcygnLnEtdGFiLnEtZm9jdXNhYmxlJykgPT09IHRydWUpXG4gICAgICApXG5cbiAgICAgIGNvbnN0IGxlbiA9IHRhYnMubGVuZ3RoXG4gICAgICBpZiAobGVuID09PSAwKSByZXR1cm5cblxuICAgICAgaWYgKGtleUNvZGUgPT09IDM2KSB7IC8vIEhvbWVcbiAgICAgICAgc2Nyb2xsVG9UYWJFbCh0YWJzWyAwIF0pXG4gICAgICAgIHRhYnNbIDAgXS5mb2N1cygpXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgICBpZiAoa2V5Q29kZSA9PT0gMzUpIHsgLy8gRW5kXG4gICAgICAgIHNjcm9sbFRvVGFiRWwodGFic1sgbGVuIC0gMSBdKVxuICAgICAgICB0YWJzWyBsZW4gLSAxIF0uZm9jdXMoKVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBjb25zdCBkaXJQcmV2ID0ga2V5Q29kZSA9PT0gKHByb3BzLnZlcnRpY2FsID09PSB0cnVlID8gMzggLyogQXJyb3dVcCAqLyA6IDM3IC8qIEFycm93TGVmdCAqLylcbiAgICAgIGNvbnN0IGRpck5leHQgPSBrZXlDb2RlID09PSAocHJvcHMudmVydGljYWwgPT09IHRydWUgPyA0MCAvKiBBcnJvd0Rvd24gKi8gOiAzOSAvKiBBcnJvd1JpZ2h0ICovKVxuXG4gICAgICBjb25zdCBkaXIgPSBkaXJQcmV2ID09PSB0cnVlID8gLTEgOiAoZGlyTmV4dCA9PT0gdHJ1ZSA/IDEgOiB2b2lkIDApXG5cbiAgICAgIGlmIChkaXIgIT09IHZvaWQgMCkge1xuICAgICAgICBjb25zdCBydGxEaXIgPSBpc1JUTC52YWx1ZSA9PT0gdHJ1ZSA/IC0xIDogMVxuICAgICAgICBjb25zdCBpbmRleCA9IHRhYnMuaW5kZXhPZihmcm9tRWwpICsgZGlyICogcnRsRGlyXG5cbiAgICAgICAgaWYgKGluZGV4ID49IDAgJiYgaW5kZXggPCBsZW4pIHtcbiAgICAgICAgICBzY3JvbGxUb1RhYkVsKHRhYnNbIGluZGV4IF0pXG4gICAgICAgICAgdGFic1sgaW5kZXggXS5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gbGV0J3Mgc3BlZWQgdXAgZXhlY3V0aW9uIG9mIHRpbWUtc2Vuc2l0aXZlIHNjcm9sbFRvd2FyZHMoKVxuICAgIC8vIHdpdGggYSBjb21wdXRlZCB2YXJpYWJsZSBieSBkaXJlY3RseSBhcHBseWluZyB0aGUgbWluaW1hbFxuICAgIC8vIG51bWJlciBvZiBpbnN0cnVjdGlvbnMgb24gZ2V0L3NldCBmdW5jdGlvbnNcbiAgICBjb25zdCBwb3NGbiA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHJ0bFBvc0NvcnJlY3Rpb24udmFsdWUgPT09IHRydWVcbiAgICAgICAgPyB7IGdldDogY29udGVudCA9PiBNYXRoLmFicyhjb250ZW50LnNjcm9sbExlZnQpLCBzZXQ6IChjb250ZW50LCBwb3MpID0+IHsgY29udGVudC5zY3JvbGxMZWZ0ID0gLXBvcyB9IH1cbiAgICAgICAgOiAoXG4gICAgICAgICAgICBwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZVxuICAgICAgICAgICAgICA/IHsgZ2V0OiBjb250ZW50ID0+IGNvbnRlbnQuc2Nyb2xsVG9wLCBzZXQ6IChjb250ZW50LCBwb3MpID0+IHsgY29udGVudC5zY3JvbGxUb3AgPSBwb3MgfSB9XG4gICAgICAgICAgICAgIDogeyBnZXQ6IGNvbnRlbnQgPT4gY29udGVudC5zY3JvbGxMZWZ0LCBzZXQ6IChjb250ZW50LCBwb3MpID0+IHsgY29udGVudC5zY3JvbGxMZWZ0ID0gcG9zIH0gfVxuICAgICAgICAgIClcbiAgICApKVxuXG4gICAgZnVuY3Rpb24gc2Nyb2xsVG93YXJkcyAodmFsdWUpIHtcbiAgICAgIGNvbnN0XG4gICAgICAgIGNvbnRlbnQgPSBjb250ZW50UmVmLnZhbHVlLFxuICAgICAgICB7IGdldCwgc2V0IH0gPSBwb3NGbi52YWx1ZVxuXG4gICAgICBsZXRcbiAgICAgICAgZG9uZSA9IGZhbHNlLFxuICAgICAgICBwb3MgPSBnZXQoY29udGVudClcblxuICAgICAgY29uc3QgZGlyZWN0aW9uID0gdmFsdWUgPCBwb3MgPyAtMSA6IDFcblxuICAgICAgcG9zICs9IGRpcmVjdGlvbiAqIDVcblxuICAgICAgaWYgKHBvcyA8IDApIHtcbiAgICAgICAgZG9uZSA9IHRydWVcbiAgICAgICAgcG9zID0gMFxuICAgICAgfVxuICAgICAgZWxzZSBpZiAoXG4gICAgICAgIChkaXJlY3Rpb24gPT09IC0xICYmIHBvcyA8PSB2YWx1ZSlcbiAgICAgICAgfHwgKGRpcmVjdGlvbiA9PT0gMSAmJiBwb3MgPj0gdmFsdWUpXG4gICAgICApIHtcbiAgICAgICAgZG9uZSA9IHRydWVcbiAgICAgICAgcG9zID0gdmFsdWVcbiAgICAgIH1cblxuICAgICAgc2V0KGNvbnRlbnQsIHBvcylcbiAgICAgIHVwZGF0ZUFycm93cygpXG5cbiAgICAgIHJldHVybiBkb25lXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFzUXVlcnlJbmNsdWRlZCAodGFyZ2V0UXVlcnksIG1hdGNoaW5nUXVlcnkpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIHRhcmdldFF1ZXJ5KSB7XG4gICAgICAgIGlmICh0YXJnZXRRdWVyeVsga2V5IF0gIT09IG1hdGNoaW5nUXVlcnlbIGtleSBdKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICAvLyAxLiBEbyBub3QgdXNlIGRpcmVjdGx5OyB1c2UgdmVyaWZ5Um91dGVNb2RlbCgpIGluc3RlYWRcbiAgICAvLyAyLiBTaG91bGQgc2V0IGhhZEFjdGl2YXRlZCB0byBmYWxzZSB1cG9uIGV4aXRcbiAgICBmdW5jdGlvbiB1cGRhdGVBY3RpdmVSb3V0ZSAoKSB7XG4gICAgICBsZXQgbmFtZSA9IG51bGwsIGJlc3RTY29yZSA9IHsgbWF0Y2hlZExlbjogMCwgcXVlcnlEaWZmOiA5OTk5LCBocmVmTGVuOiAwIH1cblxuICAgICAgY29uc3QgbGlzdCA9IHRhYkRhdGFMaXN0LmZpbHRlcih0YWIgPT4gdGFiLnJvdXRlRGF0YT8uaGFzUm91dGVyTGluay52YWx1ZSA9PT0gdHJ1ZSlcbiAgICAgIGNvbnN0IHsgaGFzaDogY3VycmVudEhhc2gsIHF1ZXJ5OiBjdXJyZW50UXVlcnkgfSA9IHByb3h5LiRyb3V0ZVxuICAgICAgY29uc3QgY3VycmVudFF1ZXJ5TGVuID0gT2JqZWN0LmtleXMoY3VycmVudFF1ZXJ5KS5sZW5ndGhcblxuICAgICAgLy8gVnVlIFJvdXRlciBkb2VzIG5vdCBrZWVwIGFjY291bnQgb2YgaGFzaCAmIHF1ZXJ5IHdoZW4gbWF0Y2hpbmdcbiAgICAgIC8vIHNvIHdlJ3JlIGRvaW5nIHRoaXMgYXMgd2VsbFxuXG4gICAgICBmb3IgKGNvbnN0IHRhYiBvZiBsaXN0KSB7XG4gICAgICAgIGNvbnN0IGV4YWN0ID0gdGFiLnJvdXRlRGF0YS5leGFjdC52YWx1ZSA9PT0gdHJ1ZVxuXG4gICAgICAgIGlmICh0YWIucm91dGVEYXRhWyBleGFjdCA9PT0gdHJ1ZSA/ICdsaW5rSXNFeGFjdEFjdGl2ZScgOiAnbGlua0lzQWN0aXZlJyBdLnZhbHVlICE9PSB0cnVlKSB7XG4gICAgICAgICAgLy8gaXQgY2Fubm90IG1hdGNoIGFueXRoaW5nIGFzIGl0J3Mgbm90IGFjdGl2ZSBub3IgZXhhY3QtYWN0aXZlXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHsgaGFzaCwgcXVlcnksIG1hdGNoZWQsIGhyZWYgfSA9IHRhYi5yb3V0ZURhdGEucmVzb2x2ZWRMaW5rLnZhbHVlXG4gICAgICAgIGNvbnN0IHF1ZXJ5TGVuID0gT2JqZWN0LmtleXMocXVlcnkpLmxlbmd0aFxuXG4gICAgICAgIGlmIChleGFjdCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGlmIChoYXNoICE9PSBjdXJyZW50SGFzaCkge1xuICAgICAgICAgICAgLy8gaXQncyBzZXQgdG8gZXhhY3QgYnV0IGl0IGRvZXNuJ3QgbWF0Y2hlcyB0aGUgaGFzaFxuICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBxdWVyeUxlbiAhPT0gY3VycmVudFF1ZXJ5TGVuXG4gICAgICAgICAgICB8fCBoYXNRdWVyeUluY2x1ZGVkKGN1cnJlbnRRdWVyeSwgcXVlcnkpID09PSBmYWxzZVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgLy8gaXQncyBzZXQgdG8gZXhhY3QgYnV0IGl0IGRvZXNuJ3QgbWF0Y2hlcyB0aGUgcXVlcnlcbiAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8geWV5LCB3ZSBmb3VuZCB0aGUgcGVyZmVjdCBtYXRjaCAocm91dGUgKyBoYXNoICsgcXVlcnkpXG4gICAgICAgICAgbmFtZSA9IHRhYi5uYW1lLnZhbHVlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoYXNoICE9PSAnJyAmJiBoYXNoICE9PSBjdXJyZW50SGFzaCkge1xuICAgICAgICAgIC8vIGl0IGhhcyBoYXNoIGFuZCBpdCBkb2Vzbid0IG1hdGNoZXNcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIHF1ZXJ5TGVuICE9PSAwXG4gICAgICAgICAgJiYgaGFzUXVlcnlJbmNsdWRlZChxdWVyeSwgY3VycmVudFF1ZXJ5KSA9PT0gZmFsc2VcbiAgICAgICAgKSB7XG4gICAgICAgICAgLy8gaXQgaGFzIHF1ZXJ5IGFuZCBpdCBkb2Vzbid0IGluY2x1ZGVzIHRoZSBjdXJyZW50IG9uZVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBuZXdTY29yZSA9IHtcbiAgICAgICAgICBtYXRjaGVkTGVuOiBtYXRjaGVkLmxlbmd0aCxcbiAgICAgICAgICBxdWVyeURpZmY6IGN1cnJlbnRRdWVyeUxlbiAtIHF1ZXJ5TGVuLFxuICAgICAgICAgIGhyZWZMZW46IGhyZWYubGVuZ3RoIC0gaGFzaC5sZW5ndGhcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXdTY29yZS5tYXRjaGVkTGVuID4gYmVzdFNjb3JlLm1hdGNoZWRMZW4pIHtcbiAgICAgICAgICAvLyBpdCBtYXRjaGVzIG1vcmUgcm91dGVzIHNvIGl0J3MgbW9yZSBzcGVjaWZpYyBzbyB3ZSBzZXQgaXQgYXMgY3VycmVudCBjaGFtcGlvblxuICAgICAgICAgIG5hbWUgPSB0YWIubmFtZS52YWx1ZVxuICAgICAgICAgIGJlc3RTY29yZSA9IG5ld1Njb3JlXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChuZXdTY29yZS5tYXRjaGVkTGVuICE9PSBiZXN0U2NvcmUubWF0Y2hlZExlbikge1xuICAgICAgICAgIC8vIGl0IG1hdGNoZXMgbGVzcyByb3V0ZXMgdGhhbiB0aGUgY3VycmVudCBjaGFtcGlvbiBzbyB3ZSBkaXNjYXJkIGl0XG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXdTY29yZS5xdWVyeURpZmYgPCBiZXN0U2NvcmUucXVlcnlEaWZmKSB7XG4gICAgICAgICAgLy8gcXVlcnkgaXMgY2xvc2VyIHRvIHRoZSBjdXJyZW50IG9uZSBzbyB3ZSBzZXQgaXQgYXMgY3VycmVudCBjaGFtcGlvblxuICAgICAgICAgIG5hbWUgPSB0YWIubmFtZS52YWx1ZVxuICAgICAgICAgIGJlc3RTY29yZSA9IG5ld1Njb3JlXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmV3U2NvcmUucXVlcnlEaWZmICE9PSBiZXN0U2NvcmUucXVlcnlEaWZmKSB7XG4gICAgICAgICAgLy8gaXQgbWF0Y2hlcyBsZXNzIHJvdXRlcyB0aGFuIHRoZSBjdXJyZW50IGNoYW1waW9uIHNvIHdlIGRpc2NhcmQgaXRcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5ld1Njb3JlLmhyZWZMZW4gPiBiZXN0U2NvcmUuaHJlZkxlbikge1xuICAgICAgICAgIC8vIGhyZWYgaXMgbGVuZ3RoaWVyIHNvIGl0J3MgbW9yZSBzcGVjaWZpYyBzbyB3ZSBzZXQgaXQgYXMgY3VycmVudCBjaGFtcGlvblxuICAgICAgICAgIG5hbWUgPSB0YWIubmFtZS52YWx1ZVxuICAgICAgICAgIGJlc3RTY29yZSA9IG5ld1Njb3JlXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICBuYW1lID09PSBudWxsXG4gICAgICAgICYmIHRhYkRhdGFMaXN0LnNvbWUodGFiID0+IHRhYi5yb3V0ZURhdGEgPT09IHZvaWQgMCAmJiB0YWIubmFtZS52YWx1ZSA9PT0gY3VycmVudE1vZGVsLnZhbHVlKSA9PT0gdHJ1ZVxuICAgICAgKSB7XG4gICAgICAgIC8vIHdlIHNob3VsZG4ndCBpbnRlcmZlcmUgaWYgbm9uLXJvdXRlIHRhYiBpcyBhY3RpdmVcbiAgICAgICAgaGFkQWN0aXZhdGVkID0gZmFsc2VcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIHVwZGF0ZU1vZGVsKHsgbmFtZSwgc2V0Q3VycmVudDogdHJ1ZSB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRm9jdXNpbiAoZSkge1xuICAgICAgcmVtb3ZlRm9jdXNUaW1lb3V0KClcblxuICAgICAgaWYgKFxuICAgICAgICBoYXNGb2N1cy52YWx1ZSAhPT0gdHJ1ZVxuICAgICAgICAmJiByb290UmVmLnZhbHVlICE9PSBudWxsXG4gICAgICAgICYmIGUudGFyZ2V0XG4gICAgICAgICYmIHR5cGVvZiBlLnRhcmdldC5jbG9zZXN0ID09PSAnZnVuY3Rpb24nXG4gICAgICApIHtcbiAgICAgICAgY29uc3QgdGFiID0gZS50YXJnZXQuY2xvc2VzdCgnLnEtdGFiJylcblxuICAgICAgICAvLyBpZiB0aGUgdGFyZ2V0IGlzIGNvbnRhaW5lZCBieSBhIFFUYWIvUVJvdXRlVGFiXG4gICAgICAgIC8vIChpdCBtaWdodCBiZSBvdGhlciBlbGVtZW50cyBmb2N1c2VkLCBsaWtlIGFkZGl0aW9uYWwgUUJ0bilcbiAgICAgICAgaWYgKHRhYiAmJiByb290UmVmLnZhbHVlLmNvbnRhaW5zKHRhYikgPT09IHRydWUpIHtcbiAgICAgICAgICBoYXNGb2N1cy52YWx1ZSA9IHRydWVcbiAgICAgICAgICBzY3JvbGxhYmxlLnZhbHVlID09PSB0cnVlICYmIHNjcm9sbFRvVGFiRWwodGFiKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Gb2N1c291dCAoKSB7XG4gICAgICByZWdpc3RlckZvY3VzVGltZW91dCgoKSA9PiB7IGhhc0ZvY3VzLnZhbHVlID0gZmFsc2UgfSwgMzApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmVyaWZ5Um91dGVNb2RlbCAoKSB7XG4gICAgICBpZiAoJHRhYnMuYXZvaWRSb3V0ZVdhdGNoZXIgPT09IGZhbHNlKSB7XG4gICAgICAgIHJlZ2lzdGVyU2Nyb2xsVG9UYWJUaW1lb3V0KHVwZGF0ZUFjdGl2ZVJvdXRlKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJlbW92ZVNjcm9sbFRvVGFiVGltZW91dCgpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gd2F0Y2hSb3V0ZSAoKSB7XG4gICAgICBpZiAodW53YXRjaFJvdXRlID09PSB2b2lkIDApIHtcbiAgICAgICAgY29uc3QgdW53YXRjaCA9IHdhdGNoKCgpID0+IHByb3h5LiRyb3V0ZS5mdWxsUGF0aCwgdmVyaWZ5Um91dGVNb2RlbClcbiAgICAgICAgdW53YXRjaFJvdXRlID0gKCkgPT4ge1xuICAgICAgICAgIHVud2F0Y2goKVxuICAgICAgICAgIHVud2F0Y2hSb3V0ZSA9IHZvaWQgMFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVnaXN0ZXJUYWIgKHRhYkRhdGEpIHtcbiAgICAgIHRhYkRhdGFMaXN0LnB1c2godGFiRGF0YSlcbiAgICAgIHRhYkRhdGFMaXN0TGVuLnZhbHVlKytcblxuICAgICAgcmVjYWxjdWxhdGVTY3JvbGwoKVxuXG4gICAgICAvLyBpZiBpdCdzIGEgUVRhYiBvciB3ZSBkb24ndCBoYXZlIFZ1ZSBSb3V0ZXJcbiAgICAgIGlmICh0YWJEYXRhLnJvdXRlRGF0YSA9PT0gdm9pZCAwIHx8IHByb3h5LiRyb3V0ZSA9PT0gdm9pZCAwKSB7XG4gICAgICAgIC8vIHdlIHNob3VsZCBwb3NpdGlvbiB0byB0aGUgY3VycmVudGx5IGFjdGl2ZSB0YWIgKGlmIGFueSlcbiAgICAgICAgcmVnaXN0ZXJTY3JvbGxUb1RhYlRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGlmIChzY3JvbGxhYmxlLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGN1cnJlbnRNb2RlbC52YWx1ZVxuICAgICAgICAgICAgY29uc3QgbmV3VGFiID0gdmFsdWUgIT09IHZvaWQgMCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gJydcbiAgICAgICAgICAgICAgPyB0YWJEYXRhTGlzdC5maW5kKHRhYiA9PiB0YWIubmFtZS52YWx1ZSA9PT0gdmFsdWUpXG4gICAgICAgICAgICAgIDogbnVsbFxuXG4gICAgICAgICAgICBuZXdUYWIgJiYgc2Nyb2xsVG9UYWJFbChuZXdUYWIucm9vdFJlZi52YWx1ZSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICAvLyBlbHNlIGlmIGl0J3MgYSBRUm91dGVUYWIgd2l0aCBhIHZhbGlkIGxpbmtcbiAgICAgIGVsc2Uge1xuICAgICAgICAvLyBzdGFydCB3YXRjaGluZyByb3V0ZVxuICAgICAgICB3YXRjaFJvdXRlKClcblxuICAgICAgICBpZiAodGFiRGF0YS5yb3V0ZURhdGEuaGFzUm91dGVyTGluay52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHZlcmlmeVJvdXRlTW9kZWwoKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdW5yZWdpc3RlclRhYiAodGFiRGF0YSkge1xuICAgICAgdGFiRGF0YUxpc3Quc3BsaWNlKHRhYkRhdGFMaXN0LmluZGV4T2YodGFiRGF0YSksIDEpXG4gICAgICB0YWJEYXRhTGlzdExlbi52YWx1ZS0tXG5cbiAgICAgIHJlY2FsY3VsYXRlU2Nyb2xsKClcblxuICAgICAgaWYgKHVud2F0Y2hSb3V0ZSAhPT0gdm9pZCAwICYmIHRhYkRhdGEucm91dGVEYXRhICE9PSB2b2lkIDApIHtcbiAgICAgICAgLy8gdW53YXRjaCByb3V0ZSBpZiB3ZSBkb24ndCBoYXZlIGFueSBRUm91dGVUYWJzIGxlZnRcbiAgICAgICAgaWYgKHRhYkRhdGFMaXN0LmV2ZXJ5KHRhYiA9PiB0YWIucm91dGVEYXRhID09PSB2b2lkIDApID09PSB0cnVlKSB7XG4gICAgICAgICAgdW53YXRjaFJvdXRlKClcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRoZW4gdXBkYXRlIG1vZGVsXG4gICAgICAgIHZlcmlmeVJvdXRlTW9kZWwoKVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0ICR0YWJzID0ge1xuICAgICAgY3VycmVudE1vZGVsLFxuICAgICAgdGFiUHJvcHMsXG4gICAgICBoYXNGb2N1cyxcbiAgICAgIGhhc0FjdGl2ZVRhYixcblxuICAgICAgcmVnaXN0ZXJUYWIsXG4gICAgICB1bnJlZ2lzdGVyVGFiLFxuXG4gICAgICB2ZXJpZnlSb3V0ZU1vZGVsLFxuICAgICAgdXBkYXRlTW9kZWwsXG4gICAgICBvbktiZE5hdmlnYXRlLFxuXG4gICAgICBhdm9pZFJvdXRlV2F0Y2hlcjogZmFsc2UgLy8gZmFsc2UgfCBzdHJpbmcgKHVpZClcbiAgICB9XG5cbiAgICBwcm92aWRlKHRhYnNLZXksICR0YWJzKVxuXG4gICAgZnVuY3Rpb24gY2xlYW51cCAoKSB7XG4gICAgICBhbmltYXRlVGltZXIgIT09IG51bGwgJiYgY2xlYXJUaW1lb3V0KGFuaW1hdGVUaW1lcilcbiAgICAgIHN0b3BBbmltU2Nyb2xsKClcbiAgICAgIHVud2F0Y2hSb3V0ZT8uKClcbiAgICB9XG5cbiAgICBsZXQgaGFkUm91dGVXYXRjaGVyLCBoYWRBY3RpdmF0ZWRcblxuICAgIG9uQmVmb3JlVW5tb3VudChjbGVhbnVwKVxuXG4gICAgb25EZWFjdGl2YXRlZCgoKSA9PiB7XG4gICAgICBoYWRSb3V0ZVdhdGNoZXIgPSB1bndhdGNoUm91dGUgIT09IHZvaWQgMFxuICAgICAgY2xlYW51cCgpXG4gICAgfSlcblxuICAgIG9uQWN0aXZhdGVkKCgpID0+IHtcbiAgICAgIGlmIChoYWRSb3V0ZVdhdGNoZXIgPT09IHRydWUpIHtcbiAgICAgICAgd2F0Y2hSb3V0ZSgpXG4gICAgICAgIGhhZEFjdGl2YXRlZCA9IHRydWVcbiAgICAgICAgdmVyaWZ5Um91dGVNb2RlbCgpXG4gICAgICB9XG5cbiAgICAgIHJlY2FsY3VsYXRlU2Nyb2xsKClcbiAgICB9KVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAgIHJlZjogcm9vdFJlZixcbiAgICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUsXG4gICAgICAgIHJvbGU6ICd0YWJsaXN0JyxcbiAgICAgICAgb25Gb2N1c2luLFxuICAgICAgICBvbkZvY3Vzb3V0XG4gICAgICB9LCBbXG4gICAgICAgIGgoUVJlc2l6ZU9ic2VydmVyLCB7IG9uUmVzaXplOiB1cGRhdGVDb250YWluZXIgfSksXG5cbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIHJlZjogY29udGVudFJlZixcbiAgICAgICAgICBjbGFzczogaW5uZXJDbGFzcy52YWx1ZSxcbiAgICAgICAgICBvblNjcm9sbDogdXBkYXRlQXJyb3dzXG4gICAgICAgIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKSxcblxuICAgICAgICBoKFFJY29uLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLXRhYnNfX2Fycm93IHEtdGFic19fYXJyb3ctLWxlZnQgYWJzb2x1dGUgcS10YWJfX2ljb24nXG4gICAgICAgICAgICArIChsZWZ0QXJyb3cudmFsdWUgPT09IHRydWUgPyAnJyA6ICcgcS10YWJzX19hcnJvdy0tZmFkZWQnKSxcbiAgICAgICAgICBuYW1lOiBwcm9wcy5sZWZ0SWNvbiB8fCAkcS5pY29uU2V0LnRhYnNbIHByb3BzLnZlcnRpY2FsID09PSB0cnVlID8gJ3VwJyA6ICdsZWZ0JyBdLFxuICAgICAgICAgIG9uTW91c2Vkb3duUGFzc2l2ZTogc2Nyb2xsVG9TdGFydCxcbiAgICAgICAgICBvblRvdWNoc3RhcnRQYXNzaXZlOiBzY3JvbGxUb1N0YXJ0LFxuICAgICAgICAgIG9uTW91c2V1cFBhc3NpdmU6IHN0b3BBbmltU2Nyb2xsLFxuICAgICAgICAgIG9uTW91c2VsZWF2ZVBhc3NpdmU6IHN0b3BBbmltU2Nyb2xsLFxuICAgICAgICAgIG9uVG91Y2hlbmRQYXNzaXZlOiBzdG9wQW5pbVNjcm9sbFxuICAgICAgICB9KSxcblxuICAgICAgICBoKFFJY29uLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLXRhYnNfX2Fycm93IHEtdGFic19fYXJyb3ctLXJpZ2h0IGFic29sdXRlIHEtdGFiX19pY29uJ1xuICAgICAgICAgICAgKyAocmlnaHRBcnJvdy52YWx1ZSA9PT0gdHJ1ZSA/ICcnIDogJyBxLXRhYnNfX2Fycm93LS1mYWRlZCcpLFxuICAgICAgICAgIG5hbWU6IHByb3BzLnJpZ2h0SWNvbiB8fCAkcS5pY29uU2V0LnRhYnNbIHByb3BzLnZlcnRpY2FsID09PSB0cnVlID8gJ2Rvd24nIDogJ3JpZ2h0JyBdLFxuICAgICAgICAgIG9uTW91c2Vkb3duUGFzc2l2ZTogc2Nyb2xsVG9FbmQsXG4gICAgICAgICAgb25Ub3VjaHN0YXJ0UGFzc2l2ZTogc2Nyb2xsVG9FbmQsXG4gICAgICAgICAgb25Nb3VzZXVwUGFzc2l2ZTogc3RvcEFuaW1TY3JvbGwsXG4gICAgICAgICAgb25Nb3VzZWxlYXZlUGFzc2l2ZTogc3RvcEFuaW1TY3JvbGwsXG4gICAgICAgICAgb25Ub3VjaGVuZFBhc3NpdmU6IHN0b3BBbmltU2Nyb2xsXG4gICAgICAgIH0pXG4gICAgICBdKVxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIGNvbXB1dGVkLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB1c2VEYXJrLCB7IHVzZURhcmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLWRhcmsvdXNlLWRhcmsuanMnXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcblxuY29uc3Qgcm9sZUF0dHJFeGNlcHRpb25zID0gWyAndWwnLCAnb2wnIF1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FMaXN0JyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZURhcmtQcm9wcyxcblxuICAgIGJvcmRlcmVkOiBCb29sZWFuLFxuICAgIGRlbnNlOiBCb29sZWFuLFxuICAgIHNlcGFyYXRvcjogQm9vbGVhbixcbiAgICBwYWRkaW5nOiBCb29sZWFuLFxuXG4gICAgdGFnOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnZGl2J1xuICAgIH1cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCBpc0RhcmsgPSB1c2VEYXJrKHByb3BzLCB2bS5wcm94eS4kcSlcblxuICAgIGNvbnN0IHJvbGUgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICByb2xlQXR0ckV4Y2VwdGlvbnMuaW5jbHVkZXMocHJvcHMudGFnKSA/IG51bGwgOiAnbGlzdCcpXG4gICAgKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1saXN0J1xuICAgICAgKyAocHJvcHMuYm9yZGVyZWQgPT09IHRydWUgPyAnIHEtbGlzdC0tYm9yZGVyZWQnIDogJycpXG4gICAgICArIChwcm9wcy5kZW5zZSA9PT0gdHJ1ZSA/ICcgcS1saXN0LS1kZW5zZScgOiAnJylcbiAgICAgICsgKHByb3BzLnNlcGFyYXRvciA9PT0gdHJ1ZSA/ICcgcS1saXN0LS1zZXBhcmF0b3InIDogJycpXG4gICAgICArIChpc0RhcmsudmFsdWUgPT09IHRydWUgPyAnIHEtbGlzdC0tZGFyaycgOiAnJylcbiAgICAgICsgKHByb3BzLnBhZGRpbmcgPT09IHRydWUgPyAnIHEtbGlzdC0tcGFkZGluZycgOiAnJylcbiAgICApXG5cbiAgICByZXR1cm4gKCkgPT4gaChwcm9wcy50YWcsIHsgY2xhc3M6IGNsYXNzZXMudmFsdWUsIHJvbGU6IHJvbGUudmFsdWUgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBjbGllbnQgfSBmcm9tICcuLi8uLi9wbHVnaW5zL3BsYXRmb3JtL1BsYXRmb3JtLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVEaXJlY3RpdmUgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBnZXRNb2RpZmllckRpcmVjdGlvbnMsIHNob3VsZFN0YXJ0IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS50b3VjaC90b3VjaC5qcydcbmltcG9ydCB7IGFkZEV2dCwgY2xlYW5FdnQsIHBvc2l0aW9uLCBsZWZ0Q2xpY2ssIHN0b3BBbmRQcmV2ZW50LCBwcmV2ZW50RHJhZ2dhYmxlLCBub29wIH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnQvZXZlbnQuanMnXG5pbXBvcnQgeyBjbGVhclNlbGVjdGlvbiB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuc2VsZWN0aW9uL3NlbGVjdGlvbi5qcydcbmltcG9ydCBnZXRTU1JQcm9wcyBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLm5vb3Atc3NyLWRpcmVjdGl2ZS10cmFuc2Zvcm0vbm9vcC1zc3ItZGlyZWN0aXZlLXRyYW5zZm9ybS5qcydcblxuZnVuY3Rpb24gcGFyc2VBcmcgKGFyZykge1xuICAvLyBkZWx0YSAobWluIHZlbG9jaXR5IC0tIGRpc3QgLyB0aW1lKVxuICAvLyBtb2JpbGUgbWluIGRpc3RhbmNlIG9uIGZpcnN0IG1vdmVcbiAgLy8gZGVza3RvcCBtaW4gZGlzdGFuY2UgdW50aWwgZGVjaWRpbmcgaWYgaXQncyBhIHN3aXBlIG9yIG5vdFxuICBjb25zdCBkYXRhID0gWyAwLjA2LCA2LCA1MCBdXG5cbiAgaWYgKHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnICYmIGFyZy5sZW5ndGgpIHtcbiAgICBhcmcuc3BsaXQoJzonKS5mb3JFYWNoKCh2YWwsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCB2ID0gcGFyc2VGbG9hdCh2YWwpXG4gICAgICB2ICYmIChkYXRhWyBpbmRleCBdID0gdilcbiAgICB9KVxuICB9XG5cbiAgcmV0dXJuIGRhdGFcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlRGlyZWN0aXZlKF9fUVVBU0FSX1NTUl9TRVJWRVJfX1xuICA/IHsgbmFtZTogJ3RvdWNoLXN3aXBlJywgZ2V0U1NSUHJvcHMgfVxuICA6IHtcbiAgICAgIG5hbWU6ICd0b3VjaC1zd2lwZScsXG5cbiAgICAgIGJlZm9yZU1vdW50IChlbCwgeyB2YWx1ZSwgYXJnLCBtb2RpZmllcnMgfSkge1xuICAgICAgICAvLyBlYXJseSByZXR1cm4sIHdlIGRvbid0IG5lZWQgdG8gZG8gYW55dGhpbmdcbiAgICAgICAgaWYgKFxuICAgICAgICAgIG1vZGlmaWVycy5tb3VzZSAhPT0gdHJ1ZVxuICAgICAgICAgICYmIGNsaWVudC5oYXMudG91Y2ggIT09IHRydWVcbiAgICAgICAgKSByZXR1cm5cblxuICAgICAgICBjb25zdCBtb3VzZUNhcHR1cmUgPSBtb2RpZmllcnMubW91c2VDYXB0dXJlID09PSB0cnVlID8gJ0NhcHR1cmUnIDogJydcblxuICAgICAgICBjb25zdCBjdHggPSB7XG4gICAgICAgICAgaGFuZGxlcjogdmFsdWUsXG4gICAgICAgICAgc2Vuc2l0aXZpdHk6IHBhcnNlQXJnKGFyZyksXG4gICAgICAgICAgZGlyZWN0aW9uOiBnZXRNb2RpZmllckRpcmVjdGlvbnMobW9kaWZpZXJzKSxcblxuICAgICAgICAgIG5vb3AsXG5cbiAgICAgICAgICBtb3VzZVN0YXJ0IChldnQpIHtcbiAgICAgICAgICAgIGlmIChzaG91bGRTdGFydChldnQsIGN0eCkgJiYgbGVmdENsaWNrKGV2dCkpIHtcbiAgICAgICAgICAgICAgYWRkRXZ0KGN0eCwgJ3RlbXAnLCBbXG4gICAgICAgICAgICAgICAgWyBkb2N1bWVudCwgJ21vdXNlbW92ZScsICdtb3ZlJywgYG5vdFBhc3NpdmUkeyBtb3VzZUNhcHR1cmUgfWAgXSxcbiAgICAgICAgICAgICAgICBbIGRvY3VtZW50LCAnbW91c2V1cCcsICdlbmQnLCAnbm90UGFzc2l2ZUNhcHR1cmUnIF1cbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgY3R4LnN0YXJ0KGV2dCwgdHJ1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgdG91Y2hTdGFydCAoZXZ0KSB7XG4gICAgICAgICAgICBpZiAoc2hvdWxkU3RhcnQoZXZ0LCBjdHgpKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGV2dC50YXJnZXRcbiAgICAgICAgICAgICAgYWRkRXZ0KGN0eCwgJ3RlbXAnLCBbXG4gICAgICAgICAgICAgICAgWyB0YXJnZXQsICd0b3VjaG1vdmUnLCAnbW92ZScsICdub3RQYXNzaXZlQ2FwdHVyZScgXSxcbiAgICAgICAgICAgICAgICBbIHRhcmdldCwgJ3RvdWNoY2FuY2VsJywgJ2VuZCcsICdub3RQYXNzaXZlQ2FwdHVyZScgXSxcbiAgICAgICAgICAgICAgICBbIHRhcmdldCwgJ3RvdWNoZW5kJywgJ2VuZCcsICdub3RQYXNzaXZlQ2FwdHVyZScgXVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICBjdHguc3RhcnQoZXZ0KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBzdGFydCAoZXZ0LCBtb3VzZUV2ZW50KSB7XG4gICAgICAgICAgICBjbGllbnQuaXMuZmlyZWZveCA9PT0gdHJ1ZSAmJiBwcmV2ZW50RHJhZ2dhYmxlKGVsLCB0cnVlKVxuXG4gICAgICAgICAgICBjb25zdCBwb3MgPSBwb3NpdGlvbihldnQpXG5cbiAgICAgICAgICAgIGN0eC5ldmVudCA9IHtcbiAgICAgICAgICAgICAgeDogcG9zLmxlZnQsXG4gICAgICAgICAgICAgIHk6IHBvcy50b3AsXG4gICAgICAgICAgICAgIHRpbWU6IERhdGUubm93KCksXG4gICAgICAgICAgICAgIG1vdXNlOiBtb3VzZUV2ZW50ID09PSB0cnVlLFxuICAgICAgICAgICAgICBkaXI6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIG1vdmUgKGV2dCkge1xuICAgICAgICAgICAgaWYgKGN0eC5ldmVudCA9PT0gdm9pZCAwKSByZXR1cm5cblxuICAgICAgICAgICAgaWYgKGN0eC5ldmVudC5kaXIgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIHN0b3BBbmRQcmV2ZW50KGV2dClcbiAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHRpbWUgPSBEYXRlLm5vdygpIC0gY3R4LmV2ZW50LnRpbWVcblxuICAgICAgICAgICAgaWYgKHRpbWUgPT09IDApIHJldHVyblxuXG4gICAgICAgICAgICBjb25zdFxuICAgICAgICAgICAgICBwb3MgPSBwb3NpdGlvbihldnQpLFxuICAgICAgICAgICAgICBkaXN0WCA9IHBvcy5sZWZ0IC0gY3R4LmV2ZW50LngsXG4gICAgICAgICAgICAgIGFic1ggPSBNYXRoLmFicyhkaXN0WCksXG4gICAgICAgICAgICAgIGRpc3RZID0gcG9zLnRvcCAtIGN0eC5ldmVudC55LFxuICAgICAgICAgICAgICBhYnNZID0gTWF0aC5hYnMoZGlzdFkpXG5cbiAgICAgICAgICAgIGlmIChjdHguZXZlbnQubW91c2UgIT09IHRydWUpIHtcbiAgICAgICAgICAgICAgaWYgKGFic1ggPCBjdHguc2Vuc2l0aXZpdHlbIDEgXSAmJiBhYnNZIDwgY3R4LnNlbnNpdGl2aXR5WyAxIF0pIHtcbiAgICAgICAgICAgICAgICBjdHguZW5kKGV2dClcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gaXMgdXNlciB0cnlpbmcgdG8gc2VsZWN0IHRleHQ/XG4gICAgICAgICAgICAvLyBpZiBzbywgdGhlbiBzb21ldGhpbmcgc2hvdWxkIGJlIHJlcG9ydGVkIGhlcmVcbiAgICAgICAgICAgIC8vIChwcmV2aW91cyBzZWxlY3Rpb24sIGlmIGFueSwgd2FzIGRpc2NhcmRlZCB3aGVuIHN3aXBlIHN0YXJ0ZWQpXG4gICAgICAgICAgICBlbHNlIGlmICh3aW5kb3cuZ2V0U2VsZWN0aW9uKCkudG9TdHJpbmcoKSAhPT0gJycpIHtcbiAgICAgICAgICAgICAgY3R4LmVuZChldnQpXG4gICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYWJzWCA8IGN0eC5zZW5zaXRpdml0eVsgMiBdICYmIGFic1kgPCBjdHguc2Vuc2l0aXZpdHlbIDIgXSkge1xuICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3RcbiAgICAgICAgICAgICAgdmVsWCA9IGFic1ggLyB0aW1lLFxuICAgICAgICAgICAgICB2ZWxZID0gYWJzWSAvIHRpbWVcblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBjdHguZGlyZWN0aW9uLnZlcnRpY2FsID09PSB0cnVlXG4gICAgICAgICAgICAgICYmIGFic1ggPCBhYnNZXG4gICAgICAgICAgICAgICYmIGFic1ggPCAxMDBcbiAgICAgICAgICAgICAgJiYgdmVsWSA+IGN0eC5zZW5zaXRpdml0eVsgMCBdXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgY3R4LmV2ZW50LmRpciA9IGRpc3RZIDwgMCA/ICd1cCcgOiAnZG93bidcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBjdHguZGlyZWN0aW9uLmhvcml6b250YWwgPT09IHRydWVcbiAgICAgICAgICAgICAgJiYgYWJzWCA+IGFic1lcbiAgICAgICAgICAgICAgJiYgYWJzWSA8IDEwMFxuICAgICAgICAgICAgICAmJiB2ZWxYID4gY3R4LnNlbnNpdGl2aXR5WyAwIF1cbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBjdHguZXZlbnQuZGlyID0gZGlzdFggPCAwID8gJ2xlZnQnIDogJ3JpZ2h0J1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGN0eC5kaXJlY3Rpb24udXAgPT09IHRydWVcbiAgICAgICAgICAgICAgJiYgYWJzWCA8IGFic1lcbiAgICAgICAgICAgICAgJiYgZGlzdFkgPCAwXG4gICAgICAgICAgICAgICYmIGFic1ggPCAxMDBcbiAgICAgICAgICAgICAgJiYgdmVsWSA+IGN0eC5zZW5zaXRpdml0eVsgMCBdXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgY3R4LmV2ZW50LmRpciA9ICd1cCdcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBjdHguZGlyZWN0aW9uLmRvd24gPT09IHRydWVcbiAgICAgICAgICAgICAgJiYgYWJzWCA8IGFic1lcbiAgICAgICAgICAgICAgJiYgZGlzdFkgPiAwXG4gICAgICAgICAgICAgICYmIGFic1ggPCAxMDBcbiAgICAgICAgICAgICAgJiYgdmVsWSA+IGN0eC5zZW5zaXRpdml0eVsgMCBdXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgY3R4LmV2ZW50LmRpciA9ICdkb3duJ1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGN0eC5kaXJlY3Rpb24ubGVmdCA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAmJiBhYnNYID4gYWJzWVxuICAgICAgICAgICAgICAmJiBkaXN0WCA8IDBcbiAgICAgICAgICAgICAgJiYgYWJzWSA8IDEwMFxuICAgICAgICAgICAgICAmJiB2ZWxYID4gY3R4LnNlbnNpdGl2aXR5WyAwIF1cbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBjdHguZXZlbnQuZGlyID0gJ2xlZnQnXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgY3R4LmRpcmVjdGlvbi5yaWdodCA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAmJiBhYnNYID4gYWJzWVxuICAgICAgICAgICAgICAmJiBkaXN0WCA+IDBcbiAgICAgICAgICAgICAgJiYgYWJzWSA8IDEwMFxuICAgICAgICAgICAgICAmJiB2ZWxYID4gY3R4LnNlbnNpdGl2aXR5WyAwIF1cbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBjdHguZXZlbnQuZGlyID0gJ3JpZ2h0J1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY3R4LmV2ZW50LmRpciAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgc3RvcEFuZFByZXZlbnQoZXZ0KVxuXG4gICAgICAgICAgICAgIGlmIChjdHguZXZlbnQubW91c2UgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ25vLXBvaW50ZXItZXZlbnRzLS1jaGlsZHJlbicpXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdub24tc2VsZWN0YWJsZScpXG4gICAgICAgICAgICAgICAgY2xlYXJTZWxlY3Rpb24oKVxuXG4gICAgICAgICAgICAgICAgY3R4LnN0eWxlQ2xlYW51cCA9IHdpdGhEZWxheSA9PiB7XG4gICAgICAgICAgICAgICAgICBjdHguc3R5bGVDbGVhbnVwID0gdm9pZCAwXG5cbiAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnbm9uLXNlbGVjdGFibGUnKVxuXG4gICAgICAgICAgICAgICAgICBjb25zdCByZW1vdmUgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnbm8tcG9pbnRlci1ldmVudHMtLWNoaWxkcmVuJylcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgaWYgKHdpdGhEZWxheSA9PT0gdHJ1ZSkgeyBzZXRUaW1lb3V0KHJlbW92ZSwgNTApIH1cbiAgICAgICAgICAgICAgICAgIGVsc2UgeyByZW1vdmUoKSB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgY3R4LmhhbmRsZXIoe1xuICAgICAgICAgICAgICAgIGV2dCxcbiAgICAgICAgICAgICAgICB0b3VjaDogY3R4LmV2ZW50Lm1vdXNlICE9PSB0cnVlLFxuICAgICAgICAgICAgICAgIG1vdXNlOiBjdHguZXZlbnQubW91c2UsXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uOiBjdHguZXZlbnQuZGlyLFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiB0aW1lLFxuICAgICAgICAgICAgICAgIGRpc3RhbmNlOiB7XG4gICAgICAgICAgICAgICAgICB4OiBhYnNYLFxuICAgICAgICAgICAgICAgICAgeTogYWJzWVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICBjdHguZW5kKGV2dClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgZW5kIChldnQpIHtcbiAgICAgICAgICAgIGlmIChjdHguZXZlbnQgPT09IHZvaWQgMCkgcmV0dXJuXG5cbiAgICAgICAgICAgIGNsZWFuRXZ0KGN0eCwgJ3RlbXAnKVxuICAgICAgICAgICAgY2xpZW50LmlzLmZpcmVmb3ggPT09IHRydWUgJiYgcHJldmVudERyYWdnYWJsZShlbCwgZmFsc2UpXG4gICAgICAgICAgICBjdHguc3R5bGVDbGVhbnVwPy4odHJ1ZSlcbiAgICAgICAgICAgIGlmICgoZXZ0ICE9PSB2b2lkIDApICYmIChjdHguZXZlbnQuZGlyICE9PSBmYWxzZSkpIHN0b3BBbmRQcmV2ZW50KGV2dClcblxuICAgICAgICAgICAgY3R4LmV2ZW50ID0gdm9pZCAwXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZWwuX19xdG91Y2hzd2lwZSA9IGN0eFxuXG4gICAgICAgIGlmIChtb2RpZmllcnMubW91c2UgPT09IHRydWUpIHtcbiAgICAgICAgICAvLyBhY2NvdW50IGZvciBVTUQgdG9vIHdoZXJlIG1vZGlmaWVycyB3aWxsIGJlIGxvd2VyY2FzZWQgdG8gd29ya1xuICAgICAgICAgIGNvbnN0IGNhcHR1cmUgPSBtb2RpZmllcnMubW91c2VDYXB0dXJlID09PSB0cnVlIHx8IG1vZGlmaWVycy5tb3VzZWNhcHR1cmUgPT09IHRydWVcbiAgICAgICAgICAgID8gJ0NhcHR1cmUnXG4gICAgICAgICAgICA6ICcnXG5cbiAgICAgICAgICBhZGRFdnQoY3R4LCAnbWFpbicsIFtcbiAgICAgICAgICAgIFsgZWwsICdtb3VzZWRvd24nLCAnbW91c2VTdGFydCcsIGBwYXNzaXZlJHsgY2FwdHVyZSB9YCBdXG4gICAgICAgICAgXSlcbiAgICAgICAgfVxuXG4gICAgICAgIGNsaWVudC5oYXMudG91Y2ggPT09IHRydWUgJiYgYWRkRXZ0KGN0eCwgJ21haW4nLCBbXG4gICAgICAgICAgWyBlbCwgJ3RvdWNoc3RhcnQnLCAndG91Y2hTdGFydCcsIGBwYXNzaXZlJHsgbW9kaWZpZXJzLmNhcHR1cmUgPT09IHRydWUgPyAnQ2FwdHVyZScgOiAnJyB9YCBdLFxuICAgICAgICAgIFsgZWwsICd0b3VjaG1vdmUnLCAnbm9vcCcsICdub3RQYXNzaXZlQ2FwdHVyZScgXSAvLyBjYW5ub3QgYmUgcGFzc2l2ZSAoZXg6IGlPUyBzY3JvbGwpXG4gICAgICAgIF0pXG4gICAgICB9LFxuXG4gICAgICB1cGRhdGVkIChlbCwgYmluZGluZ3MpIHtcbiAgICAgICAgY29uc3QgY3R4ID0gZWwuX19xdG91Y2hzd2lwZVxuXG4gICAgICAgIGlmIChjdHggIT09IHZvaWQgMCkge1xuICAgICAgICAgIGlmIChiaW5kaW5ncy5vbGRWYWx1ZSAhPT0gYmluZGluZ3MudmFsdWUpIHtcbiAgICAgICAgICAgIHR5cGVvZiBiaW5kaW5ncy52YWx1ZSAhPT0gJ2Z1bmN0aW9uJyAmJiBjdHguZW5kKClcbiAgICAgICAgICAgIGN0eC5oYW5kbGVyID0gYmluZGluZ3MudmFsdWVcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjdHguZGlyZWN0aW9uID0gZ2V0TW9kaWZpZXJEaXJlY3Rpb25zKGJpbmRpbmdzLm1vZGlmaWVycylcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgYmVmb3JlVW5tb3VudCAoZWwpIHtcbiAgICAgICAgY29uc3QgY3R4ID0gZWwuX19xdG91Y2hzd2lwZVxuXG4gICAgICAgIGlmIChjdHggIT09IHZvaWQgMCkge1xuICAgICAgICAgIGNsZWFuRXZ0KGN0eCwgJ21haW4nKVxuICAgICAgICAgIGNsZWFuRXZ0KGN0eCwgJ3RlbXAnKVxuXG4gICAgICAgICAgY2xpZW50LmlzLmZpcmVmb3ggPT09IHRydWUgJiYgcHJldmVudERyYWdnYWJsZShlbCwgZmFsc2UpXG4gICAgICAgICAgY3R4LnN0eWxlQ2xlYW51cD8uKClcblxuICAgICAgICAgIGRlbGV0ZSBlbC5fX3F0b3VjaHN3aXBlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4pXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIGxldCBjYWNoZSA9IE9iamVjdC5jcmVhdGUobnVsbClcblxuICByZXR1cm4ge1xuICAgIGdldENhY2hlOiBfX1FVQVNBUl9TU1JfU0VSVkVSX19cbiAgICAgID8gKF8sIGRlZmF1bHRWYWx1ZSkgPT4gKFxuICAgICAgICAgIHR5cGVvZiBkZWZhdWx0VmFsdWUgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICAgID8gZGVmYXVsdFZhbHVlKClcbiAgICAgICAgICAgIDogZGVmYXVsdFZhbHVlXG4gICAgICAgIClcbiAgICAgIDogKGtleSwgZGVmYXVsdFZhbHVlKSA9PiAoXG4gICAgICAgICAgY2FjaGVbIGtleSBdID09PSB2b2lkIDBcbiAgICAgICAgICAgID8gKFxuICAgICAgICAgICAgICAgIGNhY2hlWyBrZXkgXSA9IChcbiAgICAgICAgICAgICAgICAgIHR5cGVvZiBkZWZhdWx0VmFsdWUgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICAgICAgICAgICAgPyBkZWZhdWx0VmFsdWUoKVxuICAgICAgICAgICAgICAgICAgICA6IGRlZmF1bHRWYWx1ZVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgOiBjYWNoZVsga2V5IF1cbiAgICAgICAgKSxcblxuICAgIHNldENhY2hlIChrZXksIG9iaikge1xuICAgICAgY2FjaGVbIGtleSBdID0gb2JqXG4gICAgfSxcblxuICAgIGhhc0NhY2hlIChrZXkpIHtcbiAgICAgIHJldHVybiBPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChjYWNoZSwga2V5KVxuICAgIH0sXG5cbiAgICBjbGVhckNhY2hlIChrZXkpIHtcbiAgICAgIGlmIChrZXkgIT09IHZvaWQgMCkge1xuICAgICAgICBkZWxldGUgY2FjaGVbIGtleSBdXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY2FjaGUgPSBPYmplY3QuY3JlYXRlKG51bGwpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCB3YXRjaCwgZ2V0Q3VycmVudEluc3RhbmNlLCBUcmFuc2l0aW9uLCBLZWVwQWxpdmUgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBUb3VjaFN3aXBlIGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvdG91Y2gtc3dpcGUvVG91Y2hTd2lwZS5qcydcblxuaW1wb3J0IHVzZVJlbmRlckNhY2hlIGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3VzZS1yZW5kZXItY2FjaGUvdXNlLXJlbmRlci1jYWNoZS5qcydcbmltcG9ydCB1c2VUaW1lb3V0IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3VzZS10aW1lb3V0L3VzZS10aW1lb3V0LmpzJ1xuXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcbmltcG9ydCB7IGdldE5vcm1hbGl6ZWRWTm9kZXMgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnZtL3ZtLmpzJ1xuXG5leHBvcnQgY29uc3QgdXNlUGFuZWxDaGlsZFByb3BzID0ge1xuICBuYW1lOiB7IHJlcXVpcmVkOiB0cnVlIH0sXG4gIGRpc2FibGU6IEJvb2xlYW5cbn1cblxuY29uc3QgUGFuZWxXcmFwcGVyID0ge1xuICBzZXR1cCAoXywgeyBzbG90cyB9KSB7XG4gICAgcmV0dXJuICgpID0+IGgoJ2RpdicsIHtcbiAgICAgIGNsYXNzOiAncS1wYW5lbCBzY3JvbGwnLFxuICAgICAgcm9sZTogJ3RhYnBhbmVsJ1xuICAgIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCB1c2VQYW5lbFByb3BzID0ge1xuICBtb2RlbFZhbHVlOiB7XG4gICAgcmVxdWlyZWQ6IHRydWVcbiAgfSxcblxuICBhbmltYXRlZDogQm9vbGVhbixcbiAgaW5maW5pdGU6IEJvb2xlYW4sXG4gIHN3aXBlYWJsZTogQm9vbGVhbixcbiAgdmVydGljYWw6IEJvb2xlYW4sXG5cbiAgdHJhbnNpdGlvblByZXY6IFN0cmluZyxcbiAgdHJhbnNpdGlvbk5leHQ6IFN0cmluZyxcbiAgdHJhbnNpdGlvbkR1cmF0aW9uOiB7XG4gICAgdHlwZTogWyBTdHJpbmcsIE51bWJlciBdLFxuICAgIGRlZmF1bHQ6IDMwMFxuICB9LFxuXG4gIGtlZXBBbGl2ZTogQm9vbGVhbixcbiAga2VlcEFsaXZlSW5jbHVkZTogWyBTdHJpbmcsIEFycmF5LCBSZWdFeHAgXSxcbiAga2VlcEFsaXZlRXhjbHVkZTogWyBTdHJpbmcsIEFycmF5LCBSZWdFeHAgXSxcbiAga2VlcEFsaXZlTWF4OiBOdW1iZXJcbn1cblxuZXhwb3J0IGNvbnN0IHVzZVBhbmVsRW1pdHMgPSBbICd1cGRhdGU6bW9kZWxWYWx1ZScsICdiZWZvcmVUcmFuc2l0aW9uJywgJ3RyYW5zaXRpb24nIF1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICBjb25zdCB7IHByb3BzLCBlbWl0LCBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgY29uc3QgeyBnZXRDYWNoZSB9ID0gdXNlUmVuZGVyQ2FjaGUoKVxuICBjb25zdCB7IHJlZ2lzdGVyVGltZW91dCB9ID0gdXNlVGltZW91dCgpXG5cbiAgbGV0IHBhbmVscywgZm9yY2VkUGFuZWxUcmFuc2l0aW9uXG5cbiAgY29uc3QgcGFuZWxUcmFuc2l0aW9uID0gcmVmKG51bGwpXG5cbiAgLypcbiAgICogU2hvdWxkIG5vdCBiZSByZWFjdGl2ZSBiZWNhdXNlIGl0J3MgYXNzaWduZWQgb24gcmVuZGVyXG4gICAqIGFuZCBpdCB3aWxsIHRyaWdnZXIgYSBzdWJzZXF1ZW50IHVzZWxlc3MgcmVuZGVyLlxuICAgKlxuICAgKiBTaG91bGQgYmUgYW4gb2JqZWN0IHRob3VnaCwgYmVjYXVzZSBpdCBpcyBiZWluZyBleHBvcnRlZC5cbiAgICogT3RoZXJ3aXNlLCB0aGUgY3VycmVudCB2YWx1ZSB3b3VsZCBiZSBleHBvcnRlZCBhbmQgbm8gc3Vic2VxdWVudFxuICAgKiB1cGRhdGVzIHdpbGwgYmUgcmVmbGVjdGVkIGluIHRoZSBleHBvcnRlZCB2YWx1ZS5cbiAgICovXG4gIGNvbnN0IHBhbmVsSW5kZXggPSB7IHZhbHVlOiBudWxsIH1cblxuICBmdW5jdGlvbiBvblN3aXBlIChldnQpIHtcbiAgICBjb25zdCBkaXIgPSBwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZSA/ICd1cCcgOiAnbGVmdCdcbiAgICBnb1RvUGFuZWxCeU9mZnNldCgocHJveHkuJHEubGFuZy5ydGwgPT09IHRydWUgPyAtMSA6IDEpICogKGV2dC5kaXJlY3Rpb24gPT09IGRpciA/IDEgOiAtMSkpXG4gIH1cblxuICBjb25zdCBwYW5lbERpcmVjdGl2ZXMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgLy8gaWYgcHJvcHMuc3dpcGVhYmxlXG4gICAgcmV0dXJuIFsgW1xuICAgICAgVG91Y2hTd2lwZSxcbiAgICAgIG9uU3dpcGUsXG4gICAgICB2b2lkIDAsXG4gICAgICB7XG4gICAgICAgIGhvcml6b250YWw6IHByb3BzLnZlcnRpY2FsICE9PSB0cnVlLFxuICAgICAgICB2ZXJ0aWNhbDogcHJvcHMudmVydGljYWwsXG4gICAgICAgIG1vdXNlOiB0cnVlXG4gICAgICB9XG4gICAgXSBdXG4gIH0pXG5cbiAgY29uc3QgdHJhbnNpdGlvblByZXYgPSBjb21wdXRlZCgoKSA9PlxuICAgIHByb3BzLnRyYW5zaXRpb25QcmV2IHx8IGBzbGlkZS0keyBwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZSA/ICdkb3duJyA6ICdyaWdodCcgfWBcbiAgKVxuXG4gIGNvbnN0IHRyYW5zaXRpb25OZXh0ID0gY29tcHV0ZWQoKCkgPT5cbiAgICBwcm9wcy50cmFuc2l0aW9uTmV4dCB8fCBgc2xpZGUtJHsgcHJvcHMudmVydGljYWwgPT09IHRydWUgPyAndXAnIDogJ2xlZnQnIH1gXG4gIClcblxuICBjb25zdCB0cmFuc2l0aW9uU3R5bGUgPSBjb21wdXRlZChcbiAgICAoKSA9PiBgLS1xLXRyYW5zaXRpb24tZHVyYXRpb246ICR7IHByb3BzLnRyYW5zaXRpb25EdXJhdGlvbiB9bXNgXG4gIClcblxuICBjb25zdCBjb250ZW50S2V5ID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgIHR5cGVvZiBwcm9wcy5tb2RlbFZhbHVlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgcHJvcHMubW9kZWxWYWx1ZSA9PT0gJ251bWJlcidcbiAgICAgID8gcHJvcHMubW9kZWxWYWx1ZVxuICAgICAgOiBTdHJpbmcocHJvcHMubW9kZWxWYWx1ZSlcbiAgKSlcblxuICBjb25zdCBrZWVwQWxpdmVQcm9wcyA9IGNvbXB1dGVkKCgpID0+ICh7XG4gICAgaW5jbHVkZTogcHJvcHMua2VlcEFsaXZlSW5jbHVkZSxcbiAgICBleGNsdWRlOiBwcm9wcy5rZWVwQWxpdmVFeGNsdWRlLFxuICAgIG1heDogcHJvcHMua2VlcEFsaXZlTWF4XG4gIH0pKVxuXG4gIGNvbnN0IG5lZWRzVW5pcXVlS2VlcEFsaXZlV3JhcHBlciA9IGNvbXB1dGVkKCgpID0+XG4gICAgcHJvcHMua2VlcEFsaXZlSW5jbHVkZSAhPT0gdm9pZCAwXG4gICAgfHwgcHJvcHMua2VlcEFsaXZlRXhjbHVkZSAhPT0gdm9pZCAwXG4gIClcblxuICB3YXRjaCgoKSA9PiBwcm9wcy5tb2RlbFZhbHVlLCAobmV3VmFsLCBvbGRWYWwpID0+IHtcbiAgICBjb25zdCBpbmRleCA9IGlzVmFsaWRQYW5lbE5hbWUobmV3VmFsKSA9PT0gdHJ1ZVxuICAgICAgPyBnZXRQYW5lbEluZGV4KG5ld1ZhbClcbiAgICAgIDogLTFcblxuICAgIGlmIChmb3JjZWRQYW5lbFRyYW5zaXRpb24gIT09IHRydWUpIHtcbiAgICAgIHVwZGF0ZVBhbmVsVHJhbnNpdGlvbihcbiAgICAgICAgaW5kZXggPT09IC0xID8gMCA6IChpbmRleCA8IGdldFBhbmVsSW5kZXgob2xkVmFsKSA/IC0xIDogMSlcbiAgICAgIClcbiAgICB9XG5cbiAgICBpZiAocGFuZWxJbmRleC52YWx1ZSAhPT0gaW5kZXgpIHtcbiAgICAgIHBhbmVsSW5kZXgudmFsdWUgPSBpbmRleFxuICAgICAgZW1pdCgnYmVmb3JlVHJhbnNpdGlvbicsIG5ld1ZhbCwgb2xkVmFsKVxuICAgICAgcmVnaXN0ZXJUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgZW1pdCgndHJhbnNpdGlvbicsIG5ld1ZhbCwgb2xkVmFsKVxuICAgICAgfSwgcHJvcHMudHJhbnNpdGlvbkR1cmF0aW9uKVxuICAgIH1cbiAgfSlcblxuICBmdW5jdGlvbiBuZXh0UGFuZWwgKCkgeyBnb1RvUGFuZWxCeU9mZnNldCgxKSB9XG4gIGZ1bmN0aW9uIHByZXZpb3VzUGFuZWwgKCkgeyBnb1RvUGFuZWxCeU9mZnNldCgtMSkgfVxuXG4gIGZ1bmN0aW9uIGdvVG9QYW5lbCAobmFtZSkge1xuICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgbmFtZSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzVmFsaWRQYW5lbE5hbWUgKG5hbWUpIHtcbiAgICByZXR1cm4gbmFtZSAhPT0gdm9pZCAwICYmIG5hbWUgIT09IG51bGwgJiYgbmFtZSAhPT0gJydcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFBhbmVsSW5kZXggKG5hbWUpIHtcbiAgICByZXR1cm4gcGFuZWxzLmZpbmRJbmRleChwYW5lbCA9PiB7XG4gICAgICByZXR1cm4gcGFuZWwucHJvcHMubmFtZSA9PT0gbmFtZVxuICAgICAgICAmJiBwYW5lbC5wcm9wcy5kaXNhYmxlICE9PSAnJ1xuICAgICAgICAmJiBwYW5lbC5wcm9wcy5kaXNhYmxlICE9PSB0cnVlXG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEVuYWJsZWRQYW5lbHMgKCkge1xuICAgIHJldHVybiBwYW5lbHMuZmlsdGVyKHBhbmVsID0+IHtcbiAgICAgIHJldHVybiBwYW5lbC5wcm9wcy5kaXNhYmxlICE9PSAnJ1xuICAgICAgICAmJiBwYW5lbC5wcm9wcy5kaXNhYmxlICE9PSB0cnVlXG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVBhbmVsVHJhbnNpdGlvbiAoZGlyZWN0aW9uKSB7XG4gICAgY29uc3QgdmFsID0gZGlyZWN0aW9uICE9PSAwICYmIHByb3BzLmFuaW1hdGVkID09PSB0cnVlICYmIHBhbmVsSW5kZXgudmFsdWUgIT09IC0xXG4gICAgICA/ICdxLXRyYW5zaXRpb24tLScgKyAoZGlyZWN0aW9uID09PSAtMSA/IHRyYW5zaXRpb25QcmV2LnZhbHVlIDogdHJhbnNpdGlvbk5leHQudmFsdWUpXG4gICAgICA6IG51bGxcblxuICAgIGlmIChwYW5lbFRyYW5zaXRpb24udmFsdWUgIT09IHZhbCkge1xuICAgICAgcGFuZWxUcmFuc2l0aW9uLnZhbHVlID0gdmFsXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ29Ub1BhbmVsQnlPZmZzZXQgKGRpcmVjdGlvbiwgc3RhcnRJbmRleCA9IHBhbmVsSW5kZXgudmFsdWUpIHtcbiAgICBsZXQgaW5kZXggPSBzdGFydEluZGV4ICsgZGlyZWN0aW9uXG5cbiAgICB3aGlsZSAoaW5kZXggIT09IC0xICYmIGluZGV4IDwgcGFuZWxzLmxlbmd0aCkge1xuICAgICAgY29uc3Qgb3B0ID0gcGFuZWxzWyBpbmRleCBdXG5cbiAgICAgIGlmIChcbiAgICAgICAgb3B0ICE9PSB2b2lkIDBcbiAgICAgICAgJiYgb3B0LnByb3BzLmRpc2FibGUgIT09ICcnXG4gICAgICAgICYmIG9wdC5wcm9wcy5kaXNhYmxlICE9PSB0cnVlXG4gICAgICApIHtcbiAgICAgICAgdXBkYXRlUGFuZWxUcmFuc2l0aW9uKGRpcmVjdGlvbilcbiAgICAgICAgZm9yY2VkUGFuZWxUcmFuc2l0aW9uID0gdHJ1ZVxuICAgICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIG9wdC5wcm9wcy5uYW1lKVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBmb3JjZWRQYW5lbFRyYW5zaXRpb24gPSBmYWxzZVxuICAgICAgICB9KVxuXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpbmRleCArPSBkaXJlY3Rpb25cbiAgICB9XG5cbiAgICBpZiAocHJvcHMuaW5maW5pdGUgPT09IHRydWUgJiYgcGFuZWxzLmxlbmd0aCAhPT0gMCAmJiBzdGFydEluZGV4ICE9PSAtMSAmJiBzdGFydEluZGV4ICE9PSBwYW5lbHMubGVuZ3RoKSB7XG4gICAgICBnb1RvUGFuZWxCeU9mZnNldChkaXJlY3Rpb24sIGRpcmVjdGlvbiA9PT0gLTEgPyBwYW5lbHMubGVuZ3RoIDogLTEpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlUGFuZWxJbmRleCAoKSB7XG4gICAgY29uc3QgaW5kZXggPSBnZXRQYW5lbEluZGV4KHByb3BzLm1vZGVsVmFsdWUpXG5cbiAgICBpZiAocGFuZWxJbmRleC52YWx1ZSAhPT0gaW5kZXgpIHtcbiAgICAgIHBhbmVsSW5kZXgudmFsdWUgPSBpbmRleFxuICAgIH1cblxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBmdW5jdGlvbiBnZXRQYW5lbENvbnRlbnRDaGlsZCAoKSB7XG4gICAgY29uc3QgcGFuZWwgPSBpc1ZhbGlkUGFuZWxOYW1lKHByb3BzLm1vZGVsVmFsdWUpID09PSB0cnVlXG4gICAgICAmJiB1cGRhdGVQYW5lbEluZGV4KClcbiAgICAgICYmIHBhbmVsc1sgcGFuZWxJbmRleC52YWx1ZSBdXG5cbiAgICByZXR1cm4gcHJvcHMua2VlcEFsaXZlID09PSB0cnVlXG4gICAgICA/IFtcbiAgICAgICAgICBoKEtlZXBBbGl2ZSwga2VlcEFsaXZlUHJvcHMudmFsdWUsIFtcbiAgICAgICAgICAgIGgoXG4gICAgICAgICAgICAgIG5lZWRzVW5pcXVlS2VlcEFsaXZlV3JhcHBlci52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAgID8gZ2V0Q2FjaGUoY29udGVudEtleS52YWx1ZSwgKCkgPT4gKHsgLi4uUGFuZWxXcmFwcGVyLCBuYW1lOiBjb250ZW50S2V5LnZhbHVlIH0pKVxuICAgICAgICAgICAgICAgIDogUGFuZWxXcmFwcGVyLFxuICAgICAgICAgICAgICB7IGtleTogY29udGVudEtleS52YWx1ZSwgc3R5bGU6IHRyYW5zaXRpb25TdHlsZS52YWx1ZSB9LFxuICAgICAgICAgICAgICAoKSA9PiBwYW5lbFxuICAgICAgICAgICAgKVxuICAgICAgICAgIF0pXG4gICAgICAgIF1cbiAgICAgIDogW1xuICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgIGNsYXNzOiAncS1wYW5lbCBzY3JvbGwnLFxuICAgICAgICAgICAgc3R5bGU6IHRyYW5zaXRpb25TdHlsZS52YWx1ZSxcbiAgICAgICAgICAgIGtleTogY29udGVudEtleS52YWx1ZSxcbiAgICAgICAgICAgIHJvbGU6ICd0YWJwYW5lbCdcbiAgICAgICAgICB9LCBbIHBhbmVsIF0pXG4gICAgICAgIF1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFBhbmVsQ29udGVudCAoKSB7XG4gICAgaWYgKHBhbmVscy5sZW5ndGggPT09IDApIHJldHVyblxuXG4gICAgcmV0dXJuIHByb3BzLmFuaW1hdGVkID09PSB0cnVlXG4gICAgICA/IFsgaChUcmFuc2l0aW9uLCB7IG5hbWU6IHBhbmVsVHJhbnNpdGlvbi52YWx1ZSB9LCBnZXRQYW5lbENvbnRlbnRDaGlsZCkgXVxuICAgICAgOiBnZXRQYW5lbENvbnRlbnRDaGlsZCgpXG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVQYW5lbHNMaXN0IChzbG90cykge1xuICAgIHBhbmVscyA9IGdldE5vcm1hbGl6ZWRWTm9kZXMoXG4gICAgICBoU2xvdChzbG90cy5kZWZhdWx0LCBbXSlcbiAgICApLmZpbHRlcihcbiAgICAgIHBhbmVsID0+IHBhbmVsLnByb3BzICE9PSBudWxsXG4gICAgICAgICYmIHBhbmVsLnByb3BzLnNsb3QgPT09IHZvaWQgMFxuICAgICAgICAmJiBpc1ZhbGlkUGFuZWxOYW1lKHBhbmVsLnByb3BzLm5hbWUpID09PSB0cnVlXG4gICAgKVxuXG4gICAgcmV0dXJuIHBhbmVscy5sZW5ndGhcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFBhbmVscyAoKSB7XG4gICAgcmV0dXJuIHBhbmVsc1xuICB9XG5cbiAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gIE9iamVjdC5hc3NpZ24ocHJveHksIHtcbiAgICBuZXh0OiBuZXh0UGFuZWwsXG4gICAgcHJldmlvdXM6IHByZXZpb3VzUGFuZWwsXG4gICAgZ29UbzogZ29Ub1BhbmVsXG4gIH0pXG5cbiAgcmV0dXJuIHtcbiAgICBwYW5lbEluZGV4LFxuICAgIHBhbmVsRGlyZWN0aXZlcyxcblxuICAgIHVwZGF0ZVBhbmVsc0xpc3QsXG4gICAgdXBkYXRlUGFuZWxJbmRleCxcblxuICAgIGdldFBhbmVsQ29udGVudCxcbiAgICBnZXRFbmFibGVkUGFuZWxzLFxuICAgIGdldFBhbmVscyxcblxuICAgIGlzVmFsaWRQYW5lbE5hbWUsXG5cbiAgICBrZWVwQWxpdmVQcm9wcyxcbiAgICBuZWVkc1VuaXF1ZUtlZXBBbGl2ZVdyYXBwZXIsXG5cbiAgICBnb1RvUGFuZWxCeU9mZnNldCxcbiAgICBnb1RvUGFuZWwsXG5cbiAgICBuZXh0UGFuZWwsXG4gICAgcHJldmlvdXNQYW5lbFxuICB9XG59XG4iLCJpbXBvcnQgeyBoIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyB1c2VQYW5lbENoaWxkUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1wYW5lbC91c2UtcGFuZWwuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5yZW5kZXIvcmVuZGVyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVRhYlBhbmVsJyxcblxuICBwcm9wczogdXNlUGFuZWxDaGlsZFByb3BzLFxuXG4gIHNldHVwIChfLCB7IHNsb3RzIH0pIHtcbiAgICByZXR1cm4gKCkgPT4gaCgnZGl2JywgeyBjbGFzczogJ3EtdGFiLXBhbmVsJywgcm9sZTogJ3RhYnBhbmVsJyB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIGNvbXB1dGVkLCBpbmplY3QgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRSWNvbiBmcm9tICcuLi9pY29uL1FJY29uLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoU2xvdCwgaFVuaXF1ZVNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5pbXBvcnQgeyB0aW1lbGluZUtleSwgZW1wdHlSZW5kZXJGbiB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuc3ltYm9scy9zeW1ib2xzLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVRpbWVsaW5lRW50cnknLFxuXG4gIHByb3BzOiB7XG4gICAgaGVhZGluZzogQm9vbGVhbixcbiAgICB0YWc6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdoMydcbiAgICB9LFxuICAgIHNpZGU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdyaWdodCcsXG4gICAgICB2YWxpZGF0b3I6IHYgPT4gWyAnbGVmdCcsICdyaWdodCcgXS5pbmNsdWRlcyh2KVxuICAgIH0sXG5cbiAgICBpY29uOiBTdHJpbmcsXG4gICAgYXZhdGFyOiBTdHJpbmcsXG5cbiAgICBjb2xvcjogU3RyaW5nLFxuXG4gICAgdGl0bGU6IFN0cmluZyxcbiAgICBzdWJ0aXRsZTogU3RyaW5nLFxuICAgIGJvZHk6IFN0cmluZ1xuICB9LFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cyB9KSB7XG4gICAgY29uc3QgJHRpbWVsaW5lID0gaW5qZWN0KHRpbWVsaW5lS2V5LCBlbXB0eVJlbmRlckZuKVxuICAgIGlmICgkdGltZWxpbmUgPT09IGVtcHR5UmVuZGVyRm4pIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1FUaW1lbGluZUVudHJ5IG5lZWRzIHRvIGJlIGNoaWxkIG9mIFFUaW1lbGluZScpXG4gICAgICByZXR1cm4gZW1wdHlSZW5kZXJGblxuICAgIH1cblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgYHEtdGltZWxpbmVfX2VudHJ5IHEtdGltZWxpbmVfX2VudHJ5LS0keyBwcm9wcy5zaWRlIH1gXG4gICAgICArIChwcm9wcy5pY29uICE9PSB2b2lkIDAgfHwgcHJvcHMuYXZhdGFyICE9PSB2b2lkIDAgPyAnIHEtdGltZWxpbmVfX2VudHJ5LS1pY29uJyA6ICcnKVxuICAgIClcblxuICAgIGNvbnN0IGRvdENsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIGBxLXRpbWVsaW5lX19kb3QgdGV4dC0keyBwcm9wcy5jb2xvciB8fCAkdGltZWxpbmUuY29sb3IgfWBcbiAgICApXG5cbiAgICBjb25zdCByZXZlcnNlID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICR0aW1lbGluZS5sYXlvdXQgPT09ICdjb21mb3J0YWJsZScgJiYgJHRpbWVsaW5lLnNpZGUgPT09ICdsZWZ0J1xuICAgIClcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjb25zdCBjaGlsZCA9IGhVbmlxdWVTbG90KHNsb3RzLmRlZmF1bHQsIFtdKVxuXG4gICAgICBpZiAocHJvcHMuYm9keSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGNoaWxkLnVuc2hpZnQocHJvcHMuYm9keSlcbiAgICAgIH1cblxuICAgICAgaWYgKHByb3BzLmhlYWRpbmcgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgY29udGVudCA9IFtcbiAgICAgICAgICBoKCdkaXYnKSxcbiAgICAgICAgICBoKCdkaXYnKSxcbiAgICAgICAgICBoKFxuICAgICAgICAgICAgcHJvcHMudGFnLFxuICAgICAgICAgICAgeyBjbGFzczogJ3EtdGltZWxpbmVfX2hlYWRpbmctdGl0bGUnIH0sXG4gICAgICAgICAgICBjaGlsZFxuICAgICAgICAgIClcbiAgICAgICAgXVxuXG4gICAgICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLXRpbWVsaW5lX19oZWFkaW5nJ1xuICAgICAgICB9LCByZXZlcnNlLnZhbHVlID09PSB0cnVlID8gY29udGVudC5yZXZlcnNlKCkgOiBjb250ZW50KVxuICAgICAgfVxuXG4gICAgICBsZXQgZG90XG5cbiAgICAgIGlmIChwcm9wcy5pY29uICE9PSB2b2lkIDApIHtcbiAgICAgICAgZG90ID0gW1xuICAgICAgICAgIGgoUUljb24sIHtcbiAgICAgICAgICAgIGNsYXNzOiAncm93IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlcicsXG4gICAgICAgICAgICBuYW1lOiBwcm9wcy5pY29uXG4gICAgICAgICAgfSlcbiAgICAgICAgXVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAocHJvcHMuYXZhdGFyICE9PSB2b2lkIDApIHtcbiAgICAgICAgZG90ID0gW1xuICAgICAgICAgIGgoJ2ltZycsIHtcbiAgICAgICAgICAgIGNsYXNzOiAncS10aW1lbGluZV9fZG90LWltZycsXG4gICAgICAgICAgICBzcmM6IHByb3BzLmF2YXRhclxuICAgICAgICAgIH0pXG4gICAgICAgIF1cbiAgICAgIH1cblxuICAgICAgY29uc3QgY29udGVudCA9IFtcbiAgICAgICAgaCgnZGl2JywgeyBjbGFzczogJ3EtdGltZWxpbmVfX3N1YnRpdGxlJyB9LCBbXG4gICAgICAgICAgaCgnc3BhbicsIHt9LCBoU2xvdChzbG90cy5zdWJ0aXRsZSwgWyBwcm9wcy5zdWJ0aXRsZSBdKSlcbiAgICAgICAgXSksXG5cbiAgICAgICAgaCgnZGl2JywgeyBjbGFzczogZG90Q2xhc3MudmFsdWUgfSwgZG90KSxcblxuICAgICAgICBoKCdkaXYnLCB7IGNsYXNzOiAncS10aW1lbGluZV9fY29udGVudCcgfSwgW1xuICAgICAgICAgIGgoJ2g2JywgeyBjbGFzczogJ3EtdGltZWxpbmVfX3RpdGxlJyB9LCBoU2xvdChzbG90cy50aXRsZSwgWyBwcm9wcy50aXRsZSBdKSlcbiAgICAgICAgXS5jb25jYXQoY2hpbGQpKVxuICAgICAgXVxuXG4gICAgICByZXR1cm4gaCgnbGknLCB7XG4gICAgICAgIGNsYXNzOiBjbGFzc2VzLnZhbHVlXG4gICAgICB9LCByZXZlcnNlLnZhbHVlID09PSB0cnVlID8gY29udGVudC5yZXZlcnNlKCkgOiBjb250ZW50KVxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIGNvbXB1dGVkLCBwcm92aWRlLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VEYXJrLCB7IHVzZURhcmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLWRhcmsvdXNlLWRhcmsuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5yZW5kZXIvcmVuZGVyLmpzJ1xuaW1wb3J0IHsgdGltZWxpbmVLZXkgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnN5bWJvbHMvc3ltYm9scy5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FUaW1lbGluZScsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VEYXJrUHJvcHMsXG5cbiAgICBjb2xvcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ3ByaW1hcnknXG4gICAgfSxcbiAgICBzaWRlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAncmlnaHQnLFxuICAgICAgdmFsaWRhdG9yOiB2ID0+IFsgJ2xlZnQnLCAncmlnaHQnIF0uaW5jbHVkZXModilcbiAgICB9LFxuICAgIGxheW91dDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2RlbnNlJyxcbiAgICAgIHZhbGlkYXRvcjogdiA9PiBbICdkZW5zZScsICdjb21mb3J0YWJsZScsICdsb29zZScgXS5pbmNsdWRlcyh2KVxuICAgIH1cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCBpc0RhcmsgPSB1c2VEYXJrKHByb3BzLCB2bS5wcm94eS4kcSlcblxuICAgIHByb3ZpZGUodGltZWxpbmVLZXksIHByb3BzKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBgcS10aW1lbGluZSBxLXRpbWVsaW5lLS0keyBwcm9wcy5sYXlvdXQgfSBxLXRpbWVsaW5lLS0keyBwcm9wcy5sYXlvdXQgfS0tJHsgcHJvcHMuc2lkZSB9YFxuICAgICAgKyAoaXNEYXJrLnZhbHVlID09PSB0cnVlID8gJyBxLXRpbWVsaW5lLS1kYXJrJyA6ICcnKVxuICAgIClcblxuICAgIHJldHVybiAoKSA9PiBoKCd1bCcsIHsgY2xhc3M6IGNsYXNzZXMudmFsdWUgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBjb21wdXRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlRGFyaywgeyB1c2VEYXJrUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1kYXJrL3VzZS1kYXJrLmpzJ1xuaW1wb3J0IHVzZVBhbmVsLCB7IHVzZVBhbmVsUHJvcHMsIHVzZVBhbmVsRW1pdHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1wYW5lbC91c2UtcGFuZWwuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhEaXIgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRVGFiUGFuZWxzJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZVBhbmVsUHJvcHMsXG4gICAgLi4udXNlRGFya1Byb3BzXG4gIH0sXG5cbiAgZW1pdHM6IHVzZVBhbmVsRW1pdHMsXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCB2bSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgdm0ucHJveHkuJHEpXG5cbiAgICBjb25zdCB7IHVwZGF0ZVBhbmVsc0xpc3QsIGdldFBhbmVsQ29udGVudCwgcGFuZWxEaXJlY3RpdmVzIH0gPSB1c2VQYW5lbCgpXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLXRhYi1wYW5lbHMgcS1wYW5lbC1wYXJlbnQnXG4gICAgICArIChpc0RhcmsudmFsdWUgPT09IHRydWUgPyAnIHEtdGFiLXBhbmVscy0tZGFyayBxLWRhcmsnIDogJycpXG4gICAgKVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHVwZGF0ZVBhbmVsc0xpc3Qoc2xvdHMpXG5cbiAgICAgIHJldHVybiBoRGlyKFxuICAgICAgICAnZGl2JyxcbiAgICAgICAgeyBjbGFzczogY2xhc3Nlcy52YWx1ZSB9LFxuICAgICAgICBnZXRQYW5lbENvbnRlbnQoKSxcbiAgICAgICAgJ3BhbicsXG4gICAgICAgIHByb3BzLnN3aXBlYWJsZSxcbiAgICAgICAgKCkgPT4gcGFuZWxEaXJlY3RpdmVzLnZhbHVlXG4gICAgICApXG4gICAgfVxuICB9XG59KVxuIiwiPHRlbXBsYXRlPlxuICA8cS1kaWFsb2dcbiAgICB2LW1vZGVsPVwic2NoZWR1bGVTdG9yZS5kaWFsb2dPcGVuXCJcbiAgICBAaGlkZT1cInNjaGVkdWxlU3RvcmUuY2xlYXJTZWxlY3Rpb25cIlxuICAgIDptYXhpbWl6ZWQ9XCIkcS5zY3JlZW4ubHQuc21cIlxuICAgIHRyYW5zaXRpb24tc2hvdz1cInNsaWRlLXVwXCJcbiAgICB0cmFuc2l0aW9uLWhpZGU9XCJzbGlkZS1kb3duXCJcbiAgPlxuICAgIDxxLWNhcmQgdi1pZj1cInpvbmVcIiBjbGFzcz1cInpvbmUtZGV0YWlscy1kaWFsb2dcIiBzdHlsZT1cIndpZHRoOiA3MDBweDsgbWF4LXdpZHRoOiA5MHZ3XCI+XG4gICAgICA8IS0tIEhlYWRlciAtLT5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInJvdyBpdGVtcy1jZW50ZXIgcS1wYi1ub25lXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2xcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNSB0ZXh0LXdlaWdodC1tZWRpdW1cIj57eyB6b25lLm5hbWUgfX08L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1zdWJ0aXRsZTIgdGV4dC1ncmV5XCI+Wm9uZSAje3sgem9uZS5pZCB9fSDigKIge3sgem9uZS5zY2hlZHVsZWREYXkgfX08L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1hdXRvIHEtZ3V0dGVyLXNtXCI+XG4gICAgICAgICAgPCEtLSBTdGF0dXMgdG9nZ2xlIC0tPlxuICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgOmljb249XCJ6b25lLmNvbXBsZXRlZCA/ICdjaGVja19jaXJjbGUnIDogJ3JhZGlvX2J1dHRvbl91bmNoZWNrZWQnXCJcbiAgICAgICAgICAgIDpjb2xvcj1cInpvbmUuY29tcGxldGVkID8gJ3Bvc2l0aXZlJyA6ICdncmV5J1wiXG4gICAgICAgICAgICA6bGFiZWw9XCJ6b25lLmNvbXBsZXRlZCA/ICdDb21wbGV0ZWQnIDogJ01hcmsgQ29tcGxldGUnXCJcbiAgICAgICAgICAgIEBjbGljaz1cInRvZ2dsZVN0YXR1c1wiXG4gICAgICAgICAgICA6bG9hZGluZz1cInVwZGF0aW5nXCJcbiAgICAgICAgICAvPlxuXG4gICAgICAgICAgPCEtLSBDbG9zZSBidXR0b24gLS0+XG4gICAgICAgICAgPHEtYnRuIGZsYXQgcm91bmQgZGVuc2UgaWNvbj1cImNsb3NlXCIgdi1jbG9zZS1wb3B1cCAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG5cbiAgICAgIDwhLS0gWm9uZSBJbWFnZXMgR2FsbGVyeSAtLT5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbiB2LWlmPVwiem9uZS5kZWZhdWx0SW1hZ2VzICYmIHpvbmUuZGVmYXVsdEltYWdlcy5sZW5ndGggPiAwXCIgY2xhc3M9XCJxLXB0LW5vbmVcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtc3VidGl0bGUyIHRleHQtd2VpZ2h0LW1lZGl1bSBxLW1iLXNtXCI+Wm9uZSBQaG90b3M8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImltYWdlLWdhbGxlcnlcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IHEtZ3V0dGVyLXNtXCI+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIHYtZm9yPVwiKGltYWdlLCBpbmRleCkgaW4gem9uZS5kZWZhdWx0SW1hZ2VzXCJcbiAgICAgICAgICAgICAgOmtleT1cImluZGV4XCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJjb2wtMTIgY29sLXNtLTYgY29sLW1kLTRcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8cS1pbWdcbiAgICAgICAgICAgICAgICA6c3JjPVwiaW1hZ2VcIlxuICAgICAgICAgICAgICAgIDphbHQ9XCJgJHt6b25lLm5hbWV9IC0gUGhvdG8gJHtpbmRleCArIDF9YFwiXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJyb3VuZGVkLWJvcmRlcnMgY3Vyc29yLXBvaW50ZXIgem9uZS1waG90b1wiXG4gICAgICAgICAgICAgICAgc3R5bGU9XCJoZWlnaHQ6IDE1MHB4XCJcbiAgICAgICAgICAgICAgICBmaXQ9XCJjb3ZlclwiXG4gICAgICAgICAgICAgICAgQGNsaWNrPVwib3BlbkltYWdlVmlld2VyKGltYWdlKVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90OmVycm9yPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFic29sdXRlLWZ1bGwgZmxleCBmbGV4LWNlbnRlciBiZy1ncmV5LTMgdGV4dC1ncmV5XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxxLWljb24gbmFtZT1cImJyb2tlbl9pbWFnZVwiIHNpemU9XCIycmVtXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1jYXB0aW9uIHEtbXQteHNcIj5JbWFnZSBub3QgZm91bmQ8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuXG4gICAgICAgICAgICAgICAgPCEtLSBJbWFnZSBvdmVybGF5IHdpdGggaW5mbyAtLT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWJzb2x1dGUtYm90dG9tIGJnLWJsYWNrLTUgdGV4dC13aGl0ZSBxLXBhLXhzXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1jYXB0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgIHt7IGdldEltYWdlRGVzY3JpcHRpb24oaW1hZ2UsIGluZGV4KSB9fVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvcS1pbWc+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuXG4gICAgICA8IS0tIFNpbmdsZSBab25lIEltYWdlIChmYWxsYmFjaykgLS0+XG4gICAgICA8cS1jYXJkLXNlY3Rpb24gdi1lbHNlLWlmPVwiem9uZS5pbWFnZVwiIGNsYXNzPVwicS1wdC1ub25lXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXN1YnRpdGxlMiB0ZXh0LXdlaWdodC1tZWRpdW0gcS1tYi1zbVwiPlpvbmUgUGhvdG88L2Rpdj5cbiAgICAgICAgPHEtaW1nXG4gICAgICAgICAgOnNyYz1cInpvbmUuaW1hZ2VcIlxuICAgICAgICAgIDphbHQ9XCJ6b25lLm5hbWVcIlxuICAgICAgICAgIGNsYXNzPVwicm91bmRlZC1ib3JkZXJzIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICBzdHlsZT1cImhlaWdodDogMjAwcHhcIlxuICAgICAgICAgIGZpdD1cImNvdmVyXCJcbiAgICAgICAgICBAY2xpY2s9XCJvcGVuSW1hZ2VWaWV3ZXIoem9uZS5pbWFnZSlcIlxuICAgICAgICA+XG4gICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDplcnJvcj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhYnNvbHV0ZS1mdWxsIGZsZXggZmxleC1jZW50ZXIgYmctZ3JleS0zIHRleHQtZ3JleVwiPlxuICAgICAgICAgICAgICA8cS1pY29uIG5hbWU9XCJicm9rZW5faW1hZ2VcIiBzaXplPVwiM3JlbVwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICA8L3EtaW1nPlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cblxuICAgICAgPCEtLSBUYWIgTmF2aWdhdGlvbiAtLT5cbiAgICAgIDxxLXRhYnNcbiAgICAgICAgdi1tb2RlbD1cImFjdGl2ZVRhYlwiXG4gICAgICAgIGRlbnNlXG4gICAgICAgIGNsYXNzPVwidGV4dC1ncmV5XCJcbiAgICAgICAgYWN0aXZlLWNvbG9yPVwicHJpbWFyeVwiXG4gICAgICAgIGluZGljYXRvci1jb2xvcj1cInByaW1hcnlcIlxuICAgICAgICBhbGlnbj1cImp1c3RpZnlcIlxuICAgICAgICBuYXJyb3ctaW5kaWNhdG9yXG4gICAgICA+XG4gICAgICAgIDxxLXRhYiBuYW1lPVwiZGV0YWlsc1wiIGljb249XCJpbmZvXCIgbGFiZWw9XCJEZXRhaWxzXCIgLz5cbiAgICAgICAgPHEtdGFiIG5hbWU9XCJzY2hlZHVsZVwiIGljb249XCJzY2hlZHVsZVwiIGxhYmVsPVwiU2NoZWR1bGVcIiAvPlxuICAgICAgICA8cS10YWIgbmFtZT1cImVxdWlwbWVudFwiIGljb249XCJidWlsZFwiIGxhYmVsPVwiRXF1aXBtZW50XCIgLz5cbiAgICAgICAgPHEtdGFiIG5hbWU9XCJoaXN0b3J5XCIgaWNvbj1cImhpc3RvcnlcIiBsYWJlbD1cIkhpc3RvcnlcIiAvPlxuICAgICAgPC9xLXRhYnM+XG5cbiAgICAgIDxxLXNlcGFyYXRvciAvPlxuXG4gICAgICA8IS0tIFRhYiBQYW5lbHMgLS0+XG4gICAgICA8cS10YWItcGFuZWxzIHYtbW9kZWw9XCJhY3RpdmVUYWJcIiBhbmltYXRlZD5cbiAgICAgICAgPCEtLSBEZXRhaWxzIFRhYiAtLT5cbiAgICAgICAgPHEtdGFiLXBhbmVsIG5hbWU9XCJkZXRhaWxzXCIgY2xhc3M9XCJxLXBhLW1kXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInEtZ3V0dGVyLW1kXCI+XG4gICAgICAgICAgICA8IS0tIERlc2NyaXB0aW9uIC0tPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtc3VidGl0bGUyIHRleHQtd2VpZ2h0LW1lZGl1bSBxLW1iLXNtXCI+RGVzY3JpcHRpb248L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtYm9keTJcIj57eyB6b25lLmRlc2NyaXB0aW9uIH19PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPCEtLSBLZXkgSW5mb3JtYXRpb24gLS0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IHEtZ3V0dGVyLW1kXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtMTIgY29sLXNtLTZcIj5cbiAgICAgICAgICAgICAgICA8cS1saXN0IGRlbnNlPlxuICAgICAgICAgICAgICAgICAgPHEtaXRlbT5cbiAgICAgICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIGF2YXRhcj5cbiAgICAgICAgICAgICAgICAgICAgICA8cS1pY29uIG5hbWU9XCJldmVudFwiIGNvbG9yPVwicHJpbWFyeVwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsPlNjaGVkdWxlZCBEYXk8L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsIGNhcHRpb24gOmNsYXNzPVwiYHNjaGVkdWxlLSR7em9uZS5zY2hlZHVsZWREYXkudG9Mb3dlckNhc2UoKX1gXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7eyB6b25lLnNjaGVkdWxlZERheSB9fVxuICAgICAgICAgICAgICAgICAgICAgIDwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0+XG5cbiAgICAgICAgICAgICAgICAgIDxxLWl0ZW0+XG4gICAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBhdmF0YXI+XG4gICAgICAgICAgICAgICAgICAgICAgPHEtaWNvbiBuYW1lPVwiZmxhZ1wiIDpjb2xvcj1cImdldFByaW9yaXR5Q29sb3Ioem9uZS5wcmlvcml0eSlcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbD5Qcmlvcml0eTwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWwgY2FwdGlvbj57eyB6b25lLnByaW9yaXR5IH19IHByaW9yaXR5PC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICA8L3EtaXRlbT5cblxuICAgICAgICAgICAgICAgICAgPHEtaXRlbT5cbiAgICAgICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIGF2YXRhcj5cbiAgICAgICAgICAgICAgICAgICAgICA8cS1pY29uIG5hbWU9XCJzdHJhaWdodGVuXCIgY29sb3I9XCJpbmZvXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWw+QXJlYSBTaXplPC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbCBjYXB0aW9uPnt7IHpvbmUuYXJlYVNpemUgfX08L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgIDwvcS1pdGVtPlxuICAgICAgICAgICAgICAgIDwvcS1saXN0PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTEyIGNvbC1zbS02XCI+XG4gICAgICAgICAgICAgICAgPHEtbGlzdCBkZW5zZT5cbiAgICAgICAgICAgICAgICAgIDxxLWl0ZW0+XG4gICAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBhdmF0YXI+XG4gICAgICAgICAgICAgICAgICAgICAgPHEtaWNvbiBuYW1lPVwic2NoZWR1bGVcIiBjb2xvcj1cIndhcm5pbmdcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbD5Fc3RpbWF0ZWQgVGltZTwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWwgY2FwdGlvbj57eyB6b25lLmVzdGltYXRlZFRpbWUgfX0gbWludXRlczwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0+XG5cbiAgICAgICAgICAgICAgICAgIDxxLWl0ZW0+XG4gICAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBhdmF0YXI+XG4gICAgICAgICAgICAgICAgICAgICAgPHEtaWNvblxuICAgICAgICAgICAgICAgICAgICAgICAgOm5hbWU9XCJ6b25lLmNvbXBsZXRlZCA/ICdjaGVja19jaXJjbGUnIDogJ3JhZGlvX2J1dHRvbl91bmNoZWNrZWQnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIDpjb2xvcj1cInpvbmUuY29tcGxldGVkID8gJ3Bvc2l0aXZlJyA6ICdncmV5J1wiXG4gICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWw+U3RhdHVzPC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbCBjYXB0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAge3sgem9uZS5jb21wbGV0ZWQgPyAnQ29tcGxldGVkJyA6ICdJbmNvbXBsZXRlJyB9fVxuICAgICAgICAgICAgICAgICAgICAgIDwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0+XG5cbiAgICAgICAgICAgICAgICAgIDxxLWl0ZW0gdi1pZj1cInpvbmUubGFzdENvbXBsZXRlZFwiPlxuICAgICAgICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gYXZhdGFyPlxuICAgICAgICAgICAgICAgICAgICAgIDxxLWljb24gbmFtZT1cImFjY2Vzc190aW1lXCIgY29sb3I9XCJwb3NpdGl2ZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsPkxhc3QgQ29tcGxldGVkPC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbCBjYXB0aW9uPnt7IGZvcm1hdERhdGUoem9uZS5sYXN0Q29tcGxldGVkKSB9fTwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgICAgICAgPC9xLWxpc3Q+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDwhLS0gTm90ZXMgLS0+XG4gICAgICAgICAgICA8ZGl2IHYtaWY9XCJ6b25lLm5vdGVzXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXN1YnRpdGxlMiB0ZXh0LXdlaWdodC1tZWRpdW0gcS1tYi1zbVwiPlNwZWNpYWwgTm90ZXM8L2Rpdj5cbiAgICAgICAgICAgICAgPHEtY2FyZCBmbGF0IGJvcmRlcmVkIGNsYXNzPVwicS1wYS1tZCBiZy1ibHVlLTFcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1ib2R5MlwiPnt7IHpvbmUubm90ZXMgfX08L2Rpdj5cbiAgICAgICAgICAgICAgPC9xLWNhcmQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9xLXRhYi1wYW5lbD5cblxuICAgICAgICA8IS0tIFNjaGVkdWxlIFRhYiAtLT5cbiAgICAgICAgPHEtdGFiLXBhbmVsIG5hbWU9XCJzY2hlZHVsZVwiIGNsYXNzPVwicS1wYS1tZFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLWd1dHRlci1tZFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtc3VidGl0bGUxIHRleHQtd2VpZ2h0LW1lZGl1bVwiPlNjaGVkdWxlIEluZm9ybWF0aW9uPC9kaXY+XG5cbiAgICAgICAgICAgIDwhLS0gQ3VycmVudCBTY2hlZHVsZSAtLT5cbiAgICAgICAgICAgIDxxLWNhcmQgZmxhdCBib3JkZXJlZCBjbGFzcz1cInEtcGEtbWRcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBpdGVtcy1jZW50ZXIgcS1ndXR0ZXItbWRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLWF1dG9cIj5cbiAgICAgICAgICAgICAgICAgIDxxLWljb25cbiAgICAgICAgICAgICAgICAgICAgbmFtZT1cImV2ZW50XCJcbiAgICAgICAgICAgICAgICAgICAgc2l6ZT1cIjJyZW1cIlxuICAgICAgICAgICAgICAgICAgICA6Y2xhc3M9XCJgc2NoZWR1bGUtJHt6b25lLnNjaGVkdWxlZERheS50b0xvd2VyQ2FzZSgpfWBcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNlwiPnt7IHpvbmUuc2NoZWR1bGVkRGF5IH19PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1jYXB0aW9uIHRleHQtZ3JleVwiPlNjaGVkdWxlZCBjdXR0aW5nIGRheTwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtYXV0b1wiPlxuICAgICAgICAgICAgICAgICAgPHEtY2hpcFxuICAgICAgICAgICAgICAgICAgICA6Y29sb3I9XCJnZXREYXlDb2xvcih6b25lLnNjaGVkdWxlZERheSlcIlxuICAgICAgICAgICAgICAgICAgICB0ZXh0LWNvbG9yPVwid2hpdGVcIlxuICAgICAgICAgICAgICAgICAgICBpY29uPVwic2NoZWR1bGVcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7eyB6b25lLmVzdGltYXRlZFRpbWUgfX1taW5cbiAgICAgICAgICAgICAgICAgIDwvcS1jaGlwPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvcS1jYXJkPlxuXG4gICAgICAgICAgICA8IS0tIFdlZWtseSBDb250ZXh0IC0tPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtc3VidGl0bGUyIHEtbWItc21cIj5UaGlzIFdlZWsncyBQcm9ncmVzczwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IHEtZ3V0dGVyLXNtXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbFwiPlxuICAgICAgICAgICAgICAgICAgPHEtY2FyZCBmbGF0IGJvcmRlcmVkIGNsYXNzPVwidGV4dC1jZW50ZXIgcS1wYS1zbVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNCB0ZXh0LXBvc2l0aXZlXCI+e3sgd2Vla2x5U3RhdHMuY29tcGxldGVkIH19PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWNhcHRpb25cIj5Db21wbGV0ZWQ8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvcS1jYXJkPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2xcIj5cbiAgICAgICAgICAgICAgICAgIDxxLWNhcmQgZmxhdCBib3JkZXJlZCBjbGFzcz1cInRleHQtY2VudGVyIHEtcGEtc21cIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDQgdGV4dC1pbmZvXCI+e3sgd2Vla2x5U3RhdHMudG90YWwgfX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtY2FwdGlvblwiPlRvdGFsIFpvbmVzPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L3EtY2FyZD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sXCI+XG4gICAgICAgICAgICAgICAgICA8cS1jYXJkIGZsYXQgYm9yZGVyZWQgY2xhc3M9XCJ0ZXh0LWNlbnRlciBxLXBhLXNtXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg0IHRleHQtd2FybmluZ1wiPnt7IHdlZWtseVN0YXRzLnJlbWFpbmluZyB9fTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1jYXB0aW9uXCI+UmVtYWluaW5nPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L3EtY2FyZD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPCEtLSBBY3Rpb25zIC0tPlxuICAgICAgICAgICAgPHEtc2VwYXJhdG9yIC8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IHEtZ3V0dGVyLXNtXCI+XG4gICAgICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgICAgIG91dGxpbmVcbiAgICAgICAgICAgICAgICBjb2xvcj1cInByaW1hcnlcIlxuICAgICAgICAgICAgICAgIGljb249XCJlZGl0XCJcbiAgICAgICAgICAgICAgICBsYWJlbD1cIlJlc2NoZWR1bGVcIlxuICAgICAgICAgICAgICAgIEBjbGljaz1cInNob3dSZXNjaGVkdWxlID0gdHJ1ZVwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgICAgIG91dGxpbmVcbiAgICAgICAgICAgICAgICBjb2xvcj1cImluZm9cIlxuICAgICAgICAgICAgICAgIGljb249XCJjb250ZW50X2NvcHlcIlxuICAgICAgICAgICAgICAgIGxhYmVsPVwiRHVwbGljYXRlIFpvbmVcIlxuICAgICAgICAgICAgICAgIEBjbGljaz1cImR1cGxpY2F0ZVpvbmVcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvcS10YWItcGFuZWw+XG5cbiAgICAgICAgPCEtLSBFcXVpcG1lbnQgVGFiIC0tPlxuICAgICAgICA8cS10YWItcGFuZWwgbmFtZT1cImVxdWlwbWVudFwiIGNsYXNzPVwicS1wYS1tZFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLWd1dHRlci1tZFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtc3VidGl0bGUxIHRleHQtd2VpZ2h0LW1lZGl1bVwiPlJlcXVpcmVkIEVxdWlwbWVudDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZXF1aXBtZW50LWxpc3RcIj5cbiAgICAgICAgICAgICAgPHEtbGlzdCBib3JkZXJlZD5cbiAgICAgICAgICAgICAgICA8cS1pdGVtXG4gICAgICAgICAgICAgICAgICB2LWZvcj1cIihlcXVpcG1lbnQsIGluZGV4KSBpbiB6b25lLmVxdWlwbWVudFwiXG4gICAgICAgICAgICAgICAgICA6a2V5PVwiaW5kZXhcIlxuICAgICAgICAgICAgICAgICAgY2xhc3M9XCJlcXVpcG1lbnQtaXRlbVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIGF2YXRhcj5cbiAgICAgICAgICAgICAgICAgICAgPHEtaWNvbiA6bmFtZT1cImdldEVxdWlwbWVudEljb24oZXF1aXBtZW50KVwiIGNvbG9yPVwicHJpbWFyeVwiIC8+XG4gICAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsPnt7IGVxdWlwbWVudCB9fTwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsIGNhcHRpb24+e3sgZ2V0RXF1aXBtZW50RGVzY3JpcHRpb24oZXF1aXBtZW50KSB9fTwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBzaWRlPlxuICAgICAgICAgICAgICAgICAgICA8cS1jaGVja2JveCB2LW1vZGVsPVwiZXF1aXBtZW50Q2hlY2tsaXN0W2luZGV4XVwiIC8+XG4gICAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgIDwvcS1pdGVtPlxuICAgICAgICAgICAgICA8L3EtbGlzdD5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8IS0tIEVxdWlwbWVudCBTdW1tYXJ5IC0tPlxuICAgICAgICAgICAgPHEtY2FyZCBmbGF0IGJvcmRlcmVkIGNsYXNzPVwicS1wYS1tZCBiZy1ncmVlbi0xXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyIHEtZ3V0dGVyLW1kXCI+XG4gICAgICAgICAgICAgICAgPHEtaWNvbiBuYW1lPVwiY2hlY2tsaXN0XCIgc2l6ZT1cIjJyZW1cIiBjb2xvcj1cInBvc2l0aXZlXCIgLz5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtYm9keTEgdGV4dC13ZWlnaHQtbWVkaXVtXCI+RXF1aXBtZW50IENoZWNrbGlzdDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtY2FwdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICB7eyBjaGVja2VkRXF1aXBtZW50IH19L3t7IHpvbmUuZXF1aXBtZW50Lmxlbmd0aCB9fSBpdGVtcyByZWFkeVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9xLWNhcmQ+XG5cbiAgICAgICAgICAgIDwhLS0gRXF1aXBtZW50IEFjdGlvbnMgLS0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IHEtZ3V0dGVyLXNtXCI+XG4gICAgICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgICAgIG91dGxpbmVcbiAgICAgICAgICAgICAgICBjb2xvcj1cInBvc2l0aXZlXCJcbiAgICAgICAgICAgICAgICBpY29uPVwiY2hlY2tfY2lyY2xlXCJcbiAgICAgICAgICAgICAgICBsYWJlbD1cIk1hcmsgQWxsIFJlYWR5XCJcbiAgICAgICAgICAgICAgICBAY2xpY2s9XCJjaGVja0FsbEVxdWlwbWVudFwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgICAgIG91dGxpbmVcbiAgICAgICAgICAgICAgICBjb2xvcj1cImdyZXlcIlxuICAgICAgICAgICAgICAgIGljb249XCJjbGVhcl9hbGxcIlxuICAgICAgICAgICAgICAgIGxhYmVsPVwiQ2xlYXIgQ2hlY2tsaXN0XCJcbiAgICAgICAgICAgICAgICBAY2xpY2s9XCJjbGVhckVxdWlwbWVudENoZWNrbGlzdFwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9xLXRhYi1wYW5lbD5cblxuICAgICAgICA8IS0tIEhpc3RvcnkgVGFiIC0tPlxuICAgICAgICA8cS10YWItcGFuZWwgbmFtZT1cImhpc3RvcnlcIiBjbGFzcz1cInEtcGEtbWRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1ndXR0ZXItbWRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXN1YnRpdGxlMSB0ZXh0LXdlaWdodC1tZWRpdW1cIj5Db21wbGV0aW9uIEhpc3Rvcnk8L2Rpdj5cblxuICAgICAgICAgICAgPCEtLSBSZWNlbnQgQWN0aXZpdHkgLS0+XG4gICAgICAgICAgICA8cS10aW1lbGluZT5cbiAgICAgICAgICAgICAgPHEtdGltZWxpbmUtZW50cnlcbiAgICAgICAgICAgICAgICB2LWlmPVwiem9uZS5sYXN0Q29tcGxldGVkXCJcbiAgICAgICAgICAgICAgICA6dGl0bGU9XCInQ29tcGxldGVkIG9uICcgKyBmb3JtYXREYXRlKHpvbmUubGFzdENvbXBsZXRlZClcIlxuICAgICAgICAgICAgICAgIDpzdWJ0aXRsZT1cIidMYXN0IG1haW50ZW5hbmNlIGNvbXBsZXRlZCdcIlxuICAgICAgICAgICAgICAgIGljb249XCJjaGVja19jaXJjbGVcIlxuICAgICAgICAgICAgICAgIGNvbG9yPVwicG9zaXRpdmVcIlxuICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgIDxxLXRpbWVsaW5lLWVudHJ5XG4gICAgICAgICAgICAgICAgdGl0bGU9XCJab25lIENyZWF0ZWRcIlxuICAgICAgICAgICAgICAgIHN1YnRpdGxlPVwiSW5pdGlhbCB6b25lIHNldHVwXCJcbiAgICAgICAgICAgICAgICBpY29uPVwiYWRkX2xvY2F0aW9uXCJcbiAgICAgICAgICAgICAgICBjb2xvcj1cImluZm9cIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9xLXRpbWVsaW5lPlxuXG4gICAgICAgICAgICA8IS0tIFN0YXRpc3RpY3MgcGxhY2Vob2xkZXIgLS0+XG4gICAgICAgICAgICA8cS1jYXJkIGZsYXQgYm9yZGVyZWQgY2xhc3M9XCJxLXBhLW1kXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWNlbnRlciB0ZXh0LWdyZXlcIj5cbiAgICAgICAgICAgICAgICA8cS1pY29uIG5hbWU9XCJhbmFseXRpY3NcIiBzaXplPVwiM3JlbVwiIGNsYXNzPVwicS1tYi1tZFwiIC8+XG4gICAgICAgICAgICAgICAgPGRpdj5EZXRhaWxlZCBhbmFseXRpY3MgY29taW5nIHNvb248L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1jYXB0aW9uXCI+XG4gICAgICAgICAgICAgICAgICBUcmFjayBjb21wbGV0aW9uIHRyZW5kcywgZWZmaWNpZW5jeSBtZXRyaWNzLCBhbmQgbW9yZVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvcS1jYXJkPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3EtdGFiLXBhbmVsPlxuICAgICAgPC9xLXRhYi1wYW5lbHM+XG5cbiAgICAgIDwhLS0gQWN0aW9ucyBGb290ZXIgLS0+XG4gICAgICA8cS1zZXBhcmF0b3IgLz5cbiAgICAgIDxxLWNhcmQtYWN0aW9ucyBhbGlnbj1cInJpZ2h0XCIgY2xhc3M9XCJxLXBhLW1kXCI+XG4gICAgICAgIDxxLWJ0biBmbGF0IGNvbG9yPVwiZ3JleVwiIGxhYmVsPVwiQ2xvc2VcIiB2LWNsb3NlLXBvcHVwIC8+XG4gICAgICAgIDxxLWJ0biBjb2xvcj1cInByaW1hcnlcIiBpY29uPVwiZWRpdFwiIGxhYmVsPVwiRWRpdCBab25lXCIgQGNsaWNrPVwiZWRpdFpvbmVcIiAvPlxuICAgICAgICA8cS1idG4gY29sb3I9XCJuZWdhdGl2ZVwiIGljb249XCJkZWxldGVcIiBsYWJlbD1cIkRlbGV0ZSBab25lXCIgQGNsaWNrPVwiY29uZmlybURlbGV0ZVpvbmVcIiAvPlxuICAgICAgPC9xLWNhcmQtYWN0aW9ucz5cbiAgICA8L3EtY2FyZD5cblxuICAgIDwhLS0gUmVzY2hlZHVsZSBEaWFsb2cgLS0+XG4gICAgPHEtZGlhbG9nIHYtbW9kZWw9XCJzaG93UmVzY2hlZHVsZVwiPlxuICAgICAgPHEtY2FyZCBzdHlsZT1cIm1pbi13aWR0aDogMzAwcHhcIj5cbiAgICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2XCI+UmVzY2hlZHVsZSBab25lPC9kaXY+XG4gICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG5cbiAgICAgICAgPHEtY2FyZC1zZWN0aW9uIGNsYXNzPVwicS1wdC1ub25lXCI+XG4gICAgICAgICAgPHEtc2VsZWN0XG4gICAgICAgICAgICB2LW1vZGVsPVwibmV3U2NoZWR1bGVEYXlcIlxuICAgICAgICAgICAgOm9wdGlvbnM9XCJkYXlPcHRpb25zXCJcbiAgICAgICAgICAgIGxhYmVsPVwiTmV3IFNjaGVkdWxlZCBEYXlcIlxuICAgICAgICAgICAgZW1pdC12YWx1ZVxuICAgICAgICAgICAgbWFwLW9wdGlvbnNcbiAgICAgICAgICAvPlxuICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuXG4gICAgICAgIDxxLWNhcmQtYWN0aW9ucyBhbGlnbj1cInJpZ2h0XCI+XG4gICAgICAgICAgPHEtYnRuIGZsYXQgbGFiZWw9XCJDYW5jZWxcIiBjb2xvcj1cImdyZXlcIiB2LWNsb3NlLXBvcHVwIC8+XG4gICAgICAgICAgPHEtYnRuXG4gICAgICAgICAgICBsYWJlbD1cIlJlc2NoZWR1bGVcIlxuICAgICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgIEBjbGljaz1cInJlc2NoZWR1bGVab25lXCJcbiAgICAgICAgICAgIDpkaXNhYmxlPVwiIW5ld1NjaGVkdWxlRGF5XCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L3EtY2FyZC1hY3Rpb25zPlxuICAgICAgPC9xLWNhcmQ+XG4gICAgPC9xLWRpYWxvZz5cblxuICAgIDwhLS0gSW1hZ2UgVmlld2VyIERpYWxvZyAtLT5cbiAgICA8cS1kaWFsb2cgdi1tb2RlbD1cImltYWdlVmlld2VyT3BlblwiIG1heGltaXplZD5cbiAgICAgIDxxLWNhcmQgY2xhc3M9XCJiZy1ibGFjayB0ZXh0LXdoaXRlXCI+XG4gICAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInJvdyBpdGVtcy1jZW50ZXIgcS1wYi1ub25lXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDZcIj57eyB6b25lPy5uYW1lIH19IC0gWm9uZSBQaG90bzwvZGl2PlxuICAgICAgICAgIDxxLXNwYWNlIC8+XG4gICAgICAgICAgPHEtYnRuIGljb249XCJjbG9zZVwiIGZsYXQgcm91bmQgZGVuc2Ugdi1jbG9zZS1wb3B1cCBjb2xvcj1cIndoaXRlXCIgLz5cbiAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cblxuICAgICAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJmbGV4IGZsZXgtY2VudGVyXCIgc3R5bGU9XCJoZWlnaHQ6IGNhbGMoMTAwdmggLSAxMDBweClcIj5cbiAgICAgICAgICA8cS1pbWdcbiAgICAgICAgICAgIHYtaWY9XCJjdXJyZW50SW1hZ2VcIlxuICAgICAgICAgICAgOnNyYz1cImN1cnJlbnRJbWFnZVwiXG4gICAgICAgICAgICA6YWx0PVwiem9uZT8ubmFtZVwiXG4gICAgICAgICAgICBmaXQ9XCJjb250YWluXCJcbiAgICAgICAgICAgIHN0eWxlPVwibWF4LWhlaWdodDogMTAwJTsgbWF4LXdpZHRoOiAxMDAlXCJcbiAgICAgICAgICAgIGNsYXNzPVwicm91bmRlZC1ib3JkZXJzXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90OmVycm9yPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWJzb2x1dGUtZnVsbCBmbGV4IGZsZXgtY2VudGVyIGJnLWdyZXktOCB0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICA8cS1pY29uIG5hbWU9XCJicm9rZW5faW1hZ2VcIiBzaXplPVwiNHJlbVwiIC8+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1tdC1tZFwiPkltYWdlIGNvdWxkIG5vdCBiZSBsb2FkZWQ8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgIDwvcS1pbWc+XG4gICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICA8L3EtY2FyZD5cbiAgICA8L3EtZGlhbG9nPlxuICA8L3EtZGlhbG9nPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgY29tcHV0ZWQsIHdhdGNoIH0gZnJvbSAndnVlJ1xuaW1wb3J0IHsgdXNlUXVhc2FyIH0gZnJvbSAncXVhc2FyJ1xuaW1wb3J0IHsgdXNlU2NoZWR1bGVTdG9yZSB9IGZyb20gJy4uL3N0b3Jlcy9zY2hlZHVsZS1zdG9yZS5qcydcblxuY29uc3QgJHEgPSB1c2VRdWFzYXIoKVxuY29uc3Qgc2NoZWR1bGVTdG9yZSA9IHVzZVNjaGVkdWxlU3RvcmUoKVxuXG4vLyBMb2NhbCBzdGF0ZVxuY29uc3QgYWN0aXZlVGFiID0gcmVmKCdkZXRhaWxzJylcbmNvbnN0IHVwZGF0aW5nID0gcmVmKGZhbHNlKVxuY29uc3Qgc2hvd1Jlc2NoZWR1bGUgPSByZWYoZmFsc2UpXG5jb25zdCBuZXdTY2hlZHVsZURheSA9IHJlZihudWxsKVxuY29uc3QgZXF1aXBtZW50Q2hlY2tsaXN0ID0gcmVmKFtdKVxuY29uc3QgaW1hZ2VWaWV3ZXJPcGVuID0gcmVmKGZhbHNlKVxuY29uc3QgY3VycmVudEltYWdlID0gcmVmKG51bGwpXG5cbi8vIENvbXB1dGVkIHByb3BlcnRpZXNcbmNvbnN0IHpvbmUgPSBjb21wdXRlZCgoKSA9PiBzY2hlZHVsZVN0b3JlLnNlbGVjdGVkWm9uZSlcblxuY29uc3Qgd2Vla2x5U3RhdHMgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGNvbnN0IHRvdGFsID0gc2NoZWR1bGVTdG9yZS50b3RhbFpvbmVzXG4gIGNvbnN0IGNvbXBsZXRlZCA9IHNjaGVkdWxlU3RvcmUuY29tcGxldGVkWm9uZXNcbiAgcmV0dXJuIHtcbiAgICB0b3RhbCxcbiAgICBjb21wbGV0ZWQsXG4gICAgcmVtYWluaW5nOiB0b3RhbCAtIGNvbXBsZXRlZCxcbiAgfVxufSlcblxuY29uc3QgY2hlY2tlZEVxdWlwbWVudCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgcmV0dXJuIGVxdWlwbWVudENoZWNrbGlzdC52YWx1ZS5maWx0ZXIoQm9vbGVhbikubGVuZ3RoXG59KVxuXG5jb25zdCBkYXlPcHRpb25zID0gW1xuICB7IGxhYmVsOiAnTW9uZGF5JywgdmFsdWU6ICdNb25kYXknIH0sXG4gIHsgbGFiZWw6ICdUdWVzZGF5JywgdmFsdWU6ICdUdWVzZGF5JyB9LFxuICB7IGxhYmVsOiAnV2VkbmVzZGF5JywgdmFsdWU6ICdXZWRuZXNkYXknIH0sXG4gIHsgbGFiZWw6ICdUaHVyc2RheScsIHZhbHVlOiAnVGh1cnNkYXknIH0sXG4gIHsgbGFiZWw6ICdGcmlkYXknLCB2YWx1ZTogJ0ZyaWRheScgfSxcbl1cblxuLy8gV2F0Y2ggZm9yIHpvbmUgY2hhbmdlcyB0byByZXNldCBlcXVpcG1lbnQgY2hlY2tsaXN0XG53YXRjaChcbiAgem9uZSxcbiAgKG5ld1pvbmUpID0+IHtcbiAgICBpZiAobmV3Wm9uZSkge1xuICAgICAgZXF1aXBtZW50Q2hlY2tsaXN0LnZhbHVlID0gbmV3IEFycmF5KG5ld1pvbmUuZXF1aXBtZW50Lmxlbmd0aCkuZmlsbChmYWxzZSlcbiAgICAgIG5ld1NjaGVkdWxlRGF5LnZhbHVlID0gbmV3Wm9uZS5zY2hlZHVsZWREYXlcbiAgICB9XG4gIH0sXG4gIHsgaW1tZWRpYXRlOiB0cnVlIH0sXG4pXG5cbi8vIE1ldGhvZHNcbmNvbnN0IHRvZ2dsZVN0YXR1cyA9IGFzeW5jICgpID0+IHtcbiAgaWYgKCF6b25lLnZhbHVlKSByZXR1cm5cblxuICB1cGRhdGluZy52YWx1ZSA9IHRydWVcbiAgdHJ5IHtcbiAgICBhd2FpdCBzY2hlZHVsZVN0b3JlLnVwZGF0ZVpvbmVTdGF0dXMoem9uZS52YWx1ZS5pZCwgIXpvbmUudmFsdWUuY29tcGxldGVkKVxuICB9IGZpbmFsbHkge1xuICAgIHVwZGF0aW5nLnZhbHVlID0gZmFsc2VcbiAgfVxufVxuXG5jb25zdCBnZXRQcmlvcml0eUNvbG9yID0gKHByaW9yaXR5KSA9PiB7XG4gIGNvbnN0IGNvbG9ycyA9IHtcbiAgICBoaWdoOiAnbmVnYXRpdmUnLFxuICAgIG1lZGl1bTogJ3dhcm5pbmcnLFxuICAgIGxvdzogJ3Bvc2l0aXZlJyxcbiAgfVxuICByZXR1cm4gY29sb3JzW3ByaW9yaXR5XSB8fCAnZ3JleSdcbn1cblxuY29uc3QgZ2V0RGF5Q29sb3IgPSAoZGF5KSA9PiB7XG4gIGNvbnN0IGNvbG9ycyA9IHtcbiAgICBNb25kYXk6ICdibHVlJyxcbiAgICBUdWVzZGF5OiAnZ3JlZW4nLFxuICAgIFdlZG5lc2RheTogJ29yYW5nZScsXG4gICAgVGh1cnNkYXk6ICdwdXJwbGUnLFxuICAgIEZyaWRheTogJ2luZGlnbycsIC8vIEJsdWUtcHVycGxlIHRoZW1lXG4gIH1cbiAgcmV0dXJuIGNvbG9yc1tkYXldIHx8ICdncmV5J1xufVxuXG5jb25zdCBmb3JtYXREYXRlID0gKGRhdGVTdHJpbmcpID0+IHtcbiAgaWYgKCFkYXRlU3RyaW5nKSByZXR1cm4gJ05ldmVyJ1xuXG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShkYXRlU3RyaW5nKVxuICByZXR1cm4gZGF0ZS50b0xvY2FsZURhdGVTdHJpbmcoJ2VuLUNBJywge1xuICAgIHllYXI6ICdudW1lcmljJyxcbiAgICBtb250aDogJ2xvbmcnLFxuICAgIGRheTogJ251bWVyaWMnLFxuICAgIGhvdXI6ICcyLWRpZ2l0JyxcbiAgICBtaW51dGU6ICcyLWRpZ2l0JyxcbiAgfSlcbn1cblxuY29uc3QgZ2V0RXF1aXBtZW50SWNvbiA9IChlcXVpcG1lbnQpID0+IHtcbiAgY29uc3QgaWNvbnMgPSB7XG4gICAgJ1JpZGluZyBtb3dlcic6ICdhZ3JpY3VsdHVyZScsXG4gICAgJ1B1c2ggbW93ZXInOiAnZ3Jhc3MnLFxuICAgICdTdHJpbmcgdHJpbW1lcic6ICdjb250ZW50X2N1dCcsXG4gICAgVHJpbW1lcjogJ2NvbnRlbnRfY3V0JyxcbiAgICBCbG93ZXI6ICdhaXInLFxuICAgIEVkZ2VyOiAnc3RyYWlnaHRlbicsXG4gICAgJ1NhZmV0eSBtYXJrZXJzJzogJ3dhcm5pbmcnLFxuICAgICdMaW5lIG1hcmtlcic6ICdlZGl0JyxcbiAgICAnSGFuZCB0b29scyc6ICdoYW5keW1hbicsXG4gIH1cbiAgcmV0dXJuIGljb25zW2VxdWlwbWVudF0gfHwgJ2J1aWxkJ1xufVxuXG5jb25zdCBnZXRFcXVpcG1lbnREZXNjcmlwdGlvbiA9IChlcXVpcG1lbnQpID0+IHtcbiAgY29uc3QgZGVzY3JpcHRpb25zID0ge1xuICAgICdSaWRpbmcgbW93ZXInOiAnUHJpbWFyeSBjdXR0aW5nIGVxdWlwbWVudCBmb3IgbGFyZ2UgYXJlYXMnLFxuICAgICdQdXNoIG1vd2VyJzogJ01hbnVhbCBtb3dlciBmb3IgZGV0YWlsZWQgd29yaycsXG4gICAgJ1N0cmluZyB0cmltbWVyJzogJ1RyaW0gYXJvdW5kIG9ic3RhY2xlcyBhbmQgZWRnZXMnLFxuICAgIFRyaW1tZXI6ICdUcmltIGFyb3VuZCBvYnN0YWNsZXMgYW5kIGVkZ2VzJyxcbiAgICBCbG93ZXI6ICdDbGVhbiB1cCBncmFzcyBjbGlwcGluZ3MgYW5kIGRlYnJpcycsXG4gICAgRWRnZXI6ICdDcmVhdGUgY2xlYW4gZWRnZXMgYWxvbmcgd2Fsa3dheXMnLFxuICAgICdTYWZldHkgbWFya2Vycyc6ICdNYXJrIGhhemFyZHMgYW5kIHdvcmsgYXJlYXMnLFxuICAgICdMaW5lIG1hcmtlcic6ICdNYXJrIHNwb3J0cyBmaWVsZHMgYW5kIGJvdW5kYXJpZXMnLFxuICAgICdIYW5kIHRvb2xzJzogJ1ZhcmlvdXMgbWFudWFsIHRvb2xzIGZvciBkZXRhaWwgd29yaycsXG4gIH1cbiAgcmV0dXJuIGRlc2NyaXB0aW9uc1tlcXVpcG1lbnRdIHx8ICdSZXF1aXJlZCBlcXVpcG1lbnQnXG59XG5cbmNvbnN0IGNoZWNrQWxsRXF1aXBtZW50ID0gKCkgPT4ge1xuICBlcXVpcG1lbnRDaGVja2xpc3QudmFsdWUgPSBlcXVpcG1lbnRDaGVja2xpc3QudmFsdWUubWFwKCgpID0+IHRydWUpXG4gICRxLm5vdGlmeSh7XG4gICAgdHlwZTogJ3Bvc2l0aXZlJyxcbiAgICBtZXNzYWdlOiAnQWxsIGVxdWlwbWVudCBtYXJrZWQgYXMgcmVhZHknLFxuICAgIGljb246ICdjaGVja19jaXJjbGUnLFxuICB9KVxufVxuXG5jb25zdCBjbGVhckVxdWlwbWVudENoZWNrbGlzdCA9ICgpID0+IHtcbiAgZXF1aXBtZW50Q2hlY2tsaXN0LnZhbHVlID0gZXF1aXBtZW50Q2hlY2tsaXN0LnZhbHVlLm1hcCgoKSA9PiBmYWxzZSlcbiAgJHEubm90aWZ5KHtcbiAgICB0eXBlOiAnaW5mbycsXG4gICAgbWVzc2FnZTogJ0VxdWlwbWVudCBjaGVja2xpc3QgY2xlYXJlZCcsXG4gICAgaWNvbjogJ2NsZWFyX2FsbCcsXG4gIH0pXG59XG5cbmNvbnN0IHJlc2NoZWR1bGVab25lID0gYXN5bmMgKCkgPT4ge1xuICBpZiAoIXpvbmUudmFsdWUgfHwgIW5ld1NjaGVkdWxlRGF5LnZhbHVlKSByZXR1cm5cblxuICB0cnkge1xuICAgIGF3YWl0IHNjaGVkdWxlU3RvcmUudXBkYXRlWm9uZSh6b25lLnZhbHVlLmlkLCB7XG4gICAgICBzY2hlZHVsZWREYXk6IG5ld1NjaGVkdWxlRGF5LnZhbHVlLFxuICAgIH0pXG5cbiAgICBzaG93UmVzY2hlZHVsZS52YWx1ZSA9IGZhbHNlXG5cbiAgICAkcS5ub3RpZnkoe1xuICAgICAgdHlwZTogJ3Bvc2l0aXZlJyxcbiAgICAgIG1lc3NhZ2U6IGBab25lIHJlc2NoZWR1bGVkIHRvICR7bmV3U2NoZWR1bGVEYXkudmFsdWV9YCxcbiAgICAgIGljb246ICdldmVudCcsXG4gICAgfSlcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciByZXNjaGVkdWxpbmcgem9uZTonLCBlcnJvcilcbiAgfVxufVxuXG5jb25zdCBkdXBsaWNhdGVab25lID0gKCkgPT4ge1xuICAkcS5ub3RpZnkoe1xuICAgIHR5cGU6ICdpbmZvJyxcbiAgICBtZXNzYWdlOiAnWm9uZSBkdXBsaWNhdGlvbiBmZWF0dXJlIGNvbWluZyBzb29uIScsXG4gICAgaWNvbjogJ2NvbnRlbnRfY29weScsXG4gIH0pXG59XG5cbmNvbnN0IGVkaXRab25lID0gKCkgPT4ge1xuICAkcS5ub3RpZnkoe1xuICAgIHR5cGU6ICdpbmZvJyxcbiAgICBtZXNzYWdlOiAnWm9uZSBlZGl0aW5nIGZlYXR1cmUgY29taW5nIGluIG5leHQgcGhhc2UhJyxcbiAgICBpY29uOiAnZWRpdCcsXG4gIH0pXG59XG5cbmNvbnN0IGdldEltYWdlRGVzY3JpcHRpb24gPSAoaW1hZ2VQYXRoLCBpbmRleCkgPT4ge1xuICAvLyBFeHRyYWN0IGRlc2NyaXB0aW9uIGZyb20gaW1hZ2UgZmlsZW5hbWVcbiAgY29uc3QgZmlsZW5hbWUgPSBpbWFnZVBhdGguc3BsaXQoJy8nKS5wb3AoKS5yZXBsYWNlKCcuanBnJywgJycpLnJlcGxhY2UoJy5wbmcnLCAnJylcblxuICBpZiAoZmlsZW5hbWUuaW5jbHVkZXMoJ2JlZm9yZScpKSByZXR1cm4gJ0JlZm9yZSBtYWludGVuYW5jZSdcbiAgaWYgKGZpbGVuYW1lLmluY2x1ZGVzKCdhZnRlcicpKSByZXR1cm4gJ0FmdGVyIG1haW50ZW5hbmNlJ1xuICBpZiAoZmlsZW5hbWUuaW5jbHVkZXMoJ3BsYXlncm91bmQnKSkgcmV0dXJuICdQbGF5Z3JvdW5kIGFyZWEnXG4gIGlmIChmaWxlbmFtZS5pbmNsdWRlcygnZmllbGQnKSkgcmV0dXJuICdTcG9ydHMgZmllbGQnXG4gIGlmIChmaWxlbmFtZS5pbmNsdWRlcygnZW50cmFuY2UnKSkgcmV0dXJuICdFbnRyYW5jZSBhcmVhJ1xuICBpZiAoZmlsZW5hbWUuaW5jbHVkZXMoJ3dlbGNvbWUnKSkgcmV0dXJuICdXZWxjb21lIHNpZ24gYXJlYSdcbiAgaWYgKGZpbGVuYW1lLmluY2x1ZGVzKCdtZW1vcmlhbCcpKSByZXR1cm4gJ01lbW9yaWFsIGFyZWEnXG4gIGlmIChmaWxlbmFtZS5pbmNsdWRlcygncmluaycpKSByZXR1cm4gJ0hvY2tleSByaW5rIGFyZWEnXG4gIGlmIChmaWxlbmFtZS5pbmNsdWRlcygnZ3JhaW4nKSkgcmV0dXJuICdHcmFpbiBlbGV2YXRvciBhcmVhJ1xuICBpZiAoZmlsZW5hbWUuaW5jbHVkZXMoJ3BhcmsnKSkgcmV0dXJuICdQYXJrIGFyZWEnXG5cbiAgcmV0dXJuIGBQaG90byAke2luZGV4ICsgMX1gXG59XG5cbmNvbnN0IG9wZW5JbWFnZVZpZXdlciA9IChpbWFnZVBhdGgpID0+IHtcbiAgY3VycmVudEltYWdlLnZhbHVlID0gaW1hZ2VQYXRoXG4gIGltYWdlVmlld2VyT3Blbi52YWx1ZSA9IHRydWVcbn1cblxuY29uc3QgY29uZmlybURlbGV0ZVpvbmUgPSAoKSA9PiB7XG4gIGlmICghem9uZS52YWx1ZSkgcmV0dXJuXG5cbiAgJHEuZGlhbG9nKHtcbiAgICB0aXRsZTogJ0RlbGV0ZSBab25lJyxcbiAgICBtZXNzYWdlOiBgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSBcIiR7em9uZS52YWx1ZS5uYW1lfVwiPyBUaGlzIGFjdGlvbiBjYW5ub3QgYmUgdW5kb25lLmAsXG4gICAgY2FuY2VsOiB0cnVlLFxuICAgIHBlcnNpc3RlbnQ6IHRydWUsXG4gICAgb2s6IHtcbiAgICAgIGNvbG9yOiAnbmVnYXRpdmUnLFxuICAgICAgbGFiZWw6ICdEZWxldGUgWm9uZScsXG4gICAgfSxcbiAgfSkub25Payhhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHNjaGVkdWxlU3RvcmUuZGVsZXRlWm9uZSh6b25lLnZhbHVlLmlkKVxuICAgICAgc2NoZWR1bGVTdG9yZS5jbGVhclNlbGVjdGlvbigpXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGRlbGV0aW5nIHpvbmU6JywgZXJyb3IpXG4gICAgfVxuICB9KVxufVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiIHNjb3BlZD5cbi56b25lLWRldGFpbHMtZGlhbG9nIHtcbiAgLnEtaW1nIHtcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIH1cblxuICAucS10YWItcGFuZWxzIHtcbiAgICBtaW4taGVpZ2h0OiA0MDBweDtcbiAgfVxuXG4gIC5pbWFnZS1nYWxsZXJ5IHtcbiAgICAuem9uZS1waG90byB7XG4gICAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xuXG4gICAgICAmOmhvdmVyIHtcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjAyKTtcbiAgICAgICAgYm94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMik7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi5lcXVpcG1lbnQtbGlzdCB7XG4gIC5lcXVpcG1lbnQtaXRlbSB7XG4gICAgLnEtaXRlbV9fc2VjdGlvbi0tYXZhdGFyIHtcbiAgICAgIG1pbi13aWR0aDogNDhweDtcbiAgICB9XG4gIH1cbn1cblxuLnEtdGltZWxpbmUge1xuICAucS10aW1lbGluZV9fZW50cnkge1xuICAgIC5xLXRpbWVsaW5lX19zdWJ0aXRsZSB7XG4gICAgICBvcGFjaXR5OiAwLjc7XG4gICAgfVxuICB9XG59XG5cbi8vIE1vYmlsZSBhZGp1c3RtZW50c1xuQG1lZGlhIChtYXgtd2lkdGg6IDU5OXB4KSB7XG4gIC56b25lLWRldGFpbHMtZGlhbG9nIHtcbiAgICAucS1jYXJkLXNlY3Rpb24ge1xuICAgICAgcGFkZGluZzogMTJweDtcbiAgICB9XG5cbiAgICAucS10YWItcGFuZWxzIHtcbiAgICAgIG1pbi1oZWlnaHQ6IDMwMHB4O1xuICAgIH1cbiAgfVxufVxuXG4vLyBEYXJrIG1vZGUgYWRqdXN0bWVudHNcbi5ib2R5LS1kYXJrIHtcbiAgLmJnLWJsdWUtMSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgzMywgMTUwLCAyNDMsIDAuMSkgIWltcG9ydGFudDtcbiAgfVxuXG4gIC5iZy1ncmVlbi0xIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDc2LCAxNzUsIDgwLCAwLjEpICFpbXBvcnRhbnQ7XG4gIH1cbn1cbjwvc3R5bGU+XG4iXSwibmFtZXMiOlsicG9zaXRpb24iLCJjb250ZW50IiwiX2NyZWF0ZUJsb2NrIiwiX2NyZWF0ZVZOb2RlIiwiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl90b0Rpc3BsYXlTdHJpbmciLCJfb3BlbkJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9GcmFnbWVudCIsIl9ub3JtYWxpemVDbGFzcyIsIl9jcmVhdGVUZXh0Vk5vZGUiXSwibWFwcGluZ3MiOiI7O0FBTUEsTUFBQSxRQUFlLGdCQUFnQjtBQUFBLEVBQzdCLE1BQU07QUFBQSxFQUVOLE9BQU87QUFBQSxJQUNMLFNBQVM7QUFBQSxJQUNULFNBQVM7QUFBQSxFQUNiO0FBQUEsRUFFRSxNQUFPLE9BQU8sRUFBRSxTQUFTO0FBQ3ZCLFVBQU0sRUFBRSxPQUFPLEVBQUUsR0FBRSxFQUFFLElBQUssbUJBQWtCO0FBRTVDLFVBQU0sVUFBVSxPQUFPLFdBQVcsYUFBYTtBQUMvQyxRQUFJLFlBQVksZUFBZTtBQUM3QixjQUFRLE1BQU0sMkNBQTJDO0FBQ3pELGFBQU87QUFBQSxJQUNUO0FBRUEsVUFBTSxpQkFBaUIsT0FBTyxrQkFBa0IsYUFBYTtBQUM3RCxRQUFJLG1CQUFtQixlQUFlO0FBQ3BDLGNBQVEsTUFBTSwyQ0FBMkM7QUFDekQsYUFBTztBQUFBLElBQ1Q7QUFFQSxVQUFNLFFBQVEsU0FBUyxNQUFNO0FBQzNCLFlBQU0sVUFDRCxRQUFRLE9BQU8sVUFBVSxPQUFPLFFBQVEsT0FBTyxPQUFPLE1BQ3RELFFBQVEsT0FBTyxV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LDZCQUNaLE1BSWlCO0FBQUEsY0FKakJBLFlBSWlCLGNBQUEsRUFBQSxPQUFBLDZCQUpLLEdBQUE7QUFBQSxpQ0FDcEIsTUFBd0Q7QUFBQSxrQkFBeERDLGdCQUF3RCxPQUF4RCxhQUF3REMsZ0JBQWhDLGFBQU0sSUFBSSxJQUFHLGlCQUFhLENBQUE7QUFBQSxrQkFDbERGLFlBQVcsTUFBQTtBQUFBLGlDQUNYQSxZQUFtRSxNQUFBO0FBQUEsb0JBQTVELE1BQUs7QUFBQSxvQkFBUSxNQUFBO0FBQUEsb0JBQUssT0FBQTtBQUFBLG9CQUFNLE9BQUE7QUFBQSxvQkFBb0IsT0FBTTtBQUFBOzs7Ozs7Y0FHM0RBLFlBa0JpQixjQUFBO0FBQUEsZ0JBbEJELE9BQU07QUFBQSxnQkFBbUIsT0FBQSxFQUFBLFVBQUEsc0JBQUE7QUFBQTtpQ0FDdkMsTUFnQlE7QUFBQSxrQkFmQSxPQUFBLDZCQURSRCxZQWdCUSxNQUFBO0FBQUE7b0JBZEwsS0FBSyxPQUFBO0FBQUEsb0JBQ0wsS0FBSyxPQUFBLE1BQU07QUFBQSxvQkFDWixLQUFJO0FBQUEsb0JBQ0osT0FBQSxFQUFBLGNBQUEsUUFBQSxhQUFBLE9BQUE7QUFBQSxvQkFDQSxPQUFNO0FBQUE7b0JBRVcsZUFDZixNQUtNO0FBQUEsc0JBTE5FLGdCQUtNLE9BTE4sYUFLTTtBQUFBLHdCQUpKQSxnQkFHTSxPQUhOLGFBR007QUFBQSwwQkFGSkQsWUFBMEMsT0FBQTtBQUFBLDRCQUFsQyxNQUFLO0FBQUEsNEJBQWUsTUFBSztBQUFBOzBCQUNqQyxPQUFBLEVBQUEsTUFBQSxPQUFBLEVBQUEsSUFBQUMsZ0JBQW9ELE9BQUEsRUFBL0MsT0FBTSxVQUFTLEdBQUMsNkJBQXlCLEVBQUE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsiLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMCwxLDIsMyw0LDUsNiw3LDgsOSwxMCwxMSwxMiwxM119
