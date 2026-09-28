'use strict';
/* 画面: 節の入力(1節ずつ)
   ・window.SBOOK.cur の節を描く。質問ごとに textarea(記入例は placeholder)。書くと自動保存(input はフォーム部品のネイティブイベント)
   ・「書き方の手がかり」(見えている行動→本当の理由→してほしいこと 等)は i18n の screen.secs.<id>.h
   ・まえ/つぎ で節を渡り歩く。ナビには置かず、book から来る */
(function(){
  window.SCREENS.register('sec', {
    render: function(c, api){
      var T = api.T, S = window.SBOOK;
      var s = S.secById(S.cur) || S.SECS[0];
      var idx = S.SECS.indexOf(s);
      var b = S.loadBook(api);
      var base = 'screen.secs.' + s.id;

      c.appendChild(api.el('h1', 'scr-title', s.ico + ' ' + T(base + '.t')));
      var h = T(base + '.h');
      if(h && typeof h === 'string' && h.trim()){
        var hint = api.el('div', 'note sb-hint');
        hint.appendChild(api.el('div', 'sb-mini-label', T('screen.sec.hintHead')));
        hint.appendChild(api.el('div', null, h));
        c.appendChild(hint);
      }
      c.appendChild(api.el('p', 'hint', T('screen.sec.autosave')));

      /* 書くたびに同期で保存(小さなJSONなので軽い。画面を閉じられても消えない) */
      var warned = false;
      function persist(){
        if(!S.saveBook(api, b)){ if(!warned){ api.toast(T('common.storageFull')); warned = true; } }
        else warned = false;
      }
      for(var i = 0; i < s.qs.length; i++){
        (function(q){
          var f = api.el('div', 'field sb-q');
          var id = 'sb-q-' + s.id + '-' + q;
          var lab = api.el('label', null, T(base + '.q.' + q + '.l'));
          lab.setAttribute('for', id);
          var ta = api.el('textarea');
          ta.id = id; ta.rows = s.big ? 4 : 3;
          ta.setAttribute('dir', 'auto');   // 書いた文字の向きに合わせる(ar 画面でも日本語は左から)
          ta.placeholder = T(base + '.q.' + q + '.p');
          ta.value = S.getVal(b, s.id, q);
          ta.addEventListener('input', function(){ S.setVal(b, s.id, q, ta.value); persist(); });
          ta.addEventListener('change', function(){ S.setVal(b, s.id, q, ta.value); persist(); });
          f.appendChild(lab); f.appendChild(ta);
          c.appendChild(f);
        })(s.qs[i]);
      }

      var row = api.el('div', 'btn-row');
      /* 矢印は RTL(ar)では向きを反転(左右の意味が逆になるため) */
      var prev = api.el('button', 'btn', (api.rtl ? '→ ' : '← ') + T('common.prev'));
      var next = api.el('button', 'btn', T('common.next') + (api.rtl ? ' ←' : ' →'));
      if(idx <= 0) prev.disabled = true;
      if(idx >= S.SECS.length - 1) next.disabled = true;
      api.Tap.bind(prev, function(){ if(idx > 0){ S.cur = S.SECS[idx - 1].id; api.go('sec'); } });
      api.Tap.bind(next, function(){ if(idx < S.SECS.length - 1){ S.cur = S.SECS[idx + 1].id; api.go('sec'); } });
      row.appendChild(prev); row.appendChild(next);
      c.appendChild(row);
      var back = api.el('button', 'btn wide primary', T('screen.sec.goBook'));
      back.id = 'sb-sec-back';
      api.Tap.bind(back, function(){ if(!S.saveBook(api, b)) api.toast(T('common.storageFull')); else api.toast(T('common.saved')); api.go('book'); });
      c.appendChild(back);
    }
  });
})();
