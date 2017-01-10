 // ------------------------------------------------------------

// Initialize Firebase

  var config = {
    apiKey: "AIzaSyC1j5MI3L-BXScvg41XEfnb0u8uY2tnsN0",
    authDomain: "employee-tracker-408ba.firebaseapp.com",
    databaseURL: "https://employee-tracker-408ba.firebaseio.com",
    storageBucket: "employee-tracker-408ba.appspot.com",
    messagingSenderId: "723229515114"
  };
  firebase.initializeApp(config);

// ------------------------------------------------------------

// Set Global Variables

var database = firebase.database();

// ------------------------------------------------------------

// Firebase initial load stuff

database.ref().on("value", function(snapshot) {

	var save = snapshot.val();

	saveArray = Object.keys(save);


}, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
});

// ------------------------------------------------------------


// When employee creation form is submitted, do stuff

$(document).on("click", "#submit-new", function(e) {
	e.preventDefault();
	var currentName = $("#inputName").val().trim();
	var currentRole = $("#inputRole").val().trim();
	var currentDate = $("#inputDate").val().trim();
	var currentRate = $("#inputRate").val().trim();

	database.ref().push({
      "name" : currentName,
      "role" : currentRole,
      "date" : currentDate,
      "rate" : currentRate
    })

	var employeeTable = $("#employee-table");
	console.log("Submit clicked with: "+currentName+" "+currentRole+" "+currentDate+ " "+currentRate);
	//for id column, will have to calc total existing employees
	employeeTable.append("<tr>"+
	      "<td>1</td>"+ 
	      "<td>"+ currentName +"</td>"+
	      "<td>"+ currentRole +"</td>"+
	      "<td>"+ currentDate +"</td>"+
	      "<td>Months Worked</td>"+
	      "<td>$ "+ currentRate +"</td>"+
	      "<td>Total Billed</td>"+
	    "</tr>"
	);

	$("#inputName").val("");
	$("#inputRole").val("");
	$("#inputDate").val("");
	$("#inputRate").val("");
});
