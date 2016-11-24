var logPassword = document.getElementById("passwordLog");
var logMail = document.getElementById("emailLog");
var logged = false;

$(document).ready(function() {
    logPassword = document.getElementById("passwordLog");
    logMail = document.getElementById("emailLog");
    if(sessionStorage.email && sessionStorage.passw) {
        var email = sessionStorage.getItem("email");
        var passw = sessionStorage.getItem("passw");
        login(email, passw);        
    }
    $("#loginForm").submit(function () {
        login(logMail.value, logPassword.value);
        return false;
    });
        
});

function login(email, passw) {
    firebase.auth().signInWithEmailAndPassword(email, passw).then(function(user){
        // console.log("verfied:" + user.emailVerified);
        if(user.emailVerified) {
            logged = true;
            sessionStorage.setItem("email", email);
            sessionStorage.setItem("passw", passw);
            console.log(activeUser(firebase.auth().currentUser));

            sendData(logged);
        }
        else
            loginMessage(true, "Error : Email its not verified");
        console.log("loged: " + logged);
    }).catch(function(error) {
        loginMessage(true, "Error : " + error.message);
    });
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

function sendData(login) {
    $.get( '/login'
        ,{
            loged:login,
        }, 
        function(data) {
            console.log("success");
            // location.reload();
        }
    );
}

function activeUser(id) {
    console.log(id.uid)
    var ref = new Firebase("https://chat-c76d5.firebaseio.com/users/" + id.uid );
    ref.once('value', function(snapshot) {
    var username = snapshot.val();
        //   console.log(username.user);
            firebase.database().ref('activeUsers/' + id.uid).set({
                user: username.user
            });
    }); 
}


// sendData(true);
    