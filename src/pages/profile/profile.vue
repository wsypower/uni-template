<!--
 * @Description:
 * @Author: wsy
 * @Date: 2023-07-15 15:10:30
 * @LastEditTime: 2023-07-16 00:53:25
 * @LastEditors: wsy
-->
<script lang="ts" setup>
import { useInit } from '@/hooks/useInit';

onLoad(() => {
  const { pageName, pagePath, pageQuery } = useInit();
  console.log(pageName, pagePath, pageQuery, 'pageName,pagePath, pageQuery');
});
</script>

<template>
  <Test></Test>
</template>

<style lang="scss" scoped></style>
