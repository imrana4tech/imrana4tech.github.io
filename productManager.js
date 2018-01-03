$("#file").on("change", function(event) {
	selectedFile = event.target.files[0];
	$("#uploadButton").show();
});

function uploadFile(){
	// Create a root reference
	var filename = selectedFile.name;
	var storageRef = firebase.storage().ref('/bottleImages/' + filename);
	var uploadTask = storageRef.put(selectedFile);


	// Register three observers:
	// 1. 'state_changed' observer, called any time the state changes
	// 2. Error observer, called on failure
	// 3. Completion observer, called on successful completion
	uploadTask.on('state_changed', function(snapshot){
	  // Observe state change events such as progress, pause, and resume
	  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
	}, function(error) {
	  // Handle unsuccessful uploads
	}, function() {
	  // Handle successful uploads on complete
	  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
		var postKey = firebase.database().ref('Products/').push().key;
	  var downloadURL = uploadTask.snapshot.downloadURL;
		console.log(downloadURL);
		var pID = document.getElementById('productID').value;
		var updates = {};
		var postData = {
			url: downloadURL,
			product_ID: $("#productID").val(),
			product_name: $("#productName").val(),
			product_des: $("#productDescription").val(),
			product_price: $("#productPrice").val()
		};

		updates['/Products/'+pID] = postData;
		firebase.database().ref().update(updates);
		$('#myModal16').modal('show');

	});

}




const btnCat = document.getElementById('uploadCat');
const catID = document.getElementById('catID');
const catName = document.getElementById('catName');

btnCat.addEventListener('click', e => {
	// TODO: CHECK 4 REAL EMAILZ
	var catID1 = catID.value;
	var catName1 = catName.value;


				var data = {
						categoryID: catID1,
						categoryName: catName1
				}

				var updates = {};
				updates['Category/' + catID1] = data;
				const promise = firebase.database().ref().update(updates);

				$('#myModal16').modal('show');

				console.log('done');



		});


	//my code
