<script setup lang="ts">
import HeroBanner from "../components/home/HeroBanner.vue";
import Trending from "../components/home/Trending.vue";
import Popular from "../components/home/Popular.vue";
import TopRated from "../components/home/TopRated.vue";
</script>

<template>
  <div class="homePage">
    <HeroBanner />
    <Trending />
    <Popular />
    <TopRated />
  </div>
</template>
