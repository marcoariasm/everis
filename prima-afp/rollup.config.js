import babel from '@rollup/plugin-babel';
import del from 'rollup-plugin-delete';
import postcss from "rollup-plugin-postcss";
import resolve from 'rollup-plugin-node-resolve';
import image from '@rollup/plugin-image';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

const extensions = ['.js', '.jsx'];
export default [
  {
    input: {
      PrimaWebTransactionalApp:'src/PrimaWebTransactionalApp.jsx'
    },
    output: [
      {
        dir: 'module',
        format: 'es',
      } 
    ],
    experimentalCodeSplitting: true,
    plugins: [
      peerDepsExternal(),
      del({ targets: ['module/*'] }),
      resolve({
          extensions
      }),
      image(),
      postcss(),
      babel({
        exclude: 'node_modules/**',
        plugins: ["babel-plugin-styled-components"],
        presets: ["@babel/preset-env", "@babel/preset-react"],
      }),
    ],
    global:{
      'styled-components':'styled',
      'classnames': 'classNames',
      'prop-types':'PropTypes'
    }
  }
];
