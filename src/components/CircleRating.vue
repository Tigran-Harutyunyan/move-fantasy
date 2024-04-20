<script setup lang="ts">
import { computed, toRefs } from "vue";

interface Props {
  className?: string;
  rating: number | string;
  stroke?: string;
  background?: string;
  large?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  background: "#fff",
});

const size = 100;
const sizeInPixels = size + "px";

const { className, rating, large } = toRefs(props);
const safeRating = computed(() => Number(rating.value));
const multipliedRating = computed(() => safeRating.value * 10);

const computedStroke = computed(() => {
  if (safeRating.value >= 7) return "green";
  if (safeRating.value >= 5 && safeRating.value < 7) return "orange";
  if (safeRating.value < 5) return "red";
  return;
});
</script>

<template>
  <div class="circleRating" :class="[className, { large: large }]">
    <svg viewBox="0 0 100 100" class="circular-progress">
      <circle class="bg"></circle>
      <circle class="fg"></circle>
      <text class="CircularProgressbar-text" x="50" y="50">
        {{ rating }}
      </text>
    </svg>
  </div>
</template>
<style scoped lang="scss">
@import "@/assets/style/mixins.scss";

.circular-progress {
  --size: v-bind("sizeInPixels");
  --rating: v-bind("multipliedRating");
  --half-size: calc(var(--size) / 2);
  --stroke-width: 9px;
  --radius: calc((var(--size) - var(--stroke-width)) / 2);
  --circumference: calc(var(--radius) * pi * 2);
  --dash: calc((var(--rating) * var(--circumference)) / 100);
  animation: progress-animation 1s linear 0s 1 forwards;
}

.circular-progress circle {
  cx: var(--half-size);
  cy: var(--half-size);
  r: var(--radius);
  stroke-width: var(--stroke-width);
  fill: none;
  stroke-linecap: round;
}

/* .circular-progress circle.bg {
  stroke: v-bind("background");
} */

.circular-progress circle.fg {
  transform: rotate(-90deg);
  transform-origin: var(--half-size) var(--half-size);
  stroke-dasharray: var(--dash) calc(var(--circumference) - var(--dash));
  transition: stroke-dasharray 0.3s linear 0s;
  stroke: v-bind("computedStroke");
}

.circleRating {
  background-color: var(--black);
  border-radius: 50%;
  padding: 2px;
}
.carousel .carouselItems .carouselItem .posterBlock .circleRating,
.circleRating {
  width: 40px;
  height: 40px;
  position: relative;
  top: 30px;
  background-color: white;
  flex-shrink: 0;
  padding: 2px;
}

.carousel .circleRating {
  @include md {
    width: 50px;
    height: 50px;
  }
}

.circleRating .CircularProgressbar-text {
  font-size: 34px;
  font-weight: 700;
  fill: var(--black);
  dominant-baseline: middle;
  text-anchor: middle;
}

.circleRating.large {
  top: 0;
  width: 87px;
  height: 87px;
  @include xs {
    width: 71px;
    height: 71px;
  }
}
</style>
