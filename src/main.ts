/*
 * @Description:
 * @Author: wsy
 * @Date: 2023-07-15 15:10:30
 * @LastEditTime: 2023-07-15 19:47:19
 * @LastEditors: wsy
 */
import 'uno.css';
import { createSSRApp } from 'vue';
import App from './App.vue';
import store from '@/store';
import './uni.scss';
export function createApp() {
  const app = createSSRApp(App).use(store);
  return {
    app,
    store
  };
}
