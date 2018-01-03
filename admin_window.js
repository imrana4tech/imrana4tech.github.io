var config = {
  apiKey: "AIzaSyDJ4JoYcRkCjjAETZKrzFxZNf28_neFokc",
  authDomain: "drinking-water-329a0.firebaseapp.com",
  databaseURL: "https://drinking-water-329a0.firebaseio.com",
  projectId: "drinking-water-329a0",
  storageBucket: "drinking-water-329a0.appspot.com",
  messagingSenderId: "969780907492"
};
firebase.initializeApp(config);


//my code
//Get Elements
const txtEmail = document.getElementById('loginEmail');
const txtPassword = document.getElementById('loginPassword');
const btnLogin = document.getElementById('loginBtn');
const btnSignUp = document.getElementById('btnSignUp');
const btnLogout = document.getElementById('BtnSignOut');
const loginError = document.getElementById('loginError');

const txtSignUpEmail = document.getElementById('signUpEmail');
const txtSignUpPassword = document.getElementById('signUpPassword');


//Add Login Event
btnLogin.addEventListener('click', e => {
//Get email and pass
const email = txtEmail.value;
const pass = txtPassword.value;
// const auth = firebase.auth();
// $("#loginProgress").show();
// $("#loginBtn").hide();

//Get email id on console


if (email == "admin@gmail.com" && pass == "admin1234") {
  //Sign in

  firebase.auth().signInWithEmailAndPassword(email, pass).then(function(user) {
  var user = $('#myModal12').modal('show');
  // logUser(user); // Optional
  }, function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;

  console.log(errorMessage);
  if (errorMessage != null) {
  document.getElementById("Myerror").innerHTML = errorMessage;
  $('#myModal14').modal('show');
  }
  });

}else {
  // $('#myModal88').modal('hide');

  $('#myModal15').modal('show');
  // $('#myModal88').modal('show');

}







//
// const promise = auth.signInWithEmailAndPassword(email,pass);
// promise.catch(e => console.log(e.message));
// //extra mine
// const error = e.message;
// console.log(error);
// if (error) {
//   $('#myModal14').modal('hide');
// }
// document.getElementById("loginError").innerHTML = error;
});

//Add signup Event
btnSignUp.addEventListener('click', e => {
// Get email and pass
// TODO: CHECK 4 REAL EMAILZ
const email = txtSignUpEmail.value;
const pass = txtSignUpPassword.value;
// const auth = firebase.auth();

firebase.auth().createUserWithEmailAndPassword(email, pass).then(function(user) {
  var user = $('#myModal12').modal('show');
  // logUser(user); // Optional
}, function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;

  console.log(errorMessage);
  if (errorMessage != null) {
    document.getElementById("Myerror").innerHTML = errorMessage;
    $('#myModal14').modal('show');
    }
});
//Sign in
//
// firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   var a =3;
//   // console.log(errorCode);
//   console.log(errorMessage);
//   if (errorMessage != null) {
//     document.getElementById("Myerror").innerHTML = errorMessage;
//     $('#myModal14').modal('show');
//     }
//   // ...
// });
//
// $('#myModal12').modal('show');

});

// Add Log out event
logOutBtn.addEventListener('click', e => {
firebase.auth().signOut();
$('#myModal88').modal('show');
$('#myModal16').modal('hide');

});




firebase.auth().onAuthStateChanged(firebaseUser => {

  if (firebaseUser) {
    console.log(firebase);
    $('#myModal88').modal('hide');
    $('#w3l_login1').hide();
    $('#w3l_login2').show();


    $('#admin_view_contain').show();
    $('#admin_edit_cotain').hide();
    $('#admin_save').hide();

    admin_view.addEventListener('click', e => {

      $('#admin_view_contain').show();
      $('#admin_edit_cotain').hide();
      $('#admin_save').hide();


    });

    admin_edit.addEventListener('click', e => {

      $('#admin_edit_cotain').show();
      $('#admin_view_contain').hide();
      $('#admin_save').show();


    });

    //printing email address
    var myEmail = document.getElementById('myEmail');
    var user = firebase.auth().currentUser;
    var user_email = user.email;
    var user_id = user.uid;
    console.log(user_id);
    console.log(user_email);


    $('.navigation').show();
    // $('#productForm').show();
    // $('#categoryForm').show();
    // $('#orderForm').show();
    // $('.footer').show();


  }
  else {



    console.log('not logged in');
    $('#w3l_login1').show();
    $('#w3l_login2').hide();
    $('.navigation').hide();
    $('#productForm').hide();
    $('#categoryForm').hide();
    $('#orderForm').hide();
    $('.footer').hide();
    $('#userForm').hide();

  }
});
















//firebase ended

$('#productForm').show();
$('#orderForm').hide();
$('#userForm').hide();
$('#categoryForm').hide();


//btnViewProfile
pManager.addEventListener('click', e => {
  $('#productForm').show();
  $('#orderForm').hide();
  $('#userForm').hide();
  $('#categoryForm').hide();


});

//btnViewProfile
cManager.addEventListener('click', e => {
  $('#categoryForm').show();
  $('#orderForm').hide();
  $('#userForm').hide();
  $('#productForm').hide();


});



//btnViewProfile

//btnEditProfile
oManager.addEventListener('click', e => {
  $('#productForm').hide();
  $('#orderForm').show();
  $('#userForm').hide();
  $('#categoryForm').hide();

});

dManager.addEventListener('click', e => {
  $('#productForm').hide();
  $('#orderForm').hide();
  $('#userForm').show();
  $('#categoryForm').hide();

});
