var SITE_INDEX = 'http://localhost:8888/paracetamolapp/webapp/';

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

	var slider = document.getElementById('slider');
	noUiSlider.create(slider, {
		start: [10],
		connect: true,
		step: 1,
		range: {
			'min': 0,
			'max': 180
		}
	});

	slider.noUiSlider.on('update', function(values, handle) {
		$('#weight').val(values[handle]);
		calculatedose(values[handle]);
	});

});

function calculatedose (w)
{
	var first_ampule = 0;
	var second_ampule = 0;
	var third_ampule = 0;

	if (w == 1) {
		first_ampule = 3;
		second_ampule = 8;
		third_ampule = 16;
	} else if (w == 2) {
		first_ampule = 6;
		second_ampule = 16;
		third_ampule = 32;
	} else if (w == 3) {
		first_ampule = 9;
		second_ampule = 24;
		third_ampule = 48;
	} else if (w == 4) {
		first_ampule = 12;
		second_ampule = 32;
		third_ampule = 64;
	} else if (w == 5) {
		first_ampule = 15;
		second_ampule = 40;
		third_ampule = 80;
	} else if (w == 6) {
		first_ampule = 18;
		second_ampule = 48;
		third_ampule = 96;
	} else if (w == 7) {
		first_ampule = 21;
		second_ampule = 56;
		third_ampule = 112;
	} else if (w == 8) {
		first_ampule = 24;
		second_ampule = 64;
		third_ampule = 128;
	} else if (w == 9) {
		first_ampule = 27;
		second_ampule = 72;
		third_ampule = 144;
	} else if (w >=10 && w <= 14) {
		first_ampule = 38;
		second_ampule = 100;
		third_ampule = 208;
	} else if (w >=15 && w <= 19) {
		first_ampule = 53;
		second_ampule = 140;
		third_ampule = 288;
	} else if (w >=20 && w <= 24) {
		first_ampule = 68;
		second_ampule = 180;
		third_ampule = 368;
	} else if (w >=25 && w <= 29) {
		first_ampule = 83;
		second_ampule = 220;
		third_ampule = 448;
	} else if (w >=30 && w <= 34) {
		first_ampule = 98;
		second_ampule = 260;
		third_ampule = 528;
	} else if (w >=35 && w <= 39) {
		first_ampule = 113;
		second_ampule = 300;
		third_ampule = 608;
	} else if (w >=40 && w <= 49) {
		first_ampule = 234;
		second_ampule = 512;
		third_ampule = 1024;
	} else if (w >=50 && w <= 59) {
		first_ampule = 242;
		second_ampule = 516;
		third_ampule = 1024;
	} else if (w >=60 && w <= 69) {
		first_ampule = 249;
		second_ampule = 516;
		third_ampule = 1040;
	} else if (w >=70 && w <= 79) {
		first_ampule = 257;
		second_ampule = 520;
		third_ampule = 1040;
	} else if (w >=80 && w <= 89) {
		first_ampule = 264;
		second_ampule = 524;
		third_ampule = 1040;
	} else if (w >=90 && w <= 99) {
		first_ampule = 272;
		second_ampule = 524;
		third_ampule = 1056;
	} else if (w >=100 && w <= 109) {
		first_ampule = 279;
		second_ampule = 528;
		third_ampule = 1056;
	} else if (w >=110) {
		first_ampule = 283;
		second_ampule = 528;
		third_ampule = 1056;
	} else {
		// show some error
	}

	$('#firstAmpule').html(first_ampule);
	$('#secondAmpule').html(second_ampule);
	$('#thirdAmpule').html(third_ampule);
}
