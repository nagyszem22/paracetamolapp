var SITE_INDEX = 'http://localhost:8888/paracetamoloverdose/webapp/';
var chart = {};

$(document).ready(function(){

	/* Show next page */
	$('.next-button').on('click', function() {
		$('.page-loader').show();
		if(!$(this).hasClass('make-ajax-call')) {
	       var link = $(this).attr('data-link');
			window.location.href = SITE_INDEX+link;           
	   }
	});

    $('.previous-button').on('click', function() {
    	$('.page-loader').show();
        var link = $(this).attr('data-link');
        window.location.href = SITE_INDEX+link;
    });

    $('.start-button').on('click', function() {
    	$('.page-loader').show();
        var link = $(this).attr('data-link');
        window.location.href = SITE_INDEX+link;
    });

   	var slider1 = {};
   	var slider2 = {};

    if ($('#slider1').length) {
    	var slider1 = document.getElementById('slider1');
		noUiSlider.create(slider1, {
			start: [10],
			connect: true,
			step: 1,
			range: {
				'min': 0,
				'max': 243
			},
			pips: {
				mode: 'range',
				density: 3
			}
		});
    }
	
	if ($('#slider2').length) {
	    var slider2 = document.getElementById('slider2');
	    noUiSlider.create(slider2, {
	        start: [10],
	        connect: true,
	        step: 1,
	        range: {
	            'min': 0,
	            'max': 536
	        },
			pips: {
				mode: 'range',
				density: 3
			}
	    });
	}

	if ($('#slider1').length && $('#slider2').length) {
		$('#weight1').on('change', function(){
			var weight = parseInt($(this).val());
			var kilos = weight;
			var pounds = Math.round(weight * 2.20462);
			slider1.noUiSlider.set(kilos);
			slider2.noUiSlider.set(pounds);
			api.treatmentUpdate(kilos);
		});
		$('#weight2').on('change', function(){
			var weight = parseInt($(this).val());
			var kilos = Math.round(weight * 0.453592);
			var pounds = weight;
			slider1.noUiSlider.set(kilos);
			slider2.noUiSlider.set(pounds);
			api.treatmentUpdate(kilos);
		});
		slider1.noUiSlider.on('update', function(values, handle) {
			var kilos = values[handle];
			var pounds = Math.round(values[handle] * 2.20462);
			$('#weight1').val(kilos);
			$('#weight2').val(pounds);
		});
		slider1.noUiSlider.on('change', function(values, handle) {
			var kilos = values[handle];
			var pounds = Math.round(values[handle] * 2.20462);
			slider2.noUiSlider.set(pounds);
			api.treatmentUpdate(kilos);
		});
		slider2.noUiSlider.on('update', function(values, handle) {
			var kilos = Math.round(values[handle] * 0.453592);
			var pounds = values[handle];
			$('#weight1').val(kilos);
			$('#weight2').val(pounds);
		});
		slider2.noUiSlider.on('change', function(values, handle) {
			var kilos = Math.round(values[handle] * 0.453592);
			var pounds = values[handle];
	        slider1.noUiSlider.set(kilos);
	        api.treatmentUpdate(kilos);
	    });
    }


	if ($('#slider3').length) {
    	var slider3 = document.getElementById('slider3');
		noUiSlider.create(slider3, {
			start: [10],
			connect: true,
			step: 1,
			range: {
				'min': 0,
				'max': 500
			},
			pips: {
				mode: 'range',
				density: 3
			}
		});
		slider3.noUiSlider.on('update', function(values, handle) {
			$('#paracetamolConcentration').val(values[handle]);
		});
		slider3.noUiSlider.on('change', function(values, handle) {
			api.chartUpdate(values[handle]);
		});
		$('#paracetamolConcentration').on('change', function(){
			var conc = parseInt($(this).val());
			slider3.noUiSlider.set(conc);
			api.chartUpdate(conc);
		})
    }

    if ($('#container').length != 0) {
    	initChart();
    }

    if($('.summary-of-details').length != 0) {
    	/* get local storage content */
    	patient = JSON.parse(localStorage.patient);
    	initialBloodTest = JSON.parse(localStorage.initialBloodTest);
    	ingestion = JSON.parse(localStorage.ingestion);
    	paracetamolPathway = JSON.parse(localStorage.paracetamolPathway);
    	treatment = JSON.parse(localStorage.treatment);
    	finalBloodTest = JSON.parse(localStorage.finalBloodTest);

    	$('.detail .date').html(patient.currentDateTime);
    	$('.detail .ingestion').html(patient.ingestionDateTime+' ('+ingestion.hoursAgo+' hours and '+ingestion.minutesAgo+' minutes ago)');
   		$('.detail .name').html(patient.name);
   		$('.detail .nhsNumber').html(patient.nhsNumber);
   		$('.detail .birthday').html(patient.birthday);
   		$('.detail .weight').html(treatment.weight+' kgs');
   		$('.detail .paracetamolConcDateTime').html(initialBloodTest.paracetamolConcDateTime);
   		$('.detail .paracetamolConc').html(paracetamolPathway.paracetamolConc+' mg/litre');
   		$('#firstAmpule').html(treatment.firstAmpule);
		$('#secondAmpule').html(treatment.secondAmpule);
		$('#thirdAmpule').html(treatment.thirdAmpule);
		$('#ICvol1').html(treatment.ICvol1);
		$('#ICvol2').html(treatment.ICvol2);
		$('#ICvol3').html(treatment.ICvol3);
		$('#rate1').html(treatment.rate1);
		$('#rate2').html(treatment.rate2);
		$('#rate3').html(treatment.rate3);
   		if(initialBloodTest.ueDateTime.length) {
   			$('.detail .ueDateTimeInitial').html(initialBloodTest.ueDateTime);
   		}
   		if(initialBloodTest.lftDateTime.length) {
   			$('.detail .lftDateTimeInitial').html(initialBloodTest.lftDateTime);
   		}
   		if(initialBloodTest.creatineDateTime.length) {
   			$('.detail .creatineDateTimeInitial').html(initialBloodTest.creatineDateTime);
   		}
   		if(initialBloodTest.inrDateTime.length) {
   			$('.detail .inrDateTimeInitial').html(initialBloodTest.inrDateTime);
   		}
   		if(finalBloodTest.ueDateTime.length) {
   			$('.detail .ueDateTimeFinal').html(finalBloodTest.ueDateTime);
   		}
   		if(finalBloodTest.lftDateTime.length) {
   			$('.detail .lftDateTimeFinal').html(finalBloodTest.lftDateTime);
   		}
   		if(finalBloodTest.creatineDateTime.length) {
   			$('.detail .creatineDateTimeFinal').html(finalBloodTest.creatineDateTime);
   		}
   		if(finalBloodTest.inrDateTime.length) {
   			$('.detail .inrDateTimeFinal').html(finalBloodTest.inrDateTime);
   		} 
    }

    pageOrderManager();


    $('.date-input-switcher').on('click', function(e){
    	/* corect the current status if user clicks on the checkbox */
    	if ($(e.target).hasClass('date-input-checkbox')) {
    		if($(e.target).is(":checked")) { 
    			$(this).children('input').prop('checked', false);               
	    	} else {
			    $(this).children('input').prop('checked', true); 
	    	}
    	}

    	var inputField = $(this).parent('.input-label').parent('.input-box').children('input');
    	if($(this).children('input').is(":checked")) {
    		inputField.prop("disabled", false);
    		inputField.css("background", "#fff");
    		inputField.css("border-width", "2px");
		    $(this).children('input').prop('checked', false);               
    	} else {
    		inputField.prop("disabled", true);
    		inputField.css("background", "#ddd");
    		inputField.css("border-width", "0px");
		    $(this).children('input').prop('checked', true); 
    	}
    });
});



