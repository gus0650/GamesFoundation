/*
 * Games Foundation – automatic page translation
 *
 * Picks the visitor's language from the browser (which normally follows the
 * operating system language) and swaps the English page texts for built-in
 * translations. Everything runs locally: no external service, no cookies.
 *
 * Supported: de (German), da (Danish), sv (Swedish), no/nb/nn (Norwegian),
 * nl (Dutch). Every other language keeps the English original.
 *
 * Testing: add ?lang=de (or da, sv, no, nl, en) to the URL to force a language.
 *
 * How it works: each English text on the page is looked up in TEXTS below
 * (whitespace is ignored). If you change an English text in index.html, update
 * its key here too – otherwise that text simply stays in English.
 */
(function () {
	'use strict';

	var SUPPORTED = ['de', 'da', 'sv', 'no', 'nl'];

	// Section headings, keyed by the heading without spaces (e.g. "W E L C O M E !" -> "WELCOME!").
	var HEADINGS = {
		'WELCOME!':          { de: 'WILLKOMMEN!',      da: 'VELKOMMEN!',          sv: 'VÄLKOMMEN!',          no: 'VELKOMMEN!',           nl: 'WELKOM!' },
		'SERVICES':          { de: 'LEISTUNGEN',       da: 'YDELSER',             sv: 'TJÄNSTER',            no: 'TJENESTER',            nl: 'DIENSTEN' },
		'JOBS&INTERNSHIPS':  { de: 'JOBS & PRAKTIKA',  da: 'JOB & PRAKTIK',       sv: 'JOBB & PRAKTIK',      no: 'JOBB & PRAKSIS',       nl: 'VACATURES & STAGES' },
		'PROJECTS':          { de: 'PROJEKTE',         da: 'PROJEKTER',           sv: 'PROJEKT',             no: 'PROSJEKTER',           nl: 'PROJECTEN' },
		'AWARDS':            { de: 'AUSZEICHNUNGEN',   da: 'PRISER',              sv: 'UTMÄRKELSER',         no: 'PRISER',               nl: 'PRIJZEN' },
		'LINKS':             { de: 'LINKS',            da: 'LINKS',               sv: 'LÄNKAR',              no: 'LENKER',               nl: 'LINKS' },
		'CONTACT':           { de: 'KONTAKT',          da: 'KONTAKT',             sv: 'KONTAKT',             no: 'KONTAKT',              nl: 'CONTACT' },
		'DISCLAIMER':        { de: 'HAFTUNGSAUSSCHLUSS', da: 'ANSVARSFRASKRIVELSE', sv: 'ANSVARSFRISKRIVNING', no: 'ANSVARSFRASKRIVELSE', nl: 'DISCLAIMER' }
	};

	// Body texts, keyed by the English original (whitespace collapsed).
	var TEXTS = {
		'GAMES FOUNDATION is a production company that creates digital games for the international market.': {
			de: 'GAMES FOUNDATION ist ein Produktionsunternehmen, das digitale Spiele für den internationalen Markt entwickelt.',
			da: 'GAMES FOUNDATION er et produktionsselskab, der skaber digitale spil til det internationale marked.',
			sv: 'GAMES FOUNDATION är ett produktionsbolag som skapar digitala spel för den internationella marknaden.',
			no: 'GAMES FOUNDATION er et produksjonsselskap som lager digitale spill for det internasjonale markedet.',
			nl: 'GAMES FOUNDATION is een productiebedrijf dat digitale games maakt voor de internationale markt.'
		},
		'You have an amazing game and you need help getting it funded and published?': {
			de: 'Ihr habt ein großartiges Spiel und braucht Unterstützung bei Finanzierung und Veröffentlichung?',
			da: 'Har du et fantastisk spil og brug for hjælp til at få det finansieret og udgivet?',
			sv: 'Har du ett fantastiskt spel och behöver hjälp att finansiera och ge ut det?',
			no: 'Har du et fantastisk spill og trenger hjelp til å få det finansiert og utgitt?',
			nl: 'Heb je een geweldige game en zoek je hulp bij de financiering en publicatie?'
		},
		'We can assist you when raising money from investors, government programs, crowdfunding campaigns or publishers. We can put your game out on all major platforms. We work on a pure revenue share model. No upfront cost.': {
			de: 'Wir unterstützen euch dabei, Geld von Investoren, aus Förderprogrammen, über Crowdfunding-Kampagnen oder von Publishern einzuwerben. Wir bringen euer Spiel auf alle großen Plattformen. Wir arbeiten ausschließlich auf Basis einer Umsatzbeteiligung. Keine Vorabkosten.',
			da: 'Vi kan hjælpe dig med at rejse penge fra investorer, offentlige støtteprogrammer, crowdfunding-kampagner eller udgivere. Vi kan udgive dit spil på alle store platforme. Vi arbejder udelukkende med omsætningsdeling. Ingen omkostninger på forhånd.',
			sv: 'Vi kan hjälpa dig att ta in pengar från investerare, offentliga stödprogram, crowdfundingkampanjer eller förlag. Vi kan släppa ditt spel på alla stora plattformar. Vi arbetar enbart med intäktsdelning. Inga kostnader i förväg.',
			no: 'Vi kan hjelpe deg med å hente penger fra investorer, offentlige støtteordninger, crowdfunding-kampanjer eller utgivere. Vi kan gi ut spillet ditt på alle store plattformer. Vi jobber utelukkende med inntektsdeling. Ingen kostnader på forhånd.',
			nl: 'We helpen je bij het ophalen van geld bij investeerders, overheidsprogramma\'s, crowdfundingcampagnes of uitgevers. We kunnen je game uitbrengen op alle grote platforms. We werken uitsluitend op basis van omzetdeling. Geen kosten vooraf.'
		},
		'Here\'s what we can do for you.': {
			de: 'Das bieten wir an.',
			da: 'Her er, hvad vi kan gøre for dig.',
			sv: 'Det här kan vi göra för dig.',
			no: 'Dette kan vi gjøre for deg.',
			nl: 'Dit kunnen we voor je doen.'
		},
		'FOR INVESTORS': {
			de: 'FÜR INVESTOREN', da: 'FOR INVESTORER', sv: 'FÖR INVESTERARE', no: 'FOR INVESTORER', nl: 'VOOR INVESTEERDERS'
		},
		'You have money and you want to invest into digital games. We show you a porfolio of games and you can choose which ones you like. You co-fund the development of those games. We guarantee that the games will be completed and published. You get a share of the revenue from the sales of the games.': {
			de: 'Sie haben Kapital und möchten in digitale Spiele investieren. Wir zeigen Ihnen ein Portfolio von Spielen, und Sie wählen aus, welche Ihnen gefallen. Sie finanzieren die Entwicklung dieser Spiele mit. Wir garantieren, dass die Spiele fertiggestellt und veröffentlicht werden. Sie erhalten einen Anteil aus dem Erlös der Spiele.',
			da: 'Du har penge og vil investere i digitale spil. Vi viser dig en portefølje af spil, og du vælger dem, du kan lide. Du medfinansierer udviklingen af disse spil. Vi garanterer, at spillene bliver færdiggjort og udgivet. Du får en andel af indtægterne fra salget af spillene.',
			sv: 'Du har pengar och vill investera i digitala spel. Vi visar dig en portfölj av spel och du väljer dem du gillar. Du är med och finansierar utvecklingen av spelen. Vi garanterar att spelen blir färdiga och släpps. Du får en andel av intäkterna från försäljningen av spelen.',
			no: 'Du har penger og vil investere i digitale spill. Vi viser deg en portefølje av spill, og du velger de du liker. Du er med på å finansiere utviklingen av disse spillene. Vi garanterer at spillene blir ferdigstilt og utgitt. Du får en andel av inntektene fra salget av spillene.',
			nl: 'Je hebt geld en wilt investeren in digitale games. We laten je een portfolio van games zien en jij kiest welke je aanspreken. Je financiert de ontwikkeling van die games mee. We garanderen dat de games worden voltooid en uitgebracht. Je krijgt een deel van de opbrengst uit de verkoop van de games.'
		},
		'Apply': {
			de: 'Anfrage', da: 'Ansøg', sv: 'Ansök', no: 'Søk', nl: 'Aanvraag'
		},
		'FOR DEVELOPERS': {
			de: 'FÜR ENTWICKLER', da: 'FOR UDVIKLERE', sv: 'FÖR UTVECKLARE', no: 'FOR UTVIKLERE', nl: 'VOOR ONTWIKKELAARS'
		},
		'You have a game in development. We help you raise money from investors or government programmes. You take the money and make your game. We get your game published. You get most of the revenue, while we keep a small share of the revenue. We do all the legal, taxes, and administrative work for you. You don\'t need to have your own company.': {
			de: 'Ihr habt ein Spiel in Entwicklung. Wir helfen euch, Geld von Investoren oder aus Förderprogrammen einzuwerben. Ihr nehmt das Geld und entwickelt euer Spiel. Wir sorgen dafür, dass euer Spiel veröffentlicht wird. Ihr erhaltet den Großteil der Einnahmen, wir behalten einen kleinen Anteil. Wir übernehmen für euch alles Rechtliche, die Steuern und die Verwaltung. Ihr braucht keine eigene Firma.',
			da: 'Du har et spil under udvikling. Vi hjælper dig med at rejse penge fra investorer eller offentlige støtteprogrammer. Du tager pengene og laver dit spil. Vi sørger for, at dit spil bliver udgivet. Du får størstedelen af omsætningen, mens vi beholder en lille andel. Vi klarer alt det juridiske, skatterne og administrationen for dig. Du behøver ikke at have dit eget firma.',
			sv: 'Du har ett spel under utveckling. Vi hjälper dig att ta in pengar från investerare eller offentliga stödprogram. Du tar pengarna och gör ditt spel. Vi ser till att ditt spel ges ut. Du får största delen av intäkterna, medan vi behåller en liten andel. Vi sköter allt juridiskt, skatter och administration åt dig. Du behöver inte ha ett eget företag.',
			no: 'Du har et spill under utvikling. Vi hjelper deg med å hente penger fra investorer eller offentlige støtteordninger. Du tar pengene og lager spillet ditt. Vi sørger for at spillet ditt blir utgitt. Du får mesteparten av inntektene, mens vi beholder en liten andel. Vi tar oss av alt det juridiske, skatt og administrasjon for deg. Du trenger ikke ha ditt eget selskap.',
			nl: 'Je hebt een game in ontwikkeling. We helpen je geld op te halen bij investeerders of overheidsprogramma\'s. Jij neemt het geld en maakt je game. Wij zorgen dat je game wordt uitgebracht. Jij krijgt het grootste deel van de omzet, wij houden een klein deel. Wij regelen al het juridische, de belastingen en de administratie voor je. Je hebt geen eigen bedrijf nodig.'
		},
		'Monthly reporting, full transparency, no nonsense.': {
			de: 'Monatliche Berichte, volle Transparenz, kein Nonsens.',
			da: 'Månedlig rapportering, fuld gennemsigtighed, intet nonsens.',
			sv: 'Månatlig rapportering, full transparens, inget nonsens.',
			no: 'Månedlig rapportering, full åpenhet, null tull.',
			nl: 'Maandelijkse rapportage, volledige transparantie, geen onzin.'
		},
		'Please send your application by email to': {
			de: 'Bitte schickt eure Bewerbung per E-Mail an',
			da: 'Send venligst din ansøgning pr. e-mail til',
			sv: 'Skicka din ansökan via e-post till',
			no: 'Send søknaden din på e-post til',
			nl: 'Stuur je sollicitatie per e-mail naar'
		},
		'Please avoid large email attachments and send links instead.': {
			de: 'Bitte verzichtet auf große E-Mail-Anhänge und schickt stattdessen Links.',
			da: 'Undgå venligst store vedhæftede filer, og send hellere links.',
			sv: 'Undvik stora e-postbilagor och skicka hellre länkar.',
			no: 'Unngå store e-postvedlegg, og send heller lenker.',
			nl: 'Stuur liever geen grote bijlagen, maar links.'
		},
		'Games we have contributed to:': {
			de: 'Spiele, an denen wir mitgewirkt haben:',
			da: 'Spil, vi har bidraget til:',
			sv: 'Spel som vi har bidragit till:',
			no: 'Spill vi har bidratt til:',
			nl: 'Games waaraan we hebben bijgedragen:'
		},
		'Games our team has worked on have received widespread recognition:': {
			de: 'Spiele, an denen unser Team gearbeitet hat, wurden vielfach ausgezeichnet:',
			da: 'Spil, som vores team har arbejdet på, har fået bred anerkendelse:',
			sv: 'Spel som vårt team har arbetat med har fått stort erkännande:',
			no: 'Spill som teamet vårt har jobbet med, har fått bred anerkjennelse:',
			nl: 'Games waaraan ons team heeft gewerkt, hebben brede erkenning gekregen:'
		},
		'Follow uns on social media:': {
			de: 'Folgt uns in den sozialen Medien:',
			da: 'Følg os på sociale medier:',
			sv: 'Följ oss i sociala medier:',
			no: 'Følg oss på sosiale medier:',
			nl: 'Volg ons op sociale media:'
		},
		'Germany': {
			de: 'Deutschland', da: 'Tyskland', sv: 'Tyskland', no: 'Tyskland', nl: 'Duitsland'
		},
		'All rights reserved. Logos and trademarks are copyrighted by their respective owners.': {
			de: 'Alle Rechte vorbehalten. Logos und Marken sind Eigentum ihrer jeweiligen Inhaber.',
			da: 'Alle rettigheder forbeholdes. Logoer og varemærker tilhører deres respektive ejere.',
			sv: 'Alla rättigheter förbehållna. Logotyper och varumärken tillhör sina respektive ägare.',
			no: 'Alle rettigheter forbeholdt. Logoer og varemerker tilhører sine respektive eiere.',
			nl: 'Alle rechten voorbehouden. Logo\'s en handelsmerken zijn eigendom van hun respectieve eigenaren.'
		}
	};

	// Lines like "...in collaboration with ZOINK:" or "...for BIGPOINT:" (partner names stay as they are).
	var PATTERNS = [
		{ re: /^\.\.\.\s*in (?:in )?collaboration with (.+):$/i,
		  t: { de: '...in Zusammenarbeit mit $1:', da: '...i samarbejde med $1:', sv: '...i samarbete med $1:', no: '...i samarbeid med $1:', nl: '...in samenwerking met $1:' } },
		{ re: /^\.\.\.\s*for (.+):$/i,
		  t: { de: '...für $1:', da: '...for $1:', sv: '...för $1:', no: '...for $1:', nl: '...voor $1:' } }
	];

	var AND = { de: 'und', da: 'og', sv: 'och', no: 'og', nl: 'en' };

	function detectLanguage() {
		var forced = /[?&]lang=([a-z]{2})/i.exec(window.location.search);
		var list = forced ? [forced[1]] : (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'en']);
		for (var i = 0; i < list.length; i++) {
			var code = String(list[i]).toLowerCase().split('-')[0];
			if (code === 'nb' || code === 'nn') code = 'no';
			if (code === 'en') return 'en';
			if (SUPPORTED.indexOf(code) !== -1) return code;
		}
		return 'en';
	}

	// "WILLKOMMEN!" -> "W I L L K O M M E N !", words separated by a wider gap like the originals.
	function spaced(s) {
		return s.split(' ').map(function (w) { return w.split('').join(' '); }).join('   ');
	}

	function translateText(raw, lang) {
		var text = raw.replace(/\s+/g, ' ').trim();
		if (!text) return null;
		if (TEXTS[text] && TEXTS[text][lang]) return TEXTS[text][lang];
		var compact = text.replace(/\s+/g, '').toUpperCase();
		if (/^(\S\s+)+\S$/.test(text) && HEADINGS[compact] && HEADINGS[compact][lang]) return spaced(HEADINGS[compact][lang]);
		for (var i = 0; i < PATTERNS.length; i++) {
			var m = PATTERNS[i].re.exec(text);
			if (m) return PATTERNS[i].t[lang].replace('$1', m[1].replace(/ and /g, ' ' + AND[lang] + ' '));
		}
		return null;
	}

	function run() {
		var lang = detectLanguage();
		if (lang === 'en') return;
		document.documentElement.lang = lang;

		var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
		var nodes = [];
		while (walker.nextNode()) nodes.push(walker.currentNode);

		nodes.forEach(function (node) {
			var parent = node.parentNode && node.parentNode.nodeName;
			if (parent === 'SCRIPT' || parent === 'STYLE') return;
			var out = translateText(node.nodeValue, lang);
			if (out === null) return;
			var lead = /^\s*/.exec(node.nodeValue)[0];
			var trail = /\s*$/.exec(node.nodeValue)[0];
			node.nodeValue = lead + out + trail;
		});
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', run);
	} else {
		run();
	}
})();
