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
				$('#results').append($('<div class="panel panel-default"/>').html('<div class="panel-body"><p><strong><a class="itemClick"><span class="title">' + item.title + '</span></a></strong></p>' + '<p>' + $('<div class ="panel panel-default" />').html('<div class="panel-body>"<a class="itemClick"><span class ="message">'+ item.description +trimdata(item.description) + '</p></div>')));
			});
		});
	}
});
function trimdata(txt){
	var ttxt = txt.substring(0,140);
	return ttxt + "...";
}

	$("#results").on( "click",".itemClick", function(){
		var title = "RSS FEED!",
            message = $(this).find(".title").text();
						description = $(this).find(".description").text();
						link = $(this).find(".link").text();
        createNotification(title, message, description, link);
	});


//Attempt to add link to notification dialog
    var createNotification = function(title, message, description, link) {
        notifier.notify({
    var t = document.createElement('t');
var linkText = document.createTextNode("Link Text");
t.appendChild(linkText);
t.title = "RSS Feed";
t.href = "https://www.wired.com/feed/";
document.body.appendChild(t);
icon: path.join(__dirname, 'image/favicon.png'),
            sound: true,
            wait: false
		
						};
