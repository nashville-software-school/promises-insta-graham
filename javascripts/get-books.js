define(function(require) {
  var _ = require("lodash");
  var Q = require("q");

function getBooks() {
  var deferred = Q.defer();
}
  return {
    load: function(fn) {
      // This XHR should be in its own require module, not here
      $.ajax("https://nss-book-store.firebaseio.com/booktypes.json")
      (types).done(function(json_data) {
      // Now we can resolve the promise and send the data
      deferred.resolve(json_data);
    })
    // XHR failed for some reason
    .fail(function(xhr, status, error) {
      // Since the call failed, we have to reject the promise
      deferred.reject(error);
    });
return deferred.promise;

        // This XHR does belong here
//         $.ajax("https://nss-book-store.firebaseio.com/books.json").done(function(books) {
//           /*
//             This code is dependent upon two XHRs and violates
//             the Single Responsibility Principle.

//             I've also given you a little preview of ES6 (the newest
//             version of JavaScript syntax). They are called fat arrows.
//             Check out the docs at http://es6-features.org/#ExpressionBodies
//           */
//           types = Object.keys( types ).map(key => types[ key ]);
//           books = Object.keys( books ).map(key => books[ key ]);

//           /*
//             I'm using the lodash `find()` method here.
//               https://lodash.com/docs#find
//            */
//             books = books.map(book => {
//             book.type = _.find(types, { id:book.booktype }).label;
//             return book;
//           });

//           // Still relying on a callback? That's so 2014...
//           fn(books);

//         });
//       });

//     }
//   };
// });
