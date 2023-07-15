<script setup lang="ts">
const a = 1;

function testFn() {
  console.log(333);
}
</script>

<template>
  <div w-150rpx h150rpx bg="blue-400" @click="testFn">{{ a }}</div>
</template>

<style lang="scss" scoped></style>
