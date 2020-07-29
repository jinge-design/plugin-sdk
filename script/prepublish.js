/**
 * 发布到 npm 前要求必须是在 master 分支下。
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const branch = execSync('git branch --show-current').toString('utf-8');
if (branch.trim() !== 'master') {
  console.error('must publish under master branch');
  process.exit(-1);
}

/**
 * 发布到 npm 上的包，必须保证 src/core/rpc.ts 中发送消息
 * 的 targetOrigin 是 https://jinge.design，这样可以杜绝
 * 插件被其它页面使用。
 * 
 * 但考虑到本地研发环境，这个 origin 可以是一些本地 url，因此
 * 本地研发环境会切换到其它分支（比如 dev-local），修改
 * 这个 origin 后在本地构建一个版本，然后通过软连接文件夹的形式
 * 将 sdk 添加到 node_modules 中。
 * 
 * 为了防止误将本地研发的代码发布到 npm，采用了在 npm scripts 的
 * prepublishOnly 中使用本脚本校验。
 */
const cnt = fs.readFileSync(path.resolve(__dirname, '../src/core/rpc.ts'), 'utf-8');
if (cnt.indexOf('const JINGE_DESIGN_ORIGIN = \'https://jinge.design\';') < 0) {
  console.error('jinge design origin in "src/core/rpc.ts" must be: https://jinge.design');
  process.exit(-1);
}