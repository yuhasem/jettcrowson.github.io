$(document).ready(function(){
	var URL = document.URL;
var authKey = URL.substr(URL.indexOf("=") + 1);
console.log("The auth key is " + authKey);

 $.ajax({
      type: "GET",
      dataType: "jsonp",
      cache: false,
      url: "https://api.instagram.com/v1/users/self/follows?access_token="+authKey,
      success: function(data) {
        // placing the images on the page
        }
      }
    });

});
