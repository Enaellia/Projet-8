const purgecss = require('@fullhuman/postcss-purgecss').default;

module.exports = {
  plugins: [
    purgecss({
      content: ['./*.html'],
      safelist: [
        /^col/,           // préserve toutes les classes col-*, col-sm-*, etc.
        /^row/,           // .row
        /^container/,     // .container, .container-fluid
        /^modal/,         // .modal, .modal-content...
        /^btn/,           // .btn, .btn-primary...
        /^show/,          // pour les modales ouvertes dynamiquement
        /^collapse/,      // pour les menus déroulants
        /^navbar/,        // si tu utilises une navbar
        /^alert/,         // si tu as des messages d'alerte
      ]
    })
  ]
}