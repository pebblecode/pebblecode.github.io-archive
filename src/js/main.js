/*global $:true, console:true, Handlebars:true, JST:true*/
$(document).ready(function () {

  // element caching
  var homepageHead = $( '.homepage-head' ),
      navBtn = $(' .nav-btn'),
      siteHeader = $('.site-header'),
      contactPanel = $('.contact-panel'),
      colorMe = $('.person, .ppl-text'),
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

  // people page
  // var colorClasses = ['ppl-c-1', 'ppl-c-2', 'ppl-c-3', 'ppl-c-4'];

  colorMe.each( function () {
    $( this ).addClass( 'ppl-c-' + [ Math.floor( Math.random() * 6 ) + 1 ] );
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

});