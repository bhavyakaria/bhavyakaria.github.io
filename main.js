function rotate(){
	TweenMax.to(".fb", 2, {
			rotation: 360,
			transformOrigin: '50% 50%'
	});
}

function rotateb(){
	TweenMax.to(".fb", 2, {
			rotation: -360,
			transformOrigin: '50% 50%'
	});
}

function trotate(){
	TweenMax.to(".twitter", 2, {
			rotation: 360,
			transformOrigin: '50% 50%'
	});
}

function trotateb(){
	TweenMax.to(".twitter", 2, {
			rotation: -360,
			transformOrigin: '50% 50%'
	});
}

function irotate(){
	TweenMax.to(".insta", 2, {
			rotation: 360,
			transformOrigin: '50% 50%'
	});
}

function irotateb(){
	TweenMax.to(".insta", 2, {
			rotation: -360,
			transformOrigin: '50% 50%'
	});
}

function lrotate(){
	TweenMax.to(".link", 2, {
			rotation: 360,
			transformOrigin: '50% 50%'
	});
}

function lrotateb(){
	TweenMax.to(".link", 2, {
			rotation: -360,
			transformOrigin: '50% 50%'
	});
}

$(window).bind("load", function() {
    var aboutEl = $('div.about'),
        aboutElOffset = aboutEl.offset().top/2,
        adocumentEl = $(document);

    adocumentEl.on('scroll', function() {
        if ( adocumentEl.scrollTop() > aboutElOffset && aboutEl.hasClass('hidden') )
			aboutEl.removeClass('hidden');
    });

    $('div.title').fadeIn(1000).removeClass('hidden');

});
