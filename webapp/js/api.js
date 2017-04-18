var SITE_INDEX_API = 'http://paracetamolapi.app';

$(document).on('click', '.next-button', function() {

	var link = $(this).attr('data-link');

	/* patient details call */
	if (link == '/first_blood.html') 
	{
		/* show page loader on the page */
		$('.page-loader').show();

		/* coolect data to send to the server */
		requesData = {};
		requesData.currentDateTime = $('#datetimepicker1').val();
		requesData.name = $('#name').val();
		requesData.birthday = $('#datepicker').val();
		requesData.nhsNumber = $('#nhsNumber').val();
		requesData.ingestionDateTime = $('#datetimepicker2').val();

		$.ajax({
			url: SITE_INDEX_API+"/api/v1/patientdetails",
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify(requesData),
			success: function(data) {
				if (data.status.code == 0) {

					/* save answer to local storage */
					localStorage.setItem('patient', JSON.stringify(data.content.patient));
					localStorage.setItem('ingestion', JSON.stringify(data.content.ingestion));

					/* redirect to the next page */
					if (data.content.ingestion.firstStep == 'dosage') {
						window.location.href = SITE_INDEX+'/treatments.html';
					} else {
						window.location.href = SITE_INDEX+'/first_blood.html';
					}

				/* handle error events */
				} else if (data.status.code == 1) {
					$('.page-loader').hide();
				} else {
					$('.page-loader').hide();
				}

		 }});
	}


	/* patient details call */
	else if (link == '/chart.html')
	{
		/* show page loader on the page */
		$('.page-loader').show();

		/* coolect data to send to the server */
		requesData = {};
		requesData.paracetamolConcDateTime = $('#datetimepicker1').val();
		requesData.ueDateTime = $('#datetimepicker2').val();
		requesData.lftDateTime = $('#datetimepicker3').val();
		requesData.creatineDateTime = $('#datetimepicker4').val();
		requesData.inrDateTime = $('#datetimepicker5').val();
		requesData.ingestionDateTime = JSON.parse(localStorage.patient).ingestionDateTime;

		$.ajax({
			url: SITE_INDEX_API+"/api/v1/initialbloodtest",
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify(requesData),
			success: function(data) {
				$('.page-loader').hide();
				if (data.status.code == 0) {

					/* save answer to local storage */
					localStorage.setItem('initialBloodTest', JSON.stringify(data.content.initialBloodTest));

					/* redirect to the next page */
					window.location.href = SITE_INDEX+'/chart.html';

				/* handle error events */
				} else if (data.status.code == 1) {
					$('.page-loader').hide();
				} else {
					$('.page-loader').hide();
				}

		}});
	}


	/* redirect after chart */
	else if (link == '/treatments.html') {
		window.location.href = SITE_INDEX+link;
	}



	/* redirect after chart */
	else if (link == '/second_blood.html') {
		window.location.href = SITE_INDEX+link;
	}

});



////////////////////////////////
/// REAL TIME FUNCTIONS
////////////////////////////////
var api = {};
api.chartUpdate = function (paracetamolConc)
{
	var hours = JSON.parse(localStorage.initialBloodTest).hoursAgo;
	var minutes = JSON.parse(localStorage.initialBloodTest).minutesAgo;

	/* show page loader on the page */
	$('.page-loader').show();

	/* coolect data to send to the server */
	requesData = {};
	requesData.minutes = JSON.parse(localStorage.initialBloodTest).minutesAgo;
	requesData.hours = JSON.parse(localStorage.initialBloodTest).hoursAgo;
	requesData.conc = paracetamolConc;

	$.ajax({
		url: SITE_INDEX_API+"/api/v1/chart",
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify(requesData),
		success: function(data) {
			$('.page-loader').hide();
			if (data.status.code == 0) {

				chart.series[0].update({data: data.content.treatmentLine});
				chart.series[1].update({data: data.content.plasmaLine});
				$('.indication-box').html(data.content.indication);

				/* save answer to local storage */
				localStorage.setItem('paracetamolPathway', JSON.stringify(data.content));

			/* handle error events */
			} else if (data.status.code == 1) {
				$('.page-loader').hide();
			} else {
				$('.page-loader').hide();
			}

	}});
}



api.treatmentUpdate = function (kilos)
{
	/* show page loader on the page */
	$('.page-loader').show();

	/* coolect data to send to the server */
	requesData = {};
	requesData.kilos = kilos;

	$.ajax({
		url: SITE_INDEX_API+"/api/v1/treatment",
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify(requesData),
		success: function(data) {
			$('.page-loader').hide();
			console.log(data);
			if (data.status.code == 0) {

				/* save answer to local storage */
				localStorage.setItem('treatment', JSON.stringify(data.content));
				$('#firstAmpule').html(data.content.firstAmpule);
				$('#secondAmpule').html(data.content.secondAmpule);
				$('#thirdAmpule').html(data.content.thirdAmpule);

			/* handle error events */
			} else if (data.status.code == 1) {
				$('.page-loader').hide();
			} else {
				$('.page-loader').hide();
			}

	}});
}