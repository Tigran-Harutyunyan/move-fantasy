<script setup lang="ts">
import dayjs from "dayjs";
import type { Person } from "../../types";
import { toRefs } from "vue";
import LazyLoadImage from "../LazyLoadImage.vue";
import ContentWrapper from "../ContentWrapper.vue";

import { storeToRefs } from "pinia";
import { useStore } from "../../stores/store";

const { imageUrls } = storeToRefs(useStore());

interface Props {
  person: Person | null;
  loading: boolean;
}

const props = defineProps<Props>();
const { person, loading } = toRefs(props);
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

    <template v-if="person && !loading">
      <ContentWrapper>
        <div class="content">
          <div class="left">
            <LazyLoadImage
              v-if="person?.profile_path && imageUrls"
              class="posterImg"
              :src="imageUrls.backdrop + person?.profile_path"
            />
          </div>
          <div class="right">
            <div class="title">
              {{ person.name }}
            </div>

            <div class="overview">
              <div class="heading">Biography</div>
              <div class="description">
                {{ person.biography || "N/A" }}
              </div>
            </div>

            <div class="info">
              <div v-if="person.known_for_department" class="infoItem">
                <span class="text bold"> Known for: </span>
                <span class="text">
                  {{ person.known_for_department }}
                </span>
              </div>

              <div v-if="person.also_known_as" class="infoItem">
                <span class="text bold"> Also Known As: </span>
                <span class="text">
                  <span v-for="(d, i) in person?.also_known_as" :key="i">
                    {{ d }}
                    {{ person?.also_known_as.length - 1 !== i ? ", " : "" }}
                  </span>
                </span>
              </div>
            </div>

            <div class="info">
              <div v-if="person.gender" class="infoItem">
                <span class="text bold"> Gender: </span>
                <span class="text">
                  {{ person.gender === 2 ? "Male" : "Female" }}
                </span>
              </div>

              <div v-if="person.birthday" class="infoItem">
                <span class="text bold"> Birthday: </span>
                <span class="text">
                  {{ dayjs(person.birthday).format("MMM D, YYYY") }}
                </span>
              </div>

              <div v-if="person.place_of_birth" class="infoItem">
                <span class="text bold"> Birth place: </span>
                <span class="text">
                  {{ person.place_of_birth }}
                </span>
              </div>

              <div v-if="person.deathday" class="infoItem">
                <span class="text bold"> Death day: </span>
                <span class="text">
                  {{ person.deathday }}
                </span>
              </div>
            </div>

            <div class="info" v-if="person.homepage">
              <div class="infoItem">
                <span class="text bold"> Homepage: </span>
                <span class="text">
                  <a
                    :href="person.homepage"
                    target="_blank"
                    class="static-link"
                    >{{ person.homepage }}</a
                  >
                </span>
              </div>
            </div>

            <br />
            <br />
            <br />
          </div>
        </div>
      </ContentWrapper>
    </template>
  </div>
</template>

<style lang="scss">
@import "@assets/style/mixins.scss";

.overview {
  margin-top: 30px;
}
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
          max-height: 397px;
          overflow: scroll;
          opacity: 0.8;
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
