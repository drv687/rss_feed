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
				$('#results').append($('<div class="panel panel-default"/>').html('<div class="panel-body"><p><strong><a href="' + item.link + '">' + item.title + '</a></strong></p>' + '<p>' + trimdata(item.description) + '</p></div>'));

			});
		});
	}
});
function trimdata(txt){
	var ttxt = txt.substring(0,140);
	return ttxt + "...";
}

//Add notification function
//Use node-notifier plugin to add notification function
var notification = new Notification('Title', {
  body: 'feedurl',
  title:"New RSS Feed",
  icon:'C:/images/icon.png',
});

notification.addEventListener("click",function(){
    alert("Notification checked.");
},false);

notification.addEventListener("show",function(){
    alert("Sample Notification Here");
},false);

notification.addEventListener("error",function(e){
    alert("Error! Something went wrong");
},false);

notification.addEventListener("close",function(){
    alert("Close");
},false);
