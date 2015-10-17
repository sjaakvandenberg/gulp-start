![Gulp](https://raw.githubusercontent.com/sjaakvandenberg/gulp-start/master/source/images/gulp.svg)

This is a Gulp template that includes ES6 support, Jade templating, Stylus
stylesheets, JS concatenation, JS, CSS, PNG, JPEG, GIF and SVG minification
and is served using Browsersync.

| Location                         | Description                      |
|:---------------------------------|:---------------------------------|
| `./source/templates/index.jade`  | Main template                    |
| `./source/styles/main.styl`      | Stylus file for styling          |
| `./source/styles/_fonts.styl`    | Font definitions                 |
| `./scripts/main.js`              | ES6 JavaScript                   |
| `./scripts/vendor/`              | Vendor scripts                   |
| `./scripts/images/`              | Images                           |
| `./scripts/fonts/`               | Woff & woff2 fonts               |

## Gulp

| Command                        | Description                      |
|:-------------------------------|:---------------------------------|
| `gulp clean`                   | Nuke the `./public` directory    |
| `gulp minify`                  | Minify assets                    |
| `gulp`                         | Generate and serve               |

For more information, see the comments in `gulpfile.js`.

Made by [https://twitter.com/svdb](@svdb).