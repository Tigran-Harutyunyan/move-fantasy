<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useMyFetch } from "@use/useMyFetch";
import LazyLoadImage from "@cmp/LazyLoadImage.vue";
import ContentWrapper from "@cmp/ContentWrapper.vue";
import { storeToRefs } from "pinia";
import { useStore } from "@stores/store";
const { imageUrls } = storeToRefs(useStore());

const query = ref();
const upcoming = ref();
const router = useRouter();

const background = computed(() => {
  if (!upcoming.value) return "";
  if (!imageUrls.value.backdrop) return "";

  return (
    imageUrls.value.backdrop +
    upcoming.value?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path
  );
});

const searchQueryHandler = () => {
  if (query.value.length > 0) {
    router.push({ path: `/search/${query.value}` });
  }
};

onMounted(async () => {
  const data = await useMyFetch("/movie/upcoming");
  upcoming.value = data;
});
</script>

<template>
  <div class="heroBanner">
    <div class="backdrop-img">
      <LazyLoadImage :src="background" />
    </div>

    <div class="opacity-layer"></div>
    <ContentWrapper>
      <div class="heroBannerContent">
        <span class="title">Welcome</span>
        <span class="subTitle">
          Millions of movies, TV shows and people to discover. Explore now.
        </span>
        <div class="searchInput">
          <input
            type="text"
            placeholder="Search for a movie or tv show...."
            v-model="query"
            @keyup.enter="searchQueryHandler"
          />
          <button @click="searchQueryHandler">Search</button>
        </div>
      </div>
    </ContentWrapper>
  </div>
</template>

<style lang="scss" scoped>
@import "../../assets/style/mixins.scss";
.heroBanner {
  width: 100%;
  height: 450px;
  background-color: var(--black);
  display: flex;
  align-items: center;
  position: relative;
  @include md {
    height: 700px;
  }
  .backdrop-img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.5;
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
  .heroBannerContent {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    text-align: center;
    position: relative;
    max-width: 800px;
    margin: 0 auto;
    .title {
      font-size: 50px;
      font-weight: 700;
      margin-bottom: 10px;
      @include md {
        margin-bottom: 0;
        font-size: 90px;
      }
    }
    .subTitle {
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 40px;
      @include md {
        font-size: 24px;
      }
    }
    .searchInput {
      display: flex;
      align-items: center;
      width: 100%;
      input {
        width: calc(100% - 100px);
        height: 50px;
        background-color: white;
        outline: 0;
        border: 0;
        border-radius: 30px 0 0 30px;
        padding: 0 15px;
        font-size: 14px;
        @include md {
          width: calc(100% - 150px);
          height: 60px;
          font-size: 20px;
          padding: 0 30px;
        }
      }
      button {
        width: 100px;
        height: 50px;
        background: var(--gradient);
        color: white;
        outline: 0;
        border: 0;
        border-radius: 0 30px 30px 0;
        font-size: 16px;
        cursor: pointer;
        @include md {
          width: 150px;
          height: 60px;
          font-size: 18px;
        }
      }
    }
  }
}
</style>
