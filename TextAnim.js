/*
 * Games Foundation – text animation ("arcade decode")
 *
 * For every element with the attribute data-textanim, the comma-separated
 * words inside (e.g. "Steam, Xbox, PlayStation") are turned into tiles.
 * When the element scrolls into view, the tiles appear one after another and
 * each word "decodes" from random characters like an old arcade screen.
 * Afterwards one random word after another re-decodes in an endless loop.
 *
 * The original text stays in the HTML, so search engines and visitors
 * without JavaScript still see the plain list. Visitors who have reduced
 * motion enabled in their operating system get the tiles without animation.
 *
 * Usage in index.html (a <br> forces a line break):
 *   <p data-textanim>Steam, Xbox, PlayStation, Nintendo,<br>PlayStore, AppStore</p>
 */
(function () {
	'use strict';

	var GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*+<>/\\=?';
	var STEP_MS = 30;        // speed of the character flicker
	var STAGGER_MS = 220;    // delay between two tiles appearing
	var LOOP_PAUSE_MS = 60;  // pause between two re-decodes in the endless loop

	var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	function randomGlyph() {
		return GLYPHS.charAt(Math.floor(Math.random() * GLYPHS.length));
	}

	// Reveal "word" in "el" from left to right, scrambling the characters not yet settled.
	function decode(el, word, done) {
		var frame = 0;
		var settleEvery = 2; // frames per settled character
		function tick() {
			var settled = Math.floor(frame / settleEvery);
			var out = '';
			for (var i = 0; i < word.length; i++) {
				if (i < settled || word.charAt(i) === ' ') out += word.charAt(i);
				else out += randomGlyph();
			}
			el.textContent = out;
			frame++;
			if (settled < word.length) {
				setTimeout(tick, STEP_MS);
			} else {
				el.textContent = word;
				if (done) done();
			}
		}
		tick();
	}

	function setup(container) {
		// Collect the comma-separated words; a <br> in the HTML becomes a line break.
		var items = [];
		for (var n = 0; n < container.childNodes.length; n++) {
			var node = container.childNodes[n];
			if (node.nodeName === 'BR') { items.push(null); continue; }
			(node.textContent || '').split(',').forEach(function (w) {
				w = w.trim();
				if (w) items.push(w);
			});
		}
		var words = items.filter(function (w) { return w !== null; });
		if (!words.length) return;

		container.setAttribute('aria-label', words.join(', '));
		container.textContent = '';
		container.classList.add('textanim');

		var tiles = [];
		items.forEach(function (w) {
			if (w === null) { container.appendChild(document.createElement('br')); return; }
			var t = document.createElement('span');
			t.className = 'textanim-tile';
			t.setAttribute('aria-hidden', 'true');
			t.textContent = w;
			container.appendChild(t);
			container.appendChild(document.createTextNode(' '));
			tiles.push(t);
		});

		if (reduceMotion) {
			tiles.forEach(function (t) { t.classList.add('on'); });
			return;
		}

		var started = false;
		function start() {
			if (started) return;
			started = true;
			tiles.forEach(function (t, i) {
				setTimeout(function () {
					t.classList.add('on');
					decode(t, words[i]);
				}, i * STAGGER_MS);
			});
			// Endless loop: as soon as one word has decoded, the next random word starts.
			var last = -1;
			function loop() {
				var i;
				do { i = Math.floor(Math.random() * tiles.length); } while (tiles.length > 1 && i === last);
				last = i;
				var t = tiles[i];
				t.classList.add('glitch');
				decode(t, words[i], function () {
					t.classList.remove('glitch');
					setTimeout(loop, LOOP_PAUSE_MS);
				});
			}
			setTimeout(loop, tiles.length * STAGGER_MS + 400);
		}

		if ('IntersectionObserver' in window) {
			var io = new IntersectionObserver(function (entries) {
				entries.forEach(function (e) {
					if (e.isIntersecting) { start(); io.disconnect(); }
				});
			}, { threshold: 0.4 });
			io.observe(container);
		} else {
			start();
		}
	}

	function run() {
		var els = document.querySelectorAll('[data-textanim]');
		for (var i = 0; i < els.length; i++) setup(els[i]);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', run);
	} else {
		run();
	}
})();
