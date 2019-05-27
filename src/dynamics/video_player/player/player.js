Scoped.define("module:VideoPlayer.Dynamics.Player", [
    "dynamics:Dynamic",
    "module:Assets",
    "module:TrackTags",
    "browser:Info",
    "browser:Dom",
    "media:Player.VideoPlayerWrapper",
    "media:Player.Broadcasting",
    "base:Types",
    "base:Objs",
    "base:Strings",
    "base:Time",
    "base:Timers",
    "base:States.Host",
    "base:Classes.ClassRegistry",
    "base:Async",
    "module:Settings",
    "module:VideoPlayer.Dynamics.PlayerStates.Initial",
    "module:VideoPlayer.Dynamics.PlayerStates",
    "module:Ads.AbstractVideoAdProvider",
    "browser:Events"
], [
    "module:VideoPlayer.Dynamics.Playbutton",
    "module:VideoPlayer.Dynamics.Message",
    "module:VideoPlayer.Dynamics.Loader",
    "module:VideoPlayer.Dynamics.Share",
    "module:VideoPlayer.Dynamics.Controlbar",
    "module:VideoPlayer.Dynamics.Tracks",
    "dynamics:Partials.EventPartial",
    "dynamics:Partials.OnPartial",
    "dynamics:Partials.TogglePartial",
    "dynamics:Partials.StylesPartial",
    "dynamics:Partials.TemplatePartial",
    "dynamics:Partials.HotkeyPartial"
], function(Class, Assets, TrackTags, Info, Dom, VideoPlayerWrapper, Broadcasting, Types, Objs, Strings, Time, Timers, Host, ClassRegistry, Async, Settings, InitialState, PlayerStates, AdProvider, DomEvents, scoped) {
    return Class.extend({
            scoped: scoped
        }, function(inherited) {
            return {

                template: "<%= template(dirname + '/player.html') %>",

                attrs: {
                    /* CSS */
                    "css": "ba-videoplayer",
                    "csscommon": "ba-commoncss",
                    "cssplayer": "ba-player",
                    "iecss": "ba-videoplayer",
                    "cssplaybutton": "",
                    "cssloader": "",
                    "cssmessage": "",
                    "csstopmessage": "",
                    "csscontrolbar": "",
                    "csstracks": "",
                    "width": "",
                    "height": "",
                    "popup-width": "",
                    "popup-height": "",
                    /* Themes */
                    "theme": "",
                    "csstheme": "",
                    "themecolor": "",
                    /* Dynamics */
                    "dynplaybutton": "videoplayer-playbutton",
                    "dynloader": "videoplayer-loader",
                    "dynmessage": "videoplayer-message",
                    "dyntopmessage": "videoplayer-topmessage",
                    "dyncontrolbar": "videoplayer-controlbar",
                    "dynshare": "videoplayer-share",
                    "dyntracks": "videoplayer-tracks",
                    /* Templates */
                    "tmplplaybutton": "",
                    "tmplloader": "",
                    "tmplmessage": "",
                    "tmplshare": "",
                    "tmpltopmessage": "",
                    "tmplcontrolbar": "",
                    "tmpltracks": "",
                    /* Attributes */
                    "poster": "",
                    "source": "",
                    "sources": [],
                    "sourcefilter": {},
                    "streams": [],
                    "currentstream": null,
                    "playlist": null,
                    "volume": 1.0,
                    "title": "",
                    "initialseek": null,
                    "sharevideo": [],
                    "sharevideourl": "",
                    "visibilityfraction": 0.8,
                    /* Configuration */
                    "forceflash": false,
                    "noflash": false,
                    "reloadonplay": false,
                    "playonclick": true,
                    /* Ads */
                    "adprovider": null,
                    "preroll": false,
                    /* Options */
                    "rerecordable": false,
                    "submittable": false,
                    "autoplay": false,
                    "preload": false,
                    "loop": false,
                    "popup": false,
                    "nofullscreen": false,
                    "playfullscreenonmobile": false,
                    "stretch": false,
                    "popup-stretch": false,
                    "hideoninactivity": true,
                    "hidebarafter": 5000,
                    "preventinteraction": false,
                    "skipinitial": false,
                    "topmessage": "",
                    "totalduration": null,
                    "playwhenvisible": false,
                    "disablepause": false,
                    "disableseeking": false,
                    "airplay": false,
                    "airplaydevicesavailable": false,
                    "chromecast": false,
                    "skipseconds": 5,
                    "tracktags": [],
                    "tracktagsstyled": true,
                    "tracktaglang": 'en',
                    "tracksshowselection": false,
                    "thumbimage": {},
                    "thumbcuelist": [],
                    "showsettings": true,
                    "showduration": false,
                    "hidevolumebar": false,
                    "settingsoptions": [{
                            id: 'playerspeeds',
                            label: 'player-speed',
                            defaultValue: 1.0,
                            visible: 'media-all',
                            flashSupport: false,
                            mobileSupport: true,
                            className: 'player-speed',
                            options: [{
                                    label: 0.50,
                                    value: 0.50
                                },
                                {
                                    label: 0.75,
                                    value: 0.75
                                },
                                {
                                    label: 1.00,
                                    value: 1.00
                                },
                                {
                                    label: 1.25,
                                    value: 1.25
                                },
                                {
                                    label: 1.50,
                                    value: 1.50
                                },
                                {
                                    label: 1.75,
                                    value: 1.75
                                },
                                {
                                    label: 2.00,
                                    value: 2.00
                                }
                            ],
                            events: [{
                                type: 'click touchstart',
                                method: 'set_speed',
                                argument: true
                            }]
                        }
                        // INFO: left here just as an example
                        // ,{
                        //     id: 'fullscreen',
                        //     label: '<i class="ba-commoncss-icon-resize-full"></i>',
                        //     visible: 'media-all',
                        //     flashSupport: true,
                        //     mobileSupport: true,
                        //     className: 'full-screen',
                        //     events: [{
                        //         type: 'click touchstart',
                        //         method: 'toggle_fullscreen',
                        //         argument: false
                        //     }]
                        // }
                    ],
                    "allowtexttrackupload": false,
                    "uploadtexttracksvisible": false,
                    "acceptedtracktexts": null,
                    "uploadlocales": [{
                        lang: 'en',
                        label: 'English'
                    }],
                    "ttuploadervisible": false,

                    /* States (helper variables which are controlled by application itself not set by user) */
                    "airplaybuttonvisible": false,
                    "castbuttonvisble": false,
                    "fullscreened": false,
                    "initialoptions": {
                        "hideoninactivity": null,
                        "volumelevel": null
                    },
                    "manuallypaused": false,
                    "playedonce": false,
                    "preventinteractionstatus": false, // need to prevent `Unexpected token: punc (()` Uglification issue
                    "ready": true,
                    "tracktagssupport": false,
                    // If settings are open and visible
                    "settingsoptionsvisible": false,
                    "states": {
                        "poster_error": {
                            "ignore": false,
                            "click_play": true
                        }
                    },
                    // Reference to Chrome renewed policy, we have to setup mute for auto-playing players.
                    // If we do it forcibly then will set as true
                    "forciblymuted": false,
                    // When volume was un muted, by user himself, not automatically
                    "volumeafterinteraction": false
                },

                types: {
                    "forceflash": "boolean",
                    "noflash": "boolean",
                    "rerecordable": "boolean",
                    "loop": "boolean",
                    "autoplay": "boolean",
                    "preload": "boolean",
                    "ready": "boolean",
                    "nofullscreen": "boolean",
                    "stretch": "boolean",
                    "preroll": "boolean",
                    "hideoninactivity": "boolean",
                    "hidebarafter": "integer",
                    "preventinteraction": "boolean",
                    "skipinitial": "boolean",
                    "volume": "float",
                    "popup": "boolean",
                    "popup-stretch": "boolean",
                    "popup-width": "int",
                    "popup-height": "int",
                    "initialseek": "float",
                    "fullscreened": "boolean",
                    "sharevideo": "array",
                    "sharevideourl": "string",
                    "playfullscreenonmobile": "boolean",
                    "themecolor": "string",
                    "totalduration": "float",
                    "playwhenvisible": "boolean",
                    "playedonce": "boolean",
                    "manuallypaused": "boolean",
                    "disablepause": "boolean",
                    "disableseeking": "boolean",
                    "playonclick": "boolean",
                    "airplay": "boolean",
                    "airplaybuttonvisible": "boolean",
                    "chromecast": "boolean",
                    "skipseconds": "integer",
                    "tracktags": "array",
                    "tracktagsstyled": "boolean",
                    "allowtexttrackupload": "boolean",
                    "uploadtexttracksvisible": "boolean",
                    "acceptedtracktexts": "string",
                    "uploadlocales": "array",
                    "playerspeeds": "array",
                    "playercurrentspeed": "float",
                    "showsettings": "boolean",
                    "showduration": "boolean"
                },

                extendables: ["states"],

                computed: {
                    "widthHeightStyles:width,height": function() {
                        var result = {};
                        var width = this.get("width");
                        var height = this.get("height");
                        if (width)
                            result.width = width + ((width + '').match(/^\d+$/g) ? 'px' : '');
                        if (height)
                            result.height = height + ((height + '').match(/^\d+$/g) ? 'px' : '');
                        return result;
                    },
                    "buffering:buffered,position,last_position_change_delta,playing": function() {
                        return this.get("playing") && this.get("buffered") < this.get("position") && this.get("last_position_change_delta") > 1000;
                    }
                },

                remove_on_destroy: true,

                create: function() {
                    // Will set volume initial state
                    this.set("initialoptions", Objs.tree_merge(this.get("initialoptions"), {
                        volumelevel: this.get("volume")
                    }));

                    if ((Info.isMobile() || Info.isChromiumBased()) && (this.get("autoplay") || this.get("playwhenvisible"))) {
                        this.set("volume", 0.0);
                        this.set("forciblymuted", true);

                        //if (!(Info.isiOS() && Info.iOSversion().major >= 10)) {
                        //this.set("autoplay", false);
                        //this.set("loop", false);
                        //}
                    }

                    if (this.get("theme") in Assets.playerthemes) {
                        Objs.iter(Assets.playerthemes[this.get("theme")], function(value, key) {
                            if (!this.isArgumentAttr(key))
                                this.set(key, value);
                        }, this);
                    }

                    if (!this.get("themecolor"))
                        this.set("themecolor", "default");

                    if (this.get("adprovider")) {
                        this._adProvider = this.get("adprovider");
                        if (Types.is_string(this._adProvider))
                            this._adProvider = AdProvider.registry[this._adProvider];
                    }
                    if (this.get("playlist")) {
                        var pl0 = (this.get("playlist"))[0];
                        this.set("poster", pl0.poster);
                        this.set("source", pl0.source);
                        this.set("sources", pl0.sources);
                    }
                    if (this.get("streams") && !this.get("currentstream"))
                        this.set("currentstream", (this.get("streams"))[0]);

                    // Set `hideoninactivity` initial options for further help actions
                    if (this.get("preventinteraction") && !this.get("hideoninactivity")) {
                        this.set("hideoninactivity", true);
                        this.set("initialoptions", Objs.tree_merge(this.get("initialoptions"), {
                            hideoninactivity: true
                        }));
                    } else {
                        // Set initial options for further help actions
                        this.set("initialoptions", Objs.tree_merge(this.get("initialoptions"), {
                            hideoninactivity: this.get("hideoninactivity")
                        }));
                    }

                    this.set("ie8", Info.isInternetExplorer() && Info.internetExplorerVersion() < 9);
                    this.set("firefox", Info.isFirefox());
                    this.set("mobileview", Info.isMobile());
                    // For Apple it's very important that their users always remain in control of the volume of the sounds their devices emit
                    this.set("hidevolumebar", (Info.isMobile() && Info.isiOS()));
                    this.set("duration", this.get("totalduration") || 0.0);
                    this.set("position", 0.0);
                    this.set("buffered", 0.0);
                    this.set("message", "");
                    this.set("fullscreensupport", false);
                    this.set("csssize", "normal");

                    this.set("loader_active", false);
                    this.set("playbutton_active", false);
                    this.set("controlbar_active", false);
                    this.set("message_active", false);

                    this.set("last_activity", Time.now());
                    this.set("activity_delta", 0);
                    this.set("passed_after_play", 0);

                    this.set("playing", false);

                    this.__attachRequested = false;
                    this.__activated = false;
                    this.__error = null;
                    this.__currentStretch = null;

                    if (document.onkeydown)
                        this.activeElement().onkeydown = this._keyDownActivity.bind(this, this.activeElement());

                    this.on("change:tracktags", function() {
                        this.__trackTags = new TrackTags({}, this);
                    }, this);

                    this.on("change:stretch", function() {
                        this._updateStretch();
                    }, this);
                    this.host = new Host({
                        stateRegistry: new ClassRegistry(this.cls.playerStates())
                    });
                    this.host.dynamic = this;
                    this.host.initialize(InitialState);

                    this._timer = new Timers.Timer({
                        context: this,
                        fire: this._timerFire,
                        delay: 100,
                        start: true
                    });
                },

                state: function() {
                    return this.host.state();
                },

                videoAttached: function() {
                    return !!this.player;
                },

                videoLoaded: function() {
                    return this.videoAttached() && this.player.loaded();
                },

                videoError: function() {
                    return this.__error;
                },

                _error: function(error_type, error_code) {
                    this.__error = {
                        error_type: error_type,
                        error_code: error_code
                    };
                    this.trigger("error:" + error_type, error_code);
                    this.trigger("error", error_type, error_code);
                },

                _clearError: function() {
                    this.__error = null;
                },

                _detachImage: function() {
                    this.set("imageelement_active", false);
                },

                _attachImage: function() {
                    if (!this.get("poster")) {
                        this.trigger("error:poster");
                        return;
                    }
                    var img = this.activeElement().querySelector("[data-image='image']");
                    this._clearError();
                    var self = this;
                    img.onerror = function() {
                        self.trigger("error:poster");
                    };
                    img.onload = function() {
                        self.set("imageelement_active", true);
                        self.trigger("image-attached");
                    };
                    // If type of source of image is Blob object, convert it to URL
                    img.src = (typeof this.get("poster") === 'object') ? (window.URL || window.webkitURL).createObjectURL(this.get("poster")) : this.get("poster");
                },

                _detachVideo: function() {
                    this.set("playing", false);
                    if (this.player)
                        this.player.weakDestroy();
                    if (this._prerollAd)
                        this._prerollAd.weakDestroy();
                    this.player = null;
                    this.__video = null;
                    this.set("videoelement_active", false);
                },

                _attachVideo: function() {
                    if (this.videoAttached())
                        return;
                    if (!this.__activated) {
                        this.__attachRequested = true;
                        return;
                    }
                    this.__attachRequested = false;
                    this.set("videoelement_active", true);
                    var video = this.activeElement().querySelector("[data-video='video']");
                    this._clearError();
                    // Just in case be sure that player's controllers will be hidden
                    //video.controls = false;
                    VideoPlayerWrapper.create(Objs.extend(this._getSources(), {
                        element: video,
                        onlyaudio: this.get("onlyaudio"), // Will fix only audio local playback bug
                        forceflash: !!this.get("forceflash"),
                        noflash: !!this.get("noflash"),
                        preload: !!this.get("preload"),
                        loop: !!this.get("loop"),
                        isplaylist: this.get('playlist') ? true : false,
                        reloadonplay: this.get('playlist') ? true : !!this.get("reloadonplay")
                    })).error(function(e) {
                        if (this.destroyed())
                            return;
                        this._error("attach", e);
                    }, this).success(function(instance) {
                        if (this.destroyed())
                            return;
                        if (this._adProvider && this.get("preroll")) {
                            this._prerollAd = this._adProvider.newPrerollAd({
                                videoElement: this.activeElement().querySelector("[data-video='video']"),
                                adElement: this.activeElement().querySelector("[data-video='ad']"),
                                dynamic: this
                            });
                        }

                        this.player = instance;
                        this.__video = video;
                        this.__trackTags = new TrackTags({}, this);

                        if (this.get("chromecast")) {
                            if (!this.get("skipinitial")) this.set("skipinitial", true);
                            this._broadcasting = new Broadcasting({
                                player: instance,
                                commonOptions: {
                                    title: this.get("title"),
                                    poster: this.player._element.poster,
                                    currentPosition: this.get("position")
                                },
                                castOptions: {
                                    canControlVolume: true,
                                    canPause: !this.get("disablepause"),
                                    canSeek: !this.get("disableseeking"),
                                    displayName: this.get("title"),
                                    //displayStatus: "Please wait connecting",
                                    duration: this.get("duration"),
                                    imageUrl: this.player._element.poster,
                                    isConnected: this.player._broadcastingState.googleCastConnected,
                                    isMuted: false,
                                    isPaused: !this.get("playing")
                                },
                                airplayOptions: {}
                            });
                            if (Info.isChrome() && this.get("chromecast")) {
                                this._broadcasting.attachGoggleCast();
                                this.player.on("cast-available", function(isCastDeviceAvailable) {
                                    this.set("castbuttonvisble", isCastDeviceAvailable);
                                }, this);
                                this.player.on("cast-loaded", function(castRemotePlayer, castRemotePlayerController) {
                                    //castRemotePlayer.currentMediaDuration = this.player;

                                    // If player already start to play
                                    if (this.get("position") > 0) {
                                        this._broadcasting.options.currentPosition = this.get("position");
                                    }

                                    //If local player playing stop it before
                                    if (this.get('playing')) this.stop();

                                    // Intial play button state
                                    if (!castRemotePlayer.isPaused) this.set('playing', true);

                                }, this);

                                this.player.on("cast-playpause", function(castPaused) {
                                    this.set("playing", !castPaused);
                                }, this);

                                this.player.on("cast-time-changed", function(currentTime, totalMediaDuration) {
                                    var position = Math.round(currentTime / totalMediaDuration * 100);
                                    this.set("buffered", totalMediaDuration);
                                    this.set("cahched", totalMediaDuration);
                                    this.set("duration", totalMediaDuration || 0.0);
                                    this.set("position", currentTime);
                                }, this);

                                this.player.on("proceed-when-ending-googlecast", function(position) {
                                    this.player._broadcastingState.googleCastConnected = false;
                                    this.set('playing', false);
                                }, this);

                            }
                            if (Info.isSafari() && Info.safariVersion() >= 9 && window.WebKitPlaybackTargetAvailabilityEvent && this.get("airplay")) {
                                this.set("airplaybuttonvisible", true);
                                this._broadcasting.attachAirplayEvent.call(this, video);
                            }
                        }

                        if (this.get("playwhenvisible")) {
                            this.set("skipinitial", true);
                            this._playWhenVisible(video);
                        }
                        this.player.on("fullscreen-change", function(inFullscreen) {
                            this.set("fullscreened", inFullscreen);
                            if (!inFullscreen && (this.get('hideoninactivity') !== this.get("initialoptions").hideoninactivity)) {
                                this.set("hideoninactivity", this.get("initialoptions").hideoninactivity);
                            }
                        }, this);
                        // If browser is Chrome, and we have manually forcibly muted player
                        if (Info.isChromiumBased() && this.get("forciblymuted")) {
                            video.isMuted = true;
                            Dom.userInteraction(function() {
                                this.set_volume(this.get("initialoptions").volumelevel);
                                if (this.get("volume") > 0.00)
                                    video.isMuted = false;
                                this.set("forciblymuted", false);
                            }, this);
                        }
                        this.player.on("postererror", function() {
                            this._error("poster");
                        }, this);
                        this.player.on("playing", function() {
                            this.set("playing", true);
                            this.trigger("playing");
                        }, this);
                        this.player.on("error", function(e) {
                            this._error("video", e);
                        }, this);
                        if (this.player.error())
                            this.player.trigger("error", this.player.error());
                        this.player.on("paused", function() {
                            this.set("playing", false);
                            this.trigger("paused");
                        }, this);
                        this.player.on("ended", function() {
                            this.set("playing", false);
                            this.set('playedonce', true);
                            if (this.settings)
                                this.settings.hide_settings();
                            this.trigger("ended");
                        }, this);
                        this.trigger("attached", instance);
                        this.player.once("loaded", function() {
                            var volume = Math.min(1.0, this.get("volume"));
                            this.player.setVolume(volume);
                            this.player.setMuted(volume <= 0.0);
                            if (this.get("totalduration") || this.player.duration() < Infinity)
                                this.set("duration", this.get("totalduration") || this.player.duration());
                            this.set("fullscreensupport", this.player.supportsFullscreen(this.activeElement().childNodes[0]));
                            this._updateStretch();
                            if (this.get("initialseek"))
                                this.player.setPosition(this.get("initialseek"));
                        }, this);
                        if (this.player.loaded())
                            this.player.trigger("loaded");
                        this._updateStretch();
                    }, this);
                },

                _getSources: function() {
                    var filter = this.get("currentstream") ? this.get("currentstream").filter : this.get("sourcefilter");
                    var poster = this.get("poster");
                    var source = this.get("source");
                    var sources = filter ? Objs.filter(this.get("sources"), function(source) {
                        return Objs.subset_of(filter, source);
                    }, this) : this.get("sources");
                    Objs.iter(sources, function(s) {
                        if (s.poster)
                            poster = s.poster;
                    });
                    return {
                        poster: poster,
                        source: source,
                        sources: sources
                    };
                },

                _afterActivate: function(element) {
                    inherited._afterActivate.call(this, element);
                    this.__activated = true;
                    if (this.__attachRequested)
                        this._attachVideo();
                },

                _playWhenVisible: function(video) {
                    var _self = this;

                    if (Dom.isElementVisible(video, this.get("visibilityfraction"))) {
                        this.player.play();
                    }

                    this._visiblityScrollEvent = this.auto_destroy(new DomEvents());
                    this._visiblityScrollEvent.on(document, "scroll", function() {
                        if (!_self.get('playedonce') && !_self.get("manuallypaused")) {
                            if (Dom.isElementVisible(video, _self.get("visibilityfraction"))) {
                                _self.player.play();
                            } else if (_self.get("playing")) {
                                _self.player.pause();
                            }
                        } else if (_self.get("playing") && !Dom.isElementVisible(video, _self.get("visibilityfraction"))) {
                            _self.player.pause();
                        }
                    });

                },

                /* In the future if require to use promise player, Supports >Chrome50, >FireFox53
                _playWithPromise: function(dyn) {
                    var _player, _promise, _autoplayAllowed;
                    _player = dyn.player;
                    _autoplayAllowed = true;
                    if (_player._element)
                        _promise = _player._element.play();
                    else
                        _player.play();

                    if (_promise !== 'undefined' && !Info.isInternetExplorer()) {
                        _promise["catch"](function(err) {
                            // here can add some interaction like inform user to change settings in chrome://flags disable-gesture-requirement-for-media-playback
                            if (err.name === 'NotAllowedError')
                                _autoplayAllowed = false;
                            // Will try to run play anyway
                            _player.play();
                        });
                        _promise.then(function() {
                            if(_autoplayAllowed) {
                                // Inform user with UI that device is not allowed to play without interaction
                            }
                        });
                    } else if (!dyn.get("playing")) {
                        _player.play();
                    }
                }, */

                reattachVideo: function() {
                    this.set("reloadonplay", true);
                    this._detachVideo();
                    this._attachVideo();
                },

                reattachImage: function() {
                    this._detachImage();
                    this._attachImage();
                },

                /**
                 * Click CC buttons will trigger
                 * @param status
                 */
                toggleTrackTags: function(status) {
                    if (!this.__trackTags) return;
                    var _lang = this.get("tracktaglang"),
                        _customStyled = this.get("tracktagsstyled"),
                        _status = status ? 'showing' : 'disabled';
                    _status = (status && _customStyled) ? 'hidden' : _status;
                    if (!status && this.get("tracktagsstyled")) this.set("trackcuetext", null);

                    Objs.iter(this.__video.textTracks, function(track, index) {
                        if (typeof this.__video.textTracks[index] === 'object' && this.__video.textTracks[index]) {
                            var _track = this.__video.textTracks[index];
                            // If set custom style to true show cue text in our element
                            if (_track.kind !== 'metadata') {
                                if (_track.language === _lang) {
                                    _track.mode = _status;
                                    this.set("tracktextvisible", status);
                                    this.__trackTags._triggerTrackChange(this.__video, _track, _status, _lang);
                                }
                            }
                        }
                    }, this);
                },

                _keyDownActivity: function(element, ev) {
                    if (this.get("preventinteractionstatus")) return;
                    var _keyCode = ev.which || ev.keyCode;
                    // Prevent whitespace browser center scroll and arrow buttons behaviours
                    if (_keyCode === 32 || _keyCode === 37 || _keyCode === 38 || _keyCode === 39 || _keyCode === 40) ev.preventDefault();

                    if (_keyCode === 32 || _keyCode === 13 || _keyCode === 9) {
                        this._resetActivity();
                        if (this.get("fullscreened") && this.get("hideoninactivity")) this.set("hideoninactivity", false);
                    }

                    if (_keyCode === 9 && ev.shiftKey) {
                        this._resetActivity();
                        this._findNextTabStop(element, ev, function(target, index) {
                            target.focus();
                        }, -1);
                    } else if (_keyCode === 9) {
                        this._resetActivity();
                        this._findNextTabStop(element, ev, function(target, index) {
                            target.focus();
                        });
                    }
                },

                _findNextTabStop: function(parentElement, ev, callback, direction) {
                    var _currentIndex, _direction, _tabIndexes, _tabIndexesArray, _maxIndex, _minIndex, _looked, _tabIndex, _delta, _element, _videoPlayersCount;
                    _maxIndex = _minIndex = 0;
                    _direction = direction || 1;
                    _element = ev.target;
                    _currentIndex = _element.tabIndex;
                    _tabIndexes = parentElement.querySelectorAll('[tabindex]');
                    _tabIndexesArray = Array.prototype.slice.call(_tabIndexes, 0);
                    _tabIndexes = _tabIndexesArray
                        .filter(function(element) {
                            if ((element.clientWidth > 0 || element.clientHeight > 0) && (element.tabIndex !== -1)) {
                                if (_maxIndex <= element.tabIndex) _maxIndex = element.tabIndex;
                                if (_minIndex >= element.tabIndex) _minIndex = element.tabIndex;
                                return true;
                            } else return false;
                        });

                    if ((_direction === 1 && _currentIndex === _maxIndex) || (direction === -1 && _currentIndex === _minIndex) || _maxIndex === 0) {
                        _videoPlayersCount = document.querySelectorAll('ba-videoplayer').length;
                        if (_videoPlayersCount > 1) {
                            if (this.get("playing")) this.player.pause();
                            parentElement.tabIndex = -1;
                            parentElement.blur();
                        }
                        return;
                    }

                    for (var i = 0; i < _tabIndexes.length; i++) {
                        if (!_tabIndexes[i])
                            continue;
                        _tabIndex = _tabIndexes[i].tabIndex;
                        _delta = _tabIndex - _currentIndex;
                        if (_tabIndex < _minIndex || _tabIndex > _maxIndex || Math.sign(_delta) !== _direction)
                            continue;

                        if (!_looked || Math.abs(_delta) < Math.abs(_looked.tabIndex - _currentIndex))
                            _looked = _tabIndexes[i];
                    }

                    if (_looked) {
                        ev.preventDefault();
                        callback(_looked, _looked.tabIndex);
                    }
                },

                // Couldn't use for uglification issue `Unexpected token: punc (()`
                // _preventInteraction() {
                //      if(this.get('preventinteraction') && (this.get('hidebarafter') < (Time.now() - this.get("last_activity"))) && this.get('playing'));
                // },

                _resetActivity: function() {
                    if (!this.get('preventinteractionstatus')) {
                        this.set("last_activity", Time.now());
                    }
                    this.set("activity_delta", 0);
                },

                object_functions: ["play", "rerecord", "pause", "stop", "seek", "set_volume"],

                functions: {

                    user_activity: function(strong) {
                        if (strong && !this.get("volumeafterinteraction")) {
                            // User interacted with player, and set player's volume level/un-mute
                            // So we will play voice as soon as player visible for user
                            this.set_volume(this.get("initialoptions").volumelevel);
                            this.set("volumeafterinteraction", true);
                            if (this.get("forciblymuted")) this.set("forciblymuted", false);
                        }
                        if (this.get('preventinteractionstatus')) return;
                        this._resetActivity();
                    },

                    message_click: function() {
                        this.trigger("message:click");
                    },

                    playbutton_click: function() {
                        this.host.state().play();
                    },

                    play: function() {
                        if (this._delegatedPlayer) {
                            this._delegatedPlayer.execute("play");
                            return;
                        }
                        if (this.player && this.player._broadcastingState && this.player._broadcastingState.googleCastConnected) {
                            this._broadcasting.player.trigger("play-google-cast");
                            return;
                        }
                        this.host.state().play();
                    },

                    rerecord: function() {
                        if (this._delegatedPlayer) {
                            this._delegatedPlayer.execute("rerecord");
                            return;
                        }
                        if (!this.get("rerecordable"))
                            return;
                        this.trigger("rerecord");
                    },

                    submit: function() {
                        if (this._delegatedPlayer) {
                            this._delegatedPlayer.execute("submit");
                            return;
                        }
                        if (!this.get("submittable"))
                            return;
                        this.trigger("submit");
                        this.set("submittable", false);
                        this.set("rerecordable", false);
                    },

                    pause: function() {
                        if (this.get("preventinteractionstatus")) return;
                        if (this._delegatedPlayer) {
                            this._delegatedPlayer.execute("pause");
                            return;
                        }

                        if (this.get('disablepause')) return;

                        if (this.get("playing")) {
                            if (this.player && this.player._broadcastingState && this.player._broadcastingState.googleCastConnected) {
                                this._broadcasting.player.trigger("pause-google-cast");
                                return;
                            }
                            this.player.pause();
                        }

                        if (this.get("playwhenvisible"))
                            this.set("manuallypaused", true);
                    },

                    stop: function() {
                        if (this.get("preventinteractionstatus")) return;
                        if (this._delegatedPlayer) {
                            this._delegatedPlayer.execute("stop");
                            return;
                        }
                        if (!this.videoLoaded())
                            return;
                        if (this.get("playing"))
                            this.player.pause();
                        this.player.setPosition(0);
                        this.trigger("stopped");
                    },

                    seek: function(position) {
                        if (this.get("preventinteractionstatus")) return;
                        if (this._delegatedPlayer) {
                            this._delegatedPlayer.execute("seek", position);
                            return;
                        }
                        if (this.get('disableseeking')) return;
                        if (this.videoLoaded()) {
                            if (position > this.player.duration())
                                this.player.setPosition(this.player.duration() - this.get("skipseconds"));
                            else {
                                this.player.setPosition(position);
                                this.trigger("seek", position);
                            }
                        }
                    },

                    set_speed: function(speed) {
                        this.player.setSpeed(speed);
                    },

                    set_volume: function(volume) {
                        if (this.get("preventinteractionstatus")) return;
                        if (this._delegatedPlayer) {
                            this._delegatedPlayer.execute("set_volume", volume);
                            return;
                        }
                        volume = Math.min(1.0, volume);

                        if (this.player && this.player._broadcastingState && this.player._broadcastingState.googleCastConnected) {
                            this._broadcasting.player.trigger("change-google-cast-volume", volume);
                        }

                        this.set("volume", volume);
                        if (this.videoLoaded()) {
                            this.player.setVolume(volume);
                            this.player.setMuted(volume <= 0);
                        }
                    },

                    toggle_settings: function() {
                        if (this.get('settingsoptions')) {
                            if (!this.settings)
                                this.settings = new Settings(this.get('settingsoptions'), this);
                            this.settings.toggle_settings_block();
                        }
                    },

                    toggle_fullscreen: function() {
                        if (this.get("preventinteractionstatus")) return;
                        if (this._delegatedPlayer) {
                            this._delegatedPlayer.execute("toggle_fullscreen");
                            return;
                        }
                        if (this.get("fullscreened"))
                            this.player.exitFullscreen();
                        else
                            this.player.enterFullscreen(this.activeElement().childNodes[0]);
                        this.set("fullscreened", !this.get("fullscreened"));
                    },

                    toggle_player: function() {
                        if (this.get('playing'))
                            if (this.get("preventinteractionstatus")) return;
                        if (this._delegatedPlayer) {
                            this._delegatedPlayer.execute("toggle_player");
                            return;
                        }
                        if (!this.get("playonclick"))
                            return;
                        if (this.get('playing') && !this.get("disablepause")) {
                            if (!this.get("volumeafterinteraction"))
                                this.pause();
                            else
                                this.set("volumeafterinteraction", false);

                            // If user paused the video and don't like player will auto-played
                            // so, no need to play each time when user see video
                            if (this.get("playwhenvisible"))
                                this.set("manuallypaused", true);
                        } else
                            this.play();
                    },

                    tab_index_move: function(ev, nextSelector, focusingSelector) {
                        if (this.get("preventinteractionstatus")) return;
                        var _targetElement, _activeElement, _selector, _keyCode;
                        _keyCode = ev.which || ev.keyCode;
                        _activeElement = this.activeElement();
                        if (_keyCode === 13 || _keyCode === 32) {
                            if (focusingSelector) {
                                _selector = "[data-selector='" + focusingSelector + "']";
                                _targetElement = _activeElement.querySelector(_selector);
                                if (_targetElement)
                                    Async.eventually(function() {
                                        this.trigger("keyboardusecase", _activeElement);
                                        _targetElement.focus({
                                            preventScroll: false
                                        });
                                    }, this, 100);
                            } else {
                                _selector = '[data-video="video"]';
                                _targetElement = _activeElement.querySelector(_selector);
                                Async.eventually(function() {
                                    this.trigger("keyboardusecase", _activeElement);
                                    _targetElement.focus({
                                        preventScroll: true
                                    });
                                }, this, 100);
                            }
                        } else if (_keyCode === 9 && nextSelector) {
                            _selector = "[data-selector='" + nextSelector + "']";
                            _targetElement = _activeElement.querySelector(_selector);
                            if (_targetElement)
                                Async.eventually(function() {
                                    this.trigger("keyboardusecase", _activeElement);
                                    _targetElement.focus({
                                        preventScroll: false
                                    });
                                }, this, 100);
                        }
                    },

                    upload_text_tracks: function(file, locale) {
                        return this.host.state().uploadTextTrack(file, locale);
                    },

                    move_to_option: function(currentElement, nextSelector) {
                        var _classPrefix, _hiddenOptionsSelector, _visibleOptionsSelector, _moveToSelector,
                            _targetElement, _currentElementParent, _topParent;
                        nextSelector = nextSelector || 'initial-options-list'; // If next element is empty return to main options
                        _classPrefix = this.get('csscommon') + "-";
                        _moveToSelector = "." + _classPrefix + nextSelector;
                        _hiddenOptionsSelector = _classPrefix + 'options-list-hidden';
                        _visibleOptionsSelector = _classPrefix + 'options-list-visible';
                        _targetElement = this.activeElement().querySelector(_moveToSelector);
                        _topParent = this.activeElement().querySelector(_classPrefix + 'text-tracks-overlay');

                        // Look if target element is hidden
                        if (Dom.elementHasClass(_targetElement, _hiddenOptionsSelector)) {
                            // Search for visible closest parent element
                            _currentElementParent = Dom.elementFindClosestParent(currentElement, _visibleOptionsSelector, _classPrefix + 'text-tracks-overlay');
                            // We should have parent element with visible class
                            if (Dom.elementHasClass(_currentElementParent, _visibleOptionsSelector)) {
                                Dom.elementReplaceClasses(_targetElement, _hiddenOptionsSelector, _visibleOptionsSelector);
                                Dom.elementReplaceClasses(_currentElementParent, _visibleOptionsSelector, _hiddenOptionsSelector);
                            }
                            if (_topParent)
                                _topParent.focus({
                                    preventScroll: true
                                });
                            else
                                _currentElementParent.focus({
                                    preventScroll: true
                                });
                        }
                    },

                    toggle_interaction_option: function(turn_switch) {
                        if (typeof turn_switch === 'boolean') {
                            this.set("preventinteractionstatus", turn_switch);
                        } else {
                            this.set("preventinteractionstatus", !this.get("preventinteractionstatus"));
                        }
                    }

                },

                destroy: function() {
                    this._timer.destroy();
                    this.host.destroy();
                    this._detachVideo();
                    inherited.destroy.call(this);
                },

                _timerFire: function() {
                    if (this.destroyed())
                        return;
                    try {
                        if (this.videoLoaded()) {
                            var _now = Time.now();
                            this.set("activity_delta", _now - this.get("last_activity"));
                            var new_position = this.player.position();
                            if (new_position !== this.get("position") || this.get("last_position_change"))
                                this.set("last_position_change", _now);
                            // In case if prevent interaction with controller set to true
                            if (this.get('preventinteraction')) {
                                // set timer since player started to play
                                if (this.get("passed_after_play") < 0.001) {
                                    this.set("passed_after_play", _now);
                                } else {
                                    var _passed = _now - this.get("passed_after_play");
                                    if (_passed > _now - 1000) {
                                        this.set("passed_after_play", _passed);
                                    }
                                    if ((this.get('hidebarafter') < _passed) && this.get('playing') && !this.get("preventinteractionstatus")) {
                                        this.set('preventinteractionstatus', true);
                                    }
                                }

                            }
                            this.set("last_position_change_delta", _now - this.get("last_position_change"));
                            this.set("position", new_position);
                            this.set("buffered", this.player.buffered());
                            var pld = this.player.duration();
                            if (0.0 < pld && pld < Infinity)
                                this.set("duration", this.player.duration());
                            else
                                this.set("duration", this.get("totalduration") || new_position);
                            this.set("fullscreened", this.player.isFullscreen(this.activeElement().childNodes[0]));
                            // If settings pop-up is open hide it together with control-bar if hideOnInactivity is true
                            if (
                                this.settings && this.get('hideoninactivity') &&
                                (this.get('activity_delta') > this.get('hidebarafter'))
                            ) {
                                this.settings.hide_settings();
                            }
                        }
                    } catch (e) {}
                    try {
                        this._updateStretch();
                    } catch (e) {}
                    try {
                        this._updateCSSSize();
                    } catch (e) {}
                },

                _updateCSSSize: function() {
                    var width = Dom.elementDimensions(this.activeElement()).width;
                    this.set("csssize", width > 400 ? "normal" : (width > 320 ? "medium" : "small"));
                    this.set("mobileview", width < 560);
                },

                videoHeight: function() {
                    if (this.videoAttached())
                        return this.player.videoHeight();
                    var img = this.activeElement().querySelector("img");
                    if (img && img.height) {
                        var clientHeight = (window.innerHeight || document.body.clientHeight);
                        if (img.height > clientHeight)
                            return clientHeight;
                        return img.height;
                    }
                    return NaN;
                },

                videoWidth: function() {
                    if (this.videoAttached())
                        return this.player.videoWidth();
                    var img = this.activeElement().querySelector("img");
                    if (img && img.width) {
                        var clientWidth = (window.innerWidth || document.body.clientWidth);
                        if (img.width > clientWidth)
                            return clientWidth;
                        return img.width;
                    }
                    return NaN;
                },

                aspectRatio: function() {
                    // Don't use shortcut way of getting aspect ratio, will act as not expected.
                    var height = this.videoHeight();
                    var width = this.videoWidth();

                    return width / height;
                },

                parentWidth: function() {
                    return Dom.elementDimensions(this.activeElement().parentElement).width;
                },

                parentHeight: function() {
                    return Dom.elementDimensions(this.activeElement().parentElement).height;
                },

                parentAspectRatio: function() {
                    return this.parentWidth() / this.parentHeight();
                },

                _updateStretch: function() {
                    var newStretch = null;
                    if (this.get("stretch")) {
                        var ar = this.aspectRatio();
                        if (isFinite(ar)) {
                            var par = this.parentAspectRatio();
                            if (isFinite(par)) {
                                if (par > ar)
                                    newStretch = "height";
                                if (par < ar)
                                    newStretch = "width";
                            } else if (par === Infinity)
                                newStretch = "height";
                        }
                    }
                    if (this.__currentStretch !== newStretch) {
                        if (this.__currentStretch)
                            Dom.elementRemoveClass(this.activeElement(), this.get("css") + "-stretch-" + this.__currentStretch);
                        if (newStretch)
                            Dom.elementAddClass(this.activeElement(), this.get("css") + "-stretch-" + newStretch);
                    }
                    this.__currentStretch = newStretch;
                },

                cloneAttrs: function() {
                    return Objs.map(this.attrs, function(value, key) {
                        return this.get(key);
                    }, this);
                },

                popupAttrs: function() {
                    return {
                        autoplay: true,
                        popup: false,
                        width: this.get("popup-width"),
                        height: this.get("popup-height"),
                        stretch: this.get("popup-stretch")
                    };
                }

            };
        }, {

            playerStates: function() {
                return [PlayerStates];
            }

        }).register("ba-videoplayer")
        .registerFunctions({
            /*<%= template_function_cache(dirname + '/player.html') %>*/
        })
        .attachStringTable(Assets.strings)
        .addStrings({
            "video-error": "An error occurred, please try again later. Click to retry.",
            "all-settings": "All settings",
            "player-speed": "Player speed",
            "full-screen": "Full screen"
        });
});