<script setup lang="ts">
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
import ContentWrapper from "../components/ContentWrapper.vue";
import MovieCard from "../components/MovieCard.vue";
import Spinner from "../components/Spinner.vue";
import { useMyFetch } from "../composables/useMyFetch";
import { ref, watch, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const data = ref();
const pageNumber = ref(1);
const loading = ref(false);

const getFilteredData = (results) => {
  return results.filter((item) => item?.media_type !== "person");
};

const fetchInitialData = async () => {
  if (!route.params.id) return;

  loading.value = true;
  data.value = [];

  try {
    const response = await useMyFetch(
      `/search/multi?query=${route.params.id}&page=${pageNumber.value}`
    );

    response.results = getFilteredData(response.results);
    data.value = response;
    pageNumber.value++;
  } catch (error) {
  } finally {
    loading.value = false;
  }
};

const hasMore = computed(() => {
  return data.value ? pageNumber.value <= data.value?.total_pages : false;
});

const fetchNextPageData = async () => {
  if (!hasMore.value) return;

  try {
    const response = await useMyFetch(
      `/search/multi?query=${route.params.id}&page=${pageNumber.value}`
    );

    if (data.value?.results) {
      data.value = {
        ...data.value,
        results: [...data.value?.results, ...getFilteredData(response.results)],
      };
    } else {
      data.value = response;
    }
    ++pageNumber.value;
  } catch (error) {}
};

fetchInitialData();

watch(
  () => useRoute()?.fullPath,
  () => {
    fetchInitialData();
  }
);
</script>

<template>
  <div class="searchResultsPage">
    <Spinner v-if="loading" :initial="true" />
    <template v-else>
      <ContentWrapper>
        <template v-if="data?.results?.length > 0">
          <div class="pageTitle">
            {{
              `Search ${data?.total_results > 1 ? "results" : "result"} for '${
                route.params.id
              }'`
            }}
          </div>
          <div class="content">
            <template v-for="(item, index) in data?.results" :key="index">
              <MovieCard :data="item" :fromSearch="true" />
            </template>
          </div>

          <InfiniteLoading
            v-if="data?.results.length >= 20"
            @infinite="fetchNextPageData"
            class="infinite-spinner"
          />
        </template>

        <div v-else class="resultNotFound">
          There are no movies that matched your query
        </div>
      </ContentWrapper>
    </template>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/style/mixins.scss";
.searchResultsPage {
  min-height: 700px;
  padding-top: 100px;
  .resultNotFound {
    font-size: 24px;
    color: white;
    margin: 100px auto 0;
    text-align: center;
  }
  .pageTitle {
    font-size: 24px;
    line-height: 34px;
    color: white;
    margin-bottom: 25px;
  }
  .content {
    display: flex;
    flex-flow: row wrap;
    gap: 10px;
    margin-bottom: 50px;
    @include md {
      gap: 20px;
    }
    .movieCard {
      .posterBlock {
        margin-bottom: 20px;
      }
    }
  }
}
</style>
