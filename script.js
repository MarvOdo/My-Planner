$(document).ready(function() {
	//Get today's date (number and word)
	var today = new Date();
	var todayNumber = today.getDate();
	var todayWord = today.getDay();
	//max days in this month to stop in calendar
	var maxDaysThisMonth = new Date(today.getYear()+1900, today.getMonth()+1, 0).getDate();
	//set the IDs of each <td> according to their number in order
	//this is necessary for some reason, since to use .append() to add actual HTML rather than just plain text
	//    jQuery requires to select the elements with their ID rather than just get an array through $("td")
	//    and cycle through the elements of the array
	$('#table td').attr('id', function(i) {
		return (i+1);
	});
	//get index for the day name of the first day of the month
	var firstDay = new Date(today.getYear()+1900, today.getMonth(), 1).getDay();
	//add the number and the textarea for each box in the calendar
	//increase the number by 1 each iteration
	for (var i = 1; i <= maxDaysThisMonth; i++) {
		$("td#" + String(firstDay+i)).append(String(i));
		$("td#" + String(firstDay+i)).append("<br><textarea rows=4 id='ta" + i + "'></textarea>");
	}
	
	//get cookies and input them into the boxes
	var cookieList = document.cookie.split(";");
	for (var j = 0; j < cookieList.length-1; j++) {
	  var boxID = cookieList[j].split("=")[0];
	  $("#" + boxID.trim()).val(decodeURIComponent(String(cookieList[j].split("=")[1])));
	}
	$("#toDoList").val(decodeURIComponent(String(cookieList[cookieList.length-1].split("=")[1])));
	
	//add "current" class to the <td> with today's date
	$("td#" + String(todayNumber + firstDay)).addClass("current");
	//toggle "highlighted" class when a <td> is clicked
	$("td").click(function() {
		$(this).toggleClass("highlighted");
	});

	//function that saves data to cookies
	var expireDate = new Date(today.getYear()+1900, today.getMonth()+1, 1);
	function saveNewCookies() {
	  var cookieString = "";
	  for (var i = 1; i <= maxDaysThisMonth; i++) {
	    cookieString = "ta" + i + "=" + encodeURIComponent(String($("#ta" + i).val())) + ";expires=" + expireDate.toUTCString() + ";";
	    document.cookie = cookieString;
	  }
	  document.cookie = "toDoList=" + encodeURIComponent(String($("#toDoList").val())) + ";expires=" + expireDate.toUTCString() + ";";
	}
	
	//function that deletes all cookies
	function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }
	
	//save data when button is pressed
	$("button.btn-success").click(function() {
		deleteAllCookies();
		saveNewCookies();
	});
	
	//delete all cookies when button is pressed
	$("button.btn-danger").click(function() {
	  deleteAllCookies();
	});
});