<?php


namespace App\Service;


interface TwitterApiInterface
{
    function getRequestData(string $api_url, array $params);

}