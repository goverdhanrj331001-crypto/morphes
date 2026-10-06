(function (window, document, $, undefined) {
    'use strict';

    var rbtJs = {
        i: function () {
            rbtJs.d();
            rbtJs.methods();
        },

        d: function () {
            this._window = $(window);
            this._document = $(document);
            this._body = $('body');
            this._html = $('html');
        },

        methods: function () {
            rbtJs.preloaderInit();
            rbtJs.menuCurrentLink();
            rbtJs.rbtSwiperActive();
            rbtJs.counterUp();
            rbtJs.stickyHeader();
            rbtJs.popupMobileMenu();
            rbtJs.headerSticky();
            rbtJs.headerTopActivation();
            rbtJs.showMoreBtn();
            rbtJs.rbtMagneticBtn();
            rbtJs.onePageNav();
            rbtJs.smoothAnchorScroll();
            rbtJs.RbtEsAnimation().init();
            rbtJs.RbtnavEffectActivation();
            $(document).on('tabActiveHighlight', function () {
                rbtJs.RbtnavEffectActivation();
            });
            $(document).on('renderIsotopeAgainAfterLoad', function () {
                rbtJs.isotopeActivation();
            });
            rbtJs.reorderComingSoonDemos();
            rbtJs.isotopeActivation();
            rbtJs.progressCount();
            rbtJs.colorAnimation();
            rbtJs.loadMoreDemos();
            rbtJs.tabActivationWithNavigation();
            rbtJs.fancyboxActivation();
            rbtJs.modalDismissBlur();
        },

        preloaderInit: function () {
            $(document).ready(function () {
                $('.rbt-preloader').fadeOut('slow', function () {
                    $(this).hide();
                });
            });
        },

        menuCurrentLink: function () {
            var currentPage = location.pathname.split('/');
            var current = currentPage[currentPage.length - 1];

            $('.mainmenu li a').each(function () {
                var $this = $(this);
                if ($this.attr('href') === current) {
                    $this.addClass('active');
                    $this.parents('.has-menu-child-item').addClass('menu-item-open');
                }
            });
        },

        rbtSwiperActive: function () {
            var BaseSwiper = window.Swiper;

            if (typeof BaseSwiper !== 'function') {
                return;
            }

            function revealSwiper(swiperInstance) {
                if (!swiperInstance || !swiperInstance.el) {
                    return;
                }

                $(swiperInstance.el).css('visibility', 'visible');
                $(swiperInstance.el).closest('.rbt-arrow-between').addClass('is-swiper-ready');
            }

            function queueSwiperRefresh(swiperInstance) {
                var deferRefresh = window.requestAnimationFrame || function (callback) {
                    window.setTimeout(callback, 0);
                };

                deferRefresh(function () {
                    swiperInstance.update();
                    revealSwiper(swiperInstance);
                });

                if (document.readyState !== 'complete') {
                    $(window).one('load', function () {
                        swiperInstance.update();
                        revealSwiper(swiperInstance);
                    });
                }
            }

            function createSwiper(target, config) {
                if (target && target.swiper && !target.swiper.destroyed) {
                    queueSwiperRefresh(target.swiper);
                    return target.swiper;
                }

                var swiperConfig = $.extend(true, {}, config);
                var originalOn = swiperConfig.on || {};

                swiperConfig.init = false;
                swiperConfig.on = $.extend({}, originalOn, {
                    init: function () {
                        if (typeof originalOn.init === 'function') {
                            originalOn.init.apply(this, arguments);
                        }

                        revealSwiper(this);
                    },
                    imagesReady: function () {
                        if (typeof originalOn.imagesReady === 'function') {
                            originalOn.imagesReady.apply(this, arguments);
                        }

                        this.update();
                        revealSwiper(this);
                    }
                });

                var swiperInstance = new BaseSwiper(target, swiperConfig);
                swiperInstance.init();
                queueSwiperRefresh(swiperInstance);

                return swiperInstance;
            }

            var Swiper = function (target, config) {
                return createSwiper(target, config);
            };

            function initializeSwipers() {
                $('.rbt-text-swiper-container').each(function () {
                    var $thisSlider = $(this);
                    if ($thisSlider.length > 0) {
                        var swiperInstance = new Swiper($thisSlider[0], {
                            loop: true,
                            slidesPerView: '1',
                            direction: 'vertical',
                            effect: 'slide',
                            autoplay: {
                                delay: 2000,
                                reverseDirection: true,
                                disableOnInteraction: false,
                            },
                            navigation: {
                                prevEl: '.rbt-arrow-vertical .rbt-arrow-prev',
                                nextEl: '.rbt-arrow-vertical .rbt-arrow-next',
                                clickable: true,
                            },
                        });

                        $thisSlider[0].addEventListener('mouseenter', function () {
                            swiperInstance.autoplay.stop();
                        });

                        $thisSlider[0].addEventListener('mouseleave', function () {
                            swiperInstance.autoplay.start();
                        });
                    }
                });

                $('.rbt-splash-feature-slide-active').each(function () {
                    var $thisSlider = $(this);
                    if ($thisSlider.length > 0) {
                        new Swiper($thisSlider[0], {
                            slidesPerView: 1,
                            spaceBetween: 24,
                            speed: 1500,
                            loop: true,
                            grabCursor: true,
                            autoplay: {
                                delay: 2000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true,
                            },
                            pagination: {
                                el: '.rbt-swiper-pagination-var-one',
                                clickable: true
                            },
                        });
                    }
                });

                $('.rbt-feature-slide-active').each(function () {
                    var $thisSlider = $(this);
                    if ($thisSlider.length > 0) {
                        new Swiper($thisSlider[0], {
                            direction: 'vertical',
                            slidesPerView: 4,
                            spaceBetween: 16,
                            speed: 1500,
                            loop: true,
                            grabCursor: true,
                            centeredSlides: true,
                            autoplay: {
                                delay: 1500,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true,
                            }
                        });
                    }
                });

                $('.splash-element-presentation-active').each(function () {
                    var $thisSlider = $(this);
                    if ($thisSlider.length > 0) {
                        new Swiper($thisSlider[0], {
                            slidesPerView: 'auto',
                            spaceBetween: 32,
                            speed: 9000,
                            loop: true,
                            grabCursor: true,
                            autoplay: {
                                delay: 0,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true,
                            }
                        });
                    }
                });

                $('.rbt-splash-cart-layout-active').each(function () {
                    var $thisSlider = $(this);
                    if ($thisSlider.length > 0) {
                        new Swiper($thisSlider[0], {
                            slidesPerView: 'auto',
                            spaceBetween: 32,
                            grabCursor: true,
                            autoplay: true,
                            speed: 1000,
                            delay: 0,
                            navigation: {
                                prevEl: '.rbt-arrow-left',
                                nextEl: '.rbt-arrow-right',
                                clickable: true,
                            },
                            breakpoints: {
                                320: { spaceBetween: 24 },
                                768: { spaceBetween: 32 }
                            }
                        });
                    }
                });

                $('.rbt-splash-component-slider-active').each(function () {
                    var $thisSlider = $(this);
                    if ($thisSlider.length > 0) {
                        new Swiper($thisSlider[0], {
                            slidesPerView: 'auto',
                            spaceBetween: 48,
                            grabCursor: true,
                            loop: true,
                            speed: 1000,
                            autoplay: true,
                            navigation: {
                                prevEl: '.rbt-arrow-left',
                                nextEl: '.rbt-arrow-right',
                                clickable: true,
                            }
                        });
                    }
                });

                $('.rbt-mobile-view-slide-active').each(function () {
                    var $thisSlider = $(this);
                    if ($thisSlider.length > 0) {
                        new Swiper($thisSlider[0], {
                            slidesPerView: 'auto',
                            spaceBetween: 24,
                            grabCursor: true,
                            loop: true,
                            speed: 800,
                            autoplay: true,
                            navigation: {
                                prevEl: '.rbt-arrow-left',
                                nextEl: '.rbt-arrow-right',
                                clickable: true,
                            },
                            pagination: false,
                        });
                    }
                });
            }

            initializeSwipers();
        },

        counterUp: function () {
            var odo = $('.odometer');
            odo.each(function () {
                $('.odometer').appear(function () {
                    var countNumber = $(this).attr('data-count');
                    $(this).text(countNumber);
                });
            });

            $('.rbt-initial-odo-count').hover(
                function () {
                    var odometerElement = $(this).find('.odometer');
                    var targetValue = odometerElement.data('count');
                    odometerElement.text(targetValue);
                },
                function () {
                    $(this).find('.odometer').text('00');
                }
            );
        },

        stickyHeader: function () {
            if ($('header').hasClass('header-transparent')) {
                $('body').addClass('active-header-transparent');
            } else {
                $('body').removeClass('active-header-transparent');
            }
        },

        popupMobileMenu: function () {
            $('.hamberger-button').on('click', function () {
                $('.popup-mobile-menu').addClass('active');
            });

            $('.close-button').on('click', function () {
                $('.popup-mobile-menu').removeClass('active');
                $('.popup-mobile-menu .mainmenu .has-dropdown > a, .popup-mobile-menu .mainmenu .with-rbt-megamenu > a')
                    .siblings('.submenu, .rbt-megamenu').removeClass('active').slideUp('400');
                $('.popup-mobile-menu .mainmenu .has-dropdown > a, .popup-mobile-menu .mainmenu .with-rbt-megamenu > a')
                    .removeClass('open');
            });

            $('.popup-mobile-menu .mainmenu .has-dropdown > a, .popup-mobile-menu .mainmenu .with-rbt-megamenu > a')
                .on('click', function (e) {
                    e.preventDefault();
                    $(this).siblings('.submenu, .rbt-megamenu').toggleClass('active').slideToggle('400');
                    $(this).toggleClass('open');
                });

            $('.popup-mobile-menu, .popup-mobile-menu .mainmenu.onepagenav li a').on('click', function (e) {
                if (e.target === this) {
                    $('.popup-mobile-menu').removeClass('active');
                    $('.popup-mobile-menu .mainmenu .has-dropdown > a, .popup-mobile-menu .mainmenu .with-rbt-megamenu > a')
                        .siblings('.submenu, .rbt-megamenu').removeClass('active').slideUp('400');
                    $('.popup-mobile-menu .mainmenu .has-dropdown > a, .popup-mobile-menu .mainmenu .with-rbt-megamenu > a')
                        .removeClass('open');
                }
            });
        },

        headerSticky: function () {
            var $window = $(window);
            var $body = $('body');
            var $stickyPlaceHolder = $('.rbt-sticky-placeholder');
            var $headerContainer = $('.rbt-header-sticky-activation');
            var $headerContainerCommon = $('.rbt-header-common-sticky-activation');
            var ticking = false;

            if (!$headerContainer.length && !$headerContainerCommon.length) {
                return;
            }

            function updateStickyHeader() {
                ticking = false;

                if (!$body.hasClass('rbt-header-sticky')) {
                    return;
                }

                var headerContainerH = $headerContainer.outerHeight() || 0;
                var topHeaderH = $('.rbt-header-top').outerHeight() || 0;
                var targetScroll = topHeaderH + 200;
                var shouldStick = $window.scrollTop() > targetScroll;

                $headerContainer.toggleClass('rbt-sticky', shouldStick);
                $headerContainerCommon.toggleClass('rbt-sticky', shouldStick);
                $stickyPlaceHolder.height(shouldStick ? headerContainerH : 0);

                if ($headerContainerCommon.length > 0) {
                    $headerContainer.removeClass('rbt-sticky');
                }
            }

            function requestStickyHeaderUpdate() {
                if (ticking) {
                    return;
                }

                ticking = true;
                (window.requestAnimationFrame || window.setTimeout)(updateStickyHeader);
            }

            $window.on('scroll', requestStickyHeaderUpdate);
            updateStickyHeader();
        },

        headerTopActivation: function () {
            $('.bgsection-activation').on('click', function () {
                $(this).parents('.rbt-header-campaign').addClass('deactive');
            });
        },

        showMoreBtn: function () {
            $.fn.hasShowMore = function () {
                return this.each(function () {
                    $(this).toggleClass('active');
                    var buttonText = $(this).find('button').text() === 'Show More' ? 'Show Less' : 'Show More';
                    $(this).find('button').text(buttonText);
                    $(this).parent('.rbt-has-show-more').toggleClass('active');
                });
            };

            $(document).on('click', '.rbt-show-more-btn-area', function () {
                $(this).hasShowMore();
            });
        },

        rbtMagneticBtn: function () {
            var buttons = document.querySelectorAll('.rbt-magnetic-button');
            var strength = 80;

            buttons.forEach(function (button) {
                button.addEventListener('mousemove', function (event) {
                    var rect = button.getBoundingClientRect();
                    var buttonCenterX = rect.left + rect.width / 2;
                    var buttonCenterY = rect.top + rect.height / 2;
                    var deltaX = event.clientX - buttonCenterX;
                    var deltaY = event.clientY - buttonCenterY;
                    var angle = Math.atan2(deltaY, deltaX);
                    var distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                    var maxDistance = Math.min(strength, distance);
                    var offsetX = maxDistance * Math.cos(angle);
                    var offsetY = maxDistance * Math.sin(angle);

                    button.style.transition = 'transform 0.3s ease-out';
                    button.style.transform = 'translate(' + offsetX + 'px, ' + offsetY + 'px) scale(1.09)';
                });

                button.addEventListener('mouseleave', function () {
                    button.style.transition = 'transform 0.3s ease-out';
                    button.style.transform = 'translate(0, 0) scale(1)';
                });
            });
        },

        onePageNav: function () {
            if (typeof $.fn.onePageNav !== 'function') {
                return;
            }

            var getHeaderOffset = function () {
                var $stickyHeader = $('.rbt-header-common-sticky-activation.rbt-sticky, .rbt-header-wrapper.rbt-sticky').first();

                if ($stickyHeader.length) {
                    return Math.ceil($stickyHeader.outerHeight()) || 80;
                }

                return 80;
            };

            var syncNavActiveState = function (activeHref, $sourceNav) {
                if (!activeHref) {
                    return;
                }

                $('.rbt-mainmenu-nav.onepagenav').not($sourceNav).each(function () {
                    var $nav = $(this);
                    $nav.find('li').removeClass('current');
                    $nav.find('a[href="' + activeHref + '"]').parent().addClass('current');
                });
            };

            var refreshOnePageNav = function () {
                $(window).trigger('resize.onePageNav');
            };

            $('.rbt-mainmenu-nav.onepagenav, .onepagenav').each(function () {
                var $nav = $(this);

                $nav.onePageNav({
                    currentClass: 'current',
                    changeHash: false,
                    scrollSpeed: 1000,
                    scrollOffset: getHeaderOffset(),
                    scrollThreshold: 0.3,
                    filter: 'a[href^="#"]:not([href="#!"])',
                    easing: 'swing',
                    scrollChange: function ($activeItem) {
                        syncNavActiveState($activeItem.find('a').attr('href'), $nav);
                    },
                    end: refreshOnePageNav
                });
            });

            $(window).on('load.onePageNav resize.onePageNav', function () {
                window.setTimeout(refreshOnePageNav, 200);
            });
        },

        smoothAnchorScroll: function () {
            var getHeaderOffset = function () {
                var $stickyHeader = $('.rbt-header-common-sticky-activation.rbt-sticky, .rbt-header-wrapper.rbt-sticky').first();

                if ($stickyHeader.length) {
                    return Math.ceil($stickyHeader.outerHeight()) || 80;
                }

                return 80;
            };

            // Smooth-scroll for standalone on-page anchor buttons/links that are
            // NOT part of a one-page-nav menu (those are handled by onePageNav).
            $(document).on('click', 'a[href*="#"]:not([href="#"]):not([href="#!"])', function (e) {
                var $link = $(this);

                // Skip links handled by the one-page-nav plugin.
                if ($link.closest('.onepagenav').length) {
                    return;
                }

                // Only handle same-page anchors.
                var href = $link.attr('href') || '';
                var hashIndex = href.indexOf('#');
                if (hashIndex < 0) {
                    return;
                }

                var hash = href.slice(hashIndex);
                if (hash.length < 2) {
                    return;
                }

                var $target = $(hash);
                if (!$target.length) {
                    return;
                }

                e.preventDefault();

                var targetTop = $target.offset().top - getHeaderOffset();

                $('html, body').stop().animate({
                    scrollTop: Math.max(targetTop, 0)
                }, 1000, 'swing');

                // Close mobile menu if open.
                if ($('body').hasClass('rbt-popup-mobile-menu')) {
                    $('body').removeClass('rbt-popup-mobile-menu');
                }
            });
        },

        RbtEsAnimation: function () {
            return {
                init: function () {
                    this.animates();
                },
                animates: function () {
                    var animates = $('.rbt-scroll-trigger');
                    if (animates.length > 0) {
                        animates.each(function () {
                            $(this).on('animationend', function (e) {
                                window.setTimeout(function () {
                                    $(e.target).attr('animation-end', '');
                                }, 1000);
                            });
                        });
                    }
                }
            };
        },

        RbtnavEffectActivation: function () {
            function updateBackground($activeItem, $backgroundHighlight) {
                if (!$activeItem || !$activeItem.length) {
                    return;
                }

                var itemOffset = $activeItem.offset();
                var menuOffset = $activeItem.closest('.rbt-nav-effect-activation').offset();

                $backgroundHighlight.css({
                    width: $activeItem.outerWidth(),
                    height: $activeItem.outerHeight(),
                    left: itemOffset.left - menuOffset.left,
                    top: itemOffset.top - menuOffset.top
                });
            }

            function initializeNavEffectActivation(container) {
                var $menuItems = $(container).find('ul li a, .rbt-tab-btn-list button');
                var $menuItemsHover = $(container).find('ul.has-hover-effect li a');
                var $backgroundHighlight = $(container).find('.rbt-bg-highlight');

                updateBackground($(container).find('a.active, button.active'), $backgroundHighlight);

                $menuItems.each(function () {
                    $(this).on('click', function (e) {
                        e.preventDefault();
                        $menuItems.removeClass('active');
                        $(this).addClass('active');
                        updateBackground($(this), $backgroundHighlight);
                    });
                });

                $menuItemsHover.each(function () {
                    $(this).on('mouseenter', function () {
                        updateBackground($(this), $backgroundHighlight);
                        $menuItems.removeClass('active');
                        $(this).addClass('active');
                    });

                    $(this).on('mouseleave', function () {
                        updateBackground($(container).find('a.active, button.active'), $backgroundHighlight);
                    });
                });

                $(container).on('mouseleave', function () {
                    $menuItems.removeClass('hovered');
                    updateBackground($(container).find('a.active, button.active'), $backgroundHighlight);
                });
            }

            $('.rbt-nav-effect-activation').each(function () {
                initializeNavEffectActivation(this);
            });
        },

        reorderComingSoonDemos: function () {
            $('.splash-demo-mesonry-activation .grid-4-meso').each(function () {
                var $grid = $(this);
                var $loadMoreBtn = $grid.find('.rbt-load-more-element-btn');
                var $comingSoon = $grid.find('.rbt-meso-item.coming-soon');

                $comingSoon.each(function () {
                    if ($loadMoreBtn.length) {
                        $(this).insertBefore($loadMoreBtn);
                    } else {
                        $grid.append(this);
                    }
                });
            });
        },

        isotopeActivation: function () {
            $('.rbt-custom-page-meso-active, .splash-demo-mesonry-activation').each(function () {
                var $container = $(this);
                var $grid = $container.find('.grid-3-meso, .grid-2-meso, .grid-4-meso, .grid-5-meso, .grid-8-meso').imagesLoaded(function () {
                    var isotopeOptions = {
                        itemSelector: '.rbt-meso-item',
                        layoutMode: 'masonry'
                    };

                    if ($container.hasClass('splash-demo-mesonry-activation')) {
                        isotopeOptions.sortBy = 'demoOrder';
                        isotopeOptions.getSortData = {
                            demoOrder: function (itemElem) {
                                return $(itemElem).hasClass('coming-soon') ? 1 : 0;
                            }
                        };
                    }

                    var instance = $grid.isotope(isotopeOptions);
                    $container.data('isotopeGrid', instance);
                });

                $container.find('.rbt-tab-btn-list').on('click', 'button', function () {
                    var filterValue = $(this).attr('data-filter');
                    $(this).siblings('.active').removeClass('active');
                    $(this).addClass('active');

                    var $gridInstance = $container.data('isotopeGrid');
                    if ($gridInstance) {
                        $gridInstance.isotope({ filter: filterValue });
                    }
                });
            });

            $('.modal').on('shown.bs.modal', function () {
                $('.rbt-custom-page-meso-active, .splash-demo-mesonry-activation').each(function () {
                    var $gridInstance = $(this).data('isotopeGrid');
                    if ($gridInstance) {
                        $gridInstance.isotope('layout');
                    }
                });
            });

            if ($('.rbt-layout').length) {
                $('.rbt-layout').isotope({
                    itemSelector: '.rbt-layout-item',
                    percentPosition: true,
                    horizontalOrder: true,
                    masonry: {
                        columnWidth: '.rbt-layout-item',
                    }
                });
            }
        },

        progressCount: function () {
            $('.rbt-modern-progress-bar').each(function () {
                var $this = $(this);
                var percent = $this.data('percent');

                if (typeof percent === 'undefined' || isNaN(percent)) {
                    return;
                }

                percent = percent / 100;

                $this.waypoint(function (direction) {
                    if (direction === 'down') {
                        try {
                            var bar = new ProgressBar.Circle(this.element, {
                                color: '#24BD25',
                                strokeWidth: 16,
                                duration: 800,
                                from: { color: '#24BD25', width: 4 },
                                to: { color: '#24BD25', width: 4 },
                                step: function (state, circle) {
                                    circle.path.setAttribute('stroke', state.color);
                                    circle.path.setAttribute('stroke-width', state.width);

                                    var value = Math.round(circle.value() * 100);
                                    circle.setText(value === 0 ? '' : value + '%');
                                }
                            });

                            bar.animate(percent);
                        } catch (e) {
                            console.error('Error initializing ProgressBar:', e);
                        }

                        this.destroy();
                    }
                }, {
                    offset: '75%'
                });
            });
        },

        colorAnimation: function () {
            if (typeof gsap === 'undefined') {
                return;
            }

            var bottomBar = $('.rbt-demo-filter-bottom-bar');
            var colorWrapper = $('.rbt-color-animation-active');
            var tl;

            if (bottomBar.length) {
                gsap.set(bottomBar, { scale: 1.05, opacity: 0, stagger: 0.2 });
                gsap.timeline({
                    scrollTrigger: {
                        trigger: '.rbt-demo-filter-bottom-bar',
                        scroller: 'body',
                        start: 'top 100%',
                        end: 'top 60%',
                        scrub: true
                    }
                }).to(bottomBar, {
                    scale: 1,
                    duration: 2,
                    opacity: 1,
                    ease: 'power2.out'
                });
            }

            if (colorWrapper.length) {
                gsap.set(colorWrapper, { x: 0, y: 0, stagger: 0.2 });
                tl = gsap.timeline({
                    yoyo: true,
                    scrollTrigger: {
                        trigger: '.rbt-color-animation-card',
                        scroller: 'body',
                        start: 'top 50%',
                        end: 'top 0%',
                    }
                });
            }

            if (colorWrapper.length && tl) {
                $('.rbt-color-animation-active .rbt-color-1').each(function () {
                    gsap.set($(this), { x: 150, scaleX: 0.5 });
                    tl.to($(this), { x: 0, scaleX: 1, duration: 1 }, '+');
                });
                $('.rbt-color-animation-active .rbt-color-2').each(function () {
                    gsap.set($(this), { y: -30, scaleX: 0.5 });
                    tl.to($(this), { y: 0, scaleX: 1, duration: 1 }, '+');
                });
                $('.rbt-color-animation-active .rbt-color-3').each(function () {
                    gsap.set($(this), { x: -100, y: 30, scaleX: 0.5 });
                    tl.to($(this), { x: 0, y: 0, scaleX: 1, duration: 1 }, '+');
                });
                $('.rbt-color-animation-active .rbt-color-4').each(function () {
                    gsap.set($(this), { x: -150, scaleX: 0.5 });
                    tl.to($(this), { x: 0, scaleX: 1, duration: 1 }, '+');
                });
            }
        },

        loadMoreDemos: function () {
            $('.rbt-has-load-more-element').each(function () {
                var $container = $(this);
                var $elements = $container.find('.rbt-load-single-element');
                var $loadMoreBtn = $container.find('.rbt-load-more-element-btn');
                var $nothingFound = $('.rbt-nothing-found');
                var demoPerLoading = parseInt($container.attr('data-element-per-load'), 10) || 16;
                var currentPage = 0;
                var isSearching = false;

                function showMoreDemos() {
                    if (isSearching) {
                        return;
                    }

                    var start = currentPage * demoPerLoading;
                    var end = start + demoPerLoading;
                    $elements.slice(start, end).addClass('visible');
                    currentPage++;

                    if (currentPage * demoPerLoading >= $elements.length) {
                        $loadMoreBtn.hide();
                    }

                    $(document).trigger('renderIsotopeAgainAfterLoad');
                }

                showMoreDemos();
                $loadMoreBtn.on('click', showMoreDemos);

                $container.find('.rbt-filter-btn').on('click', function () {
                    var filterValue = $(this).attr('data-filter');
                    if (filterValue === '*') {
                        $elements.addClass('rbt-load-single-element');
                        if (!isSearching) {
                            $loadMoreBtn.removeClass('d-none');
                        }
                    } else {
                        $elements.removeClass('rbt-load-single-element');
                        $loadMoreBtn.addClass('d-none');
                    }
                });

                $('.rbt-demo-search-active').each(function () {
                    var searchContainer = $(this);
                    var searchField = searchContainer.find('#rbt-demo-search-field');
                    var filterBtn = $('.rbt-tab-btn-list button');

                    searchField.attr('autocomplete', 'off');

                    searchField.on('input', function () {
                        var searchVal = searchField.val().trim().toLowerCase();
                        isSearching = searchVal.length > 0;
                        handleDemoSearch(searchVal);
                    });

                    function handleDemoSearch(searchVal) {
                        if (searchVal.length > 0) {
                            $loadMoreBtn.addClass('d-none');
                            $elements.removeClass('rbt-load-single-element');
                        } else {
                            $loadMoreBtn.removeClass('d-none');
                            $elements.addClass('rbt-load-single-element');
                        }

                        var matchCount = 0;
                        $('.splash-demo-mesonry-activation').each(function () {
                            var $isoContainer = $(this);
                            var $gridInstance = $isoContainer.data('isotopeGrid');
                            if (!$gridInstance) {
                                return;
                            }

                            $gridInstance.isotope({
                                filter: function () {
                                    var demoTitle = $(this).find('.rbt-title').text().toLowerCase();
                                    var isMatch = demoTitle.includes(searchVal);
                                    if (isMatch) {
                                        matchCount++;
                                    }
                                    return isMatch;
                                }
                            });
                        });

                        if (matchCount === 0) {
                            $nothingFound.show();
                        } else {
                            $nothingFound.hide();
                        }
                    }

                    filterBtn.on('click', function () {
                        searchField.val('');
                        isSearching = false;
                        var filterValue = $(this).attr('data-filter');
                        $(this).siblings('.active').removeClass('active');
                        $(this).addClass('active');

                        $('.splash-demo-mesonry-activation').each(function () {
                            var $isoContainer = $(this);
                            var $gridInstance = $isoContainer.data('isotopeGrid');
                            if (!$gridInstance) {
                                return;
                            }
                            $gridInstance.isotope({ filter: filterValue });
                        });

                        $nothingFound.hide();

                        if (filterValue === '*') {
                            $loadMoreBtn.removeClass('d-none');
                        }
                    });
                });
            });
        },

        tabActivationWithNavigation: function () {
            var currentLocation = document.location.href;

            $('.rbt-filter-btn').each(function () {
                var currentTab = $(this);
                var currentTabId = currentTab.attr('id');

                if (currentTabId && currentLocation.includes(currentTabId)) {
                    currentTab.siblings().removeClass('active');
                    currentTab.addClass('active');
                    $(document).trigger('tabActiveHighlight');
                }
            });
        },

        fancyboxActivation: function () {
            if (typeof Fancybox === 'undefined') {
                return;
            }

            Fancybox.bind('[data-fancybox]', {
                Html: {
                    iframeAttr: {
                        allow: 'autoplay; fullscreen',
                        scrolling: 'auto',
                        referrerpolicy: 'strict-origin-when-cross-origin'
                    }
                }
            });
        },

        modalDismissBlur: function () {
            $('.rbt-modal-dis-btn').on('click', function () {
                $(this).blur();
            });
        }
    };

    $(window).ready(function () {
        rbtJs.i();
    });
})(window, document, jQuery);
