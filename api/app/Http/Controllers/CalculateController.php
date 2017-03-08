<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class CalculateController extends Controller
{
    public function add($firstNumber, $secondNumber, $thirdNumber = 0) 
    {
    	$output = array();
    	$output['operation'] = "addition";
    	$output['result'] = $firstNumber + $secondNumber + $thirdNumber;
    	return json_encode($output);
    }
}
