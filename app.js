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




  //Add Realtime Listener
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

      // myEmail.innerText = emailPrint;
      emailShow.innerText = user_email;






      // all data of bottles

            //Product1
            var product_imgUrl = document.getElementById('product_imgUrl');
            console.log(product_imgUrl);
            var productName = document.getElementById('productName');
            var productPrice = document.getElementById('productPrice');

            // product Modal 1
            var Mproduct_imgUrl = document.getElementById('Mproduct_imgUrl');
            console.log(Mproduct_imgUrl);
            var MproductName = document.getElementById('MproductName');
            var MproductPrice = document.getElementById('MproductPrice');
            var MproductDes = document.getElementById('MproductDes');

            return firebase.database().ref('Products/500mlx1').once('value').then(function(snapshot) {
            var getImgUrl = snapshot.val().url;
            var getName = snapshot.val().product_name;
            var getPrice = snapshot.val().product_price;
            var getDes = snapshot.val().product_des;
            var getID = snapshot.val().product_ID;

            // ...
            Mproduct_imgUrl.src = getImgUrl;
            MproductName.innerText = getName;
            MproductPrice.innerText = "Rs." + getPrice + "";
            MproductDes.innerText = getDes;

            // ...
            product_imgUrl.src = getImgUrl;
            productName.innerText = getName;
            productPrice.innerText = "Rs." + getPrice + "";
            //Product1 ended
            //Cart work
            addToCart.addEventListener('click', e => {
              // Get email and pass
              // TODO: CHECK 4 REAL EMAILZ
              var user = firebase.auth().currentUser;
              var user_id = user.uid;

              return firebase.database().ref('Cart_TotalPrice/' + user_id).once('value').then(function(snapshot) {
                  var getProduct_TotalPrice = snapshot.val().product_TotalPrice;
                  console.log(getProduct_TotalPrice);
                  var getProduct_TotalPriceInt = parseInt(getProduct_TotalPrice);
                  console.log(getProduct_TotalPriceInt);


                  var getPriceInt = parseInt(getPrice);
                  console.log(getPriceInt);

                  if(getProduct_TotalPrice == "0"){

                          var data1 = {
                              product_TotalPrice: getPriceInt,
                          }

                          //cart
                          var data = {
                              product_ID: getID,
                              product_name: getName,
                              product_des: getDes,
                              product_price: getPrice,
                              url: getImgUrl
                          }

                          var updates = {};
                          updates['Cart/' + user_id + '/' + getID] = data;
                          updates['Cart_TotalPrice/' + user_id] = data1;

                          const promise = firebase.database().ref().update(updates);
                          console.log(getID);
                          // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
                          $('#myModal17').modal('show');
location.reload();
                          promise.catch(e => console.log(e.message));
                          //cart

                  }
                  else{
                          var total;
                          total = getProduct_TotalPriceInt + getPriceInt;

                          var data1 = {
                              product_TotalPrice: total,
                          }
                          // const promise = firebase.database().ref().update(updates);
                          //cart
                          var data = {
                              product_ID: getID,
                              product_name: getName,
                              product_des: getDes,
                              product_price: getPrice,
                              url: getImgUrl
                          }

                          var updates = {};
                          updates['Cart/' + user_id + '/' + getID] = data;
                          updates['Cart_TotalPrice/' + user_id] = data1;

                          const promise = firebase.database().ref().update(updates);
                          console.log(getID);
                          // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
                          $('#myModal17').modal('show');
location.reload();
                          promise.catch(e => console.log(e.message));
                          //cart

                  }
              });

            });
            //Cart work ended


            //Product2
            var product_imgUrl1 = document.getElementById('product_imgUrl1');
            console.log(product_imgUrl);
            var productName1 = document.getElementById('productName1');
            var productPrice1 = document.getElementById('productPrice1');

            // product Modal 2
            var Mproduct_imgUrl1 = document.getElementById('Mproduct_imgUrl1');
            console.log(Mproduct_imgUrl1);
            var MproductName1 = document.getElementById('MproductName1');
            var MproductPrice1 = document.getElementById('MproductPrice1');
            var MproductDes1 = document.getElementById('MproductDes1');

            return firebase.database().ref('Products/500mlx24').once('value').then(function(snapshot) {
            var getImgUrl = snapshot.val().url;
            var getName = snapshot.val().product_name;
            var getPrice = snapshot.val().product_price;
            var getDes = snapshot.val().product_des;
            var getID = snapshot.val().product_ID;

            // ...
            Mproduct_imgUrl1.src = getImgUrl;
            MproductName1.innerText = getName;
            MproductPrice1.innerText =  "Rs." + getPrice + "";
            MproductDes1.innerText = getDes;

            // ...
            product_imgUrl1.src = getImgUrl;
            productName1.innerText = getName;
            productPrice1.innerText =  "Rs." + getPrice + "";
            //Product2 ended
            //Cart work
            addToCart1.addEventListener('click', e => {
              // Get email and pass
              // TODO: CHECK 4 REAL EMAILZ
              var user = firebase.auth().currentUser;
              var user_id = user.uid;

              return firebase.database().ref('Cart_TotalPrice/' + user_id).once('value').then(function(snapshot) {
                  var getProduct_TotalPrice = snapshot.val().product_TotalPrice;
                  console.log(getProduct_TotalPrice);
                  var getProduct_TotalPriceInt = parseInt(getProduct_TotalPrice);
                  console.log(getProduct_TotalPriceInt);


                  var getPriceInt = parseInt(getPrice);
                  console.log(getPriceInt);

                  if(getProduct_TotalPrice == "0"){

                          var data1 = {
                              product_TotalPrice: getPriceInt,
                          }

                          //cart
                          var data = {
                              product_ID: getID,
                              product_name: getName,
                              product_des: getDes,
                              product_price: getPrice,
                              url: getImgUrl
                          }

                          var updates = {};
                          updates['Cart/' + user_id + '/' + getID] = data;
                          updates['Cart_TotalPrice/' + user_id] = data1;

                          const promise = firebase.database().ref().update(updates);
                          console.log(getID);
                          // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
                          $('#myModal17').modal('show');
location.reload();
                          promise.catch(e => console.log(e.message));
                          //cart

                  }
                  else{
                          var total;
                          total = getProduct_TotalPriceInt + getPriceInt;

                          var data1 = {
                              product_TotalPrice: total,
                          }
                          // const promise = firebase.database().ref().update(updates);
                          //cart
                          var data = {
                              product_ID: getID,
                              product_name: getName,
                              product_des: getDes,
                              product_price: getPrice,
                              url: getImgUrl
                          }

                          var updates = {};
                          updates['Cart/' + user_id + '/' + getID] = data;
                          updates['Cart_TotalPrice/' + user_id] = data1;

                          const promise = firebase.database().ref().update(updates);
                          console.log(getID);
                          // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
                          $('#myModal17').modal('show');
location.reload();
                          promise.catch(e => console.log(e.message));
                          //cart

                  }
              });

            });
            //Cart work ended

            //Product3
            var product_imgUrl2 = document.getElementById('product_imgUrl2');
            console.log(product_imgUrl);
            var productName2 = document.getElementById('productName2');
            var productPrice2 = document.getElementById('productPrice2');

            // product Modal 3
            var Mproduct_imgUrl2 = document.getElementById('Mproduct_imgUrl2');
            console.log(Mproduct_imgUrl2);
            var MproductName2 = document.getElementById('MproductName2');
            var MproductPrice2 = document.getElementById('MproductPrice2');
            var MproductDes2 = document.getElementById('MproductDes2');

            return firebase.database().ref('Products/15Lx1').once('value').then(function(snapshot) {
            var getImgUrl = snapshot.val().url;
            var getName = snapshot.val().product_name;
            var getPrice = snapshot.val().product_price;
            var getDes = snapshot.val().product_des;
            var getID = snapshot.val().product_ID;

            // ...
            Mproduct_imgUrl2.src = getImgUrl;
            MproductName2.innerText = getName;
            MproductPrice2.innerText =  "Rs." + getPrice + "";
            MproductDes2.innerText = getDes;

            // ...
            product_imgUrl2.src = getImgUrl;
            productName2.innerText = getName;
            productPrice2.innerText =  "Rs." + getPrice + "";
            //Product3 ended
            //Cart work
            addToCart2.addEventListener('click', e => {
              // Get email and pass
              // TODO: CHECK 4 REAL EMAILZ
              var user = firebase.auth().currentUser;
              var user_id = user.uid;

              return firebase.database().ref('Cart_TotalPrice/' + user_id).once('value').then(function(snapshot) {
                  var getProduct_TotalPrice = snapshot.val().product_TotalPrice;
                  console.log(getProduct_TotalPrice);
                  var getProduct_TotalPriceInt = parseInt(getProduct_TotalPrice);
                  console.log(getProduct_TotalPriceInt);


                  var getPriceInt = parseInt(getPrice);
                  console.log(getPriceInt);

                  if(getProduct_TotalPrice == "0"){

                          var data1 = {
                              product_TotalPrice: getPriceInt,
                          }

                          //cart
                          var data = {
                              product_ID: getID,
                              product_name: getName,
                              product_des: getDes,
                              product_price: getPrice,
                              url: getImgUrl
                          }

                          var updates = {};
                          updates['Cart/' + user_id + '/' + getID] = data;
                          updates['Cart_TotalPrice/' + user_id] = data1;

                          const promise = firebase.database().ref().update(updates);
                          console.log(getID);
                          // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
                          $('#myModal17').modal('show');
location.reload();
                          promise.catch(e => console.log(e.message));
                          //cart

                  }
                  else{
                          var total;
                          total = getProduct_TotalPriceInt + getPriceInt;

                          var data1 = {
                              product_TotalPrice: total,
                          }
                          // const promise = firebase.database().ref().update(updates);
                          //cart
                          var data = {
                              product_ID: getID,
                              product_name: getName,
                              product_des: getDes,
                              product_price: getPrice,
                              url: getImgUrl
                          }

                          var updates = {};
                          updates['Cart/' + user_id + '/' + getID] = data;
                          updates['Cart_TotalPrice/' + user_id] = data1;

                          const promise = firebase.database().ref().update(updates);
                          console.log(getID);
                          // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
                          $('#myModal17').modal('show');
location.reload();
                          promise.catch(e => console.log(e.message));
                          //cart

                  }
              });

            });
            //Cart work ended

            //Product4
            var product_imgUrl3 = document.getElementById('product_imgUrl3');
            console.log(product_imgUrl);
            var productName3 = document.getElementById('productName3');
            var productPrice3 = document.getElementById('productPrice3');

            // product Modal 3
            var Mproduct_imgUrl3 = document.getElementById('Mproduct_imgUrl3');
            console.log(Mproduct_imgUrl3);
            var MproductName3 = document.getElementById('MproductName3');
            var MproductPrice3 = document.getElementById('MproductPrice3');
            var MproductDes3 = document.getElementById('MproductDes3');

            return firebase.database().ref('Products/15Lx6').once('value').then(function(snapshot) {
            var getImgUrl = snapshot.val().url;
            var getName = snapshot.val().product_name;
            var getPrice = snapshot.val().product_price;
            var getDes = snapshot.val().product_des;
            var getID = snapshot.val().product_ID;

            // ...
            Mproduct_imgUrl3.src = getImgUrl;
            MproductName3.innerText = getName;
            MproductPrice3.innerText = "Rs." + getPrice + "";
            MproductDes3.innerText = getDes;

            // ...
            product_imgUrl3.src = getImgUrl;
            productName3.innerText = getName;
            productPrice3.innerText = "Rs." + getPrice + "";
            //Product4 ended
            //Cart work
            addToCart3.addEventListener('click', e => {
              // Get email and pass
              // TODO: CHECK 4 REAL EMAILZ
              var user = firebase.auth().currentUser;
              var user_id = user.uid;

              return firebase.database().ref('Cart_TotalPrice/' + user_id).once('value').then(function(snapshot) {
                  var getProduct_TotalPrice = snapshot.val().product_TotalPrice;
                  console.log(getProduct_TotalPrice);
                  var getProduct_TotalPriceInt = parseInt(getProduct_TotalPrice);
                  console.log(getProduct_TotalPriceInt);


                  var getPriceInt = parseInt(getPrice);
                  console.log(getPriceInt);

                  if(getProduct_TotalPrice == "0"){

                          var data1 = {
                              product_TotalPrice: getPriceInt,
                          }

                          //cart
                          var data = {
                              product_ID: getID,
                              product_name: getName,
                              product_des: getDes,
                              product_price: getPrice,
                              url: getImgUrl
                          }

                          var updates = {};
                          updates['Cart/' + user_id + '/' + getID] = data;
                          updates['Cart_TotalPrice/' + user_id] = data1;

                          const promise = firebase.database().ref().update(updates);
                          console.log(getID);
                          // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
                          $('#myModal17').modal('show');
location.reload();
                          promise.catch(e => console.log(e.message));
                          //cart

                  }
                  else{
                          var total;
                          total = getProduct_TotalPriceInt + getPriceInt;

                          var data1 = {
                              product_TotalPrice: total,
                          }
                          // const promise = firebase.database().ref().update(updates);
                          //cart
                          var data = {
                              product_ID: getID,
                              product_name: getName,
                              product_des: getDes,
                              product_price: getPrice,
                              url: getImgUrl
                          }

                          var updates = {};
                          updates['Cart/' + user_id + '/' + getID] = data;
                          updates['Cart_TotalPrice/' + user_id] = data1;

                          const promise = firebase.database().ref().update(updates);
                          console.log(getID);
                          // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
                          $('#myModal17').modal('show');
                          location.reload();
                          promise.catch(e => console.log(e.message));
                          //cart

                  }
              });

            });
            //Cart work ended

            //Product5
            var product_imgUrl4 = document.getElementById('product_imgUrl4');
            console.log(product_imgUrl);
            var productName4 = document.getElementById('productName4');
            var productPrice4 = document.getElementById('productPrice4');

            // product Modal 4
            var Mproduct_imgUrl4 = document.getElementById('Mproduct_imgUrl4');
            console.log(Mproduct_imgUrl4);
            var MproductName4 = document.getElementById('MproductName4');
            var MproductPrice4 = document.getElementById('MproductPrice4');
            var MproductDes4 = document.getElementById('MproductDes4');

            return firebase.database().ref('Products/15Lx30').once('value').then(function(snapshot) {
            var getImgUrl = snapshot.val().url;
            var getName = snapshot.val().product_name;
            var getPrice = snapshot.val().product_price;
            var getDes = snapshot.val().product_des;
            var getID = snapshot.val().product_ID;

            // ...
            Mproduct_imgUrl4.src = getImgUrl;
            MproductName4.innerText = getName;
            MproductPrice4.innerText = "Rs." + getPrice + "";
            MproductDes4.innerText = getDes;

            // ...
            product_imgUrl4.src = getImgUrl;
            productName4.innerText = getName;
            productPrice4.innerText = "Rs." + getPrice + "";
            //Product5 ended
            //Cart work
            addToCart4.addEventListener('click', e => {
              // Get email and pass
              // TODO: CHECK 4 REAL EMAILZ
              var user = firebase.auth().currentUser;
              var user_id = user.uid;

              return firebase.database().ref('Cart_TotalPrice/' + user_id).once('value').then(function(snapshot) {
                  var getProduct_TotalPrice = snapshot.val().product_TotalPrice;
                  console.log(getProduct_TotalPrice);
                  var getProduct_TotalPriceInt = parseInt(getProduct_TotalPrice);
                  console.log(getProduct_TotalPriceInt);


                  var getPriceInt = parseInt(getPrice);
                  console.log(getPriceInt);

                  if(getProduct_TotalPrice == "0"){

                          var data1 = {
                              product_TotalPrice: getPriceInt,
                          }

                          //cart
                          var data = {
                              product_ID: getID,
                              product_name: getName,
                              product_des: getDes,
                              product_price: getPrice,
                              url: getImgUrl
                          }

                          var updates = {};
                          updates['Cart/' + user_id + '/' + getID] = data;
                          updates['Cart_TotalPrice/' + user_id] = data1;

                          const promise = firebase.database().ref().update(updates);
                          console.log(getID);
                          // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
                          $('#myModal17').modal('show');
location.reload();
                          promise.catch(e => console.log(e.message));
                          //cart

                  }
                  else{
                          var total;
                          total = getProduct_TotalPriceInt + getPriceInt;

                          var data1 = {
                              product_TotalPrice: total,
                          }
                          // const promise = firebase.database().ref().update(updates);
                          //cart
                          var data = {
                              product_ID: getID,
                              product_name: getName,
                              product_des: getDes,
                              product_price: getPrice,
                              url: getImgUrl
                          }

                          var updates = {};
                          updates['Cart/' + user_id + '/' + getID] = data;
                          updates['Cart_TotalPrice/' + user_id] = data1;

                          const promise = firebase.database().ref().update(updates);
                          console.log(getID);
                          // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
                          $('#myModal17').modal('show');
location.reload();
                          promise.catch(e => console.log(e.message));
                          //cart

                  }
              });

            });
            //Cart work ended

            //Product6
            var product_imgUrl5 = document.getElementById('product_imgUrl5');
            console.log(product_imgUrl);
            var productName5 = document.getElementById('productName5');
            var productPrice5 = document.getElementById('productPrice5');

            // product Modal 5
            var Mproduct_imgUrl5 = document.getElementById('Mproduct_imgUrl5');
            console.log(Mproduct_imgUrl5);
            var MproductName5 = document.getElementById('MproductName5');
            var MproductPrice5 = document.getElementById('MproductPrice5');
            var MproductDes5 = document.getElementById('MproductDes5');

            return firebase.database().ref('Products/6Lx1').once('value').then(function(snapshot) {
            var getImgUrl = snapshot.val().url;
            var getName = snapshot.val().product_name;
            var getPrice = snapshot.val().product_price;
            var getDes = snapshot.val().product_des;
            var getID = snapshot.val().product_ID;

            // ...
            Mproduct_imgUrl5.src = getImgUrl;
            MproductName5.innerText = getName;
            MproductPrice5.innerText = "Rs." + getPrice + "";
            MproductDes5.innerText = getDes;

            // ...
            product_imgUrl5.src = getImgUrl;
            productName5.innerText = getName;
            productPrice5.innerText =  "Rs." + getPrice + "";
            //Product6 ended
            //Cart work
            addToCart5.addEventListener('click', e => {
              // Get email and pass
              // TODO: CHECK 4 REAL EMAILZ
              var user = firebase.auth().currentUser;
              var user_id = user.uid;

              return firebase.database().ref('Cart_TotalPrice/' + user_id).once('value').then(function(snapshot) {
                  var getProduct_TotalPrice = snapshot.val().product_TotalPrice;
                  console.log(getProduct_TotalPrice);
                  var getProduct_TotalPriceInt = parseInt(getProduct_TotalPrice);
                  console.log(getProduct_TotalPriceInt);


                  var getPriceInt = parseInt(getPrice);
                  console.log(getPriceInt);

                  if(getProduct_TotalPrice == "0"){

                          var data1 = {
                              product_TotalPrice: getPriceInt,
                          }

                          //cart
                          var data = {
                              product_ID: getID,
                              product_name: getName,
                              product_des: getDes,
                              product_price: getPrice,
                              url: getImgUrl
                          }

                          var updates = {};
                          updates['Cart/' + user_id + '/' + getID] = data;
                          updates['Cart_TotalPrice/' + user_id] = data1;

                          const promise = firebase.database().ref().update(updates);
                          console.log(getID);
                          // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
                          $('#myModal17').modal('show');
location.reload();
                          promise.catch(e => console.log(e.message));
                          //cart

                  }
                  else{
                          var total;
                          total = getProduct_TotalPriceInt + getPriceInt;

                          var data1 = {
                              product_TotalPrice: total,
                          }
                          // const promise = firebase.database().ref().update(updates);
                          //cart
                          var data = {
                              product_ID: getID,
                              product_name: getName,
                              product_des: getDes,
                              product_price: getPrice,
                              url: getImgUrl
                          }

                          var updates = {};
                          updates['Cart/' + user_id + '/' + getID] = data;
                          updates['Cart_TotalPrice/' + user_id] = data1;

                          const promise = firebase.database().ref().update(updates);
                          console.log(getID);
                          // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
                          $('#myModal17').modal('show');
location.reload();
                          promise.catch(e => console.log(e.message));
                          //cart

                  }
              });

            });
            //Cart work ended

            //Product7
            var product_imgUrl6 = document.getElementById('product_imgUrl6');
            console.log(product_imgUrl);
            var productName6 = document.getElementById('productName6');
            var productPrice6 = document.getElementById('productPrice6');

            // product Modal 6
            var Mproduct_imgUrl6 = document.getElementById('Mproduct_imgUrl6');
            console.log(Mproduct_imgUrl6);
            var MproductName6 = document.getElementById('MproductName6');
            var MproductPrice6 = document.getElementById('MproductPrice6');
            var MproductDes6 = document.getElementById('MproductDes6');

            return firebase.database().ref('Products/6Lx5').once('value').then(function(snapshot) {
            var getImgUrl = snapshot.val().url;
            var getName = snapshot.val().product_name;
            var getPrice = snapshot.val().product_price;
            var getDes = snapshot.val().product_des;
            var getID = snapshot.val().product_ID;

            // ...
            Mproduct_imgUrl6.src = getImgUrl;
            MproductName6.innerText = getName;
            MproductPrice6.innerText = "Rs." + getPrice + "";
            MproductDes6.innerText = getDes;

            // ...
            product_imgUrl6.src = getImgUrl;
            productName6.innerText = getName;
            productPrice6.innerText = "Rs." + getPrice + "";
            //Product7 ended
            //Cart work
            addToCart6.addEventListener('click', e => {
              // Get email and pass
              // TODO: CHECK 4 REAL EMAILZ
              var user = firebase.auth().currentUser;
              var user_id = user.uid;

              return firebase.database().ref('Cart_TotalPrice/' + user_id).once('value').then(function(snapshot) {
                  var getProduct_TotalPrice = snapshot.val().product_TotalPrice;
                  console.log(getProduct_TotalPrice);
                  var getProduct_TotalPriceInt = parseInt(getProduct_TotalPrice);
                  console.log(getProduct_TotalPriceInt);


                  var getPriceInt = parseInt(getPrice);
                  console.log(getPriceInt);

                  if(getProduct_TotalPrice == "0"){

                          var data1 = {
                              product_TotalPrice: getPriceInt,
                          }

                          //cart
                          var data = {
                              product_ID: getID,
                              product_name: getName,
                              product_des: getDes,
                              product_price: getPrice,
                              url: getImgUrl
                          }

                          var updates = {};
                          updates['Cart/' + user_id + '/' + getID] = data;
                          updates['Cart_TotalPrice/' + user_id] = data1;

                          const promise = firebase.database().ref().update(updates);
                          console.log(getID);
                          // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
                          $('#myModal17').modal('show');
location.reload();
                          promise.catch(e => console.log(e.message));
                          //cart

                  }
                  else{
                          var total;
                          total = getProduct_TotalPriceInt + getPriceInt;

                          var data1 = {
                              product_TotalPrice: total,
                          }
                          // const promise = firebase.database().ref().update(updates);
                          //cart
                          var data = {
                              product_ID: getID,
                              product_name: getName,
                              product_des: getDes,
                              product_price: getPrice,
                              url: getImgUrl
                          }

                          var updates = {};
                          updates['Cart/' + user_id + '/' + getID] = data;
                          updates['Cart_TotalPrice/' + user_id] = data1;

                          const promise = firebase.database().ref().update(updates);
                          console.log(getID);
                          // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
                          $('#myModal17').modal('show');
location.reload();
                          promise.catch(e => console.log(e.message));
                          //cart

                  }
              });

            });
            //Cart work ended

            //Product8
            var product_imgUrl7 = document.getElementById('product_imgUrl7');
            console.log(product_imgUrl);
            var productName7 = document.getElementById('productName7');
            var productPrice7 = document.getElementById('productPrice7');

            // product Modal 7
            var Mproduct_imgUrl7 = document.getElementById('Mproduct_imgUrl7');
            console.log(Mproduct_imgUrl7);
            var MproductName7 = document.getElementById('MproductName7');
            var MproductPrice7 = document.getElementById('MproductPrice7');
            var MproductDes7 = document.getElementById('MproductDes7');

            return firebase.database().ref('Products/6Lx10').once('value').then(function(snapshot) {
            var getImgUrl = snapshot.val().url;
            var getName = snapshot.val().product_name;
            var getPrice = snapshot.val().product_price;
            var getDes = snapshot.val().product_des;
            var getID = snapshot.val().product_ID;

            // ...
            Mproduct_imgUrl7.src = getImgUrl;
            MproductName7.innerText = getName;
            MproductPrice7.innerText = "Rs." + getPrice + "";
            MproductDes7.innerText = getDes;

            // ...
            product_imgUrl7.src = getImgUrl;
            productName7.innerText = getName;
            productPrice7.innerText = "Rs." + getPrice + "";
            //Product8 ended
            //Cart work
            addToCart7.addEventListener('click', e => {
              // Get email and pass
              // TODO: CHECK 4 REAL EMAILZ
              var user = firebase.auth().currentUser;
              var user_id = user.uid;

              return firebase.database().ref('Cart_TotalPrice/' + user_id).once('value').then(function(snapshot) {
                  var getProduct_TotalPrice = snapshot.val().product_TotalPrice;
                  console.log(getProduct_TotalPrice);
                  var getProduct_TotalPriceInt = parseInt(getProduct_TotalPrice);
                  console.log(getProduct_TotalPriceInt);


                  var getPriceInt = parseInt(getPrice);
                  console.log(getPriceInt);

                  if(getProduct_TotalPrice == "0"){

                          var data1 = {
                              product_TotalPrice: getPriceInt,
                          }

                          //cart
                          var data = {
                              product_ID: getID,
                              product_name: getName,
                              product_des: getDes,
                              product_price: getPrice,
                              url: getImgUrl
                          }

                          var updates = {};
                          updates['Cart/' + user_id + '/' + getID] = data;
                          updates['Cart_TotalPrice/' + user_id] = data1;

                          const promise = firebase.database().ref().update(updates);
                          console.log(getID);
                          // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
                          $('#myModal17').modal('show');
location.reload();
                          promise.catch(e => console.log(e.message));
                          //cart

                  }
                  else{
                          var total;
                          total = getProduct_TotalPriceInt + getPriceInt;

                          var data1 = {
                              product_TotalPrice: total,
                          }
                          // const promise = firebase.database().ref().update(updates);
                          //cart
                          var data = {
                              product_ID: getID,
                              product_name: getName,
                              product_des: getDes,
                              product_price: getPrice,
                              url: getImgUrl
                          }

                          var updates = {};
                          updates['Cart/' + user_id + '/' + getID] = data;
                          updates['Cart_TotalPrice/' + user_id] = data1;

                          const promise = firebase.database().ref().update(updates);
                          console.log(getID);
                          // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
                          $('#myModal17').modal('show');
location.reload();
                          promise.catch(e => console.log(e.message));
                          //cart

                  }
              });

            });
            //Cart work ended

            //Product9
            var product_imgUrl8 = document.getElementById('product_imgUrl8');
            console.log(product_imgUrl);
            var productName8 = document.getElementById('productName8');
            var productPrice8 = document.getElementById('productPrice8');

            // product Modal 1
            var Mproduct_imgUrl8 = document.getElementById('Mproduct_imgUrl8');
            console.log(Mproduct_imgUrl8);
            var MproductName8 = document.getElementById('MproductName8');
            var MproductPrice8 = document.getElementById('MproductPrice8');
            var MproductDes8 = document.getElementById('MproductDes8');

            return firebase.database().ref('Products/19Lx1').once('value').then(function(snapshot) {
            var getImgUrl = snapshot.val().url;
            var getName = snapshot.val().product_name;
            var getPrice = snapshot.val().product_price;
            var getDes = snapshot.val().product_des;
            var getID = snapshot.val().product_ID;

            // ...
            Mproduct_imgUrl8.src = getImgUrl;
            MproductName8.innerText = getName;
            MproductPrice8.innerText = "Rs." + getPrice + "";
            MproductDes8.innerText = getDes;

            // ...
            product_imgUrl8.src = getImgUrl;
            productName8.innerText = getName;
            productPrice8.innerText = "Rs." + getPrice + "";
            //Product9 ended
            //Cart work
            addToCart8.addEventListener('click', e => {
              // Get email and pass
              // TODO: CHECK 4 REAL EMAILZ
              var user = firebase.auth().currentUser;
              var user_id = user.uid;

              return firebase.database().ref('Cart_TotalPrice/' + user_id).once('value').then(function(snapshot) {
                  var getProduct_TotalPrice = snapshot.val().product_TotalPrice;
                  console.log(getProduct_TotalPrice);
                  var getProduct_TotalPriceInt = parseInt(getProduct_TotalPrice);
                  console.log(getProduct_TotalPriceInt);


                  var getPriceInt = parseInt(getPrice);
                  console.log(getPriceInt);

                  if(getProduct_TotalPrice == "0"){

                          var data1 = {
                              product_TotalPrice: getPriceInt,
                          }

                          //cart
                          var data = {
                              product_ID: getID,
                              product_name: getName,
                              product_des: getDes,
                              product_price: getPrice,
                              url: getImgUrl
                          }

                          var updates = {};
                          updates['Cart/' + user_id + '/' + getID] = data;
                          updates['Cart_TotalPrice/' + user_id] = data1;

                          const promise = firebase.database().ref().update(updates);
                          console.log(getID);
                          // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
                          $('#myModal17').modal('show');
location.reload();
                          promise.catch(e => console.log(e.message));
                          //cart

                  }
                  else{
                          var total;
                          total = getProduct_TotalPriceInt + getPriceInt;

                          var data1 = {
                              product_TotalPrice: total,
                          }
                          // const promise = firebase.database().ref().update(updates);
                          //cart
                          var data = {
                              product_ID: getID,
                              product_name: getName,
                              product_des: getDes,
                              product_price: getPrice,
                              url: getImgUrl
                          }

                          var updates = {};
                          updates['Cart/' + user_id + '/' + getID] = data;
                          updates['Cart_TotalPrice/' + user_id] = data1;

                          const promise = firebase.database().ref().update(updates);
                          console.log(getID);
                          // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
                          $('#myModal17').modal('show');
location.reload();
                          promise.catch(e => console.log(e.message));
                          //cart

                  }
              });

            });
            //Cart work ended

            //Product10
            var product_imgUrl9 = document.getElementById('product_imgUrl9');
            console.log(product_imgUrl);
            var productName9 = document.getElementById('productName9');
            var productPrice9 = document.getElementById('productPrice9');

            // product Modal 1
            var Mproduct_imgUrl9 = document.getElementById('Mproduct_imgUrl9');
            console.log(Mproduct_imgUrl9);
            var MproductName9 = document.getElementById('MproductName9');
            var MproductPrice9 = document.getElementById('MproductPrice9');
            var MproductDes9 = document.getElementById('MproductDes9');

            return firebase.database().ref('Products/19Lx5').once('value').then(function(snapshot) {
            var getImgUrl = snapshot.val().url;
            var getName = snapshot.val().product_name;
            var getPrice = snapshot.val().product_price;
            var getDes = snapshot.val().product_des;
            var getID = snapshot.val().product_ID;

            // ...
            Mproduct_imgUrl9.src = getImgUrl;
            MproductName9.innerText = getName;
            MproductPrice9.innerText = "Rs." + getPrice + "";
            MproductDes9.innerText = getDes;

            // ...
            product_imgUrl9.src = getImgUrl;
            productName9.innerText = getName;
            productPrice9.innerText = "Rs." + getPrice + "";
            //Product10 ended

            //Cart work
            addToCart9.addEventListener('click', e => {
              // Get email and pass
              // TODO: CHECK 4 REAL EMAILZ
              var user = firebase.auth().currentUser;
              var user_id = user.uid;

              return firebase.database().ref('Cart_TotalPrice/' + user_id).once('value').then(function(snapshot) {
                  var getProduct_TotalPrice = snapshot.val().product_TotalPrice;
                  console.log(getProduct_TotalPrice);
                  var getProduct_TotalPriceInt = parseInt(getProduct_TotalPrice);
                  console.log(getProduct_TotalPriceInt);

                  var getPriceInt = parseInt(getPrice);
                  console.log(getPriceInt);

                  if(getProduct_TotalPrice == "0"){

                          var data1 = {
                              product_TotalPrice: getPriceInt,
                          }

                          //cart
                          var data = {
                              product_ID: getID,
                              product_name: getName,
                              product_des: getDes,
                              product_price: getPrice,
                              url: getImgUrl
                          }

                          var updates = {};
                          updates['Cart/' + user_id + '/' + getID] = data;
                          updates['Cart_TotalPrice/' + user_id] = data1;

                          const promise = firebase.database().ref().update(updates);
                          console.log(getID);
                          // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
                          $('#myModal17').modal('show');
location.reload();
                          promise.catch(e => console.log(e.message));
                          //cart

                  }
                  else{
                          var total;
                          total = getProduct_TotalPriceInt + getPriceInt;

                          var data1 = {
                              product_TotalPrice: total,
                          }
                          // const promise = firebase.database().ref().update(updates);
                          //cart
                          var data = {
                              product_ID: getID,
                              product_name: getName,
                              product_des: getDes,
                              product_price: getPrice,
                              url: getImgUrl
                          }

                          var updates = {};
                          updates['Cart/' + user_id + '/' + getID] = data;
                          updates['Cart_TotalPrice/' + user_id] = data1;

                          const promise = firebase.database().ref().update(updates);
                          console.log(getID);
                          // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
                          $('#myModal17').modal('show');
location.reload();
                          promise.catch(e => console.log(e.message));
                          //cart

                  }
              });

            });
            //Cart work ended


            //Product11
            var product_imgUrl10 = document.getElementById('product_imgUrl10');
            console.log(product_imgUrl);
            var productName10 = document.getElementById('productName10');
            var productPrice10 = document.getElementById('productPrice10');

            // product Modal 10
            var Mproduct_imgUrl10 = document.getElementById('Mproduct_imgUrl10');
            console.log(Mproduct_imgUrl10);
            var MproductName10 = document.getElementById('MproductName10');
            var MproductPrice10 = document.getElementById('MproductPrice10');
            var MproductDes10 = document.getElementById('MproductDes10');

            return firebase.database().ref('Products/19Lx10').once('value').then(function(snapshot) {
            var getImgUrl = snapshot.val().url;
            var getName = snapshot.val().product_name;
            var getPrice = snapshot.val().product_price;
            var getDes = snapshot.val().product_des;
            var getID = snapshot.val().product_ID;

            var getPriceInt = parseInt(getPrice);



            // ...
            Mproduct_imgUrl10.src = getImgUrl;
            MproductName10.innerText = getName;
            MproductPrice10.innerText = "Rs." + getPrice + "";
            MproductDes10.innerText = getDes;

            // ...
            product_imgUrl10.src = getImgUrl;
            productName10.innerText = getName;
            productPrice10.innerText = "Rs." + getPrice + "";
            //Product11 ended

            //cart price & quantity
            return firebase.database().ref('Cart_TotalPrice/' + user_id).once('value').then(function(snapshot) {
              var getProduct_TotalPrice = snapshot.val().product_TotalPrice;
              console.log(getProduct_TotalPrice);
              var cartPrice = document.getElementById('cartPrice');
              cartPrice.innerText = "Rs." + getProduct_TotalPrice + "";
              //cart quantity
              return firebase.database().ref('Cart/' + user_id).once('value').then(function(snapshot) {
                var getTotalQuantity = snapshot.numChildren();
                var cartPrice = document.getElementById('cartQuantity');
                console.log("There are "+snapshot.numChildren()+" messages");
                cartQuantity.innerText = getTotalQuantity;

                return firebase.database().ref('user_notify/0YM11G2VAJXsW4gDmXUWwbiGnPf1/').once('value').then(function(snapshot) {
                 var getDate = snapshot.val().date;
                 var getTime = snapshot.val().time;
                 var getDman = snapshot.val().driver_name;

                 console.log('hello dear');
                 user_notify.innerText = 'Your order will be delivered on this: "' + getTime + '" time and on this: "' + getDate + '" date by our dilevery man: "' + getDman + '"';
                 });
              });
              //cart quantity
            });
            //cart price & quantity


                  //Cart work
                  addToCart10.addEventListener('click', e => {
                    // Get email and pass
                    // TODO: CHECK 4 REAL EMAILZ
                    var user = firebase.auth().currentUser;
                    var user_id = user.uid;

                    return firebase.database().ref('Cart_TotalPrice/' + user_id).once('value').then(function(snapshot) {
                        var getProduct_TotalPrice = snapshot.val().product_TotalPrice;
                        console.log(getProduct_TotalPrice);
                        var getProduct_TotalPriceInt = parseInt(getProduct_TotalPrice);
                        console.log(getProduct_TotalPriceInt);


                        var getPriceInt = parseInt(getPrice);
                        console.log(getPriceInt);

                        if(getProduct_TotalPrice == "0"){

                                var data1 = {
                                    product_TotalPrice: getPriceInt,
                                }

                                //cart
                                var data = {
                                    product_ID: getID,
                                    product_name: getName,
                                    product_des: getDes,
                                    product_price: getPrice,
                                    url: getImgUrl
                                }

                                var updates = {};
                                updates['Cart/' + user_id + '/' + getID] = data;
                                updates['Cart_TotalPrice/' + user_id] = data1;

                                const promise = firebase.database().ref().update(updates);
                                console.log(getID);
                                // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
                                $('#myModal17').modal('show');
location.reload();
                                promise.catch(e => console.log(e.message));
                                //cart

                        }
                        else{
                                var total;
                                total = getProduct_TotalPriceInt + getPriceInt;

                                var data1 = {
                                    product_TotalPrice: total,
                                }
                                // const promise = firebase.database().ref().update(updates);
                                //cart
                                var data = {
                                    product_ID: getID,
                                    product_name: getName,
                                    product_des: getDes,
                                    product_price: getPrice,
                                    url: getImgUrl
                                }

                                var updates = {};
                                updates['Cart/' + user_id + '/' + getID] = data;
                                updates['Cart_TotalPrice/' + user_id] = data1;

                                const promise = firebase.database().ref().update(updates);
                                console.log(getID);
                                // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
                                $('#myModal17').modal('show');
location.reload();
                                promise.catch(e => console.log(e.message));
                                //cart

                        }




                    });

                  });
                  //Cart work ended

                                });//11th return node
                              });//10th return node
                            });//9th return node
                          });//8th return node
                        });//7th return node
                      });//6th return node
                    });//5th return node
                  });//4th return node
                });//3rd return node
              });//2nd return node
            }); //first return node

      // all data of bottles ended
      // //productRead
      // var product_imgUrl = document.getElementById('product_imgUrl');
      // console.log(product_imgUrl);
      // var productName = document.getElementById('productName');
      // var productPrice = document.getElementById('productPrice');
      //
      //
      //
      // return firebase.database().ref('Products/500mlx1').once('value').then(function(snapshot) {
      // var getImgUrl = snapshot.val().url;
      // var getName = snapshot.val().product_name;
      // var getPrice = snapshot.val().product_price;
      //
      // // ...
      // product_imgUrl.src = getImgUrl;
      // productName.innerText = getName;
      // productPrice.innerText = getPrice;
      //
      // });
      //
      // //productRead

    }else {



      console.log('not logged in');
      $('#w3l_login1').show();
      $('#w3l_login2').hide();

// all data of bottles

      //Product1
      var product_imgUrl = document.getElementById('product_imgUrl');
      console.log(product_imgUrl);
      var productName = document.getElementById('productName');
      var productPrice = document.getElementById('productPrice');

      // product Modal 1
      var Mproduct_imgUrl = document.getElementById('Mproduct_imgUrl');
      console.log(Mproduct_imgUrl);
      var MproductName = document.getElementById('MproductName');
      var MproductPrice = document.getElementById('MproductPrice');
      var MproductDes = document.getElementById('MproductDes');

      return firebase.database().ref('Products/500mlx1').once('value').then(function(snapshot) {
      var getImgUrl = snapshot.val().url;
      var getName = snapshot.val().product_name;
      var getPrice = snapshot.val().product_price;
      var getDes = snapshot.val().product_des;

      // ...
      Mproduct_imgUrl.src = getImgUrl;
      MproductName.innerText = getName;
      MproductPrice.innerText = getPrice;
      MproductDes.innerText = getDes;

      // ...
      product_imgUrl.src = getImgUrl;
      productName.innerText = getName;
      productPrice.innerText = getPrice;
      //Product1 ended


      //Product2
      var product_imgUrl1 = document.getElementById('product_imgUrl1');
      console.log(product_imgUrl);
      var productName1 = document.getElementById('productName1');
      var productPrice1 = document.getElementById('productPrice1');

      // product Modal 2
      var Mproduct_imgUrl1 = document.getElementById('Mproduct_imgUrl1');
      console.log(Mproduct_imgUrl1);
      var MproductName1 = document.getElementById('MproductName1');
      var MproductPrice1 = document.getElementById('MproductPrice1');
      var MproductDes1 = document.getElementById('MproductDes1');

      return firebase.database().ref('Products/500mlx24').once('value').then(function(snapshot) {
      var getImgUrl = snapshot.val().url;
      var getName = snapshot.val().product_name;
      var getPrice = snapshot.val().product_price;
      var getDes = snapshot.val().product_des;

      // ...
      Mproduct_imgUrl1.src = getImgUrl;
      MproductName1.innerText = getName;
      MproductPrice1.innerText = getPrice;
      MproductDes1.innerText = getDes;

      // ...
      product_imgUrl1.src = getImgUrl;
      productName1.innerText = getName;
      productPrice1.innerText = getPrice;
      //Product2 ended

      //Product3
      var product_imgUrl2 = document.getElementById('product_imgUrl2');
      console.log(product_imgUrl);
      var productName2 = document.getElementById('productName2');
      var productPrice2 = document.getElementById('productPrice2');

      // product Modal 3
      var Mproduct_imgUrl2 = document.getElementById('Mproduct_imgUrl2');
      console.log(Mproduct_imgUrl2);
      var MproductName2 = document.getElementById('MproductName2');
      var MproductPrice2 = document.getElementById('MproductPrice2');
      var MproductDes2 = document.getElementById('MproductDes2');

      return firebase.database().ref('Products/15Lx1').once('value').then(function(snapshot) {
      var getImgUrl = snapshot.val().url;
      var getName = snapshot.val().product_name;
      var getPrice = snapshot.val().product_price;
      var getDes = snapshot.val().product_des;

      // ...
      Mproduct_imgUrl2.src = getImgUrl;
      MproductName2.innerText = getName;
      MproductPrice2.innerText = getPrice;
      MproductDes2.innerText = getDes;

      // ...
      product_imgUrl2.src = getImgUrl;
      productName2.innerText = getName;
      productPrice2.innerText = getPrice;
      //Product3 ended

      //Product4
      var product_imgUrl3 = document.getElementById('product_imgUrl3');
      console.log(product_imgUrl);
      var productName3 = document.getElementById('productName3');
      var productPrice3 = document.getElementById('productPrice3');

      // product Modal 3
      var Mproduct_imgUrl3 = document.getElementById('Mproduct_imgUrl3');
      console.log(Mproduct_imgUrl3);
      var MproductName3 = document.getElementById('MproductName3');
      var MproductPrice3 = document.getElementById('MproductPrice3');
      var MproductDes3 = document.getElementById('MproductDes3');

      return firebase.database().ref('Products/15Lx6').once('value').then(function(snapshot) {
      var getImgUrl = snapshot.val().url;
      var getName = snapshot.val().product_name;
      var getPrice = snapshot.val().product_price;
      var getDes = snapshot.val().product_des;

      // ...
      Mproduct_imgUrl3.src = getImgUrl;
      MproductName3.innerText = getName;
      MproductPrice3.innerText = getPrice;
      MproductDes3.innerText = getDes;

      // ...
      product_imgUrl3.src = getImgUrl;
      productName3.innerText = getName;
      productPrice3.innerText = getPrice;
      //Product4 ended

      //Product5
      var product_imgUrl4 = document.getElementById('product_imgUrl4');
      console.log(product_imgUrl);
      var productName4 = document.getElementById('productName4');
      var productPrice4 = document.getElementById('productPrice4');

      // product Modal 4
      var Mproduct_imgUrl4 = document.getElementById('Mproduct_imgUrl4');
      console.log(Mproduct_imgUrl4);
      var MproductName4 = document.getElementById('MproductName4');
      var MproductPrice4 = document.getElementById('MproductPrice4');
      var MproductDes4 = document.getElementById('MproductDes4');

      return firebase.database().ref('Products/15Lx30').once('value').then(function(snapshot) {
      var getImgUrl = snapshot.val().url;
      var getName = snapshot.val().product_name;
      var getPrice = snapshot.val().product_price;
      var getDes = snapshot.val().product_des;

      // ...
      Mproduct_imgUrl4.src = getImgUrl;
      MproductName4.innerText = getName;
      MproductPrice4.innerText = getPrice;
      MproductDes4.innerText = getDes;

      // ...
      product_imgUrl4.src = getImgUrl;
      productName4.innerText = getName;
      productPrice4.innerText = getPrice;
      //Product5 ended

      //Product6
      var product_imgUrl5 = document.getElementById('product_imgUrl5');
      console.log(product_imgUrl);
      var productName5 = document.getElementById('productName5');
      var productPrice5 = document.getElementById('productPrice5');

      // product Modal 5
      var Mproduct_imgUrl5 = document.getElementById('Mproduct_imgUrl5');
      console.log(Mproduct_imgUrl5);
      var MproductName5 = document.getElementById('MproductName5');
      var MproductPrice5 = document.getElementById('MproductPrice5');
      var MproductDes5 = document.getElementById('MproductDes5');

      return firebase.database().ref('Products/6Lx1').once('value').then(function(snapshot) {
      var getImgUrl = snapshot.val().url;
      var getName = snapshot.val().product_name;
      var getPrice = snapshot.val().product_price;
      var getDes = snapshot.val().product_des;

      // ...
      Mproduct_imgUrl5.src = getImgUrl;
      MproductName5.innerText = getName;
      MproductPrice5.innerText = getPrice;
      MproductDes5.innerText = getDes;

      // ...
      product_imgUrl5.src = getImgUrl;
      productName5.innerText = getName;
      productPrice5.innerText = getPrice;
      //Product6 ended

      //Product7
      var product_imgUrl6 = document.getElementById('product_imgUrl6');
      console.log(product_imgUrl);
      var productName6 = document.getElementById('productName6');
      var productPrice6 = document.getElementById('productPrice6');

      // product Modal 6
      var Mproduct_imgUrl6 = document.getElementById('Mproduct_imgUrl6');
      console.log(Mproduct_imgUrl6);
      var MproductName6 = document.getElementById('MproductName6');
      var MproductPrice6 = document.getElementById('MproductPrice6');
      var MproductDes6 = document.getElementById('MproductDes6');

      return firebase.database().ref('Products/6Lx5').once('value').then(function(snapshot) {
      var getImgUrl = snapshot.val().url;
      var getName = snapshot.val().product_name;
      var getPrice = snapshot.val().product_price;
      var getDes = snapshot.val().product_des;

      // ...
      Mproduct_imgUrl6.src = getImgUrl;
      MproductName6.innerText = getName;
      MproductPrice6.innerText = getPrice;
      MproductDes6.innerText = getDes;

      // ...
      product_imgUrl6.src = getImgUrl;
      productName6.innerText = getName;
      productPrice6.innerText = getPrice;
      //Product7 ended

      //Product8
      var product_imgUrl7 = document.getElementById('product_imgUrl7');
      console.log(product_imgUrl);
      var productName7 = document.getElementById('productName7');
      var productPrice7 = document.getElementById('productPrice7');

      // product Modal 7
      var Mproduct_imgUrl7 = document.getElementById('Mproduct_imgUrl7');
      console.log(Mproduct_imgUrl7);
      var MproductName7 = document.getElementById('MproductName7');
      var MproductPrice7 = document.getElementById('MproductPrice7');
      var MproductDes7 = document.getElementById('MproductDes7');

      return firebase.database().ref('Products/6Lx10').once('value').then(function(snapshot) {
      var getImgUrl = snapshot.val().url;
      var getName = snapshot.val().product_name;
      var getPrice = snapshot.val().product_price;
      var getDes = snapshot.val().product_des;

      // ...
      Mproduct_imgUrl7.src = getImgUrl;
      MproductName7.innerText = getName;
      MproductPrice7.innerText = getPrice;
      MproductDes7.innerText = getDes;

      // ...
      product_imgUrl7.src = getImgUrl;
      productName7.innerText = getName;
      productPrice7.innerText = getPrice;
      //Product8 ended

      //Product9
      var product_imgUrl8 = document.getElementById('product_imgUrl8');
      console.log(product_imgUrl);
      var productName8 = document.getElementById('productName8');
      var productPrice8 = document.getElementById('productPrice8');

      // product Modal 1
      var Mproduct_imgUrl8 = document.getElementById('Mproduct_imgUrl8');
      console.log(Mproduct_imgUrl8);
      var MproductName8 = document.getElementById('MproductName8');
      var MproductPrice8 = document.getElementById('MproductPrice8');
      var MproductDes8 = document.getElementById('MproductDes8');

      return firebase.database().ref('Products/19Lx1').once('value').then(function(snapshot) {
      var getImgUrl = snapshot.val().url;
      var getName = snapshot.val().product_name;
      var getPrice = snapshot.val().product_price;
      var getDes = snapshot.val().product_des;

      // ...
      Mproduct_imgUrl8.src = getImgUrl;
      MproductName8.innerText = getName;
      MproductPrice8.innerText = getPrice;
      MproductDes8.innerText = getDes;

      // ...
      product_imgUrl8.src = getImgUrl;
      productName8.innerText = getName;
      productPrice8.innerText = getPrice;
      //Product9 ended

      //Product10
      var product_imgUrl9 = document.getElementById('product_imgUrl9');
      console.log(product_imgUrl);
      var productName9 = document.getElementById('productName9');
      var productPrice9 = document.getElementById('productPrice9');

      // product Modal 1
      var Mproduct_imgUrl9 = document.getElementById('Mproduct_imgUrl9');
      console.log(Mproduct_imgUrl9);
      var MproductName9 = document.getElementById('MproductName9');
      var MproductPrice9 = document.getElementById('MproductPrice9');
      var MproductDes9 = document.getElementById('MproductDes9');

      return firebase.database().ref('Products/19Lx5').once('value').then(function(snapshot) {
      var getImgUrl = snapshot.val().url;
      var getName = snapshot.val().product_name;
      var getPrice = snapshot.val().product_price;
      var getDes = snapshot.val().product_des;

      // ...
      Mproduct_imgUrl9.src = getImgUrl;
      MproductName9.innerText = getName;
      MproductPrice9.innerText = getPrice;
      MproductDes9.innerText = getDes;

      // ...
      product_imgUrl9.src = getImgUrl;
      productName9.innerText = getName;
      productPrice9.innerText = getPrice;
      //Product10 ended

      //Product11
      var product_imgUrl10 = document.getElementById('product_imgUrl10');
      console.log(product_imgUrl);
      var productName10 = document.getElementById('productName10');
      var productPrice10 = document.getElementById('productPrice10');

      // product Modal 10
      var Mproduct_imgUrl10 = document.getElementById('Mproduct_imgUrl10');
      console.log(Mproduct_imgUrl10);
      var MproductName10 = document.getElementById('MproductName10');
      var MproductPrice10 = document.getElementById('MproductPrice10');
      var MproductDes10 = document.getElementById('MproductDes10');

      return firebase.database().ref('Products/19Lx10').once('value').then(function(snapshot) {
      var getImgUrl = snapshot.val().url;
      var getName = snapshot.val().product_name;
      var getPrice = snapshot.val().product_price;
      var getDes = snapshot.val().product_des;

      // ...
      Mproduct_imgUrl10.src = getImgUrl;
      MproductName10.innerText = getName;
      MproductPrice10.innerText = getPrice;
      MproductDes10.innerText = getDes;

      // ...
      product_imgUrl10.src = getImgUrl;
      productName10.innerText = getName;
      productPrice10.innerText = getPrice;
      //Product11 ended
                          });//11th return node
                        });//10th return node
                      });//9th return node
                    });//8th return node
                  });//7th return node
                });//6th return node
              });//5th return node
            });//4th return node
          });//3rd return node
        });//2nd return node
      }); //first return node

// all data of bottles ended

    }
  });
}());
