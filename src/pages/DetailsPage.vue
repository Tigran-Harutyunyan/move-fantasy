<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

import Cast from "../components/details/Cast.vue";
import DetailsBanner from "../components/details/DetailsBanner.vue";
import VideoSection from "../components/details/VideoSection.vue";
import Similiar from "../components/details/Similiar.vue";
import Recommendation from "../components/details/Recommendation.vue";

import { useMyFetch } from "../composables/useMyFetch";

const router = useRouter();
const route = useRoute();

const credits = ref();
const videoData = ref();

const creditsLoading = ref(true);
const videoLoading = ref(true);

const mediaType = computed(() => {
  return String(route.name);
});

const id = route.params.id as string;

if (!(mediaType.value === "tv" || mediaType.value === "movie")) {
  router.push({ path: "/" });
}

const getCredits = async (id: string) => {
  creditsLoading.value = true;

  const data = await useMyFetch(`/${mediaType.value}/${id}/credits`);

  credits.value = data;
  creditsLoading.value = false;
};

const getVideos = async (id: string) => {
  videoLoading.value = true;
  const data = await useMyFetch(`/${mediaType.value}/${id}/videos`);

  if (data.results?.[0]) {
    videoData.value = data;
  }

  videoLoading.value = false;
};

watch(
  () => route.params.id,
  (newVal) => {
    getCredits(newVal as string);
    getVideos(newVal as string);
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <div>
    <DetailsBanner :video="videoData?.results?.[0]" :crew="credits?.crew" />
    <Cast :data="credits?.cast" :loading="creditsLoading" />
    <VideoSection :data="videoData" :loading="videoLoading" />
    <Similiar :media-type="mediaType" :id="id" />
    <Recommendation :media-type="mediaType" :id="id" />
  </div>
</template>
