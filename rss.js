const path = require('path')
const{dialog} = require('electron').remote
console.log(dialog)
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
dialog.showMessageBox({ message: "Your rss feed is: " this, buttons: ["OK"]});
	});
