'use strict';
/* 画面: わたす(相手に あわせて 出す)
   ・相手プリセット4つ(学校/預け先/医療/家族)ごとに「出す節」を選ぶ(初期値は相手ごと=common.js の DEFAULT_OUT_BY・0.5.0)
   ・みせる(.ov・漢字・大きな字) / いんさつ(window.print・印刷用CSSは style.css の @media print) / 1枚目を PNG(canvas)
   ・いんさつ は Web版だけ(Play版の WebView では window.print が何もしないので、api.native のときはボタンを作らない)
   ・出すたびに取り扱い注意の文を出す
   ・みせる/いんさつ は、出す前に「よみかえす」画面(出す節の中身の一覧)を挟む(0.5.0)
   ・1まいめを がぞうで ほぞん は、保存の前に しあがりの「プレビュー」を出す(このまま ほぞん / 書きなおす)(0.5.0) */
(function(){
  var curPreset = 'school';
  window.SCREENS.register('give', {
    render: function(c, api){
      var T = api.T, S = window.SBOOK;
      var out = S.loadOut(api);
      var b = S.loadBook(api);
      c.appendChild(api.el('h1', 'scr-title', T('screen.give.title')));
      c.appendChild(api.el('p', 'hint', T('screen.give.intro')));

      /* 相手 */
      var pres = api.el('div', 'chips sb-presets');
      var presetBtns = {};
      function paintPresets(){ for(var k in presetBtns) presetBtns[k].classList.toggle('on', k === curPreset); }
      for(var i = 0; i < S.PRESETS.length; i++){
        (function(p){
          var ch = api.el('button', 'chip', T('screen.give.presets.' + p));
          ch.setAttribute('data-preset', p);
          api.Tap.bind(ch, function(){ curPreset = p; paintPresets(); paintSecs(); });
          presetBtns[p] = ch; pres.appendChild(ch);
        })(S.PRESETS[i]);
      }
      c.appendChild(pres);

      /* 出す節 */
      c.appendChild(api.el('h2', 'sec-h', T('screen.give.secsHead')));
      var secWrap = api.el('div', 'chips sb-outsecs');
      var secBtns = {};
      function paintSecs(){
        for(var k in secBtns){
          secBtns[k].classList.toggle('on', out[curPreset].indexOf(k) >= 0);
        }
      }
      for(var j = 0; j < S.SECS.length; j++){
        (function(s){
          var ch = api.el('button', 'chip', s.ico + ' ' + T('screen.secs.' + s.id + '.st'));
          ch.setAttribute('data-outsec', s.id);
          api.Tap.bind(ch, function(){
            var arr = out[curPreset], at = arr.indexOf(s.id);
            if(at >= 0) arr.splice(at, 1); else arr.push(s.id);
            /* 節の順番は本の順に揃える */
            out[curPreset] = S.SECS.map(function(x){ return x.id; }).filter(function(id){ return arr.indexOf(id) >= 0; });
            if(!S.saveOut(api, out)) api.toast(T('common.storageFull'));
            paintSecs();
          });
          secBtns[s.id] = ch; secWrap.appendChild(ch);
        })(S.SECS[j]);
      }
      c.appendChild(secWrap);
      paintPresets(); paintSecs();

      c.appendChild(api.el('p', 'note sb-caution', T('screen.give.caution')));

      /* 画面の下に2つのボタンを固定で出す重ね画面(よみかえす・プレビュー)。「もどる」側は data-back(Androidの戻る=これ) */
      function barOv(cls, tag){
        var ov = api.el('div', 'ov sb-show ' + cls);
        ov.setAttribute('data-sb', tag);
        ov.setAttribute('role', 'dialog');
        ov.setAttribute('aria-modal', 'true');
        return ov;
      }
      function addBar(ov, goLabel, goId, goFn, backLabel, backId, backFn){
        var bar = api.el('div', 'sb-ovbar');
        var back = api.el('button', 'btn', backLabel); back.id = backId; back.type = 'button';
        back.setAttribute('data-back', '1');
        var go = api.el('button', 'btn primary', goLabel); go.id = goId; go.type = 'button';
        api.Tap.bind(back, backFn);
        api.Tap.bind(go, goFn);
        bar.appendChild(back); bar.appendChild(go);
        ov.appendChild(bar);
        ov._back = backFn;
      }

      /* 出す前に よみかえす: 出す節の中身(書いた欄だけ)を一覧にして、見せたくない内容が混ざっていないか確かめる */
      function openReview(goLabelKey, action){
        var ov = barOv('sb-review', 'review');
        ov.appendChild(api.el('div', 'show-head', T('screen.give.rvTitle')));
        ov.appendChild(api.el('p', 'hint sb-rv-hint', T('screen.give.rvHint')));
        var ids = out[curPreset];
        for(var i = 0; i < ids.length; i++){
          var s = S.secById(ids[i]);
          if(!s || S.countSec(b, s.id) === 0) continue;
          var box = api.el('div', 'show-block sb-rv-block');
          box.appendChild(api.el('h2', 'show-sec', T('screen.secs.' + s.id + '.st')));
          for(var j = 0; j < s.qs.length; j++){
            var v = S.getVal(b, s.id, s.qs[j]).trim();
            if(!v) continue;
            box.appendChild(api.el('div', 'show-label', T('screen.secs.' + s.id + '.q.' + s.qs[j] + '.s')));
            var val = api.el('div', 'sb-rv-val sb-pre', v);
            val.setAttribute('dir', 'auto');
            box.appendChild(val);
          }
          ov.appendChild(box);
        }
        addBar(ov, T('screen.give.' + goLabelKey), 'sb-review-go', function(){ action(); },
               T('screen.give.rvBack'), 'sb-review-back', function(){ S.closeOv(); });
        S.openOv(ov);
      }

      /* 1まいめの がぞうの しあがりを 見せてから ほぞん */
      function openPngPreview(){
        var r = S.renderFirstPng(api);
        if(!r){ api.toast(T('common.saveFail')); return; }
        var ov = barOv('sb-preview', 'preview');
        ov.appendChild(api.el('div', 'show-head', T('screen.give.pvTitle')));
        if(r.small) ov.appendChild(api.el('p', 'note sb-pv-small', T('screen.give.pvSmall')));
        var img = api.el('img', 'sb-pv-img');
        img.alt = T('screen.give.pvTitle');
        img.src = r.url;
        ov.appendChild(img);
        var busy = false;
        addBar(ov, T('screen.give.pvSave'), 'sb-preview-save', function(){
          if(busy) return;
          busy = true;
          S.saveFirstPng(api, r, function(res){
            busy = false;
            if(res === 'ok'){ S.closeOv(); api.toast(T('screen.give.pngDone')); }
            else if(res === 'fail') api.toast(T('common.saveFail'));
          });
        }, T('screen.give.pvRewrite'), 'sb-preview-rewrite', function(){ S.closeOv(); S.cur = 'first'; api.go('sec'); });
        ov._back = function(){ S.closeOv(); };   // Androidの戻る=プレビューを閉じるだけ(書きなおすへは行かない)
        S.openOv(ov);
      }

      function hasAny(){ return S.countAll(b).n > 0; }
      /* 選んだ節に書いた欄が1つも無いときは開かず案内(空の見せる画面を出さない) */
      function hasInSecs(){
        var ids = out[curPreset];
        for(var i = 0; i < ids.length; i++) if(S.countSec(b, ids[i]) > 0) return true;
        return false;
      }
      function canShow(){
        if(!hasAny()){ api.toast(T('screen.give.nothing')); return false; }
        if(!hasInSecs()){ api.toast(T('screen.give.nothingInSecs')); return false; }
        return true;
      }
      var show = api.el('button', 'big-btn primary'); show.id = 'sb-give-show';
      show.appendChild(api.el('span', 'ico', '👀')); show.appendChild(api.el('span', 'lbl', T('screen.give.show')));
      api.Tap.bind(show, function(){
        if(!canShow()) return;
        openReview('rvGo', function(){ S.openOv(S.buildShow(api, out[curPreset])); });
      });
      c.appendChild(show);

      if(!api.native){
        var pr = api.el('button', 'big-btn'); pr.id = 'sb-give-print';
        pr.appendChild(api.el('span', 'ico', '🖨')); pr.appendChild(api.el('span', 'lbl', T('screen.give.print')));
        api.Tap.bind(pr, function(){
          if(!canShow()) return;
          openReview('rvGoPrint', function(){
            S.openOv(S.buildShow(api, out[curPreset]));
            api.toast(T('screen.give.printHint'));
            setTimeout(function(){ try{ if(typeof window.print === 'function') window.print(); }catch(_){} }, 350);
          });
        });
        c.appendChild(pr);
      }

      var png = api.el('button', 'big-btn'); png.id = 'sb-give-png';
      png.appendChild(api.el('span', 'ico', '🖼')); png.appendChild(api.el('span', 'lbl', T('screen.give.png')));
      api.Tap.bind(png, function(){
        if(!hasAny()){ api.toast(T('screen.give.nothing')); return; }
        /* 1枚目が空のときは「-」だけの画像を作らず、1枚目へ案内する */
        if(S.countSec(b, 'first') === 0){ api.toast(T('screen.home.firstEmpty')); return; }
        /* 保存の前に しあがりを 見せる(0.5.0)。Play版は共有の画面を閉じたら何も出さない(2026-09-29)=プレビューは開いたまま */
        openPngPreview();
      });
      c.appendChild(png);
    }
  });
})();
