angular.module('transit.controllers', [])

.controller('RoutesCtrl', function($scope, Routes) {
  Routes.routesList('chapel-hill').then(function(data) {
    $scope.routes = data;
    console.log($scope);
  }, function(error) {
    console.log(error);
  });
})


.controller('MapCtrl', function($scope, Routes) {
  var map = L.map("map").setView([35.9132, -79.055847], 15);
  L.tileLayer('https://api.mapbox.com/styles/v1/kvnjcby/citj0f2bx001f2hln880n99cc/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia3ZuamNieSIsImEiOiJjaXRqMGVjdDAwNnlyMnhudnYxajU0MHl0In0.FynXzTZV9AgE8SSvjJPXtg', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'your.mapbox.project.id',
    accessToken: 'pk.eyJ1Ijoia3ZuamNieSIsImEiOiJjaXRqMGVjdDAwNnlyMnhudnYxajU0MHl0In0.FynXzTZV9AgE8SSvjJPXtg'
  }).addTo(map);

  Routes.routeConfig('chapel-hill', 'A');

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
