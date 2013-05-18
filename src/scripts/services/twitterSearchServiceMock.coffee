angular.module('app').service 'twitterSearchServiceMock', ['$log', '$timeout', ($log, $timeout) ->
  self = @

  addNewTweetCallback = (callback) ->
    $timeout broadCastNewTweet = ->
      mockedTweets = [
        "text": "The favorite Reveal.js presentation framework is now available with interactive audience" + Date.now()
        "from_user": "Mr T."
        "profile_image_url": "http://t1.gstatic.com/images?q=tbn:ANd9GcT0ahy9QBse1F1EaZfxjKtiC_D8IsXJrodDvANM4aqWJ77sLIBB"
      ]
      callback(mockedTweets)
      $timeout(broadCastNewTweet, 5000)
    ,
    5000

  self.addNewTweetCallback = addNewTweetCallback

]