var SITE_INDEX = 'http://paracetamol.app';

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
		window.location.href = SITE_INDEX+link;
	});

	if ($('#weight').length > 0) {
		calculatedose();
	}

});

function calculatedose ()
{
	$("#weight").on('change', function() {
		var w=$("#weight").val()

		var first_ampule = 0;
		var second_ampule = 0;
		var third_ampule = 0;
		
		if (w == 1) {
			first_ampule = 3;
			second_ampule = 8;
			third_ampule = 16;
		} else if (w == 2) {

		} else if (w == 3) {

		} else if (w == 4) {

		} else if (w == 5) {

		} else if (w == 6) {

		} else if (w == 7) {

		} else if (w == 8) {

		} else if (w == 9) {

		} else if (w >=10 && w <= 14) {

		} else if (w >=15 && w <= 19) {

		} else if (w >=20 && w <= 24) {

		} else if (w >=25 && w <= 29) {

		} else if (w >=30 && w <= 34) {

		} else if (w >=35 && w <= 39) {

		} else if (w >=40 && w <= 49) {

		} else if (w >=50 && w <= 59) {

		} else if (w >=60 && w <= 69) {

		} else if (w >=70 && w <= 79) {

		} else if (w >=80 && w <= 89) {

		} else if (w >=90 && w <= 99) {

		} else if (w >=100 && w <= 109) {

		} else if (w >=110) {

		} else {
			// show some error
		}

		$('#firstAmpule').html(first_ampule);
		$('#secondAmpule').html(second_ampule);
		$('#thirdAmpule').html(third_ampule);
	});
}