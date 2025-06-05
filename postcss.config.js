const purgecss = require('@fullhuman/postcss-purgecss').default;

module.exports = {
  plugins: [
    purgecss({
      content: ['./*.html', './**/*.js'],
      safelist: {
        standard: [
          /^container/,   // .container, .container-fluid
          /^row/,         // .row
          /^col/,         // .col-*, .col-sm-*, etc.
          /^img/,         // .img-fluid
          /^mb-/, /^mt-/, /^ml-/, /^mr-/, /^p[trblxy]-/, // marges & paddings
          /^nav/,         // .nav, .nav-link, .nav-pills
          /^modal/,       // .modal-*, pour lightbox
          /^show/,        // .show utilisé pour modale visible
          /^active/,      // .active pour boutons ou tags actifs
          /^d-/,          // .d-flex, .d-none, etc.
        ]
      }
    })
  ]
}