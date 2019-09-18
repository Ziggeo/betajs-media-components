Scoped.define("module:VideoRecorder.Dynamics.Recorder", [
    "dynamics:Dynamic",
    "module:Assets",
    "browser:Info",
    "browser:Dom",
    "browser:Events",
    "browser:Upload.MultiUploader",
    "browser:Upload.FileUploader",
    "media:Recorder.VideoRecorderWrapper",
    "media:Recorder.Support",
    "media:WebRTC.Support",
    "base:Types",
    "base:Objs",
    "base:Strings",
    "base:Time",
    "base:Timers",
    "base:States.Host",
    "base:Classes.ClassRegistry",
    "base:Collections.Collection",
    "base:Promise",
    "base:Async",
    "module:VideoRecorder.Dynamics.RecorderStates.Initial",
    "module:VideoRecorder.Dynamics.RecorderStates"
], [
    "module:VideoRecorder.Dynamics.Imagegallery",
    "module:VideoRecorder.Dynamics.Loader",
    "module:VideoRecorder.Dynamics.Controlbar",
    "module:VideoRecorder.Dynamics.Message",
    "module:VideoRecorder.Dynamics.Topmessage",
    "module:VideoRecorder.Dynamics.Chooser",
    "module:VideoRecorder.Dynamics.Faceoutline",
    "dynamics:Partials.ShowPartial",
    "dynamics:Partials.IfPartial",
    "dynamics:Partials.EventPartial",
    "dynamics:Partials.OnPartial",
    "dynamics:Partials.DataPartial",
    "dynamics:Partials.AttrsPartial",
    "dynamics:Partials.StylesPartial",
    "dynamics:Partials.TemplatePartial",
    "dynamics:Partials.HotkeyPartial"
], function(Class, Assets, Info, Dom, DomEvents, MultiUploader, FileUploader, VideoRecorderWrapper, RecorderSupport, WebRTCSupport, Types, Objs, Strings, Time, Timers, Host, ClassRegistry, Collection, Promise, Async, InitialState, RecorderStates, scoped) {
    return Class.extend({
            scoped: scoped
        }, function(inherited) {
            return {

                template: "<%= template(dirname + '/recorder.html') %>",

                attrs: {
                    /* CSS */
                    "css": "ba-videorecorder",
                    "csscommon": "ba-commoncss",
                    "cssrecorder": "ba-recorder",
                    "iecss": "ba-videorecorder",
                    "cssimagegallery": "",
                    "cssloader": "",
                    "csscontrolbar": "",
                    "cssmessage": "",
                    "csstopmessage": "",
                    "csschooser": "",
                    "width": "",
                    "height": "",
                    "gallerysnapshots": 3,
                    "popup-width": "",
                    "popup-height": "",

                    /* Themes */
                    "theme": "",
                    "csstheme": "",
                    "themecolor": "",

                    /* Dynamics */
                    "dynimagegallery": "videorecorder-imagegallery",
                    "dynloader": "videorecorder-loader",
                    "dyncontrolbar": "videorecorder-controlbar",
                    "dynmessage": "videorecorder-message",
                    "dyntopmessage": "videorecorder-topmessage",
                    "dynchooser": "videorecorder-chooser",
                    "dynvideoplayer": "videoplayer",

                    /* Templates */
                    "tmplimagegallery": "",
                    "tmplloader": "",
                    "tmplcontrolbar": "",
                    "tmplmessage": "",
                    "tmpltopmessage": "",
                    "tmplchooser": "",

                    /* Attributes */
                    "autorecord": false,
                    "autoplay": false,
                    "allowrecord": true,
                    "allowupload": true,
                    "allowcustomupload": true,
                    "manual-upload": false,
                    "camerafacefront": false,
                    "createthumbnails": false,
                    "primaryrecord": true,
                    "allowscreen": false,
                    "nofullscreen": false,
                    "recordingwidth": undefined,
                    "recordingheight": undefined,
                    "minuploadingwidth": undefined,
                    "maxuploadingwidth": undefined,
                    "minuploadingheight": undefined,
                    "maxuploadingheight": undefined,
                    "countdown": 3,
                    "snapshotmax": 15,
                    "framerate-warning": null,
                    "framerate": null,
                    "audiobitrate": null,
                    "videobitrate": null,
                    "snapshottype": "jpg",
                    "picksnapshots": true,
                    "playbacksource": "",
                    "screen": {},
                    "playbackposter": "",
                    "recordermode": true,
                    "skipinitial": false,
                    "skipinitialonrerecord": false,
                    "timelimit": null,
                    "timeminlimit": null,
                    "rtmpstreamtype": "mp4",
                    "rtmpmicrophonecodec": "speex",
                    "webrtcstreaming": false,
                    "webrtconmobile": false,
                    "webrtcstreamingifnecessary": false,
                    "microphone-volume": 1.0,
                    "flip-camera": false,
                    "early-rerecord": false,
                    "custom-covershots": false,
                    "manualsubmit": false,
                    "allowedextensions": null,
                    "filesizelimit": null,
                    "faceoutline": false,
                    "display-timer": true,
                    "pausable": false,

                    /* Configuration */
                    "forceflash": false,
                    "simulate": false,
                    "noflash": false,
                    "onlyaudio": false,
                    "noaudio": false,
                    "flashincognitosupport": false,
                    "enforce-duration": null,
                    "localplayback": false,
                    "uploadoptions": {},
                    "playerattrs": {},
                    "shortMessage": true,

                    /* Options */
                    "rerecordable": true,
                    "allowcancel": false,
                    "recordings": null,
                    "ready": true,
                    "orientation": false,
                    "popup": false,
                    "popup-stretch": false,
                    "stretch": false,
                    "audio-test-mandatory": false,
                    "snapshotfromuploader": false,
                    "snapshotfrommobilecapture": false,
                    "allowmultistreams": false,
                    "showaddstreambutton": false,
                    "multistreamreversable": true,
                    "multistreamgragable": true,
                    "multistreamresizeable": true,
                    "multisctreamminwidth": 120,
                    "multisctreamminheight": 95,
                    "addstreampositionx": 5,
                    "addstreampositiony": 5,
                    "addstreampositionwidth": 120,
                    "addstreampositionheight": 95,

                    "allowtexttrackupload": false,
                    "uploadlocales": [{
                        lang: 'en',
                        label: 'English'
                    }],
                    "tracktags": [],
                    "hassubtitles": false,
                    "videometadata": {}
                },

                computed: {
                    "nativeRecordingWidth:recordingwidth,record_media": function() {
                        return this.get("recordingwidth") || ((this.get("record_media") !== "screen" && (this.get("record_media") !== "multistream")) ? 640 : (window.innerWidth || document.body.clientWidth));
                    },
                    "nativeRecordingHeight:recordingheight,record_media": function() {
                        return this.get("recordingheight") || ((this.get("record_media") !== "screen" && (this.get("record_media") !== "multistream")) ? 480 : (window.innerHeight || document.body.clientHeight));
                    },
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
                    "canswitchcamera:recordviafilecapture": function() {
                        return !this.get("recordviafilecapture") && Info.isMobile();
                    }
                },

                scopes: {
                    player: ">[id='player']"
                },

                types: {
                    "allowscreen": "boolean",
                    "forceflash": "boolean",
                    "noflash": "boolean",
                    "rerecordable": "boolean",
                    "ready": "boolean",
                    "stretch": "boolean",
                    "autorecord": "boolean",
                    "autoplay": "boolean",
                    "allowrecord": "boolean",
                    "allowupload": "boolean",
                    "allowcustomupload": "boolean",
                    "primaryrecord": "boolean",
                    "flashincognitosupport": "boolean",
                    "recordermode": "boolean",
                    "nofullscreen": "boolean",
                    "skipinitialonrerecord": "boolean",
                    "picksnapshots": "boolean",
                    "localplayback": "boolean",
                    "camerafacefront": "boolean",
                    "noaudio": "boolean",
                    "skipinitial": "boolean",
                    "popup": "boolean",
                    "popup-stretch": "boolean",
                    "popup-width": "int",
                    "popup-height": "int",
                    "enforce-duration": "bool",
                    "webrtcstreaming": "boolean",
                    "themecolor": "string",
                    "webrtconmobile": "boolean",
                    "manual-upload": "boolean",
                    "webrtcstreamingifnecessary": "boolean",
                    "microphone-volume": "float",
                    "audiobitrate": "int",
                    "videobitrate": "int",
                    "minuploadingwidth": "int",
                    "maxuploadingwidth": "int",
                    "minuploadingheight": "int",
                    "maxuploadingheight": "int",
                    "framerate-warning": "int",
                    "snapshotfromuploader": "boolean",
                    "snapshotfrommobilecapture": "boolean",
                    "flip-camera": "boolean",
                    "faceoutline": "boolean",
                    "early-rerecord": "boolean",
                    "custom-covershots": "boolean",
                    "manualsubmit": "boolean",
                    "simulate": "boolean",
                    "allowedextensions": "array",
                    "onlyaudio": "boolean",
                    "allowcancel": "boolean",
                    "display-timer": "boolean",
                    "audio-test-mandatory": "boolean",
                    "allowtexttrackupload": "boolean",
                    "uploadlocales": "array",
                    "allowmultistreams": "boolean",
                    "multistreamreversable": "boolean",
                    "multistreamgragable": "boolean",
                    "multistreamresizeable": "boolean",
                    "multisctreamminwidth": "number",
                    "multisctreamminheight": "number",
                    "pausable": "boolean"
                },

                extendables: ["states"],

                remove_on_destroy: true,

                events: {
                    "change:camerahealthy": function(value) {
                        this.trigger("camerahealth", value);
                    },
                    "change:microphonehealthy": function(value) {
                        this.trigger("microphonehealth", value);
                    },
                    "change:webrtconmobile": function() {
                        this.set("recordviafilecapture", Info.isMobile() && (!this.get("webrtconmobile") || !VideoRecorderWrapper.anySupport(this._videoRecorderWrapperOptions())));
                    },
                    "change:recordviafilecapture": function() {
                        if (this.get("recordviafilecapture")) {
                            this.set("skipinitial", false);
                            this.set("skipinitialonrerecord", false);
                            this.set("allowmultistreams", false);
                            this.set("allowscreen", false);
                            this.set("autorecord", false);
                        }
                    }
                },

                create: function() {
                    // Init Audio Context
                    WebRTCSupport.globals();

                    if (this.get("theme") in Assets.recorderthemes) {
                        Objs.iter(Assets.recorderthemes[this.get("theme")], function(value, key) {
                            if (!this.isArgumentAttr(key))
                                this.set(key, value);
                        }, this);
                    }
                    if (!this.get("themecolor"))
                        this.set("themecolor", "default");

                    if (this.get("pausable"))
                        this.set("resumevisible", false);

                    this.set("ie8", Info.isInternetExplorer() && Info.internetExplorerVersion() < 9);
                    this.set("hideoverlay", false);
                    this.set("firefox", Info.isFirefox());

                    this.set("canswitchcamera", false);
                    this.set("recordviafilecapture", Info.isMobile() && (!this.get("webrtconmobile") || !VideoRecorderWrapper.anySupport(this._videoRecorderWrapperOptions())));

                    if (this.get("recordviafilecapture")) {
                        this.set("skipinitial", false);
                        this.set("skipinitialonrerecord", false);
                        this.set("allowscreen", false);
                        this.set("allowmultistreams", false);
                        this.set("autorecord", false);
                    }

                    this.__attachRequested = false;
                    this.__activated = false;
                    this._bound = false;
                    this.__recording = false;
                    this.__error = null;
                    this.__currentStretch = null;

                    this.on("change:stretch", function() {
                        this._updateStretch();
                    }, this);
                    this.host = new Host({
                        stateRegistry: new ClassRegistry(this.cls.recorderStates())
                    });
                    this.host.dynamic = this;
                    this.host.initialize(InitialState);

                    this._timer = new Timers.Timer({
                        context: this,
                        fire: this._timerFire,
                        delay: 250,
                        start: true
                    });

                    this.__cameraResponsive = true;
                    this.__cameraSignal = true;

                    this._initSettings();

                    if (this.get("onlyaudio")) {
                        this.set("picksnapshots", false);
                        this.set("allowupload", false);
                        this.set("orientation", false);
                    }
                    if (!Info.isMobile())
                        this.set("orientation", false);
                    this.set("currentorientation", window.innerHeight > window.innerWidth ? "portrait" : "landscape");
                },

                state: function() {
                    return this.host.state();
                },

                recorderAttached: function() {
                    return !!this.recorder;
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

                _detachRecorder: function() {
                    if (this.recorder)
                        this.recorder.weakDestroy();
                    this.recorder = null;
                    this.set("hasrecorder", false);
                },

                _videoRecorderWrapperOptions: function() {
                    return {
                        simulate: this.get("simulate"),
                        forceflash: this.get("forceflash"),
                        noflash: this.get("noflash"),
                        recordVideo: !this.get("onlyaudio"),
                        recordAudio: !this.get("noaudio"),
                        recordingWidth: this.get("nativeRecordingWidth"),
                        recordingHeight: this.get("nativeRecordingHeight"),
                        audioBitrate: typeof this.get("audiobitrate") === "number" ? this.get("audiobitrate") : undefined,
                        videoBitrate: typeof this.get("videobitrate") === "number" ? this.get("videobitrate") : undefined,
                        flashFullSecurityDialog: !this.get("flashincognitosupport"),
                        rtmpStreamType: this.get("rtmpstreamtype"),
                        rtmpMicrophoneCodec: this.get("rtmpmicrophonecodec"),
                        webrtcStreaming: !!this.get("webrtcstreaming"),
                        webrtcStreamingIfNecessary: !!this.get("webrtcstreamingifnecessary"),
                        // webrtcOnMobile: !!this.get("webrtconmobile"),
                        localPlaybackRequested: this.get("localplayback"),
                        screen: (this.get("allowscreen") && this.get("record_media") === "screen") || (this.get("allowmultistreams") && this.get("record_media") === "multistream") ? this.get("screen") : null,
                        framerate: this.get("framerate"),
                        flip: this.get("flip-camera")
                    };
                },

                _attachRecorder: function() {
                    if (this.recorderAttached())
                        return;
                    if (!this.__activated) {
                        this.__attachRequested = true;
                        return;
                    }
                    this.set("hasrecorder", true);
                    this.__attachRequested = false;
                    var video = this.activeElement().querySelector("[data-video='video']");
                    this._clearError();
                    this.recorder = VideoRecorderWrapper.create(Objs.extend({
                        element: video
                    }, this._videoRecorderWrapperOptions()));
                    if (this.recorder) {
                        this.trigger("attached");
                        this.set("pausable", this.get("pausable") && this.recorder.canPause());
                    } else
                        this._error("attach");
                },

                _softwareDependencies: function() {
                    if (!this.recorderAttached() || !this.recorder)
                        return Promise.error("No recorder attached.");
                    return this.recorder.softwareDependencies();
                },

                _bindMedia: function() {
                    if (this._bound || !this.recorderAttached() || !this.recorder)
                        return;
                    this.recorder.ready.success(function() {
                        this.recorder.on("require_display", function() {
                            this.set("hideoverlay", true);
                        }, this);
                        this.recorder.bindMedia().error(function(e) {
                            this.trigger("access_forbidden", e);
                            this.set("hideoverlay", false);
                            this.off("require_display", null, this);
                            this._error("bind", e);
                        }, this).success(function() {
                            this.trigger("access_granted");
                            this.recorder.setVolumeGain(this.get("microphone-volume"));
                            this.set("hideoverlay", false);
                            this.off("require_display", null, this);
                            this.recorder.enumerateDevices().success(function(devices) {
                                this.recorder.once("currentdevicesdetected", function(currentDevices) {
                                    this.set("selectedcamera", currentDevices.video);
                                    this.set("selectedmicrophone", currentDevices.audio);
                                }, this);
                                this.set("cameras", new Collection(Objs.values(devices.video)));
                                this.set("microphones", new Collection(Objs.values(devices.audio)));
                                this.trigger(Types.is_empty(devices.video) ? "no_camera" : "has_camera");
                                this.trigger(Types.is_empty(devices.audio) ? "no_microphone" : "has_microphone");
                                this.set("showaddstreambutton", this._showAddStreamButton());
                            }, this);
                            if (!this.get("noaudio"))
                                this.recorder.testSoundLevel(true);
                            this.set("devicetesting", true);
                            this._updateStretch();
                            while (this.snapshots.length > 0) {
                                var snapshot = this.snapshots.unshift();
                                this.recorder.removeSnapshot(snapshot);
                            }
                            this._bound = true;
                            this.trigger("bound");
                        }, this);
                    }, this);
                },

                isFlash: function() {
                    return this.recorder && this.recorder.isFlash();
                },

                isWebrtcStreaming: function() {
                    return this.recorder && this.recorder.isWebrtcStreaming();
                },

                _showAddStreamButton: function() {
                    return this.get("allowmultistreams") && (this.get("cameras").count() > 1 || this.get("cameras").count() >= 1 && ((this.get("record_media") !== "screen" || (this.get("record_media") !== "multistream"))));
                },

                _initSettings: function() {
                    // Without below line re-recorder will not launch
                    this.snapshots = [];
                    this.thumbnails = [];
                    this.set("videometadata", {
                        "height": null,
                        "width": null,
                        "ratio": null,
                        "thumbnails": {
                            "mainimage": null,
                            "images": []
                        }
                    });
                },

                _initializeUploader: function() {
                    if (this._dataUploader)
                        this._dataUploader.weakDestroy();
                    this._dataUploader = new MultiUploader();
                },

                _unbindMedia: function() {
                    if (!this._bound)
                        return;
                    this.recorder.unbindMedia();
                    this._bound = false;
                },

                _uploadCovershot: function(image) {
                    if (this.get("simulate"))
                        return;
                    this.__lastCovershotUpload = image;
                    var uploader = this.recorder ?
                        this.recorder.createSnapshotUploader(image, this.get("snapshottype"), this.get("uploadoptions").image) :
                        RecorderSupport.createSnapshotUploader(this.isFlash(), image, this.get("snapshottype"), this.get("uploadoptions").image);
                    uploader.upload();
                    this._dataUploader.addUploader(uploader);
                },

                _uploadCovershotFile: function(file) {
                    if (this.get("simulate"))
                        return;
                    this.__lastCovershotUpload = file;
                    var uploader = FileUploader.create(Objs.extend({
                        source: file
                    }, this.get("uploadoptions").image));
                    uploader.upload();
                    this._dataUploader.addUploader(uploader);
                },

                /**
                 * Upload single image Blob file with thumbnails to the server
                 * @param {Blob} file
                 * @private
                 */
                _uploadThumbnails: function(file) {
                    if (this.get("simulate"))
                        return;
                    this.set("videometadata", Objs.tree_merge(this.get("videometadata"), {
                        thumbnails: {
                            mainimage: file
                        }
                    }));
                    var uploader = FileUploader.create(Objs.extend({
                        source: file
                    }, this.get("uploadoptions").thumbnail));
                    uploader.upload();
                    this._dataUploader.addUploader(uploader);
                },

                /**
                 * Upload VTT Blob file to the server with all details about thumbnails
                 * @param {Blob} file
                 * @private
                 */
                _uploadThumbnailTracks: function(file) {
                    if (this.get("simulate"))
                        return;
                    var uploader = FileUploader.create(Objs.extend({
                        source: file
                    }, this.get("uploadoptions").tracks));
                    // Add Thumbnails as Track element to the player
                    if (this.get("uploadoptions").tracks.url) {
                        this.get("tracktags").push({
                            kind: 'thumbnails',
                            src: this.get("uploadoptions").tracks.url
                        });
                    }
                    uploader.upload();
                    this._dataUploader.addUploader(uploader);
                },

                _uploadVideoFile: function(file) {
                    if (this.get("simulate"))
                        return;
                    var uploader = FileUploader.create(Objs.extend({
                        source: file
                    }, this.get("uploadoptions").video));
                    uploader.upload();
                    this._dataUploader.addUploader(uploader);
                },

                _prepareRecording: function() {
                    return Promise.create(true);
                },

                _startRecording: function() {
                    if (this.__recording)
                        return Promise.error(true);
                    if (!this.get("noaudio"))
                        this.recorder.testSoundLevel(false);
                    this.set("devicetesting", false);
                    return this.recorder.startRecord({
                        rtmp: this.get("uploadoptions").rtmp,
                        video: this.get("uploadoptions").video,
                        audio: this.get("uploadoptions").audio,
                        webrtcStreaming: this.get("uploadoptions").webrtcStreaming
                    }).success(function() {
                        this.__recording = true;
                        this.__recording_start_time = Time.now();
                    }, this);
                },

                _stopRecording: function() {
                    if (!this.__recording)
                        return Promise.error(true);
                    return this.recorder.stopRecord({
                        rtmp: this.get("uploadoptions").rtmp,
                        video: this.get("uploadoptions").video,
                        audio: this.get("uploadoptions").audio,
                        webrtcStreaming: this.get("uploadoptions").webrtcStreaming
                    }).success(function(uploader) {
                        this.__recording = false;
                        uploader.upload();
                        this._dataUploader.addUploader(uploader);
                    }, this);
                },

                isRecording: function() {
                    return this.__recording;
                },

                _verifyRecording: function() {
                    return Promise.create(true);
                },

                _afterActivate: function(element) {
                    inherited._afterActivate.call(this, element);
                    this.__activated = true;
                    if (this.__attachRequested)
                        this._attachRecorder();
                },

                _showBackgroundSnapshot: function() {
                    if (this.get("onlyaudio"))
                        return;
                    this._hideBackgroundSnapshot();
                    this.__backgroundSnapshot = this.recorder.createSnapshot(this.get("snapshottype"));
                    var el = this.activeElement().querySelector("[data-video]");
                    var dimensions = Dom.elementDimensions(el);
                    if (this.__backgroundSnapshot)
                        this.__backgroundSnapshotDisplay = this.recorder.createSnapshotDisplay(el, this.__backgroundSnapshot, 0, 0, dimensions.width, dimensions.height);
                },

                _hideBackgroundSnapshot: function() {
                    if (this.get("onlyaudio"))
                        return;
                    if (this.__backgroundSnapshotDisplay)
                        this.recorder.removeSnapshotDisplay(this.__backgroundSnapshotDisplay);
                    delete this.__backgroundSnapshotDisplay;
                    if (this.__backgroundSnapshot)
                        this.recorder.removeSnapshot(this.__backgroundSnapshot);
                    delete this.__backgroundSnapshot;
                },

                toggleFaceOutline: function(new_status) {
                    if (new_status == undefined) {
                        if (this.get("faceoutline") == true) {
                            this.set("faceoutline", false);
                        } else {
                            this.set("faceoutline", true);
                        }
                    } else {
                        this.set("faceoutline", new_status);
                    }
                },

                isMobile: function() {
                    return Info.isMobile();
                },

                object_functions: ["record", "rerecord", "record_screen", "stop", "play", "pause", "reset"],

                functions: {

                    cancel: function() {
                        if (confirm(this.stringUnicode("cancel-confirm")))
                            this.execute("reset");
                    },

                    record: function() {
                        if (this._delegatedRecorder) {
                            this._delegatedRecorder.execute("record");
                            return;
                        }
                        this.host.state().record();
                    },

                    record_video: function() {
                        this.host.state().selectRecord();
                    },

                    record_screen: function(isMultiStream) {
                        if (this._delegatedRecorder) {
                            this._delegatedRecorder.execute("record_screen");
                            return;
                        }
                        this.host.state().selectRecordScreen(isMultiStream);
                    },

                    pause_recorder: function() {
                        if (this._delegatedRecorder) {
                            this._delegatedRecorder.execute("pause_recorder");
                            return;
                        }
                        this.__paused = true;
                        this.__recording = false;
                        this.recorder.pauseRecord();
                        this.recorder._recorder.once("paused", function(ev) {
                            this.set("resumevisible", true);
                        }, this);
                    },

                    resume: function() {
                        if (this._delegatedRecorder) {
                            this._delegatedRecorder.execute("resume");
                            return;
                        }
                        this._resume();
                    },

                    video_file_selected: function(file) {
                        this.__selected_video_file = file;
                        if (!this.get("manual-upload"))
                            this.execute("upload_video");
                    },

                    upload_video: function(file) {
                        this.host.state().selectUpload(file || this.__selected_video_file);
                    },

                    upload_covershot: function(file) {
                        this.host.state().uploadCovershot(file);
                    },

                    select_camera: function(camera_id) {
                        if (this.recorder) {
                            this.recorder.setCurrentDevices({
                                video: camera_id
                            });
                            this.set("showaddstreambutton", this._showAddStreamButton());
                            this.set("selectedcamera", camera_id);
                        }
                    },

                    select_microphone: function(microphone_id) {
                        if (this.recorder) {
                            this.recorder.setCurrentDevices({
                                audio: microphone_id
                            });
                            this.recorder.testSoundLevel(true);
                            this.set("selectedmicrophone", microphone_id);
                        }
                        this.set("microphonehealthy", false);
                    },

                    toggle_face_mode: function() {
                        if (this.recorder) {
                            this.recorder.setCameraFace(this.get("camerafacefront"));
                            this.set("camerafacefront", !this.get("camerafacefront"));
                        }
                    },

                    add_new_stream: function(deviceId) {
                        this._add_new_stream(deviceId);
                    },

                    invoke_skip: function() {
                        this.trigger("invoke-skip");
                    },

                    select_image: function(image) {
                        this.trigger("select-image", image);
                    },

                    rerecord: function() {
                        if (this._delegatedRecorder) {
                            this._delegatedRecorder.execute("rerecord");
                            return;
                        }
                        if (confirm(this.stringUnicode("rerecord-confirm"))) {
                            this.host.state().rerecord();
                            this._initSettings();
                        }
                    },

                    stop: function() {
                        if (this._delegatedRecorder) {
                            this._delegatedRecorder.execute("stop");
                            return;
                        }

                        // If recorder is paused need resume first,
                        // setting this._recording to true also could be enough
                        if (this.__paused)
                            this._resume();

                        this.host.state().stop();
                    },

                    play: function() {
                        if (this._delegatedRecorder) {
                            this._delegatedRecorder.execute("play");
                            return;
                        }
                        this.host.state().play();
                    },

                    pause: function() {
                        if (this._delegatedRecorder) {
                            this._delegatedRecorder.execute("pause");
                            return;
                        }
                        this.host.state().pause();
                    },

                    message_click: function() {
                        this.trigger("message-click");
                    },

                    message_link_click: function(link) {
                        this.trigger("message-link-click", link);
                    },

                    playing: function() {
                        this.trigger("playing");
                    },

                    paused: function() {
                        this.trigger("paused");
                    },

                    ended: function() {
                        this.trigger("ended");
                    },

                    reset: function() {
                        if (this._delegatedRecorder) {
                            this._delegatedRecorder.execute("reset");
                            return;
                        }
                        this._stopRecording().callback(function() {
                            this._unbindMedia();
                            this._hideBackgroundSnapshot();
                            this._detachRecorder();
                            this._initSettings();
                            this.host.state().next("Initial");
                        }, this);
                    },

                    toggle_facemode: function() {
                        this._toggleFaceMode();
                    },

                    manual_submit: function() {
                        this.set("rerecordable", false);
                        this.set("manualsubmit", false);
                        this.trigger("manually_submitted");
                    },

                    ready_to_play: function() {
                        this.trigger("ready_to_play");
                    }
                },

                _resume: function() {
                    this.__paused = false;
                    this.__recording = true;
                    this.recorder.resumeRecord();
                    this.recorder._recorder.once("resumed", function() {
                        this.set("resumevisible", false);
                    }, this);
                },

                destroy: function() {
                    this._timer.destroy();
                    this.host.destroy();
                    this._detachRecorder();
                    inherited.destroy.call(this);
                },

                deltaCoefficient: function() {
                    return this.recorderAttached() ? this.recorder.deltaCoefficient() : null;
                },

                blankLevel: function() {
                    return this.recorderAttached() ? this.recorder.blankLevel() : null;
                },

                lightLevel: function() {
                    return this.recorderAttached() ? this.recorder.lightLevel() : null;
                },

                soundLevel: function() {
                    return this.recorderAttached() ? this.recorder.soundLevel() : null;
                },

                _toggleFaceMode: function() {
                    this.set("camerafacefront", !!this.get("camerafacefront"));
                },

                _timerFire: function() {
                    if (this.destroyed())
                        return;
                    this.set("currentorientation", window.innerHeight > window.innerWidth ? "portrait" : "landscape");
                    try {
                        if (this.recorderAttached() && this.get("devicetesting")) {
                            var lightLevel = this.lightLevel();
                            this.set("camerahealthy", lightLevel >= 100 && lightLevel <= 200);
                            if (!this.get("noaudio") && !this.get("microphonehealthy") && this.soundLevel() >= 1.01) {
                                this.set("microphonehealthy", true);
                                this.recorder.testSoundLevel(false);
                            }
                        }
                    } catch (e) {}

                    if (!this.get("onlyaudio")) {
                        if (this.__recording && this.__recording_start_time + 500 < Time.now()) {
                            var p = this.snapshots.length < this.get("snapshotmax") ? 0.25 : 0.05;
                            if (Math.random() <= p) {
                                var snap = this.recorder.createSnapshot(this.get("snapshottype"));
                                if (snap) {
                                    if (!this.get('videometadata').height && typeof Image !== 'undefined' && this.get("createthumbnails")) {
                                        RecorderSupport.snapshotMetaData(snap).success(function(data) {
                                            var _thumbWidth = data.orientation === 'landscape' ? 80 : 35;
                                            this.set("videometadata", Objs.tree_merge(this.get("videometadata"), data));
                                            this.set("videometadata", Objs.tree_merge(this.get("videometadata"), {
                                                "thumbnails": {
                                                    width: _thumbWidth,
                                                    height: Math.floor(_thumbWidth / data.width * data.height)
                                                }
                                            }));
                                        }, this);
                                    }
                                    if (this.snapshots.length < this.get("snapshotmax")) {
                                        this.snapshots.push(snap);
                                    } else {
                                        var i = Math.floor(Math.random() * this.get("snapshotmax"));
                                        this.recorder.removeSnapshot(this.snapshots[i]);
                                        this.snapshots[i] = snap;
                                    }

                                    if (this.get("createthumbnails")) {
                                        var _currentRecordingSecond = Math.floor((Time.now() - this.__recording_start_time) / 1000);
                                        var _thumbLatestIndex = this.get("videometadata").thumbnails.images.length > 1 ? this.get("videometadata").thumbnails.images.length - 1 : 0;
                                        var _latestThumb = this.get("videometadata").thumbnails.images[_thumbLatestIndex];

                                        // Add thumb each 2 seconds
                                        if (typeof _latestThumb !== 'undefined') {
                                            if (_currentRecordingSecond > _latestThumb.time + 1) {
                                                this.get("videometadata").thumbnails.images.push({
                                                    time: _currentRecordingSecond,
                                                    snap: snap
                                                });
                                            }
                                        } else {
                                            this.get("videometadata").thumbnails.images.push({
                                                time: _currentRecordingSecond,
                                                snap: snap
                                            });
                                        }
                                    }
                                }
                            }
                        }
                    }

                    try {
                        if (this.recorderAttached() && this._timer.fire_count() % 20 === 0 && this._accessing_camera) {
                            var signal = this.blankLevel() >= 0.01;
                            if (signal !== this.__cameraSignal) {
                                this.__cameraSignal = signal;
                                this.trigger(signal ? "camera_signal" : "camera_nosignal");
                            }
                        }
                        if (this.recorderAttached() && this._timer.fire_count() % 20 === 10 && this._accessing_camera) {
                            var delta = this.recorder.deltaCoefficient();
                            var responsive = delta === null || delta >= 0.5;
                            if (responsive !== this.__cameraResponsive) {
                                this.__cameraResponsive = responsive;
                                this.trigger(responsive ? "camera_responsive" : "camera_unresponsive");
                            }
                        }
                    } catch (e) {}

                    this._updateStretch();
                    this._updateCSSSize();
                },

                _updateCSSSize: function() {
                    var width = Dom.elementDimensions(this.activeElement()).width;
                    this.set("csssize", width > 400 ? "normal" : (width > 300 ? "medium" : "small"));
                },

                videoHeight: function() {
                    var _clientHeight = (window.innerHeight || document.body.clientHeight);
                    if (!this.recorderAttached())
                        return _clientHeight;
                    else {
                        var _height = this.recorder.cameraHeight();
                        return _height > _clientHeight ? _clientHeight : _height;
                    }
                },

                videoWidth: function() {
                    var _clientWidth = (window.innerWidth || document.body.clientWidth);
                    if (!this.recorderAttached())
                        return _clientWidth;
                    else {
                        var _width = this.recorder.cameraWidth();
                        return _width > _clientWidth ? _clientWidth : _width;
                    }
                },

                aspectRatio: function() {
                    var width = this.videoWidth();
                    var height = this.videoHeight();
                    return width / height;
                },

                parentWidth: function() {
                    return this.get("width") || Dom.elementDimensions(this.activeElement()).width;
                },

                parentHeight: function() {
                    return this.get("height") || Dom.elementDimensions(this.activeElement()).height;
                },

                parentAspectRatio: function() {
                    return this.parentWidth() / this.parentHeight();
                },

                averageFrameRate: function() {
                    return this.recorderAttached() ? this.recorder.averageFrameRate() : null;
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
                        popup: false,
                        width: this.get("popup-width"),
                        height: this.get("popup-height"),
                        stretch: this.get("popup-stretch")
                    };
                },

                /**
                 * Will add new stream based on provided ID
                 * @param deviceId
                 */
                _add_new_stream: function(deviceId) {
                    var _selected;
                    var _currentTracks = this.recorder._recorder.stream().getTracks();
                    this.get("cameras").iterate(function(videoDevice) {
                        var _videoDevice = videoDevice.data();
                        deviceId = deviceId || _videoDevice.id; // In case if argument is empty take any video source
                        if (!_selected && deviceId === _videoDevice.id) {
                            this.set("loadlabel", this.string("adding-new-stream"));
                            this.set("loader_active", true);
                            this.recorder.addMultiStream(_videoDevice, {
                                positionX: this.get("addstreampositionx"),
                                positionY: this.get("addstreampositiony"),
                                width: this.get("addstreampositionwidth"),
                                height: this.get("addstreampositionheight")
                            }, _currentTracks).success(function() {
                                _selected = true;
                                this.set("loadlabel", "");
                                this.set("loader_active", false);
                                this.set("showaddstreambutton", false);
                                if (this.get("multistreamreversable") || this.get("multistreamgragable") || this.get("multistreamresizeable")) {
                                    this.on("change:addstreampositionx change:addstreampositiony change:addstreampositionwidth change:addstreampositionheight", function(ev) {
                                        if (typeof this.recorder._recorder === 'object') {
                                            this.recorder._recorder.updateMultiStreamPosition(
                                                this.get("addstreampositionx"),
                                                this.get("addstreampositiony"),
                                                this.get("addstreampositionwidth"),
                                                this.get("addstreampositionheight")
                                            );

                                        }
                                    });
                                    this.__appendMultiStreamHelperElement({
                                        // border: '3px solid red', // for testing purposes only
                                        opacity: 0,
                                        position: 'absolute',
                                        cursor: 'pointer',
                                        zIndex: 100
                                    });
                                }
                            }, this).error(function(message) {
                                console.warn(message);
                                this.set("loadlabel", message);
                                this.set("loader_active", false);
                            }, this);
                        }
                    }, this);
                },

                /**
                 * Will append DIV element which will affect as a button
                 * @param {Object} options
                 * @private
                 */
                __appendMultiStreamHelperElement: function(options) {
                    var _screenSwitcherClicksCount = 0;
                    var _clickEvent, _isTouchDevice, _mouseDownEvent;

                    this.__multistreamHelperElement = document.createElement('div');
                    Dom.elementAddClass(this.__multistreamHelperElement, 'ba-recorder-screen-switcher');

                    Objs.iter(options, function(value, index) {
                        this.__multistreamHelperElement.style[index] = value;
                    }, this);
                    this.activeElement().append(this.__multistreamHelperElement);

                    // Create additional related elements after reverse element created
                    this.__setMultiStreamElementDimensions(this.__multistreamHelperElement);

                    this._changeVideoEventHandler = this.auto_destroy(new DomEvents());
                    _isTouchDevice = (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
                    _clickEvent = _isTouchDevice ? 'touch' : 'click';

                    // If Reverse Cameras Settings is true
                    if (this.get("multistreamreversable")) {
                        this._changeVideoEventHandler.on(this.__multistreamHelperElement, _clickEvent, function(ev) {
                            _screenSwitcherClicksCount++;
                            // because not enough info regarding supported versions also not be able to support mobile, avoided to use dblclick event
                            if (_screenSwitcherClicksCount === 1)
                                Async.eventually(function() {
                                    _screenSwitcherClicksCount = 0;
                                }, this, 200);

                            if (_screenSwitcherClicksCount >= 2) {
                                this.recorder.reverseCameraScreens();
                            }
                        }, this);
                    }

                    // If Drag Settings is true
                    if (this.get("multistreamgragable")) {
                        this.__addDragResizeOption(this.__multistreamHelperElement, _isTouchDevice);
                    }

                    if (this.get("multistreamresizeable")) {
                        this.__addResizeElement(_isTouchDevice, null, {
                            width: '7px',
                            height: '7px',
                            borderRight: '2px solid white',
                            borderBottom: '2px solid white',
                            position: 'absolute',
                            right: '-9px',
                            bottom: '-9px',
                            cursor: 'nwse-resize'
                        });
                    }
                },

                /**
                 * Will add Drag
                 *
                 * @param {HTMLElement} draggedElement
                 * @param {Boolean} isTouchDevice
                 * @private
                 */
                __addDragResizeOption: function(draggedElement, isTouchDevice) {
                    var _pos1 = 0;
                    var _pos2 = 0;
                    var _pos3 = 0;
                    var _pos4 = 0;
                    var _self = this;
                    var _dragElement, _draggingEvent, _mouseMoveEvent, _mouseUpEvent, _mouseDownEvent, _isResizing;

                    _dragElement = draggedElement || this.__multistreamHelperElement;

                    this.__draggingEvent = this.auto_destroy(new DomEvents());

                    // switch to touch events if using a touch screen
                    _mouseDownEvent = isTouchDevice ? 'touchstart' : 'mousedown';

                    this.__draggingEvent.on(_dragElement, _mouseDownEvent, function(ev) {
                        ev = ev || window.event;
                        ev.preventDefault();

                        _dragElement.style.cursor = 'move';

                        // get the mouse cursor position at startup:
                        _pos3 = ev.clientX;
                        _pos4 = ev.clientY;

                        if (isTouchDevice)
                            _dragElement.ontouchend = dragEndHandler;
                        else
                            _dragElement.onmouseup = dragEndHandler;

                        function dragEndHandler(ev) {
                            // stop moving when mouse button is released:
                            _dragElement.style.cursor = 'pointer';
                            _dragElement.onmouseup = null;
                            _dragElement.onmousemove = null;
                        }

                        // call a function whenever the cursor moves:
                        if (isTouchDevice)
                            _dragElement.ontouchmove = dragHandler;
                        else
                            _dragElement.onmousemove = dragHandler;

                        function dragHandler(mouseEv) {
                            mouseEv = mouseEv || window.event;
                            mouseEv.preventDefault();

                            // calculate the new cursor position:
                            _pos1 = _pos3 - mouseEv.clientX;
                            _pos2 = _pos4 - mouseEv.clientY;
                            _pos3 = mouseEv.clientX;
                            _pos4 = mouseEv.clientY;

                            // set the element's new position:
                            var _top = (_dragElement.offsetTop - _pos2);
                            var _left = (_dragElement.offsetLeft - _pos1);
                            _dragElement.style.top = _top + "px";
                            _dragElement.style.left = _left + "px";

                            _self.set("addstreampositionx", _left);
                            _self.set("addstreampositiony", _top);

                            // var coordinates = Dom.elementOffset(_dragElement); {left, top}
                        }
                    }, this);
                },

                /**
                 *
                 *
                 * @param {Boolean} isTouchDevice
                 * @param {HTMLElement} parentElement
                 * @param {Object} options
                 * @private
                 */
                __addResizeElement: function(isTouchDevice, parentElement, options) {
                    parentElement = parentElement || this.__multistreamHelperElement;
                    var _minSize = 120;
                    var _self = this;
                    var _mouseDownEvent, _mouseUpEvent, _mouseMoveEvent;
                    this.__resizerElement = document.createElement('div');
                    var _resizeElement = this.__resizerElement;
                    Objs.iter(options, function(value, index) {
                        this.__resizerElement.style[index] = value;
                    }, this);

                    parentElement.append(this.__resizerElement);
                    this.__resizeEvent = this.auto_destroy(new DomEvents());

                    // switch to touch events if using a touch screen
                    _mouseDownEvent = isTouchDevice ? 'touchstart' : 'mousedown';
                    _mouseUpEvent = isTouchDevice ? 'touchend' : 'mouseup';
                    _mouseMoveEvent = isTouchDevice ? 'touchmove' : 'mousemove';

                    this.__resizeEvent.on(_resizeElement, _mouseDownEvent, function(e) {
                        e = e || window.event;
                        e.preventDefault();

                        var minimum_size = 120;
                        var original_width = this.get("addstreampositionwidth");
                        var original_height = this.get("addstreampositionheight");

                        var original_mouse_x = e.pageX;
                        var original_mouse_y = e.pageY;

                        window.addEventListener(_mouseMoveEvent, resize);
                        window.addEventListener(_mouseUpEvent, stopResize);

                        //isTouchDevice ? _resizeElement.ontouchend : _resizeElement.onmouseup =
                        function stopResize(ev) {
                            // stop moving when mouse button is released:
                            // _resizeElement.onmouseup = null;
                            // _resizeElement.onmousemove = null;
                            window.removeEventListener('mousemove', resize);
                        }

                        //isTouchDevice ? _resizeElement.ontouchmove : _resizeElement.onmousemove =
                        function resize(mouseEv) {

                            var width = original_width + (mouseEv.pageX - original_mouse_x);
                            var height = original_height + (mouseEv.pageY - original_mouse_y);
                            if (width > _self.get("multisctreamminwidth")) {
                                _self.__multistreamHelperElement.style.width = width + 'px';
                                _self.set("addstreampositionwidth", width);
                            }
                            if (height > _self.get("multisctreamminheight")) {
                                _self.__multistreamHelperElement.style.height = height + 'px';
                                _self.set("addstreampositionheight", height);
                            }
                        }
                    }, this);
                },

                /**
                 * Helper method will set dimentios for multiscreen recorder related elements
                 *
                 * @param {HTMLElement} element
                 * @private
                 */
                __setMultiStreamElementDimensions: function(element) {
                    if (element) {
                        element.style.top = this.get("addstreampositionx") + 'px';
                        element.style.left = this.get("addstreampositiony") + 'px';
                        element.style.width = this.get("addstreampositionwidth") + 'px';
                        element.style.height = this.get("addstreampositionheight") + 'px';
                    }
                }
            };
        }, {

            recorderStates: function() {
                return [RecorderStates];
            }

        })
        .register("ba-videorecorder")
        .registerFunctions({
            /*<%= template_function_cache(dirname + '/recorder.html') %>*/
        })
        .attachStringTable(Assets.strings)
        .addStrings({
            "recorder-error": "An error occurred, please try again later. Click to retry.",
            "attach-error": "We could not access the media interface. Depending on the device and browser, you might need to install Flash or access the page via SSL.",
            "software-required": "Please click below to install / activate the following requirements in order to proceed.",
            "software-waiting": "Waiting for the requirements to be installed / activated. You might need to refresh the page after completion.",
            "access-forbidden": "Access to the media was forbidden. Click to retry.",
            "pick-covershot": "Pick a covershot.",
            "framerate-warning": "The video frame rate is very low. We recommend closing all other programs and browser tabs or to use a faster computer.",
            "uploading": "Uploading",
            "uploading-failed": "Uploading failed - click here to retry.",
            "upload-error-duration": "Length of the uploaded video does not meet the requirements - click here to retry.",
            "resolution-constraint-error": "The file you've selected does not match the required resolution - click here to retry.",
            "verifying": "Verifying",
            "verifying-failed": "Verifying failed - click here to retry.",
            "rerecord-confirm": "Do you really want to redo your video?",
            "cancel-confirm": "Do you really want to cancel your video upload?",
            "video_file_too_large": "Your video file is too large (%s) - click here to try again with a smaller video file.",
            "unsupported_video_type": "Please upload: %s - click here to retry.",
            "orientation-portrait-required": "Please rotate your device to record in portrait mode.",
            "orientation-landscape-required": "Please rotate your device to record in landscape mode.",
            "switch-camera": "Switch camera",
            "prepare-covershot": "Preparing covershots",
            "prepare-thumbnails": "Preparing seeking thumbnails",
            "adding-new-stream": "Adding New Stream"
        });
});