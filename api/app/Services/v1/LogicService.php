<?php

namespace App\Services\v1;

use DB;

/**
* @todo add comment here
*/
class LogicService extends Service
{    
    /* save patient details */
    public function patientDetails($input)
    {
        /* calculate the time difference between the current time and the ingestion time */
        $now = strtotime($input['currentDateTime']);
        $ingestion = strtotime($input['ingestionDateTime']);
        $diff = $now - $ingestion;
        $seconds = $diff % 60;
        $minutes = (($diff-$seconds) / 60) % 60;
        $hours = ($diff-$seconds-$minutes*60) / (60*60);

        /* create the answe array */
        $output = array();
        $output['patient'] = $input;
        if ($hours >= 8) {
            $output['ingestion']['firstStep'] = 'dosage';
        } else {
            $output['ingestion']['firstStep'] = 'initialBloodTest';
        }
        $output['ingestion']['hoursAgo'] = $hours;
        $output['ingestion']['minutesAgo'] = $minutes;

        return $this->createResponse($output);
    }



    /* save initial blood test details */
    public function initialBloodTest($input)
    {
        /* calculate the time difference between the paracetamol concentration blood test time and the ingestion time */
        $paracetamolConc= strtotime($input['paracetamolConcDateTime']);
        $ingestion = strtotime($input['ingestionDateTime']);
        $diff = $paracetamolConc - $ingestion;
        $seconds = $diff % 60;
        $minutes = (($diff-$seconds) / 60) % 60;
        $hours = ($diff-$seconds-$minutes*60) / (60*60);

        /* create the answer array */
        $output = array();
        $output['initialBloodTest'] = $input;
        $output['initialBloodTest']['hoursAgo'] = $hours;
        $output['initialBloodTest']['minutesAgo'] = $minutes;

        return $this->createResponse($output);
    }



    public function chart($input)
    {
        /* get the main parameters */
        $output = array();
        $hours = $input['hours'];
        $minutes = $input['minutes'];
        $pc = $input['conc'];
        $k = log(2);
        $e1 = exp(1);
        $b = 200;
        $h = 4;
        if($minutes > 0) { 
            $time = $hours + ($minutes / 60);
        } else {
            $time = $hours; 
            $minutes = 0;
        }

        /* Calculate the threshold for treatment at the hrs after ingestion entered (time) */
        $e = log($b) - ($time * $k / $h);
        $e = pow($e1, $e);
        $e = round($e);

        /* Add indication to treat or not to the chart */
        if ($time > 4) {
            if ($pc > $e) {
                $output['indication'] = "At ".$hours." hrs and ".$minutes." mins the threshold for treatment is above ".$e."mg/l - therfore treatment is indicated";
            } else {
                $output['indication'] = "At ".$hours." hrs and ".$minutes." mins the threshold for treatment is above ".$e."mg/l - therfore treatment is not indicated";
            }
        } else {
            $output['indication'] = "At under 4 hrs Paracteamol Plasma levels are not reliable enough to determine treatment";
        }

        /* Add treatment line points */
        $output['treatmentLine'] = [null, null, null, null, 100, 84, 71, 59, 50, 42, 35, 30, 25, 21, 18, 15, 12];

        /* Calculate plasma concentration at 1 hr */
        $e = log($pc / 2) + ($time * $k / $h);
        $e = pow($e1, $e);
        $e = round($e);
        $pc = $e;

        /* Calculate plasma concentration from 1hr to 16hrs */
        $output['plasmaLine'] = array();
        $output['plasmaLine'][0] = 0;
        for ($i = 1; $i < 17; $i++) {
            $e = log($pc * 2) - ($i * $k / $h);
            $e = pow($e1, $e);
            $e = round($e);

            /* Push plasma concentration into array */
            $output['plasmaLine'][$i] = $e;
        }

        /* Add paracetamol concentration */
        $output['paracetamolConc'] = $input['conc'];

        return $this->createResponse($output);
    }



