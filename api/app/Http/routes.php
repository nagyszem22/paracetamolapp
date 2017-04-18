<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/


Route::group(['prefix' => 'api', 'middleware' => ['api']], function () {
	
	/* patient details route */
    Route::post('/v1/patientdetails', ['uses' => 'v1\AppController@patientDetails']);

    /* initial blood test route */
    Route::post('/v1/initialbloodtest', ['uses' => 'v1\AppController@initialBloodTest']);

    /* chart route */
    Route::post('/v1/chart', ['uses' => 'v1\AppController@chart']);

    /* treatment route */
    Route::post('/v1/treatment', ['uses' => 'v1\AppController@treatment']);

});
