<script setup lang="ts">
import { computed, toRefs } from "vue";

import dayjs from "dayjs";

import LazyLoadImage from "../components/LazyLoadImage.vue";

import { useStore } from "@stores/store";
import { storeToRefs } from "pinia";

const { imageUrls } = storeToRefs(useStore());

interface Props {
  data: any;
}
const props = defineProps<Props>();
const { data } = toRefs(props);

const posterUrl = computed(() => {
  if (!imageUrls.value || !data.value) return "";
  return data.value.profile_path
    ? imageUrls.value.profile + data.value.profile_path
    : "/images/avatar.png";
});
</script>

<template>
  <RouterLink
    class="movieCard"
    target="_blank"
    :to="{ path: `/person/${data.id}` }"
  >
    <div class="posterBlock">
      <div class="lazy-load-image-background">
        <LazyLoadImage class="posterImg" :src="posterUrl" />
      </div>
    </div>
    <div class="textBlock">
      <span class="title">{{ data.name }}</span>
      <span class="date">
        {{ dayjs(data.release_date).format("MMM D, YYYY") }}
      </span>
    </div>
  </RouterLink>
</template>

<style lang="scss" scoped>
@import "@assets/style/mixins.scss";
.movieCard {
  width: calc(50% - 5px);
  margin-bottom: 25px;
  cursor: pointer;
  flex-shrink: 0;
  @include md {
    width: calc(25% - 15px);
  }
  @include lg {
    width: calc(20% - 16px);
  }
  .posterBlock {
    position: relative;
    width: 100%;
    aspect-ratio: 1 / 1.5;
    background-size: cover;
    background-position: center;
    margin-bottom: 30px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 10px;
    transition: all ease 0.5s;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      transition: transform 1s;
      &:hover {
        transform: scale(1.1);
      }
    }
    .lazy-load-image-background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 12px;
      overflow: hidden;
    }
    .circleRating {
      width: 40px;
      height: 40px;
      position: relative;
      top: 30px;
      background-color: white;
      flex-shrink: 0;
      @include md {
        width: 50px;
        height: 50px;
      }
    }
    .genres {
      display: none;
      position: relative;
      @include md {
        display: flex;
        flex-flow: wrap;
        justify-content: flex-end;
      }
    }
  }
  .textBlock {
    color: white;
    display: flex;
    flex-direction: column;
    .title {
      font-size: 16px;
      margin-bottom: 10px;
      line-height: 24px;
      @include ellipsis(1);
      @include md {
        font-size: 20px;
      }
    }
    .date {
      font-size: 14px;
      opacity: 0.5;
    }
  }
}
</style>
