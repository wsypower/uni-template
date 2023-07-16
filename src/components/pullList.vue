<!--
 * @Description:
 * @Author: wsy
 * @Date: 2023-07-15 15:10:30
 * @LastEditTime: 2023-07-16 14:27:44
 * @LastEditors: wsy
-->
<script setup lang="ts">
import type {
  ScrollViewOnScroll,
  ScrollViewOnScrolltolower
} from '@uni-helper/uni-app-types';

withDefaults(
  defineProps<{
    scrollTop?: number;
    scrollToLower?: ScrollViewOnScrolltolower;
    scroll?: ScrollViewOnScroll;
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
    @scroll-to-lower="scrollToLower"
    @scroll="scroll"
  >
    <slot name="list"></slot>
  </scroll-view>
</template>

<style scoped lang="scss"></style>
