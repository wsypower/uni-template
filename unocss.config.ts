import type { Preset, SourceCodeTransformer } from 'unocss';
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss';
import {
  presetApplet,
  // presetRemRpx,
  transformerApplet,
  transformerAttributify
} from 'unocss-applet';

/**
 * 判断是否启用小程序转换器
 * @returns [presets[], transformers[]]
 */
function isEnableTransformer(): [Preset[], SourceCodeTransformer[]] {
  const isApplet = process.env?.UNI_PLATFORM?.startsWith('mp-') ?? false;
  const presets: Preset[] = [];
  const transformers: SourceCodeTransformer[] = [];
  if (isApplet) {
    presets.push(presetApplet());
    // TODO:如果需要使用 rem 转 rpx 单位，需要启用此插件
    // presets.push(presetRemRpx())
    transformers.push(transformerAttributify());
    transformers.push(transformerApplet());
  } else {
    presets.push(presetUno());
    presets.push(presetAttributify());
  }
  return [presets, transformers];
}

const [presets, transformers] = isEnableTransformer();

export default defineConfig({
  presets: [
    // 由 Iconify 提供支持的纯 CSS 图标解决方案
    presetIcons({
      scale: 1.2,
      warn: true
    }),
    ...presets
  ],

  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
    ...transformers
  ],
  shortcuts: [
    ['center', 'flex justify-center items-center'],
    [
      'btn',
      'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'
    ],
    [
      'icon-btn',
      'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600 !outline-none'
    ],
    ['full', 'w-full h-full']
  ]
});
