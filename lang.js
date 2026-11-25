// Shows the Polish or English half of each page. Polish browsers get Polish,
// everyone else English; the choice is remembered when the visitor switches.
(function () {
  var root = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) {}
  var nav = (navigator.language || 'en').toLowerCase();
  var lang = saved || (nav.indexOf('pl') === 0 ? 'pl' : 'en');

  function apply(l) {
    root.setAttribute('data-lang', l);
    root.setAttribute('lang', l);
    var buttons = document.querySelectorAll('.lang button');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('aria-pressed', buttons[i].dataset.set === l ? 'true' : 'false');
    }
    var t = root.getAttribute('data-title-' + l);
    if (t) document.title = t;
  }

  apply(lang);
  document.addEventListener('DOMContentLoaded', function () {
    apply(lang);
    var buttons = document.querySelectorAll('.lang button');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function () {
        lang = this.dataset.set;
        try { localStorage.setItem('lang', lang); } catch (e) {}
        apply(lang);
      });
    }
  });
})();
