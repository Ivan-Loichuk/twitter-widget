# twitter-widget

A small app to get tweets from Twitter:
  - find twitter profiles by user name and display user tweets (without retweets).
  - find tweets by specific word or phrase (without retweets).
  
##Requirements
- PHP 7.2.5 or higher;
- node.js v12.16.1 or higher
- usual [Symfony application requirements](https://symfony.com/doc/current/setup.html).
  
## Screenshots
  <p align="center">
    <img src="https://github.com/Ivan-Loichuk/twitter-widget/blob/master/image/search-tweets.PNG" width="400"> <img src="https://github.com/Ivan-Loichuk/twitter-widget/blob/master/image/search-users.PNG" width="400">
  </p>
  
## Libraries/tools

This project uses libraries and tools like:
- [vue.js](https://vuejs.org/) frontend JavaScript Framework,
- [babel](https://babeljs.io/) a JavaScript compiler
- [npm](https://www.npmjs.com/) Node package manager
- [symfony](https://symfony.com/) PHP framework for web projects
- [composer](https://getcomposer.org) A Dependency Manager for PHP
- [Twitter API](https://developer.twitter.com/en/docs/api-reference-index) Twitter’s developer platform
- [twitter-api-php](https://github.com/J7mbo/twitter-api-php) Official PHP Library for Twitter API 
- [bootstrap](https://getbootstrap.com/) front-end open source toolkit for styling

## How to build/run the projects via localhost

### Frontend
- download and install [node.js](https://nodejs.org/en/download/)
- go to `/twitter-view` folder
- run `npm install` command
- run `npm start`

### Backend
- install [composer](https://getcomposer.org/download/)
- install [PHP](https://www.php.net/manual/en/install.php) (^7.2.5)
- go to `/twitter-app` folder
- run `composer install`
- create new app on twitter developers [page](https://developer.twitter.com/en/apps)
- set required variables: `TW_API_KEY`, `TW_API_SECRET_KEY`, `TW_ACCESS_TOKEN`, `TW_TOKEN_SECRET`
- install [Symfony](https://symfony.com/download) binary and run command `symfony server:start`
