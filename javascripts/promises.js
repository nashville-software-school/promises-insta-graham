requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../lib/bower_components/jquery/dist/jquery.min',
    'lodash': '../lib/bower_components/lodash/lodash.min',
    'hbs': '../lib/bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../lib/bower_components/bootstrap/dist/js/bootstrap.min',
    'q': '../lib/bower_components/q/q'
  },
  shim: {
    'bootstrap': ['jquery']
  }
});

requirejs(
  ["jquery", "hbs", "bootstrap", "q", "get-books", "get-booktypes"],
  function($, Handlebars, bootstrap, Q, books, types) {

    // books.load(function(bookArray) {
    //   require(['hbs!../templates/books'], function(bookTpl) {
    //     $("#bookList").html(bookTpl({ books:bookArray }));
    //   });
    // });

    var myBooks;

    books.booksXHR()
      .then(function(books) {
        console.log("API call successful and responded with", books);
        myBooks = books;
        return types.typesXHR(books);
      })
      .then(function(types) {
        console.log("2nd API call successful and responded with", types);
        // console.log(myBooks);
        require(['hbs!../templates/books'], function(bookTpl) {
          $("#bookList").html(bookTpl({ bookObj:myBooks }));
        });
      });



    // getBooks()
  // Then gets executed when promise is resolved
    // .then(function(books) {
    //   console.log("API call successful and responded with", books);
    // });

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
