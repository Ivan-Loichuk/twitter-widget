<?php
namespace App\Service;

class TwitterService
{
    private $twitter;

    function __construct($twitter)
    {
        $this->twitter = $twitter;
    }

    /**
     * @param int $limit
     * @return mixed
     */
    public function getHomeTimeline($limit = 10)
    {
        $url = 'https://api.twitter.com/1.1/statuses/home_timeline.json';
        $requestMethod = 'GET';
        $getField = '?count=' . $limit;

        $twitts = $this->twitter->setGetfield($getField)
            ->buildOauth($url, $requestMethod)
            ->performRequest();

        return ($twitts);
    }
}