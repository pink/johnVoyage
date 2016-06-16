var tl;
var flag = false;

/*
* Checks to see if done loading posts, if so fade in, if not keep looping.
*/
function checkStatus() {
	if (flag) {
		$('#container')[0].setAttribute('style', 'visibility: hidden;');
		$('#main')[0].className += ' loaded';
	    $('#sidebar')[0].className += ' loaded';
	    $('body')[0].setAttribute('style', '');
	    tl.kill();
	} else {
		tl.restart();
	}
}

/*
* This function uses a loading animation SVG from codrops
*/
function loading() {
	var container = document.getElementById('container');
	var drop = document.getElementById('drop');
	var drop2 = document.getElementById('drop2');
	var outline = document.getElementById('outline');

	TweenMax.set(['svg'], {
		position: 'absolute',
		top: '50%',
		left: '50%',
		xPercent: -50,
		yPercent: -50
	})

	TweenMax.set([container], {
		position: 'absolute',
		top: '50%',
		left: '50%',
		xPercent: -50,
		yPercent: -50
	})

	TweenMax.set(drop, {
		transformOrigin: '50% 50%'
	})

	tl = new TimelineMax({
		repeat: 0,
		paused: false,
		repeatDelay: 0,
		immediateRender: false,
		onComplete: checkStatus
	});

	tl.timeScale(3);

	tl.to(drop, 4, {
		attr: {
			cx: 250,
			rx: '+=10',
			ry: '+=10'
		},
		ease: Back.easeInOut.config(3)
	})
	.to(drop2, 4, {
		attr: {
			cx: 250
		},
		ease: Power1.easeInOut
	}, '-=4')
	.to(drop, 4, {
		attr: {
			cx: 125,
			rx: '-=10',
			ry: '-=10'
		},
		ease: Back.easeInOut.config(3)
	})
	.to(drop2, 4, {
		attr: {
			cx: 125,
			rx: '-=10',
			ry: '-=10'
		},
		ease: Power1.easeInOut
	}, '-=4');
}

/*
* This function retrieves and populates the DOM with posts
*/
function initialize() {

  var template = '<header><div class="title"><h2><a href="#"></a></h2><p></p></div><div class="meta"><time class="published" datetime="2015-11-01"></time>' +
		'<a href="http://medium.com/@johngillick" class="author"><span class="name">John Gillick</span><img src="john_prof.jpg" alt="" /></a></div></header>' +
		'<a href="#" class="image featured"><img src="images/pic01.jpg" alt="" /></a><p></p><footer><ul class="actions">' +
		'<li><a href="#" class="button big">Continue Reading</a></li></ul></footer>';

  var feed = new google.feeds.Feed("http://medium.com/feed/@johngillick");
  feed.setNumEntries(11);

  feed.load(function(result) {
  	console.log(result);

  	var length = result.feed.entries.length;
    result.feed.entries.forEach(function(d) {

    	// create post
    	var post = document.createElement('article');
    	post.setAttribute('class', 'post');

    	// add template
    	post.innerHTML = template;
    	post.getElementsByClassName('title')[0].getElementsByTagName('a')[0].innerHTML = d.title;

    	// set date
    	var date = new Date(d.publishedDate);
    	var postDate = post.getElementsByTagName('time')[0];
    	postDate.setAttribute('datetime', date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate());
    	postDate.innerHTML = date.toDateString();

    	// set snippet, or leave blank if empty
    	post.getElementsByTagName('p')[1].innerHTML = (d.contentSnippet === 'Continue reading on Medium »') ? '' : d.contentSnippet;

    	// get content from feed to parse
    	var content = document.createElement('div');
    	var links = post.getElementsByTagName('a');
    	content.innerHTML = d.content;

    	// add image, otherwise remove image tag and set links
    	if (content.getElementsByTagName('img').length > 0) {
    		post.getElementsByTagName('img')[1].setAttribute('src', content.getElementsByTagName('img')[0].getAttribute('src'));
    		links[0].setAttribute('href', d.link);
	    	links[2].setAttribute('href', d.link);
	    	links[3].setAttribute('href', d.link);
    	} 
    	else {
    		post.removeChild(post.getElementsByClassName('featured')[0]);
    		links[1].setAttribute('href', d.link);
	    	links[2].setAttribute('href', d.link);
    	}

    	// add up to the last five posts as sidebar posts
    	if (length <= 5) {
    		var miniTemplate = '<header><h3></h3><time class="published" datetime="2015-10-20"></time>' +
						'<a href="http://medium.com/@johngillick" class="author"><img src="john_prof.jpg" alt="" /></a>' +
						'</header><a href="#" class="image"><img src="" alt="" /></a>';

			var miniPost = document.createElement('article');
			miniPost.setAttribute('class', 'mini-post');
			miniPost.innerHTML = miniTemplate;
			miniPost.getElementsByTagName('h3')[0].innerHTML = '<a href="' + d.link + '">' + d.title + '</a>';
			miniPost.getElementsByTagName('time')[0].setAttribute('datetime', date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate());
			miniPost.getElementsByTagName('time')[0].innerHTML = date.toDateString();

			links = miniPost.getElementsByTagName('a');
			
			if (content.getElementsByTagName('img').length > 0) {
				miniPost.getElementsByTagName('img')[1].setAttribute('src', content.getElementsByTagName('img')[0].getAttribute('src'));
	    		links[2].setAttribute('href', d.link);
	    	}
	    	else {
	    		miniPost.removeChild(miniPost.getElementsByTagName('a')[2]);
	    	}

	    	$('.mini-posts')[0].appendChild(miniPost);
    	}

    	length--;
    	
    	// add to main
    	$('#main')[0].appendChild(post);
    });

    // add footer to doc
    var footer = document.createElement('ul');
    footer.setAttribute('class', 'actions pagination');
    footer.innerHTML = '<li><a href="#" class="button big">See All</a></li>';
    $('#main')[0].appendChild(footer);
    flag = true;

  });
}


// start loading animation
loading();

google.load("feeds", "1", {callback : initialize});



