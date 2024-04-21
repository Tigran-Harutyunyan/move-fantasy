<script setup lang="ts">
import { ref, computed, watch, toRaw } from "vue";
import { useRouter, useRoute } from "vue-router";

import Multiselect from "@vueform/multiselect";
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";

import ContentWrapper from "../components/ContentWrapper.vue";
import MovieCard from "../components/MovieCard.vue";
import { useMyFetch } from "../composables/useMyFetch";

type filterTypes = "genres" | "sortby";

const route = useRoute();
const router = useRouter();

const data = ref();
const genresData = ref();

const pageNumber = ref(1);
const loading = ref(false);
const selectedGenres = ref();
const sortby = ref();
const filters = ref();

const mediaType = computed(() => {
  return String(route.params.id);
});

if (!(mediaType.value === "tv" || mediaType.value === "movie")) {
  router.push({ path: "/" });
}

const sortbyData = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  {
    value: "primary_release_date.desc",
    label: "Release Date Descending",
  },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "original_title.asc", label: "Title (A-Z)" },
];

const hasMore = computed(() => {
  return data.value ? pageNumber.value <= data.value?.total_pages : false;
});

const fetchInitialData = async () => {
  loading.value = true;
  data.value = [];

  try {
    const response = await useMyFetch(
      `/discover/${toRaw(mediaType.value)}`,
      filters.value
    );
    data.value = response;
    ++pageNumber.value;
  } catch (error) {
  } finally {
    loading.value = false;
  }
};

const fetchNextPageData = async () => {
  if (!hasMore.value) return;

  try {
    const response = await useMyFetch(
      `/discover/${mediaType.value}?page=${pageNumber.value}`,
      filters.value
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

const fetchGenres = async () => {
  const { genres } = await useMyFetch(`/genre/${mediaType.value}/list`);

  if (genres) {
    genresData.value = genres.map((item) => {
      return {
        value: item.id,
        label: item.name,
      };
    });
  }
};

const onChange = (action: filterTypes) => {
  if (!filters.value) filters.value = {};

  if (action === "sortby") {
    if (sortby.value) {
      filters.value.sort_by = sortby.value;
    } else {
      delete filters.value?.sort_by;
    }
  }
  if (action === "genres") {
    if (selectedGenres.value) {
      let genreId = JSON.stringify(toRaw(selectedGenres.value)).slice(1, -1);
      filters.value.with_genres = genreId;
    } else {
      delete filters.value?.with_genres;
    }
  }

  pageNumber.value = 1;
  fetchInitialData();
};

fetchInitialData();
fetchGenres();

watch(
  () => mediaType.value,
  () => {
    filters.value = {};
    data.value = null;
    pageNumber.value = 1;
    sortby.value = null;
    selectedGenres.value = [];
    fetchInitialData();
  }
);
</script>

<template>
  <div class="explorePage">
    <ContentWrapper>
      <div class="pageHeader">
        <div class="pageTitle">
          {{ mediaType === "tv" ? "Explore TV Shows" : "Explore Movies" }}
        </div>

        <div class="filters">
          <Multiselect
            mode="tags"
            v-model="selectedGenres"
            :options="genresData"
            placeholder="Select genres"
            @select="onChange('genres')"
            @remove="onChange('genres')"
            @clear="onChange('genres')"
            @deselect="onChange('genres')"
          />

          <Multiselect
            v-model="sortby"
            :options="sortbyData"
            placeholder="Sort by"
            @select="onChange('sortby')"
            @remove="onChange('sortby')"
            @clear="onChange('sortby')"
          />
        </div>
      </div>
      <Spinner v-if="loading" :initial="true" />
      <template v-if="data?.results?.length > 0">
        <div class="content">
          <template v-for="(item, index) in data?.results" :key="index">
            <MovieCard
              v-if="item.media_type !== 'person'"
              :data="item"
              :fromSearch="false"
              :media-type="mediaType"
            />
          </template>
        </div>

        <InfiniteLoading
          v-if="data?.results.length >= 20"
          @infinite="fetchNextPageData"
          class="infinite-spinner"
        />
      </template>

      <span
        v-if="!loading && data?.results?.length === 0"
        class="resultNotFound"
      >
        Sorry, Results not found!
      </span>
    </ContentWrapper>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/style/mixins.scss";

.explorePage {
  min-height: 700px;
  padding-top: 100px;
  .resultNotFound {
    font-size: 24px;
    color: var(--black-light);
  }
  .pageHeader {
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
    flex-direction: column;
    @include md {
      flex-direction: row;
    }
  }
  .pageTitle {
    font-size: 24px;
    line-height: 34px;
    color: white;
    margin-bottom: 20px;
    @include md {
      margin-bottom: 0;
    }
  }
  .filters {
    display: flex;
    gap: 10px;
    flex-direction: column;
    @include md {
      flex-direction: row;
      justify-content: end;
    }
    .react-select-container {
      &.genresDD {
        width: 100%;
        @include md {
          max-width: 500px;
          min-width: 250px;
        }
      }
      &.sortbyDD {
        width: 100%;
        flex-shrink: 0;
        @include md {
          width: 250px;
        }
      }
      .react-select__control {
        border: 0;
        outline: 0;
        box-shadow: none;
        background-color: var(--black-light);
        border-radius: 20px;
        .react-select__value-container {
          .react-select__placeholder,
          .react-select__input-container {
            color: white;
            margin: 0 10px;
          }
        }
        .react-select__single-value {
          color: white;
        }
        .react-select__multi-value {
          background-color: var(--black3);
          border-radius: 10px;
          .react-select__multi-value__label {
            color: white;
          }
          .react-select__multi-value__remove {
            background-color: transparent;
            color: white;
            cursor: pointer;
            &:hover {
              color: var(--black-lighter);
            }
          }
        }
      }
      .react-select__menu {
        top: 40px;
        margin: 0;
        padding: 0;
      }
    }
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
        margin-bottom: 30px;
      }
    }
  }
}

.multiselect {
  width: auto;
  min-width: 250px;
}
</style>
