var password = document.getElementById("password");
var confirm_password = document.getElementById("confirm_password");
var mail = document.getElementById("email");
var user = document.getElementById("userName");

$(document).ready(function () {
    password = document.getElementById("password");
    confirm_password = document.getElementById("confirm_password");
    mail = document.getElementById("email");
    user = document.getElementById("userName");
    
    $(confirm_password).addClass("invalid");
    $(user).addClass("invalid");
    validatePassword();
    validateUser();
    user.onkeyup = validateUser;
    password.onchange = validatePassword;
    confirm_password.onkeyup = validatePassword;  
    $('#regForm').submit(function () {
        registerUserFirebase(mail.value, password.value, user.value);
        return false;
    });
});

function registerUserFirebase(mail, password, user) {
    firebase.auth().createUserWithEmailAndPassword(mail, password).then(function(userObject){
        userObject.sendEmailVerification(); 
        registerMessage(true, "The mail " + mail + " has been registered successfully.");
        console.log("user id " + userObject.uid);
        firebase.database().ref('users/' +  userObject.uid).set({
            user: user,
            mail: mail
        });
    }).catch(function(error) {
        registerMessage(false, "Error : " + error.message);
    });   
}

function validatePassword(){
    if(password.value != confirm_password.value) {
        confirm_password.setCustomValidity("Passwords Don't Match");
        $(confirm_password).addClass("invalid");
        $(confirm_password).removeClass("valid");
    } else {
        if(confirm_password.value.length < 8) {
            confirm_password.setCustomValidity('The password must be at least 8 characters');
            $(confirm_password).addClass("invalid");
            $(confirm_password).removeClass("valid");
        }
        else {
            confirm_password.setCustomValidity('');
            $(confirm_password).removeClass("invalid");
            $(confirm_password).addClass("valid");
        }
    }
}


function validateUser(){
    if(!(/^[a-z0-9_-]{3,15}$/.test(user.value))) {
        user.setCustomValidity("Use numbers, letter and _. Min 3 characters max 15");
        $(user).addClass("invalid");
        $(user).removeClass("valid");
    } else {
        user.setCustomValidity('');
        $(user).removeClass("invalid");
        $(user).addClass("valid");
    }
}

function registerMessage(success, message) {
    var rM = $("#register_message");
    rM.removeClass("label-default");
    rM.removeClass("label-success");
    rM.removeClass("label-danger");
    if(success) {
        rM.addClass("label-success");
    } else {
        rM.addClass("label-danger");
    }
    rM.text(message);
    
}
