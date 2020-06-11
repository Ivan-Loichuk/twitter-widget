<?php
declare(strict_types=1);
namespace App\Service;

use DateTime;

class TwitterService
{
    private $twitter;

    function __construct(TwitterApiInterface $twitter)
    {
        $this->twitter = $twitter;
    }

    /**
     * @param string $q
     * @return array
     */
    public function getUserData(string $q)
    {
        $users_list = $this->twitter->getRequestData(
            '/1.1/users/search.json',
            [
                'q' => $q,
                'count' => '2'
            ]
        );

        $users_list = $users_list ? $this->transformUsersData($users_list) : [];

        return $users_list;
    }

    /**
     * @param string $q
     * @param array $params
     * @return array
     * @throws \Exception
     */
    public function searchTweets(string $q, array $params = [])
    {
        $options = [
            'exclude' => 'retweets',
            'exclude_replies' => '1',
            'count' => '50',
            'tweet_mode' => 'extended',
            'include_entities' => 1,
            'result_type' => 'recent',
            'q' => addslashes($q)
        ];

        if (!empty($params['classic_mode'])) {
            $options['tweet_mode'] = 'classic';
            $options['include_entities'] = 0;
        }

        if (!empty($params['since_id'])) {
            $options['since_id'] = (int) $params['since_id'];
        }

        $user_tweets = $this->twitter->getRequestData(
            '/1.1/search/tweets.json',
            $options
        );

        $user_tweets = $user_tweets ? $this->transformUsersTweetsData($user_tweets) : [];

        return $user_tweets;
    }

    /**
     * @param $users
     * @return array
     */
    public function transformUsersData($users): array
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
    public function transformUsersTweetsData($user_tweets): array
    {
        $user_tweets = json_decode($user_tweets);

        $user_tweets_data = [];
        if (isset($user_tweets->statuses)) {
            foreach ($user_tweets->statuses as $tweet) {
                $data = [];
                $date = new DateTime($tweet->created_at);
                $data['create_at'] = $date->format('Y-m-d H:i');

                $data['text'] = isset($tweet->full_text) ? $tweet->full_text : "";

                if (isset($tweet->user)) {
                    $data['user'] = $this->transformUserData($tweet->user);
                }

                if (isset($tweet->extended_entities) && isset($tweet->extended_entities->media)) {
                    $data['media'] = $this->transformMediaData($tweet->extended_entities->media);
                }

                $user_tweets_data['tweets'][] = $data;
            }
        }

        if (isset($user_tweets->search_metadata)) {
            $user_tweets_data['max_id'] = isset($user_tweets->search_metadata->max_id) ?  strval($user_tweets->search_metadata->max_id)  : null;
        }

        return $user_tweets_data;
    }

    /**
     * @param $user
     * @return array
     */
    private function transformUserData($user): array
    {
        $data['user_name'] = $user->name;
        $data['screen_name'] = $user->screen_name;
        $data['profile_image_url'] = $user->profile_image_url_https ?? $user->profile_image_url;

        return $data;
    }

    /**
     * @param $media
     * @return array
     */
    private function transformMediaData($media): array
    {
        $data = [];
        foreach ($media as $id => $m) {
            $data[$id]['type'] = $m->type;
            $data[$id]['media_url'] = $m->media_url_https ?? $m->media_url;
            $data[$id]['tweet_url'] = $m->url;

            if (isset($m->video_info) && isset($m->video_info->variants)) {
                $variant = reset($m->video_info->variants);
                $data[$id]['video_url'] = $variant->url;
            }
        }

        return $data;
    }
}