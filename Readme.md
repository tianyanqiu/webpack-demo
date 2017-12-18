# Webpack基础入门

> Webpack 是一个前端资源加载/打包工具。它将根据模块的依赖关系进行静态分析，然后将这些模块按照指定的规则生成对应的静态资源

## 安装Webpack

在安装Webpack之前，本地环境必须支持node.js.

## 创建项目

首先我们创建一个目录，初始化npm,以及在本地安装webpack:
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
  var element = document.createElement('div');

  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

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

## 创建一个bundle文件

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
现在，由于通过打包来合成脚本，我们必须更新 index.html 文件。因为现在是通过 import引入lodash，所以将lodash`<script>`删除，然后修改另一个`<script>`标签来加载bundle，而不是原始的`/src`文件：

`dist/index.html`

```html
<html>
   <head>
     <title>Getting Started</title>
-    <script src="https://unpkg.com/lodash@4.16.6"></script>
   </head>
   <body>
-    <script src="./src/index.js"></script>
+    <script src="bundle.js"></script>
   </body>
  </html>
```

在这个设置中，index.js 显式要求引入的 lodash 必须存在，然后将它绑定为 _（没有全局作用域污染）。通过声明模块所需的依赖，webpack 能够利用这些信息去构建依赖图，然后使用图生成一个优化过的，会以正确顺序执行的 bundle。

可以这样说，执行 webpack，会将我们的脚本作为入口起点，然后输出为 `bundle.js`。

```shell
    ./node_modules/.bin/webpack src/index.js dist/bundle.js
```
在浏览器中打开`index.html`,如果一切访问都正常，你应该能看到以下文本：`Hello webpack`

或者是在项目中添加webpack.config.js文件：
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

### 加载CSS

```shell
  npm install --save-dev style-loader css-loader
```

在`webpack.config.js`文件中添加配置：

```js
  module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
  }

```
> webpack 根据正则表达式，来确定应该查找哪些文件，并将其提供给指定的 loader。在这种情况下，以 .css 结尾的全部文件，都将被提供给 style-loader 和 css-loader。



