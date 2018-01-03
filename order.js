(function() {
  // Initialize Firebase
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

    //printing email address
    var myEmail = document.getElementById('myEmail');
    var user = firebase.auth().currentUser;
    var user_email = user.email;
    var user_id = user.uid;

    return firebase.database().ref('user_notify/0YM11G2VAJXsW4gDmXUWwbiGnPf1/').once('value').then(function(snapshot) {
     var getDate = snapshot.val().date;
     var getTime = snapshot.val().time;
     var getDman = snapshot.val().driver_name;

     console.log('hello dear');
     order_status.innerText = 'Your order will be delivered on this: "' + getTime + '" time and on this: "' + getDate + '" date by our dilevery man: "' + getDman + '"';
     });



  }else {
    console.log('not logged in');
    $('#w3l_login1').show();
    $('#w3l_login2').hide();

    }

  });
}());
