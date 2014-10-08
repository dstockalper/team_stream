class TweetsController < ApplicationController
  respond_to :json, :html

	def index 
		respond_with Tweet.all
	end

end
