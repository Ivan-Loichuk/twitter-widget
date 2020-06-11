<?php
declare(strict_types=1);

namespace App\Controller\Api;

use App\Service\TwitterApiService;
use App\Service\TwitterService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class TwitterController
 * @package App\Controller\Api
 * @Route("/api/twitter")
 */
class TwitterController extends AbstractController
{
    private $twitter_api;

    function __construct(TwitterApiService $twitter_api)
    {
        $this->twitter_api = $twitter_api;
    }

    /**
     * @Route("/users/{q}", name="users")
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
     * @Route("/tweets/{search_query}", name="tweets")
     * @param $search_query
     * @param Request $request
     * @return JsonResponse
     * @throws \Exception
     */
    public function getTweets($search_query, Request $request)
    {
        $twitter = new TwitterService($this->twitter_api);
        $since_id = $request->get('since_id');
        $classic_mode = $request->get('classic_mode');
        $user_selected = $request->get('user_selected');

        $user_tweets = $twitter->searchTweets($search_query, [
            'since_id' => $since_id,
            'classic_mode' => $classic_mode,
            'user_selected' => $user_selected,
        ]);

        return new JsonResponse($user_tweets);
    }
}
