$(document).ready(function(){

	requesData = {};
	requesData.currentDateTime = "11-05-17 18:45:00";
	requesData.name = "John Doe";
	requesData.birthday = "11-05-17";
	requesData.nhsNumber = "54239524";
	requesData.ingestionDateTime = "11-05-17 18:45:00";

	$.ajax({
		url: "http://paracetamolapi.app/api/v1/maindetails",
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify(requesData),
		success: function(data) {
	        console.log(data);
	        $('.hello').html(data.name);
	 }});

});