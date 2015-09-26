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
  ["jquery", "hbs", "bootstrap", "q", "get-books"],
  function($, Handlebars, bootstrap, Q, books) {

    // books.load(function(bookArray) {
    //   require(['hbs!../templates/books'], function(bookTpl) {
    //     $("#bookList").html(bookTpl({ books:bookArray }));
    //   });
    // });

    books.booksXHR()
      .then(function(books) {
        console.log("API call successful and responded with", books);
        // return secondXHR(data1);
      });
      // .then(function(data2) {
      //   return thirdXHR(data2);
      // })
      // .done();



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
