'use strict';

/* jasmine specs for services go here */

describe('tweetListHolder', function () {

  beforeEach(module('app'));
//  beforeEach(module('phonecatServices'));

  describe('PhoneListCtrl', function () {
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function (_$httpBackend_, $rootScope, $controller, $log) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('phones/phones.json').
          respond([
            {name: 'Nexus S'},
            {name: 'Motorola DROID'}
          ]);

      scope = $rootScope.$new();
//      '$log', '$routeParams', '$location', 'twitterSearchService', 'twitterwallModelHolder'
      service = $controller('tweetListHolder', {$log: $log});
    }));


    it('should create "phones" model with 2 phones fetched from xhr', function () {
      expect(scope.phones).toEqualData([]);
      $httpBackend.flush();

      expect(scope.phones).toEqualData(
          [
            {name: 'Nexus S'},
            {name: 'Motorola DROID'}
          ]);
    });


    it('should set the default value of orderProp model', function () {
      expect(scope.orderProp).toBe('age');
    });
  });
});
