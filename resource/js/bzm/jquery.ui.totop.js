/*
|--------------------------------------------------------------------------
| UItoTop jQuery Plugin 1.2 by Matt Varone
| http://www.mattvarone.com/web-design/uitotop-jquery-plugin/
|--------------------------------------------------------------------------
*/
(function($){
	$.fn.UItoTop = function(options) {

		var defaults = {
				text: 'To Top',
				min: 200,
				inDelay:600,
				outDelay:400,
				containerID: 'toTop',
				containerHoverID: 'toTopHover',
				scrollSpeed: 500,
				easingType: 'swing'
			},
			settings = $.extend(defaults, options),
			containerIDhash = '#' + settings.containerID,
			containerHoverIDHash = '#'+settings.containerHoverID;

		$('#footer').append('<a href="#" id="' + settings.containerID + '">' + settings.text + '</a>');

		// 상품 소개 페이지의 구매하기 영역이 있을 시에 TOP 아이콘 위치 조정
		if ($("#useBuy").length) {
			$("#" + settings.containerID).css("bottom", "60px");
		}

		$(containerIDhash).hide().on('click.UItoTop',function(){
			$('html, body').animate({scrollTop:0}, settings.scrollSpeed, settings.easingType);
			$('#' + settings.containerHoverID, this).stop().animate({'opacity': 0 }, settings.inDelay, settings.easingType);
			return false;
		})
		.prepend('<span id="' + settings.containerHoverID + '"></span>')
		.hover(function() {
				$(containerHoverIDHash, this).stop().animate({
					'opacity': 1
				}, 600, 'linear');
			}, function() { 
				$(containerHoverIDHash, this).stop().animate({
					'opacity': 0
				}, 700, 'linear');
			});

		$(window).scroll(function() {
			var sd = $(window).scrollTop();
			if(typeof document.body.style.maxHeight === "undefined") {
				$(containerIDhash).css({
					'position': 'absolute',
					'top': sd + $(window).height() - 50
				});
			}

			if (sd > settings.min) 
				$(containerIDhash).fadeIn(settings.inDelay);
			else 
				$(containerIDhash).fadeOut(settings.Outdelay);
		});
	};
})(jQuery);