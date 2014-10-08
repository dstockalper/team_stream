class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception


Dotenv.load 

def get_tweets

	client = Twitter::Streaming::Client.new do |config|
	  config.consumer_key        = ENV["TWITTER_CONSUMER"] # where CONSUMER_KEY is defined in your .env file
	  config.consumer_secret     = ENV["TWITTER_CONSUMER_SECRET"] # from .env
	  config.access_token        = ENV["TWITTER_TOKEN"] # from .env
	  config.access_token_secret = ENV["TWITTER_TOKEN_SECRET"] # from .env
	end

	topics = "football"
	
	stored_tweets = []
	tweets_stored = 0

	client.filter(:track => topics) do |tweet|
		if tweet.lang == 'en'
		tweets_stored += 1
		stored_tweets << {
			username: tweet.attrs[:user][:name], 
			body: 	tweet.text,
			tweet_id: 	tweet.attrs[:id]
		}

		puts "#{tweets_stored} tweets gathered"

		end

		break if tweets_stored >= 3 # stops the stream after 100 tweets
	end

end




end
# 
