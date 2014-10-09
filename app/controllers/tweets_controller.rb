class TweetsController < ApplicationController
  respond_to :json, :html

	def get_data 
		respond_with Tweet.all
	end

	# def get_data
	# 	data = Typhoeus.get("http://localhost:3000/tweets.json")
	# 	binding.pry
	# 	data = JSON.parse(data.body)
	# 	render json:  data
	# end

end
