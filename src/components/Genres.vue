<script setup lang="ts">
import { storeToRefs } from "pinia";
import { toRefs } from "vue";
import { useStore } from "@stores/store";

const { genres } = storeToRefs(useStore());

interface Props {
  data: number[];
}

const props = defineProps<Props>();
const { data } = toRefs(props);
</script>

<template>
  <div class="genres" v-if="data">
    <template v-for="g in data" :key="g">
      <div class="genre" v-if="genres?.[g]?.name">
        {{ genres?.[g]?.name }}
      </div>
    </template>
  </div>
</template>
<style lang="scss" scoped>
.genres {
  display: flex;
  gap: 5px;
  .genre {
    background-color: var(--pink);
    padding: 3px 5px;
    font-size: 12px;
    border-radius: 4px;
    color: white;
    white-space: nowrap;
  }
}
</style>
