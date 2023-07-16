# vue3 for uni-app

## 特性

- ⚡️ [Vue 3](https://github.com/vuejs/core), [Vite](https://github.com/vitejs/vite), [pnpm](https://pnpm.io/), [esbuild](https://github.com/evanw/esbuild)

- 📦 [组件自动化加载](./src/components)

- 🎨 [UnoCSS](https://github.com/unocss/unocss) - 高性能且极具灵活性的即时原子化 CSS 引擎

- 😃 [各种图标集为你所用](https://github.com/antfu/unocss/tree/main/packages/preset-icons)

- 🔥 使用 [新的 `<script setup>` 语法](https://github.com/vuejs/rfcs/pull/227)

- 📥 [API 自动加载](https://github.com/antfu/unplugin-auto-import) - 直接使用 Composition API 无需引入

- 🦾 [TypeScript](https://www.typescriptlang.org/) & [ESLint](https://eslint.org/) - 保证代码质量

## 技术栈

- 🍀 依赖管理：node v16.x, 如果你已经使用 nvm，可以参考 [Github: nvm](https://github.com/nvm-sh/nvm#deeper-shell-integration) 来实现 node 版本的自动切换
- 🍁 小程序框架： [uni-app](https://uniapp.dcloud.io/)
- 🍄 构建工具： [Vite](https://vitejs.dev/)
- 🌼 前端框架： [Vue3.x](https://v3.cn.vuejs.org/)
- 🍏 编程语言： [TypeScript](https://www.typescriptlang.org/)
- 🍎 代码规范：
  - [ESLint](https://eslint.org/)
  - [Prettier](https://prettier.io/)
  - [Stylelint](https://stylelint.io/)
- 🍔 提交规范：
  - [husky](https://typicode.github.io/husky/#/)
  - [lint-staged](https://www.npmjs.com/package/lint-staged)
  - [commitlint](https://commitlint.js.org/#/)
- 🍦 css 原子化： [unocss](https://github.com/unocss/unocss)
- 🍆 css 预处理器： [scss](https://sass-lang.com/)
- 🌭 状态管理工具：[pinia](https://pinia.vuejs.org/)
- 🍟 pinia 数据持久化插件：[pinia-plugin-persist-uni](https://allen-1998.github.io/pinia-plugin-persist-uni/)
- 🍜 vite 插件：
  - [pinia-auto-refs](https://github.com/Allen-1998/pinia-auto-refs)
  - [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import)
  - [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)
  - [unocss](https://github.com/unocss/unocss)
  - [auto-import-types](https://github.com/Allen-1998/auto-import-types)

## 快速开始

- 克隆项目

```shell
git clone xxxxxx
```

- 执行安装依赖

```shell
pnpm install
```

- 执行启动项目

```shell
pnpm run dev:mp-weixin
```

- 打开微信开发者工具，导入项目，选择项目目录下的 `dist/dev/mp-weixin` 文件夹

## 新建页面

- 在`pages`目录下新建页面文件夹，例如：`pages/home`
- 在`pages.json`中配置页面信息，例如：

```json
{
  "pages": [
    {
      "path": "pages/home/index",
      "style": {
        "navigationBarTitleText": "首页"
      }
    }
  ]
}
```

## git提交规范

- 需要使用 `pnpm cz` 执行，按照描述书写即可

## UI 库

- uni-ui 自动化引入,直接复制自己想要的组件即可
- ui颜色修改在`src/uni.scss`中修改,需要重启重启才能生效，位置不可移动，uniapp会去读取固定路径
- 选择的原因是可以兼容多端,如果不需要兼容多端，可以使用其他ui库，例如：vant

## css处理

- 使用scss预处理器,正常vue文件中使用即可
- 使用unocss,可以直接在vue SFC模板中使用,以下两种使用方式，呈现结果相同，unocss的文档不太友好，可以参考[tailwindcss](https://www.tailwindcss.cn/docs/installation),unocss完全兼容tailwindcss/windcss的语法,**这三个库是近三年最好的css处理方式**

```vue
<temlate>
  <!-- 背景色会直接变 -->
  <view class="bg-red-500">red</view>
</temlate>
```

```vue
<temlate>
  <!-- 背景色会直接变 -->
  <view bg-red-500>red</view>
</temlate>
```

## icon

- 本来想用`Iconify`的,但是必要性没这么大，看后续项目需求吧，不如就用用`uni-ui`的图标库，如果不够用，用用图片, 实在有求在考虑再引入
- 不引入`Iconify`的原因
  - 目前主流使用的方式是自动化引入，但是uniapp静态扫描性能已经很差了，再加上`Iconify`的图标的话，会导致编译时间过长，开发体验实在是差😅

## 状态管理

- 使用pinia,使用方式和vuex一样，但是pinia是基于vue3的，vuex是基于vue2的，pinia的性能更好，使用方式更简单，不需要使用mapXXX，直接使用store即可
- 加入了数据持久化,适配H5和小程序,如下只要加上`persist`配置即可,H5默认是存储在`localStorage`中,如果需要存储在`sessionStorage`中，可以配置`storage`为`sessionStorage`

```typescript
export default defineStore({
  id: 'user',
  persist: {
    enabled: true
  },
  state: () => {
    return {
      userInfo: {
        token: 'token',
        user_id: 111
      }
    } as {
      userInfo: User.UserInfo;
    };
  },
  getters: {
    logged: (state) => {
      const { token, user_id } = state.userInfo;
      return !!(token && user_id);
    },
    token: (state) => {
      return state.userInfo.token;
    },
    userId: (state) => {
      return state.userInfo.user_id;
    }
  },
  actions: {
    setUserInfo(userInfo: User.UserInfo) {
      Object.assign(this.userInfo, userInfo);
    }
  }
});

```

- 这是`setup`的使用方式

```typescript
export default defineStore(
  'setup',
  () => {
    const name = ref<string>('allen');
    const token = ref<string>('token...');

    const fullName = computed(() => {
      return `${name.value} ttk`;
    });

    const updateName = (val: string) => {
      name.value = val;
    };
    return {
      name,
      token,
      fullName,
      updateName
    };
  },
  {
    persist: {
      enabled: true
    }
  }
);

```

- 写了一个hooks函数，可以直接使用pinia的store,useStore也不需要引，传入的参数是store的id

```typescript
const { name, fullName, updateName } = useStore('test');
```

## 小程序生命周期

- 按照uniapp的配置 根App是小程序的App.vue,其他页面是小程序的page.vue,所以小程序的生命周期是按照uniapp的配置来的，可以参考[uniapp生命周期](https://uniapp.dcloud.net.cn/tutorial/page.html)

```vue
<script setup lang="ts">
onLaunch(() => {
  console.log('App Launch');
});
onShow(() => {
  console.log('App Show');
});
onHide(() => {
  console.log('App Hide');
});
</script>

```

## 页面生命周期

- 不近有vue3的一些生命周期函数，还有一些uniapp的生命周期函数，可以参考[uniapp生命周期](https://uniapp.dcloud.net.cn/tutorial/page.html)

```vue
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

```

## 页面跳转

- 使用uniapp的跳转方式，可以参考[uniapp跳转](https://uniapp.dcloud.net.cn/api/router?id=navigateto)

```typescript
//在起始页面跳转到test.vue页面并传递参数
uni.navigateTo({
  url: 'test?id=1&name=uniapp'
});
```

- 捕获参数的hooks

```typescript
//在起始页面跳转到test.vue页面并传递参数
onLoad(() => {
  const { pageName, pagePath, pageQuery } = useInit();
  console.log(pageName, pagePath, pageQuery, 'pageName,pagePath, pageQuery');
});
```

## 请求

- 需要在`src/api`目录下新建文件，例如：`src/api/user.ts`

```typescript
import http from '@/utils/request';

const apiTest = {
  getTest: (params: GetTest.params) => http.get<GetTest.data>('/test', params),
  postTest: (params: PostTest.params) =>
    http.post<PostTest.data>('/test', params)
};

export default apiTest;

```

- 需要配置一个`typescript`出参入参的类型定义文件，例如：`src/@types/api.d.ts`

```typescript
declare namespace GetTest {
  interface params {
    a: number
  }
  interface data {
    name: string
    age: number
  }
}

declare namespace PostTest {
  interface params {
    a: number
  }
  interface data {
    val: string
  }
}
```

- BaseUrl 在.env环境文件中

## 工程目录

```shell
.
├── .husky
│   ├── _
│   ├── commit-msg commit信息校验钩子
│   ├── pre-commit commit前置钩子
├── .vscode
│   ├── extensions.json vscode工作区插件推荐
│   ├── settings.json vscode工作区设置
├── auto
│   ├── addPage.ts 根据pages.json自动生成页面
├── src
│   ├── @types ts类型定义
│   ├── api 请求中心
│   ├── components 项目组件
│   ├── config 全局配置
│   ├── @helper storeToRefs 增强(pinia-auto-refs自动生成)
│   ├── hooks hooks函数
│   ├── pages 页面目录
│   ├── static 静态资源、css
│   ├── store 状态管理
│   └── utils 工具包
│      ├── platform.ts 获取运行环境
│      ├── request.ts 请求方法封装
│      ├── router.ts 路由跳转封装
│      ├── shared.ts 基础公共方法
│      ├── uniAsync.ts async调用异步方法
│      └── urlMap.ts 获取页面类型
│   ├── App.vue 入口文件
│   ├── auto-imports.d.ts 自动导入vue-composition-api(unplugin-auto-import自动生成)
│   ├── components.d.ts 自动导入组件(unplugin-vue-components自动生成)
│   ├── env.d.ts 全局声明
│   ├── main.ts 主入口
│   ├── manifest.json 应用配置文件
│   ├── pages.json 全局配置文件
│   └── uni.scss uni-app内置的常用样式变量
├── .cz-config.js cz提交信息提示配置
├── .czrc cz规则配置
├── .editorconfig 编辑器配置
├── .eslintignore eslint忽略配置
├── .eslintrc-auto-import-types.json 自动挂载@types下.d.ts文件定义的类型到global(auto-import-types自动生成)
├── .eslintrc-auto-import.json 自动挂载 unplugin-auto-import 的类型到global(unplugin-auto-import自动生成)
├── .eslintrc.js eslint配置
├── .gitignore git忽略配置
├── .lintstagedrc.json lint-staged配置
├── .npmrc npm配置
├── .prettierignore prettier忽略配置
├── .stylelintrc.js stylelint配置
├── commitlint.config.js commitlint配置
├── FAQ.md
├── index.html 项目入口
├── LICENSE MIT说明
├── package-lock.json
├── package.json
├── prettier.config.js prettier配置
├── README.md
├── TODO.md
├── tsconfig.json ts配置
├── unocss.config.ts unocss配置
└── vite.config.ts vite配置
```
