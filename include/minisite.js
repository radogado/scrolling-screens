/* URI parameters */

function GetURLParameter( name, source ) // if 'source' is missing, getting it from the URI
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( source ? source : window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}	

function SetURLParameter( name, value, source ) // if 'source' is missing, getting it from the URI.
{
    name = escape(name); value = escape(value);

    var s = source ? source : window.location.href;
    var kvp = name+"="+value;
    
    if ( !GetURLParameter(name, s) ) { // fix the source in case it doesn't have a parameter
    	s += ( ( ( s.indexOf('?') >= 0 ) ? '&' : '?' ) + name + '=0');
    }

    var r = new RegExp("(&|\\?)"+name+"=[^\&]*");

    s = s.replace(r,"$1"+kvp);

    if(!RegExp.$1) {s += (s.length>0 ? '&' : '?') + kvp;}

    return s;
}

/* Prizes slider: Bind control event handlers */

	var numberprizes = 0;
	var prizeswidth = 0;
	
	function picks(pick,tot) {
		var ary = new Array(tot);
		for (var i = 0; i < tot; i++) ary[i] = i+1;
		function randOrd(){return (Math.round(Math.random())-0.5); }
		ary.sort(randOrd);
		return ary.slice(0,pick);
	}

function leftclick (event) {
	
	$('a.prizesleft').unbind();
	$(this).stop();
	$('a.prizesleft, a.prizesright').css('opacity', '0.7');
	var l = parseInt ( $('#prizes div a').css('left') );
	if (l) { // slide right
		$('#prizes div a').animate ( { 'left': ( l + prizeswidth ) + 'px' }, 200, function () {
			$('a.prizesleft').click ( leftclick );
		});
	}
	else { // bounce in place
		$('a.prizesleft').css('opacity', '0.3');
		$('#prizes div a').animate ( { 'margin-left': '50px' }, 200, function () {
			$('#prizes div a').animate ( { 'margin-left': '0px' }, 100, function () {
				$('a.prizesleft').click ( leftclick );
			});
		});
	}
}

function rightclick (event) {
	$('a.prizesright').unbind();
	$(this).stop();
	$('a.prizesleft, a.prizesright').css('opacity', '0.7');
	var l = parseInt ( $('#prizes div a').css('left') );
	if ( (l + $('#prizes div a').width()) > (prizeswidth) ) { // slide left
		$('#prizes div a').animate ( { 'left': ( l - prizeswidth ) + 'px' }, 200, function () {
			$('a.prizesright').click ( rightclick );
		});
	}
	else { // bounce in place
		$('a.prizesright').css('opacity', '0.3');
		$('#prizes div a').animate ( { 'margin-left': '-50px' }, 200, function () {
			$('#prizes div a').animate ( { 'margin-left': '0' }, 100, function () {
				$('a.prizesright').click ( rightclick );
			});
		});
	}
}

/*! jQuery Retina Plugin - v1.0 - 3/25/2012
* https://github.com/tylercraft/jQuery-Retina
* Copyright (c) 2012 Tyler Craft; Licensed MIT, GPL */
(function(a){a.fn.retina=function(b){var c={dataRetina:!0,suffix:"",checkIfImageExists:!1,customFileNameCallback:"",overridePixelRation:!1};b&&jQuery.extend(c,b);var d=!1;if(c.overridePixelRation||window.devicePixelRatio>=2)d=!0;return this.each(function(){var b=a(this);b.addClass("retina-off");if(!d)return!1;var e="";c.dataRetina&&b.attr("data-retina")&&(e=b.attr("data-retina")),c.suffix&&(e||(e=b.attr("src")));if(c.suffix){var f=e.replace(/.[^.]+$/,""),g=e.replace(/^.*\./,"");e=f+c.suffix+"."+g}c.customFileNameCallback&&(e=c.customFileNameCallback(b)),c.checkIfImageExists&&e?a.ajax({url:e,type:"HEAD",success:function(){b.attr("src",e),b.removeClass("retina-off"),b.addClass("retina-on")}}):e&&(b.attr("src",e),b.removeClass("retina-off"),b.addClass("retina-on"))})}})(jQuery)

