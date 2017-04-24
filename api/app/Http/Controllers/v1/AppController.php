<?php

namespace App\Http\Controllers\v1;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Services\v1\LogicService;
use App\Services\v1\ErrorService;

use Validator;

class AppController extends Controller
{
    /* Define service provider(s) */
    protected $logic;
    protected $error;
    public function __construct(LogicService $logic, ErrorService $error)
    {
      $this->logic = $logic;
      $this->error = $error;
    }



   	public function patientDetails(Request $request) 
   	{
        $validator = Validator::make($request->all(), [
            "currentDateTime" => "required|date",
            "name" => "required|max:80",
            "birthday" => "required|date|before:ingestionDateTime",
            "nhsNumber" => "required|numeric|digits:8",
            "ingestionDateTime" => "required|date|before:currentDateTime"
        ]);

        if ($validator->fails()) {
          return response()->json(
                $this->error->formValidationFailed($validator->messages()),
            200);
        }

        return response()->json($this->logic->patientDetails($request->input()));
   	}



    public function timeline(Request $request) 
    {
        $validator = Validator::make($request->all(), [
            "currentDateTime" => "required|date",
            "ingestionDateTime" => "required|date|before:currentDateTime"
        ]);

        if ($validator->fails()) {
          return response()->json(
                $this->error->formValidationFailed($validator->messages()),
            200);
        }

        return response()->json($this->logic->timeline($request->input()));
    }



    public function initialBloodTest(Request $request) 
    {
        $validator = Validator::make($request->all(), [
            "paracetamolConcDateTime" => "required|date|after:ingestionDateTime",
            "ueDateTime" => "date",
            "lftDateTime" => "date",
            "creatineDateTime" => "date",
            "inrDateTime" => "date",
            "ingestionDateTime" => "required|date"
        ]);

        if ($validator->fails()) {
          return response()->json(
                $this->error->formValidationFailed($validator->messages()),
            200);
        }

        return response()->json($this->logic->initialBloodTest($request->input()));
    }



    public function chart(Request $request) 
    {
        $validator = Validator::make($request->all(), [
            "minutes" => "required|numeric",
            "hours" => "required|numeric",
            "conc" => "required|numeric"
        ]);

        if ($validator->fails()) {
          return response()->json(
                $this->error->formValidationFailed($validator->messages()),
            200);
        }

        return response()->json($this->logic->chart($request->input()));
    }



    public function treatment(Request $request) 
    {
        $validator = Validator::make($request->all(), [
            "kilos" => "required|numeric|min:1"
        ]);

        if ($validator->fails()) {
          return response()->json(
                $this->error->formValidationFailed($validator->messages()),
            200);
        }

        return response()->json($this->logic->treatment($request->input()));
    }


    public function finalBloodTest(Request $request) 
    {
        $validator = Validator::make($request->all(), [
            "ueDateTime" => "date",
            "lftDateTime" => "date",
            "creatineDateTime" => "date",
            "inrDateTime" => "date"
        ]);

        if ($validator->fails()) {
          return response()->json(
                $this->error->formValidationFailed($validator->messages()),
            200);
        }

        return response()->json($this->logic->finalBloodTest($request->input()));
    }
}
