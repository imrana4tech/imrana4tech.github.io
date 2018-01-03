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

	//productRead
	var product_imgUrl = document.getElementById('product_imgUrl');
	console.log(product_imgUrl);
	var productName = document.getElementById('productName');
	var productPrice = document.getElementById('productPrice');

	return firebase.database().ref('Products/' +postKey).once('value').then(function(snapshot) {
	var getImgUrl = snapshot.val().url;
	var getName = snapshot.val().product_name;
	var getPrice = snapshot.val().product_price;

	// ...
	product_imgUrl.src = getImgUrl;
	productName.innerText = getName;
	productPrice.innerText = getPrice;

	});
	//productRead


}());
