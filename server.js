var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var admin = require("firebase-admin");
var firebase = require('firebase');
var config = {
        apiKey: "AIzaSyA76tyU9IXMo9FVx_Pagg1QxcFHn1VIdrY",
        authDomain: "chat-c76d5.firebaseapp.com",
        databaseURL: "https://chat-c76d5.firebaseio.com",
        storageBucket: "chat-c76d5.appspot.com",
        messagingSenderId: "619359579687"
      };
var fireapp = firebase.initializeApp(config);
var serviceAccount = require("./chat-c76d5-firebase-adminsdk-0q6vr-43872258eb.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://chat-c76d5.firebaseio.com"
});


var app = express();

app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());     

var loged = false;
var userId;
app.get('/', function (req, res) {
    // console.log(loged)
    res.render('index', { Itsloged: loged});
});


app.get('/login', function (req, res) {
  loged = req.query.loged;
  // console.log(req.query);
  var passw = req.query.pasw;
  var mail = req.query.mail;
  login(mail, passw, res);
  // console.log(loged,userId);
});

app.get('/activeUser', function (req, res) {
  var id = req.query.uid;
  // console.log("id:" + id);
  activeUser(id, res);
  
});

app.get('/logout', function (req, res) {
  var id = req.query.uid;
  unactiveUser(id, res);
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});


function login(email, passw, res) {
  var userId; 
  firebase.auth().signInWithEmailAndPassword(email, passw).then(function(user){
    userId = user.uid;
    admin.auth().createCustomToken(userId)
      .then(function(customToken) {
        res.json({ token: customToken });
      })
      .catch(function(error) {
        console.log("Error creating custom token:", error);
      });
    }).catch(function(error) {
        console.log("Error : " + error.message);
    }); 
}


function activeUser(id, res) {
    var ref = "/users/" + id;
    firebase.database().ref(ref).once('value', function(snapshot) {
    var username = snapshot.val();
      firebase.database().ref('activeUsers/' + id).set({
          user: username.user
      });
      res.json({ active: true });
    }); 
}

function unactiveUser(id, res) {
 var ref = firebase.database().ref("/activeUsers/" + id);
  ref.remove()
  .then(function() {
    console.log("Remove succeeded.");
    res.json({ logout: true });
  })
  .catch(function(error) {
    console.log("Remove failed: " + error.message)
  }); 
}

