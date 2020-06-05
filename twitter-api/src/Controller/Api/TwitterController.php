<?php

namespace App\Controller\Api;

use App\Service\TwitterService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use TwitterAPIExchange;

/**
 * Class TwitterController
 * @package App\Controller\Api
 * @Route("/api")
 */
class TwitterController extends AbstractController
{
    private $twitter_api;

    function __construct()
    {
        $this->twitter_api = new TwitterAPIExchange([
            'oauth_access_token' => $_ENV['TW_ACCESS_TOKEN'],
            'oauth_access_token_secret' => $_ENV['TW_TOKEN_SECRET'],
            'consumer_key' => $_ENV['TW_API_KEY'],
            'consumer_secret' => $_ENV['TW_API_SECRET_KEY']
        ]);
    }

    /**
     * @Route("/twitter-users/{q}", name="twitter_users")
     * @param $q
     * @return JsonResponse
     */
    public function twitterUsers($q)
    {
        $twitter = new TwitterService($this->twitter_api);

        $users_list = $twitter->getUserData($q);

        return new JsonResponse($users_list);
    }

    /**
     * @Route("/get/user-tweets/{user}", name="get_user_tweets")
     * @param $user
     * @return JsonResponse
     * @throws \Exception
     */
    public function getUserTweets($user)
    {
        $twitter = new TwitterService($this->twitter_api);

        $users_list = $twitter->searchUserTweets($user);

        return new JsonResponse($users_list);
    }

    /**
     * @Route("/get/tweets/{search_query}", name="get_tweets")
     * @param $search_query
     * @return JsonResponse
     * @throws \Exception
     */
    public function getTweets($search_query)
    {
        $twitter = new TwitterService($this->twitter_api);

        $users_list = $twitter->searchTweets($search_query);

        return new JsonResponse($users_list);
    }
}
