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
      // console.log(booksAjax);
      // console.log(bookTypes);

      bookTypes = Object.keys( bookTypes ).map(key => bookTypes[ key ]);
      booksAjax = Object.keys( booksAjax ).map(key => booksAjax[ key ]);

      // console.log("booksAjax", booksAjax);
      // console.log(bookTypes);

      booksAjax = booksAjax.map(book => {
        book.type = _.find(bookTypes, { id:book.booktype }).label;
        return book;
      });

      console.log(booksAjax);

      require(['hbs!../templates/books'], function(bookTpl) {
        $("#bookList").html(bookTpl({ books:booksAjax }));
      });

    }).done();

    /* Here's some pseudo-code for how it should look once you
       start using promises

    getBookTypes()
      .then(function(types) {
        getBooks(types);
      })
      .then(function(books) {
        // add the type key to each book that is currently
        // being performed in the get-books file

        // then bind the template to the data
        // (p.s. make the handlebar template a module dependency)
        require(['hbs!../templates/books'], function(bookTpl) {
          $("#bookList").html(bookTpl({ books:bookArray }));
        });

      })
     */

  }
);
