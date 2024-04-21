<script setup lang="ts">
import { toRefs, ref } from "vue";
import LazyLoadImage from "../LazyLoadImage.vue";
import ContentWrapper from "../ContentWrapper.vue";
import VideoPopup from "../VideoPopup.vue";

import PlayIcon from "./PlayIcon.vue";

type Props = {
  data: any;
  loading: boolean;
};

const props = defineProps<Props>();
const { data, loading } = toRefs(props);

const show = ref(false);
const videoId = ref();

const setData = (videoKey: string) => {
  videoId.value = videoKey;
  show.value = true;
};
</script>

<template>
  <div class="videosSection">
    <ContentWrapper>
      <div class="sectionHeading">Official Videos</div>

      <div v-if="!loading" class="videos">
        <div
          v-for="video in data?.results"
          :key="video.id"
          class="videoItem"
          @click="setData(video.key)"
        >
          <div class="videoThumbnail">
            <LazyLoadImage
              :src="`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`"
            />
            <PlayIcon />
          </div>
          <div class="videoTitle">{{ video.name }}</div>
        </div>
      </div>

      <div v-else class="videoSkeleton">
        <div className="skItem" v-for="index in 4" :key="index">
          <div className="thumb skeleton"></div>
          <div className="row skeleton"></div>
          <div className="row2 skeleton"></div>
        </div>
      </div>
    </ContentWrapper>

    <VideoPopup
      :show="show"
      :videoId="videoId"
      @close="show = false"
      @reset="videoId = null"
    />
  </div>
</template>

<style lang="scss">
@import "../../assets/style/mixins.scss";
.videosSection {
  position: relative;
  margin-bottom: 50px;
  .sectionHeading {
    font-size: 24px;
    color: white;
    margin-bottom: 25px;
  }
  .videos {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    margin-right: -20px;
    margin-left: -20px;
    padding: 0 20px;
    overflow-y: hidden;
    @include md {
      gap: 20px;
      margin: 0;
      padding: 0;
    }
    .videoItem {
      width: 150px;
      flex-shrink: 0;
      @include md {
        width: 25%;
      }
      cursor: pointer;
      .videoThumbnail {
        margin-bottom: 15px;
        position: relative;
        img {
          width: 100%;
          display: block;
          border-radius: 12px;
          transition: all 0.7s ease-in-out;
        }
        svg {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 50px;
          height: 50px;
        }
        .triangle {
          stroke-dasharray: 240;
          stroke-dashoffset: 480;
          stroke: white;
          transform: translateY(0);
          transition: all 0.7s ease-in-out;
        }
        .circle {
          stroke: white;
          stroke-dasharray: 650;
          stroke-dashoffset: 1300;
          transition: all 0.5s ease-in-out;
        }
        &:hover {
          img {
            opacity: 0.5;
          }
          .triangle {
            stroke-dashoffset: 0;
            opacity: 1;
            stroke: var(--pink);
            animation: trailorPlay 0.7s ease-in-out;
          }
          .circle {
            stroke-dashoffset: 0;
            stroke: var(--pink);
          }
        }
      }
      .videoTitle {
        color: white;
        font-size: 14px;
        line-height: 20px;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        @include md {
          font-size: 16px;
          line-height: 24px;
        }
      }
    }
  }

  .videoSkeleton {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    margin-right: -20px;
    margin-left: -20px;
    padding: 0 20px;
    @include md {
      gap: 20px;
      margin: 0;
      padding: 0;
    }
    .skItem {
      width: 150px;
      flex-shrink: 0;
      @include md {
        width: 25%;
      }
      .thumb {
        width: 100%;
        aspect-ratio: 16 / 9;
        border-radius: 12px;
        margin-bottom: 10px;
      }
      .row {
        height: 20px;
        width: 100%;
        border-radius: 10px;
        margin-bottom: 10px;
      }
      .row2 {
        height: 20px;
        width: 75%;
        border-radius: 10px;
      }
    }
  }
}
.videosSection .videos .videoItem .videoThumbnail {
  margin-bottom: 15px;
  position: relative;
}
</style>
