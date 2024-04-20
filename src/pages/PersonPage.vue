<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import type { Person } from "../types";

import PersonInfo from "../components/person/PersonInfo.vue";
import Carousel from "../components/Carousel.vue";

import { useMyFetch } from "../composables/useMyFetch";

const route = useRoute();

const cast = ref(null);
const activities = ref(null);
const person = ref<Person | null>(null);

const creditsLoading = ref(true);
const personLoading = ref(true);

const id = Number(route.params.id);

const getMovieCredits = async (id: number) => {
  creditsLoading.value = true;
  try {
    const data = await useMyFetch(`/person/${id}/movie_credits`);
    cast.value = data.cast;

    if (data.crew) {
      activities.value = Object.groupBy(
        data.crew,
        ({ department }) => department
      );
    }
  } catch (error) {
    console.log(error?.message);
  } finally {
    creditsLoading.value = false;
  }
};

const getPerson = async (id: number) => {
  personLoading.value = true;

  try {
    const data = await useMyFetch(`/person/${id}`);

    person.value = data;
  } catch (error) {
    console.log(error?.message);
  } finally {
    personLoading.value = false;
  }
};

watch(
  () => route.params.id,
  (newVal) => {
    getPerson(Number(newVal));
    getMovieCredits(id);
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <div>
    <PersonInfo :person="person" :loading="personLoading" />

    <Carousel
      :data="cast || []"
      :loading="creditsLoading"
      endpoint="movie"
      title="Acting"
    />

    <template v-if="activities">
      <template v-for="(value, key, index) in activities" :key="index">
        <Carousel
          :data="value || []"
          :loading="false"
          endpoint="movie"
          :title="String(key)"
        />
      </template>
    </template>
  </div>
</template>
