import { $ as _export_sfc, ae as createBlock, a1 as openBlock, a5 as withCtx, a2 as createBaseVNode, a4 as createVNode, a0 as createElementBlock, aa as createCommentVNode, ad as QBtn, a7 as QCard, a6 as toDisplayString, a8 as Fragment, a9 as renderList, ab as normalizeClass, af as QCardSection, au as QCheckbox, ag as withModifiers, ac as createTextVNode, ah as QIcon, at as QCardActions, ai as useQuasar, H as onMounted, a as computed } from "./index-DtVXev-T.js";
import { Q as QCircularProgress } from "./QCircularProgress-BnxIZAAI.js";
import { f as QItem, h as QItemSection, i as QItemLabel, a as QChip, u as useScheduleStore } from "./QSelect-DP4GbAuv.js";
import { b as QList, Q as QPage, Z as ZoneDetailsDialog } from "./ZoneDetailsDialog-BiIE5NuN.js";
const _sfc_main = {
  __name: "SchedulePage",
  setup(__props, { expose: __expose }) {
    __expose();
    const $q = useQuasar();
    const scheduleStore = useScheduleStore();
    onMounted(() => {
      scheduleStore.setNotifyFunction($q.notify);
    });
    const remainingZones = computed(() => {
      return scheduleStore.totalZones - scheduleStore.completedZones;
    });
    const currentDay = computed(() => {
      return (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", { weekday: "long" });
    });
    const todayZones = computed(() => {
      return scheduleStore.zones.filter((zone) => zone.scheduledDay === currentDay.value);
    });
    const isToday = (dayName) => {
      return dayName === currentDay.value;
    };
    const getDayColor = (dayName) => {
      const colors = {
        Monday: "blue",
        Tuesday: "green",
        Wednesday: "orange",
        Thursday: "purple",
        Friday: "deep-purple"
        // Blue-purple theme
      };
      return colors[dayName] || "grey";
    };
    const getDayProgress = (dayZones) => {
      if (dayZones.length === 0) return 0;
      const completed = dayZones.filter((zone) => zone.completed).length;
      return Math.round(completed / dayZones.length * 100);
    };
    const getCompletedCount = (dayZones) => {
      return dayZones.filter((zone) => zone.completed).length;
    };
    const toggleZoneStatus = async (zone) => {
      await scheduleStore.updateZoneStatus(zone.id, !zone.completed);
    };
    const markDayComplete = async (dayName, completed) => {
      $q.dialog({
        title: "Confirm Action",
        message: `Mark all ${dayName} zones as ${completed ? "completed" : "incomplete"}?`,
        cancel: true,
        persistent: true
      }).onOk(async () => {
        await scheduleStore.markAllZonesForDay(dayName, completed);
      });
    };
    const confirmMarkAllComplete = () => {
      $q.dialog({
        title: "Mark All Complete",
        message: "Mark all zones as completed for this week?",
        cancel: true,
        persistent: true,
        ok: {
          color: "positive",
          label: "Mark All Complete"
        }
      }).onOk(async () => {
        const promises = scheduleStore.zones.filter((zone) => !zone.completed).map((zone) => scheduleStore.updateZoneStatus(zone.id, true));
        await Promise.all(promises);
      });
    };
    const confirmResetWeek = () => {
      $q.dialog({
        title: "Reset Week",
        message: "Reset all zones to incomplete status?",
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
    const __returned__ = { $q, scheduleStore, remainingZones, currentDay, todayZones, isToday, getDayColor, getDayProgress, getCompletedCount, toggleZoneStatus, markDayComplete, confirmMarkAllComplete, confirmResetWeek, computed, onMounted, get useQuasar() {
      return useQuasar;
    }, get useScheduleStore() {
      return useScheduleStore;
    }, ZoneDetailsDialog };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1 = { class: "schedule-page" };
const _hoisted_2 = { class: "page-header q-mb-lg" };
const _hoisted_3 = { class: "row items-center justify-between" };
const _hoisted_4 = { class: "q-gutter-sm" };
const _hoisted_5 = { class: "weekly-overview q-mb-lg" };
const _hoisted_6 = { class: "row items-center q-gutter-lg" };
const _hoisted_7 = { class: "col-auto" };
const _hoisted_8 = { class: "progress-text" };
const _hoisted_9 = { class: "text-h4 text-primary" };
const _hoisted_10 = { class: "col" };
const _hoisted_11 = { class: "row q-gutter-md" };
const _hoisted_12 = { class: "col" };
const _hoisted_13 = { class: "text-h5 text-positive" };
const _hoisted_14 = { class: "col" };
const _hoisted_15 = { class: "text-h5 text-info" };
const _hoisted_16 = { class: "col" };
const _hoisted_17 = { class: "text-h5 text-warning" };
const _hoisted_18 = { class: "daily-schedule" };
const _hoisted_19 = { class: "row q-gutter-md" };
const _hoisted_20 = { class: "row items-center justify-between text-white" };
const _hoisted_21 = { class: "text-h6" };
const _hoisted_22 = { class: "text-caption opacity-80" };
const _hoisted_23 = { class: "day-progress" };
const _hoisted_24 = { class: "text-caption text-white" };
const _hoisted_25 = { class: "q-gutter-xs" };
const _hoisted_26 = {
  key: 0,
  class: "text-center q-pa-lg text-grey"
};
const _hoisted_27 = {
  key: 0,
  class: "today-focus q-mt-lg"
};
const _hoisted_28 = { class: "text-h6 q-mb-md" };
const _hoisted_29 = { class: "row q-gutter-md" };
const _hoisted_30 = { class: "row items-center q-gutter-sm" };
const _hoisted_31 = { class: "col" };
const _hoisted_32 = { class: "text-body2 text-weight-medium" };
const _hoisted_33 = { class: "text-caption text-grey" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QPage, { padding: "" }, {
    default: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            _cache[2] || (_cache[2] = createBaseVNode("div", null, [
              createBaseVNode("h1", { class: "text-h4 q-my-none" }, "Weekly Schedule"),
              createBaseVNode("p", { class: "text-subtitle1 text-grey q-mt-sm q-mb-none" }, " View and manage the weekly grass cutting schedule ")
            ], -1)),
            createBaseVNode("div", _hoisted_4, [
              createVNode(QBtn, {
                outline: "",
                color: "warning",
                icon: "refresh",
                label: "Reset Week",
                onClick: $setup.confirmResetWeek
              }),
              createVNode(QBtn, {
                color: "positive",
                icon: "check_circle",
                label: "Mark All Complete",
                onClick: $setup.confirmMarkAllComplete
              })
            ])
          ])
        ]),
        createBaseVNode("div", _hoisted_5, [
          createVNode(QCard, {
            flat: "",
            bordered: "",
            class: "q-pa-md"
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_6, [
                createBaseVNode("div", _hoisted_7, [
                  createVNode(QCircularProgress, {
                    value: $setup.scheduleStore.completionPercentage,
                    size: "100px",
                    thickness: 0.15,
                    color: "primary",
                    "track-color": "grey-3",
                    class: "progress-circle"
                  }, {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_8, [
                        createBaseVNode("div", _hoisted_9, toDisplayString($setup.scheduleStore.completionPercentage) + "%", 1),
                        _cache[3] || (_cache[3] = createBaseVNode("div", { class: "text-caption" }, "Complete", -1))
                      ])
                    ]),
                    _: 1
                  }, 8, ["value"])
                ]),
                createBaseVNode("div", _hoisted_10, [
                  createBaseVNode("div", _hoisted_11, [
                    createBaseVNode("div", _hoisted_12, [
                      createBaseVNode("div", _hoisted_13, toDisplayString($setup.scheduleStore.completedZones), 1),
                      _cache[4] || (_cache[4] = createBaseVNode("div", { class: "text-caption text-grey" }, "Completed Zones", -1))
                    ]),
                    createBaseVNode("div", _hoisted_14, [
                      createBaseVNode("div", _hoisted_15, toDisplayString($setup.scheduleStore.totalZones), 1),
                      _cache[5] || (_cache[5] = createBaseVNode("div", { class: "text-caption text-grey" }, "Total Zones", -1))
                    ]),
                    createBaseVNode("div", _hoisted_16, [
                      createBaseVNode("div", _hoisted_17, toDisplayString($setup.remainingZones), 1),
                      _cache[6] || (_cache[6] = createBaseVNode("div", { class: "text-caption text-grey" }, "Remaining", -1))
                    ])
                  ])
                ])
              ])
            ]),
            _: 1
          })
        ]),
        createBaseVNode("div", _hoisted_18, [
          createBaseVNode("div", _hoisted_19, [
            (openBlock(true), createElementBlock(Fragment, null, renderList($setup.scheduleStore.zonesByDay, (dayData, dayName) => {
              return openBlock(), createElementBlock("div", {
                key: dayName,
                class: "col-12 col-sm-6 col-lg"
              }, [
                createVNode(QCard, {
                  flat: "",
                  bordered: "",
                  class: normalizeClass(["day-card", { "today-card": $setup.isToday(dayName) }])
                }, {
                  default: withCtx(() => [
                    createVNode(QCardSection, {
                      class: normalizeClass(["day-header", `bg-schedule-${dayName.toLowerCase()}`])
                    }, {
                      default: withCtx(() => [
                        createBaseVNode("div", _hoisted_20, [
                          createBaseVNode("div", null, [
                            createBaseVNode("div", _hoisted_21, toDisplayString(dayName), 1),
                            createBaseVNode("div", _hoisted_22, toDisplayString(dayData.length) + " zone" + toDisplayString(dayData.length !== 1 ? "s" : ""), 1)
                          ]),
                          createBaseVNode("div", _hoisted_23, [
                            createVNode(QCircularProgress, {
                              value: $setup.getDayProgress(dayData),
                              size: "40px",
                              thickness: 0.2,
                              color: "white",
                              "track-color": "rgba(255,255,255,0.3)"
                            }, {
                              default: withCtx(() => [
                                createBaseVNode("div", _hoisted_24, toDisplayString($setup.getCompletedCount(dayData)) + "/" + toDisplayString(dayData.length), 1)
                              ]),
                              _: 2
                            }, 1032, ["value"])
                          ])
                        ])
                      ]),
                      _: 2
                    }, 1032, ["class"]),
                    createVNode(QCardSection, { class: "q-pa-none" }, {
                      default: withCtx(() => [
                        createVNode(QList, null, {
                          default: withCtx(() => [
                            (openBlock(true), createElementBlock(Fragment, null, renderList(dayData, (zone) => {
                              return openBlock(), createBlock(QItem, {
                                key: zone.id,
                                clickable: "",
                                onClick: ($event) => $setup.scheduleStore.selectZone(zone),
                                class: "zone-item"
                              }, {
                                default: withCtx(() => [
                                  createVNode(QItemSection, { avatar: "" }, {
                                    default: withCtx(() => [
                                      createVNode(QCheckbox, {
                                        "model-value": zone.completed,
                                        "onUpdate:modelValue": ($event) => $setup.toggleZoneStatus(zone),
                                        color: $setup.getDayColor(dayName),
                                        onClick: _cache[0] || (_cache[0] = withModifiers(() => {
                                        }, ["stop"]))
                                      }, null, 8, ["model-value", "onUpdate:modelValue", "color"])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(QItemSection, null, {
                                    default: withCtx(() => [
                                      createVNode(QItemLabel, {
                                        class: normalizeClass({ "text-strike": zone.completed })
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(zone.name), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["class"]),
                                      createVNode(QItemLabel, { caption: "" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(zone.estimatedTime) + "min • " + toDisplayString(zone.priority) + " priority ", 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(QItemSection, { side: "" }, {
                                    default: withCtx(() => [
                                      createBaseVNode("div", _hoisted_25, [
                                        createVNode(QChip, {
                                          size: "sm",
                                          color: zone.completed ? "positive" : "grey-4",
                                          "text-color": zone.completed ? "white" : "grey-8",
                                          icon: zone.completed ? "check" : "schedule"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(zone.completed ? "Done" : "Todo"), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["color", "text-color", "icon"])
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1032, ["onClick"]);
                            }), 128))
                          ]),
                          _: 2
                        }, 1024),
                        dayData.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_26, [
                          createVNode(QIcon, {
                            name: "event_available",
                            size: "2rem",
                            class: "q-mb-sm"
                          }),
                          _cache[7] || (_cache[7] = createBaseVNode("div", null, "No zones scheduled", -1))
                        ])) : createCommentVNode("", true)
                      ]),
                      _: 2
                    }, 1024),
                    dayData.length > 0 ? (openBlock(), createBlock(QCardActions, {
                      key: 0,
                      class: "q-pa-md"
                    }, {
                      default: withCtx(() => [
                        createVNode(QBtn, {
                          flat: "",
                          dense: "",
                          color: $setup.getDayColor(dayName),
                          icon: "check_circle",
                          label: "Complete All",
                          onClick: ($event) => $setup.markDayComplete(dayName, true),
                          disable: $setup.getCompletedCount(dayData) === dayData.length,
                          size: "sm"
                        }, null, 8, ["color", "onClick", "disable"]),
                        createVNode(QBtn, {
                          flat: "",
                          dense: "",
                          color: "grey",
                          icon: "radio_button_unchecked",
                          label: "Reset All",
                          onClick: ($event) => $setup.markDayComplete(dayName, false),
                          disable: $setup.getCompletedCount(dayData) === 0,
                          size: "sm"
                        }, null, 8, ["onClick", "disable"])
                      ]),
                      _: 2
                    }, 1024)) : createCommentVNode("", true)
                  ]),
                  _: 2
                }, 1032, ["class"])
              ]);
            }), 128))
          ])
        ]),
        $setup.todayZones.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_27, [
          createVNode(QCard, {
            flat: "",
            bordered: "",
            class: "q-pa-md bg-primary text-white"
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_28, [
                createVNode(QIcon, {
                  name: "today",
                  class: "q-mr-sm"
                }),
                createTextVNode(" Today's Focus - " + toDisplayString($setup.currentDay), 1)
              ]),
              createBaseVNode("div", _hoisted_29, [
                (openBlock(true), createElementBlock(Fragment, null, renderList($setup.todayZones, (zone) => {
                  return openBlock(), createElementBlock("div", {
                    key: zone.id,
                    class: "col-12 col-sm-6 col-md-4"
                  }, [
                    createVNode(QCard, {
                      flat: "",
                      class: "today-zone-card cursor-pointer",
                      onClick: ($event) => $setup.scheduleStore.selectZone(zone)
                    }, {
                      default: withCtx(() => [
                        createVNode(QCardSection, { class: "q-pa-sm" }, {
                          default: withCtx(() => [
                            createBaseVNode("div", _hoisted_30, [
                              createVNode(QCheckbox, {
                                "model-value": zone.completed,
                                "onUpdate:modelValue": ($event) => $setup.toggleZoneStatus(zone),
                                color: "primary",
                                onClick: _cache[1] || (_cache[1] = withModifiers(() => {
                                }, ["stop"]))
                              }, null, 8, ["model-value", "onUpdate:modelValue"]),
                              createBaseVNode("div", _hoisted_31, [
                                createBaseVNode("div", _hoisted_32, toDisplayString(zone.name), 1),
                                createBaseVNode("div", _hoisted_33, toDisplayString(zone.estimatedTime) + " minutes", 1)
                              ])
                            ])
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1032, ["onClick"])
                  ]);
                }), 128))
              ])
            ]),
            _: 1
          })
        ])) : createCommentVNode("", true)
      ]),
      createVNode($setup["ZoneDetailsDialog"])
    ]),
    _: 1
  });
}
const SchedulePage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-77ae265b"], ["__file", "SchedulePage.vue"]]);
export {
  SchedulePage as default
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2NoZWR1bGVQYWdlLUNySnM4QV9CLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGFnZXMvU2NoZWR1bGVQYWdlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDxxLXBhZ2UgcGFkZGluZz5cbiAgICA8ZGl2IGNsYXNzPVwic2NoZWR1bGUtcGFnZVwiPlxuICAgICAgPCEtLSBQYWdlIEhlYWRlciAtLT5cbiAgICAgIDxkaXYgY2xhc3M9XCJwYWdlLWhlYWRlciBxLW1iLWxnXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8aDEgY2xhc3M9XCJ0ZXh0LWg0IHEtbXktbm9uZVwiPldlZWtseSBTY2hlZHVsZTwvaDE+XG4gICAgICAgICAgICA8cCBjbGFzcz1cInRleHQtc3VidGl0bGUxIHRleHQtZ3JleSBxLW10LXNtIHEtbWItbm9uZVwiPlxuICAgICAgICAgICAgICBWaWV3IGFuZCBtYW5hZ2UgdGhlIHdlZWtseSBncmFzcyBjdXR0aW5nIHNjaGVkdWxlXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1ndXR0ZXItc21cIj5cbiAgICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgICBvdXRsaW5lXG4gICAgICAgICAgICAgIGNvbG9yPVwid2FybmluZ1wiXG4gICAgICAgICAgICAgIGljb249XCJyZWZyZXNoXCJcbiAgICAgICAgICAgICAgbGFiZWw9XCJSZXNldCBXZWVrXCJcbiAgICAgICAgICAgICAgQGNsaWNrPVwiY29uZmlybVJlc2V0V2Vla1wiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPHEtYnRuXG4gICAgICAgICAgICAgIGNvbG9yPVwicG9zaXRpdmVcIlxuICAgICAgICAgICAgICBpY29uPVwiY2hlY2tfY2lyY2xlXCJcbiAgICAgICAgICAgICAgbGFiZWw9XCJNYXJrIEFsbCBDb21wbGV0ZVwiXG4gICAgICAgICAgICAgIEBjbGljaz1cImNvbmZpcm1NYXJrQWxsQ29tcGxldGVcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPCEtLSBXZWVrbHkgT3ZlcnZpZXcgLS0+XG4gICAgICA8ZGl2IGNsYXNzPVwid2Vla2x5LW92ZXJ2aWV3IHEtbWItbGdcIj5cbiAgICAgICAgPHEtY2FyZCBmbGF0IGJvcmRlcmVkIGNsYXNzPVwicS1wYS1tZFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyIHEtZ3V0dGVyLWxnXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLWF1dG9cIj5cbiAgICAgICAgICAgICAgPHEtY2lyY3VsYXItcHJvZ3Jlc3NcbiAgICAgICAgICAgICAgICA6dmFsdWU9XCJzY2hlZHVsZVN0b3JlLmNvbXBsZXRpb25QZXJjZW50YWdlXCJcbiAgICAgICAgICAgICAgICBzaXplPVwiMTAwcHhcIlxuICAgICAgICAgICAgICAgIDp0aGlja25lc3M9XCIwLjE1XCJcbiAgICAgICAgICAgICAgICBjb2xvcj1cInByaW1hcnlcIlxuICAgICAgICAgICAgICAgIHRyYWNrLWNvbG9yPVwiZ3JleS0zXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cInByb2dyZXNzLWNpcmNsZVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZ3Jlc3MtdGV4dFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDQgdGV4dC1wcmltYXJ5XCI+e3sgc2NoZWR1bGVTdG9yZS5jb21wbGV0aW9uUGVyY2VudGFnZSB9fSU8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWNhcHRpb25cIj5Db21wbGV0ZTwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L3EtY2lyY3VsYXItcHJvZ3Jlc3M+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IHEtZ3V0dGVyLW1kXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDUgdGV4dC1wb3NpdGl2ZVwiPnt7IHNjaGVkdWxlU3RvcmUuY29tcGxldGVkWm9uZXMgfX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWNhcHRpb24gdGV4dC1ncmV5XCI+Q29tcGxldGVkIFpvbmVzPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDUgdGV4dC1pbmZvXCI+e3sgc2NoZWR1bGVTdG9yZS50b3RhbFpvbmVzIH19PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1jYXB0aW9uIHRleHQtZ3JleVwiPlRvdGFsIFpvbmVzPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDUgdGV4dC13YXJuaW5nXCI+e3sgcmVtYWluaW5nWm9uZXMgfX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWNhcHRpb24gdGV4dC1ncmV5XCI+UmVtYWluaW5nPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvcS1jYXJkPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDwhLS0gRGFpbHkgU2NoZWR1bGUgQ2FyZHMgLS0+XG4gICAgICA8ZGl2IGNsYXNzPVwiZGFpbHktc2NoZWR1bGVcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBxLWd1dHRlci1tZFwiPlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIHYtZm9yPVwiKGRheURhdGEsIGRheU5hbWUpIGluIHNjaGVkdWxlU3RvcmUuem9uZXNCeURheVwiXG4gICAgICAgICAgICA6a2V5PVwiZGF5TmFtZVwiXG4gICAgICAgICAgICBjbGFzcz1cImNvbC0xMiBjb2wtc20tNiBjb2wtbGdcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxxLWNhcmQgZmxhdCBib3JkZXJlZCBjbGFzcz1cImRheS1jYXJkXCIgOmNsYXNzPVwieyAndG9kYXktY2FyZCc6IGlzVG9kYXkoZGF5TmFtZSkgfVwiPlxuICAgICAgICAgICAgICA8IS0tIERheSBIZWFkZXIgLS0+XG4gICAgICAgICAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cImRheS1oZWFkZXJcIiA6Y2xhc3M9XCJgYmctc2NoZWR1bGUtJHtkYXlOYW1lLnRvTG93ZXJDYXNlKCl9YFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNlwiPnt7IGRheU5hbWUgfX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtY2FwdGlvbiBvcGFjaXR5LTgwXCI+XG4gICAgICAgICAgICAgICAgICAgICAge3sgZGF5RGF0YS5sZW5ndGggfX0gem9uZXt7IGRheURhdGEubGVuZ3RoICE9PSAxID8gJ3MnIDogJycgfX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRheS1wcm9ncmVzc1wiPlxuICAgICAgICAgICAgICAgICAgICA8cS1jaXJjdWxhci1wcm9ncmVzc1xuICAgICAgICAgICAgICAgICAgICAgIDp2YWx1ZT1cImdldERheVByb2dyZXNzKGRheURhdGEpXCJcbiAgICAgICAgICAgICAgICAgICAgICBzaXplPVwiNDBweFwiXG4gICAgICAgICAgICAgICAgICAgICAgOnRoaWNrbmVzcz1cIjAuMlwiXG4gICAgICAgICAgICAgICAgICAgICAgY29sb3I9XCJ3aGl0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgdHJhY2stY29sb3I9XCJyZ2JhKDI1NSwyNTUsMjU1LDAuMylcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtY2FwdGlvbiB0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7eyBnZXRDb21wbGV0ZWRDb3VudChkYXlEYXRhKSB9fS97eyBkYXlEYXRhLmxlbmd0aCB9fVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L3EtY2lyY3VsYXItcHJvZ3Jlc3M+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cblxuICAgICAgICAgICAgICA8IS0tIFpvbmUgTGlzdCAtLT5cbiAgICAgICAgICAgICAgPHEtY2FyZC1zZWN0aW9uIGNsYXNzPVwicS1wYS1ub25lXCI+XG4gICAgICAgICAgICAgICAgPHEtbGlzdD5cbiAgICAgICAgICAgICAgICAgIDxxLWl0ZW1cbiAgICAgICAgICAgICAgICAgICAgdi1mb3I9XCJ6b25lIGluIGRheURhdGFcIlxuICAgICAgICAgICAgICAgICAgICA6a2V5PVwiem9uZS5pZFwiXG4gICAgICAgICAgICAgICAgICAgIGNsaWNrYWJsZVxuICAgICAgICAgICAgICAgICAgICBAY2xpY2s9XCJzY2hlZHVsZVN0b3JlLnNlbGVjdFpvbmUoem9uZSlcIlxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInpvbmUtaXRlbVwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBhdmF0YXI+XG4gICAgICAgICAgICAgICAgICAgICAgPHEtY2hlY2tib3hcbiAgICAgICAgICAgICAgICAgICAgICAgIDptb2RlbC12YWx1ZT1cInpvbmUuY29tcGxldGVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIEB1cGRhdGU6bW9kZWwtdmFsdWU9XCJ0b2dnbGVab25lU3RhdHVzKHpvbmUpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIDpjb2xvcj1cImdldERheUNvbG9yKGRheU5hbWUpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIEBjbGljay5zdG9wXG4gICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cblxuICAgICAgICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbCA6Y2xhc3M9XCJ7ICd0ZXh0LXN0cmlrZSc6IHpvbmUuY29tcGxldGVkIH1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7IHpvbmUubmFtZSB9fVxuICAgICAgICAgICAgICAgICAgICAgIDwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWwgY2FwdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7IHpvbmUuZXN0aW1hdGVkVGltZSB9fW1pbiDigKIge3sgem9uZS5wcmlvcml0eSB9fSBwcmlvcml0eVxuICAgICAgICAgICAgICAgICAgICAgIDwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuXG4gICAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBzaWRlPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLWd1dHRlci14c1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHEtY2hpcFxuICAgICAgICAgICAgICAgICAgICAgICAgICBzaXplPVwic21cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICA6Y29sb3I9XCJ6b25lLmNvbXBsZXRlZCA/ICdwb3NpdGl2ZScgOiAnZ3JleS00J1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDp0ZXh0LWNvbG9yPVwiem9uZS5jb21wbGV0ZWQgPyAnd2hpdGUnIDogJ2dyZXktOCdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICA6aWNvbj1cInpvbmUuY29tcGxldGVkID8gJ2NoZWNrJyA6ICdzY2hlZHVsZSdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7eyB6b25lLmNvbXBsZXRlZCA/ICdEb25lJyA6ICdUb2RvJyB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9xLWNoaXA+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICA8L3EtaXRlbT5cbiAgICAgICAgICAgICAgICA8L3EtbGlzdD5cblxuICAgICAgICAgICAgICAgIDwhLS0gRW1wdHkgZGF5IHN0YXRlIC0tPlxuICAgICAgICAgICAgICAgIDxkaXYgdi1pZj1cImRheURhdGEubGVuZ3RoID09PSAwXCIgY2xhc3M9XCJ0ZXh0LWNlbnRlciBxLXBhLWxnIHRleHQtZ3JleVwiPlxuICAgICAgICAgICAgICAgICAgPHEtaWNvbiBuYW1lPVwiZXZlbnRfYXZhaWxhYmxlXCIgc2l6ZT1cIjJyZW1cIiBjbGFzcz1cInEtbWItc21cIiAvPlxuICAgICAgICAgICAgICAgICAgPGRpdj5ObyB6b25lcyBzY2hlZHVsZWQ8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cblxuICAgICAgICAgICAgICA8IS0tIERheSBBY3Rpb25zIC0tPlxuICAgICAgICAgICAgICA8cS1jYXJkLWFjdGlvbnMgdi1pZj1cImRheURhdGEubGVuZ3RoID4gMFwiIGNsYXNzPVwicS1wYS1tZFwiPlxuICAgICAgICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgICAgICAgZmxhdFxuICAgICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICAgIDpjb2xvcj1cImdldERheUNvbG9yKGRheU5hbWUpXCJcbiAgICAgICAgICAgICAgICAgIGljb249XCJjaGVja19jaXJjbGVcIlxuICAgICAgICAgICAgICAgICAgbGFiZWw9XCJDb21wbGV0ZSBBbGxcIlxuICAgICAgICAgICAgICAgICAgQGNsaWNrPVwibWFya0RheUNvbXBsZXRlKGRheU5hbWUsIHRydWUpXCJcbiAgICAgICAgICAgICAgICAgIDpkaXNhYmxlPVwiZ2V0Q29tcGxldGVkQ291bnQoZGF5RGF0YSkgPT09IGRheURhdGEubGVuZ3RoXCJcbiAgICAgICAgICAgICAgICAgIHNpemU9XCJzbVwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8cS1idG5cbiAgICAgICAgICAgICAgICAgIGZsYXRcbiAgICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgICBjb2xvcj1cImdyZXlcIlxuICAgICAgICAgICAgICAgICAgaWNvbj1cInJhZGlvX2J1dHRvbl91bmNoZWNrZWRcIlxuICAgICAgICAgICAgICAgICAgbGFiZWw9XCJSZXNldCBBbGxcIlxuICAgICAgICAgICAgICAgICAgQGNsaWNrPVwibWFya0RheUNvbXBsZXRlKGRheU5hbWUsIGZhbHNlKVwiXG4gICAgICAgICAgICAgICAgICA6ZGlzYWJsZT1cImdldENvbXBsZXRlZENvdW50KGRheURhdGEpID09PSAwXCJcbiAgICAgICAgICAgICAgICAgIHNpemU9XCJzbVwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9xLWNhcmQtYWN0aW9ucz5cbiAgICAgICAgICAgIDwvcS1jYXJkPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8IS0tIFRvZGF5J3MgRm9jdXMgLS0+XG4gICAgICA8ZGl2IHYtaWY9XCJ0b2RheVpvbmVzLmxlbmd0aCA+IDBcIiBjbGFzcz1cInRvZGF5LWZvY3VzIHEtbXQtbGdcIj5cbiAgICAgICAgPHEtY2FyZCBmbGF0IGJvcmRlcmVkIGNsYXNzPVwicS1wYS1tZCBiZy1wcmltYXJ5IHRleHQtd2hpdGVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNiBxLW1iLW1kXCI+XG4gICAgICAgICAgICA8cS1pY29uIG5hbWU9XCJ0b2RheVwiIGNsYXNzPVwicS1tci1zbVwiIC8+XG4gICAgICAgICAgICBUb2RheSdzIEZvY3VzIC0ge3sgY3VycmVudERheSB9fVxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBxLWd1dHRlci1tZFwiPlxuICAgICAgICAgICAgPGRpdiB2LWZvcj1cInpvbmUgaW4gdG9kYXlab25lc1wiIDprZXk9XCJ6b25lLmlkXCIgY2xhc3M9XCJjb2wtMTIgY29sLXNtLTYgY29sLW1kLTRcIj5cbiAgICAgICAgICAgICAgPHEtY2FyZFxuICAgICAgICAgICAgICAgIGZsYXRcbiAgICAgICAgICAgICAgICBjbGFzcz1cInRvZGF5LXpvbmUtY2FyZCBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgICAgQGNsaWNrPVwic2NoZWR1bGVTdG9yZS5zZWxlY3Rab25lKHpvbmUpXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInEtcGEtc21cIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyIHEtZ3V0dGVyLXNtXCI+XG4gICAgICAgICAgICAgICAgICAgIDxxLWNoZWNrYm94XG4gICAgICAgICAgICAgICAgICAgICAgOm1vZGVsLXZhbHVlPVwiem9uZS5jb21wbGV0ZWRcIlxuICAgICAgICAgICAgICAgICAgICAgIEB1cGRhdGU6bW9kZWwtdmFsdWU9XCJ0b2dnbGVab25lU3RhdHVzKHpvbmUpXCJcbiAgICAgICAgICAgICAgICAgICAgICBjb2xvcj1cInByaW1hcnlcIlxuICAgICAgICAgICAgICAgICAgICAgIEBjbGljay5zdG9wXG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2xcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1ib2R5MiB0ZXh0LXdlaWdodC1tZWRpdW1cIj57eyB6b25lLm5hbWUgfX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1jYXB0aW9uIHRleHQtZ3JleVwiPnt7IHpvbmUuZXN0aW1hdGVkVGltZSB9fSBtaW51dGVzPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICAgICAgPC9xLWNhcmQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9xLWNhcmQ+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDwhLS0gWm9uZSBEZXRhaWxzIERpYWxvZyAtLT5cbiAgICA8Wm9uZURldGFpbHNEaWFsb2cgLz5cbiAgPC9xLXBhZ2U+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgY29tcHV0ZWQsIG9uTW91bnRlZCB9IGZyb20gJ3Z1ZSdcbmltcG9ydCB7IHVzZVF1YXNhciB9IGZyb20gJ3F1YXNhcidcbmltcG9ydCB7IHVzZVNjaGVkdWxlU3RvcmUgfSBmcm9tICcuLi9zdG9yZXMvc2NoZWR1bGUtc3RvcmUuanMnXG5pbXBvcnQgWm9uZURldGFpbHNEaWFsb2cgZnJvbSAnLi4vY29tcG9uZW50cy9ab25lRGV0YWlsc0RpYWxvZy52dWUnXG5cbmNvbnN0ICRxID0gdXNlUXVhc2FyKClcbmNvbnN0IHNjaGVkdWxlU3RvcmUgPSB1c2VTY2hlZHVsZVN0b3JlKClcblxuLy8gU2V0IHVwIG5vdGlmaWNhdGlvbnMgZm9yIHRoZSBzdG9yZVxub25Nb3VudGVkKCgpID0+IHtcbiAgc2NoZWR1bGVTdG9yZS5zZXROb3RpZnlGdW5jdGlvbigkcS5ub3RpZnkpXG59KVxuXG4vLyBDb21wdXRlZCBwcm9wZXJ0aWVzXG5jb25zdCByZW1haW5pbmdab25lcyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgcmV0dXJuIHNjaGVkdWxlU3RvcmUudG90YWxab25lcyAtIHNjaGVkdWxlU3RvcmUuY29tcGxldGVkWm9uZXNcbn0pXG5cbmNvbnN0IGN1cnJlbnREYXkgPSBjb21wdXRlZCgoKSA9PiB7XG4gIHJldHVybiBuZXcgRGF0ZSgpLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tVVMnLCB7IHdlZWtkYXk6ICdsb25nJyB9KVxufSlcblxuY29uc3QgdG9kYXlab25lcyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgcmV0dXJuIHNjaGVkdWxlU3RvcmUuem9uZXMuZmlsdGVyKCh6b25lKSA9PiB6b25lLnNjaGVkdWxlZERheSA9PT0gY3VycmVudERheS52YWx1ZSlcbn0pXG5cbi8vIE1ldGhvZHNcbmNvbnN0IGlzVG9kYXkgPSAoZGF5TmFtZSkgPT4ge1xuICByZXR1cm4gZGF5TmFtZSA9PT0gY3VycmVudERheS52YWx1ZVxufVxuXG5jb25zdCBnZXREYXlDb2xvciA9IChkYXlOYW1lKSA9PiB7XG4gIGNvbnN0IGNvbG9ycyA9IHtcbiAgICBNb25kYXk6ICdibHVlJyxcbiAgICBUdWVzZGF5OiAnZ3JlZW4nLFxuICAgIFdlZG5lc2RheTogJ29yYW5nZScsXG4gICAgVGh1cnNkYXk6ICdwdXJwbGUnLFxuICAgIEZyaWRheTogJ2RlZXAtcHVycGxlJywgLy8gQmx1ZS1wdXJwbGUgdGhlbWVcbiAgfVxuICByZXR1cm4gY29sb3JzW2RheU5hbWVdIHx8ICdncmV5J1xufVxuXG5jb25zdCBnZXREYXlQcm9ncmVzcyA9IChkYXlab25lcykgPT4ge1xuICBpZiAoZGF5Wm9uZXMubGVuZ3RoID09PSAwKSByZXR1cm4gMFxuICBjb25zdCBjb21wbGV0ZWQgPSBkYXlab25lcy5maWx0ZXIoKHpvbmUpID0+IHpvbmUuY29tcGxldGVkKS5sZW5ndGhcbiAgcmV0dXJuIE1hdGgucm91bmQoKGNvbXBsZXRlZCAvIGRheVpvbmVzLmxlbmd0aCkgKiAxMDApXG59XG5cbmNvbnN0IGdldENvbXBsZXRlZENvdW50ID0gKGRheVpvbmVzKSA9PiB7XG4gIHJldHVybiBkYXlab25lcy5maWx0ZXIoKHpvbmUpID0+IHpvbmUuY29tcGxldGVkKS5sZW5ndGhcbn1cblxuY29uc3QgdG9nZ2xlWm9uZVN0YXR1cyA9IGFzeW5jICh6b25lKSA9PiB7XG4gIGF3YWl0IHNjaGVkdWxlU3RvcmUudXBkYXRlWm9uZVN0YXR1cyh6b25lLmlkLCAhem9uZS5jb21wbGV0ZWQpXG59XG5cbmNvbnN0IG1hcmtEYXlDb21wbGV0ZSA9IGFzeW5jIChkYXlOYW1lLCBjb21wbGV0ZWQpID0+IHtcbiAgJHEuZGlhbG9nKHtcbiAgICB0aXRsZTogJ0NvbmZpcm0gQWN0aW9uJyxcbiAgICBtZXNzYWdlOiBgTWFyayBhbGwgJHtkYXlOYW1lfSB6b25lcyBhcyAke2NvbXBsZXRlZCA/ICdjb21wbGV0ZWQnIDogJ2luY29tcGxldGUnfT9gLFxuICAgIGNhbmNlbDogdHJ1ZSxcbiAgICBwZXJzaXN0ZW50OiB0cnVlLFxuICB9KS5vbk9rKGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBzY2hlZHVsZVN0b3JlLm1hcmtBbGxab25lc0ZvckRheShkYXlOYW1lLCBjb21wbGV0ZWQpXG4gIH0pXG59XG5cbmNvbnN0IGNvbmZpcm1NYXJrQWxsQ29tcGxldGUgPSAoKSA9PiB7XG4gICRxLmRpYWxvZyh7XG4gICAgdGl0bGU6ICdNYXJrIEFsbCBDb21wbGV0ZScsXG4gICAgbWVzc2FnZTogJ01hcmsgYWxsIHpvbmVzIGFzIGNvbXBsZXRlZCBmb3IgdGhpcyB3ZWVrPycsXG4gICAgY2FuY2VsOiB0cnVlLFxuICAgIHBlcnNpc3RlbnQ6IHRydWUsXG4gICAgb2s6IHtcbiAgICAgIGNvbG9yOiAncG9zaXRpdmUnLFxuICAgICAgbGFiZWw6ICdNYXJrIEFsbCBDb21wbGV0ZScsXG4gICAgfSxcbiAgfSkub25Payhhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgcHJvbWlzZXMgPSBzY2hlZHVsZVN0b3JlLnpvbmVzXG4gICAgICAuZmlsdGVyKCh6b25lKSA9PiAhem9uZS5jb21wbGV0ZWQpXG4gICAgICAubWFwKCh6b25lKSA9PiBzY2hlZHVsZVN0b3JlLnVwZGF0ZVpvbmVTdGF0dXMoem9uZS5pZCwgdHJ1ZSkpXG5cbiAgICBhd2FpdCBQcm9taXNlLmFsbChwcm9taXNlcylcbiAgfSlcbn1cblxuY29uc3QgY29uZmlybVJlc2V0V2VlayA9ICgpID0+IHtcbiAgJHEuZGlhbG9nKHtcbiAgICB0aXRsZTogJ1Jlc2V0IFdlZWsnLFxuICAgIG1lc3NhZ2U6ICdSZXNldCBhbGwgem9uZXMgdG8gaW5jb21wbGV0ZSBzdGF0dXM/JyxcbiAgICBjYW5jZWw6IHRydWUsXG4gICAgcGVyc2lzdGVudDogdHJ1ZSxcbiAgICBvazoge1xuICAgICAgY29sb3I6ICd3YXJuaW5nJyxcbiAgICAgIGxhYmVsOiAnUmVzZXQgV2VlaycsXG4gICAgfSxcbiAgfSkub25Payhhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgc2NoZWR1bGVTdG9yZS5yZXNldFdlZWtseVByb2dyZXNzKClcbiAgfSlcbn1cbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cInNjc3NcIiBzY29wZWQ+XG4uc2NoZWR1bGUtcGFnZSB7XG4gIG1heC13aWR0aDogMTQwMHB4O1xuICBtYXJnaW46IDAgYXV0bztcbn1cblxuLnBhZ2UtaGVhZGVyIHtcbiAgaDEge1xuICAgIGZvbnQtd2VpZ2h0OiAzMDA7XG4gIH1cbn1cblxuLndlZWtseS1vdmVydmlldyB7XG4gIC5wcm9ncmVzcy1jaXJjbGUge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgfVxuXG4gIC5wcm9ncmVzcy10ZXh0IHtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIH1cbn1cblxuLmRhaWx5LXNjaGVkdWxlIHtcbiAgLmRheS1jYXJkIHtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcblxuICAgICYudG9kYXktY2FyZCB7XG4gICAgICBib3JkZXI6IDJweCBzb2xpZCAjMjE5NmYzO1xuICAgICAgYm94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDMzLCAxNTAsIDI0MywgMC4zKTtcbiAgICB9XG5cbiAgICAmOmhvdmVyIHtcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMnB4KTtcbiAgICAgIGJveC1zaGFkb3c6IDAgNnB4IDE2cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xuICAgIH1cbiAgfVxuXG4gIC5kYXktaGVhZGVyIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cbiAgICAuZGF5LXByb2dyZXNzIHtcbiAgICAgIC5xLWNpcmN1bGFyLXByb2dyZXNzIHtcbiAgICAgICAgZm9udC1zaXplOiAxMHB4O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC56b25lLWl0ZW0ge1xuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuMDUpO1xuXG4gICAgJjpsYXN0LWNoaWxkIHtcbiAgICAgIGJvcmRlci1ib3R0b206IG5vbmU7XG4gICAgfVxuXG4gICAgJjpob3ZlciB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMDMpO1xuICAgIH1cbiAgfVxufVxuXG4udG9kYXktZm9jdXMge1xuICAudG9kYXktem9uZS1jYXJkIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuOSk7XG4gICAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZTtcblxuICAgICY6aG92ZXIge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTFweCk7XG4gICAgfVxuICB9XG59XG5cbi8vIE1vYmlsZSBhZGp1c3RtZW50c1xuQG1lZGlhIChtYXgtd2lkdGg6IDU5OXB4KSB7XG4gIC5wYWdlLWhlYWRlciB7XG4gICAgLnJvdyB7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gICAgICBnYXA6IDE2cHg7XG4gICAgfVxuICB9XG5cbiAgLndlZWtseS1vdmVydmlldyB7XG4gICAgLnJvdyB7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIH1cblxuICAgIC5xLWNpcmN1bGFyLXByb2dyZXNzIHtcbiAgICAgIG1hcmdpbjogMCBhdXRvIDE2cHg7XG4gICAgfVxuICB9XG5cbiAgLmRhaWx5LXNjaGVkdWxlIHtcbiAgICAuY29sLWxnIHtcbiAgICAgIG1pbi13aWR0aDogMTAwJTtcbiAgICB9XG4gIH1cbn1cblxuLy8gRGFyayBtb2RlIGFkanVzdG1lbnRzXG4uYm9keS0tZGFyayB7XG4gIC56b25lLWl0ZW06aG92ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSk7XG4gIH1cblxuICAudG9kYXktem9uZS1jYXJkIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSk7XG5cbiAgICAmOmhvdmVyIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNSk7XG4gICAgfVxuICB9XG59XG48L3N0eWxlPlxuIl0sIm5hbWVzIjpbIl9jcmVhdGVCbG9jayIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfY3JlYXRlVk5vZGUiLCJfdG9EaXNwbGF5U3RyaW5nIiwiX29wZW5CbG9jayIsIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfRnJhZ21lbnQiLCJfbm9ybWFsaXplQ2xhc3MiLCJfcmVuZGVyTGlzdCIsIl9jcmVhdGVUZXh0Vk5vZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBdU9BLFVBQU0sS0FBSyxVQUFTO0FBQ3BCLFVBQU0sZ0JBQWdCLGlCQUFnQjtBQUd0QyxjQUFVLE1BQU07QUFDZCxvQkFBYyxrQkFBa0IsR0FBRyxNQUFNO0FBQUEsSUFDM0MsQ0FBQztBQUdELFVBQU0saUJBQWlCLFNBQVMsTUFBTTtBQUNwQyxhQUFPLGNBQWMsYUFBYSxjQUFjO0FBQUEsSUFDbEQsQ0FBQztBQUVELFVBQU0sYUFBYSxTQUFTLE1BQU07QUFDaEMsY0FBTyxvQkFBSSxLQUFJLEdBQUcsbUJBQW1CLFNBQVMsRUFBRSxTQUFTLE9BQU0sQ0FBRTtBQUFBLElBQ25FLENBQUM7QUFFRCxVQUFNLGFBQWEsU0FBUyxNQUFNO0FBQ2hDLGFBQU8sY0FBYyxNQUFNLE9BQU8sQ0FBQyxTQUFTLEtBQUssaUJBQWlCLFdBQVcsS0FBSztBQUFBLElBQ3BGLENBQUM7QUFHRCxVQUFNLFVBQVUsQ0FBQyxZQUFZO0FBQzNCLGFBQU8sWUFBWSxXQUFXO0FBQUEsSUFDaEM7QUFFQSxVQUFNLGNBQWMsQ0FBQyxZQUFZO0FBQy9CLFlBQU0sU0FBUztBQUFBLFFBQ2IsUUFBUTtBQUFBLFFBQ1IsU0FBUztBQUFBLFFBQ1QsV0FBVztBQUFBLFFBQ1gsVUFBVTtBQUFBLFFBQ1YsUUFBUTtBQUFBO0FBQUEsTUFDWjtBQUNFLGFBQU8sT0FBTyxPQUFPLEtBQUs7QUFBQSxJQUM1QjtBQUVBLFVBQU0saUJBQWlCLENBQUMs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
