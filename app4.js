
$('#MyProfileDataEdit').hide();
$('#MyProfileDataView').show();


//btnViewProfile
btnViewProfile.addEventListener('click', e => {
  // $('#w3l_login1').show();
  $('#MyProfileDataEdit').hide();
  $('#MyProfileDataView').show();
  $('#news').hide();

});


//btnViewProfile

//btnEditProfile
btnEditProfile.addEventListener('click', e => {
  // $('#w3l_login1').show();
  $('#MyProfileDataView').hide();
  $('#MyProfileDataEdit').show();

});
