; (function ($) {
    "use strict";

    // Improved preloader handling
    $(window).on('load', function() {
        setTimeout(function() {
            $('.preload').fadeOut(500, function() {
                $('body').addClass('loaded');
                $(this).remove();
            });
        }, 500); // Add small delay for smoother transition
    });

    // Mobile Nav Hide Show with improved handling
    if ($('.mobile-menu').length) {
        var $body = $('body');
        var $mobileMenu = $('.mobile-menu');
        var $menuBackdrop = $('.menu-backdrop');
        var $mobileNavToggler = $('.mobile-nav-toggler');
        
        // Append menu content only once
        var mobileMenuContent = $('.main-header .nav-outer .main-menu').html();
        $('.mobile-menu .menu-box .menu-outer').append(mobileMenuContent);

        // Menu Toggle Button
        $mobileNavToggler.on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            $body.toggleClass('mobile-menu-visible');
            
            // Add animation class
            $(this).toggleClass('active');
            
            return false;
        });

        // Close Menu
        $('.mobile-menu .menu-backdrop, .mobile-menu .close-btn').on('click', function (e) {
            e.preventDefault();
            $body.removeClass('mobile-menu-visible');
            $mobileNavToggler.removeClass('active');
            return false;
        });

        // Close menu on ESC key
        $(document).keydown(function(e) {
            if (e.keyCode === 27) {
                $body.removeClass('mobile-menu-visible');
                $mobileNavToggler.removeClass('active');
            }
        });

        // Prevent menu from closing when clicking inside
        $mobileMenu.on('click', function(e) {
            e.stopPropagation();
        });

        // Close menu when clicking outside
        $(document).on('click', function(e) {
            if (!$(e.target).closest('.mobile-menu, .mobile-nav-toggler').length) {
                $body.removeClass('mobile-menu-visible');
                $mobileNavToggler.removeClass('active');
            }
        });

        // Dropdown Button
        $('.mobile-menu li.dropdown2 .dropdown2-btn').on('click', function () {
            $(this).prev('ul').slideToggle(500);
            return false;
        });

        // Disable dropdown parent link
        $('.main-header .navigation li.dropdown2 > a').on('click', function (e) {
            e.preventDefault();
        });
    }

    // Initialize select
    $('.select_js').niceSelect();

    // Handle scroll events
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 100) {
            $('.header').addClass('is-fixed');
        } else {
            $('.header').removeClass('is-fixed');
        }
    });

    // Back to top click handler
    $('#back-to-top').on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });

    $(document).ready(function() {
        // Animate designer card on scroll
        $(window).scroll(function() {
            var designerCard = $('.designer-card');
            var cardPosition = designerCard.offset().top;
            var scrollPosition = $(window).scrollTop() + $(window).height();
            
            if (scrollPosition > cardPosition) {
                designerCard.addClass('animate');
            }
        });

        // Add hover effect for designer name
        $('.designer-name').hover(
            function() {
                $(this).css('background-size', '100% 2px');
            },
            function() {
                $(this).css('background-size', '0% 2px');
            }
        );
    });

})(jQuery);







  
