import { $ as _export_sfc, ae as createBlock, a1 as openBlock, a5 as withCtx, a2 as createBaseVNode, a4 as createVNode, a0 as createElementBlock, aa as createCommentVNode, ad as QBtn, a8 as Fragment, a9 as renderList, a7 as QCard, ac as createTextVNode, a6 as toDisplayString, ah as QIcon, af as QCardSection, ab as normalizeClass, at as QCardActions, ag as withModifiers, ai as useQuasar, H as onMounted } from "./index-DtVXev-T.js";
import { a as QChip, u as useScheduleStore } from "./QSelect-DP4GbAuv.js";
import { a as QImg, Q as QPage, Z as ZoneDetailsDialog } from "./ZoneDetailsDialog-BiIE5NuN.js";
const _sfc_main = {
  __name: "ZonesPage",
  setup(__props, { expose: __expose }) {
    __expose();
    const $q = useQuasar();
    const scheduleStore = useScheduleStore();
    onMounted(() => {
      scheduleStore.setNotifyFunction($q.notify);
    });
    const toggleZoneStatus = async (zone) => {
      await scheduleStore.updateZoneStatus(zone.id, !zone.completed);
    };
    const showAddZone = () => {
      $q.notify({
        type: "info",
        message: "Zone creation feature coming in next development phase!",
        icon: "construction"
      });
    };
    const __returned__ = { $q, scheduleStore, toggleZoneStatus, showAddZone, onMounted, get useQuasar() {
      return useQuasar;
    }, get useScheduleStore() {
      return useScheduleStore;
    }, ZoneDetailsDialog };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1 = { class: "zones-page" };
const _hoisted_2 = { class: "page-header q-mb-lg" };
const _hoisted_3 = { class: "row items-center justify-between" };
const _hoisted_4 = { class: "q-gutter-sm" };
const _hoisted_5 = { class: "zone-grid" };
const _hoisted_6 = { class: "row q-gutter-md" };
const _hoisted_7 = { class: "absolute-full flex flex-center bg-grey-3" };
const _hoisted_8 = { class: "absolute-top-right q-ma-sm" };
const _hoisted_9 = { class: "text-h6 q-mb-xs" };
const _hoisted_10 = { class: "text-caption text-grey q-mb-sm" };
const _hoisted_11 = { class: "zone-details q-gutter-xs" };
const _hoisted_12 = { class: "row items-center" };
const _hoisted_13 = { class: "row items-center" };
const _hoisted_14 = { class: "text-body2" };
const _hoisted_15 = { class: "row items-center" };
const _hoisted_16 = { class: "text-body2" };
const _hoisted_17 = {
  key: 0,
  class: "empty-state text-center q-pa-xl"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QPage, { padding: "" }, {
    default: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            _cache[1] || (_cache[1] = createBaseVNode("div", null, [
              createBaseVNode("h1", { class: "text-h4 q-my-none" }, "Zone Management"),
              createBaseVNode("p", { class: "text-subtitle1 text-grey q-mt-sm q-mb-none" }, " Manage and configure grass cutting zones for Ste. Anne ")
            ], -1)),
            createBaseVNode("div", _hoisted_4, [
              createVNode(QBtn, {
                color: "primary",
                icon: "add",
                label: "Add Zone",
                onClick: $setup.showAddZone
              }),
              createVNode(QBtn, {
                outline: "",
                color: "info",
                icon: "map",
                label: "View Map",
                onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$router.push("/"))
              })
            ])
          ])
        ]),
        createBaseVNode("div", _hoisted_5, [
          createBaseVNode("div", _hoisted_6, [
            (openBlock(true), createElementBlock(Fragment, null, renderList($setup.scheduleStore.zones, (zone) => {
              return openBlock(), createElementBlock("div", {
                key: zone.id,
                class: "col-12 col-sm-6 col-md-4"
              }, [
                createVNode(QCard, {
                  flat: "",
                  bordered: "",
                  class: "zone-card cursor-pointer",
                  onClick: ($event) => $setup.scheduleStore.selectZone(zone)
                }, {
                  default: withCtx(() => [
                    createVNode(QImg, {
                      src: zone.image,
                      alt: zone.name,
                      height: "160px",
                      class: "zone-image"
                    }, {
                      error: withCtx(() => [
                        createBaseVNode("div", _hoisted_7, [
                          createVNode(QIcon, {
                            name: "terrain",
                            size: "3rem",
                            color: "grey-6"
                          })
                        ])
                      ]),
                      default: withCtx(() => [
                        createBaseVNode("div", _hoisted_8, [
                          createVNode(QChip, {
                            color: zone.completed ? "positive" : "warning",
                            "text-color": "white",
                            icon: "schedule",
                            size: "sm"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(zone.completed ? "Done" : "Pending"), 1)
                            ]),
                            _: 2
                          }, 1032, ["color"])
                        ])
                      ]),
                      _: 2
                    }, 1032, ["src", "alt"]),
                    createVNode(QCardSection, null, {
                      default: withCtx(() => [
                        createBaseVNode("div", _hoisted_9, toDisplayString(zone.name), 1),
                        createBaseVNode("div", _hoisted_10, toDisplayString(zone.description), 1),
                        createBaseVNode("div", _hoisted_11, [
                          createBaseVNode("div", _hoisted_12, [
                            createVNode(QIcon, {
                              name: "event",
                              size: "sm",
                              class: "q-mr-xs"
                            }),
                            createBaseVNode("span", {
                              class: normalizeClass(["text-body2", `schedule-${zone.scheduledDay.toLowerCase()}`])
                            }, toDisplayString(zone.scheduledDay), 3)
                          ]),
                          createBaseVNode("div", _hoisted_13, [
                            createVNode(QIcon, {
                              name: "flag",
                              size: "sm",
                              class: "q-mr-xs"
                            }),
                            createBaseVNode("span", _hoisted_14, toDisplayString(zone.priority) + " priority", 1)
                          ]),
                          createBaseVNode("div", _hoisted_15, [
                            createVNode(QIcon, {
                              name: "schedule",
                              size: "sm",
                              class: "q-mr-xs"
                            }),
                            createBaseVNode("span", _hoisted_16, toDisplayString(zone.estimatedTime) + " min", 1)
                          ])
                        ])
                      ]),
                      _: 2
                    }, 1024),
                    createVNode(QCardActions, { align: "right" }, {
                      default: withCtx(() => [
                        createVNode(QBtn, {
                          flat: "",
                          color: zone.completed ? "positive" : "grey",
                          icon: zone.completed ? "check_circle" : "radio_button_unchecked",
                          onClick: withModifiers(($event) => $setup.toggleZoneStatus(zone), ["stop"])
                        }, null, 8, ["color", "icon", "onClick"]),
                        createVNode(QBtn, {
                          flat: "",
                          color: "primary",
                          icon: "visibility",
                          onClick: withModifiers(($event) => $setup.scheduleStore.selectZone(zone), ["stop"])
                        }, null, 8, ["onClick"])
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
        $setup.scheduleStore.zones.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_17, [
          createVNode(QIcon, {
            name: "location_off",
            size: "6rem",
            color: "grey-4"
          }),
          _cache[2] || (_cache[2] = createBaseVNode("div", { class: "text-h5 q-mt-md text-grey" }, "No zones configured", -1)),
          _cache[3] || (_cache[3] = createBaseVNode("div", { class: "text-body1 text-grey q-mb-lg" }, " Start by adding your first grass cutting zone ", -1)),
          createVNode(QBtn, {
            color: "primary",
            icon: "add_location",
            label: "Create First Zone",
            onClick: $setup.showAddZone,
            size: "lg"
          })
        ])) : createCommentVNode("", true)
      ]),
      createVNode($setup["ZoneDetailsDialog"])
    ]),
    _: 1
  });
}
const ZonesPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7227ff05"], ["__file", "ZonesPage.vue"]]);
export {
  ZonesPage as default
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWm9uZXNQYWdlLTBaOUFCWUZtLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGFnZXMvWm9uZXNQYWdlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDxxLXBhZ2UgcGFkZGluZz5cbiAgICA8ZGl2IGNsYXNzPVwiem9uZXMtcGFnZVwiPlxuICAgICAgPCEtLSBQYWdlIEhlYWRlciAtLT5cbiAgICAgIDxkaXYgY2xhc3M9XCJwYWdlLWhlYWRlciBxLW1iLWxnXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8aDEgY2xhc3M9XCJ0ZXh0LWg0IHEtbXktbm9uZVwiPlpvbmUgTWFuYWdlbWVudDwvaDE+XG4gICAgICAgICAgICA8cCBjbGFzcz1cInRleHQtc3VidGl0bGUxIHRleHQtZ3JleSBxLW10LXNtIHEtbWItbm9uZVwiPlxuICAgICAgICAgICAgICBNYW5hZ2UgYW5kIGNvbmZpZ3VyZSBncmFzcyBjdXR0aW5nIHpvbmVzIGZvciBTdGUuIEFubmVcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLWd1dHRlci1zbVwiPlxuICAgICAgICAgICAgPHEtYnRuIGNvbG9yPVwicHJpbWFyeVwiIGljb249XCJhZGRcIiBsYWJlbD1cIkFkZCBab25lXCIgQGNsaWNrPVwic2hvd0FkZFpvbmVcIiAvPlxuICAgICAgICAgICAgPHEtYnRuIG91dGxpbmUgY29sb3I9XCJpbmZvXCIgaWNvbj1cIm1hcFwiIGxhYmVsPVwiVmlldyBNYXBcIiBAY2xpY2s9XCIkcm91dGVyLnB1c2goJy8nKVwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDwhLS0gWm9uZSBHcmlkIC0tPlxuICAgICAgPGRpdiBjbGFzcz1cInpvbmUtZ3JpZFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93IHEtZ3V0dGVyLW1kXCI+XG4gICAgICAgICAgPGRpdiB2LWZvcj1cInpvbmUgaW4gc2NoZWR1bGVTdG9yZS56b25lc1wiIDprZXk9XCJ6b25lLmlkXCIgY2xhc3M9XCJjb2wtMTIgY29sLXNtLTYgY29sLW1kLTRcIj5cbiAgICAgICAgICAgIDxxLWNhcmRcbiAgICAgICAgICAgICAgZmxhdFxuICAgICAgICAgICAgICBib3JkZXJlZFxuICAgICAgICAgICAgICBjbGFzcz1cInpvbmUtY2FyZCBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgIEBjbGljaz1cInNjaGVkdWxlU3RvcmUuc2VsZWN0Wm9uZSh6b25lKVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDwhLS0gWm9uZSBJbWFnZSAtLT5cbiAgICAgICAgICAgICAgPHEtaW1nIDpzcmM9XCJ6b25lLmltYWdlXCIgOmFsdD1cInpvbmUubmFtZVwiIGhlaWdodD1cIjE2MHB4XCIgY2xhc3M9XCJ6b25lLWltYWdlXCI+XG4gICAgICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDplcnJvcj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhYnNvbHV0ZS1mdWxsIGZsZXggZmxleC1jZW50ZXIgYmctZ3JleS0zXCI+XG4gICAgICAgICAgICAgICAgICAgIDxxLWljb24gbmFtZT1cInRlcnJhaW5cIiBzaXplPVwiM3JlbVwiIGNvbG9yPVwiZ3JleS02XCIgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG5cbiAgICAgICAgICAgICAgICA8IS0tIFN0YXR1cyBCYWRnZSAtLT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWJzb2x1dGUtdG9wLXJpZ2h0IHEtbWEtc21cIj5cbiAgICAgICAgICAgICAgICAgIDxxLWNoaXBcbiAgICAgICAgICAgICAgICAgICAgOmNvbG9yPVwiem9uZS5jb21wbGV0ZWQgPyAncG9zaXRpdmUnIDogJ3dhcm5pbmcnXCJcbiAgICAgICAgICAgICAgICAgICAgdGV4dC1jb2xvcj1cIndoaXRlXCJcbiAgICAgICAgICAgICAgICAgICAgaWNvbj1cInNjaGVkdWxlXCJcbiAgICAgICAgICAgICAgICAgICAgc2l6ZT1cInNtXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge3sgem9uZS5jb21wbGV0ZWQgPyAnRG9uZScgOiAnUGVuZGluZycgfX1cbiAgICAgICAgICAgICAgICAgIDwvcS1jaGlwPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L3EtaW1nPlxuXG4gICAgICAgICAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNiBxLW1iLXhzXCI+e3sgem9uZS5uYW1lIH19PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtY2FwdGlvbiB0ZXh0LWdyZXkgcS1tYi1zbVwiPlxuICAgICAgICAgICAgICAgICAge3sgem9uZS5kZXNjcmlwdGlvbiB9fVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPCEtLSBab25lIERldGFpbHMgLS0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInpvbmUtZGV0YWlscyBxLWd1dHRlci14c1wiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHEtaWNvbiBuYW1lPVwiZXZlbnRcIiBzaXplPVwic21cIiBjbGFzcz1cInEtbXIteHNcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtYm9keTJcIiA6Y2xhc3M9XCJgc2NoZWR1bGUtJHt6b25lLnNjaGVkdWxlZERheS50b0xvd2VyQ2FzZSgpfWBcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7eyB6b25lLnNjaGVkdWxlZERheSB9fVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHEtaWNvbiBuYW1lPVwiZmxhZ1wiIHNpemU9XCJzbVwiIGNsYXNzPVwicS1tci14c1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1ib2R5MlwiPnt7IHpvbmUucHJpb3JpdHkgfX0gcHJpb3JpdHk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHEtaWNvbiBuYW1lPVwic2NoZWR1bGVcIiBzaXplPVwic21cIiBjbGFzcz1cInEtbXIteHNcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtYm9keTJcIj57eyB6b25lLmVzdGltYXRlZFRpbWUgfX0gbWluPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG5cbiAgICAgICAgICAgICAgPHEtY2FyZC1hY3Rpb25zIGFsaWduPVwicmlnaHRcIj5cbiAgICAgICAgICAgICAgICA8cS1idG5cbiAgICAgICAgICAgICAgICAgIGZsYXRcbiAgICAgICAgICAgICAgICAgIDpjb2xvcj1cInpvbmUuY29tcGxldGVkID8gJ3Bvc2l0aXZlJyA6ICdncmV5J1wiXG4gICAgICAgICAgICAgICAgICA6aWNvbj1cInpvbmUuY29tcGxldGVkID8gJ2NoZWNrX2NpcmNsZScgOiAncmFkaW9fYnV0dG9uX3VuY2hlY2tlZCdcIlxuICAgICAgICAgICAgICAgICAgQGNsaWNrLnN0b3A9XCJ0b2dnbGVab25lU3RhdHVzKHpvbmUpXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgICAgICAgZmxhdFxuICAgICAgICAgICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgICAgICAgIGljb249XCJ2aXNpYmlsaXR5XCJcbiAgICAgICAgICAgICAgICAgIEBjbGljay5zdG9wPVwic2NoZWR1bGVTdG9yZS5zZWxlY3Rab25lKHpvbmUpXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L3EtY2FyZC1hY3Rpb25zPlxuICAgICAgICAgICAgPC9xLWNhcmQ+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDwhLS0gRW1wdHkgU3RhdGUgLS0+XG4gICAgICA8ZGl2IHYtaWY9XCJzY2hlZHVsZVN0b3JlLnpvbmVzLmxlbmd0aCA9PT0gMFwiIGNsYXNzPVwiZW1wdHktc3RhdGUgdGV4dC1jZW50ZXIgcS1wYS14bFwiPlxuICAgICAgICA8cS1pY29uIG5hbWU9XCJsb2NhdGlvbl9vZmZcIiBzaXplPVwiNnJlbVwiIGNvbG9yPVwiZ3JleS00XCIgLz5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDUgcS1tdC1tZCB0ZXh0LWdyZXlcIj5ObyB6b25lcyBjb25maWd1cmVkPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWJvZHkxIHRleHQtZ3JleSBxLW1iLWxnXCI+XG4gICAgICAgICAgU3RhcnQgYnkgYWRkaW5nIHlvdXIgZmlyc3QgZ3Jhc3MgY3V0dGluZyB6b25lXG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8cS1idG5cbiAgICAgICAgICBjb2xvcj1cInByaW1hcnlcIlxuICAgICAgICAgIGljb249XCJhZGRfbG9jYXRpb25cIlxuICAgICAgICAgIGxhYmVsPVwiQ3JlYXRlIEZpcnN0IFpvbmVcIlxuICAgICAgICAgIEBjbGljaz1cInNob3dBZGRab25lXCJcbiAgICAgICAgICBzaXplPVwibGdcIlxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8IS0tIFpvbmUgRGV0YWlscyBEaWFsb2cgLS0+XG4gICAgPFpvbmVEZXRhaWxzRGlhbG9nIC8+XG4gIDwvcS1wYWdlPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IG9uTW91bnRlZCB9IGZyb20gJ3Z1ZSdcbmltcG9ydCB7IHVzZVF1YXNhciB9IGZyb20gJ3F1YXNhcidcbmltcG9ydCB7IHVzZVNjaGVkdWxlU3RvcmUgfSBmcm9tICcuLi9zdG9yZXMvc2NoZWR1bGUtc3RvcmUuanMnXG5pbXBvcnQgWm9uZURldGFpbHNEaWFsb2cgZnJvbSAnLi4vY29tcG9uZW50cy9ab25lRGV0YWlsc0RpYWxvZy52dWUnXG5cbmNvbnN0ICRxID0gdXNlUXVhc2FyKClcbmNvbnN0IHNjaGVkdWxlU3RvcmUgPSB1c2VTY2hlZHVsZVN0b3JlKClcblxuLy8gU2V0IHVwIG5vdGlmaWNhdGlvbnMgZm9yIHRoZSBzdG9yZVxub25Nb3VudGVkKCgpID0+IHtcbiAgc2NoZWR1bGVTdG9yZS5zZXROb3RpZnlGdW5jdGlvbigkcS5ub3RpZnkpXG59KVxuXG4vLyBNZXRob2RzXG5jb25zdCB0b2dnbGVab25lU3RhdHVzID0gYXN5bmMgKHpvbmUpID0+IHtcbiAgYXdhaXQgc2NoZWR1bGVTdG9yZS51cGRhdGVab25lU3RhdHVzKHpvbmUuaWQsICF6b25lLmNvbXBsZXRlZClcbn1cblxuY29uc3Qgc2hvd0FkZFpvbmUgPSAoKSA9PiB7XG4gICRxLm5vdGlmeSh7XG4gICAgdHlwZTogJ2luZm8nLFxuICAgIG1lc3NhZ2U6ICdab25lIGNyZWF0aW9uIGZlYXR1cmUgY29taW5nIGluIG5leHQgZGV2ZWxvcG1lbnQgcGhhc2UhJyxcbiAgICBpY29uOiAnY29uc3RydWN0aW9uJyxcbiAgfSlcbn1cbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cInNjc3NcIiBzY29wZWQ+XG4uem9uZXMtcGFnZSB7XG4gIG1heC13aWR0aDogMTIwMHB4O1xuICBtYXJnaW46IDAgYXV0bztcbn1cblxuLnBhZ2UtaGVhZGVyIHtcbiAgaDEge1xuICAgIGZvbnQtd2VpZ2h0OiAzMDA7XG4gIH1cbn1cblxuLnpvbmUtZ3JpZCB7XG4gIC56b25lLWNhcmQge1xuICAgIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XG4gICAgaGVpZ2h0OiAxMDAlO1xuXG4gICAgJjpob3ZlciB7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTRweCk7XG4gICAgICBib3gtc2hhZG93OiAwIDhweCAyNHB4IHJnYmEoMCwgMCwgMCwgMC4xNSk7XG4gICAgfVxuICB9XG5cbiAgLnpvbmUtaW1hZ2Uge1xuICAgIGJvcmRlci1yYWRpdXM6IDhweCA4cHggMCAwO1xuICB9XG5cbiAgLnpvbmUtZGV0YWlscyB7XG4gICAgLnJvdyB7XG4gICAgICBtYXJnaW4tYm90dG9tOiA0cHg7XG5cbiAgICAgICY6bGFzdC1jaGlsZCB7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDA7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi5lbXB0eS1zdGF0ZSB7XG4gIG1pbi1oZWlnaHQ6IDQwMHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cblxuLy8gTW9iaWxlIGFkanVzdG1lbnRzXG5AbWVkaWEgKG1heC13aWR0aDogNTk5cHgpIHtcbiAgLnBhZ2UtaGVhZGVyIHtcbiAgICAucm93IHtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgICAgIGdhcDogMTZweDtcbiAgICB9XG4gIH1cblxuICAuem9uZS1ncmlkIHtcbiAgICAuY29sLTEyIHtcbiAgICAgIHBhZGRpbmc6IDRweDtcbiAgICB9XG4gIH1cbn1cbjwvc3R5bGU+XG4iXSwibmFtZXMiOlsiX2NyZWF0ZUJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl9jcmVhdGVWTm9kZSIsIl9vcGVuQmxvY2siLCJfY3JlYXRlRWxlbWVudEJsb2NrIiwiX0ZyYWdtZW50IiwiX3JlbmRlckxpc3QiLCJfY3JlYXRlVGV4dFZOb2RlIiwiX3RvRGlzcGxheVN0cmluZyIsIl93aXRoTW9kaWZpZXJzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBNkhBLFVBQU0sS0FBSyxVQUFTO0FBQ3BCLFVBQU0sZ0JBQWdCLGlCQUFnQjtBQUd0QyxjQUFVLE1BQU07QUFDZCxvQkFBYyxrQkFBa0IsR0FBRyxNQUFNO0FBQUEsSUFDM0MsQ0FBQztBQUdELFVBQU0sbUJBQW1CLE9BQU8sU0FBUztBQUN2QyxZQUFNLGNBQWMsaUJBQWlCLEtBQUssSUFBSSxDQUFDLEtBQUssU0FBUztBQUFBLElBQy9EO0FBRUEsVUFBTSxjQUFjLE1BQU07QUFDeEIsU0FBRyxPQUFPO0FBQUEsUUFDUixNQUFNO0FBQUEsUUFDTixTQUFTO0FBQUEsUUFDVCxNQUFNO0FBQUEsTUFDVixDQUFHO0FBQUEsSUFDSDs7Ozs7Ozs7OztBQTlJUyxNQUFBLGFBQUEsRUFBQSxPQUFNLGFBQVk7QUFFaEIsTUFBQSxhQUFBLEVBQUEsT0FBTSxzQkFBcUI7QUFDekIsTUFBQSxhQUFBLEVBQUEsT0FBTSxtQ0FBa0M7QUFRdEMsTUFBQSxhQUFBLEVBQUEsT0FBTSxjQUFhO0FBUXZCLE1BQUEsYUFBQSxFQUFBLE9BQU0sWUFBVztBQUNmLE1BQUEsYUFBQSxFQUFBLE9BQU0sa0JBQWlCO0FBV2IsTUFBQSxhQUFBLEVBQUEsT0FBTSwyQ0FBMEM7QUFNbEQsTUFBQSxhQUFBLEVBQUEsT0FBTSw2QkFBNEI7QUFhbEMsTUFBQSxhQUFBLEVBQUEsT0FBTSxrQkFBaUI7QUFDdkIsTUFBQSxjQUFBLEVBQUEsT0FBTSxpQ0FBZ0M7QUFLdEMsTUFBQSxjQUFBLEVBQUEsT0FBTSwyQkFBMEI7QUFDOUIsTUFBQSxjQUFBLEVBQUEs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
