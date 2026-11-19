/*
 * Games Foundation – spam-protected e-mail links
 *
 * The HTML contains no complete e-mail addresses. This script builds them in
 * the visitor's browser, so simple address-harvesting robots (which do not run
 * JavaScript) find nothing.
 *
 * Usage in index.html:
 *   <a data-mail="investors">Apply</a>          -> link to investors@gamesfoundation.com
 *   <a data-mail="info" data-mail-show>…</a>    -> link that also shows the address as text
 */
(function () {
	'use strict';

	var domain = ['gamesfoundation', 'com'].join('.');

	function run() {
		var links = document.querySelectorAll('[data-mail]');
		for (var i = 0; i < links.length; i++) {
			var el = links[i];
			var address = el.getAttribute('data-mail') + String.fromCharCode(64) + domain;
			el.setAttribute('href', 'mailto:' + address);
			if (el.hasAttribute('data-mail-show')) el.textContent = address;
		}
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', run);
	} else {
		run();
	}
})();
