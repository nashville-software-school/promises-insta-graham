define(function(require) {
  var _ = require("lodash");
  var Q = require("q");

  return {
    typesXHR: function (){
      var deferred = Q.defer();

      $.ajax("https://nss-book-store.firebaseio.com/booktypes.json")
          // XHR was successful
        .done(function(types) {
          // Now we can resolve the promise and send the data
          deferred.resolve(types);
        })

        // XHR failed for some reason
        .fail(function(xhr, status, error) {
          // Since the call failed, we have to reject the promise
          deferred.reject(error);
        });
      return deferred.promise;
      }
    };

});
