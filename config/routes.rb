Rails.application.routes.draw do


	root 'main#index'

	resources :tweets

	get "/get_data" => "tweets#get_data"
end
