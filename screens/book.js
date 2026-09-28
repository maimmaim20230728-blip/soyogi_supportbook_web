'use strict';
/* 画面: かく(節の一覧)
   ・11の節(1枚目+10節)を大ボタンで並べ、書いた欄の数を出す。タップで sec 画面へ(window.SBOOK.cur に節idを渡す)
   ・もしもカードのバックアップJSON(かきだしたファイル)を読み込んで空いている欄に前埋め(file input だけネイティブ change) */
(function(){
  window.SCREENS.register('book', {
    render: function(c, api){
      var T = api.T, S = window.SBOOK, b = S.loadBook(api);
      c.appendChild(api.el('h1', 'scr-title', T('screen.book.title')));
      c.appendChild(api.el('p', 'hint', T('screen.book.intro')));
      c.appendChild(api.el('p', 'hint', T('common.optional')));

      for(var i = 0; i < S.SECS.length; i++){
        (function(s){
          var btn = api.el('button', 'big-btn sb-sec-btn' + (s.big ? ' alert' : ''));
          btn.setAttribute('data-sec', s.id);
          btn.appendChild(api.el('span', 'ico', s.ico));
          var box = api.el('span', 'sb-sec-text');
          box.appendChild(api.el('span', 'lbl', T('screen.secs.' + s.id + '.t')));
          box.appendChild(api.el('span', 'cnt', T('screen.book.filled').replace('{n}', String(S.countSec(b, s.id))).replace('{m}', String(s.qs.length))));
          btn.appendChild(box);
          api.Tap.bind(btn, function(){ S.cur = s.id; api.go('sec'); });
          c.appendChild(btn);
        })(S.SECS[i]);
      }

      /* もしもカードの読み込み */
      c.appendChild(api.el('h2', 'sec-h', T('screen.book.moshimo')));
      c.appendChild(api.el('p', 'hint', T('screen.book.moshimoHint')));
      var file = api.el('input', 'hidden');
      file.type = 'file'; file.setAttribute('accept', 'application/json,.json'); file.id = 'sb-moshimo-file';
      var mb = api.el('button', 'btn wide'); mb.id = 'sb-moshimo-btn'; mb.textContent = T('screen.book.moshimo');
      api.Tap.bind(mb, function(){ file.click(); });
      file.addEventListener('change', function(e){
        var f = e.target.files && e.target.files[0];
        if(!f) return;
        var r = new FileReader();
        r.onload = function(){
          var n = -1;
          try{ n = S.importMoshimo(api, JSON.parse(r.result)); }catch(_){ n = -1; }
          if(n < 0) api.toast(T('screen.book.moshimoFail'));
          else if(n === 0) api.toast(T('screen.book.moshimoNone'));
          else { api.toast(T('screen.book.moshimoDone').replace('{n}', String(n))); api.go('book'); }
        };
        r.readAsText(f);
        e.target.value = '';
      });
      c.appendChild(mb);
      c.appendChild(file);
    }
  });
})();
