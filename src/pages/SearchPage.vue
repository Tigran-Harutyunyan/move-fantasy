<script setup lang="ts">
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
import ContentWrapper from "../components/ContentWrapper.vue";
import MovieCard from "../components/MovieCard.vue";
import { useMyFetch } from "../composables/useMyFetch";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const data = ref();
const pageNumber = ref(1);
const loading = ref(false);

const fetchInitialData = async () => {
  loading.value = true;
  data.value = [];

  try {
    const response = await useMyFetch(
      `/search/multi?query=${route.params.id}&page=${pageNumber.value}`
    );

    data.value = response;
    ++pageNumber.value;
  } catch (error) {
  } finally {
    loading.value = false;
  }
};

const fetchNextPageData = async () => {
  try {
    const response = await useMyFetch(
      `/search/multi?query=${route.params.id}&page=${pageNumber.value}`
    );

    if (data.value?.results) {
      data.value = {
        ...data.value,
        results: [...data.value?.results, ...response.results],
      };
    } else {
      data.value = response;
    }
    ++pageNumber.value;
  } catch (error) {}
};

fetchInitialData();
</script>

<template>
  <div class="searchResultsPage">
    <Spinner v-if="loading" :initial="true" />
    <template v-else>
      <ContentWrapper>
        <template v-if="data?.results?.length > 0">
          <div class="pageTitle">
            {{
              `Search ${data?.total_results > 1 ? "results" : "result"} of '${
                route.params.id
              }'`
            }}
          </div>
          <div class="content">
            <template v-for="(item, index) in data?.results" :key="index">
              <MovieCard
                v-if="item.media_type !== 'person'"
                :data="item"
                :fromSearch="true"
                :media-type="mediaType"
              />
            </template>
          </div>

          <InfiniteLoading
            @infinite="fetchNextPageData"
            class="infinite-spinner"
          />
        </template>

        <span v-else class="resultNotFound"> Sorry, Results not found! </span>
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
    color: var(--black-light);
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
