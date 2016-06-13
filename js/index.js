function getPosts() {
	 $.ajax({          
        url:   'https://medium.com/feed/@johngillick?format=json',
        crossOrigin: true,
        context: {},            
        dataType: "jsonp", 
        success: function(xml){
            console.log(xml);
        }
     });
}

getPosts();
