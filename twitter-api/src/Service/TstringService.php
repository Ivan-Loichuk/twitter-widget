<?php
declare(strict_types=1);
namespace App\Service;

class TstringService
{
    /**
     * @return TstringService
     */
    public static function Instance()
    {
        static $inst = null;
        if ($inst === null) {
            $inst = new TstringService();
        }
        return $inst;
    }

    private function __construct(){}

    /**
     * @param array $array
     * @param string $delimiter
     * @return string
     */
    public static function buildHttpQuery(array $array, string $delimiter): string
    {
        $http_query = '';
        foreach($array as $key => $value) {
            $http_query .= $key . '=' . $value . $delimiter;
        }

        return !empty($http_query) ? substr($http_query, 0, -1) : '';
    }
}