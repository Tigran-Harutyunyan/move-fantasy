<script setup lang="ts">
import { onMounted } from "vue";
import { useGenres } from "@use/useGenres";
import { useConfig } from "@use/useConfig";
import { useStore } from "@stores/store";
const { setImageURLs, setGenres } = useStore();

import Header from "@cmp/Header.vue";
import Footer from "@cmp/Footer.vue";

const fetchApiConfig = async () => {
  try {
    const imageUrls = await useConfig();
    setImageURLs(imageUrls);
  } catch (error) {}
};

const getGenres = async () => {
  try {
    const response = await useGenres();
    if (response) {
      setGenres(response);
    }
  } catch (error) {}
};

onMounted(() => {
  fetchApiConfig();
  getGenres();
});
</script>

<template>
  <Header />
  <main>
    <RouterView />
  </main>
  <Footer />
</template>
