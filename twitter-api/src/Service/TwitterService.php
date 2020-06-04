<?php
namespace App\Service;

use DateTime;

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
     * @param string $q
     * @return array
     */
    public function getUserData(string $q)
    {
        $url = 'https://api.twitter.com/1.1/users/search.json';
        $requestMethod = 'GET';
        $getField = '?count=100&q=' . $q;

        $users = $this->twitter->setGetfield($getField)
            ->buildOauth($url, $requestMethod)
            ->performRequest();

        return $this->transformUsersData($users);
    }

    /**
     * @param string $user_name
     * @return mixed
     */
    public function searchUserTweets($user_name = 'ILoichuk')
    {
        $url = 'https://api.twitter.com/1.1/search/tweets.json';
        $requestMethod = 'GET';
        $getField = '?count=100&tweet_mode=extended&result_type=mixed&q=from:' . $user_name;

        $user_tweets = $this->twitter->setGetfield($getField)
            ->buildOauth($url, $requestMethod)
            ->performRequest();

        return $this->transformUsersTweetsData($user_tweets);
    }

    /**
     * @param $users
     * @return array
     */
    private function transformUsersData($users): array
    {
        $users = json_decode($users);

        $users_data = [];
        if (count($users) > 0) {
            foreach ($users as $user) {
                $data = [];
                $data['screen_name'] = $user->screen_name;
                $data['name'] = $user->name;
                $data['location'] = $user->location;
                $data['profile_image_url'] = $user->profile_image_url_https ?? $user->profile_image_url;
                $users_data[] = $data;
            }
        }

        return $users_data;
    }

    /**
     * @param $user_tweets
     * @return array
     * @throws \Exception
     */
    private function transformUsersTweetsData($user_tweets): array
    {
        $user_tweets = json_decode($user_tweets);

        //dd($user_tweets->statuses);
        $user_tweets_data = [];
        if (isset($user_tweets->statuses)) {
            foreach ($user_tweets->statuses as $tweet) {
                $data = [];
                $date = new DateTime($tweet->created_at);
                $data['create_at'] = $date->format('Y-m-d H:i');

                $data['text'] = isset($tweet->full_text) ? $tweet->full_text : "";

                if (isset($tweet->user)) {
                    $data['user']['user_name'] = $tweet->user->name;
                    $data['user']['screen_name'] = $tweet->user->screen_name;
                    $data['user']['profile_image_url'] = $tweet->user->profile_image_url_https ?? $tweet->user->profile_image_url;
                }

                if (isset($tweet->retweeted_status)) {
                    $user = $tweet->retweeted_status->user;
                    $data['retweeted_profile']['user_name'] = $user->name;
                    $data['retweeted_profile']['screen_name'] = $user->screen_name;
                    $data['retweeted_profile']['profile_image_url'] = $user->profile_image_url_https ?? $user->profile_image_url;

                    $data['text'] = isset($tweet->retweeted_status->full_text) ? $tweet->retweeted_status->full_text : "";
                }

                if (isset($tweet->extended_entities) && isset($tweet->extended_entities->media)) {
                    $media = $tweet->extended_entities->media;
                    foreach ($media as $id => $m) {
                        $data['media'][$id]['type'] = $m->type;
                        $data['media'][$id]['media_url'] = $m->media_url_https ?? $m->media_url;
                        $data['media'][$id]['tweet_url'] = $m->url;

                        if (isset($m->video_info) && isset($m->video_info->variants)) {
                            $variant = reset($m->video_info->variants);
                            $data['media'][$id]['video_url'] = $variant->url;
                        }
                    }
                }

                $user_tweets_data[] = $data;
            }
        }

        return $user_tweets_data;
    }
}