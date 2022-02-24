'use strict';

// ==================================
//
// Load modules.
//
// ==================================

var browserSync = require('browser-sync');
var config = require('../config.js');
var handleErrors = require('../util/handleErrors.js');
var gulp = require('gulp');
var watch = require('gulp-watch');


// ==================================
//
// browserSync
//
// ==================================

gulp.task('browserSync', function () {
	browserSync(config.browserSync);
});
