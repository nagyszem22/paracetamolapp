var SITE_INDEX_API = 'http://localhost:8888/paracetamoloverdose/api/public';

$(document).on('click', ' .make-ajax-call', function() {

	var link = $(this).attr('data-link');

	/* patient details call */
	if (link == '/first_blood.html') 
	{
		/* remove all the errors */
		$('input').css("border", "none");
		$('.input-error').remove();

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
						// window.location.href = SITE_INDEX+'/treatments.html';
						$('.page-loader').hide();
						modalTinyBtn.open();
					} else {
						window.location.href = SITE_INDEX+'/first_blood.html';
					}

				/* handle error events */
				} else if (data.status.code == 1) {
					$('.page-loader').hide();
					api.errorHandling(data.content);
				} else {
					$('.page-loader').hide();
				}

		 }});
	}


	/* initial blood test call */
	else if (link == '/chart.html')
	{
		/* Check whether the dates are all given */
		var hasDateError = false;
		for (var i = 2; i <= 5; i++) {
			var dom = $('#datetimepicker'+i);
			if(!dom.parent('.input-box').find('.date-input-checkbox').is(":checked") && dom.val() == '') {
				if (dom.parent('.input-box').find('.input-error').length == 0) {
					dom.css("border", "2px solid #e74c3c");
					dom.after("<div class='input-error'>Please add a date or select N/A if the blood test was not taken!</div>");
				}
				hasDateError = true;
			} else if(dom.parent('.input-box').find('.date-input-checkbox').is(":checked") || dom.val() != '') {
				if (dom.parent('.input-box').find('.input-error').length != 0) {
					if (dom.css("border") == '2px solid rgb(231, 76, 60)') {
						dom.css("border", "2px solid #fff");
					}
					dom.parent('.input-box').find('.input-error').remove();
				}
			} 
		}
		if(hasDateError) {
			$('.page-loader').hide();
			return;
		}

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
					if (data.content.initialBloodTest.hoursAgo <= 4) {
						modalTinyBtn.open();
					} else {
						window.location.href = SITE_INDEX+'/chart.html';
					}

				/* handle error events */
				} else if (data.status.code == 1) {
					$('.page-loader').hide();
					api.errorHandling(data.content);
				} else {
					$('.page-loader').hide();
				}

		}});
	}


	/* final blood test call */
	else if (link == '/summary.html')
	{
		/* Check whether the dates are all given */
		var hasDateError = false;
		for (var i = 1; i <= 4; i++) {
			var dom = $('#datetimepicker'+i);
			if(!dom.parent('.input-box').find('.date-input-checkbox').is(":checked") && dom.val() == '') {
				if (dom.parent('.input-box').find('.input-error').length == 0) {
					dom.css("border", "2px solid #e74c3c");
					dom.after("<div class='input-error'>Please add a date or select N/A if the blood test was not taken!</div>");
				}
				hasDateError = true;
			} else if(dom.parent('.input-box').find('.date-input-checkbox').is(":checked") || dom.val() != '') {
				if (dom.parent('.input-box').find('.input-error').length != 0) {
					if (dom.css("border") == '2px solid rgb(231, 76, 60)') {
						dom.css("border", "2px solid #fff");
					}
					dom.parent('.input-box').find('.input-error').remove();
				}
			} 
		}
		if(hasDateError) {
			$('.page-loader').hide();
			return;
		}

		/* show page loader on the page */
		$('.page-loader').show();

		/* coolect data to send to the server */
		requesData = {};
		requesData.ueDateTime = $('#datetimepicker1').val();
		requesData.lftDateTime = $('#datetimepicker2').val();
		requesData.creatineDateTime = $('#datetimepicker3').val();
		requesData.inrDateTime = $('#datetimepicker4').val();

		$.ajax({
			url: SITE_INDEX_API+"/api/v1/finalbloodtest",
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify(requesData),
			success: function(data) {
				$('.page-loader').hide();
				if (data.status.code == 0) {

					/* save answer to local storage */
					localStorage.setItem('finalBloodTest', JSON.stringify(data.content));

					/* redirect to the next page */
					window.location.href = SITE_INDEX+link;

				/* handle error events */
				} else if (data.status.code == 1) {
					$('.page-loader').hide();
					api.errorHandling(data.content);
				} else {
					$('.page-loader').hide();
				}

		}});
	}


	/* redirect in any other casses */
	else {
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

				/* Do some action if treatment is not needed */
				if (data.content.isTreatmentNeeded == 0) {
					modalTinyBtn.open();
				}

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
			if (data.status.code == 0) {

				/* save answer to local storage */
				localStorage.setItem('treatment', JSON.stringify(data.content));
				$('#firstAmpule').html(data.content.firstAmpule);
				$('#secondAmpule').html(data.content.secondAmpule);
				$('#thirdAmpule').html(data.content.thirdAmpule);
				$('#ICvol1').html(data.content.ICvol1);
				$('#ICvol2').html(data.content.ICvol2);
				$('#ICvol3').html(data.content.ICvol3);
				$('#rate1').html(data.content.rate1);
				$('#rate2').html(data.content.rate2);
				$('#rate3').html(data.content.rate3);

			/* handle error events */
			} else if (data.status.code == 1) {
				$('.page-loader').hide();
			} else {
				$('.page-loader').hide();
			}

	}});
}

api.timelineUpdate = function(ingestionDateTime)
{
	/* remove all the errors */
	$('input').css("border", "none");
	$('.input-error').remove();

	/* show page loader on the page */
	$('.page-loader').show();

	/* coolect data to send to the server */
	requesData = {};
	requesData.currentDateTime = $('#datetimepicker1').val();
	requesData.ingestionDateTime = ingestionDateTime;

	$.ajax({
		url: SITE_INDEX_API+"/api/v1/timeline",
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify(requesData),
		success: function(data) {
			if (data.status.code == 0) {
				$('.page-loader').hide();

				/* redirect to the next page */
				var screenWidth = $(window).width();

				var bodyPixels = 80*(screenWidth/100);

				var divPixels = 80*(bodyPixels/100);

				var finalPixels = 83*(divPixels/100);

				var fullPixels = finalPixels + 0.5*(divPixels/100);

                var minutes = data.content.minutesAgo / 60;
				var hours = data.content.hoursAgo + minutes;
				if (hours >= 24) {
					$('.ingestion-timeline .switch').animate({ left: fullPixels + 'px'});
				} else {
					var pixel = Math.round((hours / 24.7) * finalPixels);
					$('.ingestion-timeline .switch').animate({ left: pixel+'px' });
					// $('.ingestion-timeline .switch').css('left', pixel+'px');
				}
				$('.ingestion-ago').html('The ingestion was '+data.content.hoursAgo+' hours and '+data.content.minutesAgo+' minutes ago.')

			/* handle error events */
			} else if (data.status.code == 1) {
				$('.page-loader').hide();
				api.errorHandling(data.content);
			} else {
				$('.page-loader').hide();
			}

	 }});
}


////////////////////////////////
/// HELPER FUNCTIONS
////////////////////////////////
api.errorHandling = function (errors)
{
	for (var key in errors) {
		$("[name='"+key+"']").css("border", "2px solid #e74c3c");
		$("[name='"+key+"']").after("<div class='input-error'>"+errors[key]+"</div>");
	}
}