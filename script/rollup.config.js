import pkg from '../package.json';
import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';

const isProd = 'PROD' in process.env;
export default {
  input: './lib/index.js',
  output: {
    name: 'JingeDesign',
    format: 'umd',
    file: `./dist/jinge-plugin${isProd ? '.min' : ''}.js`,
    banner: isProd ? `/**
 * @description plugin sdk for https://jinge.design
 * @version: ${pkg.version}
 * @author: [Yuhang Ge](https://github.com/YuhangGe)
 */` : ''
  },
 
  plugins: isProd ? [resolve(), terser({
    output: {
      comments: /@(description|version|author)/
    }
  })] : [resolve()]
};