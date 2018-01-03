var databaseRef = firebase.database().ref('users/');

//Get Elements userProfile
const profileName = document.getElementById('profileName');
const profileContact = document.getElementById('profileContact');
const profileAddress = document.getElementById('profileAddress');
const btnSaveProfile = document.getElementById('btnSaveProfile');
const btnUpdateProfile = document.getElementById('btnUpdateProfile');
const btnDeleteProfile = document.getElementById('btnDeleteProfile');

btnSaveProfile.addEventListener('click', e => {
  // Get email and pass
  // TODO: CHECK 4 REAL EMAILZ
  const name = profileName.value;
  const contact = profileContact.value;
  const address = profileAddress.value;
  var user = firebase.auth().currentUser;
  var user_id = user.uid;
  var emailPrint = user.email;
  // const auth = firebase.auth();

  var data = {
      user_id: user_id,
      email: emailPrint,
      name: name,
      contact: contact,
      address: address
  }

  var updates = {};
  updates['Customers/Registration/' + user_id] = data;
  const promise = firebase.database().ref().update(updates);

  alert('user has been inserted successfully');

  promise.catch(e => console.log(e.message));

});
// //OnclickSave function
// function save_user() {
//   var profileName = document.getElementById('profileName');
//   var profileContact = document.getElementById('profileContact');
//   var profileAddress = document.getElementById('profileAddress');
//   // var uid = firebase.database().ref().child('users').push().key;
//
//   var user = firebase.auth().currentUser;
//
//   var user_id = user.uid;
//
//     // var father_name = document.getElementById('father_name').value;
//
//     var data = {
//         user_id: user_id,
//         Name: profileName,
//         Contact: profileContact,
//         Address: profileAddress
//     }
//
//     var updates = {};
//     updates['Customers/Registration/' + user_id] = data;
//     firebase.database().ref().update(updates);
//
//     alert('user has been inserted successfully');
//
//     reload_page();
// }
// //OnclickSave function

function update_user() {
    var uid = document.getElementById('user_id').value;
    var user_name = document.getElementById('user_name').value;
    var data = {
        user_id: uid,
        user_name: user_name
    }

    var updates = {};
    updates['/users/' + uid] = data;
    firebase.database().ref().update(updates);
    alert('usuário atualizado com sucesso');
    reload_page();
}

function delete_user() {
    var uid = document.getElementById('user_id').value;
    firebase.database().ref().child('users' + uid).remove();
    alert('usuário removido com sucesso');
    reload_page();
}

function reload_page() {
    window.location.reload();
}



// order_status



// order_status
 // var order_status = document.getElementById('order_status');
 //
 //
 // return firebase.database().ref('Customers/user_notify/' + user_id).once('value').then(function(snapshot) {
 // var getTime = snapshot.val().date;
 // var getDate = snapshot.val().time;
 //
 // console.log('hello dear');
 //
 //
 // order_status.innerText = 'Your order will be dilvered on this' + getTime + 'time and on this' + getDate + 'date by our dilevery man' ;
 //
 //
 // });

 // order_status







// testing Checkout
// minusValue.addEventListener('click', e => {
//
//
//   alert('user has been inserted successfully');
//
//   promise.catch(e => console.log(e.message));
//
// });
