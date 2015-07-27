var gulp        = require('gulp');
var browserSync = require('browser-sync');       // refresh browser
var del         = require('del');                // delete files
var rename      = require('gulp-rename');        // rename files
var concat      = require('gulp-concat');        // concat files
var changed     = require('gulp-changed');       // changed files
var imagemin    = require('gulp-imagemin');      // minify images
var pngquant    = require('imagemin-pngquant');  // minify PNG
var uglify      = require('gulp-uglify');        // minify JS
var minifycss   = require('gulp-minify-css');    // minify CSS
var minifyhtml  = require('gulp-htmlmin');       // minify HTML
var stylus      = require('gulp-stylus');        // stylus
var jade        = require('gulp-jade');          // Jade templates

// path configuration --------------------------------------------------------

var paths =
{
    source:
    {
        root     : './source/*',                 // paths.source.root
        fonts    : './source/fonts/*',           // paths.source.fonts
        images   : './source/images/*',          // paths.source.images
        scripts  : './source/scripts/*',         // paths.source.scripts
        styles   : './source/styles/*'           // paths.source.styles
    },
    public:
    {
        root     : './public/',                  // paths.public.root
        fonts    : './public/fonts/',            // paths.public.fonts
        images   : './public/images/',           // paths.public.images
        scripts  : './public/scripts/',          // paths.public.scripts
        styles   : './public/styles/'            // paths.public.styles
    }
};

// options configuration -----------------------------------------------------

var config =
{
    // browsersync -----------------------------------------------------------
    // http://www.browsersync.io/docs/options/
    browsersync:                                 // config.browsersync
    {
        ui:                                      // bool, access interface
        {
            port                : 8080           // interface port
        },
        files                   : paths.source.root + '*/*', // files to watch
        watchOptions:                            // watch options for gaze
        {
            interval            : 500,           // fs.watchFile interval (ms)
            debounceDelay       : 500,           // event delay (ms)
            mode: 'auto'                         // auto, watch, poll
        },
        server:                                  // static server
        {
            baseDir             : paths.public.root, // serve files from here
            directory           : false          // directory listing
        },
        port                    : 8888,          // server port
        https                   : false,         // static HTTPS
        ghostMode:                               // mirror inputs
        {
            clicks              : true,          // mouse clicks
            forms               : true,          // form interactions
            scroll              : true           // scroll events
        },
        logLevel                : 'info',        // info, debug, warn, silent
        logPrefix               : '',            // console logging prefix
        logConnections          : true,          // display connected browsers
        logFileChanges          : true,          // display info about changes
        logSnippet              : true,          // log the snippet to console
        tunnel                  : true,          // bool/localtunnel.me prefix
        online                  : undefined,     // bool to check connectivity
        open                    : false,         // bool, external, tunnel
        browser                 : 'google chrome', // array of browsers
        reloadOnRestart         : true,          // reload each browser upon restart
        notify                  : false,         // bubble notifications
        scrollProportionally    : true,          // sync viewport to top
        scrollThrottle          : 0,             // scroll event interval (ms)
        reloadDelay             : 0,             // pause before reload (ms)
        injectChanges           : true,          // inject CSS changes/refresh
        startPath               : null,          // path to open browser at
        minify                  : false,         // minify client side JS
        host                    : null,          // host override (string IP)
        codeSync                : true,          // change events to browsers
        timestamps              : true           // append timestamps to files
    },
    // minifycss -------------------------------------------------------------
    // https://github.com/jonathanepollack/gulp-minify-css
    minifycss:                                   // config.minifycss
    {
        advanced                : true,          // advanced optimizations
        aggressiveMerging       : true,          // aggressive merging of properties
        benchmark               : false,         // time spent cleaning up
        compatibility           : false,         // compatibility mode
        debug                   : false,         // minification statistics
        inliner                 : false,         // @import inliner hash
        keepBreaks              : false,         // keep line breaks
        keepSpecialComments     : false,         // * all, 1 first, 0 none
        processImport           : false,         // process @import rules
        rebase                  : false,         // URL rebasing
        relativeTo              : null,          // abs @import rules path
        restructuring           : false,         // adv optimizations
        root                    : null,          // rel @import rules path
        roundingPrecision       : 2,             // default 2, disable -1
        shorthandCompacting     : true,          // shorthand compacting
        sourceMap               : false,         // exposes source map
        sourceMapInlineSources  : false,         // source map inline sources
        target                  : null           // rebase path
    },
    // imagemin --------------------------------------------------------------
    // https://github.com/sindresorhus/gulp-imagemin
    imagemin:                                    // config.imagemin
    {
        optimizationLevel       : 3,             // for PNG files
        progressive             : true,          // for JPG files
        interlaced              : false,         // for GIF files
        multipass               : false,         // for SVG files
        svgoPlugins: [{removeViewBox: false}],   // svgo plugins
        use: [pngquant()]                        // additional plugins
    },
    // stylus ----------------------------------------------------------------
    // https://github.com/stevelacy/gulp-stylus
    stylus:                                      // config.stylus
    {},
    // jade ------------------------------------------------------------------
    // http://jade-lang.com/api/
    jade:
    {
        pretty                  : true
    },
    // uglify ----------------------------------------------------------------
    // https://github.com/terinjokes/gulp-uglify
    uglify:
    {
        preserveComments               : 'all'  // some, all, function()
    },
    // minifyhtml ------------------------------------------------------------
    // https://github.com/kangax/html-minifier
    minifyhtml:
    {
        removeComments                 : false,  // remove comments
        removeCommentsFromCDATA        : false,  // comments (scripts/styles)
        removeCDATASectionsFromCDATA   : false,  // CDATA (scripts/styles)
        collapseWhitespace             : true,   // remove white space
        conservativeCollapse           : false,  // white space -> 1 space
        preserveLineBreaks             : false,  // white space -> 1 line
        collapseBooleanAttributes      : false,  // remove bools attrib values
        removeAttributeQuotes          : false,  // remove attribs quotes
        removeRedundantAttributes      : false,  // remove default's attribs
        preventAttributesEscaping      : false,  // no attrib values escaping
        useShortDoctype                : true,   // doctype -> HTML5 doctype
        removeEmptyAttributes          : false,  // remove whitespace attribs
        removeScriptTypeAttributes     : false,  // remove script type attrib
        removeStyleLinkTypeAttributes  : false,  // remove style type attrib
        removeOptionalTags             : false,  // remove unrequired tags
        removeIgnored                  : false,  // remove <%, %>, <?, ?>
        removeEmptyElements            : false,  // remove empty elements
        lint                           : false,  // toggle linting
        keepClosingSlash               : false,  // keep trailing slash on singleton elems
        caseSensitive                  : false,  // case sensitive attribs
        minifyJS                       : false,  // UglifyJS minification
        minifyCSS                      : false,  // clean-css minification
        minifyURLs                     : false,  // URL minification
        ignoreCustomComments           : [],     // ignore comments (regex)
        processScripts                 : [],     // script type minification
        maxLineLength                  : undefined // maximum line length
    }
};

