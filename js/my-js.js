jQuery(document).ready(function($){
	
	

			var isMobile = false;
	
			if( navigator.userAgent.match(/Android/i) || 
				navigator.userAgent.match(/webOS/i) ||
				navigator.userAgent.match(/iPhone/i) || 
				navigator.userAgent.match(/iPad/i)|| 
				navigator.userAgent.match(/iPod/i) || 
				navigator.userAgent.match(/BlackBerry/i)){
				
				isMobile = true;
				
			}
			
			/*iOS5 fixed-menu fix*/
			var iOS5 = false;
			
			if (navigator.userAgent.match(/OS 5(_\d)+ like Mac OS X/i)){
			
				iOS5 = true;
			
			}
		
		
	
	
	
	//PARALLAX ----------------------------------------------------------------------------/
	
	
	//var parallaxSpeedFactor = 5.6;
	
	
	$(window).bind('load', function() {
		parallaxInit();
	});
	
	function parallaxInit(){
		
		if(isMobile === true) {
			// Version mobile
			$('.teaser').each(function() {
				$(this).css("background-attachment","scroll");
			});
		}
		else {
			$('.teaser').each(function() {
				$(this).parallax();
			});
		}
	}
	
	
	
//HOMEPAGE SPECIFIC -----------------------------------------------------------------/
	
	
	function sliderHeight(){
		
		//wh = $(window).height()/2;
		wh = Math.round(Math.min( /*160, $(window).width()/2.25,*/ $(window).height()/2));
		/*$('#homepage').css({height:wh});*/
		$('#homepage').animate({height:wh},1000);
		
		/*$('.teaser').css({height:wh});*/
		$('.teaser').animate({height:wh},1000);
		
		
		//$('.navbar').append("<font color='#FFFFFF' >$(window).height()="+$(window).height()+"<br/>screen.height="+screen.height+"</font>");
	}
	
	
	sliderHeight();

	
	
	var lH = $('.logo-homepage').height();
	var	lW = $('.logo-homepage').width();
	
	$('.logo-homepage').hover(function() {
		if(isMobile == true) return false;
		$(this).animate({width:lH+50,height:lW+50,marginLeft:-((lH+50)/2),marginTop:-((lW+50)/2)},{queue:false});
	},
	function() {
		if(isMobile == true) return false;
		$(this).animate({width:lH,height:lW,marginLeft:-lH/2,marginTop:-lW/2},{queue:false});
	});
	
	if(isMobile == false) {
		$('.logo-homepage').css({width:lH-150,height:lW-150,marginLeft:-((lH-150)/2),marginTop:-((lW-150)/2)});
		$('.logo-homepage').animate({width:lH,height:lW,marginLeft:-lH/2,marginTop:-lW/2},1000);
	}
	
	
	
	//WINDOW EVENTS ---------------------------------------------------------------------/	
	
	$(window).bind('resize',function() {
		
		//Update slider height
	 	sliderHeight();
		
	});	
	

	
	//PAGE SPECIFIC ---------------------------------------------------------------------/
	
	/*page scrolling
	-------------------*/
	
	var scrollSpeed = 2000;	
	var	scrollEase = 'easeOutExpo'; // J'ai enlevé ce paramètre dans le animate car il faut probablement rajouter la bibliothèque jquery de Easing...
	//var documentBody = (($.browser.chrome)||($.browser.safari)) ? document.body : document.documentElement;
	
	$(document).on('click', '.navbar-nav a, #link-logo-homepage, .navbar-header a', function(event) {
		//kill slider timer
		//$.fn.epicSlider.killTimer();
		
		//get current
		targetSection = $(this).attr('href').split("#")[1];
		if(!targetSection || targetSection=='') {
			return;
		}
		targetSection = '#'+targetSection;
		
		//get pos of target section
		var targetOffset = Math.floor($(targetSection).offset().top-40);
		
		
		
		$('html,body').animate({scrollTop: targetOffset}, scrollSpeed, function() {
			/*
			console.log("end easing");
			*/
		});
		
		/*
		$('.navbar-nav li').removeClass("active");
		$(".navbar-nav a[href$='"+targetSection+"']").parent().addClass("active");
		*/
		
		
		/*
		//scroll
		$('html,body').animate({scrollTop: targetOffset}, scrollSpeed, scrollEase, function() {
			//ios5 menu fix
			
			//if(iOS5===true) {
			//	$('.header.mobileHeader').animate({position:'absolute',top:$(window).scrollTop()},1);
			//}
		});
		*/
		
		return false;
		//event.preventDefault();
		
	});
	
	
	
	
	
	
	
	//ROLLOVER SPECIFIC ---------------------------------------------------------------------/
	
	/*general
	-------------------*/
	
	var hoverSpeed=500;
	var hoverEase='easeOutExpo';
	
	
	//ROLLOVER SPECIFIC ---------------------------------------------------------------------/
	/*folio
	-------------------*/
	$('.folio-thumb').on({
		mouseenter: function () {
			//check if device is mobile 
			//or within an inactive filter category
			//or if its video content in which case do nothing
			if(isMobile === true) {
				return false;
			}
			
			thumbW = $('.folio-thumb').find('a').find('img').width();
			thumbH = $('.folio-thumb').find('a').find('img').height();
			
			//get refrences needed
			thumbCaption = $(this).find('a').attr('title');
			
			//add rolloverscreen
			if(!$(this).find('a').find('div').hasClass('folio-thumb-rollover')) {
				$(this).find('a').append('<div class="folio-thumb-rollover"></div>');
			}
			
			//set it to the image size and fade in
			var hoverScreen = $('.folio-thumb-rollover');
			hoverScreen.css({width:thumbW,height:thumbH});
			
			//make sure caption is filled out
			if (typeof thumbCaption !== 'undefined' && thumbCaption !== false && $(this).find(hoverScreen).is(':empty')) {	
				//construct rollover & animate
				$(this).find(hoverScreen).append('<div class="thumbInfo">'+thumbCaption+'</div>');
				target = $(this).find(hoverScreen);
				target.stop().animate({opacity:1},hoverSpeed);
			}
		},
		mouseleave: function () {
			if(isMobile === true) {
				return false;
			}
			//animate out
			$(this).find('.folio-thumb-rollover').animate({opacity:0},hoverSpeed,'linear',function(){
				//delete rollover
				$(this).remove();
			});
		}
		/*
		,
		mousedown: function () {
			if(isMobile === true) {
				return false;
			}
			alert("mousedown");
		}
		*/
	});
	
	/*
	$('.folio-thumb-container').on('mousedown', function (e) {
		alert("mousedown");
		console.log($(this));
	});
	*/
});