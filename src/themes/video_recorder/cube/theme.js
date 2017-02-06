Scoped.extend("module:Assets.recorderthemes", [
    "module:Templates"
], function (Templates) {
	return {
		"cube": {
			css: "ba-videorecorder-theme-cube",
			cssmessage: "ba-videorecorder",
			cssloader: "ba-videorecorder",
      tmpltopmessage: Templates["cube-video_recorder_topmessage"],
      tmplcontrolbar: Templates["cube-video_recorder_controlbar"],
      tmplimagegallery: Templates["cube-recorder_imagegallery"],
			tmplloader: Templates["cube-video_recorder_loader"],
      tmplchooser: Templates["cube-video_recorder_chooser"],
      tmplmessage: Templates["cube-video_recorder_message"]
		}
	};
});
