<script setup lang="ts">
import type { Results, Movie } from "@types";
import { ref, onMounted } from "vue";

import ContentWrapper from "@cmp/ContentWrapper.vue";
import Carousel from "@cmp/Carousel.vue";
import SwitchTabs from "@cmp/SwitchTabs.vue";
import { useMyFetch } from "@use/useMyFetch";

const endpoint = ref("day");

const carouselData = ref<Movie[]>([]);

const loading = ref(true);

const getData = async () => {
  const data = await useMyFetch<Results>(`/trending/movie/${endpoint.value}`);
  if (data.results) {
    carouselData.value = data.results;
  }
  loading.value = false;
};

const onTabChange = (tab) => {
  endpoint.value = tab === "Day" ? "day" : "week";
  getData();
};

onMounted(() => {
  getData();
});
</script>

<template>
  <div class="carouselSection">
    <ContentWrapper>
      <span class="carouselTitle">Trending</span>
      <SwitchTabs :data="['Day', 'Week']" @change="onTabChange" />
    </ContentWrapper>
    <Carousel :data="carouselData" :loading="loading" />
  </div>
</template>
