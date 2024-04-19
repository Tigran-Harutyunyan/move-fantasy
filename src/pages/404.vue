<script setup lang="ts">
import ContentWrapper from "../components/ContentWrapper.vue";
</script>

<template>
  <div class="pageNotFound">
    <ContentWrapper>
      <span class="bigText">404</span>
      <span class="smallText">Page not found!</span>
    </ContentWrapper>
  </div>
</template>

<style lang="scss" scoped>
.pageNotFound {
  height: 700px;
  padding-top: 200px;
  .contentWrapper {
    text-align: center;
    color: var(--black-light);
    display: flex;
    flex-direction: column;
    .bigText {
      font-size: 150px;
      font-weight: 700;
    }
    .smallText {
      font-size: 44px;
    }
  }
}
</style>
