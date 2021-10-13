/*
= PRELOADING
------------------------------------------------------------------------------------- */                   

	(function($) {

		var defaults = {
			preloadSelector: true,
			truePercentage: false,
			disableOverlay: false,
			showInContainer: false,
			hideBackground: false,
			hideNonImageElements: false,
			progressiveReveal: false,
			forceSequentialLoad: false,
			silentMode: false,
			debugMode: false,
			useOpacity: true,
			hidePercentage: true,
			loaderText: '',
			animateDuration: 0,
			fadeOutDuration: 500,
			showImagesBeforeComplete: true,
			afterEach: function() {},
			beforeComplete: function() {},
			onComplete: function() {}
		};

		var methods = {
			init: function(options) {
				var settings = $.extend({}, defaults, options);

				return this.each(function() {
					var parent = $(this),
						elementChildren = getAllChildren(parent),
						imageElements = [],
						nonImageElements = [],
						imagesLoaded = 0,
						totalImages = 0,
						progressPercentage = 0,
						totalPercentage = 0,
						count = 0,
						minUpdateToValue = 0;

					var preloadContainer = $('.loading-holder');

					if (!settings.showInContainer) {
						preloadContainer.css('position', 'fixed');
					} else {
						parent.css('position', 'relative');
						preloadContainer.css('position', 'absolute');
					}


					// if (!settings.hidePercentage) {
					// 	var progressNotification = $('<div class="progress-notification">' + settings.loaderText + ' <span class="progress-percentage">' + progressPercentage + '</span>%</div>').appendTo('.loading-bottom');
					// } else {
					// 	var progressNotification = $('<div class="progress-notification">' + settings.loaderText + '</div>').appendTo('.loading-bottom');
					// }

					var progressBar = $('<div class="progress-bar"></div>').appendTo(preloadContainer),
						progressLoaded = $('<div class="progress-loaded"></div>').appendTo(progressBar);

					if (settings.silentMode) {
						preloadContainer.hide();
					}

					if (settings.truePercentage) {
						updateProgressbar(1, 3000); 
					}

					if (settings.debugMode) {
						var startTime = (new Date).getTime();
						console.groupCollapsed('preloading > ', parent);
						console.log((((new Date).getTime() - startTime) / 1000).toFixed(3) + ': scanning DOM for image elements...');
						console.groupCollapsed('image elements');
					}

					elementChildren.forEach(function(child) {
						if (child.is('img') || child.css('background-image') !== 'none' && child.css('background-image').indexOf('gradient') == -1) {
							if (!(settings.preloadSelector && settings.showInContainer && child === parent)) {
								if (!settings.useOpacity) {
									child.hide();
								} else {
									//child.css('opacity', '0');
								}
							} else if (settings.hideBackground) {
								child.attr('data-bg', child.css('background-image')).css('background-image', 'none');
							}

							var imageElement = {
								node: child,
								fileSize : 0
							};

							if (settings.debugMode) {
								console.log(imageElement.node);
							}

							imageElements.push(imageElement);
							totalImages++;
						} else if (settings.hideNonImageElements) {
							if (!settings.useOpacity) {
								child.hide();
							} else {
								//child.css('opacity', '0');
							}

							nonImageElements.push(child);
						}
					});

					if (settings.debugMode) {
						console.groupEnd();
						console.log((((new Date).getTime() - startTime) / 1000).toFixed(3) + ': scanning DOM for image elements DONE');
					}

					if (settings.truePercentage) {
						if (settings.debugMode) {
							console.log((((new Date).getTime() - startTime) / 1000).toFixed(3) + ': getting image sizes...');
							console.groupCollapsed('image sizes');
						}

						imageElements.forEach(function(element) {
							$.ajax({
								type: 'HEAD',
								cache: false,
								url: getImageUrl(element.node),
								success: function(response, message, object) {
									element.fileSize = parseInt(object.getResponseHeader('Content-Length'));
									totalPercentage += element.fileSize;

									if (settings.debugMode) {
										console.log((element.fileSize / 1000).toFixed(2) + ' KB \t' + (totalPercentage / 1000).toFixed(2) + ' KB total');
									}

									continueCounting();
								},
								error: function(object, response, message) {
									continueCounting();
									progressBar.addClass('error');
									settings.fadeOutDuration = 500;

								}
							});

							function continueCounting() {
								count++;

								if (count === totalImages) {
									if (settings.debugMode) {
										console.groupEnd();
										console.log((((new Date).getTime() - startTime) / 1000).toFixed(3) + ': getting image sizes DONE');
									}
									startPreloading();
								}
							}
						});
					} else {
						if (settings.debugMode) {
							console.log((((new Date).getTime() - startTime) / 1000).toFixed(3) + ': getting image sizes SKIPPED');
						}

						totalPercentage = totalImages;
						startPreloading();
					}

					function startPreloading() {

						if (settings.debugMode) {
							console.log((((new Date).getTime() - startTime) / 1000).toFixed(3) + ': preloading image elements...');
							console.groupCollapsed('intervals');
						}

						if (!settings.forceSequentialLoad) {
							if (!totalImages) {
								settings.beforeComplete.call(this);
								preloadContainer.animate({'opacity':'0'}, settings.fadeOutDuration, function() {
									preloadContainer.remove();
									settings.onComplete.call(this);
								});							
							} else {
								imageElements.forEach(function(element, index) {
									var img = $('<img>').attr('src', getImageUrl(element.node));
		
									img.load(function() {
										updateLoader(element);
									}).error(function() {
										updateLoader(element);
										handleLoadingError(img, element);
									});
								});
							};
						} else {
							(function loadImage(index) {

								var currentElement = imageElements[index],
									img = $('<img>').attr('src', getImageUrl(currentElement.node));

								img.load(function() {
									updateLoader(currentElement);

									if (++index < imageElements.length) {
										loadImage(index);
									}
								}).error(function() {
									updateLoader(currentElement);

									if (++index < imageElements.length) {
										loadImage(index);
									}
									
									handleLoadingError(img, currentElement);
								});

							})(0);
						}

					}

					function handleLoadingError(image, element) {

						element.node.addClass('preloader-not-found-error');

					}

					function updateLoader(element) {

						imagesLoaded++;
						updateProgressPercentage(element);
						updateProgressbar(progressPercentage, undefined, element);

						if (settings.progressiveReveal) {
							revealElement(element.node);
						}

						settings.afterEach.call(element.node);
						
					}

					function updateProgressPercentage(element) {

						if (settings.truePercentage) {
							progressPercentage += (element.fileSize / totalPercentage) * 100;

							if (imagesLoaded === totalImages) {
								progressPercentage = 100;
							}
						} else {
							progressPercentage = (imagesLoaded / totalPercentage) * 100;
						}

					}

					function updateProgressbar(value, updateDuration, element) {

						updateDuration = updateDuration !== undefined ? updateDuration : settings.animateDuration;

						var totalWidth = 0,
							updateTo = value,
							remaining = 0;

						if (updateDuration === undefined && settings.debugMode) {
							console.log((((new Date).getTime() - startTime) / 1000).toFixed(3) + ': ' + value.toFixed(2) + '%');
						}

						if (value < 100) {
							if (element !== undefined) {
								if (element.round === undefined) {
									element.round = 0;

									updateTo = value / 4 * 3;
									remaining = value / 4;
								} else {
									element.round++;

									updateTo = value / (4 + element.round) * (3 + element.round);
									remaining = value / (4 + element.round);
									updateDuration = 200;
								}
							}
						}

						if (element === undefined) {
							element = {};
						}

						if (element.round === undefined) {
							element.round = 0;
						}

						if (updateTo > minUpdateToValue) {
							minUpdateToValue = updateTo;
						}

						if (updateTo < minUpdateToValue) {
							updateTo = minUpdateToValue;
						}

						progressLoaded.stop();

						if (element.round < 30) {
							progressLoaded.animate({'width': updateTo + '%'}, {
								duration: updateDuration,
								easing: 'linear',
								step: function() {

									totalWidth = progressBar.width();

									//progressNotification.children('span').html(Math.round((progressLoaded.width() / totalWidth) * 100));

								},
								complete: function() {

									//progressNotification.children('span').html(Math.round(updateTo));

									if (imagesLoaded === totalImages) {
										if (settings.debugMode) {
											console.groupEnd();
											console.log((((new Date).getTime() - startTime) / 1000).toFixed(3) + ': preloading image elements DONE');
											console.groupEnd();
										}

										progressLoaded.delay(100).queue(function() {
											if (settings.showImagesBeforeComplete) {
												imageElements.forEach(function(element) {
													revealElement(element.node);
												});

												nonImageElements.forEach(function(element) {
													revealElement(element);
												});

												settings.beforeComplete.call(this);

												preloadContainer.animate({
													'opacity': '0'
												}, settings.fadeOutDuration, function() {

													preloadContainer.remove();
													settings.onComplete.call(this);

												});

											} else {
												settings.beforeComplete.call(this);

												preloadContainer.animate({'opacity':'0'}, settings.fadeOutDuration, function() {
													imageElements.forEach(function(element) {
														revealElement(element.node);
													});

													nonImageElements.forEach(function(element) {
														revealElement(element);
													});

													preloadContainer.remove();
													settings.onComplete.call(this);
												});
											}
										});
									} else {
										updateProgressbar(value, updateDuration, element);
									}
									
								}
							});
						}
					}

					function getAllChildren(selector) {

						var selectorChildren = [];

						if (selector.children().length > 0) {
							if (settings.preloadSelector) {
								selectorChildren.push(selector);
							}

							getChildren(selector);
						} else if (settings.preloadSelector) {
							selectorChildren.push(selector);
						}

						function getChildren(element) {

							var children = element.children();

							if (children.length > 0) {
								children.each(function() {
									var _this = $(this);

									selectorChildren.push(_this);

									if (_this.children().length > 0) {
										getChildren(_this);
									}
								});
							}
						}

						return selectorChildren;
					}

					function getImageUrl(image) {

						if (image.css('background-image') !== 'none') {
							return image.css('background-image').replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
						} else if (image.css('background-image') === 'none' && image.attr('data-bg')) {
							return image.attr('data-bg').replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
						} else {
							return image.attr('src');
						}

					}

					function revealElement(element) {

						if (!settings.useOpacity) {
							element.show();
						} else {
							//element.css('opacity', '1');
						}
						if (element.attr('data-bg')) {
							element.css('background-image', element.attr('data-bg'));
						}

					}
				});
			}
		};

		if (!('forEach' in Array.prototype)) {
			Array.prototype.forEach = function(action, that /*opt*/) {
				for (var i = 0, n = this.length; i < n; i++) {
					if (i in this) {
						action.call(that, this[i], i, this);
					}
				}
			};
		}

		$.fn.preloading = function(method) {
			if (methods[method]) {
				return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
			} else if (typeof method === 'object' || !method) {
				return methods.init.apply(this, arguments);
			} else {
				$.error('Method ' +  method + ' does not exist');
			}
		};
	})(jQuery);