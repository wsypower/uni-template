<script setup lang="ts">
const a = 1;
onLoad(() => {
  console.log('onLoad');
});
onShow(() => {
  console.log('onShow');
});
onHide(() => {
  console.log('onHide');
});
onUnload(() => {
  console.log('onUnload');
});
onMounted(() => {
  console.log('onMounted');
});
</script>

<template>
  <web-view src="https://www.baidu.com"></web-view>
</template>

<style lang="scss" scoped></style>
