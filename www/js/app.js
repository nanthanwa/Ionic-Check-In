var IonicCheckIn = angular.module('Ionic-Check-In', ['ionic', 'ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite, DatabaseService) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    try{
      DatabaseService.set($cordovaSQLite.openDB({name: "my.db"}));
      //$cordovaSQLite.execute(DatabaseService.get(), "DROP TABLE student");
      //$cordovaSQLite.execute(DatabaseService.get(), "DROP TABLE activity");
      $cordovaSQLite.execute(DatabaseService.get(), "CREATE TABLE IF NOT EXISTS student (id integer primary key, std_id text UNIQUE, firstname text, lastname text, gender text)");
      $cordovaSQLite.execute(DatabaseService.get(), "CREATE TABLE IF NOT EXISTS activity (id integer primary key, title text , date text, place text, user_max number)");
    }
    catch(e){
      console.log("Initialize DB not work in browser");
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('tab.camera', {
    url: '/camera',
    views: {
      'tab-camera': {
        templateUrl: 'templates/tab-camera.html',
        controller: 'CameraCtrl'
      }
    }
  })

  .state('tab.activities', {
      url: '/activities',
      views: {
        'tab-activities': {
          templateUrl: 'templates/tab-activities.html',
          controller: 'ActivitiesCtrl'
        }
      }
    })
    .state('tab.activity-detail', {
      url: '/activities/:chatId',
      views: {
        'tab-activities': {
          templateUrl: 'templates/activity-detail.html',
          controller: 'ActivityDetailCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

  $ionicConfigProvider.tabs.position('bottom'); // other values: top
});
