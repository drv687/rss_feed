const notifier = require('node-notifier');
const path = require('path');

$("#help").hide();
$("#showxml").click(function () {

	var feedurl = $("#inputRSS").val();

	if (feedurl == "") {
		$("#help").fadeIn();
		throw new Error("No RSS feed url");
	} else {
		$("#results").text("");
		$("#help").fadeOut();
		$("<li>"+feedurl+"</li>").appendTo("#favs");
		$.get(feedurl, function (data) {
			var $XML = $(data);
			//show all data in console
			console.log(data);
			$XML.find("item").each(function () {
				var $this = $(this),
					item = {
						title: $this.find("title").text(),
						link: $this.find("link").text(),
						description: $this.find("description").text(),
						pubDate: $this.find("pubDate").text(),
						author: $this.find("author").text()
					};
				$('#results').append($('<div class="panel panel-default"/>').html('<div class="panel-body"><p><strong><a class="itemClick"><span class="title">' + item.title + '</span></a></strong></p>' + '<p>' + trimdata(item.description) + '</p></div>'));

			});
		});
	}
});
function trimdata(txt){
	var ttxt = txt.substring(0,140);
	return ttxt + "...";
}

	$("#results").on( "click",".itemClick", function(){
		var title = "ALERT!",
            message = $(this).find(".title").text();
        createNotification(title, message);
	});
	
    var createNotification = function(title, message) {
        notifier.notify({
            title: title,
            message: message,
            icon: path.join(__dirname, 'image/favicon.png'),
            sound: true,
            wait: false
        });
    };
	
