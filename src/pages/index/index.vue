<!--
 * @Description:
 * @Author: wsy
 * @Date: 2023-07-15 15:10:30
 * @LastEditTime: 2023-07-15 23:54:23
 * @LastEditors: wsy
-->
<script setup lang="ts">
import { useTitle } from '@/hooks/useTitle';
import { forward } from '@/utils/router';
import user from '@/store/user';

const userInf = user();
userInf.userInfo.token = '123123123';
console.log(userInf.userInfo.token);
const { title, changeTitle } = useTitle();
function goTest() {
  forward('test', {
    a: 1
  });
}
</script>

<template>
  <view class="content w-750rpx" bg="red">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <view h-60rpx bg="blue" @click="changeTitle">changeTitle</view>
    <view @click="goTest">这是测试页面</view>
    <uni-card>
      <text>{{ title }} </text>
    </uni-card>
    <button type="primary">页面主操作 Normal</button>
  </view>
</template>

<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.logo {
  margin-left: auto;
  margin-right: auto;
  margin-top: 200rpx;
  margin-bottom: 50rpx;
  width: 200rpx;
  height: 200rpx;
}
.text-area {
  display: flex;
  justify-content: center;
}
.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
