/* jslint node: true */

'use strict'

const gulp = require('gulp')
let config = require('./example.config')

/**
 * Include Gulp plugins
 */
const $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*'],
  replaceString: /\bgulp[\-.]/
})
const fs = require('fs')
const moduleImporter = require('sass-module-importer')
const browserSync = require('browser-sync').create()
const del = require('del')

const development = $.environments.development

/**
 * If config.js exists, load that config for overriding certain values below.
 */
function loadConfig () {
  if (fs.existsSync(__dirname + '/./config.js')) {
    config = require('./config')
  }

  return config
}

loadConfig()

/**
 * CSS from all SCSS.
 */
function sass () {
  del([
    '../public/css/*.css',
    '../public/css/*.css.map',
  ], {force: true})

  return gulp.src('../static/scss/styles.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sassGlob())
    .pipe($.sass({
      importer: moduleImporter(),
      importOnce: {
        index: false,
        css: false,
        bower: false
      },
      indentedSyntax: true,
      noCache: false,
      lineNumbers: false,
      sourceMap: true,
      outputStyle: 'expanded',
      errLogToConsole: true,
    }))
    .pipe($.base64())
    .pipe($.autoprefixer(config.autoprefixerOptions))
    .pipe(development($.sourcemaps.write()))
    .pipe(gulp.dest('../public/css'))
  // .pipe($.notify({
  //   title: 'SASS Compiled',
  //   message: 'All SASS files have been recompiled to CSS.',
  //   onLast: true
  // }))
}

/**
 * Concat javascript.
 */
function compress () {
  del([
    '../public/js/*.js',
    '../public/js/*.js.map',
  ], {force: true})

  return gulp.src([
    'static/js/**/*.js',
    'components/_patterns/**/*.js',
    '!**/*.gemini.js'
  ], { cwd: '../' })
    .pipe($.sourcemaps.init())
    .pipe($.babel({
      presets: ['@babel/env']
    }))
    .pipe($.uglify())
    .on('error', function (error) {
      this.emit('end')
    })
    .pipe($.concat('scripts.js'))
    .pipe(development($.sourcemaps.write()))
    .pipe(gulp.dest('../public/js'))
  // .pipe($.notify({
  //   title: "JS Minified",
  //   message: "All JS files in the theme have been minified.",
  //   onLast: true
  // }))
}

/**
 * SVG files.
 */
function svg () {
  del([
    '../public/svg/*.svg',
  ], {force: true})

  return gulp.src('../static/svg/**/*.svg')
    .pipe($.svgSprite({
      shape: {
        id: {
          separator: '__',
        },
        dest: './',
      },
      svg: {
        xmlDeclaration: false,
        doctypeDeclaration: false,
      },
    }))
    .on('error', function (error) {
      this.emit('end')
    })
    .pipe(gulp.dest('../public/svg'))
  // .pipe($.notify({
  //   title: "Sprite Generated",
  //   message: "All SVG files have been optimized.",
  //   onLast: true
  // }))
}

/**
 * Style guide.
 */
function styleguide (done) {
  $.shell.task([
    'php core/console --generate'
  ], {cwd: '../'})
  done()
}

/**
 * Browser Sync.
 */
function browserSyncInit () {
  browserSync.init({
    proxy: config.browserSync.hostname,
    port: config.browserSync.port,
    open: config.browserSync.openAutomatically,
    reloadDelay: config.browserSync.reloadDelay,
    injectChanges: config.browserSync.injectChanges,
    online: config.browserSync.online,
    ui: config.browserSync.ui,
    snippetOptions: {
      blacklist: ['**/index.html', '**/patternlab/', '**/?p*'],
    }
  })
}

/**
 * Watcher task.
 */
function watcher () {
  // watch scss for changes
  gulp.watch(['../{static/scss,components/_patterns}/**/*.scss'], gulp.series(sass, styleguide))
    .on('change', browserSync.reload)

  // watch js for changes
  gulp.watch(['../{static/js,components/_patterns}/**/*.js'], gulp.series(compress, styleguide))
    .on('change', browserSync.reload)

  // watch svg for changes
  gulp.watch(['../{static/svg,components/_patterns}/**/*.svg'], gulp.series(svg, styleguide))
    .on('change', browserSync.reload)

  // watch twig&json for changes
  gulp.watch(['../components/**/*.{twig,json}'], gulp.series(styleguide))
    .on('change', browserSync.reload)

  // If user has specified an override
  if (!config.twig.useCache) {
    gulp.watch(['../templates/**/*.twig'])
      .on('change', browserSync.reload)
  }
}

const buildTasks = gulp.series(svg, sass, compress)
const defaultTasks = gulp.parallel(browserSyncInit, watcher)

gulp.task('styleguide', styleguide)
gulp.task('build', buildTasks)
gulp.task('default', defaultTasks)
