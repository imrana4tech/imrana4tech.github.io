$('#order_contain').show();
$('#order_done').hide();
$('#procced_btn').show();
$('#continue_btn').hide();

$('#proceed').on('click', function(){
  // var divUpd = $(this).parent().find('.value'), newVal = parseInt(divUpd.text(), 10)-1;
  // if(newVal>=1) divUpd.text(newVal);
  // console.log(newVal);
  // var price = parseInt("70");
  // console.log(price);
  // var totalPrice = newVal*price;
  // console.log(totalPrice);
  $('#order_contain').hide();
  $('#order_done').show();
  $('#procced_btn').hide();
  $('#continue_btn').show();
  var user = firebase.auth().currentUser;
  var user_id = user.uid;
  console.log(user_id);

  return firebase.database().ref('Customers/Order Weekly Water Cans/' + user_id).once('value').then(function(snapshot) {
    var getTotalPrice = snapshot.val().Total_Cans_Price;
    var getQuantity = snapshot.val().Order_Number_of_Cans;
    console.log(getQuantity);

    console.log('chaljaaa');



    // order_status
    var order_status = document.getElementById('order_status');


    return firebase.database().ref('Customers/user_notify/' + user_id).once('value').then(function(snapshot) {
    var getDate = snapshot.val().date;
    var getTime = snapshot.val().time;

    console.log('hello dear');


    order_status.innerText = 'Your order will be dilvered on this ' + getTime + ' time and on this ' + getDate + ' date by our dilevery man.' ;


    });

    // order_status


    return firebase.database().ref('Customers/Registration/' + user_id).once('value').then(function(snapshot) {
    var getEmail = snapshot.val().email;
    var getName = snapshot.val().name;
    var getAddress = snapshot.val().address;
    var getContact = snapshot.val().contact;
    console.log(getContact);
    // ...
    // nameProfile.innerText = getName;
    // emailProfile.innerText = getEmail;
    // contactProfile.innerText = getContact;
    // addressProfile.innerText = getAddress;

    var data = {
            Product_name:"Bee Harry's 19 Liter Can",
            Product_price: getTotalPrice,
            Product_quantity: getQuantity,
            user_name: getName,
            user_email: getEmail,
            user_contact: getContact,
            user_address: getAddress,
    }

    var updates = {};
    updates['Customers/Admin/' + user_id] = data;
    const promise = firebase.database().ref().update(updates);

  });
  // ...
  //  TotalPrice.innerText = "Rs." + getTotalPrice;
  //  quantityValue.innerText = getQuantity;
});
  // console.log(promise);
  // promise.catch(e => console.log(e.message));

// alert('Imrany');
});


//order status
