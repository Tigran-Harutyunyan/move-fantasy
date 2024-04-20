<script setup lang="ts">
import LiteYouTubeEmbed from "vue-lite-youtube-embed";
import "vue-lite-youtube-embed/style.css";

const emit = defineEmits(["close", "reset"]);

interface Prop {
  show: boolean;
  videoId: string | null;
}
const { show, videoId } = defineProps<Prop>();

const hidePopup = () => {
  emit("close");
  emit("reset");
};
</script>

<template>
  <div :class="`videoPopup ${show ? 'visible' : ''}`">
    <div class="opacityLayer" @click="hidePopup"></div>
    <div class="videoPlayer">
      <span class="closeBtn" @click="hidePopup"> Close </span>
      <LiteYouTubeEmbed :id="videoId" v-if="videoId" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.videoPopup {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  visibility: hidden;
  z-index: 9;
  .opacityLayer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(3.5px);
    -webkit-backdrop-filter: blur(3.5px);
    opacity: 0;
    transition: opacity 400ms;
  }
  .videoPlayer {
    position: relative;
    width: 800px;
    aspect-ratio: 16 / 9;
    background-color: white;
    transform: scale(0.2);
    transition: transform 250ms;
    .closeBtn {
      position: absolute;
      top: -20px;
      right: 0;
      color: white;
      cursor: pointer;
    }
  }
  &.visible {
    opacity: 1;
    visibility: visible;
    .opacityLayer {
      opacity: 1;
    }
    .videoPlayer {
      transform: scale(1);
    }
  }
}
</style>
