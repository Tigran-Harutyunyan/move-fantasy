<script setup lang="ts">
import { toRefs } from "vue";

type Props = {
  src: string;
  className?: string;
};
const props = defineProps<Props>();

const { src, className } = toRefs(props);
</script>

<template>
  <img v-lazy="{ src: src }" />
</template>
