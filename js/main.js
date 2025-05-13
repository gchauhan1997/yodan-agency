(function ($) {
    "use strict";


    // Spinner
    var spinner = function () {
        var spinnerElement = $('#spinner');
        var startTime = new Date().getTime();

        function hideSpinner() {
            var currentTime = new Date().getTime();
            var elapsedTime = currentTime - startTime;

            if (spinnerElement.length > 0 && elapsedTime >= 1000) {
                spinnerElement.removeClass('show');
            } else if (spinnerElement.length > 0) {
                setTimeout(hideSpinner, 1); // Check again if 1 seconds haven't passed
            }
        }

        $(window).on('load', function () {
            if (spinnerElement.length > 0) {
                // The 'show' class is already present in your HTML,
                // so we don't need to add it here again.
                setTimeout(hideSpinner, 1); // Start the timer to potentially hide it
            }
        });
    };
    spinner();

    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Skills
    $('.skill').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, { offset: '80%' });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="fas fa-chevron-left"></i>',
            '<i class="fas fa-chevron-right"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            992: {
                items: 2
            }
        }
    });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({ filter: $(this).data('filter') });
    });

})(jQuery);



function setLanguage(lang) {
    // Update all elements with language data attributes
    document.querySelectorAll('[data-lang-en]').forEach(el => {
        el.textContent = el.getAttribute(`data-lang-${lang}`);
    });

    // Update all language dropdown displays
    const langName = {
        en: 'EN',
        ko: 'KR'
    };
    document.querySelectorAll('.selectedLanguage').forEach(el => {
        el.textContent = langName[lang] || 'Language';
    });

    // Save the preference
    localStorage.setItem('preferredLanguage', lang);
}

// Load saved language on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLanguage') || 'ko';
    setLanguage(savedLang);
});

// term and cond

document.addEventListener('DOMContentLoaded', function () {
    const policyToggle = document.querySelector('.privacy-policy-toggle');
    const policyContent = document.querySelector('.privacy-policy-content');
    const policyCloseButton = document.querySelector('.privacy-policy-close');

    policyToggle.addEventListener('click', function () {
        policyContent.classList.toggle('expanded');
    });

    if (policyCloseButton) {
        policyCloseButton.addEventListener('click', function () {
            policyContent.classList.remove('expanded');
        });
    }
});
