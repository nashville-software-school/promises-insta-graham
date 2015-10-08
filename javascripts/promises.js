requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../lib/bower_components/jquery/dist/jquery.min',
    'lodash': '../lib/bower_components/lodash/lodash.min',
    'hbs': '../lib/bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../lib/bower_components/bootstrap/dist/js/bootstrap.min',
    'q':'../lib/bower_components/q/q'
  },
  shim: {
    'bootstrap': ['jquery']
  }
});

requirejs(
  ["jquery", "hbs", "bootstrap", "get-books", "get-booktypes", "q"],
  function($, Handlebars, bootstrap, getBooks, getBookTypes, Q) {

    var bookTypes;

    getBookTypes.getTypes()
    .then(function(typesAjax){
      bookTypes = typesAjax;
      return getBooks.getBooks();
    })
    .then(function(booksAjax){
      bookTypes = Object.keys( bookTypes ).map(key => bookTypes[ key ]);
      booksAjax = Object.keys( booksAjax ).map(key => booksAjax[ key ]);

      console.log(bookTypes);

      booksAjax = booksAjax.map(book => {
        book.type = _.find(bookTypes, { id:book.booktype }).label;
        return book;
      });

      require(['hbs!../templates/menu-types'], function(menuTpl) {
        $("#typeList").html(menuTpl({ bookstypes:bookTypes }));
      });

      require(['hbs!../templates/books'], function(bookTpl) {
        $("#bookList").html(bookTpl({ books:booksAjax }));
      });

    }).done();



  }
);
