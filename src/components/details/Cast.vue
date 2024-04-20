<script setup lang="ts">
import { toRefs } from "vue";
import { storeToRefs } from "pinia";
import { useStore } from "@stores/store";

import LazyLoadImage from "../LazyLoadImage.vue";
import ContentWrapper from "../ContentWrapper.vue";

type Props = {
  data: any;
  loading: boolean;
};

const props = defineProps<Props>();
const { data, loading } = toRefs(props);

const { imageUrls } = storeToRefs(useStore());

const getImageUrl = (item) => {
  return item.profile_path
    ? imageUrls.value?.profile + item.profile_path
    : "/images/avatar.png";
};
</script>

<template>
  <div class="castSection">
    <ContentWrapper>
      <div class="sectionHeading">Top Cast</div>
      <div v-if="loading" class="castSkeleton">
        <div class="skItem" v-for="index in 6" :key="index">
          <div class="circle skeleton"></div>
          <div class="row skeleton"></div>
          <div class="row2 skeleton"></div>
        </div>
      </div>

      <div class="listItems" v-if="!loading && data">
        <div v-for="item in data" :key="item.id" class="listItem">
          <router-link :to="`/person/${item.id}`">
            <div class="profileImg">
              <LazyLoadImage :src="getImageUrl(item)" />
            </div>
            <div class="name">{{ item.name }}</div>
            <div class="character">{{ item.character }}</div>
          </router-link>
        </div>
      </div>
    </ContentWrapper>
  </div>
</template>

<style lang="scss" scoped>
@import "@assets/style/mixins.scss";
.castSection {
  position: relative;
  margin-bottom: 50px;
  .sectionHeading {
    font-size: 24px;
    color: white;
    margin-bottom: 25px;
  }
  .listItems {
    display: flex;
    gap: 20px;
    overflow-y: hidden;
    margin-right: -20px;
    margin-left: -20px;
    padding: 0 20px;
    @include md {
      margin: 0;
      padding: 0;
    }
    .listItem {
      text-align: center;
      color: white;
      .profileImg {
        width: 125px;
        height: 125px;
        border-radius: 50%;
        overflow: hidden;
        margin-bottom: 15px;
        @include md {
          width: 175px;
          height: 175px;
          margin-bottom: 25px;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }
      }
      .name {
        font-size: 14px;
        line-height: 20px;
        font-weight: 600;
        @include md {
          font-size: 18px;
          line-height: 24px;
        }
      }
      .character {
        font-size: 14px;
        line-height: 20px;
        opacity: 0.5;
        @include md {
          font-size: 16px;
          line-height: 24px;
        }
      }
    }
  }

  .castSkeleton {
    display: flex;
    gap: 20px;
    overflow-y: hidden;
    margin-right: -20px;
    margin-left: -20px;
    padding: 0 20px;
    @include md {
      margin: 0;
      padding: 0;
    }
    .skItem {
      .circle {
        width: 125px;
        height: 125px;
        border-radius: 50%;
        margin-bottom: 15px;
        @include md {
          width: 175px;
          height: 175px;
          margin-bottom: 25px;
        }
      }
      .row {
        width: 100%;
        height: 20px;
        border-radius: 10px;
        margin-bottom: 10px;
      }
      .row2 {
        width: 75%;
        height: 20px;
        border-radius: 10px;
        margin: 0 auto;
      }
    }
  }
}
</style>
