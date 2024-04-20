<script setup lang="ts">
import dayjs from "dayjs";

import { ref, toRefs, computed, watch } from "vue";
import LazyLoadImage from "../LazyLoadImage.vue";
import ContentWrapper from "../ContentWrapper.vue";
import PlayIcon from "./PlayIcon.vue";
import Genres from "../Genres.vue";
import CircleRating from "../CircleRating.vue";
import VideoPopup from "../VideoPopup.vue";

import { useRoute, useRouter } from "vue-router";
import { useMyFetch } from "../../composables/useMyFetch";
import { storeToRefs } from "pinia";
import { useStore } from "../../stores/store";

const { imageUrls } = storeToRefs(useStore());

interface Props {
  video: any;
  crew: any;
}

const props = defineProps<Props>();
const { video, crew } = toRefs(props);

const route = useRoute();
const router = useRouter();
const mediaType = String(route.name);

const show = ref(false);
const videoId = ref(null);

const loading = ref(true);

const movie = ref();

const genres = computed(() => {
  return movie.value?.genres?.map((i) => i.id);
});

const directors = computed(() => {
  return crew.value?.filter((i) => i.job === "Director");
});

const writers = computed(() => {
  return crew.value?.filter(
    (i) => i.job === "Screenplay" || i.job === "Story" || i.job === "Writer"
  );
});

const toHoursAndMinutes = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
};

const getData = async (id: string) => {
  loading.value = true;

  const data = await useMyFetch(`/${mediaType}/${id}`);

  if (data?.code === "ERR_BAD_REQUEST") {
    router.push("/");
  }

  movie.value = data;
  loading.value = false;
};

