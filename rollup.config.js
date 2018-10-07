import css from 'rollup-plugin-css-only';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default {
	input: 'client/index.js',	
	output: {
		sourcemap: false,	
		format: 'iife',
		name: 'app',
		file: 'public/bundle.js'
	},
	plugins: [
		css({ output: 'public/bundle.css' }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration —
		// consult the documentation for details:
		// https://github.com/rollup/rollup-plugin-commonjs
		resolve(),
		commonjs(),

		// If we're building for production (npm run build
		// instead of npm run dev), transpile and minify
		babel({
			babelrc: false,
			presets: [['@babel/preset-env', { modules: false }]],
		}),
		terser()
	]
};