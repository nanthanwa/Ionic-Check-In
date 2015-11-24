IonicCheckIn.factory('DatabaseService', function($cordovaSQLite) {
  var db = null;
  return {
    get: function(){
      return db;
    },
    set: function(dbObject){
      db = dbObject;
    }
  };
});
