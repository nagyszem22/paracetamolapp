<?php

namespace App\Http\Controllers\v1;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Validator;

class AppController extends Controller
{
   	public function maindetails(Request $request) 
   	{
   		  /* 
        / Validation
        /--------------------------------- 
        / documentation: https://laravel.com/docs/5.2/validation#other-validation-approaches
        / documentation: https://laravel.com/docs/5.2/validation#available-validation-rules
        */

        $validator = Validator::make($request->all(), [
            "currentDateTime" => "required",
            "name" => "required|max:80",
            "birthday" => "required",
            "nhsNumber" => "required|numeric|digits:8",
            "ingestionDateTime" => "required"
        ]);

        if ($validator->fails()) {
          $answer = [
            "staus" => [
              "code" => 1,
              "name" => "form validation failed"
            ],
            "content" => $validator->messages()
          ];
          return response()->json($answer);
        }

        $answer = [
            "staus" => [
              "code" => 0,
              "name" => "successfull request"
            ],
            "content" => 2
        ];
        return response()->json($answer);

   		  // @todo: connect to openEhr and upload the patient data
  		  // @todo: send back a response
   	}
}
