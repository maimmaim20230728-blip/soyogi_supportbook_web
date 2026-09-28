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

  /* 題名の {name} に呼び名を入れる。String.replace だと呼び名の「$&」「$1」などが特殊な意味になるので split/join */
  function withName(tpl, name){ return String(tpl).split('{name}').join(name); }

  /* ---- 見せる画面(.ov・漢字・大きな字) ----
     secIds: 出す節の id 配列。opts.about=true で「説明書です」の本文を先頭に(既定 true) */
  function buildShow(api, secIds, opts){
    var o = opts || {}, T = api.T, el = api.el, b = loadBook(api);
    var ov = el('div', 'ov sb-show');
    ov.setAttribute('data-sb', 'show');
    var name = getVal(b, 'profile', 'name').trim();
    ov.appendChild(el('div', 'show-head', name ? withName(T('screen.show.title'), name) : T('screen.show.titleNoName')));
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
  /* 書いた文字の向き(画面の dir="auto" と同じ考え=最初に出てくる文字で決める)。決められなければ fallback(画面の向き) */
  var RE_LETTER = null, RE_RTL = null;
  try{ RE_LETTER = new RegExp('\\p{L}', 'u'); RE_RTL = new RegExp('[\\p{Script=Arabic}\\p{Script=Hebrew}]', 'u'); }catch(_){}
  function textDir(s, fallback){
    if(!RE_LETTER) return fallback;
    var m = String(s || '').match(RE_LETTER);
    if(!m) return fallback;
    return RE_RTL.test(m[0]) ? 'rtl' : 'ltr';
  }
  function drawFirstPng(api){
    var T = api.T, b = loadBook(api);
    var W = 1080, H = 1528, M = 70;
    var MAXH = 15000;               // canvas の高さの上限(iPhone の canvas は約1677万画素まで。1080×15000 はその内側)
    var cv = document.createElement('canvas');
    cv.width = W; cv.height = H;
    var ctx = cv.getContext('2d');
    if(!ctx) return false;
    var font = '"Hiragino Sans","Yu Gothic UI","Noto Sans JP",system-ui,sans-serif';
    var uiDir = api.rtl ? 'rtl' : 'ltr';
    var name = getVal(b, 'profile', 'name').trim();
    /* [欄, 枠の色, 見出しの字の色]。緑の見出しの字は画面の --brand-ink と同じ濃い緑(白地で 5.3:1)。枠は --brand のまま */
    var qs = [['never', '#d43f3f', '#d43f3f'], ['contact', '#2e9e6b', '#237a52']];

    /* 1) 先に行を割り付けて、要る高さを出す(長く書いても 本文が下の免責に重ならず、画像の外に切れない。最小は 1528) */
    ctx.font = 'bold 52px ' + font;
    /* 題名も折り返す(長い呼び名で右にはみ出さない) */
    var titleLines = wrapText(ctx, name ? withName(T('screen.show.title'), name) : T('screen.show.titleNoName'), W - M * 2);
    ctx.font = '30px ' + font;
    var leadLines = wrapText(ctx, T('app.tagline'), W - M * 2);
    /* 下の免責と「そよぎのアプリで作成」は両方とも折り返す(英語で長くなっても右に切れない) */
    ctx.font = '26px ' + font;
    var foot = wrapText(ctx, T('screen.show.footer'), W - M * 2);
    var by = wrapText(ctx, T('screen.show.by'), W - M * 2);
    var topH = 120 + titleLines.length * 64 - 14 + leadLines.length * 40 + 40;
    var footH = 26 + foot.length * 36 + 20 + (by.length - 1) * 36 + 40;
    /* 本文の字は ふつう 40px。とても長くて上限の高さを越えるときだけ 段階的に小さくする */
    var SIZES = [[40, 56], [34, 48], [28, 40]], bodyPx = 40, lineH = 56, bodies = [], need = 0;
    for(var sz = 0; sz < SIZES.length; sz++){
      bodyPx = SIZES[sz][0]; lineH = SIZES[sz][1];
      ctx.font = 'bold ' + bodyPx + 'px ' + font;
      bodies = [];
      need = topH + footH;
      for(var n = 0; n < qs.length; n++){
        bodies.push(wrapText(ctx, getVal(b, 'first', qs[n][0]).trim() || '-', W - M * 2 - 60));
        need += 90 + bodies[n].length * lineH + 30 + 50;
      }
      if(need <= MAXH) break;
    }
    H = Math.min(MAXH, Math.max(H, Math.ceil(need)));
    if(cv.height !== H) cv.height = H;     // 高さを変えると ctx の状態(font など)は戻る。下で描く前に毎回入れ直している

    /* 2) 描く。ar(右から左)は右寄せ。書いた文字は その文字の向きで(画面の dir="auto" と同じ) */
    function line(txt, inset, yy, dir){
      ctx.direction = dir; ctx.textAlign = 'start';
      ctx.fillText(txt, dir === 'rtl' ? W - inset : inset, yy);
    }
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#2e9e6b'; ctx.fillRect(0, 0, W, 22);
    var y = 120;
    ctx.fillStyle = '#1a1a1a';
    ctx.font = 'bold 52px ' + font;
    for(var tl = 0; tl < titleLines.length; tl++){ line(titleLines[tl], M, y, uiDir); y += 64; }
    y -= 14;
    ctx.font = '30px ' + font; ctx.fillStyle = '#555';
    for(var i = 0; i < leadLines.length; i++){ line(leadLines[i], M, y + 30, uiDir); y += 40; }
    y += 40;
    for(var k = 0; k < qs.length; k++){
      var v = getVal(b, 'first', qs[k][0]).trim();
      var label = T('screen.secs.first.q.' + qs[k][0] + '.s');
      var body = bodies[k];
      var boxH = 90 + body.length * lineH + 30;
      ctx.strokeStyle = qs[k][1]; ctx.lineWidth = 6;
      /* 枠線(strokeRect でなく線で描く=疑似DOMの canvas でも通る) */
      ctx.beginPath(); ctx.moveTo(M, y); ctx.lineTo(W - M, y); ctx.lineTo(W - M, y + boxH); ctx.lineTo(M, y + boxH); ctx.lineTo(M, y); ctx.stroke();
      ctx.fillStyle = qs[k][2]; ctx.font = 'bold 36px ' + font;
      line(label, M + 30, y + 60, uiDir);
      ctx.fillStyle = '#1a1a1a'; ctx.font = 'bold ' + bodyPx + 'px ' + font;
      var vDir = textDir(v, uiDir);
      for(var j = 0; j < body.length; j++) line(body[j], M + 30, y + 120 + j * lineH, vDir);
      y += boxH + 50;
    }
    ctx.fillStyle = '#555'; ctx.font = '26px ' + font;
    var byY = H - 40 - (by.length - 1) * 36;
    var fy = byY - 20 - foot.length * 36;
    for(var f = 0; f < foot.length; f++) line(foot[f], M, fy + f * 36, uiDir);
    for(var g = 0; g < by.length; g++) line(by[g], M, byY + g * 36, uiDir);
    var url;
    try{ url = cv.toDataURL('image/png'); }catch(_){ return false; }
    if(!url || url === 'data:,') return false;       // 'data:,' = 大きすぎて画像にできなかった
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
