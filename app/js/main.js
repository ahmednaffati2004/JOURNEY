/**
  * Header Connect
  * retinaLogo
  * ajaxContactForm
  * headerFixed
  * select js
  * mobileNav
  * ajaxSubscribe
  * alertBox
  * loadmore
*/

; (function ($) {
    "use strict";

    var themesflatTheme = {

        // Main init function
        init: function () {
            this.config();
            this.events();
        },

        // Define vars for caching
        config: function () {
            this.config = {
                $window: $(window),
                $document: $(document),
            };
        },

        // Events
        events: function () {
            var self = this;

            // Run on document ready
            self.config.$document.on('ready', function () {


                // Retina Logos
                self.retinaLogo();


            });

            // Run on Window Load
            self.config.$window.on('load', function () {

            });
        },

    }; // end themesflatTheme

    // Start things up
    themesflatTheme.init();

    
    //  show logo home2 
    $('#showlogo').prepend('<a href="index.html"><img id="theImg" src="assets/images/logo/logo2.png" /></a>');

    $('.select_js').niceSelect();

    //Submenu Dropdown Toggle
    if ($('.main-header li.dropdown2 ul').length) {
        $('.main-header li.dropdown2').append('<div class="dropdown2-btn"></div>');

        //Dropdown Button
        $('.main-header li.dropdown2 .dropdown2-btn').on('click', function () {
            $(this).prev('ul').slideToggle(500);
        });

        //Disable dropdown parent link
        $('.navigation li.dropdown2 > a').on('click', function (e) {
            e.preventDefault();
        });

        //Disable dropdown parent link
        $('.main-header .navigation li.dropdown2 > a,.hidden-bar .side-menu li.dropdown2 > a').on('click', function (e) {
            e.preventDefault();
        });

        $('.price-block .features .arrow').on('click', function (e) {
            $(e.target.offsetParent.offsetParent.offsetParent).toggleClass('active-show-hidden')
        });

    }
    // Mobile Nav Hide Show
    if ($('.mobile-menu').length) {

        //$('.mobile-menu .menu-box').mCustomScrollbar();

        var mobileMenuContent = $('.main-header .nav-outer .main-menu').html();
        $('.mobile-menu .menu-box .menu-outer').append(mobileMenuContent);
        $('.sticky-header .main-menu').append(mobileMenuContent);

        //Hide / Show Submenu
        $('.mobile-menu .navigation > li.dropdown2 > .dropdown2-btn').on('click', function (e) {
            e.preventDefault();
            var target = $(this).parent('li').children('ul');

            if ($(target).is(':visible')) {
                $(this).parent('li').removeClass('open');
                $(target).slideUp(500);
                $(this).parents('.navigation').children('li.dropdown2').removeClass('open');
                $(this).parents('.navigation').children('li.dropdown2 > ul').slideUp(500);
                return false;
            } else {
                $(this).parents('.navigation').children('li.dropdown2').removeClass('open');
                $(this).parents('.navigation').children('li.dropdown2').children('ul').slideUp(500);
                $(this).parent('li').toggleClass('open');
                $(this).parent('li').children('ul').slideToggle(500);
            }
        });

        //3rd Level Nav
        $('.mobile-menu .navigation > li.dropdown2 > ul  > li.dropdown2 > .dropdown2-btn').on('click', function (e) {
            e.preventDefault();
            var targetInner = $(this).parent('li').children('ul');

            if ($(targetInner).is(':visible')) {
                $(this).parent('li').removeClass('open');
                $(targetInner).slideUp(500);
                $(this).parents('.navigation > ul').find('li.dropdown2').removeClass('open');
                $(this).parents('.navigation > ul').find('li.dropdown > ul').slideUp(500);
                return false;
            } else {
                $(this).parents('.navigation > ul').find('li.dropdown2').removeClass('open');
                $(this).parents('.navigation > ul').find('li.dropdown2 > ul').slideUp(500);
                $(this).parent('li').toggleClass('open');
                $(this).parent('li').children('ul').slideToggle(500);
            }
        });

        //Menu Toggle Btn
        $('.mobile-nav-toggler').on('click', function () {
            $('body').addClass('mobile-menu-visible');

        });

        //Menu Toggle Btn
        $('.mobile-menu .menu-backdrop, .close-btn').on('click', function () {
            $('body').removeClass('mobile-menu-visible');
            $('.mobile-menu .navigation > li').removeClass('open');
            $('.mobile-menu .navigation li ul').slideUp(0);
        });

        $(document).keydown(function (e) {
            if (e.keyCode === 27) {
                $('body').removeClass('mobile-menu-visible');
                $('.mobile-menu .navigation > li').removeClass('open');
                $('.mobile-menu .navigation li ul').slideUp(0);
            }
        });

    }

    var ajaxSubscribe = {
        obj: {
            subscribeEmail: $('#subscribe-email'),
            subscribeButton: $('#subscribe-button'),
            subscribeMsg: $('#subscribe-msg'),
            subscribeContent: $("#subscribe-content"),
            dataMailchimp: $('#subscribe-form').attr('data-mailchimp'),
            success_message: '<div class="notification_ok">Thank you for joining our mailing list! Please check your email for a confirmation link.</div>',
            failure_message: '<div class="notification_error">Error! <strong>There was a problem processing your submission.</strong></div>',
            noticeError: '<div class="notification_error">{msg}</div>',
            noticeInfo: '<div class="notification_error">{msg}</div>',
            basicAction: 'mail/subscribe.php',
            mailChimpAction: 'mail/subscribe-mailchimp.php'
        },

        eventLoad: function () {
            var objUse = ajaxSubscribe.obj;

            $(objUse.subscribeButton).on('click', function () {
                if (window.ajaxCalling) return;
                var isMailchimp = objUse.dataMailchimp === 'true';

                if (isMailchimp) {
                    ajaxSubscribe.ajaxCall(objUse.mailChimpAction);
                } else {
                    ajaxSubscribe.ajaxCall(objUse.basicAction);
                }
            });
        },

        ajaxCall: function (action) {
            window.ajaxCalling = true;
            var objUse = ajaxSubscribe.obj;
            var messageDiv = objUse.subscribeMsg.html('').hide();
            $.ajax({
                url: action,
                type: 'POST',
                dataType: 'json',
                data: {
                    subscribeEmail: objUse.subscribeEmail.val()
                },
                success: function (responseData, textStatus, jqXHR) {
                    if (responseData.status) {
                        objUse.subscribeContent.fadeOut(500, function () {
                            messageDiv.html(objUse.success_message).fadeIn(500);
                        });
                    } else {
                        switch (responseData.msg) {
                            case "email-required":
                                messageDiv.html(objUse.noticeError.replace('{msg}', 'Error! <strong>Email is required.</strong>'));
                                break;
                            case "email-err":
                                messageDiv.html(objUse.noticeError.replace('{msg}', 'Error! <strong>Email invalid.</strong>'));
                                break;
                            case "duplicate":
                                messageDiv.html(objUse.noticeError.replace('{msg}', 'Error! <strong>Email is duplicate.</strong>'));
                                break;
                            case "filewrite":
                                messageDiv.html(objUse.noticeInfo.replace('{msg}', 'Error! <strong>Mail list file is open.</strong>'));
                                break;
                            case "undefined":
                                messageDiv.html(objUse.noticeInfo.replace('{msg}', 'Error! <strong>undefined error.</strong>'));
                                break;
                            case "api-error":
                                objUse.subscribeContent.fadeOut(500, function () {
                                    messageDiv.html(objUse.failure_message);
                                });
                        }
                        messageDiv.fadeIn(500);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert('Connection error');
                },
                complete: function (data) {
                    window.ajaxCalling = false;
                }
            });
        }
    };

    var alertBox = function () {
        $(document).on('click', '.close', function (e) {
            $(this).closest('.flat-alert').remove();
            e.preventDefault();
        })
    };

    $("#newsearch").focus(function () {
        $(".search-content").slideDown(250).show();
    });

    $("#newsearch").on("change, blur", function () {
        $(".search-content").slideUp().hide(250);
    });

    $(".faq-question").on('click', function () {
        let box = $(this).closest(".faq");
        if (box.hasClass('faq-active')) {
            box.find('.faq-answer').slideUp(300);
            box.removeClass('faq-active');
        } else {
            box.find('.faq-answer').slideDown(300);
            box.addClass('faq-active');
        }
    });
  
    
    // Dom Ready
    $(function () {
        ajaxSubscribe.eventLoad();
        alertBox();
       
    });

})(jQuery);


document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.opacity = (i === index) ? '1' : '0';
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    showSlide(currentSlide);
    setInterval(nextSlide, 4000); // تغيير الصورة كل 4 ثواني
});


