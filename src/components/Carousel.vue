<script setup lang="ts">
import { computed, ref, toRefs } from "vue";
import { storeToRefs } from "pinia";

import dayjs from "dayjs";
import type { Movie } from "@types";

import { useStore } from "@stores/store";
import PosterFallback from "@assets/images/no-poster.png";
import ContentWrapper from "@cmp/ContentWrapper.vue";
import Genres from "@cmp/Genres.vue";
import CircleRating from "@cmp/CircleRating.vue";
import LazyLoadImage from "@cmp/LazyLoadImage.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import "swiper/css";

const { imageUrls } = storeToRefs(useStore());

interface CarouselProps {
  endpoint?: string;
  loading?: boolean;
  title?: string;
  data: Movie[];
}

const props = defineProps<CarouselProps>();
const { data, endpoint, loading, title } = toRefs(props);

const carouselContainer = ref(null);

const newData = computed(() => {
  if (!imageUrls.value) return [];

  return data.value.map((item) => {
    const posterUrl = item.poster_path
      ? imageUrls.value.poster + item.poster_path
      : PosterFallback;

    return {
      ...item,
      posterUrl,
    };
  });
});
</script>

<template>
  <div class="carousel">
    <ContentWrapper>
      <div v-if="title" class="carouselTitle">{{ title }}</div>
      <div
        v-if="!loading && newData"
        class="carouselItems"
        ref="carouselContainer"
      >
        <swiper
          :modules="[Navigation]"
          :slides-per-view="5"
          :space-between="20"
          :navigation="true"
          :breakpoints="{
            '350': {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            '400': {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            '640': {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            '780': {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            '990': {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }"
        >
          <swiper-slide v-for="item in newData" :key="item.id">
            <RouterLink
              class="carouselItem"
              :to="{ path: `/${item.media_type || endpoint}/${item.id}` }"
            >
              <div class="posterBlock">
                <div class="lazy-load-image-background">
                  <LazyLoadImage :src="item.posterUrl" />
                </div>

                <CircleRating :rating="item.vote_average.toFixed(1)" />

                <Genres :data="item.genre_ids.slice(0, 2)" />
              </div>
              <div class="textBlock">
                <span class="title">
                  {{ item.title || item.name }}
                </span>
                <span class="date">
                  {{
                    dayjs(item.release_date || item.first_air_date).format(
                      "MMM D, YYYY"
                    )
                  }}
                </span>
              </div>
            </RouterLink>
          </swiper-slide>
        </swiper>
      </div>

      <div v-else class="loadingSkeleton">
        <div class="skeletonItem" v-for="index in 5" :key="index">
          <div class="posterBlock skeleton"></div>
          <div class="textBlock">
            <div class="title skeleton"></div>
            <div class="date skeleton"></div>
          </div>
        </div>
      </div>
    </ContentWrapper>
  </div>
</template>

<style lang="scss">
@import "@/assets/style/mixins.scss";
.carousel {
  margin-bottom: 50px;
  .contentWrapper {
    position: relative;
  }
  .carouselTitle {
    font-size: 24px;
    color: white;
    margin-bottom: 20px;
    font-weight: normal;
  }
  .arrow {
    font-size: 30px;
    color: black;
    position: absolute;
    top: 44%;
    transform: translateY(-50%);
    cursor: pointer;
    opacity: 0.5;
    z-index: 1;
    display: none;
    @include md {
      display: block;
    }
    &:hover {
      opacity: 0.8;
    }
  }
  .carouselLeftNav {
    left: 30px;
  }
  .carouselRighttNav {
    right: 30px;
  }
  .loadingSkeleton {
    display: flex;
    gap: 10px;
    overflow-y: hidden;
    margin-right: -20px;
    margin-left: -20px;
    padding: 0 20px;
    @include md {
      gap: 20px;
      overflow: hidden;
      margin: 0;
      padding: 0;
    }
    .skeletonItem {
      width: 125px;
      @include md {
        width: calc(25% - 15px);
      }
      @include lg {
        width: calc(20% - 16px);
      }
      flex-shrink: 0;
      .posterBlock {
        border-radius: 12px;
        width: 100%;
        aspect-ratio: 1 / 1.5;
        margin-bottom: 30px;
      }
      .textBlock {
        display: flex;
        flex-direction: column;
        .title {
          width: 100%;
          height: 20px;
          margin-bottom: 10px;
        }
        .date {
          width: 75%;
          height: 20px;
        }
      }
    }
  }
  .carouselItems {
    display: flex;
    gap: 10px;
    overflow-y: hidden;
    margin-right: -20px;
    margin-left: -20px;
    padding: 0 20px;
    @include md {
      gap: 20px;
      overflow: hidden;
      margin: 0;
      padding: 0;
    }
    .carouselItem {
      width: 125px;
      cursor: pointer;
      @include md {
        width: calc(25% - 15px);
      }
      @include lg {
        width: calc(20% - 16px);
      }
      flex-shrink: 0;
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
        .lazy-load-image-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 12px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
          }
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
  }
}

.lazy-load-image-background {
  img {
    filter: blur(15px);
  }
  img[lazy="loaded"] {
    opacity: 1;
    transition: opacity 0.3s;
    filter: none;
  }
}
</style>
