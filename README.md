<p align="center">
  <a href="http://gulpjs.com">
    <img height="257" width="114" src="https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png">
  </a>
</p>

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

Made by https://twitter.com/svdb.