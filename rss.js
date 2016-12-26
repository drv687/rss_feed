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
function NotificationFunction() {
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }
  else if (Notification.permission === "granted") {
        var options = {
              $XML
             };
          var notification = new Notification("Hi",options);
  }
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      if (!('permission' in Notification)) {
        Notification.permission = permission;
      }
    
      if (permission === "granted") {
        var options = {
              $XML
          };
        var notification = new Notification("Hi",options);
      }
    });
  }
}
