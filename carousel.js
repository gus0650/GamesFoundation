/*
 * Games Foundation – project carousel
 *
 * Turns every <ul class="carousel"> into a swipeable slider. Swiping and
 * snapping are plain CSS (scroll-snap, see style.css); this script only adds
 * the left/right arrows, the dots and keyboard support.
 *
 * Each <li> in the list is one slide. To add a game, add another <li>.
 */
(function () {
	'use strict';

	function setup(list) {
		var slides = list.children;
		if (slides.length < 2) return;

		var wrap = document.createElement('section');
		wrap.className = 'carousel-wrap';
		list.parentNode.insertBefore(wrap, list);
		wrap.appendChild(list);

		list.setAttribute('tabindex', '0');

		var index = 0;

		function current() {
			return index;
		}

		function go(i) {
			var n = slides.length;
			index = (i + n) % n;
			list.scrollTo({ left: slides[index].offsetLeft - slides[0].offsetLeft, behavior: 'smooth' });
			markActive();
		}

		function makeArrow(cls, label, symbol, step) {
			var b = document.createElement('button');
			b.type = 'button';
			b.className = 'carousel-arrow ' + cls;
			b.setAttribute('aria-label', label);
			b.textContent = symbol;
			b.addEventListener('click', function () { go(current() + step); });
			wrap.appendChild(b);
		}
		makeArrow('carousel-prev', 'Previous', '‹', -1);
		makeArrow('carousel-next', 'Next', '›', 1);

		var dots = document.createElement('p');
		dots.className = 'carousel-dots';
		var dotButtons = [];
		for (var i = 0; i < slides.length; i++) {
			(function (i) {
				var d = document.createElement('button');
				d.type = 'button';
				d.setAttribute('aria-label', String(i + 1));
				d.addEventListener('click', function () { go(i); });
				dots.appendChild(d);
				dotButtons.push(d);
			})(i);
		}
		wrap.appendChild(dots);

		function markActive() {
			var c = index;
			for (var i = 0; i < dotButtons.length; i++) {
				dotButtons[i].className = (i === c) ? 'active' : '';
			}
		}

		// After a swipe has settled, take the slide position from the scroll offset.
		var settle;
		list.addEventListener('scroll', function () {
			clearTimeout(settle);
			settle = setTimeout(function () {
				index = Math.min(slides.length - 1, Math.round(list.scrollLeft / slides[0].offsetWidth));
				markActive();
			}, 150);
		});

		list.addEventListener('keydown', function (e) {
			if (e.key === 'ArrowLeft') { e.preventDefault(); go(current() - 1); }
			if (e.key === 'ArrowRight') { e.preventDefault(); go(current() + 1); }
		});

		markActive();
	}

	function run() {
		var lists = document.querySelectorAll('ul.carousel');
		for (var i = 0; i < lists.length; i++) setup(lists[i]);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', run);
	} else {
		run();
	}
})();
