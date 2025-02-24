Scoped.define("module:Ads.IMA.AdsManager", [
    "base:Class",
    "base:Objs",
    "base:Types",
    "base:Events.EventsMixin"
], function(Class, Objs, Types, EventsMixin, scoped) {
    return Class.extend({
        scoped: scoped
    }, [EventsMixin, function(inherited) {
        return {

            constructor: function(options) {
                inherited.constructor.call(this, options);
                if (!options.adContainer) throw Error("Missing adContainer");
                // IMA SDK: This is an optional parameter but can't be null
                if (options.videoElement === null) throw Error("Missing videoElement");
                this._options = options;

                if (google && google.ima && options.IMASettings) {
                    this._setIMASettings(options);
                }

                this._adDisplayContainer = new google.ima.AdDisplayContainer(options.adContainer, options.videoElement, options.customClickthroughEl || null);
                this._adsLoader = new google.ima.AdsLoader(this._adDisplayContainer);
                this._adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.onAdError.bind(this), false);
                this._adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, this.onAdsManagerLoaded.bind(this), false);
            },

            _setIMASettings: function(options) {
                const settings = options.IMASettings;
                // google.ima.ImaSdkSettings.VpaidMode.DISABLED
                // DISABLED == 0 - VPAID ads will not play, and an error will be returned.
                // ENABLED == 1 - VPAID ads are enabled using a cross-domain iframe
                // INSECURE == 2 - This allows the ad access to the site via JavaScript.
                if (google && google.ima && typeof settings.vpaidMode === "number" && [
                        google.ima.ImaSdkSettings.VpaidMode.DISABLED,
                        google.ima.ImaSdkSettings.VpaidMode.ENABLED,
                        google.ima.ImaSdkSettings.VpaidMode.INSECURE
                    ].includes(settings.vpaidMode))
                    google.ima.settings.setVpaidMode(settings.vpaidMode);
                else
                    google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.INSECURE);

                // boolean: Sets whether VMAP and ad rules ad breaks are automatically played
                if (settings.autoPlayAdBreaks) {
                    google.ima.settings.setAutoPlayAdBreaks(autoPlayAdBreaks);
                }

                // boolean
                if (settings.cookiesEnabled) {
                    google.ima.settings.setCookiesEnabled(settings.cookiesEnabled);
                }

                // boolean: Sets whether to disable custom playback on iOS 10+ browsers. If true, ads will play inline if the content video is inline.
                if (settings.iOS10Plus) {
                    google.ima.settings.setDisableCustomPlaybackForIOS10Plus(true);
                }

                // string: Sets the publisher provided locale. Must be called before creating AdsLoader or AdDisplayContainer.
                if (settings.locale) {
                    google.ima.settings.setLocale(settings.locale);
                }

                // Sets the companion backfill mode. See the various modes available in ImaSdkSettings.CompanionBackfillMode.
                // The default mode is ImaSdkSettings.CompanionBackfillMode.ALWAYS.
                if (settings.companionBackfillMode) {
                    google.ima.settings.setCompanionBackfill(settings.companionBackfillMode);
                }

                // number: Specifies the maximum number of redirects before the subsequent redirects will be denied, and the ad load aborted.
                google.ima.settings.setNumRedirects(10);
            },

            destroy: function() {
                // Prevent error on destroying non triggered adsLoader events.
                if (this._adsLoader) {
                    this._adsLoader.destroy();
                    this._adsLoader = null;
                }
                if (this._adsManager) {
                    this._adsManager.destroy();
                    this._adsManager = null;
                }
                inherited.destroy.call(this);
            },

            /**
             *
             * @param {RequestAdsOptions} requestAdsOptions
             */
            requestAds: function(requestAdsOptions) {
                const {
                    adTagUrl,
                    inlinevastxml,
                    adTagParams,
                    options,
                } = requestAdsOptions;
                // save the current volume to determine if ad should play with sound
                this.volume = requestAdsOptions.volume;
                this._adsRequest = new google.ima.AdsRequest();
                const invalidSettings = [];

                // Put before all other manually applied options, as could be overwritten
                if (Types.is_object_instance(options) && Object.keys(options).length > 0) {
                    for (let key in options) {
                        if (!this._adsRequest.hasOwnProperty(key)) {
                            invalidSettings.push(key);
                            continue;
                        }
                        // grab from IMA enums if it's exists
                        const value = this._grabSettingsFromIMAEnums(key) || options[key];
                        if (Types.is_string(value) || Types.isNumber(value) || Types.is_boolean(value)) {
                            this._adsRequest[key] = value;
                            continue;
                        }
                        if (Types.is_object_instance(value)) {
                            this._adsRequest[key] = {};
                            for (let subKey in value) {
                                const v = this._grabSettingsFromIMAEnums(value[subKey]) || value[subKey];
                                subKey = this._grabSettingsFromIMAEnums(subKey) || subKey;
                                this._adsRequest[key][subKey] = v;
                            }
                            continue;
                        }
                        console.log(`Wrong setting value type was provided for IMA AdsRequest setting: ${key}`);
                    }
                }

                if (invalidSettings.length > 0) {
                    console.warn(`The following settings are not supported by IMA AdsRequest: ${invalidSettings.join(", ")}`);
                }

                if (adTagUrl) {
                    this._adsRequest.adTagUrl = adTagUrl;
                } else if (inlinevastxml) {
                    this._adsRequest.adsResponse = inlinevastxml;
                }

                // if size query param is not on the ad tag url, define them
                if (!adTagParams?.sz) {
                    this._adsRequest.linearAdSlotWidth = requestAdsOptions.linearAdSlotWidth;
                    this._adsRequest.linearAdSlotHeight = requestAdsOptions.linearAdSlotHeight;
                    this._adsRequest.nonLinearAdSlotWidth = requestAdsOptions.nonLinearAdSlotWidth;
                    this._adsRequest.nonLinearAdSlotHeight = requestAdsOptions.nonLinearAdSlotHeight;
                }

                // setAdWillAutoPlay: void. Notifies the SDK and changing this setting will have no impact on ad playback.
                this._adsRequest.setAdWillAutoPlay(requestAdsOptions.adWillAutoPlay);
                this._adsRequest.setAdWillPlayMuted(requestAdsOptions.adWillPlayMuted);
                this._adsRequest.setContinuousPlayback(requestAdsOptions.continuousPlayback);
                this._adsLoader.getSettings().setAutoPlayAdBreaks(requestAdsOptions.autoPlayAdBreaks);
                this._adsLoader.requestAds(this._adsRequest);
            },

            onAdsManagerLoaded: function(adsManagerLoadedEvent) {
                const adsRenderingSettings = new google.ima.AdsRenderingSettings();
                if (this._options && this._options.adsRenderingSettings) {
                    for (let setting in this._options.adsRenderingSettings) {
                        if (setting === "uiElements") {
                            const uiElementSettings = this._options.adsRenderingSettings[setting];
                            // ['adAttribution', 'countdown']
                            const allowedUIElements = [
                                google.ima.UiElements.AD_ATTRIBUTION,
                                google.ima.UiElements.COUNTDOWN
                            ];
                            if (Types.is_array(uiElementSettings)) {
                                var uiElements = uiElementSettings.filter(function(element) {
                                    return allowedUIElements.includes(element);
                                });
                                if (uiElements.length >= 0) {
                                    adsRenderingSettings[setting] = uiElements;
                                }
                            } else {
                                console.log("IMA: uiElements must be an array of allowed UI elements. See https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/reference/js/google.ima#.UiElements for more information.");
                            }
                        } else {
                            adsRenderingSettings[setting] = this._options.adsRenderingSettings[setting];
                        }
                    }
                }
                try {
                    this._adsManager = adsManagerLoadedEvent.getAdsManager(
                        this._options.videoElement, adsRenderingSettings
                    );
                    if (parseInt(this.volume) <= 1) {
                        this._adsManager.setVolume(this.volume);
                    } else if (adsManagerLoadedEvent.getUserRequestContext()) {
                        this._adsManager.setVolume(adsManagerLoadedEvent.getUserRequestContext().options.volume);
                    } else {
                        this._adsManager.setVolume(this._options?.videoElement?.volume || 0);
                    }
                } catch (adError) {
                    if (adError instanceof google.ima.AdError) {
                        this.onAdError(adError);
                    } else {
                        this.onAdError({
                            message: `Getting Ads Manager failed to load with settings: ${JSON.stringify(adsRenderingSettings)}. \n More details: ${JSON.stringify(adError)}`
                        });
                    }
                }
                this.addEventListeners();
                this.__methods().forEach(function(method) {
                    this[method] = this._adsManager[method].bind(this._adsManager);
                }.bind(this));
                this.trigger(adsManagerLoadedEvent.type, adsManagerLoadedEvent);
            },

            onAdEvent: function(event) {
                this.trigger(event.type, event);
            },

            onAdError: function(event) {
                let message = event.message || event.errorMessage || event;
                if (event.getError) {
                    const error = event.getError();
                    if (error) {
                        message = error.getMessage() + ' Code: ' + error.getErrorCode();
                    }
                }
                this.trigger('ad-error', message, event);
            },

            addEventListeners: function() {
                Objs.iter(this.__events(), function(eventType) {
                    this._adsManager.addEventListener(eventType, function(event) {
                        if (event.type === google.ima.AdErrorEvent.Type.AD_ERROR) return this.onAdError(event);
                        return this.onAdEvent(event);
                    }, false, this);
                }, this);
            },

            contentComplete: function() {
                // This will allow the SDK to play post-roll ads, if any are loaded through ad rules.
                if (this._adsLoader) this._adsLoader.contentComplete();
            },

            reset: function() {
                if (this._adsManager) this._adsManager.destroy();
            },

            start: function(options) {
                if (!this._adsManager) {
                    return this.once("adsManagerLoaded", function() {
                        this.start(options);
                    }, this);
                }
                try {
                    this._adDisplayContainer.initialize();
                    this._adsManager.init(options.width, options.height, google.ima.ViewMode.NORMAL);
                    this._adsManager.setVolume(options.volume);
                    if (options.adWillAutoPlay) {
                        this._adsManager.start();
                    }
                } catch (e) {
                    this.onAdError(e);
                    throw e;
                }
            },

            playLoadedAd: function(options) {
                if (!this._adsManager) {
                    options = options || {};
                    console.warn(`Before calling startLoaded, you must wait for the adsManagerLoaded event.`);
                    this.start({
                        ...options,
                        adWillAutoPlay: true
                    });
                    return;
                }
                this._adsManager.start();
            },

            adDisplayContainerInitialized: function() {
                return !!this.__adDisplayContainerInitialized;
            },

            initializeAdDisplayContainer: function() {
                if (this.__adDisplayContainerInitialized) return;
                this._adDisplayContainer.initialize();
                this.__adDisplayContainerInitialized = true;
            },

            _grabSettingsFromIMAEnums: function(key) {
                if (Types.is_string(key) && google.ima) {
                    const value = key.split('.').reduce((o, i) => o[i], google.ima);
                    return value || null;
                }
                return null;
            },

            __methods: function() {
                return [
                    "collapse",
                    "discardAdBreak",
                    "focus",
                    "getAdSkippableState",
                    "getCuePoints",
                    "getCurrentAd",
                    "getRemainingTime",
                    "getVolume",
                    "isCustomClickTrackingUsed",
                    "isCustomPlaybackUsed",
                    "pause",
                    "resize",
                    "resume",
                    "setVolume",
                    "skip",
                    "stop",
                    "updateAdsRenderingSettings"
                ];
            },

            __events: function() {
                return [
                    google.ima.AdErrorEvent.Type.AD_ERROR, // adError
                    google.ima.AdEvent.Type.AD_CAN_PLAY, // adCanPlay
                    google.ima.AdEvent.Type.IMPRESSION, // impression
                    google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, // contentPauseRequested
                    google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, // contentResumeRequested
                    google.ima.AdEvent.Type.LOADED, // loaded
                    google.ima.AdEvent.Type.STARTED, // start
                    google.ima.AdEvent.Type.FIRST_QUARTILE, // firstQuartile
                    google.ima.AdEvent.Type.MIDPOINT, // midpoint
                    google.ima.AdEvent.Type.THIRD_QUARTILE, // thirdQuartile
                    google.ima.AdEvent.Type.COMPLETE, // complete
                    google.ima.AdEvent.Type.ALL_ADS_COMPLETED, // allAdsCompleted
                    google.ima.AdEvent.Type.PAUSED, // pause
                    google.ima.AdEvent.Type.RESUMED, // resume
                    google.ima.AdEvent.Type.CLICK, // click
                    google.ima.AdEvent.Type.VIDEO_CLICKED, // videoClicked
                    google.ima.AdEvent.Type.AD_PROGRESS, // adProgress
                    google.ima.AdEvent.Type.DURATION_CHANGE, // durationChange
                    google.ima.AdEvent.Type.SKIPPED, // skip
                    google.ima.AdEvent.Type.LINEAR_CHANGED, // linearChanged
                    google.ima.AdEvent.Type.VOLUME_CHANGED, // volumeChange
                    google.ima.AdEvent.Type.VOLUME_MUTED, // mute
                    google.ima.AdEvent.Type.SKIPPABLE_STATE_CHANGED, // skippableStateChanged
                    google.ima.AdEvent.Type.INTERACTION, // interaction
                    google.ima.AdEvent.Type.USER_CLOSE, // userClose
                    google.ima.AdEvent.Type.VIDEO_ICON_CLICKED, // videoIconClicked
                    google.ima.AdEvent.Type.AD_BUFFERING, // adBuffering
                    google.ima.AdEvent.Type.AD_METADATA, // adMetadata
                    google.ima.AdEvent.Type.AD_BREAK_READY, // adBreakReady
                    google.ima.AdEvent.Type.LOG, // log
                ];
            }
        };
    }]);
});