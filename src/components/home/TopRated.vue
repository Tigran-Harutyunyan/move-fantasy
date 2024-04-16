<script setup lang="ts">
import type { Results, Movie } from "@types";
import { ref, onMounted } from "vue";

import ContentWrapper from "@cmp/ContentWrapper.vue";
import Carousel from "@cmp/Carousel.vue";
import SwitchTabs from "@cmp/SwitchTabs.vue";
import { useMyFetch } from "@use/useMyFetch";

const endpoint = ref("movie");

const carouselData = ref<Movie[]>([]);

const loading = ref(true);

const getData = async () => {
  const data = await useMyFetch<Results>(`/${endpoint.value}/top_rated`);

  if (data.results) {
    carouselData.value = data.results;
  }

  loading.value = false;
};

const onTabChange = (tab) => {
  endpoint.value = tab === "Movies" ? "movie" : "tv";
  getData();
};

onMounted(() => {
  getData();
});
</script>

<template>
  <div class="carouselSection">
    <ContentWrapper>
      <span class="carouselTitle">Top Rated</span>
      <SwitchTabs :data="['Movies', 'TV Shows']" @change="onTabChange" />
    </ContentWrapper>
    <Carousel :data="carouselData" :loading="loading" :endpoint="endpoint" />
  </div>
</template>
