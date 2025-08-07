import { av as useSizeProps, c as createComponent, g as getCurrentInstance, aw as useSize, a as computed, G as between, h, ax as hMergeSlotSafely } from "./index-DtVXev-T.js";
const useCircularCommonProps = {
  ...useSizeProps,
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  },
  color: String,
  centerColor: String,
  trackColor: String,
  fontSize: String,
  rounded: Boolean,
  // ratio
  thickness: {
    type: Number,
    default: 0.2,
    validator: (v) => v >= 0 && v <= 1
  },
  angle: {
    type: Number,
    default: 0
  },
  showValue: Boolean,
  reverse: Boolean,
  instantFeedback: Boolean
};
const radius = 50, diameter = 2 * radius, circumference = diameter * Math.PI, strokeDashArray = Math.round(circumference * 1e3) / 1e3;
const QCircularProgress = createComponent({
  name: "QCircularProgress",
  props: {
    ...useCircularCommonProps,
    value: {
      type: Number,
      default: 0
    },
    animationSpeed: {
      type: [String, Number],
      default: 600
    },
    indeterminate: Boolean
  },
  setup(props, { slots }) {
    const { proxy: { $q } } = getCurrentInstance();
    const sizeStyle = useSize(props);
    const svgStyle = computed(() => {
      const angle = ($q.lang.rtl === true ? -1 : 1) * props.angle;
      return {
        transform: props.reverse !== ($q.lang.rtl === true) ? `scale3d(-1, 1, 1) rotate3d(0, 0, 1, ${-90 - angle}deg)` : `rotate3d(0, 0, 1, ${angle - 90}deg)`
      };
    });
    const circleStyle = computed(() => props.instantFeedback !== true && props.indeterminate !== true ? { transition: `stroke-dashoffset ${props.animationSpeed}ms ease 0s, stroke ${props.animationSpeed}ms ease` } : "");
    const viewBox = computed(() => diameter / (1 - props.thickness / 2));
    const viewBoxAttr = computed(
      () => `${viewBox.value / 2} ${viewBox.value / 2} ${viewBox.value} ${viewBox.value}`
    );
    const normalized = computed(() => between(props.value, props.min, props.max));
    const range = computed(() => props.max - props.min);
    const strokeWidth = computed(() => props.thickness / 2 * viewBox.value);
    const strokeDashOffset = computed(() => {
      const dashRatio = (props.max - normalized.value) / range.value;
      const dashGap = props.rounded === true && normalized.value < props.max && dashRatio < 0.25 ? strokeWidth.value / 2 * (1 - dashRatio / 0.25) : 0;
      return circumference * dashRatio + dashGap;
    });
    function getCircle({ thickness, offset, color, cls, rounded }) {
      return h("circle", {
        class: "q-circular-progress__" + cls + (color !== void 0 ? ` text-${color}` : ""),
        style: circleStyle.value,
        fill: "transparent",
        stroke: "currentColor",
        "stroke-width": thickness,
        "stroke-dasharray": strokeDashArray,
        "stroke-dashoffset": offset,
        "stroke-linecap": rounded,
        cx: viewBox.value,
        cy: viewBox.value,
        r: radius
      });
    }
    return () => {
      const svgChild = [];
      props.centerColor !== void 0 && props.centerColor !== "transparent" && svgChild.push(
        h("circle", {
          class: `q-circular-progress__center text-${props.centerColor}`,
          fill: "currentColor",
          r: radius - strokeWidth.value / 2,
          cx: viewBox.value,
          cy: viewBox.value
        })
      );
      props.trackColor !== void 0 && props.trackColor !== "transparent" && svgChild.push(
        getCircle({
          cls: "track",
          thickness: strokeWidth.value,
          offset: 0,
          color: props.trackColor
        })
      );
      svgChild.push(
        getCircle({
          cls: "circle",
          thickness: strokeWidth.value,
          offset: strokeDashOffset.value,
          color: props.color,
          rounded: props.rounded === true ? "round" : void 0
        })
      );
      const child = [
        h("svg", {
          class: "q-circular-progress__svg",
          style: svgStyle.value,
          viewBox: viewBoxAttr.value,
          "aria-hidden": "true"
        }, svgChild)
      ];
      props.showValue === true && child.push(
        h("div", {
          class: "q-circular-progress__text absolute-full row flex-center content-center",
          style: { fontSize: props.fontSize }
        }, slots.default !== void 0 ? slots.default() : [h("div", normalized.value)])
      );
      return h("div", {
        class: `q-circular-progress q-circular-progress--${props.indeterminate === true ? "in" : ""}determinate`,
        style: sizeStyle.value,
        role: "progressbar",
        "aria-valuemin": props.min,
        "aria-valuemax": props.max,
        "aria-valuenow": props.indeterminate === true ? void 0 : normalized.value
      }, hMergeSlotSafely(slots.internal, child));
    };
  }
});
export {
  QCircularProgress as Q
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUUNpcmN1bGFyUHJvZ3Jlc3MtQm54SVpBQUkuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvY2lyY3VsYXItcHJvZ3Jlc3MvY2lyY3VsYXItcHJvZ3Jlc3MuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2NpcmN1bGFyLXByb2dyZXNzL1FDaXJjdWxhclByb2dyZXNzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVNpemVQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLXNpemUvdXNlLXNpemUuanMnXG5cbi8vIGFsc28gdXNlZCBieSBRS25vYlxuZXhwb3J0IGNvbnN0IHVzZUNpcmN1bGFyQ29tbW9uUHJvcHMgPSB7XG4gIC4uLnVzZVNpemVQcm9wcyxcblxuICBtaW46IHtcbiAgICB0eXBlOiBOdW1iZXIsXG4gICAgZGVmYXVsdDogMFxuICB9LFxuICBtYXg6IHtcbiAgICB0eXBlOiBOdW1iZXIsXG4gICAgZGVmYXVsdDogMTAwXG4gIH0sXG5cbiAgY29sb3I6IFN0cmluZyxcbiAgY2VudGVyQ29sb3I6IFN0cmluZyxcbiAgdHJhY2tDb2xvcjogU3RyaW5nLFxuXG4gIGZvbnRTaXplOiBTdHJpbmcsXG4gIHJvdW5kZWQ6IEJvb2xlYW4sXG5cbiAgLy8gcmF0aW9cbiAgdGhpY2tuZXNzOiB7XG4gICAgdHlwZTogTnVtYmVyLFxuICAgIGRlZmF1bHQ6IDAuMixcbiAgICB2YWxpZGF0b3I6IHYgPT4gdiA+PSAwICYmIHYgPD0gMVxuICB9LFxuXG4gIGFuZ2xlOiB7XG4gICAgdHlwZTogTnVtYmVyLFxuICAgIGRlZmF1bHQ6IDBcbiAgfSxcblxuICBzaG93VmFsdWU6IEJvb2xlYW4sXG4gIHJldmVyc2U6IEJvb2xlYW4sXG5cbiAgaW5zdGFudEZlZWRiYWNrOiBCb29sZWFuXG59XG4iLCJpbXBvcnQgeyBoLCBjb21wdXRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlU2l6ZSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1zaXplL3VzZS1zaXplLmpzJ1xuaW1wb3J0IHsgdXNlQ2lyY3VsYXJDb21tb25Qcm9wcyB9IGZyb20gJy4vY2lyY3VsYXItcHJvZ3Jlc3MuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhNZXJnZVNsb3RTYWZlbHkgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5pbXBvcnQgeyBiZXR3ZWVuIH0gZnJvbSAnLi4vLi4vdXRpbHMvZm9ybWF0L2Zvcm1hdC5qcydcblxuY29uc3RcbiAgcmFkaXVzID0gNTAsXG4gIGRpYW1ldGVyID0gMiAqIHJhZGl1cyxcbiAgY2lyY3VtZmVyZW5jZSA9IGRpYW1ldGVyICogTWF0aC5QSSxcbiAgc3Ryb2tlRGFzaEFycmF5ID0gTWF0aC5yb3VuZChjaXJjdW1mZXJlbmNlICogMTAwMCkgLyAxMDAwXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRQ2lyY3VsYXJQcm9ncmVzcycsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VDaXJjdWxhckNvbW1vblByb3BzLFxuXG4gICAgdmFsdWU6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIGRlZmF1bHQ6IDBcbiAgICB9LFxuXG4gICAgYW5pbWF0aW9uU3BlZWQ6IHtcbiAgICAgIHR5cGU6IFsgU3RyaW5nLCBOdW1iZXIgXSxcbiAgICAgIGRlZmF1bHQ6IDYwMFxuICAgIH0sXG5cbiAgICBpbmRldGVybWluYXRlOiBCb29sZWFuXG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCB7IHByb3h5OiB7ICRxIH0gfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3Qgc2l6ZVN0eWxlID0gdXNlU2l6ZShwcm9wcylcblxuICAgIGNvbnN0IHN2Z1N0eWxlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgYW5nbGUgPSAoJHEubGFuZy5ydGwgPT09IHRydWUgPyAtMSA6IDEpICogcHJvcHMuYW5nbGVcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHJhbnNmb3JtOiBwcm9wcy5yZXZlcnNlICE9PSAoJHEubGFuZy5ydGwgPT09IHRydWUpXG4gICAgICAgICAgPyBgc2NhbGUzZCgtMSwgMSwgMSkgcm90YXRlM2QoMCwgMCwgMSwgJHsgLTkwIC0gYW5nbGUgfWRlZylgXG4gICAgICAgICAgOiBgcm90YXRlM2QoMCwgMCwgMSwgJHsgYW5nbGUgLSA5MCB9ZGVnKWBcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3QgY2lyY2xlU3R5bGUgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5pbnN0YW50RmVlZGJhY2sgIT09IHRydWUgJiYgcHJvcHMuaW5kZXRlcm1pbmF0ZSAhPT0gdHJ1ZVxuICAgICAgICA/IHsgdHJhbnNpdGlvbjogYHN0cm9rZS1kYXNob2Zmc2V0ICR7IHByb3BzLmFuaW1hdGlvblNwZWVkIH1tcyBlYXNlIDBzLCBzdHJva2UgJHsgcHJvcHMuYW5pbWF0aW9uU3BlZWQgfW1zIGVhc2VgIH1cbiAgICAgICAgOiAnJ1xuICAgICkpXG5cbiAgICBjb25zdCB2aWV3Qm94ID0gY29tcHV0ZWQoKCkgPT4gZGlhbWV0ZXIgLyAoMSAtIHByb3BzLnRoaWNrbmVzcyAvIDIpKVxuXG4gICAgY29uc3Qgdmlld0JveEF0dHIgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgYCR7IHZpZXdCb3gudmFsdWUgLyAyIH0gJHsgdmlld0JveC52YWx1ZSAvIDIgfSAkeyB2aWV3Qm94LnZhbHVlIH0gJHsgdmlld0JveC52YWx1ZSB9YFxuICAgIClcblxuICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBjb21wdXRlZCgoKSA9PiBiZXR3ZWVuKHByb3BzLnZhbHVlLCBwcm9wcy5taW4sIHByb3BzLm1heCkpXG5cbiAgICBjb25zdCByYW5nZSA9IGNvbXB1dGVkKCgpID0+IHByb3BzLm1heCAtIHByb3BzLm1pbilcbiAgICBjb25zdCBzdHJva2VXaWR0aCA9IGNvbXB1dGVkKCgpID0+IHByb3BzLnRoaWNrbmVzcyAvIDIgKiB2aWV3Qm94LnZhbHVlKVxuICAgIGNvbnN0IHN0cm9rZURhc2hPZmZzZXQgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBkYXNoUmF0aW8gPSAocHJvcHMubWF4IC0gbm9ybWFsaXplZC52YWx1ZSkgLyByYW5nZS52YWx1ZVxuICAgICAgY29uc3QgZGFzaEdhcCA9IHByb3BzLnJvdW5kZWQgPT09IHRydWUgJiYgbm9ybWFsaXplZC52YWx1ZSA8IHByb3BzLm1heCAmJiBkYXNoUmF0aW8gPCAwLjI1XG4gICAgICAgID8gc3Ryb2tlV2lkdGgudmFsdWUgLyAyICogKDEgLSBkYXNoUmF0aW8gLyAwLjI1KVxuICAgICAgICA6IDBcblxuICAgICAgcmV0dXJuIGNpcmN1bWZlcmVuY2UgKiBkYXNoUmF0aW8gKyBkYXNoR2FwXG4gICAgfSlcblxuICAgIGZ1bmN0aW9uIGdldENpcmNsZSAoeyB0aGlja25lc3MsIG9mZnNldCwgY29sb3IsIGNscywgcm91bmRlZCB9KSB7XG4gICAgICByZXR1cm4gaCgnY2lyY2xlJywge1xuICAgICAgICBjbGFzczogJ3EtY2lyY3VsYXItcHJvZ3Jlc3NfXycgKyBjbHMgKyAoY29sb3IgIT09IHZvaWQgMCA/IGAgdGV4dC0keyBjb2xvciB9YCA6ICcnKSxcbiAgICAgICAgc3R5bGU6IGNpcmNsZVN0eWxlLnZhbHVlLFxuICAgICAgICBmaWxsOiAndHJhbnNwYXJlbnQnLFxuICAgICAgICBzdHJva2U6ICdjdXJyZW50Q29sb3InLFxuICAgICAgICAnc3Ryb2tlLXdpZHRoJzogdGhpY2tuZXNzLFxuICAgICAgICAnc3Ryb2tlLWRhc2hhcnJheSc6IHN0cm9rZURhc2hBcnJheSxcbiAgICAgICAgJ3N0cm9rZS1kYXNob2Zmc2V0Jzogb2Zmc2V0LFxuICAgICAgICAnc3Ryb2tlLWxpbmVjYXAnOiByb3VuZGVkLFxuICAgICAgICBjeDogdmlld0JveC52YWx1ZSxcbiAgICAgICAgY3k6IHZpZXdCb3gudmFsdWUsXG4gICAgICAgIHI6IHJhZGl1c1xuICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY29uc3Qgc3ZnQ2hpbGQgPSBbXVxuXG4gICAgICBwcm9wcy5jZW50ZXJDb2xvciAhPT0gdm9pZCAwICYmIHByb3BzLmNlbnRlckNvbG9yICE9PSAndHJhbnNwYXJlbnQnICYmIHN2Z0NoaWxkLnB1c2goXG4gICAgICAgIGgoJ2NpcmNsZScsIHtcbiAgICAgICAgICBjbGFzczogYHEtY2lyY3VsYXItcHJvZ3Jlc3NfX2NlbnRlciB0ZXh0LSR7IHByb3BzLmNlbnRlckNvbG9yIH1gLFxuICAgICAgICAgIGZpbGw6ICdjdXJyZW50Q29sb3InLFxuICAgICAgICAgIHI6IHJhZGl1cyAtIHN0cm9rZVdpZHRoLnZhbHVlIC8gMixcbiAgICAgICAgICBjeDogdmlld0JveC52YWx1ZSxcbiAgICAgICAgICBjeTogdmlld0JveC52YWx1ZVxuICAgICAgICB9KVxuICAgICAgKVxuXG4gICAgICBwcm9wcy50cmFja0NvbG9yICE9PSB2b2lkIDAgJiYgcHJvcHMudHJhY2tDb2xvciAhPT0gJ3RyYW5zcGFyZW50JyAmJiBzdmdDaGlsZC5wdXNoKFxuICAgICAgICBnZXRDaXJjbGUoe1xuICAgICAgICAgIGNsczogJ3RyYWNrJyxcbiAgICAgICAgICB0aGlja25lc3M6IHN0cm9rZVdpZHRoLnZhbHVlLFxuICAgICAgICAgIG9mZnNldDogMCxcbiAgICAgICAgICBjb2xvcjogcHJvcHMudHJhY2tDb2xvclxuICAgICAgICB9KVxuICAgICAgKVxuXG4gICAgICBzdmdDaGlsZC5wdXNoKFxuICAgICAgICBnZXRDaXJjbGUoe1xuICAgICAgICAgIGNsczogJ2NpcmNsZScsXG4gICAgICAgICAgdGhpY2tuZXNzOiBzdHJva2VXaWR0aC52YWx1ZSxcbiAgICAgICAgICBvZmZzZXQ6IHN0cm9rZURhc2hPZmZzZXQudmFsdWUsXG4gICAgICAgICAgY29sb3I6IHByb3BzLmNvbG9yLFxuICAgICAgICAgIHJvdW5kZWQ6IHByb3BzLnJvdW5kZWQgPT09IHRydWUgPyAncm91bmQnIDogdm9pZCAwXG4gICAgICAgIH0pXG4gICAgICApXG5cbiAgICAgIGNvbnN0IGNoaWxkID0gW1xuICAgICAgICBoKCdzdmcnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWNpcmN1bGFyLXByb2dyZXNzX19zdmcnLFxuICAgICAgICAgIHN0eWxlOiBzdmdTdHlsZS52YWx1ZSxcbiAgICAgICAgICB2aWV3Qm94OiB2aWV3Qm94QXR0ci52YWx1ZSxcbiAgICAgICAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZSdcbiAgICAgICAgfSwgc3ZnQ2hpbGQpXG4gICAgICBdXG5cbiAgICAgIHByb3BzLnNob3dWYWx1ZSA9PT0gdHJ1ZSAmJiBjaGlsZC5wdXNoKFxuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWNpcmN1bGFyLXByb2dyZXNzX190ZXh0IGFic29sdXRlLWZ1bGwgcm93IGZsZXgtY2VudGVyIGNvbnRlbnQtY2VudGVyJyxcbiAgICAgICAgICBzdHlsZTogeyBmb250U2l6ZTogcHJvcHMuZm9udFNpemUgfVxuICAgICAgICB9LCBzbG90cy5kZWZhdWx0ICE9PSB2b2lkIDAgPyBzbG90cy5kZWZhdWx0KCkgOiBbIGgoJ2RpdicsIG5vcm1hbGl6ZWQudmFsdWUpIF0pXG4gICAgICApXG5cbiAgICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiBgcS1jaXJjdWxhci1wcm9ncmVzcyBxLWNpcmN1bGFyLXByb2dyZXNzLS0keyBwcm9wcy5pbmRldGVybWluYXRlID09PSB0cnVlID8gJ2luJyA6ICcnIH1kZXRlcm1pbmF0ZWAsXG4gICAgICAgIHN0eWxlOiBzaXplU3R5bGUudmFsdWUsXG4gICAgICAgIHJvbGU6ICdwcm9ncmVzc2JhcicsXG4gICAgICAgICdhcmlhLXZhbHVlbWluJzogcHJvcHMubWluLFxuICAgICAgICAnYXJpYS12YWx1ZW1heCc6IHByb3BzLm1heCxcbiAgICAgICAgJ2FyaWEtdmFsdWVub3cnOiBwcm9wcy5pbmRldGVybWluYXRlID09PSB0cnVlID8gdm9pZCAwIDogbm9ybWFsaXplZC52YWx1ZVxuICAgICAgfSwgaE1lcmdlU2xvdFNhZmVseShzbG90cy5pbnRlcm5hbCwgY2hpbGQpKSAvLyBcImludGVybmFsXCIgaXMgdXNlZCBieSBRS25vYlxuICAgIH1cbiAgfVxufSlcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBR08sTUFBTSx5QkFBeUI7QUFBQSxFQUNwQyxHQUFHO0FBQUEsRUFFSCxLQUFLO0FBQUEsSUFDSCxNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsRUFDYjtBQUFBLEVBQ0UsS0FBSztBQUFBLElBQ0gsTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLEVBQ2I7QUFBQSxFQUVFLE9BQU87QUFBQSxFQUNQLGFBQWE7QUFBQSxFQUNiLFlBQVk7QUFBQSxFQUVaLFVBQVU7QUFBQSxFQUNWLFNBQVM7QUFBQTtBQUFBLEVBR1QsV0FBVztBQUFBLElBQ1QsTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLElBQ1QsV0FBVyxPQUFLLEtBQUssS0FBSyxLQUFLO0FBQUEsRUFDbkM7QUFBQSxFQUVFLE9BQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxFQUNiO0FBQUEsRUFFRSxXQUFXO0FBQUEsRUFDWCxTQUFTO0FBQUEsRUFFVCxpQkFBaUI7QUFDbkI7QUM3QkEsTUFDRSxTQUFTLElBQ1QsV0FBVyxJQUFJLFFBQ2YsZ0JBQWdCLFdBQVcsS0FBSyxJQUNoQyxrQkFBa0IsS0FBSyxNQUFNLGdCQUFnQixHQUFJLElBQUk7QUFFdkQsTUFBQSxvQkFBZSxnQkFBZ0I7QUFBQSxFQUM3QixNQUFNO0FBQUEsRUFFTixPQUFPO0FBQUEsSUFDTCxH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
