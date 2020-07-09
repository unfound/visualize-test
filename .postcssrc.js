// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
    "plugins": {
      // postcss-import和postcss-url可以解决@import()的问题
      // https://github.com/postcss/postcss-import#readme
      "postcss-import": {},
      "postcss-url": {},
      // to edit target browsers: use "browserslist" field in package.json
      "autoprefixer": {}
    }
  }