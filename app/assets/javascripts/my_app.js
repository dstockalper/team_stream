$(document).ready(function(){
		
		var request = $.ajax({
		  url: "/get_data",
		 	dataType: "json"
		});

		request.done(function(data){
			
			var latest_tweet = data[59].body

			$('#ajax_div').text(data[59].score)


		});
	})
