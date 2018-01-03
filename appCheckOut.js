(function() {

  // Initialize Firebase
  const config = {
   apiKey: "AIzaSyA_CgLVJxBbuuqbXS85QwF_uUKx6D_dvL4",
   authDomain: "dwds-ssuet.firebaseapp.com",
   databaseURL: "https://dwds-ssuet.firebaseio.com",
   projectId: "dwds-ssuet",
   storageBucket: "dwds-ssuet.appspot.com",
   messagingSenderId: "354673579112"
  };
  firebase.initializeApp(config);




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
  const auth = firebase.auth();
  // $("#loginProgress").show();
  // $("#loginBtn").hide();

  //Get email id on console

  //Sign in
  const promise = auth.signInWithEmailAndPassword(email,pass);
  promise.catch(e => console.log(e.message));
  //extra mine
  const error = e.message;
  document.getElementById("loginError").innerHTML = error;
  });

  //Add signup Event
  btnSignUp.addEventListener('click', e => {
    // Get email and pass
    // TODO: CHECK 4 REAL EMAILZ
    const email = txtSignUpEmail.value;
    const pass = txtSignUpPassword.value;
    const auth = firebase.auth();
    //Sign in
    const promise = auth.createUserWithEmailAndPassword(email,pass);
    promise.catch(e => console.log(e.message));
  });

  // Log out
  btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
  });

  //Add Realtime Listener
  firebase.auth().onAuthStateChanged(firebaseUser => {

    if (firebaseUser) {
      console.log(firebase);
      $('#myModal88').modal('hide');
      $('#w3l_login1').hide();
      $('#w3l_login2').show();

      // User is signed in.
      // $(".login-cover").hide();
      // var dialog = document.querySelector('#loginDialog');
      // if (! dialog.showModal) {
      //   dialogPolyfill.registerDialog(dialog);
      // }
      // dialog.close();

      //printing email address
      var myEmail = document.getElementById('myEmail');
      var user = firebase.auth().currentUser;
      var emailPrint = user.email;
      var passPrint = user.uid;
      console.log(emailPrint);
      console.log(passPrint);
      myEmail.innerText = emailPrint;



      //productRead
      var product_imgUrl = document.getElementById('product_imgUrl');
      console.log(product_imgUrl);
      var productName = document.getElementById('productName');
      var productPrice = document.getElementById('productPrice');



      // var newPostKey = firebase.database().ref('Products/-L0QJ75iBH238tYeyVB4').push().key;
      // console.log(newPostKey);

      return firebase.database().ref('Products/-L0TFKtjQUXieXW78lO5').once('value').then(function(snapshot) {
      var getImgUrl = snapshot.val().url;
      var getName = snapshot.val().product_name;
      var getPrice = snapshot.val().product_price;

      // ...
      product_imgUrl.src = getImgUrl;
      productName.innerText = getName;
      productPrice.innerText = getPrice;

      });
      //productRead

      // happen with Login dialog

    }else {

      console.log('not logged in');
      $('#w3l_login1').show();
      $('#w3l_login2').hide();

      // No user is signed in.
      // var dialog = document.querySelector('#loginDialog');
      // if (! dialog.showModal) {
      //   dialogPolyfill.registerDialog(dialog);
      // }
      // dialog.showModal();
      // $("#loginBtn").show();
      // $("#loginProgress").hide();


    }
  });

}());
