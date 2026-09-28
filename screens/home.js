'use strict';
/* 画面: ホーム
   ・大ボタン4つ(かく / わたす / きょうの3つ / 「説明書です」のページ)と、書いた欄の数、1枚目のさわり
   ・文言は api.T('screen.home.*')。操作は api.Tap.bind(click禁止)。画面遷移は api.go('<id>') */
(function(){
  function bigBtn(api, ico, label, cls){
    var b = api.el('button', 'big-btn' + (cls ? ' ' + cls : ''));
    b.appendChild(api.el('span', 'ico', ico));
    b.appendChild(api.el('span', 'lbl', label));
    return b;
  }
  window.SCREENS.register('home', {
    render: function(c, api){
      var T = api.T, S = window.SBOOK;
      c.appendChild(api.el('h1', 'scr-title', T('screen.home.title')));
      c.appendChild(api.el('p', 'tagline', T('app.tagline')));
      c.appendChild(api.el('p', 'hint', T('screen.home.intro')));

      var b = S.loadBook(api), cnt = S.countAll(b);
      var never = S.getVal(b, 'first', 'never').trim();
      var contact = S.getVal(b, 'first', 'contact').trim();
      if(never || contact){
        var card = api.el('div', 'card sb-first-card');
        card.appendChild(api.el('div', 'show-label', T('screen.home.firstHead')));
        /* 書いた文字は dir=auto(ar 画面でも日本語は左から) */
        if(never){ card.appendChild(api.el('div', 'sb-mini-label', T('screen.secs.first.q.never.s'))); var nv = api.el('div', 'sb-pre', never); nv.setAttribute('dir', 'auto'); card.appendChild(nv); }
        if(contact){ card.appendChild(api.el('div', 'sb-mini-label', T('screen.secs.first.q.contact.s'))); var cv = api.el('div', 'sb-pre', contact); cv.setAttribute('dir', 'auto'); card.appendChild(cv); }
        c.appendChild(card);
      } else {
        c.appendChild(api.el('p', 'note', T('screen.home.firstEmpty')));
      }
      /* 書いた欄の数だけ(分母は出さない=達成率・点数にしない) */
      c.appendChild(api.el('p', 'hint sb-progress', T('screen.home.progress').split('{n}').join(String(cnt.n))));

      var w = bigBtn(api, '✏️', T('screen.home.write'), 'primary'); api.Tap.bind(w, function(){ api.go('book'); }); c.appendChild(w);
      var g = bigBtn(api, '📤', T('screen.home.give')); api.Tap.bind(g, function(){ api.go('give'); }); c.appendChild(g);
      var t = bigBtn(api, '3️⃣', T('screen.home.three')); api.Tap.bind(t, function(){ api.go('three'); }); c.appendChild(t);
      var a = bigBtn(api, '📄', T('screen.home.about')); api.Tap.bind(a, function(){ api.go('about'); }); c.appendChild(a);

      c.appendChild(api.el('p', 'hint', T('screen.home.privacyNote')));
    }
  });
})();
