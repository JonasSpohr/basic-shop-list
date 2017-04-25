var app = angular.module('app', []);

app.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});

app.controller("mainController", ['$scope', '$http', function($scope, $http) {
    $scope.formData = {};

    $http.get('/api/items')
    .success(function(data) {
        $scope.items = data;
    })
    .error(function(data) {
        console.log('Error: ' + data);
    });

    $scope.create = function() {
        $http.post('/api/item', $scope.formData)
        .success(function(data) {
            $scope.formData = {};
            $scope.items = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };

    $scope.delete = function(id) {

        if(confirm('Confirm delete item?')){
            $http.delete('/api/items/' + id)
            .success(function(data) {
                $scope.items = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        }
    };
}])