// individual tasks -----------------------------------------------------------

gulp.task('stylus', function() {
    return gulp.src(paths.source.styles)
        .pipe(changed(paths.public.styles))
        .pipe(stylus(config.stylus))
        .pipe(gulp.dest(paths.public.styles))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('scripts', function() {
    return gulp.src(paths.source.scripts)
        .pipe(changed(paths.public.styles))
        .pipe(gulp.dest(paths.public.scripts))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('uglify', function() {
    return gulp.src(paths.source.scripts)
        .pipe(changed(paths.public.styles))
        .pipe(concat('main.js'))
        .pipe(uglify(config.uglify))
        .pipe(gulp.dest(paths.public.scripts))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('minifycss', function() {
    return gulp.src(paths.public.styles + '*.css')
        .pipe(changed(paths.public.styles))
        .pipe(minifycss(config.minifycss))
        .pipe(gulp.dest(paths.public.styles))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('jade', function() {
    return gulp.src(paths.source.root + '*.jade')
        .pipe(changed(paths.public.root))
        .pipe(jade(config.jade))
        .pipe(gulp.dest(paths.public.root))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('minifyhtml', function() {
    return gulp.src(paths.public.root + '*.html')
        .pipe(changed(paths.public.root))
        .pipe(minifyhtml(config.minifyhtml))
        .pipe(gulp.dest(paths.public.root))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('imagemin', function() {
    return gulp.src(paths.source.images)
        .pipe(changed(paths.public.images))
        .pipe(imagemin(config.imagemin))
        .pipe(gulp.dest(paths.public.images))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('clean', function() {
    del(paths.public.root);
});

gulp.task('info', function() {
    console.log('');
    console.log('                  ,╥╦╓                                    ');
    console.log('                ╦╬╙` ╙╬           ,╬                      ');
    console.log('              ╓╬╨                 ╬²                      ');
    console.log('             ╔╬²    ╓╕           ╬╜                       ');
    console.log('            ╓╬*    ,╬²  ╬╛  ╔å  ╬╝   ╬╓≡╨╬╬               ');
    console.log('            ╬╬    ╔╬╝  ╬╜  ╔╬  ╠╝  ,╫╬^ ╔å .╦*            ');
    console.log('            ╬╬,╓╦╝╠╬  ╔╬,╓╝╠╕,╥╬,╦#╠å ┌╬▒╓#╙              ');
    console.log('             ╙╙^  ╬^   "^` ^"` "^`╦╬  `╙^`                ');
    console.log('                  ²              ╦╬                       ');
    console.log('                                -╝`                       ');
    console.log('╔════════════════════════════════════════════════════════╗');
    console.log('║                  Available commands:                   ║');
    console.log('╟────────────────────────────────────────────────────────╢');
    console.log('║             gulp           gulp minify                 ║');
    console.log('║             gulp clean     gulp minifycss              ║');
    console.log('║             gulp jade      gulp minifyhtml             ║');
    console.log('║             gulp stylus    gulp uglify                 ║');
    console.log('║             gulp scripts   gulp imagemin               ║');
    console.log('║             gulp serve                                 ║');
    console.log('╚════════════════════════════════════════════════════════╝');
    console.log('');
});

gulp.task('serve', function() {
    browserSync(config.browsersync);
    gulp.watch(paths.source.root, ['jade']);
    gulp.watch(paths.source.styles, ['stylus']);
});

// main tasks ----------------------------------------------------------------

gulp.task('minify', ['minifycss', 'minifyhtml', 'uglify', 'imagemin']);
gulp.task('default', ['info', 'clean', 'jade', 'stylus', 'scripts', 'serve']);