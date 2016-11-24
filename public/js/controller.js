  var myApp = angular.module("myApp", ["firebase"]);
  

myApp.controller("MyController", ["$scope", "$firebaseArray",
function($scope, $firebaseArray) {
  var ref = new Firebase("https://chat-c76d5.firebaseio.com/activeUsers");
  $scope.users = $firebaseArray(ref);
  console.log($scope.users)
// 		console.log("fire",Firebase)
// myApp.controller("MyController", ["$scope", "$firebaseArray",
// function($scope, $firebaseArray) {
//   var ref = new Firebase("https://glaring-fire-2584.firebaseio.com/");
//   $scope.messages = $firebaseArray(ref);

//   //ADD MESSAGE METHOD
  
//   $scope.addMessage = function(e) {

//     //LISTEN FOR RETURN KEY
//     if (e.keyCode === 13 && $scope.msg) {
//       //ALLOW CUSTOM OR ANONYMOUS USER NAMES
//       var name = $scope.name || "anonymous";
//       $scope.messages.$add({ from: name, body: $scope.msg });
//       //RESET MESSAGE
//       $scope.msg = "";
//     }
//   }
  
  
}
]);