function initChart()
{
	var patient = JSON.parse(localStorage.patient);
	var initialBloodTest = JSON.parse(localStorage.initialBloodTest);

	chart = new Highcharts.chart('container', {
	    chart: 
	    { 
	      renderTo: 'container', 
	      type: 'spline'
	    },
	    title: 
	    {
	        text: patient.name+"  ( NHS No: "+patient.nhsNumber+" )  Date: "+patient.currentDateTime,
	        x: -20 //center
	    },
	    subtitle: {
	        text: 'paracetamol Pathway',
	        x: -20
	    },
	    xAxis: {
	        categories: ['0hr', '1hr', '2hr', '3hr', '4hr', '5hr', '6hr',
	            '7hr', '8hr', '9hr', '10hr', '11hr', '12hr', '13hr', '14hr', '15hr', '16hr',]
	    },
	    yAxis: {
	        title: {
	            text: 'Plasma-paracetamol Concentration (mg/litre)'
	        },
	        plotLines: [{
	            value: 0,
	            width: 1,
	            color: '#808080'
	        }]
	    },
	    tooltip: {
	        valueSuffix: 'mg/l'
	    },
	    legend: {
	        layout: 'horizontal',
	        align: 'center',
	        verticalAlign: 'bottom'
	    },

	    plotOptions: {
	        series: {
	            pointStart: 1
	        }
	    },

	    series: [{
	        name: 'Treatment Line',
	        data: []
	    },
	    {
	        name: 'Plasma Line',
	        data: []
	    }]

	});

	$('.patient-details-on-chart .name').html(patient.name);
	$('.patient-details-on-chart .ingestionDateTime').html(patient.ingestionDateTime);
	$('.patient-details-on-chart .paracetamolConcDateTime').html(initialBloodTest.paracetamolConcDateTime);
	$('#initialBloodTestHours').val(initialBloodTest.hoursAgo);
	$('#initialBloodTestMinutes').val(initialBloodTest.minutesAgo);
}



