// ==UserScript==
// @name       Video Streaming Links Overlay
// @namespace  http://gist.github.com/75664546a4dfe7fdfced
// @version    0.1
// @description  This creates an overlay window of links to video streams.
// @match
// ==/UserScript==

/*
TODO Maybe impliment window.setinterval?
TODO This only works with Chrome due to usage of window.preformance.getEntries.
*/

(function() {
	var OVERLAY_CLASS_NAME = "links-overlay";

	var links = [];
	var regex = /([/|.|\w|\s])*\.(?:mpg|flv|avi)/;

	var Overlay = {
		addLinkToOverlay: function(link) {
			var html_template = '<br/> <a class="link" href="' + link + '">' + link + '</a>';
			var overlay = document.getElementsByClassName(OVERLAY_CLASS_NAME)[0];

			if (overlay) {
				overlay.insertAdjacentHTML("beforeend", html_template);
			}
		},

		createOverlay: function() {
			var body = document.body;
			var html = document.createElement('div');

			html.classList.add(OVERLAY_CLASS_NAME);

			html.style.backgroundColor = "white";
			html.style.border = "1px solid #CCC";
			html.style.fontSize = '10px';
			html.style.height = '400px';
			html.style.overflow = 'scroll';
			html.style.padding = '5px';
			html.style.position = "fixed";
			html.style.top = '30px';
			html.style.width = '200px';

			body.appendChild(html);
		}
	};

	/* Init */
	if (navigator.userAgent.match("Chrome")) {
		for (var i = 0; i < window.performance.getEntries().length; i++) {
			var entry = window.performance.getEntries()[i].name;
			var regexTest = entry.match(regex);

			if (regexTest) {
				//console.log(entry);
				links.push(entry);
			}
		}

		if (links.length > 0) {
			var overlay = document.getElementsByClassName(OVERLAY_CLASS_NAME)[0];

			if (!overlay) {
				Overlay.createOverlay();
			}

			for (var i = 0; i < links.length; i++) {
				Overlay.addLinkToOverlay(links[i]);
			}
		}
	} else {
		console.log("I only have Chrome for now");
	}
})();
