'use strict';
angular.module('learningDataApp')
  .controller('dailyStatsController', function ($scope, dataAPIservice) {
    $scope.loading = true;
    $scope.dataLoaded = false;
    $scope.loadingError = false;

    var promise = dataAPIservice.getDailyTenantStats();
      promise.then(function(result) {
        $scope.setupData(result);
      }, function() {
        $scope.loading = false;
        $scope.loadingError = true;
      });

    $scope.setupData = function (result) {
      $scope.loading = false;
      $scope.dataLoaded = true;
      $scope.loadingError = false;
      $scope.tenantStats = result.tenant_stats;
      $scope.totals = {};
      $scope.totals.users = 0;
      $scope.totals.spaces = 0;
      $scope.totals.chapters = 0;
      $scope.totals.completions = 0;
      $scope.totals.active_users = 0;
      $scope.totals.tenant_name = 'Totals';

      for (var i = 0 ; i < $scope.tenantStats.length ; i++) {
        $scope.totals.users += parseInt($scope.tenantStats[i].users);
        $scope.totals.spaces += parseInt($scope.tenantStats[i].spaces);
        $scope.totals.chapters += parseInt($scope.tenantStats[i].chapters);
        $scope.totals.completions += parseInt($scope.tenantStats[i].completions);
        $scope.totals.active_users += parseInt($scope.tenantStats[i].active_users);
      }
    };
  });