document.addEventListener("DOMContentLoaded", function() {
    // إنشاء المودال وإضافته إلى المستند
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `
      <div class="modal-content">
        <button class="close-btn">&times;</button>
        <img src="" alt="Enlarged Image">
      </div>
    `;
    document.body.appendChild(modal);
  
    const modalImg = modal.querySelector("img");
    const closeBtn = modal.querySelector(".close-btn");
  
    // البحث عن كل الصور داخل .cruise-images
    const images = document.querySelectorAll(".cruise-images img");
    images.forEach(img => {
      img.addEventListener("click", function() {
        modalImg.src = this.src;
        modal.classList.add("open");
      });
    });
  
    // إغلاق المودال عند النقر على زر الإغلاق أو خارج المحتوى
    closeBtn.addEventListener("click", function() {
      modal.classList.remove("open");
    });
    modal.addEventListener("click", function(e) {
      if (e.target === modal) {
        modal.classList.remove("open");
      }
    });
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    /* ========== إنشاء زر العودة إلى الأعلى ========== */
    const backToTop = document.createElement('button');
    backToTop.id = 'back-to-top';
    backToTop.textContent = '↑';
    document.body.appendChild(backToTop);
  
    // تنسيق الزر (يمكنك نقله إلى CSS لاحقًا إذا رغبت)
    backToTop.style.position = 'fixed';
    backToTop.style.bottom = '30px';
    backToTop.style.right = '30px';
    backToTop.style.padding = '10px 15px';
    backToTop.style.fontSize = '20px';
    backToTop.style.display = 'none';
    backToTop.style.border = 'none';
    backToTop.style.borderRadius = '5px';
    backToTop.style.backgroundColor = '#F9A826';
    backToTop.style.color = '#112D4E';
    backToTop.style.cursor = 'pointer';
    backToTop.style.zIndex = '1000';
  
    // إظهار الزر عند التمرير لأسفل الصفحة
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTop.style.display = 'block';
      } else {
        backToTop.style.display = 'none';
      }
    });
  
    // عند النقر على الزر يتم التمرير إلى الأعلى بسلاسة
    backToTop.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  
    /* ========== تفعيل تأثيرات الانزلاق عند التمرير (Scroll Animations) ========== */
    const observerOptions = {
      threshold: 0.1 // عندما تظهر 10% من العنصر في نافذة العرض
    };
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
  
    // استهدف كل العناصر التي تريد تطبيق التأثير عليها (يجب إضافة الفئة "animate-on-scroll" لها في HTML)
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => {
      observer.observe(el);
    });
  });