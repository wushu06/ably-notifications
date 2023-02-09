/**
 * Rollup is a package bundler built with simplicity in mind. It is also very extensible through some available plugins that will give you extra functionality.
 * Documentation link: https://rollupjs.org/guide/en/#big-list-of-options 
 */


// The TypeScript plugin will help us transpile our TypeScript code down to ES5 JavaScript.
import typescript from 'rollup-plugin-typescript2'

// Next, we imported our package.json file as a module so that we can use some properties from it further down in our config.
import pkg from './package.json'

export default {
    // tells Rollup which file is the root file (think of it as the parent of all the other files)
    input: 'src/index.tsx',

    // tells Rollup where to bundle your file to and in what format
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        exports: 'named',
        sourcemap: true,
        strict: false
      }
    ],

    // tells Rollup which plugins we want to use along with the configuration for each one
    plugins: [
      typescript({ objectHashIgnoreUnknownHack: true })
    ],

    // tells Rollup which modules being used by the package should be supplied by the host environment (wherever it’s being used)
    external: ['react', 'react-dom']
  }