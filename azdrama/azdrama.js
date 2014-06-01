// ==UserScript==
// @name       azdrama iframe remove
// @namespace  http://gist.github.com/75664546a4dfe7fdfced
// @version    0.1
// @description  Remove iframe from azdrama
// @match      http://azdrama.se/*
// ==/UserScript==

(function() {
	var iframes = document.querySelectorAll('iframe');
 
	for (i=0; i < iframes.length; i++) {
		if (!iframes[i].src.match("videobug")) {
			iframes[i].parentNode.removeChild(iframes[i]);
		}
	}
 })(this);