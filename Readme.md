# Webpack 基础入门

> Webpack 是一个前端资源加载/打包工具。它将根据模块的依赖关系进行静态分析，然后将这些模块按照指定的规则生成对应的静态资源

## 安装 Webpack

在安装 Webpack 之前，本地环境必须支持 node.js.

## 创建项目

首先我们创建一个目录，初始化 npm,以及在本地安装 webpack:

```shell
mkdir webpack-demo && cd webpack-demo
npm init -y
npm install --save-dev webpack
```

现在我们将创建以下目录结构和内容：
`project`

```jsx
   webpack-demo
  |- package.json
+ |- index.html
+ |- /src
+ |- index.js
```

`src/index.js`

```javascript
function component() {
  var element = document.createElement("div");

  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  element.innerHTML = _.join(["Hello", "webpack"], " ");

  return element;
}

document.body.appendChild(component());
```

`index.html`

```html
<html>
  <head>
    <title>Getting Started</title>
    <script src="https://unpkg.com/lodash@4.16.6"></script>
  </head>
  <body>
    <script src="./src/index.js"></script>
  </body>
</html>
```

## 创建一个 bundle 文件

首先，我们稍微调整下目录结构，将“源”代码(/src)从我们的“分发”代码(/dist)中分离出来。“源”代码是用于书写和编辑的代码。“分发”代码是构建过程产生的代码最小化和优化后的“输出”目录，最终将在浏览器中加载：

```shell
  webpack-demo
  |- package.json
+ |- /dist
+   |- index.html
- |- index.html
  |- /src
    |- index.js
```

要在 index.js 中打包 lodash 依赖，我们需要在本地安装 library。

`npm install --save lodash`

然后在我们的脚本中 import。

`src/index.js`

```js
+ import _ from 'lodash';
+
  function component() {
    var element = document.createElement('div');

-   // Lodash, currently included via a script, is required for this line to work
+   // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
  }

  document.body.appendChild(component());
```

现在，由于通过打包来合成脚本，我们必须更新 index.html 文件。因为现在是通过 import 引入 lodash，所以将 lodash`<script>`删除，然后修改另一个`<script>`标签来加载 bundle，而不是原始的`/src`文件：

`dist/index.html`

```html
<html>
  <head>
    <title>Getting Started</title>
    -
    <script src="https://unpkg.com/lodash@4.16.6"></script>
  </head>
  <body>
    -
    <script src="./src/index.js"></script>
    +
    <script src="bundle.js"></script>
  </body>
</html>
```

在这个设置中，index.js 显式要求引入的 lodash 必须存在，然后将它绑定为 \_（没有全局作用域污染）。通过声明模块所需的依赖，webpack 能够利用这些信息去构建依赖图，然后使用图生成一个优化过的，会以正确顺序执行的 bundle。

可以这样说，执行 webpack，会将我们的脚本作为入口起点，然后输出为 `bundle.js`。

```shell
    ./node_modules/.bin/webpack src/index.js dist/bundle.js
```

在浏览器中打开`index.html`,如果一切访问都正常，你应该能看到以下文本：`Hello webpack`

或者是在项目中添加 webpack.config.js 文件：

```shell
    ./node_modules/.bin/webpack --config webpack.config.js
```

考虑到用 CLI 这种方式来运行本地的 webpack 不是特别方便，我们可以设置一个快捷方式。在 package.json 添加一个 npm 脚本(npm script)：

```node.js
    {
  ...
  "scripts": {
    "build": "webpack"
  },
  ...
}
```

## 管理资源

### 加载 CSS

```shell
  npm install --save-dev style-loader css-loader
```

在`webpack.config.js`文件中添加配置：

```js
module: {
  rules: [
    {
      test: /\.css$/,
      use: ["style-loader", "css-loader"],
    },
  ];
}
```

> webpack 根据正则表达式，来确定应该查找哪些文件，并将其提供给指定的 loader。在这种情况下，以 .css 结尾的全部文件，都将被提供给 style-loader 和 css-loader。

### 加载图片

我们可以使用`file-loader`，我们可以轻松的将这些内容混合到 css 中：

```shell
yarn add file-loader
```

`file-loader`不仅支持加载图片，还支持加载字体和文件。

## loader

`loader`特性:

- loader 支持链式传递。能够对资源使用流水线(pipeline)。一组链式的 loader 将按照相反的顺序执行。loader 链中的第一个 loader 返回值给下一个 loader。在最后一个 loader，返回 webpack 所预期的 JavaScript。
- loader 可以是同步的，也可以是异步的。
- loader 运行在 Node.js 中，并且能够执行任何可能的操作。
- loader 接收查询参数。用于对 loader 传递配置。
- loader 也能够使用 options 对象进行配置。
- 除了使用 package.json 常见的 main 属性，还可以将普通的 npm 模块导出为 loader，做法是在 package.json 里定义一个 loader 字段。
- 插件(plugin)可以为 loader 带来更多特性。
- loader 能够产生额外的任意文件。

## 模块热替换

模块热替换(HMR - Hot Module Replacement)功能会在应用程序运行过程中替换、添加或删除模块，而无需重新加载整个页面。主要是通过以下几种方式，来显著加快开发速度：

- 保留在完全重新加载页面时丢失的应用程序状态。
- 只更新变更内容，以节省宝贵的开发时间。
- 调整样式更加快速 - 几乎相当于在浏览器调试器中更改样式。

### HMR 的工作原理

#### 在应用程序中

1. 应用程序代码要求 HMR runtime 检查更新
2. HMR runtime(异步) 下载更新，然后通知应用程序
3. 应用程序代码要求 HMR runtime 应用更新
4. HMR runtime(同步)应用更新
   可以设置 HMR，以使此进程自动触发更新，或者你可以选择要求在用户交互时进行更新。
