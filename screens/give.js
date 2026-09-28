'use strict';
/* 画面: わたす(相手に あわせて 出す)
   ・相手プリセット4つ(学校/預け先/医療/家族)ごとに「出す節」を選ぶ(初期値=1枚目+伝え方+パニックの対応の最小限)
   ・みせる(.ov・漢字・大きな字) / いんさつ(window.print・印刷用CSSは style.css の @media print) / 1枚目を PNG(canvas)
   ・いんさつ は Web版だけ(Play版の WebView では window.print が何もしないので、api.native のときはボタンを作らない)
   ・出すたびに取り扱い注意の文を出す */
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
        S.openOv(S.buildShow(api, out[curPreset]));
      });
      c.appendChild(show);

      if(!api.native){
        var pr = api.el('button', 'big-btn'); pr.id = 'sb-give-print';
        pr.appendChild(api.el('span', 'ico', '🖨')); pr.appendChild(api.el('span', 'lbl', T('screen.give.print')));
        api.Tap.bind(pr, function(){
          if(!canShow()) return;
          S.openOv(S.buildShow(api, out[curPreset]));
          api.toast(T('screen.give.printHint'));
          setTimeout(function(){ try{ if(typeof window.print === 'function') window.print(); }catch(_){} }, 350);
        });
        c.appendChild(pr);
      }

      var png = api.el('button', 'big-btn'); png.id = 'sb-give-png';
      png.appendChild(api.el('span', 'ico', '🖼')); png.appendChild(api.el('span', 'lbl', T('screen.give.png')));
      api.Tap.bind(png, function(){
        if(!hasAny()){ api.toast(T('screen.give.nothing')); return; }
        /* 1枚目が空のときは「-」だけの画像を作らず、1枚目へ案内する */
        if(S.countSec(b, 'first') === 0){ api.toast(T('screen.home.firstEmpty')); return; }
        /* Play版は共有の画面を閉じたら何も出さない(2026-09-29) */
        S.drawFirstPng(api, function(r){
          if(r === 'ok') api.toast(T('screen.give.pngDone'));
          else if(r === 'fail') api.toast(T('common.saveFail'));
        });
      });
      c.appendChild(png);
    }
  });
})();
