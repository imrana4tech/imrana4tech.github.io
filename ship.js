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

    // return firebase.database().ref('Cart/' + user_id ).once('value').then(function(snapshot) {
    // console.log(snapshot.val());
    //
    //
    //
    //
    // });

    // firebase.database().ref('Cart/' + user_id).on('value', function(snapshot) {
    //     console.log(snapshot.val());
    // });
    //
    // function snapshotToArray(snapshot) {
    //     var returnArr = [];
    //
    //     snapshot.forEach(function(childSnapshot) {
    //         var item = childSnapshot.val();
    //         item.key = childSnapshot.key;
    //         console.log(childSnapshot.key);
    //
    //         returnArr.push(item);
    //     });
    //
    //     return returnArr;
    // };
    //cart price & quantity

    var databaseRef = firebase.database().ref('Cart/' + user_id);
    databaseRef.once('value', function(snapshot) {
        var childKey;
        // var childKey2;
        // var childKey3;

        var all = new Array();
            // all[i]=a;
        snapshot.forEach(function(childSnapshot) {

            childKey = childSnapshot.key;
            all = childSnapshot.key;
            // console.log('imran');
            childKey2 = all[0];


            if (childKey == '500mlx1') {
              // Cart/MLz1fOIh4NhSDElRapohUsogvcP2/500mlx1/500mlx1
              firebase.database().ref('Cart/' + user_id + '/500mlx1/500mlx1').on('value', function(snapshot) {
                var p1_name = snapshot.val().product_name;
                var p1_quantity = snapshot.val().product_quantity;
                var p1_price = snapshot.val().product_price;
                console.log(p1_name);
                console.log(p1_quantity);
                console.log(p1_price);


                firebase.database().ref('Cart/' + user_id + '/6Lx5/6Lx5').on('value', function(snapshot) {
                  var p2_name = snapshot.val().product_name;
                  var p2_quantity = snapshot.val().product_quantity;
                  var p2_price = snapshot.val().product_price;
                  console.log(p2_name);

                  // firebase.database().ref('Cart/' + user_id + '/19Lx5/19Lx5').on('value', function(snapshot) {
                  //   var p3_name = snapshot.val().product_name;;
                  //   var p3_quantity = snapshot.val().product_quantity;
                  //   var p3_price = snapshot.val().product_price;
                  //   console.log(p3_price);

                    firebase.database().ref('Cart_TotalPrice/' + user_id).on('value', function(snapshot) {
                    var product_TotalPrice = snapshot.val().product_TotalPrice;
                    console.log(product_TotalPrice);

                    proceed.addEventListener('click', e => {
                      var user_name = document.getElementById('user_name').value;
                      var user_contact = document.getElementById('user_contact').value;
                      var user_address = document.getElementById('user_address').value;
                      console.log(user_name);
                      console.log(user_id);

                      // var data1 = {
                      //     p1: "imran",
                      // }

                      //cart
                      var data = {
                          user_name: user_name,
                          user_contact: user_contact,
                          user_address: user_address,
                          user_email: user_email,
                          p1_name : p1_name,
                          p1_quantity : p1_quantity,
                          p1_price : p1_price,
                          p2_name : p2_name,
                          p2_quantity : p2_quantity,
                          p2_price : p2_price,
                          // p3_name : p3_name,
                          // p3_quantity : p3_quantity,
                          // p3_price : p3_price,
                          product_TotalPrice: product_TotalPrice,

                      }

                      var updates = {};
                      updates['admin/' + user_id] = data;
                      // updates['admin1/' + user_id + '/' + p1] = data1;

                      const promise = firebase.database().ref().update(updates);
                      // console.log(getID);
                      // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
                      // alert('user has been inserted successfully');

                      promise.catch(e => console.log(e.message));
                      //cart



                    });

                      });

                    // });

                 });
               });
            }

    });
    // console.log(childKey2);
    // console.log(childKey);
    // console.log(all);

    });
    //
    // firebase.database().ref('Cart/' + user_id + '/500mlx1/500mlx1').on('value', function(snapshot) {
    // console.log(snapshot.val().product_name);
    // firebase.database().ref('Cart/' + user_id + '/6Lx1/6Lx1').on('value', function(snapshot) {
    // console.log(snapshot.val().product_name);
    // firebase.database().ref('Cart/' + user_id + '/19Lx5/19Lx5').on('value', function(snapshot) {
    // console.log(snapshot.val().product_name);
    //
    // });
    // });
    // });

  }else {
    console.log('not logged in');
    $('#w3l_login1').show();
    $('#w3l_login2').hide();

    }

  });
}());
