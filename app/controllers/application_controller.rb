class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception


Dotenv.load 



	client = Twitter::Streaming::Client.new do |config|
	  config.consumer_key        = ENV["TWITTER_CONSUMER"] # where CONSUMER_KEY is defined in your .env file
	  config.consumer_secret     = ENV["TWITTER_CONSUMER_SECRET"] # from .env
	  config.access_token        = ENV["TWITTER_TOKEN"] # from .env
	  config.access_token_secret = ENV["TWITTER_TOKEN_SECRET"] # from .env
	end


	topics = "ebola"
	
	tweets_stored = 0

	client.filter(:track => topics) do |msg|
		if msg.lang == 'en'
		tweets_stored += 1

		AlchemyAPI.key = ENV["ALCHEMY_API_KEY"]
		result = AlchemyAPI::SentimentAnalysis.new.search(text: msg.text)

		@tweet = Tweet.create(
				tweet_id: msg.attrs[:id], 
				username: msg.attrs[:user][:name], 
				body: msg.text,
				sentiment: result["type"],
				score: result["score"]
				)
		@tweet.save

		puts "#{tweets_stored} tweets gathered"

		end

		break if tweets_stored >= 3 # stops the stream after 100 tweets
	end

	

	

	





end
# 
