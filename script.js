$(document).ready(function(){
	var URL = document.URL;
var authKey = URL.substr(URL.indexOf("=") + 1);
console.log("The auth key is " + authKey);

var followers = $.get("https://api.instagram.com/v1/users/self/follows?access_token=ACCESS-TOKEN", function(data){

	console.log(followers);

});
});
