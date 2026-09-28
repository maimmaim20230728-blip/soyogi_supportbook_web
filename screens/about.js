'use strict';
/* 画面: 「要求ではなく説明書です」の固定1ページ
   ・相手にそのまま見せる文(漢字)。わたす画面の「みせる」では先頭の短い版(screen.show.lead)が付く
   ・ここでは全文を読め、大きく見せられる(.ov) */
(function(){
  window.SCREENS.register('about', {
    nav: 'home',            // ホームから来る画面なので、下ナビは「ホーム」を光らせる
    render: function(c, api){
      var T = api.T, S = window.SBOOK;
      c.appendChild(api.el('h1', 'scr-title', T('screen.about.title')));
      c.appendChild(api.el('p', 'hint', T('screen.about.intro')));
      var body = T('screen.about.body');
      if(!Array.isArray(body)) body = [String(body)];
      var card = api.el('div', 'card sb-about');
      for(var i = 0; i < body.length; i++) card.appendChild(api.el('p', 'show-para' + (i === 0 ? ' sb-about-head' : ''), body[i]));
      c.appendChild(card);
      var show = api.el('button', 'big-btn primary'); show.id = 'sb-about-show';
      show.appendChild(api.el('span', 'ico', '👀')); show.appendChild(api.el('span', 'lbl', T('screen.about.show')));
      api.Tap.bind(show, function(){
        var ov = api.el('div', 'ov sb-show');
        ov.setAttribute('data-sb', 'about');
        ov.appendChild(api.el('div', 'show-head', body[0]));
        for(var k = 1; k < body.length; k++) ov.appendChild(api.el('p', 'show-para sb-lead', body[k]));
        ov.appendChild(api.el('p', 'hint sb-by', T('screen.show.by')));
        var close = api.el('button', 'ov-close', T('common.close'));
        api.Tap.bind(close, function(){ S.closeOv(); });
        ov.appendChild(close);
        S.openOv(ov);
      });
      c.appendChild(show);
      var back = api.el('button', 'btn wide', T('common.back'));
      api.Tap.bind(back, function(){ api.go('home'); });
      c.appendChild(back);
    }
  });
})();
