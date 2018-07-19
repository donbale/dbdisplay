// Userlist data array for filling in info box
var networkListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

  // Populate the user table on initial page load
  populateTable();

  // Username link click
  $('#networkList table tbody').on('click', 'td a.linkshownetwork', showNetworkInfo);

});

// Functions =============================================================

// Fill table with data
function populateTable() {

  // Empty content string
  var tableContent = '';

  // jQuery AJAX call for JSON
  $.getJSON( '/networks/networklist', function( data ) {
    // Stick our user data array into a userlist variable in the global object
    networkListData = data;
    // For each item in our JSON, add a table row and cells to the content string
    $.each(data, function(){
      tableContent += '<tr>';
      tableContent += '<td><a href="#" class="linkshownetwork" rel="' + this.file_name + '">' + this.file_name + '</a></td>';
      tableContent += '<td><a href=' + this.path_file_name + '">' + this.path_file_name + '</a></td>';
      tableContent += '</tr>';
    });

    // Inject the whole content string into our existing HTML table
    $('#networkList table tbody').html(tableContent);
  });
};

// Show User Info
function showNetworkInfo(event) {

  // Prevent Link from Firing
  event.preventDefault();

  // Retrieve username from link rel attribute
  var thisNetworkName = $(this).attr('rel');

  // Get Index of object based on id value
  var arrayPosition = networkListData.map(function(arrayItem) { return arrayItem.file_name; }).indexOf(thisNetworkName);

    // Get our User Object
  var thisNetworkObject = networkListData[arrayPosition];

  //Populate Info Box
  $('#networkInfoName').text(thisNetworkObject.file_name);
  $('#networkInfoType').text(thisNetworkObject.type);
  $('#networkInfoOwner').text(thisNetworkObject.owner);
  $('#networkInfoNodes').text(thisNetworkObject.number_of_nodes);
  $('#networkInfoLinks').text(thisNetworkObject.number_of_links);
  $('#networkInfoServices').text(thisNetworkObject.number_of_services);

};