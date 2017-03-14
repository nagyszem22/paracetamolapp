$(document).ready(function(){

	/*requesData = {};
	requesData.currentDateTime = "11-05-17 18:45:00";
	requesData.name = "John Doe";
	requesData.birthday = "11-05-17";
	requesData.nhsNumber = "5423524";
	requesData.ingestionDateTime = "11-05-17 18:45:00";

	$.ajax({
		url: "http://localhost:8888/paracetamolapp/api/public/api/v1/maindetails",
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify(requesData),
		success: function(data) {
	        console.log(data);
	        // $('.hello').html(data.name);
	 }}); */


	/* Toggle help text */
	$('.help-button').on('click', function() {
		$(this).parent('.input-label').parent('.input-box').children('.help-text').toggle();
	});

	/* Show next page */
	$('.next-button').on('click', function() {
		var link = $(this).attr('data-link');
		window.location.href = link;
	});

});