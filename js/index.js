function initialize() {

  var template = '<header><div class="title"><h2><a href="#"></a></h2><p></p></div><div class="meta"><time class="published" datetime="2015-11-01"></time>' +
		'<a href="http://medium.com/feed/@johngillick" class="author"><span class="name">John Gillick</span><img src="john_prof.jpg" alt="" /></a></div></header>' +
		'<a href="#" class="image featured"><img src="images/pic01.jpg" alt="" /></a><p></p><footer><ul class="actions">' +
		'<li><a href="#" class="button big">Continue Reading</a></li></ul><ul class="stats"><li><a href="#">General</a></li>' +
		'<li><a href="#" class="icon fa-heart">28</a></li><li><a href="#" class="icon fa-comment">128</a></li></ul></footer>';

  var feed = new google.feeds.Feed("http://medium.com/feed/@johngillick");
  feed.setNumEntries(11);

  feed.load(function(result) {
  	console.log(result);
    result.feed.entries.forEach(function(d) {

    	var post = document.createElement('article');
    	post.setAttribute('class', 'post');

    	post.innerHTML = template;
    	post.getElementsByClassName('title')[0].getElementsByTagName('a')[0].innerHTML = d.title;

    	var date = new Date(d.publishedDate);
    	var postDate = post.getElementsByTagName('time')[0];
    	postDate.setAttribute('datetime', date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate());
    	postDate.innerHTML = date.toDateString();

    	post.getElementsByTagName('p')[1].innerHTML = d.contentSnippet;

    	var content = document.createElement('div');
    	content.innerHTML = d.content;
    	if (content.getElementsByTagName('img').length > 0) {
    		post.getElementsByTagName('img')[1].setAttribute('src', content.getElementsByTagName('img')[0].getAttribute('src'));
    	} 
    	else {
    		post.removeChild(post.getElementsByClassName('featured')[0]);
    	}

    	var links = post.getElementsByTagName('a');
    	links[0].setAttribute('href', d.link);
    	links[2].setAttribute('href', d.link);
    	links[3].setAttribute('href', d.link);
    	$('#main')[0].appendChild(post);
    });

    var footer = document.createElement('ul');
    footer.setAttribute('class', 'actions pagination');
    footer.innerHTML = '<li><a href="#" class="button big">See All</a></li>';
    $('#main')[0].appendChild(footer);
  });
}

google.load("feeds", "1", {callback : initialize});



