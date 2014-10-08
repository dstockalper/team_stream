class AddSentimentColumnToTweets < ActiveRecord::Migration
  def change
    add_column :tweets, :sentiment, :string
  end
end
