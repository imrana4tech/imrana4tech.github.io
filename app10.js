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
        contain_products.innerText = "" + getTotalQuantity + " Products";
        //product data in row
        var tblUsers = document.getElementById('tbl_users_list');
        var databaseRef = firebase.database().ref('Cart/' + user_id);
        //var databaseRef = FirebaseFirestore.database().ref('/users');
        var rowindex = 1;

        databaseRef.once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {

                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                var product_id = childData.product_ID;
                // console.log(product_id);
                var row = tblUsers.insertRow(rowindex);
                var url = row.insertCell(0);
                var product_quant = row.insertCell(1);
                var product_name = row.insertCell(2);
                var product_price = row.insertCell(3);
                var product_remove = row.insertCell(4);

                product_name.appendChild(document.createTextNode(childData.product_name));
                product_price.appendChild(document.createTextNode(childData.product_price));
                var z = document.createElement("INPUT");
                    z.setAttribute("type", "submit");
                    z.setAttribute("value", "Update");
                    var zid = z.id = 'appro';
                product_remove.appendChild(z);



                                var y = document.createElement("INPUT");
                                    y.setAttribute("type", "text");
                                    y.setAttribute("value", "1");
                                    y.setAttribute("id", product_id);

                                    // y.addEventListener('click', e => {
                                    //                 alert('gya baaasdf');
                                    //
                                    //               });
                                product_quant.appendChild(y);
                                //for image view
                                var img1 = childData.url;
                                // console.log(img1);
                                var img = document.createElement("IMG");
                                    img.src = img1;
                                   img.setAttribute("width", "220");
                                   img.setAttribute("height", "250");
                                  //  img.setAttribute("alt", "The Pulpit Rock");
                                url.appendChild(img);
                //main click

                // updateCart.addEventListener('click', e => {
                //   // alert('imran');
                //   console.log("imran");
                // });

                z.addEventListener('click', e => {


                                // var SePrice = document.getElementById('15Lx30').value;
                                // var thPrice =
                                // if ((document.getElementById('15Lx6').value) == null) {
                                //   var firstPrice = document.getElementById('15Lx1').value;
                                //   var fourPrice = document.getElementById('19Lx1').value;
                                //
                                // }

                                // var fivePrice = document.getElementById('19Lx10').value;
                                // var sixPrice = document.getElementById('19Lx5').value;
                                // var sevenPrice = document.getElementById('500mlx1').value;
                                // var eightPrice = document.getElementById('500mlx24').value;
                                // var ninePrice = document.getElementById('6Lx1').value;
                                // var tenPrice = document.getElementById('6Lx10').value;
                                // var elePrice = document.getElementById('6Lx5').value;
                                var pro_id = y.id;

                                console.log(pro_id);

                                if (pro_id == "15Lx1") {

                                  var quantityPerProduct =  y.value;

                                  // console.log(quantityPerProduct);

                                  var quantityPerProductInt = parseInt(quantityPerProduct);

                                  console.log(quantityPerProductInt);
                                   var perProductPrice = 50;
                                   console.log(perProductPrice);

                                   var perProductTotal = quantityPerProductInt*perProductPrice;
                                   console.log(perProductTotal);

                                   //totalPrice
                                   return firebase.database().ref('Cart_TotalPrice/' + user_id).once('value').then(function(snapshot) {
                                       var getProduct_TotalPrice = snapshot.val().product_TotalPrice;
                                       console.log(getProduct_TotalPrice);
                                       var getProduct_TotalPriceInt = parseInt(getProduct_TotalPrice);
                                       console.log(getProduct_TotalPriceInt);

                                      //  var getPriceInt = parseInt(getPrice);
                                      //  console.log(getPriceInt);
                                       var total;
                                       total = getProduct_TotalPriceInt + perProductTotal;
                                       var data1 = {
                                           product_TotalPrice: total,
                                        }


                                       var pro_name = "Single 1.5 Liter";
                                       //cart
                                       var data = {
                                           product_ID: pro_id,
                                           product_name: pro_name,
                                           product_quantity: quantityPerProductInt,
                                           product_price: perProductPrice,
                                           product_totalPrice: perProductTotal,

                                       }

                                       var updates = {};
                                       updates['Cart/' + user_id + '/' + pro_id + '/' + pro_id] = data;
                                       updates['Cart_TotalPrice/' + user_id] = data1;

                                       const promise = firebase.database().ref().update(updates);
                                      //  console.log(getID);
                                       // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
                                       $('#myModal17').modal('show');
location.reload();
                                       promise.catch(e => console.log(e.message));
                                       //cart


                                       });

                                   //totalPrice


                                   // location.reload();
                                }
                                //first read ended
                                if (pro_id == "15Lx30") {

                                  var quantityPerProduct =  y.value;

                                  // console.log(quantityPerProduct);

                                  var quantityPerProductInt = parseInt(quantityPerProduct);

                                  console.log(quantityPerProductInt);
                                   var perProductPrice = 50;
                                   console.log(perProductPrice);

                                   var perProductTotal = quantityPerProductInt*perProductPrice;
                                   console.log(perProductTotal);

                                   //totalPrice
                                   return firebase.database().ref('Cart_TotalPrice/' + user_id).once('value').then(function(snapshot) {
                                       var getProduct_TotalPrice = snapshot.val().product_TotalPrice;
                                       console.log(getProduct_TotalPrice);
                                       var getProduct_TotalPriceInt = parseInt(getProduct_TotalPrice);
                                       console.log(getProduct_TotalPriceInt);

                                      //  var getPriceInt = parseInt(getPrice);
                                      //  console.log(getPriceInt);
                                       var total;
                                       total = getProduct_TotalPriceInt + perProductTotal;
                                       var data1 = {
                                           product_TotalPrice: total,
                                        }


                                       var pro_name = "Pack of 30 1.5 Liter";
                                       //cart
                                       var data = {
                                           product_ID: pro_id,
                                           product_name: pro_name,
                                           product_quantity: quantityPerProductInt,
                                           product_price: perProductPrice,
                                           product_totalPrice: perProductTotal,

                                       }

                                       var updates = {};
                                       updates['Cart/' + user_id + '/' + pro_id + '/' + pro_id] = data;
                                       updates['Cart_TotalPrice/' + user_id] = data1;

                                       const promise = firebase.database().ref().update(updates);
                                      //  console.log(getID);
                                       // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
                                       $('#myModal17').modal('show');
location.reload();
                                       promise.catch(e => console.log(e.message));
                                       //cart


                                       });

                                   //totalPrice


                                   // location.reload();
                                }
                                //2nd read ended
                                if (pro_id == "15Lx6") {

                                  var quantityPerProduct =  y.value;

                                  // console.log(quantityPerProduct);

                                  var quantityPerProductInt = parseInt(quantityPerProduct);

                                  console.log(quantityPerProductInt);
                                   var perProductPrice = 50;
                                   console.log(perProductPrice);

                                   var perProductTotal = quantityPerProductInt*perProductPrice;
                                   console.log(perProductTotal);

                                   //totalPrice
                                   return firebase.database().ref('Cart_TotalPrice/' + user_id).once('value').then(function(snapshot) {
                                       var getProduct_TotalPrice = snapshot.val().product_TotalPrice;
                                       console.log(getProduct_TotalPrice);
                                       var getProduct_TotalPriceInt = parseInt(getProduct_TotalPrice);
                                       console.log(getProduct_TotalPriceInt);

                                      //  var getPriceInt = parseInt(getPrice);
                                      //  console.log(getPriceInt);
                                       var total;
                                       total = getProduct_TotalPriceInt + perProductTotal;
                                       var data1 = {
                                           product_TotalPrice: total,
                                        }


                                       var pro_name = "Pack of 6 1.5 Liter";
                                       //cart
                                       var data = {
                                           product_ID: pro_id,
                                           product_name: pro_name,
                                           product_quantity: quantityPerProductInt,
                                           product_price: perProductPrice,
                                           product_totalPrice: perProductTotal,

                                       }

                                       var updates = {};
                                       updates['Cart/' + user_id + '/' + pro_id + '/' + pro_id] = data;
                                       updates['Cart_TotalPrice/' + user_id] = data1;

                                       const promise = firebase.database().ref().update(updates);
                                      //  console.log(getID);
                                       // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
                                       $('#myModal17').modal('show');
location.reload();
                                       promise.catch(e => console.log(e.message));
                                       //cart


                                       });

                                   //totalPrice


                                   // location.reload();
                                }
                                //3rd read ended
                                if (pro_id == "19Lx1") {

                                  var quantityPerProduct =  y.value;

                                  // console.log(quantityPerProduct);

                                  var quantityPerProductInt = parseInt(quantityPerProduct);

                                  console.log(quantityPerProductInt);
                                   var perProductPrice = 50;
                                   console.log(perProductPrice);

                                   var perProductTotal = quantityPerProductInt*perProductPrice;
                                   console.log(perProductTotal);

                                   //totalPrice
                                   return firebase.database().ref('Cart_TotalPrice/' + user_id).once('value').then(function(snapshot) {
                                       var getProduct_TotalPrice = snapshot.val().product_TotalPrice;
                                       console.log(getProduct_TotalPrice);
                                       var getProduct_TotalPriceInt = parseInt(getProduct_TotalPrice);
                                       console.log(getProduct_TotalPriceInt);

                                      //  var getPriceInt = parseInt(getPrice);
                                      //  console.log(getPriceInt);
                                       var total;
                                       total = getProduct_TotalPriceInt + perProductTotal;
                                       var data1 = {
                                           product_TotalPrice: total,
                                        }


                                       var pro_name = "Single 19 Liter";
                                       //cart
                                       var data = {
                                           product_ID: pro_id,
                                           product_name: pro_name,
                                           product_quantity: quantityPerProductInt,
                                           product_price: perProductPrice,
                                           product_totalPrice: perProductTotal,

                                       }

                                       var updates = {};
                                       updates['Cart/' + user_id + '/' + pro_id + '/' + pro_id] = data;
                                       updates['Cart_TotalPrice/' + user_id] = data1;

                                       const promise = firebase.database().ref().update(updates);
                                      //  console.log(getID);
                                       // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
                                       $('#myModal17').modal('show');
location.reload();
                                       promise.catch(e => console.log(e.message));
                                       //cart


                                       });

                                   //totalPrice


                                   // location.reload();
                                }
                                //4th read ended
                                if (pro_id == "19Lx10") {

                                  var quantityPerProduct =  y.value;

                                  // console.log(quantityPerProduct);

                                  var quantityPerProductInt = parseInt(quantityPerProduct);

                                  console.log(quantityPerProductInt);
                                   var perProductPrice = 50;
                                   console.log(perProductPrice);

                                   var perProductTotal = quantityPerProductInt*perProductPrice;
                                   console.log(perProductTotal);

                                   //totalPrice
                                   return firebase.database().ref('Cart_TotalPrice/' + user_id).once('value').then(function(snapshot) {
                                       var getProduct_TotalPrice = snapshot.val().product_TotalPrice;
                                       console.log(getProduct_TotalPrice);
                                       var getProduct_TotalPriceInt = parseInt(getProduct_TotalPrice);
                                       console.log(getProduct_TotalPriceInt);

                                      //  var getPriceInt = parseInt(getPrice);
                                      //  console.log(getPriceInt);
                                       var total;
                                       total = getProduct_TotalPriceInt + perProductTotal;
                                       var data1 = {
                                           product_TotalPrice: total,
                                        }


                                       var pro_name = "Pack of 10 19 Liter";
                                       //cart
                                       var data = {
                                           product_ID: pro_id,
                                           product_name: pro_name,
                                           product_quantity: quantityPerProductInt,
                                           product_price: perProductPrice,
                                           product_totalPrice: perProductTotal,

                                       }

                                       var updates = {};
                                       updates['Cart/' + user_id + '/' + pro_id + '/' + pro_id] = data;
                                       updates['Cart_TotalPrice/' + user_id] = data1;

                                       const promise = firebase.database().ref().update(updates);
                                      //  console.log(getID);
                                       // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
                                       $('#myModal17').modal('show');
location.reload();
                                       promise.catch(e => console.log(e.message));
                                       //cart


                                       });

                                   //totalPrice


                                   // location.reload();
                                }
                                //5th read ended
                                if (pro_id == "19Lx5") {

                                  var quantityPerProduct =  y.value;

                                  // console.log(quantityPerProduct);

                                  var quantityPerProductInt = parseInt(quantityPerProduct);

                                  console.log(quantityPerProductInt);
                                   var perProductPrice = 50;
                                   console.log(perProductPrice);

                                   var perProductTotal = quantityPerProductInt*perProductPrice;
                                   console.log(perProductTotal);

                                   //totalPrice
                                   return firebase.database().ref('Cart_TotalPrice/' + user_id).once('value').then(function(snapshot) {
                                       var getProduct_TotalPrice = snapshot.val().product_TotalPrice;
                                       console.log(getProduct_TotalPrice);
                                       var getProduct_TotalPriceInt = parseInt(getProduct_TotalPrice);
                                       console.log(getProduct_TotalPriceInt);

                                      //  var getPriceInt = parseInt(getPrice);
                                      //  console.log(getPriceInt);
                                       var total;
                                       total = getProduct_TotalPriceInt + perProductTotal;
                                       var data1 = {
                                           product_TotalPrice: total,
                                        }


                                       var pro_name = "Pack of 5 19 Liter";
                                       //cart
                                       var data = {
                                           product_ID: pro_id,
                                           product_name: pro_name,
                                           product_quantity: quantityPerProductInt,
                                           product_price: perProductPrice,
                                           product_totalPrice: perProductTotal,

                                       }

                                       var updates = {};
                                       updates['Cart/' + user_id + '/' + pro_id + '/' + pro_id] = data;
                                       updates['Cart_TotalPrice/' + user_id] = data1;

                                       const promise = firebase.database().ref().update(updates);
                                      //  console.log(getID);
                                       // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
                                       $('#myModal17').modal('show');
location.reload();
                                       promise.catch(e => console.log(e.message));
                                       //cart


                                       });

                                   //totalPrice


                                   // location.reload();
                                }
                                //6th read ended
                                if (pro_id == "500mlx1") {

                                  var quantityPerProduct =  y.value;

                                  // console.log(quantityPerProduct);

                                  var quantityPerProductInt = parseInt(quantityPerProduct);

                                  console.log(quantityPerProductInt);
                                   var perProductPrice = 50;
                                   console.log(perProductPrice);

                                   var perProductTotal = quantityPerProductInt*perProductPrice;
                                   console.log(perProductTotal);

                                   console.log(user_id);

                                   //totalPrice
                                   return firebase.database().ref('Cart_TotalPrice/' + user_id).once('value').then(function(snapshot) {
                                       var getProduct_TotalPrice = snapshot.val().product_TotalPrice;
                                       console.log(getProduct_TotalPrice);
                                       var getProduct_TotalPriceInt = parseInt(getProduct_TotalPrice);
                                       console.log(getProduct_TotalPriceInt);

                                      //  var getPriceInt = parseInt(getPrice);
                                      //  console.log(getPriceInt);
                                       var total;
                                       total = getProduct_TotalPriceInt + perProductTotal;
                                       var data1 = {
                                           product_TotalPrice: total,
                                        }


                                       var pro_name = "Single 500ml Liter";
                                       //cart
                                       var data = {
                                           product_ID: pro_id,
                                           product_name: pro_name,
                                           product_quantity: quantityPerProductInt,
                                           product_price: perProductPrice,
                                           product_totalPrice: perProductTotal,

                                       }

                                       var updates = {};
                                       updates['Cart/' + user_id + '/' + pro_id + '/' + pro_id] = data;
                                       updates['Cart_TotalPrice/' + user_id] = data1;

                                       const promise = firebase.database().ref().update(updates);
                                      //  console.log(getID);
                                       // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
                                       $('#myModal17').modal('show');
location.reload();
                                       promise.catch(e => console.log(e.message));
                                       //cart


                                       });

                                   //totalPrice





                                   // location.reload();
                                }
                                //7th read ended
                                if (pro_id == "500mlx24") {

                                  var quantityPerProduct =  y.value;

                                  // console.log(quantityPerProduct);

                                  var quantityPerProductInt = parseInt(quantityPerProduct);

                                  console.log(quantityPerProductInt);
                                   var perProductPrice = 50;
                                   console.log(perProductPrice);

                                   var perProductTotal = quantityPerProductInt*perProductPrice;
                                   console.log(perProductTotal);

                                   //totalPrice
                                   return firebase.database().ref('Cart_TotalPrice/' + user_id).once('value').then(function(snapshot) {
                                       var getProduct_TotalPrice = snapshot.val().product_TotalPrice;
                                       console.log(getProduct_TotalPrice);
                                       var getProduct_TotalPriceInt = parseInt(getProduct_TotalPrice);
                                       console.log(getProduct_TotalPriceInt);

                                      //  var getPriceInt = parseInt(getPrice);
                                      //  console.log(getPriceInt);
                                       var total;
                                       total = getProduct_TotalPriceInt + perProductTotal;
                                       var data1 = {
                                           product_TotalPrice: total,
                                        }


                                       var pro_name = "Pack of 24 500ml";
                                       //cart
                                       var data = {
                                           product_ID: pro_id,
                                           product_name: pro_name,
                                           product_quantity: quantityPerProductInt,
                                           product_price: perProductPrice,
                                           product_totalPrice: perProductTotal,

                                       }

                                       var updates = {};
                                       updates['Cart/' + user_id + '/' + pro_id + '/' + pro_id] = data;
                                       updates['Cart_TotalPrice/' + user_id] = data1;

                                       const promise = firebase.database().ref().update(updates);
                                      //  console.log(getID);
                                       // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
                                       $('#myModal17').modal('show');
location.reload();
                                       promise.catch(e => console.log(e.message));
                                       //cart


                                       });

                                   //totalPrice


                                   // location.reload();
                                }
                                //8th read ended
                                if (pro_id == "6Lx1") {

                                  var quantityPerProduct =  y.value;

                                  // console.log(quantityPerProduct);

                                  var quantityPerProductInt = parseInt(quantityPerProduct);

                                  console.log(quantityPerProductInt);
                                   var perProductPrice = 50;
                                   console.log(perProductPrice);

                                   var perProductTotal = quantityPerProductInt*perProductPrice;
                                   console.log(perProductTotal);

                                   //totalPrice
                                   return firebase.database().ref('Cart_TotalPrice/' + user_id).once('value').then(function(snapshot) {
                                       var getProduct_TotalPrice = snapshot.val().product_TotalPrice;
                                       console.log(getProduct_TotalPrice);
                                       var getProduct_TotalPriceInt = parseInt(getProduct_TotalPrice);
                                       console.log(getProduct_TotalPriceInt);

                                      //  var getPriceInt = parseInt(getPrice);
                                      //  console.log(getPriceInt);
                                       var total;
                                       total = getProduct_TotalPriceInt + perProductTotal;
                                       var data1 = {
                                           product_TotalPrice: total,
                                        }


                                       var pro_name = "Single 6 Liter";
                                       //cart
                                       var data = {
                                           product_ID: pro_id,
                                           product_name: pro_name,
                                           product_quantity: quantityPerProductInt,
                                           product_price: perProductPrice,
                                           product_totalPrice: perProductTotal,

                                       }

                                       var updates = {};
                                       updates['Cart/' + user_id + '/' + pro_id + '/' + pro_id] = data;
                                       updates['Cart_TotalPrice/' + user_id] = data1;

                                       const promise = firebase.database().ref().update(updates);
                                      //  console.log(getID);
                                       // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
                                       $('#myModal17').modal('show');
location.reload();
                                       promise.catch(e => console.log(e.message));
                                       //cart


                                       });

                                   //totalPrice


                                   // location.reload();
                                }
                                //9th read ended
                                if (pro_id == "6Lx10") {

                                  var quantityPerProduct =  y.value;

                                  // console.log(quantityPerProduct);

                                  var quantityPerProductInt = parseInt(quantityPerProduct);

                                  console.log(quantityPerProductInt);
                                   var perProductPrice = 50;
                                   console.log(perProductPrice);

                                   var perProductTotal = quantityPerProductInt*perProductPrice;
                                   console.log(perProductTotal);

                                   console.log(user_id);


                                   //totalPrice
                                   return firebase.database().ref('Cart_TotalPrice/' + user_id).once('value').then(function(snapshot) {
                                       var getProduct_TotalPrice = snapshot.val().product_TotalPrice;
                                       console.log(getProduct_TotalPrice);
                                       var getProduct_TotalPriceInt = parseInt(getProduct_TotalPrice);
                                       console.log(getProduct_TotalPriceInt);

                                      //  var getPriceInt = parseInt(getPrice);
                                      //  console.log(getPriceInt);
                                       var total;
                                       total = getProduct_TotalPriceInt + perProductTotal;
                                       var data1 = {
                                           product_TotalPrice: total,
                                        }


                                       var pro_name = "Pack of 10 6 Liter";
                                       //cart
                                       var data = {
                                           product_ID: pro_id,
                                           product_name: pro_name,
                                           product_quantity: quantityPerProductInt,
                                           product_price: perProductPrice,
                                           product_totalPrice: perProductTotal,

                                       }

                                       var updates = {};
                                       updates['Cart/' + user_id + '/' + pro_id + '/' + pro_id] = data;
                                       updates['Cart_TotalPrice/' + user_id] = data1;

                                       const promise = firebase.database().ref().update(updates);
                                      //  console.log(getID);
                                       // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
                                       $('#myModal17').modal('show');
location.reload();
                                       promise.catch(e => console.log(e.message));
                                       //cart


                                       });

                                   //totalPrice


                                   // location.reload();
                                }
                                //10th read ended
                                if (pro_id == "6Lx5") {

                                  var quantityPerProduct =  y.value;

                                  // console.log(quantityPerProduct);

                                  var quantityPerProductInt = parseInt(quantityPerProduct);

                                  console.log(quantityPerProductInt);
                                   var perProductPrice = 50;
                                   console.log(perProductPrice);

                                   var perProductTotal = quantityPerProductInt*perProductPrice;
                                   console.log(perProductTotal);

                                   //totalPrice
                                   return firebase.database().ref('Cart_TotalPrice/' + user_id).once('value').then(function(snapshot) {
                                       var getProduct_TotalPrice = snapshot.val().product_TotalPrice;
                                       console.log(getProduct_TotalPrice);
                                       var getProduct_TotalPriceInt = parseInt(getProduct_TotalPrice);
                                       console.log(getProduct_TotalPriceInt);

                                      //  var getPriceInt = parseInt(getPrice);
                                      //  console.log(getPriceInt);
                                       var total;
                                       total = getProduct_TotalPriceInt + perProductTotal;
                                       var data1 = {
                                           product_TotalPrice: total,
                                        }


                                       var pro_name = "Pack of 5 6 Liter";
                                       //cart
                                       var data = {
                                           product_ID: pro_id,
                                           product_name: pro_name,
                                           product_quantity: quantityPerProductInt,
                                           product_price: perProductPrice,
                                           product_totalPrice: perProductTotal,

                                       }

                                       var updates = {};
                                       updates['Cart/' + user_id + '/' + pro_id + '/' + pro_id] = data;
                                       updates['Cart_TotalPrice/' + user_id] = data1;

                                       const promise = firebase.database().ref().update(updates);
                                      //  console.log(getID);
                                       // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
                                       $('#myModal17').modal('show');
location.reload();
                                       promise.catch(e => console.log(e.message));
                                       //cart


                                       });

                                   //totalPrice


                                   // location.reload();
                                }
                                //11th read ended
                                // console.log(SePrice);
                                // console.log(thPrice);
                                // console.log(fourPrice);
                                // console.log(fivePrice);
                                // console.log(sixPrice);
                                // console.log(sevenPrice);
                                // console.log(eightPrice);
                                // console.log(ninePrice);
                                // console.log(tenPrice);
                                // console.log(elePrice);

                });







                rowindex = rowindex + 1;


              //   updateCart.addEventListener('click', e => {
              //     // alert('hah ');
              //     console.log(document.getElementById('15Lx1').value);
              // });



                //practice
                // var divQu = document.createElement('div');
                // divQu.className = 'quantity';
                // var divQuS = document.createElement('div');
                // divQuS.className = 'quantity-select'
                //
                // var div = document.createElement('div');
                // div.className = 'entry value-minus';
                // div.setAttribute("id", "demo");
                // // console.log(div.id);
                // var div1 = document.createElement('div');
                // div1.className = 'entry value';
                // var span = document.createElement('span');
                // var t = document.createTextNode("1");
                // span.appendChild(t);
                // var div2 = document.createElement('div');
                // div2.className = 'entry value-plus active';
                // div2.id = "this_" + product_id + "_Plus";
                // console.log(div2.id);
                // order_date.appendChild(y);
                // var name = document.getElementById('date');
                // console.log(name);
                // div1.appendChild(span);
                // divQuS.appendChild(div);
                // divQuS.appendChild(div1);
                // divQuS.appendChild(div2);
                // divQu.appendChild(divQuS);
                // $('.value-plus').on('click', function(){
                //   var divUpd = $(this).parent().find('.value'), newVal = parseInt(divUpd.text(), 10)+1;
                //   divUpd.text(newVal);
                // });
                // $('.value-minus').on('click', function(){
                //   var divUpd = $(this).parent().find('.value'), newVal = parseInt(divUpd.text(), 10)-1;
                //   if(newVal>=1) divUpd.text(newVal);
                // });
                //practice
                // var x = document.createElement("INPUT");
                //     x.setAttribute("type", "number");
                //     x.setAttribute("name", "quantity");
                //     x.setAttribute("id", "quant");
                // product_quant.appendChild(y);
                // product_quant.appendChild(divQuS);
                // product_quant.appendChild(div);
                // product_quant.appendChild(div1);
                // product_quant.appendChild(div2);


            });
            // update Cart
            // updateCart.addEventListener('click', e => {
            //
            //                 // console.log(document.getElementById('15Lx1').value);
            //                 // console.log(document.getElementById('15Lx30').value);
            //                 // console.log(document.getElementById('6Lx10').value);
            //                 alert('ha bolo');
            //                 // console.log(childData.product_price);
            //
            //                 return firebase.database().ref('Cart/' + user_id ).once('value').then(function(snapshot) {
            //                   console.log(snapshot.key);
            //                   // return firebase.database().ref('Cart/' + user_id + '/19Lx1/').once('value').then(function(snapshot) {
            //                   //   console.log(snapshot.val().product_des);
            //                   // });
            //                 });
            //
            //
            // });
            // update Cart
            return firebase.database().ref('Cart_TotalPrice/' + user_id ).once('value').then(function(snapshot) {
            console.log(snapshot.val().product_TotalPrice);
            TotalOrderPrice.innerText = "Rs." + snapshot.val().product_TotalPrice + "";


            });

        });

        //product data in row
      });
      //cart quantity
    });
    //cart price & quantity



  }else {
    console.log('not logged in');
    $('#w3l_login1').show();
    $('#w3l_login2').hide();

    }




  });
}());
