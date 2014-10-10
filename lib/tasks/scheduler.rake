desc "This task is called by the Heroku scheduler add-on"

namespace :tester do 
task :gather_tweets => :environment do
 

client = Twitter::Streaming::Client.new do |config|
	  config.consumer_key        = ENV["TWITTER_CONSUMER"] # where CONSUMER_KEY is defined in your .env file
	  config.consumer_secret     = ENV["TWITTER_CONSUMER_SECRET"] # from .env
	  config.access_token        = ENV["TWITTER_TOKEN"] # from .env
	  config.access_token_secret = ENV["TWITTER_TOKEN_SECRET"] # from .env
	end


	topics = "49ers"
	
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


		break if tweets_stored >= 50 # stops the stream after 100 tweets

	end
end

end