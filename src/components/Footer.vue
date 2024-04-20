<script setup lang="ts">
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "@cmp/icons";
import ContentWrapper from "@cmp/ContentWrapper.vue";
</script>

<template>
  <footer class="footer">
    <ContentWrapper>
      <ul class="menuItems">
        <li class="menuItem">Terms Of Use</li>
        <li class="menuItem">Privacy-Policy</li>
        <li class="menuItem">About</li>
        <li class="menuItem">Blog</li>
        <li class="menuItem">FAQ</li>
      </ul>
      <div class="infoText">
        The Movie Database (TMDB) is a community built movie and TV database.
        Every piece of data has been added by our amazing community dating back
        to 2008. TMDB's strong international focus and breadth of data is
        largely unmatched and something we're incredibly proud of. Put simply,
        we live and breathe community and that's precisely what makes us
        different.
      </div>
      <div class="socialIcons">
        <span class="icon">
          <FaFacebook />
        </span>
        <span class="icon">
          <FaInstagram />
        </span>
        <span class="icon">
          <FaTwitter />
        </span>
        <span class="icon">
          <FaLinkedin />
        </span>
      </div>
    </ContentWrapper>
  </footer>
</template>

<style lang="scss" scoped>
@import "@assets/style/mixins.scss";
.footer {
  background-color: var(--black3);
  padding: 50px 0;
  color: white;
  position: relative;
  .contentWrapper {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .menuItems {
    list-style-type: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    margin-bottom: 20px;
    @include md {
      margin-bottom: 30px;
      gap: 30px;
    }
    .menuItem {
      transition: all ease 0.3s;
      cursor: pointer;
      font-size: 12px;
      @include md {
        font-size: 16px;
      }
      &:hover {
        color: var(--pink);
      }
    }
  }
  .infoText {
    font-size: 12px;
    line-height: 20px;
    opacity: 0.5;
    text-align: center;
    max-width: 800px;
    margin-bottom: 20px;
    @include md {
      font-size: 14px;
      margin-bottom: 30px;
    }
  }
  .socialIcons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    .icon {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: var(--black);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all ease 0.3s;
      &:hover {
        box-shadow: 0 0 0.625em var(--pink);
        color: var(--pink);
      }
    }
  }
}
</style>
