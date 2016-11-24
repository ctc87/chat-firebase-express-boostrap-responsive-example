var firebaseIniti;
  // Initialize Firebase
  $(document).ready(function() {
      var config = {
        apiKey: "AIzaSyA76tyU9IXMo9FVx_Pagg1QxcFHn1VIdrY",
        authDomain: "chat-c76d5.firebaseapp.com",
        databaseURL: "https://chat-c76d5.firebaseio.com",
        storageBucket: "chat-c76d5.appspot.com",
        messagingSenderId: "619359579687"
      };
      
      firebaseIniti = firebase.initializeApp(config);
      
      // console.log(firebase.auth().currentUser)
      // var id = "BHAHSpgotSMXTTKEymLyEHuzSiK2"
      // var ref = new Firebase("https://chat-c76d5.firebaseio.com/users/" + id );
      
      //   return ref.once('value', function(snapshot) {
      //     var username = snapshot.val();
      //     console.log(username.user);
      // });
  });
