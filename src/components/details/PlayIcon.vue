<template>
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    width="80px"
    height="80px"
    viewBox="0 0 213.7 213.7"
    enable-background="new 0 0 213.7 213.7"
    xml:space="preserve"
  >
    <polygon
      class="triangle"
      fill="none"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-miterlimit="6"
      points="73.5,62.5 148.5,105.8 73.5,149.1 "
    ></polygon>
    <circle
      class="circle"
      fill="none"
      stroke-width="7"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-miterlimit="10"
      cx="106.8"
      cy="106.8"
      r="103.3"
    ></circle>
  </svg>
</template>
<style lang="scss" scoped>
@import "@assets/style/mixins.scss";
.detailsBanner {
  width: 100%;
  background-color: var(--black);
  padding-top: 100px;
  margin-bottom: 50px;
  @include md {
    margin-bottom: 0;
    padding-top: 120px;
    min-height: 700px;
  }
  .backdrop-img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.1;
    overflow: hidden;
    .lazy-load-image-background {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }
  }
  .opacity-layer {
    width: 100%;
    height: 250px;
    background: linear-gradient(180deg, rgba(4, 21, 45, 0) 0%, #04152d 79.17%);
    position: absolute;
    bottom: 0;
    left: 0;
  }

  .content {
    display: flex;
    position: relative;
    flex-direction: column;
    gap: 25px;
    @include md {
      gap: 50px;
      flex-direction: row;
    }
    .left {
      flex-shrink: 0;
      .posterImg {
        width: 100%;
        display: block;
        border-radius: 12px;
        @include md {
          max-width: 350px;
        }
      }
    }
    .right {
      color: white;
      .title {
        font-size: 28px;
        line-height: 40px;
        @include md {
          font-size: 34px;
          line-height: 44px;
        }
      }
      .subtitle {
        font-size: 16px;
        line-height: 24px;
        margin-bottom: 15px;
        font-style: italic;
        opacity: 0.5;
        @include md {
          font-size: 20px;
          line-height: 28px;
        }
      }
      .genres {
        margin-bottom: 25px;
        flex-flow: row wrap;
      }
      .overview {
        margin-bottom: 25px;
        .heading {
          font-size: 24px;
          margin-bottom: 10px;
        }
        .description {
          line-height: 24px;
          @include md {
            padding-right: 100px;
          }
        }
      }
      .circleRating {
        max-width: 70px;
        background-color: var(--black2);
        @include md {
          max-width: 90px;
        }
        .CircularProgressbar-text {
          fill: white;
        }
      }
      .playbtn {
        display: flex;
        align-items: center;
        gap: 20px;
        cursor: pointer;
        svg {
          width: 60px;
          @include md {
            width: 80px;
          }
        }
        .text {
          font-size: 20px;
          transition: all 0.7s ease-in-out;
        }
        .triangle {
          stroke-dasharray: 240;
          stroke-dashoffset: 480;
          stroke: white;
          transform: translateY(0);
          transition: all 0.7s ease-in-out;
        }
        .circle {
          stroke: white;
          stroke-dasharray: 650;
          stroke-dashoffset: 1300;
          transition: all 0.5s ease-in-out;
        }
        &:hover {
          .text {
            color: var(--pink);
          }
          .triangle {
            stroke-dashoffset: 0;
            opacity: 1;
            stroke: var(--pink);
            animation: trailorPlay 0.7s ease-in-out;
          }
          .circle {
            stroke-dashoffset: 0;
            stroke: var(--pink);
          }
        }
      }
      .row {
        display: flex;
        align-items: center;
        gap: 25px;
        margin-bottom: 25px;
      }

      .info {
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        padding: 15px 0;
        display: flex;
        .infoItem {
          margin-right: 10px;
          display: flex;
          flex-flow: row wrap;
        }
        .text {
          margin-right: 10px;
          opacity: 0.5;
          line-height: 24px;
          &.bold {
            font-weight: 600;
            opacity: 1;
          }
        }
      }
    }
  }

  .detailsBannerSkeleton {
    display: flex;
    position: relative;
    flex-direction: column;
    gap: 25px;
    @include md {
      gap: 50px;
      flex-direction: row;
    }
    .contentWrapper {
      display: flex;
      gap: 50px;
    }
    .left {
      flex-shrink: 0;
      width: 100%;
      display: block;
      border-radius: 12px;
      aspect-ratio: 1/1.5;
      @include md {
        max-width: 350px;
      }
    }
    .right {
      width: 100%;
      .row {
        width: 100%;
        height: 25px;
        margin-bottom: 20px;
        border-radius: 50px;
        &:nth-child(2) {
          width: 75%;
          margin-bottom: 50px;
        }
        &:nth-child(5) {
          width: 50%;
          margin-bottom: 50px;
        }
      }
    }
  }
}
</style>
