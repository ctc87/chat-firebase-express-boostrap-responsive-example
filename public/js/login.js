var logPassword = document.getElementById("passwordLog");
var logMail = document.getElementById("emailLog");
var logged = false;

$(document).ready(function() {
    setTimeout(function(){
        var objDiv = document.getElementById("scrolled");
        objDiv.scrollTop = objDiv.scrollHeight;
    },2000)
    logPassword = document.getElementById("passwordLog");
    logMail = document.getElementById("emailLog");
    if(sessionStorage.email && sessionStorage.passw) {
        var email = sessionStorage.getItem("email");
        var passw = sessionStorage.getItem("passw");
        login(email, passw);        
    }
    
    if(sessionStorage.getItem("user-uid")) {
        $("#form-login").hide(1000,function(){
         $("#form-logout").show();
        });
    }
    
    $("#loginForm").submit(function () {
        login(logMail.value, logPassword.value);
        return false;
    });
    $("#logoutForm").submit(function () {
        sendDataLogout(sessionStorage.getItem("user-uid"));
        return false;
    });
        
});

function login(email, passw) {
     sendDataLogin(logged, email, passw);
}

function loginMessage(fail, message) {
    var lM = $("#login_message");
    lM.removeClass("label-default");
    lM.removeClass("label-danger");
    if(fail) {
        lM.addClass("label-danger");
    }
    lM.text(message);
    
}

function sendDataLogout(id) {
       $.get( '/logout'
        ,{
            uid: id
        },
        function(data) {
            if(data.logout) {
                $("#form-logout").hide(1000,function(){
                    $("#form-login").show();
                });
                sessionStorage.removeItem("user-uid");
                sessionStorage.removeItem("user");
                sessionStorage.removeItem("email");
                sessionStorage.removeItem("passw"); 
            }
        }
    );
}

function sendDataLoged(id) {
    
    $.get( '/activeUser'
        ,{
            uid: id
        }, function(data) {
            if(data.active)
              setUserScope(id);  
        }
    );
}

function setUserScope(id) {
  var ref = "/users/" + id;
    firebase.database().ref(ref).once('value', function(snapshot) {
        var username = snapshot.val();
        sessionStorage.setItem("user", username.user);
        console.log("user",sessionStorage.getItem("user"));
    });    
}

function sendDataLogin(login, mail, passw) {
    $.get( '/login'
        ,{
            loged:login,
            mail: mail,
            pasw: passw,
        }, 
        function(data) {
            console.log(data);
            /** inicar sesion con el token en este punto  cambiar aemas login por logout si se inicia sesion*/
            firebase.auth().signInWithCustomToken(data.token).then(function(user){
                sendDataLoged(user.uid);
                sessionStorage.setItem("user-uid", user.uid);
                $("#form-login").hide(1000,function(){
                    $("#form-logout").show();
                });
            }).catch(function(error) {
                loginMessage(true, error.message);
                console.log("Error : " + error.message);
            });
        }
    );
}
