define(["jquery", "lodash", "q"], function($, _, Q) {
  return {
    getBooks: function(typeResults) {

      var deferred = Q.defer();

      $.ajax({
        url: "https://nss-book-store.firebaseio.com/books.json",
        data: typeResults
      })
      .done(function(bookJsonData) {
        deferred.resolve(bookJsonData);
      }).fail(function(xhr, status, error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }
  };
});