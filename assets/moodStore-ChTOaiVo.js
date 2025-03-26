import { b as computed, a3 as onDeactivated, e as onBeforeUnmount, af as vmIsDestroyed, g as getCurrentInstance, a as createComponent, r as ref, i as isRuntimeSsrPreHydration, o as onMounted, h, a6 as Transition, d as hSlot, a5 as QSpinner, w as watch, ax as defineStore } from "./index-how_DIE1.js";
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
    const position = ref(0);
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
      position.value = position.value ^ 1;
      images[position.value].value = null;
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
      images[position.value].value = errorImg.value;
      images[position.value ^ 1].value = placeholderImg.value;
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
      if (position.value === index) {
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
              images[position.value ^ 1].value = placeholderImg.value;
            } else {
              setLoading();
            }
            images[position.value].value = imgProps;
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
const useDarkProps = {
  dark: {
    type: Boolean,
    default: null
  }
};
function useDark(props, $q) {
  return computed(() => props.dark === null ? $q.dark.isActive : props.dark);
}
const useFormProps = {
  name: String
};
function useFormInject(formAttrs = {}) {
  return (child, action, className) => {
    child[action](
      h("input", {
        class: "hidden" + (className || ""),
        ...formAttrs.value
      })
    );
  };
}
function useFormInputNameAttr(props) {
  return computed(() => props.name || props.for);
}
console.log("[moodStore] Loaded");
const useMoodStore = defineStore("mood", {
  state: () => ({
    currentMood: null,
    // Define mood configurations
    //Tranquil - relaxed, Euphoric - happy, Reflective - nostalgic, Melancholic - sad, Contemplative - study
    moods: {
      Neutral: {
        uiTheme: "default",
        toneFrequencies: {
          theta: { left: "82.41", right: "86.41" },
          alpha: { left: "82.41", right: "74.41" },
          delta: { left: "82.41", right: "82.91" },
          beta: { left: "82.41", right: "95" },
          gamma: { left: "82.41", right: "112.41" }
        },
        stemSources: [
          {
            id: "drone",
            name: "Drone",
            src: "/stems/dronemid.mp3",
            position: { x: 0, y: 0, z: -1 },
            active: true
          },
          {
            id: "shimmer",
            name: "Shimmer",
            src: "/stems/dronehi4.mp3",
            position: { x: 1.5, y: 0, z: -2 },
            active: true
          }
        ],
        spatialPreset: {
          listenerPosition: { x: 0, y: 1.6, z: 0 },
          // Average ear height
          environment: "room",
          positions: {
            drone: { x: 0, y: 0, z: -3 },
            // Front-center
            shimmer: { x: 2, y: 1, z: -2 }
            // Right-high
          }
        }
      },
      Anxious: {
        uiTheme: "ecstatic",
        toneFrequencies: {
          theta: { left: "110", right: "114" },
          alpha: { left: "110", right: "102" },
          delta: { left: "110", right: "109.5" },
          beta: { left: "110", right: "97" },
          gamma: { left: "110", right: "140" }
        },
        stemSources: [
          { name: "Bass Drone", src: "/stems/meditate/med-drone.mp3", active: true },
          { name: "Shimmer", src: "/stems/meditate/med-shimmer.mp3", active: true },
          { name: "Low Atmosphere", src: "/stems//meditate/med-bass.mp3", active: true },
          { name: "Melodic", src: "/stems/meditate/med-melodic.mp3", active: true }
        ]
      },
      Tranquil: {
        uiTheme: "tranquil",
        toneFrequencies: {
          theta: { left: "G6", right: "G4" },
          alpha: { left: "A3", right: "A4" },
          delta: { left: "F3", right: "F4" },
          beta: { left: "B3", right: "B4" },
          gamma: { left: "82.41", right: "95" }
        },
        stemSources: [
          { name: "Drone", src: "/stems/dronemid.mp3", active: true, sound: null },
          { name: "Shimmer", src: "/stems/dronehi4.mp3", active: true, sound: null },
          { name: "Bass", src: "/stems/bass3.mp3", active: true, sound: null },
          { name: "Melodic", src: "/stems/padmelohi.mp3", active: true, sound: null }
        ]
      },
      Reflective: {
        uiTheme: "reflective",
        toneFrequencies: {
          theta: { left: "G2", right: "G4" },
          alpha: { left: "A3", right: "A4" },
          delta: { left: "F3", right: "F4" },
          beta: { left: "B3", right: "B4" },
          gamma: { left: "82.41", right: "95" }
        },
        stemSources: [
          { name: "Bass", src: "/stems/reflective/reflect-bass.mp3", active: true, sound: null },
          {
            name: "Atmosphere",
            src: "/stems/reflective/reflect-atmosphere.mp3",
            active: true,
            sound: null
          },
          { name: "Synth", src: "/stems/reflective/reflect-synth.mp3", active: true, sound: null },
          {
            name: "Arpreggiator",
            src: "/stems/reflective/reflec-arp.mp3",
            active: true,
            sound: null
          },
          { name: "Noise", src: "/stems/reflective/reflect-noise.mp3", active: true, sound: null }
        ]
      },
      Melancholic: {
        uiTheme: "melancholic",
        toneFrequencies: {
          theta: { left: "G5", right: "G4" },
          alpha: { left: "A3", right: "A4" },
          delta: { left: "F3", right: "F4" },
          beta: { left: "B3", right: "B4" },
          gamma: { left: "82.41", right: "95" }
        },
        stemSources: [
          { name: "Drone", src: "/stems/dronemid.mp3", active: true, sound: null },
          { name: "Shimmer", src: "/stems/dronehi4.mp3", active: true, sound: null },
          { name: "Bass", src: "/stems/bass3.mp3", active: true, sound: null },
          { name: "Melodic", src: "/stems/padmelohi.mp3", active: true, sound: null }
        ]
      }
      // Add additional moods (Study, Relax, etc.) as needed
    }
  }),
  actions: {
    initializeMood() {
      this.setMood("Neutral");
    },
    setMood(moodName) {
      if (this.moods[moodName]) {
        this.currentMood = {
          name: moodName,
          ...this.moods[moodName]
        };
        this.loadSpatialPreset();
      }
    },
    loadSpatialPreset() {
      if (this.currentMood?.spatialPreset) {
        this.currentMood.stemSources = this.currentMood.stemSources.map((stem) => ({
          ...stem,
          position: this.currentMood.spatialPreset.positions[stem.id] || stem.position
        }));
      }
    }
  },
  getters: {
    moodOptions: (state) => Object.keys(state.moods).map((mood) => ({
      label: mood,
      value: mood
    })),
    currentToneFrequencies: (state) => state.currentMood?.toneFrequencies || state.moods.Neutral.toneFrequencies,
    currentStemSources: (state) => state.currentMood?.stemSources || state.moods.Neutral.stemSources,
    currentSpatialConfig: (state) => state.currentMood?.spatialPreset || state.moods.Neutral.spatialPreset
  }
});
export {
  QImg as Q,
  useDark as a,
  useTimeout as b,
  useFormProps as c,
  useFormInputNameAttr as d,
  useMoodStore as e,
  useFormInject as f,
  useDarkProps as u
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9vZFN0b3JlLUNoVE9haVZvLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1yYXRpby91c2UtcmF0aW8uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy91c2UtdGltZW91dC91c2UtdGltZW91dC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvaW1nL1FJbWcuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1kYXJrL3VzZS1kYXJrLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvdXNlLWZvcm0vcHJpdmF0ZS51c2UtZm9ybS5qcyIsIi4uLy4uLy4uL3NyYy9zdG9yZXMvbW9vZFN0b3JlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5leHBvcnQgY29uc3QgdXNlUmF0aW9Qcm9wcyA9IHtcbiAgcmF0aW86IFsgU3RyaW5nLCBOdW1iZXIgXVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIG5hdHVyYWxSYXRpbykge1xuICAvLyByZXR1cm4gcmF0aW9TdHlsZVxuICByZXR1cm4gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGNvbnN0IHJhdGlvID0gTnVtYmVyKFxuICAgICAgcHJvcHMucmF0aW8gfHwgKG5hdHVyYWxSYXRpbyAhPT0gdm9pZCAwID8gbmF0dXJhbFJhdGlvLnZhbHVlIDogdm9pZCAwKVxuICAgIClcblxuICAgIHJldHVybiBpc05hTihyYXRpbykgIT09IHRydWUgJiYgcmF0aW8gPiAwXG4gICAgICA/IHsgcGFkZGluZ0JvdHRvbTogYCR7IDEwMCAvIHJhdGlvIH0lYCB9XG4gICAgICA6IG51bGxcbiAgfSlcbn1cbiIsImltcG9ydCB7IG9uRGVhY3RpdmF0ZWQsIG9uQmVmb3JlVW5tb3VudCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyB2bUlzRGVzdHJveWVkIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS52bS92bS5qcydcblxuLypcbiAqIFVzYWdlOlxuICogICAgcmVnaXN0ZXJUaW1lb3V0KGZuWywgZGVsYXldKVxuICogICAgcmVtb3ZlVGltZW91dCgpXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICBsZXQgdGltZXIgPSBudWxsXG4gIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICBmdW5jdGlvbiByZW1vdmVUaW1lb3V0ICgpIHtcbiAgICBpZiAodGltZXIgIT09IG51bGwpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICAgIHRpbWVyID0gbnVsbFxuICAgIH1cbiAgfVxuXG4gIG9uRGVhY3RpdmF0ZWQocmVtb3ZlVGltZW91dClcbiAgb25CZWZvcmVVbm1vdW50KHJlbW92ZVRpbWVvdXQpXG5cbiAgcmV0dXJuIHtcbiAgICByZW1vdmVUaW1lb3V0LFxuXG4gICAgcmVnaXN0ZXJUaW1lb3V0IChmbiwgZGVsYXkpIHtcbiAgICAgIHJlbW92ZVRpbWVvdXQoKVxuXG4gICAgICBpZiAodm1Jc0Rlc3Ryb3llZCh2bSkgPT09IGZhbHNlKSB7XG4gICAgICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGltZXIgPSBudWxsXG4gICAgICAgICAgZm4oKVxuICAgICAgICB9LCBkZWxheSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIHdhdGNoLCBvbk1vdW50ZWQsIFRyYW5zaXRpb24sIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFTcGlubmVyIGZyb20gJy4uL3NwaW5uZXIvUVNwaW5uZXIuanMnXG5cbmltcG9ydCB7IGlzUnVudGltZVNzclByZUh5ZHJhdGlvbiB9IGZyb20gJy4uLy4uL3BsdWdpbnMvcGxhdGZvcm0vUGxhdGZvcm0uanMnXG5pbXBvcnQgdXNlUmF0aW8sIHsgdXNlUmF0aW9Qcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLXJhdGlvL3VzZS1yYXRpby5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5pbXBvcnQgeyB2bUlzRGVzdHJveWVkIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS52bS92bS5qcydcbmltcG9ydCB1c2VUaW1lb3V0IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3VzZS10aW1lb3V0L3VzZS10aW1lb3V0LmpzJ1xuXG5jb25zdCBkZWZhdWx0UmF0aW8gPSAxLjc3NzggLyogMTYvOSAqL1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUltZycsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VSYXRpb1Byb3BzLFxuXG4gICAgc3JjOiBTdHJpbmcsXG4gICAgc3Jjc2V0OiBTdHJpbmcsXG4gICAgc2l6ZXM6IFN0cmluZyxcblxuICAgIGFsdDogU3RyaW5nLFxuICAgIGNyb3Nzb3JpZ2luOiBTdHJpbmcsXG4gICAgZGVjb2Rpbmc6IFN0cmluZyxcbiAgICByZWZlcnJlcnBvbGljeTogU3RyaW5nLFxuXG4gICAgZHJhZ2dhYmxlOiBCb29sZWFuLFxuXG4gICAgbG9hZGluZzoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2xhenknXG4gICAgfSxcbiAgICBsb2FkaW5nU2hvd0RlbGF5OiB7XG4gICAgICB0eXBlOiBbIE51bWJlciwgU3RyaW5nIF0sXG4gICAgICBkZWZhdWx0OiAwXG4gICAgfSxcblxuICAgIGZldGNocHJpb3JpdHk6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdhdXRvJ1xuICAgIH0sXG4gICAgd2lkdGg6IFN0cmluZyxcbiAgICBoZWlnaHQ6IFN0cmluZyxcbiAgICBpbml0aWFsUmF0aW86IHtcbiAgICAgIHR5cGU6IFsgTnVtYmVyLCBTdHJpbmcgXSxcbiAgICAgIGRlZmF1bHQ6IGRlZmF1bHRSYXRpb1xuICAgIH0sXG5cbiAgICBwbGFjZWhvbGRlclNyYzogU3RyaW5nLFxuICAgIGVycm9yU3JjOiBTdHJpbmcsXG5cbiAgICBmaXQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdjb3ZlcidcbiAgICB9LFxuICAgIHBvc2l0aW9uOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnNTAlIDUwJSdcbiAgICB9LFxuXG4gICAgaW1nQ2xhc3M6IFN0cmluZyxcbiAgICBpbWdTdHlsZTogT2JqZWN0LFxuXG4gICAgbm9TcGlubmVyOiBCb29sZWFuLFxuICAgIG5vTmF0aXZlTWVudTogQm9vbGVhbixcbiAgICBub1RyYW5zaXRpb246IEJvb2xlYW4sXG5cbiAgICBzcGlubmVyQ29sb3I6IFN0cmluZyxcbiAgICBzcGlubmVyU2l6ZTogU3RyaW5nXG4gIH0sXG5cbiAgZW1pdHM6IFsgJ2xvYWQnLCAnZXJyb3InIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0IH0pIHtcbiAgICBjb25zdCBuYXR1cmFsUmF0aW8gPSByZWYocHJvcHMuaW5pdGlhbFJhdGlvKVxuICAgIGNvbnN0IHJhdGlvU3R5bGUgPSB1c2VSYXRpbyhwcm9wcywgbmF0dXJhbFJhdGlvKVxuICAgIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIGNvbnN0IHsgcmVnaXN0ZXJUaW1lb3V0OiByZWdpc3RlckxvYWRUaW1lb3V0LCByZW1vdmVUaW1lb3V0OiByZW1vdmVMb2FkVGltZW91dCB9ID0gdXNlVGltZW91dCgpXG4gICAgY29uc3QgeyByZWdpc3RlclRpbWVvdXQ6IHJlZ2lzdGVyTG9hZFNob3dUaW1lb3V0LCByZW1vdmVUaW1lb3V0OiByZW1vdmVMb2FkU2hvd1RpbWVvdXQgfSA9IHVzZVRpbWVvdXQoKVxuXG4gICAgY29uc3QgcGxhY2Vob2xkZXJJbWcgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5wbGFjZWhvbGRlclNyYyAhPT0gdm9pZCAwXG4gICAgICAgID8geyBzcmM6IHByb3BzLnBsYWNlaG9sZGVyU3JjIH1cbiAgICAgICAgOiBudWxsXG4gICAgKSlcblxuICAgIGNvbnN0IGVycm9ySW1nID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuZXJyb3JTcmMgIT09IHZvaWQgMFxuICAgICAgICA/IHsgc3JjOiBwcm9wcy5lcnJvclNyYywgX19xZXJyb3I6IHRydWUgfVxuICAgICAgICA6IG51bGxcbiAgICApKVxuXG4gICAgY29uc3QgaW1hZ2VzID0gW1xuICAgICAgcmVmKG51bGwpLFxuICAgICAgcmVmKHBsYWNlaG9sZGVySW1nLnZhbHVlKVxuICAgIF1cblxuICAgIGNvbnN0IHBvc2l0aW9uID0gcmVmKDApXG5cbiAgICBjb25zdCBpc0xvYWRpbmcgPSByZWYoZmFsc2UpXG4gICAgY29uc3QgaGFzRXJyb3IgPSByZWYoZmFsc2UpXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIGBxLWltZyBxLWltZy0tJHsgcHJvcHMubm9OYXRpdmVNZW51ID09PSB0cnVlID8gJ25vLScgOiAnJyB9bWVudWBcbiAgICApXG5cbiAgICBjb25zdCBzdHlsZSA9IGNvbXB1dGVkKCgpID0+ICh7XG4gICAgICB3aWR0aDogcHJvcHMud2lkdGgsXG4gICAgICBoZWlnaHQ6IHByb3BzLmhlaWdodFxuICAgIH0pKVxuXG4gICAgY29uc3QgaW1nQ2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgYHEtaW1nX19pbWFnZSAkeyBwcm9wcy5pbWdDbGFzcyAhPT0gdm9pZCAwID8gcHJvcHMuaW1nQ2xhc3MgKyAnICcgOiAnJyB9YFxuICAgICAgKyBgcS1pbWdfX2ltYWdlLS13aXRoJHsgcHJvcHMubm9UcmFuc2l0aW9uID09PSB0cnVlID8gJ291dCcgOiAnJyB9LXRyYW5zaXRpb25gXG4gICAgICArICcgcS1pbWdfX2ltYWdlLS0nXG4gICAgKVxuXG4gICAgY29uc3QgaW1nU3R5bGUgPSBjb21wdXRlZCgoKSA9PiAoe1xuICAgICAgLi4ucHJvcHMuaW1nU3R5bGUsXG4gICAgICBvYmplY3RGaXQ6IHByb3BzLmZpdCxcbiAgICAgIG9iamVjdFBvc2l0aW9uOiBwcm9wcy5wb3NpdGlvblxuICAgIH0pKVxuXG4gICAgZnVuY3Rpb24gc2V0TG9hZGluZyAoKSB7XG4gICAgICByZW1vdmVMb2FkU2hvd1RpbWVvdXQoKVxuXG4gICAgICBpZiAocHJvcHMubG9hZGluZ1Nob3dEZWxheSA9PT0gMCkge1xuICAgICAgICBpc0xvYWRpbmcudmFsdWUgPSB0cnVlXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICByZWdpc3RlckxvYWRTaG93VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlzTG9hZGluZy52YWx1ZSA9IHRydWVcbiAgICAgIH0sIHByb3BzLmxvYWRpbmdTaG93RGVsYXkpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYXJMb2FkaW5nICgpIHtcbiAgICAgIHJlbW92ZUxvYWRTaG93VGltZW91dCgpXG4gICAgICBpc0xvYWRpbmcudmFsdWUgPSBmYWxzZVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTG9hZCAoeyB0YXJnZXQgfSkge1xuICAgICAgaWYgKHZtSXNEZXN0cm95ZWQodm0pID09PSBmYWxzZSkge1xuICAgICAgICByZW1vdmVMb2FkVGltZW91dCgpXG5cbiAgICAgICAgbmF0dXJhbFJhdGlvLnZhbHVlID0gdGFyZ2V0Lm5hdHVyYWxIZWlnaHQgPT09IDBcbiAgICAgICAgICA/IDAuNVxuICAgICAgICAgIDogdGFyZ2V0Lm5hdHVyYWxXaWR0aCAvIHRhcmdldC5uYXR1cmFsSGVpZ2h0XG5cbiAgICAgICAgd2FpdEZvckNvbXBsZXRlbmVzcyh0YXJnZXQsIDEpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gd2FpdEZvckNvbXBsZXRlbmVzcyAodGFyZ2V0LCBjb3VudCkge1xuICAgICAgLy8gcHJvdGVjdCBhZ2FpbnN0IHJ1bm5pbmcgZm9yZXZlclxuICAgICAgaWYgKGNvdW50ID09PSAxMDAwIHx8IHZtSXNEZXN0cm95ZWQodm0pID09PSB0cnVlKSByZXR1cm5cblxuICAgICAgaWYgKHRhcmdldC5jb21wbGV0ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBvblJlYWR5KHRhcmdldClcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZWdpc3RlckxvYWRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB3YWl0Rm9yQ29tcGxldGVuZXNzKHRhcmdldCwgY291bnQgKyAxKVxuICAgICAgICB9LCA1MClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblJlYWR5ICh0YXJnZXQpIHtcbiAgICAgIGlmICh2bUlzRGVzdHJveWVkKHZtKSA9PT0gdHJ1ZSkgcmV0dXJuXG5cbiAgICAgIHBvc2l0aW9uLnZhbHVlID0gcG9zaXRpb24udmFsdWUgXiAxXG4gICAgICBpbWFnZXNbIHBvc2l0aW9uLnZhbHVlIF0udmFsdWUgPSBudWxsXG5cbiAgICAgIGNsZWFyTG9hZGluZygpXG5cbiAgICAgIGlmICh0YXJnZXQuZ2V0QXR0cmlidXRlKCdfX3FlcnJvcicpICE9PSAndHJ1ZScpIHtcbiAgICAgICAgaGFzRXJyb3IudmFsdWUgPSBmYWxzZVxuICAgICAgfVxuXG4gICAgICBlbWl0KCdsb2FkJywgdGFyZ2V0LmN1cnJlbnRTcmMgfHwgdGFyZ2V0LnNyYylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkVycm9yIChlcnIpIHtcbiAgICAgIHJlbW92ZUxvYWRUaW1lb3V0KClcbiAgICAgIGNsZWFyTG9hZGluZygpXG5cbiAgICAgIGhhc0Vycm9yLnZhbHVlID0gdHJ1ZVxuICAgICAgaW1hZ2VzWyBwb3NpdGlvbi52YWx1ZSBdLnZhbHVlID0gZXJyb3JJbWcudmFsdWVcbiAgICAgIGltYWdlc1sgcG9zaXRpb24udmFsdWUgXiAxIF0udmFsdWUgPSBwbGFjZWhvbGRlckltZy52YWx1ZVxuXG4gICAgICBlbWl0KCdlcnJvcicsIGVycilcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRJbWFnZSAoaW5kZXgpIHtcbiAgICAgIGNvbnN0IGltZyA9IGltYWdlc1sgaW5kZXggXS52YWx1ZVxuXG4gICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICBrZXk6ICdpbWdfJyArIGluZGV4LFxuICAgICAgICBjbGFzczogaW1nQ2xhc3MudmFsdWUsXG4gICAgICAgIHN0eWxlOiBpbWdTdHlsZS52YWx1ZSxcbiAgICAgICAgYWx0OiBwcm9wcy5hbHQsXG4gICAgICAgIGNyb3Nzb3JpZ2luOiBwcm9wcy5jcm9zc29yaWdpbixcbiAgICAgICAgZGVjb2Rpbmc6IHByb3BzLmRlY29kaW5nLFxuICAgICAgICByZWZlcnJlcnBvbGljeTogcHJvcHMucmVmZXJyZXJwb2xpY3ksXG4gICAgICAgIGhlaWdodDogcHJvcHMuaGVpZ2h0LFxuICAgICAgICB3aWR0aDogcHJvcHMud2lkdGgsXG4gICAgICAgIGxvYWRpbmc6IHByb3BzLmxvYWRpbmcsXG4gICAgICAgIGZldGNocHJpb3JpdHk6IHByb3BzLmZldGNocHJpb3JpdHksXG4gICAgICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJyxcbiAgICAgICAgZHJhZ2dhYmxlOiBwcm9wcy5kcmFnZ2FibGUsXG4gICAgICAgIC4uLmltZ1xuICAgICAgfVxuXG4gICAgICBpZiAocG9zaXRpb24udmFsdWUgPT09IGluZGV4KSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24oZGF0YSwge1xuICAgICAgICAgIGNsYXNzOiBkYXRhLmNsYXNzICsgJ2N1cnJlbnQnLFxuICAgICAgICAgIG9uTG9hZCxcbiAgICAgICAgICBvbkVycm9yXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgZGF0YS5jbGFzcyArPSAnbG9hZGVkJ1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaChcbiAgICAgICAgJ2RpdicsXG4gICAgICAgIHsgY2xhc3M6ICdxLWltZ19fY29udGFpbmVyIGFic29sdXRlLWZ1bGwnLCBrZXk6ICdpbWcnICsgaW5kZXggfSxcbiAgICAgICAgaCgnaW1nJywgZGF0YSlcbiAgICAgIClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRDb250ZW50ICgpIHtcbiAgICAgIGlmIChpc0xvYWRpbmcudmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAgICAga2V5OiAnY29udGVudCcsXG4gICAgICAgICAgY2xhc3M6ICdxLWltZ19fY29udGVudCBhYnNvbHV0ZS1mdWxsIHEtYW5jaG9yLS1za2lwJ1xuICAgICAgICB9LCBoU2xvdChzbG90c1sgaGFzRXJyb3IudmFsdWUgPT09IHRydWUgPyAnZXJyb3InIDogJ2RlZmF1bHQnIF0pKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICBrZXk6ICdsb2FkaW5nJyxcbiAgICAgICAgY2xhc3M6ICdxLWltZ19fbG9hZGluZyBhYnNvbHV0ZS1mdWxsIGZsZXggZmxleC1jZW50ZXInXG4gICAgICB9LCAoXG4gICAgICAgIHNsb3RzLmxvYWRpbmcgIT09IHZvaWQgMFxuICAgICAgICAgID8gc2xvdHMubG9hZGluZygpXG4gICAgICAgICAgOiAoXG4gICAgICAgICAgICAgIHByb3BzLm5vU3Bpbm5lciA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAgID8gdm9pZCAwXG4gICAgICAgICAgICAgICAgOiBbXG4gICAgICAgICAgICAgICAgICAgIGgoUVNwaW5uZXIsIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogcHJvcHMuc3Bpbm5lckNvbG9yLFxuICAgICAgICAgICAgICAgICAgICAgIHNpemU6IHByb3BzLnNwaW5uZXJTaXplXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICApXG4gICAgICApKVxuICAgIH1cblxuICAgIGlmIChfX1FVQVNBUl9TU1JfU0VSVkVSX18gIT09IHRydWUpIHtcbiAgICAgIGZ1bmN0aW9uIHdhdGNoU3JjICgpIHtcbiAgICAgICAgd2F0Y2goXG4gICAgICAgICAgKCkgPT4gKFxuICAgICAgICAgICAgcHJvcHMuc3JjIHx8IHByb3BzLnNyY3NldCB8fCBwcm9wcy5zaXplc1xuICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgIHNyYzogcHJvcHMuc3JjLFxuICAgICAgICAgICAgICAgICAgc3Jjc2V0OiBwcm9wcy5zcmNzZXQsXG4gICAgICAgICAgICAgICAgICBzaXplczogcHJvcHMuc2l6ZXNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIDogbnVsbFxuICAgICAgICAgICksXG4gICAgICAgICAgaW1nUHJvcHMgPT4ge1xuICAgICAgICAgICAgcmVtb3ZlTG9hZFRpbWVvdXQoKVxuICAgICAgICAgICAgaGFzRXJyb3IudmFsdWUgPSBmYWxzZVxuXG4gICAgICAgICAgICBpZiAoaW1nUHJvcHMgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgY2xlYXJMb2FkaW5nKClcbiAgICAgICAgICAgICAgaW1hZ2VzWyBwb3NpdGlvbi52YWx1ZSBeIDEgXS52YWx1ZSA9IHBsYWNlaG9sZGVySW1nLnZhbHVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgc2V0TG9hZGluZygpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGltYWdlc1sgcG9zaXRpb24udmFsdWUgXS52YWx1ZSA9IGltZ1Byb3BzXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7IGltbWVkaWF0ZTogdHJ1ZSB9XG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgaWYgKGlzUnVudGltZVNzclByZUh5ZHJhdGlvbi52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBvbk1vdW50ZWQod2F0Y2hTcmMpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgd2F0Y2hTcmMoKVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjb25zdCBjb250ZW50ID0gW11cblxuICAgICAgaWYgKHJhdGlvU3R5bGUudmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgY29udGVudC5wdXNoKFxuICAgICAgICAgIGgoJ2RpdicsIHsga2V5OiAnZmlsbGVyJywgc3R5bGU6IHJhdGlvU3R5bGUudmFsdWUgfSlcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICBpZiAoaW1hZ2VzWyAwIF0udmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgY29udGVudC5wdXNoKFxuICAgICAgICAgIGdldEltYWdlKDApXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgaWYgKGltYWdlc1sgMSBdLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIGNvbnRlbnQucHVzaChcbiAgICAgICAgICBnZXRJbWFnZSgxKVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQucHVzaChcbiAgICAgICAgaChUcmFuc2l0aW9uLCB7IG5hbWU6ICdxLXRyYW5zaXRpb24tLWZhZGUnIH0sIGdldENvbnRlbnQpXG4gICAgICApXG5cbiAgICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAgIGtleTogJ21haW4nLFxuICAgICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgICAgc3R5bGU6IHN0eWxlLnZhbHVlLFxuICAgICAgICByb2xlOiAnaW1nJyxcbiAgICAgICAgJ2FyaWEtbGFiZWwnOiBwcm9wcy5hbHRcbiAgICAgIH0sIGNvbnRlbnQpXG4gICAgfVxuICB9XG59KVxuIiwiaW1wb3J0IHsgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmV4cG9ydCBjb25zdCB1c2VEYXJrUHJvcHMgPSB7XG4gIGRhcms6IHtcbiAgICB0eXBlOiBCb29sZWFuLFxuICAgIGRlZmF1bHQ6IG51bGxcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsICRxKSB7XG4gIC8vIHJldHVybiBpc0RhcmtcbiAgcmV0dXJuIGNvbXB1dGVkKCgpID0+IChcbiAgICBwcm9wcy5kYXJrID09PSBudWxsXG4gICAgICA/ICRxLmRhcmsuaXNBY3RpdmVcbiAgICAgIDogcHJvcHMuZGFya1xuICApKVxufVxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmV4cG9ydCBjb25zdCB1c2VGb3JtUHJvcHMgPSB7XG4gIG5hbWU6IFN0cmluZ1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlRm9ybUF0dHJzIChwcm9wcykge1xuICByZXR1cm4gY29tcHV0ZWQoKCkgPT4gKHtcbiAgICB0eXBlOiAnaGlkZGVuJyxcbiAgICBuYW1lOiBwcm9wcy5uYW1lLFxuICAgIHZhbHVlOiBwcm9wcy5tb2RlbFZhbHVlXG4gIH0pKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlRm9ybUluamVjdCAoZm9ybUF0dHJzID0ge30pIHtcbiAgcmV0dXJuIChjaGlsZCwgYWN0aW9uLCBjbGFzc05hbWUpID0+IHtcbiAgICBjaGlsZFsgYWN0aW9uIF0oXG4gICAgICBoKCdpbnB1dCcsIHtcbiAgICAgICAgY2xhc3M6ICdoaWRkZW4nICsgKGNsYXNzTmFtZSB8fCAnJyksXG4gICAgICAgIC4uLmZvcm1BdHRycy52YWx1ZVxuICAgICAgfSlcbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUZvcm1JbnB1dE5hbWVBdHRyIChwcm9wcykge1xuICByZXR1cm4gY29tcHV0ZWQoKCkgPT4gcHJvcHMubmFtZSB8fCBwcm9wcy5mb3IpXG59XG4iLCIvLyBzcmMvc3RvcmVzL21vb2RTdG9yZS5qc1xuY29uc29sZS5sb2coJ1ttb29kU3RvcmVdIExvYWRlZCcpXG5cbmltcG9ydCB7IGRlZmluZVN0b3JlIH0gZnJvbSAncGluaWEnXG5cbmV4cG9ydCBjb25zdCB1c2VNb29kU3RvcmUgPSBkZWZpbmVTdG9yZSgnbW9vZCcsIHtcbiAgc3RhdGU6ICgpID0+ICh7XG4gICAgY3VycmVudE1vb2Q6IG51bGwsXG5cbiAgICAvLyBEZWZpbmUgbW9vZCBjb25maWd1cmF0aW9uc1xuXG4gICAgLy9UcmFucXVpbCAtIHJlbGF4ZWQsIEV1cGhvcmljIC0gaGFwcHksIFJlZmxlY3RpdmUgLSBub3N0YWxnaWMsIE1lbGFuY2hvbGljIC0gc2FkLCBDb250ZW1wbGF0aXZlIC0gc3R1ZHlcbiAgICBtb29kczoge1xuICAgICAgTmV1dHJhbDoge1xuICAgICAgICB1aVRoZW1lOiAnZGVmYXVsdCcsXG4gICAgICAgIHRvbmVGcmVxdWVuY2llczoge1xuICAgICAgICAgIHRoZXRhOiB7IGxlZnQ6ICc4Mi40MScsIHJpZ2h0OiAnODYuNDEnIH0sXG4gICAgICAgICAgYWxwaGE6IHsgbGVmdDogJzgyLjQxJywgcmlnaHQ6ICc3NC40MScgfSxcbiAgICAgICAgICBkZWx0YTogeyBsZWZ0OiAnODIuNDEnLCByaWdodDogJzgyLjkxJyB9LFxuICAgICAgICAgIGJldGE6IHsgbGVmdDogJzgyLjQxJywgcmlnaHQ6ICc5NScgfSxcbiAgICAgICAgICBnYW1tYTogeyBsZWZ0OiAnODIuNDEnLCByaWdodDogJzExMi40MScgfSxcbiAgICAgICAgfSxcbiAgICAgICAgc3RlbVNvdXJjZXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZDogJ2Ryb25lJyxcbiAgICAgICAgICAgIG5hbWU6ICdEcm9uZScsXG4gICAgICAgICAgICBzcmM6ICcvc3RlbXMvZHJvbmVtaWQubXAzJyxcbiAgICAgICAgICAgIHBvc2l0aW9uOiB7IHg6IDAsIHk6IDAsIHo6IC0xIH0sXG4gICAgICAgICAgICBhY3RpdmU6IHRydWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZDogJ3NoaW1tZXInLFxuICAgICAgICAgICAgbmFtZTogJ1NoaW1tZXInLFxuICAgICAgICAgICAgc3JjOiAnL3N0ZW1zL2Ryb25laGk0Lm1wMycsXG4gICAgICAgICAgICBwb3NpdGlvbjogeyB4OiAxLjUsIHk6IDAsIHo6IC0yIH0sXG4gICAgICAgICAgICBhY3RpdmU6IHRydWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgc3BhdGlhbFByZXNldDoge1xuICAgICAgICAgIGxpc3RlbmVyUG9zaXRpb246IHsgeDogMCwgeTogMS42LCB6OiAwIH0sIC8vIEF2ZXJhZ2UgZWFyIGhlaWdodFxuICAgICAgICAgIGVudmlyb25tZW50OiAncm9vbScsXG4gICAgICAgICAgcG9zaXRpb25zOiB7XG4gICAgICAgICAgICBkcm9uZTogeyB4OiAwLCB5OiAwLCB6OiAtMyB9LCAvLyBGcm9udC1jZW50ZXJcbiAgICAgICAgICAgIHNoaW1tZXI6IHsgeDogMiwgeTogMSwgejogLTIgfSwgLy8gUmlnaHQtaGlnaFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgQW54aW91czoge1xuICAgICAgICB1aVRoZW1lOiAnZWNzdGF0aWMnLFxuICAgICAgICB0b25lRnJlcXVlbmNpZXM6IHtcbiAgICAgICAgICB0aGV0YTogeyBsZWZ0OiAnMTEwJywgcmlnaHQ6ICcxMTQnIH0sXG4gICAgICAgICAgYWxwaGE6IHsgbGVmdDogJzExMCcsIHJpZ2h0OiAnMTAyJyB9LFxuICAgICAgICAgIGRlbHRhOiB7IGxlZnQ6ICcxMTAnLCByaWdodDogJzEwOS41JyB9LFxuICAgICAgICAgIGJldGE6IHsgbGVmdDogJzExMCcsIHJpZ2h0OiAnOTcnIH0sXG4gICAgICAgICAgZ2FtbWE6IHsgbGVmdDogJzExMCcsIHJpZ2h0OiAnMTQwJyB9LFxuICAgICAgICB9LFxuICAgICAgICBzdGVtU291cmNlczogW1xuICAgICAgICAgIHsgbmFtZTogJ0Jhc3MgRHJvbmUnLCBzcmM6ICcvc3RlbXMvbWVkaXRhdGUvbWVkLWRyb25lLm1wMycsIGFjdGl2ZTogdHJ1ZSB9LFxuICAgICAgICAgIHsgbmFtZTogJ1NoaW1tZXInLCBzcmM6ICcvc3RlbXMvbWVkaXRhdGUvbWVkLXNoaW1tZXIubXAzJywgYWN0aXZlOiB0cnVlIH0sXG4gICAgICAgICAgeyBuYW1lOiAnTG93IEF0bW9zcGhlcmUnLCBzcmM6ICcvc3RlbXMvL21lZGl0YXRlL21lZC1iYXNzLm1wMycsIGFjdGl2ZTogdHJ1ZSB9LFxuICAgICAgICAgIHsgbmFtZTogJ01lbG9kaWMnLCBzcmM6ICcvc3RlbXMvbWVkaXRhdGUvbWVkLW1lbG9kaWMubXAzJywgYWN0aXZlOiB0cnVlIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAgVHJhbnF1aWw6IHtcbiAgICAgICAgdWlUaGVtZTogJ3RyYW5xdWlsJyxcbiAgICAgICAgdG9uZUZyZXF1ZW5jaWVzOiB7XG4gICAgICAgICAgdGhldGE6IHsgbGVmdDogJ0c2JywgcmlnaHQ6ICdHNCcgfSxcbiAgICAgICAgICBhbHBoYTogeyBsZWZ0OiAnQTMnLCByaWdodDogJ0E0JyB9LFxuICAgICAgICAgIGRlbHRhOiB7IGxlZnQ6ICdGMycsIHJpZ2h0OiAnRjQnIH0sXG4gICAgICAgICAgYmV0YTogeyBsZWZ0OiAnQjMnLCByaWdodDogJ0I0JyB9LFxuICAgICAgICAgIGdhbW1hOiB7IGxlZnQ6ICc4Mi40MScsIHJpZ2h0OiAnOTUnIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHN0ZW1Tb3VyY2VzOiBbXG4gICAgICAgICAgeyBuYW1lOiAnRHJvbmUnLCBzcmM6ICcvc3RlbXMvZHJvbmVtaWQubXAzJywgYWN0aXZlOiB0cnVlLCBzb3VuZDogbnVsbCB9LFxuICAgICAgICAgIHsgbmFtZTogJ1NoaW1tZXInLCBzcmM6ICcvc3RlbXMvZHJvbmVoaTQubXAzJywgYWN0aXZlOiB0cnVlLCBzb3VuZDogbnVsbCB9LFxuICAgICAgICAgIHsgbmFtZTogJ0Jhc3MnLCBzcmM6ICcvc3RlbXMvYmFzczMubXAzJywgYWN0aXZlOiB0cnVlLCBzb3VuZDogbnVsbCB9LFxuICAgICAgICAgIHsgbmFtZTogJ01lbG9kaWMnLCBzcmM6ICcvc3RlbXMvcGFkbWVsb2hpLm1wMycsIGFjdGl2ZTogdHJ1ZSwgc291bmQ6IG51bGwgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICBSZWZsZWN0aXZlOiB7XG4gICAgICAgIHVpVGhlbWU6ICdyZWZsZWN0aXZlJyxcbiAgICAgICAgdG9uZUZyZXF1ZW5jaWVzOiB7XG4gICAgICAgICAgdGhldGE6IHsgbGVmdDogJ0cyJywgcmlnaHQ6ICdHNCcgfSxcbiAgICAgICAgICBhbHBoYTogeyBsZWZ0OiAnQTMnLCByaWdodDogJ0E0JyB9LFxuICAgICAgICAgIGRlbHRhOiB7IGxlZnQ6ICdGMycsIHJpZ2h0OiAnRjQnIH0sXG4gICAgICAgICAgYmV0YTogeyBsZWZ0OiAnQjMnLCByaWdodDogJ0I0JyB9LFxuICAgICAgICAgIGdhbW1hOiB7IGxlZnQ6ICc4Mi40MScsIHJpZ2h0OiAnOTUnIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHN0ZW1Tb3VyY2VzOiBbXG4gICAgICAgICAgeyBuYW1lOiAnQmFzcycsIHNyYzogJy9zdGVtcy9yZWZsZWN0aXZlL3JlZmxlY3QtYmFzcy5tcDMnLCBhY3RpdmU6IHRydWUsIHNvdW5kOiBudWxsIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0F0bW9zcGhlcmUnLFxuICAgICAgICAgICAgc3JjOiAnL3N0ZW1zL3JlZmxlY3RpdmUvcmVmbGVjdC1hdG1vc3BoZXJlLm1wMycsXG4gICAgICAgICAgICBhY3RpdmU6IHRydWUsXG4gICAgICAgICAgICBzb3VuZDogbnVsbCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHsgbmFtZTogJ1N5bnRoJywgc3JjOiAnL3N0ZW1zL3JlZmxlY3RpdmUvcmVmbGVjdC1zeW50aC5tcDMnLCBhY3RpdmU6IHRydWUsIHNvdW5kOiBudWxsIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0FycHJlZ2dpYXRvcicsXG4gICAgICAgICAgICBzcmM6ICcvc3RlbXMvcmVmbGVjdGl2ZS9yZWZsZWMtYXJwLm1wMycsXG4gICAgICAgICAgICBhY3RpdmU6IHRydWUsXG4gICAgICAgICAgICBzb3VuZDogbnVsbCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHsgbmFtZTogJ05vaXNlJywgc3JjOiAnL3N0ZW1zL3JlZmxlY3RpdmUvcmVmbGVjdC1ub2lzZS5tcDMnLCBhY3RpdmU6IHRydWUsIHNvdW5kOiBudWxsIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAgTWVsYW5jaG9saWM6IHtcbiAgICAgICAgdWlUaGVtZTogJ21lbGFuY2hvbGljJyxcbiAgICAgICAgdG9uZUZyZXF1ZW5jaWVzOiB7XG4gICAgICAgICAgdGhldGE6IHsgbGVmdDogJ0c1JywgcmlnaHQ6ICdHNCcgfSxcbiAgICAgICAgICBhbHBoYTogeyBsZWZ0OiAnQTMnLCByaWdodDogJ0E0JyB9LFxuICAgICAgICAgIGRlbHRhOiB7IGxlZnQ6ICdGMycsIHJpZ2h0OiAnRjQnIH0sXG4gICAgICAgICAgYmV0YTogeyBsZWZ0OiAnQjMnLCByaWdodDogJ0I0JyB9LFxuICAgICAgICAgIGdhbW1hOiB7IGxlZnQ6ICc4Mi40MScsIHJpZ2h0OiAnOTUnIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHN0ZW1Tb3VyY2VzOiBbXG4gICAgICAgICAgeyBuYW1lOiAnRHJvbmUnLCBzcmM6ICcvc3RlbXMvZHJvbmVtaWQubXAzJywgYWN0aXZlOiB0cnVlLCBzb3VuZDogbnVsbCB9LFxuICAgICAgICAgIHsgbmFtZTogJ1NoaW1tZXInLCBzcmM6ICcvc3RlbXMvZHJvbmVoaTQubXAzJywgYWN0aXZlOiB0cnVlLCBzb3VuZDogbnVsbCB9LFxuICAgICAgICAgIHsgbmFtZTogJ0Jhc3MnLCBzcmM6ICcvc3RlbXMvYmFzczMubXAzJywgYWN0aXZlOiB0cnVlLCBzb3VuZDogbnVsbCB9LFxuICAgICAgICAgIHsgbmFtZTogJ01lbG9kaWMnLCBzcmM6ICcvc3RlbXMvcGFkbWVsb2hpLm1wMycsIGFjdGl2ZTogdHJ1ZSwgc291bmQ6IG51bGwgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICAvLyBBZGQgYWRkaXRpb25hbCBtb29kcyAoU3R1ZHksIFJlbGF4LCBldGMuKSBhcyBuZWVkZWRcbiAgICB9LFxuICB9KSxcblxuICBhY3Rpb25zOiB7XG4gICAgaW5pdGlhbGl6ZU1vb2QoKSB7XG4gICAgICB0aGlzLnNldE1vb2QoJ05ldXRyYWwnKVxuICAgIH0sXG5cbiAgICBzZXRNb29kKG1vb2ROYW1lKSB7XG4gICAgICBpZiAodGhpcy5tb29kc1ttb29kTmFtZV0pIHtcbiAgICAgICAgdGhpcy5jdXJyZW50TW9vZCA9IHtcbiAgICAgICAgICBuYW1lOiBtb29kTmFtZSxcbiAgICAgICAgICAuLi50aGlzLm1vb2RzW21vb2ROYW1lXSxcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxvYWRTcGF0aWFsUHJlc2V0KClcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgbG9hZFNwYXRpYWxQcmVzZXQoKSB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50TW9vZD8uc3BhdGlhbFByZXNldCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRNb29kLnN0ZW1Tb3VyY2VzID0gdGhpcy5jdXJyZW50TW9vZC5zdGVtU291cmNlcy5tYXAoKHN0ZW0pID0+ICh7XG4gICAgICAgICAgLi4uc3RlbSxcbiAgICAgICAgICBwb3NpdGlvbjogdGhpcy5jdXJyZW50TW9vZC5zcGF0aWFsUHJlc2V0LnBvc2l0aW9uc1tzdGVtLmlkXSB8fCBzdGVtLnBvc2l0aW9uLFxuICAgICAgICB9KSlcbiAgICAgIH1cbiAgICB9LFxuICB9LFxuXG4gIGdldHRlcnM6IHtcbiAgICBtb29kT3B0aW9uczogKHN0YXRlKSA9PlxuICAgICAgT2JqZWN0LmtleXMoc3RhdGUubW9vZHMpLm1hcCgobW9vZCkgPT4gKHtcbiAgICAgICAgbGFiZWw6IG1vb2QsXG4gICAgICAgIHZhbHVlOiBtb29kLFxuICAgICAgfSkpLFxuXG4gICAgY3VycmVudFRvbmVGcmVxdWVuY2llczogKHN0YXRlKSA9PlxuICAgICAgc3RhdGUuY3VycmVudE1vb2Q/LnRvbmVGcmVxdWVuY2llcyB8fCBzdGF0ZS5tb29kcy5OZXV0cmFsLnRvbmVGcmVxdWVuY2llcyxcblxuICAgIGN1cnJlbnRTdGVtU291cmNlczogKHN0YXRlKSA9PlxuICAgICAgc3RhdGUuY3VycmVudE1vb2Q/LnN0ZW1Tb3VyY2VzIHx8IHN0YXRlLm1vb2RzLk5ldXRyYWwuc3RlbVNvdXJjZXMsXG5cbiAgICBjdXJyZW50U3BhdGlhbENvbmZpZzogKHN0YXRlKSA9PlxuICAgICAgc3RhdGUuY3VycmVudE1vb2Q/LnNwYXRpYWxQcmVzZXQgfHwgc3RhdGUubW9vZHMuTmV1dHJhbC5zcGF0aWFsUHJlc2V0LFxuICB9LFxufSlcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRU8sTUFBTSxnQkFBZ0I7QUFBQSxFQUMzQixPQUFPLENBQUUsUUFBUSxNQUFNO0FBQ3pCO0FBRWUsU0FBQSxTQUFVLE9BQU8sY0FBYztBQUU1QyxTQUFPLFNBQVMsTUFBTTtBQUNwQixVQUFNLFFBQVE7QUFBQSxNQUNaLE1BQU0sVUFBVSxpQkFBaUIsU0FBUyxhQUFhLFFBQVE7QUFBQSxJQUNyRTtBQUVJLFdBQU8sTUFBTSxLQUFLLE1BQU0sUUFBUSxRQUFRLElBQ3BDLEVBQUUsZUFBZSxHQUFJLE1BQU0sS0FBTyxJQUFFLElBQ3BDO0FBQUEsRUFDTCxDQUFBO0FBQ0g7QUNQZSxTQUFBLGFBQVk7QUFDekIsTUFBSSxRQUFRO0FBQ1osUUFBTSxLQUFLLG1CQUFrQjtBQUU3QixXQUFTLGdCQUFpQjtBQUN4QixRQUFJLFVBQVUsTUFBTTtBQUNsQixtQkFBYSxLQUFLO0FBQ2xCLGNBQVE7QUFBQSxJQUNkO0FBQUEsRUFDQTtBQUVFLGdCQUFjLGFBQWE7QUFDM0Isa0JBQWdCLGFBQWE7QUFFN0IsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUVBLGdCQUFpQixJQUFJLE9BQU87QUFDMUIsb0JBQWE7QUFFYixV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LGFBQWE7QUFBQSxVQUNYLEVBQUUsTUFBTSxTQUFTLEtBQUssdUJBQXVCLFFBQVEsTUFBTSxPQUFPLEtBQU07QUFBQSxVQUN4RSxFQUFFLE1BQU0sV0FBVyxLQUFLLHVCQUF1QixRQUFRLE1BQU0sT0FBTyxLQUFNO0FBQUEsVUFDMUUsRUFBRSxNQUFNLFFBQVEsS0FBSyxvQkFBb0IsUUFBUSxNQUFNLE9BQU8sS0FBTTtBQUFBLFVBQ3BFLEVBQUUsTUFBTSxXQUFXLEtBQUssd0JBQXdCLFFBQVEsTUFBTSxPQUFPLEtBQU07QUFBQSxRQUM1RTtBQUFBLE1BQ0Y7QUFBQTtBQUFBLElBRUY7QUFBQSxFQUNMO0FBQUEsRUFFRSxTQUFTO0FBQUEsSUFDUCxpQkFBaUI7QUFDZixXQUFLLFFBQVEsU0FBUztBQUFBLElBQ3ZCO0FBQUEsSUFFRCxRQUFRLFVBQVU7QUFDaEIsVUFBSSxLQUFLLE1BQU0sUUFBUSxHQUFHO0FBQ3hCLGFBQUssY0FBYztBQUFBLFVBQ2pCLE1BQU07QUFBQSxVQUNOLEdBQUcsS0FBSyxNQUFNLFFBQVE7QUFBQSxRQUNoQztBQUNRLGFBQUssa0JBQWlCO0FBQUEsTUFDOUI7QUFBQSxJQUNLO0FBQUEsSUFFRCxvQkFBb0I7QUFDbEIsVUFBSSxLQUFLLGFBQWEsZUFBZTtBQUNuQyxhQUFLLFlBQVksY0FBYyxLQUFLLFlBQVksWUFBWSxJQUFJLENBQUMsVUFBVTtBQUFBLFVBQ3pFLEdBQUc7QUFBQSxVQUNILFVBQVUsS0FBSyxZQUFZLGNBQWMsVUFBVSxLQUFLLEVBQUUsS0FBSyxLQUFLO0FBQUEsUUFDOUUsRUFBVTtBQUFBLE1BQ1Y7QUFBQSxJQUNLO0FBQUEsRUFDRjtBQUFBLEVBRUQsU0FBUztBQUFBLElBQ1AsYUFBYSxDQUFDLFVBQ1osT0FBTyxLQUFLLE1BQU0sS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVO0FBQUEsTUFDdEMsT0FBTztBQUFBLE1BQ1AsT0FBTztBQUFBLElBQ2YsRUFBUTtBQUFBLElBRUosd0JBQXdCLENBQUMsVUFDdkIsTUFBTSxhQUFhLG1CQUFtQixNQUFNLE1BQU0sUUFBUTtBQUFBLElBRTVELG9CQUFvQixDQUFDLFVBQ25CLE1BQU0sYUFBYSxlQUFlLE1BQU0sTUFBTSxRQUFRO0FBQUEsSUFFeEQsc0JBQXNCLENBQUMsVUFDckIsTUFBTSxhQUFhLGlCQUFpQixNQUFNLE1BQU0sUUFBUTtBQUFBLEVBQzNEO0FBQ0gsQ0FBQzsiLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMCwxLDIsMyw0XX0=
