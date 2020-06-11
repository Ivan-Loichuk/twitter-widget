<?php
declare(strict_types=1);

namespace App\Service;

use Psr\Log\LoggerInterface;

class TwitterApiService implements TwitterApiInterface
{
    const HOST = 'api.twitter.com';

    /**
     * @var string
     */
    private $api_key;

    /**
     * @var string
     */
    private $api_secret_key;

    /**
     * @var string
     */
    private $access_token;

    /**
     * @var string
     */
    private $token_secret;

    /**
     * @var string
     */
    private $base_url;

    /**
     * @var array
     */
    private $oauth;

    /**
     * @var string
     */
    private $method;

    /**
     * @var string
     */
    private $signature;

    /**
     * @var string
     */
    private $params;

    /**
     * @var LoggerInterface
     */
    private $logger;

    function __construct(LoggerInterface $logger)
    {
        $this->api_key = $_ENV['TW_API_KEY'];
        $this->api_secret_key = $_ENV['TW_API_SECRET_KEY'];
        $this->access_token = $_ENV['TW_ACCESS_TOKEN'];
        $this->token_secret = $_ENV['TW_TOKEN_SECRET'];
        $this->logger = $logger;
    }

    /**
     * @param string $api_path
     * @param array $params
     * @return bool|string
     */
    public function getRequestData(string $api_path, array $params = [])
    {
        $this->setBaseUrl($api_path);
        $this->setMethod('GET');
        $this->setParams($params);
        $this->setOauth();

        $this->calculateSignature($params);

        try {
            return $this->executeRequest();
        } catch (\Exception $e) {
            $this->logger->error($e->getMessage());
            return json_encode([]);
        }
    }

    /**
     * @param mixed $params
     */
    public function setParams($params)
    {
        $this->params = $params;
    }

    /**
     * @param mixed $method
     */
    public function setMethod($method)
    {
        $this->method = $method;
    }

    /**
     * @param string $api_path
     */
    public function setBaseUrl(string $api_path)
    {
        $this->base_url = "https://" . self::HOST . $api_path;
    }

    public function setOauth()
    {
        $this->oauth = [
            'oauth_consumer_key' => $this->api_key,
            'oauth_token' => $this->access_token,
            'oauth_nonce' => (string)mt_rand(),
            'oauth_timestamp' => time(),
            'oauth_signature_method' => 'HMAC-SHA1',
            'oauth_version' => '1.0',
        ];
    }

    /**
     * @param $params
     */
    private function calculateSignature($params)
    {
        $base_string = $this->buildBaseString($this->method, $params);

        $signing_key = $this->createSigningKey();

        $this->signature = base64_encode(hash_hmac('sha1', $base_string, $signing_key, true));
    }

    /**
     * @param string $method
     * @param array $params
     * @return string
     */
    private function buildBaseString(string $method, array $params): string
    {
        $options = $this->collectParameters($params);

        $query_string = http_build_query($options, '','&');

        return strtoupper($method) ."&" . rawurlencode($this->base_url) . '&' . rawurlencode($query_string);
    }

    private function createSigningKey()
    {
        return rawurlencode($this->api_secret_key) . "&" . rawurlencode($this->token_secret);
    }

    /**
     * https://developer.twitter.com/en/docs/basics/authentication/oauth-1-0a/authorizing-a-request
     * @param array $params
     * @return array
     */
    private function collectParameters(array $params = []): array
    {
        //URL-encode according to RFC 3986
        $oauth = array_map("rawurlencode", $this->oauth);
        $params = array_map("rawurlencode", $params);

        $combined_data = array_merge($oauth, $params);

        //Sort the list of parameters alphabetically and by encoded key
        asort($combined_data);
        ksort($combined_data);

        return $combined_data;
    }

    /**
     * @return bool|string
     * @throws \Exception
     */
    private function executeRequest()
    {
        $oauth = $this->collectParameters([
            'oauth_signature' => $this->signature,
        ]);

        $oauth = $this->buildAuthorizationLine($oauth);
        $base_url = $this->base_url . '?' . http_build_query($this->params, '', '&');

        $curl = new CurlService();
        $curl->init($base_url);

        $options = [
            CURLOPT_HTTPHEADER => ["Authorization: $oauth"],
            CURLOPT_HEADER => false,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_SSL_VERIFYPEER => false
        ];

        $curl->setOptionArray($options);
        $error = $curl->error();

        if ($error) {
            throw new \Exception($error);
        }

        return $curl->exec();
    }

    /**
     * @param array $oauth
     * @return string
     */
    private function buildAuthorizationLine(array $oauth): string
    {
        $oauth = array_map(function ($str) {
            return '"' . $str . '"';
        }, $oauth);

        return  "OAuth " . urldecode(http_build_query($oauth,  '',', '));
    }
}