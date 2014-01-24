/*global $:true, console:true, Handlebars:true, JST:true*/
$(document).ready(function () {

  // element caching
  var homepageHead = $( '.homepage-head' ),
      navBtn = $(' .nav-btn'),
      siteHeader = $('.site-header'),
      people = $( '.people' ),
      blank = $( '.blank' ),
      person = $( '.person' ),
      smallSquare = $('.small-square'),
      largeSquare = $('.large-square'),
      vertical = $('.vertical'),
      horizontal = $('.horizontal'),
      contactPanel = $('.contact-panel'),
      helpPanel = $('.cta-help-btn, .cta-help');

  navBtn.click(function () {
    siteHeader.toggleClass('expanded');

  });

  $(window).scroll(function () {
    homepageHead.css('background-position', '0 ' + ($(window).scrollTop() - 60) + 'px');
  });

  helpPanel.click( function() {
    helpPanel.toggleClass( 'active' );
  });

  // large screen maps stuff.
  function initialize() {
    var mapOptions = {
      center: new google.maps.LatLng(51.485672, -0.118554),
      zoom: 15,
      scrollwheel: false,
      disableDefaultUI: true
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"),
      mapOptions);

    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(51.485672, -0.118554),
      map: map,
      title: "Hello World!"
    });
  }

  // sliding contacts
  $('.find-us-link').click(function () {
    if ($(window).width() <= 600) {
      window.location = 'https://maps.google.com/maps?q=pebble+%7Bcode%7D,+Durham+Street,+London,+United+Kingdom&hl=en-US&ll=51.485632,-0.118747&spn=0.011264,0.024312&sll=51.485672,-0.118554&sspn=0.022528,0.048623&oq=pebble+code&t=m&z=16&iwloc=A';
    }
    else {
      initialize();
      contactPanel.addClass( 'active' );
    }
  });

  $('#map-canvas, .site-header').click(function () {
    contactPanel.removeClass( 'active' );
  });

  // people page stuff
  var peopleColumns = 6;
  var colorClasses = ['color-1', 'color-2', 'color-3', 'color-4'];

  function respond() {
    var windowWidth = $(window).width();
    if (windowWidth < 1000 && windowWidth > 800) {
      peopleColumns = 5;
    } else if (windowWidth <= 800 && windowWidth > 600) {
      peopleColumns = 4;
    } else if (windowWidth <= 600 && windowWidth > 400) {
      peopleColumns = 3;
    } else if (windowWidth <= 400) {
      peopleColumns = 2;
      horizontal.add( vertical ).removeClass('horizontal vertical').addClass('small-square');
      horizontal = $( '.horizontal' );
      vertical = $( '.vertical' );
      smallSquare = $( '.small-square' );
    }
  }

  respond();

  peopleSize = function () {
    var unit = Math.floor($(window).innerWidth() / peopleColumns);
    smallSquare.height(unit).width(unit);
    blank.height(unit).width(unit);
    largeSquare.height(unit * 2).width(unit * 2);
    vertical.height(unit * 2).width(unit);
    horizontal.height(unit).width(unit * 2);
  };

  peopleSize();

  $(function () {
    var container = people;
    container.masonry({
      itemSelector: '.person',
      isResizeBound: false
    });

    $(window).resize(function ( event ) {
      people.addClass('hide');
      respond();
      peopleSize();
      container.masonry();
    });

    container.masonry('on', 'layoutComplete', function () {
      people.removeClass('hide');
    });
  });

  person.each(function () {
    $( this ).addClass(colorClasses[Math.floor(Math.random() * 4) + 0]);
  });

  // browser stuffs
  if ( !Modernizr.svg ) {
    $('img[src*="svg"]').attr('src', function() {
      return $(this).attr('src').replace('.svg', '.png');
    });
  }

  if( !Modernizr.mq( 'only all' ) ) {
    $( 'html' ).addClass( 'no-mq' );
  }

  $( '.people-cta' ).click( function() {
    window.open("http://pebblecode.mytribehr.com/careers", '_blank');
  });

});