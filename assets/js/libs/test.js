;(function(window) {

    'use strict';

    function extend( a, b ) {
        for( var key in b ) { 
            if( b.hasOwnProperty( key ) ) {
                a[key] = b[key];
            }
        }
        return a;
    }

    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    function createRandIntOrderedArray(minVal, maxVal, size) {
        var arr = [];
        for(var i=0; i<size; ++i) {
            arr.push(anime.random(minVal, maxVal));
        }
        arr.sort(function(a, b){ return a-b });
        return arr;
    }

    function isObjEmpty(obj) {
        return Object.getOwnPropertyNames(obj).length > 0;
    }

    function collect() {
        var ret = {};
        var len = arguments.length;
        for (var i=0; i<len; i++) {
            for (var p in arguments[i]) {
                if (arguments[i].hasOwnProperty(p)) {
                    ret[p] = arguments[i][p];
                }
            }
        }
        return ret;
    }

    function areClipPathShapesSupported() {
        var base = 'clipPath',
            prefixes = [ 'webkit', 'moz', 'ms', 'o' ],
            properties = [ base ],
            testElement = document.createElement( 'testelement' ),
            attribute = 'polygon(50% 0%, 0% 100%, 100% 100%)';

        for ( var i = 0, l = prefixes.length; i < l; i++ ) {
            var prefixedProperty = prefixes[i] + base.charAt( 0 ).toUpperCase() + base.slice( 1 );
            properties.push( prefixedProperty );
        }

        for ( var i = 0, l = properties.length; i < l; i++ ) {
            var property = properties[i];

            if ( testElement.style[property] === '' ) {

                testElement.style[property] = attribute;
                if ( testElement.style[property] !== '' ) {
                    return true;
                }
            }
        }
        return false;
    };

    function Segmenter(el, options) {
        this.el = el;
        this.options = extend({}, this.options);
        extend(this.options, options);
        var self = this;
        imagesLoaded(this.el, { background: true }, function() {
            self._init();
            self._initEvents();
            self.options.onReady();
        });
    }

    Segmenter.prototype.options = {
        pieces: 16, 
        renderOnLoad: false,
        shadows: true,
        shadowsAnimation: {
            opacity: 1,
            // translateX: 20,
            // translateY: 20
        },
        parallax: true,
        parallaxMovement: {min: 10, max: 40},
        animation: {
            duration: 1500,
            easing: 'easeOutQuad',
            delay: 250,
            opacity: {min: 0.5, max: 1},
            //translateZ: {min: 0, max: 0},
            // translateX: {min: -100, max: 100},
            // translateY: {min: -100, max: 100}
        },
        onReady: function() { return false; },
        onAnimationComplete: function() { return false; },
        onAnimationStart: function() { return false; },
        positions: [
            {top: 0, left: 0, width: 25, height: 25},
            {top: 0, left: 25, width: 25, height: 25},
            {top: 0, left: 50, width: 25, height: 25},
            {top: 0, left: 75, width: 25, height: 25},
            {top: 25, left: 0, width: 25, height: 25},
            {top: 25, left: 25, width: 25, height: 25},
            {top: 25, left: 50, width: 25, height: 25},
            {top: 25, left: 75, width: 25, height: 25},
            {top: 50, left: 0, width: 25, height: 25},
            {top: 50, left: 25, width: 25, height: 25},
            {top: 50, left: 50, width: 25, height: 25},
            {top: 50, left: 75, width: 25, height: 25},
            {top: 75, left: 0, width: 25, height: 25},
            {top: 75, left: 25, width: 25, height: 25},
            {top: 75, left: 50, width: 25, height: 25},
            {top: 75, left: 75, width: 25, height: 25},
        ]
    };

    Segmenter.prototype._init = function() {

        this.dimensions = {
            width: this.el.offsetWidth,
            height: this.el.offsetHeight
        };
        
        var background = this.el.style.backgroundImage;
        this.imgsrc = background.replace('url(','').replace(')','').replace(/\"/gi, "");;
        
        this._layout();

        var self = this;
        this.pieces = [].slice.call(this.el.querySelectorAll('.segmenter-piece-wrap'));
        this.pieces.forEach(function(piece, pos) {
            piece.style.WebkitTransform = piece.style.transform = 'translateZ(0.0001px)';

            if( self.options.renderOnLoad ) {
                self._renderPiece(piece);
            }
        });
        if( this.options.renderOnLoad ) {
            this.active = true;
        }
    };

    Segmenter.prototype._layout = function() {

        var clipPath = areClipPathShapesSupported();

        var segBgEl = document.createElement('div');
        segBgEl.className = 'segmenter-background';
        segBgEl.style.backgroundImage = 'url(' + this.imgsrc + ')';

        var segPieces = document.createElement('div'),
            segPiecesHTML = '',
            positionsTotal = this.options.positions.length;

        segPieces.className = 'segmenter-pieces';

        for(var i = 0, len = this.options.pieces; i < len; ++i) {
            if( this.options.parallax ) {
                segPiecesHTML += '<div class="segmenter-piece-parallax">';
            }

            segPiecesHTML += '<div class="segmenter-piece-wrap">';
            
            var top, left, width, height, clipTop, clipLeft, clipRight, clipBottom,
                pos = i <= positionsTotal - 1 ? i : 0,
                isRandom = this.options.positions === 'random';

            top = isRandom ? anime.random(0,100) : this.options.positions[pos].top;
            left = isRandom ? anime.random(0,100) : this.options.positions[pos].left;
            width = isRandom ? anime.random(0,100) : this.options.positions[pos].width;
            height = isRandom ? anime.random(0,100) : this.options.positions[pos].height;
            
            if( !clipPath ) {
                clipTop = isRandom ? top/100 * this.dimensions.height : this.options.positions[pos].top/100 * this.dimensions.height;
                clipLeft = isRandom ? left/100 * this.dimensions.width : this.options.positions[pos].left/100 * this.dimensions.width;
                clipRight = isRandom ? width/100 * this.dimensions.width + clipLeft : this.options.positions[pos].width/100 * this.dimensions.width + clipLeft;
                clipBottom = isRandom ? height/100 * this.dimensions.height + clipTop : this.options.positions[pos].height/100 * this.dimensions.height + clipTop;
            }

            if( this.options.shadows ) {
                segPiecesHTML += '<div class="segmenter-shadow" style="top: ' + top + '%; left: ' + left + '%; width: ' + width + '%; height: ' + height + '%"></div>';        
            }

            segPiecesHTML += clipPath ?
                            '<div class="segmenter-piece" style="background-image: url(' + this.imgsrc + '); -webkit-clip-path: polygon(' + left + '% ' + top + '%, ' + (left + width) + '% ' + top + '%, ' + (left + width) + '% ' + (top + height) + '%, ' + left + '% ' + (top + height) + '%); clip-path: polygon(' + left + '% ' + top + '%, ' + (left + width) + '% ' + top + '%, ' + (left + width) + '% ' + (top + height) + '%, ' + left + '% ' + (top + height) + '%)"></div>' :
                            '<div class="segmenter-piece" style="background-image: url(' + this.imgsrc + '); clip: rect(' + clipTop + 'px,' + clipRight + 'px,' + clipBottom + 'px,' + clipLeft + 'px)"></div>';

            segPiecesHTML += '</div>'
            if( this.options.parallax ) {
                segPiecesHTML += '</div>';
            }
        }
        segPieces.innerHTML = segPiecesHTML;

        this.el.innerHTML = '';
        this.el.appendChild(segBgEl);
        this.el.appendChild(segPieces);
    };

    Segmenter.prototype._renderPiece = function(piece) {
        var idx = this.pieces.indexOf(piece);

        if( self.options.animation.translateZ != undefined ) {
            if( typeof self.options.animation.translateZ === 'object' ) {
                var randArr = createRandIntOrderedArray(self.options.animation.translateZ.min, self.options.animation.translateZ.max, self.options.pieces);
                piece.style.transform = piece.style.WebkitTransform = 'translateZ(' + randArr[idx] + 'px)';
            }
            else {
                piece.style.transform = piece.style.WebkitTransform = 'translateZ(' + self.options.animation.translateZ + 'px)';
            }
        }
        if( self.options.animation.translateY != undefined ) {
            if( typeof self.options.animation.translateY === 'object' ) {
                var randArr = createRandIntOrderedArray(self.options.animation.translateY.min, self.options.animation.translateY.max, self.options.pieces);
                piece.style.transform = piece.style.WebkitTransform = 'translateY(' + randArr[idx] + 'px)';
            }
            else {
                piece.style.transform = piece.style.WebkitTransform = 'translateY(' + self.options.animation.translateY + 'px)';
            }
        }
        if( self.options.animation.translateX != undefined ) {
            if( typeof self.options.animation.translateX === 'object' ) {
                var randArr = createRandIntOrderedArray(self.options.animation.translateX.min, self.options.animation.translateX.max, self.options.pieces);
                piece.style.transform = piece.style.WebkitTransform = 'translateX(' + randArr[idx] + 'px)';
            }
            else {
                piece.style.transform = piece.style.WebkitTransform = 'translateX(' + self.options.animation.translateX + 'px)';
            }
        }
        if( self.options.animation.opacity != undefined ) {
            piece.style.opacity = self.options.animation.opacity;
        }

        if( self.options.shadows && isObjEmpty(self.options.shadowsAnimation) ) {
            var shadowEl = piece.querySelector('.segmenter-shadow');
            shadowEl.style.opacity = self.options.shadowsAnimation.opacity != undefined ? self.options.shadowsAnimation.opacity : 0;
            shadowEl.style.transform = shadowEl.style.WebkitTransform = 'translateX(' + (self.options.shadowsAnimation.translateX != undefined ? self.options.shadowsAnimation.translateX : 0) + 'px) translateY(' + (self.options.shadowsAnimation.translateY != undefined ? self.options.shadowsAnimation.translateY : 0) + 'px)';
        }
    };

    Segmenter.prototype.animate = function() {
        // if( this.active ) {
        //     return false;
        // }

        this.active = true;

        var self = this,
            animProps = {
                targets: this.pieces,
                duration: this.options.animation.duration,
                delay: function(el, index) { return (self.options.pieces - index - 1) * self.options.animation.delay; },
                easing: this.options.animation.easing,
                begin: this.options.onAnimationStart,
                complete: this.options.onAnimationComplete
            };
        
        if( this.options.animation.translateZ != undefined ) {
            var randArr = createRandIntOrderedArray(this.options.animation.translateZ.min, this.options.animation.translateZ.max, this.options.pieces);
            animProps.translateZ = typeof this.options.animation.translateZ === 'object' ? function(el, index) {
                return randArr[index];
            } : this.options.animation.translateZ;
        }
        if( this.options.animation.translateX != undefined ) {
            animProps.translateX = typeof this.options.animation.translateX === 'object' ? function(el, index) {
                return anime.random(self.options.animation.translateX.min, self.options.animation.translateX.max);
            } : this.options.animation.translateX;
        }
        self.pieces.forEach(function(piece) {
            piece.style.transform = piece.style.WebkitTransform = 'translateY(100vh)';
        })
        if( this.options.animation.translateY != undefined ) {
            animProps.translateY = typeof this.options.animation.translateY === 'object' ? function(el, index) {
                return anime.random(self.options.animation.translateY.min, self.options.animation.translateY.max);
            } : this.options.animation.translateY;
        }
        if( this.options.animation.opacity != undefined ) {
            var randArr = []; //= createRandIntOrderedArray(this.options.animation.opacity.min, this.options.animation.opacity.max, this.options.pieces);
            if ($(this.el).hasClass('segmenter')) {
                for(var i = 0; i < this.options.pieces; i++) {
                    switch(i) {
                        case 0:
                            randArr[i] = 0.5;
                            break;
                        case 1:
                            randArr[i] = 0.6;
                            break;
                        case 2:
                            randArr[i] = 0.7;
                            break;
                        case 4:
                            randArr[i] = 0.8;
                            break;
                        case 5:
                            randArr[i] = 0.6;
                            break;
                        case 6:
                            randArr[i] = 0.8;
                            break;
                        case 8:
                            randArr[i] = 0.7;
                            break;
                        case 9:
                            randArr[i] = 0.7;
                            break;
                        case 10:
                            randArr[i] = 0.7;
                            break;
                        case 13:
                            randArr[i] = 0.7;
                            break;
                        default:
                            randArr[i] = 1;
                            break;
                    }
                    //randArr[i] = Math.random() + 0.25;
                }
            } else {
                for(var i = 0; i < this.options.pieces; i++) {
                    switch(i) {
                        case 0:
                            randArr[i] = 0.5;
                            break;
                        case 1:
                            randArr[i] = 0.6;
                            break;
                        case 2:
                            randArr[i] = 0.7;
                            break;
                        case 4:
                            randArr[i] = 0.8;
                            break;
                        case 5:
                            randArr[i] = 0.6;
                            break;
                        case 6:
                            randArr[i] = 0.8;
                            break;
                        case 8:
                            randArr[i] = 0.7;
                            break;
                        case 9:
                            randArr[i] = 0.7;
                            break;
                        case 10:
                            randArr[i] = 0.7;
                            break;
                        case 13:
                            randArr[i] = 0.7;
                            break;
                        default:
                            randArr[i] = 1;
                            break;
                    }
                    //randArr[i] = Math.random() + 0.25;
                }
            }
            animProps.opacity = function(el, index) { 
                return randArr[index];
            }
            //console.log(animProps.opacity)
        }

        anime(animProps);

        if( this.options.shadows && isObjEmpty(this.options.shadowsAnimation) ) {
            anime(collect({
                targets: this.el.querySelectorAll('.segmenter-shadow'),
                duration: this.options.animation.duration,
                delay: function(el, index) { return (self.options.pieces - index - 1) * self.options.animation.delay; },
                easing: this.options.animation.easing
            }, this.options.shadowsAnimation));
        }
    };

    Segmenter.prototype.reset = function() {
        //console.log(this.pieces);
        this.pieces.forEach(function(piece) {
            piece.style.opacity = 0;
        });
    };

    Segmenter.prototype._initEvents = function() {
        var self = this;
        this.debounceResize = debounce(function(ev) {
            var positionsTotal = self.options.positions.length;

            self.dimensions = {
                width: self.el.offsetWidth,
                height: self.el.offsetHeight
            };

            self.pieces.forEach(function(piece, position) {
                var clipTop, clipLeft, clipRight, clipBottom,
                    segmenterPiece = piece.querySelector('.segmenter-piece');

                if( self.options.positions === 'random' ) {
                    var randT = anime.random(0,100), randL = anime.random(0,100), randW = anime.random(0,100), randH = anime.random(0,100);
                    clipTop = randT/100 * self.dimensions.height;
                    clipLeft = randL/100 * self.dimensions.width;
                    clipRight = randW/100 * self.dimensions.width + clipLeft;
                    clipBottom = randH/100 * self.dimensions.height + clipTop;
                }
                else {
                    var pos = position <= positionsTotal - 1 ? position : 0;
                    clipTop = self.options.positions[pos].top/100 * self.dimensions.height;
                    clipLeft = self.options.positions[pos].left/100 * self.dimensions.width;
                    clipRight = self.options.positions[pos].width/100 * self.dimensions.width + clipLeft;
                    clipBottom = self.options.positions[pos].height/100 * self.dimensions.height + clipTop;
                }

                segmenterPiece.style.clip = 'rect(' + clipTop + 'px,' + clipRight + 'px,' + clipBottom + 'px,' + clipLeft + 'px)';
            });
        }, 10);
        window.addEventListener('resize', this.debounceResize);
        
        if( this.options.parallax ) {
            var arrRand = createRandIntOrderedArray(this.options.parallaxMovement.min, this.options.parallaxMovement.max, this.options.pieces);
            this.pieces.forEach(function(piece, pos) {
                piece.setAttribute('data-parallax-translation', typeof self.options.parallaxMovement === 'object' ? arrRand[pos] : self.options.parallaxMovement );
            });
            this.mousemove = function(ev) {
                if( !self.active ) {
                    return false;
                }
                requestAnimationFrame(function() {
                    self.pieces.forEach(function(piece) {
                        var t = piece.getAttribute('data-parallax-translation'),
                            transX = t/(self.dimensions.width)*ev.clientX - t/2,
                            transY = t/(self.dimensions.height)*ev.clientY - t/2;
                         piece.parentNode.style.transform = piece.parentNode.style.WebkitTransform = 'translate3d(' + transX + 'px,' + transY + 'px,0)';
                    });
                });
            };
            window.addEventListener('mousemove', this.mousemove);

            this.handleOrientation = function() {
                if( !self.active ) {
                    return false;
                }
                var y = event.gamma;
                y += 90;
                
                requestAnimationFrame(function() {
                    self.pieces.forEach(function(piece) {
                        var t = piece.getAttribute('data-parallax-translation'),
                            transX = t/(self.dimensions.width)*y - t/2,
                            transY = t/(self.dimensions.height)*y - t/2;

                        piece.parentNode.style.transform = piece.parentNode.style.WebkitTransform = 'translate3d(' + transX + 'px,' + transY + 'px,0)';
                    });
                });
            }
            window.addEventListener('deviceorientation', this.handleOrientation);
        }
    };

    window.Segmenter = Segmenter;

})(window);