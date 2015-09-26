define(function(require) {
  var _ = require("lodash");
  var Q = require("q");
  var books = require("get-books");

  return {
    typesXHR: function (books){
      var deferred = Q.defer();

      $.ajax("https://nss-book-store.firebaseio.com/booktypes.json")
        .done(function(types) {

          types = Object.keys( types ).map(key => types[ key ]);

          books = books.map(book => {
            book.type = _.find(types, { id:book.booktype }).label;
            return book;
          });

          deferred.resolve(types);
        })

        .fail(function(xhr, status, error) {
          deferred.reject(error);
        });
      return deferred.promise;
      }
    };

});
