/*global $*/
/*global APIKEY $*/
$(document).ready(function() {
	$.ajax({
		method: "GET",
		url: "https://newsapi.org/v2/sources",
		data: {
			category: "business",
			country: "us",
			language: "en",
			apiKey: APIKEY
		},
		success: function(data) {
			if (data.status === "ok") {
				console.log(data)
				for (var i = 0; i < data.sources.length; i++) {
					var source = document.createElement("OPTION");
					source.setAttribute("value", data.sources[i].id);
					source.innerHTML = data.sources[i].name;
					document.getElementById("selection").appendChild(source);
				}
			}
		}
	});
	
	
	$("#source").submit(function(event) {
		event.preventDefault();
		document.getElementById("heading").innerHTML = "";
		document.getElementById("heading").innerHTML+=("Top Business Headlines");
		document.getElementById("headlines").innerHTML = "";
		$.ajax({
			method: "GET",
			url: "https://newsapi.org/v2/top-headlines",
			data: {
				sources: document.getElementById("selection").value, apiKey: APIKEY
			},
			success: function(data) {
				console.log(data);
				if (data.status === "ok") {
					for (var i = 0; i < data.articles.length; i++) {
						console.log(data.articles[i].title);
						var headline = document.createElement("li");
						headline.innerHTML = data.articles[i].title;
						var description = document.createElement("p");
						description.innerHTML = data.articles[i].description;
						var url = document.createElement('a');
						url.setAttribute('href', data.articles[i].url);
						url.innerHTML = data.articles[i].url;
						// var urlToImage = document.createElement('IMG');					
						// urlToImage.setAttribute('src', data.articles[i].urlToImage);
						// urlToImage.innerHTML = data.articles[i].urlToImage;
						// document.getElementById("headlines").appendChild(urlToImage);
						document.getElementById("headlines").appendChild(headline);
						document.getElementById("headlines").appendChild(description);
				        document.getElementById("headlines").appendChild(url);
					}
				}
			}
		});
	});
});	
// var a = document.createElement("a"); a.setAttribute("anything-you-want", "attr value")
