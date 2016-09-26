angular.module('transit.services', [])

.factory('Routes', function($http, $q) {
  var routesList = function(agency) {
    return $http.get('http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a='+agency)
                .then(function(response) {
                  console.log(response);
                  if (typeof response.data === 'string') {
                    var x2js = new X2JS();
                    return x2js.xml_str2json(response.data).body.route;
                  } else {
                    return $q.reject(response.data);
                  }
                }, function(response) {
                  // error
                  return $q.reject(response.data);
                });
  };

  var routeConfig = function(agency, route) {
    return $http.get('http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a='+ agency +'&r='+ route)
                .then(function(response) {


                  // need to check for 200 ok

                  if (typeof response.data === 'string') {
                    var x2js = new X2JS();
                    console.log(x2js.xml_str2json(response.data).body.route);
                    return x2js.xml_str2json(response.data).body.route;
                  } else {
                    return $q.reject(response.data);
                  }
                  
                }, function(response) {
                  // error
                  return $q.reject(response.data);
                });
  };

  return {
    routesList: routesList,
    routeConfig: routeConfig
  };
})

.factory('Location', function($q) {
  return {
    get: function() {
           var deferred = $q.defer();

           navigator.geolocation.getCurrentPosition(function(pos) {
             deferred.resolve(pos);
           },
           function(error) {
             deferred.reject(error);
           });

           return deferred.promise;
         }
  };
})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
