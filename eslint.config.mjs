import { defineConfig } from 'eslint/config';

const navegador = {
  Audio: 'readonly',
  AudioContext: 'readonly',
  Blob: 'readonly',
  CanvasRenderingContext2D: 'readonly',
  CSS: 'readonly',
  CSSKeyframesRule: 'readonly',
  CustomEvent: 'readonly',
  DOMException: 'readonly',
  Document: 'readonly',
  Element: 'readonly',
  Event: 'readonly',
  FileReader: 'readonly',
  HTMLCanvasElement: 'readonly',
  HTMLElement: 'readonly',
  Image: 'readonly',
  IntersectionObserver: 'readonly',
  KeyboardEvent: 'readonly',
  MutationObserver: 'readonly',
  MouseEvent: 'readonly',
  Node: 'readonly',
  Notification: 'readonly',
  PerformanceObserver: 'readonly',
  Promise: 'readonly',
  ResizeObserver: 'readonly',
  SpeechSynthesisUtterance: 'readonly',
  URL: 'readonly',
  URLSearchParams: 'readonly',
  WebSocket: 'readonly',
  Window: 'readonly',
  Worker: 'readonly',
  cancelAnimationFrame: 'readonly',
  clearInterval: 'readonly',
  clearTimeout: 'readonly',
  crypto: 'readonly',
  document: 'readonly',
  fetch: 'readonly',
  getComputedStyle: 'readonly',
  indexedDB: 'readonly',
  localStorage: 'readonly',
  location: 'readonly',
  matchMedia: 'readonly',
  navigator: 'readonly',
  performance: 'readonly',
  queueMicrotask: 'readonly',
  requestAnimationFrame: 'readonly',
  screen: 'readonly',
  sessionStorage: 'readonly',
  setInterval: 'readonly',
  setTimeout: 'readonly',
  speechSynthesis: 'readonly',
  webkitAudioContext: 'readonly',
  window: 'readonly'
};

const reglasComunes = {
  'array-callback-return': 'error',
  'constructor-super': 'error',
  'eqeqeq': ['error', 'smart'],
  'for-direction': 'error',
  'getter-return': 'error',
  'no-async-promise-executor': 'error',
  'no-case-declarations': 'error',
  'no-class-assign': 'error',
  'no-compare-neg-zero': 'error',
  'no-cond-assign': ['error', 'except-parens'],
  'no-constant-binary-expression': 'error',
  'no-constant-condition': ['error', { checkLoops: false }],
  'no-control-regex': 'error',
  'no-debugger': 'error',
  'no-dupe-args': 'error',
  'no-dupe-class-members': 'error',
  'no-dupe-else-if': 'error',
  'no-dupe-keys': 'error',
  'no-duplicate-case': 'error',
  'no-empty-character-class': 'error',
  'no-empty-pattern': 'error',
  'no-eval': 'error',
  'no-ex-assign': 'error',
  'no-extra-boolean-cast': 'error',
  'no-fallthrough': ['error', { commentPattern: 'continua|sigue|fallthrough' }],
  'no-func-assign': 'error',
  'no-implied-eval': 'error',
  'no-import-assign': 'error',
  'no-irregular-whitespace': ['error', {
    skipComments: true,
    skipJSXText: true,
    skipRegExps: true,
    skipStrings: true,
    skipTemplates: true
  }],
  'no-loss-of-precision': 'error',
  'no-misleading-character-class': 'error',
  'no-new-native-nonconstructor': 'error',
  'no-new-wrappers': 'error',
  'no-obj-calls': 'error',
  'no-promise-executor-return': 'error',
  'no-self-assign': 'error',
  'no-setter-return': 'error',
  'no-shadow-restricted-names': 'error',
  'no-sparse-arrays': 'error',
  'no-throw-literal': 'error',
  'no-unexpected-multiline': 'error',
  'no-unreachable': 'error',
  'no-unreachable-loop': 'error',
  'no-unsafe-finally': 'error',
  'no-unsafe-negation': 'error',
  'no-unsafe-optional-chaining': 'error',
  'no-unused-labels': 'error',
  'no-useless-backreference': 'error',
  'no-useless-catch': 'error',
  'no-useless-escape': 'error',
  'no-with': 'error',
  'require-yield': 'error',
  'use-isnan': 'error',
  'valid-typeof': ['error', { requireStringLiterals: true }]
};

export default defineConfig([
  {
    ignores: ['.claude/**', 'dist/**', 'node_modules/**']
  },
  {
    files: ['src/**/*.js', 'pruebas/**/*.js'],
    languageOptions: {
      ecmaVersion: 2017,
      sourceType: 'script',
      globals: navegador
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'error'
    },
    rules: {
      ...reglasComunes,
      'no-undef': ['error', { typeof: true }],
      'no-unused-vars': ['warn', {
        args: 'none',
        caughtErrors: 'none',
        vars: 'all'
      }]
    }
  },
  {
    files: ['pruebas/**/*.js'],
    languageOptions: {
      globals: {
        CB: 'readonly',
        __MODO_MINIFICADO__: 'readonly'
      }
    }
  },
  {
    files: ['src/**/*.js'],
    rules: {
      complexity: ['error', 32],
      'max-depth': ['error', 5],
      'max-lines-per-function': ['error', {
        max: 120,
        skipBlankLines: true,
        skipComments: true
      }],
      'max-nested-callbacks': ['error', 4],
      'max-params': ['error', 7],
      'max-statements': ['error', 75],
      'no-empty': ['error', { allowEmptyCatch: true }]
    }
  },
  {
    files: ['**/*.mjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        Buffer: 'readonly',
        console: 'readonly',
        fetch: 'readonly',
        process: 'readonly',
        setTimeout: 'readonly',
        WebSocket: 'readonly'
      }
    },
    rules: {
      ...reglasComunes,
      'no-undef': ['error', { typeof: true }],
      'no-unused-vars': ['error', { args: 'none', caughtErrors: 'none' }]
    }
  },
  {
    files: ['gulpfile.js', '*.config.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: {
        Buffer: 'readonly',
        __dirname: 'readonly',
        console: 'readonly',
        module: 'writable',
        process: 'readonly',
        require: 'readonly',
        setTimeout: 'readonly'
      }
    },
    rules: {
      ...reglasComunes,
      'no-undef': ['error', { typeof: true }],
      'no-unused-vars': ['error', { args: 'none', caughtErrors: 'none' }]
    }
  },
  {
    files: ['src/sw.plantilla.js', 'src/js/45-offline.js'],
    languageOptions: {
      globals: {
        __PRECACHE__: 'readonly',
        caches: 'readonly',
        Response: 'readonly',
        self: 'readonly'
      }
    }
  }
]);
