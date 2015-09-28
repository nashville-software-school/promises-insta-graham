define(["jquery", "lodash", "q"], function($, _, Q) {
    return {
        getTypes: function() {

            var deferred = Q.defer();

            $.ajax({ url: "https://nss-book-store.firebaseio.com/booktypes.json" })
            .done(function(json_data) {
              deferred.resolve(json_data);
            })
            .fail(function(xhr, status, error) {
              deferred.reject(error);
            });

          return deferred.promise;
        }
    };
});