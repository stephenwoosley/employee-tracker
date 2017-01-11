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

var currentName = "";
var currentRole = "";
var currentDate = "";
var currentRate = "";


// ------------------------------------------------------------

// Firebase initial load stuff

database.ref().on("child_added", function(childSnapshot) {
	
	// save the value of the fb db childSnapshot to var loadData
	var loadData = childSnapshot.val();
	// save the keys for each value in the childSnapshot to var loadDataKeys
	var loadDataKeys = Object.keys(loadData);
	// get the count of how many keys there are, then subtract 1 to get the index of the last object pushed to the database.
	var lastObjectIndex = loadDataKeys.length-1;
	// get the key name/object for the 
	// var lastObjectKey = loadDataKeys[lastObjectIndex];
	// var lastObject = loadData[lastObjectKey];

	console.log(childSnapshot);
	console.log("loadData: "+loadData);
	console.log("loadData value at 0: "+ loadData[0]);
	console.log("loadDataKeys: "+loadDataKeys);
	console.log("lastObjectIndex: "+lastObjectIndex);
	console.log(loadData.name);
	// console.log("lastObjectKey: "+lastObjectKey);
	// console.log("lastObject: "+lastObject);
	// console.log("name property of last object: "+lastObject.name);

	var employeeTable = $("#employee-table");
	
	//for id column, will have to calc total existing employees
	employeeTable.append("<tr>"+
	      "<td>1</td>"+ 
	      "<td>"+ loadData.name +"</td>"+
	      "<td>"+ loadData.role +"</td>"+
	      "<td>"+ loadData.date +"</td>"+
	      "<td>Months Worked</td>"+
	      "<td>$ "+ loadData.rate +"</td>"+
	      "<td>Total Billed</td>"+
	    "</tr>"
	);

	if (!currentName && !currentRole && !currentDate && !currentRate) {
		console.log("no values, so need a loop to print tables to page.")
		//for (things in stuff) {

		}
	

}, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
});

// ------------------------------------------------------------


// When employee creation form is submitted, do stuff

$(document).on("click", "#submit-new", function(e) {
	e.preventDefault();
	currentName = $("#inputName").val().trim();
	currentRole = $("#inputRole").val().trim();
	currentDate = $("#inputDate").val().trim();
	currentRate = $("#inputRate").val().trim();

	var tempEmpl = {
		name: currentName,
		role: currentRole,
		date: currentDate,
		rate: currentRate
	};

	database.ref().push(tempEmpl);


	var employeeTable = $("#employee-table");
	console.log("Submit clicked with: "+tempEmpl.name+" "+tempEmpl.role+" "+tempEmpl.date+ " "+tempEmpl.rate);
	//for id column, will have to calc total existing employees
	// employeeTable.append("<tr>"+
	//       "<td>1</td>"+ 
	//       "<td>"+ currentName +"</td>"+
	//       "<td>"+ currentRole +"</td>"+
	//       "<td>"+ currentDate +"</td>"+
	//       "<td>Months Worked</td>"+
	//       "<td>$ "+ currentRate +"</td>"+
	//       "<td>Total Billed</td>"+
	//     "</tr>"
	// );

	$("#inputName").val("");
	$("#inputRole").val("");
	$("#inputDate").val("");
	$("#inputRate").val("");
});
