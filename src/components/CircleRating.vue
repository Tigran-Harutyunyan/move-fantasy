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

const { className, rating, large } = toRefs(props);
const safeRating = Number(rating.value);
const multipliedRating = safeRating * 10;

const computedStroke = computed(() => {
  if (safeRating >= 7) return "green";
  if (safeRating >= 5 && safeRating < 7) return "orange";
  if (safeRating < 5) return "red";
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
<style scoped>
.circular-progress {
  --size: 100px;
  --half-size: calc(var(--size) / 2);
  --stroke-width: 9px;
  --radius: calc((var(--size) - var(--stroke-width)) / 2);
  --circumference: calc(var(--radius) * pi * 2);
  --dash: calc((var(--progress) * var(--circumference)) / 100);
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

@property --progress {
  syntax: "<number>";
  inherits: false;
  initial-value: 0;
}

@keyframes progress-animation {
  from {
    --progress: 0;
  }
  to {
    --progress: v-bind("multipliedRating");
  }
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

@media only screen and (min-width: 768px) {
  .carousel .circleRating {
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
  width: 86px;
  height: 86px;
}
</style>
