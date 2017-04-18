<?php

namespace App\Services\v1;

/**
* @todo add comment here
*/
class ErrorService
{
	public function formValidationFailed($message) 
	{
		return [
    		"status" => [
    			"code" => 1,
    			"name" => "form validation failed"
         	],
         	"content" => $message
    	];
	}
    
}