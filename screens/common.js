'use strict';
/* サポートブック共通(画面ではない。節の定義・保存・見せる画面の組み立て・もしもカード読み込み)
   ・window.SBOOK に置く。各画面は render() の中でだけ使う(読み込み順に依存しない)
   ・保存キー: book.v1(本文) / out.v1(相手ごとに出す節) / three.v1(きょうの3つ)。すべて api.save 経由=「sbook.」が付く
   ・文言はすべて i18n(screen.secs.<id>.*)。ここには節の id と質問 id だけを持つ
   ・ブログの47項目・図版は使わない。節立ては SPEC_V1 の10節+1枚目 */
(function(){

  /* 節の定義(順番どおり)。big=1枚目(大きく出す) */
  var SECS = [
    { id:'first',   ico:'📌', big:true, qs:['never','contact'] },
    { id:'profile', ico:'🙂', qs:['name','age','oneLine','body'] },
    { id:'likes',   ico:'💚', qs:['like','dislike','calm'] },
    { id:'daily',   ico:'🍽', qs:['eat','toilet','dress','move','other'] },
    { id:'comm',    ico:'💬', qs:['from','to','sign','worked'] },
    { id:'panic',   ico:'🌊', qs:['trigger','before','doThis','dont','swap','worked'] },
    { id:'sense',   ico:'👂', qs:['sound','light','touch','smell','other'] },
    { id:'food',    ico:'🍙', qs:['ok','ng','allergy','drink'] },
    { id:'history', ico:'📖', qs:['early','schools','events','now'] },
    { id:'orgs',    ico:'🏥', qs:['medical','welfare','school','other'] },
    { id:'free',    ico:'✏️', qs:['text'] }
  ];
  var PRESETS = ['school','daycare','medical','family'];
  var DEFAULT_OUT = ['first','comm','panic'];   // 出し分けの初期値=最小限
  var KEY_BOOK = 'book.v1', KEY_OUT = 'out.v1', KEY_THREE = 'three.v1';

  function secById(id){ for(var i = 0; i < SECS.length; i++) if(SECS[i].id === id) return SECS[i]; return null; }

  /* ---- 本文 ---- */
  function loadBook(api){
    var b = api.load(KEY_BOOK, null);
    if(!b || typeof b !== 'object' || !b.sec || typeof b.sec !== 'object') b = { v:1, sec:{}, updated:0 };
    return b;
  }
  function saveBook(api, b){ b.updated = Date.now(); return api.save(KEY_BOOK, b); }
  function getVal(b, sec, q){ var s = b.sec[sec]; return (s && typeof s[q] === 'string') ? s[q] : ''; }
  function setVal(b, sec, q, v){ if(!b.sec[sec]) b.sec[sec] = {}; b.sec[sec][q] = String(v || ''); }
  function countSec(b, sec){
    var s = secById(sec), n = 0;
    if(!s) return 0;
    for(var i = 0; i < s.qs.length; i++) if(getVal(b, sec, s.qs[i]).trim()) n++;
    return n;
  }
  function countAll(b){
    var n = 0, m = 0;
    for(var i = 0; i < SECS.length; i++){ n += countSec(b, SECS[i].id); m += SECS[i].qs.length; }
    return { n:n, m:m };
  }

  /* ---- 相手ごとに出す節 ---- */
  function loadOut(api){
    var o = api.load(KEY_OUT, null);
    var out = {};
    for(var i = 0; i < PRESETS.length; i++){
      var p = PRESETS[i];
      var arr = (o && Array.isArray(o[p])) ? o[p] : DEFAULT_OUT;
      out[p] = arr.filter(function(id){ return !!secById(id); });
    }
    return out;
  }
  function saveOut(api, out){ return api.save(KEY_OUT, out); }

  /* ---- きょうの3つ ---- */
  function loadThree(api){
    var t = api.load(KEY_THREE, null);
    var lines = (t && Array.isArray(t.lines)) ? t.lines : [];
    return { lines:[String(lines[0] || ''), String(lines[1] || ''), String(lines[2] || '')] };
  }
  function saveThree(api, t){ return api.save(KEY_THREE, { v:1, lines:t.lines, updated:Date.now() }); }

  /* ---- もしもカードのバックアップJSON({app:'moshimo_card', card:{fields:{...}}})を空いている欄に前埋め ----
     戻り値: 入れた数。-1=もしもカードのファイルでない */
  var MOSHIMO_MAP = [
    ['name',    'profile', 'name'],
    ['cond',    'profile', 'body'],
    ['meds',    'profile', 'body'],
    ['allergy', 'food',    'allergy'],
    ['doctor',  'orgs',    'medical'],
    ['trouble', 'likes',   'dislike'],
    ['request', 'panic',   'doThis'],
    ['contact', 'first',   'contact'],
    ['free',    'free',    'text']
  ];
  function importMoshimo(api, obj){
    if(!obj || obj.app !== 'moshimo_card' || !obj.card || !obj.card.fields || typeof obj.card.fields !== 'object') return -1;
    var f = obj.card.fields, b = loadBook(api), n = 0, done = {};
    for(var i = 0; i < MOSHIMO_MAP.length; i++){
      var m = MOSHIMO_MAP[i], v = (typeof f[m[0]] === 'string') ? f[m[0]].trim() : '';
      if(!v) continue;
      var key = m[1] + '.' + m[2];
      var cur = getVal(b, m[1], m[2]).trim();
      if(cur && !done[key]) continue;                 // もう書いてある欄は触らない
      setVal(b, m[1], m[2], done[key] ? (cur + ' / ' + v) : v);   // 同じ欄に2つ来るもの(病気+薬)は「 / 」でつなぐ
      done[key] = true; n++;
    }
    if(n > 0 && !saveBook(api, b)) return 0;
    return n;
  }

  /* ---- 見せる画面(.ov・漢字・大きな字) ----
     secIds: 出す節の id 配列。opts.about=true で「説明書です」の本文を先頭に(既定 true) */
  function buildShow(api, secIds, opts){
    var o = opts || {}, T = api.T, el = api.el, b = loadBook(api);
    var ov = el('div', 'ov sb-show');
    ov.setAttribute('data-sb', 'show');
    var name = getVal(b, 'profile', 'name').trim();
    ov.appendChild(el('div', 'show-head', name ? T('screen.show.title').replace('{name}', name) : T('screen.show.titleNoName')));
    if(o.about !== false){
      var lead = el('p', 'show-para sb-lead', T('screen.show.lead'));
      ov.appendChild(lead);
    }
    var shown = 0;
    for(var i = 0; i < secIds.length; i++){
      var s = secById(secIds[i]);
      if(!s || countSec(b, s.id) === 0) continue;
      var box = el('div', s.big ? 'show-first' : 'show-block');
      box.appendChild(el('h2', 'show-sec', T('screen.secs.' + s.id + '.st')));
      for(var j = 0; j < s.qs.length; j++){
        var v = getVal(b, s.id, s.qs[j]).trim();
        if(!v) continue;
        box.appendChild(el('div', 'show-label', T('screen.secs.' + s.id + '.q.' + s.qs[j] + '.s')));
        var val = el('div', 'show-value sb-pre', v);
        val.setAttribute('dir', 'auto');      // 書いた文字の向きに合わせる(ar 画面で日本語の句点が先頭に来ない)
        box.appendChild(val);
      }
      ov.appendChild(box);
      shown++;
    }
    ov.appendChild(el('p', 'show-para sb-footer', T('screen.show.footer')));
    ov.appendChild(el('p', 'hint sb-by', T('screen.show.by')));
    var close = el('button', 'ov-close', T('common.close'));
    api.Tap.bind(close, function(){ if(ov.parentNode) ov.parentNode.removeChild(ov); });
    ov.appendChild(close);
    ov._shown = shown;
    return ov;
  }
  function openOv(ov){
    closeOv();
    document.body.appendChild(ov);
    return ov;
  }
  function closeOv(){
    var olds = document.querySelectorAll('.ov[data-sb]');
    for(var i = 0; i < olds.length; i++) if(olds[i].parentNode) olds[i].parentNode.removeChild(olds[i]);
  }

  /* ---- 1枚目を PNG に(canvas に描いてダウンロード)。戻り値 true=出せた ---- */
  /* 折り返し: 空白で区切れる所は語のまま(英語の単語を途中で切らない)。空白の無い長い語は1文字ずつ */
  function wrapText(ctx, text, maxW){
    var lines = [], paras = String(text || '').split('\n');
    function pushChars(line, word){
      for(var i = 0; i < word.length; i++){
        var t = line + word[i];
        if(ctx.measureText(t).width > maxW && line){ lines.push(line); line = word[i]; }
        else line = t;
      }
      return line;
    }
    for(var p = 0; p < paras.length; p++){
      var words = paras[p].split(/(\s+)/), line = '';
      for(var w = 0; w < words.length; w++){
        var word = words[w];
        if(!word) continue;
        if(ctx.measureText(line + word).width <= maxW){ line += word; continue; }
        if(/^\s+$/.test(word)) continue;                        // 行末の空白は捨てる
        if(line.trim()){ lines.push(line.replace(/\s+$/, '')); line = ''; }
        line = pushChars(line, word);
      }
      lines.push(line.replace(/\s+$/, ''));
    }
    return lines;
  }
  function drawFirstPng(api){
    var T = api.T, b = loadBook(api);
    var W = 1080, H = 1528, M = 70;
    var cv = document.createElement('canvas');
    cv.width = W; cv.height = H;
    var ctx = cv.getContext('2d');
    if(!ctx) return false;
    var font = '"Hiragino Sans","Yu Gothic UI","Noto Sans JP",system-ui,sans-serif';
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#2e9e6b'; ctx.fillRect(0, 0, W, 22);
    var y = 120;
    var name = getVal(b, 'profile', 'name').trim();
    ctx.fillStyle = '#1a1a1a';
    ctx.font = 'bold 52px ' + font;
    /* 題名も折り返す(長い呼び名で右にはみ出さない) */
    var titleLines = wrapText(ctx, name ? T('screen.show.title').replace('{name}', name) : T('screen.show.titleNoName'), W - M * 2);
    for(var tl = 0; tl < titleLines.length; tl++){ ctx.fillText(titleLines[tl], M, y); y += 64; }
    y -= 14;
    ctx.font = '30px ' + font; ctx.fillStyle = '#555';
    var leadLines = wrapText(ctx, T('app.tagline'), W - M * 2);
    for(var i = 0; i < leadLines.length; i++){ ctx.fillText(leadLines[i], M, y + 30); y += 40; }
    y += 40;
    var qs = [['never', '#d43f3f'], ['contact', '#2e9e6b']];
    for(var k = 0; k < qs.length; k++){
      var v = getVal(b, 'first', qs[k][0]).trim();
      var label = T('screen.secs.first.q.' + qs[k][0] + '.s');
      ctx.font = 'bold 40px ' + font;
      var body = wrapText(ctx, v || '-', W - M * 2 - 60);
      var boxH = 90 + body.length * 56 + 30;
      ctx.strokeStyle = qs[k][1]; ctx.lineWidth = 6;
      /* 枠線(strokeRect でなく線で描く=疑似DOMの canvas でも通る) */
      ctx.beginPath(); ctx.moveTo(M, y); ctx.lineTo(W - M, y); ctx.lineTo(W - M, y + boxH); ctx.lineTo(M, y + boxH); ctx.lineTo(M, y); ctx.stroke();
      ctx.fillStyle = qs[k][1]; ctx.font = 'bold 36px ' + font;
      ctx.fillText(label, M + 30, y + 60);
      ctx.fillStyle = '#1a1a1a'; ctx.font = 'bold 40px ' + font;
      for(var j = 0; j < body.length; j++) ctx.fillText(body[j], M + 30, y + 120 + j * 56);
      y += boxH + 50;
    }
    /* 下の免責と「そよぎのアプリで作成」は両方とも折り返す(英語で長くなっても右に切れない) */
    ctx.fillStyle = '#555'; ctx.font = '26px ' + font;
    var foot = wrapText(ctx, T('screen.show.footer'), W - M * 2);
    var by = wrapText(ctx, T('screen.show.by'), W - M * 2);
    var byY = H - 40 - (by.length - 1) * 36;
    var fy = byY - 20 - foot.length * 36;
    for(var f = 0; f < foot.length; f++) ctx.fillText(foot[f], M, fy + f * 36);
    for(var g = 0; g < by.length; g++) ctx.fillText(by[g], M, byY + g * 36);
    var url;
    try{ url = cv.toDataURL('image/png'); }catch(_){ return false; }
    if(!url) return false;
    var a = document.createElement('a');
    var d = new Date();
    a.href = url;
    a.download = 'supportbook-page1-' + d.getFullYear() + String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0') + '.png';
    document.body.appendChild(a);
    a.click();
    setTimeout(function(){ if(a.parentNode) a.parentNode.removeChild(a); }, 1000);
    return true;
  }

  window.SBOOK = {
    SECS: SECS, PRESETS: PRESETS, DEFAULT_OUT: DEFAULT_OUT,
    secById: secById,
    loadBook: loadBook, saveBook: saveBook, getVal: getVal, setVal: setVal, countSec: countSec, countAll: countAll,
    loadOut: loadOut, saveOut: saveOut,
    loadThree: loadThree, saveThree: saveThree,
    importMoshimo: importMoshimo,
    buildShow: buildShow, openOv: openOv, closeOv: closeOv,
    drawFirstPng: drawFirstPng,
    cur: 'first'            // いま開いている節(book → sec の受け渡し)
  };
})();