    public function treatment($input)
    {
        $kilos = $input['kilos'];

        $output['weight'] = $kilos;
        if ($kilos == 1) { 
            $output['firstAmpule'] = 3; $output['secondAmpule'] = 8; $output['thirdAmpule'] = 16;
        } else if ($kilos == 2) { 
            $output['firstAmpule'] = 6; $output['secondAmpule'] = 16; $output['thirdAmpule'] = 32;
        } else if ($kilos == 3) { 
            $output['firstAmpule'] = 9; $output['secondAmpule'] = 24; $output['thirdAmpule'] = 48;
        } else if ($kilos == 4) { 
            $output['firstAmpule'] = 12; $output['secondAmpule'] = 32; $output['thirdAmpule'] = 64;
        } else if ($kilos == 5) {
            $output['firstAmpule'] = 15;$output['secondAmpule'] = 40; $output['thirdAmpule'] = 80;
        } else if ($kilos == 6) {
            $output['firstAmpule'] = 18; $output['secondAmpule'] = 48; $output['thirdAmpule'] = 96;
        } else if ($kilos == 7) {
            $output['firstAmpule'] = 21; $output['secondAmpule'] = 56; $output['thirdAampule'] = 112;
        } else if ($kilos == 8) {
            $output['firstAmpule'] = 24; $output['secondAmpule'] = 64; $output['thirdAmpule'] = 128;
        } else if ($kilos == 9) {
            $output['firstAmpule'] = 27; $output['secondAmpule'] = 72; $output['thirdAmpule'] = 144;
        } else if ($kilos >=10 && $kilos <= 14) {
            $output['firstAmpule'] = 38; $output['secondAmpule'] = 100; $output['thirdAmpule'] = 208;
        } else if ($kilos >=15 && $kilos <= 19) {
            $output['firstAmpule'] = 53; $output['secondAmpule'] = 140; $output['thirdAmpule'] = 288;
        } else if ($kilos >=20 && $kilos <= 24) {
            $output['firstAmpule'] = 68; $output['secondAmpule'] = 180; $output['thirdAmpule'] = 368;
        } else if ($kilos >=25 && $kilos <= 29) {
            $output['firstAmpule'] = 83; $output['secondAmpule'] = 220; $output['thirdAmpule'] = 448;
        } else if ($kilos >=30 && $kilos <= 34) {
            $output['firstAmpule'] = 98; $output['secondAmpule'] = 260; $output['thirdAmpule'] = 528;
        } else if ($kilos >=35 && $kilos <= 39) {
            $output['firstAmpule'] = 113; $output['secondAmpule'] = 300; $output['thirdAmpule'] = 608;
        } else if ($kilos >=40 && $kilos <= 49) {
            $output['firstAmpule'] = 234; $output['secondAmpule'] = 512; $output['thirdAmpule'] = 1024;
        } else if ($kilos >=50 && $kilos <= 59) { 
            $output['firstAmpule'] = 242; $output['secondAmpule'] = 516; $output['thirdAmpule'] = 1024;
        } else if ($kilos >=60 && $kilos <= 69) { 
            $output['firstAmpule'] = 249; $output['secondAmpule'] = 516; $output['thirdAmpule'] = 1040;
        } else if ($kilos >=70 && $kilos <= 79) { 
            $output['firstAmpule'] = 257; $output['secondAmpule'] = 520; $output['thirdAmpule'] = 1040;
        } else if ($kilos >=80 && $kilos <= 89) { 
            $output['firstAmpule'] = 264; $output['secondAmpule'] = 524; $output['thirdAmpule'] = 1040;
        } else if ($kilos >=90 && $kilos <= 99) { 
            $output['firstAmpule'] = 272; $output['secondAmpule'] = 524; $output['thirdAmpule'] = 1056;
        } else if ($kilos >=100 && $kilos <= 109) { 
            $output['firstAmpule'] = 279; $output['secondAmpule'] = 528; $output['thirdAmpule'] = 1056;
        } else {
            $output['firstAmpule'] = 283; $output['secondAmpule'] = 528; $output['thirdAmpule'] = 1056;
        }

        return $this->createResponse($output);
    }
}