<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { HiOutlineSearch, VscChromeClose, SlMenu } from "@cmp/icons";
import ContentWrapper from "@cmp/ContentWrapper.vue";
import logo from "@assets/images/logo.png";

const show = ref("top");
const lastScrollY = ref(0);
const showMobileMenu = ref(false);
const query = ref("");
const showSearch = ref(false);

const router = useRouter();

const controlNavbar = () => {
  if (window.scrollY > 200) {
    if (window.scrollY > lastScrollY.value && !showMobileMenu.value) {
      show.value = "hide";
    } else {
      show.value = "show";
    }
  } else {
    show.value = "top";
  }
  lastScrollY.value = window.scrollY;
};

const searchQueryHandler = (event) => {
  if (event.key === "Enter" && query.value.length > 0) {
    router.push(`/search/${query.value}`);
    setTimeout(() => {
      showSearch.value = false;
    }, 1000);
  }
};

const openSearch = () => {
  showMobileMenu.value = false;
  showSearch.value = true;
};

const openMobileMenu = () => {
  showMobileMenu.value = true;
  showSearch.value = false;
};

const navigationHandler = () => {
  showMobileMenu.value = false;
};

onMounted(() => {
  window.addEventListener("scroll", controlNavbar);
});

onUnmounted(() => {
  window.removeEventListener("scroll", controlNavbar);
});
</script>

<template>
  <header :class="`header ${showMobileMenu ? 'mobileView' : ''} ${show}`">
    <ContentWrapper>
      <RouterLink class="logo logo-container" to="/">
        <img :src="logo" alt="logo" />
        <p class="logo-text">TMDB</p>
      </RouterLink>

      <ul class="menuItems">
        <li class="menuItem" @click="navigationHandler()">
          <RouterLink to="/explore/movie" activeClass="active-link"
            >Movies</RouterLink
          >
        </li>
        <li class="menuItem" @click="navigationHandler()">
          <RouterLink to="/explore/tv" activeClass="active-link"
            >TV Shows</RouterLink
          >
        </li>
        <li class="menuItem">
          <HiOutlineSearch @click="openSearch" />
        </li>
      </ul>

      <div class="mobileMenuItems">
        <HiOutlineSearch @click="openSearch" />

        <VscChromeClose v-if="showMobileMenu" @click="showMobileMenu = false" />

        <SlMenu v-else @click="openMobileMenu" />
      </div>
    </ContentWrapper>

    <div class="searchBar" v-if="showSearch">
      <ContentWrapper>
        <div class="searchInput">
          <input
            type="text"
            placeholder="Search for a movie or tv show...."
            v-model="query"
            v-on:keyup.enter="searchQueryHandler"
          />
          <VscChromeClose @click="showSearch = false" />
        </div>
      </ContentWrapper>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import "@assets/style/mixins.scss";

.header {
  position: fixed;
  transform: translateY(0);
  width: 100%;
  height: 60px;
  z-index: 1;
  display: flex;
  align-items: center;
  transition: all ease 0.5s;
  z-index: 2;
  &.top {
    background: rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(3.5px);
    -webkit-backdrop-filter: blur(3.5px);
  }
  &.show {
    background-color: var(--black3);
  }
  &.hide {
    transform: translateY(-60px);
  }

  .contentWrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .logo {
    cursor: pointer;
    display: flex;
    align-items: center;
    .logo-text {
      background: var(--gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: bold;
      font-size: 24px;
      margin-left: 10px;
    }
    img {
      height: 39px;
    }
  }
  .menuItems {
    list-style-type: none;
    display: none;
    align-items: center;
    @include md {
      display: flex;
    }
    .menuItem {
      height: 60px;
      display: flex;
      align-items: center;
      margin: 0 15px;
      color: white;
      font-weight: 500;
      position: relative;
      &.searchIcon {
        margin-right: 0;
      }
      svg {
        font-size: 18px;
      }
      cursor: pointer;
      &:hover {
        color: var(--pink);
      }

      a {
        color: white;
        &.active-link {
          color: var(--pink);
        }
      }
    }
  }

  .mobileMenuItems {
    display: flex;
    align-items: center;
    gap: 20px;
    @include md {
      display: none;
    }
    svg {
      font-size: 18px;
      color: white;
    }
  }

  &.mobileView {
    background: var(--black3);
    .menuItems {
      display: flex;
      position: absolute;
      top: 60px;
      left: 0;
      background: var(--black3);
      flex-direction: column;
      width: 100%;
      padding: 20px 0;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      animation: mobileMenu 0.3s ease forwards;
      .menuItem {
        font-size: 20px;
        width: 100%;
        height: auto;
        padding: 15px 20px;
        margin: 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        &:last-child {
          display: none;
        }
      }
    }
  }

  .searchBar {
    width: 100%;
    height: 60px;
    background-color: white;
    position: absolute;
    top: 60px;
    animation: mobileMenu 0.3s ease forwards;
    .searchInput {
      display: flex;
      align-items: center;
      height: 40px;
      margin-top: 10px;
      width: 100%;
      svg {
        font-size: 20px;
        flex-shrink: 0;
        margin-left: 10px;
        cursor: pointer;
      }
      input {
        width: 100%;
        height: 50px;
        background-color: white;
        outline: 0;
        border: 0;
        border-radius: 30px 0 0 30px;
        padding: 0 15px;
        font-size: 14px;
        @include md {
          height: 60px;
          font-size: 20px;
          padding: 0 30px;
        }
      }
    }
  }
}

@keyframes mobileMenu {
  0% {
    transform: translateY(-130%);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
