<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useMyFetch } from "../../composables/useMyFetch";
import type { Movie } from "../../types";
import Carousel from "../Carousel.vue";

interface Props {
  mediaType: string;
  id: string;
}

const route = useRoute();
const carouselData = ref<Movie[]>([]);
const loading = ref(true);

const { mediaType } = defineProps<Props>();

const getData = async (id: string) => {
  loading.value = true;

  const data = await useMyFetch(`/${mediaType}/${id}/recommendations`);

  if (data.results) {
    carouselData.value = data.results;
  }

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
  <Carousel
    :data="carouselData"
    :loading="loading"
    :endpoint="mediaType"
    title="Recommendations"
  />
</template>