function initTreatments()
{
	/* get local storage content */
	patient = JSON.parse(localStorage.patient);
	// paracetamolPathway = JSON.parse(localStorage.paracetamolPathway);

	$('.patient-details-on-chart .name').html(patient.name);
	$('.patient-details-on-chart .birthday').html(patient.birthday);
	$('.patient-details-on-chart .age').html(moment().diff(moment(patient.birthday, "MM-DD-YYYY"), 'years'));
	// $('.patient-details-on-chart .nhsNumber').html(patient.nhsNumber);
	// $('.patient-details-on-chart .ingestionDate').html(patient.ingestionDateTime);
	// $('.patient-details-on-chart .paracetamolConc').html(paracetamolPathway.paracetamolConc);
}



function pageOrderManager()
{
	var firstStep = JSON.parse(localStorage.ingestion).firstStep;
	if(firstStep == 'dosage') {
		$('.first-page-in-progress').html('Patient Details');
		$('.second-page-in-progress').html('Dosage Calculation');
		$('.third-page-in-progress').html('Initial Blood Tests');
		$('.fourth-page-in-progress').html('Treatment line');
		$('.fifth-page-in-progress').html('Final Blood Tests');
		showProgress(true);
	} else {
		$('.first-page-in-progress').html('Patient Details');
		$('.second-page-in-progress').html('Initial Blood Tests');
		$('.third-page-in-progress').html('Treatment line');
		$('.fourth-page-in-progress').html('Dosage Calculation');
		$('.fifth-page-in-progress').html('Final Blood Tests');
		showProgress(false);
	}
}

function showProgress(dosageFirst)
{
	var path = window.location.pathname;
	var page = path.split("/").pop();
	console.log(page);
	if (page == 'welcome.html') {
		$('.first-in-progress').addClass("progress-done");
		$('.first-in-progress').addClass("progress-current");
		$('.second-in-progress').addClass("progress-todo");
		$('.third-in-progress').addClass("progress-todo");
		$('.fourth-in-progress').addClass("progress-todo");
		$('.fifth-in-progress').addClass("progress-todo");
	}
	if (page == 'first_blood.html') {
		if (dosageFirst) {
			$('.first-in-progress').addClass("progress-done");
			$('.second-in-progress').addClass("progress-done");
			$('.third-in-progress').addClass("progress-done");
			$('.third-in-progress').addClass("progress-current");
			$('.fourth-in-progress').addClass("progress-todo");
			$('.fifth-in-progress').addClass("progress-todo");
			$('.previous-button').attr('data-link', '/dosage.html');
		} else {
			$('.first-in-progress').addClass("progress-done");
			$('.second-in-progress').addClass("progress-done");
			$('.second-in-progress').addClass("progress-current");
			$('.third-in-progress').addClass("progress-todo");
			$('.fourth-in-progress').addClass("progress-todo");
			$('.fifth-in-progress').addClass("progress-todo");
		}
	}
	if (page == 'chart.html') {
		if (dosageFirst) {
			$('.first-in-progress').addClass("progress-done");
			$('.second-in-progress').addClass("progress-done");
			$('.third-in-progress').addClass("progress-done");
			$('.fourth-in-progress').addClass("progress-done");
			$('.fourth-in-progress').addClass("progress-current");
			$('.fifth-in-progress').addClass("progress-todo");
			$('.next-button').attr('data-link', '/second_blood.html');
			$('.next-button').removeClass('make-ajax-call');
		} else {
			$('.first-in-progress').addClass("progress-done");
			$('.second-in-progress').addClass("progress-done");
			$('.third-in-progress').addClass("progress-done");
			$('.third-in-progress').addClass("progress-current");
			$('.fourth-in-progress').addClass("progress-todo");
			$('.fifth-in-progress').addClass("progress-todo");
		}
	}
	if (page == 'treatments.html') {
		if (dosageFirst) {
			$('.first-in-progress').addClass("progress-done");
			$('.second-in-progress').addClass("progress-done");
			$('.second-in-progress').addClass("progress-current");
			$('.third-in-progress').addClass("progress-todo");
			$('.fourth-in-progress').addClass("progress-todo");
			$('.fifth-in-progress').addClass("progress-todo");
			$('.next-button').attr('data-link', '/first_blood.html');
			$('.next-button').removeClass('make-ajax-call');
			$('.previous-button').attr('data-link', '/welcome.html');
		} else {
			$('.first-in-progress').addClass("progress-done");
			$('.second-in-progress').addClass("progress-done");
			$('.third-in-progress').addClass("progress-done");
			$('.fourth-in-progress').addClass("progress-done");
			$('.fourth-in-progress').addClass("progress-current");
			$('.fifth-in-progress').addClass("progress-todo");
		}
		initTreatments();
	}
	if (page == 'second_blood.html') {
		$('.first-in-progress').addClass("progress-done");
		$('.second-in-progress').addClass("progress-done");
		$('.third-in-progress').addClass("progress-done");
		$('.fourth-in-progress').addClass("progress-done");
		$('.fifth-in-progress').addClass("progress-done");
		$('.fifth-in-progress').addClass("progress-current");
	}
}