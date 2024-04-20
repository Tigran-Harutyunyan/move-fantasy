<script setup lang="ts">
import { ref, computed } from "vue";

import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";

import ContentWrapper from "../components/ContentWrapper.vue";
import PersonCard from "../components/PersonCard.vue";
import { useMyFetch } from "../composables/useMyFetch";

const data = ref();

const pageNumber = ref(1);
const loading = ref(false);

const hasMore = computed(() => {
  return data.value ? pageNumber.value <= data.value?.total_pages : false;
});

const fetchInitialData = async () => {
  loading.value = true;
  data.value = [];

  try {
    const response = await useMyFetch("/person/popular");
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
      `/person/popular?page=${pageNumber.value}`
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
  <div class="explorePage">
    <ContentWrapper>
      <div class="pageHeader">
        <div class="pageTitle">Popular people</div>
      </div>
      <template v-if="data?.results?.length > 0">
        <div class="content">
          <template v-for="(item, index) in data?.results" :key="index">
            <PersonCard :data="item" />
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
