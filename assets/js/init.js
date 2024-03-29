/*
= GET WINDOW WIDTH
------------------------------------------------------------------------------------- */

    function viewport() {
        var e = window,
            a = 'inner';
        if (!('innerWidth' in window)) {
            a = 'client';
            e = document.documentElement || document.body;
        };
        return { width: e[a + 'Width'] };
    };

/*
= SLICE IMAGES
-------------------------------------------------------------------------------------- */

    var _defaults = {
        x: 4, 
        y: 4
    };

    $.fn.sliced = function( options ) {
        var o = $.extend( {}, _defaults, options );
        return this.each(function() {
            var $container = $(this);
            $container.find('.tile').remove();
            $container.find('img').show();
            var width = $container.width(),
                height = $container.height(),
                $img = $container.find('img'),
                n_tiles = o.x * o.y,
                tiles = [], $tiles;
            for ( var i = 0; i < n_tiles; i++ ) {
                tiles.push('<div class="tile" />');
            }
            $tiles = $( tiles.join('') );
            var imgW = $img.width(),
                imgH = $img.height(),
                imgX = $img.position().left,
                imgY = $img.position().top;
            $img.hide().after( $tiles );
            $tiles.css({
                width: Math.floor(width / o.x),
                height: Math.ceil(height / o.y),
                backgroundImage: 'url('+ $img.attr('src') +')',
                backgroundSize: imgW + 'px ' + imgH + 'px'
            });
            $tiles.each(function(i) {
                var pos = $(this).position();
                if ($(this).parents('.front').length && $('body').hasClass('home')) {
                    pos.top -= $(window).height();
                }
                if ($(window).width() > $(window).height()) {
                    pos.top += Math.abs(imgY);
                }
                pos.left += Math.abs(imgX);
                $(this).css( 'backgroundPosition', -pos.left +'px '+ -pos.top +'px' );
            });
        });
    };

