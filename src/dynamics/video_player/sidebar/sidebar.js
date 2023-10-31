Scoped.define("module:VideoPlayer.Dynamics.Sidebar", [
    "dynamics:Dynamic",
    "base:Objs",
    "base:Async",
    "browser:Dom",
    "module:Assets",
    "module:StylesMixin"
], [
    "module:Ads.Dynamics.ChoicesLink",
    "module:Common.Dynamics.Scrollbar",
    "module:Ads.Dynamics.LearnMoreButton",
    "module:Common.Dynamics.CircleProgress"
], function(Class, Objs, Async, DOM, Assets, StylesMixin, scoped) {
    return Class.extend({
            scoped: scoped
        }, [StylesMixin, function(inherited) {
            return {

                template: "<%= template(dirname + '/sidebar.html') %>",

                attrs: {
                    "css": "ba-videoplayer",
                    "csscommon": "ba-commoncss",
                    "cssplayer": "ba-player",
                    "cssadsplayer": "ba-adsplayer",
                    "cssgallerysidebar": "ba-gallery-sidebar",
                    "cssfloatingsidebar": "ba-floating-sidebar",
                    "sidebartitle": null,
                    "bodyelementtouched": false,
                    "bodyelementpadding": 114,
                    "companionadcontent": null,
                    "companionads": [],
                    "is_floating": false,
                    "gallerytitletext": null,
                    "headerlogourl": null,
                    "headerlogoname": null,
                    "afteradsendtext": null,
                    "adchoiceslink": null,
                    playlist: [],
                    showprogress: false,
                    nextindex: 1
                },

                collections: {
                    videos: {}
                },

                create: function() {
                    this.__dyn = this.parent();
                    this.set("headerlogourl", this.get("sidebaroptions.headerlogourl") || null);
                    this.set("headerlogoname", this.get("sidebaroptions.headerlogoname") || "Brand's logo");
                    this.set("gallerytitletext", this.get("sidebaroptions.gallerytitletext") || this.string("up-next"));
                    this.set("afteradsendtext", this.get("sidebaroptions.afteradsendtext") || this.string("continue-on-ads-end"));
                    if (this.get("playlist").length > 0) {
                        Objs.iter(this.get("playlist"), function(pl, index) {
                            this.get("videos").add({
                                index: index,
                                title: pl.title,
                                poster: pl.poster
                            });
                        }, this);
                    }
                    this.__dyn.on("resize", function() {
                        this.__singleElementHeight = null;
                    }, this);
                },

                _afterActivate: function() {
                    if (
                        this.get("floatingoptions.showcompanionad") && this.get("floatingsidebar") ||
                        (this.get("sidebaroptions.showcompanionad") && this.get("floatingsidebar"))
                    ) {
                        if (this.get("companionads") && this.get("companionads").length > 0) {
                            this.__generateCompanionAdContent();
                        } else {
                            this.auto_destroy(this.on("change:companionads", function(companionads) {
                                this.__generateCompanionAdContent(companionads);
                            }, this), this);
                        }
                    }
                    if (this.get("videos").count() > 0) {
                        Async.eventually(function() {
                            this.topIndex();
                        }, this, 300);
                    }
                },

                functions: {
                    play_video: function(index) {
                        this.channel("next").trigger("manualPlayNext", index);
                        this.channel("next").trigger("playNext", index);

                    },
                    on_learn_more_click: function(url) {
                        this.pauseAds();
                    },

                    on_ads_choices_click: function(url) {
                        this.pauseAds();
                    },

                    pause_proggres: function() {

                    },

                    resume_proggres: function() {

                    },

                    stop_proggres: function() {

                    }
                },

                pauseAds: function() {
                    if (this.get("adsplaying")) {
                        this.trigger("pause_ads");
                    }
                },

                topIndex: function(index) {
                    index = index || this.get("nextindex");
                    var element = this.activeElement().querySelector("li[data-index-selector='gallery-item-" + index + "']");
                    if (!this.__singleElementHeight) {
                        this.__singleElementHeight = DOM.elementDimensions(element).height;
                        this.__singleElementWidth = DOM.elementDimensions(element).width;
                    }
                    var container = this.activeElement().querySelector(`.${this.get("cssgallerysidebar")}-list-container`);
                    if (container && container.scrollTo) {
                        container.scrollTo({
                            top: index * this.__singleElementHeight,
                            left: 0,
                            behavior: "smooth",
                        });
                    }
                },

                /**
                 * @param companionads
                 * @private
                 */
                __generateCompanionAdContent: function(companionads) {
                    companionads = companionads || this.get("companionads");
                    if (companionads && companionads.length > 0) {
                        var isMobile = this.get("mobileviewport");
                        if (
                            (this.get("floatingoptions.desktop.companionad") && !isMobile) ||
                            (this.get("floatingoptions.mobile.companionad") && isMobile) ||
                            (this.get("gallerysidebar") && this.get("sidebaroptions.showcompanionad") && !isMobile)
                        ) {
                            var dimensions = DOM.elementDimensions(this.activeElement());
                            var ar, closestIndex, closestAr;
                            ar = dimensions.width / dimensions.height;
                            Objs.iter(companionads, function(companion, index) {
                                var _data = companion.data;
                                var _ar = _data.width / _data.height;
                                var _currentDiff = Math.abs(_ar - ar);
                                if (index === 0 || closestAr > _currentDiff) {
                                    closestAr = _currentDiff;
                                    closestIndex = index;
                                }
                                if (companionads.length === index + 1) {
                                    var companionAd = companionads[closestIndex];
                                    this.set("companionadcontent", companionAd.getContent());
                                    var container = this.activeElement().querySelector("." + this.get("cssfloatingsidebar") + '-companion-container');
                                    if (container) this.__drawCompanionAdToContainer(container, companionAd, dimensions, ar, _ar);
                                }
                            }, this);
                        }
                    }
                },

                __drawCompanionAdToContainer: function(container, companionAd, dimensions, ar, _ar) {
                    container.innerHTML = this.get("companionadcontent");
                    var image = container.querySelector('img');
                    if (image && _ar && dimensions) {
                        _ar = companionAd.data.width / companionAd.data.height;
                        if (_ar < ar) {
                            image.height = dimensions.height;
                            image.width = dimensions.height * (_ar <= 1 ? _ar : companionAd.data.width / companionAd.data.height);
                        } else {
                            image.width = dimensions.width;
                            image.height = dimensions.width * (companionAd.data.height / companionAd.data.width);
                        }
                    }
                },

                __decodeHTML: function(text) {
                    var textArea = document.createElement('textarea');
                    textArea.innerHTML = text;
                    return textArea.value;
                }
            };
        }])
        .register("ba-videoplayer-sidebar")
        .registerFunctions({
            /*<%= template_function_cache(dirname + '/sidebar.html') %>*/
        })
        .attachStringTable(Assets.strings)
        .addStrings({
            "up-next": "Up Next",
            "continue-on-ads-end": "Content will resume after this video..."
        });
});