watch(
  () => route.params.id,
  (newVal) => {
    getData(newVal as string);
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <div class="detailsBanner">
    <div v-if="loading" class="detailsBannerSkeleton">
      <ContentWrapper>
        <div class="left skeleton"></div>
        <div class="right">
          <div class="row skeleton"></div>
          <div class="row skeleton"></div>
          <div class="row skeleton"></div>
          <div class="row skeleton"></div>
          <div class="row skeleton"></div>
          <div class="row skeleton"></div>
          <div class="row skeleton"></div>
        </div>
      </ContentWrapper>
    </div>

    <template v-if="movie && !loading">
      <div class="backdrop-img">
        <LazyLoadImage :src="imageUrls?.backdrop + movie.backdrop_path" />
      </div>
      <div class="opacity-layer"></div>

      <ContentWrapper>
        <div class="content">
          <div class="left">
            <LazyLoadImage
              v-if="movie?.poster_path && imageUrls"
              class="posterImg"
              :src="imageUrls.backdrop + movie?.poster_path"
            />

            <LazyLoadImage
              v-else
              class="posterImg"
              src="/images/no-poster.png"
            />
          </div>
          <div class="right">
            <div class="title">
              {{ movie.name || movie.title }} ({{
                dayjs(movie?.release_date).format("YYYY")
              }})
            </div>
            <div class="subtitle">
              {{ movie.tagline }}
            </div>

            <Genres :data="genres" />

            <div class="row">
              <CircleRating :rating="movie?.vote_average?.toFixed(1)" large />
              <div
                class="playbtn"
                @click="
                  show = true;
                  videoId = video.key;
                "
              >
                <PlayIcon />
                <span class="text"> Watch Trailer </span>
              </div>
            </div>

            <div class="overview">
              <div class="heading">Overview</div>
              <div class="description">
                {{ movie.overview }}
              </div>
            </div>

            <div class="info">
              <div v-if="movie.status" class="infoItem">
                <span class="text bold"> Status: </span>
                <span class="text">
                  {{ movie.status }}
                </span>
              </div>

              <div v-if="movie.release_date" class="infoItem">
                <span class="text bold"> Release Date: </span>
                <span class="text">
                  {{ dayjs(movie.release_date).format("MMM D, YYYY") }}
                </span>
              </div>

              <div v-if="movie.runtime" class="infoItem">
                <span class="text bold"> Runtime: </span>
                <span class="text">
                  {{ toHoursAndMinutes(movie.runtime) }}
                </span>
              </div>
            </div>

            <div v-if="directors?.length > 0" class="info">
              <span class="text bold"> Director: </span>
              <span class="text">
                <span v-for="(d, i) in directors" :key="i">
                  {{ d.name }}{{ directors.length - 1 !== i ? ", " : "" }}
                </span>
              </span>
            </div>

            <div v-if="writers?.length > 0" class="info">
              <span class="text bold"> Writer: </span>
              <span class="text">
                <span v-for="(d, i) in writers" :key="i">
                  {{ d.name }}{{ writers.length - 1 !== i ? ", " : "" }}
                </span>
              </span>
            </div>

            <div v-if="movie?.created_by?.length > 0" class="info">
              <span class="text bold"> Creator:</span>
              <span class="text">
                <span v-for="(d, i) in movie?.created_by" :key="i">
                  {{ d.name }}
                  {{ movie?.created_by.length - 1 !== i ? ", " : "" }}
                </span>
              </span>
            </div>
          </div>
        </div>
        <VideoPopup
          :show="show"
          :videoId="videoId"
          @close="show = false"
          @reset="videoId = null"
        />
      </ContentWrapper>
    </template>
  </div>
</template>

<style lang="scss">
@import "@assets/style/mixins.scss";
.detailsBanner {
  width: 100%;
  background-color: var(--black);
  padding-top: 100px;
  margin-bottom: 50px;
  @include md {
    margin-bottom: 0;
    padding-top: 120px;
    min-height: 700px;
  }
  .backdrop-img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.1;
    overflow: hidden;
    .lazy-load-image-background {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }
  }
  .opacity-layer {
    width: 100%;
    height: 250px;
    background: linear-gradient(180deg, rgba(4, 21, 45, 0) 0%, #04152d 79.17%);
    position: absolute;
    bottom: 0;
    left: 0;
  }

  .content {
    display: flex;
    position: relative;
    flex-direction: column;
    gap: 25px;
    @include md {
      gap: 50px;
      flex-direction: row;
    }
    .left {
      flex-shrink: 0;
      .posterImg {
        width: 100%;
        display: block;
        border-radius: 12px;
        @include md {
          max-width: 350px;
        }
      }
    }
    .right {
      color: white;
      .title {
        font-size: 28px;
        line-height: 40px;
        @include md {
          font-size: 34px;
          line-height: 44px;
        }
      }
      .subtitle {
        font-size: 16px;
        line-height: 24px;
        margin-bottom: 15px;
        font-style: italic;
        opacity: 0.5;
        @include md {
          font-size: 20px;
          line-height: 28px;
        }
      }
      .genres {
        margin-bottom: 25px;
        flex-flow: row wrap;
      }
      .overview {
        margin-bottom: 25px;
        .heading {
          font-size: 24px;
          margin-bottom: 10px;
        }
        .description {
          line-height: 24px;
          @include md {
            padding-right: 100px;
          }
        }
      }
      .circleRating {
        max-width: 70px;
        background-color: var(--black2);
        @include md {
          max-width: 90px;
        }
        .CircularProgressbar-text {
          fill: white;
        }
      }
      .playbtn {
        display: flex;
        align-items: center;
        gap: 20px;
        cursor: pointer;
        svg {
          width: 60px;
          @include md {
            width: 80px;
          }
        }
        .text {
          font-size: 20px;
          transition: all 0.7s ease-in-out;
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
          .text {
            color: var(--pink);
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
      .row {
        display: flex;
        align-items: center;
        gap: 25px;
        margin-bottom: 25px;
      }

      .info {
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        padding: 15px 0;
        display: flex;
        .infoItem {
          margin-right: 10px;
          display: flex;
          flex-flow: row wrap;
        }
        .text {
          margin-right: 10px;
          opacity: 0.5;
          line-height: 24px;
          &.bold {
            font-weight: 600;
            opacity: 1;
          }
        }
      }
    }
  }

  .detailsBannerSkeleton {
    display: flex;
    position: relative;
    flex-direction: column;
    gap: 25px;
    @include md {
      gap: 50px;
      flex-direction: row;
    }
    .contentWrapper {
      display: flex;
      gap: 50px;
    }
    .left {
      flex-shrink: 0;
      width: 100%;
      display: block;
      border-radius: 12px;
      aspect-ratio: 1/1.5;
      @include md {
        max-width: 350px;
      }
    }
    .right {
      width: 100%;
      .row {
        width: 100%;
        height: 25px;
        margin-bottom: 20px;
        border-radius: 50px;
        &:nth-child(2) {
          width: 75%;
          margin-bottom: 50px;
        }
        &:nth-child(5) {
          width: 50%;
          margin-bottom: 50px;
        }
      }
    }
  }
}

.detailsBanner .backdrop-img {
  img {
    opacity: 0;
  }
  img[lazy="loaded"] {
    opacity: 1;
    transition: opacity 0.3s;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
}
</style>
