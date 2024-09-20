(function ($) {
  "use strict";

  // Preloader
  $(window).on("load", function () {
    if ($("#preloader").length) {
      $("#preloader")
        .delay(100)
        .fadeOut("slow", function () {
          $(this).remove();
        });
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  var nav = $("nav");
  var navHeight = nav.outerHeight();

  /*--/ ScrollReveal /Easy scroll animations for web and mobile browsers /--*/
  window.sr = ScrollReveal();
  sr.reveal(".foo", { duration: 1000, delay: 15 });

  /*--/ Carousel owl /--*/
  $("#carousel").owlCarousel({
    loop: true,
    margin: -1,
    items: 1,
    nav: true,
    navText: [
      '<i class="ion-ios-arrow-back" aria-hidden="true"></i>',
      '<i class="ion-ios-arrow-forward" aria-hidden="true"></i>',
    ],
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
  });

  /*--/ Animate Carousel /--*/
  $(".intro-carousel").on("translate.owl.carousel", function () {
    $(".intro-content .intro-title").removeClass("zoomIn animated").hide();
    $(".intro-content .intro-price").removeClass("fadeInUp animated").hide();
    $(".intro-content .intro-title-top, .intro-content .spacial")
      .removeClass("fadeIn animated")
      .hide();
  });

  $(".intro-carousel").on("translated.owl.carousel", function () {
    $(".intro-content .intro-title").addClass("zoomIn animated").show();
    $(".intro-content .intro-price").addClass("fadeInUp animated").show();
    $(".intro-content .intro-title-top, .intro-content .spacial")
      .addClass("fadeIn animated")
      .show();
  });

  /*--/ Navbar Collapse /--*/

  // Para el buscador y el login
$(".navbar-toggle-box-collapse").on("click", function () {
	// Verificar si el botón es el de búsqueda (basado en el ícono de lupa)
	if ($(this).find(".fa-search").length) {
	  $("#navbarTogglerDemo01").collapse("toggle"); // Abrir o cerrar el buscador
	  $("#navbarTogglerDemo02").collapse("hide");   // Asegurar que el login esté cerrado
	}
  
	// Verificar si el botón es el de login (basado en el ícono de usuario)
	if ($(this).find(".fa-user").length) {
	  $("#navbarTogglerDemo02").collapse("toggle"); // Abrir o cerrar el login
	  $("#navbarTogglerDemo01").collapse("hide");   // Asegurar que el buscador esté cerrado
	}
  });
  
  // Cerrar ambos contenedores al hacer clic fuera o en el botón de cerrar
  $(".close-box-collapse, .click-closed").on("click", function () {
	$("#navbarTogglerDemo01").collapse("hide"); // Cerrar el buscador
	$("#navbarTogglerDemo02").collapse("hide"); // Cerrar el login
	$("body").removeClass("box-collapse-open").addClass("box-collapse-closed");
  });
  
 // Función para verificar si hay un parámetro de búsqueda en la URL
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Al cargar la página, verifica si el parámetro login está en la URL
$(document).ready(function () {
    const loginParam = getUrlParameter('login');
    
    if (loginParam === 'true') {
        // Si el parámetro login=true está presente, abre el formulario de login
        $("#navbarTogglerDemo02").collapse("toggle");
        $('body').removeClass('box-collapse-closed').addClass('box-collapse-open');
    }
});
 
 
 
  // Cambiar la clase del body al abrir o cerrar los contenedores
  $('.navbar-toggle-box-collapse').on('click', function () {
	$('body').removeClass('box-collapse-closed').addClass('box-collapse-open');
  });
  $('.close-box-collapse, .click-closed').on('click', function () {
	$('body').removeClass('box-collapse-open').addClass('box-collapse-closed');
	$('.menu-list ul').slideUp(700);
  });
  
  /*--/ Navbar Menu Reduce /--*/
  $(window).trigger("scroll");
  $(window).bind("scroll", function () {
    var pixels = 50;
    var top = 1200;
    if ($(window).scrollTop() > pixels) {
      $(".navbar-default").addClass("navbar-reduce");
      $(".navbar-default").removeClass("navbar-trans");
    } else {
      $(".navbar-default").addClass("navbar-trans");
      $(".navbar-default").removeClass("navbar-reduce");
    }
    if ($(window).scrollTop() > top) {
      $(".scrolltop-mf").fadeIn(1000, "easeInOutExpo");
    } else {
      $(".scrolltop-mf").fadeOut(1000, "easeInOutExpo");
    }
  });

  /*--/ Property owl /--*/
  $("#property-carousel").owlCarousel({
    loop: true,
    margin: 30,
    responsive: {
      0: {
        items: 1,
      },
      769: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  });

  /*--/ Property owl owl /--*/
  $("#property-single-carousel").owlCarousel({
    loop: true,
    margin: 0,
    nav: true,
    navText: [
      '<i class="ion-ios-arrow-back" aria-hidden="true"></i>',
      '<i class="ion-ios-arrow-forward" aria-hidden="true"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
    },
  });

  /*--/ News owl /--*/
  $("#new-carousel").owlCarousel({
    loop: true,
    margin: 30,
    responsive: {
      0: {
        items: 1,
      },
      769: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  });

  /*--/ Testimonials owl /--*/
  $("#testimonial-carousel").owlCarousel({
    margin: 0,
    autoplay: true,
    nav: true,
    animateOut: "fadeOut",
    animateIn: "fadeInUp",
    navText: [
      '<i class="ion-ios-arrow-back" aria-hidden="true"></i>',
      '<i class="ion-ios-arrow-forward" aria-hidden="true"></i>',
    ],
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
    },
  });
})(jQuery);
