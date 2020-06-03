<?php

namespace App\Controller\Api;

use App\Service\TwitterService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use TwitterAPIExchange;

/**
 * Class TwitterController
 * @package App\Controller\Api
 * @Route("/api")
 */
class TwitterController extends AbstractController
{
    /**
     * @Route("/twitter-news", name="twitter_news")
     */
    public function index()
    {
        header("Access-Control-Allow-Origin: *");
        header("Content-Type: application/json; charset=UTF-8");
        header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
        header("Access-Control-Max-Age: 3600");
        header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

        $twitter_api = new TwitterAPIExchange([
            'oauth_access_token' => $_ENV['TW_ACCESS_TOKEN'],
            'oauth_access_token_secret' => $_ENV['TW_TOKEN_SECRET'],
            'consumer_key' => $_ENV['TW_API_KEY'],
            'consumer_secret' => $_ENV['TW_API_SECRET_KEY']
        ]);

        $twitter = new TwitterService($twitter_api);

        $home_timeline = $twitter->getHomeTimeline();

        return new JsonResponse(json_decode($home_timeline));
    }
}
