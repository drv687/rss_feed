const notifier = require('node-notifier');
const path = require('path');

$("#help").hide();
$("#showxml").click(function () {

                var feedurl = $("#inputRSS").val();
                var vTitle = "TITLE";
                var vDescription = "DESC";
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
                                                                vTitle = item.title;
                                                                vDescription = item.description;
                                                                vLink = item.link; //Adds a link to the notification
$('#results').append($('<div class="panel panel-default"/>').html('<div class="panel-body"><p><strong><a class="itemClick"><span class="title">' + item.title + '</span></a></strong></p>' + '<p>' + $('<div class ="panel panel-default" />').html('<div class="panel-body>"<a class="itemClick"><span class ="message">'+ item.description+'</p></div>'))

                                                );
                                                });
                                                //
                                                notifier.notify({
                                                  title: vTitle,
                                                  message: vDescription,
                                                  url: vLink,
                                                  sound: true, // Only Notification Center or Windows Toasters
                                                  wait: true // Wait with callback, until user action is taken against notification
                                                }, function (err, response) {
                                                  // Response is response from notification
                                                });

                                                notifier.on('click', function (notifierObject, options) {
                                                  // Triggers if `wait: true` and user clicks notification
                                                });

                                                notifier.on('timeout', function (notifierObject, options) {
                                                  // Triggers if `wait: true` and notification closes
                                                });
												
												window.open(vLink);
                                });

                }
});
