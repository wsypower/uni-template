<script setup lang="ts">
const a = 1;

onMounted(() => {
  console.log('onMounted123');
});
</script>

<template>
  <web-view src="https://www.baidu.com"></web-view>
</template>

<style lang="scss" scoped></style>
