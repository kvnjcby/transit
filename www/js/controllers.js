angular.module('transit.controllers', [])

.controller('RoutesCtrl', function($scope, Routes) {
  Routes.get('chapel-hill').then(function(data) {
    $scope.routes = data;
    console.log($scope);
  }, function(error) {
    console.log(error);
  });
})


.controller('MapCtrl', function($scope) {
  angular.extend($scope, {
    defaults: {
        
    }
  });
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
