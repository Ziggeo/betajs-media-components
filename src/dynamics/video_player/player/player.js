Scoped.define("module:VideoPlayer.Dynamics.Player", [
    "dynamics:Dynamic",
    "module:Assets",
    "module:DatasetProperties",
    "module:StickyHandler",
    "module:StylesMixin",
    "module:TrackTags",
    "browser:Info",
    "browser:Dom",
    "media:Player.VideoPlayerWrapper",
    "media:Player.Broadcasting",
    "media:Player.Support",
    "base:Types",
    "base:Objs",
    "base:Strings",
    "base:Collections.Collection",
    "base:Time",
    "base:Timers",
    "base:Promise",
    "base:TimeFormat",
    "base:States.Host",
    "base:Classes.ClassRegistry",
    "base:Async",
    "module:VideoPlayer.Dynamics.PlayerStates.Initial",
    "module:VideoPlayer.Dynamics.PlayerStates",
    "module:Ads.AbstractVideoAdProvider",
    "browser:Events"
], [
    "module:Ads.Dynamics.Player",
    "module:Common.Dynamics.Settingsmenu",
    "module:VideoPlayer.Dynamics.Playbutton",
    "module:VideoPlayer.Dynamics.Message",
    "module:VideoPlayer.Dynamics.Loader",
    "module:VideoPlayer.Dynamics.Share",
    "module:VideoPlayer.Dynamics.Next",
    "module:VideoPlayer.Dynamics.Controlbar",
    "module:VideoPlayer.Dynamics.Topmessage",
    "module:VideoPlayer.Dynamics.Tracks",
    "module:VideoPlayer.Dynamics.Sidebar",
    "module:VideoPlayer.Dynamics.Tooltip",
    "dynamics:Partials.EventPartial",
    "dynamics:Partials.OnPartial",
    "dynamics:Partials.TogglePartial",
    "dynamics:Partials.StylesPartial",
    "dynamics:Partials.TemplatePartial",
    "dynamics:Partials.HotkeyPartial",
    "module:VideoPlayer.Dynamics.PlayerStates.TextTrackUploading",
    "module:VideoPlayer.Dynamics.PlayerStates.FatalError",
    "module:VideoPlayer.Dynamics.PlayerStates.Initial",
    "module:VideoPlayer.Dynamics.PlayerStates.LoadPlayer",
    "module:VideoPlayer.Dynamics.PlayerStates.LoadPlayerDirectly",
    "module:VideoPlayer.Dynamics.PlayerStates.LoadError",
    "module:VideoPlayer.Dynamics.PlayerStates.PosterReady",
    "module:VideoPlayer.Dynamics.PlayerStates.Outstream",
    "module:VideoPlayer.Dynamics.PlayerStates.LoadAds",
    "module:VideoPlayer.Dynamics.PlayerStates.PlayOutstream",
    "module:VideoPlayer.Dynamics.PlayerStates.ReloadAds",
    "module:VideoPlayer.Dynamics.PlayerStates.PlayAd",
    "module:VideoPlayer.Dynamics.PlayerStates.PrerollAd",
    "module:VideoPlayer.Dynamics.PlayerStates.MidrollAd",
    "module:VideoPlayer.Dynamics.PlayerStates.PostrollAd",
    "module:VideoPlayer.Dynamics.PlayerStates.PosterError",
    "module:VideoPlayer.Dynamics.PlayerStates.LoadVideo",
    "module:VideoPlayer.Dynamics.PlayerStates.ErrorVideo",
    "module:VideoPlayer.Dynamics.PlayerStates.PlayVideo",
    "module:VideoPlayer.Dynamics.PlayerStates.NextVideo"
], function(Class, Assets, DatasetProperties, StickyHandler, StylesMixin, TrackTags, Info, Dom, VideoPlayerWrapper, Broadcasting, PlayerSupport, Types, Objs, Strings, Collection, Time, Timers, Promise, TimeFormat, Host, ClassRegistry, Async, InitialState, PlayerStates, AdProvider, DomEvents, scoped) {
    return Class.extend({
            scoped: scoped
        }, [StylesMixin, function(inherited) {
            return {

                template: "<%= template(dirname + '/player.html') %>",

                attrs: function() {
                    return {
                        /* CSS */
                        brightness: 0,
                        current_video_from_playlist: 0,
                        next_video_from_playlist: 0,
                        sample_brightness: false,
                        sample_brightness_rate: 10, // times per second
                        sample_brightness_sample_size: 250,
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
                        "size": null,
                        "sidebarwidth": null,
                        "availablesizes": {},
                        "showgallery": false,
                        "popup-width": "",
                        "popup-height": "",
                        "aspectratio": null,
                        "fallback-aspect-ratio": "1280/720",
                        "floating-fallback-mobile-height": 75,
                        "floating-fallback-desktop-height": 240,
                        /* Themes */
                        "theme": "",
                        "csstheme": "",
                        "themecolor": "",
                        /* Dynamics */
                        "dynadscontrolbar": "ads-controlbar",
                        "dynadsplayer": "adsplayer",
                        "dynplaybutton": "videoplayer-playbutton",
                        "dynloader": "videoplayer-loader",
                        "dynmessage": "videoplayer-message",
                        "dyntopmessage": "videoplayer-topmessage",
                        "dyncontrolbar": "videoplayer-controlbar",
                        "dynshare": "videoplayer-share",
                        "dyntracks": "videoplayer-tracks",
                        "dynsidebar": "videoplayer-sidebar",
                        "dynsettingsmenu": "common-settingsmenu",
                        "dyntrimmer": "videorecorder-trimmer",
                        "dynnext": "videoplayer-next",
                        "dyntooltip": "videoplayer-tooltip",

                        /* Templates */
                        "tmpladcontrolbar": "",
                        "tmplplaybutton": "",
                        "tmplloader": "",
                        "tmplmessage": "",
                        "tmplshare": "",
                        "tmpltopmessage": "",
                        "tmplcontrolbar": "",
                        "tmpltracks": "",
                        "tmplsettingsmenu": "",

                        /* Attributes */
                        "poster": "",
                        "source": "",
                        "sources": [],
                        "sourcefilter": {},
                        "state": "",
                        "streams": [],
                        "currentstream": null,
                        "hasnext": false,
                        "playlist": null,
                        "volume": 1.0,
                        "title": "",
                        "description": "",
                        "uploaddate": "",
                        "contenturl": "",
                        "thumbnailurl": "",
                        "initialseek": null,
                        "sharevideo": [],
                        "sharevideourl": "",
                        "share_active": true,
                        "visibilityfraction": 0.8,
                        /* Configuration */
                        "reloadonplay": false,
                        "playonclick": true,
                        "pauseonclick": true,
                        "unmuteonclick": false,
                        "muted": false,
                        "nextwidget": false,
                        "shownext": 3,
                        "noengagenext": 5,
                        "stayengaged": false,
                        "next_active": false,

                        /** tooltip
                         {
                         "tooltiptext": null,
                         "closeable": false,
                         "position": "top-right", // default: "top-right", other options: top-center, top-left, bottom-right, bottom-center, bottom-left
                         "pauseonhover": false, //  default: false
                         "disappearafterseconds": 2 // -1 will set it as showing always, default: 2 seconds
                         "showprogressbar": true, // default: false, will show progressbar on tooltip completion
                         "showonhover": false, // TODO: will be shown on hover only
                         "queryselector": null // TODO: will be shown on hover only on this element
                         }
                         */
                        "presetedtooltips": {
                            "onplayercreate": null,
                            // "onclicktroughexistence": {
                            //     "tooltiptext": "Click again to learn more",
                            //     "disappearafterseconds": 5
                            // }
                        },

                        /* Ads */
                        "adprovider": null,
                        "preroll": false,
                        "outstream": false,
                        "outstreamoptions": {}, // can be false, string (example: '10px', '10') or numeric
                        "imasettings": {},
                        "adtagurl": null,
                        "adchoiceslink": null,
                        "adtagurlfallbacks": [],
                        "nextadtagurls": [],
                        "inlinevastxml": null,
                        "hidebeforeadstarts": true, // Will help hide player poster before ads start
                        "hideadscontrolbar": false,
                        "showplayercontentafter": null, // we can set any microseconds to show player content in any case if ads not initialized
                        "adsposition": null,
                        "vmapads": false, // VMAP ads will set pre, mid, post positions inside XML file
                        "non-linear": null,
                        "companionad": null, // if just set to true, it will set companionads attribute for further use cases and will not render companion ad
                        "companionads": [],
                        "linearadplayer": true,
                        "customnonlinear": false, // Currently, not fully supported
                        "minadintervals": 5,
                        "non-linear-min-duration": 10,
                        "midrollads": [],
                        "adchoicesontop": true,

                        /* Options */
                        "allowpip": true, // Picture-In-Picture Mode
                        "rerecordable": false,
                        "submittable": false,
                        "autoplay": false,
                        "autoplaywhenvisible": false,
                        "continuousplayback": true,
                        "preload": false,
                        "loop": false,
                        "loopall": false,
                        "popup": false,
                        "nofullscreen": false,
                        "fullscreenmandatory": false,
                        "playfullscreenonmobile": false,
                        "fitonwidth": false,
                        "fitonheight": false,
                        "hideoninactivity": true,
                        "hidebarafter": 5000,
                        "preventinteraction": false,
                        "skipinitial": false,
                        "topmessage": "",
                        "totalduration": null,
                        "playwhenvisible": false,
                        "disablepause": false,
                        "disableseeking": false,
                        "tracktextvisible": false,
                        "airplay": false,
                        "chromecast": false,
                        "broadcasting": false,
                        "chromecastreceiverappid": null, // Could be published custom App ID https://cast.google.com/publish/#/overview
                        "skipseconds": 5,
                        "sticky": false,
                        "sticky-starts-paused": true,
                        "sticky-position": undefined,
                        "sticky-threshold": undefined,
                        // sticky options
                        "floatingoptions": {
                            "sidebar": true, // show sidebar
                            "floatingonly": false, // hide and show on video player based on view port
                            "closeable": true, // show close button
                            "hideplayeronclose": false, // hide player container in the content if floating player was closed
                            "showcompanionad": false, // if set to true, companion ad will be shown on sidebar if it's exitst
                            // "fluidsidebar": true, // TODO: not works for now, if false, 50% width will be applied on sidebar
                            "desktop": {
                                "position": "bottom-right", // position of floating video player for desktop
                                "height": 197,
                                "bottom": 30,
                                "sidebar": false,
                                "companionad": false

                                /** optional settings */
                                // "size": null", // any key
                                // "availablesizes": {
                                //     'key1': heightInNumber, 'key2': heightInNumber2, ...
                                // }
                            },
                            "mobile": {
                                "position": "top", // positions of floating video player for mobile
                                "height": 75,
                                "sidebar": true,
                                "companionad": true,
                                "positioning": {
                                    "relativeSelector": null, // To be able to work positioning option, correct selector should be provided (Example: div#header)
                                    "applySelector": 'div.ba-player-floating', // could be changed if you require
                                    "applyProperty": 'margin-top' // will apply height of the relativeSelector
                                }
                                /** optional settings */
                                // "size": null", // any key
                                // "availablesizes": {
                                //     'key1': heightInNumber, 'key2': heightInNumber2, ...
                                // }
                            }
                        },
                        "tracktags": [],
                        "tracktagsstyled": true,
                        "tracktaglang": 'en',
                        "tracksshowselection": false,
                        "showchaptertext": true,
                        "thumbimage": {},
                        "thumbcuelist": [],
                        "showduration": false,
                        "showsettings": true,
                        "showsettingsmenu": true, // As a property show/hide from users
                        "posteralt": "",
                        "hidevolumebar": false,
                        "hidecontrolbar": false,
                        "allowtexttrackupload": false,
                        "useAspectRatioFallback": (Info.isSafari() && Info.safariVersion() < 15) || Info.isInternetExplorer(),
                        "uploadtexttracksvisible": false,
                        "acceptedtracktexts": null,
                        "uploadlocales": [{
                            lang: 'en',
                            label: 'English'
                        }],
                        "ttuploadervisible": false,
                        "videofitstrategy": "pad",
                        "posterfitstrategy": "crop",
                        "slim": false,

                        /* States (helper variables which are controlled by application itself not set by user) */
                        "adsplaying": false,
                        "adshassource": false,
                        "showbuiltincontroller": false,
                        "airplaybuttonvisible": false,
                        "castbuttonvisble": false,
                        "fullscreened": false,
                        "initialoptions": {
                            "hideoninactivity": null,
                            "volumelevel": null,
                            "autoplay": null,
                            "outstreamoptions": {
                                corner: true,
                                hideOnCompletion: true,
                                recurrenceperiod: 30000, // Period when a new request will be sent if ads is not showing, default: 30 seconds
                                maxadstoshow: -1 // Maximum number of ads to show, if there's next ads or errors occurred default: -1 (unlimited)
                            }
                        },
                        "silent_attach": false,
                        "inpipmode": false,
                        "lastplaylistitem": false,
                        "manuallypaused": false,
                        "playedonce": false,
                        "preventinteractionstatus": false, // need to prevent `Unexpected token: punc (()` Uglification issue
                        "ready": true,
                        "tracktagssupport": false,
                        "playbackcount": 0,
                        "playbackended": 0,
                        "currentchapterindex": 0,
                        "chapterslist": [],
                        "userengagedwithplayer": false,
                        "userhadplayerinteraction": false,
                        // If settings are open and visible
                        "states": {
                            "poster_error": {
                                "ignore": false,
                                "click_play": true
                            },
                            "dimensions": {
                                "width": null,
                                "height": null
                            },
                            "hiddenelement": {
                                "visible": true
                            }
                        },
                        "placeholderstyle": "",
                        "hasplaceholderstyle": false,
                        "playerorientation": undefined,
                        // Reference to Chrome renewed policy, we have to set up mute for autoplaying players.
                        // If we do it forcibly, then we will set as true
                        "forciblymuted": false,
                        "autoplay-allowed": false,
                        "autoplay-requires-muted": true,
                        "autoplay-requires-playsinline": null,
                        // When volume was unmuted, by the user himself, not automatically
                        "volumeafterinteraction": false,
                        "prominent-title": false,
                        "closeable-title": false
                    };
                },

                types: {
                    "allowpip": "boolean",
                    "hidecontrolbar": "boolean",
                    "muted": "boolean",
                    "nextwidget": "boolean",
                    "shownext": "float",
                    "state": "string",
                    "noengagenext": "float",
                    "unmuteonclick": "boolean",
                    "rerecordable": "boolean",
                    "loop": "boolean",
                    "loopall": "boolean",
                    "autoplay": "boolean",
                    "autoplaywhenvisible": "boolean",
                    "continuousplayback": "boolean",
                    "preload": "boolean",
                    "ready": "boolean",
                    "nofullscreen": "boolean",
                    "fullscreenmandatory": "boolean",
                    "preroll": "boolean",
                    "hideoninactivity": "boolean",
                    "hidebarafter": "integer",
                    "preventinteraction": "boolean",
                    "skipinitial": "boolean",
                    "volume": "float",
                    "popup": "boolean",
                    "popup-width": "int",
                    "popup-height": "int",
                    "aspectratio": "float",
                    "fallback-aspect-ratio": "string",
                    "outstreamoptions": "json",
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
                    "pauseonclick": "boolean",
                    "airplay": "boolean",
                    "airplaybuttonvisible": "boolean",
                    "chromecast": "boolean",
                    "chromecastreceiverappid": "string",
                    "skipseconds": "integer",
                    "sticky": "boolean",
                    "sticky-starts-paused": "boolean",
                    "streams": "jsonarray",
                    "sources": "jsonarray",
                    "tracktags": "jsonarray",
                    "tracktagsstyled": "boolean",
                    "allowtexttrackupload": "boolean",
                    "uploadtexttracksvisible": "boolean",
                    "acceptedtracktexts": "string",
                    "uploadlocales": "array",
                    "playerspeeds": "array",
                    "playercurrentspeed": "float",
                    "showsettings": "boolean",
                    "showsettingsmenu": "boolean",
                    "showduration": "boolean",
                    "visibilityfraction": "float",
                    "showchaptertext": "boolean",
                    "title": "string",
                    "description": "string",
                    "uploaddate": "string",
                    "contenturl": "string",
                    "thumbnailurl": "string",
                    "videofitstrategy": "string",
                    "posterfitstrategy": "string",
                    "adtagurl": "string",
                    "adchoiceslink": "string",
                    "adtagurlfallbacks": "array",
                    "nextadtagurls": "array",
                    "hideadscontrolbar": "boolean",
                    "inlinevastxml": "string",
                    "imasettings": "jsonarray",
                    "adsposition": "string",
                    "non-linear": "string",
                    "adchoicesontop": "boolean",
                    "minadintervals": "int",
                    "non-linear-min-duration": "int",
                    "companionad": "string",
                    "slim": "boolean",
                    "prominent-title": "boolean",
                    "closeable-title": "boolean",
                    "sticky-threshold": "float",
                    "floatingoptions": "jsonarray",
                    "presetedtooltips": "object",
                    "size": "string",
                    "sidebarwidth": "int", // can be as a string as well via px and %, default is int with px
                    "availablesizes": "object",
                    "showsidebargallery": "boolean",
                    // Will help hide player poster before ads start,
                    // if false rectangle with full dimensions will be shown
                    "hidebeforeadstarts": "boolean"
                },

                __INTERACTION_EVENTS: ["click", "mousedown", "touchstart", "keydown", "keypress"],

                extendables: ["states"],

                registerchannels: ["ads", "next"],

                scopes: {
                    adsplayer: ">[tagname='ba-adsplayer']",
                    settingsmenu: ">[tagname='ba-common-settingsmenu']",
                    floatingsidebar: ">[tagname='ba-videoplayer-sidebar']"
                },

                collections: {
                    tooltips: {}
                },

                events: {
                    "change:uploaddate": function(value) {
                        if (typeof value === "number")
                            this.set("uploaddate", TimeFormat.format("yyyy-mm-dd", value * 1000));
                    },
                    "change:starttime": function(startTime) {
                        if (startTime > this.getCurrentPosition()) {
                            this.player.setPosition(startTime);
                        }
                    },
                    "change:endtime": function(endTime) {
                        if (!endTime || endTime === this.get("duration")) {
                            if (this.get("_timeUpdateEventHandler")) {
                                this.get("_timeUpdateEventHandler").clear();
                            }
                        } else {
                            if (endTime < this.getCurrentPosition()) {
                                this.player.setPosition(endTime);
                            }
                            if (!this.get("_timeUpdateEventHandler")) {
                                this.set("_timeUpdateEventHandler", this.auto_destroy(new DomEvents()));
                            }
                            if (!this.get("_timeUpdateEventHandler").__callbacks.timeupdate) {
                                this.get("_timeUpdateEventHandler").on(this.player._element, "timeupdate", function() {
                                    var position = this.getCurrentPosition();
                                    if (position >= this.get("endtime")) {
                                        this.player.trigger("ended");
                                        if (!this.get("loop")) {
                                            this.player.pause();
                                        }
                                    }
                                }, this);
                            }
                        }
                    },
                    "change:placeholderstyle": function(value) {
                        this.set("hasplaceholderstyle", value.length > 10);
                    },
                    "change:position": function(position, old) {
                        if (!this.get("nextwidget") || this.get("stayengaged") || this.get("adsplaying"))
                            return;
                        if (position - old > 1) return this.channel("next").trigger("setStay");
                        if (Array.isArray(this.get("playlist")) && this.get("playlist").length > 0) {
                            if (position > this.get("shownext") && this.get("shownext") > 0 && !this.get("next_active")) {
                                this.set("next_active", true);
                            }
                            if (position > this.get("shownext") + this.get("noengagenext") && this.get("shownext") + this.get("noengagenext") > 0) {
                                this.channel("next").trigger("autoPlayNext");
                                this.channel("next").trigger("playNext");
                            }
                        }
                    },
                    "change:mobileviewport": function(viewport) {
                        if (this.get("is_floating")) {
                            var calculated = this.__calculateFloatingDimensions();
                            if (this.get("floating_height") !== calculated.floating_height)
                                this.set("floating_height", calculated.floating_height);
                        }
                    },
                    "change:fullscreened": function(isFullscreen) {
                        if (isFullscreen && this.get("view_type") === "float") {
                            this.set("view_type", "default");
                        }
                    }
                },
                channels: {
                    "next:setStay": function() {
                        this.set("stayengaged", true);
                        this.set("next_active", false);
                        this.__setPlayerEngagement();
                    },
                    "next:playNext": function() {
                        this.trigger("play_next");
                        this.set("next_active", false);
                        this.__setPlayerEngagement();
                    },
                    "next:resetNextWidget": function() {
                        this.set("stayengaged", false);
                        this.set("next_active", false);
                    }
                },

                computed: {
                    "aspectRatioFallback:aspectratio,fallback-aspect-ratio": function(aspectRatio, fallback) {
                        var f = fallback.split("/");
                        return {
                            paddingTop: 100 / (aspectRatio || (f[0] / f[1])) + "%"
                        };
                    },
                    "aspect_ratio:aspectratio,fallback-aspect-ratio": function(aspectRatio, fallback) {
                        return aspectRatio || fallback;
                    },
                    "sidebar_active:is_floating,with_sidebar,showgallery,fullscreened": function(isFloating, withSidebar, showGallery, fullscreened) {
                        if (fullscreened) return false;
                        return (isFloating && withSidebar) || (showGallery && !isFloating);

                    },
                    "adsinitialized:playing,adtagurl,inlinevastxml": function(playing, adsTagURL, inlineVastXML) {
                        if (this.get("adsinitialized")) {
                            if (this.__adInitilizeChecker) this.__adInitilizeChecker.clear();
                            return true;
                        }
                        if (playing) {
                            if (this.__adInitilizeChecker) this.__adInitilizeChecker.clear();
                            return true;
                        }
                        if (!!adsTagURL || !!inlineVastXML && !this.get("adshassource")) {
                            this.set("adshassource", true);
                            this.set("adsplayer_active", !this.get("delayadsmanagerload"));
                            // On error, we're set initialized to true to prevent further attempts
                            // in case if ads will not trigger any event, we're setting initialized to true after defined seconds and wil show player content
                            if (!this.__adInitilizeChecker && this.get("showplayercontentafter")) {
                                this.__adInitilizeChecker = Async.eventually(function() {
                                    if (!this.get("adsinitialized")) this.set("adsinitialized", true);
                                }, this, this.get("showplayercontentafter"));
                            }
                            this.once("ad:adCanPlay", function() {
                                if (this.__adInitilizeChecker) this.__adInitilizeChecker.clear();
                                this.set("adsinitialized", true);
                            });
                            this.once("ad:ad-error", function() {
                                if (this.__adInitilizeChecker) this.__adInitilizeChecker.clear();
                                this.set("adsinitialized", true);
                            }, this);
                        } else {
                            return false;
                        }
                    },
                    "containerSizingStyles:aspect_ratio,height,width,floating_height,floating_width,floating_top,floating_right,floating_bottom,floating_left,is_floating,adsinitialized,states.hiddenelement": function(aspectRatio, height, width, floatingHeight, floatingWidth, floatingTop, floatingRight, floatingBottom, floatingLeft, isFloating, adsInitialized, hiddenelement) {
                        var containerStyles, styles, calculated;
                        styles = {
                            aspectRatio: aspectRatio
                        };
                        if (isFloating && !this.get("fullscreened")) {
                            calculated = this.__calculateFloatingDimensions();

                            styles.position = "fixed";

                            floatingTop = floatingTop || calculated.floating_top;
                            floatingBottom = floatingBottom || calculated.floating_bottom;
                            floatingRight = floatingRight || calculated.floating_right;
                            floatingLeft = floatingLeft || calculated.floating_left;

                            if (floatingTop !== undefined) styles.top = parseFloat(floatingTop).toFixed() + 'px';
                            if (floatingRight !== undefined) styles.right = parseFloat(floatingRight).toFixed() + 'px';
                            if (floatingBottom !== undefined) styles.bottom = parseFloat(floatingBottom).toFixed() + 'px';
                            if (floatingLeft !== undefined) styles.left = parseFloat(floatingLeft).toFixed() + 'px';

                            floatingWidth = calculated.floating_width || floatingWidth;
                            floatingHeight = calculated.floating_height || floatingHeight;

                            if (floatingWidth) width = floatingWidth;
                            if (floatingHeight) height = floatingHeight;
                        }

                        if (height) styles.height = isNaN(height) ? height : parseFloat(height).toFixed(2) + "px";
                        if (width) styles.width = isNaN(width) ? width : parseFloat(width).toFixed(2) + "px";

                        // If we have an ads and before content we will not show the player poster with loader at all
                        if ((this.get("adshassource") && !adsInitialized) && this.get("hidebeforeadstarts") && (this.get("autoplay") || this.get("outstream"))) styles.opacity = 0;

                        containerStyles = styles;
                        if (this.activeElement()) {
                            // if element is sticky no need, to apply styles which are position with fixed
                            if (!isFloating) {
                                this._applyStyles(this.activeElement(), containerStyles || styles, !isFloating ? this.__lastContainerSizingStyles : null);
                                this.__lastContainerSizingStyles = containerStyles || styles;
                            }

                            if ((this.get("adshassource") && adsInitialized) && this.__lastContainerSizingStyles && (this.__lastContainerSizingStyles.opacity === 0 || this.__lastContainerSizingStyles.display === 'none')) {
                                this.__lastContainerSizingStyles.opacity = null;
                                this.__lastContainerSizingStyles.display = (containerStyles || styles).display;
                                this._applyStyles(this.activeElement(), containerStyles || styles, this.__lastContainerSizingStyles);
                            }

                            if (containerStyles.width && (containerStyles.width).toString().includes("%") && (styles.width).toString().includes("%")) {
                                // If container width is in percentage, then we need to set the width of the player to auto
                                // in other case width will be applied twice
                                styles.width = "100%";
                            }

                            if (hiddenelement && !hiddenelement.visible) {
                                this.set("states.hiddenelement.styles.display", containerStyles.display);
                                this._applyStyles(this.activeElement(), {
                                    display: 'none'
                                }, this.__lastContainerSizingStyles || null);
                            }
                        }
                        return styles;
                    },
                    "cssfloatingclasses:is_floating": function() {
                        return [
                            this.get("cssplayer") + "-floating",
                            this.get("csscommon") + "-sticky",
                            this.get("csscommon") + "-sticky-" + this.get("sticky-position") || this.get("floatingoptions.desktop.position") || "bottom-right",
                            this.StickyHandler && this.StickyHandler.elementWasDragged() ? "ba-commoncss-fade-up" : ""
                        ].join(" ");
                    },
                    "buffering:buffered,position,last_position_change_delta,playing": function(buffered, position, ld, playing) {
                        if (playing) this.__playedStats(position, this.get("duration"));
                        return this.get("playing") && this.get("buffered") < this.get("position") && this.get("last_position_change_delta") > 1000;
                    },
                    "is_floating:view_type": function(view_type) {
                        return view_type === "float" || ((view_type !== undefined && !this.get("fullscreened")) && this.get("floatingoptions.floatingonly"));
                    },
                    "layout:mobileviewport": function(mobileviewport) {
                        return mobileviewport ? "mobile" : "desktop";
                    },
                    "placement:outstream": function(outstream) {
                        return outstream ? "outstream" : "instream";
                    },
                    "quartile:passed-quarter,playing": function(passedQuarter, playing) {
                        if (this.get("position") === 0 && !playing) return null;
                        return ["first", "second", "third", "fourth"][passedQuarter];
                    },
                    "orientation:videowidth,videoheight,fallback-aspect-ratio": function(videoWidth, videoHeight, fallbackAspectRatio) {
                        var fallbackDimensions = fallbackAspectRatio.split("/");
                        var width = videoWidth || fallbackDimensions[0];
                        var height = videoHeight || fallbackDimensions[1];
                        if (width === height) return "square";
                        return width > height ? "landscape" : "portrait";
                    }
                },

                remove_on_destroy: true,

                create: function(repeat) {
                    repeat = repeat || false;
                    this.set("repeatedplayer", repeat);
                    this.__attachPlayerInteractionEvents();
                    this._dataset = this.auto_destroy(new DatasetProperties(this.activeElement()));
                    this._dataset.bind("layout", this.properties());
                    this._dataset.bind("placement", this.properties());
                    this._dataset.bind("quartile", this.properties());
                    this._dataset.bind("adsquartile", this.properties());
                    this._dataset.bind("adsplaying", this.properties());
                    this._dataset.bind("visibility", this.properties(), {
                        secondKey: "view_type"
                    });
                    this._dataset.bind("orientation", this.properties());
                    if (typeof this.get("showsettings") !== "undefined")
                        this.set("showsettingsmenu", this.get("showsettings"));
                    this.delegateEvents(null, this.channel("ads"), "ad");
                    this.delegateEvents(null, this.channel("next"), "next");
                    this.set("prominent_title", this.get("prominent-title"));
                    this.set("closeable_title", this.get("closeable-title"));
                    // NOTE: below condition has to be before ads initialization
                    if (this.get("autoplaywhenvisible")) this.set("autoplay", true);
                    this.__initFloatingOptions();
                    this._observer = new ResizeObserver(function(entries) {
                        for (var i = 0; i < entries.length; i++) {
                            this.trigger("resize", {
                                width: entries[i].contentRect.width,
                                height: entries[i].contentRect.height
                            });
                        }
                    }.bind(this));
                    this.initAdSources();
                    this._observer.observe(this.activeElement().firstChild);
                    this._validateParameters();
                    // Will set volume initial state
                    this.set("initialoptions", Objs.tree_merge(this.get("initialoptions"), {
                        volumelevel: this.get("volume"),
                        autoplay: this.get("autoplay")
                    }));
                    if (this.get("sample_brightness")) {
                        this.__brightnessSampler = this.auto_destroy(new Timers.Timer({
                            delay: 1000 / (this.get("sample_brightness_rate") || 10),
                            fire: function() {
                                if (!this.player) return;
                                var lightLevel = this.player.lightLevel(this.get("sample_brightness_sample_size"), this.get("sample_brightness_sample_areas"));
                                if (Array.isArray(lightLevel)) lightLevel = lightLevel.map(function(level) {
                                    return level * 100 / 255;
                                });
                                else lightLevel = lightLevel * 100 / 255;
                                this.set("brightness", lightLevel);
                            }.bind(this),
                            start: false
                        }));
                    }
                    if (this.get("fullscreenmandatory")) {
                        if (!(document.fullscreenEnabled || document.mozFullscreenEnabled ||
                                document.webkitFullscreenEnabled || document.msFullscreenEnabled)) {
                            this.set("skipinitial", true);
                            this.set("showbuiltincontroller", true);
                        }
                    }
                    if (this.get("autoplay") || this.get("playwhenvisible")) {
                        // check in which option player allow autoplay
                        this.__testAutoplayOptions();
                        // Safari is behaving differently on the Desktop and Mobile
                        // preload in desktop allow autoplay. In mobile, it's preventing autoplay
                        if (Info.isSafari()) this.set("preload", !Info.isMobile());
                        // In Safari Desktop can cause trouble on preload, if the user will
                    }

                    if (this.get("presetedtooltips") && this.get("presetedtooltips.onplayercreate")) {
                        this.showTooltip(this.get("presetedtooltips.onplayercreate"));
                    }

                    if (this.get("theme")) this.set("theme", this.get("theme").toLowerCase());
                    if (this.get("theme") in Assets.playerthemes) {
                        Objs.iter(Assets.playerthemes[this.get("theme")], function(value, key) {
                            if (!this.isArgumentAttr(key))
                                this.set(key, value);
                        }, this);
                    }

                    if (!this.get("themecolor"))
                        this.set("themecolor", "default");

                    if (this.get("playlist") && this.get("playlist").length > 0) {
                        var pl0 = (this.get("playlist"))[0];
                        if (pl0 && Types.is_object(pl0)) {
                            this.set("poster", pl0.poster);
                            this.set("source", pl0.source);
                            this.set("sources", pl0.sources);
                        }
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
                    // mobileviewport different from mobileview, as mobileview will get player itself mobileview, mobileviewport from screen size
                    var clientWidth = window.innerWidth || document.documentElement.clientWidth ||
                        document.body.clientWidth;
                    this.set("mobileviewport", this.isMobile() || clientWidth <= 560);
                    this.set("hasnext", this.get("loop") || this.get("loopall") || this.get("playlist") && this.get("playlist").length > 1);
                    // For Apple, it's very important that their users always remain in control of the volume of the sounds their devices emit
                    this.set("hidevolumebar", (Info.isMobile() && Info.isiOS()));
                    this.set("duration", this.get("totalduration") || 0.0);
                    this.set("position", 0.0);
                    this.set("buffered", 0.0);
                    this.set("passed-quarter", 0);
                    this.set("played-seconds", 0);
                    this.set("last-played-position", 0);
                    this.set("player-started", false);
                    this.set("last-seen-position", this.get("volume") > 0.2 ? 1 : 0);
                    this.set("message", "");
                    this.set("fullscreensupport", false);
                    this.set("csssize", "normal");

                    // this.set("loader_active", false);
                    // this.set("playbutton_active", false);
                    // this.set("controlbar_active", false);
                    // this.set("message_active", false);
                    // this.set("settingsmenu_active", false);

                    this.set("last_activity", Time.now());
                    this.set("activity_delta", 0);
                    this.set("passed_after_play", 0);

                    this.set("playing", false);

                    this.__attachRequested = false;
                    this.__activated = false;
                    this.__error = null;

                    if (document.onkeydown)
                        this.activeElement().onkeydown = this._keyDownActivity.bind(this, this.activeElement());

                    this.on("change:tracktags", function() {
                        if (typeof this.__video !== 'undefined')
                            this.__trackTags = new TrackTags({}, this);
                    }, this);

                    this.host = this.auto_destroy(new Host({
                        stateRegistry: new ClassRegistry(this.cls.playerStates())
                    }));
                    this.host.dynamic = this;
                    this.set("state", this._initialState.classname ? this._initialState.classname.split(".").slice(-1)[0] : this._initialState);
                    this.host.on("next", function(state) {
                        this.set("state", state);
                    }, this);
                    this.host.initialize(this._initialState);

                    this.__adsControlPosition = 0;
                    this._timer = this.auto_destroy(new Timers.Timer({
                        context: this,
                        fire: this._timerFire,
                        delay: 100,
                        start: true
                    }));

                    this.activeElement().style.setProperty("display", "flex");

                    // to detect only video playing container dimensions, when there also sidebar exists
                    this.__playerContainer = this.activeElement().querySelector("[data-selector='ba-player-container']");

                    // Floating and Sticky
                    this.set("floating_height", this.get("mobileview") ? this.get("floatingoptions.mobile.height") : this.get("floatingoptions.desktop.height"));

                    if (!this.get("sticky") && this.get("floatingoptions.floatingonly")) {
                        this.set("view_type", "float");
                    } else {
                        // If sticky is enabled, disable only floating
                        this.set("floatingoptions.floatingonly", false);
                        var stickyOptions = {
                            threshold: this.get("sticky-threshold"),
                            paused: this.get("sticky-starts-paused") || !this.get("sticky"),
                            "static": this.get("floatingoptions.static"),
                            "noFloatOnDesktop": this.get("floatingoptions.noFloatOnDesktop"),
                            "noFloatOnMobile": this.get("floatingoptions.noFloatOnMobile"),
                            "noFloatIfBelow": this.get("floatingoptions.noFloatIfBelow"),
                            "noFloatIfAbove": this.get("floatingoptions.noFloatIfAbove")
                        };
                        this.stickyHandler = this.auto_destroy(new StickyHandler(
                            this.activeElement().firstChild,
                            this.activeElement(),
                            stickyOptions
                        ));
                        this.stickyHandler.on("transitionToFloat", function() {
                            this.set("view_type", "float");
                        }, this);
                        this.stickyHandler.on("transitionToView", function() {
                            this.set("view_type", "default");
                        }, this);
                        this.stickyHandler.on("transitionOutOfView", function() {
                            this.set("view_type", "out_of_view");
                        }, this);
                        this.delegateEvents(null, this.stickyHandler);
                        this.stickyHandler.init();
                    }

                    if (!this.get("floatingoptions.floatingonly") && !this.get("sticky"))
                        this._applyStyles(this.activeElement(), this.get("containerSizingStyles"));
                },

                initMidRollAds: function() {
                    var schedules;
                    // Split all via comma exclude inside brackets
                    schedules = Objs.map(this.get("adsposition").split(/(?![^)(]*\([^)(]*?\)\)),(?![^\[]*\])/), function(item) {
                        return item.trim();
                    }, this);

                    if (schedules.length > 0) {
                        this.set("midrollads", []);
                        this.__adMinIntervals = this.get("minadintervals");
                        this.__adsControlPosition = 0;
                        // This will be called in the next video cases
                        if (schedules.length > 0) {
                            Objs.iter(schedules, function(schedule, index) {
                                schedule = schedule.toLowerCase();
                                // if user set schedule with time settings
                                if (/^mid\[[\d\s]+(,[\d\s]+|[\d\s]+\%|\%|[\d\s]+\*|\*)*\]*$/i.test(schedule)) {
                                    var _s = schedule.replace('mid[', '').replace(']', '');
                                    Objs.map(_s.split(','), function(item) {
                                        item = item.trim();
                                        if (/^[\d\s]+\*$/.test(item)) {
                                            item = +item.replace("\*", '');
                                            this.on("change:duration", function(duration) {
                                                if (duration > 0) {
                                                    var step = Math.floor(duration / item);
                                                    if (duration > item) {
                                                        for (var i = 1; i <= step; i++) {
                                                            this.get("midrollads").push({
                                                                position: i * item
                                                            });
                                                        }
                                                    }
                                                }
                                            }, this);
                                        } else {
                                            if (/^[\d\s]+\%$/.test(item)) {
                                                item = parseInt(item.replace('%', '').trim(), 10);
                                                if (item < 100 && item > 0) {
                                                    this.get("midrollads").push({
                                                        position: parseFloat((item / 100).toFixed(2))
                                                    });
                                                }
                                            } else {
                                                // the user also set 0 to 1 value, as percentage, more 1 means seconds
                                                this.get("midrollads").push({
                                                    position: parseFloat(item)
                                                });
                                            }
                                        }
                                    }, this);
                                } else {
                                    if (/^mid\[.*?\]$/.test(schedule))
                                        console.log('Seems your mid roll settings does not correctly set. It will be played only in the middle of the video.');
                                    if (/^mid$/.test(schedule)) {
                                        this.get("midrollads").push({
                                            position: 0.5
                                        });
                                    }
                                }

                                // After iteration completing. If adsCollections existed should be destroyed
                                if (((index + 1) === schedules.length) && !!this._adsRollPositionsCollection) {
                                    this._adsRollPositionsCollection.destroy();
                                    this._adsRollPositionsCollection = null;
                                }
                            }, this);
                        }
                    }
                },

                getMediaType: function() {
                    return "video";
                },

                _initialState: InitialState,

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

                /**
                 *
                 * @param {object} settingObject
                 */
                addSettingsMenuItem: function(settingObject) {
                    this.__settingsMenu.execute('add_new_settings_item', settingObject);
                },

                /**
                 *
                 * @param {string} id
                 * @param {object} updatedSettingObject
                 */
                updateSettingsMenuItem: function(id, updatedSettingObject) {
                    this.__settingsMenu.execute('update_new_settings_item', id, updatedSettingObject);
                },

                /**
                 *
                 * @param {string} id
                 */
                removeSettingsMenuItem: function(id) {
                    this.__settingsMenu.execute('remove_settings_item', id);
                },

                toggle_pip: function() {
                    if (this.player.isInPIPMode())
                        this.player.exitPIPMode();
                    else
                        this.player.enterPIPMode();
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
                    var isLocal = typeof this.get("poster") === 'object';
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
                    // If a type of source of image is a Blob object, convert it to URL
                    img.src = isLocal ? (window.URL || window.webkitURL).createObjectURL(this.get("poster")) : this.get("poster");
                },

                _detachVideo: function() {
                    this.set("playing", false);
                    if (this.player) this.player.weakDestroy();
                    this.player = null;
                    this.__video = null;
                    this.set("videoelement_active", false);
                },

                _validateParameters: function() {
                    var fitStrategies = ["crop", "pad", "original"];
                    var stickyPositions = ["top-left", "top-right", "bottom-right", "bottom-left"];
                    var mobilePositions = ["top", "bottom"];
                    if (!fitStrategies.includes(this.get("videofitstrategy"))) {
                        console.warn("Invalid value for videofitstrategy: " + this.get("videofitstrategy") + "\nPossible values are: " + fitStrategies.slice(0, -1).join(", ") + " or " + fitStrategies.slice(-1));
                    }
                    if (!fitStrategies.includes(this.get("posterfitstrategy"))) {
                        console.warn("Invalid value for posterfitstrategy: " + this.get("posterfitstrategy") + "\nPossible values are: " + fitStrategies.slice(0, -1).join(", ") + " or " + fitStrategies.slice(-1));
                    }
                    if (this.get("stretch") || this.get("stretchwidth") || this.get("stretchheight")) {
                        console.warn("Stretch parameters were deprecated, your player will stretch to the full container width by default.");
                    }
                    if (this.get("sticky") && !stickyPositions.includes(this.get("sticky-position") || this.get("floatingoptions").desktop.position)) {
                        console.warn("Invalid option for attribute sticky-position: " + this.get("sticky-position"));
                        console.warn("Please choose one of the following values instead:", stickyPositions);
                        this.set("sticky-position", "bottom-right");
                    }
                    if (this.get("sticky") && !(mobilePositions.includes(this.get("floatingoptions").mobile))) {
                        console.warn("Please choose one of the following values instead:", mobilePositions);
                    }

                    var deprecatedCSS = ["minheight", "minwidth", "minheight", "minwidth", {
                        "sticky-position": "floatingoptions.desktop.position"
                    }];
                    deprecatedCSS.forEach(function(parameter) {
                        if (Types.is_string(parameter)) {
                            if (this.get(parameter))
                                console.warn(parameter + " parameter was deprecated, please use CSS instead.");
                        } else {
                            var key = Object.keys(parameter)[0];
                            if (this.get(key)) {
                                console.warn(key + " parameter was deprecated, please use " + parameter[key] + " instead.");
                            }
                        }
                    }.bind(this));
                },

                getCurrentPosition: function() {
                    if (this.videoAttached()) {
                        return this.player._element.currentTime;
                    } else {
                        return NaN;
                    }
                },

                _attachVideo: function(silent) {
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
                    // Just in case, be sure that player's controllers will be hidden
                    video.controls = this.get("showbuiltincontroller");
                    if (!this.get("allowpip"))
                        video.disablePictureInPicture = true;
                    VideoPlayerWrapper.create(Objs.extend(this._getSources(), {
                        element: video,
                        onlyaudio: this.get("onlyaudio"), // Will fix only audio local playback bug
                        preload: !!this.get("preload"),
                        loop: !!this.get("loop") || (this.get("lastplaylistitem") && this.get("loopall")),
                        reloadonplay: this.get('playlist') && this.get("playlist").length > 0 ? true : !!this.get("reloadonplay"),
                        fullscreenedElement: this.activeElement().childNodes[0],
                        loadmetadata: Info.isChrome() && this.get("skipinitial")
                    })).error(function(e) {
                        if (this.destroyed())
                            return;
                        this._error("attach", e);
                    }, this).success(function(instance) {
                        if (this.destroyed())
                            return;
                        this.player = instance;
                        this.delegateEvents(null, this.player, "player");
                        this.__video = video;
                        // On autoplay video, silent attach should be false
                        this.set("silent_attach", (silent && !this.get("autoplay")) || this._prerollAd || false);

                        if (this.get("chromecast")) {
                            if (!this.get("skipinitial")) this.set("skipinitial", true);
                            this._broadcasting = new Broadcasting({
                                player: instance,
                                commonOptions: {
                                    title: this.get("title"),
                                    poster: this.player._element.poster,
                                    currentPosition: this.get("position"),
                                    chromecastReceiverAppId: this.get("chromecastreceiverappid")
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
                                this.player.on("cast-state-changed", function(status, states) {
                                    // Other states: CONNECTED, CONNECTING, NOT_CONNECTED
                                    this.set("castbuttonvisble", status !== states.NO_DEVICES_AVAILABLE);
                                    this.set("chromecasting", status === states.CONNECTED);
                                }, this);
                                this.player.on("cast-loaded", function(castRemotePlayer, castRemotePlayerController) {
                                    this.set("broadcasting", true);
                                    // If player already start to play
                                    if (this.get("position") > 0) {
                                        this._broadcasting._seekToGoogleCast(this.get("position"));
                                        this._broadcasting._googleCastRemotePlay();
                                    }

                                    //If local player playing stop it before
                                    if (this.get('playing')) this.pause();

                                    // Initial play button state
                                    this.player.on("cast-paused", function(castPaused) {
                                        this.set("playing", !castPaused);
                                    }, this);
                                }, this);

                                this.player.on("cast-playpause", function(castPaused) {
                                    this.set("playing", !castPaused);
                                }, this);

                                this.player.on("cast-time-changed", function(currentTime, totalMediaDuration) {
                                    if (!Types.is_defined(currentTime) || currentTime === 0)
                                        return;
                                    if (totalMediaDuration) {
                                        this.set("cahched", totalMediaDuration);
                                        this.set("duration", totalMediaDuration || 0.0);
                                    }
                                    this.set("position", currentTime);
                                    this.set("videoelement_active", false);
                                    this.set("imageelement_active", true);
                                }, this);

                                this.player.on("proceed-when-ending-googlecast", function(position, isPaused) {
                                    this.set("broadcasting", false);
                                    this.set("videoelement_active", true);
                                    this.set("imageelement_active", false);
                                    this.player._broadcastingState.googleCastConnected = false;
                                    this.set("playing", false);
                                    this.trigger("seek", position);
                                    this.player.setPosition(position);
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

                        // All conditions below appear on autoplay only
                        // If the browser not allows unmuted autoplay, and we have manually forcibly muted player
                        // If user already has an interaction with player, we don't need to check it again
                        if (!this.get("userhadplayerinteraction")) this._checkAutoPlay(this.__video);
                        this.player.on("postererror", function() {
                            this._error("poster");
                        }, this);
                        if (!this.get("playedonce")) {
                            this.player.once("playing", function() {
                                this.set("playedonce", true);
                                this.set("playbackcount", 1);
                            }, this);
                        }
                        this.player.on("playing", function() {
                            if (this.get("sample_brightness")) this.__brightnessSampler.start();
                            if (this.get("sticky") && this.stickyHandler) this.stickyHandler.start();
                            this.set("playing", true);
                            this.trigger("playing");
                        }, this);
                        this.player.on("loaded", function() {
                            this.set("videowidth", this.player.videoWidth());
                            this.set("videoheight", this.player.videoHeight());
                            if (this.get("sample_brightness")) this.__brightnessSampler.fire();
                        }, this);
                        this.player.on("error", function(e) {
                            this._error("video", e);
                        }, this);
                        if (this.player.error())
                            this.player.trigger("error", this.player.error());
                        this.player.on("paused", function() {
                            if (this.get("sample_brightness")) this.__brightnessSampler.stop();
                            this.set("playing", false);
                            this.trigger("paused");
                        }, this);
                        this.player.on("ended", function() {
                            if (this.get("sample_brightness")) this.__brightnessSampler.stop();
                            this.set("playing", false);
                            this.set('playedonce', true);
                            this.set("playbackended", this.get('playbackended') + 1);
                            this.set("settingsmenu_active", false);
                            if (this.get("starttime")) {
                                this.player.setPosition(this.get("starttime") || 0);
                            }
                            this.trigger("ended");
                        }, this);
                        if (this.player._qualityOptions) {
                            this.addSettingsMenuItem({
                                id: "sourcequality",
                                label: "source-quality",
                                showicon: true,
                                visible: true, // TODO add parameter for setting source quality settings visibility
                                value: this.player._currentQuality.label,
                                options: this.player._qualityOptions.map(function(option) {
                                    return option.label;
                                }),
                                func: function(_, label) {
                                    this.player.trigger("setsourcequality", this.player._qualityOptions.find(function(option) {
                                        return option.label === label;
                                    }).id);
                                }
                            });
                            this.player.on("qualityswitched", function(currentQuality) {
                                this.updateSettingsMenuItem("sourcequality", {
                                    value: currentQuality.label
                                });
                            }.bind(this));
                        }
                        this.trigger("attached", instance);
                        this.player.once("loaded", function() {
                            this.channel("next").trigger("resetNextWidget");
                            var volume = Math.min(1.0, this.get("volume"));
                            this.player.setVolume(volume);
                            this.player.setMuted(this.get("muted") || volume <= 0.0);
                            if (!this.__trackTags && this.get("tracktags").length)
                                this.__trackTags = new TrackTags({}, this);
                            if (this.get("totalduration") || this.player.duration() < Infinity)
                                this.set("duration", this.get("totalduration") || this.player.duration());
                            this.set("fullscreensupport", this.player.supportsFullscreen(this.activeElement().childNodes[0]));
                            // As duration is credential, we're waiting to get duration info
                            this.on("chaptercuesloaded", function(chapters, length) {
                                this.set("chapterslist", chapters);
                            }, this);
                            if (this.get("initialseek"))
                                this.player.setPosition(this.get("initialseek"));
                            if (this.get("allowpip")) {
                                this.addSettingsMenuItem({
                                    id: 'pip',
                                    label: 'Picture-in-Picture',
                                    showicon: true,
                                    visible: this.player.supportsPIP(),
                                    func: function(settings) {
                                        this.player.on("pip-mode-change", function(ev, inPIPMode) {
                                            this.set("inpipmode", inPIPMode);
                                            this.updateSettingsMenuItem('pip', {
                                                value: inPIPMode
                                            });
                                        }, this);
                                        return !!this.toggle_pip();
                                    }
                                });
                            }
                        }, this);
                        if (this.player.loaded())
                            this.player.trigger("loaded");
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

                    this.__settingsMenu = this.scopes.settingsmenu;
                    if (this.__settingsMenu.get('settings'))
                        this.set("hassettings", true);

                    if (this.__attachRequested)
                        this._attachVideo();

                    this.activeElement().classList.add(this.get("csscommon") + "-full-width");

                    if (this.get("slim") === true) {
                        // We should add the CSS codes, and we are adding it here, to mark the player
                        this.activeElement().classList.add(this.get("csscommon") + "-slim");
                    }

                    var img = this.activeElement().querySelector('img[data-image="image"]');
                    var imgEventHandler = this.auto_destroy(new DomEvents());
                    imgEventHandler.on(img, "load", function() {
                        this.set("fallback-aspect-ratio", img.naturalWidth + "/" + img.naturalHeight);
                        imgEventHandler.destroy();
                    }, this);
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

                toggleFullscreen: function() {
                    this.call("toggle_fullscreen");
                },

                getPlaybackCount: function() {
                    return this.get("playbackcount");
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
                 */
                toggleTrackTags: function() {
                    if (!this.__trackTags) return;
                    this.set("tracktextvisible", !this.get("tracktextvisible"));
                    var status = this.get("tracktextvisible");
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
                    // Prevent white-space browser center scroll and arrow buttons behaviors
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

                showTooltip: function(tooltip) {
                    if (!Types.is_object(tooltip) || !tooltip.tooltiptext)
                        console.warn("Provided tooltip has to be an object, at least with 'tooltiptext' key");
                    var position = tooltip.position || 'top-right';
                    if (this.get("tooltips").count() > 0) this.hideTooltip(position);

                    this.get("tooltips").add({
                        id: Time.now(),
                        tooltiptext: tooltip.tooltiptext,
                        position: tooltip.position || 'top-right',
                        closeable: tooltip.closeable || false,
                        pauseonhover: tooltip.pauseonhover || false,
                        showprogressbar: tooltip.showprogressbar || false,
                        disappearafterseconds: tooltip.disappearafterseconds || 2,
                        showonhover: tooltip.showonhover || false,
                        queryselector: tooltip.queryselector || null
                    });
                    this.get("tooltips").add_secondary_index("position");
                },

                hideTooltip: function(position, id) {
                    var exists = this.get("tooltips").get_by_secondary_index("position", position, true);
                    if (exists) {
                        this.get("tooltips").remove(exists);
                    } else {
                        if (id) {
                            exists = this.get("tooltips").query({
                                id: id
                            });
                            if (exists) this.get("tooltips").remove(exists);
                        }
                    }
                },

                object_functions: ["play", "rerecord", "pause", "stop", "seek", "set_volume", "set_speed", "toggle_tracks"],

                functions: {

                    user_activity: function(strong) {
                        if (this.get('preventinteractionstatus')) return;
                        this._resetActivity();
                    },

                    message_click: function() {
                        this.trigger("message:click");
                        this.__setPlayerEngagement();
                    },

                    playbutton_click: function() {
                        this.__setPlayerEngagement();
                        this.trigger("playbuttonclick");
                        this.host.state().play();
                    },

                    play: function() {
                        this.__setPlayerEngagement();
                        this.trigger("playrequested");
                        if (this._delegatedPlayer) {
                            this._delegatedPlayer.execute("play");
                            return;
                        }
                        if (this.player && this.get("broadcasting")) {
                            this._broadcasting.player.trigger("play-google-cast");
                            return;
                        }
                        this.host.state().play();
                        this.set("manuallypaused", false);
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

                        if (this.get("playing_ad") || this.get("adsplaying"))
                            this.scopes.adsplayer.execute("pause");

                        if (this.get("playing")) {
                            if (this.player && this.get("broadcasting")) {
                                this._broadcasting.player.trigger("pause-google-cast");
                                return;
                            }
                            this.player.pause();
                        }

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
                        this.__setPlayerEngagement();
                        if (this.get("preventinteractionstatus")) return;
                        if (this._delegatedPlayer) {
                            this._delegatedPlayer.execute("seek", position);
                            return;
                        }
                        if (this.get('disableseeking')) return;
                        if (this.get("nextwidget")) this.channel("next").trigger("setStay");
                        if (this.videoLoaded()) {
                            if (position < this.get("position")) this.trigger("rewind");
                            if (position > this.player.duration())
                                this.player.setPosition(this.player.duration() - this.get("skipseconds"));
                            else if (this.get("starttime") && position < this.get("starttime")) {
                                this.player.setPosition(this.get("starttime"));
                            } else {
                                this.player.setPosition(position);
                                this.trigger("seek", position);
                            }
                        }
                        // In midroll ads we need recheck next ad position
                        if (this._adsRollPositionsCollection) {
                            if (this._adsRollPositionsCollection.count() > 0) {
                                this._adsRollPositionsCollection.iterate(function(curr) {
                                    if (curr.get("position") < position)
                                        this._nextRollPosition = null;
                                }, this);
                            }
                        }
                        this.__playedStats(position, this.get("duration"));
                    },

                    set_speed: function(speed, from_ui) {
                        this.__setPlayerEngagement();
                        if (!this.player) return false;
                        this.player.setSpeed(speed);
                        if (!from_ui) this.updateSettingsMenuItem("playerspeeds", {
                            value: parseFloat(speed.toFixed(2))
                        });
                        return speed;
                    },

                    set_volume: function(volume) {
                        this.__setPlayerEngagement();
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

                    toggle_settings_menu: function() {
                        this.set("settingsmenu_active", !this.get("settingsmenu_active"));
                    },

                    toggle_share: function() {
                        this.set("share_active", !this.get("share_active"));
                    },

                    toggle_fullscreen: function() {
                        this.__setPlayerEngagement();
                        if (this.get("preventinteractionstatus")) return;
                        if (this._delegatedPlayer) {
                            this._delegatedPlayer.execute("toggle_fullscreen");
                            return;
                        }
                        if (this.get("fullscreened")) {
                            Dom.documentExitFullscreen();
                        } else {
                            if (Info.isiOS() && Info.isMobile()) Dom.elementEnterFullscreen(this.activeElement().querySelector("video"));
                            else Dom.elementEnterFullscreen(this.activeElement().childNodes[0]);
                        }
                        this.set("fullscreened", !this.get("fullscreened"));
                    },

                    toggle_player: function() {
                        if (this.get("sticky") && this.stickyHandler && this.stickyHandler.isDragging()) {
                            this.stickyHandler.stopDragging();
                            return;
                        }
                        if (this.get("playing") && this.get("preventinteractionstatus")) return;
                        if (this._delegatedPlayer) {
                            this._delegatedPlayer.execute("toggle_player");
                            return;
                        }
                        if (this.get("unmuteonclick")) {
                            if (this.get("muted")) {
                                if (this.player) this.player.setMuted(false);
                                this.set("muted", false);
                            }
                            this.set("unmuteonclick", false);
                        } else if (this.get("playing") && this.get("pauseonclick")) {
                            this.pause();
                        } else if (!this.get("playing") && this.get("playonclick")) {
                            this.__setPlayerEngagement();
                            this.play();
                        }
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
                    },

                    toggle_tracks: function() {
                        this.toggleTrackTags(!this.get('tracktextvisible'));
                    },

                    pause_ads: function() {
                        this.channel("ads").trigger("pause");
                    },

                    resume_ads: function() {
                        this.__setPlayerEngagement();
                        this.channel("ads").trigger("resume");
                    },

                    close_floating: function(destroy) {
                        destroy = destroy || false;
                        this.trigger("floatingplayerclosed");
                        if (this.get("sticky") || this.get("floatingoptions.floatingonly")) {
                            this.pause();
                            if (this.stickyHandler) {
                                if (destroy) this.stickyHandler.destroy();
                                else this.stickyHandler.stop();
                            }
                            if (this.get("floatingoptions.hideplayeronclose") || this.get("floatingoptions.floatingonly")) {
                                // If player is not sticky but floating we need hide whole player,
                                // this is true also if we want to hide player container on floating close
                                // Hide container element if player will be destroyed
                                this.hidePlayerContainer();
                                if (destroy) this.destroy();
                            } else {
                                // If we want left player container visible and close floating player
                                this.set("view_type", "default");
                            }
                        } else {
                            this.hidePlayerContainer();
                            if (destroy) this.destroy();
                        }
                    }
                },

                destroy: function() {
                    if (this._observer) this._observer.disconnect();
                    this._detachVideo();
                    inherited.destroy.call(this);
                },

                _timerFire: function() {
                    if (this.destroyed())
                        return;
                    try {
                        var clientWidth = window.innerWidth || document.documentElement.clientWidth ||
                            document.body.clientWidth;
                        this.set("mobileviewport", this.isMobile() || clientWidth <= 560);
                        if (this.videoLoaded()) {
                            var _now = Time.now();
                            this.set("activity_delta", _now - this.get("last_activity"));
                            var new_position = this.player.position();
                            if (new_position !== this.get("position") || this.get("last_position_change"))
                                this.set("last_position_change", _now);
                            // Run each second not to fast
                            if (this.get("position") > 0.0 && this.__previousPostion !== Math.round(this.get("position"))) {
                                this.__previousPostion = Math.round(this.get("position"));
                                if (this.__previousPostion > 0) this.trigger("playing_progress", this.__previousPostion);
                            }
                            // var midPreAdRolls = (this._adsRoll || this._prerollAd);
                            // // Check in the last 3 seconds if nonLinear is showing and disable it
                            // if ((this.get("duration") > 0 && new_position > 10) && (this.get("duration") - new_position) > 3) {
                            //     if (midPreAdRolls && typeof midPreAdRolls.manuallyEndAd === "function" && !midPreAdRolls._isLinear) {
                            //         midPreAdRolls.manuallyEndAd();
                            //     }
                            // }
                            // If play action will not set the silent_attach to false.
                            if (new_position > 0.0 && this.get("silent_attach")) {
                                this.set("silent_attach", false);
                            }
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
                            if (!this.get("broadcasting")) {
                                this.set("last_position_change_delta", _now - this.get("last_position_change"));
                                this.set("position", new_position);
                                this.set("buffered", this.player.buffered());
                                var pld = this.player.duration();
                                if (0.0 < pld && pld < Infinity)
                                    this.set("duration", this.player.duration());
                                else
                                    this.set("duration", this.get("totalduration") || new_position);
                            }
                            this.set("fullscreened", this.player.isFullscreen(this.activeElement().childNodes[0]));
                            // If setting pop-up is open, hide it together with a control-bar if hideOnInactivity is true
                            if (this.get('hideoninactivity') && (this.get('activity_delta') > this.get('hidebarafter'))) {
                                this.set("settingsmenu_active", false);
                            }
                            // We need this part run each second not too fast, this.__adsControlPosition will control it
                            if (this.__adsControlPosition < this.get("position")) {
                                this.__adsControlPosition = Math.ceil(this.get("position"));
                                this.__controlAdRolls();
                            }
                        }
                    } catch (e) {}
                    try {
                        this._updateCSSSize();
                    } catch (e) {}
                },

                _updateCSSSize: function() {
                    var width;
                    if (this.get("is_floating") && this.get("with_sidebar")) {
                        // with sidebar, we need to get only video player width not whole container
                        width = Dom.elementDimensions(this.__playerContainer || this.activeElement()).width;
                    } else {
                        width = Dom.elementDimensions(this.activeElement()).width;
                    }
                    this.set("csssize", width > 400 ? "normal" : (width > 320 ? "medium" : "small"));
                    this.set("mobileview", width < 560);
                },

                videoHeight: function() {
                    if (this.videoAttached())
                        return this.player.videoHeight();
                    var img = this.activeElement().querySelector("img");
                    // In Safari img && img.height could return 0
                    if (Types.is_defined(img) && img.height) {
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
                    // In Safari img && img.width could return 0
                    if (Types.is_defined(img) && img.width) {
                        var clientWidth = (window.innerWidth || document.body.clientWidth);
                        if (img.width > clientWidth)
                            return clientWidth;
                        return img.width;
                    }
                    return NaN;
                },

                hidePlayerContainer: function() {
                    // If no there will be "states.hiddenelement.visible" condition, states will be overwritten
                    if (this.activeElement() && this.get("states.hiddenelement.visible")) {
                        this.set("states.hiddenelement.dimensions", Dom.elementDimensions(this.activeElement()));
                        // save last display style for the hidden element
                        this.set("states.hiddenelement.styles.display", this.activeElement().style.display);
                        this._applyStyles(this.activeElement(), {
                            display: 'none'
                        }, this.__lastContainerSizingStyles);
                        // If floating sidebar then it will be hidden via player itself so not set companionads as []
                        if (this.scopes.adsplayer) this.scopes.adsplayer.execute("hideCompanionAd");
                        this.set("states.hiddenelement.visible", false);
                        this.set("adsplayer_active", false);
                        if (this.get("playing")) {
                            this.pause();
                            this.set("states.hiddenelement.playing", true);
                        }
                    }
                },

                showHiddenPlayerContainer: function() {
                    // Resume sticky handler if it is not destroyed
                    if (this.stickyHandler && !this.stickyHandler.destroyed() && this.stickyHandler.observing === false) {
                        this.stickyHandler.resume();
                    }
                    // If player is visible no need todo anything
                    if (this.get("states.hiddenelement.visible")) return;
                    if (this.activeElement()) {
                        this.set("states.hiddenelement.visible", true);
                        this._applyStyles(this.activeElement(), {
                            display: this.get("containerSizingStyles.display") || 'flex'
                        });
                        if (this.get("states.hiddenelement.playing")) this.play();
                    }
                },

                resetAdsPlayer: function() {
                    if (this.get("adsplayer_active")) this.set("adsplayer_active", false);
                    this.set("adsplayer_active", true);
                },

                getNextOutstreamAdTagURLs: function(immediate) {
                    immediate = immediate || false;
                    var promise = Promise.create();
                    if (this.get("outstreamoptions.maxadstoshow") === 0) {
                        return promise.asyncError("Limit of showing ads exceeded.", true);
                    }
                    if ((this.get("nextadtagurls") && this.get("nextadtagurls").length > 0) || (this.get("adtagurlfallbacks") && this.get("adtagurlfallbacks").length > 0)) {
                        promise.asyncSuccess(this.get("nextadtagurls").length > 0 ? this.get("nextadtagurls").shift() : this.get("adtagurlfallbacks").shift());
                    } else {
                        Async.eventually(function() {
                            var _promise = this.requestForTheNextAdTagURL();
                            var isGlobalPromise = typeof _promise.then === "function";
                            return Types.is_function(this.requestForTheNextAdTagURL) ?
                                _promise[isGlobalPromise ? 'then' : 'success'](function(response) {
                                    return promise.asyncSuccess(response);
                                }, this)[isGlobalPromise ? 'catch' : 'error'](function(error) {
                                    return promise.asyncError(error);
                                }, this) :
                                console.log("Please define requestForTheNextAdTagURL method with Promise.");
                        }, this, immediate ? 100 : this.get("outstreamoptions.recurrenceperiod") || 30000);
                    }
                    return promise;
                },

                /**
                 * This method should be overwritten.
                 * @return {*}
                 */
                requestForTheNextAdTagURL: function() {
                    var promise = Promise.create();
                    // inherit this function from the parent player and set a new next ad tag
                    promise.asyncSuccess([]);
                    return promise;
                },

                /**
                 * @param immediate
                 * @param stateContext
                 * @param nextState
                 * @private
                 */
                setNextOutstreamAdTagURL: function(immediate, stateContext, nextState) {
                    immediate = immediate || false;
                    // if we have set nextadtagurls, then we will try to load next adtagurl
                    this.getNextOutstreamAdTagURLs(immediate)
                        .success(function(response) {
                            if (typeof response === "string") {
                                this.set("adtagurl", response);
                            } else if (response && typeof response.shift === "function" && response.length > 0) {
                                this.set("adtagurl", response.shift());
                                // if still length is more than 0, then set it to nextadtagurls
                                if (response.length > 0) this.set("nextadtagurls", response);
                            } else {
                                return this.setNextOutstreamAdTagURL(immediate, stateContext, nextState);
                            }

                            if ((!immediate && this.scopes.adsplayer) || this.get("adsmanagerloaded")) {
                                this.resetAdsPlayer();
                            }

                            if (stateContext && nextState) {
                                return stateContext.next(nextState);
                            } else {
                                return stateContext.next("LoadAds", {
                                    position: 'outstream'
                                });
                            }
                        }, this)
                        .error(function(err, complete) {
                            console.log("Error on getting next outstream tag", err);
                            if (!complete) return stateContext.next("LoadPlayer");
                        }, this);
                },

                aspectRatio: function() {
                    // Don't use a shortcut way of getting an aspect ratio, will act as not expected.
                    var height = this.videoHeight();
                    var width = this.videoWidth();

                    return width / height;
                },

                isPortrait: function() {
                    return this.aspectRatio() < 1.00;
                },

                isLandscape: function() {
                    return !this.isPortrait();
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

                cloneAttrs: function() {
                    return Objs.map(Types.is_function(this.attrs) ? this.attrs.call(this) : this.attrs, function(value, key) {
                        return this.get(key);
                    }, this);
                },

                isHD: function() {
                    if (this.videoAttached()) {
                        return (this.videoWidth() * this.videoHeight()) >= 1280 * 720;
                    } else {
                        var video_data;
                        if (this.get("stream") == null || this.get("stream") === "") {
                            video_data = this.get("video_data").default_stream;
                        } else {
                            for (var i = 0; i < this.get("video_data").streams.length; i++) {
                                if (this.get("video_data").streams[i].token === this.get("stream")) {
                                    return (this.get("video_data").streams[i].video_width * this.get("video_data").streams[i].video_height) >= 1280 * 720;
                                }
                            }
                        }
                        if (video_data) {
                            return (video_data.video_width * video_data.video_height) >= 1280 * 720;
                        } else {
                            return undefined;
                        }
                    }
                },

                isSD: function() {
                    return !this.isHD();
                },

                isMobile: function() {
                    return Info.isMobile();
                },

                popupAttrs: function() {
                    return {
                        autoplay: true,
                        popup: false,
                        width: this.get("popup-width"),
                        height: this.get("popup-height")
                    };
                },

                initAdSources: function() {
                    this.set("preloadadsmanager", false);
                    this.set("delayadsmanagerload", false);
                    if (
                        Array.isArray(this.get("adtagurlfallbacks")) &&
                        this.get("adtagurlfallbacks").length > 0 &&
                        !this.get("adtagurl") &&
                        !this.get("inlinevastxml")
                    ) this.set("adtagurl", this.get("adtagurlfallbacks").shift());
                    this.set("adshassource", !!this.get("adtagurl") || !!this.get("inlinevastxml"));

                    if (this.get("userhadplayerinteraction")) {
                        this.set("unmuteonclick", false);
                    }

                    // The initial mute state will not be changes if outstream is not set
                    if (this.get("outstream")) {
                        this.set("autoplay", true);
                        this.set("skipinitial", false);
                        this.set("unmuteonclick", !this.get("repeatedplayer"));
                        this.set("outstreamoptions", Objs.tree_merge(this.get("initialoptions").outstreamoptions, this.get("outstreamoptions")));
                        if (this.get("repeatedplayer")) {
                            this.set("wait-user-interaction", false);
                            this.set("autoplay-requires-muted", false);
                        }
                        if (Types.is_defined(this.get("outstreamoptions").corner) && this.activeElement()) {
                            var _corner = this.get("outstreamoptions").corner;
                            if (Types.is_boolean(_corner)) {
                                if (_corner) {
                                    this._applyStyles(this.activeElement().firstChild, {
                                        borderRadius: '10px'
                                    });
                                }
                            } else {
                                // it can be string ot numeric
                                this._applyStyles(this.activeElement().firstChild, {
                                    borderRadius: (Types.is_string(_corner) ? parseFloat(_corner.replace(/\D/g, '')).toFixed() : _corner) + 'px'
                                });
                            }
                        }
                    }

                    if (this.get("adshassource")) {
                        if (this.get("adsposition")) {
                            this.set("adsplaypreroll", this.get("adsposition").indexOf("pre") !== -1);
                            this.set("adsplaypostroll", this.get("adsposition").indexOf("post") !== -1);
                            this.initMidRollAds();
                        } else {
                            // if there's no specification, play preroll or VMAP if not set adsposition at all
                            this.set("vmapads", true);
                        }

                        this.set("preloadadsmanager", this.get("adsplaypreroll") || this.get("vmapads") || this.get("outstream"));
                        var skipInitialWithoutAutoplay = this.get("skipinitial") && !this.get("autoplay");
                        this.set("delayadsmanagerload", !this.get("preloadadsmanager") || skipInitialWithoutAutoplay);
                    }
                },

                /** @private */
                __initFloatingOptions: function() {
                    this.set("floatingoptions", Objs.tree_merge(
                        this.attrs().floatingoptions,
                        this.get("floatingoptions")
                    ));
                    Objs.iter(["mobile", "desktop"], function(view) {
                        var _floatingoptions = this.get("floatingoptions")[view];
                        if (_floatingoptions && _floatingoptions.size && _floatingoptions.availablesizes) {
                            var _availableSizes = _floatingoptions.availablesizes;
                            if (!Types.is_object(_availableSizes)) return;
                            Objs.keyMap(_availableSizes, function(v, k) {
                                if (Types.is_string(_floatingoptions.size) && k === _floatingoptions.size.toLowerCase()) {
                                    switch (view) {
                                        case "mobile":
                                            this.set("floatingoptions.mobile.height", v);
                                            break;
                                        case "desktop":
                                            this.set("floatingoptions.desktop.height", v);
                                            break;
                                    }
                                }
                            }, this);
                        }
                    }, this);
                },

                /**
                 * @private
                 */
                __calculateFloatingDimensions: function() {
                    var height, width, playerWidth, position, viewportOptions, response = {};
                    var aspectRatio = typeof this.get("aspect_ratio") === "string" ? this.get("aspect_ratio").split("/") : 1.77;
                    var isMobile = this.get("mobileviewport") || Info.isMobile();
                    if (Types.is_array(aspectRatio)) {
                        aspectRatio = aspectRatio[0] / aspectRatio[1];
                    }
                    aspectRatio = Number(parseFloat(aspectRatio).toFixed(2));
                    if (isMobile) {
                        response.floating_left = 0;
                        width = '100%'; // Not set via CSS, will break the player
                        viewportOptions = this.get("floatingoptions.mobile");
                        if (viewportOptions) {
                            height = +this.get("floatingoptions.mobile.height");
                            position = this.get("floatingoptions.mobile.position");
                        }
                        if (this.activeElement()) {
                            this.activeElement().classList.add(this.get("csscommon") + "-full-width");
                        }
                        if (typeof this.get("floatingoptions.mobile.sidebar") !== "undefined" && this.get("floatingoptions.sidebar"))
                            this.set("with_sidebar", this.get("floatingoptions.mobile.sidebar"));
                        if (typeof this.get("floatingoptions.mobile.positioning") === "object") {
                            var playerApplyForSelector, documentRelativeSelector, positioningApplySelector, positioningRelativeSelector, positioningProperty;
                            positioningApplySelector = this.get("floatingoptions.mobile.positioning.applySelector");
                            positioningRelativeSelector = this.get("floatingoptions.mobile.positioning.relativeSelector");
                            positioningProperty = Strings.camelCase(this.get("floatingoptions.mobile.positioning.applyProperty") || 'margin-top');
                            if (typeof positioningRelativeSelector === "string") {
                                if (positioningRelativeSelector)
                                    playerApplyForSelector = this.activeElement().querySelector(positioningApplySelector);
                                if (playerApplyForSelector) playerApplyForSelector = this.activeElement().firstChild;
                                documentRelativeSelector = document.querySelector(positioningRelativeSelector);
                                if (documentRelativeSelector && playerApplyForSelector) {
                                    var relativeSelectorHeight = Dom.elementDimensions(documentRelativeSelector).height;
                                    playerApplyForSelector.style[positioningProperty] = relativeSelectorHeight + 'px';
                                }
                            }
                        }
                    } else {
                        viewportOptions = this.get("floatingoptions.desktop");
                        if (viewportOptions) {
                            position = viewportOptions.position;
                            height = +viewportOptions.height;
                        }
                        if (this.activeElement()) {
                            this.activeElement().classList.remove(this.get("csscommon") + "-full-width");
                        }
                        if (typeof this.get("floatingoptions.desktop.sidebar") !== "undefined" && this.get("floatingoptions.sidebar"))
                            this.set("with_sidebar", this.get("floatingoptions.desktop.sidebar"));
                    }
                    position = position || this.get("sticky-position");
                    if (position) {
                        Objs.iter(["top", "right", "bottom", "left"], function(val) {
                            if (position.includes(val)) {
                                response['floating_' + val] = viewportOptions[val] ? viewportOptions[val] : 0;
                            }
                        }, this);
                    }
                    if (height)
                        height = +parseFloat(height).toFixed(2);
                    else height = isMobile ?
                        this.get("fallback-floating-mobile-height") :
                        this.get("fallback-floating-desktop-height");
                    // this.set("height", height);
                    playerWidth = Number(parseFloat(
                        aspectRatio > 1 ? (aspectRatio * height) : (height / aspectRatio)
                    ).toFixed(2));
                    if (this.get("with_sidebar") && !isMobile) {
                        width = playerWidth + Number(aspectRatio > 1 ? playerWidth : height);
                    }
                    response.floating_height = height;
                    response.player_width = playerWidth;
                    response.floating_width = width ? width : playerWidth;

                    // this.setAll(response);
                    return response;
                },

                /**
                 * Prepare for postoll and mid-roll ad managers
                 * @private
                 */
                __controlAdRolls: function() {
                    // If we have mid-rolls, then prepare mid-Rolls
                    if (
                        this.get("midrollads").length > 0 && this.get("duration") > 0.0 && !this._adsRollPositionsCollection
                    ) {
                        this._adsRollPositionsCollection = this.auto_destroy(new Collection()); // our adsCollections
                        if (this.get("midrollads").length > 0) {
                            var _current = null;
                            var _nextPositionIndex = null;
                            Objs.iter(this.get("midrollads"), function(roll, index) {
                                if (roll.position && roll.position > this.get("position")) {
                                    // First ad position, if less than 1 it means it's percentage not second
                                    var _position = roll.position < 1 ?
                                        Math.floor(this.get("duration") * roll.position) :
                                        roll.position;
                                    // If the user does not set, and we will not get the same ad position, avoids dublication,
                                    // prevent very close ads and also wrong set position which exceeds the duration
                                    if ((Math.abs(_position - _current) > this.__adMinIntervals) && _position < this.get("duration")) {
                                        _current = _position;
                                        _nextPositionIndex = index;
                                        this._adsRollPositionsCollection.add({
                                            position: _position,
                                            duration: null,
                                            type: 'linear',
                                            isLinear: true,
                                            dimensions: {
                                                width: Dom.elementDimensions(this.activeElement()).width || this.parentWidth(),
                                                height: Dom.elementDimensions(this.activeElement()).height || this.parentHeight()
                                            }
                                        });
                                    }
                                }
                            }, this);
                        }
                    } else {
                        this.__adMinIntervals = this.__adMinIntervals === 0 ?
                            this.get("minadintervals") : (this.__adMinIntervals - 1);
                    }

                    // Set a new position when ad should run
                    if (this._adsRollPositionsCollection && !this._nextRollPosition) {
                        var _counter = this._adsRollPositionsCollection.count();
                        var _removeCurr = null;
                        if (_counter > 0) {
                            var _nextAdPoint = {
                                position: -1,
                                nextPosition: this.get("duration"),
                                nextIsLast: true,
                                type: null
                            };
                            this._adsRollPositionsCollection.iterate(function(curr) {
                                _counter--;
                                if ((_nextAdPoint.position > curr.get("position") && _nextAdPoint.type) || _nextAdPoint.position === -1) {
                                    _removeCurr = curr;
                                    _nextAdPoint = _removeCurr.data();
                                }
                                // We need max close position to play, if user seeked the video
                                if (this.get("position") >= curr.get("position")) {
                                    // Remove all passed positions
                                    this._adsRollPositionsCollection.remove(curr);
                                }
                                if (_nextAdPoint.position && _nextAdPoint.type && _counter === 0 && _removeCurr) {
                                    this._nextRollPosition = _nextAdPoint;
                                    this._adsRollPositionsCollection.remove(_removeCurr);
                                }
                            }, this);
                        } else {
                            this._adsRollPositionsCollection.destroy();
                            this._adsRollPositionsCollection = null;
                        }
                    }

                    if (this._nextRollPosition && this.get("adshassource") && this._nextRollPosition.position < this.get("position")) {
                        if (this.__adMinIntervals > 0) {
                            return;
                        }
                        // If active ads player is existed
                        if (this.get("adsplayer_active") && this.scopes.adsplayer) {
                            this.brakeAdsManually();
                            this.trigger("playnextmidroll");
                        } else {
                            // In case if preroll not exists, so ads_player is not activated
                            this.trigger("playnextmidroll");
                        }
                        this._nextRollPosition = null; // To be able to grab another next position from the Collection
                    }
                },

                /**
                 * Will generate player stats
                 * @param position
                 * @param duration
                 * @private
                 */
                __playedStats: function(position, duration) {
                    var currentPassedQuarter = Math.floor(position / duration / 0.25);
                    if (Math.abs(this.get("last-seen-position") - position) >= 1) {
                        this.set("last-seen-position", position);
                        this.set("played-seconds", this.get("played-seconds") + 1);
                        if (this.get("volume") > 0.2) {
                            this.set("last-played-position", this.get("last-played-position") + 1);
                        }
                    }

                    if (this.get("passed-quarter") !== currentPassedQuarter) {
                        this.set("passed-quarter", currentPassedQuarter);
                        this.trigger("quarter-passed", currentPassedQuarter);
                    }

                    if (!this.get("player-started")) this.set("player-started", true);

                },

                _checkAutoPlay: function(video) {
                    video = video || this.__video;
                    if (!video) return;
                    if (this.get("autoplay-requires-muted") || this.get("autoplay-requires-playsinline") || this.get("wait-user-interaction") || this.get("forciblymuted")) {
                        if (this.get("autoplay-requires-muted") || this.get("forciblymuted")) video.muted = true;
                        if (this.get("autoplay-requires-playsinline")) {
                            video.playsinline = true;
                        }
                        Dom.userInteraction(function() {
                            var _initialVolume = this.get("initialoptions").volumelevel > 1 ? 1 : this.get("initialoptions").volumelevel;
                            this.set("autoplay", this.get("initialoptions").autoplay);
                            // We will unmute only if unmuteonclick is false, as it means user has to click on player not in any place
                            if (!this.get("unmuteonclick")) {
                                // Sometimes browser detects that unmute happens before the user has interaction, and it pauses ad
                                Async.eventually(function() {
                                    if (this.destroyed()) return; // in some cases it can be destroyed before
                                    if (!this.get("muted")) this.set_volume(_initialVolume);
                                    if (!this.get("muted") && this.get("volume") > 0.00) video.muted = false;
                                }, this, 300);

                                if (this.get("wait-user-interaction") && this.get("autoplay")) {
                                    this.__testAutoplayOptions(video);
                                    this.trigger("user-has-interaction");
                                }
                            }
                            this.set("forciblymuted", false);
                        }, this);
                    }
                },

                brakeAdsManually: function(hard) {
                    hard = hard || false;
                    var adsPlayer = this.scopes.adsplayer;

                    // Only if min-suggested seconds of nonLinear ads are shown will show next ads
                    if (adsPlayer.get("non-linear-min-suggestion") >= 0 && !adsPlayer.get("linear") && !hard)
                        return;

                    if (!this.get("adscompleted") && !adsPlayer.get("linear")) {
                        this.channel("ads").trigger("allAdsCompleted");
                        // this.channel("ads").trigger("discardAdBreak"); // nonLinear not run discard
                    }
                    this.set("adsplayer_active", false);
                },

                __testAutoplayOptions: function(video) {
                    var suitableCondition = false;
                    var autoplayPossibleOptions = [{
                            muted: true,
                            playsinline: false
                        },
                        {
                            muted: true,
                            playsinline: true
                        }
                    ];
                    // If we preset muted and unmuteonclick is false, we don't need to check unmuted options
                    if (!this.get("muted") && !this.get("unmuteonclick")) {
                        autoplayPossibleOptions.push({
                            muted: false,
                            playsinline: false
                        }, {
                            muted: false,
                            playsinline: true
                        });
                    }
                    Objs.iter(autoplayPossibleOptions, function(opt, index) {
                        PlayerSupport.canAutoplayVideo(opt)
                            .success(function(response, err) {
                                if (suitableCondition) return;
                                // If autoplay is allowed in any way
                                if (!this.get("autoplay-allowed")) {
                                    this.set("autoplay-allowed", !!response.result);
                                }
                                // If condition is true no need for turn off volume
                                if (!opt.muted && !opt.playsinline && response.result) {
                                    this.set("wait-user-interaction", false);
                                    this.set("autoplay-requires-muted", false);
                                    suitableCondition = true;
                                    // if (video) video.muted = opt.muted;
                                    if (video) {
                                        if (opt.playsinline) {
                                            video.setAttribute('playsinline', '');
                                        } else {
                                            video.removeAttribute('playsinline');
                                        }
                                    }
                                    if (!this.get("playing") && this.player) {
                                        this.player.play();
                                    }
                                }
                                if (opt.muted && response.result) {
                                    this.set("forciblymuted", true);
                                    this.set("autoplay-requires-muted", true);
                                    this.set("wait-user-interaction", false);
                                    this.set("volume", 0.0);
                                    this.set("muted", true);
                                    suitableCondition = true;
                                    if (video) video.muted = opt.muted;
                                    if (video) {
                                        if (opt.playsinline) {
                                            video.setAttribute('playsinline', '');
                                        } else {
                                            video.removeAttribute('playsinline');
                                        }
                                    }
                                    if (!this.get("playing") && this.player) {
                                        this.player.play();
                                    }
                                }
                                if (opt.playsinline && response.result) {
                                    this.set("autoplay-requires-playsinline", true);
                                    this.set("wait-user-interaction", false);
                                    if (video) video.playsinline = true;
                                    if (opt.muted) {
                                        this.set("forciblymuted", true);
                                        this.set("autoplay-requires-muted", true);
                                        if (video) video.muted = true;
                                    }
                                    suitableCondition = true;
                                }
                            }, this)
                            .error(function(err) {
                                console.warn("Error :", err, opt, index);
                            }, this);
                    }, this);
                },

                __attachPlayerInteractionEvents: function() {
                    Objs.iter(this.__INTERACTION_EVENTS, function(eventName) {
                        this.auto_destroy(
                            this.activeElement().addEventListener(
                                eventName, this.__setPlayerHadInteraction.bind(this), {
                                    once: true
                                }
                            ));
                    }, this);
                },

                __removePlayerInteractionEvents: function() {
                    Objs.iter(this.__INTERACTION_EVENTS, function(eventName) {
                        this.activeElement().removeEventListener(
                            eventName, this.__setPlayerHadInteraction
                        );
                    }, this);
                },

                __setPlayerEngagement: function() {
                    if (this.get("userengagedwithplayer")) return;
                    // User will be engaged with player if volume is not 0
                    if (!this.get("muted")) {
                        this.set("userengagedwithplayer", true);
                        this.trigger("playerengaged");
                    }
                },

                __setPlayerHadInteraction: function() {
                    if (this.get("userhadplayerinteraction")) return;
                    this.set("userhadplayerinteraction", true);
                    this.trigger("playerinteracted");
                    if (this.get("muted") && this.get("unmuteonclick") && !this.get("volumeafterinteraction")) {
                        this.__unmuteOnClick();
                    }
                    this.__removePlayerInteractionEvents();
                },

                __unmuteOnClick: function() {
                    this.set("muted", false);
                    this.auto_destroy(new Timers.Timer({
                        delay: 500,
                        fire: function() {
                            if (!this.get("muted")) {
                                // If user not paused video manually, we set user as engaged
                                if (!this.get("manuallypaused")) this.__setPlayerEngagement();
                                if (this.player) this.player.setMuted(false);
                                this.set_volume(this.get("initialoptions").volumelevel);
                            }
                            this.set("unmuteonclick", false);
                        }.bind(this),
                        once: true
                    }));
                    this.set("volumeafterinteraction", true);
                    if (this.get("forciblymuted")) this.set("forciblymuted", false);
                    var _initialVolume = this.get("initialoptions").volumelevel > 1 ? 1 : this.get("initialoptions").volumelevel;
                    if (this.get("autoplay-requires-muted") && this.get("adshassource")) {
                        // Sometimes browser detects that unmute happens before the user has interaction, and it pauses ad
                        this.trigger("unmute-ads", Math.min(_initialVolume, 1));
                    }
                }
            };
        }], {

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