/*
 * @Description:
 * @Author: wsy
 * @Date: 2023-07-15 20:42:18
 * @LastEditTime: 2023-07-16 15:59:00
 * @LastEditors: wsy
 */
import { resolve } from 'node:path';
import uni from '@dcloudio/vite-plugin-uni';
import AutoImportTypes from 'auto-import-types';
import PiniaAutoRefs from 'pinia-auto-refs';
import Unocss from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import UniHelperComponents from '@uni-helper/vite-plugin-uni-components';
import { defineConfig, loadEnv } from 'vite';

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    plugins: [
      Unocss(),
      AutoImportTypes(),
      PiniaAutoRefs(),
      AutoImport({
        dts: 'src/auto-imports.d.ts',
        imports: [
          'vue',
          'uni-app',
          'pinia',
          {
            '@/helper/pinia-auto-refs': ['useStore']
          }
        ],
        exclude: ['createApp'],
        eslintrc: {
          enabled: true
        }
      }),
      // Components({
      //   extensions: ['vue'],
      //   dts: 'src/components.d.ts'
      // }),
      UniHelperComponents({
        dts: 'src/components.d.ts',
        directoryAsNamespace: true
      }),
      uni()
    ],
    server: {
      open: true,
      base: './ ',
      proxy: {
        '^/api': {
          target: env.VITE_APP_API_BASEURL, // 后端服务实际地址
          changeOrigin: true, // 开启代理
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  });
};