/*
= MAIN CONTROLLER
-------------------------------------------------------------------------------------- */

    var all = {
        windowW: 0,
        windowH: $(window).height(),
        html: $('html'),
        body: $('body'),
        device: null,
        distanceFromTop: 0,
        lastDistanceFromTop: 0,
        resizeTimeout: null,
        navOpened: false,
        header: $('header'),
        footer: $('footer'),
        contentVisible: false,
        init: function() {

        /*
        + Preloading */

            var animation = bodymovin.loadAnimation({
                container: document.getElementById('logo-1'),
                renderer: 'svg',
                loop: true,
                autoplay: false,
                path: themeUrl + '/pictures/logo-white.json'
            })

            animation.goToAndStop(0, false);

            var animation1 = bodymovin.loadAnimation({
                container: document.getElementById('logo-2'),
                renderer: 'svg',
                loop: true,
                autoplay: false,
                path: themeUrl + '/pictures/logo-dark.json'
            })

            animation1.goToAndStop(0, false);

            all.body.preloading({
                beforeComplete: function() {
                    all.resize();
                },
                onComplete: function() {
                    $('.hero').addClass('active');
                    all.body.addClass('init-anim');
                    if (all.body.hasClass('home')) {
                        setTimeout(function() {
                            all.body.addClass('init-anim-finished');
                        }, 2000); 
                        
                        animation.goToAndPlay(0, true);                   
                        animation1.goToAndPlay(0, true); 
                        
                        setTimeout(function() {
                            animation.goToAndStop(0, false);
                            animation1.goToAndStop(0, false);
                        }, 8000); 
                        
                    } else {
                        all.body.addClass('init-anim-finished');     
                        animation.goToAndPlay(0, true);                   
                        animation1.goToAndPlay(0, true); 
                        
                        setTimeout(function() {
                            animation.goToAndStop(0, false);
                            animation1.goToAndStop(0, false);
                        }, 8000);
                    }
                }
            });

        /*
        + Detecting device */

            if (all.html.hasClass('desktop')) { all.device = 'desktop'; }
            else if (all.html.hasClass('tablet')) { all.device = 'tablet'; }
            else if (all.html.hasClass('mobile')) { all.device = 'mobile'; }

        /*
        + Choosing theme */

            all.device == 'desktop' ?
                this.desktop.init() :
                this.handheld.init();

        },
        transformSetter: function(x, y, scaleX, scaleY) {
            return {
                '-webkit-transform': 'translateX(' + x + ') translateY(' + y + ') translateZ(0px) rotate(0deg) scale(' + scaleX + ', ' + scaleY + ')',
                '-moz-transform': 'translateX(' + x + ') translateY(' + y + ') translateZ(0px) rotate(0deg) scale(' + scaleX + ', ' + scaleY + ')',
                'transform': 'translateX(' + x + ') translateY(' + y + ') translateZ(0px) rotate(0deg) scale(' + scaleX + ', ' + scaleY + ')',
            }
        },
        transitionSetter: function(property, duration, delay, easing) {
            return {
                '-webkit-transition': property + ' ' + duration + ' ' + delay + ' ' + easing,
                '-moz-transition': property + ' ' + duration + ' ' + delay + ' ' + easing,
                '-o-transition': property + ' ' + duration + ' ' + delay + ' ' + easing,
                '-ms-transition': property + ' ' + duration + ' ' + delay + ' ' + easing,
                'transition': property + ' ' + duration + ' ' + delay + ' ' + easing,
            }           
        },
        delaySetter: function(delay) {
            return {
                '-webkit-transition-delay': delay + 'ms',
                '-moz-transition-delay': delay + 'ms',
                '-ms-transition-delay': delay + 'ms',
                '-o-transition-delay': delay + 'ms',
                'transition-delay': delay + 'ms'
            }
        },
        snap: {
            init: function() {

                if (all.device === 'mobile') {
                    // <br> tags are entered in the Wordpress admin content because of the desktop
                    // It is creating weird line breaks on mobile so we're removing them
                    $('.page-template-tpl_annual_report h5 > br').replaceWith(' ');
                }

                var sideNav = $('.side-nav'),
                    section = $('.sections-holder section'),
                    running = false,
                    runningTimeout = null,
                    prepTimeout = null;

                $('.sections-holder section').each(function() {
                    var curr = $(this);
                    curr.hasClass('hero') ? 
                        curr.show() :
                        curr.hide()
                })

                $('.bgrs-holder section').each(function(i) {
                    var curr = $(this);
                    i == 0 ? 
                        curr.show() :
                        curr.hide()
                })

                var animatingTimeout = null,
                    test = null;

                function moving(active, curr) {
                    running = true;
                    all.activeSection = curr;
                    curr.show();
                    $('.bgrs-holder section').eq(curr.index()).show();
                    if (curr.index() > active.index()) {
                        active.find('.holder').each(function() {
                            var curr = $(this);
                            curr.css(all.delaySetter(curr.data('delay-up')));
                        })
                        curr.find('.holder').each(function() {
                            var curr = $(this);
                            curr.css(all.delaySetter(curr.data('delay-anim-up')));
                        })
                        prepTimeout = setTimeout(function() {
                            curr.addClass('active').removeClass('down up');
                            $('.bgrs-holder section').eq(curr.index()).addClass('active').removeClass('down up');
                            active.addClass('up');
                            $('.bgrs-holder section').eq(active.index()).addClass('up');
                            for (var i = active.index() + 1; i < curr.index(); i++) {
                                section.eq(i).addClass('up').removeClass('down');
                                $('.bgrs-holder section').eq(i).addClass('up').removeClass('down');
                            }
                            animatingTimeout = setTimeout(function() {
                                $('.bgrs-holder section').eq(curr.index()).addClass('animating');
                                clearTimeout(animatingTimeout);
                                animatingTimeout = null;
                            }, 450)
                            clearTimeout(prepTimeout);
                            prepTimeout = null;
                        }, 50)
                    } else {
                        active.find('.holder').each(function() {
                            var curr = $(this);
                            curr.css(all.delaySetter(curr.data('delay-down')));
                        })
                        curr.find('.holder').each(function() {
                            var curr = $(this);
                            curr.css(all.delaySetter(curr.data('delay-anim-down')));
                        })
                        prepTimeout = setTimeout(function() {
                            curr.addClass('active').removeClass('down up');
                            $('.bgrs-holder section').eq(curr.index()).addClass('active').removeClass('down up');
                            active.addClass('down');
                            $('.bgrs-holder section').eq(active.index()).addClass('down');
                            for (var i = section.length - 1; i > curr.index(); i--) {
                                section.eq(i).addClass('down').removeClass('up');
                                $('.bgrs-holder section').eq(i).addClass('down').removeClass('up');
                            }
                            clearTimeout(prepTimeout);
                            prepTimeout = null;
                        }, 50)
                    }
                    runningTimeout = setTimeout(function() {
                        running = false;
                        $('.bgrs-holder section').eq(curr.index()).removeClass('animating');
                        active.removeClass('active').hide();
                        $('.bgrs-holder section').eq(active.index()).removeClass('active').hide();
                        all.body.removeClass('switching');
                        if($('.footer').hasClass('active')){
                            all.body.addClass('footer-active');
                        } else {
                            all.body.removeClass('footer-active');
                        }
                        sideNav.children().removeClass('faded')
                        clearTimeout(runningTimeout);
                        runningTimeout = null;
                    }, 2000)
                    sideNav.children().removeClass('active').eq(curr.index()).addClass('active');
                    sideNav.children().eq(active.index()).addClass('faded');
                    all.body.addClass('switching');
                }


                // function revealBgr(active, direction) {
                //     running = true;
                //     all.body.addClass('switching');                    
                //     active.find('.bgr, .holder, .box').css(all.delaySetter(0));
                //     if (direction == 'down') {
                //         active.addClass('bgr-revealed');
                //         $('.side-nav li').eq(active.index()).find('a svg ellipse').css({
                //             'strokeDashoffset': 360 - (63 * 0.5)
                //         })
                //         if (viewport().width <= 1024)
                //             sideNav.addClass('dark');                        
                //     } else {
                //         active.removeClass('bgr-revealed');
                //         $('.side-nav li').eq(active.index()).find('a svg ellipse').css({
                //             'strokeDashoffset': 360
                //         })                        
                //         sideNav.removeClass('dark');
                //     }
                //     runningTimeout = setTimeout(function() {
                //         all.body.removeClass('switching');
                //         active.find('.bgr, .holder, .box').css({
                //             '-webkit-transition-delay': '',
                //             '-moz-transition-delay': '',
                //             '-ms-transition-delay': '',
                //             '-o-transition-delay': '',
                //             'transition-delay': '',
                //         });                        
                //         clearTimeout(runningTimeout);
                //         runningTimeout = null;
                //         running = false;
                //     }, 1600)
                // } 

                if (all.device != 'mobile' && $('.with-auto-height').length) {
                    $('.with-auto-height .holder')[0].addEventListener('scroll', function(e) {
                        if (running) {
                            e.preventDefault();
                            e.stopPropagation();
                            return false;
                        }
                    }, {passive: false});
                    $('.with-auto-height .holder')[0].addEventListener('mousewheel', function(e) {
                        if (running) {
                            e.preventDefault();
                            e.stopPropagation();
                            return false;
                        }
                    }, {passive: false});
                    $('.with-auto-height .holder')[0].addEventListener('touchmove', function(e) {
                        if (running) {
                            e.preventDefault();
                            e.stopPropagation();
                            return false;
                        }
                    }, {passive: false});                    
                }


                var timer,
                    atTop = true,
                    atBottom = false,
                    atContentTop = true;
                
                $(window).on('mousewheel wheel', function(e) {
                    //if (!all.mapViewed && !$('.nav-trigger').hasClass('close-btn')) {
                        var activeSection = $('.sections-holder section.active');
                        if (timer) clearTimeout(timer);
                        timer = setTimeout(function(){
                            $(this).trigger('scrollFinished');
                        }, 55)      
                        if (e.originalEvent.deltaY > 0) {
                            if (activeSection.index() < section.length - 1 && !running && !all.navOpened) {
                                if (activeSection.hasClass('with-auto-height') && activeSection.children('.holder').scrollTop() < activeSection.find('article').outerHeight() - all.windowH) {} 
                                else if (activeSection.hasClass('with-auto-height') && activeSection.children('.holder').scrollTop() >= activeSection.find('article').outerHeight() - all.windowH && !atBottom) {}
                                else {moving(activeSection, activeSection.next());}
                            } else if (activeSection.index() == section.length - 1 && all.body.hasClass('annual-report')) {
                                if (activeSection.hasClass('with-auto-height') && activeSection.children('.holder').scrollTop() < activeSection.find('article').outerHeight() - all.windowH && activeSection.find('article').outerHeight() > all.windowH) {} 
                                else if (activeSection.hasClass('with-auto-height') && activeSection.children('.holder').scrollTop() >= activeSection.find('article').outerHeight() - all.windowH && !atBottom && activeSection.find('article').outerHeight() > all.windowH) {}
                                else  {
                                    console.log(1);
                                    $('.sections-holder, .bgrs-holder').css(all.transformSetter('0px', '-100%', 1, 1))
                                    $('.content-outer').css(all.transformSetter('0px', '0', 1, 1))
                                    all.body.css('height', 'auto').addClass('sticky-header');
                                    setTimeout(function() {
                                        $('.content-outer').css({
                                            'height': 'auto'
                                        })
                                    }, 1000);
                                    all.contentVisible = true;
                                }
                            }
                                
                        } else {
                            if (activeSection.index() > 0 && !running && !all.navOpened) {
                                if (activeSection.hasClass('with-auto-height') && activeSection.children('.holder').scrollTop() > 0) {}
                                else if (activeSection.hasClass('with-auto-height') && activeSection.children('.holder').scrollTop() <= 0 && !atTop) {}
                                else {moving(activeSection, activeSection.prev());}
                            } if (atContentTop) {
                                 $('.sections-holder, .bgrs-holder').css(all.transformSetter('0px', '0px', 1, 1))
                                 $('.content-outer').css(all.transformSetter('0px', '100vh', 1, 1))
                                all.body.css('height', '');
                                all.body.css('height', 'auto').removeClass('sticky-header');
                                $('.content-outer').css({
                                    'height': ''
                                })
                                all.contentVisible = false;
                            }
                        }
                        if (activeSection.hasClass('with-auto-height') && !running) 
                            atBottom = atTop = false;
                    //}
                });

                $(window).on('scrollFinished', function() {
                    var activeSection = $('.sections-holder section.active');
                    if (activeSection.hasClass('with-auto-height')) {
                        if (activeSection.children('.holder').scrollTop() <= 0) {
                            atBottom = false;
                            atTop = true;   
                        } else if (activeSection.children('.holder').scrollTop() >= activeSection.find('article').outerHeight() - all.windowH) {
                            atBottom = true;
                            atTop = false;
                        }
                    }
                })

                $(window).on('scroll', function() {
                    if ($('.annual-report').length) {
                        if ($(window).scrollTop() <= 0) {
                            atContentTop = true;
                        } else {
                            atContentTop = false;
                        }
                    }                    
                })

                // $(document).keydown(function(e) { 
                //     if (!all.mapViewed && !$('.nav-trigger').hasClass('close-btn')) {                    
                //         var activeSection = $('.sections-holder section.active');
                //         if ((e.keyCode == 0 || e.keyCode == 32 || e.keyCode == 40) && !all.mapViewed) { 
                //             if (activeSection.index() < section.length - 1 && !running && !all.navOpened) {
                //                 if (activeSection.hasClass('with-auto-height') && activeSection.scrollTop() < activeSection.find('.holder').outerHeight() - all.windowH) {} 
                //                 else if (activeSection.hasClass('with-bgr') && !activeSection.hasClass('bgr-revealed')) {
                //                     revealBgr(activeSection, 'down');
                //                 }
                //                 else {moving(activeSection, activeSection.next());}
                //             }
                //         } else if (e.keyCode == 38) {
                //             if (activeSection.index() > 0 && !running && !all.navOpened) {
                //                 if (activeSection.hasClass('with-auto-height') && activeSection.scrollTop() > 0) {}
                //                 else if (activeSection.hasClass('with-bgr') && activeSection.hasClass('bgr-revealed')) {
                //                     revealBgr(activeSection, 'up');
                //                 }                                                              
                //                 else {moving(activeSection, activeSection.prev());}
                //             }
                //         }
                //     }
                // })

                all.body.swipe({
                    swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
                        var activeSection = $('.sections-holder section.active');
                        if (direction == 'up') {
                            if (activeSection.index() < section.length - 1 && !running && !all.navOpened) {
                                if (activeSection.hasClass('with-auto-height') && activeSection.children('.holder').scrollTop() < activeSection.find('article').outerHeight() - all.windowH) {} 
                                else {moving(activeSection, activeSection.next());}
                            } else if (activeSection.index() == section.length - 1 && all.body.hasClass('annual-report')) {
                                if (activeSection.hasClass('with-auto-height') && activeSection.children('.holder').scrollTop() < activeSection.find('article').outerHeight() - all.windowH) {} 
                                else {
                                    $('.content-outer').show();
                                    all.body.addClass('sticky-header');
                                    setTimeout(function() {
                                        $('.content-outer').css(all.transformSetter('0px', '0', 1, 1))
                                        $('.sections-holder, .bgrs-holder').css(all.transformSetter('0px', '-100%', 1, 1))
                                        $(window).scrollTop(0)
                                    }, 50)
                                    setTimeout(function() {
                                        all.body.css('height', 'auto');
                                        $('.content-outer').css({
                                            'height': 'auto'
                                        })
                                    }, 1050)
                                    all.contentVisible = true;
                                }
                            }
                        } else if (direction == 'down') {
                            if (activeSection.index() > 0 && !running && !all.navOpened && !all.contentVisible) {
                                if (activeSection.hasClass('with-auto-height') && activeSection.children('.holder').scrollTop() > 0) {}
                                else {moving(activeSection, activeSection.prev());}
                            } else if (atContentTop) {
                                 $('.sections-holder, .bgrs-holder').css(all.transformSetter('0px', '0px', 1, 1))
                                 $('.content-outer').css(all.transformSetter('0px', '100vh', 1, 1))
                                all.body.css('height', '');
                                $('.content-outer').css({
                                    'height': ''
                                })
                                all.body.removeClass('sticky-header');
                                all.contentVisible = false;
                            }
                        }
                    }
                });

                $('.scroll-indicator').click(function(e) {
                    e.preventDefault();
                    if (!all.body.hasClass('annual-report')) {
                        if (!$('.sections-holder section.active').is(':last-child'))
                        moving($('.sections-holder section.active'), $('.sections-holder section.active').next());
                    } else {
                        if (!$('.sections-holder section.active').is(':last-of-type')) {
                            if (!$('.sections-holder section.active').is(':last-child'))
                            moving($('.sections-holder section.active'), $('.sections-holder section.active').next());
                        } else {
                            if (all.device != 'desktop') {
                                $('.content-outer').show();
                                all.body.addClass('sticky-header');
                                setTimeout(function() {
                                    $('.content-outer').css(all.transformSetter('0px', '0', 1, 1))
                                    $('.sections-holder, .bgrs-holder').css(all.transformSetter('0px', '-100%', 1, 1))
                                    $(window).scrollTop(0)
                                }, 50)
                                setTimeout(function() {
                                    all.body.css('height', 'auto');
                                    $('.content-outer').css({
                                        'height': 'auto'
                                    })
                                }, 1050)
                                all.contentVisible = true;
                                atBottom = atTop = false;
                            } else {
                                $('.sections-holder, .bgrs-holder').css(all.transformSetter('0px', '-100%', 1, 1))
                                $('.content-outer').css(all.transformSetter('0px', '0', 1, 1))
                                all.body.css('height', 'auto').addClass('sticky-header');
                                setTimeout(function() {
                                    $('.content-outer').css({
                                        'height': 'auto'
                                    })
                                }, 1000);
                                atBottom = atTop = false;
                            }
                        }
                    }
                })
                $('.mobile-scroll-indicator').click(function(e) {
                    e.preventDefault();
                    if (!all.body.hasClass('annual-report')) {
                        if (!$('.sections-holder section.active').is(':last-child'))
                        moving($('.sections-holder section.active'), $('.sections-holder section.active').next());
                    } else {
                        if (all.device != 'desktop') {
                            $('.content-outer').show();
                            all.body.addClass('sticky-header');
                            setTimeout(function() {
                                $('.content-outer').css(all.transformSetter('0px', '0', 1, 1))
                                $('.sections-holder, .bgrs-holder').css(all.transformSetter('0px', '-100%', 1, 1))
                                $(window).scrollTop(0)
                            }, 50)
                            setTimeout(function() {
                                all.body.css('height', 'auto');
                                $('.content-outer').css({
                                    'height': 'auto'
                                })
                            }, 1050)
                            all.contentVisible = true;
                            atBottom = atTop = false;
                        } else {
                            $('.sections-holder, .bgrs-holder').css(all.transformSetter('0px', '-100%', 1, 1))
                            $('.content-outer').css(all.transformSetter('0px', '0', 1, 1))
                            all.body.css('height', 'auto').addClass('sticky-header');
                            setTimeout(function() {
                                $('.content-outer').css({
                                    'height': 'auto'
                                })
                            }, 1000);
                            atBottom = atTop = false;
                        }
                    }
                })

                sideNav.find('a').click(function(e) {
                    e.preventDefault();
                    var parent = $(this).parent();
                    if (!parent.hasClass('active') && !running) {
                        moving($('.sections-holder section.active'), section.eq(parent.index()));
                    }
                })


            }
        },         
        common: { 
            parallaxOffsets: [],
            animatedOffsets: [], 
            parallaxPosition: function(element, index) {

                var currSpeed = element.data('speed'),
                    siteTopOffset = this.parallaxOffsets[index].top < all.windowH ? all.windowH - this.parallaxOffsets[index].top : 0,
                    currMovement = currSpeed * (this.parallaxOffsets[index].top - all.lastDistanceFromTop - all.windowH + siteTopOffset);
                currMovement += 0;
                if (((currSpeed < 0 && currMovement < 0) || (currSpeed > 0 && currMovement > 0))) currMovement = 0;
                element.css(all.transformSetter('0px', currMovement + 'px', 1, 1));

            }, 
            init: function() {

            /*
            + Prevent scrolling */

                window.addEventListener('scroll', function(e) {
                    if (all.navOpened) {
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                    }
                }, {passive: false});
                window.addEventListener('mousewheel', function(e) {
                    if (all.navOpened) {
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                    }
                }, {passive: false});
                window.addEventListener('touchmove', function(e) {
                    if (all.navOpened) {
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                    }
                }, {passive: false});

            /*
            + Call resize functionality */

                this.resize();

            /*
            + Main navigation */

                // $('.nav-trigger').click(function(e) {
                //     e.preventDefault();
                //     all.navOpened = !all.navOpened;
                // })

            /*
            + Scroll animations */

                var raf;

                if (typeof raf == 'undefined') scrollingAnimation();

                function scrollingAnimation() {

                    all.distanceFromTop = $(window).scrollTop();

                    if (Math.abs(all.lastDistanceFromTop - all.distanceFromTop) >= 1) {

                        dY = all.distanceFromTop - all.lastDistanceFromTop;
                        all.lastDistanceFromTop += (dY / 10);                                

                    /*
                    + Parallax movement (if it's in view) */

                        $('.parallax').each(function(i) {
                            var curr = $(this);
                            if (all.common.parallaxOffsets[i].top - all.distanceFromTop  < all.windowH &&
                                all.distanceFromTop - (all.common.parallaxOffsets[i].top + all.common.parallaxOffsets[i].height) <= 0) {
                                all.common.parallaxPosition(curr, i);
                            }
                        });

                    /*
                    + Animate element (if it's in view) */

                        $('.animated').each(function(i) {
                            var curr = $(this),
                                currOffset = all.windowH;
                            if (all.common.animatedOffsets[i].top - all.distanceFromTop < currOffset)
                                curr.addClass('in-view');
                        });
                        
                        /*  
                    + Add / remove sticky header */ 
                        
                        if (all.distanceFromTop > 0 && all.device == 'desktop' && !all.body.hasClass('home')) { 
                            if (!all.body.hasClass('sticky-header')) {  
                                all.body.addClass('sticky-header'); 
                            }   
                        } else if (!all.body.hasClass('annual-report')) {   
                            all.body.removeClass('sticky-header');  
                        }

                        if( !all.body.hasClass('home') && !all.body.hasClass('annual-report')) {
                            all.distanceFromTop <= 0 ?
                                all.body.removeClass('going-up').removeClass('going-down') :
                                all.distanceFromTop > all.lastDistanceFromTop && !all.header.hasClass('stay-in-view') ?
                                    all.body.addClass('going-down').removeClass('going-up') :
                                    all.body.addClass('going-up').removeClass('going-down')
                        }

                        if(all.body.hasClass('annual-report') && all.contentVisible) {
                            all.distanceFromTop <= 0 ?
                                all.body.removeClass('going-up').removeClass('going-down') :
                                all.distanceFromTop > all.lastDistanceFromTop && !all.header.hasClass('stay-in-view') ?
                                    all.body.addClass('going-down').removeClass('going-up') :
                                    all.body.addClass('going-up').removeClass('going-down')
                        }

                    }

                    raf = requestAnimationFrame(scrollingAnimation);

                };

            },
            resize: function() {

            /*
            + Setting animated elements' initial positions / offsets */

                this.parallaxOffsets = [];
                this.animatedOffsets = [];
                this.darkHeights = [];
                this.fixedOffsets = []

                $('.parallax, .animated').each(function(i) {
                    var curr = $(this),
                        currParam = {
                            top: curr.offset().top,
                            height: curr.outerHeight()
                        };
                    curr.hasClass('parallax') ?
                        all.common.parallaxOffsets.push(currParam) :
                        all.common.animatedOffsets.push(currParam);
                    if (curr.hasClass('animated')) {
                        if (curr.offset().top - all.distanceFromTop < all.windowH)
                            curr.addClass('in-view')
                    }
                });

                $('.parallax').each(function(i) {
                   all.common.parallaxPosition($(this), i);
                });

            /*
            + Slice images */

                $('.sliced').each(function() {
                    var curr = $(this),
                        isHidden = false;
                    if (curr.parents('section').is(':hidden')) {
                        curr.parents('section').show();
                        isHidden = true;
                    }
                    curr.sliced({ x: 4, y: 4 });
                    if (isHidden) {
                        curr.parents('section').hide();
                    }
                })

            },
        },   
        desktop: {
            navigation: {
                closeCursorTimeout: null,
                closeCursor: false,
                navOpened: false,
                currentCursorY: 0,
                currentCursorX: 0,
                tabletVersion: false,
                desktopNavBuilt: false,
                tabletNavBuilt: false,
                sizeCalculations: function () {

                /*
                + Building navigation */

                    if (!this.desktopNavBuilt) {
                        $('header nav > .main-nav > li').each(function (i) {
                            var curr = $(this);
                            /*if (curr.children('ul').length) {
                                curr.attr('data-order', i);
                                clonedNav = curr.children('ul').clone(true, true);
                                $('<li />').appendTo('.sub-nav > ul').attr('data-order', i).append(clonedNav);
                                curr.children('ul').remove();
                            }*/
                        })
                        $('header nav ul').show();
                        this.navOpened = false;
                        this.desktopNavBuilt = true;
                    }

                    $('header nav ul li').each(function () {
                        if (all.windowW > 1200) {
                            var curr = $(this),
                                currOrder = curr.data('order');
                            if (typeof (currOrder) != 'undefined') {
                                var currSubnav = $('.sub-nav ul li[data-order="' + currOrder + '"]'),
                                    currW = currSubnav.children().width();
                                currSubnav.children().css({
                                    'paddingRight': all.windowW - curr.offset().left - currW - 20
                                })
                            }
                        } else {
                            $('header nav ul li ul li').removeAttr('style');
                        }
                    })
                }

            },
            checkCursor: function () {

                /*
                + Check if cursor is close to the navigaion */

                if (all.desktop.navigation.closeCursorTimeout != null) clearTimeout(all.desktop.navigation.closeCursorTimeout);
                var navX = $('header nav ul').offset().left - 55,
                    navY = 204;
                if ((all.desktop.navigation.currentCursorX <= navX || all.desktop.navigation.currentCursorY >= navY) && !all.desktop.navigation.navOpened) {
                    if (all.desktop.navigation.closeCursor) {
                        all.desktop.navigation.closeCursorTimeout = setTimeout(function () {
                            all.body.removeClass('sticky-header');
                            clearTimeout(all.desktop.navigation.closeCursorTimeout);
                            all.desktop.navigation.closeCursorTimeout = null;
                        }, 300);
                        all.desktop.navigation.closeCursor = false;
                    }
                }

            },            
            init: function() {

            /*
            + Call common functionality */

                all.common.init();


                all.snap.init();

            /*
            + Navigation's functionality */

                var subNavHovered = false,
                    mainNavTimeouts = [],
                    zindexTimeout = null;
                    subNavHoveredTimeout = null,
                    activeMainNavItem = null,
                    oldMainNavItem = null,
                    transformTimeout = null,
                    transformOneTimeout = null,
                    subnav = $('.sub-nav'),
                    mainNavLi = $('header .holder nav .main-nav > li'),
                    subnavUl = subnav.children('ul'),
                    subnavLi = subnavUl.children('li'),
                    subnavLiLength = subnavLi.length,
                    clearMainNavTimeouts = function () {
                        for (var i = 0; i < mainNavTimeouts.length; i++) {
                            if (mainNavTimeouts[i] != null) {
                                clearTimeout(mainNavTimeouts[i]);
                                mainNavTimeouts[i] = null;
                            }
                        }
                    };

                $('header .holder nav > .main-nav > li > a').hover(function (e) {
                    var curr = $(this),
                        currIndex = curr.parent().index(),
                        currOrder = curr.parent().data('order');
                    clearMainNavTimeouts();
                    if (subNavHoveredTimeout != null)
                        clearTimeout(subNavHoveredTimeout);
                    mainNavLi.removeClass('active').removeClass('right-to-left').removeClass('left-to-right');
                    curr.parent('li').addClass('active');
                    if (oldMainNavItem != null) {
                        oldMainNavItem.parent('li').addClass('active');
                        if (currIndex > oldMainNavItem.parent().index()) {
                            oldMainNavItem.parent().addClass('right-to-left');
                            curr.parent().addClass('left-to-right');
                        } else {
                            oldMainNavItem.parent().addClass('left-to-right')
                            curr.parent().addClass('right-to-left');
                        }
                    }
                    if (!all.desktop.navigation.navOpened) {
                        $('.sub-nav > ul > li').css(all.transitionSetter('none', '', '', ''));
                        $('.sub-nav > ul > li').css(all.transformSetter('100%', '0px', 1, 1)).css('opacity', '0');
                        $('.sub-nav > ul').find('[data-order="' + currOrder + '"]').css(all.transformSetter('0px', '0px', 1, 1)).css('opacity', '1');
                        $('.sub-nav > ul > li').css(all.transitionSetter('', '', '', ''));
                    }
                    mainNavTimeouts[currIndex] = setTimeout(function () {
                        if (typeof (currOrder) != 'undefined') {
                            activeMainNavItem = curr;
                            subnav.addClass('opened');
                            curr.parent().removeClass('right-to-left').removeClass('left-to-right');
                            if (oldMainNavItem != null && oldMainNavItem.parent().data('order') != curr.parent().data('order'))
                                oldMainNavItem.parent('li').removeClass('active');
                            if (all.desktop.navigation.navOpened && oldMainNavItem.parent().data('order') != curr.parent().data('order')) {
                                if (oldMainNavItem != null) {
                                    var oldOrder = oldMainNavItem.parent('li').data('order'),
                                        oldIndex = oldMainNavItem.parent('li').index();
                                    subnavUl.find('[data-order="' + currOrder + '"]').css(all.transitionSetter('none', '', '', ''));
                                    if (typeof (oldOrder) != 'undefined') {
                                        oldIndex < currIndex ?
                                            subnavUl.find('[data-order="' + currOrder + '"]').css(all.transformSetter('20%', '0px', 1, 1)).css('opacity', '0') :
                                            subnavUl.find('[data-order="' + currOrder + '"]').css(all.transformSetter('-20%', '0px', 1, 1)).css('opacity', '0');
                                    } else {
                                        subnavUl.find('[data-order="' + currOrder + '"]').css(all.transformSetter('0%', '0px', 1, 1)).css('opacity', '0')
                                    }
                                    console.log(subnavLi.eq(currOrder).css('transform'));
                                    transformTimeout = setTimeout(function () {
                                        subnavUl.find('[data-order="' + currOrder + '"]').css(all.transitionSetter('', '', '', ''));
                                        if (oldOrder < currOrder) {
                                            subnavUl.find('[data-order="' + currOrder + '"]').css(all.transformSetter('0%', '0px', 1, 1)).css('opacity', '1');
                                            subnavUl.find('[data-order="' + oldOrder + '"]').css(all.transformSetter('-20%', '0px', 1, 1)).css('opacity', '0');
                                        } else {
                                            subnavUl.find('[data-order="' + currOrder + '"]').css(all.transformSetter('0%', '0px', 1, 1)).css('opacity', '1');
                                            subnavUl.find('[data-order="' + oldOrder + '"]').css(all.transformSetter('20%', '0px', 1, 1)).css('opacity', '0');
                                        }
                                        clearTimeout(transformTimeout);
                                        transformTimeout = setTimeout(function () {
                                            subnavUl.find('[data-order="' + oldOrder + '"]').css(all.transitionSetter('none', '', '', ''));
                                            subnavUl.find('[data-order="' + oldOrder + '"]').css(all.transformSetter('100%', '0', 1, 1));
                                            subnavUl.find('[data-order="' + oldOrder + '"]').css(all.transitionSetter('', '', '', ''));
                                            clearTimeout(transformTimeout);
                                        }, 350)
                                    }, 20)
                                }
                            } else {
                                all.desktop.navigation.navOpened = true;
                            }
                        } else {
                            activeMainNavItem = curr;
                            if (oldMainNavItem != null && oldMainNavItem.parent().index() != curr.parent().index())
                                oldMainNavItem.parent('li').removeClass('active');
                            subnav.removeClass('opened');
                            if (oldMainNavItem != null) {
                                var oldOrder = oldMainNavItem.parent('li').data('order');
                                transformOneTimeout = setTimeout(function () {
                                    oldMainNavItem = null;
                                    clearTimeout(transformOneTimeout);
                                    subnavUl.find('[data-order="' + oldOrder + '"]').css('opacity', '0');
                                    transformOneTimeout = setTimeout(function () {
                                        subnavUl.find('[data-order="' + oldOrder + '"]').css(all.transitionSetter('none', '', '', ''));
                                        subnavUl.find('[data-order="' + oldOrder + '"]').css(all.transformSetter('100%', '0', 1, 1));
                                        subnavUl.find('[data-order="' + oldOrder + '"]').css(all.transitionSetter('', '', '', ''));
                                        clearTimeout(transformOneTimeout);
                                    }, 350)
                                }, 10)
                            }
                        }
                        clearTimeout(mainNavTimeouts[currIndex]);
                    }, 350);
                }, function () {
                    var curr = $(this),
                        currIndex = curr.parent().index();
                    if (activeMainNavItem != null && currIndex == activeMainNavItem.parent().index()) { oldMainNavItem = curr; }
                    clearMainNavTimeouts();
                    if (!subNavHovered) {
                        curr.parent('li').removeClass('active');
                        if (oldMainNavItem != null) oldMainNavItem.parent('li').removeClass('active')
                        mainNavTimeouts[currIndex] = setTimeout(function () {
                            activeMainNavItem = oldMainNavItem = null;
                            all.desktop.navigation.navOpened = false;
                            subnav.removeClass('opened');
                            all.desktop.checkCursor();
                            clearTimeout(mainNavTimeouts[currIndex]);
                        }, 350);
                    }
                });

                subnavUl.hover(function () {
                    clearMainNavTimeouts();
                    if (subNavHoveredTimeout != null)
                        clearTimeout(subNavHoveredTimeout);
                    subNavHovered = true;
                    mainNavLi.removeClass('active');
                    activeMainNavItem.parent('li').addClass('active');
                }, function () {
                    subNavHovered = false;
                    mainNavLi.removeClass('active');
                    subNavHoveredTimeout = setTimeout(function () {
                        all.desktop.navigation.navOpened = false;
                        subnav.removeClass('opened');
                        activeMainNavItem = oldMainNavItem = null;
                        all.desktop.checkCursor();
                        clearTimeout(subNavHoveredTimeout);
                        subNavHoveredTimeout = null;
                    }, 350);
                }); 

                var subnavLiHoverTimeout = null;

                all.body.on('mouseenter', '.sub-nav ul li ul li', function() {
                    if (subnavLiHoverTimeout != null) {
                        clearTimeout(subnavLiHoverTimeout);
                        subnavLiHoverTimeout = null;
                    }
                    var curr = $(this),
                        currPos = curr.position().left;
                    if (!subnavUl.find('ul li div').length) {
                        // $('<div />').appendTo(subnavUl.find('ul li:first-child')).css({ 
                        //     'left': currPos,
                        //     'width': curr.outerWidth()
                        // });
                        opacityTimeout = setTimeout(function () {
                            subnavUl.find('div').css('opacity', '1');
                            clearTimeout(opacityTimeout);
                            opacityTimeout = null;
                        }, 10)
                    } else {
                        // subnavUl.find('div').css({ 'left': currPos, 'opacity': '1', 'width': curr.outerWidth() });
                    }                    
                })

                all.body.on('mouseleave', '.sub-nav ul li ul li', function() {
                    subnavUl.find('div').css({ 'opacity': '0' });
                    subnavLiHoverTimeout = setTimeout(function () {
                        subnavUl.find('div').remove();
                        clearTimeout(subnavLiHoverTimeout);
                        subnavLiHoverTimeout = null;
                    }, 250)
                })

                /*
                + Check if cursor is close to the navigaion */

                $(window).mousemove(function (event) {
                    all.desktop.navigation.currentCursorX = event.pageX;
                    all.desktop.navigation.currentCursorY = event.pageY;
                    //if (all.windowW >= 1200) {
                        var navX = $('header nav ul').offset().left - 55,
                            navY = 140;
                        if (all.desktop.navigation.currentCursorX > navX && all.desktop.navigation.currentCursorY < navY) {
                            all.body.addClass('sticky-header');
                            all.desktop.navigation.closeCursor = true;
                        } else if (!all.desktop.navigation.navOpened) {

                            if (all.desktop.navigation.closeCursor) {
                                all.desktop.navigation.closeCursorTimeout = setTimeout(function () {
                                    all.body.removeClass('sticky-header');
                                    clearTimeout(all.desktop.navigation.closeCursorTimeout);
                                }, 300);
                            }
                            all.desktop.navigation.closeCursor = false;
                        }
                    //}
                });

                var outOfView = true,
                    outOfViewTimeout = null;

                $(window).mousemove(function(e) {
                    if (e.clientY < 110) {
                        if (outOfViewTimeout != null) {
                            clearTimeout(outOfViewTimeout);
                            outOfViewTimeout = null;
                        }
                        outOfView = false;
                        all.header.addClass('stay-in-view');
                    } else if (!subNavHovered) {
                        // if (outOfViewTimeout != null) {
                        //     clearTimeout(outOfViewTimeout);
                        //     outOfViewTimeout = null;
                        // }
                        if (!outOfView) {
                            outOfViewTimeout = setTimeout(function() {
                                all.header.removeClass('stay-in-view')
                                clearTimeout(outOfViewTimeout);
                                outOfViewTimeout = null;
                            }, 350)
                            outOfView = true;
                        }
                    }
                })

            },
            resize: function() {

            /*
            + Navigation resizing */

                this.navigation.sizeCalculations();

            }
        },
        handheld: {
            navigation: {

                init: function() {

                /*
                + Add / remove sticky header's class */

                    var raf,
                        animRunning = false;

                    if (typeof raf == 'undefined') scrolling();

                    function scrolling() {

                        if (all.distanceFromTop != $(window).scrollTop()) {

                            if ($(window).scrollTop() > 0 && !$('body').hasClass('home')) {
                                if (all.distanceFromTop > $(window).scrollTop()) {
                                    all.body.addClass('going-up').removeClass('going-down')
                                } else if (!animRunning && !$('.main-nav > li.active').length) {
                                    all.body.addClass('going-down').removeClass('going-up');
                                }
                                if (!all.header.hasClass('sticky-header')) {
                                    all.header.addClass('sticky-header');
                                }
                            } else {
                                all.body.removeClass('going-down').removeClass('going-up');
                            }

                            all.distanceFromTop = $(window).scrollTop();

                        }

                        raf = requestAnimationFrame(scrolling);

                    }

                /*
                + Prevent scrolling */

                    all.header.on('scrolll touchmove mousewheel', function (e) {
                        if ((all.html.hasClass('landscape') && all.device == 'mobile') || all.navOpened) {
                            e.preventDefault();
                            e.stopPropagation();
                            return false;
                        }
                    });

                /*
                + Close nav on outside click */

                    if (all.device == 'tablet') {
                        all.header.click(function(e) {
                            if (all.navOpened && e.pageX < all.windowW / 2) {
                                $('.nav-trigger').trigger('click')
                            }
                        })
                    }

                /*
                + Building navigation */

                    $('.sub-nav').remove();

                    $('header nav ul li ul').each(function() {
                        var curr = $(this),
                            cloned = curr.clone(true, true),
                            text = curr.prev().text(),
                            currIndex = curr.parents('li').index();
                        curr.parents('li').addClass('with-sub-nav');
                        /*curr.remove();*/
                        $('<div class="sub-nav" data-order="' + currIndex + '"><a class="back-btn">' + text + '</a></div>').appendTo('header .holder').append(cloned);
                    })

                    $('header nav ul li').each(function(i) {
                        $(this).css(all.delaySetter(i * 25))
                    })

                    $('.sub-nav').each(function() {
                        $(this).find('li').each(function(i) {
                            $(this).css(all.delaySetter(i * 25))
                        });
                    })

                /*
                + Enable navigation scrolling on mobile */

                    $('.sub-nav ul').on('mousewheel scroll touchmove', function (e) {
                        e.stopPropagation();
                    });

                /*
                + Navigation functionality */

                    $('.nav-trigger').click(function(e) {
                        e.preventDefault()
                        if (!all.navOpened) {
                            $(this).addClass('open')
                            all.header.addClass('nav-opened');
                            all.navOpened = true;
                        } else {
                            $(this).removeClass('open')
                            all.header.removeClass('nav-opened').removeClass('sub-nav-opened');
                            $('.sub-nav').css(all.transformSetter('', '', '', ''))                            
                            all.navOpened = false;
                        }
                    })

                    $('header nav ul li.menu-item-has-children a').click(function(e) {
                        e.preventDefault();
                        var currIndex = $(this).parent().index();
                        //console.log($('.sub-nav').index);
                        $('.sub-nav[data-order="' + currIndex + '"]').css(all.transformSetter('0px', '0px', 1, 1))
                        all.header.addClass('sub-nav-opened');
                    })

                    all.body.on('click', '.sub-nav .back-btn', function(e) {
                        e.preventDefault();
                        $('.sub-nav').css(all.transformSetter('', '', '', ''))
                        all.header.removeClass('sub-nav-opened');
                    })

                }

            },
            init: function() {

            /*
            + Call common functionality */

                all.common.init();

                all.snap.init();

                this.navigation.init();

                if (all.device == 'tablet' && window.innerWidth > window.innerHeight) {

                } else {
                    var clonedCta = $('.cta-btn').clone(true, true);
                    $(clonedCta).appendTo('.hero .holder, .footer .holder');
                    all.body.children('.cta-btn').remove();
                }

            /*
            + Call resize functionality */

                this.resize();

            /*
            + Scrolling animation */

                var raf;

                if (typeof raf == 'undefined') scrollingAnimation();

                function scrollingAnimation() {

                    raf = requestAnimationFrame(scrollingAnimation);

                };

            },
            resize: function() {

            }
        },
        resize: function() {

            if (this.device == 'desktop' || this.windowW != viewport().width) {

                if (this.resizeTimeout != null) {
                    clearTimeout(this.resizeTimeout)
                    this.resizeTimeout = null;
                }

                //this.resizeTimeout = setTimeout(function() {

                    all.windowW = viewport().width;
                    all.windowH = $(window).height();

                    all.common.resize();

                    all.device == 'desktop' ?
                        all.desktop.resize() :
                        all.handheld.resize();

                    clearTimeout(all.resizeTimeout)
                    all.resizeTimeout = null;

                //}, 500)

            }

        }
    }

    $(window).resize(function() {
        all.resize();
    })    

    all.init();

    //all.resize();


    // if ($('body').hasClass('home')) {

    //     var canvas = document.querySelector('canvas'),
    //         ctx = canvas.getContext('2d')

    //     canvas.width = canvas.height = 128;

    //     resize();
    //     window.onresize = resize;

    //     function resize() {
    //         canvas.width = window.innerWidth;
    //         canvas.height = window.innerHeight;
    //         canvas.style.width = window.innerWidth + 'px'
    //         canvas.style.height = window.innerHeight + 'px'
    //     }

    //     function noise(ctx) {
        
    //         var w = ctx.canvas.width,
    //             h = ctx.canvas.height,
    //             iData = ctx.createImageData(w, h),
    //             buffer32 = new Uint32Array(iData.data.buffer),
    //             len = buffer32.length;
            
    //         let i = 0

    //         for(; i < len; i++)
    //             if (Math.random() < 0.5) buffer32[i] = 0xffffffff;
            
    //         ctx.putImageData(iData, 0, 0);
        
    //     }

    //     //noise(ctx);

    //     (function loop() {
    //         noise(ctx);
    //         requestAnimationFrame(loop);
    //     })();

    // }

    if ($('html').hasClass('desktop') && $('body').hasClass('home')) {

        var boxDims = new Array();

        function setRandomPos(elements) {
            elements.each(function() {
                var conflict = true;
                while (conflict) {
                    fixLeft = Math.round(Math.random() * ($(window).width() - 400)) + 40;
                    fixTop = Math.round(Math.random() * ($(window).height() - 50)) + 40;
                    $(this).offset({
                        left: fixLeft,
                        top: fixTop
                    });
                    var box = {
                        top: parseInt(window.getComputedStyle($(this)[0]).top),
                        left: parseInt(window.getComputedStyle($(this)[0]).left),
                        width: parseInt(window.getComputedStyle($(this)[0]).width),
                        height: parseInt(window.getComputedStyle($(this)[0]).height)
                    }
                    conflict = false;
                    for (var i = 0; i < boxDims.length; i++) {
                        if (overlap(box,boxDims[i])) {
                            conflict = true;
                            break;
                        } else {
                            conflict = false;
                        }                   
                    }
                }
                boxDims.push(box)
            });
        }

        function overlap(box1,box2) {
            var x1 = box1.left;
            var y1 = box2.top;
            var h1 = box1.height;
            var w1 = box1.width;
            var b1 = y1 + h1;
            var r1 = x1 + w1;
            var x2 = box1.left;
            var y2 = box1.top;
            var h2 = box1.height;
            var w2 = box1.width;
            var b2 = y2 + h2;
            var r2 = x2 + w2;
            var buf = 24;
            if (b1 + buf < y2 || y1 > b2 + buf || r1 + buf < x2 || x1 > r2 + buf) return false;
            return true;
        }

        $('.boxes-holder').each(function() {
            setRandomPos($(this).children(), 40, 40);    
        })
    }

    // $('.decoration p').html(function(index, html) {
    //   return html.replace(/\S/g, '<span>$&</span>');
    // });

    $.fn.wordify = function() {
        this.find(':not(iframe, textarea)').addBack().contents().filter(function() {
            return this.nodeType === 3;
        }).each(function() {
            var textnode = $(this);
            var text = textnode.text();
            text = text.replace(/([^\s-.,;:!?()[\]{}<>"]+)/g, '<span>$1</span>');
            textnode.replaceWith(text);
        });
        return this;
    };
        
    $('.decoration p').each(function() {
        $(this).wordify().children().each(function(i) {
            var curr = $(this),
                delay = curr.parents('section').is(':first-child') ? 
                    Math.ceil(Math.random() * 1500) : 
                    Math.ceil(Math.random() * 1500) + 1000;
            curr.css(all.delaySetter(delay))
        });
    });

    $('.decoration .box').each(function() {
        var curr = $(this),
            delay = curr.parents('section').is(':first-child') ? 
                Math.ceil(Math.random() * 1500) : 
                Math.ceil(Math.random() * 1500) + 1000;
        curr.css({ 'animation-delay': delay + 'ms' })
    });


    $('.carousel').each(function() {
        var curr = $(this),
            count = curr.find('.imgs').data('imgs').split(',').length;
        for (var i = 0; i < count; i ++) {
            i == 0 ?
                $('<li class="active"><a href="#">' + i + '</a></li>').appendTo(curr.find('.bullets')) :
                $('<li><a href="#">' + i + '</a></li>').appendTo(curr.find('.bullets'));
        }
        curr.find('.imgs li:nth-child(1) span').css('background-image', 'url(' + curr.find('.imgs').data('imgs').split(',')[count - 1]);
        curr.find('.imgs li:nth-child(2) span').css('background-image', 'url(' + curr.find('.imgs').data('imgs').split(',')[0]);
        curr.find('.imgs li:nth-child(3) span').css('background-image', 'url(' + curr.find('.imgs').data('imgs').split(',')[1]);
    })

    var carouselRunning = false,    
        carouselRunningTimeout = null,
        carouselPrepTimeout = null,
        swiping = false;

    $('.carousel .bullets li a').click(function(e) {
        e.preventDefault();
        var curr = $(this).parent(),
            active = curr.siblings('.active'),
            parent = curr.parents('.carousel'),
            imgs = parent.find('.imgs').data('imgs').split(','),
            count = imgs.length,
            li = curr.parents('.carousel').find('.imgs li');
        if (!curr.hasClass('active') && !carouselRunning) {
            //li.eq(1).find('span').css('background-image', 'url(' + imgs[curr.index()] + ')');
            $('<div><span class="with-effect" style="background-image: url(' + imgs[curr.index()] + ')" /></div>').appendTo(li.eq(1))
            if (curr.index() > active.index()) {
                if (curr.index() == count - 1 && active.index() == 0 && swiping) {
                    parent.find('.slider').addClass('going-right');
                    curr.index() == count - 1 ?
                        $('<div><span class="with-effect" style="background-image: url(' + imgs[0] + ')" /></div>').appendTo(li.eq(2)) :
                        $('<div><span class="with-effect" style="background-image: url(' + imgs[curr.index() + 1] + ')" /></div>').appendTo(li.eq(2))
                    //li.eq(2).find('span').css('background-image', 'url(' + imgs[curr.index() + 1] + ')');
                    curr.index() == 0 ?
                        $('<div><spanv style="background-image: url(' + imgs[count - 1] + ')" /></div>').appendTo(li.eq(0)) :
                        $('<div><spanv style="background-image: url(' + imgs[curr.index() - 1] + ')" /></div>').appendTo(li.eq(0));
                    carouselPrepTimeout = setTimeout(function() {
                        parent.find('.slider').addClass('went-right');
                        clearTimeout(carouselPrepTimeout);
                        carouselPrepTimeout = null;
                    }, 50)                
                } else {
                    parent.find('.slider').addClass('going-left');
                    $('<div><span class="with-effect" style="background-image: url(' + imgs[curr.index() - 1] + ')" /></div>').appendTo(li.eq(0))
                    curr.index() == count - 1 ?
                        $('<div><span class="with-effect" style="background-image: url(' + imgs[0] + ')" /></div>').appendTo(li.eq(2)) :
                        $('<div><span class="with-effect" style="background-image: url(' + imgs[curr.index() + 1] + ')" /></div>').appendTo(li.eq(2));
                        // li.eq(2).find('span').css('background-image', 'url(' + imgs[0] + ')') :
                        // li.eq(2).find('span').css('background-image', 'url(' + imgs[curr.index() + 1] + ')');
                    carouselPrepTimeout = setTimeout(function() {
                        parent.find('.slider').addClass('went-left');
                        clearTimeout(carouselPrepTimeout);
                        carouselPrepTimeout = null;
                    }, 50)
                }
            } else {
                if (active.index() == count - 1 && curr.index() == 0 && swiping) {
                    parent.find('.slider').addClass('going-left');
                    curr.index() == 0 ?
                        $('<div><span class="with-effect" style="background-image: url(' + imgs[count - 1] + ')" /></div>').appendTo(li.eq(0)) :
                        $('<div><span class="with-effect" style="background-image: url(' + imgs[curr.index() - 1] + ')" /></div>').appendTo(li.eq(0))
                    curr.index() == count - 1 ?
                        $('<div><span class="with-effect" style="background-image: url(' + imgs[0] + ')" /></div>').appendTo(li.eq(2)) :
                        $('<div><span class="with-effect" style="background-image: url(' + imgs[curr.index() + 1] + ')" /></div>').appendTo(li.eq(2));
                        // li.eq(2).find('span').css('background-image', 'url(' + imgs[0] + ')') :
                        // li.eq(2).find('span').css('background-image', 'url(' + imgs[curr.index() + 1] + ')');
                    carouselPrepTimeout = setTimeout(function() {
                        parent.find('.slider').addClass('went-left');
                        clearTimeout(carouselPrepTimeout);
                        carouselPrepTimeout = null;
                    }, 50)
                } else {
                    parent.find('.slider').addClass('going-right');
                    $('<div><span class="with-effect" style="background-image: url(' + imgs[curr.index() + 1] + ')" /></div>').appendTo(li.eq(2))
                    //li.eq(2).find('span').css('background-image', 'url(' + imgs[curr.index() + 1] + ')');
                    curr.index() == 0 ?
                        $('<div><span class="with-effect" style="background-image: url(' + imgs[count - 1] + ')" /></div>').appendTo(li.eq(0)) :
                        $('<div><span class="with-effect" style="background-image: url(' + imgs[curr.index() - 1] + ')" /></div>').appendTo(li.eq(0));
                    carouselPrepTimeout = setTimeout(function() {
                        parent.find('.slider').addClass('went-right');
                        clearTimeout(carouselPrepTimeout);
                        carouselPrepTimeout = null;
                    }, 50)
                }
            }
            curr.addClass('active');
            active.removeClass('active');
            carouselRunning = true;
            var currIndex = curr.parents('.carousel').index('.carousel');
            clearInterval(carouselIntervals[currIndex]);
            sliderIntervals[currIndex] = null;            
            carouselRunningTimeout = setTimeout(function() {
                parent.find('.slider').removeClass('going-left going-right went-left went-right');
                li.find('div:first-child').remove();
                carouselRunning = false;
                swiping = false;
                clearTimeout(carouselRunningTimeout);
                carouselRunningTimeout = null;
            }, 1750)
        }
    })

     $('.carousel .slider').swipe({
        swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
            var curr = $(this);
            swiping = true;
            if (direction == 'left') {
                curr.find('li.active').is(':last-child') ?
                    curr.find('.bullets li:first-child a').trigger('click') :
                    curr.find('li.active').next().children('a').trigger('click');
                var currIndex = curr.parents('.carousel').index('.carousel');
                clearInterval(carouselIntervals[currIndex]);
                sliderIntervals[currIndex] = null;                    
            } else if (direction == 'right') {
                curr.find('li.active').is(':first-child') ?
                    curr.find('.bullets li:last-child a').trigger('click') :
                    curr.find('li.active').prev().children('a').trigger('click');
                var currIndex = curr.parents('.carousel').index('.carousel');
                clearInterval(carouselIntervals[currIndex]);
                sliderIntervals[currIndex] = null;
            }
        }
    });

    $('.carousel .prev').click(function(e) {
        e.preventDefault();
        var curr = $(this).parents('.slider');
        swiping = true;
        curr.find('li.active').is(':first-child') ?
            curr.find('.bullets li:last-child a').trigger('click') :
            curr.find('li.active').prev().children('a').trigger('click');
        var currIndex = curr.parents('.carousel').index('.carousel');
        clearInterval(carouselIntervals[currIndex]);
        sliderIntervals[currIndex] = null;
    })

    $('.carousel .next').click(function(e) {
        e.preventDefault();
        var curr = $(this).parents('.slider');
        swiping = true;
        curr.find('li.active').is(':last-child') ?
            curr.find('.bullets li:first-child a').trigger('click') :
            curr.find('li.active').next().children('a').trigger('click');
        var currIndex = curr.parents('.carousel').index('.carousel');
        clearInterval(carouselIntervals[currIndex]);
        sliderIntervals[currIndex] = null;
    })

    $('.img-slider').each(function() {
        var curr = $(this),
            count = curr.find('.imgs').data('imgs').split(',').length;
        for (var i = 0; i < count; i ++) {
            i == 0 ?
                $('<li class="active"><a href="#">' + i + '</a></li>').appendTo(curr.find('.bullets')) :
                $('<li><a href="#">' + i + '</a></li>').appendTo(curr.find('.bullets'));
        }
        curr.find('.imgs li span').css('background-image', 'url(' + curr.find('.imgs').data('imgs').split(',')[0]);
    })

    // var carouselRunning = false,    
    //     carouselRunningTimeout = null,
    //     carouselPrepTimeout = null;

    $('.img-slider .bullets li a').click(function(e) {
        e.preventDefault();
        var curr = $(this).parent(),
            active = curr.siblings('.active'),
            parent = curr.parents('.img-slider'),
            imgs = parent.find('.imgs').data('imgs').split(','),
            count = imgs.length,
            li = curr.parents('.img-slider').find('.imgs li');
        if (!curr.hasClass('active') && !carouselRunning) {
            //li.eq(1).find('span').css('background-image', 'url(' + imgs[curr.index()] + ')');
            $('<div><span class="with-effect" style="background-image: url(' + imgs[curr.index()] + ')" /></div>').appendTo(li.eq(0))
            if (curr.index() > active.index()) {
                if (curr.index() == count - 1 && active.index() == 0 && swiping) {
                    parent.find('.slider').addClass('going-right');
                    carouselPrepTimeout = setTimeout(function() {
                        parent.find('.slider').addClass('went-right');
                        clearTimeout(carouselPrepTimeout);
                        carouselPrepTimeout = null;
                    }, 50)                
                } else {
                    parent.find('.slider').addClass('going-left');
                    carouselPrepTimeout = setTimeout(function() {
                        parent.find('.slider').addClass('went-left');
                        clearTimeout(carouselPrepTimeout);
                        carouselPrepTimeout = null;
                    }, 50)
                }
            } else {
                if (active.index() == count - 1 && curr.index() == 0 && swiping) {
                    parent.find('.slider').addClass('going-left');
                    carouselPrepTimeout = setTimeout(function() {
                        parent.find('.slider').addClass('went-left');
                        clearTimeout(carouselPrepTimeout);
                        carouselPrepTimeout = null;
                    }, 50)
                } else {
                    parent.find('.slider').addClass('going-right');
                    carouselPrepTimeout = setTimeout(function() {
                        parent.find('.slider').addClass('went-right');
                        clearTimeout(carouselPrepTimeout);
                        carouselPrepTimeout = null;
                    }, 50)
                }
            }
            curr.addClass('active');
            active.removeClass('active');
            carouselRunning = true;
            var currIndex = parent.index('.img-slider');
            clearInterval(sliderIntervals[currIndex]);
            sliderIntervals[currIndex] = null;                                
            carouselRunningTimeout = setTimeout(function() {
                parent.find('.slider').removeClass('going-left going-right went-left went-right');
                li.find('div:first-child').remove();
                carouselRunning = false;
                clearTimeout(carouselRunningTimeout);
                carouselRunningTimeout = null;
            }, 1750)
        }
    })

     $('.img-slider .slider').swipe({
        swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
            var curr = $(this);
            swiping = true;
            if (direction == 'left') {
                curr.find('li.active').is(':last-child') ?
                    curr.find('.bullets li:first-child a').trigger('click') :
                    curr.find('li.active').next().children('a').trigger('click');
                var currIndex = curr.parents('.img-slider').index('.img-slider');
                clearInterval(sliderIntervals[currIndex]);
                sliderIntervals[currIndex] = null;                    
            } else if (direction == 'right') {
                curr.find('li.active').is(':first-child') ?
                    curr.find('.bullets li:last-child a').trigger('click') :
                    curr.find('li.active').prev().children('a').trigger('click');
                var currIndex = curr.parents('.img-slider').index('.img-slider');
                clearInterval(sliderIntervals[currIndex]);
                sliderIntervals[currIndex] = null;                    
            }
        }
    });

    $('.img-slider .prev-next li a').click(function(e) {
        e.preventDefault();
        var curr = $(this),
            currSlider = curr.parents('.slider');
        swiping = true;
        if (curr.parent().hasClass('next')) {
            currSlider.find('li.active').is(':last-child') ?
                currSlider.find('.bullets li:first-child a').trigger('click') :
                currSlider.find('li.active').next().children('a').trigger('click');
        } else {
            currSlider.find('li.active').is(':first-child') ?
                currSlider.find('.bullets li:last-child a').trigger('click') :
                currSlider.find('li.active').prev().children('a').trigger('click');
        }
        var currIndex = curr.parents('.img-slider').index('.img-slider');
        clearInterval(sliderIntervals[currIndex]);
        sliderIntervals[currIndex] = null;
    })

    var sliderIntervals = [];

    $('.img-slider .slider').each(function() {
        var curr = $(this);
        var currInterval = setInterval(function() {
            swiping = true;
            curr.find('li.active').is(':last-child') ?
                curr.find('.bullets li:first-child a').trigger('click') :
                curr.find('li.active').next().children('a').trigger('click');
        }, 7000)
        sliderIntervals.push(currInterval);
    })

    var carouselIntervals = [];

    $('.carousel .slider').each(function() {
        var curr = $(this);
        var currInterval = setInterval(function() {
            swiping = true;
            curr.find('li.active').is(':last-child') ?
                curr.find('.bullets li:first-child a').trigger('click') :
                curr.find('li.active').next().children('a').trigger('click');
        }, 7000)
        carouselIntervals.push(currInterval);
    })

    $('.bgrs-holder section:first-child').addClass('active');

    // NEWS SEARCH
    $('.search-trigger').click(function(){
        setTimeout(function() { 
            $('.search-field').focus();
        }, 200);
        $(this).parents('.news-top-inner').addClass('search-active');
        return false;
    });
    $('.search-close').click(function(){
        $(this).parents('.news-top-inner').removeClass('search-active');
        return false;
    });

    // Scroll to hero
    $('.to-content').click(function(){
        $('html, body').animate({
            scrollTop: $("#content-scroll-to").offset().top
        }, 1000);
    });

    // Video section functionality
    $('.video-outer.local span').click(function() {
        var curr = $(this);
        curr.prev().get(0).play();
        curr.parent().addClass('playing');
    })
    $('.video-outer.external.youtube span').click(function() {
        var curr = $(this);
        curr.parent().addClass('playing');
        $(".external-video iframe")[0].src += "?autoplay=1";
    });
    $('.video-outer.external.vimeo span').click(function() {
        var curr = $(this);
        //curr.parent().addClass('playing');
        curr.fadeOut(1000);
        $(".external-video iframe")[0].src += "&autoplay=1";
    });

    // News filter trigger 
    $('.filter-trigger').click(function(){
        $('.news-content aside').addClass('active');
        $('html').addClass('overlay-active');
        $('html, body').animate({
            scrollTop: $("#news-scroll-indicator").offset().top
        }, 500);
        return false;
    }); 
    $('.close-aside').click(function(){
        $('.news-content aside').removeClass('active');
        $('html').removeClass('overlay-active');
        return false;
    });
    
    // Team popup
    $('.team-popup-trigger').click(function(){
        var itemId = $(this).attr('id');
        $('[data-hash="' + itemId + '"]').addClass('active');
        $('.team-popups-holder').addClass('opened');
        $('html').addClass('overlay-active');
        return false;
    });
    $('.team-popups-holder .exit').click(function(){
        $('.team-popups-holder').removeClass('opened');
        $('.popup-wrapper').removeClass('active');
        $('html').removeClass('overlay-active');
        return false;
    });


    if (all.body.hasClass('page-template-tpl_timeline')) {


    var articleOpened = false;

/*
            + Snap */

                var running = false;

                var section = $('.timeline-holder section'),
                    running = false,
                    runningTimeout = null,
                    prepTimeout = null;

                $('.timeline-holder section').each(function() {
                    var curr = $(this);
                    curr.is(':first-child') ? 
                        curr.show() :
                        curr.hide()
                })

                var animatingTimeout = null,
                    test = null;

                function moving(active, curr) {
                    running = true;
                    activeSection = curr;
                    curr.show();
                    all.body.addClass('switching');
                    if (curr.hasClass('year')) {
                        all.body.addClass('light')
                    } else {
                        all.body.removeClass('light')
                    }
                    curr.find('.sliced').css(all.transitionSetter('none', '', '', '')).css(all.transformSetter('-50%', '-50%', 1, 1));
                    curr.find('.sliced').sliced({ x: 5, y: 4 });
                    setTimeout(function() {
                        curr.find('.sliced').css(all.transitionSetter('', '', '', '')).css(all.transformSetter('', '', '', ''));
                    }, 50)
                    curr.is('.year') ?
                        $('.timeline-bullets').removeClass('dark') :
                        $('.timeline-bullets').addClass('dark');
                    if (curr.index() < 5) {
                        $('.timeline-bullets li').eq(0).addClass('active').siblings().removeClass('active');
                    } else if (curr.index() < 11) {
                        $('.timeline-bullets li').eq(1).addClass('active').siblings().removeClass('active');
                    } else {
                        $('.timeline-bullets li').eq(2).addClass('active').siblings().removeClass('active');
                    }
                    
                    if (curr.index() < 6) {
                        $('.timeline-bullets .progress').css(all.transformSetter('0px', '0px', 1, curr.index() / 10))
                    } else if (curr.index() < 12) {
                        $('.timeline-bullets .progress').css(all.transformSetter('0px', '0px', 1, 0.5 + (curr.index() - 5) / 12))
                    }
                    if (curr.index() > active.index()) {
                        active.find('.holder').each(function() {
                            var curr = $(this);
                            curr.css(all.delaySetter(curr.data('delay-up')));
                        })
                        curr.find('.holder').each(function() {
                            var curr = $(this);
                            curr.css(all.delaySetter(curr.data('delay-anim-up')));
                        })
                        prepTimeout = setTimeout(function() {
                            curr.addClass('active').removeClass('down up');
                            active.addClass('up');
                            for (var i = active.index() + 1; i < curr.index(); i++) {
                                section.eq(i).addClass('up').removeClass('down');
                            }
                            clearTimeout(prepTimeout);
                            prepTimeout = null;
                        }, 50)
                    } else {
                        active.find('.holder').each(function() {
                            var curr = $(this);
                            curr.css(all.delaySetter(curr.data('delay-down')));
                        })
                        curr.find('.holder').each(function() {
                            var curr = $(this);
                            curr.css(all.delaySetter(curr.data('delay-anim-down')));
                        })
                        prepTimeout = setTimeout(function() {
                            curr.addClass('active').removeClass('down up');
                            active.addClass('down');
                            for (var i = section.length - 1; i > curr.index(); i--) {
                                section.eq(i).addClass('down').removeClass('up');
                            }
                            clearTimeout(prepTimeout);
                            prepTimeout = null;
                        }, 50)
                    }


                    var digitPrepTimeout = null,
                        digitAnimTimeout = null;

                    curr.find('h3 span').empty();
                    setTimeout(function() {
                        curr.find('h3 span:nth-child(1)').text(Math.floor(Math.random() * 10) + 1);
                        digitPrepTimeout = setInterval(function() {
                            curr.find('h3 span:nth-child(1)').text(Math.floor(Math.random() * 10));
                        }, 30)
                        digitAnimTimeout = setTimeout(function() {
                            clearInterval(digitPrepTimeout);
                            digitPrepTimeout = null;
                            var test = curr.find('h3 span:nth-child(1)').data('digit');
                            curr.find('h3 span:nth-child(1)').text(test);
                            clearTimeout(digitAnimTimeout);
                            digitAnimTimeout = null;
                            digitPrepTimeout = setInterval(function() {
                                curr.find('h3 span:nth-child(2)').text(Math.floor(Math.random() * 10));
                            }, 30)
                            digitAnimTimeout = setTimeout(function() {
                                clearInterval(digitPrepTimeout);
                                digitPrepTimeout = null;
                                var test = curr.find('h3 span:nth-child(2)').data('digit')
                                curr.find('h3 span:nth-child(2)').text(test);
                                clearTimeout(digitAnimTimeout);
                                digitAnimTimeout = null;
                                digitPrepTimeout = setInterval(function() {
                                    curr.find('h3 span:nth-child(3)').text(Math.floor(Math.random() * 10));
                                }, 30)
                                digitAnimTimeout = setTimeout(function() {
                                    clearInterval(digitPrepTimeout);
                                    digitPrepTimeout = null;
                                    var test = curr.find('h3 span:nth-child(3)').data('digit')
                                    curr.find('h3 span:nth-child(3)').text(test);
                                    clearTimeout(digitAnimTimeout);
                                    digitAnimTimeout = null;
                                    digitPrepTimeout = setInterval(function() {
                                        curr.find('h3 span:nth-child(4)').text(Math.floor(Math.random() * 10));
                                    }, 30)
                                    digitAnimTimeout = setTimeout(function() {
                                        clearInterval(digitPrepTimeout);
                                        digitPrepTimeout = null;
                                        var test = curr.find('h3 span:nth-child(4)').data('digit')
                                        curr.find('h3 span:nth-child(4)').text(test);
                                        clearTimeout(digitAnimTimeout);
                                        digitAnimTimeout = null;
                                    }, 500)    
                                }, 500)                                                            
                            }, 500)                            
                        }, 500)
                    }, 1000)

                    runningTimeout = setTimeout(function() {
                        running = false;
                        active.removeClass('active').hide();
                        all.body.removeClass('switching');
                        clearTimeout(runningTimeout);
                        runningTimeout = null;
                        $('section.year').not(curr).removeClass('down up')
                    }, 2000)
                    
                }

                $(window).on('mousewheel wheel', function(e) {
                    if (!articleOpened) {
                        var activeSection = $('.timeline-holder section.active');
                        if (e.originalEvent.deltaY > 0) {
                            if (activeSection.index() < section.length - 1 && !running) {
                                moving(activeSection, activeSection.next());
                            }
                        } else {
                            if (activeSection.index() > 0 && !running) {
                                moving(activeSection, activeSection.prev());
                            }
                        }
                    }
                })

                all.body.swipe({
                    swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
                        var activeSection = $('.timeline-holder section.active');
                        if (!articleOpened) {
                            if (direction == 'up') {
                                 if (activeSection.index() < section.length - 1 && !running) {
                                    moving(activeSection, activeSection.next());
                                }
                            } else if (direction == 'down') {
                                if (activeSection.index() > 0 && !running) {
                                    moving(activeSection, activeSection.prev());
                                }
                            }
                        }
                    }
                });


                $('.timeline-bullets li').click(function() {
                    var curr = $(this),
                        currIndex = curr.index(),
                        activeSection = $('.timeline-holder section.active'),
                        bullets = curr.parents('.timeline-bullets');
                    if (!bullets.hasClass('expanded') && all.html.hasClass('portrait')) {
                        bullets.addClass('expanded')
                        $('.timeline-holder').addClass('faded');
                    } else {
                        if (!$('.decade').eq(currIndex).hasClass('active')) {
                            moving(activeSection, $('.decade').eq(currIndex));
                            $('.timeline-bullets').removeClass('expanded');
                            $('.timeline-holder').removeClass('faded');
                        }
                    }
                })

                $('.timeline-bullets').click(function(e) {
                    if (!all.html.hasClass('portrait') && !$(e.target).is('li')) {
                        var currPosition =  e.offsetY / $(this).height();
                        if (currPosition < 0.5) {
                            if ($('.timeline-holder section.active').index() != Math.ceil(currPosition * 10))
                                moving($('.timeline-holder section.active'), $('.timeline-holder section').eq(Math.ceil(currPosition * 10)));
                        } else {
                            var currOffset = (Math.ceil(currPosition * 10) - 5) * 0.0166;
                            currPosition += currOffset;
                            if ($('.timeline-holder section.active').index() != Math.ceil(currPosition * 10))
                                moving($('.timeline-holder section.active'), $('.timeline-holder section').eq(Math.ceil(currPosition * 10)));
                        }
                    }
                })

                $('.timeline-holder').click(function(e) {
                    if ($('.timeline-bullets').hasClass('expanded')) {
                        $('.timeline-bullets').removeClass('expanded');
                        $('.timeline-holder').removeClass('faded');
                    }
                })



$('.trigger').click(function(e) {
        e.preventDefault();
        articleOpened = true;
        if (all.html.hasClass('portrait')) {
            var clonedContent = $(this).parent().find('article').clone(true, true);
            $('.content-popup').addClass('opened').find('.content').empty().append(clonedContent);
            all.body.addClass('faded');
        } else {
            $(this).parent().addClass('opened')
        }
    })

    $('.close-btn').click(function(e) {
        e.preventDefault();
        articleOpened = false;
        var curr = $(this);
        if (all.html.hasClass('portrait')) {
            var clonedContent = $(this).parent().find('article').clone(true, true);
            $('.content-popup').addClass('opened').find('.content').empty().append(clonedContent);
            all.body.addClass('faded');
        } else {
            curr.parents('.holder').removeClass('opened')
            setTimeout(function() {
                curr.parents('.holder').find('.content').animate({
                    'scrollTop': 0
                }, 0)
            }, 1000)
        }
    })

    $('.content-popup').click(function(e) {
        var curr = $(this);
        if (!$(e.target).is('article') && !$(e.target).parents('article').length) {
            $('.content-popup').removeClass('opened');
            all.body.removeClass('faded');
            articleOpened = false;
            setTimeout(function() {
                curr.find('.content').animate({
                    'scrollTop': 0
                }, 0)
            }, 1000)
        }
    })

    if (all.html.hasClass('ios') && all.html.hasClass('chrome')) {
        
    } else {
        all.body.addClass('not-ios-chrome');
    }

    $('.timeline-holder .year').each(function() {
        var curr = $(this).find('hgroup h3');
        curr.html(function (i, html) {
            return html.replace(/(\d)/g, '<span data-digit="$1">$1</span>');
        });
    })

    if (all.body.hasClass('page-template-tpl_timeline')) {
        $('body, html').css({
            'position': 'fixed', 
            'left': '0px',
            'top': '0px',
            'width': '100%',
            'height': '100%',
            'overflow': 'hidden' 
        })
    }

    var raf;

    if (typeof raf == 'undefined') scrollingAnimation();

    function scrollingAnimation() {

        all.distanceFromTop = $('.content-popup .content').scrollTop();

        if (Math.abs(all.lastDistanceFromTop - all.distanceFromTop) >= 1) {

            all.lastDistanceFromTop = all.distanceFromTop;

            if ($('.content-popup article').offset().top <= 42) {
                $('.content-popup > .close-btn').addClass('dark');
            } else {
                $('.content-popup > .close-btn').removeClass('dark')
            }

        }

        raf = requestAnimationFrame(scrollingAnimation);

    };

}
