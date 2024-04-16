<script setup lang="ts">
import { ref, toRefs } from "vue";

const emit = defineEmits(["change"]);
const props = defineProps<{
  data: string[];
}>();

const { data } = toRefs(props);

const selectedTab = ref(0);
const left = ref(0);

const setSelectedTab = (tab, index) => {
  left.value = index * 100;
  setTimeout(() => {
    selectedTab.value = index;
  }, 300);
  emit("change", tab);
};
</script>

<template>
  <div class="switchingTabs">
    <div class="tabItems">
      <span
        v-for="(tab, index) in data"
        :key="index"
        :class="`tabItem ${selectedTab === index ? 'active' : ''}`"
        @click="setSelectedTab(tab, index)"
      >
        {{ tab }}
      </span>

      <span class="movingBg" :style="{ left: left + 'px' }" />
    </div>
  </div>
</template>

<style lang="scss">
.switchingTabs {
  height: 34px;
  background-color: white;
  border-radius: 20px;
  padding: 2px;
  .tabItems {
    display: flex;
    align-items: center;
    height: 30px;
    position: relative;
    .tabItem {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100px;
      color: var(--black);
      font-size: 14px;
      position: relative;
      z-index: 1;
      cursor: pointer;
      transition: color ease 0.3s;
      &.active {
        color: white;
      }
    }
    .movingBg {
      height: 30px;
      width: 100px;
      border-radius: 15px;
      background-image: var(--gradient);
      position: absolute;
      left: 0;
      transition: left cubic-bezier(0.88, -0.35, 0.565, 1.35) 0.4s;
    }
  }
}
</style>
