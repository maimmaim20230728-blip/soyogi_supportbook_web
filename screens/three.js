'use strict';
/* 画面: きょう いちばん 大事な 3つ
   ・3行だけ書いて、大きく見せる(.ov)。引率する人・今日だけ会う人に渡す最短のカード
   ・書くと自動保存(input はフォーム部品のネイティブイベント) */
(function(){
  window.SCREENS.register('three', {
    render: function(c, api){
      var T = api.T, S = window.SBOOK;
      var t = S.loadThree(api);
      c.appendChild(api.el('h1', 'scr-title', T('screen.three.title')));
      c.appendChild(api.el('p', 'hint', T('screen.three.intro')));
      /* 書くたびに同期で保存(3行なので軽い) */
      var warned = false;
      function persist(){
        if(!S.saveThree(api, t)){ if(!warned){ api.toast(T('common.storageFull')); warned = true; } }
        else warned = false;
      }
      for(var i = 0; i < 3; i++){
        (function(n){
          var f = api.el('div', 'field');
          var id = 'sb-three-' + (n + 1);
          var lab = api.el('label', null, T('screen.three.line').replace('{n}', String(n + 1)));
          lab.setAttribute('for', id);
          var inp = api.el('input');
          inp.type = 'text'; inp.id = id;
          inp.setAttribute('dir', 'auto');   // 書いた文字の向きに合わせる(ar 画面でも日本語は左から)
          inp.placeholder = T('screen.three.p' + (n + 1));
          inp.value = t.lines[n];
          inp.addEventListener('input', function(){ t.lines[n] = inp.value; persist(); });
          inp.addEventListener('change', function(){ t.lines[n] = inp.value; persist(); });
          f.appendChild(lab); f.appendChild(inp);
          c.appendChild(f);
        })(i);
      }
      var show = api.el('button', 'big-btn primary'); show.id = 'sb-three-show';
      show.appendChild(api.el('span', 'ico', '👀')); show.appendChild(api.el('span', 'lbl', T('screen.three.show')));
      api.Tap.bind(show, function(){
        S.saveThree(api, t);
        var lines = t.lines.filter(function(x){ return x.trim(); });
        if(!lines.length){ api.toast(T('screen.three.empty')); return; }
        var ov = api.el('div', 'ov sb-show');
        ov.setAttribute('data-sb', 'three');
        ov.appendChild(api.el('div', 'show-head', T('screen.three.head')));
        for(var k = 0; k < lines.length; k++){
          var line = api.el('div', 'three-big');
          line.appendChild(api.el('span', 'three-num', String(k + 1)));
          var txt = api.el('span', null, lines[k]);
          txt.setAttribute('dir', 'auto');
          line.appendChild(txt);
          ov.appendChild(line);
        }
        ov.appendChild(api.el('p', 'hint sb-by', T('screen.show.by')));
        var close = api.el('button', 'ov-close', T('common.close'));
        api.Tap.bind(close, function(){ S.closeOv(); });
        ov.appendChild(close);
        S.openOv(ov);
      });
      c.appendChild(show);
    }
  });
})();
