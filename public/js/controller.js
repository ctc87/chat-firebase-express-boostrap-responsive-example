  var myApp = angular.module("myApp", ["firebase"]);
  

myApp.controller("MyController", ["$scope", "$firebaseArray",
function($scope, $firebaseArray) {
  var ref = new Firebase("https://chat-c76d5.firebaseio.com/activeUsers");
  var refMessages = new Firebase("https://chat-c76d5.firebaseio.com/messages");
  $scope.users = $firebaseArray(ref);
  $scope.messages = $firebaseArray(refMessages);
  if(sessionStorage.getItem("user")) {
    var n = sessionStorage.getItem("user");
    $scope.name = n || "anonymous";
  }
  
  

  
  //ADD MESSAGE METHOD
  $scope.addMessage = function(e) {
    var n = sessionStorage.getItem("user");
    $scope.name = n || "anonymous";
    //LISTEN FOR RETURN KEY
    if (e.keyCode === 13 && $scope.msg) {
      //ALLOW CUSTOM OR ANONYMOUS USER NAMES
      $scope.messages.$add({ from: $scope.name, body: $scope.msg });
      //RESET MESSAGE
      $scope.msg = "";
      setTimeout(function(){
        var objDiv = document.getElementById("scrolled");
        objDiv.scrollTop = objDiv.scrollHeight;
      }, 200);
    }
  }
  
  
}
]);