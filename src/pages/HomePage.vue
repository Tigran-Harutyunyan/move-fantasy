<script setup lang="ts">
import HeroBanner from "@cmp/home/HeroBanner.vue";
import Trending from "@cmp/home/Trending.vue";
import Popular from "@cmp/home/Popular.vue";
import TopRated from "@cmp/home/TopRated.vue";
</script>

<template>
  <div class="homePage">
    <HeroBanner />
    <Trending />
    <Popular />
    <TopRated />
  </div>
</template>
