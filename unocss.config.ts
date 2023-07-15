/*
 * @Description:
 * @Author: wsy
 * @Date: 2023-07-15 15:10:30
 * @LastEditTime: 2023-07-15 19:15:50
 * @LastEditors: wsy
 */
import type { Preset, Rule } from 'unocss';
import { defineConfig, presetUno } from 'unocss';

import presetRemToRpx from './preset-rem-to-rpx';

const sizeMapping: Record<string, string> = {
  fs: 'font-size'
};

function getSizeRules(Mapping: Record<string, string>): Rule<{}>[] {
  return Object.keys(Mapping).map((key) => {
    const value = Mapping[key];
    return [new RegExp(`^${key}-(\\d+)$`), ([, d]) => ({ [value]: `${d}rpx` })];
  });
}

export default defineConfig({
  presets: [
    presetUno(),
    presetRemToRpx({
      baseFontSize: 4
    }) as Preset
  ],
  theme: {
    preflightRoot: ['page,::before,::after']
  },
  rules: getSizeRules(sizeMapping)
});
