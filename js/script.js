$(document).ready(function(){
    
    // ----- NAVIGATION --------------------------------------------------- //
    // ----- IMG BRAND / SCROLL ------------------------------------------- //
    $(document).on("scroll",function(){
        if($(document).scrollTop()>50){
            $(".navbar-brand img").removeClass("logo-lg").addClass("logo-sm");
        } else{
            $(".navbar-brand img").removeClass("logo-sm").addClass("logo-lg");
        }
    });

    // ----- NAVBAR SCROLL ------------------------------------------------ //
    const menuItems = document.querySelectorAll('.menu-scroll a[href^="#"]');
    menuItems.forEach(item => {
        item.addEventListener('click', scrollToIdOnClick);
    })
    function getScrollTopByHref(element) {
        const id = element.getAttribute('href');
        return document.querySelector(id).offsetTop;
    }
    function scrollToIdOnClick(event) {
        event.preventDefault();
        const to = getScrollTopByHref(event.target) - 63;
        scrollToPosition(to);
    }
    function scrollToPosition(to) {
        smoothScrollTo(0, to);
    }
    function smoothScrollTo(endX, endY, duration) {
        const startX = window.scrollX || window.pageXOffset;
        const startY = window.scrollY || window.pageYOffset;
        const distanceX = endX - startX;
        const distanceY = endY - startY;
        const startTime = new Date().getTime();
        duration = typeof duration !== 'undefined' ? duration : 1000;
        const easeInOutQuart = (time, from, distance, duration) => {
            if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
                return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
            };
            const timer = setInterval(() => {
            const time = new Date().getTime() - startTime;
            const newX = easeInOutQuart(time, startX, distanceX, duration);
            const newY = easeInOutQuart(time, startY, distanceY, duration);
            if (time >= duration) {
                clearInterval(timer);
            }
            window.scroll(newX, newY);
        }, 1000 / 60);
    };

    // ----- LINK NAVBAR ACTIVE ------------------------------------------- //
    $(window).scroll(function() {
		var scrollDistance = $(window).scrollTop();
    	$('.page-section').each(function(i) {
			if (($(this).position().top - 100) <= scrollDistance) {
				$('.navbar-nav a.active').removeClass('active');
				$('.navbar-nav a').eq(i).addClass('active');
			}
		});
    }).scroll();

    // ----- MENU MOBILE OPEN TOGGLER ------------------------------------- //
    $(".navbar-toggler, .overlayMenu").on("click", function(){
        $(".rightMenu, .overlayMenu").toggleClass("open");
        if ($(".rightMenu").hasClass("open")) {
            $(".navbar-toggler").addClass('active');
        } else {
            $(".navbar-toggler").removeClass('active');
        }
    });
    $(".rightMenu li a").on("click", function(){
        $(".rightMenu, .overlayMenu").removeClass("open");
        $(".navbar-toggler").removeClass('active');
    });

    // ----- BUTTON SCROLL TOP -------------------------------------------- //
    $("#toTop").hide();
    $('a#toTop').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });
    $(window).scroll(function () {
        if ($(this).scrollTop() > 500) {
            $('#toTop').fadeIn();
        } else {
            $('#toTop').fadeOut();
        }
    });

    //----- SCROLL ANIMATIONS --------------------------------------------- //
    var root = document.documentElement;
    root.className += ' js';
    function boxTop(idBox) {
        var boxOffset = $(idBox).offset().top;
        return boxOffset;
    }
    var $target = $('.anime'),
    animationClass = 'anime-init',
    windowHeight = $(window).height(),
    offset = windowHeight - (windowHeight / 100);
    function animeScroll() {
        var documentTop = $(document).scrollTop();
        $target.each(function() {
            if (documentTop > boxTop(this) - offset) {
                $(this).addClass(animationClass);
            } else {
                $(this).removeClass(animationClass);
            }
        });
    }
    animeScroll();
    $(document).scroll(function() {
        animeScroll();
    });
});