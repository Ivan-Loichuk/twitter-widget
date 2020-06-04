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
        $url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
        $requestMethod = 'GET';
        $getField = '?screen_name=ILoichuk&count=10';

        $twitts = $this->twitter->setGetfield($getField)
            ->buildOauth($url, $requestMethod)
            ->performRequest();

        return ($twitts);
    }

    /**
     * @param int $limit
     * @return mixed
     */
    public function getUserData($q = 'loichuk')
    {
        $url = 'https://api.twitter.com/1.1/users/search.json';
        $requestMethod = 'GET';
        $getField = '?q=' . $q;

        $users = $this->twitter->setGetfield($getField)
            ->buildOauth($url, $requestMethod)
            ->performRequest();

        $users_screen_name = $this->getUsersName($users);

        return ($users_screen_name);
    }

    /**
     * @param int $limit
     * @return mixed
     */
    public function searchTweets($user_name = 'ILoichuk')
    {
        $url = 'https://api.twitter.com/1.1/search/tweets.json';
        $requestMethod = 'GET';
        $getField = '?&result_type=recent&q=from:' . $user_name;

        $users = $this->twitter->setGetfield($getField)
            ->buildOauth($url, $requestMethod)
            ->performRequest();

        var_dump($users);exit;
        $users_screen_name = $this->getUsersName($users);

        return ($users_screen_name);
    }

    /**
     * @param $users
     * @return array
     */
    private function getUsersName($users): array
    {
        $users = json_decode($users);

        $users_name = [];
        if (count($users) > 0) {
            foreach ($users as $user) {
                $users_name[] = $user->screen_name;
            }
        }

        return $users_name;
    }
}