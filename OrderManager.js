var tblUsers = document.getElementById('tbl_users_list');
var databaseRef = firebase.database().ref('admin/');
//var databaseRef = FirebaseFirestore.database().ref('/users');
var rowindex = 1;

databaseRef.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {

        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();

        var row = tblUsers.insertRow(rowindex);
        var Name = row.insertCell(0);
        var Email = row.insertCell(1);
        var Contact = row.insertCell(2);
        var Address = row.insertCell(3);
        var Product_1 = row.insertCell(4);
        var Quantity1 = row.insertCell(5);
        var Price1 = row.insertCell(6);
        var Product_2 = row.insertCell(7);
        var Quantity2 = row.insertCell(8);
        var Price2 = row.insertCell(9);
        // var Product_3 = row.insertCell(10);
        // var Price3 = row.insertCell(11);
        // var Quantity3 = row.insertCell(12);

        var Total_Price = row.insertCell(10);
        var time = row.insertCell(11);
        var date = row.insertCell(12);
        var driver_name = row.insertCell(13);

        var action = row.insertCell(14);

        Name.appendChild(document.createTextNode(childData.user_name));
        Email.appendChild(document.createTextNode(childData.user_email));
        Contact.appendChild(document.createTextNode(childData.user_contact));
        Address.appendChild(document.createTextNode(childData.user_address));
        Product_1.appendChild(document.createTextNode(childData.p1_name));
        Quantity1.appendChild(document.createTextNode(childData.p1_quantity));
        Price1.appendChild(document.createTextNode(childData.p1_price));
        Product_2.appendChild(document.createTextNode(childData.p2_name));
        Quantity2.appendChild(document.createTextNode(childData.p2_quantity));
        Price2.appendChild(document.createTextNode(childData.p2_price));
        // Product_3.appendChild(document.createTextNode(childData.p3_name));
        // Quantity3.appendChild(document.createTextNode(childData.p3_quantity));
        // Price3.appendChild(document.createTextNode(childData.p3_price));

        Total_Price.appendChild(document.createTextNode(childData.product_TotalPrice));
        // time.appendChild(document.createTextNode(childData.Product_name));
        // date.appendChild(document.createTextNode(childData.Product_price));
        // action.appendChild(document.createTextNode(childData.Product_quantity));

        var x = document.createElement("INPUT");
            x.setAttribute("type", "time");
            x.setAttribute("name", "usr_time");
            x.setAttribute("id", "time");
;
        time.appendChild(x);

        var y = document.createElement("INPUT");
            y.setAttribute("type", "date");
            y.setAttribute("name", "bday");
            y.setAttribute("id", "date");
            date.appendChild(y);

            var driver = document.createElement("INPUT");
                driver.setAttribute("type", "text");
                driver.setAttribute("name", "driver");
                driver.setAttribute("id", "driver");
                driver_name.appendChild(driver);

        var z = document.createElement("INPUT");
            z.setAttribute("type", "submit");
            z.setAttribute("value", "Approve");
            var zid = z.id = 'appro';





        action.appendChild(z);

        rowindex = rowindex + 1;

        $('#appro').on('click', function(){
           var date = document.getElementById('date').value; //this value
           console.log(date);
           var driver1 = document.getElementById('driver').value; //this value

           //convertion of time
           var inputEle = document.getElementById('time');
           console.log(inputEle);
           var timeSplit = inputEle.value.split(':'),
             hours,
             minutes,
             meridian;
           hours = timeSplit[0];
           minutes = timeSplit[1];
           if (hours > 12) {
             meridian = 'PM';
             hours -= 12;
           } else if (hours < 12) {
             meridian = 'AM';
             if (hours == 0) {
               hours = 12;
             }
           } else {
             meridian = 'PM';
           }
           var time = hours + ':' + minutes + ' ' + meridian;
           console.log(time); //this value
           //convertion of time


           var user = firebase.auth().currentUser;
           var user_id = user.uid; //this value
           console.log(user_id);

           //insert data

           var data = {
                   user_id: user_id,
                   time: time,
                   date: date,
                   driver_name: driver1

           }

           var updates = {};
           updates['user_notify/' + user_id] = data;
           const promise = firebase.database().ref().update(updates);

           //insert data
           alert('approved!!');

        });


    });
});
