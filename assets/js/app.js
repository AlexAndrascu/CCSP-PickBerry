/**
 * app.js
 *
 * This file contains some conventional defaults for working with Socket.io + Sails.
 * It is designed to get you up and running fast, but is by no means anything special.
 *
 * Feel free to change none, some, or ALL of this file to fit your needs!
 */


(function (io) {
  // as soon as this file is loaded, connect automatically,
  var socket = io.connect();
  if (typeof console !== 'undefined') {
    log('Connecting to Sails.js...');
  }

  socket.on('connect', function socketConnected() {

    // Listen for Comet messages from Sails
    socket.on('message', function messageReceived(message) {

      ///////////////////////////////////////////////////////////
      // Replace the following with your own custom logic
      // to run when a new message arrives from the Sails.js
      // server.
      ///////////////////////////////////////////////////////////
      log('New comet message received :: ', message);
      //////////////////////////////////////////////////////

    });


    ///////////////////////////////////////////////////////////
    // Here's where you'll want to add any custom logic for
    // when the browser establishes its socket connection to
    // the Sails.js server.
    ///////////////////////////////////////////////////////////
    log(
        'Socket is now connected and globally accessible as `socket`.\n' +
        'e.g. to send a GET request to Sails, try \n' +
        '`socket.get("/", function (response) ' +
        '{ console.log(response); })`'
    );
    ///////////////////////////////////////////////////////////


  });


  // Expose connected `socket` instance globally so that it's easy
  // to experiment with from the browser console while prototyping.
  window.socket = socket;


  // Simple log function to keep the example simple
  function log () {
    if (typeof console !== 'undefined') {
      console.log.apply(console, arguments);
    }
  }
  var app = angular.module("fucknews", [])
  console.log("Angularjs loaded")

  app.controller("homepage", function($scope) {
    console.log('Homepage controller loaded')

    var current_user
    socket.get('/getCurrentUser',function(data){
      current_user = data
    })

    $scope.report = {};
    $scope.submitReport = function() {
        console.log('/report/create?content='+$scope.report.url+'&owner='+current_user)
        socket.post('/report/create?content='+$scope.report.url+'&owner='+current_user),{},function(data){
          console.log(data)
        }
    }

    $scope.reason = {};
    $scope.submitReason = function() {
        console.log('/reason/create?content='+$scope.reason.url+'&owner='+current_user)
        socket.post('/reason/create?content='+$scope.reason.url+'&owner='+current_user),{},function(data){
          console.log(data)
        }
    }


    socket.on('message', function messageReceived(message) {
      console.log(message)

      if(message.verb=== "create"&&message.model==="report"){
        $scope.reports.push(message.data);
        $scope.$apply();
      }
      if(message.verb=== "destroy"&&message.model==="report"){
        $scope.reports.forEach(function(report,idx){
          if(report.id==message.id){
            $scope.reports.splice(idx,1);
            $scope.$apply();
          }
        })
      }
    });

    socket.get('/news',function(newses){
      $scope.newses = newses
      $scope.$apply()
    })
  }).directive('forceModelUpdate', function($compile) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            scope.$on('event:force-model-update', function() {
                ctrl.$setViewValue(element.val());
            });
        }
    }
  });

  app.controller("news", function($scope,$location) {

    var current_user
    socket.get('/getCurrentUser',function(data){
      current_user = data
      console.log(data)
    })

    socket.on('message', function messageReceived(message) {
      console.log(message)
      if(message.verb=== "create"){
        switch (message.model){
          case "report":
            $scope.news.reports.push(message.data);
            $scope.$apply();
            break;
          case "reason":
            $scope.news.reasons.push(message.data);
            $scope.$apply();
            break;
          }
      }
      else if(message.verb=== "destroy"){
        switch (message.model){
          case "report":
            $scope.reports.forEach(function(report,idx){
              if(report.id==message.id){
                $scope.news.reports.splice(idx,1);
                $scope.$apply();
              }
            })
            break;
          case "reason":
            $scope.reasons.forEach(function(reason,idx){
              if(reason.id==message.id){
                $scope.news.reasons.splice(idx,1);
                $scope.$apply();
              }
            })
            break;
          }
      }
    });

    var new_id = $location.absUrl().split('/').pop()

    console.log('News controller loaded')
    socket.get('/news/'+new_id,function(news){
      $scope.news = news
      $scope.$apply()
    })

    $scope.report = {};
    $scope.submitReport = function() {
        socket.get('/report/create?rep_news='+new_id+'&content='+$scope.report.content+'&owner='+current_user,function(data){
          $scope.news.reports.push(data);
          $scope.$apply();
        })
    }

    $scope.reason = {};
    $scope.submitReason = function() {
      socket.get('/reason/create?parent_news='+new_id+'&content='+$scope.reason.content+'&owner='+current_user,function(data){
        $scope.news.reasons.push(data);
        $scope.$apply();
      })
    }
  })

  app.controller("user", function($scope,$location) {
    var current_user
    socket.get('/getCurrentUser',function(data){
      current_user = data
    })

    console.log('user controller loaded')
  })

  app.controller("userComments", function($scope,$location) {

    var current_user
    socket.get('/getCurrentUser',function(data){
      current_user = data
    })

    console.log('userComments controller loaded')
    var user_id = $location.absUrl().split('/').pop()
    socket.get('/user/'+user_id,function(data){
        console.log(data)
        $scope.comments = data.comments
        $scope.$apply()
    })
  })


  app.controller("userReasons", function($scope,$location) {

    var current_user
    socket.get('/getCurrentUser',function(data){
      current_user = data
    })

    console.log('userReasons controller loaded')
    var user_id = $location.absUrl().split('/').pop()
    socket.get('/user/'+user_id,function(data){
        console.log(data)
        $scope.reasons = data.reasons_maker
        $scope.$apply()
    })
  })

  app.controller("userReports", function($scope,$location) {

    var current_user
    socket.get('/getCurrentUser',function(data){
      current_user = data
    })

    console.log('userReports controller loaded')
    var user_id = $location.absUrl().split('/').pop()
    socket.get('/user/'+user_id,function(data){
        console.log(data)
        $scope.reports = data.reports
        $scope.$apply()
    })
  })
})

(

  // In case you're wrapping socket.io to prevent pollution of the global namespace,
  // you can replace `window.io` with your own `io` here:
  window.io

);


