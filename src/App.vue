<script setup lang="ts">
import { onMounted } from "vue";
import { useMyFetch } from "@use/useMyFetch";
import { useStore } from "@stores/store";
const { setImageURLs, setGenres } = useStore();

import Header from "@cmp/Header.vue";
import Footer from "@cmp/Footer.vue";

const fetchApiConfig = async () => {
  try {
    const res = await useMyFetch("/configuration");

    if (res.images) {
      const { secure_base_url } = res.images;

      const imageUrls = {
        backdrop: secure_base_url + "original",
        poster: secure_base_url + "original",
        profile: secure_base_url + "original",
      };
      setImageURLs(imageUrls);
    }
  } catch (error) {}
};

const getGenres = async () => {
  let promises = [];
  let endPoints = ["tv", "movie"];
  let allGenres = {};

  endPoints.forEach((url) => {
    promises.push(useMyFetch(`/genre/${url}/list`));
  });

  const data = await Promise.all(promises);

  if (data && Array.isArray(data)) {
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });

    setGenres(allGenres);
  }
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

<style scoped></style>
