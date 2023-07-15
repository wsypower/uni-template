<script setup lang="ts">
import type {
  ScrollViewOnScroll,
  ScrollViewOnScrolltolower
} from '@uni-helper/uni-app-types';

withDefaults(
  defineProps<{
    scrollTop: number;
    onScrollToLower: ScrollViewOnScrolltolower;
    onScroll: ScrollViewOnScroll;
  }>(),
  {
    scrollTop: 0,
    onScrollToLower() {
      console.log('onScrollToLower');
    },
    onScroll() {
      console.log('onScroll');
    }
  }
);
</script>

<template>
  <scroll-view
    :style="{
      height: '100%',
      width: '100%'
    }"
    :scroll-y="true"
    :lower-threshold="300"
    :scroll-top="scrollTop"
    @scrolltolower="onScrollToLower"
    @scroll="onScroll"
  >
    <slot name="list"></slot>
  </scroll-view>
</template>

<style scoped lang="scss"></style>
