import { c as createComponent, ap as useSpinnerProps, aq as useSpinner, h, a as computed, i as inject, n as noop, ar as fabKey, g as getCurrentInstance, ad as QBtn, ah as QIcon, V as hMergeSlot, x as useModelToggleEmits, z as useModelToggleProps, r as ref, as as useId, C as useModelToggle, b as hSlot, K as provide, e as emptyRenderFn, l as layoutKey, $ as _export_sfc, ae as createBlock, a1 as openBlock, a5 as withCtx, a0 as createElementBlock, a4 as createVNode, aa as createCommentVNode, a2 as createBaseVNode, a7 as QCard, ac as createTextVNode, a6 as toDisplayString, af as QCardSection, ai as useQuasar, H as onMounted, U as onUnmounted, F as nextTick, w as watch } from "./index-DtVXev-T.js";
import { Q as QTooltip } from "./QTooltip-WXxOS_PO.js";
import { a as QChip, u as useScheduleStore } from "./QSelect-DP4GbAuv.js";
import { Q as QPage, Z as ZoneDetailsDialog } from "./ZoneDetailsDialog-BiIE5NuN.js";
import { L } from "./leaflet-src-DK72URKj.js";
const innerHTML = '<circle cx="15" cy="15" r="15"><animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="60" cy="15" r="9" fill-opacity=".3"><animate attributeName="r" from="9" to="9" begin="0s" dur="0.8s" values="9;15;9" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" from=".5" to=".5" begin="0s" dur="0.8s" values=".5;1;.5" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="105" cy="15" r="15"><animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite"></animate></circle>';
const QSpinnerDots = createComponent({
  name: "QSpinnerDots",
  props: useSpinnerProps,
  setup(props) {
    const { cSize, classes } = useSpinner(props);
    return () => h("svg", {
      class: classes.value,
      fill: "currentColor",
      width: cSize.value,
      height: cSize.value,
      viewBox: "0 0 120 30",
      xmlns: "http://www.w3.org/2000/svg",
      innerHTML
    });
  }
});
const labelPositions = ["top", "right", "bottom", "left"];
const useFabProps = {
  type: {
    type: String,
    default: "a"
  },
  outline: Boolean,
  push: Boolean,
  flat: Boolean,
  unelevated: Boolean,
  color: String,
  textColor: String,
  glossy: Boolean,
  square: Boolean,
  padding: String,
  label: {
    type: [String, Number],
    default: ""
  },
  labelPosition: {
    type: String,
    default: "right",
    validator: (v) => labelPositions.includes(v)
  },
  externalLabel: Boolean,
  hideLabel: {
    type: Boolean
  },
  labelClass: [Array, String, Object],
  labelStyle: [Array, String, Object],
  disable: Boolean,
  tabindex: [Number, String]
};
function useFab(props, showing) {
  return {
    formClass: computed(
      () => `q-fab--form-${props.square === true ? "square" : "rounded"}`
    ),
    stacked: computed(
      () => props.externalLabel === false && ["top", "bottom"].includes(props.labelPosition)
    ),
    labelProps: computed(() => {
      if (props.externalLabel === true) {
        const hideLabel = props.hideLabel === null ? showing.value === false : props.hideLabel;
        return {
          action: "push",
          data: {
            class: [
              props.labelClass,
              `q-fab__label q-tooltip--style q-fab__label--external q-fab__label--external-${props.labelPosition}` + (hideLabel === true ? " q-fab__label--external-hidden" : "")
            ],
            style: props.labelStyle
          }
        };
      }
      return {
        action: ["left", "top"].includes(props.labelPosition) ? "unshift" : "push",
        data: {
          class: [
            props.labelClass,
            `q-fab__label q-fab__label--internal q-fab__label--internal-${props.labelPosition}` + (props.hideLabel === true ? " q-fab__label--internal-hidden" : "")
          ],
          style: props.labelStyle
        }
      };
    })
  };
}
const anchorMap = {
  start: "self-end",
  center: "self-center",
  end: "self-start"
};
const anchorValues = Object.keys(anchorMap);
const QFabAction = createComponent({
  name: "QFabAction",
  props: {
    ...useFabProps,
    icon: {
      type: String,
      default: ""
    },
    anchor: {
      type: String,
      validator: (v) => anchorValues.includes(v)
    },
    to: [String, Object],
    replace: Boolean
  },
  emits: ["click"],
  setup(props, { slots, emit }) {
    const $fab = inject(fabKey, () => ({
      showing: { value: true },
      onChildClick: noop
    }));
    const { formClass, labelProps } = useFab(props, $fab.showing);
    const classes = computed(() => {
      const align = anchorMap[props.anchor];
      return formClass.value + (align !== void 0 ? ` ${align}` : "");
    });
    const isDisabled = computed(
      () => props.disable === true || $fab.showing.value !== true
    );
    function click(e) {
      $fab.onChildClick(e);
      emit("click", e);
    }
    function getContent() {
      const child = [];
      if (slots.icon !== void 0) {
        child.push(slots.icon());
      } else if (props.icon !== "") {
        child.push(
          h(QIcon, { name: props.icon })
        );
      }
      if (props.label !== "" || slots.label !== void 0) {
        child[labelProps.value.action](
          h("div", labelProps.value.data, slots.label !== void 0 ? slots.label() : [props.label])
        );
      }
      return hMergeSlot(slots.default, child);
    }
    const vm = getCurrentInstance();
    Object.assign(vm.proxy, { click });
    return () => h(QBtn, {
      class: classes.value,
      ...props,
      noWrap: true,
      stack: props.stacked,
      icon: void 0,
      label: void 0,
      noCaps: true,
      fabMini: true,
      disable: isDisabled.value,
      onClick: click
    }, getContent);
  }
});
const directions = ["up", "right", "down", "left"];
const alignValues = ["left", "center", "right"];
const QFab = createComponent({
  name: "QFab",
  props: {
    ...useFabProps,
    ...useModelToggleProps,
    icon: String,
    activeIcon: String,
    hideIcon: Boolean,
    hideLabel: {
      ...useFabProps.hideLabel,
      default: null
    },
    direction: {
      type: String,
      default: "right",
      validator: (v) => directions.includes(v)
    },
    persistent: Boolean,
    verticalActionsAlign: {
      type: String,
      default: "center",
      validator: (v) => alignValues.includes(v)
    }
  },
  emits: useModelToggleEmits,
  setup(props, { slots }) {
    const triggerRef = ref(null);
    const showing = ref(props.modelValue === true);
    const targetUid = useId();
    const { proxy: { $q } } = getCurrentInstance();
    const { formClass, labelProps } = useFab(props, showing);
    const hideOnRouteChange = computed(() => props.persistent !== true);
    const { hide, toggle } = useModelToggle({
      showing,
      hideOnRouteChange
    });
    const slotScope = computed(() => ({ opened: showing.value }));
    const classes = computed(
      () => `q-fab z-fab row inline justify-center q-fab--align-${props.verticalActionsAlign} ${formClass.value}` + (showing.value === true ? " q-fab--opened" : " q-fab--closed")
    );
    const actionClass = computed(
      () => `q-fab__actions flex no-wrap inline q-fab__actions--${props.direction} q-fab__actions--${showing.value === true ? "opened" : "closed"}`
    );
    const actionAttrs = computed(() => {
      const attrs = {
        id: targetUid.value,
        role: "menu"
      };
      if (showing.value !== true) {
        attrs["aria-hidden"] = "true";
      }
      return attrs;
    });
    const iconHolderClass = computed(
      () => `q-fab__icon-holder  q-fab__icon-holder--${showing.value === true ? "opened" : "closed"}`
    );
    function getIcon(kebab, camel) {
      const slotFn = slots[kebab];
      const classes2 = `q-fab__${kebab} absolute-full`;
      return slotFn === void 0 ? h(QIcon, { class: classes2, name: props[camel] || $q.iconSet.fab[camel] }) : h("div", { class: classes2 }, slotFn(slotScope.value));
    }
    function getTriggerContent() {
      const child = [];
      props.hideIcon !== true && child.push(
        h("div", { class: iconHolderClass.value }, [
          getIcon("icon", "icon"),
          getIcon("active-icon", "activeIcon")
        ])
      );
      if (props.label !== "" || slots.label !== void 0) {
        child[labelProps.value.action](
          h("div", labelProps.value.data, slots.label !== void 0 ? slots.label(slotScope.value) : [props.label])
        );
      }
      return hMergeSlot(slots.tooltip, child);
    }
    provide(fabKey, {
      showing,
      onChildClick(evt) {
        hide(evt);
        if (evt?.qAvoidFocus !== true) {
          triggerRef.value?.$el.focus();
        }
      }
    });
    return () => h("div", {
      class: classes.value
    }, [
      h(QBtn, {
        ref: triggerRef,
        class: formClass.value,
        ...props,
        noWrap: true,
        stack: props.stacked,
        align: void 0,
        icon: void 0,
        label: void 0,
        noCaps: true,
        fab: true,
        "aria-expanded": showing.value === true ? "true" : "false",
        "aria-haspopup": "true",
        "aria-controls": targetUid.value,
        onClick: toggle
      }, getTriggerContent),
      h("div", { class: actionClass.value, ...actionAttrs.value }, hSlot(slots.default))
    ]);
  }
});
const usePageStickyProps = {
  position: {
    type: String,
    default: "bottom-right",
    validator: (v) => [
      "top-right",
      "top-left",
      "bottom-right",
      "bottom-left",
      "top",
      "right",
      "bottom",
      "left"
    ].includes(v)
  },
  offset: {
    type: Array,
    validator: (v) => v.length === 2
  },
  expand: Boolean
};
function usePageSticky() {
  const { props, proxy: { $q } } = getCurrentInstance();
  const $layout = inject(layoutKey, emptyRenderFn);
  if ($layout === emptyRenderFn) {
    console.error("QPageSticky needs to be child of QLayout");
    return emptyRenderFn;
  }
  const attach = computed(() => {
    const pos = props.position;
    return {
      top: pos.indexOf("top") !== -1,
      right: pos.indexOf("right") !== -1,
      bottom: pos.indexOf("bottom") !== -1,
      left: pos.indexOf("left") !== -1,
      vertical: pos === "top" || pos === "bottom",
      horizontal: pos === "left" || pos === "right"
    };
  });
  const top = computed(() => $layout.header.offset);
  const right = computed(() => $layout.right.offset);
  const bottom = computed(() => $layout.footer.offset);
  const left = computed(() => $layout.left.offset);
  const style = computed(() => {
    let posX = 0, posY = 0;
    const side = attach.value;
    const dir = $q.lang.rtl === true ? -1 : 1;
    if (side.top === true && top.value !== 0) {
      posY = `${top.value}px`;
    } else if (side.bottom === true && bottom.value !== 0) {
      posY = `${-bottom.value}px`;
    }
    if (side.left === true && left.value !== 0) {
      posX = `${dir * left.value}px`;
    } else if (side.right === true && right.value !== 0) {
      posX = `${-dir * right.value}px`;
    }
    const css = { transform: `translate(${posX}, ${posY})` };
    if (props.offset) {
      css.margin = `${props.offset[1]}px ${props.offset[0]}px`;
    }
    if (side.vertical === true) {
      if (left.value !== 0) {
        css[$q.lang.rtl === true ? "right" : "left"] = `${left.value}px`;
      }
      if (right.value !== 0) {
        css[$q.lang.rtl === true ? "left" : "right"] = `${right.value}px`;
      }
    } else if (side.horizontal === true) {
      if (top.value !== 0) {
        css.top = `${top.value}px`;
      }
      if (bottom.value !== 0) {
        css.bottom = `${bottom.value}px`;
      }
    }
    return css;
  });
  const classes = computed(
    () => `q-page-sticky row flex-center fixed-${props.position} q-page-sticky--${props.expand === true ? "expand" : "shrink"}`
  );
  function getStickyContent(slots) {
    const content = hSlot(slots.default);
    return h(
      "div",
      {
        class: classes.value,
        style: style.value
      },
      props.expand === true ? content : [h("div", content)]
    );
  }
  return {
    $layout,
    getStickyContent
  };
}
const QPageSticky = createComponent({
  name: "QPageSticky",
  props: usePageStickyProps,
  setup(_, { slots }) {
    const { getStickyContent } = usePageSticky();
    return () => getStickyContent(slots);
  }
});
const defaultZoom = 14;
const _sfc_main = {
  __name: "IndexPage",
  setup(__props, { expose: __expose }) {
    __expose();
    const $q = useQuasar();
    const scheduleStore = useScheduleStore();
    const mapContainer = ref(null);
    const hoveredZone = ref(null);
    const showCompletedZones = ref(true);
    const showIncompleteZones = ref(true);
    let map = null;
    let zonePolygons = [];
    const defaultCenter = [49.671151141711434, -96.65296535699862];
    const dayColors = {
      Monday: "#2196F3",
      Tuesday: "#4CAF50",
      Wednesday: "#FF9800",
      Thursday: "#9C27B0",
      Friday: "#241FE0"
      // Blue-purple
    };
    onMounted(async () => {
      console.log("IndexPage mounted");
      if (scheduleStore.setNotifyFunction && $q.notify) {
        scheduleStore.setNotifyFunction($q.notify);
      }
      await loadZones();
      await initializeMap();
    });
    onUnmounted(() => {
      console.log("IndexPage unmounting");
      if (map) {
        map.remove();
        map = null;
      }
    });
    const loadZones = async () => {
      try {
        console.log("Loading zones...");
        await scheduleStore.initializeStore();
        console.log("Zones loaded:", scheduleStore.zones.length);
        if (map) {
          addZonesToMap();
        }
      } catch (error) {
        console.error("Failed to load zones:", error);
        if ($q.notify) {
          $q.notify({
            color: "negative",
            message: "Failed to load zones",
            icon: "error"
          });
        }
      }
    };
    const initializeMap = async () => {
      await nextTick();
      await new Promise((resolve) => setTimeout(resolve, 100));
      if (!mapContainer.value) {
        console.error("Map container not found");
        return;
      }
      try {
        console.log("Initializing map...");
        console.log("Leaflet object:", L);
        console.log("Map container element:", document.getElementById("map"));
        map = L.map("map", {
          // Ensure the map renders properly
          preferCanvas: false,
          zoomControl: true,
          attributionControl: true
        }).setView(defaultCenter, defaultZoom);
        console.log("Map created:", map);
        const tileLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
          maxZoom: 19,
          tileSize: 256,
          zoomOffset: 0
        });
        tileLayer.on("tileerror", (e) => {
          console.warn("Tile load error:", e);
        });
        tileLayer.on("tileload", () => {
          console.log("Tile loaded successfully");
        });
        tileLayer.addTo(map);
        console.log("Tile layer added");
        setTimeout(() => {
          if (map) {
            console.log("Invalidating map size...");
            map.invalidateSize(true);
            map.eachLayer((layer) => {
              if (layer.redraw) {
                layer.redraw();
              }
            });
          }
        }, 200);
        console.log("Map initialized successfully");
        addZonesToMap();
      } catch (error) {
        console.error("Error initializing map:", error);
        if ($q.notify) {
          $q.notify({
            color: "negative",
            message: "Failed to initialize map",
            icon: "error"
          });
        }
      }
    };
    const addZonesToMap = () => {
      if (!map) {
        console.log("Map not ready for adding zones");
        return;
      }
      console.log("Adding zones to map with filters...", {
        day: scheduleStore.filters.day,
        completed: scheduleStore.filters.completed,
        priority: scheduleStore.filters.priority
      });
      zonePolygons.forEach((polygon) => {
        map.removeLayer(polygon);
      });
      zonePolygons = [];
      const zonesToShow = scheduleStore.filteredZones;
      console.log(`Showing ${zonesToShow.length} zones after filtering`);
      zonesToShow.forEach((zone) => {
        try {
          if (!showCompletedZones.value && zone.completed) return;
          if (!showIncompleteZones.value && !zone.completed) return;
          const dayColor = dayColors[zone.scheduledDay];
          const color = zone.completed ? dayColor : "#FF0000";
          const opacity = zone.completed ? 0.7 : 0.9;
          const fillOpacity = zone.completed ? 0.4 : 0.6;
          const polygon = L.polygon(zone.coordinates, {
            color,
            fillColor: color,
            fillOpacity,
            weight: 3,
            opacity
          }).addTo(map);
          polygon.on("click", () => {
            selectZone(zone);
          });
          polygon.on("mouseover", function() {
            hoveredZone.value = zone;
            this.setStyle({
              weight: 5,
              fillOpacity: 0.8
            });
          });
          polygon.on("mouseout", function() {
            hoveredZone.value = null;
            this.setStyle({
              weight: 3,
              fillOpacity
            });
          });
          polygon.bindTooltip(
            `
        <div style="text-align: center;">
          <strong>${zone.name}</strong><br>
          <span style="color: ${dayColor};">${zone.scheduledDay}</span><br>
          ${zone.completed ? "✅ Complete" : "⏳ Pending"}
        </div>
      `,
            {
              permanent: false,
              direction: "top",
              className: "zone-tooltip"
            }
          );
          zonePolygons.push(polygon);
          console.log(`Added zone: ${zone.name}`);
        } catch (error) {
          console.error(`Error adding zone ${zone.name}:`, error);
        }
      });
      if (zonePolygons.length > 0) {
        try {
          const group = new L.featureGroup(zonePolygons);
          map.fitBounds(group.getBounds().pad(0.1));
          console.log("Map bounds fitted to filtered zones");
        } catch (error) {
          console.error("Error fitting bounds:", error);
        }
      }
      console.log(`Added ${zonePolygons.length} zones to map`);
    };
    const selectZone = (zone) => {
      scheduleStore.selectZone(zone);
      if ($q.notify) {
        $q.notify({
          color: "info",
          message: `Selected: ${zone.name}`,
          icon: "info",
          timeout: 1e3
        });
      }
    };
    const refreshMap = async () => {
      if ($q.loading) {
        $q.loading.show({
          message: "Refreshing zones..."
        });
      }
      try {
        await loadZones();
        if ($q.notify) {
          $q.notify({
            color: "positive",
            message: "Map refreshed successfully",
            icon: "refresh"
          });
        }
      } catch (error) {
        console.error("Failed to refresh map:", error);
        if ($q.notify) {
          $q.notify({
            color: "negative",
            message: "Failed to refresh map",
            icon: "error"
          });
        }
      } finally {
        if ($q.loading) {
          $q.loading.hide();
        }
      }
    };
    const centerMap = () => {
      if (map) {
        map.setView(defaultCenter, defaultZoom);
        if ($q.notify) {
          $q.notify({
            color: "info",
            message: "Map centered on Ste. Anne",
            icon: "my_location",
            timeout: 1e3
          });
        }
      }
    };
    const markTodayComplete = () => {
      const today = (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", { weekday: "long" });
      const todayZones = scheduleStore.zones.filter(
        (zone) => zone.scheduledDay === today && !zone.completed
      );
      if (todayZones.length === 0) {
        if ($q.notify) {
          $q.notify({
            type: "info",
            message: `All ${today} zones are already completed!`,
            icon: "check_circle"
          });
        }
        return;
      }
      if ($q.dialog) {
        $q.dialog({
          title: "Mark Today Complete",
          message: `Mark all ${todayZones.length} ${today} zones as completed?`,
          cancel: true,
          persistent: true,
          ok: {
            color: "positive",
            label: "Mark Complete"
          }
        }).onOk(async () => {
          for (const zone of todayZones) {
            await scheduleStore.updateZoneStatus(zone.id, true);
          }
        });
      }
    };
    watch(
      () => scheduleStore.zones,
      () => {
        if (map) {
          addZonesToMap();
        }
      },
      { deep: true }
    );
    watch([showCompletedZones, showIncompleteZones], () => {
      if (map) {
        addZonesToMap();
      }
    });
    watch(
      () => scheduleStore.filters,
      () => {
        if (map) {
          console.log("Filters changed, updating map");
          addZonesToMap();
        }
      },
      { deep: true }
    );
    const __returned__ = { $q, scheduleStore, mapContainer, hoveredZone, showCompletedZones, showIncompleteZones, get map() {
      return map;
    }, set map(v) {
      map = v;
    }, get zonePolygons() {
      return zonePolygons;
    }, set zonePolygons(v) {
      zonePolygons = v;
    }, defaultCenter, defaultZoom, dayColors, loadZones, initializeMap, addZonesToMap, selectZone, refreshMap, centerMap, markTodayComplete, ref, onMounted, onUnmounted, watch, nextTick, get useScheduleStore() {
      return useScheduleStore;
    }, ZoneDetailsDialog, get useQuasar() {
      return useQuasar;
    }, get L() {
      return L;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1 = {
  key: 0,
  class: "absolute-center"
};
const _hoisted_2 = {
  key: 1,
  class: "map-container"
};
const _hoisted_3 = {
  id: "map",
  ref: "mapContainer"
};
const _hoisted_4 = { class: "map-controls" };
const _hoisted_5 = { class: "control-panel" };
const _hoisted_6 = { class: "q-gutter-xs" };
const _hoisted_7 = {
  key: 0,
  class: "zone-info-panel"
};
const _hoisted_8 = { class: "text-weight-medium" };
const _hoisted_9 = { class: "text-caption text-grey" };
const _hoisted_10 = { class: "q-mt-xs" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QPage, { class: "map-page" }, {
    default: withCtx(() => [
      $setup.scheduleStore.loading ? (openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(QSpinnerDots, {
          size: "50px",
          color: "primary"
        }),
        _cache[2] || (_cache[2] = createBaseVNode("div", { class: "text-center q-mt-md" }, "Loading zones...", -1))
      ])) : (openBlock(), createElementBlock("div", _hoisted_2, [
        createBaseVNode("div", _hoisted_3, null, 512),
        createBaseVNode("div", _hoisted_4, [
          createBaseVNode("div", _hoisted_5, [
            createVNode(QCard, {
              flat: "",
              bordered: "",
              class: "q-pa-sm"
            }, {
              default: withCtx(() => [
                _cache[4] || (_cache[4] = createBaseVNode("div", { class: "text-caption text-grey q-mb-xs" }, "Quick Actions", -1)),
                createBaseVNode("div", _hoisted_6, [
                  createVNode(QBtn, {
                    dense: "",
                    size: "sm",
                    color: "positive",
                    icon: "visibility",
                    onClick: _cache[0] || (_cache[0] = ($event) => $setup.showCompletedZones = !$setup.showCompletedZones),
                    outline: !$setup.showCompletedZones
                  }, {
                    default: withCtx(() => [
                      createVNode(QTooltip, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString($setup.showCompletedZones ? "Hide" : "Show") + " completed zones", 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["outline"]),
                  createVNode(QBtn, {
                    dense: "",
                    size: "sm",
                    color: "warning",
                    icon: "visibility",
                    onClick: _cache[1] || (_cache[1] = ($event) => $setup.showIncompleteZones = !$setup.showIncompleteZones),
                    outline: !$setup.showIncompleteZones
                  }, {
                    default: withCtx(() => [
                      createVNode(QTooltip, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString($setup.showIncompleteZones ? "Hide" : "Show") + " incomplete zones", 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["outline"]),
                  createVNode(QBtn, {
                    dense: "",
                    size: "sm",
                    color: "info",
                    icon: "center_focus_strong",
                    onClick: $setup.centerMap
                  }, {
                    default: withCtx(() => [
                      createVNode(QTooltip, null, {
                        default: withCtx(() => _cache[3] || (_cache[3] = [
                          createTextVNode("Center on Ste. Anne", -1)
                        ])),
                        _: 1,
                        __: [3]
                      })
                    ]),
                    _: 1
                  })
                ])
              ]),
              _: 1,
              __: [4]
            })
          ]),
          createVNode(QBtn, {
            round: "",
            color: "white",
            "text-color": "grey-8",
            icon: "refresh",
            onClick: $setup.refreshMap,
            class: "q-mb-sm"
          }, {
            default: withCtx(() => [
              createVNode(QTooltip, null, {
                default: withCtx(() => _cache[5] || (_cache[5] = [
                  createTextVNode("Refresh Map", -1)
                ])),
                _: 1,
                __: [5]
              })
            ]),
            _: 1
          })
        ]),
        $setup.hoveredZone ? (openBlock(), createElementBlock("div", _hoisted_7, [
          createVNode(QCard, {
            flat: "",
            bordered: ""
          }, {
            default: withCtx(() => [
              createVNode(QCardSection, {
                dense: "",
                class: "q-pa-sm"
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_8, toDisplayString($setup.hoveredZone.name), 1),
                  createBaseVNode("div", _hoisted_9, toDisplayString($setup.hoveredZone.scheduledDay) + " • " + toDisplayString($setup.hoveredZone.priority) + " priority ", 1),
                  createBaseVNode("div", _hoisted_10, [
                    createVNode(QChip, {
                      color: $setup.hoveredZone.completed ? "positive" : "warning",
                      "text-color": "white",
                      size: "sm",
                      icon: "schedule"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString($setup.hoveredZone.completed ? "Completed" : "Incomplete"), 1)
                      ]),
                      _: 1
                    }, 8, ["color"])
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ])) : createCommentVNode("", true)
      ])),
      createVNode($setup["ZoneDetailsDialog"]),
      $setup.$q.screen.lt.md ? (openBlock(), createBlock(QPageSticky, {
        key: 2,
        position: "bottom-right",
        offset: [18, 18]
      }, {
        default: withCtx(() => [
          createVNode(QFab, {
            icon: "add",
            direction: "up",
            color: "primary",
            disable: $setup.scheduleStore.loading
          }, {
            default: withCtx(() => [
              createVNode(QFabAction, {
                color: "positive",
                icon: "check_circle",
                onClick: $setup.markTodayComplete
              }, {
                default: withCtx(() => [
                  createVNode(QTooltip, {
                    anchor: "center left",
                    self: "center right"
                  }, {
                    default: withCtx(() => _cache[6] || (_cache[6] = [
                      createTextVNode(" Mark today's zones complete ", -1)
                    ])),
                    _: 1,
                    __: [6]
                  })
                ]),
                _: 1
              }),
              createVNode(QFabAction, {
                color: "info",
                icon: "map",
                onClick: $setup.centerMap
              }, {
                default: withCtx(() => [
                  createVNode(QTooltip, {
                    anchor: "center left",
                    self: "center right"
                  }, {
                    default: withCtx(() => _cache[7] || (_cache[7] = [
                      createTextVNode(" Center map ", -1)
                    ])),
                    _: 1,
                    __: [7]
                  })
                ]),
                _: 1
              }),
              createVNode(QFabAction, {
                color: "warning",
                icon: "refresh",
                onClick: $setup.refreshMap
              }, {
                default: withCtx(() => [
                  createVNode(QTooltip, {
                    anchor: "center left",
                    self: "center right"
                  }, {
                    default: withCtx(() => _cache[8] || (_cache[8] = [
                      createTextVNode(" Refresh zones ", -1)
                    ])),
                    _: 1,
                    __: [8]
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["disable"])
        ]),
        _: 1
      })) : createCommentVNode("", true)
    ]),
    _: 1
  });
}
const IndexPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0d1d3db6"], ["__file", "IndexPage.vue"]]);
export {
  IndexPage as default
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5kZXhQYWdlLURhdkxXdU90LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3NwaW5uZXIvUVNwaW5uZXJEb3RzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9mYWIvdXNlLWZhYi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvZmFiL1FGYWJBY3Rpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2ZhYi9RRmFiLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9wYWdlLXN0aWNreS91c2UtcGFnZS1zdGlja3kuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3BhZ2Utc3RpY2t5L1FQYWdlU3RpY2t5LmpzIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL0luZGV4UGFnZS52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVzZVNwaW5uZXIsIHsgdXNlU3Bpbm5lclByb3BzIH0gZnJvbSAnLi91c2Utc3Bpbm5lci5qcydcbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcblxuY29uc3QgaW5uZXJIVE1MID0gJzxjaXJjbGUgY3g9XCIxNVwiIGN5PVwiMTVcIiByPVwiMTVcIj48YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiclwiIGZyb209XCIxNVwiIHRvPVwiMTVcIiBiZWdpbj1cIjBzXCIgZHVyPVwiMC44c1wiIHZhbHVlcz1cIjE1Ozk7MTVcIiBjYWxjTW9kZT1cImxpbmVhclwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiPjwvYW5pbWF0ZT48YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPVwiZmlsbC1vcGFjaXR5XCIgZnJvbT1cIjFcIiB0bz1cIjFcIiBiZWdpbj1cIjBzXCIgZHVyPVwiMC44c1wiIHZhbHVlcz1cIjE7LjU7MVwiIGNhbGNNb2RlPVwibGluZWFyXCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCI+PC9hbmltYXRlPjwvY2lyY2xlPjxjaXJjbGUgY3g9XCI2MFwiIGN5PVwiMTVcIiByPVwiOVwiIGZpbGwtb3BhY2l0eT1cIi4zXCI+PGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cInJcIiBmcm9tPVwiOVwiIHRvPVwiOVwiIGJlZ2luPVwiMHNcIiBkdXI9XCIwLjhzXCIgdmFsdWVzPVwiOTsxNTs5XCIgY2FsY01vZGU9XCJsaW5lYXJcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIj48L2FuaW1hdGU+PGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cImZpbGwtb3BhY2l0eVwiIGZyb209XCIuNVwiIHRvPVwiLjVcIiBiZWdpbj1cIjBzXCIgZHVyPVwiMC44c1wiIHZhbHVlcz1cIi41OzE7LjVcIiBjYWxjTW9kZT1cImxpbmVhclwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiPjwvYW5pbWF0ZT48L2NpcmNsZT48Y2lyY2xlIGN4PVwiMTA1XCIgY3k9XCIxNVwiIHI9XCIxNVwiPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJyXCIgZnJvbT1cIjE1XCIgdG89XCIxNVwiIGJlZ2luPVwiMHNcIiBkdXI9XCIwLjhzXCIgdmFsdWVzPVwiMTU7OTsxNVwiIGNhbGNNb2RlPVwibGluZWFyXCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCI+PC9hbmltYXRlPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJmaWxsLW9wYWNpdHlcIiBmcm9tPVwiMVwiIHRvPVwiMVwiIGJlZ2luPVwiMHNcIiBkdXI9XCIwLjhzXCIgdmFsdWVzPVwiMTsuNTsxXCIgY2FsY01vZGU9XCJsaW5lYXJcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIj48L2FuaW1hdGU+PC9jaXJjbGU+J1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVNwaW5uZXJEb3RzJyxcblxuICBwcm9wczogdXNlU3Bpbm5lclByb3BzLFxuXG4gIHNldHVwIChwcm9wcykge1xuICAgIGNvbnN0IHsgY1NpemUsIGNsYXNzZXMgfSA9IHVzZVNwaW5uZXIocHJvcHMpXG4gICAgcmV0dXJuICgpID0+IGgoJ3N2ZycsIHtcbiAgICAgIGNsYXNzOiBjbGFzc2VzLnZhbHVlLFxuICAgICAgZmlsbDogJ2N1cnJlbnRDb2xvcicsXG4gICAgICB3aWR0aDogY1NpemUudmFsdWUsXG4gICAgICBoZWlnaHQ6IGNTaXplLnZhbHVlLFxuICAgICAgdmlld0JveDogJzAgMCAxMjAgMzAnLFxuICAgICAgeG1sbnM6ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICBpbm5lckhUTUxcbiAgICB9KVxuICB9XG59KVxuIiwiaW1wb3J0IHsgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmNvbnN0IGxhYmVsUG9zaXRpb25zID0gWyAndG9wJywgJ3JpZ2h0JywgJ2JvdHRvbScsICdsZWZ0JyBdXG5cbmV4cG9ydCBjb25zdCB1c2VGYWJQcm9wcyA9IHtcbiAgdHlwZToge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICBkZWZhdWx0OiAnYSdcbiAgfSxcblxuICBvdXRsaW5lOiBCb29sZWFuLFxuICBwdXNoOiBCb29sZWFuLFxuICBmbGF0OiBCb29sZWFuLFxuICB1bmVsZXZhdGVkOiBCb29sZWFuLFxuXG4gIGNvbG9yOiBTdHJpbmcsXG4gIHRleHRDb2xvcjogU3RyaW5nLFxuICBnbG9zc3k6IEJvb2xlYW4sXG5cbiAgc3F1YXJlOiBCb29sZWFuLFxuICBwYWRkaW5nOiBTdHJpbmcsXG5cbiAgbGFiZWw6IHtcbiAgICB0eXBlOiBbIFN0cmluZywgTnVtYmVyIF0sXG4gICAgZGVmYXVsdDogJydcbiAgfSxcbiAgbGFiZWxQb3NpdGlvbjoge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICBkZWZhdWx0OiAncmlnaHQnLFxuICAgIHZhbGlkYXRvcjogdiA9PiBsYWJlbFBvc2l0aW9ucy5pbmNsdWRlcyh2KVxuICB9LFxuICBleHRlcm5hbExhYmVsOiBCb29sZWFuLFxuICBoaWRlTGFiZWw6IHtcbiAgICB0eXBlOiBCb29sZWFuXG4gIH0sXG4gIGxhYmVsQ2xhc3M6IFsgQXJyYXksIFN0cmluZywgT2JqZWN0IF0sXG4gIGxhYmVsU3R5bGU6IFsgQXJyYXksIFN0cmluZywgT2JqZWN0IF0sXG5cbiAgZGlzYWJsZTogQm9vbGVhbixcblxuICB0YWJpbmRleDogWyBOdW1iZXIsIFN0cmluZyBdXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgc2hvd2luZykge1xuICByZXR1cm4ge1xuICAgIGZvcm1DbGFzczogY29tcHV0ZWQoKCkgPT5cbiAgICAgIGBxLWZhYi0tZm9ybS0keyBwcm9wcy5zcXVhcmUgPT09IHRydWUgPyAnc3F1YXJlJyA6ICdyb3VuZGVkJyB9YFxuICAgICksXG5cbiAgICBzdGFja2VkOiBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMuZXh0ZXJuYWxMYWJlbCA9PT0gZmFsc2VcbiAgICAgICYmIFsgJ3RvcCcsICdib3R0b20nIF0uaW5jbHVkZXMocHJvcHMubGFiZWxQb3NpdGlvbilcbiAgICApLFxuXG4gICAgbGFiZWxQcm9wczogY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgaWYgKHByb3BzLmV4dGVybmFsTGFiZWwgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgaGlkZUxhYmVsID0gcHJvcHMuaGlkZUxhYmVsID09PSBudWxsXG4gICAgICAgICAgPyBzaG93aW5nLnZhbHVlID09PSBmYWxzZVxuICAgICAgICAgIDogcHJvcHMuaGlkZUxhYmVsXG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBhY3Rpb246ICdwdXNoJyxcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBjbGFzczogW1xuICAgICAgICAgICAgICBwcm9wcy5sYWJlbENsYXNzLFxuICAgICAgICAgICAgICAncS1mYWJfX2xhYmVsIHEtdG9vbHRpcC0tc3R5bGUgcS1mYWJfX2xhYmVsLS1leHRlcm5hbCdcbiAgICAgICAgICAgICAgKyBgIHEtZmFiX19sYWJlbC0tZXh0ZXJuYWwtJHsgcHJvcHMubGFiZWxQb3NpdGlvbiB9YFxuICAgICAgICAgICAgICArIChoaWRlTGFiZWwgPT09IHRydWUgPyAnIHEtZmFiX19sYWJlbC0tZXh0ZXJuYWwtaGlkZGVuJyA6ICcnKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHN0eWxlOiBwcm9wcy5sYWJlbFN0eWxlXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFjdGlvbjogWyAnbGVmdCcsICd0b3AnIF0uaW5jbHVkZXMocHJvcHMubGFiZWxQb3NpdGlvbilcbiAgICAgICAgICA/ICd1bnNoaWZ0J1xuICAgICAgICAgIDogJ3B1c2gnLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgY2xhc3M6IFtcbiAgICAgICAgICAgIHByb3BzLmxhYmVsQ2xhc3MsXG4gICAgICAgICAgICBgcS1mYWJfX2xhYmVsIHEtZmFiX19sYWJlbC0taW50ZXJuYWwgcS1mYWJfX2xhYmVsLS1pbnRlcm5hbC0keyBwcm9wcy5sYWJlbFBvc2l0aW9uIH1gXG4gICAgICAgICAgICArIChwcm9wcy5oaWRlTGFiZWwgPT09IHRydWUgPyAnIHEtZmFiX19sYWJlbC0taW50ZXJuYWwtaGlkZGVuJyA6ICcnKVxuICAgICAgICAgIF0sXG4gICAgICAgICAgc3R5bGU6IHByb3BzLmxhYmVsU3R5bGVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cbiIsImltcG9ydCB7IGgsIGNvbXB1dGVkLCBpbmplY3QsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFCdG4gZnJvbSAnLi4vYnRuL1FCdG4uanMnXG5pbXBvcnQgUUljb24gZnJvbSAnLi4vaWNvbi9RSWNvbi5qcydcblxuaW1wb3J0IHVzZUZhYiwgeyB1c2VGYWJQcm9wcyB9IGZyb20gJy4vdXNlLWZhYi5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgZmFiS2V5IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5zeW1ib2xzL3N5bWJvbHMuanMnXG5pbXBvcnQgeyBoTWVyZ2VTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5yZW5kZXIvcmVuZGVyLmpzJ1xuaW1wb3J0IHsgbm9vcCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50L2V2ZW50LmpzJ1xuXG5jb25zdCBhbmNob3JNYXAgPSB7XG4gIHN0YXJ0OiAnc2VsZi1lbmQnLFxuICBjZW50ZXI6ICdzZWxmLWNlbnRlcicsXG4gIGVuZDogJ3NlbGYtc3RhcnQnXG59XG5cbmNvbnN0IGFuY2hvclZhbHVlcyA9IE9iamVjdC5rZXlzKGFuY2hvck1hcClcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FGYWJBY3Rpb24nLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlRmFiUHJvcHMsXG5cbiAgICBpY29uOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnJ1xuICAgIH0sXG5cbiAgICBhbmNob3I6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbGlkYXRvcjogdiA9PiBhbmNob3JWYWx1ZXMuaW5jbHVkZXModilcbiAgICB9LFxuXG4gICAgdG86IFsgU3RyaW5nLCBPYmplY3QgXSxcbiAgICByZXBsYWNlOiBCb29sZWFuXG4gIH0sXG5cbiAgZW1pdHM6IFsgJ2NsaWNrJyBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCB9KSB7XG4gICAgY29uc3QgJGZhYiA9IGluamVjdChmYWJLZXksICgpID0+ICh7XG4gICAgICBzaG93aW5nOiB7IHZhbHVlOiB0cnVlIH0sXG4gICAgICBvbkNoaWxkQ2xpY2s6IG5vb3BcbiAgICB9KSlcblxuICAgIGNvbnN0IHsgZm9ybUNsYXNzLCBsYWJlbFByb3BzIH0gPSB1c2VGYWIocHJvcHMsICRmYWIuc2hvd2luZylcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBhbGlnbiA9IGFuY2hvck1hcFsgcHJvcHMuYW5jaG9yIF1cbiAgICAgIHJldHVybiBmb3JtQ2xhc3MudmFsdWUgKyAoYWxpZ24gIT09IHZvaWQgMCA/IGAgJHsgYWxpZ24gfWAgOiAnJylcbiAgICB9KVxuXG4gICAgY29uc3QgaXNEaXNhYmxlZCA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5kaXNhYmxlID09PSB0cnVlXG4gICAgICB8fCAkZmFiLnNob3dpbmcudmFsdWUgIT09IHRydWVcbiAgICApXG5cbiAgICBmdW5jdGlvbiBjbGljayAoZSkge1xuICAgICAgJGZhYi5vbkNoaWxkQ2xpY2soZSlcbiAgICAgIGVtaXQoJ2NsaWNrJywgZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRDb250ZW50ICgpIHtcbiAgICAgIGNvbnN0IGNoaWxkID0gW11cblxuICAgICAgaWYgKHNsb3RzLmljb24gIT09IHZvaWQgMCkge1xuICAgICAgICBjaGlsZC5wdXNoKHNsb3RzLmljb24oKSlcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHByb3BzLmljb24gIT09ICcnKSB7XG4gICAgICAgIGNoaWxkLnB1c2goXG4gICAgICAgICAgaChRSWNvbiwgeyBuYW1lOiBwcm9wcy5pY29uIH0pXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgaWYgKHByb3BzLmxhYmVsICE9PSAnJyB8fCBzbG90cy5sYWJlbCAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGNoaWxkWyBsYWJlbFByb3BzLnZhbHVlLmFjdGlvbiBdKFxuICAgICAgICAgIGgoJ2RpdicsIGxhYmVsUHJvcHMudmFsdWUuZGF0YSwgc2xvdHMubGFiZWwgIT09IHZvaWQgMCA/IHNsb3RzLmxhYmVsKCkgOiBbIHByb3BzLmxhYmVsIF0pXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGhNZXJnZVNsb3Qoc2xvdHMuZGVmYXVsdCwgY2hpbGQpXG4gICAgfVxuXG4gICAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gICAgY29uc3Qgdm0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICAgIE9iamVjdC5hc3NpZ24odm0ucHJveHksIHsgY2xpY2sgfSlcblxuICAgIHJldHVybiAoKSA9PiBoKFFCdG4sIHtcbiAgICAgIGNsYXNzOiBjbGFzc2VzLnZhbHVlLFxuICAgICAgLi4ucHJvcHMsXG4gICAgICBub1dyYXA6IHRydWUsXG4gICAgICBzdGFjazogcHJvcHMuc3RhY2tlZCxcbiAgICAgIGljb246IHZvaWQgMCxcbiAgICAgIGxhYmVsOiB2b2lkIDAsXG4gICAgICBub0NhcHM6IHRydWUsXG4gICAgICBmYWJNaW5pOiB0cnVlLFxuICAgICAgZGlzYWJsZTogaXNEaXNhYmxlZC52YWx1ZSxcbiAgICAgIG9uQ2xpY2s6IGNsaWNrXG4gICAgfSwgZ2V0Q29udGVudClcbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIHByb3ZpZGUsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFCdG4gZnJvbSAnLi4vYnRuL1FCdG4uanMnXG5pbXBvcnQgUUljb24gZnJvbSAnLi4vaWNvbi9RSWNvbi5qcydcblxuaW1wb3J0IHVzZUZhYiwgeyB1c2VGYWJQcm9wcyB9IGZyb20gJy4vdXNlLWZhYi5qcydcbmltcG9ydCB1c2VJZCBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy91c2UtaWQvdXNlLWlkLmpzJ1xuaW1wb3J0IHVzZU1vZGVsVG9nZ2xlLCB7IHVzZU1vZGVsVG9nZ2xlUHJvcHMsIHVzZU1vZGVsVG9nZ2xlRW1pdHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1tb2RlbC10b2dnbGUvdXNlLW1vZGVsLXRvZ2dsZS5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QsIGhNZXJnZVNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5pbXBvcnQgeyBmYWJLZXkgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnN5bWJvbHMvc3ltYm9scy5qcydcblxuY29uc3QgZGlyZWN0aW9ucyA9IFsgJ3VwJywgJ3JpZ2h0JywgJ2Rvd24nLCAnbGVmdCcgXVxuY29uc3QgYWxpZ25WYWx1ZXMgPSBbICdsZWZ0JywgJ2NlbnRlcicsICdyaWdodCcgXVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUZhYicsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VGYWJQcm9wcyxcbiAgICAuLi51c2VNb2RlbFRvZ2dsZVByb3BzLFxuXG4gICAgaWNvbjogU3RyaW5nLFxuICAgIGFjdGl2ZUljb246IFN0cmluZyxcblxuICAgIGhpZGVJY29uOiBCb29sZWFuLFxuICAgIGhpZGVMYWJlbDoge1xuICAgICAgLi4udXNlRmFiUHJvcHMuaGlkZUxhYmVsLFxuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH0sXG5cbiAgICBkaXJlY3Rpb246IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdyaWdodCcsXG4gICAgICB2YWxpZGF0b3I6IHYgPT4gZGlyZWN0aW9ucy5pbmNsdWRlcyh2KVxuICAgIH0sXG5cbiAgICBwZXJzaXN0ZW50OiBCb29sZWFuLFxuXG4gICAgdmVydGljYWxBY3Rpb25zQWxpZ246IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdjZW50ZXInLFxuICAgICAgdmFsaWRhdG9yOiB2ID0+IGFsaWduVmFsdWVzLmluY2x1ZGVzKHYpXG4gICAgfVxuICB9LFxuXG4gIGVtaXRzOiB1c2VNb2RlbFRvZ2dsZUVtaXRzLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cyB9KSB7XG4gICAgY29uc3QgdHJpZ2dlclJlZiA9IHJlZihudWxsKVxuICAgIGNvbnN0IHNob3dpbmcgPSByZWYocHJvcHMubW9kZWxWYWx1ZSA9PT0gdHJ1ZSlcbiAgICBjb25zdCB0YXJnZXRVaWQgPSB1c2VJZCgpXG5cbiAgICBjb25zdCB7IHByb3h5OiB7ICRxIH0gfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3QgeyBmb3JtQ2xhc3MsIGxhYmVsUHJvcHMgfSA9IHVzZUZhYihwcm9wcywgc2hvd2luZylcblxuICAgIGNvbnN0IGhpZGVPblJvdXRlQ2hhbmdlID0gY29tcHV0ZWQoKCkgPT4gcHJvcHMucGVyc2lzdGVudCAhPT0gdHJ1ZSlcblxuICAgIGNvbnN0IHsgaGlkZSwgdG9nZ2xlIH0gPSB1c2VNb2RlbFRvZ2dsZSh7XG4gICAgICBzaG93aW5nLFxuICAgICAgaGlkZU9uUm91dGVDaGFuZ2VcbiAgICB9KVxuXG4gICAgY29uc3Qgc2xvdFNjb3BlID0gY29tcHV0ZWQoKCkgPT4gKHsgb3BlbmVkOiBzaG93aW5nLnZhbHVlIH0pKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1mYWIgei1mYWIgcm93IGlubGluZSBqdXN0aWZ5LWNlbnRlcidcbiAgICAgICsgYCBxLWZhYi0tYWxpZ24tJHsgcHJvcHMudmVydGljYWxBY3Rpb25zQWxpZ24gfSAkeyBmb3JtQ2xhc3MudmFsdWUgfWBcbiAgICAgICsgKHNob3dpbmcudmFsdWUgPT09IHRydWUgPyAnIHEtZmFiLS1vcGVuZWQnIDogJyBxLWZhYi0tY2xvc2VkJylcbiAgICApXG5cbiAgICBjb25zdCBhY3Rpb25DbGFzcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1mYWJfX2FjdGlvbnMgZmxleCBuby13cmFwIGlubGluZSdcbiAgICAgICsgYCBxLWZhYl9fYWN0aW9ucy0tJHsgcHJvcHMuZGlyZWN0aW9uIH1gXG4gICAgICArIGAgcS1mYWJfX2FjdGlvbnMtLSR7IHNob3dpbmcudmFsdWUgPT09IHRydWUgPyAnb3BlbmVkJyA6ICdjbG9zZWQnIH1gXG4gICAgKVxuXG4gICAgY29uc3QgYWN0aW9uQXR0cnMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBhdHRycyA9IHtcbiAgICAgICAgaWQ6IHRhcmdldFVpZC52YWx1ZSxcbiAgICAgICAgcm9sZTogJ21lbnUnXG4gICAgICB9XG5cbiAgICAgIGlmIChzaG93aW5nLnZhbHVlICE9PSB0cnVlKSB7XG4gICAgICAgIGF0dHJzWyAnYXJpYS1oaWRkZW4nIF0gPSAndHJ1ZSdcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGF0dHJzXG4gICAgfSlcblxuICAgIGNvbnN0IGljb25Ib2xkZXJDbGFzcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1mYWJfX2ljb24taG9sZGVyICdcbiAgICAgICsgYCBxLWZhYl9faWNvbi1ob2xkZXItLSR7IHNob3dpbmcudmFsdWUgPT09IHRydWUgPyAnb3BlbmVkJyA6ICdjbG9zZWQnIH1gXG4gICAgKVxuXG4gICAgZnVuY3Rpb24gZ2V0SWNvbiAoa2ViYWIsIGNhbWVsKSB7XG4gICAgICBjb25zdCBzbG90Rm4gPSBzbG90c1sga2ViYWIgXVxuICAgICAgY29uc3QgY2xhc3NlcyA9IGBxLWZhYl9fJHsga2ViYWIgfSBhYnNvbHV0ZS1mdWxsYFxuXG4gICAgICByZXR1cm4gc2xvdEZuID09PSB2b2lkIDBcbiAgICAgICAgPyBoKFFJY29uLCB7IGNsYXNzOiBjbGFzc2VzLCBuYW1lOiBwcm9wc1sgY2FtZWwgXSB8fCAkcS5pY29uU2V0LmZhYlsgY2FtZWwgXSB9KVxuICAgICAgICA6IGgoJ2RpdicsIHsgY2xhc3M6IGNsYXNzZXMgfSwgc2xvdEZuKHNsb3RTY29wZS52YWx1ZSkpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VHJpZ2dlckNvbnRlbnQgKCkge1xuICAgICAgY29uc3QgY2hpbGQgPSBbXVxuXG4gICAgICBwcm9wcy5oaWRlSWNvbiAhPT0gdHJ1ZSAmJiBjaGlsZC5wdXNoKFxuICAgICAgICBoKCdkaXYnLCB7IGNsYXNzOiBpY29uSG9sZGVyQ2xhc3MudmFsdWUgfSwgW1xuICAgICAgICAgIGdldEljb24oJ2ljb24nLCAnaWNvbicpLFxuICAgICAgICAgIGdldEljb24oJ2FjdGl2ZS1pY29uJywgJ2FjdGl2ZUljb24nKVxuICAgICAgICBdKVxuICAgICAgKVxuXG4gICAgICBpZiAocHJvcHMubGFiZWwgIT09ICcnIHx8IHNsb3RzLmxhYmVsICE9PSB2b2lkIDApIHtcbiAgICAgICAgY2hpbGRbIGxhYmVsUHJvcHMudmFsdWUuYWN0aW9uIF0oXG4gICAgICAgICAgaCgnZGl2JywgbGFiZWxQcm9wcy52YWx1ZS5kYXRhLCBzbG90cy5sYWJlbCAhPT0gdm9pZCAwID8gc2xvdHMubGFiZWwoc2xvdFNjb3BlLnZhbHVlKSA6IFsgcHJvcHMubGFiZWwgXSlcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gaE1lcmdlU2xvdChzbG90cy50b29sdGlwLCBjaGlsZClcbiAgICB9XG5cbiAgICBwcm92aWRlKGZhYktleSwge1xuICAgICAgc2hvd2luZyxcblxuICAgICAgb25DaGlsZENsaWNrIChldnQpIHtcbiAgICAgICAgaGlkZShldnQpXG5cbiAgICAgICAgaWYgKGV2dD8ucUF2b2lkRm9jdXMgIT09IHRydWUpIHtcbiAgICAgICAgICB0cmlnZ2VyUmVmLnZhbHVlPy4kZWwuZm9jdXMoKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcblxuICAgIHJldHVybiAoKSA9PiBoKCdkaXYnLCB7XG4gICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZVxuICAgIH0sIFtcbiAgICAgIGgoUUJ0biwge1xuICAgICAgICByZWY6IHRyaWdnZXJSZWYsXG4gICAgICAgIGNsYXNzOiBmb3JtQ2xhc3MudmFsdWUsXG4gICAgICAgIC4uLnByb3BzLFxuICAgICAgICBub1dyYXA6IHRydWUsXG4gICAgICAgIHN0YWNrOiBwcm9wcy5zdGFja2VkLFxuICAgICAgICBhbGlnbjogdm9pZCAwLFxuICAgICAgICBpY29uOiB2b2lkIDAsXG4gICAgICAgIGxhYmVsOiB2b2lkIDAsXG4gICAgICAgIG5vQ2FwczogdHJ1ZSxcbiAgICAgICAgZmFiOiB0cnVlLFxuICAgICAgICAnYXJpYS1leHBhbmRlZCc6IHNob3dpbmcudmFsdWUgPT09IHRydWUgPyAndHJ1ZScgOiAnZmFsc2UnLFxuICAgICAgICAnYXJpYS1oYXNwb3B1cCc6ICd0cnVlJyxcbiAgICAgICAgJ2FyaWEtY29udHJvbHMnOiB0YXJnZXRVaWQudmFsdWUsXG4gICAgICAgIG9uQ2xpY2s6IHRvZ2dsZVxuICAgICAgfSwgZ2V0VHJpZ2dlckNvbnRlbnQpLFxuXG4gICAgICBoKCdkaXYnLCB7IGNsYXNzOiBhY3Rpb25DbGFzcy52YWx1ZSwgLi4uYWN0aW9uQXR0cnMudmFsdWUgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gICAgXSlcbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIGNvbXB1dGVkLCBpbmplY3QsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5pbXBvcnQgeyBsYXlvdXRLZXksIGVtcHR5UmVuZGVyRm4gfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnN5bWJvbHMvc3ltYm9scy5qcydcblxuZXhwb3J0IGNvbnN0IHVzZVBhZ2VTdGlja3lQcm9wcyA9IHtcbiAgcG9zaXRpb246IHtcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgZGVmYXVsdDogJ2JvdHRvbS1yaWdodCcsXG4gICAgdmFsaWRhdG9yOiB2ID0+IFtcbiAgICAgICd0b3AtcmlnaHQnLCAndG9wLWxlZnQnLFxuICAgICAgJ2JvdHRvbS1yaWdodCcsICdib3R0b20tbGVmdCcsXG4gICAgICAndG9wJywgJ3JpZ2h0JywgJ2JvdHRvbScsICdsZWZ0J1xuICAgIF0uaW5jbHVkZXModilcbiAgfSxcbiAgb2Zmc2V0OiB7XG4gICAgdHlwZTogQXJyYXksXG4gICAgdmFsaWRhdG9yOiB2ID0+IHYubGVuZ3RoID09PSAyXG4gIH0sXG4gIGV4cGFuZDogQm9vbGVhblxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHsgcHJvcHMsIHByb3h5OiB7ICRxIH0gfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgY29uc3QgJGxheW91dCA9IGluamVjdChsYXlvdXRLZXksIGVtcHR5UmVuZGVyRm4pXG4gIGlmICgkbGF5b3V0ID09PSBlbXB0eVJlbmRlckZuKSB7XG4gICAgY29uc29sZS5lcnJvcignUVBhZ2VTdGlja3kgbmVlZHMgdG8gYmUgY2hpbGQgb2YgUUxheW91dCcpXG4gICAgcmV0dXJuIGVtcHR5UmVuZGVyRm5cbiAgfVxuXG4gIGNvbnN0IGF0dGFjaCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBjb25zdCBwb3MgPSBwcm9wcy5wb3NpdGlvblxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHRvcDogcG9zLmluZGV4T2YoJ3RvcCcpICE9PSAtMSxcbiAgICAgIHJpZ2h0OiBwb3MuaW5kZXhPZigncmlnaHQnKSAhPT0gLTEsXG4gICAgICBib3R0b206IHBvcy5pbmRleE9mKCdib3R0b20nKSAhPT0gLTEsXG4gICAgICBsZWZ0OiBwb3MuaW5kZXhPZignbGVmdCcpICE9PSAtMSxcbiAgICAgIHZlcnRpY2FsOiBwb3MgPT09ICd0b3AnIHx8IHBvcyA9PT0gJ2JvdHRvbScsXG4gICAgICBob3Jpem9udGFsOiBwb3MgPT09ICdsZWZ0JyB8fCBwb3MgPT09ICdyaWdodCdcbiAgICB9XG4gIH0pXG5cbiAgY29uc3QgdG9wID0gY29tcHV0ZWQoKCkgPT4gJGxheW91dC5oZWFkZXIub2Zmc2V0KVxuICBjb25zdCByaWdodCA9IGNvbXB1dGVkKCgpID0+ICRsYXlvdXQucmlnaHQub2Zmc2V0KVxuICBjb25zdCBib3R0b20gPSBjb21wdXRlZCgoKSA9PiAkbGF5b3V0LmZvb3Rlci5vZmZzZXQpXG4gIGNvbnN0IGxlZnQgPSBjb21wdXRlZCgoKSA9PiAkbGF5b3V0LmxlZnQub2Zmc2V0KVxuXG4gIGNvbnN0IHN0eWxlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGxldCBwb3NYID0gMCwgcG9zWSA9IDBcblxuICAgIGNvbnN0IHNpZGUgPSBhdHRhY2gudmFsdWVcbiAgICBjb25zdCBkaXIgPSAkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/IC0xIDogMVxuXG4gICAgaWYgKHNpZGUudG9wID09PSB0cnVlICYmIHRvcC52YWx1ZSAhPT0gMCkge1xuICAgICAgcG9zWSA9IGAkeyB0b3AudmFsdWUgfXB4YFxuICAgIH1cbiAgICBlbHNlIGlmIChzaWRlLmJvdHRvbSA9PT0gdHJ1ZSAmJiBib3R0b20udmFsdWUgIT09IDApIHtcbiAgICAgIHBvc1kgPSBgJHsgLWJvdHRvbS52YWx1ZSB9cHhgXG4gICAgfVxuXG4gICAgaWYgKHNpZGUubGVmdCA9PT0gdHJ1ZSAmJiBsZWZ0LnZhbHVlICE9PSAwKSB7XG4gICAgICBwb3NYID0gYCR7IGRpciAqIGxlZnQudmFsdWUgfXB4YFxuICAgIH1cbiAgICBlbHNlIGlmIChzaWRlLnJpZ2h0ID09PSB0cnVlICYmIHJpZ2h0LnZhbHVlICE9PSAwKSB7XG4gICAgICBwb3NYID0gYCR7IC1kaXIgKiByaWdodC52YWx1ZSB9cHhgXG4gICAgfVxuXG4gICAgY29uc3QgY3NzID0geyB0cmFuc2Zvcm06IGB0cmFuc2xhdGUoJHsgcG9zWCB9LCAkeyBwb3NZIH0pYCB9XG5cbiAgICBpZiAocHJvcHMub2Zmc2V0KSB7XG4gICAgICBjc3MubWFyZ2luID0gYCR7IHByb3BzLm9mZnNldFsgMSBdIH1weCAkeyBwcm9wcy5vZmZzZXRbIDAgXSB9cHhgXG4gICAgfVxuXG4gICAgaWYgKHNpZGUudmVydGljYWwgPT09IHRydWUpIHtcbiAgICAgIGlmIChsZWZ0LnZhbHVlICE9PSAwKSB7XG4gICAgICAgIGNzc1sgJHEubGFuZy5ydGwgPT09IHRydWUgPyAncmlnaHQnIDogJ2xlZnQnIF0gPSBgJHsgbGVmdC52YWx1ZSB9cHhgXG4gICAgICB9XG4gICAgICBpZiAocmlnaHQudmFsdWUgIT09IDApIHtcbiAgICAgICAgY3NzWyAkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/ICdsZWZ0JyA6ICdyaWdodCcgXSA9IGAkeyByaWdodC52YWx1ZSB9cHhgXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHNpZGUuaG9yaXpvbnRhbCA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKHRvcC52YWx1ZSAhPT0gMCkge1xuICAgICAgICBjc3MudG9wID0gYCR7IHRvcC52YWx1ZSB9cHhgXG4gICAgICB9XG4gICAgICBpZiAoYm90dG9tLnZhbHVlICE9PSAwKSB7XG4gICAgICAgIGNzcy5ib3R0b20gPSBgJHsgYm90dG9tLnZhbHVlIH1weGBcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY3NzXG4gIH0pXG5cbiAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgYHEtcGFnZS1zdGlja3kgcm93IGZsZXgtY2VudGVyIGZpeGVkLSR7IHByb3BzLnBvc2l0aW9uIH1gXG4gICAgKyBgIHEtcGFnZS1zdGlja3ktLSR7IHByb3BzLmV4cGFuZCA9PT0gdHJ1ZSA/ICdleHBhbmQnIDogJ3NocmluaycgfWBcbiAgKVxuXG4gIGZ1bmN0aW9uIGdldFN0aWNreUNvbnRlbnQgKHNsb3RzKSB7XG4gICAgY29uc3QgY29udGVudCA9IGhTbG90KHNsb3RzLmRlZmF1bHQpXG5cbiAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUsXG4gICAgICBzdHlsZTogc3R5bGUudmFsdWVcbiAgICB9LFxuICAgIHByb3BzLmV4cGFuZCA9PT0gdHJ1ZVxuICAgICAgPyBjb250ZW50XG4gICAgICA6IFsgaCgnZGl2JywgY29udGVudCkgXVxuICAgIClcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgJGxheW91dCxcbiAgICBnZXRTdGlja3lDb250ZW50XG4gIH1cbn1cbiIsImltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB1c2VQYWdlU3RpY2t5LCB7IHVzZVBhZ2VTdGlja3lQcm9wcyB9IGZyb20gJy4vdXNlLXBhZ2Utc3RpY2t5LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVBhZ2VTdGlja3knLFxuXG4gIHByb3BzOiB1c2VQYWdlU3RpY2t5UHJvcHMsXG5cbiAgc2V0dXAgKF8sIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IHsgZ2V0U3RpY2t5Q29udGVudCB9ID0gdXNlUGFnZVN0aWNreSgpXG4gICAgcmV0dXJuICgpID0+IGdldFN0aWNreUNvbnRlbnQoc2xvdHMpXG4gIH1cbn0pXG4iLCI8dGVtcGxhdGU+XG4gIDxxLXBhZ2UgY2xhc3M9XCJtYXAtcGFnZVwiPlxuICAgIDwhLS0gTG9hZGluZyBTdGF0ZSAtLT5cbiAgICA8ZGl2IHYtaWY9XCJzY2hlZHVsZVN0b3JlLmxvYWRpbmdcIiBjbGFzcz1cImFic29sdXRlLWNlbnRlclwiPlxuICAgICAgPHEtc3Bpbm5lci1kb3RzIHNpemU9XCI1MHB4XCIgY29sb3I9XCJwcmltYXJ5XCIgLz5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWNlbnRlciBxLW10LW1kXCI+TG9hZGluZyB6b25lcy4uLjwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPCEtLSBNYXAgQ29udGFpbmVyIC0tPlxuICAgIDxkaXYgdi1lbHNlIGNsYXNzPVwibWFwLWNvbnRhaW5lclwiPlxuICAgICAgPGRpdiBpZD1cIm1hcFwiIHJlZj1cIm1hcENvbnRhaW5lclwiPjwvZGl2PlxuXG4gICAgICA8IS0tIE1hcCBDb250cm9scyBPdmVybGF5IC0tPlxuICAgICAgPGRpdiBjbGFzcz1cIm1hcC1jb250cm9sc1wiPlxuICAgICAgICA8IS0tIFF1aWNrIFN0YXR1cyBUb2dnbGUgLS0+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sLXBhbmVsXCI+XG4gICAgICAgICAgPHEtY2FyZCBmbGF0IGJvcmRlcmVkIGNsYXNzPVwicS1wYS1zbVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtY2FwdGlvbiB0ZXh0LWdyZXkgcS1tYi14c1wiPlF1aWNrIEFjdGlvbnM8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLWd1dHRlci14c1wiPlxuICAgICAgICAgICAgICA8cS1idG5cbiAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgIHNpemU9XCJzbVwiXG4gICAgICAgICAgICAgICAgY29sb3I9XCJwb3NpdGl2ZVwiXG4gICAgICAgICAgICAgICAgaWNvbj1cInZpc2liaWxpdHlcIlxuICAgICAgICAgICAgICAgIEBjbGljaz1cInNob3dDb21wbGV0ZWRab25lcyA9ICFzaG93Q29tcGxldGVkWm9uZXNcIlxuICAgICAgICAgICAgICAgIDpvdXRsaW5lPVwiIXNob3dDb21wbGV0ZWRab25lc1wiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8cS10b29sdGlwPnt7IHNob3dDb21wbGV0ZWRab25lcyA/ICdIaWRlJyA6ICdTaG93JyB9fSBjb21wbGV0ZWQgem9uZXM8L3EtdG9vbHRpcD5cbiAgICAgICAgICAgICAgPC9xLWJ0bj5cblxuICAgICAgICAgICAgICA8cS1idG5cbiAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgIHNpemU9XCJzbVwiXG4gICAgICAgICAgICAgICAgY29sb3I9XCJ3YXJuaW5nXCJcbiAgICAgICAgICAgICAgICBpY29uPVwidmlzaWJpbGl0eVwiXG4gICAgICAgICAgICAgICAgQGNsaWNrPVwic2hvd0luY29tcGxldGVab25lcyA9ICFzaG93SW5jb21wbGV0ZVpvbmVzXCJcbiAgICAgICAgICAgICAgICA6b3V0bGluZT1cIiFzaG93SW5jb21wbGV0ZVpvbmVzXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxxLXRvb2x0aXA+e3sgc2hvd0luY29tcGxldGVab25lcyA/ICdIaWRlJyA6ICdTaG93JyB9fSBpbmNvbXBsZXRlIHpvbmVzPC9xLXRvb2x0aXA+XG4gICAgICAgICAgICAgIDwvcS1idG4+XG5cbiAgICAgICAgICAgICAgPHEtYnRuIGRlbnNlIHNpemU9XCJzbVwiIGNvbG9yPVwiaW5mb1wiIGljb249XCJjZW50ZXJfZm9jdXNfc3Ryb25nXCIgQGNsaWNrPVwiY2VudGVyTWFwXCI+XG4gICAgICAgICAgICAgICAgPHEtdG9vbHRpcD5DZW50ZXIgb24gU3RlLiBBbm5lPC9xLXRvb2x0aXA+XG4gICAgICAgICAgICAgIDwvcS1idG4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L3EtY2FyZD5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPCEtLSBSZWZyZXNoIEJ1dHRvbiAtLT5cbiAgICAgICAgPHEtYnRuXG4gICAgICAgICAgcm91bmRcbiAgICAgICAgICBjb2xvcj1cIndoaXRlXCJcbiAgICAgICAgICB0ZXh0LWNvbG9yPVwiZ3JleS04XCJcbiAgICAgICAgICBpY29uPVwicmVmcmVzaFwiXG4gICAgICAgICAgQGNsaWNrPVwicmVmcmVzaE1hcFwiXG4gICAgICAgICAgY2xhc3M9XCJxLW1iLXNtXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxxLXRvb2x0aXA+UmVmcmVzaCBNYXA8L3EtdG9vbHRpcD5cbiAgICAgICAgPC9xLWJ0bj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8IS0tIFpvbmUgSW5mbyBQYW5lbCAtLT5cbiAgICAgIDxkaXYgdi1pZj1cImhvdmVyZWRab25lXCIgY2xhc3M9XCJ6b25lLWluZm8tcGFuZWxcIj5cbiAgICAgICAgPHEtY2FyZCBmbGF0IGJvcmRlcmVkPlxuICAgICAgICAgIDxxLWNhcmQtc2VjdGlvbiBkZW5zZSBjbGFzcz1cInEtcGEtc21cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXdlaWdodC1tZWRpdW1cIj57eyBob3ZlcmVkWm9uZS5uYW1lIH19PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1jYXB0aW9uIHRleHQtZ3JleVwiPlxuICAgICAgICAgICAgICB7eyBob3ZlcmVkWm9uZS5zY2hlZHVsZWREYXkgfX0g4oCiIHt7IGhvdmVyZWRab25lLnByaW9yaXR5IH19IHByaW9yaXR5XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLW10LXhzXCI+XG4gICAgICAgICAgICAgIDxxLWNoaXBcbiAgICAgICAgICAgICAgICA6Y29sb3I9XCJob3ZlcmVkWm9uZS5jb21wbGV0ZWQgPyAncG9zaXRpdmUnIDogJ3dhcm5pbmcnXCJcbiAgICAgICAgICAgICAgICB0ZXh0LWNvbG9yPVwid2hpdGVcIlxuICAgICAgICAgICAgICAgIHNpemU9XCJzbVwiXG4gICAgICAgICAgICAgICAgaWNvbj1cInNjaGVkdWxlXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHt7IGhvdmVyZWRab25lLmNvbXBsZXRlZCA/ICdDb21wbGV0ZWQnIDogJ0luY29tcGxldGUnIH19XG4gICAgICAgICAgICAgIDwvcS1jaGlwPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgPC9xLWNhcmQ+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDwhLS0gWm9uZSBEZXRhaWxzIERpYWxvZyAtLT5cbiAgICA8Wm9uZURldGFpbHNEaWFsb2cgLz5cblxuICAgIDwhLS0gTW9iaWxlIEZhYiBmb3IgUXVpY2sgQWN0aW9ucyAtLT5cbiAgICA8cS1wYWdlLXN0aWNreSB2LWlmPVwiJHEuc2NyZWVuLmx0Lm1kXCIgcG9zaXRpb249XCJib3R0b20tcmlnaHRcIiA6b2Zmc2V0PVwiWzE4LCAxOF1cIj5cbiAgICAgIDxxLWZhYiBpY29uPVwiYWRkXCIgZGlyZWN0aW9uPVwidXBcIiBjb2xvcj1cInByaW1hcnlcIiA6ZGlzYWJsZT1cInNjaGVkdWxlU3RvcmUubG9hZGluZ1wiPlxuICAgICAgICA8cS1mYWItYWN0aW9uIGNvbG9yPVwicG9zaXRpdmVcIiBpY29uPVwiY2hlY2tfY2lyY2xlXCIgQGNsaWNrPVwibWFya1RvZGF5Q29tcGxldGVcIj5cbiAgICAgICAgICA8cS10b29sdGlwIGFuY2hvcj1cImNlbnRlciBsZWZ0XCIgc2VsZj1cImNlbnRlciByaWdodFwiPlxuICAgICAgICAgICAgTWFyayB0b2RheSdzIHpvbmVzIGNvbXBsZXRlXG4gICAgICAgICAgPC9xLXRvb2x0aXA+XG4gICAgICAgIDwvcS1mYWItYWN0aW9uPlxuXG4gICAgICAgIDxxLWZhYi1hY3Rpb24gY29sb3I9XCJpbmZvXCIgaWNvbj1cIm1hcFwiIEBjbGljaz1cImNlbnRlck1hcFwiPlxuICAgICAgICAgIDxxLXRvb2x0aXAgYW5jaG9yPVwiY2VudGVyIGxlZnRcIiBzZWxmPVwiY2VudGVyIHJpZ2h0XCI+IENlbnRlciBtYXAgPC9xLXRvb2x0aXA+XG4gICAgICAgIDwvcS1mYWItYWN0aW9uPlxuXG4gICAgICAgIDxxLWZhYi1hY3Rpb24gY29sb3I9XCJ3YXJuaW5nXCIgaWNvbj1cInJlZnJlc2hcIiBAY2xpY2s9XCJyZWZyZXNoTWFwXCI+XG4gICAgICAgICAgPHEtdG9vbHRpcCBhbmNob3I9XCJjZW50ZXIgbGVmdFwiIHNlbGY9XCJjZW50ZXIgcmlnaHRcIj4gUmVmcmVzaCB6b25lcyA8L3EtdG9vbHRpcD5cbiAgICAgICAgPC9xLWZhYi1hY3Rpb24+XG4gICAgICA8L3EtZmFiPlxuICAgIDwvcS1wYWdlLXN0aWNreT5cbiAgPC9xLXBhZ2U+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgcmVmLCBvbk1vdW50ZWQsIG9uVW5tb3VudGVkLCB3YXRjaCwgbmV4dFRpY2sgfSBmcm9tICd2dWUnXG5pbXBvcnQgeyB1c2VTY2hlZHVsZVN0b3JlIH0gZnJvbSAnLi4vc3RvcmVzL3NjaGVkdWxlLXN0b3JlLmpzJ1xuaW1wb3J0IFpvbmVEZXRhaWxzRGlhbG9nIGZyb20gJy4uL2NvbXBvbmVudHMvWm9uZURldGFpbHNEaWFsb2cudnVlJ1xuaW1wb3J0IHsgdXNlUXVhc2FyIH0gZnJvbSAncXVhc2FyJ1xuaW1wb3J0IEwgZnJvbSAnbGVhZmxldCcgLy8gU3RhdGljIGltcG9ydCAtIENTUyBzaG91bGQgYmUgbG9hZGVkIHZpYSBib290IGZpbGVcblxuLy8gUXVhc2FyIGluc3RhbmNlIGZvciBub3RpZmljYXRpb25zXG5jb25zdCAkcSA9IHVzZVF1YXNhcigpXG5cbi8vIFN0b3JlXG5jb25zdCBzY2hlZHVsZVN0b3JlID0gdXNlU2NoZWR1bGVTdG9yZSgpXG5cbi8vIFJlZnNcbmNvbnN0IG1hcENvbnRhaW5lciA9IHJlZihudWxsKVxuY29uc3QgaG92ZXJlZFpvbmUgPSByZWYobnVsbClcbmNvbnN0IHNob3dDb21wbGV0ZWRab25lcyA9IHJlZih0cnVlKVxuY29uc3Qgc2hvd0luY29tcGxldGVab25lcyA9IHJlZih0cnVlKVxuXG4vLyBNYXAgaW5zdGFuY2UgYW5kIHJlbGF0ZWQgZGF0YVxubGV0IG1hcCA9IG51bGxcbmxldCB6b25lUG9seWdvbnMgPSBbXVxuXG4vLyBEZWZhdWx0IG1hcCBjZW50ZXIgKFN0ZS4gQW5uZSwgTWFuaXRvYmEpXG5jb25zdCBkZWZhdWx0Q2VudGVyID0gWzQ5LjY3MTE1MTE0MTcxMTQzNCwgLTk2LjY1Mjk2NTM1Njk5ODYyXVxuY29uc3QgZGVmYXVsdFpvb20gPSAxNFxuXG4vLyBEYXkgY29sb3IgbWFwcGluZ1xuY29uc3QgZGF5Q29sb3JzID0ge1xuICBNb25kYXk6ICcjMjE5NkYzJyxcbiAgVHVlc2RheTogJyM0Q0FGNTAnLFxuICBXZWRuZXNkYXk6ICcjRkY5ODAwJyxcbiAgVGh1cnNkYXk6ICcjOUMyN0IwJyxcbiAgRnJpZGF5OiAnIzI0MUZFMCcsIC8vIEJsdWUtcHVycGxlXG59XG5cbi8vIExpZmVjeWNsZSBob29rc1xub25Nb3VudGVkKGFzeW5jICgpID0+IHtcbiAgY29uc29sZS5sb2coJ0luZGV4UGFnZSBtb3VudGVkJylcblxuICAvLyBTZXQgdXAgbm90aWZpY2F0aW9ucyBmb3IgdGhlIHN0b3JlXG4gIGlmIChzY2hlZHVsZVN0b3JlLnNldE5vdGlmeUZ1bmN0aW9uICYmICRxLm5vdGlmeSkge1xuICAgIHNjaGVkdWxlU3RvcmUuc2V0Tm90aWZ5RnVuY3Rpb24oJHEubm90aWZ5KVxuICB9XG5cbiAgYXdhaXQgbG9hZFpvbmVzKClcbiAgYXdhaXQgaW5pdGlhbGl6ZU1hcCgpXG59KVxuXG5vblVubW91bnRlZCgoKSA9PiB7XG4gIGNvbnNvbGUubG9nKCdJbmRleFBhZ2UgdW5tb3VudGluZycpXG4gIGlmIChtYXApIHtcbiAgICBtYXAucmVtb3ZlKClcbiAgICBtYXAgPSBudWxsXG4gIH1cbn0pXG5cbi8vIE1ldGhvZHNcbmNvbnN0IGxvYWRab25lcyA9IGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zb2xlLmxvZygnTG9hZGluZyB6b25lcy4uLicpXG4gICAgYXdhaXQgc2NoZWR1bGVTdG9yZS5pbml0aWFsaXplU3RvcmUoKVxuICAgIGNvbnNvbGUubG9nKCdab25lcyBsb2FkZWQ6Jywgc2NoZWR1bGVTdG9yZS56b25lcy5sZW5ndGgpXG5cbiAgICBpZiAobWFwKSB7XG4gICAgICBhZGRab25lc1RvTWFwKClcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIGxvYWQgem9uZXM6JywgZXJyb3IpXG4gICAgaWYgKCRxLm5vdGlmeSkge1xuICAgICAgJHEubm90aWZ5KHtcbiAgICAgICAgY29sb3I6ICduZWdhdGl2ZScsXG4gICAgICAgIG1lc3NhZ2U6ICdGYWlsZWQgdG8gbG9hZCB6b25lcycsXG4gICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICB9KVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBpbml0aWFsaXplTWFwID0gYXN5bmMgKCkgPT4ge1xuICAvLyBXYWl0IGZvciBET00gdG8gYmUgcmVhZHlcbiAgYXdhaXQgbmV4dFRpY2soKVxuICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCAxMDApKVxuXG4gIGlmICghbWFwQ29udGFpbmVyLnZhbHVlKSB7XG4gICAgY29uc29sZS5lcnJvcignTWFwIGNvbnRhaW5lciBub3QgZm91bmQnKVxuICAgIHJldHVyblxuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zb2xlLmxvZygnSW5pdGlhbGl6aW5nIG1hcC4uLicpXG4gICAgY29uc29sZS5sb2coJ0xlYWZsZXQgb2JqZWN0OicsIEwpXG4gICAgY29uc29sZS5sb2coJ01hcCBjb250YWluZXIgZWxlbWVudDonLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJykpXG5cbiAgICAvLyBJbml0aWFsaXplIG1hcCB3aXRoIHNpbXBsZSBvcHRpb25zXG4gICAgbWFwID0gTC5tYXAoJ21hcCcsIHtcbiAgICAgIC8vIEVuc3VyZSB0aGUgbWFwIHJlbmRlcnMgcHJvcGVybHlcbiAgICAgIHByZWZlckNhbnZhczogZmFsc2UsXG4gICAgICB6b29tQ29udHJvbDogdHJ1ZSxcbiAgICAgIGF0dHJpYnV0aW9uQ29udHJvbDogdHJ1ZSxcbiAgICB9KS5zZXRWaWV3KGRlZmF1bHRDZW50ZXIsIGRlZmF1bHRab29tKVxuXG4gICAgY29uc29sZS5sb2coJ01hcCBjcmVhdGVkOicsIG1hcClcblxuICAgIC8vIEFkZCB0aWxlIGxheWVyIHdpdGggZXJyb3IgaGFuZGxpbmdcbiAgICBjb25zdCB0aWxlTGF5ZXIgPSBMLnRpbGVMYXllcignaHR0cHM6Ly97c30udGlsZS5vcGVuc3RyZWV0bWFwLm9yZy97en0ve3h9L3t5fS5wbmcnLCB7XG4gICAgICBhdHRyaWJ1dGlvbjogJ8KpIE9wZW5TdHJlZXRNYXAgY29udHJpYnV0b3JzJyxcbiAgICAgIG1heFpvb206IDE5LFxuICAgICAgdGlsZVNpemU6IDI1NixcbiAgICAgIHpvb21PZmZzZXQ6IDAsXG4gICAgfSlcblxuICAgIHRpbGVMYXllci5vbigndGlsZWVycm9yJywgKGUpID0+IHtcbiAgICAgIGNvbnNvbGUud2FybignVGlsZSBsb2FkIGVycm9yOicsIGUpXG4gICAgfSlcblxuICAgIHRpbGVMYXllci5vbigndGlsZWxvYWQnLCAoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnVGlsZSBsb2FkZWQgc3VjY2Vzc2Z1bGx5JylcbiAgICB9KVxuXG4gICAgdGlsZUxheWVyLmFkZFRvKG1hcClcblxuICAgIGNvbnNvbGUubG9nKCdUaWxlIGxheWVyIGFkZGVkJylcblxuICAgIC8vIEZvcmNlIG1hcCB0byByZW5kZXIgYW5kIGNhbGN1bGF0ZSBzaXplXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAobWFwKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdJbnZhbGlkYXRpbmcgbWFwIHNpemUuLi4nKVxuICAgICAgICBtYXAuaW52YWxpZGF0ZVNpemUodHJ1ZSlcblxuICAgICAgICAvLyBGb3JjZSBhIHJlZHJhd1xuICAgICAgICBtYXAuZWFjaExheWVyKChsYXllcikgPT4ge1xuICAgICAgICAgIGlmIChsYXllci5yZWRyYXcpIHtcbiAgICAgICAgICAgIGxheWVyLnJlZHJhdygpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0sIDIwMClcblxuICAgIGNvbnNvbGUubG9nKCdNYXAgaW5pdGlhbGl6ZWQgc3VjY2Vzc2Z1bGx5JylcblxuICAgIC8vIEFkZCB6b25lcyB0byBtYXBcbiAgICBhZGRab25lc1RvTWFwKClcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBpbml0aWFsaXppbmcgbWFwOicsIGVycm9yKVxuICAgIGlmICgkcS5ub3RpZnkpIHtcbiAgICAgICRxLm5vdGlmeSh7XG4gICAgICAgIGNvbG9yOiAnbmVnYXRpdmUnLFxuICAgICAgICBtZXNzYWdlOiAnRmFpbGVkIHRvIGluaXRpYWxpemUgbWFwJyxcbiAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG5cbmNvbnN0IGFkZFpvbmVzVG9NYXAgPSAoKSA9PiB7XG4gIGlmICghbWFwKSB7XG4gICAgY29uc29sZS5sb2coJ01hcCBub3QgcmVhZHkgZm9yIGFkZGluZyB6b25lcycpXG4gICAgcmV0dXJuXG4gIH1cblxuICBjb25zb2xlLmxvZygnQWRkaW5nIHpvbmVzIHRvIG1hcCB3aXRoIGZpbHRlcnMuLi4nLCB7XG4gICAgZGF5OiBzY2hlZHVsZVN0b3JlLmZpbHRlcnMuZGF5LFxuICAgIGNvbXBsZXRlZDogc2NoZWR1bGVTdG9yZS5maWx0ZXJzLmNvbXBsZXRlZCxcbiAgICBwcmlvcml0eTogc2NoZWR1bGVTdG9yZS5maWx0ZXJzLnByaW9yaXR5LFxuICB9KVxuXG4gIC8vIENsZWFyIGV4aXN0aW5nIHBvbHlnb25zXG4gIHpvbmVQb2x5Z29ucy5mb3JFYWNoKChwb2x5Z29uKSA9PiB7XG4gICAgbWFwLnJlbW92ZUxheWVyKHBvbHlnb24pXG4gIH0pXG4gIHpvbmVQb2x5Z29ucyA9IFtdXG5cbiAgLy8gVXNlIGZpbHRlcmVkIHpvbmVzIGZyb20gdGhlIHN0b3JlXG4gIGNvbnN0IHpvbmVzVG9TaG93ID0gc2NoZWR1bGVTdG9yZS5maWx0ZXJlZFpvbmVzXG4gIGNvbnNvbGUubG9nKGBTaG93aW5nICR7em9uZXNUb1Nob3cubGVuZ3RofSB6b25lcyBhZnRlciBmaWx0ZXJpbmdgKVxuXG4gIC8vIEFkZCBlYWNoIHpvbmUgYXMgYSBwb2x5Z29uXG4gIHpvbmVzVG9TaG93LmZvckVhY2goKHpvbmUpID0+IHtcbiAgICB0cnkge1xuICAgICAgLy8gQXBwbHkgdmlzaWJpbGl0eSB0b2dnbGVzXG4gICAgICBpZiAoIXNob3dDb21wbGV0ZWRab25lcy52YWx1ZSAmJiB6b25lLmNvbXBsZXRlZCkgcmV0dXJuXG4gICAgICBpZiAoIXNob3dJbmNvbXBsZXRlWm9uZXMudmFsdWUgJiYgIXpvbmUuY29tcGxldGVkKSByZXR1cm5cblxuICAgICAgY29uc3QgZGF5Q29sb3IgPSBkYXlDb2xvcnNbem9uZS5zY2hlZHVsZWREYXldXG4gICAgICBjb25zdCBjb2xvciA9IHpvbmUuY29tcGxldGVkID8gZGF5Q29sb3IgOiAnI0ZGMDAwMCcgLy8gQnJpZ2h0IHJlZCBmb3IgaW5jb21wbGV0ZVxuICAgICAgY29uc3Qgb3BhY2l0eSA9IHpvbmUuY29tcGxldGVkID8gMC43IDogMC45XG4gICAgICBjb25zdCBmaWxsT3BhY2l0eSA9IHpvbmUuY29tcGxldGVkID8gMC40IDogMC42XG5cbiAgICAgIGNvbnN0IHBvbHlnb24gPSBMLnBvbHlnb24oem9uZS5jb29yZGluYXRlcywge1xuICAgICAgICBjb2xvcjogY29sb3IsXG4gICAgICAgIGZpbGxDb2xvcjogY29sb3IsXG4gICAgICAgIGZpbGxPcGFjaXR5OiBmaWxsT3BhY2l0eSxcbiAgICAgICAgd2VpZ2h0OiAzLFxuICAgICAgICBvcGFjaXR5OiBvcGFjaXR5LFxuICAgICAgfSkuYWRkVG8obWFwKVxuXG4gICAgICAvLyBBZGQgY2xpY2sgZXZlbnRcbiAgICAgIHBvbHlnb24ub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBzZWxlY3Rab25lKHpvbmUpXG4gICAgICB9KVxuXG4gICAgICAvLyBBZGQgaG92ZXIgZWZmZWN0c1xuICAgICAgcG9seWdvbi5vbignbW91c2VvdmVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBob3ZlcmVkWm9uZS52YWx1ZSA9IHpvbmVcbiAgICAgICAgdGhpcy5zZXRTdHlsZSh7XG4gICAgICAgICAgd2VpZ2h0OiA1LFxuICAgICAgICAgIGZpbGxPcGFjaXR5OiAwLjgsXG4gICAgICAgIH0pXG4gICAgICB9KVxuXG4gICAgICBwb2x5Z29uLm9uKCdtb3VzZW91dCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaG92ZXJlZFpvbmUudmFsdWUgPSBudWxsXG4gICAgICAgIHRoaXMuc2V0U3R5bGUoe1xuICAgICAgICAgIHdlaWdodDogMyxcbiAgICAgICAgICBmaWxsT3BhY2l0eTogZmlsbE9wYWNpdHksXG4gICAgICAgIH0pXG4gICAgICB9KVxuXG4gICAgICAvLyBBZGQgdG9vbHRpcFxuICAgICAgcG9seWdvbi5iaW5kVG9vbHRpcChcbiAgICAgICAgYFxuICAgICAgICA8ZGl2IHN0eWxlPVwidGV4dC1hbGlnbjogY2VudGVyO1wiPlxuICAgICAgICAgIDxzdHJvbmc+JHt6b25lLm5hbWV9PC9zdHJvbmc+PGJyPlxuICAgICAgICAgIDxzcGFuIHN0eWxlPVwiY29sb3I6ICR7ZGF5Q29sb3J9O1wiPiR7em9uZS5zY2hlZHVsZWREYXl9PC9zcGFuPjxicj5cbiAgICAgICAgICAke3pvbmUuY29tcGxldGVkID8gJ+KchSBDb21wbGV0ZScgOiAn4o+zIFBlbmRpbmcnfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIGAsXG4gICAgICAgIHtcbiAgICAgICAgICBwZXJtYW5lbnQ6IGZhbHNlLFxuICAgICAgICAgIGRpcmVjdGlvbjogJ3RvcCcsXG4gICAgICAgICAgY2xhc3NOYW1lOiAnem9uZS10b29sdGlwJyxcbiAgICAgICAgfSxcbiAgICAgIClcblxuICAgICAgem9uZVBvbHlnb25zLnB1c2gocG9seWdvbilcbiAgICAgIGNvbnNvbGUubG9nKGBBZGRlZCB6b25lOiAke3pvbmUubmFtZX1gKVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBFcnJvciBhZGRpbmcgem9uZSAke3pvbmUubmFtZX06YCwgZXJyb3IpXG4gICAgfVxuICB9KVxuXG4gIC8vIEZpdCBtYXAgdG8gc2hvdyBhbGwgdmlzaWJsZSB6b25lc1xuICBpZiAoem9uZVBvbHlnb25zLmxlbmd0aCA+IDApIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgZ3JvdXAgPSBuZXcgTC5mZWF0dXJlR3JvdXAoem9uZVBvbHlnb25zKVxuICAgICAgbWFwLmZpdEJvdW5kcyhncm91cC5nZXRCb3VuZHMoKS5wYWQoMC4xKSlcbiAgICAgIGNvbnNvbGUubG9nKCdNYXAgYm91bmRzIGZpdHRlZCB0byBmaWx0ZXJlZCB6b25lcycpXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZpdHRpbmcgYm91bmRzOicsIGVycm9yKVxuICAgIH1cbiAgfVxuXG4gIGNvbnNvbGUubG9nKGBBZGRlZCAke3pvbmVQb2x5Z29ucy5sZW5ndGh9IHpvbmVzIHRvIG1hcGApXG59XG5cbmNvbnN0IHNlbGVjdFpvbmUgPSAoem9uZSkgPT4ge1xuICBzY2hlZHVsZVN0b3JlLnNlbGVjdFpvbmUoem9uZSlcblxuICAvLyBTaG93IHN1Y2Nlc3MgZmVlZGJhY2tcbiAgaWYgKCRxLm5vdGlmeSkge1xuICAgICRxLm5vdGlmeSh7XG4gICAgICBjb2xvcjogJ2luZm8nLFxuICAgICAgbWVzc2FnZTogYFNlbGVjdGVkOiAke3pvbmUubmFtZX1gLFxuICAgICAgaWNvbjogJ2luZm8nLFxuICAgICAgdGltZW91dDogMTAwMCxcbiAgICB9KVxuICB9XG59XG5cbmNvbnN0IHJlZnJlc2hNYXAgPSBhc3luYyAoKSA9PiB7XG4gIGlmICgkcS5sb2FkaW5nKSB7XG4gICAgJHEubG9hZGluZy5zaG93KHtcbiAgICAgIG1lc3NhZ2U6ICdSZWZyZXNoaW5nIHpvbmVzLi4uJyxcbiAgICB9KVxuICB9XG5cbiAgdHJ5IHtcbiAgICBhd2FpdCBsb2FkWm9uZXMoKVxuICAgIGlmICgkcS5ub3RpZnkpIHtcbiAgICAgICRxLm5vdGlmeSh7XG4gICAgICAgIGNvbG9yOiAncG9zaXRpdmUnLFxuICAgICAgICBtZXNzYWdlOiAnTWFwIHJlZnJlc2hlZCBzdWNjZXNzZnVsbHknLFxuICAgICAgICBpY29uOiAncmVmcmVzaCcsXG4gICAgICB9KVxuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gcmVmcmVzaCBtYXA6JywgZXJyb3IpXG4gICAgaWYgKCRxLm5vdGlmeSkge1xuICAgICAgJHEubm90aWZ5KHtcbiAgICAgICAgY29sb3I6ICduZWdhdGl2ZScsXG4gICAgICAgIG1lc3NhZ2U6ICdGYWlsZWQgdG8gcmVmcmVzaCBtYXAnLFxuICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgfSlcbiAgICB9XG4gIH0gZmluYWxseSB7XG4gICAgaWYgKCRxLmxvYWRpbmcpIHtcbiAgICAgICRxLmxvYWRpbmcuaGlkZSgpXG4gICAgfVxuICB9XG59XG5cbmNvbnN0IGNlbnRlck1hcCA9ICgpID0+IHtcbiAgaWYgKG1hcCkge1xuICAgIG1hcC5zZXRWaWV3KGRlZmF1bHRDZW50ZXIsIGRlZmF1bHRab29tKVxuICAgIGlmICgkcS5ub3RpZnkpIHtcbiAgICAgICRxLm5vdGlmeSh7XG4gICAgICAgIGNvbG9yOiAnaW5mbycsXG4gICAgICAgIG1lc3NhZ2U6ICdNYXAgY2VudGVyZWQgb24gU3RlLiBBbm5lJyxcbiAgICAgICAgaWNvbjogJ215X2xvY2F0aW9uJyxcbiAgICAgICAgdGltZW91dDogMTAwMCxcbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG5cbmNvbnN0IG1hcmtUb2RheUNvbXBsZXRlID0gKCkgPT4ge1xuICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCkudG9Mb2NhbGVEYXRlU3RyaW5nKCdlbi1VUycsIHsgd2Vla2RheTogJ2xvbmcnIH0pXG4gIGNvbnN0IHRvZGF5Wm9uZXMgPSBzY2hlZHVsZVN0b3JlLnpvbmVzLmZpbHRlcihcbiAgICAoem9uZSkgPT4gem9uZS5zY2hlZHVsZWREYXkgPT09IHRvZGF5ICYmICF6b25lLmNvbXBsZXRlZCxcbiAgKVxuXG4gIGlmICh0b2RheVpvbmVzLmxlbmd0aCA9PT0gMCkge1xuICAgIGlmICgkcS5ub3RpZnkpIHtcbiAgICAgICRxLm5vdGlmeSh7XG4gICAgICAgIHR5cGU6ICdpbmZvJyxcbiAgICAgICAgbWVzc2FnZTogYEFsbCAke3RvZGF5fSB6b25lcyBhcmUgYWxyZWFkeSBjb21wbGV0ZWQhYCxcbiAgICAgICAgaWNvbjogJ2NoZWNrX2NpcmNsZScsXG4gICAgICB9KVxuICAgIH1cbiAgICByZXR1cm5cbiAgfVxuXG4gIGlmICgkcS5kaWFsb2cpIHtcbiAgICAkcS5kaWFsb2coe1xuICAgICAgdGl0bGU6ICdNYXJrIFRvZGF5IENvbXBsZXRlJyxcbiAgICAgIG1lc3NhZ2U6IGBNYXJrIGFsbCAke3RvZGF5Wm9uZXMubGVuZ3RofSAke3RvZGF5fSB6b25lcyBhcyBjb21wbGV0ZWQ/YCxcbiAgICAgIGNhbmNlbDogdHJ1ZSxcbiAgICAgIHBlcnNpc3RlbnQ6IHRydWUsXG4gICAgICBvazoge1xuICAgICAgICBjb2xvcjogJ3Bvc2l0aXZlJyxcbiAgICAgICAgbGFiZWw6ICdNYXJrIENvbXBsZXRlJyxcbiAgICAgIH0sXG4gICAgfSkub25Payhhc3luYyAoKSA9PiB7XG4gICAgICBmb3IgKGNvbnN0IHpvbmUgb2YgdG9kYXlab25lcykge1xuICAgICAgICBhd2FpdCBzY2hlZHVsZVN0b3JlLnVwZGF0ZVpvbmVTdGF0dXMoem9uZS5pZCwgdHJ1ZSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG5cbi8vIFdhdGNoZXJzXG53YXRjaChcbiAgKCkgPT4gc2NoZWR1bGVTdG9yZS56b25lcyxcbiAgKCkgPT4ge1xuICAgIGlmIChtYXApIHtcbiAgICAgIGFkZFpvbmVzVG9NYXAoKVxuICAgIH1cbiAgfSxcbiAgeyBkZWVwOiB0cnVlIH0sXG4pXG5cbndhdGNoKFtzaG93Q29tcGxldGVkWm9uZXMsIHNob3dJbmNvbXBsZXRlWm9uZXNdLCAoKSA9PiB7XG4gIGlmIChtYXApIHtcbiAgICBhZGRab25lc1RvTWFwKClcbiAgfVxufSlcblxuLy8gV2F0Y2ggZm9yIGZpbHRlciBjaGFuZ2VzIGZyb20gdGhlIHN0b3JlXG53YXRjaChcbiAgKCkgPT4gc2NoZWR1bGVTdG9yZS5maWx0ZXJzLFxuICAoKSA9PiB7XG4gICAgaWYgKG1hcCkge1xuICAgICAgY29uc29sZS5sb2coJ0ZpbHRlcnMgY2hhbmdlZCwgdXBkYXRpbmcgbWFwJylcbiAgICAgIGFkZFpvbmVzVG9NYXAoKVxuICAgIH1cbiAgfSxcbiAgeyBkZWVwOiB0cnVlIH0sXG4pXG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCIgc2NvcGVkPlxuLm1hcC1wYWdlIHtcbiAgaGVpZ2h0OiAxMDB2aDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4ubWFwLWNvbnRhaW5lciB7XG4gIGhlaWdodDogMTAwJTtcbiAgd2lkdGg6IDEwMCU7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAjbWFwIHtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgLy8gRW5zdXJlIHRoZSBtYXAgY29udGFpbmVyIGhhcyBwcm9wZXIgZGltZW5zaW9uc1xuICAgIG1pbi1oZWlnaHQ6IDQwMHB4O1xuICB9XG59XG5cbi5tYXAtY29udHJvbHMge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMjBweDtcbiAgcmlnaHQ6IDIwcHg7XG4gIHotaW5kZXg6IDEwMDA7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xuXG4gIC5jb250cm9sLXBhbmVsIHtcbiAgICBwb2ludGVyLWV2ZW50czogYXV0bztcbiAgICBtYXJnaW4tYm90dG9tOiAxNnB4O1xuICB9XG5cbiAgLnEtYnRuIHtcbiAgICBwb2ludGVyLWV2ZW50czogYXV0bztcbiAgfVxufVxuXG4uem9uZS1pbmZvLXBhbmVsIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDIwcHg7XG4gIGxlZnQ6IDIwcHg7XG4gIHotaW5kZXg6IDEwMDA7XG4gIG1heC13aWR0aDogMjUwcHg7XG4gIGFuaW1hdGlvbjogc2xpZGVJbkxlZnQgMC4zcyBlYXNlO1xufVxuXG5Aa2V5ZnJhbWVzIHNsaWRlSW5MZWZ0IHtcbiAgZnJvbSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yMHB4KTtcbiAgICBvcGFjaXR5OiAwO1xuICB9XG4gIHRvIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7XG4gICAgb3BhY2l0eTogMTtcbiAgfVxufVxuXG4vLyBNb2JpbGUgYWRqdXN0bWVudHNcbkBtZWRpYSAobWF4LXdpZHRoOiA1OTlweCkge1xuICAubWFwLWNvbnRyb2xzIHtcbiAgICB0b3A6IDEwcHg7XG4gICAgcmlnaHQ6IDEwcHg7XG5cbiAgICAuY29udHJvbC1wYW5lbCB7XG4gICAgICAucS1jYXJkIHtcbiAgICAgICAgcGFkZGluZzogOHB4O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC56b25lLWluZm8tcGFuZWwge1xuICAgIHRvcDogMTBweDtcbiAgICBsZWZ0OiAxMHB4O1xuICAgIHJpZ2h0OiAxMHB4O1xuICAgIG1heC13aWR0aDogY2FsYygxMDB2dyAtIDIwcHgpO1xuICB9XG59XG5cbi8vIEVuc3VyZSBMZWFmbGV0IENTUyBvdmVycmlkZXMgYXJlIGFwcGxpZWRcbjpkZWVwKC5sZWFmbGV0LWNvbnRhaW5lcikge1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xuICAvLyBGb3JjZSBwcm9wZXIgcmVuZGVyaW5nXG4gIHRvdWNoLWFjdGlvbjogbm9uZTtcbn1cblxuOmRlZXAoLmxlYWZsZXQtdGlsZS1jb250YWluZXIpIHtcbiAgLy8gRml4IHRpbGUgYWxpZ25tZW50IGlzc3Vlc1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDAsIDApO1xufVxuXG46ZGVlcCguem9uZS10b29sdGlwKSB7XG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC45NSk7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgcGFkZGluZzogOHB4O1xuICBmb250LXNpemU6IDEycHg7XG4gIGJveC1zaGFkb3c6IDAgMnB4IDRweCByZ2JhKDAsIDAsIDAsIDAuMik7XG59XG5cbi8vIERhcmsgbW9kZSBhZGp1c3RtZW50c1xuLmJvZHktLWRhcmsge1xuICA6ZGVlcCguem9uZS10b29sdGlwKSB7XG4gICAgYmFja2dyb3VuZDogcmdiYSgxOCwgMTgsIDE4LCAwLjk1KTtcbiAgICBib3JkZXItY29sb3I6ICM0NDQ7XG4gICAgY29sb3I6IHdoaXRlO1xuICB9XG59XG48L3N0eWxlPlxuIl0sIm5hbWVzIjpbImNsYXNzZXMiLCJfY3JlYXRlQmxvY2siLCJfb3BlbkJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9jcmVhdGVWTm9kZSIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfY3JlYXRlVGV4dFZOb2RlIiwiX3RvRGlzcGxheVN0cmluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFLQSxNQUFNLFlBQVk7QUFFbEIsTUFBQSxlQUFlLGdCQUFnQjtBQUFBLEVBQzdCLE1BQU07QUFBQSxFQUVOLE9BQU87QUFBQSxFQUVQLE1BQU8sT0FBTztBQUNaLFVBQU0sRUFBRSxPQUFPLFFBQU8sSUFBSyxXQUFXLEtBQUs7QUFDM0MsV0FBTyxNQUFNLEVBQUUsT0FBTztBQUFBLE1BQ3BCLE9BQU8sUUFBUTtBQUFBLE1BQ2YsTUFBTTtBQUFBLE1BQ04sT0FBTyxNQUFNO0FBQUEsTUFDYixRQUFRLE1BQU07QUFBQSxNQUNkLFNBQVM7QUFBQSxNQUNULE9BQU87QUFBQSxNQUNQO0FBQUEsSUFDTixDQUFLO0FBQUEsRUFDSDtBQUNGLENBQUM7QUN0QkQsTUFBTSxpQkFBaUIsQ0FBRSxPQUFPLFNBQVMsVUFBVSxNQUFNO0FBRWxELE1BQU0sY0FBYztBQUFBLEVBQ3pCLE1BQU07QUFBQSxJQUNKLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxFQUNiO0FBQUEsRUFFRSxTQUFTO0FBQUEsRUFDVCxNQUFNO0FBQUEsRUFDTixNQUFNO0FBQUEsRUFDTixZQUFZO0FBQUEsRUFFWixPQUFPO0FBQUEsRUFDUCxXQUFXO0FBQUEsRUFDWCxRQUFRO0FBQUEsRUFFUixRQUFRO0FBQUEsRUFDUixTQUFTO0FBQUEsRUFFVCxPQUFPO0FBQUEsSUFDTCxNQUFNLENBQUUsUUFBUSxNQUFNO0FBQUEsSUFDdEIsU0FBUztBQUFBLEVBQ2I7QUFBQSxFQUNFLGVBQWU7QUFBQSxJQUNiLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxJQUNULFdBQVcsT0FBSyxlQUFlLFNBQVMsQ0FBQztBQUFBLEVBQzdDO0FBQUEsRUFDRSxlQUFlO0FBQUEsRUFD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TyxPQUFBLFlBQVksWUFBUyxhQUFBO0FBQUEsc0JBQzdCLGNBQVc7QUFBQSxzQkFDWCxNQUFLO0FBQUEsc0JBQ0wsTUFBSztBQUFBO3VDQUVMLE1BQXdEO0FBQUEsd0JBQXJERSxnQkFBQUMsZ0JBQUEsT0FBQSxZQUFZLFlBQVMsY0FBQSxZQUFBLEdBQUEsQ0FBQTtBQUFBOzs7Ozs7Ozs7Ozs7TUFTcENILFlBQXFCLE9BQUEsbUJBQUEsQ0FBQTtBQUFBLE1BR0EsT0FBQSxHQUFHLE9BQU8sR0FBRyxtQkFBbENILFlBZ0JnQixhQUFBO0FBQUE7UUFoQnNCLFVBQVM7QUFBQSxRQUFnQixRQUFRLENBQUEsSUFBQSxFQUFBO0FBQUE7eUJBQ3JFLE1BY1E7QUFBQSxVQWRSRyxZQWNRLE1BQUE7QUFBQSxZQWRELE1BQUs7QUFBQSxZQUFNLFdBQVU7QUFBQSxZQUFLLE9BQU07QUFBQSxZQUFXLFNBQVMsT0FBQSxjQUFjO0FBQUE7NkJBQ3ZFLE1BSWU7QUFBQSxjQUpmQSxZQUllLFlBQUE7QUFBQSxnQkFKRCxPQUFNO0FBQUEsZ0JBQVcsTUFBSztBQUFBLGdCQUFnQixTQUFPLE9BQUE7QUFBQTtpQ0FDekQsTUFFWTtBQUFBLGtCQUZaQSxZQUVZLFVBQUE7QUFBQSxvQkFGRCxRQUFPO0FBQUEsb0JBQWMsTUFBSztBQUFBO3FDQUFlLE1BRXBELE9BQUEsQ0FBQSxNQUFBLE9BQUEsQ0FBQSxJQUFBO0FBQUEsc0NBRm9ELGlDQUVwRCxFQUFBO0FBQUE7Ozs7Ozs7Y0FHRkEsWUFFZSxZQUFBO0FBQUEsZ0JBRkQsT0FBTTtBQUFBLGdCQUFPLE1BQUs7QUFBQSxnQkFBTyxTQUFPLE9BQUE7QUFBQTtpQ0FDNUMsTUFBNEU7QUFBQSxrQkFBNUVBLFlBQTRFLFVBQUE7QUFBQSxvQkFBakUsUUFBTztBQUFBLG9CQUFjLE1BQUs7QUFBQTtxQ0FBZSxNQUFZLE9BQUEsQ0FBQSxNQUFBLE9BQUEsQ0FBQSxJQUFBO0FBQUEsc0NBQVosZ0JBQVksRUFBQTtBQUFBOzs7Ozs7O2NBR2xFQSxZQUVlLFlBQUE7QUFBQSxnQkFGRCxPQUFNO0FBQUEsZ0JBQVUsTUFBSztBQUFBLGdCQUFXLFNBQU8sT0FBQTtBQUFBO2lDQUNuRCxNQUErRTtBQUFBLGtCQUEvRUEsWUFBK0UsVUFBQTtBQUFBLG9CQUFwRSxRQUFPO0FBQUEsb0JBQWMsTUFBSztBQUFBO3FDQUFlLE1BQWUsT0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLElBQUE7QUFBQSxzQ0FBZixtQkFBZSxFQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7OzsiLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMCwxLDIsMyw0LDVdfQ==
