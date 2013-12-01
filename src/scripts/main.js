require(
   ['app'],
   function (app) {
     return angular.element(document).ready(function () {
       return angular.bootstrap(document, ['app']);
     });
   });
