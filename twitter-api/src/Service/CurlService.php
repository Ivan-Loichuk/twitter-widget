<?php
declare(strict_types=1);

namespace App\Service;

class CurlService
{
    private $curl;

    /**
     * @param string $url
     */
    public function init(string $url = '')
    {
        $this->curl = curl_init($url);
    }

    /**
     * @return bool|string
     */
    public function exec()
    {
        return curl_exec($this->curl);
    }

    /**
     * @param array $options
     * @return bool
     */
    public function setOptArray(array $options): bool
    {
        return curl_setopt_array($this->curl, $options);
    }

    public function __destruct()
    {
        curl_close($this->curl);
    }

    public function error()
    {
        return curl_error($this->curl);
    }
}