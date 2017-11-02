/*!
betajs-media-components - v0.0.76 - 2017-11-02
Copyright (c) Ziggeo,Oliver Friedmann
Apache-2.0 Software License.
*/
(function () {

var Scoped = this.subScope();

Scoped.binding("browser", "global:BetaJS.Browser");
Scoped.binding("dynamics", "global:BetaJS.Dynamics");
Scoped.binding("module", "global:BetaJS.MediaComponents");

Scoped.extend("module:Assets.playerthemes", [
    "browser:Info",
    "dynamics:Parser"
], function(Info, Parser) {
    var ie8 = Info.isInternetExplorer() && Info.internetExplorerVersion() <= 8;
    Parser.registerFunctions({ /**/"css": function (obj) { with (obj) { return css; } }, "activitydelta > 5000 && hideoninactivity ? (css + '-dashboard-hidden') : ''": function (obj) { with (obj) { return activitydelta > 5000 && hideoninactivity ? (css + '-dashboard-hidden') : ''; } }, "title": function (obj) { with (obj) { return title; } }, "submittable": function (obj) { with (obj) { return submittable; } }, "string('submit-video')": function (obj) { with (obj) { return string('submit-video'); } }, "rerecordable": function (obj) { with (obj) { return rerecordable; } }, "string('rerecord-video')": function (obj) { with (obj) { return string('rerecord-video'); } }, "!playing": function (obj) { with (obj) { return !playing; } }, "string('play-video')": function (obj) { with (obj) { return string('play-video'); } }, "disablepause ? css + '-disabled' : ''": function (obj) { with (obj) { return disablepause ? css + '-disabled' : ''; } }, "playing": function (obj) { with (obj) { return playing; } }, "disablepause ? string('pause-video-disabled') : string('pause-video')": function (obj) { with (obj) { return disablepause ? string('pause-video-disabled') : string('pause-video'); } }, "string(volume > 0 ? 'volume-mute' : 'volume-unmute')": function (obj) { with (obj) { return string(volume > 0 ? 'volume-mute' : 'volume-unmute'); } }, "css + '-icon-volume-' + (volume >= 0.5 ? 'up' : (volume > 0 ? 'down' : 'off'))": function (obj) { with (obj) { return css + '-icon-volume-' + (volume >= 0.5 ? 'up' : (volume > 0 ? 'down' : 'off')); } }, "startVerticallyUpdateVolume(domEvent)": function (obj) { with (obj) { return startVerticallyUpdateVolume(domEvent); } }, "stopVerticallyUpdateVolume(domEvent)": function (obj) { with (obj) { return stopVerticallyUpdateVolume(domEvent); } }, "progressVerticallyUpdateVolume(domEvent)": function (obj) { with (obj) { return progressVerticallyUpdateVolume(domEvent); } }, "{height: Math.ceil(1+Math.min(99, Math.round(volume * 100))) + '%'}": function (obj) { with (obj) { return {height: Math.ceil(1+Math.min(99, Math.round(volume * 100))) + '%'}; } }, "string('volume-button')": function (obj) { with (obj) { return string('volume-button'); } }, "string('elapsed-time')": function (obj) { with (obj) { return string('elapsed-time'); } }, "formatTime(position)": function (obj) { with (obj) { return formatTime(position); } }, "fullscreen": function (obj) { with (obj) { return fullscreen; } }, "fullscreened ? string('exit-fullscreen-video') : string('fullscreen-video')": function (obj) { with (obj) { return fullscreened ? string('exit-fullscreen-video') : string('fullscreen-video'); } }, "fullscreened ? 'small' : 'full'": function (obj) { with (obj) { return fullscreened ? 'small' : 'full'; } }, "airplaybuttonvisible": function (obj) { with (obj) { return airplaybuttonvisible; } }, "castbuttonvisble": function (obj) { with (obj) { return castbuttonvisble; } }, "streams.length > 1 && currentstream": function (obj) { with (obj) { return streams.length > 1 && currentstream; } }, "string('change-resolution')": function (obj) { with (obj) { return string('change-resolution'); } }, "currentstream_label": function (obj) { with (obj) { return currentstream_label; } }, "string('total-time')": function (obj) { with (obj) { return string('total-time'); } }, "formatTime(duration || position)": function (obj) { with (obj) { return formatTime(duration || position); } }, "disableseeking ? css + '-disabled' : ''": function (obj) { with (obj) { return disableseeking ? css + '-disabled' : ''; } }, "startUpdatePosition(domEvent)": function (obj) { with (obj) { return startUpdatePosition(domEvent); } }, "stopUpdatePosition(domEvent)": function (obj) { with (obj) { return stopUpdatePosition(domEvent); } }, "progressUpdatePosition(domEvent)": function (obj) { with (obj) { return progressUpdatePosition(domEvent); } }, "{width: Math.round(duration ? cached / duration * 100 : 0) + '%'}": function (obj) { with (obj) { return {width: Math.round(duration ? cached / duration * 100 : 0) + '%'}; } }, "{width: Math.round(duration ? position / duration * 100 : 0) + '%'}": function (obj) { with (obj) { return {width: Math.round(duration ? position / duration * 100 : 0) + '%'}; } }, "string('video-progress')": function (obj) { with (obj) { return string('video-progress'); } }, "submit()": function (obj) { with (obj) { return submit(); } }, "rerecord()": function (obj) { with (obj) { return rerecord(); } }, "play()": function (obj) { with (obj) { return play(); } }, "pause()": function (obj) { with (obj) { return pause(); } }, "toggle_volume()": function (obj) { with (obj) { return toggle_volume(); } }, "toggle_fullscreen()": function (obj) { with (obj) { return toggle_fullscreen(); } }, "show_airplay_devices()": function (obj) { with (obj) { return show_airplay_devices(); } }, "toggle_stream()": function (obj) { with (obj) { return toggle_stream(); } }/**/ });
    return {
        "theatre": {
            css: "ba-videoplayer-theatre-theme",
            csstheme: "ba-videoplayer-theatre-theme",
            tmplcontrolbar: "<div data-selector=\"video-title-block\" class=\"{{css}}-video-title-container {{activitydelta > 5000 && hideoninactivity ? (css + '-dashboard-hidden') : ''}}\"  ba-if=\"{{title}}\">\n    <p class=\"{{css}}-video-title\">\n        {{title}}\n    </p>\n</div>\n<div class=\"{{css}}-dashboard {{activitydelta > 5000 && hideoninactivity ? (css + '-dashboard-hidden') : ''}}\">\n\n    <div class=\"{{css}}-left-block\">\n\n        <div data-selector=\"submit-video-button\" class=\"{{css}}-leftbutton-container\" ba-if=\"{{submittable}}\"  ba-click=\"submit()\">\n            <div class=\"{{css}}-button-inner\">\n                {{string('submit-video')}}\n            </div>\n        </div>\n\n        <div data-selector=\"button-icon-ccw\" class=\"{{css}}-leftbutton-container\" ba-if=\"{{rerecordable}}\" ba-click=\"rerecord()\" title=\"{{string('rerecord-video')}}\">\n            <div class=\"{{css}}-button-inner\">\n                <i class=\"{{css}}-icon-ccw\"></i>\n            </div>\n        </div>\n\n        <div data-selector=\"button-icon-play\" class=\"{{css}}-button-container\" ba-if=\"{{!playing}}\" ba-click=\"play()\" title=\"{{string('play-video')}}\">\n            <div class=\"{{css}}-button-inner\">\n                <i class=\"{{css}}-icon-play\"></i>\n            </div>\n        </div>\n\n        <div data-selector=\"button-icon-pause\" class=\"{{css}}-button-container {{disablepause ? css + '-disabled' : ''}}\"\n             ba-if=\"{{playing}}\" ba-click=\"pause()\" title=\"{{disablepause ? string('pause-video-disabled') : string('pause-video')}}\">\n            <div class=\"{{css}}-button-inner\">\n                <i class=\"{{css}}-icon-pause\"></i>\n            </div>\n        </div>\n\n        <div class=\"{{css}}-volume-icon-container\">\n\n            <div data-selector=\"button-icon-volume\" class=\"{{css}}-button-container\" ba-click=\"toggle_volume()\" title=\"{{string(volume > 0 ? 'volume-mute' : 'volume-unmute')}}\">\n                <div class=\"{{css}}-button-inner\">\n                    <i class=\"{{css + '-icon-volume-' + (volume >= 0.5 ? 'up' : (volume > 0 ? 'down' : 'off')) }}\"></i>\n                </div>\n            </div>\n\n            <div class=\"{{css}}-volumebar\">\n                <div data-selector=\"button-volume-bar\" class=\"{{css}}-volumebar-inner\"\n                     onmousedown=\"{{startVerticallyUpdateVolume(domEvent)}}\"\n                     onmouseup=\"{{stopVerticallyUpdateVolume(domEvent)}}\"\n                     onmouseleave=\"{{stopVerticallyUpdateVolume(domEvent)}}\"\n                     onmousemove=\"{{progressVerticallyUpdateVolume(domEvent)}}\">\n                    <div class=\"{{css}}-volumebar-position\" ba-styles=\"{{{height: Math.ceil(1+Math.min(99, Math.round(volume * 100))) + '%'}}}\" title=\"{{string('volume-button')}}\"></div>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"{{css}}-time-container\">\n            <div class=\"{{css}}-time-value\" title=\"{{string('elapsed-time')}}\">{{formatTime(position)}}</div>\n        </div>\n    </div>\n\n    <div class=\"{{css}}-right-block\">\n\n        <div data-selector=\"button-icon-resize-full\" class=\"{{css}}-button-container {{css}}-fullscreen-icon-container\"\n            ba-if=\"{{fullscreen}}\" ba-click=\"toggle_fullscreen()\" title=\"{{ fullscreened ? string('exit-fullscreen-video') : string('fullscreen-video') }}\" >\n            <div class=\"{{css}}-button-inner {{css}}-full-screen-btn-inner\">\n                <i class=\"{{css}}-icon-resize-{{fullscreened ? 'small' : 'full'}}\"></i>\n            </div>\n        </div>\n\n        <div data-selector=\"button-airplay\" class=\"{{css}}-button-container {{css}}-airplay-container\" ba-show=\"{{airplaybuttonvisible}}\" ba-click=\"show_airplay_devices()\">\n            <svg width=\"16px\" height=\"11px\" viewBox=\"0 0 16 11\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n                <!-- Generator: Sketch 3.3.2 (12043) - http://www.bohemiancoding.com/sketch -->\n                <title>Airplay</title>\n                <desc>Airplay icon.</desc>\n                <defs></defs>\n                <g stroke=\"none\" stroke-width=\"1\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n                    <path d=\"M4,11 L12,11 L8,7 L4,11 Z M14.5454545,0 L1.45454545,0 C0.654545455,0 0,0.5625 0,1.25 L0,8.75 C0,9.4375 0.654545455,10 1.45454545,10 L4.36363636,10 L4.36363636,8.75 L1.45454545,8.75 L1.45454545,1.25 L14.5454545,1.25 L14.5454545,8.75 L11.6363636,8.75 L11.6363636,10 L14.5454545,10 C15.3454545,10 16,9.4375 16,8.75 L16,1.25 C16,0.5625 15.3454545,0 14.5454545,0 L14.5454545,0 Z\" sketch:type=\"MSShapeGroup\"></path>\n                </g>\n            </svg>\n        </div>\n\n        <div data-selector=\"button-chromecast\" class=\"{{css}}-button-container {{css}}-cast-button-container\" ba-show=\"{{castbuttonvisble}}\">\n            <button class=\"{{css}}-gcast-button\" is=\"google-cast-button\"></button>\n        </div>\n\n        <div data-selector=\"button-stream-label\" class=\"{{css}}-button-container {{css}}-stream-label-container\" ba-if=\"{{streams.length > 1 && currentstream}}\" ba-click=\"toggle_stream()\" title=\"{{string('change-resolution')}}\">\n            <div class=\"{{css}}-button-inner {{css}}-stream-label-container\">\n                <span class=\"{{css}}-button-text {{css}}-stream-label\">{{currentstream_label}}</span>\n            </div>\n        </div>\n\n        <div class=\"{{css}}-time-container {{css}}-right-time-container\">\n            <div class=\"{{css}}-time-value\" title=\"{{string('total-time')}}\">{{formatTime(duration || position)}}</div>\n        </div>\n\n    </div>\n\n    <div class=\"{{css}}-progressbar {{disableseeking ? css + '-disabled' : ''}}\">\n        <div data-selector=\"progress-bar-inner\" class=\"{{css}}-progressbar-inner\"\n             onmousedown=\"{{startUpdatePosition(domEvent)}}\"\n             onmouseup=\"{{stopUpdatePosition(domEvent)}}\"\n             onmouseleave=\"{{stopUpdatePosition(domEvent)}}\"\n             onmousemove=\"{{progressUpdatePosition(domEvent)}}\">\n\n            <div class=\"{{css}}-progressbar-cache\" ba-styles=\"{{{width: Math.round(duration ? cached / duration * 100 : 0) + '%'}}}\"></div>\n            <div class=\"{{css}}-progressbar-position\" ba-styles=\"{{{width: Math.round(duration ? position / duration * 100 : 0) + '%'}}}\" title=\"{{string('video-progress')}}\">\n                <div class=\"{{css}}-progressbar-button\"></div>\n            </div>\n        </div>\n    </div>\n\n</div>\n",
            cssloader: ie8 ? "ba-videoplayer" : "",
            cssmessage: "ba-videoplayer",
            cssplaybutton: ie8 ? "ba-videoplayer" : ""
        }
    };
});
Scoped.extend("module:Assets.recorderthemes", [
    "dynamics:Parser"
], function(Parser) {
    Parser.registerFunctions({ /**/"css": function (obj) { with (obj) { return css; } }, "settingsvisible && settingsopen": function (obj) { with (obj) { return settingsvisible && settingsopen; } }, "cameras": function (obj) { with (obj) { return cameras; } }, "selectedcamera == camera.id": function (obj) { with (obj) { return selectedcamera == camera.id; } }, "selectCamera(camera.id)": function (obj) { with (obj) { return selectCamera(camera.id); } }, "camera.label": function (obj) { with (obj) { return camera.label; } }, "microphones": function (obj) { with (obj) { return microphones; } }, "audio": function (obj) { with (obj) { return audio; } }, "selectMicrophone(microphone.id)": function (obj) { with (obj) { return selectMicrophone(microphone.id); } }, "selectedmicrophone == microphone.id": function (obj) { with (obj) { return selectedmicrophone == microphone.id; } }, "microphone.label": function (obj) { with (obj) { return microphone.label; } }, "rerecordvisible": function (obj) { with (obj) { return rerecordvisible; } }, "rerecord()": function (obj) { with (obj) { return rerecord(); } }, "hover(string('rerecord-tooltip'))": function (obj) { with (obj) { return hover(string('rerecord-tooltip')); } }, "unhover()": function (obj) { with (obj) { return unhover(); } }, "string('rerecord')": function (obj) { with (obj) { return string('rerecord'); } }, "cancelvisible": function (obj) { with (obj) { return cancelvisible; } }, "cancel()": function (obj) { with (obj) { return cancel(); } }, "hover(string('cancel-tooltip'))": function (obj) { with (obj) { return hover(string('cancel-tooltip')); } }, "string('cancel')": function (obj) { with (obj) { return string('cancel'); } }, "settingsvisible": function (obj) { with (obj) { return settingsvisible; } }, "settingsopen ? 'selected' : 'unselected'": function (obj) { with (obj) { return settingsopen ? 'selected' : 'unselected'; } }, "settingsopen=!settingsopen": function (obj) { with (obj) { return settingsopen=!settingsopen; } }, "hover(string('settings'))": function (obj) { with (obj) { return hover(string('settings')); } }, "!noaudio": function (obj) { with (obj) { return !noaudio; } }, "hover(string(microphonehealthy ? 'microphonehealthy' : 'microphoneunhealthy'))": function (obj) { with (obj) { return hover(string(microphonehealthy ? 'microphonehealthy' : 'microphoneunhealthy')); } }, "microphonehealthy ? 'good' : 'bad'": function (obj) { with (obj) { return microphonehealthy ? 'good' : 'bad'; } }, "!novideo": function (obj) { with (obj) { return !novideo; } }, "hover(string(camerahealthy ? 'camerahealthy' : 'cameraunhealthy'))": function (obj) { with (obj) { return hover(string(camerahealthy ? 'camerahealthy' : 'cameraunhealthy')); } }, "camerahealthy ? 'good' : 'bad'": function (obj) { with (obj) { return camerahealthy ? 'good' : 'bad'; } }, "recordvisible": function (obj) { with (obj) { return recordvisible; } }, "record()": function (obj) { with (obj) { return record(); } }, "hover(string('record-tooltip'))": function (obj) { with (obj) { return hover(string('record-tooltip')); } }, "string('record')": function (obj) { with (obj) { return string('record'); } }, "stopvisible": function (obj) { with (obj) { return stopvisible; } }, "controlbarlabel && !rerecordvisible": function (obj) { with (obj) { return controlbarlabel && !rerecordvisible; } }, "controlbarlabel": function (obj) { with (obj) { return controlbarlabel; } }, "mintimeindicator ? css + '-disabled': ''": function (obj) { with (obj) { return mintimeindicator ? css + '-disabled': ''; } }, "mintimeindicator ? string('stop-available-after').replace('%d', timeminlimit) : string('stop-tooltip')": function (obj) { with (obj) { return mintimeindicator ? string('stop-available-after').replace('%d', timeminlimit) : string('stop-tooltip'); } }, "stop()": function (obj) { with (obj) { return stop(); } }, "hover(mintimeindicator ? string('stop-available-after').replace('%d', timeminlimit) : string('stop-tooltip'))": function (obj) { with (obj) { return hover(mintimeindicator ? string('stop-available-after').replace('%d', timeminlimit) : string('stop-tooltip')); } }, "string('stop')": function (obj) { with (obj) { return string('stop'); } }, "skipvisible": function (obj) { with (obj) { return skipvisible; } }, "skip()": function (obj) { with (obj) { return skip(); } }, "hover(string('skip-tooltip'))": function (obj) { with (obj) { return hover(string('skip-tooltip')); } }, "string('skip')": function (obj) { with (obj) { return string('skip'); } }, "uploadcovershotvisible": function (obj) { with (obj) { return uploadcovershotvisible; } }, "hover(string('upload-covershot-tooltip'))": function (obj) { with (obj) { return hover(string('upload-covershot-tooltip')); } }, "uploadCovershot(domEvent)": function (obj) { with (obj) { return uploadCovershot(domEvent); } }, "covershot_accept_string": function (obj) { with (obj) { return covershot_accept_string; } }, "string('upload-covershot')": function (obj) { with (obj) { return string('upload-covershot'); } }/**/ });
    Parser.registerFunctions({ /**/"css": function (obj) { with (obj) { return css; } }, "left()": function (obj) { with (obj) { return left(); } }, "images": function (obj) { with (obj) { return images; } }, "{left: image.left + 'px', top: image.top + 'px', width: image.width + 'px', height: image.height + 'px'}": function (obj) { with (obj) { return {left: image.left + 'px', top: image.top + 'px', width: image.width + 'px', height: image.height + 'px'}; } }, "select(image)": function (obj) { with (obj) { return select(image); } }, "right()": function (obj) { with (obj) { return right(); } }/**/ });
    Parser.registerFunctions({ /**/"css": function (obj) { with (obj) { return css; } }, "has_primary": function (obj) { with (obj) { return has_primary; } }, "enable_primary_select && primary_select_capture": function (obj) { with (obj) { return enable_primary_select && primary_select_capture; } }, "primary_select(domEvent)": function (obj) { with (obj) { return primary_select(domEvent); } }, "primary_accept_string": function (obj) { with (obj) { return primary_accept_string; } }, "enable_primary_select && !primary_select_capture": function (obj) { with (obj) { return enable_primary_select && !primary_select_capture; } }, "primary_label": function (obj) { with (obj) { return primary_label; } }, "primaryrecord ? 'record' : 'chooser-upload'": function (obj) { with (obj) { return primaryrecord ? 'record' : 'chooser-upload'; } }, "has_secondary": function (obj) { with (obj) { return has_secondary; } }, "enable_secondary_select && secondary_select_capture": function (obj) { with (obj) { return enable_secondary_select && secondary_select_capture; } }, "secondary_select(domEvent)": function (obj) { with (obj) { return secondary_select(domEvent); } }, "secondary_accept_string": function (obj) { with (obj) { return secondary_accept_string; } }, "enable_secondary_select && !secondary_select_capture": function (obj) { with (obj) { return enable_secondary_select && !secondary_select_capture; } }, "secondary_label": function (obj) { with (obj) { return secondary_label; } }, "primary()": function (obj) { with (obj) { return primary(); } }, "secondary()": function (obj) { with (obj) { return secondary(); } }/**/ });
    Parser.registerFunctions({ /**/"css": function (obj) { with (obj) { return css; } }, "shortMessage ? 'short-message' : 'long-message'": function (obj) { with (obj) { return shortMessage ? 'short-message' : 'long-message'; } }, "message || \"\"": function (obj) { with (obj) { return message || ""; } }, "click()": function (obj) { with (obj) { return click(); } }/**/ });
    return {
        "theatre": {
            css: "ba-videorecorder-theme-theatre",
            cssmessage: "ba-videorecorder",
            cssloader: "ba-videorecorder",
            tmplcontrolbar: "<div class=\"{{css}}-dashboard\">\n\n\t<div class=\"{{css}}-settings-front\">\n\n\t\t<!-- Popup Settings Selections, initially hidden, appear when click button for settings -->\n\t\t<div data-selector=\"recorder-settings\" class=\"{{css}}-settings\" ba-show=\"{{settingsvisible && settingsopen}}\">\n\t\t\t<div class=\"{{css}}-bubble-info\">\n\t\t\t\t<ul data-selector=\"camera-settings\" ba-repeat=\"{{camera :: cameras}}\">\n\t\t\t\t\t<li>\n\t\t\t\t\t\t<input type='radio' name='camera' value=\"{{selectedcamera == camera.id}}\" onclick=\"{{selectCamera(camera.id)}}\" />\n\t\t\t\t\t\t<span></span>\n\t\t\t\t\t\t<label onclick=\"{{selectCamera(camera.id)}}\">\n\t\t\t\t\t\t\t{{camera.label}}\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</li>\n\t\t\t\t</ul>\n\t\t\t\t<ul data-selector=\"microphone-settings\" ba-repeat=\"{{microphone :: microphones}}\" ba-show=\"{{audio}}\">\n\t\t\t\t\t<li onclick=\"{{selectMicrophone(microphone.id)}}\">\n\t\t\t\t\t\t<input type='radio' name='microphone' value=\"{{selectedmicrophone == microphone.id}}\" />\n\t\t\t\t\t\t<span></span>\n\t\t\t\t\t\t<label>\n\t\t\t\t\t\t\t{{microphone.label}}\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</li>\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t</div>\n\n\t</div>\n\n\t<!-- Control bar, footer part which holds all buttons -->\n\t<div data-selector=\"controlbar\" class=\"{{css}}-controlbar\">\n\n\t\t<div class=\"{{css}}-controlbar-center-section\">\n\n\t\t\t<div class=\"{{css}}-button-container\" ba-show=\"{{rerecordvisible}}\">\n\t\t\t\t<div data-selector=\"rerecord-primary-button\" class=\"{{css}}-button-primary\"\n\t\t\t\t\t onclick=\"{{rerecord()}}\"\n\t\t\t\t\t onmouseenter=\"{{hover(string('rerecord-tooltip'))}}\"\n\t\t\t\t\t onmouseleave=\"{{unhover()}}\">\n\t\t\t\t\t{{string('rerecord')}}\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div class=\"{{css}}-button-container\" ba-show=\"{{cancelvisible}}\">\n\t\t\t\t<div data-selector=\"cancel-primary-button\" class=\"{{css}}-button-primary\"\n\t\t\t\t\t onclick=\"{{cancel()}}\"\n\t\t\t\t\t onmouseenter=\"{{hover(string('cancel-tooltip'))}}\"\n\t\t\t\t\t onmouseleave=\"{{unhover()}}\">\n\t\t\t\t\t{{string('cancel')}}\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t</div>\n\n\t\t<div class=\"{{css}}-controlbar-left-section\" ba-show=\"{{settingsvisible}}\">\n\n            <div class=\"{{css}}-button\" ba-show=\"{{settingsvisible}}\">\n\n\t\t\t\t<div data-selector=\"record-button-icon-cog\" class=\"{{css}}-button-inner {{css}}-button-{{settingsopen ? 'selected' : 'unselected' }}\"\n\t\t\t\t\t onclick=\"{{settingsopen=!settingsopen}}\"\n\t\t\t\t\t onmouseenter=\"{{hover(string('settings'))}}\"\n\t\t\t\t\t onmouseleave=\"{{unhover()}}\" >\n\t\t\t\t\t<i class=\"{{css}}-icon-cog\"></i>\n\t\t\t\t</div>\n\n\t\t\t</div>\n\n\t\t\t<div class=\"{{css}}-button\" ba-show=\"{{!noaudio}}\">\n\t\t\t\t<div data-selector=\"record-button-icon-mic\" class=\"{{css}}-button-inner\"\n\t\t\t\t\tonmouseenter=\"{{hover(string(microphonehealthy ? 'microphonehealthy' : 'microphoneunhealthy'))}}\"\n\t\t\t\t\tonmouseleave=\"{{unhover()}}\">\n\t\t\t\t\t<i class=\"{{css}}-icon-mic {{css}}-icon-state-{{microphonehealthy ? 'good' : 'bad' }}\"></i>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div class=\"{{css}}-button\" ba-show=\"{{!novideo}}\">\n\t\t\t\t<div data-selector=\"record-button-icon-videocam\" class=\"{{css}}-button-inner\"\n\t\t\t\t\tonmouseenter=\"{{hover(string(camerahealthy ? 'camerahealthy' : 'cameraunhealthy'))}}\"\n\t\t\t\t\tonmouseleave=\"{{unhover()}}\">\n                    <i class=\"{{css}}-icon-videocam {{css}}-icon-state-{{ camerahealthy ? 'good' : 'bad' }}\"></i>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div class=\"{{css}}-controlbar-right-section\">\n\n\t\t\t<div class=\"{{css}}-rightbutton-container\" ba-show=\"{{recordvisible}}\">\n\t\t\t\t<div data-selector=\"record-primary-button\" class=\"{{css}}-button-primary\"\n\t\t\t\t\t onclick=\"{{record()}}\"\n\t\t\t\t\t onmouseenter=\"{{hover(string('record-tooltip'))}}\"\n\t\t\t\t\t onmouseleave=\"{{unhover()}}\">\n\t\t\t\t\t{{string('record')}}\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t</div>\n\n\t\t<div class=\"{{css}}-stop-container\" ba-show=\"{{stopvisible}}\">\n\n\t\t\t<div class=\"{{css}}-timer-container\">\n\t\t\t\t<div class=\"{{css}}-label-container\" ba-show=\"{{controlbarlabel && !rerecordvisible}}\">\n\t\t\t\t\t<div data-selector=\"record-label-block\" class=\"{{css}}-label {{css}}-button-primary\">\n\t\t\t\t\t\t{{controlbarlabel}}\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div class=\"{{css}}-stop-button-container\">\n\t\t\t\t<div data-selector=\"stop-primary-button\" class=\"{{css}}-button-primary {{mintimeindicator ? css + '-disabled': ''}}\"\n\t\t\t\t\t title=\"{{mintimeindicator ? string('stop-available-after').replace('%d', timeminlimit) : string('stop-tooltip')}}\"\n\t\t\t\t\t onclick=\"{{stop()}}\"\n\t\t\t\t\t onmouseenter=\"{{hover(mintimeindicator ? string('stop-available-after').replace('%d', timeminlimit) : string('stop-tooltip'))}}\"\n\t\t\t\t\t onmouseleave=\"{{unhover()}}\">\n\t\t\t\t\t{{string('stop')}}\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\n        <div class=\"{{css}}-centerbutton-container\" ba-show=\"{{skipvisible}}\">\n            <div data-selector=\"skip-primary-button\" class=\"{{css}}-button-primary\"\n                 onclick=\"{{skip()}}\"\n                 onmouseenter=\"{{hover(string('skip-tooltip'))}}\"\n                 onmouseleave=\"{{unhover()}}\">\n                {{string('skip')}}\n            </div>\n        </div>\n\n\n        <div class=\"{{css}}-rightbutton-container\" ba-if=\"{{uploadcovershotvisible}}\">\n            <div data-selector=\"covershot-primary-button\" class=\"{{css}}-button-primary\"\n                 onmouseenter=\"{{hover(string('upload-covershot-tooltip'))}}\"\n                 onmouseleave=\"{{unhover()}}\">\n                <input type=\"file\"\n                       class=\"{{css}}-chooser-file\"\n                       style=\"height:100px\"\n                       onchange=\"{{uploadCovershot(domEvent)}}\"\n                       accept=\"{{covershot_accept_string}}\" />\n                <span>\n                    {{string('upload-covershot')}}\n                </span>\n            </div>\n        </div>\n\n\t</div>\n\n</div>\n",
            tmplimagegallery: "<div data-selector=\"image-gallery\" class=\"{{css}}-image-gallery-container\">\n\n\t<div data-selector=\"slider-left-button\" class=\"{{css}}-imagegallery-leftbutton\">\n\t\t<div data-selector=\"slider-left-inner-button\" class=\"{{css}}-imagegallery-button-inner\" onclick=\"{{left()}}\">\n\t\t\t<i class=\"{{css}}-icon-left-open\"></i>\n\t\t</div>\n\t</div>\n\n\t<div data-selector=\"images-imagegallery-container\" ba-repeat=\"{{image::images}}\" class=\"{{css}}-imagegallery-container\" data-gallery-container>\n\t\t<div class=\"{{css}}-imagegallery-image\"\n\t\t\t ba-styles=\"{{{left: image.left + 'px', top: image.top + 'px', width: image.width + 'px', height: image.height + 'px'}}}\"\n\t\t\t onclick=\"{{select(image)}}\">\n\t\t</div>\n\t</div>\n\n\t<div data-selector=\"slider-right-button\" class=\"{{css}}-imagegallery-rightbutton\">\n\t\t<div data-selector=\"slider-right-inner-button\" class=\"{{css}}-imagegallery-button-inner\" onclick=\"{{right()}}\">\n\t\t\t<i class=\"{{css}}-icon-right-open\"></i>\n\t\t</div>\n\t</div>\n\n</div>\n",
            tmplchooser: "\n<div class=\"{{css}}-chooser-container\">\n\n\t<div class=\"{{css}}-chooser-button-container\">\n\t\t<div>\n\t\t\t<div data-selector=\"chooser-primary-button\" class=\"{{css}}-chooser-primary-button\"\n\t\t\t     ba-click=\"primary()\"\n\t\t\t     ba-if=\"{{has_primary}}\">\n\t\t\t\t<input data-selector=\"file-input-opt1\" ba-if=\"{{enable_primary_select && primary_select_capture}}\"\n\t\t\t\t       type=\"file\"\n\t\t\t\t       class=\"{{css}}-chooser-file\"\n\t\t\t\t       style=\"height:100\"\n\t\t\t\t       onchange=\"{{primary_select(domEvent)}}\"\n\t\t\t\t       accept=\"{{primary_accept_string}}\"\n\t\t\t\t       capture />\n\t\t\t\t<input data-selector=\"file-input-opt2\" ba-if=\"{{enable_primary_select && !primary_select_capture}}\"\n\t\t\t\t       type=\"file\"\n\t\t\t\t       class=\"{{css}}-chooser-file\"\n\t\t\t\t       style=\"height:100\"\n\t\t\t\t       onchange=\"{{primary_select(domEvent)}}\"\n\t\t\t\t       accept=\"{{primary_accept_string}}\" />\n\t\t\t\t<span>\n\t\t\t\t\t{{primary_label}}\n\t\t\t\t</span>\n\t\t\t\t<i class=\"{{css}}-icon-{{primaryrecord ? 'record' : 'chooser-upload'}}\"></i>\n\t\t\t</div>\n\t\t</div>\n\t\t<div>\n\t\t\t<div data-selector=\"chooser-secondary-button\" class=\"{{css}}-chooser-secondary-button\"\n\t\t\t     ba-click=\"secondary()\"\n\t\t\t     ba-if=\"{{has_secondary}}\">\n\t\t\t\t<input data-selector=\"file-input-secondary-opt1\" ba-if=\"{{enable_secondary_select && secondary_select_capture}}\"\n\t\t\t\t       type=\"file\"\n\t\t\t\t       class=\"{{css}}-chooser-file\"\n\t\t\t\t       style=\"height:100\"\n\t\t\t\t       onchange=\"{{secondary_select(domEvent)}}\"\n\t\t\t\t       accept=\"{{secondary_accept_string}}\" />\n\t\t\t\t<input data-selector=\"file-input-secondary-opt2\" ba-if=\"{{enable_secondary_select && !secondary_select_capture}}\"\n\t\t\t\t       type=\"file\"\n\t\t\t\t       class=\"{{css}}-chooser-file\"\n\t\t\t\t       style=\"height:100\"\n\t\t\t\t       onchange=\"{{secondary_select(domEvent)}}\"\n\t\t\t\t       accept=\"{{secondary_accept_string}}\" />\n\t\t\t\t<span>\n\t\t\t\t\t{{secondary_label}}\n\t\t\t\t</span>\n\t\t\t\t<i class=\"{{css}}-icon-chooser-upload\"></i>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n",
            tmplmessage: "<div data-selector=\"recorder-message-container\" class=\"{{css}}-message-container\" ba-click=\"click()\">\n    <div class=\"{{css}}-top-inner-message-container {{css}}-{{shortMessage ? 'short-message' : 'long-message'}}\">\n        <div class=\"{{css}}-first-inner-message-container\">\n            <div class=\"{{css}}-second-inner-message-container\">\n                <div class=\"{{css}}-third-inner-message-container\">\n                    <div class=\"{{css}}-fourth-inner-message-container\">\n                        <div data-selector=\"recorder-message-block\" class='{{css}}-message-message'>\n                            {{message || \"\"}}\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n"
        }
    };
});
}).call(Scoped);