/* -- */
/* Go */
/* -- */

$(document).ready(function() {

/* Click events for Concertina/Accordion */

	$('.concertina h3').click ( function () { // Concertina rule: The element between two h3 is the content of the first h3
		if ( $(this).next().css('display') == 'none' ) 
			$(this).next().show('fast');
		else
			$(this).next().hide('fast');
	});
	
/* Slider */

	var i = 1;
	var j = 1;
	var timeout;
	var transitiontime = 600;

	function slide () {

		clearTimeout(timeout);

		$('.slider > :nth-child(' + i + '):not(".noslide")').animate( {'opacity': '0'}, transitiontime, function () { $(this).hide(); } ); // hiding the current slide

		if ( (++i) > ($('.slider > *:not(".noslide")').length) ) { // reaching the last slide?
			i = 1; 
		}
		$('.slider > :nth-child(' + i + '):not(".noslide")').show().animate( {'opacity': '1'}, transitiontime ); // showing the next slide

		$('.controls a.active').removeClass('active');
		$('.controls a:nth-child(' + i + ')').addClass('active');

		timeout = setTimeout(slide, 2000);
	}
	
	$('.slider > :nth-child(1):not(".noslide")').show().css('opacity', '1');
	
	timeout = setTimeout(slide, 2000);
	
	var controls = '';
	
	$('.slider > *:not(".noslide")').each( function (n) {
		controls += '<a>' + (n+1) + '</a>';
	});
	
	$('.slider').append ( '<div class="noslide controls">' + controls + '</div>' );

	$('.controls a:first-child').addClass('active');
	
	$('.controls a').click ( function () {

		clearTimeout(timeout);
		$('.slider > :nth-child(' + i + '):not(".noslide")').animate( {'opacity': '0'}, transitiontime, function () { $(this).hide(); } ); // hiding the current slide
		
		i = $(this).index() + 1;
		
		$('.slider > :nth-child(' + i + '):not(".noslide")').show().animate( {'opacity': '1'}, transitiontime); // showing the slide responding to current control item #

		$('.controls a.active').removeClass('active');
	
		$(this).addClass('active');

	}); 
	
/* Colorbox */

	$('a[rel="lightbox"]').colorbox({transition:'fade', speed: 200});

/* Prizes slider: Randomize prizes */

	$('body').append("<div id=\"dummy\"></div>");
	$('#dummy').hide();

	numberprizes = $('#prizes div a img').length;

	var positions = new Array( numberprizes );
	positions = picks(numberprizes,numberprizes);
	
	$('#prizes div a').children('img').each ( function (n) {
		$('#dummy').append( $(this).parent().children('img:nth-child(' + (positions[n]) + ')').clone() );
	});

	$('#prizes div a').html('');
	
	$('#dummy').children('img').each ( function (n) {
		$(this).appendTo('#prizes div a');
	});
	
	$('#dummy').html('');
	
	$('#prizes div a').css ( 'width', ((numberprizes+1) * 103) + 'px' )

	prizeswidth = $('#prizes div').width();

/* Prizes slider: Bind control event handlers */

	$('a.prizesleft').click ( leftclick );
	$('a.prizesright').click ( rightclick );

/* RID relay */

	if ( GetURLParameter('rid') ) {
		$('a[href]:not(a[href^="javascript"]):not(a[href^="mailto"])').each ( function () {
			$(this).attr( 'href', SetURLParameter('rid', GetURLParameter('rid'), $(this).attr('href') ) );
		}); 
	}
	
/* Modal window: open a link inside it */

	$('a.modal-link').click ( function () {
		
		$('body').prepend('<div id="blackbox"> <div class="modal-box"> <div> </div> </div> </div>');
		
		$('#blackbox').click( function () {
			$('#blackbox').remove();
		});
	
		$('#blackbox .modal-box').css('margin-top', $(window).scrollTop() + 16 + 'px').click( function (e) { // Show the box from browser's top
			e.stopPropagation();
		});
		
		$('#blackbox .modal-box').load ( 
			( ($(this).attr('href').split('#')[1] ) ? ($(this).attr('href').split('#')[0] + ' #' + $(this).attr('href').split('#')[1]) : ( $(this).attr('href') ) ), 
			
			function () {
				$('#blackbox').height( $(document).height() + 32 );
				$('#blackbox .modal-box > div:first-child').prepend('<div class="close"> × </div>');
				$('#blackbox .modal-box .close').click( function () {
					$('#blackbox').remove();
				});
			});
		
		return false;
	});

/* Tooltip */
		
	/* To do: position the tip properly, minding available space around the tool */	
	
	$('.tool').hover ( function (e) { // Show tip
			
			tip = $(this).find('.tip');

			$(tip).css({'top': $(this).height() + 'px', 'display': 'block'} );
			
			if ( ( $(tip).offset().left - $('#template').offset().left + $(tip).width() ) > $('#template').width() ) { // horizontal overflow?
				// to do: move left

				$(tip).css('left', 
					
					parseInt ( $(tip).css('left') ) + ( $('#template').width() - ( $(tip).offset().left - $('#template').offset().left + $(tip).width() ) ) - 16 + 'px' 
					
					);
				
			}
			
			if ( $(tip).width() > $('#template').width() ) {
				$(tip).css( 'left', parseInt($(tip).css('left')) + 16 +  ( $(tip).width() - $('#template').width() ) ).width( $('#template').width() - 16 );
			}

			if ( ( $(tip).offset().top + $(tip).height() ) > ( window.innerHeight + $('body').scrollTop() ) ) { // vertical overflow?
				$(tip).css('top', '-' + ($(tip).height() + $(tip).parent().height()) + 'px' );
			}
			
			if ( ! $(tip).find('a.close').length ) $(tip).prepend('<a class="close">✕</a>'); // Add the close button
			
			$(tip).find('a.close').click ( function () {
				$(this).parent().hide();
			});

		}, function (e) { // Hide tip
			$(this).find('.tip').hide();
		});
	
/* Retina images replacement */

	$('img.retina').retina({suffix: "@2x"});
	
/* Scrolling screens nav */

$('#nav a').click ( function () {
	$('#container').stop().animate( { scrollTop: ( $('#container').scrollTop() + $( $(this).attr('href') ).offset().top ) }, 400);
	$( $(this).attr('href') ).scrollTop(0);
	return false;
});

/* 	IE fixes. IE fix for Nested Ordered Lists, etc. */
    
    if ($.browser.msie) {

	    if ($('ol:first').css('list-style-type') != 'none') { // For IE6/7 only.
	        $('ol ol').each(function(i, ol) {
	            ol = $(ol);
	            var level1 = ol.closest('li').index() + 1;
	            ol.children('li').each(function(i, li) {
	                li = $(li);
	                var level2 = level1 + '.' + (li.index() + 1);
	                li.prepend('<span>' + level2 + '</span> ');
	            });
	        });
	    }
	    
	    $('.concertina > *:not(h3)').hide();
	    $('.concertina :nth-child(1), .concertina :nth-child(2)').show();
	    $('.titledbox h1, .titledbox h2, .titledbox h3, .titledbox h4').css('top','-1.7em');
	    $('#nav a, #nav a:link, #nav a:visited').css('background','url("images/skrill_nav_btn_bgr.png")');
		// buttons fix for IE9. Should work without fixes in IE10.
	    $('#nav a.active, #nav a.active:link, #nav a.active:visited').css('background','url("images/skrill_nav_btn_bgr.png") 0 29px');
	    $('a.button, a.button.active').css('background','url("images/bg-purple.png")');
	    $('a.button.yellow, a.button.yellow.active').css('background','url("images/bg-yellow.png")');
	    $('a.button.white, a.button.white.active').css('background','url("images/bg-white.png")');

   	}

});
