var SITE_INDEX = 'http://paracetamol.app';
var chart = {};

$(document).ready(function(){

	/* Show next page */
	/*$('.next-button').on('click', function() {
		var link = $(this).attr('data-link');
		window.location.href = SITE_INDEX+link;
	});*/

    $('.previous-button').on('click', function() {
        var link = $(this).attr('data-link');
        window.location.href = SITE_INDEX+link;
    });

    $('.start-button').on('click', function() {
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
	            'max': 110
	        }
	    });
	}

	if ($('#slider1').length && $('#slider2').length) {
		slider1.noUiSlider.on('change', function(values, handle) {
			var kilos = values[handle];
			var pounds = Math.round(values[handle] * 0.453592);
			$('#weight1').val(kilos);
			$('#weight2').val(pounds);
			slider2.noUiSlider.set(pounds);
			api.treatmentUpdate(kilos);
		});
		slider2.noUiSlider.on('change', function(values, handle) {
			var kilos = Math.round(values[handle] * 2.20462);
			var pounds = values[handle];
	        $('#weight1').val(kilos);
			$('#weight2').val(pounds);
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
			}
		});
		slider3.noUiSlider.on('update', function(values, handle) {
			$('#paracetamolConcentration').val(values[handle]);
		});
		slider3.noUiSlider.on('change', function(values, handle) {
			api.chartUpdate(values[handle]);
		});
    }

    if ($('#container').length != 0) {
    	initChart();
    }
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
	$('.patient-details-on-chart .birthday').html(patient.birthday);
	$('.patient-details-on-chart .nhsNumber').html(patient.nhsNumber);
	$('.patient-details-on-chart .date').html(patient.currentDateTime);
	$('#initialBloodTestHours').val(initialBloodTest.hoursAgo);
	$('#initialBloodTestMinutes').val(initialBloodTest.minutesAgo);
}
