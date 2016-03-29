var myButton = document.querySelectorAll('button#testButton')[0];

//store and define the function
var myCallback = function() {
  console.log('button clicked!');
};

myButton.addEventListener('click', myCallback);


// The callback can be removed, since we have a reference.

myButton.removeEventListener('click', myCallback)











// ==UserScript==
// @name        GoogleAnalytics Change Provider
// @description Change Provider Name
// @include     https://analytics.google.com/analytics/web/*
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require     https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant       GM_xmlhttpRequest
// ==/UserScript==
var providers = new Array ();

GM_xmlhttpRequest ( {
    method: "GET",
    url: "http://localhost:3000/api/t2_provider_list",
    onload: function (response) {
        var provider_list = JSON.parse (response.responseText);

        for (i = 0; i < provider_list.length; i++) {
            providers[provider_list[i].analytics_prefix] = provider_list[i].provider_name;
        }
        waitForKeyElements ("table#ID-rowTable tr td span._GAmD", replaceAffid);
    }
} );

/*--- replaceAffid ():  Match the fields with a given pattern 
and replace with the provider name and affid
*/
function replaceAffid () {
    console.log (providers);
    var regExp = /([a-z,A-Z,0-9]+)---([a-z,A-Z,0-9,_,-]+)/g;

    var spans = document.evaluate ("//span[contains(@class, '_GAmD') and not(contains(@class, '_GAe'))]/text()", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    console.log (spans);
    for (var i = 0; i < spans.snapshotLength; i++) {
        match = regExp.exec (spans.snapshotItem (i).textContent);

        if (match != null) {
            if (typeof providers[match[1]] === undefined) {
                // do nothing
            } else {
                spans.snapshotItem (i).textContent = "Provider: " + providers[match[1]] + " \n\r  Affid: " + match[2];
            }
        }
    }
}









//////////////////////




var style = createStyle('body{background-color:' + color + ' !important;}');
var alreadyAdded = false;
 
// add style when on board page
waitForKeyElements(".board-wrapper", function() {
  if (!alreadyAdded) {
    document.body.appendChild(style);
    alreadyAdded = true;
  }
});
 
// remove style when on board list page
waitForKeyElements('.member-boards-view', function() {
  if (style.parentNode) {
    style.parentNode.removeChild(style);
  }
  alreadyAdded = false;
});








