class AddScoreColumnToTweets < ActiveRecord::Migration
  def change
    add_column :tweets, :score, :real
  end
end
